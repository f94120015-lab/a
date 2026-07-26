const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.js');
const extraPath = path.join(__dirname, '../data-extra.js');
const appPath = path.join(__dirname, '../app.js');

let dataContent = fs.readFileSync(dataPath, 'utf8');
let extraContent = fs.readFileSync(extraPath, 'utf8');
let appContent = fs.readFileSync(appPath, 'utf8');

// 1. Clean Title of Unit 39_2
dataContent = dataContent.replace(
  'title: "Bölüm 44 / Modül B: Cümle Yapıları, Edatlar & Kısaltmalar"',
  'title: "İleri Düzey Cümle Yapıları, Edatlar & Kısaltma Geometrisi"'
);
extraContent = extraContent.replace(
  '"39_2", // Bölüm 44 / Modül B: Cümle Yapıları, Edatlar & Kısaltmalar',
  '"39_2", // İleri Düzey Cümle Yapıları, Edatlar & Kısaltma Geometrisi'
);

// 2. Update Title of Unit 14 to include Gerund & Infinitive
dataContent = dataContent.replace(
  '"title": "XIII. Mastar Yapıları, Amaç Mastarları ve Soru Kelimeli Kısaltmalar"',
  '"title": "XIII. İsim-Fiiller ve Mastar Yapıları (Gerund & Infinitive)"'
);
dataContent = dataContent.replace(
  'title: "XIII. Mastar Yapıları, Amaç Mastarları ve Soru Kelimeli Kısaltmalar"',
  'title: "XIII. İsim-Fiiller ve Mastar Yapıları (Gerund & Infinitive)"'
);

// App.js title mapping updates
if (!appContent.includes('İleri Düzey Cümle Yapıları, Edatlar & Kısaltma Geometrisi')) {
  appContent = appContent.replace(
    "'Bölüm 44 / Modül B: Cümle Yapıları, Edatlar & Kısaltmalar': 'Cümle Yapıları, Edatlar ve Kısaltmalar',",
    "'Bölüm 44 / Modül B: Cümle Yapıları, Edatlar & Kısaltmalar': 'İleri Düzey Cümle Yapıları, Edatlar & Kısaltma Geometrisi',\n    'Cümle Yapıları, Edatlar & Kısaltmalar': 'İleri Düzey Cümle Yapıları, Edatlar & Kısaltma Geometrisi',"
  );
}
if (!appContent.includes('İsim-Fiiller ve Mastar Yapıları (Gerund & Infinitive)')) {
  appContent = appContent.replace(
    "'Phrasal Modal ve Subjunctive Matrisi':",
    "'Mastar Yapıları, Amaç Mastarları ve Soru Kelimeli Kısaltmalar': 'İsim-Fiiller ve Mastar Yapıları (Gerund & Infinitive)',\n    'XIII. Mastar Yapıları, Amaç Mastarları ve Soru Kelimeli Kısaltmalar': 'İsim-Fiiller ve Mastar Yapıları (Gerund & Infinitive)',\n    'Phrasal Modal ve Subjunctive Matrisi':"
  );
}

// 3. Standardize Unit 12 exercises (Split each lesson into 2 exercises)
// In data.js, find Unit 12 exercises structure
// "12": { "1": { "exercises": [ { "id": "u12l1ex1", ... questions: [...] } ] }, "2": ..., "3": ... }
const u12l1_regex = /"u12l1ex1",\s*"title":\s*"Alıştırma 1: Present Participle Sıfatları",\s*"description":\s*"[^"]*",\s*"questions":\s*(\[[[\s\S]*?\]\n\s*\])/;
const u12l2_regex = /"u12l2ex1",\s*"title":\s*"Alıştırma 1: Past Participle ve Zarflı Sıfatlar",\s*"description":\s*"[^"]*",\s*"questions":\s*(\[[[\s\S]*?\]\n\s*\])/;
const u12l3_regex = /"u12l3ex1",\s*"title":\s*"Alıştırma 1: Participle Takımları ve Kısaltmalar",\s*"description":\s*"[^"]*",\s*"questions":\s*(\[[[\s\S]*?\]\n\s*\])/;

// Let's use VM parsing to update Unit 12 structure programmatically in data.js
const vm = require('vm');
const sandbox = { console, window: { location: {} }, document: {}, lessons: [], units: [] };
vm.createContext(sandbox);
const executableCode = dataContent.replace(/\bexport\s+/g, '');
const wrapperCode = executableCode + '\n; ({ rawTopicsData });';
let rawTopicsObj;
try {
  rawTopicsObj = vm.runInContext(wrapperCode, sandbox);
  console.log('Successfully evaluated data.js rawTopicsData');
} catch (e) {
  console.error('VM Error:', e);
}

fs.writeFileSync(dataPath, dataContent, 'utf8');
fs.writeFileSync(extraPath, extraContent, 'utf8');
fs.writeFileSync(appPath, appContent, 'utf8');
console.log('Base title updates saved.');
