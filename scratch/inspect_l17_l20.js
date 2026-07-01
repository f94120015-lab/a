const fs = require('fs');
const vm = require('vm');

const dataCode = fs.readFileSync('data.js', 'utf8');
const sandbox = { window: {}, document: {} };
vm.createContext(sandbox);

try {
  const result = vm.runInContext(dataCode + '\n; ({ lessons, units, unitSentencesMap });', sandbox);
  const lessons = result.lessons;
  const units = result.units;
  const unitSentencesMap = result.unitSentencesMap;

  // Let's find Lesson 17 and 20
  const l17 = lessons.find(l => l.id === 17 || l.displayId === 17);
  const l20 = lessons.find(l => l.id === 20 || l.displayId === 20);

  console.log("=== Lesson 17 ===");
  if (l17) {
    console.log("id:", l17.id);
    console.log("displayId:", l17.displayId);
    console.log("title:", l17.title);
    console.log("subtitle:", l17.subtitle);
    console.log("unitId:", l17.unitId);
    console.log("exercises count:", l17.exercises ? l17.exercises.length : 0);
    if (l17.exercises) {
      l17.exercises.forEach((ex, i) => {
        console.log(`  Exercise ${i+1}: ${ex.title}`);
        console.log(`    Questions count:`, ex.questions ? ex.questions.length : 0);
        if (ex.questions && ex.questions.length > 0) {
          console.log(`    Sample Question en:`, ex.questions[0].en);
          console.log(`    Sample Question blank:`, ex.questions[0].blank);
        }
      });
    }
  } else {
    console.log("Lesson 17 not found");
  }

  console.log("\n=== Lesson 20 ===");
  if (l20) {
    console.log("id:", l20.id);
    console.log("displayId:", l20.displayId);
    console.log("title:", l20.title);
    console.log("subtitle:", l20.subtitle);
    console.log("unitId:", l20.unitId);
    console.log("exercises count:", l20.exercises ? l20.exercises.length : 0);
    if (l20.exercises) {
      l20.exercises.forEach((ex, i) => {
        console.log(`  Exercise ${i+1}: ${ex.title}`);
        console.log(`    Questions count:`, ex.questions ? ex.questions.length : 0);
        if (ex.questions && ex.questions.length > 0) {
          console.log(`    Sample Question en:`, ex.questions[0].en);
          console.log(`    Sample Question blank:`, ex.questions[0].blank);
        }
      });
    }
  } else {
    console.log("Lesson 20 not found");
  }

  // Let's print which lessons are in Unit 6 and Unit 7 from the units array
  console.log("\n=== Unit 6 in units array ===");
  const u6 = units.find(u => u.id === 6);
  if (u6) {
    console.log("Unit 6 id:", u6.id);
    console.log("Unit 6 title:", u6.title);
    console.log("Unit 6 lessons:", u6.lessons);
  }
  console.log("\n=== Unit 7 in units array ===");
  const u7 = units.find(u => u.id === 7);
  if (u7) {
    console.log("Unit 7 id:", u7.id);
    console.log("Unit 7 title:", u7.title);
    console.log("Unit 7 lessons:", u7.lessons);
  }

} catch (err) {
  console.error("Error:", err);
}
