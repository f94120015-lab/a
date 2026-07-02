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
  console.error('Hata:', err);
  process.exit(1);
}

const lessons = dataResult.lessons;
const units = dataResult.units;

let normalUnitIndex = 0;
const unitDisplayNames = {};
units.forEach(u => {
  if (u.title.startsWith("Ara Bölüm")) {
    unitDisplayNames[u.id] = u.title;
  } else {
    normalUnitIndex++;
    unitDisplayNames[u.id] = `Bölüm ${normalUnitIndex}: ${u.title}`;
  }
});

let out = '';
units.forEach(unit => {
  out += `Unit ID: ${unit.id} | Display Name: ${unitDisplayNames[unit.id]}\n`;
  unit.lessons.forEach(lId => {
    const lesson = lessons.find(l => l.id === lId);
    if (lesson) {
      out += `  -> Lesson ID: ${lesson.id} | DisplayID: ${lesson.displayId} | Title: ${lesson.title} | Subtitle: ${lesson.subtitle}\n`;
    }
  });
});

fs.writeFileSync('scratch/rendered_units_lessons.txt', out);
console.log('Done writing scratch/rendered_units_lessons.txt');
