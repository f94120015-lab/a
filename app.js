// ============================================================
// STATE YÖNETİMİ
// ============================================================
const STATE_KEY = 'amok_state_v1';
const USERS_KEY = 'amok_users_v1';
const HEARTS_REFILL_COST = 50;
const XP_PER_CORRECT = 10;
const MAX_HEARTS = 5;

let state = {
  username: null,
  isGuest: false,
  streak: 0,
  xp: 0,
  hearts: MAX_HEARTS,
  completedLessons: [],
  unlockedAchievements: [],
  lastActiveDate: null,
  nightOwlTriggered: false,
  perfectLessonTriggered: false,
  warriorTriggered: false,
  placementTaken: false,
  wrongQuestions: [],
  streakFreezeBought: false,
  activeTheme: 'canva',
  profilePhoto: null,
  dailyTasks: {
    lastResetDate: null,
    tasks: []
  },
  following: [
    { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
    { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' }
  ],
  followers: [
    { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
    { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' },
    { username: 'Sarah Connor', xp: 180, streak: 12, avatarColor: '#8BC6A0' },
    { username: 'Melis Şen', xp: 90, streak: 2, avatarColor: '#E8CB6E' }
  ]
};

// Quiz ve diğer durumlar
let currentLesson = null;
let currentQuizQuestions = [];
let currentQuestionIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let heartsAtStart = MAX_HEARTS;
let selectedAnswer = null;
let isAnswerChecked = false;
let matchState = null;
let autoAdvanceTimeout = null;
let homeScreenScrollY = 0;

// Ek mod durumları
let isPlacementMode = false;
let isReviewMode = false;
let reviewQuestions = [];
let placementQuestionsList = [];

// E-posta Bildirim Ayarları
const OBFUSCATED_EMAIL = "Zjk0MTIwMDE1QGdtYWlsLmNvbQ==";

// ============================================================
// KELİME SÖZLÜĞÜ VE HOVER ÇEVİRİ ALTYAPISI
// ============================================================
const wordDictionary = {

  "a": "bir",
  "abandoned": "terk edilmiş / terk edildi",
  "abolishing": "yürürlükten kaldırma / kaldırma",
  "about": "hakkında, yaklaşık",
  "absence": "yokluk / bulunmama",
  "absorbing": "emme / emici",
  "absorbs": "emer / soğurur",
  "academic": "akademik",
  "academy": "akademi",
  "accepted": "kabul etti",
  "access": "erişim",
  "accident": "kaza",
  "accommodates": "uyum sağlar",
  "account": "hesap",
  "accountant": "muhasebeci",
  "accounts": "hesaplar",
  "accumulated": "biriktirilmiş / biriktirildi",
  "accumulates": "biriktirir",
  "accumulating": "biriken / birikme",
  "accumulation": "birikim / birikme",
  "accuracy": "doğruluk / kesinlik",
  "accurate": "doğru",
  "accused": "suçlanan / suçlandı",
  "achievements": "başarılar",
  "acids": "asitler",
  "acquisition": "edinme / kazanım / elde etme",
  "across": "karşıdan karşıya / genelinde",
  "act": "yasa / kanun / eylem",
  "action": "eylem / hareket / eylemi",
  "active": "aktif",
  "activity": "faaliyet",
  "adapt": "uyum sağlamak / adapte olmak",
  "adaptable": "uyarlanabilir / uyumlu",
  "adaptation": "adaptasyon / uyum / adaptasyonu",
  "addressing": "hitap eden / değinen",
  "adds": "ekler",
  "adjust": "ayarlamak / düzenlemek",
  "adjusted": "ayarlanmış / ayarlandı",
  "adjusting": "ayarlama / ayarlayan",
  "administration": "yönetim / idare",
  "administrative": "idari",
  "adopting": "benimseme / benimseyen",
  "advanced": "ileri düzey",
  "advocate": "savunur",
  "advocated": "savunulan / savunuldu / savunulmaktadır",
  "affected": "etkiledi / etkilenmiş",
  "affecting": "etkileyen",
  "affects": "etkiler",
  "after": "sonra / -den sonra",
  "ago": "önce",
  "agree": "kabul etmek / katılmak / anlaşmak",
  "agreement": "anlaşma",
  "agreements": "anlaşmalar",
  "agriculture": "tarım / ziraat",
  "air": "hava",
  "airspace": "hava sahası",
  "algorithms": "algoritmalar / yöntemler",
  "all": "tüm, bütün, hepsi",
  "alliances": "ittifaklar",
  "allocated": "tahsis edilmiş",
  "allocating": "tahsis etme / tahsis eden",
  "allocation": "tahsis / paylaştırma",
  "allows": "sağlar / izin verir",
  "along": "boyunca",
  "also": "ayrıca / de",
  "alter": "değiştirmek / değişiklik yapmak",
  "altered": "değiştirilmiş / değiştirdi",
  "altering": "değiştirme / değiştiren",
  "alternating": "dönüşümlü / ardışık / dalgalı",
  "alternative": "alternatif",
  "alters": "değiştirir",
  "although": "-e rağmen / karşın",
  "ambiguity": "belirsizlik",
  "amendment": "değişiklik / yasa değişikliği",
  "america": "Amerika",
  "among": "arasında (ikiden fazla şeyin)",
  "an": "bir",
  "analysed": "analiz edilmiş",
  "analysis": "analiz / analizi",
  "analyst": "analist",
  "analysts": "analistler",
  "analytical": "analitik",
  "analyzed": "analiz edilmiş",
  "analyzing": "analiz etme / analiz eden",
  "ancient": "antik / eski",
  "and": "ve",
  "animal": "hayvan",
  "animals": "hayvanlar",
  "announced": "duyurdu / ilan etti",
  "annual": "yıllık",
  "anomaly": "anomali",
  "anonymous": "anonim / adsız",
  "another": "başka / diğer / bir diğeri",
  "answer": "cevap / yanıt",
  "answers": "cevaplar",
  "anticipated": "öngörülen / öngörüldü / öngörülmektedir",
  "anticipates": "öngörür",
  "any": "hiç, herhangi bir",
  "app": "uygulama",
  "appears": "görünür / ortaya çıkar",
  "application": "uygulama",
  "applications": "uygulamalar",
  "applied": "uygulamalı",
  "apply": "uygulamak",
  "appointment": "randevu",
  "approach": "yaklaşım",
  "approaches": "yaklaşımlar",
  "approved": "onayladı",
  "approving": "onaylayan",
  "architectural": "mimari",
  "archive": "arşiv",
  "are": "-dirler / -dırlar (olmak fiili)",
  "area": "alan / bölge",
  "areas": "alanlar / bölgeler",
  "argument": "argüman / tartışma",
  "arguments": "argümanlar",
  "arrangement": "düzenleme / diziliş",
  "article": "makale",
  "artificial": "yapay",
  "as": "olarak, gibi, -dikçe",
  "assess": "değerlendirmek / ölçmek",
  "assessing": "değerlendirme / değerlendiren",
  "assessment": "değerlendirme / değerlendirilmesi",
  "asset": "varlık",
  "assets": "varlıklar",
  "assignment": "ödev / görev",
  "assumption": "varsayım",
  "assumptions": "varsayımlar",
  "at": "-de / -da (noktasal konum / zaman)",
  "athlete": "sporcu / atlet",
  "atmosphere": "atmosfer",
  "atom": "atom",
  "atomic": "atomik",
  "attached": "ekli",
  "attention": "dikkat",
  "attention-grabbing": "ilgi çeken",
  "attract": "çekmek / cezbetmek",
  "audience": "dinleyiciler / izleyiciler",
  "audit": "denetim / teftiş",
  "author": "yazar",
  "authorities": "otoriteler / yetkililer",
  "authority": "otorite / yetki / yetkili",
  "authority-challenging": "otoriteye meydan okuyan",
  "authorizing": "yetki veren",
  "authors": "yazarlar",
  "automated": "otomatik",
  "automatic": "otomatik",
  "automatically": "otomatik olarak",
  "avoid": "kaçınmak / önlemek",
  "background": "arka plan",
  "backward": "geri kalmış / geri",
  "bacteria": "bakteri",
  "bad": "kötü",
  "badly": "kötü / fena şekilde",
  "badly-developed": "kötü gelişmiş",
  "balance": "bakiye",
  "balanced": "dengelenmiş / dengeledi",
  "bank": "banka",
  "base": "taban / üs",
  "basis": "temel / esas",
  "battery": "batarya / pil",
  "be": "olmak",
  "because": "çünkü / -den dolayı",
  "becomes": "olur / haline gelir",
  "been": "olunmuş / bulunmuş",
  "before": "önce / -den önce",
  "beginning": "başlayan",
  "behavior": "davranış",
  "beneficial": "faydalı / yararlı",
  "benefit": "fayda",
  "benefits": "faydalar",
  "best": "en iyi",
  "better": "daha iyi",
  "between": "arasında (iki şeyin)",
  "bias": "önyargı",
  "bilateral": "ikili",
  "binding": "bağlayıcı",
  "binds": "bağlar",
  "biologist": "biyolog",
  "black": "siyah / kara",
  "blood": "kan",
  "board": "kurul / yönetim kurulu",
  "bone": "kemik",
  "bones": "kemikler",
  "book": "kitap",
  "books": "kitaplar",
  "boosts": "canlandırır / artırır",
  "both": "her iki / ikisi de",
  "bottle": "şişe",
  "boundaries": "sınırlar",
  "boundary": "sınır",
  "brain": "beyin / beyni",
  "breakthrough": "dönüm noktası / ilerleme",
  "breath-taking": "nefes kesen",
  "brief": "özet",
  "broader": "daha geniş",
  "broken": "kırık / kırılmış",
  "budget": "bütçe",
  "building": "bina",
  "buildings": "binalar",
  "business": "iş / işletme",
  "but": "ama, fakat",
  "by": "tarafından, vasıtasıyla, -e göre",
  "caffeine-containing": "kafein içeren",
  "calculated": "hesaplanmış",
  "calculates": "hesaplar",
  "calendar": "takvim",
  "call": "arama / çağrı",
  "campaign": "kampanya",
  "can": "-ebilmek / -abilmek (yetenek / olasılık)",
  "candidate": "aday",
  "cannot": "yapamaz / edemez",
  "capacity": "kapasite / kapasitesini",
  "capital": "sermaye / başkent",
  "car": "araba / otomobil",
  "career": "kariyer",
  "career-defining": "kariyer belirleyici",
  "careful": "dikkatli",
  "carefully": "dikkatlice",
  "case": "durum / vaka / dava",
  "cataloged": "katalogladı / kaydetti",
  "categories": "kategoriler",
  "category": "kategori / sınıf",
  "cause": "sebep olmak / neden olmak",
  "caused": "sebep oldu / neden oldu",
  "causes": "nedenler / sebepler",
  "cell": "hücre",
  "cells": "hücreler",
  "cement": "çimento",
  "census": "nüfus sayımı",
  "center": "merkez / orta nokta",
  "central": "merkezi",
  "centralized": "merkezi",
  "centre": "merkez",
  "chain": "zincir",
  "challenges": "meydan okur / zorluklar",
  "challenging": "zorlu / zorlayıcı",
  "change": "değişiklik / değişim",
  "changed": "değiştirdi",
  "changes": "değişiklikler",
  "chapter": "bölüm",
  "chapters": "bölümler",
  "characteristic": "özellik / karakteristik",
  "characteristics": "özellikler / karakteristikler",
  "charts": "grafikler",
  "cheap": "ucuz",
  "checked": "kontrol etti",
  "chemical": "kimyasal",
  "chemist": "kimyager",
  "child": "çocuk",
  "children": "çocuklar",
  "chimney": "baca",
  "choice": "seçim / seçme",
  "chosen": "seçilmiş",
  "chronological": "kronolojik",
  "citizen": "vatandaş",
  "city": "şehir",
  "civilisation": "medeniyet",
  "clarified": "açıklanmış / netleştirilmiş / açıklandı",
  "clarifies": "netleştirir / açıklar",
  "clarify": "açıklar",
  "clarity": "netlik / açıklık",
  "classification": "sınıflandırma",
  "classified": "sınıflandırılmış",
  "classrooms": "sınıflar",
  "clause": "madde / fıkra",
  "clauses": "maddeler / fıkralar",
  "clean": "temiz",
  "clear": "açık / net",
  "clearly": "açıkça / net bir şekilde",
  "client": "müşteri",
  "clients": "müşteriler",
  "climate": "iklim",
  "climate-changing": "iklimi değiştiren",
  "closed": "kapalı",
  "closely": "yakından / sıkı sıkıya",
  "cloud": "bulut",
  "coal": "kömür",
  "cobalt": "kobalt",
  "code": "kod",
  "coding": "kodlama",
  "cold": "soğuk",
  "collapse": "çökmek / yıkılmak",
  "colleague": "meslektaş / iş arkadaşı",
  "colleagues": "meslektaşlar / iş arkadaşları",
  "collect": "toplamak / biriktirmek",
  "collected": "topladı / biriktirilmiş",
  "collection": "toplama",
  "colors": "renkler",
  "column": "sütun / kolon",
  "combined": "birleşik",
  "command": "komut / emir / kumanda",
  "commercial": "ticari",
  "committee": "komite",
  "commonly": "yaygın",
  "community": "topluluk",
  "companies": "şirketler",
  "company": "şirket / şirketi",
  "compare": "karşılaştırmak",
  "comparison": "karşılaştırma",
  "competing": "rekabet eden",
  "competitive": "rekabetçi",
  "completed": "tamamladı / tamamlanmış",
  "completely": "tamamen",
  "completion": "tamamlama / bitirme",
  "complex": "karmaşık",
  "complexity": "karmaşıklık / karmaşıklığı",
  "complications": "karmaşıklıklar / komplikasyonlar",
  "component": "bileşen / unsur",
  "components": "bileşenler / unsurlar",
  "composed": "oluşan / birleşen",
  "compound": "bileşik",
  "comprehensive": "kapsamlı",
  "compromise": "uzlaşma",
  "computer": "bilgisayar",
  "concentrated": "derişik / konsantre",
  "concentration": "konsantrasyon / yoğunluk",
  "concept": "kavram / kavramı",
  "concepts": "kavramlar",
  "conceptual": "kavramsal",
  "concerned": "endişeli / ilgili",
  "concluding": "sonuç / kapanış",
  "conclusion": "sonuç / sonuçlanma",
  "condition": "koşul / durum",
  "conditions": "koşullar / şartlar",
  "conduct": "davranış / yönetim / yürütme",
  "conducted": "yürüttü",
  "conducting": "yürüten / yürütme",
  "confirm": "onaylamak",
  "confirmed": "doğruladı",
  "conflict": "çatışma",
  "conflicting": "çelişen",
  "conflicts": "çatışmalar",
  "confusion": "kafa karışıklığı",
  "connect": "bağlamak",
  "connected": "bağlanmış",
  "connecting": "bağlayan",
  "connection": "bağlantı / bağlantısı",
  "consensus": "fikir birliği / uzlaşı",
  "consent": "onay / rıza",
  "consequences": "sonuçlar / sonuçları",
  "consistent": "tutarlı",
  "consisting": "oluşan",
  "consists": "oluşur",
  "constitution": "anayasa",
  "constitutional": "anayasal",
  "consumer": "tüketici",
  "contained": "bulunan / içeren",
  "container": "kap / kutu",
  "containing": "içeren",
  "contains": "içerir",
  "contents": "içerik / içindekiler",
  "context": "bağlam / bağlamı",
  "contexts": "bağlamlar",
  "contextual": "bağlamsal",
  "contextually": "bağlamsal olarak",
  "continuing": "devam eden",
  "continuous": "sürekli",
  "contract": "sözleşme",
  "contradicting": "çelişen",
  "contradicts": "çelişir",
  "contributing": "katkıda bulunan",
  "control": "kontrol / denetim",
  "controlled": "kontrol edilmiş",
  "controversial": "tartışmalı",
  "converting": "dönüştürme / dönüştüren",
  "convincing": "ikna edici",
  "cooked": "pişmiş / pişirilmiş",
  "cooling": "soğuma / soğutma",
  "cooperation": "işbirliği",
  "core": "öz / çekirdek / özü",
  "corner": "köşe",
  "corporate": "kurumsal",
  "corporation": "şirket / kurum",
  "corresponding": "karşılık gelen",
  "cost": "maliyet / masraf",
  "cost-reducing": "maliyeti düşüren",
  "cost-saving": "maliyet tasarrufu sağlayan",
  "costs": "maliyetler",
  "cotton": "pamuk",
  "could": "-ebilirdi / -ebildi",
  "council": "konsey / meclis",
  "countries": "ülkeler",
  "country": "ülke",
  "court": "mahkeme",
  "cover": "kapak / örtü",
  "covered": "kaplı / kaplanmış",
  "cow": "inek",
  "created": "oluşturdu",
  "creates": "yaratır / oluşturur",
  "creating": "yaratan / oluşturan",
  "creation": "oluşturulması / yaratılış / yaratılışı",
  "creative": "yaratıcı",
  "creator": "yaratıcı / yaratıcısı",
  "credit": "kredi",
  "crisis": "kriz",
  "criteria": "kriterler / ölçütler",
  "critical": "kritik / son derece önemli",
  "criticising": "eleştirmek",
  "criticized": "eleştirdi",
  "crucial": "çok önemli / hayati",
  "cryptographic": "kriptografik",
  "cultivating": "işleyen / ekip biçen",
  "cultural": "kültürel",
  "culture": "kültür",
  "cure": "tedavi / çare",
  "current": "akım / cereyan",
  "currents": "akımlar",
  "curriculum": "müfredat",
  "customer": "müşteri",
  "cut": "kesinti",
  "cutting": "kesme / kesmek",
  "cv": "özgeçmiş / CV",
  "damage": "hasar / hasarı",
  "danger": "tehlike",
  "data": "veri / verileri",
  "data-gathering": "veri toplayan",
  "data-processing": "veri işleyen",
  "database": "veritabanı",
  "day": "gün",
  "days": "günler",
  "debates": "tartışmalar",
  "debts": "borçlar",
  "decision": "karar",
  "decision-making": "karar alma",
  "decisions": "kararlar",
  "decline": "düşüş / azalma",
  "decreased": "azaltılmış",
  "decreasing": "azalan",
  "defendant": "davalı / sanık",
  "defense": "savunma",
  "deficiency": "eksiklik",
  "defined": "tanımlanmış",
  "defines": "tanımlar",
  "defining": "belirleyici",
  "definition": "tanım / tanımı",
  "degradation": "bozulma / bozunma",
  "degree": "derece",
  "delayed": "gecikmiş",
  "demand": "talep",
  "demanding": "talepkar",
  "demands": "talepler",
  "democracy": "demokrasi",
  "demographic": "demografik",
  "demonstrating": "gösteren / kanıtlayan",
  "densely": "yoğun olarak / yoğun bir şekilde",
  "department": "departman / bölüm",
  "departments": "departmanlar / bölümler",
  "depends": "bağlıdır",
  "derived": "türetilen / elde edilen / çıkarılan",
  "deriving": "türetme / türeten",
  "described": "tanımlanan / açıklandı",
  "describes": "tanımlar / açıklar",
  "describing": "tanımlayan / açıklayan",
  "description": "açıklama / tanım",
  "desert": "çöl",
  "design": "tasarım / tasarımı / tasarlamak",
  "design-simplifying": "tasarımı basitleştiren",
  "desire": "arzu / istek",
  "destroying": "yok etmek / mahvetmek",
  "detail": "detay / ayrıntı",
  "detailed": "detaylı / ayrıntılı",
  "details": "detaylar / ayrıntılar",
  "detected": "tespit edilen / tespit edildi",
  "detection": "tespit / algılama",
  "detects": "tespit ediyor",
  "determined": "belirlenmiş",
  "determining": "belirleyen",
  "develop": "geliştirmek",
  "developed": "gelişen / gelişti",
  "developing": "gelişen",
  "development": "geliştirme / gelişim",
  "device": "cihaz / aygıt",
  "devoting": "kendini adayan / adanan / tahsis edilen",
  "diagnosed": "teşhis etti / tanı koydu",
  "diagram": "diyagram / şema",
  "dialogue": "diyalog",
  "did": "yaptı (geçmiş zaman)",
  "diet": "diyet",
  "difference": "fark",
  "differences": "farklar",
  "different": "farklı",
  "differing": "farklı",
  "difficult": "zor",
  "difficulties": "zorluklar / zorlukları",
  "difficulty": "zorluk / zorluğu",
  "digital": "dijital",
  "dimensions": "boyutlar / boyutları",
  "diode": "diyot",
  "direction": "yön",
  "directly": "doğrudan / aracısız",
  "director": "direktör / müdür",
  "disabled": "devre dışı / engelli",
  "disadvantages": "dezavantajlar / dezavantajları",
  "disagreeing": "katılmayan / uyuşmayan",
  "disciplinary": "disiplin / disiplinsel",
  "discovered": "keşfedilmiş",
  "discovery": "keşif / keşfi",
  "discussion": "tartışma",
  "disease": "hastalık",
  "disease-causing": "hastalığa neden olan",
  "diseases": "hastalıklar",
  "dish": "yemek",
  "displayed": "görüntülendi / gösterildi",
  "distance": "mesafe",
  "distinguishing": "ayıran / ayırt edici",
  "distortion": "bozulma / çarpıtma",
  "distorts": "bozar",
  "distributed": "dağıtılmış",
  "distributing": "dağıtma / dağıtan",
  "distribution": "dağılım / dağılımı / dağıtma",
  "distributive": "dağıtımsal",
  "divided": "bölünmüş",
  "division": "bölünme / bölüm / bölünmesi",
  "do": "yapmak",
  "doctor": "doktor / hekim",
  "document": "belgelemek / belge",
  "does": "yapmak (3. tekil şahıs)",
  "domestic": "yerli / evcil",
  "domestically": "ülke içinde / yerel olarak",
  "dominant": "baskın",
  "dominating": "baskın",
  "done": "yapılmış, tamamlanmış",
  "down": "aşağı",
  "drafted": "hazırladı",
  "drink": "içmek",
  "drop": "düşüş / damla",
  "drug": "ilaç",
  "drugs": "ilaçlar / uyuşturucular",
  "due": "-den dolayı / bağlı",
  "duration": "süre / zaman / süresi",
  "during": "boyunca / esnasında",
  "dust": "toz",
  "dynamic": "dinamik",
  "dynamics": "dinamikler / dinamikleri",
  "each": "her / her biri",
  "easily": "kolayca / rahatlıkla",
  "east": "doğu",
  "easy": "kolay",
  "economic": "ekonomik",
  "economics": "ekonomi (bilim dalı)",
  "economies": "ekonomiler",
  "economists": "ekonomistler",
  "economy": "ekonomi / ekonomisi",
  "education": "eğitim",
  "educational": "eğitimsel / eğitim",
  "effectiveness": "etkililik / verimlilik",
  "effects": "etkiler",
  "efficiency": "verimlilik",
  "efficient": "verimli",
  "effort": "çaba / gayret",
  "efforts": "çabalar",
  "electrical": "elektrik / elektriksel",
  "electricity": "elektrik",
  "electricity-generating": "elektrik üreten",
  "electro-magnetic": "elektromanyetik",
  "electrode": "elektrot",
  "electrodes": "elektrotlar",
  "element": "öğe / element / elementi",
  "elements": "unsurlar / ögeler",
  "eliminates": "ortadan kaldırır / eler",
  "emergency": "acil durum / olağanüstü hal",
  "emerging": "gelişmekte olan",
  "emission": "emisyon",
  "emitted": "yayılan / salınan",
  "empirical": "deneysel",
  "empirically": "deneysel olarak / ampirik olarak",
  "employer": "işveren",
  "employers": "işverenler",
  "employment": "istihdam / istihdamı",
  "empty": "boş / boşaltmak",
  "encountered": "karşılaştı / karşılaşılan",
  "encountering": "karşılaşma / karşılaşan",
  "encourages": "teşvik eder / yüreklendirir",
  "encryption": "şifreleme",
  "end": "son / bitiş",
  "endangering": "tehlikeye atan",
  "energy": "enerji",
  "energy-consuming": "enerji tüketen",
  "enforcing": "uygulama / uygulayan",
  "engaged": "meşgul / uğraşan",
  "engineer": "mühendis",
  "engineers": "mühendisler",
  "england": "İngiltere",
  "english": "İngilizce",
  "enough": "yeterince / yeterli",
  "ensures": "sağlar / garanti eder",
  "entire": "tüm / bütün",
  "entities": "varlıklar",
  "environment": "çevre / ortam",
  "environment-protecting": "çevreyi koruyan",
  "environmental": "çevresel",
  "environmentalists": "çevreciler",
  "enzyme": "enzim",
  "equal": "eşit",
  "equality": "eşitlik",
  "equipment": "ekipman / malzeme",
  "erosion": "erozyon / aşınma",
  "error": "hata",
  "error-detecting": "hata tespit eden",
  "errors": "hatalar",
  "escaping": "sızan / kaçan",
  "essential": "esas / gerekli / temel",
  "establish": "kurmak / belirlemek",
  "established": "kurulmuş / kurdu",
  "establishing": "kuran / tesis eden",
  "estimate": "tahmin",
  "estimates": "tahminler",
  "estimating": "tahmin etmek / oranlamak",
  "estimation": "tahmin / kestirim",
  "ethics": "ahlak / etik",
  "europe": "Avrupa",
  "european": "avrupalı / avrupa",
  "evaluated": "değerlendirilmiş",
  "evaluates": "değerlendirir",
  "evaluating": "değerlendirme / değerlendiren",
  "evaluation": "değerlendirme / değerlendirilmesi",
  "events": "olaylar",
  "every": "her / her bir",
  "evidence": "kanıt",
  "evident": "bariz",
  "evolving": "gelişen",
  "exact": "kesin / tam",
  "examination": "sınav / muayene",
  "examine": "incelemek",
  "excavated": "kazılıp çıkarıldı / çıkarıldı",
  "excellent": "mükemmel",
  "exclude": "hariç tutmak",
  "excluded": "hariç tutmuş / hariç tuttu",
  "excluding": "hariç tutma / hariç tutan",
  "execution": "yürütme / uygulama",
  "executive": "yürütücü / yönetim",
  "exercise": "egzersiz / alıştırma",
  "exercises": "egzersizler / alıştırmalar",
  "exhibition": "sergi",
  "existing": "mevcut",
  "expanded": "genişletilmiş / genişletildi / genişletilmektedir",
  "expanding": "genişleyen",
  "expansion": "genişleme / yayılma",
  "expectancy": "beklenti",
  "expectation": "beklenti / beklentisi var",
  "expectations": "beklentiler",
  "expected": "beklenen",
  "expensive": "pahalı",
  "experience": "deneyim",
  "experiences": "yaşıyor",
  "experiment": "deney / deneyi",
  "experiments": "deneyler",
  "expert": "uzman",
  "experts": "uzmanlar",
  "explain": "açıklamak",
  "explained": "açıklanan / açıklandı",
  "explanation": "açıklama",
  "explanations": "açıklamalar",
  "explicit": "açık / net",
  "explicitly": "açıkça / net olarak",
  "explored": "keşfetti / araştırdı",
  "export": "ihracat / ihraç",
  "exported": "ihraç edilmiş / ihraç etti",
  "exporting": "ihraç etme / ihraç eden",
  "exposed": "maruz kalmış / açıkta kalmış",
  "exposes": "ortaya çıkarır",
  "expression": "ifade / dışa vurum",
  "extent": "boyut / ölçü / kapsam",
  "extracted": "çıkarılmış / çıkardı",
  "extracting": "çıkarma / çıkaran",
  "eye-opening": "göz açıcı",
  "face-saving": "itibar kurtaran",
  "faced": "karşılaştı / karşı karşıya kaldı",
  "faces": "karşı karşıyadır",
  "facilitated": "kolaylaştırdı",
  "facility": "tesis / kolaylık",
  "fact": "gerçek / olgu",
  "fact-finding": "gerçekleri araştırma",
  "factor": "faktör",
  "factories": "fabrikalar",
  "factors": "faktörler",
  "factory": "fabrika",
  "facts": "gerçekler",
  "falling": "düşen",
  "far": "uzak",
  "farm": "çiftlik",
  "farmer": "çiftçi",
  "fast": "hızlı",
  "fear": "korku",
  "feature": "özellik",
  "features": "özellikler",
  "feedback": "geri bildirim",
  "fever": "ateş",
  "few": "az / birkaç",
  "fields": "tarlalar / alanlar",
  "figures": "şahsiyetler / rakamlar",
  "film": "film",
  "final": "nihai / son",
  "finalized": "tamamladı",
  "finance": "finans / maliye",
  "financial": "finansal",
  "find": "bulmak",
  "finding": "bulgu",
  "finished": "bitmiş / tamamlanmış",
  "fire": "ateş",
  "firmly": "sağlam bir şekilde / sıkıca",
  "first": "ilk / birinci",
  "fixed": "sabit",
  "flask": "şişe / balon",
  "flaws": "kusurlar / hatalar",
  "flood": "sel",
  "floods": "seller",
  "fluctuating": "dalgalanan",
  "fluctuation": "dalgalanma",
  "flutter": "Flutter (mobil uygulama iskeleti)",
  "focus": "odaklanmak / odak / odağı",
  "follow": "takip etmek / uymak",
  "followed": "takip etti / izledi",
  "food": "yemek / gıda",
  "foods": "yiyecekler / gıdalar",
  "for": "için, -dir (süreç)",
  "force": "güç",
  "forested": "ormanlık",
  "forests": "ormanlar / ormanları",
  "formal": "resmi",
  "format": "format / biçim",
  "formats": "formatlar / biçimler",
  "forming": "oluşturma / oluşturan",
  "formula": "formül",
  "formulation": "formüle etme / biçimlendirme",
  "found": "buldu / bulunmuş",
  "foundation": "temel / vakıf",
  "framework": "çerçeve / çerçevesi / yapı",
  "freedom": "özgürlük",
  "freezes": "donar",
  "frequently": "sıklıkla / sık sık",
  "friday": "Cuma",
  "friend": "arkadaş",
  "from": "-den / -dan (itibaren, kaynak)",
  "front": "ön",
  "fully": "tamamen / tam olarak",
  "function": "işlev / fonksiyon / işlevi",
  "functional": "fonksiyonel",
  "functionality": "işlevsellik",
  "functions": "işlevler / çalışır",
  "funded": "finanse edilmiş / finanse etti",
  "funding": "fon / finansman",
  "funds": "fonlar / kaynaklar",
  "fungi": "mantarlar",
  "further": "daha fazla / ileri",
  "gamma": "gama",
  "gardener": "bahçıvan",
  "gas": "gaz / gazı",
  "gave": "verdi / yaptı",
  "general": "genel",
  "generated": "üretilen / oluşturulan",
  "generates": "üretir / oluşturur",
  "generating": "oluşturma / oluşturan",
  "genes": "genler",
  "genetically": "genetik olarak / genetiği",
  "germany": "Almanya",
  "gift": "hediye",
  "give": "vermek",
  "giving": "veren / yayan",
  "glass": "bardak / cam",
  "global": "küresel",
  "globally": "küresel çapta / dünya genelinde",
  "goals": "hedefler / amaçlar",
  "good": "iyi",
  "goods": "mallar / eşyalar",
  "got": "aldı / elde etti",
  "governing": "yöneten / yönetici",
  "government": "hükümet / devlet / hükümeti",
  "gradually": "kademeli olarak / yavaş yavaş",
  "granting": "sağlayan / veren",
  "graph": "grafik",
  "gravity": "yerçekimi / ağırlık",
  "greatly": "büyük ölçüde / çok",
  "ground": "yer / zemin / toprak",
  "group": "grup",
  "groups": "gruplar",
  "growing": "büyüyen / büyüyor / artan",
  "growth": "büyüme / gelişme",
  "growth-stimulating": "büyümeyi canlandıran",
  "guarantee": "garanti",
  "guaranteeing": "garanti eden",
  "guards": "görevliler / korumalar",
  "guidelines": "yönergeler / kılavuz ilkeler",
  "guilt": "suçluluk",
  "habit-forming": "alışkanlık yapan",
  "had": "sahip olmak (geçmiş) / -miş olmak",
  "half": "yarım / yarısı",
  "harmful": "zararlı",
  "harvested": "hasat etti / topladı",
  "has": "sahip olmak / -miş olmak",
  "have": "sahip olmak / -miş olmak",
  "hazard": "tehlike",
  "he": "o (erkek)",
  "head": "kafa / baş",
  "headphone": "kulaklık",
  "heart": "kalp",
  "heart-warming": "iç ısıtan",
  "heat": "ısı",
  "heat-conducting": "ısı ileten",
  "heavily": "ağır bir şekilde / yoğun olarak",
  "heavy": "şiddetli / ağır",
  "help": "yardım",
  "helps": "yardımcı olur",
  "her": "onun (kadın)",
  "here": "burada",
  "heritage": "miras",
  "hesitated": "tereddüt etti",
  "hidden": "gizli",
  "high": "yüksek",
  "highlights": "vurguluyor / vurgulamaktadır",
  "highly": "son derece / büyük ölçüde",
  "his": "onun (erkek)",
  "historic": "tarihi",
  "historical": "tarihsel / tarihi",
  "history": "tarih",
  "holds": "barındırır / tutar",
  "holiday": "tatil / tatili",
  "how": "nasıl",
  "hunger": "açlık",
  "hypotheses": "hipotezler",
  "hypothesis": "hipotez",
  "i": "ben",
  "idea": "fikir",
  "ideas": "fikirler",
  "identification": "tanımlama / belirleme",
  "identified": "belirlenmiş",
  "identify": "belirlemek / tanımlamak",
  "identifying": "belirleme / belirleyen",
  "identity": "kimlik",
  "if": "eğer, -se / -sa",
  "illustrated": "resimlenmiştir / örneklenmiştir",
  "illustrates": "gösterir",
  "image": "görüntü / resim",
  "images": "görüntüler / resimler",
  "immediate": "acil",
  "immediately": "hemen / derhal",
  "immigrant": "göçmen",
  "immigrants": "göçmenler",
  "impact": "etki / etkisi",
  "impending": "yaklaşan",
  "implement": "uygulamak",
  "implementation": "uygulama / yürürlüğe koyma",
  "importance": "önem / önemi",
  "important": "önemli",
  "imported": "ithal edilir / ithal edilmiş",
  "impressions": "izlenimler",
  "improved": "geliştirilmiş",
  "improves": "iyileştirir / geliştirir",
  "in": "içinde, -de / -da",
  "inactive": "aktif olmayan / geçersiz",
  "inappropriately": "uygunsuz şekilde / yersizce",
  "income": "gelir / geliri",
  "income-maximizing": "geliri maksimize eden",
  "inconsistencies": "tutarsızlıklar",
  "inconsistency": "tutarsızlık",
  "increased": "artırdı",
  "increases": "artırır",
  "increasing": "artan",
  "independent": "bağımsız",
  "index": "endeks",
  "indicative": "gösterge niteliğindeki",
  "indicator": "gösterge",
  "indicators": "göstergeler",
  "individual": "birey",
  "individuals": "bireyler",
  "induced": "yol açılmış / yol açıldı",
  "induces": "yol açar",
  "industries": "sanayiler / endüstriler",
  "industry": "endüstri / sanayi",
  "influence": "etki / nüfuz",
  "informal": "resmi olmayan",
  "information": "bilgi",
  "infrastructure": "altyapı",
  "inhabitants": "sakinleri / yaşayanlar",
  "inhabited": "insan yaşayan / yerleşilmiş",
  "initial": "başlangıç / ilk",
  "injury": "yaralanma / sakatlanma / zarar",
  "innovation": "yenilik",
  "innovations": "yenilikler",
  "innovative": "yenilikçi",
  "input": "girdi",
  "inputs": "girdiler",
  "insect": "böcek",
  "insects": "böcekler",
  "insights": "öngörüler",
  "inspect": "inceler",
  "inspected": "incelenen / incelendi / incelenmektedir",
  "instability": "istikrarsızlık",
  "institution": "kurum / kuruluş",
  "institutional": "kurumsal",
  "institutions": "kurumlar",
  "integrated": "entegre / bütünleşmiş",
  "integrating": "entegre etme / birleştiren",
  "integration": "entegrasyon / uyum",
  "intended": "amaçlanan",
  "intense": "yoğun",
  "intensity": "şiddet / yoğunluk",
  "interacting": "etkileşen",
  "interaction": "etkileşim",
  "interest": "ilgi",
  "interest-bearing": "faiz getiren",
  "interesting": "ilginç",
  "interface": "arayüz",
  "internal": "içsel / iç",
  "international": "uluslararası",
  "interpretation": "yorumlama / yorum / yorumlanması",
  "interpreted": "yorumlanmış / çevrilmiş",
  "interpreting": "yorumlama / yorumlayan",
  "intervened": "müdahale etti",
  "interview": "mülakat / görüşme",
  "interviewer": "görüşmeci / mülakatçı",
  "into": "içine doğru",
  "introduced": "uygulamaya konuldu / tanıtıldı",
  "introducing": "tanıtan / getiren",
  "invalidates": "geçersiz kılar",
  "invention": "icat",
  "inverter": "invertör / çevirici",
  "inverters": "invertörler / çeviriciler",
  "invested": "yatırım yapılmış",
  "investigate": "araştırmak",
  "investigation": "soruşturma",
  "investigative": "araştırmacı / soruşturmacı",
  "investment": "yatırım",
  "investment-supporting": "yatırımı destekleyen",
  "involves": "içerir / gerektirir",
  "irrelevant": "ilgisiz / alakasız",
  "is": "-dir / -dır (olmak fiili)",
  "isolated": "yalıtılmış",
  "isolates": "izole eder",
  "isolating": "izole etmek / yalıtmak",
  "issue": "sorun / konu",
  "issues": "sorunlar / meseleler",
  "it": "o (cansız / hayvan)",
  "italy": "italya",
  "its": "onun (cansız / hayvan)",
  "job": "iş / görev",
  "job-creating": "istihdam yaratan",
  "journal": "dergi / akademik dergi",
  "journalists": "gazeteciler",
  "json": "JSON (veri formatı)",
  "justification": "gerekçe / haklı çıkarma",
  "key": "anahtar / kilit",
  "kind": "tür / çeşit",
  "kingdom": "alem / krallık",
  "knowledge": "bilgi / birikim",
  "known": "bilinen",
  "labor": "iş / emek / çalışma",
  "labor-saving": "işgücü tasarrufu sağlayan",
  "laboratory": "laboratuvar",
  "labour": "iş / emek / çalışma",
  "lack": "eksiklik / yokluk",
  "lacking": "eksik / yoksun",
  "lacks": "yoksundur / eksiktir",
  "land": "kara / toprak / arazi",
  "language": "dil / lisan",
  "large": "büyük / çok sayıda",
  "last": "son / geçen",
  "lasting": "kalıcı",
  "law": "kanun / yasa",
  "law-abiding": "yasalara uyan",
  "laws": "kanunlar / yasalar",
  "lawyer": "avukat",
  "layers": "tabakalar / katmanlar",
  "lead": "kurşun / yönlendirmek",
  "leader": "lider",
  "leading": "öncü / önde gelen",
  "leak": "sızıntı",
  "learn": "öğrenmek",
  "learning": "öğrenmek / öğrenme",
  "leave": "ayrılmak / terk etmek",
  "leaves": "yapraklar",
  "lecture": "konferans / ders",
  "led": "yol açtı / götürdü",
  "leg": "bacak",
  "legal": "yasal",
  "legally": "yasal olarak",
  "legislation": "mevzuat / yasa koyma",
  "legislative": "yasal / yasama",
  "legs": "bacaklar / bacakları",
  "letters": "mektuplar",
  "level": "seviye",
  "levels": "seviyeler",
  "liability": "sorumluluk / yükümlülük",
  "library": "kütüphane",
  "life-saving": "hayat kurtaran",
  "light": "ışık",
  "light-absorbing": "ışık emen",
  "light-emitting": "ışık yayan",
  "like": "gibi, hoşlanmak",
  "limit": "sınır / sınırı",
  "limitations": "sınırlılıklar / limitler",
  "limiting": "sınırlayan",
  "line": "çizgi / hat",
  "linkage": "bağlantı / ilişki",
  "liquid": "sıvı / sıvısı",
  "list": "liste",
  "little": "az",
  "little-inhabited": "az yerleşilmiş",
  "live": "yaşamak",
  "lives": "hayatlar / yaşamlar",
  "living": "yaşam / hayat",
  "local": "yerel",
  "logic": "mantık",
  "logic-defying": "mantığa meydan okuyan",
  "logical": "mantıklı",
  "logs": "günlükler",
  "long": "uzun",
  "long-standing": "uzun süredir var olan",
  "long-term": "uzun vadeli",
  "loop": "döngü",
  "lose": "kaybetmek",
  "loss": "kayıp",
  "lost": "kaybetti / kaybolmuş",
  "lot": "çok / büyük miktar",
  "low": "düşük",
  "machine": "makine",
  "made": "yapılan / yapıldı",
  "mainstream": "ana akım",
  "maintain": "sürdürmek / bakımını yapmak",
  "maintained": "sürdürülmüş / korudu",
  "maintaining": "sürdürmek / korumak",
  "maintenance": "bakım",
  "major": "büyük / önemli",
  "majority": "çoğunluk",
  "malnutrition": "yetersiz beslenme",
  "man": "adam",
  "managed": "yönetilen / idare edilen",
  "management": "yönetim",
  "manager": "müdür / yönetici",
  "manipulated": "manipüle edilmiş / manipüle edildi",
  "manipulates": "manipüle eder",
  "manufacturing": "üretim",
  "many": "birçok / çok",
  "market": "piyasa / pazar / piyasası",
  "market-expanding": "pazarı büyüten",
  "markets": "pazarlar / piyasalar",
  "marks": "işaretler / izler",
  "massive": "devasa",
  "match": "maç / eşleşme",
  "matching": "eşleşen",
  "material": "malzeme / madde",
  "materials": "malzemeler / maddeler",
  "mathematical": "matematiksel",
  "matter": "madde / husus",
  "maximize": "maksimize eder",
  "maximized": "maksimize edilmiş / maksimize edildi",
  "maximum": "maksimum",
  "may": "-ebilir / -abilir (olasılık / izin)",
  "measure": "ölçmek / önlem",
  "measured": "ölçtü / ölçtüler",
  "measurement": "ölçüm / ölçme",
  "meat": "et",
  "media": "medya",
  "mediator": "arabulucu",
  "meet": "karşılaşmak / buluşmak / tanışmak",
  "members": "üyeler",
  "membership": "üyelik",
  "memory": "bellek",
  "memory-enhancing": "bellek geliştiren",
  "men": "adamlar",
  "met": "karşılaştı / tanıştı / karşılaştım / tanıştım",
  "metal": "metal",
  "metals": "metaller",
  "method": "yöntem / metot",
  "methodically": "yöntemli / düzenli olarak",
  "methodological": "metodolojik",
  "methodology": "metodoloji / yöntem bilim",
  "methods": "yöntemler",
  "micro-organisms": "mikroorganizmalar",
  "microscopic": "mikroskobik",
  "might": "-ebilir / -abilir (düşük olasılık)",
  "migration": "göç",
  "milder": "daha ılıman",
  "milk": "süt",
  "mind-boggling": "akıl almaz",
  "mine": "maden / benimki / çıkarmak",
  "minimized": "en aza indirilmiş / minimize etti",
  "minimizes": "en aza indirir / minimize eder",
  "mining": "madencilik / kömür çıkarma",
  "ministry": "bakanlık",
  "minorities": "azınlıklar",
  "misleading": "yanıltıcı",
  "mission": "görev",
  "mixed": "karışık",
  "mixture": "karışım",
  "mobile": "mobil",
  "model": "model",
  "modern": "modern",
  "modification": "modifikasyon / değişiklik / düzenleme",
  "modified": "değiştirilmiş",
  "modifies": "değiştirir",
  "modify": "değiştirmek / düzenlemek",
  "modifying": "değiştirme / değiştiren",
  "modules": "modüller",
  "molecules": "moleküller / molekülleri",
  "moments": "anlar",
  "money": "para",
  "money-making": "para kazandıran",
  "monitor": "izlemek / gözlemlemek",
  "monitoring": "izleme / izleyen",
  "monthly": "aylık",
  "more": "daha fazla",
  "most": "en çok, çoğu",
  "mother": "anne",
  "motivated": "güdülü / amaçlı / motive",
  "mountain": "dağ",
  "mountains": "dağlar",
  "mouth-watering": "ağız sulandıran",
  "movement": "hareket / hareketi",
  "moving": "hareket eden",
  "muscle": "kas",
  "muscles": "kaslar / kasları",
  "must": "-meli / -malı (zorunluluk)",
  "mutual": "karşılıklı",
  "my": "benim",
  "nation": "ulus / millet",
  "national": "ulusal / milli",
  "nations": "uluslar / milletler",
  "natural": "doğal",
  "necessitating": "gerektiren",
  "need": "ihtiyaç duymak / gerekmek",
  "needed": "gerekli / ihtiyaç duyulan",
  "negative": "olumsuz",
  "neglect": "ihmal / savsaklama / boş verme",
  "network": "ağ / ağı",
  "network-monitoring": "ağı izleyen",
  "networks": "ağlar",
  "new": "yeni",
  "newly": "yeni / yakın zamanda",
  "newly-discovered": "yeni keşfedilen",
  "newly-formed": "yeni oluşmuş",
  "newly-planted": "yeni dikilmiş",
  "news": "haber / haberler",
  "newspaper": "gazete",
  "no": "hayır, hiçbir, yok",
  "noise-reducing": "gürültü azaltan",
  "nomads": "göçebeler",
  "non-compliant": "uyumsuz / kurallara uymayan",
  "not": "değil, olumsuzluk eki",
  "notice": "fark etmek / bildirim",
  "number": "sayı / adet",
  "objects": "nesneler / objeler",
  "observation": "gözlem",
  "observe": "gözlemlemek",
  "obtain": "elde etmek / edinmek",
  "obtained": "elde etti / edinilmiş",
  "occupational": "mesleki",
  "occupying": "işgal eden / oturan",
  "occurrence": "olay",
  "occurring": "meydana gelen",
  "ocr": "OCR (optik karakter tanıma)",
  "of": "-in / -ın (iyelik / parçası), -den / -dan",
  "off": "off (yayınlama / kapalı)",
  "offers": "sunar",
  "office": "ofis",
  "official": "resmi",
  "oil": "petrol / yağ",
  "old": "eski, yaşlı",
  "on": "üzerinde, -de / -da",
  "operates": "yürütülmektedir / çalışır",
  "operation": "ameliyat / operasyon",
  "operational": "operasyonel",
  "opinions": "fikirler",
  "opportunities": "fırsatlar",
  "opposing": "muhalif",
  "opposition": "muhalefet / karşıtlık",
  "option": "seçenek",
  "or": "veya, yoksa",
  "order-defining": "sırayı belirleyen",
  "organ": "organ",
  "organism": "organizma",
  "organisms": "organizmalar",
  "organization": "organizasyon / organizasyonu",
  "organizational": "örgütsel / kurumsal",
  "organized": "organize",
  "original": "orijinal / özgün",
  "other": "diğer, başka",
  "others": "diğerleri / başkaları",
  "ought": "-meli / -malı (ought to)",
  "our": "bizim",
  "out": "dışarı, dışarıda",
  "outcome": "sonuç",
  "outcomes": "sonuçlar",
  "outdated": "güncelliğini yitirmiş / eski",
  "outlined": "taslağı çizilen / belirtilen",
  "output": "çıktı",
  "outstanding": "üstün / olağanüstü / ödenmemiş",
  "over": "üzerinde, aşırı, bitti",
  "over-developed": "aşırı gelişmiş",
  "over-estimated": "aşırı tahmin edilmiş",
  "over-populated": "aşırı nüfuslu",
  "overlap": "çakışma / örtüşme",
  "owner": "sahip / malik",
  "oxygen": "oksijen",
  "packed": "paketlenmiş",
  "page": "sayfa",
  "pages": "sayfalar",
  "painted": "boyanmış",
  "paper": "kağıt",
  "papers": "kağıtlar / evraklar",
  "paradigm": "paradigma",
  "parameter": "parametre",
  "parameters": "parametreler",
  "parliamentary": "parlamento / parlamenter",
  "part": "parça / kısım / bölüm",
  "partially": "kısmen / yarı yarıya",
  "participants": "katılımcılar",
  "participation": "katılım",
  "parties": "taraflar",
  "passed": "geçti / kabul edildi",
  "passes": "geçer",
  "passive": "edilgen",
  "patient": "hasta",
  "patients": "hastalar",
  "pattern": "kalıp / kalıbı / model",
  "patterns": "desenler / kalıplar",
  "pdf": "PDF (belge formatı)",
  "peace": "barış",
  "peace-loving": "barışsever",
  "peer-reviewed": "hakemli",
  "penetrate": "nüfuz eder / içine işler",
  "people": "halk / insanlar",
  "percentages": "yüzdeler",
  "perfect": "mükemmel",
  "perfectly": "kusursuzca / mükemmel bir şekilde",
  "performance": "performans",
  "performance-improving": "performans iyileştiren",
  "performances": "performanslar",
  "period": "dönem / süre",
  "periodic": "periyodik",
  "permanent": "kalıcı",
  "permanently": "kalıcı olarak",
  "personnel": "personel",
  "perspective": "bakış açısı / perspektif",
  "perspectives": "perspektifler",
  "petroleum": "petrol",
  "phase": "aşama / evre",
  "phases": "aşamalar / evreler",
  "phenomena": "olaylar / fenomenler",
  "philosophy": "felsefe",
  "photograph": "fotoğraf / fotoğrafı",
  "physical": "fiziksel",
  "physics": "fizik",
  "picture": "resim / fotoğraf",
  "pictures": "resimler / resimleri",
  "piece": "parça",
  "pile": "reaktör / yığın",
  "pipes": "borular",
  "plan": "plan",
  "planned": "planlanmış",
  "plant": "bitki",
  "plants": "bitkiler",
  "plate": "levha / plaka / tabak",
  "point": "nokta",
  "police": "polis",
  "policies": "politikalar",
  "policy": "politika / politikası",
  "policy-defining": "politikayı tanımlayan",
  "policymakers": "politika yapıcılar",
  "political": "siyasi / politik",
  "politically": "siyasi olarak / siyaseten",
  "politicians": "politikacılar",
  "pollen": "polen",
  "poor": "verimsiz / fakir / kötü",
  "poorly": "kötü / yetersiz bir şekilde",
  "populated": "nüfuslu / yerleşilmiş",
  "population": "nüfus / nüfusu",
  "position": "pozisyon / konum",
  "positions": "konumlar",
  "positive": "olumlu",
  "possible": "mümkün / olası",
  "potential": "potansiyel",
  "power": "güç / energy",
  "powers": "güçler",
  "practitioner": "uygulayıcı",
  "practitioners": "uygulayıcılar",
  "precise": "kesin",
  "predict": "tahmin etmek",
  "predicted": "tahmin edilmiş / tahmin etti",
  "predicting": "tahmin etme / tahmin eden",
  "prefer": "tercih etmek",
  "preferred": "tercih edilen",
  "preliminary": "ön",
  "premises": "mülk / bina",
  "preparation": "hazırlık",
  "prepared": "hazırlanmış / hazırladı",
  "presence": "varlık / mevcudiyet",
  "present": "mevcut / burada",
  "presented": "sundu / takdim etti",
  "preserved": "korunmuş / korudu",
  "pressure": "basınç",
  "prestige": "prestij",
  "prevent": "önlemek / engellemek",
  "prevents": "önler",
  "previous": "önceki",
  "price": "fiyat",
  "prices": "fiyatlar",
  "pricing": "fiyatlandırma",
  "primary": "birincil",
  "primitive": "ilkel",
  "principal": "baş / temel",
  "principle": "ilke / prensip",
  "principles": "ilkeler",
  "priorities": "öncelikler",
  "priority": "öncelik",
  "privacy": "gizlilik",
  "problem": "problem / sorun / problemi",
  "problem-solving": "problem çözen",
  "problems": "problemler / sorunlar",
  "procedural": "yöntemsel",
  "procedure": "prosedür / yöntem",
  "procedures": "prosedürler",
  "proceed": "devam etmek",
  "process": "süreç / süreci",
  "processed": "işlenmiş / işledi",
  "processes": "süreçler",
  "processing": "işleme / işleyen",
  "produce": "ürün / mahsul",
  "produced": "üretilen / üretildi",
  "produces": "üretir",
  "producing": "üretmek / üretme",
  "product": "ürün",
  "production": "üretim",
  "productivity-enhancing": "verimlilik artıran",
  "products": "ürünler",
  "professional": "profesyonel",
  "professor": "profesör",
  "profit": "kâr / kazanç",
  "profit-maximizing": "kârı maksimize eden",
  "profits": "kârlar / kazançlar",
  "program": "program / programı",
  "programme": "program",
  "programmes": "programlar",
  "programming": "programlama",
  "progression": "ilerleme",
  "progressive": "aşamalı / ilerici",
  "project": "proje / projesini",
  "promise": "vaat / söz",
  "promising": "umut verici",
  "promote": "teşvik etmek / desteklemek",
  "properly": "düzgünce / uygun şekilde",
  "property": "özellik",
  "proportion": "oran / oranı",
  "proposal": "teklif / öneri",
  "proposed": "önerdi / önerdiler",
  "prospects": "beklentiler / olasılıklar",
  "protect": "korumalıyız",
  "protected": "korunmuş / korundu",
  "protecting": "koruyan",
  "protection": "koruma",
  "protects": "korur",
  "protein": "protein",
  "protocol": "protokol",
  "prototype": "prototip / ilk örnek",
  "proved": "kanıtlandı / ispatlandı",
  "provide": "sağlamak / sunmak",
  "provided": "sağladı / temin etti",
  "provides": "sağlıyor / sunmaktadır",
  "proving": "kanıtlayan / ispatlayan",
  "psychological": "psikolojik",
  "public": "kamu / toplumsal",
  "publish": "yayınlamak",
  "published": "yayınladı",
  "publishing": "yayınlama / yayınlayan",
  "puzzle": "bulmaca",
  "qualitative": "nitel",
  "quality": "kalite",
  "quickly": "hızlıca / çabucak",
  "radiation": "radyasyon",
  "radio": "radyo",
  "radium": "radyum",
  "railway": "demiryolu",
  "rain": "yağmur",
  "rapid": "hızlı",
  "rarely": "nadiren / seyrek olarak",
  "rate": "oran",
  "rates": "oranlar",
  "ratios": "oranlar",
  "raw": "ham / işlenmemiş",
  "rays": "ışınlar",
  "reaction": "tepkime",
  "reactions": "tepkiler / reaksiyonlar",
  "read": "okumak / okudu",
  "reading": "okuma / okumak",
  "ready": "hazır",
  "reallocated": "yeniden tahsis edilmiş",
  "reason": "sebep / neden",
  "reasons": "sebepler / nedenler",
  "rebuilt": "yeniden inşa etti",
  "receive": "alır / almak",
  "recently": "yakın zamanda / son günlerde",
  "recently-introduced": "yakın zamanda uygulamaya konulmuş",
  "recognized": "tanıdı / kabul etti",
  "record-breaking": "rekor kıran",
  "recorded": "kaydedilmiş",
  "redesigned": "yeniden tasarlanmış / tasarladı",
  "redesigning": "yeniden tasarlama / yeniden tasarlayan",
  "reduced": "azaltılmış",
  "reduces": "azaltır",
  "reform": "reform",
  "regime": "rejim",
  "regime-supporting": "rejimi destekleyen",
  "regional": "bölgesel",
  "regions": "bölgeler",
  "regular": "düzenli",
  "regulating": "düzenleme / düzenleyen",
  "regulation": "düzenleme / yönetmelik",
  "regulations": "düzenlemeler / kurallar",
  "regulatory": "düzenleyici",
  "reinforced": "güçlendirilmiş",
  "reject": "reddetmek",
  "rejection": "ret / reddetme",
  "relation": "ilişki",
  "relativity": "görelilik / rölativite",
  "release": "sürüm / yayınlama",
  "relevant": "ilgili / ilişkili",
  "reliable": "güvenilir",
  "relies": "güveniyor / bel bağlıyor",
  "religion": "din",
  "rely": "güvenmek / dayanmak",
  "remains": "kalır / olmaya devam eder",
  "remarks": "konuşmalar / sözler",
  "removed": "kaldırılmalıdır / kaldırılmış",
  "renaissance": "rönesans",
  "repeated": "tekrarlanan",
  "repeating": "tekrarlamak / tekrar eden",
  "report": "rapor / rapor etmek / bildirmek",
  "reports": "raporlar",
  "representation": "temsil / gösterim",
  "representatives": "temsilciler",
  "reputation": "itibar / ün",
  "require": "gerekmek / istemek",
  "required": "gerekli",
  "requirement": "gereklilik",
  "requirements": "gereksinimler",
  "requires": "gerektirir",
  "research": "araştırma",
  "research-funding": "araştırmayı fonlayan",
  "researcher": "araştırmacı",
  "researchers": "araştırmacılar",
  "reshaping": "yeniden şekillendirme / yeniden şekillendiren",
  "resident": "mukim",
  "resolution": "çözüm",
  "resolve": "çözmek / kararlaştırmak",
  "resolves": "çözer / giderir",
  "resource": "kaynak",
  "resource-limiting": "kaynağı sınırlandıran",
  "resources": "kaynaklar",
  "respondent": "katılımcı / yanıtlayan",
  "respondents": "katılımcılar / yanıtlayanlar",
  "response": "yanıt / cevap",
  "responses": "yanıtlar / cevaplar",
  "responsible": "sorumlu",
  "responsive": "duyarlı",
  "restricted": "kısıtlanmış / yasak",
  "restricting": "kısıtlama / kısıtlayan",
  "restrictions": "kısıtlamalar",
  "restricts": "kısıtlar",
  "result": "sonuç / sonucu",
  "resulting": "oluşan / ortaya çıkan",
  "results": "sonuçlar / sonuçları",
  "revaluation": "yeniden değerlendirme",
  "revealed": "ortaya çıkardı",
  "revenue": "gelir / hasılat / kazanç",
  "revenue-boosting": "gelir artıran",
  "revenue-generating": "gelir getiren",
  "revenues": "gelirler",
  "reviewed": "inceledi / gözden geçirdi",
  "reviewing": "inceleme / inceleyen",
  "revised": "gözden geçirilmiş",
  "revolving": "dönen / devreden",
  "rich": "zengin",
  "right": "hak / doğru",
  "rights": "haklar",
  "rigidity": "katılık / sertlik",
  "rigorously": "titizlikle / sıkı bir şekilde",
  "rising": "yükselen",
  "risk": "risk / riski",
  "risk-mitigating": "riski azaltan",
  "river": "nehir",
  "road": "yol",
  "rockets": "roketler",
  "role": "rol / rolü",
  "roof": "çatı",
  "room": "oda / odası",
  "rooms": "odalar",
  "roots": "kökler",
  "roughly": "kabaca / yaklaşık olarak",
  "round": "etrafında / yuvarlak",
  "router": "yönlendirici / yönseçici",
  "rule": "kural",
  "rules": "kurallar / yönetmelikler",
  "run": "koşu / gidişat",
  "runs": "çalıştırır / koşar",
  "safety": "güvenlik",
  "salary": "maaş / ücret",
  "sale": "satış",
  "salt": "tuz",
  "same": "aynı",
  "sample": "örnek",
  "samples": "örnekler",
  "sand": "kum",
  "sandy": "kumlu",
  "satellites": "uydular",
  "satisfied": "memnun",
  "saves": "kazandırır / kurtarır",
  "scanned": "taranmış",
  "scarcity": "kıtlık",
  "scenario": "senaryo",
  "schedules": "programlar / takvimler",
  "scheme": "plan / tasarı",
  "school": "okul",
  "schools": "okullar",
  "science": "bilim",
  "scientific": "bilimsel",
  "scientist": "bilim insanı",
  "scientists": "bilim insanları",
  "scope": "kapsam",
  "script": "betik / kod",
  "sea": "deniz",
  "secondary": "ikincil",
  "secretary": "sekreter",
  "section": "bölüm / kısım",
  "sector": "sektör",
  "sectors": "sektörler",
  "secure": "güvenli",
  "secured": "elde edilmiş / güvenceye aldı",
  "secures": "güvenceye alır",
  "security": "güvenlik / güvenliği",
  "see": "görmek",
  "seen": "görülebilir / görülmüş",
  "select": "seçmek",
  "selection": "seçim",
  "seminar": "seminer",
  "senior": "kıdemli",
  "sensitive": "hassas",
  "sensitivity": "hassasiyet / duyarlılık",
  "sent": "gönderilen / gönderildi",
  "sentence": "cümle",
  "separate": "ayrı / bağımsız",
  "sequences": "sıralar / diziler",
  "serum": "serum",
  "service": "hizmet",
  "set": "set / küme",
  "several": "birkaç / çeşitli",
  "severe": "ciddi",
  "severely": "ciddi derecede / şiddetle",
  "shape": "şekil",
  "shared": "paylaşılan",
  "she": "o (kadın)",
  "shift": "değişim / kayma",
  "shifted": "kaydırılmış / kaydırıldı",
  "shifting": "kaydırma / değiştiren",
  "short": "kısa",
  "should": "-meli / -malı (tavsiye / gereklilik)",
  "showed": "gösterdi",
  "showing": "gösteren",
  "signals": "sinyaller",
  "signature": "imza",
  "signed": "imzaladı",
  "significance": "önem",
  "significant": "önemli",
  "significantly": "önemli ölçüde",
  "similar": "benzer",
  "simple": "basit",
  "simplified": "basitleştirilmiş",
  "simplifies": "basitleştirir",
  "since": "-den beri / çünkü",
  "single": "tek / tek bir",
  "situation": "durum / durumu",
  "situations": "durumlar",
  "size": "boyut / ebat",
  "skill": "beceri",
  "slightly": "hafifçe / biraz",
  "slowly": "yavaşça / yavaş",
  "small": "küçük",
  "smell": "koku",
  "smoke": "duman",
  "smoky": "dumanlı",
  "so": "bu yüzden, öyleyse, çok",
  "social": "toplumsal",
  "socially": "toplumsal olarak / sosyal olarak",
  "socio-economic": "sosyo-ekonomik",
  "software": "yazılım",
  "soil": "toprak",
  "soil-eroding": "toprak aşındıran",
  "solar": "güneş / solar",
  "solution": "çözüm",
  "solve": "çözmek",
  "solved": "çözdü",
  "some": "bazı, biraz",
  "soon": "yakında / kısa sürede",
  "sound": "ses",
  "source": "kaynak",
  "sources": "kaynaklar",
  "space": "uzay / boşluk",
  "space-saving": "yer kazandıran",
  "special": "özel",
  "specialized": "özelleşmiş / uzmanlaşmış",
  "species": "tür / türler / türleri",
  "specific": "belirli",
  "specification": "şartname",
  "specified": "belirtilen / belirtildi / belirtilmektedir",
  "specifies": "belirler",
  "speech": "konuşma / söylev",
  "speed": "hız",
  "spent": "harcanmış / harcadı",
  "sphere": "küre",
  "spoke": "konuştu",
  "spread": "yayıldı",
  "spring": "kaynak",
  "stability": "istikrar / istikrarı",
  "stabilize": "dengede tutmak / istikrarlı kılmak",
  "stabilized": "stabilize edilmiş / dengelenmiş",
  "stabilizes": "istikrarlı hale getirir / dengeler",
  "stable": "istikrarlı",
  "stage": "aşama / evre / sahne",
  "standard": "standart",
  "standards": "standartlar / standart",
  "star": "yıldız",
  "stars": "yıldızlar",
  "started": "başladı",
  "state": "durum / hal / devlet",
  "statement": "ifade / açıklama",
  "statements": "ifadeler / açıklamalar",
  "statistical": "istatistiksel",
  "statistics": "istatistikler",
  "status": "statü / durum",
  "step": "adım",
  "sterile": "steril / arındırılmış",
  "stolen": "çalınmış",
  "stop": "durmak / durdurmak",
  "stopped": "durdu / durdurdu",
  "stops": "durdurur",
  "story": "hikaye",
  "straight": "düz / doğru",
  "stranger": "yabancı",
  "strategic": "stratejik",
  "strategies": "stratejiler",
  "strategy": "strateji / stratejisi",
  "stress": "stres",
  "strict": "katı / sert",
  "strictly": "kesinlikle / sıkı bir şekilde",
  "strong": "güçlü",
  "structural": "yapısal",
  "structurally": "yapısal olarak",
  "structure": "yapı / yapısı",
  "structure-defining": "yapıyı tanımlayan",
  "structured": "yapılandırılmış / yapılandırdı",
  "structures": "yapılar",
  "structuring": "yapılandırma / yapılandıran",
  "student": "öğrenci / öğrencisi",
  "studied": "inceledik / çalıştık",
  "study": "çalışma / çalışması",
  "subject": "maruz kalacak / konu",
  "submit": "teslim etmek / sunmak",
  "submitted": "sunulmuş / sundu",
  "substance": "madde",
  "substances": "maddeler",
  "substantial": "önemli / büyük miktarda",
  "substitute": "yedek / ikame / alternatif",
  "succeed": "başarılı olmak",
  "successful": "başarılı",
  "sudden": "ani",
  "suffer": "muzdarip olmak / acı çekmek",
  "suffering": "muzdarip / acı çeken",
  "suitcase": "valiz / bavul",
  "summarized": "özetlenmiş / özetledi",
  "summarizing": "özetleme / özetleyen",
  "summary": "özet",
  "sun": "güneş",
  "supervision": "gözetim / denetim",
  "supply": "kaynak / arz",
  "support": "desteklemek",
  "supports": "destekler",
  "surface": "yüzey",
  "surgeon": "cerrah",
  "surrounded": "çevrili / çevrelenmiş",
  "survey": "anket / araştırma",
  "surveys": "araştırmalar / anketler",
  "surviving": "hayatta kalan",
  "suspect": "şüpheli",
  "suspended": "askıya aldı / askıya alındı",
  "sustainable": "sürdürülebilir",
  "sustained": "sürekli / kesintisiz",
  "sustaining": "sürdürme / sürdüren",
  "synchronization": "senkronizasyon",
  "system": "sistem",
  "systems": "sistemler",
  "table": "masa",
  "takes": "alır / sürer",
  "tank": "tank / depo",
  "target": "hedef",
  "targeted": "hedeflenen",
  "task": "görev / görevi",
  "tasks": "görevler",
  "tax": "vergi",
  "tax-paying": "vergi ödeyen",
  "teachers": "öğretmenler",
  "teaching": "öğretim",
  "team": "ekip",
  "technical": "teknik",
  "technician": "teknisyen",
  "technologies": "teknolojiler",
  "technology": "teknoloji",
  "telescope": "teleskop",
  "telescopes": "teleskoplar",
  "temperature": "sıcaklık",
  "temperatures": "sıcaklıklar",
  "temple": "tapınak",
  "temporarily": "geçici olarak",
  "temporary": "geçici",
  "tenant": "kiracı",
  "tension": "gerilim / gerginlik",
  "tensions": "gerilimler",
  "terminated": "feshetti",
  "test": "test / deneme",
  "test-tube": "deney tüpü",
  "text": "metin / metni",
  "textbook": "ders kitabı",
  "than": "-den / -dan (karşılaştırma)",
  "that": "şu, o, -ki (bağlaç)",
  "the": "belirteç (belirli bir nesneyi / özneyi işaret eder)",
  "their": "onların",
  "then": "o zaman, sonra",
  "theoretical": "teorik",
  "theoretically": "teorik olarak",
  "theories": "teoriler",
  "theory": "teori / kuram / teorisi",
  "there": "orada, var (there is / are)",
  "these": "bunlar",
  "thesis": "tez",
  "they": "onlar",
  "this": "bu",
  "thorax": "göğüs / göğüs kafesi",
  "those": "şunlar, onlar",
  "three": "üç",
  "through": "içinden, vasıtasıyla",
  "time": "zaman",
  "time-saving": "zaman kazandıran",
  "times": "zamanlar",
  "tissue": "doku",
  "tissues": "dokular",
  "title": "başlık",
  "to": "-e / -a (yönelme / kadar), -mek / -mak için",
  "today": "bugün",
  "token": "belirteç / jeton",
  "took": "aldı",
  "tool": "araç",
  "tools": "aletler / araçlar",
  "top": "üst / tepe",
  "topic": "konu",
  "towards": "-e doğru / -e yönelik",
  "town": "kasaba",
  "towns": "kasabalar / kentler",
  "toxic": "toksik / zehirli",
  "track": "izlemek / takip etmek",
  "tracked": "izlenmiş / takip etti",
  "tracking": "takip etme / izleme",
  "trade": "ticaret",
  "traditional": "geleneksel",
  "traffic": "trafik",
  "training": "eğitim / antrenman",
  "transfer": "aktarmak / transfer etmek",
  "transforms": "dönüştürür",
  "transition": "geçiş / dönüşüm",
  "translating": "çevirmek / tercüme etmek",
  "transmitted": "taşınır / iletilir",
  "treatment": "tedavi / tedaviye",
  "tree": "ağaç",
  "trees": "ağaçlar",
  "trends": "trendler / eğilimler",
  "trials": "denemeler / testler",
  "tribe": "kabile",
  "tried": "denedi / çalıştı",
  "triggered": "tetiklenen / tetiklendi / tetiklenmektedir",
  "triggers": "tetikler",
  "trouble-making": "sorun çıkaran",
  "troubleshooting": "sorun giderme / arıza giderme",
  "truth-revealing": "gerçeği ortaya çıkaran",
  "try": "denemek / çalışmak",
  "turbine": "türbin",
  "turkey": "Türkiye",
  "turn": "dönüş / sıra",
  "two": "iki",
  "typical": "tipik",
  "unauthorized": "yetkisiz",
  "uncooked": "pişmemiş",
  "under": "altında",
  "under-developed": "az gelişmiş / yetersiz gelişmiş",
  "under-estimated": "yetersiz tahmin edilmiş",
  "under-populated": "yetersiz nüfuslu",
  "under-resourced": "yetersiz kaynak aktarılmış",
  "underestimated": "hafife aldık",
  "underlying": "temelde yatan / temelinde yatan",
  "understand": "anlamak",
  "undetected": "tespit edilemeyen",
  "uneconomic": "ekonomik olmayan / verimsiz",
  "unemployed": "işsiz",
  "unequal": "eşitsiz",
  "unequally": "eşitsiz bir şekilde",
  "unexpected": "beklenmedik",
  "unexposed": "banyo edilmemiş",
  "uninhabited": "insansız / yerleşilmemiş",
  "unique": "benzersiz / kendine özgü",
  "united": "birleşmiş",
  "universe": "evren / evreni",
  "university": "üniversite",
  "unknown": "bilinmeyen / bilinmiyordu",
  "unless": "-medikçe / -madıkça",
  "unpredictable": "öngörülemeyen",
  "unstable": "kararsız / dengesiz",
  "until": "-e kadar",
  "untried": "denenmemiş",
  "unused": "kullanılmamış",
  "up": "yukarı",
  "update": "güncellemek",
  "updated": "güncellenmiş / güncelledi",
  "updating": "güncelleme / güncelleyen",
  "upgraded": "yükseltti",
  "usage": "kullanım",
  "use": "kullanım / kullanımı",
  "used": "kullanılan / kullanılmış",
  "user": "kullanıcı",
  "users": "kullanıcılar",
  "using": "kullanmak / kullanma",
  "utilized": "kullanılmış / yararlanıldı",
  "utilizes": "kullanıyor / faydalanıyor",
  "utilizing": "kullanma / kullanan",
  "valid": "geçerli",
  "validated": "doğrulanan / doğrulandı",
  "validates": "doğrular",
  "validating": "doğrulama / doğrulayan",
  "validation": "doğrulama",
  "valuable": "değerli",
  "value": "değer",
  "value-adding": "değer katan",
  "values": "değerler",
  "vapour": "buhar",
  "variable": "değişken",
  "variables": "değişkenler / varyasyonlar",
  "variation": "değişim / varyasyon",
  "variations": "varyasyonlar",
  "varied": "çeşitli",
  "varying": "değişen",
  "vase": "vazo",
  "vegetable": "bitkisel / sebze",
  "verification": "doğrulama",
  "verified": "doğruladı / doğruladılar",
  "verify": "doğrulamak",
  "version": "versiyon / sürüm",
  "very": "çok",
  "vibrations": "titreşimler",
  "view": "manzara",
  "views": "görüşler",
  "villages": "köyler",
  "violated": "ihlal edilmiş / ihlal edildi",
  "virus": "virüs",
  "viruses": "virüsler",
  "visibility": "görünürlük",
  "visual": "görsel",
  "vitamin": "vitamin",
  "vocabulary": "kelime bilgisi / kelime",
  "volume": "hacim / hacmi",
  "wait": "beklemek",
  "waiting": "bekliyor",
  "wall": "duvar",
  "walls": "surlar / duvarlar",
  "want": "istemek",
  "wants": "istiyor",
  "warning": "uyarı",
  "was": "-di / -dı (geçmiş zaman olmak fiili)",
  "wasted": "boşa harcanmış",
  "watch": "izlemek / saat",
  "watching": "izleme / izlemek",
  "water": "su",
  "water-absorbing": "su emen",
  "waves": "dalgalar",
  "way": "yol / yöntem",
  "we": "biz",
  "weeks": "haftalar",
  "welfare": "refah",
  "well": "kuyu",
  "well-coordinated": "iyi koordine edilmiş",
  "well-developed": "iyi gelişmiş",
  "well-known": "iyi bilinen",
  "well-structured": "iyi yapılandırılmış",
  "were": "-diler / -dılar (geçmiş zaman olmak fiili)",
  "what": "ne",
  "when": "ne zaman, -diğinde / -duğunda",
  "where": "nerede, nereye",
  "which": "hangi, -ki o (nesne niteleme)",
  "while": "-irken / esnasında",
  "who": "kim, -ki o (kişi niteleme)",
  "whole": "bütün / tüm",
  "whom": "kime, kimi, kiminle",
  "whose": "kimin",
  "why": "neden, niçin",
  "widely": "yaygın olarak / geniş çapta",
  "wild": "vahşi",
  "will": "-ecek / -acak (gelecek zaman)",
  "wire": "tel / kablo",
  "wisely": "bilgece",
  "with": "ile, birlikte, -li / -lı",
  "within": "içinde",
  "without": "-sız / -sızın / olmadan",
  "witness": "tanık",
  "won": "kazanılmış / kazandı",
  "wood": "odun / tahta / odunu",
  "woods": "ormanlar",
  "words": "kelimeler",
  "work": "iş / işi",
  "workers": "işçiler / işçileri",
  "workplace": "işyeri",
  "worn-out": "eskitilmiş / yıpranmış",
  "would": "-erdi / -ardı (istek / koşul)",
  "written": "yazılı",
  "wrote": "yazdı",
  "year": "yıl",
  "years": "yıllar",
  "yesterday": "dün",
  "yet": "henüz",
  "you": "sen / siz",
  "your": "senin / sizin",
  "zero": "sıfır",
  "zone": "bölge / alan"

};

// Populate dictionary dynamically from unitSentencesMap if it exists
function buildDynamicDictionary() {
  if (typeof unitSentencesMap !== 'undefined') {
    for (const unitId in unitSentencesMap) {
      const lessonsInUnit = unitSentencesMap[unitId];
      for (const lessonId in lessonsInUnit) {
        const sentences = lessonsInUnit[lessonId];
        if (Array.isArray(sentences)) {
          sentences.forEach(s => {
            if (s.word && s.trWord) {
              const cleanWord = s.word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();
              if (!wordDictionary[cleanWord]) {
                wordDictionary[cleanWord] = s.trWord.toLowerCase().trim();
              }
            }
          });
        }
      }
    }
  }

  // Also scan raw sentence arrays from Unit 6 and Unit 9 (which are loaded before app.js)
  const rawArrays = [
    typeof unit6Lesson1SentencesRaw !== 'undefined' ? unit6Lesson1SentencesRaw : null,
    typeof unit6Lesson2SentencesRaw !== 'undefined' ? unit6Lesson2SentencesRaw : null,
    typeof unit6Lesson3SentencesRaw !== 'undefined' ? unit6Lesson3SentencesRaw : null,
    typeof unit6Lesson4SentencesRaw !== 'undefined' ? unit6Lesson4SentencesRaw : null,
    typeof unit9Lesson1SentencesRaw !== 'undefined' ? unit9Lesson1SentencesRaw : null,
    typeof unit9Lesson2SentencesRaw !== 'undefined' ? unit9Lesson2SentencesRaw : null,
    typeof unit9Lesson3SentencesRaw !== 'undefined' ? unit9Lesson3SentencesRaw : null,
    typeof unit9Lesson4SentencesRaw !== 'undefined' ? unit9Lesson4SentencesRaw : null,
    typeof unit9Lesson5SentencesRaw !== 'undefined' ? unit9Lesson5SentencesRaw : null
  ];
  rawArrays.forEach(arr => {
    if (Array.isArray(arr)) {
      arr.forEach(s => {
        if (s.word && s.trWord) {
          const cleanWord = s.word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();
          if (!wordDictionary[cleanWord]) {
            wordDictionary[cleanWord] = s.trWord.toLowerCase().trim();
          }
        }
      });
    }
  });
}

// Get the meaning of a word with various fallback logic
function getWordMeaning(word) {
  const clean = word.toLowerCase().trim();
  if (wordDictionary[clean]) return wordDictionary[clean];
  
  // Plural -> Singular check
  if (clean.endsWith('s')) {
    const singular = clean.slice(0, -1);
    if (wordDictionary[singular]) return wordDictionary[singular];
  }
  
  // Verb past tense suffix check
  if (clean.endsWith('ed')) {
    const base1 = clean.slice(0, -2);
    if (wordDictionary[base1]) return wordDictionary[base1];
    const base2 = clean.slice(0, -1);
    if (wordDictionary[base2]) return wordDictionary[base2];
  }
  
  // Gerund suffix check
  if (clean.endsWith('ing')) {
    const base1 = clean.slice(0, -3);
    if (wordDictionary[base1]) return wordDictionary[base1];
    const base2 = base1 + 'e';
    if (wordDictionary[base2]) return wordDictionary[base2];
  }
  
  return null;
}

// Convert English text into hoverable HTML elements
function makeTextHoverable(text) {
  if (!text) return '';
  const wordRegex = /([a-zA-Z0-9'-]+)|([^a-zA-Z0-9'-]+)/g;
  let match;
  let html = '';
  
  wordRegex.lastIndex = 0;
  while ((match = wordRegex.exec(text)) !== null) {
    const word = match[1];
    const nonWord = match[2];
    
    if (word) {
      const meaning = getWordMeaning(word);
      if (meaning) {
        html += `<span class="hoverable-word" data-meaning="${meaning}">${word}</span>`;
      } else {
        html += `<span class="hoverable-word no-meaning">${word}</span>`;
      }
    } else if (nonWord) {
      html += nonWord;
    }
  }
  return html;
}

// Initialize dynamic dictionary builder
buildDynamicDictionary();

// ============================================================
// YARDIMCI FONKSİYONLAR
// ============================================================

// Güvenlik: XSS koruması için HTML escape fonksiyonu
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Güvenlik: Şifre hash'leme (SHA-256)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}

function saveState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem(STATE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
    } catch (e) {
      console.error('State yükleme hatası, varsayılan state kullanılacak:', e);
      localStorage.removeItem(STATE_KEY);
    }
  }
  // Initialize daily tasks if missing or empty
  if (!state.dailyTasks || !state.dailyTasks.tasks || state.dailyTasks.tasks.length === 0) {
    state.dailyTasks = {
      lastResetDate: new Date().toDateString(),
      tasks: getInitialDailyTasks()
    };
  }
  // Initialize following/followers if missing
  if (!state.following) {
    state.following = [
      { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
      { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' }
    ];
  }
  if (!state.followers) {
    state.followers = [
      { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
      { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' },
      { username: 'Sarah Connor', xp: 180, streak: 12, avatarColor: '#8BC6A0' },
      { username: 'Melis Şen', xp: 90, streak: 2, avatarColor: '#E8CB6E' }
    ];
  }
  if (state.activeTheme === 'light') {
    state.activeTheme = 'canva';
    saveState();
  }
}

function getUsers() {
  const u = localStorage.getItem(USERS_KEY);
  if (!u) return {};
  try {
    return JSON.parse(u);
  } catch (e) {
    console.error('Kullanıcı veritabanı bozuk, sıfırlanıyor:', e);
    localStorage.removeItem(USERS_KEY);
    return {};
  }
}

async function saveUser(username, password) {
  const users = getUsers();
  const hashedPassword = await hashPassword(password);
  users[username] = { password: hashedPassword, createdAt: new Date().toISOString() };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function updateBodyScrollLock() {
  const homeScreen = document.getElementById('home-screen');
  const homeScreenActive = homeScreen && homeScreen.classList.contains('active');
  const hasPopover = document.querySelector('.lesson-popover') !== null;
  const hasModal = document.querySelector('.qp-modal-overlay') !== null;

  if (homeScreenActive && (hasPopover || hasModal)) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
}

function showScreen(screenId) {
  if (autoAdvanceTimeout) {
    clearTimeout(autoAdvanceTimeout);
    autoAdvanceTimeout = null;
  }

  // If leaving home-screen, save scroll position
  const activeScreen = document.querySelector('.app-screen.active');
  if (activeScreen && activeScreen.id === 'home-screen') {
    homeScreenScrollY = window.scrollY;
  }

  document.querySelectorAll('.app-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');

  // If returning to home-screen, restore scroll position
  if (screenId === 'home-screen') {
    requestAnimationFrame(() => {
      window.scrollTo(0, homeScreenScrollY);
    });
  }

  // Update body scroll lock state based on active screen & overlays
  updateBodyScrollLock();
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function openQuestionPreview(title, questions) {
  if (!questions || questions.length === 0) {
    showToast("Bu alıştırmada henüz soru bulunmuyor.", "info");
    return;
  }

  const overlay = document.createElement('div');
  overlay.className = 'qp-modal-overlay';

  let headerHtml = `
    <div class="qp-modal-header">
      <h3>👁️ ${title} — Soru Önizleme</h3>
      <button class="modal-close-btn" id="qp-close-btn" title="Kapat">✕</button>
    </div>
  `;

  let cardsHtml = questions.map((q, idx) => {
    let typeLabel = "Soru";
    let typeClass = "";
    let detailsHtml = "";

    switch (q.type) {
      case 'multiple-choice':
        typeLabel = q.isEngToTr ? "Çoktan Seçmeli (Eng -> Tr)" : "Çoktan Seçmeli (Tr -> Eng)";
        typeClass = "qp-type-mc";
        const opts = q.options.map((opt, oIdx) => {
          const isCorrect = oIdx === q.correctIndex;
          return `<span class="qp-option-item ${isCorrect ? 'correct' : ''}">${opt} ${isCorrect ? '✓' : ''}</span>`;
        }).join('');
        detailsHtml = `
          <div class="qp-detail-row">
            <span class="qp-detail-label">Seçenekler:</span>
            <div class="qp-options-list">${opts}</div>
          </div>
        `;
        break;

      case 'fill-blank-dropdown':
        typeLabel = "Açılır Menü Boşluk Doldurma";
        typeClass = "qp-type-drop";
        const dropOpts = q.options.map((opt, oIdx) => {
          const isCorrect = oIdx === q.correctIndex;
          return `<span class="qp-option-item ${isCorrect ? 'correct' : ''}">${opt} ${isCorrect ? '✓' : ''}</span>`;
        }).join('');
        detailsHtml = `
          <div class="qp-detail-row">
            <span class="qp-detail-label">Cümle Şablonu:</span>
            <span class="qp-detail-val">"${q.sentence}"</span>
          </div>
          <div class="qp-detail-row">
            <span class="qp-detail-label">Seçenekler:</span>
            <div class="qp-options-list">${dropOpts}</div>
          </div>
        `;
        break;

      case 'fill-blank-text':
        typeLabel = "Yazılı Boşluk Doldurma";
        typeClass = "qp-type-text";
        detailsHtml = `
          <div class="qp-detail-row">
            <span class="qp-detail-label">Cümle Şablonu:</span>
            <span class="qp-detail-val">"${q.sentence}"</span>
          </div>
          <div class="qp-detail-row">
            <span class="qp-detail-label">Doğru Kelime:</span>
            <span class="qp-detail-val qp-correct">${q.correct}</span>
          </div>
        `;
        break;

      case 'word-bank':
        typeLabel = q.isEngToTr ? "Kelime Sıralama (Eng -> Tr)" : "Kelime Sıralama (Tr -> Eng)";
        typeClass = "qp-type-wb";
        const bankWords = q.words.map(w => `<span class="qp-option-item">${w}</span>`).join('');
        const correctPath = Array.isArray(q.correctOrder) ? q.correctOrder.join(' ') : q.correctOrder;
        detailsHtml = `
          <div class="qp-detail-row">
            <span class="qp-detail-label">Kaynak Cümle:</span>
            <span class="qp-detail-val">"${q.translation}"</span>
          </div>
          <div class="qp-detail-row">
            <span class="qp-detail-label">Kelimeler:</span>
            <div class="qp-options-list">${bankWords}</div>
          </div>
          <div class="qp-detail-row">
            <span class="qp-detail-label">Doğru Sıralama:</span>
            <span class="qp-detail-val qp-correct">"${correctPath}"</span>
          </div>
        `;
        break;

      case 'translation-text':
        typeLabel = q.isEngToTr ? "Yazılı Çeviri (Eng -> Tr)" : "Yazılı Çeviri (Tr -> Eng)";
        typeClass = "qp-type-trans";
        detailsHtml = `
          <div class="qp-detail-row">
            <span class="qp-detail-label">Doğru Çeviri:</span>
            <span class="qp-detail-val qp-correct">"${q.correctSentence}"</span>
          </div>
        `;
        break;

      case 'matching':
        typeLabel = "Eşleştirme Kartları";
        typeClass = "qp-type-match";
        const pairsHtml = q.pairs.map(p => `<span class="qp-option-item correct">${p.left} ⟷ ${p.right}</span>`).join('');
        detailsHtml = `
          <div class="qp-detail-row">
            <span class="qp-detail-label">Eşleşmeler:</span>
            <div class="qp-options-list">${pairsHtml}</div>
          </div>
        `;
        break;

      case 'multiple-fill-blank':
        typeLabel = "Çoklu Boşluk Doldurma";
        typeClass = "qp-type-multi";
        const correctsList = q.corrects.map(c => `<span class="qp-option-item correct">${c}</span>`).join(' ');
        detailsHtml = `
          <div class="qp-detail-row">
            <span class="qp-detail-label">Cümle Şablonu:</span>
            <span class="qp-detail-val">"${q.sentence}"</span>
          </div>
          <div class="qp-detail-row">
            <span class="qp-detail-label">Sırasıyla Cevaplar:</span>
            <div class="qp-options-list">${correctsList}</div>
          </div>
        `;
        break;
    }

    return `
      <div class="qp-question-card">
        <div class="qp-question-header">
          <span class="qp-qnumber">Soru #${idx + 1}</span>
          <span class="qp-type-badge ${typeClass}">${typeLabel}</span>
        </div>
        <p class="qp-prompt">${q.prompt}</p>
        <div class="qp-details">
          ${detailsHtml}
        </div>
      </div>
    `;
  }).join('');

  overlay.innerHTML = `
    <div class="qp-modal">
      ${headerHtml}
      <div class="qp-modal-body">
        ${cardsHtml}
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  updateBodyScrollLock();

  const closeBtn = overlay.querySelector('#qp-close-btn');
  const closeModal = () => {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.remove();
      updateBodyScrollLock();
    }, 200);
  };
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}

// ============================================================
// GÜNLÜK GÖREVLER (DAILY TASKS) SİSTEMİ
// ============================================================
function getInitialDailyTasks() {
  return [
    { id: 'lessons', text: 'Bugün 2 ders tamamla', target: 2, current: 0, xpReward: 20, completed: false, claimed: false },
    { id: 'xp', text: 'Bugün 50 Puan kazan', target: 50, current: 0, xpReward: 15, completed: false, claimed: false },
    { id: 'perfect', text: '1 dersi hatasız tamamla', target: 1, current: 0, xpReward: 25, completed: false, claimed: false },
    { id: 'review', text: '1 Hızlı Tekrar testi çöz', target: 1, current: 0, xpReward: 15, completed: false, claimed: false },
    { id: 'shop', text: 'Mağazadan bir ürün satın al', target: 1, current: 0, xpReward: 10, completed: false, claimed: false }
  ];
}

function checkAndResetDailyTasks() {
  const today = new Date().toDateString();
  if (!state.dailyTasks || state.dailyTasks.lastResetDate !== today) {
    state.dailyTasks = {
      lastResetDate: today,
      tasks: getInitialDailyTasks()
    };
    saveState();
  }
}

function updateDailyTaskProgress(taskId, value) {
  if (!state.dailyTasks) return;
  checkAndResetDailyTasks();
  
  const task = state.dailyTasks.tasks.find(t => t.id === taskId);
  if (task && !task.completed) {
    task.current = Math.min(task.target, task.current + value);
    if (task.current >= task.target) {
      task.completed = true;
      claimDailyTaskReward(task);
    }
    saveState();
    renderDailyTasks();
  }
}

function claimDailyTaskReward(task) {
  if (task.claimed) return;
  task.claimed = true;
  state.xp += task.xpReward;
  saveState();
  updateTopBar();
  showToast(`Görev tamamlandı: ${task.text}! +${task.xpReward} Puan kazandın! 🎉`, 'success');
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });
  }
}

function renderDailyTasks() {
  const list = document.getElementById('daily-tasks-list');
  if (!list) return;

  checkAndResetDailyTasks();

  list.innerHTML = state.dailyTasks.tasks.map(task => {
    const progressPercent = Math.round((task.current / task.target) * 100);
    const isCompleted = task.completed;
    
    return `
      <div class="daily-task-card ${isCompleted ? 'completed' : ''}" id="task-card-${task.id}">
        <div class="task-card-main">
          <div class="task-checkbox-wrap">
            <div class="task-checkbox">
              ${isCompleted ? '✓' : ''}
            </div>
          </div>
          <div class="task-details">
            <span class="task-text">${task.text}</span>
            <div class="task-meta">
              <span class="task-progress-text">${task.current}/${task.target}</span>
              <span class="task-reward">+${task.xpReward} Puan</span>
            </div>
          </div>
        </div>
        <div class="task-progress-bar-wrap">
          <div class="task-progress-bar" style="width: ${progressPercent}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

let dailyTasksTimerInterval = null;

function startDailyTasksTimer() {
  if (dailyTasksTimerInterval) {
    clearInterval(dailyTasksTimerInterval);
  }
  updateResetTimer();
  dailyTasksTimerInterval = setInterval(updateResetTimer, 1000);
}

function updateResetTimer() {
  const timerEl = document.getElementById('tasks-reset-timer');
  if (!timerEl) return;
  
  const now = new Date();
  const nextDay = new Date();
  nextDay.setHours(24, 0, 0, 0); // Next midnight
  
  const diffMs = nextDay - now;
  if (diffMs <= 0) {
    checkAndResetDailyTasks();
    renderDailyTasks();
    return;
  }
  
  const hours = Math.floor(diffMs / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);
  const seconds = Math.floor((diffMs % 60000) / 1000);
  
  const pad = (num) => String(num).padStart(2, '0');
  timerEl.textContent = `Sıfırlanma: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}



// ============================================================
// STREAK SİSTEMİ
// ============================================================
function updateStreak() {
  const today = new Date().toDateString();
  if (state.lastActiveDate === today) return; // Bugün zaten güncellendi

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (state.lastActiveDate === yesterday.toDateString()) {
    state.streak += 1;
  } else if (state.lastActiveDate !== today) {
    state.streak = 1; // Seri kırıldı, yeniden başla
  }

  state.lastActiveDate = today;
  saveState();
}

// ============================================================
// BAŞARIM SİSTEMİ
// ============================================================
function checkAchievements() {
  const newlyUnlocked = [];

  achievements.forEach(ach => {
    if (state.unlockedAchievements.includes(ach.id)) return;
    if (ach.condition(state)) {
      state.unlockedAchievements.push(ach.id);
      newlyUnlocked.push(ach);
    }
  });

  if (newlyUnlocked.length > 0) {
    saveState();
  }

  return newlyUnlocked;
}

// ============================================================
// AUTH SİSTEMİ
// ============================================================
function initAuth() {
  const tabs = document.querySelectorAll('.auth-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (tab.dataset.tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
      } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
      }
    });
  });

  // Giriş
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    const users = getUsers();
    if (!users[username]) {
      showToast('Kullanıcı bulunamadı!', 'error');
      return;
    }
    const hashedInput = await hashPassword(password);
    if (users[username].password !== hashedInput) {
      showToast('Şifre yanlış!', 'error');
      return;
    }

    // Kullanıcının state'ini yükle
    const userState = localStorage.getItem(`amok_state_${username}`);
    if (userState) {
      try {
        state = { ...state, ...JSON.parse(userState) };
      } catch (e) {
        console.error('Kullanıcı state yükleme hatası:', e);
      }
    }

    state.username = username;
    state.isGuest = false;
    saveState();
    enterApp();
  });

  // Kayıt
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;

    if (username.length < 3) {
      showToast('Kullanıcı adı en az 3 karakter olmalı!', 'error');
      return;
    }

    const users = getUsers();
    if (users[username]) {
      showToast('Bu kullanıcı adı zaten alınmış!', 'error');
      return;
    }

    await saveUser(username, password);
    state = {
      ...state,
      username,
      isGuest: false,
      streak: 0,
      xp: 0,
      hearts: MAX_HEARTS,
      completedLessons: [],
      unlockedAchievements: [],
      lastActiveDate: null,
      nightOwlTriggered: false,
      perfectLessonTriggered: false,
      warriorTriggered: false
    };
    saveState();
    showToast('Hesap oluşturuldu! Hoş geldin 🎉', 'success');
    enterApp();
  });

  // Misafir
  document.getElementById('btn-guest').addEventListener('click', () => {
    state.username = 'Misafir';
    state.isGuest = true;
    saveState();
    enterApp();
  });

  // Sosyal Giriş Seçenekleri
  const handleSocialLogin = (platform, displayName) => {
    showToast(`${platform} ile giriş yapılıyor...`, 'success');
    setTimeout(() => {
      // Mock social user state initialization
      state = {
        ...state,
        username: displayName,
        isGuest: false,
        streak: 0,
        xp: 0,
        hearts: MAX_HEARTS,
        completedLessons: [],
        unlockedAchievements: [],
        lastActiveDate: null,
        nightOwlTriggered: false,
        perfectLessonTriggered: false,
        warriorTriggered: false
      };
      saveState();
      showToast(`Hoş geldin, ${displayName}! 🎉`, 'success');
      enterApp();
    }, 800);
  };

  document.getElementById('btn-google-login').addEventListener('click', () => {
    handleSocialLogin('Google', 'Google Kullanıcısı');
  });

  document.getElementById('btn-facebook-login').addEventListener('click', () => {
    handleSocialLogin('Facebook', 'Facebook Kullanıcısı');
  });

  document.getElementById('btn-apple-login').addEventListener('click', () => {
    handleSocialLogin('Apple', 'Apple Kullanıcısı');
  });
}

function enterApp() {
  updateStreak();
  updateTopBar();
  renderLessonTree();
  renderAchievements();
  renderDailyTasks();
  startDailyTasksTimer();
  checkPlacementBanner();
  checkReviewBanner();
  renderSocialList();
  
  // Temaları yükle
  if (['gold', 'canva', 'mint', 'sakura', 'sunset'].includes(state.activeTheme)) {
    document.documentElement.setAttribute('data-theme', state.activeTheme);
  } else {
    const saved = localStorage.getItem('amok_theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  showScreen('home-screen');
}

function logout() {
  // Kullanıcıya özel state kaydet
  if (state.username && !state.isGuest) {
    localStorage.setItem(`amok_state_${state.username}`, JSON.stringify(state));
  }
  localStorage.removeItem(STATE_KEY);
  
  // Temayı sıfırla
  document.documentElement.removeAttribute('data-theme');
  
  state = {
    username: null,
    isGuest: false,
    streak: 0,
    xp: 0,
    hearts: MAX_HEARTS,
    completedLessons: [],
    unlockedAchievements: [],
    lastActiveDate: null,
    nightOwlTriggered: false,
    perfectLessonTriggered: false,
    warriorTriggered: false,
    placementTaken: false,
    wrongQuestions: [],
    streakFreezeBought: false,
    activeTheme: 'canva',
    dailyTasks: {
      lastResetDate: null,
      tasks: []
    },
    following: [
      { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
      { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' }
    ],
    followers: [
      { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
      { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' },
      { username: 'Sarah Connor', xp: 180, streak: 12, avatarColor: '#8BC6A0' },
      { username: 'Melis Şen', xp: 90, streak: 2, avatarColor: '#E8CB6E' }
    ]
  };
  showScreen('auth-screen');
}

// ============================================================
// ÜST BAR GÜNCELLEME
// ============================================================
function updateTopBar() {
  const streakCount = document.getElementById('streak-count');
  if (streakCount) streakCount.textContent = state.streak;
  const xpCount = document.getElementById('xp-count');
  if (xpCount) xpCount.textContent = state.xp;
  const heartsCount = document.getElementById('hearts-count');
  if (heartsCount) heartsCount.textContent = state.hearts;

  const streakCountSide = document.getElementById('streak-count-side');
  if (streakCountSide) streakCountSide.textContent = state.streak;
  const xpCountSide = document.getElementById('xp-count-side');
  if (xpCountSide) xpCountSide.textContent = state.xp;
  const heartsCountSide = document.getElementById('hearts-count-side');
  if (heartsCountSide) heartsCountSide.textContent = state.hearts;

  const dropdownName = document.getElementById('dropdown-name');
  if (dropdownName) dropdownName.textContent = state.username || 'Kullanıcı';

  const loginTopbarBtn = document.getElementById('btn-login-topbar');
  const userMenu = document.querySelector('.user-menu');

  if (state.isGuest) {
    if (loginTopbarBtn) loginTopbarBtn.style.display = 'block';
    if (userMenu) userMenu.style.display = 'none';
  } else {
    if (loginTopbarBtn) loginTopbarBtn.style.display = 'none';
    if (userMenu) userMenu.style.display = 'block';
  }
}

function animateStat(elementId, className) {
  const el = document.getElementById(elementId);
  if (el) {
    el.classList.add(className);
    setTimeout(() => el.classList.remove(className), 500);
  }
  const elSide = document.getElementById(elementId + '-side');
  if (elSide) {
    elSide.classList.add(className);
    setTimeout(() => elSide.classList.remove(className), 500);
  }
}

// ============================================================
// DERS AĞACI RENDER
// ============================================================
function getLessonIllustration(lessonId, unitId) {
  const lesson = lessons.find(l => l.id === lessonId);
  const unitLessons = units.find(u => u.id === unitId)?.lessons || [];
  const lessonIndex = unitLessons.indexOf(lessonId);

  // Default fallback
  let category = 'school';

  if (unitId === 1 || unitId === 6) {
    category = 'grammar';
  } else if (unitId === 2) {
    category = 'soup';
  } else if (unitId === 3) {
    category = 'time';
  } else if (unitId === 4) {
    category = 'blocks';
  } else if (unitId === 5) {
    category = 'multilingual';
  } else if (unitId === 7) {
    category = 'greetings';
  } else if (unitId === 8) {
    category = 'family';
  } else if (unitId === 9) {
    category = 'blocks';
  } else if (unitId === 10) {
    category = 'school';
  } else if (unitId === 11) {
    category = 'time';
  } else if (unitId === 12) {
    category = 'school';
  } else if (unitId === 13) {
    category = 'multilingual';
  } else if (unitId === 14) {
    category = 'globe';
  } else if (unitId === 15) {
    category = 'greetings';
  } else if (unitId === 16) {
    category = 'time';
  } else if (unitId === 17) {
    category = 'teacher';
  } else if (unitId === 18) {
    category = 'train';
  } else if (unitId === 19) {
    category = 'chatbot';
  } else if (unitId === 20) {
    category = 'multilingual';
  } else if (unitId === 21) {
    category = 'time';
  } else if (unitId === 22) {
    category = 'grammar';
  } else if (unitId === 23) {
    category = 'blocks';
  } else if (unitId === 24) {
    category = 'teacher';
  } else if (unitId === 25) {
    category = 'globe';
  }

  // Inject variety
  if (lessonIndex === 1 && (unitId === 2 || unitId === 7 || unitId === 8)) {
    category = 'calendar';
  }
  if (lessonIndex === 2 && (unitId === 1 || unitId === 6 || unitId === 9 || unitId === 18)) {
    category = 'chatbot';
  }

  // Beautiful Vector SVGs with transparent backgrounds
  const svgs = {
    greetings: `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="pin-svg-icon">
        <path d="M22 38V24C22 21.8 23.8 20 26 20C28.2 20 30 21.8 30 24V32M30 32V18C30 15.8 31.8 14 34 14C36.2 14 38 15.8 38 18V32M38 32V20C38 17.8 39.8 16 42 16C44.2 16 46 17.8 46 20V32M46 32V24C46 21.8 47.8 20 50 20C52.2 20 54 21.8 54 24V40C54 47.7 47.7 54 40 54H32C23.2 54 16 46.8 16 38V38" stroke="#F2A871" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="#F8C8A0"/>
        <path d="M12 22C13.5 20.5 15.5 20.5 17 22" stroke="#E8CB6E" stroke-width="3" stroke-linecap="round"/>
        <path d="M10 27C12 26 14 26 16 27" stroke="#E8CB6E" stroke-width="3" stroke-linecap="round"/>
        <path d="M11 32C12.5 31.5 14.5 31.5 16 32" stroke="#E8CB6E" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `,
    calendar: `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="pin-svg-icon">
        <rect x="10" y="16" width="44" height="36" rx="6" fill="#FFE3E8" stroke="#FFA0B4" stroke-width="4"/>
        <path d="M10 24H54" stroke="#FFA0B4" stroke-width="4" stroke-linecap="round"/>
        <path d="M20 12V18" stroke="#7EB8F0" stroke-width="4" stroke-linecap="round"/>
        <path d="M32 12V18" stroke="#7EB8F0" stroke-width="4" stroke-linecap="round"/>
        <path d="M44 12V18" stroke="#7EB8F0" stroke-width="4" stroke-linecap="round"/>
        <rect x="18" y="30" width="6" height="6" rx="2" fill="#FFA0B4"/>
        <rect x="29" y="30" width="6" height="6" rx="2" fill="#FFA0B4"/>
        <rect x="40" y="30" width="6" height="6" rx="2" fill="#FFA0B4"/>
        <rect x="18" y="40" width="6" height="6" rx="2" fill="#FFA0B4"/>
        <rect x="29" y="40" width="6" height="6" rx="2" fill="#7EB8F0"/>
        <rect x="40" y="40" width="6" height="6" rx="2" fill="#FFA0B4"/>
      </svg>
    `,
    globe: `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="pin-svg-icon">
        <path d="M20 52H44" stroke="#B597F6" stroke-width="4" stroke-linecap="round"/>
        <path d="M32 46V52" stroke="#B597F6" stroke-width="4" stroke-linecap="round"/>
        <path d="M32 10C41.9 10 50 18.1 50 28C50 34.6 46.4 40.3 41 43.4" stroke="#B597F6" stroke-width="4" stroke-linecap="round"/>
        <circle cx="30" cy="28" r="16" fill="#C2D9FF" stroke="#7EB8F0" stroke-width="3"/>
        <path d="M20 22C22 20 26 22 28 20C30 18 29 15 27 14C23.5 14 18.5 17.5 20 22Z" fill="#74DB96"/>
        <path d="M34 26C38 24 42 27 44 25C46 23 44 18 41 18C38 18 36 21 34 26Z" fill="#74DB96"/>
        <path d="M24 34C26 38 32 36 34 40C36 44 26 44 22 41C18 38 22 30 24 34Z" fill="#74DB96"/>
      </svg>
    `,
    blocks: `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="pin-svg-icon">
        <rect x="12" y="30" width="22" height="22" rx="4" fill="#FFA478" stroke="#D1754B" stroke-width="3"/>
        <text x="23" y="46" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ffffff" text-anchor="middle">A</text>
        <rect x="34" y="34" width="18" height="18" rx="4" fill="#62CDCB" stroke="#439E9D" stroke-width="3"/>
        <text x="43" y="47" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ffffff" text-anchor="middle">B</text>
        <rect x="22" y="10" width="20" height="20" rx="4" fill="#B597F6" stroke="#8D6EC8" stroke-width="3"/>
        <text x="32" y="25" font-family="sans-serif" font-weight="bold" font-size="13" fill="#ffffff" text-anchor="middle">1</text>
      </svg>
    `,
    grammar: `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="pin-svg-icon">
        <path d="M8 52C18 48 32 50 32 50C32 50 46 48 56 52V24C46 20 32 22 32 22C32 22 18 20 8 24V52Z" fill="#ffffff" stroke="#FFA0B4" stroke-width="4" stroke-linejoin="round"/>
        <path d="M32 22V50" stroke="#FFA0B4" stroke-width="4"/>
        <path d="M14 30H24M14 36H26M14 42H22" stroke="#FFE3E8" stroke-width="3" stroke-linecap="round"/>
        <path d="M50 30H40M50 36H38M50 42H44" stroke="#FFE3E8" stroke-width="3" stroke-linecap="round"/>
        <text x="16" y="16" font-family="sans-serif" font-weight="bold" font-size="12" fill="#F9D053" text-anchor="middle">A</text>
        <text x="32" y="14" font-family="sans-serif" font-weight="bold" font-size="10" fill="#7EB8F0" text-anchor="middle">ü</text>
        <text x="48" y="16" font-family="sans-serif" font-weight="bold" font-size="12" fill="#74DB96" text-anchor="middle">?</text>
      </svg>
    `,
    train: `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="pin-svg-icon">
        <circle cx="20" cy="12" r="4" fill="#E2D4FF"/>
        <circle cx="26" cy="8" r="6" fill="#FFE3E8"/>
        <path d="M20 20V26H28V20H20Z" fill="#ED8BE0" stroke="#C064B4" stroke-width="3"/>
        <rect x="30" y="22" width="22" height="24" rx="3" fill="#7EB8F0" stroke="#588FC6" stroke-width="3"/>
        <rect x="36" y="27" width="10" height="8" rx="2" fill="#ffffff" stroke="#588FC6" stroke-width="2"/>
        <rect x="14" y="28" width="18" height="18" rx="3" fill="#FFA0B4" stroke="#D37388" stroke-width="3"/>
        <circle cx="22" cy="50" r="6" fill="#9C8EF7" stroke="#7465D3" stroke-width="3"/>
        <circle cx="42" cy="50" r="6" fill="#9C8EF7" stroke="#7465D3" stroke-width="3"/>
        <path d="M22 50H42" stroke="#7465D3" stroke-width="3"/>
      </svg>
    `,
    chatbot: `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="pin-svg-icon">
        <path d="M10 16C10 11.6 13.6 8 18 8H46C50.4 8 54 11.6 54 16V38C54 42.4 50.4 46 46 46H24L12 54V46C10 44 10 41.5 10 38V16Z" fill="#62CDCB" stroke="#439E9D" stroke-width="3"/>
        <rect x="20" y="16" width="24" height="18" rx="5" fill="#ffffff"/>
        <path d="M32 16V12" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
        <circle cx="32" cy="10" r="3" fill="#F9D053"/>
        <circle cx="27" cy="24" r="2.5" fill="#439E9D"/>
        <circle cx="37" cy="24" r="2.5" fill="#439E9D"/>
        <path d="M29 29C31 31 33 31 35 29" stroke="#439E9D" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `,
    multilingual: `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="pin-svg-icon">
        <path d="M8 24C8 17.4 13.4 12 20 12H32C38.6 12 44 17.4 44 24C44 30.6 38.6 36 32 36H20L12 42V36C8 34 8 31.5 8 24Z" fill="#46D5C8" stroke="#2CA297" stroke-width="3"/>
        <text x="24" y="28" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ffffff" text-anchor="middle">Hi</text>
        <path d="M56 32C56 38.6 50.6 44 44 44H32C25.4 44 20 38.6 20 32C20 25.4 25.4 20 32 20H44C50.6 20 56 25.4 56 32Z" fill="#B597F6" stroke="#8D6EC8" stroke-width="3"/>
        <text x="38" y="36" font-family="sans-serif" font-weight="bold" font-size="11" fill="#ffffff" text-anchor="middle">Olá</text>
      </svg>
    `,
    family: `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="pin-svg-icon">
        <circle cx="24" cy="22" r="8" fill="#FFA478" stroke="#D1754B" stroke-width="3"/>
        <path d="M12 44C12 36 18 32 24 32C30 32 36 36 36 44" fill="#FFE2D4" stroke="#D1754B" stroke-width="3" stroke-linecap="round"/>
        <circle cx="42" cy="28" r="6" fill="#7EB8F0" stroke="#588FC6" stroke-width="2.5"/>
        <path d="M32 46C32 40 36 37 42 37C48 37 52 40 52 46" fill="#C2D9FF" stroke="#588FC6" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    `,
    soup: `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="pin-svg-icon">
        <path d="M24 16C24 12 26 12 26 8" stroke="#FFA478" stroke-width="3" stroke-linecap="round"/>
        <path d="M32 16C32 10 34 10 34 6" stroke="#F9D053" stroke-width="3" stroke-linecap="round"/>
        <path d="M40 16C40 12 42 12 42 8" stroke="#FFA478" stroke-width="3" stroke-linecap="round"/>
        <path d="M12 28C12 28 12 48 32 48C52 48 52 28 52 28H12Z" fill="#FFA0B4" stroke="#D37388" stroke-width="4" stroke-linejoin="round"/>
        <ellipse cx="32" cy="28" rx="20" ry="4" fill="#ffffff" stroke="#D37388" stroke-width="3"/>
        <ellipse cx="32" cy="28" rx="18" ry="2.5" fill="#F9D053"/>
        <path d="M42 22L50 12" stroke="#7EB8F0" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `,
    time: `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="pin-svg-icon">
        <path d="M20 48L14 54" stroke="#74DB96" stroke-width="4" stroke-linecap="round"/>
        <path d="M44 48L50 54" stroke="#74DB96" stroke-width="4" stroke-linecap="round"/>
        <circle cx="18" cy="14" r="6" fill="#F9D053" stroke="#CCA024" stroke-width="3"/>
        <circle cx="46" cy="14" r="6" fill="#F9D053" stroke="#CCA024" stroke-width="3"/>
        <path d="M18 18L26 22" stroke="#CCA024" stroke-width="3"/>
        <path d="M46 18L38 22" stroke="#CCA024" stroke-width="3"/>
        <circle cx="32" cy="34" r="16" fill="#ffffff" stroke="#74DB96" stroke-width="4"/>
        <path d="M32 34V24" stroke="#52A66F" stroke-width="3" stroke-linecap="round"/>
        <path d="M32 34L40 38" stroke="#52A66F" stroke-width="3" stroke-linecap="round"/>
        <circle cx="32" cy="34" r="2.5" fill="#52A66F"/>
      </svg>
    `,
    school: `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="pin-svg-icon">
        <path d="M12 28L32 14L52 28H12Z" fill="#FFA0B4" stroke="#D37388" stroke-width="3" stroke-linejoin="round"/>
        <rect x="16" y="28" width="32" height="24" rx="2" fill="#ffffff" stroke="#588FC6" stroke-width="3"/>
        <rect x="27" y="40" width="10" height="12" rx="2" fill="#FFA478" stroke="#D1754B" stroke-width="2"/>
        <rect x="20" y="32" width="6" height="6" rx="1" fill="#C2D9FF" stroke="#588FC6" stroke-width="2"/>
        <rect x="38" y="32" width="6" height="6" rx="1" fill="#C2D9FF" stroke="#588FC6" stroke-width="2"/>
        <rect x="28" y="10" width="8" height="8" fill="#F9D053" stroke="#CCA024" stroke-width="2"/>
        <circle cx="32" cy="14" r="2" fill="#ffffff"/>
      </svg>
    `,
    teacher: `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="pin-svg-icon">
        <path d="M20 48L14 56" stroke="#D1754B" stroke-width="3" stroke-linecap="round"/>
        <path d="M44 48L50 56" stroke="#D1754B" stroke-width="3" stroke-linecap="round"/>
        <rect x="10" y="14" width="44" height="32" rx="4" fill="#FFA478" stroke="#D1754B" stroke-width="3"/>
        <rect x="14" y="18" width="36" height="24" rx="2" fill="#74DB96"/>
        <path d="M32 22L34 26L38 26L35 29L36 33L32 30L28 33L29 29L26 26L30 26L32 22Z" fill="#ffffff"/>
        <path d="M44 40L54 28" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `
  };

  return svgs[category] || svgs.school;
}



function renderLessonTree() {
  const container = document.getElementById('tree-container');
  // Render definitions SVG for the path gradients
  container.innerHTML = `
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;">
      <defs>
        <linearGradient id="path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="var(--accent-primary)" />
          <stop offset="100%" stop-color="var(--accent-primary-hover)" />
        </linearGradient>
        <linearGradient id="canva-path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#5AB07F" />
          <stop offset="50%" stop-color="#439A68" />
          <stop offset="100%" stop-color="#2E754C" />
        </linearGradient>
        <linearGradient id="mint-path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#76c893" />
          <stop offset="50%" stop-color="#52b788" />
          <stop offset="100%" stop-color="#34a0a4" />
        </linearGradient>
        <linearGradient id="sakura-path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffb5a7" />
          <stop offset="50%" stop-color="#ff8fa3" />
          <stop offset="100%" stop-color="#c77dff" />
        </linearGradient>
        <linearGradient id="sunset-path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f4a261" />
          <stop offset="50%" stop-color="#e76f51" />
          <stop offset="100%" stop-color="#ffd166" />
        </linearGradient>
      </defs>
    </svg>
  `;

  // Sort all units sequentially by their ID (from Unit 1 to Unit 25)
  const renderedUnits = [...units].sort((a, b) => a.id - b.id);

  renderedUnits.forEach(unit => {
    // 1. Calculate progress in this unit
    const completedInUnit = unit.lessons.filter(lId => state.completedLessons.includes(lId)).length;
    const totalInUnit = unit.lessons.length;
    const progressPercent = Math.round((completedInUnit / totalInUnit) * 100);

    const notUploadedUnits = new Set([13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25]);
    const isNotUploadedUnit = notUploadedUnits.has(unit.id);
    let notUploadedBadgeHTML = '';
    if (isNotUploadedUnit) {
      notUploadedBadgeHTML = `
        <span class="unit-banner-not-uploaded-tag">
          <span class="tag-pulse-dot"></span>
          <span>Alıştırma Hazırlanacak</span>
        </span>
      `;
    }

    // 2. Create Unit Banner
    const banner = document.createElement('div');
    const colorIndex = ((unit.id - 1) % 10) + 1;
    banner.className = `unit-banner unit-color-${colorIndex}`;
    banner.innerHTML = `
      <div class="unit-banner-info">
        <h2 class="unit-banner-title-row">
          <span>Bölüm ${unit.id}: ${unit.title}</span>
          ${notUploadedBadgeHTML}
        </h2>
        <p>${unit.description}</p>
      </div>
      <div class="unit-progress-container">
        <span class="unit-progress-text">${completedInUnit}/${totalInUnit} Tamamlandı</span>
        <div class="unit-progress-bar-wrap">
          <div class="unit-progress-bar" style="width: ${progressPercent}%"></div>
        </div>
      </div>
    `;
    container.appendChild(banner);

    // 3. Create Winding Path Container (Height expanded to 190px per lesson to support larger nodes without overlapping)
    const pathContainer = document.createElement('div');
    pathContainer.className = 'unit-path-container';
    pathContainer.style.height = `${totalInUnit * 190}px`;

    // Compute coordinates for the lessons (Using a mathematical formula to guarantee all 20 units have unique shapes)
    const points = [];
    for (let idx = 0; idx < totalInUnit; idx++) {
      const u = unit.id;
      
      // Calculate parameters unique to each unit's ID
      const phase = (u * 1.7) % (2 * Math.PI);      // Unique phase shift
      const freq = 1.0 + (u * 0.15) % 1.2;          // Unique frequency
      const amp = 14 + (u * 3) % 9;                 // Unique amplitude
      const tilt = ((u % 3) - 1) * (2 + (u % 4));    // Unique diagonal tilt slope (negative, flat, or positive)
      
      // Combine wave and diagonal tilt
      const centerIndex = (totalInUnit - 1) / 2;
      const offsetPercent = Math.sin(idx * freq + phase) * amp + (idx - centerIndex) * tilt;

      points.push({
        x: 50 + offsetPercent,
        y: idx * 190 + 95
      });
    }

    // Build SVG path data
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cy = (p0.y + p1.y) / 2;
      pathD += ` C ${p0.x} ${cy}, ${p1.x} ${cy}, ${p1.x} ${p1.y}`;
    }

    // Build SVG progress path data
    let progressD = "";
    const progressLimit = Math.min(totalInUnit - 1, completedInUnit);
    if (progressLimit > 0) {
      progressD = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < progressLimit; i++) {
         const p0 = points[i];
         const p1 = points[i + 1];
         const cy = (p0.y + p1.y) / 2;
         progressD += ` C ${p0.x} ${cy}, ${p1.x} ${cy}, ${p1.x} ${p1.y}`;
      }
    }

    // Render path SVG (Expanded viewBox height matching the 190px vertical spacing)
    const svgHTML = `
      <svg class="unit-path-svg" viewBox="0 0 100 ${totalInUnit * 190}" preserveAspectRatio="none">
        <path class="path-bg" d="${pathD}" />
        ${progressD ? `<path class="path-progress" d="${progressD}" stroke="url(#path-gradient)" />` : ''}
      </svg>
    `;
    pathContainer.innerHTML = svgHTML;

    // Render each lesson node
    unit.lessons.forEach((lId, idx) => {
      const lesson = lessons.find(l => l.id === lId);
      if (!lesson) return;

      const isCompleted = state.completedLessons.includes(lId);
      const isActive = !isCompleted && isLessonUnlocked(lId);
      const isLocked = !isCompleted && !isActive;

      const pt = points[idx];

      const nodeWrapper = document.createElement('div');
      nodeWrapper.className = 'lesson-node-wrapper';
      nodeWrapper.style.left = `${pt.x}%`;
      nodeWrapper.style.top = `${pt.y}px`;
      // Increasing z-index prevents subsequent lesson labels from rendering behind previous lesson nodes
      nodeWrapper.style.zIndex = `${100 + idx}`;

      let statusClass = 'locked';
      if (isCompleted) {
        statusClass = 'completed';
      } else if (isActive) {
        statusClass = `active unit-pin-color-${colorIndex}`;
      }

      // Generate the premium SVG illustration instead of emoji
      const illustrationContent = getLessonIllustration(lId, unit.id);

      // Progress Badge content
      let progressBadgeContent = '';
      const isNotUploadedLesson = isNotUploadedUnit;
      if (isNotUploadedLesson) {
        progressBadgeContent = `<div class="node-progress-badge">0</div>`;
      } else if (lesson.exercises && lesson.exercises.length > 0) {
        const completedCount = lesson.exercises.filter(ex => state.completedLessons.includes(`${lesson.id}_${ex.id}`)).length;
        const totalCount = lesson.exercises.length;
        const isAllExCompleted = completedCount === totalCount;
        progressBadgeContent = `<div class="node-progress-badge ${isAllExCompleted ? 'completed' : ''}">
          ${isAllExCompleted ? '✓' : `${completedCount}/${totalCount}`}
        </div>`;
      } else {
        progressBadgeContent = `<div class="node-progress-badge ${isCompleted ? 'completed' : ''}">
          ${isCompleted ? '✓' : `0/${lesson.questions.length}`}
        </div>`;
      }

      // New Banner for active lesson
      const activeBannerContent = isActive ? '<div class="lesson-node-banner">Yeni</div>' : '';

      nodeWrapper.innerHTML = `
        ${isActive ? '<div class="pulse-ring"></div>' : ''}
        ${activeBannerContent}
        <button class="lesson-node ${statusClass}" data-lesson-id="${lId}">
          <div class="pin-bg"></div>
          <div class="pin-inner">
            ${illustrationContent}
          </div>
          ${isLocked ? '<div class="pin-lock-badge">🔒</div>' : ''}
          ${progressBadgeContent}
        </button>
        <div class="lesson-node-label ${pt.x > 50 ? 'label-left' : 'label-right'}">
          <strong>${lesson.title}</strong>
          <div class="lesson-label-subtitle" style="font-size: 0.72rem; font-weight: normal; opacity: 0.85; margin-top: 2px; line-height: 1.2; font-family: var(--font-body); white-space: normal; max-width: 170px; margin-left: auto; margin-right: auto;">${lesson.subtitle}</div>
          ${isNotUploadedLesson ? '<div class="lesson-not-uploaded-badge">⏳ Alıştırma henüz yüklenmemiş</div>' : ''}
        </div>
      `;

      const btn = nodeWrapper.querySelector('.lesson-node');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePopover(btn, lId, unit.id, pt.x, pt.y);
      });

      pathContainer.appendChild(nodeWrapper);
    });

    container.appendChild(pathContainer);
  });
}

function togglePopover(button, lessonId, unitId, pctX, pxY) {
  // Remove existing popover if any
  const existingPopover = document.querySelector('.lesson-popover');
  if (existingPopover) {
    const isSame = existingPopover.dataset.lessonId == lessonId;
    existingPopover.remove();
    updateBodyScrollLock();
    if (isSame) return;
  }

  const unit = units.find(u => u.id === unitId);
  const lesson = lessons.find(l => l.id === lessonId);
  if (!unit || !lesson) return;

  // Render preview details
  let previewHTML = '';
  const topic = rawTopics[unit.id - 1];
  const lessonIndex = unit.lessons.indexOf(lessonId);

  if (topic) {
    if (lesson.formula && lesson.example) {
      let styledExample = lesson.example;
      if (styledExample.includes(':') && !styledExample.includes('<strong>')) {
        const parts = styledExample.split(':');
        styledExample = `<strong>${parts[0]}</strong>:${parts[1]}`;
      }
      previewHTML = `
        <div class="grammar-preview-box">
          <div class="grammar-formula"><span class="formula-badge">Formül</span> ${lesson.formula}</div>
          <div class="grammar-example">Örnek: ${styledExample}</div>
          ${lesson.description ? `<div class="grammar-description" style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 10px; line-height: 1.4; padding-top: 10px; border-top: 1px dashed rgba(255,255,255,0.15);">${lesson.description}</div>` : ''}
        </div>
      `;
    } else if (lesson.description) {
      previewHTML = `
        <div class="grammar-preview-box">
          <div class="grammar-description" style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">${lesson.description}</div>
        </div>
      `;
    } else if (lessonIndex === 0) {
      const wordsList = topic.vocab.map(w => `<span class="preview-word-badge">${w.en}: ${w.tr}</span>`).join('');
      previewHTML = `
        <div class="lesson-preview-title">Öğrenilecek kelimeler:</div>
        <div class="lesson-preview-words">${wordsList}</div>
      `;
    } else if (lessonIndex === 1) {
      const sentencesList = topic.sentences.map(s => `<div class="preview-sentence-item"><strong>${s.en}</strong>: ${s.tr}</div>`).join('');
      previewHTML = `
        <div class="lesson-preview-title">Örnek cümle kalıpları:</div>
        <div class="preview-sentences-list">${sentencesList}</div>
      `;
    } else if (lessonIndex === 2) {
      previewHTML = `
        <div class="lesson-preview-title">Ders Odak Noktası:</div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">Dinlediğiniz kelimeleri ve cümleleri yazarak işitsel anlama yeteneğinizi geliştirin.</p>
      `;
    } else if (lessonIndex === 3) {
      previewHTML = `
        <div class="lesson-preview-title">Ders Odak Noktası:</div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">İngilizce metinleri sesli okuyarak telaffuz pratiği yapın ve konuşma becerilerini geliştirin.</p>
      `;
    } else if (lessonIndex === 4) {
      previewHTML = `
        <div class="lesson-preview-title">Ders Odak Noktası:</div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">Boşluk doldurma, kelime havuzu ve çoktan seçmeli sorularla pratik yapın.</p>
      `;
    } else {
      previewHTML = `
        <div class="lesson-preview-title">Ders Odak Noktası:</div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">Genel kelime eşleştirme ve dinleme sorularıyla tüm üniteyi tekrar edin.</p>
      `;
    }
  }

  const isCompleted = state.completedLessons.includes(lessonId);

  // Create popover element
  const popover = document.createElement('div');
  popover.className = 'lesson-popover';
  popover.dataset.lessonId = lessonId;
  // Positioned directly below the scaled-up labels (pxY + 95px) to prevent overlap with the smaller pins/labels
  popover.style.top = `${pxY + 95}px`;
  popover.style.left = `${pctX}%`;

  const isUnlocked = isLessonUnlocked(lessonId);

  let popoverSubtitleHTML = lesson.subtitle;
  if (lesson.formula && lesson.example) {
    popoverSubtitleHTML = `${lesson.subtitle}<br><span class="popover-example-translation" style="font-size: 0.8rem; display: block; margin-top: 4px; font-weight: normal; opacity: 0.9; color: var(--text-secondary);">Örnek Çeviri: <strong>${lesson.example}</strong></span>`;
  }

  let popoverFooterHTML = '';
  const notUploadedUnitsPopover = new Set([13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25]);
  if (notUploadedUnitsPopover.has(unit.id)) {
    popoverFooterHTML = `
      <div class="popover-exercises-container">
        <div class="popover-not-uploaded-message">
          <span class="not-uploaded-icon">⏳</span>
          <span class="not-uploaded-text">Alıştırma henüz yüklenmemiş</span>
        </div>
      </div>
    `;
  } else if (lesson.exercises && lesson.exercises.length > 0) {
    let exercisesRows = lesson.exercises.map((ex, index) => {
      const isExCompleted = state.completedLessons.includes(`${lesson.id}_${ex.id}`);
      const isExUnlocked = true; // Şimdilik soruları/düzenlemeleri görebilmek için kilitler açıldı
      
      const statusText = isExCompleted ? '✓ Tamamlandı' : (isExUnlocked ? 'Başlat' : 'Kilitli 🔒');
      const rowClass = isExUnlocked ? '' : 'locked';
      
      return `
        <div class="popover-exercise-row ${rowClass}" data-exercise-id="${ex.id}">
          <div class="exercise-info">
            <span class="exercise-icon">${isExCompleted ? '✅' : '📝'}</span>
            <div class="exercise-meta">
              <span class="exercise-title">${ex.title}</span>
              <span class="exercise-subtitle">${ex.description || '20 Soru'}</span>
            </div>
          </div>
          <div class="qp-btn-group">
            <button class="exercise-preview-btn" data-exercise-id="${ex.id}" title="Soruları Önizle">👁️ Önizle</button>
            <button class="btn btn-primary exercise-start-btn" ${isExUnlocked ? '' : 'disabled'} data-exercise-id="${ex.id}">
              ${statusText}
            </button>
          </div>
        </div>
      `;
    }).join('');

    popoverFooterHTML = `
      <div class="popover-exercises-container">
        <h5 class="popover-exercises-title">Alıştırmalar</h5>
        <div class="popover-exercises-list">
          ${exercisesRows}
        </div>
      </div>
    `;
  } else {
    popoverFooterHTML = `
      <div class="popover-footer" style="display: flex; gap: 8px; justify-content: flex-end; align-items: center;">
        ${isUnlocked ? `
          <button class="popover-preview-btn" title="Tüm Soruları Önizle">👁️ Önizle</button>
          <button class="btn btn-primary popover-start-btn" style="flex: 1;">
            ${isCompleted ? 'Tekrar Et (+5 Puan)' : 'Dersi Başlat (+10 Puan)'}
          </button>
        ` : `
          <button class="btn btn-primary popover-start-btn" disabled>
            🔒 KİLİTLİ
          </button>
        `}
      </div>
    `;
  }

  popover.innerHTML = `
    <div class="popover-arrow"></div>
    <div class="popover-header">
      <h4 class="popover-title">${lesson.title}</h4>
      <span class="popover-subtitle">${popoverSubtitleHTML}</span>
    </div>
    <div class="popover-body">
      ${previewHTML}
    </div>
    ${popoverFooterHTML}
  `;

  if (lesson.exercises && lesson.exercises.length > 0) {
    popover.querySelectorAll('.exercise-start-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const exerciseId = btn.dataset.exerciseId;
        popover.remove();
        startLesson(lessonId, exerciseId);
      });
    });
    popover.querySelectorAll('.exercise-preview-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const exerciseId = btn.dataset.exerciseId;
        const exercise = lesson.exercises.find(ex => ex.id === exerciseId);
        if (exercise) {
          openQuestionPreview(exercise.title, exercise.questions);
        }
      });
    });
  } else if (isUnlocked) {
    popover.querySelector('.popover-start-btn').addEventListener('click', () => {
      popover.remove();
      startLesson(lessonId);
    });
    const prevBtn = popover.querySelector('.popover-preview-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openQuestionPreview(lesson.title, lesson.questions);
      });
    }
  }

  popover.addEventListener('click', (e) => e.stopPropagation());

  const pathContainer = button.closest('.unit-path-container');
  if (pathContainer) {
    pathContainer.appendChild(popover);
    updateBodyScrollLock();
    
    // Auto-center or align to top of screen so everything is visible
    setTimeout(() => {
      const rect = popover.getBoundingClientRect();
      if (rect.height > window.innerHeight) {
        popover.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        popover.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  }
}

// Global listener to close popover on outside click
document.addEventListener('click', () => {
  const popover = document.querySelector('.lesson-popover');
  if (popover) {
    popover.remove();
    updateBodyScrollLock();
  }
});

function isLessonUnlocked(lessonId) {
  return true; // Şimdilik içerik kontrolü için tüm kilitler açıldı

  if (lessonId === 1) return true;

  // Find the lesson and its unit
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return false;

  const currentUnitId = lesson.unitId;

  // Ensure all lessons of all previous units are fully completed
  if (currentUnitId > 1) {
    for (let uId = 1; uId < currentUnitId; uId++) {
      const prevUnit = units.find(u => u.id === uId);
      if (prevUnit) {
        const allCompleted = prevUnit.lessons.every(lId => state.completedLessons.includes(lId));
        if (!allCompleted) return false;
      }
    }
  }

  // The lesson is only unlocked if the previous lesson is completed
  return state.completedLessons.includes(lessonId - 1);
}

// ============================================================
// BAŞARIMLAR RENDER
// ============================================================
function renderAchievements() {
  const grid = document.getElementById('achievements-grid');
  grid.innerHTML = '';

  achievements.forEach(ach => {
    const isUnlocked = state.unlockedAchievements.includes(ach.id);
    const card = document.createElement('div');
    card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    card.innerHTML = `
      <span class="achievement-icon">${ach.icon}</span>
      <div class="achievement-info">
        <span class="achievement-title">${ach.title}</span>
        <span class="achievement-desc">${ach.description}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ============================================================
// QUIZ MOTORU
// ============================================================
function startLesson(lessonId, exerciseId = null) {
  currentLesson = lessons.find(l => l.id === lessonId);
  if (!currentLesson) return;

  if (exerciseId && currentLesson.exercises) {
    const exercise = currentLesson.exercises.find(ex => ex.id === exerciseId);
    currentQuizQuestions = exercise ? exercise.questions : currentLesson.questions;
    currentLesson.activeExerciseId = exerciseId;
    currentLesson.activeExerciseTitle = exercise ? exercise.title : '';
  } else {
    currentQuizQuestions = currentLesson.questions;
    currentLesson.activeExerciseId = null;
    currentLesson.activeExerciseTitle = '';
  }

  currentQuestionIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  heartsAtStart = state.hearts;
  selectedAnswer = null;
  isAnswerChecked = false;
  matchState = null;

  // Can kontrolü
  if (state.hearts <= 0) {
    showGameOver();
    return;
  }

  updateQuizUI();
  showScreen('quiz-screen');
  renderQuestion();
}

function updateQuizUI() {
  // İlerleme çubuğu
  const total = isReviewMode ? reviewQuestions.length : currentQuizQuestions.length;
  const progress = (currentQuestionIndex / total) * 100;
  document.getElementById('quiz-progress').style.width = `${progress}%`;

  // Can
  document.getElementById('quiz-hearts-count').textContent = state.hearts;
}

function renderQuestion() {
  const question = isReviewMode ? reviewQuestions[currentQuestionIndex] : currentQuizQuestions[currentQuestionIndex];
  if (!question) return;

  selectedAnswer = null;
  isAnswerChecked = false;
  matchState = null;

  const body = document.getElementById('quiz-body');
  const btnCheck = document.getElementById('btn-check');
  const feedbackPanel = document.getElementById('feedback-panel');

  feedbackPanel.classList.remove('show', 'correct', 'wrong');
  btnCheck.disabled = true;
  btnCheck.textContent = 'KONTROL ET';

  updateQuizUI();

  switch (question.type) {
    case 'multiple-choice':
      renderMultipleChoice(body, question);
      break;
    case 'word-bank':
      renderWordBank(body, question);
      break;
    case 'matching':
      renderMatching(body, question);
      break;
    case 'fill-blank-dropdown':
      renderFillBlankDropdown(body, question);
      break;
    case 'fill-blank-text':
      renderFillBlankText(body, question);
      break;
    case 'translation-text':
      renderTranslationText(body, question);
      break;
    case 'multiple-fill-blank':
      renderMultipleFillBlank(body, question);
      break;
  }
}

// ── Çoktan Seçmeli ──────────────────────────────────────────
function renderMultipleChoice(container, question) {
  let promptHtml = question.prompt;
  if (question.enSentence && question.isEngToTr) {
    promptHtml = promptHtml.replace(question.enSentence, makeTextHoverable(question.enSentence));
  }

  const renderedOptions = question.options.map((opt, i) => {
    let optHtml = opt;
    if (question.enSentence && !question.isEngToTr) {
      optHtml = makeTextHoverable(opt);
    }
    return `<button class="mc-option" data-index="${i}">${optHtml}</button>`;
  }).join('');

  container.innerHTML = `
    <p class="quiz-prompt">${promptHtml}</p>
    ${question.translation ? `<p class="quiz-translation">${question.translation}</p>` : ''}
    <div class="mc-options">
      ${renderedOptions}
    </div>
  `;

  container.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isAnswerChecked) return;
      container.querySelectorAll('.mc-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAnswer = parseInt(btn.dataset.index);
      document.getElementById('btn-check').disabled = false;

      // Seçim yapıldıktan 250ms sonra cevabı otomatik olarak kontrol et
      setTimeout(() => {
        checkAnswer();
      }, 250);
    });
  });
}

// ── Kelime Bankası ──────────────────────────────────────────
function renderWordBank(container, question) {
  const shuffledWords = [...question.words].sort(() => Math.random() - 0.5);

  let translationHtml = question.translation;
  if (question.isEngToTr && question.enSentence) {
    translationHtml = makeTextHoverable(translationHtml);
  }

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <p class="quiz-translation">${translationHtml}</p>
    <div class="wb-sentence" id="wb-sentence"></div>
    <div class="wb-bank" id="wb-bank">
      ${shuffledWords.map((w, i) => `
        <button class="wb-word" data-word="${w}" data-idx="${i}">${w}</button>
      `).join('')}
    </div>
  `;

  const sentenceContainer = document.getElementById('wb-sentence');
  const selectedWords = [];

  container.querySelectorAll('.wb-word').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isAnswerChecked) return;

      if (btn.classList.contains('in-sentence')) {
        // Cümleden kaldır
        const word = btn.dataset.word;
        const idx = selectedWords.indexOf(word);
        if (idx > -1) selectedWords.splice(idx, 1);
        btn.classList.remove('in-sentence');

        // Orijinal kelimeyi tekrar göster
        const original = container.querySelector(`.wb-word[data-word="${word}"]:not(.in-sentence).used`);
        if (original) original.classList.remove('used');

        updateSentenceDisplay();
        return;
      }

      if (btn.classList.contains('used')) return;

      btn.classList.add('used');
      selectedWords.push(btn.dataset.word);

      // Cümleye ekle
      const sentenceWord = document.createElement('button');
      sentenceWord.className = 'wb-word in-sentence';
      sentenceWord.dataset.word = btn.dataset.word;
      sentenceWord.textContent = btn.dataset.word;
      sentenceWord.addEventListener('click', () => {
        if (isAnswerChecked) return;
        const idx = selectedWords.indexOf(sentenceWord.dataset.word);
        if (idx > -1) selectedWords.splice(idx, 1);
        sentenceWord.remove();
        btn.classList.remove('used');
        updateSentenceDisplay();
      });
      sentenceContainer.appendChild(sentenceWord);

      updateSentenceDisplay();
    });
  });

  function updateSentenceDisplay() {
    sentenceContainer.classList.toggle('has-words', selectedWords.length > 0);
    selectedAnswer = selectedWords.length > 0 ? [...selectedWords] : null;
    document.getElementById('btn-check').disabled = selectedWords.length === 0;
  }
}

// ── Eşleştirme ──────────────────────────────────────────────
function renderMatching(container, question) {
  const shuffledRight = [...question.pairs].sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <div class="match-grid">
      <span class="match-col-header">Türkçe</span>
      <span class="match-col-header">İngilizce</span>
      ${question.pairs.map((pair, i) => `
        <button class="match-item match-left" data-left="${pair.left}" data-pair-index="${i}">${pair.left}</button>
        <button class="match-item match-right" data-right="${shuffledRight[i].right}">${makeTextHoverable(shuffledRight[i].right)}</button>
      `).join('')}
    </div>
  `;

  matchState = {
    pairs: question.pairs,
    selectedLeft: null,
    selectedRight: null,
    matchedCount: 0,
    totalPairs: question.pairs.length,
    wrongAttempts: 0
  };

  container.querySelectorAll('.match-left').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isAnswerChecked || btn.classList.contains('matched')) return;
      container.querySelectorAll('.match-left').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      matchState.selectedLeft = btn.dataset.left;
      tryMatch(container, question);
    });
  });

  container.querySelectorAll('.match-right').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isAnswerChecked || btn.classList.contains('matched')) return;
      container.querySelectorAll('.match-right').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      matchState.selectedRight = btn.dataset.right;
      tryMatch(container, question);
    });
  });
}

