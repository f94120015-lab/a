const fs = require('fs');

// Read data.js content
let dataContent = fs.readFileSync('data.js', 'utf8');

// We need to make sure buildCustom10QuestionExercises and other dependencies are eval'ed correctly.
// Since data.js has global variables and closures, let's append our extraction code to data.js content and run it.
let extractionCode = `
const result = {
  unit7: unitSentencesMap[7],
  unit10: unitSentencesMap[10]
};
console.log(JSON.stringify(result, null, 2));
`;

try {
  // Let's eval the entire data.js + extractionCode in a clean context
  // To avoid pollution or errors, we run it via child_process or eval
  // Let's write it to a temp file and run it via node
  fs.writeFileSync('scratch/temp_extract.js', dataContent + '\n' + extractionCode);
} catch (e) {
  console.error("Error writing temp file:", e);
}
