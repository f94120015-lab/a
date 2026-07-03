const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataFilePath = path.join(__dirname, '../data.js');
let dataContent = fs.readFileSync(dataFilePath, 'utf8');

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
  "by means of": "aracılığıyla / vasıtasıyla",
  "by reason of": "-den dolayı / yüzünden",
  "that is": "yani / başka bir deyişle",
      "in that": "-mesi bakımından / çünkü"
};

let fixedPairsCount = 0;
for (let unitId in unitSentencesMap) {
  const unit = unitSentencesMap[unitId];
  for (let lessonId in unit) {
    const lesson = unit[lessonId];
    if (lesson && Array.isArray(lesson.exercises)) {
      lesson.exercises.forEach(ex => {
        ex.questions.forEach(q => {
          if (q.type === 'matching' && Array.isArray(q.pairs)) {
            q.pairs.forEach(pair => {
              if (!pair.left || pair.left.trim() === '') {
                const rightWord = pair.right.toLowerCase().trim();
                
                // Lookup translation in u40 Base Translations
                if (u40BaseTranslations[rightWord]) {
                  pair.left = u40BaseTranslations[rightWord];
                  fixedPairsCount++;
                  console.log(`Unit ${unitId} Lesson ${lessonId} Ex ${ex.id}: Fixed "${rightWord}" -> "${pair.left}"`);
                } else {
                  // Fallback dictionary check
                  if (typeof sandbox.wordDictionary !== 'undefined' && sandbox.wordDictionary[rightWord]) {
                    const raw = sandbox.wordDictionary[rightWord];
                    pair.left = raw.split(',')[0].split('/')[0].split(';')[0].split('(')[0].trim();
                    fixedPairsCount++;
                    console.log(`Unit ${unitId} Lesson ${lessonId} Ex ${ex.id}: Fixed via WordDictionary "${rightWord}" -> "${pair.left}"`);
                  } else {
                    console.log(`Unit ${unitId} Lesson ${lessonId} Ex ${ex.id}: WARNING: No translation found for "${pair.right}"`);
                  }
                }
              }
            });
          }
        });
      });
    }
  }
}

console.log(`Total fixed matching pairs: ${fixedPairsCount}`);

// Serialize and write back to data.js preserving bottom
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
console.log("data.js successfully written back after fixing matching pairs!");
