const fs = require('fs');
const vm = require('vm');

const stableCode = fs.readFileSync('data-stable.js', 'utf8');
const dataCode = fs.readFileSync('data.js', 'utf8');
const extraCode = fs.readFileSync('data-extra.js', 'utf8');
const rulesCode = fs.readFileSync('rules-db.js', 'utf8');
const amokText = fs.readFileSync('/Users/faruknafizfazlioglu/Desktop/documents/amoktoplu.md', 'utf8');

const sandbox = {
  console: console,
  window: { location: { hostname: 'localhost', protocol: 'http:' } },
  document: {},
  lessons: [],
  units: []
};

vm.createContext(sandbox);

const executableStable = stableCode.replace(/\bexport\s+/g, '');
const stableResult = vm.runInContext(executableStable + '\n; ({ rawTopics, unitSentencesMap, units, lessons, globalLessonCounter });', sandbox);
sandbox.rawTopics = stableResult.rawTopics;
sandbox.unitSentencesMap = stableResult.unitSentencesMap;
sandbox.units = stableResult.units;
sandbox.lessons = stableResult.lessons;

const executableCode = dataCode.replace(/\bexport\s+/g, '');
const dataResult = vm.runInContext(executableCode + '\n; ({ units, lessons, unitSentencesMap });', sandbox);
sandbox.lessons = dataResult.lessons;
sandbox.units = dataResult.units;
sandbox.unitSentencesMap = dataResult.unitSentencesMap;

const executableExtra = extraCode.replace(/\bexport\s+/g, '');
vm.runInContext(executableExtra, sandbox);

const { units, lessons, rawTopics } = sandbox;
const appFullString = JSON.stringify(sandbox);

// Breakdown of amoktoplu.md sections
const lines = amokText.split('\n');

const bookStructure = [
  { section: 'I. BÖLÜM - I', title: 'A. Özne + olmak + isim, B. Sıfat, C. Sıfat+İsim, D. Edat takımı', keywords: ['doctor', 'energy', 'wet', 'atmosphere', 'English doctor', 'train'] },
  { section: 'I. BÖLÜM - II', title: 'İsim + edat takımları (A..F)', keywords: ['factory', 'employer of these men', 'difference between'] },
  { section: 'I. BÖLÜM - III', title: 'Fiil + edat takımı, Edat takımı + edat takımı', keywords: ['speaking to the workers'] },
  { section: 'I. BÖLÜM - IV', title: 'Özne + geçişli fiil + nesne', keywords: ['transitive'] },
  { section: 'I. BÖLÜM - V', title: 'There + olmak + isim / sıfat + isim', keywords: ['There is', 'There are'] },
  { section: 'I. BÖLÜM - VI', title: 'Soru strüktürleri', keywords: ['What is', 'Is the'] },
  { section: 'I. BÖLÜM - VII', title: 'Edilgen strüktürü (Passive)', keywords: ['passive', 'edilgen'] },
  { section: 'I. BÖLÜM - VIII', title: 'Edilgen mastarı (Passive Infinitive)', keywords: ['to be done', 'passive infinitive'] },
  { section: 'I. BÖLÜM - IX', title: 'İsim tamlaması (Noun Adjuncts)', keywords: ['noun adjunct', 'isim tamlaması'] },
  { section: 'I. BÖLÜM - X', title: 'Present participle sıfatı (...ing + isim)', keywords: ['living organisms', 'emerging'] },
  { section: 'I. BÖLÜM - XI', title: 'Past participle sıfatı (...ed + isim)', keywords: ['imported', 'detailed'] },
  { section: 'I. BÖLÜM - XII', title: 'Participle takımları', keywords: ['participle clauses'] },
  { section: 'I. BÖLÜM - XIII', title: 'Mastar (Infinitive)', keywords: ['infinitive', 'to verb'] },
  { section: 'I. BÖLÜM - XIV', title: 'Strüktürel It cümlesinin öznesi (It is + adj + to/that)', keywords: ['It is clear', 'It is important'] },
  { section: 'I. BÖLÜM - XV', title: 'Maksat için kullanılan mastar (Infinitive of Purpose)', keywords: ['in order to', 'so as to'] },
  { section: 'I. BÖLÜM - XVI', title: 'Fiil ismi + nesnesi (Gerund as subject / after preposition)', keywords: ['Gerund'] },
  { section: 'I. BÖLÜM - XVII', title: 'on/by/in/without + ing, when/while/before/after/since + ing, past part.', keywords: ['without', 'by doing'] },
  { section: 'I. BÖLÜM - XVIII', title: 'Soru kelimesinden sonra gelen mastar (wh- + to verb)', keywords: ['how to', 'what to'] },
  { section: 'I. BÖLÜM - ÖZEL', title: 'Bilgi yoklaması I & II', keywords: ['Bilgi yoklaması'] },
  { section: 'I. BÖLÜM - ÖZEL', title: 'En mutat edatlar & Faydalı mutat cümle takımları', keywords: ['prepositions'] },
  { section: 'I. BÖLÜM - ÖZEL', title: 'Anlama ve tercüme için kısa metinler', keywords: ['kısa metinler'] },
  { section: 'II. BÖLÜM - I', title: 'Zarf cümleciği (Zaman, Sebep, Although, Derece, Maksat, Netice, Şart)', keywords: ['Adverbial clause', 'because', 'although', 'unless'] },
  { section: 'II. BÖLÜM - II', title: 'Mukayese strüktürleri (Comparisons)', keywords: ['than', 'as as', 'same as'] },
  { section: 'II. BÖLÜM - III', title: 'Sıfat cümleciği (Relative Clauses - who, which, where, whom, prep+which, whose)', keywords: ['Relative clause', 'which', 'whom'] },
  { section: 'II. BÖLÜM - IV', title: 'İsim cümleciği (Noun Clauses - question words, that, if/whether, the fact that)', keywords: ['Noun clause', 'that', 'whether'] },
  { section: 'II. BÖLÜM - V-VI', title: 'It + to be + adj/past part + that / mastar + that', keywords: ['It is believed that'] },
  { section: 'II. BÖLÜM - VII', title: 'Neden ve etki strüktürleri (Cause and Effect)', keywords: ['cause', 'effect', 'lead to'] },
  { section: 'II. BÖLÜM - ÖZEL', title: 'Cetvel I & Cetvel II (Tablolar)', keywords: ['Cetvel'] },
  { section: 'II. BÖLÜM - ÖZEL', title: 'Sınıflandırılmış metinler (Adverbial, Adjectival, Mixed, Noun)', keywords: ['Sınıflandırılmış metinler'] }
];

