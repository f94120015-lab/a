const fs = require('fs');
const vm = require('vm');

const dataCode = fs.readFileSync('data.js', 'utf8');
const sandbox = { window: {}, document: {} };
vm.createContext(sandbox);

try {
  const result = vm.runInContext(dataCode + '\n; ({ unitSentencesMap });', sandbox);
  const map = result.unitSentencesMap;
  
  if (map[33]) {
    console.log("Unit 33 structure:", Object.keys(map[33]));
    for (let key in map[33]) {
      console.log(`  Lesson key ${key}:`);
      const val = map[33][key];
      if (val.exercises) {
        console.log(`    Exercises:`, val.exercises.map(ex => ({ id: ex.id, title: ex.title, qCount: ex.questions ? ex.questions.length : 0 })));
      } else {
        console.log(`    Value type:`, Array.isArray(val) ? "Array" : typeof val);
        if (Array.isArray(val)) {
          console.log(`    Array length:`, val.length);
        }
      }
    }
  } else {
    console.log("Unit 33 not found in unitSentencesMap");
  }
} catch (err) {
  console.error("Error:", err);
}