function tryMatch(container, question) {
  if (!matchState.selectedLeft || !matchState.selectedRight) return;

  const correctPair = question.pairs.find(p => p.left === matchState.selectedLeft);
  const isCorrectMatch = correctPair && correctPair.right === matchState.selectedRight;

  if (isCorrectMatch) {
    // Doğru eşleşme
    const leftBtn = container.querySelector(`.match-left[data-left="${matchState.selectedLeft}"]`);
    const rightBtn = container.querySelector(`.match-right[data-right="${matchState.selectedRight}"]`);

    leftBtn.classList.remove('selected');
    rightBtn.classList.remove('selected');
    leftBtn.classList.add('matched');
    rightBtn.classList.add('matched');

    matchState.matchedCount++;
  } else {
    // Yanlış eşleşme
    matchState.wrongAttempts++;

    const leftBtn = container.querySelector(`.match-left.selected`);
    const rightBtn = container.querySelector(`.match-right.selected`);

    if (leftBtn) leftBtn.classList.add('wrong-flash');
    if (rightBtn) rightBtn.classList.add('wrong-flash');

    setTimeout(() => {
      if (leftBtn) { leftBtn.classList.remove('selected', 'wrong-flash'); }
      if (rightBtn) { rightBtn.classList.remove('selected', 'wrong-flash'); }
    }, 500);
  }

  matchState.selectedLeft = null;
  matchState.selectedRight = null;

  // Tüm çiftler eşleşti mi?
  if (matchState.matchedCount === matchState.totalPairs) {
    selectedAnswer = matchState.wrongAttempts === 0 ? 'perfect' : 'with-errors';
    // Eşleştirme tamamlandı, otomatik kontrol
    setTimeout(() => {
      checkAnswer();
    }, 400);
  }
}

