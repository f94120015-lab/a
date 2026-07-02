const fs = require('fs');
const path = require('path');

// 1. Raw Dataset for all 10 lessons of Unit 32
const rawData = {
  // Lessons 1-7 from previous compiled script
  "1": {
    topicKey: "because",
    title: "B. Sebep - a) because",
    formula: "Main Clause + because + Passive Clause",
    example: "The budget was modified because it has been increased: Bütçe artırıldığı için değiştirildi.",
    description: "Neden bildiren <strong>because</strong> bağlacı, edilgen çatı (passive voice) ile kullanıldığında eylemin gerekçesini nesne odaklı bir vurguyla ana cümleye bağlar. Çeviride <strong>'-diği için'</strong> veya <strong>'-diğinden dolayı'</strong> ekleri kullanılır.",
    micro: [
      { en: "because it was proved", tr: "kanıtlandığı için", word: "because", options: ["because", "although", "unless", "so"] },
      { en: "because it was published", tr: "yayınlandığı için", word: "because", options: ["because", "although", "unless", "if"] },
      { en: "because it is known", tr: "bilindiği için", word: "because", options: ["because", "since", "unless", "whereas"] },
      { en: "because it is purified", tr: "arıtıldığı için", word: "because", options: ["because", "although", "until", "unless"] },
      { en: "because it has been increased", tr: "artırıldığı için", word: "because", options: ["because", "since", "unless", "before"] },
      { en: "because it has been formed", tr: "oluşturulduğu için", word: "because", options: ["because", "although", "unless", "until"] },
      { en: "because it was refactored", tr: "yeniden yapılandırıldığı için", word: "because", options: ["because", "since", "unless", "so"] },
      { en: "because it is monitored", tr: "izlendiği için", word: "because", options: ["because", "although", "unless", "whereas"] },
      { en: "because it was isolated", tr: "izole edildiği için", word: "because", options: ["because", "since", "unless", "before"] },
      { en: "because it has been modified", tr: "değiştirildiği için", word: "because", options: ["because", "although", "unless", "so"] },
      { en: "because it is verified", tr: "doğrulandığı için", word: "because", options: ["because", "since", "unless", "whereas"] },
      { en: "because it was executed", tr: "yürütüldüğü için", word: "because", options: ["because", "although", "unless", "until"] },
      { en: "because it has been optimized", tr: "optimize edildiği için", word: "because", options: ["because", "since", "unless", "before"] },
      { en: "because it is required", tr: "gerektiği için", word: "because", options: ["because", "although", "unless", "so"] },
      { en: "because it was suspended", tr: "askıya alındığı için", word: "because", options: ["because", "since", "unless", "whereas"] },
      { en: "because it has been reallocated", tr: "yeniden tahsis edildiği için", word: "because", options: ["because", "although", "unless", "until"] },
      { en: "because it is guaranteed", tr: "garanti edildiği için", word: "because", options: ["because", "since", "unless", "before"] },
      { en: "because it was compromised", tr: "tehlikeye atıldığı için", word: "because", options: ["because", "although", "unless", "so"] },
      { en: "because it has been finalized", tr: "nihai hale getirildiği için", word: "because", options: ["because", "since", "unless", "whereas"] },
      { en: "because it is restricted", tr: "kısıtlandığı için", word: "because", options: ["because", "although", "unless", "until"] }
    ],
    academic: [
      { en: "The engineering team initiated a complete architecture reevaluation because it was proved that the current cloud matrix suffers from constant latency thresholds.", tr: "Mevcut bulut matrisinin sürekli gecikme eşiklerinden muzdarip olduğu kanıtlandığı için mühendislik ekibi eksiksiz bir mimari yeniden değerlendirme başlattı.", word: "because", options: ["because", "although", "unless", "so"] },
      { en: "The software release cycle underwent immediate modifications because it was published that major security boundaries had been compromised by external traces.", tr: "Büyük güvenlik sınırlarının dış izler tarafından tehlikeye atıldığı yayınlandığı için yazılım sürüm döngüde derhal değişiklikler yapıldı.", word: "because", options: ["because", "since", "unless", "before"] },
      { en: "Database administrators decided to isolate the core storage partition because it is known that loose query loops trigger catastrophic execution bottlenecks.", tr: "Gevşek sorgu döngülerinin felaket niteliğinde yürütme darboğazlarını tetiklediği bilindiği için veritabanı yöneticileri çekirdek depolama bölümünü izole etmeye karar verdi.", word: "because", options: ["because", "although", "unless", "whereas"] },
      { en: "Technicians maintained strict control over the volatile mixture inside the incubator because it is purified under explicit thermal validation guidelines.", tr: "Açık termal doğrulama yönergeleri altında arıtıldığı için teknisyenler inkübatörün içindeki uçucu karışım üzerinde sıkı kontrol sağladılar.", word: "because", options: ["because", "since", "unless", "until"] },
      { en: "The system architecture budget underwent a structural modification because it has been increased to accommodate the deployment of gamified language applications.", tr: "Oyunlaştırılmış dil uygulamalarının dağıtımına olanak sağlamak amacıyla artırıldığı için sistem mimarisi bütçesi yapısal bir değişiklikten geçti.", word: "because", options: ["because", "although", "unless", "so"] },
      { en: "A brand new metadata repository was deployed across the decentralized cloud nodes because it has been formed without introducing structural compilation errors.", tr: "Yapısal derleme hataları getirilmeden oluşturulduğu için merkeziyetsiz bulut düğümleri genelinde yepyeni bir meta veri havuzu dağıtıldı.", word: "because", options: ["because", "since", "unless", "until"] },
      { en: "Discerning frontend developers decided to roll back the latest user interface build because it was refactored without conducting extensive simulation testing.", tr: "Kapsamlı simülasyon testleri gerçekleştirilmeden yeniden yapılandırıldığı için seçici ön uç geliştiricileri son kullanıcı arayüzü sürümünü geri almaya karar verdi.", word: "because", options: ["because", "although", "unless", "so"] },
      { en: "Automated security firewalls automatically flagged the incoming packet trace because it is monitored for malicious background activities.", tr: "Kötü niyetli arka plan faaliyetleri açısından izlendiği için otomatik güvenlik duvarları gelen paket izini otomatik olarak işaretledi.", word: "because", options: ["because", "since", "unless", "whereas"] },
      { en: "The hazardous organic compound was safely sealed inside the laboratory vacuum chamber because it was isolated before direct sunlight triggered an exothermic reaction.", tr: "Doğrudan güneş ışığı ekzotermik bir reaksiyonu tetiklemeden önce izole edildiği için tehlikeli organik bileşik laboratuvar vakum odasının içinde güvenli bir şekilde kapatıldı.", word: "because", options: ["because", "although", "unless", "before"] },
      { en: "Network configurations were reverted to the baseline schema because it has been modified by unauthorized client profiles over the weekend.", tr: "Hafta sonu yetkisiz istemci profilleri tarafından değiştirildiği için ağ yapılandırmaları temel şemaya geri döndürüldü.", word: "because", options: ["because", "since", "unless", "so"] },
      { en: "The decentralized transaction gateway granted administrative clearance parameters to the user profile because it is verified by cryptographic tokens.", tr: "Kriptografik jetonlar tarafından doğrulandığı için merkeziyetsiz işlem geçidi kullanıcı profiline idari yetkilendirme parametrelerini verdi.", word: "because", options: ["because", "although", "unless", "whereas"] },
      { en: "The backup cleanup script failed to clear the redundant server logs because it was executed concurrently with the primary database routine.", tr: "Birincil veritabanı rutini ile eşzamanlı olarak yürütüldüğü için yedekleme temizleme betiği gereksiz sunucu günlüklerini temizleyemedi.", word: "because", options: ["because", "since", "unless", "until"] },
      { en: "Interface performance metrics showed substantial improvements during high-volume traffic sessions because it has been optimized to eliminate navigation lag thresholds.", tr: "Gezinme gecikme eşiklerini ortadan kaldırmak üzere optimize edildiği için arayüz performans metrikleri yüksek hacimli trafik oturumları sırasında önemli gelişmeler gösterdi.", word: "because", options: ["because", "although", "unless", "before"] },
      { en: "Extra authentication clearance codes were injected into the system architecture because it is required by strict international data protection regulations.", tr: "Katı uluslararası veri koruma düzenlemeleri tarafından gerektiği için sistem mimarisine ekstra kimlik doğrulama yetki kodları enjekte edildi.", word: "because", options: ["because", "since", "unless", "so"] },
      { en: "The scheduled platform synchronization cycle was temporarily abandoned by the technical unit because it was suspended due to unpredicted memory leakage constraints.", tr: "Öngörülemeyen bellek sızıntısı kısıtlamaları nedeniyle askıya alındığı için planlanan platform senkronizasyon döngüsü teknik birim tarafından geçici olarak durduruldu.", word: "because", options: ["because", "although", "unless", "whereas"] },
      { en: "Corporate funds were strategically redistributed across the provincial research departments because it has been reallocated by an explicit administrative decree.", tr: "Açık bir idari kararname ile yeniden tahsis edildiği için kurumsal fonlar taşra araştırma departmanları arasında stratejik olarak yeniden dağıtıldı.", word: "because", options: ["because", "since", "unless", "until"] },
      { en: "The safety boundaries of the fifty discrete components remain legally valid because it is guaranteed in the national constitutional documentation.", tr: "Ulusal anayasal belgelerde garanti edildiği için elli ayrık bileşenin güvenlik sınırları yasal olarak geçerliliğini korumaktadır.", word: "because", options: ["because", "although", "unless", "before"] },
      { en: "The engineering board isolated the unreinforced cloud partition immediately because it was compromised by an anonymous external script trace.", tr: "Anonim bir dış betik izi tarafından tehlikeye atıldığı için mühendislik kurulu takviye edilmemiş bulut bölümünü derhal izole etti.", word: "because", options: ["because", "since", "unless", "so"] },
      { en: "The comprehensive empirical dataset was archived in the laboratory library because it has been finalized by the head investigative specialists.", tr: "Baş araştırmacı uzmanlar tarafından nihai hale getirildiği için kapsamlı ampirik veri seti laboratuvar kütüphanesinde arşivlendi.", word: "because", options: ["because", "although", "unless", "whereas"] },
      { en: "Remote diagnostic teams were unable to alter the database schema fields because it is restricted under rigid institutional compliance guidelines.", tr: "Katı kurumsal uyumluluk yönergeleri altında kısıtlandığı için uzaktan teşhis ekipleri veritabanı şeması alanlarını değiştiremedi.", word: "because", options: ["because", "since", "unless", "until"] }
    ],
    extraComplex: [
      { en: "The system architecture board recommended an immediate partition rebuild because it was proved that the latest configuration build triggered memory leakage.", tr: "Son yapılandırma sürümünün bellek sızıntısını tetiklediği kanıtlandığı için sistem mimarisi kurulu derhal bir bölümün yeniden oluşturulmasını önerdi.", word: "because", options: ["because", "although", "unless", "so"] },
      { en: "The security firm initiated a thorough forensic examination because it was published that unauthorized profiles had accessed client records.", tr: "Yetkisiz profillerin istemci kayıtlarına eriştiği yayınlandığı için güvenlik firması kapsamlı bir adli inceleme başlattı.", word: "because", options: ["because", "since", "unless", "before"] },
      { en: "Technicians isolated the thermal chamber immediately because it is known that minor temperature variations compromise delicate organic compounds.", tr: "Küçük sıcaklık dalgalanmalarının hassas organik bileşikleri bozduğu bilindiği için teknisyenler termal odayı derhal izole etti.", word: "because", options: ["because", "although", "unless", "whereas"] },
      { en: "The research board chose to suspend the clinical trial because it is purified under unverified chemical validation procedures.", tr: "Doğrulanmamış kimyasal doğrulama prosedürleri altında arıtıldığı için araştırma kurulu klinik deneyi askıya almayı seçti.", word: "because", options: ["because", "since", "unless", "until"] },
      { en: "The development budget underwent a major reevaluation because it has been increased to support the integration of advanced cryptographic layers.", tr: "Gelişmiş kriptografik katmanların entegrasyonunu desteklemek amacıyla artırıldığı için geliştirme bütçesi büyük bir yeniden değerlendirmeden geçti.", word: "because", options: ["because", "although", "unless", "so"] },
      { en: "The network administration deployed backup nodes because it has been formed to prevent catastrophic transaction failures during high-traffic sessions.", tr: "Yüksek trafikli oturumlar sırasında felaket düzeyinde işlem başarısızlıklarını önlemek amacıyla oluşturulduğu için ağ yönetimi yedek düğümler dağıttı.", word: "because", options: ["because", "since", "unless", "until"] },
      { en: "The engineering team rolled back the deployment because it was refactored without conducting appropriate interface simulation routines.", tr: "Uygun arayüz simülasyon rutinleri yürütülmeden yeniden yapılandırıldığı için mühendislik ekibi dağıtımı geri aldı.", word: "because", options: ["because", "although", "unless", "so"] },
      { en: "Firewalls blocked the database connection requests because it is monitored by automated background diagnostic utilities.", tr: "Otomatik arka plan teşhis yardımcı programları tarafından izlendiği için güvenlik duvarları veritabanı bağlantı isteklerini engelledi.", word: "because", options: ["because", "since", "unless", "whereas"] },
      { en: "Specialists sealed the volatile components because it was isolated before external moisture triggered an exothermic chemical decay.", tr: "Dış nem ekzotermik bir kimyasal çürümeyi tetiklemeden önce izole edildiği için uzmanlar uçucu bileşenleri mühürledi.", word: "because", options: ["because", "although", "unless", "before"] },
      { en: "Administrators restored the server configurations because it has been modified by external scripts over the weekend.", tr: "Hafta sonu harici betikler tarafından değiştirildiği için yöneticiler sunucu yapılandırmalarını geri yükledi.", word: "because", options: ["because", "since", "unless", "so"] },
      { en: "The authentication gateway rejected the login attempts because it is verified under strict security compliance protocols.", tr: "Sıkı güvenlik uyumluluk protokolleri altında doğrulandığı için kimlik doğrulama geçidi giriş girişimlerini reddetti.", word: "because", options: ["because", "although", "unless", "whereas"] },
      { en: "The automation engine stopped the script execution because it was executed concurrently with a high-priority system cleanup routine.", tr: "Yüksek öncelikli bir sistem temizleme rutini ile eşzamanlı olarak yürütüldüğü için otomasyon motoru betik yürütmeyi durdurdu.", word: "because", options: ["because", "since", "unless", "until"] },
      { en: "The database query response time dropped significantly because it has been optimized to handle complex multi-layered data structures.", tr: "Karmaşık çok katmanlı veri yapılarını işlemek üzere optimize edildiği için veritabanı sorgu yanıt süresi önemli ölçüde düştü.", word: "because", options: ["because", "although", "unless", "before"] },
      { en: "Developers added dual-factor security filters because it is required by international digital storage regulations.", tr: "Uluslararası dijital depolama düzenlemeleri tarafından gerektiği için geliştiriciler çift faktörlü güvenlik filtreleri eklediler.", word: "because", options: ["because", "since", "unless", "so"] },
      { en: "The synchronization cycle was abandoned because it was suspended due to unpredicted system memory limitations.", tr: "Öngörülemeyen sistem bellek kısıtlamaları nedeniyle askıya alındığı için senkronizasyon döngüsü iptal edildi.", word: "because", options: ["because", "although", "unless", "whereas"] },
      { en: "The financial audit team redistributed the funds because it has been reallocated by an administrative decision.", tr: "İdari bir kararla yeniden tahsis edildiği için finansal denetim ekibi fonları yeniden dağıttı.", word: "because", options: ["since", "unless", "until", "because"] },
      { en: "The constitutional court declared the law legally binding because it is guaranteed in the national civil rights documentation.", tr: "Ulusal sivil haklar belgelerinde garanti edildiği için anayasa mahkemesi yasayı yasal olarak bağlayıcı ilan etti.", word: "because", options: ["because", "although", "unless", "before"] },
      { en: "The cyber unit isolated the subnet because it was compromised by a sophisticated malware variant.", tr: "Gelişmiş bir kötü amaçlı yazılım varyantı tarafından tehlikeye atıldığı için siber birim alt ağı izole etti.", word: "because", options: ["because", "since", "unless", "so"] },
      { en: "The research department published the final monograph because it has been finalized by leading academic investigators.", tr: "Önde gelen akademik araştırmacılar tarafından nihai hale getirildiği için araştırma departmanı nihai monografiyi yayınladı.", word: "because", options: ["because", "although", "unless", "whereas"] },
      { en: "Diagnostic teams were unable to modify the configuration fields because it is restricted under rigid security guidelines.", tr: "Katı güvenlik yönergeleri altında kısıtlandığı için teşhis ekipleri yapılandırma alanlarını değiştiremedi.", word: "because", options: ["because", "since", "unless", "until"] }
    ]
  },
  "2": {
    topicKey: "since",
    title: "B. Sebep - b) since",
    formula: "Present Perfect + since + Past Simple (Passive/Active)",
    example: "Metrics have increased since they were planted: Dikildiklerinden beri metrikler arttı.",
    description: "Zaman uyumu köprüsü kuran <strong>since</strong> bağlacı, geçmişteki bir başlangıç noktasından günümüze kadar devam eden süreçleri bağlar. Genellikle yan cümlesi Past Simple, ana cümlesi Present Perfect olur. Türkçeye <strong>'-den beri'</strong> veya <strong>'-diğinden bu yana'</strong> şeklinde çevrilir.",
    micro: [
      { en: "since the new law was passed", tr: "yeni kanun kabul edildiğinden beri", word: "since", options: ["since", "although", "unless", "before"] },
      { en: "since they were planted", tr: "dikildiklerinden beri", word: "since", options: ["since", "although", "unless", "until"] },
      { en: "since they started school", tr: "okula başladıklarından beri", word: "since", options: ["since", "because", "unless", "if"] },
      { en: "since the new president was elected", tr: "yeni başkan seçildiğinden beri", word: "since", options: ["since", "although", "unless", "whereas"] },
      { en: "since it was first passed", tr: "ilk kez kabul edildiğinden beri", word: "since", options: ["since", "because", "unless", "before"] },
      { en: "since the infrastructure collapsed", tr: "altyapı çöktüğünden beri", word: "since", options: ["since", "although", "unless", "until"] },
      { en: "since the migration initialized", tr: "geçiş başlatıldığından beri", word: "since", options: ["since", "because", "unless", "so"] },
      { en: "since errors accumulated", tr: "hatalar biriktiğinden beri", word: "since", options: ["since", "although", "unless", "whereas"] },
      { en: "since parameters shifted", tr: "parametreler değiştiğinden beri", word: "since", options: ["since", "because", "unless", "before"] },
      { en: "since tokens were validated", tr: "jetonlar doğrulandığından beri", word: "since", options: ["since", "although", "unless", "so"] },
      { en: "since storage space diminished", tr: "depolama alanı azaldığından beri", word: "since", options: ["since", "because", "unless", "whereas"] },
      { en: "since routines executed concurrently", tr: "rutinler eşzamanlı yürütüldüğünden beri", word: "since", options: ["since", "although", "unless", "until"] },
      { en: "since documentation was finalized", tr: "belgeler nihai hale getirildiğinden beri", word: "since", options: ["since", "because", "unless", "before"] },
      { en: "since components decayed inside chambers", tr: "bileşenler odaların içinde çürüdüğünden beri", word: "since", options: ["since", "although", "unless", "so"] },
      { en: "since access was restricted", tr: "erişim kısıtlandığından beri", word: "since", options: ["since", "because", "unless", "whereas"] },
      { en: "since metrics declined sharply", tr: "metrikler keskin bir şekilde düştüğünden beri", word: "since", options: ["since", "although", "unless", "until"] },
      { en: "since algorithms mutated rapidly", tr: "algoritmalar hızla mutasyona uğradığından beri", word: "since", options: ["since", "because", "unless", "before"] },
      { en: "since features were integrated seamlessly", tr: "özellikler sorunsuz bir şekilde entegre edildiğinden beri", word: "since", options: ["since", "although", "unless", "so"] },
      { en: "since rigid limits were enforced", tr: "katı sınırlar uygulandığından beri", word: "since", options: ["since", "because", "unless", "whereas"] },
      { en: "since queries triggered bottlenecks", tr: "sorgular darboğazları tetiklediğinden beri", word: "since", options: ["since", "although", "unless", "until"] }
    ],
    academic: [
      { en: "The tech startup has experienced remarkable structural growth since the new law was passed by the legislative assembly last quarter.", tr: "Geçen çeyrekte yasama meclisi tarafından yeni kanun kabul edildiğinden beri teknoloji girişimi dikkate değer bir yapısal büyüme yaşadı.", word: "since", options: ["since", "although", "unless", "before"] },
      { en: "Senior agricultural investigators have recorded a massive increase in baseline metrics since they were planted inside the temperature-controlled testing chambers.", tr: "Sıcaklık kontrollü test odalarının içine dikildiklerinden beri kıdemli tarım araştırmacıları temel metriklerde büyük bir artış kaydettiler.", word: "since", options: ["since", "although", "unless", "until"] },
      { en: "The native language learners have learnt to read and write syntax patterns seamlessly since they started school last September.", tr: "Geçen Eylül ayında okula başladıklarından beri yerel dil öğrencileri sözdizimi kalıplarını sorunsuz bir şekilde okuyup yazmayı öğrendiler.", word: "since", options: ["since", "because", "unless", "if"] },
      { en: "Internal boards have not held any emergency coordination meetings since the new president was elected by the administrative committee.", tr: "Yönetim komitesi tarafından yeni başkan seçildiğinden beri iç kurullar herhangi bir acil koordinasyon toplantısı düzenlemedi.", word: "since", options: ["since", "although", "unless", "whereas"] },
      { en: "The historical reference documentation has not been altered in any way since it was first passed 100 years ago by state ministers.", tr: "100 yıl önce eyalet bakanları tarafından ilk kez kabul edildiğinden beri tarihi referans belgeleri hiçbir şekilde değiştirilmedi.", word: "since", options: ["since", "because", "unless", "before"] },
      { en: "Software architects have encountered severe execution bottlenecks since the infrastructure collapsed under intense simulation stress testing.", tr: "Yoğun simülasyon stres testi altında altyapı çöktüğünden beri yazılım mimarları ciddi yürütme darboğazlarıyla karşılaştılar.", word: "since", options: ["since", "although", "unless", "until"] },
      { en: "Relational data repositories have displayed persistent formatting discrepancies since the migration initialized across the decentralized computing nodes.", tr: "Merkeziyetsiz hesaplama düğümleri genelinde geçiş başlatıldığından beri ilişkisel veri havuzları kalıcı biçimlendirme tutarsızlıkları gösterdi.", word: "since", options: ["since", "because", "unless", "so"] },
      { en: "Automated tracking logs have generated an alarming number of processing flag messages since errors accumulated within the source code.", tr: "Kaynak kod içinde hatalar biriktiğinden beri otomatik takip günlükleri endişe verici sayıda işlem bayrağı mesajı oluşturdu.", word: "since", options: ["since", "although", "unless", "whereas"] },
      { en: "Discerning frontend users have constantly complained about navigation lag thresholds since parameters shifted abruptly during the live session.", tr: "Canlı oturum sırasında parametreler aniden değiştiğinden beri seçici ön uç kullanıcıları gezinme gecikme eşiklerinden sürekli şikayet ettiler.", word: "since", options: ["since", "because", "unless", "before"] },
      { en: "Autonomous network nodes have blocked all unauthenticated external client profiles since tokens were validated by the core security layer.", tr: "Çekirdek güvenlik katmanı tarafından jetonlar doğrulandığından beri otonom ağ düğümleri tüm kimliği doğrulanmamış dış istemci profillerini engelledi.", word: "since", options: ["since", "although", "unless", "so"] },
      { en: "Cross-disciplinary engineering groups have struggled to execute complex spatial queries since storage space diminished inside the local server.", tr: "Yerel sunucu içindeki depolama alanı azaldığından beri disiplinler arası mühendislik grupları karmaşık mekansal sorguları yürütmekte zorlandılar.", word: "since", options: ["since", "because", "unless", "whereas"] },
      { en: "Computational latency metrics have dropped significantly across all cloud partitions since routines executed concurrently without triggering compilation errors.", tr: "Derleme hatalarını tetiklemeden rutinler eşzamanlı olarak yürütüldüğünden beri hesaplama gecikme metrikleri tüm bulut bölümlerinde önemli ölçüde düştü.", word: "since", options: ["since", "although", "unless", "until"] },
      { en: "Senior system developers have focused heavily on building adaptive interface layers since documentation was finalized by the technical unit.", tr: "Teknik birim tarafından belgeler nihai hale getirildiğinden beri kıdemli sistem geliştiricileri ağırlıklı olarak uyarlanabilir arayüz katmanları oluşturmaya odaklandılar.", word: "since", options: ["since", "because", "unless", "before"] },
      { en: "Maintenance technicians have carefully monitored the vacuum incubation unit since components decayed inside chambers due to moisture exposure.", tr: "Nem maruziyeti nedeniyle bileşenler odaların içinde çürüdüğünden beri bakım teknisyenleri vakumlu inkübasyon ünitesini dikkatle izlediler.", word: "since", options: ["since", "although", "unless", "so"] },
      { en: "External corporate profiles have failed to retrieve unverified empirical datasets since access was restricted by the primary firewall rules.", tr: "Birincil güvenlik duvarı kuralları ile erişim kısıtlandığından beri harici kurumsal profiller doğrulanmamış ampirik veri setlerini geri alamadı.", word: "since", options: ["since", "because", "unless", "whereas"] },
      { en: "Institutional investment groups have drastically reduced their regional corporate spending since metrics declined sharply across volatile constituent sectors.", tr: "Değişken kurucu sektörlerde metrikler keskin bir şekilde düştüğünden beri kurumsal yatırım grupları bölgesel kurumsal harcamalarını büyük ölçüde azalttı.", word: "since", options: ["since", "although", "unless", "until"] },
      { en: "Redundant server networks have required continuous human supervision since algorithms mutated rapidly without any structural governance oversight.", tr: "Yapısal bir yönetişim denetimi olmaksızın algoritmalar hızla mutasyona uğradığından beri yedekli sunucu ağları sürekli insan gözetimi gerektirdi.", word: "since", options: ["since", "because", "unless", "before"] },
      { en: "Discerning application users have reported an exceptionally smooth session experience since features were integrated seamlessly into the main build.", tr: "Özellikler ana sürüme sorunsuz bir şekilde entegre edildiğinden beri seçici uygulama kullanıcıları son derece akıcı bir oturum deneyimi bildirdiler.", word: "since", options: ["since", "although", "unless", "so"] },
      { en: "Many corporate entities have expressed deep dissatisfaction regarding infrastructure asset management since rigid limits were enforced by the state department.", tr: "Eyalet departmanı tarafından katı sınırlar uygulandığından beri many corporate entities altyapı varlık yönetimi konusunda derin memnuniyetsizliklerini dile getirdi.", word: "since", options: ["since", "because", "unless", "whereas"] },
      { en: "High-volume server transaction traffic lines have suffered from catastrophic cache crashes since queries triggered bottlenecks over the weekend.", tr: "Hafta sonu sorgular darboğazları tetiklediğinden beri yüksek hacimli sunucu işlem trafiği hatları felaket niteliğinde önbellek çökmeleri yaşadı.", word: "since", options: ["since", "although", "unless", "until"] }
    ],
    extraComplex: [
      { en: "The corporate organization has recorded notable productivity growth since the new law was passed by the national parliament.", tr: "Yeni yasa ulusal parlamento tarafından kabul edildiğinden beri kurumsal organizasyon dikkate değer bir üretkenlik artışı kaydetti.", word: "since", options: ["since", "although", "unless", "before"] },
      { en: "The agricultural specialists have observed steady metric improvements since they were planted inside the validation chambers.", tr: "Doğrulama odalarının içine dikildiklerinden beri tarım uzmanları istikrarlı metrik iyileşmeler gözlemlediler.", word: "since", options: ["since", "although", "unless", "until"] },
      { en: "The children have developed excellent language skills since they started school under the guidance of native educators.", tr: "Yerel eğitimcilerin rehberliğinde okula başladıklarından beri çocuklar mükemmel dil becerileri geliştirdiler.", word: "since", options: ["since", "because", "unless", "if"] },
      { en: "The administrative board has not scheduled any general meetings since the new president was elected by the shareholders.", tr: "Hissedarlar tarafından yeni başkan seçildiğinden beri yönetim kurulu herhangi bir genel toplantı planlamadı.", word: "since", options: ["since", "although", "unless", "whereas"] },
      { en: "The national archive has preserved the historical manuscripts carefully since it was first passed by the state ministers.", tr: "Eyalet bakanları tarafından ilk kez kabul edildiğinden beri ulusal arşiv tarihi el yazmalarını özenle korumuştur.", word: "since", options: ["since", "because", "unless", "before"] },
      { en: "The technical unit has faced continuous compilation errors since the infrastructure collapsed under extreme simulation stress.", tr: "Altyapı aşırı simülasyon stresi altında çöktüğünden beri teknik birim sürekli derleme hatalarıyla karşılaştı.", word: "since", options: ["since", "although", "unless", "until"] },
      { en: "The decentralized database system has displayed formatting anomalies since the migration initialized across the remote cloud nodes.", tr: "Uzak bulut düğümleri genelinde geçiş başlatıldığından beri merkeziyetsiz veritabanı sistemi biçimlendirme anomalileri gösterdi.", word: "since", options: ["since", "because", "unless", "so"] },
      { en: "Security logs have generated an alarmingly high number of error reports since errors accumulated in the source modules.", tr: "Kaynak modüllerde hatalar biriktiğinden beri güvenlik günlükleri endişe verici derecede yüksek sayıda hata raporu oluşturdu.", word: "since", options: ["since", "although", "unless", "whereas"] },
      { en: "The database administrators have tried to optimize the backend script since parameters shifted during the live transaction update.", tr: "Canlı işlem güncellemesi sırasında parametreler değiştiğinden beri veritabanı yöneticileri arka uç betiğini optimize etmeye çalıştılar.", word: "since", options: ["since", "because", "unless", "before"] },
      { en: "Automated firewalls have blocked all unverified transaction request headers since tokens were validated by the security manager.", tr: "Jetonlar güvenlik yöneticisi tarafından doğrulandığından beri otomatik güvenlik duvarları tüm doğrulanmamış işlem isteği başlıklarını engelledi.", word: "since", options: ["since", "although", "unless", "so"] },
      { en: "Cross-disciplinary groups have struggled to perform complex analytical tasks since storage space diminished inside the local server.", tr: "Yerel sunucu içindeki depolama alanı azaldığından beri disiplinler arası gruplar karmaşık analitik görevleri yerine getirmekte zorlandılar.", word: "since", options: ["since", "because", "unless", "whereas"] },
      { en: "System latency thresholds have decreased significantly across all partitions since routines executed concurrently without triggering compilation failures.", tr: "Derleme hatalarını tetiklemeden rutinler eşzamanlı olarak yürütüldüğünden beri sistem gecikme eşikleri tüm bölümlerde önemli ölçüde azaldı.", word: "since", options: ["since", "although", "unless", "until"] },
      { en: "Discerning application developers have focused on building adaptive user interfaces since documentation was finalized by the technical team.", tr: "Belgeler teknik ekip tarafından nihai hale getirildiğinden beri seçici uygulama geliştiricileri uyarlanabilir kullanıcı arayüzleri oluşturmaya odaklandılar.", word: "since", options: ["since", "because", "unless", "before"] },
      { en: "Maintenance technicians have carefully monitored the vacuum incubation unit since components decayed inside chambers due to moisture exposure.", tr: "Nem maruziyeti nedeniyle bileşenler odaların içinde çürüdüğünden beri bakım teknisyenleri vakumlu inkübasyon ünitesini dikkatle izlediler.", word: "since", options: ["since", "although", "unless", "so"] },
      { en: "Unauthenticated client profiles have failed to retrieve unverified empirical datasets since access was restricted by the primary firewall rules.", tr: "Birincil güvenlik duvarı kuralları ile erişim kısıtlandığından beri harici kurumsal profiller doğrulanmamış ampirik veri setlerini geri alamadı.", word: "since", options: ["since", "because", "unless", "whereas"] },
      { en: "Institutional investment groups have drastically reduced their regional corporate spending since metrics declined sharply across volatile constituent sectors.", tr: "Değişken kurucu sektörlerde metrikler keskin bir şekilde düştüğünden beri kurumsal yatırım grupları bölgesel kurumsal harcamalarını büyük ölçüde azalttı.", word: "since", options: ["since", "although", "unless", "until"] },
      { en: "Redundant server networks have required continuous human supervision since algorithms mutated rapidly without any structural governance oversight.", tr: "Yapısal bir yönetişim denetimi olmaksızın algoritmalar hızla mutasyona uğradığından beri yedekli sunucu ağları sürekli insan gözetimi gerektirdi.", word: "since", options: ["since", "because", "unless", "before"] },
      { en: "Discerning application users have reported an exceptionally smooth session experience since features were integrated seamlessly into the main build.", tr: "Özellikler ana sürüme sorunsuz bir şekilde entegre edildiğinden beri seçici uygulama kullanıcıları son derece akıcı bir oturum deneyimi bildirdiler.", word: "since", options: ["since", "although", "unless", "so"] },
      { en: "Many corporate entities have expressed deep dissatisfaction regarding infrastructure asset management since rigid limits were enforced by the state department.", tr: "Eyalet departmanı tarafından katı sınırlar uygulandığından beri birçok kurumsal yapı altyapı varlık yönetimi konusunda derin memnuniyetsizliklerini dile getirdi.", word: "since", options: ["since", "because", "unless", "whereas"] },
      { en: "High-volume server transaction traffic lines have suffered from catastrophic cache crashes since queries triggered bottlenecks over the weekend.", tr: "Hafta sonu sorgular darboğazları tetiklediğinden beri yüksek hacimli sunucu işlem trafiği hatları felaket niteliğinde önbellek çökmeleri yaşadı.", word: "since", options: ["since", "although", "unless", "until"] }
    ]
  },
  "3": {
    topicKey: "as",
    title: "B. Sebep - c) as",
    formula: "As + Clause, Main Clause",
    example: "As the cost is too great, profits cannot be high: Maliyet çok yüksek olduğundan dolayı karlar yüksek olamaz.",
    description: "Gerekçe ve ön koşul bildiren <strong>as</strong> bağlacı, genellikle cümlenin başında kullanılarak bir durumun doğal sonucunu ana eyleme bağlar. Türkçeye <strong>'-diğinden dolayı'</strong> veya <strong>'-mesi sebebiyle'</strong> olarak çevrilir.",
    micro: [
      { en: "as the patient was suffering", tr: "hasta muzdarip olduğundan dolayı", word: "as", options: ["as", "although", "unless", "until"] },
      { en: "as the population had increased", tr: "nüfus arttığından dolayı", word: "as", options: ["as", "although", "unless", "before"] },
      { en: "as the cost is too great", tr: "maliyet çok yüksek olduğundan dolayı", word: "as", options: ["as", "because", "unless", "if"] },
      { en: "as capital would be required", tr: "sermaye gerekeceğinden dolayı", word: "as", options: ["as", "although", "unless", "whereas"] },
      { en: "as parameters vary significantly", tr: "parametreler önemli ölçüde değişiklik gösterdiğinden dolayı", word: "as", options: ["as", "because", "unless", "before"] },
      { en: "as memory leakage occurs", tr: "bellek sızıntısı meydana geldiğinden dolayı", word: "as", options: ["as", "although", "unless", "until"] },
      { en: "as latency is minimized", tr: "gecikme en aza indirildiğinden dolayı", word: "as", options: ["as", "because", "unless", "so"] },
      { en: "as data degrades continuously", tr: "veriler sürekli kötüleştiğinden dolayı", word: "as", options: ["as", "although", "unless", "whereas"] },
      { en: "as compliance codes conflict", tr: "uyumluluk kodları çeliştiğinden dolayı", word: "as", options: ["as", "because", "unless", "before"] },
      { en: "as the framework expands dynamically", tr: "çerçeve dinamik olarak genişlediğinden dolayı", word: "as", options: ["as", "although", "unless", "so"] },
      { en: "as metrics decline sharply", tr: "metrikler keskin bir şekilde düştüğünden dolayı", word: "as", options: ["as", "because", "unless", "whereas"] },
      { en: "as errors trigger bottlenecks", tr: "hatalar darboğazları tetiklediğinden dolayı", word: "as", options: ["as", "although", "unless", "until"] },
      { en: "as the repository is corrupted", tr: "havuz bozulduğundan dolayı", word: "as", options: ["as", "because", "unless", "before"] },
      { en: "as entries remain anonymous", tr: "girdiler anonim kaldığından dolayı", word: "as", options: ["as", "although", "unless", "so"] },
      { en: "as alternative solutions are limited", tr: "alternatif çözümler sınırlı olduğundan dolayı", word: "as", options: ["as", "because", "unless", "whereas"] },
      { en: "as compilation fails repeatedly", tr: "derleme tekrar tekrar başarısız olduğundan dolayı", word: "as", options: ["as", "although", "unless", "until"] },
      { en: "as raw engineering files undergo extensive modification", tr: "ham mühendislik dosyaları kapsamlı değişiklikten geçtiğinden dolayı", word: "as", options: ["as", "because", "unless", "before"] },
      { en: "as automated cloud networks operate efficiently", tr: "otomatik bulut ağları verimli çalıştığından dolayı", word: "as", options: ["as", "although", "unless", "so"] },
      { en: "as cryptographic tokens grant clearance parameters", tr: "kriptografik jetonlar yetkilendirme parametrelerini verdiğinden dolayı", word: "as", options: ["as", "because", "unless", "whereas"] },
      { en: "as organizational security is compromised", tr: "kurumsal güvenlik tehlikeye girdiğinden dolayı", word: "as", options: ["as", "although", "unless", "until"] }
    ],
    academic: [
      { en: "As the patient was suffering from high blood pressure, specialized medical clinics were unwilling to perform the complex surgical operation.", tr: "Hasta yüksek tansiyondan muzdarip olduğundan dolayı uzman tıp klinikleri karmaşık cerrahi operasyonu gerçekleştirmeye istekli değildi.", word: "As", options: ["As", "Although", "Unless", "Until"] },
      { en: "As the population had increased very rapidly between 1700 and 1800, plenty of cheap labor was available for the newly-established industrial factories.", tr: "1700 ve 1800 yılları arasında nüfus çok hızlı arttığından dolayı yeni kurulan sanayi fabrikaları için bol miktarda ucuz iş gücü mevcuttu.", word: "As", options: ["As", "Although", "Unless", "Before"] },
      { en: "As the cost of production and raw materials is too great, the annual corporate profits cannot be very high this fiscal quarter.", tr: "Üretim ve hammadde maliyeti çok yüksek olduğundan dolayı yıllık kurumsal kar bu mali çeyrekte çok yüksek olamaz.", word: "As", options: ["As", "Because", "Unless", "If"] },
      { en: "As a large amount of capital expenditure would be required, the introduction of modern machinery must be delayed at present by the board.", tr: "Büyük miktarda sermaye harcaması gerekeceğinden dolayı modern makinelerin devreye alınması şu anda yönetim kurulu tarafından ertelenmelidir.", word: "As", options: ["As", "Although", "Unless", "Whereas"] },
      { en: "As parameters vary significantly depending on which empirical dataset the lab references, evaluators reject arbitrary validation criteria.", tr: "Parametreler laboratuvarın hangi ampirik veri setini referans aldığına bağlı olarak önemli ölçüde değişiklik gösterdiğinden dolayı değerlendiriciler keyfi doğrulama kriterlerini reddeder.", word: "As", options: ["As", "Because", "Unless", "Before"] },
      { en: "As memory leakage occurs continuously across decentralized computing nodes, system administrators recommend a full platform reboot over the weekend.", tr: "Merkeziyetsiz hesaplama düğümleri genelinde sürekli bellek sızıntısı meydana geldiğinden dolayı sistem yöneticileri hafta sonu tam bir platform yeniden başlatılmasını önermektedir.", word: "As", options: ["As", "Although", "Unless", "Until"] },
      { en: "As runtime latency is minimized effectively by optimized server scripts, language learners study the curriculum without any lag.", tr: "Çalışma zamanı gecikmesi optimize edilmiş sunucu betikleriyle etkili bir şekilde en aza indirildiğinden dolayı dil öğrencileri müfredatı herhangi bir gecikme olmadan çalışırlar.", word: "As", options: ["As", "Because", "Unless", "So"] },
      { en: "As data degrades continuously due to ink and paper disintegration over the centuries, the library plans to digitize all qualitative monographs.", tr: "Yüzyıllar boyunca mürekkep ve kağıdın bozulması nedeniyle veriler sürekli kötüleştiğinden dolayı kütüphane tüm nitel monografileri dijitalleştirmeyi planlamaktadır.", word: "As", options: ["As", "Although", "Unless", "Whereas"] },
      { en: "As compliance codes conflict openly with the baseline documentation, the automated validation compiler triggers an immediate processing flag error.", tr: "Uyumluluk kodları temel belgelerle açıkça çeliştiğinden dolayı otomatik doğrulama derleyicisi derhal bir işlem bayrağı hatası tetikler.", word: "As", options: ["As", "Because", "Unless", "Before"] },
      { en: "As the framework expands dynamically whenever an unoptimized query thread runs, production servers require extra memory allocation fields.", tr: "Optimize edilmemiş bir sorgu dizisi çalıştığında çerçeve dinamik olarak genişlediğinden dolayı üretim sunucuları ekstra bellek tahsis alanları gerektirir.", word: "As", options: ["As", "Although", "Unless", "So"] },
      { en: "As corporate performance metrics decline sharply across volatile constituent sectors, investment groups must modify their commercial roadmaps.", tr: "Kurumsal performans metrikleri değişken kurucu sektörlerde keskin bir şekilde düştüğünden dolayı yatırım grupları ticari yol haritalarını değiştirmelidir.", word: "As", options: ["As", "Because", "Unless", "Whereas"] },
      { en: "As loose query loops trigger bottlenecks during high-volume transaction traffic rushes, intelligent compilers block unverified execution scripts.", tr: "Gevşek sorgu döngüleri yüksek hacimli işlem trafiği yoğunluklarında darboğazları tetiklediğinden dolayı akıllı derleyiciler doğrulanmamış yürütme betiklerini engeller.", word: "As", options: ["As", "Although", "Unless", "Until"] },
      { en: "As the repository is corrupted by a malicious software glitch, network firewalls scan all server directories to isolate affected source codes.", tr: "Havuz kötü niyetli bir yazılım hatası nedeniyle bozulduğundan dolayı ağ güvenlik duvarları etkilenen kaynak kodlarını izole etmek için tüm sunucu dizinlerini tarar.", word: "As", options: ["As", "Because", "Unless", "Before"] },
      { en: "As entries remain anonymous within the restricted partition, local validation authorities refuse to grant administrative clearance codes.", tr: "Girdiler kısıtlı bölüm içinde anonim kaldığından dolayı yerel doğrulama yetkilileri idari yetkilendirme kodları vermeyi reddeder.", word: "As", options: ["As", "Although", "Unless", "So"] },
      { en: "As alternative solutions are limited due to severe hardware resource constraints, cross-disciplinary teams must optimize existing builds.", tr: "Ciddi donanım kaynağı kısıtlamaları nedeniyle alternatif çözümler sınırlı olduğundan dolayı disiplinler arası ekipler mevcut sürümleri optimize etmelidir.", word: "As", options: ["As", "Because", "Unless", "Whereas"] },
      { en: "As compilation fails repeatedly inside the unsealed vacuum incubator, maintenance technicians plan to replace raw core components.", tr: "Mühürlenmemiş vakum inkübatörü içinde derleme tekrar tekrar başarısız olduğundan dolayı bakım teknisyenleri ham çekirdek bileşenleri değiştirmeyi planlamaktadır.", word: "As", options: ["As", "Although", "Unless", "Until"] },
      { en: "As raw engineering files undergo extensive modification, project coordinators must continuously update the baseline reference documentation.", tr: "Ham mühendislik dosyaları kapsamlı değişiklikten geçtiğinden dolayı project coordinators temel referans belgelerini sürekli güncellemelidir.", word: "As", options: ["As", "Because", "Unless", "Before"] },
      { en: "As automated cloud networks operate efficiently under intense pressure thresholds, technology firms prefer decentralized layout designs.", tr: "Otomatik bulut ağları yoğun basınç eşikleri altında verimli çalıştığından dolayı teknoloji firmaları merkeziyetsiz düzen tasarımlarını tercih etmektedir.", word: "As", options: ["As", "Although", "Unless", "So"] },
      { en: "As cryptographic tokens grant clearance parameters automatically, authenticated client profiles navigate advanced modules seamlessly.", tr: "Kriptografik jetonlar yetkilendirme parametrelerini otomatik olarak verdiğinden dolayı kimliği doğrulanmış istemci profilleri gelişmiş modüllerde sorunsuz bir şekilde gezinir.", word: "As", options: ["As", "Because", "Unless", "Whereas"] },
      { en: "As organizational security is compromised by a loose configuration filter, senior directors have scheduled an emergency committee audit.", tr: "Kurumsal güvenlik gevşek bir yapılandırma filtresi nedeniyle tehlikeye girdiğinden dolayı kıdemli direktörler acil bir komite denetimi planlamıştır.", word: "As", options: ["As", "Although", "Unless", "Until"] }
    ],
    extraComplex: [
      { en: "As the patient was suffering from high blood pressure, medical specialists decided to postpone the complex surgical operation.", tr: "Hasta yüksek tansiyondan muzdarip olduğundan dolayı tıp uzmanları karmaşık cerrahi operasyonu ertelemeye karar verdi.", word: "As", options: ["As", "Although", "Unless", "Until"] },
      { en: "As the population had increased very rapidly across the country, plenty of cheap labor was available for the factories.", tr: "Ülke genelinde nüfus çok hızlı arttığından dolayı fabrikalar için bol miktarda ucuz iş gücü mevcuttu.", word: "As", options: ["As", "Although", "Unless", "Before"] },
      { en: "As the cost of raw materials is too great for the startup, the annual profits cannot be very high.", tr: "Hammadde maliyeti girişim için çok yüksek olduğundan dolayı yıllık kar çok yüksek olamaz.", word: "As", options: ["As", "Because", "Unless", "If"] },
      { en: "As a large amount of capital expenditure would be required, the installation of modern machinery must be delayed.", tr: "Büyük miktarda sermaye harcaması gerekeceğinden dolayı modern makinelerin kurulumu ertelenmelidir.", word: "As", options: ["As", "Although", "Unless", "Whereas"] },
      { en: "As parameters vary significantly depending on the empirical dataset, the research unit rejects arbitrary validation criteria.", tr: "Parametreler ampirik veri setine bağlı olarak önemli ölçüde değişiklik gösterdiğinden dolayı araştırma birimi keyfi doğrulama kriterlerini reddeder.", word: "As", options: ["As", "Because", "Unless", "Before"] },
      { en: "As memory leakage occurs continuously across the computing nodes, system administrators recommend a full platform restart.", tr: "Hesaplama düğümleri genelinde sürekli bellek sızıntısı meydana geldiğinden dolayı sistem yöneticileri platformun tamamen yeniden başlatılmasını önermektedir.", word: "As", options: ["As", "Although", "Unless", "Until"] },
      { en: "As runtime latency is minimized effectively by optimized server scripts, language learners study the curriculum without any lag.", tr: "Çalışma zamanı gecikmesi optimize edilmiş sunucu betikleriyle etkili bir şekilde en aza indirildiğinden dolayı dil öğrencileri müfredatı herhangi bir gecikme olmadan çalışırlar.", word: "As", options: ["As", "Because", "Unless", "So"] },
      { en: "As data degrades continuously due to paper disintegration over the centuries, the library plans to digitize all qualitative documents.", tr: "Yüzyıllar boyunca kağıdın bozulması nedeniyle veriler sürekli kötüleştiğinden dolayı kütüphane tüm nitel belgeleri dijitalleştirmeyi planlamaktadır.", word: "As", options: ["As", "Although", "Unless", "Whereas"] },
      { en: "As compliance codes conflict openly with the baseline schema, the validation compiler triggers an immediate compilation failure.", tr: "Uyumluluk kodları temel şema ile açıkça çeliştiğinden dolayı doğrulama derleyicisi derhal bir derleme hatası tetikler.", word: "As", options: ["As", "Because", "Unless", "Before"] },
      { en: "As the framework expands dynamically whenever an unoptimized query runs, production servers require additional memory allocations.", tr: "Optimize edilmemiş bir sorgu çalıştığında çerçeve dinamik olarak genişlediğinden dolayı üretim sunucuları ek bellek tahsisleri gerektirir.", word: "As", options: ["As", "Although", "Unless", "So"] },
      { en: "As corporate performance metrics decline sharply across volatile sectors, financial analysts must modify their commercial roadmaps.", tr: "Kurumsal performans metrikleri değişken sektörlerde keskin bir şekilde düştüğünden dolayı finansal analistler ticari yol haritalarını değiştirmelidir.", word: "As", options: ["As", "Because", "Unless", "Whereas"] },
      { en: "As loose query loops trigger bottlenecks during high-volume transaction spikes, intelligent compilers block unverified execution scripts.", tr: "Gevşek sorgu döngüleri yüksek hacimli işlem dalgalanmaları sırasında darboğazları tetiklediğinden dolayı akıllı derleyiciler doğrulanmamış yürütme betiklerini engeller.", word: "As", options: ["As", "Although", "Unless", "Until"] },
      { en: "As the repository is corrupted by a malicious software glitch, network firewalls scan all server directories immediately.", tr: "Havuz kötü niyetli bir yazılım hatası nedeniyle bozulduğundan dolayı güvenlik duvarları tüm sunucu dizinlerini derhal tarar.", word: "As", options: ["As", "Because", "Unless", "Before"] },
      { en: "As entries remain anonymous within the restricted partition, local verification authorities refuse to grant administrative parameters.", tr: "Girdiler kısıtlı bölüm içinde anonim kaldığından dolayı yerel doğrulama yetkilileri idari parametreleri vermeyi reddeder.", word: "As", options: ["As", "Although", "Unless", "So"] },
      { en: "As alternative solutions are limited due to severe hardware constraints, cross-disciplinary teams must optimize existing builds.", tr: "Ciddi donanım kısıtlamaları nedeniyle alternatif çözümler sınırlı olduğundan dolayı disiplinler arası ekipler mevcut sürümleri optimize etmelidir.", word: "As", options: ["As", "Because", "Unless", "Whereas"] },
      { en: "As compilation fails repeatedly inside the unsealed incubator, maintenance technicians plan to replace raw core components.", tr: "Mühürlenmemiş inkübatör içinde derleme tekrar tekrar başarısız olduğundan dolayı bakım teknisyenleri ham çekirdek bileşenleri değiştirmeyi planlamaktadır.", word: "As", options: ["As", "Although", "Unless", "Until"] },
      { en: "As raw engineering files undergo extensive modification, project coordinators must update the baseline reference documentation.", tr: "Ham mühendislik dosyaları kapsamlı değişiklikten geçtiğinden dolayı proje koordinatörleri temel referans belgelerini güncellemelidir.", word: "As", options: ["As", "Because", "Unless", "Before"] },
      { en: "As automated cloud networks operate efficiently under intense pressure, technology firms prefer decentralized layout designs.", tr: "Otomatik bulut ağları yoğun basınç altında verimli çalıştığından dolayı teknoloji firmaları merkeziyetsiz düzen tasarımlarını tercih etmektedir.", word: "As", options: ["As", "Although", "Unless", "So"] },
      { en: "As cryptographic tokens grant clearance parameters automatically, authenticated client profiles navigate advanced modules.", tr: "Kriptografik jetonlar yetkilendirme parametrelerini otomatik olarak verdiğinden dolayı kimliği doğrulanmış istemci profilleri gelişmiş modüllerde gezinir.", word: "As", options: ["As", "Because", "Unless", "Whereas"] },
      { en: "As organizational security is compromised by a loose configuration filter, senior directors have scheduled an emergency audit.", tr: "Kurumsal güvenlik gevşek bir yapılandırma filtresi nedeniyle tehlikeye girdiğinden dolayı kıdemli direktörler acil bir denetim planlamıştır.", word: "As", options: ["As", "Although", "Unless", "Until"] }
    ]
  },
  "4": {
    topicKey: "although",
    title: "C. Karşıtlık - 'Although'",
    formula: "Although + Clause, Main Clause",
    example: "Although he has been ill, he finalized the monograph: Hasta olmasına rağmen monografiyi nihai hale getirmeyi başardı.",
    description: "Zıtlık ve ödün bildiren <strong>although</strong> bağlacı, beklenmeyen durumları veya engellere rağmen elde edilen sonuçları ifade eder. Türkçeye <strong>'-e rağmen'</strong>, <strong>'-se de'</strong> veya <strong>'-diği halde'</strong> şeklinde çevrilir.",
    micro: [
      { en: "although it can be proved", tr: "kanıtlanabilse de", word: "although", options: ["although", "because", "unless", "if"] },
      { en: "although he has been ill", tr: "hasta olmasına rağmen", word: "although", options: ["although", "since", "unless", "before"] },
      { en: "although they have been seen", tr: "görülmüş olmalarına rağmen", word: "although", options: ["although", "because", "unless", "until"] },
      { en: "although it is not necessary", tr: "gerekli olmasa da", word: "although", options: ["although", "since", "unless", "so"] },
      { en: "although there is no doubt", tr: "şüphe olmamasına rağmen", word: "although", options: ["although", "because", "unless", "whereas"] },
      { en: "although prices have increased", tr: "fiyatlar artmasına rağmen", word: "although", options: ["although", "since", "unless", "until"] },
      { en: "although work is scarce", tr: "iş kıt olmasına rağmen", word: "although", options: ["thought", "because", "unless", "so"] },
      { en: "although the reaction is slow", tr: "reaksiyon yavaş olsa da", word: "although", options: ["although", "since", "unless", "before"] },
      { en: "although latency displays navigation lag", tr: "gecikme gezinme gecikmesi gösterse de", word: "although", options: ["although", "because", "unless", "whereas"] },
      { en: "although the build is optimized", tr: "sürüm optimize edilmiş olsa da", word: "although", options: ["although", "since", "unless", "until"] },
      { en: "although administrative measures are unconstitutional", tr: "idari tedbirler anayasaya aykırı olsa da", word: "although", options: ["although", "because", "unless", "before"] },
      { en: "although storage space grows increasingly finite", tr: "depolama alanı giderek daha sınırlı hale gelse de", word: "although", options: ["although", "since", "unless", "so"] },
      { en: "although automated scripts execute concurrently", tr: "otomatik betikler eşzamanlı olarak yürütülse de", word: "although", options: ["although", "because", "unless", "whereas"] },
      { en: "although extensive discrepancies exist", tr: "kapsamlı tutarsızlıklar olmasına rağmen", word: "although", options: ["although", "since", "unless", "until"] },
      { en: "although reference documentation remains unverified", tr: "referans belgeleri doğrulanmamış olsa da", word: "although", options: ["although", "because", "unless", "before"] },
      { en: "although the cloud infrastructure is unstable", tr: "bulut altyapısı istikrarsız olsa da", word: "although", options: ["although", "since", "unless", "so"] },
      { en: "although parameters shift abruptly", tr: "parametreler aniden değişse de", word: "although", options: ["although", "because", "unless", "whereas"] },
      { en: "although security firewalls block", tr: "güvenlik duvarları engellese de", word: "although", options: ["although", "since", "unless", "until"] },
      { en: "although systematic validation anomalies lead to calculation overrides", tr: "sistematik doğrulama anomalileri hesaplama geçersiz kılmalarına yol açsa da", word: "although", options: ["although", "because", "unless", "before"] },
      { en: "although loose query loops trigger bottlenecks", tr: "gevşek sorgu döngüleri darboğazları tetiklese de", word: "although", options: ["although", "since", "unless", "so"] }
    ],
    academic: [
      { en: "Although it can be proved that the mathematical computing formula is accurate, empirical evidence remains highly unstable during stress simulations.", tr: "Matematiksel hesaplama formülünün doğru olduğu kanıtlanabilse de stres simülasyonları sırasında ampirik kanıtlar son derece kararsız kalmaya devam etmektedir.", word: "Although", options: ["Although", "Because", "Unless", "If"] },
      { en: "Although he has been ill for consecutive quarters, the senior investigator managed to finalize the qualitative monograph on syntax pedagogy.", tr: "Arka arkaya çeyrekler boyunca hasta olmasına rağmen kıdemli araştırmacı sözdizimi pedagojisi üzerine nitel monografiyi nihai hale getirmeyi başardı.", word: "Although", options: ["Although", "Since", "Unless", "Before"] },
      { en: "Although they have been seen operating inside the restricted partition, the anonymous profiles have not triggered any firewall safety alerts yet.", tr: "Kısıtlı bölüm içinde çalışırken görülmüş olmalarına rağmen anonim profiller henüz herhangi bir güvenlik duvarı güvenlik uyarısı tetiklemedi.", word: "Although", options: ["Although", "Because", "Unless", "Until"] },
      { en: "Although it is not necessary to alter the entire database architecture, developers choose to optimize runtime latency to satisfy users.", tr: "Tüm veritabanı mimarisini değiştirmek gerekli olmasa da geliştiriciler kullanıcıları memnun etmek için çalışma zamanı gecikmesini optimize etmeyi seçmektedir.", word: "Although", options: ["Although", "Since", "Unless", "So"] },
      { en: "Although there is no doubt that the current system latency is high, the platform continues to execute concurrent routines successfully.", tr: "Mevcut sistem gecikmesinin yüksek olduğundan şüphe olmamasına rağmen platform eşzamanlı rutinleri başarıyla yürütmeye devam etmektedir.", word: "Although", options: ["Although", "Because", "Unless", "whereas"] },
      { en: "Although prices have increased dramatically across the province, regional municipalities continue to build critical infrastructure devices.", tr: "İl genelinde fiyatlar dramatik bir şekilde artmasına rağmen bölgesel belediyeler kritik altyapı cihazları inşa etmeye devam ediyor.", word: "Although", options: ["Although", "Since", "Unless", "Until"] },
      { en: "Although work is scarce in marginalized sectors, corporate investment infusions help stabilize the commercial economy to a large extent.", tr: "Marjinalleşmiş sektörlerde iş kıt olmasına rağmen kurumsal yatırım girişleri ticari ekonominin büyük ölçüde istikrara kavuşmasına yardımcı olmaktadır.", word: "Although", options: ["Although", "Because", "Unless", "So"] },
      { en: "Although the reaction is slow when the organic compound is kept in a vacuum chamber, direct sunlight triggers an exothermic process eventually.", tr: "Organik bileşik bir vakum odasında tutulduğunda reaksiyon yavaş olsa da doğrudan güneş ışığı eninde sonunda ekzotermik bir süreci tetikler.", word: "Although", options: ["Although", "Since", "Unless", "Before"] },
      { en: "Although latency displays navigation lag thresholds during high-volume data synchronization spikes, the overall application performance remains stable.", tr: "Gecikme, yüksek hacimli veri senkronizasyonu dalgalanmaları sırasında gezinme gecikmesi eşikleri gösterse de genel uygulama performansı kararlı kalır.", word: "Although", options: ["Although", "Because", "Unless", "Whereas"] },
      { en: "Although the build is optimized to process complex dimensions, the mobile interface still faces severe hardware constraints on older devices.", tr: "Sürüm, karmaşık boyutları işlemek için optimize edilmiş olsa da mobil arayüz eski cihazlarda hala ciddi donanım kısıtlamalarıyla karşı karşıyadır.", word: "Although", options: ["Although", "Since", "Unless", "Until"] },
      { en: "Although administrative measures are unconstitutional, the provincial state department continues to enforce rigid guidelines across the district.", tr: "İdari tedbirler anayasaya aykırı olsa da eyalet departmanı bölge genelinde katı yönergeleri uygulamaya devam etmektedir.", word: "Although", options: ["Although", "Because", "Unless", "Before"] },
      { en: "Although storage space grows increasingly finite inside the cloud repository, database admins refuse to clear historical tracking logs.", tr: "Bulut deposu içinde depolama alanı giderek daha sınırlı hale gelse de veritabanı yöneticileri geçmiş takip günlüklerini temizlemeyi reddediyor.", word: "Although", options: ["Although", "Since", "Unless", "So"] },
      { en: "Although automated scripts execute concurrently to clear redundant server files, compilation errors still manifest periodically.", tr: "Gereksiz sunucu dosyalarını temizlemek için otomatik betikler eşzamanlı olarak yürütülse de derleme hataları hala periyodik olarak kendini göstermektedir.", word: "Although", options: ["Although", "Because", "Unless", "whereas"] },
      { en: "Although extensive discrepancies exist between the baseline schema and the live data parameters, the system avoided a catastrophic crash.", tr: "Temel şema ile canlı veri parametreleri arasında kapsamlı tutarsızlıklar olmasına rağmen sistem felaket bir çöküşten kurtuldu.", word: "Although", options: ["Although", "Since", "Unless", "Until"] },
      { en: "Although reference documentation remains unverified by the constitutional committee, senior legislators started drafting statutory clauses.", tr: "Referans belgeleri anayasa komisyonu tarafından doğrulanmamış olsa da kıdemli yasacılar yasal maddeler hazırlamaya başladılar.", word: "Although", options: ["Although", "Because", "Unless", "Before"] },
      { en: "Although the cloud infrastructure is unstable due to persistent server degradation, cross-disciplinary engineering groups managed to finalize the loop.", tr: "Kalıcı sunucu bozulması nedeniyle bulut altyapısı istikrarsız olsa da disiplinler arası mühendislik grupları döngüyü nihai hale getirmeyi başardı.", word: "Although", options: ["Although", "Since", "Unless", "So"] },
      { en: "Although parameters shift abruptly whenever market trade valuations decline, financial analysts interpret empirical outcomes accurately.", tr: "Piyasa ticaret değerlemeleri düştüğünde parametreler aniden değişse de finansal analistler ampirik sonuçları doğru yorumlar.", word: "Although", options: ["Although", "Because", "Unless", "whereas"] },
      { en: "Although security firewalls block unauthenticated client access automatically, certain malicious glitches still spread silently across directories.", tr: "Güvenlik duvarları kimliği doğrulanmamış istemci erişimini otomatik olarak engellese de bazı kötü niyetli hatalar dizinler arasında sessizce yayılmaya devam etmektedir.", word: "Although", options: ["Although", "Since", "Unless", "Until"] },
      { en: "Although systematic validation anomalies lead to calculation overrides, certified data practitioners can compensate for errors manually.", tr: "Sistematik doğrulama anomalileri hesaplama geçersiz kılmalarına yol açsa da sertifikalı veri uygulayıcıları hataları manuel olarak telafi edebilir.", word: "Although", options: ["Although", "Because", "Unless", "Before"] },
      { en: "Although loose query loops trigger bottlenecks over weekends, the decentralized network maintains full operational functionality.", tr: "Gevşek sorgu döngüleri hafta sonları darboğazları tetiklese de merkeziyetsiz ağ tam operasyonel işlevselliğini korur.", word: "Although", options: ["Although", "Since", "Unless", "So"] }
    ],
    extraComplex: [
      { en: "Although it can be proved that the mathematical computing formula is accurate, empirical evidence remains highly unstable.", tr: "Matematiksel hesaplama formülünün doğru olduğu kanıtlanabilse de ampirik kanıtlar son derece kararsız kalmaya devam etmektedir.", word: "Although", options: ["Although", "Because", "Unless", "If"] },
      { en: "Although he has been ill for consecutive quarters, the senior investigator managed to finalize the qualitative monograph.", tr: "Arka arkaya çeyrekler boyunca hasta olmasına rağmen kıdemli araştırmacı nitel monografiyi nihai hale getirmeyi başardı.", word: "Although", options: ["Although", "Since", "Unless", "Before"] },
      { en: "Although they have been seen operating inside the restricted partition, the anonymous profiles have not triggered alerts.", tr: "Kısıtlı bölüm içinde çalışırken görülmüş olmalarına rağmen anonim profiller uyarı tetiklemedi.", word: "Although", options: ["Although", "Because", "Unless", "Until"] },
      { en: "Although it is not necessary to alter the entire database architecture, developers choose to optimize runtime latency.", tr: "Tüm veritabanı mimarisini değiştirmek gerekli olmasa da geliştiriciler çalışma zamanı gecikmesini optimize etmeyi seçmektedir.", word: "Although", options: ["Although", "Since", "Unless", "So"] },
      { en: "Although there is no doubt that the current system latency is high, the platform continues to execute concurrent routines.", tr: "Mevcut sistem gecikmesinin yüksek olduğundan şüphe olmamasına rağmen platform eşzamanlı rutinleri başarıyla yürütmeye devam etmektedir.", word: "Although", options: ["Although", "Because", "Unless", "whereas"] },
      { en: "Although prices have increased dramatically across the province, regional municipalities continue to build critical infrastructure.", tr: "İl genelinde fiyatlar dramatik bir şekilde artmasına rağmen bölgesel belediyeler kritik altyapı inşa etmeye devam ediyor.", word: "Application", options: ["Although", "Since", "Unless", "Until"] },
      { en: "Although work is scarce in marginalized sectors, corporate investment infusions help stabilize the commercial economy.", tr: "Marjinalleşmiş sektörlerde iş kıt olmasına rağmen kurumsal yatırım girişleri ticari ekonomiyi istikrara kavuşturmaya yardımcı olmaktadır.", word: "Although", options: ["Although", "Because", "Unless", "So"] },
      { en: "Although the reaction is slow when the organic compound is kept in a vacuum chamber, direct sunlight triggers an exothermic process.", tr: "Organik bileşik bir vakum odasında tutulduğunda reaksiyon yavaş olsa da doğrudan güneş ışığı ekzotermik bir süreci tetikler.", word: "Although", options: ["Although", "Since", "Unless", "Before"] },
      { en: "Although latency displays navigation lag thresholds during high-volume data synchronization spikes, application performance remains stable.", tr: "Gecikme, yüksek hacimli veri senkronizasyonu dalgalanmaları sırasında gezinme gecikmesi eşikleri gösterse de uygulama performansı kararlı kalır.", word: "Although", options: ["Although", "Because", "Unless", "Whereas"] },
      { en: "Although the build is optimized to process complex dimensions, the mobile interface still faces severe hardware constraints.", tr: "Sürüm, karmaşık boyutları işlemek için optimize edilmiş olsa da mobil arayüz hala ciddi donanım kısıtlamalarıyla karşı karşıyadır.", word: "Although", options: ["Although", "Since", "Unless", "Until"] },
      { en: "Although administrative measures are unconstitutional, the provincial state department continues to enforce rigid guidelines.", tr: "İdari tedbirler anayasaya aykırı olsa da eyalet departmanı bölge genelinde katı yönergeleri uygulamaya devam etmektedir.", word: "Although", options: ["Although", "Because", "Unless", "Before"] },
      { en: "Although storage space grows increasingly finite inside the cloud repository, database admins refuse to clear tracking logs.", tr: "Bulut deposu içinde depolama alanı giderek daha sınırlı hale gelse de veritabanı yöneticileri takip günlüklerini temizlemeyi reddediyor.", word: "Although", options: ["Although", "Since", "Unless", "So"] },
      { en: "Although automated scripts execute concurrently to clear redundant server files, compilation errors still manifest.", tr: "Gereksiz sunucu dosyalarını temizlemek için otomatik betikler eşzamanlı olarak yürütülse de derleme hataları hala kendini göstermektedir.", word: "Although", options: ["Although", "Because", "Unless", "whereas"] },
      { en: "Although extensive discrepancies exist between the baseline schema and the live data parameters, the system avoided a crash.", tr: "Temel şema ile canlı veri parametreleri arasında kapsamlı tutarsızlıklar olmasına rağmen sistem bir çöküşten kurtuldu.", word: "Although", options: ["Although", "Since", "Unless", "Until"] },
      { en: "Although reference documentation remains unverified by the constitutional committee, senior legislators started drafting clauses.", tr: "Referans belgeleri anayasa komisyonu tarafından doğrulanmamış olsa da kıdemli yasacılar yasal maddeler hazırlamaya başladılar.", word: "Although", options: ["Although", "Because", "Unless", "Before"] },
      { en: "Although the cloud infrastructure is unstable due to persistent server degradation, cross-disciplinary engineering groups managed to finalize the loop.", tr: "Kalıcı sunucu bozulması nedeniyle bulut altyapısı istikrarsız olsa da disiplinler arası mühendislik grupları döngüyü nihai hale getirmeyi başardı.", word: "Although", options: ["Although", "Since", "Unless", "So"] },
      { en: "Although parameters shift abruptly whenever market trade valuations decline, financial analysts interpret outcomes accurately.", tr: "Piyasa ticaret değerlemeleri düştüğünde parametreler aniden değişse de finansal analistler sonuçları doğru yorumlar.", word: "Although", options: ["Although", "Because", "Unless", "whereas"] },
      { en: "Although security firewalls block unauthenticated client access automatically, certain malicious glitches still spread silently.", tr: "Güvenlik duvarları kimliği doğrulanmamış istemci erişimini otomatik olarak engellese de bazı kötü niyetli hatalar sessizce yayılmaya devam etmektedir.", word: "Although", options: ["Although", "Since", "Unless", "Until"] },
      { en: "Although systematic validation anomalies lead to calculation overrides, certified data practitioners can compensate for errors.", tr: "Sistematik doğrulama anomalileri hesaplama geçersiz kılmalarına yol açsa da sertifikalı veri uygulayıcıları hataları telafi edebilir.", word: "Although", options: ["Although", "Because", "Unless", "Before"] },
      { en: "Although loose query loops trigger bottlenecks over weekends, the decentralized network maintains full functionality.", tr: "Gevşek sorgu döngüleri hafta sonları darboğazları tetiklese de merkeziyetsiz ağ tam işlevselliğini korur.", word: "Although", options: ["Although", "Since", "Unless", "So"] }
    ]
  },
  "5": {
    topicKey: "so_that_degree",
    title: "D. Derece",
    formula: "so + Adjective/Adverb + that",
    example: "Cells are so small that they cannot be seen: Hücreler o kadar küçüktür ki görülemezler.",
    description: "Bir sıfatın veya zarfın yoğunluğunu aşırı derecede vurgulayarak (<strong>'o kadar ... ki'</strong>), bu durumun yol açtığı bir sonucu ana cümleye bağlayan yapıları içerir. Sıfat veya zarf <strong>so</strong> ile <strong>that</strong> arasına gelir.",
    micro: [
      { en: "so small that", tr: "o kadar küçük ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so rapidly that", tr: "o kadar hızlı ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so tiny that", tr: "o kadar minik ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so numerous that", tr: "o kadar çok sayıdalar ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so many that", tr: "o kadar çok ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so unstable that", tr: "o kadar kararsız ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so corrupted that", tr: "o kadar bozuk ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so costly that", tr: "o kadar maliyetli ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so severe that", tr: "o kadar şiddetli ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so volatile that", tr: "o kadar uçucu ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so precise that", tr: "o kadar kesin ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so rigid that", tr: "o kadar katı ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so vast that", tr: "o kadar geniş ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so frequently that", tr: "o kadar sık ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so complex that", tr: "o kadar karmaşık ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so critical that", tr: "o kadar kritik ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so efficient that", tr: "o kadar verimli ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so faulty that", tr: "o kadar kusurlu ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so limited that", tr: "o kadar sınırlı ki", word: "so", options: ["so", "such", "too", "very"] },
      { en: "so completely that", tr: "o kadar tamamen ki", word: "so", options: ["so", "such", "too", "very"] }
    ],
    academic: [
      { en: "Cells are so small that they cannot be seen clearly without utilizing a high-powered electron microscope.", tr: "Hücreler o kadar küçüktür ki yüksek güçlü bir elektron mikroskobu kullanılmadan net bir şekilde görülemezler.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The production of cotton increased so rapidly that by 1830 half of Great Britain's exports consisted of cotton products.", tr: "Pamuk üretimi o kadar hızlı arttı ki 1830'a gelindiğinde Büyük Britanya ihracatının yarısı pamuklu ürünlerden oluşuyordu.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The integrated circuits are so tiny that any microscopic contamination will trigger extensive compilation errors inside the cleanroom.", tr: "Entegre devreler o kadar miniktir ki herhangi bir mikroskobik kirlenme temiz odada geniş çaplı derleme hatalarını tetikleyecektir.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "Rabbits became so numerous that they caused millions of pounds of environmental damage every single year across Australia.", tr: "Tavşanlar o kadar sayıca çoğaldı ki Avustralya genelinde her yıl milyonlarca sterlinlik çevre zararına neden oldular.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "So many people died of plague in London that it was completely impossible to bury them in the normal way during the winter crisis.", tr: "Londra'da vebadan o kadar çok insan öldü ki kış krizi sırasında onları normal şekilde gömmek tamamen imkansızdı.", word: "So", options: ["So", "Such", "Too", "Very"] },
      { en: "The central cloud infrastructure is so unstable that background data synchronization tasks face severe latency thresholds daily.", tr: "Merkezi bulut altyapısı o kadar kararsızdır ki arka plan veri senkronizasyon görevleri her gün ciddi gecikme eşikleriyle karşılaşmaktadır.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The repository files became so corrupted that automated recovery scripts failed to restore the baseline architecture schemas.", tr: "Havuz dosyaları o kadar bozuldu ki otomatik kurtarma betikleri temel mimari şemalarını geri yüklemeyi başaramadı.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "Establishing advanced encryption metrics is so costly that regional municipalities choose to delay structural hardware upgrades.", tr: "Gelişmiş şifreleme metrikleri oluşturmak o kadar maliyetlidir ki bölgesel belediyeler yapısal donanım yükseltmelerini ertelemeyi tercih etmektedir.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The simulation stress became so severe that the primary hardware nodes suffered a catastrophic runtime failure over the weekend.", tr: "Simülasyon stresi o kadar şiddetli hale geldi ki birincil donanım düğümleri hafta sonu felaket niteliğinde bir çalışma zamanı hatası yaşadı.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The chemical compound is so volatile that technicians must maintain strict thermal boundaries inside the vacuum incubator.", tr: "Kimyasal bileşik o kadar uçucudur ki teknisyenler vakumlu inkübatör içinde katı termal sınırlar sağlamalıdır.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The parsing script is so precise that even the smallest syntax formatting discrepancies trigger immediate validation flags.", tr: "Ayrıştırma betiği o kadar kesindir ki en küçük sözdizimi biçimlendirme tutarsızlıkları bile derhal doğrulama bayraklarını tetikler.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "Constitutional parameters are so rigid that legislative assemblies struggle to implement alternative legal amendments flexibly.", tr: "Anayasal parametreler o kadar katıdır ki yasama meclisleri alternatif yasal değişiklikleri esnek bir şekilde uygulamakta zorlanırlar.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The decentralized computing network grew so vast that coordinating cross-disciplinary groups required complex layout tools.", tr: "Merkeziyetsiz hesaplama ağı o kadar büyüdü ki disiplinler arası grupları koordine etmek karmaşık düzen araçları gerektirdi.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "Hidden software configuration glitches manifest so frequently that frontend developers must monitor raw tracking logs constantly.", tr: "Gizli yazılım yapılandırma hataları o kadar sık ortaya çıkıyor ki ön uç geliştiricileri ham takip günlüklerini sürekli izlemek zorunda kalıyor.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "Language learning pedagogy models are so complex that designing gamified mobile frameworks demands specific expert analysts.", tr: "Dil öğrenme pedagojisi modelleri o kadar karmaşıktır ki oyunlaştırılmış mobil çerçeveler tasarlamak belirli uzman analistler gerektirir.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "Maintaining strict data safety metrics is so critical that unauthenticated client profiles are automatically blocked by firewalls.", tr: "Katı veri güvenliği metriklerini sürdürmek o kadar kritiktir ki kimliği doğrulanmamış istemci profilleri güvenlik duvarları tarafından otomatik olarak engellenir.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The newly refactored build operates so efficiently that transactional latency was reduced by almost forty percent.", tr: "Yeni yeniden yapılandırılan sürüm o kadar verimli çalışıyor ki işlem gecikmesi neredeyse yüzde kırk oranında azaldı.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The statutory draft clauses were so faulty that state ministers rejected the entire institutional policy file immediately.", tr: "Yasal taslak maddeleri o kadar kusurluydu ki eyalet bakanları kurumsal politika dosyasının tamamını derhal reddetti.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "Financial resources grew so limited that municipal departments were unable to fund local infrastructure expansion plans.", tr: "Mali kaynaklar o kadar sınırlı hale geldi ki belediye departmanları yerel altyapı genişletme planlarını finanse edemedi.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The database migration routine failed so completely that cross-disciplinary engineering groups had to rebuild the server directory from scratch.", tr: "Veritabanı geçiş rutini o kadar tamamen başarısız oldu ki disiplinler arası mühendislik grupları sunucu dizinini sıfırdan yeniden oluşturmak zorunda kaldı.", word: "so", options: ["so", "such", "too", "very"] }
    ],
    extraComplex: [
      { en: "Cells are so small that they cannot be seen clearly without utilizing a high-powered electron microscope.", tr: "Hücreler o kadar küçüktür ki yüksek güçlü bir elektron mikroskobu kullanılmadan net bir şekilde görülemezler.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The production of cotton increased so rapidly that by 1830 half of Great Britain's exports consisted of cotton products.", tr: "Pamuk üretimi o kadar hızlı arttı ki 1830'a gelindiğinde Büyük Britanya ihracatının yarısı pamuklu ürünlerden oluşuyordu.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The integrated circuits are so tiny that any microscopic contamination will trigger extensive compilation errors inside the cleanroom.", tr: "Entegre devreler o kadar miniktir ki herhangi bir mikroskobik kirlenme temiz odada geniş çaplı derleme hatalarını tetikleyecektir.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "Rabbits became so numerous that they caused millions of pounds of environmental damage every single year across Australia.", tr: "Tavşanlar o kadar sayıca çoğaldı ki Avustralya genelinde her yıl milyonlarca sterlinlik çevre zararına neden oldular.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "So many people died of plague in London that it was completely impossible to bury them in the normal way during the winter crisis.", tr: "Londra'da vebadan o kadar çok insan öldü ki kış krizi sırasında onları normal şekilde gömmek tamamen imkansızdı.", word: "So", options: ["So", "Such", "Too", "Very"] },
      { en: "The central cloud infrastructure is so unstable that background data synchronization tasks face severe latency thresholds daily.", tr: "Merkezi bulut altyapısı o kadar kararsızdır ki arka plan veri senkronizasyon görevleri her gün ciddi gecikme eşikleriyle karşılaşmaktadır.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The repository files became so corrupted that automated recovery scripts failed to restore the baseline architecture schemas.", tr: "Havuz dosyaları o kadar bozuldu ki otomatik kurtarma betikleri temel mimari şemalarını geri yüklemeyi başaramadı.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "Establishing advanced encryption metrics is so costly that regional municipalities choose to delay structural hardware upgrades.", tr: "Gelişmiş şifreleme metrikleri oluşturmak o kadar maliyetlidir ki bölgesel belediyeler yapısal donanım yükseltmelerini ertelemeyi tercih etmektedir.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The simulation stress became so severe that the primary hardware nodes suffered a catastrophic runtime failure over the weekend.", tr: "Simülasyon stresi o kadar şiddetli hale geldi ki birincil donanım düğümleri hafta sonu felaket niteliğinde bir çalışma zamanı hatası yaşadı.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The chemical compound is so volatile that technicians must maintain strict thermal boundaries inside the vacuum incubator.", tr: "Kimyasal bileşik o kadar uçucudur ki teknisyenler vakumlu inkübatör içinde katı termal sınırlar sağlamalıdır.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The parsing script is so precise that even the smallest syntax formatting discrepancies trigger immediate validation flags.", tr: "Ayrıştırma betiği o kadar kesindir ki en küçük sözdizimi biçimlendirme tutarsızlıkları bile derhal doğrulama bayraklarını tetikler.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "Constitutional parameters are so rigid that legislative assemblies struggle to implement alternative legal amendments flexibly.", tr: "Anayasal parametreler o kadar katıdır ki yasama meclisleri alternatif yasal değişiklikleri esnek bir şekilde uygulamakta zorlanırlar.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The decentralized computing network grew so vast that coordinating cross-disciplinary groups required complex layout tools.", tr: "Merkeziyetsiz hesaplama ağı o kadar büyüdü ki disiplinler arası grupları koordine etmek karmaşık düzen araçları gerektirdi.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "Hidden software configuration glitches manifest so frequently that frontend developers must monitor raw tracking logs constantly.", tr: "Gizli yazılım yapılandırma hataları o kadar sık ortaya çıkıyor ki ön uç geliştiricileri ham takip günlüklerini sürekli izlemek zorunda kalıyor.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "Language learning pedagogy models are so complex that designing gamified mobile frameworks demands specific expert analysts.", tr: "Dil öğrenme pedagojisi modelleri o kadar karmaşıktır ki oyunlaştırılmış mobil çerçeveler tasarlamak belirli uzman analistler gerektirir.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "Maintaining strict data safety metrics is so critical that unauthenticated client profiles are automatically blocked by firewalls.", tr: "Katı veri güvenliği metriklerini sürdürmek o kadar kritiktir ki kimliği doğrulanmamış istemci profilleri güvenlik duvarları tarafından otomatik olarak engellenir.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The newly refactored build operates so efficiently that transactional latency was reduced by almost forty percent.", tr: "Yeni yeniden yapılandırılan sürüm o kadar verimli çalışıyor ki işlem gecikmesi neredeyse yüzde kırk oranında azaldı.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The statutory draft clauses were so faulty that state ministers rejected the entire institutional policy file immediately.", tr: "Yasal taslak maddeleri o kadar kusurluydu ki eyalet bakanları kurumsal politika dosyasının tamamını derhal reddetti.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "Financial resources grew so limited that municipal departments were unable to fund local infrastructure expansion plans.", tr: "Mali kaynaklar o kadar sınırlı hale geldi ki belediye departmanları yerel altyapı genişletme planlarını finanse edemedi.", word: "so", options: ["so", "such", "too", "very"] },
      { en: "The database migration routine failed so completely that cross-disciplinary engineering groups had to rebuild the server directory from scratch.", tr: "Veritabanı geçiş rutini o kadar tamamen başarısız oldu ki disiplinler arası mühendislik grupları sunucu dizinini sıfırdan yeniden oluşturmak zorunda kaldı.", word: "so", options: ["so", "such", "too", "very"] }
    ]
  },
  "6": {
    topicKey: "so_that_purpose",
    title: "E. Maksat",
    formula: "Main Clause + so that + Subordinate Clause",
    example: "Purified water was stored so that it could be used: Arıtılmış su kullanılabilmesi için saklandı.",
    description: "Ana cümledeki eylemin hangi amaçla veya niyetle yapıldığını (<strong>'-mesi için'</strong>, <strong>'-sin diye'</strong>, <strong>'-mek amacıyla'</strong>) ifade eden yapılardır. <strong>so that</strong> yapısından sonra genellikle <em>can, could, may, might, would</em> kullanılır.",
    micro: [
      { en: "so that it could be used", tr: "kullanılabilmesi için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that the annual profit may be", tr: "yıllık karın olması için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that the crop may yield", tr: "mahsulün ürün vermesi için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that the hinterland may have access", tr: "iç bölgenin erişebilmesi için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that the database can operate", tr: "veritabanının çalışabilmesi için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that errors might be minimized", tr: "hataların en aza indirilebilmesi için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that firewalls would prevent", tr: "güvenlik duvarlarının engellemesi için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that technicians can isolate", tr: "teknisyenlerin izole edebilmesi için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that developers may validate", tr: "geliştiricilerin doğrulayabilmesi için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that legislative councils can pass", tr: "yasama meclislerinin geçirebilmesi için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that researchers would interpret", tr: "araştırmacıların yorumlaması için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that compilation flags could alert", tr: "derleme bayraklarının uyarabilmesi için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that the system might achieve", tr: "sistemin elde edebilmesi için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that parameters would remain", tr: "parametrelerin kalması için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that metadata repositories can sync", tr: "meta veri havuzlarının senkronize olabilmesi için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that regional assemblies may allocate", tr: "bölgesel meclislerin tahsis edebilmesi için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that users could navigate", tr: "kullanıcıların gezinebilmesi için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that composite materials would resist", tr: "kompozit malzemelerin direnmesi için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that empirical documentation can guide", tr: "ampirik belgelerin rehberlik edebilmesi için", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that toxic emissions may decrease", tr: "toksik emisyonların azalması için", word: "so that", options: ["so that", "although", "unless", "since"] }
    ],
    academic: [
      { en: "The purified water was stored inside specialized glass containers so that it could be used later for clinical chemistry trials.", tr: "Arıtılmış su, daha sonra klinik kimya denemelerinde kullanılabilsin diye özel cam kaplarda saklandı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Costs of production must be kept to an absolute minimum so that the annual profit may be as high as possible for corporate shareholders.", tr: "Kurumsal hissedarlar için yıllık karın mümkün olduğunca yüksek olması amacıyla üretim maliyetleri mutlak minimumda tutulmalıdır.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "The total cost of agricultural planting must be managed strategically so that the crop may yield an annual profit next quarter.", tr: "Mahsulün önümüzdeki çeyrekte yıllık kar getirmesi için tarımsal ekimin toplam maliyeti stratejik olarak yönetilmelidir.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "A substantial number of modern railways have been constructed so that the hinterland may have access to the open sea ports.", tr: "İç bölgenin açık deniz limanlarına erişebilmesi amacıyla çok sayıda modern demiryolu inşa edilmiştir.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Database administrators modified the cloud infrastructure configuration so that the database can operate efficiently under heavy load.", tr: "Veritabanı yöneticileri, veritabanının yoğun yük altında verimli çalışabilmesi için bulut altyapısı yapılandırmasını değiştirdi.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Advanced data practitioners refactored the legacy source code script so that errors might be minimized during validation loops.", tr: "Gelişmiş veri uygulayıcıları, doğrulama döngüleri sırasında hataların en aza indirilebilmesi için eski kaynak kod betiğini yeniden yapılandırdı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Network engineers deployed multi-layer encryption parameters so that firewalls would prevent unauthorized external entries from accessing servers.", tr: "Ağ mühendisleri, güvenlik duvarlarının yetkisiz harici girişlerin sunuculara erişmesini engellemesi amacıyla çok katmanlı şifreleme parametreleri dağıttı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Junior laboratory specialists maintained an airtight seal so that technicians can isolate the volatile chemical mixture safely.", tr: "Teknisyenlerin uçucu kimyasal karışımı güvenli bir şekilde izole edebilmesi için yardımcı laboratuvar uzmanları hava geçirmez bir sızdırmazlık sağladı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Project coordinators established a centralized repository dictionary so that developers may validate data formats without facing discrepancies.", tr: "Proje koordinatörleri, geliştiricilerin tutarsızlıklarla karşılaşmadan veri formatlarını doğrulayabilmesi için merkezi bir havuz sözlüğü oluşturdu.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "The legal committee revised the statutory draft text so that legislative councils can pass the structural administrative amendments smoothly.", tr: "Hukuk komitesi, yasama meclislerinin yapısal idari değişiklikleri sorunsuz bir şekilde geçirebilmesi için yasal taslak metnini gözden geçirdi.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Head investigators structured the experimental findings into separate categories so that researchers would interpret outcomes accurately.", tr: "Baş araştırmacılar, araştırmacıların sonuçları doğru bir şekilde yorumlayabilmesi için deneysel bulguları ayrı kategorilere ayırdı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Discerning system architects built an automated monitoring utility so that compilation flags could alert the engineering team instantly.", tr: "Seçici sistem mimarları, derleme bayraklarının mühendislik ekibini anında uyarabilmesi için otomatik bir izleme yardımcı programı oluşturdu.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Game designers integrated a highly interactive grammar pedagogy index so that the system might achieve maximum user retention rates.", tr: "Oyun tasarımcıları, sistemin maksimum kullanıcı elde tutma oranlarına ulaşabilmesi için son derece etkileşimli bir dil bilgiisi pedagojisi indeksi entegre etti.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Remote technicians locked the core storage partition matrix fields so that parameters would remain unchanged during stress simulations.", tr: "Uzak teknisyenler, stres simülasyonları sırasında parametrelerin değişmeden kalması için çekirdek depolama bölümü matris alanlarını kilitledi.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Cloud operators finalized the network synchronization sequence so that metadata repositories can sync across decentralized nodes.", tr: "Bulut operatörleri, meta veri havuzlarının merkeziyetsiz düğümler arasında senkronize olabilmesi için ağ senkronizasyon dizisini nihai hale getirdi.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "State ministers balanced the national financial budget carefully so that regional assemblies may allocate assets to local schools.", tr: "Eyalet bakanları, bölgesel meclislerin yerel okullara varlık tahsis edebilmesi için ulusal mali bütçeyi dikkatle dengeledi.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Agile frontend developers optimized the mobile application builds so that users could navigate advanced interface modules seamlessly.", tr: "Çevik ön uç geliştiricileri, kullanıcıların gelişmiş arayüz modüllerinde sorunsuz bir şekilde gezinebilmesi için mobil uygulama sürümlerini optimize etti.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Mechanical engineers treated the unreinforced support pillars with synthetic resin so that composite materials would resist moisture decay.", tr: "Makine mühendisleri, kompozit malzemelerin nem bozulmasına karşı direnmesi amacıyla takviye edilmemiş destek sütunlarını sentetik reçine ile işledi.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "The scientific board published a series of qualitative monographs so that empirical documentation can guide future field investigations.", tr: "Bilim kurulu, ampirik belgelerin gelecekteki saha araştırmalarına rehberlik edebilmesi için bir dizi nitel monografi yayınladı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Factory managers installed high-efficiency catalytic filters inside testing chambers so that toxic emissions may decrease rapidly.", tr: "Fabrika yöneticileri, toksik emisyonların hızla azalması amacıyla test odalarının içine yüksek verimli katalitik filtreler yerleştirdi.", word: "so that", options: ["so that", "although", "unless", "since"] }
    ],
    extraComplex: [
      { en: "The purified water was stored inside specialized glass containers so that it could be used later for clinical chemistry trials.", tr: "Arıtılmış su, daha sonra klinik kimya denemelerinde kullanılabilsin diye özel cam kaplarda saklandı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Costs of production must be kept to an absolute minimum so that the annual profit may be as high as possible for corporate shareholders.", tr: "Kurumsal hissedarlar için yıllık karın mümkün olduğunca yüksek olması amacıyla üretim maliyetleri mutlak minimumda tutulmalıdır.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "The total cost of agricultural planting must be managed strategically so that the crop may yield an annual profit next quarter.", tr: "Mahsulün önümüzdeki çeyrekte yıllık kar getirmesi için tarımsal ekimin toplam maliyeti stratejik olarak yönetilmelidir.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "A substantial number of modern railways have been constructed so that the hinterland may have access to the open sea ports.", tr: "İç bölgenin açık deniz limanlarına erişebilmesi amacıyla çok sayıda modern demiryolu inşa edilmiştir.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Database administrators modified the cloud infrastructure configuration so that the database can operate efficiently under heavy load.", tr: "Veritabanı yöneticileri, veritabanının yoğun yük altında verimli çalışabilmesi için bulut altyapısı yapılandırmasını değiştirdi.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Advanced data practitioners refactored the legacy source code script so that errors might be minimized during validation loops.", tr: "Gelişmiş veri uygulayıcıları, doğrulama döngüleri sırasında hataların en aza indirilebilmesi için eski kaynak kod betiğini yeniden yapılandırdı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Network engineers deployed multi-layer encryption parameters so that firewalls would prevent unauthorized external entries from accessing servers.", tr: "Ağ mühendisleri, güvenlik duvarlarının yetkisiz harici girişlerin sunuculara erişmesini engellemesi amacıyla çok katmanlı şifreleme parametreleri dağıttı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Junior laboratory specialists maintained an airtight seal so that technicians can isolate the volatile chemical mixture safely.", tr: "Teknisyenlerin uçucu kimyasal karışımı güvenli bir şekilde izole edebilmesi için yardımcı laboratuvar uzmanları hava geçirmez bir sızdırmazlık sağladı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Project coordinators established a centralized repository dictionary so that developers may validate data formats without facing discrepancies.", tr: "Proje koordinatörleri, geliştiricilerin tutarsızlıklarla karşılaşmadan veri formatlarını doğrulayabilmesi için merkezi bir havuz sözlüğü oluşturdu.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "The legal committee revised the statutory draft text so that legislative councils can pass the structural administrative amendments smoothly.", tr: "Hukuk komitesi, yasama meclislerinin yapısal idari değişiklikleri sorunsuz bir şekilde geçirebilmesi için yasal taslak metnini gözden geçirdi.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Head investigators structured the experimental findings into separate categories so that researchers would interpret outcomes accurately.", tr: "Baş araştırmacılar, araştırmacıların sonuçları doğru bir şekilde yorumlayabilmesi için deneysel bulguları ayrı kategorilere ayırdı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Discerning system architects built an automated monitoring utility so that compilation flags could alert the engineering team instantly.", tr: "Seçici sistem mimarları, derleme bayraklarının mühendislik ekibini anında uyarabilmesi için otomatik bir izleme yardımcı programı oluşturdu.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Game designers integrated a highly interactive grammar pedagogy index so that the system might achieve maximum user retention rates.", tr: "Oyun tasarımcıları, sistemin maksimum kullanıcı elde tutma oranlarına ulaşabilmesi için son derece etkileşimli bir dil bilgisi pedagojisi indeksi entegre etti.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Remote technicians locked the core storage partition matrix fields so that parameters would remain unchanged during stress simulations.", tr: "Uzak teknisyenler, stres simülasyonları sırasında parametrelerin değişmeden kalması için çekirdek depolama bölümü matris alanlarını kilitledi.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Cloud operators finalized the network synchronization sequence so that metadata repositories can sync across decentralized nodes.", tr: "Bulut operatörleri, meta veri havuzlarının merkeziyetsiz düğümler arasında senkronize olabilmesi için ağ senkronizasyon dizisini nihai hale getirdi.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "State ministers balanced the national financial budget carefully so that regional assemblies may allocate assets to local schools.", tr: "Eyalet bakanları, bölgesel meclislerin yerel okullara varlık tahsis edebilmesi için ulusal mali bütçeyi dikkatle dengeledi.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Agile frontend developers optimized the mobile application builds so that users could navigate advanced interface modules seamlessly.", tr: "Çevik ön uç geliştiricileri, kullanıcıların gelişmiş arayüz modüllerinde sorunsuz bir şekilde gezinebilmesi için mobil uygulama sürümlerini optimize etti.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Mechanical engineers treated the unreinforced support pillars with synthetic resin so that composite materials would resist moisture decay.", tr: "Makine mühendisleri, kompozit malzemelerin nem bozulmasına karşı direnmesi amacıyla takviye edilmemiş destek sütunlarını sentetik reçine ile işledi.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "The scientific board published a series of qualitative monographs so that empirical documentation can guide future field investigations.", tr: "Bilim kurulu, ampirik belgelerin gelecekteki saha araştırmalarına rehberlik edebilmesi için bir dizi nitel monografi yayınladı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Factory managers installed high-efficiency catalytic filters inside testing chambers so that toxic emissions may decrease rapidly.", tr: "Fabrika yöneticileri, toksik emisyonların hızla azalması amacıyla test odalarının içine yüksek verimli katalitik filtreler yerleştirdi.", word: "so that", options: ["so that", "although", "unless", "since"] }
    ]
  },
  "7": {
    topicKey: "with_the_result_that",
    title: "F. Netice",
    formula: "Main Clause + with the result that + Subordinate Clause",
    example: "The mixture exploded with the result that the server crashed: Karışım patladı, bunun sonucunda sunucu çöktü.",
    description: "Ana cümledeki eylemin planlanmamış, kendiliğinden gelişen veya kaçınılmaz olarak doğurduğu nesnel bir sonucu (<strong>'bunun sonucunda'</strong>, <strong>'böylece'</strong>, <strong>'neticesiyle'</strong>) ifade eden yapılardır.",
    micro: [
      { en: "so that only some aspects are", tr: "böylece sadece bazı yönler olur", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that the gap is closed", tr: "böylece boşluk kapanır", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that there is no longer enough", tr: "böylece artık yeterli olmaz", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that rocks begin to break", tr: "böylece kayalar kırılmaya başlar", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "with the result that compilation errors manifest", tr: "bunun sonucunda derleme hataları kendini gösterir", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "with the result that the server crashed", tr: "bunun sonucunda sunucu çöktü", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "with the result that latency spikes occurred", tr: "bunun sonucunda gecikme zirveleri meydana geldi", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "with the result that the mixture exploded", tr: "bunun sonucunda karışım patladı", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "with the result that profits declined sharply", tr: "bunun sonucunda karlar keskin bir şekilde düştü", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "with the result that constitutional laws were suspended", tr: "bunun sonucunda anayasal yasalar askıya alındı", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "so that user indicators dropped", tr: "böylece kullanıcı göstergeleri düştü", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that unauthorized profiles gained access", tr: "böylece yetkisiz profiller erişim sağladı", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that the baseline framework evolved", tr: "böylece temel çerçeve gelişti", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that data parameters shifted", tr: "böylece veri parametreleri değişti", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "with the result that the project was abandoned", tr: "bunun sonucunda proje iptal edildi", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "with the result that files degraded rapidly", tr: "bunun sonucunda dosyalar hızla bozuldu", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "with the result that strict limits were enforced", tr: "bunun sonucunda katı sınırlar uygulandı", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "so that cross-disciplinary groups clashed", tr: "böylece disiplinler arası gruplar çatıştı", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "so that storage space grew finite", tr: "böylece depolama alanı sınırlı hale geldi", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "with the result that the company went bankrupt", tr: "bunun sonucunda şirket iflas etti", word: "with the result that", options: ["with the result that", "although", "unless", "since"] }
    ],
    academic: [
      { en: "The human brain continuously filters incoming information so that only some aspects are important or relevant at any one time.", tr: "İnsan beyni, gelen bilgileri sürekli filtreler, böylece herhangi bir zamanda sadece bazı yönler önemli veya ilgili olur.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "A clean break in a living bone is followed by great biological activity of the bone cells, so that the gap is closed by new bone tissue within a few weeks.", tr: "Canlı bir kemikteki temiz bir kırılmayı kemik hücrelerinin büyük biyolojik aktivitesi takip eder, böylece boşluk birkaç hafta içinde yeni kemik dokusuyla kapanır.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Illegal cutting of valuable trees has completely ruined large areas of forest so that there is no longer enough wood for the needs of the building industry.", tr: "Değerli ağaçların yasa dışı kesilmesi, geniş orman alanlarını tamamen mahvetti, böylece artık inşaat endüstrisinin ihtiyaçları için yeterli odun kalmadı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Different rock minerals have different rates of heat expansion so that, with nightly cooling, ancient rocks begin to break off in thin layers.", tr: "Farklı kaya mineralleri farklı ısı genleşme oranlarına sahiptir, böylece gece soğumasıyla antik kayalar ince tabakalar halinde kırılmaya başlar.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Developers neglected to resolve formatting discrepancies inside the main directory, with the result that compilation errors manifest repeatedly during builds.", tr: "Geliştiriciler ana dizin içindeki biçimlendirme tutarsızlıklarını çözmeyi ihmal ettiler, bunun sonucunda yapılar sırasında derleme hataları tekrar tekrar kendini gösterdi.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "Loose query threads saturated the decentralized cloud computing infrastructure, with the result that the server crashed unexpectedly over the weekend.", tr: "Gevşek sorgu dizileri merkeziyetsiz bulut bilişim altyapısını doyurdu, bunun sonucunda sunucu hafta sonu beklenmedik bir şekilde çöktü.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "High-volume transaction traffic loops overloaded the primary synchronization layer, with the result that latency spikes occurred across all network partitions.", tr: "Yüksek hacimli işlem trafiği döngüleri birincil senkronizasyon katmanını aşırı yükledi, bunun sonucunda tüm ağ bölümlerinde gecikme zirveleri meydana geldi.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "Junior technicians exposed the volatile chemical container to direct sunlight, with the result that the mixture exploded inside the laboratory chamber.", tr: "Yardımcı teknisyenler uçucu kimyasal kabını doğrudan güneş ışığına maruz bıraktı, bunun sonucunda karışım laboratuvar odasının içinde patladı.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "The corporate entity failed to adjust production goals according to current market metrics, with the result that profits declined sharply this fiscal quarter.", tr: "Kurumsal varlık, üretim hedeflerini mevcut piyasa metriklerine göre ayarlayamadı, bunun sonucunda bu mali çeyrekte karlar keskin bir şekilde düştü.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "Regional administrative bodies executed an autocratic executive decree, with the result that constitutional laws were suspended indefinitely by state ministers.", tr: "Bölgesel idari organlar otokratik bir yürütme kararnamesi uyguladı, bunun sonucunda anayasal yasalar eyalet bakanları tarafından süresiz olarak askıya alındı.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "The mobile learning platform suffered from a continuous series of navigation lags, so that user indicators dropped to exceptionally poor levels.", tr: "Mobil öğrenme platformu sürekli bir gezinme gecikmesi serisinden muzdaripti, böylece kullanıcı göstergeleri son derece zayıf seviyelere düştü.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Security consultants identified a critical filter vulnerability inside the firewall, so that unauthorized profiles gained access to restricted client metadata files.", tr: "Güvenlik danışmanları güvenlik duvarı içinde kritik bir filtre açığı tespit etti, böylece yetkisiz profiller kısıtli istemci meta veri dosyalarına erişim sağladı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Continuous feedback from certified contractors forced rapid technological adaptations, so that the baseline framework evolved into a highly stable architecture.", tr: "Sertifikalı yüklenicilerden gelen sürekli geri bildirimler, hızlı teknolojik adaptasyonları zorunlu kıldı, böylece temel çerçeve son derece kararlı bir mimariye dönüştü.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "The technical crew executed an unverified database migration cycle, so that data parameters shifted away from the original schema configurations.", tr: "Teknik ekip doğrulanmamış bir veritabanı geçiş döngüsü yürüttü, böylece veri parametreleri orijinal şema yapılandırmalarından saptı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Cross-disciplinary engineering groups failed to finalize the reference documentation on time, with the result that the project was abandoned by corporate sponsors.", tr: "Disiplinler arası mühendislik grupları referans belgelerini zamanında nihai hale getiremedi, bunun sonucunda proje kurumsal sponsorlar tarafından iptal edildi.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "Ink and paper molecules inside the ancient library repository suffered from extreme moisture exposure, with the result that files degraded rapidly over time.", tr: "Antik kütüphane havuzundaki mürekkep ve kağıt molekülleri aşırı neme maruz kaldı, bunun sonucunda dosyalar zamanla hızla bozuldu.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "The state department discovered massive environmental violations across multiple provinces, with the result that strict limits were enforced on toxic emissions.", tr: "Eyalet departmanı birden fazla ilde büyük çevre ihlalleri keşfetti, bunun sonucunda zehirli emisyonlara katı sınırlar uygulandı.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "Corporate executives distributed finite operational resources unequally among departments, so that cross-disciplinary groups clashed intensely during board meetings.", tr: "Kurumsal yöneticiler sınırlı operasyonel kaynakları departmanlar arasında eşitsiz bir şekilde dağıttı, böylece disiplinler arası gruplar yönetim kurulu toplantılarında yoğun bir şekilde çatıştı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "The digital archive department transferred millions of scanned document PDFs into the directory, so that storage space grew finite within consecutive days.", tr: "Dijital arşiv departmanı milyonlarca taranmış belge PDF'ini dizine aktardı, böylece depolama alanı ardışık günler içinde sınırlı hale geldi.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "The technology startup ignored memory leakage signals inside their application code, with the result that the company went bankrupt within two years.", tr: "Teknoloji girişimi uygulama kodlarındaki bellek sızıntısı sinyallerini görmezden geldi, bunun sonucunda şirket iki yıl içinde iflas etti.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] }
    ],
    extraComplex: [
      { en: "The human brain continuously filters incoming information so that only some aspects are important or relevant at any one time.", tr: "İnsan beyni, gelen bilgileri sürekli filtreler, böylece herhangi bir zamanda sadece bazı yönler önemli veya ilgili olur.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "A clean break in a living bone is followed by great biological activity of the bone cells, so that the gap is closed by new bone tissue within a few weeks.", tr: "Canlı bir kemikteki temiz bir kırılmayı kemik hücrelerinin büyük biyolojik aktivitesi takip eder, böylece boşluk birkaç hafta içinde yeni kemik dokusuyla kapanır.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Illegal cutting of valuable trees has completely ruined large areas of forest so that there is no longer enough wood for the needs of the building industry.", tr: "Değerli ağaçların yasa dışı kesilmesi, geniş orman alanlarını tamamen mahvetti, böylece artık inşaat endüstrisinin ihtiyaçları için yeterli odun kalmadı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Different rock minerals have different rates of heat expansion so that, with nightly cooling, ancient rocks begin to break off in thin layers.", tr: "Farklı kaya mineralleri farklı ısı genleşme oranlarına sahiptir, böylece gece soğumasıyla antik kayalar ince tabakalar halinde kırılmaya başlar.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Developers neglected to resolve formatting discrepancies inside the main directory, with the result that compilation errors manifest repeatedly during builds.", tr: "Geliştiriciler ana dizin içindeki biçimlendirme tutarsızlıklarını çözmeyi ihmal ettiler, bunun sonucunda yapılar sırasında derleme hataları tekrar tekrar kendini gösterdi.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "Loose query threads saturated the decentralized cloud computing infrastructure, with the result that the server crashed unexpectedly over the weekend.", tr: "Gevşek sorgu dizileri merkeziyetsiz bulut bilişim altyapısını doyurdu, bunun sonucunda sunucu hafta sonu beklenmedik bir şekilde çöktü.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "High-volume transaction traffic loops overloaded the primary synchronization layer, with the result that latency spikes occurred across all network partitions.", tr: "Yüksek hacimli işlem trafiği döngüleri birincil senkronizasyon katmanını aşırı yükledi, bunun sonucunda tüm ağ bölümlerinde gecikme zirveleri meydana geldi.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "Junior technicians exposed the volatile chemical container to direct sunlight, with the result that the mixture exploded inside the laboratory chamber.", tr: "Yardımcı teknisyenler uçucu kimyasal kabını doğrudan güneş ışığına maruz bıraktı, bunun sonucunda karışım laboratuvar odasının içinde patladı.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "The corporate entity failed to adjust production goals according to current market metrics, with the result that profits declined sharply this fiscal quarter.", tr: "Kurumsal varlık, üretim hedeflerini mevcut piyasa metriklerine göre ayarlayamadı, bunun sonucunda bu mali çeyrekte karlar keskin bir şekilde düştü.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "Regional administrative bodies executed an autocratic executive decree, with the result that constitutional laws were suspended indefinitely by state ministers.", tr: "Bölgesel idari organlar otokratik bir yürütme kararnamesi uyguladı, bunun sonucunda anayasal yasalar eyalet bakanları tarafından süresiz olarak askıya alındı.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "The mobile learning platform suffered from a continuous series of navigation lags, so that user indicators dropped to exceptionally poor levels.", tr: "Mobil öğrenme platformu sürekli bir gezinme gecikmesi serisinden muzdaripti, böylece kullanıcı göstergeleri son derece zayıf seviyelere düştü.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Security consultants identified a critical filter vulnerability inside the firewall, so that unauthorized profiles gained access to restricted client metadata files.", tr: "Güvenlik danışmanları güvenlik duvarı içinde kritik bir filtre açığı tespit etti, böylece yetkisiz profiller kısıtli istemci meta veri dosyalarına erişim sağladı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Continuous feedback from certified contractors forced rapid technological adaptations, so that the baseline framework evolved into a highly stable architecture.", tr: "Sertifikalı yüklenicilerden gelen sürekli geri bildirimler, hızlı teknolojik adaptasyonları zorunlu kıldı, böylece temel çerçeve son derece kararlı bir mimariye dönüştü.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "The technical crew executed an unverified database migration cycle, so that data parameters shifted away from the original schema configurations.", tr: "Teknik ekip doğrulanmamış bir veritabanı geçiş döngüsü yürüttü, böylece veri parametreleri orijinal şema yapılandırmalarından saptı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "Cross-disciplinary engineering groups failed to finalize the reference documentation on time, with the result that the project was abandoned by corporate sponsors.", tr: "Disiplinler arası mühendislik grupları referans belgelerini zamanında nihai hale getiremedi, bunun sonucunda proje kurumsal sponsorlar tarafından iptal edildi.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "Ink and paper molecules inside the ancient library repository suffered from extreme moisture exposure, with the result that files degraded rapidly over time.", tr: "Antik kütüphane havuzundaki mürekkep ve kağıt molekülleri aksine neme maruz kaldı, bunun sonucunda dosyalar zamanla hızla bozuldu.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "The state department discovered massive environmental violations across multiple provinces, with the result that strict limits were enforced on toxic emissions.", tr: "Eyalet departmanı birden fazla ilde büyük çevre ihlalleri keşfetti, bunun sonucunda zehirli emisyonlara katı sınırlar uygulandı.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] },
      { en: "Corporate executives distributed finite operational resources unequally among departments, so that cross-disciplinary groups clashed intensely during board meetings.", tr: "Kurumsal yöneticiler sınırlı operasyonel kaynakları departmanlar arasında eşitsiz bir şekilde dağıttı, böylece disiplinler arası gruplar yönetim kurulu toplantılarında yoğun bir şekilde çatıştı.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "The digital archive department transferred millions of scanned document PDFs into the directory, so that storage space grew finite within consecutive days.", tr: "Dijital arşiv departmanı milyonlarca taranmış belge PDF'ini dizine aktardı, böylece depolama alanı ardışık günler içinde sınırlı hale geldi.", word: "so that", options: ["so that", "although", "unless", "since"] },
      { en: "The technology startup ignored memory leakage signals inside their application code, with the result that the company went bankrupt within two years.", tr: "Teknoloji girişimi uygulama kodlarındaki bellek sızıntısı sinyallerini görmezden geldi, bunun sonucunda şirket iki yıl içinde iflas etti.", word: "with the result that", options: ["with the result that", "although", "unless", "since"] }
    ]
  },
  
  // New conditional lessons 8, 9, 10
  "8": {
    topicKey: "if_conditional",
    title: "G. Şart - a) if",
    formula: "If + Clause, Main Clause",
    example: "If compilation fails, developers investigate logs: Eğer derleme başarısız olursa, geliştiriciler günlükleri inceler.",
    description: "Belirli bir eylemin veya girdinin gerçekleşmesi durumunda doğacak olası/kesin sonuçları (<strong>'eğer ... olursa/se'</strong>) ortaya koyan şart yapılarıdır.",
    micro: [
      { en: "if he comes", tr: "eğer gelirse", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if the plant dies", tr: "eğer bitki ölürse", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if parameters shift", tr: "eğer parametreler değişirse", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if compilation fails", tr: "eğer derleme başarısız olursa", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if latency increases", tr: "eğer gecikme artarsa", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if errors manifest", tr: "eğer hatalar kendini gösterirse", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if security breaks", tr: "eğer güvenlik bozulursa", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if the database crashes", tr: "eğer veritabanı çökerse", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if data degrades", tr: "eğer veri bozulursa", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if algorithms mutate", tr: "eğer algoritmalar mutasyona uğrarsa", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if firewalls block", tr: "eğer güvenlik duvarları engellerse", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if storage diminishes", tr: "eğer depolama alanı azalırsa", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if metrics decline", tr: "eğer metrikler düşerse", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if a glitch spreads", tr: "eğer bir hata yayılırsa", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if tokens grant access", tr: "eğer jetonlar erişim sağlarsa", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if the repository is corrupted", tr: "eğer havuz bozulursa", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if clauses vary", tr: "eğer maddeler farklılık gösterirse", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if routines execute concurrently", tr: "eğer rutinler eşzamanlı çalışırsa", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if technicians isolate", tr: "eğer teknisyenler izole ederse", word: "if", options: ["if", "unless", "although", "since"] },
      { en: "if infrastructure collapses", tr: "eğer altyapı çökerse", word: "if", options: ["if", "unless", "although", "since"] }
    ],
    academic: [
      { en: "If the central database architecture crashes unexpectedly, automated recovery protocols will instantly spin up a redundant backup repository node.", tr: "Eğer merkezi veritabanı mimarisi beklenmedik bir şekilde çökerse, otomatik kurtarma protokolleri anında yedekli bir yedek havuz düğümü oluşturacaktır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If the fragile botanical plant dies inside the climate-controlled test incubator, agricultural technicians must evaluate internal moisture levels thoroughly.", tr: "Eğer hassas botanik bitki iklim kontrollü test inkübatörünün içinde ölürse, tarım teknisyenleri iç nem seviyelerini kapsamlı bir şekilde değerlendirmelidir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If configuration parameters shift abruptly during high-volume data synchronization events, the core compiler is bound to trigger severe calculation overrides.", tr: "Eğer yüksek hacimli veri senkronizasyon olayları sırasında yapılandırma parametreleri aniden değişirse, çekirdek derleyicinin ciddi hesaplama geçersiz kılmalarını tetiklemesi kaçınılmazdır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If code compilation fails repeatedly during the live system deployment phase, frontend developers must investigate raw binary tracking logs without delay.", tr: "Eğer canlı sistem dağıtım aşamasında kod derleme tekrar tekrar başarısız olursa, ön uç geliştiricileri ham ikili izleme günlüklerini gecikmeden incelemelidir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If processing latency increases beyond the acceptable threshold limit, language learners will inevitably experience frustrating navigation lag inside the mobile platform.", tr: "Eğer işlem gecikmesi kabul edilebilir eşik sınırının üzerine çıkarsa, dil öğrencileri mobil platform içinde kaçınılmaz olarak sinir bozucu gezinme gecikmesi yaşayacaktır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If systematic validation errors manifest within consecutive processing layers, cross-disciplinary engineering groups must halt the deployment pipeline.", tr: "Eğer ardışık işlem katmanlarında sistematik doğrulama hataları kendini gösterirse, disiplinler arası mühendislik grupları dağıtım hattını durdurmalıdır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If network security breaks due to an unreinforced configuration filter, anonymous external entry traces might retrieve confidential user metadata.", tr: "Eğer güçlendirilmemiş bir yapılandırma filtresi nedeniyle ağ güvenliği bozulursa, anonim harici giriş izleri gizli kullanıcı meta verilerini ele geçirebilir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If the primary server database crashes over the weekend, the tech startup faces the immediate risk of severe financial performance degradation.", tr: "Eğer birincil sunucu veritabanı hafta sonu çökerse, teknoloji girişimi ciddi finansal performans düşüşü riskiyle karşı karşıya kalır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If raw digital documentation data degrades due to improper cloud partition management, recovering baseline historical frameworks becomes exceptionally difficult.", tr: "Eğer ham dijital dokümantasyon verileri uygunsuz bulut bölümü yönetimi nedeniyle bozulursa, temel tarihsel çerçeveleri kurtarmak son derece zorlaşır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If malicious script algorithms mutate rapidly without central governance oversight, traditional firewalls will fail to block advanced threat signatures.", tr: "Eğer kötü niyetli betik algoritmaları merkezi yönetişim denetimi olmaksızın hızla mutasyona uğrarsa, geleneksel güvenlik duvarları gelişmiş tehdit imzalarını engellemede başarısız olacaktır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If automated security firewalls block authenticated client profiles by mistake, customer retention metrics are likely to decline sharply next quarter.", tr: "Eğer otomatik güvenlik duvarları kimliği doğrulanmamış istemci profillerini yanlışlıkla engellerse, müşteri elde tutma metriklerinin önümüzdeki çeyrekte keskin bir şekilde düşmesi muhtemeldir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If available local server storage diminishes during the migration cycle, large scanned document PDF archives must be compressed strategically.", tr: "Eğer geçiş döngüsü sırasında mevcut yerel sunucu depolama alanı azalırsa, taranmış büyük PDF belge arşivleri stratejik olarak sıkıştırılmalıdır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If corporate performance metrics decline across volatile economic sectors, institutional investment groups will modify their operational roadmaps.", tr: "Eğer kurumsal performans metrikleri değişken ekonomik sektörlerde düşerse, kurumsal yatırım grupları operasyonel yol haritalarını değiştirecektir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If a dangerous technical glitch spreads silently across decentralized network directories, system architects must execute a full emergency platform reboot.", tr: "Eğer merkeziyetsiz ağ dizinlerinde tehlikeli bir teknik hata sessizce yayılırsa, sistem mimarları acil bir platform yeniden başlatması yürütmelidir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If cryptographic validation tokens grant clearance parameters automatically, authenticated developers can manipulate core source code configurations.", tr: "Eğer kriptografik doğrulama jetonları yetkilendirme parametrelerini otomatik olarak verirse, kimliği doğrulanmış geliştiriciler çekirdek kaynak kod yapılandırmalarını değiştirebilir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If the primary software repository is corrupted by an unexpected parameter conflict, engineering units must revert to the last baseline build.", tr: "Eğer birincil yazılım havuzu beklenmedik bir parametre çelişkisiyle bozulursa, mühendislik birimleri son temel sürüme geri dönmelidir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If statutory policy clauses vary significantly across different provinces, regional municipalities will struggle to enforce uniform compliance codes.", tr: "Eğer yasal politika maddeleri farklı illerde önemli ölçüde farklılık gösterirse, bölgesel belediyeler tek tip uyumluluk kurallarını uygulamakta zorlanacaktır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If backend database routines execute concurrently without triggering race conditions, overall application response speeds will improve by forty percent.", tr: "Eğer arka uç veritabanı rutinleri yarış koşullarını tetiklemeden eşzamanlı olarak çalışırsa, genel uygulama yanıt hızları yüzde kırk oranında artacaktır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If junior laboratory technicians isolate the volatile chemical compound inside the vacuum incubator, dangerous exothermic reactions can be prevented.", tr: "Eğer yardımcı laboratuvar teknisyenleri uçucu kimyasal bileşiği vakumlu inkübatör içinde izole ederse, tehlikeli ekzotermik reaksiyonlar önlenebilir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If critical cloud infrastructure collapses under intense simulation stress, project coordinators will be forced to abandon the platform migration cycle.", tr: "Eğer kritik bulut altyapısı yoğun simülasyon stresi altında çökerse, proje koordinatörleri platform geçiş döngüsünü durdurmak zorunda kalacaktır.", word: "If", options: ["If", "Unless", "Although", "Since"] }
    ],
    extraComplex: [
      { en: "If the central database architecture crashes unexpectedly, automated recovery protocols will instantly spin up a redundant backup repository node.", tr: "Eğer merkezi veritabanı mimarisi beklenmedik bir şekilde çökerse, otomatik kurtarma protokolleri anında yedekli bir yedek havuz düğümü oluşturacaktır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If the fragile botanical plant dies inside the climate-controlled test incubator, agricultural technicians must evaluate internal moisture levels thoroughly.", tr: "Eğer hassas botanik bitki iklim kontrollü test inkübatörünün içinde ölürse, tarım teknisyenleri iç nem seviyelerini kapsamlı bir şekilde değerlendirmelidir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If configuration parameters shift abruptly during high-volume data synchronization events, the core compiler is bound to trigger severe calculation overrides.", tr: "Eğer yüksek hacimli veri senkronizasyon olayları sırasında yapılandırma parametreleri aniden değişirse, çekirdek derleyicinin ciddi hesaplama geçersiz kılmalarını tetiklemesi kaçınılmazdır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If code compilation fails repeatedly during the live system deployment phase, frontend developers must investigate raw binary tracking logs without delay.", tr: "Eğer canlı sistem dağıtım aşamasında kod derleme tekrar tekrar başarısız olursa, ön uç geliştiricileri ham ikili izleme günlüklerini gecikmeden incelemelidir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If processing latency increases beyond the acceptable threshold limit, language learners will inevitably experience frustrating navigation lag inside the mobile platform.", tr: "Eğer işlem gecikmesi kabul edilebilir eşik sınırının üzerine çıkarsa, dil öğrencileri mobil platform içinde kaçınılmaz olarak sinir bozucu gezinme gecikmesi yaşayacaktır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If systematic validation errors manifest within consecutive processing layers, cross-disciplinary engineering groups must halt the deployment pipeline.", tr: "Eğer ardışık işlem katmanlarında sistematik doğrulama hataları kendini gösterirse, disiplinler arası mühendislik grupları dağıtım hattını durdurmalıdır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If network security breaks due to an unreinforced configuration filter, anonymous external entry traces might retrieve confidential user metadata.", tr: "Eğer güçlendirilmemiş bir yapılandırma filtresi nedeniyle ağ güvenliği bozulursa, anonim harici giriş izleri gizli kullanıcı meta verilerini ele geçirebilir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If the primary server database crashes over the weekend, the tech startup faces the immediate risk of severe financial performance degradation.", tr: "Eğer birincil sunucu veritabanı hafta sonu çökerse, teknoloji girişimi ciddi finansal performans düşüşü riskiyle karşı karşıya kalır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If raw digital documentation data degrades due to improper cloud partition management, recovering baseline historical frameworks becomes exceptionally difficult.", tr: "Eğer ham dijital dokümantasyon verileri uygunsuz bulut bölümü yönetimi nedeniyle bozulursa, temel tarihsel çerçeveleri kurtarmak son derece zorlaşır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If malicious script algorithms mutate rapidly without central governance oversight, traditional firewalls will fail to block advanced threat signatures.", tr: "Eğer kötü niyetli betik algoritmaları merkezi yönetişim denetimi olmaksızın hızla mutasyona uğrarsa, geleneksel güvenlik duvarları gelişmiş tehdit imzalarını engellemede başarısız olacaktır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If automated security firewalls block authenticated client profiles by mistake, customer retention metrics are likely to decline sharply next quarter.", tr: "Eğer otomatik güvenlik duvarları kimliği doğrulanmamış istemci profillerini yanlışlıkla engellerse, müşteri elde tutma metriklerinin önümüzdeki çeyrekte keskin bir şekilde düşmesi muhtemeldir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If available local server storage diminishes during the migration cycle, large scanned document PDF archives must be compressed strategically.", tr: "Eğer geçiş döngüsü sırasında mevcut yerel sunucu depolama alanı azalırsa, taranmış büyük PDF belge arşivleri stratejik olarak sıkıştırılmalıdır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If corporate performance metrics decline across volatile economic sectors, institutional investment groups will modify their operational roadmaps.", tr: "Eğer kurumsal performans metrikleri değişken ekonomik sektörlerde düşerse, kurumsal yatırım grupları operasyonel yol haritalarını değiştirecektir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If a dangerous technical glitch spreads silently across decentralized network directories, system architects must execute a full emergency platform reboot.", tr: "Eğer merkeziyetsiz ağ dizinlerinde tehlikeli bir teknik hata sessizce yayılırsa, sistem mimarları acil bir platform yeniden başlatması yürütmelidir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If cryptographic validation tokens grant clearance parameters automatically, authenticated developers can manipulate core source code configurations.", tr: "Eğer kriptografik doğrulama jetonları yetkilendirme parametrelerini otomatik olarak verirse, kimliği doğrulanmış geliştiriciler çekirdek kaynak kod yapılandırmalarını değiştirebilir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If the primary software repository is corrupted by an unexpected parameter conflict, engineering units must revert to the last baseline build.", tr: "Eğer birincil yazılım havuzu beklenmedik bir parametre çelişkisiyle bozulursa, mühendislik birimleri son temel sürüme geri dönmelidir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If statutory policy clauses vary significantly across different provinces, regional municipalities will struggle to enforce uniform compliance codes.", tr: "Eğer yasal politika maddeleri farklı illerde önemli ölçüde farklılık gösterirse, bölgesel belediyeler tek tip uyumluluk kurallarını uygulamakta zorlanacaktır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If backend database routines execute concurrently without triggering race conditions, overall application response speeds will improve by forty percent.", tr: "Eğer arka uç veritabanı rutinleri yarış koşullarını tetiklemeden eşzamanlı olarak çalışırsa, genel uygulama yanıt hızları yüzde kırk oranında artacaktır.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If junior laboratory technicians isolate the volatile chemical compound inside the vacuum incubator, dangerous exothermic reactions can be prevented.", tr: "Eğer yardımcı laboratuvar teknisyenleri uçucu kimyasal bileşiği vakumlu inkübatör içinde izole ederse, tehlikeli ekzotermik reaksiyonlar önlenebilir.", word: "If", options: ["If", "Unless", "Although", "Since"] },
      { en: "If critical cloud infrastructure collapses under intense simulation stress, project coordinators will be forced to abandon the platform migration cycle.", tr: "Eğer kritik bulut altyapısı yoğun simülasyon stresi altında çökerse, proje koordinatörleri platform geçiş döngüsünü durdurmak zorunda kalacaktır.", word: "If", options: ["If", "Unless", "Although", "Since"] }
    ]
  },
  "9": {
    topicKey: "unless_conditional",
    title: "G. Şart - b) unless",
    formula: "Unless + Clause (Active/Passive), Main Clause",
    example: "Unless parameters shift, compilation succeeds: Parametreler değişmedikçe derleme başarılı olur.",
    description: "Bir eylemin yapılmaması veya koşulun sağlanmaması durumunda, ana cümledeki durumun engellenemeyeceğini belirtir (<strong>'-medikçe'</strong>, <strong>'eğer ... olmazsa/mezse'</strong>). `unless` kendisi olumsuzluk barındırdığı için bağlı olduğu yan cümle yapısal olarak olumludur.",
    micro: [
      { en: "unless he comes", tr: "gelmedikçe", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless the plant dies", tr: "bitki ölmedikçe", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless the money is paid", tr: "para ödenmedikçe", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless the work is done", tr: "iş yapılmadıkça", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless parameters shift", tr: "parametreler değişmedikçe", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless compilation fails", tr: "derleme başarısız olmadıkça", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless latency increases", tr: "gecikme artmadıkça", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless the build is optimized", tr: "sürüm optimize edilmedikçe", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless firewalls block access", tr: "güvenlik duvarları erişimi engellemedikçe", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless documentation is finalized", tr: "belgeler nihai hale getirilmedikçe", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless errors are resolved", tr: "hatalar çözülmedikçe", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless scripts run smoothly", tr: "betikler sorunsuz çalışmadıkça", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless compliance codes match", tr: "uyumluluk kuralları eşleşmedikçe", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless access is restricted", tr: "erişim kısıtlanmadıkça", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless security is maintained", tr: "güvenlik sağlanmadıkça", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless assets are reallocated", tr: "varlıklar yeniden tahsis edilmedikçe", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless testing is completed", tr: "testler tamamlanmadıkça", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless anomalies are detected", tr: "anomaliler tespit edilmedikçe", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless metrics improve sharply", tr: "metrikler keskin bir şekilde iyileşmedikçe", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "unless containers are sealed", tr: "kaplar mühürlenmedikçe", word: "unless", options: ["unless", "if", "although", "since"] }
    ],
    academic: [
      { en: "The tech startup cannot expect remarkable financial expansion unless a comprehensive administrative modernization framework is introduced by the executive board.", tr: "Yönetim kurulu tarafından kapsamlı bir idari modernizasyon çerçevesi sunulmadıkça teknoloji girişimi kayda değer bir finansal büyüme bekleyemez.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Core biological organisms will struggle to survive inside the research testing chambers unless intense humidity variations are regulated systematically.", tr: "Yoğun nem dalgalanmaları sistematik olarak düzenlenmedikçe, temel biyolojik organizmalar araştırma test odalarının içinde hayatta kalmakta zorlanacaktır.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "The designated engineering contractor will refuse to initiate the primary infrastructure grid upgrade unless the agreed contractual money is paid upfront.", tr: "Kararlaştırılan sözleşme bedeli peşin ödenmedikçe, belirlenen mühendislik yüklenicisi birincil altyapı şebekesi yükseltmesini başlatmayı reddedecektir.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Project coordinators cannot clear the application architecture for final market deployment unless all structural layout documentation is done completely.", tr: "Tüm yapısal düzen belgeleri tamamen tamamlanmadıkça proje koordinatörleri nihai pazar dağıtımı için uygulama mimarisini onaylayamaz.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "System performance indicators will continue to show persistent formatting discrepancies unless database administrators refactor loose query loops over the weekend.", tr: "Veritabanı yöneticileri hafta sonu gevşek sorgu döngülerini yeniden yapılandırmadıkça, sistem performans göstergeleri kalıcı biçimlendirme tutarsızlıkları göstermeye devam edecektir.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Developers cannot generate the required JSON schema files successfully unless the automated software compiler executes without triggering errors.", tr: "Otomatik yazılım derleyicisi hataları tetiklemeden çalışmadıkça geliştiriciler gerekli JSON şema dosyalarını başarıyla oluşturamaz.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Discerning language learners will struggle to absorb complex English grammar pedagogy structures unless the application interface minimizes runtime latency effectively.", tr: "Uygulama arayüzü çalışma zamanı gecikmesini etkili bir şekilde en aza indirmedikçe seçici dil öğrencileri karmaşık İngilizce dil bilgisi pedagojisi yapılarını kavramakta zorlanacaktır.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Older hardware mobile devices will experience continuous crash loops unless the frontend development build is optimized thoroughly before launch.", tr: "Ön uç geliştirme sürümü lansmandan önce kapsamlı bir şekilde optimize edilmedikçe, eski donanıma sahip mobil cihazlar sürekli çökme döngüleri yaşayacaktır.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Confidential client metadata records will remain highly vulnerable to external breaches unless security firewalls block unauthenticated entry traces immediately.", tr: "Güvenlik duvarları kimliği doğrulanmamış giriş izlerini derhal engellemedikçe gizli istemci meta veri kayıtları harici ihlallere karşı oldukça savunmasız kalacaktır.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Cross-disciplinary engineering groups cannot resolve deep architectural constraints unless the baseline reference documentation is finalized by the technical unit.", tr: "Temel referans belgeleri teknik birim tarafından nihai hale getirilmedikçe disiplinler arası mühendislik grupları derin mimari kısıtlamaları çözemez.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "The platform migration cycle will remain frozen in the initial testing phase unless critical structural database errors are resolved by analysts.", tr: "Kritik yapısal veritabanı hataları analistler tarafından çözülmedikçe platform geçiş döngüsü başlangıç test aşamasında donmuş olarak kalacaktır.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Automated synchronization routines will cause extensive data corruption across cloud directories unless diagnostic cleanup scripts run smoothly.", tr: "Teşhis amaçlı temizleme betikleri sorunsuz çalışmadıkça otomatik senkronizasyon rutinleri bulut dizinlerinde kapsamlı veri bozulmasına neden olacaktır.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "The automated validation system will continue to generate processing flags unless local source codes match international regulatory compliance guidelines.", tr: "Yerel kaynak kodları uluslararası düzenleyici uyumluluk yönergeleriyle eşleşmedikçe otomatik doğrulama sistemi işlem bayrakları oluşturmaya devam edecektir.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Sophisticated corporate entities will refuse to host their repository assets inside the cloud directory unless administrative access is restricted securely.", tr: "İdari erişim güvenli bir şekilde kısıtlanmadıkça gelişmiş kurumsal yapılar havuz varlıklarını bulut dizininde barındırmayı reddedecektir.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "The digital transaction gateway will suspend all active user profiles unless multi-layer cryptographic token security is maintained by engineers.", tr: "Mühendisler tarafından çok katmanlı kriptografik jeton güvenliği sağlanmadıkça dijital işlem geçidi tüm aktif kullanıcı profillerini askıya alacaktır.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Marginalized provincial research facilities will face immediate operational termination unless capital assets are reallocated strategically by state departments.", tr: "Sermaye varlıkları eyalet departmanları tarafından stratejik olarak yeniden tahsis edilmedikçe marjinalleşmiş taşra araştırma tesisleri derhal operasyonel sonlandırma ile karşı karşıya kalacaktır.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "System architects will reject the newly introduced framework elements unless rigorous simulation stress testing is completed successfully by tomorrow.", tr: "Sıkı simülasyon stresi testleri yarına kadar başarıyla tamamlanmadıkça sistem mimarları yeni sunulan çerçeve öğelerini reddedecektir.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Severe background memory leakage glitches will continue to exhaust server resources silently unless validation anomalies are detected in real time.", tr: "Doğrulama anomalileri gerçek zamanlı olarak tespit edilmedikçe ciddi arka plan bellek sızıntısı hataları sunucu kaynaklarını sessizce tüketmeye devam edecektir.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Foreign direct investment groups will postpone further corporate funding rounds unless local commercial productivity metrics improve sharply this quarter.", tr: "Yerel ticari üretkenlik metrikleri bu çeyrekte keskin bir şekilde iyileşmedikçe doğrudan yabancı yatırım grupları kurumsal fonlama turlarını erteleyecektir.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Volatile chemical mixtures will undergo rapid exothermic degradation inside the laboratory incubator unless core container valves are sealed tightly.", tr: "Çekirdek kap valfleri sıkıca kapatılmadıkça uçucu kimyasal karışımlar laboratuvar inkübatörü içinde hızlı ekzotermik bozunmaya uğrayacaktır.", word: "unless", options: ["unless", "if", "although", "since"] }
    ],
    extraComplex: [
      { en: "The tech startup cannot expect remarkable financial expansion unless a comprehensive administrative modernization framework is introduced by the executive board.", tr: "Yönetim kurulu tarafından kapsamlı bir idari modernizasyon çerçevesi sunulmadıkça teknoloji girişimi kayda değer bir finansal büyüme bekleyemez.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Core biological organisms will struggle to survive inside the research testing chambers unless intense humidity variations are regulated systematically.", tr: "Yoğun nem dalgalanmaları sistematik olarak düzenlenmedikçe, temel biyolojik organizmalar araştırma test odalarının içinde hayatta kalmakta zorlanacaktır.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "The designated engineering contractor will refuse to initiate the primary infrastructure grid upgrade unless the agreed contractual money is paid upfront.", tr: "Kararlaştırılan sözleşme bedeli peşin ödenmedikçe, belirlenen mühendislik yüklenicisi birincil altyapı şebekesi yükseltmesini başlatmayı reddedecektir.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Project coordinators cannot clear the application architecture for final market deployment unless all structural layout documentation is done completely.", tr: "Tüm yapısal düzen belgeleri tamamen tamamlanmadıkça proje koordinatörleri nihai pazar dağıtımı için uygulama mimarisini onaylayamaz.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "System performance indicators will continue to show persistent formatting discrepancies unless database administrators refactor loose query loops over the weekend.", tr: "Veritabanı yöneticileri hafta sonu gevşek sorgu döngülerini yeniden yapılandırmadıkça, sistem performans göstergeleri kalıcı biçimlendirme tutarsızlıkları göstermeye devam edecektir.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Developers cannot generate the required JSON schema files successfully unless the automated software compiler executes without triggering errors.", tr: "Otomatik yazılım derleyicisi hataları tetiklemeden çalışmadıkça geliştiriciler gerekli JSON şema dosyalarını başarıyla oluşturamaz.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Discerning language learners will struggle to absorb complex English grammar pedagogy structures unless the application interface minimizes runtime latency effectively.", tr: "Uygulama arayüzü çalışma zamanı gecikmesini etkili bir şekilde en aza indirmedikçe seçici dil öğrencileri karmaşık İngilizce dil bilgisi pedagojisi yapılarını kavramakta zorlanacaktır.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Older hardware mobile devices will experience continuous crash loops unless the frontend development build is optimized thoroughly before launch.", tr: "Ön uç geliştirme sürümü lansmandan önce kapsamlı bir şekilde optimize edilmedikçe, eski donanıma sahip mobil cihazlar sürekli çökme döngüleri yaşayacaktır.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Confidential client metadata records will remain highly vulnerable to external breaches unless security firewalls block unauthenticated entry traces immediately.", tr: "Güvenlik duvarları kimliği doğrulanmamış giriş izlerini derhal engellemedikçe gizli istemci meta veri kayıtları harici ihlallere karşı oldukça savunmasız kalacaktır.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Cross-disciplinary engineering groups cannot resolve deep architectural constraints unless the baseline reference documentation is finalized by the technical unit.", tr: "Temel referans belgeleri teknik birim tarafından nihai hale getirilmedikçe disiplinler arası mühendislik grupları derin mimari kısıtlamaları çözemez.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "The platform migration cycle will remain frozen in the initial testing phase unless critical structural database errors are resolved by analysts.", tr: "Kritik yapısal veritabanı hataları analistler tarafından çözülmedikçe platform geçiş döngüsü başlangıç test aşamasında donmuş olarak kalacaktır.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Automated synchronization routines will cause extensive data corruption across cloud directories unless diagnostic cleanup scripts run smoothly.", tr: "Teşhis amaçlı temizleme betikleri sorunsuz çalışmadıkça otomatik senkronizasyon rutinleri bulut dizinlerinde kapsamlı veri bozulmasına neden olacaktır.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "The automated validation system will continue to generate processing flags unless local source codes match international regulatory compliance guidelines.", tr: "Yerel kaynak kodları uluslararası düzenleyici uyumluluk yönergeleriyle eşleşmedikçe otomatik doğrulama sistemi işlem bayrakları oluşturmaya devam edecektir.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Sophisticated corporate entities will refuse to host their repository assets inside the cloud directory unless administrative access is restricted securely.", tr: "İdari erişim güvenli bir şekilde kısıtlanmadıkça gelişmiş kurumsal yapılar havuz varlıklarını bulut dizininde barındırmayı reddedecektir.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "The digital transaction gateway will suspend all active user profiles unless multi-layer cryptographic token security is maintained by engineers.", tr: "Mühendisler tarafından çok katmanlı kriptografik jeton güvenliği sağlanmadıkça dijital işlem geçidi tüm aktif kullanıcı profillerini askıya alacaktır.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Marginalized provincial research facilities will face immediate operational termination unless capital assets are reallocated strategically by state departments.", tr: "Sermaye varlıkları eyalet departmanları tarafından stratejik olarak yeniden tahsis edilmedikçe marjinalleşmiş taşra araştırma tesisleri derhal operasyonel sonlandırma ile karşı karşıya kalacaktır.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "System architects will reject the newly introduced framework elements unless rigorous simulation stress testing is completed successfully by tomorrow.", tr: "Sıkı simülasyon stresi testleri yarına kadar başarıyla tamamlanmadıkça sistem mimarları yeni sunulan çerçeve öğelerini reddedecektir.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Severe background memory leakage glitches will continue to exhaust server resources silently unless validation anomalies are detected in real time.", tr: "Doğrulama anomalileri gerçek zamanlı olarak tespit edilmedikçe ciddi arka plan bellek sızıntısı hataları sunucu kaynaklarını sessizce tüketmeye devam edecektir.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Foreign direct investment groups will postpone further corporate funding rounds unless local commercial productivity metrics improve sharply this quarter.", tr: "Yerel ticari üretkenlik metrikleri bu çeyrekte keskin bir şekilde iyileşmedikçe doğrudan yabancı yatırım grupları kurumsal fonlama turlarını erteleyecektir.", word: "unless", options: ["unless", "if", "although", "since"] },
      { en: "Volatile chemical mixtures will undergo rapid exothermic degradation inside the laboratory incubator unless core container valves are sealed tightly.", tr: "Çekirdek kap valfleri sıkıca kapatılmadıkça uçucu kimyasal karışımlar laboratuvar inkübatörü içinde hızlı ekzotermik bozunmaya uğrayacaktır.", word: "unless", options: ["unless", "if", "although", "since"] }
    ]
  },
  "10": {
    topicKey: "provided_conditional",
    title: "G. Şart - c) provided that / on condition that",
    formula: "Main Clause + provided that / on condition that + Subordinate Clause",
    example: "The work is done on condition that the money is paid: İşin yapılması koşuluyla para ödenir.",
    description: "Ana cümledeki eylemin gerçekleşmesini, yan cümledeki durumun eksiksiz yerine getirilmesi ön şartına bağlar (<strong>'şartıyla'</strong>, <strong>'koşuluyla'</strong>). `if` yapısına kıyasla daha resmi ve kısıtlayıcı bir koşul tonu vardır.",
    micro: [
      { en: "provided that the money is paid", tr: "paranın ödenmesi şartıyla", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "on condition that the work is done", tr: "işin yapılması koşuluyla", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "provided that tokens are validated", tr: "jetonların doğrulanması şartıyla", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "on condition that parameters remain stable", tr: "parametrelerin kararlı kalması koşuluyla", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "provided that data does not degrade", tr: "verinin bozulmaması şartıyla", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "on condition that access is regulated", tr: "erişimin düzenlenmesi koşuluyla", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "provided that security is compromised", tr: "güvenliğin tehlikeye atılması şartıyla", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "on condition that compliance codes align", tr: "uyumluluk kodlarının hizalanması koşuluyla", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "provided that documentation is verified", tr: "belgelerin doğrulanması şartıyla", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "on condition that builds are thoroughly optimized", tr: "sürümlerin kapsamlı şekilde optimize edilmesi koşuluyla", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "provided that memory leakage is minimized", tr: "bellek sızıntısının en aza indirilmesi şartıyla", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "on condition that cross-disciplinary groups agree", tr: "disiplinler arası grupların anlaşması koşuluyla", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "provided that scripts execute concurrently", tr: "betiklerin eşzamanlı çalışması şartıyla", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "on condition that initial testing succeeds", tr: "ilk testlerin başarılı olması koşuluyla", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "provided that layout tools function precisely", tr: "düzen araçlarının hassas çalışması şartıyla", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "on condition that structural constraints are resolved", tr: "yapısal kısıtlamaların çözülmesi koşuluyla", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "provided that binary tracking logs are cleared", tr: "ikili takip günlüklerinin temizlenmesi şartıyla", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "on condition that municipal entities allocate funds", tr: "belediye birimlerinin fon tahsis etmesi koşuluyla", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "provided that external entries are blocked", tr: "harici girişlerin engellenmesi şartıyla", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "on condition that the core network operates efficiently", tr: "çekirdek ağın verimli çalışması koşuluyla", word: "on condition that", options: ["on condition that", "unless", "although", "since"] }
    ],
    academic: [
      { en: "The international legal committee will ratify the bilateral trade treaty smoothly provided that the stipulated monetary fine is paid into the central escrow fund.", tr: "Öngörülen para cezası merkezi emanet fonuna ödenmesi şartıyla, uluslararası hukuk komitesi ikili ticaret anlaşmasını sorunsuz bir şekilde onaylayacaktır.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "Senior directors will officially sign off on the provincial project roadmap on condition that the technical data migration work is done by tomorrow evening.", tr: "Teknik veri geçiş işinin yarına kadar yapılması koşuluyla, kıdemli direktörler bölgesel proje yol haritasını resmi olarak onaylayacaktır.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "The transaction gateway will grant advanced administrative clearance to the client profile provided that cryptographic validation tokens are authenticated securely.", tr: "Kriptografik doğrulama jetonlarının güvenli bir şekilde doğrulanması şartıyla, işlem geçidi istemci profiline gelişmiş idari yetki verecektir.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "Cross-disciplinary engineering groups can successfully mitigate severe system stress on condition that configuration parameters remain entirely stable.", tr: "Yapılandırma parametrelerinin tamamen kararlı kalması koşuluyla, disiplinler arası mühendislik grupları ciddi sistem stresini başarıyla hafifletebilir.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "The qualitative monograph archives will serve as reliable academic references for centuries provided that paper documentation does not degrade due to environmental factors.", tr: "Kağıt belgelerin çevresel faktörler nedeniyle bozulmaması şartıyla, nitel monografi arşivleri yüzyıllar boyunca güvenilir akademik referanslar olarak hizmet edecektir.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "External corporate practitioners will be permitted to review the repository schema on condition that administrative metadata access is regulated strictly by firewalls.", tr: "İdari meta veri erişiminin güvenlik duvarları tarafından sıkı bir şekilde düzenlenmesi koşuluyla, harici kurumsal uygulayıcıların havuz şemasını incelemesine izin verilecektir.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "The central security framework will automatically initialize a catastrophic shutdown sequence provided that database integrity is compromised by malicious entities.", tr: "Veritabanı bütünlüğünün kötü niyetli yapılar tarafından tehlikeye atılması şartıyla, merkezi güvenlik çerçevesi otomatik olarak felaket düzeyinde bir kapatma dizisi başlatacaktır.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "The software development team can roll out the gamified language application update on condition that local compliance codes align with global market standards.", tr: "Yerel uyumluluk kurallarının küresel pazar standartlarıyla uyumlu olması koşuluyla, yazılım geliştirme ekibi oyunlaştırılmış dil uygulaması güncellemesini sunabilir.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "Junior technicians are legally authorized to operate the vacuum chamber device provided that their baseline reference documentation is verified by supervisors.", tr: "Temel referans belgelerinin denetçiler tarafından doğrulanması şartıyla, yardımcı teknisyenlerin vakum odası cihazını çalıştırmaya yasal yetkileri vardır.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "The mobile interface can achieve exceptionally smooth user performance metrics on condition that upcoming application builds are thoroughly optimized.", tr: "Gelecek uygulama sürümlerinin kapsamlı şekilde optimize edilmesi koşuluyla, mobil arayüz son derece akıcı kullanıcı performans metrikleri elde edebilir.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "Decentralized cloud network infrastructures can manage high-volume transaction traffic floods provided that background memory leakage is minimized effectively.", tr: "Arka plan bellek sızıntısının etkili bir şekilde en aza indirilmesi şartıyla, merkeziyetsiz bulut ağ altyapıları yüksek hacimli işlem trafiği dalgalarını yönetebilir.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "The legislative assembly will pass the statutory administrative amendments smoothly on condition that regional cross-disciplinary groups agree on policy terms.", tr: "Bölgesel disiplinler arası grupların politika koşullarında anlaşması koşuluyla, yasama meclisi yasal idari değişiklikleri sorunsuz bir şekilde kabul edecektir.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "The primary framework compiler can avoid triggering extensive compilation errors provided that cleanup scripts execute concurrently with database loops.", tr: "Temizleme betiklerinin veritabanı döngüleriyle eşzamanlı çalışması şartıyla, birincil çerçeve derleyicisi kapsamlı derleme hataları tetiklemekten kaçınabilir.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "Project coordinators will release extra capital expenditure funds to the research department on condition that the initial simulation testing succeeds.", tr: "İlk simülasyon testlerinin başarılı olması koşuluyla, proje koordinatörleri araştırma departmanına ekstra sermaye harcaması fonu serbest bırakacaktır.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "Frontend web developers can eliminate navigation lag thresholds permanently provided that automated layout rendering tools function precisely.", tr: "Otomatik düzen oluşturma araçlarının hassas çalışması şartıyla, ön uç web geliştiricileri gezinme gecikme eşiklerini kalıcı olarak ortadan kaldırabilir.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "National state departments will grant certified contractor licenses to the tech startup on condition that existing structural constraints are resolved.", tr: "Mevcut yapısal kısıtlamaların çözülmesi koşuluyla, ulusal eyalet departmanları teknoloji girişimine sertifikalı yüklenici lisansları verecektir.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "Local server partitions can maintain optimal processing speeds during long tracking operations provided that raw binary logs are cleared periodically.", tr: "Ham ikili günlüklerin periyodik olarak temizlenmesi şartıyla, yerel sunucu bölümleri uzun takip işlemleri sırasında en uygun işlem hızlarını koruyabilir.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "Regional educational municipalities will incorporate advanced grammar pedagogy frameworks on condition that state entities allocate extra operational assets.", tr: "Eyalet birimlerinin ekstra operasyonel varlık tahsis etmesi koşuluyla, bölgesel eğitim belediyeleri gelişmiş dil bilgisi pedagojisi çerçevelerini dahil edecektir.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "Active server directories can maintain strict data safety boundaries over the weekend provided that unauthenticated external entries are blocked by default.", tr: "Kimliği doğrulanmamış harici girişlerin varsayılan olarak engellenmesi şartıyla, aktif sunucu dizinleri hafta sonu boyunca katı veri güvenliği sınırlarını koruyabilir.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "The upgraded automated synchronization gateway will process complex multi-layer dimensions on condition that the core network operates efficiently.", tr: "Çekirdek ağın verimli çalışması koşuluyla, yükseltilmiş otomatik senkronizasyon geçidi karmaşık çok katmanlı boyutları işleyecektir.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] }
    ],
    extraComplex: [
      { en: "The international legal committee will ratify the bilateral trade treaty smoothly provided that the stipulated monetary fine is paid into the central escrow fund.", tr: "Öngörülen para cezası merkezi emanet fonuna ödenmesi şartıyla, uluslararası hukuk komitesi ikili ticaret anlaşmasını sorunsuz bir şekilde onaylayacaktır.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "Senior directors will officially sign off on the provincial project roadmap on condition that the technical data migration work is done by tomorrow evening.", tr: "Teknik veri geçiş işinin yarına kadar yapılması koşuluyla, kıdemli direktörler bölgesel proje yol haritasını resmi olarak onaylayacaktır.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "The transaction gateway will grant advanced administrative clearance to the client profile provided that cryptographic validation tokens are authenticated securely.", tr: "Kriptografik doğrulama jetonlarının güvenli bir şekilde doğrulanması şartıyla, işlem geçidi istemci profiline gelişmiş idari yetki verecektir.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "Cross-disciplinary engineering groups can successfully mitigate severe system stress on condition that configuration parameters remain entirely stable.", tr: "Yapılandırma parametrelerinin tamamen kararlı kalması koşuluyla, disiplinler arası mühendislik grupları ciddi sistem stresini başarıyla hafifletebilir.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "The qualitative monograph archives will serve as reliable academic references for centuries provided that paper documentation does not degrade due to environmental factors.", tr: "Kağıt belgelerin çevresel faktörler nedeniyle bozulmaması şartıyla, nitel monografi arşivleri yüzyıllar boyunca güvenilir akademik referanslar olarak hizmet edecektir.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "External corporate practitioners will be permitted to review the repository schema on condition that administrative metadata access is regulated strictly by firewalls.", tr: "İdari meta veri erişiminin güvenlik duvarları tarafından sıkı bir şekilde düzenlenmesi koşuluyla, harici kurumsal uygulayıcıların havuz şemasını incelemesine izin verilecektir.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "The central security framework will automatically initialize a catastrophic shutdown sequence provided that database integrity is compromised by malicious entities.", tr: "Veritabanı bütünlüğünün kötü niyetli yapılar tarafından tehlikeye atılması şartıyla, merkezi güvenlik çerçevesi otomatik olarak felaket düzeyinde bir kapatma dizisi başlatacaktır.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "The software development team can roll out the gamified language application update on condition that local compliance codes align with global market standards.", tr: "Yerel uyumluluk kurallarının küresel pazar standartlarıyla uyumlu olması koşuluyla, yazılım geliştirme ekibi oyunlaştırılmış dil uygulaması güncellemesini sunabilir.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "Junior technicians are legally authorized to operate the vacuum chamber device provided that their baseline reference documentation is verified by supervisors.", tr: "Temel referans belgelerinin denetçiler tarafından doğrulanması şartıyla, yardımcı teknisyenlerin vakum odası cihazını çalıştırmaya yasal yetkileri vardır.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "The mobile interface can achieve exceptionally smooth user performance metrics on condition that upcoming application builds are thoroughly optimized.", tr: "Gelecek uygulama sürümlerinin kapsamlı şekilde optimize edilmesi koşuluyla, mobil arayüz son derece akıcı kullanıcı performans metrikleri elde edebilir.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "Decentralized cloud network infrastructures can manage high-volume transaction traffic floods provided that background memory leakage is minimized effectively.", tr: "Arka plan bellek sızıntısının etkili bir şekilde en aza indirilmesi şartıyla, merkeziyetsiz bulut ağ altyapıları yüksek hacimli işlem trafiği dalgalarını yönetebilir.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "The legislative assembly will pass the statutory administrative amendments smoothly on condition that regional cross-disciplinary groups agree on policy terms.", tr: "Bölgesel disiplinler arası grupların politika koşullarında anlaşması koşuluyla, yasama meclisi yasal idari değişiklikleri sorunsuz bir şekilde kabul edecektir.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "The primary framework compiler can avoid triggering extensive compilation errors provided that cleanup scripts execute concurrently with database loops.", tr: "Temizleme betiklerinin veritabanı döngüleriyle eşzamanlı çalışması şartıyla, birincil çerçeve derleyicisi kapsamlı derleme hataları tetiklemekten kaçınabilir.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "Project coordinators will release extra capital expenditure funds to the research department on condition that the initial simulation testing succeeds.", tr: "İlk simülasyon testlerinin başarılı olması koşuluyla, proje koordinatörleri araştırma departmanına ekstra sermaye harcaması fonu serbest bırakacaktır.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "Frontend web developers can eliminate navigation lag thresholds permanently provided that automated layout rendering tools function precisely.", tr: "Otomatik düzen oluşturma araçlarının hassas çalışması şartıyla, ön uç web geliştiricileri gezinme gecikme eşiklerini kalıcı olarak ortadan kaldırabilir.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "National state departments will grant certified contractor licenses to the tech startup on condition that existing structural constraints are resolved.", tr: "Mevcut yapısal kısıtlamaların çözülmesi koşuluyla, ulusal eyalet departmanları teknoloji girişimine sertifikalı yüklenici lisansları verecektir.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "Local server partitions can maintain optimal processing speeds during long tracking operations provided that raw binary logs are cleared periodically.", tr: "Ham ikili günlüklerin periyodik olarak temizlenmesi şartıyla, yerel sunucu bölümleri uzun takip işlemleri sırasında en uygun işlem hızlarını koruyabilir.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "Regional educational municipalities will incorporate advanced grammar pedagogy frameworks on condition that state entities allocate extra operational assets.", tr: "Eyalet birimlerinin ekstra operasyonel varlık tahsis etmesi koşuluyla, bölgesel eğitim belediyeleri gelişmiş dil bilgisi pedagojisi çerçevelerini dahil edecektir.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] },
      { en: "Active server directories can maintain strict data safety boundaries over the weekend provided that unauthenticated external entries are blocked by default.", tr: "Kimliği doğrulanmamış harici girişlerin varsayılan olarak engellenmesi şartıyla, aktif sunucu dizinleri hafta sonu boyunca katı veri güvenliği sınırlarını koruyabilir.", word: "provided that", options: ["provided that", "unless", "although", "since"] },
      { en: "The upgraded automated synchronization gateway will process complex multi-layer dimensions on condition that the core network operates efficiently.", tr: "Çekirdek ağın verimli çalışması koşuluyla, yükseltilmiş otomatik senkronizasyon geçidi karmaşık çok katmanlı boyutları işleyecektir.", word: "on condition that", options: ["on condition that", "unless", "although", "since"] }
    ]
  }
};

