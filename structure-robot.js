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
        { id: "inasmuch_as_seeing_that", label: "INASMUCH AS / SEEING THAT / GIVEN THAT", desc: "-dığına göre / göz önüne alındığında (inasmuch as NEDEN, ETKİ)", category: "cause_effect", color: "#06b6d4" },
        { id: "owing_to_the_fact_that", label: "OWING TO THE FACT THAT / DUE TO THE FACT THAT", desc: "-dığı gerçeğinden dolayı (ETKİ + owing to the fact that + NEDEN Cümlesi)", category: "cause_effect", color: "#06b6d4" },
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
    { id: "because", label: "BECAUSE / AS / SINCE", desc: "Neden-Sonuç Bağlacı (Çünkü / -dığı için)", category: "cause_effect", color: "#06b6d4" },

    // ⏱️ Ek Zaman Bağlaçları
    { id: "whenever", label: "WHENEVER / EVERY TIME", desc: "Her ... -dığında / Ne zaman ... -se", category: "time", color: "#06b6d4" },
    { id: "the_moment", label: "THE MOMENT / THE MINUTE / DIRECTLY", desc: "-dığı an / -dığı anda", category: "time", color: "#06b6d4" },

    // ⚡ Ek Koşul Bağlaçları
    { id: "unless", label: "UNLESS", desc: "-medikçe / -mazsa (If...not)", category: "time", color: "#06b6d4" },
    { id: "provided_that", label: "PROVIDED (THAT) / PROVIDING (THAT)", desc: "-mesi şartıyla / koşuluyla", category: "time", color: "#06b6d4" },
    { id: "as_long_as", label: "AS LONG AS / SO LONG AS", desc: "-diği sürece", category: "time", color: "#06b6d4" },
    { id: "in_case", label: "IN CASE", desc: "İhtimaline karşı / -ması durumunda", category: "time", color: "#06b6d4" },
    { id: "supposing_that", label: "SUPPOSING (THAT) / IMAGINE (THAT)", desc: "Varsayalım ki / Farz edelim ki", category: "time", color: "#06b6d4" },
    { id: "only_if", label: "ONLY IF", desc: "Yalnızca ... olursa / Ancak ... şartıyla", category: "time", color: "#06b6d4" },

    // 🎯 Amaç Bildiren Bağlaçlar (Purpose Clauses)
    { id: "so_that_purpose", label: "SO THAT (Purpose / Amaç)", desc: "-sın diye / -mesi için (Amaç Bağlacı)", category: "time", color: "#06b6d4" },
    { id: "in_order_that", label: "IN ORDER THAT", desc: "-mesi için / -sın diye (Resmi Amaç)", category: "time", color: "#06b6d4" },

    // 📢 Dolaylı Anlatım & İsim Cümlecikleri (Reported Speech & Noun Clauses)
    { id: "reported_speech", label: "SAID THAT (Reported Speech)", desc: "Dolaylı Anlatım / Backshift Kuralı", category: "time", color: "#06b6d4" },
    { id: "noun_clause", label: "I KNEW THAT (Noun Clause)", desc: "İsim Cümleciği Zaman Kayması", category: "time", color: "#06b6d4" },

    // 💭 Dilek, Varsayım & Hayali Durum Kalıpları
    { id: "wish_if_only", label: "WISH / IF ONLY", desc: "Keşke / Dilek Yapısı (Zaman Kayması)", category: "time", color: "#06b6d4" },
    { id: "as_if_as_though", label: "AS IF / AS THOUGH", desc: "Sanki / -mış gibi (Gerçek Dışı)", category: "time", color: "#06b6d4" },
    { id: "its_time", label: "IT'S (HIGH) TIME", desc: "Artık ... zamanı geldi (+ Past Simple)", category: "time", color: "#06b6d4" },
    { id: "would_rather", label: "WOULD RATHER / WOULD SOONER", desc: "Tercih ederim ki (Zaman Kayması)", category: "time", color: "#06b6d4" },

    // ═══ 1. COORDINATING CONJUNCTIONS (FANBOYS) ═══
    { id: "and_coord", label: "AND", desc: "Ve (Eş Bağlaç)", category: "transitions", color: "#06b6d4" },
    { id: "but_yet_coord", label: "BUT / YET", desc: "Ama / Yine de (Eş Bağlaç - Zıtlık)", category: "transitions", color: "#06b6d4" },
    { id: "or_coord", label: "OR", desc: "Veya / Ya da (Eş Bağlaç - Seçenek)", category: "transitions", color: "#06b6d4" },
    { id: "nor_coord", label: "NOR", desc: "Ne de (Eş Bağlaç - Olumsuz)", category: "transitions", color: "#06b6d4" },
    { id: "for_coord", label: "FOR (Coordinating)", desc: "Çünkü / Zira (Eş Bağlaç - Neden)", category: "transitions", color: "#06b6d4" },
    { id: "so_coord", label: "SO (Coordinating)", desc: "Bu yüzden / Dolayısıyla (Eş Bağlaç - Sonuç)", category: "transitions", color: "#06b6d4" },

    // ═══ 2. EK SUBORDINATING ═══
    { id: "while_whereas", label: "WHILE / WHEREAS (Contrast)", desc: "-e karşın / Oysa (Karşılaştırma)", category: "transitions", color: "#06b6d4" },
    { id: "on_condition_that", label: "ON CONDITION THAT", desc: "Koşuluyla / Şartıyla", category: "time", color: "#06b6d4" },

    // ═══ 3. PREPOSITIONAL PHRASES ═══
    { id: "despite_in_spite_of", label: "DESPITE / IN SPITE OF / NOTWITHSTANDING", desc: "-e rağmen (Edat + İsim/V-ing)", category: "transitions", color: "#06b6d4" },
    { id: "in_order_to", label: "IN ORDER TO / SO AS TO", desc: "-mek için (Edat + Yalın Fiil)", category: "cause_effect", color: "#06b6d4" },
    { id: "in_addition_to_prep", label: "IN ADDITION TO / ALONG WITH", desc: "-e ek olarak / ile birlikte (Edat + İsim)", category: "transitions", color: "#06b6d4" },
    { id: "regarding_as_for", label: "REGARDING / WITH REGARD TO / AS FOR", desc: "-e gelince / Hususunda (Edat + İsim)", category: "transitions", color: "#06b6d4" },
    { id: "in_terms_of_in_light_of", label: "IN TERMS OF / IN LIGHT OF", desc: "Açısından / Işığında (Edat + İsim)", category: "transitions", color: "#06b6d4" },
    { id: "compared_to", label: "COMPARED TO / IN COMPARISON WITH", desc: "İle kıyaslandığında (Edat + İsim)", category: "transitions", color: "#06b6d4" },
    { id: "except_for_apart_from", label: "EXCEPT FOR / APART FROM / OTHER THAN", desc: "-den başka / Haricinde (Edat + İsim)", category: "transitions", color: "#06b6d4" },

    // ═══ 4. EK TRANSITIONS ═══
    { id: "namely", label: "NAMELY / TO PUT IT ANOTHER WAY", desc: "Yani / Şöyle ki / Başka bir deyişle", category: "transitions", color: "#06b6d4" },
    { id: "in_fact_indeed", label: "IN FACT / INDEED / AS A MATTER OF FACT", desc: "Aslında / Hatta / Nitekim (Vurgu)", category: "transitions", color: "#06b6d4" },
    { id: "first_firstly", label: "FIRST / FIRSTLY / FIRST OF ALL", desc: "İlk olarak / Öncelikle", category: "transitions", color: "#06b6d4" },
    { id: "meanwhile", label: "MEANWHILE / IN THE MEANTIME", desc: "Bu sırada / Bu esnada", category: "transitions", color: "#06b6d4" },
    { id: "subsequently", label: "SUBSEQUENTLY / AFTERWARDS", desc: "Sonrasında / Daha sonra", category: "transitions", color: "#06b6d4" },
    { id: "eventually", label: "EVENTUALLY / ULTIMATELY", desc: "Sonunda / Nihayetinde", category: "transitions", color: "#06b6d4" },
    { id: "in_summary", label: "IN SUMMARY / IN SHORT / IN BRIEF", desc: "Özetle / Kısacası", category: "transitions", color: "#06b6d4" },
    { id: "all_in_all", label: "ALL IN ALL / OVERALL / TO SUM UP", desc: "Genel olarak / Özetlemek gerekirse", category: "transitions", color: "#06b6d4" },

    // ═══ 5. CORRELATIVE CONJUNCTIONS ═══
    { id: "both_and", label: "BOTH ... AND ...", desc: "Hem ... hem ... (İkili Bağlaç)", category: "devrik_kısaltma", color: "#06b6d4" },
    { id: "either_or", label: "EITHER ... OR ...", desc: "Ya ... ya ... (İkili Bağlaç)", category: "devrik_kısaltma", color: "#06b6d4" },
    { id: "neither_nor", label: "NEITHER ... NOR ...", desc: "Ne ... ne ... (İkili Bağlaç)", category: "devrik_kısaltma", color: "#06b6d4" },
    { id: "not_only_but_also", label: "NOT ONLY ... BUT ALSO ...", desc: "Sadece ... değil, aynı zamanda ... (+ Devrik)", category: "devrik_kısaltma", color: "#06b6d4" },
    { id: "whether_or", label: "WHETHER ... OR ...", desc: "İster ... ister ... / Olup olmadığını", category: "devrik_kısaltma", color: "#06b6d4" },
    { id: "just_as_so", label: "JUST AS ... SO ...", desc: "Nasıl ki ... öyle de ...", category: "devrik_kısaltma", color: "#06b6d4" },

    // ═══ 6. EK INVERTED STRUCTURES ═══
    { id: "only_when_after_inv", label: "ONLY WHEN / ONLY AFTER (Devrik)", desc: "Ancak ... olduktan sonra + Devrik Cümle", category: "devrik_kısaltma", color: "#06b6d4" },

    // ═══ 7. PARTICIPLE CLAUSES (Pasif) ═══
    { id: "v3_passive_participle", label: "V3 / BEING V3 (Passive Reduction)", desc: "Pasif Kısaltma (Görüldüğünde / -dığında)", category: "devrik_kısaltma", color: "#06b6d4" },

    // ⏱️ ZAMAN ZARFLARI & TENSE ZORUNLULUKLARI (TIME ADVERBS)
    { id: "over_past_years", label: "OVER / IN / DURING THE PAST ...", desc: "Zaman Çapası (Son X yıldır/aydır ➔ Pres. Perf.)", category: "time", color: "#06b6d4" },
    { id: "lately_recently", label: "LATELY / RECENTLY", desc: "Yakın Geçmiş Zarfı (Son zamanlarda ➔ Pres. Perf.)", category: "time", color: "#06b6d4" },
    { id: "yesterday_ago_last", label: "YESTERDAY / ... AGO / LAST ...", desc: "Kesin Geçmiş Zaman Zarfı (➔ Simple Past V2)", category: "time", color: "#06b6d4" },
    { id: "how_long_ago", label: "HOW LONG AGO ... ?", desc: "Geçmiş Zaman Soru Zarfı (➔ Simple Past V2)", category: "time", color: "#06b6d4" },
    { id: "by_future_for", label: "BY (Future) + FOR (Duration)", desc: "Gelecekte Süreç Zarfı (➔ Future Perfect)", category: "time", color: "#06b6d4" },
    { id: "always_continuous", label: "ALWAYS / FOREVER (Şikayet)", desc: "Şikayet Bildiren Zaman Zarfı (➔ Continuous)", category: "time", color: "#06b6d4" },
    { id: "modal_past_adverb", label: "YESTERDAY / AGO + MODAL", desc: "Geçmiş Tahmin Zarfı (➔ Modal + Have V3)", category: "time", color: "#06b6d4" }
  ];

  // 2. Matris: Yan Cümle Zamanları (Clause A)
  const CLAUSE_A_TENSES = [
    { id: "v1_present", label: "V1 / Present Simple", sample: "she studies hard", sampleTR: "o sıkı çalışır", tenseGroup: "present", color: "#8b5cf6" },
    { id: "v2_past", label: "V2 / Past Simple", sample: "she studied hard", sampleTR: "o sıkı çalıştı", tenseGroup: "past", color: "#8b5cf6" },
    { id: "was_were_ving", label: "Was/Were + V-ing", sample: "she was studying late", sampleTR: "o geç saatlere kadar çalışıyordu", tenseGroup: "past_cont", color: "#8b5cf6" },
    { id: "had_v3", label: "Had + V3 (Past Perfect)", sample: "she had studied hard", sampleTR: "o sıkı çalışmıştı", tenseGroup: "past_perfect", color: "#8b5cf6" },
    { id: "has_v3", label: "Has/Have + V3 / Present Perfect", sample: "she has lived here", sampleTR: "o burada yaşadı", tenseGroup: "present_perfect", color: "#8b5cf6" },
    { id: "is_ving", label: "Am/Is/Are + V-ing", sample: "it is raining outside", sampleTR: "dışarıda yağmur yağıyor", tenseGroup: "present_cont", color: "#8b5cf6" },
    { id: "future_date", label: "[Gelecek Tarih / By 2050]", sample: "By 2050", sampleTR: "2050 yılına kadar", tenseGroup: "future_date", color: "#8b5cf6" },
    { id: "past_date", label: "[Geçmiş Tarih / By 1900]", sample: "By 1900", sampleTR: "1900 yılına kadar", tenseGroup: "past_date", color: "#8b5cf6" },
    { id: "v_ing_obj", label: "[V-ing + Nesne]", sample: "completing the report", sampleTR: "raporu tamamlamak", tenseGroup: "ving", color: "#8b5cf6" },
    { id: "noun_phrase", label: "[Noun / İsim / Dönem İskeleti]", sample: "the economic crisis", sampleTR: "ekonomik kriz", tenseGroup: "noun", color: "#8b5cf6" }
  ];

  // 3. Matris: Ana Cümle / Modal Yapıları (Clause B)
  const CLAUSE_B_MODALS = [
    { id: "will_have_v3", label: "WILL HAVE + V3 (Future Perfect)", sample: "they will have finished the project", sampleTR: "projeyi tamamlamış olacaklar", modalGroup: "future_perfect", color: "#ec4899" },
    { id: "will_v1", label: "WILL + V1", sample: "she will pass the exam", sampleTR: "sınavı geçecek", modalGroup: "future", color: "#ec4899" },
    { id: "v1_main", label: "V1 / Simple Present", sample: "she passes the exam", sampleTR: "sınavı geçer", modalGroup: "present", color: "#ec4899" },
    { id: "v2_main", label: "V2 / Simple Past", sample: "she passed the exam", sampleTR: "sınavı geçti", modalGroup: "past", color: "#ec4899" },
    { id: "was_were_ving_main", label: "Was/Were + V-ing", sample: "everyone was waiting", sampleTR: "herkes bekliyordu", modalGroup: "past_cont", color: "#ec4899" },
    { id: "would_v1", label: "WOULD / COULD + V1", sample: "she would pass the exam", sampleTR: "sınavı geçerdi", modalGroup: "would_v1", color: "#ec4899" },
    { id: "would_have_v3", label: "WOULD / COULD + HAVE V3", sample: "she would have passed the exam", sampleTR: "sınavı geçmiş olacaktı", modalGroup: "would_have_v3", color: "#ec4899" },
    { id: "has_v3_main", label: "HAS/HAVE + V3 (Present Perfect)", sample: "she has achieved great success", sampleTR: "büyük başarı elde etti", modalGroup: "present_perfect", color: "#ec4899" },
    { id: "had_v3_main", label: "HAD + V3 / Past Perfect", sample: "the train had already left", sampleTR: "tren çoktan kalkmıştı", modalGroup: "past_perfect", color: "#ec4899" },
    { id: "can_may_v1", label: "CAN / MAY / MUST + V1", sample: "she can reach her goals", sampleTR: "hedeflerine ulaşabilir", modalGroup: "modal_present", color: "#ec4899" },
    { id: "is_ving_main", label: "Am/Is/Are + V-ing (Continuous)", sample: "she is losing her keys", sampleTR: "anahtarlarını kaybediyor", modalGroup: "present_cont", color: "#ec4899" }
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
    },

    // Eksik Neden-Etki Fiili
    lead_to_cause: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v2_main", "v1_main"], trPattern: "Kirlilik çevre tahribatına yol açar / neden olur." },
        { clauseA: "v_ing_obj", clauseB: ["v2_main", "v1_main"], trPattern: "Aşırı çalışmak sağlık sorunlarına yol açar." }
      ],
      ruleText: "LEAD TO / CAUSE / BRING ABOUT: NEDEN (İsim/V-ing) + lead(s) to / cause(s) / bring(s) about + ETKİ (İsim Öbeği)."
    },

    // Eksik Geçiş İfadeleri (transitions kategorisi)
    therefore_thus: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Çok çalışıyor; bu yüzden başarılı olacak." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Çok çalıştı; dolayısıyla sınavı kazandı." }
      ],
      ruleText: "THEREFORE / THUS / HENCE (Geçiş İfadesi): NEDEN Cümlesi; bu yüzden, ETKİ Cümlesi."
    },
    as_a_result_transition: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Sonuç olarak hedeflerine ulaşacak." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Sonuç olarak proje tamamlandı." }
      ],
      ruleText: "AS A RESULT / CONSEQUENTLY (Geçiş İfadesi): NEDEN Cümlesi; sonuç olarak, ETKİ Cümlesi."
    },
    accordingly_transition: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Bu doğrultuda gerekli adımlar atılacak." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Bu doğrultuda gerekli adımlar atıldı." }
      ],
      ruleText: "ACCORDINGLY (Geçiş İfadesi): Buna bağlı olarak / Bu doğrultuda."
    },

    // ⏱️ Ek Zaman Bağlaçları
    whenever: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_v1", "v1_main", "can_may_v1"], trPattern: "Ne zaman çok çalışsa sınavı geçer / geçecek." },
        { clauseA: "v2_past", clauseB: ["v2_main", "was_were_ving_main"], trPattern: "Ne zaman çalışsa sınavı geçerdi." }
      ],
      ruleText: "WHENEVER / EVERY TIME: WHEN ile aynı zaman uyumu kuralına tabidir. Yan cümleye 'will' gelemez! V1 → V1/Will; V2 → V2."
    },
    the_moment: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_v1", "v1_main"], trPattern: "Geldiği anda toplantıyı başlatacağız." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Geldiği anda haber verdi." }
      ],
      ruleText: "THE MOMENT / THE MINUTE / DIRECTLY: 'As soon as' ile eş anlamlıdır. Yan cümleye 'will' gelemez!"
    },

    // ⚡ Ek Koşul Bağlaçları
    unless: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_v1", "v1_main", "can_may_v1"], trPattern: "Çok çalışmazsa sınavı geçemeyecek." }
      ],
      ruleText: "UNLESS (-medikçe): 'If...not' anlamındadır. Unless + Present Simple → Ana cümle Will/Modal. Yan cümleye 'will' gelemez!"
    },
    provided_that: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_v1", "v1_main", "can_may_v1"], trPattern: "Çok çalışması şartıyla sınavı geçecek." }
      ],
      ruleText: "PROVIDED (THAT) / PROVIDING (THAT): -mesi şartıyla. IF Type 1 kuralıyla aynıdır. V1 → Will/Modal."
    },
    as_long_as: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_v1", "v1_main", "can_may_v1"], trPattern: "Çalıştığı sürece sınavı geçecek." }
      ],
      ruleText: "AS LONG AS / SO LONG AS (-diği sürece): IF Type 1 kuralıyla aynıdır. V1 → Will/Modal. Yan cümleye 'will' gelemez!"
    },
    in_case: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_v1", "v1_main", "can_may_v1"], trPattern: "Yağmur yağması ihtimaline karşı şemsiye al." },
        { clauseA: "v2_past", clauseB: ["v2_main", "would_v1"], trPattern: "Yağmur yağması ihtimaline karşı şemsiye aldı." }
      ],
      ruleText: "IN CASE (ihtimaline karşı): Genelde Present Simple veya 'should' alır. Yan cümleye 'will' gelemez!"
    },
    supposing_that: {
      validPairs: [
        { clauseA: "v2_past", clauseB: ["would_v1"], trPattern: "Varsayalım ki kazansaydın, ne yapardın?" },
        { clauseA: "had_v3", clauseB: ["would_have_v3"], trPattern: "Farz edelim ki kazanmış olsaydın, ne yapmış olurdun?" }
      ],
      ruleText: "SUPPOSING (THAT) / IMAGINE (THAT): IF Type 2 ve Type 3 kurallarıyla aynıdır. V2 → Would V1; Had V3 → Would Have V3."
    },
    only_if: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_v1", "can_may_v1"], trPattern: "Yalnızca çok çalışırsa sınavı geçebilir." },
        { clauseA: "v2_past", clauseB: ["would_v1"], trPattern: "Yalnızca çalışsaydı geçerdi." }
      ],
      ruleText: "ONLY IF (Yalnızca ... olursa): Vurgulu koşul ifadesidir. IF kurallarına tabidir. V1 → Will/Modal; V2 → Would."
    },

    // 🎯 Amaç Bildiren Bağlaçlar
    so_that_purpose: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["can_may_v1", "will_v1"], trPattern: "Sınavı geçebilsin diye çok çalışıyor." },
        { clauseA: "v2_past", clauseB: ["would_v1"], trPattern: "Sınavı geçebilsin diye çok çalıştı." }
      ],
      ruleText: "SO THAT (Amaç): Ana cümle Present → yan cümlede can/will/may; Ana cümle Past → yan cümlede could/would/might. Zaman uyumu zorunludur!"
    },
    in_order_that: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["can_may_v1", "will_v1"], trPattern: "Sınavı geçmesi için çok çalışıyor." },
        { clauseA: "v2_past", clauseB: ["would_v1"], trPattern: "Sınavı geçmesi için çok çalıştı." }
      ],
      ruleText: "IN ORDER THAT (Resmi Amaç): SO THAT ile aynı zaman uyumu kuralına tabidir. Present → can/may; Past → could/would."
    },

    // 📢 Dolaylı Anlatım & İsim Cümlecikleri
    reported_speech: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v2_main"], trPattern: "'Çalışıyorum' → Çalıştığını söyledi. (Present → Past)" },
        { clauseA: "v2_past", clauseB: ["had_v3_main"], trPattern: "'Çalıştım' → Çalışmış olduğunu söyledi. (Past → Past Perfect)" },
        { clauseA: "has_v3", clauseB: ["had_v3_main"], trPattern: "'Çalışmışım' → Çalışmış olduğunu söyledi. (Pres. Perf. → Past Perf.)" }
      ],
      ruleText: "REPORTED SPEECH (Dolaylı Anlatım - Backshift): Ana fiil Past (said/told) ise yan cümle bir derece geçmişe kayar! Present → Past, Past → Past Perfect, Pres. Perf. → Past Perfect."
    },
    noun_clause: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1", "can_may_v1"], trPattern: "Çok çalıştığını biliyorum. (Know → Present/Future)" },
        { clauseA: "v2_past", clauseB: ["v2_main", "would_v1"], trPattern: "Çok çalıştığını biliyordum. (Knew → Past/Would)" }
      ],
      ruleText: "NOUN CLAUSE (İsim Cümleciği): 'I know that...' → Present/Future; 'I knew that...' → Past/Would. Ana fiil zamanı yan cümle zamanını belirler!"
    },

    // 💭 Dilek, Varsayım & Hayali Durum Kalıpları
    wish_if_only: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v2_main"], trPattern: "Keşke sınavı geçse." },
        { clauseA: "v2_past", clauseB: ["had_v3_main"], trPattern: "Keşke sınavı geçmiş olsaydı." }
      ],
      ruleText: "WISH / IF ONLY: Şu an için dilek → Past Simple; Geçmiş için pişmanlık → Past Perfect. Zaman gerçek zamandan bir derece geçmişe kaydırılır!"
    },
    as_if_as_though: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v2_main"], trPattern: "Sanki sınavı geçmiş gibi davranıyor." },
        { clauseA: "v2_past", clauseB: ["had_v3_main"], trPattern: "Sanki sınavı geçmiş gibi davrandı." }
      ],
      ruleText: "AS IF / AS THOUGH (Sanki): Gerçek dışı durum için zaman bir derece geçmişe kayar. Present durumda → Past Simple; Past durumda → Past Perfect."
    },
    its_time: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v2_main"], trPattern: "Artık sınavı geçme zamanı geldi de geçiyor." }
      ],
      ruleText: "IT'S (HIGH) TIME + Özne: Devamında Past Simple kullanılır! 'It's time we left.' Gerçek zaman Present olsa bile yapı Past Simple gerektirir."
    },
    would_rather: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v2_main"], trPattern: "Sınavı geçmesini tercih ederdim." },
        { clauseA: "v2_past", clauseB: ["had_v3_main"], trPattern: "Sınavı geçmiş olmasını tercih ederdim." }
      ],
      ruleText: "WOULD RATHER / WOULD SOONER + Özne: Şu an/Gelecek için → Past Simple; Geçmiş için → Past Perfect. Zaman bir derece geçmişe kayar!"
    },

    // ═══ 1. FANBOYS ═══
    and_coord: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Ders çalışır ve sınavı geçer." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Ders çalıştı ve sınavı geçti." }
      ],
      ruleText: "AND (Eş Bağlaç): İki eşit yargıyı veya iki bağımsız cümleyi bağlar."
    },
    but_yet_coord: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Ders çalışıyor ama sınavı geçemeyebilir." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Ders çalıştı fakat sınavı geçemedi." }
      ],
      ruleText: "BUT / YET (Zıtlık Eş Bağlacı): İki zıt yargıyı bağlar."
    },
    or_coord: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Ders çalışır veya projeyi tamamlar." }
      ],
      ruleText: "OR (Seçenek Eş Bağlacı): Alternatif sunar."
    },
    nor_coord: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Ne ders çalışır ne de sınavı geçer." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Ne ders çalıştı ne de sınavı geçti." }
      ],
      ruleText: "NOR (Olumsuz Eş Bağlaç): Olumsuz durumları bağlar."
    },
    for_coord: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Sınavı geçer çünkü çok çalışır." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Sınavı geçti çünkü çok çalıştı." }
      ],
      ruleText: "FOR (Neden Eş Bağlacı): Cümle ortasında 'çünkü' anlamında kullanılır."
    },
    so_coord: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Çok çalışıyor; bu yüzden sınavı geçecek." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Çok çalıştı; bu yüzden sınavı geçti." }
      ],
      ruleText: "SO (Sonuç Eş Bağlacı): Sonuç bildirir."
    },

    // ═══ 2. EK SUBORDINATING ═══
    while_whereas: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "O çalışırken kardeş oynuyor." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "O çalıştı oysa kardeş oynadı." }
      ],
      ruleText: "WHILE / WHEREAS: Doğrudan zıtlık ve karşılaştırma bildirir."
    },
    on_condition_that: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_v1", "v1_main"], trPattern: "Çalışması koşuluyla geçer." }
      ],
      ruleText: "ON CONDITION THAT: Koşul yapısıdır."
    },

    // ═══ 3. PREPOSITIONAL PHRASES ═══
    despite_in_spite_of: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "v1_main"], trPattern: "Zorluklara rağmen başardı." },
        { clauseA: "v_ing_obj", clauseB: ["v2_main", "v1_main"], trPattern: "Çok çalışmasına rağmen sınavı geçemedi." }
      ],
      ruleText: "DESPITE / IN SPITE OF: İsim veya V-ing alarak zıtlık bildirir."
    },
    in_order_to: {
      validPairs: [
        { clauseA: "v_ing_obj", clauseB: ["v2_main", "v1_main", "will_v1"], trPattern: "Başarmak için çalıştı." }
      ],
      ruleText: "IN ORDER TO / SO AS TO: Yalın fiil / V-ing ile amaç bildirir."
    },
    in_addition_to_prep: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "v1_main"], trPattern: "Buna ek olarak yeni adımlar atıldı." }
      ],
      ruleText: "IN ADDITION TO / ALONG WITH: İsim öbeği alarak ekleme yapar."
    },
    regarding_as_for: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "v1_main"], trPattern: "Bu konuya gelince adımlar atıldı." }
      ],
      ruleText: "REGARDING / WITH REGARD TO / AS FOR: İsim alarak husus bildirir."
    },
    in_terms_of_in_light_of: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "v1_main"], trPattern: "Açısından değerlendirildi." }
      ],
      ruleText: "IN TERMS OF / IN LIGHT OF: İsim alarak bakış açısı bildirir."
    },
    compared_to: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "v1_main"], trPattern: "Geçen yıla kıyasla başarılı oldu." }
      ],
      ruleText: "COMPARED TO: Kıyaslama bildirir."
    },
    except_for_apart_from: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "v1_main"], trPattern: "Bu durum haricinde sorun yok." }
      ],
      ruleText: "EXCEPT FOR / APART FROM: İstisna bildirir."
    },

    // ═══ 4. EK TRANSITIONS ═══
    namely: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Yani başarmak demektir." }
      ],
      ruleText: "NAMELY: Açıklama geçişidir."
    },
    in_fact_indeed: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Aslında çok başarılıdır." }
      ],
      ruleText: "IN FACT / INDEED: Vurgu geçişidir."
    },
    first_firstly: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "İlk olarak bu adım atılır." }
      ],
      ruleText: "FIRST / FIRSTLY: Sıralama geçişidir."
    },
    meanwhile: {
      validPairs: [
        { clauseA: "v2_past", clauseB: ["v2_main", "was_were_ving_main"], trPattern: "Bu sırada diğeri çalışıyordu." }
      ],
      ruleText: "MEANWHILE: Zaman geçişidir."
    },
    subsequently: {
      validPairs: [
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Sonrasında adım atıldı." }
      ],
      ruleText: "SUBSEQUENTLY: Zaman geçişidir."
    },
    eventually: {
      validPairs: [
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Sonunda başardı." }
      ],
      ruleText: "EVENTUALLY: Sonuç geçişidir."
    },
    in_summary: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Özetle başarılı bir süreçtir." }
      ],
      ruleText: "IN SUMMARY: Özet geçişidir."
    },
    all_in_all: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Genel olarak bakıldığında böyledir." }
      ],
      ruleText: "ALL IN ALL: Özet geçişidir."
    },

    // ═══ 5. CORRELATIVE CONJUNCTIONS ═══
    both_and: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Hem çalışır hem başarır." }
      ],
      ruleText: "BOTH ... AND ...: İkili bağlaç."
    },
    either_or: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Ya çalışır ya da başarısız olur." }
      ],
      ruleText: "EITHER ... OR ...: İkili alternatif."
    },
    neither_nor: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Ne çalışır ne de dinlenir." }
      ],
      ruleText: "NEITHER ... NOR ...: İkili olumsuzluk."
    },
    not_only_but_also: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Sadece çalışmakla kalmaz, aynı zamanda başarır." }
      ],
      ruleText: "NOT ONLY ... BUT ALSO ...: İkili ekleme."
    },
    whether_or: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "İster çalışsın ister çalışmasın başaracak." }
      ],
      ruleText: "WHETHER ... OR ...: Seçenek/Koşul ikilisi."
    },
    just_as_so: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Nasıl ki çalışır, öyle de başarır." }
      ],
      ruleText: "JUST AS ... SO ...: Benzetme ikilisi."
    },

    // ═══ 6. EK INVERTED ═══
    only_when_after_inv: {
      validPairs: [
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Ancak çalıştıktan sonra başardı." }
      ],
      ruleText: "ONLY WHEN / AFTER: Devrik ana cümle yapısı gerektirir."
    },

    // ═══ 7. PARTICIPLE ═══
    v3_passive_participle: {
      validPairs: [
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Uzaktan bakıldığında güzel görünür." },
        { clauseA: "noun_phrase", clauseB: ["v2_main"], trPattern: "İncelendiğinde durum netleşti." }
      ],
      ruleText: "V3 / BEING V3: Pasif kısaltma yapısıdır."
    },

    // ⏱️ ZAMAN ZARFLARI & TENSE ZORUNLULUKLARI
    over_past_years: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["has_v3_main"], trPattern: "Son 5 yılda teknoloji hızla gelişti." }
      ],
      ruleText: "⚠️ <strong>OVER / IN / DURING THE PAST (LAST) X YEARS:</strong> İçinde 'Past' kelimesi geçse dahi eylem günümüze ulaştığı için KESİNLİKLE Present Perfect (Has/Have V3) gerektirir. Simple Past (V2) kullanılamaz!"
    },
    lately_recently: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["has_v3_main"], trPattern: "Son zamanlarda önemli gelişmeler kaydedildi." }
      ],
      ruleText: "LATELY / RECENTLY / SO FAR: Etkisi devam eden yakın geçmiş zarfları KESİNLİKLE Present Perfect (Has/Have V3) zorunlu kılar."
    },
    yesterday_ago_last: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main"], trPattern: "Dün / İki gün önce sınavı geçti." }
      ],
      ruleText: "YESTERDAY / ... AGO / LAST ...: Tamamlanmış kesin geçmiş zaman zarfları KESİNLİKLE Simple Past (V2) zorunlu kılar. Has/Have V3 alamaz!"
    },
    how_long_ago: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main"], trPattern: "Ne kadar süre önce taşındın?" }
      ],
      ruleText: "HOW LONG AGO: 'Ago' kelimesi içerdiği için KESİNLİKLE Simple Past (V2 / Did) zorunlu kılar! ('How long...?' ise Present Perfect alabilir)."
    },
    by_future_for: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["will_have_v3"], trPattern: "Gelecek yıla kadar proje tamamlanmış olacak." },
        { clauseA: "future_date", clauseB: ["will_have_v3"], trPattern: "2050 yılına kadar proje tamamlanmış olacak." }
      ],
      ruleText: "BY (Gelecek Tarih) + FOR (Süreç): Gelecekte tamamlanacak süreçleri ifade ettiği için Future Perfect (Will Have V3 / Will Have Been V-ing) zorunlu kılar."
    },
    always_continuous: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["is_ving_main"], trPattern: "Sürekli anahtarlarını kaybedip duruyor!" }
      ],
      ruleText: "ALWAYS / FOREVER / CONSTANTLY (+ Continuous): Şikayet, rahatsızlık ve sürekli tekrarlanan eylemleri vurgularken Present Continuous (Am/Is/Are + V-ing) gerektirir."
    },
    modal_past_adverb: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["would_have_v3"], trPattern: "Dün sınavı geçmiş olacaktı." }
      ],
      ruleText: "YESTERDAY / AGO / LAST + MODALS: Geçmiş zaman zarfı içeren ihtimal veya eleştiri cümleleri KESİNLİKLE Modal + HAVE V3 (Must have / Should have / Could have V3) gerektirir."
    }
  };

  // ─── 2b. CÜMLE ŞABLONLARI (SENTENCE TEMPLATES) ──────────────────────────
  // Her bağlaç/yapı için doğru İngilizce cümle kalıbı.
  // {A} = Clause A (Yan Cümle) sample, {B} = Clause B (Ana Cümle) sample

  const SENTENCE_TEMPLATES = {
    // ⏱️ Zaman & Tense Bağlaçları
    when: "When {A}, {B}.",
    while_as: "While {A}, {B}.",
    before: "Before {A}, {B}.",
    after: "After {A}, {B}.",
    as_soon_as: "As soon as {A}, {B}.",
    until_till: "Until {A}, {B}.",
    by_the_time: "By the time {A}, {B}.",
    since: "Since {A}, {B}.",
    by_time_anchor: "{A}, {B}.",
    so_far: "So far, {B}.",

    // ⚡ Koşul Yapıları
    if_type0_1: "If {A}, {B}.",
    if_type2: "If {A}, {B}.",
    if_type3: "If {A}, {B}.",

    // 🔀 Zıtlık & Neden Bağlaçları
    although: "Although {A}, {B}.",
    because: "Because {A}, {B}.",

    // 🔀 Geçiş İfadeleri (Transitions)
    however_nevertheless: "{A}; however, {B}.",
    in_contrast_on_the_other_hand: "{A}; on the other hand, {B}.",
    on_the_contrary: "{A}; on the contrary, {B}.",
    even_so: "{A}; even so, {B}.",
    therefore_thus: "{A}; therefore, {B}.",
    as_a_result_transition: "{A}; as a result, {B}.",
    accordingly_transition: "{A}; accordingly, {B}.",
    in_addition_moreover: "{A}; moreover, {B}.",
    besides_what_is_more: "{A}; besides, {B}.",
    likewise_similarly: "{A}; likewise, {B}.",
    for_example_for_instance: "{A}; for example, {B}.",
    in_other_words_that_is: "{A}; in other words, {B}.",
    otherwise: "{A}; otherwise, {B}.",

    // 🎯 Neden → Fiil → Etki
    lead_to_cause: "{A} leads to {B}.",
    is_responsible_for: "{A} is responsible for {B}.",
    produce_produces: "{A} produces {B}.",
    induce_provoke_prompt: "{A} induces {B}.",
    result_in: "{A} results in {B}.",
    trigger_triggers: "{A} triggers {B}.",
    give_rise_to: "{A} gives rise to {B}.",
    contribute_to: "{A} contributes to {B}.",
    pave_the_way_for: "{A} paves the way for {B}.",
    culminate_in: "{A} culminates in {B}.",

    // 🎯 Etki → Fiil → Neden (Ters yön)
    is_due_to: "{B} is due to {A}.",
    result_from: "{B} results from {A}.",
    stem_from: "{B} stems from {A}.",
    originate_from: "{B} originates from {A}.",
    arise_from: "{B} arises from {A}.",
    is_attributed_to: "{B} is attributed to {A}.",
    is_ascribed_to: "{B} is ascribed to {A}.",
    is_caused_by: "{B} is caused by {A}.",

    // 🎯 Edat Öbekleri
    because_of_due_to_owing_to: "Due to {A}, {B}.",
    on_account_of_in_view_of: "On account of {A}, {B}.",
    by_virtue_of: "By virtue of {A}, {B}.",
    as_a_result_of: "As a result of {A}, {B}.",

    // 🎯 Neden-Etki Bağlaç Kalıpları
    therefore_thus_hence: "{A}; therefore, {B}.",
    consequently: "{A}; consequently, {B}.",
    as_a_result_that: "{A}; as a result, {B}.",
    accordingly: "{A}; accordingly, {B}.",
    in_that: "{B}, in that {A}.",
    inasmuch_as_seeing_that: "Inasmuch as {A}, {B}.",
    owing_to_the_fact_that: "Owing to the fact that {A}, {B}.",
    thereby_v_ing: "{A}, thereby {B}.",
    so_that_such_that: "{A}, so that {B}.",
    so_much_so_that: "{A}, so much so that {B}.",

    // ⚡ Devrik Yapılar & Kısaltmalar
    having_v3: "Having {A}, {B}.",
    prior_to: "Prior to {A}, {B}.",
    upon_on: "Upon {A}, {B}.",
    at_the_dawn: "At the dawn of {A}, {B}.",
    no_sooner_than: "No sooner {A_INV} than {B}.",
    hardly_when: "Hardly {A_INV} when {B}.",
    during_throughout: "During {A}, {B}.",

    // ⏱️ Ek Zaman Bağlaçları
    whenever: "Whenever {A}, {B}.",
    the_moment: "The moment {A}, {B}.",

    // ⚡ Ek Koşul Bağlaçları
    unless: "Unless {A}, {B}.",
    provided_that: "Provided that {A}, {B}.",
    as_long_as: "As long as {A}, {B}.",
    in_case: "In case {A}, {B}.",
    supposing_that: "Supposing {A}, {B}.",
    only_if: "Only if {A}, {B}.",

    // 🎯 Amaç Bağlaçları
    so_that_purpose: "{A} so that {B}.",
    in_order_that: "{A} in order that {B}.",

    // 📢 Dolaylı Anlatım & İsim Cümlecikleri
    reported_speech: "'{A}' → He said that {B}.",
    noun_clause: "I knew that {B}.",

    // 💭 Dilek & Varsayım Kalıpları
    wish_if_only: "I wish {B}.",
    as_if_as_though: "{A} as if {B}.",
    its_time: "It's high time {B}.",
    would_rather: "I'd rather {B}.",

    // ⏱️ Zaman Zarfları & Tense Zorunlulukları
    over_past_years: "Over the past five years, {B}.",
    lately_recently: "Lately, {B}.",
    yesterday_ago_last: "Yesterday, {B}.",
    how_long_ago: "How long ago did it happen? ({B})",
    by_future_for: "{A}, {B}.",
    always_continuous: "Always / Forever: {B}.",
    modal_past_adverb: "Yesterday, {B}.",

    // ═══ 1. FANBOYS ═══
    and_coord: "{A}, and {B}.",
    but_yet_coord: "{A}, but {B}.",
    or_coord: "{A}, or {B}.",
    nor_coord: "{A}, nor {B}.",
    for_coord: "{A}, for {B}.",
    so_coord: "{A}, so {B}.",

    // ═══ 2. EK SUBORDINATING ═══
    while_whereas: "{A}, whereas {B}.",
    on_condition_that: "{A} on condition that {B}.",

    // ═══ 3. PREPOSITIONAL PHRASES ═══
    despite_in_spite_of: "Despite {A}, {B}.",
    in_order_to: "In order to {A}, {B}.",
    in_addition_to_prep: "In addition to {A}, {B}.",
    regarding_as_for: "Regarding {A}, {B}.",
    in_terms_of_in_light_of: "In terms of {A}, {B}.",
    compared_to: "Compared to {A}, {B}.",
    except_for_apart_from: "Except for {A}, {B}.",

    // ═══ 4. EK TRANSITIONS ═══
    namely: "{A}; namely, {B}.",
    in_fact_indeed: "{A}; in fact, {B}.",
    first_firstly: "First, {A}, then {B}.",
    meanwhile: "{A}; meanwhile, {B}.",
    subsequently: "{A}; subsequently, {B}.",
    eventually: "{A}; eventually, {B}.",
    in_summary: "{A}; in summary, {B}.",
    all_in_all: "All in all, {A}, so {B}.",

    // ═══ 5. CORRELATIVE CONJUNCTIONS ═══
    both_and: "Both {A} and {B}.",
    either_or: "Either {A} or {B}.",
    neither_nor: "Neither {A} nor {B}.",
    not_only_but_also: "Not only {A}, but also {B}.",
    whether_or: "Whether {A} or {B}.",
    just_as_so: "Just as {A}, so {B}.",

    // ═══ 6. EK INVERTED ═══
    only_when_after_inv: "Only when {A}, {B}.",

    // ═══ 7. PARTICIPLE ═══
    v3_passive_participle: "Seen as {A}, {B}."
  };

  // ─── 2c. DİNAMİK TÜRKÇE CÜMLE ŞABLONLARI (TR_SENTENCE_TEMPLATES) ────────
  const TR_SENTENCE_TEMPLATES = {
    // Zaman
    when: "{A_TR} zaman, {B_TR}.",
    while_as: "{A_TR} iken, {B_TR}.",
    before: "{A_TR} öncesinde, {B_TR}.",
    after: "{A_TR} sonrasında, {B_TR}.",
    as_soon_as: "{A_TR} an, {B_TR}.",
    until_till: "{A_TR} kadarki süreçte {B_TR}.",
    by_the_time: "{A_TR} zamana kadar, {B_TR}.",
    since: "{A_TR} beri, {B_TR}.",
    by_time_anchor: "{A_TR}, {B_TR}.",
    so_far: "Şu ana kadar, {B_TR}.",
    whenever: "Ne zaman {A_TR}, {B_TR}.",
    the_moment: "{A_TR} an, {B_TR}.",

    // Koşul
    if_type0_1: "Eğer {A_TR}, {B_TR}.",
    if_type2: "Eğer {A_TR}, {B_TR}.",
    if_type3: "Eğer {A_TR}, {B_TR}.",
    unless: "{A_TR} olmadıkça, {B_TR}.",
    provided_that: "{A_TR} şartıyla, {B_TR}.",
    as_long_as: "{A_TR} sürece, {B_TR}.",
    in_case: "{A_TR} durumuna karşı, {B_TR}.",
    supposing_that: "Varsayalım ki {A_TR}, {B_TR}.",
    only_if: "Yalnızca {A_TR} ise {B_TR}.",
    on_condition_that: "{A_TR} koşuluyla, {B_TR}.",

    // Neden-Zıtlık-Geçiş
    although: "{A_TR} rağmen, {B_TR}.",
    because: "{A_TR} için, {B_TR}.",
    however_nevertheless: "{A_TR}; ancak, {B_TR}.",
    in_contrast_on_the_other_hand: "{A_TR}; öte yandan, {B_TR}.",
    on_the_contrary: "{A_TR}; aksine, {B_TR}.",
    even_so: "{A_TR}; öyle olsa bile, {B_TR}.",
    therefore_thus: "{A_TR}; bu yüzden, {B_TR}.",
    as_a_result_transition: "{A_TR}; sonuç olarak, {B_TR}.",
    accordingly_transition: "{A_TR}; buna bağlı olarak, {B_TR}.",
    in_addition_moreover: "{A_TR}; üstelik, {B_TR}.",
    besides_what_is_more: "{A_TR}; bunun yanı sıra, {B_TR}.",
    likewise_similarly: "{A_TR}; benzer şekilde, {B_TR}.",
    for_example_for_instance: "{A_TR}; örneğin, {B_TR}.",
    in_other_words_that_is: "{A_TR}; diğer bir deyişle, {B_TR}.",
    otherwise: "{A_TR}; aksi takdirde, {B_TR}.",
    while_whereas: "{A_TR} oysa {B_TR}.",

    // Neden-Etki Fiilleri
    lead_to_cause: "{A_TR}, {B_TR} durumuna yol açar.",
    is_responsible_for: "{A_TR}, {B_TR} durumundan sorumludur.",
    produce_produces: "{A_TR}, {B_TR} meydana getirir.",
    induce_provoke_prompt: "{A_TR}, {B_TR} tetikler.",
    result_in: "{A_TR}, {B_TR} ile sonuçlanır.",
    trigger_triggers: "{A_TR}, {B_TR} tetikler.",
    give_rise_to: "{A_TR}, {B_TR} ortaya çıkarır.",
    contribute_to: "{A_TR}, {B_TR} katkıda bulunur.",
    pave_the_way_for: "{A_TR}, {B_TR} zemin hazırlar.",
    culminate_in: "{A_TR}, {B_TR} zirveye ulaşır.",

    // Neden-Etki Ters Fiiller
    is_due_to: "{B_TR}, {A_TR} durumundan kaynaklanır.",
    result_from: "{B_TR}, {A_TR} durumundan doğar.",
    stem_from: "{B_TR}, {A_TR} köken alır.",
    originate_from: "{B_TR}, {A_TR} kaynaklanır.",
    arise_from: "{B_TR}, {A_TR} doğar.",
    is_attributed_to: "{B_TR}, {A_TR} atfedilir.",
    is_ascribed_to: "{B_TR}, {A_TR} bağlanır.",
    is_caused_by: "{B_TR}, {A_TR} tarafından oluşturulur.",

    // Edat Öbekleri
    because_of_due_to_owing_to: "{A_TR} nedeniyle, {B_TR}.",
    on_account_of_in_view_of: "{A_TR} göz önüne alındığında, {B_TR}.",
    by_virtue_of: "{A_TR} sayesinde, {B_TR}.",
    as_a_result_of: "{A_TR} sonucu olarak, {B_TR}.",
    despite_in_spite_of: "{A_TR} karşın, {B_TR}.",
    in_order_to: "{A_TR} için, {B_TR}.",
    in_addition_to_prep: "{A_TR} ek olarak, {B_TR}.",
    regarding_as_for: "{A_TR} hususunda, {B_TR}.",
    in_terms_of_in_light_of: "{A_TR} açısından, {B_TR}.",
    compared_to: "{A_TR} kıyasla, {B_TR}.",
    except_for_apart_from: "{A_TR} haricinde, {B_TR}.",

    // Neden-Etki Bağlaç Kalıpları
    therefore_thus_hence: "{A_TR}; bu yüzden, {B_TR}.",
    consequently: "{A_TR}; bunun neticesinde, {B_TR}.",
    as_a_result_that: "{A_TR}; sonuç olarak, {B_TR}.",
    accordingly: "{A_TR}; bu doğrultuda, {B_TR}.",
    in_that: "{B_TR}, çünkü {A_TR}.",
    inasmuch_as_seeing_that: "{A_TR} mademki, {B_TR}.",
    owing_to_the_fact_that: "{A_TR} gerçeğinden dolayı, {B_TR}.",
    thereby_v_ing: "{A_TR}, böylelikle {B_TR}.",
    so_that_such_that: "{A_TR}, öyle ki {B_TR}.",
    so_much_so_that: "{A_TR}, öyle bir dereceye kadar ki {B_TR}.",

    // Devrik & Kısaltmalar
    having_v3: "{A_TR} sonrasında, {B_TR}.",
    prior_to: "{A_TR} öncesinde, {B_TR}.",
    upon_on: "{A_TR} üzerine, {B_TR}.",
    at_the_dawn: "{A_TR} şafağında, {B_TR}.",
    no_sooner_than: "{A_TR} ki {B_TR}.",
    hardly_when: "Henüz {A_TR} ki {B_TR}.",
    during_throughout: "{A_TR} boyunca, {B_TR}.",

    // Amaç, Dolaylı, Dilek
    so_that_purpose: "{B_TR} diye {A_TR}.",
    in_order_that: "{B_TR} için {A_TR}.",
    reported_speech: "{A_TR} dedi ki {B_TR}.",
    noun_clause: "Biliyordum ki {B_TR}.",
    wish_if_only: "Keşke {B_TR}.",
    as_if_as_though: "{A_TR} sanki {B_TR}.",
    its_time: "Artık {B_TR} zamanı geldi.",
    would_rather: "Tercih ederdim ki {B_TR}.",
    over_past_years: "Son birkaç yılda, {B_TR}.",
    lately_recently: "Son zamanlarda, {B_TR}.",
    yesterday_ago_last: "Dün, {B_TR}.",
    how_long_ago: "Ne kadar süre önce...? ({B_TR})",
    by_future_for: "{A_TR} itibarıyla, {B_TR}.",
    always_continuous: "Şikayet / Sürekli Eylem: {B_TR}.",
    modal_past_adverb: "Dün, {B_TR}.",
    and_coord: "{A_TR} ve {B_TR}.",
    but_yet_coord: "{A_TR} fakat {B_TR}.",
    or_coord: "{A_TR} veya {B_TR}.",
    nor_coord: "{A_TR} ne de {B_TR}.",
    for_coord: "{A_TR} çünkü {B_TR}.",
    so_coord: "{A_TR} bu yüzden {B_TR}.",
    namely: "{A_TR}; yani {B_TR}.",
    in_fact_indeed: "{A_TR}; aslında {B_TR}.",
    first_firstly: "İlk olarak {A_TR}, sonra {B_TR}.",
    meanwhile: "{A_TR}; bu sırada {B_TR}.",
    subsequently: "{A_TR}; sonrasında {B_TR}.",
    eventually: "{A_TR}; sonunda {B_TR}.",
    in_summary: "{A_TR}; özetle {B_TR}.",
    all_in_all: "Genel olarak {A_TR}, dolayısıyla {B_TR}.",
    both_and: "Hem {A_TR} hem de {B_TR}.",
    either_or: "Ya {A_TR} ya da {B_TR}.",
    neither_nor: "Ne {A_TR} ne de {B_TR}.",
    not_only_but_also: "Sadece {A_TR} değil, aynı zamanda {B_TR}.",
    whether_or: "İster {A_TR} ister {B_TR}.",
    just_as_so: "Nasıl ki {A_TR}, öyle de {B_TR}.",
    only_when_after_inv: "Ancak {A_TR} sonra {B_TR}.",
    v3_passive_participle: "{A_TR} olarak görüldüğünde, {B_TR}."
  };

  // Devrik yapı yardımcısı: "she had studied hard" → "had she studied hard"
  function invertHadV3(sample) {
    const parts = sample.split(" ");
    const hadIdx = parts.indexOf("had");
    if (hadIdx > 0) {
      const subject = parts.slice(0, hadIdx).join(" ");
      const rest = parts.slice(hadIdx + 1).join(" ");
      return "had " + subject + " " + rest;
    }
    return sample;
  }

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
    },
    {
      id: 6,
      title: "'OVER THE PAST 5 YEARS' zaman zarfı tuzağını çöz!",
      desc: "İçinde 'Past' geçse bile eylemin bugüne uzandığını hatırla ve Present Perfect'i seç.",
      rewardXP: 30,
      target: { connector: "over_past_years", clauseA: "noun_phrase", clauseB: "has_v3_main" },
      hint: "Over the past years ➔ HAS/HAVE + V3 (Present Perfect) zorunludur!"
    },
    {
      id: 7,
      title: "'YESTERDAY' zarfının kesin geçmiş zaman kuralını uygula!",
      desc: "Tamamlanmış geçmiş zaman zarfı ile Simple Past V2 yapısını hatasız bağla.",
      rewardXP: 25,
      target: { connector: "yesterday_ago_last", clauseA: "noun_phrase", clauseB: "v2_main" },
      hint: "Yesterday / ... ago / Last ... ➔ Simple Past V2 zorunludur!"
    }
  ];

  // ─── 4. UYGULAMA DURUMU (STATE) ─────────────────────────────────────────

  let state = {
    mode: "sandbox", // 'sandbox' veya 'challenge'
    selectedCategory: "time", // Varsayılan olarak 'Zaman & Tense' kategorisinden başlasın
    selectedConnector: null,
    selectedClauseA: null,
    selectedClauseB: null,
    isConnectorsCollapsed: false,
    currentChallengeIndex: 0,
    completedChallenges: []
  };

  // ─── 5. DOM ELEMENTLERİ VE BAŞLATICI ────────────────────────────────────

  function updateCategoryButtons() {
    document.querySelectorAll(".srobot-cat-btn").forEach(btn => {
      if (btn.dataset.cat === state.selectedCategory) {
        btn.classList.add("active");
        btn.style.background = "var(--accent-primary)";
        btn.style.color = "#fff";
        btn.style.borderColor = "var(--accent-primary)";
      } else {
        btn.classList.remove("active");
        btn.style.background = "var(--bg-body)";
        btn.style.color = "var(--text-secondary)";
        btn.style.borderColor = "var(--border-color)";
      }
    });
  }

  function initStructureRobot() {
    updateCategoryButtons();
    renderPalette();
    bindEvents();
    updateUI();
  }

  function renderPalette() {
    const connectorsContainer = document.getElementById("srobot-pieces-connectors");
    const clauseAContainer = document.getElementById("srobot-pieces-clause-a");
    const clauseBContainer = document.getElementById("srobot-pieces-clause-b");
    const toggleBtn = document.getElementById("srobot-toggle-connectors-btn");

    if (!connectorsContainer || !clauseAContainer || !clauseBContainer) return;

    // Filter Connectors by selected category
    const filteredConnectors = CONNECTORS.filter(c => {
      if (state.selectedCategory === "all") return true;
      return c.category === state.selectedCategory;
    });

    // Connectors Palette (Collapsed vs Expanded Mode)
    if (state.isConnectorsCollapsed && state.selectedConnector) {
      const selectedObj = CONNECTORS.find(c => c.id === state.selectedConnector);
      connectorsContainer.innerHTML = selectedObj ? `
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; background: rgba(6, 182, 212, 0.12); border: 1.5px solid #06b6d4; padding: 8px 16px; border-radius: var(--radius-md); box-shadow: 0 0 12px rgba(6, 182, 212, 0.25);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-weight: 800; color: #06b6d4; font-size: 0.92rem; font-family: var(--font-heading);">🔷 Seçili Bağlaç: ${selectedObj.label}</span>
            <span style="font-size: 0.75rem; color: var(--text-secondary);">(${CONNECTORS.length} parçadan 1'i aktif)</span>
          </div>
          <button class="srobot-piece-btn" data-type="connector" data-id="${selectedObj.id}" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.1); color: #ef4444; cursor: pointer; font-weight: 700;">
            ✖ Seçimi Kaldır
          </button>
        </div>
      ` : "";
      if (toggleBtn) {
        toggleBtn.style.display = "inline-flex";
        toggleBtn.textContent = `✏️ Değiştir / Listeyi Aç (${CONNECTORS.length})`;
      }
    } else {
      connectorsContainer.innerHTML = filteredConnectors.map(c => `
        <button class="srobot-piece-btn" data-type="connector" data-id="${c.id}" style="padding: 8px 14px; border-radius: var(--radius-md); border: 1px solid rgba(6, 182, 212, 0.3); background: rgba(6, 182, 212, 0.08); color: var(--text-primary); font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px;">
          <span>🔷</span> ${c.label}
        </button>
      `).join("");
      if (toggleBtn) {
        if (state.selectedConnector) {
          toggleBtn.style.display = "inline-flex";
          toggleBtn.textContent = "▲ Daralt (Mini Mod)";
        } else {
          toggleBtn.style.display = "none";
        }
      }
    }

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
    // Toggle Collapse Button
    const toggleBtn = document.getElementById("srobot-toggle-connectors-btn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        state.isConnectorsCollapsed = !state.isConnectorsCollapsed;
        renderPalette();
        updateUI();
      });
    }

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
        state.isConnectorsCollapsed = false; // Always expand on category click
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
      if (state.selectedConnector === id) {
        state.selectedConnector = null;
        state.isConnectorsCollapsed = false;
      } else {
        state.selectedConnector = id;
        state.isConnectorsCollapsed = true; // Auto collapse on selection!
      }
      renderPalette();
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
    state.isConnectorsCollapsed = false;
    renderPalette();
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

    const singleTimeAdverbs = [
      "lately_recently", "so_far", "yesterday_ago_last", "over_past_years",
      "how_long_ago", "by_time_anchor", "modal_past_adverb", "by_future_for",
      "always_continuous", "its_time", "would_rather", "wish_if_only"
    ];

    const sec2Header = document.getElementById("srobot-section2-header");

    if (connObj && singleTimeAdverbs.includes(connObj.id)) {
      // ⏱️ Tekli Zaman Zarfı Şablonu: Zarf ➔ Özne/İsim ➔ Zorunlu Tense (Yan cümle yok)
      if (slotTitle1) slotTitle1.textContent = "ZAMAN ZARFI / ÇAPASI";
      if (slotTitle2) slotTitle2.textContent = "ÖZNE / İSİM (YAN CÜMLE YOK)";
      if (slotTitle3) slotTitle3.textContent = "ZORUNLU TENSE / YÜKLEM";
      if (sec2Header) sec2Header.textContent = "2. Matris Parçaları (Özne / İsim Öbeği - Yan Cümle Yok)";
    } else if (connObj && connObj.category === "cause_effect") {
      // 🎯 Neden-Etki Fiil Şablonu: Neden Öbeği ➔ Neden-Etki Fiili ➔ Sonuç Öbeği
      if (slotTitle1) slotTitle1.textContent = "NEDEN (CAUSE) ÖBEĞİ";
      if (slotTitle2) slotTitle2.textContent = "NEDEN-ETKİ FİİLİ / EDATI";
      if (slotTitle3) slotTitle3.textContent = "SONUÇ (EFFECT) ÖBEĞİ";
      if (sec2Header) sec2Header.textContent = "2. Matris Parçaları (Neden-Etki Fiilleri / Edatları)";
    } else if (connObj && connObj.category === "transitions") {
      // 🔀 Geçiş İfadesi Şablonu: Cümle A ➔ Geçiş İfadesi ➔ Cümle B
      if (slotTitle1) slotTitle1.textContent = "BİRİNCİ YARGI (CÜMLE A)";
      if (slotTitle2) slotTitle2.textContent = "GEÇİŞ İFADESİ";
      if (slotTitle3) slotTitle3.textContent = "İKİNCİ YARGI (CÜMLE B)";
      if (sec2Header) sec2Header.textContent = "2. Matris Parçaları (Geçiş İfadeleri)";
    } else {
      // ⏱️ Standart Bağlaç Şablonu: Bağlaç ➔ Yan Cümle ➔ Ana Cümle
      if (slotTitle1) slotTitle1.textContent = "BAĞLAÇ / KOŞUL";
      if (slotTitle2) slotTitle2.textContent = "YAN CÜMLE ZAMANI (CLAUSE A)";
      if (slotTitle3) slotTitle3.textContent = "ANA CÜMLE / MODAL (CLAUSE B)";
      if (sec2Header) sec2Header.textContent = "2. Matris Parçaları (Yan Cümle Zamanları)";
    }

    // 1. Update Slot Content Targets & Progress Badge
    const slotTarget1 = document.getElementById("srobot-slot-target-1");
    const slotTarget2 = document.getElementById("srobot-slot-target-2");
    const slotTarget3 = document.getElementById("srobot-slot-target-3");
    const progressBadge = document.getElementById("srobot-slots-progress-badge");

    let count = 0;
    if (connObj) count++;
    if (clauseAObj) count++;
    if (clauseBObj) count++;

    if (progressBadge) {
      if (count === 3) {
        progressBadge.textContent = "⚡ 3/3 Montaj Tamamlandı!";
        progressBadge.style.background = "rgba(16, 185, 129, 0.18)";
        progressBadge.style.color = "#10b981";
        progressBadge.style.borderColor = "rgba(16, 185, 129, 0.4)";
      } else {
        progressBadge.textContent = `${count}/3 Parça Takıldı`;
        progressBadge.style.background = "rgba(6, 182, 212, 0.12)";
        progressBadge.style.color = "#06b6d4";
        progressBadge.style.borderColor = "rgba(6, 182, 212, 0.25)";
      }
    }

    if (slotTarget1) {
      slotTarget1.innerHTML = connObj
        ? `<span style="color: #06b6d4; font-weight: 800;">🔷 ${connObj.label}</span>`
        : `<span style="color: var(--text-secondary); font-size: 0.8rem; font-weight: 500;">Parça Seçilmedi</span>`;
      slotTarget1.style.borderColor = connObj ? "#06b6d4" : "rgba(6, 182, 212, 0.25)";
      slotTarget1.style.background = connObj ? "rgba(6, 182, 212, 0.14)" : "rgba(6, 182, 212, 0.06)";
    }

    if (slotTarget2) {
      slotTarget2.innerHTML = clauseAObj
        ? `<span style="color: #8b5cf6; font-weight: 800;">🟣 ${clauseAObj.label}</span>`
        : `<span style="color: var(--text-secondary); font-size: 0.8rem; font-weight: 500;">Parça Seçilmedi</span>`;
      slotTarget2.style.borderColor = clauseAObj ? "#8b5cf6" : "rgba(139, 92, 246, 0.25)";
      slotTarget2.style.background = clauseAObj ? "rgba(139, 92, 246, 0.14)" : "rgba(139, 92, 246, 0.06)";
    }

    if (slotTarget3) {
      slotTarget3.innerHTML = clauseBObj
        ? `<span style="color: #ec4899; font-weight: 800;">🔴 ${clauseBObj.label}</span>`
        : `<span style="color: var(--text-secondary); font-size: 0.8rem; font-weight: 500;">Parça Seçilmedi</span>`;
      slotTarget3.style.borderColor = clauseBObj ? "#ec4899" : "rgba(236, 72, 153, 0.25)";
      slotTarget3.style.background = clauseBObj ? "rgba(236, 72, 153, 0.14)" : "rgba(236, 72, 153, 0.06)";
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
          } else {
            allowedClauseB = [];
          }
        } else {
          // If Clause A is not selected yet, enable Matrix 3 options valid for ANY pair of this connector
          allowedClauseB = [...new Set(validPairs.flatMap(p => p.clauseB))];
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
      if (allowedClauseA !== null && !allowedClauseA.includes(id)) {
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
      if (allowedClauseB !== null && !allowedClauseB.includes(id)) {
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

    // Build Live English & Turkish Sentences using Dynamic Templates
    if (connObj && clauseAObj && clauseBObj) {
      const templateEN = SENTENCE_TEMPLATES[state.selectedConnector];
      if (templateEN) {
        let sA = clauseAObj.sample;
        let sB = clauseBObj.sample;
        let resultEN = templateEN
          .replace("{A_INV}", invertHadV3(sA))
          .replace("{A}", sA)
          .replace("{B}", sB);
        resultEN = resultEN.charAt(0).toUpperCase() + resultEN.slice(1);
        sentenceENText = '"' + resultEN + '"';
      } else {
        let connWord = connObj.label.split(" / ")[0];
        connWord = connWord.charAt(0) + connWord.slice(1).toLowerCase();
        sentenceENText = '"' + connWord + " " + clauseAObj.sample + ", " + clauseBObj.sample + '."';
      }

      // Dynamic Turkish Translation
      let activeMatchingPair = null;
      if (connObj && state.selectedClauseA) {
        const ruleObj = RULE_RULES[state.selectedConnector];
        if (ruleObj && ruleObj.validPairs) {
          activeMatchingPair = ruleObj.validPairs.find(p => p.clauseA === state.selectedClauseA);
        }
      }

      if (activeMatchingPair && activeMatchingPair.trPattern && isValidCombination) {
        let cleanTR = activeMatchingPair.trPattern.split(" (")[0];
        sentenceTRText = cleanTR.charAt(0).toUpperCase() + cleanTR.slice(1);
      } else {
        const templateTR = TR_SENTENCE_TEMPLATES[state.selectedConnector];
        const trA = clauseAObj.sampleTR || clauseAObj.label;
        const trB = clauseBObj.sampleTR || clauseBObj.label;

        if (templateTR) {
          let resultTR = templateTR
            .replace("{A_TR}", trA)
            .replace("{B_TR}", trB);
          resultTR = resultTR.charAt(0).toUpperCase() + resultTR.slice(1);
          sentenceTRText = resultTR;
        }
      }
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