// ── Boşluk Doldurma - Açılır Menü (Dropdown) ──────────────────
function renderFillBlankDropdown(container, question) {
  const parts = question.sentence.split('___');
  const selectOptions = `<option value="" disabled selected>Seçin...</option>` +
    question.options.map((opt, i) => `<option value="${i}">${opt}</option>`).join('');

  const part0Html = makeTextHoverable(parts[0]);
  const part1Html = parts[1] ? makeTextHoverable(parts[1]) : '';

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <div style="font-size: 1.25rem; font-weight: 500; text-align: center; margin: 24px 0; color: var(--text-primary); line-height: 1.6;">
      ${part0Html}<select class="inline-dropdown" id="fb-dropdown-select">${selectOptions}</select>${part1Html}
    </div>
  `;

  const selectEl = document.getElementById('fb-dropdown-select');
  selectEl.addEventListener('change', () => {
    if (isAnswerChecked) return;
    selectedAnswer = parseInt(selectEl.value);
    document.getElementById('btn-check').disabled = isNaN(selectedAnswer);
  });
}

// ── Boşluk Doldurma - Serbest Metin (Text) ────────────────────
function renderFillBlankText(container, question) {
  const parts = question.sentence.split('___');

  const part0Html = makeTextHoverable(parts[0]);
  const part1Html = parts[1] ? makeTextHoverable(parts[1]) : '';

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <div style="font-size: 1.25rem; font-weight: 500; text-align: center; margin: 24px 0; color: var(--text-primary); line-height: 1.6;">
      ${part0Html}<input type="text" class="inline-text-input" id="fb-text-input" autocomplete="off" placeholder="yazın">${part1Html}
    </div>
  `;

  const inputEl = document.getElementById('fb-text-input');
  setTimeout(() => inputEl.focus(), 100);

  inputEl.addEventListener('input', () => {
    if (isAnswerChecked) return;
    selectedAnswer = inputEl.value.trim();
    document.getElementById('btn-check').disabled = selectedAnswer.length === 0;
  });
}

