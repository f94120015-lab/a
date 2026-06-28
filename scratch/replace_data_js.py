# -*- coding: utf-8 -*-
import sys

with open("/Users/faruknafizfazlioglu/Desktop/amok/scratch/when_database.js", "r") as f:
    when_db = f.read()

# Let's create the javascript builder code with correct JS syntax
js_builder = """
function buildUnit19Lesson68Exercises(unitId, lessonId) {
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  // Greedy interleaving algorithm
  const interleaveQuestions = (questions) => {
    if (questions.length <= 1) return questions;
    const buckets = {};
    questions.forEach(q => {
      if (!buckets[q.type]) buckets[q.type] = [];
      buckets[q.type].push(q);
    });
    const result = [];
    let lastType = null;
    while (true) {
      let bestType = null;
      let maxCount = 0;
      for (let type in buckets) {
        if (type !== lastType && buckets[type].length > maxCount) {
          maxCount = buckets[type].length;
          bestType = type;
        }
      }
      if (!bestType) {
        for (let type in buckets) {
          if (buckets[type].length > maxCount) {
            maxCount = buckets[type].length;
            bestType = type;
          }
        }
      }
      if (!bestType || buckets[bestType].length === 0) break;
      const q = buckets[bestType].shift();
      result.push(q);
      lastType = q.type;
      if (buckets[bestType].length === 0) delete buckets[bestType];
    }
    return result;
  };

  const buildMCQuestion = (s, id) => {
    const tr = s.tr;
    // Generate distractors based on whether it is a clause or full sentence
    let d1 = tr.replace(/diğinde/g, "meden önce").replace(/duğunda/g, "madan önce").replace(/tiğinde/g, "meden önce");
    if (d1 === tr) d1 = tr + " (önce)";
    let d2 = tr.replace(/erittiğinde/g, "erittikten sonra").replace(/çöktüğünde/g, "çöktükten sonra").replace(/düştüğünde/g, "düştükten sonra");
    if (d2 === tr) d2 = tr + " (sonra)";
    let d3 = "Farklı sürüm: " + tr;
    const distractors = Array.from(new Set([d1, d2, d3])).filter(d => d !== tr);
    while (distractors.length < 3) {
      distractors.push(tr + " (yanlış sürüm " + (distractors.length + 1) + ")");
    }
    const choices = shuffle([tr, ...distractors]);
    return {
      id: id,
      type: "multiple-choice",
      prompt: `Cümlenin en uygun Türkçe karşılığını seçin:<br><br><strong>"${s.en}"</strong>`,
      options: choices,
      correctIndex: choices.indexOf(tr),
      isEngToTr: true,
      enSentence: s.en
    };
  };

  const buildClozeQuestion = (s, id, isFirstType) => {
    const correctVal = s.correct;
    const shuffledOptions = shuffle(s.options);
    if (shuffledOptions.indexOf(correctVal) === -1) {
      shuffledOptions[0] = correctVal;
    }
    return {
      id: id,
      type: isFirstType ? "fill-blank-dropdown" : "fill-blank",
      prompt: isFirstType ? "Boşluğa gelecek en uygun kelimeyi seçin:" : "Boşluğu doldur",
      sentence: s.blank,
      options: shuffledOptions,
      correctIndex: shuffledOptions.indexOf(correctVal)
    };
  };

  const buildWBQuestion = (s, id) => {
    const distractors = ["is", "was", "will", "before", "after"];
    const allWords = shuffle([...s.blocks, ...distractors]);
    return {
      id: id,
      type: "word-bank",
      prompt: "Cümle bloklarını doğru sıraya koyarak İngilizce akademik cümleyi oluşturun:",
      translation: s.tr,
      words: allWords,
      correctOrder: s.blocks,
      enSentence: s.en,
      isEngToTr: false
    };
  };

  const buildTransQuestion = (s, id) => {
    return {
      id: id,
      type: "translation-text",
      prompt: `"${s.en}" ifadesini Türkçe'ye çevirin:`,
      enSentence: s.en,
      correctSentence: s.tr,
      isEngToTr: true
    };
  };

  const buildHalvesQuestion = (sentences, id, count, splitterMap) => {
    const pairs = [];
    sentences.forEach(s => {
      if (pairs.length >= count) return;
      let left = "";
      let right = "";
      if (s.en in splitterMap) {
        const splitWord = splitterMap[s.en];
        const idx = s.en.indexOf(splitWord);
        left = s.en.substring(0, idx + splitWord.length).trim();
        right = s.en.substring(idx + splitWord.length).trim();
      } else {
        const parts = s.en.split(',');
        if (parts.length >= 2) {
          left = parts[0].trim() + ",";
          right = parts.slice(1).join(',').trim();
        } else {
          // Fallback split in half
          const words = s.en.split(' ');
          const mid = Math.floor(words.length / 2);
          left = words.slice(0, mid).join(' ');
          right = words.slice(mid).join(' ');
        }
      }
      pairs.push({
        left: left,
        right: right
      });
    });
    return {
      id: id,
      type: "matching",
      prompt: "Aşağıdaki cümle yarılarını anlamlı olacak şekilde eşleştirin.",
      leftHeader: "Yan Cümle (When...)",
      rightHeader: "Ana Cümle",
      pairs: pairs
    };
  };

  // Helper mapping to compile 9 exercises
  const compileClauseExercise = (sentences, exId, title, desc) => {
    const sorted = [...sentences].sort((a, b) => a.en.length - b.en.length);
    const exList = [];
    
    // 2 Matching (each 5 pairs)
    const matchCount = Math.min(10, sorted.length);
    if (matchCount >= 5) {
      exList.push({
        id: `u${unitId}l${lessonId}_${exId}_match1`,
        type: "matching",
        prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
        pairs: sorted.slice(0, 5).map(s => ({ left: s.tr, right: s.en }))
      });
    }
    if (matchCount >= 10) {
      exList.push({
        id: `u${unitId}l${lessonId}_${exId}_match2`,
        type: "matching",
        prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
        pairs: sorted.slice(5, 10).map(s => ({ left: s.tr, right: s.en }))
      });
    }

    // Cloze questions (half drop down, half button)
    const clozeLimit = Math.min(8, sorted.length);
    for (let i = 0; i < clozeLimit; i++) {
      exList.push(buildClozeQuestion(sorted[i], `u${unitId}l${lessonId}_${exId}_cloze_${i}`, i % 2 === 0));
    }

    // MC questions
    const mcLimit = Math.min(8, sorted.length);
    for (let i = 0; i < mcLimit; i++) {
      exList.push(buildMCQuestion(sorted[i], `u${unitId}l${lessonId}_${exId}_mc_${i}`));
    }

    // Keyboard translation (last 2 questions)
    const transList = sorted.slice(-2).map((s, idx) => buildTransQuestion(s, `u${unitId}l${lessonId}_${exId}_tr_${idx}`));

    return {
      id: `u${unitId}l${lessonId}${exId}`,
      title: title,
      description: desc,
      questions: [...interleaveQuestions(exList), ...transList]
    };
  };

  const compileSentenceExercise = (sentences, exId, title, desc, splitterMap) => {
    const sorted = [...sentences].sort((a, b) => a.en.length - b.en.length);
    const exList = [];

    // Halves matching
    exList.push(buildHalvesQuestion(sorted, `u${unitId}l${lessonId}_${exId}_halves`, Math.min(5, sorted.length), splitterMap));

    // Cloze questions
    const clozeLimit = Math.min(5, sorted.length);
    for (let i = 0; i < clozeLimit; i++) {
      exList.push(buildClozeQuestion(sorted[i], `u${unitId}l${lessonId}_${exId}_cloze_${i}`, i % 2 === 0));
    }

    // Word Bank questions for longest sentences (excluding the last 2 translation questions)
    const wbLimit = Math.max(0, sorted.length - 2);
    for (let i = 2; i < wbLimit; i++) {
      exList.push(buildWBQuestion(sorted[i], `u${unitId}l${lessonId}_${exId}_wb_${i}`));
    }

    // Keyboard translation (last 2 questions)
    const transList = sorted.slice(-2).map((s, idx) => buildTransQuestion(s, `u${unitId}l${lessonId}_${exId}_tr_${idx}`));

    return {
      id: `u${unitId}l${lessonId}${exId}`,
      title: title,
      description: desc,
      questions: [...interleaveQuestions(exList), ...transList]
    };
  };

  const splitter_144 = {
    "When it is cooled metal contracts.": "cooled",
    "When the new government is established the reforms will be introduced.": "established",
    "When water is mixed with carbon dioxide it turns it into soluble bicarbonate.": "carbon dioxide",
    "When sugar is consumed to provide muscle with energy it is decomposed and combined with oxygen.": "with energy",
    "When metal is heated it expands.": "heated",
    "When the substance is dissolved in water a solution is formed.": "in water",
    "When the logs are cut the timber is transported to the mill.": "are cut",
    "When the bacteria are examined under the microscope they can be identified.": "microscope"
  };

  // Build the 9 Exercises matching the 9 raw arrays
  return [
    compileClauseExercise(unit19Lesson3SentencesRaw, "ex1", "Alıştırma 1: Zaman Zarf Cümlecikleri — Şimdiki Zaman (Alıştırma 136)", "when ile başlayan geniş/şimdiki zaman yan cümle parçacıkları, kelime eşleştirme, çoktan seçmeli ve yazma"),
    compileClauseExercise(unit19Lesson3SentencesL2Raw, "ex2", "Alıştırma 2: Zaman Zarf Cümlecikleri — Geçmiş Zaman (Alıştırma 137)", "when ile başlayan geçmiş zaman yan cümleleri, kelime eşleştirme ve yazma"),
    compileClauseExercise(unit19Lesson3SentencesL3Raw, "ex3", "Alıştırma 3: Zaman Zarf Cümlecikleri — Perfect Zamanlar (Alıştırma 138)", "when ile başlayan present/past perfect zaman yan cümleleri, kelime eşleştirme ve yazma"),
    compileClauseExercise(unit19Lesson3SentencesL4Raw, "ex4", "Alıştırma 4: Zaman Zarf Cümlecikleri — Edilgen (Alıştırma 139)", "when ile başlayan edilgen yan cümleler, kelime eşleştirme ve yazma"),
    compileClauseExercise(unit19Lesson3SentencesL5Raw, "ex5", "Alıştırma 5: Zaman Zarf Cümlecikleri — Perfect Edilgen (Alıştırma 140)", "when ile başlayan perfect edilgen yan cümleleri, kelime eşleştirme ve yazma"),
    compileClauseExercise(unit19Lesson3SentencesL6Raw, "ex6", "Alıştırma 6: Zaman Zarf Cümlecikleri — Karışık Zamanlar (Alıştırma 141)", "when ile başlayan karışık zamanlı yan cümleleri, kelime eşleştirme ve yazma"),
    compileSentenceExercise(unit19Lesson3SentencesL7Raw, "ex7", "Alıştırma 7: Akademik Cümleler — Biyoloji & Doğa Bilimleri (Alıştırma 142)", "when ile kurulan karmaşık biyoloji ve doğa bilimleri cümleleri, eşleştirme ve yazma", {}),
    compileSentenceExercise(unit19Lesson3SentencesL8Raw, "ex8", "Alıştırma 8: Akademik Cümleler — Yönetim & Doğa (Alıştırma 143)", "when ile kurulan karmaşık yönetim ve doğa bilimleri cümleleri, eşleştirme ve yazma", {}),
    compileSentenceExercise(unit19Lesson3SentencesL9Raw, "ex9", "Alıştırma 9: Akademik Cümleler — Kimya & Fizik (Alıştırma 144)", "when ile kurulan karmaşık kimya ve fizik bilimleri cümleleri, eşleştirme ve yazma", splitter_144)
  ];
}
"""

# Let's read data.js
with open("/Users/faruknafizfazlioglu/Desktop/amok/data.js", "r") as f:
    content = f.read()

# Find the start
start_token = "// ─── BÖLÜM 19 68. DERS RAW SENTENCES (When + Present Simple) ──────────────"
end_token = "function buildAcademicExercises(sentences, unitId, lessonId, exId, offset) {"

start_idx = content.find(start_token)
end_idx = content.find(end_token)

if start_idx == -1 or end_idx == -1:
    print(f"Error: tokens not found! Start: {start_idx}, End: {end_idx}")
    sys.exit(1)

# Format the complete block
new_block = start_token + "\n\n" + when_db + "\n" + js_builder + "\n\n\n"

updated_content = content[:start_idx] + new_block + content[end_idx:]

with open("/Users/faruknafizfazlioglu/Desktop/amok/data.js", "w") as f:
    f.write(updated_content)

print("Successfully replaced block inside data.js!")
