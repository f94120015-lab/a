const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// Replacement for c54_l1, c54_l2, c54_l3 lessons definition in data.js
const targetCode = `  lessons.push({
    id: "c54_l1",
    unitId: 53,
    title: t53.subtitles[0],
    subtitle: "",
    exercises: [{
      id: "c54_l1_ex1",
      createdAt: "2026-07-10T18:00:00Z",
      title: "Alıştırma 1: Bağlaçların Yapısal Kimliği",
      description: "Bağlaç kelimeleri doğru dil bilgisi sınıflarıyla eşleştirme çalışması.",
      questions: questions53_1
    }],
    konuAnlatimi: {
      baslik: "Bölüm 53 / Ders 1: Bağlaçların Yapısal Kimliği (Eşleştirme)",
      teorikMantik: "Although, Despite, Because, Due to gibi bağlaçların cümle mi yoksa isim mi aldığını kartlar üzerinden eşleştirerek ezberleme.",
      formul: "Bağlaç ➔ İstediği Yapısal Blok (Cümle / İsim / Geçiş)",
      altinKural: "Her bağlacın arkasından getirdiği yapıyı (cümle / isim) zihninizde eşleştirerek kalıcı hale getirin!"
    }
  });

  lessons.push({
    id: "c54_l2",
    unitId: 53,
    title: t53.subtitles[1],
    subtitle: "",
    exercises: [{
      id: "c54_l2_ex1",
      createdAt: "2026-07-10T18:00:00Z",
      title: "Alıştırma 1: İkiz Bağlaç Sentaks Seçici",
      description: "Boşluktan sonraki kelime yapısına göre cümle veya isim bağlacı seçimi.",
      questions: questions53_2
    }],
    konuAnlatimi: {
      baslik: "Bölüm 53 / Ders 2: İkiz Bağlaç Sentaks Seçici",
      teorikMantik: "Aynı anlama gelen ikiz bağlaçlar (Due to vs. Because vb.) arasından boşluktan sonraki yapının türüne göre seçim yapma.",
      formul: "Boşluk + Noun/V-ing ➔ İsim Alan | Boşluk + SVO ➔ Cümle Alan",
      altinKural: "Boşluktan hemen sonra bir eylem (verb) varsa cümle alan bağlacı, yoksa isim alan edat yapısını seçin!"
    }
  });

  lessons.push({
    id: "c54_l3",
    unitId: 53,
    title: t53.subtitles[2],
    subtitle: "",
    exercises: [{
      id: "c54_l3_ex1",
      createdAt: "2026-07-10T18:00:00Z",
      title: "Alıştırma 1: Noktalama ve Geçiş Dedektifi",
      description: "Cümledeki noktalama işaretlerine göre doğru geçiş kelimesi seçimi.",
      questions: questions53_3
    }],
    konuAnlatimi: {
      baslik: "Bölüm 53 / Ders 3: Noktalama ve Geçiş Dedektifi",
      teorikMantik: "Noktalı virgül (;) ve virgül (,) gibi noktalama işaretlerinin geçiş kelimeleri (Transition) üzerindeki kullanım kuralları.",
      formul: "SVO; Transition, SVO | although / because + SVO, SVO",
      altinKural: "Noktalı virgül ve arkasından gelen virgül dizilimi sadece Geçiş Kelimeleri (Transition) ile kullanılabilir!"
    }
  });`;

