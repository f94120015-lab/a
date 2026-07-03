const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataFilePath = path.join(__dirname, '../data.js');
const dataContent = fs.readFileSync(dataFilePath, 'utf8');

const endIdx = dataContent.indexOf('const excludedKarmaTopicIds =');
const baseCode = dataContent.substring(0, endIdx);

const sandbox = {
  console,
  window: { location: { hostname: 'localhost', protocol: 'http:' } },
  document: {},
  setTimeout,
  clearTimeout
};
vm.createContext(sandbox);
const res = vm.runInContext(baseCode + '\n; ({ unitSentencesMap });', sandbox);
const unitSentencesMap = res.unitSentencesMap;

let count = 0;
for (let unitId in unitSentencesMap) {
  const unit = unitSentencesMap[unitId];
  for (let lessonId in unit) {
    const lesson = unit[lessonId];
    if (lesson && Array.isArray(lesson.exercises)) {
      lesson.exercises.forEach(ex => {
        ex.questions.forEach(q => {
          if (q.type === 'fill-blank' || q.type === 'fill-blank-dropdown') {
            if (q.sentence) {
              const underscores = q.sentence.match(/_+/g);
              if (underscores) {
                underscores.forEach(u => {
                  if (u.length !== 3) {
                    console.log(`Unit ${unitId} Lesson ${lessonId} Ex ${ex.id} Q ${q.id}: "${q.sentence}" (Underscores length: ${u.length})`);
                    count++;
                  }
                });
              } else {
                console.log(`Unit ${unitId} Lesson ${lessonId} Ex ${ex.id} Q ${q.id}: No underscores at all! "${q.sentence}"`);
                count++;
              }
            }
          }
        });
      });
    }
  }
}
console.log(`Total mismatching questions: ${count}`);
