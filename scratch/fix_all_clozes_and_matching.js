const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataFilePath = path.join(__dirname, '../data.js');
let dataContent = fs.readFileSync(dataFilePath, 'utf8');

// 1. Inject u40BaseTranslations and modify getBaseTr
const oldGetBaseTr = `  const getBaseTr = (w) => {
    // Check specific unit dictionaries first if they are defined
    if (unitId === 13 && typeof unitAra1BaseTranslations !== 'undefined') return unitAra1BaseTranslations[w] || null;
    if (unitId === 17 && typeof unitAra2BaseTranslations !== 'undefined') return unitAra2BaseTranslations[w] || null;
    if (unitId === 14 && typeof unit13BaseTranslations !== 'undefined') return unit13BaseTranslations[w] || null;

    // Global wordDictionary lookup
    const rootWord = getEnglishRoot(w);
    if (typeof wordDictionary !== 'undefined' && wordDictionary[rootWord]) {
      const raw = wordDictionary[rootWord];
      const clean = raw.split(',')[0].split('/')[0].split(';')[0].split('(')[0].trim();
      if (clean) return clean;
    }
    return null;
  };`;

const newGetBaseTr = `  const getBaseTr = (w) => {
    const u40BaseTranslations = {
      "although": "-e rağmen",
      "even though": "-e rağmen",
      "though": "-e rağmen",
      "much as": "-e rağmen (her ne kadar)",
      "despite": "-e rağmen",
      "in spite of": "-e rağmen",
      "whereas": "-e karşın (oysa)",
      "while": "iken / -e rağmen",
      "unlike": "-in aksine",
      "contrary to": "-in aksine",
      "as opposed to": "-in aksine",
      "conversely": "aksine (tersine)",
      "but": "ama",
      "yet": "yine de / fakat",
      "still": "yine de / hala",
      "however": "ancak / yine de",
      "nevertheless": "yine de / buna rağmen",
      "nonetheless": "yine de / buna rağmen",
      "even so": "yine de / öyle olsa bile",
      "on the other hand": "diğer yandan",
      "because": "çünkü / -dığı için",
      "since": "-dığı için / beri",
      "as": "-dığı için / olarak",
      "inasmuch as": "-dığı için / -den dolayı",
      "now that": "-dığı için / artık",
      "seeing that": "-dığı için / mademki",
      "given that": "-dığı göz önüne alınırsa",
      "because of": "-den dolayı / yüzünden",
      "due to": "-den dolayı / yüzünden",
      "owing to": "-den dolayı / yüzünden",
      "on account of": "-den dolayı / yüzünden",
      "in view of": "-den dolayı / göz önüne alındığında",
      "thanks to": "sayesinde",
      "therefore": "bu yüzden / dolayısıyla",
      "hence": "bu yüzden / dolayısıyla",
      "thus": "bu yüzden / böylece",
      "consequently": "sonuç olarak",
      "as a result": "sonuç olarak",
      "that's why": "bu yüzden",
      "furthermore": "dahası / ayrıca",
      "moreover": "dahası / ayrıca",
      "besides": "ayrıca / -in yanı sıra",
      "as well as": "-in yanı sıra",
      "in addition to": "-in yanı sıra",
      "along with": "-in yanı sıra",
      "likewise": "aynı şekilde / benzer şekilde",
      "similarly": "aynı şekilde / benzer şekilde",
      "such as": "gibi (örneğin)",
      "for example": "örneğin",
      "for instance": "örneğin",
      "in other words": "başka bir deyişle",
      "namely": "yani (yani adlandırmak gerekirse)",
      "that is to say": "yani / başka bir deyişle",
      "neither": "ne (neither...nor)",
      "nor": "ne de (neither...nor)",
      "either": "ya (either...or)",
      "or": "veya / ya da",
      "both": "hem (both...and)",
      "and": "ve",
      "not only": "sadece ... değil",
      "but also": "aynı zamanda ... da",
      "so": "öyle / o kadar",
      "that": "ki",
      "such": "böyle / o kadar",
      "in order to": "-mek amacıyla",
      "so as to": "-mek amacıyla",
      "so that": "-sin diye / amacıyla",
      "in order that": "-sin diye / amacıyla",
      "except for": "-den başka / hariç",
      "aside from": "-den başka / hariç",
      "apart from": "-den başka / hariç",
      "according to": "-e göre",
      "in terms of": "açısından / bakımından",
      "in accordance with": "-e uygun olarak",
      "in favor of": "lehine / yararına",
      "instead of": "-in yerine",
      "rather than": "-den ziyade / yerine",
      "for the sake of": "uğruna / aşkına",
      "as if": "sanki / -miş gibi",
      "as though": "sanki / -miş gibi",
      "when it comes to": "söz konusu olduğunda",
      "by means of": "aracılığıyla / vasıtasıyla"
    };

    const val = w.toLowerCase().trim();
    if (unitId === 40 && u40BaseTranslations[val]) {
      return u40BaseTranslations[val];
    }

    // Check specific unit dictionaries first if they are defined
    if (unitId === 13 && typeof unitAra1BaseTranslations !== 'undefined') return unitAra1BaseTranslations[w] || null;
    if (unitId === 17 && typeof unitAra2BaseTranslations !== 'undefined') return unitAra2BaseTranslations[w] || null;
    if (unitId === 14 && typeof unit13BaseTranslations !== 'undefined') return unit13BaseTranslations[w] || null;

    // Global wordDictionary lookup
    const rootWord = getEnglishRoot(w);
    if (typeof wordDictionary !== 'undefined' && wordDictionary[rootWord]) {
      const raw = wordDictionary[rootWord];
      const clean = raw.split(',')[0].split('/')[0].split(';')[0].split('(')[0].trim();
      if (clean) return clean;
    }
    return null;
  };`;

