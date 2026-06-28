const fs = require('fs');

// Raw question definitions for Lesson 95 (Present Continuous) - 40 questions
const L95_raw = [
  // Exercise 1 (1-10)
  {
    type: "fill-blank",
    sentence: "At the moment, heavy rain is ___ the simulation site.",
    options: ["affecting", "affected", "affect", "affects"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "___, heavy rain is affecting the simulation site.",
    options: ["At the moment", "Yesterday", "Since 2020", "In 2012"]
  },
  {
    type: "fill-blank",
    sentence: "Right now, the central server is ___ user credentials.",
    options: ["validating", "validated", "validate", "validates"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "___, the central server is validating user credentials.",
    options: ["Right now", "Yesterday", "Since 2020", "Last week"]
  },
  {
    type: "fill-blank",
    sentence: "The academic team is currently ___ the new device.",
    options: ["testing", "tested", "test", "tests"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The academic team is ___ testing the new device.",
    options: ["currently", "yesterday", "since 2020", "yet"]
  },
  {
    type: "fill-blank",
    sentence: "The research facility currently ___ additional financial resources.",
    options: ["requires", "required", "requiring", "will require"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The research facility ___ requires additional financial resources.",
    options: ["currently", "yesterday", "since", "yet"]
  },
  {
    type: "fill-blank",
    sentence: "At the moment, the compiler is ___ the data blocks.",
    options: ["processing", "processed", "process", "processes"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "At the moment, the ___ is processing the data blocks.",
    options: ["compiler", "compilation", "compiled", "compile"]
  },

  // Exercise 2 (11-20)
  {
    type: "fill-blank",
    sentence: "The system is presently ___ a unique cryptographic key.",
    options: ["generating", "generated", "generate", "generates"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The system is ___ generating a unique cryptographic key.",
    options: ["presently", "ago", "last week", "since"]
  },
  {
    type: "fill-blank",
    sentence: "At present, the automatic system is ___ pressure parameters.",
    options: ["monitoring", "monitored", "monitor", "monitors"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "___, the automatic system is monitoring pressure parameters.",
    options: ["At present", "Yesterday", "Since 2020", "In 2012"]
  },
  {
    type: "fill-blank",
    sentence: "These days, public laboratories are ___ their security protocols.",
    options: ["adjusting", "adjusted", "adjust", "adjusts"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "___, public laboratories are adjusting their security protocols.",
    options: ["These days", "Yesterday", "Since 2020", "Next year"]
  },
  {
    type: "fill-blank",
    sentence: "These days, local institutions are ___ their internal laws.",
    options: ["altering", "altered", "alter", "alters"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "These days, local institutions ___ altering their internal laws.",
    options: ["are", "were", "have been", "will be"]
  },
  {
    type: "fill-blank",
    sentence: "Nowadays, software developers ___ gamified mobile design patterns.",
    options: ["prefer", "preferred", "preferring", "prefers"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "___, software developers prefer gamified mobile design patterns.",
    options: ["Nowadays", "Yesterday", "Since 2020", "Last year"]
  },

  // Exercise 3 (21-30)
  {
    type: "fill-blank",
    sentence: "The international research facility currently ___ additional financial resources to optimize its secondary structural frameworks.",
    options: ["requires", "required", "requiring", "will require"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "At the moment, the compiler is ___ the data blocks while the network firewall blocks external traffic.",
    options: ["processing", "processed", "process", "processes"]
  },
  {
    type: "fill-blank",
    sentence: "These days, public laboratories are ___ their security protocols because malicious malware attacks threaten sensitive files.",
    options: ["adjusting", "adjusted", "adjust", "adjusts"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The system is presently ___ a unique cryptographic key as soon as the administrator grants verification clearance.",
    options: ["generating", "generated", "generate", "generates"]
  },
  {
    type: "fill-blank",
    sentence: "Nowadays, software developers ___ gamified mobile design patterns in order that students might learn complex grammar easily.",
    options: ["prefer", "preferred", "preferring", "prefers"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "The international research facility ___ requires additional financial resources to optimize its ___ structural frameworks.",
    translation: "Uluslararası araştırma tesisi, ikincil yapısal çerçevelerini optimize etmek için şu anda ek finansal kaynaklar gerektiriyor.",
    corrects: ["currently", "secondary"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "At the moment, the compiler ___ the data blocks ___ the network firewall blocks external traffic.",
    translation: "Şu anda, ağ güvenlik duvarı harici trafiği engellerken derleyici veri bloklarını işliyor.",
    corrects: ["is processing", "while"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "These days, public laboratories ___ adjusting their security protocols because malicious malware attacks ___ sensitive files.",
    translation: "Bugünlerde, kötü amaçlı yazılım saldırıları hassas dosyaları tehdit ettiği için kamu laboratuvarları güvenlik protokollerini ayarlıyor.",
    corrects: ["are", "threaten"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "The system ___ presently generating a unique cryptographic key as soon as the administrator ___ verification clearance.",
    translation: "Sistem, yönetici doğrulama izni verir vermez şu anda benzersiz bir kriptografik anahtar üretiyor.",
    corrects: ["is", "grants"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Nowadays, software developers ___ gamified mobile design patterns in order that students ___ learn complex grammar easily.",
    translation: "Günümüzde yazılım geliştiriciler, öğrencilerin karmaşık dilbilgisini kolayca öğrenebilmesi için oyunlaştırılmış mobil tasarım desenlerini tercih ediyor.",
    corrects: ["prefer", "might"]
  },

  // Exercise 4 (31-40)
  {
    type: "fill-blank",
    sentence: "Right now, the central server is ___ user credentials on grounds that previous login requests were corrupted.",
    options: ["validating", "validated", "validate", "validates"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "At present, the automatic system is ___ pressure parameters lest the industrial mechanical piston should fail unexpectedly.",
    options: ["monitoring", "monitored", "monitor", "monitors"]
  },
  {
    type: "fill-blank",
    sentence: "These days, local institutions are ___ their internal laws inasmuch as regional environmental regulations have become stricter.",
    options: ["altering", "altered", "alter", "alters"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The academic team is currently ___ the new device just as the original mathematical physics formulas predicted.",
    options: ["testing", "tested", "test", "tests"]
  },
  {
    type: "fill-blank",
    sentence: "At the moment, heavy rain is ___ the simulation site; therefore, field operations are temporarily suspended.",
    options: ["affecting", "affected", "affect", "affects"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Right now, the central server ___ validating user credentials on grounds that previous login requests ___ corrupted.",
    translation: "Şu anda merkez sunucu, önceki giriş isteklerinin bozuk olması gerekçesiyle kullanıcı kimlik bilgilerini doğruluyor.",
    corrects: ["is", "were"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "At present, the automatic system is monitoring pressure parameters ___ the industrial mechanical piston ___ fail unexpectedly.",
    translation: "Şu anda otomatik sistem, endüstriyel mekanik pistonun beklenmedik şekilde arızalanmaması için basınç parametrelerini izliyor.",
    corrects: ["lest", "should"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "These days, local institutions ___ altering their internal laws inasmuch as regional environmental regulations ___ become stricter.",
    translation: "Bugünlerde, bölgesel çevre düzenlemelerinin daha katı hale gelmesi nedeniyle yerel kurumlar kendi iç yasalarını değiştiriyor.",
    corrects: ["are", "have"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "The academic team ___ currently testing the new device just as the original mathematical physics formulas ___ .",
    translation: "Akademik ekip, tam da orijinal matematiksel fizik formüllerinin öngördüğü gibi şu anda yeni cihazı test ediyor.",
    corrects: ["is", "predicted"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "At the moment, heavy rain ___ affecting the simulation site; therefore, field operations ___ temporarily suspended.",
    translation: "Şu anda şiddetli yağmur simülasyon alanını etkiliyor; bu nedenle, saha operasyonları geçici olarak durduruldu.",
    corrects: ["is", "are"]
  }
];

// Raw question definitions for Lesson 96 (Past Simple) - 40 questions
const L96_raw = [
  // Exercise 1 (1-10)
  {
    type: "fill-blank",
    sentence: "A heavy rain ___ the simulation site yesterday.",
    options: ["affected", "affecting", "affect", "affects"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "A heavy rain affected the simulation site ___ .",
    options: ["yesterday", "currently", "since", "yet"]
  },
  {
    type: "fill-blank",
    sentence: "Yesterday, the central server ___ all user credentials.",
    options: ["validated", "validating", "validate", "validates"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "___, the central server validated all user credentials.",
    options: ["Yesterday", "Right now", "Since 2020", "Lately"]
  },
  {
    type: "fill-blank",
    sentence: "The academic team ___ the new device test in 2020.",
    options: ["completed", "completing", "complete", "completes"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The academic team completed the new device test ___ 2020.",
    options: ["in", "at", "on", "since"]
  },
  {
    type: "fill-blank",
    sentence: "The research facility successfully ___ the database yesterday.",
    options: ["upgraded", "upgrades", "upgrading", "will upgrade"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The research facility successfully upgraded the database ___ .",
    options: ["yesterday", "now", "since then", "yet"]
  },
  {
    type: "fill-blank",
    sentence: "Two years ago, the compiler ___ the data blocks without errors.",
    options: ["processed", "processing", "process", "processes"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Two years ___, the compiler processed the data blocks without errors.",
    options: ["ago", "since", "lately", "now"]
  },

  // Exercise 2 (11-20)
  {
    type: "fill-blank",
    sentence: "The system ___ a unique cryptographic key last week.",
    options: ["generated", "generating", "generate", "generates"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The system generated a unique cryptographic key ___ week.",
    options: ["last", "next", "this", "ago"]
  },
  {
    type: "fill-blank",
    sentence: "The automatic system ___ pressure parameters three hours ago.",
    options: ["monitored", "monitoring", "monitor", "monitors"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The automatic system monitored pressure parameters three hours ___ .",
    options: ["ago", "since", "lately", "before"]
  },
  {
    type: "fill-blank",
    sentence: "Last month, public laboratories ___ their security protocols.",
    options: ["adjusted", "adjusting", "adjust", "adjusts"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "___ month, public laboratories adjusted their security protocols.",
    options: ["Last", "Next", "This", "Since"]
  },
  {
    type: "fill-blank",
    sentence: "Last year, local institutions ___ their internal laws.",
    options: ["altered", "altering", "alter", "alters"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Last year, local institutions ___ altering their internal laws.",
    options: ["completed", "were", "have been", "are"]
  },
  {
    type: "fill-blank",
    sentence: "In 2012, software developers ___ traditional mobile design patterns.",
    options: ["preferred", "preferring", "prefer", "prefers"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "___ 2012, software developers preferred traditional mobile design patterns.",
    options: ["In", "At", "On", "Since"]
  },

  // Exercise 3 (21-30)
  {
    type: "fill-blank",
    sentence: "The international research facility successfully ___ the database yesterday to optimize its secondary structural frameworks.",
    options: ["upgraded", "upgrading", "upgrade", "upgrades"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Two years ago, the compiler ___ the data blocks while the network firewall blocked external traffic.",
    options: ["processed", "processing", "process", "processes"]
  },
  {
    type: "fill-blank",
    sentence: "Last month, public laboratories ___ their security protocols because malicious malware attacks threatened sensitive files.",
    options: ["adjusted", "adjusting", "adjust", "adjusts"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The system ___ a unique cryptographic key as soon as the administrator granted verification clearance last week.",
    options: ["generated", "generating", "generate", "generates"]
  },
  {
    type: "fill-blank",
    sentence: "In 2012, software developers ___ traditional mobile design patterns in order that students might learn basic grammar easily.",
    options: ["preferred", "preferring", "prefer", "prefers"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "The international research facility successfully ___ the database yesterday to optimize its ___ structural frameworks.",
    translation: "Uluslararası araştırma tesisi, ikincil yapısal çerçevelerini optimize etmek için dün veri tabanını başarıyla yükseltti.",
    corrects: ["upgraded", "secondary"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Two years ago, the compiler ___ the data blocks while the network firewall ___ external traffic.",
    translation: "İki yıl önce, ağ güvenlik duvarı harici trafiği engellerken derleyici veri bloklarını işledi.",
    corrects: ["processed", "blocked"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Last month, public laboratories ___ adjusting their security protocols because malicious malware attacks ___ sensitive files.",
    translation: "Geçen ay, kötü amaçlı yazılım saldırıları hassas dosyaları tehdit ettiği için kamu laboratuvarları güvenlik protokollerini ayarladı.",
    corrects: ["adjusted", "threatened"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "The system ___ a unique cryptographic key as soon as the administrator ___ verification clearance last week.",
    translation: "Sistem, yönetici geçen hafta doğrulama izni verir vermez benzersiz bir kriptografik anahtar üretti.",
    corrects: ["generated", "granted"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "In 2012, software developers ___ traditional mobile design patterns in order that students ___ learn basic grammar easily.",
    translation: "2012'de yazılım geliştiriciler, öğrencilerin temel dilbilgisini kolayca öğrenebilmesi için geleneksel mobil tasarım desenlerini tercih etti.",
    corrects: ["preferred", "might"]
  },

  // Exercise 4 (31-40)
  {
    type: "fill-blank",
    sentence: "Yesterday, the central server ___ all user credentials on grounds that previous login requests were corrupted.",
    options: ["validated", "validating", "validate", "validates"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The automatic system ___ pressure parameters three hours ago lest the industrial mechanical piston should fail unexpectedly.",
    options: ["monitored", "monitoring", "monitor", "monitors"]
  },
  {
    type: "fill-blank",
    sentence: "Last year, local institutions ___ their internal laws inasmuch as regional environmental regulations became stricter.",
    options: ["altered", "altering", "alter", "alters"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The academic team ___ the new device test in 2020 just as the original mathematical physics formulas predicted.",
    options: ["completed", "completing", "complete", "completes"]
  },
  {
    type: "fill-blank",
    sentence: "Yesterday, a heavy rain ___ the simulation site; therefore, field operations were temporarily suspended.",
    options: ["affected", "affecting", "affect", "affects"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Yesterday, the central server ___ all user credentials on grounds that previous login requests ___ corrupted.",
    translation: "Dün merkez sunucu, önceki giriş isteklerinin bozuk olması gerekçesiyle tüm kullanıcı kimlik bilgilerini doğruladı.",
    corrects: ["validated", "were"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "The automatic system monitored pressure parameters three hours ___ lest the industrial mechanical piston ___ fail unexpectedly.",
    translation: "Otomatik sistem, endüstriyel mekanik pistonun beklenmedik şekilde arızalanmaması için üç saat önce basınç parametrelerini izledi.",
    corrects: ["ago", "should"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Last year, local institutions ___ their internal laws inasmuch as regional environmental regulations ___ stricter.",
    translation: "Geçen yıl, bölgesel çevre düzenlemelerinin daha katı hale gelmesi nedeniyle yerel kurumlar iç yasalarını değiştirdi.",
    corrects: ["altered", "became"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "The academic team ___ the new device test in 2020 just as the original mathematical physics formulas ___ .",
    translation: "Akademik ekip, tam da orijinal matematiksel fizik formüllerinin öngördüğü gibi yeni cihaz testini 2020'de tamamladı.",
    corrects: ["completed", "predicted"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Yesterday, a heavy rain ___ the simulation site; therefore, field operations ___ temporarily suspended.",
    translation: "Dün, şiddetli bir yağmur simülasyon alanını etkiledi; bu nedenle, saha operasyonları geçici olarak durduruldu.",
    corrects: ["affected", "were"]
  }
];

// Raw question definitions for Lesson 97 (Present Perfect) - 40 questions
const L97_raw = [
  // Exercise 1 (1-10)
  {
    type: "fill-blank",
    sentence: "Up to now, heavy rain ___ the simulation site.",
    options: ["has affected", "affected", "affecting", "affects"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "___ now, heavy rain has affected the simulation site.",
    options: ["Up to", "Since", "By", "At"]
  },
  {
    type: "fill-blank",
    sentence: "The central server ___ user credentials.",
    options: ["has just validated", "just validated", "validating", "validates"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The central server has ___ validated the user credentials.",
    options: ["just", "yet", "ago", "currently"]
  },
  {
    type: "fill-blank",
    sentence: "Since 2020, the academic team ___ the new device.",
    options: ["has tested", "tested", "testing", "tests"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "___ 2020, the academic team has tested the new device.",
    options: ["Since", "For", "In", "Lately"]
  },
  {
    type: "fill-blank",
    sentence: "The research facility ___ required additional financial resources.",
    options: ["has recently", "recently", "currently", "yesterday"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The research facility has recently ___ additional financial resources.",
    options: ["required", "requiring", "requires", "will require"]
  },
  {
    type: "fill-blank",
    sentence: "Up to now, the compiler ___ all the data blocks.",
    options: ["has processed", "processed", "processing", "processes"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Up to now, the compiler has ___ all the data blocks.",
    options: ["processed", "processing", "process", "processes"]
  },

  // Exercise 2 (11-20)
  {
    type: "fill-blank",
    sentence: "The system ___ already generated a unique cryptographic key.",
    options: ["has", "have", "had", "is"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The system has ___ generated a unique cryptographic key.",
    options: ["already", "yet", "ago", "currently"]
  },
  {
    type: "fill-blank",
    sentence: "Since the team started the project, the automatic system ___ pressure parameters.",
    options: ["has monitored", "monitored", "monitoring", "monitors"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Since the team ___ the project, the automatic system has monitored pressure parameters.",
    options: ["started", "has started", "starts", "starting"]
  },
  {
    type: "fill-blank",
    sentence: "Lately, public laboratories ___ adjusted their security protocols.",
    options: ["have", "has", "had", "are"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Lately, public laboratories ___ their security protocols.",
    options: ["have adjusted", "adjusted", "adjusting", "adjusts"]
  },
  {
    type: "fill-blank",
    sentence: "Lately, local institutions ___ altered their internal laws.",
    options: ["have", "has", "had", "are"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Lately, local institutions ___ their internal laws.",
    options: ["have altered", "altered", "altering", "alters"]
  },
  {
    type: "fill-blank",
    sentence: "So far, software developers ___ gamified mobile design patterns.",
    options: ["have preferred", "preferred", "preferring", "prefers"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "___ far, software developers have preferred gamified mobile design patterns.",
    options: ["So", "As", "By", "Too"]
  },

  // Exercise 3 (21-30)
  {
    type: "fill-blank",
    sentence: "The international research facility ___ additional financial resources to optimize its secondary structural frameworks.",
    options: ["has recently required", "required", "requiring", "requires"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Up to now, the compiler has processed the data blocks while the network firewall ___ external traffic.",
    options: ["has blocked", "blocks", "blocking", "will block"]
  },
  {
    type: "fill-blank",
    sentence: "Lately, public laboratories have adjusted their security protocols because malicious malware attacks ___ sensitive files.",
    options: ["have threatened", "threaten", "threatening", "threatens"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The system has already generated a unique cryptographic key since the administrator ___ verification clearance.",
    options: ["granted", "grants", "granting", "will grant"]
  },
  {
    type: "fill-blank",
    sentence: "So far, software developers have preferred gamified mobile design patterns in order that students ___ learn complex grammar easily.",
    options: ["might", "may", "will", "can"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "The international research facility ___ recently ___ additional financial resources to optimize its secondary structural frameworks.",
    translation: "Uluslararası araştırma tesisi, ikincil yapısal çerçevelerini optimize etmek için son zamanlarda ek finansal kaynaklara ihtiyaç duydu.",
    corrects: ["has", "required"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Up to now, the compiler ___ processed the data blocks while the network firewall ___ blocked external traffic.",
    translation: "Şu ana kadar, ağ güvenlik duvarı harici trafiği engellerken derleyici veri bloklarını işledi.",
    corrects: ["has", "has"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Lately, public laboratories ___ adjusted their security protocols because malicious malware attacks ___ threatened sensitive files.",
    translation: "Son zamanlarda, kötü amaçlı yazılım saldırıları hassas dosyaları tehdit ettiği için kamu laboratuvarları güvenlik protokollerini ayarladı.",
    corrects: ["have", "have"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "The system ___ already generated a unique cryptographic key since the administrator ___ verification clearance.",
    translation: "Sistem, yönetici doğrulama izni verdiğinden beri benzersiz bir kriptografik anahtar üretti.",
    corrects: ["has", "granted"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "So far, software developers ___ preferred gamified mobile design patterns in order that students ___ learn complex grammar easily.",
    translation: "Şu ana kadar yazılım geliştiriciler, öğrencilerin karmaşık dilbilgisini kolayca öğrenebilmesi için oyunlaştırılmış mobil tasarım desenlerini tercih etti.",
    corrects: ["have", "might"]
  },

  // Exercise 4 (31-40)
  {
    type: "fill-blank",
    sentence: "The central server has just validated user credentials on grounds that previous login requests ___ corrupted.",
    options: ["have been", "were", "are", "will be"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Since the experiment began, the automatic system has monitored pressure parameters lest the industrial mechanical piston ___ fail unexpectedly.",
    options: ["should", "would", "will", "shall"]
  },
  {
    type: "fill-blank",
    sentence: "Lately, local institutions have altered their internal laws inasmuch as regional environmental regulations ___ become stricter.",
    options: ["have", "has", "had", "are"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Since 2020, the academic team has tested the new device just as the original mathematical physics formulas ___ .",
    options: ["predicted", "predicting", "predicts", "will predict"]
  },
  {
    type: "fill-blank",
    sentence: "Up to now, heavy rain has affected the simulation site; therefore, field operations ___ temporarily suspended.",
    options: ["have been", "were", "are", "will be"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "The central server ___ just validated user credentials on grounds that previous login requests ___ corrupted.",
    translation: "Merkez sunucu, önceki giriş isteklerinin bozuk olması gerekçesiyle kullanıcı kimlik bilgilerini henüz doğruladı.",
    corrects: ["has", "have been"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Since the experiment ___ , the automatic system ___ monitored pressure parameters lest the industrial mechanical piston should fail unexpectedly.",
    translation: "Deney başladığından beri otomatik sistem, endüstriyel mekanik pistonun beklenmedik şekilde arızalanmaması için basınç parametrelerini izledi.",
    corrects: ["began", "has"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Lately, local institutions ___ altered their internal laws inasmuch as regional environmental regulations ___ become stricter.",
    translation: "Son zamanlarda, bölgesel çevre düzenlemelerinin daha katı hale gelmesi nedeniyle yerel kurumlar iç yasalarını değiştirdi.",
    corrects: ["have", "have"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Since 2020, the academic team ___ tested the new device just as the original mathematical physics formulas ___ .",
    translation: "2020'den beri akademik ekip, tam da orijinal matematiksel fizik formüllerinin öngördüğü gibi yeni cihazı test etti.",
    corrects: ["has", "predicted"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Up to now, heavy rain ___ affected the simulation site; therefore, field operations ___ temporarily suspended.",
    translation: "Şu ana kadar, şiddetli yağmur simülasyon alanını etkiledi; bu nedenle, saha operasyonları geçici olarak durduruldu.",
    corrects: ["has", "have been"]
  }
];

function buildExercises(rawList, lessonId) {
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
  
  const processQuestion = (rawQ, qId) => {
    if (rawQ.type === "multiple-fill-blank") {
      return {
        id: qId,
        type: "multiple-fill-blank",
        prompt: "Aşağıdaki cümledeki boşlukları doldurun!",
        sentence: rawQ.sentence,
        translation: rawQ.translation,
        corrects: rawQ.corrects
      };
    } else {
      const correctOption = rawQ.options[0];
      const shuffledOptions = shuffle(rawQ.options);
      return {
        id: qId,
        type: rawQ.type,
        prompt: rawQ.type === "fill-blank" ? "Boşluğu doldur" : "Boşluğa gelecek en uygun kelimeyi seçin:",
        sentence: rawQ.sentence,
        options: shuffledOptions,
        correctIndex: shuffledOptions.indexOf(correctOption)
      };
    }
  };

  const getExerciseQuestions = (rawSubList, lessonId, exId) => {
    const mcQs = rawSubList.filter(q => q.type !== "multiple-fill-blank");
    const fbQs = rawSubList.filter(q => q.type === "multiple-fill-blank");
    const sorted = [...mcQs, ...fbQs];
    return sorted.map((q, idx) => processQuestion(q, `u0l${lessonId}_ex${exId}_q${idx + 1}`));
  };

  return [
    {
      id: `u0l${lessonId}ex1`,
      title: lessonId === 95 ? "Alıştırma 1: Şimdiki Zaman & Süreç Zarfları I" :
             lessonId === 96 ? "Alıştırma 1: Di'li Geçmiş Zaman & Tarihsel Zarflar I" :
                               "Alıştırma 1: Yakın Geçmiş Zaman & Süreç Bağlaçları I",
      description: "Boşluk doldurma ve zaman zarfları pratikleri.",
      questions: getExerciseQuestions(rawList.slice(0, 10), lessonId, 1)
    },
    {
      id: `u0l${lessonId}ex2`,
      title: lessonId === 95 ? "Alıştırma 2: Şimdiki Zaman & Süreç Zarfları II" :
             lessonId === 96 ? "Alıştırma 2: Di'li Geçmiş Zaman & Tarihsel Zarflar II" :
                               "Alıştırma 2: Yakın Geçmiş Zaman & Süreç Bağlaçları II",
      description: "Basit ve yaygın akademik cümle yapılarıyla zaman zarfı pratikleri.",
      questions: getExerciseQuestions(rawList.slice(10, 20), lessonId, 2)
    },
    {
      id: `u0l${lessonId}ex3`,
      title: lessonId === 95 ? "Alıştırma 3: Şimdiki Zaman & Süreç Zarfları III" :
             lessonId === 96 ? "Alıştırma 3: Di'li Geçmiş Zaman & Tarihsel Zarflar III" :
                               "Alıştırma 3: Yakın Geçmiş Zaman & Süreç Bağlaçları III",
      description: "Gelişmiş akademik yapılarda zaman bağlaçları ve kelime doldurma.",
      questions: getExerciseQuestions(rawList.slice(20, 30), lessonId, 3)
    },
    {
      id: `u0l${lessonId}ex4`,
      title: lessonId === 95 ? "Alıştırma 4: Şimdiki Zaman & Süreç Zarfları IV" :
             lessonId === 96 ? "Alıştırma 4: Di'li Geçmiş Zaman & Tarihsel Zarflar IV" :
                               "Alıştırma 4: Yakın Geçmiş Zaman & Süreç Bağlaçları IV",
      description: "Bileşik akademik cümlelerde zaman uyumu ve çoklu boşluk doldurma pratikleri.",
      questions: getExerciseQuestions(rawList.slice(30, 40), lessonId, 4)
    }
  ];
}

const unit0Exercises = {
  1: { exercises: buildExercises(L95_raw, 95) },
  2: { exercises: buildExercises(L96_raw, 96) },
  3: { exercises: buildExercises(L97_raw, 97) }
};

const dataPath = '../data.js';
let content = fs.readFileSync(dataPath, 'utf8');

// 1. Add DENEME to rawTopics
const lastTopicMarker = `  {
    title: "XXV. Neden ve Etki Strüktürleri (Sayfa 256)",
    desc: "Cümleler arası neden-sonuç bağlaçları (therefore, thus, consequently, hence) kullanımı",
    icon: "🪐",
    numLessons: 1,
    formulas: [
      { formula: "Clause; therefore / thus / consequently / hence, Clause", example: "The cost was very high, therefore they changed the design: Maliyet çok yüksekti, bu nedenle tasarımı değiştirdiler" }
    ],
    subtitles: [
      "Neden ve Etki Strüktürleri (Sayfa 256)"
    ]
  }
];`;

const newTopicContent = `  {
    title: "XXV. Neden ve Etki Strüktürleri (Sayfa 256)",
    desc: "Cümleler arası neden-sonuç bağlaçları (therefore, thus, consequently, hence) kullanımı",
    icon: "🪐",
    numLessons: 1,
    formulas: [
      { formula: "Clause; therefore / thus / consequently / hence, Clause", example: "The cost was very high, therefore they changed the design: Maliyet çok yüksekti, bu nedenle tasarımı değiştirdiler" }
    ],
    subtitles: [
      "Neden ve Etki Strüktürleri (Sayfa 256)"
    ]
  },
  {
    id: 0,
    title: "DENEME",
    desc: "Time-Link: Connectors & Tenses",
    icon: "🧪",
    numLessons: 3,
    formulas: [
      { formula: "Subject + am/is/are + V-ing", example: "At the moment, the compiler is processing the data blocks: Şu anda, derleyici veri bloklarını işliyor.", description: "Şimdiki zamanı ve güncel bilimsel/akademik süreçleri bildiren zaman zarfları." },
      { formula: "Subject + V2", example: "Yesterday, the central server <span style=\\"color: #ff6b6b; font-weight: bold;\\">validated</span> all user credentials: Dün merkez sunucu tüm kullanıcı kimlik bilgilerini doğruladı.", description: "Geçmişte belirli bir zamanda gerçekleşmiş ve tamamlanmış eylemler. Past Simple (V2) eylemleri kırmızı renkle kodlanmıştır." },
      { formula: "Subject + has/have + V3", example: "Since the team <span style=\\"color: #ff6b6b; font-weight: bold;\\">started</span> the project, the automatic system <span style=\\"color: #51cf66; font-weight: bold;\\">has monitored</span> pressure parameters: Ekip projeye başladığından beri, otomatik sistem basınç parametrelerini izledi.", description: "Geçmişte başlayıp etkisi günümüze uzanan süreçler. Present Perfect (Have V3) eylemleri yeşil, Past Simple (V2) eylemleri kırmızı renkle kodlanmıştır." }
    ],
    subtitles: [
      "Present Continuous (is Ving) - Zaman Zarfları",
      "Past Simple (v2) - Zaman Zarfları",
      "Present Perfect (have V3) - Zaman Zarfları"
    ]
  }
];`;

content = content.replace(lastTopicMarker, newTopicContent);

// 2. Modify loader loop
content = content.replace('const unitId = uIdx + 1;', 'const unitId = topic.id !== undefined ? topic.id : (uIdx + 1);');

// 3. Insert 0: into unitSentencesMap
const mapHeader = 'const unitSentencesMap = {';
const mapHeaderReplacement = 'const unitSentencesMap = {\n  0: ' + JSON.stringify(unit0Exercises, null, 2) + ',';
content = content.replace(mapHeader, mapHeaderReplacement);

fs.writeFileSync(dataPath, content);
console.log("Single-pass update of data.js successful!");
