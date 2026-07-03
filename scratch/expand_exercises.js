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
const sandboxResult = vm.runInContext(baseCode + '\n; ({ unitSentencesMap, rawTopics });', sandbox);

// Load the completed sentences pool
const sentencesPool = JSON.parse(fs.readFileSync(path.join(__dirname, 'completed_sentences.json'), 'utf8'));

// Generator function code string to run inside the sandbox
const generatorCode = `
function buildCustom20QuestionExercises(sentences, unitId, lessonId, exId, offset) {
  const qList = [];
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  // Take 12 sentences for this exercise slice
  const slice = [];
  for (let i = 0; i < 12; i++) {
    const idx = (offset + i) % sentences.length;
    slice.push(sentences[idx]);
  }

  // 1. Matching (2 questions, 8 pairs total)
  const match1Pairs = getUniqueMatchingPairs(sentences, slice, 4, unitId);
  qList.push({
    id: \`u\${unitId}l\${lessonId}_ex\${exId}_match1\`,
    type: "matching",
    prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
    pairs: match1Pairs
  });

  const match1Words = new Set(match1Pairs.map(p => p.right));
  const match2Pairs = getUniqueMatchingPairs(sentences, slice, 4, unitId, match1Words);
  qList.push({
    id: \`u\${unitId}l\${lessonId}_ex\${exId}_match2\`,
    type: "matching",
    prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
    pairs: match2Pairs
  });

  const getMcDistractors = (s, isTr) => {
    const targetVal = isTr ? s.tr : s.en;
    const distractors = [];
    const verb = s.word;
    const trVerb = s.trWord;

    if (!isTr && verb && s.en.includes(verb)) {
      const parts = s.en.split(verb);
      if (parts.length === 2) {
        const subj = parts[0].trim();
        let obj = parts[1].trim();
        const hasPeriod = obj.endsWith(".");
        if (hasPeriod) obj = obj.slice(0, -1).trim();

        const cap = str => str.charAt(0).toUpperCase() + str.slice(1);
        const decap = str => str.charAt(0).toLowerCase() + str.slice(1);
        if (subj.toLowerCase() !== obj.toLowerCase()) {
          const swapped = cap(obj) + " " + verb + " " + decap(subj) + (hasPeriod ? "." : "");
          if (swapped !== s.en && !distractors.includes(swapped)) {
            distractors.push(swapped);
          }
        }

        const subjWords = subj.split(/\\s+/);
        if (subjWords.length >= 3) {
          const idx = subjWords.length > 3 ? 2 : 1;
          const temp = subjWords[idx];
          subjWords[idx] = subjWords[idx + 1];
          subjWords[idx + 1] = temp;
          const alteredSubj = subjWords.join(" ");
          const distVal = alteredSubj + " " + verb + " " + obj + (hasPeriod ? "." : "");
          if (distVal !== s.en && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }

        const objWords = obj.split(/\\s+/);
        if (objWords.length >= 3) {
          const idx = objWords.length > 3 ? 2 : 1;
          const temp = objWords[idx];
          objWords[idx] = objWords[idx + 1];
          objWords[idx + 1] = temp;
          const alteredObj = objWords.join(" ");
          const distVal = subj + " " + verb + " " + alteredObj + (hasPeriod ? "." : "");
          if (distVal !== s.en && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }
      }
    }

    if (isTr && trVerb && s.tr.includes(trVerb)) {
      const parts = s.tr.split(trVerb);
      if (parts.length === 2) {
        const prefix = parts[0].trim();
        const suffix = parts[1].trim();
        const words = prefix.split(/\\s+/);
        if (words.length >= 3) {
          const temp = words[1];
          words[1] = words[2];
          words[2] = temp;
          const alteredPrefix = words.join(" ");
          const distVal = alteredPrefix + " " + trVerb + (suffix ? " " + suffix : "");
          if (distVal !== s.tr && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }
        if (words.length >= 4) {
          const words2 = prefix.split(/\\s+/);
          const temp = words2[2];
          words2[2] = words2[3];
          words2[3] = temp;
          const alteredPrefix = words2.join(" ");
          const distVal = alteredPrefix + " " + trVerb + (suffix ? " " + suffix : "");
          if (distVal !== s.tr && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }
      }
    }

    const others = sentences.filter(o => o.word !== s.word && o.trWord !== s.trWord);
    const shuffledOthers = shuffle(others);
    for (let i = 0; i < shuffledOthers.length; i++) {
      if (distractors.length >= 3) break;
      const other = shuffledOthers[i];
      if (isTr) {
        if (s.trWord && other.trWord && s.tr.includes(s.trWord)) {
          const distVal = getTrInflectedReplacement(s.tr, s.trWord, other.trWord);
          if (distVal !== s.tr && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }
      } else {
        if (s.word && other.word && s.en.includes(s.word)) {
          const distVal = s.en.replace(s.word, other.word);
          if (distVal !== s.en && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }
      }
    }

    if (distractors.length < 3) {
      const list = sentences.filter(item => (isTr ? item.tr : item.en) !== targetVal).map(item => isTr ? item.tr : item.en);
      const shuffled = shuffle([...new Set(list)]);
      for (const val of shuffled) {
        if (!distractors.includes(val)) {
          distractors.push(val);
        }
        if (distractors.length >= 3) break;
      }
    }

    while (distractors.length < 3) {
      distractors.push(isTr ? "deneme" : "test");
    }

    return distractors.slice(0, 3);
  };

  const getWbDistractors = (targetWords, isTr) => {
    const list = sentences.map(s => (isTr ? s.tr : s.en).replace(/<[^>]+/g, '').split(/\\s+/).map(w => w.replace(/[.,\\/#!$?\\%\\^&\\*;:{}=\\-_\\\`~()]/g, "")).flat());
    const unique = [...new Set(list.flat())].filter(w => !targetWords.includes(w));
    const shuffled = shuffle(unique);
    while (shuffled.length < 3) {
      shuffled.push(isTr ? "ve" : "the");
    }
    return shuffled.slice(0, 3);
  };

  // 2. Multiple Choice (4 questions)
  for (let i = 0; i < 2; i++) {
    const s = slice[i];
    const dist = getMcDistractors(s, true);
    const options = shuffle([s.tr, ...dist]);
    qList.push({
      id: \`u\${unitId}l\${lessonId}_ex\${exId}_mc_tr_\${i}\`,
      type: "multiple-choice",
      prompt: "Cümlenin en uygun Türkçe karşılığını seçin:",
      options: options,
      correctIndex: options.indexOf(s.tr),
      enSentence: s.en,
      isEngToTr: true
    });
  }
  for (let i = 0; i < 2; i++) {
    const s = slice[i + 2];
    const dist = getMcDistractors(s, false);
    const options = shuffle([s.en, ...dist]);
    qList.push({
      id: \`u\${unitId}l\${lessonId}_ex\${exId}_mc_en_\${i}\`,
      type: "multiple-choice",
      prompt: "Cümlenin en uygun İngilizce karşılığını seçin:",
      options: options,
      correctIndex: options.indexOf(s.en),
      enSentence: s.en,
      isEngToTr: false
    });
  }

  // 3. Fill-blank Dropdown / Button (6 questions)
  for (let i = 0; i < 6; i++) {
    const s = slice[i + 4];
    const isDropdown = i % 2 === 0;
    
    // Clean blank markers
    let blankedSentence = s.blank || s.en.replace(new RegExp(\`\\\\b\${s.word}\\\\b\`, 'i'), "___");
    if (!blankedSentence.includes("___") && !blankedSentence.includes("__________")) {
      blankedSentence = "___ " + blankedSentence;
    }
    
    const otherWords = slice.filter(o => o.word && o.word.toLowerCase() !== s.word.toLowerCase()).map(o => o.word);
    const dist = shuffle([...new Set(otherWords)]).slice(0, 3);
    while (dist.length < 3) {
      dist.push(isDropdown ? "although" : "despite");
    }
    
    const options = shuffle([s.word, ...dist]);
    qList.push({
      id: \`u\${unitId}l\${lessonId}_ex\${exId}_cloze_\${i}\`,
      type: isDropdown ? "fill-blank-dropdown" : "fill-blank",
      prompt: isDropdown ? "Boşluğa gelecek en uygun kelimeyi seçin:" : "Boşluğu doldur",
      sentence: blankedSentence,
      options: options,
      correctIndex: options.indexOf(s.word),
      translation: s.tr
    });
  }

  // 4. Word Bank (6 questions)
  for (let i = 0; i < 3; i++) {
    const s = slice[i + 6];
    const targetWords = s.tr.replace(/<[^>]+/g, '').split(/\\s+/).map(w => w.replace(/[.,\\/#!$?\\%\\^&\\*;:{}=\\-_\\\`~()]/g, ""));
    const dist = getWbDistractors(targetWords, true);
    const words = shuffle([...targetWords, ...dist]);
    qList.push({
      id: \`u\${unitId}l\${lessonId}_ex\${exId}_wb_tr_\${i}\`,
      type: "word-bank",
      prompt: "Cümlenin Türkçe karşılığını oluşturun:",
      translation: s.en,
      words: words,
      correctOrder: targetWords,
      enSentence: s.en,
      isEngToTr: true
    });
  }
  for (let i = 0; i < 3; i++) {
    const s = slice[i + 9];
    const targetWords = s.en.replace(/<[^>]+>/g, '').split(/\\s+/).map(w => w.replace(/[.,\\/#!$?\\%\\^&\\*;:{}=\\-_\\\`~()]/g, ""));
    const dist = getWbDistractors(targetWords, false);
    const words = shuffle([...targetWords, ...dist]);
    qList.push({
      id: \`u\${unitId}l\${lessonId}_ex\${exId}_wb_en_\${i}\`,
      type: "word-bank",
      prompt: "Cümlenin İngilizce karşılığını oluşturun:",
      translation: s.tr,
      words: words,
      correctOrder: targetWords,
      enSentence: s.en,
      isEngToTr: false
    });
  }

  // 5. Translation Text (exactly 2 questions, at the very end!)
  {
    const s = slice[10];
    qList.push({
      id: \`u\${unitId}l\${lessonId}_ex\${exId}_tx_tr\`,
      type: "translation-text",
      prompt: \`"\${s.en}" ifadesini Türkçe'ye çevirin:\`,
      correctSentence: s.tr,
      enSentence: s.en,
      isEngToTr: true
    });
  }
  {
    const s = slice[11];
    qList.push({
      id: \`u\${unitId}l\${lessonId}_ex\${exId}_tx_en\`,
      type: "translation-text",
      prompt: \`"\${s.tr}" ifadesini İngilizceye çevirin:\`,
      correctSentence: s.en,
      enSentence: s.en,
      isEngToTr: false
    });
  }

  // Interleave middle 16 questions
  const middle = [];
  const mcPool = qList.slice(2, 6);
  const clozePool = qList.slice(6, 12);
  const wbPool = qList.slice(12, 18);
  
  for (let i = 0; i < 6; i++) {
    if (i < clozePool.length) middle.push(clozePool[i]);
    if (i < wbPool.length) middle.push(wbPool[i]);
    if (i < mcPool.length) middle.push(mcPool[i]);
  }

  const finalQuestions = [
    qList[0], // match1
    qList[1], // match2
    ...middle,
    qList[18], // tx_tr
    qList[19]  // tx_en
  ];

  return finalQuestions;
}
`;

vm.runInContext(generatorCode, sandbox);

// Update unitSentencesMap[40]
const u40 = sandboxResult.unitSentencesMap[40];

for (let lessonId in u40) {
  const lesson = u40[lessonId];
  // Filter clean sentences pool for this lesson
  const pool = sentencesPool[lessonId].filter(s => s.en && s.tr && s.word);
  
  console.log(`Processing Lesson ${lessonId} with sentence pool size ${pool.length}`);
  
  let offset = 0;
  lesson.exercises.forEach((ex, idx) => {
    // We generate 20 questions
    const exId = idx + 1;
    const questions = sandbox.buildCustom20QuestionExercises(pool, 40, lessonId, exId, offset);
    
    ex.questions = questions;
    offset += 3;
  });
}

// Write back to data.js preserving trailing code
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
console.log("data.js successfully expanded to 20-question exercises!");
