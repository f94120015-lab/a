const fs = require('fs');
const path = require('path');

// 1. Raw Dataset for all 4 lessons of Unit 31
const rawData = {
  "1": {
    topicKey: "logical_connectors",
    title: "A. Mantıksal Çıkarım, Özet ve Netice Konnektörleri",
    formula: "Connector + Clause VEYA SVO + Connector + SVO",
    example: "Critical configuration components experienced intense simulation stress, and as a result, the primary cloud network suffered an unexpected latency spike.",
    description: "Cümleler arası mantıksal geçişler kuran, bir sürecin neticesini bildiren veya özetleyen bağlaçları içerir. <strong>as a result</strong>, <strong>in conclusion</strong>, <strong>so</strong> gibi yapılar kullanılır.",
    micro: [
      { en: "in conclusion", tr: "sonuç olarak", word: "in conclusion", options: ["in conclusion", "for example", "otherwise", "such as"] },
      { en: "as a result", tr: "sonuç olarak", word: "as a result", options: ["as a result", "by comparison", "even if", "in some cases"] },
      { en: "so", tr: "bu yüzden", word: "so", options: ["so", "otherwise", "the former", "by degrees"] },
      { en: "from this point of view", tr: "bu bakış açısından", word: "from this point of view", options: ["from this point of view", "on the whole", "of course", "such as"] },
      { en: "with this object in view", tr: "bu amaçla", word: "with this object in view", options: ["with this object in view", "as a result", "more or less", "for instance"] },
      { en: "as a whole", tr: "bir bütün olarak", word: "as a whole", options: ["as a whole", "on the whole", "of course", "otherwise"] },
      { en: "on the whole", tr: "genel olarak", word: "on the whole", options: ["on the whole", "as a whole", "of course", "otherwise"] },
      { en: "of course", tr: "elbette", word: "of course", options: ["of course", "in conclusion", "so", "even if"] },
      { en: "in conclusion the system stabilizes", tr: "sonuç olarak sistem kararlı hale gelir", word: "in conclusion", options: ["in conclusion", "for example", "otherwise", "such as"] },
      { en: "as a result of latency spikes", tr: "gecikme zirvelerinin bir sonucu olarak", word: "as a result", options: ["as a result", "by comparison", "even if", "in some cases"] },
      { en: "so that compilation errors manifest", tr: "böylece derleme hataları kendini gösterir", word: "so that", options: ["so that", "otherwise", "the former", "by degrees"] },
      { en: "from this point of view parameters shift", tr: "bu bakış açısından parametreler değişir", word: "from this point of view", options: ["from this point of view", "on the whole", "of course", "such as"] },
      { en: "with this object in view technicians isolate", tr: "bu amaçla teknisyenler izole eder", word: "with this object in view", options: ["with this object in view", "as a result", "more or less", "for instance"] },
      { en: "evaluated as a whole", tr: "bir bütün olarak değerlendirildiğinde", word: "as a whole", options: ["as a whole", "on the whole", "of course", "otherwise"] },
      { en: "on the whole stable infrastructure", tr: "genel olarak kararlı altyapı", word: "on the whole", options: ["on the whole", "as a whole", "of course", "otherwise"] },
      { en: "of course verified tokens", tr: "elbette doğrulanmış belirteçler", word: "of course", options: ["of course", "in conclusion", "so", "even if"] },
      { en: "in conclusion architecture reevaluation", tr: "sonuç olarak mimarinin yeniden değerlendirilmesi", word: "in conclusion", options: ["in conclusion", "for example", "otherwise", "such as"] },
      { en: "as a result of repository corruption", tr: "depo bozulmasının bir sonucu olarak", word: "as a result", options: ["as a result", "by comparison", "even if", "in some cases"] },
      { en: "so parameters remain unchanged", tr: "bu yüzden parametreler değişmeden kalır", word: "so", options: ["so", "otherwise", "the former", "by degrees"] },
      { en: "from this point of view data degrades", tr: "bu bakış açısından veri bozulur", word: "from this point of view", options: ["from this point of view", "on the whole", "of course", "such as"] }
    ],
    academic: [
      { en: "In conclusion, cross-disciplinary engineering groups must finalize the baseline documentation to prevent catastrophic server deployment failures.", tr: "Sonuç olarak, disiplinler arası mühendislik grupları, felaket niteliğindeki sunucu kurulum hatalarını önlemek için temel belgeleri nihai hale getirmelidir.", word: "In conclusion", options: ["In conclusion", "Otherwise", "For example", "Of course"] },
      { en: "Critical configuration components experienced intense simulation stress, and as a result, the primary cloud network suffered an unexpected latency spike.", tr: "Kritik yapılandırma bileşenleri yoğun simülasyon stresi yaşadı ve sonuç olarak, birincil bulut ağı beklenmedik bir gecikme zirvesiyle karşılaştı.", word: "as a result", options: ["as a result", "by comparison", "even if", "in some cases"] },
      { en: "The unoptimized query script saturated the database layer, so the automated compiler automatically generated a critical processing flag.", tr: "Optimize edilmemiş sorgu betiği veritabanı katmanını doyurdu, bu yüzden otomatik derleyici otomatik olarak kritik bir işlem bayrağı oluşturdu.", word: "so", options: ["so", "otherwise", "the former", "by degrees"] },
      { en: "From this point of view, persistent server degradation represents a structural vulnerability rather than a temporary runtime configuration glitch.", tr: "Bu bakış açısından, sürekli sunucu bozulması, geçici bir çalışma zamanı yapılandırma hatasından ziyade yapısal bir güvenlik açığını temsil eder.", word: "From this point of view", options: ["From this point of view", "On the whole", "Of course", "Even if"] },
      { en: "The technical unit treated the unreinforced support pillars with synthetic resin, and with this object in view, they monitored moisture variation channels.", tr: "Teknik birim, takviye edilmemiş destek sütunlarını sentetik reçine ile işledi ve bu amaçla nem değişim kanallarını izlediler.", word: "with this object in view", options: ["with this object in view", "as a result", "more or less", "for instance"] },
      { en: "When we evaluate the decentralized cloud network infrastructure as a whole, the integration of multi-layer encryption parameters appears highly successful.", tr: "Merkeziyetsiz bulut ağı altyapısını bir bütün olarak değerlendirdiğimizde, çok katmanlı şifreleme parametrelerinin entegrasyonu son derece başarılı görünüyor.", word: "as a whole", options: ["as a whole", "on the whole", "of course", "otherwise"] },
      { en: "On the whole, the updated software application build operates efficiently despite experiencing minor navigation lag thresholds over the weekend.", tr: "Genel olarak, güncellenmiş yazılım uygulaması sürümü, hafta sonu küçük gezinme gecikme eşikleri yaşamasına rağmen verimli bir şekilde çalışmaktadır.", word: "On the whole", options: ["On the whole", "As a whole", "Of course", "Otherwise"] },
      { en: "Of course, authenticated client profiles can bypass traditional security firewalls provided that their cryptographic tokens grant clearance parameters.", tr: "Elbette, kimliği doğrulanmış istemci profilleri, şifreleme belirteçlerinin izin parametreleri sağlaması koşuluyla geleneksel güvenlik duvarlarını devre dışı bırakabilir.", word: "Of course", options: ["Of course", "In conclusion", "So", "Even if"] },
      { en: "In conclusion, regional municipalities must manage increasingly finite resources strategically to support ongoing infrastructure expansion models.", tr: "Sonuç olarak, bölgesel belediyeler, devam eden altyapı genişletme modellerini desteklemek için giderek sınırlı hale gelen kaynakları stratejik olarak yönetmelidir.", word: "In conclusion", options: ["In conclusion", "Otherwise", "For example", "Of course"] },
      { en: "The database migration routine triggered extensive formatting discrepancies, and as a result, frontend developers rolled back the entire system directory.", tr: "Veritabanı geçiş rutini kapsamlı biçimlendirme tutarsızlıklarını tetikledi ve sonuç olarak, ön uç geliştiricileri tüm sistem dizinini geri aldı.", word: "as a result", options: ["as a result", "by comparison", "even if", "in some cases"] },
      { en: "The statutory draft clauses were significantly faulty, so national state ministers rejected the institutional policy file without further voting rounds.", tr: "Yasal taslak maddeleri oylama yapılmadan önce önemli ölçüde kusurluydu, bu yüzden ulusal eyalet bakanları kurumsal politika dosyasını reddetti.", word: "so", options: ["so", "otherwise", "the former", "by degrees"] },
      { en: "From this point of view, validating empirical datasets meticulously before the platform synchronization loop initiates is an absolute pedagogical necessity.", tr: "Bu bakış açısından, platform senkronizasyon döngüsü başlamadan önce ampirik veri kümelerini titizlikle doğrulamak mutlak bir pedagojik gerekliliktir.", word: "From this point of view", options: ["From this point of view", "On the whole", "Of course", "Even if"] },
      { en: "Engineers isolated the unsealed core container, and with this object in view, they established strict thermal validation boundaries inside the incubator.", tr: "Mühendisler mühürlenmemiş çekirdek konteynerini izole ettiler ve bu amaçla inkübatörün içinde katı termal doğrulama sınırları oluşturdular.", word: "with this object in view", options: ["with this object in view", "as a result", "more or less", "for instance"] },
      { en: "The constitutional committee analyzed the administrative compliance guidelines as a whole before enforcing rigid resource caps across provinces.", tr: "Anayasa komitesi, eyaletler genelinde katı kaynak sınırları uygulamadan önce idari uyum yönergelerini bir bütün olarak analiz etti.", word: "as a whole", options: ["as a whole", "on the whole", "of course", "otherwise"] },
      { en: "On the whole, the qualitative monographs published by university professors provide a robust theoretical framework for modern syntax research.", tr: "Genel olarak, üniversite profesörleri tarafından yayınlanan nitel monografiler, modern söz dizimi araştırmaları için güçlü bir teorik çerçeve sunmaktadır.", word: "On the whole", options: ["On the whole", "As a whole", "Of course", "Otherwise"] },
      { en: "Of course, volatile chemical compounds undergo rapid exothermic degradation whenever junior laboratory technicians expose containers to direct sunlight.", tr: "Elbette, uçucu kimyasal bileşikler, yardımcı laboratuvar teknisyenleri kapları doğrudan güneş ışığına maruz bıraktığında hızlı ekzotermik bozunmaya uğrar.", word: "Of course", options: ["Of course", "In conclusion", "So", "Even if"] },
      { en: "In conclusion, resolving existing structural constraints is the only viable method to minimize computational transaction failures permanently.", tr: "Sonuç olarak, mevcut yapısal kısıtlamaları çözmek, işlemsel işlem başarısızlıklarını kalıcı olarak en aza indirmenin tek uygulanabilir yöntemidir.", word: "In conclusion", options: ["In conclusion", "Otherwise", "For example", "Of course"] },
      { en: "The digital repository archive experienced a massive infusion of raw scanned document PDFs, and as a result, storage space diminished rapidly.", tr: "Dijital depo arşivi, ham taranmış belge PDF'lerinin yoğun akışını yaşadı ve sonuç olarak, depolama alanı hızla azaldı.", word: "as a result", options: ["as a result", "by comparison", "even if", "in some cases"] },
      { en: "The parsing algorithm functions precisely, so even the smallest syntax formatting variations are flagged by the system automatically.", tr: "Ayrıştırma algoritması tam olarak çalışır, bu yüzden en küçük sözdizimi biçimlendirme varyasyonları bile sistem tarafından otomatik olarak işaretlenir.", word: "so", options: ["so", "otherwise", "the former", "by degrees"] },
      { en: "From this point of view, corporate entity investment packages must be redistributed evenly to ensure full regulatory alignment across sectors.", tr: "Bu bakış açısından, sektörler arasında tam yasal uyumu sağlamak için kurumsal yatırım paketleri eşit olarak yeniden dağıtılmalıdır.", word: "From this point of view", options: ["From this point of view", "On the whole", "Of course", "Even if"] }
    ]
  },
  "2": {
    topicKey: "reference_examples",
    title: "B. Referans, Örneklendirme ve Açıklama Kalıpları",
    formula: "SVO + such as + Noun Phrase VEYA for example / for instance",
    example: "Advanced technical frameworks require strict compliance codes to regulate volatile dimensions such as boundary parameter shifts and transaction failures.",
    description: "Akademik metinlerde karmaşık teorileri somutlaştırmak, örnekler vermek veya bir önceki ifadeyi açıklamak için kullanılan yapılardır. <strong>such as</strong>, <strong>for example</strong>, <strong>for instance</strong>, <strong>that is (to say)</strong> gibi köprüler kurulur.",
    micro: [
      { en: "the former", tr: "ilki / önceki", word: "the former", options: ["the former", "the latter", "such as", "by comparison"] },
      { en: "the latter", tr: "ikincisi / sonraki", word: "the latter", options: ["the latter", "the former", "such as", "by comparison"] },
      { en: "such as", tr: "gibi", word: "such as", options: ["such as", "for example", "that is to say", "by comparison"] },
      { en: "for example", tr: "örneğin", word: "for example", options: ["for example", "such as", "that is to say", "by comparison"] },
      { en: "for instance", tr: "örneğin", word: "for instance", options: ["for instance", "such as", "that is to say", "by comparison"] },
      { en: "that is (to say)", tr: "yani / diğer bir deyişle", word: "that is (to say)", options: ["that is (to say)", "such as", "by comparison", "the former"] },
      { en: "by comparison", tr: "kıyasla", word: "by comparison", options: ["by comparison", "such as", "the former", "the latter"] },
      { en: "that is the primary framework", tr: "yani birincil çerçevedir", word: "that is", options: ["that is", "such as", "by comparison", "the former"] },
      { en: "by comparison highly unstable", tr: "kıyasla son derece kararsız", word: "by comparison", options: ["by comparison", "such as", "the former", "the latter"] },
      { en: "elements such as data parameters", tr: "veri parametreleri gibi unsurlar", word: "such as", options: ["such as", "for example", "that is to say", "by comparison"] },
      { en: "for example compilation errors", tr: "örneğin derleme hataları", word: "for example", options: ["for example", "such as", "that is to say", "by comparison"] },
      { en: "for instance memory leakage", tr: "örneğin bellek sızıntısı", word: "for instance", options: ["for instance", "such as", "that is to say", "by comparison"] },
      { en: "identifying the former", tr: "ilkini tanımlama", word: "the former", options: ["the former", "the latter", "such as", "by comparison"] },
      { en: "refactoring the latter", tr: "ikincisini yeniden yapılandırma", word: "the latter", options: ["the latter", "the former", "such as", "by comparison"] },
      { en: "such as volatile mixtures", tr: "uçucu karışımlar gibi", word: "such as", options: ["such as", "for example", "that is to say", "by comparison"] },
      { en: "for example unconstitutional measures", tr: "örneğin anayasaya aykırı tedbirler", word: "for example", options: ["for example", "such as", "that is to say", "by comparison"] },
      { en: "for instance statutory amendments", tr: "örneğin yasal değişiklikler", word: "for instance", options: ["for instance", "such as", "that is to say", "by comparison"] },
      { en: "that is to say baseline configurations", tr: "yani temel yapılandırmalar", word: "that is to say", options: ["that is to say", "such as", "by comparison", "the former"] },
      { en: "by comparison secure partitions", tr: "kıyasla güvenli bölümler", word: "by comparison", options: ["by comparison", "such as", "the former", "the latter"] },
      { en: "selecting the latter options", tr: "ikinci seçenekleri seçme", word: "the latter", options: ["the latter", "the former", "such as", "by comparison"] }
    ],
    academic: [
      { en: "The development team analyzed both the local database schema and the cloud repository, but the former displayed far more formatting discrepancies.", tr: "Geliştirme ekibi hem yerel veritabanı şemasını hem de bulut deposunu analiz etti, ancak ilki çok daha fazla biçimlendirme tutarsızlığı gösterdi.", word: "the former", options: ["the former", "the latter", "such as", "by comparison"] },
      { en: "Technicians inspected the hardware processing layer and the software synchronization module, discovering that the latter caused persistent system latency.", tr: "Teknisyenler, donanım işleme katmanını ve yazılım senkronizasyon modülünü incelediler ve ikincisinin sürekli sistem gecikmesine neden olduğunu keşfettiler.", word: "the latter", options: ["the latter", "the former", "such as", "by comparison"] },
      { en: "Advanced technical frameworks require strict compliance codes to regulate volatile dimensions such as boundary parameter shifts and transaction failures.", tr: "Gelişmiş teknik çerçeveler, sınır parametresi kaymaları ve işlem başarısızlıkları gibi uçucu boyutları düzenlemek için katı uyum kuralları gerektirir.", word: "such as", options: ["such as", "for example", "that is to say", "by comparison"] },
      { en: "For example, loose query loops frequently saturate decentralized cloud partitions, triggering catastrophic execution bottlenecks over the weekend.", tr: "Örneğin, gevşek sorgu döngüleri merkeziyetsiz bulut bölümlerini sıklıkla doyurur ve hafta sonu felaket niteliğinde yürütme darboğazlarını tetikler.", word: "For example", options: ["For example", "Such as", "That is to say", "By comparison"] },
      { en: "For instance, intense moisture variations inside testing chambers can accelerate the material decay of delicate core components quite rapidly.", tr: "Örneğin, test odalarının içindeki yoğun nem değişimleri, hassas çekirdek bileşenlerinin malzeme bozulmasını oldukça hızlı bir şekilde hızlandırabilir.", word: "For instance", options: ["For instance", "Such as", "That is to say", "By comparison"] },
      { en: "The automated compiler rejected the unverified dataset; that is to say, the source code lacked the required cryptographic token validation.", tr: "Otomatik derleyici doğrulanmamış veri kümesini reddetti; yani kaynak kodda gerekli şifreleme belirteci doğrulaması eksikti.", word: "that is to say", options: ["that is to say", "such as", "by comparison", "the former"] },
      { en: "The legacy network layout suffered from constant navigation lag, but by comparison, the newly refactored build operates seamlessly.", tr: "Eski ağ düzeni sürekli gezinme gecikmesinden muzdaripti, ancak kıyasla, yeni yeniden yapılandırılan sürüm sorunsuz çalışıyor.", word: "by comparison", options: ["by comparison", "such as", "the former", "the latter"] },
      { en: "Programmers must differentiate between syntax errors and runtime glitches, as the former prevent compilation while the latter cause memory leakage.", tr: "Programcılar sözdizimi hataları ile çalışma zamanı hataları arasında ayrım yapmalıdır, çünkü ilki derlemeyi engellerken ikincisi bellek sızıntısına neden olur.", word: "the former", options: ["the former", "the latter", "such as", "by comparison"] },
      { en: "Certified contractors must avoid utilizing sub-standard composite materials such as unreinforced synthetic resins during bridge infrastructure construction.", tr: "Sertifikalı yükleniciler, köprü altyapısı inşaatı sırasında takviye edilmemiş sentetik reçineler gibi standart altı kompozit malzemeleri kullanmaktan kaçınmalıdır.", word: "such as", options: ["such as", "for example", "that is to say", "by comparison"] },
      { en: "State ministers can enforce various administrative penalties; for example, they can postpone legislative voting rounds or suspend corporate asset clearance.", tr: "Eyalet bakanları çeşitli idari cezalar uygulayabilir; örneğin, yasama oylama turlarını erteleyebilirler veya kurumsal varlık iznini askıya alabilirler.", word: "for example", options: ["for example", "such as", "that is to say", "by comparison"] },
      { en: "High-volume traffic surges create severe processing hazards; for instance, a sudden influx of anonymous external entries can compromise client profiles.", tr: "Yüksek hacimli trafik dalgalanmaları ciddi işlem tehlikeleri yaratır; örneğin, anonim harici girişlerin ani akışı istemci profillerini tehlikeye atabilir.", word: "for instance", options: ["for instance", "such as", "that is to say", "by comparison"] },
      { en: "The regional survey revealed exceptionally poor performance indicators; that is, the central bank failed to regulate domestic asset valuations.", tr: "Bölgesel anket son derece zayıf performans göstergeleri ortaya koydu; yani, merkez bankası yerel varlık değerlemelerini düzenleyemedi.", word: "that is", options: ["that is", "such as", "by comparison", "the former"] },
      { en: "The empirical physics experiment failed under direct sunlight, but by comparison, it succeeded inside the temperature-controlled vacuum incubator.", tr: "Ampirik fizik deneyi doğrudan güneş ışığı altında başarısız oldu, ancak kıyasla, sıcaklık kontrollü vakumlu inkübatörün içinde başarılı oldu.", word: "by comparison", options: ["by comparison", "such as", "the former", "the latter"] },
      { en: "The system architect evaluated the cloud directory and the physical server backup, choosing to optimize the former to reduce operational costs.", tr: "Sistem mimarı bulut dizinini ve fiziksel sunucu yedeğini değerlendirdi ve işletme maliyetlerini azaltmak için ilkini optimize etmeyi seçti.", word: "the former", options: ["the former", "the latter", "such as", "by comparison"] },
      { en: "The legal committee reviewed the legislative draft and the final statutory amendment, deciding to publish the latter in the national registry.", tr: "Hukuk komitesi yasal taslağı ve nihai yasal değişikliği gözden geçirdi ve ikincisini ulusal sicilde yayınlamaya karar verdi.", word: "the latter", options: ["the latter", "the former", "such as", "by comparison"] },
      { en: "Gamified mobile learning applications utilize interactive tools such as slot machines, projektor modes, and reflex blitz tünels to teach syntax.", tr: "Oyunlaştırılmış mobil öğrenme uygulamaları, söz dizimini öğretmek için slot makineleri, projektör modları ve refleks blitz tünelleri gibi etkileşimli araçlar kullanır.", word: "such as", options: ["such as", "for example", "that is to say", "by comparison"] },
      { en: "For example, regional municipalities often struggle to implement uniform policy codes when resource parameters grow increasingly finite.", tr: "Örneğin, kaynak parametreleri giderek sınırlı hale geldiğinde, bölgesel belediyeler genellikle tek tip politika kurallarını uygulamakta zorlanırlar.", word: "For example", options: ["For example", "Such as", "That is to say", "By comparison"] },
      { en: "For instance, a single unauthenticated connection profile can trigger an immediate firewall block across all decentralized computing nodes.", tr: "Örneğin, tek bir kimliği doğrulanmamış bağlantı profili, tüm merkeziyetsiz hesaplama düğümlerinde anında bir güvenlik duvarı engellemesini tetikleyebilir.", word: "For instance", options: ["For instance", "Such as", "That is to say", "By comparison"] },
      { en: "The parsing algorithm modifies raw binary files directly; that is to say, it refactors metadata parameters without human supervision.", tr: "Ayrıştırma algoritması ham ikili dosyaları doğrudan değiştirir; yani insan denetimi olmadan meta veri parametrelerini yeniden yapılandırır.", word: "that is to say", options: ["that is to say", "such as", "by comparison", "the former"] },
      { en: "The initial stress simulation produced extensive calculation overrides, but by comparison, the second testing phase was perfectly aligned.", tr: "İlk stres simülasyonu geniş kapsamlı hesaplama geçersiz kılmaları üretti, ancak kıyasla, ikinci test aşaması mükemmel şekilde hizalandı.", word: "by comparison", options: ["by comparison", "such as", "the former", "the latter"] }
    ]
  },
  "3": {
    topicKey: "conditional_adverbs",
    title: "C. Durumsal Koşul ve İhtimal Zarf Cümlecikleri",
    formula: "even if + Clause, Main Clause VEYA SVO; otherwise, SVO",
    example: "Even if agile frontend developers optimize application builds thoroughly, hardware constraints on older mobile devices will still display lag.",
    description: "Teknik veya akademik kurgularda istisnai durumları, sakıncalı olasılıkları veya genel eğilimlerin dışındaki senaryoları (<strong>even if</strong>, <strong>otherwise</strong>, <strong>in many cases</strong>, <strong>in some cases</strong>) kurgular.",
    micro: [
      { en: "even if", tr: "bile olsa", word: "even if", options: ["even if", "otherwise", "in many cases", "in some cases"] },
      { en: "otherwise", tr: "aksi takdirde", word: "otherwise", options: ["otherwise", "even if", "in many cases", "in some cases"] },
      { en: "in many cases", tr: "çoğu durumda", word: "in many cases", options: ["in many cases", "in some cases", "even if", "otherwise"] },
      { en: "in some cases", tr: "bazı durumlarda", word: "in some cases", options: ["in some cases", "in many cases", "even if", "otherwise"] },
      { en: "even if parameters shift", tr: "parametreler değişse bile", word: "even if", options: ["even if", "otherwise", "in many cases", "in some cases"] },
      { en: "otherwise compilation fails", tr: "aksi takdirde derleme başarısız olur", word: "otherwise", options: ["otherwise", "even if", "in many cases", "in some cases"] },
      { en: "in many cases stable", tr: "çoğu durumda kararlı", word: "in many cases", options: ["in many cases", "in some cases", "even if", "otherwise"] },
      { en: "in some cases corrupted", tr: "bazı durumlarda bozulmuş", word: "in some cases", options: ["in some cases", "in many cases", "even if", "otherwise"] },
      { en: "even if firewalls block access", tr: "güvenlik duvarları erişimi engellese bile", word: "even if", options: ["even if", "otherwise", "in many cases", "in some cases"] },
      { en: "otherwise system crashes unexpectedly", tr: "aksi takdirde sistem beklenmedik şekilde çöker", word: "otherwise", options: ["otherwise", "even if", "in many cases", "in some cases"] },
      { en: "in many cases validation anomalies manifest", tr: "çoğu durumda doğrulama anomalileri kendini gösterir", word: "in many cases", options: ["in many cases", "in some cases", "even if", "otherwise"] },
      { en: "in some cases metrics decline sharply", tr: "bazı durumlarda metrikler keskin bir şekilde düşer", word: "in some cases", options: ["in some cases", "in many cases", "even if", "otherwise"] },
      { en: "even if documentation is finalized", tr: "belgeler nihai hale getirilse bile", word: "even if", options: ["even if", "otherwise", "in many cases", "in some cases"] },
      { en: "otherwise modify baseline structures", tr: "aksi takdirde temel yapıları değiştirin", word: "otherwise", options: ["otherwise", "even if", "in many cases", "in some cases"] },
      { en: "in many cases efficient operations", tr: "çoğu durumda verimli operasyonlar", word: "in many cases", options: ["in many cases", "in some cases", "even if", "otherwise"] },
      { en: "in some cases unconstitutional measures", tr: "bazı durumlarda anayasaya aykırı tedbirler", word: "in some cases", options: ["in some cases", "in many cases", "even if", "otherwise"] },
      { en: "even if the mixture explodes", tr: "karışım patlasa bile", word: "even if", options: ["even if", "otherwise", "in many cases", "in some cases"] },
      { en: "otherwise isolate core containers", tr: "aksi takdirde çekirdek konteynerleri izole edin", word: "otherwise", options: ["otherwise", "even if", "in many cases", "in some cases"] },
      { en: "in many cases technical modifications help", tr: "çoğu durumda teknik değişiklikler yardımcı olur", word: "in many cases", options: ["in many cases", "in some cases", "even if", "otherwise"] },
      { en: "in some cases navigation lag occurs", tr: "bazı durumlarda gezinme gecikmesi meydana gelir", word: "in some cases", options: ["in some cases", "in many cases", "even if", "otherwise"] }
    ],
    academic: [
      { en: "Even if agile frontend developers optimize application builds thoroughly, hardware constraints on older mobile devices will still display lag.", tr: "Çevik ön uç geliştiricileri uygulama sürümlerini derinlemesine optimize etseler bile, eski mobil cihazlardaki donanım kısıtlamaları yine de gecikme gösterecektir.", word: "Even if", options: ["Even if", "Otherwise", "In many cases", "In some cases"] },
      { en: "Database administrators must clear redundant server logs periodically; otherwise, extensive formatting discrepancies will trigger compilation errors.", tr: "Veritabanı yöneticileri gereksiz sunucu günlüklerini periyodik olarak temizlemelidir; aksi takdirde, kapsamlı biçimlendirme tutarsızlıkları derleme hatalarını tetikleyecektir.", word: "otherwise", options: ["otherwise", "even if", "in many cases", "in some cases"] },
      { en: "In many cases, systematic validation anomalies stem directly from loose query loops that lack adaptive multi-layer token configurations.", tr: "Çoğu durumda, sistemik doğrulama anomalileri, uyarlanabilir çok katmanlı belirteç yapılandırmalarından yoksun gevşek sorgu döngülerinden doğrudan kaynaklanır.", word: "In many cases", options: ["In many cases", "In some cases", "Even if", "Otherwise"] },
      { en: "In some cases, unauthenticated external entry traces manage to bypass the primary security firewall layer during weekend traffic rushes.", tr: "Bazı durumlarda, kimliği doğrulanmamış harici giriş izleri hafta sonu trafik yoğunlukları sırasında birincil güvenlik duvarı katmanını atlatmayı başarır.", word: "In some cases", options: ["In some cases", "In many cases", "Even if", "Otherwise"] },
      { en: "Even if the constitutional committee updates the administrative policy codes, regional municipalities will struggle to enforce guidelines uniformly.", tr: "Anayasa komitesi idari politika kurallarını güncellese bile, bölgesel belediyeler kılavuz ilkeleri tek tip olarak uygulamakta zorlanacaktır.", word: "Even if", options: ["Even if", "Otherwise", "In many cases", "In some cases"] },
      { en: "Maintenance technicians must maintain strict thermal boundaries inside the vacuum incubator; otherwise, the volatile compound might explode safely.", tr: "Bakım teknisyenleri vakumlu inkübatörün içinde katı termal sınırlar sağlamalıdır; aksi takdirde, uçucu bileşik güvenli bir şekilde patlayabilir.", word: "otherwise", options: ["otherwise", "even if", "in many cases", "in some cases"] },
      { en: "In many cases, cross-disciplinary engineering groups prefer decentralized cloud architectures because they minimize transaction failure metrics effectively.", tr: "Çoğu durumda, disiplinler arası mühendislik grupları, işlem başarısızlık metriklerini etkili bir şekilde en aza indirdikleri için merkeziyetsiz bulut mimarilerini tercih ederler.", word: "In many cases", options: ["In many cases", "In some cases", "Even if", "Otherwise"] },
      { en: "In some cases, raw binary tracking logs reveal that anonymous client profiles attempted to modify the baseline reference documentation.", tr: "Bazı durumlarda, ham ikili izleme günlükleri, anonim istemci profillerinin temel referans belgelerini değiştirmeye çalıştığını ortaya koymaktadır.", word: "In some cases", options: ["In some cases", "In many cases", "Even if", "Otherwise"] },
      { en: "Even if cryptographic validation tokens grant clearance parameters automatically, the transaction gateway requires secondary human verification codes.", tr: "Şifreleme doğrulama belirteçleri izin parametrelerini otomatik olarak verse bile, işlem geçidi ikincil insan doğrulama kodları gerektirir.", word: "Even if", options: ["Even if", "Otherwise", "In many cases", "In some cases"] },
      { en: "Project coordinators must secure continuous corporate investment infusions; otherwise, the platform migration cycle will be abandoned prematurely.", tr: "Proje koordinatörleri sürekli kurumsal yatırım akışı sağlamalıdır; aksi takdirde, platform geçiş döngüsü zamanından önce iptal edilecektir.", word: "otherwise", options: ["otherwise", "even if", "in many cases", "in some cases"] },
      { en: "In many cases, university professors publish qualitative monographs to establish uniform standards for advanced grammar pedagogy frameworks.", tr: "Çoğu durumda, üniversite profesörleri, ileri düzey dil bilgisi pedagojisi çerçeveleri için tek tip standartlar oluşturmak amacıyla nitel monografiler yayınlarlar.", word: "In many cases", options: ["In many cases", "In some cases", "Even if", "Otherwise"] },
      { en: "In some cases, intense moisture exposure beneath the structural layer causes rapid file degradation across historical digital archives.", tr: "Bazı durumlarda, yapısal katmanın altındaki yoğun neme maruz kalma, tarihi dijital arşivlerde hızlı dosya bozulmasına neden olur.", word: "In some cases", options: ["In some cases", "In many cases", "Even if", "Otherwise"] },
      { en: "Even if the central bank fails to regulate domestic asset valuations, international trade tariff parameters can stabilize corporate entities.", tr: "Merkez bankası yerel varlık değerlemelerini düzenlemeyi başaramasa bile, uluslararası ticaret tarifesi parametreleri kurumsal varlıkları istikrara kavuşturabilir.", word: "Even if", options: ["Even if", "Otherwise", "In many cases", "In some cases"] },
      { en: "Software compilers must refactor unoptimized source code blocks immediately; otherwise, the entire processing layer will experience latency thresholds.", tr: "Yazılım derleyicileri optimize edilmemiş kaynak kodu bloklarını derhal yeniden yapılandırmalıdır; aksi takdirde, tüm işlem katmanı gecikme eşikleri yaşayacaktır.", word: "otherwise", options: ["otherwise", "even if", "in many cases", "in some cases"] },
      { en: "In many cases, certified data practitioners can compensate for calculation overrides manually without halting the live automation pipeline.", tr: "Çoğu durumda, sertifikalı veri uygulayıcıları, canlı otomasyon hattını durdurmadan hesaplama geçersiz kılmalarını manuel olarak telafi edebilirler.", word: "In many cases", options: ["In many cases", "In some cases", "Even if", "Otherwise"] },
      { en: "Specialized medical clinics must evaluate active patient performance indicators carefully; otherwise, performing the complex operation remains highly hazardous.", tr: "Uzman tıp klinikleri aktif hasta performans göstergelerini dikkatle değerlendirmelidir; aksi takdirde, karmaşık operasyonu gerçekleştirmek son derece tehlikeli olmaya devam eder.", word: "otherwise", options: ["otherwise", "even if", "in many cases", "in some cases"] },
      { en: "In some cases, regional legislative assemblies choose to postpone further voting rounds due to persistent public unrest across provinces.", tr: "Bazı durumlarda, bölgesel yasama meclisleri, eyaletler genelinde devam eden kamu huzursuzluğu nedeniyle daha fazla oylama turunu ertelemeyi tercih etmektedir.", word: "In some cases", options: ["In some cases", "In many cases", "Even if", "Otherwise"] },
      { en: "Even if corporate production targets decline sharply next quarter, the technology startup possesses enough capital expenditure to survive.", tr: "Kurumsal üretim hedefleri önümüzdeki çeyrekte keskin bir şekilde düşse bile, teknoloji girişimi hayatta kalmak için yeterli sermaye harcamasına sahiptir.", word: "Even if", options: ["Even if", "Otherwise", "In many cases", "In some cases"] },
      { en: "Automated backup networks must clone parameter files before the synchronization loop initializes; otherwise, data degrades continuously during transfers.", tr: "Otomatik yedekleme ağları, senkronizasyon döngüsü başlamadan önce parametre dosyalarını klonlamalıdır; aksi takdirde, aktarımlar sırasında veri sürekli bozulur.", word: "otherwise", options: ["otherwise", "even if", "in many cases", "in some cases"] },
      { en: "In many cases, installing high-efficiency catalytic filters inside the testing chambers helps reduce toxic emission indicators dramatically.", tr: "Çoğu durumda, test odalarının içine yüksek verimli katalitik filtreler yerleştirmek, toksik emisyon göstergelerini önemli ölçüde azaltmaya yardımcı olur.", word: "In many cases", options: ["In many cases", "In some cases", "Even if", "Otherwise"] }
    ]
  },
  "4": {
    topicKey: "quantifiers",
    title: "D. Zaman, Derece ve Nicelik Belirteçleri (Quantifiers)",
    formula: "by degrees / little by little / in recent years / most of / a number of + Noun",
    example: "In recent years, cross-disciplinary engineering groups have focused heavily on building adaptive multi-layer cloud database configurations.",
    description: "Akademik metinlerde miktar, derece ve zamansal süreç gelişimini (<strong>by degrees</strong>, <strong>little by little</strong>, <strong>in recent years</strong>, <strong>most of</strong>, <strong>a large number of</strong>) belirleyen yapılardır.",
    micro: [
      { en: "by degrees", tr: "kademe kademe", word: "by degrees", options: ["by degrees", "little by little", "more or less", "a great deal"] },
      { en: "little by little", tr: "yavaş yavaş", word: "little by little", options: ["little by little", "by degrees", "more or less", "mostly"] },
      { en: "in recent years", tr: "son yıllarda", word: "in recent years", options: ["in recent years", "in recent times", "a great deal", "mostly"] },
      { en: "in recent times", tr: "son zamanlarda", word: "in recent times", options: ["in recent times", "in recent years", "a good deal", "mostly"] },
      { en: "more or less", tr: "aşağı yukarı", word: "more or less", options: ["more or less", "by degrees", "little by little", "a great deal"] },
      { en: "a great deal", tr: "büyük ölçüde", word: "a great deal", options: ["a great deal", "a good deal", "more or less", "mostly"] },
      { en: "a good deal", tr: "epeyce", word: "a good deal", options: ["a good deal", "a great deal", "more or less", "mostly"] },
      { en: "most of", tr: "çoğu", word: "most of", options: ["most of", "mostly", "a number of", "a large number of"] },
      { en: "mostly", tr: "çoğunlukla", word: "mostly", options: ["mostly", "most of", "a number of", "a large number of"] },
      { en: "a number of", tr: "birçok", word: "a number of", options: ["a number of", "a large number of", "most of", "mostly"] },
      { en: "a large number of", tr: "çok sayıda", word: "a large number of", options: ["a large number of", "a number of", "most of", "mostly"] },
      { en: "degrading by degrees", tr: "kademe kademe bozulan", word: "by degrees", options: ["by degrees", "little by little", "more or less", "a great deal"] },
      { en: "improving little by little", tr: "yavaş yavaş gelişen", word: "little by little", options: ["little by little", "by degrees", "more or less", "mostly"] },
      { en: "implemented in recent years", tr: "son yıllarda uygulanan", word: "in recent years", options: ["in recent years", "in recent times", "a great deal", "mostly"] },
      { en: "shifting more or less", tr: "aşağı yukarı değişen", word: "more or less", options: ["more or less", "by degrees", "little by little", "a great deal"] },
      { en: "a great deal of stress", tr: "büyük miktarda stres", word: "a great deal of", options: ["a great deal of", "a good deal of", "most of", "mostly"] },
      { en: "a good deal of data", tr: "epeyce veri", word: "a good deal of", options: ["a good deal of", "a great deal of", "most of", "mostly"] },
      { en: "most of the unverified datasets", tr: "doğrulanmamış veri kümelerinin çoğu", word: "most of", options: ["most of", "mostly", "a number of", "a large number of"] },
      { en: "mostly stable infrastructure", tr: "çoğunlukla kararlı altyapı", word: "mostly", options: ["mostly", "most of", "a number of", "a large number of"] },
      { en: "a large number of compilation errors", tr: "çok sayıda derleme hatası", word: "a large number of", options: ["a large number of", "a number of", "most of", "mostly"] }
    ],
    academic: [
      { en: "The unreinforced server support pillars suffered from moisture decay, degrading by degrees until the technical unit replaced the core structures.", tr: "Takviye edilmemiş sunucu destek sütunları nem bozulmasından muzdaripti ve teknik birim çekirdek yapıları değiştirene kadar kademe kademe bozuldu.", word: "by degrees", options: ["by degrees", "little by little", "more or less", "a great deal"] },
      { en: "The language application development interface improved little by little as frontend programmers resolved persistent navigation lag issues.", tr: "Ön uç programcıları kalıcı gezinme gecikmesi sorunlarını çözdükçe, dil uygulaması geliştirme arayüzü yavaş yavaş gelişti.", word: "little by little", options: ["little by little", "by degrees", "more or less", "mostly"] },
      { en: "In recent years, cross-disciplinary engineering groups have focused heavily on building adaptive multi-layer cloud database configurations.", tr: "Son yıllarda, disiplinler arası mühendislik grupları, uyarlanabilir çok katmanlı bulut veritabanı yapılandırmaları oluşturmaya büyük ölçüde odaklanmıştır.", word: "In recent years", options: ["In recent years", "In recent times", "A great deal", "Mostly"] },
      { en: "In recent times, regional state departments have enforced exceptionally rigid guidelines concerning international trade tariff parameters.", tr: "Son zamanlarda, bölgesel eyalet departmanları, uluslararası ticaret tarifesi parametrelerine ilişkin son derece katı kurallar uygulamıştır.", word: "In recent times", options: ["In recent times", "In recent years", "A good deal", "Mostly"] },
      { en: "The freshly updated system layout design is more or less perfectly aligned with the compliance criteria finalized by the architect.", tr: "Yeni güncellenen sistem düzeni tasarımı, mimar tarafından nihai hale getirilen uyumluluk kriterleriyle aşağı yukarı mükemmel şekilde uyumludur.", word: "more or less", options: ["more or less", "by degrees", "little by little", "a great deal"] },
      { en: "Managing decentralized computing nodes under high-volume transaction traffic conditions requires a great deal of automated processing field space.", tr: "Yüksek hacimli işlem trafiği koşulları altında merkeziyetsiz hesaplama düğümlerini yönetmek, büyük ölçüde otomatik işlem alanı gerektirir.", word: "a great deal", options: ["a great deal", "a good deal", "more or less", "mostly"] },
      { en: "The head scientific investigator compiled a good deal of empirical evidence before presenting the qualitative monograph to the assembly.", tr: "Baş bilimsel araştırmacı, nitel monografiyi meclise sunmadan önce epeyce ampirik kanıt derledi.", word: "a good deal", options: ["a good deal", "a great deal", "more or less", "mostly"] },
      { en: "Most of the unverified datasets produced serious validation anomalies because the local database schema lacked multi-layer tokens.", tr: "Doğrulanmamış veri kümelerinin çoğu, yerel veritabanı şemasında çok katmanlı belirteçler bulunmadığı için ciddi doğrulama anomalileri üretti.", word: "Most of", options: ["Most of", "Mostly", "A number of", "A large number of"] },
      { en: "The tracking logs extracted from the restricted server partition were mostly composed of anonymous external entry trace profiles.", tr: "Kısıtlanmış sunucu bölümünden çıkarılan izleme günlükleri çoğunlukla anonim harici giriş izi profillerinden oluşuyordu.", word: "mostly", options: ["mostly", "most of", "a number of", "a large number of"] },
      { en: "A number of certified contractors expressed deep dissatisfaction when the municipal corporation suddenly altered the project timeline parameters.", tr: "Belediye şirketi aniden proje zaman çizelgesi parametrelerini değiştirdiğinde bir dizi sertifikalı yüklenici derin memnuniyetsizliğini dile getirdi.", word: "A number of", options: ["A number of", "A large number of", "Most of", "Mostly"] },
      { en: "A large number of compilation errors manifested inside the repository because developers neglected to align file formatting dimensions.", tr: "Geliştiriciler dosya biçimlendirme boyutlarını hizalamayı ihmal ettikleri için depo içinde çok sayıda derleme hatası kendini gösterdi.", word: "A large number of", options: ["A large number of", "A number of", "Most of", "Mostly"] },
      { en: "The structural framework evolved by degrees into a highly stable architecture thanks to continuous feedback from data practitioners.", tr: "Yapısal çerçeve, veri uygulayıcılarından gelen sürekli geri bildirimler sayesinde kademe kademe son derece kararlı bir mimariye dönüştü.", word: "by degrees", options: ["by degrees", "little by little", "more or less", "a great deal"] },
      { en: "The technology startup expanded its regional footprint little by little despite operating under severe capital expenditure constraints.", tr: "Teknoloji girişimi, ciddi sermaye harcaması kısıtlamaları altında çalışmasına rağmen bölgesel ayak izini yavaş yavaş genişletti.", word: "little by little", options: ["little by little", "by degrees", "more or less", "mostly"] },
      { en: "In recent years, national legislative assemblies have passed multiple statutory amendments to protect confidential client metadata files.", tr: "Son yıllarda, ulusal yasama meclisleri, gizli istemci meta veri dosyalarını korumak için birden fazla yasal değişiklik kabul etti.", word: "In recent years", options: ["In recent years", "In recent times", "A great deal", "Mostly"] },
      { en: "The corporate entity adjusted its quarterly production goals, making the overall business roadmap more or less secure against market fluctuations.", tr: "Kurumsal varlık, üç aylık üretim hedeflerini ayarlayarak genel iş yol haritasını pazar dalgalanmalarına karşı aşağı yukarı güvenli hale getirdi.", word: "more or less", options: ["more or less", "by degrees", "little by little", "a great deal"] },
      { en: "Resolving the formatting discrepancies inside the main directory saved the technical team a great deal of runtime troubleshooting labor.", tr: "Ana dizin içindeki biçimlendirme tutarsızlıklarını çözmek, teknik ekibe büyük miktarda çalışma zamanı sorun giderme iş gücü kazandırdı.", word: "a great deal", options: ["a great deal", "a good deal", "more or less", "mostly"] },
      { en: "The automated security firewall isolated a good deal of unauthorized connection profiles over the weekend without manual supervision.", tr: "Otomatik güvenlik duvarı, hafta sonu manuel denetim olmaksızın epeyce yetkisiz bağlantı profilini izole etti.", word: "a good deal", options: ["a good deal", "a great deal", "more or less", "mostly"] },
      { en: "Most of the volatile chemical compounds were secured inside the laboratory vacuum incubator before direct sunlight caused a reaction.", tr: "Uçucu kimyasal bileşiklerin çoğu, doğrudan güneş ışığı bir reaksiyona neden olmadan önce laboratuvar vakumlu inkübatörünün içinde güvenli hale getirildi.", word: "Most of", options: ["Most of", "Mostly", "A number of", "A large number of"] },
      { en: "The infrastructure devices built by the certified engineering contractor were mostly resilient against intense simulation stress testing.", tr: "Sertifikalı mühendislik yüklenicisi tarafından inşa edilen altyapı cihazları, yoğun simülasyon stresi testlerine karşı çoğunlukla dirençliydi.", word: "mostly", options: ["mostly", "most of", "a number of", "a large number of"] },
      { en: "A large number of digital archive documents suffered from severe paper deterioration before the library finalized the scanning loop.", tr: "Kütüphane tarama döngüsünü nihai hale getirmeden önce çok sayıda dijital arşiv belgesi ciddi kağıt bozulmasından muzdaripti.", word: "A large number of", options: ["A large number of", "A number of", "Most of", "Mostly"] }
    ]
  }
};