// ── Tam Metin Çeviri Testi (Klavyeli Girdi) ──────────────────
function renderTranslationText(container, question) {
  const placeholderText = question.isEngToTr ? "Türkçe çeviriyi buraya yazın..." : "İngilizce çeviriyi buraya yazın...";
  let promptHtml = question.prompt;
  if (question.enSentence && question.isEngToTr) {
    promptHtml = promptHtml.replace(question.enSentence, makeTextHoverable(question.enSentence));
  }

  container.innerHTML = `
    <p class="quiz-prompt">${promptHtml}</p>
    <div class="translation-input-wrap">
      <textarea class="translation-textarea" id="translation-text-area" placeholder="${placeholderText}" autocomplete="off"></textarea>
    </div>
  `;

  const textEl = document.getElementById('translation-text-area');
  setTimeout(() => textEl.focus(), 100);

  textEl.addEventListener('input', () => {
    if (isAnswerChecked) return;
    selectedAnswer = textEl.value.trim();
    document.getElementById('btn-check').disabled = selectedAnswer.length === 0;
  });
}

// ── Çoklu Boşluk Doldurma (multiple-fill-blank) ────────────────────
function renderMultipleFillBlank(container, question) {
  const parts = question.sentence.split('___');
  let sentenceHtml = '';
  
  parts.forEach((part, index) => {
    sentenceHtml += makeTextHoverable(part);
    if (index < parts.length - 1) {
      sentenceHtml += `<input type="text" class="inline-text-input multi-fb-input" data-index="${index}" autocomplete="off" placeholder="...">`;
    }
  });

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    ${question.translation ? `<p class="quiz-translation">${question.translation}</p>` : ''}
    <div style="font-size: 1.25rem; font-weight: 500; text-align: center; margin: 24px 0; color: var(--text-primary); line-height: 2;">
      ${sentenceHtml}
    </div>
  `;

  const inputs = container.querySelectorAll('.multi-fb-input');
  if (inputs.length > 0) {
    setTimeout(() => inputs[0].focus(), 100);
  }

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (isAnswerChecked) return;
      
      const allFilled = Array.from(inputs).every(inp => inp.value.trim().length > 0);
      document.getElementById('btn-check').disabled = !allFilled;
      
      selectedAnswer = Array.from(inputs).map(inp => inp.value.trim());
    });
  });
}
function checkAnswer() {
  if (isAnswerChecked) return;
  isAnswerChecked = true;

  const question = isReviewMode ? reviewQuestions[currentQuestionIndex] : currentQuizQuestions[currentQuestionIndex];
  let isCorrect = false;

  switch (question.type) {
    case 'multiple-choice':
      isCorrect = selectedAnswer === question.correctIndex;
      showMCFeedback(question);
      break;
    case 'word-bank':
      isCorrect = Array.isArray(selectedAnswer) &&
        selectedAnswer.length === question.correctOrder.length &&
        selectedAnswer.every((w, i) => w === question.correctOrder[i]);
      break;
    case 'matching':
      isCorrect = selectedAnswer === 'perfect';
      break;
    case 'fill-blank-dropdown':
      isCorrect = selectedAnswer === question.correctIndex;
      const selectEl = document.getElementById('fb-dropdown-select');
      if (selectEl) {
        selectEl.style.borderColor = isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
        selectEl.style.backgroundColor = isCorrect ? 'var(--color-correct-bg)' : 'var(--color-wrong-bg)';
        selectEl.style.color = isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
      }
      break;
    case 'fill-blank-text':
      {
        const userVal = (selectedAnswer || "").toLowerCase().trim();
        const correctVal = question.correct.toLowerCase().trim();
        isCorrect = userVal === correctVal;
        const inputEl = document.getElementById('fb-text-input');
        if (inputEl) {
          inputEl.style.borderBottomColor = isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
          inputEl.style.color = isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
        }
      }
      break;
    case 'translation-text':
      {
        const cleanUser = (selectedAnswer || "").toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();
        const cleanCorrect = question.correctSentence.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();
        isCorrect = cleanUser === cleanCorrect;
        const textEl = document.getElementById('translation-text-area');
        if (textEl) {
          textEl.style.borderColor = isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
          textEl.style.backgroundColor = isCorrect ? 'var(--color-correct-bg)' : 'var(--color-wrong-bg)';
          textEl.style.color = isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
        }
      }
      break;
    case 'multiple-fill-blank':
      {
        const userVals = (selectedAnswer || []).map(val => val.toLowerCase().trim());
        const correctVals = question.corrects.map(val => val.toLowerCase().trim());
        
        isCorrect = userVals.length === correctVals.length && userVals.every((val, i) => val === correctVals[i]);
        
        const inputs = document.querySelectorAll('.multi-fb-input');
        inputs.forEach((inputEl, idx) => {
          const isInputCorrect = userVals[idx] === correctVals[idx];
          if (inputEl) {
            inputEl.style.borderColor = isInputCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
            inputEl.style.backgroundColor = isInputCorrect ? 'var(--color-correct-bg)' : 'var(--color-wrong-bg)';
            inputEl.style.color = isInputCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
          }
        });
      }
      break;
  }

  // Feedback panel
  const feedbackPanel = document.getElementById('feedback-panel');
  const feedbackIcon = document.getElementById('feedback-icon');
  const feedbackText = document.getElementById('feedback-text');

  feedbackPanel.classList.add('show');

  if (isCorrect) {
    feedbackPanel.classList.add('correct');
    feedbackPanel.classList.remove('wrong');
    feedbackIcon.textContent = '✓';
    feedbackText.textContent = question.explanation || 'Harika! Doğru cevap! 🎉';
    correctCount++;
    state.xp += XP_PER_CORRECT;
    animateStat('stat-xp', 'xp-gain');
    updateDailyTaskProgress('xp', XP_PER_CORRECT);

    // Sorular doğru cevaplandığında sayfanın sağında ve solunda küçük havai fişek patlamaları oluşsun
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 65,
        spread: 360,
        startVelocity: 35,
        origin: { x: 0.2, y: 0.4 },
        scalar: 1.2
      });
      confetti({
        particleCount: 65,
        spread: 360,
        startVelocity: 35,
        origin: { x: 0.8, y: 0.4 },
        scalar: 1.2
      });
    }
    
    // Remove from wrongQuestions if answered correctly
    const qIndex = state.wrongQuestions.indexOf(question.id);
    if (qIndex > -1) {
      state.wrongQuestions.splice(qIndex, 1);
    }
  } else {
    feedbackPanel.classList.add('wrong');
    feedbackPanel.classList.remove('correct');
    feedbackIcon.textContent = '✗';

    let correctAnswerText = '';
    if (question.type === 'multiple-choice' || question.type === 'fill-blank-dropdown') {
      correctAnswerText = question.options[question.correctIndex];
    } else if (question.type === 'fill-blank-text') {
      correctAnswerText = question.correct;
    } else if (question.type === 'translation-text') {
      correctAnswerText = question.correctSentence;
    } else if (question.type === 'word-bank') {
      correctAnswerText = question.correctOrder.join(' ');
    } else if (question.type === 'multiple-fill-blank') {
      correctAnswerText = question.corrects.join(', ');
    }

    feedbackText.textContent = `Doğru cevap: ${correctAnswerText}`;
    wrongCount++;
    
    if (!isReviewMode) {
      state.hearts = Math.max(0, state.hearts - 1);
      animateStat('stat-hearts', 'heart-lose');
      updateTopBar();
      
      // Add to wrongQuestions for spaced repetition
      if (!state.wrongQuestions.includes(question.id)) {
        state.wrongQuestions.push(question.id);
      }
    }
  }

  saveState();

  const btnCheck = document.getElementById('btn-check');
  btnCheck.textContent = 'DEVAM ET';
  btnCheck.disabled = false;

  if (isCorrect) {
    autoAdvanceTimeout = setTimeout(() => {
      nextQuestion();
    }, 1200);
  }
}

function showMCFeedback(question) {
  const options = document.querySelectorAll('.mc-option');
  options.forEach(btn => {
    const idx = parseInt(btn.dataset.index);
    if (idx === question.correctIndex) {
      btn.classList.add('correct');
    } else if (idx === selectedAnswer && idx !== question.correctIndex) {
      btn.classList.add('wrong');
    }
  });
}

function showFBFeedback(question) {
  const options = document.querySelectorAll('.fb-option');
  options.forEach(btn => {
    const idx = parseInt(btn.dataset.index);
    if (idx === question.correctIndex) {
      btn.classList.add('selected');
      btn.style.borderColor = 'var(--color-correct)';
      btn.style.background = 'var(--color-correct-bg)';
    } else if (idx === selectedAnswer) {
      btn.style.borderColor = 'var(--color-wrong)';
      btn.style.background = 'var(--color-wrong-bg)';
    }
  });
}

function nextQuestion() {
  if (autoAdvanceTimeout) {
    clearTimeout(autoAdvanceTimeout);
    autoAdvanceTimeout = null;
  }
  currentQuestionIndex++;

  // Canlar bitti mi?
  if (!isReviewMode && state.hearts <= 0) {
    showGameOver();
    return;
  }

  // Ders/Tekrar bitti mi?
  const total = isReviewMode ? reviewQuestions.length : currentQuizQuestions.length;
  if (currentQuestionIndex >= total) {
    if (isReviewMode) {
      completeReviewSession();
    } else {
      completeLesson();
    }
    return;
  }

  renderQuestion();
}

function completeReviewSession() {
  isReviewMode = false;
  updateDailyTaskProgress('review', 1);
  saveState();
  showToast('Tekrar oturumu tamamlandı! Yanlışlarını pekiştirdin. 🎉', 'success');
  
  updateTopBar();
  renderLessonTree();
  renderAchievements();
  checkReviewBanner();
  showScreen('home-screen');
}

// ============================================================
// DERS TAMAMLAMA
// ============================================================
function completeLesson() {
  // Dersi tamamlanan listesine ekle
  if (currentLesson.activeExerciseId) {
    const exerciseKey = `${currentLesson.id}_${currentLesson.activeExerciseId}`;
    if (!state.completedLessons.includes(exerciseKey)) {
      state.completedLessons.push(exerciseKey);
    }
    // Eğer bu ders altındaki tüm alıştırmalar tamamlandıysa, dersin kendisini de tamamlandı olarak işaretle
    const allExercisesCompleted = currentLesson.exercises.every(ex =>
      state.completedLessons.includes(`${currentLesson.id}_${ex.id}`)
    );
    if (allExercisesCompleted && !state.completedLessons.includes(currentLesson.id)) {
      state.completedLessons.push(currentLesson.id);
    }
  } else {
    if (!state.completedLessons.includes(currentLesson.id)) {
      state.completedLessons.push(currentLesson.id);
    }
  }

  // Gece kuşu kontrolü
  const hour = new Date().getHours();
  if (hour >= 22 || hour < 6) {
    state.nightOwlTriggered = true;
  }

  // Mükemmeliyetçi kontrolü
  if (wrongCount === 0) {
    state.perfectLessonTriggered = true;
    updateDailyTaskProgress('perfect', 1);
  }

  updateDailyTaskProgress('lessons', 1);

  saveState();

  // Başarım kontrolü
  const newAchievements = checkAchievements();

  // Özet ekranı güncelle
  const total = currentQuizQuestions.length;
  const accuracy = Math.round((correctCount / total) * 100);
  const earnedXP = correctCount * XP_PER_CORRECT;

  const exTitle = currentLesson.activeExerciseTitle ? ` - ${currentLesson.activeExerciseTitle}` : '';
  document.getElementById('summary-lesson-name').textContent = `"${currentLesson.title}${exTitle}" alıştırmasını tamamladın!`;
  document.getElementById('summary-xp').textContent = `+${earnedXP}`;
  document.getElementById('summary-accuracy').textContent = `${accuracy}%`;
  // Yeni başarımları göster
  const summaryAch = document.getElementById('summary-achievements');
  const achList = document.getElementById('summary-achievement-list');

  if (newAchievements.length > 0) {
    summaryAch.style.display = 'block';
    achList.innerHTML = newAchievements.map(a =>
      `<span class="summary-achievement-badge">${a.icon} ${a.title}</span>`
    ).join('');
  } else {
    summaryAch.style.display = 'none';
  }

  // Konfeti
  showScreen('summary-screen');
  if (typeof confetti === 'function') {
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b6e4e', '#5b8c5a', '#d4a843', '#c9a87c']
      });
    }, 300);
  }
}

// ============================================================
// CAN BİTTİ EKRANI
// ============================================================
function showGameOver() {
  const costEl = document.getElementById('refill-cost');
  costEl.textContent = `(${HEARTS_REFILL_COST} Puan)`;

  const refillBtn = document.getElementById('btn-refill-hearts');
  refillBtn.disabled = state.xp < HEARTS_REFILL_COST;

  if (state.xp < HEARTS_REFILL_COST) {
    refillBtn.style.opacity = '0.5';
    refillBtn.title = `Yeterli puan yok. (${state.xp}/${HEARTS_REFILL_COST})`;
  } else {
    refillBtn.style.opacity = '1';
    refillBtn.title = '';
  }

  showScreen('gameover-screen');
}

// ============================================================
// TEMA DEĞİŞTİRME
// ============================================================
function initTheme() {
  const saved = localStorage.getItem('amok_theme');
  if (['gold', 'canva', 'mint', 'sakura', 'sunset'].includes(state.activeTheme)) {
    document.documentElement.setAttribute('data-theme', state.activeTheme);
  } else if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('btn-theme').textContent = '☀️';
  }
}

function toggleTheme() {
  if (['gold', 'canva', 'mint', 'sakura', 'sunset'].includes(state.activeTheme)) {
    state.activeTheme = 'light';
    saveState();
  }
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('amok_theme', 'light');
    document.getElementById('btn-theme').textContent = '🌙';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('amok_theme', 'dark');
    document.getElementById('btn-theme').textContent = '☀️';
  }
  renderStore();
}

// ============================================================
// SEKME YÖNETİMİ
// ============================================================
function switchTab(tabId) {
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-content-${tabId}`);
  });
  if (tabId === 'leaderboard') {
    renderLeaderboard();
  } else if (tabId === 'store') {
    renderStore();
  } else if (tabId === 'profile') {
    renderProfile();
  }
}

