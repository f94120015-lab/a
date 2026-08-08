/**
 * 🧠 EZBER ROBOTU (CONJUNCTION & DRILL ROBOT)
 * 80+ Bağlaç, Edat, Zaman ve Neden-Sonuç Yapısını Oyunlaştırarak Öğreten Motor
 */

(function () {
  // ─── 1. KAPSAMLI VERİ TABANI (80+ BAĞLAÇ VE YAPI) ──────────────────────

  const DRILL_ITEMS = [
    // 1. ZITLIK & KARŞILAŞTIRMA (CONTRAST)
    {
      id: "although_group",
      label: "ALTHOUGH / EVEN THOUGH / THOUGH / MUCH AS",
      tr: "-e rağmen (Zıtlık)",
      group: "G1", // Cümle Alan
      category: "contrast",
      twinId: "twin_contrast_1",
      punctuationPattern: "Bağlaç + SVO, SVO",
      rule: "G1: Tam bir cümle (S+V+O) alır. Yan cümle ile ana cümle arasında zaman uyumu aranır.",
      exampleEN: "Although it was raining heavily, they went out for a walk.",
      exampleTR: "Şiddetli yağmur yağmasına rağmen yürüyüşe çıktılar."
    },
    {
      id: "despite_group",
      label: "DESPITE / IN SPITE OF / NOTWITHSTANDING / FOR ALL",
      tr: "-e rağmen (Zıtlık Edatı)",
      group: "G2", // İsim Alan
      category: "contrast",
      twinId: "twin_contrast_1",
      punctuationPattern: "Bağlaç + Noun / V-ing, SVO",
      rule: "G2: Cümle almaz! Kendisinden sonra İsim, İsim Öbeği veya V-ing gelir.",
      exampleEN: "Despite the heavy rain, they went out for a walk.",
      exampleTR: "Şiddetli yağmura rağmen yürüyüşe çıktılar."
    },
    {
      id: "but_yet_still",
      label: "BUT / YET / STILL",
      tr: "Ama / Yine de / Fakat",
      group: "G3", // Ortacı (FANBOYS)
      category: "contrast",
      twinId: "twin_contrast_1",
      punctuationPattern: "SVO, Bağlaç SVO",
      rule: "G3: İki bağımsız cümleyi ortadan virgüille bağlar. Asla cümle başında büyük harfle başlamaz.",
      exampleEN: "He studied very hard, yet he failed the exam.",
      exampleTR: "Çok çalıştı, yine de sınavda başarısız oldu."
    },
    {
      id: "however_nevertheless",
      label: "HOWEVER / NEVERTHELESS / NONETHELESS / EVEN SO",
      tr: "Yine de / Bununla birlikte / Aksine",
      group: "G4", // Noktalamacı (Transition)
      category: "contrast",
      twinId: "twin_contrast_1",
      punctuationPattern: "SVO; Bağlaç, SVO veya SVO. Bağlaç, SVO",
      rule: "G4: İki cümle arasında noktalı virgül (;) veya nokta (.) sonrasında virgülle kullanılır.",
      exampleEN: "The weather was terrible; however, the flight took off on time.",
      exampleTR: "Hava berbattı; yine de uçak zamanında havalandı."
    },
    {
      id: "while_whereas_direct",
      label: "WHILE / WHEREAS",
      tr: "-e karşın / Oysa / Saf Kıyaslama",
      group: "G1",
      category: "contrast",
      twinId: "twin_contrast_2",
      punctuationPattern: "SVO, Bağlaç SVO / Bağlaç SVO, SVO",
      rule: "G1: Zıtlık ve durum kıyaslaması yapar, tam cümle alır.",
      exampleEN: "While electric cars are eco-friendly, traditional ones rely on fossil fuels.",
      exampleTR: "Elektrikli araçlar çevre dostu iken, geleneksel olanlar fosil yakıtlara dayanır."
    },
    {
      id: "unlike_contrary_to",
      label: "UNLIKE / CONTRARY TO / IN CONTRAST TO / AS OPPOSED TO",
      tr: "-in aksine / -in tersine",
      group: "G2",
      category: "contrast",
      twinId: "twin_contrast_2",
      punctuationPattern: "Bağlaç + Noun, SVO",
      rule: "G2: Karşılaştırmalı zıtlık edatıdır, isim veya zamir alır.",
      exampleEN: "Unlike her brother, she is extremely interested in mathematics.",
      exampleTR: "Kardeşinin aksine, o matematiğe son derece ilgilidir."
    },
    {
      id: "on_the_other_hand",
      label: "ON THE OTHER HAND / IN CONTRAST / CONVERSELY / ON THE CONTRARY",
      tr: "Diğer yandan / Aksine / Tam tersine",
      group: "G4",
      category: "contrast",
      twinId: "twin_contrast_2",
      punctuationPattern: "SVO; Bağlaç, SVO",
      rule: "G4: Geçiş zarfıdır. Cümle başında veya noktalı virgülden sonra virgülle kullanılır.",
      exampleEN: "Solar energy is renewable; on the other hand, coal reserves are limited.",
      exampleTR: "Güneş enerjisi yenilenebilirdir; diğer yandan kömür rezervleri sınırlıdır."
    },

    // 2. SEBEP - SONUÇ (CAUSE & EFFECT)
    {
      id: "because_since_as",
      label: "BECAUSE / SINCE / AS / INASMUCH AS / SEEING THAT / GIVEN THAT",
      tr: "Çünkü / -dığı için / -den dolayı",
      group: "G1",
      category: "cause_effect",
      twinId: "twin_cause_1",
      punctuationPattern: "Bağlaç + SVO, SVO",
      rule: "G1: Sebep yan cümlesi kurar, tam cümle alır.",
      exampleEN: "Since the project was urgent, the team worked overnight.",
      exampleTR: "Proje acil olduğu için ekip gece boyunca çalıştı."
    },
    {
      id: "because_of_due_to",
      label: "BECAUSE OF / DUE TO / OWING TO / ON ACCOUNT OF / IN VIEW OF / BY VIRTUE OF",
      tr: "-den dolayı / Yüzünden / Nedeniyle / Sayesinde",
      group: "G2",
      category: "cause_effect",
      twinId: "twin_cause_1",
      punctuationPattern: "Bağlaç + Noun, SVO",
      rule: "G2: Sebep edatıdır. Sadece isim veya isim öbeği alır (SVO almaz!).",
      exampleEN: "Due to the technical malfunction, the train was delayed.",
      exampleTR: "Teknik arıza nedeniyle tren gecikti."
    },
    {
      id: "so_for_coord",
      label: "SO / FOR (Coordinating)",
      tr: "Bu yüzden (So) / Çünkü (For)",
      group: "G3",
      category: "cause_effect",
      twinId: "twin_cause_1",
      punctuationPattern: "SVO, Bağlaç SVO",
      rule: "G3: Eş bağlaştır. 'So' sonuç, 'For' sebep bildirir ve ortada virgülden sonra gelir.",
      exampleEN: "The storm destroyed the power lines, so the city lost electricity.",
      exampleTR: "Fırtına elektrik hatlarını tahrip etti, bu yüzden şehir elektriksiz kaldı."
    },
    {
      id: "therefore_thus_hence",
      label: "THEREFORE / THUS / HENCE / CONSEQUENTLY / AS A RESULT / ACCORDINGLY",
      tr: "Bu yüzden / Dolayısıyla / Sonuç olarak",
      group: "G4",
      category: "cause_effect",
      twinId: "twin_cause_1",
      punctuationPattern: "SVO; Bağlaç, SVO",
      rule: "G4: Sonuç geçiş ifadesidir. Noktalı virgül (;) veya nokta (.) sonrası virgülle ayrılır.",
      exampleEN: "Inflation rose sharply; therefore, central banks hiked interest rates.",
      exampleTR: "Enflasyon keskin yükseldi; bu yüzden merkez bankaları faiz artırdı."
    },
    {
      id: "owing_to_fact_that",
      label: "OWING TO THE FACT THAT / DUE TO THE FACT THAT",
      tr: "-dığı gerçeğinden dolayı",
      group: "G1",
      category: "cause_effect",
      punctuationPattern: "Bağlaç + SVO, SVO",
      rule: "G1: Edatın arkasına 'the fact that' gelerek cümleye dönüştürülmüş hali.",
      exampleEN: "Due to the fact that he was sick, he couldn't attend the meeting.",
      exampleTR: "Hasta olduğu gerçeğinden dolayı toplantıya katılamadı."
    },
    {
      id: "thereby_v_ing",
      label: "THEREBY + V-ING",
      tr: "Böylelikle -erek / -arak",
      group: "G2",
      category: "cause_effect",
      punctuationPattern: "SVO, thereby V-ing + Object",
      rule: "G2 / Kısaltma: Eylemin sonucunu V-ing ile bağlar.",
      exampleEN: "The company automated the process, thereby reducing production costs.",
      exampleTR: "Şirket süreci otomatikleştirdi, böylece üretim maliyetlerini düşürdü."
    },

    // 3. SEBEP-SONUÇ FİİLLERİ (YÖN VEKTÖRÜ)
    {
      id: "lead_to_cause_verb",
      label: "LEAD TO / CAUSE / BRING ABOUT / PRODUCE / INDUCE / PROVOKE / PROMPT / TRIGGER / GIVE RISE TO / CULMINATE IN / PAVE THE WAY FOR",
      tr: "Yol açmak / Tetiklemek / Neden olmak",
      group: "G2",
      category: "cause_effect",
      direction: "cause_to_effect", // NEDEN -> ETKİ
      rule: "🔴 NEDEN ➔ ETKİ: Özne Neden'dir, Nesne ise Etki'dir. (Örn: Smoking causes cancer).",
      exampleEN: "Unhealthy diet paves the way for chronic cardiovascular diseases.",
      exampleTR: "Sağlıksız beslenme kronik kalp-damar hastalıklarına zemin hazırlar."
    },
    {
      id: "is_responsible_for_verb",
      label: "IS / ARE RESPONSIBLE FOR / CONTRIBUTES TO",
      tr: "Sorumlu olmak / Katkıda bulunmak (Neden olmak)",
      group: "G2",
      category: "cause_effect",
      direction: "cause_to_effect",
      rule: "🔴 NEDEN ➔ ETKİ: Özne sebeptir.",
      exampleEN: "Greenhouse gases are responsible for global climate change.",
      exampleTR: "Sera gazları küresel iklim değişikliğinden sorumludur."
    },
    {
      id: "stem_from_result_from",
      label: "STEM FROM / RESULT FROM / ARISE FROM / ORIGINATE FROM / IS DUE TO / IS CAUSED BY / IS ATTRIBUTED TO / IS ASCRIBED TO",
      tr: "Kaynaklanmak / Doğmak / -den ileri gelmek",
      group: "G2",
      category: "cause_effect",
      direction: "effect_to_cause", // ETKİ -> NEDEN
      rule: "🔵 ETKİ ➔ NEDEN: Özne Etki'dir, Nesne ise Neden'dir. (Örn: Cancer results from smoking).",
      exampleEN: "Many health issues stem from lack of physical activity and poor sleep.",
      exampleTR: "Birçok sağlık sorunu fiziksel aktivite eksikliğinden ve kötü uykudan kaynaklanır."
    },

    // 4. EKLEME VE PARALELLİK (ADDITION)
    {
      id: "in_addition_that",
      label: "IN ADDITION THAT / NOT ONLY... BUT ALSO",
      tr: "Ayrıca / Sadece ... değil aynı zamanda ...",
      group: "G1",
      category: "addition",
      twinId: "twin_add_1",
      punctuationPattern: "Bağlaç + SVO, SVO",
      rule: "G1: Ekleme yapan cümle bağlacıdır.",
      exampleEN: "In addition that he speaks fluently, he writes academic articles.",
      exampleTR: "Akıcı konuşmasının yanı sıra akademik makaleler yazıyor."
    },
    {
      id: "in_addition_to_prep",
      label: "IN ADDITION TO / BESIDES / ASIDE FROM / APART FROM / ALONG WITH / TOGETHER WITH",
      tr: "-e ek olarak / Yanı sıra / İle birlikte",
      group: "G2",
      category: "addition",
      twinId: "twin_add_1",
      punctuationPattern: "Bağlaç + Noun, SVO",
      rule: "G2: İsim alan ekleme edatıdır.",
      exampleEN: "In addition to English, she masters Spanish and French.",
      exampleTR: "İngilizceye ek olarak İspanyolca ve Fransızcaya hakimdir."
    },
    {
      id: "and_coord",
      label: "AND",
      tr: "Ve",
      group: "G3",
      category: "addition",
      twinId: "twin_add_1",
      punctuationPattern: "SVO, Bağlaç SVO",
      rule: "G3: Eş bağlaçtır.",
      exampleEN: "He finished the report, and he sent it to the manager.",
      exampleTR: "Raporu bitirdi ve müdüre gönderdi."
    },
    {
      id: "furthermore_moreover",
      label: "FURTHERMORE / MOREOVER / IN ADDITION / BESIDES / WHAT IS MORE / LIKEWISE / SIMILARLY",
      tr: "Ayrıca / Üstelik / Dahası / Benzer şekilde",
      group: "G4",
      category: "addition",
      twinId: "twin_add_1",
      punctuationPattern: "SVO; Bağlaç, SVO",
      rule: "G4: Noktalamacı geçiş ifadesidir.",
      exampleEN: "The house is spacious; moreover, the rent is quite affordable.",
      exampleTR: "Ev geniş; üstelik kirası oldukça uygun."
    },

    // 5. ŞART BAĞLAÇLARI (CONDITION)
    {
      id: "if_unless_provided",
      label: "IF / UNLESS (-medikçe) / PROVIDED (THAT) / PROVIDING (THAT) / AS LONG AS / SO LONG AS / ON CONDITION THAT / IN CASE / IMAGINE THAT / ONLY IF",
      tr: "Eğer / -medikçe / Şartıyla / Sürece / İhtimaline karşı",
      group: "G1",
      category: "condition",
      twinId: "twin_cond_1",
      punctuationPattern: "Bağlaç + SVO, SVO",
      rule: "G1: Şart yan cümlesidir, tam cümle alır.",
      exampleEN: "As long as you preserve your focus, you will achieve your goals.",
      exampleTR: "Odaklanmanı koruduğun sürece hedeflerine ulaşacaksın."
    },
    {
      id: "in_case_of_event_of",
      label: "IN CASE OF / IN THE EVENT OF",
      tr: "Durumunda / İhtimaline karşı (Edat)",
      group: "G2",
      category: "condition",
      twinId: "twin_cond_1",
      punctuationPattern: "Bağlaç + Noun, SVO",
      rule: "G2: Şart edatıdır. İsim alır.",
      exampleEN: "In case of emergency, press the red button immediately.",
      exampleTR: "Acil durum halinde derhal kırmızı düğmeye basın."
    },
    {
      id: "otherwise_or_else",
      label: "OTHERWISE / OR ELSE",
      tr: "Aksi takdirde / Yoksa",
      group: "G4",
      category: "condition",
      twinId: "twin_cond_1",
      punctuationPattern: "SVO; Bağlaç, SVO",
      rule: "G4: Şart geçiş ifadesidir.",
      exampleEN: "We must submit the proposal today; otherwise, we will lose the client.",
      exampleTR: "Teklifi bugün sunmalıyız; aksi takdirde müşteriyi kaybedeceğiz."
    },

    // 6. ZAMAN BAĞLAÇLARI VE ÇAPALARI (TIME)
    {
      id: "when_while_as_soon_as",
      label: "WHEN / WHILE / AS / BEFORE / AFTER / UNTIL / TILL / AS SOON AS / ONCE / BY THE TIME / SINCE / WHENEVER / THE MOMENT / DIRECTLY",
      tr: "-dığında / -erken / -er etmez / -e kadar / -den beri / -dığı an",
      group: "G1",
      category: "time",
      punctuationPattern: "Bağlaç + SVO, SVO",
      rule: "G1: Zaman yan cümlesi bağlaçları. Zaman uyumu zorunludur! (Past-Past / Present-Present). Exception: SINCE (V2 -> HAS/HAVE V3).",
      exampleEN: "By the time the paramedics arrived, the patient had recovered.",
      exampleTR: "Sağlık görevlileri varana kadar hasta iyileşmişti."
    },
    {
      id: "prior_to_subsequent_to",
      label: "PRIOR TO / SUBSEQUENT TO / BEFORE / AFTER / FOLLOWING / UNTIL / DURING / THROUGHOUT",
      tr: "-den önce / -den sonra / Esnasında / Boyunca",
      group: "G2",
      category: "time",
      punctuationPattern: "Bağlaç + Noun/V-ing, SVO",
      rule: "G2: Zaman edatları. İsim veya V-ing alır.",
      exampleEN: "Prior to the industrial revolution, most people lived in rural areas.",
      exampleTR: "Sanayi devriminden önce çoğu insan kırsal bölgelerde yaşıyordu."
    },
    {
      id: "meanwhile_afterwards",
      label: "MEANWHILE / IN THE MEANTIME / SUBSEQUENTLY / AFTERWARDS / EVENTUALLY / ULTIMATELY",
      tr: "Bu esnada / Sonrasında / Nihayetinde / Sonunda",
      group: "G4",
      category: "time",
      punctuationPattern: "SVO; Bağlaç, SVO",
      rule: "G4: Zaman geçiş ifadeleri.",
      exampleEN: "The research team gathered data; subsequently, they published the report.",
      exampleTR: "Araştırma ekibi veri topladı; sonrasında makaleyi yayımladılar."
    },

    // 7. AMAÇ VE DERECE (PURPOSE & DEGREE)
    {
      id: "so_that_in_order_that",
      label: "SO THAT / IN ORDER THAT / LEST / FOR FEAR THAT",
      tr: "-sın diye / -mesi amacıyla / -mesin diye",
      group: "G1",
      category: "purpose",
      punctuationPattern: "Bağlaç + SVO (can/could/will), SVO",
      rule: "G1: Amaç cümlesi bağlacı. Genellikle modallar (can, could, may, might) içerir.",
      exampleEN: "He saved money so that he could buy a new laptop.",
      exampleTR: "Yeni bir dizüstü bilgisayar alabilsin diye para biriktirdi."
    },
    {
      id: "in_order_to_so_as_to",
      label: "IN ORDER TO + V1 / SO AS TO + V1 / TO + V1 / WITH THE AIM OF + V-ing",
      tr: "-mek için / Amacıyla",
      group: "G2",
      category: "purpose",
      punctuationPattern: "Bağlaç + V1 / V-ing, SVO",
      rule: "G2: Amaç edatları. Yalın fiil (V1) veya V-ing alır.",
      exampleEN: "They arrived early in order to secure good seats.",
      exampleTR: "İyi koltuklar kapmak için erken vardılar."
    },
    {
      id: "so_that_such_that_degree",
      label: "SO ... THAT / SUCH ... THAT / SO MUCH SO THAT",
      tr: "Öyle ... ki / O kadar ... ki",
      group: "G1",
      category: "purpose",
      punctuationPattern: "SO + Adj/Adv + THAT + SVO",
      rule: "G1: Derece-sonuç kalıbı.",
      exampleEN: "The argument was so convincing that everyone agreed.",
      exampleTR: "Argüman öyle ikna ediciydi ki herkes katıldı."
    },

    // 8. DEVRİK YAPILAR VE KISALTMALAR (INVERTED & REDUCTION)
    {
      id: "no_sooner_hardly",
      label: "NO SOONER ... THAN / HARDLY ... WHEN / BARELY ... WHEN",
      tr: "Tam ... olmuştu ki ... oldu (Devrik)",
      group: "G1",
      category: "inverted",
      punctuationPattern: "No sooner HAD + S + V3 ... THAN + S + V2",
      rule: "⚡ DEVRİK YAPI: 'Had + S + V3' kalıbı başa çekilir.",
      exampleEN: "No sooner had he entered the room than the alarm went off.",
      exampleTR: "Tam odaya girmişti ki alarm çaldı."
    },
    {
      id: "having_v3_reduction",
      label: "HAVING + V3 / HAVING BEEN + V3 / UPON (+ V-ing)",
      tr: "-dikten sonra / -er etmez (Zaman Kısaltması)",
      group: "G2",
      category: "reduction",
      punctuationPattern: "Having + V3 + Object, SVO",
      rule: "✂️ KISALTMA: 'After + Had V3' yapısının öznesi ortak aktif/pasif kısaltmasıdır.",
      exampleEN: "Having completed the exam, she felt a great sense of relief.",
      exampleTR: "Sınavı tamamladıktan sonra büyük bir rahatlama hissetti."
    },
    {
      id: "v3_passive_participle",
      label: "V3 / BEING V3 (Passive Reduction)",
      tr: "Pasif Kısaltma (-dığında / -diğinde)",
      group: "G2",
      category: "reduction",
      punctuationPattern: "V3 + Phrase, SVO",
      rule: "✂️ KISALTMA: Yan cümledeki pasif fiilin 'Being V3' veya 'V3' şeklinde kısaltılmasıdır.",
      exampleEN: "Discovered by ancient Romans, the mineral is still used today.",
      exampleTR: "Antik Romalılar tarafından keşfedilen mineral bugün hala kullanılıyor."
    },

    // 9. ÖRNEKLEME & AÇIKLAMA (ILLUSTRATION)
    {
      id: "just_as_so",
      label: "JUST AS ... SO ... / AS",
      tr: "Tıpkı ... gibi ... öyle de",
      group: "G1",
      category: "illustration",
      punctuationPattern: "Just as SVO, so SVO",
      rule: "G1: Benzetme bağlacıdır.",
      exampleEN: "Just as the body needs food, so the mind needs knowledge.",
      exampleTR: "Vücudun besine ihtiyacı olduğu gibi, zihnin de bilgiye ihtiyacı vardır."
    },
    {
      id: "for_example_instance",
      label: "FOR EXAMPLE / FOR INSTANCE / IN OTHER WORDS / THAT IS / NAMELY / IN FACT / INDEED",
      tr: "Örneğin / Diğer deyişle / Yani / Aslında / Nitekim",
      group: "G4",
      category: "illustration",
      punctuationPattern: "SVO; Bağlaç, SVO",
      rule: "G4: Örneklendirme ve açıklama geçiş ifadesidir.",
      exampleEN: "Renewable energy is growing; for instance, solar power adoption doubled.",
      exampleTR: "Yenilenebilir enerji büyüyor; örneğin güneş enerjisi kullanımı ikiye katlandı."
    }
  ];

  // ─── 2. EZBER ROBOTU STATE YÖNETİMİ ─────────────────────────────────────

  let stateEZ = {
    mode: "refleks", // 'refleks' | 'punctuation' | 'direction' | 'twins' | 'flashcards'
    currentIndex: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    totalQuestions: 0,
    correctCount: 0,
    selectedOption: null,
    answered: false,
    timer: null,
    timeLeft: 5,
    timerActive: false,
    boxLevels: {}, // { item_id: 1 | 2 | 3 } (Spaced Repetition)
    filteredItems: []
  };

  // LocalStorage sync for Spaced Repetition boxes
  function loadBoxLevels() {
    try {
      const saved = localStorage.getItem("amok_ezber_boxes");
      if (saved) {
        stateEZ.boxLevels = JSON.parse(saved);
      } else {
        stateEZ.boxLevels = {};
      }
    } catch (e) {
      stateEZ.boxLevels = {};
    }
  }

  function saveBoxLevels() {
    try {
      localStorage.setItem("amok_ezber_boxes", JSON.stringify(stateEZ.boxLevels));
    } catch (e) {}
  }

  // ─── 3. ANA UYGULAMA İNİTİALİZASYONU ────────────────────────────────────

  window.initEzberRobotu = function () {
    loadBoxLevels();
    stateEZ.filteredItems = [...DRILL_ITEMS];
    renderEzberUI();
    setupEventListeners();
    loadNextQuestion();
  };

  // ─── 4. ARAYÜZ (HTML / DOM RENDER) ──────────────────────────────────────

  function renderEzberUI() {
    const container = document.getElementById("tab-content-ezber-robotu");
    if (!container) return;

    container.innerHTML = `
      <div class="ezber-wrapper">
        
        <!-- Üst Banner & Mod Tencereleri -->
        <div class="ezber-header-card">
          <div class="ezber-title-row">
            <div>
              <h2 class="ezber-main-title">
                🧠 Bağlaç Robotu <span class="ezber-badge">PRO DRILL</span>
              </h2>
              <p class="ezber-subtitle">
                80+ bağlaç, edat ve neden-sonuç kalıbını refleks haline getiren aktif geri çağırma ve hafıza motoru.
              </p>
            </div>
            
            <!-- Canlı İstatistik Pill'leri -->
            <div class="ezber-stats-pills">
              <div class="ezber-stat-pill" title="Seri">
                <span class="ezber-stat-icon">🔥</span>
                <span class="ezber-stat-val" id="ez-streak-val">0</span>
              </div>
              <div class="ezber-stat-pill" title="Skor / Puan">
                <span class="ezber-stat-icon">⚡</span>
                <span class="ezber-stat-val" id="ez-score-val">0</span>
              </div>
              <div class="ezber-stat-pill" title="Doğruluk Oranı">
                <span class="ezber-stat-icon">🎯</span>
                <span class="ezber-stat-val" id="ez-accuracy-val">100%</span>
              </div>
            </div>
          </div>

          <!-- Mod Seçim Butonları -->
          <div class="ezber-mode-nav">
            <button class="ez-mode-btn ${stateEZ.mode === 'refleks' ? 'active' : ''}" data-mode="refleks">
              🎯 G1-G4 Refleks Oyunu
            </button>
            <button class="ez-mode-btn ${stateEZ.mode === 'punctuation' ? 'active' : ''}" data-mode="punctuation">
              ✍️ Noktalama Hacking
            </button>
            <button class="ez-mode-btn ${stateEZ.mode === 'direction' ? 'active' : ''}" data-mode="direction">
              ↔️ Neden-Etki Yön Okları
            </button>
            <button class="ez-mode-btn ${stateEZ.mode === 'twins' ? 'active' : ''}" data-mode="twins">
              🔄 İkiz Yapı Eşleştirme
            </button>
            <button class="ez-mode-btn ${stateEZ.mode === 'flashcards' ? 'active' : ''}" data-mode="flashcards">
              🎴 Flashcard (Aralıklı Tekrar)
            </button>
          </div>
        </div>

        <!-- Ana Oyun / Soru Gövdesi -->
        <div class="ezber-play-area" id="ezber-play-area">
          <!-- Dinamik Mod İçeriği Buraya Gelecek -->
        </div>

      </div>
    `;
  }

  function setupEventListeners() {
    const container = document.getElementById("tab-content-ezber-robotu");
    if (!container) return;

    // Mod değiştirme butonları
    container.addEventListener("click", function (e) {
      const modeBtn = e.target.closest(".ez-mode-btn");
      if (modeBtn) {
        const targetMode = modeBtn.dataset.mode;
        if (targetMode !== stateEZ.mode) {
          stateEZ.mode = targetMode;
          document.querySelectorAll(".ez-mode-btn").forEach(b => b.classList.remove("active"));
          modeBtn.classList.add("active");
          stateEZ.answered = false;
          stateEZ.selectedOption = null;
          loadNextQuestion();
        }
      }
    });
  }

  // ─── 5. SORU YÜKLEME VE MOD YÖNETİMİ ────────────────────────────────────

  function loadNextQuestion() {
    stateEZ.answered = false;
    stateEZ.selectedOption = null;

    const playArea = document.getElementById("ezber-play-area");
    if (!playArea) return;

    // Rastgele bir öge seç
    const randomIndex = Math.floor(Math.random() * DRILL_ITEMS.length);
    const item = DRILL_ITEMS[randomIndex];

    if (stateEZ.mode === "refleks") {
      renderRefleksMode(playArea, item);
    } else if (stateEZ.mode === "punctuation") {
      renderPunctuationMode(playArea, item);
    } else if (stateEZ.mode === "direction") {
      renderDirectionMode(playArea);
    } else if (stateEZ.mode === "twins") {
      renderTwinsMode(playArea);
    } else if (stateEZ.mode === "flashcards") {
      renderFlashcardsMode(playArea, item);
    }

    updateStatsHeader();
  }

  function updateStatsHeader() {
    const streakEl = document.getElementById("ez-streak-val");
    const scoreEl = document.getElementById("ez-score-val");
    const accEl = document.getElementById("ez-accuracy-val");

    if (streakEl) streakEl.textContent = stateEZ.streak;
    if (scoreEl) scoreEl.textContent = stateEZ.score;
    if (accEl) {
      const acc = stateEZ.totalQuestions > 0 
        ? Math.round((stateEZ.correctCount / stateEZ.totalQuestions) * 100) 
        : 100;
      accEl.textContent = `${acc}%`;
    }
  }

  // ─── MOD 1: G1-G4 REFLEKS OYUNU ──────────────────────────────────────────

  function renderRefleksMode(container, item) {
    container.innerHTML = `
      <div class="ez-card ez-pop-in">
        <div class="ez-card-badge">Zaman Sınırız Refleks Modu</div>
        <h3 class="ez-item-word">${item.label}</h3>
        <p class="ez-item-tr">"${item.tr}"</p>

        <div class="ez-prompt-text">
          Bu yapının dilbilgisel grubu ve aldığı tam öbek hangisidir?
        </div>

        <div class="ez-grid-options">
          <button class="ez-opt-btn group-g1" data-group="G1">
            <span class="ez-group-tag">G1</span>
            <span class="ez-group-desc">Cümle Alan (S+V+O)</span>
          </button>
          <button class="ez-opt-btn group-g2" data-group="G2">
            <span class="ez-group-tag">G2</span>
            <span class="ez-group-desc">İsim / V-ing Alan (Noun)</span>
          </button>
          <button class="ez-opt-btn group-g3" data-group="G3">
            <span class="ez-group-tag">G3</span>
            <span class="ez-group-desc">Ortacı (FANBOYS / Virgülden Sonra)</span>
          </button>
          <button class="ez-opt-btn group-g4" data-group="G4">
            <span class="ez-group-tag">G4</span>
            <span class="ez-group-desc">Noktalamacı / Transition (; ____,)</span>
          </button>
        </div>

        <div class="ez-feedback-box" id="ez-feedback-box" style="display: none;"></div>
      </div>
    `;

    const btns = container.querySelectorAll(".ez-opt-btn");
    btns.forEach(btn => {
      btn.onclick = function () {
        if (stateEZ.answered) return;
        const chosen = btn.dataset.group;
        handleAnswer(chosen === item.group, item, chosen, container);
      };
    });
  }

  // ─── MOD 2: NOKTALAMA HACKING ────────────────────────────────────────────

  function renderPunctuationMode(container, item) {
    // Generates punctuation blueprint question
    let questionText = "";
    if (item.group === "G4") {
      questionText = `The research was challenging; <strong class="ez-hl">________</strong>, the team reached breakthrough results.`;
    } else if (item.group === "G2") {
      questionText = `<strong class="ez-hl">________</strong> the harsh weather conditions, the expedition continued.`;
    } else if (item.group === "G3") {
      questionText = `She prepared thoroughly for the interview, <strong class="ez-hl">________</strong> she felt quite confident.`;
    } else {
      questionText = `<strong class="ez-hl">________</strong> the new law comes into force, all companies must comply with it.`;
    }

    container.innerHTML = `
      <div class="ez-card ez-pop-in">
        <div class="ez-card-badge">✍️ Noktalama İşaretinden Bağlaç Eleme</div>
        
        <div class="ez-sentence-box">
          "${questionText}"
        </div>

        <div class="ez-prompt-text">
          Boşluktaki noktalama düzenine (virgül / noktalı virgül / cümlenin aldığı ek) uygun olan bağlaç hangisidir?
        </div>

        <div class="ez-grid-options">
          <button class="ez-opt-btn" data-correct="${item.group === 'G4'}">
            <span>${item.group === 'G4' ? item.label : 'HOWEVER / THEREFORE'}</span>
            <small>G4: Noktalı Virgül (;) ve Virgül (,) arası</small>
          </button>
          <button class="ez-opt-btn" data-correct="${item.group === 'G2'}">
            <span>${item.group === 'G2' ? item.label : 'DESPITE / DUE TO'}</span>
            <small>G2: Doğrudan İsim Öbeği Alır (Virgülsüz)</small>
          </button>
          <button class="ez-opt-btn" data-correct="${item.group === 'G1'}">
            <span>${item.group === 'G1' ? item.label : 'ALTHOUGH / BECAUSE'}</span>
            <small>G1: Tam Yan Cümle (S+V+O) Alır</small>
          </button>
          <button class="ez-opt-btn" data-correct="${item.group === 'G3'}">
            <span>${item.group === 'G3' ? item.label : 'BUT / SO / YET'}</span>
            <small>G3: İki bağımsız cümleyi ortadan virgüille bağlar</small>
          </button>
        </div>

        <div class="ez-feedback-box" id="ez-feedback-box" style="display: none;"></div>
      </div>
    `;

    const btns = container.querySelectorAll(".ez-opt-btn");
    btns.forEach(btn => {
      btn.onclick = function () {
        if (stateEZ.answered) return;
        const isCorr = btn.dataset.correct === "true";
        handleAnswer(isCorr, item, btn.textContent.trim(), container);
      };
    });
  }

  // ─── MOD 3: SEBEP-SONUÇ YÖN OKLARI ───────────────────────────────────────

  function renderDirectionMode(container) {
    const dirItems = DRILL_ITEMS.filter(i => i.direction);
    const randomDirItem = dirItems[Math.floor(Math.random() * dirItems.length)];

    container.innerHTML = `
      <div class="ez-card ez-pop-in">
        <div class="ez-card-badge">↔️ Sebep-Sonuç Yön Vektörü</div>
        
        <h3 class="ez-item-word">${randomDirItem.label}</h3>
        <p class="ez-item-tr">"${randomDirItem.tr}"</p>

        <div class="ez-prompt-text">
          Bu fiil/edat kalıbının cümle içindeki **aktarım yönü** nedir?
        </div>

        <div class="ez-direction-grid">
          <button class="ez-dir-option red-dir" data-dir="cause_to_effect">
            <span class="ez-dir-arrow">🔴 NEDEN ➔ ETKİ</span>
            <span class="ez-dir-sub">Yol açar / Tetikler / Meydana getirir (Özne Neden'dir)</span>
          </button>
          <button class="ez-dir-option blue-dir" data-dir="effect_to_cause">
            <span class="ez-dir-arrow">🔵 ETKİ ➔ NEDEN</span>
            <span class="ez-dir-sub">Kaynaklanır / İleri gelir / Atfedilir (Özne Etki'dir)</span>
          </button>
        </div>

        <div class="ez-feedback-box" id="ez-feedback-box" style="display: none;"></div>
      </div>
    `;

    const btns = container.querySelectorAll(".ez-dir-option");
    btns.forEach(btn => {
      btn.onclick = function () {
        if (stateEZ.answered) return;
        const chosenDir = btn.dataset.dir;
        const isCorr = chosenDir === randomDirItem.direction;
        handleAnswer(isCorr, randomDirItem, chosenDir, container);
      };
    });
  }

  // ─── MOD 4: İKİZ YAPI EŞLEŞTİRME ──────────────────────────────────────────

  function renderTwinsMode(container) {
    const twinItems = DRILL_ITEMS.filter(i => i.twinId);
    const sampleItem = twinItems[Math.floor(Math.random() * twinItems.length)];
    const matchingTwins = DRILL_ITEMS.filter(i => i.twinId === sampleItem.twinId && i.id !== sampleItem.id);
    const targetTwin = matchingTwins.length > 0 ? matchingTwins[0] : DRILL_ITEMS[0];

    container.innerHTML = `
      <div class="ez-card ez-pop-in">
        <div class="ez-card-badge">🔄 İkiz Yapı (Grup Dönüştürücü)</div>

        <div class="ez-twin-source">
          <span class="ez-twin-tag">${sampleItem.group}</span>
          <h4>${sampleItem.label}</h4>
          <p>"${sampleItem.tr}"</p>
        </div>

        <div class="ez-prompt-text">
          Bu yapının <strong>anlamdaş ikizi olan ${targetTwin.group}</strong> muadili hangisidir?
        </div>

        <div class="ez-grid-options">
          <button class="ez-opt-btn" data-correct="true">
            <span class="ez-group-tag">${targetTwin.group}</span>
            <span>${targetTwin.label}</span>
          </button>
          <button class="ez-opt-btn" data-correct="false">
            <span class="ez-group-tag">G1</span>
            <span>BECAUSE / SINCE</span>
          </button>
          <button class="ez-opt-btn" data-correct="false">
            <span class="ez-group-tag">G2</span>
            <span>IN ADDITION TO</span>
          </button>
          <button class="ez-opt-btn" data-correct="false">
            <span class="ez-group-tag">G4</span>
            <span>OTHERWISE / OR ELSE</span>
          </button>
        </div>

        <div class="ez-feedback-box" id="ez-feedback-box" style="display: none;"></div>
      </div>
    `;

    const btns = container.querySelectorAll(".ez-opt-btn");
    btns.forEach(btn => {
      btn.onclick = function () {
        if (stateEZ.answered) return;
        const isCorr = btn.dataset.correct === "true";
        handleAnswer(isCorr, sampleItem, btn.textContent.trim(), container);
      };
    });
  }

  // ─── MOD 5: FLASHCARD (ARALIKLI TEKRAR) ──────────────────────────────────

  function renderFlashcardsMode(container, item) {
    const level = stateEZ.boxLevels[item.id] || 1;

    container.innerHTML = `
      <div class="ez-card ez-pop-in ez-flashcard-wrap">
        <div class="ez-card-badge">🎴 Aktif Geri Çağırma & Aralıklı Tekrar (Kutu ${level})</div>

        <!-- 3D Flip Card Container -->
        <div class="ez-flip-card" id="ez-flip-card">
          <div class="ez-flip-inner">
            
            <!-- ÖN YÜZ -->
            <div class="ez-flip-front">
              <span class="ez-flip-tag">${item.group} (${item.category.toUpperCase()})</span>
              <h2 class="ez-flip-word">${item.label}</h2>
              <p class="ez-flip-hint">💡 Kartı çevirmek için üzerine tıklayın</p>
            </div>

            <!-- ARKA YÜZ -->
            <div class="ez-flip-back">
              <h3 class="ez-flip-tr">${item.tr}</h3>
              <div class="ez-flip-rule"><strong>Kural:</strong> ${item.rule}</div>
              <div class="ez-flip-sample">
                <p><strong>EN:</strong> ${item.exampleEN}</p>
                <p><strong>TR:</strong> ${item.exampleTR}</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Öğrenme Butonları -->
        <div class="ez-flash-actions">
          <button class="ez-flash-btn hard" id="btn-flash-hard">
            🔴 Tekrar Et (Kutuda Tut)
          </button>
          <button class="ez-flash-btn easy" id="btn-flash-easy">
            🟢 Biliyorum (Üst Kutuya Taşı)
          </button>
        </div>
      </div>
    `;

    const flipCard = container.querySelector("#ez-flip-card");
    if (flipCard) {
      flipCard.onclick = function () {
        flipCard.classList.toggle("flipped");
      };
    }

    const btnHard = container.querySelector("#btn-flash-hard");
    const btnEasy = container.querySelector("#btn-flash-easy");

    if (btnHard) {
      btnHard.onclick = function () {
        stateEZ.boxLevels[item.id] = 1;
        saveBoxLevels();
        if (typeof showToast === 'function') showToast(`"${item.label}" 1. Kutuda tutuldu.`, "info");
        loadNextQuestion();
      };
    }

    if (btnEasy) {
      btnEasy.onclick = function () {
        const nextLvl = Math.min((stateEZ.boxLevels[item.id] || 1) + 1, 3);
        stateEZ.boxLevels[item.id] = nextLvl;
        saveBoxLevels();
        stateEZ.score += 20;
        if (typeof showToast === 'function') showToast(`Tebrikler! "${item.label}" ${nextLvl}. Kutuya terfi etti! 🎉`, "success");
        loadNextQuestion();
      };
    }
  }

  // ─── 6. CEVAP KONTROLÜ VE CEVAP GÖSTERİMİ ─────────────────────────────────

  function handleAnswer(isCorrect, item, chosenVal, container) {
    stateEZ.answered = true;
    stateEZ.totalQuestions++;

    const feedbackBox = container.querySelector("#ez-feedback-box");

    if (isCorrect) {
      stateEZ.correctCount++;
      stateEZ.streak++;
      stateEZ.score += 15 + Math.min(stateEZ.streak * 2, 20);
      if (stateEZ.streak > stateEZ.bestStreak) stateEZ.bestStreak = stateEZ.streak;

      if (feedbackBox) {
        feedbackBox.className = "ez-feedback-box correct ez-pop-in";
        feedbackBox.style.display = "block";
        feedbackBox.innerHTML = `
          <div class="ez-fb-title">🎉 MÜKEMMEL! DOĞRU CEVAP!</div>
          <div class="ez-fb-desc">${item.rule}</div>
          <div class="ez-fb-example"><strong>Örnek:</strong> ${item.exampleEN}</div>
          <button class="btn btn-primary ez-next-btn" id="ez-btn-next">SONRAKİ YAPIDAN DEVAM ET ➔</button>
        `;
      }

      if (typeof confetti === "function" && stateEZ.streak % 5 === 0) {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      }

    } else {
      stateEZ.streak = 0;

      if (feedbackBox) {
        feedbackBox.className = "ez-feedback-box wrong ez-pop-in";
        feedbackBox.style.display = "block";
        feedbackBox.innerHTML = `
          <div class="ez-fb-title">❌ YANLIŞ CEVAP</div>
          <div class="ez-fb-desc">Doğru Grup: <strong>${item.group}</strong> - ${item.rule}</div>
          <div class="ez-fb-example"><strong>Örnek:</strong> ${item.exampleEN}</div>
          <button class="btn btn-primary ez-next-btn" id="ez-btn-next">ANLADIM, DEVAM ET ➔</button>
        `;
      }
    }

    updateStatsHeader();

    const nextBtn = container.querySelector("#ez-btn-next");
    if (nextBtn) {
      nextBtn.onclick = function () {
        loadNextQuestion();
      };
    }
  }

})();
