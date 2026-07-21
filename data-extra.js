(function() {
  if (typeof lessons === 'undefined') return;

  function makeMC(id, prompt, options, correctIndex, explanation) {
    return {
      id: id,
      type: "multiple-choice",
      prompt: prompt,
      options: options,
      correctIndex: correctIndex,
      explanation: explanation
    };
  }

  // ==========================================
  // BÖLÜM 52 UZANTILARI (KORUNUYOR)
  // ==========================================
  const l1_ex2_q = [
    makeMC("c52_l1_ex2_q1", "Boşluğa uygun kısaltmayı seçin:<br><br><strong>\"_______ the critical errors in the database, the developer restarted the system.\"</strong>", ["Having fixed", "Fixed", "To fix", "Fixing"], 0, "Öncelik bildiren aktif eylemler 'Having V3' ile kısaltılır."),
    makeMC("c52_l1_ex2_q2", "Boşluğa uygun pasif kısaltmayı seçin:<br><br><strong>\"_______ by the security team, the servers are now completely safe.\"</strong>", ["Having guarded", "Guarded", "To guard", "Guarding"], 1, "Edilgen (pasif) durumlar V3 (Guarded) ile kısaltılır."),
    makeMC("c52_l1_ex2_q3", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"The team was excited, _______ achieved their targets ahead of schedule.\"</strong>", ["having", "have", "to have", "had"], 0, "Sebep bildiren öncelikli durumlar 'having V3' ile bağlanır."),
    makeMC("c52_l1_ex2_q4", "Boşluğa uygun pasif kısaltmayı bulun:<br><br><strong>\"_______ at high temperatures, these alloys display exceptional strength.\"</strong>", ["Treated", "Treating", "Having treated", "To treat"], 0, "Pasif eylemlerde V3 (Treated) kullanılır."),
    makeMC("c52_l1_ex2_q5", "Boşluğa gelecek yapıyı seçin:<br><br><strong>\"_______ by local artisans, the pottery reflects ancient traditions.\"</strong>", ["Crafted", "Crafting", "Having crafted", "To craft"], 0, "Artisanlar tarafından yapılan anlamında pasif 'Crafted' (V3) uygundur."),
    makeMC("c52_l1_ex2_q6", "Boşluğa gelecek en uygun ifadeyi seçin:<br><br><strong>\"_______ the necessary credentials, she was granted access.\"</strong>", ["Having verified", "Verified", "To verify", "Verifying"], 0, "Öncelikli aktif durum için 'Having verified' tercih edilir."),
    makeMC("c52_l1_ex2_q7", "Boşluğa gelecek en uygun pasif kısaltmayı bulun:<br><br><strong>\"_______ in 2020, the museum attracts thousands of tourists.\"</strong>", ["Opened", "Opening", "Having opened", "To open"], 0, "Geçmişte kurulan/açılan anlamında edilgen V3 kullanılır."),
    makeMC("c52_l1_ex2_q8", "Boşluğa gelecek en uygun yapıyı bulun:<br><br><strong>\"_______ all day, the coders were exhausted.\"</strong>", ["Having worked", "Worked", "To work", "Working"], 0, "Tüm gün çalışmış oldukları için öncelik ve sebep bildirir."),
    makeMC("c52_l1_ex2_q9", "Boşluğa gelecek edilgen yapıyı seçin:<br><br><strong>\"_______ as the project lead, he immediately restructured the tasks.\"</strong>", ["Appointed", "Appointing", "Having appointed", "To appoint"], 0, "Atanan/Atandıktan sonra anlamında pasif 'Appointed' (V3) uygundur."),
    makeMC("c52_l1_ex2_q10", "Boşluğa gelecek en uygun yapıyı seçin:<br><br><strong>\"_______ the conference, they drafted the final resolution.\"</strong>", ["Having attended", "Attended", "To attend", "Attending"], 0, "Konferansa katıldıktan sonra eylemi için 'Having attended' uygundur.")
  ];

  const l1_ex3_q = [
    makeMC("c52_l1_ex3_q1", "Boşluğa uygun yapıyı seçin:<br><br><strong>\"_______ the risk analysis, the managers approved the budget.\"</strong>", ["Having finalized", "Finalized", "To finalize", "Finalizing"], 0, "Aktif öncelikli eylem 'Having finalized' ile kısaltılır."),
    makeMC("c52_l1_ex3_q2", "Boşluğa uygun pasif yapıyı seçin:<br><br><strong>\"_______ by the feedback, we revised the software design.\"</strong>", ["Inspired", "Inspiring", "Having inspired", "To inspire"], 0, "Geri bildirimlerden ilham alan anlamında pasif V3 kullanılır."),
    makeMC("c52_l1_ex3_q3", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"_______ the final score, the fans left the stadium.\"</strong>", ["Having seen", "Seen", "To see", "Seeing"], 0, "Skoru gördükten sonra anlamında 'Having seen' en uygunudur."),
    makeMC("c52_l1_ex3_q4", "Boşluğa uygun pasif kısaltmayı seçin:<br><br><strong>\"_______ under extreme pressure, diamonds develop unique structures.\"</strong>", ["Formed", "Forming", "Having formed", "To form"], 0, "Pasif oluşum eylemi V3 gerektirir."),
    makeMC("c52_l1_ex3_q5", "Boşluğa uygun yapıyı seçin:<br><br><strong>\"_______ the core program, we proceeded with plugins.\"</strong>", ["Having integrated", "Integrated", "To integrate", "Integrating"], 0, "Kök programı entegre ettikten sonra anlamında 'Having integrated'."),
    makeMC("c52_l1_ex3_q6", "Boşluğa uygun pasif kısaltmayı bulun:<br><br><strong>\"_______ by his teammates, the captain lifted the cup.\"</strong>", ["Supported", "Supporting", "Having supported", "To support"], 0, "Takım arkadaşları tarafından desteklenen anlamında pasif V3."),
    makeMC("c52_l1_ex3_q7", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"_______ the experiment twice, the scientist wrote down the results.\"</strong>", ["Having run", "Run", "To run", "Running"], 0, "Deneyi iki kez yaptıktan sonra anlamında 'Having run'."),
    makeMC("c52_l1_ex3_q8", "Boşluğa uygun pasif kısaltmayı bulun:<br><br><strong>\"_______ in a secure environment, the assets are completely protected.\"</strong>", ["Stored", "Storing", "Having stored", "To store"], 0, "Güvenli ortamda saklanan anlamında pasif V3."),
    makeMC("c52_l1_ex3_q9", "Boşluğa uygun yapıyı seçin:<br><br><strong>\"_______ the contract details, we shook hands.\"</strong>", ["Having settled", "Settled", "To settle", "Settling"], 0, "Detayları karara bağladıktan sonra eylemi."),
    makeMC("c52_l1_ex3_q10", "Boşluğa uygun pasif kısaltmayı seçin:<br><br><strong>\"_______ by the results, the laboratory closed the project.\"</strong>", ["Disappointed", "Disappointing", "Having disappointed", "To disappoint"], 0, "Sonuçlardan ötürü hayal kırıklığına uğrayan anlamında pasif V3.")
  ];

  const l2_ex2_q = [
    makeMC("c52_l2_ex2_q1", "Boşluğa uygun sinonim yapıyı seçin:<br><br><strong>\"The train is _______ depart, please board immediately.\"</strong>", ["about to", "on the verge of", "due to", "likely to"], 0, "about to + V0 hemen gerçekleşmek üzere olan eylemleri bildirir."),
    makeMC("c52_l2_ex2_q2", "Boşluğa uygun gerund alan yapıyı seçin:<br><br><strong>\"The company is on the verge _______ bankrupt.\"</strong>", ["of going", "to go", "go", "for going"], 0, "on the verge of + V-ing yapısı eşikte olmayı bildirir."),
    makeMC("c52_l2_ex2_q3", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"We are on the point _______ a new product line.\"</strong>", ["of releasing", "to release", "release", "released"], 0, "on the point of + V-ing kalıbı eşikte olmak anlamına gelir."),
    makeMC("c52_l2_ex2_q4", "Boşluğa uygun yapıyı seçin:<br><br><strong>\"The project is _______ for completion next month.\"</strong>", ["due", "about", "verge", "point"], 0, "due to/for yapısı planlanmış durumları bildirir."),
    makeMC("c52_l2_ex2_q5", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"She was on the brink _______ out after the long sprint.\"</strong>", ["of passing", "to pass", "passed", "for passing"], 0, "on the brink of + V-ing bayılmanın eşiğinde olmayı ifade eder."),
    makeMC("c52_l2_ex2_q6", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"The shuttle is _______ to launch in two minutes.\"</strong>", ["about", "on the verge", "due", "on the brink"], 0, "about to + V0 yapısı yakın geleceği gösterir."),
    makeMC("c52_l2_ex2_q7", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"The economies were on the edge _______ collapse.\"</strong>", ["of", "to", "for", "with"], 0, "on the edge of + noun/V-ing eşiğinde olmak demektir."),
    makeMC("c52_l2_ex2_q8", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"A new law is _______ to be enacted next Tuesday.\"</strong>", ["due", "about", "verge", "brink"], 0, "planlanan gelecek için 'due to V0' tercih edilir."),
    makeMC("c52_l2_ex2_q9", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"Scientists are on the verge _______ a breakthrough cure.\"</strong>", ["of finding", "to find", "find", "found"], 0, "on the verge of + V-ing bulmanın eşiğinde olmayı bildirir."),
    makeMC("c52_l2_ex2_q10", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"The actor was about _______ the stage when the lights went out.\"</strong>", ["to enter", "entering", "entered", "for entering"], 0, "about to + V0 sahneye girmek üzereyken anlamı verir.")
  ];

  const l2_ex3_q = [
    makeMC("c52_l2_ex3_q1", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"The government is on the brink _______ new taxes.\"</strong>", ["of introducing", "to introduce", "introduce", "introduced"], 0, "on the brink of + V-ing vergi getirmenin eşiğinde demektir."),
    makeMC("c52_l2_ex3_q2", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"They were about _______ when the phone rang.\"</strong>", ["to leave", "leaving", "left", "to leaving"], 0, "about to + V0 ayrılmak üzereyken anlamı taşır."),
    makeMC("c52_l2_ex3_q3", "Boşluğa uygun planlama yapısını seçin:<br><br><strong>\"The assignment is _______ by tomorrow noon.\"</strong>", ["due", "about", "verge", "point"], 0, "due by/to planlanan teslim tarihini bildirir."),
    makeMC("c52_l2_ex3_q4", "Boşluğa uygun yapıyı seçin:<br><br><strong>\"We are on the edge _______ discovering the truth.\"</strong>", ["of", "to", "for", "with"], 0, "on the edge of + V-ing gerçeği keşfetmenin eşiğinde."),
    makeMC("c52_l2_ex3_q5", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"He was on the point _______ his resignation letter.\"</strong>", ["of signing", "to sign", "signed", "for signing"], 0, "on the point of + V-ing imzalamanın eşiğinde demektir."),
    makeMC("c52_l2_ex3_q6", "Boşluğa uygun yapıyı seçin:<br><br><strong>\"The volcano is _______ to erupt, evacuation is mandatory.\"</strong>", ["about", "due", "verge", "brink"], 0, "about to + V0 patlamak üzere anlamı taşır."),
    makeMC("c52_l2_ex3_q7", "Boşluğa uygun yapıyı seçin:<br><br><strong>\"The species was on the brink _______ extinction.\"</strong>", ["of", "to", "for", "with"], 0, "on the brink of + noun nesli tükenmenin eşiğinde."),
    makeMC("c52_l2_ex3_q8", "Boşluğa uygun yapıyı seçin:<br><br><strong>\"The package is _______ to arrive this evening.\"</strong>", ["due", "about", "verge", "edge"], 0, "due to + V0 planlanmış varış zamanını belirtir."),
    makeMC("c52_l2_ex3_q9", "Boşluğa uygun yapıyı seçin:<br><br><strong>\"The system was on the verge _______ overflowing.\"</strong>", ["of", "to", "for", "with"], 0, "on the verge of + V-ing taşmanın eşiğinde."),
    makeMC("c52_l2_ex3_q10", "Boşluğa uygun yapıyı seçin:<br><br><strong>\"We are about _______ the final module.\"</strong>", ["to integrate", "integrating", "integrated", "integrate"], 0, "about to + V0 entegre etmek üzereyiz anlamına gelir.")
  ];

  const l3_ex2_q = [
    makeMC("c52_l3_ex2_q1", "Boşluğa uygun Subjunctive çekimini seçin:<br><br><strong>\"It is essential that he _______ the documents today.\"</strong>", ["sign", "signs", "signed", "will sign"], 0, "Subjunctive yapılarda fiil şahıstan bağımsız daima yalın (V0) olur."),
    makeMC("c52_l3_ex2_q2", "Boşluğa uygun gizli şart bağlacını seçin:<br><br><strong>\"We must run the backup; _______, we might lose the logs.\"</strong>", ["otherwise", "unless", "but for", "provided"], 0, "otherwise (aksi takdirde) iki bağımsız cümleyi bağlar."),
    makeMC("c52_l3_ex2_q3", "Boşluğa uygun subjunctive yapıyı seçin:<br><br><strong>\"The board recommended that the CEO _______ immediately.\"</strong>", ["resign", "resigns", "resigned", "to resign"], 0, "recommend that + S + V0 kuralı uygulanır."),
    makeMC("c52_l3_ex2_q4", "Boşluğa uygun edat yapılı şart kelimesini bulun:<br><br><strong>\"_______ your help, I would have failed.\"</strong>", ["But for", "Otherwise", "Unless", "If"], 0, "But for + Noun (yardımın olmasaydı) anlamı katar."),
    makeMC("c52_l3_ex2_q5", "Boşluğa uygun subjunctive yapıyı seçin:<br><br><strong>\"It is crucial that she _______ not present during the test.\"</strong>", ["be", "is", "was", "should to be"], 0, "Crucial that + Subject + V0 ('be') kullanılır."),
    makeMC("c52_l3_ex2_q6", "Boşluğa uygun kelimeyi seçin:<br><br><strong>\"Take your umbrella; _______, you will get wet.\"</strong>", ["otherwise", "unless", "but for", "provided"], 0, "aksi takdirde anlamında 'otherwise'."),
    makeMC("c52_l3_ex2_q7", "Boşluğa uygun subjunctive yapıyı seçin:<br><br><strong>\"The manager demanded that the bug _______ fixed today.\"</strong>", ["be", "is", "was", "will be"], 0, "demand that + S + V0 pasif yapısı 'be V3' şeklindedir."),
    makeMC("c52_l3_ex2_q8", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"_______ the high safety standards, the accident would have been fatal.\"</strong>", ["But for", "Otherwise", "Unless", "If"], 0, "güvenlik standartları olmasaydı anlamında 'But for'."),
    makeMC("c52_l3_ex2_q9", "Boşluğa uygun subjunctive yapıyı bulun:<br><br><strong>\"It is imperative that everyone _______ the core rules.\"</strong>", ["follow", "follows", "followed", "should follow to"], 0, "imperative that + S + V0 kuralı."),
    makeMC("c52_l3_ex2_q10", "Boşluğa uygun kelimeyi bulun:<br><br><strong>\"You must pay the fee; _______, your account will be suspended.\"</strong>", ["otherwise", "unless", "but for", "if"], 0, "aksi takdirde anlamında 'otherwise' kullanılır.")
  ];

  const l3_ex3_q = [
    makeMC("c52_l3_ex3_q1", "Boşluğa uygun subjunctive çekimini seçin:<br><br><strong>\"It is vital that she _______ here before noon.\"</strong>", ["be", "is", "was", "must be"], 0, "vital that + S + V0 ('be') kuralı."),
    makeMC("c52_l3_ex3_q2", "Boşluğa uygun kelimeyi seçin:<br><br><strong>\"_______ his intervention, the deals would have collapsed.\"</strong>", ["But for", "Otherwise", "Unless", "If"], 0, "müdahalesi olmasaydı anlamında 'But for'."),
    makeMC("c52_l3_ex3_q3", "Boşluğa uygun subjunctive yapıyı seçin:<br><br><strong>\"The judge ordered that the files _______ destroyed.\"</strong>", ["be", "is", "was", "will be"], 0, "order that + S + V0 pasif yapısı."),
    makeMC("c52_l3_ex3_q4", "Boşluğa uygun kelimeyi seçin:<br><br><strong>\"Lock the gate; _______, dogs might escape.\"</strong>", ["otherwise", "unless", "but for", "provided"], 0, "aksi takdirde anlamında 'otherwise'."),
    makeMC("c52_l3_ex3_q5", "Boşluğa uygun subjunctive yapıyı seçin:<br><br><strong>\"The clinic insists that the doctor _______ the protocols.\"</strong>", ["observe", "observes", "observed", "to observe"], 0, "insist that + S + V0 kuralı."),
    makeMC("c52_l3_ex3_q6", "Boşluğa uygun kelimeyi seçin:<br><br><strong>\"_______ the timely warning, we would have lost all files.\"</strong>", ["But for", "Otherwise", "Unless", "If"], 0, "uyarı olmasaydı anlamında 'But for'."),
    makeMC("c52_l3_ex3_q7", "Boşluğa uygun subjunctive yapıyı seçin:<br><br><strong>\"It was requested that he _______ the conference.\"</strong>", ["attend", "attends", "attended", "will attend"], 0, "request that + S + V0 kuralı."),
    makeMC("c52_l3_ex3_q8", "Boşluğa uygun kelimeyi seçin:<br><br><strong>\"Wear a coat; _______, you will catch a cold.\"</strong>", ["otherwise", "unless", "but for", "so that"], 0, "aksi takdirde anlamında 'otherwise'."),
    makeMC("c52_l3_ex3_q9", "Boşluğa uygun subjunctive yapıyı seçin:<br><br><strong>\"It is urgent that she _______ us immediately.\"</strong>", ["contact", "contacts", "contacted", "to contact"], 0, "urgent that + S + V0 kuralı."),
    makeMC("c52_l3_ex3_q10", "Boşluğa uygun kelimeyi seçin:<br><br><strong>\"_______ her support, I would have given up long ago.\"</strong>", ["But for", "Otherwise", "Unless", "If"], 0, "desteği olmasaydı anlamında 'But for' kullanılır.")
  ];

  const l4_ex2_q = [
    makeMC("c52_l4_ex2_q1", "Boşluğa uygun pasif aktarımı seçin:<br><br><strong>\"The ancient city is believed _______ by a volcanic eruption.\"</strong>", ["to have been destroyed", "to destroy", "destroyed", "to have destroyed"], 0, "Geçmişte yok edildiğine inanılan eylem 'to have been V3' olur."),
    makeMC("c52_l4_ex2_q2", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"It is rumored _______ the project will be shut down.\"</strong>", ["that", "to", "for", "which"], 0, "It is rumored that + SVO kalıbıdır."),
    makeMC("c52_l4_ex2_q3", "Boşluğa uygun pasif dönüşümü seçin:<br><br><strong>\"The hackers are reported _______ the main servers yesterday.\"</strong>", ["to have breached", "to breach", "breached", "to have been breached"], 0, "Dün sunucuları ihlal ettikleri rapor edilen aktif eylem 'to have V3' olur."),
    makeMC("c52_l4_ex2_q4", "Boşluğa uygun yapıyı seçin:<br><br><strong>\"It was expected _______ they would agree to the terms.\"</strong>", ["that", "to", "for", "which"], 0, "It was expected that + SVO kalıbı."),
    makeMC("c52_l4_ex2_q5", "Boşluğa uygun pasif aktarımı seçin:<br><br><strong>\"The artifact is said _______ to the Bronze Age.\"</strong>", ["to belong", "to have belonged", "belonged", "to belonging"], 0, "Genel durum/durum fiilleri için 'to V0' (to belong) uygundur."),
    makeMC("c52_l4_ex2_q6", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"He is thought _______ the country last week.\"</strong>", ["to have left", "to leave", "left", "to have been left"], 0, "Geçmişte ayrıldığı düşünülen eylem için 'to have V3'."),
    makeMC("c52_l4_ex2_q7", "Boşluğa uygun yapıyı seçin:<br><br><strong>\"It is claimed _______ the medication causes mild fatigue.\"</strong>", ["that", "to", "for", "which"], 0, "It is claimed that + SVO."),
    makeMC("c52_l4_ex2_q8", "Boşluğa uygun pasif aktarımı seçin:<br><br><strong>\"She is understood _______ the algorithms successfully.\"</strong>", ["to have designed", "to design", "designed", "to have been designed"], 0, "Geçmişte tasarladığı anlaşılan eylem için 'to have V3'."),
    makeMC("c52_l4_ex2_q9", "Boşluğa uygun yapıyı seçin:<br><br><strong>\"It is assumed _______ the files are lost forever.\"</strong>", ["that", "to", "for", "which"], 0, "It is assumed that + SVO."),
    makeMC("c52_l4_ex2_q10", "Boşluğa uygun pasif aktarımı bulun:<br><br><strong>\"The ruins are estimated _______ over 5000 years old.\"</strong>", ["to be", "to have been", "being", "to being"], 0, "Mevcut durum tespiti için 'to be' (to V0) kullanılır.")
  ];

  const l4_ex3_q = [
    makeMC("c52_l4_ex3_q1", "Boşluğa uygun pasif aktarımı seçin:<br><br><strong>\"The lost cargo is reported _______ last month.\"</strong>", ["to have been found", "to find", "found", "to have found"], 0, "Geçmişte bulunduğu rapor edilen pasif eylem 'to have been V3' olur."),
    makeMC("c52_l4_ex3_q2", "Boşluğa uygun yapıyı seçin:<br><br><strong>\"It is expected _______ inflation will drop next quarter.\"</strong>", ["that", "to", "for", "which"], 0, "It is expected that + SVO."),
    makeMC("c52_l4_ex3_q3", "Boşluğa uygun pasif aktarımı bulun:<br><br><strong>\"The suspects are thought _______ the country.\"</strong>", ["to have fled", "to flee", "fled", "to have been fled"], 0, "Geçmişte kaçtıkları düşünülen aktif eylem için 'to have V3'."),
    makeMC("c52_l4_ex3_q4", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"It is widely believed _______ smoking damages health.\"</strong>", ["that", "to", "for", "which"], 0, "It is believed that + SVO."),
    makeMC("c52_l4_ex3_q5", "Boşluğa uygun pasif aktarımı seçin:<br><br><strong>\"The library is said _______ over two million books.\"</strong>", ["to house", "to have housed", "housed", "to housing"], 0, "Genel durum bildirdiği için 'to V0' (to house) kullanılır."),
    makeMC("c52_l4_ex3_q6", "Boşluğa uygun pasif aktarımı seçin:<br><br><strong>\"The script is estimated _______ compiled in 10 minutes.\"</strong>", ["to have been", "to be", "being", "to being"], 0, "Öncelikli durum için 'to have been'."),
    makeMC("c52_l4_ex3_q7", "Boşluğa uygun yapıyı seçin:<br><br><strong>\"It is estimated _______ the damage costs millions.\"</strong>", ["that", "to", "for", "which"], 0, "It is estimated that + SVO."),
    makeMC("c52_l4_ex3_q8", "Boşluğa uygun pasif aktarımı seçin:<br><br><strong>\"The team is rumored _______ the new engines yesterday.\"</strong>", ["to have tested", "to test", "tested", "to have been tested"], 0, "Dün test ettikleri söylenen aktif eylem 'to have V3'."),
    makeMC("c52_l4_ex3_q9", "Boşluğa uygun yapıyı seçin:<br><br><strong>\"It is suggested _______ we update the credentials.\"</strong>", ["that", "to", "for", "which"], 0, "It is suggested that + SVO."),
    makeMC("c52_l4_ex3_q10", "Boşluğa uygun pasif aktarımı bulun:<br><br><strong>\"The system is proven _______ highly reliable over time.\"</strong>", ["to be", "to have been", "being", "to being"], 0, "Kanıtlanmış genel durum için 'to be' kullanılır.")
  ];

  function addExToLesson(lessonId, ex2Questions, ex3Questions) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    const ex1 = lesson.exercises[0];
    lesson.exercises = [
      ex1,
      {
        id: lessonId + "_ex2",
        createdAt: "2026-07-11T12:00:00Z",
        title: "Alıştırma 2: İleri Düzey Pratikler",
        description: "Yapısal kurallar ve sentaks alternatifleri.",
        questions: ex2Questions
      },
      {
        id: lessonId + "_ex3",
        createdAt: "2026-07-11T12:00:00Z",
        title: "Alıştırma 3: Ustalaşma Egzersizleri",
        description: "Gramer mekaniğinin pekiştirilmesi.",
        questions: ex3Questions
      }
    ];
  }

  addExToLesson("c52_l1", l1_ex2_q, l1_ex3_q);
  addExToLesson("c52_l2", l2_ex2_q, l2_ex3_q);
  addExToLesson("c52_l3", l3_ex2_q, l3_ex3_q);
  addExToLesson("c52_l4", l4_ex2_q, l4_ex3_q);


  // ==========================================
  // BÖLÜM 55 UZANTILARI (KOŞUL & MIX CLAUSES)
  // ==========================================

  // --- DERS 1: Temel Koşul Yapıları (Type 0, 1, 2, 3) ---
  const u55_l1_ex1_q = [
    makeMC("u55_l1_ex1_q1", "Boşluğa uygun olanı bulun (Type 0):<br><br><strong>\"If you heat up water to 100 degrees, it _______.\"</strong>", ["boils", "will boil", "would boil", "boiled"], 0, "Genel bilimsel gerçeklerde Type 0 (Simple Present) kullanılır."),
    makeMC("u55_l1_ex1_q2", "Boşluğa uygun olanı bulun (Type 1):<br><br><strong>\"If he _______ hard, he will pass the academic exam.\"</strong>", ["studies", "studied", "had studied", "would study"], 0, "Gelecek ihtimalleri bildiren Type 1 koşul cümlesi simple present alır."),
    makeMC("u55_l1_ex1_q3", "Boşluğa uygun olanı bulun (Type 2):<br><br><strong>\"If I _______ you, I would take that research position.\"</strong>", ["were", "am", "had been", "would be"], 0, "Gerçek dışı şimdiki zaman durumlarında be fiili were olarak çekimlenir."),
    makeMC("u55_l1_ex1_q4", "Boşluğa uygun olanı bulun (Type 3):<br><br><strong>\"If we _______ the database logs, we would have found the bug earlier.\"</strong>", ["had checked", "check", "checked", "would check"], 0, "Geçmişte yaşanmış gerçek dışı durumlarda If + had V3 kullanılır."),
    makeMC("u55_l1_ex1_q5", "Boşluğa uygun olanı seçin:<br><br><strong>\"Plants die if they _______ enough water.\"</strong>", ["do not get", "will not get", "would not get", "had not got"], 0, "Genel gerçekler için her iki taraf da present simple olur."),
    makeMC("u55_l1_ex1_q6", "Boşluğa uygun olanı seçin:<br><br><strong>\"If she calls you, _______ you let me know?\"</strong>", ["will", "would", "had", "did"], 0, "Type 1 ana cümle kısmında will/can/may modal çekimleri tercih edilir."),
    makeMC("u55_l1_ex1_q7", "Boşluğa uygun olanı seçin:<br><br><strong>\"If I had a million dollars, I _______ build a new research lab.\"</strong>", ["would", "will", "had", "am"], 0, "Type 2 ana cümle kısmında would/could/might kullanılır."),
    makeMC("u55_l1_ex1_q8", "Boşluğa uygun olanı seçin:<br><br><strong>\"If they had arrived earlier, they _______ the keynote speaker.\"</strong>", ["would have met", "will meet", "would meet", "met"], 0, "Type 3 ana cümle kısmında would have V3 kullanılır."),
    makeMC("u55_l1_ex1_q9", "Boşluğa uygun olanı seçin:<br><br><strong>\"Ice melts if you _______ it under direct sunlight.\"</strong>", ["leave", "will leave", "would leave", "left"], 0, "Bilimsel kural (Type 0)."),
    makeMC("u55_l1_ex1_q10", "Boşluğa uygun olanı seçin:<br><br><strong>\"If you don't wear a coat, you _______ catch a cold.\"</strong>", ["will", "would", "had", "were"], 0, "Type 1 koşul yapısı.")
  ];

  const u55_l1_ex2_q = [
    makeMC("u55_l1_ex2_q1", "Boşluğa uygun olanı bulun:<br><br><strong>\"If we _______ now, we will catch the last train.\"</strong>", ["leave", "left", "had left", "would leave"], 0, "Type 1 koşulu."),
    makeMC("u55_l1_ex2_q2", "Boşluğa uygun olanı bulun:<br><br><strong>\"If they had more funds, they _______ purchase the license.\"</strong>", ["could", "can", "will", "had"], 0, "Type 2 yapısı."),
    makeMC("u55_l1_ex2_q3", "Boşluğa uygun olanı bulun:<br><br><strong>\"If she had not forgotten her keys, she _______ locked out yesterday.\"</strong>", ["wouldn't have been", "wouldn't be", "won't be", "wasn't"], 0, "Dün kilitli kalmış olma eylemi Type 3 gerektirir."),
    makeMC("u55_l1_ex2_q4", "Boşluğa uygun olanı bulun:<br><br><strong>\"If you mix yellow and blue, you _______ green.\"</strong>", ["get", "will get", "would get", "got"], 0, "Fiziksel kural (Type 0)."),
    makeMC("u55_l1_ex2_q5", "Boşluğa uygun olanı seçin:<br><br><strong>\"If the system crashes, the alert _______ automatically.\"</strong>", ["triggers", "would trigger", "triggered", "had triggered"], 0, "Otomatik sistem kuralı (Type 0)."),
    makeMC("u55_l1_ex2_q6", "I would buy that house if it _______ a garden.", ["had", "has", "will have", "would have"], 0, "Type 2 koşulu."),
    makeMC("u55_l1_ex2_q7", "Boşluğa uygun olanı seçin:<br><br><strong>\"If she had answered the call, he _______ worried.\"</strong>", ["wouldn't have been", "wouldn't be", "won't be", "hadn't been"], 0, "Type 3 yapısı."),
    makeMC("u55_l1_ex2_q8", "Boşluğa uygun olanı seçin:<br><br><strong>\"If they launch the app tomorrow, we _______ the metrics.\"</strong>", ["will analyze", "would analyze", "analyzed", "had analyzed"], 0, "Type 1 yapısı."),
    makeMC("u55_l1_ex2_q9", "Boşluğa uygun olanı seçin:<br><br><strong>\"If I _______ in London, I would visit museums weekly.\"</strong>", ["lived", "live", "had lived", "will live"], 0, "Type 2 yapısı."),
    makeMC("u55_l1_ex2_q10", "Boşluğa uygun olanı seçin:<br><br><strong>\"If we had hired that consultant, we _______ that database migration error.\"</strong>", ["would have avoided", "would avoid", "will avoid", "avoided"], 0, "Type 3 yapısı.")
  ];

  const u55_l1_ex3_q = [
    makeMC("u55_l1_ex3_q1", "Boşluğa uygun olanı seçin:<br><br><strong>\"Wood _______ if you put it in water.\"</strong>", ["floats", "will float", "would float", "floated"], 0, "Doğa yasası (Type 0)."),
    makeMC("u55_l1_ex3_q2", "Boşluğa uygun olanı seçin:<br><br><strong>\"If you do not start immediately, you _______ finish on time.\"</strong>", ["cannot", "could not", "would not", "had not"], 0, "Type 1 koşulu."),
    makeMC("u55_l1_ex3_q3", "Boşluğa uygun olanı seçin:<br><br><strong>\"If the manager _______ now, he would approve the design.\"</strong>", ["were here", "is here", "had been here", "will be here"], 0, "Type 2 koşulu."),
    makeMC("u55_l1_ex3_q4", "Boşluğa uygun olanı seçin:<br><br><strong>\"If we had not missed the flight, we _______ in Paris yesterday.\"</strong>", ["would have arrived", "would arrive", "will arrive", "arrived"], 0, "Type 3 koşulu."),
    makeMC("u55_l1_ex3_q5", "Boşluğa uygun olanı seçin:<br><br><strong>\"If the server _______ power, it shuts down.\"</strong>", ["loses", "will lose", "would lose", "lost"], 0, "Fiziksel kural (Type 0)."),
    makeMC("u55_l1_ex3_q6", "Boşluğa uygun olanı seçin:<br><br><strong>\"If she wins the award, she _______ a speech.\"</strong>", ["will make", "would make", "had made", "made"], 0, "Type 1 yapısı."),
    makeMC("u55_l1_ex3_q7", "I would call him if I _______ his number.", ["knew", "know", "had known", "will know"], 0, "Type 2 yapısı."),
    makeMC("u55_l1_ex3_q8", "Boşluğa uygun olanı seçin:<br><br><strong>\"If they had asked for directions, they _______ lost yesterday.\"</strong>", ["wouldn't have got", "wouldn't get", "won't get", "didn't get"], 0, "Type 3 yapısı."),
    makeMC("u55_l1_ex3_q9", "Boşluğa uygun olanı seçin:<br><br><strong>\"If you freeze water, it _______ solid.\"</strong>", ["becomes", "will become", "would become", "became"], 0, "Type 0 yapısı."),
    makeMC("u55_l1_ex3_q10", "Boşluğa uygun olanı seçin:<br><br><strong>\"If the contract _______ signed next week, we will start the project.\"</strong>", ["is", "were", "had been", "would be"], 0, "Type 1 yapısı.")
  ];

  // --- DERS 2: İleri Seviye Karışık Koşul Yapıları (Mix 1 & Mix 2) ---
  const u55_l2_ex1_q = [
    makeMC("u55_l2_ex1_q1", "Boşluğa uygun zamanı seçin (Mix 1):<br><br><strong>\"If you had driven carefully, you wouldn't be in the hospital _______.\"</strong>", ["now", "yesterday", "before", "then"], 0, "Geçmişteki eylemin şu anki sonucu Mix 1 ile ifade edilir."),
    makeMC("u55_l2_ex1_q2", "Boşluğa uygun yapıyı seçin (Mix 2):<br><br><strong>\"If I _______ taller, I would have been chosen for the team yesterday.\"</strong>", ["were", "had been", "am", "would be"], 0, "Genel durumun geçmişe etkisi Mix 2 (If V2, would have V3) ile kurulur."),
    makeMC("u55_l2_ex1_q3", "Boşluğa uygun olanı seçin:<br><br><strong>\"If they had studied last night, they _______ the answers today.\"</strong>", ["would know", "would have known", "will know", "knew"], 0, "Dün geceki çalışmanın bugün bilinme sonucu (Mix 1)."),
    makeMC("u55_l2_ex1_q4", "Boşluğa uygun olanı seçin:<br><br><strong>\"If he _______ afraid of heights, he would have gone skydiving yesterday.\"</strong>", ["were not", "had not been", "is not", "would not be"], 0, "Yükseklik korkusu genel bir durum olduğu için Mix 2 (were not) tercih edilir."),
    makeMC("u55_l2_ex1_q5", "Boşluğa uygun olanı seçin:<br><br><strong>\"If we had bought the tickets earlier, we _______ at the stadium now.\"</strong>", ["would be", "would have been", "will be", "were"], 0, "Bilet alma geçmişte, stadyumda olma şimdi (Mix 1)."),
    makeMC("u55_l2_ex1_q6", "Boşluğa uygun olanı seçin:<br><br><strong>\"If she spoke Spanish fluently, she _______ the translator job last week.\"</strong>", ["would have got", "would get", "will get", "had got"], 0, "İspanyolca konuşma genel bir yetenek, işi alma geçmişte (Mix 2)."),
    makeMC("u55_l2_ex1_q7", "Boşluğa uygun olanı seçin:<br><br><strong>\"If he had not lost his passport, he _______ travelling today.\"</strong>", ["would be", "would have been", "will be", "is"], 0, "Pasaport kaybetme geçmişte, seyahat etme bugün (Mix 1)."),
    makeMC("u55_l2_ex1_q8", "Boşluğa uygun olanı seçin:<br><br><strong>\"If they loved history, they _______ the museum yesterday.\"</strong>", ["would have visited", "would visit", "will visit", "had visited"], 0, "Tarih sevme genel durum, müzeyi dün gezme geçmişte (Mix 2)."),
    makeMC("u55_l2_ex1_q9", "Boşluğa uygun olanı seçin:<br><br><strong>\"If I had accepted that offer, I _______ in London now.\"</strong>", ["would live", "would have lived", "will live", "lived"], 0, "Teklif geçmişte kabul edilmiş, Londra'da yaşama şimdi (Mix 1)."),
    makeMC("u55_l2_ex1_q10", "Boşluğa uygun olanı seçin:<br><br><strong>\"If she _______ a key, she would have entered the office last night.\"</strong>", ["had", "had had", "has", "would have"], 0, "Anahtara sahip olma genel/sürekli durum, ofise dün gece girme geçmişte (Mix 2).")
  ];

  const u55_l2_ex2_q = [
    makeMC("u55_l2_ex2_q1", "Boşluğa uygun olanı bulun:<br><br><strong>\"If they had installed the antivirus, they _______ in trouble now.\"</strong>", ["wouldn't be", "wouldn't have been", "won't be", "weren't"], 0, "Antivirüs kurulumu geçmişte, sorun yaşama şimdi (Mix 1)."),
    makeMC("u55_l2_ex2_q2", "Boşluğa uygun olanı bulun:<br><br><strong>\"If I spoke Japanese, I _______ the guide yesterday.\"</strong>", ["would have helped", "would help", "will help", "had helped"], 0, "Japonca konuşma genel durum, dün yardım etme geçmişte (Mix 2)."),
    makeMC("u55_l2_ex2_q3", "Boşluğa uygun olanı seçin:<br><br><strong>\"If you had locked the gate, the dog _______ in the yard now.\"</strong>", ["would be", "would have been", "will be", "is"], 0, "Kilitleme geçmişte, köpeğin bahçede olması şimdi (Mix 1)."),
    makeMC("u55_l2_ex2_q4", "Boşluğa uygun olanı seçin:<br><br><strong>\"If she _______ lazy, she would have completed the report yesterday.\"</strong>", ["were not", "had not been", "is not", "would not be"], 0, "Tembel olmama genel kişilik özelliği, dün raporu bitirme geçmişte (Mix 2)."),
    makeMC("u55_l2_ex2_q5", "Boşluğa uygun olanı seçin:<br><br><strong>\"If we had not missed the bus, we _______ at home today.\"</strong>", ["would be", "would have been", "will be", "are"], 0, "Otobüsü kaçırma geçmişte, evde olma bugün (Mix 1)."),
    makeMC("u55_l2_ex2_q6", "Boşluğa uygun olanı seçin:<br><br><strong>\"If he knew how to drive, he _______ the car yesterday.\"</strong>", ["would have driven", "would drive", "will drive", "had driven"], 0, "Araba sürmeyi bilme genel yetenek, dün sürme geçmişte (Mix 2)."),
    makeMC("u55_l2_ex2_q7", "Boşluğa uygun olanı seçin:<br><br><strong>\"If they had saved some money, they _______ the bill today.\"</strong>", ["would pay", "would have paid", "will pay", "paid"], 0, "Para biriktirme geçmişte, faturayı ödeme bugün (Mix 1)."),
    makeMC("u55_l2_ex2_q8", "Boşluğa uygun olanı seçin:<br><br><strong>\"If I liked sea food, I _______ the oysters yesterday.\"</strong>", ["would have eaten", "would eat", "will eat", "had eaten"], 0, "Deniz ürünleri sevme genel durum, dün yeme geçmişte (Mix 2)."),
    makeMC("u55_l2_ex2_q9", "Boşluğa uygun olanı seçin:<br><br><strong>\"If she had updated the system, the app _______ functioning today.\"</strong>", ["would be", "would have been", "will be", "is"], 0, "Güncelleme geçmişte, uygulamanın çalışması bugün (Mix 1)."),
    makeMC("u55_l2_ex2_q10", "Boşluğa uygun olanı seçin:<br><br><strong>\"If they were honest, they _______ the truth yesterday.\"</strong>", ["would have told", "would tell", "will tell", "told"], 0, "Dürüst olma genel durum, dün gerçeği söyleme geçmişte (Mix 2).")
  ];

  const u55_l2_ex3_q = [
    makeMC("u55_l2_ex3_q1", "Boşluğa uygun olanı bulun:<br><br><strong>\"If you had checked the address, we _______ lost now.\"</strong>", ["wouldn't be", "wouldn't have been", "won't be", "weren't"], 0, "Adres kontrolü geçmişte, kayıp olma şimdi (Mix 1)."),
    makeMC("u55_l2_ex3_q2", "Boşluğa uygun olanı bulun:<br><br><strong>\"If she were smart, she _______ that contract yesterday.\"</strong>", ["would have signed", "would sign", "will sign", "had signed"], 0, "Akıllı olma genel durum, dün imzalama geçmişte (Mix 2)."),
    makeMC("u55_l2_ex3_q3", "Boşluğa uygun olanı seçin:<br><br><strong>\"If I had taken the pill, I _______ pain today.\"</strong>", ["wouldn't feel", "wouldn't have felt", "won't feel", "didn't feel"], 0, "Hapı alma geçmişte, acı hissetmeme bugün (Mix 1)."),
    makeMC("u55_l2_ex3_q4", "Boşluğa uygun olanı seçin:<br><br><strong>\"If they spoke French, they _______ the tourists yesterday.\"</strong>", ["would have understood", "would understand", "will understand", "had understood"], 0, "Fransızca konuşma genel yetenek, dün anlama geçmişte (Mix 2)."),
    makeMC("u55_l2_ex3_q5", "Boşluğa uygun olanı seçin:<br><br><strong>\"If we had not got lost, we _______ at the hotel now.\"</strong>", ["would be", "would have been", "will be", "are"], 0, "Kaybolma geçmişte, otelde olma şimdi (Mix 1)."),
    makeMC("u55_l2_ex3_q6", "Boşluğa uygun olanı seçin:<br><br><strong>\"If he _______ a doctor, he would have helped the patient yesterday.\"</strong>", ["were", "had been", "is", "would be"], 0, "Doktor olma genel durum, dün yardım etme geçmişte (Mix 2)."),
    makeMC("u55_l2_ex3_q7", "Boşluğa uygun olanı seçin:<br><br><strong>\"If they had hired him, he _______ with them today.\"</strong>", ["would work", "would have worked", "will work", "worked"], 0, "İşe alma geçmişte, bugün onlarla çalışma (Mix 1)."),
    makeMC("u55_l2_ex3_q8", "Boşluğa uygun olanı seçin:<br><br><strong>\"If I knew how to swim, I _______ into the pool yesterday.\"</strong>", ["would have jumped", "would jump", "will jump", "had jumped"], 0, "Yüzme bilme genel durum, dün atlama geçmişte (Mix 2)."),
    makeMC("u55_l2_ex3_q9", "Boşluğa uygun olanı seçin:<br><br><strong>\"If she had cleaned the house, it _______ tidy today.\"</strong>", ["would be", "would have been", "will be", "is"], 0, "Temizlik geçmişte, evin düzenli olması bugün (Mix 1)."),
    makeMC("u55_l2_ex3_q10", "Boşluğa uygun olanı seçin:<br><br><strong>\"If they were rich, they _______ the yacht last week.\"</strong>", ["would have bought", "would buy", "will buy", "had bought"], 0, "Zengin olma genel durum, yatı geçen hafta alma geçmişte (Mix 2).")
  ];

  // --- DERS 3: Koşul Cümlelerinde Çeviri ve Sentaks ---
  const u55_l3_ex1_q = [
    makeMC("u55_l3_ex1_q1", "Boşluğa uygun kelimeyi seçin:<br><br><strong>\"_______ the government amends the law, the economic crisis will worsen.\"</strong>", ["Unless (-medikçe)", "If (Eğer)", "Provided that (Koşuluyla)", "As long as (Sürece)"], 0, "Unless 'if not' (-medikçe / -mezse) anlamına gelir ve olumsuz koşul bildirir."),
    makeMC("u55_l3_ex1_q2", "Boşluğa uygun yapıyı bulun:<br><br><strong>\"We would have built the software if we _______ the admin keys.\"</strong>", ["had possessed", "possess", "would possess", "possessed"], 0, "Ana cümle 'would have V3' ile geçmişteki bir sonuç bildirdiğinden, koşul cümlesi 'had V3' olmalıdır."),
    makeMC("u55_l3_ex1_q3", "Boşluğa uygun olanı seçin:<br><br><strong>\"_______ you study consistently, you will achieve high grades.\"</strong>", ["Providing that", "Unless", "But for", "Otherwise"], 0, "Şartıyla/Koşuluyla anlamına gelen 'Providing that' olumlu koşul kurar."),
    makeMC("u55_l3_ex1_q4", "Boşluğa uygun kelimeyi seçin:<br><br><strong>\"Take the keys _______ I am out when you return.\"</strong>", ["in case", "unless", "provided", "otherwise"], 0, "İhtimaline karşı (önlem) anlamında 'in case' kullanılır."),
    makeMC("u55_l3_ex1_q5", "Boşluğa uygun olanı seçin:<br><br><strong>\"We can play tennis _______ it doesn't rain.\"</strong>", ["as long as", "unless", "otherwise", "but for"], 0, "Sürece/Şartıyla anlamında 'as long as' kullanılır."),
    makeMC("u55_l3_ex1_q6", "Boşluğa uygun kelimeyi seçin:<br><br><strong>\"_______ it rains tomorrow, we will have the meeting indoors.\"</strong>", ["In case", "Unless", "Otherwise", "But for"], 0, "İhtimaline karşı önlem anlamında 'In case'."),
    makeMC("u55_l3_ex1_q7", "Boşluğa uygun olanı seçin:<br><br><strong>\"You will fail _______ you work harder.\"</strong>", ["unless", "if", "provided", "as long as"], 0, "Çalışmadıkça anlamında olumsuz koşul 'unless'."),
    makeMC("u55_l3_ex1_q8", "Boşluğa uygun olanı seçin:<br><br><strong>\"I will tell you the secret _______ you promise not to share it.\"</strong>", ["on condition that", "unless", "otherwise", "in case"], 0, "Söz vermen şartıyla anlamında 'on condition that'."),
    makeMC("u55_l3_ex1_q9", "Boşluğa uygun olanı seçin:<br><br><strong>\"Write it down _______ you forget it.\"</strong>", ["in case", "unless", "otherwise", "provided"], 0, "Unutman ihtimaline karşı anlamında 'in case'."),
    makeMC("u55_l3_ex1_q10", "Boşluğa uygun olanı seçin:<br><br><strong>\"We will start the party _______ the guests arrive.\"</strong>", ["as soon as", "unless", "otherwise", "in case"], 0, "Konuklar gelir gelmez anlamında zaman/koşul bağlacı.")
  ];

  const u55_l3_ex2_q = [
    makeMC("u55_l3_ex2_q1", "Boşluğa uygun kelimeyi seçin:<br><br><strong>\"_______ you pay the bill, they will cut off the power.\"</strong>", ["Unless", "If", "Provided", "In case"], 0, "Ödemedikçe anlamında olumsuz koşul 'Unless'."),
    makeMC("u55_l3_ex2_q2", "Boşluğa uygun olanı seçin:<br><br><strong>\"I will join you _______ I finish my homework.\"</strong>", ["provided that", "unless", "otherwise", "in case of"], 0, "Bitirmem şartıyla anlamında 'provided that'."),
    makeMC("u55_l3_ex2_q3", "Boşluğa uygun olanı seçin:<br><br><strong>\"Keep the map _______ we get lost.\"</strong>", ["in case", "unless", "otherwise", "as long as"], 0, "Kaybolmamız ihtimaline karşı önlem."),
    makeMC("u55_l3_ex2_q4", "Boşluğa uygun olanı seçin:<br><br><strong>\"You can drive my car _______ you drive carefully.\"</strong>", ["as long as", "unless", "otherwise", "in case"], 0, "Dikkatli sürdüğün sürece anlamında 'as long as'."),
    makeMC("u55_l3_ex2_q5", "Boşluğa uygun kelimeyi bulun:<br><br><strong>\"_______ you show your ID, you won't be allowed inside.\"</strong>", ["Unless", "If", "Provided", "Otherwise"], 0, "Göstermedikçe anlamında 'Unless'."),
    makeMC("u55_l3_ex2_q6", "Boşluğa uygun olanı seçin:<br><br><strong>\"Take a jacket _______ it gets cold.\"</strong>", ["in case", "unless", "otherwise", "provided"], 0, "Soğuması ihtimaline karşı önlem."),
    makeMC("u55_l3_ex2_q7", "Boşluğa uygun olanı seçin:<br><br><strong>\"We will hire him _______ he has experience.\"</strong>", ["on condition that", "unless", "otherwise", "in case"], 0, "Tecrübeli olması şartıyla."),
    makeMC("u55_l3_ex2_q8", "Boşluğa uygun olanı seçin:<br><br><strong>\"She won't talk to you _______ you apologize.\"</strong>", ["unless", "if", "provided", "as long as"], 0, "Özür dilemedikçe anlamında 'unless'."),
    makeMC("u55_l3_ex2_q9", "Boşluğa uygun olanı seçin:<br><br><strong>\"You can stay here _______ you keep quiet.\"</strong>", ["so long as", "unless", "otherwise", "in case"], 0, "Sessiz kaldığın sürece."),
    makeMC("u55_l3_ex2_q10", "Boşluğa uygun olanı seçin:<br><br><strong>\"_______ the weather is good, we will go for a walk.\"</strong>", ["Assuming that", "Unless", "Otherwise", "In case"], 0, "Havanın iyi olduğunu varsayarsak anlamında 'Assuming that'.")
  ];

  const u55_l3_ex3_q = [
    makeMC("u55_l3_ex3_q1", "Boşluğa uygun kelimeyi seçin:<br><br><strong>\"_______ you have a license, you cannot drive.\"</strong>", ["Unless", "If", "Provided", "In case"], 0, "Lisansın olmadıkça anlamında 'Unless'."),
    makeMC("u55_l3_ex3_q2", "Boşluğa uygun olanı seçin:<br><br><strong>\"We will purchase the servers _______ the budget is approved.\"</strong>", ["provided that", "unless", "otherwise", "in case of"], 0, "Bütçenin onaylanması şartıyla."),
    makeMC("u55_l3_ex3_q3", "Boşluğa uygun olanı seçin:<br><br><strong>\"Call the security _______ there is a breach.\"</strong>", ["in case", "unless", "otherwise", "as long as"], 0, "İhlal olması ihtimaline karşı önlem."),
    makeMC("u55_l3_ex3_q4", "Boşluğa uygun olanı seçin:<br><br><strong>\"You will succeed _______ you don't lose focus.\"</strong>", ["as long as", "unless", "otherwise", "in case"], 0, "Odağı kaybetmediğin sürece."),
    makeMC("u55_l3_ex3_q5", "Boşluğa uygun kelimeyi bulun:<br><br><strong>\"_______ the flight is cancelled, we will arrive on time.\"</strong>", ["Unless", "If", "Provided", "Otherwise"], 0, "Uçuş iptal edilmedikçe anlamında 'Unless'."),
    makeMC("u55_l3_ex3_q6", "Boşluğa uygun olanı seçin:<br><br><strong>\"Lock the gate _______ someone tries to enter.\"</strong>", ["in case", "unless", "otherwise", "provided"], 0, "Girmeye çalışması ihtimaline karşı önlem."),
    makeMC("u55_l3_ex3_q7", "Boşluğa uygun olanı seçin:<br><br><strong>\"They will buy the house _______ it has a low price.\"</strong>", ["on condition that", "unless", "otherwise", "in case"], 0, "Düşük fiyatlı olması şartıyla."),
    makeMC("u55_l3_ex3_q8", "Boşluğa uygun olanı seçin:<br><br><strong>\"He won't sign the deal _______ he gets a discount.\"</strong>", ["unless", "if", "provided", "as long as"], 0, "İndirim almadıkça anlamında 'unless'."),
    makeMC("u55_l3_ex3_q9", "Boşluğa uygun olanı seçin:<br><br><strong>\"You can attend the class _______ you register online.\"</strong>", ["so long as", "unless", "otherwise", "in case"], 0, "Kaydolduğunuz sürece."),
    makeMC("u55_l3_ex3_q10", "Boşluğa uygun olanı seçin:<br><br><strong>\"_______ we get the keys, we will enter the lab.\"</strong>", ["Assuming that", "Unless", "Otherwise", "In case"], 0, "Anahtarları aldığımızı varsayarsak.")
  ];

  function addExToLesson55(lessonId, ex1Questions, ex2Questions, ex3Questions) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    lesson.exercises = [
      {
        id: lessonId + "_ex1",
        createdAt: "2026-07-11T12:00:00Z",
        title: "Alıştırma 1: Temel Kavramlar",
        description: "Temel sentaks ve yapısal kuralları kavrama çalışmaları.",
        questions: ex1Questions
      },
      {
        id: lessonId + "_ex2",
        createdAt: "2026-07-11T12:00:00Z",
        title: "Alıştırma 2: İleri Düzey Pratikler",
        description: "Yapısal kurallar ve sentaks alternatifleri.",
        questions: ex2Questions
      },
      {
        id: lessonId + "_ex3",
        createdAt: "2026-07-11T12:00:00Z",
        title: "Alıştırma 3: Ustalaşma Egzersizleri",
        description: "Gramer mekaniğinin pekiştirilmesi.",
        questions: ex3Questions
      }
    ];
  }

  addExToLesson55("c56_l1", u55_l1_ex1_q, u55_l1_ex2_q, u55_l1_ex3_q);
  addExToLesson55("c56_l2", u55_l2_ex1_q, u55_l2_ex2_q, u55_l2_ex3_q);
  addExToLesson55("c56_l3", u55_l3_ex1_q, u55_l3_ex2_q, u55_l3_ex3_q);


  // --- DERS 4: Devrik Koşul Yapıları (If Inversion) ---
  const u55_l4_ex1_q = [
    makeMC("u55_l4_ex1_q1", "Boşluğa gelecek uygun devrik yapıyı seçin:<br><br><strong>\"_______ a problem arise, you must call me at once.\"</strong>", ["Should", "Were", "Had", "If"], 0, "Type 1 devrik yapısında If + S + should V1 yerine Should + S + V1 kullanılır."),
    makeMC("u55_l4_ex1_q2", "Boşluğa gelecek uygun devrik yapıyı seçin:<br><br><strong>\"_______ I you, I wouldn’t miss this film.\"</strong>", ["Were", "Should", "Had", "If"], 0, "Type 2 devrik yapısında If I were you yerine Were I you kullanılır."),
    makeMC("u55_l4_ex1_q3", "Boşluğa gelecek uygun devrik yapıyı seçin:<br><br><strong>\"_______ you called me earlier, I could have helped you.\"</strong>", ["Had", "Were", "Should", "If"], 0, "Type 3 devrik yapısında If you had called yerine Had you called kullanılır."),
    makeMC("u55_l4_ex1_q4", "Boşluğa gelecek uygun devrik yapıyı seçin:<br><br><strong>\"Tell George to visit me _______ you see him.\"</strong>", ["should", "were", "had", "if not"], 0, "If you should see him yapısının devriği 'should you see him' şeklindedir."),
    makeMC("u55_l4_ex1_q5", "Boşluğa gelecek uygun devrik yapıyı seçin:<br><br><strong>\"We would not have crashed _______ you driven carefully.\"</strong>", ["had", "were", "should", "if"], 0, "Type 3 devrik yapısında had + S + V3 sırası kullanılır."),
    makeMC("u55_l4_ex1_q6", "Boşluğa gelecek uygun devrik yapıyı seçin:<br><br><strong>\"Tiger Woods would not have been allowed to play in many golf clubs _______ he been playing 50 years ago.\"</strong>", ["had", "were", "should", "if"], 0, "Had he been playing 50 years ago (Type 3 continuous devrik yapı)."),
    makeMC("u55_l4_ex1_q7", "Boşluğa gelecek uygun devrik yapıyı seçin:<br><br><strong>\"_______ they to discover the bug, they would patch it immediately.\"</strong>", ["Were", "Should", "Had", "If"], 0, "Were they to V0 (Type 2 geleceğe yönelik devrik yapı)."),
    makeMC("u55_l4_ex1_q8", "Boşluğa gelecek uygun devrik yapıyı seçin:<br><br><strong>\"_______ the server fail, the backup system will start automatically.\"</strong>", ["Should", "Were", "Had", "If"], 0, "Should the server fail (Type 1 devrik yapı)."),
    makeMC("u55_l4_ex1_q9", "Boşluğa gelecek uygun devrik yapıyı seçin:<br><br><strong>\"_______ we checked the logs, we would have avoided the glitch.\"</strong>", ["Had", "Were", "Should", "If"], 0, "Had we checked the logs (Type 3 devrik yapı)."),
    makeMC("u55_l4_ex1_q10", "Boşluğa gelecek uygun devrik yapıyı seçin:<br><br><strong>\"_______ it not for your support, we would be in trouble now.\"</strong>", ["Were", "Had", "Should", "If"], 0, "Were it not for... (sayende / desteğin olmasaydı) kalıbının devriğidir.")
  ];

  const u55 = units.find(u => u.id === 58);
  if (u55) {
    if (!u55.lessons.includes("c56_l4")) u55.lessons.push("c56_l4");
    if (!u55.lessons.includes("c56_l5")) u55.lessons.push("c56_l5");
    if (!u55.lessons.includes("c56_l6")) u55.lessons.push("c56_l6");
    if (!u55.lessons.includes("c56_l7")) u55.lessons.push("c56_l7");
  }

  lessons.push({
    id: "c56_l4",
    unitId: 62,
    title: "4. Devrik Koşul Yapıları (If Inversion)",
    subtitle: "",
    exercises: [{
      id: "c56_l4_ex1",
      createdAt: "2026-07-11T12:00:00Z",
      title: "Alıştırma 1: Devrik Koşul Cümleleri",
      description: "Should, Were ve Had ile kurulan devrik koşul yapıları.",
      questions: u55_l4_ex1_q
    }],
    konuAnlatimi: {
      baslik: "Bölüm 58 / Ders 4: Devrik Koşul Yapıları (If Inversion)",
      teorikMantik: "Cümleden 'if' bağlacı atıldığında, should, were veya had yardımcı fiillerinin öznenin önüne (başa) gelerek devriklik (inversion) oluşturması.",
      formul: "Should + S + V1 | Were + S + ... | Had + S + V3",
      altinKural: "Devrik koşul yapılarında anlam tamamen normal koşul cümleleriyle (Type 1, 2, 3) aynı kalır, sadece formal/akademik dizilim oluşur!"
    }
  });


  // --- DERS 5: Alternatif Koşul Yapıları ---
  const u55_l5_ex1_q = [
    makeMC("u55_l5_ex1_q1", "Boşluğa gelecek uygun yapıyı seçin:<br><br><strong>\"If you don't tell the truth, _______ I can't help you.\"</strong>", ["then", "otherwise", "without", "or else"], 0, "If ..., then ... yapısı bir koşulun sonucunu vurgulamak için kullanılır."),
    makeMC("u55_l5_ex1_q2", "Boşluğa gelecek uygun kelimeyi seçin:<br><br><strong>\"We should hurry. _______, we will miss the bus.\"</strong>", ["Otherwise", "Then", "Without", "Provided"], 0, "Aksi takdirde anlamında 'Otherwise' (If we don't hurry) kullanılır."),
    makeMC("u55_l5_ex1_q3", "Boşluğa gelecek uygun ifadeyi bulun:<br><br><strong>\"Without air, we _______ live.\"</strong>", ["couldn't", "will", "would have", "can"], 0, "Without + Noun, Subject + would/could V1 yapısı gerçek dışı koşul kurar."),
    makeMC("u55_l5_ex1_q4", "Boşluğa gelecek uygun yapıyı seçin:<br><br><strong>\"Without your help, we _______ failed.\"</strong>", ["would have", "will", "would", "had"], 0, "Past unreal conditional: Without + Noun, Subject + would have V3."),
    makeMC("u55_l5_ex1_q5", "Boşluğa gelecek uygun bağlacı bulun:<br><br><strong>\"You must wear a helmet; _______, you might get seriously injured.\"</strong>", ["otherwise", "then", "without", "provided"], 0, "Aksi takdirde anlamında cümle geçişlerinde 'otherwise' kullanılır."),
    makeMC("u55_l5_ex1_q6", "Boşluğa gelecek uygun yapıyı bulun:<br><br><strong>\"If the software does not compile, _______ the deployment cannot proceed.\"</strong>", ["then", "otherwise", "or", "without"], 0, "If + SVO, then SVO kalıbı."),
    makeMC("u55_l5_ex1_q7", "Boşluğa gelecek uygun modal yapısını seçin:<br><br><strong>\"Without gravity, the planets _______ orbit the sun.\"</strong>", ["couldn't", "would have", "will", "can"], 0, "Yer çekimi olmasaydı (Without + Noun) yapısı ile 'couldn't V1'."),
    makeMC("u55_l5_ex1_q8", "Boşluğa gelecek uygun yapıyı seçin:<br><br><strong>\"We must secure the credentials; _______, hackers will gain access.\"</strong>", ["or else", "then", "without", "as long as"], 0, "Yoksa / aksi takdirde anlamında 'or else' kalıbı kullanılır."),
    makeMC("u55_l5_ex1_q9", "Boşluğa gelecek uygun modal yapıyı bulun:<br><br><strong>\"Without the team's dedication, the startup _______ succeeded.\"</strong>", ["wouldn't have", "won't", "wouldn't", "didn't"], 0, "Ekibin adanmışlığı olmasaydı (geçmiş durum) 'wouldn't have V3'."),
    makeMC("u55_l5_ex1_q10", "Boşluğa gelecek uygun bağlacı seçin:<br><br><strong>\"Study hard, _______ you will fail the final exam.\"</strong>", ["or", "then", "without", "provided"], 0, "Yoksa / aksi halde anlamında iki bağımsız cümleyi bağlayan 'or' bağlacıdır.")
  ];

  lessons.push({
    id: "c56_l5",
    unitId: 62,
    title: "5. Alternatif Koşul Yapıları (Otherwise, Without, Then)",
    subtitle: "",
    exercises: [{
      id: "c56_l5_ex1",
      createdAt: "2026-07-11T12:00:00Z",
      title: "Alıştırma 1: Alternatif Koşul Bağlaçları",
      description: "Otherwise, Or, Or else ve Without ile kurulan koşul yapıları.",
      questions: u55_l5_ex1_q
    }],
    konuAnlatimi: {
      baslik: "Bölüm 58 / Ders 5: Alternatif Koşul Yapıları (Otherwise, Without, Then)",
      teorikMantik: "Koşul anlamını 'if' kullanmadan 'Without' (edat), 'Otherwise/Or' (aksi takdirde/yoksa) bağlaçları ve 'If..., then...' kalıbıyla sağlama yöntemleri.",
      formul: "Without + Noun ➔ would/could | SVO. Otherwise, SVO | If SVO, then SVO",
      altinKural: "Without yapısı, cümledeki zaman bağlamına göre Type 2 (would V1) veya Type 3 (would have V3) sonuçları üretebilir!"
    }
  });


  // --- DERS 6: Diğer Koşul Bağlaçları (Conditional Adverbs) ---
  const u55_l6_ex1_q = [
    makeMC("u55_l6_ex1_q1", "Boşluğa gelecek en uygun ifadeyi bulun:<br><br><strong>\"I will love you _______ I live.\"</strong>", ["as long as", "unless", "in case", "only if"], 0, "as long as (-diği sürece) zaman/koşul ilişkisi kurar."),
    makeMC("u55_l6_ex1_q2", "Boşluğa gelecek en uygun kelimeyi seçin:<br><br><strong>\"_______ that you promise to drive carefully, I can lend you my car.\"</strong>", ["Providing", "Unless", "In case of", "Otherwise"], 0, "Providing (that) / Provided (that) (-şartıyla) anlamına gelir."),
    makeMC("u55_l6_ex1_q3", "Boşluğa gelecek en uygun kelimeyi seçin:<br><br><strong>\"_______ that you were hungry, would you eat your cat?\"</strong>", ["Supposing", "Unless", "As long as", "Otherwise"], 0, "Supposing (that) / Assuming (that) (varsayalım ki) anlamına gelen hayali koşul başlatıcıdır."),
    makeMC("u55_l6_ex1_q4", "Boşluğa gelecek en uygun ifadeyi seçin:<br><br><strong>\"I took a map _______ I got lost.\"</strong>", ["in case", "unless", "provided", "otherwise"], 0, "Kaybolmam ihtimaline karşı önlem almak amacıyla 'in case' (durumunda/diye) kullanılır."),
    makeMC("u55_l6_ex1_q5", "Boşluğa gelecek en uygun ifadeyi bulun:<br><br><strong>\"In the event _______ they give you trouble, give me a ring.\"</strong>", ["that", "of", "to", "for"], 0, "In the event that + tam cümle (SVO) şeklinde koşul bildirir."),
    makeMC("u55_l6_ex1_q6", "Boşluğa gelecek devrik yardımcı fiil dizilimini seçin:<br><br><strong>\"Only if we leave at once, _______ catch the bus.\"</strong>", ["can we", "we can", "we could", "could we"], 0, "Only if cümle başındayken ana cümle devrik (auxiliary + subject) olur."),
    makeMC("u55_l6_ex1_q7", "Boşluğa gelecek uygun edat yapısını seçin:<br><br><strong>\"Press the button in case _______ fire.\"</strong>", ["of", "that", "to", "for"], 0, "In case of + Noun (yangın durumunda) önlem yapısı kurulur."),
    makeMC("u55_l6_ex1_q8", "Boşluğa gelecek uygun edat yapısını seçin:<br><br><strong>\"Sheila will inherit everything in the event _______ his death.\"</strong>", ["of", "that", "to", "for"], 0, "In the event of + Noun (-in ölümü halinde) anlamına gelir."),
    makeMC("u55_l6_ex1_q9", "Boşluğa gelecek en uygun bağlacı seçin:<br><br><strong>\"You cannot borrow this book _______ you promise to bring it back tomorrow.\"</strong>", ["unless", "if", "provided", "in case"], 0, "Getirmediğin sürece / getireceksen hariç anlamında 'unless' kullanılır."),
    makeMC("u55_l6_ex1_q10", "Boşluğa gelecek en uygun bağlacı seçin:<br><br><strong>\"We will start the party _______ that the equipment arrives.\"</strong>", ["provided", "unless", "otherwise", "in case of"], 0, "ekipmanın gelmesi şartıyla anlamında 'provided (that)'.")
  ];

  const u55_l6_ex2_q = [
    makeMC("u55_l6_ex2_q1", "Boşluğa gelecek en uygun kelimeyi seçin:<br><br><strong>\"In the event of _______, pull the red emergency lever.\"</strong>", ["emergency", "they fail", "the power fails", "fire breaks out"], 0, "In the event of yapısı kendisinden sonra isim/isim öbeği (emergency) alır."),
    makeMC("u55_l6_ex2_q2", "Boşluğa gelecek devrik yardımcı fiil dizilimini seçin:<br><br><strong>\"Only if she passes the exam, _______ be promoted.\"</strong>", ["will she", "she will", "would she", "she would"], 0, "Only if cümle başındayken ana cümle devrik (will she V1) olur."),
    makeMC("u55_l6_ex2_q3", "Boşluğa gelecek uygun fiil çekimini seçin:<br><br><strong>\"Supposing that you _______ the lottery, what would you do?\"</strong>", ["won", "win", "had won", "would win"], 0, "Type 2 hayali sorularda Supposing + Past Simple (won) kullanılır."),
    makeMC("u55_l6_ex2_q4", "Boşluğa gelecek en uygun yapıyı bulun:<br><br><strong>\"I left the keys with the neighbors in case we _______ locked out.\"</strong>", ["got", "get", "will get", "would get"], 0, "Geçmişte önlem bildiren in case + Past Simple (got) sırası."),
    makeMC("u55_l6_ex2_q5", "Boşluğa gelecek en uygun edat/bağlaç yapısını bulun:<br><br><strong>\"You can take this job on condition _______ you work on weekends.\"</strong>", ["that", "of", "to", "for"], 0, "on condition that + SVO (çalışman koşuluyla) anlamına gelir."),
    makeMC("u55_l6_ex2_q6", "Boşluğa gelecek en uygun bağlacı seçin:<br><br><strong>\"_______ you sign the contract, the deal will be void.\"</strong>", ["Unless", "If", "Provided", "Otherwise"], 0, "Sözleşmeyi imzalamadığın sürece / imzalamazsan anlamında 'Unless'."),
    makeMC("u55_l6_ex2_q7", "Boşluğa gelecek en uygun ifadeyi seçin:<br><br><strong>\"The device is waterproof _______ it is not submerged deep.\"</strong>", ["as long as", "unless", "otherwise", "in case of"], 0, "Derine daldırılmadığı sürece anlamında 'as long as'."),
    makeMC("u55_l6_ex2_q8", "Boşluğa gelecek en uygun kelimeyi bulun:<br><br><strong>\"Providing _______ the weather stays warm, we will have a picnic.\"</strong>", ["that", "of", "to", "for"], 0, "Providing that + SVO kalıbı."),
    makeMC("u55_l6_ex2_q9", "Boşluğa gelecek en uygun ifadeyi bulun:<br><br><strong>\"In the event _______ power fails, the generator turns on.\"</strong>", ["that", "of", "to", "for"], 0, "Elektrik kesilmesi durumunda anlamında in the event that + SVO."),
    makeMC("u55_l6_ex2_q10", "Boşluğa gelecek en uygun ifadeyi seçin:<br><br><strong>\"Take this medication in case _______ headache.\"</strong>", ["of", "that", "to", "for"], 0, "Baş ağrısı durumunda anlamında in case of + Noun.")
  ];

  lessons.push({
    id: "c56_l6",
    unitId: 62,
    title: "6. Diğer Koşul Bağlaçları (Conditional Adverbs)",
    subtitle: "",
    exercises: [
      {
        id: "c56_l6_ex1",
        createdAt: "2026-07-11T12:00:00Z",
        title: "Alıştırma 1: Diğer Koşul Bağlaçları",
        description: "Unless, provided that, as long as, in case, only if ve in the event of kullanımları.",
        questions: u55_l6_ex1_q
      },
      {
        id: "c56_l6_ex2",
        createdAt: "2026-07-11T12:00:00Z",
        title: "Alıştırma 2: İleri Seviye Bağlaç Sentaksı",
        description: "Devrik (only if) ve edatlı (in case of / in the event of) akademik yapılar.",
        questions: u55_l6_ex2_q
      }
    ],
    konuAnlatimi: {
      baslik: "Bölüm 58 / Ders 6: Diğer Koşul Bağlaçları (Conditional Adverbs)",
      teorikMantik: "As long as, provided that, in case, in the event of, unless ve only if gibi bağlaç ve edatların cümle ve isim alan varyasyonları ile devriklik kuralları.",
      formul: "Only if + SVO ➔ Devrik Cümle | In case of / In the event of + Noun | unless + SVO",
      altinKural: "Only if yapısı cümlenin en başındayken, if'li koşul kısmı düz kalır, ancak cümlenin ana yüklemi devrik (yardımcı fiil + özne) yapılır!"
    }
  });


  // --- DERS 7: Keşke Yapıları (If only / I wish) ---
  const u55_l7_ex1_q = [
    makeMC("u55_l7_ex1_q1", "Boşluğa gelecek uygun modal/çekim yapısını seçin:<br><br><strong>\"I wish you _______ turn down the radio! It is extremely loud.\"</strong>", ["would", "could", "had", "will"], 0, "Başkasına yönelik şikayet bildiren gelecek/şimdiki zaman isteklerinde 'would V1' kullanılır."),
    makeMC("u55_l7_ex1_q2", "Boşluğa gelecek en uygun ifadeyi seçin:<br><br><strong>\"If only it _______ sunny tomorrow.\"</strong>", ["would be", "were", "had been", "is"], 0, "Geleceğe yönelik dileklerde 'would V0' yapısı (would be) tercih edilir."),
    makeMC("u55_l7_ex1_q3", "Boşluğa gelecek en uygun fiili seçin:<br><br><strong>\"I wish I _______ how to swim; then I would join you.\"</strong>", ["knew", "know", "had known", "would know"], 0, "Şu anki gerçek dışı durumlara yönelik isteklerde Past Simple (knew) kullanılır."),
    makeMC("u55_l7_ex1_q4", "Boşluğa gelecek en uygun modal yapısını seçin:<br><br><strong>\"If only I _______ swim like a professional.\"</strong>", ["could", "would", "had", "can"], 0, "Şu anki yetenek dileklerinde 'could V1' yapısı kullanılır."),
    makeMC("u55_l7_ex1_q5", "Boşluğa gelecek en uygun ifadeyi bulun:<br><br><strong>\"I wish they _______ making that noise; it's very annoying.\"</strong>", ["would stop", "stopped", "had stopped", "will stop"], 0, "Başkasına yönelik şikayet/dilek bildiren 'would V1' yapısı."),
    makeMC("u55_l7_ex1_q6", "Boşluğa gelecek en uygun fiili seçin:<br><br><strong>\"If only we _______ a bigger house; this one is too small.\"</strong>", ["had", "have", "had had", "would have"], 0, "Mevcut duruma yönelik hayıflanma (Type 2 - past simple)."),
    makeMC("u55_l7_ex1_q7", "Boşluğa gelecek en uygun be fiilini seçin:<br><br><strong>\"I wish she _______ here today to help us with this crash error.\"</strong>", ["were", "is", "had been", "would be"], 0, "Şu anki gerçek dışı durum için 'were' kullanılır."),
    makeMC("u55_l7_ex1_q8", "Boşluğa gelecek en uygun ifadeyi bulun:<br><br><strong>\"If only it _______ rain so heavily; I hate this weather.\"</strong>", ["wouldn't", "didn't", "hadn't", "won't"], 0, "Havanın yağmamasını dileme (şikayet/gelecek - wouldn't V1)."),
    makeMC("u55_l7_ex1_q9", "Boşluğa gelecek en uygun modal yapısını bulun:<br><br><strong>\"I wish I _______ speak Japanese fluently.\"</strong>", ["could", "would", "had", "can"], 0, "Şu anki konuşabilme yeteneği dileği (could V1)."),
    makeMC("u55_l7_ex1_q10", "Boşluğa gelecek en uygun ifadeyi seçin:<br><br><strong>\"If only they _______ arrive on time for once.\"</strong>", ["would", "were", "had", "should"], 0, "Başkalarının zamanında varmasına yönelik şikayet/istek (would V1).")
  ];

  const u55_l7_ex2_q = [
    makeMC("u55_l7_ex2_q1", "Boşluğa gelecek en uygun geçmiş zaman yapısını seçin:<br><br><strong>\"I wish you _______ me earlier before you deployed the code.\"</strong>", ["had called", "called", "would call", "have called"], 0, "Geçmişe yönelik pişmanlıklarda Past Perfect (had V3) kullanılır."),
    makeMC("u55_l7_ex2_q2", "Boşluğa gelecek uygun modal yapısını seçin:<br><br><strong>\"If only you _______ called me earlier.\"</strong>", ["could have", "would have", "had", "should"], 0, "Geçmişe yönelik yetenek/pişmanlık dileğinde 'could have V3' kullanılır."),
    makeMC("u55_l7_ex2_q3", "Boşluğa gelecek uygun yapıyı bulun:<br><br><strong>\"I wish we _______ that flight; now we are stuck in this airport.\"</strong>", ["hadn't missed", "didn't miss", "wouldn't miss", "haven't missed"], 0, "Geçmiş pişmanlık (hadn't V3)."),
    makeMC("u55_l7_ex2_q4", "Boşluğa gelecek fiil çekimini seçin:<br><br><strong>\"If only I _______ that contract yesterday.\"</strong>", ["had signed", "signed", "would sign", "could sign"], 0, "Dün imzalasaydım pişmanlığı (had V3)."),
    makeMC("u55_l7_ex2_q5", "Boşluğa gelecek fiil çekimini seçin:<br><br><strong>\"I wish they _______ the security logs before the breach occurred.\"</strong>", ["had checked", "checked", "would check", "have checked"], 0, "İhlal öncesi kontrol etme pişmanlığı (had V3)."),
    makeMC("u55_l7_ex2_q6", "Boşluğa gelecek uygun fiil çekimini bulun:<br><br><strong>\"If only she _______ told the truth; the situation wouldn't be this bad.\"</strong>", ["had", "would", "could", "did"], 0, "If only she had told (Type 3 / past regret)."),
    makeMC("u55_l7_ex2_q7", "Boşluğa gelecek uygun fiil çekimini bulun:<br><br><strong>\"I wish I _______ the research opportunity last year.\"</strong>", ["had taken", "took", "would take", "have taken"], 0, "Geçen yıla yönelik pişmanlık (had V3)."),
    makeMC("u55_l7_ex2_q8", "Boşluğa gelecek uygun modal yapıyı bulun:<br><br><strong>\"If only we _______ visited the museum yesterday.\"</strong>", ["could have", "would have", "had", "did"], 0, "Dün ziyaret edebilmiş olsaydık anlamında 'could have V3'."),
    makeMC("u55_l7_ex2_q9", "Boşluğa gelecek en uygun ifadeyi seçin:<br><br><strong>\"I wish the server _______ down last night.\"</strong>", ["hadn't crashed", "didn't crash", "wouldn't crash", "crashed"], 0, "Dün gece çökmüş olmaması dileği (hadn't V3)."),
    makeMC("u55_l7_ex2_q10", "Boşluğa gelecek en uygun ifadeyi seçin:<br><br><strong>\"If only they _______ backed up the database yesterday.\"</strong>", ["had", "would", "could", "did"], 0, "Dün yedekleme yapmış olmaları dileği (had V3).")
  ];

  const u55_l7_ex3_q = [
    makeMC("u55_l7_ex3_q1", "Özne uyum kuralına göre boşluğa uygun olanı seçin:<br><br><strong>\"I wish I _______ swim fast, but I can't.\"</strong>", ["could", "would", "will", "had"], 0, "I wish I... yapısında özne uyumu kısıtından ötürü 'would' kullanılamaz; 'could' kullanılmalıdır."),
    makeMC("u55_l7_ex3_q2", "Özne uyum kuralına göre boşluğa uygun olanı seçin:<br><br><strong>\"He wishes he _______ join us tomorrow.\"</strong>", ["could", "would", "will", "had"], 0, "He wishes he... özne uyum kısıtı nedeniyle 'would' alamaz; 'could' tercih edilir."),
    makeMC("u55_l7_ex3_q3", "Boşluğa gelecek en uygun geçmiş zaman yapısını seçin:<br><br><strong>\"She wishes she _______ accepted the job last month.\"</strong>", ["had", "would", "could", "did"], 0, "Geçen aya yönelik özne pişmanlığı (had V3)."),
    makeMC("u55_l7_ex3_q4", "Boşluğa gelecek en uygun yapıyı bulun:<br><br><strong>\"I wish they _______ screaming; I'm trying to study.\"</strong>", ["would stop", "stopped", "had stopped", "will stop"], 0, "Başkasına yönelik şikayet (would V1)."),
    makeMC("u55_l7_ex3_q5", "Boşluğa gelecek en uygun fiili bulun:<br><br><strong>\"If only I _______ the answer to this question right now.\"</strong>", ["knew", "know", "had known", "would know"], 0, "Şu ana yönelik istek (V2 - knew)."),
    makeMC("u55_l7_ex3_q6", "Boşluğa gelecek en uygun yapıyı seçin:<br><br><strong>\"We wish they _______ visit us next week.\"</strong>", ["would", "could", "had", "will"], 0, "Başkalarının bizi ziyaret etmesi dileği (would V1)."),
    makeMC("u55_l7_ex3_q7", "Boşluğa gelecek en uygun fiili seçin:<br><br><strong>\"If only he _______ attention in class yesterday.\"</strong>", ["had paid", "paid", "would pay", "pays"], 0, "Düne yönelik pişmanlık (had V3)."),
    makeMC("u55_l7_ex3_q8", "Boşluğa gelecek en uygun modal yapısını seçin:<br><br><strong>\"I wish I _______ buy that expensive phone today.\"</strong>", ["could", "would", "will", "had"], 0, "Şu anki yetenek/olasılık dileği (could V1)."),
    makeMC("u55_l7_ex3_q9", "Boşluğa gelecek en uygun yapıyı bulun:<br><br><strong>\"They wish they _______ lost the match last Tuesday.\"</strong>", ["hadn't", "didn't", "wouldn't", "haven't"], 0, "Geçen salı yenilmemiş olma pişmanlığı (hadn't V3)."),
    makeMC("u55_l7_ex3_q10", "Boşluğa gelecek en uygun ifadeyi seçin:<br><br><strong>\"If only she _______ stop complaining about the project details.\"</strong>", ["would", "were", "had", "will"], 0, "Ona yönelik şikayet/istek (would V1).")
  ];

  lessons.push({
    id: "c56_l7",
    unitId: 62,
    title: "7. Keşke Yapıları (If only / I wish)",
    subtitle: "",
    exercises: [
      {
        id: "c56_l7_ex1",
        createdAt: "2026-07-11T12:00:00Z",
        title: "Alıştırma 1: Şimdiki ve Gelecek Zaman Dilekleri",
        description: "I wish/If only ile şimdiki zaman istekleri (V2/could) ve gelecek zaman/şikayet yapıları (would).",
        questions: u55_l7_ex1_q
      },
      {
        id: "c56_l7_ex2",
        createdAt: "2026-07-11T12:00:00Z",
        title: "Alıştırma 2: Geçmiş Zaman Pişmanlıkları",
        description: "I wish/If only ile geçmiş zaman pişmanlıkları (had V3 / could have V3).",
        questions: u55_l7_ex2_q
      },
      {
        id: "c56_l7_ex3",
        createdAt: "2026-07-11T12:00:00Z",
        title: "Alıştırma 3: Özne Uyum Kısıtı ve Karma Kurallar",
        description: "I wish I would kısıtlaması, özne uyumu ve ileri seviye sentaks sentezi.",
        questions: u55_l7_ex3_q
      }
    ],
    konuAnlatimi: {
      baslik: "Bölüm 58 / Ders 7: Keşke Yapıları (If only / I wish)",
      teorikMantik: "Keşke (I wish / If only) yapılarının zaman çekimleri: Gelecek/Şikayet (would V1), Şimdiki Zaman (V2 / could V1) ve Geçmiş Zaman (had V3 / could have V3).",
      formul: "I wish you would V1 | I wish I knew/could V1 | If only we had V3/could have V3",
      altinKural: "Özne uyum kısıtı: 'I wish I...' ve 'He wishes he...' kalıplarında asla 'would' kullanılamaz; bunun yerine 'could' tercih edilir!"
    }
  });

  // ==========================================
  // BÖLÜM 28 DERS 4 ("The fact that") YENİ SORU TİPLERİ ENTEGRASYONU
  // ==========================================
  const u28_l4_ex4_questions = [
    // 1. structure-match (Yapısal Bileşen Eşleştirme)
    {
      id: "u28l91_ex4_sm1",
      type: "structure-match",
      prompt: "Aşağıdaki cümlede belirtilen ögenin dil bilgisi rolünü seçiniz:",
      sentence: "<strong>The fact that constituent sectors fluctuate</strong> disrupts global trade.",
      options: ["İsim cümleciği öznesi (Subordinate Clause Subject)", "Ana cümlenin yüklemi (Main Verb)", "Ana cümlenin nesnesi (Main Object)", "Niteleyici sıfat (Adjective)"],
      correctIndex: 0,
      translation: "Bileşen sektörlerin dalgalandığı gerçeği küresel ticareti aksatır."
    },
    {
      id: "u28l91_ex4_sm2",
      type: "structure-match",
      prompt: "Aşağıdaki cümlede belirtilen ögenin dil bilgisi rolünü seçiniz:",
      sentence: "The fact that unconstitutional regimes collapse <strong>modifies</strong> regional politics.",
      options: ["Ana cümlenin yüklemi (Main Verb)", "İsim cümleciği içindeki yüklem (Subordinate Verb)", "Cümlenin öznesi (Subject)", "Niteleyici sıfat (Adjective)"],
      correctIndex: 0,
      translation: "Anayasaya aykırı rejimlerin çöktüğü gerçeği bölgesel politikaları şekillendirir."
    },
    {
      id: "u28l91_ex4_sm3",
      type: "structure-match",
      prompt: "Aşağıdaki cümlede belirtilen ögenin dil bilgisi rolünü seçiniz:",
      sentence: "The fact that environmental boundaries contract <strong>isolates</strong> rare species.",
      options: ["Ana cümlenin yüklemi (Main Verb)", "İsim cümleciği içindeki yüklem (Subordinate Verb)", "Özne (Subject)", "Zarf (Adverb)"],
      correctIndex: 0,
      translation: "Çevresel sınırların daraldığı gerçeği nadir türleri izole eder."
    },
    {
      id: "u28l91_ex4_sm4",
      type: "structure-match",
      prompt: "Aşağıdaki cümlede belirtilen ögenin dil bilgisi rolünü seçiniz:",
      sentence: "The fact that dynamic parameters shift alters <strong>the simulation</strong>.",
      options: ["Ana cümlenin nesnesi (Main Object)", "İsim cümleciği öznesi (Subordinate Subject)", "Ana yüklem (Main Verb)", "Sıfat (Adjective)"],
      correctIndex: 0,
      translation: "Dinamik parametrelerin değişmesi simülasyonu değiştirir."
    },
    {
      id: "u28l91_ex4_sm5",
      type: "structure-match",
      prompt: "Aşağıdaki cümlede belirtilen ögenin dil bilgisi rolünü seçiniz:",
      sentence: "The fact that arbitrary criteria <strong>induce</strong> errors invalidates the report.",
      options: ["İsim cümleciği içindeki yüklem (Subordinate Verb)", "Ana cümlenin yüklemi (Main Verb)", "Zarf (Adverb)", "İsim (Noun)"],
      correctIndex: 0,
      translation: "Keyfi kriterlerin hatalara yol açtığı gerçeği raporu geçersiz kılar."
    },

    // 2. spotlight (Projektör Modu)
    {
      id: "u28l91_ex4_sl1",
      type: "spotlight",
      prompt: "Projektörle aydınlatılan 'fluctuate' kelimesinin cümledeki rolü nedir?",
      paragraph: "The fact that constituent sectors fluctuate disrupts global trade.",
      highlightChunk: "fluctuate",
      options: ["İsim cümleciğinin içindeki fiil (Subordinate Verb)", "Ana cümlenin yüklemi (Main Verb)", "Özne (Subject)", "Zarf (Adverb)"],
      correctIndex: 0,
      translation: "Bileşen sektörlerin dalgalandığı gerçeği küresel ticareti aksatır."
    },
    {
      id: "u28l91_ex4_sl2",
      type: "spotlight",
      prompt: "Projektörle aydınlatılan 'modifies' kelimesinin cümledeki görevi nedir?",
      paragraph: "The fact that unconstitutional regimes collapse modifies regional politics.",
      highlightChunk: "modifies",
      options: ["Ana cümlenin yüklemi (Main Verb)", "İsim cümleciğinin içindeki fiil (Subordinate Verb)", "Özne (Subject)", "Sıfat (Adjective)"],
      correctIndex: 0,
      translation: "Anayasaya aykırı rejimlerin çöktüğü gerçeği bölgesel politikaları şekillendirir."
    },
    {
      id: "u28l91_ex4_sl3",
      type: "spotlight",
      prompt: "Projektörle aydınlatılan 'methodologies' kelimesinin cümledeki görevi nedir?",
      paragraph: "The fact that analytical methodologies vary creates validation anomalies.",
      highlightChunk: "methodologies",
      options: ["İsim cümleciği içindeki özne (Subordinate Subject)", "Ana cümlenin öznesi (Main Subject)", "Nesne (Object)", "Sıfat (Adjective)"],
      correctIndex: 0,
      translation: "Analitik metodolojilerin farklılık gösterdiği gerçeği doğrulama anomalileri yaratır."
    },
    {
      id: "u28l91_ex4_sl4",
      type: "spotlight",
      prompt: "Projektörle aydınlatılan 'isolates' kelimesinin cümledeki rolü nedir?",
      paragraph: "The fact that environmental boundaries contract isolates rare species.",
      highlightChunk: "isolates",
      options: ["Ana cümlenin yüklemi (Main Verb)", "İsim cümleciği içindeki fiil (Subordinate Verb)", "Cümlenin öznesi (Subject)", "Nesne (Object)"],
      correctIndex: 0,
      translation: "Çevresel sınırların daraldığı gerçeği nadir türleri izole eder."
    },
    {
      id: "u28l91_ex4_sl5",
      type: "spotlight",
      prompt: "Projektörle aydınlatılan 'errors' kelimesinin cümledeki rolü nedir?",
      paragraph: "The fact that arbitrary criteria induce errors invalidates the report.",
      highlightChunk: "errors",
      options: ["İsim cümleciği içindeki nesne (Subordinate Object)", "Ana cümlenin nesnesi (Main Object)", "Ana yüklem (Main Verb)", "Özne (Subject)"],
      correctIndex: 0,
      translation: "Keyfi kriterlerin hatalara yol açtığı gerçeği raporu geçersiz kılar."
    },

    // 3. true-false (Doğru/Yanlış)
    {
      id: "u28l91_ex4_tf1",
      type: "true-false",
      prompt: "Aşağıdaki cümlenin yapısı gramer açısından doğru mudur?",
      englishPhrase: "The fact that constituent sectors fluctuate is disrupts global trade.",
      turkishTranslation: "Hata tespiti: 'is' ve 'disrupts' çift ana fiil oluşturmaktadır.",
      correctAnswer: "false"
    },
    {
      id: "u28l91_ex4_tf2",
      type: "true-false",
      prompt: "Aşağıdaki cümlenin yapısı gramer açısından doğru mudur?",
      englishPhrase: "The fact that environmental boundaries contract isolates rare species.",
      turkishTranslation: "Açıklama: Noun clause özne konumundadır ve tekil fiil (isolates) almıştır.",
      correctAnswer: "true"
    },
    {
      id: "u28l91_ex4_tf3",
      type: "true-false",
      prompt: "Aşağıdaki cümlenin Türkçe çevirisi doğru mudur?",
      englishPhrase: "The fact that unconstitutional regimes collapse modifies regional politics.",
      turkishTranslation: "Anayasaya aykırı rejimlerin çökmesi bölgesel politikaları değiştirir/şekillendirir.",
      correctAnswer: "true"
    },
    {
      id: "u28l91_ex4_tf4",
      type: "true-false",
      prompt: "Aşağıdaki cümlenin Türkçe çevirisi doğru mudur?",
      englishPhrase: "The fact that dynamic parameters shift alters the simulation.",
      turkishTranslation: "Dinamik parametrelerin sabit kalması simülasyonu değiştirir.",
      correctAnswer: "false"
    },
    {
      id: "u28l91_ex4_tf5",
      type: "true-false",
      prompt: "Aşağıdaki cümlenin yapısı gramer açısından doğru mudur?",
      englishPhrase: "Despite the fact that constituent sectors fluctuate, global trade is disrupted.",
      turkishTranslation: "Açıklama: 'Despite the fact that' kendisinden sonra tam cümle (SVO) alır.",
      correctAnswer: "true"
    },

    // 4. multiple-fill-blank (Çoklu Boşluk Doldurma)
    {
      id: "u28l91_ex4_mfb1",
      type: "multiple-fill-blank",
      prompt: "Boşlukları sırasıyla klavyeden doldurunuz:",
      sentence: "___ constituent sectors fluctuate ___ global trade.",
      corrects: ["The fact that", "disrupts"],
      translation: "Bileşen sektörlerin dalgalandığı gerçeği küresel ticareti aksatır."
    },
    {
      id: "u28l91_ex4_mfb2",
      type: "multiple-fill-blank",
      prompt: "Boşlukları sırasıyla klavyeden doldurunuz:",
      sentence: "___ analytical methodologies vary ___ validation anomalies.",
      corrects: ["The fact that", "creates"],
      translation: "Analitik metodolojilerin farklılık gösterdiği gerçeği doğrulama anomalileri yaratır."
    },
    {
      id: "u28l91_ex4_mfb3",
      type: "multiple-fill-blank",
      prompt: "Boşlukları sırasıyla klavyeden doldurunuz:",
      sentence: "___ unconstitutional regimes collapse ___ regional politics.",
      corrects: ["The fact that", "modifies"],
      translation: "Anayasaya aykırı rejimlerin çöktüğü gerçeği bölgesel politikaları değiştirir/şekillendirir."
    },
    {
      id: "u28l91_ex4_mfb4",
      type: "multiple-fill-blank",
      prompt: "Boşlukları sırasıyla klavyeden doldurunuz:",
      sentence: "___ dynamic parameters shift ___ the simulation.",
      corrects: ["The fact that", "alters"],
      translation: "Dinamik parametrelerin değişmesi simülasyonu değiştirir."
    },
    {
      id: "u28l91_ex4_mfb5",
      type: "multiple-fill-blank",
      prompt: "Boşlukları sırasıyla klavyeden doldurunuz:",
      sentence: "___ automated procedures minimize latency ___ performance.",
      corrects: ["The fact that", "boosts"],
      translation: "Otomatik prosedürlerin gecikmeyi en aza indirmesi performansı artırır."
    }
  ];

  const lesson91 = lessons.find(l => l.id === 91);
  if (lesson91 && lesson91.exercises) {
    // 4. alıştırma (İlk 10 Soru)
    lesson91.exercises.push({
      id: "u28l91ex4",
      createdAt: "2026-07-18T17:54:00Z",
      title: "Alıştırma 4: İnteraktif Hata ve Yapı Analizi — Kısım I",
      description: "Yeni soru tipleriyle (structure-match, spotlight, true-false, multiple-fill-blank) karma pekiştirme (İlk 10 Soru).",
      questions: u28_l4_ex4_questions.slice(0, 10)
    });

    // 5. alıştırma (Son 10 Soru)
    lesson91.exercises.push({
      id: "u28l91ex5",
      createdAt: "2026-07-18T18:02:00Z",
      title: "Alıştırma 5: İnteraktif Hata ve Yapı Analizi — Kısım II",
      description: "Yeni soru tipleriyle (structure-match, spotlight, true-false, multiple-fill-blank) karma pekiştirme (Son 10 Soru).",
      questions: u28_l4_ex4_questions.slice(10, 20)
    });
  }

  // ==========================================
  // BÖLÜM 29 DERS 1 VE DERS 2 SORU DÖNÜŞÜM ALGORİTMASI
  // ==========================================
  function getSentenceDetails(q) {
    let en = "";
    let tr = "";
    if (q.type === "multiple-choice") {
      en = q.enSentence || "";
      tr = q.options ? q.options[q.correctIndex] : "";
    } else if (q.type === "fill-blank-dropdown" || q.type === "fill-blank") {
      const correctVal = q.options ? q.options[q.correctIndex] : "";
      en = q.sentence ? q.sentence.replace("___", correctVal) : "";
      tr = q.translation || "";
    } else if (q.type === "word-bank") {
      en = q.enSentence || "";
      tr = q.translation || "";
    } else if (q.type === "translation-text") {
      en = q.enSentence || "";
      tr = q.correctSentence || "";
    }
    en = en.replace(/<[^>]+>/g, "");
    tr = tr.replace(/<[^>]+>/g, "");
    return { en, tr };
  }

  const targetLessons = [92, 93];
  targetLessons.forEach(lId => {
    const lesson = lessons.find(l => l.id === lId);
    if (lesson && lesson.exercises) {
      lesson.exercises.forEach(ex => {
        if (ex.questions && ex.questions.length > 0) {
          const mc = ex.questions.filter(q => q.type === "multiple-choice");
          const fbd = ex.questions.filter(q => q.type === "fill-blank-dropdown");
          const fb = ex.questions.filter(q => q.type === "fill-blank");
          const wb = ex.questions.filter(q => q.type === "word-bank");
          const tx = ex.questions.filter(q => q.type === "translation-text");

          const kept = [
            ...mc.slice(0, 2),
            ...fbd.slice(0, 2),
            ...fb.slice(0, 2),
            ...wb.slice(0, 2),
            ...tx.slice(0, 2)
          ];

          const removed = [
            ...mc.slice(2),
            ...fbd.slice(2),
            ...fb.slice(2),
            ...wb.slice(2),
            ...tx.slice(2)
          ];

          const generated = removed.map((q, index) => {
            const details = getSentenceDetails(q);
            const typeSelector = index % 4;

            if (typeSelector === 0) {
              // structure-match
              const isLesson2 = details.en.includes(" to ");
              let bolded = details.en;
              let correctOption = "";
              let options = [];
              if (isLesson2) {
                bolded = details.en.replace(/to \w+/, match => `<strong>${match}</strong>`);
                correctOption = "Mastar köprüsü (Infinitive Linker)";
                options = ["Mastar köprüsü (Infinitive Linker)", "İsim cümleciği öznesi (Subordinate Subject)", "Ana yüklem (Main Verb)", "Nesne (Object)"];
              } else {
                bolded = details.en.replace(/It is \w+|It was \w+|It had been \w+|It should be \w+|It must be \w+/, match => `<strong>${match}</strong>`);
                correctOption = "Kişisiz Giriş Yapısı (Impersonal Introduction)";
                options = ["Kişisiz Giriş Yapısı (Impersonal Introduction)", "Zarf öbeği (Adverbial Phrase)", "Asıl Yüklem (Main Verb)", "İlgi Zamiri (Relative Pronoun)"];
              }
              return {
                id: q.id + "_new_sm",
                type: "structure-match",
                prompt: "Aşağıdaki cümlede belirtilen ögenin dil bilgisi rolünü seçiniz:",
                sentence: bolded,
                options: options,
                correctIndex: options.indexOf(correctOption),
                translation: details.tr
              };
            } else if (typeSelector === 1) {
              // spotlight
              const words = details.en.split(" ");
              let highlight = "";
              if (words[0] && words[0].toLowerCase() === "it" && words[2]) {
                if (words[1].toLowerCase() === "has" && words[2].toLowerCase() === "been" && words[3]) {
                  highlight = words[3];
                } else {
                  highlight = words[2];
                }
              }
              highlight = highlight.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"");
              if (!highlight) highlight = words[1] || "";
              
              return {
                id: q.id + "_new_sl",
                type: "spotlight",
                prompt: `Projektörle aydınlatılan '${highlight}' kelimesinin cümledeki rolü nedir?`,
                paragraph: details.en,
                highlightChunk: highlight,
                options: ["Cümle giriş sıfatı/eylemi (Introductory Adjective/Verb)", "Ana cümlenin nesnesi (Main Object)", "Zarf (Adverb)", "Bağlaç (Conjunction)"],
                correctIndex: 0,
                translation: details.tr
              };
            } else if (typeSelector === 2) {
              // true-false
              const makeBug = index % 2 === 0;
              let phrase = details.en;
              let trText = details.tr;
              let correctAns = "true";
              if (makeBug) {
                correctAns = "false";
                if (phrase.includes("is ")) {
                  phrase = phrase.replace("is ", "is clearly ");
                  trText = "Hata tespiti: 'is' yardımcı fiilinden sonra zarf (clearly) yerine sıfat (clear) gelmelidir.";
                } else if (phrase.includes("was ")) {
                  phrase = phrase.replace("was ", "was obviously ");
                  trText = "Hata tespiti: 'was' yardımcı fiilinden sonra zarf yerine sıfat gelmelidir.";
                } else {
                  phrase = phrase + " is true";
                  trText = "Hata tespiti: Cümlede iki ana yüklem oluşmuştur.";
                }
              } else {
                trText = "Açıklama: Kalıp 'It + to be + sıfat/past participle + that' kuralına tamamen uygundur.";
              }
              return {
                id: q.id + "_new_tf",
                type: "true-false",
                prompt: "Aşağıdaki cümlenin yapısı gramer açısından doğru mudur?",
                englishPhrase: phrase,
                turkishTranslation: trText,
                correctAnswer: correctAns
              };
            } else {
              // multiple-fill-blank
              let sentenceWithGaps = details.en;
              const correctsList = [];
              if (sentenceWithGaps.toLowerCase().startsWith("it ")) {
                sentenceWithGaps = sentenceWithGaps.replace(/^[Ii]t\b/, "___");
                correctsList.push("It");
              }
              if (sentenceWithGaps.includes(" that ")) {
                sentenceWithGaps = sentenceWithGaps.replace(" that ", " ___ ");
                correctsList.push("that");
              } else if (sentenceWithGaps.includes(" to ")) {
                sentenceWithGaps = sentenceWithGaps.replace(" to ", " ___ ");
                correctsList.push("to");
              }
              return {
                id: q.id + "_new_mfb",
                type: "multiple-fill-blank",
                prompt: "Boşlukları sırasıyla klavyeden doldurunuz:",
                sentence: sentenceWithGaps,
                corrects: correctsList,
                translation: details.tr
              };
            }
          });

          ex.questions = [...kept, ...generated];
        }
      });
    }
  });

  // ============================================================
  // BÖLÜM 8 EDİLGEN (PASSIVE) YAPISI GELİŞTİRME (NEW QUESTION TYPES)
  // ============================================================
  const extraLesson29Sentences = [
    { en: "Rules will be suspended.", tr: "Kurallar askıya alınacak.", word: "suspended", trWord: "askıya alınacak", blank: "Rules will be ___." },
    { en: "Data will be processed.", tr: "Veriler işlenecek.", word: "processed", trWord: "işlenecek", blank: "Data will be ___." },
    { en: "Media will be manipulated.", tr: "Medya manipüle edilecek.", word: "manipulated", trWord: "manipüle edilecek", blank: "Media will be ___." },
    { en: "Agreements have been terminated.", tr: "Anlaşmalar feshedildi.", word: "terminated", trWord: "feshedildi", blank: "Agreements have been ___." },
    { en: "The dynamic has been triggered.", tr: "Dinamik tetiklendi.", word: "triggered", trWord: "tetiklendi", blank: "The dynamic has been ___." }
  ];

  function getAuxiliary(en, word) {
    const regex = new RegExp(`\\b(\\w+(?:\\s+\\w+)?)\\s+${word}\\b`, 'i');
    const match = en.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return en.includes("was") ? "was" : (en.includes("were") ? "were" : (en.includes("will be") ? "will be" : (en.includes("have been") ? "have been" : (en.includes("has been") ? "has been" : "is"))));
  }

  function generateUnit10Questions(unitId, lessonId, sentences, allLessonSentences) {
    const qList = [];
    const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
    const localEnsurePunctuation = (str) => {
      if (!str) return "";
      const trimmed = str.trim();
      if (trimmed.endsWith('?') || trimmed.endsWith('.') || trimmed.endsWith('!')) return trimmed;
      return trimmed + ".";
    };

    // We will generate exactly 15 questions
    for (let i = 0; i < 15; i++) {
      const s = sentences[i % sentences.length];
      const qId = `u${unitId}l${lessonId}_q${i + 1}`;
      const typeSelector = i; // Determine question type deterministically to ensure variety

      if (typeSelector === 0 || typeSelector === 14) {
        // 1. Multiple choice (English to Turkish)
        const wrongs = shuffle(allLessonSentences.filter(x => x.en !== s.en)).slice(0, 3);
        const options = shuffle([localEnsurePunctuation(s.tr), localEnsurePunctuation(wrongs[0].tr), localEnsurePunctuation(wrongs[1].tr), localEnsurePunctuation(wrongs[2].tr)]);
        qList.push({
          id: qId,
          type: "multiple-choice",
          prompt: `"${localEnsurePunctuation(s.en)}" cümlesinin Türkçe karşılığı hangisidir?`,
          options: options,
          correctIndex: options.indexOf(localEnsurePunctuation(s.tr)),
          enSentence: s.en,
          isEngToTr: true,
          createdAt: "2026-07-20T03:20:00+03:00"
        });
      } else if (typeSelector === 9) {
        // 2. Multiple choice (Turkish to English)
        const wrongs = shuffle(allLessonSentences.filter(x => x.en !== s.en)).slice(0, 3);
        const options = shuffle([localEnsurePunctuation(s.en), localEnsurePunctuation(wrongs[0].en), localEnsurePunctuation(wrongs[1].en), localEnsurePunctuation(wrongs[2].en)]);
        qList.push({
          id: qId,
          type: "multiple-choice",
          prompt: `"${localEnsurePunctuation(s.tr)}" cümlesinin İngilizce karşılığı hangisidir?`,
          options: options,
          correctIndex: options.indexOf(localEnsurePunctuation(s.en)),
          enSentence: s.en,
          isEngToTr: false,
          createdAt: "2026-07-20T03:20:00+03:00"
        });
      } else if (typeSelector === 1) {
        // 3. Fill blank dropdown (participle)
        const wrongs = [s.word + "ing", s.word.replace(/ed$/, "es"), s.word.replace(/ed$/, "")];
        const options = shuffle([s.word, wrongs[0], wrongs[1], wrongs[2]]);
        qList.push({
          id: qId,
          type: "fill-blank-dropdown",
          prompt: `Cümleyi tamamlayın: "${localEnsurePunctuation(s.tr)}"`,
          sentence: s.blank || s.en.replace(s.word, "___"),
          options: options,
          correctIndex: options.indexOf(s.word),
          enSentence: s.en,
          createdAt: "2026-07-20T03:20:00+03:00"
        });
      } else if (typeSelector === 10) {
        // 4. Fill blank dropdown (auxiliary verb)
        const aux = getAuxiliary(s.en, s.word);
        const distractors = ["is", "was", "will be", "have been", "has been", "are", "were"].filter(a => a !== aux).slice(0, 3);
        const options = shuffle([aux, ...distractors]);
        qList.push({
          id: qId,
          type: "fill-blank-dropdown",
          prompt: `Boşluğa uygun edilgen yardımcı fiili seçin: "${localEnsurePunctuation(s.tr)}"`,
          sentence: s.en.replace(new RegExp(`\\b${aux}\\b`), "___"),
          options: options,
          correctIndex: options.indexOf(aux),
          enSentence: s.en,
          createdAt: "2026-07-20T03:20:00+03:00"
        });
      } else if (typeSelector === 2) {
        // 5. Fill blank text
        qList.push({
          id: qId,
          type: "fill-blank-text",
          prompt: `Boşluğu uygun edilgen fiil haliyle doldurun (İngilizce): "${localEnsurePunctuation(s.tr)}"`,
          sentence: s.blank || s.en.replace(s.word, "___"),
          correct: s.word,
          enSentence: s.en,
          createdAt: "2026-07-20T03:20:00+03:00"
        });
      } else if (typeSelector === 3 || typeSelector === 11) {
        // 6. Word Bank (English to Turkish or Turkish to English)
        const targetWords = s.en.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""));
        const distractors = ["the", "system", "data", "process"].filter(w => !targetWords.includes(w));
        qList.push({
          id: qId,
          type: "word-bank",
          prompt: "Cümlenin İngilizce karşılığını oluşturun:",
          translation: localEnsurePunctuation(s.tr),
          words: shuffle([...targetWords, ...distractors]),
          correctOrder: targetWords,
          enSentence: s.en,
          isEngToTr: false,
          createdAt: "2026-07-20T03:20:00+03:00"
        });
      } else if (typeSelector === 4 || typeSelector === 13) {
        // 7. Error finder
        const baseWord = s.word.toLowerCase();
        let errorWord = baseWord.endsWith('ed') ? baseWord.replace(/ed$/, 'ing') : baseWord + 'ing';
        if (errorWord === baseWord) errorWord = baseWord + 'ed';
        
        const originalSentence = localEnsurePunctuation(s.en);
        const regex = new RegExp(`\\b${s.word}\\b`, 'i');
        const incorrectSentence = originalSentence.replace(regex, errorWord);
        const tokens = incorrectSentence.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""));
        const errIdx = tokens.findIndex(t => t.toLowerCase() === errorWord.toLowerCase());
        qList.push({
          id: qId,
          type: "error-finder",
          prompt: "Cümledeki dilbilgisel hatayı (yanlış fiil çekimini) bulun:",
          sentenceTokens: tokens.length > 0 ? tokens : [errorWord],
          correctIndex: errIdx !== -1 ? errIdx : 0,
          suggestedCorrection: s.word,
          translation: s.tr,
          createdAt: "2026-07-20T03:20:00+03:00"
        });
      } else if (typeSelector === 5) {
        // 8. Structure match
        const regex = new RegExp(`\\b${s.word}\\b`, 'i');
        const bolded = s.en.replace(regex, `<strong>$&</strong>`);
        qList.push({
          id: qId,
          type: "structure-match",
          prompt: "Aşağıdaki cümlede belirtilen ögenin dil bilgisi rolünü seçiniz:",
          sentence: bolded,
          options: ["Edilgen Ortaç (Past Participle - V3)", "Etken Ortaç (Present Participle - ing)", "Zarf (Adverb)", "İsim (Noun)"],
          correctIndex: 0,
          translation: s.tr,
          createdAt: "2026-07-20T03:20:00+03:00"
        });
      } else if (typeSelector === 6) {
        // 9. Spotlight
        qList.push({
          id: qId,
          type: "spotlight",
          prompt: `Projektörle aydınlatılan '${s.word}' kelimesinin cümledeki rolü nedir?`,
          paragraph: s.en,
          highlightChunk: s.word,
          options: ["Edilgen Ortaç (Past Participle - V3)", "Yardımcı Fiil (Auxiliary Verb)", "Zarf (Adverb)", "İsim (Noun)"],
          correctIndex: 0,
          translation: s.tr,
          createdAt: "2026-07-20T03:20:00+03:00"
        });
      } else if (typeSelector === 7 || typeSelector === 12) {
        // 10. True-False (grammar validity or translation explanation)
        const makeBug = typeSelector === 7;
        let phrase = s.en;
        let trText = s.tr;
        let correctAns = "true";
        if (makeBug) {
          correctAns = "false";
          const regex = new RegExp(`\\b${s.word}\\b`, 'i');
          phrase = s.en.replace(regex, s.word + "ing");
          trText = "Hata tespiti: Edilgen olması gereken bu yapıda aktif sıfat-fiil (-ing) kullanılmıştır.";
        } else {
          trText = `Açıklama: '${s.en}' cümlesinin doğru Türkçe karşılığı '${s.tr}' şeklindedir.`;
        }
        qList.push({
          id: qId,
          type: "true-false",
          prompt: "Aşağıdaki cümlenin yapısı gramer açısından doğru mudur?",
          englishPhrase: phrase,
          turkishTranslation: trText,
          correctAnswer: correctAns,
          createdAt: "2026-07-20T03:20:00+03:00"
        });
      } else if (typeSelector === 8) {
        // 11. Multiple fill blank
        const aux = getAuxiliary(s.en, s.word);
        let sentenceWithGaps = s.en;
        sentenceWithGaps = sentenceWithGaps.replace(new RegExp(`\\b${aux}\\b`), "___");
        sentenceWithGaps = sentenceWithGaps.replace(new RegExp(`\\b${s.word}\\b`), "___");
        qList.push({
          id: qId,
          type: "multiple-fill-blank",
          prompt: "Boşlukları sırasıyla klavyeden doldurunuz:",
          sentence: sentenceWithGaps,
          corrects: [aux, s.word],
          translation: s.tr,
          createdAt: "2026-07-20T03:20:00+03:00"
        });
      }
    }
    return qList;
  }

  // Mutate Unit 10 lessons dynamically with a single 15-question exercise
  if (typeof lessons !== 'undefined' && typeof unit10LessonSentences !== 'undefined') {
    // Topic update for edits history and descriptions
    if (typeof rawTopics !== 'undefined') {
      const topic10 = rawTopics.find(t => t.id === 10);
      if (topic10) {
        topic10.desc = "Edilgen çatıdaki cümle yapıları ve zamanlarla çekimleri";
        topic10.numLessons = 4;
        topic10.edits = topic10.edits || [];
        if (!topic10.edits.some(e => e.date === "2026-07-20T03:20:00+03:00")) {
          topic10.edits.push({
            date: "2026-07-20T03:20:00+03:00",
            desc: "Kelimeleri Türkçe karşılıklarıyla eşleştirin soruları kaldırıldı, her ders için 15 soruluk tek alıştırma yapıldı, basitten zora pedagojik aşamalandırma ve farklı soru tipleri eklendi.",
            type: "custom"
          });
        }
      }
    }

    // Units array update for banner rendering
    if (typeof units !== 'undefined') {
      const unit10 = units.find(u => u.id === 8);
      if (unit10) {
        unit10.description = "Edilgen çatıdaki cümle yapıları ve zamanlarla çekimleri";
        unit10.edits = unit10.edits || [];
        if (!unit10.edits.some(e => e.date === "2026-07-20T03:20:00+03:00")) {
          unit10.edits.push({
            date: "2026-07-20T03:20:00+03:00",
            desc: "Kelimeleri Türkçe karşılıklarıyla eşleştirin soruları kaldırıldı, her ders için 15 soruluk tek alıştırma yapıldı, basitten zora pedagojik aşamalandırma ve farklı soru tipleri eklendi.",
            type: "custom"
          });
        }
      }
    }

    lessons.forEach(lesson => {
      if (lesson.unitId === 8) {
        const lessonIdx = lesson.id - 28; // startLessonId is 28
        let sentences = unit10LessonSentences[lessonIdx + 1] || [];
        
        // Ensure Lesson 29 has 15 sentences by adding the extras
        if (lesson.id === 29) {
          sentences = [...sentences, ...extraLesson29Sentences];
        }

        if (sentences.length > 0) {
          lesson.createdAt = "2026-07-20T03:20:00+03:00";
          
          // Generate 15 distinct questions
          const generatedQuestions = generateUnit10Questions(8, lesson.id, sentences, sentences);
          
          lesson.questions = [];
          lesson.exercises = [
            {
              id: `u10l${lesson.id}ex1`,
              title: "Alıştırma 1: Edilgen Yapı Çalışması",
              description: "Pedagojik aşamalı edilgen çatı pekiştirme alıştırması (15 Soru)",
              createdAt: "2026-07-20T03:20:00+03:00",
              questions: generatedQuestions
            }
          ];
        }
      }
    });
  }

  // ==========================================
  // BÖLÜM 58: GERUND, PRESENT PARTICIPLE VE INFINITIVE FARKLARI
  // ==========================================

  if (typeof units !== 'undefined' && typeof lessons !== 'undefined' && typeof rawTopics !== 'undefined') {
    const topic58 = {
      "id": 62,
      "startLessonId": 580,
      "originalIndex": 58,
      "title": "Sentaktik Çözümleme: Gerund, Participle ve Infinitive Sentezi",
      "desc": "Akademik çeldiricilerle donatılmış Gerund, Present Participle ve Infinitive farkları ile ileri düzey sentaktik teşhis testi.",
      "icon": "🧠",
      "numLessons": 2,
      "formulas": [
        {
          "formula": "Remember / Stop / Regret / Try / Go on / Mean -> Anlam Değişimi",
          "example": "stopped investigating (bıraktı) vs. stopped to investigate (araştırmak için durdu)",
          "description": "Fiillerin Gerund veya Infinitive almasına göre değişen anlam farkları."
        },
        {
          "formula": "Prepositional 'to' -> look forward to / object to / be used to / with a view to + V-ing",
          "example": "opposed to implementing / looking forward to releasing",
          "description": "Edat olan 'to' sonrasında gerund gelme zorunluluğu."
        },
        {
          "formula": "Sentence-Initial Reductions vs. Noun Adjuncts -> Examining... (Active) vs. Seen... (Passive)",
          "example": "Examining the scroll (Archaeologist) vs. Seen from the peak (Valley)",
          "description": "Cümle başı kısaltmalar ve amaç/sıfat niteleme farkları."
        },
        {
          "formula": "Gerund vs. Participle -> Syntactic Role",
          "example": "Subject / Complement vs. Adverbial / Reduced Relative",
          "description": "-ing ekinin isim-fiil mi sıfat-fiil mi olduğunu ayırt etme."
        }
      ],
      "subtitles": [
        "1. Gerund, Present Participle ve Infinitive Ayrımı",
        "2. İleri Düzey '-ing' Formu Teşhis Sınavı"
      ],
      "originalNumLessons": 2
    };

    rawTopics.push(topic58);

    units.push({
      id: 62,
      originalIndex: topic58.originalIndex,
      title: topic58.title,
      description: topic58.desc,
      lessons: ["c58_l1", "c59_l1"],
      pages: "Syntactic-Synthesis"
    });

    const ex1_q = [
      makeMC(
        "c58_l1_ex1_q1",
        "The archaeologist remembered _______ the artifact in the safe, but when she opened it, the safe was completely empty.",
        ["to lock", "locking"],
        1,
        "'Remember' fiili geçmişte yapılmış bir eylemi hatırlamayı ifade ettiğinde Gerund (-ing) alır. Adaylar to-infinitive tuzağına düşebilir."
      ),
      makeMC(
        "c58_l1_ex1_q2",
        "After working for twelve hours straight, the lead programmer stopped _______ coffee with his colleagues to discuss the database failure.",
        ["to drink", "drinking"],
        0,
        "'Stop to do', başka bir eylemi yapmak amacıyla mevcut eyleme ara vermeyi bildirir. 'Stop doing' ise bir alışkanlığı veya eylemi tamamen bırakmaktır."
      ),
      makeMC(
        "c58_l1_ex1_q3",
        "I deeply regret _______ you that your proposal for the environmental grant has been declined by the review committee.",
        ["to inform", "informing"],
        0,
        "Gelecekte yapılacak veya o an yapılan resmi/üzücü bir bildirimi sunarken 'regret to inform/say' kullanılır."
      ),
      makeMC(
        "c58_l1_ex1_q4",
        "If you cannot resolve the network connection issue, try _______ the router and waiting for two minutes before turning it back on.",
        ["to restart", "restarting"],
        1,
        "Bir problemi çözmek amacıyla deneme yapmak, alternatif bir yöntem denemek anlamında 'try doing' (restarting) kullanılır."
      ),
      makeMC(
        "c58_l1_ex1_q5",
        "The professor went on _______ the history of the manuscript after he had finished explaining its physical characteristics.",
        ["to discuss", "discussing"],
        0,
        "Bir eylemi bitirip yeni bir eyleme/konuya geçmek anlamında 'go on to do' (to discuss) kullanılır. Aynı eylemi sürdürmek 'go on doing'dir."
      ),
      makeMC(
        "c58_l1_ex1_q6",
        "Signing this agreement will inevitably mean _______ our intellectual property rights to the parent company.",
        ["to surrender", "surrendering"],
        1,
        "'Mean' fiili 'anlamına gelmek, gerektirmek, sonuçlanmak' anlamındayken Gerund (-ing) alır. 'Niyet etmek' anlamındayken ise to-infinitive alır."
      ),
      makeMC(
        "c58_l1_ex1_q7",
        "The patient forgot _______ the medication in the morning, so he took a double dose in the evening, which caused severe side effects.",
        ["to take", "taking"],
        0,
        "Bir görevi veya yapılması planlanan eylemi yapmayı unutmak 'forget to do' (to take) ile ifade edilir. 'Forget doing' ise geçmişteki bir anıyı unutmaktır."
      ),
      makeMC(
        "c58_l1_ex1_q8",
        "As the storm intensified, the captain tried _______ the harbor, but the high waves made steering the ship impossible.",
        ["to reach", "reaching"],
        0,
        "Zor bir eylemi gerçekleştirmek için çaba sarf etmek, gayret göstermek anlamında 'try to do' (to reach) kullanılır."
      ),
      makeMC(
        "c58_l1_ex1_q9",
        "She clearly remembers _______ the director at the gala last year, though he claims they have never met before.",
        ["to meet", "meeting"],
        1,
        "Geçmişte yaşanmış bir olayı/anıyı hatırlamak 'remember doing' (meeting) ile ifade edilir."
      ),
      makeMC(
        "c58_l1_ex1_q10",
        "Although they were exhausted, the research team went on _______ the samples until dawn to meet the submission deadline.",
        ["to analyze", "analyzing"],
        1,
        "Aynı eylemi kesintisiz sürdürmek/devam ettirmek anlamında 'go on doing' (analyzing) yapısı kullanılır."
      )
    ];

    const ex2_q = [
      makeMC(
        "c58_l1_ex2_q1",
        "The local residents are strongly opposed to _______ a new highway through the protected wildlife reserve.",
        ["build", "building"],
        1,
        "'Opposed to' yapısındaki 'to' edattır (preposition) ve kendisinden sonra Gerund (-ing) gerektirir."
      ),
      makeMC(
        "c58_l1_ex2_q2",
        "With a view to _______ their carbon footprint, the manufacturing firm invested in solar energy panels.",
        ["reduce", "reducing"],
        1,
        "'With a view to' (amacıyla) yapısındaki 'to' edattır ve ardından Gerund (-ing) gelmelidir."
      ),
      makeMC(
        "c58_l1_ex2_q3",
        "Having lived in the Sahara for over a decade, the nomad was fully used to _______ in extreme temperatures.",
        ["live", "living"],
        1,
        "'Be/get used to' (alışkın olmak) yapısındaki 'to' edattır ve Gerund (-ing) alır. Yalın fiil alan 'used to' alışkanlık kalıbıyla karıştırılmamalıdır."
      ),
      makeMC(
        "c58_l1_ex2_q4",
        "The government has committed itself to _______ the quality of public education in rural areas.",
        ["improve", "improving"],
        1,
        "'Commit to' (kendini adamak/taahhüt etmek) yapısındaki 'to' edat olduğu için Gerund (-ing) gelmelidir."
      ),
      makeMC(
        "c58_l1_ex2_q5",
        "The development team is looking forward to _______ the beta version of the software to the public next week.",
        ["release", "releasing"],
        1,
        "'Look forward to' (dört gözle beklemek) yapısındaki 'to' edat olduğundan Gerund (-ing) ile devam eder."
      ),
      makeMC(
        "c58_l1_ex2_q6",
        "Many employees object to _______ overtime without additional compensation from the management.",
        ["work", "working"],
        1,
        "'Object to' (itiraz etmek) fiilindeki 'to' edattır ve arkasından Gerund (-ing) alır."
      ),
      makeMC(
        "c58_l1_ex2_q7",
        "In order to succeed in this international role, you must adapt to _______ in multicultural environments.",
        ["work", "working"],
        1,
        "'Adapt to' (uyum sağlamak) yapısındaki 'to' edattır ve kendisinden sonra Gerund (-ing) gerektirir."
      ),
      makeMC(
        "c58_l1_ex2_q8",
        "The critical acclaim he received contributed to _______ his reputation as one of the finest authors of his generation.",
        ["establish", "establishing"],
        1,
        "'Contribute to' (katkıda bulunmak) yapısındaki 'to' edattır ve isim/gerund almalıdır."
      ),
      makeMC(
        "c58_l1_ex2_q9",
        "She is dedicated to _______ the rights of marginalized communities through her legal practice.",
        ["defend", "defending"],
        1,
        "'Dedicated to' (adanmış olmak) yapısındaki 'to' edat olduğu için Gerund (-ing) gerektirir."
      ),
      makeMC(
        "c58_l1_ex2_q10",
        "It took the young artist several months to get accustomed to _______ in a bustling metropolis.",
        ["live", "living"],
        1,
        "'Get accustomed to' (alışmak) yapısındaki 'to' edattır ve ardından Gerund (-ing) gelir."
      )
    ];

    const ex3_q = [
      makeMC(
        "c58_l1_ex3_q1",
        "_______ the historical manuscripts carefully, the paleographer noticed several scribal errors that had escaped previous readings.",
        ["Examining", "Examined"],
        0,
        "Cümle başındaki aktif kısaltmalarda Present Participle (-ing) kullanılır. İnceleme eylemini yapan paleografın kendisidir."
      ),
      makeMC(
        "c58_l1_ex3_q2",
        "_______ from the top of the empire state building, the pedestrians below look like tiny, crawling ants.",
        ["Looking", "Seen"],
        1,
        "Kısaltma cümlelerinde gizli özne ana cümlenin öznesidir (pedestrians). Yayalar Empire State binasından kendilerine bakamazlar, 'görülürler' (Seen - Past Participle)."
      ),
      makeMC(
        "c58_l1_ex3_q3",
        "The facility manager ordered new _______ kits for all laboratories to ensure the staff's safety in case of chemical spills.",
        ["cleaning", "cleaned"],
        0,
        "'Cleaning kits' (temizlik kitleri) bir Gerund kullanımıdır ve amacını belirtir. 'Cleaned kits' ise önceden temizlenmiş kitler anlamına gelir ancak burada amaç nitelemesi aranmaktadır."
      ),
      makeMC(
        "c58_l1_ex3_q4",
        "_______ the complex mathematical theorem requires not only a high level of abstract thinking but also years of study.",
        ["Proving", "Proved"],
        0,
        "Cümlenin öznesi konumunda eylemi isimleştirmek için Gerund (Proving) tercih edilmelidir."
      ),
      makeMC(
        "c58_l1_ex3_q5",
        "_______ by the sudden noise outside, the baby woke up and began to cry uncontrollably.",
        ["Startling", "Startled"],
        1,
        "Bebek dışarıdaki gürültü tarafından korkutulduğu (edilgen durum) için Past Participle (Startled) kısaltması doğrudur."
      ),
      makeMC(
        "c58_l1_ex3_q6",
        "The archeological museum features a display of ancient _______ stones used by prehistoric tribes to prepare flour.",
        ["grinding", "ground"],
        0,
        "'Grinding stones' öğütme işine yarayan taşlar (Gerund amaç nitelemesi) demektir. 'Ground stones' ise ufalanmış/öğütülmüş taşlar demektir."
      ),
      makeMC(
        "c58_l1_ex3_q7",
        "_______ the experimental data multiple times, the chemist finally concluded that the hypothesis was incorrect.",
        ["Analyzing", "Analyzed"],
        0,
        "Aktif eylem kısaltmasında Present Participle (Analyzing) kullanılır ve arkasından gelen nesneyi (experimental data) doğrudan niteler."
      ),
      makeMC(
        "c58_l1_ex3_q8",
        "The safety inspector insisted that the factory install new _______ exits to facilitate rapid evacuation.",
        ["escaping", "escape"],
        1,
        "'Escape exits' (kaçış çıkışları) ifadesinde 'escape' bir isim/gerund-like amaç niteleyicisidir. 'Escaping exits' ise kaçan çıkışlar gibi anlamsız bir sıfat fiil olur."
      ),
      makeMC(
        "c58_l1_ex3_q9",
        "_______ in a remote mountain village, the child had very little access to modern educational facilities.",
        ["Raising", "Raised"],
        1,
        "Çocuk başkası tarafından büyütüldüğü (edilgen) için kısaltma Past Participle (Raised) olmalıdır."
      ),
      makeMC(
        "c58_l1_ex3_q10",
        "The company purchased several _______ machines to replace the manual packaging line and increase efficiency.",
        ["wrapping", "wrapped"],
        0,
        "'Wrapping machines' (paketleme makinesi) ifadesinde 'wrapping' makinenin işlevini/amacını belirten bir Gerund'dır. 'Wrapped' ise paketlenmiş makine demektir."
      )
    ];

    lessons.push({
      id: "c58_l1",
      unitId: 62,
      title: "Gerund, Present Participle ve Infinitive Ayrımı",
      subtitle: "Akademik çeldiriciler, anlamı değişen fiiller ve to edatı.",
      exercises: [
        {
          id: "c58_l1_ex1",
          createdAt: "2026-07-20T15:00:00+03:00",
          title: "Alıştırma 1: Anlamı Değişen Fiiller",
          description: "Gerund ve Infinitive almasına göre anlamı tamamen değişen fiillerle ilgili akademik pratik.",
          questions: ex1_q
        },
        {
          id: "c58_l1_ex2",
          createdAt: "2026-07-20T15:00:00+03:00",
          title: "Alıştırma 2: Edat Olan 'To' Kalıpları",
          description: "look forward to, object to gibi 'to' edatıyla biten yapılarda Gerund kullanımı.",
          questions: ex2_q
        },
        {
          id: "c58_l1_ex3",
          createdAt: "2026-07-20T15:00:00+03:00",
          title: "Alıştırma 3: Kısaltmalar ve İsim Niteleyiciler",
          description: "Cümle başı kısaltmalar (özne vs. zarf) ve Gerund vs. Participle niteleme farkları.",
          questions: ex3_q
        }
      ],
      konuAnlatimi: {
        baslik: "Gerund, Present Participle ve Infinitive Kılavuzu",
        teorikMantik: "Bu derste Gerund, Present Participle ve Infinitive yapıları arasındaki ince çizgileri ve akademik sınavlarda adayları ters köşe yapan çeldiricileri inceleyeceğiz.",
        formul: "Gerund (Eylem İsmi/Amaç) vs. Participle (Sıfat/Kısaltma) vs. Infinitive (Amaç/Gelecek)",
        altinKural: "Edat olan 'to' kalıplarına ve cümle başındaki kısaltmalarda cümlenin öznesiyle olan aktif/pasif ilişkisine çok dikkat edin!"
      }
    });

    // BÖLÜM 59 (Teşhis Testi) Bölüm 58 ile birleştirilmiştir.

    const u59_ex1_q = [
      makeMC(
        "c59_l1_ex1_q1",
        "_______ the metabolic processes of hydrothermal vent organisms has allowed biochemists to synthesize novel enzymes.",
        ["For examining", "Having examined", "Examine", "Examining", "To be examined"],
        3,
        "Cümlenin öznesi (Subject) konumunda bir isim-fiil (Gerund) gerekmektedir. 'Examining' cümlenin ana fiili 'has allowed' için öznedir."
      ),
      makeMC(
        "c59_l1_ex1_q2",
        "The primary difficulty encountered was _______ the volatile polymer chain without causing premature cellular lysis.",
        ["to have stabilized", "stabilizing", "stabilize", "being stabilized", "stabilized"],
        1,
        "Cümlede özne tamamlayıcısı (Subject Complement) olarak Gerund kullanılmıştır. 'Was stabilizing' ifadesindeki stabilizing, eylemin kendisini isimleştirir."
      ),
      makeMC(
        "c59_l1_ex1_q3",
        "While some advocate fiscal austerity, directors recommend _______ interest rates to stimulate infrastructure investments.",
        ["to lower", "lowering", "lower", "to be lowering", "having lowered"],
        1,
        "'Recommend' fiili doğrudan nesne olarak bir Gerund (-ing) yapısı alır."
      ),
      makeMC(
        "c59_l1_ex1_q4",
        "To mitigate soil erosion, agricultural planners must not put off _______ sustainable irrigation schemes.",
        ["to implement", "implementing", "implement", "being implemented", "having implemented"],
        1,
        "'Put off' phrasal verb'ü kendisinden sonra gelen eylemi nesne olarak Gerund (-ing) biçiminde alır."
      ),
      makeMC(
        "c59_l1_ex1_q5",
        "_______ by peer-reviewed journals remains the primary benchmark for assessing scientific validity.",
        ["Being evaluated", "Evaluating", "To evaluate", "Evaluated", "Having evaluated"],
        0,
        "Cümlenin öznesi pasif bir Gerund olmalıdır. Makaleler değerlendirme işini kendisi yapmaz, değerlendirilirler (Being evaluated)."
      ),
      makeMC(
        "c59_l1_ex1_q6",
        "In his memoirs, the diplomat acknowledged _______ confidential state cables during the geopolitical crisis.",
        ["to disclose", "having disclosed", "disclose", "to have disclosed", "being disclosed"],
        1,
        "'Acknowledge' fiili Gerund alır. Ayrıca eylemin geçmişte yapıldığını vurgulamak için Perfect Gerund (having disclosed) kullanımı en uygun seçenektir."
      ),
      makeMC(
        "c59_l1_ex1_q7",
        "After the company collapsed, the CEO deeply regretted _______ the warnings highlighted by the auditors.",
        ["to ignore", "ignoring", "ignore", "to be ignoring", "ignored"],
        1,
        "'Regret' fiili geçmişte yapılan bir pişmanlığı belirtirken Gerund (-ing), geleceğe yönelik üzüntü verici bir haber verirken ise Infinitive (to V1) alır. Burada geçmişteki bir hata söz konusudur."
      ),
      makeMC(
        "c59_l1_ex1_q8",
        "Having failed to resolve the query bottleneck, the administrator tried _______ the server's RAM capacity.",
        ["to double", "doubling", "double", "having doubled", "to be doubling"],
        1,
        "'Try doing' bir çözüme ulaşmak için yeni bir yöntem denemek/deney yapmak anlamına gelirken 'Try to do' çabalamak anlamına gelir. SQL yazmak başarısız olunca RAM artırmayı denemiştir."
      ),
      makeMC(
        "c59_l1_ex1_q9",
        "During the eclipse, the astronomers observed the moon _______ the sun's corona.",
        ["to cover", "covering", "covered", "covers", "to covering"],
        1,
        "Algı fiillerinden (see, watch, observe, hear) sonra eylemin bir kısmının veya devam etmekte olan sürecinin izlendiğini belirtmek için Present Participle (-ing) kullanılır."
      ),
      makeMC(
        "c59_l1_ex1_q10",
        "As the security guard patrolled the compound, he heard someone _______ a metal drawer.",
        ["to open", "opening", "opened", "opens", "to opening"],
        1,
        "Duyusal algı bildiren 'hear' fiilinden sonra devam eden eylemi belirtmek amacıyla Present Participle (-ing) kullanımı uygundur."
      ),
      makeMC(
        "c59_l1_ex1_q11",
        "Members of the medical board strongly object to _______ experimental gene therapies without verification.",
        ["authorize", "authorizing", "be authorized", "to authorize", "authorized"],
        1,
        "'Object to' yapısındaki 'to' edattır (preposition). Bu nedenle kendisinden sonra yalın fiil değil, Gerund (authorizing) gelmelidir."
      ),
      makeMC(
        "c59_l1_ex1_q12",
        "Economists are looking forward to _______ the long-term impact of the newly ratified trade treaties.",
        ["evaluate", "evaluating", "have evaluated", "be evaluating", "to evaluate"],
        1,
        "'Look forward to' kalıbındaki 'to' edat olduğu için arkasından Gerund (-ing) yapısı gelmelidir."
      ),
      makeMC(
        "c59_l1_ex1_q13",
        "Nomadic tribes, being accustomed to _______ in hyper-arid environments, display unique physiological traits.",
        ["survive", "surviving", "having survived", "be survived", "to survive"],
        1,
        "'Be accustomed to' yapısında 'to' edat işlevindedir ve kendisinden sonra Gerund (surviving) gelir."
      ),
      makeMC(
        "c59_l1_ex1_q14",
        "During the examination, the lead engineer confessed to _______ the safety protocols.",
        ["bypass", "bypassing", "have bypassed", "to bypass", "be bypassing"],
        1,
        "'Confess to' kalıbındaki 'to' edat olduğu için ardından Gerund (bypassing) getirilmelidir."
      ),
      makeMC(
        "c59_l1_ex1_q15",
        "The conglomerate restructured its division with a view to _______ novel aerospace materials.",
        ["develop", "developing", "to develop", "developed", "having developed"],
        1,
        "'With a view to' (amacıyla) kalıbı edat olan 'to' içerdiğinden daima Gerund (developing) ile devam eder."
      )
    ];

    const u59_ex2_q = [
      makeMC(
        "c59_l1_ex2_q1",
        "Identify the grammatically incorrect underlined part in the sentence:<br><br>\"<u>Having examining</u> (A) the data carefully, the research team <u>proactively</u> (B) terminated the clinical trial <u>to prevent</u> (C) further side <u>effects</u> (D).\"",
        ["(A) Having examining", "(B) proactively", "(C) to prevent", "(D) effects", "No error"],
        0,
        "Perfect Participle Clause yapısında 'Having' sonrasında Past Participle (V3 - examined) gelmelidir. 'Having examining' dil bilgisi açısından hatalıdır."
      ),
      makeMC(
        "c59_l1_ex2_q2",
        "Identify the grammatically incorrect underlined part in the sentence:<br><br>\"Environmental groups are opposed to <u>construct</u> (A) the new landfill site, <u>arguing</u> (B) that it will inevitably <u>pollute</u> (C) the local ground water <u>reservoir</u> (D).\"",
        ["(A) construct", "(B) arguing", "(C) pollute", "(D) reservoir", "No error"],
        0,
        "'Opposed to' kalıbında yer alan 'to' edat olduğu için arkasından bare infinitive (construct) değil, Gerund (constructing) gelmelidir."
      ),
      makeMC(
        "c59_l1_ex2_q3",
        "Identify the grammatically incorrect underlined part in the sentence:<br><br>\"<u>Examine</u> (A) under the electron microscope, the specimen <u>revealed</u> (B) a unique molecular structure <u>that</u> (C) was previously <u>unseen</u> (D).\"",
        ["(A) Examine", "(B) revealed", "(C) that", "(D) unseen", "No error"],
        0,
        "Cümle başındaki edilgen kısaltma yapısında (Past Participle Clause) fiilin üçüncü hali kullanılmalıdır. 'Examine' yerine 'Examined' gelmelidir."
      ),
      makeMC(
        "c59_l1_ex2_q4",
        "Identify the grammatically incorrect underlined part in the sentence:<br><br>\"The new software <u>contains</u> (A) a detailed algorithm <u>designed</u> (B) for <u>identify</u> (C) anomalies in <u>encrypted</u> (D) data packages.\"",
        ["(A) contains", "(B) designed", "(C) identify", "(D) encrypted", "No error"],
        2,
        "'For' edatından (preposition) sonra fiilin yalın hali (identify) değil, Gerund (-ing) yapısı (identifying) kullanılmalıdır."
      ),
      makeMC(
        "c59_l1_ex2_q5",
        "Identify the grammatically incorrect underlined part in the sentence:<br><br>\"While <u>conducting</u> (A) field research, the zoologist watched the pack of wolves <u>to pursue</u> (B) the herd <u>across</u> (C) the frozen <u>tundra</u> (D).\"",
        ["(A) conducting", "(B) to pursue", "(C) across", "(D) tundra", "No error"],
        1,
        "Algı fiillerinden (watch, see, hear) sonra to-infinitive (to pursue) kullanılmaz. Eylemin tamamı veya bir süreci için yalın fiil (pursue) ya da present participle (pursuing) kullanılmalıdır."
      )
    ];

    const u59_ex3_q = [
      makeMC(
        "c59_l1_ex3_q1",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"Since the chemist realized that the catalyst was unstable, he terminated the synthesis.\"</strong>",
        [
          "Realized that the catalyst was unstable, the chemist terminated the synthesis.",
          "Realizing that the catalyst was unstable, the chemist terminated the synthesis.",
          "To realize that the catalyst was unstable, the chemist terminated the synthesis.",
          "Having been realized that the catalyst was unstable, the chemist terminated the synthesis.",
          "Although realizing that the catalyst was unstable, the chemist terminated the synthesis."
        ],
        1,
        "Neden bildiren aktif zarf cümlesi, özne ortaklığı bulunduğunda Present Participle (-ing) ile 'Realizing...' şeklinde kısaltılır."
      ),
      makeMC(
        "c59_l1_ex3_q2",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"After they analyzed the data for weeks, the team finally published their report.\"</strong>",
        [
          "Analyzing the data for weeks, the report was finally published by the team.",
          "Having analyzed the data for weeks, the team finally published their report.",
          "Having been analyzed the data for weeks, the team finally published their report.",
          "To analyze the data for weeks, the team finally published their report.",
          "Analyzed the data for weeks, the team finally published their report."
        ],
        1,
        "Geçmişte daha önce yapılmış aktif bir eylemin zarf cümleciği kısaltmasında Perfect Participle (Having + V3) yapısı kullanılır."
      ),
      makeMC(
        "c59_l1_ex3_q3",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"Although the sociologist's theory was rejected by critics, it eventually gained acceptance.\"</strong>",
        [
          "Although rejecting by critics, the sociologist's theory eventually gained acceptance.",
          "Although rejected by critics, the sociologist's theory eventually gained acceptance.",
          "Having rejected by critics, the sociologist's theory eventually gained acceptance.",
          "Rejecting by critics, the sociologist's theory eventually gained acceptance.",
          "Although to be rejected by critics, the sociologist's theory eventually gained acceptance."
        ],
        1,
        "Karşıtlık bağlacından sonra pasif bir kısaltma yapmak için fiilin 3. hali (rejected) doğrudan bağlaç sonrasına getirilir."
      ),
      makeMC(
        "c59_l1_ex3_q4",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"As soon as she entered the laboratory, the technician noticed a strange odor.\"</strong>",
        [
          "On entering the laboratory, the technician noticed a strange odor.",
          "To enter the laboratory, the technician noticed a strange odor.",
          "Entered the laboratory, the technician noticed a strange odor.",
          "On having entered the laboratory, a strange odor was noticed.",
          "On being entered the laboratory, the technician noticed a strange odor."
        ],
        0,
        "'On/Upon + Gerund' kalıbı, bir eylemin hemen ardından gerçekleşen diğer eylemi bağlar ve 'as soon as' ile aynı anlamı taşır."
      ),
      makeMC(
        "c59_l1_ex3_q5",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"Because they did not obtain the required permits, the firm suspended the project.\"</strong>",
        [
          "Not obtained the required permits, the firm suspended the project.",
          "Not having obtained the required permits, the firm suspended the project.",
          "Without to obtain the required permits, the firm suspended the project.",
          "Not being obtained the required permits, the firm suspended the project.",
          "Having not been obtained the required permits, the firm suspended the project."
        ],
        1,
        "Öncelikli olumsuz ve aktif zarf cümleciği kısaltması 'Not having + V3' yapısıyla oluşturulur."
      ),
      makeMC(
        "c59_l1_ex3_q6",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"The database contains raw datasets which are currently being analyzed by researchers.\"</strong>",
        [
          "The database contains raw datasets currently analyzing by researchers.",
          "The database contains raw datasets currently being analyzed by researchers.",
          "The database contains raw datasets currently analyzed by researchers.",
          "The database contains raw datasets currently to be analyzed by researchers.",
          "The database contains raw datasets currently having analyzed by researchers."
        ],
        1,
        "Şu an devam eden pasif sıfat-fiil cümlesi, 'being + V3' formatında 'currently being analyzed' şeklinde kısaltılır."
      ),
      makeMC(
        "c59_l1_ex3_q7",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"While the doctor was performing the surgery, he noticed a minor arterial blockage.\"</strong>",
        [
          "While performed the surgery, the doctor noticed a minor arterial blockage.",
          "While performing the surgery, the doctor noticed a minor arterial blockage.",
          "Performing the surgery, a minor arterial blockage was noticed by the doctor.",
          "Having performed the surgery, the doctor noticed a minor arterial blockage.",
          "Although performing the surgery, the doctor noticed a minor arterial blockage."
        ],
        1,
        "Zaman zarfı bağlaçlarından (while, when) sonra aktif eylem kısaltmasında Present Participle (performing) kullanılır."
      ),
      makeMC(
        "c59_l1_ex3_q8",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"The algorithm which was developed by the team detects security breaches.\"</strong>",
        [
          "The algorithm developing by the team detects security breaches.",
          "The algorithm developed by the team detects security breaches.",
          "The algorithm having developed by the team detects security breaches.",
          "The algorithm to develop by the team detects security breaches.",
          "The algorithm currently developing by the team detects security breaches."
        ],
        1,
        "Sıfat-fiil cümlelerindeki pasif kısaltmalarda doğrudan fiilin 3. hali (developed) kullanılır."
      ),
      makeMC(
        "c59_l1_ex3_q9",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"Before the researcher wrote the paper, she replicated the experiment three times.\"</strong>",
        [
          "Before writing the paper, the researcher replicated the experiment three times.",
          "Before written the paper, the researcher replicated the experiment three times.",
          "Replicating the experiment three times, the paper was written by the researcher.",
          "Having been written the paper, the researcher replicated the experiment three times.",
          "Before to write the paper, the researcher replicated the experiment three times."
        ],
        0,
        "Zaman bağlaçlarından (before, after) sonra gelen aktif fiil, özne ortaklığıyla Gerund/Participle formatında kısaltılabilir."
      ),
      makeMC(
        "c59_l1_ex3_q10",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"Because the substance is extremely volatile, it evaporates quickly when exposed to heat.\"</strong>",
        [
          "Being extremely volatile, the substance evaporates quickly when exposed to heat.",
          "Been extremely volatile, the substance evaporates quickly when exposed to heat.",
          "Having been extremely volatile, the substance evaporates quickly when exposed to heat.",
          "Extremely volatilely, the substance evaporates quickly when exposed to heat.",
          "To be extremely volatile, the substance evaporates quickly when exposed to heat."
        ],
        0,
        "Sebep bildiren 'be' durum fiili, özne ortaklığı durumunda Present Participle formunda 'Being...' ile kısaltılır."
      )
    ];

    lessons.push({
      id: "c59_l1",
      unitId: 62,
      title: "Sentaktik Labirent: İleri Düzey '-ing' Analiz Testi",
      subtitle: "Diagnostic assessment of Gerunds, Present Participles, and Participle Clauses.",
      exercises: [
        {
          id: "c59_l1_ex1",
          createdAt: "2026-07-20T15:32:00+03:00",
          title: "Alıştırma 1: Gramer Görevleri ve Anlam Kaymaları",
          description: "Özne/tümleç konumları, algı fiilleri ve anlamı değişen fiiller.",
          questions: u59_ex1_q
        },
        {
          id: "c59_l1_ex2",
          createdAt: "2026-07-20T15:32:00+03:00",
          title: "Alıştırma 2: Prepozisyonel Nesneler ve Niteleyiciler",
          description: "Edat olan 'to' arkasından gerund kullanımı ve sıfat-fiil kısaltmaları.",
          questions: u59_ex2_q
        },
        {
          id: "c59_l1_ex3",
          createdAt: "2026-07-20T15:32:00+03:00",
          title: "Alıştırma 3: Gelişmiş Zarf Kısaltmaları",
          description: "Etken, edilgen, öncelikli ve olumsuz zarf cümleciği kısaltmaları.",
          questions: u59_ex3_q
        }
      ],
      konuAnlatimi: {
        baslik: "İleri Düzey '-ing' Formları Teşhis Kılavuzu",
        teorikMantik: "Bu teşhis testi, '-ing' ekinin İngilizce sentaksındaki dört temel fonksiyonunu (Gerund, Present Participle, Participle Clause, Continuous Aspect) akademik düzeyde ayırt etmenizi sağlar.",
        formul: "Gerund (İsim-Fiil) vs. Participle (Zarf/Sıfat Kısaltması)",
        altinKural: "Her zaman cümlenin ana yüklemini ve cümlenin gerçek öznesini bularak etken/edilgen ve öncelik/sonralık ilişkilerini kontrol edin."
      }
    });
  }

  // ==========================================
  // BÖLÜM 59: SENTAKTİK KRİPTOLOJİ: PAST PARTICIPLE (-ED) VE EDİLGEN SENTEZ
  // ==========================================
  if (typeof units !== 'undefined' && typeof lessons !== 'undefined' && typeof rawTopics !== 'undefined') {
    const topic59 = {
      "id": 63,
      "startLessonId": 590,
      "originalIndex": 59,
      "title": "Sentaktik Kriptoloji: Past Participle (-ed) ve Edilgen Sentez",
      "desc": "-ed (Past Participle) formunun ileri düzey kullanımları, edilgen kısaltmalar, sıfat işlevleri ve ettirgen yapılar üzerine 30 soruluk teşhis testi.",
      "icon": "⛓️",
      "numLessons": 1,
      "formulas": [
        {
          "formula": "Reduced Passive Relative Clause -> Noun + V3 (unearthed / implemented)",
          "example": "artifacts unearthed (which were unearthed) / regulations implemented",
          "description": "İlgi cümleciklerinin edilgen kısaltmalarında past participle kullanımı."
        },
        {
          "formula": "Passive Participle Clause (Opener/Closer) -> V3..., S + V + O",
          "example": "Alarmed by the collapse, the agency intervened. / Accompanied by nurses, the patient left.",
          "description": "Zarf cümleciklerinin edilgen kısaltmalarında cümle başı ve sonu past participle kullanımı."
        },
        {
          "formula": "Experiencing (-ed) vs. Causing (-ing) -> Adjectival Distinction",
          "example": "agitated subjects (feeling) vs. worrying development (causing)",
          "description": "Sıfatlaşmış ortaçlarda duygu deneyimleyen ile duyguya sebep olan ayrımı."
        },
        {
          "formula": "Perfect Passive Participle -> Having been + V3",
          "example": "Having been criticized by reviewers, the paper was rejected.",
          "description": "Zarf cümleciklerinde geçmişteki edilgen eylemlerin öncelik-sonralık ilişkisiyle kısaltılması."
        },
        {
          "formula": "Causative Passive -> Have/Get + Object + V3",
          "example": "had the sequence analyzed / got the servers backed up",
          "description": "Ettirgen yapılarda nesnenin edilgen durumu için past participle kullanımı."
        },
        {
          "formula": "Past Participle after Stative Verbs -> remain / become + V3",
          "example": "remained unconvinced / became alarmed",
          "description": "Durum bildiren bağlama fiillerinden sonra adjectival past participle kullanımı."
        }
      ],
      "subtitles": [
        "1. İleri Düzey '-ed' Teşhis ve Sentaks Testi"
      ],
      "originalNumLessons": 1
    };

    rawTopics.push(topic59);

    units.push({
      id: 63,
      originalIndex: topic59.originalIndex,
      title: topic59.title,
      description: topic59.desc,
      lessons: ["c60_l1"],
      pages: "Ed-Synthesis"
    });

    const ex1_q = [
      makeMC(
        "c60_l1_ex1_q1",
        "The archaeological artifacts _______ during the recent excavations of the Neolithic settlement are currently undergoing carbon-dating analysis to verify their chronological age.",
        ["that unearthed", "unearthing", "unearthed", "were unearthed", "having unearthed"],
        2,
        "Doğru cevap C (unearthed). Bu boşluk bir Reduced Passive Relative Clause (kısaltılmış edilgen sıfat tümleciği) gerektirir; 'artifacts which were unearthed' yapısının kısaltılmış halidir. A şıkkı aktif bir ilgi cümleciğidir (artifacts that unearthed = kazıyı yapan eserler); B şıkkı aktif present participle yapısıdır; D şıkkı finite (çekimli) fiil olup 'are undergoing' ana yüklemiyle run-on cümle hatası oluşturur; E şıkkı ise aktif perfect participle yapısıdır."
      ),
      makeMC(
        "c60_l1_ex1_q2",
        "_______ by the sudden collapse of the major investment bank, the federal regulatory agency intervened immediately to stabilize the national financial market.",
        ["Alarmed", "Alarming", "To alarm", "Having alarmed", "Alarm"],
        0,
        "Doğru cevap A (Alarmed). Cümle başında edilgen zarf cümleciği kısaltması (Passive Participle Clause) kullanılmıştır; 'Because they were alarmed by...' anlamını verir. B şıkkı (Alarming) aktif olup 'endişe verici' anlamıyla ajansı niteleyemez; C şıkkı amaç bildiren to-infinitive yapısıdır; D şıkkı aktif perfect participle yapısıdır; E şıkkı ise yalın fiildir ve bu pozisyonda kullanılamaz."
      ),
      makeMC(
        "c60_l1_ex1_q3",
        "_______ by multiple peer-reviewers for its methodological shortcomings, the manuscript was ultimately rejected by the editorial board of the medical journal.",
        ["Having criticized", "Criticizing", "Having been criticized", "Criticizedly", "To be criticizing"],
        2,
        "Doğru cevap C (Having been criticized). Ana cümlenin yükleminden (was rejected) daha önce gerçekleşmiş edilgen bir eylemi nitelemek için Perfect Passive Participle (Having been + V3) kullanılmalıdır. A şıkkı aktif önceliklidir (makale eleştirmiş gibi olur); B şıkkı aktif present participle yapısıdır; D şıkkı zarftır; E şıkkı ise aktif ve sürekli mastar yapısıdır."
      ),
      makeMC(
        "c60_l1_ex1_q4",
        "The clinical researchers observed that the test subjects, when subjected to the high-frequency auditory stimulus, became increasingly _______ and showed elevated levels of cortisol.",
        ["agitated", "agitating", "agitates", "to agitate", "having agitated"],
        0,
        "Doğru cevap A (agitated). 'became' bağlama fiilinden (linking verb) sonra öznenin (subjects) hissettiği durumu tanımlayan bir sıfat gelmelidir. -ed takılı participial sıfatlar hisleri tanımlar. B şıkkı (agitating) rahatsız edici/kışkırtıcı anlamına gelip duruma sebep olanı tanımlar; C şıkkı çekimli fiildir; D şıkkı to-infinitive yapısıdır; E şıkkı ise perfect participle yapısıdır."
      ),
      makeMC(
        "c60_l1_ex1_q5",
        "The lead research team decided to have the genetic sequence _______ by an external biotechnology laboratory to eliminate any potential bias in their findings.",
        ["analyze", "analyzing", "analyzed", "to analyze", "has analyzed"],
        2,
        "Doğru cevap C (analyzed). 'Have + object + V3' ettirgen (causative) yapısı kullanılmıştır. Genetik dizilim analiz etme eylemini kendi yapmadığı, laboratuvar tarafından edilgen olarak yapıldığı için V3 (analyzed) gelmelidir. A şıkkı aktif ettirgen fiilidir; B şıkkı aktif present participle yapısıdır; D şıkkı get fiiliyle kullanılan aktif to-infinitive yapısıdır; E şıkkı ise çekimli fiildir."
      ),
      makeMC(
        "c60_l1_ex1_q6",
        "Despite numerous attempts by the public relations team to clarify the CEO's controversial statements, the public remained _______ about the company's ethical stance.",
        ["unconvinced", "unconvincing", "unconvincedly", "to unconvinced", "unconvincedness"],
        0,
        "Doğru cevap A (unconvinced). 'remained' stative/linking fiilinden sonra öznenin (public) durumunu niteleyen bir sıfat gerekmektedir. Halk ikna olmadığı için edilgen anlam taşıyan 'unconvinced' sıfatı uygundur. B şıkkı (unconvincing) halkı inandırıcı olmayan/şüphe uyandıran (sebep olan) yapar; C şıkkı zarftır; D şıkkı edatlı yapıdır; E şıkkı ise isimdir."
      ),
      makeMC(
        "c60_l1_ex1_q7",
        "The stringent regulations _______ by the municipal council last month aim to curb carbon emissions by penalizing businesses that fail to meet environmental standards.",
        ["implementing", "implemented", "were implemented", "to implement", "having implemented"],
        1,
        "Doğru cevap B (implemented). 'regulations' ismini arkasından pasif olarak niteleyen bir Reduced Passive Relative Clause (implemented = yürürlüğe koyulan) gereklidir. A şıkkı aktif ortaçtır; C şıkkı çekimli fiil olup 'aim' ana yüklemiyle cümle karmaşası (run-on) yaratır; D şıkkı gelecek zaman/amaç bildiren infinitive'dir; E şıkkı ise aktif öncelikli yapıdır."
      ),
      makeMC(
        "c60_l1_ex1_q8",
        "The patient was discharged from the hospital on Tuesday morning, _______ by a team of specialist home-care nurses who will monitor his recovery.",
        ["accompanied", "accompanying", "to accompany", "having accompanied", "accompanies"],
        0,
        "Doğru cevap A (accompanied). Cümle sonundaki pasif ortaç kısaltması (Passive Participle Clause as Closer) 'accompanied by...' (hemşireler tarafından eşlik edilerek) yapısıdır. B şıkkı aktif olup hastanın hemşirelere eşlik ettiğini belirtir; C şıkkı amaç bildirir; D şıkkı aktif öncelikli ortaçtır; E şıkkı ise geniş zaman çekimli fiilidir."
      ),
      makeMC(
        "c60_l1_ex1_q9",
        "_______ in several prestigious art exhibitions across Europe, the painting's market value skyrocketed before it was finally auctioned in London.",
        ["Having displayed", "Displaying", "Having been displayed", "Displayedly", "To display"],
        2,
        "Doğru cevap C (Having been displayed). Tablo sergilendiği için edilgen ve ana eylemden (skyrocketed) daha önce gerçekleştiği için öncelik bildiren Perfect Passive Participle (Having been + V3) kullanılmalıdır. A şıkkı aktiftir (tablo bir şeyi sergilemiş olur); B şıkkı aktif süreklidir; D şıkkı uydurma bir zarftır; E şıkkı ise aktif infinitive'dir."
      ),
      makeMC(
        "c60_l1_ex1_q10",
        "The macroeconomist argued that the persistent rise in commodity prices is a highly _______ development that could undermine consumer confidence.",
        ["worried", "worrying", "worries", "worry", "to worry"],
        1,
        "Doğru cevap B (worrying). 'development' (gelişme) cansız bir varlık olup endişe duyma hissini yaşayamaz (worried olamaz), aksine endişeye sebep olur. Bu yüzden sebep bildiren sıfat 'worrying' (endişe verici) seçilmelidir. C şıkkı çekimli fiil veya çoğul isimdir; D şıkkı fiil/isimdir; E şıkkı ise infinitive yapısıdır."
      )
    ];

    const ex2_q = [
      makeMC(
        "c60_l1_ex2_q1",
        "Identify the grammatically incorrect underlined part in the sentence:<br><br>\"The clinical trial (A) <u>conducting</u> to test the efficacy of the new oncology drug was suspended (B) <u>due to</u> unforeseen side effects (C) <u>reported</u> by several (D) <u>participants</u>. (E) No error.\"",
        ["(A) conducting", "(B) due to", "(C) reported", "(D) participants", "No error"],
        0,
        "Doğru cevap A. 'clinical trial' (klinik deney) kendi kendini yürütemez, araştırmacılar tarafından yürütülür. Bu nedenle aktif 'conducting' yerine edilgen sıfat-fiil kısaltması olan **conducted** kullanılmalıdır."
      ),
      makeMC(
        "c60_l1_ex2_q2",
        "Identify the grammatically incorrect underlined part in the sentence:<br><br>\"(A) <u>Convincing</u> that the experimental results were anomalous, the chief scientist (B) <u>ordered</u> the lab technicians (C) <u>to repeat</u> the entire (D) <u>procedure</u>. (E) No error.\"",
        ["(A) Convincing", "(B) ordered", "(C) to repeat", "(D) procedure", "No error"],
        0,
        "Doğru cevap A. Bilim insanı başkalarını ikna etmek yerine kendisi ikna olduğu (edilgen durum) için cümle başı kısaltmada aktif 'Convincing' yerine edilgen anlam katan **Convinced** (ikna olmuş bir şekilde) kullanılmalıdır."
      ),
      makeMC(
        "c60_l1_ex2_q3",
        "Identify the grammatically incorrect underlined part in the sentence:<br><br>\"(A) <u>Having audited</u> twice by independent financial inspectors, the company's balance sheet (B) <u>was</u> declared free of (C) <u>material</u> (D) <u>misstatements</u>. (E) No error.\"",
        ["(A) Having audited", "(B) was", "(C) material", "(D) misstatements", "No error"],
        0,
        "Doğru cevap A. 'balance sheet' (bilanço) denetleme işlemini kendi yapmaz, denetçiler tarafından denetlenir. Bu nedenle öncelik bildiren kısaltma aktif 'Having audited' değil, edilgen **Having been audited** olmalıdır."
      ),
      makeMC(
        "c60_l1_ex2_q4",
        "Identify the grammatically incorrect underlined part in the sentence:<br><br>\"After hours of debating (A) <u>confusing</u> financial policies, the board members felt extremely (B) <u>exhausting</u> and (C) <u>disappointed</u> with the lack (D) <u>of progress</u>. (E) No error.\"",
        ["(A) confusing", "(B) exhausting", "(C) disappointed", "(D) of progress", "No error"],
        1,
        "Doğru cevap B. Yönetim kurulu üyeleri canlı varlıklar olarak yorgunluk hissini yaşamaktadırlar. Başkalarını yoran değil kendileri yorulmuş oldukları için 'exhausting' (yorucu) değil, **exhausted** (yorgun/tükenmiş) sıfatı getirilmelidir."
      ),
      makeMC(
        "c60_l1_ex2_q5",
        "Identify the grammatically incorrect underlined part in the sentence:<br><br>\"In order to prevent data loss, the IT manager (A) <u>had</u> the entire database (B) <u>backup</u> onto (C) <u>secured</u> cloud servers (D) <u>overnight</u>. (E) No error.\"",
        ["(A) had", "(B) backup", "(C) secured", "(D) overnight", "No error"],
        1,
        "Doğru cevap B. 'had + nesne + V3' passive causative (edilgen ettirgen) yapısında database yedekleme işini alan/edilgen ögedir. Bu yüzden bare infinitive olan 'backup' yerine past participle olan **backed up** kullanılmalıdır."
      ),
      makeMC(
        "c60_l1_ex2_q6",
        "Identify the grammatically incorrect underlined part in the sentence:<br><br>\"The local population (A) <u>became</u> highly (B) <u>alarming</u> when the government (C) <u>refused</u> to disclose the source of the chemical leak in (D) <u>the river</u>. (E) No error.\"",
        ["(A) became", "(B) alarming", "(C) refused", "(D) the river", "No error"],
        1,
        "Doğru cevap B. Yerel halk korku/endişe hissini deneyimleyen taraf olduğu için durum bildiren 'became' fiilinden sonra endişe veren anlamındaki 'alarming' değil, endişelenen anlamındaki **alarmed** sıfatı getirilmelidir."
      ),
      makeMC(
        "c60_l1_ex2_q7",
        "Identify the grammatically incorrect underlined part in the sentence:<br><br>\"The physical theories (A) <u>which proposed</u> by the late physicist in his final paper (B) <u>have</u> revolutionized (C) <u>our</u> understanding of quantum gravity (D) <u>mechanics</u>. (E) No error.\"",
        ["(A) which proposed", "(B) have", "(C) our", "(D) mechanics", "No error"],
        0,
        "Doğru cevap A. Fizik teorileri kendilerini teklif edemez, fizikçi tarafından edilgen olarak sunulmuştur. Dolayısıyla 'which proposed' (aktif) yapısı yanlış olup yerine **proposed** ya da **which were proposed** (edilgen) getirilmelidir."
      ),
      makeMC(
        "c60_l1_ex2_q8",
        "Identify the grammatically incorrect underlined part in the sentence:<br><br>\"The diplomat delivered (A) <u>a speech</u> at the global summit, (B) <u>supporting</u> by a team of advisors (C) <u>who</u> had spent months (D) <u>preparing</u> the briefing materials. (E) No error.\"",
        ["(A) a speech", "(B) supporting", "(C) who", "(D) preparing", "No error"],
        1,
        "Doğru cevap B. Diplomat danışmanlar tarafından desteklendiği için (arkasından 'by' edatı gelmiştir) aktif 'supporting' değil, edilgen ortaç olan **supported** kullanılmalıdır."
      ),
      makeMC(
        "c60_l1_ex2_q9",
        "Identify the grammatically incorrect underlined part in the sentence:<br><br>\"(A) <u>Having electing</u> as the new chairperson, the professor (B) <u>promised</u> to advocate for (C) <u>increased</u> funding (D) <u>for research</u>. (E) No error.\"",
        ["(A) Having electing", "(B) promised", "(C) increased", "(D) for research", "No error"],
        0,
        "Doğru cevap A. Profesör yeni başkan olarak seçildiği (edilgen) ve bu eylem vaat etmesinden önce gerçekleştiği için aktif perfect participle olan 'Having electing' yerine edilgen olan **Having been elected** yapısı kullanılmalıdır."
      ),
      makeMC(
        "c60_l1_ex2_q10",
        "Identify the grammatically incorrect underlined part in the sentence:<br><br>\"The security policies (A) <u>implementing</u> by the administration last year (B) <u>failed</u> to yield the (C) <u>desired</u> results in mitigating cyber (D) <u>threats</u>. (E) No error.\"",
        ["(A) implementing", "(B) failed", "(C) desired", "(D) threats", "No error"],
        0,
        "Doğru cevap A. Güvenlik politikaları yönetim tarafından yürürlüğe konduğu için edilgendir. Aktif 'implementing' yerine edilgen kısaltma olan **implemented** kullanılmalıdır."
      )
    ];

    const ex3_q = [
      makeMC(
        "c60_l1_ex3_q1",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"The guidelines approved by the advisory board were distributed to the staff.\"</strong>",
        [
          "The advisory board approved the guidelines that the staff distributed.",
          "After the advisory board approved the guidelines, they were distributed to the staff.",
          "The guidelines, which the advisory board was approving them, were distributed to the staff.",
          "The guidelines that approved the advisory board were distributed to the staff.",
          "Having approved the guidelines, the staff distributed them to the advisory board."
        ],
        1,
        "Doğru cevap B. 'approved by...' edilgen sıfat-fiil yapısı, 'tavsiye kurulu onayladıktan sonra' şeklinde temporal bir aktif yan cümleye ('After the advisory board approved...') doğru bir biçimde dönüştürülmüştür."
      ),
      makeMC(
        "c60_l1_ex3_q2",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"Confronted with budget constraints, the department director cancelled the project.\"</strong>",
        [
          "Because the budget constraints confronted the director, the project was cancelled by the constraints.",
          "As the department director was confronting with budget constraints, he cancelled the project.",
          "Because he was confronted with budget constraints, the department director cancelled the project.",
          "The project was cancelled by the department director who was confronting the budget constraints.",
          "Although he confronted budget constraints, the department director cancelled the project."
        ],
        2,
        "Doğru cevap C. Cümle başındaki sebep bildiren 'Confronted with...' edilgen zarf cümleciği kısaltması, 'Because he was confronted with...' şeklinde bir sebep cümlesine doğru olarak açılmıştır."
      ),
      makeMC(
        "c60_l1_ex3_q3",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"Having been dismissed by the board of trustees, the dean issued a public statement.\"</strong>",
        [
          "After the dean had dismissed the board of trustees, he issued a public statement.",
          "Because he dismissed the board of trustees, the dean issued a public statement.",
          "After he had been dismissed by the board of trustees, the dean issued a public statement.",
          "The dean issued a public statement as he was dismissing the board of trustees.",
          "Having dismissed him, the board of trustees issued a public statement."
        ],
        2,
        "Doğru cevap C. 'Having been dismissed by...' (Mütevelli heyeti tarafından görevden alındıktan sonra) şeklindeki edilgen ve öncelikli kısaltma, past perfect passive bir yan cümle olan 'After he had been dismissed by...' ile doğru ifade edilmiştir."
      ),
      makeMC(
        "c60_l1_ex3_q4",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"The results of the archaeological study left the research team fascinated.\"</strong>",
        [
          "The research team found the results of the archaeological study fascinating.",
          "The research team was fascinating by the results of the archaeological study.",
          "Because they were fascinating, the research team left the archaeological study.",
          "The archaeological study fascinated the results that left the research team.",
          "The results left the research team to be fascinating."
        ],
        0,
        "Doğru cevap A. 'left the research team fascinated' (araştırma ekibini büyülenmiş bıraktı) ifadesi, 'ekip sonuçları büyüleyici buldu' (found the results fascinating) olarak anlamsal açıdan tam olarak eşleşir. Nesne/sonuç büyüleyicidir (fascinating), ekip ise büyülenmiştir (fascinated)."
      ),
      makeMC(
        "c60_l1_ex3_q5",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"We had the document translated by a certified translator to ensure accuracy.\"</strong>",
        [
          "We translated the document ourselves because we are certified translators.",
          "A certified translator had us translate the document to ensure accuracy.",
          "We got a certified translator to translate the document so that accuracy was ensured.",
          "The document had translated us by a certified translator.",
          "We translated a certified translator to ensure the accuracy of the document."
        ],
        2,
        "Doğru cevap C. 'had the document translated' edilgen causative (ettirgen) yapısı, get ile kurulan aktif ettirgen yapı olan 'got a certified translator to translate...' (yeminli tercümana tercüme ettirdik) biçimiyle eş anlamlıdır."
      ),
      makeMC(
        "c60_l1_ex3_q6",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"The historical artifacts remained hidden in the vault for decades.\"</strong>",
        [
          "The historical artifacts kept hiding themselves in the vault for decades.",
          "Because they remained in the vault, the historical artifacts were hiding.",
          "The vault remained hidden by the historical artifacts for decades.",
          "For decades, the historical artifacts continued to be hidden in the vault.",
          "The historical artifacts remained to hide in the vault for decades."
        ],
        3,
        "Doğru cevap D. 'remained hidden' (gizli kalmaya devam etti) durum ifadesi, past passive durumunu koruyan 'continued to be hidden' (gizli tutulmaya devam edildi) yapısı ile doğru bir şekilde restate edilmiştir."
      ),
      makeMC(
        "c60_l1_ex3_q7",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"The feedback received from the clients influenced our product design.\"</strong>",
        [
          "The clients received feedback that influenced our product design.",
          "The feedback, which was received from the clients, influenced our product design.",
          "Because we received feedback, the clients influenced our product design.",
          "Our product design influenced the feedback that was received by the clients.",
          "The feedback which receiving from the clients influenced our product design."
        ],
        1,
        "Doğru cevap B. 'feedback received from...' (müşterilerden alınan geri bildirim) kısaltması, 'which was received from...' edilgen sıfat tümleciği biçiminde doğru ve tam olarak açılmıştır."
      ),
      makeMC(
        "c60_l1_ex3_q8",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"Disappointed by the performance metrics, the manager ordered an audit.\"</strong>",
        [
          "Because the performance metrics were disappointing, the manager ordered an audit.",
          "The manager ordered an audit because he was disappointing to the metrics.",
          "Disappointing the performance metrics, the manager ordered an audit.",
          "Because the manager disappointed the performance metrics, he ordered an audit.",
          "Although the metrics were disappointed, the manager ordered an audit."
        ],
        0,
        "Doğru cevap A. Yönetici metriklerden hayal kırıklığına uğradığı için ('Disappointed by...'), metrikler hayal kırıklığı yaratıcıdır ('metrics were disappointing'). A seçeneği bu neden-sonuç ilişkisini doğru sıfatlarla kurmuştur."
      ),
      makeMC(
        "c60_l1_ex3_q9",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"Having been selected for the scholarship, she moved to Oxford.\"</strong>",
        [
          "Because she had selected the scholarship, she moved to Oxford.",
          "After she had been selected for the scholarship, she moved to Oxford.",
          "She moved to Oxford in order to be selecting for the scholarship.",
          "Having selected her, the scholarship moved she to Oxford.",
          "She was selected for the scholarship because she moved to Oxford."
        ],
        1,
        "Doğru cevap B. 'Having been selected...' (Burs için seçildikten sonra) şeklindeki edilgen ve öncelikli kısaltma, past perfect passive yan cümle 'After she had been selected...' ile anlamını tam olarak korur."
      ),
      makeMC(
        "c60_l1_ex3_q10",
        "Choose the sentence that has the closest meaning to:<br><br><strong>\"The lecture on quantum physics was extremely boring, which made the students feel bored.\"</strong>",
        [
          "The bored lecture on quantum physics made the boring students.",
          "Because the lecture was bored, the students felt boring.",
          "Because the students were boring, they found the lecture bored.",
          "The boring lecture on quantum physics left the bored students asleep.",
          "The lecture, which was boring to the students, left them feeling bored."
        ],
        4,
        "Doğru cevap E. Dersin sıkıcı olmasını 'boring' sıfatıyla, öğrencilerin hissettiği sıkılma durumunu ise 'feeling bored' ile doğru ve dengeli bir biçimde ifade eden seçenek E'dir."
      )
    ];

    lessons.push({
      id: "c60_l1",
      unitId: 63,
      title: "Sentaktik Kriptoloji: Past Participle (-ed) ve Edilgen Sentez",
      subtitle: "Diagnostic assessment of Past Participles, Reduced Passives, and Causative structures.",
      exercises: [
        {
          id: "c60_l1_ex1",
          createdAt: "2026-07-20T15:59:00+03:00",
          title: "Part 1: Cümle Tamamlama (Sentence Completion)",
          description: "Past participle formunun sıfat tümleçleri, zarf kısaltmaları ve ettirgen yapılardaki doğru konumlandırılması.",
          questions: ex1_q
        },
        {
          id: "c60_l1_ex2",
          createdAt: "2026-07-20T15:59:00+03:00",
          title: "Part 2: Hata Belirleme (Error Identification)",
          description: "Çekimli fiil/ortaç karmaşası, etken/edilgen uyumsuzlukları ve participial sıfat hatalarının tespiti.",
          questions: ex2_q
        },
        {
          id: "c60_l1_ex3",
          createdAt: "2026-07-20T15:59:00+03:00",
          title: "Part 3: Zarf Cümlecikleri Dönüşümleri (Restatement)",
          description: "Kısaltılmış edilgen yapıların mantıksal neden, zaman ve durum bağlaçlarıyla tam açılımları.",
          questions: ex3_q
        }
      ],
      konuAnlatimi: {
        baslik: "Kriptik Sentaks: Past Participle (-ed) Kılavuzu",
        teorikMantik: "Bu teşhis testi, '-ed' ekinin İngilizce sentaksındaki altı temel fonksiyonunu (Reduced Relative Clauses, Passive Participle Clauses, Participial Adjectives, Perfect Passive Participles, Causative Structures ve Linking Verbs sonrası V3) ayırt etmenizi hedefler.",
        formul: "Noun + V3 (Relative) | V3..., S+V+O (Adverbial) | Experiencing (-ed) vs. Causing (-ing)",
        altinKural: "Bir ortaç ekinin etken mi edilgen mi olduğunu tespit etmek için nitelediği veya kısaltıldığı ismin/öznenin eylemi gerçekleştiren mi maruz kalan mı olduğunu daima kontrol edin."
      }
    });
  }

})();