// ============================================================
// PROFİL SEKME RENDER
// ============================================================
let activeSocialSubTab = 'online'; // Global tab state for social section

const MOCK_USER_DATABASE = [
  { username: 'John Doe', xp: 600, streak: 15, avatarColor: '#8BB8E8' },
  { username: 'Buse Kaya', xp: 410, streak: 8, avatarColor: '#E8919A' },
  { username: 'Mert Yılmaz', xp: 150, streak: 1, avatarColor: '#F2C078' },
  { username: 'Sarah Connor', xp: 180, streak: 12, avatarColor: '#8BC6A0' },
  { username: 'Melis Şen', xp: 90, streak: 2, avatarColor: '#E8CB6E' },
  { username: 'Deniz Aksu', xp: 720, streak: 25, avatarColor: '#7EC8C8' }
];

const MOCK_ONLINE_USERS = [
  { username: 'Buse Kaya', xp: 410, streak: 8, avatarColor: '#E8919A' },
  { username: 'Deniz Aksu', xp: 720, streak: 25, avatarColor: '#7EC8C8' },
  { username: 'Sarah Connor', xp: 180, streak: 12, avatarColor: '#8BC6A0' }
];

function handleProfilePhotoUpload(file) {
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast('Lütfen geçerli bir resim dosyası seçin!', 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, 128, 128);
      
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      state.profilePhoto = dataUrl;
      saveState();
      
      updateTopBar();
      renderProfile();
      renderSocialList();
      showToast('Profil fotoğrafı güncellendi! 📸', 'success');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function renderProfile() {
  const container = document.querySelector('#tab-content-profile .profile-container');
  if (!container) return;

  const firstLetter = (state.username || 'K').charAt(0).toUpperCase();
  const isGuest = state.isGuest;
  
  // Calculate completed lessons stats
  const completedCount = state.completedLessons.length;
  const totalLessons = lessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100) || 0;

  // Count achievements
  const unlockedCount = state.unlockedAchievements.length;
  const totalAchievements = achievements.length;
  
  // Generate achievements HTML
  const achievementsHTML = achievements.map(ach => {
    const isUnlocked = state.unlockedAchievements.includes(ach.id);
    return `
      <div class="profile-achievement-item ${isUnlocked ? 'unlocked' : 'locked'}">
        <span class="p-ach-icon">${ach.icon}</span>
        <div class="p-ach-info">
          <span class="p-ach-title">${ach.title}</span>
          <span class="p-ach-desc">${ach.description}</span>
        </div>
        ${isUnlocked ? '<span class="p-ach-status">✓</span>' : '<span class="p-ach-status">🔒</span>'}
      </div>
    `;
  }).join('');

  const avatarContent = state.profilePhoto 
    ? `<img src="${state.profilePhoto}" alt="Profil Fotoğrafı" class="profile-avatar-img">`
    : escapeHtml(firstLetter);

  container.innerHTML = `
    <div class="profile-header-card">
      <div class="profile-avatar-wrap">
        <div class="profile-avatar" id="profile-avatar-trigger" title="Profil fotoğrafını değiştir">
          ${avatarContent}
          <div class="avatar-edit-overlay">
            <span>📷 Düzenle</span>
          </div>
        </div>
        <input type="file" id="profile-photo-input" accept="image/*" style="display: none;">
      </div>
      <div class="profile-user-details">
        <h2 class="profile-username">${escapeHtml(state.username || 'Kullanıcı')}</h2>
        <span class="profile-role-badge">${isGuest ? 'Misafir Hesap' : 'Kayıtlı Üye'}</span>
      </div>
    </div>

    ${isGuest ? `
      <div class="profile-guest-alert">
        <div class="guest-alert-icon">💡</div>
        <div class="guest-alert-body">
          <h3>İlerlemeni Kaydet!</h3>
          <p>Misafir modunda tarayıcı verileri silindiğinde ilerlemen kaybolabilir. Ücretsiz bir hesap açarak serini ve puanlarını koru!</p>
          <button class="btn btn-primary btn-full" id="btn-profile-register">Hesap Oluştur / Giriş Yap</button>
        </div>
      </div>
    ` : ''}

    <h3 class="profile-section-title">📊 İstatistiklerin</h3>
    <div class="profile-stats-grid">
      <div class="profile-stat-box">
        <span class="stat-box-icon">🔥</span>
        <div class="stat-box-values">
          <span class="stat-box-num">${state.streak}</span>
          <span class="stat-box-label">Günlük Seri</span>
        </div>
      </div>
      <div class="profile-stat-box">
        <span class="stat-box-icon">⚡</span>
        <div class="stat-box-values">
          <span class="stat-box-num">${state.xp}</span>
          <span class="stat-box-label">Toplam Puan</span>
        </div>
      </div>
      <div class="profile-stat-box">
        <span class="stat-box-icon">📚</span>
        <div class="stat-box-values">
          <span class="stat-box-num">${completedCount}/${totalLessons}</span>
          <span class="stat-box-label">Ders İlerlemesi (${progressPercent}%)</span>
        </div>
      </div>
      <div class="profile-stat-box">
        <span class="stat-box-icon">🏆</span>
        <div class="stat-box-values">
          <span class="stat-box-num">${unlockedCount}/${totalAchievements}</span>
          <span class="stat-box-label">Başarımlar</span>
        </div>
      </div>
    </div>

    <h3 class="profile-section-title">🏆 Başarımların İlerlemesi</h3>
    <div class="profile-achievements-list">
      ${achievementsHTML}
    </div>

    <div class="profile-actions-card">
      <h3 class="profile-section-title" style="margin-top: 0;">⚙️ Ayarlar</h3>
      <div class="profile-actions-buttons">
        <button class="btn btn-secondary" id="btn-profile-logout">Çıkış Yap / Hesap Değiştir</button>
        <button class="btn btn-ghost" id="btn-profile-clear" style="color: var(--color-wrong); border-color: var(--color-wrong-border);">İlerlemeyi Sıfırla</button>
      </div>
    </div>

    ${getReportsHTML()}
  `;

  // Attach event listeners
  const avatarTrigger = document.getElementById('profile-avatar-trigger');
  const fileInput = document.getElementById('profile-photo-input');
  
  if (avatarTrigger && fileInput) {
    avatarTrigger.addEventListener('click', () => {
      fileInput.click();
    });
    
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        handleProfilePhotoUpload(file);
      }
    });
  }

  if (isGuest) {
    const regBtn = document.getElementById('btn-profile-register');
    if (regBtn) {
      regBtn.addEventListener('click', () => {
        logout();
      });
    }
  }

  document.getElementById('btn-profile-logout').addEventListener('click', () => {
    logout();
  });

  document.getElementById('btn-profile-clear').addEventListener('click', () => {
    if (confirm('Tüm ders ilerlemeniz ve puanlarınız kalıcı olarak silinecektir. Emin misiniz?')) {
      state.completedLessons = [];
      state.unlockedAchievements = [];
      state.xp = 0;
      state.streak = 0;
      state.hearts = MAX_HEARTS;
      state.wrongQuestions = [];
      state.streakFreezeBought = false;
      state.profilePhoto = null;
      state.dailyTasks = {
        lastResetDate: new Date().toDateString(),
        tasks: getInitialDailyTasks()
      };
      state.following = [
        { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
        { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' }
      ];
      state.followers = [
        { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
        { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' },
        { username: 'Sarah Connor', xp: 180, streak: 12, avatarColor: '#8BC6A0' },
        { username: 'Melis Şen', xp: 90, streak: 2, avatarColor: '#E8CB6E' }
      ];
      saveState();
      showToast('Tüm verileriniz sıfırlandı!', 'info');
      enterApp();
      switchTab('profile');
    }
  });

  // Admin Reports listeners if they exist in DOM
  const btnExport = document.getElementById('btn-export-reports');
  const btnClearRep = document.getElementById('btn-clear-reports');
  
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      const reports = localStorage.getItem('amok_question_reports') || '[]';
      const blob = new Blob([reports], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `amok_question_reports_${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Hata bildirimleri başarıyla indirildi.', 'success');
    });
  }

  if (btnClearRep) {
    btnClearRep.addEventListener('click', () => {
      if (confirm('Tüm hata bildirimlerini silmek istediğinize emin misiniz?')) {
        localStorage.removeItem('amok_question_reports');
        showToast('Tüm hata bildirimleri temizlendi.', 'info');
        renderProfile();
      }
    });
  }
}

function initSocialSystem() {
  const subtabFollowing = document.getElementById('subtab-following');
  const subtabFollowers = document.getElementById('subtab-followers');
  const subtabOnline = document.getElementById('subtab-online');
  const searchInput = document.getElementById('social-search-input');
  const searchClear = document.getElementById('social-search-clear');
  const searchBtn = document.getElementById('btn-social-search');

  // Tab switching
  subtabFollowing.addEventListener('click', () => {
    activeSocialSubTab = 'following';
    subtabFollowing.classList.add('active');
    subtabFollowers.classList.remove('active');
    if (subtabOnline) subtabOnline.classList.remove('active');
    renderSocialList();
  });

  subtabFollowers.addEventListener('click', () => {
    activeSocialSubTab = 'followers';
    subtabFollowers.classList.add('active');
    subtabFollowing.classList.remove('active');
    if (subtabOnline) subtabOnline.classList.remove('active');
    renderSocialList();
  });

  if (subtabOnline) {
    subtabOnline.addEventListener('click', () => {
      activeSocialSubTab = 'online';
      subtabOnline.classList.add('active');
      subtabFollowing.classList.remove('active');
      subtabFollowers.classList.remove('active');
      renderSocialList();
    });
  }

  // Search input events
  searchInput.addEventListener('input', () => {
    searchClear.style.display = searchInput.value.trim().length > 0 ? 'block' : 'none';
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.style.display = 'none';
    document.getElementById('social-search-results').style.display = 'none';
    searchInput.focus();
  });

  // Search button
  searchBtn.addEventListener('click', () => {
    searchSocialUsers();
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchSocialUsers();
    }
  });

  // Initial render
  renderSocialList();
}

function renderSocialList() {
  const contentEl = document.getElementById('social-list-content');
  if (!contentEl) return;

  // Update tabs numbers
  const tabFollowing = document.getElementById('subtab-following');
  if (tabFollowing) tabFollowing.textContent = `Takip Ettiklerim (${state.following.length})`;
  
  const tabFollowers = document.getElementById('subtab-followers');
  if (tabFollowers) tabFollowers.textContent = `Takipçilerim (${state.followers.length})`;

  const tabOnline = document.getElementById('subtab-online');
  const onlineCount = 1 + MOCK_ONLINE_USERS.length; // me + mock online users
  if (tabOnline) tabOnline.textContent = `Çevrimiçi (${onlineCount})`;

  let currentList = [];
  if (activeSocialSubTab === 'following') {
    currentList = state.following;
  } else if (activeSocialSubTab === 'followers') {
    currentList = state.followers;
  } else if (activeSocialSubTab === 'online') {
    currentList = [
      { username: (state.username || 'Misafir') + ' (Sen)', xp: state.xp, streak: state.streak, avatarColor: '#5856D6', isSelf: true },
      ...MOCK_ONLINE_USERS
    ];
  }

  if (currentList.length === 0) {
    contentEl.innerHTML = `
      <div class="social-empty-state">
        ${activeSocialSubTab === 'following' ? 'Henüz kimseyi takip etmiyorsun. Yukarıdan arkadaş arayabilirsin!' : 'Sizi henüz kimse takip etmiyor.'}
      </div>
    `;
    return;
  }

  contentEl.innerHTML = currentList.map(user => {
    const letter = user.username.charAt(0).toUpperCase();
    const isFollowing = state.following.some(u => u.username === user.username);
    
    let actionBtn = '';
    if (activeSocialSubTab === 'following') {
      actionBtn = `
        <div class="social-action-buttons">
          <button class="social-btn social-kudos-btn" data-action="kudos" data-username="${escapeHtml(user.username)}" title="Tebrik Et">👏</button>
          <button class="social-btn social-unfollow-btn" data-action="unfollow" data-username="${escapeHtml(user.username)}">Takipten Çık</button>
        </div>
      `;
    } else if (activeSocialSubTab === 'followers') {
      // Followers tab
      actionBtn = isFollowing 
        ? `<span class="social-status-text">Takip Ediliyor</span>`
        : `<button class="social-btn social-follow-btn" data-action="follow" data-username="${escapeHtml(user.username)}">Geri Takip Et</button>`;
    } else if (activeSocialSubTab === 'online') {
      // Online tab
      if (user.isSelf) {
        actionBtn = `<span class="social-status-text online">Çevrimiçi</span>`;
      } else {
        const isUserFollowing = state.following.some(u => u.username === user.username);
        actionBtn = isUserFollowing 
          ? `<span class="social-status-text">Takip Ediliyor</span>`
          : `<button class="social-btn social-follow-btn" data-action="follow" data-username="${escapeHtml(user.username)}">Takip Et</button>`;
      }
    }

    const isOnlineTab = activeSocialSubTab === 'online';
    const onlineDotHtml = isOnlineTab ? `<span class="online-dot"></span>` : '';

    return `
      <div class="friend-card">
        <div class="friend-avatar" style="background-color: ${escapeHtml(user.avatarColor || '#7EC8C8')}">
          ${escapeHtml(letter)}
          ${onlineDotHtml}
        </div>
        <div class="friend-details">
          <span class="friend-name">${escapeHtml(user.username)}</span>
          <div class="friend-meta">
            <span class="friend-stat">⚡ ${user.xp} Puan</span>
            ${user.streak > 0 ? `<span class="friend-stat">🔥 ${user.streak} Gün</span>` : ''}
          </div>
        </div>
        ${actionBtn}
      </div>
    `;
  }).join('');

  // Güvenlik: addEventListener ile olay dinleyicilerini bağla (inline onclick yerine)
  contentEl.querySelectorAll('[data-action="kudos"]').forEach(btn => {
    btn.addEventListener('click', () => congratulateFriend(btn.dataset.username));
  });
  contentEl.querySelectorAll('[data-action="unfollow"]').forEach(btn => {
    btn.addEventListener('click', () => toggleFollowUser(btn.dataset.username, false));
  });
  contentEl.querySelectorAll('[data-action="follow"]').forEach(btn => {
    btn.addEventListener('click', () => toggleFollowUser(btn.dataset.username, true));
  });
}

function searchSocialUsers() {
  const input = document.getElementById('social-search-input');
  const resultsEl = document.getElementById('social-search-results');
  if (!input || !resultsEl) return;

  const query = input.value.trim().toLowerCase();
  if (query.length === 0) {
    resultsEl.style.display = 'none';
    return;
  }

  // Combine mock database and existing leaderboard to search
  const allSearchable = [
    ...MOCK_USER_DATABASE,
    { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
    { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' },
    { username: 'Can Kaya', xp: 210, streak: 0, avatarColor: '#F2A871' },
    { username: 'Sarah Connor', xp: 180, streak: 12, avatarColor: '#8BC6A0' },
    { username: 'Melis Şen', xp: 90, streak: 2, avatarColor: '#E8CB6E' }
  ];

  // Remove duplicates and self
  const uniqueUsers = [];
  const names = new Set();
  
  allSearchable.forEach(u => {
    if (u.username !== state.username && !names.has(u.username)) {
      names.add(u.username);
      uniqueUsers.push(u);
    }
  });

  const matches = uniqueUsers.filter(u => u.username.toLowerCase().includes(query));

  if (matches.length === 0) {
    resultsEl.innerHTML = `<div class="search-no-results">Kullanıcı bulunamadı.</div>`;
    resultsEl.style.display = 'block';
    return;
  }

  resultsEl.innerHTML = `
    <div class="search-results-header">Arama Sonuçları</div>
    <div class="search-results-list">
      ${matches.map(user => {
        const letter = user.username.charAt(0).toUpperCase();
        const isFollowing = state.following.some(u => u.username === user.username);
        
        const btnText = isFollowing ? 'Takipten Çık' : 'Takip Et';
        const btnClass = isFollowing ? 'social-unfollow-btn' : 'social-follow-btn';
        
        return `
          <div class="search-result-card">
            <div class="friend-avatar small" style="background-color: ${escapeHtml(user.avatarColor || '#7EC8C8')}">${escapeHtml(letter)}</div>
            <div class="search-result-details">
              <span class="search-result-name">${escapeHtml(user.username)}</span>
              <span class="search-result-xp">⚡ ${user.xp} Puan</span>
            </div>
            <button class="social-btn ${btnClass}" data-action="toggle-follow" data-username="${escapeHtml(user.username)}" data-follow="${!isFollowing}">${btnText}</button>
          </div>
        `;
      }).join('')}
    </div>
  `;
  resultsEl.style.display = 'block';

  // Güvenlik: addEventListener ile olay dinleyicilerini bağla
  resultsEl.querySelectorAll('[data-action="toggle-follow"]').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleFollowUser(btn.dataset.username, btn.dataset.follow === 'true');
    });
  });
}

function toggleFollowUser(username, isFollowing) {
  if (!state.following) {
    state.following = [];
  }

  if (isFollowing) {
    // Follow
    const allSearchable = [
      ...MOCK_USER_DATABASE,
      { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
      { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' },
      { username: 'Can Kaya', xp: 210, streak: 0, avatarColor: '#F2A871' },
      { username: 'Sarah Connor', xp: 180, streak: 12, avatarColor: '#8BC6A0' },
      { username: 'Melis Şen', xp: 90, streak: 2, avatarColor: '#E8CB6E' }
    ];
    
    const userToFollow = allSearchable.find(u => u.username === username);
    if (userToFollow && !state.following.some(u => u.username === username)) {
      state.following.push(userToFollow);
      showToast(`${username} takip edilmeye başlandı! 👤`, 'success');
      updateDailyTaskProgress('shop', 0); // triggers daily check just in case
    }
  } else {
    // Unfollow
    const idx = state.following.findIndex(u => u.username === username);
    if (idx > -1) {
      state.following.splice(idx, 1);
      showToast(`${username} takipten çıkarıldı.`, 'info');
    }
  }

  saveState();
  
  // Re-render the search panel if active
  const searchInput = document.getElementById('social-search-input');
  if (searchInput && searchInput.value.trim().length > 0) {
    searchSocialUsers();
  }

  // Update tabs numbers
  const tabFollowing = document.getElementById('subtab-following');
  if (tabFollowing) tabFollowing.textContent = `Takip Ettiklerim (${state.following.length})`;
  
  const tabFollowers = document.getElementById('subtab-followers');
  if (tabFollowers) tabFollowers.textContent = `Takipçilerim (${state.followers.length})`;

  // Re-render lists
  renderSocialList();
}

function congratulateFriend(username) {
  showToast(`${username} tebrik edildi! 👏👏`, 'success');
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 }
    });
  }
}

// ============================================================
// LİDERLİK TABLOSU
// ============================================================
function renderLeaderboard() {
  const list = document.getElementById('leaderboard-list');
  if (!list) return;

  const baseCompetitors = [
    { name: "Ahmet Yılmaz", xp: 450 },
    { name: "Elif Demir", xp: 320 },
    { name: "Can Kaya", xp: 210 },
    { name: "Sarah Connor", xp: 180 },
    { name: "Melis Şen", xp: 90 }
  ];

  const competitors = [
    ...baseCompetitors,
    { name: escapeHtml((state.username || 'Misafir') + " (Sen)"), xp: state.xp, isUser: true }
  ];

  competitors.sort((a, b) => b.xp - a.xp);

  list.innerHTML = competitors.map((c, index) => {
    const rank = index + 1;
    let rankClass = `rank-${rank}`;
    if (rank > 3) rankClass = 'rank-other';

    return `
      <tr class="leaderboard-row ${c.isUser ? 'user-row' : ''} ${rankClass}">
        <td><span class="rank-badge">${rank}</span></td>
        <td>${escapeHtml(c.name)}</td>
        <td>${c.xp} Puan</td>
      </tr>
    `;
  }).join('');
}

// ============================================================
// SANAL MAĞAZA İŞLEMLERİ
// ============================================================
function buyStoreItem(item, price) {
  const xpBefore = state.xp;
  if (state.xp < price) {
    showToast('Yeterli puan yok!', 'error');
    return;
  }

  if (item === 'hearts') {
    if (state.hearts >= MAX_HEARTS) {
      showToast('Canların zaten dolu!', 'warning');
      return;
    }
    state.hearts = MAX_HEARTS;
    state.xp -= price;
    showToast('Canların yenilendi! ❤️', 'success');
  } else if (item === 'streak-freeze') {
    if (state.streakFreezeBought) {
      showToast('Zaten bir adet Seri Dondurucun var!', 'warning');
      return;
    }
    state.streakFreezeBought = true;
    state.xp -= price;
    showToast('Seri Dondurucu satın alındı! ❄️', 'success');
  } else if (item === 'gold-theme') {
    if (state.activeTheme === 'gold') {
      state.activeTheme = 'light';
      document.documentElement.removeAttribute('data-theme');
      showToast('Altın tema kapatıldı.', 'info');
    } else {
      state.activeTheme = 'gold';
      state.xp -= price;
      document.documentElement.setAttribute('data-theme', 'gold');
      showToast('Altın tema aktif edildi! 👑', 'success');
    }
  } else if (item === 'canva-theme') {
    if (state.activeTheme === 'canva') {
      state.activeTheme = 'light';
      document.documentElement.removeAttribute('data-theme');
      showToast('Canva teması kapatıldı.', 'info');
    } else {
      state.activeTheme = 'canva';
      state.xp -= price;
      document.documentElement.setAttribute('data-theme', 'canva');
      showToast('Canva teması aktif edildi! 🎨', 'success');
    }
  } else if (item === 'mint-theme') {
    if (state.activeTheme === 'mint') {
      state.activeTheme = 'light';
      document.documentElement.removeAttribute('data-theme');
      showToast('Pastel Mint teması kapatıldı.', 'info');
    } else {
      state.activeTheme = 'mint';
      state.xp -= price;
      document.documentElement.setAttribute('data-theme', 'mint');
      showToast('Pastel Mint teması aktif edildi! 🌿', 'success');
    }
  } else if (item === 'sakura-theme') {
    if (state.activeTheme === 'sakura') {
      state.activeTheme = 'light';
      document.documentElement.removeAttribute('data-theme');
      showToast('Pastel Sakura teması kapatıldı.', 'info');
    } else {
      state.activeTheme = 'sakura';
      state.xp -= price;
      document.documentElement.setAttribute('data-theme', 'sakura');
      showToast('Pastel Sakura teması aktif edildi! 🌸', 'success');
    }
  } else if (item === 'sunset-theme') {
    if (state.activeTheme === 'sunset') {
      state.activeTheme = 'light';
      document.documentElement.removeAttribute('data-theme');
      showToast('Pastel Sunset teması kapatıldı.', 'info');
    } else {
      state.activeTheme = 'sunset';
      state.xp -= price;
      document.documentElement.setAttribute('data-theme', 'sunset');
      showToast('Pastel Sunset teması aktif edildi! 🌅', 'success');
    }
  }

  if (state.xp < xpBefore) {
    updateDailyTaskProgress('shop', 1);
  }

  saveState();
  updateTopBar();
  renderStore();
}

function renderStore() {
  const goldThemeBtn = document.getElementById('buy-gold-theme-btn');
  if (goldThemeBtn) {
    if (state.activeTheme === 'gold') {
      goldThemeBtn.textContent = 'Aktif (Kapat)';
      goldThemeBtn.classList.remove('btn-primary');
      goldThemeBtn.classList.add('btn-secondary');
    } else {
      goldThemeBtn.textContent = '200 Puan';
      goldThemeBtn.classList.add('btn-primary');
      goldThemeBtn.classList.remove('btn-secondary');
    }
  }

  const canvaThemeBtn = document.getElementById('buy-canva-theme-btn');
  if (canvaThemeBtn) {
    if (state.activeTheme === 'canva') {
      canvaThemeBtn.textContent = 'Aktif (Kapat)';
      canvaThemeBtn.classList.remove('btn-primary');
      canvaThemeBtn.classList.add('btn-secondary');
    } else {
      canvaThemeBtn.textContent = '150 Puan';
      canvaThemeBtn.classList.add('btn-primary');
      canvaThemeBtn.classList.remove('btn-secondary');
    }
  }

  const mintThemeBtn = document.getElementById('buy-mint-theme-btn');
  if (mintThemeBtn) {
    if (state.activeTheme === 'mint') {
      mintThemeBtn.textContent = 'Aktif (Kapat)';
      mintThemeBtn.classList.remove('btn-primary');
      mintThemeBtn.classList.add('btn-secondary');
    } else {
      mintThemeBtn.textContent = '100 Puan';
      mintThemeBtn.classList.add('btn-primary');
      mintThemeBtn.classList.remove('btn-secondary');
    }
  }

  const sakuraThemeBtn = document.getElementById('buy-sakura-theme-btn');
  if (sakuraThemeBtn) {
    if (state.activeTheme === 'sakura') {
      sakuraThemeBtn.textContent = 'Aktif (Kapat)';
      sakuraThemeBtn.classList.remove('btn-primary');
      sakuraThemeBtn.classList.add('btn-secondary');
    } else {
      sakuraThemeBtn.textContent = '120 Puan';
      sakuraThemeBtn.classList.add('btn-primary');
      sakuraThemeBtn.classList.remove('btn-secondary');
    }
  }

  const sunsetThemeBtn = document.getElementById('buy-sunset-theme-btn');
  if (sunsetThemeBtn) {
    if (state.activeTheme === 'sunset') {
      sunsetThemeBtn.textContent = 'Aktif (Kapat)';
      sunsetThemeBtn.classList.remove('btn-primary');
      sunsetThemeBtn.classList.add('btn-secondary');
    } else {
      sunsetThemeBtn.textContent = '130 Puan';
      sunsetThemeBtn.classList.add('btn-primary');
      sunsetThemeBtn.classList.remove('btn-secondary');
    }
  }

  const freezeBtn = document.getElementById('buy-streak-freeze-btn');
  if (freezeBtn) {
    if (state.streakFreezeBought) {
      freezeBtn.textContent = 'Satın Alındı';
      freezeBtn.disabled = true;
      freezeBtn.style.opacity = '0.5';
    } else {
      freezeBtn.textContent = '100 Puan';
      freezeBtn.disabled = false;
      freezeBtn.style.opacity = '1';
    }
  }
}

// ============================================================
// EVENT LİSTENERLER
// ============================================================
function initEventListeners() {
  // Tema
  document.getElementById('btn-theme').addEventListener('click', toggleTheme);

  // Kullanıcı menüsü
  document.getElementById('btn-user-menu').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('user-dropdown').classList.toggle('open');
  });

  document.addEventListener('click', () => {
    document.getElementById('user-dropdown').classList.remove('open');
  });

  // Çıkış
  document.getElementById('btn-logout').addEventListener('click', logout);

  // Giriş Yap butonu (Üst Bar)
  const loginTopbarBtn = document.getElementById('btn-login-topbar');
  if (loginTopbarBtn) {
    loginTopbarBtn.addEventListener('click', () => {
      showScreen('auth-screen');
    });
  }

  // Quiz kapatma
  document.getElementById('quiz-close').addEventListener('click', () => {
    if (confirm('Dersten çıkmak istediğine emin misin? İlerleme kaybedilecek.')) {
      updateTopBar();
      renderLessonTree();
      renderAchievements();
      showScreen('home-screen');
    }
  });

  // Soru Hata Bildirimi
  document.getElementById('quiz-report').addEventListener('click', () => {
    showReportModal();
  });

  // Kontrol Et / Devam Et butonu
  document.getElementById('btn-check').addEventListener('click', () => {
    if (!isAnswerChecked) {
      checkAnswer();
    } else {
      nextQuestion();
    }
  });

  // Özet ekranı devam
  document.getElementById('btn-summary-continue').addEventListener('click', () => {
    updateTopBar();
    renderLessonTree();
    renderAchievements();
    showScreen('home-screen');

    // Find the next target lesson to open
    let targetLessonId = null;
    if (currentLesson) {
      if (currentLesson.exercises && currentLesson.exercises.length > 0) {
        // Check if there are uncompleted exercises in the current lesson
        const hasUncompleted = currentLesson.exercises.some(ex => !state.completedLessons.includes(`${currentLesson.id}_${ex.id}`));
        if (hasUncompleted) {
          targetLessonId = currentLesson.id;
        }
      }
      if (!targetLessonId) {
        const nextLesson = lessons.find(l => l.id === currentLesson.id + 1);
        if (nextLesson && isLessonUnlocked(nextLesson.id)) {
          targetLessonId = nextLesson.id;
        }
      }
    }

    if (targetLessonId) {
      setTimeout(() => {
        const button = document.querySelector(`.lesson-node[data-lesson-id="${targetLessonId}"]`);
        if (button) {
          button.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            button.click();
          }, 350);
        }
      }, 100);
    }
  });

  // Can Bitti ekranı butonları
  document.getElementById('btn-refill-hearts').addEventListener('click', () => {
    if (state.xp >= HEARTS_REFILL_COST) {
      state.xp -= HEARTS_REFILL_COST;
      state.hearts = MAX_HEARTS;
      state.warriorTriggered = true;
      saveState();
      checkAchievements();
      updateTopBar();
      showToast('Canlar dolduruldu! ❤️', 'success');

      // Derse geri dön
      if (currentLesson) {
        updateQuizUI();
        showScreen('quiz-screen');
        renderQuestion();
      } else {
        renderLessonTree();
        renderAchievements();
        showScreen('home-screen');
      }
    } else {
      showToast('Yeterli puan yok!', 'error');
    }
  });

  document.getElementById('btn-restart-lesson').addEventListener('click', () => {
    state.hearts = MAX_HEARTS;
    saveState();
    updateTopBar();
    if (currentLesson) {
      startLesson(currentLesson.id);
    }
  });

  document.getElementById('btn-go-home').addEventListener('click', () => {
    state.hearts = MAX_HEARTS;
    saveState();
    updateTopBar();
    renderLessonTree();
    renderAchievements();
    showScreen('home-screen');
  });

  // Sekmeler (Nav Tabs)
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  // Mağaza Satın Alma Butonları
  document.getElementById('buy-hearts-btn').addEventListener('click', () => buyStoreItem('hearts', 50));
  document.getElementById('buy-streak-freeze-btn').addEventListener('click', () => buyStoreItem('streak-freeze', 100));
  document.getElementById('buy-gold-theme-btn').addEventListener('click', () => buyStoreItem('gold-theme', 200));
  document.getElementById('buy-canva-theme-btn').addEventListener('click', () => buyStoreItem('canva-theme', 150));
  document.getElementById('buy-mint-theme-btn').addEventListener('click', () => buyStoreItem('mint-theme', 100));
  document.getElementById('buy-sakura-theme-btn').addEventListener('click', () => buyStoreItem('sakura-theme', 120));
  document.getElementById('buy-sunset-theme-btn').addEventListener('click', () => buyStoreItem('sunset-theme', 130));

  // Seviye Belirleme Sınavı
  const startPlacementBtn = document.getElementById('btn-start-placement');
  if (startPlacementBtn) {
    startPlacementBtn.addEventListener('click', () => {
      startPlacementTest();
    });
  }

  const placementCloseBtn = document.getElementById('placement-close');
  if (placementCloseBtn) {
    placementCloseBtn.addEventListener('click', () => {
      if (confirm('Sınavdan çıkmak istediğinize emin misiniz? Seviyeniz kaydedilmeyecek.')) {
        isPlacementMode = false;
        showScreen('home-screen');
      }
    });
  }

  const btnPlacementCheck = document.getElementById('btn-placement-check');
  if (btnPlacementCheck) {
    btnPlacementCheck.addEventListener('click', () => {
      if (!isPlacementAnswerChecked) {
        checkPlacementAnswer();
      } else {
        nextPlacementQuestion();
      }
    });
  }

  // Hızlı Tekrar
  const startReviewBtn = document.getElementById('btn-start-review');
  if (startReviewBtn) {
    startReviewBtn.addEventListener('click', () => {
      startReviewMode();
    });
  }

  // Klavye Kısayolları (Quiz ve Placement ekranları için)
  document.addEventListener('keydown', (e) => {
    // Eğer kullanıcı bir metin kutusuna veya alana yazıyorsa kısayolları engelle
    if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
      if (['1', '2', '3', '4'].includes(e.key)) {
        return; // Sayı yazmasına izin ver
      }
      if (e.key === 'Enter') {
        // Textarea içinde Enter satır atlamalı, input içindeyse kontrol butonu tıklanabilir
        if (document.activeElement.tagName === 'INPUT') {
          const checkBtn = document.getElementById('btn-check') || document.getElementById('btn-placement-check');
          if (checkBtn && !checkBtn.disabled) {
            checkBtn.click();
            e.preventDefault();
          }
        }
        return;
      }
    }

    const quizScreen = document.getElementById('quiz-screen');
    const placementScreen = document.getElementById('placement-screen');
    const summaryScreen = document.getElementById('summary-screen');

    if (quizScreen && quizScreen.classList.contains('active')) {
      // 1, 2, 3, 4 seçimi
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        // MC options
        const mcOpts = quizScreen.querySelectorAll('.mc-option');
        if (mcOpts.length > idx) {
          mcOpts[idx].click();
          return;
        }
        // Fill blank options
        const fbOpts = quizScreen.querySelectorAll('.fb-option');
        if (fbOpts.length > idx) {
          fbOpts[idx].click();
          return;
        }
      }
      // Enter: Kontrol Et / Devam Et
      if (e.key === 'Enter') {
        const checkBtn = document.getElementById('btn-check');
        if (checkBtn && !checkBtn.disabled) {
          checkBtn.click();
          e.preventDefault();
        }
      }
    } else if (placementScreen && placementScreen.classList.contains('active')) {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        const mcOpts = placementScreen.querySelectorAll('.mc-option');
        if (mcOpts.length > idx) {
          mcOpts[idx].click();
          return;
        }
        const fbOpts = placementScreen.querySelectorAll('.fb-option');
        if (fbOpts.length > idx) {
          fbOpts[idx].click();
          return;
        }
      }
      if (e.key === 'Enter') {
        const checkBtn = document.getElementById('btn-placement-check');
        if (checkBtn && !checkBtn.disabled) {
          checkBtn.click();
          e.preventDefault();
        }
      }
    } else if (summaryScreen && summaryScreen.classList.contains('active')) {
      if (e.key === 'Enter') {
        const summaryContinue = document.getElementById('btn-summary-continue');
        if (summaryContinue) {
          summaryContinue.click();
          e.preventDefault();
        }
      }
    }
  });
}

// ============================================================
// SEVİYE BELİRLEME SINAVI (PLACEMENT TEST)
// ============================================================
let placementCorrectCount = 0;
let placementCurrentIndex = 0;
let placementSelectedAnswer = null;
let isPlacementAnswerChecked = false;

function checkPlacementBanner() {
  const banner = document.getElementById('placement-banner');
  if (banner) {
    if (!state.placementTaken) {
      banner.style.display = 'flex';
    } else {
      banner.style.display = 'none';
    }
  }
}

function startPlacementTest() {
  isPlacementMode = true;
  placementCorrectCount = 0;
  placementCurrentIndex = 0;
  placementSelectedAnswer = null;
  isPlacementAnswerChecked = false;
  placementQuestionsList = placementQuestions;

  showScreen('placement-screen');
  renderPlacementQuestion();
}

function renderPlacementQuestion() {
  const question = placementQuestionsList[placementCurrentIndex];
  if (!question) return;

  placementSelectedAnswer = null;
  isPlacementAnswerChecked = false;

  const body = document.getElementById('placement-body');
  const btnCheck = document.getElementById('btn-placement-check');
  const feedbackPanel = document.getElementById('placement-feedback-panel');

  feedbackPanel.classList.remove('show', 'correct', 'wrong');
  btnCheck.disabled = true;
  btnCheck.textContent = 'KONTROL ET';

  // İlerleme çubuğu
  const total = placementQuestionsList.length;
  const progress = (placementCurrentIndex / total) * 100;
  document.getElementById('placement-progress').style.width = `${progress}%`;

  switch (question.type) {
    case 'multiple-choice':
      renderPlacementMultipleChoice(body, question);
      break;
    case 'fill-blank-dropdown':
      renderPlacementFillBlankDropdown(body, question);
      break;
    case 'fill-blank-text':
      renderPlacementFillBlankText(body, question);
      break;
  }
}

function renderPlacementMultipleChoice(container, question) {
  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <div class="mc-options">
      ${question.options.map((opt, i) => `
        <button class="mc-option" data-index="${i}">${opt}</button>
      `).join('')}
    </div>
  `;
  container.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isPlacementAnswerChecked) return;
      container.querySelectorAll('.mc-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      placementSelectedAnswer = parseInt(btn.dataset.index);
      document.getElementById('btn-placement-check').disabled = false;
    });
  });
}

