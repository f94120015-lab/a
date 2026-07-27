const fs = require('fs');
const vm = require('vm');

const dataCode = fs.readFileSync('data.js', 'utf8');
const extraCode = fs.readFileSync('data-extra.js', 'utf8');

const sandbox = {
  console: console,
  window: { location: { hostname: 'localhost', protocol: 'http:' } },
  document: {},
  lessons: [],
  units: [],
  unitSentencesMap: {}
};

vm.createContext(sandbox);
const executableCode = dataCode.replace(/\bexport\s+/g, '');
const wrapperCode = executableCode + '\n; ({ units, lessons, unitSentencesMap });';
const dataResult = vm.runInContext(wrapperCode, sandbox);

const map = dataResult.unitSentencesMap;
let errorCount = 0;

for (const uId in map) {
  const unitObj = map[uId];
  for (const lId in unitObj) {
    const lessonObj = unitObj[lId];
    const exercises = lessonObj.exercises || [];
    exercises.forEach((ex, exIdx) => {
      const questions = ex.questions || [];
      questions.forEach((q, qIdx) => {
        // Schema normalization simulation
        let type = q.type;
        let sentence = q.sentence || q.question;
        let prompt = q.prompt;
        let options = q.options;
        let words = q.words || q.tokens;
        let correctOrder = q.correctOrder || q.correctSequence;

        if (type === 'word-bank' && q.tokens && !q.words && q.correctAnswer && typeof q.correctAnswer === 'string') {
          type = 'fill-blank-dropdown';
          options = q.tokens;
          q.correctIndex = q.tokens.indexOf(q.correctAnswer);
        }

        if ((type === 'fill-blank' || type === 'fill-blank-dropdown') && !options && q.correctAnswer) {
          type = 'fill-blank-text';
        }

        if ((type === 'fill-blank' || type === 'fill-blank-dropdown') && !sentence && prompt && prompt.includes('___')) {
          sentence = prompt;
        }

        const qId = q.id || `unit${uId}_lesson${lId}_ex${exIdx}_q${qIdx}`;

        if (!type) {
          console.error(`[ERROR] Unit ${uId} Lesson ${lId} Ex ${exIdx+1} Q ${qIdx+1} (${qId}): Missing 'type'!`);
          errorCount++;
          return;
        }

        if (type === 'fill-blank' || type === 'fill-blank-dropdown') {
          if (!options || !Array.isArray(options) || options.length === 0) {
            console.error(`[ERROR] Unit ${uId} Lesson ${lId} Ex ${exIdx+1} Q ${qIdx+1} (${qId}): Type '${type}' requires 'options' array!`);
            errorCount++;
          }
          if (q.correctIndex === undefined || q.correctIndex < 0 || q.correctIndex >= (options ? options.length : 0)) {
            console.error(`[ERROR] Unit ${uId} Lesson ${lId} Ex ${exIdx+1} Q ${qIdx+1} (${qId}): Type '${type}' invalid 'correctIndex' (${q.correctIndex})!`);
            errorCount++;
          }
          if (!sentence) {
            console.error(`[ERROR] Unit ${uId} Lesson ${lId} Ex ${exIdx+1} Q ${qIdx+1} (${qId}): Type '${type}' requires 'sentence'!`);
            errorCount++;
          }
        }

        if (type === 'multiple-choice') {
          if (!options || !Array.isArray(options) || options.length === 0) {
            console.error(`[ERROR] Unit ${uId} Lesson ${lId} Ex ${exIdx+1} Q ${qIdx+1} (${qId}): Multiple-choice requires 'options'!`);
            errorCount++;
          }
          if (q.correctIndex === undefined || q.correctIndex < 0 || q.correctIndex >= (options ? options.length : 0)) {
            console.error(`[ERROR] Unit ${uId} Lesson ${lId} Ex ${exIdx+1} Q ${qIdx+1} (${qId}): Multiple-choice invalid 'correctIndex'!`);
            errorCount++;
          }
        }

        if (type === 'matching') {
          if (!q.pairs || !Array.isArray(q.pairs) || q.pairs.length === 0) {
            console.error(`[ERROR] Unit ${uId} Lesson ${lId} Ex ${exIdx+1} Q ${qIdx+1} (${qId}): Matching requires 'pairs'!`);
            errorCount++;
          }
        }

        if (type === 'word-bank') {
          if (!words || !Array.isArray(words) || !correctOrder || !Array.isArray(correctOrder)) {
            console.error(`[ERROR] Unit ${uId} Lesson ${lId} Ex ${exIdx+1} Q ${qIdx+1} (${qId}): Word-bank requires 'words' and 'correctOrder'!`);
            errorCount++;
          }
        }
      });
    });
  }
}

if (errorCount === 0) {
  console.log('✅ ALL QUESTIONS ACROSS THE ENTIRE APP PASSED SCHEMA VALIDATION SUCCESSFULLY!');
} else {
  console.error(`❌ FOUND ${errorCount} QUESTION SCHEMA ERRORS!`);
  process.exit(1);
}
