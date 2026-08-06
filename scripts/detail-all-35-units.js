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

const executableStable = stableCode.replace(/\bexport\s+/g, '');
const stableResult = vm.runInContext(executableStable + '\n; ({ rawTopics, unitSentencesMap, units, lessons, globalLessonCounter });', sandbox);
sandbox.rawTopics = stableResult.rawTopics;
sandbox.unitSentencesMap = stableResult.unitSentencesMap;
sandbox.units = stableResult.units;
sandbox.lessons = stableResult.lessons;

const executableCode = dataCode.replace(/\bexport\s+/g, '');
const wrapperCode = executableCode + '\n; ({ units, lessons, unitSentencesMap });';
const dataResult = vm.runInContext(wrapperCode, sandbox);
sandbox.lessons = dataResult.lessons;
sandbox.units = dataResult.units;

const executableExtra = extraCode.replace(/\bexport\s+/g, '');
vm.runInContext(executableExtra, sandbox);

const executableRules = rulesCode.replace(/\bexport\s+/g, '');
vm.runInContext(executableRules, sandbox);

const units = sandbox.units;
const lessons = sandbox.lessons;

console.log(`Toplam Bölüm Sayısı: ${units.length}\n`);

const unitAnalysis = units.map((u, idx) => {
  let lessonCount = u.lessons ? u.lessons.length : 0;
  let qCount = 0;
  let missingLessons = [];

  if (u.lessons) {
    u.lessons.forEach(lId => {
      const l = lessons.find(item => item.id === lId);
      if (!l) {
        missingLessons.push(lId);
      } else {
        if (l.exercises) {
          l.exercises.forEach(ex => {
            if (ex.questions) qCount += ex.questions.length;
          });
        } else if (l.questions) {
          qCount += l.questions.length;
        }
      }
    });
  }

  return {
    index: idx + 1,
    id: u.id,
    title: u.title,
    lessonCount,
    qCount,
    missingLessons
  };
});

unitAnalysis.forEach(u => {
  console.log(`${u.index}. [${u.id}] ${u.title}`);
  console.log(`   Ders Sayısı: ${u.lessonCount} | Toplam Soru: ${u.qCount}${u.missingLessons.length ? ` | MİSSİNG LESSONS: ${u.missingLessons.join(', ')}` : ''}`);
});