function renderPlacementFillBlankDropdown(container, question) {
  const parts = question.sentence.split('___');
  const selectOptions = `<option value="" disabled selected>Seçin...</option>` +
    question.options.map((opt, i) => `<option value="${i}">${opt}</option>`).join('');

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <div style="font-size: 1.25rem; font-weight: 500; text-align: center; margin: 24px 0; color: var(--text-primary);">
      ${parts[0]}<select class="inline-dropdown" id="fb-placement-dropdown-select">${selectOptions}</select>${parts[1] || ''}
    </div>
  `;

  const selectEl = document.getElementById('fb-placement-dropdown-select');
  selectEl.addEventListener('change', () => {
    if (isPlacementAnswerChecked) return;
    placementSelectedAnswer = parseInt(selectEl.value);
    document.getElementById('btn-placement-check').disabled = isNaN(placementSelectedAnswer);
  });
}

function renderPlacementFillBlankText(container, question) {
  const parts = question.sentence.split('___');

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <div style="font-size: 1.25rem; font-weight: 500; text-align: center; margin: 24px 0; color: var(--text-primary);">
      ${parts[0]}<input type="text" class="inline-text-input" id="fb-placement-text-input" autocomplete="off" placeholder="yazın">${parts[1] || ''}
    </div>
  `;

  const inputEl = document.getElementById('fb-placement-text-input');
  setTimeout(() => inputEl.focus(), 100);

  inputEl.addEventListener('input', () => {
    if (isPlacementAnswerChecked) return;
    placementSelectedAnswer = inputEl.value.trim();
    document.getElementById('btn-placement-check').disabled = placementSelectedAnswer.length === 0;
  });
}

