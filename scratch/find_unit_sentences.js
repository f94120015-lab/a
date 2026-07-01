const fs = require('fs');
const vm = require('vm');

const dataCode = fs.readFileSync('data.js', 'utf8');
const sandbox = { window: {}, document: {} };
vm.createContext(sandbox);

try {
  const wrapperCode = dataCode + '\n; ({ unitSentencesMap });';
  const result = vm.runInContext(wrapperCode, sandbox);
  const map = result.unitSentencesMap;
  
  console.log("Keys in unitSentencesMap:", Object.keys(map));
  
  if (map[6]) {
    console.log("Unit 6 structure:", Object.keys(map[6]));
    for (let lessonId in map[6]) {
      console.log(`  Lesson ${lessonId} type:`, Array.isArray(map[6][lessonId]) ? "Array" : typeof map[6][lessonId]);
      if (!Array.isArray(map[6][lessonId])) {
        console.log(`    Keys:`, Object.keys(map[6][lessonId]));
      }
    }
  }
  if (map[7]) {
    console.log("Unit 7 structure:", Object.keys(map[7]));
    for (let lessonId in map[7]) {
      console.log(`  Lesson ${lessonId} type:`, Array.isArray(map[7][lessonId]) ? "Array" : typeof map[7][lessonId]);
      if (!Array.isArray(map[7][lessonId])) {
        console.log(`    Keys:`, Object.keys(map[7][lessonId]));
      }
    }
  }
} catch (err) {
  console.error("Error:", err);
}
