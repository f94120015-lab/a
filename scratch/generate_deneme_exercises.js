const fs = require('fs');

// 1. Sentences definitions for Lesson 95 (Present Continuous)
const L95_sents = [
  { en: "At the moment, heavy rain is affecting the simulation site.", tr: "Şu anda şiddetli yağmur simülasyon alanını etkiliyor.", word: "moment", trWord: "an", blank: "At the moment, heavy rain is ___ the simulation site.", options: ["affecting", "affected", "affect", "affects"] },
  { en: "Right now, the central server is validating user credentials.", tr: "Şu anda merkez sunucu kullanıcı kimlik bilgilerini doğruluyor.", word: "validating", trWord: "doğruluyor", blank: "Right now, the central server is ___ user credentials.", options: ["validating", "validated", "validate", "validates"] },
  { en: "The academic team is currently testing the new device.", tr: "Akademik ekip şu anda yeni cihazı test ediyor.", word: "currently", trWord: "şu anda", blank: "The academic team is ___ testing the new device.", options: ["currently", "yesterday", "since", "last year"] },
  { en: "The research facility currently requires additional financial resources.", tr: "Araştırma tesisi şu anda ek finansal kaynaklara ihtiyaç duyuyor.", word: "requires", trWord: "gerektiriyor", blank: "The research facility currently ___ additional financial resources.", options: ["requires", "required", "requiring", "will require"] },
  { en: "At the moment, the compiler is processing the data blocks.", tr: "Şu anda, derleyici veri bloklarını işliyor.", word: "compiler", trWord: "derleyici", blank: "At the moment, the ___ is processing the data blocks.", options: ["compiler", "compilation", "compiled", "compile"] },
  { en: "The system is presently generating a unique cryptographic key.", tr: "Sistem şu anda benzersiz bir kriptografik anahtar üretiyor.", word: "presently", trWord: "şu sıralar", blank: "The system is ___ generating a unique cryptographic key.", options: ["presently", "ago", "last week", "in 2010"] },
  { en: "At present, the automatic system is monitoring pressure parameters.", tr: "Şu anda, otomatik sistem basınç parametrelerini izliyor.", word: "monitoring", trWord: "izliyor", blank: "At present, the automatic system is ___ pressure parameters.", options: ["monitoring", "monitored", "monitor", "monitors"] },
  { en: "These days, public laboratories are adjusting their security protocols.", tr: "Bugünlerde, kamu laboratuvarları güvenlik protokollerini ayarlıyor.", word: "adjusting", trWord: "ayarlıyor", blank: "These days, public laboratories are ___ their security protocols.", options: ["adjusting", "adjusted", "adjust", "adjusts"] },
  { en: "These days, local institutions are altering their internal laws.", tr: "Bugünlerde, yerel kurumlar kendi iç yasalarını değiştiriyor.", word: "altering", trWord: "değiştiriyor", blank: "These days, local institutions are ___ their internal laws.", options: ["altering", "altered", "alter", "alters"] },
  { en: "Nowadays, software developers prefer gamified mobile design patterns.", tr: "Günümüzde, yazılım geliştiriciler oyunlaştırılmış mobil tasarım desenlerini tercih ediyor.", word: "prefer", trWord: "tercih ediyor", blank: "Nowadays, software developers ___ gamified mobile design patterns.", options: ["prefer", "preferred", "preferring", "prefers"] },

  // Expanded
  { en: "At the moment, heavy rain is affecting the simulation site; therefore, field operations are temporarily suspended.", tr: "Şu anda şiddetli yağmur simülasyon alanını etkiliyor; bu nedenle, saha operasyonları geçici olarak durduruldu.", word: "therefore", trWord: "bu nedenle", blank: "At the moment, heavy rain is affecting the simulation site; ___, field operations are temporarily suspended.", options: ["therefore", "because of", "despite", "although"] },
  { en: "Right now, the central server is validating user credentials on grounds that previous login requests were corrupted.", tr: "Şu anda merkez sunucu, önceki giriş isteklerinin bozuk olması gerekçesiyle kullanıcı kimlik bilgilerini doğruluyor.", word: "corrupted", trWord: "bozulmuş", blank: "Right now, the central server is validating user credentials on grounds that previous login requests were ___.", options: ["corrupted", "corrupting", "corrupts", "will corrupt"] },
  { en: "The academic team is currently testing the new device just as the original mathematical physics formulas predicted.", tr: "Akademik ekip, tam da orijinal matematiksel fizik formüllerinin öngördüğü gibi şu anda yeni cihazı test ediyor.", word: "predicted", trWord: "öngördü", blank: "The academic team is currently testing the new device just as the original mathematical physics formulas ___.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">predicted</span>", "predicting", "predicts", "will predict"] },
  { en: "The system is presently generating a unique cryptographic key as soon as the administrator grants verification clearance.", tr: "Sistem, yönetici doğrulama izni verir vermez şu anda benzersiz bir kriptografik anahtar üretiyor.", word: "administrator", trWord: "yönetici", blank: "The system is presently generating a unique cryptographic key as soon as the ___ grants verification clearance.", options: ["administrator", "administration", "administrative", "administer"] },
  { en: "At the moment, the compiler is processing the data blocks while the network firewall blocks external traffic.", tr: "Şu anda, ağ güvenlik duvarı harici trafiği engellerken derleyici veri bloklarını işliyor.", word: "firewall", trWord: "güvenlik duvarı", blank: "At the moment, the compiler is processing the data blocks while the network ___ blocks external traffic.", options: ["firewall", "firewalls", "fire", "wall"] },
  { en: "These days, public laboratories are adjusting their security protocols because malicious malware attacks threaten sensitive files.", tr: "Bugünlerde, kötü amaçlı yazılım saldırıları hassas dosyaları tehdit ettiği için kamu laboratuvarları güvenlik protokollerini ayarlıyor.", word: "threaten", trWord: "tehdit ediyor", blank: "These days, public laboratories are adjusting their security protocols because malicious malware attacks ___ sensitive files.", options: ["threaten", "threatened", "threatening", "threatens"] },
  { en: "These days, local institutions are altering their internal laws inasmuch as regional environmental regulations have become stricter.", tr: "Bugünlerde, yerel kurumlar bölgesel çevre düzenlemelerinin daha katı hale gelmesi nedeniyle iç yasalarını değiştiriyor.", word: "inasmuch", trWord: "çünkü / -den dolayı", blank: "These days, local institutions are altering their internal laws ___ regional environmental regulations have become stricter.", options: ["inasmuch as", "because of", "despite", "although"] },
  { en: "Nowadays, software developers prefer gamified mobile design patterns in order that students might learn complex grammar easily.", tr: "Günümüzde yazılım geliştiriciler, öğrencilerin karmaşık dilbilgisini kolayca öğrenebilmesi için oyunlaştırılmış mobil tasarım desenlerini tercih ediyor.", word: "grammar", trWord: "dilbilgisi", blank: "Nowadays, software developers prefer gamified mobile design patterns in order that students might learn complex ___ easily.", options: ["grammar", "grammatical", "grammars", "spelling"] },
  { en: "At present, the automatic system is monitoring pressure parameters lest the industrial mechanical piston should fail unexpectedly.", tr: "Şu anda otomatik sistem, endüstriyel mekanik pistonun beklenmedik şekilde arızalanmaması için basınç parametrelerini izliyor.", word: "fail", trWord: "arızalanmak", blank: "At present, the automatic system is monitoring pressure parameters lest the industrial mechanical piston should ___ unexpectedly.", options: ["fail", "failed", "failing", "fails"] },
  { en: "The international research facility currently requires additional financial resources to optimize its secondary structural frameworks.", tr: "Uluslararası araştırma tesisi, ikincil yapısal çerçevelerini optimize etmek için şu anda ek finansal kaynaklar gerektiriyor.", word: "frameworks", trWord: "çerçeveler", blank: "The international research facility currently requires additional financial resources to optimize its secondary structural ___.", options: ["frameworks", "framework", "frame", "frames"] }
];

// 2. Sentences definitions for Lesson 96 (Past Simple)
// All past simple verbs are wrapped in red styling: <span style="color: #ff6b6b; font-weight: bold;">...</span>
const L96_sents = [
  { en: "A heavy rain <span style=\"color: #ff6b6b; font-weight: bold;\">affected</span> the simulation site yesterday.", tr: "Dün şiddetli bir yağmur simülasyon alanını etkiledi.", word: "affected", trWord: "etkiledi", blank: "A heavy rain ___ the simulation site yesterday.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">affected</span>", "affecting", "affect", "affects"] },
  { en: "Yesterday, the central server <span style=\"color: #ff6b6b; font-weight: bold;\">validated</span> all user credentials.", tr: "Dün merkez sunucu tüm kullanıcı kimlik bilgilerini doğruladı.", word: "validated", trWord: "doğruladı", blank: "Yesterday, the central server ___ all user credentials.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">validated</span>", "validating", "validate", "validates"] },
  { en: "The academic team <span style=\"color: #ff6b6b; font-weight: bold;\">completed</span> the new device test in 2020.", tr: "Akademik ekip yeni cihaz testini 2020'de tamamladı.", word: "completed", trWord: "tamamladı", blank: "The academic team ___ the new device test in 2020.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">completed</span>", "completing", "complete", "completes"] },
  { en: "The research facility successfully <span style=\"color: #ff6b6b; font-weight: bold;\">upgraded</span> the database yesterday.", tr: "Araştırma tesisi dün veri tabanını başarıyla yükseltti.", word: "upgraded", trWord: "yükseltti", blank: "The research facility successfully ___ the database yesterday.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">upgraded</span>", "upgrading", "upgrade", "upgrades"] },
  { en: "Two years ago, the compiler <span style=\"color: #ff6b6b; font-weight: bold;\">processed</span> the data blocks without errors.", tr: "İki yıl önce, derleyici veri bloklarını hatasız işledi.", word: "processed", trWord: "işledi", blank: "Two years ago, the compiler ___ the data blocks without errors.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">processed</span>", "processing", "process", "processes"] },
  { en: "The system <span style=\"color: #ff6b6b; font-weight: bold;\">generated</span> a unique cryptographic key last week.", tr: "Sistem geçen hafta benzersiz bir kriptografik anahtar üretti.", word: "generated", trWord: "üretti", blank: "The system ___ a unique cryptographic key last week.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">generated</span>", "generating", "generate", "generates"] },
  { en: "The automatic system <span style=\"color: #ff6b6b; font-weight: bold;\">monitored</span> pressure parameters three hours ago.", tr: "Otomatik sistem üç saat önce basınç parametrelerini izledi.", word: "monitored", trWord: "izledi", blank: "The automatic system ___ pressure parameters three hours ago.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">monitored</span>", "monitoring", "monitor", "monitors"] },
  { en: "Last month, public laboratories <span style=\"color: #ff6b6b; font-weight: bold;\">adjusted</span> their security protocols.", tr: "Geçen ay, kamu laboratuvarları güvenlik protokollerini ayarladı.", word: "adjusted", trWord: "ayarladı", blank: "Last month, public laboratories ___ their security protocols.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">adjusted</span>", "adjusting", "adjust", "adjusts"] },
  { en: "Last year, local institutions <span style=\"color: #ff6b6b; font-weight: bold;\">altered</span> their internal laws.", tr: "Geçen yıl, yerel kurumlar iç yasalarını değiştirdi.", word: "altered", trWord: "değiştirdi", blank: "Last year, local institutions ___ their internal laws.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">altered</span>", "altering", "alter", "alters"] },
  { en: "In 2012, software developers <span style=\"color: #ff6b6b; font-weight: bold;\">preferred</span> traditional mobile design patterns.", tr: "2012'de yazılım geliştiriciler geleneksel mobil tasarım desenlerini tercih etti.", word: "preferred", trWord: "tercih etti", blank: "In 2012, software developers ___ traditional mobile design patterns.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">preferred</span>", "preferring", "prefer", "prefers"] },

  // Expanded
  { en: "Yesterday, a heavy rain <span style=\"color: #ff6b6b; font-weight: bold;\">affected</span> the simulation site; therefore, field operations <span style=\"color: #ff6b6b; font-weight: bold;\">were</span> temporarily suspended.", tr: "Dün, şiddetli bir yağmur simülasyon alanını etkiledi; bu nedenle, saha operasyonları geçici olarak durduruldu.", word: "were", trWord: "durduruldu", blank: "Yesterday, a heavy rain <span style=\"color: #ff6b6b; font-weight: bold;\">affected</span> the simulation site; therefore, field operations ___ temporarily suspended.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">were</span>", "are", "have been", "will be"] },
  { en: "Yesterday, the central server <span style=\"color: #ff6b6b; font-weight: bold;\">validated</span> all user credentials on grounds that previous login requests <span style=\"color: #ff6b6b; font-weight: bold;\">were</span> corrupted.", tr: "Dün merkez sunucu, önceki giriş isteklerinin bozuk olması gerekçesiyle tüm kullanıcı kimlik bilgilerini doğruladı.", word: "were", trWord: "idi", blank: "Yesterday, the central server <span style=\"color: #ff6b6b; font-weight: bold;\">validated</span> all user credentials on grounds that previous login requests ___ corrupted.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">were</span>", "are", "have been", "will be"] },
  { en: "The academic team <span style=\"color: #ff6b6b; font-weight: bold;\">completed</span> the new device test in 2020 just as the original mathematical physics formulas <span style=\"color: #ff6b6b; font-weight: bold;\">predicted</span>.", tr: "Akademik ekip, tam da orijinal matematiksel fizik formüllerinin öngördüğü gibi yeni cihaz testini 2020'de tamamladı.", word: "predicted", trWord: "öngördü", blank: "The academic team <span style=\"color: #ff6b6b; font-weight: bold;\">completed</span> the new device test in 2020 just as the original mathematical physics formulas ___.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">predicted</span>", "predicting", "predicts", "will predict"] },
  { en: "The system <span style=\"color: #ff6b6b; font-weight: bold;\">generated</span> a unique cryptographic key as soon as the administrator <span style=\"color: #ff6b6b; font-weight: bold;\">granted</span> verification clearance last week.", tr: "Sistem, yönetici geçen hafta doğrulama izni verir vermez benzersiz bir kriptografik anahtar üretti.", word: "granted", trWord: "verdi", blank: "The system <span style=\"color: #ff6b6b; font-weight: bold;\">generated</span> a unique cryptographic key as soon as the administrator ___ verification clearance last week.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">granted</span>", "grants", "granting", "will grant"] },
  { en: "Two years ago, the compiler <span style=\"color: #ff6b6b; font-weight: bold;\">processed</span> the data blocks while the network firewall <span style=\"color: #ff6b6b; font-weight: bold;\">blocked</span> external traffic.", tr: "İki yıl önce, ağ güvenlik duvarı harici trafiği engellerken derleyici veri bloklarını işledi.", word: "blocked", trWord: "engelledi", blank: "Two years ago, the compiler <span style=\"color: #ff6b6b; font-weight: bold;\">processed</span> the data blocks while the network firewall ___ external traffic.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">blocked</span>", "blocks", "blocking", "will block"] },
  { en: "Last month, public laboratories <span style=\"color: #ff6b6b; font-weight: bold;\">adjusted</span> their security protocols because malicious malware attacks <span style=\"color: #ff6b6b; font-weight: bold;\">threatened</span> sensitive files.", tr: "Geçen ay, kötü amaçlı yazılım saldırıları hassas dosyaları tehdit ettiği için kamu laboratuvarları güvenlik protokollerini ayarladı.", word: "threatened", trWord: "tehdit etti", blank: "Last month, public laboratories <span style=\"color: #ff6b6b; font-weight: bold;\">adjusted</span> their security protocols because malicious malware attacks ___ sensitive files.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">threatened</span>", "threaten", "threatening", "threatens"] },
  { en: "Last year, local institutions <span style=\"color: #ff6b6b; font-weight: bold;\">altered</span> their internal laws inasmuch as regional environmental regulations <span style=\"color: #ff6b6b; font-weight: bold;\">became</span> stricter.", tr: "Geçen yıl, yerel kurumlar bölgesel çevre düzenlemelerinin daha katı hale gelmesi nedeniyle iç yasalarını değiştirdi.", word: "became", trWord: "hale geldi", blank: "Last year, local institutions <span style=\"color: #ff6b6b; font-weight: bold;\">altered</span> their internal laws inasmuch as regional environmental regulations ___ stricter.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">became</span>", "become", "becoming", "have become"] },
  { en: "In 2012, software developers <span style=\"color: #ff6b6b; font-weight: bold;\">preferred</span> traditional mobile design patterns in order that students <span style=\"color: #ff6b6b; font-weight: bold;\">might</span> learn basic grammar easily.", tr: "2012'de yazılım geliştiriciler, öğrencilerin temel dilbilgisini kolayca öğrenebilmesi için geleneksel mobil tasarım desenlerini tercih etti.", word: "might", trWord: "ebilmek için", blank: "In 2012, software developers <span style=\"color: #ff6b6b; font-weight: bold;\">preferred</span> traditional mobile design patterns in order that students ___ learn basic grammar easily.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">might</span>", "may", "will", "can"] },
  { en: "The automatic system <span style=\"color: #ff6b6b; font-weight: bold;\">monitored</span> pressure parameters three hours ago lest the industrial mechanical piston <span style=\"color: #ff6b6b; font-weight: bold;\">should</span> fail unexpectedly.", tr: "Otomatik sistem, endüstriyel mekanik pistonun beklenmedik şekilde arızalanmaması için üç saat önce basınç parametrelerini izledi.", word: "should", trWord: "-sin diye", blank: "The automatic system <span style=\"color: #ff6b6b; font-weight: bold;\">monitored</span> pressure parameters three hours ago lest the industrial mechanical piston ___ fail unexpectedly.", options: ["should", "would", "will", "shall"] },
  { en: "The international research facility successfully <span style=\"color: #ff6b6b; font-weight: bold;\">upgraded</span> the database yesterday to optimize its secondary structural frameworks.", tr: "Uluslararası araştırma tesisi, ikincil yapısal çerçevelerini optimize etmek için dün veri tabanını başarıyla yükseltti.", word: "upgraded", trWord: "yükseltti", blank: "The international research facility successfully ___ the database yesterday to optimize its secondary structural frameworks.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">upgraded</span>", "upgrades", "upgrading", "will upgrade"] }
];

// 3. Sentences definitions for Lesson 97 (Present Perfect)
// Present perfect verbs are wrapped in green styling: <span style="color: #51cf66; font-weight: bold;">...</span>
// Past simple verbs (since clause) are wrapped in red styling: <span style="color: #ff6b6b; font-weight: bold;">...</span>
const L97_sents = [
  { en: "Up to now, heavy rain <span style=\"color: #51cf66; font-weight: bold;\">has affected</span> the simulation site.", tr: "Şu ana kadar şiddetli yağmur simülasyon alanını etkiledi.", word: "affected", trWord: "etkiledi", blank: "Up to now, heavy rain ___ the simulation site.", options: ["<span style=\"color: #51cf66; font-weight: bold;\">has affected</span>", "affected", "affecting", "affects"] },
  { en: "The central server <span style=\"color: #51cf66; font-weight: bold;\">has just validated</span> the user credentials.", tr: "Merkez sunucu kullanıcı kimlik bilgilerini henüz doğruladı.", word: "validated", trWord: "doğruladı", blank: "The central server ___ the user credentials.", options: ["<span style=\"color: #51cf66; font-weight: bold;\">has just validated</span>", "just validated", "validating", "validates"] },
  { en: "Since 2020, the academic team <span style=\"color: #51cf66; font-weight: bold;\">has tested</span> the new device.", tr: "2020'den beri akademik ekip yeni cihazı test etti.", word: "tested", trWord: "test etti", blank: "Since 2020, the academic team ___ the new device.", options: ["<span style=\"color: #51cf66; font-weight: bold;\">has tested</span>", "tested", "testing", "tests"] },
  { en: "The research facility <span style=\"color: #51cf66; font-weight: bold;\">has recently required</span> additional financial resources.", tr: "Araştırma tesisi son zamanlarda ek finansal kaynaklara ihtiyaç duydu.", word: "required", trWord: "ihtiyaç duydu", blank: "The research facility ___ additional financial resources.", options: ["<span style=\"color: #51cf66; font-weight: bold;\">has recently required</span>", "required", "requiring", "requires"] },
  { en: "Up to now, the compiler <span style=\"color: #51cf66; font-weight: bold;\">has processed</span> all the data blocks.", tr: "Şu ana kadar, derleyici tüm veri bloklarını işledi.", word: "processed", trWord: "işledi", blank: "Up to now, the compiler ___ all the data blocks.", options: ["<span style=\"color: #51cf66; font-weight: bold;\">has processed</span>", "processed", "processing", "processes"] },
  { en: "The system <span style=\"color: #51cf66; font-weight: bold;\">has already generated</span> a unique cryptographic key.", tr: "Sistem çoktan benzersiz bir kriptografik anahtar üretti.", word: "generated", trWord: "üretti", blank: "The system ___ a unique cryptographic key.", options: ["<span style=\"color: #51cf66; font-weight: bold;\">has already generated</span>", "already generated", "generating", "generates"] },
  { en: "Since the team <span style=\"color: #ff6b6b; font-weight: bold;\">started</span> the project, the automatic system <span style=\"color: #51cf66; font-weight: bold;\">has monitored</span> pressure parameters.", tr: "Ekip projeye başladığından beri, otomatik sistem basınç parametrelerini izledi.", word: "monitored", trWord: "izledi", blank: "Since the team <span style=\"color: #ff6b6b; font-weight: bold;\">started</span> the project, the automatic system ___ pressure parameters.", options: ["<span style=\"color: #51cf66; font-weight: bold;\">has monitored</span>", "monitored", "monitoring", "monitors"] },
  { en: "Lately, public laboratories <span style=\"color: #51cf66; font-weight: bold;\">have adjusted</span> their security protocols.", tr: "Son zamanlarda, kamu laboratuvarları güvenlik protokollerini ayarladı.", word: "adjusted", trWord: "ayarladı", blank: "Lately, public laboratories ___ their security protocols.", options: ["<span style=\"color: #51cf66; font-weight: bold;\">have adjusted</span>", "adjusted", "adjusting", "adjusts"] },
  { en: "Lately, local institutions <span style=\"color: #51cf66; font-weight: bold;\">have altered</span> their internal laws.", tr: "Son zamanlarda, yerel kurumlar iç yasalarını değiştirdi.", word: "altered", trWord: "değiştirdi", blank: "Lately, local institutions ___ their internal laws.", options: ["<span style=\"color: #51cf66; font-weight: bold;\">have altered</span>", "altered", "altering", "alters"] },
  { en: "So far, software developers <span style=\"color: #51cf66; font-weight: bold;\">have preferred</span> gamified mobile design patterns.", tr: "Şu ana kadar yazılım geliştiriciler oyunlaştırılmış mobil tasarım desenlerini tercih etti.", word: "preferred", trWord: "tercih etti", blank: "So far, software developers ___ gamified mobile design patterns.", options: ["<span style=\"color: #51cf66; font-weight: bold;\">have preferred</span>", "preferred", "preferring", "prefers"] },

  // Expanded
  { en: "Up to now, heavy rain <span style=\"color: #51cf66; font-weight: bold;\">has affected</span> the simulation site; therefore, field operations <span style=\"color: #51cf66; font-weight: bold;\">have been</span> temporarily suspended.", tr: "Şu ana kadar, şiddetli yağmur simülasyon alanını etkiledi; bu nedenle, saha operasyonları geçici olarak durduruldu.", word: "been", trWord: "oldu", blank: "Up to now, heavy rain <span style=\"color: #51cf66; font-weight: bold;\">has affected</span> the simulation site; therefore, field operations ___ temporarily suspended.", options: ["<span style=\"color: #51cf66; font-weight: bold;\">have been</span>", "were", "are", "will be"] },
  { en: "The central server <span style=\"color: #51cf66; font-weight: bold;\">has just validated</span> user credentials on grounds that previous login requests <span style=\"color: #51cf66; font-weight: bold;\">have been</span> corrupted.", tr: "Merkez sunucu, önceki giriş isteklerinin bozuk olması gerekçesiyle kullanıcı kimlik bilgilerini henüz doğruladı.", word: "been", trWord: "bozulmuş oldu", blank: "The central server <span style=\"color: #51cf66; font-weight: bold;\">has just validated</span> user credentials on grounds that previous login requests ___ corrupted.", options: ["<span style=\"color: #51cf66; font-weight: bold;\">have been</span>", "were", "are", "will be"] },
  { en: "Since 2020, the academic team <span style=\"color: #51cf66; font-weight: bold;\">has tested</span> the new device just as the original mathematical physics formulas <span style=\"color: #ff6b6b; font-weight: bold;\">predicted</span>.", tr: "Akademik ekip, tam da orijinal matematiksel fizik formüllerinin öngördüğü gibi 2020'den beri yeni cihazı test etti.", word: "predicted", trWord: "öngördü", blank: "Since 2020, the academic team <span style=\"color: #51cf66; font-weight: bold;\">has tested</span> the new device just as the original mathematical physics formulas ___.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">predicted</span>", "predicting", "predicts", "will predict"] },
  { en: "The system <span style=\"color: #51cf66; font-weight: bold;\">has already generated</span> a unique cryptographic key since the administrator <span style=\"color: #ff6b6b; font-weight: bold;\">granted</span> verification clearance.", tr: "Sistem, yönetici doğrulama izni verdiğinden beri benzersiz bir kriptografik anahtar üretti.", word: "granted", trWord: "verdi", blank: "The system <span style=\"color: #51cf66; font-weight: bold;\">has already generated</span> a unique cryptographic key since the administrator ___ verification clearance.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">granted</span>", "grants", "granting", "will grant"] },
  { en: "Up to now, the compiler <span style=\"color: #51cf66; font-weight: bold;\">has processed</span> the data blocks while the network firewall <span style=\"color: #51cf66; font-weight: bold;\">has blocked</span> external traffic.", tr: "Şu ana kadar, ağ güvenlik duvarı harici trafiği engellerken derleyici veri bloklarını işledi.", word: "blocked", trWord: "engelledi", blank: "Up to now, the compiler <span style=\"color: #51cf66; font-weight: bold;\">has processed</span> the data blocks while the network firewall ___ external traffic.", options: ["<span style=\"color: #51cf66; font-weight: bold;\">has blocked</span>", "blocks", "blocking", "will block"] },
  { en: "Lately, public laboratories <span style=\"color: #51cf66; font-weight: bold;\">have adjusted</span> their security protocols because malicious malware attacks <span style=\"color: #51cf66; font-weight: bold;\">have threatened</span> sensitive files.", tr: "Son zamanlarda, kötü amaçlı yazılım saldırıları hassas dosyaları tehdit ettiği için kamu laboratuvarları güvenlik protokollerini ayarladı.", word: "threatened", trWord: "tehdit etti", blank: "Lately, public laboratories <span style=\"color: #51cf66; font-weight: bold;\">have adjusted</span> their security protocols because malicious malware attacks ___ sensitive files.", options: ["<span style=\"color: #51cf66; font-weight: bold;\">have threatened</span>", "threaten", "threatening", "threatens"] },
  { en: "Lately, local institutions <span style=\"color: #51cf66; font-weight: bold;\">have altered</span> their internal laws inasmuch as regional environmental regulations <span style=\"color: #51cf66; font-weight: bold;\">have become</span> stricter.", tr: "Son zamanlarda, yerel kurumlar bölgesel çevre düzenlemelerinin daha katı hale gelmesi nedeniyle iç yasalarını değiştirdi.", word: "become", trWord: "hale geldi", blank: "Lately, local institutions <span style=\"color: #51cf66; font-weight: bold;\">have altered</span> their internal laws inasmuch as regional environmental regulations ___ stricter.", options: ["<span style=\"color: #51cf66; font-weight: bold;\">have become</span>", "become", "becoming", "became"] },
  { en: "So far, software developers <span style=\"color: #51cf66; font-weight: bold;\">have preferred</span> gamified mobile design patterns in order that students <span style=\"color: #ff6b6b; font-weight: bold;\">might</span> learn complex grammar easily.", tr: "Şu ana kadar yazılım geliştiriciler, öğrencilerin karmaşık dilbilgisini kolayca öğrenebilmesi için oyunlaştırılmış mobil tasarım desenlerini tercih etti.", word: "might", trWord: "ebilmek için", blank: "So far, software developers <span style=\"color: #51cf66; font-weight: bold;\">have preferred</span> gamified mobile design patterns in order that students ___ learn complex grammar easily.", options: ["<span style=\"color: #ff6b6b; font-weight: bold;\">might</span>", "may", "will", "can"] },
  { en: "Since the experiment <span style=\"color: #ff6b6b; font-weight: bold;\">began</span>, the automatic system <span style=\"color: #51cf66; font-weight: bold;\">has monitored</span> pressure parameters lest the industrial mechanical piston <span style=\"color: #ff6b6b; font-weight: bold;\">should</span> fail unexpectedly.", tr: "Deney başladığından beri otomatik sistem, endüstriyel mekanik pistonun beklenmedik şekilde arızalanmaması için basınç parametrelerini izledi.", word: "should", trWord: "-sin diye", blank: "Since the experiment <span style=\"color: #ff6b6b; font-weight: bold;\">began</span>, the automatic system <span style=\"color: #51cf66; font-weight: bold;\">has monitored</span> pressure parameters lest the industrial mechanical piston ___ fail unexpectedly.", options: ["should", "would", "will", "shall"] },
  { en: "The international research facility <span style=\"color: #51cf66; font-weight: bold;\">has recently required</span> additional financial resources to optimize its secondary structural frameworks.", tr: "Uluslararası araştırma tesisi, ikincil yapısal çerçevelerini optimize etmek için son zamanlarda ek finansal kaynaklara ihtiyaç duydu.", word: "required", trWord: "ihtiyaç duydu", blank: "The international research facility ___ additional financial resources to optimize its secondary structural frameworks.", options: ["<span style=\"color: #51cf66; font-weight: bold;\">has recently required</span>", "required", "requiring", "requires"] }
];

// Helper to generate the blocks for Word Bank questions
function splitToBlocks(sentence) {
  // Strip inline HTML styling first to build clean blocks
  const cleanSent = sentence.replace(/<[^>]+>/g, "").trim();
  // Split into 6-8 words or custom phrases
  const words = cleanSent.split(/\s+/);
  const blocks = [];
  
  // Group words in pairs to make it more like a block-bank (so it's not too long/tedious)
  for (let i = 0; i < words.length; i += 2) {
    if (words[i + 1]) {
      blocks.push(`${words[i]} ${words[i + 1]}`);
    } else {
      blocks.push(words[i]);
    }
  }
  return blocks;
}

// Build exercise questions following exact specifications
function buildQuestions(sentences, unitId, lessonId, exId) {
  const qList = [];
  
  // 1. Sort sentences by en.length (scaffolding: simple first, complex later)
  const sortedSents = [...sentences].sort((a, b) => {
    const cleanA = a.en.replace(/<[^>]+>/g, "");
    const cleanB = b.en.replace(/<[^>]+>/g, "");
    return cleanA.length - cleanB.length;
  });
  
  // Distribute simple/complex (first 10 are simple, next 10 are complex)
  // Let's create questions for this exercise
  if (exId === 1) {
    const simpleSents = sortedSents.slice(0, 10);
    
    // Q1: Matching (Vocabulary)
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_match`,
      type: "matching",
      prompt: "Kelimeleri Türkçe karşılıklarıyla eşleştirin.",
      pairs: simpleSents.slice(0, 4).map(s => ({
        left: s.word,
        right: s.trWord
      }))
    });
    
    // Q2: fill-blank-dropdown
    const s2 = simpleSents[4];
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_fbd_1`,
      type: "fill-blank-dropdown",
      prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
      sentence: s2.blank,
      options: s2.options,
      correct: s2.options[0]
    });
    
    // Q3: Multiple Choice (Timeline Placement / Zaman Treni)
    const s3 = simpleSents[5];
    const cleanS3 = s3.en.replace(/<[^>]+>/g, "");
    const promptTxt = `Zaman Treni: Hangi eylem şu anda/geçmişte devam eden bir süreci temsil etmektedir? <br><br>Cümle: <strong>${s3.en}</strong>`;
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_mc_timeline`,
      type: "multiple-choice",
      prompt: promptTxt,
      options: [
        `"${s3.word}" eyleminin bildirdiği eylem/durum`,
        "Geçmişte bitmiş, donmuş bir durum",
        "Gelecekte planlanan bir eylem"
      ],
      correctIndex: 0,
      enSentence: cleanS3,
      isEngToTr: true
    });
    
    // Q4: fill-blank (buttons)
    const s4 = simpleSents[6];
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_fb_1`,
      type: "fill-blank",
      prompt: "Boşluğu doldur",
      sentence: s4.blank,
      options: s4.options,
      correct: s4.options[0]
    });
    
    // Q5: Multiple Choice (Error Detection / Hata Avcısı)
    const errorOptions = [
      `Since the team started the project, the automatic system will monitor parameters.`,
      `Since the team started the project, the automatic system has monitored parameters.`,
      `Since the team has started the project, the automatic system monitored parameters.`
    ];
    let correctIdx = 1;
    if (lessonId === 95) {
      errorOptions[0] = `At the moment, the compiler is processes the data blocks.`;
      errorOptions[1] = `At the moment, the compiler is processing the data blocks.`;
      errorOptions[2] = `At the moment, the compiler processed the data blocks right now.`;
    } else if (lessonId === 96) {
      errorOptions[0] = `The system generated a unique cryptographic key last week since then.`;
      errorOptions[1] = `The system generated a unique cryptographic key last week.`;
      errorOptions[2] = `The system has generated a unique cryptographic key yesterday.`;
    }
    
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_mc_error`,
      type: "multiple-choice",
      prompt: "Hata Avcısı: Hangi cümledeki zaman uyumu veya yardımcı fiil kullanımı doğrudur?",
      options: errorOptions,
      correctIndex: correctIdx,
      explanation: "Zaman uyumu kurallarına göre, zaman zarfları ve bağlaçların kullanım biçimleri doğru eşleştirilmelidir."
    });
    
    // Q6: fill-blank-dropdown
    const s6 = simpleSents[7];
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_fbd_2`,
      type: "fill-blank-dropdown",
      prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
      sentence: s6.blank,
      options: s6.options,
      correct: s6.options[0]
    });
    
    // Q7: Multiple Choice (Connector Magnet / Konnektör Mıknatısı)
    const s7 = simpleSents[8];
    const cleanS7 = s7.en.replace(/<[^>]+>/g, "");
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_mc_magnet`,
      type: "multiple-choice",
      prompt: `Konnektör Mıknatısı: "${s7.word}" kelimesinin bu cümledeki söz dizimsel işlevi nedir? <br><br>Cümle: <strong>${s7.en}</strong>`,
      options: [
        "Zaman zarfı veya zaman uyumu belirteci",
        "Cümle bağlacı (Connector)",
        "Edat (Preposition)"
      ],
      correctIndex: 0,
      enSentence: cleanS7,
      isEngToTr: true
    });
    
    // Q8: fill-blank (buttons)
    const s8 = simpleSents[9];
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_fb_2`,
      type: "fill-blank",
      prompt: "Boşluğu doldur",
      sentence: s8.blank,
      options: s8.options,
      correct: s8.options[0]
    });
    
    // Q9 & Q10: Keyboard translation (2 limit, placed at end)
    const s9 = simpleSents[0];
    const cleanS9 = s9.en.replace(/<[^>]+>/g, "");
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_tx_1`,
      type: "translation-text",
      prompt: `"${cleanS9}" ifadesini Türkçe'ye çevirin:`,
      enSentence: cleanS9,
      correctSentence: s9.tr,
      isEngToTr: true
    });
    
    const s10 = simpleSents[1];
    const cleanS10 = s10.en.replace(/<[^>]+>/g, "");
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_tx_2`,
      type: "translation-text",
      prompt: `"${cleanS10}" ifadesini Türkçe'ye çevirin:`,
      enSentence: cleanS10,
      correctSentence: s10.tr,
      isEngToTr: true
    });
  } 
  
  else if (exId === 2) {
    const complexSents = sortedSents.slice(10);
    
    // Q1: Word Bank
    const s1 = complexSents[0];
    const blocks1 = splitToBlocks(s1.en);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_1`,
      type: "word-bank",
      prompt: "Cümle bloklarını doğru sıraya koyarak İngilizce akademik cümleyi oluşturun:",
      translation: s1.tr,
      words: [...blocks1, "was", "will"].sort(() => Math.random() - 0.5),
      correctOrder: blocks1,
      enSentence: s1.en.replace(/<[^>]+>/g, ""),
      isEngToTr: false
    });
    
    // Q2: fill-blank-dropdown
    const s2 = complexSents[1];
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_fbd_1`,
      type: "fill-blank-dropdown",
      prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
      sentence: s2.blank,
      options: s2.options,
      correct: s2.options[0]
    });
    
    // Q3: Word Bank
    const s3 = complexSents[2];
    const blocks3 = splitToBlocks(s3.en);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_2`,
      type: "word-bank",
      prompt: "Cümle bloklarını doğru sıraya koyarak İngilizce akademik cümleyi oluşturun:",
      translation: s3.tr,
      words: [...blocks3, "had", "would"].sort(() => Math.random() - 0.5),
      correctOrder: blocks3,
      enSentence: s3.en.replace(/<[^>]+>/g, ""),
      isEngToTr: false
    });
    
    // Q4: fill-blank (buttons)
    const s4 = complexSents[3];
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_fb_1`,
      type: "fill-blank",
      prompt: "Boşluğu doldur",
      sentence: s4.blank,
      options: s4.options,
      correct: s4.options[0]
    });
    
    // Q5: Word Bank
    const s5 = complexSents[4];
    const blocks5 = splitToBlocks(s5.en);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_3`,
      type: "word-bank",
      prompt: "Cümle bloklarını doğru sıraya koyarak İngilizce akademik cümleyi oluşturun:",
      translation: s5.tr,
      words: [...blocks5, "is", "were"].sort(() => Math.random() - 0.5),
      correctOrder: blocks5,
      enSentence: s5.en.replace(/<[^>]+>/g, ""),
      isEngToTr: false
    });
    
    // Q6: fill-blank-dropdown
    const s6 = complexSents[5];
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_fbd_2`,
      type: "fill-blank-dropdown",
      prompt: "Boşluğa gelecek en uygun kelimeyi seçin:",
      sentence: s6.blank,
      options: s6.options,
      correct: s6.options[0]
    });
    
    // Q7: Word Bank
    const s7 = complexSents[6];
    const blocks7 = splitToBlocks(s7.en);
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_wb_4`,
      type: "word-bank",
      prompt: "Cümle bloklarını doğru sıraya koyarak İngilizce akademik cümleyi oluşturun:",
      translation: s7.tr,
      words: [...blocks7, "since", "until"].sort(() => Math.random() - 0.5),
      correctOrder: blocks7,
      enSentence: s7.en.replace(/<[^>]+>/g, ""),
      isEngToTr: false
    });
    
    // Q8: fill-blank (buttons)
    const s8 = complexSents[7];
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_fb_2`,
      type: "fill-blank",
      prompt: "Boşluğu doldur",
      sentence: s8.blank,
      options: s8.options,
      correct: s8.options[0]
    });
    
    // Q9 & Q10: Keyboard translation (2 limit, placed at end)
    const s9 = complexSents[8];
    const cleanS9 = s9.en.replace(/<[^>]+>/g, "");
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_tx_1`,
      type: "translation-text",
      prompt: `"${cleanS9}" ifadesini Türkçe'ye çevirin:`,
      enSentence: cleanS9,
      correctSentence: s9.tr,
      isEngToTr: true
    });
    
    const s10 = complexSents[9];
    const cleanS10 = s10.en.replace(/<[^>]+>/g, "");
    qList.push({
      id: `u${unitId}l${lessonId}_ex${exId}_tx_2`,
      type: "translation-text",
      prompt: `"${cleanS10}" ifadesini Türkçe'ye çevirin:`,
      enSentence: cleanS10,
      correctSentence: s10.tr,
      isEngToTr: true
    });
  }
  
  return qList;
}

