const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('data.js', 'utf8');

// Mock buildCustom10QuestionExercises if needed
content = `
function buildCustom10QuestionExercises() { return []; }
function buildAcademicExercises() { return []; }
` + content + `
global.rawTopics = rawTopics;
`;

try {
  vm.runInThisContext(content);
  console.log("=== ALL RAW TOPICS UP TO TOPIC 18 ===");
  global.rawTopics.slice(0, 18).forEach((t, idx) => {
    console.log(`TopicIndex: ${idx} | ID: ${t.id} | Title: ${t.title} | numLessons: ${t.numLessons}`);
    if (t.subtitles) {
      t.subtitles.forEach((sub, sIdx) => {
        console.log(`  - Sub ${sIdx + 1}: ${sub}`);
      });
    }
    console.log("-".repeat(60));
  });
} catch (e) {
  console.error("Error executing JS:", e);
}
