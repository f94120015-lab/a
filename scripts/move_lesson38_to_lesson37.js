const fs = require('fs');
const path = require('path');

// 1. Update data.js
const dataPath = path.join(__dirname, '../data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Update t53 definition & lessons array
const oldT53 = `  const t53 = {
    id: 53,
    originalIndex: 52,
    title: "Akademik Bağlaç Mühendisliği",
    desc: "Bağlaçların sentaks kuralları, noktalama refleksleri ve anlamsal yön tayini çalışmaları.",
    icon: "🔗",
    numLessons: 3,
    subtitles: [
      "1. Bağlaçların Yapısal Kimliği (Eşleştirme)",
      "2. İkiz Bağlaç Sentaks Seçici",
      "3. Noktalama ve Geçiş Dedektifi"
    ]
  };

  units.push({
    id: t53.id,
    originalIndex: t53.originalIndex,
    title: t53.title,
    description: t53.desc,
    lessons: ["c54_l1", "c54_l2", "c54_l3"],
    pages: "421-430"
  });`;

const newT53 = `  const t53 = {
    id: 53,
    originalIndex: 52,
    title: "Akademik Bağlaç Mühendisliği",
    desc: "Bağlaçların sentaks kuralları, noktalama refleksleri ve anlamsal yön tayini çalışmaları.",
    icon: "🔗",
    numLessons: 4,
    subtitles: [
      "1. Bağlaçların Yapısal Kimliği (Eşleştirme)",
      "2. İkiz Bağlaç Sentaks Seçici",
      "3. Noktalama ve Geçiş Dedektifi",
      "4. YDS/YÖKDİL Özel Bağlaç Kalıpları"
    ]
  };

  units.push({
    id: t53.id,
    originalIndex: t53.originalIndex,
    title: t53.title,
    description: t53.desc,
    lessons: ["c54_l1", "c54_l2", "c54_l3", "c54_l4"],
    pages: "421-435"
  });`;

if (dataContent.includes(oldT53)) {
  dataContent = dataContent.replace(oldT53, newT53);
  console.log('Updated t53 definition & unit lessons list in data.js');
}

// Replace unit 54 pushing block with c54_l4 lesson pushing inside unit 53
const oldU54Block = `  const t54 = {
    id: 54,
    originalIndex: 53,
    title: "Görsel Kartlar ve Özel Bağlaç Kalıpları",
    desc: "Sınavlarda en sık karıştırılan ikiz eş bağlaçlar, devriklik kuralları, edat farkları ve o kadar...ki yapıları.",
    icon: "👁️",
    numLessons: 1,
    subtitles: [
      "1. Özel Kalıplar ve Sınav İpuçları (Visual Conjunction Masters)"
    ]
  };

  units.push({
    id: t54.id,
    originalIndex: t54.originalIndex,
    title: t54.title,
    description: t54.desc,
    lessons: ["c55_l1"],
    pages: "431-435"
  });

  lessons.push({
    id: "c55_l1",
    unitId: 54,
    title: t54.subtitles[0],
    subtitle: "",
    exercises: [{
      id: "c55_l1_ex1",
      createdAt: "2026-07-10T20:00:00Z",
      title: "Alıştırma 1: Görsel Kartlar ve Özel Bağlaç Kalıpları",
      description: "Paylaşılan görsel kartlardaki tüm özel kalıpların, edat ve devriklik kurallarının pekiştirilmesi.",
      questions: questions54
    }],
    konuAnlatimi: {
      baslik: "Bölüm 54 / Ders 1: Özel Kalıplar ve Sınav İpuçları",
      teorikMantik: "neither...nor, either...or paralel yapıları, not only ve no sooner devriklik kuralları, rose to/by edat farkları ve regard...as gibi özel öbeklerin analizi.",
      formul: "so...that / neither...nor / regard as / rose to vs by / no sooner...than",
      altinKural: "Edatların sayısal değerlerle kullanımına (to vs by) ve Not Only ile başlayan cümlelerin devrik yapısına özellikle dikkat edin!"
    }
  });`;

const newL4Block = `  lessons.push({
    id: "c54_l4",
    unitId: 53,
    title: t53.subtitles[3],
    subtitle: "YDS/YÖKDİL Özel Bağlaç Kalıpları",
    icon: "👁️",
    exercises: [
      {
        id: "c54_l4_ex1",
        createdAt: "2026-07-10T20:00:00Z",
        title: "Alıştırma 1: Eş Bağlaçlar ve Devrik Yapılar",
        description: "Correlative conjunctions, devriklik ve kalıp bağlaçların pekiştirilmesi.",
        questions: questions54.slice(0, 8)
      },
      {
        id: "c54_l4_ex2",
        createdAt: "2026-07-10T20:00:00Z",
        title: "Alıştırma 2: Bağlaç-Edat İlişkisi ve Çeviri Matrisi",
        description: "Edat farkları (rose to vs by), amaç/sonuç bağlaçları ve çeviri pratikleri.",
        questions: questions54.slice(8)
      }
    ],
    konuAnlatimi: {
      baslik: "Bölüm 53 / Ders 4: YDS/YÖKDİL Özel Bağlaç Kalıpları",
      teorikMantik: "neither...nor, either...or paralel yapıları, not only ve no sooner devriklik kuralları, rose to/by edat farkları ve regard...as gibi özel öbeklerin analizi.",
      formul: "so...that / neither...nor / regard as / rose to vs by / no sooner...than",
      altinKural: "Edatların sayısal değerlerle kullanımına (to vs by) ve Not Only ile başlayan cümlelerin devrik yapısına özellikle dikkat edin!"
    }
  });`;

if (dataContent.includes(oldU54Block)) {
  dataContent = dataContent.replace(oldU54Block, newL4Block);
  console.log('Replaced U54 block with c54_l4 in data.js');
}

fs.writeFileSync(dataPath, dataContent, 'utf8');

// 2. Update data-extra.js to remove 54 from targetOrder
const extraPath = path.join(__dirname, '../data-extra.js');
let extraContent = fs.readFileSync(extraPath, 'utf8');
const targetLine = '    54,  // Görsel Kartlar ve Özel Bağlaç Kalıpları\n';
if (extraContent.includes(targetLine)) {
  extraContent = extraContent.replace(targetLine, '');
  fs.writeFileSync(extraPath, extraContent, 'utf8');
  console.log('Removed unit 54 from targetOrder in data-extra.js');
}

console.log('Move completed successfully!');
