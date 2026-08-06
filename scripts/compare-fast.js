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
const appFullString = JSON.stringify(sandbox).toLowerCase();

const lines = amokText.split('\n');

let englishSentences = [];
let vocabWords = [];
let questions = [];

lines.forEach(l => {
  const line = l.trim();
  if (/^[A-Z][A-Za-z0-9\s,\.\'\-\(\)\/\:]+\.$/.test(line) && line.length > 10 && !line.includes('Türkçeye') && !line.includes('Örnek') && !line.includes('Sözlük') && !line.includes('Bölüm')) {
    englishSentences.push(line);
  }
  if (/^[a-z\s\-\/]+\s*:\s*[a-z-A-ZçğıöşüÇĞİÖŞÜ\s,;\(\)]+$/.test(line)) {
    vocabWords.push(line.split(':')[0].trim());
  }
  if (/^(What|Where|Who|Why|How|Is|Are|Was|Were|Do|Does|Did|To whom|Have)\s+.*?\?$/.test(line)) {
    questions.push(line);
  }
});

let sentenceMatchCount = 0;
englishSentences.forEach(s => {
  if (appFullString.includes(s.toLowerCase())) sentenceMatchCount++;
});

let vocabMatchCount = 0;
vocabWords.forEach(v => {
  if (appFullString.includes(`"${v.toLowerCase()}"`)) vocabMatchCount++;
});

let qMatchCount = 0;
questions.forEach(q => {
  if (appFullString.includes(q.toLowerCase())) qMatchCount++;
});

console.log('=== VERİ EŞLEŞME ÖZETİ ===');
console.log(`Toplam Amoktoplu İngilizce Cümle: ${englishSentences.length}`);
console.log(`Uygulamada Eşleşen Cümle: ${sentenceMatchCount} (%${((sentenceMatchCount/englishSentences.length)*100).toFixed(1)})`);
console.log(`Toplam Amoktoplu Sözlük Kelimesi: ${vocabWords.length}`);
console.log(`Uygulamada Eşleşen Kelime: ${vocabMatchCount} (%${((vocabMatchCount/vocabWords.length)*100).toFixed(1)})`);
console.log(`Toplam Amoktoplu Anlama Sorusu: ${questions.length}`);
console.log(`Uygulamada Eşleşen Anlama Sorusu: ${qMatchCount} (%${((qMatchCount/questions.length)*100).toFixed(1)})`);

// Book Structure Check
console.log('\n=== KİTAP BÖLÜMLERİ VE UYGULAMA KARŞILIKLARI ===');

const bookStructureMap = [
  { code: "I. A", title: "Özne + olmak + isim", unitId: 6, unitName: "Temel Yapılar" },
  { code: "I. B", title: "Özne + olmak + sıfat", unitId: 6, unitName: "Temel Yapılar" },
  { code: "I. C", title: "Özne + olmak + sıfat + isim", unitId: 6, unitName: "Temel Yapılar" },
  { code: "I. D", title: "Özne + olmak + edat takımı", unitId: 6, unitName: "Temel Yapılar" },
  { code: "II. A-F", title: "İsim + edat takımları (of the, from, edat+edat)", unitId: 1, unitName: "İsim ve Edat Yapıları" },
  { code: "III. A-B", title: "Fiil + edat takımı, Edat + edat", unitId: 2, unitName: "Fiil ve Edat Yapıları" },
  { code: "IV", title: "Özne + geçişli fiil + nesne", unitId: 7, unitName: "Özne - Geçişli Fiil + Nesne" },
  { code: "V. A-B", title: "There + olmak + isim / sıfat + isim", unitId: 8, unitName: "Existential 'There' ve Varlık/Yokluk Yapıları" },
  { code: "VI. A-C", title: "Soru strüktürleri", unitId: 9, unitName: "Soru Yapıları" },
  { code: "VII", title: "Edilgen strüktürü (Passive)", unitId: 10, unitName: "Edilgen Yapılar ve Edilgen Mastarı" },
  { code: "VIII", title: "Edilgen mastarı (Passive Infinitive)", unitId: 10, unitName: "Edilgen Yapılar ve Edilgen Mastarı" },
  { code: "IX. A-B", title: "İsim tamlaması (Noun Adjuncts / Compound Nouns)", unitId: 3, unitName: "İsim Tamlaması" },
  { code: "X. A-B", title: "Present Participle Sıfatı (...ing + isim)", unitId: 12, unitName: "Present ve past participle sıfatları" },
  { code: "XI. A-B", title: "Past Participle Sıfatı (...ed + isim)", unitId: 12, unitName: "Present ve past participle sıfatları" },
  { code: "XII. A-B", title: "Participle Takımları (Participle Clauses)", unitId: 12, unitName: "Present ve past participle sıfatları" },
  { code: "XIII. A-B", title: "Mastar (Infinitive)", unitId: 14, unitName: "İsim-Fiiller ve Mastar Yapıları" },
  { code: "XIV. A-B", title: "Strüktürel 'It' cümlesinin öznesi", unitId: 29, unitName: "Sahte Özne Yapıları (It is + Adjective + That)" },
  { code: "XV. A-B", title: "Maksat için kullanılan mastar", unitId: 14, unitName: "İsim-Fiiller ve Mastar Yapıları" },
  { code: "XVI. A-B", title: "Fiil ismi + nesnesi (Gerund as subject)", unitId: 14, unitName: "İsim-Fiiller ve Mastar Yapıları" },
  { code: "XVII. A-C", title: "...ing + nesne / edat + ing / past part.", unitId: 14, unitName: "İsim-Fiiller ve Mastar Yapıları" },
  { code: "XVIII", title: "Soru kelimesinden sonra gelen mastar", unitId: 14, unitName: "İsim-Fiiller ve Mastar Yapıları" },
  { code: "II. I (A-G)", title: "Zarf Cümleciği (Zaman, Sebep, Although, Derece, Maksat, Netice, Şart)", unitId: 32, unitName: "Zarf Cümlecikleri" },
  { code: "II. II (A-C)", title: "Mukayese Strüktürleri (Basit, Than, As...as)", unitId: 26, unitName: "Karşılaştırma ile Sıfat Cümleciği" },
  { code: "II. III (a-g)", title: "Sıfat Cümleciği (Relative Clauses)", unitId: 26, unitName: "Karşılaştırma ile Sıfat Cümleciği" },
  { code: "II. IV (a-d)", title: "İsim Cümleciği (Noun Clauses)", unitId: 28, unitName: "İsim Cümleciği" },
  { code: "II. V-VI", title: "It + to be + sıfat/past part + that...", unitId: 29, unitName: "Sahte Özne Yapıları (It is + Adjective + That)" },
  { code: "II. VII", title: "Neden ve Etki Strüktürleri", unitId: 22, unitName: "Cümle Bağlaçları, Geçiş Kelimeleri ve Yan Cümlecikler" }
];

console.log(JSON.stringify(bookStructureMap, null, 2));

// Special Sections Analysis
console.log('\n=== ÖZEL KİTAP BÖLÜMLERİNİN UYGULAMA DURUMU ===');
const specialSections = [
  { name: "Bilgi yoklaması I", search: "bilgi yoklaması i", found: appFullString.includes("bilgi yoklaması i") },
  { name: "En mutat edatlar", search: "en mutat edatlar", found: appFullString.includes("en mutat edatlar") || appFullString.includes("edat takımı") },
  { name: "Faydalı mutat cümle takımları", search: "faydalı mutat cümle takımları", found: appFullString.includes("faydalı mutat") },
  { name: "Anlama ve tercüme için kısa metinler", search: "kısa metinler", found: appFullString.includes("kısa metinler") },
  { name: "Bilgi yoklaması II", search: "bilgi yoklaması ii", found: appFullString.includes("bilgi yoklaması ii") },
  { name: "Cetvel I & Cetvel II", search: "cetvel i", found: appFullString.includes("cetvel i") },
  { name: "Sınıflandırılmış metinler (Adverbial, Adjectival, Mixed, Noun)", search: "sınıflandırılmış metinler", found: appFullString.includes("sınıflandırılmış metinler") || appFullString.includes("adverbial clauses only") }
];
console.log(JSON.stringify(specialSections, null, 2));