function checkPlacementAnswer() {
  const question = placementQuestionsList[placementCurrentIndex];
  isPlacementAnswerChecked = true;

  let isCorrect = false;
  if (question.type === 'multiple-choice' || question.type === 'fill-blank-dropdown') {
    isCorrect = placementSelectedAnswer === question.correctIndex;
  } else if (question.type === 'fill-blank-text') {
    const userVal = (placementSelectedAnswer || "").toLowerCase().trim();
    const correctVal = question.correct.toLowerCase().trim();
    isCorrect = userVal === correctVal;
  }

  const panel = document.getElementById('placement-feedback-panel');
  const icon = document.getElementById('placement-feedback-icon');
  const text = document.getElementById('placement-feedback-text');

  panel.classList.add('show');
  if (isCorrect) {
    panel.classList.add('correct');
    panel.classList.remove('wrong');
    icon.textContent = '✓';
    text.textContent = 'Doğru! Tebrikler.';
    placementCorrectCount++;

    // Sorular doğru cevaplandığında sayfanın sağında ve solunda küçük havai fişek patlamaları oluşsun
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 65,
        spread: 360,
        startVelocity: 35,
        origin: { x: 0.2, y: 0.4 },
        scalar: 1.2
      });
      confetti({
        particleCount: 65,
        spread: 360,
        startVelocity: 35,
        origin: { x: 0.8, y: 0.4 },
        scalar: 1.2
      });
    }
  } else {
    panel.classList.add('wrong');
    panel.classList.remove('correct');
    icon.textContent = '✗';
    let correctText = '';
    if (question.type === 'multiple-choice' || question.type === 'fill-blank-dropdown') {
      correctText = question.options[question.correctIndex];
    } else if (question.type === 'fill-blank-text') {
      correctText = question.correct;
    }
    text.textContent = `Yanlış. Doğru cevap: "${correctText}"`;
  }

  const btnCheck = document.getElementById('btn-placement-check');
  btnCheck.textContent = 'DEVAM ET';

  if (isCorrect) {
    autoAdvanceTimeout = setTimeout(() => {
      nextPlacementQuestion();
    }, 1200);
  }
}