if (dataContent.includes(oldGetBaseTr)) {
  dataContent = dataContent.replace(oldGetBaseTr, newGetBaseTr);
  console.log("getBaseTr successfully replaced!");
} else {
  console.log("Could not find exact oldGetBaseTr block or already modified.");
}

// 2. Parse unitSentencesMap using sandbox context
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
const sandboxResult = vm.runInContext(baseCode + '\n; ({ unitSentencesMap, rawTopics });', sandbox);
const unitSentencesMap = sandboxResult.unitSentencesMap;

function escapeRegExp(string) {
  return string.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&');
}

let fixedCount = 0;
for (let unitId in unitSentencesMap) {
  const unit = unitSentencesMap[unitId];
  for (let lessonId in unit) {
    const lesson = unit[lessonId];
    if (lesson && Array.isArray(lesson.exercises)) {
      lesson.exercises.forEach(ex => {
        ex.questions.forEach(q => {
          if (q.type === 'fill-blank' || q.type === 'fill-blank-dropdown') {
            if (q.sentence) {
              const oldSent = q.sentence;
              
              // A. If sentence contains underscores, normalize any sequence of them to exactly "___"
              if (q.sentence.includes('_')) {
                q.sentence = q.sentence.replace(/_{2,}/g, "___");
              } else {
                // B. If sentence has no underscores, find correct word and replace it
                const correctWord = q.options && q.options[q.correctIndex];
                if (correctWord) {
                  const regex = new RegExp(`\\b${escapeRegExp(correctWord)}\\b`, 'i');
                  if (regex.test(q.sentence)) {
                    q.sentence = q.sentence.replace(regex, "___");
                  } else {
                    // Prepend "___" if not found
                    q.sentence = "___ " + q.sentence;
                  }
                } else {
                  // Prepend "___" if no correct option
                  q.sentence = "___ " + q.sentence;
                }
              }
              
              if (q.sentence !== oldSent) {
                fixedCount++;
              }
            }
          }
        });
      });
    }
  }
}

console.log(`Successfully fixed/normalized ${fixedCount} cloze questions.`);

// 3. Serialize and write back to data.js preserving bottom
const rawTopicsStart = dataContent.indexOf('const rawTopics = [');
const rawTopicsEnd = dataContent.indexOf('const lessonIcons =');

const unitSentencesMapStart = dataContent.indexOf('const unitSentencesMap = {');
const unitSentencesMapEnd = dataContent.indexOf('const excludedKarmaTopicIds =');

let newContent = dataContent.substring(0, rawTopicsStart);
newContent += `const rawTopics = ${JSON.stringify(sandboxResult.rawTopics, null, 2)};\n\n`;
newContent += dataContent.substring(rawTopicsEnd, unitSentencesMapStart);
newContent += `const unitSentencesMap = ${JSON.stringify(sandboxResult.unitSentencesMap, null, 2)};\n\n`;
newContent += dataContent.substring(unitSentencesMapEnd);

fs.writeFileSync(dataFilePath, newContent, 'utf8');
console.log("data.js successfully written back!");
