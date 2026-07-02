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

let out = '';
lessons.forEach(l => {
  const unit = units.find(u => u.id === l.unitId);
  out += `DisplayID: ${l.displayId} | Title: ${l.title} | Subtitle: ${l.subtitle} | Unit ID: ${l.unitId} | Unit Title: ${unit ? unit.title : 'N/A'}\n`;
});

fs.writeFileSync('scratch/all_lessons.txt', out);
console.log('Done writing scratch/all_lessons.txt');