function nextPlacementQuestion() {
  if (autoAdvanceTimeout) {
    clearTimeout(autoAdvanceTimeout);
    autoAdvanceTimeout = null;
  }
  placementCurrentIndex++;
  if (placementCurrentIndex >= placementQuestionsList.length) {
    completePlacementTest();
  } else {
    renderPlacementQuestion();
  }
}

function completePlacementTest() {
  state.placementTaken = true;

  let feedbackMsg = '';
  if (placementCorrectCount <= 2) {
    feedbackMsg = `Seviye Sınavı Tamamlandı! ${placementCorrectCount}/5 doğru yaptın. 1. Bölümden (Temel Seviye) başlaman uygun görüldü.`;
  } else if (placementCorrectCount <= 4) {
    // Unlock Unit 1 lessons (1 to 8)
    state.completedLessons = [1, 2, 3, 4, 5, 6, 7, 8];
    feedbackMsg = `Tebrikler! ${placementCorrectCount}/5 doğru yaptın. 1. Bölümü başarıyla atladın! Doğrudan 2. Bölümden başlayabilirsin.`;
  } else {
    // Unlock all lessons
    state.completedLessons = lessons.map(l => l.id);
    feedbackMsg = `Mükemmel! 5/5 doğru yaptın. Tüm seviyelerin kilidi açıldı, dilediğin konudan başlayabilirsin!`;
  }

  saveState();
  isPlacementMode = false;

  showToast('Seviyeniz başarıyla belirlendi!', 'success');
  alert(feedbackMsg);
  enterApp();
}

function showReportModal() {
  const question = isReviewMode ? reviewQuestions[currentQuestionIndex] : currentQuizQuestions[currentQuestionIndex];
  if (!question) {
    showToast('Aktif bir soru bulunamadı.', 'error');
    return;
  }
  
  const modal = document.createElement('div');
  modal.className = 'custom-modal-overlay';
  modal.id = 'report-modal';
  
  const questionText = question.prompt || question.sentence || 'Görsel / Eşleştirme';
  
  modal.innerHTML = `
    <div class="custom-modal">
      <div class="custom-modal-header">
        <h3>⚠️ Soru Hatası Bildir</h3>
        <button class="modal-close-btn" id="btn-close-report-modal">&times;</button>
      </div>
      <div class="custom-modal-body">
        <div class="report-question-info">
          <div class="info-row">
            <strong>Soru Metni:</strong>
            <span>${escapeHtml(questionText)}</span>
          </div>
          <div class="info-row">
            <strong>Soru ID:</strong>
            <span>${escapeHtml(question.id)}</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="report-error-type">Hata Türü</label>
          <select id="report-error-type" class="report-select">
            <option value="translation">Çeviri Hatası</option>
            <option value="typo">Yazım / İmla Hatası</option>
            <option value="answer">Cevap Anahtarı Hatası</option>
            <option value="technical">Teknik Sorun</option>
            <option value="other">Diğer</option>
          </select>
        </div>
        
        <div class="form-group" style="margin-top: 15px;">
          <label for="report-comment">Açıklamanız (Muhtemel düzeltme vb.)</label>
          <textarea id="report-comment" placeholder="Lütfen hatayı detaylandırın..." class="report-textarea"></textarea>
        </div>
      </div>
      <div class="custom-modal-footer">
        <button class="btn btn-secondary" id="btn-cancel-report">İptal</button>
        <button class="btn btn-primary" id="btn-submit-report">Bildirimi Gönder</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('btn-close-report-modal').addEventListener('click', () => modal.remove());
  document.getElementById('btn-cancel-report').addEventListener('click', () => modal.remove());
  document.getElementById('btn-submit-report').addEventListener('click', () => {
    const errorType = document.getElementById('report-error-type').value;
    const comment = document.getElementById('report-comment').value.trim();
    
    if (!comment) {
      showToast('Lütfen bir açıklama yazın.', 'error');
      return;
    }

    submitReport(question, errorType, comment);
    modal.remove();
  });
}

function submitReport(question, errorType, comment) {
  let reports;
  try {
    reports = JSON.parse(localStorage.getItem('amok_question_reports') || '[]');
  } catch (e) {
    console.error('Rapor veritabanı bozuk, sıfırlanıyor:', e);
    reports = [];
  }
  const questionLesson = (typeof lessons !== 'undefined') ? lessons.find(l => l.questions.some(q => q.id === question.id)) : null;
  const activeLesson = questionLesson || currentLesson;
  const lessonTitleStr = activeLesson ? `${activeLesson.id}. Ders (${activeLesson.subtitle})` : (isReviewMode ? 'Hızlı Tekrar' : 'N/A');
  const lessonIdStr = activeLesson ? activeLesson.id : 'N/A';

  const newReport = {
    id: "rep_" + Date.now(),
    timestamp: new Date().toLocaleString('tr-TR'),
    lessonId: lessonIdStr,
    lessonTitle: lessonTitleStr,
    questionId: question.id,
    questionPrompt: question.prompt || question.sentence || 'Görsel / Eşleştirme',
    questionType: question.type,
    errorType: errorType,
    userComment: comment,
    username: state.username || 'Misafir'
  };

  reports.push(newReport);
  localStorage.setItem('amok_question_reports', JSON.stringify(reports));
  
  // E-posta bildirimi gönder
  sendReportEmail(newReport);
  
  showToast('Hata bildiriminiz gönderildi. Teşekkür ederiz! 🙏', 'success');
}

function sendReportEmail(report) {
  if (typeof OBFUSCATED_EMAIL === 'undefined' || !OBFUSCATED_EMAIL) return;

  try {
    // Decode the Base64 email address to keep it hidden in source code
    const emailAddress = atob(OBFUSCATED_EMAIL);
    
    // FormSubmit AJAX API endpoint
    const url = `https://formsubmit.co/ajax/${emailAddress}`;
    
    const body = {
      _subject: `AMOK Soru Hata Bildirimi - ${report.lessonTitle}`,
      "Ders Bilgisi": report.lessonTitle,
      "Soru ID": report.questionId,
      "Soru Türü": report.questionType,
      "Soru Metni": report.questionPrompt,
      "Hata Türü": translateErrorType(report.errorType),
      "Kullanıcı Açıklaması": report.userComment,
      "Bildiren Kullanıcı": report.username,
      "Bildirim Zamanı": report.timestamp
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (!response.ok) {
        console.error('Email API returned non-ok status');
      }
    })
    .catch(error => {
      console.error('Error sending email request:', error);
    });
  } catch (err) {
    console.error('Error decoding obfuscated email:', err);
  }
}

function getReportsHTML() {
  let reports;
  try {
    reports = JSON.parse(localStorage.getItem('amok_question_reports') || '[]');
  } catch (e) {
    console.error('Raporlar yüklenemedi:', e);
    reports = [];
  }
  if (reports.length > 0) {
    return `
      <h3 class="profile-section-title" style="margin-top: 24px;">⚠️ Soru Hata Bildirimleri (${reports.length})</h3>
      <div class="profile-actions-card">
        <div class="profile-reports-list" style="max-height: 300px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
          ${reports.map(rep => `
            <div class="report-item" style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 12px; font-size: 0.82rem; line-height: 1.4; text-align: left;">
              <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">
                <span>${escapeHtml(rep.lessonTitle)} (ID: ${escapeHtml(rep.questionId)})</span>
                <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: normal;">${escapeHtml(rep.timestamp)}</span>
              </div>
              <div style="margin-bottom: 4px; color: var(--text-secondary);"><strong>Soru:</strong> <span style="font-style: italic;">${escapeHtml(rep.questionPrompt)}</span></div>
              <div style="margin-bottom: 4px; color: var(--text-secondary);"><strong>Hata Türü:</strong> <span style="background: var(--accent-primary-light); color: var(--accent-primary-hover); padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 0.75rem;">${translateErrorType(rep.errorType)}</span></div>
              <div style="background: var(--bg-card); border-left: 3px solid var(--color-wrong, #ff3b30); padding: 6px 10px; border-radius: 2px 4px 4px 2px; margin-top: 6px; color: var(--text-primary);">
                <strong>Kullanıcı Yorumu (${escapeHtml(rep.username)}):</strong> ${escapeHtml(rep.userComment)}
              </div>
            </div>
          `).join('')}}
        </div>
        <div class="profile-actions-buttons">
          <button class="btn btn-secondary" id="btn-export-reports">JSON Olarak İndir</button>
          <button class="btn btn-ghost" id="btn-clear-reports" style="color: var(--color-wrong); border-color: var(--color-wrong-border);">Tümünü Temizle</button>
        </div>
      </div>
    `;
  } else {
    return `
      <h3 class="profile-section-title" style="margin-top: 24px;">⚠️ Soru Hata Bildirimleri</h3>
      <div class="profile-actions-card" style="text-align: center; color: var(--text-muted); padding: 24px; font-size: 0.9rem;">
        Henüz bildirilmiş bir soru hatası bulunmuyor.
      </div>
    `;
  }
}

function translateErrorType(type) {
  switch (type) {
    case 'translation': return 'Çeviri Hatası';
    case 'typo': return 'Yazım / İmla Hatası';
    case 'answer': return 'Cevap Anahtarı Hatası';
    case 'technical': return 'Teknik Sorun';
    default: return 'Diğer';
  }
}

// ============================================================
// AKILLI TEKRAR (SPACED REPETITION) BANNER & REVIEW ENGINE
// ============================================================
function checkReviewBanner() {
  const banner = document.getElementById('review-banner');
  const btn = document.getElementById('btn-start-review');
  if (banner && btn) {
    if (state.wrongQuestions && state.wrongQuestions.length > 0) {
      banner.style.display = 'flex';
      btn.textContent = `Hızlı Tekrar (${state.wrongQuestions.length} Soru)`;
    } else {
      banner.style.display = 'none';
    }
  }
}

function startReviewMode() {
  if (!state.wrongQuestions || state.wrongQuestions.length === 0) return;

  isReviewMode = true;
  currentQuestionIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  selectedAnswer = null;
  isAnswerChecked = false;
  matchState = null;

  // Hata yapılan soruları veritabanından çek
  reviewQuestions = [];
  state.wrongQuestions.forEach(qId => {
    lessons.forEach(l => {
      const q = l.questions.find(quest => quest.id === qId);
      if (q) reviewQuestions.push(q);
    });
  });

  if (reviewQuestions.length === 0) {
    isReviewMode = false;
    showToast('Tekrar edilecek soru bulunamadı.', 'info');
    return;
  }

  showScreen('quiz-screen');
  renderQuestion();
}

// ============================================================
// WEB NOTIFICATION BİLDİRİMLERİ
// ============================================================
function initNotifications() {
  // Bildirim izni istemi kaldırıldı.
}

// ============================================================
// BAŞLATMA
// ============================================================
function init() {
  initTheme();
  loadState();
  initAuth();
  initEventListeners();

  // Eğer giriş yapılmamışsa varsayılan olarak misafir moduna al
  if (!state.username) {
    state.username = 'Misafir';
    state.isGuest = true;
    saveState();
  }
  initSocialSystem();
  enterApp();
  initNotifications();
}

// DOM yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', init);
