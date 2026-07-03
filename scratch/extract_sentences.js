const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data.js');
const content = fs.readFileSync(dataFilePath, 'utf8');

// Evaluate in sandbox to get unitSentencesMap
const vm = require('vm');
const sandbox = { console, window: { location: { hostname: 'localhost', protocol: 'http:' } }, document: {} };
vm.createContext(sandbox);
const res = vm.runInContext(content + '\n; ({ unitSentencesMap });', sandbox);
const u40 = res.unitSentencesMap[40];

const toTranslate = [];

for (let lessonId in u40) {
  const lesson = u40[lessonId];
  lesson.exercises.forEach(ex => {
    ex.questions.forEach((q, qIdx) => {
      // Cloze/MC questions that don't have explicit translation
      if (q.type === 'multiple-choice' || q.type === 'fill-blank-dropdown' || q.type === 'fill-blank') {
        if (!q.translation && !q.correctSentence) {
          const word = q.options ? q.options[q.correctIndex] : '';
          const en = q.sentence ? q.sentence.replace(/_{3,}/g, word) : '';
          if (en) {
            toTranslate.push({
              exId: ex.id,
              qId: q.id,
              en: en.trim().replace(/\s+/g, ' ')
            });
          }
        }
      }
    });
  });
}

fs.writeFileSync(path.join(__dirname, 'to_translate.txt'), JSON.stringify(toTranslate, null, 2), 'utf8');
console.log(`Found ${toTranslate.length} sentences to translate.`);
