const fs = require('fs');
const vm = require('vm');

const dataCode = fs.readFileSync('data.js', 'utf8');
const sandbox = { window: {}, document: {} };
vm.createContext(sandbox);

try {
  const result = vm.runInContext(dataCode + '\n; ({ units, lessons });', sandbox);
  const lessons = result.lessons;
  const units = result.units;

  let normalUnitIndex = 0;
  units.forEach(u => {
    let dispName = '';
    if (u.title.startsWith("Ara Bölüm")) {
      dispName = u.title;
    } else {
      normalUnitIndex++;
      dispName = `Bölüm ${normalUnitIndex}: ${u.title}`;
    }
    console.log(`${dispName} (id: ${u.id})`);
    u.lessons.forEach(lId => {
      const lesson = lessons.find(l => l.id === lId);
      if (lesson) {
        console.log(`  - Lesson ID ${lesson.id} (displayId: ${lesson.displayId}): "${lesson.title}" (${lesson.subtitle})`);
      } else {
        console.log(`  - Lesson ID ${lId} NOT FOUND`);
      }
    });
  });

} catch (err) {
  console.error("Error:", err);
}