// Shuffling helper
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Clean words helper for word-bank
function cleanWords(text) {
  return text.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"]/g,"")).filter(w => w.length > 0);
}

// Helper to check for commas
function hasComma(sentence) {
  return sentence.includes(',');
}

// Global list to extract high-quality distractors
function getDistractors(allSentences, targetSentence, count, isTr) {
  const allWords = allSentences
    .filter(s => s.en !== targetSentence.en)
    .map(s => cleanWords(isTr ? s.tr : s.en))
    .flat();
  const uniqueWords = [...new Set(allWords)].filter(w => w.toLowerCase() !== targetSentence.word.toLowerCase());
  const shuffled = shuffle(uniqueWords);
  return shuffled.slice(0, count);
}

// Generate the exercises for a lesson
function generateLessonExercises(lessonKey, lessonData) {
  const unitId = 32;
  const lessonId = 124 + parseInt(lessonKey); // 125 to 134

  // 1. Combine micro, academic, and extraComplex sentences
  const allSentences = [];
  lessonData.micro.forEach(s => allSentences.push({ ...s, group: 'micro' }));
  lessonData.academic.forEach(s => allSentences.push({ ...s, group: 'academic' }));
  lessonData.extraComplex.forEach(s => allSentences.push({ ...s, group: 'extraComplex' }));

  // 2. Sort by English length (Basitten karmaşığa)
  allSentences.sort((a, b) => a.en.length - b.en.length);

  // 3. Slices for 5 exercises
  const slices = [
    { name: "Temel Çalışma", data: allSentences.slice(0, 14) },
    { name: "Giriş Seviyesi Akademik Yapılar", data: allSentences.slice(12, 25) },
    { name: "Orta Düzey Akademik Yapılar", data: allSentences.slice(24, 37) },
    { name: "İleri Düzey Akademik Yapılar", data: allSentences.slice(36, 49) },
    { name: "Karmaşık Akademik Analiz", data: allSentences.slice(47, 60) }
  ];

  // To maintain 50/50 split of clozes globally per lesson
  let clozeCounter = 0;

  const exercises = [];

  slices.forEach((slice, exIdx) => {
    const exId = exIdx + 1;
    const questions = [];

    // Let's divide questions:
    const mcTransEngToTr = [];
    const mcTransTrToEng = [];
    const clozes = [];
    const wordBanks = [];
    const transTexts = [];

    // Helper for matching (only in Ex 1)
    const matchingPairs = [];

    slice.data.forEach((s, idx) => {
      const sentenceHasComma = hasComma(s.en);

      // Generate MC translation (only for sentences without commas)
      if (!sentenceHasComma && idx < 4) {
        // Eng to Tr MC
        const wrongSents = allSentences.filter(os => os.en !== s.en && os.group === s.group);
        const distractors = shuffle(wrongSents).slice(0, 3).map(os => os.tr);
        const options = shuffle([s.tr, ...distractors]);
        mcTransEngToTr.push({
          id: `u${unitId}l${lessonId}_ex${exId}_mc_et_${idx}`,
          type: "multiple-choice",
          prompt: `Cümlenin en uygun Türkçe karşılığını seçin:<br><br><strong>"${s.en}"</strong>`,
          options: options,
          correctIndex: options.indexOf(s.tr),
          enSentence: s.en,
          isEngToTr: true
        });

        // Tr to Eng MC
        const distractorsEn = shuffle(wrongSents).slice(0, 3).map(os => os.en);
        const optionsEn = shuffle([s.en, ...distractorsEn]);
        mcTransTrToEng.push({
          id: `u${unitId}l${lessonId}_ex${exId}_mc_te_${idx}`,
          type: "multiple-choice",
          prompt: `Cümlenin en uygun İngilizce karşılığını seçin:<br><br><strong>"${s.tr}"</strong>`,
          options: optionsEn,
          correctIndex: optionsEn.indexOf(s.en),
          enSentence: s.en,
          isEngToTr: false
        });
      }

      // Generate Cloze
      const clozeType = (clozeCounter++ % 2 === 0) ? "fill-blank-dropdown" : "fill-blank";
      const clozePrompt = (clozeType === "fill-blank-dropdown") 
        ? "Boşluğa gelecek en uygun kelimeyi seçin:" 
        : "Boşluğu doldur";
      
      const blankChar = "___";
      const regex = new RegExp(`\\b${s.word}\\b`, 'i');
      let sentenceWithBlank = s.en.replace(regex, blankChar);
      if (!sentenceWithBlank.includes(blankChar)) {
        sentenceWithBlank = s.en.replace(s.word, blankChar);
      }

      clozes.push({
        id: `u${unitId}l${lessonId}_ex${exId}_cloze_${idx}`,
        type: clozeType,
        prompt: clozePrompt,
        sentence: sentenceWithBlank,
        options: shuffle(s.options),
        correctIndex: 0, // set below
        enSentence: s.en,
        translation: s.tr
      });
      const lastCloze = clozes[clozes.length - 1];
      lastCloze.correctIndex = lastCloze.options.indexOf(s.word);

      // Generate Word Bank
      const isWordBankEngToTr = idx % 2 === 0;
      if (isWordBankEngToTr) {
        const targetWords = cleanWords(s.tr);
        const distractorsTr = getDistractors(allSentences, s, 3, true);
        wordBanks.push({
          id: `u${unitId}l${lessonId}_ex${exId}_wb_et_${idx}`,
          type: "word-bank",
          prompt: "Cümlenin Türkçe karşılığını oluşturun:",
          translation: s.en,
          words: shuffle([...targetWords, ...distractorsTr]),
          correctOrder: targetWords,
          enSentence: s.en,
          isEngToTr: true
        });
      } else {
        const targetWords = cleanWords(s.en);
        const distractorsEn = getDistractors(allSentences, s, 3, false);
        wordBanks.push({
          id: `u${unitId}l${lessonId}_ex${exId}_wb_te_${idx}`,
          type: "word-bank",
          prompt: "Cümlenin İngilizce karşılığını oluşturun:",
          translation: s.tr,
          words: shuffle([...targetWords, ...distractorsEn]),
          correctOrder: targetWords,
          enSentence: s.en,
          isEngToTr: false
        });
      }

      // Generate Matching pair (only in Ex 1)
      if (exId === 1 && idx < 8) {
        matchingPairs.push({
          left: s.tr,
          right: s.en
        });
      }

      // Generate Translation Text (only for Exercise 5 at the end)
      if (exId === 5 && idx >= slice.data.length - 2) {
        transTexts.push({
          id: `u${unitId}l${lessonId}_ex${exId}_tx_et_${idx}`,
          type: "translation-text",
          prompt: `"${s.en}" ifadesini Türkçe'ye çevirin:`,
          correctSentence: s.tr,
          enSentence: s.en,
          isEngToTr: true
        });
      }
    });

    // Assemble questions into exercise
    if (exId === 1 && matchingPairs.length >= 8) {
      questions.push({
        id: `u${unitId}l${lessonId}_ex${exId}_match1`,
        type: "matching",
        prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
        pairs: shuffle(matchingPairs.slice(0, 4))
      });
      questions.push({
        id: `u${unitId}l${lessonId}_ex${exId}_match2`,
        type: "matching",
        prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
        pairs: shuffle(matchingPairs.slice(4, 8))
      });
    }

    // MC translations first
    questions.push(...mcTransEngToTr.slice(0, 2));
    questions.push(...mcTransTrToEng.slice(0, 2));

    // Interleave Cloze and Word Bank
    const mixed = [];
    const clozeCount = exId === 1 ? 2 : 4;
    const wbCount = exId === 1 ? 2 : 4;
    const selectClozes = shuffle(clozes).slice(0, clozeCount);
    const selectWbs = shuffle(wordBanks).slice(0, wbCount);

    for (let i = 0; i < Math.max(clozeCount, wbCount); i++) {
      if (i < selectClozes.length) mixed.push(selectClozes[i]);
      if (i < selectWbs.length) mixed.push(selectWbs[i]);
    }
    questions.push(...mixed);

    // Translation Texts must come at the very end
    if (transTexts.length > 0) {
      questions.push(...transTexts.slice(0, 2));
    }

    // Compensation logic if we have less than 10 questions (due to comma restriction on MC translations)
    const targetLength = 10;
    if (questions.length < targetLength) {
      const currentIds = new Set(questions.map(q => q.id));
      const remainingQuestions = [];
      clozes.forEach(c => {
        if (!currentIds.has(c.id)) remainingQuestions.push(c);
      });
      wordBanks.forEach(w => {
        if (!currentIds.has(w.id)) remainingQuestions.push(w);
      });
      const shuffledRemaining = shuffle(remainingQuestions);
      while (questions.length < targetLength && shuffledRemaining.length > 0) {
        questions.push(shuffledRemaining.pop());
      }
    }

    // Trim to 10 questions max for clean UX
    const trimmedQuestions = questions.slice(0, 10);

    exercises.push({
      id: `u${unitId}l${lessonId}ex${exId}`,
      title: `Alıştırma ${exId}: ${slice.name}`,
      description: `${slice.name} düzey cümleler ve yapılarla pratik.`,
      questions: trimmedQuestions
    });
  });

  return { exercises };
}

