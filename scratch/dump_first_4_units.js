const fs = require('fs');
const vm = require('vm');

const dataCode = fs.readFileSync('data.js', 'utf8');

const sandbox = {
  console: console,
  window: {},
  document: {}
};

vm.createContext(sandbox);

const returnObjStr = `
; ({
  unit1IntroSentencesRaw,
  unit1Lesson2SentencesRaw,
  unit1Lesson3SentencesRaw,
  unit1Lesson4SentencesRaw,
  unit1Lesson5SentencesRaw,
  unit1Lesson6SentencesRaw1,
  unit1Lesson6SentencesRaw2,
  unit1Lesson6SentencesRaw3,
  unit1Lesson6SentencesRaw4,
  unit1Lesson6SentencesRaw5,
  unit1Lesson7SentencesRaw,
  unit2Lesson1SentencesRaw1,
  unit2Lesson1SentencesRaw2,
  unit2Lesson1SentencesRaw3,
  unit2Lesson1SentencesRaw4,
  unit2Lesson1SentencesRaw5,
  unit2Lesson2SentencesRaw1,
  unit2Lesson2SentencesRaw2,
  unit2Lesson2SentencesRaw3,
  unit2Lesson2SentencesRaw4,
  unit2Lesson2SentencesRaw5,
  unit3Lesson10SentencesRaw,
  unit3Lesson11SentencesRaw,
  unit4Lesson12SentencesRaw,
  unit4Lesson13SentencesRaw,
  units,
  lessons
});
`;

const wrapperCode = dataCode + '\n' + returnObjStr;
let dataResult;
try {
  dataResult = vm.runInContext(wrapperCode, sandbox);
} catch (err) {
  console.error('Hata:', err);
  process.exit(1);
}

// Group sentences by Unit and Lesson
const output = {
  "Bölüm 1: İsim ve Edat Yapıları (Sayfa 13)": {
    "1. Ders: Giriş. İsim ve Edat Yapılarına Giriş (Sayfa 13)": dataResult.unit1IntroSentencesRaw,
    "2. Ders: A. İsim + of the + isim (Sayfa 13)": dataResult.unit1Lesson2SentencesRaw,
    "3. Ders: B. Zamir + of the + isim (Sayfa 14)": dataResult.unit1Lesson3SentencesRaw,
    "4. Ders: C. İsim + of + isim (Sayfa 16)": dataResult.unit1Lesson4SentencesRaw,
    "5. Ders: D. İsim + from + isim (Sayfa 17)": dataResult.unit1Lesson5SentencesRaw,
    "6. Ders: E. İsim + edat yapısı (Sayfa 13)": [
      ...(dataResult.unit1Lesson6SentencesRaw1 || []),
      ...(dataResult.unit1Lesson6SentencesRaw2 || []),
      ...(dataResult.unit1Lesson6SentencesRaw3 || []),
      ...(dataResult.unit1Lesson6SentencesRaw4 || []),
      ...(dataResult.unit1Lesson6SentencesRaw5 || [])
    ],
    "7. Ders: F. İsim + edat yapısı + edat yapısı (Sayfa 19)": dataResult.unit1Lesson7SentencesRaw
  },
  "Bölüm 2: Fiil ve Edat Yapıları (Sayfa 21)": {
    "8. Ders: A. Fiil + edat yapısı (Sayfa 21)": [
      ...(dataResult.unit2Lesson1SentencesRaw1 || []),
      ...(dataResult.unit2Lesson1SentencesRaw2 || []),
      ...(dataResult.unit2Lesson1SentencesRaw3 || []),
      ...(dataResult.unit2Lesson1SentencesRaw4 || []),
      ...(dataResult.unit2Lesson1SentencesRaw5 || [])
    ],
    "9. Ders: B. Edat yapısı + edat yapısı (Sayfa 23)": [
      ...(dataResult.unit2Lesson2SentencesRaw1 || []),
      ...(dataResult.unit2Lesson2SentencesRaw2 || []),
      ...(dataResult.unit2Lesson2SentencesRaw3 || []),
      ...(dataResult.unit2Lesson2SentencesRaw4 || []),
      ...(dataResult.unit2Lesson2SentencesRaw5 || [])
    ]
  },
  "Bölüm 3: İsim Tamlaması (Sayfa 72)": {
    "10. Ders: A. İsim + isim (Sayfa 72)": dataResult.unit3Lesson10SentencesRaw,
    "11. Ders: B. İsim + isim + isim (Sayfa 78)": dataResult.unit3Lesson11SentencesRaw
  },
  "Bölüm 4: Present Participle Sıfatı (-ing) (Sayfa 81)": {
    "12. Ders: A. ...ing + isim (Sayfa 81)": dataResult.unit4Lesson12SentencesRaw,
    "13. Ders: B. İsim + ...ing + isim (Sayfa 84)": dataResult.unit4Lesson13SentencesRaw
  }
};

fs.writeFileSync('scratch/first_4_units.json', JSON.stringify(output, null, 2), 'utf8');
console.log('first_4_units.json başarıyla oluşturuldu.');
