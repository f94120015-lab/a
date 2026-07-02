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
  const wrapperCode = dataCode + '\n; ({ rawTopics, units, lessons });';
  dataResult = vm.runInContext(wrapperCode, sandbox);
} catch (err) {
  console.error('Hata:', err);
  process.exit(1);
}

fs.writeFileSync('scratch/raw_topics.json', JSON.stringify(dataResult.rawTopics, null, 2));
fs.writeFileSync('scratch/rendered_lessons.json', JSON.stringify(dataResult.lessons, null, 2));
fs.writeFileSync('scratch/rendered_units.json', JSON.stringify(dataResult.units, null, 2));
console.log('Successfully wrote raw_topics.json and rendered_lessons.json');
