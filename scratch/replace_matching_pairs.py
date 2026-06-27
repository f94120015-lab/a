import re

new_func = """function getUniqueMatchingPairs(allSentences, primaryPool, count, unitId, excludeWords = new Set()) {
  const pairs = [];
  const seenWords = new Set(excludeWords);
  const seenTrs = new Set();
  const addedWords = new Set();

  const getBaseTr = (w) => {
    if (unitId === 13 && typeof unitAra1BaseTranslations !== 'undefined') return unitAra1BaseTranslations[w] || null;
    if (unitId === 17 && typeof unitAra2BaseTranslations !== 'undefined') return unitAra2BaseTranslations[w] || null;
    if (unitId === 14 && typeof unit13BaseTranslations !== 'undefined') return unit13BaseTranslations[w] || null;
    
    // Global wordDictionary fallback to use base dictionary translation for all other units
    const key = w.toLowerCase().trim();
    if (typeof wordDictionary !== 'undefined' && wordDictionary[key]) {
      const raw = wordDictionary[key];
      const clean = raw.split(',')[0].split('/')[0].split(';')[0].split('(')[0].trim();
      if (clean) return clean;
    }
    return null;
  };

  const getBaseEng = (w) => {
    if (unitId === 13 && typeof unitAra1BaseEnglish !== 'undefined') return unitAra1BaseEnglish[w] || w;
    if (unitId === 17 && typeof unitAra2BaseEnglish !== 'undefined') return unitAra2BaseEnglish[w] || w;
    return w;
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

# Let's search for function getUniqueMatchingPairs(...) { ... } in content and replace it
pattern = r"function getUniqueMatchingPairs\(allSentences, primaryPool, count, unitId, excludeWords = new Set\(\)\) \{.*?return pairs;\s*\}"
content_new, count = re.subn(pattern, new_func, content, flags=re.DOTALL)
if count > 0:
    print(f"Replaced getUniqueMatchingPairs successfully in {count} place(s).")
    with open("data.js", "w", encoding="utf-8") as f:
        f.write(content_new)
else:
    print("ERROR: Could not find getUniqueMatchingPairs in data.js!")
