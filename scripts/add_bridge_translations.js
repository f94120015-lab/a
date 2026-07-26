const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// Replacements for new questions to include bridgeTranslation
const updates = [
  {
    targetId: '"id": "c54_l02_ef1",',
    addition: `    "bridgeTranslation": {
      "sentence": "The code optimization failed; however, the deployment succeeded.",
      "translation": ["Kod optimizasyonu", "başarısız oldu;", "yine de,", "dağıtım başarıyla", "tamamlandı."],
      "words": ["Kod optimizasyonu", "başarısız oldu;", "yine de,", "dağıtım başarıyla", "tamamlandı.", "çünkü", "önce", "rağmen"]
    },`
  },
  {
    targetId: '"id": "c54_l02_sc1",',
    addition: `    "bridgeTranslation": {
      "sentence": "The security team patched the critical vulnerability; nevertheless, several unauthorized access attempts were logged.",
      "translation": ["Güvenlik ekibi", "kritik açığı kapattı;", "yine de,", "birkaç yetkisiz erişim", "denemesi kaydedildi."],
      "words": ["Güvenlik ekibi", "kritik açığı kapattı;", "yine de,", "birkaç yetkisiz erişim", "denemesi kaydedildi.", "çünkü", "önce", "nedeniyle"]
    },`
  },
  {
    targetId: '"id": "c54_l02_cd1",',
    addition: `    "bridgeTranslation": {
      "sentence": "The service experienced temporary downtime due to the unexpected hardware failure.",
      "translation": ["Hizmet,", "beklenmeyen donanım arızası", "nedeniyle", "geçici kesinti", "yaşadı."],
      "words": ["Hizmet,", "beklenmeyen donanım arızası", "nedeniyle", "geçici kesinti", "yaşadı.", "rağmen", "çünkü", "sonra"]
    },`
  },
  {
    targetId: '"id": "c54_l03_ef1",',
    addition: `    "bridgeTranslation": {
      "sentence": "The compiler errors block the build; for instance, syntax issues crash it.",
      "translation": ["Derleyici hataları", "derlemeyi engeller;", "örneğin,", "sözdizimi sorunları", "sistemi çökertir."],
      "words": ["Derleyici hataları", "derlemeyi engeller;", "örneğin,", "sözdizimi sorunları", "sistemi çökertir.", "rağmen", "çünkü", "önce"]
    },`
  },
  {
    targetId: '"id": "c54_l03_sc1",',
    addition: `    "bridgeTranslation": {
      "sentence": "The query loops were unoptimized; nonetheless, the response time remained under ten milliseconds.",
      "translation": ["Sorgu döngüleri", "optimize edilmemişti;", "yine de,", "yanıt süresi", "on milisaniyenin altında kaldı."],
      "words": ["Sorgu döngüleri", "optimize edilmemişti;", "yine de,", "yanıt süresi", "on milisaniyenin altında kaldı.", "çünkü", "rağmen", "önce"]
    },`
  },
  {
    targetId: '"id": "c54_l03_cd1",',
    addition: `    "bridgeTranslation": {
      "sentence": "The application passed all unit tests; however, integration testing revealed a memory leak.",
      "translation": ["Uygulama tüm birim", "testlerini geçti;", "ancak,", "entegrasyon testleri", "bellek sızıntısını ortaya çıkardı."],
      "words": ["Uygulama tüm birim", "testlerini geçti;", "ancak,", "entegrasyon testleri", "bellek sızıntısını ortaya çıkardı.", "çünkü", "önce", "nedeniyle"]
    },`
  }
];

updates.forEach(upd => {
  if (content.includes(upd.targetId) && !content.includes(upd.addition.trim())) {
    content = content.replace(upd.targetId, upd.targetId + '\n' + upd.addition);
    console.log('Added bridgeTranslation for ' + upd.targetId);
  }
});

fs.writeFileSync(dataPath, content, 'utf8');
console.log('add_bridge_translations complete!');
