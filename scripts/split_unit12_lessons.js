const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// Parse Unit 12 block in data.js
const unit12Marker = '"12": {';
const unit12Start = content.indexOf(unit12Marker);
if (unit12Start === -1) {
  console.error('Unit 12 block not found in data.js');
  process.exit(1);
}

// Evaluate unit 12 JSON object
// Find closing bracket of "12": { ... }
let depth = 0;
let unit12End = -1;
for (let i = unit12Start + 6; i < content.length; i++) {
  if (content[i] === '{') depth++;
  else if (content[i] === '}') {
    if (depth === 0) {
      unit12End = i + 1;
      break;
    }
    depth--;
  }
}

if (unit12End === -1) {
  console.error('Failed to isolate Unit 12 JSON block');
  process.exit(1);
}

const unit12Str = content.substring(unit12Start + 6, unit12End);
const unit12Obj = JSON.parse(unit12Str);

// Process lesson 1, 2, 3
// Lesson 1
if (unit12Obj["1"] && unit12Obj["1"].exercises && unit12Obj["1"].exercises.length === 1) {
  const origEx = unit12Obj["1"].exercises[0];
  const qs = origEx.questions || [];
  const mid = Math.ceil(qs.length / 2);
  unit12Obj["1"].exercises = [
    {
      id: "u12l1ex1",
      title: "Alıştırma 1: Present Participle Sıfatları (Etken Yapılar)",
      description: "Öbek ve cümle düzeyinde present participle (-ing) sıfat ve niteleme yapıları pratikleri.",
      questions: qs.slice(0, mid)
    },
    {
      id: "u12l1ex2",
      title: "Alıştırma 2: Cümle İçi Present Participle Nitelemeleri",
      description: "Hızlı refleks seçimi ve akademik cümle nitelemeleri pekiştirme testi.",
      questions: qs.slice(mid)
    }
  ];
}

// Lesson 2
if (unit12Obj["2"] && unit12Obj["2"].exercises && unit12Obj["2"].exercises.length === 1) {
  const origEx = unit12Obj["2"].exercises[0];
  const qs = origEx.questions || [];
  const mid = Math.ceil(qs.length / 2);
  unit12Obj["2"].exercises = [
    {
      id: "u12l2ex1",
      title: "Alıştırma 1: Past Participle Sıfatları (Edilgen Yapılar)",
      description: "Past participle (-ed/V3) ve zarf birleşimli edilgen nitelemeler.",
      questions: qs.slice(0, mid)
    },
    {
      id: "u12l2ex2",
      title: "Alıştırma 2: Zarflı Sıfatlar ve Past Participle Nitelemeleri",
      description: "Adverb + V3 + Noun yapıları ve akademik metin uygulamaları.",
      questions: qs.slice(mid)
    }
  ];
}

// Lesson 3
if (unit12Obj["3"] && unit12Obj["3"].exercises && unit12Obj["3"].exercises.length === 1) {
  const origEx = unit12Obj["3"].exercises[0];
  const qs = origEx.questions || [];
  const mid = Math.ceil(qs.length / 2);
  unit12Obj["3"].exercises = [
    {
      id: "u12l3ex1",
      title: "Alıştırma 1: Participle Takımları ve Temel Kısaltmalar",
      description: "Relative Clause kısaltmaları ve ortaç takımları girişi.",
      questions: qs.slice(0, mid)
    },
    {
      id: "u12l3ex2",
      title: "Alıştırma 2: Akademik Cümle Kısaltmaları ve Sentez",
      description: "İleri düzey cümle kısaltmaları ve bağlamsal niteleme analizi.",
      questions: qs.slice(mid)
    }
  ];
}

const newUnit12Str = JSON.stringify(unit12Obj, null, 2);
content = content.substring(0, unit12Start + 6) + newUnit12Str + content.substring(unit12End);

fs.writeFileSync(dataPath, content, 'utf8');
console.log('Unit 12 exercises split successfully into 2 exercises per lesson!');
