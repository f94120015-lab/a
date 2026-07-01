const fs = require('fs');
const vm = require('vm');

const dataCode = fs.readFileSync('data.js', 'utf8');

const sandbox = {
  console: console,
  window: {},
  document: {}
};

vm.createContext(sandbox);
let dataResult;
try {
  const wrapperCode = dataCode + '\n; ({ units, lessons });';
  dataResult = vm.runInContext(wrapperCode, sandbox);
} catch (err) {
  console.error('data.js running error:', err);
  process.exit(1);
}

if (!dataResult || !dataResult.units || !dataResult.lessons) {
  console.error('Error loading units/lessons from data.js');
  process.exit(1);
}

const output = {
  units: dataResult.units.map(u => ({
    id: u.id,
    title: u.title,
    description: u.description,
    lessons: u.lessons
  })),
  lessons: dataResult.lessons.map(l => ({
    id: l.id,
    title: l.title,
    subtitle: l.subtitle,
    unitId: l.unitId
  }))
};

fs.writeFileSync('scratch/curriculum.json', JSON.stringify(output, null, 2), 'utf8');
console.log('Successfully dumped curriculum to scratch/curriculum.json');
