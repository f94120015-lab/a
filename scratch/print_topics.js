const fs = require('fs');

let content = fs.readFileSync('data.js', 'utf8');

// Append exports to make variables accessible
content += `
global.rawTopics = rawTopics;
global.unitSentencesMap = unitSentencesMap;
`;

// Run the file in global context
const vm = require('vm');
vm.runInThisContext(content);

console.log("=== rawTopics ===");
global.rawTopics.forEach((t, idx) => {
  if (t.title.startsWith("XVIII.") || t.title.includes("Soru Kelimesinden Sonra Gelen Mastar")) {
    console.log(`Index: ${idx}`);
    console.log(`Title: ${t.title}`);
    console.log(`numLessons: ${t.numLessons}`);
    console.log(`Subtitles:`, t.subtitles);
    console.log(`Formulas:`, t.formulas);
  }
});

console.log("\n=== unitSentencesMap[18] ===");
console.log(global.unitSentencesMap[18] || "Not found");
