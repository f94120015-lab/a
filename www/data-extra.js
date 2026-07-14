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
      baslik: "Bölüm 55 / Ders 4: Devrik Koşul Yapıları (If Inversion)",
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
      baslik: "Bölüm 55 / Ders 5: Alternatif Koşul Yapıları (Otherwise, Without, Then)",
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
      baslik: "Bölüm 55 / Ders 6: Diğer Koşul Bağlaçları (Conditional Adverbs)",
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
      baslik: "Bölüm 55 / Ders 7: Keşke Yapıları (If only / I wish)",
      teorikMantik: "Keşke (I wish / If only) yapılarının zaman çekimleri: Gelecek/Şikayet (would V1), Şimdiki Zaman (V2 / could V1) ve Geçmiş Zaman (had V3 / could have V3).",
      formul: "I wish you would V1 | I wish I knew/could V1 | If only we had V3/could have V3",
      altinKural: "Özne uyum kısıtı: 'I wish I...' ve 'He wishes he...' kalıplarında asla 'would' kullanılamaz; bunun yerine 'could' tercih edilir!"
    }
  });

})();
