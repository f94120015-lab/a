const fs = require('fs');
const vm = require('vm');

const dataFilePath = '/Users/faruknafizfazlioglu/Desktop/amok/data.js';
const dataCode = fs.readFileSync(dataFilePath, 'utf8');

// Strip exports for sandbox run
const executableCode = dataCode.replace(/\bexport\s+/g, '');
const wrapperCode = executableCode + '\n; ({ units, lessons, unitSentencesMap, unitAra1Lesson1SentencesRaw, unitAra1Lesson2SentencesRaw, unitAra1Lesson3SentencesRaw, unitAra1Lesson4SentencesRaw });';

const sandbox = {
  console: console,
  window: { location: { hostname: 'localhost', protocol: 'http:' } },
  document: {}
};

vm.createContext(sandbox);
const result = vm.runInContext(wrapperCode, sandbox);

const unit13 = result.unitSentencesMap["13"];

const lessonSentences = {
  "1": result.unitAra1Lesson1SentencesRaw,
  "2": result.unitAra1Lesson2SentencesRaw,
  "3": result.unitAra1Lesson3SentencesRaw,
  "4": result.unitAra1Lesson4SentencesRaw
};

// V1 to V2 map for Lesson 1 verbs
const v1ToV2 = {
  "live": "lived",
  "optimize": "optimized",
  "request": "requested",
  "develop": "developed",
  "reinforce": "reinforced",
  "buy": "bought",
  "work": "worked",
  "evaluate": "evaluated",
  "settle": "settled",
  "read": "read",
  "design": "designed",
  "publish": "published",
  "process": "processed",
  "utilize": "utilized",
  "organize": "organized"
};

// Shuffling helper
function shuffle(arr) {
  return [...arr].sort(() => 0.5 - Math.random());
}

// Distractor helpers
function getDistractors(word, lessonNum) {
  if (lessonNum === 1) {
    return [`to ${word}`, `${word}ing`, `${word}d`, `${word}s`].filter(w => w !== word);
  } else if (lessonNum === 2) {
    const base = word.replace(/ed$/, '');
    return [base, `${base}ing`, `to ${base}`].filter(w => w !== word);
  } else if (lessonNum === 3) {
    const base = word.replace(/ed$/, '').replace(/took/, 'take').replace(/signed/, 'sign').replace(/worked/, 'work').replace(/resolved/, 'resolve').replace(/published/, 'publish').replace(/processed/, 'process').replace(/sterilized/, 'sterilize').replace(/evaluated/, 'evaluate').replace(/stayed/, 'stay').replace(/invested/, 'invest').replace(/checked/, 'check');
    return [base, `${base}ing`, `${base}s`, `had ${word}`].filter(w => w !== word);
  } else {
    const base = word.replace(/ed$/, '').replace(/taken/, 'take').replace(/updated/, 'update').replace(/worked/, 'work').replace(/signed/, 'sign').replace(/resolved/, 'resolve').replace(/published/, 'publish').replace(/processed/, 'process').replace(/sterilized/, 'sterilize').replace(/evaluated/, 'evaluate').replace(/stayed/, 'stay').replace(/invested/, 'invest').replace(/checked/, 'check');
    return [base, `${base}ing`, `${base}ed`].filter(w => w !== word);
  }
}

