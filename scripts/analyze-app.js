const fs = require('fs');
const vm = require('vm');

const stableCode = fs.readFileSync('data-stable.js', 'utf8');
const dataCode = fs.readFileSync('data.js', 'utf8');
const extraCode = fs.readFileSync('data-extra.js', 'utf8');
const rulesCode = fs.readFileSync('rules-db.js', 'utf8');

const sandbox = {
  console: console,
  window: { location: { hostname: 'localhost', protocol: 'http:' } },
  document: {},
  lessons: [],
  units: []
};

vm.createContext(sandbox);

try {
  const executableStable = stableCode.replace(/\bexport\s+/g, '');
  const stableResult = vm.runInContext(executableStable + '\n; ({ rawTopics, unitSentencesMap, units, lessons, globalLessonCounter });', sandbox);
  sandbox.rawTopics = stableResult.rawTopics;
  sandbox.unitSentencesMap = stableResult.unitSentencesMap;
  sandbox.units = stableResult.units;
  sandbox.lessons = stableResult.lessons;
  sandbox.globalLessonCounter = stableResult.globalLessonCounter;

  const executableCode = dataCode.replace(/\bexport\s+/g, '');
  const wrapperCode = executableCode + '\n; ({ units, lessons, unitSentencesMap });';
  const dataResult = vm.runInContext(wrapperCode, sandbox);

  sandbox.lessons = dataResult.lessons;
  sandbox.units = dataResult.units;
  sandbox.unitSentencesMap = dataResult.unitSentencesMap;

  const executableExtra = extraCode.replace(/\bexport\s+/g, '');
  vm.runInContext(executableExtra, sandbox);

  const executableRules = rulesCode.replace(/\bexport\s+/g, '');
  vm.runInContext(executableRules, sandbox);
} catch (err) {
  console.error('Veri yukleme hatasi:', err);
  process.exit(1);
}

const { units, lessons, rawTopics, grammarRules } = sandbox;

const report = {
  summary: {},
  titleConsistency: [],
  topicCoverage: [],
  missingElements: [],
  structureUsage: [],
  duplicates: {
    unitIds: [],
    unitTitles: [],
    lessonIds: [],
    lessonTitles: [],
    questionTexts: [],
    ruleKeys: []
  }
};

// 1. Summaries
report.summary.totalUnits = units ? units.length : 0;
report.summary.totalLessons = lessons ? lessons.length : 0;
report.summary.totalRawTopics = rawTopics ? rawTopics.length : 0;
report.summary.totalGrammarRules = grammarRules ? Object.keys(grammarRules).length : 0;

// 2. Duplicates Check
const unitIdMap = new Map();
const unitTitleMap = new Map();
units.forEach(u => {
  if (unitIdMap.has(u.id)) report.duplicates.unitIds.push(u.id);
  else unitIdMap.set(u.id, u.title);

  const normalizedTitle = u.title.trim().toLowerCase();
  if (unitTitleMap.has(normalizedTitle)) report.duplicates.unitTitles.push({ id: u.id, title: u.title });
  else unitTitleMap.set(normalizedTitle, u.id);
});

const lessonIdMap = new Map();
const lessonTitleMap = new Map();
lessons.forEach(l => {
  if (lessonIdMap.has(l.id)) report.duplicates.lessonIds.push({ id: l.id, title: l.title });
  else lessonIdMap.set(l.id, l.title);

  const normalizedTitle = (l.title + ' ' + (l.subtitle || '')).trim().toLowerCase();
  if (lessonTitleMap.has(normalizedTitle)) report.duplicates.lessonTitles.push({ id: l.id, title: l.title, originalId: lessonTitleMap.get(normalizedTitle) });
  else lessonTitleMap.set(normalizedTitle, l.id);
});

// Questions duplicates & question count
const seenQuestions = new Map();
let totalQuestions = 0;
let emptyLessons = [];

