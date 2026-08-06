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
const rawTopics = sandbox.rawTopics;

const auditData = units.map((u, idx) => {
  const uLessons = (u.lessons || []).map(lId => {
    const l = lessons.find(item => item.id === lId);
    if (!l) return { id: lId, error: 'LESSON_NOT_FOUND' };
    
    let exercisesCount = 0;
    let questionsCount = 0;
    let questionTypes = new Set();
    let grammarTags = new Set();

    if (l.exercises) {
      exercisesCount = l.exercises.length;
      l.exercises.forEach(ex => {
        if (ex.questions) {
          questionsCount += ex.questions.length;
          ex.questions.forEach(q => {
            if (q.type) questionTypes.add(q.type);
            if (q.grammarTags) q.grammarTags.forEach(gt => grammarTags.add(gt));
          });
        }
      });
    } else if (l.questions) {
      questionsCount = l.questions.length;
      l.questions.forEach(q => {
        if (q.type) questionTypes.add(q.type);
        if (q.grammarTags) q.grammarTags.forEach(gt => grammarTags.add(gt));
      });
    }

    return {
      id: l.id,
      title: l.title || 'Başlıksız',
      subtitle: l.subtitle || '',
      exercisesCount,
      questionsCount,
      questionTypes: Array.from(questionTypes),
      grammarTags: Array.from(grammarTags)
    };
  });

  const totalQ = uLessons.reduce((sum, l) => sum + (l.questionsCount || 0), 0);

  // Check matching rawTopic
  const matchingTopic = (rawTopics || []).find(rt => 
    rt.id === u.id || 
    (rt.title && u.title && rt.title.trim().toLowerCase() === u.title.replace(/^(Bölüm|Ara Bölüm)\s*\d+:\s*/i, '').trim().toLowerCase())
  );

  return {
    orderIndex: idx + 1,
    unitId: u.id,
    title: u.title,
    desc: u.desc || '',
    lessonCount: uLessons.length,
    totalQuestions: totalQ,
    lessons: uLessons,
    matchingRawTopic: matchingTopic ? matchingTopic.title : null
  };
});

fs.writeFileSync('scripts/audit-output.json', JSON.stringify(auditData, null, 2));
console.log('Audit generated successfully. Total units processed:', auditData.length);