// Iterate over lessons 1-4 of unit 13
for (let l = 1; l <= 4; l++) {
  const lessonKey = String(l);
  const lessonData = unit13[lessonKey];
  const sentences = lessonSentences[lessonKey];
  const lessonId = 40 + l; // 41, 42, 43, 44

  // 1. Mutate existing exercises to replace 2 word-bank questions with new types
  lessonData.exercises.forEach((ex, exIdx) => {
    let wbCount = 0;
    ex.questions = ex.questions.map((q) => {
      if (q.type === 'word-bank') {
        wbCount++;
        if (wbCount > 2) {
          // Find matching raw sentence
          const s = sentences.find(item => item.en === q.enSentence);
          if (s) {
            const isDropdown = wbCount === 3;
            const dists = getDistractors(s.word, l);
            const opts = shuffle([s.word, ...dists.slice(0, 3)]);
            const correctIdx = opts.indexOf(s.word);

            if (isDropdown) {
              return {
                id: q.id.replace('_wb_', '_fbd_'),
                type: 'fill-blank-dropdown',
                prompt: 'Boşluğa gelecek en uygun kelimeyi seçin:',
                sentence: s.blank,
                options: opts,
                correctIndex: correctIdx,
                translation: s.tr
              };
            } else {
              return {
                id: q.id.replace('_wb_', '_fb_'),
                type: 'fill-blank',
                prompt: 'Boşluğu doldur',
                sentence: s.blank,
                options: opts,
                correctIndex: correctIdx,
                translation: s.tr
              };
            }
          }
        }
      }
      return q;
    });
  });

  // 2. Generate a 4th exercise containing 10 questions of the new types
  const ex4Questions = [];
  
  for (let qIdx = 0; qIdx < 10; qIdx++) {
    const s = sentences[qIdx];
    const qId = `u13l${lessonId}_ex4_q${qIdx + 1}`;

    if (qIdx < 3) {
      // fill-blank-dropdown
      const dists = getDistractors(s.word, l);
      const opts = shuffle([s.word, ...dists.slice(0, 3)]);
      const correctIdx = opts.indexOf(s.word);
      ex4Questions.push({
        id: qId,
        type: 'fill-blank-dropdown',
        prompt: 'Boşluğa gelecek en uygun kelimeyi seçin:',
        sentence: s.blank,
        options: opts,
        correctIndex: correctIdx,
        translation: s.tr
      });
    } else if (qIdx < 6) {
      // fill-blank
      const dists = getDistractors(s.word, l);
      const opts = shuffle([s.word, ...dists.slice(0, 3)]);
      const correctIdx = opts.indexOf(s.word);
      ex4Questions.push({
        id: qId,
        type: 'fill-blank',
        prompt: 'Boşluğu doldur',
        sentence: s.blank,
        options: opts,
        correctIndex: correctIdx,
        translation: s.tr
      });
    } else if (qIdx < 8) {
      // structure-match
      let correctFormula = '';
      let opts = [];
      if (l === 1) {
        correctFormula = 'Subject + would rather + V1';
        opts = ['Subject + would rather + V1', 'Subject + would rather + V2', 'Subject + would rather + have V3'];
      } else if (l === 2) {
        correctFormula = 'Subject + would rather + have + V3';
        opts = ['Subject + would rather + have + V3', 'Subject + would rather + V1', 'Subject + would rather + subject + V2'];
      } else if (l === 3) {
        correctFormula = 'Subject1 + would rather + Subject2 + V2';
        opts = ['Subject1 + would rather + Subject2 + V2', 'Subject1 + would rather + Subject2 + had V3', 'Subject + would rather + V1'];
      } else {
        correctFormula = 'Subject1 + would rather + Subject2 + had + V3';
        opts = ['Subject1 + would rather + Subject2 + had + V3', 'Subject1 + would rather + Subject2 + V2', 'Subject + would rather + have V3'];
      }

      ex4Questions.push({
        id: qId,
        type: 'structure-match',
        prompt: 'Verilen cümlenin gramer yapısı eşleşmesini bulun:',
        sentence: s.en,
        options: opts,
        correctIndex: opts.indexOf(correctFormula),
        translation: s.tr,
        explanation: `Cümledeki yapı, tercih bildiren '${correctFormula}' formülüne uygundur.`,
        hint: {
          formula: correctFormula,
          mirror: s.trWord,
          academicNote: l <= 2 ? "'would rather' kendisinden sonra doğrudan yalın fiil veya have V3 alır." : "'would rather' ifadesinden sonra farklı bir özne geldiğinde zaman kayması (Tense Shift) yaşanır."
        }
      });
    } else {
      // inversion-transformer (subject/tense shift transformer)
      let mainSentence = '';
      let prompt = '';
      let opts = [];
      let correctIdx = 0;
      let exp = '';

      if (l === 1) {
        mainSentence = s.en;
        prompt = "Tercih cümlesini 'she' öznesiyle yeniden kurarak zaman kaymasını uygulayın (subjunctive shift):";
        const v2Verb = v1ToV2[s.word] || (s.word + 'ed');
        const correctOpt = s.en.replace('would rather ' + s.word, 'would rather she ' + v2Verb);
        const dist1 = s.en.replace('would rather ' + s.word, 'would rather she ' + s.word);
        const dist2 = s.en.replace('would rather ' + s.word, 'would rather she had ' + v2Verb);
        opts = [correctOpt, dist1, dist2];
        correctIdx = 0;
        exp = "Araya farklı bir özne girdiğinde şimdiki zaman tercihi için fiil V2 çekimine bükülür.";
      } else if (l === 2) {
        mainSentence = s.en;
        prompt = "Geçmiş zaman tercih cümlesini 'you' öznesiyle yeniden kurun (subjunctive past):";
        const correctOpt = s.en.replace('would rather have', 'would rather you had');
        const dist1 = s.en.replace('would rather have', 'would rather you');
        const dist2 = s.en.replace('would rather have', 'would rather you have');
        opts = [correctOpt, dist1, dist2];
        correctIdx = 0;
        exp = "Araya farklı bir özne girdiğinde geçmiş zaman tercihi/pişmanlığı için Past Perfect (had + V3) yapısı kullanılır.";
      } else if (l === 3) {
        mainSentence = s.en;
        prompt = "Şimdiki zaman diğer kişi tercihini geçmiş zamana (pişmanlığa) dönüştürün:";
        const correctOpt = lessonSentences["4"][qIdx].en;
        const dist1 = s.en;
        const dist2 = s.en.replace(' ' + s.word + ' ', ' have ' + lessonSentences["4"][qIdx].word + ' ');
        opts = [correctOpt, dist1, dist2];
        correctIdx = 0;
        exp = "Diğer kişilerin geçmişteki tercihleri had + V3 ile bükülür.";
      } else {
        mainSentence = s.en;
        prompt = "Geçmiş zaman diğer kişi tercihini şimdiki zaman tercihine (subjunctive present) dönüştürün:";
        const correctOpt = lessonSentences["3"][qIdx].en;
        const dist1 = s.en;
        const dist2 = s.en.replace('had ' + s.word, 'have ' + s.word);
        opts = [correctOpt, dist1, dist2];
        correctIdx = 0;
        exp = "Farklı özneyle şimdiki zaman tercihi yapılırken fiil V2 düzeyinde çekimlenir.";
      }

      ex4Questions.push({
        id: qId,
        type: 'inversion-transformer',
        prompt: prompt,
        mainSentence: mainSentence,
        options: opts,
        correctIndex: correctIdx,
        explanation: exp
      });
    }
  }

  lessonData.exercises.push({
    id: `u13l${lessonId}ex4`,
    title: 'Alıştırma 4: Hibrit Refleks Testi',
    description: 'Çoktan seçmeli boşluk doldurma, sentaks eşleştirme ve yapı dönüştürme egzersizleri.',
    questions: ex4Questions
  });
}

// 3. Convert mutated unit13 object back to JS code string
const formattedJSON = JSON.stringify(unit13, null, 2);

// Replace lines in data.js
const lines = dataCode.split('\n');
const startLineIdx = 73895 - 1; // 0-indexed
const endLineIdx = 76812 - 1; // 0-indexed

const beforePart = lines.slice(0, startLineIdx).join('\n');
const afterPart = lines.slice(endLineIdx + 1).join('\n');

const updatedUnit13Code = `  "13": ${formattedJSON},`;

const finalFileContent = beforePart + '\n' + updatedUnit13Code + '\n' + afterPart;

fs.writeFileSync(dataFilePath, finalFileContent, 'utf8');
console.log('data.js updated successfully for Unit 13 (Bölüm 31).');