lessons.forEach(l => {
  let qCount = 0;
  if (l.exercises) {
    l.exercises.forEach(ex => {
      if (ex.questions) {
        ex.questions.forEach(q => {
          qCount++;
          const text = (q.sentence || q.text || q.prompt || q.turkish || '').trim();
          if (text) {
            if (seenQuestions.has(text)) {
              report.duplicates.questionTexts.push({ text, firstIn: seenQuestions.get(text), alsoIn: l.id });
            } else {
              seenQuestions.set(text, l.id);
            }
          }
        });
      }
    });
  } else if (l.questions) {
    l.questions.forEach(q => {
      qCount++;
      const text = (q.sentence || q.text || q.prompt || q.turkish || '').trim();
      if (text) {
        if (seenQuestions.has(text)) {
          report.duplicates.questionTexts.push({ text, firstIn: seenQuestions.get(text), alsoIn: l.id });
        } else {
          seenQuestions.set(text, l.id);
        }
      }
    });
  }

  if (qCount === 0) {
    emptyLessons.push({ id: l.id, title: l.title });
  }
});
report.summary.totalQuestions = totalQuestions;
report.summary.emptyLessonsCount = emptyLessons.length;
report.missingElements.push({ emptyLessons });

// 3. RawTopics vs Units Alignment
if (rawTopics) {
  let rawIdx = 0;
  rawTopics.forEach((rt, idx) => {
    // Check if rawTopic title exists in units
    const matchingUnit = units.find(u => u.title.includes(rt.title) || rt.title.includes(u.title.replace(/^Bölüm \d+: /, '')));
    if (!matchingUnit) {
      report.titleConsistency.push(`RawTopic #${idx + 1} "${rt.title}" units arrayinde eşleşen bölüm bulamadı!`);
    }
  });
}

// 4. Units lesson references validity
units.forEach(u => {
  if (!u.lessons || u.lessons.length === 0) {
    report.missingElements.push(`Bölüm "${u.title}" (${u.id}) hiç ders içermiyor!`);
  } else {
    u.lessons.forEach(lId => {
      if (!lessons.some(l => l.id === lId)) {
        report.missingElements.push(`Bölüm "${u.title}" içinde tanımlı Ders ID "${lId}" lessons arrayinde bulunamadı!`);
      }
    });
  }
});

// 5. Grammar Rules Coverage
if (grammarRules) {
  const ruleKeys = Object.keys(grammarRules);
  const usedRules = new Set();

  lessons.forEach(l => {
    const lStr = JSON.stringify(l);
    ruleKeys.forEach(rk => {
      if (lStr.includes(rk)) {
        usedRules.add(rk);
      }
    });
  });

  const unusedRules = ruleKeys.filter(rk => !usedRules.has(rk));
  report.structureUsage.push({
    totalRules: ruleKeys.length,
    usedRulesCount: usedRules.size,
    unusedRules: unusedRules
  });
}

// Summarize question duplicate counts instead of printing all
report.duplicates.questionTextsCount = report.duplicates.questionTexts.length;
report.duplicates.questionTextsSample = report.duplicates.questionTexts.slice(0, 10);
delete report.duplicates.questionTexts;

console.log('=== SUMMARY ===');
console.log(JSON.stringify(report.summary, null, 2));

console.log('\n=== TITLE CONSISTENCY ===');
console.log(JSON.stringify(report.titleConsistency, null, 2));

console.log('\n=== MISSING ELEMENTS ===');
console.log(JSON.stringify(report.missingElements, null, 2));

console.log('\n=== STRUCTURE USAGE ===');
console.log(JSON.stringify(report.structureUsage, null, 2));

console.log('\n=== DUPLICATES OVERVIEW ===');
console.log(JSON.stringify({
  unitIds: report.duplicates.unitIds,
  unitTitles: report.duplicates.unitTitles,
  lessonIds: report.duplicates.lessonIds,
  lessonTitles: report.duplicates.lessonTitles,
  questionDuplicatesCount: report.duplicates.questionTextsCount,
  sampleDuplicates: report.duplicates.questionTextsSample
}, null, 2));

