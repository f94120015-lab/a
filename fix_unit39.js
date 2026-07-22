const fs = require("fs");
const file = "/Users/faruknafizfazlioglu/Desktop/amok/data.js";
let content = fs.readFileSync(file, "utf8");

const targetStr = `// Register Unit 39 (Bölüm 40 - Exam Strategies)`;
const targetIndex = content.indexOf(targetStr);

if (targetIndex === -1) {
  console.error("Target string not found");
  process.exit(1);
}

const endStr = `  })();`;
const endIndex = content.indexOf(endStr, targetIndex);

if (endIndex === -1) {
  console.error("End string not found");
  process.exit(1);
}

const topics = ["Sosyoloji", "Tarih", "Psikoloji", "Siyaset", "Antropoloji", "Kültür", "Sinema", "Edebiyat"];

const lessonTitles = [
  "1. Zaman Uyumu & Kronolojik Öncelik Matrisi (By the Time / Since)",
  "2. Dilek, Varsayım & Şart Geometrisi (If / Wish / Unless / Provided that)",
  "3. Subjunctive Aciliyet Kilitleri & Gramer Emirleri",
  "4. İsim Cümlecikleri (Noun Clauses: That / Whether / If / Wh-)",
  "5. Sıfat Cümlecikleri & Edat Kısıtlamaları (Relative Clauses & Prepositions)",
  "6. Akademik Kısaltmalar (Participle & Gerund Reductions)",
  "7. Amaç & Tercih Yapıları (In order to / Would Rather / Prefer)",
  "8. Devrik Cümle Mimarisi & Zaman Kilitleri (Inversion)",
  "9. Zıtlık & Nedensellik Bağlaçlarında Terazi Dengesi",
  "10. Geçmişe Yönelik Çıkarım & Pişmanlık Modalları",
  "11. Sınav Çeldirici & Hata Avcısı Zirvesi (Error Hunting Blitz)"
];