// 2. Helper Functions
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function cleanWords(sentence) {
  return sentence
    .replace(/<[^>]+>/g, '')
    .split(/\s+/)
    .map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim())
    .filter(Boolean);
}

function blankWord(sentence, word) {
  const index = sentence.toLowerCase().indexOf(word.toLowerCase());
  if (index !== -1) {
    return sentence.substring(0, index) + "___" + sentence.substring(index + word.length);
  }
  return sentence;
}

function getTrDistractors(allSentences, currentSent, count) {
  const targetWords = cleanWords(currentSent.tr).map(w => w.toLowerCase());
  const otherWords = allSentences
    .filter(item => item.tr !== currentSent.tr)
    .map(item => cleanWords(item.tr))
    .flat()
    .filter(w => !targetWords.includes(w.toLowerCase()));
  const uniqueOthers = Array.from(new Set(otherWords));
  return shuffle(uniqueOthers).slice(0, count);
}

function getEnDistractors(allSentences, currentSent, count) {
  const targetWords = cleanWords(currentSent.en).map(w => w.toLowerCase());
  const otherWords = allSentences
    .filter(item => item.en !== currentSent.en)
    .map(item => cleanWords(item.en))
    .flat()
    .filter(w => !targetWords.includes(w.toLowerCase()));
  const uniqueOthers = Array.from(new Set(otherWords));
  return shuffle(uniqueOthers).slice(0, count);
}

