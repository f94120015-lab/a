const fs = require('fs');
const vm = require('vm');

let dataCode = fs.readFileSync('data.js', 'utf8');

// Replace const and let with var at the start of lines to make them global properties of the vm sandbox
dataCode = dataCode.replace(/^const\s+/gm, 'var ');
dataCode = dataCode.replace(/^let\s+/gm, 'var ');

const sandbox = { window: {}, document: {}, console: console };
vm.createContext(sandbox);

try {
  vm.runInContext(dataCode, sandbox);
  const units = sandbox.units;
  const lessons = sandbox.lessons;
  const unitSentencesMap = sandbox.unitSentencesMap;

  // First 5 elements in units array
  const first5Units = units.slice(0, 5);

  const output = [];

  first5Units.forEach((u, uIdx) => {
    const unitInfo = {
      id: u.id,
      title: u.title,
      lessons: []
    };

    u.lessons.forEach((lId, lIndex) => {
      const lesson = lessons.find(l => l.id === lId);
      if (!lesson) return;

      const lessonNumber = lIndex + 1;
      let sentenceList = [];
      
      // Let's search for unitSentencesMap first
      const uMap = unitSentencesMap[u.id];
      if (uMap) {
        let exerciseList = [];
        const keys = Object.keys(uMap);
        // Find by key in map (could be key or index)
        const key = lesson.key || keys[lIndex] || lessonNumber.toString();
        const val = uMap[key];
        if (val) {
          if (val.exercises) {
            exerciseList = val.exercises;
          } else if (Array.isArray(val)) {
            exerciseList = val;
          } else if (val.exercises === undefined && typeof val === 'object') {
            // Check if it has sub-keys or is directly array-like
            exerciseList = Object.values(val);
          }
        }

        exerciseList.forEach(ex => {
          if (ex.questions && Array.isArray(ex.questions)) {
            ex.questions.forEach(q => {
              if (q.en && q.tr) {
                sentenceList.push({ en: q.en, tr: q.tr });
              }
            });
          }
        });
      }

      // Fallback 1: search raw variables in sandbox (e.g. unit6Lesson1SentencesRaw)
      if (sentenceList.length === 0) {
        const varName1 = `unit${u.id}Lesson${lessonNumber}SentencesRaw`;
        const varName2 = `unit${u.id}Lesson${lessonNumber}Sentences`;
        const varName3 = `unit${u.id}LessonSentences`;
        const varName4 = `unit${u.id}Lesson${lessonNumber}SentencesRaw`;
        
        let rawList = sandbox[varName1] || sandbox[varName2] || sandbox[varName4];
        if (!rawList && sandbox[varName3]) {
          rawList = sandbox[varName3][lessonNumber];
        }

        if (Array.isArray(rawList)) {
          rawList.forEach(q => {
            if (q.en && q.tr) {
              sentenceList.push({ en: q.en, tr: q.tr });
            }
          });
        }
      }

      // Fallback 2: Check other naming conventions (like unit1Lesson1SentencesRaw or unit3Lesson10SentencesRaw, etc.)
      if (sentenceList.length === 0) {
        // Find any global variable that contains 'unit' + u.id + 'Lesson' + ... + 'Sentences'
        const regexStr = `unit${u.id}Lesson.*Sentences`;
        const regex = new RegExp(regexStr, 'i');
        for (const k of Object.keys(sandbox)) {
          if (regex.test(k) && Array.isArray(sandbox[k])) {
            // Let's check if this is the correct lesson by checking the displayId or title matches
            // We can match the lesson number or displayId in the variable name
            const numMatch = k.match(/\d+/g);
            if (numMatch && numMatch.length >= 2) {
              // numMatch[0] is unit ID, numMatch[1] is lesson number
              if (parseInt(numMatch[0]) === u.id && parseInt(numMatch[1]) === lessonNumber) {
                sandbox[k].forEach(q => {
                  if (q.en && q.tr) sentenceList.push({ en: q.en, tr: q.tr });
                });
              }
            }
          }
        }
      }

      // Unique sentences
      const seen = new Set();
      const uniqueSentences = [];
      sentenceList.forEach(s => {
        if (!seen.has(s.en)) {
          seen.add(s.en);
          uniqueSentences.push(s);
        }
      });

      const formula = lesson.description || '';
      
      unitInfo.lessons.push({
        id: lesson.id,
        displayId: lesson.displayId,
        title: lesson.title,
        subtitle: lesson.subtitle,
        formula: formula,
        samples: uniqueSentences.slice(0, 2)
      });
    });

    output.push(unitInfo);
  });

  fs.writeFileSync('scratch/first_5_units_data.json', JSON.stringify(output, null, 2), 'utf8');
  console.log("Successfully extracted first 5 units data!");

} catch (err) {
  console.error("Error running script:", err);
}
