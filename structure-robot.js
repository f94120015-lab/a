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
    { id: "v1_present", label: "V1 / Present Simple", sample: "she studies hard", sampleTR: "sıkı çalışır", tenseGroup: "present", color: "#8b5cf6" },
    { id: "v2_past", label: "V2 / Past Simple", sample: "she studied hard", sampleTR: "sıkı çalıştı", tenseGroup: "past", color: "#8b5cf6" },
    { id: "was_were_ving", label: "Was/Were + V-ing", sample: "she was studying late", sampleTR: "geç saatlere kadar çalışıyordu", tenseGroup: "past_cont", color: "#8b5cf6" },
    { id: "had_v3", label: "Had + V3 (Past Perfect)", sample: "she had studied hard", sampleTR: "sıkı çalışmıştı", tenseGroup: "past_perfect", color: "#8b5cf6" },
    { id: "has_v3", label: "Has/Have + V3 / Present Perfect", sample: "she has lived here", sampleTR: "burada yaşadı", tenseGroup: "present_perfect", color: "#8b5cf6" },
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
      ruleText: "BY THE TIME (Zaman Çapası): By the time + V1 ➔ WILL HAVE V3 | By the time + V2 ➔ HAD V3",
      tenseExamples: [
        { tense: "Future Perfect", en: "By the time you return home, I will have completed all chores.", tr: "Eve döneceğin zamana kadar tüm ev işlerini bitirmiş olacağım." },
        { tense: "Past Perfect", en: "By the time the firefighters arrived, the fire had destroyed the warehouse.", tr: "İtfaiyeciler varana kadar yangın depoyu mahvetmişti." },
        { tense: "Future Simple", en: "By the time the new regulations take effect, companies will have adapted.", tr: "Yeni düzenlemeler yürürlüğe girene kadar şirketler uyum sağlamış olacaktır." },
        { tense: "Simple Past", en: "By the time the sun set, they reached the campsite safely.", tr: "Güneş batana kadar kamp alanına güvenle vardılar." },
        { tense: "Modal / Passive", en: "By the time the summit begins, delegates should have settled their issues.", tr: "Zirve başlayana kadar delegeler sorunlarını halletmiş olmalıdır." }
      ]
    },
    by_time_anchor: {
      validPairs: [
        { clauseA: "future_date", clauseB: ["will_have_v3"], trPattern: "2050 yılına kadar insanlık Mars'ta koloni kurmuş olacak." },
        { clauseA: "past_date", clauseB: ["had_v3_main"], trPattern: "1900 yılına kadar fabrika üretime başlamıştı." }
      ],
      ruleText: "BY + TARİH ÇAPASI: By + Gelecek Tarih ➔ WILL HAVE V3 | By + Geçmiş Tarih ➔ HAD V3",
      tenseExamples: [
        { tense: "Future Perfect", en: "By 2030, solar energy will have replaced fossil fuels in many regions.", tr: "2030 yılına kadar güneş enerjisi birçok bölgede fosil yakıtların yerini almış olacaktır." },
        { tense: "Past Perfect", en: "By 1900, electricity had already transformed factory production.", tr: "1900 yılına kadar elektrik fabrika üretimini çoktan dönüştürmüştü." },
        { tense: "Future Simple", en: "By next month, the project team will announce preliminary results.", tr: "Gelecek aya kadar proje ekibi ön sonuçları açıklayacaktır." },
        { tense: "Simple Past", en: "By midnight, all storm warnings were officially lifted.", tr: "Gece yarısına kadar tüm fırtına uyarıları resmi olarak kaldırıldı." },
        { tense: "Modal / Passive", en: "By 2040, coastal defenses must have been strengthened nationwide.", tr: "2040 yılına kadar kıyı savunmaları ülke çapında güçlendirilmiş olmalıdır." }
      ]
    },
    so_far: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["has_v3_main"], trPattern: "Son yıllarda / Şu ana kadar birçok gelişme kaydedildi." },
        { clauseA: "v1_present", clauseB: ["has_v3_main"], trPattern: "Şu ana kadar tüm testleri geçtik." }
      ],
      ruleText: "SO FAR / UP TO NOW / HITHERTO / IN RECENT YEARS: Doğrudan Present Perfect (HAS/HAVE V3) gerektirir. Past V2 almaz!",
      tenseExamples: [
        { tense: "Present Perfect", en: "So far, researchers have discovered over fifty new marine species.", tr: "Şu ana kadar araştırmacılar elliden fazla yeni deniz türü keşfetti." },
        { tense: "Past Perfect", en: "Up to last year, the company had operated strictly within local markets.", tr: "Geçen yıla kadar şirket sadece yerel piyasalarda faaliyet göstermişti." },
        { tense: "Present Perfect Cont.", en: "Recently, scientists have been experimenting with new cancer treatments.", tr: "Son zamanlarda bilim insanları yeni kanser tedavileri üzerinde deneyler yapıyorlar." },
        { tense: "Future Perfect", en: "We will have finished half the syllabus so far by Friday.", tr: "Cuma gününe kadar müfredatın yarısını bitirmiş olacağız." },
        { tense: "Modal / Passive", en: "Up to now, no severe side effects have been reported among participants.", tr: "Şu ana kadar katılımcılar arasında hiçbir ciddi yan etki bildirilmemiştir." }
      ]
    },
    having_v3: {
      validPairs: [
        { clauseA: "v_ing_obj", clauseB: ["v2_main"], trPattern: "Raporu tamamladıktan sonra sunumu yaptı." }
      ],
      ruleText: "HAVING + V3 (Zaman Kısaltması): 'After + Had V3' yapısının aktif/pasif kısaltmasıdır. Ana cümle V2 (Past Simple) gerektirir!",
      tenseExamples: [
        { tense: "Simple Past", en: "Having completed the exam, she felt a great sense of relief.", tr: "Sınavı tamamladıktan sonra büyük bir rahatlama hissetti." },
        { tense: "Present Perfect", en: "Having lived in Japan for years, he has acquired fluent language skills.", tr: "Yıllarca Japonya'da yaşamış olduğu için akıcı dil becerileri edindi." },
        { tense: "Past Perfect", en: "Having been warned twice, the driver had slowed down before the turn.", tr: "İki kez uyarılmış olduğu için sürücü virajdan önce yavaşlamıştı." },
        { tense: "Future Context", en: "Having secured funding, the startup will expand into international markets.", tr: "Fonu sağladıktan sonra girişim uluslararası pazarlara açılacaktır." },
        { tense: "Modal / Passive", en: "Having been trained by experts, the team should handle the crisis easily.", tr: "Uzmanlarca eğitilmiş olduğu için ekibin krizle kolayca başa çıkması gerekir." }
      ]
    },
    prior_to: {
      validPairs: [
        { clauseA: "v_ing_obj", clauseB: ["v2_main", "had_v3_main", "will_v1"], trPattern: "Savaştan / projeden önce hazırlıklar yapıldı." },
        { clauseA: "noun_phrase", clauseB: ["v2_main", "had_v3_main", "will_v1"], trPattern: "Sınav döneminden önce ders çalıştı." }
      ],
      ruleText: "PRIOR TO / SUBSEQUENT TO: Akademik edat öbeğidir. Cümle almaz; V-ing veya İsim Öbeği alarak ana cümleye bağlanır.",
      tenseExamples: [
        { tense: "Simple Present", en: "Please check all equipment prior to starting the experiment.", tr: "Deneye başlamadan önce lütfen tüm ekipmanları kontrol edin." },
        { tense: "Simple Past", en: "Prior to the industrial revolution, most people worked in agriculture.", tr: "Sanayi devriminden önce çoğu insan tarımda çalışıyordu." },
        { tense: "Present Perfect", en: "Prior to this launch, the team has tested the system extensively.", tr: "Bu lansmandan önce ekip sistemi kapsamlı bir şekilde test etti." },
        { tense: "Future Simple", en: "We will finalize the contract prior to the fiscal year end.", tr: "Mali yıl sona ermeden önce sözleşmeyi netleştireceğiz." },
        { tense: "Modal / Passive", en: "Calculations ought to be verified prior to submitting the report.", tr: "Raporu teslim etmeden önce hesaplamalar doğrulanmalıdır." }
      ]
    },
    upon_on: {
      validPairs: [
        { clauseA: "v_ing_obj", clauseB: ["v2_main", "will_v1"], trPattern: "Varır varmaz / varışının üzerine haber verdi." }
      ],
      ruleText: "UPON / ON (+ V-ing): 'As soon as / when' yapısının akademik zaman kısaltmasıdır.",
      tenseExamples: [
        { tense: "Simple Past", en: "Upon arriving at the airport, she checked in immediately.", tr: "Havaalanına varır varmaz derhal giriş yaptı." },
        { tense: "Simple Present", en: "Upon heating, liquid expands and turns into gas.", tr: "Isıtıldığında sıvı genleşir ve gaza dönüşür." },
        { tense: "Present Perfect", en: "Upon completing the trial, the doctor has issued a health certificate.", tr: "Denemeyi tamamlaması üzerine doktor sağlık sertifikası verdi." },
        { tense: "Future Simple", en: "Upon signing the contract, you will receive full access.", tr: "Sözleşmeyi imzalamanız üzerine tam erişim alacaksınız." },
        { tense: "Modal / Passive", en: "Upon request, additional data should be provided by the team.", tr: "Talep edilmesi halinde ekip tarafından ek veri sağlanmalıdır." }
      ]
    },
    at_the_dawn: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "had_v3_main"], trPattern: "Sanayi devriminin şafağında fabrikalar kuruldu." }
      ],
      ruleText: "AT THE DAWN OF / ON THE EVE OF: Dönem / Tarih ismi alarak zaman çapası kurar.",
      tenseExamples: [
        { tense: "Simple Past", en: "At the dawn of the industrial era, steam engines transformed transport.", tr: "Sanayi çağının şafağında buharlı makineler ulaşımı dönüştürdü." },
        { tense: "Past Perfect", en: "On the eve of the election, the candidates had completed their campaigns.", tr: "Seçim arifesinde adaylar kampanyalarını çoktan tamamlamıştı." },
        { tense: "Simple Present", en: "We now stand at the dawn of artificial intelligence in medicine.", tr: "Şu an tıpta yapay zekanın şafağında duruyoruz." },
        { tense: "Future Simple", en: "On the eve of the new century, humanity will celebrate new milestones.", tr: "Yeni yüzyılın arifesinde insanlık yeni dönüm noktalarını kutlayacaktır." },
        { tense: "Modal / Passive", en: "At the dawn of new space travel, security must be guaranteed.", tr: "Yeni uzay seyahatlerinin şafağında güvenlik garanti edilmelidir." }
      ]
    },
    when: {
      validPairs: [
        { 
          clauseA: "v1_present", 
          clauseB: ["will_v1", "v1_main", "can_may_v1"], 
          trPatternMap: {
            will_v1: "O çok çalıştığında sınavı geçecek.",
            v1_main: "O çok çalıştığında sınavı geçer.",
            can_may_v1: "O çok çalıştığında sınavı geçebilir."
          },
          trPattern: "O çok çalıştığında sınavı geçecek." 
        },
        { 
          clauseA: "v2_past", 
          clauseB: ["v2_main", "was_were_ving_main"], 
          trPatternMap: {
            v2_main: "O çalıştığında sınavı geçti.",
            was_were_ving_main: "O çalıştığında herkes ders çalışıyordu."
          },
          trPattern: "O çalıştığında sınavı geçti." 
        }
      ],
      ruleText: "WHEN zaman uyumu gerektirir! Yan cümle Present (V1) ise ana cümle Will/V1/Modal; yan cümle Past (V2) ise ana cümle Past (V2/Was-Were Ving) olur.",
      tenseExamples: [
        { tense: "Simple Present", en: "When temperature drops below zero, water freezes into ice.", tr: "Sıcaklık sıfırın altına düştüğünde su buza dönüşür." },
        { tense: "Simple Past", en: "When the alarm rang, everyone evacuated the building yesterday.", tr: "Dün alarm çaldığında herkes binayı tahliye etti." },
        { tense: "Present Perfect", en: "When you have finished registration, you can access the platform.", tr: "Kayıt işlemini tamamladığında platforma erişebilirsin." },
        { tense: "Future Simple", en: "When the bridge opens next month, traffic will decrease.", tr: "Gelecek ay köprü açıldığında trafik azalacaktır." },
        { tense: "Modal / Passive", en: "When you feel any symptoms, you should consult a doctor.", tr: "Herhangi bir belirti hissettiğinde bir doktora danışmalısın." }
      ]
    },
    while_as: {
      validPairs: [
        { 
          clauseA: "was_were_ving", 
          clauseB: ["v2_main", "was_were_ving_main"], 
          trPatternMap: {
            v2_main: "Ders çalışıyorken kapı çaldı.",
            was_were_ving_main: "Ders çalışıyorken kardeşi müzik dinliyordu."
          },
          trPattern: "Ders çalışıyorken kapı çaldı." 
        },
        { 
          clauseA: "is_ving", 
          clauseB: ["v1_main", "will_v1"], 
          trPatternMap: {
            v1_main: "Yağmur yağıyorken içeride otururuz.",
            will_v1: "Yağmur yağıyorken içeride oturacağız."
          },
          trPattern: "Yağmur yağıyorken içeride otururuz." 
        }
      ],
      ruleText: "WHILE / AS (Eşzamanlılık): Yan cümle genellikle Continuous Tense (was/were V-ing) alır. Ana cümle V2 veya Continuous olur.",
      tenseExamples: [
        { tense: "Simple Present", en: "While some people prefer city life, others enjoy rural peace.", tr: "Bazı insanlar şehir yaşamını tercih ederken, diğerleri kırsal huzurdan keyif alır." },
        { tense: "Simple Past", en: "While she was preparing the report, her computer crashed.", tr: "O raporu hazırlıyorken bilgisayarı çöktü." },
        { tense: "Present Continuous", en: "As markets are fluctuating today, investors take precautions.", tr: "Bugün piyasalar dalgalanıyorken yatırımcılar önlem alıyor." },
        { tense: "Future Continuous", en: "While you are traveling next week, we will monitor your project.", tr: "Siz gelecek hafta seyahat ediyorken biz projenizi takip edeceğiz." },
        { tense: "Modal / Passive", en: "You must remain seated while the plane is taking off.", tr: "Uçak havalanıyorken koltuğunuzda oturur halde kalmalısınız." }
      ]
    },
    before: {
      validPairs: [
        { 
          clauseA: "v2_past", 
          clauseB: ["had_v3_main", "v2_main"], 
          trPatternMap: {
            had_v3_main: "O gelmeden önce tren çoktan kalkmıştı.",
            v2_main: "O gelmeden önce hazırlıklar tamamlandı."
          },
          trPattern: "O gelmeden önce tren çoktan kalkmıştı." 
        },
        { 
          clauseA: "v1_present", 
          clauseB: ["will_v1", "v1_main", "can_may_v1"], 
          trPatternMap: {
            will_v1: "O gelmeden önce hazırlıkları tamamlayacağız.",
            v1_main: "O gelmeden önce hazırlıkları tamamlarız.",
            can_may_v1: "O gelmeden önce hazırlıkları tamamlayabiliriz."
          },
          trPattern: "O gelmeden önce hazırlıkları tamamlayacağız." 
        }
      ],
      ruleText: "BEFORE: Öncelikli eylem ana cümle tarafındadır ve 'Had V3' alır! Before yan cümlesi V2 ise ana cümle Had V3; V1 ise Will V1 olur.",
      tenseExamples: [
        { tense: "Simple Present", en: "Please check all equipment before you start the experiment.", tr: "Deneye başlamadan önce lütfen tüm ekipmanları kontrol edin." },
        { tense: "Simple Past", en: "Prior to the industrial era, most people worked in farming.", tr: "Sanayi çağından önce çoğu insan tarımda çalışıyordu." },
        { tense: "Past Perfect", en: "She had already left the office before the manager arrived.", tr: "Müdür varmadan önce o çoktan ofisten ayrılmıştı." },
        { tense: "Future Simple", en: "We will finalize the contract before the fiscal year ends.", tr: "Mali yıl sona ermeden önce sözleşmeyi netleştireceğiz." },
        { tense: "Modal / Passive", en: "You ought to double-check calculations before submitting.", tr: "Teslim etmeden önce hesaplamaları iki kez kontrol etmelisiniz." }
      ]
    },
    after: {
      validPairs: [
        { clauseA: "had_v3", clauseB: ["v2_main"], trPattern: "Önceden çok çalıştıktan sonra sınavı geçti." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Sınav bittikten sonra eve gitti." },
        { 
          clauseA: "v1_present", 
          clauseB: ["will_v1", "v1_main"], 
          trPatternMap: {
            will_v1: "Çok çalıştıktan sonra sınavı geçecek.",
            v1_main: "Çok çalıştıktan sonra sınavı geçer."
          },
          trPattern: "Çok çalıştıktan sonra sınavı geçecek." 
        }
      ],
      ruleText: "AFTER: Yan cümle öncelikli eylemdir ve 'Had V3' alabilir! After + Had V3 ➔ Ana Cümle V2.",
      tenseExamples: [
        { tense: "Simple Present", en: "After water boils, add tea leaves and let it steep.", tr: "Su kaynadıktan sonra çay yapraklarını ekleyin ve demlenmeye bırakın." },
        { tense: "Simple Past", en: "Subsequent to the meeting, the board released a statement.", tr: "Toplantının ardından yönetim kurulu bir bildiri yayımladı." },
        { tense: "Present Perfect", en: "After he has completed military service, he will start work.", tr: "Askerlik hizmetini tamamladıktan sonra çalışmaya başlayacaktır." },
        { tense: "Future Simple", en: "Following the software launch, users will receive updates.", tr: "Yazılım lansmanının ardından kullanıcılar güncellemeler alacaktır." },
        { tense: "Modal / Passive", en: "After taking this medicine, you should refrain from driving.", tr: "Bu ilacı aldıktan sonra araba kullanmaktan kaçınmalısınız." }
      ]
    },
    as_soon_as: {
      validPairs: [
        { 
          clauseA: "v1_present", 
          clauseB: ["will_v1", "v1_main"], 
          trPatternMap: {
            will_v1: "O gelir gelmez toplantıyı başlatacağız.",
            v1_main: "O gelir gelmez toplantıyı başlatırız."
          },
          trPattern: "O gelir gelmez toplantıyı başlatacağız." 
        },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "O gelir gelmez haber verdi." }
      ],
      ruleText: "AS SOON AS / ONCE (Tezlik): Eylemler arasında zaman aralığı yoktur. Present ➔ Will V1; Past (V2) ➔ Past (V2) eşleşir.",
      tenseExamples: [
        { tense: "Simple Present", en: "As soon as sun rises, birds begin to sing.", tr: "Güneş doğar doğmaz kuşlar ötmeye başlar." },
        { tense: "Simple Past", en: "As soon as the alarm rang, everyone evacuated yesterday.", tr: "Dün alarm çalar çalmaz herkes tahliye oldu." },
        { tense: "Present Perfect", en: "Once you have finished registration, you can access the app.", tr: "Kayıt işlemini tamamlar tamamlamaz uygulamaya erişebilirsin." },
        { tense: "Future Simple", en: "As soon as he arrives tomorrow, we will start the meeting.", tr: "Yarın o gelir gelmez toplantıyı başlatacağız." },
        { tense: "Modal / Passive", en: "As soon as symptoms appear, a physician should be called.", tr: "Belirtiler görülür görülmez bir hekim çağrılmalıdır." }
      ]
    },
    until_till: {
      validPairs: [
        { 
          clauseA: "v1_present", 
          clauseB: ["will_v1", "v1_main", "can_may_v1"], 
          trPatternMap: {
            will_v1: "O gelene kadar bekleyeceğiz.",
            v1_main: "O gelene kadar bekleriz.",
            can_may_v1: "O gelene kadar bekleyebiliriz."
          },
          trPattern: "O gelene kadar bekleyeceğiz." 
        },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "O gelene kadar beklediler." }
      ],
      ruleText: "UNTIL / TILL: Eylemin son sınırını gösterir. Yan cümlesine asla 'will' gelemez. V1 ➔ Will V1; V2 ➔ V2.",
      tenseExamples: [
        { tense: "Simple Present", en: "The library remains open until 10 PM every weekday.", tr: "Kütüphane hafta içi her gün saat 22:00'ye kadar açık kalır." },
        { tense: "Simple Past", en: "They waited outside until the rain stopped completely yesterday.", tr: "Dün yağmur tamamen durana kadar dışarıda beklediler." },
        { tense: "Present Perfect", en: "We will not decide until all data has been collected.", tr: "Tüm veriler toplanana kadar hiçbir karar almayacağız." },
        { tense: "Future Simple", en: "I will stay with you until your bus arrives tomorrow.", tr: "Yarın otobüsün gelene kadar seninle kalacağım." },
        { tense: "Modal / Passive", en: "You must keep trying until you achieve your target.", tr: "Hedefine ulaşana kadar denemeye devam etmelisin." }
      ]
    },
    no_sooner_than: {
      validPairs: [
        { clauseA: "had_v3", clauseB: ["v2_main"], trPattern: "Tam içeri girmişti ki telefon çaldı." }
      ],
      ruleText: "NO SOONER ... THAN (Devrik Yapı): 'No sooner had + Özne + V3 ... than + Özne + V2' kalıbı zorunludur!",
      tenseExamples: [
        { tense: "Past Perfect (Devrik)", en: "No sooner had he entered the room than the alarm went off.", tr: "Tam odaya girmişti ki alarm çaldı." },
        { tense: "Past Perfect", en: "No sooner had the speech finished than applause erupted.", tr: "Tam konuşma bitmişti ki alkış koptu." },
        { tense: "Past Perfect", en: "No sooner had the plane landed than rain started pouring.", tr: "Tam uçak inmişti ki sağanak yağmur başladı." },
        { tense: "Future Context", en: "No sooner will the news break than investors will react.", tr: "Haber çıkar çıkmaz yatırımcılar tepki verecektir." },
        { tense: "Modal / Passive", en: "No sooner had the law been passed than opposition appealed.", tr: "Tam yasa kabul edilmişti ki muhalefet itiraz etti." }
      ]
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
      ruleText: "DURING / THROUGHOUT: Edat öbeğidir, isim öbeği alır. Yan cümle zamanı bağlama göre Simple Past, Present veya Future olabilir.",
      tenseExamples: [
        { tense: "Simple Present", en: "Many animals hibernate during the harsh winter months.", tr: "Birçok hayvan çetin kış ayları boyunca kış uykusuna yatar." },
        { tense: "Simple Past", en: "Data was collected throughout the entire study period last year.", tr: "Geçen yıl tüm çalışma dönemi boyunca veri toplandı." },
        { tense: "Present Perfect", en: "Prices have remained stable throughout the economic crisis.", tr: "Ekonomik kriz boyunca fiyatlar istikrarlı kalmıştır." },
        { tense: "Future Simple", en: "The museum will remain open during the summer festival next month.", tr: "Müze gelecek ay yaz festivali boyunca açık kalacaktır." },
        { tense: "Modal / Passive", en: "Safety gear must be worn throughout the operation in the plant.", tr: "Tesis içindeki operasyon boyunca güvenlik ekipmanı giyilmelidir." }
      ]
    },
    // 🎯 Neden-Etki Fiil ve Edat Kuralları (Cetvel I & II - 5 Farklı Zaman Öbeği Entegrasyonu)
    lead_to_cause: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "can_may_v1"], trPattern: "Sağlıksız beslenme alışkanlıkları uzun vadeli ciddi sağlık sorunlarına sebep olur." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Şiddetli yağmur fırtınası dün kentin altyapısına ağır hasar verdi." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Hızlı kentleşme, son yıllarda önemli ölçüde ormansızlaşmaya sebep olmuştur." },
        { clauseA: "future_date", clauseB: ["will_have_v3"], trPattern: "2030 yılına kadar yükselen küresel sıcaklıklar tarım bölgelerinde büyük kaymalara yol açmış olacaktır." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1", "v1_main"], trPattern: "Beklenmedik ekonomik krizler ani piyasa dalgalanmalarına sebep olabilir." }
      ],
      ruleText: "LEAD TO / CAUSE / BRING ABOUT (Fiil Kalıbı): NEDEN + lead to / cause / bring about + ETKİ.",
      tenseExamples: [
        { tense: "Simple Present", en: "Unhealthy eating habits cause serious long-term health problems.", tr: "Sağlıksız beslenme alışkanlıkları uzun vadeli ciddi sağlık sorunlarına sebep olur." },
        { tense: "Simple Past", en: "The heavy rainstorm caused severe damage to the city’s infrastructure yesterday.", tr: "Şiddetli yağmur fırtınası dün kentin altyapısına ağır hasar verdi." },
        { tense: "Present Perfect", en: "Rapid urbanization has caused significant deforestation in recent years.", tr: "Hızlı kentleşme, son yıllarda önemli ölçüde ormansızlaşmaya sebep olmuştur." },
        { tense: "Future Perfect", en: "By 2030, rising global temperatures will have caused major shifts in agricultural zones.", tr: "2030 yılına kadar yükselen küresel sıcaklıklar tarım bölgelerinde büyük kaymalara yol açmış olacaktır." },
        { tense: "Modal / Passive", en: "Unexpected economic crises can cause sudden market fluctuations.", tr: "Beklenmedik ekonomik krizler ani piyasa dalgalanmalarına sebep olabilir." }
      ]
    },
    is_responsible_for: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v_ing_obj", "v1_main"], trPattern: "Ormansızlaşma biyoçeşitliliğin yaygın kaybından sorumludur." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Dün geceki tren çarpışmasından insan hatası sorumluydu." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Endüstriyel emisyonlar hava kalitesinin kötüleşmesinden sorumlu olmuştur." }
      ],
      ruleText: "IS / ARE RESPONSIBLE FOR (Fiil Kalıbı): NEDEN (İsim Öbeği) + is/are responsible for + ETKİ (İsim Öbeği).",
      tenseExamples: [
        { tense: "Simple Present", en: "Deforestation is responsible for widespread loss of biodiversity.", tr: "Ormansızlaşma biyoçeşitliliğin yaygın kaybından sorumludur." },
        { tense: "Simple Past", en: "Human error was responsible for the train collision last night.", tr: "Dün geceki tren çarpışmasından insan hatası sorumluydu." },
        { tense: "Present Perfect", en: "Industrial emissions have been responsible for worsening air quality.", tr: "Endüstriyel emisyonlar hava kalitesinin kötüleşmesinden sorumlu olmuştur." },
        { tense: "Future Simple", en: "AI algorithms will be responsible for routing city traffic smoothly.", tr: "Şehir trafiğini sorunsuz yönlendirmekten yapay zeka algoritmaları sorumlu olacaktır." },
        { tense: "Modal / Passive", en: "Systemic issues might be responsible for recurring software crashes.", tr: "Tekrarlayan yazılım çökmelerinden sistemsel sorunlar sorumlu olabilir." }
      ]
    },
    produce_produces: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v_ing_obj", "v1_main"], trPattern: "Fabrikalar kirli atıklar meydana getirir." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Kimyasal tepkime test sırasında zehirli olmayan bir gaz meydana getirdi." }
      ],
      ruleText: "PRODUCE / PRODUCES: NEDEN + produce(s) + ETKİ (Meydana getirmek).",
      tenseExamples: [
        { tense: "Simple Present", en: "Industrial factories produce significant amounts of carbon waste daily.", tr: "Endüstriyel fabrikalar günlük olarak önemli miktarda karbon atığı meydana getirir." },
        { tense: "Simple Past", en: "The chemical reaction produced a non-toxic gas during the test.", tr: "Kimyasal tepkime test sırasında zehirli olmayan bir gaz üretti/meydana getirdi." },
        { tense: "Present Perfect", en: "Green technology initiatives have produced remarkable environmental benefits.", tr: "Yeşil teknoloji girişimleri kayda değer çevresel faydalar meydana getirmiştir." },
        { tense: "Future Simple", en: "The new solar plant will produce clean electricity for thousands of homes.", tr: "Yeni güneş santrali binlerce ev için temiz elektrik üretecektir." },
        { tense: "Modal / Passive", en: "High pressure can produce unexpected reactions in subterranean rocks.", tr: "Yüksek basınç yeraltı kayalarında beklenmedik tepkimeler meydana getirebilir." }
      ]
    },
    induce_provoke_prompt: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["noun_phrase", "v_ing_obj", "v1_main"], trPattern: "Finansal teşvikler şirketleri yeşil enerjiye yatırım yapmaya yönlendirir." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Ani fiyat artışı dün toplum genelinde öfke tetikledi." }
      ],
      ruleText: "INDUCE / PROVOKE / PROMPT: NEDEN + induce / prompt + ETKİ (Teşvik etmek / Yol açmak).",
      tenseExamples: [
        { tense: "Simple Present", en: "Financial incentives prompt companies to invest in green energy.", tr: "Finansal teşvikler şirketleri yeşil enerjiye yatırım yapmaya yönlendirir/özendirir." },
        { tense: "Simple Past", en: "The sudden price increase provoked widespread public outrage yesterday.", tr: "Ani fiyat artışı dün toplum genelinde öfke tetikledi/uyandırdı." },
        { tense: "Present Perfect", en: "Recent audit findings have induced strict compliance measures across branches.", tr: "Son denetim bulguları şubeler genelinde katı uyum tedbirlerini özendirmiştir." },
        { tense: "Future Simple", en: "New market regulations will prompt investors to re-evaluate risk models.", tr: "Yeni piyasa düzenlemeleri yatırımcıları risk modellerini yeniden değerlendirmeye yönlendirecektir." },
        { tense: "Modal / Passive", en: "Extreme fatigue may induce memory lapses during exams.", tr: "Aşırı yorgunluk sınavlar sırasında hafıza kayıplarını tetikleyebilir." }
      ]
    },
    result_in: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Yüksek nem seviyeleri eski binalarda hızlı küf oluşumu ile sonuçlanır." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Pilotun hızlı müdahalesi güvenli bir acil iniş ile sonuçlandı." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Yeni politikaların uygulanması suç oranlarında dramatik bir düşüşle sonuçlanmıştır." },
        { clauseA: "future_date", clauseB: ["will_have_v3"], trPattern: "Sürekli yatırım gelecek yıla kadar toplam dijital dönüşümle sonuçlanmış olacaktır." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Tehlikeli maddelerin dikkatsizce taşınması endüstriyel kazalarla sonuçlanabilir." }
      ],
      ruleText: "RESULT IN: NEDEN + result in + ETKİ (İle sonuçlanmak).",
      tenseExamples: [
        { tense: "Simple Present", en: "High humidity levels result in rapid mould growth in old buildings.", tr: "Yüksek nem seviyeleri eski binalarda hızlı küf oluşumu ile sonuçlanır." },
        { tense: "Simple Past", en: "The pilot's quick intervention resulted in a safe emergency landing.", tr: "Pilotun hızlı müdahalesi güvenli bir acil iniş ile sonuçlandı." },
        { tense: "Present Perfect", en: "Implementation of new policies has resulted in a dramatic drop in crime rates.", tr: "Yeni politikaların uygulanması suç oranlarında dramatik bir düşüşle sonuçlanmıştır." },
        { tense: "Future Perfect", en: "Continuous investment will have resulted in total digital transformation by next year.", tr: "Sürekli yatırım gelecek yıla kadar toplam dijital dönüşümle sonuçlanmış olacaktır." },
        { tense: "Modal / Passive", en: "Careless handling of hazardous materials could result in catastrophic industrial accidents.", tr: "Tehlikeli maddelerin dikkatsizce taşınması felaket niteliğinde endüstriyel kazalarla sonuçlanabilir." }
      ]
    },
    trigger_triggers: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Belirli alerjenler duyarlı bireylerde şiddetli alerjik reaksiyonları tetikler." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Beklenmedik faiz artışı geçen hafta borsada keskin bir düşüşü tetikledi." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "İklim değişikliği daha sık görülen aşırı hava olaylarını tetiklemiştir." },
        { clauseA: "noun_phrase", clauseB: ["will_v1"], trPattern: "Tedarik zinciri aksamaları hammadde fiyatlarında küresel artışları tetikleyecektir." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Stresli koşullar altında travma yoğun duygusal tepkileri tetikleyebilir." }
      ],
      ruleText: "TRIGGER / TRIGGERS: NEDEN + trigger(s) + ETKİ (Tetiklemek).",
      tenseExamples: [
        { tense: "Simple Present", en: "Certain allergens trigger severe allergic reactions in sensitive individuals.", tr: "Belirli alerjenler duyarlı bireylerde şiddetli alerjik reaksiyonları tetikler." },
        { tense: "Simple Past", en: "The unexpected rate hike triggered a sharp decline in the stock market last week.", tr: "Beklenmedik faiz artışı geçen hafta borsada keskin bir düşüşü tetikledi." },
        { tense: "Present Perfect", en: "Climate change has triggered more frequent extreme weather events.", tr: "İklim değişikliği daha sık görülen aşırı hava olaylarını tetiklemiştir." },
        { tense: "Future Simple", en: "Supply chain disruptions will trigger global price increases in raw materials.", tr: "Tedarik zinciri aksamaları hammadde fiyatlarında küresel artışları tetikleyecektir." },
        { tense: "Modal / Passive", en: "Trauma may trigger intense emotional responses under stressful conditions.", tr: "Stresli koşullar altında travma yoğun duygusal tepkileri tetikleyebilir." }
      ]
    },
    give_rise_to: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Ekonomik eşitsizlik sıklıkla toplumsal huzursuzluk ve siyasi kutuplaşmayı doğurur." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Elektriğin keşfi binlerce modern icadı ortaya çıkardı." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Hızlı teknolojik büyüme tamamen yeni iş sektörlerini ortaya çıkarmıştır." },
        { clauseA: "future_date", clauseB: ["will_have_v3"], trPattern: "2040 yılına kadar kuantum bilgisayarları yeni bir kriptografi çağını doğurmuş olacaktır." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Muğlak düzenlemeler uzun hukuki ihtilaflara yol açabilir." }
      ],
      ruleText: "GIVE RISE TO: NEDEN + give(s) rise to + ETKİ (Ortaya çıkarmak).",
      tenseExamples: [
        { tense: "Simple Present", en: "Economic inequality often gives rise to social unrest and political polarization.", tr: "Ekonomik eşitsizlik sıklıkla toplumsal huzursuzluk ve siyasi kutuplaşmayı doğurur." },
        { tense: "Simple Past", en: "The discovery of electricity gave rise to thousands of modern inventions.", tr: "Elektriğin keşfi binlerce modern icadı ortaya çıkardı." },
        { tense: "Present Perfect", en: "Rapid technological growth has given rise to entirely new job sectors.", tr: "Hızlı teknolojik büyüme tamamen yeni iş sektörlerini ortaya çıkarmıştır." },
        { tense: "Future Perfect", en: "By 2040, quantum computing will have given rise to a new era of cryptography.", tr: "2040 yılına kadar kuantum bilgisayarları yeni bir kriptografi çağını doğurmuş olacaktır." },
        { tense: "Modal / Passive", en: "Ambiguous regulations can give rise to lengthy legal disputes.", tr: "Muğlak düzenlemeler uzun hukuki ihtilaflara yol açabilir." }
      ]
    },
    contribute_to: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Düzenli egzersiz genel zihinsel ve fiziksel sağlığa katkıda bulunur." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Dün yüksek hız trafik kazasının şiddetine katkıda bulundu / neden oldu." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "İnsan faaliyetleri onlarca yıldır küresel ısınmaya katkıda bulunmaktadır." },
        { clauseA: "noun_phrase", clauseB: ["will_v1"], trPattern: "Yeni kütüphane yerel öğrenciler arasındaki akademik performansa katkı sağlayacaktır." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Uykusuzluğun iş yerinde kötü karar vermeye sebep olmasına izin verilmemelidir." }
      ],
      ruleText: "CONTRIBUTE TO: NEDEN + contribute(s) to + ETKİ (Katkıda bulunmak / Yol açmak).",
      tenseExamples: [
        { tense: "Simple Present", en: "Regular exercise contributes to overall mental and physical well-being.", tr: "Düzenli egzersiz genel zihinsel ve fiziksel sağlığa katkıda bulunur." },
        { tense: "Simple Past", en: "High speed contributed to the severity of the traffic accident yesterday.", tr: "Dün yüksek hız trafik kazasının şiddetine katkıda bulundu / neden oldu." },
        { tense: "Present Perfect", en: "Human activities have contributed to global warming for decades.", tr: "İnsan faaliyetleri onlarca yıldır küresel ısınmaya katkıda bulunmaktadır." },
        { tense: "Future Simple", en: "The new library will contribute to academic performance among local students.", tr: "Yeni kütüphane yerel öğrenciler arasındaki akademik performansa katkı sağlayacaktır." },
        { tense: "Modal / Passive", en: "Lack of sleep should not contribute to poor decision-making at work.", tr: "Uykusuzluğun iş yerinde kötü karar vermeye sebep olmasına izin verilmemelidir." }
      ]
    },
    pave_the_way_for: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Temel bilimsel araştırmalar tıbbi yeniliklere zemin hazırlar." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Barış anlaşması bölgede ekonomik refahın yolunu açtı." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Son yasalar yenilenebilir enerji yatırımlarına zemin hazırlamıştır." },
        { clauseA: "noun_phrase", clauseB: ["will_v1"], trPattern: "Otonom sürüş teknolojisi daha güvenli kara ulaşımına zemin hazırlayacaktır." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Diplomatik diyalog uluslararası ticaret işbirliğine zemin hazırlayabilir." }
      ],
      ruleText: "PAVE THE WAY FOR: NEDEN + pave(s) the way for + ETKİ (Zemin hazırlamak).",
      tenseExamples: [
        { tense: "Simple Present", en: "Basic scientific research paves the way for medical innovations.", tr: "Temel bilimsel araştırmalar tıbbi yeniliklere zemin hazırlar." },
        { tense: "Simple Past", en: "The peace agreement paved the way for economic prosperity in the region.", tr: "Barış anlaşması bölgede ekonomik refahın yolunu açtı." },
        { tense: "Present Perfect", en: "Recent legislation has paved the way for renewable energy investments.", tr: "Son yasalar yenilenebilir enerji yatırımlarına zemin hazırlamıştır." },
        { tense: "Future Simple", en: "Autonomous driving technology will pave the way for safer road transportation.", tr: "Otonom sürüş teknolojisi daha güvenli kara ulaşımına zemin hazırlayacaktır." },
        { tense: "Modal / Passive", en: "Diplomatic dialogue could pave the way for international trade cooperation.", tr: "Diplomatik diyalog uluslararası ticaret işbirliğine zemin hazırlayabilir." }
      ]
    },
    culminate_in: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Uzun sanatsal çabalar dünya çapında şaheserlerle zirveye ulaşır." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Yıllar süren adanmış çalışma dün tarihi bir zaferle noktalandı." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Bilimsel müzakereler küresel bir iklim paktı ile neticelenmiştir." },
        { clauseA: "future_date", clauseB: ["will_have_v3"], trPattern: "Devam eden inşaat 2028 yılına kadar gökdelenle tamamlanmış olacaktır." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Küçük siyasi gerilimler büyük bir diplomatik krizle sonuçlanabilir." }
      ],
      ruleText: "CULMINATE IN: NEDEN + culminate(s) in + ETKİ (İle sonuçlanmak / Zirveye ulaşmak).",
      tenseExamples: [
        { tense: "Simple Present", en: "Long artistic efforts culminate in world-class masterpieces.", tr: "Uzun sanatsal çabalar dünya çapında şaheserlerle zirveye ulaşır." },
        { tense: "Simple Past", en: "Years of dedicated work culminated in a historic victory yesterday.", tr: "Yıllar süren adanmış çalışma dün tarihi bir zaferle noktalandı." },
        { tense: "Present Perfect", en: "Scientific negotiations have culminated in a global climate pact.", tr: "Bilimsel müzakereler küresel bir iklim paktı ile neticelenmiştir." },
        { tense: "Future Perfect", en: "The ongoing construction will have culminated in a grand skyscraper by 2028.", tr: "Devam eden inşaat 2028 yılına kadar görkemli bir gökdelenle tamamlanmış olacaktır." },
        { tense: "Modal / Passive", en: "Minor political tensions might culminate in a major diplomatic crisis.", tr: "Küçük siyasi gerilimler büyük bir diplomatik krizle sonuçlanabilir." }
      ]
    },

    // Etki ➔ Fiil ➔ Neden Grubu (Cetvel II)
    is_due_to: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Uçuş gecikmeleri sıklıkla olumsuz hava koşullarından kaynaklanmaktadır." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Ani sistem arızası beklenmedik bir güç dalgalanmasından kaynaklandı." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Son zamanlardaki ekonomik büyüme güçlü ihracat performansından ileri gelmiştir." },
        { clauseA: "noun_phrase", clauseB: ["will_v1"], trPattern: "Daha yüksek su faturaları artan bölgesel kıtlıktan kaynaklanacaktır." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Satışlardaki düşüş tüketici tercihlerindeki değişikliklerden kaynaklanıyor olabilir." }
      ],
      ruleText: "IS / ARE DUE TO: ETKİ (İsim Öbeği) + is/are due to + NEDEN (İsim Öbeği).",
      tenseExamples: [
        { tense: "Simple Present", en: "Flight delays are often due to severe weather conditions.", tr: "Uçuş gecikmeleri sıklıkla olumsuz hava koşullarından kaynaklanmaktadır." },
        { tense: "Simple Past", en: "The sudden system failure was due to an unexpected power surge.", tr: "Ani sistem arızası beklenmedik bir güç dalgalanmasından kaynaklandı." },
        { tense: "Present Perfect", en: "Recent economic growth has been due to strong export performance.", tr: "Son zamanlardaki ekonomik büyüme güçlü ihracat performansından ileri gelmiştir." },
        { tense: "Future Simple", en: "Higher water bills will be due to increasing regional scarcity.", tr: "Daha yüksek su faturaları artan bölgesel kıtlıktan kaynaklanacaktır." },
        { tense: "Modal / Passive", en: "The decrease in sales might be due to changes in consumer preferences.", tr: "Satışlardaki düşüş tüketici tercihlerindeki değişikliklerden kaynaklanıyor olabilir." }
      ]
    },
    result_from: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Yüksek iş tatmini olumlu bir çalışma kültüründen doğar/kaynaklanır." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Yaralanma uygun güvenlik ekipmanının eksikliğinden ileri geldi." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Önemli ilerleme yorulmak bilmez ortak araştırmalardan doğmuştur." },
        { clauseA: "noun_phrase", clauseB: ["will_v1"], trPattern: "İyileşmiş sağlık düzenli egzersiz ve dengeli beslenmeden doğacaktır." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Şiddetli komplikasyonlar erken belirtileri ihmal etmekten doğabilir." }
      ],
      ruleText: "RESULT FROM: ETKİ + result(s) from + NEDEN (Kaynaklanmak).",
      tenseExamples: [
        { tense: "Simple Present", en: "High job satisfaction results from a positive work culture.", tr: "Yüksek iş tatmini olumlu bir çalışma kültüründen doğar/kaynaklanır." },
        { tense: "Simple Past", en: "The injury resulted from a lack of proper safety equipment.", tr: "Yaralanma uygun güvenlik ekipmanının eksikliğinden ileri geldi." },
        { tense: "Present Perfect", en: "Significant progress has resulted from tireless collaborative research.", tr: "Önemli ilerleme yorulmak bilmez ortak araştırmalardan doğmuştur." },
        { tense: "Future Simple", en: "Improved health will result from regular exercise and balanced diet.", tr: "İyileşmiş sağlık düzenli egzersiz ve dengeli beslenmeden doğacaktır." },
        { tense: "Modal / Passive", en: "Severe complications could result from neglecting early symptoms.", tr: "Şiddetli komplikasyonlar erken belirtileri ihmal etmekten doğabilir." }
      ]
    },
    stem_from: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Kişilerarası çatışmaların çoğu kötü iletişimden köken alır." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Ekonomik kriz düşüncesizce yapılan spekülatif yatırımlardan kaynaklandı." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Mevcut anlaşmazlık şartlar üzerindeki yanlış anlamalardan kaynaklanmıştır." },
        { clauseA: "noun_phrase", clauseB: ["will_v1"], trPattern: "Yeni iş modelleri ortaya çıkan dijital teknolojilerden köken alacaktır." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Davranışsal sorunlar çocukluk çağı psikolojik travmasından kaynaklanabilir." }
      ],
      ruleText: "STEM FROM: ETKİ + stem(s) from + NEDEN (Köken almak).",
      tenseExamples: [
        { tense: "Simple Present", en: "Most interpersonal conflicts stem from poor communication.", tr: "Kişilerarası çatışmaların çoğu kötü iletişimden köken alır." },
        { tense: "Simple Past", en: "The economic crisis stemmed from reckless speculative investments.", tr: "Ekonomik kriz düşüncesizce yapılan spekülatif yatırımlardan kaynaklandı." },
        { tense: "Present Perfect", en: "The current dispute has stemmed from misunderstandings over terms.", tr: "Mevcut anlaşmazlık şartlar üzerindeki yanlış anlamalardan kaynaklanmıştır." },
        { tense: "Future Simple", en: "New business models will stem from emerging digital technologies.", tr: "Yeni iş modelleri ortaya çıkan dijital teknolojilerden köken alacaktır." },
        { tense: "Modal / Passive", en: "Behavioral issues might stem from childhood psychological trauma.", tr: "Davranışsal sorunlar çocukluk çağı psikolojik travmasından kaynaklanabilir." }
      ]
    },
    originate_from: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Kadim gelenekler sıklıkla mevsimsel tarım ritüellerinden doğar." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Felsefe yüzyıllar önce antik Yunan'da doğdu." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Birçok modern kelime Latin ve Grek köklerinden doğmuştur." },
        { clauseA: "noun_phrase", clauseB: ["will_v1"], trPattern: "Yeni dilbilimsel terimler dijital iletişim trendlerinden doğacaktır." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Söylenti doğrulanmamış bir sosyal medya paylaşımından çıkmış olabilir." }
      ],
      ruleText: "ORIGINATE FROM / IN: ETKİ + originate(s) in/from + NEDEN.",
      tenseExamples: [
        { tense: "Simple Present", en: "Ancient traditions often originate from seasonal agricultural rituals.", tr: "Kadim gelenekler sıklıkla mevsimsel tarım ritüellerinden doğar." },
        { tense: "Simple Past", en: "The philosophy originated in ancient Greece centuries ago.", tr: "Felsefe yüzyıllar önce antik Yunan'da doğdu." },
        { tense: "Present Perfect", en: "Many modern words have originated from Latin and Greek roots.", tr: "Birçok modern kelime Latin ve Grek köklerinden doğmuştur." },
        { tense: "Future Simple", en: "New linguistic terms will originate from digital communication trends.", tr: "Yeni dilbilimsel terimler dijital iletişim trendlerinden doğacaktır." },
        { tense: "Modal / Passive", en: "The rumor could have originated from an unverified social media post.", tr: "Söylenti doğrulanmamış bir sosyal medya paylaşımından çıkmış olabilir." }
      ]
    },
    arise_from: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Öngörülemeyen anlaşmazlıklar muğlak sözleşme dilinden meydana gelir." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Karmaşıklıklar beklenmedik yazılım uyumsuzluklarından doğdu." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Uluslararası ticaret ittifaklarından çok sayıda fırsat doğmuştur." },
        { clauseA: "noun_phrase", clauseB: ["will_v1"], trPattern: "Hızlı teknolojik kaymalardan yeni zorluklar doğacaktır." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Radyasyona uzun süre maruz kalmaktan sağlık riskleri meydana gelebilir." }
      ],
      ruleText: "ARISE FROM / OUT OF: ETKİ + arise(s) from/out of + NEDEN.",
      tenseExamples: [
        { tense: "Simple Present", en: "Unforeseen disputes arise from ambiguous contract language.", tr: "Öngörülemeyen anlaşmazlıklar muğlak sözleşme dilinden meydana gelir." },
        { tense: "Simple Past", en: "Complications arose from unexpected software incompatibilities.", tr: "Karmaşıklıklar beklenmedik yazılım uyumsuzluklarından doğdu." },
        { tense: "Present Perfect", en: "Numerous opportunities have arisen from international trade alliances.", tr: "Uluslararası ticaret ittifaklarından çok sayıda fırsat doğmuştur." },
        { tense: "Future Simple", en: "New challenges will arise from rapid technological shifts.", tr: "Hızlı teknolojik kaymalardan yeni zorluklar doğacaktır." },
        { tense: "Modal / Passive", en: "Health risks may arise from prolonged exposure to radiation.", tr: "Radyasyona uzun süre maruz kalmaktan sağlık riskleri meydana gelebilir." }
      ]
    },
    is_attributed_to: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Uzun yaşam beklentisi dengeli beslenme ve tıbbi bakıma atfedilir." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Zafer üstün taktiksel planlamaya atfedildi." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Enflasyondaki düşüş sağlam mali politikalara bağlanmıştır." },
        { clauseA: "noun_phrase", clauseB: ["will_v1"], trPattern: "Gelecekteki atılımlar disiplinlerarası işbirliğine atfedilecektir." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Hata donanım sensörlerindeki bir arızaya bağlanabilir." }
      ],
      ruleText: "IS ATTRIBUTED TO: ETKİ + is/are attributed to + NEDEN.",
      tenseExamples: [
        { tense: "Simple Present", en: "Long life expectancy is attributed to balanced diet and medical care.", tr: "Uzun yaşam beklentisi dengeli beslenme ve tıbbi bakıma atfedilir." },
        { tense: "Simple Past", en: "The victory was attributed to superior tactical planning.", tr: "Zafer üstün taktiksel planlamaya atfedildi." },
        { tense: "Present Perfect", en: "The decline in inflation has been attributed to sound fiscal policies.", tr: "Enflasyondaki düşüş sağlam mali politikalara bağlanmıştır." },
        { tense: "Future Simple", en: "Future breakthroughs will be attributed to cross-disciplinary collaboration.", tr: "Gelecekteki atılımlar disiplinlerarası işbirliğine atfedilecektir." },
        { tense: "Modal / Passive", en: "The error could be attributed to a malfunction in hardware sensors.", tr: "Hata donanım sensörlerindeki bir arızaya bağlanabilir." }
      ]
    },
    is_ascribed_to: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Sanatsal deha sıklıkla doğuştan gelen yetenek ve tutkuya bağlanır." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Başyapıt ünlü bir Rönesans ustasına atfedildi." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Başarısızlık yetersiz pazar araştırmasına bağlanmıştır." },
        { clauseA: "noun_phrase", clauseB: ["will_v1"], trPattern: "Gelecekteki başarı disiplinli günlük alışkanlıklara bağlanacaktır." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Antik metin erken dönem manastır yazmanlarına atfedilebilir." }
      ],
      ruleText: "IS ASCRIBED TO / ROOTED IN: ETKİ + is ascribed to / rooted in + NEDEN.",
      tenseExamples: [
        { tense: "Simple Present", en: "Artistic genius is often ascribed to innate talent and passion.", tr: "Sanatsal deha sıklıkla doğuştan gelen yetenek ve tutkuya bağlanır." },
        { tense: "Simple Past", en: "The masterpiece was ascribed to a renowned Renaissance master.", tr: "Başyapıt ünlü bir Rönesans ustasına atfedildi." },
        { tense: "Present Perfect", en: "The failure has been ascribed to poor market research.", tr: "Başarısızlık yetersiz pazar araştırmasına bağlanmıştır." },
        { tense: "Future Simple", en: "Future success will be ascribed to disciplined daily habits.", tr: "Gelecekteki başarı disiplinli günlük alışkanlıklara bağlanacaktır." },
        { tense: "Modal / Passive", en: "The ancient text can be ascribed to early monastic scribes.", tr: "Antik metin erken dönem manastır yazmanlarına atfedilebilir." }
      ]
    },
    is_caused_by: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Küresel ısınmaya sera gazı emisyonları neden olur." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Orman yangınına dün düşen bir yıldırım neden oldu." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Şiddetli kıyı erozyonuna fırtınalar neden olmuştur." },
        { clauseA: "noun_phrase", clauseB: ["will_v1"], trPattern: "Deniz seviyelerinin yükselmesine eriyen kutup buzulları neden olacaktır." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Alerjik reaksiyonlara sentetik katkı maddeleri neden olabilir." }
      ],
      ruleText: "IS CAUSED BY: ETKİ + is/are caused by + NEDEN (Neden olunmak).",
      tenseExamples: [
        { tense: "Simple Present", en: "Global warming is caused by greenhouse gas emissions.", tr: "Küresel ısınmaya sera gazı emisyonları neden olur." },
        { tense: "Simple Past", en: "The forest fire was caused by a lightning strike yesterday.", tr: "Orman yangınına dün düşen bir yıldırım neden oldu." },
        { tense: "Present Perfect", en: "Significant coastal erosion has been caused by severe storms.", tr: "Şiddetli kıyı erozyonuna fırtınalar neden olmuştur." },
        { tense: "Future Simple", en: "Higher sea levels will be caused by melting polar ice caps.", tr: "Deniz seviyelerinin yükselmesine eriyen kutup buzulları neden olacaktır." },
        { tense: "Modal / Passive", en: "Allergic reactions might be caused by synthetic additives.", tr: "Alerjik reaksiyonlara sentetik katkı maddeleri neden olabilir." }
      ]
    },

    // Edat Öbekleri & Bağlaçlar
    because_of_due_to_owing_to: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v1_main"], trPattern: "Yoğun sabah yağmuru yüzünden trafik sıkışıklıkları yaşanır." },
        { clauseA: "noun_phrase", clauseB: ["v2_main"], trPattern: "Kötü hava koşulları nedeniyle uçuş ertelendi." },
        { clauseA: "noun_phrase", clauseB: ["has_v3_main"], trPattern: "Siyasi istikrarsızlık nedeniyle turizm büyük zarar görmüştür." },
        { clauseA: "noun_phrase", clauseB: ["will_v1"], trPattern: "Tahmin edilen yaz kuraklıkları yüzünden ürün verimi düşecektir." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Teknik zorluklar nedeniyle teslim tarihleri uzatılabilir." }
      ],
      ruleText: "BECAUSE OF / DUE TO / OWING TO: ETKİ Cümlesi + edat + NEDEN İsim Öbeği.",
      tenseExamples: [
        { tense: "Simple Present", en: "Traffic jams occur because of heavy morning rain.", tr: "Yoğun sabah yağmuru yüzünden trafik sıkışıklıkları yaşanır." },
        { tense: "Simple Past", en: "The flight was delayed owing to bad weather conditions.", tr: "Kötü hava koşulları nedeniyle uçuş ertelendi." },
        { tense: "Present Perfect", en: "Tourism has suffered greatly due to political instability.", tr: "Siyasi istikrarsızlık nedeniyle turizm büyük zarar görmüştür." },
        { tense: "Future Simple", en: "Crop yields will decline because of predicted summer droughts.", tr: "Tahmin edilen yaz kuraklıkları yüzünden ürün verimi düşecektir." },
        { tense: "Modal / Passive", en: "Deadlines can be extended due to technical difficulties.", tr: "Teknik zorluklar nedeniyle teslim tarihleri uzatılabilir." }
      ]
    },
    on_account_of_in_view_of: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v1_main"], trPattern: "Yaz sıcak dalgaları sebebiyle okullar erken kapanır." },
        { clauseA: "noun_phrase", clauseB: ["v2_past", "v2_main"], trPattern: "Artan siber saldırılar göz önüne alındığında şirket güvenliği artırdı." },
        { clauseA: "noun_phrase", clauseB: ["has_v3_main"], trPattern: "Yüksek nakliye maliyetleri sebebiyle fiyatlar yükselmiştir." },
        { clauseA: "noun_phrase", clauseB: ["will_v1"], trPattern: "Piyasa talepleri göz önüne alındığında politika değişiklikleri gerçekleşecektir." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Yeni risk raporları göz önüne alındığında plan değiştirilmelidir." }
      ],
      ruleText: "ON ACCOUNT OF / IN VIEW OF: Göz önüne alındığında / -den dolayı.",
      tenseExamples: [
        { tense: "Simple Present", en: "Schools close early on account of summer heatwaves.", tr: "Yaz sıcak dalgaları sebebiyle okullar erken kapanır." },
        { tense: "Simple Past", en: "The firm boosted security in view of rising cyber attacks.", tr: "Artan siber saldırılar göz önüne alındığında şirket güvenliği artırdı." },
        { tense: "Present Perfect", en: "Prices have escalated on account of high shipping costs.", tr: "Yüksek nakliye maliyetleri sebebiyle fiyatlar yükselmiştir." },
        { tense: "Future Simple", en: "Policy shifts will take place in view of market demands.", tr: "Piyasa talepleri göz önüne alındığında politika değişiklikleri gerçekleşecektir." },
        { tense: "Modal / Passive", en: "The plan should be modified in view of new risk reports.", tr: "Yeni risk raporları göz önüne alındığında plan değiştirilmelidir." }
      ]
    },
    by_virtue_of: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v1_main"], trPattern: "Kıdemli konumu sayesinde yetki elinde bulunur." },
        { clauseA: "noun_phrase", clauseB: ["v2_main"], trPattern: "Dava yetersiz delil gerekçesiyle reddedildi." },
        { clauseA: "noun_phrase", clauseB: ["has_v3_main"], trPattern: "Sürekli adanmışlığı sayesinde saygı kazanmıştır." },
        { clauseA: "noun_phrase", clauseB: ["will_v1"], trPattern: "Şampiyonluk kuralları sayesinde takım dokunulmazlık kazanacaktır." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Ulusal güvenlik gerekçesiyle bilgi saklanabilir." }
      ],
      ruleText: "BY VIRTUE OF / ON THE GROUNDS OF: Sayesinde / Gerekçesiyle.",
      tenseExamples: [
        { tense: "Simple Present", en: "She holds authority by virtue of her senior position.", tr: "Kıdemli konumu sayesinde yetki elinde bulunur." },
        { tense: "Simple Past", en: "The case was dismissed on the grounds of insufficient evidence.", tr: "Dava yetersiz delil gerekçesiyle reddedildi." },
        { tense: "Present Perfect", en: "He has gained respect by virtue of continuous dedication.", tr: "Sürekli adanmışlığı sayesinde saygı kazanmıştır." },
        { tense: "Future Simple", en: "The team will win immunity by virtue of championship rules.", tr: "Şampiyonluk kuralları sayesinde takım dokunulmazlık kazanacaktır." },
        { tense: "Modal / Passive", en: "Information can be withheld on the grounds of national security.", tr: "Ulusal güvenlik gerekçesiyle bilgi saklanabilir." }
      ]
    },
    as_a_result_of: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v1_main"], trPattern: "Toprak bozulması yoğun tarımın sonucu olarak gerçekleşir." },
        { clauseA: "noun_phrase", clauseB: ["v2_main"], trPattern: "Ekonomik durgunluğun sonucu olarak birkaç işletme başarısız oldu." },
        { clauseA: "noun_phrase", clauseB: ["has_v3_main"], trPattern: "Katı düzenlemelerin sonucu olarak hava kalitesi iyileşmiştir." },
        { clauseA: "future_date", clauseB: ["will_have_v3"], trPattern: "2040 yılına kadar iklim planlamasının sonucu olarak şehirler uyum sağlamış olacaktır." },
        { clauseA: "noun_phrase", clauseB: ["can_may_v1"], trPattern: "Kötü beslenmenin bir sonucu olarak sağlık sorunları ortaya çıkabilir." }
      ],
      ruleText: "AS A RESULT OF: -in sonucu olarak (+ İsim Öbeği).",
      tenseExamples: [
        { tense: "Simple Present", en: "Soil degradation happens as a result of intensive farming.", tr: "Toprak bozulması yoğun tarımın sonucu olarak gerçekleşir." },
        { tense: "Simple Past", en: "Several businesses failed as a consequence of economic slump.", tr: "Ekonomik durgunluğun sonucu olarak birkaç işletme başarısız oldu." },
        { tense: "Present Perfect", en: "Air quality has improved as a result of strict regulations.", tr: "Katı düzenlemelerin sonucu olarak hava kalitesi iyileşmiştir." },
        { tense: "Future Perfect", en: "Cities will have adapted as a result of climate planning by 2040.", tr: "2040 yılına kadar iklim planlamasının sonucu olarak şehirler uyum sağlamış olacaktır." },
        { tense: "Modal / Passive", en: "Health problems could arise as a consequence of poor diet.", tr: "Kötü beslenmenin bir sonucu olarak sağlık sorunları ortaya çıkabilir." }
      ]
    },
    therefore_thus_hence: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Güneş enerjisi temizdir; bu yüzden kirliliği azaltır." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Baraj patladı; dolayısıyla yakındaki köyleri tamamen su bastı." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Piyasa talebi büyümüştür; dolayısıyla üretim ikiye katlanmıştır." },
        { clauseA: "v1_present", clauseB: ["will_v1"], trPattern: "Vergiler artacaktır; bu yüzden kamu harcamaları ayarlanacaktır." },
        { clauseA: "v1_present", clauseB: ["can_may_v1"], trPattern: "Kaynaklar kıttır; dolayısıyla suyu korumalıyız." }
      ],
      ruleText: "THEREFORE / THUS / HENCE: NEDEN Cümlesi; bu yüzden, ETKİ Cümlesi.",
      tenseExamples: [
        { tense: "Simple Present", en: "Solar power is clean; therefore, it reduces pollution.", tr: "Güneş enerjisi temizdir; bu yüzden kirliliği azaltır." },
        { tense: "Simple Past", en: "The dam burst; thus, nearby villages flooded completely.", tr: "Baraj patladı; dolayısıyla yakındaki köyleri tamamen su bastı." },
        { tense: "Present Perfect", en: "Market demand has grown; hence, output has doubled.", tr: "Piyasa talebi büyümüştür; dolayısıyla üretim ikiye katlanmıştır." },
        { tense: "Future Simple", en: "Taxes will rise; therefore, public spending will adjust.", tr: "Vergiler artacaktır; bu yüzden kamu harcamaları ayarlanacaktır." },
        { tense: "Modal / Passive", en: "Supplies are scarce; thus, we must conserve water.", tr: "Kaynaklar kıttır; dolayısıyla suyu korumalıyız." }
      ]
    },
    consequently: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Çöllerde yağmur azdır; bunun neticesinde bitki örtüsü seyrek kalır." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Teslim tarihini kaçırdı; sonuç olarak başvurusu diskalifiye edildi." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Emisyonlar düşmüştür; bunun neticesinde hava kalitesi iyileşmiştir." },
        { clauseA: "v1_present", clauseB: ["will_v1"], trPattern: "Takım sıkı çalışacak; sonuç olarak başarılı olacaklar." },
        { clauseA: "v1_present", clauseB: ["can_may_v1"], trPattern: "Maliyetler yükselebilir; bunun neticesinde fiyatlar artırılabilir." }
      ],
      ruleText: "CONSEQUENTLY / AS A CONSEQUENCE: Bunun neticesinde.",
      tenseExamples: [
        { tense: "Simple Present", en: "Deserts lack rain; consequently, vegetation remains sparse.", tr: "Çöllerde yağmur azdır; bunun neticesinde bitki örtüsü seyrek kalır." },
        { tense: "Simple Past", en: "He missed the deadline; as a result, his entry was disqualified.", tr: "Teslim tarihini kaçırdı; sonuç olarak başvurusu diskalifiye edildi." },
        { tense: "Present Perfect", en: "Emissions have dropped; consequently, air quality has improved.", tr: "Emisyonlar düşmüştür; bunun neticesinde hava kalitesi iyileşmiştir." },
        { tense: "Future Simple", en: "The team will practice hard; as a result, they will succeed.", tr: "Takım sıkı çalışacak; sonuç olarak başarılı olacaklar." },
        { tense: "Modal / Passive", en: "Costs may surge; consequently, prices could be increased.", tr: "Maliyetler yükselebilir; bunun neticesinde fiyatlar artırılabilir." }
      ]
    },
    as_a_result_that: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Proje iyi fonlanıyor; sonuç olarak ilerleme sorunsuz." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Şehri kar yağışı vurdu, bunun neticesinde uçuşlar yere indirildi." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Yeni yönetim devreye girdi; sonuç olarak gelirler yükselmiştir." },
        { clauseA: "v1_present", clauseB: ["will_v1"], trPattern: "Otomasyon genişleyecek, bunun neticesinde verimlilik artacaktır." },
        { clauseA: "v1_present", clauseB: ["can_may_v1"], trPattern: "Politikalar değişebilir, bunun neticesinde kurallar esnetilebilir." }
      ],
      ruleText: "AS A RESULT / WITH THE RESULT THAT: Sonuç olarak.",
      tenseExamples: [
        { tense: "Simple Present", en: "The project is well-funded; as a result, progress is smooth.", tr: "Proje iyi fonlanıyor; sonuç olarak ilerleme sorunsuz." },
        { tense: "Simple Past", en: "Heavy snowfall hit the city, with the result that flights were grounded.", tr: "Şehri yoğun kar yağışı vurdu, bunun neticesinde uçuşlar yere indirildi." },
        { tense: "Present Perfect", en: "New management has stepped in; as a result, revenue has soared.", tr: "Yeni yönetim devreye girdi; sonuç olarak gelirler yükselmiştir." },
        { tense: "Future Simple", en: "Automation will expand, with the result that productivity will rise.", tr: "Otomasyon genişleyecek, bunun neticesinde verimlilik artacaktır." },
        { tense: "Modal / Passive", en: "Policies might change, with the result that rules could be relaxed.", tr: "Politikalar değişebilir, bunun neticesinde kurallar esnetilebilir." }
      ]
    },
    accordingly: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Kurallar katıdır; bu doğrultuda öğrenciler yönergeleri izler." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Bütçe küçültüldü; buna bağlı olarak personel azaltıldı." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Risk seviyeleri yükselmiştir; buna bağlı olarak güvenlik takviye edilmiştir." },
        { clauseA: "v1_present", clauseB: ["will_v1"], trPattern: "Talep kayacaktır; bu doğrultuda üretim uyum sağlayacaktır." },
        { clauseA: "v1_present", clauseB: ["can_may_v1"], trPattern: "Hatalar olabilir; bu doğrultuda kontroller gerçekleştirilmelidir." }
      ],
      ruleText: "ACCORDINGLY: Buna bağlı olarak / Bu doğrultuda.",
      tenseExamples: [
        { tense: "Simple Present", en: "Rules are strict; accordingly, students follow guidelines carefully.", tr: "Kurallar katıdır; bu doğrultuda öğrenciler yönergeleri dikkatle izler." },
        { tense: "Simple Past", en: "Budget was reduced; accordingly, staff was downsized.", tr: "Bütçe küçültüldü; buna bağlı olarak personel azaltıldı." },
        { tense: "Present Perfect", en: "Risk levels have risen; accordingly, security has been beefed up.", tr: "Risk seviyeleri yükselmiştir; buna bağlı olarak güvenlik takviye edilmiştir." },
        { tense: "Future Simple", en: "Demand will shift; accordingly, production will adapt.", tr: "Talep kayacaktır; bu doğrultuda üretim uyum sağlayacaktır." },
        { tense: "Modal / Passive", en: "Errors may happen; accordingly, checks should be conducted.", tr: "Hatalar olabilir; bu doğrultuda kontroller gerçekleştirilmelidir." }
      ]
    },
    in_that: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Yöntem benzersizdir çünkü zaman tasarrufu sağlar." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Etkinlik unutulmazdı çünkü topluluğu birleştirdi." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Politika başarılı olmuştur çünkü yoksulluğu azaltmıştır." },
        { clauseA: "v1_present", clauseB: ["will_v1"], trPattern: "Araç üstün olacaktır çünkü sıfır yakıt kullanacaktır." },
        { clauseA: "v1_present", clauseB: ["can_may_v1"], trPattern: "Plan idealdir çünkü trafik sorunlarını çözebilir." }
      ],
      ruleText: "IN THAT: -mesi bakımından / çünkü (+ Cümle).",
      tenseExamples: [
        { tense: "Simple Present", en: "The method is unique in that it saves significant time.", tr: "Yöntem benzersizdir çünkü önemli ölçüde zaman tasarrufu sağlar." },
        { tense: "Simple Past", en: "The event was memorable in that it united the community.", tr: "Etkinlik unutulmazdı çünkü topluluğu birleştirdi." },
        { tense: "Present Perfect", en: "The policy has succeeded in that it has reduced poverty.", tr: "Politika başarılı olmuştur çünkü yoksulluğu azaltmıştır." },
        { tense: "Future Simple", en: "The vehicle will be superior in that it will use zero fuel.", tr: "Araç üstün olacaktır çünkü sıfır yakıt kullanacaktır." },
        { tense: "Modal / Passive", en: "The plan is ideal in that it could solve traffic issues.", tr: "Plan idealdir çünkü trafik sorunlarını çözebilir." }
      ]
    },
    inasmuch_as_seeing_that: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "can_may_v1"], trPattern: "Madenler sınırlı olduğuna göre malzemeleri dönüştürmeliyiz." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Yağmurun başladığı göz önüne alındığında maç ertelendi." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Teknolojinin ilerlediği göz önüne alınırsa uzaktan çalışma büyümüştür." },
        { clauseA: "v1_present", clauseB: ["will_v1"], trPattern: "Maliyetlerin ikiye katlanacağı göz önüne alındığında tedarikçi değiştireceğiz." }
      ],
      ruleText: "INASMUCH AS / SEEING THAT / GIVEN THAT: -dığına göre / göz önüne alındığında.",
      tenseExamples: [
        { tense: "Simple Present", en: "Inasmuch as resources are finite, we must recycle materials.", tr: "Madenler/kaynaklar sınırlı olduğuna göre malzemeleri geri dönüştürmeliyiz." },
        { tense: "Simple Past", en: "Seeing that rain started, the match was postponed.", tr: "Yağmurun başladığı göz önüne alındığında maç ertelendi." },
        { tense: "Present Perfect", en: "Given that technology has advanced, remote work has grown.", tr: "Teknolojinin ilerlediği göz önüne alınırsa uzaktan çalışma büyümüştür." },
        { tense: "Future Simple", en: "Seeing that costs will double, we will change suppliers.", tr: "Maliyetlerin ikiye katlanacağı göz önüne alındığında tedarikçi değiştireceğiz." },
        { tense: "Modal / Passive", en: "Inasmuch as safety can be compromised, drills must be held.", tr: "Güvenlik tehlikeye girebileceğine göre tatbikatlar yapılmalıdır." }
      ]
    },
    owing_to_the_fact_that: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Her gün pratik yapması gerçeğinden dolayı başarılı olur." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Fırtınanın vurması gerçeğinden dolayı uçuş ertelendi." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Herkesin desteklemiş olması gerçeğinden dolayı reform başarılı olmuştur." },
        { clauseA: "v1_present", clauseB: ["will_v1"], trPattern: "Tedariklerin biteceği gerçeğinden dolayı üretim duracaktır." },
        { clauseA: "v1_present", clauseB: ["can_may_v1"], trPattern: "Fonların kesilebileceği gerçeğinden dolayı proje başarısız olabilir." }
      ],
      ruleText: "OWING TO THE FACT THAT: -dığı gerçeğinden dolayı (+ Cümle).",
      tenseExamples: [
        { tense: "Simple Present", en: "He succeeds due to the fact that he practices every day.", tr: "Her gün pratik yapması gerçeğinden dolayı başarılı olur." },
        { tense: "Simple Past", en: "Flight was cancelled owing to the fact that a storm struck.", tr: "Fırtınanın vurması gerçeğinden dolayı uçuş iptal edildi." },
        { tense: "Present Perfect", en: "The reform has succeeded due to the fact that all backed it.", tr: "Herkesin desteklemiş olması gerçeğinden dolayı reform başarılı olmuştur." },
        { tense: "Future Simple", en: "Production will halt owing to the fact that supplies will end.", tr: "Tedariklerin biteceği gerçeğinden dolayı üretim duracaktır." },
        { tense: "Modal / Passive", en: "The project could fail due to the fact that funds might be cut.", tr: "Fonların kesilebileceği gerçeğinden dolayı plan başarısız olabilir." }
      ]
    },
    thereby_v_ing: {
      validPairs: [
        { clauseA: "v_ing_obj", clauseB: ["v1_main"], trPattern: "Robot atığı geri dönüştürür, böylelikle enerji tasarrufu sağlar." },
        { clauseA: "v_ing_obj", clauseB: ["v2_main"], trPattern: "Devlet vergileri kesti, böylelikle ticari yatırımları artırdı." },
        { clauseA: "v_ing_obj", clauseB: ["has_v3_main"], trPattern: "Doktorlar yapay zekayı entegre etti, böylelikle teşhisi hızlandırdı." },
        { clauseA: "v_ing_obj", clauseB: ["will_v1"], trPattern: "Şirket lojistiği otomatikleştirecek, böylelikle masrafları düşürecektir." },
        { clauseA: "v_ing_obj", clauseB: ["can_may_v1"], trPattern: "Akıllı şebekeler kayıpları azaltır, böylelikle faturaları düşürmeye yardımcı olur." }
      ],
      ruleText: "THEREBY + V-ING: Böylelikle -erek (Zaman Kısaltmalı Sonuç).",
      tenseExamples: [
        { tense: "Simple Present", en: "The robot recycles waste, thereby saving energy daily.", tr: "Robot atığı geri dönüştürür, böylelikle günlük enerji tasarrufu sağlar." },
        { tense: "Simple Past", en: "The state cut taxes, thereby boosting business investments.", tr: "Devlet vergileri kesti, böylelikle ticari yatırımları artırdı." },
        { tense: "Present Perfect", en: "Doctors have integrated AI, thereby accelerating diagnosis.", tr: "Doktorlar yapay zekayı entegre etti, böylelikle teşhisi hızlandırdı." },
        { tense: "Future Simple", en: "The firm will automate logistics, thereby lowering expenses.", tr: "Şirket lojistiği otomatikleştirecek, böylelikle masrafları düşürecektir." },
        { tense: "Modal / Passive", en: "Smart grids reduce losses, thereby helping lower bills.", tr: "Akıllı şebekeler kayıpları azaltır, böylelikle faturaları düşürmeye yardımcı olur." }
      ]
    },
    so_that_such_that: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Talep öyle yüksek ki fabrikalar gece gündüz çalışır." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Öyle fırtınalıydı ki tüm uçuşlar iptal edildi." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Teknoloji öyle hızlı büyüdü ki eski araçlar demode olmuştur." },
        { clauseA: "v1_present", clauseB: ["will_v1"], trPattern: "Motor öyle verimli olacak ki sıfır benzin yakacaktır." },
        { clauseA: "v2_past", clauseB: ["would_v1"], trPattern: "Sorun öyle karmaşık bir hal alabilir ki yapay zeka gerekecektir." }
      ],
      ruleText: "SO...THAT / SUCH...THAT: Öyle ... ki (Derece Sonuç Kalıbı).",
      tenseExamples: [
        { tense: "Simple Present", en: "The demand is so high that factories work day and night.", tr: "Talep öyle yüksek ki fabrikalar gece gündüz çalışır." },
        { tense: "Simple Past", en: "It was such a severe storm that all flights were cancelled.", tr: "Öyle fırtınalıydı ki tüm uçuşlar iptal edildi." },
        { tense: "Present Perfect", en: "Tech has grown so fast that old tools have become obsolete.", tr: "Teknoloji öyle hızlı büyüdü ki eski araçlar demode olmuştur." },
        { tense: "Future Simple", en: "The engine will be so efficient that it will burn zero petrol.", tr: "Motor öyle verimli olacak ki sıfır benzin yakacaktır." },
        { tense: "Modal / Passive", en: "The issue could become so complex that AI would be required.", tr: "Sorun öyle karmaşık bir hal alabilir ki yapay zeka gerekecektir." }
      ]
    },
    so_much_so_that: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Fiziği çok sever, öyle bir dereceye kadar ki her gün makale okur." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Kuraklık çetindi, öyle bir dereceye kadar ki nehirler kurudu." },
        { clauseA: "has_v3", clauseB: ["has_v3_main"], trPattern: "Satışlar büyümüştür, öyle bir dereceye kadar ki karlar üçe katlanmıştır." },
        { clauseA: "v1_present", clauseB: ["will_v1"], trPattern: "Şehir genişleyecek, öyle bir dereceye kadar ki metro eklenecektir." },
        { clauseA: "v1_present", clauseB: ["can_may_v1"], trPattern: "Sıcaklık yükselebilir, öyle bir dereceye kadar ki ekipman eriyebilir." }
      ],
      ruleText: "SO MUCH SO THAT: Öyle bir dereceye kadar ki.",
      tenseExamples: [
        { tense: "Simple Present", en: "He loves physics, so much so that he reads papers daily.", tr: "Fiziği çok sever, öyle bir dereceye kadar ki her gün makale okur." },
        { tense: "Simple Past", en: "The drought was harsh, so much so that rivers dried out.", tr: "Kuraklık çetindi, öyle bir dereceye kadar ki nehirler kurudu." },
        { tense: "Present Perfect", en: "Sales have grown, so much so that profits have tripled.", tr: "Satışlar büyümüştür, öyle bir dereceye kadar ki karlar üçe katlanmıştır." },
        { tense: "Future Simple", en: "City will expand, so much so that subways will be added.", tr: "Şehir genişleyecek, öyle bir dereceye kadar ki metro eklenecektir." },
        { tense: "Modal / Passive", en: "Heat can rise, so much so that equipment could melt.", tr: "Sıcaklık yükselebilir, öyle bir dereceye kadar ki ekipman eriyebilir." }
      ]
    },

    // Geçiş İfadeleri Kuralları
    however_nevertheless: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Çok çalıştı; yine de sınavda zorlandı." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Çok çalıştı; yine de sınavı geçemedi." }
      ],
      ruleText: "HOWEVER / NEVERTHELESS / NONETHELESS: Zıtlık Geçiş İfadesi.",
      tenseExamples: [
        { tense: "Simple Present", en: "The strategy is risky; however, it offers substantial financial rewards.", tr: "Strateji risklidir; ancak büyük finansal getiriler sunar." },
        { tense: "Simple Past", en: "The weather was stormy; nevertheless, the flight took off on schedule yesterday.", tr: "Hava fırtınalıydı; yine de uçak dün zamanında havalandı." },
        { tense: "Present Perfect", en: "Prices have increased sharply; nonetheless, consumer demand has remained strong.", tr: "Fiyatlar keskin bir şekilde artmıştır; yine de tüketici talebi güçlü kalmıştır." },
        { tense: "Future Simple", en: "Competition will be tough; however, our team will secure the contract.", tr: "Rekabet zorlu olacaktır; ancak ekibimiz sözleşmeyi alacaktır." },
        { tense: "Modal / Passive", en: "The target seems ambitious; nevertheless, we must strive to achieve it.", tr: "Hedef iddalı görünüyor; yine de onu başarmak için çabalamalıyız." }
      ]
    },
    in_contrast_on_the_other_hand: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Ali çalışkandır; diğer yandan kardeş tembeldir." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Ali başarılıydı; aksine kardeşi zorlanıyordu." }
      ],
      ruleText: "IN CONTRAST / ON THE OTHER HAND: Karşılaştırma Geçiş İfadesi.",
      tenseExamples: [
        { tense: "Simple Present", en: "Urban areas are densely populated; in contrast, rural regions remain sparse.", tr: "Kentsel alanlar yoğun nüfusludur; aksine kırsal bölgeler seyrek kalmaktadır." },
        { tense: "Simple Past", en: "Company A suffered heavy losses; on the other hand, Company B doubled its profits last year.", tr: "A şirketi ağır kayıplar yaşadı; diğer yandan B şirketi geçen yıl karını ikiye katladı." },
        { tense: "Present Perfect", en: "Online sales have doubled; in contrast, store visits have declined.", tr: "Çevrimiçi satışlar ikiye katlanmışken, fiziksel mağaza ziyaretleri azalmıştır." },
        { tense: "Future Simple", en: "Traditional media will shrink; in contrast, digital platforms will dominate.", tr: "Geleneksel medya küçülecektir; aksine dijital platformlar hakim olacaktır." },
        { tense: "Modal / Passive", en: "Manual work can contain errors; on the other hand, AI systems ensure precision.", tr: "Manuel çalışma hatalar içerebilir; diğer yandan yapay zeka sistemleri yüksek hassasiyet sağlar." }
      ]
    },
    on_the_contrary: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Başarısız değil; tam tersine çok yetenekli." }
      ],
      ruleText: "ON THE CONTRARY: Tam tersine / Aksine.",
      tenseExamples: [
        { tense: "Simple Present", en: "He is not lazy; on the contrary, he works eighteen hours a day.", tr: "O tembel değildir; tam tersine günde on sekiz saat çalışır." },
        { tense: "Simple Past", en: "The rain did not stop; on the contrary, it poured even harder yesterday.", tr: "Yağmur durmadı; tam tersine dün daha da şiddetli yağdı." },
        { tense: "Present Perfect", en: "Inflation has not declined; on the contrary, it has accelerated recently.", tr: "Enflasyon düşmemiştir; tam tersine son zamanlarda hızlanmıştır." },
        { tense: "Future Simple", en: "Demand will not decrease; on the contrary, it will double next year.", tr: "Talep azalmayacaktır; tam tersine gelecek yıl ikiye katlanacaktır." },
        { tense: "Modal / Passive", en: "She should not be dismissed; on the contrary, she ought to lead the team.", tr: "İşten çıkarılmamalıdır; tam tersine ekibe liderlik etmelidir." }
      ]
    },
    even_so: {
      validPairs: [
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Hava soğuktu; öyle olsa bile dışarı çıktık." }
      ],
      ruleText: "EVEN SO: Öyle olsa bile / Yine de.",
      tenseExamples: [
        { tense: "Simple Past", en: "The trail was steep and muddy; even so, they reached the peak.", tr: "Patika dik ve çamurluydu; öyle olsa bile zirveye ulaştılar." },
        { tense: "Simple Present", en: "The task is challenging; even so, the team remains motivated.", tr: "Görev zorludur; öyle olsa bile ekip motivasyonunu koruyor." },
        { tense: "Present Perfect", en: "Costs have risen sharply; even so, sales have continued growing.", tr: "Maliyetler keskin bir şekilde artmıştır; öyle olsa bile satışlar büyümeye devam etmiştir." },
        { tense: "Future Simple", en: "Prices will increase; even so, customers will buy the new product.", tr: "Fiyatlar artacaktır; öyle olsa bile müşteriler yeni ürünü satın alacaktır." },
        { tense: "Modal / Passive", en: "Risks might be high; even so, we must proceed with caution.", tr: "Riskler yüksek olabilir; öyle olsa bile dikkatle ilerlemeliyiz." }
      ]
    },
    in_addition_moreover: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1"], trPattern: "Zekidir; üstelik çok disiplinlidir." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Raporu bitirdi; ayrıca sunumu da hazırladı." }
      ],
      ruleText: "IN ADDITION / MOREOVER / FURTHERMORE: Ekleme İfadesi.",
      tenseExamples: [
        { tense: "Simple Present", en: "The laptop is lightweight; moreover, its battery lasts twenty hours.", tr: "Dizüstü bilgisayar hafiftir; üstelik pili yirmi saat dayanır." },
        { tense: "Simple Past", en: "She passed the written exam; furthermore, she aced the interview yesterday.", tr: "Yazılı sınavı geçti; ayrıca dün mülakatta da harika bir performans sergiledi." },
        { tense: "Present Perfect", en: "The country has invested in education; in addition, it has modernized healthcare.", tr: "Ülke eğitime yatırım yapmıştır; ayrıca sağlık hizmetlerini modernleştirmiştir." },
        { tense: "Future Simple", en: "The metro line will cut commute time; moreover, it will reduce traffic pollution.", tr: "Metro hattı ulaşım süresini kısaltacak; üstelik trafik kirliliğini azaltacaktır." },
        { tense: "Modal / Passive", en: "We must protect nature; furthermore, we ought to educate future generations.", tr: "Doğayı korumalıyız; ayrıca gelecek nesilleri eğitmeliyiz." }
      ]
    },
    besides_what_is_more: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Ders anlatıyor; üstelik rehberlik de yapıyor." }
      ],
      ruleText: "BESIDES / WHAT IS MORE: Bunun yanı sıra / Üstelik.",
      tenseExamples: [
        { tense: "Simple Present", en: "He manages the software team; besides, he handles customer support.", tr: "Yazılım ekibini yönetiyor; bunun yanı sıra müşteri desteğiyle de ilgileniyor." },
        { tense: "Simple Past", en: "She wrote the proposal; what is more, she secured full funding yesterday.", tr: "Teklifi yazdı; üstelik dün tam fonlama sağladı." },
        { tense: "Present Perfect", en: "The firm has expanded locally; besides, it has opened overseas branches.", tr: "Firma yerelde büyümüştür; bunun yanı sıra denizaşırı şubeler açmıştır." },
        { tense: "Future Simple", en: "The new app will track habits; what is more, it will suggest tailored diets.", tr: "Yeni uygulama alışkanlıkları takip edecek; üstelik kişiye özel diyetler önerecektir." },
        { tense: "Modal / Passive", en: "We should optimize costs; besides, we must improve overall service quality.", tr: "Maliyetleri optimize etmeliyiz; bunun yanı sıra genel hizmet kalitesini artırmalıyız." }
      ]
    },
    likewise_similarly: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Fransa tedbir aldı; benzer şekilde Almanya da adımı attı." }
      ],
      ruleText: "LIKEWISE / SIMILARLY: Benzer şekilde.",
      tenseExamples: [
        { tense: "Simple Present", en: "France adopted green policies; similarly, Germany introduced clean energy incentives.", tr: "Fransa yeşil politikalar benimsedi; benzer şekilde Almanya da temiz enerji teşvikleri başlattı." },
        { tense: "Simple Past", en: "The first experiment failed; likewise, the second trial yielded inconclusive results yesterday.", tr: "İlk deney başarısız oldu; benzer şekilde dün ikinci deneme de sonuçsuz kaldı." },
        { tense: "Present Perfect", en: "Tech firms have adopted remote work; similarly, financial institutions have embraced flexibility.", tr: "Teknoloji firmaları uzaktan çalışmaya geçti; benzer şekilde finans kuruluşları da esnekliği benimsedi." },
        { tense: "Future Simple", en: "Airlines will raise ticket prices; likewise, train operators will adjust fares next season.", tr: "Havayolları bilet fiyatlarını artıracak; benzer şekilde tren işletmecileri de gelecek sezon ücretleri ayarlayacaktır." },
        { tense: "Modal / Passive", en: "Employees must comply with privacy rules; similarly, contractors should follow protocols.", tr: "Çalışanlar gizlilik kurallarına uymalıdır; benzer şekilde yükleniciler de protokollere uymalıdır." }
      ]
    },
    for_example_for_instance: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Birçok ülke katıldı; örneğin Türkiye delegasyon gönderdi." }
      ],
      ruleText: "FOR EXAMPLE / FOR INSTANCE: Örneklendırma İfadesi.",
      tenseExamples: [
        { tense: "Simple Present", en: "Many renewable energy sources exist; for example, solar and wind power are widely used.", tr: "Birçok yenilenebilir enerji kaynağı mevcuttur; örneğin güneş ve rüzgar enerjisi yaygın kullanılmaktadır." },
        { tense: "Simple Past", en: "Several cities faced severe weather; for instance, Phoenix hit record heat last summer.", tr: "Çeşitli şehirler olumsuz hava koşulları yaşadı; örneğin Phoenix geçen yaz rekor sıcaklığa ulaştı." },
        { tense: "Present Perfect", en: "Tech giants have launched green initiatives; for instance, Apple has reached carbon neutrality.", tr: "Teknoloji devleri yeşil girişimler başlattı; örneğin Apple karbon nötrlüğe ulaşmıştır." },
        { tense: "Future Simple", en: "Autonomous systems will handle dangerous tasks; for example, drones will inspect deep mines.", tr: "Otonom sistemler tehlikeli işleri yapacak; örneğin dronlar derin madenleri denetleyecektir." },
        { tense: "Modal / Passive", en: "Stress management can boost health; for instance, meditation can lower blood pressure.", tr: "Stres yönetimi sağlığı güçlendirebilir; örneğin meditasyon kan basıncını düşürebilir." }
      ]
    },
    in_other_words_that_is: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Sınavı geçti; diğer bir deyişle mezun oldu." }
      ],
      ruleText: "IN OTHER WORDS / THAT IS: Diğer bir deyişle.",
      tenseExamples: [
        { tense: "Simple Present", en: "The company operates at zero profit; in other words, it breaks even monthly.", tr: "Şirket sıfır karla çalışıyor; diğer bir deyişle her ay başabaş noktasına ulaşıyor." },
        { tense: "Simple Past", en: "He achieved top marks in all courses; that is to say, he graduated with honors yesterday.", tr: "Tüm derslerden en yüksek notları aldı; yani dün onur derecesiyle mezun oldu." },
        { tense: "Present Perfect", en: "The proposal has been accepted; in other words, funding has been officially guaranteed.", tr: "Teklif kabul edilmiştir; diğer bir deyişle fonlama resmi olarak garanti edilmiştir." },
        { tense: "Future Simple", en: "The team will work overtime; that is, the project will be delivered ahead of deadline.", tr: "Ekip mesaiye kalacak; yani proje teslim tarihinden önce teslim edilecektir." },
        { tense: "Modal / Passive", en: "Patients must fast before surgery; in other words, no food should be consumed after midnight.", tr: "Hastalar ameliyattan önce aç kalmalıdır; diğer bir deyişle gece yarısından sonra yemek tüketilmemelidir." }
      ]
    },
    otherwise: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_v1", "can_may_v1"], trPattern: "Acele etmeliyiz; aksi takdirde treni kaçıracağız." }
      ],
      ruleText: "OTHERWISE / OR ELSE: Aksi takdirde / Yoksa.",
      tenseExamples: [
        { tense: "Simple Present", en: "Hurry up; otherwise, we miss the morning train.", tr: "Acele et; aksi takdirde sabah trenini kaçırırız." },
        { tense: "Simple Past", en: "He submitted the document on time yesterday; otherwise, his entry would have been rejected.", tr: "Dün belgeyi zamanında teslim etti; aksi takdirde başvurusu reddedilmiş olacaktı." },
        { tense: "Present Perfect", en: "The team has reinforced security; otherwise, hackers could have breached the network.", tr: "Ekip güvenliği takviye etti; aksi takdirde hackerlar ağa sızmış olabilirdi." },
        { tense: "Future Simple", en: "You must renew your passport today; or else, you will not board the flight tomorrow.", tr: "Pasaportunu bugün yenilemelisin; yoksa yarın uçuşa binmene izin verilmeyecektir." },
        { tense: "Modal / Passive", en: "We should backup all data immediately; otherwise, critical files could be lost forever.", tr: "Tüm verileri derhal yedeklemeliyiz; aksi takdirde kritik dosyalar sonsuza dek kaybolabilir." }
      ]
    },
    if_type0_1: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["will_v1", "v1_main", "can_may_v1"], trPattern: "Eğer çok çalışırsa sınavı geçecek." }
      ],
      ruleText: "IF Type 0 & 1 (Gerçek / Olası Koşul): Yan cümle Simple Present (V1), Ana cümle Will + V1, Present Simple veya Modal (Can/May) olur.",
      tenseExamples: [
        { tense: "Simple Present (Type 0)", en: "If you heat ice, it melts into liquid water.", tr: "Buzu ısıtırsan sıvı suya dönüşür." },
        { tense: "Future Simple (Type 1)", en: "If she studies hard, she will pass the exam easily.", tr: "Sıkı çalışırsa sınavı kolayca geçecektir." },
        { tense: "Modal (Type 1)", en: "If rain continues, we can postpone the outdoor match.", tr: "Yağmur devam ederse açık hava maçını erteleyebiliriz." },
        { tense: "Imperative (Type 1)", en: "If you feel unwell, call the clinic immediately.", tr: "Kendini kötü hissedersen derhal kliniği ara." },
        { tense: "Passive (Type 1)", en: "If the contract is signed tomorrow, work will be initiated.", tr: "Sözleşme yarın imzalanırsa çalışmalara başlanacaktır." }
      ]
    },
    if_type2: {
      validPairs: [
        { clauseA: "v2_past", clauseB: ["would_v1"], trPattern: "Eğer çok çalışsaydı (şu an), sınavı geçerdi." }
      ],
      ruleText: "IF Type 2 (Şimdiki Zaman Hayali Koşul): Yan cümle Past Simple (V2), Ana cümle WOULD / COULD + V1 olur.",
      tenseExamples: [
        { tense: "Modal (Type 2)", en: "If I had more free time, I would learn a foreign language.", tr: "Daha fazla boş vaktim olsaydı yabancı bir dil öğrenirdim." },
        { tense: "Modal (Type 2)", en: "If she lived near the ocean, she could go surfing every day.", tr: "Okyanus yakınında yaşasaydı her gün sörf yapabilirdi." },
        { tense: "Passive (Type 2)", en: "If taxes were lowered, business investments would increase.", tr: "Vergiler düşürülseydi ticari yatırımlar artardı." },
        { tense: "Simple Past (Type 2)", en: "If he knew the password, he would log into the system now.", tr: "Şifreyi bilseydi şu an sisteme giriş yapardı." },
        { tense: "Modal (Type 2)", en: "If we were in charge, we might restructure the department.", tr: "Yetkili biz olsaydık departmanı yeniden yapılandırabilirdik." }
      ]
    },
    if_type3: {
      validPairs: [
        { clauseA: "had_v3", clauseB: ["would_have_v3"], trPattern: "Eğer (geçmişte) çok çalışmış olsaydı, sınavı geçmiş olacaktı." }
      ],
      ruleText: "IF Type 3 (Geçmiş Zamanda Kaçırılmış Koşul / Pişmanlık): Yan cümle HAD + V3 (Past Perfect), Ana cümle WOULD / COULD + HAVE V3 gerektirir!",
      tenseExamples: [
        { tense: "Past Perfect (Type 3)", en: "If he had studied thoroughly, he would have passed the exam last week.", tr: "Dersine iyice çalışmış olsaydı geçen hafta sınavı geçmiş olacaktı." },
        { tense: "Modal Have V3", en: "If we had left earlier, we could have caught the morning train.", tr: "Daha erken çıkmış olsaydık sabah trenine yetişebilirdik." },
        { tense: "Passive Have V3", en: "If the alert had been issued, lives would have been saved.", tr: "Uyarı verilmiş olsaydı hayatlar kurtarılmış olacaktı." },
        { tense: "Past Perfect (Type 3)", en: "If she had accepted the job offer, she would have moved to Paris.", tr: "İş teklifini kabul etmiş olsaydı Paris'e taşınmış olacaktı." },
        { tense: "Modal Have V3", en: "If they had checked the map, they might not have gotten lost.", tr: "Haritayı kontrol etmiş olsalardı kaybolmamış olabilirlerdi." }
      ]
    },
    since: {
      validPairs: [
        { clauseA: "v2_past", clauseB: ["has_v3_main"], trPattern: "O buraya taşındığından beri büyük başarılar elde etti." }
      ],
      isTenseException: true,
      ruleText: "⚠️ <strong>ZAMAN UYUMSUZLUĞU İSTİSNASI (TENSE EXCEPTION):</strong> 'SINCE' bağlacı genel 'Past-Past / Present-Present' zaman uyumu kuralını tek başına bozar! Yan cümlesine Past Simple (V2), Ana cümlesine ise Present Perfect (Has/Have V3) zorunlu kılar.",
      tenseExamples: [
        { tense: "Present Perfect", en: "She has lived in London since she graduated from university in 2015.", tr: "2015'te üniversiteden mezun olduğundan beri Londra'da yaşamaktadır." },
        { tense: "Past Perfect", en: "He had worked at the firm since its foundation before he retired.", tr: "Emekli olmadan önce, kurulduğundan beri şirkette çalışmıştı." },
        { tense: "Present Perfect Cont.", en: "Global temperatures have been rising ever since the industrial era began.", tr: "Sanayi çağı başladığından beri küresel sıcaklıklar yükselmektedir." },
        { tense: "Future Context", en: "Since we have already secured funding, we will launch the product next month.", tr: "Zaten fon sağladığımız için önümüzdeki ay ürünü piyasaya süreceğiz." },
        { tense: "Modal / Passive", en: "Since all tasks have been completed, you may leave early today.", tr: "Tüm görevler tamamlandığına göre bugün erken çıkabilirsin." }
      ]
    },
    although: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1", "can_may_v1"], trPattern: "Çok çalışmasına rağmen sınavda zorlanıyor." },
        { clauseA: "v2_past", clauseB: ["v2_main", "would_v1"], trPattern: "Çok çalışmasına rağmen sınavı geçemedi." }
      ],
      ruleText: "ALTHOUGH (Zıtlık Bağlacı): Yan cümle ile ana cümle tense uyumu içerisinde olmalıdır (Past ➔ Past, Present ➔ Present).",
      tenseExamples: [
        { tense: "Simple Present", en: "Although electric cars are quiet, they require frequent charging stops.", tr: "Elektrikli arabalar sessiz olmasına rağmen sık şarj molaları gerektirir." },
        { tense: "Simple Past", en: "Even though he studied thoroughly, he found the exam difficult yesterday.", tr: "Dersine iyice çalışmış olmasına rağmen dün sınavı zor buldu." },
        { tense: "Present Perfect", en: "Although pollution levels have dropped, marine life is still under threat.", tr: "Kirlilik seviyeleri düşmüş olmasına rağmen deniz yaşamı hala tehdit altındadır." },
        { tense: "Future Simple", en: "Even though costs will rise next year, we will maintain product quality.", tr: "Gelecek yıl maliyetler artacak olsa bile ürün kalitesini koruyacağız." },
        { tense: "Modal / Passive", en: "Though it may sound complex, the system can be mastered easily.", tr: "Karmaşık görünebilecek olsa da sistemde kolayca uzmanlaşılabilir." }
      ]
    },
    because: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main", "will_v1", "can_may_v1"], trPattern: "Çok çalıştığı için sınavı geçecek." },
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Çok çalıştığı için sınavı geçti." },
        { clauseA: "had_v3", clauseB: ["v2_main"], trPattern: "Önceden çok çalışmış olduğu için sınavı geçti." }
      ],
      ruleText: "BECAUSE (Sebep Bağlacı): Mantıksal zaman sırasına uyan tenseler birbiriyle eşleşir.",
      tenseExamples: [
        { tense: "Simple Present", en: "The method is effective because it saves significant routine time.", tr: "Sistem etkilidir çünkü rutin zaman tasarrufu sağlar." },
        { tense: "Simple Past", en: "Since the project was urgent, the team worked overnight yesterday.", tr: "Proje acil olduğu için ekip dün gece boyunca çalıştı." },
        { tense: "Present Perfect", en: "Seeing that prices have escalated, consumers have sought cheaper alternatives.", tr: "Fiyatlar tırmandığı için tüketiciler daha ucuz alternatifler aramıştır." },
        { tense: "Future Simple", en: "Production will slow down because raw material supplies will dwindle.", tr: "Hammadde kaynakları azalacağı için üretim yavaşlayacaktır." },
        { tense: "Modal / Passive", en: "We must recycle materials because natural resources could be depleted soon.", tr: "Doğal kaynaklar yakında tükenebileceği için malzemeleri geri dönüştürmeliyiz." }
      ]
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
      ruleText: "ACCORDINGLY (Geçiş İfadesi): Buna bağlı olarak / Bu doğrultuda.",
      tenseExamples: [
        { tense: "Simple Present", en: "Budget limits are clear; accordingly, we allocate funds carefully.", tr: "Bütçe sınırları nettir; buna bağlı olarak fonları dikkatle tahsis ederiz." },
        { tense: "Simple Past", en: "Regulations changed yesterday; accordingly, the board updated company policies.", tr: "Düzenlemeler dün değişti; buna bağlı olarak yönetim kurulu şirket politikalarını güncelledi." },
        { tense: "Present Perfect", en: "Demand has surged; accordingly, production capacity has been expanded.", tr: "Talep tırmanmıştır; buna bağlı olarak üretim kapasitesi genişletilmiştir." },
        { tense: "Future Simple", en: "Costs will rise next quarter; accordingly, we will adjust pricing plans.", tr: "Gelecek çeyrekte maliyetler artacaktır; buna bağlı olarak fiyatlandırma planlarını ayarlayacağız." },
        { tense: "Modal / Passive", en: "Risks may increase; accordingly, precautionary measures must be taken.", tr: "Riskler artabilir; buna bağlı olarak önleyici tedbirler alınmalıdır." }
      ]
    },

    unless: {
      ruleText: "UNLESS (-medikçe): Yan cümleye 'will' gelemez!",
      tenseExamples: [
        { tense: "Simple Present", en: "Unless carbon emissions decrease, global warming poses a severe threat.", tr: "Karbon emisyonları azalmadıkça küresel ısınma vahim bir tehdit oluşturur." },
        { tense: "Simple Past", en: "Unless the team cooperated yesterday, the project was bound to fail.", tr: "Ekip dün iş birliği yapmadıkça projenin başarısız olması kaçınılmazdı." },
        { tense: "Present Perfect", en: "Unless technology has advanced, remote work has remained sluggish.", tr: "Teknoloji gelişmedikçe uzaktan çalışma ağır kalmıştır." },
        { tense: "Future Simple", en: "Unless you submit the form tomorrow, your application will be cancelled.", tr: "Formu yarın teslim etmediğiniz sürece başvurunuz iptal edilecektir." },
        { tense: "Modal / Passive", en: "Unless safety protocols are obeyed, workplace accidents cannot be avoided.", tr: "Güvenlik protokollerine uyulmadıkça iş yeri kazaları önlenemez." }
      ]
    },
    provided_that: {
      ruleText: "PROVIDED THAT / PROVIDING THAT (-mesi şartıyla)",
      tenseExamples: [
        { tense: "Simple Present", en: "The permit is granted provided that safety criteria are fully met.", tr: "Güvenlik kriterleri tam karşılanması şartıyla ruhsat verilir." },
        { tense: "Simple Past", en: "They signed the agreement yesterday providing that funding was secured.", tr: "Fonlama garanti edilmesi şartıyla dün anlaşmayı imzaladılar." },
        { tense: "Present Perfect", en: "Revenue has grown provided that product quality has been maintained.", tr: "Ürün kalitesi korunduğu sürece/şartıyla gelir büyümüştür." },
        { tense: "Future Simple", en: "We will launch the platform tomorrow provided that final tests succeed.", tr: "Son testler başarılı olması şartıyla yarın platformu piyasaya süreceğiz." },
        { tense: "Modal / Passive", en: "Access should be authorized provided that credentials can be verified.", tr: "Kimlik bilgileri doğrulanabilmesi şartıyla erişim yetkilendirilmelidir." }
      ]
    },
    in_case: {
      ruleText: "IN CASE / FOR FEAR THAT / LEST (ihtimaline karşı)",
      tenseExamples: [
        { tense: "Simple Present", en: "He carries a power bank in case his mobile battery runs out.", tr: "Telefonunun şarjı biter tedbiriyle yanında yedek batarya taşır." },
        { tense: "Simple Past", en: "She brought an umbrella yesterday in case it rained heavily.", tr: "Şiddetli yağmur yağar ihtimaline karşı dün şemsiye getirdi." },
        { tense: "Present Perfect", en: "The firm has backed up critical files in case servers have failed.", tr: "Sunucular çökebilir ihtimaline karşı firma kritik dosyaları yedeklemiştir." },
        { tense: "Future Simple", en: "We will arrange extra seating tomorrow in case additional guests arrive.", tr: "Ekstra konuklar gelebilir ihtimaline karşı yarın ilave koltuk ayarlayacağız." },
        { tense: "Modal / Passive", en: "Alarm systems must be tested in case a fire should break out.", tr: "Yangın çıkabilir ihtimaline karşı alarm sistemleri test edilmelidir." }
      ]
    },
    so_that_purpose: {
      ruleText: "SO THAT / IN ORDER THAT (-sın diye / amacıyla)",
      tenseExamples: [
        { tense: "Simple Present", en: "He studies diligently so that he can pass the YDS exam with honors.", tr: "YDS sınavını dereceyle geçebilsin diye titizlikle çalışır." },
        { tense: "Simple Past", en: "They installed solar panels yesterday so that energy costs would drop.", tr: "Enerji maliyetleri düşsün diye dün güneş panelleri kurdular." },
        { tense: "Present Perfect", en: "Engineers have upgraded the network so that speeds have doubled.", tr: "Hızlar ikiye katlansın diye mühendisler ağı yükseltmiştir." },
        { tense: "Future Simple", en: "The city will build bypasses so that traffic will flow smoothly tomorrow.", tr: "Trafik yarın pürüzsüz aksın diye şehir çevre yolları inşa edecektir." },
        { tense: "Modal / Passive", en: "All data must be encrypted so that unauthorized access can be prevented.", tr: "Yetkisiz erişim önlenebilsin diye tüm veriler şifrelenmelidir." }
      ]
    },
    in_order_that: {
      ruleText: "IN ORDER THAT (Resmi Amaç)",
      tenseExamples: [
        { tense: "Simple Present", en: "The law was modified in order that public safety can be preserved.", tr: "Kamu güvenliği korunabilsin diye yasa tadil edilmektedir." },
        { tense: "Simple Past", en: "He explained the rules yesterday in order that everyone could comply.", tr: "Herkes uyabilsin diye dün kuralları açıkladı." },
        { tense: "Present Perfect", en: "The team has simplified workflows in order that productivity has improved.", tr: "Verimlilik artsın diye ekip iş akışlarını basitleştirmiştir." },
        { tense: "Future Simple", en: "The council will approve funds in order that schools will be renovated.", tr: "Okullar yenilensin diye konsey fonları onaylayacaktır." },
        { tense: "Modal / Passive", en: "Precautions should be taken in order that errors may be minimized.", tr: "Hatalar en aza indirilebilsin diye tedbirler alınmalıdır." }
      ]
    },
    having_v3: {
      ruleText: "HAVING + V3 / HAVING BEEN + V3 (Kısaltma Yapısı)",
      tenseExamples: [
        { tense: "Simple Present", en: "Having finished the report, the researcher feels confident about findings.", tr: "Raporu bitirdikten sonra araştırmacı bulgular konusunda kendinden emin hisseder." },
        { tense: "Simple Past", en: "Having analyzed the data yesterday, the team published the final study.", tr: "Dün verileri analiz ettikten sonra ekip nihai çalışmayı yayımladı." },
        { tense: "Present Perfect", en: "Having passed rigorous safety tests, the new vaccine has received approval.", tr: "Titiz güvenlik testlerini geçtikten sonra yeni aşı onay almıştır." },
        { tense: "Future Simple", en: "Having completed her training next month, she will lead the department.", tr: "Gelecek ay eğitimini tamamladıktan sonra departmana liderlik edecektir." },
        { tense: "Modal / Passive", en: "Having been tested thoroughly, the equipment can be safely deployed.", tr: "Etraflıca test edildikten sonra ekipman güvenle konuşlandırılabilir." }
      ]
    },
    all_in_all: {
      ruleText: "ALL IN ALL / IN SUMMARY / IN SHORT / OVERALL (Özet)",
      tenseExamples: [
        { tense: "Simple Present", en: "All in all, the strategy yields impressive long-term benefits.", tr: "Genel olarak bakıldığında strateji etkileyici uzun vadeli faydalar sağlar." },
        { tense: "Simple Past", en: "In summary, the expedition achieved all its research goals yesterday.", tr: "Özetle keşif ekibi dün tüm araştırma hedeflerine ulaştı." },
        { tense: "Present Perfect", en: "In short, the economic policy has boosted national productivity.", tr: "Kısacası ekonomik politika ulusal verimliliği canlandırmıştır." },
        { tense: "Future Simple", en: "Overall, the new subway line will transform urban transit next year.", tr: "Genel olarak yeni metro hattı gelecek yıl şehir ulaşımını dönüştürecektir." },
        { tense: "Modal / Passive", en: "All in all, environmental regulations must be strictly enforced.", tr: "Genel olarak bakıldığında çevre düzenlemeleri titizlikle uygulanmalıdır." }
      ]
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
    as_if_as_though: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v2_main"], trPattern: "Sanki sınavı geçmiş gibi davranıyor." },
        { clauseA: "v2_past", clauseB: ["had_v3_main"], trPattern: "Sanki sınavı geçmiş gibi davrandı." }
      ],
      ruleText: "AS IF / AS THOUGH (Sanki): Gerçek dışı durum için zaman bir derece geçmişe kayar. Present durumda → Past Simple; Past durumda → Past Perfect.",
      tenseExamples: [
        { tense: "Simple Present", en: "He talks about quantum mechanics as if he were a leading physicist.", tr: "Kuantum mekaniği hakkında sanki önde gelen bir fizikçiymiş gibi konuşur." },
        { tense: "Simple Past", en: "She looked at me yesterday as though she had seen a ghost.", tr: "Dün bana sanki bir hayalet görmüş gibi baktı." },
        { tense: "Present Perfect", en: "The market has reacted as if a major financial crisis hit today.", tr: "Piyasa bugün sanki büyük bir finansal kriz vurmuş gibi tepki vermiştir." },
        { tense: "Future Simple", en: "They will act as though nothing happened when the manager arrives.", tr: "Müdür geldiğinde sanki hiçbir şey olmamış gibi davranacaklar." },
        { tense: "Modal / Passive", en: "The patient should be treated as if the infection were highly contagious.", tr: "Hastaya enfeksiyon sanki son derece bulaşıcıymış gibi muamele edilmelidir." }
      ]
    },
    its_time: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v2_main"], trPattern: "Artık sınavı geçme zamanı geldi de geçiyor." }
      ],
      ruleText: "IT'S (HIGH) TIME + Özne: Devamında Past Simple kullanılır! 'It's time we left.' Gerçek zaman Present olsa bile yapı Past Simple gerektirir.",
      tenseExamples: [
        { tense: "Simple Present", en: "It is high time we updated our server infrastructure.", tr: "Sunucu altyapımızı güncellememizin zamanı geldi de geçiyor." },
        { tense: "Simple Past", en: "It was time the government took decisive action against climate change.", tr: "Hükümetin iklim değişikliğine karşı kararlı adımlar atma zamanı gelmişti." },
        { tense: "Present Perfect", en: "It has been high time the committee addressed these ongoing flaws.", tr: "Komitenin bu devam eden kusurları ele alma zamanı çoktan gelmiş bulunmaktadır." },
        { tense: "Future Simple", en: "By next month, it will be high time the brand launched its line.", tr: "Gelecek aya kadar markanın yeni serisini çıkarma zamanı gelmiş olacaktır." },
        { tense: "Modal / Passive", en: "It should be time that strict regulations were enacted nationwide.", tr: "Ülke çapında katı düzenlemelerin yürürlüğe girme zamanı gelmiş olmalıdır." }
      ]
    },
    would_rather: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v2_main"], trPattern: "Sınavı geçmesini tercih ederdim." },
        { clauseA: "v2_past", clauseB: ["had_v3_main"], trPattern: "Sınavı geçmiş olmasını tercih ederdim." }
      ],
      ruleText: "WOULD RATHER / WOULD SOONER + Özne: Şu an/Gelecek için → Past Simple; Geçmiş için → Past Perfect. Zaman bir derece geçmişe kayar!",
      tenseExamples: [
        { tense: "Simple Present", en: "I would rather you stayed at home during the storm.", tr: "Fırtına sırasında evde kalmanı tercih ederdim/isterim." },
        { tense: "Simple Past", en: "She would rather he had called her before making that decision yesterday.", tr: "Dün o kararı almadan önce onu aramış olmasını tercih ederdi." },
        { tense: "Present Perfect", en: "They would rather we had finalized the report by now.", tr: "Raporu şu ana kadar netleştirmiş olmamızı tercih ederlerdi." },
        { tense: "Future Simple", en: "We would rather the team traveled by train tomorrow.", tr: "Ekibin yarın trenle seyahat etmesini tercih ederiz." },
        { tense: "Modal / Passive", en: "The board would rather the contract were reviewed by legal experts.", tr: "Yönetim kurulu sözleşmenin hukuk uzmanlarınca incelenmesini tercih eder." }
      ]
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
        { clauseA: "v2_past", clauseB: ["v2_main"], trPattern: "Ders çalıştı fakat sınavı geçti." }
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
      ruleText: "WHILE / WHEREAS: Doğrudan zıtlık ve karşılaştırma bildirir.",
      tenseExamples: [
        { tense: "Simple Present", en: "Gold is a traditional safe asset, whereas crypto assets fluctuate wildly.", tr: "Altın geleneksel bir güvenli limanken, kripto varlıklar vahşice dalgalanır." },
        { tense: "Simple Past", en: "Tom preferred indoor study yesterday, whereas Jack opted for outdoor sports.", tr: "Dün Tom kapalı alanda çalışmayı tercih ederken Jack açık hava sporlarını seçti." },
        { tense: "Present Perfect", en: "Online sales have doubled, while physical store visits have declined.", tr: "Çevrimiçi satışlar ikiye katlanmışken, fiziksel mağaza ziyaretleri azalmıştır." },
        { tense: "Future Simple", en: "Developed nations will invest in AI, whereas developing ones will focus on basic infrastructure.", tr: "Gelişmiş uluslar yapay zekaya yatırım yapacakken, gelişmekte olanlar temel altyapıya odaklanacaktır." },
        { tense: "Modal / Passive", en: "Manual calculations can contain errors, whereas automated systems ensure precision.", tr: "Manuel hesaplamalar hata içerebilecekken, otomatik sistemler yüksek hassasiyet sağlar." }
      ]
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
      ruleText: "DESPITE / IN SPITE OF: İsim veya V-ing alarak zıtlık bildirir.",
      tenseExamples: [
        { tense: "Simple Present", en: "Despite the high price, smartphones sell rapidly worldwide.", tr: "Yüksek fiyatına rağmen akıllı telefonlar dünya çapında hızla satılıyor." },
        { tense: "Simple Past", en: "In spite of heavy rain, the outdoor match proceeded as planned yesterday.", tr: "Şiddetli yağmura rağmen dün açık hava maçı planlandığı gibi devam etti." },
        { tense: "Present Perfect", en: "Despite recent economic turbulence, the company has expanded its portfolio.", tr: "Son ekonomik çalkantılara rağmen şirket portföyünü genişletti." },
        { tense: "Future Simple", en: "In spite of upcoming market challenges, our brand will thrive.", tr: "Yaklaşan piyasa zorluklarına rağmen markamız gelişecektir." },
        { tense: "Modal / Passive", en: "Despite potential obstacles, we should persist in our diplomatic efforts.", tr: "Potansiyel engellere rağmen diplomatik çabalarımızda ısrarcı olmalıyız." }
      ]
    },
    in_order_to: {
      validPairs: [
        { clauseA: "v_ing_obj", clauseB: ["v2_main", "v1_main", "will_v1"], trPattern: "Başarmak için çalıştı." }
      ],
      ruleText: "IN ORDER TO / SO AS TO: Yalın fiil / V-ing ile amaç bildirir.",
      tenseExamples: [
        { tense: "Simple Present", en: "He exercises daily in order to stay healthy and fit.", tr: "Sağlıklı ve zinde kalmak için her gün egzersiz yapar." },
        { tense: "Simple Past", en: "The firm reduced prices yesterday in order to attract new clients.", tr: "Firma dün yeni müşteriler çekmek için fiyatları düşürdü." },
        { tense: "Present Perfect", en: "Scientists have developed new algorithms in order to accelerate research.", tr: "Bilim insanları araştırmayı hızlandırmak için yeni algoritmalar geliştirdi." },
        { tense: "Future Simple", en: "The city will build new bypass roads in order to alleviate traffic jams.", tr: "Şehir trafik sıkışıklığını hafifletmek için yeni çevre yolları inşa edecektir." },
        { tense: "Modal / Passive", en: "All data must be encrypted in order to prevent unauthorized breaches.", tr: "Yetkisiz ihlalleri önlemek için tüm veriler şifrelenmelidir." }
      ]
    },
    in_addition_to_prep: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "v1_main"], trPattern: "Buna ek olarak yeni adımlar atıldı." }
      ],
      ruleText: "IN ADDITION TO / ALONG WITH: İsim öbeği alarak ekleme yapar.",
      tenseExamples: [
        { tense: "Simple Present", en: "In addition to Spanish, she speaks French and Italian.", tr: "İspanyolcaya ek olarak Fransızca ve İtalyanca konuşuyor." },
        { tense: "Simple Past", en: "Along with the main proposal, the team submitted budget charts yesterday.", tr: "Ana teklifle birlikte ekip dün bütçe grafiklerini de sundu." },
        { tense: "Present Perfect", en: "In addition to expanding locally, the startup has secured global clients.", tr: "Yerelde büyümeye ek olarak girişim küresel müşteriler de edinmiştir." },
        { tense: "Future Simple", en: "Along with new software, users will receive free technical support.", tr: "Yeni yazılımla birlikte kullanıcılar ücretsiz teknik destek alacaktır." },
        { tense: "Modal / Passive", en: "In addition to core subjects, elective courses should be offered.", tr: "Temel derslere ek olarak seçmeli dersler de sunulmalıdır." }
      ]
    },
    regarding_as_for: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "v1_main"], trPattern: "Bu konuya gelince adımlar atıldı." }
      ],
      ruleText: "REGARDING / WITH REGARD TO / AS FOR: İsim alarak husus bildirir.",
      tenseExamples: [
        { tense: "Simple Present", en: "She manages all inquiries with respect to data privacy.", tr: "Veri gizliliğine ilişkin tüm sorularla o ilgilenir." },
        { tense: "Simple Past", en: "The board issued a statement yesterday regarding the merger.", tr: "Yönetim kurulu dün birleşmeye ilişkin resmi bir açıklama yaptı." },
        { tense: "Present Perfect", en: "Researchers have gathered important findings regarding marine life.", tr: "Araştırmacılar deniz yaşamına ilişkin önemli bulgular toplamıştır." },
        { tense: "Future Simple", en: "The ministry will release new guidelines next month with regard to exports.", tr: "Bakanlık gelecek ay ihracata ilişkin yeni kılavuzlar yayımlayacaktır." },
        { tense: "Modal / Passive", en: "Detailed reports should be submitted regarding safety protocols.", tr: "Güvenlik protokollerine ilişkin detaylı raporlar sunulmalıdır." }
      ]
    },
    in_terms_of_in_light_of: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "v1_main"], trPattern: "Açısından değerlendirildi." }
      ],
      ruleText: "IN TERMS OF / IN LIGHT OF: İsim alarak bakış açısı bildirir.",
      tenseExamples: [
        { tense: "Simple Present", en: "The policy is effective in terms of cost reduction.", tr: "Politika maliyet düşürme açısından etkilidir." },
        { tense: "Simple Past", en: "In light of recent evidence, the judge dismissed the case yesterday.", tr: "Son delillerin ışığında yargıç dün davayı düşürdü." },
        { tense: "Present Perfect", en: "The economy has grown significantly in terms of gross output.", tr: "Ekonomi brüt üretim açısından belirgin şekilde büyümüştür." },
        { tense: "Future Simple", en: "In light of new findings, the lab will revise its hypothesis next week.", tr: "Yeni bulguların ışığında laboratuvar gelecek hafta hipotezini gözden geçirecektir." },
        { tense: "Modal / Passive", en: "Projects must be evaluated in terms of long-term sustainability.", tr: "Projeler uzun vadeli sürdürülebilirlik açısından değerlendirilmelidir." }
      ]
    },
    compared_to: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "v1_main"], trPattern: "Geçen yıla kıyasla başarılı oldu." }
      ],
      ruleText: "COMPARED TO: Kıyaslama bildirir.",
      tenseExamples: [
        { tense: "Simple Present", en: "Electric motors are efficient compared to conventional engines.", tr: "Elektrik motorları geleneksel motorlara kıyasla verimlidir." },
        { tense: "Simple Past", en: "Sales surged last quarter compared to the previous year.", tr: "Satışlar geçen yılın aynı dönemine kıyasla geçen çeyrekte tırmandı." },
        { tense: "Present Perfect", en: "Pollution levels have dropped compared to last decade.", tr: "Kirlilik seviyeleri son on yıla kıyasla düşmüştür." },
        { tense: "Future Simple", en: "Traffic will decrease next month compared to current peak levels.", tr: "Trafik mevcut yoğun seviyelere kıyasla gelecek ay azalacaktır." },
        { tense: "Modal / Passive", en: "Manual effort can be minimized compared to traditional methods.", tr: "Geleneksel yöntemlere kıyasla manuel çaba en aza indirilebilir." }
      ]
    },
    except_for_apart_from: {
      validPairs: [
        { clauseA: "noun_phrase", clauseB: ["v2_main", "v1_main"], trPattern: "Bu durum haricinde sorun yok." }
      ],
      ruleText: "EXCEPT FOR / APART FROM / BARRING: İstisna bildirir.",
      tenseExamples: [
        { tense: "Simple Present", en: "Apart from English, she speaks French and German fluently.", tr: "İngilizce haricinde akıcı şekilde Fransızca ve Almanca konuşuyor." },
        { tense: "Simple Past", en: "Except for one minor bug, the software functioned flawlessly yesterday.", tr: "Küçük bir hata dışında yazılım dün kusursuz çalıştı." },
        { tense: "Present Perfect", en: "Barring minor flaws, the team has achieved all strategic goals.", tr: "Küçük kusurlar dışında ekip tüm stratejik hedeflere ulaşmıştır." },
        { tense: "Future Simple", en: "Aside from scheduled maintenance tomorrow, the facility will operate non-stop.", tr: "Yarınki planlı bakım dışında tesis aralıksız çalışacaktır." },
        { tense: "Modal / Passive", en: "Except for authorized personnel, no one should enter the lab.", tr: "Yetkili personel dışında kimse laboratuvara girmemelidir." }
      ]
    },

    // ═══ 4. EK TRANSITIONS ═══
    namely: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Yani başarmak demektir." }
      ],
      ruleText: "NAMELY: Açıklama geçişidir.",
      tenseExamples: [
        { tense: "Simple Present", en: "We focus on two primary goals, namely quality and customer satisfaction.", tr: "İki temel hedefe odaklanıyoruz, yani kalite ve müşteri memnuniyeti." },
        { tense: "Simple Past", en: "The team hired two specialists yesterday, namely a developer and a designer.", tr: "Ekip dün iki uzman işe aldı, yani bir yazılımcı ve bir tasarımcı." },
        { tense: "Present Perfect", en: "The company has expanded into key markets, namely Asia and Europe.", tr: "Şirket kilit pazarlara genişlemiştir, yani Asya ve Avrupa." },
        { tense: "Future Simple", en: "The project will upgrade major components, namely the database and UI.", tr: "Proje ana bileşenleri yükseltecek, yani veri tabanı ve arayüz." },
        { tense: "Modal / Passive", en: "Core values, namely integrity and transparency, must be upheld.", tr: "Temel değerler, yani dürüstlük ve şeffaflık korunmalıdır." }
      ]
    },
    in_fact_indeed: {
      validPairs: [
        { clauseA: "v1_present", clauseB: ["v1_main"], trPattern: "Aslında çok başarılıdır." }
      ],
      ruleText: "IN FACT / INDEED: Vurgu geçişidir.",
      tenseExamples: [
        { tense: "Simple Present", en: "The system is not slow; in fact, it performs faster than rival apps.", tr: "Sistem yavaş değildir; aslında rakip uygulamalardan daha hızlı çalışır." },
        { tense: "Simple Past", en: "The storm was not mild; indeed, it caused widespread blackouts yesterday.", tr: "Fırtına hafif değildi; nitekim dün yaygın elektrik kesintilerine yol açtı." },
        { tense: "Present Perfect", en: "The policy has not failed; in fact, revenue has doubled this year.", tr: "Politika başarısız olmadı; aslında gelir bu yıl ikiye katlandı." },
        { tense: "Future Simple", en: "Automation will not reduce jobs; indeed, it will create new specialized roles.", tr: "Otomasyon işleri azaltmayacaktır; nitekim yeni uzmanlık rolleri yaratacaktır." },
        { tense: "Modal / Passive", en: "The proposal should not be discarded; in fact, it must be approved quickly.", tr: "Teklif rafa kaldırılmamalıdır; aslında hızlıca onaylanmalıdır." }
      ]
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
    always_continuous: "She is always {B_ing_clean}.",
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
    when: "{A_TR}-dığında, {B_TR}.",
    while_as: "{A_TR}-eyken, {B_TR}.",
    before: "{A_TR}-meden önce, {B_TR}.",
    after: "{A_TR}-dikten sonra, {B_TR}.",
    as_soon_as: "{A_TR} an, {B_TR}.",
    until_till: "{A_TR}-e kadar, {B_TR}.",
    by_the_time: "{A_TR} zamana kadar, {B_TR}.",
    since: "{A_TR}-den beri, {B_TR}.",
    by_time_anchor: "{A_TR}, {B_TR}.",
    so_far: "Şu ana kadar, {B_TR}.",
    whenever: "Ne zaman {A_TR}, {B_TR}.",
    the_moment: "{A_TR} an, {B_TR}.",

    // Koşul
    if_type0_1: "Eğer {A_TR}-se, {B_TR}.",
    if_type2: "Eğer {A_TR}-se, {B_TR}.",
    if_type3: "Eğer {A_TR}-se, {B_TR}.",
    unless: "{A_TR} olmadıkça, {B_TR}.",
    provided_that: "{A_TR} şartıyla, {B_TR}.",
    as_long_as: "{A_TR} sürece, {B_TR}.",
    in_case: "{A_TR} ihtimaline karşı, {B_TR}.",
    supposing_that: "Varsayalım ki {A_TR}, {B_TR}.",
    only_if: "Ancak {A_TR}-se, {B_TR}.",
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
    produce_produces: "{A_TR}, {B_TR} durumunu meydana getirir.",
    induce_provoke_prompt: "{A_TR}, {B_TR} durumunu tetikler.",
    result_in: "{A_TR}, {B_TR} ile sonuçlanır.",
    trigger_triggers: "{A_TR}, {B_TR} durumunu tetikler.",
    give_rise_to: "{A_TR}, {B_TR} durumunu ortaya çıkarır.",
    contribute_to: "{A_TR}, {B_TR} durumuna katkıda bulunur.",
    pave_the_way_for: "{A_TR}, {B_TR} durumuna zemin hazırlar.",
    culminate_in: "{A_TR}, {B_TR} durumuyla zirveye ulaşır.",

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
    always_continuous: "O, sürekli {B_TR} duruyor.",
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
    selectedCategory: "all", // Varsayılan olarak tüm bağlaçlar gösterilsin
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

    // Category Filter Buttons (Delegated)
    const catContainer = document.getElementById("srobot-category-filters");
    if (catContainer) {
      catContainer.onclick = function (e) {
        const btn = e.target.closest(".srobot-cat-btn");
        if (!btn) return;

        state.selectedCategory = btn.dataset.cat || "all";
        state.isConnectorsCollapsed = false;
        updateCategoryButtons();
        renderPalette();
        updateUI();
      };
    }

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
        state.isConnectorsCollapsed = false; // Do not hide other connectors!
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
    let curatedExample = null;

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
              // Some rules (e.g. "when") have more than one valid clauseB per
              // clauseA, each needing its own Turkish translation — use
              // trPatternMap[clauseB] when present instead of the single
              // flat trPattern, which was showing the same Turkish sentence
              // for every clauseB choice regardless of meaning.
              sentenceTRText = (matchingPair.trPatternMap && matchingPair.trPatternMap[state.selectedClauseB])
                || matchingPair.trPattern;
              // Hand-curated example sentences (tenseExamples) are linked to
              // validPairs via an identical Turkish sentence — use the matching
              // curated English sentence instead of stitching raw clause samples,
              // which produces ungrammatical run-ons (e.g. "She studied hard
              // triggers she passed the exam.").
              if (rule.tenseExamples) {
                curatedExample = rule.tenseExamples.find(ex => ex.tr === sentenceTRText) || null;
              }
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
      if (curatedExample) {
        // A hand-curated, grammatically correct example exists for this exact
        // valid combination — use it for English instead of stitching raw
        // clause samples, which produces ungrammatical run-ons.
        sentenceENText = '"' + curatedExample.en + '"';
      } else {
        const templateEN = SENTENCE_TEMPLATES[state.selectedConnector];
        if (templateEN) {
          let sA = clauseAObj.sample;
          let sB = clauseBObj.sample;
          let sB_ing_clean = sB.replace(/^(she|he|it|they|we|you|I)\s+(is|are|am)\s+/i, "");
          let resultEN = templateEN
            .replace("{A_INV}", invertHadV3(sA))
            .replace("{A}", sA)
            .replace("{B_ing_clean}", sB_ing_clean)
            .replace("{B}", sB);
          resultEN = resultEN.charAt(0).toUpperCase() + resultEN.slice(1);
          sentenceENText = '"' + resultEN + '"';
        } else {
          let connWord = connObj.label.split(" / ")[0];
          connWord = connWord.charAt(0) + connWord.slice(1).toLowerCase();
          sentenceENText = '"' + connWord + " " + clauseAObj.sample + ", " + clauseBObj.sample + '."';
        }
      }

      if (isValidCombination) {
        // sentenceTRText already holds the curated matchingPair.trPattern —
        // keep it instead of overwriting with the generic clause-stitching
        // template below, which was producing disconnected, ungrammatical
        // Turkish translations for otherwise valid structures.
      } else {
        const templateTR = TR_SENTENCE_TEMPLATES[state.selectedConnector] || "{A_TR}, {B_TR}.";
        const trA = clauseAObj.sampleTR || clauseAObj.label;
        const trB = clauseBObj.sampleTR || clauseBObj.label;

        if (templateTR) {
          let resultTR = templateTR
            .replace("{A_TR}", trA)
            .replace("{B_TR}", trB);
          sentenceTRText = resultTR.charAt(0).toUpperCase() + resultTR.slice(1);
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
      }
    }

    // Render 5 Tense Examples Box - Removed upon user request
    const tenseBox = document.getElementById("srobot-tense-examples-box");
    if (tenseBox) {
      tenseBox.style.display = "none";
    }
  }

  // Global init hook
  window.initStructureRobot = initStructureRobot;

  document.addEventListener("DOMContentLoaded", () => {
    initStructureRobot();
  });
})();
