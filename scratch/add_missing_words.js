const fs = require('fs');

const dataPath = '../data.js';
let content = fs.readFileSync(dataPath, 'utf8');

const dictStart = content.indexOf('const wordDictionary = {');
const dictEnd = content.indexOf('};', dictStart);
const dictStr = content.substring(dictStart, dictEnd + 2);
const wordDictionary = eval("(" + dictStr.replace("const wordDictionary = ", "").replace(/;\s*$/, "") + ")");

const newWords = {
  "currently": "şu anda, mevcut durumda",
  "frameworks": "çerçeveler, yapılar",
  "compiler": "derleyici",
  "blocks": "bloklar, engeller",
  "firewall": "güvenlik duvarı",
  "external": "harici, dış",
  "laboratories": "laboratuvarlar",
  "protocols": "protokoller",
  "malicious": "kötü niyetli, zararlı",
  "malware": "kötü amaçlı yazılım",
  "attacks": "saldırılar",
  "threaten": "tehdit etmek",
  "files": "dosyalar",
  "presently": "şu sıralar, şimdi",
  "administrator": "yönetici",
  "grants": "verir, onaylar",
  "clearance": "izin, yetki, onay",
  "developers": "geliştiriciler",
  "gamified": "oyunlaştırılmış",
  "students": "öğrenciler",
  "grammar": "dilbilgisi",
  "server": "sunucu",
  "credentials": "kimlik bilgileri, giriş bilgileri",
  "grounds": "gerekçeler, zemin",
  "login": "giriş, oturum açma",
  "requests": "istekler, talepler",
  "corrupted": "bozulmuş, zarar görmüş",
  "lest": "korkusuyla, -mesin diye",
  "mechanical": "mekanik",
  "piston": "piston",
  "fail": "arızalanmak, başarısız olmak",
  "unexpectedly": "beklenmedik bir şekilde",
  "inasmuch": "çünkü, -den dolayı",
  "become": "olmak, hale gelmek",
  "stricter": "daha katı, daha sıkı",
  "just": "sadece, henüz, tam da",
  "formulas": "formüller",
  "simulation": "simülasyon, benzetim",
  "site": "alan, yer",
  "therefore": "bu nedenle, dolayısıyla",
  "field": "saha, alan",
  "operations": "operasyonlar, işlemler",
  "already": "çoktan, zaten",
  "lately": "son zamanlarda",
  "latency": "gecikme süresi, latency",
  "installation": "kurulum"
};

Object.assign(wordDictionary, newWords);

// Format dictionary cleanly
const updatedDictStr = "const wordDictionary = " + JSON.stringify(wordDictionary, null, 2) + ";";

const before = content.substring(0, dictStart);
const after = content.substring(dictEnd + 2);

const updatedContent = before + updatedDictStr + after;
fs.writeFileSync(dataPath, updatedContent);

console.log("Successfully added all missing words to wordDictionary in data.js!");
