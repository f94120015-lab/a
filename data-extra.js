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

  const u55 = units.find(u => u.id === 55);
  if (u55) {
    if (!u55.lessons.includes("c56_l4")) u55.lessons.push("c56_l4");
    if (!u55.lessons.includes("c56_l5")) u55.lessons.push("c56_l5");
    if (!u55.lessons.includes("c56_l6")) u55.lessons.push("c56_l6");
    if (!u55.lessons.includes("c56_l7")) u55.lessons.push("c56_l7");
  }

  lessons.push({
    id: "c56_l4",
    unitId: 55,
    title: "4. Devrik Koşul Yapıları",
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
    unitId: 55,
    title: "5. Alternatif Koşul Yapıları",
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
    unitId: 55,
    title: "6. Diğer Koşul Bağlaçları",
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
    unitId: 55,
    title: "7. Keşke Yapıları",
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
  // BÖLÜM 16 EDİLGEN YAPILAR YENİDEN YAPILANDIRMA
  // ============================================================

  // Sözlük kelimelerini genişletiyoruz
  if (typeof wordDictionary !== 'undefined') {
    Object.assign(wordDictionary, {
      "scholar": "akademisyen / bilgin",
      "observed": "gözlemlendi / gözlemlenen",
      "treaty": "antlaşma",
      "delegation": "heyet / kurul",
      "weakened": "zayıflatıldı / zayıflamış",
      "challenged": "sorgulandı / sorgulanan",
      "hostilities": "düşmanlıklar",
      "escalated": "tırmandı / tırmanan",
      "cinema": "sinema",
      "documented": "belgelendi / belgelenen",
      "ignored": "göz ardı edildi / göz ardı edilen",
      "dictated": "dikte edildi / dikte edilen",
      "digitalized": "dijitalleştirildi / dijitalleştirilen",
      "enforced": "uygulandı / uygulanan",
      "beautifully": "güzelce / sanatsal bir şekilde",
      "universally": "evrensel olarak",
      
      // Unit 36 Hedging (Yumuşatma) Kelimeleri
      "presumably": "tahminen / muhtemelen",
      "undeniably": "inkar edilemez bir şekilde",
      "irresponsibly": "sorumsuzca",
      "likely": "muhtemel",
      "definitely": "kesinlikle",
      "completely": "tamamen",
      "absolutely": "kesinlikle / tamamen",
      "arguably": "tartışmalı bir şekilde / ileri sürülebilir ki",
      "narrowly": "dar bir şekilde / ucu ucuna",
      "hopelessly": "umutsuzca",
      "defectively": "kusurlu bir şekilde",
      "partially": "kısmen",
      "totally": "tamamen",
      "entirely": "tamamen",
      "largely": "büyük ölçüde",
      "never": "asla",
      "ruinously": "yıkıcı bir şekilde",
      "foolishly": "aptalca",
      "generally": "genellikle",
      "instantly": "anında",
      "doubtfully": "şüpheyle",
      "rarely": "nadiren"
    });
  }

  const myUnit10LessonSentences = {
    1: [
      { en: "The legal document is translated by the scholar.", tr: "Yasal belge akademisyen tarafından çevrilir.", word: "translated", trWord: "çevrilir", blank: "The legal document is ___ by the scholar.", grammarTags: ["Edilgen Yapı (Passive)", "Geniş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["The legal document", "is translated", "by the scholar."], trBlocks: ["Yasal belge", "akademisyen tarafından", "çevrilir."] },
      { en: "Historical records are preserved in the archive.", tr: "Tarihsel kayıtlar arşivde korunur.", word: "preserved", trWord: "korunur", blank: "Historical records are ___ in the archive.", grammarTags: ["Edilgen Yapı (Passive)", "Geniş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Historical records", "are preserved", "in the archive."], trBlocks: ["Tarihsel kayıtlar", "arşivde", "korunur."] },
      { en: "The economic policies were changed by the government.", tr: "Ekonomik politikalar hükümet tarafından değiştirildi.", word: "changed", trWord: "değiştirildi", blank: "The economic policies were ___ by the government.", grammarTags: ["Edilgen Yapı (Passive)", "Geçmiş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["The economic policies", "were changed", "by the government."], trBlocks: ["Ekonomik politikalar", "hükümet tarafından", "değiştirildi."] },
      { en: "Cognitive behavior was observed in patients.", tr: "Bilişsel davranış hastalarda gözlemlendi.", word: "observed", trWord: "gözlemlendi", blank: "Cognitive behavior was ___ in patients.", grammarTags: ["Edilgen Yapı (Passive)", "Geçmiş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Cognitive behavior", "was observed", "in patients."], trBlocks: ["Bilişsel davranış", "hastalarda", "gözlemlendi."] },
      { en: "The peace treaty will be signed by the political delegation.", tr: "Barış antlaşması siyasi heyet tarafından imzalanacak.", word: "signed", trWord: "imzalanacak", blank: "The peace treaty will be ___ by the political delegation.", grammarTags: ["Edilgen Yapı (Passive)", "Gelecek Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["The peace treaty", "will be signed", "by the political delegation."], trBlocks: ["Barış antlaşması", "siyasi heyet tarafından", "imzalanacak."] },
      { en: "The monetary system will not be weakened by the reform.", tr: "Parasal sistem reform tarafından zayıflatılmayacak.", word: "weakened", trWord: "zayıflatılmayacak", blank: "The monetary system will not be ___ by the reform.", grammarTags: ["Edilgen Yapı (Passive)", "Gelecek Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["The monetary system", "will not be weakened", "by the reform."], trBlocks: ["Parasal sistem", "reform tarafından", "zayıflatılmayacak."] },
      { en: "Political authority has been challenged by the citizens.", tr: "Siyasi otorite vatandaşlar tarafından sorgulanmıştır.", word: "challenged", trWord: "sorgulanmıştır", blank: "Political authority has been ___ by the citizens.", grammarTags: ["Edilgen Yapı (Passive)", "Yakın Geçmiş Zaman (Present Perfect)", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Political authority", "has been challenged", "by the citizens."], trBlocks: ["Siyasi otorite", "vatandaşlar tarafından", "sorgulanmıştır."] },
      { en: "Cognitive conflict has not been resolved by the psychologist.", tr: "Bilişsel çatışma psikolog tarafından çözülmemiştir.", word: "resolved", trWord: "çözülmemiştir", blank: "Cognitive conflict has not been ___ by the psychologist.", grammarTags: ["Edilgen Yapı (Passive)", "Yakın Geçmiş Zaman (Present Perfect)", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Cognitive conflict", "has not been resolved", "by the psychologist."], trBlocks: ["Bilişsel çatışma", "psikolog tarafından", "çözülmemiştir."] },
      { en: "The peace treaty had been approved before hostilities escalated.", tr: "Düşmanlıklar tırmanmadan önce barış antlaşması onaylanmıştı.", word: "approved", trWord: "onaylanmıştı", blank: "The peace treaty had been ___ before hostilities escalated.", grammarTags: ["Edilgen Yapı (Passive)", "Geçmiş Zamanın Hikayesi (Past Perfect)", "İsim Tamlaması", "Zaman Cümleciği (Time Clause)"], enBlocks: ["The peace treaty", "had been approved", "before hostilities escalated."], trBlocks: ["Düşmanlıklar tırmanmadan önce", "barış antlaşması", "onaylanmıştı."] },
      { en: "The state archives had not been examined before the political crisis.", tr: "Siyasi krizden önce devlet arşivleri incelenmemişti.", word: "examined", trWord: "incelenmemişti", blank: "The state archives had not been ___ before the political crisis.", grammarTags: ["Edilgen Yapı (Passive)", "Geçmiş Zamanın Hikayesi (Past Perfect)", "İsim Tamlaması", "Zaman Cümleciği (Time Clause)"], enBlocks: ["The state archives", "had not been examined", "before the political crisis."], trBlocks: ["Siyasi krizden önce", "devlet arşivleri", "incelenmemişti."] },
      { en: "The director's classic film is loved by cinema scholars.", tr: "Yönetmenin klasik filmi sinema akademisyenleri tarafından sevilir.", word: "loved", trWord: "sevilir", blank: "The director's classic film is ___ by cinema scholars.", grammarTags: ["Edilgen Yapı (Passive)", "Geniş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["The director's classic film", "is loved", "by cinema scholars."], trBlocks: ["Yönetmenin klasik filmi", "sinema akademisyenleri tarafından", "sevilir."] },
      { en: "Linguistic variations were not documented in the legal report.", tr: "Yasal raporda dilbilimsel varyasyonlar belgelenmedi.", word: "documented", trWord: "belgelenmedi", blank: "Linguistic variations were not ___ in the legal report.", grammarTags: ["Edilgen Yapı (Passive)", "Geçmiş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Linguistic variations", "were not documented", "in the legal report."], trBlocks: ["Yasal raporda", "dilbilimsel varyasyonlar", "belgelenmedi."] },
      { en: "Economic growth has been predicted by the economist.", tr: "Ekonomik büyüme iktisatçı tarafından öngörülmüştür.", word: "predicted", trWord: "öngörülmüştür", blank: "Economic growth has been ___ by the economist.", grammarTags: ["Edilgen Yapı (Passive)", "Yakın Geçmiş Zaman (Present Perfect)", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Economic growth", "has been predicted", "by the economist."], trBlocks: ["Ekonomik büyüme", "iktisatçı tarafından", "öngörülmüştür."] },
      { en: "Social behavior is not determined by political authority alone.", tr: "Toplumsal davranış tek başına siyasi otorite tarafından belirlenmez.", word: "determined", trWord: "belirlenmez", blank: "Social behavior is not ___ by political authority alone.", grammarTags: ["Edilgen Yapı (Passive)", "Geniş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Social behavior", "is not determined", "by political authority alone."], trBlocks: ["Toplumsal davranış", "tek başına", "siyasi otorite tarafından belirlenmez."] },
      { en: "Unpublished documents had been discovered in the archive by historians.", tr: "Yayınlanmamış belgeler tarihçiler tarafından arşivde keşfedilmişti.", word: "discovered", trWord: "keşfedilmişti", blank: "Unpublished documents had been ___ in the archive by historians.", grammarTags: ["Edilgen Yapı (Passive)", "Geçmiş Zamanın Hikayesi (Past Perfect)", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Unpublished documents", "had been discovered", "in the archive", "by historians."], trBlocks: ["Yayınlanmamış belgeler", "tarihçiler tarafından", "arşivde keşfedilmişti."] }
    ],
    2: [
      { en: "Historical manuscripts must be preserved by the scholar.", tr: "Tarihsel el yazmaları akademisyen tarafından korunmalıdır.", word: "preserved", trWord: "korunmalıdır", blank: "Historical manuscripts must be ___ by the scholar.", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Historical manuscripts", "must be preserved", "by the scholar."], trBlocks: ["Tarihsel el yazmaları", "akademisyen tarafından", "korunmalıdır."] },
      { en: "The economic policies can be changed by the government.", tr: "Ekonomik politikalar hükümet tarafından değiştirilebilir.", word: "changed", trWord: "değiştirilebilir", blank: "The economic policies can be ___ by the government.", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["The economic policies", "can be changed", "by the government."], trBlocks: ["Ekonomik politikalar", "hükümet tarafından", "değiştirilebilir."] },
      { en: "Cognitive conflict cannot be ignored by the psychologist.", tr: "Bilişsel çatışma psikolog tarafından göz ardı edilemez.", word: "ignored", trWord: "göz ardı edilemez", blank: "Cognitive conflict cannot be ___ by the psychologist.", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Cognitive conflict", "cannot be ignored", "by the psychologist."], trBlocks: ["Bilişsel çatışma", "psikolog tarafından", "göz ardı edilemez."] },
      { en: "Monetary behavior should be analyzed by the economist.", tr: "Parasal davranış iktisatçı tarafından analiz edilmelidir.", word: "analyzed", trWord: "analiz edilmelidir", blank: "Monetary behavior should be ___ by the economist.", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Monetary behavior", "should be analyzed", "by the economist."], trBlocks: ["Parasal davranış", "iktisatçı tarafından", "analiz edilmelidir."] },
      { en: "The legal system could be challenged by the citizens.", tr: "Hukuk sistemi vatandaşlar tarafından sorgulanabilir.", word: "challenged", trWord: "sorgulanabilir", blank: "The legal system could be ___ by the citizens.", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["The legal system", "could be challenged", "by the citizens."], trBlocks: ["Hukuk sistemi", "vatandaşlar tarafından", "sorgulanabilir."] },
      { en: "The peace treaty might be signed by the diplomatic delegation.", tr: "Barış antlaşması diplomatik heyet tarafından imzalanabilir.", word: "signed", trWord: "imzalanabilir", blank: "The peace treaty might be ___ by the diplomatic delegation.", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["The peace treaty", "might be signed", "by the diplomatic delegation."], trBlocks: ["Barış antlaşması", "diplomatik heyet tarafından", "imzalanabilir."] },
      { en: "Political authority should not be weakened by the crisis.", tr: "Siyasi otorite kriz tarafından zayıflatılmamalıdır.", word: "weakened", trWord: "zayıflatılmamalıdır", blank: "Political authority should not be ___ by the crisis.", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Political authority", "should not be weakened", "by the crisis."], trBlocks: ["Siyasi otorite", "kriz tarafından", "zayıflatılmamalıdır."] },
      { en: "State policies must not be dictated by religious doctrine.", tr: "Devlet politikaları dini doktrin tarafından dikte edilmemelidir.", word: "dictated", trWord: "dikte edilmemelidir", blank: "State policies must not be ___ by religious doctrine.", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["State policies", "must not be dictated", "by religious doctrine."], trBlocks: ["Devlet politikaları", "dini doktrin tarafından", "dikte edilmemelidir."] },
      { en: "Classic cinema can be studied by humanities scholars.", tr: "Klasik sinemaamp; beşeri bilimler akademisyenleri tarafından incelenebilir.", word: "studied", trWord: "incelenebilir", blank: "Classic cinema can be ___ by humanities scholars.", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Classic cinema", "can be studied", "by humanities scholars."], trBlocks: ["Klasik sinema", "beşeri bilimler akademisyenleri tarafından", "incelenebilir."] },
      { en: "Hostilities could be ended by the diplomatic treaty.", tr: "Düşmanlıklar diplomatik antlaşma tarafından sonlandırılabilir.", word: "ended", trWord: "sonlandırılabilir", blank: "Hostilities could be ___ by the diplomatic treaty.", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Hostilities", "could be ended", "by the diplomatic treaty."], trBlocks: ["Düşmanlıklar", "diplomatik antlaşma tarafından", "sonlandırılabilir."] },
      { en: "Linguistic data cannot be verified without legal documents.", tr: "Dilbilimsel veriler yasal belgeler olmadan doğrulanamaz.", word: "verified", trWord: "doğrulanamaz", blank: "Linguistic data cannot be ___ without legal documents.", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Linguistic data", "cannot be verified", "without legal documents."], trBlocks: ["Dilbilimsel veriler", "yasal belgeler olmadan", "doğrulanamaz."] },
      { en: "Ancient documents should be digitalized by archives.", tr: "Antik belgeler arşivler tarafından dijitalleştirilmelidir.", word: "digitalized", trWord: "dijitalleştirilmelidir", blank: "Ancient documents should be ___ by archives.", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Ancient documents", "should be digitalized", "by archives."], trBlocks: ["Antik belgeler", "arşivler tarafından", "dijitalleştirilmelidir."] },
      { en: "Should the peace treaty be approved by the delegation?", tr: "Barış antlaşması heyet tarafından onaylanmalı mıdır?", word: "approved", trWord: "onaylanmalı mıdır", blank: "Should the peace treaty be ___ by the delegation?", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Soru Yapıları"], enBlocks: ["Should the peace treaty", "be approved", "by the delegation?"], trBlocks: ["Barış antlaşması", "heyet tarafından", "onaylanmalı mıdır?"] },
      { en: "Can cognitive behavior be predicted by a psychologist?", tr: "Bilişsel davranış bir psikolog tarafından öngörülebilir mi?", word: "predicted", trWord: "öngörülebilir mi", blank: "Can cognitive behavior be ___ by a psychologist?", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Soru Yapıları"], enBlocks: ["Can cognitive behavior", "be predicted", "by a psychologist?"], trBlocks: ["Bilişsel davranış", "bir psikolog tarafından", "öngörülebilir mi?"] },
      { en: "Religious doctrines must not be enforced by political authorities.", tr: "Dini doktrinler siyasi otoriteler tarafından uygulanmamalıdır.", word: "enforced", trWord: "uygulanmamalıdır", blank: "Religious doctrines must not be ___ by political authorities.", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Religious doctrines", "must not be enforced", "by political authorities."], trBlocks: ["Dini doktrinler", "siyasi otoriteler tarafından", "uygulanmamalıdır."] }
    ],
    3: [
      { en: "Historical documents are carefully preserved in state archives.", tr: "Tarihsel belgeler devlet arşivlerinde özenle korunur.", word: "preserved", trWord: "korunur", blank: "Historical documents are carefully ___ in state archives.", grammarTags: ["Edilgen Yapı (Passive)", "Geniş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Historical documents", "are carefully preserved", "in state archives."], trBlocks: ["Tarihsel belgeler", "devlet arşivlerinde", "özenle korunur."] },
      { en: "The peace treaty was newly signed by the diplomatic delegation.", tr: "Barış antlaşması diplomatik heyet tarafından yeni imzalandı.", word: "signed", trWord: "imzalandı", blank: "The peace treaty was newly ___ by the diplomatic delegation.", grammarTags: ["Edilgen Yapı (Passive)", "Geçmiş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["The peace treaty", "was newly signed", "by the diplomatic delegation."], trBlocks: ["Barış antlaşması", "diplomatik heyet tarafından", "yeni imzalandı."] },
      { en: "The economic policies were significantly changed by the government.", tr: "Ekonomik politikalar hükümet tarafından önemli ölçüde değiştirildi.", word: "changed", trWord: "değiştirildi", blank: "The economic policies were significantly ___ by the government.", grammarTags: ["Edilgen Yapı (Passive)", "Geçmiş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["The economic policies", "were significantly changed", "by the government."], trBlocks: ["Ekonomik politikalar", "hükümet tarafından", "önemli ölçüde değiştirildi."] },
      { en: "Cognitive behavior was closely observed by psychologists.", tr: "Bilişsel davranış psikologlar tarafından yakından gözlemlendi.", word: "observed", trWord: "gözlemlendi", blank: "Cognitive behavior was closely ___ by psychologists.", grammarTags: ["Edilgen Yapı (Passive)", "Geçmiş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Cognitive behavior", "was closely observed", "by psychologists."], trBlocks: ["Bilişsel davranış", "psikologlar tarafından", "yakından gözlemlendi."] },
      { en: "Political authority was gradually weakened by social crisis.", tr: "Siyasi otorite toplumsal kriz tarafından kademeli olarak zayıflatıldı.", word: "weakened", trWord: "zayıflatıldı", blank: "Political authority was gradually ___ by social crisis.", grammarTags: ["Edilgen Yapı (Passive)", "Geçmiş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Political authority", "was gradually weakened", "by social crisis."], trBlocks: ["Siyasi otorite", "toplumsal kriz tarafından", "kademeli olarak zayıflatıldı."] },
      { en: "The monetary behavior of citizens is highly influenced by interest rates.", tr: "Vatandaşların parasal davranışı faiz oranlarından yüksek derecede etkilenir.", word: "influenced", trWord: "etkilenir", blank: "The monetary behavior of citizens is highly ___ by interest rates.", grammarTags: ["Edilgen Yapı (Passive)", "Geniş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["The monetary behavior of citizens", "is highly influenced", "by interest rates."], trBlocks: ["Vatandaşların parasal davranışı", "faiz oranlarından", "yüksek derecede etkilenir."] },
      { en: "The legal system was thoroughly examined by scholars of law.", tr: "Hukuk sistemi hukuk akademisyenleri tarafından etraflıca incelendi.", word: "examined", trWord: "incelendi", blank: "The legal system was thoroughly ___ by scholars of law.", grammarTags: ["Edilgen Yapı (Passive)", "Geçmiş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["The legal system", "was thoroughly examined", "by scholars of law."], trBlocks: ["Hukuk sistemi", "hukuk akademisyenleri tarafından", "etraflıca incelendi."] },
      { en: "Cinema history is frequently studied in humanities departments.", tr: "Sinema tarihi beşeri bilimler bölümlerinde sıklıkla araştırılır.", word: "studied", trWord: "araştırılır", blank: "Cinema history is frequently ___ in humanities departments.", grammarTags: ["Edilgen Yapı (Passive)", "Geniş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Cinema history", "is frequently studied", "in humanities departments."], trBlocks: ["Sinema tarihi", "beşeri bilimler bölümlerinde", "sıklıkla araştırılır."] },
      { en: "Hostilities were temporarily stopped along the border.", tr: "Sınır boyunca düşmanlıklar geçici olarak durduruldu.", word: "stopped", trWord: "durduruldu", blank: "Hostilities were temporarily ___ along the border.", grammarTags: ["Edilgen Yapı (Passive)", "Geçmiş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Hostilities", "were temporarily stopped", "along the border."], trBlocks: ["Sınır boyunca", "düşmanlıklar", "geçici olarak durduruldu."] },
      { en: "Linguistic variations are easily documented in modern reports.", tr: "Modern raporlarda dilbilimsel varyasyonlar kolayca belgelenir.", word: "documented", trWord: "belgelenir", blank: "Linguistic variations are easily ___ in modern reports.", grammarTags: ["Edilgen Yapı (Passive)", "Geniş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Linguistic variations", "are easily documented", "in modern reports."], trBlocks: ["Modern raporlarda", "dilbilimsel varyasyonlar", "kolayca belgelenir."] },
      { en: "Can cognitive conflict be successfully resolved through therapy?", tr: "Bilişsel çatışma terapi yoluyla başarıyla çözülebilir mi?", word: "resolved", trWord: "çözülebilir mi", blank: "Can cognitive conflict be successfully ___ through therapy?", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Soru Yapıları"], enBlocks: ["Can cognitive conflict", "be successfully resolved", "through therapy?"], trBlocks: ["Bilişsel çatışma", "terapi yoluyla", "başarıyla çözülebilir mi?"] },
      { en: "State policies must be rigorously evaluated by independent experts.", tr: "Devlet politikaları bağımsız uzmanlar tarafından titizlikle değerlendirilmelidir.", word: "evaluated", trWord: "değerlendirilmelidir", blank: "State policies must be rigorously ___ by independent experts.", grammarTags: ["Edilgen Yapı (Passive)", "Modallar", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["State policies", "must be rigorously evaluated", "by independent experts."], trBlocks: ["Devlet politikaları", "bağımsız uzmanlar tarafından", "titizlikle değerlendirilmelidir."] },
      { en: "Ancient manuscripts were beautifully translated by the scholar.", tr: "Antik el yazmaları akademisyen tarafından güzelce çevrildi.", word: "translated", trWord: "çevrildi", blank: "Ancient manuscripts were beautifully ___ by the scholar.", grammarTags: ["Edilgen Yapı (Passive)", "Geçmiş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Ancient manuscripts", "were beautifully translated", "by the scholar."], trBlocks: ["Antik el yazmaları", "akademisyen tarafından", "güzelce çevrildi."] },
      { en: "Religious doctrines were universally accepted throughout the empire.", tr: "Dini doktrinler imparatorluk genelinde evrensel olarak kabul edildi.", word: "accepted", trWord: "kabul edildi", blank: "Religious doctrines were universally ___ throughout the empire.", grammarTags: ["Edilgen Yapı (Passive)", "Geçmiş Zaman", "İsim Tamlaması", "Edat Takımı (Prepositional Phrase)"], enBlocks: ["Religious doctrines", "were universally accepted", "throughout the empire."], trBlocks: ["Dini doktrinler", "imparatorluk genelinde", "evrensel olarak kabul edildi."] },
      { en: "Economic theories had been deeply criticized before the crisis.", tr: "Krizden önce ekonomik teoriler derinlemesine eleştirilmişti.", word: "criticized", trWord: "eleştirilmişti", blank: "Economic theories had been deeply ___ before the crisis.", grammarTags: ["Edilgen Yapı (Passive)", "Geçmiş Zamanın Hikayesi (Past Perfect)", "İsim Tamlaması", "Zaman Cümleciği (Time Clause)"], enBlocks: ["Economic theories", "had been deeply criticized", "before the crisis."], trBlocks: ["Krizden önce", "ekonomik teoriler", "derinlemesine eleştirilmişti."] }
    ]
  };

  function generateUnit10Questions(unitId, lessonId, sentences) {
    const qList = [];
    const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
    const localEnsurePunctuation = (str) => {
      if (!str) return "";
      const trimmed = str.trim();
      if (trimmed.endsWith('?') || trimmed.endsWith('.') || trimmed.endsWith('!')) return trimmed;
      return trimmed + ".";
    };

    function getAuxiliary(en, word) {
      const auxList = [
        "has been", "had been", "will be", "would be", "should be", "must be",
        "can be", "could be", "might be", "will not be", "should not be",
        "must not be", "cannot be", "could not be", "might not be",
        "are carefully", "was newly", "were significantly", "was closely",
        "was gradually", "is highly", "was thoroughly", "is frequently",
        "were temporarily", "are easily", "be successfully", "must be rigorously",
        "were beautifully", "were universally", "had been deeply",
        "is", "are", "was", "were", "be", "been"
      ];
      for (const aux of auxList) {
        if (en.toLowerCase().includes(aux + " " + word.toLowerCase())) {
          const startIdx = en.toLowerCase().indexOf(aux + " " + word.toLowerCase());
          return en.substring(startIdx, startIdx + aux.length);
        }
      }
      const regex = new RegExp(`\\b([\\w']+(?:\\s+[\\w']+)?)\\s+${word}\\b`, 'i');
      const match = en.match(regex);
      return match ? match[1] : "is";
    }

    for (let i = 0; i < 15; i++) {
      const qId = `u${unitId}l${lessonId}_q${i + 1}`;
      const s = sentences[i % sentences.length];
      const gTags = s.grammarTags || ["Edilgen Yapı (Passive)"];

      if (i === 0) {
        const pairs = [];
        for (let j = 0; j < 4; j++) {
          const sj = sentences[j];
          const enPhrase = sj.en.replace(sj.en.split(/\s+/).slice(0, 2).join(" ") + " ", "");
          const trPhrase = sj.tr.replace(sj.tr.split(/\s+/).slice(0, 1).join(" ") + " ", "");
          pairs.push({ left: enPhrase, right: trPhrase });
        }
        qList.push({
          id: qId,
          type: "matching",
          prompt: "Akademik edilgen ifadeleri Türkçe karşılıklarıyla eşleştirin.",
          grammarTags: gTags,
          pairs: shuffle(pairs),
          createdAt: "2026-07-27T19:00:00+03:00"
        });
      } else if (i === 1) {
        const pairs = [];
        for (let j = 4; j < 8; j++) {
          const sj = sentences[j];
          const enPhrase = sj.en.replace(sj.en.split(/\s+/).slice(0, 2).join(" ") + " ", "");
          const trPhrase = sj.tr.replace(sj.tr.split(/\s+/).slice(0, 1).join(" ") + " ", "");
          pairs.push({ left: enPhrase, right: trPhrase });
        }
        qList.push({
          id: qId,
          type: "matching",
          prompt: "Akademik edilgen ifadeleri Türkçe karşılıklarıyla eşleştirin.",
          grammarTags: gTags,
          pairs: shuffle(pairs),
          createdAt: "2026-07-27T19:00:00+03:00"
        });
      } else if (i === 2) {
        const s2 = sentences[2];
        const base = s2.word;
        const wrongs = [base + "ing", base.replace(/ed$/, "es"), base.replace(/ed$/, "")].filter(w => w !== base);
        const options = shuffle([base, ...wrongs].slice(0, 4));
        qList.push({
          id: qId,
          type: "fill-blank-dropdown",
          prompt: `Boşluğa gelecek en uygun kelimeyi seçin: "${localEnsurePunctuation(s2.tr)}"`,
          sentence: s2.blank || s2.en.replace(s2.word, "___"),
          options: options,
          correctIndex: options.indexOf(base),
          enSentence: s2.en,
          grammarTags: gTags,
          createdAt: "2026-07-27T19:00:00+03:00"
        });
      } else if (i === 3) {
        const s3 = sentences[3];
        const base = s3.word;
        const wrongs = [base + "ing", base.replace(/ed$/, "es"), base.replace(/ed$/, "")].filter(w => w !== base);
        const options = shuffle([base, ...wrongs].slice(0, 4));
        qList.push({
          id: qId,
          type: "fill-blank",
          prompt: "Boşluğu doldurun",
          sentence: s3.blank || s3.en.replace(s3.word, "___"),
          options: options,
          correctIndex: options.indexOf(base),
          enSentence: s3.en,
          translation: localEnsurePunctuation(s3.tr),
          grammarTags: gTags,
          createdAt: "2026-07-27T19:00:00+03:00"
        });
      } else if (i === 4) {
        const s0 = sentences[0];
        const wrongs = shuffle(sentences.filter(x => x.en !== s0.en)).slice(0, 3);
        const options = shuffle([localEnsurePunctuation(s0.tr), localEnsurePunctuation(wrongs[0].tr), localEnsurePunctuation(wrongs[1].tr), localEnsurePunctuation(wrongs[2].tr)]);
        qList.push({
          id: qId,
          type: "multiple-choice",
          prompt: "Cümlenin en uygun Türkçe karşılığını seçin:",
          options: options,
          correctIndex: options.indexOf(localEnsurePunctuation(s0.tr)),
          enSentence: s0.en,
          isEngToTr: true,
          grammarTags: gTags,
          createdAt: "2026-07-27T19:00:00+03:00"
        });
      } else if (i === 5) {
        const s1 = sentences[1];
        const wrongs = shuffle(sentences.filter(x => x.en !== s1.en)).slice(0, 3);
        const options = shuffle([localEnsurePunctuation(s1.en), localEnsurePunctuation(wrongs[0].en), localEnsurePunctuation(wrongs[1].en), localEnsurePunctuation(wrongs[2].en)]);
        qList.push({
          id: qId,
          type: "multiple-choice",
          prompt: "Cümlenin en uygun İngilizce karşılığını seçin:",
          options: options,
          correctIndex: options.indexOf(localEnsurePunctuation(s1.en)),
          enSentence: s1.en,
          isEngToTr: false,
          grammarTags: gTags,
          createdAt: "2026-07-27T19:00:00+03:00"
        });
      } else if (i === 6) {
        const s4 = sentences[4];
        const targetBlocks = s4.trBlocks || [s4.tr];
        const dists = ["belirtilmiştir.", "tetiklendi.", "sorgulanmalıdır."].filter(w => !targetBlocks.includes(w));
        qList.push({
          id: qId,
          type: "word-bank",
          prompt: "Cümlenin Türkçe karşılığını oluşturun:",
          translation: localEnsurePunctuation(s4.tr),
          words: shuffle([...targetBlocks, ...dists]),
          correctOrder: targetBlocks,
          enSentence: s4.en,
          isEngToTr: true,
          grammarTags: gTags,
          createdAt: "2026-07-27T19:00:00+03:00"
        });
      } else if (i === 7) {
        const s5 = sentences[5];
        const targetBlocks = s5.enBlocks || s5.en.split(/\s+/);
        const dists = ["will be", "reform", "the system"].filter(w => !targetBlocks.includes(w));
        qList.push({
          id: qId,
          type: "word-bank",
          prompt: "Cümlenin İngilizce karşılığını oluşturun:",
          translation: localEnsurePunctuation(s5.tr),
          words: shuffle([...targetBlocks, ...dists]),
          correctOrder: targetBlocks,
          enSentence: s5.en,
          isEngToTr: false,
          grammarTags: gTags,
          createdAt: "2026-07-27T19:00:00+03:00"
        });
      } else if (i === 8) {
        const s11 = sentences[11];
        qList.push({
          id: qId,
          type: "translation-text",
          prompt: `"${localEnsurePunctuation(s11.en)}" ifadesini Türkçe'ye çevirin:`,
          correctSentence: localEnsurePunctuation(s11.tr),
          enSentence: s11.en,
          isEngToTr: true,
          grammarTags: gTags,
          createdAt: "2026-07-27T19:00:00+03:00"
        });
      } else if (i === 9) {
        const s6 = sentences[6];
        const base = s6.word;
        const errWord = base + "ing";
        const tokens = s6.en.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").split(/\s+/);
        const errIdx = tokens.findIndex(t => t.toLowerCase() === base.toLowerCase());
        if (errIdx !== -1) {
          tokens[errIdx] = errWord;
        }
        qList.push({
          id: qId,
          type: "error-finder",
          prompt: "Cümledeki dilbilgisel hatayı (yanlış fiil çekimini) bulun:",
          sentenceTokens: tokens,
          correctIndex: errIdx !== -1 ? errIdx : 0,
          suggestedCorrection: base,
          translation: localEnsurePunctuation(s6.tr),
          grammarTags: gTags,
          createdAt: "2026-07-27T19:00:00+03:00"
        });
      } else if (i === 10) {
        const s7 = sentences[7];
        qList.push({
          id: qId,
          type: "spotlight",
          prompt: `Projektörle aydınlatılan '${s7.word}' eyleminin cümledeki edilgen işlevi nedir?`,
          paragraph: s7.en,
          highlightChunk: s7.word,
          options: ["Edilgen Ortaç (Past Participle - V3)", "Etken Ortaç (Present Participle - ing)", "Mastar Eki (Infinitive)", "Bağlaç (Conjunction)"],
          correctIndex: 0,
          translation: localEnsurePunctuation(s7.tr),
          grammarTags: gTags,
          createdAt: "2026-07-27T19:00:00+03:00"
        });
      } else if (i === 11) {
        const s8 = sentences[8];
        const aux = getAuxiliary(s8.en, s8.word);
        const bolded = s8.en.replace(new RegExp(`\\b${aux}\\s+${s8.word}\\b`), "<strong>$&</strong>");
        
        let correctOption = "";
        let options = [];
        if (lessonId === 28) {
          correctOption = "Zaman Tabanlı Edilgen Yapı (Passive Voice)";
          options = ["Zaman Tabanlı Edilgen Yapı (Passive Voice)", "Etken Çatı (Active Voice)", "Mastar Köprüsü (Infinitive Linker)", "Zarf Tümleci (Adverbial)"];
        } else if (lessonId === 29) {
          correctOption = "Modal Tabanlı Edilgen Yapı (Modal Passive)";
          options = ["Modal Tabanlı Edilgen Yapı (Modal Passive)", "Zaman Tabanlı Edilgen Yapı (Passive Voice)", "Etken Modal Yapısı (Active Modal)", "Edat Takımı (Prepositional Phrase)"];
        } else {
          correctOption = "Bölünmüş Edilgen Yapı (Split Passive)";
          options = ["Bölünmüş Edilgen Yapı (Split Passive)", "Saf Zaman Çekimi (Simple Tense)", "Kişisiz Edilgen (Impersonal Passive)", "Etken Yüklem"];
        }

        qList.push({
          id: qId,
          type: "structure-match",
          prompt: "Aşağıdaki cümlede koyu yazılan edilgen eylemin dil bilgisi yapısını seçiniz:",
          sentence: bolded,
          options: options,
          correctIndex: options.indexOf(correctOption),
          translation: localEnsurePunctuation(s8.tr),
          grammarTags: gTags,
          createdAt: "2026-07-27T19:00:00+03:00"
        });
      } else if (i === 12) {
        const s9 = sentences[9];
        const makeBug = true;
        let phrase = s9.en;
        let trExplanation = "";
        let correctAns = "true";
        if (makeBug) {
          correctAns = "false";
          phrase = phrase.replace(new RegExp(`\\b${s9.word}\\b`), s9.word.replace(/ed$/, ""));
          trExplanation = "Hata tespiti: Edilgen (Passive) çatı kuralına göre yardımcı fiilden sonra fiilin 3. hali (V3) kullanılmalıdır.";
        }
        qList.push({
          id: qId,
          type: "true-false",
          prompt: "Aşağıdaki cümlenin edilgen yapısı gramer açısından doğru mudur?",
          englishPhrase: phrase,
          turkishTranslation: trExplanation,
          correctAnswer: correctAns,
          grammarTags: gTags,
          createdAt: "2026-07-27T19:00:00+03:00"
        });
      } else if (i === 13) {
        const s14 = sentences[14];
        qList.push({
          id: qId,
          type: "translation-text",
          prompt: `"${localEnsurePunctuation(s14.en)}" ifadesini Türkçe'ye çevirin:`,
          correctSentence: localEnsurePunctuation(s14.tr),
          enSentence: s14.en,
          isEngToTr: true,
          grammarTags: gTags,
          createdAt: "2026-07-27T19:00:00+03:00"
        });
      } else if (i === 14) {
        const s10 = sentences[10];
        const aux = getAuxiliary(s10.en, s10.word);
        let sentenceWithGaps = s10.en;
        const escapedAux = aux.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const escapedWord = s10.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        sentenceWithGaps = sentenceWithGaps.replace(new RegExp(`\\b${escapedAux}\\b`), "___");
        sentenceWithGaps = sentenceWithGaps.replace(new RegExp(`\\b${escapedWord}\\b`), "___");
        
        qList.push({
          id: qId,
          type: "multiple-fill-blank",
          prompt: "Boşlukları sırasıyla klavyeden doldurunuz:",
          sentence: sentenceWithGaps,
          corrects: [aux, s10.word],
          translation: localEnsurePunctuation(s10.tr),
          grammarTags: gTags,
          createdAt: "2026-07-27T19:00:00+03:00"
        });
      }
    }
    return qList;
  }

  // Mutate Unit 10 lessons dynamically with a single 15-question exercise
  if (typeof lessons !== 'undefined') {
    // Topic update for edits history and descriptions
    if (typeof rawTopics !== 'undefined') {
      const topic10 = rawTopics.find(t => t.id === 10);
      if (topic10) {
        topic10.desc = "Zaman tabanlı, modal tabanlı ve bölünmüş/gelişmiş akademik edilgen yapılar";
        topic10.numLessons = 3;
        topic10.edits = topic10.edits || [];
        if (!topic10.edits.some(e => e.date === "2026-07-27T19:00:00+03:00")) {
          topic10.edits.push({
            date: "2026-07-27T19:00:00+03:00",
            desc: "Kelimeleri Türkçe karşılıklarıyla eşleştirin soruları kaldırıldı, her ders için 15 soruluk tek alıştırma yapıldı, basitten zora pedagojik aşamalandırma ve farklı soru tipleri eklendi.",
            type: "custom"
          });
        }
      }
    }

    // Units array update for banner rendering
    if (typeof units !== 'undefined') {
      const unit10 = units.find(u => u.id === 10);
      if (unit10) {
        unit10.description = "Zaman tabanlı, modal tabanlı ve bölünmüş/gelişmiş akademik edilgen yapılar";
        unit10.edits = unit10.edits || [];
        if (!unit10.edits.some(e => e.date === "2026-07-27T19:00:00+03:00")) {
          unit10.edits.push({
            date: "2026-07-27T19:00:00+03:00",
            desc: "Kelimeleri Türkçe karşılıklarıyla eşleştirin soruları kaldırıldı, her ders için 15 soruluk tek alıştırma yapıldı, basitten zora pedagojik aşamalandırma ve farklı soru tipleri eklendi.",
            type: "custom"
          });
        }
      }
    }

    lessons.forEach(lesson => {
      if (lesson.unitId === 10) {
        const lessonIdx = lesson.id - 28; // startLessonId is 28
        let sentences = myUnit10LessonSentences[lessonIdx + 1] || [];

        if (sentences.length > 0) {
          lesson.createdAt = "2026-07-27T19:00:00+03:00";
          
          // Generate 15 distinct questions
          const generatedQuestions = generateUnit10Questions(10, lesson.id, sentences);
          
          lesson.questions = [];
          lesson.exercises = [
            {
              id: `u10l${lesson.id}ex1`,
              title: "Alıştırma 1: Edilgen Yapı Çalışması",
              description: "Pedagojik aşamalı edilgen çatı pekiştirme alıştırması (15 Soru)",
              createdAt: "2026-07-27T19:00:00+03:00",
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
      "id": 200,
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
      id: 200,
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
      unitId: 200,
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
      unitId: 200,
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
      "id": 201,
      "startLessonId": 590,
      "originalIndex": 59,
      "title": "Sentaktik Kriptoloji: Past Participle ve Edilgen Sentez",
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
      id: 201,
      originalIndex: topic59.originalIndex,
      title: topic59.title,
      description: topic59.desc,
      lessons: ["c60_l1_extra"],
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
      id: "c60_l1_extra",
      unitId: 201,
      title: "Sentaktik Kriptoloji: Past Participle ve Edilgen Sentez",
      subtitle: "Diagnostic assessment of Past Participles, Reduced Passives, and Causative structures.",
      exercises: [
        {
          id: "c60_l1_ex1",
          createdAt: "2026-07-20T15:59:00+03:00",
          title: "Part 1: Cümle Tamamlama",
          description: "Past participle formunun sıfat tümleçleri, zarf kısaltmaları ve ettirgen yapılardaki doğru konumlandırılması.",
          questions: ex1_q
        },
        {
          id: "c60_l1_ex2",
          createdAt: "2026-07-20T15:59:00+03:00",
          title: "Part 2: Hata Belirleme",
          description: "Çekimli fiil/ortaç karmaşası, etken/edilgen uyumsuzlukları ve participial sıfat hatalarının tespiti.",
          questions: ex2_q
        },
        {
          id: "c60_l1_ex3",
          createdAt: "2026-07-20T15:59:00+03:00",
          title: "Part 3: Zarf Cümlecikleri Dönüşümleri",
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



// ============================================================
// BÖLÜM 105: Zaman Uyumu Formül Mühendisliği
// ============================================================
const chapter105Data = {
  chapterId: 105,
  chapterName: "Zaman Uyumu Formül Mühendisliği",
  chapterDescription: "Zaman bağlaçları ve zaman uyumu kurallarını örnek cümleler yerine doğrudan formül denklemleri ve yapısal mantıkla çözme yeteneği.",
  lessons: [
    {
      id: "c105_l1",
      unitId: 105,
      title: "1. Formül Eşleştirme Kılavuzu",
      subtitle: "Zaman Bağlaçları Formül Eşleşmeleri",
      konuAnlatimi: {
        baslik: "Formül Eşleştirme Kılavuzu",
        teorikMantik: "Zaman uyumu kuralları, bağlaçların (yan cümlelerin) ve ana cümlelerin aldığı zaman yapılarını belirler. Bu kuralları ezberlemek yerine birbirleriyle olan eşleşme mantığını (past-past, present-present) kavramak önemlidir.",
        formul: "Since + V2 ➔ have/has + V3 | By the time + V2 ➔ had + V3 | By the time + V1 ➔ will have + V3",
        altinKural: "Zaman bağlacı olan taraf (When, Since, As soon as vb.) asla WILL/WOULD/SHALL almaz!"
      },
      exercises: [
        {
          id: "c105_l1_ex1",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 1: Giriş ve Formül Eşleştirme",
          description: "Zaman bağlacı formüllerinin ana cümle formülleriyle eşleştirilmesi.",
          questions: [
            {
              id: "c105_l1_ex1_q1",
              type: "matching",
              prompt: "Zaman bağlacı formüllerini uygun ana cümle formülleriyle eşleştirin:",
              grammarTags: ["Zaman Uyumu", "Formül Mühendisliği"],
              pairs: [
                { left: "Since + Past Simple (V2)", right: "Present Perfect (have/has + V3)" },
                { left: "By the time + Past Simple (V2)", right: "Past Perfect (had + V3)" },
                { left: "By the time + Present Simple (V1)", right: "Future Perfect (will have + V3)" },
                { left: "It is (high) time + Subject", right: "Past Simple (V2)" }
              ]
            },
            {
              id: "c105_l1_ex1_q2",
              type: "multiple-choice",
              prompt: "Aşağıdaki formül eşleşmelerinden hangisi <strong>doğrudur</strong>?",
              options: [
                "Since + V2 ➔ have/has + V3",
                "Since + had + V3 ➔ V2",
                "Since + V1 ➔ will have + V3",
                "Since + V2 ➔ had + V3"
              ],
              correctIndex: 0,
              explanation: "Since + Past Simple (V2) yapısı, ana cümlede daima Present Perfect (have/has + V3) yapısını gerektirir."
            },
            {
              id: "c105_l1_ex1_q3",
              type: "multiple-choice",
              prompt: "<code>Since</code> bağlacının yanındaki yan cümle, zaman çizgisi üzerinde aşağıdakilerden hangisini işaret eder?",
              options: [
                "Geçmişteki spesifik bir başlangıç noktasını (Past Point) / <span style='color: #339af0;'>V2</span>",
                "Gelecekteki tahmini bir zaman sınırını (Future Deadline) / <span style='color: #339af0;'>V1 veya V2</span>",
                "Şu anda devam etmekte olan bir süreci (Ongoing Process) / <span style='color: #339af0;'>am/is/are + Ving</span>",
                "Geçmişteki eylemin öncesindeki başka bir geçmişi (Older Past) / <span style='color: #339af0;'>had + V3</span>"
              ],
              correctIndex: 0,
              explanation: "Since bağlacından sonra gelen yan cümle (Since + V2), eylemin geçmişte başladığı kesin başlangıç noktasını temsil eder."
            },
            {
              id: "c105_l1_ex1_q4",
              type: "multiple-choice",
              prompt: "<code>Since</code> yan cümlesi geçmişteki başlangıç noktasını işaret ederken, **ana cümle** zaman çizgisi üzerinde hangi periyodu kapsar?",
              options: [
                "Geçmişteki o başlangıç noktasından günümüze (ŞİMDİ) kadar olan süreci / <span style='color: #339af0;'>have/has + V3</span>",
                "Gelecekte eylemin biteceği son sınıra kadar olan süreci / <span style='color: #339af0;'>will have + V3</span>",
                "Sadece geçmişte başlayıp biten anlık eylemleri / <span style='color: #339af0;'>V2</span>",
                "Gelecekteki tekrarlanacak alışkanlıkları / <span style='color: #339af0;'>will + V1</span>"
              ],
              correctIndex: 0,
              explanation: "Since'li cümle geçmişteki başlangıç noktasını (V2) işaret ederken, ana cümle bu noktadan günümüze kadar uzanan süreci (Present Perfect) temsil eder."
            },
            {
              id: "c105_l1_ex1_q5",
              type: "multiple-choice",
              prompt: "<code>By the time</code> bağlacı temel işlev olarak zaman ilişkilerinde neyi işaret eder?",
              options: [
                "Bir eylemin diğerinden önce tamamlandığı son sınırı (Deadline / Limit) / <span style='color: #339af0;'>By the time + V1 veya V2</span>",
                "İki eylemin aynı anda paralel olarak devam ettiğini / <span style='color: #339af0;'>While + was/were Ving</span>",
                "Eylemin geçmişte başlayıp günümüzde hala sürdüğünü / <span style='color: #339af0;'>Since + V2 ... have/has V3</span>",
                "Gelecekte yapılma ihtimali olan varsayımsal bir eylemi / <span style='color: #339af0;'>If + V1 ... will + V1</span>"
              ],
              correctIndex: 0,
              explanation: "By the time, '-e kadar / -diğinde' anlamıyla bir eylemin tamamlanması gereken son zaman sınırını (deadline) temsil eder."
            },
            {
              id: "c105_l1_ex1_q6",
              type: "multiple-choice",
              prompt: "<code>By the time + Past Simple (V2)</code> yan cümlesi geçmişteki sınır eylemi işaret ettiğine göre, ana cümle zaman çizgisinde **nereyi** işaret eder?",
              options: [
                "Bu geçmiş sınırdan da önce tamamlanmış olan eylemi (Older Past) / <span style='color: #339af0;'>had + V3</span>",
                "Gelecekte bu sınırdan sonra başlayacak olan eylemi / <span style='color: #339af0;'>will + V1</span>",
                "Şu anda devam etmekte olan güncel durumu / <span style='color: #339af0;'>am/is/are + Ving</span>",
                "Geçmişte başlayıp hala devam eden süreci / <span style='color: #339af0;'>have/has + been + Ving</span>"
              ],
              correctIndex: 0,
              explanation: "Geçmişteki bir zaman sınırına (V2) kadar tamamlanmış olan daha eski bir geçmiş eylemi anlatmak için Past Perfect (had + V3) kullanılır."
            },
            {
              id: "c105_l1_ex1_q7",
              type: "multiple-choice",
              prompt: "<code>By the time + Present Simple (V1)</code> yan cümlesi **gelecekteki** bir zaman sınırını işaret ettiğinde, ana cümle neyi işaret eder?",
              options: [
                "Gelecekteki o sınırdan önce tamamlanmış olacak süreci / <span style='color: #339af0;'>will have + V3</span>",
                "Geçmişte çoktan tamamlanmış olan süreci / <span style='color: #339af0;'>had + V3</span>",
                "Şu an tam gerçekleşmekte olan eylemi / <span style='color: #339af0;'>am/is/are + Ving</span>",
                "Gelecekteki o sınırdan sonra başlayacak olan ani durumu / <span style='color: #339af0;'>will + V1</span>"
              ],
              correctIndex: 0,
              explanation: "Gelecekteki bir zaman sınırına (V1) ulaşıldığında çoktan tamamlanmış olacak eylemleri ifade etmek için Future Perfect (will have + V3) formülü kullanılır."
            },
            {
              id: "c105_l1_ex1_q8",
              type: "multiple-choice",
              prompt: "<code>It is (high) time + Subject + Past Simple (V2)</code> kalıbının zaman çizgisi üzerindeki işlevi nedir?",
              options: [
                "Şimdiki zamanda yapılması gereken ama gecikmiş olan durumları belirtmek",
                "Geçmişte yapılmış ve bitmiş gerçek eylemleri listelemek",
                "Gelecekte yapılması planlanan resmi eylemleri göstermek",
                "Geçmişte başlayıp geleceğe kadar sürecek alışkanlıkları tanımlamak"
              ],
              correctIndex: 0,
              explanation: "It is (high) time yapısı anlamca şimdiki zamanı (now) işaret etmesine rağmen, gecikmişlik/serzeniş bildirdiği için gramer olarak Past Simple (V2) yapısıyla kurulur (Unreal Present)."
            }
          ]
        },
        {
          id: "c105_l1_ex2",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 2: İleri Düzey Formüller",
          description: "Daha seyrek kullanılan ama kritik zaman uyumu kuralları.",
          questions: [
            {
              id: "c105_l1_ex2_q1",
              type: "multiple-choice",
              prompt: "<strong>No sooner + had + Subject + V3</strong> formülünün devamında ana cümle hangi yapı ile başlamalıdır?",
              options: [
                "than + Subject + Past Simple (V2)",
                "when + Subject + Past Simple (V2)",
                "before + Subject + Past Simple (V2)",
                "then + Subject + Present Simple (V1)"
              ],
              correctIndex: 0,
              explanation: "No sooner yapısı 'than' ile tamamlanır ve ardından Past Simple (V2) gelir. (-er -emez)"
            },
            {
              id: "c105_l1_ex2_q2",
              type: "multiple-choice",
              prompt: "<strong>Hardly / Scarcely + had + Subject + V3</strong> formülü aşağıdakilerden hangisiyle tamamlanmalıdır?",
              options: [
                "when + Subject + Past Simple (V2)",
                "than + Subject + Past Simple (V2)",
                "before + Subject + Present Simple (V1)",
                "after + Subject + Past Perfect (had + V3)"
              ],
              correctIndex: 0,
              explanation: "Hardly / Scarcely yapısı 'when' (bazen 'before') ile tamamlanır ve ardından Past Simple (V2) gelir."
            },
            {
              id: "c105_l1_ex2_q3",
              type: "multiple-choice",
              prompt: "<code>No sooner ... than</code> ve <code>Hardly ... when</code> kalıpları zaman çizgisi üzerinde hangi ilişkiyi işaret eder?",
              options: [
                "Geçmişte bir eylemin hemen ardından (neredeyse eş zamanlı) diğerinin gerçekleştiğini",
                "İki eylemin arasında uzun bir zaman boşluğu bulunduğunu",
                "İlk eylemin ikinci eylemi tamamen engellediğini",
                "İkinci eylemin gelecekte bir gün olacağını"
              ],
              correctIndex: 0,
              explanation: "Bu kalıplar, geçmişteki iki eylemin birbirinin hemen peşisıra, aralarında zaman boşluğu olmadan gerçekleştiğini belirtir."
            },
            {
              id: "c105_l1_ex2_q4",
              type: "multiple-choice",
              prompt: "<code>Before + Past Simple (V2)</code> yan cümlesi zaman çizgisi üzerinde neyi temsil eder?",
              options: [
                "Geçmişte gerçekleşen daha yeni olan eylemi (Past Deadline / Sınır Eylem) / <span style='color: #339af0;'>V2</span>",
                "Geçmişte her şeyden önce gerçekleşen ilk eylemi / <span style='color: #339af0;'>had + V3</span>",
                "Gelecekte gerçekleşecek ilk eylemi / <span style='color: #339af0;'>will + V1</span>",
                "Şu an sürmekte olan eylemin başlangıcını / <span style='color: #339af0;'>am/is/are + Ving</span>"
              ],
              correctIndex: 0,
              explanation: "Before'lu cümle geçmişteki iki olaydan daha sonra olanı (V2) işaret eder. Ana cümle ise ondan da önce tamamlanmış olanı (had + V3) gösterir."
            },
            {
              id: "c105_l1_ex2_q5",
              type: "multiple-choice",
              prompt: "<code>After + Past Perfect (had + V3)</code> yan cümlesi zaman çizgisi üzerinde neyi temsil eder?",
              options: [
                "Geçmişteki iki olaydan önce gerçekleşmiş olanını (Older Past) / <span style='color: #339af0;'>had + V3</span>",
                "Geçmişteki olaylardan sonra olanını / <span style='color: #339af0;'>V2</span>",
                "Gelecekte gerçekleşecek süreci / <span style='color: #339af0;'>will + V1</span>",
                "Şu anki sonuç durumunu / <span style='color: #339af0;'>have/has + V3</span>"
              ],
              correctIndex: 0,
              explanation: "After'lı yan cümle geçmişte ilk tamamlanan eylemi (had V3) işaret ederken, ana cümle ondan sonra olan eylemi (V2) gösterir."
            },
            {
              id: "c105_l1_ex2_q6",
              type: "multiple-choice",
              prompt: "Zaman uyumunda <code>After + had + V3</code> ile <code>Before + V2</code> kalıplarının zaman çizgisi üzerindeki kronolojik ilişkisi nasıldır?",
              options: [
                "İkisi de kronolojik olarak geçmişteki aynı olay sırasını (1. eylem ➔ 2. eylem) temsil eder / <span style='color: #339af0;'>1st: had+V3 ➔ 2nd: V2</span>",
                "After eylemin gelecekteki sınırını, Before geçmişteki başlangıcını temsil eder / <span style='color: #339af0;'>After + V1 vs Before + V2</span>",
                "Before eylemin şu anki durumunu, After gelecekteki durumunu gösterir / <span style='color: #339af0;'>Before + V1 vs After + will+V1</span>",
                "İkisi arasında hiçbir kronolojik benzerlik yoktur / <span style='color: #339af0;'>no match</span>"
              ],
              correctIndex: 0,
              explanation: "After + had V3 (1. eylem) ➔ V2 (2. eylem) ile Before + V2 (2. eylem) ➔ had V3 (1. eylem) kronolojik olarak tamamen aynı olay dizilimini ifade eder."
            },
            {
              id: "c105_l1_ex2_q7",
              type: "multiple-choice",
              prompt: "<code>As of + Future Time (e.g. As of 2030)</code> ifadesinin yanındaki cümlede neden **Future Perfect** tercih edilir?",
              options: [
                "Belirtilen gelecek tarihi itibarıyla eylemin çoktan tamamlanmış olacağını işaret ettiği için / <span style='color: #339af0;'>will have + V3</span>",
                "Eylemin o tarihte başlayacağını bildirdiği için / <span style='color: #339af0;'>will + V1</span>",
                "Eylemin geçmişte kalacağını kesinleştirdiği için / <span style='color: #339af0;'>V2</span>",
                "Şimdiki zamanda devam ettiğini gösterdiği için / <span style='color: #339af0;'>am/is/are + Ving</span>"
              ],
              correctIndex: 0,
              explanation: "As of / By + gelecek zaman ifadeleri, o tarih geldiğinde eylemin bitmiş/tamamlanmış olacağını (Future Perfect) işaret eder."
            },
            {
              id: "c105_l1_ex2_q8",
              type: "multiple-choice",
              prompt: "<code>Until + Past Simple (V2)</code> yan cümlesi zaman çizgisi üzerinde neyi simgeler?",
              options: [
                "Geçmişteki eylemin sürdüğü son noktayı / zaman sınırını / <span style='color: #339af0;'>until + V2</span>",
                "Eylemin gelecekteki başlangıç noktasını / <span style='color: #339af0;'>will + V1</span>",
                "Şu an devam eden bir eylemin kesintiye uğradığı anı / <span style='color: #339af0;'>when + V2</span>",
                "Geçmişteki eylemin hiçbir zaman gerçekleşmediğini / <span style='color: #339af0;'>never + V2</span>"
              ],
              correctIndex: 0,
              explanation: "Until + V2, geçmişte bir durum veya eylemin devam ettiği en son sınırı (o ana kadar) temsil etmek için kullanılır."
            }
          ]
        },
        {
          id: "c105_l1_ex3",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 3: Ustalaşma Egzersizleri",
          description: "Tüm temel formül eşleşmelerinin karma testi.",
          questions: [
            {
              id: "c105_l1_ex3_q1",
              type: "multiple-choice",
              prompt: "<code>[After + had + V3] ➔ [ ? ]</code> denkleminde boşluğa hangisi gelmelidir?",
              options: [
                "Past Simple (V2)",
                "Present Perfect (have/has + V3)",
                "Future Perfect (will have + V3)",
                "Past Perfect (had + V3)"
              ],
              correctIndex: 0,
              explanation: "After'lı cümlede geçmişteki iki eylemden önce olanı (had V3) verildiğinde, sonra olanı belirtmek için Past Simple (V2) kullanılır."
            },
            {
              id: "c105_l1_ex3_q2",
              type: "multiple-choice",
              prompt: "<code>[Before + V2] ➔ [ ? ]</code> denkleminde ana cümle formülü ne olmalıdır?",
              options: [
                "Past Perfect (had + V3)",
                "Present Perfect (have/has + V3)",
                "Future Perfect (will have + V3)",
                "Simple Present (V1)"
              ],
              correctIndex: 0,
              explanation: "Before'lu cümle geçmişteki sınır eylemi (V2) belirttiğinde, ondan önce tamamlanmış olan eylemi belirtmek için ana cümlede Past Perfect (had V3) tercih edilir."
            },
            {
              id: "c105_l1_ex3_q3",
              type: "multiple-choice",
              prompt: "<code>While + Past Continuous (was/were + Ving)</code> yan cümlesi zaman çizgisi üzerinde neyi temsil eder?",
              options: [
                "Geçmişte belirli bir süre boyunca devam eden arka plan eylemini (Process) / <span style='color: #339af0;'>was/were + Ving</span>",
                "Geçmişte anlık olarak olup biten tekil bir eylemi / <span style='color: #339af0;'>V2</span>",
                "Gelecekte kesinlikle yapılacak olan bir planı / <span style='color: #339af0;'>am/is/are + Ving</span>",
                "Şu anda her gün tekrarlanan genel bir alışkanlığı / <span style='color: #339af0;'>V1 / V-s</span>"
              ],
              correctIndex: 0,
              explanation: "While + Past Continuous, geçmişte belli bir zaman aralığında sürmekte olan bir eylemi veya süreci (process) işaret eder."
            },
            {
              id: "c105_l1_ex3_q4",
              type: "multiple-choice",
              prompt: "<code>While + Past Continuous</code> yapısı kullanılırken, **ana cümlenin** Past Simple (V2) olması neyi işaret eder?",
              options: [
                "Devam eden o süreci aniden bölen/kesen kısa bir eylemi / <span style='color: #339af0;'>V2</span>",
                "Sürecin daha da uzun sürdüğünü / <span style='color: #339af0;'>was/were + Ving</span>",
                "Eylemin geleceğe sarktığını / <span style='color: #339af0;'>will + V1</span>",
                "Eylemin geçmişten de önce bittiğini / <span style='color: #339af0;'>had + V3</span>"
              ],
              correctIndex: 0,
              explanation: "While'lı cümlenin (was/were Ving) devam ettiği sırada gerçekleşen anlık kesinti eylemleri Past Simple (V2) ile ifade edilir."
            },
            {
              id: "c105_l1_ex3_q5",
              type: "multiple-choice",
              prompt: "<code>Just as + Past Continuous</code> yan cümlesi kullanıldığında, zaman çizgisi üzerinde nasıl bir ilişki oluşur?",
              options: [
                "Tam bir eylem gerçekleştiği anda başka bir eylemin onunla çakıştığını / <span style='color: #339af0;'>Just as + was/were Ving, V2</span>",
                "İki eylem arasında çok uzun yıllar olduğunu / <span style='color: #339af0;'>years later</span>",
                "Eylemlerin hiçbir şekilde birbiriyle karşılaşmadığını / <span style='color: #339af0;'>independent actions</span>",
                "İlk eylemin gelecekte, ikincisinin geçmişte olduğunu / <span style='color: #339af0;'>impossible sequence</span>"
              ],
              correctIndex: 0,
              explanation: "Just as, 'tam o esnada' anlamına gelerek, devam eden bir eylemle tam o anda çakışan ani bir başka eylemin zaman çizgisi üzerindeki anlık kesişimini işaret eder."
            },
            {
              id: "c105_l1_ex3_q6",
              type: "multiple-choice",
              prompt: "<code>As soon as + Past Simple (V2) ➔ Past Simple (V2)</code> formülü ne tür bir zaman ilişkisini temsil eder?",
              options: [
                "Geçmişte biri biter bitmez diğeri başlayan ardışık eylemleri / <span style='color: #339af0;'>As soon as + V2, V2</span>",
                "Şu anda alışkanlık olarak yapılan işleri / <span style='color: #339af0;'>As soon as + V1, V1</span>",
                "Gelecekte uzun sürecek olan paralel planları / <span style='color: #339af0;'>As soon as + V1, will + V1</span>",
                "Geçmişte birbirini hiçbir şekilde etkilemeyen bağımsız olayları / <span style='color: #339af0;'>independent V2s</span>"
              ],
              correctIndex: 0,
              explanation: "As soon as + V2 ➔ V2 yapısı, geçmişte bir olay bittiği anda (hemen peşinden) diğer olayın başladığını gösterir."
            },
            {
              id: "c105_l1_ex3_q7",
              type: "multiple-choice",
              prompt: "Zaman uyumunda <code>When + Past Simple (V2) ➔ Past Simple (V2)</code> formülü neyi işaret edebilir?",
              options: [
                "Geçmişte bir eylemin diğerini tetiklediği ardışık durumları / <span style='color: #339af0;'>When + V2, V2</span>",
                "Genel bilimsel doğruları / <span style='color: #339af0;'>When + V1, V1</span>",
                "Gelecekte eş zamanlı yürüyecek süreçleri / <span style='color: #339af0;'>When + V1, will + V1</span>",
                "Şu an yaşanmakta olan bir anı / <span style='color: #339af0;'>now</span>"
              ],
              correctIndex: 0,
              explanation: "When + V2 ➔ V2 yapısı, geçmişte bir eylem olduğunda (veya olduğunun hemen ardından) gerçekleşen diğer eylemi anlatır."
            },
            {
              id: "c105_l1_ex3_q8",
              type: "multiple-choice",
              prompt: "<code>By the time + Present Simple (V1)</code> denkleminin ana cümlesinde neden <strong>Present Perfect (have/has + V3)</strong> kullanılmaz?",
              options: [
                "Çünkü By the time geleceğe yönelik bir sınırı işaret eder, Present Perfect ise geçmişten bugüne gelen süreci anlatır",
                "Çünkü By the time sadece geçmişte kullanılabilir",
                "Çünkü Present Perfect sadece zıtlık bağlaçlarında kullanılır",
                "Çünkü Present Perfect'ten sonra sadece V2 gelmelidir"
              ],
              correctIndex: 0,
              explanation: "By the time + V1 gelecekteki bir zaman sınırını (deadline) temsil eder. Present Perfect geçmişe/bugüne baktığı için bu gelecekteki sınırla uyum sağlayamaz; yerine Future Perfect gerekir."
            }
          ]
        }
      ]
    },
    {
      id: "c105_l2",
      unitId: 105,
      title: "2. Hata Avcısı: Zaman Uyumları",
      subtitle: "Hatalı Formül Dizilimlerini Ayıklama",
      konuAnlatimi: {
        baslik: "Hata Avcısı: Seçenek Eleme ve Uyumsuzluk Tabloları",
        teorikMantik: "Sınavda tense sorularında anlama girmeden önce seçeneklerde yan yana elenmesi gereken ve yapısal olarak asla seçilmemesi gereken uyumsuz kombinasyonlar vardır. Bu kalıpları ezbere bilmek hız kazandırır.",
        formul: "Uzak Durulması Gereken Tense Çiftleri: *Am-is-are / Would V0* | *Would V0 / Would V0* | *Had V3 / am-is-are*",
        altinKural: "Bir If şart cümlesinde yan cümleye (If tarafına) asla will, would, shall, be going to, may/might/could (olasılık) gelmez!"
      },
      exercises: [
        {
          id: "c105_l2_ex1",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 1: Seçeneklerde Yan Yana Elenen Kombinasyonlar",
          description: "Tense sorularında şıklarda yan yana verildiğinde doğrudan elenmesi gereken hatalı dizilimler.",
          questions: [
            {
              id: "c105_l2_ex1_q1",
              type: "multiple-choice",
              prompt: "Aşağıdaki seçenek kombinasyonlarından hangisi tense sorularında yan yana verildiğinde <strong>doğrudan elenmelidir</strong>?",
              options: [
                "am-is-are / would V0",
                "Present Simple / Future Simple (will)",
                "Past Simple (V2) / Past Perfect (had + V3)",
                "Present Perfect / Present Simple"
              ],
              correctIndex: 0,
              explanation: "Present (am-is-are) ile Past/Future Conditional (would V0) yapıları genel zaman uyumu kurallarına göre yan yana gelmez ve doğrudan elenir."
            },
            {
              id: "c105_l2_ex1_q2",
              type: "multiple-choice",
              prompt: "Tense sorularında seçeneklerde <strong>would V0 / would V0</strong> dizilimi görüldüğünde ne yapılmalıdır?",
              options: [
                "Doğrudan elenmelidir (Özel şart cümleleri hariç iki taraf da would V0 alamaz)",
                "İlk tarafı koşul olduğu için hemen doğru kabul edilmelidir",
                "Cümlenin present anlamı taşıdığı varsayılmalıdır",
                "Zaman uyumu aranmadığı için doğru seçenek olarak işaretlenmelidir"
              ],
              correctIndex: 0,
              explanation: "İki tarafın da would V0 / would V0 olması yapısal bir hatadır ve tense/cümle tamamlama sorularında doğrudan elenmesi gerekir."
            },
            {
              id: "c105_l2_ex1_q3",
              type: "multiple-choice",
              prompt: "Aşağıdaki ikililerden hangisi <strong>Had V3 / am-is-are</strong> diziliminin doğrudan elenme sebebidir?",
              options: [
                "Past Perfect (had V3) ile Present (am-is-are) yapılarının zaman uyumsuzluğu taşıması",
                "İki tarafın da edilgen olması",
                "Had V3 yapısının sadece gelecek zamanla kullanılabilmesi",
                "am-is-are yapısının sadece geçmiş zamanla kullanılabilmesi"
              ],
              correctIndex: 0,
              explanation: "Past Perfect (had V3) geçmişin de geçmişini anlatırken, am-is-are şimdiki/genel zamanı anlatır. Bu iki uç yapının bir arada bulunması uyumsuzluk yaratır ve şık doğrudan elenir."
            },
            {
              id: "c105_l2_ex1_q4",
              type: "multiple-choice",
              prompt: "Tense sorularında şık eleme yaparken elenmesi gereken 3 ana kombinasyon hangileridir?",
              options: [
                "am-is-are/would V0 — would V0/would V0 — had V3/am-is-are",
                "V2/had V3 — V1/will V1 — have V3/V1",
                "was Ving/V2 — had V3/V2 — V1/V1",
                "would V0/V2 — had V3/would V0 — V2/V2"
              ],
              correctIndex: 0,
              explanation: "YDS/YÖKDİL taktiklerinde seçeneklerde görüldüğünde öncelikle elenmesi gereken 3 büyük uyumsuz ikili: am-is-are/would V0, would V0/would V0 ve had V3/am-is-are yapılarıdır."
            },
            {
              id: "c105_l2_ex1_q5",
              type: "multiple-choice",
              prompt: "Seçeneklerde <code>is / would support</code> şeklinde bir fiil dizilimi verilmişse bu seçenek için ne söylenebilir?",
              options: [
                "Hatalı bir kombinasyondur (am-is-are / would V0) ve elenmelidir",
                "Şart cümlesi Type 1 formülüdür ve doğrudur",
                "Zaman uyumuna tamamen uymaktadır",
                "Sadece edilgen cümlelerde doğrudur"
              ],
              correctIndex: 0,
              explanation: "is (am-is-are) ve would support (would V0) uyumsuz bir kombinasyondur ve doğrudan elenmelidir."
            },
            {
              id: "c105_l2_ex1_q6",
              type: "multiple-choice",
              prompt: "Seçeneklerde <code>would like / would prefer</code> diziliminin elenme sebebi nedir?",
              options: [
                "Would V0 / Would V0 yan yana kullanımının hatalı olması",
                "Cümlenin past perfect anlamı taşıması",
                "İki fiilin de durum fiili olması",
                "Present simple kurallarına uymaması"
              ],
              correctIndex: 0,
              explanation: "Tense sorularında iki tarafın da would V0 / would V0 olması yapısal bir hatadır ve elenmelidir."
            },
            {
              id: "c105_l2_ex1_q7",
              type: "multiple-choice",
              prompt: "Seçeneklerde <code>had completed / are</code> dizilimi varsa bu seçeneğin durumu nedir?",
              options: [
                "Had V3 / am-is-are kombinasyonu olduğu için elenmelidir",
                "Geçmişten günümüze gelen etkiyi gösterdiği için doğrudur",
                "Zaman uyumunu sağlayan en güçlü seçenektir",
                "Type 3 şart cümlesi olduğu için doğrudur"
              ],
              correctIndex: 0,
              explanation: "Had V3 (had completed) ile are (am-is-are) yapısal olarak elenmesi gereken uyumsuz ikililerdendir."
            },
            {
              id: "c105_l2_ex1_q8",
              type: "multiple-choice",
              prompt: "Şıklarda yan yana elenmesi gereken uyumsuz dizilimler elendikten sonra kalan seçeneklerde öncelikle hangi uyuma bakılmalıdır?",
              options: [
                "Temel Zaman Uyumu (Past-Past veya Present-Present paralelliği)",
                "Edilgen (Passive) uyumu",
                "Sadece kelime anlamı uyumu",
                "Özne-Yüklem tekil/çoğul uyumu"
              ],
              correctIndex: 0,
              explanation: "Hatalı şıklar elendikten sonra geriye kalan seçeneklerde öncelikle cümle genelindeki zaman zarflarına göre Past-Past veya Present-Present zaman uyumu kontrol edilmelidir."
            }
          ]
        },
        {
          id: "c105_l2_ex2",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 2: If Yapısında Zaman Uyumsuzlukları",
          description: "Bir If şart cümlesinde, yan cümlecik ve ana cümlecik arasında asla seçilmemesi gereken kombinasyonlar.",
          questions: [
            {
              id: "c105_l2_ex2_q1",
              type: "multiple-choice",
              prompt: "Bir If şart cümlesinde, <strong>If yan cümlesinin (If tarafı)</strong> içine aşağıdakilerden hangisi **asla gelemez**?",
              options: [
                "will, would, shall, be going to, may/might/could (olasılık)",
                "Present Simple (V1)",
                "Past Simple (V2)",
                "Past Perfect (had + V3)"
              ],
              correctIndex: 0,
              explanation: "If'li yan cümleciğin içerisine gelecek zaman yardımcı fiilleri veya olasılık bildiren modallar (will, would, shall, be going to, may, might, could) kesinlikle getirilemez."
            },
            {
              id: "c105_l2_ex2_q2",
              type: "multiple-choice",
              prompt: "Aşağıdaki If şart cümlesi eşleşmelerinden hangisi <strong>asla seçilmemesi gereken uyumsuz</strong> bir kombinasyondur?",
              options: [
                "Had V3 / have-has V3 (veya Had V3 / V1 veya Had V3 / Future)",
                "Had V3 / would have V3 (Type 3)",
                "V2 / would V1 (Type 2)",
                "V1 / will V1 (Type 1)"
              ],
              correctIndex: 0,
              explanation: "If cümlelerinde 'Had V3' yan cümlesi varken ana cümlede 'have-has V3', 'V1' veya 'Future' yapılarının yer alması tamamen uyum kurallarına aykırıdır ve bu şıklar elenir."
            },
            {
              id: "c105_l2_ex2_q3",
              type: "multiple-choice",
              prompt: "If cümlelerinde <strong>was-were Ving / have-has V3</strong> veya <strong>was-were Ving / had V3</strong> eşleşmeleri için hangisi söylenir?",
              options: [
                "Tamamen uyum dışıdır ve şıklarda elenmelidir",
                "Mixed Type olarak doğru kabul edilebilir",
                "Type 2'nin pasif formülüdür ve doğrudur",
                "Tense uyumu arama kuralını ihlal etmez"
              ],
              correctIndex: 0,
              explanation: "was-were Ving ile have-has V3 ya da had V3 eşleşmeleri If şart cümlelerinde dil bilgisi kurallarına göre elenmesi gereken hatalı kombinasyonlardır."
            },
            {
              id: "c105_l2_ex2_q4",
              type: "multiple-choice",
              prompt: "If cümlesinin <strong>ana cümlesinde (Main Clause)</strong>; <code>have/has V3, V2, was/were Ving veya had V3</code> bulunduğunda diğer tarafa hangisinin gelmesi **%90 oranında engellenir**?",
              options: [
                "am-is-are veya am-is-are V-ing",
                "will V1",
                "would V1",
                "had V3"
              ],
              correctIndex: 0,
              explanation: "If şart yapısının ana cümlesinde have/has V3, V2, was/were Ving ya da had V3 yer alıyorsa, yan cümleye present durum bildiren 'am-is-are' veya 'am-is-are Ving' gelmez."
            },
            {
              id: "c105_l2_ex2_q5",
              type: "multiple-choice",
              prompt: "<code>If I will see him, I will tell him.</code> cümlesindeki **yapısal kural hatası** nedir?",
              options: [
                "If yan cümlesinin içine gelecek zaman belirten 'will' yazılmıştır",
                "Ana cümlede will kullanılması yanlıştır",
                "Cümlenin iki tarafının da past olması gerekirdi",
                "If kelimesi yerine unless kullanılmalıydı"
              ],
              correctIndex: 0,
              explanation: "If'li yan cümlenin içerisine 'will' gelemez. Doğrusu: 'If I see him, I will tell him.' (Type 1) olmalıdır."
            },
            {
              id: "c105_l2_ex2_q6",
              type: "multiple-choice",
              prompt: "Aşağıdaki If kombinasyonlarından hangisinde **yapısal uyumsuzluk** vardır?",
              options: [
                "If had researched / has improved",
                "If had researched / would have improved",
                "If researched / would improve",
                "If research / will improve"
              ],
              correctIndex: 0,
              explanation: "If tarafında 'had researched' (had V3) varken ana cümlede 'has improved' (have/has V3) kullanımı uyum kuralları dışındadır ve elenir."
            },
            {
              id: "c105_l2_ex2_q7",
              type: "multiple-choice",
              prompt: "Bir If sorusunda If tarafında <code>was working</code> varken ana cümlede <code>has achieved</code> verilmişse bu seçenek neden elenir?",
              options: [
                "was-were Ving / have-has V3 eşleşmesi If yapısında uyumsuzdur",
                "If tarafı her zaman simple present olmak zorundadır",
                "Ana cümle sadece would alabilir",
                "Tense uyumu aranmadığı için elenir"
              ],
              correctIndex: 0,
              explanation: "If şart cümlelerinde was-were Ving ile have-has V3 kombinasyonu yapısal uyumsuzluk tablosuna göre yanlıştır."
            },
            {
              id: "c105_l2_ex2_q8",
              type: "multiple-choice",
              prompt: "<code>If he had checked the logs, he will prevent the crash.</code> cümlesinin elenme nedeni nedir?",
              options: [
                "Had V3 / Future (will prevent) uyumsuz eşleşmesidir",
                "Crash kelimesinin edilgen olması gerekirdi",
                "If'li cümlenin içine had gelmez",
                "prevent fiili V2 olmalıdır"
              ],
              correctIndex: 0,
              explanation: "If yan cümlesinde 'had V3' varken ana cümlede Future ('will prevent') bulunması zaman uyumsuzluğu yaratır ve elenir."
            }
          ]
        }
      ]
    },
    {
      id: "c105_l3",
      unitId: 105,
      title: "3. Zaman Uyumu Denklem Çözücü",
      subtitle: "Formül Denklemleri ve Mantıksal Seçimler",
      konuAnlatimi: {
        baslik: "Zaman Uyumu Denklem Çözücü",
        teorikMantik: "Formül yapılarını birer matematiksel denklem gibi düşünerek, boş bırakılan tarafı zaman zarfları ve bağlaçların uyum kurallarına göre çözme çalışmasıdır.",
        formul: "Ortak Özne: [S + V_A + and + V_B] ➔ A & B paralel / Yan Cümlede Will/Would Yasası / Recently-Lately ➔ Present Perfect / İki Perfect Yan Yana Gelmez / At that time (V2) / At the moment (am-is-are Ving) / Up to now (have-has V3)",
        altinKural: "Zaman bağlaçlarının iki tarafında da aynı anda iki tane Perfect (have V3 / had V3) kesinlikle kullanılamaz."
      },
      exercises: [
        {
          id: "c105_l3_ex1",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 1: Zaman Denklemleri ve Mantıksal Seçimler (Set A)",
          description: "13 temel zaman formülü, yasak ve sınırlamayı test eden birinci soru seti.",
          questions: [
            {
              id: "c105_l3_ex1_q1",
              type: "multiple-choice",
              prompt: "<code>[Subject_A + V_? (yesterday)] + [and (Ortak Özne)] + [V_? (yesterday)]</code> denkleminde zaman uyumu gereği boşluklar ne olmalıdır?",
              options: [
                "[V2 (Past Simple)] + and + [V2 (Past Simple)]",
                "[V2 (Past Simple)] + and + [V1 (Present Simple)]",
                "[had + V3 (Past Perfect)] + and + [will + V1]",
                "[V2 (Past Simple)] + and + [have/has + V3]"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [Subject_A + V_A (Past/yesterday)] + [and] + [V_B (Past/yesterday)] ➔ A & B paralel olmalıdır.<br><b>Yasak ve Sınırlamalar:</b> Ortak özneyi bağlayan 'and' yapısında, özneler ortak olduğu için taraflar arasında uyumsuz tense çiftleri (V2/V1 veya V2/have V3 gibi) kullanılamaz.<br><b>Kritik Detay:</b> Dün gerçekleşen iki ardışık veya eş zamanlı paralel eylem, ortak özne altında Past Simple (V2) ➔ Past Simple (V2) şeklinde çekimlenir."
            },
            {
              id: "c105_l3_ex1_q2",
              type: "multiple-choice",
              prompt: "Zaman bağlacı içeren sorularda, bağlacın doğrudan bağlı olduğu <strong>yan cümleye</strong> ve <strong>ana cümleye</strong> getirilmesi yasak olan yapılar sırasıyla hangileridir?",
              options: [
                "Yan cümleye [will, would, shall, be going to] gelmez; ana cümleye ise [have-has V3 / have-has been Ving] getirilemez.",
                "Yan cümleye [have-has V3]; ana cümleye ise [will, would, shall] getirilemez.",
                "Yan cümleye [V1 (Present Simple)]; ana cümleye ise [will + V1] getirilemez.",
                "Yan cümleye [V2 (Past Simple)]; ana cümleye ise [had + V3] getirilemez."
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [Zaman Bağlacı + Yan Cümle (will/would/shall/be going to YASAK)] ➔ [Ana Cümle (have-has V3 / been Ving YASAK)]<br><b>Yasak ve Sınırlamalar:</b> Zaman bağlaçlarının doğrudan bağlı olduğu kısma gelecek zaman yardımcıları gelmez; ana cümleye ise eylemin geçmiş-bugün sınırında duran present perfect yapıları getirilemez.<br><b>Kritik Detay:</b> Bu kurallar tense ve cümle tamamlama sorularında seçeneklerin %90'ını doğrudan elemenizi sağlar."
            },
            {
              id: "c105_l3_ex1_q3",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (ancient times)] + [because] + [Subject + V_? (today)]</code> denkleminde boşluklar ne olmalıdır?",
              options: [
                "[V2 (Past Simple)] + because + [V1 (Present Simple) / am-is-are]",
                "[V2 (Past Simple)] + because + [had + V3 (Past Perfect)]",
                "[V1 (Present Simple)] + because + [V2 (Past Simple)]",
                "[will + V1 (Future)] + because + [would + V1]"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [Cümle A (Zaman Zarfı A)] + [because] + [Cümle B (Zaman Zarfı B)] ➔ Uyum Aranmaz.<br><b>Yasak ve Sınırlamalar:</b> Sebep-sonuç bağlaçları (because, as, since -çünkü anlamında-), zıtlık bağlaçları (although, but vb.) ve Relative Clause yapılarında zaman uyumu zorunluluğu yoktur.<br><b>Kritik Detay:</b> Geçmişteki bir olayın nedeni günümüzdeki bir gerçeklik olabileceğinden (ancient times ➔ V2, today ➔ V1) kombinasyonu tamamen doğrudur."
            },
            {
              id: "c105_l3_ex1_q4",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (recently)]</code> denkleminde fiilin yapısı ne olmalıdır?",
              options: [
                "have/has + V3 (Present Perfect)",
                "V2 (Past Simple)",
                "V1 (Present Simple)",
                "will + V1 (Future Simple)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [Subject + recently / lately] ➔ have/has + V3 / have/has been Ving.<br><b>Yasak ve Sınırlamalar:</b> Recently ve lately doğrudan geçmişten bugüne gelen süreci işaret ettiğinden Simple Past (V2), Past Perfect (had V3) veya Future (will V1) yapılarla kullanılamaz.<br><b>Kritik Detay:</b> Son zamanlarda anlamındaki bu kelimeler present perfect için en net zaman ipuçlarından biridir."
            },
            {
              id: "c105_l3_ex1_q5",
              type: "multiple-choice",
              prompt: "<code>[Before + Subject + have / has + V3] ➔ [Subject + have / has + V3 / had + V3]</code> denklemi için hangisi doğrudur?",
              options: [
                "Hatalı Yapı: Zaman bağlaçlarının iki tarafında da aynı anda iki adet Perfect Tense (have V3 / had V3) kullanılamaz.",
                "Doğru Yapı: Zaman uyumu sağlandığı sürece iki taraf da perfect olabilir.",
                "Doğru Yapı: Before ile sadece had V3 ve have V3 yan yana kullanılabilir.",
                "Doğru Yapı: Eylemlerin bitiş sırasını göstermek için bu yapı kurulmalıdır."
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> Zaman bağlacı içeren cümlelerde [Perfect Tense] ➔ [Perfect Tense] yan yana gelemez.<br><b>Yasak ve Sınırlamalar:</b> Zaman bağlaçlarının iki tarafında birden aynı anda iki tane perfect (have V3 / had V3) bulunması dil bilgisel olarak kesinlikle yasaktır.<br><b>Kritik Detay:</b> Eylemler arasında önce-sonra ilişkisi olması gerektiğinden, her iki tarafın da bitmişlik bildirmesi mantıksal olarak elenir."
            },
            {
              id: "c105_l3_ex1_q6",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (originally)]</code> denkleminde fiilin yapısı ne olmalıdır?",
              options: [
                "V2 (Past Simple)",
                "V1 (Present Simple)",
                "will + V1 (Future Simple)",
                "have/has + V3 (Present Perfect)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [originally / formerly / initially / in the past] ➔ V2 (Past Simple).<br><b>Yasak ve Sınırlamalar:</b> Geçmişi net simgeleyen kelimelerin bulunduğu cümlelerde present (V1) veya future (will V1) yapılar kullanılamaz.<br><b>Kritik Detay:</b> originally (aslen / başlangıçta) kelimesi olayın geçmişteki kökenini bildirdiğinden doğrudan Past Simple (V2) gerektirir."
            },
            {
              id: "c105_l3_ex1_q7",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (currently)]</code> denkleminde fiil yapısı ne olmalıdır?",
              options: [
                "Simple Present (V1) veya Present Continuous (am/is/are + V-ing)",
                "Past Simple (V2)",
                "Past Perfect (had + V3)",
                "Future Perfect (will have + V3)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [currently / presently / at present / now] ➔ V1 / am-is-are + V-ing.<br><b>Yasak ve Sınırlamalar:</b> Şimdiki zaman zarflarının olduğu cümlelerde past (V2, had V3) veya future perfect (will have V3) yapılar kullanılamaz.<br><b>Kritik Detay:</b> currently (şu anda / güncel olarak) ifadesi konuşma anını veya güncel süreci bildirdiğinden present yapı gerektirir."
            },
            {
              id: "c105_l3_ex1_q8",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (Zaman Göstergesi / İpucu Yok)]</code> denkleminde öncelikli olarak hangi yapılara yönelinmelidir?",
              options: [
                "Öncelikle Present yapılar (V1 / am-is-are / have-has V3)",
                "Öncelikle Past yapılar (V2 / had + V3)",
                "Öncelikle Future yapılar (will + V1 / will have + V3)",
                "Öncelikle Past Continuous yapılar (was/were + V-ing)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [İpucu Yok] ➔ Öncelik Present Yapılar.<br><b>Yasak ve Sınırlamalar:</b> Soruda geçmişe veya geleceğe ait net bir ipucu yoksa, durup dururken past perfect (had V3) veya past continuous (was/were Ving) işaretlenmesi yanlıştır.<br><b>Kritik Detay:</b> Genel bilimsel doğrular, evrensel gerçekler veya genel durumlar present simple ile anlatılır."
            },
            {
              id: "c105_l3_ex1_q9",
              type: "multiple-choice",
              prompt: "Bir film, roman veya tiyatro eseri özetlenirken eylemler hangi zaman (tense) ile düşünülmelidir?",
              options: [
                "Present Tense (Geniş Zaman / V1 veya Present Continuous)",
                "Past Tense (V2 / Past Simple)",
                "Past Perfect Tense (had + V3)",
                "Future in the Past (would + V1)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [Film/Kitap özeti veya hikaye anlatımı] ➔ Present Tense.<br><b>Yasak ve Sınırlamalar:</b> Kurgusal hikaye anlatımları veya sanatsal eser özetlerinde past tense (V2) kullanımı genel dil bilgisi kuralı olarak elenmelidir.<br><b>Kritik Detay:</b> Eserin kurgusal dünyasındaki olaylar 'her zaman geçerli bir gerçeklik' gibi sunulduğundan Geniş Zaman (Present Simple) ile aktarılır."
            },
            {
              id: "c105_l3_ex1_q10",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (at that time)]</code> denkleminde boşluğa hangisi gelmelidir?",
              options: [
                "V2 (Past Simple) veya Was/Were + V-ing (Past Continuous)",
                "V1 (Present Simple) veya Am/Is/Are + V-ing",
                "have/has + V3 veya have/has been + V-ing",
                "will + V1 veya would + V1"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [at that time / at that moment] ➔ V2 / was-were + V-ing.<br><b>Yasak ve Sınırlamalar:</b> at that time geçmişte belirli bir anı işaret ettiğinden present (V1/am-is-are Ving) veya future yapılar getirilemez.<br><b>Kritik Detay:</b> 'O esnada / o zamanlar' anlamına gelerek doğrudan geçmişte devam eden veya gerçekleşen eylemleri niteler."
            },
            {
              id: "c105_l3_ex1_q11",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (at the moment)]</code> denkleminde boşluğa hangisi gelmelidir?",
              options: [
                "Am/Is/Are + V-ing (Present Continuous)",
                "V2 (Past Simple)",
                "Was/Were + V-ing",
                "have/has + V3 (Present Perfect)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [at the moment / gradually / day by day] ➔ Am/Is/Are + V-ing.<br><b>Yasak ve Sınırlamalar:</b> Konuşma anında sürmekte olan eylemler için Simple Past (V2) veya Past Continuous (was/were Ving) kullanılması yanlıştır.<br><b>Kritik Detay:</b> 'Şu anda' anlamına gelen at the moment, eylemin konuşma anında devam ettiğini bildirir."
            },
            {
              id: "c105_l3_ex1_q12",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (up to now)]</code> denkleminde boşluğa hangisi gelmelidir?",
              options: [
                "Have/Has + V3 veya Have/Has been + V-ing",
                "V2 veya Was/Were + V-ing",
                "V1 veya Am/Is/Are + V-ing",
                "had + V3 veya had been + V-ing"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [up to now / up till now / until now] ➔ Have/Has + V3 / been + V-ing.<br><b>Yasak ve Sınırlamalar:</b> 'Şu ana kadar' anlamı geçmişten günümüze süreci bağladığı için past simple (V2) veya past perfect (had V3) kullanılamaz.<br><b>Kritik Detay:</b> Eylemin geçmişte başlayıp günümüze kadar ulaştığını veya etkilediğini vurgular."
            },
            {
              id: "c105_l3_ex1_q13",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (for two days gibi süreç belirten ifadeler)]</code> denkleminde eylemin anlık/süreklilik durumunu tam karşılayamadığı için elenen tenseler hangileridir?",
              options: [
                "am-is-are Ving, was/were Ving ve will be Ving",
                "have/has V3, had V3 ve will have V3",
                "have/has been Ving, had been Ving ve will have been Ving",
                "Present Simple (V1) ve Past Simple (V2)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [süreç zarfı (for / throughout / since)] ➔ Perfect Tenses (have/has been Ving, had V3 vb.).<br><b>Yasak ve Sınırlamalar:</b> for two days veya throughout the year gibi süreç bildiren zaman ifadeleri yer alıyorsa, eylemin anlık/süreklilik durumunu tam karşılayamadığı için am-is-are Ving, was/were Ving ve will be Ving yapıları elenir.<br><b>Kritik Detay:</b> Süreç bildiren zarflar anlık değil, bir birikim ve süreç anlattığı için perfect yapılara yönelinmelidir."
            }
          ]
        },
        {
          id: "c105_l3_ex2",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 2: Zaman Denklemleri ve Mantıksal Seçimler (Set B)",
          description: "13 temel zaman formülü, yasak ve sınırlamayı test eden ikinci soru seti.",
          questions: [
            {
              id: "c105_l3_ex2_q1",
              type: "multiple-choice",
              prompt: "<code>[Subject_A + V_? (recently)] + [and (Ortak Özne)] + [V_? (recently)]</code> denkleminde boşluklar ne olmalıdır?",
              options: [
                "[have/has + V3] + and + [have/has + V3] (Ortak öznede paralel zaman)",
                "[have/has + V3] + and + [V2 (Past Simple)]",
                "[have/has + V3] + and + [V1 (Present Simple)]",
                "[V1 (Present Simple)] + and + [have/has + V3]"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [Subject_A + V_A (recently)] + [and] + [V_B (recently)] ➔ A & B paralel olmalıdır.<br><b>Yasak ve Sınırlamalar:</b> and bağlacı ortak özneyi bağladığından ve recently kelimesinden ötürü her iki fiil de paralel olarak Present Perfect (have/has V3) olmalıdır, farklı zamanlar getirilemez.<br><b>Kritik Detay:</b> Recently kelimesi eylemlerin ikisini de kapsar ve ortak özne paralellik şartını tetikler."
            },
            {
              id: "c105_l3_ex2_q2",
              type: "multiple-choice",
              prompt: "<code>[After + Subject + will + V1] ➔ [Subject + V_?]</code> denklemi için hangisi söylenebilir?",
              options: [
                "Hatalı Yapı: Zaman bağlacının doğrudan bağlı olduğu yan cümlede will/would/shall/be going to kullanılması kesinlikle yasaktır.",
                "Doğru Yapı: Eylem gelecekte olacağı için yan cümleye will gelmelidir.",
                "Doğru Yapı: Yan cümle present simple olmalı, ana cümle perfect olmalıdır.",
                "Doğru Yapı: Yan cümle perfect olmalı, ana cümle present continuous olmalıdır."
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [After + Subject + will/would/shall YASAK] ➔ [Ana Cümle]<br><b>Yasak ve Sınırlamalar:</b> Zaman bağlaçlarının doğrudan bağlı olduğu yan cümleye gelecek zaman modalları getirilemez.<br><b>Kritik Detay:</b> Gelecek zaman anlamı vermek istiyorsak, after yan cümlesinde Present Simple (V1) veya Present Perfect (have/has V3) kullanırız."
            },
            {
              id: "c105_l3_ex2_q3",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (originally)] + [although] + [Subject + V_? (now)]</code> denkleminde boşluklar ne olmalıdır?",
              options: [
                "[V2 (Past Simple)] + although + [V1 (Present Simple) / am-is-are]",
                "[V2 (Past Simple)] + although + [had + V3 (Past Perfect)]",
                "[V1 (Present Simple)] + although + [will have + V3]",
                "[would + V1] + although + [V2 (Past Simple)]"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [originally ➔ V2] + [although] + [now ➔ V1] ➔ Uyum Aranmaz.<br><b>Yasak ve Sınırlamalar:</b> although zıtlık bağlacından dolayı zaman uyumu aranmaz.<br><b>Kritik Detay:</b> originally geçmişteki asıl durumu (V2), now ise günümüzü (V1) işaret ettiğinden bu zıtlık yapısı tamamen doğrudur."
            },
            {
              id: "c105_l3_ex2_q4",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (lately)]</code> denkleminde fiil yapısı ne olmalıdır?",
              options: [
                "have/has + V3 (Present Perfect) veya have/has been + V-ing",
                "V2 (Past Simple)",
                "V1 (Present Simple)",
                "will + V1 (Future Simple)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [lately] ➔ Present Perfect (have/has V3) veya Present Perfect Continuous.<br><b>Yasak ve Sınırlamalar:</b> lately (son zamanlarda) kelimesi doğrudan süreci işaret eder ve past simple (V2) veya present (V1) ile kullanılamaz.<br><b>Kritik Detay:</b> recently ile tamamen paralel bir kullanıma sahiptir."
            },
            {
              id: "c105_l3_ex2_q5",
              type: "multiple-choice",
              prompt: "<code>[After + Subject + had + V3] ➔ [Subject + had + V3]</code> denklemi için hangisi elenmelidir?",
              options: [
                "Hatalı Yapı: Zaman bağlacının iki tarafında da aynı anda iki tane Perfect Tense (had V3 / had V3) gelemez.",
                "Doğru Yapı: Geçmişteki iki olay da çok eski olduğu için doğrudur.",
                "Doğru Yapı: Sadece after bağlacıyla iki tarafın da perfect olması kuraldır.",
                "Doğru Yapı: Hikayeleştirme (narrative) yapıldığında serbesttir."
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> Zaman bağlaçlı cümlelerde [Perfect] ➔ [Perfect] gelemez.<br><b>Yasak ve Sınırlamalar:</b> İki tarafın da aynı anda perfect olması kesinlikle yasaktır.<br><b>Kritik Detay:</b> After yan cümlesi had V3 olduğunda, ana cümlenin Past Simple (V2) olması zorunludur."
            },
            {
              id: "c105_l3_ex2_q6",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (formerly)]</code> denkleminde fiilin yapısı ne olmalıdır?",
              options: [
                "V2 (Past Simple)",
                "V1 (Present Simple)",
                "will + V1 (Future Simple)",
                "have/has + V3 (Present Perfect)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [formerly] ➔ V2 (Past Simple).<br><b>Yasak ve Sınırlamalar:</b> formerly (eskiden) geçmişi simgelediğinden present veya perfect yapılar getirilemez.<br><b>Kritik Detay:</b> formerly kelimesi olayın eskiden yapıldığını bildirerek doğrudan Past Simple (V2) ile eşleşir."
            },
            {
              id: "c105_l3_ex2_q7",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (presently)]</code> denkleminde fiil yapısı ne olmalıdır?",
              options: [
                "Simple Present (V1) veya Present Continuous (am/is/are + V-ing)",
                "Past Simple (V2)",
                "Past Perfect (had + V3)",
                "Future Perfect (will have + V3)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [presently] ➔ Present (V1 / am-is-are Ving).<br><b>Yasak ve Sınırlamalar:</b> presently (şu sıralar / yakında) güncel zamanı işaret ettiğinden past (V2) veya past perfect (had V3) getirilemez.<br><b>Kritik Detay:</b> Konuşma anına yakın güncel süreçleri tanımlamak için present yapılara yönelinir."
            },
            {
              id: "c105_l3_ex2_q8",
              type: "multiple-choice",
              prompt: "Hiçbir zaman göstergesi bulunmayan genel bir doğa yasası cümlesinde hangi zaman (tense) seçilmelidir?",
              options: [
                "Simple Present (Present / V1)",
                "Past Simple (Past / V2)",
                "Future Simple (will + V1)",
                "Past Perfect (had + V3)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [İpucu Yok / Doğa Yasası] ➔ Simple Present (V1).<br><b>Yasak ve Sınırlamalar:</b> Evrensel doğrular veya doğa yasalarında past veya future yapılar kullanılamaz.<br><b>Kritik Detay:</b> Bilimsel gerçekler her zaman geçerli olduğu için Simple Present (Geniş Zaman) ile aktarılır."
            },
            {
              id: "c105_l3_ex2_q9",
              type: "multiple-choice",
              prompt: "Bir tiyatro eseri veya roman özetlenirken, olay örgüsündeki eylemler hangi zaman yapısında kurulur?",
              options: [
                "Simple Present (V1) veya Present Continuous",
                "Simple Past (V2)",
                "Past Perfect (had + V3)",
                "Future Perfect (will have + V3)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [Kitap/Tiyatro Özeti] ➔ Present Tense.<br><b>Yasak ve Sınırlamalar:</b> Eser özetlerinde past (V2/had V3) kullanımı dil bilgisi kurallarına göre elenir.<br><b>Kritik Detay:</b> Kitap veya oyun özetleri güncel anlatım diliyle (Present) sunulmalıdır."
            },
            {
              id: "c105_l3_ex2_q10",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (at that moment)]</code> denkleminde boşluğa hangisi gelmelidir?",
              options: [
                "V2 (Past Simple) veya Was/Were + V-ing (Past Continuous)",
                "V1 (Present Simple) veya Am/Is/Are + V-ing",
                "have/has + V3 veya have/has been + V-ing",
                "will + V1 veya would + V1"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [at that moment] ➔ V2 / was-were + V-ing.<br><b>Yasak ve Sınırlamalar:</b> at that moment geçmişte tam o anı bildirdiği için present veya future yapılarla kullanılamaz.<br><b>Kritik Detay:</b> O andaki devam eden olayı aktarmak için genellikle Past Continuous tercih edilir."
            },
            {
              id: "c105_l3_ex2_q11",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (gradually)]</code> denkleminde boşluğa hangisi gelmelidir?",
              options: [
                "Am/Is/Are + V-ing (Present Continuous)",
                "V2 (Past Simple)",
                "Was/Were + V-ing",
                "have/has + V3 (Present Perfect)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [gradually] ➔ Am/Is/Are + V-ing.<br><b>Yasak ve Sınırlamalar:</b> gradually (kademeli olarak / yavaş yavaş) süregelen bir değişimi bildirdiğinden past perfect veya simple past ile kullanılması genellikle yanlıştır.<br><b>Kritik Detay:</b> Değişim ve süreç bildiren ifadeler Present Continuous ile eşleşir."
            },
            {
              id: "c105_l3_ex2_q12",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (up till now)]</code> denkleminde boşluğa hangisi gelmelidir?",
              options: [
                "Have/Has + V3 veya Have/Has been + V-ing",
                "V2 veya Was/Were + V-ing",
                "V1 veya Am/Is/Are + V-ing",
                "had + V3 veya had been + V-ing"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [up till now] ➔ Have/Has + V3 / been + V-ing.<br><b>Yasak ve Sınırlamalar:</b> Şu ana kadar anlamındaki bu zarf past simple veya past perfect yapılarla kesinlikle birleşemez.<br><b>Kritik Detay:</b> Eylemin geçmişten günümüze uzanan sürecini temsil eder."
            },
            {
              id: "c105_l3_ex2_q13",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (throughout the year gibi süreç belirten ifadeler)]</code> denkleminde eylemin anlık/süreklilik durumunu tam karşılayamadığı için elenen tenseler hangileridir?",
              options: [
                "am-is-are Ving, was/were Ving ve will be Ving",
                "have/has V3, had V3 ve will have V3",
                "have/has been Ving, had been Ving ve will have been Ving",
                "Present Simple (V1) ve Past Simple (V2)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [throughout the year (süreç)] ➔ Perfect Tenses.<br><b>Yasak ve Sınırlamalar:</b> Tense sorularında throughout the year gibi süreç bildiren zaman ifadeleri yer alıyorsa, eylemin anlık/süreklilik durumunu tam karşılayamadığı için am-is-are Ving, was/were Ving ve will be Ving yapıları elenir.<br><b>Kritik Detay:</b> Yıl boyunca devam eden birikimli durumlar perfect veya perfect continuous ile anlatılır."
            }
          ]
        },
        {
          id: "c105_l3_ex3",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 3: Zaman Denklemleri ve Mantıksal Seçimler (Set C)",
          description: "13 temel zaman formülü, yasak ve sınırlamayı test eden üçüncü soru seti.",
          questions: [
            {
              id: "c105_l3_ex3_q1",
              type: "multiple-choice",
              prompt: "<code>[Subject_A + V_? (today)] + [and (Ortak Özne)] + [V_? (today)]</code> denkleminde boşluklar ne olmalıdır?",
              options: [
                "[V1 (Present Simple)] + and + [V1 (Present Simple)]",
                "[V2 (Past Simple)] + and + [V1 (Present Simple)]",
                "[had + V3 (Past Perfect)] + and + [will + V1]",
                "[V1 (Present Simple)] + and + [have/has + V3]"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [Subject_A + V_A (today)] + [and] + [V_B (today)] ➔ A & B paralel olmalıdır.<br><b>Yasak ve Sınırlamalar:</b> and bağlacı ortak özneyi bağladığı için eylemlerের zamanı (today zarfı nedeniyle) paralel olarak Present Simple (V1) ➔ Present Simple (V1) olmalıdır.<br><b>Kritik Detay:</b> Ortak özne paralellik gerektirir, farklı özneler olsaydı uyum aranmayabilirdi."
            },
            {
              id: "c105_l3_ex3_q2",
              type: "multiple-choice",
              prompt: "<code>[As soon as + Subject + would + V1] ➔ [Subject + V_?]</code> denklemi için hangisi söylenebilir?",
              options: [
                "Hatalı Yapı: Zaman bağlacının doğrudan bağlı olduğu yan cümlede would/will/be going to kullanılması kesinlikle yasaktır.",
                "Doğru Yapı: Eylem geçmişteki bir plan olduğu için would kullanılmalıdır.",
                "Doğru Yapı: Yan cümle would alırken, ana cümle had V3 almalıdır.",
                "Doğru Yapı: Yan cümle would alırken, ana cümle will almalıdır."
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [As soon as + Subject + would YASAK] ➔ [Ana Cümle]<br><b>Yasak ve Sınırlamalar:</b> Zaman bağlaçlarının doğrudan bağlı olduğu yan cümleye would yardımcı fiili getirilemez.<br><b>Kritik Detay:</b> Geçmişteki ardışıklığı anlatmak için as soon as yan cümlesinde Past Simple (V2) kullanılır."
            },
            {
              id: "c105_l3_ex3_q3",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (in the 19th century)] + [who / which / that (Relative Clause)] + [Subject + V_? (today)]</code> denkleminde boşluklar ne olmalıdır?",
              options: [
                "[V2 (Past Simple)] + [Relative Clause] + [V1 (Present Simple) / am-is-are]",
                "[V2 (Past Simple)] + [Relative Clause] + [had + V3 (Past Perfect)]",
                "[V1 (Present Simple)] + [Relative Clause] + [will have + V3]",
                "[would + V1] + [Relative Clause] + [V2 (Past Simple)]"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [Cümle A (19th century ➔ V2)] + [Relative Clause] + [Cümle B (today ➔ V1)] ➔ Uyum Aranmaz.<br><b>Yasak ve Sınırlamalar:</b> Relative Clause içerisinde farklı zaman dilimlerine ait kelimeler (19th century vs today) zaman uyumu zorunluluğuna tabi değildir.<br><b>Kritik Detay:</b> 19. yüzyıldaki bir durumu bugün tanımlayan bir RC cümlesinde tarafların zamanları bağımsızdır."
            },
            {
              id: "c105_l3_ex3_q4",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (until recently)]</code> denkleminde fiil yapısı ne olmalıdır?",
              options: [
                "had + V3 (Past Perfect) veya V2 (Past Simple)",
                "V1 (Present Simple)",
                "will + V1 (Future Simple)",
                "have/has + V3 (Present Perfect)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [until recently / until lately] ➔ had + V3 / V2.<br><b>Yasak ve Sınırlamalar:</b> until recently 'yakın zamana kadar' anlamına gelerek geçmişte biten bir süreci veya durumu belirtir, present perfect (have/has V3) getirilemez.<br><b>Kritik Detay:</b> Yakın zamana kadar devam etmiş ama artık değişmiş olan durumları belirtmek için Past Perfect (had V3) tercih edilir."
            },
            {
              id: "c105_l3_ex3_q5",
              type: "multiple-choice",
              prompt: "<code>[When + Subject + have / has + V3] ➔ [Subject + had + V3]</code> denklemi için hangisi doğrudur?",
              options: [
                "Hatalı Yapı: Zaman bağlacının iki tarafında birden aynı anda perfect yapılar (have V3 ve had V3) yer alamaz.",
                "Doğru Yapı: Eylemlerin ardışıklığını en iyi bu perfect uyumu sağlar.",
                "Doğru Yapı: When ile bu iki perfect tense serbestçe kullanılabilir.",
                "Doğru Yapı: Cümle anlamı geleceği işaret ettiğinde doğrudur."
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> Zaman bağlaçlı cümlelerde [Perfect] ➔ [Perfect] gelemez.<br><b>Yasak ve Sınırlamalar:</b> İki tarafın da perfect olması dil bilgisi kurallarına göre kesinlikle yasaktır.<br><b>Kritik Detay:</b> When yan cümlesi present perfect (have/has V3) olduğunda, ana cümlenin Present Simple (V1) veya Future (will V1) olması gerekir."
            },
            {
              id: "c105_l3_ex3_q6",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (ancient / old)]</code> denkleminde fiilin yapısı ne olmalıdır?",
              options: [
                "V2 (Past Simple)",
                "V1 (Present Simple)",
                "will + V1 (Future Simple)",
                "have/has + V3 (Present Perfect)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [ancient / old] ➔ V2 (Past Simple).<br><b>Yasak ve Sınırlamalar:</b> Antik çağları veya eski dönemleri bildiren kelimelerin olduğu cümlelerde present (V1) veya present perfect (have/has V3) kullanılamaz.<br><b>Kritik Detay:</b> Tarihsel geçmişi ifade ettiğinden doğrudan Past Simple (V2) ile eşleşir."
            },
            {
              id: "c105_l3_ex3_q7",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (at present)]</code> denkleminde fiil yapısı ne olmalıdır?",
              options: [
                "Simple Present (V1) veya Present Continuous (am/is/are + V-ing)",
                "Past Simple (V2)",
                "Past Perfect (had + V3)",
                "Future Perfect (will have + V3)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [at present] ➔ Present (V1 / am-is-are Ving).<br><b>Yasak ve Sınırlamalar:</b> at present (şu anda) güncel zamanı işaret ettiğinden past (V2) veya past perfect (had V3) kullanılması yanlıştır.<br><b>Kritik Detay:</b> Şu anki durumu veya eylemleri nitelemek için present yapılara yönelinir."
            },
            {
              id: "c105_l3_ex3_q8",
              type: "multiple-choice",
              prompt: "Hiçbir zaman göstergesi veya ipucu barındırmayan genel durum cümlelerinde hangi zaman tercih edilmelidir?",
              options: [
                "Simple Present (V1 / Present Simple)",
                "Past Simple (V2 / Past Simple)",
                "Future Simple (will + V1)",
                "Past Perfect (had + V3)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [İpucu Yok] ➔ Simple Present (V1).<br><b>Yasak ve Sınırlamalar:</b> Genel durumlarda past (V2) veya past perfect (had V3) seçilmesi kesinlikle elenmelidir.<br><b>Kritik Detay:</b> İpucu olmayan genel anlatımlarda varsayılan zaman Geniş Zaman'dır."
            },
            {
              id: "c105_l3_ex3_q9",
              type: "multiple-choice",
              prompt: "Bir hikaye anlatımında veya masal özetinde olaylar hangi zaman (tense) ile kurgulanmalıdır?",
              options: [
                "Present Tense (V1 veya Present Continuous)",
                "Past Tense (V2 / Past Simple)",
                "Past Perfect Tense (had + V3)",
                "Future in the Past (would + V1)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [Hikaye Anlatımı / Masal] ➔ Present Tense.<br><b>Yasak ve Sınırlamalar:</b> Hikaye ve masal anlatım/özetleme tekniklerinde kural gereği past tense (V2) kullanımı elenir.<br><b>Kritik Detay:</b> Hikayeler canlılık katmak amacıyla Present (Geniş/Şimdiki Zaman) olarak anlatılır."
            },
            {
              id: "c105_l3_ex3_q10",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (in those days)]</code> denkleminde boşluğa hangisi gelmelidir?",
              options: [
                "V2 (Past Simple) veya Was/Were + V-ing (Past Continuous)",
                "V1 (Present Simple) veya Am/Is/Are + V-ing",
                "have/has + V3 veya have/has been + V-ing",
                "will + V1 veya would + V1"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [in those days] ➔ V2 / was-were + V-ing.<br><b>Yasak ve Sınırlamalar:</b> in those days (o günlerde) geçmişi bildirdiği için present veya future yapılar getirilemez.<br><b>Kritik Detay:</b> Geçmişteki bir zaman dilimini nitelemek için Past Simple veya Past Continuous kullanılır."
            },
            {
              id: "c105_l3_ex3_q11",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (day by day)]</code> denkleminde boşluğa hangisi gelmelidir?",
              options: [
                "Am/Is/Are + V-ing (Present Continuous)",
                "V2 (Past Simple)",
                "Was/Were + V-ing",
                "have/has + V3 (Present Perfect)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [day by day] ➔ Am/Is/Are + V-ing.<br><b>Yasak ve Sınırlamalar:</b> day by day (günden güne) süregelen değişimi nitelediği için past perfect veya future perfect ile birleşemez.<br><b>Kritik Detay:</b> Günden güne gelişen/değişen durumlar Present Continuous ile aktarılır."
            },
            {
              id: "c105_l3_ex3_q12",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (until now)]</code> denkleminde boşluğa hangisi gelmelidir?",
              options: [
                "Have/Has + V3 veya Have/Has been + V-ing",
                "V2 veya Was/Were + V-ing",
                "V1 veya Am/Is/Are + V-ing",
                "had + V3 veya had been + V-ing"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [until now] ➔ Have/Has + V3 / been + V-ing.<br><b>Yasak ve Sınırlamalar:</b> Şu ana kadar anlamı taşıyan until now past simple veya past perfect ile kullanılamaz.<br><b>Kritik Detay:</b> Geçmişten bugüne gelen süreci en iyi Present Perfect temsil eder."
            },
            {
              id: "c105_l3_ex3_q13",
              type: "multiple-choice",
              prompt: "<code>[Subject + V_? (since childhood gibi süreç belirten ifadeler)]</code> denkleminde eylemin anlık/süreklilik durumunu tam karşılayamadığı için elenen tenseler hangileridir?",
              options: [
                "am-is-are Ving, was/were Ving ve will be Ving",
                "have/has V3, had V3 ve will have V3",
                "have/has been Ving, had been Ving ve will have been Ving",
                "Present Simple (V1) ve Past Simple (V2)"
              ],
              correctIndex: 0,
              explanation: "<b>Temel Formül:</b> [since childhood (süreç)] ➔ Perfect Tenses.<br><b>Yasak ve Sınırlamalar:</b> Tense sorularında since childhood gibi süreç bildiren zaman ifadeleri yer alıyorsa, eylemin anlık/süreklilik durumunu tam karşılayamadığı için am-is-are Ving, was/were Ving ve will be Ving yapıları elenir.<br><b>Kritik Detay:</b> Çocukluğundan beri devam eden bir süreci anlattığından perfect yapılara yönelinmelidir."
            }
          ]
        }
      ]
    }
  ]
};

// ============================================================
// BÖLÜM 104: Yarı-Modallar ve Modal Benzeri Yapılar (Semi-Modals)
// ============================================================
const chapter104Data = {
  chapterId: 104,
  chapterName: "Yarı-Modallar ve Modal Benzeri Yapılar",
  chapterDescription: "be able to, have to, had better, used to, get used to -ing gibi yetenek, zorunluluk, tavsiye ve alışkanlık bildiren yapılar.",
  lessons: [
    {
      id: "c104_l1",
      unitId: 104,
      title: "1. Yetenek ve Zorunluluk (Ability & Necessity)",
      subtitle: "be able to, have to, had to, needn't",
      konuAnlatimi: {
        baslik: "Yetenek ve Zorunluluk Yapıları (be able to, have to, had to, needn't)",
        teorikMantik: "Yetenek ve zorunluluk bildiren yapılar, cümlenin zamanına (past, present, future) göre şekillenir. be able to yetenek, have to zorunluluk bildirirken, needn't ve don't have to/need to gereklilik olmadığını ifade eder.",
        formul: "S + (be able to / have to / had to / needn't / don't have to) + V1",
        altinKural: "needn't modal gibi davranarak arkasından doğrudan yalın fiil (V1) alırken, don't need to fiil olarak 'to' gerektirir. didn't need to geçmişte gerek olmayan ama yapılıp yapılmadığı belirsiz durumları, didn't have to ise gerek olmadığı için yapılmayan durumları anlatır."
      },
      exercises: [
        {
          id: "c104_l1_ex1",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 1: Öbek Düzeyi (Yetenek ve Zorunluluk)",
          description: "Yarı-modalların yetenek ve zorunluluk biçimlerinin (be able to, have to, needn't, had to) öbek düzeyinde Türkçe karşılıklarıyla tespiti.",
          questions: [
            {
              id: "c104_l1_ex1_q1",
              type: "matching",
              prompt: "İfadeleri Türkçe karşılıklarıyla eşleştirin.",
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              pairs: [
                { left: "have to examine the legal documents", right: "yasal belgeleri incelemek zorundadır" },
                { left: "was able to reform the monetary system", right: "parasal sistemi reforme etmeyi başardı" },
                { left: "needn't explain the symbolic meaning", right: "sembolik anlamı açıklamasına gerek yoktur" },
                { left: "had to preserve the historical archives", right: "tarihi arşivleri korumak zorunda kaldı" }
              ]
            },
            {
              id: "c104_l1_ex1_q2",
              type: "multiple-choice",
              prompt: "\"Scholars of sociology have to examine the legal documents before the government changes the policy.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Hükümet politikayı değiştirmeden önce sosyoloji akademisyenleri yasal belgeleri incelemek zorundadır.",
                "Hükümet politikayı değiştirdiğinde sosyoloji akademisyenleri yasal belgeleri inceleyebilirdi.",
                "Hükümet politikayı değiştirmese bile sosyoloji akademisyenleri yasal belgeleri incelemek zorunda değildir.",
                "Sosyoloji akademisyenleri yasal belgeleri incelediğinde hükümet politikayı zaten değiştirmişti."
              ],
              correctIndex: 0,
              enSentence: "Scholars of sociology have to examine the legal documents before the government changes the policy.",
              isEngToTr: true
            },
            {
              id: "c104_l1_ex1_q3",
              type: "multiple-choice",
              prompt: "\"The committee was able to reform the monetary system despite the intense criticism from citizens.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Yetenek", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Komite, vatandaşların yoğun eleştirilerine rağmen parasal sistemi reforme etmeyi başardı.",
                "Komite, vatandaşların yoğun eleştirilerinden dolayı parasal sistemi reforme etmek zorunda kaldı.",
                "Vatandaşların yoğun eleştirileri, komitenin parasal sistemi reforme etmesini engelledi.",
                "Komite parasal sistemi reforme edebildi çünkü vatandaşlardan hiçbir eleştiri gelmedi."
              ],
              correctIndex: 0,
              enSentence: "The committee was able to reform the monetary system despite the intense criticism from citizens.",
              isEngToTr: true
            },
            {
              id: "c104_l1_ex1_q4",
              type: "multiple-choice",
              prompt: "\"Film critics needn't explain the symbolic meaning of the ancient ruins in the documentary.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Gereklilik", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Film eleştirmenlerinin belgeseldeki antik kalıntıların sembolik anlamını açıklamasına gerek yoktur.",
                "Film eleştirmenleri belgeseldeki antik kalıntıların sembolik anlamını açıklamak zorundadır.",
                "Belgeseldeki antik kalıntıların sembolik anlamı film eleştirmenleri tarafından açıklanamaz.",
                "Film eleştirmenleri antik kalıntıların sembolik anlamını belgeselde açıklamayabilirler."
              ],
              correctIndex: 0,
              enSentence: "Film critics needn't explain the symbolic meaning of the ancient ruins in the documentary.",
              isEngToTr: true
            },
            {
              id: "c104_l1_ex1_q5",
              type: "multiple-choice",
              prompt: "\"During the war, the parliament had to preserve all historical archives of the nation in a safe location.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Savaş sırasında parlamento, ulusun tüm tarihi arşivlerini güvenli bir yerde korumak zorunda kaldı.",
                "Savaş sırasında parlamentonun ulusun tarihi arşivlerini korumasına gerek kalmadı.",
                "Parlamento savaş sırasında ulusun tarihi arşivlerini güvenli bir yerde korumayı başardı.",
                "Savaş bittiğinde parlamento ulusun tarihi arşivlerini korumak zorunda kalacaktı."
              ],
              correctIndex: 0,
              enSentence: "During the war, the parliament had to preserve all historical archives of the nation in a safe location.",
              isEngToTr: true
            },
            {
              id: "c104_l1_ex1_q6",
              type: "multiple-choice",
              prompt: "\"Researchers are able to analyze the demographic survey when the institute publishes the official results.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Yetenek", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Enstitü resmi sonuçları yayınladığında, araştırmacılar demografik anketi analiz edebilirler.",
                "Araştırmacılar demografik anketi analiz etmek zorundadır çünkü enstitü resmi sonuçları yayınlayacaktır.",
                "Enstitü resmi sonuçları yayınlamadan önce araştırmacılar demografik anketi analiz edemezler.",
                "Araştırmacılar demografik anketi analiz etmeyi başardılar çünkü enstitü resmi sonuçları yayınladı."
              ],
              correctIndex: 0,
              enSentence: "Researchers are able to analyze the demographic survey when the institute publishes the official results.",
              isEngToTr: true
            },
            {
              id: "c104_l1_ex1_q7",
              type: "multiple-choice",
              prompt: "\"The clinic doesn't have to evaluate the cognitive behavior of the patients unless the court requests a report.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Mahkeme bir rapor talep etmedikçe klinik, hastaların bilişsel davranışlarını değerlendirmek zorunda değildir.",
                "Klinik hastaların bilişsel davranışlarını değerlendirmek zorundadır çünkü mahkeme bir rapor talep etmiştir.",
                "Mahkeme bir rapor talep etse bile klinik hastaların bilişsel davranışlarını değerlendiremeyebilir.",
                "Klinik hastaların bilişsel davranışlarını değerlendirebildi çünkü mahkeme bir rapor talep etmedi."
              ],
              correctIndex: 0,
              enSentence: "The clinic doesn't have to evaluate the cognitive behavior of the patients unless the court requests a report.",
              isEngToTr: true
            },
            {
              id: "c104_l1_ex1_q8",
              type: "multiple-choice",
              prompt: "\"Scholars had to modify their research methodology after they discovered the new historical evidence.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Yeni tarihi kanıtları keşfettikten sonra akademisyenler araştırma metodolojilerini değiştirmek zorunda kaldılar.",
                "Akademisyenler yeni tarihi kanıtları keşfettiklerinde araştırma metodolojilerini değiştirebilirlerdi.",
                "Yeni tarihi kanıtların keşfi, akademisyenlerin araştırma metodolojilerini değiştirmelerini gerektirmedi.",
                "Akademisyenler araştırma metodolojilerini değiştirmek zorunda kaldılar çünkü hiçbir tarihi kanıt keşfedemediler."
              ],
              correctIndex: 0,
              enSentence: "Scholars had to modify their research methodology after they discovered the new historical evidence.",
              isEngToTr: true
            },
            {
              id: "c104_l1_ex1_q9",
              type: "translation-text",
              prompt: "“Under the new guidelines, therapists don't need to obtain written permission from the children's parents.” cümlesini Türkçe'ye çevirin:",
              correctSentence: "Yeni yönergeler uyarınca, terapistlerin çocukların ebeveynlerinden yazılı izin almasına gerek yoktur.",
              enSentence: "Under the new guidelines, therapists don't need to obtain written permission from the children's parents.",
              isEngToTr: true,
              grammarTags: ["Yarı-Modallar", "Gereklilik", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l1_ex1_q10",
              type: "translation-text",
              prompt: "“Members of parliament don't have to approve the government's budget proposal unless they reach a consensus.” cümlesini Türkçe'ye çevirin:",
              correctSentence: "Parlamento üyeleri, bir uzlaşıya varmadıkça hükümetin bütçe teklifini onaylamak zorunda değildir.",
              enSentence: "Members of parliament don't have to approve the government's budget proposal unless they reach a consensus.",
              isEngToTr: true,
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            }
          ]
        },
        {
          id: "c104_l1_ex2",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 2: Cümle Düzeyi (Boşluk Doldurma)",
          description: "Yetenek ve zorunluluk yapılarını doğru dilbilgisi kurallarına göre boşluklara yerleştirin.",
          questions: [
            {
              id: "c104_l1_ex2_q1",
              type: "fill-blank-dropdown",
              prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
              sentence: "Scholars of sociology ___ to examine the legal documents before the government changes the policy.",
              options: ["have", "has", "must", "should"],
              correctIndex: 0,
              translation: "Hükümet politikayı değiştirmeden önce sosyoloji akademisyenleri yasal belgeleri incelemek zorundadır.",
              explanation: "Çoğul özne (Scholars) ile present zorunluluk bildiren 'have to' yapısı kullanılır.",
              hint: { formula: "Plural Subject + have to + V1" },
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l1_ex2_q2",
              type: "fill-blank",
              prompt: "Boşluğu doldur",
              sentence: "The committee was ___ to reform the monetary system despite the intense criticism from citizens.",
              options: ["able", "capable", "must", "have"],
              correctIndex: 0,
              translation: "Komite, vatandaşların yoğun eleştirilerine rağmen parasal sistemi reforme etmeyi başardı.",
              explanation: "Geçmişte bir eylemi başarma/yapabilme anlamı 'was able to' ile verilir.",
              hint: { formula: "was/were able to + V1" },
              grammarTags: ["Yarı-Modallar", "Yetenek", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l1_ex2_q3",
              type: "fill-blank-dropdown",
              prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
              sentence: "Film critics ___ explain the symbolic meaning of the ancient ruins in the documentary.",
              options: ["needn't", "don't need", "mustn't", "haven't"],
              correctIndex: 0,
              translation: "Film eleştirmenlerinin belgeseldeki antik kalıntıların sembolik anlamını açıklamasına gerek yoktur.",
              explanation: "Gereksizlik/muafiyet bildiren ve kendisinden sonra doğrudan yalın fiil (explain) alan yarı-modal 'needn't' yapısıdır.",
              hint: { formula: "needn't + V1" },
              grammarTags: ["Yarı-Modallar", "Gereklilik", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l1_ex2_q4",
              type: "fill-blank",
              prompt: "Boşluğu doldur",
              sentence: "Under the new guidelines, therapists don't ___ to obtain written permission from the children's parents.",
              options: ["need", "must", "should", "ought"],
              correctIndex: 0,
              translation: "Yeni yönergeler uyarınca, terapistlerin çocukların ebeveynlerinden yazılı izin almasına gerek yoktur.",
              explanation: "'don't need to' yapısı gereksizlik bildirir ve 'to' ile kullanılır.",
              hint: { formula: "don't/doesn't need to + V1" },
              grammarTags: ["Yarı-Modallar", "Gereklilik", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l1_ex2_q5",
              type: "fill-blank-dropdown",
              prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
              sentence: "During the war, the parliament ___ to preserve all historical archives of the nation in a safe location.",
              options: ["had", "must", "should", "ought"],
              correctIndex: 0,
              translation: "Savaş sırasında parlamento, ulusun tüm tarihi arşivlerini güvenli bir yerde korumak zorunda kaldı.",
              explanation: "Geçmişte yapılmış zorunluluklar 'had to' ile ifade edilir.",
              hint: { formula: "had to + V1" },
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l1_ex2_q6",
              type: "fill-blank",
              prompt: "Boşluğu doldur",
              sentence: "Researchers ___ able to analyze the demographic survey when the institute publishes the official results.",
              options: ["are", "is", "was", "will"],
              correctIndex: 0,
              translation: "Enstitü resmi sonuçları yayınladığında, araştırmacılar demografik anketi analiz edebilirler.",
              explanation: "Çoğul özne (Researchers) ile present yetenek/olasılık bildiren 'are able to' yapısı uyuşur.",
              hint: { formula: "are able to + V1" },
              grammarTags: ["Yarı-Modallar", "Yetenek", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l1_ex2_q7",
              type: "fill-blank-dropdown",
              prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
              sentence: "The clinic doesn't ___ to evaluate the cognitive behavior of the patients unless the court requests a report.",
              options: ["have", "must", "should", "ought"],
              correctIndex: 0,
              translation: "Mahkeme bir rapor talep etmedikçe klinik, hastaların bilişsel davranışlarını değerlendirmek zorunda değildir.",
              explanation: "Zorunluluk olmama durumunu bildirmek için 'doesn't have to' kullanılır.",
              hint: { formula: "doesn't/don't have to + V1" },
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l1_ex2_q8",
              type: "fill-blank",
              prompt: "Boşluğu doldur",
              sentence: "Scholars had ___ modify their research methodology after they discovered the new historical evidence.",
              options: ["to", "for", "with", "of"],
              correctIndex: 0,
              translation: "Yeni tarihi kanıtları keşfettikten sonra akademisyenler araştırma metodolojilerini değiştirmek zorunda kaldılar.",
              explanation: "'had to' yapısı fiilden önce 'to' edatını gerektirir.",
              hint: { formula: "had to + V1" },
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l1_ex2_q9",
              type: "fill-blank-dropdown",
              prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
              sentence: "The director ___ alter the main character's actions because the audience understands the emotional conflict.",
              options: ["needn't", "doesn't need", "mustn't", "haven't"],
              correctIndex: 0,
              translation: "Yönetmenin ana karakterin eylemlerini değiştirmesine gerek yoktur çünkü izleyici duygusal çatışmayı anlamaktadır.",
              explanation: "'needn't' yarı-modalı kendisinden sonra yalın fiil alır (alter) ve 'to' almaz.",
              hint: { formula: "needn't + V1" },
              grammarTags: ["Yarı-Modallar", "Gereklilik", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l1_ex2_q10",
              type: "fill-blank",
              prompt: "Boşluğu doldur",
              sentence: "Members of parliament don't have ___ approve the government's budget proposal unless they reach a consensus.",
              options: ["to", "for", "of", "with"],
              correctIndex: 0,
              translation: "Parlamento üyeleri, bir uzlaşıya varmadıkça hükümetin bütçe teklifini onaylamak zorunda değildir.",
              explanation: "'don't have to' yapısı zorunluluk olmama durumu bildirir ve 'to' gerektirir.",
              hint: { formula: "don't have to + V1" },
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            }
          ]
        },
        {
          id: "c104_l1_ex3",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 3: Akademik Sentez (Word Bank)",
          description: "Karışık Türkçe öbekleri doğru sıraya dizerek İngilizce cümlelerin karşılıklarını oluşturun.",
          questions: [
            {
              id: "c104_l1_ex3_q1",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Scholars of sociology have to examine the legal documents before the government changes the policy.",
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Sosyoloji akademisyenleri,", "hükümet politikayı değiştirmeden önce", "yasal belgeleri", "incelemek zorundadır.", "inceleyebilirler.", "eski yasaları"],
              correctOrder: ["Sosyoloji akademisyenleri,", "hükümet politikayı değiştirmeden önce", "yasal belgeleri", "incelemek zorundadır."]
            },
            {
              id: "c104_l1_ex3_q2",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "The committee was able to reform the monetary system despite the intense criticism from citizens.",
              grammarTags: ["Yarı-Modallar", "Yetenek", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Komite,", "vatandaşların yoğun eleştirilerine rağmen", "parasal sistemi", "reforme etmeyi başardı.", "değiştirmek zorunda kaldı.", "vergi sistemini"],
              correctOrder: ["Komite,", "vatandaşların yoğun eleştirilerine rağmen", "parasal sistemi", "reforme etmeyi başardı."]
            },
            {
              id: "c104_l1_ex3_q3",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Film critics needn't explain the symbolic meaning of the ancient ruins in the documentary.",
              grammarTags: ["Yarı-Modallar", "Gereklilik", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Film eleştirmenlerinin", "belgeseldeki antik kalıntıların", "sembolik anlamını", "açıklamasına gerek yoktur.", "açıklaması gerekir.", "tarihsel olayları"],
              correctOrder: ["Film eleştirmenlerinin", "belgeseldeki antik kalıntıların", "sembolik anlamını", "açıklamasına gerek yoktur."]
            },
            {
              id: "c104_l1_ex3_q4",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Under the new guidelines, therapists don't need to obtain written permission from the children's parents.",
              grammarTags: ["Yarı-Modallar", "Gereklilik", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Yeni yönergeler uyarınca,", "terapistlerin", "çocukların ebeveynlerinden", "yazılı izin almasına gerek yoktur.", "izin alması zorunludur.", "tavsiye almalıdır."],
              correctOrder: ["Yeni yönergeler uyarınca,", "terapistlerin", "çocukların ebeveynlerinden", "yazılı izin almasına gerek yoktur."]
            },
            {
              id: "c104_l1_ex3_q5",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "During the war, the parliament had to preserve all historical archives of the nation in a safe location.",
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Savaş sırasında parlamento,", "ulusun tüm tarihi arşivlerini", "güvenli bir yerde", "korumak zorunda kaldı.", "korumayı başardı.", "yok etmek istedi."],
              correctOrder: ["Savaş sırasında parlamento,", "ulusun tüm tarihi arşivlerini", "güvenli bir yerde", "korumak zorunda kaldı."]
            },
            {
              id: "c104_l1_ex3_q6",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Researchers are able to analyze the demographic survey when the institute publishes the official results.",
              grammarTags: ["Yarı-Modallar", "Yetenek", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Enstitü resmi sonuçları yayınladığında,", "araştırmacılar", "demografik anketi", "analiz edebilirler.", "analiz etmek zorundadırlar.", "hazırlayacaklar."],
              correctOrder: ["Enstitü resmi sonuçları yayınladığında,", "araştırmacılar", "demografik anketi", "analiz edebilirler."]
            },
            {
              id: "c104_l1_ex3_q7",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "The clinic doesn't have to evaluate the cognitive behavior of the patients unless the court requests a report.",
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Mahkeme bir rapor talep etmedikçe", "klinik,", "hastaların bilişsel davranışlarını", "değerlendirmek zorunda değildir.", "değerlendirebilir.", "tedavi etmelidir."],
              correctOrder: ["Mahkeme bir rapor talep etmedikçe", "klinik,", "hastaların bilişsel davranışlarını", "değerlendirmek zorunda değildir."]
            },
            {
              id: "c104_l1_ex3_q8",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Scholars had to modify their research methodology after they discovered the new historical evidence.",
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Yeni tarihi kanıtları keşfettikten sonra", "akademisyenler", "araştırma metodolojilerini", "değiştirmek zorunda kaldılar.", "değiştirmeyi başardılar.", "yayınladılar."],
              correctOrder: ["Yeni tarihi kanıtları keşfettikten sonra", "akademisyenler", "araştırma metodolojilerini", "değiştirmek zorunda kaldılar."]
            },
            {
              id: "c104_l1_ex3_q9",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "The director needn't alter the main character's actions because the audience understands the emotional conflict.",
              grammarTags: ["Yarı-Modallar", "Gereklilik", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Yönetmenin", "ana karakterin eylemlerini", "değiştirmesine gerek yoktur", "çünkü izleyici duygusal çatışmayı anlamaktadır.", "çünkü film çok popülerdir.", "değiştirmek zorundadır"],
              correctOrder: ["Yönetmenin", "ana karakterin eylemlerini", "değiştirmesine gerek yoktur", "çünkü izleyici duygusal çatışmayı anlamaktadır."]
            },
            {
              id: "c104_l1_ex3_q10",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Members of parliament don't have to approve the government's budget proposal unless they reach a consensus.",
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Parlamento üyeleri,", "bir uzlaşıya varmadıkça", "hükümetin bütçe teklifini", "onaylamak zorunda değildir.", "onaylayabilirler.", "reddetmek zorundadır."],
              correctOrder: ["Parlamento üyeleri,", "bir uzlaşıya varmadıkça", "hükümetin bütçe teklifini", "onaylamak zorunda değildir."]
            }
          ]
        }
      ]
    },
    {
      id: "c104_l2",
      unitId: 104,
      title: "2. Tavsiye ve Alışkanlıklar (Advice & Habits)",
      subtitle: "had better, ought to, used to, be/get used to",
      konuAnlatimi: {
        baslik: "Tavsiye ve Alışkanlık Yapıları (had better, ought to, used to, be/get used to)",
        teorikMantik: "ought to güçlü öneri, had better ise olumsuz sonuç ihtimali taşıyan acil/güçlü önerilerde kullanılır. used to geçmişteki alışkanlıkları (V1), be used to (alışkın olmak) ve get used to (alışmak) ise alışkanlık durumlarını (-ing veya isim) belirtir.",
        formul: "S + ought to + V1 | S + had better + V1 | S + used to + V1 | S + be/get used to + V-ing",
        altinKural: "had better olumsuz yapılırken 'had better not' şeklinde kullanılır; had NOT better hatalıdır. be used to ve get used to yapılarından sonra gelen fiil mutlaka '-ing' takısı almalıdır, fiilin yalın hali (V1) kullanılamaz."
      },
      exercises: [
        {
          id: "c104_l2_ex1",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 1: Öbek Düzeyi (Tavsiye ve Alışkanlık)",
          description: "Kibar tavsiye, geçmiş alışkanlıklar ve alışkınlık yapılarının (had better, ought to, used to, be used to) tespiti.",
          questions: [
            {
              id: "c104_l2_ex1_q1",
              type: "matching",
              prompt: "İfadeleri Türkçe karşılıklarıyla eşleştirin.",
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              pairs: [
                { left: "had better implement the constitutional reform", right: "anayasal reformu uygulasa iyi olur" },
                { left: "ought to analyze the behavior of individuals", right: "bireylerin davranışlarını analiz etmelidir" },
                { left: "used to shoot films in the parliament", right: "parlamentoda filmler çekerdi" },
                { left: "are used to evaluating the emotional development", right: "duygusal gelişimi değerlendirmeye alışıktır" }
              ]
            },
            {
              id: "c104_l2_ex1_q2",
              type: "multiple-choice",
              prompt: "\"The government had better implement the constitutional reform before the economic crisis deepens.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Ekonomik kriz derinleşmeden önce hükümet anayasal reformu uygulasa iyi olur.",
                "Ekonomik kriz derinleştikten sonra hükümet anayasal reformu uygulamak zorunda kaldı.",
                "Hükümet anayasal reformu uygulamalıdır çünkü ekonomik kriz derinleşmektedir.",
                "Hükümet anayasal reformu uygulayabildi çünkü ekonomik kriz derinleşmedi."
              ],
              correctIndex: 0,
              enSentence: "The government had better implement the constitutional reform before the economic crisis deepens.",
              isEngToTr: true
            },
            {
              id: "c104_l2_ex1_q3",
              type: "multiple-choice",
              prompt: "\"History scholars ought to analyze the behavior of individuals under extreme social pressure.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Tarih akademisyenleri, aşırı toplumsal baskı altındaki bireylerin davranışlarını analiz etmelidir.",
                "Tarih akademisyenleri, aşırı toplumsal baskı altında bireylerin davranışlarını analiz etmek zorunda kaldı.",
                "Bireylerin aşırı toplumsal baskı altındaki davranışları tarih akademisyenleri tarafından analiz edilmez.",
                "Tarih akademisyenleri, bireylerin toplumsal davranışlarını analiz etmeye alışıktır."
              ],
              correctIndex: 0,
              enSentence: "History scholars ought to analyze the behavior of individuals under extreme social pressure.",
              isEngToTr: true
            },
            {
              id: "c104_l2_ex1_q4",
              type: "multiple-choice",
              prompt: "\"In the past, the famous director used to shoot his films in the ancient parliament building.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Geçmişte, ünlü yönetmen filmlerini antik parlamento binasında çekerdi.",
                "Geçmişte, ünlü yönetmen filmlerini antik parlamento binasında çekmek zorundaydı.",
                "Ünlü yönetmen filmlerini antik parlamento binasında çekmeye alışıktır.",
                "Geçmişte, ünlü yönetmen filmlerini antik parlamento binasında çekmek istedi."
              ],
              correctIndex: 0,
              enSentence: "In the past, the famous director used to shoot his films in the ancient parliament building.",
              isEngToTr: true
            },
            {
              id: "c104_l2_ex1_q5",
              type: "multiple-choice",
              prompt: "\"Clinical therapists are used to evaluating the emotional development of children during the session.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Klinik terapistleri, seans sırasında çocukların duygusal gelişimini değerlendirmeye alışıktır.",
                "Klinik terapistleri seans sırasında çocukların duygusal gelişimini değerlendirmek zorundadır.",
                "Çocukların duygusal gelişimi seans sırasında klinik terapistleri tarafından değerlendirilmelidir.",
                "Klinik terapistleri seans sırasında çocukların duygusal gelişimini değerlendirmeye alışmalıdır."
              ],
              correctIndex: 0,
              enSentence: "Clinical therapists are used to evaluating the emotional development of children during the session.",
              isEngToTr: true
            },
            {
              id: "c104_l2_ex1_q6",
              type: "multiple-choice",
              prompt: "\"Sociological researchers had better not publish the survey results without checking the statistical variables.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Sosyolojik araştırmacılar, istatistiksel değişkenleri kontrol etmeden anket sonuçlarını yayınlamasalar iyi olur.",
                "Sosyolojik araştırmacılar, istatistiksel değişkenleri kontrol etmeden anket sonuçlarını yayınlayamazlar.",
                "Anket sonuçlarını yayınlamak için sosyolojik araştırmacılar istatistiksel değişkenleri kontrol etmelidir.",
                "Sosyolojik araştırmacılar anket sonuçlarını yayınlamamak zorundadır çünkü değişkenleri kontrol etmediler."
              ],
              correctIndex: 0,
              enSentence: "Sociological researchers had better not publish the survey results without checking the statistical variables.",
              isEngToTr: true
            },
            {
              id: "c104_l2_ex1_q7",
              type: "multiple-choice",
              prompt: "\"We ought to preserve the historical documents that describe the legal rights of citizens.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Vatandaşların yasal haklarını tanımlayan tarihi belgeleri korumalıyız.",
                "Vatandaşların yasal haklarını tanımlamak için tarihi belgeleri korumak zorundayız.",
                "Tarihi belgeleri koruyabiliriz çünkü vatandaşların yasal haklarını tanımlarlar.",
                "Vatandaşların yasal hakları tarihi belgelerde tanımlandığı için onları korumalıyız."
              ],
              correctIndex: 0,
              enSentence: "We ought to preserve the historical documents that describe the legal rights of citizens.",
              isEngToTr: true
            },
            {
              id: "c104_l2_ex1_q8",
              type: "multiple-choice",
              prompt: "\"Film critics didn't use to write detailed reviews before the cinema industry became popular.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Sinema endüstrisi popüler hale gelmeden önce film eleştirmenleri detaylı incelemeler yazmazlardı.",
                "Sinema endüstrisi popüler olduğundan beri film eleştirmenleri detaylı incelemeler yazmaktadırlar.",
                "Film eleştirmenleri detaylı incelemeler yazmak zorundaydı çünkü sinema endüstrisi popüler oldu.",
                "Sinema endüstrisi popüler hale gelmeden önce film eleştirmenleri detaylı incelemeler yazamadı."
              ],
              correctIndex: 0,
              enSentence: "Film critics didn't use to write detailed reviews before the cinema industry became popular.",
              isEngToTr: true
            },
            {
              id: "c104_l2_ex1_q9",
              type: "translation-text",
              prompt: "“Under the new monetary system, citizens are gradually getting used to paying higher taxes.” cümlesini Türkçe'ye çevirin:",
              correctSentence: "Yeni parasal sistem altında, vatandaşlar yavaş yavaş daha yüksek vergiler ödemeye alışıyorlar.",
              enSentence: "Under the new monetary system, citizens are gradually getting used to paying higher taxes.",
              isEngToTr: true,
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l2_ex1_q10",
              type: "translation-text",
              prompt: "“Psychologists had better investigate the cognitive processes of children who suffer from trauma.” cümlesini Türkçe'ye çevirin:",
              correctSentence: "Psikologlar, travma yaşayan çocukların bilişsel süreçlerini araştırsalar iyi olur.",
              enSentence: "Psychologists had better investigate the cognitive processes of children who suffer from trauma.",
              isEngToTr: true,
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            }
          ]
        },
        {
          id: "c104_l2_ex2",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 2: Cümle Düzeyi (Boşluk Doldurma)",
          description: "Tavsiye ve alışkanlık kalıplarını uygun çekimleriyle cümlelerdeki boşluklara yerleştirin.",
          questions: [
            {
              id: "c104_l2_ex2_q1",
              type: "fill-blank-dropdown",
              prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
              sentence: "The government had ___ implement the constitutional reform before the economic crisis deepens.",
              options: ["better", "rather", "to", "should"],
              correctIndex: 0,
              translation: "Ekonomik kriz derinleşmeden önce hükümet anayasal reformu uygulasa iyi olur.",
              explanation: "Güçlü/acil tavsiye bildiren kalıp 'had better' şeklindedir.",
              hint: { formula: "had better + V1" },
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l2_ex2_q2",
              type: "fill-blank",
              prompt: "Boşluğu doldur",
              sentence: "History scholars ought ___ analyze the behavior of individuals under extreme social pressure.",
              options: ["to", "not", "should", "must"],
              correctIndex: 0,
              translation: "Tarih akademisyenleri, aşırı toplumsal baskı altındaki bireylerin davranışlarını analiz etmelidir.",
              explanation: "'ought' yapısı tavsiye/gereklilik bildirirken daima 'to' ile devam eder.",
              hint: { formula: "ought + to + V1" },
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l2_ex2_q3",
              type: "fill-blank-dropdown",
              prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
              sentence: "In the past, the famous director ___ to shoot his films in the ancient parliament building.",
              options: ["used", "was used", "got used", "uses"],
              correctIndex: 0,
              translation: "Geçmişte, ünlü yönetmen filmlerini antik parlamento binasında çekerdi.",
              explanation: "Geçmişteki alışkanlıklar 'used to' yapısı ile anlatılır.",
              hint: { formula: "used to + V1" },
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l2_ex2_q4",
              type: "fill-blank",
              prompt: "Boşluğu doldur",
              sentence: "Clinical therapists are used to ___ the emotional development of children during the session.",
              options: ["evaluating", "evaluate", "evaluated", "be evaluating"],
              correctIndex: 0,
              translation: "Klinik terapistleri, seans sırasında çocukların duygusal gelişimini değerlendirmeye alışıktır.",
              explanation: "'be used to' (alışkın olmak) kalıbından sonra fiil -ing (gerund) takısı alır.",
              hint: { formula: "be used to + V-ing" },
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l2_ex2_q5",
              type: "fill-blank-dropdown",
              prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
              sentence: "Sociological researchers had better ___ publish the survey results without checking the statistical variables.",
              options: ["not", "no", "never", "don't"],
              correctIndex: 0,
              translation: "Sosyolojik araştırmacılar, istatistiksel değişkenleri kontrol etmeden anket sonuçlarını yayınlamasalar iyi olur.",
              explanation: "'had better' yapısının olumsuzu 'had better not' olarak kurulur.",
              hint: { formula: "had better not + V1" },
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l2_ex2_q6",
              type: "fill-blank",
              prompt: "Boşluğu doldur",
              sentence: "We ___ to preserve the historical documents that describe the legal rights of citizens.",
              options: ["ought", "should", "must", "had better"],
              correctIndex: 0,
              translation: "Vatandaşların yasal haklarını tanımlayan tarihi belgeleri korumalıyız.",
              explanation: "'to' ile kullanılan ve gereklilik bildiren modal 'ought' yapısıdır.",
              hint: { formula: "ought to + V1" },
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l2_ex2_q7",
              type: "fill-blank-dropdown",
              prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
              sentence: "Film critics didn't ___ to write detailed reviews before the cinema industry became popular.",
              options: ["use", "used", "using", "be used"],
              correctIndex: 0,
              translation: "Sinema endüstrisi popüler hale gelmeden önce film eleştirmenleri detaylı incelemeler yazmazlardı.",
              explanation: "Olumsuzlayıcı 'didn't' sonrasında 'used to' kalıbı yalın 'use to' haline gelir.",
              hint: { formula: "didn't use to + V1" },
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l2_ex2_q8",
              type: "fill-blank",
              prompt: "Boşluğu doldur",
              sentence: "Under the new monetary system, citizens are gradually getting used to ___ higher taxes.",
              options: ["paying", "pay", "paid", "be paying"],
              correctIndex: 0,
              translation: "Yeni parasal sistem altında, vatandaşlar yavaş yavaş daha yüksek vergiler ödemeye alışıyorlar.",
              explanation: "'get used to' (alışmak) yapısından sonra fiil -ing (gerund) takısı alır.",
              hint: { formula: "get used to + V-ing" },
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l2_ex2_q9",
              type: "fill-blank-dropdown",
              prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
              sentence: "Psychologists had ___ investigate the cognitive processes of children who suffer from trauma.",
              options: ["better", "rather", "to", "should"],
              correctIndex: 0,
              translation: "Psikologlar, travma yaşayan çocukların bilişsel süreçlerini araştırsalar iyi olur.",
              explanation: "'had better' acil/güçlü tavsiye bildirir ve arkasından yalın fiil alır.",
              hint: { formula: "had better + V1" },
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l2_ex2_q10",
              type: "fill-blank",
              prompt: "Boşluğu doldur",
              sentence: "Legal experts ought not ___ ignore the constitutional changes that the government is proposing.",
              options: ["to", "for", "of", "with"],
              correctIndex: 0,
              translation: "Hukuk uzmanları, hükümetin önerdiği anayasal değişiklikleri göz ardı etmemelidir.",
              explanation: "'ought to' olumsuz biçiminde 'ought not to' şeklinde kurulur.",
              hint: { formula: "ought not to + V1" },
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            }
          ]
        },
        {
          id: "c104_l2_ex3",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 3: Akademik Sentez (Word Bank)",
          description: "Karışık kelime öbeklerini sıralayarak tavsiye ve alışkanlık cümlelerini Türkçe karşılıklarıyla kurun.",
          questions: [
            {
              id: "c104_l2_ex3_q1",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "The government had better implement the constitutional reform before the economic crisis deepens.",
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Ekonomik kriz derinleşmeden önce", "hükümet", "anayasal reformu", "uygulasa iyi olur.", "uygulamak zorunda kaldı.", "yok saymalıdır."],
              correctOrder: ["Ekonomik kriz derinleşmeden önce", "hükümet", "anayasal reformu", "uygulasa iyi olur."]
            },
            {
              id: "c104_l2_ex3_q2",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "History scholars ought to analyze the behavior of individuals under extreme social pressure.",
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Tarih akademisyenleri,", "aşırı toplumsal baskı altındaki", "bireylerin davranışlarını", "analiz etmelidir.", "analiz etmek zorundadır.", "incelememelidir."],
              correctOrder: ["Tarih akademisyenleri,", "aşırı toplumsal baskı altındaki", "bireylerin davranışlarını", "analiz etmelidir."]
            },
            {
              id: "c104_l2_ex3_q3",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "In the past, the famous director used to shoot his films in the ancient parliament building.",
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Geçmişte,", "ünlü yönetmen", "filmlerini", "antik parlamento binasında", "çekerdi.", "çekmek zorundaydı.", "sergilerdi."],
              correctOrder: ["Geçmişte,", "ünlü yönetmen", "filmlerini", "antik parlamento binasında", "çekerdi."]
            },
            {
              id: "c104_l2_ex3_q4",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Clinical therapists are used to evaluating the emotional development of children during the session.",
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Klinik terapistleri,", "seans sırasında", "çocukların duygusal gelişimini", "değerlendirmeye alışıktır.", "değerlendirmek zorundadır.", "engellemektedir."],
              correctOrder: ["Klinik terapistleri,", "seans sırasında", "çocukların duygusal gelişimini", "değerlendirmeye alışıktır."]
            },
            {
              id: "c104_l2_ex3_q5",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Sociological researchers had better not publish the survey results without checking the statistical variables.",
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Sosyolojik araştırmacılar,", "istatistiksel değişkenleri kontrol etmeden", "anket sonuçlarını", "yayınlamasalar iyi olur.", "yayınlamak zorundadırlar.", "değiştirmelidirler."],
              correctOrder: ["Sosyolojik araştırmacılar,", "istatistiksel değişkenleri kontrol etmeden", "anket sonuçlarını", "yayınlamasalar iyi olur."]
            },
            {
              id: "c104_l2_ex3_q6",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "We ought to preserve the historical documents that describe the legal rights of citizens.",
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Vatandaşların yasal haklarını tanımlayan", "tarihi belgeleri", "korumalıyız.", "korumak zorundayız.", "paylaşmalıyız.", "yok etmeliyiz."],
              correctOrder: ["Vatandaşların yasal haklarını tanımlayan", "tarihi belgeleri", "korumalıyız."]
            },
            {
              id: "c104_l2_ex3_q7",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Film critics didn't use to write detailed reviews before the cinema industry became popular.",
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Sinema endüstrisi popüler hale gelmeden önce", "film eleştirmenleri", "detaylı incelemeler", "yazmazlardı.", "yazmak zorundaydılar.", "yayınlarlardı."],
              correctOrder: ["Sinema endüstrisi popüler hale gelmeden önce", "film eleştirmenleri", "detaylı incelemeler", "yazmazlardı."]
            },
            {
              id: "c104_l2_ex3_q8",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Under the new monetary system, citizens are gradually getting used to paying higher taxes.",
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Yeni parasal sistem altında,", "vatandaşlar", "yavaş yavaş daha yüksek vergiler", "ödemeye alışıyorlar.", "ödemek zorunda kalıyorlar.", "karşı çıkıyorlar."],
              correctOrder: ["Yeni parasal sistem altında,", "vatandaşlar", "yavaş yavaş daha yüksek vergiler", "ödemeye alışıyorlar."]
            },
            {
              id: "c104_l2_ex3_q9",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Psychologists had better investigate the cognitive processes of children who suffer from trauma.",
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Psikologlar,", "travma yaşayan çocukların", "bilişsel süreçlerini", "araştırsalar iyi olur.", "araştırmak zorundadır.", "sınıflandırmalıdır."],
              correctOrder: ["Psikologlar,", "travma yaşayan çocukların", "bilişsel süreçlerini", "araştırsalar iyi olur."]
            },
            {
              id: "c104_l2_ex3_q10",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Legal experts ought not to ignore the constitutional changes that the government is proposing.",
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Hukuk uzmanları,", "hükümetin önerdiği", "anayasal değişiklikleri", "göz ardı etmemelidir.", "göz ardı etmelidir.", "incelemek zorundadır."],
              correctOrder: ["Hukuk uzmanları,", "hükümetin önerdiği", "anayasal değişiklikleri", "göz ardı etmemelidir."]
            }
          ]
        }
      ]
    },
    {
      id: "c104_l3",
      unitId: 104,
      title: "3. Akademik Sentez ve Spiralleşme (Academic Synthesis)",
      subtitle: "Gelişmiş akademik cümle yapıları ve genel tekrar",
      konuAnlatimi: {
        baslik: "Akademik Sentez ve Spiralleşme (Yarı-Modallar)",
        teorikMantik: "Bu ders, yarı-modalların akademik metinlerdeki zarf kısaltmaları ve bağlaçlarla birleşmiş karmaşık ve ileri düzey versiyonlarını içerir.",
        formul: "S + (be able to / have to / used to / had better) + Active reduced structures + Conjunctions",
        altinKural: "Karmaşık cümlelerde ana eylem ile yarı-modalın özneyle uyumunu ve eylemin etken (aktif) yapısını mutlaka sentezleyin."
      },
      exercises: [
        {
          id: "c104_l3_ex1",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 1: İleri Akademik Sentez",
          description: "Yarı-modal yapıları içeren gelişmiş akademik cümlelerin analizi.",
          questions: [
            {
              id: "c104_l3_ex1_q1",
              type: "multiple-choice",
              prompt: "\"Although the government had to modify the legal framework, members of parliament still oppose the changes.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Hükümet yasal çerçeveyi değiştirmek zorunda kalmasına rağmen, parlamento üyeleri değişikliklere hâlâ karşı çıkıyor.",
                "Hükümet yasal çerçeveyi değiştirebildi çünkü parlamento üyeleri değişikliklere karşı çıkmadı.",
                "Hükümet yasal çerçeveyi değiştirmek zorunda kaldı çünkü parlamento üyeleri değişiklikleri onayladı.",
                "Hükümet yasal çerçeveyi değiştirmeden önce parlamento üyeleri değişikliklere karşı çıkıyordu."
              ],
              correctIndex: 0,
              enSentence: "Although the government had to modify the legal framework, members of parliament still oppose the changes.",
              isEngToTr: true
            },
            {
              id: "c104_l3_ex1_q2",
              type: "multiple-choice",
              prompt: "\"If the central bank is able to control the inflation rate, citizens will not protest the monetary policy.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Yetenek", "Koşul Cümleleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Eğer merkez bankası enflasyon oranını kontrol edebilirse, vatandaşlar para politikasını protesto etmeyecektir.",
                "Eğer merkez bankası enflasyon oranını kontrol etmek zorunda kalırsa, vatandaşlar para politikasını protesto edecektir.",
                "Merkez bankası enflasyon oranını kontrol edebildiğinde vatandaşlar para politikasını protesto etmedi.",
                "Vatandaşlar para politikasını protesto etmedikçe merkez bankası enflasyon oranını kontrol edemez."
              ],
              correctIndex: 0,
              enSentence: "If the central bank is able to control the inflation rate, citizens will not protest the monetary policy.",
              isEngToTr: true
            },
            {
              id: "c104_l3_ex1_q3",
              type: "multiple-choice",
              prompt: "\"Film critics ought to evaluate the historical representation in the movie before they write their final columns.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Film eleştirmenleri nihai sütunlarını yazmadan önce filmdeki tarihi temsili değerlendirmelidir.",
                "Film eleştirmenleri nihai sütunlarını yazdıktan sonra filmdeki tarihi temsili değerlendirmek zorunda kaldılar.",
                "Filmdeki tarihi temsili değerlendirmek için film eleştirmenleri nihai sütunlarını yazmalıdır.",
                "Film eleştirmenleri filmdeki tarihi temsili değerlendirebilirler çünkü nihai sütunlarını yazacaklardır."
              ],
              correctIndex: 0,
              enSentence: "Film critics ought to evaluate the historical representation in the movie before they write their final columns.",
              isEngToTr: true
            },
            {
              id: "c104_l3_ex1_q4",
              type: "multiple-choice",
              prompt: "\"Since the clinic started the new program, therapists have got used to treating children with cognitive disorders.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "Zaman Uyumu", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Klinik yeni programa başladığından beri, terapistler bilişsel bozukluğu olan çocukları tedavi etmeye alıştılar.",
                "Klinik yeni programa başlamadan önce terapistler bilişsel bozukluğu olan çocukları tedavi etmek zorundaydı.",
                "Terapistler bilişsel bozukluğu olan çocukları tedavi etmeye alışmalıdır çünkü klinik yeni programa başladı.",
                "Klinik yeni programa başladığında terapistler bilişsel bozukluğu olan çocukları tedavi edebildi."
              ],
              correctIndex: 0,
              enSentence: "Since the clinic started the new program, therapists have got used to treating children with cognitive disorders.",
              isEngToTr: true
            },
            {
              id: "c104_l3_ex1_q5",
              type: "multiple-choice",
              prompt: "\"Sociological scholars used to conduct their research through face-to-face interviews before the internet changed communication.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "İnternet iletişimi değiştirmeden önce, sosyoloji akademisyenleri araştırmalarını yüz yüze görüşmeler yoluyla yürütürlerdi.",
                "İnternet iletişimi değiştirdiği için sosyoloji akademisyenleri araştırmalarını yüz yüze görüşmeler yoluyla yürütmek zorundadır.",
                "Sosyoloji akademisyenleri araştırmalarını yüz yüze görüşmeler yoluyla yürütebildiler çünkü internet iletişimi değiştirdi.",
                "İnternet iletişimi değiştirdiğinde sosyoloji akademisyenleri araştırmalarını yüz yüze görüşmelerle yürütmeye alıştı."
              ],
              correctIndex: 0,
              enSentence: "Sociological scholars used to conduct their research through face-to-face interviews before the internet changed communication.",
              isEngToTr: true
            },
            {
              id: "c104_l3_ex1_q6",
              type: "multiple-choice",
              prompt: "\"The legal experts had better examine the ancient documents carefully; otherwise, the judge might reject the evidence.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Tavsiye", "Koşul Cümleleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Hukuk uzmanları antik belgeleri dikkatle inceleseler iyi olur; aksi takdirde hakim delilleri reddedebilir.",
                "Hukuk uzmanları antik belgeleri dikkatle incelemek zorunda kaldılar; aksi takdirde hakim delilleri reddedebilir.",
                "Hakim delilleri reddetti çünkü hukuk uzmanları antik belgeleri dikkatle incelemek zorunda değildi.",
                "Hukuk uzmanları antik belgeleri incelediler çünkü hakim delilleri reddetmek istemedi."
              ],
              correctIndex: 0,
              enSentence: "The legal experts had better examine the ancient documents carefully; otherwise, the judge might reject the evidence.",
              isEngToTr: true
            },
            {
              id: "c104_l3_ex1_q7",
              type: "multiple-choice",
              prompt: "\"While studying the history of cinema, researchers have to analyze the symbolic meaning of early documentaries.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Sinema tarihini incelerken, araştırmacılar erken dönem belgesellerin sembolik anlamını analiz etmek zorundadır.",
                "Sinema tarihini incelemeden önce araştırmacılar erken dönem belgesellerin sembolik anlamını analiz edebildiler.",
                "Araştırmacılar sinema tarihini incelemek zorundadır çünkü erken dönem belgesellerin sembolik anlamını analiz edeceklerdir.",
                "Araştırmacılar sinema tarihini incelediler çünkü erken dönem belgesellerin sembolik anlamını analiz etmek zorunda kalmadılar."
              ],
              correctIndex: 0,
              enSentence: "While studying the history of cinema, researchers have to analyze the symbolic meaning of early documentaries.",
              isEngToTr: true
            },
            {
              id: "c104_l3_ex1_q8",
              type: "multiple-choice",
              prompt: "\"We needn't modify the monetary policy unless the international trade market experiences severe instability.\" cümlesinin Türkçe karşılığı hangisidir?",
              grammarTags: ["Yarı-Modallar", "Gereklilik", "Koşul Cümleleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              options: [
                "Uluslararası ticaret piyasası ciddi bir istikrarsızlık yaşamadıkça para politikasını değiştirmemize gerek yoktur.",
                "Uluslararası ticaret piyasası ciddi bir istikrarsızlık yaşarsa para politikasını değiştirmek zorunda kalacağız.",
                "Uluslararası ticaret piyasası ciddi bir istikrarsızlık yaşamadığı için para politikasını değiştirmek zorunda değildik.",
                "Para politikasını değiştirmeliyiz çünkü uluslararası ticaret piyasası ciddi bir istikrarsızlık yaşıyor."
              ],
              correctIndex: 0,
              enSentence: "We needn't modify the monetary policy unless the international trade market experiences severe instability.",
              isEngToTr: true
            },
            {
              id: "c104_l3_ex1_q9",
              type: "translation-text",
              prompt: "“Because the library preserves the historical archives of the parliament, scholars are able to verify the claims.” cümlesini Türkçe'ye çevirin:",
              correctSentence: "Kütüphane parlamentonun tarihi arşivlerini koruduğu için, akademisyenler iddiaları doğrulayabilmektedir.",
              enSentence: "Because the library preserves the historical archives of the parliament, scholars are able to verify the claims.",
              isEngToTr: true,
              grammarTags: ["Yarı-Modallar", "Yetenek", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l3_ex1_q10",
              type: "translation-text",
              prompt: "“If therapists get used to observing the behavior of patients, they will easily identify the cognitive issues.” cümlesini Türkçe'ye çevirin:",
              correctSentence: "Eğer terapistler hastaların davranışlarını gözlemlemeye alışırlarsa, bilişsel sorunları kolayca belirleyeceklerdir.",
              enSentence: "If therapists get used to observing the behavior of patients, they will easily identify the cognitive issues.",
              isEngToTr: true,
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "Koşul Cümleleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            }
          ]
        },
        {
          id: "c104_l3_ex2",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 2: Cümle Düzeyi (Boşluk Doldurma)",
          description: "İleri düzey akademik cümlelerdeki boşlukları en uygun yarı-modal çekimleriyle doldurun.",
          questions: [
            {
              id: "c104_l3_ex2_q1",
              type: "fill-blank-dropdown",
              prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
              sentence: "Although the government had ___ modify the legal framework, members of parliament still oppose the changes.",
              options: ["to", "for", "with", "of"],
              correctIndex: 0,
              translation: "Hükümet yasal çerçeveyi değiştirmek zorunda kalmasına rağmen, parlamento üyeleri değişikliklere hâlâ karşı çıkıyor.",
              explanation: "'had to' yapısı fiilden önce 'to' gerektirir.",
              hint: { formula: "had to + V1" },
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l3_ex2_q2",
              type: "fill-blank",
              prompt: "Boşluğu doldur",
              sentence: "If the central bank is ___ to control the inflation rate, citizens will not protest the monetary policy.",
              options: ["able", "capable", "must", "have"],
              correctIndex: 0,
              translation: "Eğer merkez bankası enflasyon oranını kontrol edebilirse, vatandaşlar para politikasını protesto etmeyecektir.",
              explanation: "Yetenek/beceri bildiren present 'is able to' yapısı cümleyi tamamlar.",
              hint: { formula: "is/are able to + V1" },
              grammarTags: ["Yarı-Modallar", "Yetenek", "Koşul Cümleleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l3_ex2_q3",
              type: "fill-blank-dropdown",
              prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
              sentence: "Film critics ___ to evaluate the historical representation in the movie before they write their final columns.",
              options: ["ought", "should", "must", "had better"],
              correctIndex: 0,
              translation: "Film eleştirmenleri nihai sütunlarını yazmadan önce filmdeki tarihi temsili değerlendirmelidir.",
              explanation: "'to' ile devam eden ve gereklilik/tavsiye bildiren tek modal 'ought' yapısıdır.",
              hint: { formula: "ought + to + V1" },
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l3_ex2_q4",
              type: "fill-blank",
              prompt: "Boşluğu doldur",
              sentence: "Since the clinic started the new program, therapists have ___ used to treating children with cognitive disorders.",
              options: ["got", "been", "getting", "become"],
              correctIndex: 0,
              translation: "Klinik yeni programa başladığından beri, terapistler bilişsel bozukluğu olan çocukları tedavi etmeye alıştılar.",
              explanation: "Alışma sürecini present perfect ile vurgulamak için 'have got used to' yapısı kullanılır.",
              hint: { formula: "have/has got used to + V-ing" },
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "Zaman Uyumu", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l3_ex2_q5",
              type: "fill-blank-dropdown",
              prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
              sentence: "Sociological scholars ___ to conduct their research through face-to-face interviews before the internet changed communication.",
              options: ["used", "was used", "got used", "uses"],
              correctIndex: 0,
              translation: "İnternet iletişimi değiştirmeden önce, sosyoloji akademisyenleri araştırmalarını yüz yüze görüşmeler yoluyla yürütürlerdi.",
              explanation: "Geçmişteki alışkanlıklar/durumlar 'used to' yapısı ile anlatılır.",
              hint: { formula: "used to + V1" },
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l3_ex2_q6",
              type: "fill-blank",
              prompt: "Boşluğu doldur",
              sentence: "The legal experts had ___ examine the ancient documents carefully; otherwise, the judge might reject the evidence.",
              options: ["better", "rather", "to", "should"],
              correctIndex: 0,
              translation: "Hukuk uzmanları antik belgeleri dikkatle inceleseler iyi olur; aksi takdirde hakim delilleri reddedebilir.",
              explanation: "Güçlü/acil tavsiye bildiren 'had better' kalıbı cümleyi tamamlar.",
              hint: { formula: "had better + V1" },
              grammarTags: ["Yarı-Modallar", "Tavsiye", "Koşul Cümleleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l3_ex2_q7",
              type: "fill-blank-dropdown",
              prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
              sentence: "While studying the history of cinema, researchers ___ to analyze the symbolic meaning of early documentaries.",
              options: ["have", "has", "must", "should"],
              correctIndex: 0,
              translation: "Sinema tarihini incelerken, araştırmacılar erken dönem belgesellerin sembolik anlamını analiz etmek zorundadır.",
              explanation: "Çoğul özne (researchers) ile present zorunluluk bildiren 'have to' yapısı uyuşur.",
              hint: { formula: "Plural Subject + have to + V1" },
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l3_ex2_q8",
              type: "fill-blank",
              prompt: "Boşluğu doldur",
              sentence: "We needn't ___ the monetary policy unless the international trade market experiences severe instability.",
              options: ["modify", "modifying", "to modify", "modified"],
              correctIndex: 0,
              translation: "Uluslararası ticaret piyasası ciddi bir istikrarsızlık yaşamadıkça para politikasını değiştirmemize gerek yoktur.",
              explanation: "'needn't' yarı-modalından sonra fiil yalın halde (V1) gelir, 'to' kullanılmaz.",
              hint: { formula: "needn't + V1" },
              grammarTags: ["Yarı-Modallar", "Gereklilik", "Koşul Cümleleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l3_ex2_q9",
              type: "fill-blank-dropdown",
              prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
              sentence: "Because the library preserves the historical archives of the parliament, scholars ___ able to verify the claims.",
              options: ["are", "is", "was", "will"],
              correctIndex: 0,
              translation: "Kütüphane parlamentonun tarihi arşivlerini koruduğu için, akademisyenler iddiaları doğrulayabilmektedir.",
              explanation: "Çoğul özne (scholars) ile present yetenek/beceri bildiren 'are able to' yapısı kullanılır.",
              hint: { formula: "are able to + V1" },
              grammarTags: ["Yarı-Modallar", "Yetenek", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            },
            {
              id: "c104_l3_ex2_q10",
              type: "fill-blank",
              prompt: "Boşluğu doldur",
              sentence: "If therapists get used to ___ the behavior of patients, they will easily identify the cognitive issues.",
              options: ["observing", "observe", "observed", "be observing"],
              correctIndex: 0,
              translation: "Eğer terapistler hastaların davranışlarını gözlemlemeye alışırlarsa, bilişsel sorunları kolayca belirleyeceklerdir.",
              explanation: "'get used to' yapısından sonra fiil -ing (gerund) takısı alır.",
              hint: { formula: "get used to + V-ing" },
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "Koşul Cümleleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"]
            }
          ]
        },
        {
          id: "c104_l3_ex3",
          createdAt: "2026-07-25T02:00:00Z",
          title: "Alıştırma 3: Akademik Sentez (Word Bank)",
          description: "İleri düzey akademik cümle bloklarını sıralayarak tam çevirileri oluşturun.",
          questions: [
            {
              id: "c104_l3_ex3_q1",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Although the government had to modify the legal framework, members of parliament still oppose the changes.",
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Hükümet yasal çerçeveyi değiştirmek zorunda kalmasına rağmen,", "parlamento üyeleri", "değişikliklere", "hâlâ karşı çıkıyor.", "karşı çıkacaktır.", "onay verdiler."],
              correctOrder: ["Hükümet yasal çerçeveyi değiştirmek zorunda kalmasına rağmen,", "parlamento üyeleri", "değişikliklere", "hâlâ karşı çıkıyor."]
            },
            {
              id: "c104_l3_ex3_q2",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "If the central bank is able to control the inflation rate, citizens will not protest the monetary policy.",
              grammarTags: ["Yarı-Modallar", "Yetenek", "Koşul Cümleleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Eğer merkez bankası enflasyon oranını kontrol edebilirse,", "vatandaşlar", "para politikasını", "protesto etmeyecektir.", "protesto edeceklerdir.", "değiştirecektir."],
              correctOrder: ["Eğer merkez bankası enflasyon oranını kontrol edebilirse,", "vatandaşlar", "para politikasını", "protesto etmeyecektir."]
            },
            {
              id: "c104_l3_ex3_q3",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Film critics ought to evaluate the historical representation in the movie before they write their final columns.",
              grammarTags: ["Yarı-Modallar", "Tavsiye", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Film eleştirmenleri", "nihai sütunlarını yazmadan önce", "filmdeki tarihi temsili", "değerlendirmelidir.", "değerlendirmek zorundadır.", "eleştirmelidir."],
              correctOrder: ["Film eleştirmenleri", "nihai sütunlarını yazmadan önce", "filmdeki tarihi temsili", "değerlendirmelidir."]
            },
            {
              id: "c104_l3_ex3_q4",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Since the clinic started the new program, therapists have got used to treating children with cognitive disorders.",
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "Zaman Uyumu", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Klinik yeni programa başladığından beri,", "terapistler", "bilişsel bozukluğu olan çocukları", "tedavi etmeye alıştılar.", "tedavi etmek zorunda kaldılar.", "incelemeye başladılar."],
              correctOrder: ["Klinik yeni programa başladığından beri,", "terapistler", "bilişsel bozukluğu olan çocukları", "tedavi etmeye alıştılar."]
            },
            {
              id: "c104_l3_ex3_q5",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Sociological scholars used to conduct their research through face-to-face interviews before the internet changed communication.",
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["İnternet iletişimi değiştirmeden önce,", "sosyoloji akademisyenleri", "araştırmalarını", "yüz yüze görüşmeler yoluyla yürütürlerdi.", "yürütmek zorundaydılar.", "yayınlarlardı."],
              correctOrder: ["İnternet iletişimi değiştirmeden önce,", "sosyoloji akademisyenleri", "araştırmalarını", "yüz yüze görüşmeler yoluyla yürütürlerdi."]
            },
            {
              id: "c104_l3_ex3_q6",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "The legal experts had better examine the ancient documents carefully; otherwise, the judge might reject the evidence.",
              grammarTags: ["Yarı-Modallar", "Tavsiye", "Koşul Cümleleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Hukuk uzmanları", "antik belgeleri dikkatle inceleseler iyi olur;", "aksi takdirde", "hakim delilleri reddedebilir.", "hakim davayı erteleyebilir.", "kabul etmek zorundadır."],
              correctOrder: ["Hukuk uzmanları", "antik belgeleri dikkatle inceleseler iyi olur;", "aksi takdirde", "hakim delilleri reddedebilir."]
            },
            {
              id: "c104_l3_ex3_q7",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "While studying the history of cinema, researchers have to analyze the symbolic meaning of early documentaries.",
              grammarTags: ["Yarı-Modallar", "Zorunluluk", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Sinema tarihini incelerken,", "araştırmacılar", "erken dönem belgesellerin", "sembolik anlamını", "analiz etmek zorundadır.", "analiz edebilirler.", "belirleyeceklerdir."],
              correctOrder: ["Sinema tarihini incelerken,", "araştırmacılar", "erken dönem belgesellerin", "sembolik anlamını", "analiz etmek zorundadır."]
            },
            {
              id: "c104_l3_ex3_q8",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "We needn't modify the monetary policy unless the international trade market experiences severe instability.",
              grammarTags: ["Yarı-Modallar", "Gereklilik", "Koşul Cümleleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Uluslararası ticaret piyasası ciddi bir istikrarsızlık yaşamadıkça", "para politikasını", "değiştirmemize gerek yoktur.", "değiştirmek zorundayız.", "desteklemeliyiz."],
              correctOrder: ["Uluslararası ticaret piyasası ciddi bir istikrarsızlık yaşamadıkça", "para politikasını", "değiştirmemize gerek yoktur."]
            },
            {
              id: "c104_l3_ex3_q9",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "Because the library preserves the historical archives of the parliament, scholars are able to verify the claims.",
              grammarTags: ["Yarı-Modallar", "Yetenek", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Kütüphane parlamentonun tarihi arşivlerini koruduğu için,", "akademisyenler", "iddiaları", "doğrulayabilmektedir.", "doğrulamak zorundadır.", "reddederler."],
              correctOrder: ["Kütüphane parlamentonun tarihi arşivlerini koruduğu için,", "akademisyenler", "iddiaları", "doğrulayabilmektedir."]
            },
            {
              id: "c104_l3_ex3_q10",
              type: "word-bank",
              prompt: "Cümlenin Türkçe karşılığını oluşturun:",
              translation: "If therapists get used to observing the behavior of patients, they will easily identify the cognitive issues.",
              grammarTags: ["Yarı-Modallar", "Alışkanlık", "Koşul Cümleleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
              words: ["Eğer terapistler", "hastaların davranışlarını", "gözlemlemeye alışırlarsa,", "bilişsel sorunları kolayca belirleyeceklerdir.", "belirlemek zorunda kalacaklardır.", "çözeceklerdir."],
              correctOrder: ["Eğer terapistler", "hastaların davranışlarını", "gözlemlemeye alışırlarsa,", "bilişsel sorunları kolayca belirleyeceklerdir."]
            }
          ]
        }
      ]
    }
  ]
};

if (typeof units !== 'undefined' && typeof lessons !== 'undefined') {
  const idx70 = units.findIndex(u => u.id === 70);
  if (idx70 !== -1) {
    units.splice(idx70 + 1, 0, {
      id: 104,
      title: chapter104Data.chapterName,
      description: chapter104Data.chapterDescription,
      lessons: chapter104Data.lessons.map(l => l.id),
      pages: "220-239"
    });
  } else {
    units.push({
      id: 104,
      title: chapter104Data.chapterName,
      description: chapter104Data.chapterDescription,
      lessons: chapter104Data.lessons.map(l => l.id),
      pages: "220-239"
    });
  }

  chapter104Data.lessons.forEach(l => {
    lessons.push({
      id: l.id,
      unitId: 104,
      title: l.title,
      subtitle: l.subtitle,
      konuAnlatimi: l.konuAnlatimi || null,
      exercises: l.exercises || []
    });
  });

  // Unit 105 registration
  units.push({
    id: 105,
    title: chapter105Data.chapterName,
    description: chapter105Data.chapterDescription,
    lessons: chapter105Data.lessons.map(l => l.id),
    pages: "240-259"
  });

  chapter105Data.lessons.forEach(l => {
    lessons.push({
      id: l.id,
      unitId: 105,
      title: l.title,
      subtitle: l.subtitle,
      konuAnlatimi: l.konuAnlatimi || null,
      exercises: l.exercises || []
    });
  });
}


if (typeof units !== 'undefined') {
  units.forEach(u => {
    if (u.title) u.title = u.title.replace(/\s+/g, ' ').trim();
    if (u.subtitle) u.subtitle = u.subtitle.replace(/\s+/g, ' ').trim();
  });
}
if (typeof lessons !== 'undefined') {
  lessons.forEach(l => {
    if (l.title) l.title = l.title.replace(/\s+/g, ' ').trim();
    if (l.subtitle) l.subtitle = l.subtitle.replace(/\s+/g, ' ').trim();
  });
}

// Deduplicate, reorder, and sync units and rawTopics
(function() {
  if (typeof units === 'undefined') return;

  // 1. Deduplicate units by title (keeping the first one, but if it has lessons 410, 411, 412 we discard it since we want the customized c41 one)
  const filteredUnits = [];
  const seenTitles = new Set();
  units.forEach(u => {
    const titleKey = (u.title || '').trim().toLowerCase();
    // Special check for duplicate unit 41: discard if it has lesson 410 (old mock data)
    if (u.id === 41 && u.lessons && u.lessons.includes(410)) {
      return;
    }
    if (!seenTitles.has(titleKey)) {
      seenTitles.add(titleKey);
      filteredUnits.push(u);
    }
  });

  // 2. Approved curriculum ordering of unit IDs
  const targetOrder = [
    6,   // Temel Yapılar
    1,   // İsim ve Edat Yapıları
    3,   // İsim Tamlaması
    2,   // Fiil ve Edat Yapıları
    7,   // Özne - Geçişli Fiil + Nesne
    70,  // Saf Modallar ve Saf Zamanlar
    9,   // Soru Yapıları
    12,  // Participle Yapıları
    8,   // "There" Yapıları
    102, // Zaman Zarfları ve Zaman Uyumu
    101, // Zaman Uyumu: By the time, Since, It is time
    13,  // Ara Bölüm 2: Tercih Bildiren Yapılar
    17,  // Ara Bölüm 3: Rica ve İzin İsteme Yapıları
    104, // Yarı-Modallar ve Modal Benzeri Yapılar
    103, // Öbeksel Kipler
    10,  // Edilgen Yapılar ve Edilgen Mastarı
    62,  // Ara Bölüm 5: Nicelik, Zaman ve Derece Belirteçleri
    22,  // Cümle Bağlaçları, Geçiş Kelimeleri ve Yan Cümlecikler
    40,  // Bağlaçlar
    32,  // Zarf Cümlecikleri
    26,  // Karşılaştırma ile Sıfat Cümleciği
    28,  // İsim Cümleciği
    14,  // Mastar Yapıları, Amaç Mastarları ve Soru Kelimeli Kısaltmalar
    29,  // It + to be + sıfat/past participle + that
    30,  // Neden ve Etki Yapıları
    35,  // Akademik Cümle Analizi ve Kısaltmalar
    36,  // Akademik Yumuşatma ve İhtimal Dili
    37,  // Advanced Relative Clauses
    38,  // Advanced Inversion
    39,  // Bölüm 44 / Modül A: Zaman, Şart & Dilek Kalkanları
    "39_2", // İleri Düzey Cümle Yapıları, Edatlar & Kısaltma Geometrisi
    "39_3", // Bölüm 44 / Modül C: Devriklik, Bağlaçlar & Hata Avcısı Zirvesi
    43,  // Cümle Ögeleri ve Eylem Zincirleri (5-8 Öğe)
    47,  // Zincir Genişleme ve Sentaks Matrisi
    48,  // Zaman Kayma Kontrolü
    105, // Zaman Uyumu Formül Mühendisliği
    53,  // Akademik Bağlaç Mühendisliği
    55,  // Koşul Cümleleri ve Mix Yapılar Mühendisliği
    200, // Sentaktik Çözümleme: Gerund, Participle ve Infinitive Sentezi
    201, // Sentaktik Kriptoloji: Past Participle ve Edilgen Sentez
    57,  // Akademik Deyimsel Fiiller
    41,  // Akademik Sınav Kısayolları (Sınav Stratejileri ve Gramer İpuçları)
    42,  // Phrasal Modal ve Subjunctive Matrisi (Phrasal Modals ve Dilek Kipleri)
    51,  // Akademik TIPS Master Serisi (Sınav İpuçları ve Çözüm Stratejileri)
    52,  // Akademik TIPS İhtisas Serisi (İleri Düzey Sınav İpuçları)
    66,  // YDS / YÖKDİL / YDT Sınav Kilitleri ve Hızlı Refleks Stratejileri
    49,  // Ultimate Academic Exam Simulation (Akademik Sınav Simülasyonu)
    50   // Grand Master Final Challenge (Genel Sınav Değerlendirmesi)
  ];

  // 3. Reorder units array
  const orderedUnits = [];
  targetOrder.forEach(id => {
    const found = filteredUnits.find(u => String(u.id) === String(id));
    if (found) {
      orderedUnits.push(found);
    }
  });

  // Append any unit that might not be in the targetOrder list (safety fallback)
  filteredUnits.forEach(u => {
    if (!orderedUnits.some(ou => String(ou.id) === String(u.id))) {
      orderedUnits.push(u);
    }
  });

  // Update units array in place
  units.length = 0;
  units.push(...orderedUnits);

  // 4. Also reorder and deduplicate rawTopics to keep in perfect sync with units
  if (typeof rawTopics !== 'undefined') {
    const filteredTopics = [];
    const seenTopicTitles = new Set();
    rawTopics.forEach(t => {
      const titleKey = (t.title || '').trim().toLowerCase();
      if (t.id === 41 && t.startLessonId === 410) { // discard duplicate topic 41
        return;
      }
      if (!seenTopicTitles.has(titleKey)) {
        seenTopicTitles.add(titleKey);
        filteredTopics.push(t);
      }
    });

    const orderedTopics = [];
    // Align with the sorted units
    units.forEach(u => {
      const foundTopic = filteredTopics.find(t => String(t.title).trim().toLowerCase() === String(u.title).trim().toLowerCase());
      if (foundTopic) {
        orderedTopics.push(foundTopic);
      }
    });

    // Fallback: append any topics not matched
    filteredTopics.forEach(t => {
      if (!orderedTopics.some(ot => String(ot.title).trim().toLowerCase() === String(t.title).trim().toLowerCase())) {
        orderedTopics.push(t);
      }
    });

    rawTopics.length = 0;
    rawTopics.push(...orderedTopics);
  }

  // ==========================================
  // BÖLÜM 13: TERCİH BİLDİREN YAPILAR INJECTION
  // ==========================================
  const u13l41Questions = [
    {
      id: "u13l41_q1",
      type: "matching",
      prompt: "Tercih ifadelerini Türkçe karşılıklarıyla eşleştirin.",
      pairs: [
        { left: "would rather study", right: "çalışmayı tercih ederim" },
        { left: "would rather have stayed", right: "kalmış olmayı tercih ederdim" },
        { left: "would rather not go", right: "gitmemeyi tercih ederim" },
        { left: "would rather have checked", right: "kontrol etmiş olmayı tercih ederdim" }
      ],
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l41_q2",
      type: "multiple-choice",
      prompt: "\"The researchers would rather publish their findings in an open-access journal.\" cümlesinin Türkçe karşılığı hangisidir?",
      options: [
        "Araştırmacılar bulgularını açık erişimli bir dergide yayınlamayı tercih ederler.",
        "Araştırmacılar bulgularını açık erişimli bir dergide yayınlamış olmayı tercih ederlerdi.",
        "Araştırmacılar açık erişimli dergileri diğerlerine tercih etmektedirler.",
        "Araştırmacılar bulgularını açık erişimli dergiler yerine kitaplarda yayınlarlar."
      ],
      correctIndex: 0,
      enSentence: "The researchers would rather publish their findings in an open-access journal.",
      isEngToTr: true,
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l41_q3",
      type: "multiple-choice",
      prompt: "\"I would rather have spent the budget on experimental equipment last term.\" cümlesinin Türkçe karşılığı hangisidir?",
      options: [
        "Geçen dönem bütçeyi deneysel ekipmanlara harcamış olmayı tercih ederdim.",
        "Gelecek dönem bütçeyi deneysel ekipmanlara harcamayı tercih ederim.",
        "Deneysel ekipmanlara bütçe ayırmayı her zaman tercih ederim.",
        "Bütçeyi deneysel ekipmanlara harcamış olmalarını tercih ederlerdi."
      ],
      correctIndex: 0,
      enSentence: "I would rather have spent the budget on experimental equipment last term.",
      isEngToTr: true,
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l41_q4",
      type: "fill-blank-dropdown",
      prompt: "Boşluğa gelecek en uygun eylem çekimini seçin:",
      sentence: "The archaeologist would rather ___ the tomb himself than delegate it to others.",
      options: ["excavate", "excavated", "have excavated", "excavating"],
      correctIndex: 0,
      translation: "Arkeolog, mezarı başkalarına devretmektense kendisi kazmayı tercih eder.",
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l41_q5",
      type: "fill-blank-dropdown",
      prompt: "Boşluğa gelecek en uygun eylem çekimini seçin:",
      sentence: "The coordinator would rather ___ the database security measures last week.",
      options: ["have upgraded", "upgrade", "upgraded", "upgrading"],
      correctIndex: 0,
      translation: "Koordinatör veritabanı güvenlik önlemlerini geçen hafta yükseltmiş olmayı tercih ederdi.",
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l41_q6",
      type: "fill-blank",
      prompt: "Boşluğu doldurunuz:",
      sentence: "The professor would rather ___ the seminar than cancel it.",
      options: ["postpone", "postponed", "have postponed", "postponing"],
      correctIndex: 0,
      translation: "Profesör semineri iptal etmektense ertelemeyi tercih eder.",
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l41_q7",
      type: "fill-blank",
      prompt: "Boşluğu doldurunuz:",
      sentence: "We would rather ___ the control variables during yesterday's experiment.",
      options: ["have monitored", "monitor", "monitored", "monitoring"],
      correctIndex: 0,
      translation: "Dünkü deney sırasında kontrol değişkenlerini gözlemlemiş olmayı tercih ederdik.",
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l41_q8",
      type: "word-bank",
      prompt: "Cümlenin Türkçe karşılığını oluşturun:",
      translation: "Laboratuvarda çalışmayı tercih ederim.",
      enSentence: "I would rather work in the laboratory.",
      words: ["Laboratuvarda", "çalışmayı", "tercih", "ederim", "dışarıda", "yapmak"],
      correctOrder: ["Laboratuvarda", "çalışmayı", "tercih", "ederim"],
      isEngToTr: true,
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l41_q9",
      type: "word-bank",
      prompt: "Cümlenin İngilizce karşılığını oluşturun:",
      translation: "Sıvıyı ısıtmayı tercih ederdim.",
      trSentence: "Sıvıyı ısıtmayı tercih ederdim.",
      words: ["I", "would", "rather", "have", "heated", "the", "liquid", "heat"],
      correctOrder: ["I", "would", "rather", "have", "heated", "the", "liquid"],
      isEngToTr: false,
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l41_q10",
      type: "translation-text",
      prompt: "\"The team would rather analyze the sample now.\" cümlesini Türkçe'ye çevirin:",
      correctSentence: "Ekip numuneyi şimdi analiz etmeyi tercih eder.",
      enSentence: "The team would rather analyze the sample now.",
      isEngToTr: true,
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l41_q11",
      type: "translation-text",
      prompt: "\"I would rather have verified the credentials before the migration.\" cümlesini Türkçe'ye çevirin:",
      correctSentence: "Geçişten önce kimlik bilgilerini doğrulamış olmayı tercih ederdim.",
      enSentence: "I would rather have verified the credentials before the migration.",
      isEngToTr: true,
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l41_q12",
      type: "true-false",
      prompt: "Aşağıdaki cümlenin yapısı gramer açısından doğru mudur?",
      englishPhrase: "She would rather has studied grammar.",
      turkishTranslation: "Hata tespiti: 'would rather' yapısından sonra yalın fiil (V1 - study) gelmelidir, 'has studied' gelemez.",
      correctAnswer: "false",
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l41_q13",
      type: "multiple-choice",
      prompt: "\"Dün toplantıya katılmış olmayı tercih ederdim.\" cümlesinin İngilizce karşılığı hangisidir?",
      options: [
        "I would rather have attended the meeting yesterday.",
        "I would rather attend the meeting yesterday.",
        "I would rather attended the meeting yesterday.",
        "I would rather having attended the meeting yesterday."
      ],
      correctIndex: 0,
      enSentence: "I would rather have attended the meeting yesterday.",
      isEngToTr: false,
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l41_q14",
      type: "spotlight",
      prompt: "Altı çizili olan 'rewrite' eyleminin cümledeki dil bilgisi işlevi nedir?",
      paragraph: "The programmers would rather rewrite the legacy code.",
      highlightChunk: "rewrite",
      options: ["Yalın Eylem (Bare Infinitive)", "Çekimli Yüklem (Finite Verb)", "Ortaç (Participle)", "İsim-Fiil (Gerund)"],
      correctIndex: 0,
      translation: "Programcılar eski kodu yeniden yazmayı tercih eder.",
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l41_q15",
      type: "multiple-fill-blank",
      prompt: "Boşlukları sırasıyla klavyeden doldurunuz:",
      sentence: "I would rather ___ stayed at home last night than ___ to the conference.",
      corrects: ["have", "gone"],
      translation: "Dün gece konferansa gitmektense evde kalmış olmayı tercih ederdim.",
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    }
  ];

  const u13l42Questions = [
    {
      id: "u13l42_q1",
      type: "matching",
      prompt: "Tercih ifadelerini Türkçe karşılıklarıyla eşleştirin.",
      pairs: [
        { left: "would rather you stayed", right: "senin kalmanı tercih ederim" },
        { left: "would rather they had helped", right: "onların yardım etmiş olmasını tercih ederdim" },
        { left: "would rather she didn't speak", right: "onun konuşmamasını tercih ederim" },
        { left: "would rather he had called", right: "onun aramış olmasını tercih ederdim" }
      ],
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l42_q2",
      type: "multiple-choice",
      prompt: "\"The board would rather the CEO resigned from his position immediately.\" cümlesinin Türkçe karşılığı hangisidir?",
      options: [
        "Yönetim kurulu, CEO'nun derhal görevinden istifa etmesini tercih eder.",
        "Yönetim kurulu, CEO'nun derhal istifa etmiş olmasını tercih ederdi.",
        "Yönetim kurulu, CEO istifa ederse yeni bir atama yapmayı tercih edecektir.",
        "Yönetim kurulu, CEO'nun görevinde kalmasını istifa etmesine tercih eder."
      ],
      correctIndex: 0,
      enSentence: "The board would rather the CEO resigned from his position immediately.",
      isEngToTr: true,
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l42_q3",
      type: "multiple-choice",
      prompt: "\"We would rather the technician had replaced the backup drives last month.\" cümlesinin Türkçe karşılığı hangisidir?",
      options: [
        "Teknisyenin geçen ay yedek sürücülerini değiştirmiş olmasını tercih ederdik.",
        "Teknisyenin gelecek ay yedek sürücülerini değiştirmesini tercih ederiz.",
        "Teknisyenin yedek sürücülerini her ay değiştirmesini tercih ediyoruz.",
        "Geçen ay yedek sürücülerinin teknisyen tarafından değiştirilmesini tercih ederler."
      ],
      correctIndex: 0,
      enSentence: "We would rather the technician had replaced the backup drives last month.",
      isEngToTr: true,
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l42_q4",
      type: "fill-blank-dropdown",
      prompt: "Boşluğa gelecek en uygun eylem çekimini seçin:",
      sentence: "The director would rather that the committee ___ the proposal right now.",
      options: ["approved", "approve", "approves", "had approved"],
      correctIndex: 0,
      translation: "Direktör, komitenin teklifi hemen şimdi onaylamasını tercih eder.",
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l42_q5",
      type: "fill-blank-dropdown",
      prompt: "Boşluğa gelecek en uygun eylem çekimini seçin:",
      sentence: "The supervisor would rather the assistant ___ the records before the inspection.",
      options: ["had checked", "checks", "checked", "has checked"],
      correctIndex: 0,
      translation: "Sorumlu, asistanın denetimden önce kayıtları kontrol etmiş olmasını tercih ederdi.",
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l42_q6",
      type: "fill-blank",
      prompt: "Boşluğu doldurunuz:",
      sentence: "I would rather you ___ touch the experimental apparatus.",
      options: ["didn't", "don't", "not", "hadn't"],
      correctIndex: 0,
      translation: "Deneysel cihazlara dokunmamanızı tercih ederim.",
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l42_q7",
      type: "fill-blank",
      prompt: "Boşluğu doldurunuz:",
      sentence: "They would rather the server administrator ___ the security patch last week.",
      options: ["had installed", "installed", "installs", "would install"],
      correctIndex: 0,
      translation: "Sistem yöneticisinin geçen hafta güvenlik yamasını yüklemiş olmasını tercih ederlerdi.",
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l42_q8",
      type: "word-bank",
      prompt: "Cümlenin Türkçe karşılığını oluşturun:",
      translation: "Tarih çalışmanı tercih ederim.",
      enSentence: "I would rather you studied history.",
      words: ["Tarih", "çalışmanı", "tercih", "ederim", "fizik", "okumanı"],
      correctOrder: ["Tarih", "çalışmanı", "tercih", "ederim"],
      isEngToTr: true,
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l42_q9",
      type: "word-bank",
      prompt: "Cümlenin İngilizce karşılığını oluşturun:",
      translation: "Onun raporu dün sunmuş olmasını tercih ederdim.",
      trSentence: "Onun raporu dün sunmuş olmasını tercih ederdim.",
      words: ["I", "would", "rather", "he", "had", "submitted", "the", "report", "yesterday", "submits"],
      correctOrder: ["I", "would", "rather", "he", "had", "submitted", "the", "report", "yesterday"],
      isEngToTr: false,
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l42_q10",
      type: "translation-text",
      prompt: "\"The manager would rather the developers modified the script now.\" cümlesini Türkçe'ye çevirin:",
      correctSentence: "Müdür, yazılımcıların betiği şimdi değiştirmesini tercih eder.",
      enSentence: "The manager would rather the developers modified the script now.",
      isEngToTr: true,
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l42_q11",
      type: "translation-text",
      prompt: "\"I would rather they had not shared the logs yesterday.\" cümlesini Türkçe'ye çevirin:",
      correctSentence: "Dün günlükleri paylaşmamış olmalarını tercih ederdim.",
      enSentence: "I would rather they had not shared the logs yesterday.",
      isEngToTr: true,
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l42_q12",
      type: "true-false",
      prompt: "Aşağıdaki cümlenin yapısı gramer açısından doğru mudur?",
      englishPhrase: "I would rather you don't go to the seminar tomorrow.",
      turkishTranslation: "Hata tespiti: Farklı özne ile kurulan present/future tercih yapılarında Simple Past (didn't go) kullanılmalıdır, don't kullanılamaz.",
      correctAnswer: "false",
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l42_q13",
      type: "multiple-choice",
      prompt: "\"Yazarın yeni bir makale yayınlamasını tercih ederiz.\" cümlesinin İngilizce karşılığı hangisidir?",
      options: [
        "We would rather the author published a new article.",
        "We would rather the author publishes a new article.",
        "We would rather the author publish a new article.",
        "We would rather the author has published a new article."
      ],
      correctIndex: 0,
      enSentence: "We would rather the author published a new article.",
      isEngToTr: false,
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l42_q14",
      type: "spotlight",
      prompt: "Altı çizili olan 'had attended' eyleminin cümledeki dil bilgisi işlevi nedir?",
      paragraph: "The dean would rather that the professors had attended the ceremony last year.",
      highlightChunk: "had attended",
      options: ["Past Perfect Tense (Geçmiş Zaman Tercihi)", "Present Perfect Tense", "Simple Past Tense", "Modal Perfect"],
      correctIndex: 0,
      translation: "Dekan, profesörlerin geçen yıl törene katılmış olmasını tercih ederdi.",
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    },
    {
      id: "u13l42_q15",
      type: "multiple-fill-blank",
      prompt: "Boşlukları sırasıyla klavyeden doldurunuz:",
      sentence: "I would rather you ___ not tell the client about the error until we ___ fixed it.",
      corrects: ["did", "have"],
      translation: "Biz hatayı düzeltene kadar müşteriye hata hakkında bilgi vermemeni tercih ederim.",
      grammarTags: ["Tercihler (Preferences)", "would rather"],
      createdAt: "2026-07-27T22:00:00+03:00"
    }
  ];

  if (typeof unitSentencesMap !== 'undefined') {
    unitSentencesMap["13"] = {
      "1": {
        exercises: [
          {
            id: "u13l41ex1",
            title: "Alıştırma 1: Kişisel Tercihler (Present & Past)",
            description: "would rather + V1 / have V3 tercih yapıları pekiştirme alıştırması (15 Soru)",
            createdAt: "2026-07-27T22:00:00+03:00",
            questions: u13l41Questions
          }
        ]
      },
      "2": {
        exercises: [
          {
            id: "u13l42ex1",
            title: "Alıştırma 1: Diğer Kişilerin Tercihleri (Present & Past)",
            description: "would rather + Subject + V2 / had V3 tercih yapıları pekiştirme alıştırması (15 Soru)",
            createdAt: "2026-07-27T22:00:00+03:00",
            questions: u13l42Questions
          }
        ]
      }
    };
  }

  if (typeof lessons !== 'undefined') {
    lessons.forEach(l => {
      if (l.unitId === 13) {
        if (l.id === 41 || l.id === "41") {
          l.exercises = unitSentencesMap["13"]["1"].exercises;
          l.questions = u13l41Questions;
        } else if (l.id === 42 || l.id === "42") {
          l.exercises = unitSentencesMap["13"]["2"].exercises;
          l.questions = u13l42Questions;
        }
      }
    });
  }
})();


// DYNAMIC CURRICULUM MERGING & REDUCTION (CHAPTERS 25+)
(function() {
  if (typeof units === 'undefined' || typeof lessons === 'undefined') return;

  const startIndex = units.findIndex(u => String(u.id) === '35');
  if (startIndex === -1) return;

  const newMergedUnits = [
    {
      id: "35",
      title: "Master Reductions & Participles",
      description: "Sıfat ve zarf cümlecikleri kısaltmaları (Participles), Gerund/Infinitive ayrımı, edilgen kısaltmalar ve reduction geometrisi.",
      pages: "300-339",
      sourceUnitIds: ["35", "39_2", "200", "201", "52"],
      icon: "🧪",
      lessonFilter: (l, origUnitId) => {
        if (origUnitId === "35") return true;
        if (origUnitId === "39_2" && ["c40_l5_merged", "c40_l6_merged", "c40_l7_merged"].includes(l.id)) return true;
        if (origUnitId === "200") return true;
        if (origUnitId === "201") return true;
        if (origUnitId === "52" && l.id === "c52_l1") return true;
        return false;
      }
    },
    {
      id: "36",
      title: "Hedging ve İhtimal Dili (Hedging Modality)",
      description: "Akademik yazımda kesinlik bildiren ifadeler yerine kullanılan hedging ve ihtimal dilleri.",
      pages: "340-359",
      sourceUnitIds: ["36"],
      icon: "🔍",
      lessonFilter: () => true
    },
    {
      id: "37",
      title: "Advanced Relative Clauses",
      description: "Tarih, hukuk, felsefe, sosyoloji, fen ve sağlık metinlerinde miktar, aitlik ve soyut zaman geçişleri.",
      pages: "360-399",
      sourceUnitIds: ["37"],
      icon: "📝",
      lessonFilter: () => true
    },
    {
      id: "38",
      title: "Master Inversion & Devriklik",
      description: "Akademik, edebi ve sınav düzeyinde (YDS/YÖKDİL) sıklık, kısıtlama, karşılaştırma ve koşul devriklikleri.",
      pages: "400-419",
      sourceUnitIds: ["38", "39_3", "51"],
      icon: "⚡",
      lessonFilter: (l, origUnitId) => {
        if (origUnitId === "38") return true;
        if (origUnitId === "39_3" && l.id === "c40_l8_merged") return true;
        if (origUnitId === "51" && l.id === "c51_l3") return true;
        return false;
      }
    },
    {
      id: "39",
      title: "Master Tenses, Conjunctions & Conditionals",
      description: "Zaman uyumları, bağlaçların sentaks kimliği, Type 0-1-2-3 & Mix koşul cümleleri ve devrik koşul yapıları.",
      pages: "420-479",
      sourceUnitIds: ["39", "39_2", "39_3", "105", "53", "55"],
      icon: "🛡️",
      lessonFilter: (l, origUnitId) => {
        if (origUnitId === "39") return true;
        if (origUnitId === "39_2" && l.id === "c40_l4_merged") return true;
        if (origUnitId === "39_3" && ["c40_l9_merged", "c40_l10_merged"].includes(l.id)) return true;
        if (origUnitId === "105") return true;
        if (origUnitId === "53") return true;
        if (origUnitId === "55") return true;
        return false;
      }
    },
    {
      id: "57",
      title: "Academic Verbs & Modals",
      description: "Akademik deyimsel fiiller (Phrasal Verbs) ve Phrasal Modal / Subjunctive matrisi.",
      pages: "480-499",
      sourceUnitIds: ["57", "42"],
      icon: "🎓",
      lessonFilter: () => true
    },
    {
      id: "52",
      title: "Akademik TIPS & Özel Yapılar",
      description: "As türevleri, Causative mühendisliği, Eşikte olma grubu, It-li pasif aktarımlar ve Subjunctive gizli şart kuralları.",
      pages: "500-519",
      sourceUnitIds: ["51", "52"],
      icon: "💡",
      lessonFilter: (l, origUnitId) => {
        if (origUnitId === "51" && ["c51_l1", "c51_l2"].includes(l.id)) return true;
        if (origUnitId === "52" && ["c52_l2", "c52_l3", "c52_l4"].includes(l.id)) return true;
        return false;
      }
    },
    {
      id: "43",
      title: "Multi-Element Verb Chains (5-8 Öğeli Yapılar)",
      description: "5, 6, 7 ve 8 öğeli karmaşık morfolojik fiil zincirleri, söylentili edelgin süreçler ve eylem trenleri.",
      pages: "520-559",
      sourceUnitIds: ["43", "47", "48", "44", "45", "46"],
      icon: "⚙️",
      lessonFilter: () => true
    },
    {
      id: "66",
      title: "Sınav Kilitleri & Hızlı Refleks Stratejileri",
      description: "Zaman kilitleri, esnek zaman alanları, since/for dünyası, recently/lately refleksleri ve 10 altın kural karma testleri.",
      pages: "560-579",
      sourceUnitIds: ["41", "66"],
      icon: "🔑",
      lessonFilter: () => true
    },
    {
      id: "49",
      title: "Ultimate Academic Exam Simulation & Challenge",
      description: "YDS/YÖKDİL gramer simülasyonları, TOEFL/IELTS cümle çözümlemeleri, hata avcılığı, çeviri challenge'ları ve büyük final zirvesi.",
      pages: "580-600",
      sourceUnitIds: ["49", "50", "39_3"],
      icon: "🏆",
      lessonFilter: (l, origUnitId) => {
        if (origUnitId === "49") return true;
        if (origUnitId === "50") return true;
        if (origUnitId === "39_3" && l.id === "c40_l11_merged") return true;
        return false;
      }
    }
  ];

  const lessonsCopy = [...lessons];
  const finalMergedUnits = [];
  const processedLessonIds = new Set();
  const finalLessons = [];

  newMergedUnits.forEach(newUnit => {
    const newUnitLessons = [];
    const mergedFormulas = [];

    newUnit.sourceUnitIds.forEach(sourceId => {
      const origUnit = units.find(u => String(u.id) === String(sourceId));
      if (!origUnit) return;

      origUnit.lessons.forEach(lId => {
        const lessonObj = lessonsCopy.find(l => String(l.id) === String(lId));
        if (!lessonObj) return;

        if (newUnit.lessonFilter(lessonObj, sourceId)) {
          lessonObj.unitId = newUnit.id;
          if (!processedLessonIds.has(lessonObj.id)) {
            processedLessonIds.add(lessonObj.id);
            finalLessons.push(lessonObj);
          }
          newUnitLessons.push(lessonObj.id);
        }
      });

      if (typeof rawTopics !== 'undefined') {
        const origTopic = rawTopics.find(t => String(t.id) === String(sourceId));
        if (origTopic && origTopic.formulas) {
          origTopic.formulas.forEach(f => {
            if (!mergedFormulas.some(mf => mf.formula === f.formula)) {
              mergedFormulas.push(f);
            }
          });
        }
      }
    });

    finalMergedUnits.push({
      id: newUnit.id,
      title: newUnit.title,
      description: newUnit.description,
      pages: newUnit.pages,
      lessons: newUnitLessons,
      icon: newUnit.icon,
      formulas: mergedFormulas
    });
  });

  const prefixUnits = units.slice(0, startIndex);
  const prefixLessons = lessonsCopy.filter(l => !processedLessonIds.has(l.id) && prefixUnits.some(pu => pu.lessons.includes(l.id)));

  units.length = 0;
  units.push(...prefixUnits, ...finalMergedUnits);

  lessons.length = 0;
  lessons.push(...prefixLessons, ...finalLessons);

  units.forEach(u => {
    u.lessons.forEach((lId, idx) => {
      const l = lessons.find(less => less.id === lId);
      if (l) {
        l.displayId = idx + 1;
        l.title = l.title.replace(/^\d+[\.:\s]*/, `${idx + 1}. `);
      }
    });
  });

  if (typeof rawTopics !== 'undefined') {
    const prefixTopics = rawTopics.slice(0, startIndex);
    const finalTopics = [];
    finalMergedUnits.forEach(mu => {
      finalTopics.push({
        id: mu.id,
        title: mu.title,
        desc: mu.description,
        icon: mu.icon || "🧪",
        numLessons: mu.lessons.length,
        formulas: mu.formulas || []
      });
    });

    rawTopics.length = 0;
    rawTopics.push(...prefixTopics, ...finalTopics);
  }
})();




// ==========================================
// BÖLÜM 29 DERS REORGANIZATION OVERRIDES
// ==========================================
(function() {
  if (typeof lessons !== 'undefined') {
    const overrides = [
  {
    "id": "c40_l1_merged",
    "unitId": 39,
    "title": "1. Zaman Uyumu & Kronolojik Öncelik Matrisi (by the time, since)",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "1. Zaman Uyumu & Kronolojik Öncelik Matrisi (by the time, since)",
      "teorikMantik": "Bu ders 1. Zaman Uyumu & Kronolojik Öncelik Matrisi (by the time, since) yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "By the time + V2 ➔ Had V3 | By the time + V1 ➔ Will Have V3 | Since + V2 ➔ Have/Has V3"
    },
    "exercises": [
      {
        "id": "c40_l1_merged_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c40_l1_merged_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The abstracts will analyze the academic provided that the accepted reform is approved.\"",
            "sentence": "The abstracts will analyze the academic provided that the accepted reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "ABSTRACTS uzmanı, accepted reformu onaylandığı sürece academic konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l1_merged_q2",
            "type": "true-false",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Is the following sentence grammatically correct according to Zaman Uyumu rules?<br><br>\"If the accepted had reviewed the account monographs, the achieve dispute would not have occurred.\"",
            "sentence": "If the accepted had reviewed the account monographs, the achieve dispute would not have occurred.",
            "englishPhrase": "If the accepted had reviewed the account monographs, the achieve dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer accepted account monografilerini inceleseydi, achieve anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c40_l1_merged_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The achieve insisted that the achieved committee ___ the constitutional adaptation policy.\"",
            "options": [
              "evaluated",
              "evaluates",
              "will evaluate",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "ACHIEVE uzmanı, achieved komitesinin anayasal adaptation politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l1_merged_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The adaptation will analyze the adapting provided that the adhere reform is approved.\"",
            "sentence": "The adaptation will analyze the adapting provided that the adhere reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "ADAPTATION uzmanı, adhere reformu onaylandığı sürece adapting konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l1_merged_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The adhere insisted that the adjectival committee ___ the constitutional administration policy.\"",
            "options": [
              "will evaluate",
              "evaluate",
              "evaluates",
              "evaluated"
            ],
            "correctIndex": 1,
            "translation": "ADHERE uzmanı, adjectival komitesinin anayasal administration politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l1_merged_q6",
            "type": "true-false",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Is the following sentence grammatically correct according to Zaman Uyumu rules?<br><br>\"If the administration had reviewed the admired monographs, the advanced dispute would not have occurred.\"",
            "sentence": "If the administration had reviewed the admired monographs, the advanced dispute would not have occurred.",
            "englishPhrase": "If the administration had reviewed the admired monographs, the advanced dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer administration admired monografilerini inceleseydi, advanced anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c40_l1_merged_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The advanced insisted that the adverb committee ___ the constitutional adverbial policy.\"",
            "options": [
              "evaluated",
              "evaluate",
              "evaluates",
              "will evaluate"
            ],
            "correctIndex": 1,
            "translation": "ADVANCED uzmanı, adverb komitesinin anayasal adverbial politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l1_merged_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The adverbial will analyze the affected provided that the after reform is approved.\"",
            "sentence": "The adverbial will analyze the affected provided that the after reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "ADVERBIAL uzmanı, after reformu onaylandığı sürece affected konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l1_merged_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The after insisted that the against committee ___ the constitutional agree policy.\"",
            "options": [
              "will evaluate",
              "evaluates",
              "evaluate",
              "evaluated"
            ],
            "correctIndex": 2,
            "translation": "AFTER uzmanı, against komitesinin anayasal agree politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l1_merged_q10",
            "type": "word-bank",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the agree was strict, the agreed community maintained its akademik.\"",
            "translation": "AGREE kuralları sert olmasına rağmen, agreed topluluğu akademik durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "agree",
              "was",
              "strict,",
              "the",
              "agreed",
              "community",
              "maintained",
              "its",
              "akademik."
            ],
            "words": [
              "Although",
              "the",
              "agree",
              "was",
              "strict,",
              "the",
              "agreed",
              "community",
              "maintained",
              "its",
              "akademik.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c40_l1_merged_q11",
            "type": "matching",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the akademik changes the policy, / the alarak will support the reform.\"",
            "pairs": [
              {
                "left": "If the akademik changes the policy,",
                "right": "the alarak will support the reform."
              },
              {
                "left": "Since the allow was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c40_l1_merged_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The allow insisted that the along committee ___ the constitutional also policy.\"",
            "options": [
              "evaluate",
              "evaluated",
              "evaluates",
              "will evaluate"
            ],
            "correctIndex": 0,
            "translation": "ALLOW uzmanı, along komitesinin anayasal also politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l1_merged_q13",
            "type": "matching",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the also changes the policy, / the alter will support the reform.\"",
            "pairs": [
              {
                "left": "If the also changes the policy,",
                "right": "the alter will support the reform."
              },
              {
                "left": "Since the altered was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c40_l1_merged_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The altered insisted that the although committee ___ the constitutional amended policy.\"",
            "options": [
              "evaluated",
              "evaluates",
              "evaluate",
              "will evaluate"
            ],
            "correctIndex": 2,
            "translation": "ALTERED uzmanı, although komitesinin anayasal amended politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l1_merged_q15",
            "type": "translation-text",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The amended concluded that the among and the analysis were stable.\"",
            "correctAnswer": "AMENDED uzmanı, among ve analysis durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "AMENDED uzmanı, among ve analysis durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c40_l2_merged",
    "unitId": 39,
    "title": "2. Akademik Koşul Yapıları & Gerçek Dışı Varsayımlar (if, provided that, unless, but for)",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "2. Akademik Koşul Yapıları & Gerçek Dışı Varsayımlar (if, provided that, unless, but for)",
      "teorikMantik": "Bu ders 2. Akademik Koşul Yapıları & Gerçek Dışı Varsayımlar (if, provided that, unless, but for) yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "If Type 1: Present ➔ Will V1 | Type 2: Past (V2) ➔ Would V1 | Type 3: Had V3 ➔ Would Have V3 | Wish + Past/Past Perfect"
    },
    "exercises": [
      {
        "id": "c40_l2_merged_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c40_l2_merged_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The analysis will analyze the analyze provided that the analyzed reform is approved.\"",
            "sentence": "The analysis will analyze the analyze provided that the analyzed reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "ANALYSIS uzmanı, analyzed reformu onaylandığı sürece analyze konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l2_merged_q2",
            "type": "true-false",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Is the following sentence grammatically correct according to Koşul Cümlecikleri (If Clauses) rules?<br><br>\"If the analyzed had reviewed the analyzing monographs, the ancient dispute would not have occurred.\"",
            "sentence": "If the analyzed had reviewed the analyzing monographs, the ancient dispute would not have occurred.",
            "englishPhrase": "If the analyzed had reviewed the analyzing monographs, the ancient dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer analyzed analyzing monografilerini inceleseydi, ancient anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c40_l2_merged_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The ancient insisted that the announced committee ___ the constitutional anthropologist policy.\"",
            "options": [
              "evaluates",
              "evaluate",
              "evaluated",
              "will evaluate"
            ],
            "correctIndex": 1,
            "translation": "ANCIENT uzmanı, announced komitesinin anayasal anthropologist politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l2_merged_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The anthropologist will analyze the anthropologists provided that the anticipate reform is approved.\"",
            "sentence": "The anthropologist will analyze the anthropologists provided that the anticipate reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "ANTHROPOLOGIST uzmanı, anticipate reformu onaylandığı sürece anthropologists konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l2_merged_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The anticipate insisted that the antropoloji committee ___ the constitutional applied policy.\"",
            "options": [
              "evaluates",
              "evaluate",
              "evaluated",
              "will evaluate"
            ],
            "correctIndex": 1,
            "translation": "ANTICIPATE uzmanı, antropoloji komitesinin anayasal applied politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l2_merged_q6",
            "type": "true-false",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Is the following sentence grammatically correct according to Koşul Cümlecikleri (If Clauses) rules?<br><br>\"If the applied had reviewed the approve monographs, the approved dispute would not have occurred.\"",
            "sentence": "If the applied had reviewed the approve monographs, the approved dispute would not have occurred.",
            "englishPhrase": "If the applied had reviewed the approve monographs, the approved dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer applied approve monografilerini inceleseydi, approved anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c40_l2_merged_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The approved insisted that the archaeological committee ___ the constitutional archaeologist policy.\"",
            "options": [
              "evaluate",
              "will evaluate",
              "evaluated",
              "evaluates"
            ],
            "correctIndex": 0,
            "translation": "APPROVED uzmanı, archaeological komitesinin anayasal archaeologist politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l2_merged_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The archaeologist will analyze the architecture provided that the archival reform is approved.\"",
            "sentence": "The archaeologist will analyze the architecture provided that the archival reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "ARCHAEOLOGIST uzmanı, archival reformu onaylandığı sürece architecture konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l2_merged_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The archival insisted that the archives committee ___ the constitutional artifacts policy.\"",
            "options": [
              "evaluates",
              "will evaluate",
              "evaluated",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "ARCHIVAL uzmanı, archives komitesinin anayasal artifacts politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l2_merged_q10",
            "type": "word-bank",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the artifacts was strict, the association community maintained its attached.\"",
            "translation": "ARTIFACTS kuralları sert olmasına rağmen, association topluluğu attached durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "artifacts",
              "was",
              "strict,",
              "the",
              "association",
              "community",
              "maintained",
              "its",
              "attached."
            ],
            "words": [
              "Although",
              "the",
              "artifacts",
              "was",
              "strict,",
              "the",
              "association",
              "community",
              "maintained",
              "its",
              "attached.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c40_l2_merged_q11",
            "type": "matching",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the attached changes the policy, / the attended will support the reform.\"",
            "pairs": [
              {
                "left": "If the attached changes the policy,",
                "right": "the attended will support the reform."
              },
              {
                "left": "Since the audience was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c40_l2_merged_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The audience insisted that the audit committee ___ the constitutional author policy.\"",
            "options": [
              "evaluate",
              "evaluates",
              "will evaluate",
              "evaluated"
            ],
            "correctIndex": 0,
            "translation": "AUDIENCE uzmanı, audit komitesinin anayasal author politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l2_merged_q13",
            "type": "matching",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the author changes the policy, / the authority will support the reform.\"",
            "pairs": [
              {
                "left": "If the author changes the policy,",
                "right": "the authority will support the reform."
              },
              {
                "left": "Since the authorize was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c40_l2_merged_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The authorize insisted that the auxiliary committee ___ the constitutional avoided policy.\"",
            "options": [
              "evaluated",
              "evaluates",
              "will evaluate",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "AUTHORIZE uzmanı, auxiliary komitesinin anayasal avoided politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l2_merged_q15",
            "type": "translation-text",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The avoided concluded that the bank and the barriers were stable.\"",
            "correctAnswer": "AVOIDED uzmanı, bank ve barriers durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "AVOIDED uzmanı, bank ve barriers durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c40_l3_merged",
    "unitId": 39,
    "title": "3. Subjunctive ve İstek/Zorunluluk Kip Kilitleri (demand that, it is crucial that, should)",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "3. Subjunctive ve İstek/Zorunluluk Kip Kilitleri (demand that, it is crucial that, should)",
      "teorikMantik": "Bu ders 3. Subjunctive ve İstek/Zorunluluk Kip Kilitleri (demand that, it is crucial that, should) yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "Subject + (insist/demand/recommend/suggest/require) + THAT + Subject + V0 (yalın) | It is vital/essential THAT + Subject + V0"
    },
    "exercises": [
      {
        "id": "c40_l3_merged_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c40_l3_merged_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Modallar (Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The barriers will analyze the based provided that the basit reform is approved.\"",
            "sentence": "The barriers will analyze the based provided that the basit reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "BARRIERS uzmanı, basit reformu onaylandığı sürece based konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l3_merged_q2",
            "type": "true-false",
            "grammarTags": [
              "Modallar (Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Is the following sentence grammatically correct according to Modallar (Modals) rules?<br><br>\"If the basit had reviewed the beautiful monographs, the because dispute would not have occurred.\"",
            "sentence": "If the basit had reviewed the beautiful monographs, the because dispute would not have occurred.",
            "englishPhrase": "If the basit had reviewed the beautiful monographs, the because dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer basit beautiful monografilerini inceleseydi, because anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c40_l3_merged_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Modallar (Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The because insisted that the been committee ___ the constitutional before policy.\"",
            "options": [
              "evaluated",
              "will evaluate",
              "evaluates",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "BECAUSE uzmanı, been komitesinin anayasal before politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l3_merged_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Modallar (Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The before will analyze the began provided that the behavior reform is approved.\"",
            "sentence": "The before will analyze the began provided that the behavior reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "BEFORE uzmanı, behavior reformu onaylandığı sürece began konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l3_merged_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Modallar (Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The behavior insisted that the behavioral committee ___ the constitutional behind policy.\"",
            "options": [
              "evaluates",
              "evaluate",
              "evaluated",
              "will evaluate"
            ],
            "correctIndex": 1,
            "translation": "BEHAVIOR uzmanı, behavioral komitesinin anayasal behind politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l3_merged_q6",
            "type": "true-false",
            "grammarTags": [
              "Modallar (Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Is the following sentence grammatically correct according to Modallar (Modals) rules?<br><br>\"If the behind had reviewed the bekleri monographs, the belirleyin dispute would not have occurred.\"",
            "sentence": "If the behind had reviewed the bekleri monographs, the belirleyin dispute would not have occurred.",
            "englishPhrase": "If the behind had reviewed the bekleri monographs, the belirleyin dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer behind bekleri monografilerini inceleseydi, belirleyin anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c40_l3_merged_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Modallar (Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The belirleyin insisted that the belirte committee ___ the constitutional biases policy.\"",
            "options": [
              "evaluated",
              "evaluate",
              "evaluates",
              "will evaluate"
            ],
            "correctIndex": 1,
            "translation": "BELIRLEYIN uzmanı, belirte komitesinin anayasal biases politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l3_merged_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Modallar (Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The biases will analyze the bildiren provided that the bilgisi reform is approved.\"",
            "sentence": "The biases will analyze the bildiren provided that the bilgisi reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "BIASES uzmanı, bilgisi reformu onaylandığı sürece bildiren konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l3_merged_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Modallar (Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The bilgisi insisted that the bilgisine committee ___ the constitutional board policy.\"",
            "options": [
              "will evaluate",
              "evaluates",
              "evaluated",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "BILGISI uzmanı, bilgisine komitesinin anayasal board politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l3_merged_q10",
            "type": "word-bank",
            "grammarTags": [
              "Modallar (Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the board was strict, the border community maintained its borders.\"",
            "translation": "BOARD kuralları sert olmasına rağmen, border topluluğu borders durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "board",
              "was",
              "strict,",
              "the",
              "border",
              "community",
              "maintained",
              "its",
              "borders."
            ],
            "words": [
              "Although",
              "the",
              "board",
              "was",
              "strict,",
              "the",
              "border",
              "community",
              "maintained",
              "its",
              "borders.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c40_l3_merged_q11",
            "type": "matching",
            "grammarTags": [
              "Modallar (Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the borders changes the policy, / the boundaries will support the reform.\"",
            "pairs": [
              {
                "left": "If the borders changes the policy,",
                "right": "the boundaries will support the reform."
              },
              {
                "left": "Since the boundary was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c40_l3_merged_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Modallar (Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The boundary insisted that the broadcast committee ___ the constitutional broadcasted policy.\"",
            "options": [
              "evaluated",
              "will evaluate",
              "evaluate",
              "evaluates"
            ],
            "correctIndex": 2,
            "translation": "BOUNDARY uzmanı, broadcast komitesinin anayasal broadcasted politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l3_merged_q13",
            "type": "matching",
            "grammarTags": [
              "Modallar (Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the broadcasted changes the policy, / the budget will support the reform.\"",
            "pairs": [
              {
                "left": "If the broadcasted changes the policy,",
                "right": "the budget will support the reform."
              },
              {
                "left": "Since the bulun was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c40_l3_merged_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Modallar (Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The bulun insisted that the business committee ___ the constitutional calibrated policy.\"",
            "options": [
              "evaluated",
              "will evaluate",
              "evaluates",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "BULUN uzmanı, business komitesinin anayasal calibrated politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l3_merged_q15",
            "type": "translation-text",
            "grammarTags": [
              "Modallar (Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The calibrated concluded that the case and the cause were stable.\"",
            "correctAnswer": "CALIBRATED uzmanı, case ve cause durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "CALIBRATED uzmanı, case ve cause durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c40_l4_merged",
    "unitId": 39,
    "title": "4. Edat Takımları & Akademik Niteleme Öbekleri (in terms of, with respect to, by means of)",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "4. Edat Takımları & Akademik Niteleme Öbekleri (in terms of, with respect to, by means of)",
      "teorikMantik": "Bu ders 4. Edat Takımları & Akademik Niteleme Öbekleri (in terms of, with respect to, by means of) yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "Verb + THAT + SVO (Bildirim) | Verb + WHETHER/IF + SVO (Olup olmadığı) | Prep + WH- word + SVO (Preposition arkasından THAT gelemez!)"
    },
    "exercises": [
      {
        "id": "c40_l4_merged_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c40_l4_merged_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Sıfat Cümlecikleri (Relative Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The cause will analyze the censorship provided that the center reform is approved.\"",
            "sentence": "The cause will analyze the censorship provided that the center reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "CAUSE uzmanı, center reformu onaylandığı sürece censorship konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l4_merged_q2",
            "type": "true-false",
            "grammarTags": [
              "Sıfat Cümlecikleri (Relative Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Is the following sentence grammatically correct according to Sıfat Cümlecikleri (Relative Clauses) rules?<br><br>\"If the center had reviewed the central monographs, the certificate dispute would not have occurred.\"",
            "sentence": "If the center had reviewed the central monographs, the certificate dispute would not have occurred.",
            "englishPhrase": "If the center had reviewed the central monographs, the certificate dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer center central monografilerini inceleseydi, certificate anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c40_l4_merged_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Sıfat Cümlecikleri (Relative Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sinema"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The certificate insisted that the chairs committee ___ the constitutional challenged policy.\"",
            "options": [
              "will evaluate",
              "evaluates",
              "evaluated",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "CERTIFICATE uzmanı, chairs komitesinin anayasal challenged politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l4_merged_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Sıfat Cümlecikleri (Relative Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The challenged will analyze the change provided that the changes reform is approved.\"",
            "sentence": "The challenged will analyze the change provided that the changes reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "CHALLENGED uzmanı, changes reformu onaylandığı sürece change konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l4_merged_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Sıfat Cümlecikleri (Relative Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The changes insisted that the cinema committee ___ the constitutional circumstances policy.\"",
            "options": [
              "evaluate",
              "will evaluate",
              "evaluates",
              "evaluated"
            ],
            "correctIndex": 0,
            "translation": "CHANGES uzmanı, cinema komitesinin anayasal circumstances politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l4_merged_q6",
            "type": "true-false",
            "grammarTags": [
              "Sıfat Cümlecikleri (Relative Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sinema"
            ],
            "prompt": "Is the following sentence grammatically correct according to Sıfat Cümlecikleri (Relative Clauses) rules?<br><br>\"If the circumstances had reviewed the civil monographs, the civilization dispute would not have occurred.\"",
            "sentence": "If the circumstances had reviewed the civil monographs, the civilization dispute would not have occurred.",
            "englishPhrase": "If the circumstances had reviewed the civil monographs, the civilization dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer circumstances civil monografilerini inceleseydi, civilization anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c40_l4_merged_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Sıfat Cümlecikleri (Relative Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The civilization insisted that the civilizations committee ___ the constitutional claims policy.\"",
            "options": [
              "evaluate",
              "evaluated",
              "will evaluate",
              "evaluates"
            ],
            "correctIndex": 0,
            "translation": "CIVILIZATION uzmanı, civilizations komitesinin anayasal claims politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l4_merged_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Sıfat Cümlecikleri (Relative Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The claims will analyze the clauses provided that the clear reform is approved.\"",
            "sentence": "The claims will analyze the clauses provided that the clear reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "CLAIMS uzmanı, clear reformu onaylandığı sürece clauses konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l4_merged_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Sıfat Cümlecikleri (Relative Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sinema"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The clear insisted that the cognitive committee ___ the constitutional collapse policy.\"",
            "options": [
              "evaluates",
              "evaluated",
              "evaluate",
              "will evaluate"
            ],
            "correctIndex": 2,
            "translation": "CLEAR uzmanı, cognitive komitesinin anayasal collapse politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l4_merged_q10",
            "type": "word-bank",
            "grammarTags": [
              "Sıfat Cümlecikleri (Relative Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the collapse was strict, the collapsed community maintained its collected.\"",
            "translation": "COLLAPSE kuralları sert olmasına rağmen, collapsed topluluğu collected durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "collapse",
              "was",
              "strict,",
              "the",
              "collapsed",
              "community",
              "maintained",
              "its",
              "collected."
            ],
            "words": [
              "Although",
              "the",
              "collapse",
              "was",
              "strict,",
              "the",
              "collapsed",
              "community",
              "maintained",
              "its",
              "collected.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c40_l4_merged_q11",
            "type": "matching",
            "grammarTags": [
              "Sıfat Cümlecikleri (Relative Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the collected changes the policy, / the collective will support the reform.\"",
            "pairs": [
              {
                "left": "If the collected changes the policy,",
                "right": "the collective will support the reform."
              },
              {
                "left": "Since the columns was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c40_l4_merged_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Sıfat Cümlecikleri (Relative Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sinema"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The columns insisted that the commercial committee ___ the constitutional committee policy.\"",
            "options": [
              "will evaluate",
              "evaluate",
              "evaluated",
              "evaluates"
            ],
            "correctIndex": 1,
            "translation": "COLUMNS uzmanı, commercial komitesinin anayasal committee politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l4_merged_q13",
            "type": "matching",
            "grammarTags": [
              "Sıfat Cümlecikleri (Relative Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the committee changes the policy, / the community will support the reform.\"",
            "pairs": [
              {
                "left": "If the committee changes the policy,",
                "right": "the community will support the reform."
              },
              {
                "left": "Since the comparative was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c40_l4_merged_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Sıfat Cümlecikleri (Relative Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The comparative insisted that the complete committee ___ the constitutional completed policy.\"",
            "options": [
              "evaluate",
              "evaluated",
              "will evaluate",
              "evaluates"
            ],
            "correctIndex": 0,
            "translation": "COMPARATIVE uzmanı, complete komitesinin anayasal completed politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l4_merged_q15",
            "type": "translation-text",
            "grammarTags": [
              "Sıfat Cümlecikleri (Relative Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sinema"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The completed concluded that the completely and the complex were stable.\"",
            "correctAnswer": "COMPLETED uzmanı, completely ve complex durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "COMPLETED uzmanı, completely ve complex durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c40_l9_merged",
    "unitId": 39,
    "title": "5. Zıtlık & Nedensellik Bağlaçlarında Terazi Dengesi (although, because, whereas, despite)",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "5. Zıtlık & Nedensellik Bağlaçlarında Terazi Dengesi (although, because, whereas, despite)",
      "teorikMantik": "Bu ders 5. Zıtlık & Nedensellik Bağlaçlarında Terazi Dengesi (although, because, whereas, despite) yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "Zıtlık Cümle: Although / Even though + SVO | Zıtlık İsim: In spite of / Despite + Noun/V-ing | Geçiş: ; however, / ; therefore,"
    },
    "exercises": [
      {
        "id": "c40_l9_merged_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c40_l9_merged_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The complex will analyze the concerned provided that the concessive reform is approved.\"",
            "sentence": "The complex will analyze the concerned provided that the concessive reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "COMPLEX uzmanı, concessive reformu onaylandığı sürece concerned konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l9_merged_q2",
            "type": "true-false",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Is the following sentence grammatically correct according to Bağlaçlar rules?<br><br>\"If the concessive had reviewed the conclusions monographs, the condition dispute would not have occurred.\"",
            "sentence": "If the concessive had reviewed the conclusions monographs, the condition dispute would not have occurred.",
            "englishPhrase": "If the concessive had reviewed the conclusions monographs, the condition dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer concessive conclusions monografilerini inceleseydi, condition anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c40_l9_merged_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The condition insisted that the conditional committee ___ the constitutional conditionals policy.\"",
            "options": [
              "will evaluate",
              "evaluates",
              "evaluate",
              "evaluated"
            ],
            "correctIndex": 2,
            "translation": "CONDITION uzmanı, conditional komitesinin anayasal conditionals politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l9_merged_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The conditionals will analyze the conduct provided that the conducting reform is approved.\"",
            "sentence": "The conditionals will analyze the conduct provided that the conducting reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "CONDITIONALS uzmanı, conducting reformu onaylandığı sürece conduct konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l9_merged_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The conducting insisted that the conference committee ___ the constitutional conflict policy.\"",
            "options": [
              "will evaluate",
              "evaluate",
              "evaluated",
              "evaluates"
            ],
            "correctIndex": 1,
            "translation": "CONDUCTING uzmanı, conference komitesinin anayasal conflict politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l9_merged_q6",
            "type": "true-false",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Is the following sentence grammatically correct according to Bağlaçlar rules?<br><br>\"If the conflict had reviewed the conjunction monographs, the connection dispute would not have occurred.\"",
            "sentence": "If the conflict had reviewed the conjunction monographs, the connection dispute would not have occurred.",
            "englishPhrase": "If the conflict had reviewed the conjunction monographs, the connection dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer conflict conjunction monografilerini inceleseydi, connection anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c40_l9_merged_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The connection insisted that the connector committee ___ the constitutional consequences policy.\"",
            "options": [
              "evaluated",
              "evaluate",
              "will evaluate",
              "evaluates"
            ],
            "correctIndex": 1,
            "translation": "CONNECTION uzmanı, connector komitesinin anayasal consequences politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l9_merged_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The consequences will analyze the constitutional provided that the contact reform is approved.\"",
            "sentence": "The consequences will analyze the constitutional provided that the contact reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "CONSEQUENCES uzmanı, contact reformu onaylandığı sürece constitutional konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l9_merged_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The contact insisted that the contain committee ___ the constitutional contained policy.\"",
            "options": [
              "evaluated",
              "evaluate",
              "evaluates",
              "will evaluate"
            ],
            "correctIndex": 1,
            "translation": "CONTACT uzmanı, contain komitesinin anayasal contained politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l9_merged_q10",
            "type": "word-bank",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the contained was strict, the containing community maintained its contains.\"",
            "translation": "CONTAINED kuralları sert olmasına rağmen, containing topluluğu contains durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "contained",
              "was",
              "strict,",
              "the",
              "containing",
              "community",
              "maintained",
              "its",
              "contains."
            ],
            "words": [
              "Although",
              "the",
              "contained",
              "was",
              "strict,",
              "the",
              "containing",
              "community",
              "maintained",
              "its",
              "contains.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c40_l9_merged_q11",
            "type": "matching",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the contains changes the policy, / the continuous will support the reform.\"",
            "pairs": [
              {
                "left": "If the contains changes the policy,",
                "right": "the continuous will support the reform."
              },
              {
                "left": "Since the contract was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c40_l9_merged_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The contract insisted that the contradiction committee ___ the constitutional contrast policy.\"",
            "options": [
              "evaluated",
              "evaluate",
              "will evaluate",
              "evaluates"
            ],
            "correctIndex": 1,
            "translation": "CONTRACT uzmanı, contradiction komitesinin anayasal contrast politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l9_merged_q13",
            "type": "matching",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the contrast changes the policy, / the controversial will support the reform.\"",
            "pairs": [
              {
                "left": "If the contrast changes the policy,",
                "right": "the controversial will support the reform."
              },
              {
                "left": "Since the convene was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c40_l9_merged_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The convene insisted that the coordinator committee ___ the constitutional corrupted policy.\"",
            "options": [
              "evaluates",
              "evaluate",
              "will evaluate",
              "evaluated"
            ],
            "correctIndex": 1,
            "translation": "CONVENE uzmanı, coordinator komitesinin anayasal corrupted politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l9_merged_q15",
            "type": "translation-text",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The corrupted concluded that the could and the council were stable.\"",
            "correctAnswer": "CORRUPTED uzmanı, could ve council durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "CORRUPTED uzmanı, could ve council durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c40_l10_merged",
    "unitId": 39,
    "title": "6. Geçmişe Yönelik Çıkarım & Pişmanlık Modalları (must have V3, should have V3, might have V3)",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "6. Geçmişe Yönelik Çıkarım & Pişmanlık Modalları (must have V3, should have V3, might have V3)",
      "teorikMantik": "Bu ders 6. Geçmişe Yönelik Çıkarım & Pişmanlık Modalları (must have V3, should have V3, might have V3) yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "Must have V3 (Geçmişte yüksek ihtimal) | Can't / Couldn't have V3 (İmkansızlık) | Should have V3 (Yapılmalıydı ama yapılmadı) | Needn't have V3 (Yapıldı ama gereksizdi)"
    },
    "exercises": [
      {
        "id": "c40_l10_merged_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c40_l10_merged_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Geçmiş Zaman Modalları (Perfect Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The council will analyze the court provided that the crash reform is approved.\"",
            "sentence": "The council will analyze the court provided that the crash reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "COUNCIL uzmanı, crash reformu onaylandığı sürece court konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l10_merged_q2",
            "type": "true-false",
            "grammarTags": [
              "Geçmiş Zaman Modalları (Perfect Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Is the following sentence grammatically correct according to Geçmiş Zaman Modalları (Perfect Modals) rules?<br><br>\"If the crash had reviewed the crisis monographs, the critic dispute would not have occurred.\"",
            "sentence": "If the crash had reviewed the crisis monographs, the critic dispute would not have occurred.",
            "englishPhrase": "If the crash had reviewed the crisis monographs, the critic dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer crash crisis monografilerini inceleseydi, critic anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c40_l10_merged_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Geçmiş Zaman Modalları (Perfect Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Humanities"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The critic insisted that the critical committee ___ the constitutional critics policy.\"",
            "options": [
              "evaluate",
              "will evaluate",
              "evaluated",
              "evaluates"
            ],
            "correctIndex": 0,
            "translation": "CRITIC uzmanı, critical komitesinin anayasal critics politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l10_merged_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Geçmiş Zaman Modalları (Perfect Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The critics will analyze the cross provided that the cultural reform is approved.\"",
            "sentence": "The critics will analyze the cross provided that the cultural reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "CRITICS uzmanı, cultural reformu onaylandığı sürece cross konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l10_merged_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Geçmiş Zaman Modalları (Perfect Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The cultural insisted that the daki committee ___ the constitutional data policy.\"",
            "options": [
              "will evaluate",
              "evaluates",
              "evaluated",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "CULTURAL uzmanı, daki komitesinin anayasal data politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l10_merged_q6",
            "type": "true-false",
            "grammarTags": [
              "Geçmiş Zaman Modalları (Perfect Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Humanities"
            ],
            "prompt": "Is the following sentence grammatically correct according to Geçmiş Zaman Modalları (Perfect Modals) rules?<br><br>\"If the data had reviewed the debate monographs, the decade dispute would not have occurred.\"",
            "sentence": "If the data had reviewed the debate monographs, the decade dispute would not have occurred.",
            "englishPhrase": "If the data had reviewed the debate monographs, the decade dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer data debate monografilerini inceleseydi, decade anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c40_l10_merged_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Geçmiş Zaman Modalları (Perfect Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The decade insisted that the decision committee ___ the constitutional decrease policy.\"",
            "options": [
              "evaluates",
              "will evaluate",
              "evaluate",
              "evaluated"
            ],
            "correctIndex": 2,
            "translation": "DECADE uzmanı, decision komitesinin anayasal decrease politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l10_merged_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Geçmiş Zaman Modalları (Perfect Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The decrease will analyze the deficit provided that the definitive reform is approved.\"",
            "sentence": "The decrease will analyze the deficit provided that the definitive reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "DECREASE uzmanı, definitive reformu onaylandığı sürece deficit konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c40_l10_merged_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Geçmiş Zaman Modalları (Perfect Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Humanities"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The definitive insisted that the demographic committee ___ the constitutional demonstrate policy.\"",
            "options": [
              "evaluated",
              "will evaluate",
              "evaluate",
              "evaluates"
            ],
            "correctIndex": 2,
            "translation": "DEFINITIVE uzmanı, demographic komitesinin anayasal demonstrate politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l10_merged_q10",
            "type": "word-bank",
            "grammarTags": [
              "Geçmiş Zaman Modalları (Perfect Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the demonstrate was strict, the demonstrated community maintained its department.\"",
            "translation": "DEMONSTRATE kuralları sert olmasına rağmen, demonstrated topluluğu department durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "demonstrate",
              "was",
              "strict,",
              "the",
              "demonstrated",
              "community",
              "maintained",
              "its",
              "department."
            ],
            "words": [
              "Although",
              "the",
              "demonstrate",
              "was",
              "strict,",
              "the",
              "demonstrated",
              "community",
              "maintained",
              "its",
              "department.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c40_l10_merged_q11",
            "type": "matching",
            "grammarTags": [
              "Geçmiş Zaman Modalları (Perfect Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the department changes the policy, / the deploy will support the reform.\"",
            "pairs": [
              {
                "left": "If the department changes the policy,",
                "right": "the deploy will support the reform."
              },
              {
                "left": "Since the deployment was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c40_l10_merged_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Geçmiş Zaman Modalları (Perfect Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Humanities"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The deployment insisted that the determiner committee ___ the constitutional devrik policy.\"",
            "options": [
              "evaluated",
              "will evaluate",
              "evaluate",
              "evaluates"
            ],
            "correctIndex": 2,
            "translation": "DEPLOYMENT uzmanı, determiner komitesinin anayasal devrik politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l10_merged_q13",
            "type": "matching",
            "grammarTags": [
              "Geçmiş Zaman Modalları (Perfect Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the devrik changes the policy, / the devriklik will support the reform.\"",
            "pairs": [
              {
                "left": "If the devrik changes the policy,",
                "right": "the devriklik will support the reform."
              },
              {
                "left": "Since the devrikliklerini was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c40_l10_merged_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Geçmiş Zaman Modalları (Perfect Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The devrikliklerini insisted that the difficult committee ___ the constitutional directional policy.\"",
            "options": [
              "evaluate",
              "evaluated",
              "evaluates",
              "will evaluate"
            ],
            "correctIndex": 0,
            "translation": "DEVRIKLIKLERINI uzmanı, difficult komitesinin anayasal directional politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c40_l10_merged_q15",
            "type": "translation-text",
            "grammarTags": [
              "Geçmiş Zaman Modalları (Perfect Modals)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Humanities"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The directional concluded that the directly and the director were stable.\"",
            "correctAnswer": "DIRECTIONAL uzmanı, directly ve director durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "DIRECTIONAL uzmanı, directly ve director durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c105_l1",
    "unitId": 39,
    "title": "7. Formül Eşleştirme Kılavuzu",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "7. Formül Eşleştirme Kılavuzu",
      "teorikMantik": "Bu ders 7. Formül Eşleştirme Kılavuzu yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "Since + V2 ➔ have/has + V3 | By the time + V2 ➔ had + V3 | By the time + V1 ➔ will have + V3"
    },
    "exercises": [
      {
        "id": "c105_l1_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c105_l1_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The director will analyze the discover provided that the discovery reform is approved.\"",
            "sentence": "The director will analyze the discover provided that the discovery reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "DIRECTOR uzmanı, discovery reformu onaylandığı sürece discover konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c105_l1_q2",
            "type": "true-false",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Is the following sentence grammatically correct according to Zaman Uyumu rules?<br><br>\"If the discovery had reviewed the dispute monographs, the disputes dispute would not have occurred.\"",
            "sentence": "If the discovery had reviewed the dispute monographs, the disputes dispute would not have occurred.",
            "englishPhrase": "If the discovery had reviewed the dispute monographs, the disputes dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer discovery dispute monografilerini inceleseydi, disputes anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c105_l1_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Arkeoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The disputes insisted that the distribution committee ___ the constitutional dizerek policy.\"",
            "options": [
              "will evaluate",
              "evaluates",
              "evaluate",
              "evaluated"
            ],
            "correctIndex": 2,
            "translation": "DISPUTES uzmanı, distribution komitesinin anayasal dizerek politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l1_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The dizerek will analyze the document provided that the documentary reform is approved.\"",
            "sentence": "The dizerek will analyze the document provided that the documentary reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "DIZEREK uzmanı, documentary reformu onaylandığı sürece document konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c105_l1_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The documentary insisted that the documented committee ___ the constitutional documents policy.\"",
            "options": [
              "will evaluate",
              "evaluate",
              "evaluates",
              "evaluated"
            ],
            "correctIndex": 1,
            "translation": "DOCUMENTARY uzmanı, documented komitesinin anayasal documents politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l1_q6",
            "type": "true-false",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Arkeoloji"
            ],
            "prompt": "Is the following sentence grammatically correct according to Zaman Uyumu rules?<br><br>\"If the documents had reviewed the does monographs, the doldurun dispute would not have occurred.\"",
            "sentence": "If the documents had reviewed the does monographs, the doldurun dispute would not have occurred.",
            "englishPhrase": "If the documents had reviewed the does monographs, the doldurun dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer documents does monografilerini inceleseydi, doldurun anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c105_l1_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The doldurun insisted that the drama committee ___ the constitutional dramatically policy.\"",
            "options": [
              "evaluate",
              "will evaluate",
              "evaluated",
              "evaluates"
            ],
            "correctIndex": 0,
            "translation": "DOLDURUN uzmanı, drama komitesinin anayasal dramatically politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l1_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The dramatically will analyze the dropped provided that the during reform is approved.\"",
            "sentence": "The dramatically will analyze the dropped provided that the during reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "DRAMATICALLY uzmanı, during reformu onaylandığı sürece dropped konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c105_l1_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Arkeoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The during insisted that the dynamics committee ___ the constitutional earlier policy.\"",
            "options": [
              "will evaluate",
              "evaluate",
              "evaluated",
              "evaluates"
            ],
            "correctIndex": 1,
            "translation": "DURING uzmanı, dynamics komitesinin anayasal earlier politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l1_q10",
            "type": "word-bank",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the earlier was strict, the early community maintained its economic.\"",
            "translation": "EARLIER kuralları sert olmasına rağmen, early topluluğu economic durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "earlier",
              "was",
              "strict,",
              "the",
              "early",
              "community",
              "maintained",
              "its",
              "economic."
            ],
            "words": [
              "Although",
              "the",
              "earlier",
              "was",
              "strict,",
              "the",
              "early",
              "community",
              "maintained",
              "its",
              "economic.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c105_l1_q11",
            "type": "matching",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the economic changes the policy, / the economist will support the reform.\"",
            "pairs": [
              {
                "left": "If the economic changes the policy,",
                "right": "the economist will support the reform."
              },
              {
                "left": "Since the economists was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c105_l1_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Arkeoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The economists insisted that the economy committee ___ the constitutional edat policy.\"",
            "options": [
              "will evaluate",
              "evaluates",
              "evaluate",
              "evaluated"
            ],
            "correctIndex": 2,
            "translation": "ECONOMISTS uzmanı, economy komitesinin anayasal edat politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l1_q13",
            "type": "matching",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the edat changes the policy, / the edebi will support the reform.\"",
            "pairs": [
              {
                "left": "If the edat changes the policy,",
                "right": "the edebi will support the reform."
              },
              {
                "left": "Since the edebiyat was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c105_l1_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The edebiyat insisted that the edilgen committee ___ the constitutional effective policy.\"",
            "options": [
              "evaluated",
              "evaluates",
              "evaluate",
              "will evaluate"
            ],
            "correctIndex": 2,
            "translation": "EDEBIYAT uzmanı, edilgen komitesinin anayasal effective politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l1_q15",
            "type": "translation-text",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Arkeoloji"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The effective concluded that the efficiently and the ekilde were stable.\"",
            "correctAnswer": "EFFECTIVE uzmanı, efficiently ve ekilde durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "EFFECTIVE uzmanı, efficiently ve ekilde durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c105_l2",
    "unitId": 39,
    "title": "8. Hata Avcısı: Zaman Uyumları",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "8. Hata Avcısı: Zaman Uyumları",
      "teorikMantik": "Bu ders 8. Hata Avcısı: Zaman Uyumları yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "Uzak Durulması Gereken Tense Çiftleri: *Am-is-are / Would V0* | *Would V0 / Would V0* | *Had V3 / am-is-are*"
    },
    "exercises": [
      {
        "id": "c105_l2_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c105_l2_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The ekilde will analyze the ekimini provided that the else reform is approved.\"",
            "sentence": "The ekilde will analyze the ekimini provided that the else reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "EKILDE uzmanı, else reformu onaylandığı sürece ekimini konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c105_l2_q2",
            "type": "true-false",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Is the following sentence grammatically correct according to Zaman Uyumu rules?<br><br>\"If the else had reviewed the emphasis monographs, the emphasize dispute would not have occurred.\"",
            "sentence": "If the else had reviewed the emphasis monographs, the emphasize dispute would not have occurred.",
            "englishPhrase": "If the else had reviewed the emphasis monographs, the emphasize dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer else emphasis monografilerini inceleseydi, emphasize anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c105_l2_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The emphasize insisted that the empire committee ___ the constitutional empirical policy.\"",
            "options": [
              "will evaluate",
              "evaluates",
              "evaluate",
              "evaluated"
            ],
            "correctIndex": 2,
            "translation": "EMPHASIZE uzmanı, empire komitesinin anayasal empirical politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l2_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The empirical will analyze the encountered provided that the endorse reform is approved.\"",
            "sentence": "The empirical will analyze the encountered provided that the endorse reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "EMPIRICAL uzmanı, endorse reformu onaylandığı sürece encountered konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c105_l2_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The endorse insisted that the entirely committee ___ the constitutional erlendirin policy.\"",
            "options": [
              "evaluate",
              "evaluates",
              "evaluated",
              "will evaluate"
            ],
            "correctIndex": 0,
            "translation": "ENDORSE uzmanı, entirely komitesinin anayasal erlendirin politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l2_q6",
            "type": "true-false",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Is the following sentence grammatically correct according to Zaman Uyumu rules?<br><br>\"If the erlendirin had reviewed the error monographs, the errors dispute would not have occurred.\"",
            "sentence": "If the erlendirin had reviewed the error monographs, the errors dispute would not have occurred.",
            "englishPhrase": "If the erlendirin had reviewed the error monographs, the errors dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer erlendirin error monografilerini inceleseydi, errors anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c105_l2_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The errors insisted that the esas committee ___ the constitutional ethnographic policy.\"",
            "options": [
              "will evaluate",
              "evaluates",
              "evaluated",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "ERRORS uzmanı, esas komitesinin anayasal ethnographic politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l2_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The ethnographic will analyze the evaluated provided that the evidence reform is approved.\"",
            "sentence": "The ethnographic will analyze the evaluated provided that the evidence reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "ETHNOGRAPHIC uzmanı, evidence reformu onaylandığı sürece evaluated konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c105_l2_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The evidence insisted that the evirin committee ___ the constitutional examine policy.\"",
            "options": [
              "evaluate",
              "evaluated",
              "evaluates",
              "will evaluate"
            ],
            "correctIndex": 0,
            "translation": "EVIDENCE uzmanı, evirin komitesinin anayasal examine politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l2_q10",
            "type": "word-bank",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the examine was strict, the examined community maintained its examining.\"",
            "translation": "EXAMINE kuralları sert olmasına rağmen, examined topluluğu examining durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "examine",
              "was",
              "strict,",
              "the",
              "examined",
              "community",
              "maintained",
              "its",
              "examining."
            ],
            "words": [
              "Although",
              "the",
              "examine",
              "was",
              "strict,",
              "the",
              "examined",
              "community",
              "maintained",
              "its",
              "examining.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c105_l2_q11",
            "type": "matching",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the examining changes the policy, / the excavation will support the reform.\"",
            "pairs": [
              {
                "left": "If the examining changes the policy,",
                "right": "the excavation will support the reform."
              },
              {
                "left": "Since the excavations was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c105_l2_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The excavations insisted that the exception committee ___ the constitutional exhibition policy.\"",
            "options": [
              "evaluate",
              "evaluates",
              "evaluated",
              "will evaluate"
            ],
            "correctIndex": 0,
            "translation": "EXCAVATIONS uzmanı, exception komitesinin anayasal exhibition politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l2_q13",
            "type": "matching",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the exhibition changes the policy, / the expand will support the reform.\"",
            "pairs": [
              {
                "left": "If the exhibition changes the policy,",
                "right": "the expand will support the reform."
              },
              {
                "left": "Since the expanded was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c105_l2_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The expanded insisted that the experience committee ___ the constitutional experiments policy.\"",
            "options": [
              "evaluate",
              "evaluates",
              "will evaluate",
              "evaluated"
            ],
            "correctIndex": 0,
            "translation": "EXPANDED uzmanı, experience komitesinin anayasal experiments politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l2_q15",
            "type": "translation-text",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The experiments concluded that the experts and the explained were stable.\"",
            "correctAnswer": "EXPERIMENTS uzmanı, experts ve explained durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "EXPERIMENTS uzmanı, experts ve explained durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c105_l3",
    "unitId": 39,
    "title": "9. Zaman Uyumu Denklem Çözücü",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "9. Zaman Uyumu Denklem Çözücü",
      "teorikMantik": "Bu ders 9. Zaman Uyumu Denklem Çözücü yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "Ortak Özne: [S + V_A + and + V_B] ➔ A & B paralel / Yan Cümlede Will/Would Yasası / Recently-Lately ➔ Present Perfect / İki Perfect Yan Yana Gelmez"
    },
    "exercises": [
      {
        "id": "c105_l3_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c105_l3_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The explained will analyze the explaining provided that the eylemsi reform is approved.\"",
            "sentence": "The explained will analyze the explaining provided that the eylemsi reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "EXPLAINED uzmanı, eylemsi reformu onaylandığı sürece explaining konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c105_l3_q2",
            "type": "true-false",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Is the following sentence grammatically correct according to Zaman Uyumu rules?<br><br>\"If the eylemsi had reviewed the face monographs, the faced dispute would not have occurred.\"",
            "sentence": "If the eylemsi had reviewed the face monographs, the faced dispute would not have occurred.",
            "englishPhrase": "If the eylemsi had reviewed the face monographs, the faced dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer eylemsi face monografilerini inceleseydi, faced anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c105_l3_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The faced insisted that the facing committee ___ the constitutional fails policy.\"",
            "options": [
              "evaluate",
              "will evaluate",
              "evaluates",
              "evaluated"
            ],
            "correctIndex": 0,
            "translation": "FACED uzmanı, facing komitesinin anayasal fails politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l3_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The fails will analyze the favorable provided that the feedback reform is approved.\"",
            "sentence": "The fails will analyze the favorable provided that the feedback reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "FAILS uzmanı, feedback reformu onaylandığı sürece favorable konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c105_l3_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The feedback insisted that the field committee ___ the constitutional fiil policy.\"",
            "options": [
              "evaluated",
              "evaluates",
              "will evaluate",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "FEEDBACK uzmanı, field komitesinin anayasal fiil politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l3_q6",
            "type": "true-false",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Is the following sentence grammatically correct according to Zaman Uyumu rules?<br><br>\"If the fiil had reviewed the fiili monographs, the fiilinin dispute would not have occurred.\"",
            "sentence": "If the fiil had reviewed the fiili monographs, the fiilinin dispute would not have occurred.",
            "englishPhrase": "If the fiil had reviewed the fiili monographs, the fiilinin dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer fiil fiili monografilerini inceleseydi, fiilinin anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c105_l3_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The fiilinin insisted that the files committee ___ the constitutional film policy.\"",
            "options": [
              "evaluated",
              "will evaluate",
              "evaluates",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "FIILININ uzmanı, files komitesinin anayasal film politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l3_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The film will analyze the financial provided that the find reform is approved.\"",
            "sentence": "The film will analyze the financial provided that the find reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "FILM uzmanı, find reformu onaylandığı sürece financial konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c105_l3_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The find insisted that the findings committee ___ the constitutional finished policy.\"",
            "options": [
              "evaluated",
              "will evaluate",
              "evaluates",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "FIND uzmanı, findings komitesinin anayasal finished politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l3_q10",
            "type": "word-bank",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the finished was strict, the fiscal community maintained its fluctuations.\"",
            "translation": "FINISHED kuralları sert olmasına rağmen, fiscal topluluğu fluctuations durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "finished",
              "was",
              "strict,",
              "the",
              "fiscal",
              "community",
              "maintained",
              "its",
              "fluctuations."
            ],
            "words": [
              "Although",
              "the",
              "finished",
              "was",
              "strict,",
              "the",
              "fiscal",
              "community",
              "maintained",
              "its",
              "fluctuations.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c105_l3_q11",
            "type": "matching",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the fluctuations changes the policy, / the forma will support the reform.\"",
            "pairs": [
              {
                "left": "If the fluctuations changes the policy,",
                "right": "the forma will support the reform."
              },
              {
                "left": "Since the formda was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c105_l3_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The formda insisted that the founder committee ___ the constitutional framework policy.\"",
            "options": [
              "evaluate",
              "evaluated",
              "evaluates",
              "will evaluate"
            ],
            "correctIndex": 0,
            "translation": "FORMDA uzmanı, founder komitesinin anayasal framework politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l3_q13",
            "type": "matching",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the framework changes the policy, / the further will support the reform.\"",
            "pairs": [
              {
                "left": "If the framework changes the policy,",
                "right": "the further will support the reform."
              },
              {
                "left": "Since the furthermore was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c105_l3_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The furthermore insisted that the future committee ___ the constitutional gardens policy.\"",
            "options": [
              "evaluates",
              "evaluated",
              "will evaluate",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "FURTHERMORE uzmanı, future komitesinin anayasal gardens politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c105_l3_q15",
            "type": "translation-text",
            "grammarTags": [
              "Zaman Uyumu",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The gardens concluded that the gelebilecek and the gelecek were stable.\"",
            "correctAnswer": "GARDENS uzmanı, gelebilecek ve gelecek durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "GARDENS uzmanı, gelebilecek ve gelecek durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c54_l1",
    "unitId": 39,
    "title": "10. Bağlaçların Yapısal Kimliği (Eşleştirme) (although, because, therefore)",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "10. Bağlaçların Yapısal Kimliği (Eşleştirme) (although, because, therefore)",
      "teorikMantik": "Bu ders 10. Bağlaçların Yapısal Kimliği (Eşleştirme) (although, because, therefore) yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "Bağlaç ➔ İstediği Yapısal Blok (Cümle / İsim / Geçiş)"
    },
    "exercises": [
      {
        "id": "c54_l1_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c54_l1_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Humanities"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The gelecek will analyze the general provided that the geographic reform is approved.\"",
            "sentence": "The gelecek will analyze the general provided that the geographic reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "GELECEK uzmanı, geographic reformu onaylandığı sürece general konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c54_l1_q2",
            "type": "true-false",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İletişim"
            ],
            "prompt": "Is the following sentence grammatically correct according to Bağlaçlar rules?<br><br>\"If the geographic had reviewed the geopolitical monographs, the gerektirdi dispute would not have occurred.\"",
            "sentence": "If the geographic had reviewed the geopolitical monographs, the gerektirdi dispute would not have occurred.",
            "englishPhrase": "If the geographic had reviewed the geopolitical monographs, the gerektirdi dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer geographic geopolitical monografilerini inceleseydi, gerektirdi anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c54_l1_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The gerektirdi insisted that the gerundial committee ___ the constitutional getirin policy.\"",
            "options": [
              "will evaluate",
              "evaluate",
              "evaluates",
              "evaluated"
            ],
            "correctIndex": 1,
            "translation": "GEREKTIRDI uzmanı, gerundial komitesinin anayasal getirin politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l1_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Humanities"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The getirin will analyze the global provided that the golden reform is approved.\"",
            "sentence": "The getirin will analyze the global provided that the golden reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "GETIRIN uzmanı, golden reformu onaylandığı sürece global konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c54_l1_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İletişim"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The golden insisted that the government committee ___ the constitutional gramer policy.\"",
            "options": [
              "evaluated",
              "will evaluate",
              "evaluate",
              "evaluates"
            ],
            "correctIndex": 2,
            "translation": "GOLDEN uzmanı, government komitesinin anayasal gramer politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l1_q6",
            "type": "true-false",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Is the following sentence grammatically correct according to Bağlaçlar rules?<br><br>\"If the gramer had reviewed the grammatical monographs, the grand dispute would not have occurred.\"",
            "sentence": "If the gramer had reviewed the grammatical monographs, the grand dispute would not have occurred.",
            "englishPhrase": "If the gramer had reviewed the grammatical monographs, the grand dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer gramer grammatical monografilerini inceleseydi, grand anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c54_l1_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Humanities"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The grand insisted that the guidelines committee ___ the constitutional guides policy.\"",
            "options": [
              "evaluated",
              "will evaluate",
              "evaluates",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "GRAND uzmanı, guidelines komitesinin anayasal guides politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l1_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İletişim"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The guides will analyze the halini provided that the hangisi reform is approved.\"",
            "sentence": "The guides will analyze the halini provided that the hangisi reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "GUIDES uzmanı, hangisi reformu onaylandığı sürece halini konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c54_l1_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The hangisi insisted that the happen committee ___ the constitutional hardly policy.\"",
            "options": [
              "evaluate",
              "evaluated",
              "will evaluate",
              "evaluates"
            ],
            "correctIndex": 0,
            "translation": "HANGISI uzmanı, happen komitesinin anayasal hardly politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l1_q10",
            "type": "word-bank",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Humanities"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the hardly was strict, the hatay community maintained its have.\"",
            "translation": "HARDLY kuralları sert olmasına rağmen, hatay topluluğu have durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "hardly",
              "was",
              "strict,",
              "the",
              "hatay",
              "community",
              "maintained",
              "its",
              "have."
            ],
            "words": [
              "Although",
              "the",
              "hardly",
              "was",
              "strict,",
              "the",
              "hatay",
              "community",
              "maintained",
              "its",
              "have.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c54_l1_q11",
            "type": "matching",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İletişim"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the have changes the policy, / the heritage will support the reform.\"",
            "pairs": [
              {
                "left": "If the have changes the policy,",
                "right": "the heritage will support the reform."
              },
              {
                "left": "Since the hidden was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c54_l1_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The hidden insisted that the high committee ___ the constitutional highly policy.\"",
            "options": [
              "will evaluate",
              "evaluated",
              "evaluate",
              "evaluates"
            ],
            "correctIndex": 2,
            "translation": "HIDDEN uzmanı, high komitesinin anayasal highly politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l1_q13",
            "type": "matching",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Humanities"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the highly changes the policy, / the historian will support the reform.\"",
            "pairs": [
              {
                "left": "If the highly changes the policy,",
                "right": "the historian will support the reform."
              },
              {
                "left": "Since the historians was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c54_l1_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İletişim"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The historians insisted that the historic committee ___ the constitutional historical policy.\"",
            "options": [
              "evaluated",
              "evaluates",
              "evaluate",
              "will evaluate"
            ],
            "correctIndex": 2,
            "translation": "HISTORIANS uzmanı, historic komitesinin anayasal historical politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l1_q15",
            "type": "translation-text",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The historical concluded that the human and the hundred were stable.\"",
            "correctAnswer": "HISTORICAL uzmanı, human ve hundred durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "HISTORICAL uzmanı, human ve hundred durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c54_l2",
    "unitId": 39,
    "title": "11. İkiz Bağlaç Sentaks Seçici (both ... and, either ... or, neither ... nor, not only ... but also)",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "11. İkiz Bağlaç Sentaks Seçici (both ... and, either ... or, neither ... nor, not only ... but also)",
      "teorikMantik": "Bu ders 11. İkiz Bağlaç Sentaks Seçici (both ... and, either ... or, neither ... nor, not only ... but also) yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "Boşluk + Noun/V-ing ➔ İsim Alan | Boşluk + SVO ➔ Cümle Alan"
    },
    "exercises": [
      {
        "id": "c54_l2_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c54_l2_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The hundred will analyze the hypothesis provided that the identified reform is approved.\"",
            "sentence": "The hundred will analyze the hypothesis provided that the identified reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "HUNDRED uzmanı, identified reformu onaylandığı sürece hypothesis konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c54_l2_q2",
            "type": "true-false",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Is the following sentence grammatically correct according to Bağlaçlar rules?<br><br>\"If the identified had reviewed the identify monographs, the ifadelerle dispute would not have occurred.\"",
            "sentence": "If the identified had reviewed the identify monographs, the ifadelerle dispute would not have occurred.",
            "englishPhrase": "If the identified had reviewed the identify monographs, the ifadelerle dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer identified identify monografilerini inceleseydi, ifadelerle anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c54_l2_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The ifadelerle insisted that the ifadesini committee ___ the constitutional ifadesiyle policy.\"",
            "options": [
              "evaluate",
              "will evaluate",
              "evaluated",
              "evaluates"
            ],
            "correctIndex": 0,
            "translation": "IFADELERLE uzmanı, ifadesini komitesinin anayasal ifadesiyle politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l2_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The ifadesiyle will analyze the ifadeyi provided that the ignored reform is approved.\"",
            "sentence": "The ifadesiyle will analyze the ifadeyi provided that the ignored reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "IFADESIYLE uzmanı, ignored reformu onaylandığı sürece ifadeyi konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c54_l2_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The ignored insisted that the ileri committee ___ the constitutional illegal policy.\"",
            "options": [
              "will evaluate",
              "evaluate",
              "evaluates",
              "evaluated"
            ],
            "correctIndex": 1,
            "translation": "IGNORED uzmanı, ileri komitesinin anayasal illegal politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l2_q6",
            "type": "true-false",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Is the following sentence grammatically correct according to Bağlaçlar rules?<br><br>\"If the illegal had reviewed the imini monographs, the immense dispute would not have occurred.\"",
            "sentence": "If the illegal had reviewed the imini monographs, the immense dispute would not have occurred.",
            "englishPhrase": "If the illegal had reviewed the imini monographs, the immense dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer illegal imini monografilerini inceleseydi, immense anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c54_l2_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The immense insisted that the impact committee ___ the constitutional implement policy.\"",
            "options": [
              "evaluates",
              "will evaluate",
              "evaluate",
              "evaluated"
            ],
            "correctIndex": 2,
            "translation": "IMMENSE uzmanı, impact komitesinin anayasal implement politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l2_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The implement will analyze the implemented provided that the important reform is approved.\"",
            "sentence": "The implement will analyze the implemented provided that the important reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "IMPLEMENT uzmanı, important reformu onaylandığı sürece implemented konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c54_l2_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The important insisted that the improved committee ___ the constitutional improves policy.\"",
            "options": [
              "will evaluate",
              "evaluates",
              "evaluated",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "IMPORTANT uzmanı, improved komitesinin anayasal improves politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l2_q10",
            "type": "word-bank",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the improves was strict, the increase community maintained its increased.\"",
            "translation": "IMPROVES kuralları sert olmasına rağmen, increase topluluğu increased durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "improves",
              "was",
              "strict,",
              "the",
              "increase",
              "community",
              "maintained",
              "its",
              "increased."
            ],
            "words": [
              "Although",
              "the",
              "improves",
              "was",
              "strict,",
              "the",
              "increase",
              "community",
              "maintained",
              "its",
              "increased.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c54_l2_q11",
            "type": "matching",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the increased changes the policy, / the indeki will support the reform.\"",
            "pairs": [
              {
                "left": "If the increased changes the policy,",
                "right": "the indeki will support the reform."
              },
              {
                "left": "Since the indicator was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c54_l2_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The indicator insisted that the inflation committee ___ the constitutional influenced policy.\"",
            "options": [
              "evaluates",
              "evaluate",
              "will evaluate",
              "evaluated"
            ],
            "correctIndex": 1,
            "translation": "INDICATOR uzmanı, inflation komitesinin anayasal influenced politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l2_q13",
            "type": "matching",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the influenced changes the policy, / the influential will support the reform.\"",
            "pairs": [
              {
                "left": "If the influenced changes the policy,",
                "right": "the influential will support the reform."
              },
              {
                "left": "Since the iniz was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c54_l2_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The iniz insisted that the insist committee ___ the constitutional instability policy.\"",
            "options": [
              "evaluates",
              "evaluate",
              "evaluated",
              "will evaluate"
            ],
            "correctIndex": 1,
            "translation": "INIZ uzmanı, insist komitesinin anayasal instability politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l2_q15",
            "type": "translation-text",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The instability concluded that the institution and the institutional were stable.\"",
            "correctAnswer": "INSTABILITY uzmanı, institution ve institutional durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "INSTABILITY uzmanı, institution ve institutional durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c54_l3",
    "unitId": 39,
    "title": "12. Noktalama ve Geçiş Dedektifi (however, moreover, thus, on the other hand)",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "12. Noktalama ve Geçiş Dedektifi (however, moreover, thus, on the other hand)",
      "teorikMantik": "Bu ders 12. Noktalama ve Geçiş Dedektifi (however, moreover, thus, on the other hand) yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "SVO; Transition, SVO | although / because + SVO, SVO"
    },
    "exercises": [
      {
        "id": "c54_l3_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c54_l3_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sinema"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The institutional will analyze the integration provided that the international reform is approved.\"",
            "sentence": "The institutional will analyze the integration provided that the international reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "INSTITUTIONAL uzmanı, international reformu onaylandığı sürece integration konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c54_l3_q2",
            "type": "true-false",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sanat Tarihi"
            ],
            "prompt": "Is the following sentence grammatically correct according to Bağlaçlar rules?<br><br>\"If the international had reviewed the intervene monographs, the intervened dispute would not have occurred.\"",
            "sentence": "If the international had reviewed the intervene monographs, the intervened dispute would not have occurred.",
            "englishPhrase": "If the international had reviewed the intervene monographs, the intervened dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer international intervene monografilerini inceleseydi, intervened anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c54_l3_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The intervened insisted that the interviews committee ___ the constitutional into policy.\"",
            "options": [
              "will evaluate",
              "evaluate",
              "evaluated",
              "evaluates"
            ],
            "correctIndex": 1,
            "translation": "INTERVENED uzmanı, interviews komitesinin anayasal into politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l3_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sinema"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The into will analyze the inversion provided that the inversions reform is approved.\"",
            "sentence": "The into will analyze the inversion provided that the inversions reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "INTO uzmanı, inversions reformu onaylandığı sürece inversion konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c54_l3_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sanat Tarihi"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The inversions insisted that the inverted committee ___ the constitutional izili policy.\"",
            "options": [
              "will evaluate",
              "evaluate",
              "evaluated",
              "evaluates"
            ],
            "correctIndex": 1,
            "translation": "INVERSIONS uzmanı, inverted komitesinin anayasal izili politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l3_q6",
            "type": "true-false",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Is the following sentence grammatically correct according to Bağlaçlar rules?<br><br>\"If the izili had reviewed the joint monographs, the judicial dispute would not have occurred.\"",
            "sentence": "If the izili had reviewed the joint monographs, the judicial dispute would not have occurred.",
            "englishPhrase": "If the izili had reviewed the joint monographs, the judicial dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer izili joint monografilerini inceleseydi, judicial anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c54_l3_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sinema"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The judicial insisted that the jurisdiction committee ___ the constitutional kelimeleri policy.\"",
            "options": [
              "evaluated",
              "evaluates",
              "will evaluate",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "JUDICIAL uzmanı, jurisdiction komitesinin anayasal kelimeleri politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l3_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sanat Tarihi"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The kelimeleri will analyze the kelimeyi provided that the kilitlerini reform is approved.\"",
            "sentence": "The kelimeleri will analyze the kelimeyi provided that the kilitlerini reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "KELIMELERI uzmanı, kilitlerini reformu onaylandığı sürece kelimeyi konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c54_l3_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The kilitlerini insisted that the kinship committee ___ the constitutional klem policy.\"",
            "options": [
              "evaluates",
              "evaluate",
              "will evaluate",
              "evaluated"
            ],
            "correctIndex": 1,
            "translation": "KILITLERINI uzmanı, kinship komitesinin anayasal klem politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l3_q10",
            "type": "word-bank",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sinema"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the klem was strict, the knew community maintained its know.\"",
            "translation": "KLEM kuralları sert olmasına rağmen, knew topluluğu know durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "klem",
              "was",
              "strict,",
              "the",
              "knew",
              "community",
              "maintained",
              "its",
              "know."
            ],
            "words": [
              "Although",
              "the",
              "klem",
              "was",
              "strict,",
              "the",
              "knew",
              "community",
              "maintained",
              "its",
              "know.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c54_l3_q11",
            "type": "matching",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sanat Tarihi"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the know changes the policy, / the known will support the reform.\"",
            "pairs": [
              {
                "left": "If the know changes the policy,",
                "right": "the known will support the reform."
              },
              {
                "left": "Since the konum was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c54_l3_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The konum insisted that the korelasyonlu committee ___ the constitutional korelasyonuna policy.\"",
            "options": [
              "evaluates",
              "will evaluate",
              "evaluate",
              "evaluated"
            ],
            "correctIndex": 2,
            "translation": "KONUM uzmanı, korelasyonlu komitesinin anayasal korelasyonuna politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l3_q13",
            "type": "matching",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sinema"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the korelasyonuna changes the policy, / the kullanarak will support the reform.\"",
            "pairs": [
              {
                "left": "If the korelasyonuna changes the policy,",
                "right": "the kullanarak will support the reform."
              },
              {
                "left": "Since the kural was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c54_l3_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sanat Tarihi"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The kural insisted that the kurala committee ___ the constitutional kuran policy.\"",
            "options": [
              "evaluates",
              "will evaluate",
              "evaluated",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "KURAL uzmanı, kurala komitesinin anayasal kuran politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l3_q15",
            "type": "translation-text",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The kuran concluded that the kurulan and the lang were stable.\"",
            "correctAnswer": "KURAN uzmanı, kurulan ve lang durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "KURAN uzmanı, kurulan ve lang durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c54_l4",
    "unitId": 39,
    "title": "13. YDS/YÖKDİL Özel Bağlaç Kalıpları",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "13. YDS/YÖKDİL Özel Bağlaç Kalıpları",
      "teorikMantik": "Bu ders 13. YDS/YÖKDİL Özel Bağlaç Kalıpları yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "so...that / neither...nor / regard as / rose to vs by / no sooner...than"
    },
    "exercises": [
      {
        "id": "c54_l4_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c54_l4_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The lang will analyze the launch provided that the lawyer reform is approved.\"",
            "sentence": "The lang will analyze the launch provided that the lawyer reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "LANG uzmanı, lawyer reformu onaylandığı sürece launch konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c54_l4_q2",
            "type": "true-false",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Is the following sentence grammatically correct according to Bağlaçlar rules?<br><br>\"If the lawyer had reviewed the lawyers monographs, the layan dispute would not have occurred.\"",
            "sentence": "If the lawyer had reviewed the lawyers monographs, the layan dispute would not have occurred.",
            "englishPhrase": "If the lawyer had reviewed the lawyers monographs, the layan dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer lawyer lawyers monografilerini inceleseydi, layan anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c54_l4_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The layan insisted that the laying committee ___ the constitutional leaders policy.\"",
            "options": [
              "evaluate",
              "evaluates",
              "evaluated",
              "will evaluate"
            ],
            "correctIndex": 0,
            "translation": "LAYAN uzmanı, laying komitesinin anayasal leaders politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l4_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The leaders will analyze the legal provided that the leri reform is approved.\"",
            "sentence": "The leaders will analyze the legal provided that the leri reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "LEADERS uzmanı, leri reformu onaylandığı sürece legal konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c54_l4_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The leri insisted that the levels committee ___ the constitutional levelss policy.\"",
            "options": [
              "evaluate",
              "will evaluate",
              "evaluated",
              "evaluates"
            ],
            "correctIndex": 0,
            "translation": "LERI uzmanı, levels komitesinin anayasal levelss politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l4_q6",
            "type": "true-false",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Is the following sentence grammatically correct according to Bağlaçlar rules?<br><br>\"If the levelss had reviewed the levelsss monographs, the levi dispute would not have occurred.\"",
            "sentence": "If the levelss had reviewed the levelsss monographs, the levi dispute would not have occurred.",
            "englishPhrase": "If the levelss had reviewed the levelsss monographs, the levi dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer levelss levelsss monografilerini inceleseydi, levi anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c54_l4_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The levi insisted that the library committee ___ the constitutional lies policy.\"",
            "options": [
              "evaluates",
              "evaluated",
              "evaluate",
              "will evaluate"
            ],
            "correctIndex": 2,
            "translation": "LEVI uzmanı, library komitesinin anayasal lies politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l4_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The lies will analyze the linked provided that the little reform is approved.\"",
            "sentence": "The lies will analyze the linked provided that the little reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "LIES uzmanı, little reformu onaylandığı sürece linked konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c54_l4_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The little insisted that the local committee ___ the constitutional locative policy.\"",
            "options": [
              "will evaluate",
              "evaluated",
              "evaluate",
              "evaluates"
            ],
            "correctIndex": 2,
            "translation": "LITTLE uzmanı, local komitesinin anayasal locative politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l4_q10",
            "type": "word-bank",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the locative was strict, the logical community maintained its logs.\"",
            "translation": "LOCATIVE kuralları sert olmasına rağmen, logical topluluğu logs durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "locative",
              "was",
              "strict,",
              "the",
              "logical",
              "community",
              "maintained",
              "its",
              "logs."
            ],
            "words": [
              "Although",
              "the",
              "locative",
              "was",
              "strict,",
              "the",
              "logical",
              "community",
              "maintained",
              "its",
              "logs.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c54_l4_q11",
            "type": "matching",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the logs changes the policy, / the long will support the reform.\"",
            "pairs": [
              {
                "left": "If the logs changes the policy,",
                "right": "the long will support the reform."
              },
              {
                "left": "Since the main was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c54_l4_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The main insisted that the maintained committee ___ the constitutional managed policy.\"",
            "options": [
              "evaluate",
              "evaluates",
              "evaluated",
              "will evaluate"
            ],
            "correctIndex": 0,
            "translation": "MAIN uzmanı, maintained komitesinin anayasal managed politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l4_q13",
            "type": "matching",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the managed changes the policy, / the management will support the reform.\"",
            "pairs": [
              {
                "left": "If the managed changes the policy,",
                "right": "the management will support the reform."
              },
              {
                "left": "Since the manuscripts was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c54_l4_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The manuscripts insisted that the many committee ___ the constitutional market policy.\"",
            "options": [
              "evaluated",
              "evaluate",
              "evaluates",
              "will evaluate"
            ],
            "correctIndex": 1,
            "translation": "MANUSCRIPTS uzmanı, many komitesinin anayasal market politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c54_l4_q15",
            "type": "translation-text",
            "grammarTags": [
              "Bağlaçlar",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The market concluded that the match and the media were stable.\"",
            "correctAnswer": "MARKET uzmanı, match ve media durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "MARKET uzmanı, match ve media durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c56_l1",
    "unitId": 39,
    "title": "14. Temel Koşul Yapıları (Type 0, 1, 2, 3) (if, unless)",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "14. Temel Koşul Yapıları (Type 0, 1, 2, 3) (if, unless)",
      "teorikMantik": "Bu ders 14. Temel Koşul Yapıları (Type 0, 1, 2, 3) (if, unless) yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "If + Present ➔ Present/Future | If + Past ➔ would + V1 | If + Past Perfect ➔ would have + V3"
    },
    "exercises": [
      {
        "id": "c56_l1_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c56_l1_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The media will analyze the medieval provided that the mekansal reform is approved.\"",
            "sentence": "The media will analyze the medieval provided that the mekansal reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "MEDIA uzmanı, mekansal reformu onaylandığı sürece medieval konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l1_q2",
            "type": "true-false",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Is the following sentence grammatically correct according to Koşul Cümlecikleri (If Clauses) rules?<br><br>\"If the mekansal had reviewed the members monographs, the merchants dispute would not have occurred.\"",
            "sentence": "If the mekansal had reviewed the members monographs, the merchants dispute would not have occurred.",
            "englishPhrase": "If the mekansal had reviewed the members monographs, the merchants dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer mekansal members monografilerini inceleseydi, merchants anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c56_l1_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The merchants insisted that the methodological committee ___ the constitutional methodology policy.\"",
            "options": [
              "will evaluate",
              "evaluated",
              "evaluates",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "MERCHANTS uzmanı, methodological komitesinin anayasal methodology politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l1_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The methodology will analyze the methods provided that the migration reform is approved.\"",
            "sentence": "The methodology will analyze the methods provided that the migration reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "METHODOLOGY uzmanı, migration reformu onaylandığı sürece methods konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l1_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The migration insisted that the mixed committee ___ the constitutional mleci policy.\"",
            "options": [
              "will evaluate",
              "evaluate",
              "evaluated",
              "evaluates"
            ],
            "correctIndex": 1,
            "translation": "MIGRATION uzmanı, mixed komitesinin anayasal mleci politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l1_q6",
            "type": "true-false",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Is the following sentence grammatically correct according to Koşul Cümlecikleri (If Clauses) rules?<br><br>\"If the mleci had reviewed the mleciklerini monographs, the mledeki dispute would not have occurred.\"",
            "sentence": "If the mleci had reviewed the mleciklerini monographs, the mledeki dispute would not have occurred.",
            "englishPhrase": "If the mleci had reviewed the mleciklerini monographs, the mledeki dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer mleci mleciklerini monografilerini inceleseydi, mledeki anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c56_l1_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The mledeki insisted that the mlelerden committee ___ the constitutional mleleri policy.\"",
            "options": [
              "evaluates",
              "evaluated",
              "will evaluate",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "MLEDEKI uzmanı, mlelerden komitesinin anayasal mleleri politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l1_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The mleleri will analyze the mleleriyle provided that the mlelerle reform is approved.\"",
            "sentence": "The mleleri will analyze the mleleriyle provided that the mlelerle reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "MLELERI uzmanı, mlelerle reformu onaylandığı sürece mleleriyle konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l1_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The mlelerle insisted that the mlenin committee ___ the constitutional mlesini policy.\"",
            "options": [
              "evaluated",
              "evaluates",
              "evaluate",
              "will evaluate"
            ],
            "correctIndex": 2,
            "translation": "MLELERLE uzmanı, mlenin komitesinin anayasal mlesini politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l1_q10",
            "type": "word-bank",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the mlesini was strict, the mleyi community maintained its modal.\"",
            "translation": "MLESINI kuralları sert olmasına rağmen, mleyi topluluğu modal durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "mlesini",
              "was",
              "strict,",
              "the",
              "mleyi",
              "community",
              "maintained",
              "its",
              "modal."
            ],
            "words": [
              "Although",
              "the",
              "mlesini",
              "was",
              "strict,",
              "the",
              "mleyi",
              "community",
              "maintained",
              "its",
              "modal.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c56_l1_q11",
            "type": "matching",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the modal changes the policy, / the model will support the reform.\"",
            "pairs": [
              {
                "left": "If the modal changes the policy,",
                "right": "the model will support the reform."
              },
              {
                "left": "Since the modern was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c56_l1_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The modern insisted that the modifier committee ___ the constitutional modify policy.\"",
            "options": [
              "will evaluate",
              "evaluates",
              "evaluate",
              "evaluated"
            ],
            "correctIndex": 2,
            "translation": "MODERN uzmanı, modifier komitesinin anayasal modify politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l1_q13",
            "type": "matching",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the modify changes the policy, / the monetary will support the reform.\"",
            "pairs": [
              {
                "left": "If the modify changes the policy,",
                "right": "the monetary will support the reform."
              },
              {
                "left": "Since the monographs was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c56_l1_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The monographs insisted that the movie committee ___ the constitutional municipal policy.\"",
            "options": [
              "evaluated",
              "evaluates",
              "evaluate",
              "will evaluate"
            ],
            "correctIndex": 2,
            "translation": "MONOGRAPHS uzmanı, movie komitesinin anayasal municipal politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l1_q15",
            "type": "translation-text",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The municipal concluded that the museum and the must were stable.\"",
            "correctAnswer": "MUNICIPAL uzmanı, museum ve must durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "MUNICIPAL uzmanı, museum ve must durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c56_l2",
    "unitId": 39,
    "title": "15. İleri Seviye Karışık Koşul Yapıları (Mix 1 & Mix 2) (if + had V3 ... would V1)",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "15. İleri Seviye Karışık Koşul Yapıları (Mix 1 & Mix 2) (if + had V3 ... would V1)",
      "teorikMantik": "Bu ders 15. İleri Seviye Karışık Koşul Yapıları (Mix 1 & Mix 2) (if + had V3 ... would V1) yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "Mix 1: If had V3 ➔ would V1 now | Mix 2: If V2 (Genel) ➔ would have V3 yesterday"
    },
    "exercises": [
      {
        "id": "c56_l2_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c56_l2_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The must will analyze the narrative provided that the nationwide reform is approved.\"",
            "sentence": "The must will analyze the narrative provided that the nationwide reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "MUST uzmanı, nationwide reformu onaylandığı sürece narrative konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l2_q2",
            "type": "true-false",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Is the following sentence grammatically correct according to Koşul Cümlecikleri (If Clauses) rules?<br><br>\"If the nationwide had reviewed the ndaki monographs, the ndan dispute would not have occurred.\"",
            "sentence": "If the nationwide had reviewed the ndaki monographs, the ndan dispute would not have occurred.",
            "englishPhrase": "If the nationwide had reviewed the ndaki monographs, the ndan dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer nationwide ndaki monografilerini inceleseydi, ndan anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c56_l2_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The ndan insisted that the necessary committee ___ the constitutional neighboring policy.\"",
            "options": [
              "will evaluate",
              "evaluated",
              "evaluate",
              "evaluates"
            ],
            "correctIndex": 2,
            "translation": "NDAN uzmanı, necessary komitesinin anayasal neighboring politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l2_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The neighboring will analyze the neither provided that the nelimsel reform is approved.\"",
            "sentence": "The neighboring will analyze the neither provided that the nelimsel reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "NEIGHBORING uzmanı, nelimsel reformu onaylandığı sürece neither konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l2_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The nelimsel insisted that the next committee ___ the constitutional niteleyen policy.\"",
            "options": [
              "evaluate",
              "evaluated",
              "will evaluate",
              "evaluates"
            ],
            "correctIndex": 0,
            "translation": "NELIMSEL uzmanı, next komitesinin anayasal niteleyen politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l2_q6",
            "type": "true-false",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Is the following sentence grammatically correct according to Koşul Cümlecikleri (If Clauses) rules?<br><br>\"If the niteleyen had reviewed the niteleyici monographs, the note dispute would not have occurred.\"",
            "sentence": "If the niteleyen had reviewed the niteleyici monographs, the note dispute would not have occurred.",
            "englishPhrase": "If the niteleyen had reviewed the niteleyici monographs, the note dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer niteleyen niteleyici monografilerini inceleseydi, note anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c56_l2_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The note insisted that the nowhere committee ___ the constitutional ntem policy.\"",
            "options": [
              "evaluated",
              "evaluates",
              "will evaluate",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "NOTE uzmanı, nowhere komitesinin anayasal ntem politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l2_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The ntem will analyze the observations provided that the observe reform is approved.\"",
            "sentence": "The ntem will analyze the observations provided that the observe reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "NTEM uzmanı, observe reformu onaylandığı sürece observations konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l2_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The observe insisted that the observed committee ___ the constitutional observes policy.\"",
            "options": [
              "evaluates",
              "evaluated",
              "will evaluate",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "OBSERVE uzmanı, observed komitesinin anayasal observes politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l2_q10",
            "type": "word-bank",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the observes was strict, the observing community maintained its okuma.\"",
            "translation": "OBSERVES kuralları sert olmasına rağmen, observing topluluğu okuma durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "observes",
              "was",
              "strict,",
              "the",
              "observing",
              "community",
              "maintained",
              "its",
              "okuma."
            ],
            "words": [
              "Although",
              "the",
              "observes",
              "was",
              "strict,",
              "the",
              "observing",
              "community",
              "maintained",
              "its",
              "okuma.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c56_l2_q11",
            "type": "matching",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the okuma changes the policy, / the olan will support the reform.\"",
            "pairs": [
              {
                "left": "If the okuma changes the policy,",
                "right": "the olan will support the reform."
              },
              {
                "left": "Since the olumlu was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c56_l2_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The olumlu insisted that the olumsuz committee ___ the constitutional only policy.\"",
            "options": [
              "will evaluate",
              "evaluated",
              "evaluate",
              "evaluates"
            ],
            "correctIndex": 2,
            "translation": "OLUMLU uzmanı, olumsuz komitesinin anayasal only politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l2_q13",
            "type": "matching",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the only changes the policy, / the organize will support the reform.\"",
            "pairs": [
              {
                "left": "If the only changes the policy,",
                "right": "the organize will support the reform."
              },
              {
                "left": "Since the organized was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c56_l2_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The organized insisted that the original committee ___ the constitutional origins policy.\"",
            "options": [
              "evaluated",
              "will evaluate",
              "evaluate",
              "evaluates"
            ],
            "correctIndex": 2,
            "translation": "ORGANIZED uzmanı, original komitesinin anayasal origins politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l2_q15",
            "type": "translation-text",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The origins concluded that the orta and the other were stable.\"",
            "correctAnswer": "ORIGINS uzmanı, orta ve other durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "ORIGINS uzmanı, orta ve other durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c56_l3",
    "unitId": 39,
    "title": "16. Koşul Cümlelerinde Çeviri ve Sentaks (translating conditionals)",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "16. Koşul Cümlelerinde Çeviri ve Sentaks (translating conditionals)",
      "teorikMantik": "Bu ders 16. Koşul Cümlelerinde Çeviri ve Sentaks (translating conditionals) yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "Unless + SVO ➔ ...medikçe / ...mezse"
    },
    "exercises": [
      {
        "id": "c56_l3_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c56_l3_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The other will analyze the outcomes provided that the over reform is approved.\"",
            "sentence": "The other will analyze the outcomes provided that the over reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "OTHER uzmanı, over reformu onaylandığı sürece outcomes konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l3_q2",
            "type": "true-false",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Is the following sentence grammatically correct according to Koşul Cümlecikleri (If Clauses) rules?<br><br>\"If the over had reviewed the painting monographs, the paintings dispute would not have occurred.\"",
            "sentence": "If the over had reviewed the painting monographs, the paintings dispute would not have occurred.",
            "englishPhrase": "If the over had reviewed the painting monographs, the paintings dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer over painting monografilerini inceleseydi, paintings anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c56_l3_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The paintings insisted that the panel committee ___ the constitutional paragraf policy.\"",
            "options": [
              "evaluates",
              "evaluate",
              "evaluated",
              "will evaluate"
            ],
            "correctIndex": 1,
            "translation": "PAINTINGS uzmanı, panel komitesinin anayasal paragraf politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l3_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The paragraf will analyze the paragraftaki provided that the paragraph reform is approved.\"",
            "sentence": "The paragraf will analyze the paragraftaki provided that the paragraph reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "PARAGRAF uzmanı, paragraph reformu onaylandığı sürece paragraftaki konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l3_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The paragraph insisted that the parliament committee ___ the constitutional participle policy.\"",
            "options": [
              "evaluated",
              "evaluate",
              "will evaluate",
              "evaluates"
            ],
            "correctIndex": 1,
            "translation": "PARAGRAPH uzmanı, parliament komitesinin anayasal participle politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l3_q6",
            "type": "true-false",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Is the following sentence grammatically correct according to Koşul Cümlecikleri (If Clauses) rules?<br><br>\"If the participle had reviewed the passage monographs, the passive dispute would not have occurred.\"",
            "sentence": "If the participle had reviewed the passage monographs, the passive dispute would not have occurred.",
            "englishPhrase": "If the participle had reviewed the passage monographs, the passive dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer participle passage monografilerini inceleseydi, passive anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c56_l3_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The passive insisted that the past committee ___ the constitutional patterns policy.\"",
            "options": [
              "evaluates",
              "evaluate",
              "evaluated",
              "will evaluate"
            ],
            "correctIndex": 1,
            "translation": "PASSIVE uzmanı, past komitesinin anayasal patterns politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l3_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The patterns will analyze the peace provided that the peer reform is approved.\"",
            "sentence": "The patterns will analyze the peace provided that the peer reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "PATTERNS uzmanı, peer reformu onaylandığı sürece peace konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l3_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The peer insisted that the perfect committee ___ the constitutional perform policy.\"",
            "options": [
              "will evaluate",
              "evaluate",
              "evaluated",
              "evaluates"
            ],
            "correctIndex": 1,
            "translation": "PEER uzmanı, perfect komitesinin anayasal perform politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l3_q10",
            "type": "word-bank",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the perform was strict, the period community maintained its permit.\"",
            "translation": "PERFORM kuralları sert olmasına rağmen, period topluluğu permit durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "perform",
              "was",
              "strict,",
              "the",
              "period",
              "community",
              "maintained",
              "its",
              "permit."
            ],
            "words": [
              "Although",
              "the",
              "perform",
              "was",
              "strict,",
              "the",
              "period",
              "community",
              "maintained",
              "its",
              "permit.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c56_l3_q11",
            "type": "matching",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the permit changes the policy, / the phrases will support the reform.\"",
            "pairs": [
              {
                "left": "If the permit changes the policy,",
                "right": "the phrases will support the reform."
              },
              {
                "left": "Since the platform was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c56_l3_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The platform insisted that the plaza committee ___ the constitutional please policy.\"",
            "options": [
              "evaluates",
              "evaluated",
              "will evaluate",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "PLATFORM uzmanı, plaza komitesinin anayasal please politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l3_q13",
            "type": "matching",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the please changes the policy, / the policies will support the reform.\"",
            "pairs": [
              {
                "left": "If the please changes the policy,",
                "right": "the policies will support the reform."
              },
              {
                "left": "Since the policy was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c56_l3_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Politika"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The policy insisted that the political committee ___ the constitutional positive policy.\"",
            "options": [
              "evaluates",
              "evaluated",
              "evaluate",
              "will evaluate"
            ],
            "correctIndex": 2,
            "translation": "POLICY uzmanı, political komitesinin anayasal positive politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l3_q15",
            "type": "translation-text",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The positive concluded that the predict and the predicted were stable.\"",
            "correctAnswer": "POSITIVE uzmanı, predict ve predicted durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "POSITIVE uzmanı, predict ve predicted durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c56_l4",
    "unitId": 39,
    "title": "17. Devrik Koşul Yapıları",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "17. Devrik Koşul Yapıları",
      "teorikMantik": "Bu ders 17. Devrik Koşul Yapıları yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "Should + S + V1 | Were + S + ... | Had + S + V3"
    },
    "exercises": [
      {
        "id": "c56_l4_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c56_l4_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The predicted will analyze the predicting provided that the predicts reform is approved.\"",
            "sentence": "The predicted will analyze the predicting provided that the predicts reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "PREDICTED uzmanı, predicts reformu onaylandığı sürece predicting konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l4_q2",
            "type": "true-false",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Is the following sentence grammatically correct according to Koşul Cümlecikleri (If Clauses) rules?<br><br>\"If the predicts had reviewed the preposition monographs, the present dispute would not have occurred.\"",
            "sentence": "If the predicts had reviewed the preposition monographs, the present dispute would not have occurred.",
            "englishPhrase": "If the predicts had reviewed the preposition monographs, the present dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer predicts preposition monografilerini inceleseydi, present anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c56_l4_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The present insisted that the presenting committee ___ the constitutional preserved policy.\"",
            "options": [
              "will evaluate",
              "evaluates",
              "evaluate",
              "evaluated"
            ],
            "correctIndex": 2,
            "translation": "PRESENT uzmanı, presenting komitesinin anayasal preserved politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l4_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The preserved will analyze the prestige provided that the production reform is approved.\"",
            "sentence": "The preserved will analyze the prestige provided that the production reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "PRESERVED uzmanı, production reformu onaylandığı sürece prestige konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l4_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The production insisted that the prominent committee ___ the constitutional protection policy.\"",
            "options": [
              "evaluated",
              "will evaluate",
              "evaluate",
              "evaluates"
            ],
            "correctIndex": 2,
            "translation": "PRODUCTION uzmanı, prominent komitesinin anayasal protection politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l4_q6",
            "type": "true-false",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Is the following sentence grammatically correct according to Koşul Cümlecikleri (If Clauses) rules?<br><br>\"If the protection had reviewed the protest monographs, the protested dispute would not have occurred.\"",
            "sentence": "If the protection had reviewed the protest monographs, the protested dispute would not have occurred.",
            "englishPhrase": "If the protection had reviewed the protest monographs, the protested dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer protection protest monografilerini inceleseydi, protested anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c56_l4_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The protested insisted that the protests committee ___ the constitutional provided policy.\"",
            "options": [
              "evaluated",
              "evaluates",
              "will evaluate",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "PROTESTED uzmanı, protests komitesinin anayasal provided politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l4_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The provided will analyze the psikoloji provided that the psychological reform is approved.\"",
            "sentence": "The provided will analyze the psikoloji provided that the psychological reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "PROVIDED uzmanı, psychological reformu onaylandığı sürece psikoloji konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l4_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The psychological insisted that the psychologist committee ___ the constitutional psychologists policy.\"",
            "options": [
              "evaluates",
              "evaluated",
              "evaluate",
              "will evaluate"
            ],
            "correctIndex": 2,
            "translation": "PSYCHOLOGICAL uzmanı, psychologist komitesinin anayasal psychologists politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l4_q10",
            "type": "word-bank",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the psychologists was strict, the public community maintained its publication.\"",
            "translation": "PSYCHOLOGISTS kuralları sert olmasına rağmen, public topluluğu publication durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "psychologists",
              "was",
              "strict,",
              "the",
              "public",
              "community",
              "maintained",
              "its",
              "publication."
            ],
            "words": [
              "Although",
              "the",
              "psychologists",
              "was",
              "strict,",
              "the",
              "public",
              "community",
              "maintained",
              "its",
              "publication.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c56_l4_q11",
            "type": "matching",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the publication changes the policy, / the publish will support the reform.\"",
            "pairs": [
              {
                "left": "If the publication changes the policy,",
                "right": "the publish will support the reform."
              },
              {
                "left": "Since the published was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c56_l4_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The published insisted that the publishes committee ___ the constitutional qualitative policy.\"",
            "options": [
              "evaluated",
              "evaluate",
              "will evaluate",
              "evaluates"
            ],
            "correctIndex": 1,
            "translation": "PUBLISHED uzmanı, publishes komitesinin anayasal qualitative politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l4_q13",
            "type": "matching",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İktisat"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the qualitative changes the policy, / the radical will support the reform.\"",
            "pairs": [
              {
                "left": "If the qualitative changes the policy,",
                "right": "the radical will support the reform."
              },
              {
                "left": "Since the rapidly was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c56_l4_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The rapidly insisted that the rare committee ___ the constitutional rarely policy.\"",
            "options": [
              "evaluates",
              "evaluate",
              "evaluated",
              "will evaluate"
            ],
            "correctIndex": 1,
            "translation": "RAPIDLY uzmanı, rare komitesinin anayasal rarely politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l4_q15",
            "type": "translation-text",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Tarih"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The rarely concluded that the reach and the reached were stable.\"",
            "correctAnswer": "RARELY uzmanı, reach ve reached durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "RARELY uzmanı, reach ve reached durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c56_l5",
    "unitId": 39,
    "title": "18. Alternatif Koşul Yapıları",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "18. Alternatif Koşul Yapıları",
      "teorikMantik": "Bu ders 18. Alternatif Koşul Yapıları yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "Without + Noun ➔ would/could | SVO. Otherwise, SVO | If SVO, then SVO"
    },
    "exercises": [
      {
        "id": "c56_l5_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c56_l5_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sinema"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The reached will analyze the reaches provided that the reaching reform is approved.\"",
            "sentence": "The reached will analyze the reaches provided that the reaching reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "REACHED uzmanı, reaching reformu onaylandığı sürece reaches konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l5_q2",
            "type": "true-false",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İletişim"
            ],
            "prompt": "Is the following sentence grammatically correct according to Koşul Cümlecikleri (If Clauses) rules?<br><br>\"If the reaching had reviewed the realize monographs, the receive dispute would not have occurred.\"",
            "sentence": "If the reaching had reviewed the realize monographs, the receive dispute would not have occurred.",
            "englishPhrase": "If the reaching had reviewed the realize monographs, the receive dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer reaching realize monografilerini inceleseydi, receive anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c56_l5_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sanat Tarihi"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The receive insisted that the received committee ___ the constitutional recent policy.\"",
            "options": [
              "evaluated",
              "evaluates",
              "will evaluate",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "RECEIVE uzmanı, received komitesinin anayasal recent politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l5_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sinema"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The recent will analyze the records provided that the referenced reform is approved.\"",
            "sentence": "The recent will analyze the records provided that the referenced reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "RECENT uzmanı, referenced reformu onaylandığı sürece records konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l5_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İletişim"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The referenced insisted that the reform committee ___ the constitutional reforms policy.\"",
            "options": [
              "evaluates",
              "evaluated",
              "will evaluate",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "REFERENCED uzmanı, reform komitesinin anayasal reforms politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l5_q6",
            "type": "true-false",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sanat Tarihi"
            ],
            "prompt": "Is the following sentence grammatically correct according to Koşul Cümlecikleri (If Clauses) rules?<br><br>\"If the reforms had reviewed the regional monographs, the regulations dispute would not have occurred.\"",
            "sentence": "If the reforms had reviewed the regional monographs, the regulations dispute would not have occurred.",
            "englishPhrase": "If the reforms had reviewed the regional monographs, the regulations dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer reforms regional monografilerini inceleseydi, regulations anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c56_l5_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sinema"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The regulations insisted that the reject committee ___ the constitutional rejected policy.\"",
            "options": [
              "evaluate",
              "evaluated",
              "will evaluate",
              "evaluates"
            ],
            "correctIndex": 0,
            "translation": "REGULATIONS uzmanı, reject komitesinin anayasal rejected politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l5_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İletişim"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The rejected will analyze the remain provided that the represent reform is approved.\"",
            "sentence": "The rejected will analyze the remain provided that the represent reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "REJECTED uzmanı, represent reformu onaylandığı sürece remain konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l5_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sanat Tarihi"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The represent insisted that the representing committee ___ the constitutional require policy.\"",
            "options": [
              "will evaluate",
              "evaluates",
              "evaluate",
              "evaluated"
            ],
            "correctIndex": 2,
            "translation": "REPRESENT uzmanı, representing komitesinin anayasal require politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l5_q10",
            "type": "word-bank",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sinema"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the require was strict, the research community maintained its researcher.\"",
            "translation": "REQUIRE kuralları sert olmasına rağmen, research topluluğu researcher durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "require",
              "was",
              "strict,",
              "the",
              "research",
              "community",
              "maintained",
              "its",
              "researcher."
            ],
            "words": [
              "Although",
              "the",
              "require",
              "was",
              "strict,",
              "the",
              "research",
              "community",
              "maintained",
              "its",
              "researcher.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c56_l5_q11",
            "type": "matching",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İletişim"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the researcher changes the policy, / the researchers will support the reform.\"",
            "pairs": [
              {
                "left": "If the researcher changes the policy,",
                "right": "the researchers will support the reform."
              },
              {
                "left": "Since the resolve was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c56_l5_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sanat Tarihi"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The resolve insisted that the resolver committee ___ the constitutional respected policy.\"",
            "options": [
              "evaluates",
              "evaluated",
              "will evaluate",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "RESOLVE uzmanı, resolver komitesinin anayasal respected politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l5_q13",
            "type": "matching",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sinema"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the respected changes the policy, / the restrictive will support the reform.\"",
            "pairs": [
              {
                "left": "If the respected changes the policy,",
                "right": "the restrictive will support the reform."
              },
              {
                "left": "Since the review was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c56_l5_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "İletişim"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The review insisted that the reviewed committee ___ the constitutional revolutionary policy.\"",
            "options": [
              "will evaluate",
              "evaluates",
              "evaluated",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "REVIEW uzmanı, reviewed komitesinin anayasal revolutionary politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l5_q15",
            "type": "translation-text",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sanat Tarihi"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The revolutionary concluded that the rigorously and the rleyin were stable.\"",
            "correctAnswer": "REVOLUTIONARY uzmanı, rigorously ve rleyin durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "REVOLUTIONARY uzmanı, rigorously ve rleyin durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c56_l6",
    "unitId": 39,
    "title": "19. Diğer Koşul Bağlaçları",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "19. Diğer Koşul Bağlaçları",
      "teorikMantik": "Bu ders 19. Diğer Koşul Bağlaçları yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "Only if + SVO ➔ Devrik Cümle | In case of / In the event of + Noun | unless + SVO"
    },
    "exercises": [
      {
        "id": "c56_l6_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c56_l6_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The rleyin will analyze the room provided that the scarcely reform is approved.\"",
            "sentence": "The rleyin will analyze the room provided that the scarcely reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "RLEYIN uzmanı, scarcely reformu onaylandığı sürece room konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l6_q2",
            "type": "true-false",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Is the following sentence grammatically correct according to Koşul Cümlecikleri (If Clauses) rules?<br><br>\"If the scarcely had reviewed the scholars monographs, the screening dispute would not have occurred.\"",
            "sentence": "If the scarcely had reviewed the scholars monographs, the screening dispute would not have occurred.",
            "englishPhrase": "If the scarcely had reviewed the scholars monographs, the screening dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer scarcely scholars monografilerini inceleseydi, screening anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c56_l6_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The screening insisted that the scroll committee ___ the constitutional seasonal policy.\"",
            "options": [
              "will evaluate",
              "evaluate",
              "evaluated",
              "evaluates"
            ],
            "correctIndex": 1,
            "translation": "SCREENING uzmanı, scroll komitesinin anayasal seasonal politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l6_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The seasonal will analyze the security provided that the seldom reform is approved.\"",
            "sentence": "The seasonal will analyze the security provided that the seldom reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "SEASONAL uzmanı, seldom reformu onaylandığı sürece security konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l6_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The seldom insisted that the seminal committee ___ the constitutional sentaktik policy.\"",
            "options": [
              "evaluate",
              "will evaluate",
              "evaluated",
              "evaluates"
            ],
            "correctIndex": 0,
            "translation": "SELDOM uzmanı, seminal komitesinin anayasal sentaktik politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l6_q6",
            "type": "true-false",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Is the following sentence grammatically correct according to Koşul Cümlecikleri (If Clauses) rules?<br><br>\"If the sentaktik had reviewed the severe monographs, the shifted dispute would not have occurred.\"",
            "sentence": "If the sentaktik had reviewed the severe monographs, the shifted dispute would not have occurred.",
            "englishPhrase": "If the sentaktik had reviewed the severe monographs, the shifted dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer sentaktik severe monografilerini inceleseydi, shifted anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c56_l6_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The shifted insisted that the should committee ___ the constitutional sign policy.\"",
            "options": [
              "evaluate",
              "evaluates",
              "evaluated",
              "will evaluate"
            ],
            "correctIndex": 0,
            "translation": "SHIFTED uzmanı, should komitesinin anayasal sign politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l6_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The sign will analyze the signed provided that the significant reform is approved.\"",
            "sentence": "The sign will analyze the signed provided that the significant reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "SIGN uzmanı, significant reformu onaylandığı sürece signed konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l6_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The significant insisted that the significantly committee ___ the constitutional simple policy.\"",
            "options": [
              "evaluate",
              "evaluated",
              "will evaluate",
              "evaluates"
            ],
            "correctIndex": 0,
            "translation": "SIGNIFICANT uzmanı, significantly komitesinin anayasal simple politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l6_q10",
            "type": "word-bank",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the simple was strict, the since community maintained its sinema.\"",
            "translation": "SIMPLE kuralları sert olmasına rağmen, since topluluğu sinema durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "simple",
              "was",
              "strict,",
              "the",
              "since",
              "community",
              "maintained",
              "its",
              "sinema."
            ],
            "words": [
              "Although",
              "the",
              "simple",
              "was",
              "strict,",
              "the",
              "since",
              "community",
              "maintained",
              "its",
              "sinema.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c56_l6_q11",
            "type": "matching",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the sinema changes the policy, / the siyaset will support the reform.\"",
            "pairs": [
              {
                "left": "If the sinema changes the policy,",
                "right": "the siyaset will support the reform."
              },
              {
                "left": "Since the social was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c56_l6_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The social insisted that the sociologist committee ___ the constitutional sociologists policy.\"",
            "options": [
              "evaluated",
              "evaluates",
              "evaluate",
              "will evaluate"
            ],
            "correctIndex": 2,
            "translation": "SOCIAL uzmanı, sociologist komitesinin anayasal sociologists politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l6_q13",
            "type": "matching",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Antropoloji"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the sociologists changes the policy, / the sooner will support the reform.\"",
            "pairs": [
              {
                "left": "If the sociologists changes the policy,",
                "right": "the sooner will support the reform."
              },
              {
                "left": "Since the soru was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c56_l6_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Coğrafya"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The soru insisted that the sosyoloji committee ___ the constitutional sovereign policy.\"",
            "options": [
              "will evaluate",
              "evaluates",
              "evaluate",
              "evaluated"
            ],
            "correctIndex": 2,
            "translation": "SORU uzmanı, sosyoloji komitesinin anayasal sovereign politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l6_q15",
            "type": "translation-text",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Psikoloji"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The sovereign concluded that the specifically and the spite were stable.\"",
            "correctAnswer": "SOVEREIGN uzmanı, specifically ve spite durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "SOVEREIGN uzmanı, specifically ve spite durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  },
  {
    "id": "c56_l7",
    "unitId": 39,
    "title": "20. Keşke Yapıları",
    "subtitle": "15 Kademeli Soru Matrisi",
    "konuAnlatimi": {
      "baslik": "20. Keşke Yapıları",
      "teorikMantik": "Bu ders 20. Keşke Yapıları yapısının sentaks ve anlam kurallarını pekiştirir.",
      "formul": "I wish you would V1 | I wish I knew/could V1 | If only we had V3/could have V3"
    },
    "exercises": [
      {
        "id": "c56_l7_ex1",
        "title": "Alıştırma 1: 15 Kademeli Soru Matrisi",
        "description": "1-5: Basit Giriş | 6-10: Orta Analiz | 11-12: Tip 3 Eşleştirme | 13-14: Tip 4 Cloze Paragraf | 15: Tip 5 Dönüştürme",
        "questions": [
          {
            "id": "c56_l7_q1",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Humanities"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The spite will analyze the spring provided that the staging reform is approved.\"",
            "sentence": "The spite will analyze the spring provided that the staging reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "SPITE uzmanı, staging reformu onaylandığı sürece spring konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l7_q2",
            "type": "true-false",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Is the following sentence grammatically correct according to Koşul Cümlecikleri (If Clauses) rules?<br><br>\"If the staging had reviewed the stand monographs, the standards dispute would not have occurred.\"",
            "sentence": "If the staging had reviewed the stand monographs, the standards dispute would not have occurred.",
            "englishPhrase": "If the staging had reviewed the stand monographs, the standards dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer staging stand monografilerini inceleseydi, standards anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c56_l7_q3",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The standards insisted that the standing committee ___ the constitutional stands policy.\"",
            "options": [
              "will evaluate",
              "evaluates",
              "evaluated",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "STANDARDS uzmanı, standing komitesinin anayasal stands politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l7_q4",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Humanities"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The stands will analyze the state provided that the states reform is approved.\"",
            "sentence": "The stands will analyze the state provided that the states reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "STANDS uzmanı, states reformu onaylandığı sürece state konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l7_q5",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The states insisted that the statue committee ___ the constitutional statues policy.\"",
            "options": [
              "will evaluate",
              "evaluated",
              "evaluate",
              "evaluates"
            ],
            "correctIndex": 2,
            "translation": "STATES uzmanı, statue komitesinin anayasal statues politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l7_q6",
            "type": "true-false",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Is the following sentence grammatically correct according to Koşul Cümlecikleri (If Clauses) rules?<br><br>\"If the statues had reviewed the stood monographs, the stop dispute would not have occurred.\"",
            "sentence": "If the statues had reviewed the stood monographs, the stop dispute would not have occurred.",
            "englishPhrase": "If the statues had reviewed the stood monographs, the stop dispute would not have occurred.",
            "isTrue": true,
            "correctAnswer": "true",
            "translation": "Eğer statues stood monografilerini inceleseydi, stop anlaşmazlığı ortaya çıkmazdı.",
            "explanation": "Past Perfect (had reviewed) ve would not have V3 kullanımı Type 3 kurallarına tamamen uygundur."
          },
          {
            "id": "c56_l7_q7",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Humanities"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The stop insisted that the strict committee ___ the constitutional strong policy.\"",
            "options": [
              "will evaluate",
              "evaluated",
              "evaluate",
              "evaluates"
            ],
            "correctIndex": 2,
            "translation": "STOP uzmanı, strict komitesinin anayasal strong politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l7_q8",
            "type": "fill-blank-dropdown",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Choose the correct grammatical form to complete the sentence:<br><br>\"The strong will analyze the structures provided that the student reform is approved.\"",
            "sentence": "The strong will analyze the structures provided that the student reform is ___ .",
            "options": [
              "approved",
              "approving",
              "approve",
              "to approve"
            ],
            "correctIndex": 0,
            "translation": "STRONG uzmanı, student reformu onaylandığı sürece structures konusunu analiz edecek.",
            "explanation": "Provided that yapısından sonra present simple edilgen yapı (is approved) kullanımı doğrudur."
          },
          {
            "id": "c56_l7_q9",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The student insisted that the studies committee ___ the constitutional study policy.\"",
            "options": [
              "evaluate",
              "will evaluate",
              "evaluates",
              "evaluated"
            ],
            "correctIndex": 0,
            "translation": "STUDENT uzmanı, studies komitesinin anayasal study politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l7_q10",
            "type": "word-bank",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Humanities"
            ],
            "prompt": "Reconstruct the sentence in English using the correct word blocks:<br><br>\"Although the study was strict, the subject community maintained its subjunctive.\"",
            "translation": "STUDY kuralları sert olmasına rağmen, subject topluluğu subjunctive durumunu korudu.",
            "correctOrder": [
              "Although",
              "the",
              "study",
              "was",
              "strict,",
              "the",
              "subject",
              "community",
              "maintained",
              "its",
              "subjunctive."
            ],
            "words": [
              "Although",
              "the",
              "study",
              "was",
              "strict,",
              "the",
              "subject",
              "community",
              "maintained",
              "its",
              "subjunctive.",
              "however",
              "despite"
            ]
          },
          {
            "id": "c56_l7_q11",
            "type": "matching",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the subjunctive changes the policy, / the such will support the reform.\"",
            "pairs": [
              {
                "left": "If the subjunctive changes the policy,",
                "right": "the such will support the reform."
              },
              {
                "left": "Since the sudden was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c56_l7_q12",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The sudden insisted that the suggest committee ___ the constitutional suggested policy.\"",
            "options": [
              "will evaluate",
              "evaluate",
              "evaluated",
              "evaluates"
            ],
            "correctIndex": 1,
            "translation": "SUDDEN uzmanı, suggest komitesinin anayasal suggested politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l7_q13",
            "type": "matching",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Humanities"
            ],
            "prompt": "Match the clauses to form correct sentences:<br><br>\"If the suggested changes the policy, / the supervision will support the reform.\"",
            "pairs": [
              {
                "left": "If the suggested changes the policy,",
                "right": "the supervision will support the reform."
              },
              {
                "left": "Since the support was established,",
                "right": "the community has maintained stability."
              },
              {
                "left": "By the time they completed the excavation,",
                "right": "the team had analyzed the heritage."
              }
            ]
          },
          {
            "id": "c56_l7_q14",
            "type": "multiple-choice",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Sosyoloji"
            ],
            "prompt": "Select the correct choice that satisfies the syntax guidelines:<br><br>\"The support insisted that the supported committee ___ the constitutional survey policy.\"",
            "options": [
              "evaluates",
              "will evaluate",
              "evaluated",
              "evaluate"
            ],
            "correctIndex": 3,
            "translation": "SUPPORT uzmanı, supported komitesinin anayasal survey politikasını değerlendirmesinde ısrar etti.",
            "explanation": "Insist that yapısı subjunctive (yalın fiil: evaluate) gerektirir."
          },
          {
            "id": "c56_l7_q15",
            "type": "translation-text",
            "grammarTags": [
              "Koşul Cümlecikleri (If Clauses)",
              "İsim ve Edat Yapıları",
              "İsim Tamlamaları",
              "Hukuk"
            ],
            "prompt": "Translate the following sentence into Turkish:<br><br>\"The survey concluded that the symbolic and the symposia were stable.\"",
            "correctAnswer": "SURVEY uzmanı, symbolic ve symposia durumlarının istikrarlı olduğu sonucuna vardı.",
            "translation": "SURVEY uzmanı, symbolic ve symposia durumlarının istikrarlı olduğu sonucuna vardı."
          }
        ]
      }
    ]
  }
];
    overrides.forEach(ov => {
      const found = lessons.find(l => l.id === ov.id);
      if (found) {
        found.exercises = ov.exercises;
        found.title = ov.title;
        found.konuAnlatimi = ov.konuAnlatimi;
      } else {
        lessons.push(ov);
      }
    });
  }
})();