function makeMCQuestion(qId, s, allSentences) {
  const otherTranslations = allSentences
    .filter(item => item.tr !== s.tr && item.isMicro === s.isMicro)
    .map(item => item.tr);

  const uniqueOthers = Array.from(new Set(otherTranslations));
  const shuffledOthers = shuffle(uniqueOthers);
  
  const distractors = shuffledOthers.slice(0, 3);
  
  while (distractors.length < 3) {
    distractors.push(s.tr + " (alternatif " + (distractors.length + 1) + ")");
  }

  const finalOpts = shuffle([s.tr, ...distractors]);
  const correctIndex = finalOpts.indexOf(s.tr);

  return {
    id: `${qId}_mc`,
    type: "multiple-choice",
    prompt: s.en.includes(" ") ? "Cümlenin en uygun Türkçe karşılığını seçin:" : "İfadenin en uygun Türkçe karşılığını seçin:",
    sentence: s.en,
    options: finalOpts,
    correctIndex: correctIndex,
    translation: s.tr
  };
}

function makeMCTrToEngQuestion(qId, s, allSentences) {
  const otherEn = allSentences
    .filter(item => item.en !== s.en && item.isMicro === s.isMicro)
    .map(item => item.en);
  const shuffledOthers = shuffle(Array.from(new Set(otherEn)));
  const distractors = shuffledOthers.slice(0, 3);
  while (distractors.length < 3) {
    distractors.push(s.en + " (alternative " + (distractors.length + 1) + ")");
  }
  const finalOpts = shuffle([s.en, ...distractors]);
  return {
    id: `${qId}_mc_te`,
    type: "multiple-choice",
    prompt: "Cümlenin en uygun İngilizce karşılığını seçin:",
    sentence: s.tr,
    options: finalOpts,
    correctIndex: finalOpts.indexOf(s.en),
    translation: s.en,
    isEngToTr: false
  };
}

