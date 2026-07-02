const fs = require('fs');

const dataCode = fs.readFileSync('data.js', 'utf8');
const newBlockCode = fs.readFileSync('scratch/unit33_lesson2_new.js', 'utf8');

// We want to replace the old "2: { exercises: [ ... ] }" under unit 33.
// Let's find:
// "    2: { exercises: [\n      {\n        id: \"u33l201ex1\","
// and end at the closing match:
// "    ] }"
// followed by:
// "\n  }\n};" (which closes unit 33, then the main object)

const startIndex = dataCode.indexOf('    2: { exercises: [\n      {\n        id: "u33l201ex1",');
if (startIndex === -1) {
  console.error('Error: Could not find the start of unit 33 lesson 2 exercises in data.js!');
  process.exit(1);
}

// Find the end index. Since we know the end is followed by "\n  }\n};\n\n// Pre-process rawTopics", let's search for that.
const targetEndMarker = '    ] }\n  }\n};\n\n// Pre-process rawTopics';
const endMarkerIndex = dataCode.indexOf(targetEndMarker);
if (endMarkerIndex === -1) {
  console.error('Error: Could not find the end marker of unit 33 lesson 2 exercises in data.js!');
  process.exit(1);
}

const endIndex = endMarkerIndex + 7; // up to "    ] }"

console.log('Start index:', startIndex);
console.log('End index:', endIndex);
console.log('Replacing from:', dataCode.substring(startIndex, startIndex + 100), '...');
console.log('Replacing up to:', dataCode.substring(endIndex - 100, endIndex));

const modifiedCode = dataCode.substring(0, startIndex) + newBlockCode.trim() + dataCode.substring(endIndex);

fs.writeFileSync('data.js', modifiedCode, 'utf8');
console.log('Successfully updated data.js!');
