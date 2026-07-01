const fs = require('fs');
const vm = require('vm');

const dataCode = fs.readFileSync('data.js', 'utf8');
const startIndex = dataCode.indexOf('const rawTopics = [');
if (startIndex === -1) {
  console.error('Could not find const rawTopics');
  process.exit(1);
}

const afterStart = dataCode.substring(startIndex + 'const rawTopics = ['.length);
// Find the closing array bracket
let bracketCount = 1;
let inString = false;
let stringChar = null;
let escape = false;
let endIndex = -1;

for (let i = 0; i < afterStart.length; i++) {
  const char = afterStart[i];
  if (escape) {
    escape = false;
    continue;
  }
  if (char === '\\') {
    escape = true;
    continue;
  }
  if (inString) {
    if (char === stringChar) {
      inString = false;
    }
    continue;
  }
  if (char === '"' || char === "'" || char === '`') {
    inString = true;
    stringChar = char;
    continue;
  }
  if (char === '[') {
    bracketCount++;
  } else if (char === ']') {
    bracketCount--;
    if (bracketCount === 0) {
      endIndex = startIndex + 'const rawTopics = ['.length + i;
      break;
    }
  }
}

if (endIndex === -1) {
  console.error('Could not find closing bracket of rawTopics');
  process.exit(1);
}

const rawTopicsText = dataCode.substring(startIndex + 'const rawTopics = ['.length, endIndex);

function splitObjects(text) {
  const objects = [];
  let braceCount = 0;
  let currentStart = -1;
  let inString = false;
  let stringChar = null;
  let escape = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (char === '\\') {
      escape = true;
      continue;
    }
    if (inString) {
      if (char === stringChar) {
        inString = false;
      }
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      inString = true;
      stringChar = char;
      continue;
    }
    if (char === '{') {
      if (braceCount === 0) {
        currentStart = i;
      }
      braceCount++;
    } else if (char === '}') {
      braceCount--;
      if (braceCount === 0) {
        objects.push(text.substring(currentStart, i + 1));
      }
    }
  }
  return objects;
}

const topicStrings = splitObjects(rawTopicsText);
if (topicStrings.length !== 33) {
  console.error('Expected 33 topics, found:', topicStrings.length);
  process.exit(1);
}

// Map each original index to its ID, startLessonId, and originalIndex (which is index + 1 or customized for 101/102/103)
const originalMetadata = [
  { id: 1, startLessonId: 1, originalIndex: 1 },
  { id: 2, startLessonId: 8, originalIndex: 2 },
  { id: 3, startLessonId: 10, originalIndex: 3 },
  { id: 4, startLessonId: 12, originalIndex: 4 },
  { id: 5, startLessonId: 14, originalIndex: 5 },
  { id: 6, startLessonId: 16, originalIndex: 6 },
  { id: 7, startLessonId: 20, originalIndex: 7 },
  { id: 8, startLessonId: 21, originalIndex: 8 },
  { id: 9, startLessonId: 23, originalIndex: 9 },
  { id: 10, startLessonId: 28, originalIndex: 10 },
  { id: 11, startLessonId: 32, originalIndex: 11 },
  { id: 12, startLessonId: 38, originalIndex: 12 },
  { id: 13, startLessonId: 41, originalIndex: 13 },
  { id: 14, startLessonId: 45, originalIndex: 14 },
  { id: 15, startLessonId: 47, originalIndex: 15 },
  { id: 16, startLessonId: 48, originalIndex: 16 },
  { id: 17, startLessonId: 51, originalIndex: 17 },
  { id: 18, startLessonId: 55, originalIndex: 18 },
  { id: 19, startLessonId: 56, originalIndex: 19 },
  { id: 20, startLessonId: 59, originalIndex: 20 },
  { id: 21, startLessonId: 62, originalIndex: 21 },
  { id: 22, startLessonId: 66, originalIndex: 22 },
  { id: 23, startLessonId: 68, originalIndex: 23 },
  { id: 24, startLessonId: 70, originalIndex: 24 },
  { id: 25, startLessonId: 75, originalIndex: 25 },
  { id: 26, startLessonId: 78, originalIndex: 26 },
  { id: 27, startLessonId: 81, originalIndex: 27 },
  { id: 28, startLessonId: 88, originalIndex: 28 },
  { id: 29, startLessonId: 92, originalIndex: 29 },
  { id: 30, startLessonId: 94, originalIndex: 30 },
  { id: 102, startLessonId: 100, originalIndex: 32 },
  { id: 101, startLessonId: 103, originalIndex: 31 },
  { id: 103, startLessonId: 107, originalIndex: 33 }
];

