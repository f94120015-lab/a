const fs = require('fs');
const vm = require('vm');

const dataFilePath = '/Users/faruknafizfazlioglu/Desktop/amok/data.js';
const dataCode = fs.readFileSync(dataFilePath, 'utf8');

// Strip exports to run in VM sandbox
const executableCode = dataCode.replace(/\bexport\s+/g, '');
const wrapperCode = executableCode + '\n; ({ units, unitSentencesMap });';

const sandbox = {
  console: console,
  window: { location: { hostname: 'localhost', protocol: 'http:' } },
  document: {}
};

vm.createContext(sandbox);
const result = vm.runInContext(wrapperCode, sandbox);

const units = result.units;
const unitSentencesMap = result.unitSentencesMap;

console.log('Original unitSentencesMap keys count:', Object.keys(unitSentencesMap).length);

// Reorder keys based on curriculum units order
const sortedMap = {};
units.forEach(u => {
  const uIdStr = String(u.id);
  if (unitSentencesMap[uIdStr] && !sortedMap[uIdStr]) {
    sortedMap[uIdStr] = unitSentencesMap[uIdStr];
  }
});

// Capture any keys that might not be in units array
for (const key in unitSentencesMap) {
  if (!sortedMap[key]) {
    sortedMap[key] = unitSentencesMap[key];
  }
}

console.log('Sorted unitSentencesMap keys count:', Object.keys(sortedMap).length);

// Locate the assignment 'const unitSentencesMap = ' in data.js
const searchStr = 'const unitSentencesMap = ';
const mapStartIdx = dataCode.indexOf(searchStr);

if (mapStartIdx === -1) {
  console.error('Error: "const unitSentencesMap = " declaration not found in data.js!');
  process.exit(1);
}

// Find matching closing brace using bracket counting
const braceStartIdx = dataCode.indexOf('{', mapStartIdx);
let openBrackets = 0;
let endIdx = -1;

for (let i = braceStartIdx; i < dataCode.length; i++) {
  if (dataCode[i] === '{') {
    openBrackets++;
  } else if (dataCode[i] === '}') {
    openBrackets--;
    if (openBrackets === 0) {
      endIdx = i;
      break;
    }
  }
}

if (endIdx === -1) {
  console.error('Error: Matching closing brace for unitSentencesMap not found!');
  process.exit(1);
}

const beforePart = dataCode.substring(0, mapStartIdx);
const afterPart = dataCode.substring(endIdx + 1);

const newMapCode = `const unitSentencesMap = ${JSON.stringify(sortedMap, null, 2)}`;

const finalFileContent = beforePart + newMapCode + afterPart;

fs.writeFileSync(dataFilePath, finalFileContent, 'utf8');
console.log('data.js reorganized successfully. unitSentencesMap is now sorted in curriculum order!');
