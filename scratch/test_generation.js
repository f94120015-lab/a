const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataFilePath = path.join(__dirname, '../data.js');
const dataContent = fs.readFileSync(dataFilePath, 'utf8');

const endIdx = dataContent.indexOf('const excludedKarmaTopicIds =');
const baseCode = dataContent.substring(0, endIdx);

const sandbox = {
  console,
  window: { location: { hostname: 'localhost', protocol: 'http:' } },
  document: {},
  setTimeout,
  clearTimeout
};
vm.createContext(sandbox);
vm.runInContext(baseCode, sandbox);

console.log('getUniqueMatchingPairs exists:', typeof sandbox.getUniqueMatchingPairs);
console.log('getMcDistractors exists inside buildCustom10QuestionExercises:', typeof sandbox.buildCustom10QuestionExercises);
