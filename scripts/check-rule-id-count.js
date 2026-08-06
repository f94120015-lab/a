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

let questionsWithRuleId = 0;
let totalQ = 0;
sandbox.lessons.forEach(l => {
  const qs = l.questions || (l.exercises ? l.exercises.flatMap(e => e.questions || []) : []);
  qs.forEach(q => {
    totalQ++;
    if (q.ruleId) questionsWithRuleId++;
  });
});

console.log(`Total questions in lessons: ${totalQ}`);
console.log(`Questions with ruleId: ${questionsWithRuleId}`);