function makeClozeQuestion(qId, s, isDropdown) {
  const blanked = blankWord(s.en, s.word);
  
  const seen = new Set([s.word.toLowerCase().trim()]);
  const uniqueOpts = [s.word];
  s.options.forEach(opt => {
    const lower = opt.toLowerCase().trim();
    if (!seen.has(lower)) {
      seen.add(lower);
      uniqueOpts.push(opt);
    }
  });
  const fallbacks = ["otherwise", "although", "such as", "for example", "mostly", "even if", "in conclusion"];
  fallbacks.forEach(f => {
    if (uniqueOpts.length < 4) {
      const lower = f.toLowerCase().trim();
      if (!seen.has(lower)) {
        seen.add(lower);
        uniqueOpts.push(f);
      }
    }
  });
  const finalOpts = shuffle(uniqueOpts.slice(0, 4));
  const correctIndex = finalOpts.indexOf(s.word);

  return {
    id: `${qId}_cloze`,
    type: isDropdown ? "fill-blank-dropdown" : "fill-blank",
    prompt: isDropdown ? "Boşluğa gelecek en uygun kelimeyi seçin:" : "Boşluğu doldur",
    sentence: blanked,
    options: finalOpts,
    correctIndex: correctIndex,
    translation: s.tr
  };
}