// 2. Generate compiled unit 32 sentences map for all 10 lessons
const compiledUnit32 = {};
for (const lessonKey in rawData) {
  compiledUnit32[lessonKey] = generateLessonExercises(lessonKey, rawData[lessonKey]);
}

// 3. Update data.js
const dataFilePath = path.join(__dirname, '..', 'data.js');
let dataContent = fs.readFileSync(dataFilePath, 'utf8');

// A. Update Unit 32 metadata
// Change numLessons: 9 to numLessons: 10
dataContent = dataContent.replace(
  /(\bid:\s*32,[\s\S]*?numLessons:\s*)9/,
  "$110"
);

// Replace formulas block of Topic 32
const topic32Regex = /(\bid:\s*32,[\s\S]*?formulas:\s*\[)([\s\S]*?)(\],)/;
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
      },
      {
        formula: "${rawData["5"].formula}",
        example: "${rawData["5"].example}",
        description: "${rawData["5"].description}"
      },
      {
        formula: "${rawData["6"].formula}",
        example: "${rawData["6"].example}",
        description: "${rawData["6"].description}"
      },
      {
        formula: "${rawData["7"].formula}",
        example: "${rawData["7"].example}",
        description: "${rawData["7"].description}"
      },
      {
        formula: "${rawData["8"].formula}",
        example: "${rawData["8"].example}",
        description: "${rawData["8"].description}"
      },
      {
        formula: "${rawData["9"].formula}",
        example: "${rawData["9"].example}",
        description: "${rawData["9"].description}"
      },
      {
        formula: "${rawData["10"].formula}",
        example: "${rawData["10"].example}",
        description: "${rawData["10"].description}"
      }
  `;
dataContent = dataContent.replace(topic32Regex, `$1${replacementFormulas}$3`);

// Replace subtitles block of Topic 32
const topic32SubRegex = /(\bid:\s*32,[\s\S]*?subtitles:\s*\[)([\s\S]*?)(\]\s*\n*\s*\})/i;
const replacementSubtitles = `
      "B. Sebep - a) because (Sayfa 187)",
      "B. Sebep - b) since (Sayfa 191)",
      "B. Sebep - c) as (Sayfa 192)",
      "C. Karşıtlık - 'Although' (Sayfa 194)",
      "D. Derece (Sayfa 198)",
      "E. Maksat (Sayfa 201)",
      "F. Netice (Sayfa 204)",
      "G. Şart - a) if (Sayfa 206)",
      "G. Şart - b) unless (Sayfa 213)",
      "G. Şart - c) provided that / on condition that (Sayfa 215)"
  `;
dataContent = dataContent.replace(topic32SubRegex, `$1${replacementSubtitles}$3`);

// B. Update Unit 33 (Okuma Parçaları 1) metadata
// Change startLessonId: 134 to startLessonId: 135
dataContent = dataContent.replace(
  /(\bid:\s*33,[\s\S]*?startLessonId:\s*)134/,
  "$1135"
);

// Rename u33l134 to u33l135 in dataContent
dataContent = dataContent.replace(/u33l134/g, "u33l135");

// C. Replace 32: { ... } in unitSentencesMap
const compiledJson = JSON.stringify(compiledUnit32, null, 2);
if (dataContent.includes("  32: {")) {
  const unit32MapRegex = /(32:\s*\{)([\s\S]*?)(\},\s*\n*\s*33:)/;
  dataContent = dataContent.replace(unit32MapRegex, `32: ${compiledJson},\n  33:`);
} else {
  dataContent = dataContent.replace("  33: {", `  32: ${compiledJson},\n  33: {`);
}

fs.writeFileSync(dataFilePath, dataContent, 'utf8');
console.log("data.js updated successfully!");
