/* ── "Nasıl çevrilir?" reçeteleri ────────────────────────────────────────────
 * Ders kartındaki formül satırı çoğu derste üç dört kalıbı tek satırda anıyor
 * ("Subject + Verb + that + Clause / The fact that + Clause / It is + Adj +
 * that + Clause"), örnek satırı ise bunlardan yalnızca birini gösteriyordu.
 * Öğrenci kalıbı görüyor ama o kalıbın Türkçeye nasıl döndüğünü göremiyordu.
 *
 * Burada her yapısal öğe için ayrı bir kart tutuluyor:
 *   pattern → kalıbın kendisi
 *   en / tr → o kalıbın örneği ve çevirisi
 *   tip     → çeviri sırasında hangi ekin/ sıranın kullanılacağı
 *   detect  → sorunun İngilizce metninde aranan işaretler; eşleşen kalıp
 *             varsa panelde yalnızca o kalıbın çevirisi gösterilir.
 *
 * Anahtar = lessons[].id. Burada karşılığı olmayan dersler için app.js
 * kartları dersin kendi formula/example alanlarından türetir.
 * ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  const card = (pattern, en, tr, tip, detect) => ({ pattern, en, tr, tip, detect: detect || [] });

  const RECIPES = {

    /* ── Bölüm: Zarf Cümlecikleri (u32) ─────────────────────────────────── */
    "128": [
      card("When + Clause, Main Clause",
        "When the reaction starts, heat is released.",
        "Tepkime başladığında ısı açığa çıkar.",
        "when → “-dığında / -ince”. Yan cümlede gelecek zaman eki (will) kullanılmaz.",
        ["when"]),
      card("After + Clause, Main Clause",
        "After the commission delayed the decision, the dispute escalated.",
        "Komisyon kararı geciktirdikten sonra anlaşmazlık tırmandı.",
        "after → “-dikten sonra”. Önce yan cümle, sonra ana cümle çevrilir.",
        ["after"]),
      card("Before + Clause, Main Clause",
        "Historians check their sources before they publish a study.",
        "Tarihçiler bir çalışma yayımlamadan önce kaynaklarını kontrol eder.",
        "before → “-madan önce”. Türkçede olumsuzluk eki zorunludur, cümle yine olumludur.",
        ["before"]),
      card("Since + Clause (zaman)",
        "Access has been restricted since the archive was digitized.",
        "Arşiv dijitalleştirildiğinden beri erişim kısıtlı.",
        "Zaman anlamlı since → “-dan beri”; ana cümle çoğunlukla present perfect olur.",
        ["since"]),
      card("As / While + Clause (eşzamanlılık)",
        "As the data was processed, new errors appeared.",
        "Veriler işlenirken yeni hatalar ortaya çıktı.",
        "Eşzamanlı as/while → “-irken”. Aynı anda süren iki eylemi bağlar.",
        ["as ", "while"])
    ],

    "129": [
      card("Main Clause + because + Clause",
        "The budget was modified because costs increased.",
        "Maliyetler arttığı için bütçe değiştirildi.",
        "because → “-dığı için / -dığından”. Türkçede sebep cümlesi başa alınır.",
        ["because "]),
      card("Since / As + Clause (sebep)",
        "Since the data was confidential, the archive access was restricted.",
        "Veriler gizli olduğu için arşiv erişimi kısıtlandı.",
        "Cümle başındaki since çoğu zaman sebeptir: “madem / -dığı için”, “beri” değil.",
        ["since", "seeing that"]),
      card("Seeing that + Clause",
        "Seeing that the survey was anonymous, many citizens cooperated.",
        "Anket anonim olduğu için birçok vatandaş iş birliği yaptı.",
        "seeing that = because; resmî metinlerde “göz önüne alındığında” diye de çevrilir.",
        ["seeing that"]),
      card("Due to / Because of + Noun",
        "Due to legal disputes, the trade agreement was modified.",
        "Yasal anlaşmazlıklar nedeniyle ticaret anlaşması değiştirildi.",
        "İsim öbeği alır → “nedeniyle / yüzünden”. Yanına özne + fiil gelmez.",
        ["due to", "because of", "owing to", "on account of"])
    ],

    "130": [
      card("Although / Even though + Clause, Main Clause",
        "Although he was ill, he finalized the report.",
        "Hasta olmasına rağmen raporu tamamladı.",
        "although → “-mesine rağmen / -dığı halde”. Türkçede rağmen'li bölüm başa gelir.",
        ["although", "even though", "though"]),
      card("While + Clause (zıtlık)",
        "While the frontend is ready, the backend is still pending.",
        "Ön yüz hazırken arka yüz hâlâ beklemede.",
        "Buradaki while zaman değil karşıtlıktır: “oysa / -ken”.",
        ["while", "whereas"]),
      card("Despite / In spite of + Noun",
        "Despite the delay, the archaeological project was completed.",
        "Gecikmeye rağmen arkeolojik proje tamamlandı.",
        "İsim ya da -ing alır → “-e rağmen”. Cümle bağlayacaksa “despite the fact that” gerekir.",
        ["despite", "in spite of"])
    ],

    "131": [
      card("so that + Clause (amaç)",
        "They funded the lab so that researchers could verify the data.",
        "Araştırmacılar verileri doğrulayabilsin diye laboratuvarı finanse ettiler.",
        "so that → “... diye / ... için”. Yan cümlede can/could/would bulunur.",
        ["so that", "in order that"]),
      card("so + Adjective + that (derece)",
        "Cells are so small that they cannot be seen.",
        "Hücreler o kadar küçüktür ki görülemezler.",
        "“o kadar ... ki” kalıbı. so'dan sonra sıfat/zarf, that'ten sonra sonuç cümlesi gelir.",
        ["so ", "so small", "so complex"]),
      card("such + (a) Noun + that (derece)",
        "It was such a complex dispute that the court postponed the case.",
        "O kadar karmaşık bir anlaşmazlıktı ki mahkeme davayı erteledi.",
        "such isim öbeği alır, so sıfat alır: “such a complex dispute” ↔ “so complex”.",
        ["such a", "such an", "such "]),
      card("as if / as though + Clause (tarz)",
        "He speaks as if he had seen the manuscript.",
        "Sanki el yazmasını görmüş gibi konuşuyor.",
        "as if → “sanki ... gibi”. V2 / had V3 kullanımı olayın gerçek dışı olduğunu gösterir.",
        ["as if", "as though"])
    ],

    "132": [
      card("If + Clause, Main Clause",
        "If the parameters shift, the compilation fails.",
        "Parametreler değişirse derleme başarısız olur.",
        "if → “-se / -sa”. Yan cümlede will kullanılmaz, geniş zaman yeter.",
        ["if "]),
      card("Unless + Clause",
        "Unless parameters shift, compilation succeeds.",
        "Parametreler değişmedikçe derleme başarılı olur.",
        "unless = if not → “-medikçe”. Yan cümleyi bir kez daha olumsuz yapma.",
        ["unless"]),
      card("Provided that / As long as + Clause",
        "Access is granted provided that the archive is credited.",
        "Arşive atıf yapılması koşuluyla erişim verilir.",
        "provided/providing that, as long as → “... koşuluyla / ... şartıyla”.",
        ["provided that", "providing that", "as long as", "on condition that"])
    ],

    /* ── Bölüm: İsim Cümlecikleri (u28) ─────────────────────────────────── */
    "nc_l1": [
      card("Subject + Verb + that + Clause",
        "The study confirmed that the hypothesis is valid.",
        "Çalışma, hipotezin geçerli olduğunu doğruladı.",
        "that-cümlesi nesnedir: yan cümle “-dığını / -eceğini” ile biter, ana fiil sona gider.",
        ["confirmed that", "believe that", "assume that", "showed that", "argues that", "that the"]),
      card("The fact that + Clause",
        "The fact that datasets conflict invalidates the report.",
        "Veri kümelerinin çelişmesi raporu geçersiz kılar.",
        "Blok isim gibi çalışır: “-mesi / -ması” ya da “... olması gerçeği”.",
        ["the fact that"]),
      card("It is + Adjective + that + Clause",
        "It is clear that the guidelines were finalized.",
        "Yönergelerin kesinleştirildiği açıktır.",
        "Sahte özne “it” çevrilmez: önce that-cümlesi “-dığı” ile kurulur, sıfat yükleme taşınır.",
        ["it is clear", "it is apparent", "it is believed", "it is obvious", "it is "]),
      card("Adjective + that + Clause (sıfat arkası)",
        "The historians are aware that access remains restricted.",
        "Tarihçiler erişimin kısıtlı kaldığının farkındadır.",
        "sure / aware / afraid / confident + that → “-dığının / -dığından” + sıfat.",
        ["aware that", "sure that", "afraid that", "confident that"])
    ],

    "nc_l2": [
      card("Subject + Verb + whether / if + Clause",
        "The commission discussed whether the funding was distributed fairly.",
        "Komisyon, fonun adil dağıtılıp dağıtılmadığını görüştü.",
        "whether/if → “-ıp -madığını”. Türkçede ikili soru kalıbı zorunludur.",
        ["whether", "if the", "wondered if", "doubt if"]),
      card("Whether + Clause (özne konumunda)",
        "Whether inflation will decline remains uncertain.",
        "Enflasyonun düşüp düşmeyeceği belirsizliğini koruyor.",
        "Özne konumundaki blok “-ıp -mayacağı” olur; ana fiil (remains) sona gelir.",
        ["whether"]),
      card("Wh- Word + Subject + Verb",
        "They explained why the financial crisis occurred.",
        "Mali krizin neden meydana geldiğini açıkladılar.",
        "Dolaylı soruda devriklik yoktur: wh- + özne + fiil, sonu “-dığını”.",
        ["why the", "how the", "what the", "where the", "when the", "who "]),
      card("Wh-ever + Clause",
        "Whatever decision the board takes will affect all sectors.",
        "Kurul hangi kararı alırsa alsın tüm sektörleri etkileyecek.",
        "-ever eki genelleme katar: “hangi ... -rsa / her ne ... -se”.",
        ["whatever", "whoever", "whenever", "wherever", "however "])
    ],

    "nc_l3": [
      card("demand / recommend / suggest + that + Subject + V1",
        "They demanded that the report be submitted immediately.",
        "Raporun derhal sunulmasını talep ettiler.",
        "Yalın fiil: “be submitted” çekimlenmez. Türkçede “-masını / -mesini” + ana fiil.",
        ["demanded that", "recommend that", "suggest that", "insist that", "propose that", "request that"]),
      card("It is + essential / necessary + that + Subject + V1",
        "It is essential that access be granted to all researchers.",
        "Erişimin tüm araştırmacılara verilmesi şarttır.",
        "Gereklilik sıfatı + that → “-ması gerekir / şarttır”; yan cümle fiili yalın kalır.",
        ["it is essential", "it is necessary", "it is vital", "it is imperative", "essential that"]),
      card("Preposition + Wh- / Whether + Clause",
        "They discussed the plan about how to allocate resources.",
        "Kaynakların nasıl dağıtılacağı konusunda planı görüştüler.",
        "Edattan sonra that gelmez; wh- ya da whether gelir → “... konusunda / ... hakkında”.",
        ["about how", "about whether", "on whether", "of how", "in what", "about what"])
    ],

    "nc_l4": [
      card("Noun Clause: that + tam cümle",
        "The finding that data leaked surprised the committee.",
        "Verilerin sızdığı bulgusu kurulu şaşırttı.",
        "that'ten sonra cümle eksiksizse blok ismin içeriğidir: “... -dığı bulgusu”.",
        ["the fact that", "the finding that", "the idea that", "the claim that"]),
      card("Adjective Clause: that + eksik cümle",
        "The finding that was published surprised the committee.",
        "Yayımlanan bulgu kurulu şaşırttı.",
        "that özne/nesne yerine geçiyorsa sıfat cümleciğidir → “-an / -en” ile ismi niteler.",
        ["that was", "that were", "which was", "who "]),
      card("What + Clause (öncülsüz)",
        "What the committee published contradicts the earlier report.",
        "Kurulun yayımladığı şey daha önceki raporla çelişiyor.",
        "what zaten “şey” anlamını taşır; önünde nitelenecek bir isim bulunmaz.",
        ["what the", "what they", "what we"])
    ],

    /* ── Bölüm: Bağlaçlar ve Geçiş İfadeleri (u40) ──────────────────────── */
    "400": [
      card("Although / Even though + SVO",
        "Although the commission authorized the research, the funding was delayed.",
        "Komisyon araştırmaya izin vermesine rağmen fon gecikti.",
        "Cümle alır → “-mesine rağmen”. İki yakada da özne + fiil bulunur.",
        ["although", "even though", "though"]),
      card("Despite / In spite of + Noun",
        "Despite the authorization, the funding was delayed.",
        "İzne rağmen fon gecikti.",
        "İsim ya da -ing alır. Cümle bağlanacaksa “despite the fact that” gerekir.",
        ["despite", "in spite of"]),
      card("SVO; however / nevertheless, SVO",
        "The funding was delayed; however, the historians continued the study.",
        "Fon gecikti; ancak tarihçiler çalışmayı sürdürdü.",
        "Geçiş sözcüğü iki bağımsız cümleyi bağlar: noktalı virgül + however + virgül.",
        ["however", "nevertheless", "nonetheless"])
    ],

    "401": [
      card("While / Whereas + SVO (kıyas)",
        "Whereas documentary films analyze historical events, fiction movies create imaginary worlds.",
        "Belgeseller tarihi olayları incelerken kurgu filmler hayali dünyalar kurar.",
        "Saf kıyas: “-ken / oysa”. Zıtlıktan farkı, iki tarafın da doğru olmasıdır.",
        ["whereas", "while"]),
      card("Unlike / Contrary to + Noun",
        "Unlike documentaries, fiction movies prioritize entertainment.",
        "Belgesellerin aksine kurgu filmler eğlenceyi önceler.",
        "İsim alır → “-in aksine / -den farklı olarak”.",
        ["unlike", "contrary to"]),
      card("because / since / as + SVO",
        "Fiction movies attract wider audiences because they prioritize entertainment.",
        "Kurgu filmler eğlenceyi önceledikleri için daha geniş kitleleri çeker.",
        "Cümle alan sebep bağlacı → “-dığı için”. İsim alan biçimi “because of”tur.",
        ["because ", "since ", " as "])
    ],

    "402": [
      card("Due to / Because of + Noun",
        "Due to legal disputes, the economists modified the trade agreement.",
        "Yasal anlaşmazlıklar nedeniyle iktisatçılar ticaret anlaşmasını değiştirdi.",
        "Edat öbeğidir: yanına isim gelir → “nedeniyle”. Özne + fiil alamaz.",
        ["due to", "because of", "owing to"]),
      card("SVO; therefore / consequently, SVO",
        "Costs increased; therefore, the commission held an emergency meeting.",
        "Maliyetler arttı; bu nedenle komisyon acil toplantı düzenledi.",
        "Sonuç geçişi: noktalı virgül + therefore + virgül → “bu nedenle / dolayısıyla”.",
        ["therefore", "consequently", "thus", "hence", "as a result"]),
      card("In addition to + Noun / SVO; furthermore, SVO",
        "In addition to the trade agreement, they revised the tariff schedule.",
        "Ticaret anlaşmasına ek olarak tarife çizelgesini de gözden geçirdiler.",
        "“-e ek olarak” isim ister; cümle eklenecekse “furthermore / moreover” kullanılır.",
        ["in addition", "furthermore", "moreover", "besides"]),
      card("SVO; that is / namely, ... (açıklama)",
        "They revised a single clause; namely, the tariff schedule.",
        "Tek bir maddeyi gözden geçirdiler; yani tarife çizelgesini.",
        "Açıklama geçişleri → “yani / bir başka deyişle”. Önceki ifadeyi netleştirir.",
        ["that is", "namely", "in other words", "for example", "for instance", "such as"])
    ],

    "403": [
      card("Neither ... nor / Either ... or",
        "Neither the historians nor the commission was willing to authorize the funding.",
        "Ne tarihçiler ne de komisyon fona izin vermeye istekliydi.",
        "Fiil en yakın özneye uyar. Türkçede “ne ... ne de” kalıbından sonra fiil olumlu kalır.",
        ["neither", "nor ", "either", " or "]),
      card("so that + SVO (amaç)",
        "They archived the documents so that the cultural heritage could be preserved.",
        "Kültürel miras korunabilsin diye belgeleri arşivlediler.",
        "Özneler farklıysa amaç için so that kullanılır → “... diye / ... -abilsin diye”.",
        ["so that"]),
      card("in order to / so as to + V1",
        "They archived the documents in order to preserve the cultural heritage.",
        "Kültürel mirası korumak amacıyla belgeleri arşivlediler.",
        "Özne aynıysa mastar yeter → “-mek için / -mek amacıyla”.",
        ["in order to", "so as to", " to preserve", " to obtain"]),
      card("rather than / in terms of + Noun",
        "They relied on public funds rather than private sponsors.",
        "Özel sponsorlar yerine kamu fonlarına dayandılar.",
        "rather than → “... yerine”, in terms of → “... açısından”. İkisi de isim alır.",
        ["rather than", "in terms of", "instead of"])
    ],

    /* ── Bölüm: Özne + to be Yapıları (u6) ──────────────────────────────── */
    "16": [
      card("Subject + Be + Noun",
        "The student is a doctor.",
        "Öğrenci bir doktordur.",
        "İngilizcedeki “is” Türkçede ayrı sözcük değil, yüklem eki olur: “-dır”.",
        [" is a ", " is an ", " are "]),
      card("Subject + Be + Adjective",
        "The ground is wet.",
        "Zemin ıslaktır.",
        "Sıfat doğrudan yüklem olur: “ıslak + -tır”. Ayrı bir fiil eklenmez.",
        [" is ", " was "])
    ],

    "17": [
      card("Subject + Be + Adjective + Noun",
        "The student is an English doctor.",
        "Öğrenci İngiliz bir doktordur.",
        "Sıfat, İngilizcede olduğu gibi Türkçede de ismin önünde kalır.",
        [" is an ", " is a "]),
      card("Subject + Be + Prepositional Phrase",
        "The student is in the train.",
        "Öğrenci trendedir.",
        "in / at / on Türkçede ayrı sözcük değil bulunma eki olur: “-de / -da”.",
        [" is in ", " is at ", " is on ", " are in "])
    ],

    /* ── Bölüm: Sıfat-Fiiller (u12) ─────────────────────────────────────── */
    "38": [
      card("Present Participle (V-ing) + Noun",
        "Emerging technologies transform global industries.",
        "Gelişmekte olan teknolojiler küresel sanayileri dönüştürür.",
        "-ing sıfatı işi yapanı gösterir → “-an / -en”.",
        ["ing "]),
      card("Past Participle (V3) + Noun",
        "Detailed reports were submitted to the committee.",
        "Ayrıntılı raporlar kurula sunuldu.",
        "V3 sıfatı işten etkileneni gösterir → “-mış / -lan”.",
        ["ed ", "detailed", "restricted", "verified"])
    ],

    "39": [
      card("Noun + V-ing + Noun (birleşik sıfat)",
        "soil-enriching humus",
        "toprağı zenginleştiren humus",
        "Birleşik sıfatta önce nesne, sonra “-en” eki gelir: “toprağı zenginleştiren”.",
        ["-enriching", "-producing", "-saving", "ing "]),
      card("Adverb + V3 + Noun (birleşik sıfat)",
        "well-developed system",
        "iyi gelişmiş sistem",
        "Zarf, sıfatın önünde kalır: “iyi gelişmiş”. Tire Türkçeye taşınmaz.",
        ["well-", "highly ", "widely ", "poorly "])
    ],

    /* ── Bölüm: Öbeksel Kipler (u103) ───────────────────────────────────── */
    "107": [
      card("be used to + V-ing / Noun",
        "The administrator is used to monitoring network traffic.",
        "Yönetici ağ trafiğini izlemeye alışıktır.",
        "to'dan sonra V1 değil V-ing gelir → “-meye alışık”.",
        ["used to"]),
      card("be accustomed to + V-ing / Noun",
        "The team is accustomed to working overnight.",
        "Ekip gece boyunca çalışmaya alışkındır.",
        "be used to ile eş anlamlıdır, akademik metinlerde daha sık geçer.",
        ["accustomed to"]),
      card("get used to + V-ing / Noun",
        "Users got used to the new interface.",
        "Kullanıcılar yeni arayüze alıştı.",
        "get süreci anlatır (“alıştı”), be durumu anlatır (“alışıktır”).",
        ["get used to", "got used to", "getting used to"]),
      card("used to + V1 (karıştırma!)",
        "Engineers used to test the modules manually.",
        "Mühendisler modülleri eskiden elle test ederdi.",
        "“used to + V1” geçmiş alışkanlıktır → “eskiden ... -irdi”; alışkınlık değildir.",
        ["used to "])
    ],

    "108": [
      card("be willing to + V1",
        "The developers are willing to update the code.",
        "Geliştiriciler kodu güncellemeye isteklidir.",
        "“-meye istekli”. Mastar Türkçede yönelme ekiyle isimleşir.",
        ["willing to"]),
      card("be unwilling to + V1",
        "The board is unwilling to release the raw data.",
        "Kurul ham veriyi paylaşmaya isteksizdir.",
        "unwilling → “isteksiz”; olumsuzluk fiile değil sıfata yüklenir.",
        ["unwilling to"]),
      card("be reluctant to + V1",
        "Investors are reluctant to fund the project.",
        "Yatırımcılar projeyi finanse etmekte çekingendir.",
        "reluctant → “gönülsüz / çekingen”; “-mekte” eki daha doğal durur.",
        ["reluctant to"])
    ],

    "109": [
      card("be likely to + V1",
        "System latency is likely to increase during peak hours.",
        "Yoğun saatlerde sistem gecikmesinin artması muhtemeldir.",
        "Özne Türkçede tamlayan olur: “gecikmenin artması muhtemeldir”.",
        ["likely to"]),
      card("be unlikely to + V1",
        "The maintenance costs are unlikely to fall.",
        "Bakım maliyetlerinin düşmesi olası değildir.",
        "unlikely → “olası değil”; Türkçede olumsuzluk yüklemde toplanır.",
        ["unlikely to"]),
      card("be bound to + V1",
        "The reform is bound to face resistance.",
        "Reform kaçınılmaz olarak direnişle karşılaşacaktır.",
        "bound to kesin/kaçınılmaz sonucu anlatır → “kaçınılmaz olarak ... -ecek”.",
        ["bound to"]),
      card("be certain / sure to + V1",
        "The committee is certain to approve the proposal.",
        "Kurulun öneriyi onaylayacağı kesindir.",
        "“... -eceği kesindir”. Kesinlik yükleme, eylem tamlayana taşınır.",
        ["certain to", "sure to"])
    ],

    "110": [
      card("be supposed to + V1",
        "We are supposed to upgrade the architecture this cycle.",
        "Bu döngüde mimariyi yükseltmemiz gerekiyor.",
        "Kural/beklenti bildirir → “-mesi gerekiyor”, “-meliydi” değil.",
        ["supposed to"]),
      card("be to + V1 (resmî plan)",
        "The minister is to visit the national archive.",
        "Bakan ulusal arşivi ziyaret edecek.",
        "Resmî program bildirir → düz gelecek zaman: “-ecek”.",
        [" is to ", " are to ", " was to "]),
      card("be doomed to + V1 / Noun",
        "The project was doomed to fail from the start.",
        "Proje daha baştan başarısızlığa mahkûmdu.",
        "doomed to → “-e mahkûm”. Olumsuz kaderi anlatır.",
        ["doomed to"]),
      card("be unable to + V1",
        "The team was unable to verify the empirical data.",
        "Ekip ampirik verileri doğrulayamadı.",
        "Yetersizlik eki tek başına yeter → “-emedi”; ayrıca “değildi” eklenmez.",
        ["unable to"]),
      card("be about to + V1",
        "The system is about to restart.",
        "Sistem birazdan yeniden başlayacak.",
        "Çok yakın gelecek → “-mek üzere / birazdan”.",
        ["about to"])
    ],

    /* ── Bölüm: Zaman Uyumu ve Devrik Zaman Kilitleri (u101) ────────────── */
    "103": [
      card("Since + V2 ➔ have / has + V3",
        "Scientists have analyzed the data since the project began.",
        "Bilim insanları proje başladığından beri verileri analiz ediyor.",
        "since'li yan cümle V2 (başlangıç anı), ana cümle present perfect olur.",
        ["since"]),
      card("Since + V2 ➔ had + V3 (geçmiş bağlam)",
        "Until 2020, they had analyzed the data since the project began.",
        "2020'ye kadar, proje başladığından beri verileri analiz etmişlerdi.",
        "Bakış açısı geçmişteyse ana cümle past perfect'e kayar.",
        ["since", "until 20"]),
      card("By the time + V2 ➔ had + V3",
        "By the time the auditors arrived, the session had ended.",
        "Denetçiler geldiğinde oturum çoktan bitmişti.",
        "“-dığında ... çoktan -mişti”. Öncelik ana cümlededir.",
        ["by the time"]),
      card("By the time + V1 ➔ will have + V3",
        "By the time the audit starts, the team will have finished the report.",
        "Denetim başladığında ekip raporu bitirmiş olacak.",
        "Gelecek bağlamda yan cümle geniş zaman, ana cümle future perfect olur.",
        ["by the time"])
    ],

    "104": [
      card("After + had + V3 ➔ V2",
        "After the team had published the study, they received an award.",
        "Ekip çalışmayı yayımladıktan sonra bir ödül aldı.",
        "Önce olan eylem had V3, sonraki V2 → “-dikten sonra”.",
        ["after"]),
      card("Before + V2 ➔ had + V3",
        "Before the market crashed, experts had warned investors.",
        "Piyasa çökmeden önce uzmanlar yatırımcıları uyarmıştı.",
        "before'lu cümlede öncelik ana cümlededir: “-madan önce ... -mişti”.",
        ["before"]),
      card("While + Continuous ➔ V2",
        "While analysts were reviewing the data, the server failed.",
        "Analistler verileri incelerken sunucu çöktü.",
        "Süregelen eylem continuous, kesen eylem V2 → “-irken”.",
        ["while"])
    ],

    "105": [
      card("No sooner + had + S + V3 ➔ than + S + V2",
        "No sooner had the scientist announced the findings than debate erupted.",
        "Bilim insanı bulguları açıklar açıklamaz tartışma patlak verdi.",
        "Devrik yapı: had özneden önce gelir. Türkçe karşılığı “-ar -maz”.",
        ["no sooner"]),
      card("Hardly / Scarcely / Barely + had + S + V3 ➔ when + S + V2",
        "Hardly had the probe landed when the signals were lost.",
        "Sonda iner inmez sinyaller kayboldu.",
        "Eşi sabittir: no sooner → than, hardly/scarcely/barely → when.",
        ["hardly", "scarcely", "barely"])
    ],

    "106": [
      card("It is (high) time + Subject + V2",
        "It is high time we revised the outdated laws.",
        "Eskimiş yasaları gözden geçirmemizin tam zamanı.",
        "V2 geçmiş değildir; henüz yapılmamış bir eylemi anlatır → “-memizin zamanı”.",
        ["it is time", "it is high time", "it's time"]),
      card("It is time + to + V1",
        "It is time to start the exam.",
        "Sınava başlama zamanı.",
        "Özne belirtilmiyorsa mastar kullanılır; V2 kalıbıyla karıştırma.",
        ["time to "]),
      card("Superlative + Present / Past Perfect",
        "This is the best book I have ever read.",
        "Bu, şimdiye kadar okuduğum en iyi kitap.",
        "En üstünlük + ever → perfect zaman. “ever” Türkçede “şimdiye kadar” olur.",
        ["the best", "the most", "ever "])
    ],

    /* ── Bölüm: İleri Düzey Sıfat Cümlecikleri (u37) ────────────────────── */
    "c37_ml1": [
      card("Noun + , + most / some of which + Clause",
        "The historian examined twenty medieval manuscripts, most of which detailed the Silk Road.",
        "Tarihçi yirmi ortaçağ el yazmasını inceledi; bunların çoğu İpek Yolu'nu ayrıntılarıyla anlatıyordu.",
        "Virgülden sonrası ayrı bir cümle gibi çevrilir: “bunların çoğu ...”. Tek cümlede tutulacaksa “çoğu ... olan” sıfat öbeği kurulur.",
        ["of which", "most of", "some of"]),
      card("Noun + , + none / half of which + Clause",
        "The council approved three proposals, none of which addressed the funding gap.",
        "Konsey üç öneriyi onayladı; hiçbiri fon açığını ele almıyordu.",
        "none of which → “hiçbiri”; olumsuzluk Türkçede yan cümlenin yüklemine taşınır.",
        ["none of which", "half of which", "a fraction of"])
    ],

    "c37_ml2": [
      card("Plural Noun (People) + , + many / each of whom + Clause",
        "The empire exiled ten political dissidents, many of whom established networks abroad.",
        "İmparatorluk on siyasi muhalifi sürgüne gönderdi; birçoğu yurt dışında ağlar kurdu.",
        "İnsanlar için of whom kullanılır → “birçoğu / her biri”. which ya da that gelemez.",
        ["of whom", "many of", "each of"]),
      card("Plural Noun (People) + , + neither of whom + Clause",
        "The board interviewed two candidates, neither of whom had field experience.",
        "Kurul iki adayla görüştü; ikisinin de saha deneyimi yoktu.",
        "neither of whom → “ikisi de ... değil”; olumsuzluk yükleme geçer.",
        ["neither of whom", "the majority of whom"])
    ],

    "c37_ml3": [
      card("Noun + , + the first / the last of which + Clause",
        "The civilization built three grand libraries, the first of which was destroyed.",
        "Uygarlık üç büyük kütüphane inşa etti; bunlardan ilki yıkıldı.",
        "Sıra sıfatından önce “the” zorunludur → “bunlardan ilki / sonuncusu”.",
        ["the first of", "the last of", "the second of"]),
      card("Noun + , + the largest / the oldest of which + Clause",
        "They surveyed five ruins, the largest of which dated back to 300 BC.",
        "Beş harabeyi incelediler; en büyüğü MÖ 300'e uzanıyordu.",
        "En üstünlük derecesi → “en ... olanı”. Grup içinden bir üyeyi seçer.",
        ["the largest of", "the oldest of", "the most"])
    ],

    "c37_ml4": [
      card("Noun + , + each / most of whose + Noun + Clause",
        "The philosopher wrote a thick book, each of whose chapters redefines democracy.",
        "Filozof, her bölümü demokrasiyi yeniden tanımlayan kalın bir kitap yazdı.",
        "whose'dan sonra yalın isim gelir; çeviri iyelik ekiyle kurulur: “her bölümü ... olan”.",
        ["of whose"]),
      card("Noun + , + all of whose + Noun + Clause",
        "They joined a network, most of whose members are volunteers.",
        "Üyelerinin çoğu gönüllü olan bir ağa katıldılar.",
        "Sahiplik zinciri sondan başa çözülür: “üyelerinin çoğu ... olan ağ”.",
        ["all of whose", "most of whose", "some of whose"])
    ],

    "c37_ml5": [
      card("Noun + , + to / with + Quantifier + of which/whom + Clause",
        "The delegation proposed two amendments, to neither of which the parliament agreed.",
        "Heyet iki değişiklik önerdi; parlamento ikisini de kabul etmedi.",
        "Edat yan cümledeki fiilden gelir (agree to). Türkçede fiilin istediği hâl eki olur.",
        ["of which", "of whom", "to neither", "with most"]),
      card("Noun + , + Preposition + most of which + Clause",
        "He published several theories, with most of which I agreed.",
        "Birçoğuna katıldığım çeşitli kuramlar yayımladı.",
        "Doğru edat için yan cümlenin fiiline bakılır: “agree with” → with.",
        ["with most of", "in some of", "by many of"])
    ],

    "c37_ml6": [
      card("Noun + , + under the supervision of whom + Clause",
        "The foundation employs five junior researchers, under the supervision of whom the field study is conducted.",
        "Vakıf beş genç araştırmacı çalıştırıyor; saha çalışması onların gözetiminde yürütülüyor.",
        "Bu kalıpta çeviri ikiye bölünür: “... onların gözetiminde / liderliğinde”.",
        ["of whom", "supervision of", "leadership of"]),
      card("Noun + , + by means of which + Clause",
        "They developed a method by means of which the data can be verified.",
        "Verilerin doğrulanabildiği bir yöntem geliştirdiler.",
        "by means of which → “vasıtasıyla”; sondan başa okuyarak “-dığı” ekiyle bağlanır.",
        ["by means of", "through the analysis of", "of which"])
    ],

    "c37_ml7": [
      card("Time Noun + , + by which time + Clause",
        "The peace negotiations lasted for two years, by which time the economy had collapsed.",
        "Barış görüşmeleri iki yıl sürdü; o zamana kadar ekonomi çökmüştü.",
        "by which time → “o zamana kadar”; ana cümlede genellikle had V3 bulunur.",
        ["by which time", "since which"]),
      card("Event Noun + , + at which point + Clause",
        "The reactor overheated, at which point the engineers halted the test.",
        "Reaktör aşırı ısındı; bu noktada mühendisler testi durdurdu.",
        "at which point → “bu noktada”, during which period → “bu süre boyunca”.",
        ["at which point", "during which"])
    ],

    "c37_ml8": [
      card("Noun + , + Preposition + the + Noun + of whom + Clause",
        "The king appointed two envoys, through the diplomatic efforts of whom the war was avoided.",
        "Kral iki elçi atadı; savaş onların diplomatik çabalarıyla önlendi.",
        "Karma yapıda önce ana cümle çevrilir, virgülden sonrası ayrı cümle gibi bağlanır.",
        ["of whom", "efforts of", "through the"]),
      card("Noun + , + some of which + Clause",
        "The archive released fifty files, some of which had been classified for decades.",
        "Arşiv elli dosya yayımladı; bazıları onlarca yıldır gizliydi.",
        "Miktar belirteçli yapılarda “bunlardan bazıları” demek en doğal karşılıktır.",
        ["of which", "some of"])
    ],

    /* ── Bölüm: Cümle Bağlaçları (u22) ──────────────────────────────────── */
    "68": [
      card("SVO, and as a result, SVO",
        "Configuration components experienced stress, and as a result, the network suffered a latency spike.",
        "Yapılandırma bileşenleri zorlandı ve bunun sonucunda ağ gecikme sıçraması yaşadı.",
        "as a result → “bunun sonucunda”. İki bağımsız cümleyi sonuç ilişkisiyle bağlar.",
        ["as a result", "in conclusion", "on the whole"]),
      card("SVO, so SVO",
        "The parsing algorithm functions precisely, so even small syntax variations are flagged.",
        "Ayrıştırma algoritması hassas çalışır, bu yüzden küçük sözdizimi farkları bile işaretlenir.",
        "so → “bu yüzden”; therefore'un gündelik karşılığıdır ve virgülden sonra gelir.",
        [", so ", "so even"]),
      card("SVO; therefore / consequently, SVO",
        "Costs rose sharply; therefore, the launch was postponed.",
        "Maliyetler hızla arttı; bu nedenle lansman ertelendi.",
        "Geçiş sözcüğü noktalı virgülle bağlanır: “; therefore,” → “; bu nedenle,”.",
        ["therefore", "consequently", "thus", "hence"])
    ],

    "69": [
      card("SVO + such as + Noun Phrase",
        "The framework regulates volatile dimensions such as boundary parameter shifts.",
        "Çerçeve, sınır parametresi kaymaları gibi değişken boyutları düzenler.",
        "such as isim öbeği alır → “... gibi”. Yanına özne + fiil gelmez.",
        ["such as", "like "]),
      card("SVO; for example / for instance, SVO",
        "Monographs present qualitative research; for example, modern syntax models are examined.",
        "Monografiler nitel araştırma sunar; örneğin modern sözdizimi modelleri incelenir.",
        "Cümle örneklendirir → “örneğin”; noktalı virgül ya da noktadan sonra gelir.",
        ["for example", "for instance"]),
      card("SVO; that is / namely, ...",
        "Only one variable changed; that is, the sampling interval.",
        "Yalnızca bir değişken değişti; yani örnekleme aralığı.",
        "that is / namely → “yani”. Önceki ifadeyi örneklendirmez, açıklar.",
        ["that is", "namely", "in other words"])
    ],

    "70": [
      card("Even if + Clause, Main Clause",
        "Even if developers optimize the builds, older devices will still lag.",
        "Geliştiriciler yapıları en iyi hâle getirse bile eski cihazlar yine de yavaşlayacak.",
        "even if → “-se bile”. if'ten farkı, koşul gerçekleşse de sonucun değişmemesidir.",
        ["even if"]),
      card("SVO; otherwise, SVO",
        "You must run the diagnostic tools; otherwise, the database will collapse.",
        "Tanılama araçlarını çalıştırmalısın; aksi takdirde veritabanı çöker.",
        "otherwise → “aksi takdirde”; önündeki cümlenin gerçekleşmediği durumu anlatır.",
        ["otherwise"]),
      card("Main Clause + in case + Clause",
        "Keep a backup in case the migration fails.",
        "Geçiş başarısız olur diye bir yedek tut.",
        "in case → “... diye / ihtimaline karşı”; “eğer” diye çevrilmez.",
        ["in case"])
    ],

    /* ── Bölüm: Yer, Zaman ve İyelik Sıfat Cümlecikleri (u26) ───────────── */
    "80": [
      card("Noun (place) + where + Subject + Verb",
        "the geographical region where the ancient tribe settled",
        "kadim kabilenin yerleştiği coğrafi bölge",
        "Yer bildiren isimden sonra where → “-dığı” ekiyle biten sıfat öbeği.",
        ["where"]),
      card("Noun (time) + when + Subject + Verb",
        "the era when independent journalists protested",
        "bağımsız gazetecilerin protesto ettiği dönem",
        "Zaman ismi + when → “-dığı”; ayrıca “o zaman” eklenmez.",
        ["when"]),
      card("Noun + whose + Noun + Verb",
        "the historian whose research resolved the dispute",
        "araştırması anlaşmazlığı çözen tarihçi",
        "whose sahiplik kurar: nitelenen ismin ardından iyelik eki (“araştırması”) gelir.",
        ["whose"]),
      card("Noun (person) + whom + Subject + Verb",
        "the economists whom the commission consulted",
        "komisyonun danıştığı iktisatçılar",
        "whom nesne konumundadır → “-dığı” + nitelenen isim. Özne varsa who değil whom.",
        ["whom"])
    ],

    /* ── Bölüm: Saf Zamanlar (u70) ──────────────────────────────────────── */
    "551": [
      card("V1 / V-es (Simple Present)",
        "The system verifies the data.",
        "Sistem verileri doğrular.",
        "Geniş zaman → “-r”. Alışkanlık ve genel doğruları anlatır.",
        []),
      card("am / is / are + V-ing (Present Continuous)",
        "The system is verifying the data.",
        "Sistem verileri doğruluyor.",
        "Şimdiki zaman → “-yor”. Konuşma anında süren eylem.",
        ["is verifying", "are ", "am "]),
      card("has / have + V3 (Present Perfect)",
        "The system has verified the data.",
        "Sistem verileri doğruladı (etkisi sürüyor).",
        "Türkçede çoğunlukla “-di”; sonucu bugüne bağlar, zaman zarfı almaz.",
        ["has ", "have "]),
      card("has / have been + V-ing (Present Perfect Continuous)",
        "The system has been verifying the data for an hour.",
        "Sistem bir saattir verileri doğruluyor.",
        "for / since → “-dir / -dan beri” + “-yor”. Süreyi vurgular.",
        ["has been", "have been"]),
      card("V2 (Simple Past)",
        "The system verified the data.",
        "Sistem verileri doğruladı.",
        "Bitmiş geçmiş → “-di”. Bugünle bağı kurulmaz.",
        []),
      card("was / were + V-ing (Past Continuous)",
        "The system was verifying the data.",
        "Sistem verileri doğruluyordu.",
        "Geçmişte süren eylem → “-yordu”; kesen eylem V2 ile gelir.",
        ["was ", "were "]),
      card("had + V3 (Past Perfect)",
        "The system had verified the data.",
        "Sistem verileri doğrulamıştı.",
        "Geçmişin öncesi → “-mıştı”. İki geçmiş eylemden önce olanı gösterir.",
        ["had "]),
      card("will + V1 / will have + V3 (Future)",
        "The system will have verified the data by noon.",
        "Sistem öğlene kadar verileri doğrulamış olacak.",
        "will → “-ecek”; will have V3 → “-mış olacak” (gelecekte tamamlanmış).",
        ["will "])
    ]
  };

  if (typeof window !== 'undefined') window.TRANSLATION_RECIPES = RECIPES;
  if (typeof module !== 'undefined' && module.exports) module.exports = RECIPES;
})();