const generatedLessons = lessonTitles.map((title, lIdx) => {
  const lessonNum = lIdx + 1;
  const qList = [];

  // 1-5: Basit (Fill-Blank / Dropdown / True-False)
  for (let i = 1; i <= 5; i++) {
    const topic = topics[(i + lIdx) % topics.length];
    if (i % 2 === 1) {
      qList.push({
        id: `c40_l${lessonNum}_q${i}`,
        type: "fill-blank-dropdown",
        prompt: `[${topic} / Basit - Soru ${i}] Kurala en uygun seçeneği belirleyin:`,
        sentence: `${topic} scholars note that academic analysis ___ when methodological standards are applied.`,
        options: ["improves", "will have improved", "had improved", "improved"],
        correctIndex: 0,
        translation: `${topic} uzmanları, metodolojik standartlar uygulandığında akademik analizin geliştiğini belirtiyor.`,
        explanation: "Geniş zaman ve genel akademik doğrularda V1 çekimi tercih edilir.",
        hint: { formula: "Academic Truth -> Present Simple", mirror: "Genel kural doğrulaması.", academicNote: `${topic} dersi temel yapısı.` }
      });
    } else {
      qList.push({
        id: `c40_l${lessonNum}_q${i}`,
        type: "true-false",
        prompt: `[${topic} / Basit - Soru ${i}] Verilen cümle dil bilgisi açısından doğru mu?`,
        sentence: `In ${topic.toLowerCase()} studies, researchers must adhere to strict guidelines.`,
        englishPhrase: `In ${topic.toLowerCase()} studies, researchers must adhere to strict guidelines.`,
        isTrue: true,
        correctAnswer: "true",
        translation: `${topic} çalışmalarında araştırmacılar katı yönergelere uymalıdır.`,
        explanation: "Cümle yapısı ve modal kullanımı tam ve doğrudur.",
        hint: { formula: "Must + V1 -> Zorunluluk kuralı", mirror: "Doğru gramer dizilimi.", academicNote: `${topic} alanı akademik kuralı.` }
      });
    }
  }

  // 6-10: Orta (Multiple Choice / True-False / Fill Blank)
  for (let i = 6; i <= 10; i++) {
    const topic = topics[(i + lIdx) % topics.length];
    qList.push({
      id: `c40_l${lessonNum}_q${i}`,
      type: "multiple-choice",
      prompt: `[${topic} / Orta - Soru ${i}] Boşluğa gelebilecek en uygun bağlaç / zaman yapısını seçin:`,
      sentence: `Recent findings in ${topic.toLowerCase()} demonstrate that institutional reform ___ effective provided that public trust ___ maintained.`,
      options: ["will be / is", "was / will be", "had been / is", "would be / was"],
      correctIndex: 0,
      translation: `${topic} alanındaki son bulgular, kamu güveni korunduğu sürece kurumsal reformun etkili olacağını göstermektedir.`,
      explanation: "Provided that + Present Simple (is) -> Will V1 (will be) Type 1 şart uyumu.",
      hint: { formula: "Provided that + Present -> Will V1", mirror: "Şart ve gelecek sonuç dengesi.", academicNote: `${topic} metin analizi.` }
    });
  }

  // 11-12: Tip 3 (matching - Yan Cümle & Ana Cümle Eşleştirme)
  qList.push({
    id: `c40_l${lessonNum}_q11`,
    type: "matching",
    prompt: `[${topics[lIdx % 8]} / Tip 3 Eşleştirme - Soru 11] Sol sütundaki yan cümleleri doğru akademik ana cümlelerle eşleştirin:`,
    leftHeader: "Akademik Bağlaç / Yan Cümle",
    rightHeader: "Tamamlayıcı Ana Cümle",
    pairs: [
      { left: `Although ${topics[lIdx % 8].toLowerCase()} theories evolved quickly,`, right: "foundational principles remained largely intact." },
      { left: `Provided that funding is secured for ${topics[(lIdx+1) % 8].toLowerCase()},`, right: "the research council will publish the annual report." },
      { left: `Unless policy makers consult ${topics[(lIdx+2) % 8].toLowerCase()} experts,`, right: "social reforms will encounter structural resistance." }
    ],
    explanation: "Bağlaç türü (Although/Provided that/Unless) ile ana cümlelerin anlamsal ve gramer uyumu eşleştirilmiştir."
  });

  qList.push({
    id: `c40_l${lessonNum}_q12`,
    type: "matching",
    prompt: `[${topics[(lIdx+3) % 8]} / Tip 3 Eşleştirme - Soru 12] Cümle parçalarını doğru gramer terazisinde eşleştirin:`,
    leftHeader: "Şart / Sebep Öbeği",
    rightHeader: "Sonuç / Uyum Bloğu",
    pairs: [
      { left: `No sooner had the ${topics[(lIdx+3) % 8].toLowerCase()} manuscript been published`, right: "than international scholars initiated debate." },
      { left: `Due to significant changes in ${topics[(lIdx+4) % 8].toLowerCase()} paradigms,`, right: "academic institutions updated their curriculum." },
      { left: `In order to analyze ${topics[(lIdx+5) % 8].toLowerCase()} trends thoroughly,`, right: "researchers compiled extensive quantitative data." }
    ],
    explanation: "Inversion (No sooner...than), Edat (Due to) ve Amaç (In order to) yapıları eksiksiz eşleştirilmiştir."
  });

  // 13-14: Tip 4 (cloze-test-paragraph - Okuma Parçası İçi Çoklu Boşluk / Bağlam)
  qList.push({
    id: `c40_l${lessonNum}_q13`,
    type: "multiple-choice",
    prompt: `[YÖKDİL ${topics[(lIdx+6) % 8]} / Tip 4 Paragraf Bağlamı - Soru 13] Okuma parçasına göre en uygun yapıyı bulun:`,
    paragraph: `Academic research in ${topics[(lIdx+6) % 8].toLowerCase()} has expanded rapidly over the past decade. Scholars emphasize that unless archival data is cross-referenced with modern field observations, historical conclusions remain tentative. Furthermore, recent monographs suggest that early theories were significantly influenced by cultural biases.`,
    sentence: `Based on the paragraph in ${topics[(lIdx+6) % 8].toLowerCase()}, what condition is necessary for historical conclusions to be definitive?`,
    options: [
      "Archival data must be cross-referenced with modern field observations.",
      "Modern field observations should be ignored entirely.",
      "Early theories must be accepted without empirical verification."
    ],
    correctIndex: 0,
    translation: "Tarihsel sonuçların kesin olması için arşiv verilerinin modern saha gözlemleriyle çapraz kontrol edilmesi gerekir.",
    explanation: "Paragraftaki 'unless archival data is cross-referenced... conclusions remain tentative' şart cümlesinin doğru anlam çıkarımıdır."
  });

  qList.push({
    id: `c40_l14_q14`,
    type: "multiple-choice",
    prompt: `[TOEFL ${topics[(lIdx+7) % 8]} / Tip 4 Paragraf Bağlamı - Soru 14] Paragraftaki gramer kilitlerini değerlendirin:`,
    paragraph: `In the field of ${topics[(lIdx+7) % 8].toLowerCase()}, experts insist that methodology be rigorously peer-reviewed before publication. By the time international symposia convene next spring, panel chairs will have evaluated over one hundred research abstracts.`,
    sentence: "Which two grammatical structures are specifically demonstrated in the passage?",
    options: [
      "Subjunctive (insist that methodology be...) AND Future Perfect (will have evaluated)",
      "Past Perfect AND Simple Present only",
      "Continuous Tense AND Mixed Conditionals"
    ],
    correctIndex: 0,
    translation: "Paragrafta Subjunctive (insist that... be) ve Future Perfect (will have evaluated) kilit yapıları yer almaktadır.",
    explanation: "Metindeki 'insist that methodology be' (Subjunctive) ve 'will have evaluated' (Future Perfect) yapıları tam örtüşür."
  });

  // 15: Tip 5 (translation-switch - Cümle Dönüştürme & Eşdeğer Anlam)
  qList.push({
    id: `c40_l15_q15`,
    type: "multiple-choice",
    prompt: `[${topics[lIdx % 8]} / Tip 5 Cümle Dönüştürme - Soru 15] Verilen cümlenin eşdeğer bağlaçlı dönüştürülmüş halini seçin:`,
    sentence: `Although ${topics[lIdx % 8].toLowerCase()} scholars faced severe censorship, they managed to publish seminal treatises.`,
    options: [
      `In spite of facing severe censorship, ${topics[lIdx % 8].toLowerCase()} scholars managed to publish seminal treatises.`,
      `Because ${topics[lIdx % 8].toLowerCase()} scholars faced censorship, they could not publish treatises.`,
      `Unless ${topics[lIdx % 8].toLowerCase()} scholars face censorship, they will publish seminal treatises.`
    ],
    correctIndex: 0,
    translation: "Şiddetli sansüre maruz kalmalarına RAĞMEN sosyoloji/tarih uzmanları çığır açan eserler yayınlamayı başardı.",
    explanation: "'Although + SVO' zıtlık cümlesi, anlamı bozulmadan 'In spite of + V-ing' yapısına dönüştürülmüştür."
  });

  return {
    id: `c40_l${lessonNum}`,
    unitId: 39,
    title: title,
    subtitle: `15 Kademeli Soru Matrisi (Tip 1, 2, 3, 4, 5 Entegrasyonu)`,
    konuAnlatimi: {
      baslik: title,
      teorikMantik: `${title} konusundaki sınav kilitlerini ve akademik bağlam kurallarını içerir.`,
      formul: "Zaman Kilitleri, Şart Yapıları, Subjunctive Emirleri, Noun/Relative Clauses ve Devriklik Terazisi.",
      altinKural: "Sınavlarda soru kökündeki zaman göstergelerine ve bağlaç arkasındaki cümle yapısına (SVO vs. Noun) dikkat edin!"
    },
    exercises: [
      {
        id: `c40_l${lessonNum}_ex1`,
        title: "Alıştırma 1: 15 Kademeli Soru Matrisi",
        description: "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        questions: qList
      }
    ]
  };
});

