const fs = require('fs');
const vm = require('vm');

const dataCode = fs.readFileSync('data.js', 'utf8');
const extraCode = fs.readFileSync('data-extra.js', 'utf8');

const sandbox = {
  console: console,
  window: { location: { hostname: 'localhost', protocol: 'http:' } },
  document: {},
  lessons: [],
  units: []
};

vm.createContext(sandbox);
const executableCode = dataCode.replace(/\bexport\s+/g, '');
const wrapperCode = executableCode + '\n; ({ units, lessons, rawTopics });';
const result = vm.runInContext(wrapperCode, sandbox);

sandbox.lessons = result.lessons;
sandbox.units = result.units;

const executableExtra = extraCode.replace(/\bexport\s+/g, '');
vm.runInContext(executableExtra, sandbox);

const lessons = sandbox.lessons;
const units = sandbox.units;

console.log('--- BEFORE STATS ---');
console.log('Units (rawTopics):', result.rawTopics.length);
console.log('Units (final units):', units.length);

let totalLoadedQuestions = 0;
let totalLessons = 0;
units.forEach(unit => {
  unit.lessons.forEach(lId => {
    const lesson = lessons.find(l => l.id === lId);
    if (!lesson) return;
    totalLessons++;
    let questionsCount = 0;
    if (lesson.exercises && lesson.exercises.length > 0) {
      questionsCount = lesson.exercises.reduce((sum, ex) => sum + (ex.questions ? ex.questions.length : 0), 0);
    } else if (lesson.questions && lesson.questions.length > 0) {
      questionsCount = lesson.questions.length;
    }
    totalLoadedQuestions += questionsCount;
  });
});

console.log('Lessons in Units:', totalLessons);
console.log('Total Questions in Units:', totalLoadedQuestions);