function makeWordBankQuestion(qId, s, allSentences, isEngToTr) {
  if (isEngToTr) {
    const targetWords = cleanWords(s.tr);
    const distractorsTr = getTrDistractors(allSentences, s, 3);
    return {
      id: `${qId}_wb_et`,
      type: "word-bank",
      prompt: "Cümlenin Türkçe karşılığını oluşturun:",
      translation: s.en,
      words: shuffle([...targetWords, ...distractorsTr]),
      correctOrder: targetWords,
      enSentence: s.en,
      isEngToTr: true
    };
  } else {
    const targetWords = cleanWords(s.en);
    const distractorsEn = getEnDistractors(allSentences, s, 3);
    return {
      id: `${qId}_wb_te`,
      type: "word-bank",
      prompt: "Cümlenin İngilizce karşılığını oluşturun:",
      translation: s.tr,
      words: shuffle([...targetWords, ...distractorsEn]),
      correctOrder: targetWords,
      enSentence: s.en,
      isEngToTr: false
    };
  }
}

function generateLessonExercises(lessonIdStr, rawLesson) {
  const lessonId = parseInt(lessonIdStr, 10);
  const unitId = 31;
  const exercises = [];

  const allRaw = [];
  rawLesson.micro.forEach(s => allRaw.push({ ...s, isMicro: true }));
  rawLesson.academic.forEach(s => allRaw.push({ ...s, isMicro: false }));

  // Basitten karmaşığa sırala
  allRaw.sort((a, b) => a.en.length - b.en.length);

  // Mark entirely blank phrases
  allRaw.forEach(s => {
    const blanked = blankWord(s.en, s.word).trim();
    s.isEntirelyBlank = (blanked === "___" || blanked === "___." || blanked === "___,");
  });

  const phrasesPool = allRaw.filter(s => s.isEntirelyBlank);
  const sentencesPool = allRaw.filter(s => !s.isEntirelyBlank);

  // We have exactly 40 sentences in allRaw (e.g. phrasesPool has about 8-11, sentencesPool has 29-32)
  // We will distribute the 40 sentences for Direction A (English -> Turkish) across Exercises 1, 2, 3, 4
  // We will distribute the 40 sentences for Direction B (Turkish -> English) across Exercises 5, 6, 7, 8
  
  // Distribute allRaw for Direction A (Exercises 1-4)
  const dirAPool = [...allRaw]; // 40 sentences sorted by length
  
  // Distribute allRaw for Direction B (Exercises 5-8)
  const dirBPool = [...allRaw]; // 40 sentences sorted by length

  // ==========================================
  // EXERCISE 1: Temel Çalışma (10 Questions)
  // ==========================================
  {
    const questions = [];
    const ex1Sents = dirAPool.slice(0, 10); // Shortest sentences (typically phrases)
    
    // 2 Matching (8 items from phrasesPool if possible, fallback to ex1Sents)
    const matchPhrases = phrasesPool.slice(0, 8);
    const matchingPairs = matchPhrases.map(s => ({ left: s.tr, right: s.en }));
    while (matchingPairs.length < 8) {
      // Fallback
      const s = sentencesPool[matchingPairs.length % sentencesPool.length];
      matchingPairs.push({ left: s.tr, right: s.en });
    }

    questions.push({
      id: `u${unitId}l${lessonId}_ex1_match1`,
      type: "matching",
      prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
      pairs: shuffle(matchingPairs.slice(0, 4))
    });
    questions.push({
      id: `u${unitId}l${lessonId}_ex1_match2`,
      type: "matching",
      prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
      pairs: shuffle(matchingPairs.slice(4, 8))
    });

    // 4 MC Translation (without commas)
    let mcCount = 0;
    ex1Sents.forEach((s, idx) => {
      if (questions.length >= 10) return;
      if (!s.en.includes(",")) {
        questions.push(makeMCQuestion(`u${unitId}l${lessonId}_ex1_mc_${idx}`, s, allRaw));
      }
    });

    // Cloze or Word Bank for the rest
    ex1Sents.forEach((s, idx) => {
      if (questions.length >= 10) return;
      if (!s.isEntirelyBlank) {
        if (idx % 2 === 0) {
          questions.push(makeClozeQuestion(`u${unitId}l${lessonId}_ex1_cloze_${idx}`, s, true));
        } else {
          questions.push(makeWordBankQuestion(`u${unitId}l${lessonId}_ex1_wb_${idx}`, s, allRaw, true));
        }
      }
    });

    // Padded to 10
    while (questions.length < 10) {
      const s = sentencesPool[questions.length % sentencesPool.length];
      questions.push(makeClozeQuestion(`u${unitId}l${lessonId}_ex1_pad_${questions.length}`, s, true));
    }

    exercises.push({
      id: `u${unitId}l${lessonId}ex1`,
      title: `Alıştırma 1: Temel Çalışma`,
      description: `Yapıları tanıma ve anlam eşleştirme.`,
      questions: questions.slice(0, 10)
    });
  }

  // ==========================================
  // EXERCISE 2: Yapı Alıştırması (10 Questions)
  // ==========================================
  {
    const questions = [];
    const ex2Sents = dirAPool.slice(10, 20);

    // MC Translation first (without commas)
    ex2Sents.forEach((s, idx) => {
      if (questions.length >= 4) return;
      if (!s.en.includes(",")) {
        questions.push(makeMCQuestion(`u${unitId}l${lessonId}_ex2_mc_${idx}`, s, allRaw));
      }
    });

    // Cloze (Dropdown / Button 50/50)
    ex2Sents.forEach((s, idx) => {
      if (questions.length >= 10) return;
      if (!s.isEntirelyBlank) {
        questions.push(makeClozeQuestion(`u${unitId}l${lessonId}_ex2_cloze_${idx}`, s, idx % 2 === 0));
      }
    });

    // Padded to 10
    while (questions.length < 10) {
      const s = sentencesPool[questions.length % sentencesPool.length];
      questions.push(makeClozeQuestion(`u${unitId}l${lessonId}_ex2_pad_${questions.length}`, s, false));
    }

    exercises.push({
      id: `u${unitId}l${lessonId}ex2`,
      title: `Alıştırma 2: Yapı Alıştırması`,
      description: `Cümle içi boşluk doldurma ve yapı analizi.`,
      questions: questions.slice(0, 10)
    });
  }

  // ==========================================
  // EXERCISE 3: Orta Düzey Pratik (10 Questions)
  // ==========================================
  {
    const questions = [];
    const ex3Sents = dirAPool.slice(20, 30);

    // MC translation
    ex3Sents.forEach((s, idx) => {
      if (questions.length >= 2) return;
      if (!s.en.includes(",")) {
        questions.push(makeMCQuestion(`u${unitId}l${lessonId}_ex3_mc_${idx}`, s, allRaw));
      }
    });

    // Word Bank
    ex3Sents.forEach((s, idx) => {
      if (questions.length >= 6) return;
      if (!s.isEntirelyBlank) {
        questions.push(makeWordBankQuestion(`u${unitId}l${lessonId}_ex3_wb_${idx}`, s, allRaw, true));
      }
    });

    // Cloze
    ex3Sents.forEach((s, idx) => {
      if (questions.length >= 10) return;
      if (!s.isEntirelyBlank) {
        questions.push(makeClozeQuestion(`u${unitId}l${lessonId}_ex3_cloze_${idx}`, s, idx % 2 === 0));
      }
    });

    // Padded to 10
    while (questions.length < 10) {
      const s = sentencesPool[questions.length % sentencesPool.length];
      questions.push(makeWordBankQuestion(`u${unitId}l${lessonId}_ex3_pad_${questions.length}`, s, allRaw, true));
    }

    exercises.push({
      id: `u${unitId}l${lessonId}ex3`,
      title: `Alıştırma 3: Orta Düzey Pratik`,
      description: `Kelime sıralama ve cümle tamamlama.`,
      questions: questions.slice(0, 10)
    });
  }

  // ==========================================
  // EXERCISE 4: Akademik Pratik I (10 Questions)
  // ==========================================
  {
    const questions = [];
    const ex4Sents = dirAPool.slice(30, 40); // Longest academic sentences

    // Cloze (Dropdown / Button 50/50)
    ex4Sents.forEach((s, idx) => {
      if (questions.length >= 5) return;
      if (!s.isEntirelyBlank) {
        questions.push(makeClozeQuestion(`u${unitId}l${lessonId}_ex4_cloze_${idx}`, s, idx % 2 === 0));
      }
    });

    // Word Bank
    ex4Sents.forEach((s, idx) => {
      if (questions.length >= 10) return;
      if (!s.isEntirelyBlank) {
        questions.push(makeWordBankQuestion(`u${unitId}l${lessonId}_ex4_wb_${idx}`, s, allRaw, true));
      }
    });

    // Padded to 10
    while (questions.length < 10) {
      const s = sentencesPool[questions.length % sentencesPool.length];
      questions.push(makeWordBankQuestion(`u${unitId}l${lessonId}_ex4_pad_${questions.length}`, s, allRaw, true));
    }

    exercises.push({
      id: `u${unitId}l${lessonId}ex4`,
      title: `Alıştırma 4: Akademik Pratik I`,
      description: `Akademik cümle yapıları ve boşluk doldurma.`,
      questions: questions.slice(0, 10)
    });
  }

  // ==========================================
  // EXERCISE 5: Yazma ve Çeviri (Tr -> Eng) (10 Questions)
  // ==========================================
  {
    const questions = [];
    const ex5Sents = dirBPool.slice(0, 10); // Shortest sentences

    // MC Translation Tr -> Eng (without commas)
    ex5Sents.forEach((s, idx) => {
      if (questions.length >= 4) return;
      if (!s.en.includes(",")) {
        questions.push(makeMCTrToEngQuestion(`u${unitId}l${lessonId}_ex5_mc_${idx}`, s, allRaw));
      }
    });

    // Word Bank Tr -> Eng
    ex5Sents.forEach((s, idx) => {
      if (questions.length >= 8) return;
      questions.push(makeWordBankQuestion(`u${unitId}l${lessonId}_ex5_wb_${idx}`, s, allRaw, false));
    });

    // 2 Translation Text (Eng -> Tr) at the end
    ex5Sents.slice(8, 10).forEach((s, idx) => {
      questions.push({
        id: `u${unitId}l${lessonId}_ex5_tx_${idx}`,
        type: "translation-text",
        prompt: `"${s.en}" ifadesini Türkçe'ye çevirin:`,
        correctSentence: s.tr,
        enSentence: s.en,
        isEngToTr: true
      });
    });

    // Padded to 10
    while (questions.length < 10) {
      const s = sentencesPool[questions.length % sentencesPool.length];
      questions.push(makeWordBankQuestion(`u${unitId}l${lessonId}_ex5_pad_${questions.length}`, s, allRaw, false));
    }

    exercises.push({
      id: `u${unitId}l${lessonId}ex5`,
      title: `Alıştırma 5: Yazma ve Çeviri`,
      description: `Türkçe'den İngilizce'ye çeviri ve kelime sıralama.`,
      questions: questions.slice(0, 10)
    });
  }

  // ==========================================
  // EXERCISE 6: Çeviri Pratiği II (Tr -> Eng) (10 Questions)
  // ==========================================
  {
    const questions = [];
    const ex6Sents = dirBPool.slice(10, 20);

    // MC Translation Tr -> Eng
    ex6Sents.forEach((s, idx) => {
      if (questions.length >= 4) return;
      if (!s.en.includes(",")) {
        questions.push(makeMCTrToEngQuestion(`u${unitId}l${lessonId}_ex6_mc_${idx}`, s, allRaw));
      }
    });

    // Word Bank Tr -> Eng
    ex6Sents.forEach((s, idx) => {
      if (questions.length >= 10) return;
      questions.push(makeWordBankQuestion(`u${unitId}l${lessonId}_ex6_wb_${idx}`, s, allRaw, false));
    });

    // Padded to 10
    while (questions.length < 10) {
      const s = sentencesPool[questions.length % sentencesPool.length];
      questions.push(makeWordBankQuestion(`u${unitId}l${lessonId}_ex6_pad_${questions.length}`, s, allRaw, false));
    }

    exercises.push({
      id: `u${unitId}l${lessonId}ex6`,
      title: `Alıştırma 6: Çeviri Pratiği II`,
      description: `Türkçe'den İngilizce'ye cümle kurma alıştırmaları.`,
      questions: questions.slice(0, 10)
    });
  }

  // ==========================================
  // EXERCISE 7: Akademik Yazma (Tr -> Eng) (10 Questions)
  // ==========================================
  {
    const questions = [];
    const ex7Sents = dirBPool.slice(20, 30);

    // Word Bank Tr -> Eng
    ex7Sents.slice(0, 4).forEach((s, idx) => {
      questions.push(makeWordBankQuestion(`u${unitId}l${lessonId}_ex7_wb_${idx}`, s, allRaw, false));
    });

    // Translation Text Tr -> Eng (Keyboard typing)
    ex7Sents.slice(4, 10).forEach((s, idx) => {
      questions.push({
        id: `u${unitId}l${lessonId}_ex7_tx_te_${idx}`,
        type: "translation-text",
        prompt: `"${s.tr}" ifadesini İngilizce'ye çevirin:`,
        correctSentence: s.en,
        enSentence: s.en,
        isEngToTr: false
      });
    });

    // Padded to 10
    while (questions.length < 10) {
      const s = sentencesPool[questions.length % sentencesPool.length];
      questions.push(makeWordBankQuestion(`u${unitId}l${lessonId}_ex7_pad_${questions.length}`, s, allRaw, false));
    }

    exercises.push({
      id: `u${unitId}l${lessonId}ex7`,
      title: `Alıştırma 7: Akademik Yazma`,
      description: `Türkçe cümlelerin İngilizce karşılıklarını yazma.`,
      questions: questions.slice(0, 10)
    });
  }

  // ==========================================
  // EXERCISE 8: İleri Düzey Akademik Analiz (Tr -> Eng) (10 Questions)
  // ==========================================
  {
    const questions = [];
    const ex8Sents = dirBPool.slice(30, 40); // Longest academic sentences

    // Cloze tests (Eng input)
    ex8Sents.slice(0, 4).forEach((s, idx) => {
      if (!s.isEntirelyBlank) {
        questions.push(makeClozeQuestion(`u${unitId}l${lessonId}_ex8_cloze_${idx}`, s, idx % 2 === 0));
      }
    });

    // Translation Text Tr -> Eng (longest academic sentences)
    ex8Sents.slice(4, 10).forEach((s, idx) => {
      questions.push({
        id: `u${unitId}l${lessonId}_ex8_tx_te_${idx}`,
        type: "translation-text",
        prompt: `"${s.tr}" ifadesini İngilizce'ye çevirin:`,
        correctSentence: s.en,
        enSentence: s.en,
        isEngToTr: false
      });
    });

    // Padded to 10
    while (questions.length < 10) {
      const s = sentencesPool[questions.length % sentencesPool.length];
      questions.push({
        id: `u${unitId}l${lessonId}_ex8_pad_tx_${questions.length}`,
        type: "translation-text",
        prompt: `"${s.tr}" ifadesini İngilizce'ye çevirin:`,
        correctSentence: s.en,
        enSentence: s.en,
        isEngToTr: false
      });
    }

    exercises.push({
      id: `u${unitId}l${lessonId}ex8`,
      title: `Alıştırma 8: İleri Düzey Akademik Analiz`,
      description: `Karmaşık akademik cümleleri İngilizce'ye çevirme.`,
      questions: questions.slice(0, 10)
    });
  }

  return { exercises };
}

