new_func = """function getUniqueMatchingPairs(allSentences, primaryPool, count, unitId, excludeWords = new Set()) {
  const pairs = [];
  const seenWords = new Set(excludeWords);
  const seenTrs = new Set();
  const addedWords = new Set();

  const getEnglishRoot = (w) => {
    const word = w.toLowerCase().trim();
    if (typeof wordDictionary === 'undefined') return word;
    if (wordDictionary[word]) return word;

    // Plurals / singulars
    if (word.endsWith('s')) {
      const singular = word.slice(0, -1);
      if (wordDictionary[singular]) return singular;
      if (word.endsWith('es')) {
        const singularEs = word.slice(0, -2);
        if (wordDictionary[singularEs]) return singularEs;
      }
    }

    // Past tense -ed
    if (word.endsWith('ed')) {
      const stem1 = word.slice(0, -1); // strip 'd'
      if (wordDictionary[stem1]) return stem1;
      const stem2 = word.slice(0, -2); // strip 'ed'
      if (wordDictionary[stem2]) return stem2;
      if (word.endsWith('ied')) {
        const stem3 = word.slice(0, -3) + 'y';
        if (wordDictionary[stem3]) return stem3;
      }
      if (word.match(/[bcdfghjklmnpqrstvwxyz]\\2ed$/)) {
        const stem4 = word.slice(0, -3);
        if (wordDictionary[stem4]) return stem4;
      }
    }

    // Present participle -ing
    if (word.endsWith('ing')) {
      const stem1 = word.slice(0, -3);
      if (wordDictionary[stem1]) return stem1;
      const stem2 = word.slice(0, -3) + 'e';
      if (wordDictionary[stem2]) return stem2;
      if (word.endsWith('ying')) {
        const stem3 = word.slice(0, -4) + 'y';
        if (wordDictionary[stem3]) return stem3;
      }
      if (word.match(/[bcdfghjklmnpqrstvwxyz]\\2ing$/)) {
        const stem4 = word.slice(0, -4);
        if (wordDictionary[stem4]) return stem4;
      }
    }

    // Common irregular verbs
    const irregulars = {
      "taken": "take",
      "took": "take",
      "chosen": "choose",
      "chose": "choose",
      "spent": "spend",
      "got": "get",
      "done": "do",
      "did": "do",
      "made": "make",
      "written": "write",
      "wrote": "write",
      "read": "read",
      "built": "build",
      "shown": "show",
      "held": "hold",
      "drawn": "draw",
      "drew": "draw",
      "begun": "begin",
      "began": "begin"
    };
    if (irregulars[word]) return irregulars[word];

    return word;
  };

  const getBaseTr = (w) => {
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
  };

  const getBaseEng = (w) => {
    if (unitId === 13 && typeof unitAra1BaseEnglish !== 'undefined') return unitAra1BaseEnglish[w] || w;
    if (unitId === 17 && typeof unitAra2BaseEnglish !== 'undefined') return unitAra2BaseEnglish[w] || w;
    return getEnglishRoot(w);
  };

  // First try primaryPool (e.g. current slice)
  for (const s of primaryPool) {
    if (pairs.length >= count) break;
    const rawWord = s.word;
    if (!rawWord) continue;
    const word = getBaseEng(rawWord);
    const tr = getBaseTr(rawWord) || s.trWord;
    if (!seenWords.has(word) && !seenTrs.has(tr)) {
      seenWords.add(word);
      seenTrs.add(tr);
      addedWords.add(word);
      pairs.push({ left: tr, right: word });
    }
  }

  // Next try allSentences
  if (pairs.length < count) {
    for (const s of allSentences) {
      if (pairs.length >= count) break;
      const rawWord = s.word;
      if (!rawWord) continue;
      const word = getBaseEng(rawWord);
      const tr = getBaseTr(rawWord) || s.trWord;
      if (!seenWords.has(word) && !seenTrs.has(tr)) {
        seenWords.add(word);
        seenTrs.add(tr);
        addedWords.add(word);
        pairs.push({ left: tr, right: word });
      }
    }
  }

  // Fallback if still not enough (relaxing seenWords/seenTrs check, but trying to keep left/right unique in the returned array)
  if (pairs.length < count) {
    for (const s of primaryPool) {
      if (pairs.length >= count) break;
      const rawWord = s.word;
      if (!rawWord) continue;
      const word = getBaseEng(rawWord);
      const tr = getBaseTr(rawWord) || s.trWord;
      if (!addedWords.has(word)) {
        addedWords.add(word);
        pairs.push({ left: tr, right: word });
      }
    }
  }

  return pairs;
}"""

with open("data.js", "r", encoding="utf-8") as f:
    content = f.read()

start_marker = "function getUniqueMatchingPairs(allSentences, primaryPool, count, unitId"
end_marker = "return pairs;\n}"

start_idx = content.find(start_marker)
if start_idx != -1:
    end_idx = content.find(end_marker, start_idx) + len(end_marker)
    content_new = content[:start_idx] + new_func + content[end_idx:]
    with open("data.js", "w", encoding="utf-8") as f:
        f.write(content_new)
    print("Replaced getUniqueMatchingPairs successfully via substring slicing.")
else:
    print("ERROR: Could not find function start marker in data.js!")
