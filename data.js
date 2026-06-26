const unit1IntroSentencesRaw = [
  { en: "Data analysis", tr: "Veri analizi" },
  { en: "Income distribution", tr: "Gelir dağılımı" },
  { en: "Research method", tr: "Araştırma yöntemi" },
  { en: "Finance sector", tr: "Finans sektörü" },
  { en: "Labour policy", tr: "İş gücü politikası" },
  { en: "Computer technology", tr: "Bilgisayar teknolojisi" },
  { en: "Investment strategy", tr: "Yatırım stratejisi" },
  { en: "Resource allocation", tr: "Kaynak tahsisi" },
  { en: "Structure analysis", tr: "Yapı analizi" },
  { en: "Energy source", tr: "Enerji kaynağı" },
  { en: "Contract law", tr: "Sözleşme hukuku" },
  { en: "Quality control", tr: "Kalite kontrol" },
  { en: "Data analysis process", tr: "Veri analizi süreci" },
  { en: "Computer network security", tr: "Bilgisayar ağı güvenliği" },
  { en: "Research project design", tr: "Araştırma projesi tasarımı" },
  { en: "Environment assessment methodology", tr: "Çevre değerlendirme metodolojisi" },
  { en: "Financial sector policy", tr: "Finansal sektör politikası" },
  { en: "Target identity factor", tr: "Hedef kimlik faktörü" },
  { en: "Resource distribution strategy", tr: "Kaynak dağıtımı stratejisi" },
  { en: "Legal contract framework", tr: "Yasal sözleşme çerçevesi" },
  { en: "Project team leader", tr: "Proje ekibi lideri" },
  { en: "Economy growth rate", tr: "Ekonomik büyüme oranı" },
  { en: "Consumer trend research", tr: "Tüketici eğilimi araştırması" },
  { en: "Credit card security", tr: "Kredi kartı güvenliği" },
  { en: "Data analysis team role", tr: "Veri analizi ekibi rolü" },
  { en: "Computer network security policy", tr: "Bilgisayar ağı güvenliği politikası" },
  { en: "Global trade investment strategy", tr: "Küresel ticaret yatırım stratejisi" },
  { en: "Environment impact assessment method", tr: "Çevresel etki değerlendirme yöntemi" },
  { en: "Core team research project", tr: "Çekirdek ekip araştırma projesi" },
  { en: "Individual income distribution category", tr: "Bireysel gelir dağılımı kategorisi" },
  { en: "Sector resource allocation process", tr: "Sektör kaynak tahsisi süreci" },
  { en: "Text analysis research design", tr: "Metin analizi araştırma tasarımı" },
  { en: "Market research data analysis", tr: "Pazar araştırması veri analizi" },
  { en: "Information technology sector policy", tr: "Bilgi teknolojisi sektörü politikası" },
  { en: "Government policy reform process", tr: "Hükümet politikası reform süreci" },
  { en: "Data collection method design", tr: "Veri toplama yöntemi tasarımı" },
  { en: "Academic research project resource allocation", tr: "Akademik araştırma projesi kaynak tahsisi" },
  { en: "Computer network security policy framework", tr: "Bilgisayar ağı güvenliği politikası çerçevesi" },
  { en: "Data analysis team research project", tr: "Veri analizi ekibi araştırma projesi" },
  { en: "Global finance sector investment policy", tr: "Küresel finans sektörü yatırım politikası" },
  { en: "Media text analysis research methodology", tr: "Medya metni analizi araştırma metodolojisi" },
  { en: "Institutional policy resource distribution process", tr: "Kurumsal politika kaynak dağıtımı süreci" },
  { en: "Individual task assessment criteria structure", tr: "Bireysel görev değerlendirme kriterleri yapısı" },
  { en: "International trade law contract framework", tr: "Uluslararası ticaret hukuku sözleşme çerçevesi" }
];

function buildCustomExerciseQuestions(sentences, unitId, lessonId, exId) {
  const qList = [];
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  // 1. Matching (1 question with 4 pairs)
  const matchSents = sentences.slice(0, 4);
  if (matchSents.length >= 2) {
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_match`,
      type: "matching",
      prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
      pairs: matchSents.map(s => ({
        left: s.tr,
        right: s.en
      }))
    });
  }

  // 2. Multiple Choice (4 questions)
  const mcSents = sentences.slice(4, 8);
  mcSents.forEach((sA, idx) => {
    const wrongSents = sentences.filter(s => s.en !== sA.en);
    const shuffledWrongs = shuffle(wrongSents);
    while (shuffledWrongs.length < 3) {
      shuffledWrongs.push({ en: "test", tr: "test" });
    }
    const options = shuffle([
      sA.tr,
      shuffledWrongs[0].tr,
      shuffledWrongs[1].tr,
      shuffledWrongs[2].tr
    ]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_mc_${idx}`,
      type: "multiple-choice",
      prompt: `"${sA.en}" ifadesinin Türkçe karşılığı hangisidir?`,
      options: options,
      correctIndex: options.indexOf(sA.tr),
      enSentence: sA.en,
      isEngToTr: true
    });
  });

  // 3. Word Bank (remaining questions)
  const wbSents = sentences.slice(12);
  wbSents.forEach((sA, idx) => {
    const targetWords = sA.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
    const allOtherTrWords = sentences.filter(s => s.en !== sA.en).map(s => s.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))).flat();
    const uniqueDistractors = [...new Set(allOtherTrWords)].filter(w => !targetWords.includes(w));
    const shuffledDistractors = shuffle(uniqueDistractors);
    while (shuffledDistractors.length < 3) {
      shuffledDistractors.push("ve");
    }
    const words = shuffle([...targetWords, shuffledDistractors[0], shuffledDistractors[1], shuffledDistractors[2]]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_${idx}`,
      type: "word-bank",
      prompt: "İfadenin Türkçe karşılığını oluşturun:",
      translation: sA.en,
      words: words,
      correctOrder: targetWords,
      enSentence: sA.en,
      isEngToTr: true
    });
  });

  // 4. Translation Text (4 questions)
  const txSents = sentences.slice(8, 12);
  txSents.forEach((sA, idx) => {
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_tx_${idx}`,
      type: "translation-text",
      prompt: `"${sA.en}" ifadesini Türkçe'ye çevirin:`,
      correctSentence: sA.tr,
      enSentence: sA.en,
      isEngToTr: true
    });
  });

  return qList;
}

const unit1IntroSentences = {
  exercises: [
    {
      id: "intro_ex1",
      title: "Alıştırma 1: Temel İsim Tamlamaları",
      description: "Eşleştirme, Çoktan Seçmeli ve Çeviri (1-15)",
      questions: buildCustomExerciseQuestions(unit1IntroSentencesRaw.slice(0, 15), 1, 1, 1)
    },
    {
      id: "intro_ex2",
      title: "Alıştırma 2: Orta Seviye İsim Tamlamaları",
      description: "Çoktan Seçmeli, Kelime Bankası ve Çeviri (16-30)",
      questions: buildCustomExerciseQuestions(unit1IntroSentencesRaw.slice(15, 30), 1, 1, 2)
    },
    {
      id: "intro_ex3",
      title: "Alıştırma 3: İleri Seviye İsim Tamlamaları",
      description: "Karma Alıştırmalar ve Çeviri (31-44)",
      questions: buildCustomExerciseQuestions(unit1IntroSentencesRaw.slice(30), 1, 1, 3)
    }
  ]
};

const unit1Lesson2SentencesRaw = [
  // 1. Noun phrases (1-44 from first list)
  { en: "the legs of the animal", tr: "hayvanın bacakları" },
  { en: "the muscles of the leg", tr: "bacağın kasları" },
  { en: "the importance of the results", tr: "sonuçların önemi" },
  { en: "the arrangement of the pictures", tr: "resimlerin düzenlenmesi" },
  { en: "the movement of the molecules", tr: "moleküllerin hareketi" },
  { en: "the extent of the damage", tr: "hasarın boyutu" },
  { en: "the volume of the liquid", tr: "sıvının hacmi" },
  { en: "the result of the experiment", tr: "deneyin sonucu" },
  { en: "the difficulty of the problem", tr: "problemin zorluğu" },
  { en: "the photograph of the student", tr: "öğrencinin fotoğrafı" },
  { en: "the duration of the holiday", tr: "tatilin süresi" },
  { en: "the distribution of the forests", tr: "ormanların dağılımı" },
  { en: "the difficulties of the experiment", tr: "deneyin zorlukları" },
  { en: "the dimensions of the room", tr: "odanın boyutları" },
  { en: "the division of the work", tr: "işin bölünmesi" },
  { en: "the disadvantages of the situation", tr: "durumun dezavantajları" },
  { en: "the employment of the workers", tr: "işçilerin istihdamı" },
  { en: "the use of the wood", tr: "odunun kullanımı" },
  { en: "the discovery of the element", tr: "elementin keşfi" },
  { en: "the volume of the gas", tr: "gazın hacmi" },
  { en: "the analysis of the data", tr: "verinin analizi" },
  { en: "the definition of the concept", tr: "kavramın tanımı" },
  { en: "the structure of the organization", tr: "organizasyonun yapısı" },
  { en: "the interpretation of the text", tr: "metnin yorumlanması" },
  { en: "the function of the brain", tr: "beynin işlevi" },
  { en: "the distribution of the income", tr: "gelirin dağılımı" },
  { en: "the assessment of the risk", tr: "riskin değerlendirilmesi" },
  { en: "the role of the government", tr: "hükümetin rolü" },
  { en: "the creation of the universe", tr: "evrenin yaratılışı" },
  { en: "the evaluation of the program", tr: "programın değerlendirilmesi" },
  { en: "the focus of the study", tr: "çalışmanın odağı" },
  { en: "the impact of the policy", tr: "politikanın etkisi" },
  { en: "the dynamics of the market", tr: "piyasanın dinamikleri" },
  { en: "the stability of the economy", tr: "ekonominin istikrarı" },
  { en: "the design of the system", tr: "sistemin tasarımı" },
  { en: "the complexity of the task", tr: "görevin karmaşıklığı" },
  { en: "the core of the problem", tr: "problemin özü" },
  { en: "the duration of the process", tr: "sürecin süresi" },
  { en: "the consequences of the action", tr: "eylemin sonuçları" },
  { en: "the strategy of the company", tr: "şirketin stratejisi" },
  { en: "the adaptation of the species", tr: "türlerin adaptasyonu" },
  { en: "the framework of the theory", tr: "teorinin çerçevesi" },
  { en: "the context of the situation", tr: "durumun bağlamı" },
  { en: "the proportion of the population", tr: "nüfusun oranı" },

  // 45-80: 36 simple sentences/noun phrases to bridge the gap
  { en: "some of the prices", tr: "fiyatların bazıları" },
  { en: "many of the substances", tr: "maddelerin birçoğu" },
  { en: "one of the diseases", tr: "hastalıkların biri" },
  { en: "most of the goods", tr: "malların çoğu" },
  { en: "all of the mountains", tr: "dağların hepsi" },
  { en: "none of the contracts", tr: "sözleşmelerin hiçbirisi" },
  { en: "each of the agreements", tr: "anlaşmaların her biri" },
  { en: "part of the area", tr: "bölgenin bir kısmı" },
  { en: "most of the oil", tr: "petrolün çoğu" },
  { en: "a little of the gas", tr: "gazın az bir miktarı" },
  { en: "none of the wood", tr: "odunun hiçbirisi" },
  { en: "another of the diseases", tr: "hastalıkların bir başkası" },
  { en: "all of the ideas", tr: "fikirlerin hepsi" },
  { en: "several of the metals", tr: "metallerin birkaçı" },
  { en: "most of the energy", tr: "enerjinin çoğu" },
  { en: "half of the profits", tr: "kazançların yarısı" },
  { en: "a student from England", tr: "ingiltere'den bir öğrenci" },
  { en: "sand from the river", tr: "nehirden gelen kum" },
  { en: "a substance from coal", tr: "kömürden elde edilen madde" },
  { en: "a book from the library", tr: "kütüphaneden bir kitap" },
  { en: "an article from this newspaper", tr: "bu gazeteden bir makale" },
  { en: "radiation from space", tr: "uzaydan gelen radyasyon" },
  { en: "a page from history", tr: "tarihten bir yaprak" },
  { en: "damage from neglect", tr: "ihmalden kaynaklanan hasar" },
  { en: "the water from the river", tr: "nehirden gelen su" },
  { en: "the heat from the metal", tr: "metalden gelen ısı" },
  { en: "the blood from the animal", tr: "hayvandan alınan kan" },
  { en: "diseases from viruses", tr: "virüslerden kaynaklanan hastalıklar" },
  { en: "the gas from this substance", tr: "bu maddeden çıkan gaz" },
  { en: "the results from these experiments", tr: "bu deneylerden alınan sonuçlar" },
  { en: "the ideas from this book", tr: "bu kitaptan edinilen fikirler" },
  { en: "coal from this area", tr: "bu bölgeden çıkan kömür" },
  { en: "the invention of fire", tr: "ateşin icadı" },
  { en: "fear of hunger", tr: "açlık korkusu" },
  { en: "the study of disease", tr: "hastalık çalışması" },
  { en: "proof of guilt", tr: "suçluluk kanıtı" },

  // 81-105: 25 full complex sentences from the new image
  { en: "The committee completed the analysis of the data of the research.", tr: "Komite araştırmanın verilerinin analizini tamamladı." },
  { en: "Experts need to examine the structure of the sectors of the economy.", tr: "Uzmanların ekonominin sektörlerinin yapısını incelemesi gerekiyor." },
  { en: "Policymakers should focus on the evaluation of the benefits of the policy.", tr: "Politika yapıcılar politikanın faydalarının değerlendirilmesine odaklanmalıdır." },
  { en: "The new manager wants to improve the stability of the framework of the organization.", tr: "Yeni müdür organizasyonun çerçevesinin istikrarını geliştirmek istiyor." },
  { en: "The mediator facilitated the resolution of the conflict of the parties.", tr: "Arabulucu tarafların çatışmasının çözümünü kolaylaştırdı." },
  { en: "The statistics confirmed the significance of the results of the experiment.", tr: "İstatistikler deneyin sonuçlarının önemini doğruladı." },
  { en: "Engineers closely monitored the variation of the parameters of the system.", tr: "Mühendisler sistemin parametrelerinin değişimini yakından izledi." },
  { en: "The census revealed the proportion of the minorities of the population.", tr: "Nüfus sayımı nüfusun azınlıklarının oranını ortaya çıkardı." },
  { en: "The scientists provided the validation of the hypotheses of the analysts.", tr: "Bilim insanları analistlerin hipotezlerinin doğrulamasını sağladı." },
  { en: "The lawyer finalized the interpretation of the text of the contract.", tr: "Avukat sözleşmenin metninin yorumlanmasını tamamladı." },
  { en: "The authors provided a detailed chapter for the definition of the concept.", tr: "Yazarlar kavramın tanımı için ayrıntılı bir bölüm sağladı." },
  { en: "The university is very satisfied with the assessment of the students.", tr: "Üniversite öğrencilerin değerlendirilmesinden çok memnun." },
  { en: "No one is allowed to leave the laboratory during the duration of the process.", tr: "Süreç boyunca hiç kimsenin laboratuvardan çıkmasına izin verilmez." },
  { en: "The IT department upgraded the system by the creation of the new network.", tr: "BT departmanı yeni ağın oluşturulmasıyla sistemi yükseltti." },
  { en: "Researchers achieved this breakthrough through the modification of the genes.", tr: "Araştırmacılar bu ilerlemeyi genlerin modifikasyonu yoluyla başardı." },
  { en: "The journalists published their report after the conclusion of the investigation.", tr: "Gazeteciler raporlarını soruşturmanın sonuçlanmasından sonra yayınladılar." },
  { en: "The technician is responsible for the maintenance of the equipment.", tr: "Teknisyen ekipmanın bakımından sorumludur." },
  { en: "The doctors cannot proceed without the consent of the participants.", tr: "Doktorlar katılımcıların onayı olmadan devam edemezler." },
  { en: "The government intervened because of the intensity of the crisis.", tr: "Hükümet krizin şiddeti nedeniyle müdahale etti." },
  { en: "The project operates strictly under the authority of the institution.", tr: "Proje kesinlikle kurumun yetkisi altında yürütülmektedir." },
  { en: "Economists are investigating the distribution of the income in Europe.", tr: "Ekonomistler Avrupa'daki gelir dağılımını araştırıyorlar." },
  { en: "The professor criticized the interpretation of the data in the journal.", tr: "Profesör dergideki verilerin yorumlanmasını eleştirdi." },
  { en: "The ministry aims to promote the integration of the technology in schools.", tr: "Bakanlık okullarda teknolojinin entegrasyonunu teşvik etmeyi amaçlamaktadır." },
  { en: "We underestimated the complexity of the task in the project.", tr: "Projedeki görevin karmaşıklığını hafife aldık." },
  { en: "Environmentalists measured the concentration of the chemical in the water.", tr: "Çevreciler sudaki kimyasalın konsantrasyonunu ölçtüler." }
];

function build15Questions(sentences, unitId, lessonId, exId) {
  const qList = [];
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  // 1. Matching (1 question with 4 pairs using first 4 sentences)
  const matchSents = sentences.slice(0, 4);
  qList.push({
    id: `u${unitId}l${lessonId}_ex${exId}_match`,
    type: "matching",
    prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
    pairs: matchSents.map(s => ({
      left: s.tr,
      right: s.en
    }))
  });

  // 2. Multiple Choice (4 questions using sentences 2 to 5)
  const mcSents = sentences.slice(2, 6);
  mcSents.forEach((sA, idx) => {
    const wrongSents = sentences.filter(s => s.en !== sA.en);
    const shuffledWrongs = shuffle(wrongSents);
    while (shuffledWrongs.length < 3) {
      shuffledWrongs.push({ en: "test", tr: "test" });
    }
    const options = shuffle([
      sA.tr,
      shuffledWrongs[0].tr,
      shuffledWrongs[1].tr,
      shuffledWrongs[2].tr
    ]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_mc_${idx}`,
      type: "multiple-choice",
      prompt: `"${sA.en}" ifadesinin Türkçe karşılığı hangisidir?`,
      options: options,
      correctIndex: options.indexOf(sA.tr),
      enSentence: sA.en,
      isEngToTr: true
    });
  });

  // 3. Word Bank (5 questions using sentences 10 to 14 - repeating last if short)
  const wbSents = sentences.length >= 15 ? sentences.slice(10, 15) : [...sentences.slice(9, 14), sentences[13]];
  wbSents.slice(0, 5).forEach((sA, idx) => {
    const targetWords = sA.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
    const allOtherTrWords = sentences.filter(s => s.en !== sA.en).map(s => s.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))).flat();
    const uniqueDistractors = [...new Set(allOtherTrWords)].filter(w => !targetWords.includes(w));
    const shuffledDistractors = shuffle(uniqueDistractors);
    while (shuffledDistractors.length < 3) {
      shuffledDistractors.push("ve");
    }
    const words = shuffle([...targetWords, shuffledDistractors[0], shuffledDistractors[1], shuffledDistractors[2]]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_${idx}`,
      type: "word-bank",
      prompt: "İfadenin Türkçe karşılığını oluşturun:",
      translation: sA.en,
      words: words,
      correctOrder: targetWords,
      enSentence: sA.en,
      isEngToTr: true
    });
  });

  // 4. Translation Text (5 questions using sentences 5 to 9)
  const txSents = sentences.slice(5, 10);
  txSents.forEach((sA, idx) => {
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_tx_${idx}`,
      type: "translation-text",
      prompt: `"${sA.en}" ifadesini Türkçe'ye çevirin:`,
      correctSentence: sA.tr,
      enSentence: sA.en,
      isEngToTr: true
    });
  });

  return qList;
}

function build12Questions(sentences, unitId, lessonId, exId) {
  const qList = [];
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  // 1. Matching (1 question with 4 pairs using first 4 sentences: index 0 to 3)
  const matchSents = sentences.slice(0, 4);
  qList.push({
    id: `u${unitId}l${lessonId}_ex${exId}_match`,
    type: "matching",
    prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
    pairs: matchSents.map(s => ({
      left: s.tr,
      right: s.en
    }))
  });

  // 2. Multiple Choice (3 questions using sentences 2 to 4)
  const mcSents = sentences.slice(2, 5);
  mcSents.forEach((sA, idx) => {
    const wrongSents = sentences.filter(s => s.en !== sA.en);
    const shuffledWrongs = shuffle(wrongSents);
    while (shuffledWrongs.length < 3) {
      shuffledWrongs.push({ en: "test", tr: "test" });
    }
    const options = shuffle([
      sA.tr,
      shuffledWrongs[0].tr,
      shuffledWrongs[1].tr,
      shuffledWrongs[2].tr
    ]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_mc_${idx}`,
      type: "multiple-choice",
      prompt: `"${sA.en}" ifadesinin Türkçe karşılığı hangisidir?`,
      options: options,
      correctIndex: options.indexOf(sA.tr),
      enSentence: sA.en,
      isEngToTr: true
    });
  });

  // 3. Word Bank (4 questions using sentences 8 to 11)
  const wbSents = sentences.slice(8, 12);
  wbSents.forEach((sA, idx) => {
    const targetWords = sA.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
    const allOtherTrWords = sentences.filter(s => s.en !== sA.en).map(s => s.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))).flat();
    const uniqueDistractors = [...new Set(allOtherTrWords)].filter(w => !targetWords.includes(w));
    const shuffledDistractors = shuffle(uniqueDistractors);
    while (shuffledDistractors.length < 3) {
      shuffledDistractors.push("ve");
    }
    const words = shuffle([...targetWords, shuffledDistractors[0], shuffledDistractors[1], shuffledDistractors[2]]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_${idx}`,
      type: "word-bank",
      prompt: "İfadenin Türkçe karşılığını oluşturun:",
      translation: sA.en,
      words: words,
      correctOrder: targetWords,
      enSentence: sA.en,
      isEngToTr: true
    });
  });

  // 4. Translation Text (4 questions using sentences 5 to 8)
  const txSents = sentences.slice(5, 9);
  txSents.forEach((sA, idx) => {
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_tx_${idx}`,
      type: "translation-text",
      prompt: `"${sA.en}" ifadesini Türkçe'ye çevirin:`,
      correctSentence: sA.tr,
      enSentence: sA.en,
      isEngToTr: true
    });
  });

  return qList;
}

const unit1Lesson2Exercises = {
  exercises: [
    {
      id: "u1l2ex1",
      title: "Alıştırma 1: Basit Yapılar I",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (1-15)",
      questions: build15Questions(unit1Lesson2SentencesRaw.slice(0, 15), 1, 2, 1)
    },
    {
      id: "u1l2ex2",
      title: "Alıştırma 2: Basit Yapılar II",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (16-30)",
      questions: build15Questions(unit1Lesson2SentencesRaw.slice(15, 30), 1, 2, 2)
    },
    {
      id: "u1l2ex3",
      title: "Alıştırma 3: Orta Yapılar I",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (31-45)",
      questions: build15Questions(unit1Lesson2SentencesRaw.slice(30, 45), 1, 2, 3)
    },
    {
      id: "u1l2ex4",
      title: "Alıştırma 4: Orta Yapılar II",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (46-60)",
      questions: build15Questions(unit1Lesson2SentencesRaw.slice(45, 60), 1, 2, 4)
    },
    {
      id: "u1l2ex5",
      title: "Alıştırma 5: İleri Yapılar I",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (61-75)",
      questions: build15Questions(unit1Lesson2SentencesRaw.slice(60, 75), 1, 2, 5)
    },
    {
      id: "u1l2ex6",
      title: "Alıştırma 6: İleri Yapılar II",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (76-90)",
      questions: build15Questions(unit1Lesson2SentencesRaw.slice(75, 90), 1, 2, 6)
    },
    {
      id: "u1l2ex7",
      title: "Alıştırma 7: Karmaşık Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (91-105)",
      questions: build15Questions(unit1Lesson2SentencesRaw.slice(90, 105), 1, 2, 7)
    }
  ]
};

const unit1Lesson3SentencesRaw = [
  // Basit Yapılar (1-15)
  { en: "some of the prices", tr: "fiyatların bazıları" },
  { en: "many of the substances", tr: "maddelerin birçoğu" },
  { en: "one of the diseases", tr: "hastalıkların biri" },
  { en: "most of the goods", tr: "malların çoğu" },
  { en: "some of the experiments", tr: "deneylerin bazıları" },
  { en: "all of the mountains", tr: "dağların hepsi" },
  { en: "none of the contracts", tr: "sözleşmelerin hiçbirisi" },
  { en: "each of the agreements", tr: "anlaşmaların her biri" },
  { en: "some of the heat", tr: "ısının bir kısmı" },
  { en: "part of the area", tr: "bölgenin bir kısmı" },
  { en: "each of the countries", tr: "ülkelerin her biri" },
  { en: "most of the oil", tr: "petrolün çoğu" },
  { en: "a little of the gas", tr: "gazın az bir miktarı" },
  { en: "a little of the liquid", tr: "sıvının az bir miktarı" },
  { en: "none of the wood", tr: "odunun hiçbirisi" },

  // Orta Yapılar (16-30)
  { en: "none of the tissues", tr: "dokuların hiçbirisi" },
  { en: "another of the diseases", tr: "hastalıkların bir başkası" },
  { en: "some of the water vapour", tr: "su buharının bir kısmı" },
  { en: "all of the ideas", tr: "fikirlerin hepsi" },
  { en: "a lot of the work", tr: "işin büyük bir kısmı" },
  { en: "several of the metals", tr: "metallerin birkaçı" },
  { en: "many of the reactions", tr: "tepkimelerin birçoğu" },
  { en: "most of the energy", tr: "enerjinin çoğu" },
  { en: "several of the reasons", tr: "sebeplerin birkaçı" },
  { en: "a little of the heat", tr: "ısının az bir kısmı" },
  { en: "a few of the results", tr: "sonuçların birkaçı" },
  { en: "some of the profit", tr: "kârın bir kısmı" },
  { en: "some of the cost", tr: "maliyetin bir kısmı" },
  { en: "part of the brain", tr: "beynin bir kısmı" },
  { en: "part of the tissues", tr: "dokuların bir kısmı" },

  // İleri Yapılar (31-45)
  { en: "another of the problems", tr: "problemlerin bir diğeri" },
  { en: "many of the details", tr: "detayların birçoğu" },
  { en: "a few of the decisions", tr: "kararların birkaçı" },
  { en: "many of the laws", tr: "yasaların birçoğu" },
  { en: "none of the coal", tr: "kömürün hiçbirisi" },
  { en: "half of the profits", tr: "kazançların yarısı" },
  { en: "half of the cost", tr: "maliyetin yarısı" },
  { en: "most of the bone", tr: "kemiğin çoğu" },
  { en: "several of the employers", tr: "işverenlerin birkaçı" },
  { en: "some of the substances", tr: "maddelerin bazıları" },
  { en: "some of the data", tr: "verilerin bazıları" },
  { en: "many of the substitutes", tr: "alternatiflerin birçoğu" },
  { en: "one of the factors", tr: "faktörlerden biri" },
  { en: "most of the variables", tr: "değişkenlerin çoğu" },
  { en: "some of the experiments", tr: "deneylerin bazıları" },

  // Karmaşık Yapılar (46-60)
  { en: "all of the elements", tr: "elementlerin hepsi" },
  { en: "none of the contracts", tr: "sözleşmelerin hiçbirisi" },
  { en: "each of the categories", tr: "kategorilerin her biri" },
  { en: "some of the energy", tr: "enerjinin bir kısmı" },
  { en: "part of the area", tr: "bölgenin bir kısmı" },
  { en: "each of the countries", tr: "ülkelerin her biri" },
  { en: "most of the revenue", tr: "gelirin çoğu" },
  { en: "a little of the gas", tr: "gazın az bir miktarı" },
  { en: "a little of the liquid", tr: "sıvının az bir miktarı" },
  { en: "none of the resources", tr: "kaynakların hiçbirisi" },
  { en: "none of the sectors", tr: "sektörlerin hiçbirisi" },
  { en: "another of the theories", tr: "teorilerin bir diğeri" },
  { en: "some of the criteria", tr: "kriterlerin bazıları" },
  { en: "all of the concepts", tr: "kavramların hepsi" },
  { en: "a lot of the labor", tr: "emeğin büyük bir kısmı" }
];

const unit1Lesson3Exercises = {
  exercises: [
    {
      id: "u1l3ex1",
      title: "Alıştırma 1: Basit Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (Cümleler 1-15)",
      questions: build15Questions(unit1Lesson3SentencesRaw.slice(0, 15), 1, 3, 1)
    },
    {
      id: "u1l3ex2",
      title: "Alıştırma 2: Orta Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (Cümleler 16-30)",
      questions: build15Questions(unit1Lesson3SentencesRaw.slice(15, 30), 1, 3, 2)
    },
    {
      id: "u1l3ex3",
      title: "Alıştırma 3: İleri Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (Cümleler 31-45)",
      questions: build15Questions(unit1Lesson3SentencesRaw.slice(30, 45), 1, 3, 3)
    },
    {
      id: "u1l3ex4",
      title: "Alıştırma 4: Karmaşık Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (Cümleler 46-60)",
      questions: build15Questions(unit1Lesson3SentencesRaw.slice(45, 60), 1, 3, 4)
    }
  ]
};

const unit1Lesson4SentencesRaw = [
  // Basit Yapılar (1-15)
  { en: "fear of hunger", tr: "açlık korkusu" },
  { en: "the invention of fire", tr: "ateşin icadı" },
  { en: "the study of history", tr: "tarih çalışması" },
  { en: "the speed of light", tr: "ışık hızı" },
  { en: "proof of guilt", tr: "suçluluk kanıtı" },
  { en: "the existence of coal", tr: "kömürün varlığı" },
  { en: "the study of disease", tr: "hastalık çalışması" },
  { en: "division of labor", tr: "iş bölümü" },
  { en: "division of labour", tr: "iş bölümü" },
  { en: "form of government", tr: "hükümet şekli" },
  { en: "form of policy", tr: "politika şekli" },
  { en: "the produce of Turkey", tr: "Türkiye'nin ürünleri" },
  { en: "freedom of religion", tr: "din özgürlüğü" },
  { en: "rejection of authority", tr: "otoritenin reddi" },
  { en: "the history of nations", tr: "ulusların tarihi" },

  // Orta Yapılar (16-30)
  { en: "the use of electricity", tr: "elektrik kullanımı" },
  { en: "the discovery of radium", tr: "radyumun keşfi" },
  { en: "the creation of finance", tr: "finansın yaratılması" },
  { en: "the analysis of data", tr: "verinin analizi" },
  { en: "proof of hypothesis", tr: "hipotez kanıtı" },
  { en: "freedom of movement", tr: "hareket özgürlüğü" },
  { en: "freedom of expression", tr: "ifade özgürlüğü" },
  { en: "freedom of interpretation", tr: "yorumlama özgürlüğü" },
  { en: "the choice of materials", tr: "malzemelerin seçimi" },
  { en: "the growth of population", tr: "nüfusun büyümesi" },
  { en: "the control of quality", tr: "kalite kontrolü" },
  { en: "the source of information", tr: "bilgi kaynağı" },
  { en: "the pattern of behavior", tr: "davranış kalıbı" },
  { en: "the distribution of income", tr: "gelir dağılımı" },
  { en: "the study of economics", tr: "ekonomi çalışması" },

  // İleri Yapılar (31-45)
  { en: "the expectancy of life", tr: "yaşam beklentisi" },
  { en: "the production of raw materials", tr: "hammadde üretimi" },
  { en: "the estimation of welfare", tr: "refah tahmini" },
  { en: "the integration of technology", tr: "teknolojinin entegrasyonu" },
  { en: "the history of legislation", tr: "mevzuat tarihi" },
  { en: "the history of philosophy", tr: "felsefe tarihi" },
  { en: "the equality of individuals", tr: "bireylerin eşitliği" },
  { en: "the production of components", tr: "bileşenlerin üretimi" },
  { en: "the existence of inconsistencies", tr: "tutarsızlıkların varlığı" },
  { en: "the export of resources", tr: "kaynakların ihracatı" },
  { en: "the code of conduct", tr: "davranış kuralları" },
  { en: "the standard of living", tr: "yaşam standardı" },
  { en: "the method of measurement", tr: "ölçüm yöntemi" },
  { en: "the center of gravity", tr: "yerçekimi merkezi" },
  { en: "the state of emergency", tr: "olağanüstü hal" }
];

const unit1Lesson4Exercises = {
  exercises: [
    {
      id: "u1l4ex1",
      title: "Alıştırma 1: Basit Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (1-15)",
      questions: build15Questions(unit1Lesson4SentencesRaw.slice(0, 15), 1, 4, 1)
    },
    {
      id: "u1l4ex2",
      title: "Alıştırma 2: Orta Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (16-30)",
      questions: build15Questions(unit1Lesson4SentencesRaw.slice(15, 30), 1, 4, 2)
    },
    {
      id: "u1l4ex3",
      title: "Alıştırma 3: İleri Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (31-45)",
      questions: build15Questions(unit1Lesson4SentencesRaw.slice(30, 45), 1, 4, 3)
    }
  ]
};

const unit1Lesson5SentencesRaw = [
  // Alıştırma 1: Basit Yapılar (1-12)
  { en: "a student from England", tr: "İngiltere'den bir öğrenci" },
  { en: "sand from the river", tr: "nehirden gelen kum" },
  { en: "a substance from coal", tr: "kömürden elde edilen madde" },
  { en: "a book from the library", tr: "kütüphaneden bir kitap" },
  { en: "an article from this newspaper", tr: "bu gazeteden bir makale" },
  { en: "radiation from space", tr: "uzaydan gelen radyasyon" },
  { en: "a page from history", tr: "tarihten bir sayfa" },
  { en: "damage from neglect", tr: "ihmalden kaynaklanan hasar" },
  { en: "the water from the river", tr: "nehirden gelen su" },
  { en: "the heat from the metal", tr: "metalden gelen ısı" },
  { en: "the blood from the animal", tr: "hayvandan alınan kan" },
  { en: "diseases from viruses", tr: "virüslerden kaynaklanan hastalıklar" },

  // Alıştırma 2: Orta Yapılar (13-24)
  { en: "the gas from this substance", tr: "bu maddeden çıkan gaz" },
  { en: "the results from these experiments", tr: "bu deneylerden alınan sonuçlar" },
  { en: "the ideas from this book", tr: "bu kitaptan edinilen fikirler" },
  { en: "coal from this area", tr: "bu bölgeden çıkan kömür" },
  { en: "the heat from this substance", tr: "bu maddeden gelen ısı" },
  { en: "water from this area", tr: "bu bölgeden gelen su" },
  { en: "a student from the academy", tr: "akademiden bir öğrenci" },
  { en: "data from the survey", tr: "anketten elde edilen veri" },
  { en: "a substitute from coal", tr: "kömürden elde edilen alternatif" },
  { en: "a text from the library", tr: "kütüphaneden bir metin" },
  { en: "an article from this journal", tr: "bu dergiden bir makale" },
  { en: "radiation from the environment", tr: "çevreden gelen radyasyon" },

  // Alıştırma 3: İleri Yapılar (25-36)
  { en: "a page from history", tr: "tarihten bir sayfa" },
  { en: "injury from labor", tr: "çalışmadan kaynaklanan yaralanma" },
  { en: "the revenue from the export", tr: "ihracattan elde edilen gelir" },
  { en: "the energy from the component", tr: "bileşenden gelen enerji" },
  { en: "the blood from the individual", tr: "bireyden alınan kan" },
  { en: "inconsistencies from variables", tr: "değişkenlerden kaynaklanan tutarsızlıklar" },
  { en: "the gas from this substance", tr: "bu maddeden çıkan gaz" },
  { en: "the results from these experiments", tr: "bu deneylerden alınan sonuçlar" },
  { en: "the concepts from this theory", tr: "bu teoriden çıkan kavramlar" },
  { en: "the heat from this substance", tr: "bu maddeden gelen ısı" },
  { en: "feedback from the respondents", tr: "katılımcılardan gelen geri bildirim" },
  { en: "interpretations from the analysts", tr: "analistlerden gelen yorumlar" }
];

const unit1Lesson5SentencesNewRaw = [
  { en: "I have met a student from England.", tr: "İngiltere'den bir öğrenciyle tanıştım." },
  { en: "He took some samples of sand from the river.", tr: "Nehirden bazı kum örnekleri aldı." },
  { en: "They tried to obtain a substance from coal.", tr: "Kömürden bir madde elde etmeye çalıştılar." },
  { en: "They have lost a book from the library.", tr: "Kütüphaneden bir kitap kaybettiler." },
  { en: "Two days ago I read an article from this newspaper.", tr: "İki gün önce bu gazeteden bir makale okudum." },
  { en: "They have not yet solved the problem of radiation from space.", tr: "Uzaydan gelen radyasyon problemini henüz çözmediler." },
  { en: "Watching the film was like reading a page from history.", tr: "Filmi izlemek tarihten bir sayfa okumak gibiydi." },
  { en: "The child is suffering from damage from neglect.", tr: "Çocuk ihmalden kaynaklanan hasardan muzdarip." },
  { en: "The water from the river is not clean enough to drink.", tr: "Nehirden gelen su içmek için yeterince temiz değil." },
  { en: "They found a simple way to measure the heat from the metal.", tr: "Metalden gelen ısıyı ölçmek için basit bir yol buldular." },
  { en: "The blood from the animal was on the road.", tr: "Hayvandan alınan kan yoldaydı." },
  { en: "Today they have found a way to prevent some of the diseases from viruses.", tr: "Bugün virüslerden kaynaklanan bazı hastalıkları önlemenin bir yolunu buldular." },
  { en: "Then they collected the gas from this substance.", tr: "Sonra bu maddeden çıkan gazı topladılar." },
  { en: "We are waiting for the results from these experiments.", tr: "Bu deneylerden alınan sonuçları bekliyoruz." },
  { en: "They did not agree with the ideas from this book.", tr: "Bu kitaptan edinilen fikirlerle aynı fikirde değildiler." },
  { en: "They have stopped mining the coal from this area.", tr: "Bu bölgeden kömür çıkarmayı durdurdular." },
  { en: "They found a way to measure the heat from this substance.", tr: "Bu maddeden gelen ısıyı ölçmek için bir yol buldular." },
  { en: "They have found a way to obtain salt from the water from this area.", tr: "Bu bölgeden gelen sudan tuz elde etmenin bir yolunu buldular." }
];

function buildTranslationAndScrambleQuestions(sentences, unitId, lessonId, exId) {
  const qList = [];
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  sentences.forEach((sA, idx) => {
    const isWordBank = idx < 8;
    if (isWordBank) {
      const targetWords = sA.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
      const allOtherTrWords = sentences.filter(s => s.en !== sA.en).map(s => s.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))).flat();
      const uniqueDistractors = [...new Set(allOtherTrWords)].filter(w => !targetWords.includes(w));
      const shuffledDistractors = shuffle(uniqueDistractors);
      while (shuffledDistractors.length < 3) {
        shuffledDistractors.push("ve");
      }
      const words = shuffle([...targetWords, shuffledDistractors[0], shuffledDistractors[1], shuffledDistractors[2]]);
      qList.push({
        id: `u${unitId}l${lessonId}_ex${exId}_wb_${idx}`,
        type: "word-bank",
        prompt: "Cümlenin Türkçe karşılığını oluşturun:",
        translation: sA.en,
        words: words,
        correctOrder: targetWords,
        enSentence: sA.en,
        isEngToTr: true
      });
    } else {
      qList.push({
        id: `u${unitId}l${lessonId}_ex${exId}_tx_${idx}`,
        type: "translation-text",
        prompt: `"${ensurePunctuation(sA.en)}" cümlesini Türkçe'ye çevirin:`,
        correctSentence: sA.tr,
        enSentence: sA.en,
        isEngToTr: true
      });
    }
  });

  return qList;
}

const unit1Lesson5Exercises = {
  exercises: [
    {
      id: "u1l5ex1",
      title: "Alıştırma 1: Basit Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (1-12)",
      questions: build12Questions(unit1Lesson5SentencesRaw.slice(0, 12), 1, 5, 1)
    },
    {
      id: "u1l5ex2",
      title: "Alıştırma 2: Orta Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (13-24)",
      questions: build12Questions(unit1Lesson5SentencesRaw.slice(12, 24), 1, 5, 2)
    },
    {
      id: "u1l5ex3",
      title: "Alıştırma 3: İleri Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (25-36)",
      questions: build12Questions(unit1Lesson5SentencesRaw.slice(24, 36), 1, 5, 3)
    },
    {
      id: "u1l5ex4",
      title: "Alıştırma 4: Cümle Çevirileri",
      description: "Kelime Sıralama & Yazılı Çeviri (Cümleler 1-18)",
      questions: buildTranslationAndScrambleQuestions(unit1Lesson5SentencesNewRaw, 1, 5, 4)
    }
  ]
};

const unit1Lesson7SentencesRaw = [
  // Basit Yapılar (1-17)
  { en: "the difference in the results of the experiments", tr: "deneylerin sonuçlarındaki fark" },
  { en: "a study of the diseases of the blood", tr: "kan hastalıklarının bir incelemesi" },
  { en: "the space between the molecules in the liquid in the glass", tr: "bardaktaki sıvının molekülleri arasındaki boşluk" },
  { en: "the policy of the government during the last few years", tr: "son birkaç yılda hükümetin politikası" },
  { en: "the photograph on the front page of the newspaper", tr: "gazetenin ön sayfasındaki fotoğraf" },
  { en: "the difficulty in the explanation of the problem", tr: "problemin açıklanmasındaki zorluk" },
  { en: "government by the people of this community", tr: "bu topluluğun halkı tarafından yönetim" },
  { en: "the history of the civilisation of these people", tr: "bu insanların medeniyetinin tarihi" },
  { en: "the damage to the head of this patient", tr: "bu hastanın kafasındaki hasar" },
  { en: "the ideas in this article in the newspaper", tr: "gazetedeki bu makaledeki fikirler" },
  { en: "the disease in the bones of the leg", tr: "bacak kemiklerindeki hastalık" },
  { en: "the heat in the metal round the top of the bottle", tr: "şişenin üst kısmının etrafındaki metaldeki ısı" },
  { en: "the heat at the surface of the liquid in the tank", tr: "tanktaki sıvının yüzeyindeki ısı" },
  { en: "the cure for this disease of the blood", tr: "bu kan hastalığının tedavisi" },
  { en: "an injection into the muscle of the leg of the animal", tr: "hayvanın bacağının kasına yapılan enjeksiyon" },
  { en: "preparation for an examination in English", tr: "İngilizce sınavına hazırlık" },
  { en: "employment in factories of this kind", tr: "bu tür fabrikalardaki istihdam" },

  // Orta Yapılar (18-34)
  { en: "the situation of the workers in America", tr: "Amerika'daki işçilerin durumu" },
  { en: "the coal at the surface of the ground", tr: "toprağın yüzeyindeki kömür" },
  { en: "a substance in the blood of the patient with this disease", tr: "bu hastalığa sahip hastanın kanındaki madde" },
  { en: "the variation in the responses of the participants", tr: "katılımcıların yanıtlarındaki değişim" },
  { en: "the shift in the policies of the government", tr: "hükümetin politikalarındaki değişim" },
  { en: "the inconsistency in the data of the analysis", tr: "analizin verilerindeki tutarsızlık" },
  { en: "the decline in the revenue of the sectors", tr: "sektörlerin gelirlerindeki düşüş" },
  { en: "the fluctuation in the estimates of the economists", tr: "ekonomistlerin tahminlerindeki dalgalanma" },
  { en: "the ambiguity in the clauses of the contract", tr: "sözleşmenin maddelerindeki belirsizlik" },
  { en: "the rigidity in the structures of the institutions", tr: "kurumların yapılarındaki katılık" },
  { en: "the progression in the phases of the process", tr: "sürecin aşamalarındaki ilerleme" },
  { en: "the distortion in the images of the media", tr: "medyanın görüntülerindeki bozulma" },
  { en: "a study of the theories of the philosophy", tr: "felsefenin teorilerinin bir incelemesi" },
  { en: "an assessment of the components of the framework", tr: "çerçevenin bileşenlerinin değerlendirmesi" },
  { en: "an interpretation of the text of the legislation", tr: "mevzuatın metninin yorumu" },
  { en: "a summary of the principles of the academy", tr: "akademinin ilkelerinin özeti" },
  { en: "an investigation of the ethics of the practitioners", tr: "uygulayıcıların ahlak kurallarının araştırılması" },

  // İleri Yapılar (35-49)
  { en: "the integration of the elements of the culture", tr: "kültürün unsurlarının entegrasyonu" },
  { en: "the validation of the criteria of the evaluation", tr: "değerlendirmenin ölçütlerinin doğrulanması" },
  { en: "a definition of the parameters of the concept", tr: "kavramın parametrelerinin bir tanımı" },
  { en: "the distribution of the resources of the welfare", tr: "refah kaynaklarının dağılımı" },
  { en: "a revaluation of the assets of the corporation", tr: "şirket varlıklarının yeniden değerlendirilmesi" },
  { en: "the conflict between the individuals in the workplace", tr: "işyerindeki bireyler arasındaki çatışma" },
  { en: "the interaction between the variables in the formula", tr: "formüldeki değişkenler arasındaki etkileşim" },
  { en: "the linkage between the innovations in the industry", tr: "sektördeki yenilikler arasındaki bağlantı" },
  { en: "the relation between the factors in the environment", tr: "çevredeki faktörler arasındaki ilişki" },
  { en: "the consensus between the analysts in the committee", tr: "komitedeki analistler arasındaki fikir birliği" },
  { en: "the overlap between the categories in the database", tr: "veritabanındaki kategoriler arasındaki çakışma" },
  { en: "the tension between the minorities in the region", tr: "bölgedeki azınlıklar arasındaki gerilim" },
  { en: "the cooperation between the colleagues in the department", tr: "departmandaki meslektaşlar arasındaki işbirliği" },
  { en: "the proportion of the immigrants in the population", tr: "nüfustaki göçmenlerin oranı" },
  { en: "the accumulation of the evidence in the investigation", tr: "soruşturmadaki kanıtların birikmesi" }
];


function buildDynamicQuestions(sentences, unitId, lessonId, exId) {
  const qList = [];
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
  const total = sentences.length;

  // 1. Matching (1 question with 4 pairs using first 4 sentences)
  const matchSents = sentences.slice(0, 4);
  qList.push({
    id: `u${unitId}l${lessonId}_ex${exId}_match`,
    type: "matching",
    prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
    pairs: matchSents.map(s => ({
      left: s.tr,
      right: s.en
    }))
  });

  // 2. Multiple Choice (up to 6 questions using indices 2 to 7)
  const mcSents = sentences.slice(2, Math.min(8, total));
  mcSents.forEach((sA, idx) => {
    const wrongSents = sentences.filter(s => s.en !== sA.en);
    const shuffledWrongs = shuffle(wrongSents);
    while (shuffledWrongs.length < 3) {
      shuffledWrongs.push({ en: "test", tr: "test" });
    }
    const options = shuffle([
      sA.tr,
      shuffledWrongs[0].tr,
      shuffledWrongs[1].tr,
      shuffledWrongs[2].tr
    ]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_mc_${idx}`,
      type: "multiple-choice",
      prompt: `"${sA.en}" ifadesinin Türkçe karşılığı hangisidir?`,
      options: options,
      correctIndex: options.indexOf(sA.tr),
      enSentence: sA.en,
      isEngToTr: true
    });
  });

  // 3. Word Bank (remaining questions from index 14 onwards)
  const wbStart = Math.min(14, total);
  const wbSents = sentences.slice(wbStart);
  wbSents.forEach((sA, idx) => {
    const targetWords = sA.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
    const allOtherTrWords = sentences.filter(s => s.en !== sA.en).map(s => s.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))).flat();
    const uniqueDistractors = [...new Set(allOtherTrWords)].filter(w => !targetWords.includes(w));
    const shuffledDistractors = shuffle(uniqueDistractors);
    while (shuffledDistractors.length < 3) {
      shuffledDistractors.push("ve");
    }
    const words = shuffle([...targetWords, shuffledDistractors[0], shuffledDistractors[1], shuffledDistractors[2]]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_${idx}`,
      type: "word-bank",
      prompt: "İfadenin Türkçe karşılığını oluşturun:",
      translation: sA.en,
      words: words,
      correctOrder: targetWords,
      enSentence: sA.en,
      isEngToTr: true
    });
  });

  // 4. Translation Text (up to 6 questions using indices 8 to 13)
  const txStart = Math.min(8, total);
  const txEnd = Math.min(14, total);
  const txSents = sentences.slice(txStart, txEnd);
  txSents.forEach((sA, idx) => {
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_tx_${idx}`,
      type: "translation-text",
      prompt: `"${ensurePunctuation(sA.en)}" ifadesini Türkçe'ye çevirin:`,
      correctSentence: sA.tr,
      enSentence: sA.en,
      isEngToTr: true
    });
  });

  return qList;
}

const unit1Lesson6SentencesRaw1 = [
  { en: "the workers in the factory", tr: "fabrikadaki işçiler" },
  { en: "the statement in the newspaper", tr: "gazetedeki ifade" },
  { en: "the papers on my table", tr: "masamın üzerindeki kağıtlar" },
  { en: "the photograph in the newspaper", tr: "gazetedeki fotoğraf" },
  { en: "the difference between the results", tr: "sonuçlar arasındaki fark" },
  { en: "the molecules in the liquid", tr: "sıvıdaki moleküller" },
  { en: "the molecules in the gas", tr: "gazdaki moleküller" },
  { en: "the policy of the government", tr: "hükümetin politikası" },
  { en: "government by the people", tr: "halk tarafından yönetim" },
  { en: "the examination of the doctor", tr: "doktorun muayenesi" },
  { en: "damage to the head", tr: "kafadaki hasar" },
  { en: "the ideas in this chapter", tr: "bu bölümdeki fikirler" },
  { en: "the bones in the arm", tr: "koldaki kemikler" },
  { en: "the heat in the metal", tr: "metaldeki ısı" },
  { en: "the cure for this disease", tr: "bu hastalığın tedavisi" },
  { en: "injection under the skin", tr: "deri altındaki enjeksiyon" },
  { en: "preparation for an examination", tr: "sınava hazırlık" },
  { en: "employment in the factories", tr: "fabrikalardaki istihdam" },
  { en: "a substance in the blood", tr: "kandaki bir madde" },
  { en: "the distance from this point", tr: "bu noktadan olan mesafe" },
  { en: "the water under the ground", tr: "yer altındaki su" },
  { en: "the situation in America", tr: "Amerika'daki durum" }
];

const unit1Lesson6SentencesRaw2 = [
  { en: "The employer of these men is at the office.", tr: "Bu adamların işvereni ofistedir." },
  { en: "The explanation of this problem is at the end.", tr: "Bu problemin açıklaması sondadır." },
  { en: "The machine for cutting paper is in the factory.", tr: "Kağıt kesme makinesi fabrikadadır." },
  { en: "The substance in the test-tube is from this bottle.", tr: "Deney tüpündeki madde bu şişedendir." },
  { en: "The answer to this problem is in the book.", tr: "Bu problemin cevabı kitaptadır." },
  { en: "The market for these goods is in the Far East.", tr: "Bu malların pazarı Uzak Doğu'dadır." },
  { en: "The building in the centre of the town is between the railway and the river.", tr: "Kasabanın merkezindeki bina demiryolu ile nehir arasındadır." },
  { en: "The book about Turkey is on the table.", tr: "Türkiye hakkındaki kitap masanın üzerindedir." },
  { en: "The summary of the chapter is at the end.", tr: "Bölümün özeti sondadır." },
  { en: "The papers for the examination are on my table.", tr: "Sınav kağıtları masamın üzerindedir." },
  { en: "The buildings on the corner are in the centre of the city.", tr: "Köşedeki binalar şehrin merkezindedir." },
  { en: "The chapters on Turkey are at the end.", tr: "Türkiye ile ilgili bölümler sondadır." },
  { en: "The factories inside the town are near the river.", tr: "Kasabanın içindeki fabrikalar nehrin yakınındadır." },
  { en: "The substances in the liquid are from this bottle.", tr: "Sıvıdaki maddeler bu şişedendir." },
  { en: "The liquids in the test-tubes are in the laboratory.", tr: "Deney tüplerindeki sıvılar laboratuvardadır." },
  { en: "The answers to the questions are on this paper.", tr: "Soruların cevapları bu kağıttadır." },
  { en: "The statements of the workers are in this report.", tr: "İşçilerin ifadeleri bu rapordadır." },
  { en: "The coal in this area is near the surface.", tr: "Bu bölgedeki kömür yüzeye yakındır." },
  { en: "The translation of these sentences is on the next page.", tr: "Bu cümlelerin çevirisi sonraki sayfadadır." },
  { en: "Nutrients in the soil are near the surface.", tr: "Topraktaki besinler yüzeye yakındır." }
];

const unit1Lesson6SentencesRaw3 = [
  { en: "The activities of the research workers are in this report.", tr: "Araştırma görevlilerinin faaliyetleri bu rapordadır." },
  { en: "The results of their investigations are in the report.", tr: "Araştırmalarının sonuçları rapordadır." },
  { en: "The results of these experiments will be in this report.", tr: "Bu deneylerin sonuçları bu raporda olacaktır." },
  { en: "The decision of the committee was in favour of their activities.", tr: "Komitenin kararı onların faaliyetlerinin lehineydi." },
  { en: "The majority of the workers were in favour of the decisions.", tr: "İşçilerin çoğunluğu kararların lehineydi." },
  { en: "The details of the experiment are in this report.", tr: "Deneyin detayları bu rapordadır." },
  { en: "The answers to all these questions are at the end of the book.", tr: "Tüm bu soruların cevapları kitabın sonundadır." },
  { en: "The object of the research project will be at the beginning of the report.", tr: "Araştırma projesinin amacı raporun başlangıcında olacaktır." },
  { en: "The details of the study were not in the report.", tr: "Çalışmanın detayları raporda değildi." },
  { en: "The comprehension questions for these sentences are at the end of the exercise.", tr: "Bu cümleler için anlama soruları alıştırmanın sonundadır." },
  { en: "The bacteria of this disease are in the tissues of the lung.", tr: "Bu hastalığın bakterileri akciğer dokularındadır." },
  { en: "The date of the next meeting is on the notice board.", tr: "Bir sonraki toplantının tarihi ilan tahtasındadır." },
  { en: "The report of the last meeting may be on the notice board.", tr: "Son toplantının raporu ilan tahtasında olabilir." },
  { en: "The equipment for the next experiment is not in the laboratory.", tr: "Bir sonraki deney için ekipman laboratuvarda değildir." },
  { en: "The statement from the manager was in today's newspaper.", tr: "Yöneticinin açıklaması bugünkü gazetedeydi." },
  { en: "The materials for the next experiment are in this box.", tr: "Bir sonraki deney için malzemeler bu kutudadır." },
  { en: "The reasons for their refusal are in this statement.", tr: "Reddetmelerinin nedenleri bu açıklamadır." },
  { en: "The list of names of patients from that hospital is in the records.", tr: "O hastanedeki hastaların isim listesi kayıtlardadır." },
  { en: "The records of all the students are in these files.", tr: "Tüm öğrencilerin kayıtları bu dosyalardadır." },
  { en: "The address of every hospital in London is in our records.", tr: "Londra'daki her hastanenin adresi kayıtlarımızdadir." },
  { en: "The names and addresses of all our patients are in these files.", tr: "Tüm hastalarımızın isimleri ve adresleri bu dosyalardadır." },
  { en: "The oil in this area is below the level of the sea.", tr: "Bu bölgedeki petrol deniz seviyesinin altındadır." }
];

const unit1Lesson6SentencesRaw4 = [
  { en: "The manager is speaking to the workers in the factory.", tr: "Yönetici fabrikadaki işçilerle konuşuyor." },
  { en: "Nobody has read the statement in the newspaper.", tr: "Gazetedeki açıklamayı kimse okumadı." },
  { en: "I have lost the papers on my table.", tr: "Masamın üzerindeki kağıtları kaybettim." },
  { en: "The photograph in the newspaper is not very good.", tr: "Gazetedeki fotoğraf çok iyi değil." },
  { en: "Have you seen the difference between the results?", tr: "Sonuçlar arasındaki farkı gördün mü?" },
  { en: "The molecules in the liquid never stop moving.", tr: "Sıvıdaki moleküller hareket etmeyi asla bırakmaz." },
  { en: "The molecules in the gas are less dense.", tr: "Gazdaki moleküller daha az yoğundur." },
  { en: "They did not approve of the policy of the government.", tr: "Hükümetin politikasını onaylamadılar." },
  { en: "Democracy is a form of government by the people.", tr: "Demokrasi halk tarafından bir yönetim biçimidir." },
  { en: "He is ready for the examination of the doctor.", tr: "Doktorun muayenesi için hazırdır." },
  { en: "The doctor could not see any damage to the head.", tr: "Doktor kafada herhangi bir hasar göremedi." },
  { en: "They did not approve of the ideas in this chapter.", tr: "Bu bölümdeki fikirleri onaylamadılar." },
  { en: "The doctor examined the bones in the arm with X-rays.", tr: "Doktor koldaki kemikleri Röntgen ışınlarıyla inceledi." },
  { en: "They measured the loss of the heat in the metal.", tr: "Metaldeki ısı kaybını ölçtüler." },
  { en: "Now they have found a cure for this disease.", tr: "Şimdi bu hastalık için bir tedavi buldular." },
  { en: "He preferred to make injection under the skin.", tr: "Deri altına enjeksiyon yapmayı tercih etti." },
  { en: "These students have had no preparation for an examination.", tr: "Bu öğrencilerin sınava hazırlığı yoktu." },
  { en: "These machines are ready for use in the factories.", tr: "Bu makineler fabrikalarda kullanılmak üzere hazırdır." },
  { en: "Sodium chloride is a substance in the blood.", tr: "Sodyum klorür kandaki bir maddedir." },
  { en: "The students measured the distance from this point.", tr: "Öğrenciler bu noktadan olan mesafeyi ölçtüler." },
  { en: "The water under the ground rises to the surface.", tr: "Yer altındaki su yüzeye yükselir." },
  { en: "Nobody has mentioned the situation in America.", tr: "Kimse Amerika'daki durumdan bahsetmedi." }
];

const unit1Lesson6SentencesRaw5 = [
  { en: "He studied the movement of the legs of the animal.", tr: "Hayvanın bacaklarının hareketini inceledi." },
  { en: "He studied the movement of the muscles of the leg.", tr: "Bacağın kaslarının hareketini inceledi." },
  { en: "We must remember the importance of the results of this experiment.", tr: "Bu deneyin sonuçlarının önemini unutmamalıyız." },
  { en: "The arrangement of the pictures is very important.", tr: "Resimlerin düzenlenmesi çok önemlidir." },
  { en: "Robert Brown studied the movement of the molecules in a liquid.", tr: "Robert Brown bir sıvıdaki moleküllerin hareketini inceledi." },
  { en: "The doctor estimated the extent of the damage to the thorax.", tr: "Doktor toraksa verilen hasarın boyutunu tahmin etti." },
  { en: "The volume of the liquid increased or decreased.", tr: "Sıvının hacmi arttı veya azaldı." },
  { en: "We are waiting for the result of the experiment.", tr: "Deneyin sonucunu bekliyoruz." },
  { en: "He could not understand the difficulty of the problem.", tr: "Problemin zorluğunu anlayamadı." },
  { en: "The photograph of the student is not in the file.", tr: "Öğrencinin fotoğrafı dosyada değil." },
  { en: "They closed the factory for the duration of the holiday.", tr: "Tatil süresince fabrikayı kapattılar." },
  { en: "This map shows the distribution of the forests in Turkey.", tr: "Bu harita Türkiye'deki ormanların dağılımını göstermektedir." },
  { en: "They overcame the difficulties of the experiment.", tr: "Deneyin zorluklarının üstesinden geldiler." },
  { en: "They did not know the dimensions of the room.", tr: "Odanın boyutlarını bilmiyorlardı." },
  { en: "The manager will decide on the division of the work.", tr: "Müdür işin bölünmesine karar verecektir." },
  { en: "The students could not see the disadvantages of the situation.", tr: "Öğrenciler durumun dezavantajlarını göremediler." },
  { en: "He spoke in favour of the employment of the workers.", tr: "İşçilerin istihdam edilmesinin lehinde konuştu." },
  { en: "He will not recommend the use of the wood.", tr: "Odunun kullanılmasını tavsiye etmeyecektir." },
  { en: "The discovery of the element was important to his work.", tr: "Elementin keşfi onun çalışması için önemliydi." },
  { en: "The volume of the gas will increase or decrease.", tr: "Gazın hacmi artacak veya azalacaktır." }
];

const unit1Lesson6Exercises = {
  exercises: [
    {
      id: "u1l6ex1",
      title: "Alıştırma 1: Basit Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (Cümleler 1-22)",
      questions: buildDynamicQuestions(unit1Lesson6SentencesRaw1, 1, 6, 1)
    },
    {
      id: "u1l6ex2",
      title: "Alıştırma 2: Cümle Yapıları I",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (Cümleler 1-20)",
      questions: buildDynamicQuestions(unit1Lesson6SentencesRaw2, 1, 6, 2)
    },
    {
      id: "u1l6ex3",
      title: "Alıştırma 3: Cümle Yapıları II",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (Cümleler 1-22)",
      questions: buildDynamicQuestions(unit1Lesson6SentencesRaw3, 1, 6, 3)
    },
    {
      id: "u1l6ex4",
      title: "Alıştırma 4: Durumsal Cümleler",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (Cümleler 1-22)",
      questions: buildDynamicQuestions(unit1Lesson6SentencesRaw4, 1, 6, 4)
    },
    {
      id: "u1l6ex5",
      title: "Alıştırma 5: Karmaşık Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (Cümleler 1-20)",
      questions: buildDynamicQuestions(unit1Lesson6SentencesRaw5, 1, 6, 5)
    }
  ]
};

const unit1Lesson7Exercises = {
  exercises: [
    {
      id: "u1l7ex1",
      title: "Alıştırma 1: Basit Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (Cümleler 1-17)",
      questions: buildDynamicQuestions(unit1Lesson7SentencesRaw.slice(0, 17), 1, 7, 1)
    },
    {
      id: "u1l7ex2",
      title: "Alıştırma 2: Orta Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (Cümleler 18-34)",
      questions: buildDynamicQuestions(unit1Lesson7SentencesRaw.slice(17, 34), 1, 7, 2)
    },
    {
      id: "u1l7ex3",
      title: "Alıştırma 3: İleri Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası (Cümleler 35-49)",
      questions: buildDynamicQuestions(unit1Lesson7SentencesRaw.slice(34), 1, 7, 3)
    }
  ]
};

// Unit 6 Lesson 1 'There is / There is no' Sentences and Exercises Generation
const nounsData = [
  { en: "examination", tr: "sınav", type: "an" },
  { en: "test", tr: "test", type: "a" },
  { en: "possibility", tr: "olasılık", type: "a" },
  { en: "tendency", tr: "eğilim", type: "a" },
  { en: "translation", tr: "çeviri", type: "a" },
  { en: "form", tr: "biçim", type: "a" },
  { en: "hope", tr: "umut", type: "a" },
  { en: "improvement", tr: "gelişme", type: "an" },
  { en: "theory", tr: "kuram", type: "a" },
  { en: "supply", tr: "arz", type: "a" },
  { en: "wire", tr: "tel", type: "a" },
  { en: "vibration", tr: "titreşim", type: "a" },
  { en: "temperature", tr: "sıcaklık", type: "a" },
  { en: "type", tr: "tür", type: "a" },
  { en: "statement", tr: "ifade", type: "a" },
  { en: "suggestion", tr: "öneri", type: "a" },
  { en: "summary", tr: "özet", type: "a" },
  { en: "source", tr: "kaynak", type: "a" },
  { en: "solution", tr: "çözüm", type: "a" },
  { en: "similarity", tr: "benzerlik", type: "a" },
  { en: "profit", tr: "kâr", type: "a" },
  { en: "condition", tr: "koşul", type: "a" }
];

const unit6AffSentences = nounsData.map(item => ({
  en: `There is ${item.type} ${item.en}`,
  tr: `Bir ${item.tr} vardır`,
  word: item.en,
  trWord: item.tr
}));

const unit6NegSentences = nounsData.map(item => ({
  en: `There is no ${item.en}`,
  tr: `Bir ${item.tr} yoktur`,
  word: item.en,
  trWord: item.tr
}));

const allUnit6Sentences = [...unit6AffSentences, ...unit6NegSentences];

function makeWordBankQuestion(id, sentence, prompt, isEngToTr, sentencesPool) {
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
  const sourceStr = isEngToTr ? sentence.en : sentence.tr;
  const targetStr = isEngToTr ? sentence.tr : sentence.en;

  const targetWords = targetStr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
  const allOtherWords = sentencesPool
    .filter(s => s.en !== sentence.en)
    .map(s => (isEngToTr ? s.tr : s.en).split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")))
    .flat();
  const uniqueDistractors = [...new Set(allOtherWords)].filter(w => !targetWords.includes(w));
  const shuffledDistractors = shuffle(uniqueDistractors);
  while (shuffledDistractors.length < 3) {
    shuffledDistractors.push(isEngToTr ? "ve" : "the");
  }
  const words = shuffle([...targetWords, shuffledDistractors[0], shuffledDistractors[1], shuffledDistractors[2]]);

  return {
    id: id,
    type: "word-bank",
    prompt: prompt,
    translation: sourceStr,
    words: words,
    correctOrder: targetWords,
    enSentence: sentence.en,
    isEngToTr: isEngToTr
  };
}

function makeMultipleChoiceQuestion(id, sentence, prompt, isEngToTr, sentencesPool) {
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
  const sourceStr = isEngToTr ? sentence.en : sentence.tr;
  const targetStr = isEngToTr ? sentence.tr : sentence.en;

  const wrongSents = sentencesPool.filter(s => s.en !== sentence.en);
  const shuffledWrongs = shuffle(wrongSents);
  while (shuffledWrongs.length < 3) {
    shuffledWrongs.push({ en: "test", tr: "test" });
  }

  const options = shuffle([
    targetStr,
    isEngToTr ? shuffledWrongs[0].tr : shuffledWrongs[0].en,
    isEngToTr ? shuffledWrongs[1].tr : shuffledWrongs[1].en,
    isEngToTr ? shuffledWrongs[2].tr : shuffledWrongs[2].en
  ]);

  return {
    id: id,
    type: "multiple-choice",
    prompt: prompt,
    options: options,
    correctIndex: options.indexOf(targetStr),
    enSentence: sentence.en,
    isEngToTr: isEngToTr
  };
}

function makeEnglishDropdownQuestion(id, sentence) {
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
  
  let blankedSentence = "";
  let correct = "";
  let options = [];

  if (sentence.en.includes("There is an ")) {
    blankedSentence = sentence.en.replace("There is an ", "There is ___ ");
    correct = "an";
    options = ["a", "an", "no", "the"];
  } else if (sentence.en.includes("There is a ")) {
    blankedSentence = sentence.en.replace("There is a ", "There is ___ ");
    correct = "a";
    options = ["a", "an", "no", "any"];
  } else if (sentence.en.includes("There is no ")) {
    blankedSentence = sentence.en.replace("There is no ", "There is ___ ");
    correct = "no";
    options = ["a", "an", "no", "some"];
  }

  const shuffledOptions = shuffle(options);

  return {
    id: id,
    type: "fill-blank-dropdown",
    prompt: `Cümleyi tamamlayın: "${sentence.tr}"`,
    sentence: blankedSentence,
    options: shuffledOptions,
    correctIndex: shuffledOptions.indexOf(correct),
    enSentence: sentence.en
  };
}

function makeTurkishDropdownQuestion(id, sentence) {
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
  
  let blankedSentence = "";
  let correct = "";
  let options = [];

  if (sentence.tr.endsWith(" vardır")) {
    blankedSentence = sentence.tr.replace(" vardır", " ___");
    correct = "vardır";
    options = ["vardır", "yoktur", "değildir", "olur"];
  } else if (sentence.tr.endsWith(" yoktur")) {
    blankedSentence = sentence.tr.replace(" yoktur", " ___");
    correct = "yoktur";
    options = ["vardır", "yoktur", "değildir", "olmaz"];
  }

  const shuffledOptions = shuffle(options);

  return {
    id: id,
    type: "fill-blank-dropdown",
    prompt: `Boşluğu doldurun: "${sentence.en}"`,
    sentence: blankedSentence,
    options: shuffledOptions,
    correctIndex: shuffledOptions.indexOf(correct),
    enSentence: sentence.en
  };
}

function makeMatchingQuestion(id, sentencesSlice) {
  return {
    id: id,
    type: "matching",
    prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
    pairs: sentencesSlice.map(s => ({
      left: s.tr,
      right: s.en
    }))
  };
}

function buildUnit6Lesson1Exercises() {
  const exercises = [];

  // Ex 1: Olumlu Cümleler I (Nouns 1-11)
  const ex1Sents = unit6AffSentences.slice(0, 11);
  const ex1Questions = [];
  ex1Questions.push(makeMatchingQuestion("u6l1ex1_match", ex1Sents.slice(0, 4)));
  for (let i = 0; i < 5; i++) {
    ex1Questions.push(makeWordBankQuestion(`u6l1ex1_wb_et_${i}`, ex1Sents[1 + i], "Cümlenin Türkçe karşılığını oluşturun:", true, ex1Sents));
  }
  for (let i = 0; i < 5; i++) {
    ex1Questions.push(makeWordBankQuestion(`u6l1ex1_wb_te_${i}`, ex1Sents[6 + i], "Translate to English:", false, ex1Sents));
  }
  for (let i = 0; i < 4; i++) {
    ex1Questions.push(makeMultipleChoiceQuestion(`u6l1ex1_mc_${i}`, ex1Sents[7 + i], `"${ex1Sents[7 + i].en}" ifadesinin Türkçe karşılığı hangisidir?`, true, ex1Sents));
  }
  exercises.push({
    id: "u6l1ex1",
    title: "Alıştırma 1: Var Yapısı - Olumlu Cümleler I",
    description: "There is (1-11) - Eşleştirme, Kelime Bankası ve Sıralama",
    questions: ex1Questions
  });

  // Ex 2: Olumlu Cümleler II (Nouns 12-22)
  const ex2Sents = unit6AffSentences.slice(11, 22);
  const ex2Questions = [];
  ex2Questions.push(makeMatchingQuestion("u6l1ex2_match", ex2Sents.slice(0, 4)));
  for (let i = 0; i < 5; i++) {
    ex2Questions.push(makeWordBankQuestion(`u6l1ex2_wb_et_${i}`, ex2Sents[1 + i], "Cümlenin Türkçe karşılığını oluşturun:", true, ex2Sents));
  }
  for (let i = 0; i < 5; i++) {
    ex2Questions.push(makeWordBankQuestion(`u6l1ex2_wb_te_${i}`, ex2Sents[6 + i], "Translate to English:", false, ex2Sents));
  }
  for (let i = 0; i < 4; i++) {
    ex2Questions.push(makeMultipleChoiceQuestion(`u6l1ex2_mc_${i}`, ex2Sents[7 + i], `"${ex2Sents[7 + i].en}" ifadesinin Türkçe karşılığı hangisidir?`, true, ex2Sents));
  }
  exercises.push({
    id: "u6l1ex2",
    title: "Alıştırma 2: Var Yapısı - Olumlu Cümleler II",
    description: "There is (12-22) - Eşleştirme, Kelime Bankası ve Sıralama",
    questions: ex2Questions
  });

  // Ex 3: Olumsuz Cümleler I (Nouns 1-11)
  const ex3Sents = unit6NegSentences.slice(0, 11);
  const ex3Questions = [];
  ex3Questions.push(makeMatchingQuestion("u6l1ex3_match", ex3Sents.slice(0, 4)));
  for (let i = 0; i < 5; i++) {
    ex3Questions.push(makeWordBankQuestion(`u6l1ex3_wb_et_${i}`, ex3Sents[1 + i], "Cümlenin Türkçe karşılığını oluşturun:", true, ex3Sents));
  }
  for (let i = 0; i < 5; i++) {
    ex3Questions.push(makeWordBankQuestion(`u6l1ex3_wb_te_${i}`, ex3Sents[6 + i], "Translate to English:", false, ex3Sents));
  }
  for (let i = 0; i < 4; i++) {
    ex3Questions.push(makeMultipleChoiceQuestion(`u6l1ex3_mc_${i}`, ex3Sents[7 + i], `"${ex3Sents[7 + i].en}" ifadesinin Türkçe karşılığı hangisidir?`, true, ex3Sents));
  }
  exercises.push({
    id: "u6l1ex3",
    title: "Alıştırma 3: Yok Yapısı - Olumsuz Cümleler I",
    description: "There is no (1-11) - Eşleştirme, Kelime Bankası ve Sıralama",
    questions: ex3Questions
  });

  // Ex 4: Olumsuz Cümleler II (Nouns 12-22)
  const ex4Sents = unit6NegSentences.slice(11, 22);
  const ex4Questions = [];
  ex4Questions.push(makeMatchingQuestion("u6l1ex4_match", ex4Sents.slice(0, 4)));
  for (let i = 0; i < 5; i++) {
    ex4Questions.push(makeWordBankQuestion(`u6l1ex4_wb_et_${i}`, ex4Sents[1 + i], "Cümlenin Türkçe karşılığını oluşturun:", true, ex4Sents));
  }
  for (let i = 0; i < 5; i++) {
    ex4Questions.push(makeWordBankQuestion(`u6l1ex4_wb_te_${i}`, ex4Sents[6 + i], "Translate to English:", false, ex4Sents));
  }
  for (let i = 0; i < 4; i++) {
    ex4Questions.push(makeMultipleChoiceQuestion(`u6l1ex4_mc_${i}`, ex4Sents[7 + i], `"${ex4Sents[7 + i].en}" ifadesinin Türkçe karşılığı hangisidir?`, true, ex4Sents));
  }
  exercises.push({
    id: "u6l1ex4",
    title: "Alıştırma 4: Yok Yapısı - Olumsuz Cümleler II",
    description: "There is no (12-22) - Eşleştirme, Kelime Bankası ve Sıralama",
    questions: ex4Questions
  });

  // Ex 5: Karma Pratik - Boşluk Doldurma & Çoktan Seçmeli
  const ex5Questions = [];
  // 5 English Dropdowns
  ex5Questions.push(makeEnglishDropdownQuestion("u6l1ex5_ed_0", unit6AffSentences[0])); // examination
  ex5Questions.push(makeEnglishDropdownQuestion("u6l1ex5_ed_1", unit6AffSentences[7])); // improvement
  ex5Questions.push(makeEnglishDropdownQuestion("u6l1ex5_ed_2", unit6NegSentences[1])); // test
  ex5Questions.push(makeEnglishDropdownQuestion("u6l1ex5_ed_3", unit6NegSentences[8])); // theory
  ex5Questions.push(makeEnglishDropdownQuestion("u6l1ex5_ed_4", unit6AffSentences[12])); // vibration
  
  // 5 Turkish Dropdowns
  ex5Questions.push(makeTurkishDropdownQuestion("u6l1ex5_td_0", unit6AffSentences[3])); // tendency
  ex5Questions.push(makeTurkishDropdownQuestion("u6l1ex5_td_1", unit6AffSentences[10])); // wire
  ex5Questions.push(makeTurkishDropdownQuestion("u6l1ex5_td_2", unit6NegSentences[4])); // translation
  ex5Questions.push(makeTurkishDropdownQuestion("u6l1ex5_td_3", unit6NegSentences[11])); // vibration
  ex5Questions.push(makeTurkishDropdownQuestion("u6l1ex5_td_4", unit6AffSentences[15])); // suggestion

  // 5 Multiple Choices
  ex5Questions.push(makeMultipleChoiceQuestion("u6l1ex5_mc_0", unit6AffSentences[5], `"${unit6AffSentences[5].en}" ifadesinin Türkçe karşılığı hangisidir?`, true, allUnit6Sentences));
  ex5Questions.push(makeMultipleChoiceQuestion("u6l1ex5_mc_1", unit6NegSentences[6], `"${unit6NegSentences[6].en}" ifadesinin Türkçe karşılığı hangisidir?`, true, allUnit6Sentences));
  ex5Questions.push(makeMultipleChoiceQuestion("u6l1ex5_mc_2", unit6AffSentences[17], `"${unit6AffSentences[17].en}" ifadesinin Türkçe karşılığı hangisidir?`, true, allUnit6Sentences));
  ex5Questions.push(makeMultipleChoiceQuestion("u6l1ex5_mc_3", unit6NegSentences[19], `"${unit6NegSentences[19].en}" ifadesinin Türkçe karşılığı hangisidir?`, true, allUnit6Sentences));
  ex5Questions.push(makeMultipleChoiceQuestion("u6l1ex5_mc_4", unit6AffSentences[21], `"${unit6AffSentences[21].en}" ifadesinin Türkçe karşılığı hangisidir?`, true, allUnit6Sentences));

  exercises.push({
    id: "u6l1ex5",
    title: "Alıştırma 5: Karma Yapılar - Kelime Havuzu",
    description: "Seçmeli ve Boşluk Doldurma Alıştırmaları (15 Soru)",
    questions: ex5Questions
  });

  // Ex 6: Sıralama ve Eşleştirme Mücadelesi (Mixed hard)
  const ex6Questions = [];
  ex6Questions.push(makeMatchingQuestion("u6l1ex6_match", [
    unit6AffSentences[1],
    unit6NegSentences[3],
    unit6AffSentences[13],
    unit6NegSentences[16]
  ]));
  
  // 7 English to Turkish Word Bank
  ex6Questions.push(makeWordBankQuestion("u6l1ex6_wb_et_0", unit6AffSentences[2], "Cümlenin Türkçe karşılığını oluşturun:", true, allUnit6Sentences));
  ex6Questions.push(makeWordBankQuestion("u6l1ex6_wb_et_1", unit6NegSentences[5], "Cümlenin Türkçe karşılığını oluşturun:", true, allUnit6Sentences));
  ex6Questions.push(makeWordBankQuestion("u6l1ex6_wb_et_2", unit6AffSentences[9], "Cümlenin Türkçe karşılığını oluşturun:", true, allUnit6Sentences));
  ex6Questions.push(makeWordBankQuestion("u6l1ex6_wb_et_3", unit6NegSentences[12], "Cümlenin Türkçe karşılığını oluşturun:", true, allUnit6Sentences));
  ex6Questions.push(makeWordBankQuestion("u6l1ex6_wb_et_4", unit6AffSentences[14], "Cümlenin Türkçe karşılığını oluşturun:", true, allUnit6Sentences));
  ex6Questions.push(makeWordBankQuestion("u6l1ex6_wb_et_5", unit6NegSentences[18], "Cümlenin Türkçe karşılığını oluşturun:", true, allUnit6Sentences));
  ex6Questions.push(makeWordBankQuestion("u6l1ex6_wb_et_6", unit6AffSentences[20], "Cümlenin Türkçe karşılığını oluşturun:", true, allUnit6Sentences));

  // 7 Turkish to English Word Bank (Kelime Sıralama)
  ex6Questions.push(makeWordBankQuestion("u6l1ex6_wb_te_0", unit6NegSentences[2], "Translate to English:", false, allUnit6Sentences));
  ex6Questions.push(makeWordBankQuestion("u6l1ex6_wb_te_1", unit6AffSentences[6], "Translate to English:", false, allUnit6Sentences));
  ex6Questions.push(makeWordBankQuestion("u6l1ex6_wb_te_2", unit6NegSentences[9], "Translate to English:", false, allUnit6Sentences));
  ex6Questions.push(makeWordBankQuestion("u6l1ex6_wb_te_3", unit6AffSentences[11], "Translate to English:", false, allUnit6Sentences));
  ex6Questions.push(makeWordBankQuestion("u6l1ex6_wb_te_4", unit6NegSentences[15], "Translate to English:", false, allUnit6Sentences));
  ex6Questions.push(makeWordBankQuestion("u6l1ex6_wb_te_5", unit6AffSentences[18], "Translate to English:", false, allUnit6Sentences));
  ex6Questions.push(makeWordBankQuestion("u6l1ex6_wb_te_6", unit6NegSentences[21], "Translate to English:", false, allUnit6Sentences));

  exercises.push({
    id: "u6l1ex6",
    title: "Alıştırma 6: Kelime Sıralama ve Eşleştirme Mücadelesi",
    description: "Karışık Olumlu & Olumsuz Cümleler (15 Soru)",
    questions: ex6Questions
  });

  return exercises;
}

const unit6Lesson1SentencesRaw = [
  { en: "The analysis is a requirement.", tr: "Analiz bir gerekliliktir.", word: "requirement", trWord: "gereklilik", blank: "The analysis is a ___." },
  { en: "The policy is a guarantee.", tr: "Politika bir garantidir.", word: "guarantee", trWord: "garanti", blank: "The policy is a ___." },
  { en: "The experiment is a test.", tr: "Deney bir testtir.", word: "experiment", trWord: "deney", blank: "The ___ is a test." },
  { en: "The data are an indicator.", tr: "Veriler bir göstergedir.", word: "indicator", trWord: "gösterge", blank: "The data are an ___." },
  { en: "The framework is a structure.", tr: "Çerçeve bir yapıdır.", word: "structure", trWord: "yapı", blank: "The framework is a ___." },
  { en: "The theory is a concept.", tr: "Teori bir kavramdır.", word: "concept", trWord: "kavram", blank: "The theory is a ___." },
  { en: "The contract is a legal document.", tr: "Sözleşme yasal bir belgedir.", word: "contract", trWord: "sözleşme", blank: "The ___ is a legal document." },
  { en: "The method is a procedure.", tr: "Yöntem bir prosedürdür.", word: "procedure", trWord: "prosedür", blank: "The method is a ___." },
  { en: "The assessment is an evaluation.", tr: "Değerlendirme bir değerlendirmedir.", word: "assessment", trWord: "değerlendirme", blank: "The ___ is an evaluation." },
  { en: "The formula is a definition.", tr: "Formül bir tanımdır.", word: "definition", trWord: "tanım", blank: "The formula is a ___." },
  { en: "The sector is an area.", tr: "Sektör bir alandır.", word: "sector", trWord: "sektör", blank: "The ___ is an area." },
  { en: "The respondent is an individual.", tr: "Katılımcı bir bireydir.", word: "individual", trWord: "birey", blank: "The respondent is an ___." },
  { en: "The outcome is a benefit.", tr: "Sonuç bir faydadır.", word: "benefit", trWord: "fayda", blank: "The outcome is a ___." },
  { en: "The legislation is a principle.", tr: "Mevzuat bir ilkedir.", word: "legislation", trWord: "mevzuat", blank: "The ___ is a principle." },
  { en: "The summary is a text.", tr: "Özet bir metindir.", word: "summary", trWord: "özet", blank: "The summary is a ___." },
  { en: "The source is a journal.", tr: "Kaynak bir dergidir.", word: "journal", trWord: "dergi", blank: "The source is a ___." },
  { en: "The category is an element.", tr: "Kategori bir elementtir.", word: "element", trWord: "element", blank: "The category is an ___." },
  { en: "The institution is an authority.", tr: "Kurum bir otoritedir.", word: "authority", trWord: "otorite", blank: "The institution is an ___." },
  { en: "The revenue is an income.", tr: "Gelir bir gelirdir.", word: "revenue", trWord: "gelir", blank: "The ___ is an income." },
  { en: "The component is a factor.", tr: "Bileşen bir faktördür.", word: "component", trWord: "bileşen", blank: "The component is a ___." }
];

const unit6Lesson2SentencesRaw = [
  { en: "The ground is wet", tr: "Zemin ıslaktır", word: "wet", trWord: "ıslak", blank: "The ground is ___" },
  { en: "The cost is high", tr: "Maliyet yüksektir", word: "cost", trWord: "maliyet", blank: "The ___ is high" },
  { en: "The price is low", tr: "Fiyat düşüktür", word: "price", trWord: "fiyat", blank: "The ___ is low" },
  { en: "The answer is wrong", tr: "Cevap yanlıştır", word: "wrong", trWord: "yanlış", blank: "The answer is ___" },
  { en: "The explanation is long", tr: "Açıklama uzundur", word: "explanation", trWord: "açıklama", blank: "The ___ is long" },
  { en: "The machine is expensive", tr: "Makine pahalıdır", word: "expensive", trWord: "pahalı", blank: "The machine is ___" },
  { en: "The results are important", tr: "Sonuçlar önemlidir", word: "results", trWord: "sonuçlar", blank: "The ___ are important" },
  { en: "The expenses are high", tr: "Masraflar yüksektir", word: "expenses", trWord: "masraflar", blank: "The ___ are high" },
  { en: "The experiments are important", tr: "Deneyler önemlidir", word: "experiments", trWord: "deneyler", blank: "The ___ are important" },
  { en: "The substances are pure", tr: "Maddeler saftır", word: "pure", trWord: "saf", blank: "The substances are ___" },
  { en: "The substance is impure", tr: "Madde saf değildir", word: "impure", trWord: "saf değil", blank: "The substance is ___" },
  { en: "The results are favourable", tr: "Sonuçlar olumludur", word: "favourable", trWord: "olumlu", blank: "The results are ___" },
  { en: "The costs are low", tr: "Maliyetler düşüktür", word: "costs", trWord: "maliyetler", blank: "The ___ are low" },
  { en: "The reactions are slow", tr: "Tepkimeler yavaştır", word: "reactions", trWord: "tepkimeler", blank: "The ___ are slow" },
  { en: "Bacteria are present", tr: "Bakteriler mevcuttur", word: "present", trWord: "mevcut", blank: "Bacteria are ___" },
  { en: "Profits are high", tr: "Kazançlar yüksektir", word: "profits", trWord: "kazançlar", blank: "___ are high" }
];

const unit6Lesson3SentencesRaw = [
  { en: "The student is an English doctor", tr: "Öğrenci İngiliz bir doktordur", word: "English", trWord: "İngiliz", blank: "The student is an ___ doctor" },
  { en: "The man is a Turkish professor", tr: "Adam Türk bir profesördür", word: "Turkish", trWord: "Türk", blank: "The man is a ___ professor" },
  { en: "The building is a modern hospital", tr: "Bina modern bir hastanedir", word: "modern", trWord: "modern", blank: "The building is a ___ hospital" },
  { en: "The book is a French dictionary", tr: "Kitap Fransızca bir sözlüktür", word: "French", trWord: "Fransızca", blank: "The book is a ___ dictionary" },
  { en: "The woman is a good lawyer", tr: "Kadın iyi bir avukattır", word: "good", trWord: "iyi", blank: "The woman is a ___ lawyer" },
  { en: "The statement is an interesting confession", tr: "İfade ilginç bir itiraftır", word: "interesting", trWord: "ilginç", blank: "The statement is an ___ confession" },
  { en: "The paper is a reliable guarantee", tr: "Belge güvenilir bir garantidir", word: "reliable", trWord: "güvenilir", blank: "The paper is a ___ guarantee" },
  { en: "The experiment is a successful test", tr: "Deney başarılı bir testtir", word: "successful", trWord: "başarılı", blank: "The experiment is a ___ test" },
  { en: "The chapter is a short summary", tr: "Bölüm kısa bir özettir", word: "short", trWord: "kısa", blank: "The chapter is a ___ summary" },
  { en: "The lesson is an easy preparation", tr: "Ders kolay bir hazırlıktır", word: "easy", trWord: "kolay", blank: "The lesson is an ___ preparation" },
  { en: "The lesson is an interesting experiment", tr: "Ders ilginç bir deneydir", word: "experiment", trWord: "deney", blank: "The lesson is an interesting ___" },
  { en: "The method is a successful experiment", tr: "Yöntem başarılı bir deneydir", word: "method", trWord: "yöntem", blank: "The ___ is a successful experiment" },
  { en: "The experiment is an unexpected success", tr: "Deney beklenmedik bir başarıdır", word: "unexpected", trWord: "beklenmedik", blank: "The experiment is an ___ success" },
  { en: "Bacteria are living organisms", tr: "Bakteriler canlı organizmalardır", word: "living", trWord: "canlı", blank: "Bacteria are ___ organisms" },
  { en: "Gold is a precious metal", tr: "Altın değerli bir metaldir", word: "precious", trWord: "değerli", blank: "Gold is a ___ metal" },
  { en: "Oxygen is a non-metallic element", tr: "Oksijen metalik olmayan bir elementtir", word: "non-metallic", trWord: "metalik olmayan", blank: "Oxygen is a ___ element" }
];

const unit6Lesson4SentencesRaw = [
  { en: "The student is in the train", tr: "Öğrenci trendedir", word: "train", trWord: "tren", blank: "The student is in the ___" },
  { en: "The employer is at the office", tr: "İşveren ofistedir", word: "office", trWord: "ofis", blank: "The employer is at the ___" },
  { en: "The explanation is at the end", tr: "Açıklama sondadır", word: "end", trWord: "son", blank: "The explanation is at the ___" },
  { en: "The machine is in the factory", tr: "Makine fabrikadadır", word: "factory", trWord: "fabrika", blank: "Light is in the soil" }, // dummy blank, will replace with original
  { en: "The substance is in the test-tube", tr: "Madde deney tüpündedir", word: "test-tube", trWord: "deney tüpü", blank: "The substance is in the ___" },
  { en: "The answer is in the book", tr: "Cevap kitaptadır", word: "book", trWord: "kitap", blank: "The answer is in the ___" },
  { en: "The shop is on the corner", tr: "Dükkan köşededir", word: "corner", trWord: "köşe", blank: "The shop is on the ___" },
  { en: "The building is on the other side", tr: "Bina diğer taraftadır", word: "side", trWord: "taraf", blank: "The building is on the other ___" },
  { en: "The test-tube is on my table", tr: "Deney tüpü masamın üzerindedir", word: "table", trWord: "masa", blank: "The test-tube is on my ___" },
  { en: "The summary is at the end", tr: "Özet sondadır", word: "summary", trWord: "özet", blank: "The ___ is at the end" },
  { en: "The papers are on my table", tr: "Kağıtlar masamın üzerindedir", word: "papers", trWord: "kağıtlar", blank: "The ___ are on my table" },
  { en: "The buildings are in the centre", tr: "Binalar merkezdedir", word: "centre", trWord: "merkez", blank: "The buildings are in the ___" },
  { en: "The workers are in the factory", tr: "İşçiler fabrikadadır", word: "workers", trWord: "işçiler", blank: "The ___ are in the factory" },
  { en: "The factories are outside the town", tr: "Fabrikalar kasabanın dışındadır", word: "outside", trWord: "dışında", blank: "The factories are ___ the town" },
  { en: "The reports are from the employers", tr: "Raporlar işverenlerdendir", word: "employers", trWord: "işverenler", blank: "The reports are from the ___" },
  { en: "Lime is in the soil", tr: "Kireç topraktadır", word: "soil", trWord: "toprak", blank: "Lime is in the ___" }
];

// Correcting the blank for "The machine is in the factory" in unit6Lesson4SentencesRaw
unit6Lesson4SentencesRaw[3].blank = "The machine is in the ___";

function buildCustom15QuestionExercises(sentences, unitId, lessonId, exId, offset) {
  const qList = [];
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
  
  const slice = [];
  for (let i = 0; i < 15; i++) {
    const idx = (offset + i) % sentences.length;
    slice.push(sentences[idx]);
  }

  // 1. Matching (2 questions)
  qList.push({
    id: `u${unitId}l${lessonId}_ex${exId}_match1`,
    type: "matching",
    prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
    pairs: slice.slice(0, 4).map(s => ({
      left: s.trWord,
      right: s.word
    }))
  });

  qList.push({
    id: `u${unitId}l${lessonId}_ex${exId}_match2`,
    type: "matching",
    prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
    pairs: slice.slice(4, 8).map(s => ({
      left: s.trWord,
      right: s.word
    }))
  });

  const getMcDistractors = (s, isTr) => {
    const targetVal = isTr ? s.tr : s.en;
    const distractors = [];
    const verb = s.word;
    const trVerb = s.trWord;

    if (!isTr && verb && s.en.includes(verb)) {
      const parts = s.en.split(verb);
      if (parts.length === 2) {
        const subj = parts[0].trim();
        let obj = parts[1].trim();
        const hasPeriod = obj.endsWith(".");
        if (hasPeriod) obj = obj.slice(0, -1).trim();

        // 1. Swap Subject and Object (Semantic Reversal)
        const cap = str => str.charAt(0).toUpperCase() + str.slice(1);
        const decap = str => str.charAt(0).toLowerCase() + str.slice(1);
        if (subj.toLowerCase() !== obj.toLowerCase()) {
          const swapped = cap(obj) + " " + verb + " " + decap(subj) + (hasPeriod ? "." : "");
          if (swapped !== s.en && !distractors.includes(swapped)) {
            distractors.push(swapped);
          }
        }

        // 2. Alter word order of Subject if complex (length >= 3 words)
        const subjWords = subj.split(/\s+/);
        if (subjWords.length >= 3) {
          const idx = subjWords.length > 3 ? 2 : 1;
          const temp = subjWords[idx];
          subjWords[idx] = subjWords[idx+1];
          subjWords[idx+1] = temp;
          const alteredSubj = subjWords.join(" ");
          const distVal = alteredSubj + " " + verb + " " + obj + (hasPeriod ? "." : "");
          if (distVal !== s.en && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }

        // 3. Alter word order of Object if complex
        const objWords = obj.split(/\s+/);
        if (objWords.length >= 3) {
          const idx = objWords.length > 3 ? 2 : 1;
          const temp = objWords[idx];
          objWords[idx] = objWords[idx+1];
          objWords[idx+1] = temp;
          const alteredObj = objWords.join(" ");
          const distVal = subj + " " + verb + " " + alteredObj + (hasPeriod ? "." : "");
          if (distVal !== s.en && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }
      }
    }

    if (isTr && trVerb && s.tr.includes(trVerb)) {
      const parts = s.tr.split(trVerb);
      if (parts.length === 2) {
        const prefix = parts[0].trim();
        const suffix = parts[1].trim();
        const words = prefix.split(/\s+/);
        if (words.length >= 3) {
          const temp = words[1];
          words[1] = words[2];
          words[2] = temp;
          const alteredPrefix = words.join(" ");
          const distVal = alteredPrefix + " " + trVerb + (suffix ? " " + suffix : "");
          if (distVal !== s.tr && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }
        if (words.length >= 4) {
          const words2 = prefix.split(/\s+/);
          const temp = words2[2];
          words2[2] = words2[3];
          words2[3] = temp;
          const alteredPrefix = words2.join(" ");
          const distVal = alteredPrefix + " " + trVerb + (suffix ? " " + suffix : "");
          if (distVal !== s.tr && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }
      }
    }

    // 4. Fill remaining spots with Verb Substitution
    const others = sentences.filter(o => o.word !== s.word && o.trWord !== s.trWord);
    const shuffledOthers = shuffle(others);
    for (let i = 0; i < shuffledOthers.length; i++) {
      if (distractors.length >= 3) break;
      const other = shuffledOthers[i];
      if (isTr) {
        if (s.trWord && other.trWord && s.tr.includes(s.trWord)) {
          const distVal = s.tr.replace(s.trWord, other.trWord);
          if (distVal !== s.tr && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }
      } else {
        if (s.word && other.word && s.en.includes(s.word)) {
          const distVal = s.en.replace(s.word, other.word);
          if (distVal !== s.en && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }
      }
    }

    // 5. Fallback
    if (distractors.length < 3) {
      const list = sentences.filter(item => (isTr ? item.tr : item.en) !== targetVal).map(item => isTr ? item.tr : item.en);
      const shuffled = shuffle([...new Set(list)]);
      for (const val of shuffled) {
        if (!distractors.includes(val)) {
          distractors.push(val);
        }
        if (distractors.length >= 3) break;
      }
    }

    while (distractors.length < 3) {
      distractors.push(isTr ? "deneme" : "test");
    }

    return distractors.slice(0, 3);
  };

  const getWbDistractors = (targetWords, isTr) => {
    const list = sentences.map(s => (isTr ? s.tr : s.en).split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,""))).flat();
    const unique = [...new Set(list)].filter(w => !targetWords.includes(w));
    const shuffled = shuffle(unique);
    while (shuffled.length < 3) {
      shuffled.push(isTr ? "ve" : "the");
    }
    return shuffled.slice(0, 3);
  };

  // 2. Multiple Choice (4 questions)
  {
    const s = slice[8];
    const dist = getMcDistractors(s, true);
    const options = shuffle([s.tr, ...dist]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_mc_0`,
      type: "multiple-choice",
      prompt: `"${s.en}" cümlesinin Türkçe karşılığı hangisidir?`,
      options: options,
      correctIndex: options.indexOf(s.tr),
      enSentence: s.en,
      isEngToTr: true
    });
  }
  {
    const s = slice[9];
    const dist = getMcDistractors(s, true);
    const options = shuffle([s.tr, ...dist]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_mc_1`,
      type: "multiple-choice",
      prompt: `"${s.en}" cümlesinin Türkçe karşılığı hangisidir?`,
      options: options,
      correctIndex: options.indexOf(s.tr),
      enSentence: s.en,
      isEngToTr: true
    });
  }
  {
    const s = slice[10];
    const dist = getMcDistractors(s, false);
    const options = shuffle([s.en, ...dist]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_mc_2`,
      type: "multiple-choice",
      prompt: `"${s.tr}" cümlesinin İngilizce karşılığı hangisidir?`,
      options: options,
      correctIndex: options.indexOf(s.en),
      enSentence: s.en,
      isEngToTr: false
    });
  }
  {
    const s = slice[11];
    const dist = getMcDistractors(s, false);
    const options = shuffle([s.en, ...dist]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_mc_3`,
      type: "multiple-choice",
      prompt: `"${s.tr}" cümlesinin İngilizce karşılığı hangisidir?`,
      options: options,
      correctIndex: options.indexOf(s.en),
      enSentence: s.en,
      isEngToTr: false
    });
  }

  // 3. Word Bank (5 questions)
  {
    const s = slice[0];
    const targetWords = s.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,""));
    const dist = getWbDistractors(targetWords, true);
    const words = shuffle([...targetWords, ...dist]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_0`,
      type: "word-bank",
      prompt: "Cümlenin Türkçe karşılığını oluşturun:",
      translation: s.en,
      words: words,
      correctOrder: targetWords,
      enSentence: s.en,
      isEngToTr: true
    });
  }
  {
    const s = slice[1];
    const targetWords = s.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,""));
    const dist = getWbDistractors(targetWords, true);
    const words = shuffle([...targetWords, ...dist]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_1`,
      type: "word-bank",
      prompt: "Cümlenin Türkçe karşılığını oluşturun:",
      translation: s.en,
      words: words,
      correctOrder: targetWords,
      enSentence: s.en,
      isEngToTr: true
    });
  }
  {
    const s = slice[2];
    const targetWords = s.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,""));
    const dist = getWbDistractors(targetWords, true);
    const words = shuffle([...targetWords, ...dist]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_2`,
      type: "word-bank",
      prompt: "Cümlenin Türkçe karşılığını oluşturun:",
      translation: s.en,
      words: words,
      correctOrder: targetWords,
      enSentence: s.en,
      isEngToTr: true
    });
  }
  {
    const s = slice[3];
    const targetWords = s.en.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,""));
    const dist = getWbDistractors(targetWords, false);
    const words = shuffle([...targetWords, ...dist]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_3`,
      type: "word-bank",
      prompt: "Cümlenin İngilizce karşılığını oluşturun:",
      translation: s.tr,
      words: words,
      correctOrder: targetWords,
      enSentence: s.en,
      isEngToTr: false
    });
  }
  {
    const s = slice[4];
    const targetWords = s.en.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,""));
    const dist = getWbDistractors(targetWords, false);
    const words = shuffle([...targetWords, ...dist]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_4`,
      type: "word-bank",
      prompt: "Cümlenin İngilizce karşılığını oluşturun:",
      translation: s.tr,
      words: words,
      correctOrder: targetWords,
      enSentence: s.en,
      isEngToTr: false
    });
  }

  // 4. Translation Text (4 questions)
  {
    const s = slice[12];
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_tx_0`,
      type: "translation-text",
      prompt: `"${s.en}" ifadesini Türkçe'ye çevirin:`,
      correctSentence: s.tr,
      enSentence: s.en,
      isEngToTr: true
    });
  }
  {
    const s = slice[13];
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_tx_1`,
      type: "translation-text",
      prompt: `"${s.en}" ifadesini Türkçe'ye çevirin:`,
      correctSentence: s.tr,
      enSentence: s.en,
      isEngToTr: true
    });
  }
  {
    const s = slice[14];
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_tx_2`,
      type: "translation-text",
      prompt: `"${s.tr}" ifadesini İngilizce'ye çevirin:`,
      correctSentence: s.en,
      enSentence: s.en,
      isEngToTr: false
    });
  }
  {
    const s = slice[5];
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_tx_3`,
      type: "translation-text",
      prompt: `"${s.tr}" ifadesini İngilizce'ye çevirin:`,
      correctSentence: s.en,
      enSentence: s.en,
      isEngToTr: false
    });
  }

  return {
    id: `u${unitId}l${lessonId}ex${exId}`,
    title: `Alıştırma ${exId}: Yapı Çalışması`,
    description: `Eşleştirme, Seçmeli, Sıralama ve Çeviri Paketleri (${offset + 1}-${offset + 15})`,
    questions: qList
  };
}

function buildCustom10QuestionExercises(sentences, unitId, lessonId, exId, offset) {
  const qList = [];
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
  
  const slice = [];
  for (let i = 0; i < 10; i++) {
    const idx = (offset + i) % sentences.length;
    slice.push(sentences[idx]);
  }

  // 1. Matching (2 questions)
  qList.push({
    id: `u${unitId}l${lessonId}_ex${exId}_match1`,
    type: "matching",
    prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
    pairs: slice.slice(0, 4).map(s => ({
      left: s.trWord,
      right: s.word
    }))
  });

  qList.push({
    id: `u${unitId}l${lessonId}_ex${exId}_match2`,
    type: "matching",
    prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
    pairs: slice.slice(4, 8).map(s => ({
      left: s.trWord,
      right: s.word
    }))
  });

  const getMcDistractors = (s, isTr) => {
    const targetVal = isTr ? s.tr : s.en;
    const distractors = [];
    const verb = s.word;
    const trVerb = s.trWord;

    if (!isTr && verb && s.en.includes(verb)) {
      const parts = s.en.split(verb);
      if (parts.length === 2) {
        const subj = parts[0].trim();
        let obj = parts[1].trim();
        const hasPeriod = obj.endsWith(".");
        if (hasPeriod) obj = obj.slice(0, -1).trim();

        // 1. Swap Subject and Object (Semantic Reversal)
        const cap = str => str.charAt(0).toUpperCase() + str.slice(1);
        const decap = str => str.charAt(0).toLowerCase() + str.slice(1);
        if (subj.toLowerCase() !== obj.toLowerCase()) {
          const swapped = cap(obj) + " " + verb + " " + decap(subj) + (hasPeriod ? "." : "");
          if (swapped !== s.en && !distractors.includes(swapped)) {
            distractors.push(swapped);
          }
        }

        // 2. Alter word order of Subject if complex (length >= 3 words)
        const subjWords = subj.split(/\s+/);
        if (subjWords.length >= 3) {
          const idx = subjWords.length > 3 ? 2 : 1;
          const temp = subjWords[idx];
          subjWords[idx] = subjWords[idx+1];
          subjWords[idx+1] = temp;
          const alteredSubj = subjWords.join(" ");
          const distVal = alteredSubj + " " + verb + " " + obj + (hasPeriod ? "." : "");
          if (distVal !== s.en && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }

        // 3. Alter word order of Object if complex
        const objWords = obj.split(/\s+/);
        if (objWords.length >= 3) {
          const idx = objWords.length > 3 ? 2 : 1;
          const temp = objWords[idx];
          objWords[idx] = objWords[idx+1];
          objWords[idx+1] = temp;
          const alteredObj = objWords.join(" ");
          const distVal = subj + " " + verb + " " + alteredObj + (hasPeriod ? "." : "");
          if (distVal !== s.en && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }
      }
    }

    if (isTr && trVerb && s.tr.includes(trVerb)) {
      const parts = s.tr.split(trVerb);
      if (parts.length === 2) {
        const prefix = parts[0].trim();
        const suffix = parts[1].trim();
        const words = prefix.split(/\s+/);
        if (words.length >= 3) {
          const temp = words[1];
          words[1] = words[2];
          words[2] = temp;
          const alteredPrefix = words.join(" ");
          const distVal = alteredPrefix + " " + trVerb + (suffix ? " " + suffix : "");
          if (distVal !== s.tr && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }
        if (words.length >= 4) {
          const words2 = prefix.split(/\s+/);
          const temp = words2[2];
          words2[2] = words2[3];
          words2[3] = temp;
          const alteredPrefix = words2.join(" ");
          const distVal = alteredPrefix + " " + trVerb + (suffix ? " " + suffix : "");
          if (distVal !== s.tr && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }
      }
    }

    // 4. Fill remaining spots with Verb Substitution
    const others = sentences.filter(o => o.word !== s.word && o.trWord !== s.trWord);
    const shuffledOthers = shuffle(others);
    for (let i = 0; i < shuffledOthers.length; i++) {
      if (distractors.length >= 3) break;
      const other = shuffledOthers[i];
      if (isTr) {
        if (s.trWord && other.trWord && s.tr.includes(s.trWord)) {
          const distVal = s.tr.replace(s.trWord, other.trWord);
          if (distVal !== s.tr && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }
      } else {
        if (s.word && other.word && s.en.includes(s.word)) {
          const distVal = s.en.replace(s.word, other.word);
          if (distVal !== s.en && !distractors.includes(distVal)) {
            distractors.push(distVal);
          }
        }
      }
    }

    // 5. Fallback
    if (distractors.length < 3) {
      const list = sentences.filter(item => (isTr ? item.tr : item.en) !== targetVal).map(item => isTr ? item.tr : item.en);
      const shuffled = shuffle([...new Set(list)]);
      for (const val of shuffled) {
        if (!distractors.includes(val)) {
          distractors.push(val);
        }
        if (distractors.length >= 3) break;
      }
    }

    while (distractors.length < 3) {
      distractors.push(isTr ? "deneme" : "test");
    }

    return distractors.slice(0, 3);
  };

  const getWbDistractors = (targetWords, isTr) => {
    const list = sentences.map(s => (isTr ? s.tr : s.en).split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,""))).flat();
    const unique = [...new Set(list)].filter(w => !targetWords.includes(w));
    const shuffled = shuffle(unique);
    while (shuffled.length < 3) {
      shuffled.push(isTr ? "ve" : "the");
    }
    return shuffled.slice(0, 3);
  };

  // 2. Multiple Choice (2 questions)
  {
    const s = slice[8];
    const dist = getMcDistractors(s, true);
    const options = shuffle([s.tr, ...dist]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_mc_0`,
      type: "multiple-choice",
      prompt: `"${s.en}" cümlesinin Türkçe karşılığı hangisidir?`,
      options: options,
      correctIndex: options.indexOf(s.tr),
      enSentence: s.en,
      isEngToTr: true
    });
  }
  {
    const s = slice[9];
    const dist = getMcDistractors(s, false);
    const options = shuffle([s.en, ...dist]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_mc_1`,
      type: "multiple-choice",
      prompt: `"${s.tr}" cümlesinin İngilizce karşılığı hangisidir?`,
      options: options,
      correctIndex: options.indexOf(s.en),
      enSentence: s.en,
      isEngToTr: false
    });
  }

  // 3. Word Bank (3 questions)
  {
    const s = slice[0];
    const targetWords = s.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,""));
    const dist = getWbDistractors(targetWords, true);
    const words = shuffle([...targetWords, ...dist]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_0`,
      type: "word-bank",
      prompt: "Cümlenin Türkçe karşılığını oluşturun:",
      translation: s.en,
      words: words,
      correctOrder: targetWords,
      enSentence: s.en,
      isEngToTr: true
    });
  }
  {
    const s = slice[1];
    const targetWords = s.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,""));
    const dist = getWbDistractors(targetWords, true);
    const words = shuffle([...targetWords, ...dist]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_1`,
      type: "word-bank",
      prompt: "Cümlenin Türkçe karşılığını oluşturun:",
      translation: s.en,
      words: words,
      correctOrder: targetWords,
      enSentence: s.en,
      isEngToTr: true
    });
  }
  {
    const s = slice[2];
    const targetWords = s.en.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,""));
    const dist = getWbDistractors(targetWords, false);
    const words = shuffle([...targetWords, ...dist]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_2`,
      type: "word-bank",
      prompt: "Cümlenin İngilizce karşılığını oluşturun:",
      translation: s.tr,
      words: words,
      correctOrder: targetWords,
      enSentence: s.en,
      isEngToTr: false
    });
  }

  // 4. Translation Text (3 questions)
  {
    const s = slice[3];
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_tx_0`,
      type: "translation-text",
      prompt: `"${s.en}" ifadesini Türkçe'ye çevirin:`,
      correctSentence: s.tr,
      enSentence: s.en,
      isEngToTr: true
    });
  }
  {
    const s = slice[4];
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_tx_1`,
      type: "translation-text",
      prompt: `"${s.en}" ifadesini Türkçe'ye çevirin:`,
      correctSentence: s.tr,
      enSentence: s.en,
      isEngToTr: true
    });
  }
  {
    const s = slice[5];
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_tx_2`,
      type: "translation-text",
      prompt: `"${s.tr}" ifadesini İngilizce'ye çevirin:`,
      correctSentence: s.en,
      enSentence: s.en,
      isEngToTr: false
    });
  }

  return {
    id: `u${unitId}l${lessonId}ex${exId}`,
    title: `Alıştırma ${exId}: Yapı Çalışması`,
    description: `Eşleştirme, Seçmeli, Sıralama ve Çeviri Paketleri (${offset + 1}-${offset + 10})`,
    questions: qList
  };
}

function buildSplitPassiveExercises(sentences, unitId, lessonId, exId, offset) {
  const qList = [];
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
  
  const slice = [];
  for (let i = 0; i < 10; i++) {
    const idx = (offset + i) % sentences.length;
    slice.push(sentences[idx]);
  }

  // 1. Spot the Split Adverb (3 questions)
  for (let i = 0; i < 3; i++) {
    const s = slice[i];
    const correctVal = s.adverb;
    const words = s.en.replace(/[.]/g, "").split(/\s+/);
    const distractorWord = words.find(w => w.toLowerCase() !== s.adverb.toLowerCase() && 
                                           w.toLowerCase() !== s.verb.toLowerCase() && 
                                           !s.aux.toLowerCase().includes(w.toLowerCase())) || words[0];
                                           
    const options = shuffle([s.adverb, s.aux, s.verb, distractorWord]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_spot_${i}`,
      type: "multiple-choice",
      prompt: `Aşağıdaki kelimelerden hangisi edilgen fiili bölen bir zarftır?<br><br><strong class="highlight-sentence">${s.en}</strong>`,
      options: options,
      correctIndex: options.indexOf(correctVal),
      enSentence: s.en,
      isEngToTr: false
    });
  }

  // 2. Adverb Distractor (4 questions)
  for (let i = 0; i < 4; i++) {
    const s = slice[3 + i];
    const correctVal = s.tr;
    const dists = s.adverbDistractorsTr.map(wrongAdv => {
      return s.tr.replace(s.adverbTr, wrongAdv);
    });
    const options = shuffle([correctVal, ...dists]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_dist_${i}`,
      type: "multiple-choice",
      prompt: `"${s.en}" cümlesinin doğru Türkçe karşılığı hangisidir?`,
      options: options,
      correctIndex: options.indexOf(correctVal),
      enSentence: s.en,
      isEngToTr: true
    });
  }

  // 3. Adverb Placement Test (3 questions)
  for (let i = 0; i < 3; i++) {
    const s = slice[7 + i];
    const options = shuffle([s.adverb, s.adjective, s.noun, s.spellingDistractor]);
    const blankSentence = s.en.replace(s.adverb, "[ ____ ]");
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_placement_${i}`,
      type: "multiple-choice",
      prompt: `Zarfı doğru konuma yerleştirerek cümleyi tamamlayın:<br><br><strong class="highlight-sentence">${blankSentence}</strong>`,
      options: options,
      correctIndex: options.indexOf(s.adverb),
      enSentence: s.en,
      isEngToTr: false
    });
  }

  return {
    id: `u${unitId}l${lessonId}ex${exId}`,
    title: `Alıştırma ${exId}: Bölünmüş Edilgen Çalışması`,
    description: `Araya Giren Zarfı Sökme, Anlam Kayması ve Zarf Pozisyonu Testleri (${offset + 1}-${offset + 10})`,
    questions: qList
  };
}

const unit1LessonSentences = {
  1: {
    exercises: buildUnit6Lesson1Exercises()
  },
  2: [ // Ders 2: Özne + Olmak Fiili + Sıfat (Subject + Be + Adjective)
    { en: "The ground is wet", tr: "Zemin ıslaktır", word: "wet", trWord: "ıslak", blank: "The ground is ___" },
    { en: "The cost is high", tr: "Maliyet yüksektir", word: "cost", trWord: "maliyet", blank: "The ___ is high" },
    { en: "The price is low", tr: "Fiyat düşüktür", word: "price", trWord: "fiyat", blank: "The ___ is low" },
    { en: "The answer is wrong", tr: "Cevap yanlıştır", word: "wrong", trWord: "yanlış", blank: "The answer is ___" },
    { en: "The explanation is long", tr: "Açıklama uzundur", word: "explanation", trWord: "açıklama", blank: "The ___ is long" },
    { en: "The machine is expensive", tr: "Makine pahalıdır", word: "expensive", trWord: "pahalı", blank: "The machine is ___" },
    { en: "The results are important", tr: "Sonuçlar önemlidir", word: "results", trWord: "sonuçlar", blank: "The ___ are important" },
    { en: "The expenses are high", tr: "Masraflar yüksektir", word: "expenses", trWord: "masraflar", blank: "The ___ are high" },
    { en: "The experiments are important", tr: "Deneyler önemlidir", word: "experiments", trWord: "deneyler", blank: "The ___ are important" },
    { en: "The substances are pure", tr: "Maddeler saftır", word: "pure", trWord: "saf", blank: "The substances are ___" },
    { en: "The substance is impure", tr: "Madde saf değildir", word: "impure", trWord: "saf değil", blank: "The substance is ___" },
    { en: "The results are favourable", tr: "Sonuçlar olumludur", word: "favourable", trWord: "olumlu", blank: "The results are ___" },
    { en: "The costs are low", tr: "Maliyetler düşüktür", word: "costs", trWord: "maliyetler", blank: "The ___ are low" },
    { en: "The reactions are slow", tr: "Tepkimeler yavaştır", word: "reactions", trWord: "tepkimeler", blank: "The ___ are slow" },
    { en: "Bacteria are present", tr: "Bakteriler mevcuttur", word: "present", trWord: "mevcut", blank: "Bacteria are ___" },
    { en: "Profits are high", tr: "Kazançlar yüksektir", word: "profits", trWord: "kazançlar", blank: "___ are high" }
  ],
  3: [ // Ders 3: Özne + Olmak Fiili + Sıfat + İsim (Subject + Be + Adjective + Noun)
    { en: "The student is an English doctor", tr: "Öğrenci İngiliz bir doktordur", word: "English", trWord: "İngiliz", blank: "The student is an ___ doctor" },
    { en: "The man is a Turkish professor", tr: "Adam Türk bir profesördür", word: "Turkish", trWord: "Türk", blank: "The man is a ___ professor" },
    { en: "The building is a modern hospital", tr: "Bina modern bir hastanedir", word: "modern", trWord: "modern", blank: "The building is a ___ hospital" },
    { en: "The book is a French dictionary", tr: "Kitap Fransızca bir sözlüktür", word: "French", trWord: "Fransızca", blank: "The book is a ___ dictionary" },
    { en: "The woman is a good lawyer", tr: "Kadın iyi bir avukattır", word: "good", trWord: "iyi", blank: "The woman is a ___ lawyer" },
    { en: "The statement is an interesting confession", tr: "İfade ilginç bir itiraftır", word: "interesting", trWord: "ilginç", blank: "The statement is an ___ confession" },
    { en: "The paper is a reliable guarantee", tr: "Belge güvenilir bir garantidir", word: "reliable", trWord: "güvenilir", blank: "The paper is a ___ guarantee" },
    { en: "The experiment is a successful test", tr: "Deney başarılı bir testtir", word: "successful", trWord: "başarılı", blank: "The experiment is a ___ test" },
    { en: "The chapter is a short summary", tr: "Bölüm kısa bir özettir", word: "short", trWord: "kısa", blank: "The chapter is a ___ summary" },
    { en: "The lesson is an easy preparation", tr: "Ders kolay bir hazırlıktır", word: "easy", trWord: "kolay", blank: "The lesson is an ___ preparation" },
    { en: "The lesson is an interesting experiment", tr: "Ders ilginç bir deneydir", word: "experiment", trWord: "deney", blank: "The lesson is an interesting ___" },
    { en: "The method is a successful experiment", tr: "Yöntem başarılı bir deneydir", word: "method", trWord: "yöntem", blank: "The ___ is a successful experiment" },
    { en: "The experiment is an unexpected success", tr: "Deney beklenmedik bir başarıdır", word: "unexpected", trWord: "beklenmedik", blank: "The experiment is an ___ success" },
    { en: "Bacteria are living organisms", tr: "Bakteriler canlı organizmalardır", word: "living", trWord: "canlı", blank: "Bacteria are ___ organisms" },
    { en: "Gold is a precious metal", tr: "Altın değerli bir metaldir", word: "precious", trWord: "değerli", blank: "Gold is a ___ metal" },
    { en: "Oxygen is a non-metallic element", tr: "Oksijen metalik olmayan bir elementtir", word: "non-metallic", trWord: "metalik olmayan", blank: "Oxygen is a ___ element" }
  ],
  4: [ // Ders 4: Özne + Olmak Fiili + Edat Takımı (Subject + Be + Prepositional Phrase)
    { en: "The student is in the train", tr: "Öğrenci trendedir", word: "train", trWord: "tren", blank: "The student is in the ___" },
    { en: "The employer is at the office", tr: "İşveren ofistedir", word: "office", trWord: "ofis", blank: "The employer is at the ___" },
    { en: "The explanation is at the end", tr: "Açıklama sondadır", word: "end", trWord: "son", blank: "The explanation is at the ___" },
    { en: "The machine is in the factory", tr: "Makine fabrikadadır", word: "factory", trWord: "fabrika", blank: "The machine is in the ___" },
    { en: "The substance is in the test-tube", tr: "Madde deney tüpündedir", word: "test-tube", trWord: "deney tüpü", blank: "The substance is in the ___" },
    { en: "The answer is in the book", tr: "Cevap kitaptadır", word: "book", trWord: "kitap", blank: "The answer is in the ___" },
    { en: "The shop is on the corner", tr: "Dükkan köşededir", word: "corner", trWord: "köşe", blank: "The shop is on the ___" },
    { en: "The building is on the other side", tr: "Bina diğer taraftadır", word: "side", trWord: "taraf", blank: "The building is on the other ___" },
    { en: "The test-tube is on my table", tr: "Deney tüpü masamın üzerindedir", word: "table", trWord: "masa", blank: "The test-tube is on my ___" },
    { en: "The summary is at the end", tr: "Özet sondadır", word: "summary", trWord: "özet", blank: "The ___ is at the end" },
    { en: "The papers are on my table", tr: "Kağıtlar masamın üzerindedir", word: "papers", trWord: "kağıtlar", blank: "The ___ are on my table" },
    { en: "The buildings are in the centre", tr: "Binalar merkezdedir", word: "centre", trWord: "merkez", blank: "The buildings are in the ___" },
    { en: "The workers are in the factory", tr: "İşçiler fabrikadadır", word: "workers", trWord: "işçiler", blank: "The ___ are in the factory" },
    { en: "The factories are outside the town", tr: "Fabrikalar kasabanın dışındadır", word: "outside", trWord: "dışında", blank: "The factories are ___ the town" },
    { en: "The reports are from the employers", tr: "Raporlar işverenlerdendir", word: "employers", trWord: "işverenler", blank: "The reports are from the ___" },
    { en: "Lime is in the soil", tr: "Kireç topraktadır", word: "soil", trWord: "toprak", blank: "Lime is in the ___" }
  ]
};

const unit2LessonSentences = {
  1: [ // Ders 1: Sıfat + İsim (Adjective + Noun)
    { en: "Analytical data", tr: "Analitik veri", word: "Analytical", trWord: "Analitik", blank: "___ data" },
    { en: "Methodical research", tr: "Yöntemli araştırma", word: "Methodical", trWord: "Yöntemli", blank: "___ research" },
    { en: "Domestic policy", tr: "İç politika", word: "Domestic", trWord: "İç", blank: "___ policy" },
    { en: "Financial investment", tr: "Finansal yatırım", word: "Financial", trWord: "Finansal", blank: "___ investment" },
    { en: "Environmental factor", tr: "Çevresel faktör", word: "Environmental", trWord: "Çevresel", blank: "___ factor" },
    { en: "Temporary period", tr: "Geçici dönem", word: "Temporary", trWord: "Geçici", blank: "___ period" },
    { en: "Structural design", tr: "Yapısal tasarım", word: "Structural", trWord: "Yapısal", blank: "___ design" },
    { en: "Alternative source", tr: "Alternatif kaynak", word: "Alternative", trWord: "Alternatif", blank: "___ source" },
    { en: "Legal authority", tr: "Yasal otorite", word: "Legal", trWord: "Yasal", blank: "___ authority" },
    { en: "Global market", tr: "Küresel pazar", word: "Global", trWord: "Küresel", blank: "___ market" },
    { en: "Individual role", tr: "Bireysel rol", word: "Individual", trWord: "Bireysel", blank: "___ role" },
    { en: "Dynamic energy", tr: "Dinamik enerji", word: "Dynamic", trWord: "Dinamik", blank: "___ energy" },
    { en: "Complex network", tr: "Karmaşık ağ", word: "Complex", trWord: "Karmaşık", blank: "___ network" },
    { en: "Stable regime", tr: "İstikrarlı rejim", word: "Stable", trWord: "İstikrarlı", blank: "___ regime" },
    { en: "Primary focus", tr: "Birincil odak", word: "Primary", trWord: "Birincil", blank: "___ focus" },
    { en: "Explicit definition", tr: "Açık tanım", word: "Explicit", trWord: "Açık", blank: "___ definition" }
  ],
  2: [ // Ders 2: İsim + İsim (Noun + Noun)
    { en: "Income distribution", tr: "Gelir dağılımı", word: "distribution", trWord: "dağılımı", blank: "Income ___" },
    { en: "Resource allocation", tr: "Kaynak tahsisi", word: "allocation", trWord: "tahsisi", blank: "Resource ___" },
    { en: "Core concept", tr: "Temel kavram", word: "concept", trWord: "kavram", blank: "Core ___" },
    { en: "Logic error", tr: "Mantık hatası", word: "error", trWord: "hatası", blank: "Logic ___" },
    { en: "Data analysis", tr: "Veri analizi", word: "analysis", trWord: "analizi", blank: "Data ___" },
    { en: "Energy source", tr: "Enerji kaynağı", word: "source", trWord: "kaynağı", blank: "Energy ___" },
    { en: "Policy design", tr: "Politika tasarımı", word: "design", trWord: "tasarımı", blank: "Policy ___" },
    { en: "Investment policy", tr: "Yatırım politikası", word: "policy", trWord: "politikası", blank: "Investment ___" },
    { en: "Research design", tr: "Araştırma tasarımı", word: "design", trWord: "tasarımı", blank: "Research ___" },
    { en: "Concept definition", tr: "Kavram tanımı", word: "definition", trWord: "tanımı", blank: "Concept ___" },
    { en: "Resource distribution", tr: "Kaynak dağılımı", word: "distribution", trWord: "dağılımı", blank: "Resource ___" },
    { en: "Data network", tr: "Veri ağı", word: "network", trWord: "ağı", blank: "Data ___" },
    { en: "Market trend", tr: "Pazar eğilimi", word: "trend", trWord: "eğilimi", blank: "Market ___" },
    { en: "Power network", tr: "Güç şebekesi", word: "network", trWord: "şebekesi", blank: "Power ___" },
    { en: "Policy evaluation", tr: "Politika değerlendirmesi", word: "evaluation", trWord: "değerlendirmesi", blank: "Policy ___" },
    { en: "Regime change", tr: "Rejim değişikliği", word: "change", trWord: "değişikliği", blank: "Regime ___" }
  ],
  3: [ // Ders 3: Faculty of Forestry / Forestry Faculty Kalıbı
    { en: "Distribution of income", tr: "Gelirin dağılımı", word: "Distribution", trWord: "dağılımı", blank: "___ of income" },
    { en: "Allocation of resources", tr: "Kaynakların tahsisi", word: "Allocation", trWord: "tahsisi", blank: "___ of resources" },
    { en: "Definition of concept", tr: "Kavramın tanımı", word: "Definition", trWord: "tanımı", blank: "___ of concept" },
    { en: "Analysis of data", tr: "Verinin analizi", word: "Analysis", trWord: "analizi", blank: "___ of data" },
    { en: "Design of structure", tr: "Yapının tasarımı", word: "Design", trWord: "tasarımı", blank: "___ of structure" },
    { en: "Source of energy", tr: "Enerjinin kaynağı", word: "Source", trWord: "kaynağı", blank: "___ of energy" },
    { en: "Authority of law", tr: "Yasanın otoritesi", word: "Authority", trWord: "otoritesi", blank: "___ of law" },
    { en: "Error of logic", tr: "Mantığın hatası", word: "Error", trWord: "hatası", blank: "___ of logic" },
    { en: "Focus of policy", tr: "Politikanın odağı", word: "Focus", trWord: "odağı", blank: "___ of policy" },
    { en: "Role of individual", tr: "Bireyin rolü", word: "Role", trWord: "rolü", blank: "___ of individual" },
    { en: "Network of computers", tr: "Bilgisayarların ağı", word: "Network", trWord: "ağı", blank: "___ of computers" },
    { en: "Regulation of market", tr: "Pazarın düzenlenmesi", word: "Regulation", trWord: "düzenlenmesi", blank: "___ of market" },
    { en: "Evaluation of project", tr: "Projenin değerlendirilmesi", word: "Evaluation", trWord: "değerlendirilmesi", blank: "___ of project" },
    { en: "Period of transition", tr: "Geçişin dönemi", word: "Period", trWord: "dönemi", blank: "___ of transition" },
    { en: "Source of finance", tr: "Finansın kaynağı", word: "Source", trWord: "kaynağı", blank: "___ of finance" },
    { en: "Strategy of growth", tr: "Büyümenin stratejisi", word: "Strategy", trWord: "stratejisi", blank: "___ of growth" }
  ],
  4: [ // Ders 4: Sıfat + İsim – İsim + İsim (Three-Word Compounds: Adj + Noun + Noun)
    { en: "Precise analytical data", tr: "Hassas analitik veri", word: "Precise", trWord: "Hassas", blank: "___ analytical data" },
    { en: "Extensive methodical research", tr: "Kapsamlı yöntemli araştırma", word: "Extensive", trWord: "Kapsamlı", blank: "___ methodical research" },
    { en: "Consistent domestic policy", tr: "Tutarlı iç politika", word: "Consistent", trWord: "Tutarlı", blank: "___ domestic policy" },
    { en: "Secure financial investment", tr: "Güvenli finansal yatırım", word: "Secure", trWord: "Güvenli", blank: "___ financial investment" },
    { en: "Significant environmental factor", tr: "Önemli çevresel faktör", word: "Significant", trWord: "Önemli", blank: "___ environmental factor" },
    { en: "Unequal income distribution", tr: "Eşitsiz gelir dağılımı", word: "Unequal", trWord: "Eşitsiz", blank: "___ income distribution" },
    { en: "Brief temporary period", tr: "Kısa geçici dönem", word: "Brief", trWord: "Kısa", blank: "___ temporary period" },
    { en: "Automatic resource allocation", tr: "Otomatik kaynak tahsisi", word: "Automatic", trWord: "Otomatik", blank: "___ resource allocation" },
    { en: "Sustainable growth strategy", tr: "Sürdürülebilir büyüme stratejisi", word: "Sustainable", trWord: "Sürdürülebilir", blank: "___ growth strategy" },
    { en: "Initial framework design", tr: "İlk çerçeve tasarımı", word: "Initial", trWord: "İlk", blank: "___ framework design" },
    { en: "Rigid sector regulation", tr: "Katı sektör düzenlemesi", word: "Rigid", trWord: "Katı", blank: "___ sector regulation" },
    { en: "Global market expansion", tr: "Küresel pazar büyümesi", word: "Global", trWord: "Küresel", blank: "___ market expansion" },
    { en: "Alternative energy source", tr: "Alternatif enerji kaynağı", word: "Alternative", trWord: "Alternatif", blank: "___ energy source" },
    { en: "Complex network design", tr: "Karmaşık ağ tasarımı", word: "Complex", trWord: "Karmaşık", blank: "___ network design" },
    { en: "Stable regime structure", tr: "İstikrarlı rejim yapısı", word: "Stable", trWord: "İstikrarlı", blank: "___ regime structure" },
    { en: "Clear concept definition", tr: "Net kavram tanımı", word: "Clear", trWord: "Net", blank: "___ concept definition" }
  ],
  5: [ // Ders 5: Present Participle Sıfatı (...ing + İsim)
    { en: "Expanding market", tr: "Büyüyen pazar", word: "Expanding", trWord: "Büyüyen", blank: "___ market" },
    { en: "Developing country", tr: "Gelişen ülke", word: "Developing", trWord: "Gelişen", blank: "___ country" },
    { en: "Emerging concept", tr: "Beliren kavram", word: "Emerging", trWord: "Beliren", blank: "___ concept" },
    { en: "Increasing income", tr: "Artan gelir", word: "Increasing", trWord: "Artan", blank: "___ income" },
    { en: "Changing regime", tr: "Değişen rejim", word: "Changing", trWord: "Değişen", blank: "___ regime" },
    { en: "Surviving sector", tr: "Hayatta kalan sektör", word: "Surviving", trWord: "Hayatta kalan", blank: "___ sector" },
    { en: "Limiting factor", tr: "Sınırlayan faktör", word: "Limiting", trWord: "Sınırlayan", blank: "___ factor" },
    { en: "Challenging research", tr: "Zorlayıcı araştırma", word: "Challenging", trWord: "Zorlayıcı", blank: "___ research" },
    { en: "Promising investment", tr: "Vaat edici yatırım", word: "Promising", trWord: "Vaat edici", blank: "___ investment" },
    { en: "Existing data", tr: "Mevcut veri", word: "Existing", trWord: "Mevcut", blank: "___ data" },
    { en: "Growing network", tr: "Büyüyen ağ", word: "Growing", trWord: "Büyüyen", blank: "___ network" },
    { en: "Lasting policy", tr: "Kalıcı politika", word: "Lasting", trWord: "Kalıcı", blank: "___ policy" },
    { en: "Varying period", tr: "Değişen dönem", word: "Varying", trWord: "Değişen", blank: "___ period" },
    { en: "Matching design", tr: "Eşleşen tasarım", word: "Matching", trWord: "Eşleşen", blank: "___ design" },
    { en: "Supporting evidence", tr: "Destekleyici kanıt", word: "Supporting", trWord: "Destekleyici", blank: "___ evidence" },
    { en: "Misleading definition", tr: "Yanıltıcı tanım", word: "Misleading", trWord: "Yanıltıcı", blank: "___ definition" }
  ],
  6: [ // Ders 6: İsim + ..... ing + İsim
    { en: "Income-maximizing strategy", tr: "Geliri maksimize eden strateji", word: "Income-maximizing", trWord: "Geliri maksimize eden", blank: "___ strategy" },
    { en: "Resource-limiting factor", tr: "Kaynağı sınırlandıran faktör", word: "Resource-limiting", trWord: "Kaynağı sınırlandıran", blank: "___ factor" },
    { en: "Policy-defining role", tr: "Politikayı tanımlayan rol", word: "Policy-defining", trWord: "Politikayı tanımlayan", blank: "___ role" },
    { en: "Data-processing software", tr: "Veri işleyen yazılım", word: "Data-processing", trWord: "Veri işleyen", blank: "___ software" },
    { en: "Market-expanding project", tr: "Pazarı büyüten proje", word: "Market-expanding", trWord: "Pazarı büyüten", blank: "___ project" },
    { en: "Energy-consuming device", tr: "Enerji tüketen cihaz", word: "Energy-consuming", trWord: "Enerji tüketen", blank: "___ device" },
    { en: "Logic-defying concept", tr: "Mantığa meydan okuyan kavram", word: "Logic-defying", trWord: "Mantığa meydan okuyan", blank: "___ concept" },
    { en: "Environment-protecting law", tr: "Çevreyi koruyan yasa", word: "Environment-protecting", trWord: "Çevreyi koruyan", blank: "___ law" },
    { en: "Investment-supporting policy", tr: "Yatırımı destekleyen politika", word: "Investment-supporting", trWord: "Yatırımı destekleyen", blank: "___ policy" },
    { en: "Research-funding source", tr: "Araştırmayı fonlayan kaynak", word: "Research-funding", trWord: "Araştırmayı fonlayan", blank: "___ source" },
    { en: "Network-monitoring tool", tr: "Ağı izleyen araç", word: "Network-monitoring", trWord: "Ağı izleyen", blank: "___ tool" },
    { en: "Structure-defining rule", tr: "Yapıyı tanımlayan kural", word: "Structure-defining", trWord: "Yapıyı tanımlayan", blank: "___ rule" },
    { en: "Design-simplifying method", tr: "Tasarımı basitleştiren yöntem", word: "Design-simplifying", trWord: "Tasarımı basitleştiren", blank: "___ method" },
    { en: "Authority-challenging action", tr: "Otoriteye meydan okuyan eylem", word: "Authority-challenging", trWord: "Otoriteye meydan okuyan", blank: "___ action" },
    { en: "Growth-stimulating plan", tr: "Büyümeyi canlandıran plan", word: "Growth-stimulating", trWord: "Büyümeyi canlandıran", blank: "___ plan" },
    { en: "Regime-supporting force", tr: "Rejimi destekleyen güç", word: "Regime-supporting", trWord: "Rejimi destekleyen", blank: "___ force" }
  ],
  7: [ // Ders 7: Past Participle Sıfatı (...ed + İsim)
    { en: "Analysed data", tr: "Analiz edilmiş veri", word: "Analysed", trWord: "Analiz edilmiş", blank: "___ data" },
    { en: "Researched topic", tr: "Araştırılmış konu", word: "Researched", trWord: "Araştırılmış", blank: "___ topic" },
    { en: "Established policy", tr: "Kurulmuş politika", word: "Established", trWord: "Kurulmuş", blank: "___ policy" },
    { en: "Invested capital", tr: "Yatırım yapılmış sermaye", word: "Invested", trWord: "Yatırım yapılmış", blank: "___ capital" },
    { en: "Distributed income", tr: "Dağıtılmış gelir", word: "Distributed", trWord: "Dağıtılmış", blank: "___ income" },
    { en: "Allocated resource", tr: "Tahsis edilmiş kaynak", word: "Allocated", trWord: "Tahsis edilmiş", blank: "___ resource" },
    { en: "Structured design", tr: "Yapılandırılmış tasarım", word: "Structured", trWord: "Yapılandırılmış", blank: "___ design" },
    { en: "Defined concept", tr: "Tanımlanmış kavram", word: "Defined", trWord: "Tanımlanmış", blank: "___ concept" },
    { en: "Limited factor", tr: "Sınırlı faktör", word: "Limited", trWord: "Sınırlı", blank: "___ factor" },
    { en: "Required authority", tr: "Gerekli otorite", word: "Required", trWord: "Gerekli", blank: "___ authority" },
    { en: "Expected role", tr: "Beklenen rol", word: "Expected", trWord: "Beklenen", blank: "___ role" },
    { en: "Secured investment", tr: "Güvenceye alınmış yatırım", word: "Secured", trWord: "Güvenceye alınmış", blank: "___ investment" },
    { en: "Modified framework", tr: "Değiştirilmiş çerçeve", word: "Modified", trWord: "Değiştirilmiş", blank: "___ framework" },
    { en: "Intended focus", tr: "Amaçlanan odak", word: "Intended", trWord: "Amaçlanan", blank: "___ focus" },
    { en: "Preferred alternative", tr: "Tercih edilen alternatif", word: "Preferred", trWord: "Tercih edilen", blank: "___ alternative" },
    { en: "Proposed strategy", tr: "Önerilen strateji", word: "Proposed", trWord: "Önerilen", blank: "___ strategy" }
  ],
  8: [ // Ders 8: Zarf + Past Participle + İsim
    { en: "Carefully analysed data", tr: "Dikkatlice analiz edilmiş veri", word: "Carefully", trWord: "Dikkatlice", blank: "___ analysed data" },
    { en: "Methodically researched topic", tr: "Yöntemli araştırılmış konu", word: "Methodically", trWord: "Yöntemli", blank: "___ researched topic" },
    { en: "Domestically established policy", tr: "Ülke içinde kurulmuş politika", word: "Domestically", trWord: "Ülke içinde", blank: "___ established policy" },
    { en: "Wisely invested capital", tr: "Bilgece yatırım yapılmış sermaye", word: "Wisely", trWord: "Bilgece", blank: "___ invested capital" },
    { en: "Unequally distributed income", tr: "Eşitsiz dağıtılmış gelir", word: "Unequally", trWord: "Eşitsiz", blank: "___ distributed income" },
    { en: "Automatically allocated resource", tr: "Otomatik tahsis edilmiş kaynak", word: "Automatically", trWord: "Otomatik", blank: "___ allocated resource" },
    { en: "Poorly structured design", tr: "Kötü yapılandırılmış tasarım", word: "Poorly", trWord: "Kötü", blank: "___ structured design" },
    { en: "Explicitly defined concept", tr: "Açıkça tanımlanmış kavram", word: "Explicitly", trWord: "Açıkça", blank: "___ defined concept" },
    { en: "Severely limited factor", tr: "Ciddi derecede sınırlı faktör", word: "Severely", trWord: "Ciddi derecede", blank: "___ limited factor" },
    { en: "Legally required authority", tr: "Yasal olarak gerekli otorite", word: "Legally", trWord: "Yasal olarak", blank: "___ required authority" },
    { en: "Socially expected role", tr: "Toplumsal olarak beklenen rol", word: "Socially", trWord: "Toplumsal olarak", blank: "___ expected role" },
    { en: "Highly secured investment", tr: "Büyük ölçüde güvenceye alınmış yatırım", word: "Highly", trWord: "Büyük ölçüde", blank: "___ secured investment" },
    { en: "Slightly modified framework", tr: "Hafifçe değiştirilmiş çerçeve", word: "Slightly", trWord: "Hafifçe", blank: "___ modified framework" },
    { en: "Clearly intended focus", tr: "Açıkça amaçlanan odak", word: "Clearly", trWord: "Açıkça", blank: "___ intended focus" },
    { en: "Commonly preferred alternative", tr: "Yaygın tercih edilen alternatif", word: "Commonly", trWord: "Yaygın", blank: "___ preferred alternative" },
    { en: "Globally proposed strategy", tr: "Küresel çapta önerilen strateji", word: "Globally", trWord: "Küresel çapta", blank: "___ proposed strategy" }
  ]
};

const unit3LessonSentences = {
  1: [
    { en: "The workers in the factory", tr: "Fabrikadaki işçiler", word: "workers", trWord: "işçiler", blank: "The ___ in the factory" },
    { en: "The statement in the newspaper", tr: "Gazetedeki ifade", word: "statement", trWord: "ifade", blank: "The ___ in the newspaper" },
    { en: "The papers on my table", tr: "Masamın üzerindeki kağıtlar", word: "papers", trWord: "kağıtlar", blank: "The ___ on my table" },
    { en: "The photograph in the newspaper", tr: "Gazetedeki fotoğraf", word: "photograph", trWord: "fotoğraf", blank: "The ___ in the newspaper" },
    { en: "The difference between the results", tr: "Sonuçlar arasındaki fark", word: "difference", trWord: "fark", blank: "The ___ between the results" },
    { en: "The molecules in the liquid", tr: "Sıvıdaki moleküller", word: "molecules", trWord: "moleküller", blank: "The ___ in the liquid" },
    { en: "The molecules in the gas", tr: "Gazdaki moleküller", word: "molecules", trWord: "moleküller", blank: "The ___ in the gas" },
    { en: "The policy of the government", tr: "Hükümetin politikası", word: "policy", trWord: "politika", blank: "The ___ of the government" },
    { en: "Government by the people", tr: "Halk tarafından yönetim", word: "people", trWord: "halk", blank: "Government by the ___" },
    { en: "The examination of the doctor", tr: "Doktorun muayenesi", word: "examination", trWord: "muayene", blank: "The ___ of the doctor" },
    { en: "Damage to the head", tr: "Kafadaki hasar", word: "head", trWord: "kafa", blank: "Damage to the ___" },
    { en: "The ideas in this chapter", tr: "Bu bölümdeki fikirler", word: "ideas", trWord: "fikirler", blank: "The ___ in this chapter" },
    { en: "The bones in the arm", tr: "Koldaki kemikler", word: "bones", trWord: "kemikler", blank: "The ___ in the arm" },
    { en: "The heat in the metal", tr: "Metaldeki ısı", word: "heat", trWord: "ısı", blank: "The ___ in the metal" },
    { en: "The cure for this disease", tr: "Bu hastalığın tedavisi", word: "cure", trWord: "tedavi", blank: "The ___ for this disease" },
    { en: "Injection under the skin", tr: "Deri altındaki enjeksiyon", word: "skin", trWord: "deri", blank: "Injection under the ___" },
    { en: "Preparation for an examination", tr: "Sınava hazırlık", word: "preparation", trWord: "hazırlık", blank: "___ for an examination" },
    { en: "Employment in the factories", tr: "Fabrikalardaki istihdam", word: "employment", trWord: "istihdam", blank: "___ in the factories" },
    { en: "A substance in the blood", tr: "Kandaki bir madde", word: "substance", trWord: "madde", blank: "A ___ in the blood" },
    { en: "The distance from this point", tr: "Bu noktadan olan mesafe", word: "distance", trWord: "mesafe", blank: "The ___ from this point" },
    { en: "The water under the ground", tr: "Yer altındaki su", word: "water", trWord: "su", blank: "The ___ under the ground" },
    { en: "The situation in America", tr: "Amerika'daki durum", word: "situation", trWord: "durum", blank: "The ___ in America" }
  ],
  2: [
    { en: "The legs of the animal", tr: "Hayvanın bacakları", word: "legs", trWord: "bacakları", blank: "The ___ of the animal" },
    { en: "The muscles of the leg", tr: "Bacağın kasları", word: "muscles", trWord: "kasları", blank: "The ___ of the leg" },
    { en: "The importance of the results", tr: "Sonuçların önemi", word: "importance", trWord: "önemi", blank: "The ___ of the results" },
    { en: "The arrangement of the pictures", tr: "Resimlerin düzenlenmesi", word: "arrangement", trWord: "düzenlenmesi", blank: "The ___ of the pictures" },
    { en: "The extent of the damage", tr: "Hasarın boyutu", word: "extent", trWord: "boyutu", blank: "The ___ of the damage" },
    { en: "The volume of the liquid", tr: "Sıvının hacmi", word: "volume", trWord: "hacmi", blank: "The ___ of the liquid" },
    { en: "The result of the experiment", tr: "Deneyin sonucu", word: "result", trWord: "sonucu", blank: "The ___ of the experiment" },
    { en: "The difficulty of the problem", tr: "Problemin zorluğu", word: "difficulty", trWord: "zorluğu", blank: "The ___ of the problem" },
    { en: "The photograph of the student", tr: "Öğrencinin fotoğrafı", word: "photograph", trWord: "fotoğrafı", blank: "The ___ of the student" },
    { en: "The duration of the holiday", tr: "Tatilin süresi", word: "duration", trWord: "süresi", blank: "The ___ of the holiday" },
    { en: "The distribution of the forests", tr: "Ormanların dağılımı", word: "distribution", trWord: "dağılımı", blank: "The ___ of the forests" },
    { en: "The difficulties of the experiment", tr: "Deneyin zorlukları", word: "difficulties", trWord: "zorlukları", blank: "The ___ of the experiment" },
    { en: "The dimensions of the room", tr: "Odanın boyutları", word: "dimensions", trWord: "boyutları", blank: "The ___ of the room" },
    { en: "The division of the work", tr: "İşin bölünmesi", word: "division", trWord: "bölünmesi", blank: "The ___ of the work" },
    { en: "The disadvantages of the situation", tr: "Durumun dezavantajları", word: "disadvantages", trWord: "dezavantajları", blank: "The ___ of the situation" },
    { en: "The employment of the workers", tr: "İşçilerin istihdamı", word: "employment", trWord: "istihdamı", blank: "The ___ of the workers" }
  ],
  3: [
    { en: "Some of the prices", tr: "Fiyatların bazıları", word: "prices", trWord: "fiyatların", blank: "Some of the ___" },
    { en: "Many of the substances", tr: "Maddelerin birçoğu", word: "substances", trWord: "maddelerin", blank: "Many of the ___" },
    { en: "One of the diseases", tr: "Hastalıkların biri", word: "diseases", trWord: "hastalıkların", blank: "One of the ___" },
    { en: "Most of the goods", tr: "Malların çoğu", word: "goods", trWord: "malların", blank: "Most of the ___" },
    { en: "All of the mountains", tr: "Dağların hepsi", word: "mountains", trWord: "dağların", blank: "All of the ___" },
    { en: "None of the contracts", tr: "Sözleşmelerin hiçbirisi", word: "contracts", trWord: "sözleşmelerin", blank: "None of the ___" },
    { en: "Each of the agreements", tr: "Anlaşmaların her biri", word: "agreements", trWord: "anlaşmaların", blank: "Each of the ___" },
    { en: "Part of the area", tr: "Bölgenin bir kısmı", word: "area", trWord: "bölgenin", blank: "Part of the ___" },
    { en: "Most of the oil", tr: "Petrolün çoğu", word: "oil", trWord: "petrolün", blank: "Most of the ___" },
    { en: "A little of the gas", tr: "Gazın az bir miktarı", word: "gas", trWord: "gazın", blank: "A little of the ___" },
    { en: "None of the wood", tr: "Odunun hiçbirisi", word: "wood", trWord: "odunun", blank: "None of the ___" },
    { en: "Another of the diseases", tr: "Hastalıkların bir başkası", word: "diseases", trWord: "hastalıkların", blank: "Another of the ___" },
    { en: "All of the ideas", tr: "Fikirlerin hepsi", word: "ideas", trWord: "fikirlerin", blank: "All of the ___" },
    { en: "Several of the metals", tr: "Metallerin birkaçı", word: "metals", trWord: "metallerin", blank: "Several of the ___" },
    { en: "Most of the energy", tr: "Enerjinin çoğu", word: "energy", trWord: "enerjinin", blank: "Most of the ___" },
    { en: "Half of the profits", tr: "Kazançların yarısı", word: "profits", trWord: "kazançların", blank: "Half of the ___" }
  ],
  4: [
    { en: "The invention of fire", tr: "Ateşin icadı", word: "invention", trWord: "icadı", blank: "The ___ of fire" },
    { en: "Fear of hunger", tr: "Açlık korkusu", word: "hunger", trWord: "açlık", blank: "Fear of ___" },
    { en: "The study of disease", tr: "Hastalık çalışması", word: "study", trWord: "çalışması", blank: "The ___ of disease" },
    { en: "Proof of guilt", tr: "Suçluluk kanıtı", word: "proof", trWord: "kanıtı", blank: "___ of guilt" },
    { en: "The discovery of radium", tr: "Radyumun keşfi", word: "discovery", trWord: "keşfi", blank: "The ___ of radium" },
    { en: "The expectancy of life", tr: "Yaşam beklentisi", word: "expectancy", trWord: "beklentisi", blank: "The ___ of life" },
    { en: "The use of electricity", tr: "Elektrik kullanımı", word: "use", trWord: "kullanımı", blank: "The ___ of electricity" },
    { en: "Division of labour", tr: "İş bölümü", word: "division", trWord: "bölümü", blank: "___ of labour" },
    { en: "Form of government", tr: "Hükümet şekli", word: "form", trWord: "şekli", blank: "___ of government" },
    { en: "Freedom of religion", tr: "Din özgürlüğü", word: "freedom", trWord: "özgürlüğü", blank: "___ of religion" },
    { en: "Freedom of speech", tr: "Konuşma özgürlüğü", word: "speech", trWord: "konuşma", blank: "Freedom of ___" },
    { en: "Freedom of movement", tr: "Seyahat özgürlüğü", word: "movement", trWord: "seyahat", blank: "Freedom of ___" },
    { en: "The history of civilisation", tr: "Uygarlık tarihi", word: "history", trWord: "tarihi", blank: "The ___ of civilisation" },
    { en: "The history of art", tr: "Sanat tarihi", word: "art", trWord: "sanat", blank: "The history of ___" },
    { en: "The existence of coal", tr: "Kömürün varlığı", word: "existence", trWord: "varlığı", blank: "The ___ of coal" },
    { en: "The study of history", tr: "Tarih çalışması", word: "history", trWord: "tarih", blank: "The study of ___" }
  ],
  5: [
    { en: "A student from England", tr: "İngiltere'den bir öğrenci", word: "student", trWord: "öğrenci", blank: "A ___ from England" },
    { en: "Sand from the river", tr: "Nehirden gelen kum", word: "sand", trWord: "kum", blank: "___ from the river" },
    { en: "A substance from coal", tr: "Kömürden elde edilen madde", word: "substance", trWord: "madde", blank: "A ___ from coal" },
    { en: "A book from the library", tr: "Kütüphaneden bir kitap", word: "book", trWord: "kitap", blank: "A ___ from the library" },
    { en: "An article from this newspaper", tr: "Bu gazeteden bir makale", word: "article", trWord: "makale", blank: "An ___ from this newspaper" },
    { en: "Radiation from space", tr: "Uzaydan gelen radyasyon", word: "radiation", trWord: "radyasyon", blank: "___ from space" },
    { en: "A page from history", tr: "Tarihten bir yaprak", word: "page", trWord: "yaprak", blank: "A ___ from history" },
    { en: "Damage from neglect", tr: "İhmalden kaynaklanan hasar", word: "damage", trWord: "hasar", blank: "___ from neglect" },
    { en: "The water from the river", tr: "Nehirden gelen su", word: "water", trWord: "su", blank: "The ___ from the river" },
    { en: "The heat from the metal", tr: "Metalden gelen ısı", word: "heat", trWord: "ısı", blank: "The ___ from the metal" },
    { en: "The blood from the animal", tr: "Hayvandan alınan kan", word: "blood", trWord: "kan", blank: "The ___ from the animal" },
    { en: "Diseases from viruses", tr: "Virüslerden kaynaklanan hastalıklar", word: "diseases", trWord: "hastalıklar", blank: "___ from viruses" },
    { en: "The gas from this substance", tr: "Bu maddeden çıkan gaz", word: "gas", trWord: "gaz", blank: "The ___ from this substance" },
    { en: "The results from these experiments", tr: "Bu deneylerden alınan sonuçlar", word: "results", trWord: "sonuçlar", blank: "The ___ from these experiments" },
    { en: "The ideas from this book", tr: "Bu kitaptan edinilen fikirler", word: "ideas", trWord: "fikirler", blank: "The ___ from this book" },
    { en: "Coal from this area", tr: "Bu bölgeden çıkan kömür", word: "coal", trWord: "kömür", blank: "___ from this area" }
  ],
  6: [
    { en: "The difference in the results of the experiments", tr: "Deneylerin sonuçlarındaki fark", word: "difference", trWord: "fark", blank: "The ___ in the results of the experiments" },
    { en: "A study of the diseases of the blood", tr: "Kan hastalıklarının incelenmesi", word: "study", trWord: "incelenmesi", blank: "A ___ of the diseases of the blood" },
    { en: "The policy of the government during the last few years", tr: "Hükümetin son birkaç yıldaki politikası", word: "policy", trWord: "politikası", blank: "The ___ of the government during the last few years" },
    { en: "The photograph on the front page of the newspaper", tr: "Gazetenin ön sayfasındaki fotoğraf", word: "photograph", trWord: "fotoğraf", blank: "The ___ on the front page of the newspaper" },
    { en: "The difficulty in the explanation of the problem", tr: "Problemin açıklanmasındaki zorluk", word: "difficulty", trWord: "zorluk", blank: "The ___ in the explanation of the problem" },
    { en: "The history of the civilisation of these people", tr: "Bu insanların uygarlık tarihi", word: "history", trWord: "tarihi", blank: "The ___ of the civilisation of these people" },
    { en: "The damage to the head of this patient", tr: "Bu hastanın kafasındaki hasar", word: "damage", trWord: "hasar", blank: "The ___ to the head of this patient" },
    { en: "The ideas in this article in the newspaper", tr: "Gazetedeki bu makalede yer alan fikirler", word: "ideas", trWord: "fikirler", blank: "The ___ in this article in the newspaper" },
    { en: "The disease in the bones of the leg", tr: "Bacak kemiklerindeki hastalık", word: "disease", trWord: "hastalık", blank: "The ___ in the bones of the leg" },
    { en: "The heat in the metal round the top of the bottle", tr: "Şişenin ağzının etrafındaki metalde bulunan ısı", word: "heat", trWord: "ısı", blank: "The ___ in the metal round the top of the bottle" },
    { en: "The heat at the surface of the liquid in the tank", tr: "Depodaki sıvının yüzeyindeki ısı", word: "heat", trWord: "ısı", blank: "The ___ at the surface of the liquid in the tank" },
    { en: "The cure for this disease of the blood", tr: "Bu kan hastalığının tedavisi", word: "cure", trWord: "tedavisi", blank: "The ___ for this disease of the blood" },
    { en: "An injection into the muscle of the leg of the animal", tr: "Hayvanın bacak kasına yapılan enjeksiyon", word: "injection", trWord: "enjeksiyon", blank: "An ___ into the muscle of the leg of the animal" },
    { en: "Preparation for an examination in English", tr: "İngilizce sınavına hazırlık", word: "preparation", trWord: "hazırlık", blank: "___ for an examination in English" },
    { en: "Employment in factories of this kind", tr: "Bu tür fabrikalarda istihdam", word: "employment", trWord: "istihdam", blank: "___ in factories of this kind" },
    { en: "The situation of the workers in America", tr: "Amerika'daki işçilerin durumu", word: "situation", trWord: "durumu", blank: "The ___ of the workers in America" }
  ]
};

const unit4LessonSentences = {
  1: [
    { en: "We describe this method in the next chapter", tr: "Bu yöntemi gelecek bölümde tanımlıyoruz", word: "describe", trWord: "tanımlıyoruz", blank: "We ___ this method in the next chapter" },
    { en: "We find the measurements on this page", tr: "Ölçümleri bu sayfada buluyoruz", word: "find", trWord: "buluyoruz", blank: "We ___ the measurements on this page" },
    { en: "We employ this method for this experiment", tr: "Bu yöntemi bu deney için kullanıyoruz", word: "employ", trWord: "kullanıyoruz", blank: "We ___ this method for this experiment" },
    { en: "We cured that disease in two months", tr: "O hastalığı iki ayda tedavi ettik", word: "cured", trWord: "tedavi ettik", blank: "We ___ that disease in two months" },
    { en: "We injected the substance into the muscle", tr: "Maddeyi kas içine enjekte ettik", word: "injected", trWord: "enjekte ettik", blank: "We ___ the substance into the muscle" },
    { en: "We used the wood for building", tr: "Odunu inşaat için kullandık", word: "used", trWord: "kullandık", blank: "We ___ the wood for building" },
    { en: "We pumped the water to the surface", tr: "Suyu yüzeye pompaladık", word: "pumped", trWord: "pompaladık", blank: "We ___ the water to the surface" },
    { en: "We injected the substance under the skin", tr: "Maddeyi deri altına enjekte ettik", word: "injected", trWord: "enjekte ettik", blank: "We ___ the substance under the skin" },
    { en: "We prepared the students for the examination", tr: "Öğrencileri sınava hazırladık", word: "prepared", trWord: "hazırladık", blank: "We ___ the students for the examination" },
    { en: "We measured the volume before heating it", tr: "Isıtmadan önce hacmini ölçtük", word: "measured", trWord: "ölçtük", blank: "We ___ the volume before heating it" },
    { en: "We use coal for this purpose", tr: "Kömürü bu amaç için kullanırız", word: "use", trWord: "kullanırız", blank: "We ___ coal for this purpose" },
    { en: "We employ these workers for the building", tr: "Bu işçileri inşaat için çalıştırıyoruz", word: "employ", trWord: "çalıştırıyoruz", blank: "We ___ these workers for the building" },
    { en: "We divided the work according to this principle", tr: "İşi bu ilkeye göre böldük", word: "divided", trWord: "böldük", blank: "We ___ the work according to this principle" },
    { en: "Man invented fire thousands of years ago", tr: "İnsan ateşi binlerce yıl önce icat etti", word: "invented", trWord: "icat etti", blank: "Man ___ fire thousands of years ago" },
    { en: "They performed the experiment in the laboratory", tr: "Deneyi laboratuvarda yaptılar", word: "performed", trWord: "yaptılar", blank: "They ___ the experiment in the laboratory" },
    { en: "The specialist treated the disease at the clinic", tr: "Uzman hastalığı klinikte tedavi etti", word: "treated", trWord: "tedavi etti", blank: "The specialist ___ the disease at the clinic" }
  ],
  2: [
    { en: "Before the invention of the wheel", tr: "Tekerleğin icadından önce", word: "invention", trWord: "icadından", blank: "Before the ___ of the wheel" },
    { en: "In this form of government", tr: "Bu yönetim şeklinde", word: "government", trWord: "yönetim", blank: "In this form of ___" },
    { en: "During a study of this disease", tr: "Bu hastalığın incelenmesi sırasında", word: "study", trWord: "incelenmesi", blank: "During a ___ of this disease" },
    { en: "In the history of civilisation", tr: "Uygarlık tarihinde", word: "history", trWord: "tarihinde", blank: "In the ___ of civilisation" },
    { en: "Before the use of electricity", tr: "Elektrik kullanımından önce", word: "use", trWord: "kullanımından", blank: "Before the ___ of electricity" },
    { en: "During the long history of man", tr: "İnsanın uzun tarihi boyunca", word: "history", trWord: "tarihi", blank: "During the long ___ of man" },
    { en: "According to the division of labour", tr: "İş bölümüne göre", word: "division", trWord: "bölümüne", blank: "According to the ___ of labour" },
    { en: "According to the expectancy of life", tr: "Ortalama yaşam süresine göre", word: "expectancy", trWord: "süresine", blank: "According to the ___ of life" },
    { en: "Without proof of guilt", tr: "Suçluluk kanıtı olmadan", word: "proof", trWord: "kanıtı", blank: "Without ___ of guilt" },
    { en: "After the discovery of radium", tr: "Radyumun keşfinden sonra", word: "discovery", trWord: "keşfinden", blank: "After the ___ of radium" },
    { en: "Because of the existence of coal", tr: "Kömürün varlığı nedeniyle", word: "existence", trWord: "varlığı", blank: "Because of the ___ of coal" },
    { en: "From the production of raw material", tr: "Hammadde üretiminden", word: "production", trWord: "üretiminden", blank: "From the ___ of raw material" },
    { en: "According to the ideas in this book", tr: "Bu kitaptaki fikirlere göre", word: "ideas", trWord: "fikirlere", blank: "According to the ___ in this book" },
    { en: "Because of radiation from space", tr: "Uzaydan gelen radyasyon nedeniyle", word: "radiation", trWord: "radyasyon", blank: "Because of ___ from space" },
    { en: "In an article in today's newspaper", tr: "Bugünkü gazetedeki bir makalede", word: "article", trWord: "makalede", blank: "In an ___ in today's newspaper" },
    { en: "Because of the loss of heat", tr: "Isı kaybı nedeniyle", word: "loss", trWord: "kaybı", blank: "Because of the ___ of heat" }
  ],
  3: [
    { en: "The professor explained the problem", tr: "Profesör problemi açıkladı", word: "explained", trWord: "açıkladı", blank: "The professor ___ the problem" },
    { en: "The students performed the experiment", tr: "Öğrenciler deneyi gerçekleştirdi", word: "performed", trWord: "gerçekleştirdi", blank: "The students ___ the experiment" },
    { en: "The plants performed their function", tr: "Bitkiler işlevlerini yerine getirdi", word: "performed", trWord: "yerine getirdi", blank: "The plants ___ their function" },
    { en: "The student translated the sentence", tr: "Öğrenci cümleyi tercüme etti", word: "translated", trWord: "tercüme etti", blank: "The student ___ the sentence" },
    { en: "The doctor cured his disease", tr: "Doktor hastalığını tedavi etti", word: "cured", trWord: "tedavi etti", blank: "The doctor ___ his disease" },
    { en: "The workers prepared the machine", tr: "İşçiler makineyi hazırladı", word: "prepared", trWord: "hazırladı", blank: "The workers ___ the machine" },
    { en: "Madame Curie discovered radium", tr: "Madame Curie radyumu keşfetti", word: "discovered", trWord: "keşfetti", blank: "Madame Curie ___ radium" },
    { en: "The scientist estimated the amount", tr: "Bilim insanı miktarı tahmin etti", word: "estimated", trWord: "tahmin etti", blank: "The scientist ___ the amount" },
    { en: "The members elected the president", tr: "Üyeler başkanı seçti", word: "elected", trWord: "seçti", blank: "Premium members ___ the president" },
    { en: "The scientist employed this method", tr: "Bilim insanı bu yöntemi kullandı", word: "employed", trWord: "kullandı", blank: "The scientist ___ this method" },
    { en: "The professor described this method", tr: "Profesör bu yöntemi tanımladı", word: "described", trWord: "tanımladı", blank: "The professor ___ this method" },
    { en: "Scientists understood the problem", tr: "Bilim insanları problemi anladı", word: "understood", trWord: "anladı", blank: "Scientists ___ the problem" },
    { en: "The specialist cured the disease", tr: "Uzman hastalığı tedavi etti", word: "cured", trWord: "tedavi etti", blank: "The specialist ___ the disease" },
    { en: "The scientist injected the substance", tr: "Bilim insanı maddeyi enjekte etti", word: "injected", trWord: "enjekte etti", blank: "The scientist ___ the substance" },
    { en: "The workers used the raw materials", tr: "İşçiler hammaddeleri kullandı", word: "used", trWord: "kullandı", blank: "The workers ___ the raw materials" },
    { en: "The student measured the volume", tr: "Öğrenci hacmi ölçtü", word: "measured", trWord: "ölçtü", blank: "The student ___ the volume" }
  ],
  4: [
    { en: "The workers divided the work", tr: "İşçiler işi böldü", word: "divided", trWord: "böldü", blank: "The workers ___ the work" },
    { en: "The doctors treated the disease", tr: "Doktorlar hastalığı tedavi etti", word: "treated", trWord: "tedavi etti", blank: "The doctors ___ the disease" },
    { en: "The plant absorbed the water", tr: "Bitki suyu absorbe etti", word: "absorbed", trWord: "absorbe etti", blank: "The plant ___ the water" },
    { en: "Edison invented the electric bulb", tr: "Edison elektrik ampulünü icat etti", word: "invented", trWord: "icat etti", blank: "Edison ___ the electric bulb" },
    { en: "The teacher explained the task", tr: "Öğretmen görevi açıkladı", word: "explained", trWord: "açıkladı", blank: "The teacher ___ the task" },
    { en: "The team solved the problem", tr: "Ekip problemi çözdü", word: "solved", trWord: "çözdü", blank: "The team ___ the problem" },
    { en: "The factory produced the goods", tr: "Fabrika malları üretti", word: "produced", trWord: "üretti", blank: "The factory ___ the goods" },
    { en: "The computer processed the data", tr: "Bilgisayar veriyi işledi", word: "processed", trWord: "işledi", blank: "The computer ___ the data" },
    { en: "The company exported the coal", tr: "Şirket kömürü ihraç etti", word: "exported", trWord: "ihraç etti", blank: "The company ___ the coal" },
    { en: "The government approved the plan", tr: "Hükümet planı onayladı", word: "approved", trWord: "onayladı", blank: "The government ___ the plan" },
    { en: "The researcher observed the reaction", tr: "Araştırmacı tepkimeyi gözlemledi", word: "observed", trWord: "gözlemledi", blank: "The researcher ___ the reaction" },
    { en: "The analyst measured the temperature", tr: "Analist sıcaklığı ölçtü", word: "measured", trWord: "ölçtü", blank: "The analyst ___ the temperature" },
    { en: "The document contains a summary", tr: "Belge bir özet içerir", word: "contains", trWord: "içerir", blank: "The document ___ a summary" },
    { en: "The patient suffered from the disease", tr: "Hasta hastalıktan acı çekti", word: "suffered", trWord: "acı çekti", blank: "The patient ___ from the disease" },
    { en: "The committee approved the budget", tr: "Komite bütçeyi onayladı", word: "approved", trWord: "onayladı", blank: "The committee ___ the budget" },
    { en: "The system controls the process", tr: "Sistem süreci kontrol eder", word: "controls", trWord: "kontrol eder", blank: "The system ___ the process" }
  ]
};

const unit5LessonSentences = {
  1: [
    { en: "There is an examination", tr: "Bir sınav vardır", word: "examination", trWord: "sınav", blank: "There is an ___" },
    { en: "There is a test", tr: "Bir test vardır", word: "test", trWord: "test", blank: "There is a ___" },
    { en: "There is a possibility", tr: "Bir olasılık vardır", word: "possibility", trWord: "olasılık", blank: "There is a ___" },
    { en: "There is a tendency", tr: "Bir eğilim vardır", word: "tendency", trWord: "eğilim", blank: "There is a ___" },
    { en: "There is a translation", tr: "Bir çeviri vardır", word: "translation", trWord: "çeviri", blank: "There is a ___" },
    { en: "There is a form", tr: "Bir biçim vardır", word: "form", trWord: "biçim", blank: "There is a ___" },
    { en: "There is a hope", tr: "Bir umut vardır", word: "hope", trWord: "umut", blank: "There is a ___" },
    { en: "There is an improvement", tr: "Bir gelişme vardır", word: "improvement", trWord: "gelişme", blank: "There is an ___" },
    { en: "There is a theory", tr: "Bir kuram vardır", word: "theory", trWord: "kuram", blank: "There is a ___" },
    { en: "There is a supply", tr: "Bir arz vardır", word: "supply", trWord: "arz", blank: "There is a ___" },
    { en: "There is a wire", tr: "Bir tel vardır", word: "wire", trWord: "tel", blank: "There is a ___" },
    { en: "There is a vibration", tr: "Bir titreşim vardır", word: "vibration", trWord: "titreşim", blank: "There is a ___" },
    { en: "There is a temperature", tr: "Bir sıcaklık vardır", word: "temperature", trWord: "sıcaklık", blank: "There is a ___" },
    { en: "There is a type", tr: "Bir tür vardır", word: "type", trWord: "tür", blank: "There is a ___" },
    { en: "There is a statement", tr: "Bir ifade vardır", word: "statement", trWord: "ifade", blank: "There is a ___" },
    { en: "There is a suggestion", tr: "Bir öneri vardır", word: "suggestion", trWord: "öneri", blank: "There is a ___" }
  ],

  3: [
    { en: "Where is the post office", tr: "Postane nerededir", word: "Where", trWord: "nerededir", blank: "___ is the post office" },
    { en: "Where was the resemblance", tr: "Benzerlik neredeydi", word: "Where", trWord: "neredeydi", blank: "___ was the resemblance" },
    { en: "What was the average", tr: "Ortalama neydi", word: "What", trWord: "neydi", blank: "___ was the average" },
    { en: "How long was the lecture", tr: "Ders ne kadar uzundu", word: "long", trWord: "ne kadar", blank: "How ___ was the lecture" },
    { en: "Why was the decision different", tr: "Karar neden farklıydı", word: "Why", trWord: "neden", blank: "___ was the decision different" },
    { en: "How much was the cost", tr: "Maliyet ne kadardı", word: "much", trWord: "ne kadardı", blank: "How ___ was the cost" },
    { en: "How far is the distance", tr: "Mesafe ne kadar uzaktır", word: "far", trWord: "ne kadar", blank: "How ___ is the distance" },
    { en: "What is the extent of damage", tr: "Hasarın boyutu nedir", word: "What", trWord: "nedir", blank: "___ is the extent of damage" },
    { en: "What was the extent of danger", tr: "Tehlikenin boyutu neydi", word: "What", trWord: "neydi", blank: "___ was the extent of danger" },
    { en: "What was the amount of gas", tr: "Gazın miktarı neydi", word: "amount", trWord: "miktarı", blank: "What was the ___ of gas" },
    { en: "How much was the remainder", tr: "Kalan ne kadardı", word: "remainder", trWord: "kalan", blank: "How much was the ___" },
    { en: "When will the help arrive", tr: "Yardım ne zaman ulaşacak", word: "When", trWord: "ne zaman", blank: "___ will the help arrive" },
    { en: "When can light travel", tr: "Işık ne zaman yol alabilir", word: "travel", trWord: "yol alabilir", blank: "When can light ___" },
    { en: "How much is the profit", tr: "Kâr ne kadardır", word: "profit", trWord: "kâr", blank: "How much is the ___" },
    { en: "When is operation necessary", tr: "Ameliyat ne zaman gereklidir", word: "necessary", trWord: "gereklidir", blank: "When is operation ___" },
    { en: "Who is the best worker", tr: "En iyi işçi kimdir", word: "Who", trWord: "kimdir", blank: "___ is the best worker" }
  ],
  4: [
    { en: "Is the man here", tr: "Adam burada mıdır", word: "Is", trWord: "mıdır", blank: "___ the man here" },
    { en: "Is the amount great or small", tr: "Miktar büyük müdür yoksa küçük mü", word: "great", trWord: "büyük", blank: "Is the amount ___ or small" },
    { en: "Is the average high or low", tr: "Ortalama yüksek midir yoksa düşük mü", word: "average", trWord: "ortalama", blank: "Is the ___ high or low" },
    { en: "Is the community large or small", tr: "Topluluk büyük müdür yoksa küçük mü", word: "community", trWord: "topluluk", blank: "Is the ___ large or small" },
    { en: "Are the conditions good or bad", tr: "Koşullar iyi midir yoksa kötü mü", word: "conditions", trWord: "koşullar", blank: "Are the ___ good or bad" },
    { en: "Are the reasons sufficient", tr: "Nedenler yeterli midir", word: "reasons", trWord: "nedenler", blank: "Are the ___ sufficient" },
    { en: "Will there be another examination", tr: "Başka bir sınav olacak mı", word: "examination", trWord: "sınav", blank: "Will there be another ___" },
    { en: "Will there be another war", tr: "Başka bir savaş olacak mı", word: "war", trWord: "savaş", blank: "Will there be another ___" },
    { en: "Has the strike begun", tr: "Grev başladı mı", word: "begun", trWord: "başladı mı", blank: "Has the strike ___" },
    { en: "Was the operation necessary", tr: "Ameliyat gerekli miydi", word: "operation", trWord: "ameliyat", blank: "Was the ___ necessary" },
    { en: "Is the population increasing", tr: "Nüfus artıyor mu", word: "increasing", trWord: "artıyor mu", blank: "Is the population ___" },
    { en: "Has the situation changed", tr: "Durum değişti mi", word: "changed", trWord: "değişti mi", blank: "Has the situation ___" },
    { en: "Have there been any improvements", tr: "Hiç gelişme oldu mu", word: "improvements", trWord: "gelişme", blank: "Have there been any ___" },
    { en: "Was there any reason for the change", tr: "Değişiklik için herhangi bir neden var mıydı", word: "reason", trWord: "neden", blank: "Was there any ___ for the change" },
    { en: "Will there be another strike", tr: "Gelecek ay başka bir grev olacak mı", word: "strike", trWord: "grev", blank: "Will there be another ___" },
    { en: "Is the liquid pure", tr: "Sıvı saf mıdır", word: "pure", trWord: "saf mıdır", blank: "Is the liquid ___" }
  ],
  5: [
    { en: "Can the liquid absorb the gas", tr: "Sıvı gazı absorbe edebilir mi", word: "absorb", trWord: "absorbe edebilir", blank: "Can the liquid ___ the gas" },
    { en: "Can the liquid dissolve the substance", tr: "Sıvı maddeyi çözebilir mi", word: "dissolve", trWord: "çözebilir", blank: "Can the liquid ___ the substance" },
    { en: "Did the liquid absorb the gas", tr: "Sıvı gazı absorbe etti mi", word: "absorb", trWord: "absorbe etti", blank: "Did the liquid ___ the gas" },
    { en: "Did the substance dissolve in the liquid", tr: "Madde sıvıda çözündü mü", word: "dissolve", trWord: "çözündü", blank: "Did the substance ___ in the liquid" },
    { en: "Did the reaction take place in the test-tube", tr: "Tepkime deney tüpünde gerçekleşti mi", word: "reaction", trWord: "tepkime", blank: "Did the ___ take place in the test-tube" },
    { en: "Does the committee meet today", tr: "Komite bugün toplanıyor mu", word: "meet", trWord: "toplanıyor", blank: "Does the committee ___ today" },
    { en: "Does the committee make the decisions", tr: "Kararları komite mi alır", word: "decisions", trWord: "kararları", blank: "Does the committee make the ___" },
    { en: "Does the examination take place today", tr: "Sınav bugün mü yapılıyor", word: "examination", trWord: "sınav", blank: "Does the ___ take place today" },
    { en: "Did the examination take place last week", tr: "Sınav geçen hafta mı yapıldı", word: "examination", trWord: "sınav", blank: "Did the ___ take place last week" },
    { en: "Did the employers solve the problem", tr: "İşverenler problemi çözdü mü", word: "solve", trWord: "çözdü", blank: "Did the employers ___ the problem" },
    { en: "Did the teacher explain the problem", tr: "Öğretmen problemi açıkladı mı", word: "explain", trWord: "açıkladı", blank: "Did the teacher ___ the problem" },
    { en: "Do scientists believe that", tr: "Bilim insanları buna inanıyor mu", word: "believe", trWord: "inanıyor", blank: "Do scientists ___ that" },
    { en: "Did the experiment last a long time", tr: "Deney uzun sürdü mü", word: "experiment", trWord: "deney", blank: "Did the ___ last a long time" },
    { en: "Does the book mention new developments", tr: "Kitap yeni gelişmelerden bahsediyor mu", word: "mention", trWord: "bahsediyor", blank: "Does the book ___ new developments" },
    { en: "Did the accident take place in the factory", tr: "Kaza fabrikada mı gerçekleşti", word: "accident", trWord: "kaza", blank: "Did the ___ take place in the factory" },
    { en: "Does the plate absorb the light", tr: "Plaka ışığı absorbe eder mi", word: "absorb", trWord: "absorbe eder", blank: "Does the plate ___ the light" }
  ],
  6: [
    { en: "With whom did he live last year", tr: "Geçen yıl kiminle yaşadı", word: "whom", trWord: "kiminle", blank: "With ___ did he live last year" },
    { en: "For what purpose is the machine", tr: "Makine hangi amaç içindir", word: "purpose", trWord: "amaç", blank: "For what ___ is the machine" },
    { en: "In what mine does the coal exist", tr: "Kömür hangi madende bulunur", word: "exist", trWord: "bulunur", blank: "In what mine does the coal ___" },
    { en: "For whom will the profits be", tr: "Kârlar kimin için olacak", word: "whom", trWord: "kimin", blank: "For ___ will the profits be" },
    { en: "At which point did the reaction start", tr: "Tepkime hangi noktada başladı", word: "point", trWord: "noktada", blank: "At which ___ did the reaction start" },
    { en: "For how long will the reaction last", tr: "Tepkime ne kadar sürecek", word: "long", trWord: "sürecek", blank: "For how ___ will the reaction last" },
    { en: "In what situation did the student find himself", tr: "Öğrenci kendini nasıl bir durumda buldu", word: "situation", trWord: "durumda", blank: "In what ___ did the student find himself" },
    { en: "On what condition did you accept the solution", tr: "Çözümü hangi koşulla kabul ettiniz", word: "condition", trWord: "koşulla", blank: "On what ___ did you accept the solution" },
    { en: "On what condition will the strike end", tr: "Grev hangi koşulla sona erecek", word: "condition", trWord: "koşulla", blank: "On what ___ will the strike end" },
    { en: "For what purpose did they perform the experiment", tr: "Deneyi hangi amaçla yaptılar", word: "purpose", trWord: "amaçla", blank: "For what ___ did they perform the experiment" },
    { en: "For which examination will the students sit", tr: "Öğrenciler hangi sınava girecek", word: "examination", trWord: "sınava", blank: "For which ___ will the students sit" },
    { en: "In which year did the population increase", tr: "Nüfus hangi yılda arttı", word: "year", trWord: "yılda", blank: "In which ___ did the population increase" },
    { en: "By which method was the cost measured", tr: "Maliyet hangi yöntemle ölçüldü", word: "method", trWord: "yöntemle", blank: "By which ___ was the cost measured" },
    { en: "Through which tissues does the virus penetrate", tr: "Virüs hangi dokulardan nüfuz eder", word: "tissues", trWord: "dokulardan", blank: "Through which ___ does the virus penetrate" },
    { en: "Under which conditions was the liquid heated", tr: "Sıvı hangi koşullar altında ısıtıldı", word: "conditions", trWord: "koşullar", blank: "Under which ___ was the liquid heated" },
    { en: "From which area was the coal obtained", tr: "Kömür hangi bölgeden elde edildi", word: "area", trWord: "bölgeden", blank: "From which ___ was the coal obtained" }
  ],
  7: [
    { en: "Where did he live last year", tr: "Geçen yıl nerede yaşadı", word: "live", trWord: "yaşadı", blank: "Where did he ___ last year" },
    { en: "Why do they perform the experiment", tr: "Deneyi neden yapıyorlar", word: "perform", trWord: "yapıyorlar", blank: "Why do they ___ the experiment" },
    { en: "How does the machine operate", tr: "Makine nasıl çalışır", word: "operate", trWord: "çalışır", blank: "How does the machine ___" },
    { en: "When did the reaction start", tr: "Tepkime ne zaman başladı", word: "start", trWord: "başladı", blank: "When did the reaction ___" },
    { en: "What do scientists believe", tr: "Bilim insanları neye inanır", word: "believe", trWord: "inanır", blank: "What do scientists ___" },
    { en: "Where did you find the measurements", tr: "Ölçümleri nerede buldun", word: "find", trWord: "buldun", blank: "Where did you ___ the measurements" },
    { en: "Why did the accident happen", tr: "Kaza neden gerçekleşti", word: "happen", trWord: "gerçekleşti", blank: "Why did the accident ___" },
    { en: "When did the temperature increase", tr: "Sıcaklık ne zaman arttı", word: "increase", trWord: "arttı", blank: "When did the temperature ___" },
    { en: "How did they solve the problem", tr: "Problemi nasıl çözdüler", word: "solve", trWord: "çözdüler", blank: "How did they ___ the problem" },
    { en: "Where does the coal exist", tr: "Kömür nerede bulunur", word: "exist", trWord: "bulunur", blank: "Where does the coal ___" },
    { en: "Why do the plants need water", tr: "Bitkiler neden suya ihtiyaç duyar", word: "need", trWord: "ihtiyaç duyar", blank: "Why do the plants ___ water" },
    { en: "How did you measure the volume", tr: "Hacmi nasıl ölçtün", word: "measure", trWord: "ölçtün", blank: "How did you ___ the volume" },
    { en: "When did he write the article", tr: "Makaleyi ne zaman yazdı", word: "write", trWord: "yazdı", blank: "When did he ___ the article" },
    { en: "What does the book mention", tr: "Kitap neden bahseder", word: "mention", trWord: "bahseder", blank: "What does the book ___" },
    { en: "Where did they build the hospital", tr: "Hastaneyi nereye inşa ettiler", word: "build", trWord: "inşa ettiler", blank: "Where did they ___ the hospital" },
    { en: "Why do they change the plan", tr: "Planı neden değiştiriyorlar", word: "change", trWord: "değiştiriyorlar", blank: "Why do they ___ the plan" }
  ]
};

const unit9Lesson1SentencesRaw = [
  { en: "Is the data valid?", tr: "Veri geçerli midir?", word: "valid", trWord: "geçerli", blank: "Is the data ___?" },
  { en: "Are the documents ready?", tr: "Belgeler hazır mıdır?", word: "ready", trWord: "hazır", blank: "Are the documents ___?" },
  { en: "Was the concept clear?", tr: "Kavram açık mıydı?", word: "clear", trWord: "açık", blank: "Was the concept ___?" },
  { en: "Were the methods standards?", tr: "Yöntemler standart mıydı?", word: "standards", trWord: "standart", blank: "Were the methods ___?" },
  { en: "Is the author present?", tr: "Yazar mevcut mudur?", word: "present", trWord: "mevcut", blank: "Is the author ___?" },
  { en: "Are the factors internal?", tr: "Faktörler içsel midir?", word: "internal", trWord: "içsel", blank: "Are the factors ___?" },
  { en: "Was the response negative?", tr: "Yanıt olumsuz muydu?", word: "negative", trWord: "olumsuz", blank: "Was the response ___?" },
  { en: "Were the criteria strict?", tr: "Kriterler katı mıydı?", word: "strict", trWord: "katı", blank: "Were the criteria ___?" },
  { en: "Is the sector growing?", tr: "Sektör büyüyor mu?", word: "growing", trWord: "büyüyor", blank: "Is the sector ___?" },
  { en: "Are you the analyst?", tr: "Siz analist misiniz?", word: "analyst", trWord: "analist", blank: "Are you the ___?" },
  { en: "Is the legal framework sufficient for this case?", tr: "Yasal çerçeve bu dava için yeterli midir?", word: "framework", trWord: "çerçeve", blank: "Is the legal ___ sufficient for this case?" },
  { en: "Are the economic indicators stable this month?", tr: "Ekonomik göstergeler bu ay istikrarlı mıdır?", word: "stable", trWord: "istikrarlı", blank: "Are the economic indicators ___ this month?" },
  { en: "Was the initial assessment fully accurate?", tr: "İlk değerlendirme tamamen doğru muydu?", word: "assessment", trWord: "değerlendirme", blank: "Was the initial ___ fully accurate?" },
  { en: "Were the specific sources verified by experts?", tr: "Belirli kaynaklar uzmanlar tarafından doğrulandı mı?", word: "verified", trWord: "doğrulandı", blank: "Were the specific sources ___ by experts?" },
  { en: "Is the financial structure completely transparent?", tr: "Finansal yapı tamamen şeffaf mıdır?", word: "structure", trWord: "yapı", blank: "Is the financial ___ completely transparent?" },
  { en: "Are the individual variables controlled well?", tr: "Bireysel değişkenler iyi kontrol ediliyor mu?", word: "variables", trWord: "değişkenler", blank: "Are the individual ___ controlled well?" },
  { en: "Was the primary benefit clearly identified?", tr: "Temel fayda açıkça belirlendi mi?", word: "benefit", trWord: "fayda", blank: "Was the primary ___ clearly identified?" },
  { en: "Were the environmental factors considered?", tr: "Çevresel faktörler dikkate alındı mı?", word: "factors", trWord: "faktörler", blank: "Were the environmental ___ considered?" },
  { en: "Is the final outcome satisfactory for everyone?", tr: "Nihai sonuç herkes için tatmin edici midir?", word: "outcome", trWord: "sonuç", blank: "Is the final ___ satisfactory for everyone?" },
  { en: "Are these academic journals peer-reviewed?", tr: "Bu akademik dergiler hakemli midir?", word: "academic", trWord: "akademik", blank: "Are these ___ journals peer-reviewed?" },
  { en: "Is the methodological approach relevant to the current study?", tr: "Metodolojik yaklaşım mevcut çalışma ile ilgili midir?", word: "approach", trWord: "yaklaşım", blank: "Is the methodological ___ relevant to the current study?" },
  { en: "Are the statistical computations available for public review?", tr: "İstatistiksel hesaplamalar kamuya açık inceleme için mevcut mudur?", word: "available", trWord: "mevcut", blank: "Are the statistical computations ___ for public review?" },
  { en: "Was the constitutional amendment approved by the parliament?", tr: "Anayasa değişikliği parlamento tarafından onaylandı mı?", word: "amendment", trWord: "değişiklik", blank: "Was the constitutional ___ approved by the parliament?" },
  { en: "Were the administrative procedures followed during the crisis?", tr: "Kriz sırasında idari prosedürler takip edildi mi?", word: "procedures", trWord: "prosedürler", blank: "Were the administrative ___ followed during the crisis?" },
  { en: "Is the theoretical assumption supported by empirical evidence?", tr: "Teorik varsayım ampirik kanıtlarla destekleniyor mu?", word: "assumption", trWord: "varsayım", blank: "Is the theoretical ___ supported by empirical evidence?" },
  { en: "Are the global distribution networks functional right now?", tr: "Küresel dağıtım ağları şu anda işlevsel midir?", word: "distribution", trWord: "dağıtım", blank: "Are the global ___ networks functional right now?" },
  { en: "Was the historical document genuine according to analysts?", tr: "Tarihsel belge analistlere göre orijinal miydi?", word: "analysts", trWord: "analistlere", blank: "Was the historical document genuine according to ___?" },
  { en: "Were the experimental results consistent across all trials?", tr: "Deneysel sonuçlar tüm denemelerde tutarlı mıydı?", word: "consistent", trWord: "tutarlı", blank: "Were the experimental results ___ across all trials?" },
  { en: "Is the institutional framework adaptable to new legislation?", tr: "Kurumsal çerçeve yeni mevzuata uyarlanabilir mi?", word: "legislation", trWord: "mevzuata", blank: "Is the institutional framework adaptable to new ___?" },
  { en: "Are the demographic categories exclusive in this research?", tr: "Bu araştırmada demografik kategoriler birbirini dışlayıcı mıdır?", word: "categories", trWord: "kategoriler", blank: "Are the demographic ___ exclusive in this research?" }
];


const unit9Lesson2SentencesRaw = [
  { en: "Did you analyze it?", tr: "Onu analiz ettin mi?", word: "analyze", trWord: "analiz ettin", blank: "Did you ___ it?" },
  { en: "Does it function well?", tr: "İyi çalışıyor mu?", word: "function", trWord: "çalışıyor", blank: "Does it ___ well?" },
  { en: "Do they export goods?", tr: "Mal ihraç ediyorlar mı?", word: "export", trWord: "ihraç ediyorlar", blank: "Do they ___ goods?" },
  { en: "Did he publish the book?", tr: "Kitabı yayımladı mı?", word: "publish", trWord: "yayımladı", blank: "Did he ___ the book?" },
  { en: "Does she assume the risk?", tr: "Riski üstleniyor mu?", word: "assume", trWord: "üstleniyor", blank: "Does she ___ the risk?" },
  { en: "Do we require a permit?", tr: "İzin belgesi gerekiyor mu?", word: "require", trWord: "gerekiyor", blank: "Do we ___ a permit?" },
  { en: "Did it indicate a change?", tr: "Bir değişiklik gösterdi mi?", word: "indicate", trWord: "gösterdi", blank: "Did it ___ a change?" },
  { en: "Does this derive from code?", tr: "Bu, kuraldan mı türiyor?", word: "derive", trWord: "türiyor", blank: "Does this ___ from code?" },
  { en: "Do they source materials locally?", tr: "Malzemeleri yerel olarak mı tedarik ediyorlar?", word: "source", trWord: "tedarik ediyorlar", blank: "Do they ___ materials locally?" },
  { en: "Did you estimate the cost?", tr: "Maliyeti tahmin ettin mi?", word: "estimate", trWord: "tahmin ettin", blank: "Did you ___ the cost?" },
  { en: "Did the analyst evaluate the raw data?", tr: "Analist ham veriyi değerlendirdi mi?", word: "evaluate", trWord: "değerlendirdi", blank: "Did the analyst ___ the raw data?" },
  { en: "Does the government modify the tax policy?", tr: "Hükümet vergi politikasını değiştiriyor mu?", word: "modify", trWord: "değiştiriyor", blank: "Does the government ___ the tax policy?" },
  { en: "Do researchers establish a clear framework?", tr: "Araştırmacılar net bir çerçeve kuruyor mu?", word: "establish", trWord: "kuruyor", blank: "Do researchers ___ a clear framework?" },
  { en: "Did the committee exclude the final report?", tr: "Komite nihai raporu hariç tuttu mu?", word: "exclude", trWord: "hariç tuttu", blank: "Did the committee ___ the final report?" },
  { en: "Does this factor influence the public opinion?", tr: "Bu faktör kamuoyunu etkiliyor mu?", word: "influence", trWord: "etkiliyor", blank: "Does this factor ___ the public opinion?" },
  { en: "Do institutions structure their academic curriculum?", tr: "Kurumlar akademik müfredatlarını yapılandırıyor mu?", word: "structure", trWord: "yapılandırıyor", blank: "Do institutions ___ their academic curriculum?" },
  { en: "Did the team integrate the new software?", tr: "Ekip yeni yazılımı entegre etti mi?", word: "integrate", trWord: "entegre etti", blank: "Did the team ___ the new software?" },
  { en: "Does the theory define the phenomenon correctly?", tr: "Teori olguyu doğru tanımlıyor mu?", word: "define", trWord: "tanımlıyor", blank: "Does the theory ___ the phenomenon correctly?" },
  { en: "Do companies achieve their annual production goals?", tr: "Şirketler yıllık üretim hedeflerine ulaşıyor mu?", word: "achieve", trWord: "ulaşıyor", blank: "Do companies ___ their annual production goals?" },
  { en: "Did the manager adjust the financial budget?", tr: "Müdür finansal bütçeyi ayarladı mı?", word: "adjust", trWord: "ayarladı", blank: "Did the manager ___ the financial budget?" },
  { en: "Did the administration abolish the controversial labor legislation?", tr: "Yönetim tartışmalı iş mevzuatını kaldırdı mı?", word: "abolish", trWord: "kaldırdı", blank: "Did the administration ___ the controversial labor legislation?" },
  { en: "Does the regional economy affect the minority distribution?", tr: "Bölgesel ekonomi azınlık dağılımını etkiliyor mu?", word: "affect", trWord: "etkiliyor", blank: "Does the regional economy ___ the minority distribution?" },
  { en: "Do separate departments allocate their resources independently?", tr: "Ayrı departmanlar kaynaklarını bağımsız olarak mı tahsis ediyor?", word: "allocate", trWord: "tahsis ediyor", blank: "Do separate departments ___ their resources independently?" },
  { en: "Did the university adopt the progressive assessment model?", tr: "Üniversite ilerici değerlendirme modelini benimsedi mi?", word: "adopt", trWord: "benimsedi", blank: "Did the university ___ the progressive assessment model?" },
  { en: "Does this specific variable alter the final analysis?", tr: "Bu özel değişken nihai analizi değiştiriyor mu?", word: "alter", trWord: "değiştiriyor", blank: "Does this specific variable ___ the final analysis?" },
  { en: "Do modern societies sustain their unique cultural identity?", tr: "Modern toplumlar benzersiz kültürel kimliklerini sürdürüyor mu?", word: "sustain", trWord: "sürdürüyor", blank: "Do modern societies ___ their unique cultural identity?" },
  { en: "Did the supreme court challenge the legal definition today?", tr: "Anayasa Mahkemesi bugün yasal tanımı sorguladı mı?", word: "challenge", trWord: "sorguladı", blank: "Did the supreme court ___ the legal definition today?" },
  { en: "Does the ancient text imply rigid social structures?", tr: "Antik metin katı sosyal yapılar mı ima ediyor?", word: "imply", trWord: "ima ediyor", blank: "Does the ancient text ___ rigid social structures?" },
  { en: "Do laboratory technicians conduct the primary safety experiment?", tr: "Laboratuvar teknisyenleri temel güvenlik deneyini yürütüyor mu?", word: "conduct", trWord: "yürütüyor", blank: "Do laboratory technicians ___ the primary safety experiment?" },
  { en: "Did the participants interpret the survey instructions accurately?", tr: "Katılımcılar anket yönergelerini doğru yorumladı mı?", word: "interpret", trWord: "yorumladı", blank: "Did the participants ___ the survey instructions accurately?" }
];


const unit9Lesson3SentencesRaw = [
  { en: "Why is the data wrong?", tr: "Veri neden yanlıştır?", word: "wrong", trWord: "yanlıştır", blank: "Why is the data ___?" },
  { en: "Where are the documents?", tr: "Belgeler nerededir?", word: "Where", trWord: "nerededir", blank: "___ are the documents?" },
  { en: "What was the concept?", tr: "Kavram neydi?", word: "What", trWord: "neydi", blank: "___ was the concept?" },
  { en: "How is the method?", tr: "Yöntem nasıldır?", word: "How", trWord: "nasıldır", blank: "___ is the method?" },
  { en: "Who was the author?", tr: "Yazar kimdi?", word: "Who", trWord: "kimdi", blank: "___ was the author?" },
  { en: "Why were the factors dynamic?", tr: "Faktörler neden dinamikti?", word: "dynamic", trWord: "dinamikti", blank: "Why were the factors ___?" },
  { en: "Where is the sector?", tr: "Sektör nerededir?", word: "Where", trWord: "nerededir", blank: "___ is the sector?" },
  { en: "What is the percentage?", tr: "Yüzde kaçtır?", word: "percentage", trWord: "yüzde", blank: "What is the ___?" },
  { en: "How was the response?", tr: "Yanıt nasıldı?", word: "response", trWord: "yanıt", blank: "How was the ___?" },
  { en: "Who is the analyst?", tr: "Analist kimdir?", word: "analyst", trWord: "analist", blank: "Who is the ___?" },
  { en: "Why are the legal criteria so rigid?", tr: "Yasal kriterler neden bu kadar katıdır?", word: "rigid", trWord: "katıdır", blank: "Why are the legal criteria so ___?" },
  { en: "What will be the primary benefit?", tr: "Temel fayda ne olacaktır?", word: "benefit", trWord: "fayda", blank: "What will be the primary ___?" },
  { en: "How is the financial structure today?", tr: "Bugün finansal yapı nasıldır?", word: "structure", trWord: "yapı", blank: "How is the financial ___ today?" },
  { en: "Where were the specific sources found?", tr: "Belirli kaynaklar nerede bulundu?", word: "found", trWord: "bulundu", blank: "Where were the specific sources ___?" },
  { en: "Why is the initial assessment incomplete?", tr: "İlk değerlendirme neden eksiktir?", word: "assessment", trWord: "değerlendirme", blank: "Why is the initial ___ incomplete?" },
  { en: "What can be the potential outcome?", tr: "Potansiyel sonuç ne olabilir?", word: "outcome", trWord: "sonuç", blank: "What can be the potential ___?" },
  { en: "Who is the principal investigator here?", tr: "Buradaki asıl araştırmacı kimdir?", word: "investigator", trWord: "araştırmacı", blank: "Who is the principal ___ here?" },
  { en: "How were the variables so unpredictable?", tr: "Değişkenler nasıl bu kadar tahmin edilemezdi?", word: "variables", trWord: "değişkenler", blank: "How were the ___ so unpredictable?" },
  { en: "What is the major function of this?", tr: "Bunun ana işlevi nedir?", word: "function", trWord: "işlevi", blank: "What is the major ___ of this?" },
  { en: "Where are the individual responses?", tr: "Bireysel yanıtlar nerededir?", word: "responses", trWord: "yanıtlar", blank: "Where are the individual ___?" },
  { en: "Why is the theoretical framework of this study unstable?", tr: "Bu çalışmanın teorik çerçevesi neden istikrarsızdır?", word: "framework", trWord: "çerçevesi", blank: "Why is the theoretical ___ of this study unstable?" },
  { en: "What was the ultimate constitutional authority of the state?", tr: "Devletin nihai anayasal yetkisi neydi?", word: "authority", trWord: "yetkisi", blank: "What was the ultimate constitutional ___ of the state?" },
  { en: "How are the economic indicators relevant to this region?", tr: "Ekonomik göstergeler bu bölgeyle nasıl ilgilidir?", word: "indicators", trWord: "göstergeler", blank: "How are the economic ___ relevant to this region?" },
  { en: "Where is the administrative policy document located now?", tr: "İdari politika belgesi şimdi nerede bulunuyor?", word: "located", trWord: "bulunuyor", blank: "Where is the administrative policy document ___ now?" },
  { en: "Why were the environmental factors excluded from the report?", tr: "Çevresel faktörler neden rapordan hariç tutuldu?", word: "excluded", trWord: "hariç tutuldu", blank: "Why were the environmental factors ___ from the report?" },
  { en: "What will be the long-term significance of this discovery?", tr: "Bu keşfin uzun vadeli önemi ne olacaktır?", word: "significance", trWord: "önemi", blank: "What will be the long-term ___ of this discovery?" },
  { en: "How is the statistical analysis useful for predictions?", tr: "İstatistiksel analiz tahminler için nasıl yararlıdır?", word: "analysis", trWord: "analiz", blank: "How is the statistical ___ useful for predictions?" },
  { en: "Who was the original creator of this specific methodology?", tr: "Bu özel metodolojinin özgün yaratıcısı kimdi?", word: "methodology", trWord: "metodolojinin", blank: "Who was the original creator of this specific ___?" },
  { en: "Why is the global distribution of resources so unequal?", tr: "Küresel kaynak dağıtımı neden bu kadar adaletsizdir?", word: "distribution", trWord: "dağıtımı", blank: "Why is the global ___ of resources so unequal?" },
  { en: "What are the primary components of this chemical compound?", tr: "Bu kimyasal bileşiğin birincil bileşenleri nelerdir?", word: "components", trWord: "bileşenleri", blank: "What are the primary ___ of this chemical compound?" }
];


const unit9Lesson4SentencesRaw = [
  { en: "Why did they analyze it?", tr: "Onu neden analiz ettiler?", word: "analyze", trWord: "analiz ettiler", blank: "Why did they ___ it?" },
  { en: "How does it function?", tr: "Nasıl çalışıyor?", word: "function", trWord: "çalışıyor", blank: "How does it ___?" },
  { en: "What did you estimate?", tr: "Neyi tahmin ettiniz?", word: "estimate", trWord: "tahmin ettiniz", blank: "What did you ___?" },
  { en: "Where do they source it?", tr: "Onu nereden tedarik ediyorlar?", word: "source", trWord: "tedarik ediyorlar", blank: "Where do they ___ it?" },
  { en: "When did he publish it?", tr: "Onu ne zaman yayımladı?", word: "publish", trWord: "yayımladı", blank: "When did he ___ it?" },
  { en: "Why does she assume that?", tr: "Bunu neden varsayıyor?", word: "assume", trWord: "varsayıyor", blank: "Why does she ___ that?" },
  { en: "How did you derive this?", tr: "Bunu nasıl türettiniz?", word: "derive", trWord: "türettiniz", blank: "How did you ___ this?" },
  { en: "What does this indicate?", tr: "Bu neyi gösteriyor?", word: "indicate", trWord: "gösteriyor", blank: "What does this ___?" },
  { en: "Where did they establish it?", tr: "Onu nerede kurdular?", word: "establish", trWord: "kurdular", blank: "Where did they ___ it?" },
  { en: "Why do we require this?", tr: "Buna neden ihtiyaç duyuyoruz?", word: "require", trWord: "ihtiyaç duyuyoruz", blank: "Why do we ___ this?" },
  { en: "How did the analyst evaluate the data?", tr: "Analist veriyi nasıl değerlendirdi?", word: "evaluate", trWord: "değerlendirdi", blank: "How did the analyst ___ the data?" },
  { en: "Does the government modify the policy?", tr: "Hükümet politikayı değiştiriyor mu?", word: "modify", trWord: "değiştiriyor", blank: "Does the government ___ the policy?" },
  { en: "What did the researchers achieve last year?", tr: "Araştırmacılar geçen yıl neyi başardı?", word: "achieve", trWord: "başardı", blank: "What did the researchers ___ last year?" },
  { en: "Where do institutions structure the framework?", tr: "Kurumlar çerçeveyi nerede yapılandırıyor?", word: "structure", trWord: "yapılandırıyor", blank: "Where do institutions ___ the framework?" },
  { en: "When did the committee publish the summary?", tr: "Komite özeti ne zaman yayımladı?", word: "publish", trWord: "yayımladı", blank: "When did the committee ___ the summary?" },
  { en: "How does this factor influence the outcome?", tr: "Bu faktör sonucu nasıl etkiliyor?", word: "influence", trWord: "etkiliyor", blank: "How does this factor ___ the outcome?" },
  { en: "Why did the team exclude the respondents?", tr: "Ekip katılımcıları neden hariç tuttu?", word: "exclude", trWord: "hariç tuttu", blank: "Why did the team ___ the respondents?" },
  { en: "What does the theory define exactly?", tr: "Teori tam olarak neyi tanımlıyor?", word: "define", trWord: "tanımlıyor", blank: "What does the theory ___ exactly?" },
  { en: "Where did they integrate the technology?", tr: "Teknolojiyi nereye entegre ettiler?", word: "integrate", trWord: "entegre ettiler", blank: "Where did they ___ the technology?" },
  { en: "Why do companies export their production?", tr: "Şirketler üretimlerini neden ihraç ediyor?", word: "export", trWord: "ihraç ediyor", blank: "Why do companies ___ their production?" },
  { en: "Why did the administration abolish the old regulatory framework?", tr: "Yönetim eski düzenleyici çerçeveyi neden kaldırdı?", word: "abolish", trWord: "kaldırdı", blank: "Why did the administration ___ the old regulatory framework?" },
  { en: "How does the global economy affect domestic resource distribution?", tr: "Küresel ekonomi iç kaynak dağılımını nasıl etkiliyor?", word: "affect", trWord: "etkiliyor", blank: "How does the global economy ___ domestic resource distribution?" },
  { en: "What did the scientific community conclude regarding the data?", tr: "Bilimsel topluluk verilerle ilgili ne sonuç çıkardı?", word: "conclude", trWord: "sonuç çıkardı", blank: "What did the scientific community ___ regarding the data?" },
  { en: "Where do separate departments allocate their annual financial credit?", tr: "Ayrı departmanlar yıllık finansal kredilerini nereye tahsis ediyor?", word: "allocate", trWord: "tahsis ediyor", blank: "Where do separate departments ___ their annual financial credit?" },
  { en: "When did the university adopt the new academic assessment method?", tr: "Üniversite yeni akademik değerlendirme yöntemini ne zaman benimsedi?", word: "adopt", trWord: "benimsedi", blank: "When did the university ___ the new academic assessment method?" },
  { en: "How does this specific variable alter the statistical analysis?", tr: "Bu özel değişken istatistiksel analizi nasıl değiştiriyor?", word: "alter", trWord: "değiştiriyor", blank: "How does this specific variable ___ the statistical analysis?" },
  { en: "Why did the main opposition challenge the legal definition?", tr: "Ana muhalefet yasal tanıma neden karşı çıktı?", word: "challenge", trWord: "karşı çıktı", blank: "Why did the main opposition ___ the legal definition?" },
  { en: "What does the historical text imply about social structures?", tr: "Tarihsel metin toplumsal yapılar hakkında ne ima ediyor?", word: "imply", trWord: "ima ediyor", blank: "What does the historical text ___ about social structures?" },
  { en: "Where did the engineers conduct the primary energy experiment?", tr: "Mühendisler temel enerji deneyini nerede yürüttüler?", word: "conduct", trWord: "yürüttüler", blank: "Where did the engineers ___ the primary energy experiment?" },
  { en: "How do modern societies sustain their cultural identity?", tr: "Modern toplumlar kültürel kimliklerini nasıl sürdürüyor?", word: "sustain", trWord: "sürdürüyor", blank: "How do modern societies ___ their cultural identity?" }
];


const unit9Lesson5SentencesRaw = [
  { en: "At which level is it?", tr: "Hangi düzeydedir?", word: "level", trWord: "düzeydedir", blank: "At which ___ is it?" },
  { en: "In which sector are they?", tr: "Hangi sektördedirler?", word: "sector", trWord: "sektördedirler", blank: "In which ___ are they?" },
  { en: "To what extent was it?", tr: "Ne ölçüdeydi?", word: "extent", trWord: "ölçüdeydi", blank: "To what ___ was it?" },
  { en: "For which purpose is this?", tr: "Bu hangi amaç içindir?", word: "purpose", trWord: "amaç", blank: "For which ___ is this?" },
  { en: "By whose authority was it?", tr: "Kimin yetkisiyleydi?", word: "authority", trWord: "yetkisiyleydi", blank: "By whose ___ was it?" },
  { en: "Under which category are they?", tr: "Hangi kategori altındadırlar?", word: "category", trWord: "kategori", blank: "Under which ___ are they?" },
  { en: "From which source is it?", tr: "Hangi kaynaktandır?", word: "source", trWord: "kaynaktandır", blank: "From which ___ is it?" },
  { en: "In what period was it?", tr: "Hangi dönemdeydi?", word: "period", trWord: "dönemdeydi", blank: "In what ___ was it?" },
  { en: "With which method is it?", tr: "Hangi yöntemledir?", word: "method", trWord: "yöntemledir", blank: "With which ___ is it?" },
  { en: "On whose data was it?", tr: "Kimin verileri üzerindeydi?", word: "data", trWord: "verileri", blank: "On whose ___ was it?" },
  { en: "In which academic journal was it published?", tr: "Hangi akademik dergide yayımlandı?", word: "journal", trWord: "dergide", blank: "In which academic ___ was it published?" },
  { en: "Under what legal criteria were they selected?", tr: "Hangi yasal kriterler altında seçildiler?", word: "criteria", trWord: "kriterler", blank: "Under what legal ___ were they selected?" },
  { en: "For which specific purpose is this required?", tr: "Bu hangi özel amaç için gereklidir?", word: "purpose", trWord: "amaç", blank: "For which specific ___ is this required?" },
  { en: "At what financial percentage was it fixed?", tr: "Hangi finansal yüzdeyle sabitlendi?", word: "percentage", trWord: "yüzdeyle", blank: "At what financial ___ was it fixed?" },
  { en: "From which primary source is this derived?", tr: "Bu hangi birincil kaynaktan türetilmiştir?", word: "source", trWord: "kaynaktan", blank: "From which primary ___ is this derived?" },
  { en: "To what degree are the variables dynamic?", tr: "Değişkenler ne derece dinamiktir?", word: "degree", trWord: "derece", blank: "To what ___ are the variables dynamic?" },
  { en: "With which analytical framework is it compatible?", tr: "Hangi analitik çerçeve ile uyumludur?", word: "framework", trWord: "çerçeve", blank: "With which analytical ___ is it compatible?" },
  { en: "By what assessment method was it evaluated?", tr: "Hangi değerlendirme yöntemiyle değerlendirildi?", word: "assessment", trWord: "değerlendirme", blank: "By what ___ method was it evaluated?" },
  { en: "In which economic sector is the crisis visible?", tr: "Kriz hangi ekonomik sektörde görünürdür?", word: "sector", trWord: "sektörde", blank: "In which economic ___ is the crisis visible?" },
  { en: "On what theoretical assumption is this based?", tr: "Bu hangi teorik varsayıma dayanmaktadır?", word: "assumption", trWord: "varsayıma", blank: "On what theoretical ___ is this based?" },
  { en: "Under which constitutional clause was the law modified?", tr: "Yasa hangi anayasal madde uyarınca değiştirildi?", word: "clause", trWord: "madde", blank: "Under which constitutional ___ was the law modified?" },
  { en: "By what statistical methodology were the figures calculated?", tr: "Rakamlar hangi istatistiksel metodolojiyle hesaplandı?", word: "methodology", trWord: "metodolojiyle", blank: "By what statistical ___ were the figures calculated?" },
  { en: "To what geographic extent is the population distributed?", tr: "Nüfus hangi coğrafi ölçüde dağılmıştır?", word: "extent", trWord: "ölçüde", blank: "To what geographic ___ is the population distributed?" },
  { en: "For whose ultimate benefit was the policy established?", tr: "Politika kimin nihai faydası için oluşturuldu?", word: "benefit", trWord: "faydası", blank: "For whose ultimate ___ was the policy established?" },
  { en: "From which institutional perspective was the text interpreted?", tr: "Metin hangi kurumsal perspektiften yorumlandı?", word: "perspective", trWord: "perspektiften", blank: "From which institutional ___ was the text interpreted?" },
  { en: "In which experimental environment were the plants grown?", tr: "Bitkiler hangi deneysel ortamda yetiştirildi?", word: "environment", trWord: "ortamda", blank: "In which experimental ___ were the plants grown?" },
  { en: "With what administrative authority is the director acting?", tr: "Müdür hangi idari yetkiyle hareket ediyor?", word: "authority", trWord: "yetkiyle", blank: "With what administrative ___ is the director acting?" },
  { en: "At which developmental stage are the data components?", tr: "Veri bileşenleri hangi gelişim aşamasındadır?", word: "stage", trWord: "aşamasındadır", blank: "At which developmental ___ are the data components?" },
  { en: "On which philosophical concept is the framework structured?", tr: "Çerçeve hangi felsefi kavram üzerine yapılandırılmıştır?", word: "concept", trWord: "kavram", blank: "On which philosophical ___ is the framework structured?" },
  { en: "Through what regulatory process was the contract validated?", tr: "Sözleşme hangi düzenleyici süreçle onaylandı?", word: "process", trWord: "süreçle", blank: "Through what regulatory ___ was the contract validated?" }
];


const unit6LessonSentences = {
  1: [
    { en: "Coal is obtained from the mines", tr: "Kömür madenlerden elde edilir", word: "obtained", trWord: "elde edilir", blank: "Coal is ___ from the mines" },
    { en: "The suggestion was accepted immediately", tr: "Öneri derhal kabul edildi", word: "accepted", trWord: "kabul edildi", blank: "The suggestion was ___ immediately" },
    { en: "The substance was added to the liquid", tr: "Madde sıvıya eklendi", word: "added", trWord: "eklendi", blank: "The substance was ___ to the liquid" },
    { en: "The plan was adopted at the meeting", tr: "Plan toplantıda kabul edildi", word: "adopted", trWord: "kabul edildi", blank: "Plan was ___ at the meeting" },
    { en: "The amount was estimated at 2.5 grams", tr: "Miktar 2.5 gram olarak tahmin edildi", word: "estimated", trWord: "tahmin edildi", blank: "The amount was ___ at 2.5 grams" },
    { en: "This new method was applied in the experiment", tr: "Bu yeni yöntem deneyde uygulandı", word: "applied", trWord: "uygulandı", blank: "This new method was ___ in the experiment" },
    { en: "The amount of liquid was measured", tr: "Sıvı miktarı ölçüldü", word: "measured", trWord: "ölçüldü", blank: "The amount of liquid was ___" },
    { en: "An ancient civilisation was discovered", tr: "Kadim bir uygarlık keşfedildi", word: "discovered", trWord: "keşfedildi", blank: "An ancient civilisation was ___" },
    { en: "The discoveries were classified in three categories", tr: "Keşifler üç kategoride sınıflandırıldı", word: "classified", trWord: "sınıflandırıldı", blank: "The discoveries were ___ in three categories" },
    { en: "The results of all experiments were classified", tr: "Tüm deneylerin sonuçları sınıflandırıldı", word: "classified", trWord: "sınıflandırıldı", blank: "The results of all experiments were ___" },
    { en: "The mixture was composed of cement and sand", tr: "Karışım çimento ve kumdan oluşuyordu", word: "composed", trWord: "oluşuyordu", blank: "The mixture was ___ of cement and sand" },
    { en: "War was prevented between the two nations", tr: "İki ulus arasında savaş önlendi", word: "prevented", trWord: "önlendi", blank: "War was ___ between the two nations" },
    { en: "The gas is absorbed by the liquid", tr: "Gaz sıvı tarafından emilir", word: "absorbed", trWord: "emilir", blank: "The gas is ___ by the liquid" },
    { en: "Good results were achieved in this field", tr: "Bu alanda iyi sonuçlar elde edildi", word: "achieved", trWord: "elde edildi", blank: "Good results were ___ in this field" },
    { en: "The machine was adjusted for the test", tr: "Makine test için ayarlandı", word: "adjusted", trWord: "ayarlandı", blank: "The machine was ___ for the test" },
    { en: "The changes were approved by the committee", tr: "Değişiklikler komite tarafından onaylandı", word: "approved", trWord: "onaylandı", blank: "The changes were ___ by the committee" }
  ],
  2: [
    { en: "The gas has been absorbed by the liquid", tr: "Gaz sıvı tarafından absorbe edilmiştir", word: "absorbed", trWord: "absorbe edilmiştir", blank: "The gas has been ___ by the liquid" },
    { en: "The law has been abolished recently", tr: "Yasa yakın zamanda kaldırılmıştır", word: "abolished", trWord: "kaldırılmıştır", blank: "The law has been ___ recently" },
    { en: "Good results have been achieved in this field", tr: "Bu alanda iyi sonuçlar elde edilmiştir", word: "achieved", trWord: "elde edilmiştir", blank: "Good results have been ___ in this field" },
    { en: "The machine has been adjusted", tr: "Makine ayarlanmıştır", word: "adjusted", trWord: "ayarlanmıştır", blank: "The machine has been ___" },
    { en: "The plans have been changed", tr: "Planlar değiştirilmiştir", word: "changed", trWord: "değiştirilmiştir", blank: "The plans have been ___" },
    { en: "A new development has been achieved", tr: "Yeni bir gelişme kaydedilmiştir", word: "achieved", trWord: "kaydedilmiştir", blank: "A new development has been ___" },
    { en: "Community life has been developed", tr: "Topluluk yaşamı geliştirilmiştir", word: "developed", trWord: "geliştirilmiştir", blank: "Community life has been ___" },
    { en: "A new sugar factory will be built here", tr: "Buraya yeni bir şeker fabrikası kurulacak", word: "built", trWord: "kurulacak", blank: "A new sugar factory will be ___ here" },
    { en: "Their plans will be changed", tr: "Onların planları değiştirilecek", word: "changed", trWord: "değiştirilecek", blank: "Their plans will be ___" },
    { en: "The documents will be prepared tomorrow", tr: "Belgeler yarın hazırlanacak", word: "prepared", trWord: "hazırlanacak", blank: "The documents will be ___ tomorrow" },
    { en: "The temperature has been measured", tr: "Sıcaklık ölçülmüştür", word: "measured", trWord: "ölçülmüştür", blank: "The temperature has been ___" },
    { en: "New methods will be approved by the scientists", tr: "Yeni yöntemler bilim insanları tarafından onaylanacak", word: "approved", trWord: "onaylanacak", blank: "New methods will be ___ by the scientists" },
    { en: "The mixture will be heated in the tube", tr: "Karışım tüpte ısıtılacak", word: "heated", trWord: "ısıtılacak", blank: "The mixture will be ___ in the tube" },
    { en: "No difference has been observed in the results", tr: "Sonuçlarda hiçbir fark gözlenmemiştir", word: "observed", trWord: "gözlenmemiştir", blank: "No difference has been ___ in the results" },
    { en: "The problem will be solved in this way", tr: "Sorun bu şekilde çözülecektir", word: "solved", trWord: "çözülecektir", blank: "The problem will be ___ in this way" },
    { en: "The resources have been distributed equally", tr: "Kaynaklar eşit olarak dağıtılmıştır", word: "distributed", trWord: "dağıtılmıştır", blank: "The resources have been ___ equally" }
  ],
  3: [
    { en: "Water can be absorbed", tr: "Su absorbe edilebilir", word: "absorbed", trWord: "absorbe edilebilir", blank: "Water can be ___" },
    { en: "Coal may be obtained", tr: "Kömür elde edilebilir", word: "obtained", trWord: "elde edilebilir", blank: "Coal may be ___" },
    { en: "The law may be abolished", tr: "Yasa kaldırılabilir", word: "abolished", trWord: "kaldırılabilir", blank: "The law may be ___" },
    { en: "His suggestion might be accepted", tr: "Onun önerisi kabul edilebilir", word: "accepted", trWord: "kabul edilebilir", blank: "His suggestion might be ___" },
    { en: "Good results will be obtained", tr: "İyi sonuçlar elde edilecek", word: "obtained", trWord: "elde edilecek", blank: "Good results will be ___" },
    { en: "The machine will be adjusted", tr: "Makine ayarlanacak", word: "adjusted", trWord: "ayarlanacak", blank: "The machine will be ___" },
    { en: "The substance should be added", tr: "Madde eklenmelidir", word: "added", trWord: "eklenmelidir", blank: "The substance should be ___" },
    { en: "The plan will be adopted", tr: "Plan kabul edilecek", word: "adopted", trWord: "kabul edilecek", blank: "The plan will be ___" },
    { en: "Their plans may be changed", tr: "Planları değiştirilebilir", word: "changed", trWord: "değiştirilebilir", blank: "Their plans may be ___" },
    { en: "War may be prevented", tr: "Savaş önlenebilir", word: "prevented", trWord: "önlenebilir", blank: "War may be ___" },
    { en: "The amount must be measured", tr: "Miktar ölçülmelidir", word: "measured", trWord: "ölçülmelidir", blank: "The amount must be ___" },
    { en: "The discoveries must be classified", tr: "Keşifler sınıflandırılmalıdır", word: "classified", trWord: "sınıflandırılmalıdır", blank: "The discoveries must be ___" },
    { en: "The results must be classified", tr: "Sonuçlar sınıflandırılmalıdır", word: "classified", trWord: "sınıflandırılmalıdır", blank: "The results must be ___" },
    { en: "The mixture should be heated", tr: "Karışım ısıtılmalıdır", word: "heated", trWord: "ısıtılmalıdır", blank: "The mixture should be ___" },
    { en: "Community life may be observed", tr: "Topluluk yaşamı gözlemlenebilir", word: "observed", trWord: "gözlemlenebilir", blank: "Community life may be ___" },
    { en: "New developments will be observed", tr: "Yeni gelişmeler gözlemlenecek", word: "observed", trWord: "gözlemlenecek", blank: "New developments will be ___" }
  ],
  4: [
    { en: "The aims will soon be accomplished", tr: "Amaçlar yakında gerçekleştirilecek", word: "soon", trWord: "yakında", blank: "The aims will ___ be accomplished" },
    { en: "The arrangement has not yet been decided", tr: "Düzenlemeye henüz karar verilmedi", word: "yet", trWord: "henüz", blank: "The arrangement has not ___ been decided" },
    { en: "The attempts will immediately be confirmed", tr: "Girişimler derhal onaylanacak", word: "immediately", trWord: "derhal", blank: "The attempts will ___ be confirmed" },
    { en: "The wires have not yet been connected", tr: "Teller henüz bağlanmadı", word: "yet", trWord: "henüz", blank: "The wires have not ___ been connected" },
    { en: "The cost has not yet been calculated", tr: "Maliyet henüz hesaplanmadı", word: "yet", trWord: "henüz", blank: "The cost has not ___ been calculated" },
    { en: "The disease will eventually be determined", tr: "Hastalık nihayetinde belirlenecek", word: "eventually", trWord: "nihayetinde", blank: "The disease will ___ be determined" },
    { en: "The situation has not yet been discussed", tr: "Durum henüz tartışılmadı", word: "yet", trWord: "henüz", blank: "The situation has not ___ been discussed" },
    { en: "Increase in production must eventually be achieved", tr: "Üretimdeki artış nihayetinde gerçekleştirilmelidir", word: "eventually", trWord: "nihayetinde", blank: "Increase in production must ___ be achieved" },
    { en: "The distribution was first shown on a map", tr: "Dağılım ilk kez bir harita üzerinde gösterildi", word: "first", trWord: "ilk kez", blank: "The distribution was ___ shown on a map" },
    { en: "The difference cannot yet be distinguished", tr: "Fark henüz ayırt edilemiyor", word: "yet", trWord: "henüz", blank: "The difference cannot ___ be distinguished" },
    { en: "The distinction will doubtless be discussed", tr: "Ayrım şüphesiz tartışılacaktır", word: "doubtless", trWord: "şüphesiz", blank: "The distinction will ___ be discussed" },
    { en: "The education was previously neglected", tr: "Eğitim daha önce ihmal edilmişti", word: "previously", trWord: "daha önce", blank: "The education was ___ neglected" },
    { en: "The frontiers have frequently been disputed", tr: "Sınırlar sık sık ihtilaflı olmuştur", word: "frequently", trWord: "sık sık", blank: "The frontiers have ___ been disputed" },
    { en: "Responsibilities must always be carried out", tr: "Sorumluluklar her zaman yerine getirilmelidir", word: "always", trWord: "her zaman", blank: "Responsibilities must ___ be carried out" },
    { en: "This species was first identified by a naturalist", tr: "Bu tür ilk kez bir doğa bilimci tarafından tanımlandı", word: "first", trWord: "ilk kez", blank: "This species was ___ identified by a naturalist" },
    { en: "These species are never included in that category", tr: "Bu türler o kategoriye asla dahil edilmez", word: "never", trWord: "asla", blank: "These species are ___ included in that category" }
  ]
};

function ensurePunctuation(str) {
  if (!str) return "";
  const trimmed = str.trim();
  if (trimmed.endsWith('?') || trimmed.endsWith('.') || trimmed.endsWith('!')) return trimmed;
  return trimmed + ".";
}

function buildInterleavedQuestions(unitId, lessonId, sentences) {
  const qList = [];

  // 1. Her ders eşleştirme sorularıyla başlasın. En az 2 soru olarak. Ve bölüm kelimelerini sorsun.
  // İlk eşleştirme sorusu: Kelimeler (trWord ve word)
  const vocabSents1 = sentences.slice(0, 4);
  if (vocabSents1.length >= 2) {
    const pairsInit1 = vocabSents1.map(s => ({
      left: s.trWord || s.word,
      right: s.word
    }));
    qList.push({
      id: `u${unitId}l${lessonId}qMatchInit1`,
      type: "matching",
      prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
      pairs: pairsInit1
    });
  }

  // İkinci eşleştirme sorusu: İfadeler (tr ve en) - çeviri tarzında
  const vocabSents2 = sentences.slice(4, 8);
  if (vocabSents2.length >= 2) {
    const pairsInit2 = vocabSents2.map(s => ({
      left: s.tr,
      right: s.en
    }));
    qList.push({
      id: `u${unitId}l${lessonId}qMatchInit2`,
      type: "matching",
      prompt: "İfadeleri Türkçe karşılıklarıyla eşleştirin.",
      pairs: pairsInit2
    });
  }

  // 2. Interleaved / Döngüsel Sorular
  const maxSteps = Math.floor(sentences.length / 4);
  for (let step = 0; step < maxSteps; step++) {
    // a. Çoktan Seçmeli
    const sA = sentences[step * 4];
    const isEngToTr_A = (step % 2 === 0);
    const wrongSentences_A = sentences.filter(s => s.en !== sA.en);
    const shuffledWrongs_A = [...wrongSentences_A].sort(() => Math.random() - 0.5);
    while (shuffledWrongs_A.length < 3) {
      shuffledWrongs_A.push({ en: "test", tr: "test", word: "test", trWord: "test" });
    }
    let promptA, optionsA, correctIndexA;
    if (isEngToTr_A) {
      promptA = `"${ensurePunctuation(sA.en)}" cümlesinin Türkçe karşılığı hangisidir?`;
      optionsA = [
        ensurePunctuation(sA.tr),
        ensurePunctuation(shuffledWrongs_A[0].tr),
        ensurePunctuation(shuffledWrongs_A[1].tr),
        ensurePunctuation(shuffledWrongs_A[2].tr)
      ].sort(() => Math.random() - 0.5);
      correctIndexA = optionsA.indexOf(ensurePunctuation(sA.tr));
    } else {
      promptA = `"${ensurePunctuation(sA.tr)}" cümlesinin İngilizce karşılığı hangisidir?`;
      optionsA = [
        ensurePunctuation(sA.en),
        ensurePunctuation(shuffledWrongs_A[0].en),
        ensurePunctuation(shuffledWrongs_A[1].en),
        ensurePunctuation(shuffledWrongs_A[2].en)
      ].sort(() => Math.random() - 0.5);
      correctIndexA = optionsA.indexOf(ensurePunctuation(sA.en));
    }
    qList.push({
      id: `u${unitId}l${lessonId}q${step * 4 + 1}`,
      type: "multiple-choice",
      prompt: promptA,
      options: optionsA,
      correctIndex: correctIndexA,
      enSentence: sA.en,
      isEngToTr: isEngToTr_A
    });

    // b. Eşleştirme
    const matchSents = sentences.slice(step * 4, step * 4 + 4);
    if (matchSents.length >= 2) {
      const pairsB = matchSents.map(s => ({
        left: s.trWord || s.word,
        right: s.word
      }));
      qList.push({
        id: `u${unitId}l${lessonId}q${step * 4 + 2}`,
        type: "matching",
        prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
        pairs: pairsB
      });
    }

    // c. Cümle Tamamlama (Dropdown)
    const sC = sentences[step * 4 + 2];
    const otherWords_C = sentences.filter(s => s.word !== sC.word).map(s => s.word);
    const uniqueWrongWords_C = [...new Set(otherWords_C)];
    const shuffledWrongs_C = uniqueWrongWords_C.sort(() => Math.random() - 0.5);
    while (shuffledWrongs_C.length < 3) {
      shuffledWrongs_C.push("something");
    }
    const optionsC = [sC.word, shuffledWrongs_C[0], shuffledWrongs_C[1], shuffledWrongs_C[2]].sort(() => Math.random() - 0.5);
    qList.push({
      id: `u${unitId}l${lessonId}q${step * 4 + 3}`,
      type: "fill-blank-dropdown",
      prompt: `Cümleyi tamamlayın: "${ensurePunctuation(sC.tr)}"`,
      sentence: sC.blank || sC.en.replace(sC.word, "___"),
      options: optionsC,
      correctIndex: optionsC.indexOf(sC.word),
      enSentence: sC.en
    });

    // d. Karışık Sıralama (Word Bank)
    const sD = sentences[step * 4 + 3];
    const isEngToTr_D = (step % 2 === 0);
    let promptD, translationD, wordsD, correctOrderD;
    if (isEngToTr_D) {
      promptD = "Cümlenin Türkçe karşılığını oluşturun:";
      translationD = ensurePunctuation(sD.en);
      const targetWords = sD.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
      const allOtherTrWords = sentences.filter(s => s.en !== sD.en).map(s => s.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))).flat();
      const uniqueDistractors = [...new Set(allOtherTrWords)].filter(w => !targetWords.includes(w));
      const shuffledDistractors = uniqueDistractors.sort(() => Math.random() - 0.5);
      while (shuffledDistractors.length < 3) {
        shuffledDistractors.push("ve");
      }
      wordsD = [...targetWords, shuffledDistractors[0], shuffledDistractors[1], shuffledDistractors[2]].sort(() => Math.random() - 0.5);
      correctOrderD = targetWords;
    } else {
      promptD = "Cümlenin İngilizce karşılığını oluşturun:";
      translationD = ensurePunctuation(sD.tr);
      const targetWords = sD.en.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
      const allOtherEnWords = sentences.filter(s => s.en !== sD.en).map(s => s.en.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))).flat();
      const uniqueDistractors = [...new Set(allOtherEnWords)].filter(w => !targetWords.includes(w));
      const shuffledDistractors = uniqueDistractors.sort(() => Math.random() - 0.5);
      while (shuffledDistractors.length < 3) {
        shuffledDistractors.push("the");
      }
      wordsD = [...targetWords, shuffledDistractors[0], shuffledDistractors[1], shuffledDistractors[2]].sort(() => Math.random() - 0.5);
      correctOrderD = targetWords;
    }
    qList.push({
      id: `u${unitId}l${lessonId}q${step * 4 + 4}`,
      type: "word-bank",
      prompt: promptD,
      translation: translationD,
      words: wordsD,
      correctOrder: correctOrderD,
      enSentence: sD.en,
      isEngToTr: isEngToTr_D
    });
  }

  // Ayrıca her derste artı olarak derste kullanılan kelimeler eşleştirme sorusu olarak sorulsun.
  const extraSents = [...sentences].sort(() => Math.random() - 0.5).slice(0, 4);
  if (extraSents.length >= 2) {
    const extraPairs = extraSents.map(s => ({
      left: s.trWord || s.word,
      right: s.word
    }));
    qList.push({
      id: `u${unitId}l${lessonId}qExtra`,
      type: "matching",
      prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
      pairs: extraPairs
    });
  }

  return qList;
}

function buildReviewQuestions(unitId, lessonId, sentencesMix) {
  const qList = [];
  const count = sentencesMix.length;
  for (let i = 0; i < count; i++) {
    const s = sentencesMix[i];
    const typeIndex = i % 6;
    if (typeIndex === 0) {
      const wrongSentences = sentencesMix.filter(x => x.en !== s.en);
      const shuffledWrongs = [...wrongSentences].sort(() => Math.random() - 0.5);
      const isEngToTr = (i % 2 === 0);
      let prompt, options, correctIndex;
      if (isEngToTr) {
        prompt = `"${ensurePunctuation(s.en)}" cümlesinin Türkçe karşılığı hangisidir?`;
        options = [
          ensurePunctuation(s.tr),
          ensurePunctuation(shuffledWrongs[0].tr),
          ensurePunctuation(shuffledWrongs[1].tr),
          ensurePunctuation(shuffledWrongs[2].tr)
        ].sort(() => Math.random() - 0.5);
        correctIndex = options.indexOf(ensurePunctuation(s.tr));
      } else {
        prompt = `"${ensurePunctuation(s.tr)}" cümlesinin İngilizce karşılığı hangisidir?`;
        options = [
          ensurePunctuation(s.en),
          ensurePunctuation(shuffledWrongs[0].en),
          ensurePunctuation(shuffledWrongs[1].en),
          ensurePunctuation(shuffledWrongs[2].en)
        ].sort(() => Math.random() - 0.5);
        correctIndex = options.indexOf(ensurePunctuation(s.en));
      }
      qList.push({
        id: `u${unitId}l${lessonId}q${i + 1}`,
        type: "multiple-choice",
        prompt: prompt,
        options: options,
        correctIndex: correctIndex,
        enSentence: s.en,
        isEngToTr: isEngToTr
      });
    } else if (typeIndex === 1) {
      const otherWords = sentencesMix.filter(x => x.word !== s.word).map(x => x.word);
      const uniqueWrongs = [...new Set(otherWords)].sort(() => Math.random() - 0.5);
      const options = [s.word, uniqueWrongs[0], uniqueWrongs[1], uniqueWrongs[2]].sort(() => Math.random() - 0.5);
      qList.push({
        id: `u${unitId}l${lessonId}q${i + 1}`,
        type: "fill-blank-dropdown",
        prompt: `Cümleyi tamamlayın: "${ensurePunctuation(s.tr)}"`,
        sentence: s.blank,
        options: options,
        correctIndex: options.indexOf(s.word),
        enSentence: s.en
      });
    } else if (typeIndex === 2) {
      qList.push({
        id: `u${unitId}l${lessonId}q${i + 1}`,
        type: "fill-blank-text",
        prompt: `Cümledeki boşluğu doldurun: "${ensurePunctuation(s.tr)}"`,
        sentence: s.blank,
        correct: s.word,
        enSentence: s.en
      });
    } else if (typeIndex === 3) {
      const matchSents = [s];
      const otherSents = sentencesMix.filter(x => x.en !== s.en);
      const shuffledOthers = [...otherSents].sort(() => Math.random() - 0.5);
      for (const os of shuffledOthers) {
        if (matchSents.length === 4) break;
        if (!matchSents.some(x => x.trWord === os.trWord || x.word === os.word)) {
          matchSents.push(os);
        }
      }
      if (matchSents.length < 4) {
        for (const os of shuffledOthers) {
          if (matchSents.length === 4) break;
          if (!matchSents.some(x => x.en === os.en)) {
            matchSents.push(os);
          }
        }
      }
      const pairs = matchSents.map(x => ({
        left: x.trWord,
        right: x.word
      }));
      qList.push({
        id: `u${unitId}l${lessonId}q${i + 1}`,
        type: "matching",
        prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
        pairs: pairs
      });
    } else if (typeIndex === 4) {
      const isEngToTr = (i % 2 === 0);
      let prompt, translation, words, correctOrder;
      if (isEngToTr) {
        prompt = "Cümlenin Türkçe karşılığını oluşturun:";
        translation = ensurePunctuation(s.en);
        const targetWords = s.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
        const allOtherTrWords = sentencesMix.filter(x => x.en !== s.en).map(x => x.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))).flat();
        const uniqueDistractors = [...new Set(allOtherTrWords)].filter(w => !targetWords.includes(w));
        const shuffledDistractors = uniqueDistractors.sort(() => Math.random() - 0.5);
        words = [...targetWords, shuffledDistractors[0], shuffledDistractors[1], shuffledDistractors[2]].sort(() => Math.random() - 0.5);
        correctOrder = targetWords;
      } else {
        prompt = "Cümlenin İngilizce karşılığını oluşturun:";
        translation = ensurePunctuation(s.tr);
        const targetWords = s.en.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
        const allOtherEnWords = sentencesMix.filter(x => x.en !== s.en).map(x => x.en.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))).flat();
        const uniqueDistractors = [...new Set(allOtherEnWords)].filter(w => !targetWords.includes(w));
        const shuffledDistractors = uniqueDistractors.sort(() => Math.random() - 0.5);
        words = [...targetWords, shuffledDistractors[0], shuffledDistractors[1], shuffledDistractors[2]].sort(() => Math.random() - 0.5);
        correctOrder = targetWords;
      }
      qList.push({
        id: `u${unitId}l${lessonId}q${i + 1}`,
        type: "word-bank",
        prompt: prompt,
        translation: translation,
        words: words,
        correctOrder: correctOrder,
        enSentence: s.en,
        isEngToTr: isEngToTr
      });
    } else {
      const prompt = `Cümlenin Türkçe karşılığını klavye ile yazın: "${ensurePunctuation(s.en)}"`;
      const correctSentence = s.tr;
      qList.push({
        id: `u${unitId}l${lessonId}q${i + 1}`,
        type: "translation-text",
        prompt: prompt,
        correctSentence: correctSentence,
        enSentence: s.en,
        isEngToTr: true
      });
    }
  }
  return qList;
}

function generateDynamicExercises(unitId, lessonId, sentences) {
  if (!sentences || sentences.length === 0) return [];

  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  const ex1Questions = [];
  const matchSents = shuffle(sentences).slice(0, 4);
  if (matchSents.length >= 2) {
    ex1Questions.push({
      id: `u${unitId}l${lessonId}ex1_match`,
      type: "matching",
      prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
      pairs: matchSents.map(s => ({
        left: s.trWord || s.word,
        right: s.word
      }))
    });
  }

  const mcEtSents = shuffle(sentences).slice(0, 2);
  mcEtSents.forEach((sA, idx) => {
    const wrongSents = sentences.filter(s => s.en !== sA.en);
    const shuffledWrongs = shuffle(wrongSents);
    while (shuffledWrongs.length < 3) {
      shuffledWrongs.push({ en: "test", tr: "test" });
    }
    const options = shuffle([
      ensurePunctuation(sA.tr),
      ensurePunctuation(shuffledWrongs[0].tr),
      ensurePunctuation(shuffledWrongs[1].tr),
      ensurePunctuation(shuffledWrongs[2].tr)
    ]);
    ex1Questions.push({
      id: `u${unitId}l${lessonId}ex1_mc_et_${idx}`,
      type: "multiple-choice",
      prompt: `"${ensurePunctuation(sA.en)}" cümlesinin Türkçe karşılığı hangisidir?`,
      options: options,
      correctIndex: options.indexOf(ensurePunctuation(sA.tr)),
      enSentence: sA.en,
      isEngToTr: true
    });
  });

  const mcTeSents = shuffle(sentences).slice(0, 2);
  mcTeSents.forEach((sA, idx) => {
    const wrongSents = sentences.filter(s => s.en !== sA.en);
    const shuffledWrongs = shuffle(wrongSents);
    while (shuffledWrongs.length < 3) {
      shuffledWrongs.push({ en: "test", tr: "test" });
    }
    const options = shuffle([
      ensurePunctuation(sA.en),
      ensurePunctuation(shuffledWrongs[0].en),
      ensurePunctuation(shuffledWrongs[1].en),
      ensurePunctuation(shuffledWrongs[2].en)
    ]);
    ex1Questions.push({
      id: `u${unitId}l${lessonId}ex1_mc_te_${idx}`,
      type: "multiple-choice",
      prompt: `"${ensurePunctuation(sA.tr)}" cümlesinin İngilizce karşılığı hangisidir?`,
      options: options,
      correctIndex: options.indexOf(ensurePunctuation(sA.en)),
      enSentence: sA.en,
      isEngToTr: false
    });
  });

  const ex2Questions = [];
  const fdSents = shuffle(sentences).slice(0, 3);
  fdSents.forEach((sC, idx) => {
    const otherWords = sentences.filter(s => s.word !== sC.word).map(s => s.word);
    const uniqueWrongWords = [...new Set(otherWords)];
    const shuffledWrongs = shuffle(uniqueWrongWords);
    while (shuffledWrongs.length < 3) {
      shuffledWrongs.push("word");
    }
    const options = shuffle([sC.word, shuffledWrongs[0], shuffledWrongs[1], shuffledWrongs[2]]);
    ex2Questions.push({
      id: `u${unitId}l${lessonId}ex2_fd_${idx}`,
      type: "fill-blank-dropdown",
      prompt: `Cümleyi tamamlayın: "${ensurePunctuation(sC.tr)}"`,
      sentence: sC.blank || sC.en.replace(sC.word, "___"),
      options: options,
      correctIndex: options.indexOf(sC.word),
      enSentence: sC.en
    });
  });

  const ftSents = shuffle(sentences).slice(0, 2);
  ftSents.forEach((sC, idx) => {
    ex2Questions.push({
      id: `u${unitId}l${lessonId}ex2_ft_${idx}`,
      type: "fill-blank-text",
      prompt: `Boşluğu uygun kelimeyle doldurun (İngilizce): "${ensurePunctuation(sC.tr)}"`,
      sentence: sC.blank || sC.en.replace(sC.word, "___"),
      correct: sC.word,
      enSentence: sC.en
    });
  });

  const ex3Questions = [];
  const wbEtSents = shuffle(sentences).slice(0, 2);
  wbEtSents.forEach((sD, idx) => {
    const targetWords = sD.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
    const allOtherTrWords = sentences.filter(s => s.en !== sD.en).map(s => s.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))).flat();
    const uniqueDistractors = [...new Set(allOtherTrWords)].filter(w => !targetWords.includes(w));
    const shuffledDistractors = shuffle(uniqueDistractors);
    while (shuffledDistractors.length < 3) {
      shuffledDistractors.push("ve");
    }
    const words = shuffle([...targetWords, shuffledDistractors[0], shuffledDistractors[1], shuffledDistractors[2]]);
    ex3Questions.push({
      id: `u${unitId}l${lessonId}ex3_wb_et_${idx}`,
      type: "word-bank",
      prompt: "Cümlenin Türkçe karşılığını oluşturun:",
      translation: ensurePunctuation(sD.en),
      words: words,
      correctOrder: targetWords,
      enSentence: sD.en,
      isEngToTr: true
    });
  });

  const wbTeSents = shuffle(sentences).slice(0, 2);
  wbTeSents.forEach((sD, idx) => {
    const targetWords = sD.en.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
    const allOtherEnWords = sentences.filter(s => s.en !== sD.en).map(s => s.en.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))).flat();
    const uniqueDistractors = [...new Set(allOtherEnWords)].filter(w => !targetWords.includes(w));
    const shuffledDistractors = shuffle(uniqueDistractors);
    while (shuffledDistractors.length < 3) {
      shuffledDistractors.push("the");
    }
    const words = shuffle([...targetWords, shuffledDistractors[0], shuffledDistractors[1], shuffledDistractors[2]]);
    ex3Questions.push({
      id: `u${unitId}l${lessonId}ex3_wb_te_${idx}`,
      type: "word-bank",
      prompt: "Cümlenin İngilizce karşılığını oluşturun:",
      translation: ensurePunctuation(sD.tr),
      words: words,
      correctOrder: targetWords,
      enSentence: sD.en,
      isEngToTr: false
    });
  });

  const ex4Questions = [];
  const txEtSents = shuffle(sentences).slice(0, 2);
  txEtSents.forEach((sD, idx) => {
    ex4Questions.push({
      id: `u${unitId}l${lessonId}ex4_tx_et_${idx}`,
      type: "translation-text",
      prompt: `"${ensurePunctuation(sD.en)}" ifadesini Türkçe'ye çevirin:`,
      correctSentence: sD.tr,
      enSentence: sD.en,
      isEngToTr: true
    });
  });

  const txTeSents = shuffle(sentences).slice(0, 2);
  txTeSents.forEach((sD, idx) => {
    ex4Questions.push({
      id: `u${unitId}l${lessonId}ex4_tx_te_${idx}`,
      type: "translation-text",
      prompt: `"${ensurePunctuation(sD.tr)}" ifadesini İngilizce'ye çevirin:`,
      correctSentence: sD.en,
      enSentence: sD.en,
      isEngToTr: false
    });
  });

  return [
    {
      id: "ex1",
      title: "Alıştırma 1: Kelime ve Temel Yapılar",
      description: "Çoktan Seçmeli & Eşleştirme Soruları",
      questions: ex1Questions
    },
    {
      id: "ex2",
      title: "Alıştırma 2: Cümle Yapısı ve Boşluk Doldurma",
      description: "Boşluk Doldurma & Test Soruları",
      questions: ex2Questions
    },
    {
      id: "ex3",
      title: "Alıştırma 3: Kelime Sıralama Pratiği",
      description: "Sözcükleri Doğru Sıraya Koyma",
      questions: ex3Questions
    },
    {
      id: "ex4",
      title: "Alıştırma 4: Yazma ve Çeviri Pratiği",
      description: "Klavye ile Doğrudan Çeviri",
      questions: ex4Questions
    }
  ];
}

const unit7LessonSentences = {
  1: [
  {
    "en": "The data contradicts the theory.",
    "tr": "Veriler teoriyle çelişir.",
    "word": "contradicts",
    "trWord": "çelişir",
    "blank": "The data ___ the theory."
  },
  {
    "en": "The context specifies the criteria.",
    "tr": "Bağlam kriterleri belirler.",
    "word": "specifies",
    "trWord": "belirler",
    "blank": "The context ___ the criteria."
  },
  {
    "en": "The sector anticipates growth.",
    "tr": "Sektör büyüme öngörür.",
    "word": "anticipates",
    "trWord": "öngörür",
    "blank": "The sector ___ growth."
  },
  {
    "en": "Authorities advocate reform.",
    "tr": "Yetkililer reformu savunur.",
    "word": "advocate",
    "trWord": "savunur",
    "blank": "Authorities ___ reform."
  },
  {
    "en": "The dynamic triggers reaction.",
    "tr": "Dinamik tepkiyi tetikler.",
    "word": "triggers",
    "trWord": "tetikler",
    "blank": "The dynamic ___ reaction."
  },
  {
    "en": "Experts clarify the scope.",
    "tr": "Uzmanlar kapsamı açıklar.",
    "word": "clarify",
    "trWord": "açıklar",
    "blank": "Experts ___ the scope."
  },
  {
    "en": "The process induces stress.",
    "tr": "Süreç strese yol açar.",
    "word": "induces",
    "trWord": "yol açar",
    "blank": "The process ___ stress."
  },
  {
    "en": "The anomaly distorts results.",
    "tr": "Anomali sonuçları bozar.",
    "word": "distorts",
    "trWord": "bozar",
    "blank": "The anomaly ___ results."
  },
  {
    "en": "Media manipulates perspective.",
    "tr": "Medya bakış açısını manipüle eder.",
    "word": "manipulates",
    "trWord": "manipüle eder",
    "blank": "Media ___ perspective."
  },
  {
    "en": "The system accommodates expansion.",
    "tr": "Sistem genişlemeye uyum sağlar.",
    "word": "accommodates",
    "trWord": "uyum sağlar",
    "blank": "The system ___ expansion."
  },
  {
    "en": "The protocol defines parameters.",
    "tr": "Protokol parametreleri tanımlar.",
    "word": "defines",
    "trWord": "tanımlar",
    "blank": "The protocol ___ parameters."
  },
  {
    "en": "The contract binds institutions.",
    "tr": "Sözleşme kurumları bağlar.",
    "word": "binds",
    "trWord": "bağlar",
    "blank": "The contract ___ institutions."
  },
  {
    "en": "Analysts inspect the framework.",
    "tr": "Analistler çerçeveyi inceler.",
    "word": "inspect",
    "trWord": "inceler",
    "blank": "Analysts ___ the framework."
  },
  {
    "en": "The variable affects outcomes.",
    "tr": "Değişken sonuçları etkiler.",
    "word": "affects",
    "trWord": "etkiler",
    "blank": "The variable ___ outcomes."
  },
  {
    "en": "The core stabilizes components.",
    "tr": "Çekirdek bileşenleri stabilize eder.",
    "word": "stabilizes",
    "trWord": "stabilize eder",
    "blank": "The core ___ components."
  },
  {
    "en": "The graph illustrates percentages.",
    "tr": "Grafik yüzdeleri gösterir.",
    "word": "illustrates",
    "trWord": "gösterir",
    "blank": "The graph ___ percentages."
  },
  {
    "en": "The policy restricts access.",
    "tr": "Politika erişimi kısıtlar.",
    "word": "restricts",
    "trWord": "kısıtlar",
    "blank": "The policy ___ access."
  },
  {
    "en": "The finding validates hypotheses.",
    "tr": "Bulgu hipotezleri doğrular.",
    "word": "validates",
    "trWord": "doğrular",
    "blank": "The finding ___ hypotheses."
  },
  {
    "en": "The team modifies modules.",
    "tr": "Ekip modülleri değiştirir.",
    "word": "modifies",
    "trWord": "değiştirir",
    "blank": "The team ___ modules."
  },
  {
    "en": "The committee evaluates feedback.",
    "tr": "Komite geri bildirimi değerlendirir.",
    "word": "evaluates",
    "trWord": "değerlendirir",
    "blank": "The committee ___ feedback."
  },
  {
    "en": "The researcher isolates variables.",
    "tr": "Araştırmacı değişkenleri izole eder.",
    "word": "isolates",
    "trWord": "izole eder",
    "blank": "The researcher ___ variables."
  },
  {
    "en": "Strategies maximize efficiency.",
    "tr": "Stratejiler verimliliği maksimize eder.",
    "word": "maximize",
    "trWord": "maksimize eder",
    "blank": "Strategies ___ efficiency."
  },
  {
    "en": "The script calculates ratios.",
    "tr": "Betik oranları hesaplar.",
    "word": "calculates",
    "trWord": "hesaplar",
    "blank": "The script ___ ratios."
  },
  {
    "en": "The audit exposes flaws.",
    "tr": "Denetim kusurları ortaya çıkarır.",
    "word": "exposes",
    "trWord": "ortaya çıkarır",
    "blank": "The audit ___ flaws."
  },
  {
    "en": "The shift alters trends.",
    "tr": "Değişim eğilimleri değiştirir.",
    "word": "alters",
    "trWord": "değiştirir",
    "blank": "The shift ___ trends."
  },
  {
    "en": "The framework secures data.",
    "tr": "Çerçeve verileri güvenceye alır.",
    "word": "secures",
    "trWord": "güvenceye alır",
    "blank": "The framework ___ data."
  },
  {
    "en": "The council suspended regulations.",
    "tr": "Konsey düzenlemeleri askıya aldı.",
    "word": "suspended",
    "trWord": "askıya aldı",
    "blank": "The council ___ regulations."
  },
  {
    "en": "The board terminated agreements.",
    "tr": "Yönetim kurulu anlaşmaları feshetti.",
    "word": "terminated",
    "trWord": "feshetti",
    "blank": "The board ___ agreements."
  },
  {
    "en": "The ministry conducted surveys.",
    "tr": "Bakanlık anketler yürüttü.",
    "word": "conducted",
    "trWord": "yürüttü",
    "blank": "The ministry ___ surveys."
  },
  {
    "en": "The database accumulates logs.",
    "tr": "Veritabanı günlükleri biriktirir.",
    "word": "accumulates",
    "trWord": "biriktirir",
    "blank": "The database ___ logs."
  },
  {
    "en": "The newly collected empirical data contradicts the theory.",
    "tr": "Yeni toplanan deneysel veriler teoriyle çelişir.",
    "word": "contradicts",
    "trWord": "çelişir",
    "blank": "The newly collected empirical data ___ the theory."
  },
  {
    "en": "The broader socio-economic context specifies the criteria.",
    "tr": "Daha geniş sosyo-ekonomik bağlam kriterleri belirler.",
    "word": "specifies",
    "trWord": "belirler",
    "blank": "The broader socio-economic context ___ the criteria."
  },
  {
    "en": "The highly competitive dynamic sector anticipates growth.",
    "tr": "Son derece rekabetçi dinamik sektör büyüme öngörür.",
    "word": "anticipates",
    "trWord": "öngörür",
    "blank": "The highly competitive dynamic sector ___ growth."
  },
  {
    "en": "Leading institutional authorities advocate reform.",
    "tr": "Önde gelen kurumsal yetkililer reformu savunur.",
    "word": "advocate",
    "trWord": "savunur",
    "blank": "Leading institutional authorities ___ reform."
  },
  {
    "en": "This unpredictable economic dynamic triggers reaction.",
    "tr": "Bu öngörülemeyen ekonomik dinamik tepkiyi tetikler.",
    "word": "triggers",
    "trWord": "tetikler",
    "blank": "This unpredictable economic dynamic ___ reaction."
  },
  {
    "en": "Independent technical experts clarify the scope.",
    "tr": "Bağımsız teknik uzmanlar kapsamı açıklar.",
    "word": "clarify",
    "trWord": "açıklar",
    "blank": "Independent technical experts ___ the scope."
  },
  {
    "en": "The continuous chemical process induces stress.",
    "tr": "Sürekli kimyasal süreç strese yol açar.",
    "word": "induces",
    "trWord": "yol açar",
    "blank": "The continuous chemical process ___ stress."
  },
  {
    "en": "The undetected structural anomaly distorts results.",
    "tr": "Tespit edilemeyen yapısal anomali sonuçları bozar.",
    "word": "distorts",
    "trWord": "bozar",
    "blank": "The undetected structural anomaly ___ results."
  },
  {
    "en": "Mainstream digital media manipulates perspective.",
    "tr": "Ana akım dijital medya bakış açısını manipüle eder.",
    "word": "manipulates",
    "trWord": "manipüle eder",
    "blank": "Mainstream digital media ___ perspective."
  },
  {
    "en": "The updated operational system accommodates expansion.",
    "tr": "Güncellenmiş operasyonel sistem genişlemeye uyum sağlar.",
    "word": "accommodates",
    "trWord": "uyum sağlar",
    "blank": "The updated operational system ___ expansion."
  },
  {
    "en": "The revised security protocol defines parameters.",
    "tr": "Gözden geçirilmiş güvenlik protokolü parametreleri tanımlar.",
    "word": "defines",
    "trWord": "tanımlar",
    "blank": "The revised security protocol ___ parameters."
  },
  {
    "en": "The legally binding contract binds institutions.",
    "tr": "Yasal olarak bağlayıcı sözleşme kurumları bağlar.",
    "word": "binds",
    "trWord": "bağlar",
    "blank": "The legally binding contract ___ institutions."
  },
  {
    "en": "Senior financial analysts inspect the framework.",
    "tr": "Kıdemli finansal analistler çerçeveyi inceler.",
    "word": "inspect",
    "trWord": "inceler",
    "blank": "Senior financial analysts ___ the framework."
  },
  {
    "en": "The primary independent variable affects outcomes.",
    "tr": "Birincil bağımsız değişken sonuçları etkiler.",
    "word": "affects",
    "trWord": "etkiler",
    "blank": "The primary independent variable ___ outcomes."
  },
  {
    "en": "The reinforced central core stabilizes components.",
    "tr": "Güçlendirilmiş merkezi çekirdek bileşenleri stabilize eder.",
    "word": "stabilizes",
    "trWord": "stabilize eder",
    "blank": "The reinforced central core ___ components."
  },
  {
    "en": "The attached statistical graph illustrates percentages.",
    "tr": "Ekli istatistiksel grafik yüzdeleri gösterir.",
    "word": "illustrates",
    "trWord": "gösterir",
    "blank": "The attached statistical graph ___ percentages."
  },
  {
    "en": "The strict institutional policy restricts access.",
    "tr": "Katı kurumsal politika erişimi kısıtlar.",
    "word": "restricts",
    "trWord": "kısıtlar",
    "blank": "The strict institutional policy ___ access."
  },
  {
    "en": "The final scientific finding validates hypotheses.",
    "tr": "Nihai bilimsel bulgu hipotezleri doğrular.",
    "word": "validates",
    "trWord": "doğrular",
    "blank": "The final scientific finding ___ hypotheses."
  },
  {
    "en": "The software development team modifies modules.",
    "tr": "Yazılım geliştirme ekibi modülleri değiştirir.",
    "word": "modifies",
    "trWord": "değiştirir",
    "blank": "The software development team ___ modules."
  },
  {
    "en": "The ethics evaluation committee evaluates feedback.",
    "tr": "Etik değerlendirme komitesi geri bildirimi değerlendirir.",
    "word": "evaluates",
    "trWord": "değerlendirir",
    "blank": "The ethics evaluation committee ___ feedback."
  },
  {
    "en": "The principal laboratory researcher isolates variables.",
    "tr": "Baş laboratuvar araştırmacısı değişkenleri izole eder.",
    "word": "isolates",
    "trWord": "izole eder",
    "blank": "The principal laboratory researcher ___ variables."
  },
  {
    "en": "Innovative corporate strategies maximize efficiency.",
    "tr": "Yenilikçi kurumsal stratejiler verimliliği maksimize eder.",
    "word": "maximize",
    "trWord": "maksimize eder",
    "blank": "Innovative corporate strategies ___ efficiency."
  },
  {
    "en": "The automated background script calculates ratios.",
    "tr": "Otomatik arka plan betiği oranları hesaplar.",
    "word": "calculates",
    "trWord": "hesaplar",
    "blank": "The automated background script ___ ratios."
  },
  {
    "en": "The independent annual audit exposes flaws.",
    "tr": "Bağımsız yıllık denetim kusurları ortaya çıkarır.",
    "word": "exposes",
    "trWord": "ortaya çıkarır",
    "blank": "The independent annual audit ___ flaws."
  },
  {
    "en": "The sudden paradigm shift alters trends.",
    "tr": "Ani paradigma değişimi eğilimleri değiştirir.",
    "word": "alters",
    "trWord": "değiştirir",
    "blank": "The sudden paradigm shift ___ trends."
  },
  {
    "en": "The advanced cryptographic framework secures data.",
    "tr": "Gelişmiş kriptografik çerçeve verileri güvenceye alır.",
    "word": "secures",
    "trWord": "güvenceye alır",
    "blank": "The advanced cryptographic framework ___ data."
  },
  {
    "en": "The regional administrative council suspended regulations.",
    "tr": "Bölgesel idari konsey düzenlemeleri askıya aldı.",
    "word": "suspended",
    "trWord": "askıya aldı",
    "blank": "The regional administrative council ___ regulations."
  },
  {
    "en": "The executive internal board terminated agreements.",
    "tr": "Yürütme iç kurulu anlaşmaları feshetti.",
    "word": "terminated",
    "trWord": "feshetti",
    "blank": "The executive internal board ___ agreements."
  },
  {
    "en": "The national education ministry conducted surveys.",
    "tr": "Milli eğitim bakanlığı anketler yürüttü.",
    "word": "conducted",
    "trWord": "yürüttü",
    "blank": "The national education ministry ___ surveys."
  },
  {
    "en": "The centralized cloud database accumulates logs.",
    "tr": "Merkezi bulut veritabanı günlükleri biriktirir.",
    "word": "accumulates",
    "trWord": "biriktirir",
    "blank": "The centralized cloud database ___ logs."
  },
  {
    "en": "The data contradicts the long-standing theoretical model.",
    "tr": "Veriler uzun süredir var olan teorik modelle çelişir.",
    "word": "contradicts",
    "trWord": "çelişir",
    "blank": "The data ___ the long-standing theoretical model."
  },
  {
    "en": "The context specifies the strict qualitative selection criteria.",
    "tr": "Bağlam katı nitel seçim kriterlerini belirler.",
    "word": "specifies",
    "trWord": "belirler",
    "blank": "The context ___ the strict qualitative selection criteria."
  },
  {
    "en": "The sector anticipates significant annual financial growth.",
    "tr": "Sektör yıllık önemli finansal büyüme öngörür.",
    "word": "anticipates",
    "trWord": "öngörür",
    "blank": "The sector ___ significant annual financial growth."
  },
  {
    "en": "Authorities advocate comprehensive legislative tax reform.",
    "tr": "Yetkililer kapsamlı yasal vergi reformunu savunur.",
    "word": "advocate",
    "trWord": "savunur",
    "blank": "Authorities ___ comprehensive legislative tax reform."
  },
  {
    "en": "The dynamic triggers a chain of negative physical reactions.",
    "tr": "Dinamik bir dizi olumsuz fiziksel tepkiyi tetikler.",
    "word": "triggers",
    "trWord": "tetikler",
    "blank": "The dynamic ___ a chain of negative physical reactions."
  },
  {
    "en": "Experts clarify the initial investigative project scope.",
    "tr": "Uzmanlar başlangıçtaki araştırma projesi kapsamını açıklar.",
    "word": "clarify",
    "trWord": "açıklar",
    "blank": "Experts ___ the initial investigative project scope."
  },
  {
    "en": "The process induces severe psychological and occupational stress.",
    "tr": "Süreç ciddi psikolojik ve mesleki strese yol açar.",
    "word": "induces",
    "trWord": "yol açar",
    "blank": "The process ___ severe psychological and occupational stress."
  },
  {
    "en": "The anomaly distorts the final statistical research results.",
    "tr": "Anomali nihai istatistiksel araştırma sonuçlarını bozar.",
    "word": "distorts",
    "trWord": "bozar",
    "blank": "The anomaly ___ the final statistical research results."
  },
  {
    "en": "Media manipulates public political and cultural perspective.",
    "tr": "Medya kamuoyunun siyasi ve kültürel bakış açısını manipüle eder.",
    "word": "manipulates",
    "trWord": "manipüle eder",
    "blank": "Media ___ public political and cultural perspective."
  },
  {
    "en": "The system accommodates rapid regional infrastructure expansion.",
    "tr": "Sistem hızlı bölgesel altyapı genişlemesine uyum sağlar.",
    "word": "accommodates",
    "trWord": "uyum sağlar",
    "blank": "The system ___ rapid regional infrastructure expansion."
  },
  {
    "en": "The protocol defines crucial technical system parameters.",
    "tr": "Protokol kritik teknik sistem parametrelerini tanımlar.",
    "word": "defines",
    "trWord": "tanımlar",
    "blank": "The protocol ___ crucial technical system parameters."
  },
  {
    "en": "The contract binds separate international research institutions.",
    "tr": "Sözleşme ayrı uluslararası araştırma kurumlarını bağlar.",
    "word": "binds",
    "trWord": "bağlar",
    "blank": "The contract ___ separate international research institutions."
  },
  {
    "en": "Analysts inspect the entire underlying structural framework.",
    "tr": "Analistler tüm temel yapısal çerçeveyi inceler.",
    "word": "inspect",
    "trWord": "inceler",
    "blank": "Analysts ___ the entire underlying structural framework."
  },
  {
    "en": "The variable affects excellent academic student outcomes.",
    "tr": "Değişken mükemmel akademik öğrenci sonuçlarını etkiler.",
    "word": "affects",
    "trWord": "etkiler",
    "blank": "The variable ___ excellent academic student outcomes."
  },
  {
    "en": "The core stabilizes crucial internal device components.",
    "tr": "Çekirdek kritik dahili cihaz bileşenlerini stabilize eder.",
    "word": "stabilizes",
    "trWord": "stabilize eder",
    "blank": "The core ___ crucial internal device components."
  },
  {
    "en": "The graph illustrates exact distribution and demographic percentages.",
    "tr": "Grafik kesin dağılım ve demografik yüzdeleri gösterir.",
    "word": "illustrates",
    "trWord": "gösterir",
    "blank": "The graph ___ exact distribution and demographic percentages."
  },
  {
    "en": "The policy restricts unauthorized user network access.",
    "tr": "Politika yetkisiz kullanıcı ağ erişimini kısıtlar.",
    "word": "restricts",
    "trWord": "kısıtlar",
    "blank": "The policy ___ unauthorized user network access."
  },
  {
    "en": "The finding validates alternative alternative scientific hypotheses.",
    "tr": "Bulgu alternatif bilimsel hipotezleri doğrular.",
    "word": "validates",
    "trWord": "doğrular",
    "blank": "The finding ___ alternative alternative scientific hypotheses."
  },
  {
    "en": "The team modifies individual functional software modules.",
    "tr": "Ekip bireysel fonksiyonel yazılım modüllerini değiştirir.",
    "word": "modifies",
    "trWord": "değiştirir",
    "blank": "The team ___ individual functional software modules."
  },
  {
    "en": "The committee evaluates detailed anonymous student feedback.",
    "tr": "Komite detaylı anonim öğrenci geri bildirimini değerlendirir.",
    "word": "evaluates",
    "trWord": "değerlendirir",
    "blank": "The committee ___ detailed anonymous student feedback."
  },
  {
    "en": "The researcher isolates separate unstable chemical variables.",
    "tr": "Araştırmacı ayrı kararsız kimyasal değişkenleri izole eder.",
    "word": "isolates",
    "trWord": "izole eder",
    "blank": "The researcher ___ separate unstable chemical variables."
  },
  {
    "en": "Strategies maximize maximum annual manufacturing efficiency.",
    "tr": "Stratejiler maksimum yıllık üretim verimliliğini maksimize eder.",
    "word": "maximize",
    "trWord": "maksimize eder",
    "blank": "Strategies ___ maximum annual manufacturing efficiency."
  },
  {
    "en": "The script calculates complex mathematical data ratios.",
    "tr": "Betik karmaşık matematiksel veri oranlarını hesaplar.",
    "word": "calculates",
    "trWord": "hesaplar",
    "blank": "The script ___ complex mathematical data ratios."
  },
  {
    "en": "The audit exposes hidden organizational system flaws.",
    "tr": "Denetim gizli örgütsel sistem kusurlarını ortaya çıkarır.",
    "word": "exposes",
    "trWord": "ortaya çıkarır",
    "blank": "The audit ___ hidden organizational system flaws."
  },
  {
    "en": "The shift alters global consumer behavior trends.",
    "tr": "Değişim küresel tüketici davranışı eğilimlerini değiştirir.",
    "word": "alters",
    "trWord": "değiştirir",
    "blank": "The shift ___ global consumer behavior trends."
  },
  {
    "en": "The framework secures sensitive user information data.",
    "tr": "Çerçeve hassas kullanıcı bilgileri verilerini güvenceye alır.",
    "word": "secures",
    "trWord": "güvenceye alır",
    "blank": "The framework ___ sensitive user information data."
  },
  {
    "en": "The council suspended outdated environmental safety regulations.",
    "tr": "Konsey güncelliğini yitirmiş çevresel güvenlik düzenlemelerini askıya aldı.",
    "word": "suspended",
    "trWord": "askıya aldı",
    "blank": "The council ___ outdated environmental safety regulations."
  },
  {
    "en": "The board terminated formal bilateral commercial agreements.",
    "tr": "Yönetim kurulu resmi ikili ticari anlaşmaları feshetti.",
    "word": "terminated",
    "trWord": "feshetti",
    "blank": "The board ___ formal bilateral commercial agreements."
  },
  {
    "en": "The ministry conducted comprehensive regional educational surveys.",
    "tr": "Bakanlık kapsamlı bölgesel eğitim anketleri yürüttü.",
    "word": "conducted",
    "trWord": "yürüttü",
    "blank": "The ministry ___ comprehensive regional educational surveys."
  },
  {
    "en": "The database accumulates detailed historical system logs.",
    "tr": "Veritabanı detaylı geçmiş sistem günlüklerini biriktirir.",
    "word": "accumulates",
    "trWord": "biriktirir",
    "blank": "The database ___ detailed historical system logs."
  },
  {
    "en": "The newly collected empirical data contradicts the long-standing theoretical model.",
    "tr": "Yeni toplanan deneysel veriler uzun süredir var olan teorik modelle çelişir.",
    "word": "contradicts",
    "trWord": "çelişir",
    "blank": "The newly collected empirical data ___ the long-standing theoretical model."
  },
  {
    "en": "The broader socio-economic context specifies the strict qualitative selection criteria.",
    "tr": "Daha geniş sosyo-ekonomik bağlam katı nitel seçim kriterlerini belirler.",
    "word": "specifies",
    "trWord": "belirler",
    "blank": "The broader socio-economic context ___ the strict qualitative selection criteria."
  },
  {
    "en": "The highly competitive dynamic sector anticipates significant annual financial growth.",
    "tr": "Son derece rekabetçi dinamik sektör yıllık önemli finansal büyüme öngörür.",
    "word": "anticipates",
    "trWord": "öngörür",
    "blank": "The highly competitive dynamic sector ___ significant annual financial growth."
  },
  {
    "en": "Leading institutional authorities advocate comprehensive legislative tax reform.",
    "tr": "Önde gelen kurumsal yetkililer kapsamlı yasal vergi reformunu savunur.",
    "word": "advocate",
    "trWord": "savunur",
    "blank": "Leading institutional authorities ___ comprehensive legislative tax reform."
  },
  {
    "en": "This unpredictable economic dynamic triggers a chain of negative physical reactions.",
    "tr": "Bu öngörülemeyen ekonomik dinamik bir dizi olumsuz fiziksel tepkiyi tetikler.",
    "word": "triggers",
    "trWord": "tetikler",
    "blank": "This unpredictable economic dynamic ___ a chain of negative physical reactions."
  },
  {
    "en": "Independent technical experts clarify the initial investigative project scope.",
    "tr": "Bağımsız teknik uzmanlar başlangıçtaki araştırma projesi kapsamını açıklar.",
    "word": "clarify",
    "trWord": "açıklar",
    "blank": "Independent technical experts ___ the initial investigative project scope."
  },
  {
    "en": "The continuous chemical process induces severe psychological and occupational stress.",
    "tr": "Sürekli kimyasal süreç ciddi psikolojik ve mesleki strese yol açar.",
    "word": "induces",
    "trWord": "yol açar",
    "blank": "The continuous chemical process ___ severe psychological and occupational stress."
  },
  {
    "en": "The undetected structural anomaly distorts the final statistical research results.",
    "tr": "Tespit edilemeyen yapısal anomali nihai istatistiksel araştırma sonuçlarını bozar.",
    "word": "distorts",
    "trWord": "bozar",
    "blank": "The undetected structural anomaly ___ the final statistical research results."
  },
  {
    "en": "Mainstream digital media manipulates public political and cultural perspective.",
    "tr": "Ana akım dijital medya kamuoyunun siyasi ve kültürel bakış açısını manipüle eder.",
    "word": "manipulates",
    "trWord": "manipüle eder",
    "blank": "Mainstream digital media ___ public political and cultural perspective."
  },
  {
    "en": "The updated operational system accommodates rapid regional infrastructure expansion.",
    "tr": "Güncellenmiş operasyonel sistem hızlı bölgesel altyapı genişlemesine uyum sağlar.",
    "word": "accommodates",
    "trWord": "uyum sağlar",
    "blank": "The updated operational system ___ rapid regional infrastructure expansion."
  },
  {
    "en": "The revised security protocol defines crucial technical system parameters.",
    "tr": "Gözden geçirilmiş güvenlik protokolü kritik teknik sistem parametrelerini tanımlar.",
    "word": "defines",
    "trWord": "tanımlar",
    "blank": "The revised security protocol ___ crucial technical system parameters."
  },
  {
    "en": "The legally binding contract binds separate international research institutions.",
    "tr": "Yasal olarak bağlayıcı sözleşme ayrı uluslararası araştırma kurumlarını bağlar.",
    "word": "binds",
    "trWord": "bağlar",
    "blank": "The legally binding contract ___ separate international research institutions."
  },
  {
    "en": "Senior financial analysts inspect the entire underlying structural framework.",
    "tr": "Kıdemli finansal analistler tüm temel yapısal çerçeveyi inceler.",
    "word": "inspect",
    "trWord": "inceler",
    "blank": "Senior financial analysts ___ the entire underlying structural framework."
  },
  {
    "en": "The primary independent variable affects excellent academic student outcomes.",
    "tr": "Birincil bağımsız değişken mükemmel akademik öğrenci sonuçlarını etkiler.",
    "word": "affects",
    "trWord": "etkiler",
    "blank": "The primary independent variable ___ excellent academic student outcomes."
  },
  {
    "en": "The reinforced central core stabilizes crucial internal device components.",
    "tr": "Güçlendirilmiş merkezi çekirdek kritik dahili cihaz bileşenlerini stabilize eder.",
    "word": "stabilizes",
    "trWord": "stabilize eder",
    "blank": "The reinforced central core ___ crucial internal device components."
  },
  {
    "en": "The attached statistical graph illustrates exact distribution and demographic percentages.",
    "tr": "Ekli istatistiksel grafik kesin dağılım ve demografik yüzdeleri gösterir.",
    "word": "illustrates",
    "trWord": "gösterir",
    "blank": "The attached statistical graph ___ exact distribution and demographic percentages."
  },
  {
    "en": "The strict institutional policy restricts unauthorized user network access.",
    "tr": "Katı kurumsal politika yetkisiz kullanıcı ağ erişimini kısıtlar.",
    "word": "restricts",
    "trWord": "kısıtlar",
    "blank": "The strict institutional policy ___ unauthorized user network access."
  },
  {
    "en": "The final scientific finding validates alternative alternative scientific hypotheses.",
    "tr": "Nihai bilimsel bulgu alternatif bilimsel hipotezleri doğrular.",
    "word": "validates",
    "trWord": "doğrular",
    "blank": "The final scientific finding ___ alternative alternative scientific hypotheses."
  },
  {
    "en": "The software development team modifies individual functional software modules.",
    "tr": "Yazılım geliştirme ekibi bireysel fonksiyonel yazılım modüllerini değiştirir.",
    "word": "modifies",
    "trWord": "değiştirir",
    "blank": "The software development team ___ individual functional software modules."
  },
  {
    "en": "The ethics evaluation committee evaluates detailed anonymous student feedback.",
    "tr": "Etik değerlendirme komitesi detaylı anonim öğrenci geri bildirimini değerlendirir.",
    "word": "evaluates",
    "trWord": "değerlendirir",
    "blank": "The ethics evaluation committee ___ detailed anonymous student feedback."
  },
  {
    "en": "The principal laboratory researcher isolates separate unstable chemical variables.",
    "tr": "Baş laboratuvar araştırmacısı ayrı kararsız kimyasal değişkenleri izole eder.",
    "word": "isolates",
    "trWord": "izole eder",
    "blank": "The principal laboratory researcher ___ separate unstable chemical variables."
  },
  {
    "en": "Innovative corporate strategies maximize maximum annual manufacturing efficiency.",
    "tr": "Yenilikçi kurumsal stratejiler maksimum yıllık üretim verimliliğini maksimize eder.",
    "word": "maximize",
    "trWord": "maksimize eder",
    "blank": "Innovative corporate strategies ___ maximum annual manufacturing efficiency."
  },
  {
    "en": "The automated background script calculates complex mathematical data ratios.",
    "tr": "Otomatik arka plan betiği karmaşık matematiksel veri oranlarını hesaplar.",
    "word": "calculates",
    "trWord": "hesaplar",
    "blank": "The automated background script ___ complex mathematical data ratios."
  },
  {
    "en": "The independent annual audit exposes hidden organizational system flaws.",
    "tr": "Bağımsız yıllık denetim gizli örgütsel sistem kusurlarını ortaya çıkarır.",
    "word": "exposes",
    "trWord": "ortaya çıkarır",
    "blank": "The independent annual audit ___ hidden organizational system flaws."
  },
  {
    "en": "The sudden paradigm shift alters global consumer behavior trends.",
    "tr": "Ani paradigma değişimi küresel tüketici davranışı eğilimlerini değiştirir.",
    "word": "alters",
    "trWord": "değiştirir",
    "blank": "The sudden paradigm shift ___ global consumer behavior trends."
  },
  {
    "en": "The advanced cryptographic framework secures sensitive user information data.",
    "tr": "Gelişmiş kriptografik çerçeve hassas kullanıcı bilgileri verilerini güvenceye alır.",
    "word": "secures",
    "trWord": "güvenceye alır",
    "blank": "The advanced cryptographic framework ___ sensitive user information data."
  },
  {
    "en": "The regional administrative council suspended outdated environmental safety regulations.",
    "tr": "Bölgesel idari konsey güncelliğini yitirmiş çevresel güvenlik düzenlemelerini askıya aldı.",
    "word": "suspended",
    "trWord": "askıya aldı",
    "blank": "The regional administrative council ___ outdated environmental safety regulations."
  },
  {
    "en": "The executive internal board terminated formal bilateral commercial agreements.",
    "tr": "Yürütme iç kurulu resmi ikili ticari anlaşmaları feshetti.",
    "word": "terminated",
    "trWord": "feshetti",
    "blank": "The executive internal board ___ formal bilateral commercial agreements."
  },
  {
    "en": "The national education ministry conducted comprehensive regional educational surveys.",
    "tr": "Milli eğitim bakanlığı kapsamlı bölgesel eğitim anketleri yürüttü.",
    "word": "conducted",
    "trWord": "yürüttü",
    "blank": "The national education ministry ___ comprehensive regional educational surveys."
  },
  {
    "en": "The centralized cloud database accumulates detailed historical system logs.",
    "tr": "Merkezi bulut veritabanı detaylı geçmiş sistem günlüklerini biriktirir.",
    "word": "accumulates",
    "trWord": "biriktirir",
    "blank": "The centralized cloud database ___ detailed historical system logs."
  }
]
};


const unit8LessonSentences = {
  1: [
    { en: "The problem needs to be solved", tr: "Sorunun çözülmesi gerekiyor", word: "solved", trWord: "çözülmesi", blank: "The problem needs to be ___" },
    { en: "These rules must be observed", tr: "Bu kurallara uyulmalıdır", word: "observed", trWord: "uyulmalıdır", blank: "These rules must be ___" },
    { en: "Data needs to be analysed", tr: "Verilerin analiz edilmesi gerekiyor", word: "analysed", trWord: "analiz edilmesi", blank: "Data needs to be ___" },
    { en: "The patient wants to be treated", tr: "Hasta tedavi edilmek istiyor", word: "treated", trWord: "tedavi edilmek", blank: "The patient wants to be ___" },
    { en: "The method is yet to be discovered", tr: "Yöntem henüz keşfedilmeyi bekliyor", word: "discovered", trWord: "keşfedilmeyi", blank: "The method is yet to be ___" },
    { en: "The structures have to be modified", tr: "Yapıların değiştirilmesi zorunludur", word: "modified", trWord: "değiştirilmesi", blank: "The structures have to be ___" },
    { en: "The mixture should be heated gently", tr: "Karışım yavaşça ısıtılmalıdır", word: "heated", trWord: "ısıtılmalıdır", blank: "The mixture should be ___ gently" },
    { en: "The plans are to be approved by the committee", tr: "Planlar komite tarafından onaylanacak", word: "approved", trWord: "onaylanacak", blank: "The plans are to be ___ by the committee" },
    { en: "The resource is to be distributed equally", tr: "Kaynak eşit olarak dağıtılacak", word: "distributed", trWord: "dağıtılacak", blank: "The resource is to be ___ equally" },
    { en: "The virus was found to be transmitted by air", tr: "Virüsün hava yoluyla bulaştığı tespit edildi", word: "transmitted", trWord: "bulaştığı", blank: "The virus was found to be ___ by air" },
    { en: "The cost is expected to be reduced", tr: "Maliyetin düşürülmesi bekleniyor", word: "reduced", trWord: "düşürülmesi", blank: "The cost is expected to be ___" },
    { en: "No changes are likely to be made", tr: "Herhangi bir değişiklik yapılması muhtemel görünmüyor", word: "made", trWord: "yapılması", blank: "No changes are likely to be ___" },
    { en: "The scientific hypothesis can be tested by the research team", tr: "Bilimsel hipotez araştırma ekibi tarafından test edilebilir", word: "tested", trWord: "test edilebilir", blank: "The scientific hypothesis can be ___ by the research team" },
    { en: "The scientific hypothesis cannot be tested by the research team", tr: "Bilimsel hipotez araştırma ekibi tarafından test edilemez", word: "tested", trWord: "test edilemez", blank: "The scientific hypothesis cannot be ___ by the research team" },
    { en: "The statutory regulation could be suspended by the ministry", tr: "Yasal düzenleme bakanlık tarafından askıya alınabilir", word: "suspended", trWord: "askıya alınabilir", blank: "The statutory regulation could be ___ by the ministry" },
    { en: "The statutory regulation could not be suspended by the ministry", tr: "Yasal düzenleme bakanlık tarafından askıya alınamadı", word: "suspended", trWord: "askıya alınamadı", blank: "The statutory regulation could not be ___ by the ministry" },
    { en: "The historical document may be interpreted by separate experts", tr: "Tarihi belge ayrı uzmanlar tarafından yorumlanabilir", word: "interpreted", trWord: "yorumlanabilir", blank: "The historical document may be ___ by separate experts" },
    { en: "The innovative methodology might be adopted by alternative institutions", tr: "Yenilikçi metodoloji alternatif kurumlar tarafından benimsenebilir", word: "adopted", trWord: "benimsenebilir", blank: "The innovative methodology might be ___ by alternative institutions" },
    { en: "The innovative methodology might not be adopted by alternative institutions", tr: "Yenilikçi metodoloji alternatif kurumlar tarafından benimsenmeyebilir", word: "adopted", trWord: "benimsenmeyebilir", blank: "The innovative methodology might not be ___ by alternative institutions" },
    { en: "Environmental damage must be minimized under global parameters", tr: "Çevresel zarar küresel parametreler altında en aza indirilmelidir", word: "minimized", trWord: "en aza indirilmelidir", blank: "Environmental damage must be ___ under global parameters" },
    { en: "Separate digital modules should be integrated by the developer", tr: "Ayrı dijital modüller geliştirici tarafından entegre edilmelidir", word: "integrated", trWord: "entegre edilmelidir", blank: "Separate digital modules should be ___ by the developer" },
    { en: "Should separate digital modules be integrated by the developer?", tr: "Ayrı dijital modüller geliştirici tarafından entegre edilmeli mi?", word: "integrated", trWord: "entegre edilmeli mi", blank: "Should separate digital modules be ___ by the developer?" },
    { en: "Ethical parameters ought to be defined by the committee", tr: "Etik parametreler komite tarafından tanımlanmalıdır", word: "defined", trWord: "tanımlanmalıdır", blank: "Ethical parameters ought to be ___ by the committee" },
    { en: "The legislative framework will be altered by the progressive government", tr: "Yasal çerçeve ilerici hükümet tarafından değiştirilecektir", word: "altered", trWord: "değiştirilecektir", blank: "The legislative framework will be ___ by the progressive government" },
    { en: "Will the legislative framework be altered by the progressive government?", tr: "Yasal çerçeve ilerici hükümet tarafından değiştirilecek mi?", word: "altered", trWord: "değiştirilecek mi", blank: "Will the legislative framework be ___ by the progressive government?" },
    { en: "The hypothesis can be tested", tr: "Hipotez test edilebilir", word: "tested", trWord: "test edilebilir", blank: "The hypothesis can be ___" },
    { en: "The strategy is implemented", tr: "Strateji uygulanır", word: "implemented", trWord: "uygulanır", blank: "The strategy is ___" },
    { en: "Documents are distributed", tr: "Belgeler dağıtılır", word: "distributed", trWord: "dağıtılır", blank: "Documents are ___" },
    { en: "The regulation was suspended", tr: "Yönetmelik askıya alındı", word: "suspended", trWord: "askıya alındı", blank: "The regulation was ___" }
  ]
};

const unit12Lesson1SentencesRaw = [
  { en: "the forests remaining in these areas", tr: "bu bölgelerde kalan ormanlar", word: "remaining", trWord: "kalan", blank: "the forests ___ in these areas" },
  { en: "a point moving along a straight line", tr: "doğru bir çizgi boyunca hareket eden bir nokta", word: "moving", trWord: "hareket eden", blank: "a point ___ along a straight line" },
  { en: "an organism living in the soil", tr: "toprakta yaşayan bir organizma", word: "living", trWord: "yaşayan", blank: "an organism ___ in the soil" },
  { en: "a tree growing in sandy soil", tr: "kumlu toprakta yetişen bir ağaç", word: "growing", trWord: "yetişen", blank: "a tree ___ in sandy soil" },
  { en: "a line beginning at this point", tr: "bu noktada başlayan bir çizgi", word: "beginning", trWord: "başlayan", blank: "a line ___ at this point" },
  { en: "micro-organisms living in the cell", tr: "hücrede yaşayan mikroorganizmalar", word: "living", trWord: "yaşayan", blank: "micro-organisms ___ in the cell" },
  { en: "costs increasing because of scarcity of raw materials", tr: "hammadde kıtlığı nedeniyle artan maliyetler", word: "increasing", trWord: "artan", blank: "costs ___ because of scarcity of raw materials" },
  { en: "movement continuing in waves", tr: "dalgalar halinde devam eden hareket", word: "continuing", trWord: "devam eden", blank: "movement ___ in waves" },
  { en: "results differing from previous experiments", tr: "önceki deneylerden farklılık gösteren sonuçlar", word: "differing", trWord: "farklılık gösteren", blank: "results ___ from previous experiments" },
  { en: "gas escaping from the pipes", tr: "borulardan sızan gaz", word: "escaping", trWord: "sızan", blank: "gas ___ from the pipes" },
  { en: "problems existing in the cotton industry", tr: "pamuk endüstrisinde var olan problemler", word: "existing", trWord: "var olan", blank: "problems ___ in the cotton industry" },
  { en: "a sphere revolving at the base of the column", tr: "sütunun tabanında dönen bir küre", word: "revolving", trWord: "dönen", blank: "a sphere ___ at the base of the column" },
  { en: "personnel working in modern factories", tr: "modern fabrikalarda çalışan personel", word: "working", trWord: "çalışan", blank: "personnel ___ in modern factories" },
  { en: "a mixture resulting from three elements", tr: "üç elementten oluşan bir karışım", word: "resulting", trWord: "oluşan", blank: "a mixture ___ from three elements" },
  { en: "plants living in a smoky atmosphere", tr: "dumanlı bir atmosferde yaşayan bitkiler", word: "living", trWord: "yaşayan", blank: "plants ___ in a smoky atmosphere" },
  { en: "a disease beginning with high fever", tr: "yüksek ateşle başlayan bir hastalık", word: "beginning", trWord: "başlayan", blank: "a disease ___ with high fever" },
  { en: "opinions disagreeing with the majority", tr: "çoğunluğa katılmayan fikirler", word: "disagreeing", trWord: "katılmayan", blank: "opinions ___ with the majority" },
  { en: "a disease developing from vitamin deficiency", tr: "vitamin eksikliğinden gelişen bir hastalık", word: "developing", trWord: "gelişen", blank: "a disease ___ from vitamin deficiency" },
  { en: "a diet lacking in protein", tr: "protein bakımından eksik bir diyet", word: "lacking", trWord: "eksik", blank: "a diet ___ in protein" },
  { en: "waves moving in the same direction", tr: "aynı yönde hareket eden dalgalar", word: "moving", trWord: "hareket eden", blank: "waves ___ in the same direction" },
  { en: "legislation existing for the individual", tr: "birey için var olan mevzuat", word: "existing", trWord: "var olan", blank: "legislation ___ for the individual" },
  { en: "a characteristic distinguishing from other species of insect", tr: "diğer böcek türlerinden ayıran bir özellik", word: "distinguishing", trWord: "ayıran", blank: "a characteristic ___ from other species of insect" },
  { en: "factors contributing to the general situation", tr: "genel duruma katkıda bulunan faktörler", word: "contributing", trWord: "katkıda bulunan", blank: "factors ___ to the general situation" },
  { en: "a mixture consisting of sand, cement and water", tr: "kum, çimento ve sudan oluşan bir karışım", word: "consisting", trWord: "oluşan", blank: "a mixture ___ of sand, cement and water" },
  { en: "a compound consisting of salt and acids", tr: "tuz ve asitlerden oluşan bir bileşik", word: "consisting", trWord: "oluşan", blank: "a compound ___ of salt and acids" },
  { en: "The factors emerging from the study", tr: "Çalışmadan ortaya çıkan faktörler", word: "emerging", trWord: "ortaya çıkan", blank: "The factors ___ from the study" },
  { en: "The authors publishing in academic journals", tr: "Akademik dergilerde yayın yapan yazarlar", word: "publishing", trWord: "yayın yapan", blank: "The authors ___ in academic journals" },
  { en: "The companies competing in this sector", tr: "Bu sektörde rekabet eden şirketler", word: "competing", trWord: "rekabet eden", blank: "The companies ___ in this sector" },
  { en: "The dynamic variables changing during the process", tr: "Süreç boyunca değişen dinamik değişkenler", word: "changing", trWord: "değişen", blank: "The dynamic variables ___ during the process" },
  { en: "The separate groups participating in the initial project", tr: "Başlangıç projesine katılan ayrı gruplar", word: "participating", trWord: "katılan", blank: "The separate groups ___ in the initial project" },
  { en: "The structural components remaining on the site", tr: "Sahada kalan yapısal bileşenler", word: "remaining", trWord: "kalan", blank: "The structural components ___ on the site" },
  { en: "The fundamental principles underlying this economic theory", tr: "Bu ekonomik teorinin temelini oluşturan temel ilkeler", word: "underlying", trWord: "temelini oluşturan", blank: "The fundamental principles ___ this economic theory" },
  { en: "The independent researchers working within the administration", tr: "Yönetim içinde çalışan bağımsız araştırmacılar", word: "working", trWord: "çalışan", blank: "The independent researchers ___ within the administration" },
  { en: "The consistent layers forming at the bottom of the container", tr: "Kabın dibinde oluşan tutarlı tabakalar", word: "forming", trWord: "oluşan", blank: "The consistent layers ___ at the bottom of the container" },
  { en: "The legal authorities acting under constitutional clauses", tr: "Anayasal maddeler uyarınca hareket eden yasal otoriteler", word: "acting", trWord: "hareket eden", blank: "The legal authorities ___ under constitutional clauses" }
];

const unit12Lesson2SentencesRaw = [
  { en: "a diagram showing the classification", tr: "sınıflandırmayı gösteren bir şema", word: "showing", trWord: "gösteren", blank: "a diagram ___ the classification" },
  { en: "a statement containing the facts", tr: "gerçekleri içeren bir ifade", word: "containing", trWord: "içeren", blank: "a statement ___ the facts" },
  { en: "an article describing the situation", tr: "durumu açıklayan bir makale", word: "describing", trWord: "açıklayan", blank: "an article ___ the situation" },
  { en: "a wire connecting the electrodes", tr: "elektrotları bağlayan bir tel", word: "connecting", trWord: "bağlayan", blank: "a wire ___ the electrodes" },
  { en: "a cover protecting the contents", tr: "içeriği koruyan bir kapak", word: "protecting", trWord: "koruyan", blank: "a cover ___ the contents" },
  { en: "principles determining the right", tr: "hakkı belirleyen ilkeler", word: "determining", trWord: "belirleyen", blank: "principles ___ the right" },
  { en: "a statement defining the principles", tr: "ilkeleri tanımlayan bir ifade", word: "defining", trWord: "tanımlayan", blank: "a statement ___ the principles" },
  { en: "a law protecting the individual", tr: "bireyi koruyan bir yasa", word: "protecting", trWord: "koruyan", blank: "a law ___ the individual" },
  { en: "laws protecting the rights", tr: "hakları koruyan yasalar", word: "protecting", trWord: "koruyan", blank: "laws ___ the rights" },
  { en: "evidence proving the guilt", tr: "suçluluğu kanıtlayan delil", word: "proving", trWord: "kanıtlayan", blank: "evidence ___ the guilt" },
  { en: "experiments proving the theory", tr: "teoriyi kanıtlayan deneyler", word: "proving", trWord: "kanıtlayan", blank: "experiments ___ the theory" },
  { en: "a community cultivating the land", tr: "toprağı işleyen bir topluluk", word: "cultivating", trWord: "işleyen", blank: "a community ___ the land" },
  { en: "a principle establishing the rights", tr: "hakları tesis eden bir ilke", word: "establishing", trWord: "tesis eden", blank: "a principle ___ the rights" },
  { en: "a gas giving off a smell", tr: "koku yayan bir gaz", word: "giving", trWord: "yayan", blank: "a gas ___ off a smell" },
  { en: "a flask containing a liquid", tr: "sıvı içeren bir balon", word: "containing", trWord: "içeren", blank: "a flask ___ a liquid" },
  { en: "a tenant occupying premises", tr: "mülkü işgal eden bir kiracı", word: "occupying", trWord: "işgal eden", blank: "a tenant ___ premises" },
  { en: "a contract binding both parties", tr: "her iki tarafı da bağlayan bir sözleşme", word: "binding", trWord: "bağlayan", blank: "a contract ___ both parties" },
  { en: "a guarantee promising protection", tr: "koruma vaat eden bir garanti", word: "promising", trWord: "vaat eden", blank: "a guarantee ___ protection" },
  { en: "a policy creating many problems", tr: "birçok sorun yaratan bir politika", word: "creating", trWord: "yaratan", blank: "a policy ___ many problems" },
  { en: "characteristics distinguishing this species", tr: "bu türü ayıran özellikler", word: "distinguishing", trWord: "ayıran", blank: "characteristics ___ this species" },
  { en: "water containing pollen dust", tr: "polen tozu içeren su", word: "containing", trWord: "içeren", blank: "water ___ pollen dust" },
  { en: "a statement containing a description of the accident", tr: "kazanın açıklamasını içeren bir ifade", word: "containing", trWord: "içeren", blank: "a statement ___ a description of the accident" },
  { en: "a diagram showing the classification of the species", tr: "türlerin sınıflandırılmasını gösteren bir şema", word: "showing", trWord: "gösteren", blank: "a diagram ___ the classification of the species" },
  { en: "a statement addressing the whole community", tr: "tüm topluluğa hitap eden bir ifade", word: "addressing", trWord: "hitap eden", blank: "a statement ___ the whole community" },
  { en: "a report approving the decisions of the council", tr: "konseyin kararlarını onaylayan bir rapor", word: "approving", trWord: "onaylayan", blank: "a report ___ the decisions of the council" },
  { en: "a wire connecting the electrodes to the battery", tr: "elektrotları bataryaya bağlayan bir tel", word: "connecting", trWord: "bağlayan", blank: "a wire ___ the electrodes to the battery" },
  { en: "action creating confusion in the court of law", tr: "mahkemede kafa karışıklığı yaratan eylem", word: "creating", trWord: "yaratan", blank: "action ___ confusion in the court of law" },
  { en: "an experiment demonstrating the principles of relativity", tr: "görelilik ilkelerini gösteren bir deney", word: "demonstrating", trWord: "gösteren", blank: "an experiment ___ the principles of relativity" },
  { en: "an article describing the newly-discovered objects", tr: "yeni keşfedilen nesneleri tanımlayan bir makale", word: "describing", trWord: "tanımlayan", blank: "an article ___ the newly-discovered objects" },
  { en: "a principle determining the rights of the people", tr: "halkın haklarını belirleyen bir ilke", word: "determining", trWord: "belirleyen", blank: "a principle ___ the rights of the people" },
  { en: "a constitution establishing the rights of the people", tr: "halkın haklarını tesis eden bir anayasa", word: "establishing", trWord: "tesis eden", blank: "a constitution ___ the rights of the people" },
  { en: "a law limiting the sale of drugs", tr: "ilaçların satışını sınırlayan bir yasa", word: "limiting", trWord: "sınırlayan", blank: "a law ___ the sale of drugs" },
  { en: "a statement defining the principles of democracy", tr: "demokrasinin ilkelerini tanımlayan bir ifade", word: "defining", trWord: "tanımlayan", blank: "a statement ___ the principles of democracy" },
  { en: "a statement containing the facts of the case", tr: "davanın gerçeklerini içeren bir ifade", word: "containing", trWord: "içeren", blank: "a statement ___ the facts of the case" },
  { en: "an exhibition containing some of the best work", tr: "en iyi çalışmalardan bazılarını içeren bir sergi", word: "containing", trWord: "içeren", blank: "an exhibition ___ some of the best work" },
  { en: "evidence proving the guilt of the defendant", tr: "davalının suçluluğunu kanıtlayan delil", word: "proving", trWord: "kanıtlayan", blank: "evidence ___ the guilt of the defendant" },
  { en: "laws protecting the freedom of the individual", tr: "bireyin özgürlüğünü koruyan yasalar", word: "protecting", trWord: "koruyan", blank: "laws ___ the freedom of the individual" },
  { en: "a promise guaranteeing the rights of the individual", tr: "bireyin haklarını garanti eden bir vaat", word: "guaranteeing", trWord: "garanti eden", blank: "a promise ___ the rights of the individual" },
  { en: "an innovation introducing many new methods", tr: "birçok yeni yöntem getiren bir yenilik", word: "introducing", trWord: "getiren", blank: "an innovation ___ many new methods" },
  { en: "an experiment necessitating careful observation", tr: "dikkatli gözlem gerektiren bir deney", word: "necessitating", trWord: "gerektiren", blank: "an experiment ___ careful observation" },
  { en: "new laws affecting every individual of community", tr: "toplumun her bireyini etkileyen yeni yasalar", word: "affecting", trWord: "etkileyen", blank: "new laws ___ every individual of community" },
  { en: "a policy granting new benefits to the old and unemployed", tr: "yaşlılara ve işsizlere yeni faydalar sağlayan bir politika", word: "granting", trWord: "sağlayan", blank: "a policy ___ new benefits to the old and unemployed" },
  { en: "a characteristic distinguishing this species of insect", tr: "bu böcek türünü ayıran bir özellik", word: "distinguishing", trWord: "ayıran", blank: "a characteristic ___ this species of insect" },
  { en: "activity endangering the lives of members of the community", tr: "toplum üyelerinin hayatlarını tehlikeye atan faaliyet", word: "endangering", trWord: "tehlikeye atan", blank: "activity ___ the lives of members of the community" },
  { en: "factors governing the rate of growth", tr: "büyüme hızını belirleyen faktörler", word: "governing", trWord: "belirleyen", blank: "factors ___ the rate of growth" },
  { en: "a document authorizing the owner of the premises", tr: "mülk sahibine yetki veren bir belge", word: "authorizing", trWord: "yetki veren", blank: "a document ___ the owner of the premises" },
  { en: "The movement of molecules could be seen in water containing pollen dust.", tr: "Moleküllerin hareketi, polen tozu içeren suda görülebilirdi.", word: "containing", trWord: "içeren", blank: "The movement of molecules could be seen in water ___ pollen dust." },
  { en: "He gave the police a statement containing a description of the accident.", tr: "Polise, kazanın açıklamasını içeren bir ifade verdi.", word: "containing", trWord: "içeren", blank: "He gave the police a statement ___ a description of the accident." },
  { en: "On this page there is a diagram showing the classification of the species.", tr: "Bu sayfada, türlerin sınıflandırılmasını gösteren bir şema var.", word: "showing", trWord: "gösteren", blank: "On this page there is a diagram ___ the classification of the species." },
  { en: "The report contains a statement addressing the whole community.", tr: "Rapor, tüm topluluğa hitap eden bir ifade içermektedir.", word: "addressing", trWord: "hitap eden", blank: "The report contains a statement ___ the whole community." },
  { en: "A report approving the decisions of the council was read to the court.", tr: "Konseyin kararlarını onaylayan bir rapor mahkemede okundu.", word: "approving", trWord: "onaylayan", blank: "A report ___ the decisions of the council was read to the court." },
  { en: "The current passes along a wire connecting the electrode to the battery.", tr: "Akım, elektrodu bataryaya bağlayan bir tel boyunca geçer.", word: "connecting", trWord: "bağlayan", blank: "The current passes along a wire ___ the electrode to the battery." },
  { en: "He was accused of action creating confusion in the court of law.", tr: "Mahkemede kafa karışıklığı yaratan eylemlerle suçlandı.", word: "creating", trWord: "yaratan", blank: "He was accused of action ___ confusion in the court of law." },
  { en: "This is an experiment demonstrating the principles of relativity.", tr: "Bu, görelilik ilkelerini gösteren bir deneydir.", word: "demonstrating", trWord: "gösteren", blank: "This is an experiment ___ the principles of relativity." },
  { en: "He has published an article describing the newly-discovered objects.", tr: "Yeni keşfedilen nesneleri tanımlayan bir makale yayımladı.", word: "describing", trWord: "tanımlayan", blank: "He has published an article ___ the newly-discovered objects." },
  { en: "The principle determining the rights of the people was explained in the lecture.", tr: "Halkın haklarını belirleyen ilke derste açıklandı.", word: "determining", trWord: "belirleyen", blank: "The principle ___ the rights of the people was explained in the lecture." },
  { en: "There was no constitution establishing the rights of the people.", tr: "Halkın haklarını tesis eden bir anayasa yoktu.", word: "establishing", trWord: "tesis eden", blank: "There was no constitution ___ the rights of the people." },
  { en: "A law limiting the sale of drugs was passed in 1936.", tr: "İlaçların satışını sınırlayan bir yasa 1936'da kabul edildi.", word: "limiting", trWord: "sınırlayan", blank: "A law ___ the sale of drugs was passed in 1936." },
  { en: "He published a statement defining the principles of democracy.", tr: "Demokrasinin ilkelerini tanımlayan bir bildiri yayımladı.", word: "defining", trWord: "tanımlayan", blank: "He published a statement ___ the principles of democracy." },
  { en: "He published a statement containing the facts of the case.", tr: "Davanın gerçeklerini içeren bir bildiri yayımladı.", word: "containing", trWord: "içeren", blank: "He published a statement ___ the facts of the case." },
  { en: "Last year there was an exhibition containing some of the best work of the Renaissance in Italy.", tr: "Geçen yıl, İtalya'da Rönesans'ın en iyi çalışmalarından bazılarını içeren bir sergi vardı.", word: "containing", trWord: "içeren", blank: "Last year there was an exhibition ___ some of the best work of the Renaissance in Italy." },
  { en: "The witness could provide no evidence proving the guilt of the defendant.", tr: "Tanık, davalının suçluluğunu kanıtlayan hiçbir delil sunamadı.", word: "proving", trWord: "kanıtlayan", blank: "The witness could provide no evidence ___ the guilt of the defendant." },
  { en: "There are many many laws protecting the freedom of the individual.", tr: "Bireyin özgürlüğünü koruyan pek çok yasa vardır.", word: "protecting", trWord: "koruyan", blank: "There are many many laws ___ the freedom of the individual." },
  { en: "This was contained in a promise guaranteeing the rights of the individual.", tr: "Bu, bireyin haklarını garanti eden bir vaatte yer alıyordu.", word: "guaranteeing", trWord: "garanti eden", blank: "This was contained in a promise ___ the rights of the individual." },
  { en: "Electrical power was an innovation introducing many new methods in industry.", tr: "Elektrik gücü, endüstride pek çok yeni yöntem getiren bir yenilikti.", word: "introducing", trWord: "getiren", blank: "Electrical power was an innovation ___ many new methods in industry." },
  { en: "This could be proved in an experiment necessitating careful observation.", tr: "Bu, dikkatli gözlem gerektiren bir deneyle kanıtlanabilirdi.", word: "necessitating", trWord: "gerektiren", blank: "This could be proved in an experiment ___ careful observation." },
  { en: "The government has passed many new laws affecting every individual of the community.", tr: "Hükümet, toplumun her bireyini etkileyen pek çok yeni yasa çıkardı.", word: "affecting", trWord: "etkleyen", blank: "The government has passed many new laws ___ every individual of the community." },
  { en: "The government has proposed a policy granting new benefits to the old and unemployed.", tr: "Hükümet, yaşlılara ve işsizlere yeni faydalar sağlayan bir politika önerdi.", word: "granting", trWord: "sağlayan", blank: "The government has proposed a policy ___ new benefits to the old and unemployed." },
  { en: "The shape of the head and thorax is a characteristic distinguishing this species of insect.", tr: "Baş ve göğüs kafesinin şekli, bu böcek türünü ayıran bir özelliktir.", word: "distinguishing", trWord: "ayıran", blank: "The shape of the head and thorax is a characteristic ___ this species of insect." },
  { en: "They were engaged in activity endangering the lives of members of the community.", tr: "Toplum üyelerinin hayatlarını tehlikeye atan faaliyetlerle meşguldüler.", word: "endangering", trWord: "tehlikeye atan", blank: "They were engaged in activity ___ the lives of members of the community." },
  { en: "There are many factors governing the rate of growth of a plant or tree.", tr: "Bir bitki veya ağacın büyüme hızını belirleyen pek çok faktör vardır.", word: "governing", trWord: "belirleyen", blank: "There are many factors ___ the rate of growth of a plant or tree." },
  { en: "There was no signature on the document authorizing the owner of the premises to empty the rooms.", tr: "Mülk sahibine odaları boşaltma yetkisi veren belgede imza yoktu.", word: "authorizing", trWord: "yetki veren", blank: "There was no signature on the document ___ the owner of the premises to empty the rooms." }
];

const unit12Lesson3SentencesRaw = [
  { en: "nations united in their desire for peace", tr: "barış arzularında birleşmiş uluslar", word: "united", trWord: "birleşmiş", blank: "nations ___ in their desire for peace" },
  { en: "facts well-known to scientists", tr: "bilim insanlarınca iyi bilinen gerçekler", word: "well-known", trWord: "iyi bilinen", blank: "facts ___ to scientists" },
  { en: "a compound composed of two elements", tr: "iki elementten oluşan bir bileşik", word: "composed", trWord: "oluşan", blank: "a compound ___ of two elements" },
  { en: "a picture simplified for children", tr: "çocuklar için basitleştirilmiş bir resim", word: "simplified", trWord: "basitleştirilmiş", blank: "a picture ___ for children" },
  { en: "all the materials needed for their industries", tr: "sanayileri için ihtiyaç duyulan tüm malzemeler", word: "needed", trWord: "ihtiyaç duyulan", blank: "all the materials ___ for their industries" },
  { en: "lead exposed to the air", tr: "havaya maruz kalmış kurşun", word: "exposed", trWord: "maruz kalmış", blank: "lead ___ to the air" },
  { en: "organisms classified in the vegetable kingdom", tr: "bitkiler aleminde sınıflandırılan organizmalar", word: "classified", trWord: "sınıflandırılan", blank: "organisms ___ in the vegetable kingdom" },
  { en: "the energy produced by an atomic pile", tr: "bir atomik reaktör tarafından üretilen enerji", word: "produced", trWord: "üretilen", blank: "the energy ___ by an atomic pile" },
  { en: "energy produced by an atom", tr: "bir atom tarafından üretilen enerji", word: "produced", trWord: "üretilen", blank: "energy ___ by an atom" },
  { en: "gamma rays emitted by a small piece of cobalt", tr: "küçük bir kobalt parçası tarafından yayılan gama ışınları", word: "emitted", trWord: "yayılan", blank: "gamma rays ___ by a small piece of cobalt" },
  { en: "woods inhabited by wild animals", tr: "vahşi hayvanların yaşadığı ormanlar", word: "inhabited", trWord: "yaşadığı", blank: "woods ___ by wild animals" },
  { en: "food produced by their enzyme action", tr: "enzim aktiviteleri tarafından üretilen besin", word: "produced", trWord: "üretilen", blank: "food ___ by their enzyme action" },
  { en: "land exposed to the danger of floods", tr: "sel tehlikesine maruz kalan arazi", word: "exposed", trWord: "maruz kalan", blank: "land ___ to the danger of floods" },
  { en: "information needed to develop the programme", tr: "programı geliştirmek için ihtiyaç duyulan bilgi", word: "needed", trWord: "ihtiyaç duyulan", blank: "information ___ to develop the programme" },
  { en: "subject matter used as a basis for teaching", tr: "öğretim için temel olarak kullanılan konu", word: "used", trWord: "kullanılan", blank: "subject matter ___ as a basis for teaching" },
  { en: "waves emitted by the stars", tr: "yıldızlar tarafından yayılan dalgalar", word: "emitted", trWord: "yayılan", blank: "waves ___ by the stars" },
  { en: "signals sent by artificial satellites and rockets", tr: "yapay uydular ve roketler tarafından gönderilen sinyaller", word: "sent", trWord: "gönderilen", blank: "signals ___ by artificial satellites and rockets" },
  { en: "towns surrounded by strong walls", tr: "güçlü surlarla çevrili kasabalar", word: "surrounded", trWord: "çevrili", blank: "towns ___ by strong walls" },
  { en: "vibrations generated by the light source", tr: "ışık kaynağı tarafından üretilen titreşimler", word: "generated", trWord: "üretilen", blank: "vibrations ___ by the light source" },
  { en: "effects expected from the programmes", tr: "programlardan beklenen etkiler", word: "expected", trWord: "beklenen", blank: "effects ___ from the programmes" },
  { en: "programmes outlined in the reports", tr: "raporlarda taslağı çizilen programlar", word: "outlined", trWord: "belirtilen", blank: "programmes ___ in the reports" },
  { en: "surveys made before the 1936 Flood Control Act", tr: "1936 Sel Kontrol Yasasından önce yapılan araştırmalar", word: "made", trWord: "yapılan", blank: "surveys ___ before the 1936 Flood Control Act" },
  { en: "There were representatives from many nations united in their desire for peace.", tr: "Barış arzularında birleşmiş pek coğundan temsilciler vardı.", word: "united", trWord: "birleşmiş", blank: "There were representatives from many nations ___ in their desire for peace." },
  { en: "These are facts well-known to scientists.", tr: "Bunlar, bilim insanlarınca iyi bilinen gerçeklerdir.", word: "well-known", trWord: "iyi bilinen", blank: "These are facts ___ to scientists." },
  { en: "This produces a compound composed of two elements.", tr: "Bu, iki elementten oluşan bir bileşik üretir.", word: "composed", trWord: "oluşan", blank: "This produces a compound ___ of two elements." },
  { en: "This book contains pictures simplified for children to understand.", tr: "Bu kitap, çocukların anlaması için basitleştirilmiş resimler içerir.", word: "simplified", trWord: "basitleştirilmiş", blank: "This book contains pictures ___ for children to understand." },
  { en: "European countries do not produce all the materials needed for their industries.", tr: "Avrupa ülkeleri, sanayileri için ihtiyaç duyulan tüm malzemeleri üretmezler.", word: "needed", trWord: "ihtiyaç duyulan", blank: "European countries do not produce all the materials ___ for their industries." },
  { en: "A piece of lead exposed to the air becomes covered with a black film.", tr: "Havaya maruz kalan bir kurşun parçası siyah bir tabaka ile kaplanır.", word: "exposed", trWord: "maruz kalan", blank: "A piece of lead ___ to the air becomes covered with a black film." },
  { en: "Bacteria are microscopic organisms classified in the vegetable kingdom.", tr: "Bakteriler, bitkiler aleminde sınıflandırılan mikroskobik organizmalardır.", word: "classified", trWord: "sınıflandırılan", blank: "Bacteria are microscopic organisms ___ in the vegetable kingdom." },
  { en: "The energy produced by an atomic pile is not cheap.", tr: "Atomik reaktör tarafından üretilen enerji ucuz değildir.", word: "produced", trWord: "üretilen", blank: "The energy ___ by an atomic pile is not cheap." },
  { en: "Energy produced by an atom costs more than energy produced by coal or petroleum.", tr: "Bir atom tarafından üretilen enerji, kömür veya petrolden üretilen enerjiden daha pahalıya mal olur.", word: "produced", trWord: "üretilen", blank: "Energy ___ by an atom costs more than energy produced by coal or petroleum." },
  { en: "The gamma rays emitted by a small piece of cobalt contained in a protecting cover penetrate to the cells.", tr: "Koruyucu bir kapak içinde bulunan küçük bir kobalt parçası tarafından yayılan gama ışınları hücrelere nüfuz eder.", word: "emitted", trWord: "yayılan", blank: "The gamma rays ___ by a small piece of cobalt contained in a protecting cover penetrate to the cells." },
  { en: "These were woods inhabited by wild animals.", tr: "Bunlar, vahşi hayvanların yaşadığı ormanlardı.", word: "inhabited", trWord: "yaşadığı", blank: "These were woods ___ by wild animals." },
  { en: "The fungi absorbs the liquid food produced by their enzyme action.", tr: "Mantarlar, enzim aktiviteleri tarafından üretilen sıvı besini emer.", word: "produced", trWord: "üretilen", blank: "The fungi absorbs the liquid food ___ by their enzyme action." },
  { en: "We could see large areas of land exposed to the danger of floods.", tr: "Sel tehlikesine maruz kalan geniş arazi alanları görebiliyorduk.", word: "exposed", trWord: "maruz kalan", blank: "We could see large areas of land ___ to the danger of floods." },
  { en: "The department provides the information needed to develop the programme.", tr: "Departman, programı geliştirmek için ihtiyaç duyulan bilgileri sağlar.", word: "needed", trWord: "ihtiyaç duyulan", blank: "The department provides the information ___ to develop the programme." },
  { en: "The subject matter used as a basis for teaching is provided by the educational department.", tr: "Öğretim için temel olarak kullanılan konu eğitim departmanı tarafından sağlanır.", word: "used", trWord: "kullanılan", blank: "The subject matter ___ as a basis for teaching is provided by the educational department." },
  { en: "Electro-magnetic waves emitted by stars are recorded by radio telescope.", tr: "Yıldızlar tarafından yayılan elektromanyetik dalgalar radyo teleskopu ile kaydedilir.", word: "emitted", trWord: "yayılan", blank: "Electro-magnetic waves ___ by stars are recorded by radio telescope." },
  { en: "Radio telescopes also receive radio signals sent by artificial satellites.", tr: "Radyo teleskopları ayrıca yapay uydular tarafından gönderilen radyo sinyallerini de alır.", word: "sent", trWord: "gönderilen", blank: "Radio telescopes also receive radio signals ___ by artificial satellites." },
  { en: "Primitive villages gradually developed into towns surrounded by strong walls.", tr: "İlkel köyler kademeli olarak güçlü surlarla çevrili kasabalara dönüştü.", word: "surrounded", trWord: "çevrili", blank: "Primitive villages gradually developed into towns ___ by strong walls." },
  { en: "Light consists of vibrations generated by the light source.", tr: "Işık, ışık kaynağı tarafından üretilen titreşimlerden oluşur.", word: "generated", trWord: "üretilen", blank: "Light consists of vibrations ___ by the light source." },
  { en: "The beneficial effects expected from the programmes outlined in the reports were described in the surveys made before the 1936 Flood Control Act.", tr: "Araştırmalarda, 1936 Sel Kontrol Yasasından önce yapılan raporlarda belirtilen programlardan beklenen olumlu etkiler açıklanmıştır.", word: "expected", trWord: "beklenen", blank: "The beneficial effects ___ from the programmes outlined in the reports were described in the surveys made before the 1936 Flood Control Act." }
];

const unit10LessonSentences = {
  1: [
    // Simple Present Passive — Geniş Zaman Edilgen (basit → karmaşık sıralı)
    { en: "Growth is anticipated.", tr: "Büyüme öngörülmektedir.", word: "anticipated", trWord: "öngörülmektedir", blank: "Growth is ___." },
    { en: "Reform is advocated.", tr: "Reform savunulmaktadır.", word: "advocated", trWord: "savunulmaktadır", blank: "Reform is ___." },
    { en: "Context is specified.", tr: "Bağlam belirtilmektedir.", word: "specified", trWord: "belirtilmektedir", blank: "Context is ___." },
    { en: "Insights are derived.", tr: "Çıkarımlar elde edilmektedir.", word: "derived", trWord: "elde edilmektedir", blank: "Insights are ___." },
    { en: "Ratios are calculated.", tr: "Oranlar hesaplanmaktadır.", word: "calculated", trWord: "hesaplanmaktadır", blank: "Ratios are ___." },
    { en: "Parameters are defined.", tr: "Parametreler tanımlanmaktadır.", word: "defined", trWord: "tanımlanmaktadır", blank: "Parameters are ___." },
    { en: "The project is abandoned.", tr: "Proje terk edilmiştir.", word: "abandoned", trWord: "terk edilmiştir", blank: "The project is ___." },
    { en: "The dynamic is triggered.", tr: "Dinamik tetiklenmektedir.", word: "triggered", trWord: "tetiklenmektedir", blank: "The dynamic is ___." },
    { en: "The sector is expanded.", tr: "Sektör genişletilmektedir.", word: "expanded", trWord: "genişletilmektedir", blank: "The sector is ___." },
    { en: "The framework is inspected.", tr: "Çerçeve incelenmektedir.", word: "inspected", trWord: "incelenmektedir", blank: "The framework is ___." },
    // Simple Past Passive — Geçmiş Zaman Edilgen
    { en: "Data was processed.", tr: "Veriler işlendi.", word: "processed", trWord: "işlendi", blank: "Data was ___." },
    { en: "Media was manipulated.", tr: "Medya manipüle edildi.", word: "manipulated", trWord: "manipüle edildi", blank: "Media was ___." },
    { en: "Rules were suspended.", tr: "Kurallar askıya alındı.", word: "suspended", trWord: "askıya alındı", blank: "Rules were ___." },
    { en: "Surveys were conducted.", tr: "Anketler yürütüldü.", word: "conducted", trWord: "yürütüldü", blank: "Surveys were ___." },
    { en: "Inputs were modified.", tr: "Girdiler değiştirildi.", word: "modified", trWord: "değiştirildi", blank: "Inputs were ___." },
    { en: "Modules were integrated.", tr: "Modüller entegre edildi.", word: "integrated", trWord: "entegre edildi", blank: "Modules were ___." },
    { en: "The scope was clarified.", tr: "Kapsam netleştirildi.", word: "clarified", trWord: "netleştirildi", blank: "The scope was ___." },
    { en: "The anomaly was detected.", tr: "Anomali tespit edildi.", word: "detected", trWord: "tespit edildi", blank: "The anomaly was ___." },
    { en: "Hypotheses were validated.", tr: "Hipotezler doğrulandı.", word: "validated", trWord: "doğrulandı", blank: "Hypotheses were ___." },
    { en: "Agreements were not terminated.", tr: "Anlaşmalar feshedilmedi.", word: "terminated", trWord: "feshedilmedi", blank: "Agreements were not ___." }
  ],
  2: [
    // Future Passive — Gelecek Zaman Edilgen
    { en: "Flaws will be exposed.", tr: "Kusurlar açığa çıkarılacak.", word: "exposed", trWord: "açığa çıkarılacak", blank: "Flaws will be ___." },
    { en: "Stress will be induced.", tr: "Stres uygulanacak.", word: "induced", trWord: "uygulanacak", blank: "Stress will be ___." },
    { en: "Access will be restricted.", tr: "Erişim kısıtlanacak.", word: "restricted", trWord: "kısıtlanacak", blank: "Access will be ___." },
    { en: "Formats will be altered.", tr: "Formatlar değiştirilecek.", word: "altered", trWord: "değiştirilecek", blank: "Formats will be ___." },
    { en: "The core will be stabilized.", tr: "Çekirdek stabilize edilecek.", word: "stabilized", trWord: "stabilize edilecek", blank: "The core will be ___." },
    // Present Perfect Passive — Yakın Geçmiş Edilgen
    { en: "Funds have been shifted.", tr: "Fonlar aktarıldı.", word: "shifted", trWord: "aktarıldı", blank: "Funds have been ___." },
    { en: "Privacy has been violated.", tr: "Gizlilik ihlal edildi.", word: "violated", trWord: "ihlal edildi", blank: "Privacy has been ___." },
    { en: "Output has been maximized.", tr: "Çıktı en üst düzeye çıkarıldı.", word: "maximized", trWord: "en üst düzeye çıkarıldı", blank: "Output has been ___." },
    { en: "Logs have been accumulated.", tr: "Kayıtlar biriktirildi.", word: "accumulated", trWord: "biriktirildi", blank: "Logs have been ___." },
    { en: "Resources have been allocated.", tr: "Kaynaklar tahsis edildi.", word: "allocated", trWord: "tahsis edildi", blank: "Resources have been ___." }
  ],
  3: [
    // Olumsuz Edilgen — Simple Present Passive Negative
    { en: "Growth is not anticipated.", tr: "Büyüme öngörülmemektedir.", word: "anticipated", trWord: "öngörülmemektedir", blank: "Growth is not ___." },
    { en: "Reform is not advocated.", tr: "Reform savunulmamaktadır.", word: "advocated", trWord: "savunulmamaktadır", blank: "Reform is not ___." },
    { en: "Context is not specified.", tr: "Bağlam belirtilmemektedir.", word: "specified", trWord: "belirtilmemektedir", blank: "Context is not ___." },
    { en: "Insights are not derived.", tr: "Çıkarımlar elde edilmemektedir.", word: "derived", trWord: "elde edilmemektedir", blank: "Insights are not ___." },
    { en: "Ratios are not calculated.", tr: "Oranlar hesaplanmamaktadır.", word: "calculated", trWord: "hesaplanmamaktadır", blank: "Ratios are not ___." },
    { en: "Parameters are not defined.", tr: "Parametreler tanımlanmamaktadır.", word: "defined", trWord: "tanımlanmamaktadır", blank: "Parameters are not ___." },
    { en: "The project is not abandoned.", tr: "Proje terk edilmemiştir.", word: "abandoned", trWord: "terk edilmemiştir", blank: "The project is not ___." },
    { en: "The dynamic is not triggered.", tr: "Dinamik tetiklenmemektedir.", word: "triggered", trWord: "tetiklenmemektedir", blank: "The dynamic is not ___." },
    { en: "The sector is not expanded.", tr: "Sektör genişletilmemektedir.", word: "expanded", trWord: "genişletilmemektedir", blank: "The sector is not ___." },
    { en: "The framework is not inspected.", tr: "Çerçeve incelenmemektedir.", word: "inspected", trWord: "incelenmemektedir", blank: "The framework is not ___." },
    // Olumsuz Edilgen — Simple Past Passive Negative
    { en: "Surveys were not conducted.", tr: "Anketler yürütülmedi.", word: "conducted", trWord: "yürütülmedi", blank: "Surveys were not ___." },
    { en: "Media was not manipulated.", tr: "Medya manipüle edilmedi.", word: "manipulated", trWord: "manipüle edilmedi", blank: "Media was not ___." },
    { en: "The scope was not clarified.", tr: "Kapsam netleştirilmedi.", word: "clarified", trWord: "netleştirilmedi", blank: "The scope was not ___." },
    { en: "Inputs were not modified.", tr: "Girdiler değiştirilmedi.", word: "modified", trWord: "değiştirilmedi", blank: "Inputs were not ___." },
    { en: "Modules were not integrated.", tr: "Modüller entegre edilmedi.", word: "integrated", trWord: "entegre edilmedi", blank: "Modules were not ___." },
    { en: "Data was not processed.", tr: "Veriler işlenmedi.", word: "processed", trWord: "işlenmedi", blank: "Data was not ___." },
    { en: "The anomaly was not detected.", tr: "Anomali tespit edilmedi.", word: "detected", trWord: "tespit edilmedi", blank: "The anomaly was not ___." },
    { en: "Hypotheses were not validated.", tr: "Hipotezler doğrulanmadı.", word: "validated", trWord: "doğrulanmadı", blank: "Hypotheses were not ___." },
    { en: "Rules were not suspended.", tr: "Kurallar askıya alınmadı.", word: "suspended", trWord: "askıya alınmadı", blank: "Rules were not ___." },
    { en: "Agreements were not terminated.", tr: "Anlaşmalar feshedilmedi.", word: "terminated", trWord: "feshedilmedi", blank: "Agreements were not ___." }
  ],
  4: [
    // Karmaşık Edilgen Cümleler — Basitten karmaşığa sıralı (10-13 kelime)
    // 10 kelime
    { en: "Significant annual financial growth is anticipated by senior financial analysts.", tr: "Önemli yıllık finansal büyüme kıdemli finansal analistler tarafından öngörülmektedir.", word: "anticipated", trWord: "öngörülmektedir", blank: "Significant annual financial growth is ___ by senior financial analysts." },
    { en: "Comprehensive legislative tax reform is advocated by leading institutional authorities.", tr: "Kapsamlı yasal vergi reformu önde gelen kurumsal otoriteler tarafından savunulmaktadır.", word: "advocated", trWord: "savunulmaktadır", blank: "Comprehensive legislative tax reform is ___ by leading institutional authorities." },
    { en: "Valuable qualitative insights are derived from comprehensive regional educational surveys.", tr: "Değerli niteliksel çıkarımlar kapsamlı bölgesel eğitim anketlerinden elde edilmektedir.", word: "derived", trWord: "elde edilmektedir", blank: "Valuable qualitative insights are ___ from comprehensive regional educational surveys." },
    { en: "Alternative scientific hypotheses were validated by the final scientific finding.", tr: "Alternatif bilimsel hipotezler nihai bilimsel bulgu tarafından doğrulandı.", word: "validated", trWord: "doğrulandı", blank: "Alternative scientific hypotheses were ___ by the final scientific finding." },
    // 11 kelime
    { en: "The initial investigative project is abandoned by the software development team.", tr: "Başlangıçtaki araştırma projesi yazılım geliştirme ekibi tarafından terk edilmiştir.", word: "abandoned", trWord: "terk edilmiştir", blank: "The initial investigative project is ___ by the software development team." },
    { en: "Crucial technical system parameters are defined by the revised security protocol.", tr: "Kritik teknik sistem parametreleri revize edilmiş güvenlik protokolü tarafından tanımlanmaktadır.", word: "defined", trWord: "tanımlanmaktadır", blank: "Crucial technical system parameters are ___ by the revised security protocol." },
    { en: "Complex mathematical data ratios are calculated by the automated background script.", tr: "Karmaşık matematiksel veri oranları otomatik arka plan betiği tarafından hesaplanmaktadır.", word: "calculated", trWord: "hesaplanmaktadır", blank: "Complex mathematical data ratios are ___ by the automated background script." },
    { en: "The entire underlying structural framework is inspected by independent technical experts.", tr: "Tüm temel yapısal çerçeve bağımsız teknik uzmanlar tarafından incelenmektedir.", word: "inspected", trWord: "incelenmektedir", blank: "The entire underlying structural framework is ___ by independent technical experts." },
    { en: "The undetected structural anomaly was detected by the principal laboratory researcher.", tr: "Tespit edilmemiş yapısal anomali baş laboratuvar araştırmacısı tarafından tespit edildi.", word: "detected", trWord: "tespit edildi", blank: "The undetected structural anomaly was ___ by the principal laboratory researcher." },
    { en: "Outdated environmental safety regulations were suspended by the regional administrative council.", tr: "Güncelliğini yitirmiş çevresel güvenlik düzenlemeleri bölgesel idari kurul tarafından askıya alındı.", word: "suspended", trWord: "askıya alındı", blank: "Outdated environmental safety regulations were ___ by the regional administrative council." },
    { en: "Formal bilateral commercial agreements were terminated by the executive internal board.", tr: "Resmi ikili ticari anlaşmalar yürütme iç kurulu tarafından feshedildi.", word: "terminated", trWord: "feshedildi", blank: "Formal bilateral commercial agreements were ___ by the executive internal board." },
    { en: "Comprehensive regional educational surveys were conducted by the national education ministry.", tr: "Kapsamlı bölgesel eğitim anketleri ulusal eğitim bakanlığı tarafından yürütüldü.", word: "conducted", trWord: "yürütüldü", blank: "Comprehensive regional educational surveys were ___ by the national education ministry." },
    { en: "Public political and cultural perspective was manipulated by mainstream digital media.", tr: "Kamusal siyasi ve kültürel perspektif ana akım dijital medya tarafından manipüle edildi.", word: "manipulated", trWord: "manipüle edildi", blank: "Public political and cultural perspective was ___ by mainstream digital media." },
    { en: "The initial investigative project scope was clarified by independent technical experts.", tr: "Başlangıçtaki araştırma projesinin kapsamı bağımsız teknik uzmanlar tarafından netleştirildi.", word: "clarified", trWord: "netleştirildi", blank: "The initial investigative project scope was ___ by independent technical experts." },
    { en: "Individual functional software modules were modified by the software development team.", tr: "Bireysel işlevsel yazılım modülleri yazılım geliştirme ekibi tarafından değiştirildi.", word: "modified", trWord: "değiştirildi", blank: "Individual functional software modules were ___ by the software development team." },
    { en: "Separate unstable chemical variables were integrated into the continuous chemical process.", tr: "Ayrı kararsız kimyasal değişkenler sürekli kimyasal sürece entegre edildi.", word: "integrated", trWord: "entegre edildi", blank: "Separate unstable chemical variables were ___ into the continuous chemical process." },
    { en: "Maximum annual manufacturing resources have been allocated by innovative corporate strategies.", tr: "Maksimum yıllık üretim kaynakları yenilikçi kurumsal stratejiler tarafından tahsis edildi.", word: "allocated", trWord: "tahsis edildi", blank: "Maximum annual manufacturing resources have been ___ by innovative corporate strategies." },
    // 12 kelime
    { en: "The broader socio-economic context is specified by the strict qualitative selection criteria.", tr: "Daha geniş sosyo-ekonomik bağlam katı niteliksel seçim kriterleri tarafından belirtilmektedir.", word: "specified", trWord: "belirtilmektedir", blank: "The broader socio-economic context is ___ by the strict qualitative selection criteria." },
    { en: "The highly competitive dynamic sector is expanded by rapid regional infrastructure expansion.", tr: "Son derece rekabetçi dinamik sektör hızlı bölgesel altyapı genişlemesiyle genişletilmektedir.", word: "expanded", trWord: "genişletilmektedir", blank: "The highly competitive dynamic sector is ___ by rapid regional infrastructure expansion." },
    { en: "The newly collected empirical data was processed by the centralized cloud database.", tr: "Yeni toplanan ampirik veriler merkezi bulut veritabanı tarafından işlendi.", word: "processed", trWord: "işlendi", blank: "The newly collected empirical data was ___ by the centralized cloud database." },
    { en: "Unauthorized user network access will be restricted by the strict institutional policy.", tr: "Yetkisiz kullanıcı ağ erişimi katı kurumsal politika tarafından kısıtlanacak.", word: "restricted", trWord: "kısıtlanacak", blank: "Unauthorized user network access will be ___ by the strict institutional policy." },
    { en: "Crucial internal device components will be stabilized by the reinforced central core.", tr: "Kritik dahili cihaz bileşenleri güçlendirilmiş merkezi çekirdek tarafından stabilize edilecek.", word: "stabilized", trWord: "stabilize edilecek", blank: "Crucial internal device components will be ___ by the reinforced central core." },
    { en: "Hidden organizational system flaws will be exposed by the independent annual audit.", tr: "Gizli organizasyonel sistem kusurları bağımsız yıllık denetim tarafından açığa çıkarılacak.", word: "exposed", trWord: "açığa çıkarılacak", blank: "Hidden organizational system flaws will be ___ by the independent annual audit." },
    { en: "Detailed historical system logs have been accumulated by the centralized cloud database.", tr: "Ayrıntılı tarihsel sistem kayıtları merkezi bulut veritabanı tarafından biriktirildi.", word: "accumulated", trWord: "biriktirildi", blank: "Detailed historical system logs have been ___ by the centralized cloud database." },
    { en: "Sensitive user information privacy has been violated by the unauthorized network access.", tr: "Hassas kullanıcı bilgi gizliliği yetkisiz ağ erişimi tarafından ihlal edildi.", word: "violated", trWord: "ihlal edildi", blank: "Sensitive user information privacy has been ___ by the unauthorized network access." },
    // 13 kelime
    { en: "This unpredictable economic dynamic is triggered by a chain of negative physical reactions.", tr: "Bu öngörülemeyen ekonomik dinamik bir dizi olumsuz fiziksel tepkime tarafından tetiklenmektedir.", word: "triggered", trWord: "tetiklenmektedir", blank: "This unpredictable economic dynamic is ___ by a chain of negative physical reactions." },
    { en: "Exact distribution and demographic formats will be altered by the sudden paradigm shift.", tr: "Kesin dağılım ve demografik formatlar ani paradigma değişimi tarafından değiştirilecek.", word: "altered", trWord: "değiştirilecek", blank: "Exact distribution and demographic formats will be ___ by the sudden paradigm shift." },
    { en: "Severe psychological and occupational stress will be induced by the continuous chemical process.", tr: "Şiddetli psikolojik ve mesleki stres sürekli kimyasal süreç tarafından uygulanacak.", word: "induced", trWord: "uygulanacak", blank: "Severe psychological and occupational stress will be ___ by the continuous chemical process." }
  ]
};

const unit11LessonSentences = {
  1: [
    { en: "Funds can be shifted.", tr: "Fonlar kaydırılabilir.", word: "shifted", trWord: "kaydırılabilir", blank: "Funds can be ___." },
    { en: "Flaws will be exposed.", tr: "Kusurlar ortaya çıkarılacak.", word: "exposed", trWord: "ortaya çıkarılacak", blank: "Flaws will be ___." },
    { en: "Stress will be induced.", tr: "Ciddi psikolojik ve mesleki strese yol açılacak.", word: "induced", trWord: "yol açılacak", blank: "Stress will be ___." },
    { en: "Insights may be derived.", tr: "Çıkarımlar elde edilabilir.", word: "derived", trWord: "elde edilabilir", blank: "Insights may be ___." },
    { en: "Formats will be altered.", tr: "Formatlar değiştirilacak.", word: "altered", trWord: "değiştirilacak", blank: "Formats will be ___." },
    { en: "Logs can be accumulated.", tr: "Günlükler biriktirilabilir.", word: "accumulated", trWord: "biriktirilabilir", blank: "Logs can be ___." },
    { en: "Reform must be advocated.", tr: "Reform savunulmalıdır.", word: "advocated", trWord: "savunulmalıdır", blank: "Reform must be ___." },
    { en: "Rules might be suspended.", tr: "Kurallar askıya alınabilir.", word: "suspended", trWord: "askıya alınabilir", blank: "Rules might be ___." },
    { en: "Inputs could be modified.", tr: "Girdiler değiştirilabilir.", word: "modified", trWord: "değiştirilabilir", blank: "Inputs could be ___." },
    { en: "Output must be maximized.", tr: "Çıktı maksimize edilmalıdır.", word: "maximized", trWord: "maksimize edilmalıdır", blank: "Output must be ___." },
    { en: "Growth can be anticipated.", tr: "Büyüme öngörülabilir.", word: "anticipated", trWord: "öngörülabilir", blank: "Growth can be ___." },
    { en: "Context must be specified.", tr: "Bağlam belirlenmelidir.", word: "specified", trWord: "belirlenmelidir", blank: "Context must be ___." },
    { en: "Access will be restricted.", tr: "Erişim kısıtlanacak.", word: "restricted", trWord: "kısıtlanacak", blank: "Access will be ___." },
    { en: "Privacy must be protected.", tr: "Gizlilik korunmalıdır.", word: "protected", trWord: "korunmalıdır", blank: "Privacy must be ___." },
    { en: "Surveys might be conducted.", tr: "Anketler yürütülabilir.", word: "conducted", trWord: "yürütülabilir", blank: "Surveys might be ___." },
    { en: "Media could be manipulated.", tr: "Medya manipüle edilabilir.", word: "manipulated", trWord: "manipüle edilabilir", blank: "Media could be ___." },
    { en: "Data ought to be processed.", tr: "Veri işlenmelidir.", word: "processed", trWord: "işlenmelidir", blank: "Data ought to be ___." },
    { en: "The sector must be expanded.", tr: "Sektör genişletilmalıdır.", word: "expanded", trWord: "genişletilmalıdır", blank: "The sector must be ___." },
    { en: "Ratios should be calculated.", tr: "Oranlar hesaplanmalıdır.", word: "calculated", trWord: "hesaplanmalıdır", blank: "Ratios should be ___." },
    { en: "Hypotheses may be validated.", tr: "Hipotezler doğrulanabilir.", word: "validated", trWord: "doğrulanabilir", blank: "Hypotheses may be ___." },
    { en: "The anomaly may be detected.", tr: "Anomali tespit edilabilir.", word: "detected", trWord: "tespit edilabilir", blank: "The anomaly may be ___." },
    { en: "The core will be stabilized.", tr: "Çekirdek stabilize edilacak.", word: "stabilized", trWord: "stabilize edilacak", blank: "The core will be ___." },
    { en: "The project can be abandoned.", tr: "Proje terk edilabilir.", word: "abandoned", trWord: "terk edilabilir", blank: "The project can be ___." },
    { en: "The dynamic can be triggered.", tr: "Dinamik tetiklenebilir.", word: "triggered", trWord: "tetiklenebilir", blank: "The dynamic can be ___." },
    { en: "Parameters should be defined.", tr: "Parametreler tanımlanmalıdır.", word: "defined", trWord: "tanımlanmalıdır", blank: "Parameters should be ___." },
    { en: "The scope could be clarified.", tr: "Kapsam açıklanabilir.", word: "clarified", trWord: "açıklanabilir", blank: "The scope could be ___." },
    { en: "Resources should be allocated.", tr: "Kaynaklar tahsis edilmalıdır.", word: "allocated", trWord: "tahsis edilmalıdır", blank: "Resources should be ___." },
    { en: "Agreements might be terminated.", tr: "Anlaşmalar feshedilabilir.", word: "terminated", trWord: "feshedilabilir", blank: "Agreements might be ___." },
    { en: "Modules ought to be integrated.", tr: "Modüller entegre edilmalıdır.", word: "integrated", trWord: "entegre edilmalıdır", blank: "Modules ought to be ___." },
    { en: "The framework should be inspected.", tr: "Çerçeve incelenmelidir.", word: "inspected", trWord: "incelenmelidir", blank: "The framework should be ___." }
  ],
  2: [
    { en: "Funds cannot be shifted.", tr: "Fonlar kaydırılamaz.", word: "shifted", trWord: "kaydırılamaz", blank: "Funds cannot be ___." },
    { en: "Flaws will not be exposed.", tr: "Kusurlar ortaya çıkarılmayacak.", word: "exposed", trWord: "ortaya çıkarılmayacak", blank: "Flaws will not be ___." },
    { en: "Stress will not be induced.", tr: "Strese yol açılmayacak.", word: "induced", trWord: "yol açılmayacak", blank: "Stress will not be ___." },
    { en: "Logs cannot be accumulated.", tr: "Günlükler biriktirilemez.", word: "accumulated", trWord: "biriktirilemez", blank: "Logs cannot be ___." },
    { en: "Insights may not be derived.", tr: "Çıkarımlar elde edilmayabilir.", word: "derived", trWord: "elde edilmayabilir", blank: "Insights may not be ___." },
    { en: "Formats will not be altered.", tr: "Formatlar değiştirilmayacak.", word: "altered", trWord: "değiştirilmayacak", blank: "Formats will not be ___." },
    { en: "Growth cannot be anticipated.", tr: "Büyüme öngörülamaz.", word: "anticipated", trWord: "öngörülamaz", blank: "Growth cannot be ___." },
    { en: "Reform must not be advocated.", tr: "Reform savunulmamalıdır.", word: "advocated", trWord: "savunulmamalıdır", blank: "Reform must not be ___." },
    { en: "Rules might not be suspended.", tr: "Kurallar askıya alınmayabilir.", word: "suspended", trWord: "askıya alınmayabilir", blank: "Rules might not be ___." },
    { en: "Inputs could not be modified.", tr: "Girdiler değiştirilemez.", word: "modified", trWord: "değiştirilemez", blank: "Inputs could not be ___." },
    { en: "Privacy must not be violated.", tr: "Gizlilik ihlal edilmemelidir.", word: "violated", trWord: "ihlal edilmemelidir", blank: "Privacy must not be ___." },
    { en: "Output must not be minimized.", tr: "Çıktı minimize edilmamalıdır.", word: "minimized", trWord: "minimize edilmamalıdır", blank: "Output must not be ___." },
    { en: "Context must not be specified.", tr: "Bağlam belirlenmemelidir.", word: "specified", trWord: "belirlenmemelidir", blank: "Context must not be ___." },
    { en: "Access will not be restricted.", tr: "Erişim kısıtlanmayacak.", word: "restricted", trWord: "kısıtlanmayacak", blank: "Access will not be ___." },
    { en: "Surveys might not be conducted.", tr: "Anketler yürütülmayabilir.", word: "conducted", trWord: "yürütülmayabilir", blank: "Surveys might not be ___." },
    { en: "Media could not be manipulated.", tr: "Medya manipüle edilamaz.", word: "manipulated", trWord: "manipüle edilamaz", blank: "Media could not be ___." },
    { en: "Data ought not to be processed.", tr: "Veri işlenmemelidir.", word: "processed", trWord: "işlenmemelidir", blank: "Data ought not to be ___." },
    { en: "The project cannot be abandoned.", tr: "Proje terk edilemez.", word: "abandoned", trWord: "terk edilemez", blank: "The project cannot be ___." },
    { en: "The dynamic cannot be triggered.", tr: "Dinamik tetiklenemez.", word: "triggered", trWord: "tetiklenemez", blank: "The dynamic cannot be ___." },
    { en: "The sector must not be expanded.", tr: "Sektör genişletilmamalıdır.", word: "expanded", trWord: "genişletilmamalıdır", blank: "The sector must not be ___." },
    { en: "Ratios should not be calculated.", tr: "Oranlar hesaplanmamalıdır.", word: "calculated", trWord: "hesaplanmamalıdır", blank: "Ratios should not be ___." },
    { en: "Hypotheses may not be validated.", tr: "Hipotezler doğrulanmayabilir.", word: "validated", trWord: "doğrulanmayabilir", blank: "Hypotheses may not be ___." },
    { en: "The anomaly may not be detected.", tr: "Anomali tespit edilmayabilir.", word: "detected", trWord: "tespit edilmayabilir", blank: "The anomaly may not be ___." },
    { en: "The core will not be stabilized.", tr: "Çekirdek stabilize edilmayacak.", word: "stabilized", trWord: "stabilize edilmayacak", blank: "The core will not be ___." },
    { en: "Parameters should not be defined.", tr: "Parametreler tanımlanmamalıdır.", word: "defined", trWord: "tanımlanmamalıdır", blank: "Parameters should not be ___." },
    { en: "The scope could not be clarified.", tr: "Kapsam açıklanamaz.", word: "clarified", trWord: "açıklanamaz", blank: "The scope could not be ___." },
    { en: "Resources should not be allocated.", tr: "Kaynaklar tahsis edilmamalıdır.", word: "allocated", trWord: "tahsis edilmamalıdır", blank: "Resources should not be ___." },
    { en: "Agreements might not be terminated.", tr: "Anlaşmalar feshedilmayabilir.", word: "terminated", trWord: "feshedilmayabilir", blank: "Agreements might not be ___." },
    { en: "Modules ought not to be integrated.", tr: "Modüller entegre edilmamalıdır.", word: "integrated", trWord: "entegre edilmamalıdır", blank: "Modules ought not to be ___." },
    { en: "The framework should not be inspected.", tr: "Çerçeve incelenmemelidir.", word: "inspected", trWord: "incelenmemelidir", blank: "The framework should not be ___." }
  ],
  3: [
    { en: "Can funds be shifted?", tr: "Fonlar kaydırılabilir mi?", word: "shifted", trWord: "kaydırılabilir mi?", blank: "Can funds be ___?" },
    { en: "Will flaws be exposed?", tr: "Kusurlar ortaya çıkarılacak mı?", word: "exposed", trWord: "ortaya çıkarılacak mı?", blank: "Will flaws be ___?" },
    { en: "Will stress be induced?", tr: "Strese yol açılacak mı?", word: "induced", trWord: "yol açılacak mı?", blank: "Will stress be ___?" },
    { en: "May insights be derived?", tr: "Çıkarımlar elde edilabilir mi?", word: "derived", trWord: "elde edilabilir mi?", blank: "May insights be ___?" },
    { en: "Will formats be altered?", tr: "Formatlar değiştirilacak mı?", word: "altered", trWord: "değiştirilacak mı?", blank: "Will formats be ___?" },
    { en: "Can logs be accumulated?", tr: "Günlükler biriktirilabilir mi?", word: "accumulated", trWord: "biriktirilabilir mi?", blank: "Can logs be ___?" },
    { en: "Must reform be advocated?", tr: "Reform savunulmalı mıdır?", word: "advocated", trWord: "savunulmalı mıdır?", blank: "Must reform be ___?" },
    { en: "Might rules be suspended?", tr: "Kurallar askıya alınabilir mi?", word: "suspended", trWord: "askıya alınabilir mi?", blank: "Might rules be ___?" },
    { en: "Could inputs be modified?", tr: "Girdiler değiştirilabilir mi?", word: "modified", trWord: "değiştirilabilir mi?", blank: "Could inputs be ___?" },
    { en: "Should data be processed?", tr: "Veri işlenmeli midir?", word: "processed", trWord: "işlenmeli midir?", blank: "Should data be ___?" },
    { en: "Must output be maximized?", tr: "Çıktı maksimize edilmalı mıdır?", word: "maximized", trWord: "maksimize edilmalı mıdır?", blank: "Must output be ___?" },
    { en: "Can growth be anticipated?", tr: "Büyüme öngörülabilir mi?", word: "anticipated", trWord: "öngörülabilir mi?", blank: "Can growth be ___?" },
    { en: "Must context be specified?", tr: "Bağlam belirlenmeli midir?", word: "specified", trWord: "belirlenmeli midir?", blank: "Must context be ___?" },
    { en: "Will access be restricted?", tr: "Erişim kısıtlanacak mı?", word: "restricted", trWord: "kısıtlanacak mı?", blank: "Will access be ___?" },
    { en: "Must privacy be protected?", tr: "Gizlilik korunmalı mıdır?", word: "protected", trWord: "korunmalı mıdır?", blank: "Must privacy be ___?" },
    { en: "Might surveys be conducted?", tr: "Anketler yürütülabilir mi?", word: "conducted", trWord: "yürütülabilir mi?", blank: "Might surveys be ___?" },
    { en: "Could media be manipulated?", tr: "Medya manipüle edilabilir mi?", word: "manipulated", trWord: "manipüle edilabilir mi?", blank: "Could media be ___?" },
    { en: "Must the sector be expanded?", tr: "Sektör genişletilmalı mıdır?", word: "expanded", trWord: "genişletilmalı mıdır?", blank: "Must the sector be ___?" },
    { en: "Should ratios be calculated?", tr: "Oranlar hesaplanmalı mıdır?", word: "calculated", trWord: "hesaplanmalı mıdır?", blank: "Should ratios be ___?" },
    { en: "May hypotheses be validated?", tr: "Hipotezler doğrulanabilir mi?", word: "validated", trWord: "doğrulanabilir mi?", blank: "May hypotheses be ___?" },
    { en: "May the anomaly be detected?", tr: "Anomali tespit edilabilir mi?", word: "detected", trWord: "tespit edilabilir mi?", blank: "May the anomaly be ___?" },
    { en: "Will the core be stabilized?", tr: "Çekirdek stabilize edilacak mı?", word: "stabilized", trWord: "stabilize edilacak mı?", blank: "Will the core be ___?" },
    { en: "Can the project be abandoned?", tr: "Proje terk edilabilir mi?", word: "abandoned", trWord: "terk edilabilir mi?", blank: "Can the project be ___?" },
    { en: "Can the dynamic be triggered?", tr: "Dinamik tetiklenebilir mi?", word: "triggered", trWord: "tetiklenebilir mi?", blank: "Can the dynamic be ___?" },
    { en: "Should parameters be defined?", tr: "Parametreler tanımlanmalı mıdır?", word: "defined", trWord: "tanımlanmalı mıdır?", blank: "Should parameters be ___?" },
    { en: "Could the scope be clarified?", tr: "Kapsam açıklanabilir mi?", word: "clarified", trWord: "açıklanabilir mi?", blank: "Could the scope be ___?" },
    { en: "Should modules be integrated?", tr: "Modüller entegre edilmalı mıdır?", word: "integrated", trWord: "entegre edilmalı mıdır?", blank: "Should modules be ___?" },
    { en: "Should resources be allocated?", tr: "Kaynaklar tahsis edilmalı mıdır?", word: "allocated", trWord: "tahsis edilmalı mıdır?", blank: "Should resources be ___?" },
    { en: "Might agreements be terminated?", tr: "Anlaşmalar feshedilabilir mi?", word: "terminated", trWord: "feshedilabilir mi?", blank: "Might agreements be ___?" },
    { en: "Should the framework be inspected?", tr: "Çerçeve incelenmeli midir?", word: "inspected", trWord: "incelenmeli midir?", blank: "Should the framework be ___?" }
  ],
  4: [
    { en: "Substantial empirical inputs could be modified by the software development team.", tr: "Bireysel fonksiyonel yazılım modülleri yazılım geliştirme ekibi tarafından değiştirilabilir.", word: "modified", trWord: "değiştirilabilir", blank: "Substantial empirical inputs could be ___ by the software development team." },
    { en: "Substantial empirical inputs could be modified by the revised security protocol.", tr: "Önemli deneysel girdiler gözden geçirilmiş güvenlik protokolü tarafından değiştirilabilir.", word: "modified", trWord: "değiştirilabilir", blank: "Substantial empirical inputs could be ___ by the revised security protocol." },
    { en: "This unpredictable economic dynamic will be induced by the sudden paradigm shift.", tr: "Bu öngörülemeyen ekonomik dinamiğe ani paradigma değişimi tarafından yol açılacak.", word: "induced", trWord: "yol açılacak", blank: "This unpredictable economic dynamic will be ___ by the sudden paradigm shift." },
    { en: "Valuable qualitative insights may be derived from detailed historical system logs.", tr: "Değerli nitel çıkarımlar detaylı geçmiş sistem günlüklerinden elde edilabilir.", word: "derived", trWord: "elde edilabilir", blank: "Valuable qualitative insights may be ___ from detailed historical system logs." },
    { en: "The undetected structural anomaly may be detected by the independent annual audit.", tr: "Tespit edilemeyen yapısal anomali bağımsız yıllık denetim tarafından tespit edilabilir.", word: "detected", trWord: "tespit edilabilir", blank: "The un___ structural anomaly may be ___ by the independent annual audit." },
    { en: "Alternative scientific hypotheses may be validated by the final scientific finding.", tr: "Alternatif bilimsel hipotezler nihai bilimsel bulgu tarafından doğrulanabilir.", word: "validated", trWord: "doğrulanabilir", blank: "Alternative scientific hypotheses may be ___ by the final scientific finding." },
    { en: "Hidden organizational system flaws will be exposed by the independent annual audit.", tr: "Gizli örgütsel sistem kusurları bağımsız yıllık denetim tarafından ortaya çıkarılacak.", word: "exposed", trWord: "ortaya çıkarılacak", blank: "Hidden organizational system flaws will be ___ by the independent annual audit." },
    { en: "The initial investigative project can be abandoned by the software development team.", tr: "İlk araştırma projesi yazılım geliştirme ekibi tarafından terk edilabilir.", word: "abandoned", trWord: "terk edilabilir", blank: "The initial investigative project can be ___ by the software development team." },
    { en: "Significant annual financial growth can be anticipated by senior financial analysts.", tr: "Önemli yıllık finansal büyüme kıdemli finansal analistler tarafından öngörülabilir.", word: "anticipated", trWord: "öngörülabilir", blank: "Significant annual financial growth can be ___ by senior financial analysts." },
    { en: "Comprehensive legislative tax reform must be advocated by senior financial analysts.", tr: "Kapsamlı yasal vergi reformu kıdemli finansal analistler tarafından savunulmalıdır.", word: "advocated", trWord: "savunulmalıdır", blank: "Comprehensive legislative tax reform must be ___ by senior financial analysts." },
    { en: "Detailed historical system logs can be accumulated by the software development team.", tr: "Detaylı geçmiş sistem günlükleri yazılım geliştirme ekibi tarafından biriktirilabilir.", word: "accumulated", trWord: "biriktirilabilir", blank: "Detailed historical system logs can be ___ by the software development team." },
    { en: "Crucial internal device components will be stabilized by the reinforced central core.", tr: "Kritik dahili cihaz bileşenleri güçlendirilmiş merkezi çekirdek tarafından stabilize edilacak.", word: "stabilized", trWord: "stabilize edilacak", blank: "Crucial internal device components will be ___ by the reinforced central core." },
    { en: "Detailed historical system logs can be accumulated by the centralized cloud database.", tr: "Yeni toplanan deneysel veriler merkezi bulut veritabanı tarafından işlenebilir.", word: "accumulated", trWord: "işlenebilir", blank: "Detailed historical system logs can be ___ by the centralized cloud database." },
    { en: "Separate international research funds can be shifted by the software development team.", tr: "Ayrı uluslararası araştırma fonları yazılım geliştirme ekibi tarafından kaydırılabilir.", word: "shifted", trWord: "kaydırılabilir", blank: "Separate international research funds can be ___ by the software development team." },
    { en: "Crucial technical system parameters should be defined by the revised security protocol.", tr: "Kritik teknik sistem parametreleri gözden geçirilmiş güvenlik protokolü tarafından tanımlanmalıdır.", word: "defined", trWord: "tanımlanmalıdır", blank: "Crucial technical system parameters should be ___ by the revised security protocol." },
    { en: "Unauthorized user network access will be restricted by the strict institutional policy.", tr: "Yetkisiz kullanıcı ağ erişimi katı kurumsal politika tarafından kısıtlanacak.", word: "restricted", trWord: "kısıtlanacak", blank: "Unauthorized user network access will be ___ by the strict institutional policy." },
    { en: "Sensitive user information privacy must be protected by advanced encryption algorithms.", tr: "Hassas kullanıcı bilgileri gizliliği gelişmiş şifreleme algoritmaları tarafından korunmalıdır.", word: "protected", trWord: "korunmalıdır", blank: "Sensitive user information privacy must be ___ by advanced encryption algorithms." },
    { en: "Crucial technical system parameters should be defined by the software development team.", tr: "Kritik teknik sistem parametreleri yazılım geliştirme ekibi tarafından tanımlanmalıdır.", word: "defined", trWord: "tanımlanmalıdır", blank: "Crucial technical system parameters should be ___ by the software development team." },
    { en: "Unauthorized user network access will be restricted by the automated background script.", tr: "Yetkisiz kullanıcı ağ erişimi otomatik arka plan betiği tarafından kısıtlanacak.", word: "restricted", trWord: "kısıtlanacak", blank: "Unauthorized user network access will be ___ by the automated background script." },
    { en: "Exact distribution and demographic formats will be altered by the sudden paradigm shift.", tr: "Kesin dağılım ve demografik formatlar ani paradigma değişimi tarafından değiştirilacak.", word: "altered", trWord: "değiştirilacak", blank: "Exact distribution and demographic formats will be ___ by the sudden paradigm shift." },
    { en: "Complex mathematical data ratios should be calculated by the centralized cloud database.", tr: "Karmaşık matematiksel veri oranları merkezi bulut veritabanı tarafından hesaplanmalıdır.", word: "calculated", trWord: "hesaplanmalıdır", blank: "Complex mathematical data ratios should be ___ by the centralized cloud database." },
    { en: "Sensitive user information privacy must be protected by the strict institutional policy.", tr: "Hassas kullanıcı bilgileri gizliliği katı kurumsal politika tarafından korunmalıdır.", word: "protected", trWord: "korunmalıdır", blank: "Sensitive user information privacy must be ___ by the strict institutional policy." },
    { en: "Complex mathematical data ratios should be calculated by the automated background script.", tr: "Karmaşık matematiksel veri oranları otomatik arka plan betiği tarafından hesaplanmalıdır.", word: "calculated", trWord: "hesaplanmalıdır", blank: "Complex mathematical data ratios should be ___ by the automated background script." },
    { en: "The undetected structural anomaly may be detected by the principal laboratory researcher.", tr: "Tespit edilemeyen yapısal anomali baş laboratuvar araştırmacısı tarafından tespit edilabilir.", word: "detected", trWord: "tespit edilabilir", blank: "The un___ structural anomaly may be ___ by the principal laboratory researcher." },
    { en: "Maximum annual manufacturing output must be maximized by innovative corporate strategies.", tr: "Maksimum yıllık üretim çıktısı yenilikçi kurumsal stratejiler tarafından maksimize edilmalıdır.", word: "maximized", trWord: "maksimize edilmalıdır", blank: "Maximum annual manufacturing output must be ___ by innovative corporate strategies." },
    { en: "Maximum annual manufacturing output must be maximized by the automated background script.", tr: "Maksimum yıllık üretim çıktısı otomatik arka plan betiği tarafından maksimize edilmalıdır.", word: "maximized", trWord: "maksimize edilmalıdır", blank: "Maximum annual manufacturing output must be ___ by the automated background script." },
    { en: "Individual functional software modules ought to be integrated into the continuous process.", tr: "Ayrı kararsız kimyasal değişkenler sürekli sürece entegre edilmalıdır.", word: "integrated", trWord: "entegre edilmalıdır", blank: "Individual functional software modules ought to be ___ into the continuous process." },
    { en: "Alternative scientific hypotheses may be validated by the principal laboratory researcher.", tr: "Alternatif bilimsel hipotezler baş laboratuvar araştırmacısı tarafından doğrulanabilir.", word: "validated", trWord: "doğrulanabilir", blank: "Alternative scientific hypotheses may be ___ by the principal laboratory researcher." },
    { en: "Hidden organizational system flaws will be exposed by the principal laboratory researcher.", tr: "Gizli örgütsel sistem kusurları baş laboratuvar araştırmacısı tarafından ortaya çıkarılacak.", word: "exposed", trWord: "ortaya çıkarılacak", blank: "Hidden organizational system flaws will be ___ by the principal laboratory researcher." },
    { en: "Formal bilateral commercial agreements might be terminated by the executive internal board.", tr: "Resmi ikili ticari anlaşmalar yürütme iç kurulu tarafından feshedilabilir.", word: "terminated", trWord: "feshedilabilir", blank: "Formal bilateral commercial agreements might be ___ by the executive internal board." },
    { en: "Public political and cultural perspective could be manipulated by mainstream digital media.", tr: "Kamuoyunun siyasi ve kültürel bakış açısı ana akım dijital medya tarafından manipüle edilabilir.", word: "manipulated", trWord: "manipüle edilabilir", blank: "Public political and cultural perspective could be ___ by mainstream digital media." },
    { en: "The newly collected empirical data ought to be processed by the centralized cloud database.", tr: "Yeni toplanan deneysel veriler merkezi bulut veritabanı tarafından işlenmelidir.", word: "processed", trWord: "işlenmelidir", blank: "The newly collected empirical data ought to be ___ by the centralized cloud database." },
    { en: "Sensitive user information privacy ought to be processed by advanced encryption algorithms.", tr: "Hassas kullanıcı bilgileri gizliliği gelişmiş şifreleme algoritmaları tarafından işlenmelidir.", word: "processed", trWord: "işlenmelidir", blank: "Sensitive user information privacy ought to be ___ by advanced encryption algorithms." },
    { en: "Exact distribution and demographic formats will be altered by the executive internal board.", tr: "Kesin dağılım ve demografik formatlar yürütme iç kurulu tarafından değiştirilacak.", word: "altered", trWord: "değiştirilacak", blank: "Exact distribution and demographic formats will be ___ by the executive internal board." },
    { en: "Maximum annual manufacturing resources should be allocated by the executive internal board.", tr: "Maksimum yıllık üretim kaynakları yürütme iç kurulu tarafından tahsis edilmalıdır.", word: "allocated", trWord: "tahsis edilmalıdır", blank: "Maximum annual manufacturing resources should be ___ by the executive internal board." },
    { en: "Comprehensive legislative tax reform must be advocated by leading institutional authorities.", tr: "Kapsamlı yasal vergi reformu önde gelen kurumsal yetkililer tarafından savunulmalıdır.", word: "advocated", trWord: "savunulmalıdır", blank: "Comprehensive legislative tax reform must be ___ by leading institutional authorities." },
    { en: "The initial investigative project scope could be clarified by independent technical experts.", tr: "İlk araştırma projesi bağımsız teknik uzmanlar tarafından terk edilabilir.", word: "clarified", trWord: "terk edilabilir", blank: "The initial investigative project scope could be ___ by independent technical experts." },
    { en: "Separate international research funds can be shifted by the regional administrative council.", tr: "Ayrı uluslararası araştırma fonları bölgesel idari konsey tarafından kaydırılabilir.", word: "shifted", trWord: "kaydırılabilir", blank: "Separate international research funds can be ___ by the regional administrative council." },
    { en: "Individual functional software modules should be inspected by independent technical experts.", tr: "Bireysel fonksiyonel yazılım modülleri bağımsız teknik uzmanlar tarafından incelenmelidir.", word: "inspected", trWord: "incelenmelidir", blank: "Individual functional software modules should be ___ by independent technical experts." },
    { en: "Valuable qualitative insights may be derived from comprehensive regional educational surveys.", tr: "Değerli nitel çıkarımlar kapsamlı bölgesel eğitim anketlerinden elde edilabilir.", word: "derived", trWord: "elde edilabilir", blank: "Valuable qualitative insights may be ___ from comprehensive regional educational surveys." },
    { en: "The newly proposed architectural framework can be inspected by independent technical experts.", tr: "Yeni önerilen mimari çerçeve bağımsız teknik uzmanlar tarafından incelenebilir.", word: "inspected", trWord: "incelenebilir", blank: "The newly proposed architectural framework can be ___ by independent technical experts." },
    { en: "Maximum annual manufacturing resources should be allocated by innovative corporate strategies.", tr: "Maksimum yıllık üretim kaynakları yenilikçi kurumsal stratejiler tarafından tahsis edilmalıdır.", word: "allocated", trWord: "tahsis edilmalıdır", blank: "Maximum annual manufacturing resources should be ___ by innovative corporate strategies." },
    { en: "Substantial long-term economic growth can be anticipated by leading institutional authorities.", tr: "Önemli uzun vadeli ekonomik büyüme önde gelen kurumsal yetkililer tarafından öngörülabilir.", word: "anticipated", trWord: "öngörülabilir", blank: "Substantial long-term economic growth can be ___ by leading institutional authorities." },
    { en: "This unpredictable economic dynamic can be triggered by a chain of negative physical reactions.", tr: "Bu öngörülemeyen ekonomik dinamik bir dizi olumsuz fiziksel tepki tarafından tetiklenebilir.", word: "triggered", trWord: "tetiklenebilir", blank: "This unpredictable economic dynamic can be ___ by a chain of negative physical reactions." },
    { en: "A severe psychological and occupational stress can be induced by the revised security protocol.", tr: "Ciddi bir psikolojik ve mesleki strese gözden geçirilmiş güvenlik protokolü tarafından yol açılabilir.", word: "induced", trWord: "yol açılabilir", blank: "A severe psychological and occupational stress can be ___ by the revised security protocol." },
    { en: "Comprehensive regional educational surveys might be conducted by independent technical experts.", tr: "Kapsamlı bölgesel eğitim anketleri bağımsız teknik uzmanlar tarafından yürütülabilir.", word: "conducted", trWord: "yürütülabilir", blank: "Comprehensive regional educational surveys might be ___ by independent technical experts." },
    { en: "Public political and cultural perspective could be manipulated by the executive internal board.", tr: "Kamuoyunun siyasi ve kültürel bakış açısı yürütme iç kurulu tarafından manipüle edilabilir.", word: "manipulated", trWord: "manipüle edilabilir", blank: "Public political and cultural perspective could be ___ by the executive internal board." },
    { en: "Crucial internal device components ought to be integrated into the automated background script.", tr: "Kritik dahili cihaz bileşenleri otomatik arka plan betiğine entegre edilmalıdır.", word: "integrated", trWord: "entegre edilmalıdır", blank: "Crucial internal device components ought to be ___ into the automated background script." },
    { en: "The newly proposed architectural framework will be stabilized by the software development team.", tr: "Yeni önerilen mimari çerçeve yazılım geliştirme ekibi tarafından stabilize edilacak.", word: "stabilized", trWord: "stabilize edilacak", blank: "The newly proposed architectural framework will be ___ by the software development team." },
    { en: "The entire underlying structural framework should be inspected by independent technical experts.", tr: "Tüm temel yapısal çerçeve bağımsız teknik uzmanlar tarafından incelenmelidir.", word: "inspected", trWord: "incelenmelidir", blank: "The entire underlying structural framework should be ___ by independent technical experts." },
    { en: "Severe psychological and occupational stress will be induced by the continuous chemical process.", tr: "Ciddi psikolojik ve mesleki strese sürekli kimyasal süreç tarafından yol açılacak.", word: "induced", trWord: "yol açılacak", blank: "Severe psychological and occupational stress will be ___ by the continuous chemical process." },
    { en: "Comprehensive regional educational surveys might be conducted by the national education ministry.", tr: "Kapsamlı bölgesel eğitim anketleri milli eğitim bakanlığı tarafından yürütülabilir.", word: "conducted", trWord: "yürütülabilir", blank: "Comprehensive regional educational surveys might be ___ by the national education ministry." },
    { en: "The broader socio-economic context must be specified by the strict qualitative selection criteria.", tr: "Daha geniş sosyo-ekonomik bağlam katı nitel seçim kriterleri tarafından belirlenmelidir.", word: "specified", trWord: "belirlenmelidir", blank: "The broader socio-economic context must be ___ by the strict qualitative selection criteria." },
    { en: "The highly competitive dynamic sector must be expanded by rapid regional infrastructure expansion.", tr: "Bu öngörülemeyen ekonomik dinamik hızlı bölgesel altyapı genişlemesi tarafından tetiklenmelidir.", word: "expanded", trWord: "tetiklenmelidir", blank: "The highly competitive dynamic sector must be ___ by rapid regional infrastructure expansion." },
    { en: "Outdated environmental safety regulations might be suspended by leading institutional authorities.", tr: "Güncelliğini yitirmiş çevresel güvenlik düzenlemeleri önde gelen kurumsal yetkililer tarafından askıya alınabilir.", word: "suspended", trWord: "askıya alınabilir", blank: "Outdated environmental safety regulations might be ___ by leading institutional authorities." },
    { en: "Formal bilateral commercial agreements might be terminated by the regional administrative council.", tr: "Resmi ikili ticari anlaşmalar bölgesel idari konsey tarafından feshedilabilir.", word: "terminated", trWord: "feshedilabilir", blank: "Formal bilateral commercial agreements might be ___ by the regional administrative council." },
    { en: "The initial investigative project scope could be clarified by the principal laboratory researcher.", tr: "Başlangıçtaki araştırma projesi kapsamı baş laboratuvar araştırmacısı tarafından açıklanabilir.", word: "clarified", trWord: "açıklanabilir", blank: "The initial investigative project scope could be ___ by the principal laboratory researcher." },
    { en: "Outdated environmental safety regulations might be suspended by the regional administrative council.", tr: "Güncelliğini yitirmiş çevresel güvenlik düzenlemeleri bölgesel idari konsey tarafından askıya alınabilir.", word: "suspended", trWord: "askıya alınabilir", blank: "Outdated environmental safety regulations might be ___ by the regional administrative council." },
    { en: "The exact distribution and demographic formats must be specified by the national education ministry.", tr: "Kesin dağılım ve demografik formatlar milli eğitim bakanlığı tarafından belirlenmelidir.", word: "specified", trWord: "belirlenmelidir", blank: "The exact distribution and demographic formats must be ___ by the national education ministry." },
    { en: "The entire underlying structural framework must be expanded by rapid regional infrastructure expansion.", tr: "Tüm temel yapısal çerçeve hızlı bölgesel altyapı genişlemesi tarafından genişletilmalıdır.", word: "expanded", trWord: "genişletilmalıdır", blank: "The entire underlying structural framework must be ___ by rapid regional infrastructure expansion." }
  ]
};

const unit11SplitPassiveSentences = [
  {
    en: "The project is temporarily abandoned.",
    tr: "Proje geçici olarak terk edilir.",
    adverb: "temporarily",
    adjective: "temporary",
    noun: "temporariness",
    spellingDistractor: "temporaries",
    aux: "is",
    verb: "abandoned",
    adverbTr: "geçici olarak",
    adverbDistractorsTr: ["kalıcı olarak", "tamamen", "kısmen"],
    word: "temporarily",
    trWord: "geçici olarak"
  },
  {
    en: "Growth is confidently anticipated.",
    tr: "Büyüme güvenle beklenir.",
    adverb: "confidently",
    adjective: "confident",
    noun: "confidence",
    spellingDistractor: "confidential",
    aux: "is",
    verb: "anticipated",
    adverbTr: "güvenle",
    adverbDistractorsTr: ["şüpheyle", "endişeyle", "geçici olarak"],
    word: "confidently",
    trWord: "güvenle"
  },
  {
    en: "The dynamic is automatically triggered.",
    tr: "Dinamik otomatik olarak tetiklenir.",
    adverb: "automatically",
    adjective: "automatic",
    noun: "automation",
    spellingDistractor: "automatical",
    aux: "is",
    verb: "triggered",
    adverbTr: "otomatik olarak",
    adverbDistractorsTr: ["manuel olarak", "yanlışlıkla", "zorlukla"],
    word: "automatically",
    trWord: "otomatik olarak"
  },
  {
    en: "Context is explicitly specified.",
    tr: "Bağlam açıkça belirtilir.",
    adverb: "explicitly",
    adjective: "explicit",
    noun: "explicitness",
    spellingDistractor: "explicity",
    aux: "is",
    verb: "specified",
    adverbTr: "açıkça",
    adverbDistractorsTr: ["dolaylı olarak", "gizlice", "tesadüfen"],
    word: "explicitly",
    trWord: "açıkça"
  },
  {
    en: "Reform is strongly advocated.",
    tr: "Reform şiddetle savunulur.",
    adverb: "strongly",
    adjective: "strong",
    noun: "strength",
    spellingDistractor: "strongness",
    aux: "is",
    verb: "advocated",
    adverbTr: "şiddetle",
    adverbDistractorsTr: ["isteksizce", "zayıf bir şekilde", "kısmen"],
    word: "strongly",
    trWord: "şiddetle"
  },
  {
    en: "The sector is rapidly expanded.",
    tr: "Sektör hızla genişletilir.",
    adverb: "rapidly",
    adjective: "rapid",
    noun: "rapidity",
    spellingDistractor: "rapidness",
    aux: "is",
    verb: "expanded",
    adverbTr: "hızla",
    adverbDistractorsTr: ["yavaşça", "kademeli olarak", "isteksizce"],
    word: "rapidly",
    trWord: "hızla"
  },
  {
    en: "Parameters are clearly defined.",
    tr: "Parametreler net bir şekilde tanımlanır.",
    adverb: "clearly",
    adjective: "clear",
    noun: "clarity",
    spellingDistractor: "clearness",
    aux: "are",
    verb: "defined",
    adverbTr: "net bir şekilde",
    adverbDistractorsTr: ["belirsizce", "gizlice", "tahminen"],
    word: "clearly",
    trWord: "net bir şekilde"
  },
  {
    en: "Ratios are precisely calculated.",
    tr: "Oranlar tam olarak hesaplanır.",
    adverb: "precisely",
    adjective: "precise",
    noun: "precision",
    spellingDistractor: "preciseness",
    aux: "are",
    verb: "calculated",
    adverbTr: "tam olarak",
    adverbDistractorsTr: ["yaklaşık olarak", "tahminen", "rastgele"],
    word: "precisely",
    trWord: "tam olarak"
  },
  {
    en: "The framework is thoroughly inspected.",
    tr: "Çerçeve en ince ayrıntısına kadar denetlenir.",
    adverb: "thoroughly",
    adjective: "thorough",
    noun: "thoroughness",
    spellingDistractor: "throughly",
    aux: "is",
    verb: "inspected",
    adverbTr: "en ince ayrıntısına kadar",
    adverbDistractorsTr: ["yüzeysel olarak", "kısmen", "aceleyle"],
    word: "thoroughly",
    trWord: "en ince ayrıntısına kadar"
  },
  {
    en: "Insights are successfully derived.",
    tr: "Öngörüler başarıyla elde edilir.",
    adverb: "successfully",
    adjective: "successful",
    noun: "success",
    spellingDistractor: "successive",
    aux: "are",
    verb: "derived",
    adverbTr: "başarıyla",
    adverbDistractorsTr: ["başarısızlıkla", "tesadüfen", "zorlukla"],
    word: "successfully",
    trWord: "başarıyla"
  },
  {
    en: "Hypotheses were finally validated.",
    tr: "Hipotezler sonunda doğrulandı.",
    adverb: "finally",
    adjective: "final",
    noun: "finality",
    spellingDistractor: "finalize",
    aux: "were",
    verb: "validated",
    adverbTr: "sonunda",
    adverbDistractorsTr: ["başlangıçta", "geçici olarak", "aniden"],
    word: "finally",
    trWord: "sonunda"
  },
  {
    en: "The anomaly was instantly detected.",
    tr: "Anomali anında tespit edildi.",
    adverb: "instantly",
    adjective: "instant",
    noun: "instance",
    spellingDistractor: "instantaneous",
    aux: "was",
    verb: "detected",
    adverbTr: "anında",
    adverbDistractorsTr: ["yavaşça", "gelecekte", "gecikmeli olarak"],
    word: "instantly",
    trWord: "anında"
  },
  {
    en: "Rules were officially suspended.",
    tr: "Kurallar resmi olarak askıya alındı.",
    adverb: "officially",
    adjective: "official",
    noun: "officialdom",
    spellingDistractor: "officiality",
    aux: "were",
    verb: "suspended",
    adverbTr: "resmi olarak",
    adverbDistractorsTr: ["gayriresmi olarak", "gizlice", "kişisel olarak"],
    word: "officially",
    trWord: "resmi olarak"
  },
  {
    en: "Agreements were mutually terminated.",
    tr: "Anlaşmalar karşılıklı olarak feshedildi.",
    adverb: "mutually",
    adjective: "mutual",
    noun: "mutuality",
    spellingDistractor: "mutuals",
    aux: "were",
    verb: "terminated",
    adverbTr: "karşılıklı olarak",
    adverbDistractorsTr: ["tek taraflı olarak", "kısmen", "bağımsız olarak"],
    word: "mutually",
    trWord: "karşılıklı olarak"
  },
  {
    en: "Surveys were independently conducted.",
    tr: "Araştırmalar bağımsız olarak yürütüldü.",
    adverb: "independently",
    adjective: "independent",
    noun: "independence",
    spellingDistractor: "independency",
    aux: "were",
    verb: "conducted",
    adverbTr: "bağımsız olarak",
    adverbDistractorsTr: ["ortaklaşa", "bağımlı olarak", "zorla"],
    word: "independently",
    trWord: "bağımsız olarak"
  }
];

const unit11SplitFullPassiveSentences = [
  {
    en: "The initial investigative project was temporarily abandoned by the software development team.",
    tr: "İlk araştırma projesi, yazılım geliştirme ekibi tarafından geçici olarak terk edildi.",
    adverb: "temporarily",
    adjective: "temporary",
    noun: "temporariness",
    spellingDistractor: "temporaries",
    aux: "was",
    verb: "abandoned",
    adverbTr: "geçici olarak",
    adverbDistractorsTr: ["kalıcı olarak", "tamamen", "kısmen"],
    word: "temporarily",
    trWord: "geçici olarak"
  },
  {
    en: "Significant annual financial growth is confidently anticipated by senior financial analysts.",
    tr: "Önemli yıllık finansal büyüme, kıdemli finansal analistler tarafından güvenle beklenmektedir.",
    adverb: "confidently",
    adjective: "confident",
    noun: "confidence",
    spellingDistractor: "confidential",
    aux: "is",
    verb: "anticipated",
    adverbTr: "güvenle",
    adverbDistractorsTr: ["şüpheyle", "endişeyle", "geçici olarak"],
    word: "confidently",
    trWord: "güvenle"
  },
  {
    en: "This unpredictable economic dynamic was automatically triggered by a chain of reactions.",
    tr: "Bu öngörülemeyen ekonomik dinamik, bir reaksiyon zinciri tarafından otomatik olarak tetiklendi.",
    adverb: "automatically",
    adjective: "automatic",
    noun: "automation",
    spellingDistractor: "automatical",
    aux: "was",
    verb: "triggered",
    adverbTr: "otomatik olarak",
    adverbDistractorsTr: ["manuel olarak", "yanlışlıkla", "zorlukla"],
    word: "automatically",
    trWord: "otomatik olarak"
  },
  {
    en: "The broader socio-economic context must be explicitly specified by the selection criteria.",
    tr: "Daha geniş sosyo-ekonomik bağlam, seçim kriterleri tarafından açıkça belirtilmelidir.",
    adverb: "explicitly",
    adjective: "explicit",
    noun: "explicitness",
    spellingDistractor: "explicity",
    aux: "must be",
    verb: "specified",
    adverbTr: "açıkça",
    adverbDistractorsTr: ["dolaylı olarak", "gizlice", "tesadüfen"],
    word: "explicitly",
    trWord: "açıkça"
  },
  {
    en: "Comprehensive legislative tax reform is strongly advocated by leading institutional authorities.",
    tr: "Kapsamlı yasal vergi reformu, önde gelen kurumsal otoriteler tarafından şiddetle savunulmaktadır.",
    adverb: "strongly",
    adjective: "strong",
    noun: "strength",
    spellingDistractor: "strongness",
    aux: "is",
    verb: "advocated",
    adverbTr: "şiddetle",
    adverbDistractorsTr: ["isteksizce", "zayıf bir şekilde", "kısmen"],
    word: "strongly",
    trWord: "şiddetle"
  },
  {
    en: "The highly competitive dynamic sector will be rapidly expanded by infrastructure growth.",
    tr: "Son derece rekabetçi dinamik sektör, altyapı büyümesiyle hızla genişletilecektir.",
    adverb: "rapidly",
    adjective: "rapid",
    noun: "rapidity",
    spellingDistractor: "rapidness",
    aux: "will be",
    verb: "expanded",
    adverbTr: "hızla",
    adverbDistractorsTr: ["yavaşça", "kademeli olarak", "isteksizce"],
    word: "rapidly",
    trWord: "hızla"
  },
  {
    en: "Crucial technical system parameters have been clearly defined by the security protocol.",
    tr: "Önemli teknik sistem parametreleri, güvenlik protokolü tarafından net bir şekilde tanımlanmıştır.",
    adverb: "clearly",
    adjective: "clear",
    noun: "clarity",
    spellingDistractor: "clearness",
    aux: "have been",
    verb: "defined",
    adverbTr: "net bir şekilde",
    adverbDistractorsTr: ["belirsizce", "gizlice", "tahminen"],
    word: "clearly",
    trWord: "net bir şekilde"
  }
];

const unit12LessonSentences = {
  1: unit12Lesson1SentencesRaw,
  2: unit12Lesson2SentencesRaw,
  3: unit12Lesson3SentencesRaw
};

const unit13LessonSentences = {
  1: [
    { en: "They want to start the project", tr: "Projeye başlamak istiyorlar", word: "start", trWord: "başlamak", blank: "They want to ___ the project" },
    { en: "We decided to change the plan", tr: "Planı değiştirmeye karar verdik", word: "change", trWord: "değiştirmeye", blank: "We decided to ___ the plan" },
    { en: "He tried to solve the problem", tr: "Sorunu çözmeye çalıştı", word: "solve", trWord: "çözmeye", blank: "He tried to ___ the problem" },
    { en: "They hope to obtain good results", tr: "İyi sonuçlar elde etmeyi umuyorlar", word: "obtain", trWord: "elde etmeyi", blank: "They hope to ___ good results" },
    { en: "The government plans to build a factory", tr: "Hükümet bir fabrika kurmayı planlıyor", word: "build", trWord: "kurmayı", blank: "The government plans to ___ a factory" },
    { en: "We need to measure the temperature", tr: "Sıcaklığı ölçmemiz gerekiyor", word: "measure", trWord: "ölçmemiz", blank: "We need to ___ the temperature" },
    { en: "They managed to prevent the war", tr: "Savaşı önlemeyi başardılar", word: "prevent", trWord: "önlemeyi", blank: "They managed to ___ the war" },
    { en: "Scientists attempt to explain the reaction", tr: "Bilim insanları tepkimeyi açıklamaya çalışıyor", word: "explain", trWord: "açıklamaya", blank: "Scientists attempt to ___ the reaction" },
    { en: "He refused to accept the suggestion", tr: "Öneriyi kabul etmeyi reddetti", word: "accept", trWord: "kabul etmeyi", blank: "He refused to ___ the suggestion" },
    { en: "The system failed to control the process", tr: "Sistem süreci kontrol etmeyi başaramadı", word: "control", trWord: "kontrol etmeyi", blank: "The system failed to ___ the process" },
    { en: "They expect to finish the work tomorrow", tr: "İşi yarın bitirmeyi bekliyorlar", word: "finish", trWord: "bitirmeyi", blank: "They expect to ___ the work tomorrow" },
    { en: "We promise to help the community", tr: "Topluluğa yardım etmeye söz veriyoruz", word: "help", trWord: "yardım etmeye", blank: "We promise to ___ the community" }
  ],
  2: [
    { en: "They want the student to start the project", tr: "Öğrencinin projeye başlamasını istiyorlar", word: "start", trWord: "başlamasını", blank: "They want the student to ___ the project" },
    { en: "We advised the committee to change the plan", tr: "Komiteye planı değiştirmesini tavsiye ettik", word: "change", trWord: "değiştirmesini", blank: "We advised the committee to ___ the plan" },
    { en: "The researcher expected the reaction to start", tr: "Araştırmacı tepkimenin başlamasını bekliyordu", word: "start", trWord: "başlamasını", blank: "The researcher expected the reaction to ___" },
    { en: "The doctor allowed the patient to walk", tr: "Doktor hastanın yürümesine izin verdi", word: "walk", trWord: "yürümesine", blank: "The doctor allowed the patient to ___" },
    { en: "The system requires the user to enter a password", tr: "Sistem kullanıcının bir şifre girmesini gerektirir", word: "enter", trWord: "girmesini", blank: "The system requires the user to ___ a password" },
    { en: "We encourage the students to perform experiments", tr: "Öğrencileri deney yapmaya teşvik ediyoruz", word: "perform", trWord: "yapmaya", blank: "We encourage the students to ___ experiments" },
    { en: "The force caused the structure to collapse", tr: "Kuvvet yapının çökmesine neden oldu", word: "collapse", trWord: "çökmesine", blank: "The force caused the structure to ___" },
    { en: "The regulation forces the factory to reduce waste", tr: "Yönetmelik fabrikayı atığı azaltmaya zorlar", word: "reduce", trWord: "azaltmaya", blank: "The regulation forces the factory to ___ waste" },
    { en: "The professor asked the students to write a summary", tr: "Profesör öğrencilerden bir özet yazmalarını istedi", word: "write", trWord: "yazmalarını", blank: "The professor asked the students to ___ a summary" },
    { en: "We expect the temperature to increase tomorrow", tr: "Sıcaklığın yarın artmasını bekliyoruz", word: "increase", trWord: "artmasını", blank: "We expect the temperature to ___ tomorrow" },
    { en: "The treaty allowed the countries to trade", tr: "Antlaşma ülkelerin ticaret yapmasına izin verdi", word: "trade", trWord: "yapmasına", blank: "The treaty allowed the countries to ___" },
    { en: "They convinced the members to accept the suggestion", tr: "Üyeleri öneriyi kabul etmeye ikna ettiler", word: "accept", trWord: "kabul etmeye", blank: "They convinced the members to ___ the suggestion" },
    { en: "The design permits the system to control the process", tr: "Tasarım sistemin süreci kontrol etmesine izin verir", word: "control", trWord: "kontrol etmesine", blank: "The design permits the system to ___ the process" },
    { en: "The law forbids the factory to pollute the river", tr: "Yasa fabrikanın nehri kirletmesini yasaklar", word: "pollute", trWord: "kirletmesini", blank: "The law forbids the factory to ___ the river" },
    { en: "The warning reminded the worker to wear a helmet", tr: "Uyarı işçiye kask takmasını hatırlattı", word: "wear", trWord: "takmasını", blank: "The warning reminded the worker to ___ a helmet" },
    { en: "We invite the expert to evaluate the project", tr: "Uzmanı projeyi değerlendirmeye davet ediyoruz", word: "evaluate", trWord: "değerlendirmeye", blank: "We invite the expert to ___ the project" }
  ]
};

const unit14LessonSentences = {
  1: [
    { en: "It is important to understand the problem", tr: "Problemi anlamak önemlidir", word: "understand", trWord: "anlamak", blank: "It is important to ___ the problem" },
    { en: "It is necessary to measure the temperature", tr: "Sıcaklığı ölçmek gereklidir", word: "measure", trWord: "ölçmek", blank: "It is necessary to ___ the temperature" },
    { en: "It is difficult to change the policy", tr: "Politikayı değiştirmek zordur", word: "change", trWord: "değiştirmek", blank: "It is difficult to ___ the policy" },
    { en: "It is easy to perform this experiment", tr: "Bu deneyi yapmak kolaydır", word: "perform", trWord: "yapmak", blank: "It is easy to ___ this experiment" },
    { en: "It is possible to reduce the cost", tr: "Maliyeti düşürmek mümkündür", word: "reduce", trWord: "düşürmek", blank: "It is possible to ___ the cost" },
    { en: "It is impossible to prevent the reaction", tr: "Tepkimeyi önlemek imkansızdır", word: "prevent", trWord: "önlemek", blank: "It is impossible to ___ the reaction" },
    { en: "It is useful to write a summary", tr: "Bir özet yazmak faydalıdır", word: "write", trWord: "yazmak", blank: "It is useful to ___ a summary" },
    { en: "It is simple to operate this machine", tr: "Bu makineyi çalıştırmak basittir", word: "operate", trWord: "çalıştırmak", blank: "It is simple to ___ this machine" },
    { en: "It is essential to protect the environment", tr: "Çevreyi korumak esastır", word: "protect", trWord: "korumak", blank: "It is essential to ___ the environment" },
    { en: "It is safe to use this source", tr: "Bu kaynağı kullanmak güvenlidir", word: "use", trWord: "kullanmak", blank: "It is safe to ___ this source" },
    { en: "It is rare to observe this phenomenon", tr: "Bu olayı gözlemlemek nadirdir", word: "observe", trWord: "gözlemlemek", blank: "It is rare to ___ this phenomenon" },
    { en: "It is logical to accept the suggestion", tr: "Öneriyi kabul etmek mantıklıdır", word: "accept", trWord: "kabul etmek", blank: "It is logical to ___ the suggestion" },
    { en: "It is natural to expect a change", tr: "Bir değişiklik beklemek doğaldır", word: "expect", trWord: "beklemek", blank: "It is natural to ___ a change" },
    { en: "It is reasonable to modify the design", tr: "Tasarımı değiştirmek makuldür", word: "modify", trWord: "değiştirmek", blank: "It is reasonable to ___ the design" },
    { en: "It is dangerous to heat the mixture quickly", tr: "Karışımı hızlıca ısıtmak tehlikelidir", word: "heat", trWord: "ısıtmak", blank: "It is dangerous to ___ the mixture quickly" },
    { en: "It is convenient to store the data online", tr: "Veriyi çevrimiçi depolamak uygundur", word: "store", trWord: "depolamak", blank: "It is convenient to ___ the data online" }
  ],
  2: [
    { en: "It is important for the student to understand the problem", tr: "Öğrencinin problemi anlaması önemlidir", word: "understand", trWord: "anlaması", blank: "It is important for the student to ___ the problem" },
    { en: "It is necessary for the researcher to measure the temperature", tr: "Araştırmacının sıcaklığı ölçmesi gereklidir", word: "measure", trWord: "ölçmesi", blank: "It is necessary for the researcher to ___ the temperature" },
    { en: "It is difficult for the government to change the policy", tr: "Hükümetin politikayı değiştirmesi zordur", word: "change", trWord: "değiştirmesi", blank: "It is difficult for the government to ___ the policy" },
    { en: "It is easy for the workers to operate the machine", tr: "İşçilerin makineyi çalıştırması kolaydır", word: "operate", trWord: "çalıştırması", blank: "It is easy for the workers to ___ the machine" },
    { en: "It is possible for the company to reduce the cost", tr: "Şirketin maliyeti düşürmesi mümkündür", word: "reduce", trWord: "düşürmesi", blank: "It is possible for the company to ___ the cost" },
    { en: "It is impossible for the patient to walk today", tr: "Hastanın bugün yürümesi imkansızdır", word: "walk", trWord: "yürümesi", blank: "It is impossible for the patient to ___ today" },
    { en: "It is useful for the committee to write a summary", tr: "Komitenin bir özet yazması faydalıdır", word: "write", trWord: "yazması", blank: "It is useful for the committee to ___ a summary" },
    { en: "It is essential for the factory to protect the environment", tr: "Fabrikanın çevreyi koruması esastır", word: "protect", trWord: "koruması", blank: "It is essential for the factory to ___ the environment" },
    { en: "It is safe for the community to use this source", tr: "Topluluğun bu kaynağı kullanması güvenlidir", word: "use", trWord: "kullanması", blank: "It is safe for the community to ___ this source" },
    { en: "It is rare for the analyst to make a mistake", tr: "Analistin hata yapması nadirdir", word: "make", trWord: "yapması", blank: "It is rare for the analyst to ___ a mistake" },
    { en: "It is logical for the members to accept the suggestion", tr: "Üyelerin öneriyi kabul etmesi mantıklıdır", word: "accept", trWord: "kabul etmesi", blank: "It is logical for the members to ___ the suggestion" },
    { en: "It is natural for the child to ask questions", tr: "Çocuğun soru sorması doğaldır", word: "ask", trWord: "sorması", blank: "It is natural for the child to ___ questions" },
    { en: "It is reasonable for the team to modify the design", tr: "Ekibin tasarımı değiştirmesi makuldür", word: "modify", trWord: "değiştirmesi", blank: "It is reasonable for the team to ___ the design" },
    { en: "It is dangerous for the worker to heat the mixture", tr: "İşçinin karışımı ısıtması tehlikelidir", word: "heat", trWord: "ısıtması", blank: "It is dangerous for the worker to ___ the mixture" },
    { en: "It is convenient for the system to store the data", tr: "Sistemin veriyi depolaması uygundur", word: "store", trWord: "depolaması", blank: "It is convenient for the system to ___ the data" },
    { en: "It is necessary for the expert to evaluate the project", tr: "Uzmanın projeyi değerlendirmesi gereklidir", word: "evaluate", trWord: "değerlendirmesi", blank: "It is necessary for the expert to ___ the project" }
  ]
};

const unit15LessonSentences = {
  1: [
    { en: "We perform experiments to obtain data", tr: "Veri elde etmek için deneyler yaparız", word: "obtain", trWord: "elde etmek", blank: "We perform experiments to ___ data" },
    { en: "He measured the temperature to control the reaction", tr: "Tepkimeyi kontrol etmek için sıcaklığı ölçtü", word: "control", trWord: "kontrol etmek", blank: "He measured the temperature to ___ the reaction" },
    { en: "They changed the design to reduce the cost", tr: "Maliyeti düşürmek için tasarımı değiştirdiler", word: "reduce", trWord: "düşürmek", blank: "They changed the design to ___ the cost" },
    { en: "The patient took the medicine to cure the disease", tr: "Hastalığı tedavi etmek için ilacı aldı", word: "cure", trWord: "tedavi etmek", blank: "The patient took the medicine to ___ the disease" },
    { en: "The factory uses coal to produce energy", tr: "Enerji üretmek için kömür kullanır", word: "produce", trWord: "üretmek", blank: "The factory uses coal to ___ energy" },
    { en: "The student read the book to write a summary", tr: "Bir özet yazmak için kitabı okudu", word: "write", trWord: "yazmak", blank: "The student read the book to ___ a summary" },
    { en: "We protect the forest to save the animals", tr: "Hayvanları kurtarmak için ormanı koruruz", word: "save", trWord: "kurtarmak", blank: "We protect the forest to ___ the animals" },
    { en: "The system uses encryption to protect the data", tr: "Verileri korumak için sistem şifreleme kullanır", word: "protect", trWord: "korumak", blank: "The system uses encryption to ___ the data" },
    { en: "They created the committee to evaluate the project", tr: "Projeyi değerlendirmek için komiteyi kurdular", word: "evaluate", trWord: "değerlendirmek", blank: "They created the committee to ___ the project" },
    { en: "The worker heated the mixture to speed up the process", tr: "Süreci hızlandırmak için karışımı ısıttı", word: "speed", trWord: "hızlandırmak", blank: "The worker heated the mixture to ___ up the process" },
    { en: "The scientist used a microscope to observe the cells", tr: "Hücreleri gözlemlemek için mikroskop kullandı", word: "observe", trWord: "gözlemlemek", blank: "The scientist used a microscope to ___ the cells" },
    { en: "We changed the policy to encourage investments", tr: "Yatırımları teşvik etmek için politikayı değiştirdik", word: "encourage", trWord: "teşvik etmek", blank: "We changed the policy to ___ investments" },
    { en: "He wrote the article to explain the theory", tr: "Teoriyi açıklamak için makaleyi yazdı", word: "explain", trWord: "açıklamak", blank: "He wrote the article to ___ the theory" },
    { en: "They modified the machine to improve efficiency", tr: "Verimliliği artırmak için makineyi değiştirdiler", word: "improve", trWord: "artırmak", blank: "They modified the machine to ___ efficiency" },
    { en: "The government passed the law to prevent pollution", tr: "Kirliliği önlemek için hükümet yasayı çıkardı", word: "prevent", trWord: "prevent", blank: "The government passed the law to ___ pollution" },
    { en: "We need a strategy to achieve the goal", tr: "Hedefe ulaşmak için bir stratejiye ihtiyacımız var", word: "achieve", trWord: "ulaşmak", blank: "We need a strategy to ___ the goal" }
  ],
  2: [
    { en: "They heated the liquid in order for the reaction to start", tr: "Tepkimenin başlaması için sıvıyı ısıttılar", word: "start", trWord: "başlaması", blank: "They heated the liquid in order for the reaction to ___" },
    { en: "We modified the design in order for the team to work faster", tr: "Ekibin daha hızlı çalışması için tasarımı değiştirdik", word: "work", trWord: "çalışması", blank: "We modified the design in order for the team to ___ faster" },
    { en: "The doctor gave the drug in order for the patient to recover", tr: "Hastanın iyileşmesi için doktor ilacı verdi", word: "recover", trWord: "iyileşmesi", blank: "The doctor gave the drug in order for the patient to ___" },
    { en: "The regulation was changed in order for the factory to reduce waste", tr: "Fabrikanın atığı azaltması için yönetmelik değiştirildi", word: "reduce", trWord: "azaltması", blank: "The regulation was changed in order for the factory to ___ waste" },
    { en: "The professor explained the problem in order for the students to understand", tr: "Öğrencilerin anlaması için profesör problemi açıkladı", word: "understand", trWord: "anlaması", blank: "The professor explained the problem in order for the students to ___" },
    { en: "We store the files online so as for the users to access them", tr: "Kullanıcıların erişmesi için dosyaları çevrimiçi depolarız", word: "access", trWord: "erişmesi", blank: "We store the files online so as for the users to ___ them" },
    { en: "They built the road in order for the trucks to transport the goods", tr: "Kamyonların malları taşıması için yolu inşa ettiler", word: "transport", trWord: "taşıması", blank: "They built the road in order for the trucks to ___ the goods" },
    { en: "The law was passed in order for the community to be safe", tr: "Topluluğun güvende olması için yasa çıkarıldı", word: "be", trWord: "olması", blank: "The law was passed in order for the community to ___ safe" },
    { en: "He wrote a guide so as for the beginners to learn the method", tr: "Yeni başlayanların yöntemi öğrenmesi için bir kılavuz yazdı", word: "learn", trWord: "öğrenmesi", blank: "He wrote a guide so as for the beginners to ___ the method" },
    { en: "We need a framework in order for the system to process the data", tr: "Sistemin verileri işlemesi için bir çerçeveye ihtiyacımız var", word: "process", trWord: "işlemesi", blank: "We need a framework in order for the system to ___ the data" },
    { en: "They created the reserve in order for the animals to survive", tr: "Hayvanların hayatta kalması için koruma alanı oluşturdular", word: "survive", trWord: "hayatta kalması", blank: "They created the reserve in order for the animals to ___" },
    { en: "The system requires a password in order for the user to log in", tr: "Kullanıcının giriş yapması için sistem şifre gerektirir", word: "log", trWord: "giriş yapması", blank: "The system requires a password in order for the user to ___ in" },
    { en: "The manager called a meeting in order for the members to decide", tr: "Üyelerin karar vermesi için müdür toplantı düzenledi", word: "decide", trWord: "karar vermesi", blank: "The manager called a meeting in order for the members to ___" },
    { en: "We provide feedback in order for the students to improve", tr: "Öğrencilerin gelişmesi için geri bildirim sağlıyoruz", word: "improve", trWord: "gelişmesi", blank: "We provide feedback in order for the students to ___" },
    { en: "The software was updated in order for the device to perform better", tr: "Cihazın daha iyi çalışması için yazılım güncellendi", word: "perform", trWord: "çalışması", blank: "The software was updated in order for the device to ___ better" },
    { en: "They allocated funds so as for the researcher to finish the study", tr: "Araştırmacının çalışmayı bitirmesi için ödenek ayırdılar", word: "finish", trWord: "bitirmesi", blank: "They allocated funds so as for the researcher to ___ the study" }
  ]
};

const unit16LessonSentences = {
  1: [
    { en: "Analyzing the raw data requires a strict methodology.", tr: "Ham verileri analiz etmek katı bir metodoloji gerektirir.", word: "Analyzing", trWord: "analiz etmek", blank: "___ the raw data requires a strict methodology." },
    { en: "Modifying the legislative framework causes temporary instability.", tr: "Yasal çerçeveyi değiştirmek geçici istikrarsızlığa neden olur.", word: "Modifying", trWord: "değiştirmek", blank: "___ the legislative framework causes temporary instability." },
    { en: "Evaluating the academic curriculum takes a long time.", tr: "Akademik müfredatı değerlendirmek uzun zaman alır.", word: "Evaluating", trWord: "değerlendirmek", blank: "___ the academic curriculum takes a long time." },
    { en: "Structuring the financial resources is a complex process.", tr: "Finansal kaynakları yapılandırmak karmaşık bir süreçtir.", word: "Structuring", trWord: "yapılandırmak", blank: "___ the financial resources is a complex process." },
    { en: "Integrating the individual applications generates technical errors.", tr: "Bireysel uygulamaları entegre etmek teknik hatalar üretir.", word: "Integrating", trWord: "entegre etmek", blank: "___ the individual applications generates technical errors." },
    { en: "Restricting the resource distribution alters the economic outcome.", tr: "Kaynak dağıtımını kısıtlamak ekonomik sonucu değiştirir.", word: "Restricting", trWord: "kısıtlamak", blank: "___ the resource distribution alters the economic outcome." },
    { en: "Establishing a stable administration provides significant benefits.", tr: "İstikrarlı bir yönetim kurmak önemli faydalar sağlar.", word: "Establishing", trWord: "kurmak", blank: "___ a stable administration provides significant benefits." },
    { en: "Extracting the primary components from the compound is difficult.", tr: "Bileşikten birincil bileşenleri çıkarmak zordur.", word: "Extracting", trWord: "çıkarmak", blank: "___ the primary components from the compound is difficult." },
    { en: "Troubleshooting the Flutter interface demands specific expert analysts.", tr: "Flutter arayüzündeki sorunları gidermek özel uzman analistler gerektirir.", word: "Troubleshooting", trWord: "sorunları gidermek", blank: "___ the Flutter interface demands specific expert analysts." },
    { en: "Validating the legal contract through the regulatory process is essential.", tr: "Düzenleyici süreç yoluyla yasal sözleşmeyi doğrulamak esastır.", word: "Validating", trWord: "doğrulamak", blank: "___ the legal contract through the regulatory process is essential." },
    { en: "Defining the specific criteria helps the committee exclude irrelevant data.", tr: "Belirli kriterleri tanımlamak, komitenin ilgisiz verileri hariç tutmasına yardımcı olur.", word: "Defining", trWord: "tanımlamak", blank: "___ the specific criteria helps the committee exclude irrelevant data." },
    { en: "Publishing the official summary in a peer-reviewed journal increases institutional prestige.", tr: "Resmi özeti hakemli bir dergide yayınlamak kurumsal prestiji artırır.", word: "Publishing", trWord: "yayınlamak", blank: "___ the official summary in a peer-reviewed journal increases institutional prestige." },
    { en: "Assessing the constitutional amendment involves intense parliamentary debates.", tr: "Anayasa değişikliğini değerlendirmek yoğun parlamento tartışmalarını içerir.", word: "Assessing", trWord: "değerlendirmek", blank: "___ the constitutional amendment involves intense parliamentary debates." },
    { en: "Monitoring the local conditions allows the team to predict regional stability.", tr: "Yerel koşulları izlemek, ekibin bölgesel istikrarı tahmin etmesini sağlar.", word: "Monitoring", trWord: "izlemek", blank: "___ the local conditions allows the team to predict regional stability." },
    { en: "Generating the JSON structure automatically minimizes coding errors.", tr: "JSON yapısını otomatik olarak oluşturmak kodlama hatalarını en aza indirir.", word: "Generating", trWord: "oluşturmak", blank: "___ the JSON structure automatically minimizes coding errors." },
    { en: "Altering the statistical analysis without explicit justification invalidates the research.", tr: "Açık bir gerekçe olmadan istatistiksel analizi değiştirmek araştırmayı geçersiz kılar.", word: "Altering", trWord: "değiştirmek", blank: "___ the statistical analysis without explicit justification invalidates the research." },
    { en: "Processing the scanned text requires specialized OCR software.", tr: "Taranmış metni işlemek özel OCR yazılımı gerektirir.", word: "Processing", trWord: "işlemek", blank: "___ the scanned text requires specialized OCR software." },
    { en: "Tracking the match schedules is integrated into the dynamic mobile app.", tr: "Maç programlarını takip etmek dinamik mobil uygulamaya entegre edilmiştir.", word: "Tracking", trWord: "takip etmek", blank: "___ the match schedules is integrated into the dynamic mobile app." },
    { en: "Regulating the battery temperature is critical for solar inverter efficiency.", tr: "Batarya sıcaklığını düzenlemek güneş enerjisi invertör verimliliği için kritik öneme sahiptir.", word: "Regulating", trWord: "düzenlemek", blank: "___ the battery temperature is critical for solar inverter efficiency." },
    { en: "Redesigning the professional CV into a corporate format improves career prospects.", tr: "Profesyonel özgeçmişi kurumsal bir formatta yeniden tasarlamak kariyer beklentilerini artırır.", word: "Redesigning", trWord: "yeniden tasarlamak", blank: "___ the professional CV into a corporate format improves career prospects." },
    { en: "Converting the separate pages into a single PDF document simplifies the archive process.", tr: "Ayrı sayfaları tek bir PDF belgesine dönüştürmek arşiv sürecini basitleştirir.", word: "Converting", trWord: "dönüştürmek", blank: "___ the separate pages into a single PDF document simplifies the archive process." },
    { en: "Adjusting the dynamic parameters stabilizes the laboratory experiment.", tr: "Dinamik parametreleri ayarlamak laboratuvar deneyini istikrarlı hale getirir.", word: "Adjusting", trWord: "ayarlamak", blank: "___ the dynamic parameters stabilizes the laboratory experiment." },
    { en: "Enforcing the strict legislation reduces non-compliant administrative procedures.", tr: "Sıkı mevzuatı uygulamak, uyumlu olmayan idari prosedürleri azaltır.", word: "Enforcing", trWord: "uygulamak", blank: "___ the strict legislation reduces non-compliant administrative procedures." },
    { en: "Maintaining the structural framework requires substantial annual funding.", tr: "Yapısal çerçeveyi sürdürmek önemli miktarda yıllık finansman gerektirir.", word: "Maintaining", trWord: "sürdürmek", blank: "___ the structural framework requires substantial annual funding." },
    { en: "Challenging the traditional methodology offers a unique alternative perspective.", tr: "Geleneksel metodolojiye meydan okumak benzersiz alternatif bir bakış açısı sunar.", word: "Challenging", trWord: "meydan okumak", blank: "___ the traditional methodology offers a unique alternative perspective." },
    { en: "Identifying the target goals provides clarity for the entire project team.", tr: "Hedef amaçları belirlemek tüm proje ekibi için netlik sağlar.", word: "Identifying", trWord: "belirlemek", blank: "___ the target goals provides clarity for the entire project team." },
    { en: "Sustaining the cultural identity depends heavily on historical integration.", tr: "Kültürel kimliği sürdürmek büyük ölçüde tarihsel entegrasyona bağlıdır.", word: "Sustaining", trWord: "sürdürmek", blank: "___ the cultural identity depends heavily on historical integration." },
    { en: "Distributing the monthly revenue is managed by the central financial department.", tr: "Aylık gelirin dağıtılması merkezi finans departmanı tarafından yönetilir.", word: "Distributing", trWord: "dağıtılması", blank: "___ the monthly revenue is managed by the central financial department." },
    { en: "Excluding the temporary variables produces more consistent statistical outcomes.", tr: "Geçici değişkenleri hariç tutmak daha tutarlı istatistiksel sonuçlar üretir.", word: "Excluding", trWord: "hariç tutmak", blank: "___ the temporary variables produces more consistent statistical outcomes." },
    { en: "Deriving the core concepts from empirical evidence supports the initial assumption.", tr: "Ampirik kanıtlardan temel kavramları türetmek başlangıçtaki varsayımı destekler.", word: "Deriving", trWord: "türetmek", blank: "___ the core concepts from empirical evidence supports the initial assumption." },
    { en: "Adopting the progressive model transforms the university assessment system.", tr: "Aşamalı modeli benimsemek üniversite değerlendirme sistemini dönüştürür.", word: "Adopting", trWord: "benimsemek", blank: "___ the progressive model transforms the university assessment system." },
    { en: "Conducting the primary experiment demands a completely sterile laboratory environment.", tr: "Temel deneyi yürütmek tamamen steril bir laboratuvar ortamı gerektirir.", word: "Conducting", trWord: "yürütmek", blank: "___ the primary experiment demands a completely sterile laboratory environment." },
    { en: "Interpreting the ancient text requires an advanced knowledge of cultural contexts.", tr: "Antik metni yorumlamak ileri düzeyde kültürel bağlam bilgisi gerektirir.", word: "Interpreting", trWord: "yorumlamak", blank: "___ the ancient text requires an advanced knowledge of cultural contexts." },
    { en: "Exporting the domestic production to global markets boosts the regional economy.", tr: "Yerli üretimi küresel pazarlara ihraç etmek bölgesel ekonomiyi canlandırır.", word: "Exporting", trWord: "ihraç etmek", blank: "___ the domestic production to global markets boosts the regional economy." },
    { en: "Allocating the annual credit across separate departments eliminates resource conflicts.", tr: "Yıllık krediyi ayrı departmanlara tahsis etmek kaynak çatışmalarını ortadan kaldırır.", word: "Allocating", trWord: "tahsis etmek", blank: "___ the annual credit across separate departments eliminates resource conflicts." },
    { en: "Abolishing the old framework clarifies the modern administrative policy.", tr: "Eski çerçeveyi yürürlükten kaldırmak modern idari politikayı netleştirir.", word: "Abolishing", trWord: "kaldırmak", blank: "___ the old framework clarifies the modern administrative policy." },
    { en: "Absorbing the toxic liquid alters the internal cell components.", tr: "Toksik sıvıyı emmek hücre içi bileşenleri değiştirir.", word: "Absorbing", trWord: "emmek", blank: "___ the toxic liquid alters the internal cell components." },
    { en: "Summarizing the disciplinary defense into a short brief saves time for the board.", tr: "Disiplin savunmasını kısa bir özet halinde sunmak kurul için zaman kazandırır.", word: "Summarizing", trWord: "kısa bir özet halinde sunmak", blank: "___ the disciplinary defense into a short brief saves time for the board." },
    { en: "Utilizing the mobile interface improves user interaction significantly.", tr: "Mobil arayüzü kullanmak kullanıcı etkileşimini önemli ölçüde artırır.", word: "Utilizing", trWord: "kullanmak", blank: "___ the mobile interface improves user interaction significantly." },
    { en: "Reshaping the corporate structure creates a more adaptable business model.", tr: "Kurumsal yapıyı yeniden şekillendirmek daha uyumlu bir iş modeli yaratır.", word: "Reshaping", trWord: "yeniden şekillendirmek", blank: "___ the corporate structure creates a more adaptable business model." },
    { en: "Encountering technical errors during token usage stops the software processing.", tr: "Belirteç kullanımı sırasında teknik hatalarla karşılaşmak yazılım işlemini durdurur.", word: "Encountering", trWord: "karşılaşmak", blank: "___ technical errors during token usage stops the software processing." },
    { en: "Expanding the original text adds relevant demographic data to the study.", tr: "Orijinal metni genişletmek çalışmaya ilgili demografik verileri ekler.", word: "Expanding", trWord: "genişletmek", blank: "___ the original text adds relevant demographic data to the study." },
    { en: "Dominating the economic sector allows large institutions to control pricing.", tr: "Ekonomik sektöre hakim olmak büyük kurumlara fiyatlandırmayı kontrol etme olanağı verir.", word: "Dominating", trWord: "hakim olmak", blank: "___ the economic sector allows large institutions to control pricing." },
    { en: "Reviewing the legal document prevents potential administrative complications.", tr: "Yasal belgeyi incelemek olası idari karmaşıklıkları önler.", word: "Reviewing", trWord: "incelemek", blank: "___ the legal document prevents potential administrative complications." },
    { en: "Predicting the long-term percentages remains difficult due to fluctuating variables.", tr: "Dalgalanan değişkenler nedeniyle uzun vadeli yüzdeleri tahmin etmek zor olmaya devam ediyor.", word: "Predicting", trWord: "tahmin etmek", blank: "___ the long-term percentages remains difficult due to fluctuating variables." },
    { en: "Isolating the unique parameters ensures accurate results across all trials.", tr: "Benzersiz parametreleri izole etmek tüm denemelerde doğru sonuçlar alınmasını sağlar.", word: "Isolating", trWord: "izole etmek", blank: "___ the unique parameters ensures accurate results across all trials." },
    { en: "Updating the database code resolves the dynamic synchronization issues.", tr: "Veritabanı kodunu güncellemek dinamik senkronizasyon sorunlarını çözer.", word: "Updating", trWord: "güncellemek", blank: "___ the database code resolves the dynamic synchronization issues." },
    { en: "Forming the consistent layers at the base prevents chemical degradation.", tr: "Tabanda tutarlı tabakalar oluşturmak kimyasal bozulmayı önler.", word: "Forming", trWord: "oluşturmak", blank: "___ the consistent layers at the base prevents chemical degradation." },
    { en: "Accumulating the empirical evidence takes years of comprehensive research.", tr: "Ampirik kanıt toplamak yıllarca kapsamlı araştırma gerektirir.", word: "Accumulating", trWord: "toplamak", blank: "___ the empirical evidence takes years of comprehensive research." },
    { en: "Shifting the visual elements improves user experience during the transition phase.", tr: "Görsel öğeleri kaydırmak geçiş aşamasında kullanıcı deneyimini iyileştirir.", word: "Shifting", trWord: "kaydırmak", blank: "___ the visual elements improves user experience during the transition phase." }
  ]
};

const unit17Lesson1SentencesRaw = [
  { en: "By analyzing the raw data", tr: "Ham verileri analiz ederek", word: "analyzing", trWord: "analiz ederek", blank: "By ___ the raw data" },
  { en: "By utilizing the mobile interface", tr: "Mobil arayüzü kullanarak", word: "utilizing", trWord: "kullanarak", blank: "By ___ the mobile interface" },
  { en: "By modifying the legislative framework", tr: "Yasal çerçeveyi değiştirerek", word: "modifying", trWord: "değiştirerek", blank: "By ___ the legislative framework" },
  { en: "By structuring the financial resources", tr: "Finansal kaynakları yapılandırarak", word: "structuring", trWord: "yapılandırarak", blank: "By ___ the financial resources" },
  { en: "By integrating the individual applications", tr: "Bireysel uygulamaları entegre ederek", word: "integrating", trWord: "entegre ederek", blank: "By ___ the individual applications" },
  { en: "Without defining the specific criteria", tr: "Belirli kriterleri tanımlamadan", word: "defining", trWord: "tanımlamadan", blank: "Without ___ the specific criteria" },
  { en: "Without publishing the official summary", tr: "Resmi özeti yayınlamadan", word: "publishing", trWord: "yayınlamadan", blank: "Without ___ the official summary" },
  { en: "Without monitoring the local conditions", tr: "Yerel koşulları izlemeden", word: "monitoring", trWord: "izlemeden", blank: "Without ___ the local conditions" },
  { en: "Without generating the JSON structure", tr: "JSON yapısını oluşturmadan", word: "generating", trWord: "oluşturmadan", blank: "Without ___ the JSON structure" },
  { en: "Without altering the statistical analysis", tr: "İstatistiksel analizi değiştirmeden", word: "altering", trWord: "değiştirmeden", blank: "Without ___ the statistical analysis" },
  { en: "On encountering technical errors", tr: "Teknik hatalarla karşılaşınca", word: "encountering", trWord: "karşılaşınca", blank: "On ___ technical errors" },
  { en: "On tracking the match schedules", tr: "Maç programlarını takip edince", word: "tracking", trWord: "takip edince", blank: "On ___ the match schedules" },
  { en: "On regulating the battery temperature", tr: "Batarya sıcaklığını düzenleyince", word: "regulating", trWord: "düzenleyince", blank: "On ___ the battery temperature" },
  { en: "On converting the separate pages", tr: "Ayrı sayfaları dönüştürünce", word: "converting", trWord: "dönüştürünce", blank: "On ___ the separate pages" },
  { en: "On identifying the target goals", tr: "Hedef amaçları belirleyince", word: "identifying", trWord: "belirleyince", blank: "On ___ the target goals" },
  { en: "In evaluating the academic curriculum", tr: "Akademik müfredatı değerlendirirken", word: "evaluating", trWord: "değerlendirirken", blank: "In ___ the academic curriculum" },
  { en: "In processing the scanned text", tr: "Taranmış metni işlerken", word: "processing", trWord: "işlerken", blank: "In ___ the scanned text" },
  { en: "In adjusting the dynamic parameters", tr: "Dinamik parametreleri ayarlarken", word: "adjusting", trWord: "ayarlarken", blank: "In ___ the dynamic parameters" },
  { en: "In maintaining the structural framework", tr: "Yapısal çerçeveyi sürdürürken", word: "maintaining", trWord: "sürdürürken", blank: "In ___ the structural framework" },
  { en: "In distributing the monthly revenue", tr: "Aylık geliri dağıtırken", word: "distributing", trWord: "dağıtırken", blank: "In ___ the monthly revenue" },
  { en: "By analyzing the raw data, the analyst identified the primary error.", tr: "Ham verileri analiz ederek analist temel hatayı belirledi.", word: "analyzing", trWord: "analiz ederek", blank: "By ___ the raw data, the analyst identified the primary error." },
  { en: "By utilizing the mobile interface, the application improves user interaction.", tr: "Mobil arayüzü kullanarak uygulama kullanıcı etkileşimini iyileştirir.", word: "utilizing", trWord: "kullanarak", blank: "By ___ the mobile interface, the application improves user interaction." },
  { en: "By modifying the legislative framework, the progressive government established stability.", tr: "Yasal çerçeveyi değiştirerek ilerici hükümet istikrar sağladı.", word: "modifying", trWord: "değiştirerek", blank: "By ___ the legislative framework, the progressive government established stability." },
  { en: "By structuring the financial resources, the department funded the project.", tr: "Finansal kaynakları yapılandırarak departman projeyi finanse etti.", word: "structuring", trWord: "yapılandırarak", blank: "By ___ the financial resources, the department funded the project." },
  { en: "By integrating the individual applications, the team minimized software errors.", tr: "Bireysel uygulamaları entegre ederek ekip yazılım hatalarını en aza indirdi.", word: "integrating", trWord: "entegre ederek", blank: "By ___ the individual applications, the team minimized software errors." },
  { en: "Without defining the specific criteria, the committee cannot exclude irrelevant data.", tr: "Belirli kriterleri tanımlamadan komite ilgisiz verileri hariç tutamaz.", word: "defining", trWord: "tanımlamadan", blank: "Without ___ the specific criteria, the committee cannot exclude irrelevant data." },
  { en: "Without publishing the official summary, the university lacks institutional visibility.", tr: "Resmi özeti yayınlamadan üniversite kurumsal görünürlükten yoksundur.", word: "publishing", trWord: "yayınlamadan", blank: "Without ___ the official summary, the university lacks institutional visibility." },
  { en: "Without monitoring the local conditions, predicting regional stability remains difficult.", tr: "Yerel koşulları izlemeden bölgesel istikrarı tahmin etmek zor olmaya devam ediyor.", word: "monitoring", trWord: "izlemeden", blank: "Without ___ the local conditions, predicting regional stability remains difficult." },
  { en: "Without generating the JSON structure, the database cannot track schedules.", tr: "JSON yapısını oluşturmadan veritabanı programları takip edemez.", word: "generating", trWord: "oluşturmadan", blank: "Without ___ the JSON structure, the database cannot track schedules." },
  { en: "Without altering the statistical analysis, the expert proved the original thesis.", tr: "İstatistiksel analizi değiştirmeden uzman orijinal tezi kanıtladı.", word: "altering", trWord: "değiştirmeden", blank: "Without ___ the statistical analysis, the expert proved the original thesis." },
  { en: "On encountering technical errors, the program automatically stops the processing.", tr: "Teknik hatalarla karşılaşınca program işlemi otomatik olarak durdurur.", word: "encountering", trWord: "karşılaşınca", blank: "On ___ technical errors, the program automatically stops the processing." },
  { en: "On tracking the match schedules, users notice the dynamic calendar integration.", tr: "Maç programlarını takip edince kullanıcılar dinamik takvim entegrasyonunu fark eder.", word: "tracking", trWord: "takip edince", blank: "On ___ the match schedules, users notice the dynamic calendar integration." },
  { en: "On regulating the battery temperature, the system protects the solar inverters.", tr: "Batarya sıcaklığını düzenleyince sistem güneş enerjisi invertörlerini korur.", word: "regulating", trWord: "düzenleyince", blank: "On ___ the battery temperature, the system protects the solar inverters." },
  { en: "On converting the separate pages, the secretary created a comprehensive PDF.", tr: "Ayrı sayfaları dönüştürünce sekreter kapsamlı bir PDF oluşturdu.", word: "converting", trWord: "dönüştürünce", blank: "On ___ the separate pages, the secretary created a comprehensive PDF." },
  { en: "On identifying the target goals, the professional prepared the strategic defense.", tr: "Hedef amaçları belirleyince profesyonel stratejik savunmayı hazırladı.", word: "identifying", trWord: "belirleyince", blank: "On ___ the target goals, the professional prepared the strategic defense." },
  { en: "In evaluating the academic curriculum, the board reviewed the entire program.", tr: "Akademik müfredatı değerlendirirken kurul tüm programı gözden geçirdi.", word: "evaluating", trWord: "değerlendirirken", blank: "In ___ the academic curriculum, the board reviewed the entire program." },
  { en: "In processing the scanned text, the updated software runs an OCR tool.", tr: "Taranmış metni işlerken güncellenmiş yazılım bir OCR aracı çalıştırır.", word: "processing", trWord: "işlerken", blank: "In ___ the scanned text, the updated software runs an OCR tool." },
  { en: "In adjusting the dynamic parameters, the engineer balanced the structural framework.", tr: "Dinamik parametreleri ayarlarken mühendis yapısal çerçeveyi dengeledi.", word: "adjusting", trWord: "ayarlarken", blank: "In ___ the dynamic parameters, the engineer balanced the structural framework." },
  { en: "In maintaining the structural framework, the administration spent substantial annual resources.", tr: "Yapısal çerçeveyi sürdürürken yönetim önemli miktarda yıllık kaynak harcadı.", word: "maintaining", trWord: "sürdürürken", blank: "In ___ the structural framework, the administration spent substantial annual resources." },
  { en: "In distributing the monthly revenue, the central bank tracked fluctuating economic percentages.", tr: "Aylık geliri dağıtırken merkez bankası dalgalanan ekonomik yüzdeleri takip etti.", word: "distributing", trWord: "dağıtırken", blank: "In ___ the monthly revenue, the central bank tracked fluctuating economic percentages." }
];

const unit17Lesson2SentencesRaw = [
  { en: "When analyzing the raw data", tr: "Ham verileri analiz ederken", word: "analyzing", trWord: "analiz ederken", blank: "When ___ the raw data" },
  { en: "When modifying the legislative framework", tr: "Yasal çerçeveyi değiştirirken", word: "modifying", trWord: "değiştirirken", blank: "When ___ the legislative framework" },
  { en: "When evaluating the academic curriculum", tr: "Akademik müfredatı değerlendirirken", word: "evaluating", trWord: "değerlendirirken", blank: "When ___ the academic curriculum" },
  { en: "When structuring the financial resources", tr: "Finansal kaynakları yapılandırırken", word: "structuring", trWord: "yapılandırırken", blank: "When ___ the financial resources" },
  { en: "While integrating the individual applications", tr: "Bireysel uygulamaları entegre ederken", word: "integrating", trWord: "entegre ederken", blank: "While ___ the individual applications" },
  { en: "While restricting the resource distribution", tr: "Kaynak dağıtımını kısıtlarken", word: "restricting", trWord: "kısıtlarken", blank: "While ___ the resource distribution" },
  { en: "While establishing a stable administration", tr: "İstikrarlı bir yönetim kurarken", word: "establishing", trWord: "kurarken", blank: "While ___ the stable administration" },
  { en: "While extracting the primary components", tr: "Birincil bileşenleri çıkarırken", word: "extracting", trWord: "çıkarırken", blank: "While ___ the primary components" },
  { en: "Before troubleshooting the Flutter interface", tr: "Flutter arayüzündeki sorunları gidermeden önce", word: "troubleshooting", trWord: "sorunları gidermeden önce", blank: "Before ___ the Flutter interface" },
  { en: "Before validating the legal contract", tr: "Yasal sözleşmeyi doğrulamadan önce", word: "validating", trWord: "doğrulamadan önce", blank: "Before ___ the legal contract" },
  { en: "Before defining the specific criteria", tr: "Belirli kriterleri tanımlamadan önce", word: "defining", trWord: "tanımlamadan önce", blank: "Before ___ the specific criteria" },
  { en: "Before publishing the official summary", tr: "Resmi özeti yayınlamadan önce", word: "publishing", trWord: "yayınlamadan önce", blank: "Before ___ the official summary" },
  { en: "After assessing the constitutional amendment", tr: "Anayasa değişikliğini değerlendirdikten sonra", word: "assessing", trWord: "değerlendirdikten sonra", blank: "After ___ the constitutional amendment" },
  { en: "After monitoring the local conditions", tr: "Yerel koşulları izledikten sonra", word: "monitoring", trWord: "izledikten sonra", blank: "After ___ the local conditions" },
  { en: "After generating the JSON structure", tr: "JSON yapısını oluşturduktan sonra", word: "generating", trWord: "oluşturduktan sonra", blank: "After ___ the JSON structure" },
  { en: "After altering the statistical analysis", tr: "İstatistiksel analizi değiştirdikten sonra", word: "altering", trWord: "değiştirdikten sonra", blank: "After ___ the statistical analysis" },
  { en: "Since processing the scanned text", tr: "Taranmış metni işlediğinden beri", word: "processing", trWord: "işlediğinden beri", blank: "Since ___ the scanned text" },
  { en: "Since tracking the match schedules", tr: "Maç programlarını takip ettiğinden beri", word: "tracking", trWord: "takip ettiğinden beri", blank: "Since ___ the match schedules" },
  { en: "Since regulating the battery temperature", tr: "Batarya sıcaklığını düzenlediğinden beri", word: "regulating", trWord: "düzenlediğinden beri", blank: "Since ___ the battery temperature" },
  { en: "Since redesigning the professional CV", tr: "Profesyonel özgeçmişi yeniden tasarladığından beri", word: "redesigning", trWord: "yeniden tasarladığından beri", blank: "Since ___ the professional CV" },
  { en: "When analyzing the raw data, the expert identified an error.", tr: "Ham verileri analiz ederken uzman bir hata belirledi.", word: "analyzing", trWord: "analiz ederken", blank: "When ___ the raw data, the expert identified an error." },
  { en: "When modifying the legislative framework, the government altered the code.", tr: "Yasal çerçeveyi değiştirirken hükümet kanunu değiştirdi.", word: "modifying", trWord: "değiştirirken", blank: "When ___ the legislative framework, the government altered the code." },
  { en: "When evaluating the academic curriculum, the university requires empirical evidence.", tr: "Akademik müfredatı değerlendirirken üniversite ampirik kanıt gerektirir.", word: "evaluating", trWord: "değerlendirirken", blank: "When ___ the academic curriculum, the university requires empirical evidence." },
  { en: "When structuring the financial resources, the committee defined strict parameters.", tr: "Finansal kaynakları yapılandırarken komite katı parametreler belirledi.", word: "structuring", trWord: "yapılandırırken", blank: "When ___ the financial resources, the committee defined strict parameters." },
  { en: "While integrating the individual applications, the engineer encountered technical errors.", tr: "Bireysel uygulamaları entegre ederken mühendis teknik hatalarla karşılaştı.", word: "integrating", trWord: "entegre ederken", blank: "While ___ the individual applications, the engineer encountered technical errors." },
  { en: "While restricting the resource distribution, the administration caused temporary instability.", tr: "Kaynak dağıtımını kısıtlarken yönetim geçici istikrarsızlığa neden oldu.", word: "restricting", trWord: "kısıtlarken", blank: "While ___ the resource distribution, the administration caused temporary instability." },
  { en: "While establishing a stable administration, the director faced intense opposition.", tr: "İstikrarlı bir yönetim kurarken direktör yoğun muhalefetle karşılaştı.", word: "establishing", trWord: "kurarken", blank: "While ___ the stable administration, the director faced intense opposition." },
  { en: "While extracting the primary components, the technician utilized special tools.", tr: "Birincil bileşenleri çıkarırken teknisyen özel aletler kullandı.", word: "extracting", trWord: "çıkarırken", blank: "While ___ the primary components, the technician utilized special tools." },
  { en: "Before troubleshooting the Flutter interface, you must update the database.", tr: "Flutter arayüzündeki sorunları gidermeden önce veritabanını güncellemelisiniz.", word: "troubleshooting", trWord: "sorunları gidermeden önce", blank: "Before ___ the Flutter interface, you must update the database." },
  { en: "Before validating the legal contract, the parties reviewed every clause.", tr: "Yasal sözleşmeyi doğrulamadan önce taraflar her maddeyi gözden geçirdi.", word: "validating", trWord: "doğrulamadan önce", blank: "Before ___ the legal contract, the parties reviewed every clause." },
  { en: "Before defining the specific criteria, the board excluded fluctuating data.", tr: "Belirli kriterleri tanımlamadan önce kurul dalgalanan verileri hariç tuttu.", word: "defining", trWord: "tanımlamadan önce", blank: "Before ___ the specific criteria, the board excluded fluctuating data." },
  { en: "Before publishing the official summary, the committee summarized the defense.", tr: "Resmi özeti yayınlamadan önce komite savunmayı özetledi.", word: "publishing", trWord: "yayınlamadan önce", blank: "Before ___ the official summary, the committee summarized the defense." },
  { en: "After assessing the constitutional amendment, the legal authorities modified the legislation.", tr: "Anayasa değişikliğini değerlendirdikten sonra yasal otoriteler mevzuatı değiştirdi.", word: "assessing", trWord: "değerlendirdikten sonra", blank: "After ___ the constitutional amendment, the legal authorities modified the legislation." },
  { en: "After monitoring the local conditions, the team predicted the long-term percentages.", tr: "Yerel koşulları izledikten sonra ekip uzun vadeli yüzdeleri tahmin etti.", word: "monitoring", trWord: "izledikten sonra", blank: "After ___ the local conditions, the team predicted the long-term percentages." },
  { en: "After generating the JSON structure, the mobile application displayed accurate schedules.", tr: "JSON yapısını oluşturduktan sonra mobil uygulama doğru programları gösterdi.", word: "generating", trWord: "oluşturduktan sonra", blank: "After ___ the JSON structure, the mobile application displayed accurate schedules." },
  { en: "After altering the statistical analysis, the researcher submitted the final text.", tr: "İstatistiksel analizi değiştirdikten sonra araştırmacı nihai metni sundu.", word: "altering", trWord: "değiştirdikten sonra", blank: "After ___ the statistical analysis, the researcher submitted the final text." },
  { en: "Since processing the scanned text, the team has fixed several parameters.", tr: "Taranmış metni işlediğinden beri ekip birkaç parametreyi düzeltti.", word: "processing", trWord: "işlediğinden beri", blank: "Since ___ the scanned text, the team has fixed several parameters." },
  { en: "Since tracking the match schedules, the analyst has updated his calendar.", tr: "Maç programlarını takip ettiğinden beri analist takvimini güncelledi.", word: "tracking", trWord: "takip ettiğinden beri", blank: "Since ___ the match schedules, the analyst has updated his calendar." },
  { en: "Since regulating the battery temperature, the facility has sustained perfect stability.", tr: "Batarya sıcaklığını düzenlediğinden beri tesis mükemmel istikrarı sürdürdü.", word: "regulating", trWord: "düzenlediğinden beri", blank: "Since ___ the battery temperature, the facility has sustained perfect stability." },
  { en: "Since redesigning the professional CV, the candidate has secured a corporate position.", tr: "Profesyonel özgeçmişi yeniden tasarladığından beri aday kurumsal bir pozisyon elde etti.", word: "redesigning", trWord: "yeniden tasarladığından beri", blank: "Since ___ the professional CV, the candidate has secured a corporate position." }
];

const unit17Lesson3SentencesRaw = [
  { en: "When obtained from the comprehensive study", tr: "Kapsamlı çalışmadan elde edildiğinde", word: "obtained", trWord: "elde edildiğinde", blank: "When ___ from the comprehensive study" },
  { en: "When processed by the updated software", tr: "Güncellenmiş yazılım tarafından işlendiğinde", word: "processed", trWord: "işlendiğinde", blank: "When ___ by the updated software" },
  { en: "If modified by the central administration", tr: "Merkezi yönetim tarafından değiştirilirse", word: "modified", trWord: "değiştirilirse", blank: "If ___ by the central administration" },
  { en: "If excluded from the final statistical analysis", tr: "Nihai istatistiksel analizden hariç tutulursa", word: "excluded", trWord: "hariç tutulursa", blank: "If ___ from the final statistical analysis" },
  { en: "Unless evaluated by the academic committee", tr: "Akademik komite tarafından değerlendirilmedikçe", word: "evaluated", trWord: "değerlendirilmedikçe", blank: "Unless ___ by the academic committee" },
  { en: "Unless validated through the regulatory process", tr: "Düzenleyici süreç yoluyla doğrulanmadıkça", word: "validated", trWord: "doğrulanmadıkça", blank: "Unless ___ through the regulatory process" },
  { en: "Although established by the special committee", tr: "Özel komite tarafından kurulmasına rağmen", word: "established", trWord: "kurulmasına rağmen", blank: "Although ___ by the special committee" },
  { en: "Although defined in the legal document", tr: "Yasal belgede tanımlanmasına rağmen", word: "defined", trWord: "tanımlanmasına rağmen", blank: "Although ___ in the legal document" },
  { en: "Until structured within the JSON format", tr: "JSON formatında yapılandırılana kadar", word: "structured", trWord: "yapılandırılana kadar", blank: "Until ___ within the JSON format" },
  { en: "Until integrated into the Flutter application", tr: "Flutter uygulamasına entegre edilene kadar", word: "integrated", trWord: "entegre edilene kadar", blank: "Until ___ into the Flutter application" },
  { en: "As identified in the chemical compound", tr: "Kimyasal bileşikte tanımlandığı gibi", word: "identified", trWord: "tanımlandığı gibi", blank: "As ___ in the chemical compound" },
  { en: "As confirmed by the expert analyst", tr: "Uzman analist tarafından onaylandığı gibi", word: "confirmed", trWord: "onaylandığı gibi", blank: "As ___ by the expert analyst" },
  { en: "As prepared by the professional team", tr: "Profesyonel ekip tarafından hazırlandığı gibi", word: "prepared", trWord: "hazırlandığı gibi", blank: "As ___ by the professional team" },
  { en: "Where preserved by the local administration", tr: "Yerel yönetim tarafından korunduğu yerde", word: "preserved", trWord: "korunduğu yerde", blank: "Where ___ by the local administration" },
  { en: "Where exported to global markets", tr: "Küresel pazarlara ihraç edildiği yerde", word: "exported", trWord: "ihraç edildiği yerde", blank: "Where ___ to global markets" },
  { en: "When adjusted by the technical team", tr: "Teknik ekip tarafından ayarlandığında", word: "adjusted", trWord: "ayarlandığında", blank: "When ___ by the technical team" },
  { en: "If extracted from the digital sources", tr: "Dijital kaynaklardan çıkarılırsa", word: "extracted", trWord: "çıkarılırsa", blank: "If ___ from the digital sources" },
  { en: "Unless maintained through substantial annual funding", tr: "Önemli miktarda yıllık finansmanla sürdürülmedikçe", word: "maintained", trWord: "sürdürülmedikçe", blank: "Unless ___ through substantial annual funding" },
  { en: "Although derived from empirical evidence", tr: "Ampirik kanıtlardan türetilmesine rağmen", word: "derived", trWord: "türetilmesine rağmen", blank: "Although ___ from empirical evidence" },
  { en: "Until redesigned into a corporate format", tr: "Kurumsal bir formata yeniden tasarlanana kadar", word: "redesigned", trWord: "tasarlanana kadar", blank: "Until ___ into a corporate format" },
  { en: "When obtained from the comprehensive study, the data proved valid.", tr: "Kapsamlı çalışmadan elde edildiğinde veriler geçerli olduğunu kanıtladı.", word: "obtained", trWord: "elde edildiğinde", blank: "When ___ from the comprehensive study, the data proved valid." },
  { en: "When processed by the updated software, the text appears clearly.", tr: "Güncellenmiş yazılım tarafından işlendiğinde metin net bir şekilde görünür.", word: "processed", trWord: "işlendiğinde", blank: "When ___ by the updated software, the text appears clearly." },
  { en: "If modified by the central administration, the framework changes immediately.", tr: "Merkezi yönetim tarafından değiştirilirse çerçeve hemen değişir.", word: "modified", trWord: "değiştirilirse", blank: "If ___ by the central administration, the framework changes immediately." },
  { en: "If excluded from the final statistical analysis, the variables alter results.", tr: "Nihai istatistiksel analizden hariç tutulursa değişkenler sonuçları değiştirir.", word: "excluded", trWord: "hariç tutulursa", blank: "If ___ from the final statistical analysis, the variables alter results." },
  { en: "Unless evaluated by the academic committee, the curriculum cannot change.", tr: "Akademik komite tarafından değerlendirilmedikçe müfredat değişemez.", word: "evaluated", trWord: "değerlendirilmedikçe", blank: "Unless ___ by the academic committee, the curriculum cannot change." },
  { en: "Unless validated through the regulatory process, the legal contract is inactive.", tr: "Düzenleyici süreç yoluyla doğrulanmadıkça yasal sözleşme geçersizdir.", word: "validated", trWord: "doğrulanmadıkça", blank: "Unless ___ through the regulatory process, the legal contract is inactive." },
  { en: "Although established by the special committee, the criteria faced intense opposition.", tr: "Özel komite tarafından kurulmasına rağmen kriterler yoğun muhalefetle karşılaştı.", word: "established", trWord: "kurulmasına rağmen", blank: "Although ___ by the special committee, the criteria faced intense opposition." },
  { en: "Although defined in the legal document, the dynamic clause remains controversial.", tr: "Yasal belgede tanımlanmasına rağmen dinamik madde tartışmalı kalmaya devam ediyor.", word: "defined", trWord: "tanımlanmasına rağmen", blank: "Although ___ in the legal document, the dynamic clause remains controversial." },
  { en: "Until structured within the JSON format, the data generates severe errors.", tr: "JSON formatında yapılandırılana kadar veriler ciddi hatalar üretir.", word: "structured", trWord: "yapılandırılana kadar", blank: "Until ___ within the JSON format, the data generates severe errors." },
  { en: "Until integrated into the Flutter application, the mobile interface functions slowly.", tr: "Flutter uygulamasına entegre edilene kadar mobil arayüz yavaş çalışır.", word: "integrated", trWord: "entegre edilene kadar", blank: "Until ___ into the Flutter application, the mobile interface functions slowly." },
  { en: "As identified in the chemical compound, the primary components are toxic.", tr: "Kimyasal bileşikte tanımlandığı gibi birincil bileşenler zehirlidir.", word: "identified", trWord: "tanımlandığı gibi", blank: "As ___ in the chemical compound, the primary components are toxic." },
  { en: "As confirmed by the expert analyst, the financial revenue decreased significantly.", tr: "Uzman analist tarafından onaylandığı gibi finansal gelir önemli ölçüde azaldı.", word: "confirmed", trWord: "onaylandığı gibi", blank: "As ___ by the expert analyst, the financial revenue decreased significantly." },
  { en: "As prepared by the professional team, the administrative defense was successful.", tr: "Profesyonel ekip tarafından hazırlandığı gibi idari savunma başarılı oldu.", word: "prepared", trWord: "hazırlandığı gibi", blank: "As ___ by the professional team, the administrative defense was successful." },
  { en: "Where preserved by the local administration, historic buildings attract global attention.", tr: "Yerel yönetim tarafından korunduğu yerde tarihi binalar küresel ilgi görür.", word: "preserved", trWord: "korunduğu yerde", blank: "Where ___ by the local administration, historic buildings attract global attention." },
  { en: "Where exported to global markets, domestic production boosts the local economy.", tr: "Küresel pazarlara ihraç edildiği yerde yerli üretim yerel ekonomiyi canlandırır.", word: "exported", trWord: "ihraç edildiği yerde", blank: "Where ___ to global markets, domestic production boosts the local economy." },
  { en: "When adjusted by the technical team, the parameters stabilize the system.", tr: "Teknik ekip tarafından ayarlandığında parametreler sistemi dengeler.", word: "adjusted", trWord: "ayarlandığında", blank: "When ___ by the technical team, the parameters stabilize the system." },
  { en: "If extracted from the digital sources, the statistics require comprehensive verification.", tr: "Dijital kaynaklardan çıkarılırsa istatistikler kapsamlı doğrulama gerektirir.", word: "extracted", trWord: "çıkarılırsa", blank: "If ___ from the digital sources, the statistics require comprehensive verification." },
  { en: "Unless maintained through substantial annual funding, the structural framework will collapse.", tr: "Önemli miktarda yıllık finansmanla sürdürülmedikçe yapısal çerçeve çökecektir.", word: "maintained", trWord: "sürdürülmedikçe", blank: "Unless ___ through substantial annual funding, the structural framework will collapse." },
  { en: "Although derived from empirical evidence, the theory challenges traditional methodology assumptions.", tr: "Ampirik kanıtlardan türetilmesine rağmen teori geleneksel metodoloji varsayımlarına meydan okuyor.", word: "derived", trWord: "türetilmesine rağmen", blank: "Although ___ from empirical evidence, the theory challenges traditional methodology assumptions." },
  { en: "Until redesigned into a corporate format, the professional CV lacks target efficiency.", tr: "Kurumsal bir formata yeniden tasarlanana kadar profesyonel özgeçmiş hedef etkililiğinden yoksundur.", word: "redesigned", trWord: "tasarlanana kadar", blank: "Until ___ into a corporate format, the professional CV lacks target efficiency." }
];

const unit17LessonSentences = {
  1: unit17Lesson1SentencesRaw,
  2: unit17Lesson2SentencesRaw,
  3: unit17Lesson3SentencesRaw
};

const unit18LessonSentences = {
  1: [
    { en: "They do not know how to solve the problem", tr: "Sorunu nasıl çözeceklerini bilmiyorlar", word: "solve", trWord: "çözeceklerini", blank: "They do not know how to ___ the problem" },
    { en: "The manual explains how to operate the machine", tr: "Kılavuz makinenin nasıl çalıştırılacağını açıklar", word: "operate", trWord: "çalıştırılacağını", blank: "The manual explains how to ___ the machine" },
    { en: "We must decide when to start the experiment", tr: "Deneye ne zaman başlayacağımıza karar vermeliyiz", word: "start", trWord: "başlayacağımıza", blank: "We must decide when to ___ the experiment" },
    { en: "She asked where to find the measurements", tr: "Ölçümleri nerede bulacağını sordu", word: "find", trWord: "bulacağını", blank: "She asked where to ___ the measurements" },
    { en: "They are not sure what to expect", tr: "Ne bekleyeceklerinden emin değiller", word: "expect", trWord: "bekleyeceklerinden", blank: "They are not sure what to ___" },
    { en: "He explained how to measure the volume", tr: "Hacmin nasıl ölçüleceğini açıkladı", word: "measure", trWord: "ölçüleceğini", blank: "He explained how to ___ the volume" },
    { en: "We are discussing who to invite to the meeting", tr: "Toplantıya kimi davet edeceğimizi tartışıyoruz", word: "invite", trWord: "davet edeceğimizi", blank: "We are discussing who to ___ to the meeting" },
    { en: "The guide shows where to store the chemicals", tr: "Kılavuz kimyasalların nerede depolanacağını gösterir", word: "store", trWord: "depolanacağını", blank: "The guide shows where to ___ the chemicals" },
    { en: "They must choose which method to apply", tr: "Hangi yöntemi uygulayacaklarını seçmeliler", word: "apply", trWord: "uygulayacaklarını", blank: "They must choose which method to ___" },
    { en: "She told the worker when to heat the mixture", tr: "İşçiye karışımı ne zaman ısıtacağını söyledi", word: "heat", trWord: "ısıtacağını", blank: "She told the worker when to ___ the mixture" },
    { en: "We need to learn how to protect the data", tr: "Verileri nasıl koruyacağımızı öğrenmemiz gerekiyor", word: "protect", trWord: "koruyacağımızı", blank: "We need to learn how to ___ the data" },
    { en: "The doctor told the patient what to eat", tr: "Doktor hastaya ne yiyeceğini söyledi", word: "eat", trWord: "yiyeceğini", blank: "The doctor told the patient what to ___" },
    { en: "They are planning where to build the new factory", tr: "Yeni fabrikayı nereye kuracaklarını planlıyorlar", word: "build", trWord: "kuracaklarını", blank: "They are planning where to ___ the new factory" },
    { en: "We must consider how to reduce the costs", tr: "Maliyetleri nasıl düşüreceğimizi düşünmeliyiz", word: "reduce", trWord: "düşüreceğimizi", blank: "We must consider how to ___ the costs" },
    { en: "He showed the assistant which tube to use", tr: "Asistana hangi tüpü kullanacağını gösterdi", word: "use", trWord: "kullanacağını", blank: "He showed the assistant which tube to ___" },
    { en: "They did not know whether to accept the suggestion", tr: "Öneriyi kabul edip etmeyeceklerini bilmiyorlardı", word: "accept", trWord: "kabul edip", blank: "They did not know whether to ___ the suggestion" }
  ]
};

const unit19LessonSentences = {
  1: [
    { en: "Before the reaction started, the liquid was cold", tr: "Tepkime başlamadan önce sıvı soğuktu", word: "started", trWord: "başlamadan", blank: "Before the reaction ___, the liquid was cold" },
    { en: "After they changed the plan, the project succeeded", tr: "Planı değiştirdikten sonra proje başarılı oldu", word: "changed", trWord: "değiştirdikten", blank: "After they ___ the plan, the project succeeded" },
    { en: "When the temperature increased, the liquid boiled", tr: "Sıcaklık arttığında sıvı kaynadı", word: "increased", trWord: "arttığında", blank: "When the temperature ___, the liquid boiled" },
    { en: "Since they adopted the new method, profits have increased", tr: "Yeni yöntemi benimsediklerinden beri kârlar arttı", word: "adopted", trWord: "benimsediklerinden", blank: "Since they ___ the new method, profits have increased" },
    { en: "While they were performing the experiment, a fire started", tr: "Deneyi yaparlarken bir yangın çıktı", word: "performing", trWord: "yaparlarken", blank: "While they were ___ the experiment, a fire started" },
    { en: "As the population grows, the demand for energy increases", tr: "Nüfus büyüdükçe enerjiye olan talep artar", word: "grows", trWord: "büyüdükçe", blank: "As the population ___, the demand for energy increases" },
    { en: "Until they solve the problem, the factory remains closed", tr: "Sorunu çözene kadar fabrika kapalı kalır", word: "solve", trWord: "çözene", blank: "Until they ___ the problem, the factory remains closed" },
    { en: "Before he wrote the article, he read many books", tr: "Makaleyi yazmadan önce birçok kitap okudu", word: "wrote", trWord: "yazmadan", blank: "Before he ___ the article, he read many books" },
    { en: "After the patient took the medicine, he recovered quickly", tr: "Hasta ilacı aldıktan sonra hızlıca iyileşti", word: "took", trWord: "aldıktan", blank: "After the patient ___ the medicine, he recovered quickly" },
    { en: "When the sun rises, the fog disappears quickly", tr: "Güneş doğduğunda sis hızlıca kaybolur", word: "rises", trWord: "doğduğunda", blank: "When the sun ___, the fog disappears quickly" },
    { en: "Since they left the city, they have lived in a village", tr: "Şehirden ayrıldıklarından beri bir köyde yaşıyorlar", word: "left", trWord: "ayrıldıklarından", blank: "Since they ___ the city, they have lived in a village" },
    { en: "While she was reading the report, she noticed the error", tr: "Raporu okurken hatayı fark etti", word: "reading", trWord: "okurken", blank: "While she was ___ the report, she noticed the error" },
    { en: "As the pressure rises, the volume decreases", tr: "Basınç arttıkça hacim azalır", word: "rises", trWord: "arttıkça", blank: "As the pressure ___, the volume decreases" },
    { en: "Until the test ends, nobody can leave the room", tr: "Test bitene kadar kimse odadan ayrılamaz", word: "ends", trWord: "bitene", blank: "Until the test ___, nobody can leave the room" },
    { en: "Before you sign the contract, read it carefully", tr: "Sözleşmeyi imzalamadan önce dikkatlice okuyun", word: "sign", trWord: "imzalamadan", blank: "Before you ___ the contract, read it carefully" },
    { en: "After they finished the work, they went home", tr: "İşi bitirdikten sonra eve gittiler", word: "finished", trWord: "bitirdikten", blank: "After they ___ the work, they went home" }
  ],
  2: [
    { en: "Because the weather was bad, the flight was cancelled", tr: "Hava kötü olduğu için uçuş iptal edildi", word: "because", trWord: "olduğu için", blank: "___ the weather was bad, the flight was cancelled" },
    { en: "Since we have no money, we cannot buy a car", tr: "Paramız olmadığı için araba satın alamayız", word: "since", trWord: "olmadığı için", blank: "___ we have no money, we cannot buy a car" },
    { en: "As the shop was closed, he returned home empty-handed", tr: "Dükkan kapalı olduğu için eve eli boş döndü", word: "as", trWord: "olduğu için", blank: "___ the shop was closed, he returned home empty-handed" },
    { en: "Because she was tired, she went to bed early", tr: "Yorgun olduğu için yatağa erken gitti", word: "because", trWord: "olduğu için", blank: "___ she was tired, she went to bed early" },
    { en: "Since the light was red, the driver stopped the car", tr: "Işık kırmızı olduğu için sürücü arabayı durdurdu", word: "since", trWord: "olduğu için", blank: "___ the light was red, the driver stopped the car" },
    { en: "As they were late, they missed the train", tr: "Geç kaldıkları için treni kaçırdılar", word: "as", trWord: "kaldıkları için", blank: "___ they were late, they missed the train" },
    { en: "Because he is very clever, he solved the problem easily", tr: "Çok zeki olduğu için problemi kolayca çözdü", word: "because", trWord: "olduğu için", blank: "___ he is very clever, he solved the problem easily" },
    { en: "Since the food was cold, he did not eat it", tr: "Yemek soğuk olduğu için onu yemedi", word: "since", trWord: "olduğu için", blank: "___ the food was cold, he did not eat it" },
    { en: "As the room was dark, she turned on the light", tr: "Oda karanlık olduğu için ışığı açtı", word: "as", trWord: "olduğu için", blank: "___ the room was dark, she turned on the light" },
    { en: "Because they worked hard, they won the match", tr: "Sıkı çalıştıkları için maçı kazandılar", word: "because", trWord: "çalıştıkları için", blank: "___ they worked hard, they won the match" },
    { en: "Since the database was corrupted, we lost the files", tr: "Veritabanı bozulduğu için dosyaları kaybettik", word: "since", trWord: "bozulduğu için", blank: "___ the database was corrupted, we lost the files" },
    { en: "As the water was dirty, they did not drink it", tr: "Su kirli olduğu için onu içmediler", word: "as", trWord: "olduğu için", blank: "___ the water was dirty, they did not drink it" },
    { en: "Because the road was slippery, he drove very slowly", tr: "Yol kaygan olduğu için çok yavaş sürdü", word: "because", trWord: "olduğu için", blank: "___ the road was slippery, he drove very slowly" },
    { en: "Since the store is near, we can walk there", tr: "Mağaza yakın olduğu için oraya yürüyebiliriz", word: "since", trWord: "olduğu için", blank: "___ the store is near, we can walk there" },
    { en: "As she is an expert, we should ask her advice", tr: "O bir uzman olduğu için onun tavsiyesini istemeliyiz", word: "as", trWord: "olduğu için", blank: "___ she is an expert, we should ask her advice" },
    { en: "Because the engine failed, the ship could not move", tr: "Motor arızalandığı için gemi hareket edemedi", word: "because", trWord: "arızalandığı için", blank: "___ the engine failed, the ship could not move" }
  ],
  3: [
    { en: "Although the test was difficult, they passed it", tr: "Test zor olmasına rağmen onu geçtiler", word: "although", trWord: "olmasına rağmen", blank: "___ the test was difficult, they passed it" },
    { en: "Even though it was raining, we went for a walk", tr: "Yağmur yağmasına rağmen yürüyüşe çıktık", word: "even", trWord: "rağmen", blank: "___ though it was raining, we went for a walk" },
    { en: "While he likes football, his brother prefers basketball", tr: "O futbolu severken, erkek kardeşi basketbolu tercih eder", word: "while", trWord: "severken", blank: "___ he likes football, his brother prefers basketball" },
    { en: "Although they had little time, they finished the project", tr: "Az zamanları olmasına rağmen projeyi bitirdiler", word: "although", trWord: "olmasına rağmen", blank: "___ they had little time, they finished the project" },
    { en: "Even though he was tired, he continued to work", tr: "Yorgun olmasına rağmen çalışmaya devam etti", word: "even", trWord: "rağmen", blank: "___ though he was tired, he continued to work" },
    { en: "While gold is expensive, iron is very cheap", tr: "Altın pahalıyken, demir çok ucuzdur", word: "while", trWord: "pahalıyken", blank: "___ gold is expensive, iron is very cheap" },
    { en: "Although she was ill, she came to the meeting", tr: "Hasta olmasına rağmen toplantıya geldi", word: "although", trWord: "olmasına rağmen", blank: "___ she was ill, she came to the meeting" },
    { en: "Even though the price was high, they bought the house", tr: "Fiyat yüksek olmasına rağmen evi satın aldılar", word: "even", trWord: "rağmen", blank: "___ though the price was high, they bought the house" },
    { en: "Whereas some species migrate, others stay all year", tr: "Bazı türler göç ederken, diğerleri tüm yıl kalır", word: "whereas", trWord: "göç ederken", blank: "___ some species migrate, others stay all year" },
    { en: "Although he is young, he is very experienced", tr: "Genç olmasına rağmen çok deneyimlidir", word: "although", trWord: "olmasına rağmen", blank: "___ he is young, he is very experienced" },
    { en: "Even though they lost the match, they played well", tr: "Maçı kaybetmelerine rağmen iyi oynadılar", word: "even", trWord: "rağmen", blank: "___ though they lost the match, they played well" },
    { en: "While the north is cold, the south is warm", tr: "Kuzey soğukken, güney sıcaktır", word: "while", trWord: "soğukken", blank: "___ the north is cold, the south is warm" },
    { en: "Although the noise was loud, the baby slept soundly", tr: "Gürültü yüksek olmasına rağmen bebek deliksiz uyudu", word: "although", trWord: "olmasına rağmen", blank: "___ the noise was loud, the baby slept soundly" },
    { en: "Even though she studied hard, she failed the exam", tr: "Sıkı çalışmasına rağmen sınavda başarısız oldu", word: "even", trWord: "rağmen", blank: "___ though she studied hard, she failed the exam" },
    { en: "Whereas copper conducts heat well, wood does not", tr: "Bakır ısıyı iyi iletirken, ahşap iletmez", word: "whereas", trWord: "iletirken", blank: "___ copper conducts heat well, wood does not" },
    { en: "Although the book was long, I read it in one day", tr: "Kitap uzun olmasına rağmen onu bir günde okudum", word: "although", trWord: "olmasına rağmen", blank: "___ the book was long, I read it in one day" }
  ],
  4: [
    { en: "The weather was so hot that the plants dried up", tr: "Hava o kadar sıcaktı ki bitkiler kurudu", word: "so", trWord: "o kadar", blank: "The weather was ___ hot that the plants dried up" },
    { en: "It was such a difficult question that nobody could answer it", tr: "O kadar zor bir soruydu ki kimse cevaplayamadı", word: "such", trWord: "o kadar", blank: "It was ___ a difficult question that nobody could answer it" },
    { en: "He runs as fast as his brother does", tr: "Kardeşi kadar hızlı koşar", word: "as", trWord: "kadar", blank: "He runs as fast ___ his brother does" },
    { en: "The music was so loud that we could not talk", tr: "Müzik o kadar yüksek sesliydi ki konuşamadık", word: "so", trWord: "o kadar", blank: "The music was ___ loud that we could not talk" },
    { en: "It was such a beautiful day that we went outside", tr: "O kadar güzel bir gündü ki dışarı çıktık", word: "such", trWord: "o kadar", blank: "It was ___ a beautiful day that we went outside" },
    { en: "The project was as successful as we expected", tr: "Proje beklediğimiz kadar başarılıydı", word: "as", trWord: "kadar", blank: "The project was as successful ___ we expected" },
    { en: "She was so tired that she fell asleep on the sofa", tr: "O kadar yorgundu ki kanepede uyuyakaldı", word: "so", trWord: "o kadar", blank: "She was ___ tired that she fell asleep on the sofa" },
    { en: "It was such a heavy box that I could not carry it", tr: "O kadar ağır bir kutuydu ki taşıyamadım", word: "such", trWord: "o kadar", blank: "It was ___ a heavy box that I could not carry it" },
    { en: "This method is as effective as the old one", tr: "Bu yöntem eskisi kadar etkilidir", word: "as", trWord: "kadar", blank: "This method is as effective ___ the old one" },
    { en: "The light was so bright that we closed our eyes", tr: "Işık o kadar parlaktı ki gözlerimizi kapattık", word: "so", trWord: "o kadar", blank: "The light was ___ bright that we closed our eyes" },
    { en: "It was such a loud noise that everyone jumped", tr: "O kadar gürültülü bir sesti ki herkes yerinden sıçradı", word: "such", trWord: "o kadar", blank: "It was ___ a loud noise that everyone jumped" },
    { en: "The water is as warm as we want it", tr: "Su istediğimiz kadar sıcaktır", word: "as", trWord: "kadar", blank: "The water is as warm ___ we want it" },
    { en: "The problem was so complex that we needed help", tr: "Problem o kadar karmaşıktı ki yardıma ihtiyacımız oldu", word: "so", trWord: "o kadar", blank: "The problem was ___ complex that we needed help" },
    { en: "It was such a rare species that they protected it", tr: "O kadar nadir bir türdü ki onu korudular", word: "such", trWord: "o kadar", blank: "It was ___ a rare species that they protected it" },
    { en: "The second test was as simple as the first one", tr: "İkinci test ilki kadar basitti", word: "as", trWord: "kadar", blank: "The second test was as simple ___ the first one" },
    { en: "He spoke so quickly that we could not understand him", tr: "O kadar hızlı konuştu ki onu anlayamadık", word: "so", trWord: "o kadar", blank: "He spoke ___ quickly that we could not understand him" }
  ],
  5: [
    { en: "They heated the liquid so that it would boil", tr: "Kaynaması için sıvıyı ısıttılar", word: "that", trWord: "için", blank: "They heated the liquid so ___ it would boil" },
    { en: "We arrived early in order to get good seats", tr: "İyi yerler kapmak amacıyla erken vardık", word: "order", trWord: "amacıyla", blank: "We arrived early in ___ to get good seats" },
    { en: "She took notes so that she would not forget", tr: "Unutmamak için notlar aldı", word: "that", trWord: "için", blank: "She took notes so ___ she would not forget" },
    { en: "They wore coats in order that they would stay warm", tr: "Sıcak kalabilmeleri amacıyla mont giydiler", word: "order", trWord: "amacıyla", blank: "They wore coats in ___ that they would stay warm" },
    { en: "He saved money so that he could buy a computer", tr: "Bilgisayar satın alabilmek için para biriktirdi", word: "that", trWord: "için", blank: "He saved money so ___ he could buy a computer" },
    { en: "We used a map in order not to get lost", tr: "Kaybolmamak amacıyla bir harita kullandık", word: "order", trWord: "amacıyla", blank: "We used a map in ___ not to get lost" },
    { en: "They locked the door so that nobody could enter", tr: "Kimsenin girememesi için kapıyı kilitlediler", word: "that", trWord: "için", blank: "They locked the door so ___ nobody could enter" },
    { en: "She spoke slowly in order that we could follow her", tr: "Onu takip edebilmemiz amacıyla yavaşça konuştu", word: "order", trWord: "amacıyla", blank: "She spoke slowly in ___ that we could follow her" },
    { en: "He wore glasses so that he could see the board", tr: "Tahtayı görebilmek için gözlük taktı", word: "that", trWord: "için", blank: "He wore glasses so ___ he could see the board" },
    { en: "We lowered the volume in order not to disturb others", tr: "Başkalarını rahatsız etmemek amacıyla sesi kıstık", word: "order", trWord: "amacıyla", blank: "We lowered the volume in ___ not to disturb others" },
    { en: "They cleaned the pipe so that the water would flow", tr: "Suyun akması için boruyu temizlediler", word: "that", trWord: "için", blank: "They cleaned the pipe so ___ the water would flow" },
    { en: "She saved data in order that the analysis could continue", tr: "Analizin devam edebilmesi amacıyla verileri kaydetti", word: "order", trWord: "amacıyla", blank: "She saved data in ___ that the analysis could continue" },
    { en: "He left early so that he would avoid the traffic", tr: "Trafikten kaçınmak için erken ayrıldı", word: "that", trWord: "için", blank: "He left early so ___ he would avoid the traffic" },
    { en: "We hid the keys in order that children could not find them", tr: "Çocukların bulamaması amacıyla anahtarları sakladık", word: "order", trWord: "amacıyla", blank: "We hid the keys in ___ that children could not find them" },
    { en: "They wore masks so that they would protect themselves", tr: "Kendilerini korumak için maske taktılar", word: "that", trWord: "için", blank: "They wore masks so ___ they would protect themselves" },
    { en: "She whispered in order to keep the secret safe", tr: "Sırrı güvende tutmak amacıyla fısıldadı", word: "order", trWord: "amacıyla", blank: "She whispered in ___ to keep the secret safe" }
  ],
  6: [
    { en: "The road was blocked, so we turned back", tr: "Yol kapalıydı, bu yüzden geri döndük", word: "so", trWord: "bu yüzden", blank: "The road was blocked, ___ we turned back" },
    { en: "The experiment failed, therefore we must repeat it", tr: "Deney başarısız oldu, bu nedenle onu tekrarlamalıyız", word: "therefore", trWord: "bu nedenle", blank: "The experiment failed, ___ we must repeat it" },
    { en: "He lost his keys, as a result he was late", tr: "Anahtarlarını kaybetti, sonuç olarak geç kaldı", word: "result", trWord: "sonuç olarak", blank: "He lost his keys, as a ___ he was late" },
    { en: "The crop was destroyed, consequently prices went up", tr: "Mahsul yok oldu, sonuç olarak fiyatlar yükseldi", word: "consequently", trWord: "sonuç olarak", blank: "The crop was destroyed, ___ prices went up" },
    { en: "The engine was hot, so they stopped the car", tr: "Motor sıcaktı, bu yüzden arabayı durdurdular", word: "so", trWord: "bu yüzden", blank: "The engine was hot, ___ they stopped the car" },
    { en: "He did not study, therefore he failed the exam", tr: "Çalışmadı, bu nedenle sınavda başarısız oldu", word: "therefore", trWord: "bu nedenle", blank: "He did not study, ___ he failed the exam" },
    { en: "The demand decreased, as a result production slowed down", tr: "Talep azaldı, sonuç olarak üretim yavaşladı", word: "result", trWord: "sonuç olarak", blank: "The demand decreased, as a ___ production slowed down" },
    { en: "The bridge was broken, consequently they built a new one", tr: "Köprü kırıktı, sonuç olarak yenisini inşa ettiler", word: "consequently", trWord: "sonuç olarak", blank: "The bridge was broken, ___ they built a new one" },
    { en: "It was raining heavily, so they stayed inside", tr: "Yoğun yağmur yağıyordu, bu yüzden içeride kaldılar", word: "so", trWord: "bu yüzden", blank: "It was raining heavily, ___ they stayed inside" },
    { en: "The contract was signed, therefore the work began", tr: "Sözleşme imzalandı, bu nedenle iş başladı", word: "therefore", trWord: "bu nedenle", blank: "The contract was signed, ___ the work began" },
    { en: "The supply decreased, as a result prices increased quickly", tr: "Arz azaldı, sonuç olarak fiyatlar hızlıca arttı", word: "result", trWord: "sonuç olarak", blank: "The supply decreased, as a ___ prices increased quickly" },
    { en: "The light went out, consequently the match was stopped", tr: "Işıklar söndü, sonuç olarak maç durduruldu", word: "consequently", trWord: "sonuç olarak", blank: "The light went out, ___ the match was stopped" },
    { en: "The shop was near, so we walked there together", tr: "Dükkan yakındı, bu yüzden oraya birlikte yürüdük", word: "so", trWord: "bu yüzden", blank: "The shop was near, ___ we walked there together" },
    { en: "He was very busy, therefore he declined the invitation", tr: "Çok meşguldü, bu nedenle daveti reddetti", word: "therefore", trWord: "bu nedenle", blank: "He was very busy, ___ he declined the invitation" },
    { en: "A leak was detected, as a result they emptied the tank", tr: "Sızıntı tespit edildi, sonuç olarak tankı boşalttılar", word: "result", trWord: "sonuç olarak", blank: "A leak was detected, as a ___ they emptied the tank" },
    { en: "The storm started, consequently the flights were delayed", tr: "Fırtına başladı, sonuç olarak uçuşlar ertelendi", word: "consequently", trWord: "sonuç olarak", blank: "The storm started, ___ the flights were delayed" }
  ],
  7: [
    { en: "If you heat water, it turns into steam", tr: "Suyu ısıtırsanız buhara dönüşür", word: "if", trWord: "eğer", blank: "___ you heat water, it turns into steam" },
    { en: "Unless they help us, we cannot finish the work", tr: "Bize yardım etmedikleri sürece işi bitiremeyiz", word: "unless", trWord: "medikleri sürece", blank: "___ they help us, we cannot finish the work" },
    { en: "You can go provided that you finish your homework", tr: "Ödevinizi bitirmeniz şartıyla gidebilirsiniz", word: "provided", trWord: "şartıyla", blank: "You can go ___ that you finish your homework" },
    { en: "If it rains tomorrow, we will stay at home", tr: "Yarın yağmur yağarsa evde kalacağız", word: "if", trWord: "eğer", blank: "___ it rains tomorrow, we will stay at home" },
    { en: "Unless you study, you will fail the exam", tr: "Çalışmadığın sürece sınavda başarısız olursun", word: "unless", trWord: "madığın sürece", blank: "___ you study, you will fail the exam" },
    { en: "The device works provided that the battery is charged", tr: "Pil dolu olduğu sürece cihaz çalışır", word: "provided", trWord: "sürece", blank: "The device works ___ that the battery is charged" },
    { en: "If the price drops, I will buy a computer", tr: "Fiyat düşerse bir bilgisayar satın alacağım", word: "if", trWord: "eğer", blank: "___ the price drops, I will buy a computer" },
    { en: "Unless he changes his attitude, they will fire him", tr: "Tavrını değiştirmediği sürece onu işten çıkaracaklar", word: "unless", trWord: "mediği sürece", blank: "___ he changes his attitude, they will fire him" },
    { en: "We can sign the contract provided that the terms are fair", tr: "Şartların adil olması koşuluyla sözleşmeyi imzalayabiliriz", word: "provided", trWord: "koşuluyla", blank: "We can sign the contract ___ that the terms are fair" },
    { en: "If they arrive late, the meeting will start without them", tr: "Geç varırlarsa toplantı onlar olmadan başlayacak", word: "if", trWord: "eğer", blank: "___ they arrive late, the meeting will start without them" },
    { en: "Unless we protect nature, global warming will increase", tr: "Doğayı korumadığımız sürece küresel ısınma artacak", word: "unless", trWord: "madığımız sürece", blank: "___ we protect nature, global warming will increase" },
    { en: "They will accept the offer provided that we pay immediately", tr: "Hemen ödememiz şartıyla teklifi kabul edecekler", word: "provided", trWord: "şartıyla", blank: "They will accept the offer ___ that we pay immediately" },
    { en: "If you double the speed, the travel time halves", tr: "Hızı iki katına çıkarırsanız seyahat süresi yarıya iner", word: "if", trWord: "eğer", blank: "___ you double the speed, the travel time halves" },
    { en: "Unless the valve is open, the fluid cannot flow", tr: "Vana açık olmadığı sürece sıvı akamaz", word: "unless", trWord: "olmadığı sürece", blank: "___ the valve is open, the fluid cannot flow" },
    { en: "The experiment is safe provided that we follow the rules", tr: "Kurallara uymamız şartıyla deney güvenlidir", word: "provided", trWord: "şartıyla", blank: "The experiment is safe ___ that we follow the rules" },
    { en: "If the light turns green, the vehicles will move", tr: "Işık yeşile dönerse araçlar hareket edecek", word: "if", trWord: "eğer", blank: "___ the light turns green, the vehicles will move" }
  ]
};

const unit20LessonSentences = {
  1: [
    { en: "Iron is heavier than wood", tr: "Demir ahşaptan daha ağırdır", word: "heavier", trWord: "daha ağırdır", blank: "Iron is ___ than wood" },
    { en: "This method is simpler than the previous one", tr: "Bu yöntem önceki yöntemden daha basittir", word: "simpler", trWord: "daha basittir", blank: "This method is ___ than the previous one" },
    { en: "The sun is the brightest object in our sky", tr: "Güneş gökyüzümüzdeki en parlak nesnedir", word: "brightest", trWord: "en parlak", blank: "The sun is the ___ object in our sky" },
    { en: "Light travels faster than sound", tr: "Işık sesten daha hızlı hareket eder", word: "faster", trWord: "daha hızlı", blank: "Light travels ___ than sound" },
    { en: "This is the easiest test of the semester", tr: "Bu dönemin en kolay testidir", word: "easiest", trWord: "en kolay", blank: "This is the ___ test of the semester" },
    { en: "Water is denser than oil", tr: "Su yağdan daha yoğundur", word: "denser", trWord: "daha yoğundur", blank: "Water is ___ than oil" },
    { en: "Copper is a better conductor than glass", tr: "Bakır camdan daha iyi bir iletkendir", word: "better", trWord: "daha iyi", blank: "Copper is a ___ conductor than glass" },
    { en: "This species is the rarest in the region", tr: "Bu tür bölgedeki en nadir türdür", word: "rarest", trWord: "en nadir", blank: "This species is the ___ in the region" },
    { en: "The second group was larger than the first group", tr: "İkinci grup birinci gruptan daha büyüktü", word: "larger", trWord: "daha büyüktü", blank: "The second group was ___ than the first group" },
    { en: "Platinum is rarer than gold", tr: "Platin altından daha nadirdir", word: "rarer", trWord: "daha nadirdir", blank: "Platinum is ___ than gold" },
    { en: "The blue whale is the largest animal on earth", tr: "Mavi balina dünyadaki en büyük hayvandır", word: "largest", trWord: "en büyük", blank: "The blue whale is the ___ animal on earth" },
    { en: "This machine is quieter than the old model", tr: "Bu makine eski modelden daha sessizdir", word: "quieter", trWord: "daha sessizdir", blank: "This machine is ___ than the old model" },
    { en: "Diamond is the hardest natural material", tr: "Elmas en sert doğal malzemedir", word: "hardest", trWord: "en sert", blank: "Diamond is the ___ natural material" },
    { en: "The response was quicker than we expected", tr: "Yanıt beklediğimizden daha hızlıydı", word: "quicker", trWord: "daha hızlıydı", blank: "The response was ___ than we expected" },
    { en: "This is the worst result of the experiment", tr: "Bu deneyin en kötü sonucudur", word: "worst", trWord: "en kötü", blank: "This is the ___ result of the experiment" },
    { en: "She is older than her sister", tr: "Kız kardeşinden daha yaşlıdır", word: "older", trWord: "daha yaşlıdır", blank: "She is ___ than her sister" }
  ],
  2: [
    { en: "Silver is more conductive than aluminum", tr: "Gümüş alüminyumdan daha iletkendir", word: "than", trWord: "-den", blank: "Silver is more conductive ___ aluminum" },
    { en: "Gold is more expensive than copper", tr: "Altın bakırdır daha pahalıdır", word: "than", trWord: "-den", blank: "Gold is more expensive ___ copper" },
    { en: "The research was more complex than we anticipated", tr: "Araştırma tahmin ettiğimizden daha karmaşıktı", word: "than", trWord: "-den", blank: "The research was more complex ___ we anticipated" },
    { en: "They need more data than they currently have", tr: "Şu anda sahip olduklarından daha fazla veriye ihtiyaçları var", word: "than", trWord: "-den", blank: "They need more data ___ they currently have" },
    { en: "This method is more reliable than that one", tr: "Bu yöntem şundan daha güvenilirdir", word: "than", trWord: "-den", blank: "This method is more reliable ___ that one" },
    { en: "The city is much larger than the village", tr: "Şehir köyden çok daha büyüktür", word: "than", trWord: "-den", blank: "The city is much larger ___ the village" },
    { en: "This chemical is more active than water", tr: "Bu kimyasal sudan daha aktiftir", word: "than", trWord: "-den", blank: "This chemical is more active ___ water" },
    { en: "The reaction occurred faster than expected", tr: "Tepkime beklenenden daha hızlı gerçekleşti", word: "than", trWord: "-den", blank: "The reaction occurred faster ___ expected" },
    { en: "We need less time than before to complete the test", tr: "Testi tamamlamak için öncekinden daha az zamana ihtiyacımız var", word: "than", trWord: "-den", blank: "We need less time ___ before to complete the test" },
    { en: "She works more efficiently than her colleague", tr: "Meslektaşından daha verimli çalışır", word: "than", trWord: "-den", blank: "She works more efficiently ___ her colleague" },
    { en: "The new battery lasts longer than the old one", tr: "Yeni pil eskisine göre daha uzun dayanır", word: "than", trWord: "-den", blank: "The new battery lasts longer ___ the old one" },
    { en: "He paid more than fifty dollars for the ticket", tr: "Bilet için elli dolardan fazla ödedi", word: "than", trWord: "-dan", blank: "He paid more ___ fifty dollars for the ticket" },
    { en: "The pressure was higher than the safe limit", tr: "Basınç güvenli sınırdan daha yüksekti", word: "than", trWord: "-den", blank: "The pressure was higher ___ the safe limit" },
    { en: "This software is more advanced than the previous version", tr: "Bu yazılım önceki sürümden daha gelişmiştir", word: "than", trWord: "-den", blank: "This software is more advanced ___ the previous version" },
    { en: "We got better results than we did last year", tr: "Geçen yıla göre daha iyi sonuçlar elde ettik", word: "than", trWord: "-den", blank: "We got better results ___ we did last year" },
    { en: "The temperature was lower than average", tr: "Sıcaklık ortalamadan daha düşüktü", word: "than", trWord: "-den", blank: "The temperature was lower ___ average" }
  ],
  3: [
    { en: "The temperature today is the same as yesterday", tr: "Bugünkü sıcaklık dünkü ile aynıdır", word: "same", trWord: "aynı", blank: "The temperature today is the ___ as yesterday" },
    { en: "This material is as flexible as rubber", tr: "Bu malzeme kauçuk kadar esnektir", word: "as", trWord: "kadar", blank: "This material is as flexible ___ rubber" },
    { en: "They share the same values as their neighbors", tr: "Komşularıyla aynı değerleri paylaşıyorlar", word: "same", trWord: "aynı", blank: "They share the ___ values as their neighbors" },
    { en: "The test was not as easy as we thought", tr: "Test düşündüğümüz kadar kolay değildi", word: "as", trWord: "kadar", blank: "The test was not as easy ___ we thought" },
    { en: "Her solution is the same as mine", tr: "Onun çözümü benimkiyle aynıdır", word: "same", trWord: "aynı", blank: "Her solution is the ___ as mine" },
    { en: "The new model is as fast as the old one", tr: "Yeni model eskisi kadar hızlıdır", word: "as", trWord: "kadar", blank: "The new model is as fast ___ the old one" },
    { en: "They arrived at the same time as the doctor did", tr: "Doktorla aynı zamanda vardılar", word: "same", trWord: "aynı", blank: "They arrived at the ___ time as the doctor did" },
    { en: "The project is as important as the other one", tr: "Proje diğeri kadar önemlidir", word: "as", trWord: "kadar", blank: "The project is as important ___ the other one" },
    { en: "This book covers the same topics as the course", tr: "Bu kitap dersle aynı konuları kapsıyor", word: "same", trWord: "aynı", blank: "This book covers the ___ topics as the course" },
    { en: "He is as tall as his father", tr: "Babası kadar uzundur", word: "as", trWord: "kadar", blank: "He is as tall ___ his father" },
    { en: "They are using the same equipment as we are", tr: "Bizimle aynı ekipmanı kullanıyorlar", word: "same", trWord: "aynı", blank: "They are using the ___ equipment as we are" },
    { en: "This method is not as reliable as the standard test", tr: "Bu yöntem standart test kadar güvenilir değildir", word: "as", trWord: "kadar", blank: "This method is not as reliable ___ the standard test" },
    { en: "The response was the same as before", tr: "Yanıt öncekiyle aynıydı", word: "same", trWord: "aynı", blank: "The response was the ___ as before" },
    { en: "She works as hard as she can", tr: "Elinden geldiği kadar sıkı çalışır", word: "as", trWord: "kadar", blank: "She works as hard ___ she can" },
    { en: "We obtained the same density as the sample", tr: "Numuneyle aynı yoğunluğu elde ettik", word: "same", trWord: "aynı", blank: "We obtained the ___ density as the sample" },
    { en: "This phone is not as heavy as that one", tr: "Bu telefon şunun kadar ağır değil", word: "as", trWord: "kadar", blank: "This phone is not as heavy ___ that one" }
  ]
};

const unit21LessonSentences = {
  1: [
    { en: "The student who solved the problem got a prize", tr: "Problemi çözen öğrenci bir ödül aldı", word: "who", trWord: "en (çözen)", blank: "The student ___ solved the problem got a prize" },
    { en: "The researcher who wrote the paper is very famous", tr: "Makaleyi yazan araştırmacı çok ünlüdür", word: "who", trWord: "en (yazan)", blank: "The researcher ___ wrote the paper is very famous" },
    { en: "I know the doctor who performed the surgery", tr: "Ameliyatı yapan doktoru tanıyorum", word: "who", trWord: "an (yapan)", blank: "I know the doctor ___ performed the surgery" },
    { en: "The woman who spoke at the meeting is our director", tr: "Toplantıda konuşan kadın direktörümüzdür", word: "who", trWord: "an (konuşan)", blank: "The woman ___ spoke at the meeting is our director" },
    { en: "We invited the professor who teaches chemistry", tr: "Kimya dersi veren profesörü davet ettik", word: "who", trWord: "en (veren)", blank: "We invited the professor ___ teaches chemistry" },
    { en: "The technician who repaired the machine was very helpful", tr: "Makineyi tamir eden teknisyen çok yardımcı oldu", word: "who", trWord: "en (tamir eden)", blank: "The technician ___ repaired the machine was very helpful" },
    { en: "The people who live next door are very quiet", tr: "Yan dairede yaşayan insanlar çok sessizdir", word: "who", trWord: "an (yaşayan)", blank: "The people ___ live next door are very quiet" },
    { en: "They found the boy who was lost in the forest", tr: "Ormanda kaybolan çocuğu buldular", word: "who", trWord: "an (kaybolan)", blank: "They found the boy ___ was lost in the forest" },
    { en: "The teacher who helped me has retired now", tr: "Bana yardım eden öğretmen şimdi emekli oldu", word: "who", trWord: "en (yardım eden)", blank: "The teacher ___ helped me has retired now" },
    { en: "Anyone who wants to join should sign the list", tr: "Katılmak isteyen herkes listeyi imzalamalıdır", word: "who", trWord: "en (isteyen)", blank: "Anyone ___ wants to join should sign the list" },
    { en: "The engineer who designed the bridge is very creative", tr: "Köprüyü tasarlayan mühendis çok yaratıcıdır", word: "who", trWord: "an (tasarlayan)", blank: "The engineer ___ designed the bridge is very creative" },
    { en: "We met the worker who discovered the leak", tr: "Sızıntıyı bulan işçiyle tanıştık", word: "who", trWord: "an (bulan)", blank: "We met the worker ___ discovered the leak" },
    { en: "The officer who checked our documents was polite", tr: "Belgelerimizi kontrol eden memur kibardı", word: "who", trWord: "en (kontrol eden)", blank: "The officer ___ checked our documents was polite" },
    { en: "The witness who saw the accident called the police", tr: "Kazayı gören tanık polisi aradı", word: "who", trWord: "en (gören)", blank: "The witness ___ saw the accident called the police" },
    { en: "The lawyer who represents him is very experienced", tr: "Onu temsil eden avukat çok deneyimlidir", word: "who", trWord: "en (temsil eden)", blank: "The lawyer ___ represents him is very experienced" },
    { en: "The expert who examined the sample found no bacteria", tr: "Numuneyi inceleyen uzman hiç bakteri bulamadı", word: "who", trWord: "en (inceleyen)", blank: "The expert ___ examined the sample found no bacteria" }
  ],
  2: [
    { en: "The book which is on the table is a dictionary", tr: "Masanın üzerindeki kitap bir sözlüktür", word: "which", trWord: "ki o (kitap)", blank: "The book ___ is on the table is a dictionary" },
    { en: "The element which has the atomic number one is hydrogen", tr: "Atom numarası bir olan element hidrojendir", word: "which", trWord: "olan", blank: "The element ___ has the atomic number one is hydrogen" },
    { en: "We need a method which is simple and reliable", tr: "Basit ve güvenilir bir yönteme ihtiyacımız var", word: "which", trWord: "olan", blank: "We need a method ___ is simple and reliable" },
    { en: "The device which measures pressure is called a barometer", tr: "Basıncı ölçen cihaza barometre denir", word: "which", trWord: "en (ölçen)", blank: "The device ___ measures pressure is called a barometer" },
    { en: "They built a database which stores all client information", tr: "Tüm müşteri bilgilerini saklayan bir veritabanı kurdular", word: "which", trWord: "an (saklayan)", blank: "They built a database ___ stores all client information" },
    { en: "The law which was passed yesterday changes the tax rates", tr: "Dün kabul edilen yasa vergi oranlarını değiştiriyor", word: "which", trWord: "ki o (yasa)", blank: "The law ___ was passed yesterday changes the tax rates" },
    { en: "The force which attracts objects to the ground is gravity", tr: "Nesneleri yere çeken kuvvet yerçekimidir", word: "which", trWord: "en (çeken)", blank: "The force ___ attracts objects to the ground is gravity" },
    { en: "We bought a software which translates text automatically", tr: "Metni otomatik olarak çeviren bir yazılım satın aldık", word: "which", trWord: "en (çeviren)", blank: "We bought a software ___ translates text automatically" },
    { en: "The reaction which occurs is highly exothermic", tr: "Gerçekleşen tepkime son derece ısı verendir", word: "which", trWord: "en (gerçekleşen)", blank: "The reaction ___ occurs is highly exothermic" },
    { en: "He suggested a solution which seemed very practical", tr: "Çok pratik görünen bir çözüm önerdi", word: "which", trWord: "en (görünen)", blank: "He suggested a solution ___ seemed very practical" },
    { en: "The gas which is produced during combustion is carbon dioxide", tr: "Yanma sırasında üretilen gaz karbondioksittir", word: "which", trWord: "ki o (gaz)", blank: "The gas ___ is produced during combustion is carbon dioxide" },
    { en: "They live in a house which was built in 1920", tr: "1920 yılında inşa edilmiş bir evde yaşıyorlar", word: "which", trWord: "ki o (ev)", blank: "They live in a house ___ was built in 1920" },
    { en: "The problem which we face is very urgent", tr: "Karşı karşıya kaldığımız sorun çok acildir", word: "which", trWord: "ki o (sorun)", blank: "The problem ___ we face is very urgent" },
    { en: "She works for a company which produces medical equipment", tr: "Tıbbi ekipman üreten bir şirkette çalışıyor", word: "which", trWord: "en (üreten)", blank: "She works for a company ___ produces medical equipment" },
    { en: "The error which was detected has been fixed", tr: "Tespit edilen hata düzeltildi", word: "which", trWord: "ki o (hata)", blank: "The error ___ was detected has been fixed" },
    { en: "We reached a compromise which satisfied both parties", tr: "Her iki tarafı da memnun eden bir uzlaşmaya vardık", word: "which", trWord: "en (memnun eden)", blank: "We reached a compromise ___ satisfied both parties" }
  ],
  3: [
    { en: "This is the laboratory where we do the research", tr: "Araştırmayı yaptığımız laboratuvar burasıdır", word: "where", trWord: "dığımız (yer)", blank: "This is the laboratory ___ we do the research" },
    { en: "They visited the city where the treaty was signed", tr: "Antlaşmanın imzalandığı şehri ziyaret ettiler", word: "where", trWord: "dığı (yer)", blank: "They visited the city ___ the treaty was signed" },
    { en: "He lives in a town where there are no cars", tr: "Hiç arabanın olmadığı bir kasabada yaşıyor", word: "where", trWord: "olduğu (yer)", blank: "He lives in a town ___ there are no cars" },
    { en: "The place where the accident happened is closed now", tr: "Kazanın meydana geldiği yer şimdi kapalıdır", word: "where", trWord: "geldiği (yer)", blank: "The place ___ the accident happened is closed now" },
    { en: "We found a cave where early humans lived", tr: "Erken insanların yaşadığı bir mağara bulduk", word: "where", trWord: "yaşadığı (yer)", blank: "We found a cave ___ early humans lived" },
    { en: "The museum where the paintings are exhibited is near", tr: "Tabloların sergilendiği müze yakındadır", word: "where", trWord: "sergilendiği (yer)", blank: "The museum ___ the paintings are exhibited is near" },
    { en: "They built a warehouse where we can store the stock", tr: "Stokları depolayabileceğimiz bir depo inşa ettiler", word: "where", trWord: "depolayabileceğimiz", blank: "They built a warehouse ___ we can store the stock" },
    { en: "That is the spot where the river starts", tr: "Nehrin başladığı nokta orasıdır", word: "where", trWord: "başladığı (yer)", blank: "That is the spot ___ the river starts" },
    { en: "He pointed to the room where the safe is located", tr: "Kasanın bulunduğu odayı işaret etti", word: "where", trWord: "bulunduğu (yer)", blank: "He pointed to the room ___ the safe is located" },
    { en: "This is the desk where I write my articles", tr: "Makalelerimi yazdığım masa burasıdır", word: "where", trWord: "yazdığım (yer)", blank: "This is the desk ___ I write my articles" },
    { en: "They showed us the field where the plants grow", tr: "Bize bitkilerin yetiştiği tarlayı gösterdiler", word: "where", trWord: "yetiştiği (yer)", blank: "They showed us the field ___ the plants grow" },
    { en: "We passed the boundary where the road becomes narrow", tr: "Yolun daraldığı sınırı geçtik", word: "where", trWord: "daraldığı (yer)", blank: "We passed the boundary ___ the road becomes narrow" },
    { en: "The hotel where we stayed was clean and cheap", tr: "Kaldığımız otel temiz ve ucuzdu", word: "where", trWord: "kaldığımız (yer)", blank: "The hotel ___ we stayed was clean and cheap" },
    { en: "They are searching for the area where the wreckage lies", tr: "Enkazın yattığı bölgeyi arıyorlar", word: "where", trWord: "yattığı (yer)", blank: "They are searching for the area ___ the wreckage lies" },
    { en: "This is the school where my father taught history", tr: "Babamın tarih öğrettiği okul burasıdır", word: "where", trWord: "öğrettiği (yer)", blank: "This is the school ___ my father taught history" },
    { en: "We visited the building where the congress meets", tr: "Kongrenin toplandığı binayı ziyaret ettik", word: "where", trWord: "toplandığı (yer)", blank: "We visited the building ___ the congress meets" }
  ],
  4: [
    { en: "The candidate whom they selected was very young", tr: "Seçtikleri aday çok gençti", word: "whom", trWord: "ki onu", blank: "The candidate ___ they selected was very young" },
    { en: "The writer whom we interviewed lives in Paris", tr: "Röportaj yaptığımız yazar Paris'te yaşıyor", word: "whom", trWord: "ki onu", blank: "The writer ___ we interviewed lives in Paris" },
    { en: "He is the manager whom you should consult", tr: "Danışmanız gereken yönetici odur", word: "whom", trWord: "ki ona", blank: "He is the manager ___ you should consult" },
    { en: "The patient whom the doctor treated recovered", tr: "Doktorun tedavi ettiği hasta iyileşti", word: "whom", trWord: "ki onu", blank: "The patient ___ the doctor treated recovered" },
    { en: "The children whom we saw in the park were playing", tr: "Parkta gördüğümüz çocuklar oynuyorlardı", word: "whom", trWord: "ki onları", blank: "The children ___ we saw in the park were playing" },
    { en: "She is the colleague whom I trust the most", tr: "En çok güvendiğim meslektaşımdır", word: "whom", trWord: "ki ona", blank: "She is the colleague ___ I trust the most" },
    { en: "The witnesses whom the police questioned described the thief", tr: "Polisin sorguladığı tanıklar hırsızı tarif etti", word: "whom", trWord: "ki onları", blank: "The witnesses ___ the police questioned described the thief" },
    { en: "The student whom he advised did not follow the rules", tr: "Tavsiyede bulunduğu öğrenci kurallara uymadı", word: "whom", trWord: "ki ona", blank: "The student ___ he advised did not follow the rules" },
    { en: "He is the client whom we represented in court", tr: "Mahkemede temsil ettiğimiz müvekkil odur", word: "whom", trWord: "ki onu", blank: "He is the client ___ we represented in court" },
    { en: "The worker whom they hired yesterday has quit", tr: "Dün işe aldıkları işçi istifa etti", word: "whom", trWord: "ki onu", blank: "The worker ___ they hired yesterday has quit" },
    { en: "The artist whom you admire is selling her paintings", tr: "Hayran olduğunuz sanatçı tablolarını satıyor", word: "whom", trWord: "ki ona", blank: "The artist ___ you admire is selling her paintings" },
    { en: "The boys whom we met at the library were students", tr: "Kütüphanede karşılaştığımız çocuklar öğrenciydi", word: "whom", trWord: "ki onları", blank: "The boys ___ we met at the library were students" },
    { en: "She is the lecturer whom the students like very much", tr: "Öğrencilerin çok sevdiği okutman odur", word: "whom", trWord: "ki onu", blank: "She is the lecturer ___ the students like very much" },
    { en: "The engineer whom we contacted gave us the figures", tr: "İletişime geçtiğimiz mühendis bize rakamları verdi", word: "whom", trWord: "ki onunla", blank: "The engineer ___ we contacted gave us the figures" },
    { en: "The professor whom they invited could not attend the ceremony", tr: "Davet ettikleri profesör törene katılamadı", word: "whom", trWord: "ki onu", blank: "The professor ___ they invited could not attend the ceremony" },
    { en: "The woman whom he married is a famous scientist", tr: "Evlendiği kadın ünlü bir bilim insanıdır", word: "whom", trWord: "ki onunla", blank: "The woman ___ he married is a famous scientist" }
  ],
  5: [
    { en: "This is the box in which they keep the keys", tr: "Anahtarları tuttukları kutu budur", word: "which", trWord: "ki onun içine", blank: "This is the box in ___ they keep the keys" },
    { en: "The table on which the laptop sits is wooden", tr: "Dizüstü bilgisayarın durduğu masa ahşaptır", word: "which", trWord: "ki onun üstünde", blank: "The table on ___ the laptop sits is wooden" },
    { en: "He is the scientist to whom they gave the award", tr: "Ödülü verdikleri bilim insanı odur", word: "whom", trWord: "ki ona", blank: "He is the scientist to ___ they gave the award" },
    { en: "This is the project for which we need funding", tr: "Finansmana ihtiyaç duyduğumuz proje budur", word: "which", trWord: "ki onun için", blank: "This is the project for ___ we need funding" },
    { en: "The house in which she was born is a museum now", tr: "Doğduğu ev şimdi bir müzedir", word: "which", trWord: "ki onun içinde", blank: "The house in ___ she was born is a museum now" },
    { en: "The desk at which he works is very messy", tr: "Çalıştığı masa çok dağınıktır", word: "which", trWord: "ki onun başında", blank: "The desk at ___ he works is very messy" },
    { en: "She is the manager with whom I discussed the issue", tr: "Sorunu görüştüğüm yönetici odur", word: "whom", trWord: "ki onunla", blank: "She is the manager with ___ I discussed the issue" },
    { en: "The agreement to which they referred was signed last year", tr: "Atıfta bulundukları anlaşma geçen yıl imzalanmıştı", word: "which", trWord: "ki ona", blank: "The agreement to ___ they referred was signed last year" },
    { en: "This is the database from which we extract the reports", tr: "Raporları çektiğimiz veritabanı budur", word: "which", trWord: "ki ondan", blank: "This is the database from ___ we extract the reports" },
    { en: "The shelf on which they store the chemical is high", tr: "Kimyasalı depoladıkları raf yüksektir", word: "which", trWord: "ki onun üstünde", blank: "The shelf on ___ they store the chemical is high" },
    { en: "He is the candidate for whom we voted", tr: "Oy verdiğimiz aday odur", word: "whom", trWord: "ki onun için", blank: "He is the candidate for ___ we voted" },
    { en: "This is the system by which they control the heat", tr: "Sıcaklığı kontrol ettikleri sistem budur", word: "which", trWord: "ki onun vasıtasıyla", blank: "This is the system by ___ they control the heat" },
    { en: "The room in which they held the conference was cold", tr: "Konferansı düzenledikleri oda soğuktu", word: "which", trWord: "ki onun içinde", blank: "The room in ___ they held the conference was cold" },
    { en: "The surface on which the liquid was poured was flat", tr: "Sıvının döküldüğü yüzey düzdü", word: "which", trWord: "ki onun üstüne", blank: "The surface on ___ the liquid was poured was flat" },
    { en: "She is the customer from whom we received the letter", tr: "Mektubu aldığımız müşteri odur", word: "whom", trWord: "ki ondan", blank: "She is the customer from ___ we received the letter" },
    { en: "The conditions under which they worked were difficult", tr: "Altında çalıştıkları koşullar zordu", word: "which", trWord: "ki onların altında", blank: "The conditions under ___ they worked were difficult" }
  ],
  6: [
    { en: "The student whose project won the prize is happy", tr: "Projesi ödül kazanan öğrenci mutludur", word: "whose", trWord: "ki onun (projesi)", blank: "The student ___ project won the prize is happy" },
    { en: "The scientist whose discoveries changed the world was recognized", tr: "Keşifleri dünyayı değiştiren bilim insanı takdir edildi", word: "whose", trWord: "ki onun (keşifleri)", blank: "The scientist ___ discoveries changed the world was recognized" },
    { en: "They met the author whose novel is a bestseller", tr: "Romanı en çok satanlar listesinde olan yazarla tanıştık", word: "whose", trWord: "ki onun (romanı)", blank: "They met the author ___ novel is a bestseller" },
    { en: "The country whose economy is growing rapidly needs resources", tr: "Ekonomisi hızla büyüyen ülkenin kaynaklara ihtiyacı var", word: "whose", trWord: "ki onun (ekonomisi)", blank: "The country ___ economy is growing rapidly needs resources" },
    { en: "The patient whose symptoms disappeared left the clinic", tr: "Belirtileri kaybolan hasta klinikten ayrıldı", word: "whose", trWord: "ki onun (belirtileri)", blank: "The patient ___ symptoms disappeared left the clinic" },
    { en: "I know the lawyer whose office is next to mine", tr: "Ofisi benimkinin yanında olan avukatı tanıyorum", word: "whose", trWord: "ki onun (ofisi)", blank: "I know the lawyer ___ office is next to mine" },
    { en: "The tree whose leaves turned yellow is a maple", tr: "Yaprakları sararan ağaç bir akçaağaçtır", word: "whose", trWord: "ki onun (yaprakları)", blank: "The tree ___ leaves turned yellow is a maple" },
    { en: "The organization whose mission is to protect children was funded", tr: "Görevi çocukları korumak olan kuruluş finanse edildi", word: "whose", trWord: "ki onun (görevi)", blank: "The organization ___ mission is to protect children was funded" },
    { en: "He is the designer whose work we saw yesterday", tr: "Dün işlerini gördüğümüz tasarımcı odur", word: "whose", trWord: "ki onun (işlerini)", blank: "He is the designer ___ work we saw yesterday" },
    { en: "The company whose sales declined is changing its plan", tr: "Satışları düşen şirket planını değiştiriyor", word: "whose", trWord: "ki onun (satışları)", blank: "The company ___ sales declined is changing its plan" },
    { en: "The woman whose handbag was stolen reported it to police", tr: "El çantası çalınan kadın bunu polise bildirdi", word: "whose", trWord: "ki onun (çantası)", blank: "The woman ___ handbag was stolen reported it to police" },
    { en: "The factory whose chimney is smoking was inspected", tr: "Bacası tüten fabrika denetlendi", word: "whose", trWord: "ki onun (bacası)", blank: "The factory ___ chimney is smoking was inspected" },
    { en: "The driver whose car broke down blocked the traffic", tr: "Arabası bozulan sürücü trafiği tıkadı", word: "whose", trWord: "ki onun (arabası)", blank: "The driver ___ car broke down blocked the traffic" },
    { en: "The species whose population is decreasing is protected", tr: "Nüfusu azalan tür korunmaktadır", word: "whose", trWord: "ki onun (nüfusu)", blank: "The species ___ population is decreasing is protected" },
    { en: "The teacher whose lessons are very popular got a promotion", tr: "Dersleri çok popüler olan öğretmen terfi aldı", word: "whose", trWord: "ki onun (dersleri)", blank: "The teacher ___ lessons are very popular got a promotion" },
    { en: "They helped the man whose house was damaged in the storm", tr: "Fırtınada evi hasar gören adama yardım ettiler", word: "whose", trWord: "ki onun (evi)", blank: "They helped the man ___ house was damaged in the storm" }
  ],
  7: [
    { en: "The book I read yesterday was very interesting", tr: "Dün okuduğum kitap çok ilginçti", word: "read", trWord: "okuduğum", blank: "The book I ___ yesterday was very interesting" },
    { en: "The man we met at the theater was a doctor", tr: "Tiyatroda karşılaştığımız adam bir doktordu", word: "met", trWord: "karşılaştığımız", blank: "The man we ___ at the theater was a doctor" },
    { en: "The report you wrote contains many mistakes", tr: "Yazdığınız rapor birçok hata içeriyor", word: "wrote", trWord: "yazdığınız", blank: "The report you ___ contains many mistakes" },
    { en: "The device they built measures humidity", tr: "İnşa ettikleri cihaz nemi ölçer", word: "built", trWord: "ettikleri", blank: "The device they ___ measures humidity" },
    { en: "The sample we analyzed was from the lake", tr: "Analiz ettiğimiz numune göldendi", word: "analyzed", trWord: "ettiğimiz", blank: "The sample we ___ was from the lake" },
    { en: "The movie she recommended was very boring", tr: "Önerdiği film çok sıkıcıydı", word: "recommended", trWord: "önerdiği", blank: "The movie she ___ was very boring" },
    { en: "The values they calculated were slightly incorrect", tr: "Hesapladıkları değerler biraz yanlıştı", word: "calculated", trWord: "hesapladıkları", blank: "The values they ___ were slightly incorrect" },
    { en: "The car he bought last week has broken down", tr: "Geçen hafta satın aldığı araba bozuldu", word: "bought", trWord: "aldığı", blank: "The car he ___ last week has broken down" },
    { en: "The method you suggested did not work", tr: "Önerdiğiniz yöntem işe yaramadı", word: "suggested", trWord: "önerdiğiniz", blank: "The method you ___ did not work" },
    { en: "The questions the teacher asked were difficult", tr: "Öğretmenin sorduğu sorular zordu", word: "asked", trWord: "sorduğu", blank: "The questions the teacher ___ were difficult" },
    { en: "The food we ate at the restaurant was delicious", tr: "Restoranda yediğimiz yemek lezzetliydi", word: "ate", trWord: "yediğimiz", blank: "The food we ___ at the restaurant was delicious" },
    { en: "The money they saved was enough to buy a house", tr: "Biriktirdikleri para bir ev almaya yetti", word: "saved", trWord: "biriktirdikleri", blank: "The money they ___ was enough to buy a house" },
    { en: "The results she obtained were published quickly", tr: "Elde ettiği sonuçlar hızlıca yayınlandı", word: "obtained", trWord: "ettiği", blank: "The results she ___ were published quickly" },
    { en: "The tools you need are in the box", tr: "İhtiyacınız olan aletler kutudadır", word: "need", trWord: "olan", blank: "The tools you ___ are in the box" },
    { en: "The details they provided were very clear", tr: "Sağladıkları ayrıntılar çok netti", word: "provided", trWord: "sağladıkları", blank: "The details they ___ were very clear" },
    { en: "The solution he proposed solved the conflict", tr: "Önerdiği çözüm anlaşmazlığı çözdü", word: "proposed", trWord: "önerdiği", blank: "The solution he ___ solved the conflict" }
  ]
};

const unit22LessonSentences = {
  1: [
    { en: "What he said was very important", tr: "Söylediği şey çok önemliydi", word: "what", trWord: "söylediği şey", blank: "___ he said was very important" },
    { en: "How they solved the problem is a secret", tr: "Sorunu nasıl çözdükleri bir sırdır", word: "how", trWord: "nasıl", blank: "___ they solved the problem is a secret" },
    { en: "Why she left the meeting is not clear", tr: "Toplantıdan neden ayrıldığı açık değil", word: "why", trWord: "neden", blank: "___ she left the meeting is not clear" },
    { en: "When they will arrive depends on the traffic", tr: "Ne zaman varacakları trafiğe bağlıdır", word: "when", trWord: "ne zaman", blank: "___ they will arrive depends on the traffic" },
    { en: "Where they store the chemicals is protected", tr: "Kimyasalları nerede sakladıkları korunmaktadır", word: "where", trWord: "nerede", blank: "___ they store the chemicals is protected" },
    { en: "What we need is more reliable data", tr: "İhtiyacımız olan şey daha güvenilir veridir", word: "what", trWord: "olan şey", blank: "___ we need is more reliable data" },
    { en: "How the engine works is explained in the manual", tr: "Motorun nasıl çalıştığı kılavuzda açıklanmıştır", word: "how", trWord: "nasıl", blank: "___ the engine works is explained in the manual" },
    { en: "Why the experiment failed is being investigated", tr: "Deneyin neden başarısız olduğu araştırılıyor", word: "why", trWord: "neden", blank: "___ the experiment failed is being investigated" },
    { en: "Where they built the factory is near the river", tr: "Fabrikayı nereye kurdukları nehrin yakınıdır", word: "where", trWord: "nereye", blank: "___ they built the factory is near the river" },
    { en: "When the reaction starts is very critical", tr: "Tepkimenin ne zaman başladığı çok kritiktir", word: "when", trWord: "ne zaman", blank: "___ the reaction starts is very critical" },
    { en: "What they discovered surprised the scientists", tr: "Keşfettikleri şey bilim insanlarını şaşırttı", word: "what", trWord: "keşfettikleri şey", blank: "___ they discovered surprised the scientists" },
    { en: "How the species adapts determines its survival", tr: "Türün nasıl adapte olduğu hayatta kalmasını belirler", word: "how", trWord: "nasıl", blank: "___ the species adapts determines its survival" },
    { en: "Why he declined the job remains unknown", tr: "İşi neden reddettiği bilinmiyor", word: "why", trWord: "neden", blank: "___ he declined the job remains unknown" },
    { en: "Where the artifact was found is kept secret", tr: "Eserin nerede bulunduğu gizli tutuluyor", word: "where", trWord: "nerede", blank: "___ the artifact was found is kept secret" },
    { en: "What you suggest is not possible", tr: "Önerdiğiniz şey mümkün değildir", word: "what", trWord: "önerdiğiniz şey", blank: "___ you suggest is not possible" },
    { en: "How we calculate the cost is standard", tr: "Maliyeti nasıl hesapladığımız standarttır", word: "how", trWord: "nasıl", blank: "___ we calculate the cost is standard" }
  ],
  2: [
    { en: "He announced that the project was completed", tr: "Projenin tamamlandığını duyurdu", word: "that", trWord: "-diğini", blank: "He announced ___ the project was completed" },
    { en: "The study indicates that smoking is dangerous", tr: "Çalışma sigara içmenin tehlikeli olduğunu gösteriyor", word: "that", trWord: "-duğunu", blank: "The study indicates ___ smoking is dangerous" },
    { en: "They believe that the results are correct", tr: "Sonuçların doğru olduğuna inanıyorlar", word: "that", trWord: "-una", blank: "They believe ___ the results are correct" },
    { en: "She proved that the theory was false", tr: "Teorinin yanlış olduğunu kanıtladı", word: "that", trWord: "-duğunu", blank: "She proved ___ the theory was false" },
    { en: "We expect that the prices will drop soon", tr: "Fiyatların yakında düşmesini bekliyoruz", word: "that", trWord: "bekliyoruz (düşmesini)", blank: "We expect ___ the prices will drop soon" },
    { en: "He suggested that they modify the design", tr: "Tasarımı değiştirmelerini önerdi", word: "that", trWord: "önerdi (değiştirmelerini)", blank: "He suggested ___ they modify the design" },
    { en: "The report concludes that the risk is high", tr: "Rapor riskin yüksek olduğu sonucuna varıyor", word: "that", trWord: "-ğu", blank: "The report concludes ___ the risk is high" },
    { en: "They suspect that a leak occurred in the tank", tr: "Tankta bir sızıntı meydana geldiğinden şüpheleniyorlar", word: "that", trWord: "şüpheleniyorlar", blank: "They suspect ___ a leak occurred in the tank" },
    { en: "She decided that she would accept the offer", tr: "Teklifi kabul etmeye karar verdi", word: "that", trWord: "karar verdi", blank: "She decided ___ she would accept the offer" },
    { en: "We know that water boils at one hundred degrees", tr: "Suyun yüz derecede kaynadığını biliyoruz", word: "that", trWord: "-dığını", blank: "We know ___ water boils at one hundred degrees" },
    { en: "He assumes that we have the data", tr: "Verilere sahip olduğumuzu varsayıyor", word: "that", trWord: "-muzu", blank: "He assumes ___ we have the data" },
    { en: "The evidence shows that the virus is spreading", tr: "Kanıtlar virüsün yayıldığını gösteriyor", word: "that", trWord: "-dığını", blank: "The evidence shows ___ the virus is spreading" },
    { en: "They agreed that the terms were acceptable", tr: "Şartların kabul edilebilir olduğu konusunda anlaştılar", word: "that", trWord: "-ğu", blank: "They agreed ___ the terms were acceptable" },
    { en: "She claims that she solved the problem alone", tr: "Problemi tek başına çözdüğünü iddia ediyor", word: "that", trWord: "-düğünü", blank: "She claims ___ she solved the problem alone" },
    { en: "We noticed that the window was open", tr: "Pencerenin açık olduğunu fark ettik", word: "that", trWord: "-duğunu", blank: "We noticed ___ the window was open" },
    { en: "He confirmed that the meeting was postponed", tr: "Toplantının ertelendiğini onayladı", word: "that", trWord: "-ğini", blank: "He confirmed ___ the meeting was postponed" }
  ],
  3: [
    { en: "Whether they will attend the meeting is not decided", tr: "Toplantıya katılıp katılmayacakları kararlaştırılmadı", word: "whether", trWord: "katılıp katılmayacakları", blank: "___ they will attend the meeting is not decided" },
    { en: "I do not know if he will accept the offer", tr: "Teklifi kabul edip etmeyeceğini bilmiyorum", word: "if", trWord: "edip etmeyeceğini", blank: "I do not know ___ he will accept the offer" },
    { en: "We must verify whether the data is accurate", tr: "Verilerin doğru olup olmadığını doğrulamalıyız", word: "whether", trWord: "olup olmadığını", blank: "We must verify ___ the data is accurate" },
    { en: "She asked if the laboratory was open", tr: "Laboratuvarın açık olup olmadığını sordu", word: "if", trWord: "olup olmadığını", blank: "She asked ___ the laboratory was open" },
    { en: "Whether the reaction starts depends on the heat", tr: "Tepkimenin başlayıp başlamayacağı ısıya bağlıdır", word: "whether", trWord: "başlayıp başlamayacağı", blank: "___ the reaction starts depends on the heat" },
    { en: "They are discussing whether to change the plan", tr: "Planı değiştirip değiştirmemeyi tartışıyorlar", word: "whether", trWord: "değiştirip değiştirmemeyi", blank: "They are discussing ___ to change the plan" },
    { en: "He wonders if the package has arrived", tr: "Paketin ulaşıp ulaşmadığını merak ediyor", word: "if", trWord: "ulaşıp ulaşmadığını", blank: "He wonders ___ the package has arrived" },
    { en: "We must determine whether the limit was exceeded", tr: "Sınırın aşılıp aşılmadığını belirlemeliyiz", word: "whether", trWord: "aşılıp aşılmadığını", blank: "We must determine ___ the limit was exceeded" },
    { en: "She doubts if they can finish the work on time", tr: "İşi zamanında bitirip bitiremeyeceklerinden şüphe ediyor", word: "if", trWord: "bitirip bitiremeyeceklerinden", blank: "She doubts ___ they can finish the work on time" },
    { en: "Whether the price drops or rises is important", tr: "Fiyatın düşmesi ya da yükselmesi önemlidir", word: "whether", trWord: "düşmesi ya da", blank: "___ the price drops or rises is important" },
    { en: "The manager asked whether the report was finished", tr: "Yönetici raporun bitip bitmediğini sordu", word: "whether", trWord: "bitip bitmediğini", blank: "The manager asked ___ the report was finished" },
    { en: "I am not sure if she knows the address", tr: "Adresi bilip bilmediğinden emin değilim", word: "if", trWord: "bilip bilmediğinden", blank: "I am not sure ___ she knows the address" },
    { en: "Whether they succeed or fail depends on their effort", tr: "Başarılı olup olmayacakları çabalarına bağlıdır", word: "whether", trWord: "olup olmayacakları", blank: "___ they succeed or fail depends on their effort" },
    { en: "We are investigating whether a virus caused the crash", tr: "Çökmeye bir virüsün neden olup olmadığını araştırıyoruz", word: "whether", trWord: "olup olmadığını", blank: "We are investigating ___ a virus caused the crash" },
    { en: "He asked if we had completed the test", tr: "Testi tamamlayıp tamamlamadığımızı sordu", word: "if", trWord: "tamamlayıp tamamlamadığımızı", blank: "He asked ___ we had completed the test" },
    { en: "Whether she will sign the contract is not clear yet", tr: "Sözleşmeyi imzalayıp imzalamayacağı henüz belli değil", word: "whether", trWord: "imzalayıp imzalamayacağı", blank: "___ she will sign the contract is not clear yet" }
  ],
  4: [
    { en: "The fact that the experiment failed surprised everyone", tr: "Deneyin başarısız olması gerçeği herkesi şaşırttı", word: "fact", trWord: "gerçeği", blank: "The ___ that the experiment failed surprised everyone" },
    { en: "We must accept the fact that resources are limited", tr: "Kaynakların sınırlı olduğu gerçeğini kabul etmeliyiz", word: "fact", trWord: "gerçeğini", blank: "We must accept the ___ that resources are limited" },
    { en: "He pointed to the fact that inflation is rising", tr: "Enflasyonun yükseldiği gerçeğine işaret etti", word: "fact", trWord: "gerçeğine", blank: "He pointed to the ___ that inflation is rising" },
    { en: "The fact that she was late ruined the plan", tr: "Onun geç kalması gerçeği planı mahvetti", word: "fact", trWord: "gerçeği", blank: "The ___ that she was late ruined the plan" },
    { en: "They ignored the fact that the road was closed", tr: "Yolun kapalı olduğu gerçeğini görmezden geldiler", word: "fact", trWord: "gerçeğini", blank: "They ignored the ___ that the road was closed" },
    { en: "The fact that the temperature dropped caused the water to freeze", tr: "Sıcaklığın düşmesi gerçeği suyun donmasına neden oldu", word: "fact", trWord: "gerçeği", blank: "The ___ that the temperature dropped caused the water to freeze" },
    { en: "She was aware of the fact that the price was high", tr: "Fiyatın yüksek olduğu gerçeğinin farkındaydı", word: "fact", trWord: "gerçeğinin", blank: "She was aware of the ___ that the price was high" },
    { en: "The fact that he works hard explains his success", tr: "Sıkı çalışması gerçeği başarısını açıklıyor", word: "fact", trWord: "gerçeği", blank: "The ___ that he works hard explains his success" },
    { en: "We cannot deny the fact that the climate is changing", tr: "İklimin değiştiği gerçeğini inkar edemeyiz", word: "fact", trWord: "gerçeğini", blank: "We cannot deny the ___ that the climate is changing" },
    { en: "The fact that the engine stopped caused the accident", tr: "Motorun durması gerçeği kazaya neden oldu", word: "fact", trWord: "gerçeği", blank: "The ___ that the engine stopped caused the accident" },
    { en: "He hid the fact that he was married", tr: "Evli olduğu gerçeğini sakladı", word: "fact", trWord: "gerçeğini", blank: "He hid the ___ that he was married" },
    { en: "The fact that they won the match gave them confidence", tr: "Maçı kazanmaları gerçeği onlara güven verdi", word: "fact", trWord: "gerçeği", blank: "The ___ that they won the match gave them confidence" },
    { en: "She referred to the fact that the laws are changing", tr: "Yasaların değişmekte olduğu gerçeğine değindi", word: "fact", trWord: "gerçeğine", blank: "She referred to the ___ that the laws are changing" },
    { en: "The fact that the battery died stopped the recording", tr: "Pilin bitmesi gerçeği kaydı durdurdu", word: "fact", trWord: "gerçeği", blank: "The ___ that the battery died stopped the recording" },
    { en: "We discussed the fact that the company lost money", tr: "Şirketin para kaybettiği gerçeğini tartıştık", word: "fact", trWord: "gerçeğini", blank: "We discussed the ___ that the company lost money" },
    { en: "The fact that the sky was clear helped the pilots", tr: "Gökyüzünün açık olması gerçeği pilotlara yardımcı oldu", word: "fact", trWord: "gerçeği", blank: "The ___ that the sky was clear helped the pilots" }
  ]
};

const unit23LessonSentences = {
  1: [
    { en: "It is clear that the experiment was successful", tr: "Deneyin başarılı olduğu açıktır", word: "clear", trWord: "açıktır", blank: "It is ___ that the experiment was successful" },
    { en: "It is believed that the species is extinct", tr: "Türün neslinin tükendiğine inanılmaktadır", word: "believed", trWord: "inanılmaktadır", blank: "It is ___ that the species is extinct" },
    { en: "It is obvious that we need more resources", tr: "Daha fazla kaynağa ihtiyacımız olduğu ortadadır", word: "obvious", trWord: "ortadadır", blank: "It is ___ that we need more resources" },
    { en: "It is suggested that they repeat the test", tr: "Testi tekrarlamaları önerilmektedir", word: "suggested", trWord: "önerilmektedir", blank: "It is ___ that they repeat the test" },
    { en: "It is important that everyone attends the meeting", tr: "Herkesin toplantıya katılması önemlidir", word: "important", trWord: "önemlidir", blank: "It is ___ that everyone attends the meeting" },
    { en: "It is expected that the prices will rise", tr: "Fiyatların yükseleceği beklenmektedir", word: "expected", trWord: "beklenmektedir", blank: "It is ___ that the prices will rise" },
    { en: "It is true that the database was corrupted", tr: "Veritabanının bozulduğu doğrudur", word: "true", trWord: "doğrudur", blank: "It is ___ that the database was corrupted" },
    { en: "It is reported that the road is closed", tr: "Yolun kapalı olduğu bildirilmektedir", word: "reported", trWord: "bildirilmektedir", blank: "It is ___ that the road is closed" },
    { en: "It is likely that it will rain tomorrow", tr: "Yarın yağmur yağması muhtemeldir", word: "likely", trWord: "muhtemeldir", blank: "It is ___ that it will rain tomorrow" },
    { en: "It is estimated that the cost is high", tr: "Maliyetin yüksek olduğu tahmin edilmektedir", word: "estimated", trWord: "tahmin edilmektedir", blank: "It is ___ that the cost is high" },
    { en: "It is essential that they sign the contract today", tr: "Sözleşmeyi bugün imzalamaları zorunludur", word: "essential", trWord: "zorunludur", blank: "It is ___ that they sign the contract today" },
    { en: "It is assumed that the values are correct", tr: "Değerlerin doğru olduğu varsayılmaktadır", word: "assumed", trWord: "varsayılmaktadır", blank: "It is ___ that the values are correct" },
    { en: "It is clear that the climate is changing", tr: "İklimin değişmekte olduğu açıktır", word: "clear", trWord: "açıktır", blank: "It is ___ that the climate is changing" },
    { en: "It is believed that the castle was built in 1200", tr: "Kalenin 1200 yılında inşa edildiğine inanılmaktadır", word: "believed", trWord: "inanılmaktadır", blank: "It is ___ that the castle was built in 1200" },
    { en: "It is obvious that the machine is broken", tr: "Makinenin bozuk olduğu ortadadır", word: "obvious", trWord: "ortadadır", blank: "It is ___ that the machine is broken" },
    { en: "It is suggested that we hire an expert", tr: "Bir uzman işe almamız önerilmektedir", word: "suggested", trWord: "önerilmektedir", blank: "It is ___ that we hire an expert" }
  ]
};

const unit24LessonSentences = {
  1: [
    { en: "It is useful to remember that the earth is round", tr: "Dünyanın yuvarlak olduğunu hatırlamak faydalıdır", word: "useful", trWord: "faydalıdır", blank: "It is ___ to remember that the earth is round" },
    { en: "It is necessary to know that the laws are changing", tr: "Yasaların değiştiğini bilmek gereklidir", word: "necessary", trWord: "gereklidir", blank: "It is ___ to know that the laws are changing" },
    { en: "It is important to show that the method works", tr: "Yöntemin işe yaradığını göstermek önemlidir", word: "important", trWord: "önemlidir", blank: "It is ___ to show that the method works" },
    { en: "It is dangerous to assume that the water is safe", tr: "Suyun güvenli olduğunu varsaymak tehlikelidir", word: "dangerous", trWord: "tehlikelidir", blank: "It is ___ to assume that the water is safe" },
    { en: "It is easy to prove that the formula is correct", tr: "Formülün doğru olduğunu kanıtlamak kolaydır", word: "easy", trWord: "kolaydır", blank: "It is ___ to prove that the formula is correct" },
    { en: "It is difficult to believe that the species is extinct", tr: "Türün neslinin tükendiğine inanmak zordur", word: "difficult", trWord: "zordur", blank: "It is ___ to believe that the species is extinct" },
    { en: "It is helpful to note that the pressure is rising", tr: "Basıncın yükseldiğini belirtmek yararlıdır", word: "helpful", trWord: "yararlıdır", blank: "It is ___ to note that the pressure is rising" },
    { en: "It is impossible to deny that the climate is changing", tr: "İklimin değiştiğini inkar etmek imkansızdır", word: "impossible", trWord: "imkansızdır", blank: "It is ___ to deny that the climate is changing" },
    { en: "It is useful to see that the profit increased", tr: "Kârın arttığını görmek faydalıdır", word: "useful", trWord: "faydalıdır", blank: "It is ___ to see that the profit increased" },
    { en: "It is necessary to verify that the file exists", tr: "Dosyanın var olduğunu doğrulamak gereklidir", word: "necessary", trWord: "gereklidir", blank: "It is ___ to verify that the file exists" },
    { en: "It is important to remember that they are experts", tr: "Onların uzman olduğunu hatırlamak önemlidir", word: "important", trWord: "önemlidir", blank: "It is ___ to remember that they are experts" },
    { en: "It is clear to see that the reaction has started", tr: "Tepkimenin başladığını görmek kolaydır", word: "clear", trWord: "kolaydır (açıktır)", blank: "It is ___ to see that the reaction has started" },
    { en: "It is easy to understand that he needs help", tr: "Onun yardıma ihtiyacı olduğunu anlamak kolaydır", word: "easy", trWord: "kolaydır", blank: "It is ___ to understand that he needs help" },
    { en: "It is difficult to explain that the experiment failed", tr: "Deneyin başarısız olduğunu açıklamak zordur", word: "difficult", trWord: "zordur", blank: "It is ___ to explain that the experiment failed" },
    { en: "It is essential to declare that the goods are safe", tr: "Malların güvenli olduğunu beyan etmek zorunludur", word: "essential", trWord: "zorunludur", blank: "It is ___ to declare that the goods are safe" },
    { en: "It is helpful to demonstrate that the device is reliable", tr: "Cihazın güvenilir olduğunu göstermek yararlıdır", word: "helpful", trWord: "yararlıdır", blank: "It is ___ to demonstrate that the device is reliable" }
  ]
};

const unit25LessonSentences = {
  1: [
    { en: "The cost was very high, therefore they changed the design", tr: "Maliyet çok yüksekti, bu nedenle tasarımı değiştirdiler", word: "therefore", trWord: "bu nedenle", blank: "The cost was very high, ___ they changed the design" },
    { en: "We heated the tube, thus the volume increased", tr: "Tüpü ısıttık, böylece hacim arttı", word: "thus", trWord: "böylece", blank: "We heated the tube, ___ the volume increased" },
    { en: "The valve broke, consequently the water leaked", tr: "Vana kırıldı, sonuç olarak su sızdı", word: "consequently", trWord: "sonuç olarak", blank: "The valve broke, ___ the water leaked" },
    { en: "The density is high, hence the material sinks", tr: "Yoğunluk yüksektir, bu yüzden malzeme batar", word: "hence", trWord: "bu yüzden", blank: "The density is high, ___ the material sinks" },
    { en: "The database crashed, therefore the site went offline", tr: "Veritabanı çöktü, bu nedenle site çevrimdışı oldu", word: "therefore", trWord: "bu nedenle", blank: "The database crashed, ___ the site went offline" },
    { en: "He worked hard, thus he earned a promotion", tr: "Sıkı çalıştı, böylece terfi kazandı", word: "thus", trWord: "böylece", blank: "He worked hard, ___ he earned a promotion" },
    { en: "The crop failed, consequently the price went up", tr: "Mahsul başarısız oldu, sonuç olarak fiyat yükseldi", word: "consequently", trWord: "sonuç olarak", blank: "The crop failed, ___ the price went up" },
    { en: "The weather was cold, hence they wore heavy coats", tr: "Hava soğuktu, bu yüzden kalın montlar giydiler", word: "hence", trWord: "bu yüzden", blank: "The weather was cold, ___ they wore heavy coats" },
    { en: "The contract ended, therefore they left the country", tr: "Sözleşme bitti, bu nedenle ülkeden ayrıldılar", word: "therefore", trWord: "bu nedenle", blank: "The contract ended, ___ they left the country" },
    { en: "We double the pressure, thus the reaction goes faster", tr: "Basıncı iki katına çıkarıyoruz, böylece tepkime daha hızlı ilerliyor", word: "thus", trWord: "böylece", blank: "We double the pressure, ___ the reaction goes faster" },
    { en: "The pump stopped, consequently the pressure dropped", tr: "Pompa durdu, sonuç olarak basınç düştü", word: "consequently", trWord: "sonuç olarak", blank: "The pump stopped, ___ the pressure dropped" },
    { en: "He did not pay the fee, hence he was excluded", tr: "Ücreti ödemedi, bu yüzden hariç tutuldu", word: "hence", trWord: "bu yüzden", blank: "He did not pay the fee, ___ he was excluded" },
    { en: "The test failed, therefore we must run it again", tr: "Test başarısız oldu, bu nedenle onu tekrar çalıştırmalıyız", word: "therefore", trWord: "bu nedenle", blank: "The test failed, ___ we must run it again" },
    { en: "She signed the paper, thus the agreement became official", tr: "Kağıdı imzaladı, böylece anlaşma resmiyet kazandı", word: "thus", trWord: "böylece", blank: "She signed the paper, ___ the agreement became official" },
    { en: "A storm started, consequently the flights were cancelled", tr: "Fırtına başladı, sonuç olarak uçuşlar iptal edildi", word: "consequently", trWord: "sonuç olarak", blank: "A storm started, ___ the flights were cancelled" },
    { en: "The signal was weak, hence we lost the connection", tr: "Sinyal zayıftı, bu yüzden bağlantıyı kaybettik", word: "hence", trWord: "bu yüzden", blank: "The signal was weak, ___ we lost the connection" }
  ]
};

const rawTopics = [
  {
    title: "I. İsim ve Edat Takımları (Sayfa 13)",
    desc: "İsimlerin edatlarla niteleme yapıları ve zincirleme edat grupları",
    icon: "👋",
    numLessons: 7,
    formulas: [
      { 
        formula: "", 
        example: "",
        description: "İngilizce'de aralarında edat (in, on, of, with vb.) veya bağlaç bulunmayan, yan yana dizilmiş kelime öbekleri (tamlamalar), kelime sayısı kaç olursa olsun soldan sağa doğru sırayla bir bütün olarak anlamlandırılarak Türkçe'ye çevrilir.<br><br><strong>Örnekler:</strong><br>• Airport ground control tower: Havalimanı yer kontrol kulesi<br>• Emergency room heart surgery team: Acil servis kalp ameliyatı ekibi"
      },
      { 
        formula: "Noun + of the + Noun", 
        example: "The legs of the animal: Hayvanın bacakları",
        description: "Eğer kelime öbekleri arasında edat ya da bağlaç bulunuyorsa arka arkaya gelen bu yapılar genellikle birbirini tamamlar ve Türkçe mantığına göre sonundan başına doğru zincirleme olarak tercüme edilir. Bu ve bundan sonraki örnekler bu kurala uygundur.<br><br>Örneğin; The volume of the liquid"
      },
      { formula: "Pronoun + of the + Noun", example: "Some of the prices: Fiyatların bazıları" },
      { formula: "Noun + of + Noun", example: "The invention of fire: Ateşin icadı" },
      { formula: "Noun + from + Noun", example: "A student from England: İngiltere'den bir öğrenci" },
      { formula: "Noun + Prepositional Phrase", example: "the house on the corner: köşedeki ev / köşede olan ev / köşede bulunan ev (Edat takımı önündeki ismi tamamlar - çevrilirken '-ki', '-olan', '-bulunan' eklenebilir)" },
      { formula: "Noun + Prep Phrase + Prep Phrase", example: "The difference in the results of the experiments: Deneylerin sonuçlarındaki fark" }
    ],
    subtitles: [
      "Giriş. İsim ve Edat Takımlarına Giriş (Sayfa 13)",
      "A. İsim + of the + isim (Sayfa 13)",
      "B. Zamir + of the + isim (Sayfa 14)",
      "C. İsim + of + isim (Sayfa 16)",
      "D. İsim + from + isim (Sayfa 17)",
      "E. İsim + edat takımı (Sayfa 13)",
      "F. İsim + edat takımı + edat takımı (Sayfa 19)"
    ]
  },
  {
    title: "II. Fiil ve Edat Takımları (Sayfa 21)",
    desc: "Fiillerin edat grupları ve zarflarla olan ilişkileri",
    icon: "🎧",
    numLessons: 2,
    formulas: [
      { formula: "Verb + Prepositional Phrase", example: "We describe this method in the next chapter: Bu yöntemi gelecek bölümde tanımlıyoruz" },
      { formula: "Prepositional Phrase + Prepositional Phrase", example: "Before the invention of the wheel: Tekerleğin icadından önce" }
    ],
    subtitles: [
      "A. Fiil + edat takımı (Sayfa 21)",
      "B. Edat takımı + edat takımı (Sayfa 23)"
    ]
  },
  {
    title: "III. İsim Tamlaması (Sayfa 72)",
    desc: "İsim tamlamaları ve bileşik isim grupları",
    icon: "🎯",
    numLessons: 2,
    formulas: [
      { formula: "Noun + Noun", example: "Income distribution: Gelir dağılımı" },
      { formula: "Adj + Noun + Noun", example: "Compound Noun Phrases: Bileşik isim tamlamaları" }
    ],
    subtitles: [
      "A. İsim + isim (Sayfa 72)",
      "B. İsim + isim + isim (Sayfa 78)"
    ]
  },
  {
    title: "IV. Present Participle Sıfatı (-ing) (Sayfa 81)",
    desc: "Present participle sıfat olarak kullanımı ve niteleme yapıları",
    icon: "🌸",
    numLessons: 2,
    formulas: [
      { formula: "Present Participle (...ing) + Noun", example: "Growing population: Büyüyen nüfus" },
      { formula: "Noun + ...ing + Noun", example: "Factor limiting the growth: Büyümeyi sınırlayan faktör" }
    ],
    subtitles: [
      "A. ...ing + isim (Sayfa 81)",
      "B. İsim + ...ing + isim (Sayfa 84)"
    ]
  },
  {
    title: "V. Past Participle Sıfatı (-ed) (Sayfa 85)",
    desc: "Past participle sıfat olarak kullanımı ve zarflı niteleme grupları",
    icon: "🌲",
    numLessons: 2,
    formulas: [
      { formula: "Past Participle (...ed) + Noun", example: "Analytical data obtained: Elde edilen analitik veri" },
      { formula: "Adverb + Past Participle + Noun", example: "Carefully analysed data: Dikkatlice analiz edilmiş veri" }
    ],
    subtitles: [
      "A. ...ed + isim (Sayfa 85)",
      "B. Zarf + past participle + isim (Sayfa 88)"
    ]
  },
  {
    title: "VI. Yapılar (Sayfa 1)",
    desc: "Özne + Olmak Fiili + İsim/Sıfat/Sıfat+İsim/Edat Takımı ile temel cümle yapıları",
    icon: "⭐",
    numLessons: 4,
    formulas: [
      { formula: "Subject + Be + Noun", example: "The student is a doctor: Öğrenci bir doktordur" },
      { formula: "Subject + Be + Adjective", example: "The ground is wet: Zemin ıslaktır" },
      { formula: "Subject + Be + Adjective + Noun", example: "The student is an English doctor: Öğrenci İngiliz bir doktordur" },
      { formula: "Subject + Be + Prepositional Phrase", example: "The student is in the train: Öğrenci trendedir" }
    ],
    subtitles: [
      "A. Özne + olmak + isim (Sayfa 1)",
      "B. Özne + olmak + sıfat (Sayfa 2)",
      "C. Özne + olmak + sıfat + isim (Sayfa 4)",
      "D. Özne + olmak + edat takımı (Sayfa 6)"
    ]
  },
  {
    title: "VII. Özne - Geçişli Fiil + Nesne (Sayfa 32)",
    desc: "Geçişli fiil ile nesne arasındaki temel ilişkiler",
    icon: "🗺️",
    numLessons: 1,
    formulas: [
      { formula: "Subject + Transitive Verb + Object", example: "The professor explained the problem: Profesör problemi açıkladı" }
    ],
    subtitles: [
      "Özne - Geçişli Fiil + Nesne (Sayfa 32)"
    ]
  },
  {
    title: "VIII. \"There\" Yapıları (Sayfa 38)",
    desc: "There is/are ve modal fiillerle varlık durumları",
    icon: "📋",
    numLessons: 2,
    formulas: [
      { formula: "There + Be + Noun", example: "There is an examination: Bir sınav vardır" },
      { formula: "There + Modal + Be/Been + Noun", example: "There must be a reason: Bir sebep olmalıdır" }
    ],
    subtitles: [
      "A. There + olmak + isim (Sayfa 38)",
      "B. There + olmak + sıfat + isim (Sayfa 39)"
    ]
  },
  {
    title: "IX. Soru Strüktürleri (Sayfa 49)",
    desc: "Wh- soru kelimeleri, yardımcı fiiller ve edatlı soru yapıları",
    icon: "🔑",
    numLessons: 5,
    formulas: [
      {
        formula: "Fiil + Özne",
        example: "Is the data valid?: Veri geçerli midir?",
        description: "Tercüme Kılavuzu: Bu yapı bir durum (olmak) sorgusudur; cümlede gitmek, yapmak gibi bir hareket fiili yoktur. İngilizcede Am, is, are, was, were kelimeleri başa gelerek cümlenin bir \"durum, nitelik veya konum\" belirttiğini fısıldar. Türkçeye çevirirken cümlenin sonuna mutlaka \"-mı, -mi, -mu, -mü\" soru ekini getirmelisiniz."
      },
      {
        formula: "Yardımcı Fiil + Özne + Fiil",
        example: "Did the employers solve the problem?: İşverenler problemi çözdü mü?",
        description: "Tercüme Kılavuzu: Bu yapı bir hareket veya eylem sorgusudur; cümlede yapmak, gerçekleştirmek gibi bir eylem fiili bulunur. İngilizcede can, do, does, did, has, have, will gibi yardımcı fiiller/modallar başa gelerek cümleye soru anlamı katar. Türkçeye çevirirken eyleme bağlı olarak cümlenin sonuna mutlaka \"-mı, -mi, -mu, -mü\" soru ekini getirmelisiniz."
      },
      {
        formula: "Soru Kelimesi + Fiil + Özne",
        example: "Where is the post office?: Postane nerededir?",
        description: "Tercüme Kılavuzu: Bu yapı soru kelimeleri (Who, What, Where, When, Why, How vb.) ve olmak (be) fiiliyle kurulan bir durum sorgusudur. Türkçeye çevirirken soru kelimesinin anlamına göre \"nedir, nerededir, nasıldır, ne zaman\" gibi karşılıklar cümlenin sonuna veya ilgili ögeye eklenerek soru anlamı sağlanır."
      },
      {
        formula: "Soru Kelimesi + Yardımcı Fiil + Özne + Fiil",
        example: "Where did he live last year?: Geçen yıl nerede yaşadı?",
        description: "Tercüme Kılavuzu: Bu yapı soru kelimeleri (Who, What, Where, When, Why, How vb.) ile birlikte bir eylem fiili içeren ve do, does, did, will, can gibi yardımcı fiillerle kurulan soru yapısıdır. Türkçeye çevirirken soru kelimesinin anlamı (nerede, neden, nasıl, ne zaman) cümleye eklenir ve eylem çekimlenerek soru anlamı oluşturulur."
      },
      {
        formula: "Edat + Soru Kelimesi + Yardımcı Fiil + Özne + Fiil",
        example: "For what purpose is the machine?: Makine hangi amaç içindir?",
        description: "Tercüme Kılavuzu: Bu yapı bir edat (with, for, in, at, by vb.) ile başlayan soru kelimesi gruplarının kullanıldığı soru yapısıdır. Edat ve soru kelimesi birleşerek Türkçedeki \"kiminle, hangi amaçla, nerede, ne kadar süreyle\" gibi yönelme, bulunma veya vasıta bildiren soru öbeklerini oluşturur."
      }
    ],
    subtitles: [
      "A. Fiil + Özne (Sayfa 51)",
      "B. do, does, did fiili + özne + mastar (Sayfa 52)",
      "C. Soru kelimesi + fiil + özne (Sayfa 49)",
      "D. Soru kelimesi + do, does, did + özne + mastar (Sayfa 50)",
      "E. Edat + soru kelimesi + fiil + özne (Sayfa 53)"
    ]
  },
  {
    title: "X. Edilgen (Passive) Strüktürü (Sayfa 55)",
    desc: "Edilgen çatıdaki cümle yapıları ve zamanlarla çekimleri",
    icon: "📗",
    numLessons: 4,
    formulas: [
      { formula: "Subject + Be + Past Participle (V3)", example: "Coal is obtained from the mines: Kömür madenlerden elde edilir" },
      { formula: "Subject + will be / have been + V3", example: "Access will be restricted: Erişim kısıtlanacak" },
      { formula: "Subject + Be + not + V3", example: "The project is not abandoned: Proje terk edilmemiştir" },
      { formula: "Subject + Be + V3 + by + Agent", example: "The project is abandoned by the team: Proje ekip tarafından terk edilmiştir" }
    ],
    subtitles: [
      "A. Geniş ve Geçmiş Zaman Edilgen (Sayfa 55)",
      "B. Gelecek Zaman ve Present Perfect Edilgen (Sayfa 58)",
      "C. Olumsuz Edilgen Yapılar (Sayfa 60)",
      "D. Karmaşık Edilgen Yapılar (by + Eyleyen) (Sayfa 62)"
    ]
  },
  {
    title: "XI. Edilgen (Passive) Mastarı (Sayfa 63)",
    desc: "Edilgen mastar (to be + V3) yapıları ve bölünmüş edilgen fiiller",
    icon: "🔒",
    numLessons: 6,
    formulas: [
      { 
        formula: "Modal + be + V3 (Positive Modals)", 
        example: "The project can be abandoned: Proje terk edilebilir",
        description: "Tercüme Kılavuzu: Edilgen (Passive) modal yapıları, bir eylemin yapılabilme olasılığını (can/may/might/could), zorunluluğunu (must/should/ought to) veya gelecekteki durumunu (will) bildirir. Cümle kurulurken eylemden etkilenen Nesne (Özne konumunda) + Modal + be + V3 yapısı kullanılır. Çeviri yaparken: Önce özne okunur, ardından fiilin edilgen haline modalın anlamı (edilebilir, edilmelidir, edilecek) eklenir."
      },
      { 
        formula: "Modal + not + be + V3 (Negative Modals)", 
        example: "The project cannot be abandoned: Proje terk edilemez",
        description: "Tercüme Kılavuzu: Olumsuz edilgen modal yapılarında, modal yardımcısının hemen yanına olumsuzluk eki (not) gelir: Nesne + Modal + not + be + V3. Çeviride modalın olumsuz anlamı fiilin edilgen köküne eklenir: can/could not için \"-emez / -amaz\", must/should/ought not için \"-memelidir / -mamalıdır\", will not için \"-meyecek / -mayacak\" anlamı verilir."
      },
      { 
        formula: "Modal + Subject + be + V3? (Interrogative Modals)", 
        example: "Can the project be abandoned?: Proje terk edilebilir mi?",
        description: "Tercüme Kılavuzu: Soru biçimlerinde modal cümlenin en başına (öznenin önüne) gelir: Modal + Nesne + be + V3?. Çeviride önce özne söylenir, ardından edilgen fiile modalın soru eki (edilebilir mi?, edilmeli midir?, edilecek mi?) eklenerek cümle tamamlanır."
      },
      { 
        formula: "Subject + Modal + be + V3 + by + Agent (Full Modal Passive)", 
        example: "The project can be abandoned by the team: Proje ekip tarafından terk edilebilir",
        description: "Tercüme Kılavuzu: Akademik makalelerde bu edilgen yapılarda özneler ve nesneler uzatılarak (expanded) ve cümlenin sonuna eyleyen (by + Agent) eklenerek kullanılır. Çeviri adımları: 1. Cümlenin başındaki uzun sıfat tamlamasını (özne) bulun. 2. Cümlenin sonundaki 'by/from' öbeğini (tarafından/kaynağından) araya ekleyin. 3. Yüklemi edilgen modal yapısına göre çevirerek cümleyi tamamlayın."
      },
      {
        formula: "Subject + Be + Adverb + V3 (Split Passive)",
        example: "The project is temporarily abandoned: Proje geçici olarak terk edilir",
        description: "Çeviri Stratejisi: Yardımcı fiil ile fiilin 3. hali arasına giren ve genellikle \"-ly\" ile biten kelimeyi cımbızla çekin. Türkçeye çevirirken bu zarfı, edilgen Türkçe yüklemin hemen soluna (önüne) yerleştirerek anlamlandırın (Örn: is temporarily abandoned / geçici olarak terk edilir)."
      },
      {
        formula: "Subject + Be + Adverb + V3 + by + Agent (Split Full Passive)",
        example: "The project was temporarily abandoned by the team: Proje ekip tarafından geçici olarak terk edildi",
        description: "Çeviri Stratejisi: Cümlenin merkezindeki bölünmüş fiil grubunu bulun ve zarfın işlevini saptayın. Genişletilmiş nesneyi Türkçe cümle başı (özne) yapın, by öbeğini getirin, araya giren zarfı Türkçe fiilin hemen soluna ekleyip edilgen yüklemle cümleyi sonlandırın."
      }
    ],
    subtitles: [
      "A. Modal Tabanlı Yalın Edilgen Örnekler (Positive Modals)",
      "B. Modal Tabanlı Yalın Edilgenlerin Olumsuzları (Negative Modals)",
      "C. Modal Tabanlı Yalın Edilgenlerin Soru Biçimleri (Interrogative Modals)",
      "D. Modal Tabanlı Tam Genişletilmiş Edilgen Örnekler (Full Modal Passive)",
      "E. Arasına Zarf Girmiş Yalın Edilgen Örnekler (Split Passive)",
      "F. Arasına Zarf Girmiş Tam Genişletilmiş Örnekler (Split Full Passive)"
    ]
  },
  {
    title: "XII. Participle Takımları (Sayfa 88)",
    desc: "Present ve past participle takımları ile niteleme",
    icon: "🌈",
    numLessons: 3,
    formulas: [
      { formula: "Noun + present participle + Prep Phrase", example: "The student studying in the library: Kütüphanede çalışan öğrenci" },
      { formula: "Noun + present participle + Object", example: "The policy affecting the economy: Ekonomiyi etkileyen politika" },
      { formula: "Noun + past participle + Prep Phrase", example: "The data obtained from the experiment: Deneyden elde edilen veri" }
    ],
    subtitles: [
      "A. İsim + present participle + edat takımı (Sayfa 88)",
      "B. İsim + present participle + nesne (isim) (Sayfa 88)",
      "C. İsim + past participle + edat takımı (Sayfa 90)"
    ]
  },
  {
    title: "XIII. Mastar (Infinitive) (Sayfa 95)",
    desc: "Mastar (infinitive) yapıları ve eylemsiler",
    icon: "⛵",
    numLessons: 2,
    formulas: [
      { formula: "Verb + Infinitive (to V)", example: "They want to start the project: Projeye başlamak istiyorlar" },
      { formula: "Verb + Object + Infinitive (to V)", example: "They want the student to start the project: Öğrencinin projeye başlamasını istiyorlar" }
    ],
    subtitles: [
      "A. Fiil + mastar (Sayfa 98)",
      "B. Fiil + mastar + nesnesi (Sayfa 98 / 100)"
    ]
  },
  {
    title: "XIV. Strüktürel \"It\" Cümlesinin Öznesi (Sayfa 103)",
    desc: "Strüktürel It cümlesinin öznesi ve sıfat/mastar yapıları",
    icon: "🎈",
    numLessons: 2,
    formulas: [
      { formula: "It is + Adjective + Infinitive (to V)", example: "It is important to understand the problem: Problemi anlamak önemlidir" },
      { formula: "It is + Adjective + for Object + Infinitive (to V)", example: "It is important for the student to understand: Öğrencinin anlaması önemlidir" }
    ],
    subtitles: [
      "A. It + olmak + sıfat + mastar (Sayfa 103)",
      "B. It + olmak + sıfat + mastar + nesnesi (Sayfa 105)"
    ]
  },
  {
    title: "XV. Maksat ve Amac Yapıları (Sayfa 107)",
    desc: "Maksat ve amaç bildiren mastar (infinitive of purpose) yapıları",
    icon: "🎯",
    numLessons: 2,
    formulas: [
      { formula: "Subject + Verb + to + Verb (Infinitive of Purpose)", example: "We perform experiments to obtain data: Veri elde etmek için deneyler yaparız" },
      { formula: "In order for / So as for + Object + to V", example: "They heated the liquid in order for the reaction to start: Tepkimenin başlaması için sıvıyı ısıttılar" }
    ],
    subtitles: [
      "A. Maksat için kullanılan mastar (Sayfa 107)",
      "B. Maksat için kullanılan mastarın nesnesi (Sayfa 110)"
    ]
  },
  {
    title: "XVI. Fiil İsmi (Gerund) + Nesnesi (Özne Olarak) (Sayfa 112)",
    desc: "Fiil isminin (gerund) cümle öznesi olarak kullanımı",
    icon: "🧠",
    numLessons: 1,
    formulas: [
      { 
        formula: "V-ing + Object (Gerund as Subject)", 
        example: "Understanding the problem is crucial: Problemi anlamak çok önemlidir",
        description: "Tercüme Kılavuzu: Bu yapı bir eylem-isim (Gerund) öbeğinin nesne alarak cümlenin öznesi olması durumudur. Cümle, fiile eklenen -ing takısı ile başlar fakat bu durum bir şimdiki zaman eylemi ('yapıyor', 'içiyor') değil, bir isim-fiildir. Çeviri yaparken önce sağdaki nesne okunur, ardından -ing takısı almış kelimeye '-ma, -me' veya '-mak, -mek' eki getirilerek özne grubu tek bir blok halinde toparlanır (Örn: Verileri analiz etmek...). Bu öbek cümlenin öznesi olduğu için, Türkçede de cümlenin en başına yerleşir."
      }
    ],
    subtitles: [
      "A. ...ing + isim (Sayfa 112)"
    ]
  },
  {
    title: "XVII. Edattan Sonra Gelen Fiil (+ Nesnesi) (Sayfa 113)",
    desc: "Edatlardan sonra gerund ve past participle kullanımı",
    icon: "🎨",
    numLessons: 3,
    formulas: [
      { 
        formula: "Preposition (on/by/in/without) + V-ing + Object", 
        example: "By measuring the temperature, we controlled the reaction: Sıcaklığı ölçerek tepkimeyi kontrol ettik",
        description: "Tercüme Kılavuzu: Bu yapı bir Edat + Eylem-İsim (Gerund) öbeğidir. Fiile eklenen -ing takısı geçişli bir eylemi isimleştirir ve sağ tarafına doğrudan kendi nesnesini çeker. Çeviri yaparken önce sağdaki nesne okunur, ardından edatın anlamına göre öbek toparlanır: by ile \"-erek, -arak\" (yoluyla); without ile \"-meden, -madan\" (maksızın); on ile \"-ince, -ınca\" (yapar yapmaz); in ile \"-irken\" (esnasında) anlamı verilir. Bu blok cümlenin zarf tümleci olarak anlamı tamamlar."
      },
      { 
        formula: "Conjunction (when/while/before/after/since) + V-ing + Object", 
        example: "Before starting the experiment, read the instructions: Deneye başlamadan önce talimatları okuyun",
        description: "Tercüme Kılavuzu: Bu yapı, ortak özneye sahip Zaman Bağlacı + Kısalmış Zarf Cümleciği kalıbıdır. Yan cümledeki özne düşürülerek eylem -ing takısıyla nesne alan aktif bir öbeğe dönüştürülmüştür. Türkçeye çevrilirken önce sağdaki nesne okunur, ardından zaman bağlacının anlamına göre sırasıyla: when/while ile \"-irken / -dığında\"; before ile \"-meden önce\"; after ile \"-dikten sonra\"; since ile \"-diğinden beri\"; ekleri getirilerek ana cümleye bağlanır."
      },
      { 
        formula: "Conjunction (when/if/unless/although/until/as/where) + Past Participle", 
        example: "Unless modified, the design is useless: Değiştirilmedikçe tasarım işe yaramaz",
        description: "Tercüme Kılavuzu: Bu yapı, bağlaçlardan sonra gelen Edilgen (Pasif) Kısaltma kalıbıdır. Yan cümledeki ortak özne ve yardımcı fiil (be) düşürülmüş, geriye sadece fiilin 3. hali (V3) kalmıştır. Eylemin özneye yapıldığını/edildiğini bildirir. Çeviriye varsa sağdaki edat öbeğinden başlanır, bağlacın anlamına göre sırasıyla: when ile \"-ındığında\"; if ile \"-ılırsa\"; unless ile \"-ılmadıkça\"; although ile \"-ılmasına rağmen\"; until ile \"-ılana kadar\"; as ile \"-ıldığı gibi\" edilgen yapıları kurularak ana cümlenin başına yerleşir."
      }
    ],
    subtitles: [
      "A. on / by / in / without + ...ing + nesne (Sayfa 113)",
      "B. when / while / before / after / since + ...ing (+ nesnesi) (Sayfa 116 / 118)",
      "C. when / if / unless / although / until / as / where + past participle (Sayfa 120)"
    ]
  },
  {
    title: "XVIII. Soru Kelimesinden Sonra Gelen Mastar (Sayfa 124)",
    desc: "Soru kelimelerinden sonra mastar (Wh- word + to V) yapısı",
    icon: "🔑",
    numLessons: 1,
    formulas: [
      { formula: "Wh- Word + Infinitive (to V)", example: "They do not know how to solve the problem: Sorunu nasıl çözeceklerini bilmiyorlar" }
    ],
    subtitles: [
      "Soru Kelimesinden Sonra Gelen Mastar (Sayfa 124)"
    ]
  },
  {
    title: "XIX. Zarf Cümleciği (Adverbial Clause) (Sayfa 164)",
    desc: "Zaman, sebep, zıtlık, derece, amaç, sonuç ve şart anlamı katan zarf tümleçleri",
    icon: "🎻",
    numLessons: 7,
    formulas: [
      { formula: "Conjunction (when/while/since/before...) + Clause", example: "Before the reaction started, the liquid was cold: Tepkime başlamadan önce sıvı soğuktu" },
      { formula: "because / since / as + Clause", example: "Because the weather was bad, the flight was cancelled: Hava kötü olduğu için uçuş iptal edildi" },
      { formula: "although / even though / while + Clause", example: "Although the test was difficult, they passed it: Test zor olmasına rağmen onu geçtiler" },
      { formula: "so + adjective/adverb + that + Clause", example: "The weather was so hot that the plants dried up: Hava o kadar sıcaktı ki bitkiler kurudu" },
      { formula: "so that / in order that + Clause", example: "They heated the liquid so that it would boil: Kaynaması için sıvıyı ısıttılar" },
      { formula: "Clause, so / therefore / consequently + Clause", example: "The road was blocked, so we turned back: Yol kapalıydı, bu yüzden geri döndük" },
      { formula: "if / unless + Clause", example: "If you heat water, it turns into steam: Suyu ısıtırsanız buhara dönüşür" }
    ],
    subtitles: [
      "A. Zaman (Sayfa 164)",
      "B. Sebep (Sayfa 185)",
      "C. Zıtlık (Although...) (Sayfa 194 / 198)",
      "D. Derece (Sayfa 201)",
      "E. Maksat (Amaç) (Sayfa 204)",
      "F. Netice (Sonuç) (Sayfa 206)",
      "G. Şart (Koşul) (Sayfa 206)"
    ]
  },
  {
    title: "XX. Mukayese (Karşılaştırma) Strüktürleri (Sayfa 216)",
    desc: "Karşılaştırma ve üstünlük yapıları, as...as ve the same kullanımları",
    icon: "🎗️",
    numLessons: 3,
    formulas: [
      { formula: "Adjective-er + than / More + Adjective + than / The + Adjective-est", example: "Iron is heavier than wood: Demir ahşaptan daha ağırdır" },
      { formula: "Comparative Adjective + than", example: "Silver is more conductive than aluminum: Gümüş alüminyumdan daha iletkendir" },
      { formula: "as + Adjective + as / the same + Noun + as", example: "The temperature today is the same as yesterday: Bugünkü sıcaklık dünkü ile aynıdır" }
    ],
    subtitles: [
      "A. Basit (Sayfa 216)",
      "B. \"than\" (Sayfa 218)",
      "C. \"as...as\", \"the same\" (Sayfa 222)"
    ]
  },
  {
    title: "XXI. Sıfat Cümleciği (Adjectival Clause / Relative Clause) (Sayfa 224)",
    desc: "İsimleri niteleyen relative pronoun (who, which, where, whose, whom) yapıları",
    icon: "📣",
    numLessons: 7,
    formulas: [
      { formula: "Noun (person) + who + Verb", example: "The student who solved the problem got a prize: Problemi çözen öğrenci bir ödül aldı" },
      { formula: "Noun (thing) + which + Verb/Subject", example: "The book which is on the table is a dictionary: Masanın üzerindeki kitap bir sözlüktür" },
      { formula: "Noun (place) + where + Subject + Verb", example: "This is the laboratory where we do the research: Araştırmayı yaptığımız laboratuvar burasıdır" },
      { formula: "Noun (person) + whom + Subject + Verb", example: "The candidate whom they selected was very young: Seçtikleri aday çok gençti" },
      { formula: "Noun + Preposition + which/whom + Subject + Verb", example: "This is the box in which they keep the keys: Anahtarları tuttukları kutu budur" },
      { formula: "Noun + whose + Noun + Verb/Subject", example: "The student whose project won the prize is happy: Projesi ödül kazanan öğrenci mutludur" },
      { formula: "Noun + Subject + Verb (Omitted Pronoun)", example: "The book I read yesterday was very interesting: Dün okuduğum kitap çok ilginçti" }
    ],
    subtitles: [
      "a) Who (Sayfa 224)",
      "b) Which (Sayfa 227)",
      "c) Where (Sayfa 231)",
      "d) Whom (Sayfa 233)",
      "e) Edat ile başlayanlar (Sayfa 234)",
      "f) Whose (Sayfa 236)",
      "g) İşaret kelimesi olmayanlar (Sayfa 239)"
    ]
  },
  {
    title: "XXII. İsim Cümleciği (Noun Clause) (Sayfa 240)",
    desc: "Cümlede özne veya nesne görevindeki wh- soru kelimeleri, that ve whether yan cümleleri",
    icon: "🔋",
    numLessons: 4,
    formulas: [
      { formula: "What / How / Why / When / Where + Subject + Verb", example: "What he said was very important: Söylediği şey çok önemliydi" },
      { formula: "Subject + Verb + that + Subject + Verb", example: "He announced that the project was completed: Projenin tamamlandığını duyurdu" },
      { formula: "Subject + Verb + if / whether + Subject + Verb", example: "Whether they will attend the meeting is not decided: Toplantıya katılıp katılmayacakları kararlaştırılmadı" },
      { formula: "The fact that + Subject + Verb + is + Adjective", example: "The fact that the experiment failed surprised everyone: Deneyin başarısız olması gerçeği herkesi şaşırttı" }
    ],
    subtitles: [
      "a) Soru kelimesi ile başlayanlar (Sayfa 241)",
      "b) \"that\" ile başlayanlar (Sayfa 244)",
      "c) if / whether (Sayfa 247)",
      "d) the fact that (Sayfa 248)"
    ]
  },
  {
    title: "XXIII. It + to be + sıfat/past participle + that (Sayfa 251)",
    desc: "It is clear that..., It is believed that... gibi edilgen ve açıklayıcı cümle girişleri",
    icon: "🔌",
    numLessons: 1,
    formulas: [
      { formula: "It + is + Adjective / Past Participle + that + Clause", example: "It is clear that the experiment was successful: Deneyin başarılı olduğu açıktır" }
    ],
    subtitles: [
      "It + to be + sıfat/past participle + that (Sayfa 251)"
    ]
  },
  {
    title: "XXIV. It + to be + sıfat/past participle + mastar + that (Sayfa 254)",
    desc: "It is useful to know that... gibi mastar takımlı açıklayıcı ve yönlendirici yapılar",
    icon: "🛸",
    numLessons: 1,
    formulas: [
      { formula: "It + is + Adjective + to + Verb + that + Clause", example: "It is useful to remember that the earth is round: Dünyanın yuvarlak olduğunu hatırlamak faydalıdır" }
    ],
    subtitles: [
      "It + to be + sıfat/past participle + mastar + that (Sayfa 254)"
    ]
  },
  {
    title: "XXV. Neden ve Etki Strüktürleri (Sayfa 256)",
    desc: "Cümleler arası neden-sonuç bağlaçları (therefore, thus, consequently, hence) kullanımı",
    icon: "🪐",
    numLessons: 1,
    formulas: [
      { formula: "Clause; therefore / thus / consequently / hence, Clause", example: "The cost was very high, therefore they changed the design: Maliyet çok yüksekti, bu nedenle tasarımı değiştirdiler" }
    ],
    subtitles: [
      "Neden ve Etki Strüktürleri (Sayfa 256)"
    ]
  }
];

const lessonIcons = [
  // Unit 1
  "📖", "✍️", "⚡", "📝", "💎", "🔄",
  // Unit 2
  "📚", "💡", "🧠", "🎓", "🗣️", "💬",
  // Unit 3
  "🎧", "🎙️", "🎨", "🎭", "🔍", "🧭",
  // Unit 4
  "🗺️", "🏫", "🎒", "✏️", "✒️", "🖋️",
  // Unit 5
  "📋", "📂", "🗂️", "📒", "📔", "📕",
  // Unit 6
  "📗", "📘", "📙", "📓", "✉️", "📩",
  // Unit 7
  "📪", "📮", "💭", "💻", "🖥️", "🧪",
  // Unit 8
  "🧬", "🏆", "🏅", "🥇", "🥈", "🥉",
  // Unit 9
  "🎯", "🎳", "🎮", "🧩", "✈️", "🚀",
  // Unit 10
  "🚢", "🚂", "🚗", "🚲", "🚁", "⛵",
  // Unit 11
  "🗽", "🗼", "🏰", "🗻", "🏕️", "🌱",
  // Unit 12
  "🌲", "🌸", "☀️", "🌙", "⭐", "☁️",
  // Unit 13
  "🌧️", "❄️", "🌈", "🌊", "🍁", "🍀",
  // Unit 14
  "🍂", "🍎", "🍇", "🍓", "🍕", "🍔",
  // Unit 15
  "🍰", "☕", "🍵", "🥛", "🍯", "🍿",
  // Unit 16
  "🍪", "🍬", "🍨", "🍒", "🔑", "🔔",
  // Unit 17
  "🎁", "🎈", "🧸", "🔮", "🧿", "👑",
  // Unit 18
  "👓", "🏹", "🛡️", "⚙️", "🎷", "🎸",
  // Unit 19
  "🎺", "🎻", "🎬", "🎤", "🎪", "🎫",
  // Unit 20
  "🎗️", "📣", "📢", "🔋", "🔌", "🛸"
];

const unit8Lesson1SentencesRaw1 = [
  { en: "There is a test", tr: "Bir test var" },
  { en: "There is no test", tr: "Bir test yok" },
  { en: "There is a form", tr: "Bir form var" },
  { en: "There is no form", tr: "Bir form yok" },
  { en: "There is a wire", tr: "Bir tel var" },
  { en: "There is no wire", tr: "Bir tel yok" },
  { en: "There is a hope", tr: "Bir umut var" },
  { en: "There is no hope", tr: "Bir umut yok" },
  { en: "There is a type", tr: "Bir tür var" },
  { en: "There is no type", tr: "Bir tür yok" },
  { en: "There is a theory", tr: "Bir kuram var" },
  { en: "There is no theory", tr: "Bir kuram yok" },
  { en: "There is a supply", tr: "Bir arz var" },
  { en: "There is no supply", tr: "Bir arz yok" },
  { en: "There is a profit", tr: "Bir kâr var" },
  { en: "There is no profit", tr: "Bir kâr yok" },
  { en: "There is a source", tr: "Bir kaynak var" },
  { en: "There is no source", tr: "Bir kaynak yok" },
  { en: "There is a solution", tr: "Bir çözüm var" },
  { en: "There is no solution", tr: "Bir çözüm yok" },
  { en: "There is a summary", tr: "Bir özet var" },
  { en: "There is no summary", tr: "Bir özet yok" },
  { en: "There is a vibration", tr: "Bir titreşim var" },
  { en: "There is no vibration", tr: "Bir titreşim yok" },
  { en: "There is a statement", tr: "Bir ifade var" },
  { en: "There is no statement", tr: "Bir ifade yok" },
  { en: "There is a condition", tr: "Bir koşul var" },
  { en: "There is no condition", tr: "Bir koşul yok" },
  { en: "There is a tendency", tr: "Bir eğilim var" },
  { en: "There is no tendency", tr: "Bir eğilim yok" },
  { en: "There is an examination", tr: "Bir sınav var" },
  { en: "There is no examination", tr: "Bir sınav yok" },
  { en: "There is a possibility", tr: "Bir olasılık var" },
  { en: "There is no possibility", tr: "Bir olasılık yok" },
  { en: "There is a translation", tr: "Bir çeviri var" },
  { en: "There is no translation", tr: "Bir çeviri yok" },
  { en: "There is a temperature", tr: "Bir sıcaklık var" },
  { en: "There is no temperature", tr: "Bir sıcaklık yok" },
  { en: "There is a similarity", tr: "Bir benzerlik var" },
  { en: "There is no similarity", tr: "Bir benzerlik yok" },
  { en: "There is an improvement", tr: "Bir iyileşme var" },
  { en: "There is no improvement", tr: "Bir iyileşme yok" },
  { en: "There is a suggestion", tr: "Bir öneri var" },
  { en: "There is no suggestion", tr: "Bir öneri yok" }
];

const unit8Lesson1SentencesRaw2 = [
  { en: "There will be a short test", tr: "Kısa bir test olacak" },
  { en: "There must be a thin wire", tr: "İnce bir tel olmalıdır" },
  { en: "There will be a long examination", tr: "Uzun bir sınav olacak" },
  { en: "There may be no new form", tr: "Yeni bir form olmayabilir" },
  { en: "There might be a faint hope", tr: "Zayıf bir umut olabilir" },
  { en: "There must be a short summary", tr: "Kısa bir özet olmalıdır" },
  { en: "There will be a new source", tr: "Yeni bir kaynak olacak" },
  { en: "There will be no large profit", tr: "Büyük bir kâr olmayacak" },
  { en: "There may be some disadvantages", tr: "Bazı dezavantajlar olabilir" },
  { en: "There will be some advantages", tr: "Bazı avantajlar olacak" },
  { en: "There will be some successes", tr: "Bazı başarılar olacak" },
  { en: "There could be some failures", tr: "Bazı başarısızlıklar olabilirdi" },
  { en: "There have been some influences", tr: "Bazı etkiler olmuştur" },
  { en: "There may be large supplies", tr: "Büyük tedarikler olabilir" },
  { en: "There must be some reforms", tr: "Bazı reformlar olmalıdır" }
];

const unit8Lesson1SentencesRaw3 = [
  { en: "There may not be any heavy rainfall", tr: "Hiç şiddetli yağış olmayabilir" },
  { en: "There may not be any agricultural reform", tr: "Hiç tarım reformu olmayabilir" },
  { en: "There have not been any similar stages", tr: "Hiç benzer aşama olmamıştır" },
  { en: "There have not been any common species", tr: "Hiç ortak tür olmamıştır" },
  { en: "There must be some effective precautions", tr: "Bazı etkili önlemler olmalıdır" },
  { en: "There may not be any intensive agriculture", tr: "Hiç yoğun tarım olmayabilir" },
  { en: "There ought not to be any rapid erosion", tr: "Hiç hızlı erozyon olmamalıdır" },
  { en: "There will not be any profitable agriculture", tr: "Hiç kârlı tarım olmayacak" },
  { en: "There must not be any similar neglect", tr: "Hiç benzer ihmal olmamalıdır" },
  { en: "There could not be any effective precautions", tr: "Hiç etkili önlem olamazdı" },
  { en: "There must not be any unequal responsibilities", tr: "Hiç eşit olmayan sorumluluk olmamalıdır" },
  { en: "There should not be any great disadvantages", tr: "Hiç büyük dezavantaj olmamalıdır" },
  { en: "There may be a slight tendency towards improvement soon", tr: "Yakında iyileşmeye doğru hafif bir eğilim olabilir" },
  { en: "There will not be any further nationalisation", tr: "Daha fazla kamulaştırma olmayacak" },
  { en: "There has not been any concept of data distortion", tr: "Hiçbir veri bozulması kavramı olmamıştır" }
];

const unit8Lesson1SentencesRaw4 = [
  { en: "There can be no reason for failure", tr: "Başarısızlık için hiçbir sebep olamaz" },
  { en: "There must be an easy solution to this problem", tr: "Bu sorunun kolay bir çözümü olmalı" },
  { en: "There may be no easy solution to this problem", tr: "Bu sorunun kolay bir çözümü olmayabilir" },
  { en: "There have been no new theories in this field", tr: "Bu alanda yeni hiçbir teori olmadı" },
  { en: "There has been no decision at the meeting so far", tr: "Şimdiye kadar toplantıda hiçbir karar alınmadı" },
  { en: "There can be an improvement in the quality of the fruit", tr: "Meyvenin kalitesinde bir iyileşme olabilir" },
  { en: "There has been a serious flying accident near the airport", tr: "Havalimanının yakınında ciddi bir uçuş kazası oldu" },
  { en: "There has been no formal justification for the budget cuts", tr: "Bütçe kesintileri için resmi hiçbir gerekçe olmadı" },
  { en: "There must be a precise definition for every core concept", tr: "Her temel kavram için kesin bir tanım olmalıdır" },
  { en: "There will be no automatic extension of the existing contract", tr: "Mevcut sözleşmenin otomatik bir uzatılması olmayacak" },
  { en: "There has been no clear resolution to the ongoing conflict", tr: "Devam eden çatışmaya net bir çözüm olmadı" },
  { en: "There has been a very heavy rainfall in these areas", tr: "Bu bölgelerde çok şiddetli yağış oldu" },
  { en: "There can be no possibility of improvement before next year", tr: "Gelecek yıldan önce bir iyileşme olasılığı olamaz" },
  { en: "There has been no tendency towards improvement in recent years", tr: "Son yıllarda iyileşmeye yönelik hiçbir eğilim olmadı" },
  { en: "There can be no resemblance between the two cases", tr: "İki vaka arasında hiçbir benzerlik olamaz" }
];

const unit8Lesson1SentencesRaw5 = [
  { en: "There must be a filter at the top of this machine", tr: "Bu makinenin üstünde bir filtre olmalıdır" },
  { en: "There must be no filter in this part of the machine", tr: "Makinenin bu kısmında hiçbir filtre olmamalıdır" },
  { en: "There could be a faint hope of improvement soon", tr: "Yakında hafif bir iyileşme umudu olabilirdi" },
  { en: "There could be no evidence of guilt in the circumstances", tr: "Koşullarda hiçbir suçluluk kanıtı olamazdı" },
  { en: "There may be no protection from fire in the laboratory", tr: "Laboratuvarda yangından hiçbir korunma olmayabilir" },
  { en: "There has been no absorption of the light rays so far", tr: "Şimdiye kadar ışık ışınlarının hiçbir emilimi olmadı" },
  { en: "There can be no comparison between these two actions", tr: "Bu iki eylem arasında hiçbir karşılaştırma olamaz" },
  { en: "There can be no resemblance between the two types of plant", tr: "İki bitki türü arasında hiçbir benzerlik olamaz" },
  { en: "There may be no direct relevance between these two issues", tr: "Bu iki konu arasında doğrudan hiçbir ilişki olmayabilir" },
  { en: "There can be no stable growth without financial investment", tr: "Finansal yatırım olmadan istikrarlı bir büyüme olamaz" },
  { en: "There could be no better framework for this specific research", tr: "Bu özel araştırma için daha iyi bir çerçeve olamazdı" },
  { en: "There must be no possibility of failure in this matter", tr: "Bu hususta hiçbir başarısızlık olasılığı olmamalıdır" },
  { en: "There can be no doubt of an improvement in the quality of the fruit", tr: "Meyvenin kalitesinde bir iyileşme olduğundan hiçbir şüphe duyulamaz" },
  { en: "There has been no significant alteration in the research methodology", tr: "Araştırma metodolojisinde önemli hiçbir değişiklik olmadı" },
  { en: "There must be no discrimination based on gender or ethnicity", tr: "Cinsiyete veya etnik kökene dayalı hiçbir ayrımcılık olmamalıdır" }
];

const unit8Lesson1SentencesRaw6 = [
  { en: "There must be an immediate assessment of the structural damage", tr: "Yapısal hasarın derhal bir değerlendirmesi yapılmalıdır" },
  { en: "There must be a sustainable source of funding for the project", tr: "Proje için sürdürülebilir bir finansman kaynağı olmalıdır" },
  { en: "There ought to be a reliable mechanism to monitor the emissions", tr: "Emisyonları izlemek için güvenilir bir mekanizma olmalıdır" },
  { en: "There must have been some inconsistencies in the analyzed samples", tr: "Analiz edilen örneklerde bazı tutarsızlıklar olmuş olmalı" },
  { en: "There must have been a major recession in the domestic economy", tr: "Yurtiçi ekonomide büyük bir durgunluk olmuş olmalı" },
  { en: "There will be a short test in Geology this afternoon", tr: "Bu öğleden sonra Jeoloji dersinde kısa bir test olacak" },
  { en: "There may be a faint possibility of improvement next year", tr: "Gelecek yıl hafif bir iyileşme olasılığı olabilir" },
  { en: "There will be a good translation of this work in the library", tr: "Kütüphanede bu çalışmanın iyi bir çevirisi olacak" },
  { en: "There will be no wheat from this area until the year after next", tr: "Gelecek yıldan sonraki yıla kadar bu bölgeden hiçbir buğday olmayacak" },
  { en: "There will be no further excavations in this area until next year", tr: "Gelecek yıla kadar bu alanda daha fazla kazı olmayacak" },
  { en: "There may be no new works of art at the exhibition tomorrow", tr: "Yarın sergide yeni sanat eserleri olmayabilir" },
  { en: "There has been a noticeable shift in public policy regarding welfare", tr: "Refah konusundaki kamu politikasında gözle görülür bir değişim oldu" },
  { en: "There have been numerous occurrences of data distortion in the past", tr: "Geçmişte çok sayıda veri bozulması vakası meydana geldi" },
  { en: "There must have been a systematic error in the initial compilation", tr: "İlk derlemede sistematik bir hata olmuş olmalı" },
  { en: "There might not be an available substitute for this chemical component", tr: "Bu kimyasal bileşen için mevcut bir alternatif olmayabilir" }
];

const unit8Lesson1SentencesRaw7 = [
  { en: "There must be a high degree of accuracy in the statistical estimation", tr: "İstatistiksel tahminde yüksek derecede doğruluk olmalıdır" },
  { en: "There has not been any formal registration for the conference yet", tr: "Konferans için henüz resmi bir kayıt olmadı" },
  { en: "There should be more focus on the welfare of the individuals", tr: "Bireylerin refahına daha fazla odaklanılmalıdır" },
  { en: "There may be a new form of power within the next few years", tr: "Gelecek birkaç yıl içinde yeni bir güç biçimi olabilir" },
  { en: "There could be a high temperature at a later stage of the disease", tr: "Hastalığın daha sonraki bir aşamasında yüksek ateş olabilirdi" },
  { en: "There could be a slight similarity between the different types of plant", tr: "Farklı bitki türleri arasında hafif bir benzerlik olabilirdi" },
  { en: "There might be a possibility of improvement in the wheat crop next year", tr: "Gelecek yıl buğday mahsulünde bir iyileşme olasılığı olabilir" },
  { en: "There may be a slight tendency towards improvement at a later stage", tr: "Daha sonraki bir aşamada iyileşmeye yönelik hafif bir eğilim olabilir" },
  { en: "There may be a slight resemblance between the two types of plant", tr: "İki bitki türü arasında hafif bir benzerlik olabilir" },
  { en: "There should be some beautiful works of art at the exhibition tomorrow", tr: "Yarın sergide bazı güzel sanat eserleri olmalıdır" },
  { en: "There has been no serious flying accident in the last ten years", tr: "Son on yılda ciddi hiçbir uçuş kazası olmadı" },
  { en: "There has been a steady evolution in the structure of the organization", tr: "Organizasyonun yapısında istikrarlı bir gelişim oldu" },
  { en: "There have been several contradictions in the witness testimonies", tr: "Tanık ifadelerinde birkaç çelişki oldu" },
  { en: "There has not been enough evidence to support this specific hypothesis", tr: "Bu özel hipotezi desteklemek için yeterli kanıt olmadı" },
  { en: "There has not been a clear indicator of economic stability this quarter", tr: "Bu çeyrekte ekonomik istikrarın net bir göstergesi olmadı" }
];

const unit8Lesson1SentencesRaw8 = [
  { en: "There must not be any unverified variables in the final equation", tr: "Nihai denklemde doğrulanmamış hiçbir değişken olmamalıdır" },
  { en: "There must not be any external interference during the investigation", tr: "Soruşturma sırasında hiçbir dış müdahale olmamalıdır" },
  { en: "There ought to be more flexibility in the working hours of the staff", tr: "Personelin çalışma saatlerinde daha fazla esneklik olmalıdır" },
  { en: "There ought to be an explicit acknowledgement of the authors' contributions", tr: "Yazarların katkılarının açık bir şekilde belirtilmesi gerekir" },
  { en: "There should not be any significant error in the data processing phase", tr: "Veri işleme aşamasında önemli hiçbir hata olmamalıdır" },
  { en: "There must not have been sufficient integration between the systems", tr: "Sistemler arasında yeterli entegrasyon olmamış olmalı" },
  { en: "There could not have been a more appropriate method for this study", tr: "Bu çalışma için daha uygun bir yöntem olamazdı" },
  { en: "There could have been no coincidence in those identical results", tr: "Bu özdeş sonuçlarda hiçbir tesadüf olamazdı" },
  { en: "There could have been an ethical implication in that procedure", tr: "Bu prosedürde etik bir ima olabilirdi" },
  { en: "There will be a special session dedicated to the theory of relativity", tr: "Görelilik teorisine adanmış özel bir oturum olacak" },
  { en: "There must have been an unpredicted fluctuation in the market prices", tr: "Piyasa fiyatlarında öngörülemeyen bir dalgalanma olmuş olmalı" },
  { en: "There will be a new source of raw material in the next 10 years", tr: "Gelecek 10 yıl içinde yeni bir hammadde kaynağı olacak" },
  { en: "There has been no contact with the members for more than two months", tr: "Üyelerle iki aydan fazla süredir hiçbir temas olmadı" },
  { en: "There will be more excavation in this area in the next two years", tr: "Gelecek iki yıl içinde bu alanda daha fazla kazı yapılacak" },
  { en: "There were many gold and silver objects in the exhibition of art", tr: "Sanat sergisinde birçok altın ve gümüş nesne vardı" }
];

const unit8Lesson1SentencesRaw9 = [
  { en: "There could have been no new sources of information on this subject", tr: "Bu konuda yeni hiçbir bilgi kaynağı olamazdı" },
  { en: "There must have been a temporary breakdown in institutional communication", tr: "Kurumsal iletişimde geçici bir kesinti olmuş olmalı" },
  { en: "There could have been a different outcome if the criteria were modified", tr: "Kriterler değiştirilseydi farklı bir sonuç olabilirdi" },
  { en: "There could not have been a total collapse without structural flaws", tr: "Yapısal kusurlar olmadan tam bir çöküş olamazdı" },
  { en: "There will be many new sources of information on this subject in this book", tr: "Bu kitapta bu konuda birçok yeni bilgi kaynağı olacak" },
  { en: "There must have been an administrative oversight during the selection process", tr: "Seçim sürecinde idari bir hata olmuş olmalı" },
  { en: "There must have been a difference between the results of the two experiments", tr: "İki deneyin sonuçları arasında bir fark olmuş olmalı" },
  { en: "There should have been a better translation of that work in the library", tr: "Kütüphanede o çalışmanın daha iyi bir çevirisi olmalıydı" },
  { en: "There can be no large supply of raw materials for export from these areas", tr: "Bu bölgelerden ihracat için büyük miktarda hammadde tedariki olamaz" }
];

const unit8Lesson1Exercises = {
  exercises: [
    {
      id: "u8l1ex1",
      title: "Alıştırma 1: Temel \"There\" Yapıları (Basit Cümleler)",
      description: "Eşleştirme, Çoktan Seçmeli ve Çeviri",
      questions: buildCustomExerciseQuestions(unit8Lesson1SentencesRaw1, 8, 21, 1)
    },
    {
      id: "u8l1ex2",
      title: "Alıştırma 2: Zamanlar ve Modal Fiiller",
      description: "Çoktan Seçmeli, Kelime Bankası ve Çeviri",
      questions: build15Questions(unit8Lesson1SentencesRaw2, 8, 21, 2)
    },
    {
      id: "u8l1ex3",
      title: "Alıştırma 3: Orta Seviye Varyasyonlar",
      description: "Eşleştirme, Çoktan Seçmeli ve Kelime Bankası",
      questions: build15Questions(unit8Lesson1SentencesRaw3, 8, 21, 3)
    },
    {
      id: "u8l1ex4",
      title: "Alıştırma 4: İleri Seviye Cümleler I",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası",
      questions: buildDynamicQuestions(unit8Lesson1SentencesRaw4, 8, 21, 4)
    },
    {
      id: "u8l1ex5",
      title: "Alıştırma 5: İleri Seviye Cümleler II",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası",
      questions: buildDynamicQuestions(unit8Lesson1SentencesRaw5, 8, 21, 5)
    }
  ]
};

const unit8Lesson2Exercises = {
  exercises: [
    {
      id: "u8l2ex1",
      title: "Alıştırma 1: İleri Seviye Cümleler III",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası",
      questions: buildDynamicQuestions(unit8Lesson1SentencesRaw6, 8, 22, 1)
    },
    {
      id: "u8l2ex2",
      title: "Alıştırma 2: İleri Seviye Cümleler IV",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası",
      questions: buildDynamicQuestions(unit8Lesson1SentencesRaw7, 8, 22, 2)
    },
    {
      id: "u8l2ex3",
      title: "Alıştırma 3: Karmaşık Durumsal Cümleler I",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası",
      questions: buildDynamicQuestions(unit8Lesson1SentencesRaw8, 8, 22, 3)
    },
    {
      id: "u8l2ex4",
      title: "Alıştırma 4: Karmaşık Durumsal Cümleler II",
      description: "Eşleştirme, Çoktan Seçmeli, Çeviri ve Kelime Bankası",
      questions: buildDynamicQuestions(unit8Lesson1SentencesRaw9, 8, 22, 4)
    }
  ]
};

const unit2Lesson1SentencesRaw1 = [
  { en: "We describe this method in the next chapter", tr: "Bu yöntemi gelecek bölümde tanımlıyoruz" },
  { en: "We show these data on this page", tr: "Bu verileri bu sayfada gösteriyoruz" },
  { en: "We employ this concept for this research", tr: "Bu kavramı bu araştırma için kullanıyoruz" },
  { en: "We solved that issue in two weeks", tr: "O sorunu iki haftada çözdük" },
  { en: "We analyze the structure in this section", tr: "Bu bölümdeki yapıyı analiz ediyoruz" },
  { en: "We created the policy for this institution", tr: "Bu kurum için politikayı oluşturduk" },
  { en: "We tested this theory in the first period", tr: "Bu teoriyi birinci dönemde test ettik" },
  { en: "We evaluate the results in the final summary", tr: "Sonuçları nihai özetle değerlendiriyoruz" },
  { en: "We need this formula for the next process", tr: "Gelecek süreç için bu formüle ihtiyacımız var" },
  { en: "We find the criteria on the main site", tr: "Kriterleri ana sitede buluyoruz" },
  { en: "We defined that role in this project", tr: "Bu projedeki o rolü tanımladık" },
  { en: "We read this text for this assignment", tr: "Bu ödev için bu metni okuduk" },
  { en: "We change the variables in the second phase", tr: "İkinci aşamada değişkenleri değiştiriyoruz" },
  { en: "We use this framework for the new strategy", tr: "Yeni strateji için bu çerçeveyi kullanıyoruz" },
  { en: "We present this data in the main report", tr: "Bu verileri ana raporda sunuyoruz" }
];

const unit2Lesson1SentencesRaw2 = [
  { en: "We apply this formula in the third calculation", tr: "Bu formülü üçüncü hesaplamada uyguluyoruz" },
  { en: "We verify the parameters in the laboratory", tr: "Parametreleri laboratuvarda doğruluyoruz" },
  { en: "We compare the results with the previous study", tr: "Sonuçları önceki çalışmayla karşılaştırıyoruz" },
  { en: "We develop this framework for the target application", tr: "Hedef uygulama için bu çerçeveyi geliştiriyoruz" },
  { en: "We modify the structure in the second version", tr: "İkinci versiyonda yapıyı değiştiriyoruz" },
  { en: "We assess the risk in the initial phase", tr: "İlk aşamada riski değerlendiriyoruz" },
  { en: "We define the scope in the first section", tr: "Kapsamı birinci bölümde tanımlıyoruz" },
  { en: "We test the hypothesis in this experiment", tr: "Bu deneyde hipotezi test ediyoruz" },
  { en: "We examine the evidence in the case file", tr: "Dava dosyasındaki delilleri inceliyoruz" },
  { en: "We identify the problem in the summary page", tr: "Sorunu özet sayfasında belirliyoruz" },
  { en: "We report the details in the appendix section", tr: "Detayları ek bölümünde bildiriyoruz" },
  { en: "We measure the temperature at regular intervals", tr: "Sıcaklığı düzenli aralıklarla ölçüyoruz" },
  { en: "We update the database on a daily basis", tr: "Veritabanını günlük olarak güncelliyoruz" },
  { en: "We select the candidates for the final interview", tr: "Nihai mülakat için adayları seçiyoruz" },
  { en: "We reject the proposal after the first review", tr: "Teklifi ilk incelemeden sonra reddediyoruz" }
];

const unit2Lesson1SentencesRaw3 = [
  { en: "We collect the feedback from the participants", tr: "Katılımcılardan geri bildirim topluyoruz" },
  { en: "We explain the procedure in the instruction manual", tr: "Prosedürü kullanım kılavuzunda açıklıyoruz" },
  { en: "We publish the findings in an academic journal", tr: "Bulguları akademik bir dergide yayınlıyoruz" },
  { en: "We investigate the causes in the safety report", tr: "Güvenlik raporundaki nedenleri araştırıyoruz" },
  { en: "We monitor the emissions in the industrial zone", tr: "Sanayi bölgesindeki emisyonları izliyoruz" },
  { en: "We adjust the settings for the best performance", tr: "En iyi performans için ayarları düzenliyoruz" },
  { en: "We verify the signature on the contract document", tr: "Sözleşme belgesindeki imzayı doğruluyoruz" },
  { en: "We confirm the appointment for the next Tuesday", tr: "Gelecek Salı için randevuyu onaylıyoruz" },
  { en: "We design the layout for the mobile application", tr: "Mobil uygulama için düzeni tasarlıyoruz" },
  { en: "We establish the criteria for the selection process", tr: "Seçim süreci için kriterleri belirliyoruz" },
  { en: "We implement the changes in the software update", tr: "Değişiklikleri yazılım güncellemesinde uyguluyoruz" },
  { en: "We support the decision with strong evidence", tr: "Kararı güçlü kanıtlarla destekliyoruz" },
  { en: "We observe the reaction under a microscope", tr: "Tepkimeyi mikroskop altında gözlemliyoruz" },
  { en: "We resolve the dispute in a friendly manner", tr: "Anlaşmazlığı dostane bir şekilde çözüyoruz" },
  { en: "We maintain the equipment on a monthly schedule", tr: "Ekipmanın bakımını aylık bir programla yapıyoruz" }
];

const unit2Lesson1SentencesRaw4 = [
  { en: "We document the process in the project folder", tr: "Süreci proje klasöründe belgeliyoruz" },
  { en: "We transfer the files to the secure server", tr: "Dosyaları güvenli sunucuya aktarıyoruz" },
  { en: "We analyze the content of the document", tr: "Belgenin içeriğini analiz ediyoruz" },
  { en: "We create a copy of the main database", tr: "Ana veritabanının bir kopyasını oluşturuyoruz" },
  { en: "We evaluate the performance of the system", tr: "Sistemin performansını değerlendiriyoruz" },
  { en: "We define the parameters of the simulation", tr: "Simülasyonun parametrelerini tanımlıyoruz" },
  { en: "We check the status of the network connection", tr: "Ağ bağlantısının durumunu kontrol ediyoruz" },
  { en: "We test the quality of the raw materials", tr: "Hammaddelerin kalitesini test ediyoruz" },
  { en: "We change the configuration of the router", tr: "Yönlendiricinin konfigürasyonunu değiştiriyoruz" },
  { en: "We read the instructions on the package", tr: "Paketin üzerindeki talimatları okuyoruz" },
  { en: "We describe the scenario in the first paragraph", tr: "Senaryoyu birinci paragrafta tanımlıyoruz" },
  { en: "We show the progress on the dashboard page", tr: "İlerlemeyi kontrol paneli sayfasında gösteriyoruz" },
  { en: "We need a solution for this error message", tr: "Bu hata mesajı için bir çözüme ihtiyacımız var" },
  { en: "We find the coordinates on the map image", tr: "Harita görselindeki koordinatları buluyoruz" },
  { en: "We use this application for data collection", tr: "Bu uygulamayı veri toplama için kullanıyoruz" }
];

const unit2Lesson1SentencesRaw5 = [
  { en: "We examine the characteristics of the samples", tr: "Örneklerin özelliklerini inceliyoruz" },
  { en: "We identify the limitations of the current study", tr: "Mevcut çalışmanın sınırlılıklarını belirliyoruz" },
  { en: "We report the progress to the project board", tr: "İlerlemeyi proje kuruluna rapor ediyoruz" },
  { en: "We monitor the temperature of the water tank", tr: "Su tankının sıcaklığını izliyoruz" },
  { en: "We update the profiles of the users", tr: "Kullanıcıların profillerini güncelliyoruz" },
  { en: "We select the best option from the list", tr: "Listedeki en iyi seçeneği seçiyoruz" },
  { en: "We compare the performance of both models", tr: "Her iki modelin performansını karşılaştırıyoruz" },
  { en: "We develop a strategy for the marketing campaign", tr: "Pazarlama kampanyası için bir strateji geliştiriyoruz" },
  { en: "We assess the impact of the new regulations", tr: "Yeni düzenlemelerin etkisini değerlendiriyoruz" },
  { en: "We test the functionality of the prototype", tr: "Prototipin işlevselliğini test ediyoruz" },
  { en: "We examine the effects of the treatment", tr: "Tedavinin etkilerini inceliyoruz" },
  { en: "We identify the source of the leak", tr: "Sızıntının kaynağını belirliyoruz" },
  { en: "We compare the results of the two groups", tr: "İki grubun sonuçlarını karşılaştırıyoruz" },
  { en: "We analyze the behavior of the participants", tr: "Katılımcıların davranışlarını analiz ediyoruz" },
  { en: "We evaluate the effectiveness of the training", tr: "Eğitimin etkililiğini değerlendiriyoruz" }
];

const unit2Lesson1Exercises = {
  exercises: [
    {
      id: "u2l1ex1",
      title: "Alıştırma 1: Fiil + Edat Takımı Giriş",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (1-15)",
      questions: build15Questions(unit2Lesson1SentencesRaw1, 2, 8, 1)
    },
    {
      id: "u2l1ex2",
      title: "Alıştırma 2: Temel Cümleler",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (16-30)",
      questions: build15Questions(unit2Lesson1SentencesRaw2, 2, 8, 2)
    },
    {
      id: "u2l1ex3",
      title: "Alıştırma 3: Orta Seviye Cümleler",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (31-45)",
      questions: build15Questions(unit2Lesson1SentencesRaw3, 2, 8, 3)
    },
    {
      id: "u2l1ex4",
      title: "Alıştırma 4: İleri Seviye Cümleler I",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (46-60)",
      questions: build15Questions(unit2Lesson1SentencesRaw4, 2, 8, 4)
    },
    {
      id: "u2l1ex5",
      title: "Alıştırma 5: İleri Seviye Cümleler II",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (61-75)",
      questions: build15Questions(unit2Lesson1SentencesRaw5, 2, 8, 5)
    }
  ]
};

const unit2Lesson2SentencesRaw1 = [
  { en: "before the analysis of the data", tr: "verinin analizinden önce" },
  { en: "in the interpretation of the results", tr: "sonuçların yorumlanmasında" },
  { en: "during the assessment of the impact", tr: "etkinin değerlendirilmesi sırasında" },
  { en: "according to the structure of the institution", tr: "kurumun yapısına göre" },
  { en: "because of the distribution of the resources", tr: "kaynakların dağılımı nedeniyle" },
  { en: "after the evaluation of the method", tr: "yöntemin değerlendirilmesinden sonra" },
  { en: "in the context of the research", tr: "araştırmanın bağlamında" },
  { en: "under the regulation of the authority", tr: "otoritenin düzenlemesi altında" },
  { en: "during the transition of the economy", tr: "ekonominin geçişi sırasında" },
  { en: "before the implementation of the policy", tr: "politikanın uygulanmasından önce" },
  { en: "according to the definition of the concept", tr: "kavramın tanımına göre" },
  { en: "after the identification of the factor", tr: "faktörün belirlenmesinden sonra" },
  { en: "in the absence of the evidence", tr: "kanıtın yokluğunda" },
  { en: "during the formulation of the theory", tr: "teorinin formüle edilmesi sırasında" },
  { en: "because of the complexity of the system", tr: "sistemin karmaşıklığı nedeniyle" }
];

const unit2Lesson2SentencesRaw2 = [
  { en: "under the authority of the administration", tr: "yönetimin yetkisi altında" },
  { en: "in the selection of the variable", tr: "değişkenin seçiminde" },
  { en: "after the completion of the assignment", tr: "ödevin tamamlanmasından sonra" },
  { en: "before the acquisition of the funding", tr: "finansmanın sağlanmasından önce" },
  { en: "according to the principle of the logic", tr: "mantığın ilkesine göre" },
  { en: "in this framework of thought", tr: "bu düşünce çerçevesinde" },
  { en: "during a study of the variation", tr: "değişimin incelenmesi sırasında" },
  { en: "because of the source of the error", tr: "hatanın kaynağı nedeniyle" },
  { en: "before the shift of the category", tr: "kategori değişiminden önce" },
  { en: "after the collection of the samples", tr: "örneklerin toplanmasından sonra" },
  { en: "in the configuration of the network", tr: "ağın yapılandırılmasında" },
  { en: "during the verification of the signature", tr: "imzanın doğrulanması sırasında" },
  { en: "because of the limitations of the study", tr: "çalışmanın sınırlılıkları nedeniyle" },
  { en: "according to the instructions of the package", tr: "paketin talimatlarına göre" },
  { en: "under the supervision of the professor", tr: "profesörün gözetimi altında" }
];

const unit2Lesson2SentencesRaw3 = [
  { en: "in the comparison of the models", tr: "modellerin karşılaştırılmasında" },
  { en: "before the start of the project", tr: "projenin başlangıcından önce" },
  { en: "during the execution of the process", tr: "sürecin yürütülmesi sırasında" },
  { en: "because of the fluctuation of the prices", tr: "fiyatların dalgalanması nedeniyle" },
  { en: "after the discovery of the element", tr: "elementin keşfinden sonra" },
  { en: "according to the guidelines of the board", tr: "kurulun yönergelerine göre" },
  { en: "under the influence of the environment", tr: "çevrenin etkisi altında" },
  { en: "in the definition of the scope", tr: "kapsamın tanımında" },
  { en: "before the release of the software", tr: "yazılımın yayınlanmasından önce" },
  { en: "during the observation of the reaction", tr: "tepkimenin gözlemlenmesi sırasında" },
  { en: "because of the lack of resources", tr: "kaynakların eksikliği nedeniyle" },
  { en: "after the modification of the parameters", tr: "parametrelerin değiştirilmesinden sonra" },
  { en: "according to the criteria of the selection", tr: "seçimin kriterlerine göre" },
  { en: "under the protection of the law", tr: "yasanın koruması altında" },
  { en: "in the evaluation of the performance", tr: "performansın değerlendirilmesinde" }
];

const unit2Lesson2SentencesRaw4 = [
  { en: "before the completion of the phase", tr: "aşamanın tamamlanmasından önce" },
  { en: "during the transition of the power", tr: "gücün geçişi sırasında" },
  { en: "because of the presence of the virus", tr: "virüsün varlığı nedeniyle" },
  { en: "after the approval of the budget", tr: "bütçenin onaylanmasından sonra" },
  { en: "according to the rules of the logic", tr: "mantığın kurallarına göre" },
  { en: "under the command of the leader", tr: "liderin komutası altında" },
  { en: "in the calculation of the cost", tr: "maliyetin hesaplanmasında" },
  { en: "before the selection of the candidates", tr: "adayların seçiminden önce" },
  { en: "during the presentation of the findings", tr: "bulguların sunumu sırasında" },
  { en: "because of the intensity of the crisis", tr: "krizin şiddeti nedeniyle" },
  { en: "after the creation of the database", tr: "veritabanının oluşturulmasından sonra" },
  { en: "according to the expectations of the users", tr: "kullanıcıların beklentilerine göre" },
  { en: "under the conditions of the contract", tr: "sözleşmenin koşulları altında" },
  { en: "in the description of the scenario", tr: "senaryonun tanımında" },
  { en: "before the change of the strategy", tr: "strateji değişiminden önce" }
];

const unit2Lesson2SentencesRaw5 = [
  { en: "during the investigation of the cause", tr: "nedenin araştırılması sırasında" },
  { en: "because of the sensitivity of the data", tr: "verinin hassasiyeti nedeniyle" },
  { en: "after the publication of the report", tr: "raporun yayınlanmasından sonra" },
  { en: "according to the details of the assignment", tr: "ödevin ayrıntılarına göre" },
  { en: "under the authority of the institution", tr: "kurumun yetkisi altında" },
  { en: "in the analysis of the behavior", tr: "davranışın analizinde" },
  { en: "before the audit of the accounts", tr: "hesapların denetiminden önce" },
  { en: "during the measurement of the temperature", tr: "sıcaklığın ölçülmesi sırasında" },
  { en: "because of the complexity of the task", tr: "görevin karmaşıklığı nedeniyle" },
  { en: "after the establishment of the rules", tr: "kuralların belirlenmesinden sonra" },
  { en: "according to the preferences of the participants", tr: "katılımcıların tercihlerine göre" },
  { en: "under the supervision of the manager", tr: "yöneticinin gözetimi altında" },
  { en: "in the detection of the error", tr: "hatanın tespit edilmesinde" },
  { en: "before the expansion of the market", tr: "pazarın genişlemesinden önce" },
  { en: "during the validation of the hypothesis", tr: "hipotezin doğrulanması sırasında" }
];

const unit2Lesson2Exercises = {
  exercises: [
    {
      id: "u2l2ex1",
      title: "Alıştırma 1: Edat Takımı + Edat Takımı Giriş",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (1-15)",
      questions: build15Questions(unit2Lesson2SentencesRaw1, 2, 9, 1)
    },
    {
      id: "u2l2ex2",
      title: "Alıştırma 2: Temel Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (16-30)",
      questions: build15Questions(unit2Lesson2SentencesRaw2, 2, 9, 2)
    },
    {
      id: "u2l2ex3",
      title: "Alıştırma 3: Orta Seviye Yapılar",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (31-45)",
      questions: build15Questions(unit2Lesson2SentencesRaw3, 2, 9, 3)
    },
    {
      id: "u2l2ex4",
      title: "Alıştırma 4: İleri Seviye Yapılar I",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (46-60)",
      questions: build15Questions(unit2Lesson2SentencesRaw4, 2, 9, 4)
    },
    {
      id: "u2l2ex5",
      title: "Alıştırma 5: İleri Seviye Yapılar II",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (61-75)",
      questions: build15Questions(unit2Lesson2SentencesRaw5, 2, 9, 5)
    }
  ]
};

const unit3Lesson10SentencesRaw = [
  // Exercise 1: index 0-15
  { en: "a significant factor", tr: "önemli bir faktör", word: "significant", trWord: "önemli" },
  { en: "a theoretical approach", tr: "teorik bir yaklaşım", word: "theoretical", trWord: "teorik" },
  { en: "an analytical method", tr: "analitik bir yöntem", word: "analytical", trWord: "analitik" },
  { en: "a constitutional issue", tr: "anayasal bir sorun", word: "constitutional", trWord: "anayasal" },
  { en: "a financial benefit", tr: "finansal bir fayda", word: "financial", trWord: "finansal" },
  { en: "an environmental policy", tr: "çevresel bir politika", word: "environmental", trWord: "çevresel" },
  { en: "a consistent response", tr: "tutarlı bir yanıt", word: "consistent", trWord: "tutarlı" },
  { en: "a specific definition", tr: "belirli bir tanım", word: "specific", trWord: "belirli" },
  { en: "a methodological error", tr: "metodolojik bir hata", word: "methodological", trWord: "metodolojik" },
  { en: "an economic sector", tr: "ekonomik bir sektör", word: "economic", trWord: "ekonomik" },
  { en: "a structural modification", tr: "yapısal bir değişiklik", word: "structural", trWord: "yapısal" },
  { en: "a periodic assessment", tr: "periyodik bir değerlendirme", word: "periodic", trWord: "periyodik" },
  { en: "an individual identity", tr: "bireysel bir kimlik", word: "individual", trWord: "bireysel" },
  { en: "a procedural requirement", tr: "yöntemsel bir gereklilik", word: "procedural", trWord: "yöntemsel" },
  { en: "a conceptual framework", tr: "kavramsal bir çerçeve", word: "conceptual", trWord: "kavramsal" },
  { en: "a responsive authority", tr: "duyarlı bir otorite", word: "responsive", trWord: "duyarlı" },

  // Exercise 2: index 16-31
  { en: "a contextual analysis", tr: "bağlamsal bir analiz", word: "contextual", trWord: "bağlamsal" },
  { en: "a distributive function", tr: "dağıtımsal bir işlev", word: "distributive", trWord: "dağıtımsal" },
  { en: "a similar occurrence", tr: "benzer bir olay", word: "similar", trWord: "benzer" },
  { en: "an evident bias", tr: "bariz bir önyargı", word: "evident", trWord: "bariz" },
  { en: "a major source", tr: "önemli bir kaynak", word: "major", trWord: "önemli" },
  { en: "a creative process", tr: "yaratıcı bir süreç", word: "creative", trWord: "yaratıcı" },
  { en: "an alternative solution", tr: "alternatif bir çözüm", word: "alternative", trWord: "alternatif" },
  { en: "a mutual agreement", tr: "karşılıklı bir anlaşma", word: "mutual", trWord: "karşılıklı" },
  { en: "a negative impact", tr: "olumsuz bir etki", word: "negative", trWord: "olumsuz" },
  { en: "a positive result", tr: "olumlu bir sonuç", word: "positive", trWord: "olumlu" },
  { en: "a physical property", tr: "fiziksel bir özellik", word: "physical", trWord: "fiziksel" },
  { en: "a chemical reaction", tr: "kimyasal bir tepkime", word: "chemical", trWord: "kimyasal" },
  { en: "a social change", tr: "toplumsal bir değişim", word: "social", trWord: "toplumsal" },
  { en: "a technical difficulty", tr: "teknik bir zorluk", word: "technical", trWord: "teknik" },
  { en: "a cultural heritage", tr: "kültürel bir miras", word: "cultural", trWord: "kültürel" },
  { en: "a visual representation", tr: "görsel bir temsil", word: "visual", trWord: "görsel" },

  // Exercise 3: index 32-47
  { en: "an official document", tr: "resmi bir belge", word: "official", trWord: "resmi" },
  { en: "a natural resource", tr: "doğal bir kaynak", word: "natural", trWord: "doğal" },
  { en: "a primary source", tr: "birincil bir kaynak", word: "primary", trWord: "birincil" },
  { en: "a secondary analysis", tr: "ikincil bir analiz", word: "secondary", trWord: "ikincil" },
  { en: "a permanent state", tr: "kalıcı bir durum", word: "permanent", trWord: "kalıcı" },
  { en: "a temporary status", tr: "geçici bir statü", word: "temporary", trWord: "geçici" },
  { en: "an active participation", tr: "aktif bir katılım", word: "active", trWord: "aktif" },
  { en: "a passive role", tr: "edilgen bir rol", word: "passive", trWord: "edilgen" },
  { en: "a formal education", tr: "resmi bir eğitim", word: "formal", trWord: "resmi" },
  { en: "an informal discussion", tr: "resmi olmayan bir tartışma", word: "informal", trWord: "resmi olmayan" },
  { en: "a logical argument", tr: "mantıklı bir argüman", word: "logical", trWord: "mantıklı" },
  { en: "empirical evidence", tr: "deneysel bir kanıt", word: "empirical", trWord: "deneysel" },
  { en: "statistical significance", tr: "istatistiksel bir önem", word: "statistical", trWord: "istatistiksel" },
  { en: "a preliminary report", tr: "ön bir rapor", word: "preliminary", trWord: "ön" },
  { en: "a comprehensive study", tr: "kapsamlı bir çalışma", word: "comprehensive", trWord: "kapsamlı" },
  { en: "a dominant feature", tr: "baskın bir özellik", word: "dominant", trWord: "baskın" },

  // Exercise 4: index 48-63
  { en: "a data analysis", tr: "veri analizi", word: "data", trWord: "veri" },
  { en: "a government policy", tr: "hükümet politikası", word: "government", trWord: "hükümet" },
  { en: "a research method", tr: "araştırma yöntemi", word: "research", trWord: "araştırma" },
  { en: "a market economy", tr: "piyasa ekonomisi", word: "market", trWord: "piyasa" },
  { en: "a contract specification", tr: "sözleşme şartnamesi", word: "contract", trWord: "sözleşme" },
  { en: "a labor market", tr: "iş gücü piyasası", word: "labor", trWord: "iş gücü" },
  { en: "an income distribution", tr: "gelir dağılımı", word: "income", trWord: "gelir" },
  { en: "a theory formulation", tr: "teori formülasyonu", word: "theory", trWord: "teori" },
  { en: "an energy source", tr: "enerji kaynağı", word: "energy", trWord: "enerji" },
  { en: "a computer network", tr: "bilgisayar ağı", word: "computer", trWord: "bilgisayar" },
  { en: "a resource allocation", tr: "kaynak tahsisi", word: "resource", trWord: "kaynak" },
  { en: "a quality control", tr: "kalite kontrolü", word: "quality", trWord: "kalite" },
  { en: "a project design", tr: "proje tasarımı", word: "project", trWord: "proje" },
  { en: "a trade agreement", tr: "ticaret anlaşması", word: "trade", trWord: "ticaret" },
  { en: "a security system", tr: "güvenlik sistemi", word: "security", trWord: "güvenlik" },
  { en: "a transition period", tr: "geçiş dönemi", word: "transition", trWord: "geçiş" },

  // Exercise 5: index 64-79
  { en: "data collection", tr: "veri toplama", word: "collection", trWord: "toplama" },
  { en: "a feedback loop", tr: "geri bildirim döngüsü", word: "feedback", trWord: "geri bildirim" },
  { en: "a research project", tr: "araştırma projesi", word: "project", trWord: "projesi" },
  { en: "population growth", tr: "nüfus büyümesi", word: "population", trWord: "nüfus" },
  { en: "a budget cut", tr: "bütçe kesintisi", word: "budget", trWord: "bütçe" },
  { en: "a water supply", tr: "su kaynağı", word: "water", trWord: "su" },
  { en: "an output level", tr: "çıktı seviyesi", word: "output", trWord: "çıktı" },
  { en: "an input device", tr: "girdi aygıtı", word: "input", trWord: "girdi" },
  { en: "a price index", tr: "fiyat endeksi", word: "price", trWord: "fiyat" },
  { en: "a risk assessment", tr: "risk değerlendirmesi", word: "risk", trWord: "risk" },
  { en: "a consensus meeting", tr: "uzlaşı toplantısı", word: "consensus", trWord: "uzlaşı" },
  { en: "tax revenue", tr: "vergi geliri", word: "tax", trWord: "vergi" },
  { en: "a code system", tr: "kod sistemi", word: "code", trWord: "kod" },
  { en: "a software release", tr: "yazılım sürümü", word: "software", trWord: "yazılım" },
  { en: "crisis management", tr: "kriz yönetimi", word: "crisis", trWord: "kriz" },
  { en: "an error rate", tr: "hata oranı", word: "error", trWord: "hata" },

  // Exercise 6: index 80-95
  { en: "a team leader", tr: "ekip lideri", word: "team", trWord: "ekip" },
  { en: "network security", tr: "ağ güvenliği", word: "security", trWord: "güvenliği" },
  { en: "a database creator", tr: "veritabanı yaratıcısı", word: "database", trWord: "veritabanı" },
  { en: "signature verification", tr: "imza doğrulaması", word: "signature", trWord: "imza" },
  { en: "product development", tr: "ürün geliştirme", word: "product", trWord: "ürün" },
  { en: "memory capacity", tr: "bellek kapasitesi", word: "memory", trWord: "bellek" },
  { en: "customer service", tr: "müşteri hizmetleri", word: "customer", trWord: "müşteri" },
  { en: "user expectation", tr: "kullanıcı beklentisi", word: "user", trWord: "kullanıcı" },
  { en: "a detailed explanation", tr: "detaylı açıklama", word: "explanation", trWord: "açıklama" },
  { en: "an account balance", tr: "hesap bakiyesi", word: "balance", trWord: "bakiye" },
  { en: "temperature measurement", tr: "sıcaklık ölçümü", word: "temperature", trWord: "sıcaklık" },
  { en: "a behavior pattern", tr: "davranış kalıbı", word: "behavior", trWord: "davranış" },
  { en: "task division", tr: "görev paylaşımı", word: "division", trWord: "paylaşımı" },
  { en: "a time limit", tr: "zaman sınırı", word: "limit", trWord: "sınırı" },
  { en: "an index table", tr: "endeks tablosu", word: "table", trWord: "tablosu" },
  { en: "a test result", tr: "test sonucu", word: "result", trWord: "sonucu" }
];

const unit3Lesson11SentencesRaw = [
  // Exercise 1: index 0-15
  { en: "a global market expansion", tr: "küresel pazar büyümesi", word: "expansion", trWord: "büyümesi" },
  { en: "an alternative energy source", tr: "alternatif enerji kaynağı", word: "alternative", trWord: "alternatif" },
  { en: "a complex network design", tr: "karmaşık ağ tasarımı", word: "complex", trWord: "karmaşık" },
  { en: "a stable regime structure", tr: "istikrarlı rejim yapısı", word: "regime", trWord: "rejim" },
  { en: "a clear concept definition", tr: "net kavram tanımı", word: "concept", trWord: "kavram" },
  { en: "a precise data analysis", tr: "kesin veri analizi", word: "precise", trWord: "kesin" },
  { en: "a primary research method", tr: "birincil araştırma yöntemi", word: "primary", trWord: "birincil" },
  { en: "a modern government policy", tr: "modern hükümet politikası", word: "modern", trWord: "modern" },
  { en: "a typical market economy", tr: "tipik piyasa ekonomisi", word: "typical", trWord: "tipik" },
  { en: "a formal contract specification", tr: "resmi sözleşme şartnamesi", word: "formal", trWord: "resmi" },
  { en: "a competitive labor market", tr: "rekabetçi iş gücü piyasası", word: "competitive", trWord: "rekabetçi" },
  { en: "an unequal income distribution", tr: "eşitsiz gelir dağılımı", word: "unequal", trWord: "eşitsiz" },
  { en: "a new theory formulation", tr: "yeni teori formülasyonu", word: "formulation", trWord: "formülasyonu" },
  { en: "a significant environmental factor", tr: "önemli çevresel faktör", word: "significant", trWord: "önemli" },
  { en: "a temporary transition period", tr: "geçici geçiş dönemi", word: "temporary", trWord: "geçici" },
  { en: "a secure database connection", tr: "güvenli veritabanı bağlantısı", word: "secure", trWord: "güvenli" },

  // Exercise 2: index 16-31
  { en: "a rapid population growth", tr: "hızlı nüfus büyümesi", word: "rapid", trWord: "hızlı" },
  { en: "a severe budget cut", tr: "ciddi bütçe kesintisi", word: "severe", trWord: "ciddi" },
  { en: "an efficient water supply", tr: "verimli su kaynağı", word: "efficient", trWord: "verimli" },
  { en: "a low output level", tr: "düşük çıktı seviyesi", word: "output", trWord: "çıktı" },
  { en: "a high price index", tr: "yüksek fiyat endeksi", word: "price", trWord: "fiyat" },
  { en: "a dynamic feedback loop", tr: "dinamik geri bildirim döngüsü", word: "dynamic", trWord: "dinamik" },
  { en: "a preliminary risk assessment", tr: "ön risk değerlendirmesi", word: "preliminary", trWord: "ön" },
  { en: "an internal security system", tr: "iç güvenlik sistemi", word: "internal", trWord: "iç" },
  { en: "a mutual trade agreement", tr: "karşılıklı ticaret anlaşması", word: "mutual", trWord: "karşılıklı" },
  { en: "a major project design", tr: "büyük proje tasarımı", word: "major", trWord: "büyük" },
  { en: "a reliable resource allocation", tr: "güvenilir kaynak tahsisi", word: "reliable", trWord: "güvenilir" },
  { en: "a strict quality control", tr: "katı kalite kontrolü", word: "strict", trWord: "katı" },
  { en: "a creative product development", tr: "yaratıcı ürün geliştirme", word: "creative", trWord: "yaratıcı" },
  { en: "a massive memory capacity", tr: "devasa bellek kapasitesi", word: "massive", trWord: "devasa" },
  { en: "a professional customer service", tr: "profesyonel müşteri hizmetleri", word: "professional", trWord: "profesyonel" },
  { en: "a high user expectation", tr: "yüksek kullanıcı beklentisi", word: "user", trWord: "kullanıcı" },

  // Exercise 3: index 32-47
  { en: "a detailed explanation document", tr: "detaylı açıklama belgesi", word: "document", trWord: "belgesi" },
  { en: "a positive test result", tr: "olumlu test sonucu", word: "positive", trWord: "olumlu" },
  { en: "a chronological index table", tr: "kronolojik endeks tablosu", word: "chronological", trWord: "kronolojik" },
  { en: "a strict time limit", tr: "katı zaman sınırı", word: "limit", trWord: "sınırı" },
  { en: "a clear task division", tr: "net görev paylaşımı", word: "division", trWord: "paylaşımı" },
  { en: "a typical behavior pattern", tr: "tipik davranış kalıbı", word: "behavior", trWord: "davranış" },
  { en: "an automatic temperature measurement", tr: "otomatik sıcaklık ölçümü", word: "temperature", trWord: "sıcaklık" },
  { en: "an accurate account balance", tr: "doğru hesap bakiyesi", word: "accurate", trWord: "doğru" },
  { en: "Data analysis is a creative process.", tr: "Veri analizi yaratıcı bir süreçtir.", word: "process", trWord: "süreçtir" },
  { en: "The team completed the research project.", tr: "Ekip araştırma projesini tamamladı.", word: "project", trWord: "projesini" },
  { en: "The government changed the economic policy.", tr: "Hükümet ekonomik politikayı değiştirdi.", word: "policy", trWord: "politikayı" },
  { en: "The company increased the memory capacity.", tr: "Şirket bellek kapasitesini artırdı.", word: "capacity", trWord: "kapasitesini" },
  { en: "Scientists proposed a new research method.", tr: "Bilim insanları yeni bir araştırma yöntemi önerdiler.", word: "proposed", trWord: "önerdiler" },
  { en: "The market economy requires stable resources.", tr: "Piyasa ekonomisi istikrarlı kaynaklar gerektirir.", word: "requires", trWord: "gerektirir" },
  { en: "We must design a secure network system.", tr: "Güvenli bir ağ sistemi tasarlamalıyız.", word: "design", trWord: "tasarlamalıyız" },
  { en: "The manager approved the resource allocation.", tr: "Yönetici kaynak tahsisini onayladı.", word: "approved", trWord: "onayladı" },

  // Exercise 4: index 48-63
  { en: "They established a strict quality control.", tr: "Sıkı bir kalite kontrolü kurdular.", word: "quality", trWord: "kalite" },
  { en: "The sector needs a major modification.", tr: "Sektörün büyük bir değişikliğe ihtiyacı var.", word: "needs", trWord: "ihtiyacı var" },
  { en: "The report highlights a significant factor.", tr: "Rapor önemli bir faktörü vurgulamaktadır.", word: "highlights", trWord: "vurgulamaktadır" },
  { en: "We observed a similar occurrence in the test.", tr: "Testte benzer bir olayı gözlemledik.", word: "observed", trWord: "gözlemledik" },
  { en: "The author provides a conceptual framework.", tr: "Yazar kavramsal bir çerçeve sunmaktadır.", word: "provides", trWord: "sunmaktadır" },
  { en: "The lawyer drafted a new trade agreement.", tr: "Avukat yeni bir ticaret anlaşması hazırladı.", word: "drafted", trWord: "hazırladı" },
  { en: "The economy experiences a rapid transition.", tr: "Ekonomi hızlı bir geçiş yaşıyor.", word: "experiences", trWord: "yaşıyor" },
  { en: "The team needs a reliable database creator.", tr: "Ekibin güvenilir bir veritabanı yaratıcısına ihtiyacı var.", word: "creator", trWord: "yaratıcısına" },
  { en: "They verified the signature of the client.", tr: "Müşterinin imzasını doğruladılar.", word: "verified", trWord: "doğruladılar" },
  { en: "The country promotes a sustainable source.", tr: "Ülke sürdürülebilir bir kaynağı teşvik ediyor.", word: "promotes", trWord: "teşvik ediyor" },
  { en: "We need an immediate risk assessment.", tr: "Acil bir risk değerlendirmesine ihtiyacımız var.", word: "immediate", trWord: "acil" },
  { en: "The system detects a logical error.", tr: "Sistem mantıksal bir hata tespit ediyor.", word: "detects", trWord: "tespit ediyor" },
  { en: "The project operates under strict regulations.", tr: "Proje katı kurallar altında yürütülmektedir.", word: "operates", trWord: "yürütülmektedir" },
  { en: "The candidate showed a positive behavior pattern.", tr: "Aday olumlu bir davranış kalıbı gösterdi.", word: "showed", trWord: "gösterdi" },
  { en: "The student completed the difficult assignment.", tr: "Öğrenci zor görevi tamamladı.", word: "completed", trWord: "tamamladı" },
  { en: "The board accepted the budget proposal.", tr: "Yönetim kurulu bütçe teklifini kabul etti.", word: "accepted", trWord: "kabul etti" },

  // Exercise 5: index 64-79
  { en: "We measured the temperature of the liquid.", tr: "Sıvının sıcaklığını ölçtük.", word: "measured", trWord: "ölçtük" },
  { en: "The user has a high expectation.", tr: "Kullanıcının yüksek bir beklentisi var.", word: "expectation", trWord: "beklentisi var" },
  { en: "The process requires a clear definition.", tr: "Süreç net bir tanım gerektirir.", word: "definition", trWord: "tanım" },
  { en: "The analysis revealed a major source.", tr: "Analiz önemli bir kaynağı ortaya çıkardı.", word: "revealed", trWord: "ortaya çıkardı" },
  { en: "They completed a periodic assessment of the system.", tr: "Sistemin periyodik bir değerlendirmesini tamamladılar.", word: "assessment", trWord: "değerlendirmesini" },
  { en: "The administration updated the security policy.", tr: "Yönetim güvenlik politikasını güncelledi.", word: "updated", trWord: "güncelledi" },
  { en: "The team created a new database connection.", tr: "Ekip yeni bir veritabanı bağlantısı oluşturdu.", word: "connection", trWord: "bağlantısı" },
  { en: "We need a procedural requirement document.", tr: "Yöntemsel bir gereklilik belgesine ihtiyacımız var.", word: "requirement", trWord: "gereklilik" },
  { en: "The institution has a responsive authority.", tr: "Kurumun duyarlı bir yetkisi var.", word: "authority", trWord: "yetkisi var" },
  { en: "The professor wrote a conceptual analysis.", tr: "Profesör kavramsal bir analiz yazdı.", word: "wrote", trWord: "yazdı" },
  { en: "The division of labor is a key principle.", tr: "İş bölümü kilit bir ilkedir.", word: "division", trWord: "bölümü" },
  { en: "The company faces a competitive labor market.", tr: "Şirket rekabetçi bir iş gücü piyasası ile karşı karşıyadır.", word: "faces", trWord: "karşı karşıyadır" },
  { en: "The distribution of income is not equal.", tr: "Gelir dağılımı eşit değildir.", word: "distribution", trWord: "dağılımı" },
  { en: "The author started the theory formulation.", tr: "Yazar teori formülasyonuna başladı.", word: "formulation", trWord: "formülasyonuna" },
  { en: "They found a creative solution to the problem.", tr: "Soruna yaratıcı bir çözüm buldular.", word: "found", trWord: "buldular" },
  { en: "We need to obtain a new energy source.", tr: "Yeni bir enerji kaynağı elde etmeliyiz.", word: "obtain", trWord: "elde etmeliyiz" },

  // Exercise 6: index 80-95
  { en: "The computer network was upgraded yesterday.", tr: "Bilgisayar ağı dün yükseltildi.", word: "network", trWord: "ağı" },
  { en: "The committee accepted the mutual agreement.", tr: "Komite karşılıklı anlaşmayı kabul etti.", word: "agreement", trWord: "anlaşmayı" },
  { en: "The negative impact was resolved quickly.", tr: "Olumsuz etki hızlıca çözüldü.", word: "resolved", trWord: "çözüldü" },
  { en: "We got a positive result from the experiment.", tr: "Deneyden olumlu bir sonuç aldık.", word: "result", trWord: "sonuç" },
  { en: "The physical property of the metal is interesting.", tr: "Metalin fiziksel özelliği ilginçtir.", word: "property", trWord: "özelliği" },
  { en: "The chemical reaction was very fast.", tr: "Kimyasal tepkime çok hızlıydı.", word: "reaction", trWord: "tepkime" },
  { en: "The community wants a social change.", tr: "Topluluk toplumsal bir değişim istiyor.", word: "social", trWord: "toplumsal" },
  { en: "We resolved the technical difficulty.", tr: "Teknik zorluğu çözdük.", word: "difficulty", trWord: "zorluğu" },
  { en: "The country has a rich cultural heritage.", tr: "Ülkenin zengin bir kültürel mirası var.", word: "heritage", trWord: "mirası var" },
  { en: "The diagram is a visual representation.", tr: "Diyagram görsel bir temsildir.", word: "representation", trWord: "temsildir" },
  { en: "The police checked the official document.", tr: "Polis resmi belgeyi kontrol etti.", word: "document", trWord: "belgeyi" },
  { en: "We should protect our natural resources.", tr: "Doğal kaynaklarimizi korumalıyız.", word: "protect", trWord: "korumalıyız" },
  { en: "The witness gave a detailed description.", tr: "Tanık detaylı bir açıklama yaptı.", word: "description", trWord: "açıklama" },
  { en: "The patient needs a temporary treatment.", tr: "Hastanın geçici bir tedaviye ihtiyacı var.", word: "treatment", trWord: "tedaviye" },
  { en: "The organization has a stable structure.", tr: "Organizasyonun istikrarlı bir yapısı var.", word: "structure", trWord: "yapısı" },
  { en: "The study provides supporting evidence.", tr: "Çalışma destekleyici kanıt sağlıyor.", word: "evidence", trWord: "kanıt" }
];

const unit4Lesson12SentencesRaw = [
  // Exercise 1: index 0-15
  { en: "decreasing exports", tr: "azalan ihracat", word: "decreasing", trWord: "azalan" },
  { en: "emerging economies", tr: "gelişmekte olan ekonomiler", word: "emerging", trWord: "gelişmekte olan" },
  { en: "expanding networks", tr: "genişleyen ağlar", word: "expanding", trWord: "genişleyen" },
  { en: "declining revenues", tr: "düşen gelirler", word: "declining", trWord: "düşen" },
  { en: "increasing costs", tr: "artan maliyetler", word: "increasing", trWord: "artan" },
  { en: "growing inconsistencies", tr: "büyüyen tutarsızlıklar", word: "growing", trWord: "büyüyen" },
  { en: "shifting policies", tr: "değişen politikalar", word: "shifting", trWord: "değişen" },
  { en: "evolving theories", tr: "gelişen teoriler", word: "evolving", trWord: "gelişen" },
  { en: "fluctuating estimates", tr: "dalgalanan tahminler", word: "fluctuating", trWord: "dalgalanan" },
  { en: "varying parameters", tr: "değişen parametreler", word: "varying", trWord: "değişen" },
  { en: "surviving entities", tr: "hayatta kalan varlıklar", word: "surviving", trWord: "hayatta kalan" },
  { en: "dominating factors", tr: "baskın faktörler", word: "dominating", trWord: "baskın" },
  { en: "corresponding responses", tr: "karşılık gelen yanıtlar", word: "corresponding", trWord: "karşılık gelen" },
  { en: "underlying structures", tr: "temelinde yatan yapılar", word: "underlying", trWord: "temelinde yatan" },
  { en: "contradicting evidence", tr: "çelişen kanıtlar", word: "contradicting", trWord: "çelişen" },
  { en: "alternating methods", tr: "dönüşümlü yöntemler", word: "alternating", trWord: "dönüşümlü" },

  // Exercise 2: index 16-31
  { en: "continuing movement", tr: "devam eden hareket", word: "continuing", trWord: "devam eden" },
  { en: "interacting variables", tr: "etkileşen değişkenler", word: "interacting", trWord: "etkileşen" },
  { en: "conflicting insights", tr: "çelişen öngörüler", word: "conflicting", trWord: "çelişen" },
  { en: "devoting sectors", tr: "kendini adayan sektörler", word: "devoting", trWord: "kendini adayan" },
  { en: "occurring variations", tr: "meydana gelen varyasyonlar", word: "occurring", trWord: "meydana gelen" },
  { en: "indicative trends", tr: "gösterge niteliğindeki trendler", word: "indicative", trWord: "gösterge niteliğindeki" },
  { en: "rising prices", tr: "yükselen fiyatlar", word: "rising", trWord: "yükselen" },
  { en: "falling demand", tr: "düşen talep", word: "falling", trWord: "düşen" },
  { en: "growing demands", tr: "artan talepler", word: "growing", trWord: "artan" },
  { en: "leading companies", tr: "öncü şirketler", word: "leading", trWord: "öncü" },
  { en: "fluctuating prices", tr: "dalgalanan fiyatlar", word: "fluctuating", trWord: "dalgalanan" },
  { en: "lasting impressions", tr: "kalıcı izlenimler", word: "lasting", trWord: "kalıcı" },
  { en: "convincing arguments", tr: "ikna edici argümanlar", word: "convincing", trWord: "ikna edici" },
  { en: "misleading information", tr: "yanıltıcı bilgi", word: "misleading", trWord: "yanıltıcı" },
  { en: "supporting data", tr: "destekleyici veriler", word: "supporting", trWord: "destekleyici" },
  { en: "promising results", tr: "umut verici sonuçlar", word: "promising", trWord: "umut verici" },

  // Exercise 3: index 32-47
  { en: "varying results", tr: "değişen sonuçlar", word: "varying", trWord: "değişen" },
  { en: "dominating trends", tr: "baskın trendler", word: "dominating", trWord: "baskın" },
  { en: "existing systems", tr: "mevcut sistemler", word: "existing", trWord: "mevcut" },
  { en: "growing interest", tr: "artan ilgi", word: "growing", trWord: "artan" },
  { en: "rising temperatures", tr: "artan sıcaklıklar", word: "rising", trWord: "artan" },
  { en: "developing countries", tr: "gelişmekte olan ülkeler", word: "developing", trWord: "gelişmekte olan" },
  { en: "matching answers", tr: "eşleşen cevaplar", word: "matching", trWord: "eşleşen" },
  { en: "challenging tasks", tr: "zorlayıcı görevler", word: "challenging", trWord: "zorlayıcı" },
  { en: "limiting conditions", tr: "sınırlayıcı koşullar", word: "limiting", trWord: "sınırlayıcı" },
  { en: "outstanding achievements", tr: "olağanüstü başarılar", word: "outstanding", trWord: "olağanüstü" },
  { en: "existing structures", tr: "mevcut yapılar", word: "existing", trWord: "mevcut" },
  { en: "shifting priorities", tr: "değişen öncelikler", word: "shifting", trWord: "değişen" },
  { en: "developing theories", tr: "gelişen teoriler", word: "developing", trWord: "gelişen" },
  { en: "concluding remarks", tr: "kapanış konuşmaları", word: "concluding", trWord: "kapanış" },
  { en: "defining moments", tr: "belirleyici anlar", word: "defining", trWord: "belirleyici" },
  { en: "surviving companies", tr: "hayatta kalan şirketler", word: "surviving", trWord: "hayatta kalan" },

  // Exercise 4: index 48-63
  { en: "increasing production", tr: "artan üretim", word: "increasing", trWord: "artan" },
  { en: "declining interest", tr: "azalan ilgi", word: "declining", trWord: "azalan" },
  { en: "rising rates", tr: "yükselen oranlar", word: "rising", trWord: "yükselen" },
  { en: "shifting focus", tr: "değişen odak", word: "shifting", trWord: "değişen" },
  { en: "growing population", tr: "büyüyen nüfus", word: "growing", trWord: "büyüyen" },
  { en: "changing times", tr: "değişen zamanlar", word: "changing", trWord: "değişen" },
  { en: "existing resources", tr: "mevcut kaynaklar", word: "existing", trWord: "mevcut" },
  { en: "differing views", tr: "farklı görüşler", word: "differing", trWord: "farklı" },
  { en: "opposing parties", tr: "muhalif partiler", word: "opposing", trWord: "muhalif" },
  { en: "matching patterns", tr: "eşleşen desenler", word: "matching", trWord: "eşleşen" },
  { en: "impending danger", tr: "yaklaşan tehlike", word: "impending", trWord: "yaklaşan" },
  { en: "emerging technologies", tr: "yeni ortaya çıkan teknolojiler", word: "emerging", trWord: "yeni ortaya çıkan" },
  { en: "competing products", tr: "rekabet eden ürünler", word: "competing", trWord: "rekabet eden" },
  { en: "demanding clients", tr: "talepkar müşteriler", word: "demanding", trWord: "talepkar" },
  { en: "promising career", tr: "umut verici kariyer", word: "promising", trWord: "umut verici" },
  { en: "leading indicators", tr: "öncü göstergeler", word: "leading", trWord: "öncü" },

  // Exercise 5: index 64-79
  { en: "outstanding debts", tr: "ödenmemiş borçlar", word: "outstanding", trWord: "ödenmemiş" },
  { en: "missing details", tr: "eksik detaylar", word: "missing", trWord: "eksik" },
  { en: "surviving patients", tr: "hayatta kalan hastalar", word: "surviving", trWord: "hayatta kalan" },
  { en: "conflicting statements", tr: "çelişen ifadeler", word: "conflicting", trWord: "çelişen" },
  { en: "underlying causes", tr: "temelde yatan nedenler", word: "underlying", trWord: "temelde yatan" },
  { en: "corresponding values", tr: "karşılık gelen değerler", word: "corresponding", trWord: "karşılık gelen" },
  { en: "occurring events", tr: "meydana gelen olaylar", word: "occurring", trWord: "meydana gelen" },
  { en: "varying opinions", tr: "değişen fikirler", word: "varying", trWord: "değişen" },
  { en: "growing influence", tr: "artan etki", word: "growing", trWord: "artan" },
  { en: "expanding boundaries", tr: "genişleyen sınırlar", word: "expanding", trWord: "genişleyen" },
  { en: "increasing pressure", tr: "artan baskı", word: "increasing", trWord: "artan" },
  { en: "declining membership", tr: "azalan üyelik", word: "declining", trWord: "azalan" },
  { en: "rising tensions", tr: "yükselen gerilimler", word: "rising", trWord: "yükselen" },
  { en: "evolving concepts", tr: "gelişen kavramlar", word: "evolving", trWord: "gelişen" },
  { en: "fluctuating levels", tr: "dalgalanan seviyeler", word: "fluctuating", trWord: "dalgalanan" },
  { en: "dominating features", tr: "baskın özellikler", word: "dominating", trWord: "baskın" },

  // Exercise 6: index 80-95
  { en: "contradicting statements", tr: "çelişen beyanlar", word: "contradicting", trWord: "çelişen" },
  { en: "alternating currents", tr: "dalgalı akımlar", word: "alternating", trWord: "dalgalı" },
  { en: "continuing support", tr: "devam eden destek", word: "continuing", trWord: "devam eden" },
  { en: "interacting groups", tr: "etkileşen gruplar", word: "interacting", trWord: "etkileşen" },
  { en: "conflicting requirements", tr: "çelişen gereksinimler", word: "conflicting", trWord: "çelişen" },
  { en: "devoting efforts", tr: "adanan çabalar", word: "devoting", trWord: "adanan" },
  { en: "occurring changes", tr: "meydana gelen değişiklikler", word: "occurring", trWord: "meydana gelen" },
  { en: "indicative results", tr: "gösterge niteliğindeki sonuçlar", word: "indicative", trWord: "gösterge niteliğindeki" },
  { en: "limiting restrictions", tr: "sınırlayıcı kısıtlamalar", word: "limiting", trWord: "sınırlayıcı" },
  { en: "outstanding performances", tr: "üstün performanslar", word: "outstanding", trWord: "üstün" },
  { en: "existing data", tr: "mevcut veriler", word: "existing", trWord: "mevcut" },
  { en: "shifting alliances", tr: "değişen ittifaklar", word: "shifting", trWord: "değişen" },
  { en: "developing regions", tr: "gelişen bölgeler", word: "developing", trWord: "gelişen" },
  { en: "concluding sentence", tr: "sonuç cümlesi", word: "concluding", trWord: "sonuç" },
  { en: "defining characteristics", tr: "belirleyici özellikler", word: "defining", trWord: "belirleyici" },
  { en: "challenging situations", tr: "zorlu durumlar", word: "challenging", trWord: "zorlu" },

  // Exercise 7: index 96-111
  { en: "expanding sectors", tr: "genişleyen sektörler", word: "expanding", trWord: "genişleyen" },
  { en: "emerging issues", tr: "ortaya çıkan sorunlar", word: "emerging", trWord: "ortaya çıkan" },
  { en: "increasing demands", tr: "artan talepler", word: "increasing", trWord: "artan" },
  { en: "declining standard", tr: "düşen standart", word: "declining", trWord: "düşen" },
  { en: "growing tension", tr: "artan gerilim", word: "growing", trWord: "artan" },
  { en: "shifting dynamics", tr: "değişen dinamikler", word: "shifting", trWord: "değişen" },
  { en: "evolving standards", tr: "gelişen standartlar", word: "evolving", trWord: "gelişen" },
  { en: "fluctuating demands", tr: "dalgalanan talepler", word: "fluctuating", trWord: "dalgalanan" },
  { en: "varying definitions", tr: "değişen tanımlar", word: "varying", trWord: "değişen" },
  { en: "surviving elements", tr: "hayatta kalan unsurlar", word: "surviving", trWord: "hayatta kalan" },
  { en: "dominating powers", tr: "baskın güçler", word: "dominating", trWord: "baskın" },
  { en: "corresponding elements", tr: "karşılık gelen unsurlar", word: "corresponding", trWord: "karşılık gelen" },
  { en: "underlying principles", tr: "temelde yatan ilkeler", word: "underlying", trWord: "temelde yatan" },
  { en: "contradicting reports", tr: "çelişen raporlar", word: "contradicting", trWord: "çelişen" },
  { en: "alternating sequences", tr: "ardışık sıralar", word: "alternating", trWord: "ardışık" },
  { en: "continuing dialogue", tr: "devam eden diyalog", word: "continuing", trWord: "devam eden" },

  // Exercise 8: index 112-127
  { en: "interacting processes", tr: "etkileşen süreçler", word: "interacting", trWord: "etkileşen" },
  { en: "conflicting perspectives", tr: "çelişen perspektifler", word: "conflicting", trWord: "çelişen" },
  { en: "devoting resources", tr: "tahsis edilen kaynaklar", word: "devoting", trWord: "tahsis edilen" },
  { en: "occurring phenomena", tr: "meydana gelen olaylar", word: "occurring", trWord: "meydana gelen" },
  { en: "indicative evidence", tr: "gösterge niteliğindeki kanıtlar", word: "indicative", trWord: "gösterge niteliğindeki" },
  { en: "rising stars", tr: "yükselen yıldızlar", word: "rising", trWord: "yükselen" },
  { en: "falling leaves", tr: "düşen yapraklar", word: "falling", trWord: "düşen" },
  { en: "leading figures", tr: "önde gelen şahsiyetler", word: "leading", trWord: "önde gelen" },
  { en: "lasting peace", tr: "kalıcı barış", word: "lasting", trWord: "kalıcı" },
  { en: "convincing explanations", tr: "ikna edici açıklamalar", word: "convincing", trWord: "ikna edici" },
  { en: "misleading charts", tr: "yanıltıcı grafikler", word: "misleading", trWord: "yanıltıcı" },
  { en: "supporting letters", tr: "destekleyici mektuplar", word: "supporting", trWord: "destekleyici" },
  { en: "promising opportunities", tr: "umut verici fırsatlar", word: "promising", trWord: "umut verici" },
  { en: "varying colors", tr: "değişen renkler", word: "varying", trWord: "değişen" },
  { en: "dominating positions", tr: "baskın konumlar", word: "dominating", trWord: "baskın" },
  { en: "existing laws", tr: "mevcut yasalar", word: "existing", trWord: "mevcut" }
];

const unit4Lesson13SentencesRaw = [
  // Exercise 1: index 0-15
  { en: "income-maximizing strategy", tr: "geliri maksimize eden strateji", word: "income-maximizing", trWord: "geliri maksimize eden" },
  { en: "resource-limiting factor", tr: "kaynağı sınırlandıran faktör", word: "resource-limiting", trWord: "kaynağı sınırlandıran" },
  { en: "policy-defining role", tr: "politikayı tanımlayan rol", word: "policy-defining", trWord: "politikayı tanımlayan" },
  { en: "data-processing software", tr: "veri işleyen yazılım", word: "data-processing", trWord: "veri işleyen" },
  { en: "market-expanding project", tr: "pazarı büyüten proje", word: "market-expanding", trWord: "pazarı büyüten" },
  { en: "energy-consuming device", tr: "enerji tüketen cihaz", word: "energy-consuming", trWord: "enerji tüketen" },
  { en: "logic-defying concept", tr: "mantığa meydan okuyan kavram", word: "logic-defying", trWord: "mantığa meydan okuyan" },
  { en: "environment-protecting law", tr: "çevreyi koruyan yasa", word: "environment-protecting", trWord: "çevreyi koruyan" },
  { en: "investment-supporting policy", tr: "yatırımı destekleyen politika", word: "investment-supporting", trWord: "yatırımı destekleyen" },
  { en: "research-funding source", tr: "araştırmayı fonlayan kaynak", word: "research-funding", trWord: "araştırmayı fonlayan" },
  { en: "network-monitoring tool", tr: "ağı izleyen araç", word: "network-monitoring", trWord: "ağı izleyen" },
  { en: "structure-defining rule", tr: "yapıyı tanımlayan kural", word: "structure-defining", trWord: "yapıyı tanımlayan" },
  { en: "design-simplifying method", tr: "tasarımı basitleştiren yöntem", word: "design-simplifying", trWord: "tasarımı basitleştiren" },
  { en: "authority-challenging action", tr: "otoriteye meydan okuyan eylem", word: "authority-challenging", trWord: "otoriteye meydan okuyan" },
  { en: "growth-stimulating plan", tr: "büyümeyi canlandıran plan", word: "growth-stimulating", trWord: "büyümeyi canlandıran" },
  { en: "regime-supporting force", tr: "rejimi destekleyen güç", word: "regime-supporting", trWord: "rejimi destekleyen" },

  // Exercise 2: index 16-31
  { en: "cost-reducing measure", tr: "maliyeti düşüren önlem", word: "cost-reducing", trWord: "maliyeti düşüren" },
  { en: "revenue-generating activity", tr: "gelir getiren faaliyet", word: "revenue-generating", trWord: "gelir getiren" },
  { en: "profit-maximizing price", tr: "kârı maksimize eden fiyat", word: "profit-maximizing", trWord: "kârı maksimize eden" },
  { en: "time-saving method", tr: "zaman kazandıran yöntem", word: "time-saving", trWord: "zaman kazandıran" },
  { en: "problem-solving skill", tr: "problem çözen beceri", word: "problem-solving", trWord: "problem çözen" },
  { en: "risk-mitigating factor", tr: "riski azaltan faktör", word: "risk-mitigating", trWord: "riski azaltan" },
  { en: "value-adding service", tr: "değer katan hizmet", word: "value-adding", trWord: "değer katan" },
  { en: "fact-finding mission", tr: "gerçekleri araştırma görevi", word: "fact-finding", trWord: "gerçekleri araştırma" },
  { en: "decision-making authority", tr: "karar alma yetkisi", word: "decision-making", trWord: "karar alma" },
  { en: "labor-saving technology", tr: "işgücü tasarrufu sağlayan teknoloji", word: "labor-saving", trWord: "işgücü tasarrufu sağlayan" },
  { en: "record-breaking run", tr: "rekor kıran koşu", word: "record-breaking", trWord: "rekor kıran" },
  { en: "attention-grabbing title", tr: "ilgi çeken başlık", word: "attention-grabbing", trWord: "ilgi çeken" },
  { en: "breath-taking view", tr: "nefes kesen manzara", word: "breath-taking", trWord: "nefes kesen" },
  { en: "heart-warming story", tr: "iç ısıtan hikaye", word: "heart-warming", trWord: "iç ısıtan" },
  { en: "law-abiding citizen", tr: "yasalara uyan vatandaş", word: "law-abiding", trWord: "yasalara uyan" },
  { en: "peace-loving nation", tr: "barışsever ulus", word: "peace-loving", trWord: "barışsever" },

  // Exercise 3: index 32-47
  { en: "mind-boggling puzzle", tr: "akıl almaz bulmaca", word: "mind-boggling", trWord: "akıl almaz" },
  { en: "eye-opening experience", tr: "göz açıcı deneyim", word: "eye-opening", trWord: "göz açıcı" },
  { en: "mouth-watering dish", tr: "ağız sulandıran yemek", word: "mouth-watering", trWord: "ağız sulandıran" },
  { en: "life-saving treatment", tr: "hayat kurtaran tedavi", word: "life-saving", trWord: "hayat kurtaran" },
  { en: "money-making scheme", tr: "para kazandıran plan", word: "money-making", trWord: "para kazandıran" },
  { en: "job-creating investment", tr: "istihdam yaratan yatırım", word: "job-creating", trWord: "istihdam yaratan" },
  { en: "face-saving compromise", tr: "itibar kurtaran uzlaşma", word: "face-saving", trWord: "itibar kurtaran" },
  { en: "climate-changing emission", tr: "iklimi değiştiren emisyon", word: "climate-changing", trWord: "iklimi değiştiren" },
  { en: "cost-saving device", tr: "maliyet tasarrufu sağlayan cihaz", word: "cost-saving", trWord: "maliyet tasarrufu sağlayan" },
  { en: "noise-reducing headphone", tr: "gürültü azaltan kulaklık", word: "noise-reducing", trWord: "gürültü azaltan" },
  { en: "light-emitting diode", tr: "ışık yayan diyot", word: "light-emitting", trWord: "ışık yayan" },
  { en: "soil-eroding rain", tr: "toprak aşındıran yağmur", word: "soil-eroding", trWord: "toprak aşındıran" },
  { en: "disease-causing bacteria", tr: "hastalığa neden olan bakteri", word: "disease-causing", trWord: "hastalığa neden olan" },
  { en: "habit-forming drug", tr: "alışkanlık yapan ilaç", word: "habit-forming", trWord: "alışkanlık yapan" },
  { en: "caffeine-containing drink", tr: "kafein içeren içecek", word: "caffeine-containing", trWord: "kafein içeren" },
  { en: "interest-bearing account", tr: "faiz getiren hesap", word: "interest-bearing", trWord: "faiz getiren" },

  // Exercise 4: index 48-63
  { en: "tax-paying resident", tr: "vergi ödeyen mukim", word: "tax-paying", trWord: "vergi ödeyen" },
  { en: "trouble-making student", tr: "sorun çıkaran öğrenci", word: "trouble-making", trWord: "sorun çıkaran" },
  { en: "order-defining priority", tr: "sırayı belirleyen öncelik", word: "order-defining", trWord: "sırayı belirleyen" },
  { en: "water-absorbing plant", tr: "su emen bitki", word: "water-absorbing", trWord: "su emen" },
  { en: "heat-conducting metal", tr: "ısı ileten metal", word: "heat-conducting", trWord: "ısı ileten" },
  { en: "light-absorbing surface", tr: "ışık emen yüzey", word: "light-absorbing", trWord: "ışık emen" },
  { en: "truth-revealing witness", tr: "gerçeği ortaya çıkaran tanık", word: "truth-revealing", trWord: "gerçeği ortaya çıkaran" },
  { en: "error-detecting code", tr: "hata tespit eden kod", word: "error-detecting", trWord: "hata tespit eden" },
  { en: "data-gathering system", tr: "veri toplayan sistem", word: "data-gathering", trWord: "veri toplayan" },
  { en: "space-saving design", tr: "yer kazandıran tasarım", word: "space-saving", trWord: "yer kazandıran" },
  { en: "career-defining decision", tr: "kariyer belirleyici karar", word: "career-defining", trWord: "kariyer belirleyici" },
  { en: "electricity-generating turbine", tr: "elektrik üreten türbin", word: "electricity-generating", trWord: "elektrik üreten" },
  { en: "memory-enhancing drug", tr: "bellek geliştiren ilaç", word: "memory-enhancing", trWord: "bellek geliştiren" },
  { en: "revenue-boosting campaign", tr: "gelir artıran kampanya", word: "revenue-boosting", trWord: "gelir artıran" },
  { en: "productivity-enhancing tool", tr: "verimlilik artıran araç", word: "productivity-enhancing", trWord: "verimlilik artıran" },
  { en: "performance-improving software", tr: "performans iyileştiren yazılım", word: "performance-improving", trWord: "performans iyileştiren" }
];

function buildUnit3CustomExercise(sentences, unitId, lessonId, exId) {
  const qList = [];
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  // 1. Single Word Matching (Q1) using first 4 sentences' word and trWord
  const matchSents1 = sentences.slice(0, 4);
  qList.push({
    id: `u${unitId}l${lessonId}_ex${exId}_match1`,
    type: "matching",
    prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
    pairs: matchSents1.map(s => ({
      left: s.trWord || s.tr,
      right: s.word || s.en
    }))
  });

  // 2. Single Word Matching (Q2) using sentences 4 to 7's word and trWord
  const matchSents2 = sentences.slice(4, 8);
  qList.push({
    id: `u${unitId}l${lessonId}_ex${exId}_match2`,
    type: "matching",
    prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
    pairs: matchSents2.map(s => ({
      left: s.trWord || s.tr,
      right: s.word || s.en
    }))
  });

  // 3. Phrase Matching (Q3) using first 4 sentences' en and tr
  qList.push({
    id: `u${unitId}l${lessonId}_ex${exId}_match_phrase`,
    type: "matching",
    prompt: "İfadeleri Türkçe karşılıklarıyla eşleştirin.",
    pairs: matchSents1.map(s => ({
      left: s.tr,
      right: s.en
    }))
  });

  // 4. Multiple Choice (Q4-Q6) using sentences 4, 5, 6
  const mcSents = sentences.slice(4, 7);
  mcSents.forEach((sA, idx) => {
    const wrongSents = sentences.filter(s => s.en !== sA.en);
    const shuffledWrongs = shuffle(wrongSents);
    while (shuffledWrongs.length < 3) {
      shuffledWrongs.push({ en: "test", tr: "test" });
    }
    const options = shuffle([
      sA.tr,
      shuffledWrongs[0].tr,
      shuffledWrongs[1].tr,
      shuffledWrongs[2].tr
    ]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_mc_${idx}`,
      type: "multiple-choice",
      prompt: `"${sA.en}" ifadesinin Türkçe karşılığı hangisidir?`,
      options: options,
      correctIndex: options.indexOf(sA.tr),
      enSentence: sA.en,
      isEngToTr: true
    });
  });

  // 5. Word Bank (Q7-Q9) using sentences 7, 8, 9
  const wbSents = sentences.slice(7, 10);
  wbSents.forEach((sA, idx) => {
    const targetWords = sA.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
    const allOtherTrWords = sentences.filter(s => s.en !== sA.en).map(s => s.tr.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))).flat();
    const uniqueDistractors = [...new Set(allOtherTrWords)].filter(w => !targetWords.includes(w));
    const shuffledDistractors = shuffle(uniqueDistractors);
    while (shuffledDistractors.length < 3) {
      shuffledDistractors.push("ve");
    }
    const words = shuffle([...targetWords, shuffledDistractors[0], shuffledDistractors[1], shuffledDistractors[2]]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_${idx}`,
      type: "word-bank",
      prompt: "İfadenin Türkçe karşılığını oluşturun:",
      translation: sA.en,
      words: words,
      correctOrder: targetWords,
      enSentence: sA.en,
      isEngToTr: true
    });
  });

  // 6. Word Sorting (Q10-Q12) using sentences 10, 11, 12
  const wsSents = sentences.slice(10, 13);
  wsSents.forEach((sA, idx) => {
    const targetWords = sA.en.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
    const allOtherEnWords = sentences.filter(s => s.en !== sA.en).map(s => s.en.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))).flat();
    const uniqueDistractors = [...new Set(allOtherEnWords)].filter(w => !targetWords.includes(w));
    const shuffledDistractors = shuffle(uniqueDistractors);
    while (shuffledDistractors.length < 3) {
      shuffledDistractors.push("the");
    }
    const words = shuffle([...targetWords, shuffledDistractors[0], shuffledDistractors[1], shuffledDistractors[2]]);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_ws_${idx}`,
      type: "word-bank",
      prompt: "İfadenin İngilizce karşılığını oluşturun:",
      translation: sA.tr,
      words: words,
      correctOrder: targetWords,
      enSentence: sA.en,
      isEngToTr: false
    });
  });

  // 7. Translation Text (Q13-Q15) using sentences 13, 14, 15
  const txSents = sentences.slice(13, 16);
  txSents.forEach((sA, idx) => {
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_tx_${idx}`,
      type: "translation-text",
      prompt: `"${sA.en}" ifadesini Türkçe'ye çevirin:`,
      correctSentence: sA.tr,
      enSentence: sA.en,
      isEngToTr: true
    });
  });

  return qList;
}

const unit3Lesson10Exercises = {
  exercises: [
    {
      id: "u3l10ex1",
      title: "Alıştırma 1: Sıfat + İsim I",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (1-16)",
      questions: buildUnit3CustomExercise(unit3Lesson10SentencesRaw.slice(0, 16), 3, 10, 1)
    },
    {
      id: "u3l10ex2",
      title: "Alıştırma 2: Sıfat + İsim II",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (17-32)",
      questions: buildUnit3CustomExercise(unit3Lesson10SentencesRaw.slice(16, 32), 3, 10, 2)
    },
    {
      id: "u3l10ex3",
      title: "Alıştırma 3: Sıfat + İsim III",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (33-48)",
      questions: buildUnit3CustomExercise(unit3Lesson10SentencesRaw.slice(32, 48), 3, 10, 3)
    },
    {
      id: "u3l10ex4",
      title: "Alıştırma 4: İsim + İsim I",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (49-64)",
      questions: buildUnit3CustomExercise(unit3Lesson10SentencesRaw.slice(48, 64), 3, 10, 4)
    },
    {
      id: "u3l10ex5",
      title: "Alıştırma 5: İsim + İsim II",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (65-80)",
      questions: buildUnit3CustomExercise(unit3Lesson10SentencesRaw.slice(64, 80), 3, 10, 5)
    },
    {
      id: "u3l10ex6",
      title: "Alıştırma 6: Karışık İsim Tamlamaları",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (81-96)",
      questions: buildUnit3CustomExercise(unit3Lesson10SentencesRaw.slice(80, 96), 3, 10, 6)
    }
  ]
};

const unit3Lesson11Exercises = {
  exercises: [
    {
      id: "u3l11ex1",
      title: "Alıştırma 1: Üçlü İsim Tamlamaları I",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (1-16)",
      questions: buildUnit3CustomExercise(unit3Lesson11SentencesRaw.slice(0, 16), 3, 11, 1)
    },
    {
      id: "u3l11ex2",
      title: "Alıştırma 2: Üçlü İsim Tamlamaları II",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (17-32)",
      questions: buildUnit3CustomExercise(unit3Lesson11SentencesRaw.slice(16, 32), 3, 11, 2)
    },
    {
      id: "u3l11ex3",
      title: "Alıştırma 3: Tamlamalar ve Cümle Giriş",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (33-48)",
      questions: buildUnit3CustomExercise(unit3Lesson11SentencesRaw.slice(32, 48), 3, 11, 3)
    },
    {
      id: "u3l11ex4",
      title: "Alıştırma 4: Akademik Cümleler I",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (49-64)",
      questions: buildUnit3CustomExercise(unit3Lesson11SentencesRaw.slice(48, 64), 3, 11, 4)
    },
    {
      id: "u3l11ex5",
      title: "Alıştırma 5: Akademik Cümleler II",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (65-80)",
      questions: buildUnit3CustomExercise(unit3Lesson11SentencesRaw.slice(64, 80), 3, 11, 5)
    },
    {
      id: "u3l11ex6",
      title: "Alıştırma 6: Akademik Cümleler III",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (81-96)",
      questions: buildUnit3CustomExercise(unit3Lesson11SentencesRaw.slice(80, 96), 3, 11, 6)
    }
  ]
};

function buildUnit4CustomExercise(sentences, unitId, lessonId, exId) {
  return buildUnit3CustomExercise(sentences, unitId, lessonId, exId);
}

const unit4Lesson12Exercises = {
  exercises: [
    {
      id: "u4l12ex1",
      title: "Alıştırma 1: ...ing + İsim I",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (1-16)",
      questions: buildUnit4CustomExercise(unit4Lesson12SentencesRaw.slice(0, 16), 4, 12, 1)
    },
    {
      id: "u4l12ex2",
      title: "Alıştırma 2: ...ing + İsim II",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (17-32)",
      questions: buildUnit4CustomExercise(unit4Lesson12SentencesRaw.slice(16, 32), 4, 12, 2)
    },
    {
      id: "u4l12ex3",
      title: "Alıştırma 3: ...ing + İsim III",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (33-48)",
      questions: buildUnit4CustomExercise(unit4Lesson12SentencesRaw.slice(32, 48), 4, 12, 3)
    },
    {
      id: "u4l12ex4",
      title: "Alıştırma 4: ...ing + İsim IV",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (49-64)",
      questions: buildUnit4CustomExercise(unit4Lesson12SentencesRaw.slice(48, 64), 4, 12, 4)
    },
    {
      id: "u4l12ex5",
      title: "Alıştırma 5: ...ing + İsim V",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (65-80)",
      questions: buildUnit4CustomExercise(unit4Lesson12SentencesRaw.slice(64, 80), 4, 12, 5)
    },
    {
      id: "u4l12ex6",
      title: "Alıştırma 6: ...ing + İsim VI",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (81-96)",
      questions: buildUnit4CustomExercise(unit4Lesson12SentencesRaw.slice(80, 96), 4, 12, 6)
    },
    {
      id: "u4l12ex7",
      title: "Alıştırma 7: ...ing + İsim VII",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (97-112)",
      questions: buildUnit4CustomExercise(unit4Lesson12SentencesRaw.slice(96, 112), 4, 12, 7)
    },
    {
      id: "u4l12ex8",
      title: "Alıştırma 8: ...ing + İsim VIII",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (113-128)",
      questions: buildUnit4CustomExercise(unit4Lesson12SentencesRaw.slice(112, 128), 4, 12, 8)
    }
  ]
};

const unit4Lesson13Exercises = {
  exercises: [
    {
      id: "u4l13ex1",
      title: "Alıştırma 1: İsim + ...ing + İsim I",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (1-16)",
      questions: buildUnit4CustomExercise(unit4Lesson13SentencesRaw.slice(0, 16), 4, 13, 1)
    },
    {
      id: "u4l13ex2",
      title: "Alıştırma 2: İsim + ...ing + İsim II",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (17-32)",
      questions: buildUnit4CustomExercise(unit4Lesson13SentencesRaw.slice(16, 32), 4, 13, 2)
    },
    {
      id: "u4l13ex3",
      title: "Alıştırma 3: İsim + ...ing + İsim III",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (33-48)",
      questions: buildUnit4CustomExercise(unit4Lesson13SentencesRaw.slice(32, 48), 4, 13, 3)
    },
    {
      id: "u4l13ex4",
      title: "Alıştırma 4: İsim + ...ing + İsim IV",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (49-64)",
      questions: buildUnit4CustomExercise(unit4Lesson13SentencesRaw.slice(48, 64), 4, 13, 4)
    }
  ]
};

const unit5Lesson14SentencesRaw = [
  // User's sheet (1. Kısım) - 20 phrases
  { en: "analyzed data", tr: "analiz edilmiş veri", word: "analyzed", trWord: "analiz edilmiş", blank: "___ data" },
  { en: "uninhabited regions", tr: "insansız bölgeler", word: "uninhabited", trWord: "insansız", blank: "___ regions" },
  { en: "reduced volume", tr: "azaltılmış hacim", word: "reduced", trWord: "azaltılmış", blank: "___ volume" },
  { en: "exposed land", tr: "maruz kalmış toprak", word: "exposed", trWord: "maruz kalmış", blank: "___ land" },
  { en: "required material", tr: "gerekli malzeme", word: "required", trWord: "gerekli", blank: "___ material" },
  { en: "modified criteria", tr: "değiştirilmiş kriterler", word: "modified", trWord: "değiştirilmiş", blank: "___ criteria" },
  { en: "identified factors", tr: "belirlenmiş faktörler", word: "identified", trWord: "belirlenmiş", blank: "___ factors" },
  { en: "estimated revenue", tr: "tahmin edilen gelir", word: "estimated", trWord: "tahmin edilen", blank: "___ revenue" },
  { en: "structured approaches", tr: "yapılandırılmış yaklaşımlar", word: "structured", trWord: "yapılandırılmış", blank: "___ approaches" },
  { en: "established policies", tr: "kurulmuş politikalar", word: "established", trWord: "kurulmuş", blank: "___ policies" },
  { en: "derived conclusions", tr: "çıkarılmış sonuçlar", word: "derived", trWord: "çıkarılmış", blank: "___ conclusions" },
  { en: "defined concepts", tr: "tanımlanmış kavramlar", word: "defined", trWord: "tanımlanmış", blank: "___ concepts" },
  { en: "reallocated resources", tr: "yeniden tahsis edilmiş kaynaklar", word: "reallocated", trWord: "yeniden tahsis edilmiş", blank: "___ resources" },
  { en: "restricted areas", tr: "kısıtlanmış alanlar", word: "restricted", trWord: "kısıtlanmış", blank: "___ areas" },
  { en: "integrated technology", tr: "entegre teknoloji", word: "integrated", trWord: "entegre", blank: "___ technology" },
  { en: "selected individuals", tr: "seçilmiş bireyler", word: "selected", trWord: "seçilmiş", blank: "___ individuals" },
  { en: "evaluated methods", tr: "değerlendirilmiş yöntemler", word: "evaluated", trWord: "değerlendirilmiş", blank: "___ methods" },
  { en: "sustained growth", tr: "kesintisiz büyüme", word: "sustained", trWord: "kesintisiz", blank: "___ growth" },
  { en: "published documents", tr: "yayınlanmış belgeler", word: "published", trWord: "yayınlanmış", blank: "___ documents" },
  { en: "interpreted texts", tr: "yorumlanmış metinler", word: "interpreted", trWord: "yorumlanmış", blank: "___ texts" },

  // User's sheet (1. Kısım) - 20 sentences
  { en: "The committee reviewed the analyzed data.", tr: "Komite analiz edilmiş veriyi inceledi.", word: "analyzed", trWord: "analiz edilmiş", blank: "The committee reviewed the ___ data." },
  { en: "Researchers explored the uninhabited regions.", tr: "Araştırmacılar insansız bölgeleri keşfetti.", word: "uninhabited", trWord: "insansız", blank: "Researchers explored the ___ regions." },
  { en: "The laboratory recorded a reduced volume of the liquid.", tr: "Laboratuvar sıvının azaltılmış hacmini kaydetti.", word: "reduced", trWord: "azaltılmış", blank: "The laboratory recorded a ___ volume of the liquid." },
  { en: "The heavy rain affected the exposed land.", tr: "Şiddetli yağmur maruz kalmış toprağı etkiledi.", word: "exposed", trWord: "maruz kalmış", blank: "The heavy rain affected the ___ land." },
  { en: "Students must submit the required material before Friday.", tr: "Öğrenciler gerekli malzemeyi Cuma gününden önce teslim etmelidir.", word: "required", trWord: "gerekli", blank: "Students must submit the ___ material before Friday." },
  { en: "The scientists followed the modified criteria for the test.", tr: "Bilim insanları test için değiştirilmiş kriterleri takip etti.", word: "modified", trWord: "değiştirilmiş", blank: "The scientists followed the ___ criteria for the test." },
  { en: "We need to focus on the identified factors.", tr: "Belirlenmiş faktörlere odaklanmamız gerekiyor.", word: "identified", trWord: "belirlenmiş", blank: "We need to focus on the ___ factors." },
  { en: "The accountant calculated the estimated revenue for this year.", tr: "Muhasebeci bu yıl için tahmin edilen geliri hesapladı.", word: "estimated", trWord: "tahmin edilen", blank: "The accountant calculated the ___ revenue for this year." },
  { en: "They prefer structured approaches to solve the problem.", tr: "Problemi çözmek için yapılandırılmış yaklaşımları tercih ediyorlar.", word: "structured", trWord: "yapılandırılmış", blank: "They prefer ___ approaches to solve the problem." },
  { en: "The institution relies on established policies.", tr: "Kurum kurulmuş politikalara güveniyor.", word: "established", trWord: "kurulmuş", blank: "The institution relies on ___ policies." },
  { en: "The final report contains derived conclusions.", tr: "Nihai rapor çıkarılmış sonuçlar içeriyor.", word: "derived", trWord: "çıkarılmış", blank: "The final report contains ___ conclusions." },
  { en: "The textbook explains the defined concepts clearly.", tr: "Ders kitabı tanımlanmış kavramları açıkça açıklıyor.", word: "defined", trWord: "tanımlanmış", blank: "The textbook explains the ___ concepts clearly." },
  { en: "The manager distributed the reallocated resources.", tr: "Yönetici yeniden tahsis edilmiş kaynakları dağıttı.", word: "reallocated", trWord: "yeniden tahsis edilmiş", blank: "The manager distributed the ___ resources." },
  { en: "Security guards protect the restricted areas.", tr: "Güvenlik görevlileri kısıtlanmış alanları korur.", word: "restricted", trWord: "kısıtlanmış", blank: "Security guards protect the ___ areas." },
  { en: "The school supports integrated technology in classrooms.", tr: "Okul sınıflarda entegre teknolojiyi destekliyor.", word: "integrated", trWord: "entegre", blank: "The school supports ___ technology in classrooms." },
  { en: "The interviewer spoke with selected individuals.", tr: "Görüşmeci seçilmiş bireylerle konuştu.", word: "selected", trWord: "seçilmiş", blank: "The interviewer spoke with ___ individuals." },
  { en: "The report describes the evaluated methods.", tr: "Rapor değerlendirilmiş yöntemleri tanımlar.", word: "evaluated", trWord: "değerlendirilmiş", blank: "The report describes the ___ methods." },
  { en: "Sustained growth is crucial for the economy.", tr: "Sürekli büyüme ekonomi için çok önemlidir.", word: "sustained", trWord: "sürekli", blank: "___ growth is crucial for the economy." },
  { en: "The library holds the published documents.", tr: "Kütüphane yayınlanmış belgeleri barındırır.", word: "published", trWord: "yayınlanmış", blank: "The library holds the ___ documents." },
  { en: "We studied the interpreted texts.", tr: "Yorumlanmış metinleri inceledik.", word: "interpreted", trWord: "yorumlanmış", blank: "We studied the ___ texts." },

  // Book Section XI A - 3 introductory examples
  { en: "stolen money", tr: "çalınmış para", word: "stolen", trWord: "çalınmış", blank: "___ money" },
  { en: "broken bones", tr: "kırılmış kemikler", word: "broken", trWord: "kırılmış", blank: "___ bones" },
  { en: "worn-out machines", tr: "eskitilmiş makineler", word: "worn-out", trWord: "eskitilmiş", blank: "___ machines" },

  // Book Section XI A - 20 phrases
  { en: "united nations", tr: "birleşmiş milletler", word: "united", trWord: "birleşmiş", blank: "___ nations" },
  { en: "cooked food", tr: "pişmiş yemek", word: "cooked", trWord: "pişmiş", blank: "___ food" },
  { en: "uncooked meat", tr: "pişmemiş et", word: "uncooked", trWord: "pişmemiş", blank: "___ meat" },
  { en: "simplified picture", tr: "basitleştirilmiş resim", word: "simplified", trWord: "basitleştirilmiş", blank: "___ picture" },
  { en: "improved methods", tr: "geliştirilmiş yöntemler", word: "improved", trWord: "geliştirilmiş", blank: "___ methods" },
  { en: "untried method", tr: "denenmemiş yöntem", word: "untried", trWord: "denenmemiş", blank: "___ method" },
  { en: "exposed wire", tr: "açıkta kalan tel", word: "exposed", trWord: "açıkta kalan", blank: "___ wire" },
  { en: "emitted rays", tr: "yayılmış ışınlar", word: "emitted", trWord: "yayılmış", blank: "___ rays" },
  { en: "uninhabited regions", tr: "insansız bölgeler", word: "uninhabited", trWord: "insansız", blank: "___ regions" },
  { en: "reduced volume", tr: "azaltılmış hacim", word: "reduced", trWord: "azaltılmış", blank: "___ volume" },
  { en: "exposed land", tr: "maruz kalmış toprak", word: "exposed", trWord: "maruz kalmış", blank: "___ land" },
  { en: "required material", tr: "gerekli malzeme", word: "required", trWord: "gerekli", blank: "___ material" },
  { en: "diseased trees", tr: "hastalıklı ağaçlar", word: "diseased", trWord: "hastalıklı", blank: "___ trees" },
  { en: "inhabited regions", tr: "insan yaşayan bölgeler", word: "inhabited", trWord: "insan yaşayan", blank: "___ regions" },
  { en: "forested areas", tr: "ormanlık alanlar", word: "forested", trWord: "ormanlık", blank: "___ areas" },
  { en: "unexposed plate", tr: "banyo edilmemiş levha", word: "unexposed", trWord: "banyo edilmemiş", blank: "___ plate" },
  { en: "diseased tissue", tr: "hastalıklı doku", word: "diseased", trWord: "hastalıklı", blank: "___ tissue" },
  { en: "broken vase", tr: "kırık vazo", word: "broken", trWord: "kırık", blank: "___ vase" },
  { en: "estimated cost", tr: "tahmin edilen maliyet", word: "estimated", trWord: "tahmin edilen", blank: "___ cost" },
  { en: "unemployed personnel", tr: "işsiz personel", word: "unemployed", trWord: "işsiz", blank: "___ personnel" },

  // Book Section XI A - 20 sentences
  { en: "The United Nations have recognized the new government.", tr: "Birleşmiş Milletler yeni hükümeti tanıdı.", word: "united", trWord: "birleşmiş", blank: "The ___ Nations have recognized the new government." },
  { en: "Cooked foods were unknown before the discovery of fire.", tr: "Pişmiş yemekler ateşin keşfinden önce bilinmiyordu.", word: "cooked", trWord: "pişmiş", blank: "___ foods were unknown before the discovery of fire." },
  { en: "This disease is transmitted in uncooked meat.", tr: "Bu hastalık pişmemiş ette taşınır.", word: "uncooked", trWord: "pişmemiş", blank: "This disease is transmitted in ___ meat." },
  { en: "The book is illustrated with simplified pictures for children.", tr: "Kitap çocuklar için basitleştirilmiş resimlerle resimlendirilmiştir.", word: "simplified", trWord: "basitleştirilmiş", blank: "The book is illustrated with ___ pictures for children." },
  { en: "Improved methods of agriculture were introduced.", tr: "Geliştirilmiş tarım yöntemleri uygulamaya konuldu.", word: "improved", trWord: "geliştirilmiş", blank: "___ methods of agriculture were introduced." },
  { en: "The exposed wire caused a fire in the roof.", tr: "Açıkta kalan tel çatıda yangına neden oldu.", word: "exposed", trWord: "açıkta kalan", blank: "The ___ wire caused a fire in the roof." },
  { en: "The emitted rays penetrate the cells.", tr: "Yayılan ışınlar hücrelere nüfuz eder.", word: "emitted", trWord: "yayılan", blank: "The ___ rays penetrate the cells." },
  { en: "There are a large number of uninhabited regions.", tr: "Çok sayıda insansız bölge vardır.", word: "uninhabited", trWord: "insansız", blank: "There are a large number of ___ regions." },
  { en: "The reduced volume is measured after cooling.", tr: "Azaltılmış hacim soğutmadan sonra ölçülür.", word: "reduced", trWord: "azaltılmış", blank: "The ___ volume is measured after cooling." },
  { en: "Exposed land will be subject to erosion.", tr: "Maruz kalan toprak erozyona maruz kalacaktır.", word: "exposed", trWord: "maruz kalan", blank: "___ land will be subject to erosion." },
  { en: "The required material is imported from Germany.", tr: "Gerekli malzeme Almanya'dan ithal edilmektedir.", word: "required", trWord: "gerekli", blank: "The ___ material is imported from Germany." },
  { en: "The surgeon hesitated to use an untried method for the heart operation.", tr: "Cerrah kalp ameliyatı için denenmemiş bir yöntem kullanmakta tereddüt etti.", word: "untried", trWord: "denenmemiş", blank: "The surgeon hesitated to use an ___ method for the heart operation." },
  { en: "Diseased trees should be removed as soon as possible.", tr: "Hastalıklı ağaçlar mümkün olan en kısa sürede kaldırılmalıdır.", word: "diseased", trWord: "hastalıklı", blank: "___ trees should be removed as soon as possible." },
  { en: "The disease spread quickly through most of the inhabited regions.", tr: "Hastalık insan yaşayan bölgelerin çoğuna hızla yayıldı.", word: "inhabited", trWord: "insan yaşayan", blank: "The disease spread quickly through most of the ___ regions." },
  { en: "Inhabitants of the forested areas have a milder climate.", tr: "Ormanlık alanların sakinleri daha ılıman bir iklime sahiptir.", word: "forested", trWord: "ormanlık", blank: "Inhabitants of the ___ areas have a milder climate." },
  { en: "The marks could be seen on the unexposed plate.", tr: "İşaretler banyo edilmemiş levha üzerinde görülebilirdi.", word: "unexposed", trWord: "banyo edilmemiş", blank: "The marks could be seen on the ___ plate." },
  { en: "Diseased tissue must be removed as soon as possible.", tr: "Hastalıklı doku mümkün olan en kısa sürede kaldırılmalıdır.", word: "diseased", trWord: "hastalıklı", blank: "___ tissue must be removed as soon as possible." },
  { en: "A broken vase was excavated from the foundation of the temple.", tr: "Tapınağın temelinden kırık bir vazo çıkarıldı.", word: "broken", trWord: "kırık", blank: "A ___ vase was excavated from the foundation of the temple." },
  { en: "The finished product was more expensive than the estimated cost.", tr: "Bitmiş ürün tahmin edilen maliyetten daha pahalıydı.", word: "estimated", trWord: "tahmin edilen", blank: "The finished product was more expensive than the ___ cost." },
  { en: "The welfare workers are concerned about the number of unemployed personnel.", tr: "Sosyal yardım çalışanları işsiz personelin sayısından endişe duymaktadır.", word: "unemployed", trWord: "işsiz", blank: "The welfare workers are concerned about the number of ___ personnel." }
];

const unit5Lesson15SentencesRaw = [
  // User's sheet (2. Kısım) - 20 phrases
  { en: "a highly analyzed data", tr: "son derece analiz edilmiş veri", word: "highly", trWord: "son derece", blank: "a ___ analyzed data" },
  { en: "a densely populated area", tr: "yoğun nüfuslu bir bölge", word: "densely", trWord: "yoğun", blank: "a ___ populated area" },
  { en: "an over-estimated revenue", tr: "aşırı tahmin edilmiş gelir", word: "over-estimated", trWord: "aşırı tahmin edilmiş", blank: "an ___ revenue" },
  { en: "an under-estimated cost", tr: "yetersiz tahmin edilmiş maliyet", word: "under-estimated", trWord: "yetersiz tahmin edilmiş", blank: "an ___ cost" },
  { en: "a well-structured approach", tr: "iyi yapılandırılmış bir yaklaşım", word: "well-structured", trWord: "iyi yapılandırılmış", blank: "a ___ approach" },
  { en: "a politically motivated policy", tr: "siyasi amaçlı bir politika", word: "politically", trWord: "siyasi amaçlı", blank: "a ___ motivated policy" },
  { en: "an inappropriately defined concept", tr: "uygunsuz şekilde tanımlanmış bir kavram", word: "inappropriately", trWord: "uygunsuz şekilde", blank: "an ___ defined concept" },
  { en: "a socially integrated technology", tr: "toplumsal olarak entegre edilmiş bir teknoloji", word: "socially", trWord: "toplumsal olarak", blank: "a ___ integrated technology" },
  { en: "a theoretically derived conclusion", tr: "teorik olarak çıkarılmış bir sonuç", word: "theoretically", trWord: "teorik olarak", blank: "a ___ derived conclusion" },
  { en: "an under-resourced sector", tr: "yetersiz kaynak aktarılmış bir sektör", word: "under-resourced", trWord: "yetersiz kaynak aktarılmış", blank: "an ___ sector" },
  { en: "a legally binding contract", tr: "yasal olarak bağlayıcı bir sözleşme", word: "legally", trWord: "yasal olarak", blank: "a ___ binding contract" },
  { en: "a carefully selected individual", tr: "dikkatle seçilmiş bir birey", word: "carefully", trWord: "dikkatle", blank: "a ___ selected individual" },
  { en: "a rigorously evaluated method", tr: "titizlikle değerlendirilmiş bir yöntem", word: "rigorously", trWord: "titizlikle", blank: "a ___ evaluated method" },
  { en: "a firmly established principle", tr: "sağlam bir şekilde kurulmuş bir ilke", word: "firmly", trWord: "sağlam bir şekilde", blank: "a ___ established principle" },
  { en: "a genetically modified organism", tr: "genetiği değiştirilmiş bir organizma", word: "genetically", trWord: "genetiği", blank: "a ___ modified organism" },
  { en: "a highly responsive authority", tr: "son derece duyarlı bir otorite", word: "highly", trWord: "son derece", blank: "a ___ responsive authority" },
  { en: "a contextually interpreted text", tr: "bağlamsal olarak yorumlanmış bir metin", word: "contextually", trWord: "bağlamsal olarak", blank: "a ___ interpreted text" },
  { en: "a structurally unstable framework", tr: "yapısal olarak kararsız bir çerçeve", word: "structurally", trWord: "yapısal olarak", blank: "a ___ unstable framework" },
  { en: "an empirically validated hypothesis", tr: "deneysel olarak doğrulanmış bir hipotez", word: "empirically", trWord: "deneysel olarak", blank: "an ___ validated hypothesis" },
  { en: "a well-coordinated team", tr: "iyi koordine edilmiş bir ekip", word: "well-coordinated", trWord: "iyi koordine edilmiş", blank: "a ___ team" },

  // User's sheet (2. Kısım) - 20 sentences
  { en: "The professor published a highly analyzed data set.", tr: "Profesör son derece analiz edilmiş bir veri seti yayınladı.", word: "highly", trWord: "son derece", blank: "The professor published a ___ analyzed data set." },
  { en: "Many people live in a densely populated area.", tr: "Birçok insan yoğun nüfuslu bir bölgede yaşıyor.", word: "densely", trWord: "yoğun", blank: "Many people live in a ___ populated area." },
  { en: "The company has an over-estimated revenue plan.", tr: "Şirketin aşırı tahmin edilmiş bir gelir planı var.", word: "over-estimated", trWord: "aşırı tahmin edilmiş", blank: "The company has an ___ revenue plan." },
  { en: "We need to avoid an under-estimated cost.", tr: "Yetersiz tahmin edilmiş bir maliyetten kaçınmamız gerekir.", word: "under-estimated", trWord: "yetersiz tahmin edilmiş", blank: "We need to avoid an ___ cost." },
  { en: "Teachers prefer a well-structured approach.", tr: "Öğretmenler iyi yapılandırılmış bir yaklaşımı tercih eder.", word: "well-structured", trWord: "iyi yapılandırılmış", blank: "Teachers prefer a ___ approach." },
  { en: "The government announced a politically motivated policy.", tr: "Hükümet siyasi amaçlı bir politika ilan etti.", word: "politically", trWord: "siyasi amaçlı", blank: "The government announced a ___ motivated policy." },
  { en: "This textbook contains an inappropriately defined concept.", tr: "Bu ders kitabı uygunsuz şekilde tanımlanmış bir kavram içeriyor.", word: "inappropriately", trWord: "uygunsuz şekilde", blank: "This textbook contains an ___ defined concept." },
  { en: "The project utilizes a socially integrated technology to connect people.", tr: "Proje insanları birbirine bağlamak için toplumsal olarak entegre edilmiş bir teknoloji kullanıyor.", word: "socially", trWord: "toplumsal olarak", blank: "The project utilizes a ___ integrated technology to connect people." },
  { en: "The scientist presented a theoretically derived conclusion at the seminar.", tr: "Bilim insanı seminerde teorik olarak çıkarılmış bir sonuç sundu.", word: "theoretically", trWord: "teorik olarak", blank: "The scientist presented a ___ derived conclusion at the seminar." },
  { en: "The government provided funding for an under-resourced sector.", tr: "Hükümet yetersiz kaynak aktarılmış bir sektör için fon sağladı.", word: "under-resourced", trWord: "yetersiz kaynak aktarılmış", blank: "The government provided funding for an ___ sector." },
  { en: "Both parties signed a legally binding contract yesterday.", tr: "Her iki taraf dün yasal olarak bağlayıcı bir sözleşme imzaladı.", word: "legally", trWord: "yasal olarak", blank: "Both parties signed a ___ binding contract yesterday." },
  { en: "The committee interviewed a carefully selected individual for the position.", tr: "Komite pozisyon için dikkatle seçilmiş bir bireyle görüştü.", word: "carefully", trWord: "dikkatle", blank: "The committee interviewed a ___ selected individual for the position." },
  { en: "The laboratory implemented a rigorously evaluated method for testing.", tr: "Laboratuvar test için titizlikle değerlendirilmiş bir yöntem uyguladı.", word: "rigorously", trWord: "titizlikle", blank: "The laboratory implemented a ___ evaluated method for testing." },
  { en: "We must follow a firmly established principle of physics.", tr: "Fiziğin sağlam bir şekilde kurulmuş bir ilkesini takip etmeliyiz.", word: "firmly", trWord: "sağlam bir şekilde", blank: "We must follow a ___ established principle of physics." },
  { en: "The farmer harvested a genetically modified organism in his fields.", tr: "Çiftçi tarlalarında genetiği değiştirilmiş bir organizma hasat etti.", word: "genetically", trWord: "genetiği", blank: "The farmer harvested a ___ modified organism in his fields." },
  { en: "Citizens demand help from a highly responsive authority.", tr: "Vatandaşlar son derece duyarlı bir otoriteden yardım talep ediyor.", word: "highly", trWord: "son derece", blank: "Citizens demand help from a ___ responsive authority." },
  { en: "The researcher analyzed a contextually interpreted text.", tr: "Araştırmacı bağlamsal olarak yorumlanmış bir metni analiz etti.", word: "contextually", trWord: "bağlamsal olarak", blank: "The researcher analyzed a ___ interpreted text." },
  { en: "The engineers rebuilt a structurally unstable framework.", tr: "Mühendisler yapısal olarak kararsız bir çerçeveyi yeniden inşa etti.", word: "structurally", trWord: "yapısal olarak", blank: "The engineers rebuilt a ___ unstable framework." },
  { en: "The research supports an empirically validated hypothesis.", tr: "Araştırma deneysel olarak doğrulanmış bir hipotezi destekliyor.", word: "empirically", trWord: "deneysel olarak", blank: "The research supports an ___ validated hypothesis." },
  { en: "The company relies on a well-coordinated team to succeed.", tr: "Şirket başarılı olmak için iyi koordine edilmiş bir ekibe güveniyor.", word: "well-coordinated", trWord: "iyi koordine edilmiş", blank: "The company relies on a ___ team to succeed." },

  // Book Section XI B - 1 intro example
  { en: "well-developed system", tr: "iyi gelişmiş sistem", word: "well-developed", trWord: "iyi gelişmiş", blank: "___ system" },

  // Book Section XI B - 22 phrases
  { en: "a densely populated area", tr: "yoğun nüfuslu bir alan", word: "densely", trWord: "yoğun", blank: "a ___ populated area" },
  { en: "an over-populated area", tr: "aşırı nüfuslu bir alan", word: "over-populated", trWord: "aşırı nüfuslu", blank: "an ___ area" },
  { en: "an under-populated area", tr: "yetersiz nüfuslu bir alan", word: "under-populated", trWord: "yetersiz nüfuslu", blank: "an ___ area" },
  { en: "a well-developed muscle", tr: "iyi gelişmiş bir kas", word: "well-developed", trWord: "iyi gelişmiş", blank: "a ___ muscle" },
  { en: "an over-developed muscle", tr: "aşırı gelişmiş bir kas", word: "over-developed", trWord: "aşırı gelişmiş", blank: "an ___ muscle" },
  { en: "an under-developed muscle", tr: "yetersiz gelişmiş bir kas", word: "under-developed", trWord: "yetersiz gelişmiş", blank: "an ___ muscle" },
  { en: "a well-known fact", tr: "iyi bilinen bir gerçek", word: "well-known", trWord: "iyi bilinen", blank: "a ___ fact" },
  { en: "a better known fact", tr: "daha iyi bilinen bir gerçek", word: "better", trWord: "daha iyi", blank: "a ___ known fact" },
  { en: "a little known fact", tr: "az bilinen bir gerçek", word: "little", trWord: "az", blank: "a ___ known fact" },
  { en: "a newly-formed compound", tr: "yeni oluşmuş bir bileşik", word: "newly-formed", trWord: "yeni oluşmuş", blank: "a ___ compound" },
  { en: "a newly-planted tree", tr: "yeni dikilmiş bir ağaç", word: "newly-planted", trWord: "yeni dikilmiş", blank: "a ___ tree" },
  { en: "recently-introduced methods", tr: "yakın zamanda uygulamaya konulmuş yöntemler", word: "recently-introduced", trWord: "yakın zamanda uygulamaya konulmuş", blank: "___ methods" },
  { en: "well-developed roots", tr: "iyi gelişmiş kökler", word: "well-developed", trWord: "iyi gelişmiş", blank: "___ roots" },
  { en: "under-developed countries", tr: "az gelişmiş ülkeler", word: "under-developed", trWord: "az gelişmiş", blank: "___ countries" },
  { en: "the newly discovered species", tr: "yeni keşfedilmiş türler", word: "newly", trWord: "yeni", blank: "the ___ discovered species" },
  { en: "the recently won peace", tr: "yakın zamanda kazanılmış barış", word: "recently", trWord: "yakın zamanda", blank: "the ___ won peace" },
  { en: "greatly reduced volume", tr: "büyük ölçüde azaltılmış hacim", word: "greatly", trWord: "büyük ölçüde", blank: "___ reduced volume" },
  { en: "some little-inhabited regions", tr: "az yerleşilmiş bazı bölgeler", word: "little-inhabited", trWord: "az yerleşilmiş", blank: "some ___ regions" },
  { en: "greatly improved methods", tr: "büyük ölçüde geliştirilmiş yöntemler", word: "greatly", trWord: "büyük ölçüde", blank: "___ improved methods" },
  { en: "an over-simplified diagram", tr: "aşırı basitleştirilmiş bir şema", word: "over-simplified", trWord: "aşırı basitleştirilmiş", blank: "an ___ diagram" },
  { en: "badly managed programme", tr: "kötü yönetilen program", word: "badly", trWord: "kötü", blank: "___ managed programme" },
  { en: "a badly-developed organ", tr: "kötü gelişmiş bir organ", word: "badly-developed", trWord: "kötü gelişmiş", blank: "a ___ organ" },

  // Book Section XI B - corresponding sentences
  { en: "They introduced a well-developed system in the factory.", tr: "Fabrikada iyi gelişmiş bir sistem kurdular.", word: "well-developed", trWord: "iyi gelişmiş", blank: "They introduced a ___ in the factory." },
  { en: "We live in a densely populated area.", tr: "Yoğun nüfuslu bir alanda yaşıyoruz.", word: "densely", trWord: "yoğun", blank: "We live in a ___ populated area." },
  { en: "Traffic is a major problem in an over-populated area.", tr: "Aşırı nüfuslu bir alanda trafik büyük bir sorundur.", word: "over-populated", trWord: "aşırı nüfuslu", blank: "Traffic is a major problem in an ___ area." },
  { en: "The government encourages migration to an under-populated area.", tr: "Hükümet yetersiz nüfuslu bir alana göçü teşvik ediyor.", word: "under-populated", trWord: "yetersiz nüfuslu", blank: "The government encourages migration to an ___ area." },
  { en: "Regular exercise results in a well-developed muscle.", tr: "Düzenli egzersiz iyi gelişmiş bir kasla sonuçlanır.", word: "well-developed", trWord: "iyi gelişmiş", blank: "Regular exercise results in a ___ muscle." },
  { en: "The athlete has an over-developed muscle in his leg.", tr: "Sporcunun bacağında aşırı gelişmiş bir kas var.", word: "over-developed", trWord: "aşırı gelişmiş", blank: "The athlete has an ___ muscle in his leg." },
  { en: "Malnutrition can cause an under-developed muscle.", tr: "Yetersiz beslenme yetersiz gelişmiş bir kasa neden olabilir.", word: "under-developed", trWord: "yetersiz gelişmiş", blank: "Malnutrition can cause an ___ muscle." },
  { en: "It is a well-known fact that water freezes at zero degrees.", tr: "Suyun sıfır derecede donduğu iyi bilinen bir gerçektir.", word: "well-known", trWord: "iyi bilinen", blank: "It is a ___ fact that water freezes at zero degrees." },
  { en: "This is a better known fact among researchers.", tr: "Bu, araştırmacılar arasında daha iyi bilinen bir gerçektir.", word: "better", trWord: "daha iyi", blank: "This is a ___ known fact among researchers." },
  { en: "The history of this tribe is a little known fact.", tr: "Bu kabilenin tarihi az bilinen bir gerçektir.", word: "little", trWord: "az", blank: "The history of this tribe is a ___ known fact." },
  { en: "The chemist analyzed a newly-formed compound.", tr: "Kimyager yeni oluşmuş bir bileşiği analiz etti.", word: "newly-formed", trWord: "yeni oluşmuş", blank: "The chemist analyzed a ___ compound." },
  { en: "The gardener watered a newly-planted tree.", tr: "Bahçıvan yeni dikilmiş bir ağacı suladı.", word: "newly-planted", trWord: "yeni dikilmiş", blank: "The gardener watered a ___ tree." },
  { en: "We must adapt to recently-introduced methods.", tr: "Yakın zamanda uygulamaya konulmuş yöntemlere uyum sağlamalıyız.", word: "recently-introduced", trWord: "yakın zamanda uygulamaya konulmuş", blank: "We must adapt to ___ methods." },
  { en: "These desert plants have well-developed roots.", tr: "Bu çöl bitkilerinin iyi gelişmiş kökleri vardır.", word: "well-developed", trWord: "iyi gelişmiş", blank: "These desert plants have ___ roots." },
  { en: "International organizations help under-developed countries.", tr: "Uluslararası kuruluşlar az gelişmiş ülkelere yardım eder.", word: "under-developed", trWord: "az gelişmiş", blank: "International organizations help ___ countries." },
  { en: "The biologist cataloged the newly discovered species.", tr: "Biyolog yeni keşfedilmiş türleri katalogladı.", word: "newly", trWord: "yeni", blank: "The biologist cataloged the ___ discovered species." },
  { en: "Politicians want to protect the recently won peace.", tr: "Politikacılar yakın zamanda kazanılmış barışı korumak istiyorlar.", word: "recently", trWord: "yakın zamanda", blank: "Politicians want to protect the ___ won peace." },
  { en: "The pressure drop led to a greatly reduced volume.", tr: "Basınç düşüşü büyük ölçüde azaltılmış bir hacme yol açtı.", word: "greatly", trWord: "büyük ölçüde", blank: "The pressure drop led to a ___ volume." },
  { en: "Nomads live in some little-inhabited regions of the desert.", tr: "Göçebeler çölün az yerleşilmiş bazı bölgelerinde yaşarlar.", word: "little-inhabited", trWord: "az yerleşilmiş", blank: "Nomads live in some ___ regions of the desert." },
  { en: "The laboratory uses greatly improved methods for testing.", tr: "Laboratuvar test için büyük ölçüde geliştirilmiş yöntemler kullanır.", word: "greatly", trWord: "büyük ölçüde", blank: "The laboratory uses ___ improved methods for testing." },
  { en: "Do not rely on an over-simplified diagram.", tr: "Aşırı basitleştirilmiş bir şemaya güvenmeyin.", word: "over-simplified", trWord: "aşırı basitleştirilmiş", blank: "Do not rely on an ___ diagram." },
  { en: "The loss of funding resulted in a badly managed programme.", tr: "Fon kaybı kötü yönetilen bir programla sonuçlandı.", word: "badly", trWord: "kötü", blank: "The loss of funding resulted in a ___ managed programme." },
  { en: "The doctor diagnosed a badly-developed organ in the patient.", tr: "Doktor hastada kötü gelişmiş bir organ teşhis etti.", word: "badly-developed", trWord: "kötü gelişmiş", blank: "The doctor diagnosed a ___ organ in the patient." }
];

function buildUnit5CustomExercise(sentences, unitId, lessonId, exId) {
  return buildUnit3CustomExercise(sentences, unitId, lessonId, exId);
}

const unit5Lesson14Exercises = {
  exercises: [
    {
      id: "u5l14ex1",
      title: "Alıştırma 1: Geçmiş Ortaç Sıfatı I",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (1-16)",
      questions: buildUnit5CustomExercise(unit5Lesson14SentencesRaw.slice(0, 16), 5, 14, 1)
    },
    {
      id: "u5l14ex2",
      title: "Alıştırma 2: Geçmiş Ortaç Sıfatı II",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (11-26)",
      questions: buildUnit5CustomExercise(unit5Lesson14SentencesRaw.slice(10, 26), 5, 14, 2)
    },
    {
      id: "u5l14ex3",
      title: "Alıştırma 3: Geçmiş Ortaç Sıfatı III",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (21-36)",
      questions: buildUnit5CustomExercise(unit5Lesson14SentencesRaw.slice(20, 36), 5, 14, 3)
    },
    {
      id: "u5l14ex4",
      title: "Alıştırma 4: Geçmiş Ortaç Sıfatı IV",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (31-46)",
      questions: buildUnit5CustomExercise(unit5Lesson14SentencesRaw.slice(30, 46), 5, 14, 4)
    },
    {
      id: "u5l14ex5",
      title: "Alıştırma 5: Geçmiş Ortaç Sıfatı V",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (41-56)",
      questions: buildUnit5CustomExercise(unit5Lesson14SentencesRaw.slice(40, 56), 5, 14, 5)
    },
    {
      id: "u5l14ex6",
      title: "Alıştırma 6: Geçmiş Ortaç Sıfatı VI",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (51-66)",
      questions: buildUnit5CustomExercise(unit5Lesson14SentencesRaw.slice(50, 66), 5, 14, 6)
    },
    {
      id: "u5l14ex7",
      title: "Alıştırma 7: Geçmiş Ortaç Sıfatı VII",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (61-76)",
      questions: buildUnit5CustomExercise(unit5Lesson14SentencesRaw.slice(60, 76), 5, 14, 7)
    },
    {
      id: "u5l14ex8",
      title: "Alıştırma 8: Geçmiş Ortaç Sıfatı VIII",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (68-83)",
      questions: buildUnit5CustomExercise(unit5Lesson14SentencesRaw.slice(67, 83), 5, 14, 8)
    }
  ]
};

const unit5Lesson15Exercises = {
  exercises: [
    {
      id: "u5l15ex1",
      title: "Alıştırma 1: Zarf + Geçmiş Ortaç I",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (1-16)",
      questions: buildUnit5CustomExercise(unit5Lesson15SentencesRaw.slice(0, 16), 5, 15, 1)
    },
    {
      id: "u5l15ex2",
      title: "Alıştırma 2: Zarf + Geçmiş Ortaç II",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (11-26)",
      questions: buildUnit5CustomExercise(unit5Lesson15SentencesRaw.slice(10, 26), 5, 15, 2)
    },
    {
      id: "u5l15ex3",
      title: "Alıştırma 3: Zarf + Geçmiş Ortaç III",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (21-36)",
      questions: buildUnit5CustomExercise(unit5Lesson15SentencesRaw.slice(20, 36), 5, 15, 3)
    },
    {
      id: "u5l15ex4",
      title: "Alıştırma 4: Zarf + Geçmiş Ortaç IV",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (31-46)",
      questions: buildUnit5CustomExercise(unit5Lesson15SentencesRaw.slice(30, 46), 5, 15, 4)
    },
    {
      id: "u5l15ex5",
      title: "Alıştırma 5: Zarf + Geçmiş Ortaç V",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (41-56)",
      questions: buildUnit5CustomExercise(unit5Lesson15SentencesRaw.slice(40, 56), 5, 15, 5)
    },
    {
      id: "u5l15ex6",
      title: "Alıştırma 6: Zarf + Geçmiş Ortaç VI",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (51-66)",
      questions: buildUnit5CustomExercise(unit5Lesson15SentencesRaw.slice(50, 66), 5, 15, 6)
    },
    {
      id: "u5l15ex7",
      title: "Alıştırma 7: Zarf + Geçmiş Ortaç VII",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (61-76)",
      questions: buildUnit5CustomExercise(unit5Lesson15SentencesRaw.slice(60, 76), 5, 15, 7)
    },
    {
      id: "u5l15ex8",
      title: "Alıştırma 8: Zarf + Geçmiş Ortaç VIII",
      description: "Eşleştirme, Çoktan Seçmeli, Kelime Havuzu ve Yazma (71-86)",
      questions: buildUnit5CustomExercise(unit5Lesson15SentencesRaw.slice(70, 86), 5, 15, 8)
    }
  ]
};

const units = [];
const lessons = [];
let globalLessonCounter = 1;

const unitSentencesMap = {
  1: {
    1: unit1IntroSentences,
    2: unit1Lesson2Exercises,
    3: unit1Lesson3Exercises,
    4: unit1Lesson4Exercises,
    5: unit1Lesson5Exercises,
    6: unit1Lesson6Exercises,
    7: unit1Lesson7Exercises
  },
  2: {
    1: unit2Lesson1Exercises,
    2: unit2Lesson2Exercises
  },
  3: {
    1: unit3Lesson10Exercises,
    2: unit3Lesson11Exercises
  },
  4: {
    1: unit4Lesson12Exercises,
    2: unit4Lesson13Exercises
  },
  5: {
    1: unit5Lesson14Exercises,
    2: unit5Lesson15Exercises
  },
  6: {
    1: { exercises: [buildCustom15QuestionExercises(unit6Lesson1SentencesRaw, 6, 16, 1, 0), buildCustom15QuestionExercises(unit6Lesson1SentencesRaw, 6, 16, 2, 5)] },
    2: { exercises: [buildCustom15QuestionExercises(unit6Lesson2SentencesRaw, 6, 17, 1, 0), buildCustom15QuestionExercises(unit6Lesson2SentencesRaw, 6, 17, 2, 1)] },
    3: { exercises: [buildCustom15QuestionExercises(unit6Lesson3SentencesRaw, 6, 18, 1, 0), buildCustom15QuestionExercises(unit6Lesson3SentencesRaw, 6, 18, 2, 1)] },
    4: { exercises: [buildCustom15QuestionExercises(unit6Lesson4SentencesRaw, 6, 19, 1, 0), buildCustom15QuestionExercises(unit6Lesson4SentencesRaw, 6, 19, 2, 1)] }
  },
  7: {
    1: {
      exercises: [
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 1, 0),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 2, 10),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 3, 20),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 4, 30),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 5, 40),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 6, 50),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 7, 60),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 8, 70),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 9, 80),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 10, 90),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 11, 100),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 12, 110)
      ]
    }
  },
  8: {
    1: unit8Lesson1Exercises,
    2: unit8Lesson2Exercises
  },
  9: {
    1: { exercises: [
      buildCustom10QuestionExercises(unit9Lesson1SentencesRaw, 9, 23, 1, 0),
      buildCustom10QuestionExercises(unit9Lesson1SentencesRaw, 9, 23, 2, 10),
      buildCustom10QuestionExercises(unit9Lesson1SentencesRaw, 9, 23, 3, 20)
    ] },
    2: { exercises: [
      buildCustom10QuestionExercises(unit9Lesson2SentencesRaw, 9, 24, 1, 0),
      buildCustom10QuestionExercises(unit9Lesson2SentencesRaw, 9, 24, 2, 10),
      buildCustom10QuestionExercises(unit9Lesson2SentencesRaw, 9, 24, 3, 20)
    ] },
    3: { exercises: [
      buildCustom10QuestionExercises(unit9Lesson3SentencesRaw, 9, 25, 1, 0),
      buildCustom10QuestionExercises(unit9Lesson3SentencesRaw, 9, 25, 2, 10),
      buildCustom10QuestionExercises(unit9Lesson3SentencesRaw, 9, 25, 3, 20)
    ] },
    4: { exercises: [
      buildCustom10QuestionExercises(unit9Lesson4SentencesRaw, 9, 26, 1, 0),
      buildCustom10QuestionExercises(unit9Lesson4SentencesRaw, 9, 26, 2, 10),
      buildCustom10QuestionExercises(unit9Lesson4SentencesRaw, 9, 26, 3, 20)
    ] },
    5: { exercises: [
      buildCustom10QuestionExercises(unit9Lesson5SentencesRaw, 9, 27, 1, 0),
      buildCustom10QuestionExercises(unit9Lesson5SentencesRaw, 9, 27, 2, 10),
      buildCustom10QuestionExercises(unit9Lesson5SentencesRaw, 9, 27, 3, 20)
    ] }
  },
    10: {
    1: { exercises: [
      buildCustom10QuestionExercises(unit10LessonSentences[1], 10, 28, 1, 0),
      buildCustom10QuestionExercises(unit10LessonSentences[1], 10, 28, 2, 10)
    ] },
    2: { exercises: [
      buildCustom10QuestionExercises(unit10LessonSentences[2], 10, 29, 1, 0)
    ] },
    3: { exercises: [
      buildCustom10QuestionExercises(unit10LessonSentences[3], 10, 30, 1, 0),
      buildCustom10QuestionExercises(unit10LessonSentences[3], 10, 30, 2, 10)
    ] },
    4: { exercises: [
      buildCustom10QuestionExercises(unit10LessonSentences[4], 10, 31, 1, 0),
      buildCustom10QuestionExercises(unit10LessonSentences[4], 10, 31, 2, 10),
      buildCustom10QuestionExercises(unit10LessonSentences[4], 10, 31, 3, 20)
    ] }
  },
    11: {
      1: { exercises: [
        buildCustom10QuestionExercises(unit11LessonSentences[1], 11, 32, 1, 0),
        buildCustom10QuestionExercises(unit11LessonSentences[1], 11, 32, 2, 10),
        buildCustom10QuestionExercises(unit11LessonSentences[1], 11, 32, 3, 20)
      ] },
      2: { exercises: [
        buildCustom10QuestionExercises(unit11LessonSentences[2], 11, 33, 1, 0),
        buildCustom10QuestionExercises(unit11LessonSentences[2], 11, 33, 2, 10),
        buildCustom10QuestionExercises(unit11LessonSentences[2], 11, 33, 3, 20)
      ] },
      3: { exercises: [
        buildCustom10QuestionExercises(unit11LessonSentences[3], 11, 34, 1, 0),
        buildCustom10QuestionExercises(unit11LessonSentences[3], 11, 34, 2, 10),
        buildCustom10QuestionExercises(unit11LessonSentences[3], 11, 34, 3, 20)
      ] },
      4: { exercises: [
        buildCustom10QuestionExercises(unit11LessonSentences[4], 11, 35, 1, 0),
        buildCustom10QuestionExercises(unit11LessonSentences[4], 11, 35, 2, 10),
        buildCustom10QuestionExercises(unit11LessonSentences[4], 11, 35, 3, 20),
        buildCustom10QuestionExercises(unit11LessonSentences[4], 11, 35, 4, 30),
        buildCustom10QuestionExercises(unit11LessonSentences[4], 11, 35, 5, 40),
        buildCustom10QuestionExercises(unit11LessonSentences[4], 11, 35, 6, 50)
      ] },
      5: { exercises: [
        buildSplitPassiveExercises(unit11SplitPassiveSentences, 11, 36, 1, 0),
        buildSplitPassiveExercises(unit11SplitPassiveSentences, 11, 36, 2, 5),
        buildCustom10QuestionExercises(unit11SplitPassiveSentences, 11, 36, 3, 0),
        buildCustom10QuestionExercises(unit11SplitPassiveSentences, 11, 36, 4, 5)
      ] },
      6: { exercises: [
        buildSplitPassiveExercises(unit11SplitFullPassiveSentences, 11, 37, 1, 0),
        buildCustom10QuestionExercises(unit11SplitFullPassiveSentences, 11, 37, 2, 0)
      ] }
    },
  12: {
    1: { exercises: [
      buildCustom10QuestionExercises(unit12Lesson1SentencesRaw, 12, 30, 1, 0),
      buildCustom10QuestionExercises(unit12Lesson1SentencesRaw, 12, 30, 2, 10),
      buildCustom10QuestionExercises(unit12Lesson1SentencesRaw, 12, 30, 3, 20),
      buildCustom10QuestionExercises(unit12Lesson1SentencesRaw, 12, 30, 4, 25)
    ] },
    2: { exercises: [
      buildCustom10QuestionExercises(unit12Lesson2SentencesRaw, 12, 31, 1, 0),
      buildCustom10QuestionExercises(unit12Lesson2SentencesRaw, 12, 31, 2, 10),
      buildCustom10QuestionExercises(unit12Lesson2SentencesRaw, 12, 31, 3, 20),
      buildCustom10QuestionExercises(unit12Lesson2SentencesRaw, 12, 31, 4, 30),
      buildCustom10QuestionExercises(unit12Lesson2SentencesRaw, 12, 31, 5, 40),
      buildCustom10QuestionExercises(unit12Lesson2SentencesRaw, 12, 31, 6, 50),
      buildCustom10QuestionExercises(unit12Lesson2SentencesRaw, 12, 31, 7, 60),
      buildCustom10QuestionExercises(unit12Lesson2SentencesRaw, 12, 31, 8, 62)
    ] },
    3: { exercises: [
      buildCustom10QuestionExercises(unit12Lesson3SentencesRaw, 12, 32, 1, 0),
      buildCustom10QuestionExercises(unit12Lesson3SentencesRaw, 12, 32, 2, 10),
      buildCustom10QuestionExercises(unit12Lesson3SentencesRaw, 12, 32, 3, 20),
      buildCustom10QuestionExercises(unit12Lesson3SentencesRaw, 12, 32, 4, 30),
      buildCustom10QuestionExercises(unit12Lesson3SentencesRaw, 12, 32, 5, 32)
    ] }
  },
  13: {
    1: { exercises: [] },
    2: { exercises: [] }
  },
  14: {
    1: { exercises: [] },
    2: { exercises: [] }
  },
  15: {
    1: { exercises: [] },
    2: { exercises: [] }
  },
  16: {
    1: { exercises: [
      buildCustom10QuestionExercises(unit16LessonSentences[1], 16, 39, 1, 0),
      buildCustom10QuestionExercises(unit16LessonSentences[1], 16, 39, 2, 10),
      buildCustom10QuestionExercises(unit16LessonSentences[1], 16, 39, 3, 20),
      buildCustom10QuestionExercises(unit16LessonSentences[1], 16, 39, 4, 30),
      buildCustom10QuestionExercises(unit16LessonSentences[1], 16, 39, 5, 40)
    ] }
  },
  17: {
    1: { exercises: [
      buildCustom10QuestionExercises(unit17Lesson1SentencesRaw, 17, 40, 1, 0),
      buildCustom10QuestionExercises(unit17Lesson1SentencesRaw, 17, 40, 2, 10),
      buildCustom10QuestionExercises(unit17Lesson1SentencesRaw, 17, 40, 3, 20),
      buildCustom10QuestionExercises(unit17Lesson1SentencesRaw, 17, 40, 4, 30)
    ] },
    2: { exercises: [
      buildCustom10QuestionExercises(unit17Lesson2SentencesRaw, 17, 41, 1, 0),
      buildCustom10QuestionExercises(unit17Lesson2SentencesRaw, 17, 41, 2, 10),
      buildCustom10QuestionExercises(unit17Lesson2SentencesRaw, 17, 41, 3, 20),
      buildCustom10QuestionExercises(unit17Lesson2SentencesRaw, 17, 41, 4, 30)
    ] },
    3: { exercises: [
      buildCustom10QuestionExercises(unit17Lesson3SentencesRaw, 17, 42, 1, 0),
      buildCustom10QuestionExercises(unit17Lesson3SentencesRaw, 17, 42, 2, 10),
      buildCustom10QuestionExercises(unit17Lesson3SentencesRaw, 17, 42, 3, 20),
      buildCustom10QuestionExercises(unit17Lesson3SentencesRaw, 17, 42, 4, 30)
    ] }
  },
  18: {
    1: { exercises: [] }
  },
  19: {
    1: { exercises: [] },
    2: { exercises: [] },
    3: { exercises: [] },
    4: { exercises: [] },
    5: { exercises: [] },
    6: { exercises: [] },
    7: { exercises: [] }
  },
  20: {
    1: { exercises: [] },
    2: { exercises: [] },
    3: { exercises: [] }
  },
  21: {
    1: { exercises: [] },
    2: { exercises: [] },
    3: { exercises: [] },
    4: { exercises: [] },
    5: { exercises: [] },
    6: { exercises: [] },
    7: { exercises: [] }
  },
  22: {
    1: { exercises: [] },
    2: { exercises: [] },
    3: { exercises: [] },
    4: { exercises: [] }
  },
  23: {
    1: { exercises: [] }
  },
  24: {
    1: { exercises: [] }
  },
  25: {
    1: { exercises: [] }
  }
};

rawTopics.forEach((topic, uIdx) => {
  // Clean page numbers and replace "takım" and "strüktür" with "yapı" in title, desc, and subtitles
  if (topic.title) {
    topic.title = topic.title
      .replace(/^[IVXLCDM]+\.\s*/, "")
      .replace(/Takımları/g, "Yapıları")
      .replace(/takımları/g, "yapıları")
      .replace(/Takımı/g, "Yapısı")
      .replace(/takımı/g, "yapısı")
      .replace(/Strüktürleri/g, "Yapıları")
      .replace(/strüktürleri/g, "yapıları")
      .replace(/Strüktürü/g, "Yapısı")
      .replace(/strüktürü/g, "yapısı")
      .replace(/Strüktürel/g, "Yapısal")
      .replace(/strüktürel/g, "yapısal")
      .replace(/Strüktür/g, "Yapı")
      .replace(/strüktür/g, "yapı");
  }
  if (topic.desc) {
    topic.desc = topic.desc
      .replace(/takımları/g, "yapıları")
      .replace(/takımlı/g, "yapılı")
      .replace(/takımı/g, "yapısı")
      .replace(/strüktürleri/g, "yapıları")
      .replace(/strüktürel/g, "yapısal")
      .replace(/strüktür/g, "yapı");
  }
  if (topic.subtitles) {
    topic.subtitles = topic.subtitles.map(sub => sub
      .replace(/Takımlarına/g, "Yapılarına")
      .replace(/takımlarına/g, "yapılarına")
      .replace(/Takımları/g, "Yapıları")
      .replace(/takımları/g, "yapıları")
      .replace(/Takımı/g, "Yapısı")
      .replace(/takımı/g, "yapısı")
      .replace(/Strüktürleri/g, "Yapıları")
      .replace(/strüktürleri/g, "yapıları")
      .replace(/Strüktürü/g, "Yapısı")
      .replace(/strüktürü/g, "yapısı")
      .replace(/Strüktürel/g, "Yapısal")
      .replace(/strüktürel/g, "yapısal")
      .replace(/Strüktür/g, "Yapı")
      .replace(/strüktür/g, "yapı")
    );
  }

  const unitId = uIdx + 1;
  const numLessons = topic.numLessons;
  const unitLessonIds = [];
  for (let l = 0; l < numLessons; l++) {
    unitLessonIds.push(globalLessonCounter + l);
  }

  // Üniteyi oluştur
  units.push({
    id: unitId,
    title: topic.title,
    description: topic.desc,
    lessons: unitLessonIds
  });

  for (let lIdx = 0; lIdx < numLessons; lIdx++) {
    const lessonId = globalLessonCounter + lIdx;
    
    // Ders indeksine göre soruları dinamik oluştur veya doğrudan soru listesini ekle
    const questions = [];
    let lessonExercises = null;
    const unitSentsObj = unitSentencesMap[unitId];

    if (unitSentsObj && unitSentsObj[lIdx + 1]) {
      const data = unitSentsObj[lIdx + 1];
      if (data && typeof data === 'object' && !Array.isArray(data) && data.exercises) {
        // Ders altında birden fazla alıştırma (exercise) tanımlanmış
        lessonExercises = data.exercises.map(ex => ({
          id: ex.id,
          title: ex.title,
          description: ex.description || "",
          questions: ex.questions || []
        }));
      } else if (Array.isArray(data) && data.length > 0) {
        lessonExercises = generateDynamicExercises(unitId, lessonId, data);
        if (data[0].type || data[0].id) {
          questions.push(...data);
        } else {
          questions.push(...buildInterleavedQuestions(unitId, lessonId, data));
        }
      }
    }

    // İsim tamlaması ünitesinde çoklu boşluk doldurma sorusu ekle
    if (unitId === 3 && lIdx === 0) {
      questions.push({
        id: `u3l1_multi_fb`,
        type: "multiple-fill-blank",
        prompt: "Fill in the Blanks:",
        sentence: "An objection is a ___ between smth that a ___ wants and something that you, in their opinion, ___.",
        corrects: ["clash", "customer", "dislike"],
        translation: "İtiraz, müşterinin istediği şey ile sizin onun fikrince hoşlanmadığınız şey arasındaki çatışmadır."
      });
    }

    const subtitle = topic.subtitles[lIdx] || "Ekstra Pratik";

    lessons.push({
      id: lessonId,
      title: `${lessonId}. Ders`,
      subtitle: subtitle,
      icon: lessonIcons[lessonId - 1] || "📖",
      unitId: unitId,
      questions: questions,
      exercises: lessonExercises,
      formula: topic.formulas && topic.formulas[lIdx] ? topic.formulas[lIdx].formula : "",
      example: topic.formulas && topic.formulas[lIdx] ? topic.formulas[lIdx].example : "",
      description: topic.formulas && topic.formulas[lIdx] ? (topic.formulas[lIdx].description || "") : ""
    });
  }
  globalLessonCounter += numLessons;
});

// ─── BAŞARIMLAR (ACHIEVEMENTS) ───────────────────────────
const achievements = [
  {
    id: "first_step",
    title: "İlk Adım",
    description: "İlk dersini tamamla",
    icon: "🎓",
    condition: (state) => state.completedLessons.length >= 1
  },
  {
    id: "word_hunter",
    title: "Kelime Avcısı",
    description: "5 ders tamamlayarak 50+ kelime öğren",
    icon: "📚",
    condition: (state) => state.completedLessons.length >= 5
  },
  {
    id: "century",
    title: "Yüz Yüze",
    description: "Tüm dersleri tamamlayarak 100+ kelime öğren",
    icon: "🏅",
    condition: (state) => state.completedLessons.length >= 32
  },
  {
    id: "streak_master",
    title: "Seri Ustası",
    description: "7 gün üst üste ders yap",
    icon: "🔥",
    condition: (state) => state.streak >= 7
  },
  {
    id: "night_owl",
    title: "Gece Kuşu",
    description: "Gece 22:00'den sonra bir ders tamamla",
    icon: "🦉",
    condition: (state) => state.nightOwlTriggered === true
  },
  {
    id: "perfectionist",
    title: "Mükemmeliyetçi",
    description: "Bir dersi hiç can kaybetmeden bitir",
    icon: "💎",
    condition: (state) => state.perfectLessonTriggered === true
  },
  {
    id: "warrior",
    title: "Savaşçı",
    description: "Can bittikten sonra puan ile can alıp derse devam et",
    icon: "⚔️",
    condition: (state) => state.warriorTriggered === true
  }
];

// Toplam soru sayısını hesaplayan yardımcı
function getTotalQuestions() {
  return lessons.reduce((sum, l) => sum + l.questions.length, 0);
}

const placementQuestions = [
  {
    id: "p1",
    type: "multiple-choice",
    prompt: "Aşağıdakilerden hangisi 'Hello' kelimesinin Türkçe karşılığıdır?",
    options: ["Görüşürüz", "Merhaba", "Lütfen", "Teşekkürler"],
    correctIndex: 1
  },
  {
    id: "p2",
    type: "fill-blank",
    prompt: "She ___ playing tennis right now.",
    options: ["am", "is", "are", "be"],
    correctIndex: 1
  },
  {
    id: "p3",
    type: "multiple-choice",
    prompt: "Aşağıdaki cümlede boşluğa gelecek doğru kelimeyi seçin: 'Yesterday, I ___ a new book.'",
    options: ["buy", "buys", "bought", "buying"],
    correctIndex: 2
  },
  {
    id: "p4",
    type: "multiple-choice",
    prompt: "Boşluğa en uygun kelimeyi seçin: 'Although it was raining, they decided to ___ for a walk.'",
    options: ["go", "going", "went", "gone"],
    correctIndex: 0
  },
  {
    id: "p5",
    type: "fill-blank",
    prompt: "Aşağıdaki cümleyi tamamlayın: 'If I had more time, I ___ learn another language.'",
    options: ["will", "would", "shall", "have"],
    correctIndex: 1
  }
];