// Ensure each topic string has its metadata injected
const processedTopicStrings = topicStrings.map((tStr, index) => {
  const meta = originalMetadata[index];
  let updated = tStr;
  
  // Inject properties
  if (!updated.includes('originalIndex:')) {
    // If it has id, replace near it
    if (updated.match(/id:\s*\d+,/)) {
      updated = updated.replace(/(id:\s*\d+,)/, `$1\n    startLessonId: ${meta.startLessonId},\n    originalIndex: ${meta.originalIndex},`);
    } else {
      updated = updated.replace('{', `{\n    id: ${meta.id},\n    startLessonId: ${meta.startLessonId},\n    originalIndex: ${meta.originalIndex},`);
    }
  }
  return updated;
});

// Desired reordering sequence (indices of the processedTopicStrings array)
const desiredOrder = [
  5,  // VI. Yapılar (Sayfa 1) (ID: 6)
  0,  // I. İsim ve Edat Takımları (Sayfa 13) (ID: 1)
  1,  // II. Fiil ve Edat Takımları (Sayfa 21) (ID: 2)
  6,  // VII. Özne - Geçişli Fiil + Nesne (Sayfa 32) (ID: 7)
  7,  // VIII. "There" Yapıları (Sayfa 38) (ID: 8)
  8,  // IX. Soru Strüktürleri (Sayfa 49) (ID: 9)
  9,  // X. Edilgen (Passive) Strüktürü (Sayfa 55) (ID: 10)
  10, // XI. Edilgen (Passive) Mastarı (Sayfa 63) (ID: 11)
  2,  // III. İsim Tamlaması (Sayfa 72) (ID: 3)
  3,  // IV. Present Participle Sıfatı (-ing) (Sayfa 81) (ID: 4)
  4,  // V. Past Participle Sıfatı (-ed) (Sayfa 85) (ID: 5)
  11, // XII. Participle Takımları (Sayfa 88) (ID: 12)
  13, // XIII. Mastar (Infinitive) (Sayfa 95) (ID: 14)
  14, // XIV. Strüktürel "It" Cümlesinin Öznesi (Sayfa 103) (ID: 15)
  15, // XV. Maksat ve Amac Yapıları (Sayfa 107) (ID: 16)
  17, // XVI. Fiil İsmi (Gerund) + Nesnesi (Özne Olarak) (Sayfa 112) (ID: 18)
  18, // XVII. Edattan Sonra Gelen Fiil (+ Nesnesi) (Sayfa 113) (ID: 19)
  19, // XVIII. Soru Kelimesinden Sonra Gelen Mastar (Sayfa 124) (ID: 20)
  22, // Zaman Zarfıyla Başlayan Zarf Cümleciği, After, Before (ID: 23)
  23, // Zaman Zarfıyla Başlayan Zarf Cümleciği, When (ID: 24)
  24, // Zaman Zarfıyla Başlayan Zarf Cümleciği, Since, While / As, Until (ID: 25)
  25, // XX. Mukayese (Karşılaştırma) Strüktürleri (Sayfa 216) (ID: 26)
  26, // XXI. Sıfat Cümleciği (Sayfa 224) (ID: 27)
  27, // XXII. İsim Cümleciği (Noun Clause) (Sayfa 240) (ID: 28)
  28, // XXIII. It + to be + sıfat/past participle + that (Sayfa 251) (ID: 29)
  29, // XXV. Neden ve Etki Yapıları (Sayfa 256) (ID: 30)
  12, // Ara Bölüm 1: Tercih Bildiren Yapılar (Would rather) (ID: 13)
  16, // Ara Bölüm 2: Rica ve İzin İsteme Yapıları (ID: 17)
  20, // Ara Bölüm 3: Before Bağlaçlı Cümle Yapıları (ID: 21)
  21, // Konnektörler (ID: 22)
  30, // Zaman Zarfları ve Zaman Uyumu (Ekstra Pratik) (ID: 102)
  31, // Zaman Uyumu: By the time, Since... (ID: 101)
  32  // Öbeksel Kipler (Phrasal Modals) (ID: 103)
];

const reorderedTopicStrings = desiredOrder.map(idx => processedTopicStrings[idx]);

// Construct the new rawTopics string
const newRawTopicsText = '\n' + reorderedTopicStrings.join(',\n') + '\n';

// Replace in dataCode
const newCode = dataCode.substring(0, startIndex + 'const rawTopics = ['.length) +
                newRawTopicsText +
                dataCode.substring(endIndex);

// Let's test compiling this new code in a sandbox first
const sandbox = { window: {}, document: {}, console: console };
vm.createContext(sandbox);
try {
  const testCode = newCode + '\n; ({ rawTopics });';
  vm.runInContext(testCode, sandbox);
  console.log('VM compilation successful!');
  
  // Save the updated code
  fs.writeFileSync('data.js', newCode, 'utf8');
  console.log('Successfully updated data.js with reordered topics!');
} catch (err) {
  console.error('VM compilation failed for updated data.js:', err);
  process.exit(1);
}