// 3. Generate exercises for all 4 lessons of Unit 31
const compiledUnit31 = {};
for (const lessonKey in rawData) {
  compiledUnit31[lessonKey] = generateLessonExercises(lessonKey, rawData[lessonKey]);
}

// 4. Read and Update data.js
const dataFilePath = path.join(__dirname, '..', 'data.js');
let dataContent = fs.readFileSync(dataFilePath, 'utf8');

// A. Update Unit 31 metadata
// Change numLessons: 1 to numLessons: 4
dataContent = dataContent.replace(
  /(\bid:\s*31,[\s\S]*?numLessons:\s*)1/,
  "$14"
);

// Replace formulas of Topic 31
const topic31FormulasRegex = /(\bid:\s*31,[\s\S]*?formulas:\s*\[)([\s\S]*?)(\],)/;
const replacementFormulas = `
      {
        formula: "${rawData["1"].formula}",
        example: "${rawData["1"].example}",
        description: "${rawData["1"].description}"
      },
      {
        formula: "${rawData["2"].formula}",
        example: "${rawData["2"].example}",
        description: "${rawData["2"].description}"
      },
      {
        formula: "${rawData["3"].formula}",
        example: "${rawData["3"].example}",
        description: "${rawData["3"].description}"
      },
      {
        formula: "${rawData["4"].formula}",
        example: "${rawData["4"].example}",
        description: "${rawData["4"].description}"
      }
  `;