// 4. Compile the full exercises object for unitSentencesMap[0]
const unit0Exercises = {
  1: {
    exercises: [
      {
        id: "u0l1ex1",
        title: "Alıştırma 1: Şimdiki Zaman & Süreç Zarfları I",
        description: "Temel akademik cümlelerde şimdi ve güncel süreç zarfları pratikleri.",
        questions: buildQuestions(L95_sents, 0, 95, 1)
      },
      {
        id: "u0l1ex2",
        title: "Alıştırma 2: Şimdiki Zaman & Süreç Zarfları II",
        description: "Gelişmiş akademik cümle yapılarında bağlaçlar ve kelime dizilimi.",
        questions: buildQuestions(L95_sents, 0, 95, 2)
      }
    ]
  },
  2: {
    exercises: [
      {
        id: "u0l2ex1",
        title: "Alıştırma 1: Di'li Geçmiş Zaman & Tarihsel Zarflar I",
        description: "Geçmişte tamamlanmış eylemler ve tarihsel zaman belirteçleri.",
        questions: buildQuestions(L96_sents, 0, 96, 1)
      },
      {
        id: "u0l2ex2",
        title: "Alıştırma 2: Di'li Geçmiş Zaman & Tarihsel Zarflar II",
        description: "Gelişmiş geçmiş zaman cümlelerinde yapısal analiz ve kelime dizilimi.",
        questions: buildQuestions(L96_sents, 0, 96, 2)
      }
    ]
  },
  3: {
    exercises: [
      {
        id: "u0l3ex1",
        title: "Alıştırma 1: Yakın Geçmiş Zaman & Süreç Bağlaçları I",
        description: "Geçmişten günümüze uzanan süreçler ve 'since/already' gibi zarfların kullanımı.",
        questions: buildQuestions(L97_sents, 0, 97, 1)
      },
      {
        id: "u0l3ex2",
        title: "Alıştırma 2: Yakın Geçmiş Zaman & Süreç Bağlaçları II",
        description: "Since bağlaçlı zaman uyumu kuralları ve akademik cümle tamamlama.",
        questions: buildQuestions(L97_sents, 0, 97, 2)
      }
    ]
  }
};