const replacementCode = `  lessons.push({
    id: "c54_l1",
    unitId: 53,
    title: t53.subtitles[0],
    subtitle: "",
    exercises: [
      {
        id: "c54_l1_ex1",
        createdAt: "2026-07-10T18:00:00Z",
        title: "Alıştırma 1: Bağlaçların Temel Yapısal Kimliği",
        description: "Temel bağlaç kelimelerini doğru dil bilgisi sınıflarıyla eşleştirme çalışması.",
        questions: questions53_1.slice(0, 10)
      },
      {
        id: "c54_l1_ex2",
        createdAt: "2026-07-10T18:00:00Z",
        title: "Alıştırma 2: İleri Seviye Bağlaç & Sentaks Eşleştirmesi",
        description: "Karmaşık bağlaç kalıplarını ve fonksiyonel sınıflarını eşleştirme testi.",
        questions: questions53_1.slice(10)
      }
    ],
    konuAnlatimi: {
      baslik: "Bölüm 53 / Ders 1: Bağlaçların Yapısal Kimliği (Eşleştirme)",
      teorikMantik: "Although, Despite, Because, Due to gibi bağlaçların cümle mi yoksa isim mi aldığını kartlar üzerinden eşleştirerek ezberleme.",
      formul: "Bağlaç ➔ İstediği Yapısal Blok (Cümle / İsim / Geçiş)",
      altinKural: "Her bağlacın arkasından getirdiği yapıyı (cümle / isim) zihninizde eşleştirerek kalıcı hale getirin!"
    }
  });

  lessons.push({
    id: "c54_l2",
    unitId: 53,
    title: t53.subtitles[1],
    subtitle: "",
    exercises: [
      {
        id: "c54_l2_ex1",
        createdAt: "2026-07-10T18:00:00Z",
        title: "Alıştırma 1: İkiz Bağlaç Sentaks Seçici (Temel)",
        description: "Boşluktan sonraki kelime yapısına göre cümle veya isim bağlacı seçimi.",
        questions: questions53_2.slice(0, 13)
      },
      {
        id: "c54_l2_ex2",
        createdAt: "2026-07-10T18:00:00Z",
        title: "Alıştırma 2: İkiz Bağlaç Sentaks Seçici & Karma Pratik",
        description: "Zenginleştirilmiş hata avcısı, cümle blok dizilimi ve bağlam sorularıyla pekiştirme.",
        questions: questions53_2.slice(13)
      }
    ],
    konuAnlatimi: {
      baslik: "Bölüm 53 / Ders 2: İkiz Bağlaç Sentaks Seçici",
      teorikMantik: "Aynı anlama gelen ikiz bağlaçlar (Due to vs. Because vb.) arasından boşluktan sonraki yapının türüne göre seçim yapma.",
      formul: "Boşluk + Noun/V-ing ➔ İsim Alan | Boşluk + SVO ➔ Cümle Alan",
      altinKural: "Boşluktan hemen sonra bir eylem (verb) varsa cümle alan bağlacı, yoksa isim alan edat yapısını seçin!"
    }
  });

  lessons.push({
    id: "c54_l3",
    unitId: 53,
    title: t53.subtitles[2],
    subtitle: "",
    exercises: [
      {
        id: "c54_l3_ex1",
        createdAt: "2026-07-10T18:00:00Z",
        title: "Alıştırma 1: Noktalama ve Geçiş Dedektifi (Temel)",
        description: "Cümledeki noktalama işaretlerine göre doğru geçiş kelimesi seçimi.",
        questions: questions53_3.slice(0, 13)
      },
      {
        id: "c54_l3_ex2",
        createdAt: "2026-07-10T18:00:00Z",
        title: "Alıştırma 2: Noktalama, Geçiş ve Sentaks Zirvesi",
        description: "İleri düzey noktalı virgül geçişleri, bağlaç köprüleri ve hata tespiti pratikleri.",
        questions: questions53_3.slice(13)
      }
    ],
    konuAnlatimi: {
      baslik: "Bölüm 53 / Ders 3: Noktalama ve Geçiş Dedektifi",
      teorikMantik: "Noktalı virgül (;) ve virgül (,) gibi noktalama işaretlerinin geçiş kelimeleri (Transition) üzerindeki kullanım kuralları.",
      formul: "SVO; Transition, SVO | although / because + SVO, SVO",
      altinKural: "Noktalı virgül ve arkasından gelen virgül dizilimi sadece Geçiş Kelimeleri (Transition) ile kullanılabilir!"
    }
  });`;

if (content.includes(targetCode)) {
  content = content.replace(targetCode, replacementCode);
  fs.writeFileSync(dataPath, content, 'utf8');
  console.log('Successfully split Unit 53 exercises into 2 exercises per lesson!');
} else {
  console.log('Target code block not found! Checking alternative match...');
}
