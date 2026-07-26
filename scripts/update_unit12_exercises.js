const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.js');
let code = fs.readFileSync(dataPath, 'utf8');

// Replace u12l1ex1 single exercise with 2 exercises
// We look for:
// {
//   "id": "u12l1ex1",
//   "title": "Alıştırma 1: Present Participle Sıfatları",
//   ...
//   "questions": [ ... ]
// }

// In u12l1ex1: questions are 15 total (u4l12ex1_q1..q5, u4l12ex2_q1..q5, u4l12ex3_q1..q5)
// Splitting at u4l12ex2_q3 (question 8)

// 1. Lesson 1 split marker
const targetL1Marker = `"id": "u12l1ex1",\n        "title": "Alıştırma 1: Present Participle Sıfatları",`;
const newL1Text = `"id": "u12l1ex1",
        "title": "Alıştırma 1: Present Participle Sıfatları (Etken Yapılar)",`;

if (code.includes(targetL1Marker)) {
  code = code.replace(targetL1Marker, newL1Text);
  console.log('Updated u12l1ex1 title');
}

// Split questions in u12l1ex1 into 2 exercises
const l1SplitPoint = `            "id": "u4l12ex2_q3",`;
if (code.includes(l1SplitPoint)) {
  const replaceL1Split = `]
      },
      {
        "id": "u12l1ex2",
        "title": "Alıştırma 2: Cümle İçi Present Participle Nitelemeleri",
        "description": "Hızlı refleks seçimi ve akademik cümle nitelemeleri pekiştirme testi.",
        "questions": [
          {
            "id": "u4l12ex2_q3",`;
  code = code.replace(`          {\n            "id": "u4l12ex2_q3",`, replaceL1Split);
  console.log('Split Lesson 1 into 2 exercises');
}

// 2. Lesson 2 split marker
const targetL2Marker = `"id": "u12l2ex1",\n        "title": "Alıştırma 1: Past Participle ve Zarflı Sıfatlar",`;
const newL2Text = `"id": "u12l2ex1",
        "title": "Alıştırma 1: Past Participle Sıfatları (Edilgen Yapılar)",`;

if (code.includes(targetL2Marker)) {
  code = code.replace(targetL2Marker, newL2Text);
  console.log('Updated u12l2ex1 title');
}

const l2SplitPoint = `            "id": "u4l13ex2_q3",`;
if (code.includes(l2SplitPoint)) {
  const replaceL2Split = `]
      },
      {
        "id": "u12l2ex2",
        "title": "Alıştırma 2: Zarflı Sıfatlar ve Past Participle Nitelemeleri",
        "description": "Adverb + V3 + Noun yapıları ve akademik metin uygulamaları.",
        "questions": [
          {
            "id": "u4l13ex2_q3",`;
  code = code.replace(`          {\n            "id": "u4l13ex2_q3",`, replaceL2Split);
  console.log('Split Lesson 2 into 2 exercises');
}

// 3. Lesson 3 split marker
const targetL3Marker = `"id": "u12l3ex1",\n        "title": "Alıştırma 1: Participle Takımları ve Kısaltmalar",`;
const newL3Text = `"id": "u12l3ex1",
        "title": "Alıştırma 1: Participle Takımları ve Temel Kısaltmalar",`;

if (code.includes(targetL3Marker)) {
  code = code.replace(targetL3Marker, newL3Text);
  console.log('Updated u12l3ex1 title');
}

const l3SplitPoint = `            "id": "u4l14ex2_q3",`;
if (code.includes(l3SplitPoint)) {
  const replaceL3Split = `]
      },
      {
        "id": "u12l3ex2",
        "title": "Alıştırma 2: Akademik Cümle Kısaltmaları ve Sentez",
        "description": "İleri düzey cümle kısaltmaları ve bağlamsal niteleme analizi.",
        "questions": [
          {
            "id": "u4l14ex2_q3",`;
  code = code.replace(`          {\n            "id": "u4l14ex2_q3",`, replaceL3Split);
  console.log('Split Lesson 3 into 2 exercises');
}

fs.writeFileSync(dataPath, code, 'utf8');
console.log('Unit 12 exercise split completed!');