// 5. Update data.js content
const dataPath = '../data.js';
let dataContent = fs.readFileSync(dataPath, 'utf8');

// We need to replace the 0: { ... } block in unitSentencesMap
// Let's find the start and end of unitSentencesMap = {
const mapStartIndex = dataContent.indexOf('const unitSentencesMap = {');
if (mapStartIndex === -1) {
  console.error("Could not find const unitSentencesMap in data.js");
  process.exit(1);
}

// Find the opening bracket {
const openingBraceIndex = dataContent.indexOf('{', mapStartIndex);
// Find the first 0: key and replace until the next key 1:
const key0Index = dataContent.indexOf('0:', openingBraceIndex);
const key1Index = dataContent.indexOf('1:', openingBraceIndex);

if (key0Index === -1 || key1Index === -1) {
  console.error("Could not locate 0: or 1: key inside unitSentencesMap");
  process.exit(1);
}

// Format the unit0Exercises as a formatted JavaScript object string
const formattedObjStr = `0: ${JSON.stringify(unit0Exercises, null, 2)},\n  `;

const before = dataContent.substring(0, key0Index);
const after = dataContent.substring(key1Index);

const updatedContent = before + formattedObjStr + after;
fs.writeFileSync(dataPath, updatedContent);

console.log("Successfully generated and inserted DENEME exercises!");
