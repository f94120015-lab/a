#!/usr/bin/env node
/**
 * Fix all matching pairs in Unit 40 (Bağlaçlar) to be about conjunctions.
 * Currently some matching pairs contain verb conjugations like "-diler" / "were"
 * which are NOT conjunctions. All matching pairs should contain conjunction pairs.
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data.js');
let content = fs.readFileSync(DATA_FILE, 'utf8');
const lines = content.split('\n');

// Define the conjunction pools for each lesson
// Lesson 1: Zıtlık Bağlaçları & Neden Bağlaçları - Cümle Yapıları
const lesson1ConjunctionPool = [
  { left: "-e rağmen", right: "although" },
  { left: "-e rağmen", right: "even though" },
  { left: "-e rağmen", right: "though" },
  { left: "-e rağmen (çok ...sa da)", right: "much as" },
  { left: "-e rağmen", right: "despite" },
  { left: "-e rağmen", right: "in spite of" },
  { left: "ancak / yine de", right: "however" },
  { left: "ama", right: "but" },
  { left: "yine de / henüz", right: "yet" },
  { left: "-irken / oysa", right: "while" },
  { left: "-irken / oysa", right: "whereas" },
  { left: "çünkü", right: "because" },
  { left: "çünkü / -diği için", right: "since" },
  { left: "-diği gibi / -diği için", right: "as" },
  { left: "aksine / tersine", right: "on the contrary" },
  { left: "bunun yerine", right: "instead" },
  { left: "öte yandan", right: "on the other hand" },
  { left: "bununla birlikte", right: "nevertheless" },
  { left: "yine de / buna rağmen", right: "nonetheless" },
  { left: "buna karşın", right: "conversely" },
  { left: "hâlbuki / oysa ki", right: "whilst" },
  { left: "ne olursa olsun", right: "regardless" },
  { left: "her ne kadar...olsa da", right: "no matter how" },
];

// Lesson 2: Neden (Edat), Sonuç, Ekleme ve Açıklama/Örneklendirme Yapıları  
const lesson2ConjunctionPool = [
  { left: "-den dolayı", right: "due to" },
  { left: "-den dolayı", right: "because of" },
  { left: "-den ötürü", right: "owing to" },
  { left: "sayesinde", right: "thanks to" },
  { left: "yüzünden / hesabına", right: "on account of" },
  { left: "dolayısıyla / bu yüzden", right: "therefore" },
  { left: "sonuç olarak", right: "consequently" },
  { left: "böylece / bu şekilde", right: "thus" },
  { left: "bunun sonucunda", right: "as a result" },
  { left: "bu nedenle", right: "hence" },
  { left: "ayrıca / üstelik", right: "furthermore" },
  { left: "bunun yanı sıra", right: "moreover" },
  { left: "ek olarak", right: "in addition" },
  { left: "buna ek olarak", right: "additionally" },
  { left: "aynı şekilde / benzer biçimde", right: "likewise" },
  { left: "benzer bir şekilde", right: "similarly" },
  { left: "örneğin", right: "for example" },
  { left: "örneğin", right: "for instance" },
  { left: "yani / diğer bir deyişle", right: "in other words" },
  { left: "özellikle", right: "in particular" },
  { left: "aslında / gerçekte", right: "as a matter of fact" },
  { left: "özellikle / bilhassa", right: "specifically" },
  { left: "yani / şöyle ki", right: "namely" },
];

// Lesson 3: İkili, Amaç-Sonuç, Hariç Tutma ve İleri Düzey Bağlaç Kombinasyonları
const lesson3ConjunctionPool = [
  { left: "ne...ne de", right: "neither...nor" },
  { left: "ya...ya da", right: "either...or" },
  { left: "hem...hem de", right: "both...and" },
  { left: "sadece...değil aynı zamanda", right: "not only...but also" },
  { left: "-mek amacıyla", right: "in order to" },
  { left: "-mek amacıyla", right: "so as to" },
  { left: "-sin diye / amacıyla", right: "so that" },
  { left: "-sin diye / amacıyla", right: "in order that" },
  { left: "hariç / dışında", right: "except for" },
  { left: "-e göre / açısından", right: "in terms of" },
  { left: "yerine", right: "rather than" },
  { left: "yerine / bunun yerine", right: "instead of" },
  { left: "karşılığında", right: "in return for" },
  { left: "sonuçta / neticede", right: "as a consequence" },
  { left: "öyle...ki", right: "so...that" },
  { left: "gibi / benzer şekilde", right: "as well as" },
  { left: "şartıyla / koşuluyla", right: "provided that" },
  { left: "eğer...olursa", right: "in case" },
  { left: "aksi takdirde", right: "otherwise" },
  { left: "ne...ne de (tek)", right: "nor" },
  { left: "-e ek olarak", right: "apart from" },
  { left: "buna karşılık", right: "in contrast" },
  { left: "bir bakıma / açıdan", right: "in terms of" },
];

// Now scan through lines to find all Unit 40 matching pairs
// Find the start of unit 40 data in unitSentencesMap
let inUnit40 = false;
let matchingStartLines = [];

// Find all matching pair blocks by their IDs
const matchIdRegex = /\"id\":\s*\"u40l\d+_ex\d+_match\d+\"/;

for (let i = 0; i < lines.length; i++) {
  if (matchIdRegex.test(lines[i])) {
    matchingStartLines.push(i);
  }
}

console.log(`Found ${matchingStartLines.length} matching exercises in Unit 40`);

// For each matching exercise, extract the pairs block and determine which lesson it belongs to
let replacements = [];
let badCount = 0;

for (const startLine of matchingStartLines) {
  // Determine lesson from the id
  const idMatch = lines[startLine].match(/u40l(\d+)_ex(\d+)_match(\d+)/);
  if (!idMatch) continue;
  
  const lessonNum = parseInt(idMatch[1]);
  const exNum = parseInt(idMatch[2]);
  const matchNum = parseInt(idMatch[3]);
  
  // Select appropriate conjunction pool based on lesson
  let pool;
  if (lessonNum <= 8) {
    // Lessons 1-8 are under lesson key "1" (Zıtlık & Neden bağlaçları)
    pool = lesson1ConjunctionPool;
  } else if (lessonNum === 9 || (lessonNum >= 9 && lessonNum <= 16)) {
    // Guess: check lesson structure
    // Actually, let me check what lesson keys are used
    pool = lesson2ConjunctionPool;
  } else {
    pool = lesson3ConjunctionPool;
  }
  
  // Find the pairs array
  let pairsStartLine = -1;
  let pairsEndLine = -1;
  
  for (let j = startLine; j < Math.min(startLine + 30, lines.length); j++) {
    if (lines[j].includes('"pairs"')) {
      pairsStartLine = j;
    }
    if (pairsStartLine > 0 && j > pairsStartLine && lines[j].trim() === ']') {
      pairsEndLine = j;
      break;
    }
  }
  
  if (pairsStartLine < 0 || pairsEndLine < 0) {
    console.log(`  WARNING: Could not find pairs for match at line ${startLine + 1}`);
    continue;
  }
  
  // Extract current pairs
  const pairsBlock = lines.slice(pairsStartLine, pairsEndLine + 1).join('\n');
  
  // Check if pairs contain non-conjunction content
  const hasWere = pairsBlock.includes('"were"');
  const hasDiler = pairsBlock.includes('-diler');
  const hasEmptyLeft = pairsBlock.includes('"left": ""') || pairsBlock.includes('"left": null');
  
  // Check for any non-conjunction words that shouldn't be in matching
  const badKeywords = ['were', 'was', 'is', 'are', 'been', 'being', 'had', 'has', 'have',
                        '-diler', '-lar', '-ler', '-yor', '-mış', '-miş', '-ecek', '-acak',
                        'expanded', 'increased', 'decreased', 'analyzed', 'implemented',
                        'conducted', 'established', 'determined', 'investigated', 'evaluated'];
  
  let isBad = false;
  for (const kw of badKeywords) {
    if (pairsBlock.toLowerCase().includes(`"${kw.toLowerCase()}"`)) {
      isBad = true;
      break;
    }
  }
  
  // Also check: if any left side doesn't look like a conjunction translation
  // Valid left sides should be Turkish conjunction meanings
  const leftMatches = pairsBlock.match(/"left":\s*"([^"]*)"/g);
  if (leftMatches) {
    for (const lm of leftMatches) {
      const val = lm.match(/"left":\s*"([^"]*)"/)[1];
      if (val === '' || val === null) {
        isBad = true;
        break;
      }
    }
  }
  
  if (!isBad) {
    // Check if the right side contains actual conjunction words
    const rightMatches = pairsBlock.match(/"right":\s*"([^"]*)"/g);
    if (rightMatches) {
      const conjunctionWords = [
        'although', 'even though', 'though', 'much as', 'despite', 'in spite of',
        'however', 'but', 'yet', 'while', 'whereas', 'because', 'since', 'as',
        'on the contrary', 'instead', 'on the other hand', 'nevertheless', 'nonetheless',
        'conversely', 'whilst', 'regardless', 'no matter how',
        'due to', 'because of', 'owing to', 'thanks to', 'on account of',
        'therefore', 'consequently', 'thus', 'as a result', 'hence',
        'furthermore', 'moreover', 'in addition', 'additionally', 'likewise', 'similarly',
        'for example', 'for instance', 'in other words', 'in particular',
        'as a matter of fact', 'specifically', 'namely',
        'neither...nor', 'either...or', 'both...and', 'not only...but also',
        'in order to', 'so as to', 'so that', 'in order that',
        'except for', 'in terms of', 'rather than', 'instead of',
        'in return for', 'as a consequence', 'so...that', 'as well as',
        'provided that', 'in case', 'otherwise', 'nor', 'apart from',
        'in contrast'
      ];
      
      let hasAnyConjunction = false;
      for (const rm of rightMatches) {
        const val = rm.match(/"right":\s*"([^"]*)"/)[1].toLowerCase();
        if (conjunctionWords.includes(val)) {
          hasAnyConjunction = true;
          break;
        }
      }
      
      if (!hasAnyConjunction) {
        isBad = true;
      }
    }
  }
  
  if (isBad) {
    badCount++;
    console.log(`  BAD match at line ${startLine + 1}: u40l${lessonNum}_ex${exNum}_match${matchNum}`);
    
    // Select 4 random pairs from the pool
    // Use a deterministic seed based on exercise ID to avoid duplicates
    const seed = lessonNum * 1000 + exNum * 10 + matchNum;
    const shuffled = [...pool].sort((a, b) => {
      const ha = hashCode(`${seed}_${a.right}`) % 1000;
      const hb = hashCode(`${seed}_${b.right}`) % 1000;
      return ha - hb;
    });
    
    const selectedPairs = shuffled.slice(0, 4);
    
    // Build replacement pairs
    const indent = '                ';
    const pairStrings = selectedPairs.map(p => 
      `${indent}{\n${indent}  "left": "${p.left}",\n${indent}  "right": "${p.right}"\n${indent}}`
    );
    
    const newPairsBlock = `              "pairs": [\n${pairStrings.join(',\n')}\n              ]`;
    
    replacements.push({
      startLine: pairsStartLine,
      endLine: pairsEndLine,
      newContent: newPairsBlock,
      id: `u40l${lessonNum}_ex${exNum}_match${matchNum}`
    });
  }
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

console.log(`\nFound ${badCount} bad matching exercises out of ${matchingStartLines.length} total`);
console.log(`Will apply ${replacements.length} replacements`);

// Apply replacements in reverse order
replacements.sort((a, b) => b.startLine - a.startLine);

for (const rep of replacements) {
  const before = lines.slice(0, rep.startLine);
  const after = lines.slice(rep.endLine + 1);
  const newLines = rep.newContent.split('\n');
  
  lines.splice(rep.startLine, rep.endLine - rep.startLine + 1, ...newLines);
  console.log(`  Replaced ${rep.id} (lines ${rep.startLine + 1}-${rep.endLine + 1})`);
}

// Write back
fs.writeFileSync(DATA_FILE, lines.join('\n'), 'utf8');
console.log(`\nDone! Wrote ${lines.length} lines to data.js`);
