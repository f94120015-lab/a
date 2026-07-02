const fs = require('fs');
const vm = require('vm');

const dataCode = fs.readFileSync('data.js', 'utf8');

const sandbox = {
  console: console,
  window: { location: { hostname: 'localhost', protocol: 'http:' } },
  document: {}
};

vm.createContext(sandbox);
let dataResult;
try {
  const wrapperCode = dataCode + '\n; ({ units, lessons });';
  dataResult = vm.runInContext(wrapperCode, sandbox);
} catch (err) {
  console.error('data.js error:', err);
  process.exit(1);
}

const lessons = dataResult ? dataResult.lessons : [];
const units = dataResult ? dataResult.units : [];

[2, 15].forEach(uId => {
  const unit = units.find(u => u.id === uId);
  if (unit) {
    console.log(`Unit ID: ${unit.id}, Title: ${unit.title}`);
    unit.lessons.forEach(lId => {
      const lesson = lessons.find(l => l.id === lId);
      if (lesson) {
        console.log(`  Lesson ID: ${lesson.id}, Title: ${lesson.title}, Subtitle: ${lesson.subtitle}`);
      } else {
        console.log(`  Lesson ID: ${lId} NOT FOUND`);
      }
    });
  } else {
    console.log(`Unit ID: ${uId} NOT FOUND`);
  }
});