dataContent = dataContent.replace(topic31FormulasRegex, `$1${replacementFormulas}$3`);

// Replace subtitles of Topic 31
const topic31SubtitlesRegex = /(\bid:\s*31,[\s\S]*?subtitles:\s*\[)([\s\S]*?)(\]\s*\n*\s*\})/i;
const replacementSubtitles = `
      "A. Mantıksal Çıkarım, Özet ve Netice Konnektörleri (Sayfa 127)",
      "B. Referans, Örneklendirme ve Açıklama Kalıpları (Sayfa 127)",
      "C. Durumsal Koşul ve İhtimal Zarf Cümlecikleri (Sayfa 127)",
      "D. Zaman, Derece ve Nicelik Belirteçleri (Quantifiers) (Sayfa 127)"
  `;
dataContent = dataContent.replace(topic31SubtitlesRegex, `$1${replacementSubtitles}$3`);

// B. Shift Topic 32 (startLessonId: 125 -> 128)
dataContent = dataContent.replace(
  /(\bid:\s*32,[\s\S]*?startLessonId:\s*)125/,
  "$1128"
);

// C. Shift Topic 33 (startLessonId: 135 -> 138)
dataContent = dataContent.replace(
  /(\bid:\s*33,[\s\S]*?startLessonId:\s*)135/,
  "$1138"
);

// D. Replace u33l135 with u33l138 globally in dataContent (matching old question IDs of Topic 33)
dataContent = dataContent.replace(/u33l135/g, "u33l138");

// E. Add compiledUnit31 to unitSentencesMap
const compiledJson = JSON.stringify(compiledUnit31, null, 2);
if (dataContent.includes("  31: {")) {
  const unit31MapRegex = /(31:\s*\{)([\s\S]*?)(\},\s*\n*\s*33:)/;
  dataContent = dataContent.replace(unit31MapRegex, `31: ${compiledJson},\n  33:`);
} else {
  // Insert before 33: {
  dataContent = dataContent.replace("  33: {", `  31: ${compiledJson},\n  33: {`);
}

fs.writeFileSync(dataFilePath, dataContent, 'utf8');
console.log("data.js updated successfully with Unit 31 exercises (Version 3)!");
