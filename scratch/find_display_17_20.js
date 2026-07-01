const fs = require('fs');
const vm = require('vm');

const dataCode = fs.readFileSync('data.js', 'utf8');
const sandbox = { window: {}, document: {} };
vm.createContext(sandbox);

try {
  const result = vm.runInContext(dataCode + '\n; ({ lessons, units });', sandbox);
  const lessons = result.lessons;

  console.log("=== Searching for displayId: 17 ===");
  const d17 = lessons.find(l => l.displayId === 17);
  if (d17) {
    console.log("Lesson with displayId 17:");
    console.log("  id:", d17.id);
    console.log("  title:", d17.title);
    console.log("  subtitle:", d17.subtitle);
    console.log("  unitId:", d17.unitId);
  }

  console.log("\n=== Searching for displayId: 20 ===");
  const d20 = lessons.find(l => l.displayId === 20);
  if (d20) {
    console.log("Lesson with displayId 20:");
    console.log("  id:", d20.id);
    console.log("  title:", d20.title);
    console.log("  subtitle:", d20.subtitle);
    console.log("  unitId:", d20.unitId);
  }

  console.log("\n=== Searching for title starting with '17.' or '20.' ===");
  const t17 = lessons.filter(l => l.title.startsWith("17.") || l.title.startsWith("20."));
  t17.forEach(l => {
    console.log(`  id: ${l.id}, displayId: ${l.displayId}, title: ${l.title}, subtitle: ${l.subtitle}, unitId: ${l.unitId}`);
  });

} catch (err) {
  console.error("Error:", err);
}
