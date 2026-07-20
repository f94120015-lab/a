const fs = require('fs');
const vm = require('vm');

const dataCode = fs.readFileSync('data.js', 'utf8');
const extraCode = fs.readFileSync('data-extra.js', 'utf8');

// Create a sandbox to run data.js in Node environment safely
const sandbox = {
  console: console,
  window: { location: { hostname: 'localhost', protocol: 'http:' } },
  document: {},
  lessons: [],
  units: []
};

// Run the script in the context and append an expression to return scoped const variables
vm.createContext(sandbox);
let dataResult;
try {
  // Appending an object expression at the end of the script to return the const arrays
  // Strip export statements to prevent VM syntax errors in script mode
  const executableCode = dataCode.replace(/\bexport\s+/g, '');
  const wrapperCode = executableCode + '\n; ({ units, lessons });';
  dataResult = vm.runInContext(wrapperCode, sandbox);
  
  // Populate the sandbox variables so data-extra can read/write them
  sandbox.lessons = dataResult.lessons;
  sandbox.units = dataResult.units;
  
  // Run data-extra.js
  const executableExtra = extraCode.replace(/\bexport\s+/g, '');
  vm.runInContext(executableExtra, sandbox);
} catch (err) {
  console.error('Veri dosyaları çalıştırılırken bir hata oluştu:', err);
  process.exit(1);
}

// Access variables populated by data.js and data-extra.js
const lessons = sandbox.lessons;
const units = sandbox.units;

console.log('\x1b[36m%s\x1b[0m', '\n======================================================');
console.log('\x1b[36m%s\x1b[0m', '   AMOK DERS VE SORU YÜKLEME RAPORU (DURUM KONTROLÜ)');
console.log('\x1b[36m%s\x1b[0m', '======================================================\n');

if (!units || !lessons) {
  console.error('Hata: units veya lessons verileri data.js dosyasından yüklenemedi!');
  process.exit(1);
}

let totalLoadedQuestions = 0;
let emptyLessonsCount = 0;

const unitDisplayNames = {};
[...units].forEach((u, index) => {
  const cleanTitle = u.title
    .replace(/^Ara Bölüm\s*\d+\s*:\s*/i, "")
    .replace(/^Bölüm\s*\d+\s*:\s*/i, "")
    .replace(/^Ara Bölüm\s*\d+\s*/i, "")
    .replace(/^Bölüm\s*\d+\s*/i, "");
  unitDisplayNames[u.id] = `Bölüm ${index + 1}: ${cleanTitle}`;
});

units.forEach(unit => {
  console.log(`\x1b[1m${unitDisplayNames[unit.id]}\x1b[0m`);
  
  unit.lessons.forEach(lId => {
    const lesson = lessons.find(l => l.id === lId);
    if (!lesson) {
      console.log(`  \x1b[31m- Ders ${lId}: BULUNAMADI! ❌\x1b[0m`);
      emptyLessonsCount++;
      return;
    }
    
    let info = '';
    let isWarning = false;
    let questionsCount = 0;

    if (lesson.exercises && lesson.exercises.length > 0) {
      questionsCount = lesson.exercises.reduce((sum, ex) => sum + (ex.questions ? ex.questions.length : 0), 0);
      info = `\x1b[32m${lesson.exercises.length} alıştırma (${questionsCount} soru) yüklendi ✓\x1b[0m`;
    } else if (lesson.questions && lesson.questions.length > 0) {
      questionsCount = lesson.questions.length;
      info = `\x1b[32m${questionsCount} soru doğrudan yüklendi ✓\x1b[0m`;
    } else {
      info = `\x1b[31mSoru bulunamadı! ⚠️ BOŞ\x1b[0m`;
      isWarning = true;
      emptyLessonsCount++;
    }
    
    totalLoadedQuestions += questionsCount;
    console.log(`  - \x1b[33m${lesson.title}\x1b[0m (${lesson.subtitle}): ${info}`);
  });
  console.log('');
});

console.log('======================================================');
console.log(`Toplam Yüklenen Soru Sayısı: \x1b[32m${totalLoadedQuestions}\x1b[0m`);
if (emptyLessonsCount > 0) {
  console.log(`Soru Yüklenmemiş/Eksik Ders Sayısı: \x1b[31m${emptyLessonsCount}\x1b[0m ⚠️`);
} else {
  console.log('Tüm dersler için soru yüklemeleri başarıyla tamamlanmış! \x1b[32m✓\x1b[0m');
}
console.log('======================================================\n');
