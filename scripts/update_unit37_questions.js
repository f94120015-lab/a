const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// Rich questions for questions53_2
const extraQuestions53_2 = `
  {
    "id": "c54_l02_ef1",
    "type": "error-finder",
    "prompt": "Cümledeki noktalama ve bağlaç sentaksı hatasını saptayın:",
    "sentenceTokens": [
      "The",
      "code",
      "optimization",
      "failed,",
      "however",
      "the",
      "deployment",
      "succeeded."
    ],
    "correctIndex": 4,
    "suggestedCorrection": "; however,",
    "translation": "'however' iki bağımsız cümleyi sadece virgülle bağlayamaz; noktalı virgül (; however,) veya nokta sonrasında büyük harfle başlamalıdır."
  },
  {
    "id": "c54_l02_wb1",
    "type": "word-bank",
    "prompt": "Cümle bloklarını doğru sentaks sırasına dizin:",
    "translation": "Algoritma karmaşık olmasına rağmen, verileri gerçek zamanlı işledi.",
    "words": [
      "Although the algorithm was complex,",
      "it processed data",
      "in real time.",
      "despite",
      "however"
    ],
    "correctOrder": [
      "Although the algorithm was complex,",
      "it processed data",
      "in real time."
    ],
    "enSentence": "Although the algorithm was complex, it processed data in real time.",
    "isEngToTr": false
  },
  {
    "id": "c54_l02_sc1",
    "type": "sentence-connector",
    "prompt": "Noktalama işaretine ve anlamsal yönelime göre doğru bağlama cümlesini seçin:",
    "mainSentence": "The security team patched the critical vulnerability;",
    "options": [
      "nevertheless, several unauthorized access attempts were logged.",
      "although several unauthorized access attempts were logged.",
      "despite several unauthorized access attempts were logged."
    ],
    "correctIndex": 0,
    "translation": "Güvenlik ekibi kritik açığı kapattı; yine de, birkaç yetkisiz erişim denemesi kaydedildi."
  },
  {
    "id": "c54_l02_cd1",
    "type": "fill-blank-dropdown",
    "prompt": "Boşluktan sonraki isim öbeğine göre en uygun sebep bağlacını seçin:",
    "sentence": "The service experienced temporary downtime ___ the unexpected hardware failure.",
    "options": [
      "due to",
      "because",
      "although",
      "even though"
    ],
    "correctIndex": 0,
    "translation": "Hizmet, beklenmeyen donanım arızası nedeniyle geçici kesinti yaşadı."
  }
`;

// Rich questions for questions53_3
const extraQuestions53_3 = `
  {
    "id": "c54_l03_ef1",
    "type": "error-finder",
    "prompt": "Noktalama ve geçiş kelimesi kullanımındaki hatayı yakalayın:",
    "sentenceTokens": [
      "The",
      "compiler",
      "errors",
      "block",
      "the",
      "build,",
      "for instance,",
      "syntax",
      "issues",
      "crash",
      "it."
    ],
    "correctIndex": 6,
    "suggestedCorrection": "; for instance,",
    "translation": "'for instance' bağımsız cümleleri bağlarken virgülden önce noktalı virgül (;) gerektirir."
  },
  {
    "id": "c54_l03_wb1",
    "type": "word-bank",
    "prompt": "Cümle bloklarını doğru dizerek geçiş uyarısını oluşturun:",
    "translation": "Güvenlik açığını yamamalıyız; aksi takdirde veritabanı savunmasız kalacaktır.",
    "words": [
      "We must patch the security flaw;",
      "otherwise,",
      "the database will be",
      "vulnerable."
    ],
    "correctOrder": [
      "We must patch the security flaw;",
      "otherwise,",
      "the database will be",
      "vulnerable."
    ],
    "enSentence": "We must patch the security flaw; otherwise, the database will be vulnerable.",
    "isEngToTr": false
  },
  {
    "id": "c54_l03_sc1",
    "type": "sentence-connector",
    "prompt": "Geçiş bağlacı sentaksına uygun cümleyi seçin:",
    "mainSentence": "The query loops were unoptimized;",
    "options": [
      "nonetheless, the response time remained under ten milliseconds.",
      "in spite of the response time remained under ten milliseconds.",
      "even though the response time remained under ten milliseconds."
    ],
    "correctIndex": 0,
    "translation": "Sorgu döngüleri optimize edilmemişti; yine de, yanıt süresi on milisaniyenin altında kaldı."
  },
  {
    "id": "c54_l03_cd1",
    "type": "context-distractor",
    "prompt": "Zıtlık ve geçiş bağlamına göre boşluğu doldurun:",
    "sentence": "The application passed all unit tests; _______, integration testing revealed a memory leak.",
    "options": [
      "however",
      "although",
      "despite",
      "due to"
    ],
    "correctIndex": 0,
    "translation": "Uygulama tüm birim testlerini geçti; ancak, entegrasyon testleri bellek sızıntısını ortaya çıkardı."
  }
`;

// Insert extraQuestions53_2 before line end of questions53_2
const q53_2_end = `    "id": "c54_l02_q20",`;
if (content.includes(q53_2_end) && !content.includes(`"id": "c54_l02_ef1",`)) {
  const targetIdx = content.indexOf(`\n];\n\n  const questions53_3 = [`);
  if (targetIdx !== -1) {
    content = content.slice(0, targetIdx) + `,\n` + extraQuestions53_2 + content.slice(targetIdx);
    console.log('Successfully injected extraQuestions53_2!');
  }
}

// Insert extraQuestions53_3 before line end of questions53_3
const targetIdx3 = content.indexOf(`\n];\n\n  const t53 = {`);
if (targetIdx3 !== -1 && !content.includes(`"id": "c54_l03_ef1",`)) {
  content = content.slice(0, targetIdx3) + `,\n` + extraQuestions53_3 + content.slice(targetIdx3);
  console.log('Successfully injected extraQuestions53_3!');
}

fs.writeFileSync(dataPath, content, 'utf8');
console.log('data.js updated successfully!');