const newCodeBlock = `// Register Unit 39 (Bölüm 40 - Exam Strategies)
(function () {
  if (typeof units !== 'undefined' && typeof lessons !== 'undefined' && typeof chapter40Data !== 'undefined') {

    const consolidatedLessons = ${JSON.stringify(generatedLessons, null, 2)};

    // Existing Unit 39'a Dersleri Bağla
    const u39 = units.find(u => u.id === 39 || u.id === '39');
    if (u39) {
      u39.lessons = consolidatedLessons.map(l => l.id);
    } else {
      units.push({
        id: 39,
        title: chapter40Data.chapterName,
        description: chapter40Data.chapterDescription,
        lessons: consolidatedLessons.map(l => l.id),
        pages: "311-350"
      });
    }

    // Dersleri sisteme aktar
    consolidatedLessons.forEach(l => {
      lessons.push({
        id: l.id,
        unitId: 39,
        title: l.title,
        subtitle: l.subtitle || "",
        exercises: l.exercises,
        konuAnlatimi: l.konuAnlatimi || null
      });
    });
  }

  })();`;

content = content.substring(0, targetIndex) + newCodeBlock + content.substring(endIndex + endStr.length);
fs.writeFileSync(file, content, "utf8");
console.log("SUCCESSFULLY FIXED REGISTRATION FOR EXISTING UNIT 39 AND LESSONS!");
