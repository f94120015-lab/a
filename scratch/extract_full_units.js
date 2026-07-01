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

  let normalUnitIndex = 0;
  first5Units.forEach((u) => {
    normalUnitIndex++;
    const unitInfo = {
      id: u.id,
      title: `Bölüm ${normalUnitIndex}: ${u.title}`,
      lessons: []
    };

    u.lessons.forEach((lId, lIndex) => {
      const lesson = lessons.find(l => l.id === lId);
      if (!lesson) return;

      const lessonNumber = lIndex + 1;
      let sentenceList = [];

      // 1. Get from unitSentencesMap
      const uMap = unitSentencesMap[u.id];
      if (uMap) {
        let exerciseList = [];
        const keys = Object.keys(uMap);
        const key = lesson.key || keys[lIndex] || lessonNumber.toString();
        const val = uMap[key];
        if (val) {
          if (val.exercises) {
            exerciseList = val.exercises;
          } else if (Array.isArray(val)) {
            exerciseList = val;
          } else if (val.exercises === undefined && typeof val === 'object') {
            exerciseList = Object.values(val);
          }
        }

        exerciseList.forEach(ex => {
          if (ex.questions && Array.isArray(ex.questions)) {
            ex.questions.forEach(q => {
              if (q.en && q.tr) {
                // Remove HTML styling tags from English and Turkish for clean Word text
                const cleanEn = q.en.replace(/<[^>]*>/g, '').trim();
                const cleanTr = q.tr.replace(/<[^>]*>/g, '').trim();
                sentenceList.push({ en: cleanEn, tr: cleanTr });
              }
            });
          }
        });
      }

      // 2. Get from variables in sandbox
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
              const cleanEn = q.en.replace(/<[^>]*>/g, '').trim();
              const cleanTr = q.tr.replace(/<[^>]*>/g, '').trim();
              sentenceList.push({ en: cleanEn, tr: cleanTr });
            }
          });
        }
      }

      // 3. Fallback to global match
      if (sentenceList.length === 0) {
        const regexStr = `unit${u.id}Lesson.*Sentences`;
        const regex = new RegExp(regexStr, 'i');
        for (const k of Object.keys(sandbox)) {
          if (regex.test(k) && Array.isArray(sandbox[k])) {
            const numMatch = k.match(/\d+/g);
            if (numMatch && numMatch.length >= 2) {
              if (parseInt(numMatch[0]) === u.id && parseInt(numMatch[1]) === lessonNumber) {
                sandbox[k].forEach(q => {
                  if (q.en && q.tr) {
                    const cleanEn = q.en.replace(/<[^>]*>/g, '').trim();
                    const cleanTr = q.tr.replace(/<[^>]*>/g, '').trim();
                    sentenceList.push({ en: cleanEn, tr: cleanTr });
                  }
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
        if (!seen.has(s.en.toLowerCase())) {
          seen.add(s.en.toLowerCase());
          uniqueSentences.push(s);
        }
      });

      // Clean HTML tags from formula, example, description
      const cleanHtml = (str) => {
        if (!str) return "";
        return str.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "").trim();
      };

      unitInfo.lessons.push({
        id: lesson.id,
        displayId: lesson.displayId,
        title: lesson.title,
        subtitle: lesson.subtitle,
        formula: lesson.formula || "",
        example: cleanHtml(lesson.example),
        description: cleanHtml(lesson.description),
        samples: uniqueSentences.slice(0, 2)
      });
    });

    output.push(unitInfo);
  });

  fs.writeFileSync('scratch/first_5_units_full_data.json', JSON.stringify(output, null, 2), 'utf8');
  console.log("Successfully extracted first 5 units full data!");

} catch (err) {
  console.error("Error running script:", err);
}