console.log('=== DEEP ANALYSIS OF AMOKTOPLU.MD VS APPLICATION ===\n');

// Analyze english sentences from amoktoplu.md
let englishSentences = [];
let vocabPairs = [];
let compQuestions = [];

let currentSection = '';

lines.forEach(l => {
  const line = l.trim();
  if (/^[I|V|X]+\.\s+[A-Z]/.test(line) || /^I+\.\s+BÖLÜM/.test(line) || /^II+\.\s+BÖLÜM/.test(line)) {
    currentSection = line;
  }

  // English sentence match
  if (/^[A-Z][A-Za-z0-9\s,\.\'\-\(\)\/\:]+\.$/.test(line) && line.length > 10 && !line.includes('Türkçeye') && !line.includes('Örnek') && !line.includes('Sözlük') && !line.includes('Bölüm')) {
    englishSentences.push({ sentence: line, section: currentSection });
  }

  // Vocab match (e.g. "author: yazar")
  if (/^[a-z\s\-\/]+\s*:\s*[a-z-A-ZçğıöşüÇĞİÖŞÜ\s,;\(\)]+$/.test(line)) {
    const parts = line.split(':');
    vocabPairs.push({ en: parts[0].trim(), tr: parts[1].trim(), section: currentSection });
  }

  // Question match
  if (/^(What|Where|Who|Why|How|Is|Are|Was|Were|Do|Does|Did|To whom|Have)\s+.*?\?$/.test(line)) {
    compQuestions.push({ question: line, section: currentSection });
  }
});

console.log(`Extracted from amoktoplu.md:`);
console.log(`- English Sentences: ${englishSentences.length}`);
console.log(`- Vocabulary Words: ${vocabPairs.length}`);
console.log(`- Comprehension Questions: ${compQuestions.length}\n`);

// Match stats
let sentenceMatches = 0;
let sentenceDetails = [];

englishSentences.forEach(item => {
  const isPresent = appFullString.includes(item.sentence);
  if (isPresent) sentenceMatches++;
});

let vocabMatches = 0;
vocabPairs.forEach(v => {
  if (appFullString.includes(v.en)) vocabMatches++;
});

let questionMatches = 0;
compQuestions.forEach(q => {
  if (appFullString.includes(q.question)) questionMatches++;
});

console.log(`App Coverage of amoktoplu.md content:`);
console.log(`- Sentences matched in App: ${sentenceMatches} / ${englishSentences.length} (${((sentenceMatches/englishSentences.length)*100).toFixed(1)}%)`);
console.log(`- Vocab matched in App: ${vocabMatches} / ${vocabPairs.length} (${((vocabMatches/vocabPairs.length)*100).toFixed(1)}%)`);
console.log(`- Questions matched in App: ${questionMatches} / ${compQuestions.length} (${((questionMatches/compQuestions.length)*100).toFixed(1)}%)\n`);

// Detailed comparison of App Units vs Book Chapters
console.log('=== APP UNITS MAPPING TO BOOK CHAPTERS ===');
units.forEach(u => {
  console.log(`\nUnit ID ${u.id}: "${u.title}"`);
  console.log(`  - Lessons count: ${(u.lessons || []).length}`);
  const uStr = JSON.stringify(u) + JSON.stringify((u.lessons || []).map(lId => lessons.find(l => l.id === lId)));
  let sampleMatchCount = 0;
  englishSentences.forEach(s => {
    if (uStr.includes(s.sentence)) sampleMatchCount++;
  });
  console.log(`  - Book sentences matching in this unit: ${sampleMatchCount}`);
});
