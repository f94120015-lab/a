const fs = require('fs');
const vm = require('vm');

const dataCode = fs.readFileSync('data.js', 'utf8');

// Create a sandbox to run data.js in Node environment safely
const sandbox = {
  console: console,
  window: {},
  document: {}
};

// Run the script in the context and append an expression to return scoped const variables
vm.createContext(sandbox);
let dataResult;
try {
  // Appending an object expression at the end of the script to return the const arrays
  const wrapperCode = dataCode + '\n; ({ units, lessons });';
  dataResult = vm.runInContext(wrapperCode, sandbox);
} catch (err) {
  console.error('data.js çalıştırılırken bir hata oluştu:', err);
  process.exit(1);
}

// Access variables populated by data.js
const lessons = dataResult ? dataResult.lessons : null;
const units = dataResult ? dataResult.units : null;

console.log('\x1b[36m%s\x1b[0m', '\n======================================================');
console.log('\x1b[36m%s\x1b[0m', '   AMOK DERS VE SORU YÜKLEME RAPORU (DURUM KONTROLÜ)');
console.log('\x1b[36m%s\x1b[0m', '======================================================\n');

if (!units || !lessons) {
  console.error('Hata: units veya lessons verileri data.js dosyasından yüklenemedi!');
  process.exit(1);
}

let totalLoadedQuestions = 0;
let emptyLessonsCount = 0;

let normalUnitIndex = 0;
const unitDisplayNames = {};
[...units].sort((a, b) => a.id - b.id).forEach(u => {
  if (u.title.startsWith("Ara Bölüm")) {
    unitDisplayNames[u.id] = u.title;
  } else {
    normalUnitIndex++;
    unitDisplayNames[u.id] = `Bölüm ${normalUnitIndex}: ${u.title}`;
  }
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
