const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data.js');
const content = fs.readFileSync(dataFilePath, 'utf8');

const vm = require('vm');
const sandbox = { console, window: { location: { hostname: 'localhost', protocol: 'http:' } }, document: {} };
vm.createContext(sandbox);
const res = vm.runInContext(content + '\n; ({ unitSentencesMap });', sandbox);
const u40 = res.unitSentencesMap[40];

const lessonsData = {};

for (let lessonId in u40) {
  const lesson = u40[lessonId];
  lessonsData[lessonId] = [];
  
  lesson.exercises.forEach(ex => {
    ex.questions.forEach(q => {
      // We skip matching exercises/questions themselves from the sentence pool to avoid duplicates or nested arrays
      if (q.type === 'matching') {
        return;
      }

      let en = '', tr = '', word = '', trWord = '', blank = '';
      
      if (q.type === 'multiple-choice') {
        word = q.options ? q.options[q.correctIndex] : '';
        let baseSent = q.sentence || '';
        
        // Strip prompts from sentence if present
        if (baseSent.includes("Choose the correct structure:")) {
          const m = baseSent.match(/Choose the correct structure:\s*'([^']+)'/);
          if (m) baseSent = m[1];
        }
        if (baseSent.includes("Choose the correct format:")) {
          const m = baseSent.match(/Choose the correct format:\s*'([^']+)'/);
          if (m) baseSent = m[1];
        }
        if (baseSent.includes("Identify the illegal structure:")) {
          const m = baseSent.match(/Identify the illegal structure:\s*'([^']+)'/);
          if (m) baseSent = m[1];
        }
        if (baseSent.includes("Select the sentence with legal punctuation for 'Conversely':")) {
          return; // skip purely meta question
        }
        if (baseSent.includes("Which connector fits")) {
          return; // skip
        }
        if (baseSent.includes("Identify the grammatically illegal")) {
          return; // skip
        }
        if (baseSent.includes("Select the correct punctuation")) {
          return; // skip
        }
        if (baseSent.includes("Identify the illegal addition")) {
          return; // skip
        }

        en = baseSent.replace(/_{3,}/g, word);
        tr = q.translation || '';
        blank = q.sentence || '';
      } else if (q.type === 'fill-blank-dropdown' || q.type === 'fill-blank') {
        blank = q.sentence || '';
        word = q.options[q.correctIndex] || '';
        en = blank.replace(/_{3,}/g, word);
        tr = q.translation || '';
      } else if (q.type === 'word-bank') {
        blank = q.sentence || '';
        if (q.isEngToTr) {
          en = q.translation || '';
          tr = q.correctOrder ? q.correctOrder.join(' ') : '';
        } else {
          tr = q.translation || '';
          en = q.correctOrder ? q.correctOrder.join(' ') : '';
        }
      } else if (q.type === 'translation-text') {
        const isTrToEng = q.prompt && q.prompt.includes("İngilizceye çevirin");
        if (isTrToEng) {
          en = q.correctSentence || '';
          tr = q.sentence || '';
        } else {
          tr = q.correctSentence || '';
          // Extract from prompt: "..." ifadesini Türkçe'ye çevirin:
          const m = q.prompt.match(/\"([^\"]+)\"/);
          if (m) en = m[1];
          else en = q.enSentence || '';
        }
      }
      
      en = en.trim().replace(/\s+/g, ' ');
      tr = tr.trim().replace(/\s+/g, ' ');
      
      // Clean up flag annotations in words if any (e.g. "(Doğru - ...)")
      if (word && word.includes('(')) {
        word = word.split('(')[0].trim();
      }

      if (en) {
        lessonsData[lessonId].push({
          exId: ex.id,
          exTitle: ex.title,
          qId: q.id,
          en,
          tr,
          word,
          trWord,
          blank
        });
      }
    });
  });
}

fs.writeFileSync(path.join(__dirname, 'clean_sentences.json'), JSON.stringify(lessonsData, null, 2), 'utf8');
console.log('Lesson 1 clean sentences:', lessonsData[1].length);
console.log('Lesson 2 clean sentences:', lessonsData[2].length);
console.log('Lesson 3 clean sentences:', lessonsData[3].length);
