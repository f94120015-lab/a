const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.js');
let code = fs.readFileSync(dataPath, 'utf8');

// Update Lesson 2
const l2Marker = `"id": "u12l2ex1",\n        "title": "Alıştırma 1: Past Participle Sıfatları",`;
const newL2Marker = `"id": "u12l2ex1",
        "title": "Alıştırma 1: Past Participle Sıfatları (Edilgen Yapılar)",`;

if (code.includes(l2Marker)) {
  code = code.replace(l2Marker, newL2Marker);
}

const l2SplitPoint = `          {\n            "id": "u5l14_ex2_match_phrase",`;
if (code.includes(l2SplitPoint)) {
  const replaceL2 = `]
      },
      {
        "id": "u12l2ex2",
        "title": "Alıştırma 2: Zarflı Sıfatlar ve Past Participle Nitelemeleri",
        "description": "Adverb + V3 + Noun yapıları ve akademik metin uygulamaları.",
        "questions": [
          {
            "id": "u5l14_ex2_match_phrase",`;
  code = code.replace(l2SplitPoint, replaceL2);
  console.log('Split Lesson 2 into 2 exercises');
}

// Update Lesson 3 split point
const l3SplitPoint = `          {\n            "id": "u12l39_ex1_match_basit",`;
if (code.includes(l3SplitPoint)) {
  const replaceL3 = `]
      },
      {
        "id": "u12l33_ex2",
        "title": "Alıştırma 2: Akademik Cümle Kısaltmaları ve Sentez",
        "description": "İleri düzey cümle kısaltmaları ve bağlamsal niteleme analizi.",
        "questions": [
          {
            "id": "u12l39_ex1_match_basit",`;
  code = code.replace(l3SplitPoint, replaceL3);
  console.log('Split Lesson 3 into 2 exercises');
}

fs.writeFileSync(dataPath, code, 'utf8');
console.log('Finished splitting Unit 12 lessons!');
