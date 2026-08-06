/**
 * 🤖 YAPI ROBOTU (STRUCTURE LAB) - KURAL MOTORU VE İNTERAKTİF MONTAJ
 */

(function () {
  // ─── 1. MATRİS VE PARÇA VERİ TABANI ──────────────────────────────────────

  // 1. Matris: Tüm Bağlaçlar, Çapalar, Kısaltmalar & Edat Öbekleri
  const CONNECTORS = [
    // ⏱️ Zaman & Tense Uyumları
    { id: "when", label: "WHEN", desc: "Zaman Bağlacı (-dığında / olunca)", category: "time", color: "#06b6d4" },
    { id: "while_as", label: "WHILE / AS", desc: "Eşzamanlılık Bağlacı (-erken / -mekte iken)", category: "time", color: "#06b6d4" },
    { id: "before", label: "BEFORE", desc: "Zaman Bağlacı (-den önce)", category: "time", color: "#06b6d4" },
    { id: "after", label: "AFTER", desc: "Zaman Bağlacı (-den sonra)", category: "time", color: "#06b6d4" },
    { id: "as_soon_as", label: "AS SOON AS / ONCE", desc: "Tezlik Bağlacı (-er etmez / anında)", category: "time", color: "#06b6d4" },
    { id: "until_till", label: "UNTIL / TILL", desc: "Süreç Sınırlandırıcı (-e kadar)", category: "time", color: "#06b6d4" },
    { id: "by_the_time", label: "BY THE TIME", desc: "Zaman Çapası Bağlacı (-dığı zamana kadar)", category: "time", color: "#06b6d4" },
    { id: "since", label: "SINCE", desc: "Zaman Çapası (-den beri)", category: "time", color: "#06b6d4" },
    { id: "by_time_anchor", label: "BY + Tarih (Tense Çapası)", desc: "Zaman Çapası (By 2050 / By 1900)", category: "time", color: "#06b6d4" },
    { id: "so_far", label: "SO FAR / UP TO NOW", desc: "Zaman Çapası (Şu ana kadar / Son yıllarda)", category: "time", color: "#06b6d4" },

    // 🔀 Cümle Bağlaçları & Geçiş İfadeleri (Tüm Kategorik Kalıplar)
    // A) Zıtlık & Karşılaştırma Geçiş İfadeleri
    { id: "however_nevertheless", label: "HOWEVER / NEVERTHELESS / NONETHELESS", desc: "Zıtlık Bağlacı (Yine de / Bununla birlikte)", category: "transitions", color: "#06b6d4" },
    { id: "in_contrast_on_the_other_hand", label: "IN CONTRAST / ON THE OTHER HAND", desc: "Karşılaştırma (Aksine / Diğer yandan)", category: "transitions", color: "#06b6d4" },
    { id: "on_the_contrary", label: "ON THE CONTRARY", desc: "Aksine / Tam tersine (Cümle; on the contrary, Cümle)", category: "transitions", color: "#06b6d4" },
    { id: "even_so", label: "EVEN SO", desc: "Öyle olsa bile / Yine de", category: "transitions", color: "#06b6d4" },

    // B) Sonuç & İlliyet Geçiş İfadeleri
    { id: "therefore_thus", label: "THEREFORE / THUS / HENCE", desc: "Sonuç Geçiş İfadesi (Bu yüzden / Dolayısıyla)", category: "transitions", color: "#06b6d4" },
    { id: "as_a_result_transition", label: "AS A RESULT / CONSEQUENTLY", desc: "Sonuç Olarak / Bunun neticesinde", category: "transitions", color: "#06b6d4" },
    { id: "accordingly_transition", label: "ACCORDINGLY", desc: "Buna bağlı olarak / Bu doğrultuda", category: "transitions", color: "#06b6d4" },

    // C) Ekleme & Paralellik Geçiş İfadeleri
    { id: "in_addition_moreover", label: "IN ADDITION / MOREOVER / FURTHERMORE", desc: "Ekleme İfadesi (Ayrıca / Üstelik / Dahası)", category: "transitions", color: "#06b6d4" },
    { id: "besides_what_is_more", label: "BESIDES / WHAT IS MORE", desc: "Bunun yanı sıra / Üstelik", category: "transitions", color: "#06b6d4" },
    { id: "likewise_similarly", label: "LIKEWISE / SIMILARLY", desc: "Benzer şekilde / Aynı biçimde", category: "transitions", color: "#06b6d4" },

    // D) Örneklendirme & Açıklama İfadeleri
    { id: "for_example_for_instance", label: "FOR EXAMPLE / FOR INSTANCE", desc: "Örneklendirme (Örneğin)", category: "transitions", color: "#06b6d4" },
    { id: "in_other_words_that_is", label: "IN OTHER WORDS / THAT IS (TO SAY)", desc: "Diğer bir deyişle / Yani", category: "transitions", color: "#06b6d4" },
    { id: "otherwise", label: "OTHERWISE / OR ELSE", desc: "Aksi takdirde / Yoksa", category: "transitions", color: "#06b6d4" },

    // 🎯 Neden-Etki Matrisi & Neden-Sonuç Fiilleri (Görsellerdeki Tüm Kalıplar)
    // A) Neden ➔ Fiil ➔ Etki Grubu (Yol Açmak / Meydana Getirmek)
    { id: "lead_to_cause", label: "LEAD TO / CAUSE / BRING ABOUT", desc: "Neden Olmak (NEDEN + lead to / cause / bring about + ETKİ)", category: "cause_effect", color: "#06b6d4" },
    { id: "is_responsible_for", label: "IS / ARE RESPONSIBLE FOR", desc: "Sorumlu Olmak (NEDEN + is/are responsible for + ETKİ)", category: "cause_effect", color: "#06b6d4" },
    { id: "produce_produces", label: "PRODUCE / PRODUCES", desc: "Meydana Getirmek (NEDEN + produce(s) + ETKİ)", category: "cause_effect", color: "#06b6d4" },
    { id: "induce_provoke_prompt", label: "INDUCE / PROVOKE / PROMPT", desc: "Uyarmak / Teşvik Etmek (NEDEN + induce / prompt + ETKİ)", category: "cause_effect", color: "#06b6d4" },
    { id: "result_in", label: "RESULT IN / RESULTS IN", desc: "İle Sonuçlanmak (NEDEN + result in + ETKİ)", category: "cause_effect", color: "#06b6d4" },
    { id: "trigger_triggers", label: "TRIGGER / TRIGGERS", desc: "Tetiklemek (NEDEN + trigger(s) + ETKİ)", category: "cause_effect", color: "#06b6d4" },
    { id: "give_rise_to", label: "GIVE RISE TO / GIVES RISE TO", desc: "Ortaya Çıkarmak (NEDEN + give(s) rise to + ETKİ)", category: "cause_effect", color: "#06b6d4" },
    { id: "contribute_to", label: "CONTRIBUTE TO / CONTRIBUTES TO", desc: "Katkıda Bulunmak (NEDEN + contribute(s) to + ETKİ)", category: "cause_effect", color: "#06b6d4" },
    { id: "pave_the_way_for", label: "PAVE THE WAY FOR", desc: "Zemin Hazırlamak (NEDEN + pave(s) the way for + ETKİ)", category: "cause_effect", color: "#06b6d4" },
    { id: "culminate_in", label: "CULMINATE IN / CULMINATES IN", desc: "Zirveye Ulaşmak (NEDEN + culminate(s) in + ETKİ)", category: "cause_effect", color: "#06b6d4" },

    // B) Etki ➔ Fiil ➔ Neden Grubu (Kaynaklanmak / Edilgen Neden)
    { id: "is_due_to", label: "IS / ARE DUE TO", desc: "İleri Gelmek (ETKİ + is/are due to + NEDEN)", category: "cause_effect", color: "#06b6d4" },
    { id: "result_from", label: "RESULT FROM / RESULTS FROM", desc: "Doğmak / Kaynaklanmak (ETKİ + result(s) from + NEDEN)", category: "cause_effect", color: "#06b6d4" },
    { id: "stem_from", label: "STEM FROM / STEMS FROM", desc: "Köken Almak (ETKİ + stem(s) from + NEDEN)", category: "cause_effect", color: "#06b6d4" },
    { id: "originate_from", label: "ORIGINATE FROM / IN", desc: "Doğmak (ETKİ + originate(s) in/from + NEDEN)", category: "cause_effect", color: "#06b6d4" },
    { id: "arise_from", label: "ARISE FROM / OUT OF", desc: "Meydana Gelmek (ETKİ + arise(s) from/out of + NEDEN)", category: "cause_effect", color: "#06b6d4" },
    { id: "is_attributed_to", label: "IS / ARE ATTRIBUTED TO", desc: "Atfedilmek (ETKİ + is/are attributed to + NEDEN)", category: "cause_effect", color: "#06b6d4" },
    { id: "is_ascribed_to", label: "IS ASCRIBED TO / ROOTED IN", desc: "Kök Salmak (ETKİ + is ascribed to / rooted in + NEDEN)", category: "cause_effect", color: "#06b6d4" },
    { id: "is_caused_by", label: "IS / ARE CAUSED BY", desc: "Neden Olunmak (ETKİ + is/are caused by + NEDEN)", category: "cause_effect", color: "#06b6d4" },

    // C) Neden-Etki Edat Öbekleri (Nedeniyle / Sayesinde + İsim)
    { id: "because_of_due_to_owing_to", label: "BECAUSE OF / DUE TO / OWING TO", desc: "Yüzünden / Dolayı (ETKİ Cümlesi + edat + NEDEN İsim Öbeği)", category: "cause_effect", color: "#06b6d4" },
    { id: "on_account_of_in_view_of", label: "ON ACCOUNT OF / IN VIEW OF", desc: "Göz Önüne Alındığında (ETKİ + on account of / in view of + NEDEN)", category: "cause_effect", color: "#06b6d4" },
    { id: "by_virtue_of", label: "BY VIRTUE OF / ON THE GROUNDS OF", desc: "Sayesinde / Gerekçesiyle (ETKİ + by virtue of + NEDEN)", category: "cause_effect", color: "#06b6d4" },
    { id: "as_a_result_of", label: "AS A RESULT OF / AS A CONSEQUENCE OF", desc: "Sonucu Olarak (ETKİ + as a result of + NEDEN İsim)", category: "cause_effect", color: "#06b6d4" },

    // D) Cümle Bağlayan Neden-Etki Bağlaçları & Kalıpları
    { id: "therefore_thus_hence", label: "THEREFORE / THUS / HENCE", desc: "Bu Yüzden (NEDEN Cümlesi; therefore, ETKİ Cümlesi)", category: "cause_effect", color: "#06b6d4" },
    { id: "consequently", label: "CONSEQUENTLY / AS A CONSEQUENCE", desc: "Bunun Neticesinde (NEDEN Cümlesi; consequently, ETKİ Cümlesi)", category: "cause_effect", color: "#06b6d4" },
    { id: "as_a_result_that", label: "AS A RESULT / WITH THE RESULT THAT", desc: "Sonuç Olarak (NEDEN Cümlesi; as a result, ETKİ Cümlesi)", category: "cause_effect", color: "#06b6d4" },
    { id: "accordingly", label: "ACCORDINGLY", desc: "Buna Bağlı Olarak (NEDEN Cümlesi; accordingly, ETKİ Cümlesi)", category: "cause_effect", color: "#06b6d4" },
    { id: "in_that", label: "IN THAT", desc: "-mesi bakımından / çünkü (ETKİ Cümlesi + in that + NEDEN Cümlesi)", category: "cause_effect", color: "#06b6d4" },
    { id: "inasmuch_as_seeing_that", label: "INASMUCH AS / SEEING THAT / GIVEN THAT", desc:-dığına göre / göz önüne alındığında (inasmuch as NEDEN, ETKİ)", category: "cause_effect", color: "#06b6d4" },
    { id: "owing_to_the_fact_that", label: "OWING TO THE FACT THAT / DUE TO THE FACT THAT", desc:-dığı gerçeğinden dolayı (ETKİ + owing to the fact that + NEDEN Cümlesi)", category: "cause_effect", color: "#06b6d4" },
    { id: "thereby_v_ing", label: "THEREBY + V-ING", desc: "Böylelikle -erek (Cümle, thereby + V-ing + Nesne)", category: "cause_effect", color: "#06b6d4" },
    { id: "so_that_such_that", label: "SO ... THAT / SUCH ... THAT", desc: "Öyle ... ki (Derece Sonuç Yapısı)", category: "cause_effect", color: "#06b6d4" },
    { id: "so_much_so_that", label: "SO MUCH SO THAT", desc: "Öyle bir dereceye kadar ki (NEDEN, so much so that ETKİ)", category: "cause_effect", color: "#06b6d4" },

    // ⚡ Devrik Yapılar & Zaman Kısaltmaları
    { id: "having_v3", label: "HAVING + V3 / HAVING BEEN + V3", desc: "Zaman Kısaltması (-dikten sonra)", category: "devrik_kısaltma", color: "#06b6d4" },
    { id: "prior_to", label: "PRIOR TO / SUBSEQUENT TO", desc: "Akademik Edat Öbeği (-den önce / -den sonra)", category: "devrik_kısaltma", color: "#06b6d4" },
    { id: "upon_on", label: "UPON / ON (+ V-ing)", desc: "Zaman Kısaltması (-er etmez / üzerine)", category: "devrik_kısaltma", color: "#06b6d4" },
    { id: "at_the_dawn", label: "AT THE DAWN OF / ON THE EVE OF", desc: "Çağ & Dönem Çapası (-in şafağında / arifesinde)", category: "devrik_kısaltma", color: "#06b6d4" },
    { id: "no_sooner_than", label: "NO SOONER ... THAN", desc: "Devrik Yapı (Tam ... olmuştu ki ... oldu)", category: "devrik_kısaltma", color: "#06b6d4" },
    { id: "hardly_when", label: "HARDLY / BARELY ... WHEN", desc: "Devrik Yapı (Henüz ... olmuştu ki ... oldu)", category: "devrik_kısaltma", color: "#06b6d4" },
    { id: "during_throughout", label: "DURING / THROUGHOUT", desc: "Edat Öbeği (Esnasında / Boyunca + İsim)", category: "devrik_kısaltma", color: "#06b6d4" },
    { id: "if_type0_1", label: "IF (Type 0 / 1)", desc: "Gerçek / Olası Koşul", category: "time", color: "#06b6d4" },
    { id: "if_type2", label: "IF (Type 2)", desc: "Şimdiki Zaman Hayali Koşul", category: "time", color: "#06b6d4" },
    { id: "if_type3", label: "IF (Type 3)", desc: "Geçmiş Zamanda Kaçırılmış Koşul / Pişmanlık", category: "time", color: "#06b6d4" },
    { id: "although", label: "ALTHOUGH / EVEN THOUGH", desc: "Zıtlık Bağlacı (-e rağmen)", category: "transitions", color: "#06b6d4" },
    { id: "because", label: "BECAUSE / AS / SINCE", desc: "Neden-Sonuç Bağlacı (Çünkü / -dığı için)", category: "cause_effect", color: "#06b6d4" }
  ];

  // 2. Matris: Yan Cümle Zamanları (Clause A)
  const CLAUSE_A_TENSES = [
    { id: "v1_present", label: "V1 / Present Simple", sample: "she studies hard", tenseGroup: "present", color: "#8b5cf6" },
    { id: "v2_past", label: "V2 / Past Simple", sample: "she studied hard", tenseGroup: "past", color: "#8b5cf6" },
    { id: "was_were_ving", label: "Was/Were + V-ing", sample: "she was studying late", tenseGroup: "past_cont", color: "#8b5cf6" },
    { id: "had_v3", label: "Had + V3 (Inverted / Past Perfect)", sample: "had she entered the room", tenseGroup: "past_perfect", color: "#8b5cf6" },
    { id: "has_v3", label: "Has/Have + V3 / Present Perfect", sample: "she has lived here", tenseGroup: "present_perfect", color: "#8b5cf6" },
    { id: "is_ving", label: "Am/Is/Are + V-ing", sample: "it is raining outside", tenseGroup: "present_cont", color: "#8b5cf6" },
    { id: "future_date", label: "[Gelecek Tarih / By 2050]", sample: "By 2050", tenseGroup: "future_date", color: "#8b5cf6" },
    { id: "past_date", label: "[Geçmiş Tarih / By 1900]", sample: "By 1900", tenseGroup: "past_date", color: "#8b5cf6" },
    { id: "v_ing_obj", label: "[V-ing + Nesne]", sample: "completing the report", tenseGroup: "ving", color: "#8b5cf6" },
    { id: "noun_phrase", label: "[Noun / İsim / Dönem İskeleti]", sample: "the exam period / the 20th century", tenseGroup: "noun", color: "#8b5cf6" }
  ];

  // 3. Matris: Ana Cümle / Modal Yapıları (Clause B)
  const CLAUSE_B_MODALS = [
    { id: "will_have_v3", label: "WILL HAVE + V3 (Future Perfect)", sample: "they will have finished the project", modalGroup: "future_perfect", color: "#ec4899" },
    { id: "will_v1", label: "WILL + V1", sample: "she will pass the exam", modalGroup: "future", color: "#ec4899" },
    { id: "v1_main", label: "V1 / Simple Present", sample: "she passes the exam", modalGroup: "present", color: "#ec4899" },
    { id: "v2_main", label: "V2 / Simple Past", sample: "she passed the exam / did the train leave", modalGroup: "past", color: "#ec4899" },
    { id: "was_were_ving_main", label: "Was/Were + V-ing", sample: "everyone was waiting", modalGroup: "past_cont", color: "#ec4899" },
    { id: "would_v1", label: "WOULD / COULD + V1", sample: "she would pass the exam", modalGroup: "would_v1", color: "#ec4899" },
    { id: "would_have_v3", label: "WOULD / COULD + HAVE V3", sample: "she would have passed the exam", modalGroup: "would_have_v3", color: "#ec4899" },
    { id: "has_v3_main", label: "HAS/HAVE + V3 (Present Perfect)", sample: "she has achieved great success", modalGroup: "present_perfect", color: "#ec4899" },
    { id: "had_v3_main", label: "HAD + V3 / Past Perfect", sample: "the train had already left", modalGroup: "past_perfect", color: "#ec4899" },
    { id: "can_may_v1", label: "CAN / MAY / MUST + V1", sample: "she can reach her goals", modalGroup: "modal_present", color: "#ec4899" }
  ];

  // ─── 2. KURAL MATRİS MOTORU (UYUMLULUK TABLOSU) ─────────────────────────

  const RULE_RULES = {
    by_the_time: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_have_v3"], trPattern: "O varana kadar projeyi tamamlamış olacaklar." },
        { clauseA: "v2_past", clauseB: ["had_v3_main"], trPattern: "İstasyona vardığında tren çoktan kalkmıştı." }
      ],
      ruleText: "BY THE TIME (Zaman Çapası): By the time + V1 ➔ WILL HAVE V3 | By the time + V2 ➔ HAD V3"
    },
    by_time_anchor: {
      validPairs: [
        { clauseA: "future_date", clauseB: ["will_have_v3"], trPattern: "2050 yılına kadar insanlık Mars'ta koloni kurmuş olacak." },
        { clauseA: "past_date", clauseB: ["had_v3_main"], trPattern: "1900 yılına kadar fabrika üretime başlamıştı." }
      ],
      ruleText: "BY + TARİH ÇAPASI: By + Gelecek Tarih ➔ WILL HAVE V3 | By + Geçmiş Tarih ➔ HAD V3"
    },
    so_far: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["has_v3_main"], trPattern: "Son yıllarda / Şu ana kadar birçok gelişme kaydedildi." },
        { clauseA: "v1_present", clauseB: ["has_v3_main"], trPattern: "Şu ana kadar tüm testleri geçtik." }
      ],
      ruleText: "SO FAR / UP TO NOW / HITHERTO / IN RECENT YEARS: Doğrudan Present Perfect (HAS/HAVE V3) gerektirir. Past V2 almaz!"
    },
    having_v3: {
      validPairs: [
        { clauseA: "v_ing_obj", clauseB: ["v2_main"], trPattern: "Raporu tamamladıktan sonra sunumu yaptı." }
      ],
      ruleText: "HAVING + V3 (Zaman Kısaltması): 'After + Had V3' yapısının aktif/pasif kısaltmasıdır. Ana cümle V2 (Past Simple) gerektirir!"
    },
    prior_to: {
      validPairs: [
        { clauseA: "v_ing_obj", clauseB: ["v2_main", "had_v3_main", "will_v1"], trPattern: "Savaştan / projeden önce hazırlıklar yapıldı." },
        { clauseA: "noun_phrase", clauseB: ["v2_main", "had_v3_main", "will_v1"], trPattern: "Sınav döneminden önce ders çalıştı." }
      ],
      ruleText: "PRIOR TO / SUBSEQUENT TO: Akademik edat öbeğidir. Cümle almaz; V-ing veya İsim Öbeği alarak ana cümleye bağlanır."
    },
    upon_on: {
      validPairs: [
        { clauseA: "v_ing_obj", clauseB: ["v2_main", "will_v1"], trPattern: "Varır varmaz / varışının üzerine haber verdi." }
      ],
      ruleText: "UPON / ON (+ V-ing): 'As soon as / when' yapısının akademik zaman kısaltmasıdır."
    },
    at_the_dawn: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "had_v3_main"], trPattern: "Sanayi devriminin şafağında fabrikalar kuruldu." }
      ],
      ruleText: "AT THE DAWN OF / ON THE EVE OF: Dönem / Tarih ismi alarak zaman çapası kurar."
    },
    when: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_v1", "v1_main", "can_may_v1"], trPattern: "O çok çalıştığında sınavı geçecek / geçer." },
        { clauseA: "v2_past", clauseB: ["v2_main", "was_were_ving_main"], trPattern: "O çalıştığında sınavı geçti / herkes ders çalışıyordu." }
      ],
      ruleText: "WHEN zaman uyumu gerektirir! Yan cümle Present (V1) ise ana cümle Will/V1/Modal; yan cümle Past (V2) ise ana cümle Past (V2/Was-Were Ving) olur."
    },
    while_as: {
      validPairs: [
        { clauseA: "was_were_ving", clauseB: ["v2_main", "was_were_ving_main"], trPattern: "Ders çalışıyorken kapı çaldı / kardeşi müzik dinliyordu." },
        { clauseA: "is_ving", clauseB: ["v1_main", "will_v1"], trPattern: "Yağmur yağıyorken içeride otururuz." }
      ],
      ruleText: "WHILE / AS (Eşzamanlılık): Yan cümle genellikle Continuous Tense (was/were V-ing) alır. Ana cümle V2 veya Continuous olur."
    },
    before: {
      validPairs: [
        { clauseA: "v2_past", clauseB: ["had_v3_main", "v2_main"], trPattern: "O gelmeden önce tren çoktan kalkmıştı." },
        { clauseA: "v1_present", clauseB: ["will_v1", "v1_main", "can_may_v1"], trPattern: "O gelmeden önce hazırlıkları tamamlayacağız." }
      ],
      ruleText: "BEFORE: Öncelikli eylem ana cümle tarafındadır ve 'Had V3' alır! Before yan cümlesi V2 ise ana cümle Had V3; V1 ise Will V1 olur."
    },
    after: {
      validPairs: [
        { clauseA: "had_v3", clauseB: ["v2_main"], trPattern: "Önceden çok çalıştıktan sonra sınavı geçti." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Sınav bittikten sonra eve gitti." },
        { clauseA: "v1_present", clauseB: ["will_v1", "v1_main"], trPattern: "Çok çalıştıktan sonra sınavı geçecek." }
      ],
      ruleText: "AFTER: Yan cümle öncelikli eylemdir ve 'Had V3' alabilir! After + Had V3 ➔ Ana Cümle V2."
    },
    as_soon_as: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_v1", "v1_main"], trPattern: "O gelir gelmez toplantıyı başlatacağız." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "O gelir gelmez haber verdi." }
      ],
      ruleText: "AS SOON AS / ONCE (Tezlik): Eylemler arasında zaman aralığı yoktur. Present ➔ Will V1; Past (V2) ➔ Past (V2) eşleşir."
    },
    until_till: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_v1", "v1_main", "can_may_v1"], trPattern: "O gelene kadar bekleyeceğiz." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "O gelene kadar beklediler." }
      ],
      ruleText: "UNTIL / TILL: Eylemin son sınırını gösterir. Yan cümlesine asla 'will' gelemez. V1 ➔ Will V1; V2 ➔ V2."
    },
    no_sooner_than: {
      validPairs: [
        { clauseA: "had_v3", clauseB: ["v2_main"], trPattern: "Tam içeri girmişti ki telefon çaldı." }
      ],
      ruleText: "NO SOONER ... THAN (Devrik Yapı): 'No sooner had + Özne + V3 ... than + Özne + V2' kalıbı zorunludur!"
    },
    hardly_when: {
      validPairs: [
        { clauseA: "had_v3", clauseB: ["v2_main"], trPattern: "Henüz evden çıkmıştı ki yağmur başladı." }
      ],
      ruleText: "HARDLY / BARELY ... WHEN (Devrik Yapı): 'Hardly had + Özne + V3 ... when + Özne + V2' kalıbı zorunludur!"
    },
    during_throughout: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "v1_main", "will_v1", "was_were_ving_main"], trPattern: "Yaz dönemi boyunca ders çalıştı / çalışacak." }
      ],
      ruleText: "DURING / THROUGHOUT (Edat Öbeği): Cümle almaz! Kendisinden sonra sadece İsim / İsim Öbeği (Noun Phrase) gelir!"
    },

    // 🎯 Neden-Etki Fiil ve Edat Kuralları
    is_responsible_for: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Şiddetli yağışlar sel felaketinden sorumludur / yol açmıştır." }
      ],
      ruleText: "IS / ARE RESPONSIBLE FOR (Fiil Kalıbı): NEDEN (İsim Öbeği) + is/are responsible for + ETKİ (İsim Öbeği)."
    },
    produce_produces: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Fabrikalar kirli atıklar meydana getirir." }
      ],
      ruleText: "PRODUCE / PRODUCES: NEDEN + produce(s) + ETKİ (Meydana getirmek)."
    },
    induce_provoke_prompt: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Yeni teşvikler yatırımları özendirdi / tetikledi." }
      ],
      ruleText: "INDUCE / PROVOKE / PROMPT: NEDEN + induce / prompt + ETKİ (Teşvik etmek / Yol açmak)."
    },
    result_in: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Dikkatsizlik büyük kazalarla sonuçlanır." }
      ],
      ruleText: "RESULT IN: NEDEN + result in + ETKİ (İle sonuçlanmak)."
    },
    trigger_triggers: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Stres sağlık sorunlarını tetikler." }
      ],
      ruleText: "TRIGGER / TRIGGERS: NEDEN + trigger(s) + ETKİ (Tetiklemek)."
    },
    give_rise_to: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Yeni teknoloji yeni iş alanları ortaya çıkarır." }
      ],
      ruleText: "GIVE RISE TO: NEDEN + give(s) rise to + ETKİ (Ortaya çıkarmak)."
    },
    contribute_to: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Düzenli egzersiz sağlığa katkı sağlar." }
      ],
      ruleText: "CONTRIBUTE TO: NEDEN + contribute(s) to + ETKİ (Katkıda bulunmak / Yol açmak)."
    },
    pave_the_way_for: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Bu keşif yeni tedavilere zemin hazırladı." }
      ],
      ruleText: "PAVE THE WAY FOR: NEDEN + pave(s) the way for + ETKİ (Zemin hazırlamak)."
    },
    culminate_in: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Yıllar süren çalışmalar büyük bir zaferle noktalandı." }
      ],
      ruleText: "CULMINATE IN: NEDEN + culminate(s) in + ETKİ (İle sonuçlanmak / Zirveye ulaşmak)."
    },

    // Etki ➔ Fiil ➔ Neden Grubu
    is_due_to: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Gecikme olumsuz hava şartlarından kaynaklanmaktadır." }
      ],
      ruleText: "IS / ARE DUE TO: ETKİ (İsim Öbeği) + is/are due to + NEDEN (İsim Öbeği)."
    },
    result_from: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Başarı disiplinli çalışmaktan doğar." }
      ],
      ruleText: "RESULT FROM: ETKİ + result(s) from + NEDEN (Kaynaklanmak)."
    },
    stem_from: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Sorunlar iletişim eksikliğinden köken alır." }
      ],
      ruleText: "STEM FROM: ETKİ + stem(s) from + NEDEN (Köken almak)."
    },
    originate_from: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Gelenek antik çağlardan doğmuştur." }
      ],
      ruleText: "ORIGINATE FROM / IN: ETKİ + originate(s) in/from + NEDEN."
    },
    arise_from: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Anlaşmazlıklar yanlış anlamalardan meydana gelir." }
      ],
      ruleText: "ARISE FROM / OUT OF: ETKİ + arise(s) from/out of + NEDEN."
    },
    is_attributed_to: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Artış yeni politikalara atfedilmektedir." }
      ],
      ruleText: "IS ATTRIBUTED TO: ETKİ + is/are attributed to + NEDEN."
    },
    is_ascribed_to: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Başarı ekibin özverisine bağlanmaktadır." }
      ],
      ruleText: "IS ASCRIBED TO / ROOTED IN: ETKİ + is ascribed to / rooted in + NEDEN."
    },
    is_caused_by: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Yangın elektrik kaçağından kaynaklandı." }
      ],
      ruleText: "IS CAUSED BY: ETKİ + is/are caused by + NEDEN (Neden olunmak)."
    },

    // Edat Öbekleri & Bağlaçlar
    because_of_due_to_owing_to: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "v1_main", "will_v1"], trPattern: "Fırtına nedeniyle uçuşlar iptal edildi." }
      ],
      ruleText: "BECAUSE OF / DUE TO / OWING TO: ETKİ Cümlesi + edat + NEDEN İsim Öbeği."
    },
    on_account_of_in_view_of: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "v1_main", "will_v1"], trPattern: "Yoğun talep göz önüne alındığında ek sefer konuldu." }
      ],
      ruleText: "ON ACCOUNT OF / IN VIEW OF: Göz önüne alındığında / -den dolayı."
    },
    by_virtue_of: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "v1_main", "will_v1"], trPattern: "Tecrübesi sayesinde projeyi başardı." }
      ],
      ruleText: "BY VIRTUE OF / ON THE GROUNDS OF: Sayesinde / Gerekçesiyle."
    },
    as_a_result_of: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "v1_main", "will_v1"], trPattern: "İhmalin sonucu olarak kaza meydana geldi." }
      ],
      ruleText: "AS A RESULT OF: -in sonucu olarak (+ İsim Öbeği)."
    },
    therefore_thus_hence: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Çok çalıştı; bu yüzden başarılı olacak." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Çok çalıştı; bu yüzden sınavı kazandı." }
      ],
      ruleText: "THEREFORE / THUS / HENCE: NEDEN Cümlesi; bu yüzden, ETKİ Cümlesi."
    },
    consequently: {
      validPairs: [
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Bunun neticesinde hedef tamamlandı." }
      ],
      ruleText: "CONSEQUENTLY / AS A CONSEQUENCE: Bunun neticesinde."
    },
    as_a_result_that: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Sonuç olarak proje başarıyla bitti." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Sonuç olarak proje başarıyla bitti." }
      ],
      ruleText: "AS A RESULT / WITH THE RESULT THAT: Sonuç olarak."
    },
    accordingly: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Buna bağlı olarak gerekli önlemler alınacak." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Buna bağlı olarak gerekli önlemler alındı." }
      ],
      ruleText: "ACCORDINGLY: Buna bağlı olarak / Bu doğrultuda."
    },
    in_that: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Bu yöntem faydalıdır çünkü zamandan tasarruf sağlar." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Bu yöntem faydalıydı çünkü zamandan tasarruf sağladı." }
      ],
      ruleText: "IN THAT: -mesi bakımından / çünkü (+ Cümle)."
    },
    inasmuch_as_seeing_that: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Madenler sınırlı olduğuna göre tasarruf etmeliyiz." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Madenler sınırlı olduğu için tasarruf edildi." }
      ],
      ruleText: "INASMUCH AS / SEEING THAT / GIVEN THAT: -dığına göre / göz önüne alındığında."
    },
    owing_to_the_fact_that: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Hava muhalefeti gerçeğinden dolayı erteledik." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Hava muhalefeti gerçeğinden dolayı ertelendi." }
      ],
      ruleText: "OWING TO THE FACT THAT: -dığı gerçeğinden dolayı (+ Cümle)."
    },
    thereby_v_ing: {
      validPairs: [
        { clauseA: "v_ing_obj", clauseB: ["v2_main", "v1_main"], trPattern: "Yatırımları artırdı, böylelikle yeni istihdam sağladı." }
      ],
      ruleText: "THEREBY + V-ING: Böylelikle -erek (Zaman Kısaltmalı Sonuç)."
    },
    so_that_such_that: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_v1", "can_may_v1"], trPattern: "Öyle hızlı koştu ki rekor kırdı." },
        { clauseA: "v2_past", clauseB: ["v2_main", "would_v1"], trPattern: "Öyle hızlı koştu ki rekor kırdı." }
      ],
      ruleText: "SO...THAT / SUCH...THAT: Öyle ... ki (Derece Sonuç Kalıbı)."
    },
    so_much_so_that: {
      validPairs: [
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Öyle bir dereceye kadar çalıştı ki dereceye girdi." }
      ],
      ruleText: "SO MUCH SO THAT: Öyle bir dereceye kadar ki."
    },

    // Geçiş İfadeleri Kuralları
    however_nevertheless: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Çok çalıştı; yine de sınavda zorlandı." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Çok çalıştı; yine de sınavı geçemedi." }
      ],
      ruleText: "HOWEVER / NEVERTHELESS / NONETHELESS: Zıtlık Geçiş İfadesi."
    },
    in_contrast_on_the_other_hand: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Ali çalışkandır; diğer yandan kardeş tembeldir." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Ali başarılıydı; aksine kardeşi zorlanıyordu." }
      ],
      ruleText: "IN CONTRAST / ON THE OTHER HAND: Karşılaştırma Geçiş İfadesi."
    },
    on_the_contrary: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Başarısız değil; tam tersine çok yetenekli." }
      ],
      ruleText: "ON THE CONTRARY: Tam tersine / Aksine."
    },
    even_so: {
      validPairs: [
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Hava soğuktu; öyle olsa bile dışarı çıktık." }
      ],
      ruleText: "EVEN SO: Öyle olsa bile / Yine de."
    },
    in_addition_moreover: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Zekidir; üstelik çok disiplinlidir." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Raporu bitirdi; ayrıca sunumu da hazırladı." }
      ],
      ruleText: "IN ADDITION / MOREOVER / FURTHERMORE: Ekleme İfadesi."
    },
    besides_what_is_more: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Ders anlatıyor; üstelik rehberlik de yapıyor." }
      ],
      ruleText: "BESIDES / WHAT IS MORE: Bunun yanı sıra / Üstelik."
    },
    likewise_similarly: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Fransa tedbir aldı; benzer şekilde Almanya da adımı attı." }
      ],
      ruleText: "LIKEWISE / SIMILARLY: Benzer şekilde."
    },
    for_example_for_instance: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Birçok ülke katıldı; örneğin Türkiye delegasyon gönderdi." }
      ],
      ruleText: "FOR EXAMPLE / FOR INSTANCE: Örneklendırma İfadesi."
    },
    in_other_words_that_is: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Sınavı geçti; diğer bir deyişle mezun oldu." }
      ],
      ruleText: "IN OTHER WORDS / THAT IS: Diğer bir deyişle."
    },
    otherwise: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_v1", "can_may_v1"], trPattern: "Acele etmeliyiz; aksi takdirde treni kaçıracağız." }
      ],
      ruleText: "OTHERWISE / OR ELSE: Aksi takdirde / Yoksa."
    },
    if_type0_1: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_v1", "v1_main", "can_may_v1"], trPattern: "Eğer çok çalışırsa sınavı geçecek." }
      ],
      ruleText: "IF Type 0 & 1 (Gerçek / Olası Koşul): Yan cümle Simple Present (V1), Ana cümle Will + V1, Present Simple veya Modal (Can/May) olur."
    },
    if_type2: {
      validPairs: [
        { clauseA: "v2_past", clauseB: ["would_v1"], trPattern: "Eğer çok çalışsaydı (şu an), sınavı geçerdi." }
      ],
      ruleText: "IF Type 2 (Şimdiki Zaman Hayali Koşul): Yan cümle Past Simple (V2), Ana cümle WOULD / COULD + V1 olur."
    },
    if_type3: {
      validPairs: [
        { clauseA: "had_v3", clauseB: ["would_have_v3"], trPattern: "Eğer (geçmişte) çok çalışmış olsaydı, sınavı geçmiş olacaktı." }
      ],
      ruleText: "IF Type 3 (Geçmiş Zamanda Kaçırılmış Koşul / Pişmanlık): Yan cümle HAD + V3 (Past Perfect), Ana cümle WOULD / COULD + HAVE V3 gerektirir!"
    },
    since: {
      validPairs: [
        { clauseA: "v2_past", clauseB: ["has_v3_main"], trPattern: "O buraya taşındığından beri büyük başarılar elde etti." }
      ],
      isTenseException: true,
      ruleText: "⚠️ <strong>ZAMAN UYUMSUZLUĞU İSTİSNASI (TENSE EXCEPTION):</strong> 'SINCE' bağlacı genel 'Past-Past / Present-Present' zaman uyumu kuralını tek başına bozar! Yan cümlesine Past Simple (V2), Ana cümlesine ise Present Perfect (Has/Have V3) zorunlu kılar."
    },
    although: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1", "can_may_v1"], trPattern: "Çok çalışmasına rağmen sınavda zorlanıyor." },
        { clauseA: "v2_past", clauseB: ["v2_main", "would_v1"], trPattern: "Çok çalışmasına rağmen sınavı geçemedi." }
      ],
      ruleText: "ALTHOUGH (Zıtlık Bağlacı): Yan cümle ile ana cümle tense uyumu içerisinde olmalıdır (Past ➔ Past, Present ➔ Present)."
    },
    because: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1", "can_may_v1"], trPattern: "Çok çalıştığı için sınavı geçecek." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Çok çalıştığı için sınavı geçti." },
        { clauseA: "had_v3", clauseB: ["v2_main"], trPattern: "Önceden çok çalışmış olduğu için sınavı geçti." }
      ],
      ruleText: "BECAUSE (Sebep Bağlacı): Mantıksal zaman sırasına uyan tenseler birbiriyle eşleşir."
    }
  };

  // ─── 3. GÖREV MODU (CHALLENGE) VERİ SETİ ─────────────────────────────────

  const CHALLENGES = [
    {
      id: 1,
      title: "Geçmişte gerçekleşmemiş ve pişmanlık belirten bir koşul cümlesi kur!",
      desc: "Tip 3 Conditional yapısını hatasız bir şekilde robota monte et.",
      rewardXP: 25,
      target: { connector: "if_type3", clauseA: "had_v3", clauseB: "would_have_v3" },
      hint: "Bağlaç: IF (Type 3) | 2. Slot: Had V3 | 3. Slot: Would have V3"
    },
    {
      id: 2,
      title: "'SINCE' bağlacının altın zaman kuralını uygula!",
      desc: "Geçmişte başlamış ve günümüze kadar uzanan eylem bağlacını doğru zamanlarla eşleştir.",
      rewardXP: 25,
      target: { connector: "since", clauseA: "v2_past", clauseB: "has_v3_main" },
      hint: "SINCE yan cümlesi V2, ana cümlesi Has/Have V3 ister!"
    },
    {
      id: 3,
      title: "'BY THE TIME' ile geçmişte tamamlanmış eylemi bağla!",
      desc: "İstasyona varıldığında trenin çoktan kalkmış olduğunu ifade eden zaman yapısını kur.",
      rewardXP: 30,
      target: { connector: "by_the_time", clauseA: "v2_past", clauseB: "had_v3_main" },
      hint: "By the time + V2 (Past Simple) ➔ Had + V3 (Past Perfect)"
    },
    {
      id: 4,
      title: "Şimdiki zaman için hayali bir koşul (Type 2 If) kurgula!",
      desc: "'Eğer şimdi çok çalışsaydı, sınavı geçerdi' anlamını veren yapıyı seç.",
      rewardXP: 25,
      target: { connector: "if_type2", clauseA: "v2_past", clauseB: "would_v1" },
      hint: "IF (Type 2) + V2 ➔ WOULD + V1"
    },
    {
      id: 5,
      title: "Geleceğe yönelik zaman bağlacı kuralını tamamla (WHEN)",
      desc: "Gelecek bildiren WHEN cümlelerinde yan cümleye Will gelmeyeceğini hatırla!",
      rewardXP: 20,
      target: { connector: "when", clauseA: "v1_present", clauseB: "will_v1" },
      hint: "When + V1 (Simple Present) ➔ Will + V1"
    }
  ];

  // ─── 4. UYGULAMA DURUMU (STATE) ─────────────────────────────────────────

  let state = {
    mode: "sandbox", // 'sandbox' veya 'challenge'
    selectedCategory: "all",
    selectedConnector: null,
    selectedClauseA: null,
    selectedClauseB: null,
    currentChallengeIndex: 0,
    completedChallenges: []
  };

  // ─── 5. DOM ELEMENTLERİ VE BAŞLATICI ────────────────────────────────────

  function initStructureRobot() {
    renderPalette();
    bindEvents();
    updateUI();
  }

  function renderPalette() {
    const connectorsContainer = document.getElementById("srobot-pieces-connectors");
    const clauseAContainer = document.getElementById("srobot-pieces-clause-a");
    const clauseBContainer = document.getElementById("srobot-pieces-clause-b");

    if (!connectorsContainer || !clauseAContainer || !clauseBContainer) return;

    // Filter Connectors by selected category
    const filteredConnectors = CONNECTORS.filter(c => {
      if (state.selectedCategory === "all") return true;
      return c.category === state.selectedCategory;
    });

    // Connectors Palette
    connectorsContainer.innerHTML = filteredConnectors.map(c => `
      <button class="srobot-piece-btn" data-type="connector" data-id="${c.id}" style="padding: 8px 14px; border-radius: var(--radius-md); border: 1px solid rgba(6, 182, 212, 0.3); background: rgba(6, 182, 212, 0.08); color: var(--text-primary); font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px;">
        <span>🔷</span> ${c.label}
      </button>
    `).join("");

    // Clause A Palette
    clauseAContainer.innerHTML = CLAUSE_A_TENSES.map(t => `
      <button class="srobot-piece-btn" data-type="clauseA" data-id="${t.id}" style="padding: 8px 14px; border-radius: var(--radius-md); border: 1px solid rgba(139, 92, 246, 0.3); background: rgba(139, 92, 246, 0.08); color: var(--text-primary); font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px;">
        <span>🟣</span> ${t.label}
      </button>
    `).join("");

    // Clause B Palette
    clauseBContainer.innerHTML = CLAUSE_B_MODALS.map(m => `
      <button class="srobot-piece-btn" data-type="clauseB" data-id="${m.id}" style="padding: 8px 14px; border-radius: var(--radius-md); border: 1px solid rgba(236, 72, 153, 0.3); background: rgba(236, 72, 153, 0.08); color: var(--text-primary); font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px;">
        <span>🔴</span> ${m.label}
      </button>
    `).join("");
  }

  function bindEvents() {
    // Category Filter Buttons
    document.querySelectorAll(".srobot-cat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".srobot-cat-btn").forEach(b => {
          b.classList.remove("active");
          b.style.background = "var(--bg-body)";
          b.style.color = "var(--text-secondary)";
          b.style.borderColor = "var(--border-color)";
        });
        btn.classList.add("active");
        btn.style.background = "var(--accent-primary)";
        btn.style.color = "#fff";
        btn.style.borderColor = "var(--accent-primary)";

        state.selectedCategory = btn.dataset.cat || "all";
        renderPalette();
        updateUI();
      });
    });
    // Mode Buttons
    const btnSandbox = document.getElementById("srobot-mode-sandbox");
    const btnChallenge = document.getElementById("srobot-mode-challenge");
    const challengeCard = document.getElementById("srobot-challenge-card");
    const btnCheckChallenge = document.getElementById("srobot-btn-check-challenge");
    const btnReset = document.getElementById("srobot-btn-reset");

    if (btnSandbox && btnChallenge) {
      btnSandbox.addEventListener("click", () => {
        state.mode = "sandbox";
        btnSandbox.classList.add("active");
        btnSandbox.style.background = "var(--accent-primary)";
        btnSandbox.style.color = "#fff";

        btnChallenge.classList.remove("active");
        btnChallenge.style.background = "transparent";
        btnChallenge.style.color = "var(--text-secondary)";

        if (challengeCard) challengeCard.style.display = "none";
        if (btnCheckChallenge) btnCheckChallenge.style.display = "none";
        resetSlots();
      });

      btnChallenge.addEventListener("click", () => {
        state.mode = "challenge";
        btnChallenge.classList.add("active");
        btnChallenge.style.background = "var(--accent-primary)";
        btnChallenge.style.color = "#fff";

        btnSandbox.classList.remove("active");
        btnSandbox.style.background = "transparent";
        btnSandbox.style.color = "var(--text-secondary)";

        if (challengeCard) challengeCard.style.display = "block";
        if (btnCheckChallenge) btnCheckChallenge.style.display = "block";
        loadChallenge(state.currentChallengeIndex);
        resetSlots();
      });
    }

    if (btnReset) {
      btnReset.addEventListener("click", resetSlots);
    }

    if (btnCheckChallenge) {
      btnCheckChallenge.addEventListener("click", verifyChallenge);
    }

    // Piece Click Listener
    document.removeEventListener("click", handlePieceClick);
    document.addEventListener("click", handlePieceClick);
  }

  function handlePieceClick(e) {
    const pieceBtn = e.target.closest(".srobot-piece-btn");
    if (!pieceBtn) return;
    if (pieceBtn.disabled || pieceBtn.classList.contains("disabled")) return;

    const type = pieceBtn.dataset.type;
    const id = pieceBtn.dataset.id;

    if (type === "connector") {
      state.selectedConnector = state.selectedConnector === id ? null : id;
    } else if (type === "clauseA") {
      state.selectedClauseA = state.selectedClauseA === id ? null : id;
    } else if (type === "clauseB") {
      state.selectedClauseB = state.selectedClauseB === id ? null : id;
    }

    updateUI();
  }

  function resetSlots() {
    state.selectedConnector = null;
    state.selectedClauseA = null;
    state.selectedClauseB = null;
    updateUI();
  }

  function loadChallenge(index) {
    const challenge = CHALLENGES[index];
    if (!challenge) return;

    document.getElementById("srobot-challenge-index").textContent = index + 1;
    document.getElementById("srobot-challenge-total").textContent = CHALLENGES.length;
    document.getElementById("srobot-challenge-title").textContent = challenge.title;
    document.getElementById("srobot-challenge-desc").textContent = challenge.desc;
    document.getElementById("srobot-challenge-reward").textContent = `+${challenge.rewardXP} XP`;
  }

  function verifyChallenge() {
    const challenge = CHALLENGES[state.currentChallengeIndex];
    if (!challenge) return;

    const { connector, clauseA, clauseB } = challenge.target;

    if (
      state.selectedConnector === connector &&
      state.selectedClauseA === clauseA &&
      state.selectedClauseB === clauseB
    ) {
      // Success!
      if (typeof window.showToast === "function") {
        window.showToast(`🎉 Mükemmel! Görev Tamamlandı! +${challenge.rewardXP} XP Kazandın!`, "success");
      } else {
        alert(`🎉 Mükemmel! Görev Tamamlandı! +${challenge.rewardXP} XP Kazandın!`);
      }

      if (typeof window.addXP === "function") {
        window.addXP(challenge.rewardXP);
      }

      if (state.currentChallengeIndex < CHALLENGES.length - 1) {
        state.currentChallengeIndex++;
        loadChallenge(state.currentChallengeIndex);
        resetSlots();
      } else {
        alert("🏆 TEBRİKLER! Tüm Yapı Robotu Görevlerini Tamamladın!");
      }
    } else {
      if (typeof window.showToast === "function") {
        window.showToast(`❌ Parça Yapısı Göreve Uymuyor! İpucu: ${challenge.hint}`, "error");
      } else {
        alert(`❌ Parça Yapısı Göreve Uymuyor!\n\nİpucu: ${challenge.hint}`);
      }
    }
  }

  // ─── 6. REAKTİF KİLİT MOTORU VE ARAYÜZ GÜNCELLEMESİ ───────────────────────

  function updateUI() {
    // 0. Dynamic Slot Titles Adaptation based on selected Connector Category
    const slotTitle1 = document.getElementById("srobot-slot-title-1");
    const slotTitle2 = document.getElementById("srobot-slot-title-2");
    const slotTitle3 = document.getElementById("srobot-slot-title-3");

    const connObj = CONNECTORS.find(c => c.id === state.selectedConnector);
    const clauseAObj = CLAUSE_A_TENSES.find(t => t.id === state.selectedClauseA);
    const clauseBObj = CLAUSE_B_MODALS.find(m => m.id === state.selectedClauseB);

    if (connObj && connObj.category === "cause_effect") {
      // 🎯 Neden-Etki Fiil Şablonu: Neden Öbeği ➔ Neden-Etki Fiili ➔ Sonuç Öbeği
      if (slotTitle1) slotTitle1.textContent = "1. YUVA: NEDEN (CAUSE) ÖBEĞİ";
      if (slotTitle2) slotTitle2.textContent = "2. MATRİS: NEDEN-ETKİ FİİLİ / EDATI";
      if (slotTitle3) slotTitle3.textContent = "3. YUVA: SONUÇ (EFFECT) ÖBEĞİ";
    } else if (connObj && connObj.category === "transitions") {
      // 🔀 Geçiş İfadesi Şablonu: Cümle A ➔ Geçiş İfadesi ➔ Cümle B
      if (slotTitle1) slotTitle1.textContent = "1. YUVA: BİRİNCİ YARGI (CÜMLE A)";
      if (slotTitle2) slotTitle2.textContent = "2. MATRİS: GEÇİŞ İFADESİ";
      if (slotTitle3) slotTitle3.textContent = "3. YUVA: İKİNCİ YARGI (CÜMLE B)";
    } else {
      // ⏱️ Standart Bağlaç Şablonu: Bağlaç ➔ Yan Cümle ➔ Ana Cümle
      if (slotTitle1) slotTitle1.textContent = "1. MATRİS: BAĞLAÇ / KOŞUL";
      if (slotTitle2) slotTitle2.textContent = "2. MATRİS: YAN CÜMLE ZAMANI (CLAUSE A)";
      if (slotTitle3) slotTitle3.textContent = "3. MATRİS: ANA CÜMLE / MODAL (CLAUSE B)";
    }

    // 1. Update Slot Content Targets
    const slotTarget1 = document.getElementById("srobot-slot-target-1");
    const slotTarget2 = document.getElementById("srobot-slot-target-2");
    const slotTarget3 = document.getElementById("srobot-slot-target-3");

    if (slotTarget1) {
      slotTarget1.innerHTML = connObj
        ? `<span style="color: #06b6d4;">🔷 ${connObj.label}</span>`
        : `<span style="color: var(--text-secondary); font-size: 0.85rem;">Parça Seçilmedi</span>`;
    }

    if (slotTarget2) {
      slotTarget2.innerHTML = clauseAObj
        ? `<span style="color: #8b5cf6;">🟣 ${clauseAObj.label}</span>`
        : `<span style="color: var(--text-secondary); font-size: 0.85rem;">Parça Seçilmedi</span>`;
    }

    if (slotTarget3) {
      slotTarget3.innerHTML = clauseBObj
        ? `<span style="color: #ec4899;">🔴 ${clauseBObj.label}</span>`
        : `<span style="color: var(--text-secondary); font-size: 0.85rem;">Parça Seçilmedi</span>`;
    }

    // 2. Highlight Selected Buttons
    document.querySelectorAll(".srobot-piece-btn").forEach(btn => {
      const type = btn.dataset.type;
      const id = btn.dataset.id;
      let isSelected = false;

      if (type === "connector" && state.selectedConnector === id) isSelected = true;
      if (type === "clauseA" && state.selectedClauseA === id) isSelected = true;
      if (type === "clauseB" && state.selectedClauseB === id) isSelected = true;

      if (isSelected) {
        btn.style.boxShadow = "0 0 0 3px #06b6d4, 0 4px 12px rgba(6, 182, 212, 0.4)";
        btn.style.transform = "translateY(-2px) scale(1.05)";
        btn.style.borderColor = "#06b6d4";
        btn.style.background = "rgba(6, 182, 212, 0.25)";
      } else {
        btn.style.boxShadow = "none";
        btn.style.transform = "none";
        if (type === "connector") {
          btn.style.borderColor = "rgba(6, 182, 212, 0.3)";
          btn.style.background = "rgba(6, 182, 212, 0.08)";
        } else if (type === "clauseA") {
          btn.style.borderColor = "rgba(139, 92, 246, 0.3)";
          btn.style.background = "rgba(139, 92, 246, 0.08)";
        } else if (type === "clauseB") {
          btn.style.borderColor = "rgba(236, 72, 153, 0.3)";
          btn.style.background = "rgba(236, 72, 153, 0.08)";
        }
      }
    });

    // 3. Filtering & Locking Logic based on Selected Connector
    let allowedClauseA = null;
    let allowedClauseB = null;
    let ruleExplanationText = "💡 Parçaları seçtikçe kural uyumu otomatik hesaplanır. Uyumsuz parçalar kilitlenir.";
    let isValidCombination = false;
    let sentenceENText = "...";
    let sentenceTRText = "Lütfen tüm yuvalara uygun parçalar seçin.";

    if (state.selectedConnector) {
      const rule = RULE_RULES[state.selectedConnector];
      if (rule && rule.validPairs) {
        ruleExplanationText = `💡 <strong>${connObj.label} Kuralı:</strong> ${rule.ruleText}`;
        const validPairs = rule.validPairs;
        allowedClauseA = validPairs.map(p => p.clauseA);

        if (state.selectedClauseA) {
          const matchingPair = validPairs.find(p => p.clauseA === state.selectedClauseA);
          if (matchingPair) {
            allowedClauseB = matchingPair.clauseB;
            if (state.selectedClauseB && allowedClauseB.includes(state.selectedClauseB)) {
              isValidCombination = true;
              sentenceTRText = matchingPair.trPattern;
            }
          }
        }
      } else {
        // Fallback for any unmapped connectors so they don't hardlock
        ruleExplanationText = `💡 <strong>${connObj.label}:</strong> Kural uyumu aktif.`;
        allowedClauseA = CLAUSE_A_TENSES.map(t => t.id);
        allowedClauseB = CLAUSE_B_MODALS.map(m => m.id);
        if (state.selectedClauseA && state.selectedClauseB) {
          isValidCombination = true;
          sentenceTRText = "Doğru dizilim yapıldı.";
        }
      }
    }

    // Lock/Unlock Buttons
    document.querySelectorAll(".srobot-piece-btn[data-type='clauseA']").forEach(btn => {
      const id = btn.dataset.id;
      if (allowedClauseA && !allowedClauseA.includes(id)) {
        btn.disabled = true;
        btn.style.opacity = "0.35";
        btn.style.cursor = "not-allowed";
        btn.title = "Bu bağlaç ile bu zaman uyumsuzdur!";
      } else {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
        btn.removeAttribute("title");
      }
    });

    document.querySelectorAll(".srobot-piece-btn[data-type='clauseB']").forEach(btn => {
      const id = btn.dataset.id;
      if (allowedClauseB && !allowedClauseB.includes(id)) {
        btn.disabled = true;
        btn.style.opacity = "0.35";
        btn.style.cursor = "not-allowed";
        btn.title = "Seçili bağlaç ve yan cümle zamanı ile uyumsuzdur!";
      } else {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
        btn.removeAttribute("title");
      }
    });

    // Build Live English Sentence
    if (connObj && clauseAObj && clauseBObj) {
      let connWord = connObj.label.split(" ")[0];
      if (connWord === "IF") connWord = "If";
      else connWord = connWord.charAt(0) + connWord.slice(1).toLowerCase();

      sentenceENText = `"${connWord} ${clauseAObj.sample}, ${clauseBObj.sample}."`;
    } else {
      let parts = [];
      if (connObj) parts.push(connObj.label);
      if (clauseAObj) parts.push(`[${clauseAObj.sample}]`);
      if (clauseBObj) parts.push(`[${clauseBObj.sample}]`);
      sentenceENText = parts.length > 0 ? parts.join(" ... ") : "...";
    }

    // Update Output Panel Text & Badges
    const sentenceENEl = document.getElementById("srobot-sentence-en");
    const sentenceTREl = document.getElementById("srobot-sentence-tr");
    const ruleExpEl = document.getElementById("srobot-rule-explanation");
    const badgeEl = document.getElementById("srobot-validation-badge");
    const eyeStatusEl = document.getElementById("srobot-eye-status");

    if (sentenceENEl) sentenceENEl.textContent = sentenceENText;
    if (sentenceTREl) sentenceTREl.textContent = sentenceTRText;
    if (ruleExpEl) ruleExpEl.innerHTML = ruleExplanationText;

    if (badgeEl && eyeStatusEl) {
      if (state.selectedConnector && state.selectedClauseA && state.selectedClauseB) {
        if (isValidCombination) {
          if (state.selectedConnector === "since") {
            badgeEl.textContent = "⚡ ZAMAN UYUMSUZLUĞU İSTİSNASI (ÖZEL KURAL)";
            badgeEl.style.background = "rgba(139, 92, 246, 0.25)";
            badgeEl.style.color = "#8b5cf6";
            eyeStatusEl.style.background = "#8b5cf6";
            eyeStatusEl.style.boxShadow = "0 0 10px #8b5cf6";
          } else {
            badgeEl.textContent = "🟢 %100 UYUMLU GÜÇLÜ YAPI";
            badgeEl.style.background = "rgba(16, 185, 129, 0.2)";
            badgeEl.style.color = "#10b981";
            eyeStatusEl.style.background = "#10b981";
            eyeStatusEl.style.boxShadow = "0 0 10px #10b981";
          }
        } else {
          badgeEl.textContent = "🔴 KURAL İHLALİ / UYUMSUZ PARÇALAR";
          badgeEl.style.background = "rgba(239, 68, 68, 0.2)";
          badgeEl.style.color = "#ef4444";
          eyeStatusEl.style.background = "#ef4444";
          eyeStatusEl.style.boxShadow = "0 0 10px #ef4444";
        }
      } else {
        badgeEl.textContent = "🟡 EKSİK PARÇALAR VAR";
        badgeEl.style.background = "rgba(245, 158, 11, 0.2)";
        badgeEl.style.color = "#f59e0b";
        eyeStatusEl.style.background = "#f59e0b";
        eyeStatusEl.style.boxShadow = "0 0 10px #f59e0b";
      }
    }
  }

  // Global init hook
  window.initStructureRobot = initStructureRobot;

  document.addEventListener("DOMContentLoaded", () => {
    initStructureRobot();
  });
})();
