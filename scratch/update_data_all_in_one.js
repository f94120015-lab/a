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
    translation: "Şu anda, ağ güvenlik duvarı harici trafiği engellerken derleyici veri bloklarını işledi.",
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
    translation: "Sistem, yönetici doğrulama izni verir vermez şu anda benzersiz bir kriptografik anahtar üretti.",
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
    sentence: "A heavy rain ___ the simulation site <span style=\"color: #ff6b6b; font-weight: bold;\">yesterday</span>.",
    options: ["affected", "affecting", "affect", "affects"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "A heavy rain <span style=\"color: #ff6b6b; font-weight: bold;\">affected</span> the simulation site ___ .",
    options: ["yesterday", "currently", "since", "yet"]
  },
  {
    type: "fill-blank",
    sentence: "<span style=\"color: #ff6b6b; font-weight: bold;\">Yesterday</span>, the central server ___ all user credentials.",
    options: ["validated", "validating", "validate", "validates"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "___, the central server <span style=\"color: #ff6b6b; font-weight: bold;\">validated</span> all user credentials.",
    options: ["Yesterday", "Right now", "Since 2020", "Lately"]
  },
  {
    type: "fill-blank",
    sentence: "The academic team ___ the new device test <span style=\"color: #ff6b6b; font-weight: bold;\">in 2020</span>.",
    options: ["completed", "completing", "complete", "completes"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The academic team <span style=\"color: #ff6b6b; font-weight: bold;\">completed</span> the new device test ___ 2020.",
    options: ["in", "at", "on", "since"]
  },
  {
    type: "fill-blank",
    sentence: "The research facility successfully ___ the database <span style=\"color: #ff6b6b; font-weight: bold;\">yesterday</span>.",
    options: ["upgraded", "upgrades", "upgrading", "will upgrade"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The research facility successfully <span style=\"color: #ff6b6b; font-weight: bold;\">upgraded</span> the database ___ .",
    options: ["yesterday", "now", "since then", "yet"]
  },
  {
    type: "fill-blank",
    sentence: "<span style=\"color: #ff6b6b; font-weight: bold;\">Two years ago</span>, the compiler ___ the data blocks without errors.",
    options: ["processed", "processing", "process", "processes"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Two years ___, the compiler <span style=\"color: #ff6b6b; font-weight: bold;\">processed</span> the data blocks without errors.",
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
    options: ["affected", "affecting", "affected", "affects"]
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

// Raw question definitions for Lesson 98 ("Since" Zaman Uyumu Kalıpları) - 40 questions
const L98_raw = [
  // Exercise 1 (1-10)
  {
    type: "fill-blank",
    sentence: "The company ___ since the new law <span style=\"color: #ff6b6b; font-weight: bold;\">was passed</span>.",
    options: ["has expanded", "expanded", "expands", "is expanding"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The company <span style=\"color: #51cf66; font-weight: bold;\">has expanded</span> ___ the new law <span style=\"color: #ff6b6b; font-weight: bold;\">was passed</span>.",
    options: ["since", "for", "when", "while"]
  },
  {
    type: "fill-blank",
    sentence: "Plants ___ significantly since they <span style=\"color: #ff6b6b; font-weight: bold;\">were planted</span>.",
    options: ["have grown", "grew", "grow", "are growing"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Plants <span style=\"color: #51cf66; font-weight: bold;\">have grown</span> significantly ___ they <span style=\"color: #ff6b6b; font-weight: bold;\">were planted</span>.",
    options: ["since", "during", "until", "before"]
  },
  {
    type: "fill-blank",
    sentence: "Children ___ grammar since they <span style=\"color: #ff6b6b; font-weight: bold;\">started</span> school.",
    options: ["have learned", "learned", "learn", "are learning"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Children <span style=\"color: #51cf66; font-weight: bold;\">have learned</span> grammar ___ they <span style=\"color: #ff6b6b; font-weight: bold;\">started</span> school.",
    options: ["since", "for", "when", "as"]
  },
  {
    type: "fill-blank",
    sentence: "The board ___ meetings since the president <span style=\"color: #ff6b6b; font-weight: bold;\">was elected</span>.",
    options: ["has not held", "did not hold", "does not hold", "is not holding"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The board <span style=\"color: #51cf66; font-weight: bold;\">has not held</span> meetings ___ the president <span style=\"color: #ff6b6b; font-weight: bold;\">was elected</span>.",
    options: ["since", "while", "until", "although"]
  },
  {
    type: "fill-blank",
    sentence: "The layout ___ since it <span style=\"color: #ff6b6b; font-weight: bold;\">was designed</span>.",
    options: ["has not changed", "did not change", "does not change", "is not changing"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The layout <span style=\"color: #51cf66; font-weight: bold;\">has not changed</span> ___ it <span style=\"color: #ff6b6b; font-weight: bold;\">was designed</span>.",
    options: ["since", "for", "when", "because"]
  },

  // Exercise 2 (11-20)
  {
    type: "fill-blank",
    sentence: "Work <span style=\"color: #51cf66; font-weight: bold;\">has been facilitated</span> since equipment ___ .",
    options: ["was installed", "is installed", "has installed", "installs"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Work ___ since equipment <span style=\"color: #ff6b6b; font-weight: bold;\">was installed</span>.",
    options: ["has been facilitated", "was facilitated", "is facilitated", "facilitates"]
  },
  {
    type: "fill-blank",
    sentence: "Users <span style=\"color: #51cf66; font-weight: bold;\">have experienced</span> errors since the server ___ .",
    options: ["crashed", "has crashed", "crashes", "is crashing"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Users ___ errors since the server <span style=\"color: #ff6b6b; font-weight: bold;\">crashed</span>.",
    options: ["have experienced", "experienced", "experience", "are experiencing"]
  },
  {
    type: "fill-blank",
    sentence: "Automation <span style=\"color: #51cf66; font-weight: bold;\">has increased</span> since the tech firm ___ .",
    options: ["opened", "has opened", "opens", "is opening"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Automation ___ since the tech firm <span style=\"color: #ff6b6b; font-weight: bold;\">opened</span>.",
    options: ["has increased", "increased", "increases", "is increasing"]
  },
  {
    type: "fill-blank",
    sentence: "Temperatures <span style=\"color: #51cf66; font-weight: bold;\">have fluctuated</span> since winter ___ .",
    options: ["began", "has begun", "begins", "is beginning"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Temperatures ___ since winter <span style=\"color: #ff6b6b; font-weight: bold;\">began</span>.",
    options: ["have fluctuated", "fluctuated", "fluctuate", "are fluctuating"]
  },
  {
    type: "fill-blank",
    sentence: "Profits <span style=\"color: #51cf66; font-weight: bold;\">have dropped</span> since the financial market ___ .",
    options: ["declined", "has declined", "declines", "is declining"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Profits ___ since the financial market <span style=\"color: #ff6b6b; font-weight: bold;\">declined</span>.",
    options: ["have dropped", "dropped", "drop", "are dropping"]
  },

  // Exercise 3 (21-30)
  {
    type: "fill-blank",
    sentence: "The company ___ its digital trade operations since the new law <span style=\"color: #ff6b6b; font-weight: bold;\">was passed</span> by the legislative assembly.",
    options: ["has expanded", "expanded", "expands", "is expanding"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Plants <span style=\"color: #51cf66; font-weight: bold;\">have grown</span> significantly since they ___ in the highly controlled laboratory greenhouse environment.",
    options: ["were planted", "are planted", "have been planted", "plant"]
  },
  {
    type: "fill-blank",
    sentence: "Children ___ grammar rules faster since they <span style=\"color: #ff6b6b; font-weight: bold;\">started</span> utilizing mobile applications with gamified designs.",
    options: ["have learned", "learned", "learn", "are learning"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "The board ___ meetings since the president <span style=\"color: #ff6b6b; font-weight: bold;\">was elected</span> because internal administrative conflicts remain unresolved.",
    options: ["has not held", "did not hold", "does not hold", "is not holding"]
  },
  {
    type: "fill-blank",
    sentence: "The layout <span style=\"color: #51cf66; font-weight: bold;\">has not changed</span> since it ___ although several frontend developers requested visual interface updates.",
    options: ["was designed", "is designed", "has designed", "designs"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "The company ___ expanded its digital trade operations since the new law ___ passed by the legislative assembly.",
    translation: "Yasama meclisi tarafından yeni yasa kabul edildiğinden beri şirket dijital ticaret operasyonlarını genişletti.",
    corrects: ["has", "was"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Plants ___ grown significantly since they ___ planted in the highly controlled laboratory greenhouse environment.",
    translation: "Bitkiler, son derece kontrollü laboratuvar sera ortamına dikildiklerinden beri önemli ölçüde büyüdüler.",
    corrects: ["have", "were"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Children ___ learned grammar rules faster since they ___ utilizing mobile applications with gamified designs.",
    translation: "Çocuklar, oyunlaştırılmış tasarımlara sahip mobil uygulamaları kullanmaya başladıklarından beri dilbilgisi kurallarını daha hızlı öğrendiler.",
    corrects: ["have", "started"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "The board ___ not held meetings since the president ___ elected because internal administrative conflicts remain unresolved.",
    translation: "İç yönetimsel çatışmalar çözülmeden kaldığı için, başkan seçildiğinden beri yönetim kurulu toplantı yapmadı.",
    corrects: ["has", "was"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "The layout ___ not changed since it ___ designed although several frontend developers requested visual interface updates.",
    translation: "Birkaç ön uç geliştirici görsel arayüz güncellemeleri talep etmesine rağmen, tasarım yapıldığından beri düzen değişmedi.",
    corrects: ["has", "was"]
  },

  // Exercise 4 (31-40)
  {
    type: "fill-blank",
    sentence: "Work <span style=\"color: #51cf66; font-weight: bold;\">has been facilitated</span> greatly since electronic equipment ___ by the technical infrastructure branch.",
    options: ["was installed", "is installed", "has installed", "installs"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Users ___ errors since the server <span style=\"color: #ff6b6b; font-weight: bold;\">crashed</span>, causing temporary suspension of data token generations.",
    options: ["have experienced", "experienced", "experience", "are experiencing"]
  },
  {
    type: "fill-blank",
    sentence: "Automation ___ rapidly since the tech firm <span style=\"color: #ff6b6b; font-weight: bold;\">opened</span>, reducing corporate expenditure on manual operations.",
    options: ["has increased", "increased", "increases", "is increasing"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "Temperatures <span style=\"color: #51cf66; font-weight: bold;\">have fluctuated</span> since winter ___ , affecting the ongoing chemical simulation models inside the chamber.",
    options: ["began", "has begun", "begins", "is beginning"]
  },
  {
    type: "fill-blank",
    sentence: "Profits ___ dropped since the financial market <span style=\"color: #ff6b6b; font-weight: bold;\">declined</span> due to unexpected international trade restrictions.",
    options: ["have", "has", "had", "are"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Work ___ been facilitated greatly since electronic equipment ___ installed by the technical infrastructure branch.",
    translation: "Teknik altyapı şubesi tarafından elektronik ekipman kurulduğundan beri işler büyük ölçüde kolaylaştı.",
    corrects: ["has", "was"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Users ___ experienced errors since the server ___ , causing temporary suspension of data token generations.",
    translation: "Sunucu çöktüğünden beri, veri jetonu üretimlerinin geçici olarak askıya alınmasına neden olan hatalar kullanıcılar tarafından yaşandı.",
    corrects: ["have", "crashed"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Automation ___ increased rapidly since the tech firm ___ , reducing corporate expenditure on manual operations.",
    translation: "Teknoloji firması açıldığından beri otomasyon hızla arttı ve manuel operasyonlardaki kurumsal harcamaları azalttı.",
    corrects: ["has", "opened"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Temperatures ___ fluctuated since winter ___ , affecting the ongoing chemical simulation models inside the chamber.",
    translation: "Kış başladığından beri sıcaklıklar dalgalandı ve oda içindeki devam eden kimyasal simülasyon modellerini etkiledi.",
    corrects: ["have", "began"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "Profits ___ dropped since the financial market ___ due to unexpected international trade restrictions.",
    translation: "Beklenmedik uluslararası ticaret kısıtlamaları nedeniyle finansal piyasa gerilediğinden beri karlar düştü.",
    corrects: ["have", "declined"]
  }
];

// Raw question definitions for Lesson 99 ("By the time" Zaman Uyumu Kalıpları) - 40 questions
const L99_raw = [
  // Exercise 1 (1-10)
  {
    type: "fill-blank",
    sentence: "By the time we <span style=\"color: #ff6b6b; font-weight: bold;\">arrived</span>, most people ___ .",
    options: ["had left", "will have left", "left", "have left"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "By the time we ___ home, children <span style=\"color: #20c997; font-weight: bold;\">will have gone</span> to bed.",
    options: ["arrive", "arrived", "will arrive", "had arrived"]
  },
  {
    type: "fill-blank",
    sentence: "By the time engineers <span style=\"color: #ff6b6b; font-weight: bold;\">found</span> the bug, malware ___ .",
    options: ["had spread", "will have spread", "spreads", "has spread"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "By the time the compiler ___ , the server <span style=\"color: #20c997; font-weight: bold;\">will have saved</span> it.",
    options: ["finishes", "finished", "will finish", "had finished"]
  },
  {
    type: "fill-blank",
    sentence: "By the time the storm <span style=\"color: #ff6b6b; font-weight: bold;\">cleared</span>, the bridge ___ .",
    options: ["had collapsed", "will have collapsed", "collapses", "has collapsed"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "By the time the law ___ , firms <span style=\"color: #20c997; font-weight: bold;\">will have adjusted</span>.",
    options: ["takes effect", "took effect", "will take effect", "had taken effect"]
  },
  {
    type: "fill-blank",
    sentence: "By the time they <span style=\"color: #ff6b6b; font-weight: bold;\">received</span> funds, the project ___ .",
    options: ["had ended", "will have ended", "ends", "has ended"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "By the time you ___ the door, the system <span style=\"color: #20c997; font-weight: bold;\">will have activated</span>.",
    options: ["open", "opened", "will open", "had opened"]
  },
  {
    type: "fill-blank",
    sentence: "By the time the sun <span style=\"color: #ff6b6b; font-weight: bold;\">set</span>, the research crew ___ .",
    options: ["had left", "will have left", "leaves", "have left"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "By the time the app ___ , the team <span style=\"color: #20c997; font-weight: bold;\">will have tested</span> it.",
    options: ["launches", "launched", "will launch", "had launched"]
  },

  // Exercise 2 (11-20)
  {
    type: "fill-blank",
    sentence: "___ the law <span style=\"color: #339af0; font-weight: bold;\">takes effect</span>, firms <span style=\"color: #20c997; font-weight: bold;\">will have adjusted</span>.",
    options: ["By the time", "While", "Since", "Although"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "___ they <span style=\"color: #ff6b6b; font-weight: bold;\">received</span> funds, the project <span style=\"color: #da77f2; font-weight: bold;\">had ended</span>.",
    options: ["By the time", "Since", "While", "Lest"]
  },
  {
    type: "fill-blank",
    sentence: "___ you <span style=\"color: #339af0; font-weight: bold;\">open</span> the door, the system <span style=\"color: #20c997; font-weight: bold;\">will have activated</span>.",
    options: ["By the time", "Since", "Whereas", "As soon as"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "___ the sun <span style=\"color: #ff6b6b; font-weight: bold;\">set</span>, the research crew <span style=\"color: #da77f2; font-weight: bold;\">had left</span>.",
    options: ["By the time", "Since", "While", "Because"]
  },
  {
    type: "fill-blank",
    sentence: "___ the app <span style=\"color: #339af0; font-weight: bold;\">launches</span>, the team <span style=\"color: #20c997; font-weight: bold;\">will have tested</span> it.",
    options: ["By the time", "Until", "Since", "Whereas"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "By the time we <span style=\"color: #ff6b6b; font-weight: bold;\">arrived</span>, most people ___ left.",
    options: ["had", "will have", "have", "were"]
  },
  {
    type: "fill-blank",
    sentence: "By the time we <span style=\"color: #339af0; font-weight: bold;\">arrive</span> home, children ___ gone to bed.",
    options: ["will have", "had", "have", "are"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "By the time engineers <span style=\"color: #ff6b6b; font-weight: bold;\">found</span> the bug, malware ___ spread.",
    options: ["had", "will have", "has", "was"]
  },
  {
    type: "fill-blank",
    sentence: "By the time the compiler <span style=\"color: #339af0; font-weight: bold;\">finishes</span>, the server ___ saved it.",
    options: ["will have", "had", "has", "is"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "By the time the storm <span style=\"color: #ff6b6b; font-weight: bold;\">cleared</span>, the bridge ___ collapsed.",
    options: ["had", "will have", "has", "was"]
  },

  // Exercise 3 (21-30)
  {
    type: "fill-blank",
    sentence: "By the time we <span style=\"color: #ff6b6b; font-weight: bold;\">arrived</span> at the corporate headquarters, most board members ___ the emergency meeting.",
    options: ["had left", "will have left", "left", "have left"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "By the time we ___ home from the laboratory, the children <span style=\"color: #20c997; font-weight: bold;\">will have gone</span> to bed because of the late hour.",
    options: ["arrive", "arrived", "will arrive", "had arrived"]
  },
  {
    type: "fill-blank",
    sentence: "By the time engineers <span style=\"color: #ff6b6b; font-weight: bold;\">found</span> the structural bug, the dynamic malware ___ across secondary network partitions.",
    options: ["had spread", "will have spread", "spreads", "has spread"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "By the time the compiler ___ code optimization, the backup server <span style=\"color: #20c997; font-weight: bold;\">will have saved</span> the configuration metrics.",
    options: ["finishes", "finished", "will finish", "had finished"]
  },
  {
    type: "fill-blank",
    sentence: "By the time the severe coastal storm <span style=\"color: #ff6b6b; font-weight: bold;\">cleared</span>, the ancient bridge structure ___ into the turbulent river.",
    options: ["had collapsed", "will have collapsed", "collapses", "has collapsed"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "By the time we ___ at the corporate headquarters, most board members ___ left the emergency meeting.",
    translation: "Biz şirket merkezine vardığımızda yönetim kurulu üyelerinin çoğu acil toplantıdan ayrılmıştı.",
    corrects: ["arrived", "had"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "By the time we ___ home from the laboratory, the children ___ gone to bed because of the late hour.",
    translation: "Laboratuvardan eve vardığımızda, geç saat olması nedeniyle çocuklar yatmış olacaklar.",
    corrects: ["arrive", "will have"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "By the time engineers ___ the structural bug, the dynamic malware ___ spread across secondary network partitions.",
    translation: "Mühendisler yapısal hatayı bulana kadar, dinamik kötü amaçlı yazılım ikincil ağ bölümlerine yayılmıştı.",
    corrects: ["found", "had"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "By the time the compiler ___ code optimization, the backup server ___ saved the configuration metrics.",
    translation: "Derleyici kod optimizasyonunu tamamlayana kadar, yedek sunucu yapılandırma ölçümlerini kaydetmiş olacak.",
    corrects: ["finishes", "will have"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "By the time the severe coastal storm ___ , the ancient bridge structure ___ collapsed into the turbulent river.",
    translation: "Şiddetli kıyı fırtınası dindiğinde, antik köprü yapısı coşkun nehre çökmüştü.",
    corrects: ["cleared", "had"]
  },

  // Exercise 4 (31-40)
  {
    type: "fill-blank",
    sentence: "By the time the new legislative law ___ , corporate firms <span style=\"color: #20c997; font-weight: bold;\">will have adjusted</span> their data privacy policies.",
    options: ["takes effect", "took effect", "will take effect", "had taken effect"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "By the time they <span style=\"color: #ff6b6b; font-weight: bold;\">received</span> the university research funds, the biology project ___ due to lack of materials.",
    options: ["had ended", "will have ended", "ends", "has ended"]
  },
  {
    type: "fill-blank",
    sentence: "By the time you ___ the laboratory door, the automated security system <span style=\"color: #20c997; font-weight: bold;\">will have activated</span> the entry tracking algorithm.",
    options: ["open", "opened", "will open", "had opened"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "By the time the sun <span style=\"color: #ff6b6b; font-weight: bold;\">set</span> behind the volcanic mountains, the field research crew ___ the evaluation site.",
    options: ["had left", "will have left", "left", "have left"]
  },
  {
    type: "fill-blank",
    sentence: "By the time the mobile application ___ globally, the engineering team <span style=\"color: #20c997; font-weight: bold;\">will have tested</span> all core API modules.",
    options: ["launches", "launched", "will launch", "had launched"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "By the time the new legislative law ___ effect, corporate firms ___ adjusted their data privacy policies.",
    translation: "Yeni yasama yasası yürürlüğe girene kadar, kurumsal firmalar veri gizliliği politikalarını ayarlamış olacaklar.",
    corrects: ["takes", "will have"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "By the time they ___ the university research funds, the biology project ___ ended due to lack of materials.",
    translation: "Üniversite araştırma fonlarını aldıklarında, biyoloji projesi malzeme eksikliği nedeniyle sona ermişti.",
    corrects: ["received", "had"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "By the time you ___ the laboratory door, the automated security system ___ activated the entry tracking algorithm.",
    translation: "Siz laboratuvar kapısını açana kadar, otomatik güvenlik sistemi giriş takip algoritmasını aktif hale getirmiş olacak.",
    corrects: ["open", "will have"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "By the time the sun ___ behind the volcanic mountains, the field research crew ___ left the evaluation site.",
    translation: "Güneş volkanik dağların ardında batana kadar, saha araştırma ekibi değerlendirme alanından ayrılmıştı.",
    corrects: ["set", "had"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "By the time the mobile application ___ globally, the engineering team ___ tested all core API modules.",
    translation: "Mobil uygulama küresel olarak piyasaya sürülene kadar, mühendislik ekibi tüm temel API modüllerini test etmiş olacak.",
    corrects: ["launches", "will have"]
  }
];

// Raw question definitions for Lesson 100 ("It is (high) time" Kalıbı) - 40 questions
const L100_raw = [
  // Exercise 1 (1-10)
  {
    type: "fill-blank",
    sentence: "It is time the development team ___ the memory leak.",
    options: ["fixed", "fixes", "fix", "has fixed"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "___ time the administration <span style=\"color: #ff6b6b; font-weight: bold;\">updated</span> the safety laws.",
    options: ["It is high", "It was", "It has been", "There is"]
  },
  {
    type: "fill-blank",
    sentence: "It is time the technical operators ___ the main server.",
    options: ["rebooted", "reboots", "reboot", "are rebooting"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "___ time the government <span style=\"color: #ff6b6b; font-weight: bold;\">reduced</span> factory carbon emissions.",
    options: ["It is high", "It had", "There is", "It has"]
  },
  {
    type: "fill-blank",
    sentence: "It is time the principal researcher ___ the statistical data.",
    options: ["compiled", "compiles", "compile", "has compiled"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "It ___ time the development team <span style=\"color: #ff6b6b; font-weight: bold;\">fixed</span> the memory leak.",
    options: ["is", "was", "has been", "would be"]
  },
  {
    type: "fill-blank",
    sentence: "It is high time the administration ___ the safety laws.",
    options: ["updated", "updates", "update", "is updating"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "It is ___ time the technical operators <span style=\"color: #ff6b6b; font-weight: bold;\">rebooted</span> the main server.",
    options: ["time", "high time", "the time", "just time"]
  },
  {
    type: "fill-blank",
    sentence: "It is high time the government ___ factory carbon emissions.",
    options: ["reduced", "reduces", "reduce", "will reduce"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "It is ___ time the principal researcher <span style=\"color: #ff6b6b; font-weight: bold;\">compiled</span> the statistical data.",
    options: ["time", "high time", "just time", "the time"]
  },

  // Exercise 2 (11-20)
  {
    type: "fill-blank",
    sentence: "It is high time we ___ the legacy application components.",
    options: ["refactored", "refactor", "refactors", "are refactoring"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "It ___ time the university <span style=\"color: #ff6b6b; font-weight: bold;\">granted</span> the necessary project funds.",
    options: ["is", "was", "has been", "will be"]
  },
  {
    type: "fill-blank",
    sentence: "It is high time the field crew ___ the concrete foundation.",
    options: ["reinforced", "reinforce", "reinforces", "will reinforce"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "It is ___ time companies <span style=\"color: #ff6b6b; font-weight: bold;\">hired</span> compliance policy experts.",
    options: ["high time", "time", "the time", "just time"]
  },
  {
    type: "fill-blank",
    sentence: "It is time the compiler ___ the source code files.",
    options: ["optimized", "optimizes", "optimize", "optimizing"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "It is ___ time we <span style=\"color: #ff6b6b; font-weight: bold;\">refactored</span> the legacy application components.",
    options: ["high time", "time", "the time", "just time"]
  },
  {
    type: "fill-blank",
    sentence: "It is time the university ___ the necessary project funds.",
    options: ["granted", "grants", "grant", "has granted"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "It is ___ time the field crew <span style=\"color: #ff6b6b; font-weight: bold;\">reinforced</span> the concrete foundation.",
    options: ["high time", "time", "the time", "just time"]
  },
  {
    type: "fill-blank",
    sentence: "It is high time companies ___ compliance policy experts.",
    options: ["hired", "hires", "hire", "are hiring"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "It is ___ time the compiler <span style=\"color: #ff6b6b; font-weight: bold;\">optimized</span> the source code files.",
    options: ["time", "high time", "the time", "just time"]
  },

  // Exercise 3 (21-30)
  {
    type: "fill-blank",
    sentence: "It is time the development team ___ the background memory leak since users are experiencing constant navigation delay.",
    options: ["fixed", "fixes", "fix", "has fixed"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "It is high time the administration ___ the safety laws because industrial mechanical piston failures occur frequently.",
    options: ["updated", "updates", "update", "is updating"]
  },
  {
    type: "fill-blank",
    sentence: "It is time the technical operators ___ the main server so that secure cryptographic token generation can resume.",
    options: ["rebooted", "reboots", "reboot", "are rebooting"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "It is high time the government ___ factory carbon emissions in order that international environmental limits might be met.",
    options: ["reduced", "reduces", "reduce", "will reduce"]
  },
  {
    type: "fill-blank",
    sentence: "It is time the principal researcher ___ the statistical data before the board requests the annual performance report.",
    options: ["compiled", "compiles", "compile", "has compiled"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "It is ___ the development team ___ the background memory leak since users are experiencing constant navigation delay.",
    translation: "Kullanıcılar sürekli gezinme gecikmesi yaşadığından, geliştirme ekibinin arka plan bellek sızıntısını düzeltme zamanı geldi.",
    corrects: ["time", "fixed"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "It is ___ the administration ___ the safety laws because industrial mechanical piston failures occur frequently.",
    translation: "Endüstriyel mekanik piston arızaları sıklıkla meydana geldiği için, yönetimin güvenlik yasalarını güncelleme zamanı geldi de geçiyor.",
    corrects: ["high time", "updated"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "It is ___ the technical operators ___ the main server so that secure cryptographic token generation can resume.",
    translation: "Güvenli kriptografik jeton üretimi yeniden başlayabilsin diye, teknik operatörlerin ana sunucuyu yeniden başlatma zamanı geldi.",
    corrects: ["time", "rebooted"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "It is ___ the government ___ factory carbon emissions in order that international environmental limits might be met.",
    translation: "Uluslararası çevre sınırlarının karşılanabilmesi için, hükümetin fabrika karbon emisyonlarını azaltma zamanı geldi de geçiyor.",
    corrects: ["high time", "reduced"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "It is ___ the principal researcher ___ the statistical data before the board requests the annual performance report.",
    translation: "Yönetim kurulu yıllık performans raporunu talep etmeden önce, baş araştırmacının istatistiksel verileri derleme zamanı geldi.",
    corrects: ["time", "compiled"]
  },

  // Exercise 4 (31-40)
  {
    type: "fill-blank",
    sentence: "It is high time we ___ the legacy application components lest the system should trigger an irreversible database crash.",
    options: ["refactored", "refactor", "refactors", "are refactoring"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "It is time the university ___ the necessary project funds, for the sociology department needs to recruit post-doctoral scholars.",
    options: ["granted", "grants", "grant", "has granted"]
  },
  {
    type: "fill-blank",
    sentence: "It is high time the field crew ___ the concrete foundation despite the turbulent weather conditions at the site.",
    options: ["reinforced", "reinforce", "reinforces", "will reinforce"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "It is time the compiler ___ the source code files, decreasing the processing latency parameters on production servers.",
    options: ["optimized", "optimizes", "optimize", "optimizing"]
  },
  {
    type: "fill-blank",
    sentence: "It is high time companies ___ compliance policy experts seeing that the legislative assembly passed strict digital currency rules.",
    options: ["hired", "hires", "hire", "are hiring"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "It is ___ we ___ the legacy application components lest the system should trigger an irreversible database crash.",
    translation: "Sistemin geri döndürülemez bir veritabanı çöküşünü tetiklememesi için, eski uygulama bileşenlerini yeniden yapılandırma zamanımız geldi de geçiyor.",
    corrects: ["high time", "refactored"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "It is ___ the university ___ the necessary project funds, for the sociology department needs to recruit post-doctoral scholars.",
    translation: "Sosyoloji bölümünün doktora sonrası akademisyenleri işe alması gerektiğinden, üniversitenin gerekli proje fonlarını sağlama zamanı geldi.",
    corrects: ["time", "granted"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "It is ___ the field crew ___ the concrete foundation despite the turbulent weather conditions at the site.",
    translation: "Sahadaki çalkantılı hava koşullarına rağmen, saha ekibinin beton temeli güçlendirme zamanı geldi de geçiyor.",
    corrects: ["high time", "reinforced"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "It is ___ the compiler ___ the source code files, decreasing the processing latency parameters on production servers.",
    translation: "Üretim sunucularındaki işlem gecikme parametrelerini azaltarak, derleyicinin kaynak kod dosyalarını optimize etme zamanı geldi.",
    corrects: ["time", "optimized"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "It is ___ companies ___ compliance policy experts seeing that the legislative assembly passed strict digital currency rules.",
    translation: "Yasama meclisinin katı dijital para kurallarını kabul ettiğini göz önünde bulundurarak, şirketlerin uyum politikası uzmanlarını işe alma zamanı geldi de geçiyor.",
    corrects: ["high time", "hired"]
  }
];

// Raw question definitions for Lesson 101 (Superlatives / Restrictive Adjectives + Present Perfect) - 40 questions
const L101_raw = [
  // Exercise 1 (1-10)
  {
    type: "fill-blank",
    sentence: "This is the best academic article I ___ this year.",
    options: ["have read", "had read", "read", "am reading"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "This is the ___ film the compiler team has watched together.",
    options: ["first", "worst", "best", "only"]
  },
  {
    type: "fill-blank",
    sentence: "It is the worst software crash we ___ to date.",
    options: ["have experienced", "had experienced", "experienced", "are experiencing"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "This is the ___ configuration option the algorithm has accepted.",
    options: ["only", "best", "first", "worst"]
  },
  {
    type: "fill-blank",
    sentence: "This is the most complex simulation model they ___ .",
    options: ["have built", "had built", "built", "build"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "This is the ___ academic article I have read this year.",
    options: ["best", "worst", "first", "only"]
  },
  {
    type: "fill-blank",
    sentence: "This is the first film the compiler team ___ together.",
    options: ["has watched", "had watched", "watched", "watches"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "It is the ___ software crash we have experienced to date.",
    options: ["worst", "best", "first", "only"]
  },
  {
    type: "fill-blank",
    sentence: "This is the only configuration option the algorithm ___ .",
    options: ["has accepted", "had accepted", "accepted", "accepts"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "This is the ___ complex simulation model they have built.",
    options: ["most", "more", "very", "much"]
  },

  // Exercise 2 (11-20)
  {
    type: "fill-blank",
    sentence: "It is the first time the central bank ___ rates.",
    options: ["has raised", "had raised", "raised", "raises"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "This is the ___ molecular rendering the researcher has obtained.",
    options: ["finest", "best", "first", "only"]
  },
  {
    type: "fill-blank",
    sentence: "It is the most challenging law the assembly ___ .",
    options: ["has passed", "had passed", "passed", "passes"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "This is the ___ secure token the server has generated so far.",
    options: ["only", "best", "first", "worst"]
  },
  {
    type: "fill-blank",
    sentence: "This is the most efficient engine the factory ___ .",
    options: ["has produced", "had produced", "produced", "produces"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "It is the ___ time the central bank has raised rates.",
    options: ["first", "best", "worst", "only"]
  },
  {
    type: "fill-blank",
    sentence: "This is the finest molecular rendering the researcher ___ .",
    options: ["has obtained", "had obtained", "obtained", "obtains"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "It is the most ___ law the assembly has passed.",
    options: ["challenging", "complex", "efficient", "secure"]
  },
  {
    type: "fill-blank",
    sentence: "This is the only secure token the server ___ so far.",
    options: ["has generated", "had generated", "generated", "generates"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "This is the most ___ engine the factory has produced.",
    options: ["efficient", "challenging", "complex", "fine"]
  },

  // Exercise 3 (21-30)
  {
    type: "fill-blank",
    sentence: "This is the best academic article I ___ this year because its innovative cross-disciplinary methodology is highly clear.",
    options: ["have read", "had read", "read", "am reading"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "This is the first film the compiler team ___ together since they moved into the new technological facility.",
    options: ["has watched", "had watched", "watched", "watches"]
  },
  {
    type: "fill-blank",
    sentence: "It is the worst software crash we ___ to date because of a severe database overflow in primary partitions.",
    options: ["have experienced", "had experienced", "experienced", "are experiencing"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "This is the only configuration option the algorithm ___ although developers provided several alternative code strings.",
    options: ["has accepted", "had accepted", "accepted", "accepts"]
  },
  {
    type: "fill-blank",
    sentence: "This is the most complex simulation model they ___ in order that tectonic plate pressure changes might be evaluated.",
    options: ["have built", "had built", "built", "build"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "This is the ___ academic article I ___ read this year because its innovative cross-disciplinary methodology is highly clear.",
    translation: "Yenilikçi disiplinler arası metodolojisi son derece net olduğu için bu, bu yıl okuduğum en iyi akademik makaledir.",
    corrects: ["best", "have"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "This is the ___ film the compiler team ___ watched together since they moved into the new technological facility.",
    translation: "Yeni teknolojik tesise taşındıklarından beri bu, derleyici ekibinin birlikte izlediği ilk filmdir.",
    corrects: ["first", "has"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "It is the ___ software crash we ___ experienced to date because of a severe database overflow in primary partitions.",
    translation: "Birincil bölümlerdeki ciddi bir veritabanı taşması nedeniyle bu, bugüne kadar yaşadığımız en kötü yazılım çöküşüdür.",
    corrects: ["worst", "have"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "This is the ___ configuration option the algorithm ___ accepted although developers provided several alternative code strings.",
    translation: "Geliştiriciler birkaç alternatif kod dizisi sağlamasına rağmen, bu, algoritmanın kabul ettiği tek yapılandırma seçeneğidir.",
    corrects: ["only", "has"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "This is the most ___ simulation model they ___ built in order that tectonic plate pressure changes might be evaluated.",
    translation: "Tektonik plaka basınç değişikliklerinin değerlendirilebilmesi için bu, onların inşa ettiği en karmaşık simülasyon modelidir.",
    corrects: ["complex", "have"]
  },

  // Exercise 4 (31-40)
  {
    type: "fill-blank",
    sentence: "It is the first time the central bank ___ rates now that global financial indicators display unprecedented market inflation.",
    options: ["has raised", "had raised", "raised", "raises"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "This is the finest molecular rendering the researcher ___ while focusing on cellular sub-structure divisions.",
    options: ["has obtained", "had obtained", "obtained", "obtains"]
  },
  {
    type: "fill-blank",
    sentence: "It is the most challenging law the assembly ___ since the new corporate administrative board was elected.",
    options: ["has passed", "had passed", "passed", "passes"]
  },
  {
    type: "fill-blank-dropdown",
    sentence: "This is the only secure token the server ___ so far lest anonymous third-party trackers should intercept the data.",
    options: ["has generated", "had generated", "generated", "generates"]
  },
  {
    type: "fill-blank",
    sentence: "This is the most efficient engine the factory ___ inasmuch as its mechanical piston operates with zero friction limits.",
    options: ["has produced", "had produced", "produced", "produces"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "It is the ___ time the central bank ___ raised rates now that global financial indicators display unprecedented market inflation.",
    translation: "Küresel finansal göstergelerin benzeri görülmemiş bir piyasa enflasyonu sergilemesi nedeniyle, merkez bankası ilk kez faiz artırdı.",
    corrects: ["first", "has"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "This is the ___ molecular rendering the researcher ___ obtained while focusing on cellular sub-structure divisions.",
    translation: "Hücresel alt yapı bölünmelerine odaklanırken bu, araştırmacının elde ettiği en iyi moleküler görselleştirmedir.",
    corrects: ["finest", "has"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "It is the most ___ law the assembly ___ passed since the new corporate administrative board was elected.",
    translation: "Yeni kurumsal yönetim kurulu seçildiğinden beri bu, meclisin kabul ettiği en zorlu yasadır.",
    corrects: ["challenging", "has"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "This is the ___ secure token the server ___ generated so far lest anonymous third-party trackers should intercept the data.",
    translation: "Anonim üçüncü taraf takipçilerin verileri ele geçirmemesi için bu, sunucunun şimdiye kadar ürettiği tek güvenli jetondur.",
    corrects: ["only", "has"]
  },
  {
    type: "multiple-fill-blank",
    sentence: "This is the most ___ engine the factory ___ produced inasmuch as its mechanical piston operates with zero friction limits.",
    translation: "Mekanik pistonu sıfır sürtünme sınırıyla çalıştığı için bu, fabrikanın ürettiği en verimli motordur.",
    corrects: ["efficient", "has"]
  }
];

// Raw question definitions for Lesson 102 (be used to (Alışkın olmak)) - 40 questions
const unit103SentenceData = {
  102: [
    {
      en: "The senior developer is used to processing large data streams.",
      word: "processing",
      trWord: "işlemeye",
      blankOptions: ["processing", "process", "processed", "to process"],
      tr: "Kıdemli geliştirici büyük veri akışlarını işlemeye alışıktır."
    },
    {
      en: "The network infrastructure branch is used to processing massive cloud database queries while secondary firewalls screen external traffic.",
      word: "processing",
      trWord: "işlemeye",
      blankOptions: ["processing", "process", "processed", "to process"],
      tr: "İkincil güvenlik duvarları harici trafiği tararken ağ altyapısı şubesi devasa bulut veritabanı sorgularını işlemeye alışıktır."
    },
    {
      en: "The research team is used to analyzing structural variations in cells.",
      word: "analyzing",
      trWord: "analiz etmeye",
      blankOptions: ["analyzing", "analyze", "analyzed", "to analyze"],
      tr: "Araştırma ekibi hücrelerdeki yapısal varyasyonları analiz etmeye alışıktır."
    },
    {
      en: "The diagnostic software is used to scanning massive file partitions.",
      word: "scanning",
      trWord: "taramaya",
      blankOptions: ["scanning", "scan", "scanned", "to scan"],
      tr: "Tanı yazılımı, devasa dosya bölümlerini taramaya alışıktır."
    },
    {
      en: "The automated system is used to generating unique cryptographic tokens.",
      word: "generating",
      trWord: "üretmeye",
      blankOptions: ["generating", "generate", "generated", "to generate"],
      tr: "Otomatik sistem benzersiz kriptografik jetonlar üretmeye alışıktır."
    },
    {
      en: "Technical operators are used to operating heavy industrial machinery.",
      word: "operating",
      trWord: "çalıştırmaya",
      blankOptions: ["operating", "operate", "operated", "to operate"],
      tr: "Teknik operatörler ağır endüstriyel makineleri çalıştırmaya alışıktır."
    },
    {
      en: "I am used to refactoring unoptimized legacy source codes.",
      word: "refactoring",
      trWord: "yeniden yapılandırmaya",
      blankOptions: ["refactoring", "refactor", "refactored", "to refactor"],
      tr: "Optimize edilmemiş eski kaynak kodlarını yeniden yapılandırmaya alışkınım."
    },
    {
      en: "The supervisor was used to handling severe database overflows.",
      word: "handling",
      trWord: "yönetmeye",
      blankOptions: ["handling", "handle", "handled", "to handle"],
      tr: "Gözetmen ciddi veritabanı taşmalarını yönetmeye alışıktı."
    },
    {
      en: "Engineers were used to compiling data fields manually.",
      word: "compiling",
      trWord: "derlemeye",
      blankOptions: ["compiling", "compile", "compiled", "to compile"],
      tr: "Mühendisler veri alanlarını manuel olarak derlemeye alışıktı."
    },
    {
      en: "Most administrators are used to modifying security protocols regularly.",
      word: "modifying",
      trWord: "değiştirmeye",
      blankOptions: ["modifying", "modify", "modified", "to modify"],
      tr: "Çoğu yönetici güvenlik protokollerini düzenli olarak değiştirmeye alışıktır."
    },
    {
      en: "I am used to configuring complex network infrastructures.",
      word: "configuring",
      trWord: "yapılandırmaya",
      blankOptions: ["configuring", "configure", "configured", "to configure"],
      tr: "Karmaşık ağ altyapılarını yapılandırmaya alışkınım."
    },
    {
      en: "The financial analyst was used to evaluating volatile market metrics.",
      word: "evaluating",
      trWord: "değerlendirmeye",
      blankOptions: ["evaluating", "evaluate", "evaluated", "to evaluate"],
      tr: "Finansal analist değişken piyasa ölçümlerini değerlendirmeye alışıktı."
    },
    {
      en: "Project managers were used to implementing strict quality compliance frameworks.",
      word: "implementing",
      trWord: "uygulamaya",
      blankOptions: ["implementing", "implement", "implemented", "to implement"],
      tr: "Proje yöneticileri katı kalite uyum çerçevelerini uygulamaya alışıktı."
    },
    {
      en: "Local laboratories are used to testing chemical solution properties.",
      word: "testing",
      trWord: "test etmeye",
      blankOptions: ["testing", "test", "tested", "to test"],
      tr: "Yerel laboratuvarlar kimyasal çözelti özelliklerini test etmeye alışıktır."
    },
    {
      en: "I am used to handling unexpected system latency anomalies.",
      word: "handling",
      trWord: "yönetmeye",
      blankOptions: ["handling", "handle", "handled", "to handle"],
      tr: "Beklenmedik sistem gecikme anomalilerini yönetmeye alışkınım."
    },
    {
      en: "The chief architect was used to designing cross-disciplinary software modules.",
      word: "designing",
      trWord: "tasarlamaya",
      blankOptions: ["designing", "design", "designed", "to design"],
      tr: "Baş mimar disiplinler arası yazılım modülleri tasarlamaya alışıktı."
    },
    {
      en: "Academic institutions were used to tracking student retention indicators.",
      word: "tracking",
      trWord: "takip etmeye",
      blankOptions: ["tracking", "track", "tracked", "to track"],
      tr: "Akademik kurumlar öğrenciyi elde tutma göstergelerini takip etmeye alışıktı."
    },
    {
      en: "Cloud technicians are used to migrating sensitive database records.",
      word: "migrating",
      trWord: "taşımaya",
      blankOptions: ["migrating", "migrate", "migrated", "to migrate"],
      tr: "Bulut teknisyenleri hassas veritabanı kayıtlarını taşımaya alışıktır."
    },
    {
      en: "I am used to isolating corrupted device firmware packages.",
      word: "isolating",
      trWord: "yalıtmaya",
      blankOptions: ["isolating", "isolate", "isolated", "to isolate"],
      tr: "Bozuk cihaz bellenim paketlerini yalıtmaya alışkınım."
    },
    {
      en: "The lead investigator was used to reviewing legislative policy documents.",
      word: "reviewing",
      trWord: "incelemeye",
      blankOptions: ["reviewing", "review", "reviewed", "to review"],
      tr: "Baş araştırmacı yasal politika belgelerini incelemeye alışıktı."
    },
    {
      en: "Environmental groups were used to monitoring global heat anomaly indexes.",
      word: "monitoring",
      trWord: "izlemeye",
      blankOptions: ["monitoring", "monitor", "monitored", "to monitor"],
      tr: "Çevre grupları küresel ısı anomalisi endekslerini izlemeye alışıktı."
    },
    {
      en: "Industrial field crews are used to operating heavy mechanical components although the laboratory environment lacks stable pressure controls.",
      word: "operating",
      trWord: "çalıştırmaya",
      blankOptions: ["operating", "operate", "operated", "to operate"],
      tr: "Laboratuvar ortamında kararlı basınç kontrolleri olmamasına rağmen, endüstriyel saha ekipleri ağır mekanik bileşenleri çalıştırmaya alışıktır."
    },
    {
      en: "I am used to refactoring complex application systems in order that frontend developers can integrate visual components cleanly.",
      word: "refactoring",
      trWord: "yeniden yapılandırmaya",
      blankOptions: ["refactoring", "refactor", "refactored", "to refactor"],
      tr: "Arayüz geliştiricilerinin görsel bileşenleri temiz bir şekilde entegre edebilmesi için karmaşık uygulama sistemlerini yeniden yapılandırmaya alışkınım."
    },
    {
      en: "The senior architect was used to handling critical configuration anomalies before the automated framework took over the backup routine.",
      word: "handling",
      trWord: "yönetmeye",
      blankOptions: ["handling", "handle", "handled", "to handle"],
      tr: "Otomatik altyapı yedekleme rutinini devralmadan önce, kıdemli mimar kritik yapılandırma anomalilerini yönetmeye alışıktı."
    },
    {
      en: "Technical specialists were used to compiling loose statistical metrics since public research institutes lacked high-resolution logging devices.",
      word: "compiling",
      trWord: "derlemeye",
      blankOptions: ["compiling", "compile", "compiled", "to compile"],
      tr: "Kamu araştırma enstitülerinde yüksek çözünürlüklü kayıt cihazları bulunmadığından, teknik uzmanlar dağınık istatistiksel ölçümleri derlemeye alışıktı."
    }
  ],
  103: [
    {
      en: "The system administrator is accustomed to monitoring real-time network traffic.",
      word: "monitoring",
      trWord: "izlemeye",
      blankOptions: ["monitoring", "monitor", "monitored", "to monitor"],
      tr: "Sistem yöneticisi gerçek zamanlı ağ trafiğini izlemeye alışıktır."
    },
    {
      en: "Most developers are accustomed to deploying builds automatically.",
      word: "deploying",
      trWord: "yayınlamaya",
      blankOptions: ["deploying", "deploy", "deployed", "to deploy"],
      tr: "Çoğu geliştirici sürümleri otomatik olarak yayınlamaya alışıktır."
    },
    {
      en: "We are accustomed to working under high-pressure conditions.",
      word: "working",
      trWord: "çalışmaya",
      blankOptions: ["working", "work", "worked", "to work"],
      tr: "Yüksek basınç koşulları altında çalışmaya alışkınız."
    },
    {
      en: "The research team was accustomed to analyzing complex data sets.",
      word: "analyzing",
      trWord: "analiz etmeye",
      blankOptions: ["analyzing", "analyze", "analyzed", "to analyze"],
      tr: "Araştırma ekibi karmaşık veri setlerini analiz etmeye alışıktı."
    },
    {
      en: "Our servers were accustomed to handling sudden traffic spikes.",
      word: "handling",
      trWord: "yönetmeye",
      blankOptions: ["handling", "handle", "handled", "to handle"],
      tr: "Sunucularımız ani trafik artışlarını yönetmeye alışıktı."
    },
    {
      en: "The senior developer is accustomed to processing large data streams.",
      word: "processing",
      trWord: "işlemeye",
      blankOptions: ["processing", "process", "processed", "to process"],
      tr: "Kıdemli geliştirici büyük veri akışlarını işlemeye alışıktır."
    },
    {
      en: "Technical operators are accustomed to operating heavy industrial machinery.",
      word: "operating",
      trWord: "çalıştırmaya",
      blankOptions: ["operating", "operate", "operated", "to operate"],
      tr: "Teknik operatörler ağır endüstriyel makineleri çalıştırmaya alışıktır."
    },
    {
      en: "I am accustomed to refactoring unoptimized legacy source codes.",
      word: "refactoring",
      trWord: "yeniden yapılandırmaya",
      blankOptions: ["refactoring", "refactor", "refactored", "to refactor"],
      tr: "Optimize edilmemiş eski kaynak kodlarını yeniden yapılandırmaya alışkınım."
    },
    {
      en: "The supervisor was accustomed to handling severe database overflows.",
      word: "handling",
      trWord: "yönetmeye",
      blankOptions: ["handling", "handle", "handled", "to handle"],
      tr: "Gözetmen ciddi veritabanı taşmalarını yönetmeye alışıktı."
    },
    {
      en: "Engineers were accustomed to compiling data fields manually.",
      word: "compiling",
      trWord: "derlemeye",
      blankOptions: ["compiling", "compile", "compiled", "to compile"],
      tr: "Mühendisler veri alanlarını manuel olarak derlemeye alışıktı."
    }
  ],
  104: [
    {
      en: "The software team is willing to modify the centralized cloud database model.",
      word: "modify",
      trWord: "değiştirmeye",
      blankOptions: ["modify", "modifying", "modified", "to modify"],
      tr: "Yazılım ekibi merkezi bulut veritabanı modelini değiştirmeye isteklidir."
    },
    {
      en: "The ministry is willing to fund the rapid regional infrastructure expansion.",
      word: "fund",
      trWord: "finanse etmeye",
      blankOptions: ["fund", "funding", "funded", "to fund"],
      tr: "Bakanlık, hızlı bölgesel altyapı genişletmesini finanse etmeye isteklidir."
    },
    {
      en: "Operators are willing to work overtime during the comprehensive regional educational surveys.",
      word: "work",
      trWord: "çalışmaya",
      blankOptions: ["work", "working", "worked", "to work"],
      tr: "Operatörler kapsamlı bölgesel eğitim anketleri sırasında fazla mesai yapmaya isteklidir."
    },
    {
      en: "Independent experts are willing to share their empirical data inputs with the team.",
      word: "share",
      trWord: "paylaşmaya",
      blankOptions: ["share", "sharing", "shared", "to share"],
      tr: "Bağımsız uzmanlar deneysel veri girdilerini ekiple paylaşmaya isteklidir."
    },
    {
      en: "The client is willing to extend the project deadline.",
      word: "extend",
      trWord: "uzatmaya",
      blankOptions: ["extend", "extending", "extended", "to extend"],
      tr: "Müşteri proje teslim tarihini uzatmaya isteklidir."
    },
    {
      en: "Engineers are willing to cooperate on cross-platform integration.",
      word: "cooperate",
      trWord: "iş birliği yapmaya",
      blankOptions: ["cooperate", "cooperating", "cooperated", "to cooperate"],
      tr: "Mühendisler platformlar arası entegrasyonda iş birliği yapmaya isteklidirler."
    },
    {
      en: "The company was willing to invest in advanced cybersecurity tools.",
      word: "invest",
      trWord: "yatırım yapmaya",
      blankOptions: ["invest", "investing", "invested", "to invest"],
      tr: "Şirket gelişmiş siber güvenlik araçlarına yatırım yapmaya istekliydi."
    },
    {
      en: "The junior developer is willing to learn new programming languages.",
      word: "learn",
      trWord: "öğrenmeye",
      blankOptions: ["learn", "learning", "learned", "to learn"],
      tr: "Genç geliştirici yeni programlama dillerini öğrenmeye isteklidir."
    },
    {
      en: "Most operators were willing to work extra hours to fix the database issue.",
      word: "work",
      trWord: "çalışmaya",
      blankOptions: ["work", "working", "worked", "to work"],
      tr: "Çoğu operatör veritabanı sorununu düzeltmek için ekstra saatler çalışmaya istekliydi."
    },
    {
      en: "Institutional authorities were willing to approve the additional server budget.",
      word: "approve",
      trWord: "onaylamaya",
      blankOptions: ["approve", "approving", "approved", "to approve"],
      tr: "Kurumsal makamlar ek sunucu bütçesini onaylamaya istekliydi."
    }
  ],
  105: [
    {
      en: "Technical experts are unwilling to adopt the outdated architectural framework.",
      word: "adopt",
      trWord: "benimsemeye",
      blankOptions: ["adopt", "adopting", "adopted", "to adopt"],
      tr: "Teknik uzmanlar güncelliğini yitirmiş mimari çerçeveyi benimsemeye isteksizdir."
    },
    {
      en: "Institutional authorities are unwilling to sign the formal bilateral commercial agreements.",
      word: "sign",
      trWord: "imzalamaya",
      blankOptions: ["sign", "signing", "signed", "to sign"],
      tr: "Kurumsal makamlar resmi ikili ticari anlaşmaları imzalamaya isteksizdir."
    },
    {
      en: "The internal board is unwilling to accept the sudden corporate paradigm shift.",
      word: "accept",
      trWord: "kabul etmeye",
      blankOptions: ["accept", "accepting", "accepted", "to accept"],
      tr: "İç yönetim kurulu ani kurumsal paradigma değişimini kabul etmeye isteksizdir."
    },
    {
      en: "The administrator is unwilling to grant root access to external users.",
      word: "grant",
      trWord: "vermeye",
      blankOptions: ["grant", "granting", "granted", "to grant"],
      tr: "Yönetici, dış kullanıcılara kök erişimi vermeye isteksizdir."
    },
    {
      en: "Many legacy companies are unwilling to migrate their databases to the cloud.",
      word: "migrate",
      trWord: "taşımaya",
      blankOptions: ["migrate", "migrating", "migrated", "to migrate"],
      tr: "Birçok köklü şirket, veritabanlarını buluta taşımaya isteksizdir."
    },
    {
      en: "The team was unwilling to change the core application structure.",
      word: "change",
      trWord: "değiştirmeye",
      blankOptions: ["change", "changing", "changed", "to change"],
      tr: "Ekip, temel uygulama yapısını değiştirmeye isteksizdi."
    },
    {
      en: "Users are unwilling to share their private data without encryption.",
      word: "share",
      trWord: "paylaşmaya",
      blankOptions: ["share", "sharing", "shared", "to share"],
      tr: "Kullanıcılar şifreleme olmadan özel verilerini paylaşmaya isteksizdir."
    },
    {
      en: "The management was unwilling to approve the additional server budget.",
      word: "approve",
      trWord: "onaylamaya",
      blankOptions: ["approve", "approving", "approved", "to approve"],
      tr: "Yönetim, ek sunucu bütçesini onaylamaya isteksizdi."
    },
    {
      en: "The senior programmer was unwilling to refactor the legacy codebase.",
      word: "refactor",
      trWord: "yeniden yapılandırmaya",
      blankOptions: ["refactor", "refactoring", "refactored", "to refactor"],
      tr: "Kıdemli programcı eski kod tabanını yeniden yapılandırmaya isteksizdi."
    },
    {
      en: "Technicians were unwilling to shut down the main server during production.",
      word: "shut",
      trWord: "kapatmaya",
      blankOptions: ["shut", "shutting", "shuts", "to shut"],
      tr: "Teknisyenler üretim sırasında ana sunucuyu kapatmaya isteksizdi."
    }
  ],
  106: [
    {
      en: "Senior analysts are reluctant to change the initial investigative project scope.",
      word: "change",
      trWord: "değiştirmeye",
      blankOptions: ["change", "changing", "changed", "to change"],
      tr: "Kıdemli analistler başlangıçtaki araştırma projesi kapsamını değiştirmeye gönülsüzdür."
    },
    {
      en: "Technicians are reluctant to deploy the script without explicit authorization.",
      word: "deploy",
      trWord: "çalıştırmaya",
      blankOptions: ["deploy", "deploying", "deployed", "to deploy"],
      tr: "Teknisyenler açık yetki olmadan betiği çalıştırmaya gönülsüzdür."
    },
    {
      en: "The evaluation committee is reluctant to reallocate the annual research budget.",
      word: "reallocate",
      trWord: "yeniden tahsis etmeye",
      blankOptions: ["reallocate", "reallocating", "reallocated", "to reallocate"],
      tr: "Değerlendirme komitesi yıllık araştırma bütçesini yeniden tahsis etmeye gönülsüzdür."
    },
    {
      en: "The lead developer is reluctant to use unverified external libraries.",
      word: "use",
      trWord: "kullanmaya",
      blankOptions: ["use", "using", "used", "to use"],
      tr: "Lider geliştirici, doğrulanmamış harici kütüphaneleri kullanmaya gönülsüzdür."
    },
    {
      en: "The supervisor was reluctant to report the minor configuration failure.",
      word: "report",
      trWord: "bildirmeye",
      blankOptions: ["report", "reporting", "reported", "to report"],
      tr: "Gözetmen, küçük yapılandırma hatasını bildirmeye gönülsüzdü."
    },
    {
      en: "The client was reluctant to modify the contract terms.",
      word: "modify",
      trWord: "değiştirmeye",
      blankOptions: ["modify", "modifying", "modified", "to modify"],
      tr: "Müşteri, sözleşme şartlarını değiştirmeye gönülsüzdü."
    },
    {
      en: "Engineers were reluctant to adopt the outdated testing framework.",
      word: "adopt",
      trWord: "benimsemeye",
      blankOptions: ["adopt", "adopting", "adopted", "to adopt"],
      tr: "Mühendisler, güncelliğini yitirmiş test çerçevesini benimsemeye gönülsüzdüler."
    },
    {
      en: "The manager was reluctant to approve the unverified data backup.",
      word: "approve",
      trWord: "onaylamaya",
      blankOptions: ["approve", "approving", "approved", "to approve"],
      tr: "Müdür, doğrulanmamış veri yedeğini onaylamaya gönülsüzdü."
    },
    {
      en: "Administrators were reluctant to grant administrative access to contractors.",
      word: "grant",
      trWord: "vermeye",
      blankOptions: ["grant", "granting", "granted", "to grant"],
      tr: "Yöneticiler, yüklenicilere idari erişim izni vermeye gönülsüzdü."
    },
    {
      en: "The research team was reluctant to publish the incomplete empirical results.",
      word: "publish",
      trWord: "yayınlamaya",
      blankOptions: ["publish", "publishing", "published", "to publish"],
      tr: "Araştırma ekibi tamamlanmamış deneysel sonuçları yayınlamaya gönülsüzdü."
    }
  ],
  107: [
    {
      en: "The corporate tax rate is likely to increase next fiscal quarter.",
      word: "increase",
      trWord: "artması",
      blankOptions: ["increase", "increasing", "increased", "to increase"],
      tr: "Kurumlar vergisi oranının önümüzdeki mali çeyrekte artması muhtemeldir."
    },
    {
      en: "Significant annual financial growth is likely to occur within the dynamic sector.",
      word: "occur",
      trWord: "gerçekleşmesi",
      blankOptions: ["occur", "occurring", "occurred", "to occur"],
      tr: "Dinamik sektörde önemli yıllık finansal büyümenin gerçekleşmesi muhtemeldir."
    },
    {
      en: "The new update is likely to resolve the latency issues.",
      word: "resolve",
      trWord: "çözmesi",
      blankOptions: ["resolve", "resolving", "resolved", "to resolve"],
      tr: "Yeni güncellemenin gecikme sorunlarını çözmesi muhtemeldir."
    },
    {
      en: "The server is likely to crash if the database overflow continues.",
      word: "crash",
      trWord: "çökmesi",
      blankOptions: ["crash", "crashing", "crashed", "to crash"],
      tr: "Veritabanı taşması devam ederse sunucunun çökmesi muhtemeldir."
    },
    {
      en: "These configuration errors are likely to affect the final simulation.",
      word: "affect",
      trWord: "etkilemesi",
      blankOptions: ["affect", "affecting", "affected", "to affect"],
      tr: "Bu yapılandırma hatalarının nihai simülasyonu etkilemesi muhtemeldir."
    },
    {
      en: "The automation routine was likely to improve system performance.",
      word: "improve",
      trWord: "artırması",
      blankOptions: ["improve", "improving", "improved", "to improve"],
      tr: "Otomasyon rutininin sistem performansını artırması muhtemeldi."
    },
    {
      en: "The primary query was likely to fail due to network latency.",
      word: "fail",
      trWord: "başarısız olması",
      blankOptions: ["fail", "failing", "failed", "to fail"],
      tr: "Birincil sorgunun ağ gecikmesi nedeniyle başarısız olması muhtemeldi."
    },
    {
      en: "The administrative council is likely to approve the new security protocol.",
      word: "approve",
      trWord: "onaylaması",
      blankOptions: ["approve", "approving", "approved", "to approve"],
      tr: "Yönetim kurulunun yeni güvenlik protokolünü onaylaması muhtemeldir."
    },
    {
      en: "Corrupted device firmware is likely to cause system failures.",
      word: "cause",
      trWord: "neden olması",
      blankOptions: ["cause", "causing", "caused", "to cause"],
      tr: "Bozuk cihaz bellenimi sistem hatalarına neden olması muhtemeldir."
    },
    {
      en: "The research team is likely to publish their findings next month.",
      word: "publish",
      trWord: "yayınlaması",
      blankOptions: ["publish", "publishing", "published", "to publish"],
      tr: "Araştırma ekibinin bulgularını önümüzdeki ay yayınlaması muhtemeldir."
    }
  ],
  108: [
    {
      en: "It is unlikely to rain during the international summit at the facility.",
      word: "rain",
      trWord: "yağması",
      blankOptions: ["rain", "raining", "rained", "to rain"],
      tr: "Tesisteki uluslararası zirve sırasında yağmur yağması muhtemel değildir."
    },
    {
      en: "The backup database is unlikely to lose any transaction records.",
      word: "lose",
      trWord: "kaybetmesi",
      blankOptions: ["lose", "losing", "lost", "to lose"],
      tr: "Yedek veritabanının herhangi bir işlem kaydını kaybetmesi muhtemel değildir."
    },
    {
      en: "The compiler is unlikely to generate errors with the new syntax.",
      word: "generate",
      trWord: "üretmesi",
      blankOptions: ["generate", "generating", "generated", "to generate"],
      tr: "Derleyicinin yeni sözdizimi ile hata üretmesi muhtemel değildir."
    },
    {
      en: "The system was unlikely to recover without a full reboot.",
      word: "recover",
      trWord: "düzelmesi",
      blankOptions: ["recover", "recovering", "recovered", "to recover"],
      tr: "Sistemin tam bir yeniden başlatma olmadan düzelmesi muhtemel değildi."
    },
    {
      en: "These old devices are unlikely to support the high-resolution logging feature.",
      word: "support",
      trWord: "desteklemesi",
      blankOptions: ["support", "supporting", "supported", "to support"],
      tr: "Bu eski cihazların yüksek çözünürlüklü kayıt özelliğini desteklemesi muhtemel değildir."
    },
    {
      en: "The security branch was unlikely to detect the encrypted breach.",
      word: "detect",
      trWord: "tespit etmesi",
      blankOptions: ["detect", "detecting", "detected", "to detect"],
      tr: "Güvenlik şubesinin şifrelenmiş ihlali tespit etmesi muhtemel değildi."
    },
    {
      en: "The server is unlikely to crash under moderate user load.",
      word: "crash",
      trWord: "çökmesi",
      blankOptions: ["crash", "crashing", "crashed", "to crash"],
      tr: "Sunucunun orta düzeyde kullanıcı yükü altında çökmesi muhtemel değildir."
    },
    {
      en: "The client is unlikely to accept the modified contract terms.",
      word: "accept",
      trWord: "kabul etmesi",
      blankOptions: ["accept", "accepting", "accepted", "to accept"],
      tr: "Müşterinin değiştirilmiş sözleşme şartlarını kabul etmesi muhtemel değildir."
    },
    {
      en: "The evaluation committee was unlikely to approve the additional funding.",
      word: "approve",
      trWord: "onaylaması",
      blankOptions: ["approve", "approving", "approved", "to approve"],
      tr: "Değerlendirme komitesinin ek fonu onaylaması muhtemel değildi."
    },
    {
      en: "Technicians were unlikely to complete the migration process today.",
      word: "complete",
      trWord: "tamamlaması",
      blankOptions: ["complete", "completing", "completed", "to complete"],
      tr: "Teknisyenlerin taşıma işlemini bugün tamamlaması muhtemel değildi."
    }
  ],
  109: [
    {
      en: "Sooner or later, the administrative council is bound to learn the truth.",
      word: "learn",
      trWord: "öğrenmek",
      blankOptions: ["learn", "learning", "learned", "to learn"],
      tr: "Er ya da geç, yönetim kurulu gerçeği öğrenmek zorundadır / gerçeği öğrenecektir."
    },
    {
      en: "Without proper technical parameters, you are bound to make a logical mistake.",
      word: "make",
      trWord: "yapmanız",
      blankOptions: ["make", "making", "made", "to make"],
      tr: "Düzgün teknik parametreler olmadan, mantıksal bir hata yapmanız kaçınılmazdır."
    },
    {
      en: "Without comprehensive empirical evaluation, the database script is bound to fail.",
      word: "fail",
      trWord: "başarısız olması",
      blankOptions: ["fail", "failing", "failed", "to fail"],
      tr: "Kapsamlı deneysel değerlendirme olmadan, veritabanı betiğinin başarısız olması kaçınılmazdır."
    },
    {
      en: "With such an advanced encryption algorithm, the security system is bound to succeed.",
      word: "succeed",
      trWord: "başarılı olması",
      blankOptions: ["succeed", "succeeding", "succeeded", "to succeed"],
      tr: "Böylesine gelişmiş bir şifreleme algoritmasıyla, güvenlik sisteminin başarılı olması kaçınılmazdır."
    },
    {
      en: "If the ministry doesn't fund expansion, the dynamic sector is bound to face stagnation.",
      word: "face",
      trWord: "karşılaşması",
      blankOptions: ["face", "facing", "faced", "to face"],
      tr: "Bakanlık genişlemeyi finanse etmezse, dinamik sektörün durgunlukla karşılaşması kaçınılmazdır."
    },
    {
      en: "Cold weather anomalies are bound to happen in the northern regional facility every winter.",
      word: "happen",
      trWord: "yaşanması",
      blankOptions: ["happen", "happening", "happened", "to happen"],
      tr: "Kuzey bölgesel tesisinde her kış soğuk hava anomalilerinin yaşanması kaçınılmazdır."
    },
    {
      en: "The system is bound to fail if you ignore the warnings.",
      word: "fail",
      trWord: "başarısız olması",
      blankOptions: ["fail", "failing", "failed", "to fail"],
      tr: "Uyarıları göz ardı ederseniz sistemin başarısız olması kaçınılmazdır."
    },
    {
      en: "This software update is bound to improve operational efficiency.",
      word: "improve",
      trWord: "artırması",
      blankOptions: ["improve", "improving", "improved", "to improve"],
      tr: "Bu yazılım güncellemesinin operasyonel verimliliği artırması kaçınılmazdır."
    },
    {
      en: "Any network latency is bound to cause communication delays.",
      word: "cause",
      trWord: "neden olması",
      blankOptions: ["cause", "causing", "caused", "to cause"],
      tr: "Herhangi bir ağ gecikmesinin iletişim gecikmelerine neden olması kaçınılmazdır."
    },
    {
      en: "The engineers were bound to notice the database conflict.",
      word: "notice",
      trWord: "fark etmesi",
      blankOptions: ["notice", "noticing", "noticed", "to notice"],
      tr: "Mühendislerin veritabanı çelişkisini fark etmesi kaçınılmazdı."
    }
  ],
  110: [
    {
      en: "He is certain to pass the advanced encryption algorithms certification test.",
      word: "pass",
      trWord: "geçeceği",
      blankOptions: ["pass", "passing", "passed", "to pass"],
      tr: "Gelişmiş şifreleme algoritmaları sertifika sınavını geçeceği kesindir."
    },
    {
      en: "The automatic script is certain to execute at midnight.",
      word: "execute",
      trWord: "çalışacağı",
      blankOptions: ["execute", "executing", "executed", "to execute"],
      tr: "Otomatik betiğin gece yarısı çalışacağı kesindir."
    },
    {
      en: "This new protocol is certain to secure all external connections.",
      word: "secure",
      trWord: "güvence altına alacağı",
      blankOptions: ["secure", "securing", "secured", "to secure"],
      tr: "Bu yeni protokolün tüm dış bağlantıları güvence altına alacağı kesindir."
    },
    {
      en: "The main server was certain to overheat under that heavy load.",
      word: "overheat",
      trWord: "aşırı ısınacağı",
      blankOptions: ["overheat", "overheating", "overheated", "to overheat"],
      tr: "Ana sunucunun bu ağır yük altında aşırı ısınacağı kesindi."
    },
    {
      en: "These test parameters are certain to yield accurate results.",
      word: "yield",
      trWord: "vereceği",
      blankOptions: ["yield", "yielding", "yielded", "to yield"],
      tr: "Bu test parametrelerinin doğru sonuçlar vereceği kesindir."
    },
    {
      en: "The project was certain to succeed with the new architecture.",
      word: "succeed",
      trWord: "başarılı olacağı",
      blankOptions: ["succeed", "succeeding", "succeeded", "to succeed"],
      tr: "Projenin yeni mimariyle başarılı olacağı kesindi."
    },
    {
      en: "The security updates are certain to block external attacks.",
      word: "block",
      trWord: "engelleyeceği",
      blankOptions: ["block", "blocking", "blocked", "to block"],
      tr: "Güvenlik güncellemelerinin dış saldırıları engelleyeceği kesindir."
    },
    {
      en: "The simulation was certain to succeed after the configuration change.",
      word: "succeed",
      trWord: "başarılı olacağı",
      blankOptions: ["succeed", "succeeding", "succeeded", "to succeed"],
      tr: "Simülasyonun yapılandırma değişikliğinden sonra başarılı olacağı kesindi."
    },
    {
      en: "The automatic framework is certain to optimize the queries.",
      word: "optimize",
      trWord: "optimize edeceği",
      blankOptions: ["optimize", "optimizing", "optimized", "to optimize"],
      tr: "Otomatik altyapının sorguları optimize edeceği kesindir."
    },
    {
      en: "The operators were certain to detect the network latency.",
      word: "detect",
      trWord: "tespit edeceği",
      blankOptions: ["detect", "detecting", "detected", "to detect"],
      tr: "Operatörlerin ağ gecikmesini tespit edeceği kesindi."
    }
  ],
  111: [
    {
      en: "Reckless engineers are doomed to cause a major crash in the industrial facility.",
      word: "cause",
      trWord: "neden olmaya",
      blankOptions: ["cause", "causing", "caused", "to cause"],
      tr: "Dikkatsiz mühendisler endüstriyel tesiste büyük bir kazaya neden olmaya mahkumdur."
    },
    {
      en: "Outdated architectural frameworks are doomed to collapse sooner or later in technology.",
      word: "collapse",
      trWord: "çökmeye",
      blankOptions: ["collapse", "collapsing", "collapsed", "to collapse"],
      tr: "Güncelliğini yitirmiş mimari çerçeveler teknolojide er ya da geç çökmeye mahkumdur."
    },
    {
      en: "The project was doomed to fail from the beginning due to a lack of technical experts.",
      word: "fail",
      trWord: "başarısız olmaya",
      blankOptions: ["fail", "failing", "failed", "to fail"],
      tr: "Proje, teknik uzman eksikliği nedeniyle başlangıçtan itibaren başarısız olmaya mahkumdu."
    },
    {
      en: "The continuous chemical process is doomed to stop if the concrete core cracks.",
      word: "stop",
      trWord: "durması",
      blankOptions: ["stop", "stopping", "stopped", "to stop"],
      tr: "Beton çekirdek çatlarsa sürekli kimyasal sürecin durması kaçınılmazdır."
    },
    {
      en: "The legacy system is doomed to fail without proper maintenance.",
      word: "fail",
      trWord: "çökmeye",
      blankOptions: ["fail", "failing", "failed", "to fail"],
      tr: "Eski sistem, düzgün bakım yapılmazsa çökmeye mahkumdur."
    },
    {
      en: "The unencrypted network is doomed to be breached eventually.",
      word: "be",
      trWord: "ihlal edilmeye",
      blankOptions: ["be", "being", "been", "to be"],
      tr: "Şifrelenmemiş ağ, eninde sonunda ihlal edilmeye mahkumdur."
    },
    {
      en: "Their startup was doomed to go bankrupt due to poor database management.",
      word: "go",
      trWord: "iflas etmeye",
      blankOptions: ["go", "going", "gone", "to go"],
      tr: "Girişimleri, kötü veritabanı yönetimi nedeniyle iflas etmeye mahkumdu."
    },
    {
      en: "The application was doomed to run slowly on older devices.",
      word: "run",
      trWord: "yavaş çalışmaya",
      blankOptions: ["run", "running", "ran", "to run"],
      tr: "Uygulama, eski cihazlarda yavaş çalışmaya mahkumdu."
    },
    {
      en: "Without automated tools, the operators were doomed to repeat the same compiling tasks.",
      word: "repeat",
      trWord: "tekrarlamaya",
      blankOptions: ["repeat", "repeating", "repeated", "to repeat"],
      tr: "Otomatik araçlar olmadan, operatörler aynı derleme görevlerini tekrarlamaya mahkumdular."
    },
    {
      en: "The outdated hardware was doomed to overheat under heavy workload.",
      word: "overheat",
      trWord: "aşırı ısınmaya",
      blankOptions: ["overheat", "overheating", "overheated", "to overheat"],
      tr: "Güncelliğini yitirmiş donanım, ağır iş yükü altında aşırı ısınmaya mahkumdu."
    }
  ],
  112: [
    {
      en: "The principal laboratory researcher is to go to the education ministry tomorrow.",
      word: "go",
      trWord: "gitmesi",
      blankOptions: ["go", "going", "gone", "to go"],
      tr: "Baş laboratuvar araştırmacısının yarın eğitim bakanlığına gitmesi planlanmaktadır."
    },
    {
      en: "The emergency committee meeting is to start at precisely nine o'clock tomorrow.",
      word: "start",
      trWord: "başlaması",
      blankOptions: ["start", "starting", "started", "to start"],
      tr: "Acil durum komitesi toplantısının yarın tam saat dokuzda başlaması planlanmaktadır."
    },
    {
      en: "The regional administrative council is to revise the strict security protocol next week.",
      word: "revise",
      trWord: "revize etmesi",
      blankOptions: ["revise", "revising", "revised", "to revise"],
      tr: "Bölgesel yönetim kurulunun önümüzdeki hafta sıkı güvenlik protokolünü revize etmesi planlanmaktadır."
    },
    {
      en: "The administrative team is to update the rules tomorrow.",
      word: "update",
      trWord: "güncelleyecektir",
      blankOptions: ["update", "updating", "updated", "to update"],
      tr: "Yönetim ekibi kuralları yarın güncelleyecektir."
    },
    {
      en: "You are to report any security breaches immediately.",
      word: "report",
      trWord: "bildirmek",
      blankOptions: ["report", "reporting", "reported", "to report"],
      tr: "Herhangi bir güvenlik ihlalini derhal bildirmek zorundasınız."
    },
    {
      en: "The new interface is to launch next week.",
      word: "launch",
      trWord: "yayına girmesi",
      blankOptions: ["launch", "launching", "launched", "to launch"],
      tr: "Yeni arayüzün önümüzdeki hafta yayına girmesi planlanmaktadır."
    },
    {
      en: "The chief investigator was to review the policy documents.",
      word: "review",
      trWord: "incelemesi",
      blankOptions: ["review", "reviewing", "reviewed", "to review"],
      tr: "Baş araştırmacının politika belgelerini incelemesi planlanmıştı."
    },
    {
      en: "Engineers were to complete the compiler tests yesterday.",
      word: "complete",
      trWord: "tamamlaması",
      blankOptions: ["complete", "completing", "completed", "to complete"],
      tr: "Mühendislerin derleyici testlerini dün tamamlaması planlanmıştı."
    },
    {
      en: "The software update is to launch on the production server tonight.",
      word: "launch",
      trWord: "yayına girmesi",
      blankOptions: ["launch", "launching", "launched", "to launch"],
      tr: "Yazılım güncellemesinin bu gece üretim sunucusunda yayına girmesi planlanmaktadır."
    },
    {
      en: "The research team was to publish their final empirical report last Monday.",
      word: "publish",
      trWord: "yayınlaması",
      blankOptions: ["publish", "publishing", "published", "to publish"],
      tr: "Araştırma ekibinin geçen Pazartesi son deneysel raporunu yayınlaması planlanmıştı."
    }
  ],
  113: [
    {
      en: "Technicians are not supposed to modify the system parameters on Sundays.",
      word: "modify",
      trWord: "değiştirmemesi",
      blankOptions: ["modify", "modifying", "modified", "to modify"],
      tr: "Teknisyenlerin Pazar günleri sistem parametrelerini değiştirmemesi gerekir."
    },
    {
      en: "We are not supposed to access the secure network area without biometric clearance.",
      word: "access",
      trWord: "erişmememiz",
      blankOptions: ["access", "accessing", "accessed", "to access"],
      tr: "Biyometrik izin olmadan güvenli ağ alanına erişmememiz gerekir."
    },
    {
      en: "This framework is supposed to be the best architectural solution in the sector.",
      word: "be",
      trWord: "olması",
      blankOptions: ["be", "being", "been", "to be"],
      tr: "Bu çerçevenin sektördeki en iyi mimari çözüm olması beklenir."
    },
    {
      en: "The analyst is supposed to evaluate comprehensive regional surveys with your inputs.",
      word: "evaluate",
      trWord: "değerlendirmesi",
      blankOptions: ["evaluate", "evaluating", "evaluated", "to evaluate"],
      tr: "Analistin sizin girdilerinizle kapsamlı bölgesel anketleri değerlendirmesi gerekir."
    },
    {
      en: "You are supposed to submit your historical system logs before Friday afternoon.",
      word: "submit",
      trWord: "göndermeniz",
      blankOptions: ["submit", "submitting", "submitted", "to submit"],
      tr: "Cuma öğleden önce geçmiş sistem günlüklerinizi göndermeniz gerekir."
    },
    {
      en: "Independent experts are supposed to wear identity badges inside the facility.",
      word: "wear",
      trWord: "takması",
      blankOptions: ["wear", "wearing", "worn", "to wear"],
      tr: "Bağımsız uzmanların tesis içinde kimlik kartı takması gerekir."
    },
    {
      en: "The software update was supposed to arrive at noon, but it is heavily delayed.",
      word: "arrive",
      trWord: "gelmesi",
      blankOptions: ["arrive", "arriving", "arrived", "to arrive"],
      tr: "Yazılım güncellemesinin öğlen gelmesi gerekiyordu, ancak çok gecikti."
    },
    {
      en: "Technicians are supposed to know the advanced encryption password of this central module.",
      word: "know",
      trWord: "bilmesi",
      blankOptions: ["know", "knowing", "known", "to know"],
      tr: "Teknisyenlerin bu merkezi modülün gelişmiş şifreleme şifresini bilmesi gerekir."
    },
    {
      en: "Institutional authorities are supposed to protect sensitive user information privacy.",
      word: "protect",
      trWord: "koruması",
      blankOptions: ["protect", "protecting", "protected", "to protect"],
      tr: "Kurumsal makamların hassas kullanıcı bilgilerinin gizliliğini koruması gerekir."
    },
    {
      en: "The legislative tax reform was supposed to be easy, but it took three months.",
      word: "be",
      trWord: "kolay olması",
      blankOptions: ["be", "being", "been", "to be"],
      tr: "Yasal vergi reformunun kolay olması gerekiyordu, ancak üç ay sürdü."
    }
  ],
  114: [
    {
      en: "The software team is unable to modify substantial empirical inputs at the moment.",
      word: "modify",
      trWord: "değiştirememektedir",
      blankOptions: ["modify", "modifying", "modified", "to modify"],
      tr: "Yazılım ekibi şu anda önemli deneysel girdileri değiştirememektedir."
    },
    {
      en: "Independent technical experts were unable to explain the investigative project scope yesterday.",
      word: "explain",
      trWord: "açıklayamadı",
      blankOptions: ["explain", "explaining", "explained", "to explain"],
      tr: "Bağımsız teknik uzmanlar dün araştırma projesi kapsamını açıklayamadı."
    },
    {
      en: "Government agencies are unable to process the newly collected empirical data securely.",
      word: "process",
      trWord: "işleyememektedir",
      blankOptions: ["process", "processing", "processed", "to process"],
      tr: "Devlet kurumları yeni toplanan deneysel verileri güvenli bir şekilde işleyememektedir."
    },
    {
      en: "Technicians were unable to deploy an automated background script during the system blackout.",
      word: "deploy",
      trWord: "çalıştıramadı",
      blankOptions: ["deploy", "deploying", "deployed", "to deploy"],
      tr: "Teknisyenler sistem kesintisi sırasında otomatik bir arka plan betiği çalıştıramadı."
    },
    {
      en: "The internal board is unable to call an emergency committee meeting this week.",
      word: "call",
      trWord: "çağıramamaktadır",
      blankOptions: ["call", "calling", "called", "to call"],
      tr: "İç kurul bu hafta acil komite toplantısı çağıramamaktadır."
    },
    {
      en: "Heavy machinery was unable to modify its technical system parameters under high pressure.",
      word: "modify",
      trWord: "değiştiremedi",
      blankOptions: ["modify", "modifying", "modified", "to modify"],
      tr: "Ağır makineler yüksek basınç altında teknik sistem parametrelerini değiştiremedi."
    },
    {
      en: "Senior financial analysts are unable to anticipate significant annual financial growth.",
      word: "anticipate",
      trWord: "tahmin edememektedir",
      blankOptions: ["anticipate", "anticipating", "anticipated", "to anticipate"],
      tr: "Kıdemli finansal analistler önemli yıllık finansal büyümeyi tahmin edememektedir."
    },
    {
      en: "The education ministry was unable to organize a specialized local committee last semester.",
      word: "organize",
      trWord: "düzenleyemedi",
      blankOptions: ["organize", "organizing", "organized", "to organize"],
      tr: "Eğitim bakanlığı geçen dönem özel bir yerel komite düzenleyemedi."
    },
    {
      en: "Engineers are unable to stabilize crucial internal device components without additional tools.",
      word: "stabilize",
      trWord: "stabilize edememektedir",
      blankOptions: ["stabilize", "stabilizing", "stabilized", "to stabilize"],
      tr: "Mühendisler ek araçlar olmadan kritik dahili cihaz bileşenlerini stabilize edememektedir."
    },
    {
      en: "The evaluation committee was unable to determine where to shift separate international research funds.",
      word: "determine",
      trWord: "belirleyemedi",
      blankOptions: ["determine", "determining", "determined", "to determine"],
      tr: "Değerlendirme komitesi ayrı uluslararası araştırma fonlarının nereye aktarılacağını belirleyemedi."
    }
  ],
  115: [
    {
      en: "The technician was about to deploy the script when the structural anomaly occurred.",
      word: "deploy",
      trWord: "çalıştırmak",
      blankOptions: ["deploy", "deploying", "deployed", "to deploy"],
      tr: "Yapısal anomali meydana geldiğinde teknisyen betiği çalıştırmak üzereydi."
    },
    {
      en: "The software team is about to optimize the centralized cloud database modules.",
      word: "optimize",
      trWord: "optimize etmek",
      blankOptions: ["optimize", "optimizing", "optimized", "to optimize"],
      tr: "Yazılım ekibi merkezi bulut veritabanı modüllerini optimize etmek üzeredir."
    },
    {
      en: "Technicians are about to induce a safe system emergency reset right now.",
      word: "induce",
      trWord: "başlatmak",
      blankOptions: ["induce", "inducing", "induced", "to induce"],
      tr: "Teknisyenler şu anda güvenli bir sistem acil durum sıfırlaması başlatmak üzeredir."
    },
    {
      en: "The system is about to reboot automatically.",
      word: "reboot",
      trWord: "yeniden başlamak",
      blankOptions: ["reboot", "rebooting", "rebooted", "to reboot"],
      tr: "Sistem otomatik olarak yeniden başlamak üzeredir."
    },
    {
      en: "The team is about to deploy the application to Vercel.",
      word: "deploy",
      trWord: "dağıtmak",
      blankOptions: ["deploy", "deploying", "deployed", "to deploy"],
      tr: "Ekip uygulamayı Vercel'e dağıtmak üzeredir."
    },
    {
      en: "I was about to modify the security protocols when the database crashed.",
      word: "modify",
      trWord: "değiştirmek",
      blankOptions: ["modify", "modifying", "modified", "to modify"],
      tr: "Veritabanı çöktüğünde güvenlik protokollerini değiştirmek üzereydim."
    },
    {
      en: "The operators were about to launch the migration process.",
      word: "launch",
      trWord: "başlatmak",
      blankOptions: ["launch", "launching", "launched", "to launch"],
      tr: "Operatörler taşıma işlemini başlatmak üzereydiler."
    },
    {
      en: "The software is about to execute the backup routine.",
      word: "execute",
      trWord: "çalıştırmak",
      blankOptions: ["execute", "executing", "executed", "to execute"],
      tr: "Yazılım yedekleme rutinini çalıştırmak üzeredir."
    },
    {
      en: "The compiler was about to complete the process when the network disconnected.",
      word: "complete",
      trWord: "tamamlamak",
      blankOptions: ["complete", "completing", "completed", "to complete"],
      tr: "Ağ bağlantısı kesildiğinde derleyici işlemi tamamlamak üzereydi."
    },
    {
      en: "We were about to run the automated diagnostic script.",
      word: "run",
      trWord: "çalıştırmak",
      blankOptions: ["run", "running", "ran", "to run"],
      tr: "Otomatik teşhis betiğini çalıştırmak üzereydik."
    }
  ],
  116: [
    {
      en: "The developer is certain to fix the memory leak.",
      word: "fix",
      trWord: "düzelteceği",
      blankOptions: ["fix", "fixing", "fixed", "to fix"],
      tr: "Geliştiricinin bellek sızıntısını düzelteceği kesindir."
    },
    {
      en: "The security updates are certain to block external attacks.",
      word: "block",
      trWord: "engelleyeceği",
      blankOptions: ["block", "blocking", "blocked", "to block"],
      tr: "Güvenlik güncellemelerinin dış saldırıları engelleyeceği kesindir."
    },
    {
      en: "The simulation was certain to succeed after the configuration change.",
      word: "succeed",
      trWord: "başarılı olacağı",
      blankOptions: ["succeed", "succeeding", "succeeded", "to succeed"],
      tr: "Simülasyonun yapılandırma değişikliğinden sonra başarılı olacağı kesindi."
    },
    {
      en: "The automatic framework is certain to optimize the queries.",
      word: "optimize",
      trWord: "optimize edeceği",
      blankOptions: ["optimize", "optimizing", "optimized", "to optimize"],
      tr: "Otomatik altyapının sorguları optimize edeceği kesindir."
    },
    {
      en: "The operators were certain to detect the network latency.",
      word: "detect",
      trWord: "tespit edeceği",
      blankOptions: ["detect", "detecting", "detected", "to detect"],
      tr: "Operatörlerin ağ gecikmesini tespit edeceği kesindi."
    },
    {
      en: "The team is certain to complete the database migration on time.",
      word: "complete",
      trWord: "tamamlayacağı",
      blankOptions: ["complete", "completing", "completed", "to complete"],
      tr: "Ekibin veritabanı taşıma işlemini zamanında tamamlayacağı kesindir."
    },
    {
      en: "Advanced algorithms are certain to identify any structural anomaly.",
      word: "identify",
      trWord: "tespit edeceği",
      blankOptions: ["identify", "identifying", "identified", "to identify"],
      tr: "Gelişmiş algoritmaların herhangi bir yapısal anomaliyi tespit edeceği kesindir."
    },
    {
      en: "The new interface is certain to improve user interaction metrics.",
      word: "improve",
      trWord: "iyileştireceği",
      blankOptions: ["improve", "improving", "improved", "to improve"],
      tr: "Yeni arayüzün kullanıcı etkileşim metriklerini iyileştireceği kesindir."
    },
    {
      en: "Auditors are certain to flag the unencrypted database password.",
      word: "flag",
      trWord: "işaretleyeceği",
      blankOptions: ["flag", "flagging", "flagged", "to flag"],
      tr: "Denetçilerin şifrelenmemiş veritabanı şifresini işaretleyeceği kesindir."
    },
    {
      en: "Technicians are certain to restart the server after the crash.",
      word: "restart",
      trWord: "yeniden başlatacağı",
      blankOptions: ["restart", "restarting", "restarted", "to restart"],
      tr: "Teknisyenlerin çöküşten sonra sunucuyu yeniden başlatacağı kesindir."
    }
  ]
};

function buildLessonExercises(sentences, lessonId) {
  if (lessonId === 117) {
    const allSents = [];
    for (let l = 102; l <= 116; l++) {
      allSents.push(...unit103SentenceData[l]);
    }
    const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
    const shuffledSents = shuffle(allSents).slice(0, 60);
    
    const highlightTarget = (sentence, word) => {
      const regex = new RegExp('\\b' + word + '\\b', 'i');
      return sentence.replace(regex, '<span style="color: #ff6b6b; font-weight: bold;">$&</span>');
    };

    const makeQuestion = (sA, type, idx, exId) => {
      const qId = "u103l117_ex" + exId + "_q" + (idx + 1);
      if (!sA) return null;
      
      if (type === "fill-blank" || type === "fill-blank-dropdown") {
        const blankedSentence = sA.en.replace(new RegExp('\\b' + sA.word + '\\b', 'i'), "___");
        let highlighted = blankedSentence;
        const cues = ["is used to", "are used to", "am used to", "was used to", "were used to", "got used to", "will get used to"];
        for (const cue of cues) {
          if (highlighted.includes(cue)) {
            highlighted = highlighted.replace(cue, '<span style="color: #ff6b6b; font-weight: bold;">' + cue + '</span>');
            break;
          }
        }
        const shuffledOptions = shuffle(sA.blankOptions);
        return {
          id: qId,
          type: type,
          prompt: type === "fill-blank" ? "Boşluğu doldur" : "Boşluğa gelecek en uygun kelimeyi seçin:",
          sentence: highlighted,
          options: shuffledOptions,
          correctIndex: shuffledOptions.indexOf(sA.word),
          translation: sA.tr
        };
      }
      
      if (type === "word-bank") {
        const targetWords = sA.en.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
        const allOtherEnWords = allSents.map(s => s.en.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))).flat();
        const uniqueDistractors = [...new Set(allOtherEnWords)].filter(w => !targetWords.includes(w));
        const shuffledDistractors = shuffle(uniqueDistractors);
        while (shuffledDistractors.length < 3) {
          shuffledDistractors.push("the");
        }
        const words = shuffle([...targetWords, shuffledDistractors[0], shuffledDistractors[1], shuffledDistractors[2]]);
        return {
          id: qId,
          type: "word-bank",
          prompt: "Cümle bloklarını doğru sıraya koyarak İngilizce akademik cümleyi oluşturun:",
          translation: sA.tr,
          words: words,
          correctOrder: targetWords,
          enSentence: sA.en,
          isEngToTr: false
        };
      }
      
      if (type === "multiple-choice") {
        const isEnToTr = Math.random() > 0.5;
        if (isEnToTr) {
          const wrongOptions = shuffle(allSents.filter(s => s.en !== sA.en).map(s => s.tr)).slice(0, 3);
          const options = shuffle([sA.tr, ...wrongOptions]);
          return {
            id: qId,
            type: "multiple-choice",
            prompt: "Cümlenin doğru Türkçe çevirisini seçin:",
            sentence: highlightTarget(sA.en, sA.word),
            options: options,
            correctIndex: options.indexOf(sA.tr)
          };
        } else {
          const wrongOptions = shuffle(allSents.filter(s => s.en !== sA.en).map(s => s.en)).slice(0, 3);
          const options = shuffle([sA.en, ...wrongOptions]);
          return {
            id: qId,
            type: "multiple-choice",
            prompt: "Cümlenin doğru İngilizce çevirisini seçin:",
            sentence: sA.tr,
            options: options.map(opt => highlightTarget(opt, sA.word)),
            correctIndex: options.indexOf(sA.en)
          };
        }
      }
      
      if (type === "translation-text") {
        return {
          id: qId,
          type: "translation-text",
          prompt: '"' + sA.en + '" ifadesini Türkçe\'ye çevirin:',
          correctSentence: sA.tr
        };
      }
    };

    const exTypes1_5 = [
      "fill-blank", "fill-blank-dropdown", "word-bank",
      "fill-blank", "fill-blank-dropdown", "word-bank",
      "fill-blank", "fill-blank-dropdown", "translation-text", "translation-text"
    ];

    const exTypes2_6 = [
      "multiple-choice", "word-bank", "multiple-choice", "word-bank",
      "multiple-choice", "word-bank", "multiple-choice", "fill-blank",
      "translation-text", "translation-text"
    ];

    const ex1Questions = Array.from({ length: 10 }, (_, idx) => makeQuestion(shuffledSents[idx], exTypes1_5[idx], idx, 1));
    const ex2Questions = Array.from({ length: 10 }, (_, idx) => makeQuestion(shuffledSents[10 + idx], exTypes2_6[idx], idx, 2));
    const ex3Questions = Array.from({ length: 10 }, (_, idx) => makeQuestion(shuffledSents[20 + idx], exTypes1_5[idx], idx, 3));
    const ex4Questions = Array.from({ length: 10 }, (_, idx) => makeQuestion(shuffledSents[30 + idx], exTypes2_6[idx], idx, 4));
    const ex5Questions = Array.from({ length: 10 }, (_, idx) => makeQuestion(shuffledSents[40 + idx], exTypes1_5[idx], idx, 5));
    const ex6Questions = Array.from({ length: 10 }, (_, idx) => makeQuestion(shuffledSents[50 + idx], exTypes2_6[idx], idx, 6));

    return [
      {
        id: "u103l117ex1",
        title: "Alıştırma 1: Karma Test I",
        description: "Tüm öbeksel kiplerden karışık genel tarama ve gramer pratikleri.",
        questions: ex1Questions
      },
      {
        id: "u103l117ex2",
        title: "Alıştırma 2: Karma Test II",
        description: "Karışık cümlelerde anlam ve çeviri çalışmaları.",
        questions: ex2Questions
      },
      {
        id: "u103l117ex3",
        title: "Alıştırma 3: Karma Test III",
        description: "İleri düzey yapılarla genel pekiştirme ve kelime bankası çalışmaları.",
        questions: ex3Questions
      },
      {
        id: "u103l117ex4",
        title: "Alıştırma 4: Karma Test IV",
        description: "Çeviri ve çoktan seçmeli sorularla tarama testleri.",
        questions: ex4Questions
      },
      {
        id: "u103l117ex5",
        title: "Alıştırma 5: Karma Test V",
        description: "Gramer ve cümle yapısını pekiştirme çalışmaları.",
        questions: ex5Questions
      },
      {
        id: "u103l117ex6",
        title: "Alıştırma 6: Karma Test VI",
        description: "Karma konulardan oluşan serbest çeviri ve yazım testleri.",
        questions: ex6Questions
      }
    ];
  }
  const sorted = [...sentences].sort((a, b) => a.en.length - b.en.length);
  const numSents = sorted.length;
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
  
  const highlightTarget = (sentence, word) => {
    const regex = new RegExp('\\b' + word + '\\b', 'i');
    return sentence.replace(regex, '<span style="color: #ff6b6b; font-weight: bold;">$&</span>');
  };

  const makeQuestion = (sA, type, idx, exId) => {
    const qId = "u103l" + lessonId + "_ex" + exId + "_q" + (idx + 1);
    
    if (type === "fill-blank" || type === "fill-blank-dropdown") {
      const blankedSentence = sA.en.replace(new RegExp('\\b' + sA.word + '\\b', 'i'), "___");
      let highlighted = blankedSentence;
      
      const cues = ["is used to", "are used to", "am used to", "was used to", "were used to", "got used to", "will get used to"];
      for (const cue of cues) {
        if (highlighted.includes(cue)) {
          highlighted = highlighted.replace(cue, '<span style="color: #ff6b6b; font-weight: bold;">' + cue + '</span>');
          break;
        }
      }

      const shuffledOptions = shuffle(sA.blankOptions);
      return {
        id: qId,
        type: type,
        prompt: type === "fill-blank" ? "Boşluğu doldur" : "Boşluğa gelecek en uygun kelimeyi seçin:",
        sentence: highlighted,
        options: shuffledOptions,
        correctIndex: shuffledOptions.indexOf(sA.word),
        translation: sA.tr
      };
    }
    
    if (type === "word-bank") {
      const targetWords = sA.en.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
      const allOtherEnWords = sorted.map(s => s.en.split(/\s+/).map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""))).flat();
      const uniqueDistractors = [...new Set(allOtherEnWords)].filter(w => !targetWords.includes(w));
      const shuffledDistractors = shuffle(uniqueDistractors);
      while (shuffledDistractors.length < 3) {
        shuffledDistractors.push("the");
      }
      const words = shuffle([...targetWords, shuffledDistractors[0], shuffledDistractors[1], shuffledDistractors[2]]);
      return {
        id: qId,
        type: "word-bank",
        prompt: "Cümle bloklarını doğru sıraya koyarak İngilizce akademik cümleyi oluşturun:",
        translation: sA.tr,
        words: words,
        correctOrder: targetWords,
        enSentence: sA.en,
        isEngToTr: false
      };
    }
    
    if (type === "multiple-choice") {
      const isEnToTr = Math.random() > 0.5;
      if (isEnToTr) {
        const allUnitSents = Object.values(unit103SentenceData).flat();
        const wrongOptions = shuffle(allUnitSents.filter(s => s.en !== sA.en).map(s => s.tr)).slice(0, 3);
        const options = shuffle([sA.tr, ...wrongOptions]);
        return {
          id: qId,
          type: "multiple-choice",
          prompt: "Cümlenin doğru Türkçe çevirisini seçin:",
          sentence: highlightTarget(sA.en, sA.word),
          options: options,
          correctIndex: options.indexOf(sA.tr)
        };
      } else {
        const allUnitSents = Object.values(unit103SentenceData).flat();
        const wrongOptions = shuffle(allUnitSents.filter(s => s.en !== sA.en).map(s => s.en)).slice(0, 3);
        const options = shuffle([sA.en, ...wrongOptions]);
        return {
          id: qId,
          type: "multiple-choice",
          prompt: "Cümlenin doğru İngilizce çevirisini seçin:",
          sentence: sA.tr,
          options: options.map(opt => highlightTarget(opt, sA.word)),
          correctIndex: options.indexOf(sA.en)
        };
      }
    }
    
    if (type === "translation-text") {
      return {
        id: qId,
        type: "translation-text",
        prompt: '"' + sA.en + '" ifadesini Türkçe\'ye çevirin:',
        correctSentence: sA.tr
      };
    }
  };

  const ex1Types = [
    "fill-blank", "fill-blank-dropdown", "word-bank",
    "fill-blank", "fill-blank-dropdown", "word-bank",
    "fill-blank", "fill-blank-dropdown", "translation-text", "translation-text"
  ];

  const ex2Types = [
    "multiple-choice", "word-bank", "multiple-choice", "word-bank",
    "multiple-choice", "word-bank", "multiple-choice", "fill-blank",
    "translation-text", "translation-text"
  ];

  const ex3Types = [
    "fill-blank", "fill-blank-dropdown", "multiple-choice",
    "fill-blank", "fill-blank-dropdown", "multiple-choice",
    "word-bank", "word-bank", "translation-text", "translation-text"
  ];

  const ex4Types = [
    "multiple-choice", "fill-blank", "word-bank",
    "multiple-choice", "fill-blank", "word-bank",
    "multiple-choice", "word-bank", "translation-text", "translation-text"
  ];

  const ex1Questions = Array.from({ length: 10 }, (_, idx) => makeQuestion(sorted[idx % numSents], ex1Types[idx], idx, 1));
  const ex2Questions = Array.from({ length: 10 }, (_, idx) => makeQuestion(sorted[idx % numSents], ex2Types[idx], idx, 2));
  const ex3Questions = Array.from({ length: 10 }, (_, idx) => makeQuestion(sorted[idx % numSents], ex3Types[idx], idx, 3));
  const ex4Questions = Array.from({ length: 10 }, (_, idx) => makeQuestion(sorted[idx % numSents], ex4Types[idx], idx, 4));

  const modalNames = {
    102: "be used to",
    103: "be accustomed to",
    104: "be willing to",
    105: "be unwilling to",
    106: "be reluctant to",
    107: "be likely to",
    108: "be unlikely to",
    109: "be bound to",
    110: "be certain to",
    111: "be doomed to",
    112: "be to",
    113: "be supposed to",
    114: "be unable to",
    115: "be about to",
    116: "be certain to"
  };
  const modalName = modalNames[lessonId] || "phrasal modal";

  return [
    {
      id: "u103l" + lessonId + "ex1",
      title: "Alıştırma 1: " + modalName + " I",
      description: "Basit ve yaygın akademik cümle yapılarıyla gramer ve kelime pratikleri.",
      questions: ex1Questions
    },
    {
      id: "u103l" + lessonId + "ex2",
      title: "Alıştırma 2: " + modalName + " II",
      description: "Akademik cümlelerde anlam ve Türkçe-İngilizce çeviri çalışmaları.",
      questions: ex2Questions
    },
    {
      id: "u103l" + lessonId + "ex3",
      title: "Alıştırma 3: " + modalName + " III",
      description: "İleri düzey yapılarla pekiştirme ve kelime yerleştirme çalışmaları.",
      questions: ex3Questions
    },
    {
      id: "u103l" + lessonId + "ex4",
      title: "Alıştırma 4: " + modalName + " IV",
      description: "Bölüm sonu değerlendirme ve serbest çeviri testleri.",
      questions: ex4Questions
    }
  ];
}

const L95_tr = [
  "Şu anda şiddetli yağmur simülasyon alanını etkiliyor.",
  "Şu anda merkez sunucu kullanıcı kimlik bilgilerini doğruluyor.",
  "Akademik ekip şu anda yeni cihazı test ediyor.",
  "Araştırma tesisi şu anda ek finansal kaynaklar gerektiriyor.",
  "Şu anda derleyici veri bloklarını işliyor.",
  "Sistem şu anda benzersiz bir kriptografik anahtar üretiyor.",
  "Şu anda otomatik sistem basınç parametrelerini izliyor.",
  "Bugünlerde kamu laboratuvarları güvenlik protokollerini ayarlıyor.",
  "Bugünlerde yerel kurumlar kendi iç yasalarını değiştiriyor.",
  "Günümüzde yazılım geliştiriciler oyunlaştırılmış mobil tasarım desenlerini tercih ediyor.",
  "Uluslararası araştırma tesisi, ikincil yapısal çerçevelerini optimize etmek için şu anda ek finansal kaynaklar gerektiriyor.",
  "Şu anda, ağ güvenlik duvarı harici trafiği engellerken derleyici veri bloklarını işliyor.",
  "Bugünlerde, kötü amaçlı yazılım saldırıları hassas dosyaları tehdit ettiği için kamu laboratuvarları güvenlik protokollerini ayarlıyor.",
  "Sistem, yönetici doğrulama izni verir vermez şu anda benzersiz bir kriptografik anahtar üretiyor.",
  "Günümüzde yazılım geliştiriciler, öğrencilerin karmaşık dilbilgisini kolayca öğrenebilmesi için oyunlaştırılmış mobil tasarım desenlerini tercih ediyor.",
  "Şu anda merkez sunucu, önceki giriş isteklerinin bozuk olması gerekçesiyle kullanıcı kimlik bilgilerini doğruluyor.",
  "Şu anda otomatik sistem, endüstriyel mekanik pistonun beklenmedik şekilde arızalanmaması için basınç parametrelerini izliyor.",
  "Bugünlerde, bölgesel çevre düzenlemelerinin daha katı hale gelmesi nedeniyle yerel kurumlar kendi iç yasalarını değiştiriyor.",
  "Akademik ekip, tam da orijinal matematiksel fizik formüllerinin öngördüğü gibi şu anda yeni cihazı test ediyor.",
  "Şu anda şiddetli yağmur simülasyon alanını etkiliyor; bu nedenle, saha operasyonları geçici olarak durduruldu."
];

const L96_tr = [
  "Dün şiddetli bir yağmur simülasyon alanını etkiledi.",
  "Dün merkez sunucu tüm kullanıcı kimlik bilgilerini doğruladı.",
  "Akademik ekip yeni cihaz testini 2020'de tamamladı.",
  "Araştırma tesisi dün veri tabanını başarıyla yükseltti.",
  "İki yıl önce derleyici veri bloklarını hatasız bir şekilde işledi.",
  "Sistem geçen hafta benzersiz bir kriptografik anahtar üretti.",
  "Otomatik sistem üç saat önce basınç parametrelerini izledi.",
  "Geçen ay kamu laboratuvarları güvenlik protokollerini ayarladı.",
  "Geçen yıl yerel kurumlar kendi iç yasalarını değiştirdi.",
  "2012'de yazılım geliştiriciler geleneksel mobil tasarım desenlerini tercih etti.",
  "Uluslararası araştırma tesisi, ikincil yapısal çerçevelerini optimize etmek için dün veri tabanını başarıyla yükseltti.",
  "İki yıl önce, ağ güvenlik duvarı harici trafiği engellerken derleyici veri bloklarını işledi.",
  "Geçen ay, kötü amaçlı yazılım saldırıları hassas dosyaları tehdit ettiği için kamu laboratuvarları güvenlik protokollerini ayarladı.",
  "Sistem, yönetici geçen hafta doğrulama izni verir vermez benzersiz bir kriptografik anahtar üretti.",
  "2012'de yazılım geliştiriciler, öğrencilerin temel dilbilgisini kolayca öğrenebilmesi için geleneksel mobil tasarım desenlerini tercih etti.",
  "Dün merkez sunucu, önceki giriş isteklerinin bozuk olması gerekçesiyle tüm kullanıcı kimlik bilgilerini doğruladı.",
  "Otomatik sistem, endüstriyel mekanik pistonun beklenmedik şekilde arızalanmaması için üç saat önce basınç parametrelerini izledi.",
  "Geçen yıl, bölgesel çevre düzenlemelerinin daha katı hale gelmesi nedeniyle yerel kurumlar iç yasalarını değiştirdi.",
  "Akademik ekip, tam da orijinal matematiksel fizik formüllerinin öngördüğü gibi yeni cihaz testini 2020'de tamamladı.",
  "Dün, şiddetli bir yağmur simülasyon alanını etkiledi; bu nedenle, saha operasyonları geçici olarak durduruldu."
];

const L97_tr = [
  "Şu ana kadar şiddetli yağmur simülasyon alanını etkiledi.",
  "Merkez sunucu kullanıcı kimlik bilgilerini henüz doğruladı.",
  "2020'den beri akademik ekip yeni cihazı test etti.",
  "Araştırma tesisi son zamanlarda ek finansal kaynaklara ihtiyaç duydu.",
  "Şu ana kadar derleyici tüm veri bloklarını işledi.",
  "Sistem zaten benzersiz bir kriptografik anahtar üretti.",
  "Ekip projeye başladığından beri otomatik sistem basınç parametrelerini izledi.",
  "Son zamanlarda kamu laboratuvarları güvenlik protokollerini ayarladı.",
  "Son zamanlarda yerel kurumlar kendi iç yasalarını değiştirdi.",
  "Şu ana kadar yazılım geliştiriciler oyunlaştırılmış mobil tasarım desenlerini tercih etti.",
  "Uluslararası araştırma tesisi, ikincil yapısal çerçevelerini optimize etmek için son zamanlarda ek finansal kaynaklara ihtiyaç duydu.",
  "Şu ana kadar, ağ güvenlik duvarı harici trafiği engellerken derleyici veri bloklarını işledi.",
  "Son zamanlarda, kötü amaçlı yazılım saldırıları hassas dosyaları tehdit ettiği için kamu laboratuvarları güvenlik protokollerini ayarladı.",
  "Sistem, yönetici doğrulama izni verdiğinden beri benzersiz bir kriptografik anahtar üretti.",
  "Şu ana kadar yazılım geliştiriciler, öğrencilerin karmaşık dilbilgisini kolayca öğrenebilmesi için oyunlaştırılmış mobil tasarım desenlerini tercih etti.",
  "Merkez sunucu, önceki giriş isteklerinin bozuk olması gerekçesiyle kullanıcı kimlik bilgilerini henüz doğruladı.",
  "Deney başladığından beri otomatik sistem, endüstriyel mekanik pistonun beklenmedik şekilde arızalanmaması için basınç parametrelerini izledi.",
  "Son zamanlarda, bölgesel çevre düzenlemelerinin daha katı hale gelmesi nedeniyle yerel kurumlar iç yasalarını değiştirdi.",
  "2020'den beri akademik ekip, tam da orijinal matematiksel fizik formüllerinin öngördüğü gibi yeni cihazı test etti.",
  "Şu ana kadar, şiddetli yağmur simülasyon alanını etkiledi; bu nedenle, saha operasyonları geçici olarak durduruldu."
];

const L98_tr = [
  "Yeni yasa kabul edildiğinden beri şirket büyüdü.",
  "Bitkiler dikildiklerinden beri önemli ölçüde büyüdüler.",
  "Çocuklar okula başladıklarından beri dilbilgisi öğrendiler.",
  "Başkan seçildiğinden beri yönetim kurulu toplantı yapmadı.",
  "Tasarım yapıldığından beri düzen değişmedi.",
  "Ekipman kurulduğundan beri işler kolaylaştı.",
  "Sunucu çöktüğünden beri kullanıcılar hatalar yaşadı.",
  "Teknoloji firması açıldığından beri otomasyon arttı.",
  "Kış başladığından beri sıcaklıklar dalgalandı.",
  "Finansal piyasa gerilediğinden beri karlar düştü.",
  "Yasama meclisi tarafından yeni yasa kabul edildiğinden beri şirket dijital ticaret operasyonlarını genişletti.",
  "Bitkiler, son derece kontrollü laboratuvar sera ortamına dikildiklerinden beri önemli ölçüde büyüdüler.",
  "Çocuklar, oyunlaştırılmış tasarımlara sahip mobil uygulamaları kullanmaya başladıklarından beri dilbilgisi kurallarını daha hızlı öğrendiler.",
  "İç yönetimsel çatışmalar çözülmeden kaldığı için, başkan seçildiğinden beri yönetim kurulu toplantı yapmadı.",
  "Birkaç ön uç geliştirici görsel arayüz güncellemeleri talep etmesine rağmen, tasarım yapıldığından beri düzen değişmedi.",
  "Teknik altyapı şubesi tarafından elektronik ekipman kurulduğundan beri işler büyük ölçüde kolaylaştı.",
  "Sunucu çöktüğünden beri, veri jetonu üretimlerinin geçici olarak askıya alınmasına neden olan hatalar kullanıcılar tarafından yaşandı.",
  "Teknoloji firması açıldığından beri otomasyon hızla arttı ve manuel operasyonlardaki kurumsal harcamaları azalttı.",
  "Kış başladığından beri sıcaklıklar dalgalandı ve oda içindeki devam eden kimyasal simülasyon modellerini etkiledi.",
  "Beklenmedik uluslararası ticaret kısıtlamaları nedeniyle finansal piyasa gerilediğinden beri karlar düştü."
];

const L99_tr = [
  "Biz vardığımızda çoğu insan ayrılmıştı.",
  "Biz eve vardığımızda çocuklar yatmış olacaklar.",
  "Mühendisler hatayı bulana kadar kötü amaçlı yazılım yayılmıştı.",
  "Derleyici tamamlayana kadar sunucu onu kaydetmiş olacak.",
  "Fırtına dindiğinde köprü çökmüştü.",
  "Yasa yürürlüğe girene kadar firmalar uyum sağlamış olacaklar.",
  "Fonları aldıklarında proje sona ermişti.",
  "Siz kapıyı açana kadar sistem aktif hale gelmiş olacak.",
  "Güneş battığında araştırma ekibi ayrılmıştı.",
  "Uygulama piyasaya çıkana kadar ekip onu test etmiş olacak.",
  "Biz şirket merkezine vardığımızda yönetim kurulu üyelerinin çoğu acil toplantıdan ayrılmıştı.",
  "Laboratuvardan eve vardığımızda, geç saat olması nedeniyle çocuklar yatmış olacaklar.",
  "Mühendisler yapısal hatayı bulana kadar, dinamik kötü amaçlı yazılım ikincil ağ bölümlerine yayılmıştı.",
  "Derleyici kod optimizasyonunu tamamlayana kadar, yedek sunucu yapılandırma ölçümlerini kaydetmiş olacak.",
  "Şiddetli kıyı fırtınası dindiğinde, antik köprü yapısı coşkun nehre çökmüştü.",
  "Yeni yasama yasası yürürlüğe girene kadar, kurumsal firmalar veri gizliliği politikalarını ayarlamış olacaklar.",
  "Üniversite araştırma fonlarını aldıklarında, biyoloji projesi malzeme eksikliği nedeniyle sona ermişti.",
  "Siz laboratuvar kapısını açana kadar, otomatik güvenlik sistemi giriş takip algoritmasını aktif hale getirmiş olacak.",
  "Güneş volkanik dağların ardında batana kadar, saha araştırma ekibi değerlendirme alanından ayrılmıştı.",
  "Mobil uygulama küresel olarak piyasaya sürülene kadar, mühendislik ekibi tüm temel API modüllerini test etmiş olacak."
];

const L100_tr = [
  "Geliştirme ekibinin bellek sızıntısını düzeltme zamanı geldi.",
  "Yönetimin güvenlik yasalarını güncelleme zamanı geldi de geçiyor.",
  "Teknik operatörlerin ana sunucuyu yeniden başlatma zamanı geldi.",
  "Hükümetin fabrika karbon emisyonlarını azaltma zamanı geldi de geçiyor.",
  "Baş araştırmacının istatistiksel verileri derleme zamanı geldi.",
  "Geliştirme ekibinin bellek sızıntısını düzeltme zamanı geldi.",
  "Yönetimin güvenlik yasalarını güncelleme zamanı geldi de geçiyor.",
  "Teknik operatörlerin ana sunucuyu yeniden başlatma zamanı geldi.",
  "Hükümetin fabrika karbon emisyonlarını azaltma zamanı geldi de geçiyor.",
  "Baş araştırmacının istatistiksel verileri derleme zamanı geldi.",
  "Geliştirme ekibinin eski uygulama bileşenlerini yeniden yapılandırma zamanı geldi de geçiyor.",
  "Üniversitenin gerekli proje fonlarını sağlama zamanı geldi.",
  "Saha ekibinin beton temeli güçlendirme zamanı geldi de geçiyor.",
  "Derleyicinin kaynak kod dosyalarını optimize etme zamanı geldi.",
  "Şirketlerin uyum politikası uzmanlarını işe alma zamanı geldi de geçiyor.",
  "Kullanıcılar sürekli gezinme gecikmesi yaşadığından, geliştirme ekibinin arka plan bellek sızıntısını düzeltme zamanı geldi.",
  "Endüstriyel mekanik piston arızaları sıklıkla meydana geldiği için, yönetimin güvenlik yasalarını güncelleme zamanı geldi de geçiyor.",
  "Güvenli kriptografik jeton üretimi yeniden başlayabilsin diye, teknik operatörlerin ana sunucuyu yeniden başlatma zamanı geldi.",
  "Uluslararası çevre sınırlarının karşılanabilmesi için, hükümetin fabrika karbon emisyonlarını azaltma zamanı geldi de geçiyor.",
  "Yönetim kurulu yıllık performans raporunu talep etmeden önce, baş araştırmacının istatistiksel verileri derleme zamanı geldi."
];

const L101_tr = [
  "Bu, bu yıl okuduğum en iyi akademik makaledir.",
  "Bu, derleyici ekibinin birlikte izlediği ilk filmdir.",
  "Bu, bugüne kadar yaşadığımız en kötü yazılım çöküşüdür.",
  "Bu, algoritmanın kabul ettiği tek yapılandırma seçeneğidir.",
  "Bu, onların inşa ettiği en karmaşık simülasyon modelidir.",
  "Bu, bu yıl okuduğum en iyi akademik makaledir.",
  "Bu, derleyici ekibinin birlikte izlediği ilk filmdir.",
  "Bu, bugüne kadar yaşadığımız en kötü yazılım çöküşüdür.",
  "Bu, algoritmanın kabul ettiği tek yapılandırma seçeneğidir.",
  "Bu, onların inşa ettiği en karmaşık simülasyon modelidir.",
  "Merkez bankasının faizleri ilk kez artırmasıdır.",
  "Bu, araştırmacının elde ettiği en iyi moleküler görselleştirmedir.",
  "Bu, meclisin kabul ettiği en zorlu yasadır.",
  "Bu, sunucunun şimdiye kadar ürettiği tek güvenli jetondur.",
  "Bu, fabrikanın ürettiği en verimli motordur.",
  "Yenilikçi disiplinler arası metodolojisi son derece net olduğu için bu, bu yıl okuduğum en iyi akademik makaledir.",
  "Yeni teknolojik tesise taşındıklarından beri bu, derleyici ekibinin birlikte izlediği ilk filmdir.",
  "Birincil bölümlerdeki ciddi bir veritabanı taşması nedeniyle bu, bugüne kadar yaşadığımız en kötü yazılım çöküşüdür.",
  "Geliştiriciler birkaç alternatif kod dizisi sağlamasına rağmen, bu, algoritmanın kabul ettiği tek yapılandırma seçeneğidir.",
  "Tektonik plaka basınç değişikliklerinin değerlendirilebilmesi için bu, onların inşa ettiği en karmaşık simülasyon modelidir."
];

function buildExercises(rawList, lessonId) {
  if (lessonId >= 102 && lessonId <= 117) {
    return buildLessonExercises(unit103SentenceData[lessonId], lessonId);
  }
  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
  
  const autoHighlight = (rawQ, lessonId) => {
    if (rawQ.type === "multiple-fill-blank") return rawQ.sentence;
    
    let sentence = rawQ.sentence;
    if (sentence.includes('style=')) return sentence;
    
    const correctWord = rawQ.options[0];
    
    const knownAdverbs = [
      "at the moment", "at present", "right now", "currently", "presently", "these days", "nowadays",
      "yesterday", "in", "in 2020", "in 2012", "ago", "last", "last week", "last month", "last year",
      "so far", "recently", "since", "yet", "already", "up to", "up to now", "just", "lately", "so"
    ];
    
    const cw = correctWord.toLowerCase().trim();
    const isAdverbQuestion = knownAdverbs.includes(cw);
    
    if (lessonId === 95) {
      const adverbs = ["At the moment", "At present", "Right now", "currently", "presently", "These days", "Nowadays"];
      const verbs = ["is affecting", "is validating", "testing", "requires", "is processing", "is generating", "is monitoring", "are adjusting", "are altering", "prefer", "is testing"];
      
      if (isAdverbQuestion) {
        for (const verb of verbs) {
          if (sentence.includes(verb)) {
            sentence = sentence.replace(verb, `<span style="color: #ff6b6b; font-weight: bold;">${verb}</span>`);
            break;
          }
        }
        if (sentence.includes("is ___ testing")) {
          sentence = sentence.replace("is ___ testing", `<span style="color: #ff6b6b; font-weight: bold;">is</span> ___ <span style="color: #ff6b6b; font-weight: bold;">testing</span>`);
        }
        if (sentence.includes("is ___ generating")) {
          sentence = sentence.replace("is ___ generating", `<span style="color: #ff6b6b; font-weight: bold;">is</span> ___ <span style="color: #ff6b6b; font-weight: bold;">generating</span>`);
        }
        if (sentence.includes("are ___ altering")) {
          sentence = sentence.replace("are ___ altering", `<span style="color: #ff6b6b; font-weight: bold;">are</span> ___ <span style="color: #ff6b6b; font-weight: bold;">altering</span>`);
        }
        if (sentence.includes("are ___ adjusting")) {
          sentence = sentence.replace("are ___ adjusting", `<span style="color: #ff6b6b; font-weight: bold;">are</span> ___ <span style="color: #ff6b6b; font-weight: bold;">adjusting</span>`);
        }
      } else {
        for (const adv of adverbs) {
          const idx = sentence.toLowerCase().indexOf(adv.toLowerCase());
          if (idx !== -1) {
            const originalAdv = sentence.substring(idx, idx + adv.length);
            sentence = sentence.replace(originalAdv, `<span style="color: #ff6b6b; font-weight: bold;">${originalAdv}</span>`);
            break;
          }
        }
      }
    }
    
    if (lessonId === 96) {
      const adverbs = ["yesterday", "Yesterday", "in 2020", "in 2012", "Two years ago", "Two years", "three hours ago", "last week", "last month", "Last month", "last year", "Last year"];
      const verbs = ["affected", "validated", "completed", "upgraded", "processed", "generated", "monitored", "adjusted", "altered", "preferred"];
      
      if (isAdverbQuestion) {
        for (const verb of verbs) {
          if (sentence.includes(verb)) {
            sentence = sentence.replace(verb, `<span style="color: #ff6b6b; font-weight: bold;">${verb}</span>`);
            break;
          }
        }
      } else {
        for (const adv of adverbs) {
          const idx = sentence.toLowerCase().indexOf(adv.toLowerCase());
          if (idx !== -1) {
            const originalAdv = sentence.substring(idx, idx + adv.length);
            sentence = sentence.replace(originalAdv, `<span style="color: #ff6b6b; font-weight: bold;">${originalAdv}</span>`);
            break;
          }
        }
      }
    }

    if (lessonId === 97) {
      const adverbs = ["so far", "recently", "since", "yet", "already", "up to now", "up to", "lately", "Lately"];
      const verbs = [
        "has affected", "has validated", "has completed", "has upgraded", "has processed", "has generated", "has monitored",
        "have adjusted", "have altered", "have preferred", "has tested", "has required", "has recently required", "have threatened", "have been"
      ];
      
      if (isAdverbQuestion) {
        for (const verb of verbs) {
          if (sentence.includes(verb)) {
            sentence = sentence.replace(verb, `<span style="color: #ff6b6b; font-weight: bold;">${verb}</span>`);
            break;
          }
        }
        if (sentence.includes("has ___ affected")) {
          sentence = sentence.replace("has ___ affected", `<span style="color: #ff6b6b; font-weight: bold;">has</span> ___ <span style="color: #ff6b6b; font-weight: bold;">affected</span>`);
        }
        if (sentence.includes("has ___ validated")) {
          sentence = sentence.replace("has ___ validated", `<span style="color: #ff6b6b; font-weight: bold;">has</span> ___ <span style="color: #ff6b6b; font-weight: bold;">validated</span>`);
        }
        if (sentence.includes("has ___ completed")) {
          sentence = sentence.replace("has ___ completed", `<span style="color: #ff6b6b; font-weight: bold;">has</span> ___ <span style="color: #ff6b6b; font-weight: bold;">completed</span>`);
        }
        if (sentence.includes("has ___ upgraded")) {
          sentence = sentence.replace("has ___ upgraded", `<span style="color: #ff6b6b; font-weight: bold;">has</span> ___ <span style="color: #ff6b6b; font-weight: bold;">upgraded</span>`);
        }
        if (sentence.includes("has ___ processed")) {
          sentence = sentence.replace("has ___ processed", `<span style="color: #ff6b6b; font-weight: bold;">has</span> ___ <span style="color: #ff6b6b; font-weight: bold;">processed</span>`);
        }
        if (sentence.includes("has ___ generated")) {
          sentence = sentence.replace("has ___ generated", `<span style="color: #ff6b6b; font-weight: bold;">has</span> ___ <span style="color: #ff6b6b; font-weight: bold;">generated</span>`);
        }
        if (sentence.includes("has ___ monitored")) {
          sentence = sentence.replace("has ___ monitored", `<span style="color: #ff6b6b; font-weight: bold;">has</span> ___ <span style="color: #ff6b6b; font-weight: bold;">monitored</span>`);
        }
        if (sentence.includes("have ___ adjusted")) {
          sentence = sentence.replace("have ___ adjusted", `<span style="color: #ff6b6b; font-weight: bold;">have</span> ___ <span style="color: #ff6b6b; font-weight: bold;">adjusted</span>`);
        }
        if (sentence.includes("have ___ altered")) {
          sentence = sentence.replace("have ___ altered", `<span style="color: #ff6b6b; font-weight: bold;">have</span> ___ <span style="color: #ff6b6b; font-weight: bold;">altered</span>`);
        }
        if (sentence.includes("have ___ preferred")) {
          sentence = sentence.replace("have ___ preferred", `<span style="color: #ff6b6b; font-weight: bold;">have</span> ___ <span style="color: #ff6b6b; font-weight: bold;">preferred</span>`);
        }
      } else {
        for (const adv of adverbs) {
          const idx = sentence.toLowerCase().indexOf(adv.toLowerCase());
          if (idx !== -1) {
            const originalAdv = sentence.substring(idx, idx + adv.length);
            sentence = sentence.replace(originalAdv, `<span style="color: #ff6b6b; font-weight: bold;">${originalAdv}</span>`);
            break;
          }
        }
      }
    }
    if (lessonId === 102) {
      const markers = [
        "is used to", "are used to", "am used to", "was used to", "were used to",
        "is accustomed to", "are accustomed to", "am accustomed to", "was accustomed to", "were accustomed to"
      ];
      const gerunds = [
        "processing", "operating", "refactoring", "handling", "compiling"
      ];
      
      const isGerundQuestion = gerunds.some(g => g === cw);
      
      if (isGerundQuestion) {
        for (const marker of markers) {
          if (sentence.includes(marker)) {
            sentence = sentence.replace(marker, `<span style="color: #ff6b6b; font-weight: bold;">${marker}</span>`);
            break;
          }
        }
      } else {
        for (const gerund of gerunds) {
          if (sentence.includes(gerund)) {
            sentence = sentence.replace(gerund, `<span style="color: #ff6b6b; font-weight: bold;">${gerund}</span>`);
            break;
          }
        }
      }
    }
    
    return sentence;
  };
  
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
        sentence: autoHighlight(rawQ, lessonId),
        options: shuffledOptions,
        correctIndex: shuffledOptions.indexOf(correctOption)
      };
    }
  };

  const getExerciseQuestions = (rawSubList, lessonId, exId) => {
    const mcQs = rawSubList.filter(q => q.type !== "multiple-fill-blank");
    const fbQs = rawSubList.filter(q => q.type === "multiple-fill-blank");
    const sorted = [...mcQs, ...fbQs];
    
    const getTranslationIndex = (idx) => {
      if (idx < 10) return idx;
      if (idx < 15) return idx - 5;
      if (idx < 20) return idx - 15;
      if (idx < 25) return idx - 10;
      if (idx < 30) return idx - 15;
      if (idx < 35) return idx - 15;
      return idx - 20;
    };

    return sorted.map((q, idx) => {
      const origIdx = rawList.indexOf(q);
      const trIdx = getTranslationIndex(origIdx);
      const translation = lessonId === 95 ? L95_tr[trIdx] :
                          lessonId === 96 ? L96_tr[trIdx] :
                          lessonId === 97 ? L97_tr[trIdx] :
                          lessonId === 98 ? L98_tr[trIdx] :
                          lessonId === 99 ? L99_tr[trIdx] :
                          lessonId === 100 ? L100_tr[trIdx] :
                          lessonId === 101 ? L101_tr[trIdx] :
                          lessonId === 102 ? L102_tr[trIdx] : undefined;
      const processed = processQuestion(q, `u${unitPrefixId}l${lessonId}_ex${exId}_q${idx + 1}`);
      if (translation && processed.type !== "multiple-fill-blank") {
        processed.translation = translation;
      }
      return processed;
    });
  };

  const unitPrefixId = lessonId === 102 ? 103 : (lessonId < 98 ? 102 : 101);
  return [
    {
      id: `u${unitPrefixId}l${lessonId}ex1`,
      title: lessonId === 95 ? "Alıştırma 1: Şimdiki Zaman & Süreç Zarfları I" :
             lessonId === 96 ? "Alıştırma 1: Di'li Geçmiş Zaman & Tarihsel Zarflar I" :
             lessonId === 97 ? "Alıştırma 1: Yakın Geçmiş Zaman & Süreç Bağlaçları I" :
             lessonId === 98 ? "Alıştırma 1: \"Since\" Zaman Uyumu Kalıpları I" :
             lessonId === 99 ? "Alıştırma 1: \"By the time\" Zaman Uyumu Kalıpları I" :
             lessonId === 100 ? "Alıştırma 1: \"It is (high) time\" Kalıbı I" :
             lessonId === 102 ? "Alıştırma 1: be used to (Alışkın olmak) I" :
                                "Alıştırma 1: Süperlatif & Kısıtlayıcı Sıfatlar I",
      description: "Boşluk doldurma ve zaman zarfları pratikleri.",
      questions: getExerciseQuestions(rawList.slice(0, 10), lessonId, 1)
    },
    {
      id: `u${unitPrefixId}l${lessonId}ex2`,
      title: lessonId === 95 ? "Alıştırma 2: Şimdiki Zaman & Süreç Zarfları II" :
             lessonId === 96 ? "Alıştırma 2: Di'li Geçmiş Zaman & Tarihsel Zarflar II" :
             lessonId === 97 ? "Alıştırma 2: Yakın Geçmiş Zaman & Süreç Bağlaçları II" :
             lessonId === 98 ? "Alıştırma 2: \"Since\" Zaman Uyumu Kalıpları II" :
             lessonId === 99 ? "Alıştırma 2: \"By the time\" Zaman Uyumu Kalıpları II" :
             lessonId === 100 ? "Alıştırma 2: \"It is (high) time\" Kalıbı II" :
             lessonId === 102 ? "Alıştırma 2: be used to (Alışkın olmak) II" :
                                "Alıştırma 2: Süperlatif & Kısıtlayıcı Sıfatlar II",
      description: "Basit ve yaygın akademik cümle yapılarıyla zaman zarfı pratikleri.",
      questions: getExerciseQuestions(rawList.slice(10, 20), lessonId, 2)
    },
    {
      id: `u${unitPrefixId}l${lessonId}ex3`,
      title: lessonId === 95 ? "Alıştırma 3: Şimdiki Zaman & Süreç Zarfları III" :
             lessonId === 96 ? "Alıştırma 3: Di'li Geçmiş Zaman & Tarihsel Zarflar III" :
             lessonId === 97 ? "Alıştırma 3: Yakın Geçmiş Zaman & Süreç Bağlaçları III" :
             lessonId === 98 ? "Alıştırma 3: \"Since\" Zaman Uyumu Kalıpları III" :
             lessonId === 99 ? "Alıştırma 3: \"By the time\" Zaman Uyumu Kalıpları III" :
             lessonId === 100 ? "Alıştırma 3: \"It is (high) time\" Kalıbı III" :
             lessonId === 102 ? "Alıştırma 3: be used to (Alışkın olmak) III" : "Alıştırma 3: Süperlatif & Kısıtlayıcı Sıfatlar III",
      description: "Gelişmiş akademik yapılarda zaman bağlaçları ve kelime doldurma.",
      questions: getExerciseQuestions(rawList.slice(20, 30), lessonId, 3)
    },
    {
      id: `u${unitPrefixId}l${lessonId}ex4`,
      title: lessonId === 95 ? "Alıştırma 4: Şimdiki Zaman & Süreç Zarfları IV" :
             lessonId === 96 ? "Alıştırma 4: Di'li Geçmiş Zaman & Tarihsel Zarflar IV" :
             lessonId === 97 ? "Alıştırma 4: Yakın Geçmiş Zaman & Süreç Bağlaçları IV" :
             lessonId === 98 ? "Alıştırma 4: \"Since\" Zaman Uyumu Kalıpları IV" :
             lessonId === 99 ? "Alıştırma 4: \"By the time\" Zaman Uyumu Kalıpları IV" :
             lessonId === 100 ? "Alıştırma 4: \"It is (high) time\" Kalıbı IV" :
             lessonId === 102 ? "Alıştırma 4: be used to (Alışkın olmak) IV" : "Alıştırma 4: Süperlatif & Kısıtlayıcı Sıfatlar IV",
      description: "Bileşik akademik cümlelerde zaman uyumu ve çoklu boşluk doldurma pratikleri.",
      questions: getExerciseQuestions(rawList.slice(30, 40), lessonId, 4)
    }
  ];
}

const unit102Exercises = {
  1: { exercises: buildExercises(L95_raw, 95) },
  2: { exercises: buildExercises(L96_raw, 96) },
  3: { exercises: buildExercises(L97_raw, 97) }
};

const unit101Exercises = {
  1: { exercises: buildExercises(L98_raw, 98) },
  2: { exercises: buildExercises(L99_raw, 99) },
  3: { exercises: buildExercises(L100_raw, 100) },
  4: { exercises: buildExercises(L101_raw, 101) }
};

const unit103Exercises = {
  1: { exercises: buildExercises(null, 102) },
  2: { exercises: buildExercises(null, 103) },
  3: { exercises: buildExercises(null, 104) },
  4: { exercises: buildExercises(null, 105) },
  5: { exercises: buildExercises(null, 106) },
  6: { exercises: buildExercises(null, 107) },
  7: { exercises: buildExercises(null, 108) },
  8: { exercises: buildExercises(null, 109) },
  9: { exercises: buildExercises(null, 110) },
  10: { exercises: buildExercises(null, 111) },
  11: { exercises: buildExercises(null, 112) },
  12: { exercises: buildExercises(null, 113) },
  13: { exercises: buildExercises(null, 114) },
  14: { exercises: buildExercises(null, 115) },
  15: { exercises: buildExercises(null, 116) },
  16: { exercises: buildExercises(null, 117) }
};

const dataPath = '../data.js';
let content = fs.readFileSync(dataPath, 'utf8');

// 1. Replace the DENEME topic in rawTopics
const topicStartMarker = 'title: "Zaman Zarfları ve Zaman Uyumu",';
const topicStartIdx = content.indexOf(topicStartMarker);
if (topicStartIdx !== -1) {
  const openBraceIdx = content.lastIndexOf('{', topicStartIdx);
  const closeArrayIdx = content.indexOf('];', topicStartIdx);
  if (openBraceIdx !== -1 && closeArrayIdx !== -1) {
    const newTopicBlock = `{
    id: 102,
    title: "Zaman Zarfları ve Zaman Uyumu",
    desc: "Zaman Zarfları ve Zaman Uyumu Pratikleri",
    icon: "⏳",
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
  },
  {
    id: 101,
    title: "Zaman Uyumu: By the time, Since, İt is (high) time vs",
    desc: "Time-Link: Connectors & Tenses",
    icon: "🧪",
    numLessons: 4,
    formulas: [
      { formula: "Present Perfect + since + Past Simple", example: "The company <span style=\\"color: #51cf66; font-weight: bold;\\">has expanded</span> since the new law <span style=\\"color: #ff6b6b; font-weight: bold;\\">was passed</span>: Yeni yasa kabul edildiğinden beri şirket büyüdü.", description: "Since konnektörünün bağlandığı yan cümle geçmişteki eylemin kırılma/başlangıç noktasını bildirdiği için her zaman v2 (Past Simple) olurken; bu başlangıçtan günümüze kadar gelen süreci anlatan ana cümle have/has v3 (Present Perfect) yapısındadır." },
      { formula: "By the time + Past (V2), Past Perfect (Had V3) VEYA By the time + Present (V1), Future Perfect (Will Have V3)", example: "By the time we <span style=\\"color: #ff6b6b; font-weight: bold;\\">arrived</span>, most people <span style=\\"color: #da77f2; font-weight: bold;\\">had left</span>: Biz vardığımızda çoğu insan ayrılmıştı.", description: "By the time konnektörü geçmiş bir bağlama uygulandığında yan cümle v2 (Past Simple), ana cümle had v3 (Past Perfect) olur. Geleceğe bağlandığında ise yan cümle v1 (Present Simple / Geniş Zaman) olurken ana cümle will have v3 (Future Perfect) kombinasyonunu alır. Hedeflenen zaman sınırına ulaşıldığında bir eylemin çoktan gerçekleşmiş olduğunu matematiksel olarak garantiler." },
      { formula: "It is (high) time + Subject + V2 (Past Simple)", example: "It is high time the administration <span style=\\"color: #ff6b6b; font-weight: bold;\\">updated</span> the safety laws: Yönetimin güvenlik yasalarını güncelleme zamanı geldi de geçiyor.", description: "Bu kalıp, yapısal olarak it is time / it is high time + v2 (Past Simple) dizilimini zorunlu kılar. Anlam olarak şu ana (present) yönelik bir gecikmişlik, şikayet veya zorunluluk bildirse de dil bilgisi kuralı gereği eylem geçmiş zamandadır. Öğrencilerin en sık hata yaptığı yapısal tuzaklardan biridir." },
      { formula: "Superlative / Restrictive Adjective + Present Perfect (Have/Has V3)", example: "This is the best academic article I <span style=\\"color: #51cf66; font-weight: bold;\\">have read</span> this year: Bu, bu yıl okuduğum en iyi akademik makaledir.", description: "Bir özneye veya duruma yönelik en uç değerlendirmeyi yapan süperlatif veya kısıtlayıcı sıfat ifadelerinden sonra gelen cümle, hayat boyu edinilen birikimi ve deneyimi sorguladığı için have/has v3 (Present Perfect) yapısıyla kurulur. Akademik dilde eşsizlik ve deneyim kalitesi vurgulanırken kullanılır." }
    ],
    subtitles: [
      "\\\"Since\\\" Zaman Uyumu Kalıpları",
      "\\\"By the time\\\" Zaman Uyumu Kalıpları",
      "\\\"It is (high) time\\\" Kalıbı",
      "Süperlatif & Kısıtlayıcı Sıfatlar + Present Perfect"
    ]
  },
  {
    id: 103,
    title: "Öbeksel Kipler (Phrasal Modals)",
    desc: "15 Farklı Öbeksel Kip İle Alıştırmalar",
    icon: "🎯",
    numLessons: 16,
    formulas: [
      { formula: "Subject + Phrasal Modal + Verb", example: "The system administrator is accustomed to monitoring real-time network traffic: Sistem yöneticisi gerçek zamanlı ağ trafiğini izlemeye alışıktır.", description: "Öbeksel kipler (phrasal modals), anlam ve yapı olarak modal gibi davranan fakat yardımcı fiiller barındıran kalıplardır. Bazı yapılar arkasından V-ing alırken, bazıları yalın fiil (V1) gerektirir." }
    ],
    subtitles: [
      "be used to (-e alışkın olmak)",
      "be accustomed to (-e alışkın olmak)",
      "be willing to (... yapmaya istekli/gönüllü olmak)",
      "be unwilling to (... yapmaya isteksiz olmak)",
      "be reluctant to (... yapmaya gönülsüz olmak)",
      "be likely to (... yapması muhtemel olmak)",
      "be unlikely to (... yapması muhtemel olmamak)",
      "be bound to (... yapması kaçınılmaz/kesin olmak)",
      "be certain to (... yapacağı kesin olmak)",
      "be doomed to (kötü bir sona mahkum olmak)",
      "be to (-mesi planlanmak / -mek zorundadır)",
      "be supposed to (... yapması gerekir/beklenir)",
      "be unable to (-i yapamamak / yetersizlik)",
      "be about to (-mek üzere olmak)",
      "be certain to (kesinlikle ... yapacak olmak)",
      "Karma Test"
    ]
  }\n`;
    content = content.substring(0, openBraceIdx) + newTopicBlock + content.substring(closeArrayIdx);
  }
}

// 2. Re-read content because indices changed, then replace unitSentencesMap 0:
const mapStartIndex = content.indexOf('const unitSentencesMap = {');
if (mapStartIndex !== -1) {
  const openingBraceIndex = content.indexOf('{', mapStartIndex);
  let key0Index = content.indexOf('\n  0: ', openingBraceIndex);
  if (key0Index === -1) {
    key0Index = content.indexOf('\n  102: ', openingBraceIndex);
  }
  const key1Index = content.indexOf('\n  1: ', openingBraceIndex);
  
  if (key0Index !== -1 && key1Index !== -1) {
    const formattedObjStr = `\n  102: ${JSON.stringify(unit102Exercises, null, 2)},\n  101: ${JSON.stringify(unit101Exercises, null, 2)},\n  103: ${JSON.stringify(unit103Exercises, null, 2)},\n`;
    content = content.substring(0, key0Index) + formattedObjStr + content.substring(key1Index);
  }
}

fs.writeFileSync(dataPath, content);
console.log("Single-pass update of data.js successful!");
