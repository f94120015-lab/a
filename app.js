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
  ],
  lastPromptedWrongCount: 0
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
let isTranslationGateActive = false;
let onTranslationGateVerify = null;
let wasTranslationCorrect = true;
let isTranslationGateTriggered = false;
let isPlacementMode = false;
let isReviewMode = false;
let reviewQuestions = [];
let placementQuestionsList = [];
let quizSessionId = 0;
let isCurrentExercisePassed = true;

let reflexTimer = null;
let reflexInterval = null;
let blitzKeyHandler = null;
let blitzStreak = 0;

// E-posta Bildirim Ayarları
const OBFUSCATED_EMAIL = "Zjk0MTIwMDE1QGdtYWlsLmNvbQ==";

// ============================================================
// KELİME SÖZLÜĞÜ VE HOVER ÇEVİRİ ALTYAPISI
// ============================================================
// wordDictionary was moved to data.js to support matching base translations


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

// Fallback dictionary for common English words that might be missing from lesson-specific data
const fallbackDictionary = {
  "19th": "19.",
  "abandon": "terk etmek",
  "about": "hakkında, yaklaşık",
  "above": "üzerinde, yukarıda",
  "abroad": "yurt dışı, yurt dışında",
  "absolute": "mutlak",
  "absorb": "emmek",
  "absorption": "emilim",
  "academic": "akademik",
  "accept": "kabul etmek",
  "acceptable": "kabul edilebilir",
  "access": "erişmek, erişim",
  "accessible": "erişilebilir",
  "according": "binaen",
  "accurate": "doğru, kesin",
  "accustomed": "alışkın",
  "achieved": "başarılmış, elde edilmiş",
  "acknowledgement": "teşekkür",
  "activate": "etkinleştir",
  "activities": "faaliyetler",
  "add": "eklemek",
  "added": "eklendi",
  "additional": "ek, ilave",
  "address": "adres, hitap etmek",
  "addresses": "adresler",
  "administered": "yönetilen",
  "administrative": "idari, yönetimsel",
  "administrator": "yönetici",
  "administrators": "yöneticiler",
  "adopt": "benimsemek, kabul etmek",
  "adrenaline": "adrenalin",
  "advance": "ilerlemek",
  "advanced": "gelişmiş, ileri düzey",
  "advantages": "avantajlar",
  "advocacy": "savunuculuk",
  "aesthetic": "estetik",
  "affect": "etkilemek",
  "after": "sonra",
  "afternoon": "öğleden sonra",
  "against": "karşı, aleyhinde",
  "agencies": "ajanslar, kurumlar",
  "agency": "ajans",
  "ago": "önce",
  "agreements": "anlaşmalar",
  "ahead": "ilerde",
  "aid": "yardım",
  "aim": "amaç",
  "aims": "amaçlar, hedefler",
  "airport": "havalimanı",
  "algorithm": "algoritma",
  "algorithms": "algoritmalar",
  "all": "tüm, bütün, hepsi",
  "allergic": "alerjik",
  "alliance": "ittifak",
  "allocate": "tahsis etmek, ayırmak",
  "allowed": "izin verilmiş, serbest",
  "almost": "neredeyse, hemen hemen",
  "alone": "yalnız, tek başına",
  "already": "zaten, çoktan",
  "also": "ayrıca, hem de",
  "alteration": "değişiklik",
  "although": "rağmen, -e karşın",
  "altitude": "rakım",
  "always": "her zaman, daima",
  "am": "olmak (1. tekil şahıs çekimi)",
  "among": "arasında (çok şey)",
  "amounts": "miktarlar",
  "analyst": "analist",
  "analysts": "analistler",
  "analyzing": "analiz etme, analiz etmek",
  "anatomical": "anatomik",
  "anatomy": "anatomi",
  "and": "ve",
  "annual": "yıllık",
  "anodes": "anotlar",
  "anomalies": "anomaliler",
  "anomaly": "anomali, sapma",
  "another": "başka bir, diğer bir",
  "antibodies": "antikorlar",
  "anticipate": "tahmin etmek, beklemek",
  "any": "hiç, herhangi bir",
  "api": "api",
  "appeal": "çekici",
  "appendix": "ek",
  "application": "uygulama",
  "approval": "onay",
  "approve": "onaylamak, beğenmek",
  "architect": "mimar",
  "architectural": "mimari",
  "architecture": "mimari",
  "are": "olmak (çoğul/2. şahıs çekimi)",
  "area": "alan, bölge",
  "arm": "kol, silahlandırmak",
  "armies": "ordular",
  "arrive": "ulaşmak, varmak",
  "art": "sanat",
  "astronomers": "gökbilimciler",
  "astronomical": "astronomik",
  "attacks": "saldırılar",
  "attempt": "girişim",
  "auditor": "denetçi",
  "auditors": "denetçiler",
  "audits": "denetimler",
  "authentication": "kimlik doğrulama",
  "authorities": "yetkililer",
  "authorization": "yetkilendirme",
  "authors'": "yazarların",
  "automated": "otomatikleştirilmiş, otomatik",
  "automatic": "otomatik",
  "automatically": "otomatik olarak",
  "automation": "otomasyon",
  "auxiliary": "ek",
  "away": "uzak, uzakta",
  "back": "geri",
  "backed": "destekli",
  "backend": "arka uç",
  "background": "arka plan",
  "backup": "yedekleme",
  "badge": "rozet",
  "badges": "kartlar, rozetler",
  "balloon": "balon",
  "bank's": "bankanın",
  "bankrupt": "iflas etmiş, iflas etmek",
  "barely": "ucu ucuna, zar zor",
  "basic": "temel",
  "beautiful": "güzel",
  "became": "oldu",
  "because": "çünkü, zira",
  "before": "önce, önünde",
  "beginning": "başlangıç",
  "begun": "başladı",
  "behind": "arkasında",
  "below": "altında, aşağıda",
  "beneficiaries": "faydalanıcılar",
  "beside": "yanında",
  "best": "en iyi",
  "between": "arasında (iki şey)",
  "bicarbonate": "bikarbonat",
  "bigger": "daha büyük",
  "bilateral": "ikili",
  "biological": "biyolojik",
  "biometric": "biyometrik",
  "blackout": "kesinti, karartma",
  "block": "engellemek",
  "blocked": "engellendi",
  "blue": "mavi",
  "board": "kurul, yönetim kurulu",
  "bodies": "bedenler",
  "body": "vücut",
  "book": "kitap",
  "booth": "çardak",
  "border": "sınır",
  "both": "her ikisi",
  "bottom": "alt",
  "bound": "sınırlı, mecbur, kesin",
  "box": "kutu, boks yapmak",
  "branch": "şube, branş",
  "breach": "ihlal, sızma",
  "breached": "ihlal edilmiş",
  "breaches": "ihlaller",
  "break": "kırmak",
  "breakfast": "kahvaltı",
  "bridge": "köprü",
  "britain": "britanya",
  "british": "i̇ngiliz",
  "brown": "kahverengi, Brown (isim)",
  "budget": "bütçe",
  "builds": "sürümler, yapılar",
  "but": "ama, fakat",
  "by": "tarafından, yanında, ile",
  "calculation": "hesaplama",
  "calculations": "hesaplamalar",
  "calibration": "kalibrasyon",
  "call": "çağırmak, aramak",
  "camera": "kamera",
  "can": "-ebilmek, -abilmek",
  "cancelled": "iptal edildi",
  "carbon": "karbon",
  "card": "kart",
  "career": "kariyer",
  "carried": "taşınan",
  "carries": "taşır",
  "cause": "sebep olmak, neden",
  "cavity": "boşluk",
  "celestial": "göksel",
  "cells": "hücreler",
  "cellular": "hücresel",
  "central": "merkezi, merkez",
  "centralized": "merkezileştirilmiş",
  "century": "yüzyıl",
  "ceremony": "tören",
  "certain": "kesin",
  "certificates": "sertifikalar",
  "certification": "sertifikasyon, sertifika",
  "chamber": "odacık",
  "change": "değiştirmek, değişim",
  "chef": "şef",
  "chemical": "kimyasal",
  "chest": "göğüs",
  "chief": "baş, şef",
  "chloride": "klorür",
  "chocolate": "çikolata",
  "circumstances": "durumlar",
  "civic": "sivil",
  "civil": "sivil",
  "cleanly": "temiz bir şekilde",
  "cleanroom": "temiz oda",
  "cleanup": "temizlemek",
  "clearance": "gümrükleme",
  "client": "istemci, müşteri",
  "clock": "saat",
  "clone": "klon",
  "cloud": "bulut",
  "cluster": "küme",
  "coastal": "kıyı",
  "codebase": "kod tabanı",
  "codes": "kodlar",
  "coincidence": "tesadüf",
  "cold": "soğuk",
  "collapse": "çökmek, çöküş",
  "collect": "toplamak, biriktirmek",
  "collected": "toplanan, toplanmış",
  "colour": "renk",
  "combustion": "yanma",
  "commercial": "ticari",
  "committee": "komite",
  "communication": "iletişim",
  "communities": "topluluklar",
  "companies": "şirketler",
  "company": "şirket",
  "comparative": "karşılaştırmalı",
  "competitive": "rekabetçi",
  "compilation": "derleme",
  "compiled": "derlenmiş",
  "compiler": "derleyici",
  "compiling": "derleme, derlemek",
  "complete": "tamamlamak, tam",
  "complex": "karmaşık",
  "compliance": "uyumluluk",
  "components": "bileşenler",
  "comprehension": "anlama, kavrama",
  "comprehensive": "kapsamlı",
  "computational": "hesaplamalı",
  "computations": "hesaplamalar",
  "computing": "bilgi işlem",
  "conclusive": "kesin",
  "concrete": "somut, beton",
  "concurrent": "eşzamanlı",
  "conditions": "koşullar, şartlar",
  "conduct": "yürütmek, yapmak",
  "conference": "konferans",
  "confession": "itiraf",
  "confidential": "gizli",
  "configuration": "konfigürasyon",
  "configure": "yapılandırmak",
  "configuring": "yapılandırma, yapılandırmak",
  "conflict": "çelişki, çatışma",
  "connection": "bağlantı",
  "connections": "bağlantılar",
  "conservation": "koruma",
  "considered": "dikkate alınan",
  "constant": "devamlı",
  "construction": "yapı",
  "consult": "danışmak",
  "consultants": "danışmanlar",
  "consumed": "tüketilen",
  "contact": "temas etmek",
  "content": "içerik",
  "continue": "devam etmek",
  "continues": "devam eder",
  "continuous": "sürekli",
  "contract": "sözleşme",
  "contractors": "yükleniciler, müteahhitler",
  "contradictions": "çelişkiler",
  "contributions": "katkılar",
  "controls": "kontroller",
  "convenient": "uygun",
  "convention": "kongre",
  "cooperate": "iş birliği yapmak",
  "coordinates": "koordinatlar",
  "coordination": "koordinasyon",
  "coordinators": "koordinatörler",
  "copy": "kopyala",
  "core": "çekirdek, merkez",
  "corporate": "kurumsal",
  "corrupted": "bozuk",
  "cosmic": "kozmik",
  "council": "konsey",
  "cracks": "çatlaklar",
  "crash": "çökmek, çöküş",
  "crashed": "çöktü",
  "create": "yaratmak",
  "credentials": "kimlik bilgileri",
  "crew": "mürettebat",
  "crews": "ekipler",
  "crises": "krizler",
  "critical": "kritik",
  "crop": "mahsul",
  "cross-disciplinary": "disiplinler arası",
  "cross-platform": "platformlar arası",
  "crossdisciplinary": "disiplinler arası",
  "crucial": "kritik, çok önemli",
  "cryptographic": "kriptografik",
  "currencies": "para birimleri",
  "currency": "para birimi",
  "curricula": "müfredat",
  "cybersecurity": "siber güvenlik",
  "cylinder": "silindir",
  "daily": "günlük",
  "darker": "daha koyu",
  "darkness": "karanlık",
  "dashboard": "gösterge paneli",
  "data": "veri",
  "database": "veritabanı",
  "databases": "veritabanları",
  "dataset": "veri kümesi",
  "date": "tarih, randevu",
  "deadline": "son teslim tarihi",
  "decentralized": "merkezi olmayan",
  "decomposed": "ayrışmış",
  "decomposes": "ayrışır",
  "decrease": "azaltmak, azalış",
  "dedicated": "özel",
  "deeper": "daha derine",
  "deepspace": "derin uzay",
  "defended": "savundu",
  "delayed": "gecikmiş, ertelenmiş",
  "delays": "gecikmeler",
  "demonstrations": "gösteriler",
  "dense": "yoğun, sık",
  "deploy": "dağıtmak, devreye almak",
  "deploying": "yayınlama, konuşlandırmak",
  "deployment": "konuşlandırma",
  "describe": "betimlemek",
  "designing": "tasarlama, tasarlamak",
  "destination": "varış noktası",
  "detect": "tespit etmek",
  "determine": "belirlemek, kararlaştırmak",
  "developer": "geliştirici",
  "developers": "geliştiriciler",
  "device": "cihaz",
  "devices": "cihazlar",
  "diagnostic": "teşhis",
  "dictates": "dikte eder",
  "dictionary": "sözlük",
  "didn't": "yapmadı",
  "digital": "dijital",
  "dioxide": "dioksit",
  "direct": "doğrudan",
  "disconnected": "bağlantısı kesilmiş",
  "discrimination": "ayrımcılık",
  "disembarked": "gemiden inmiş",
  "disk": "disk",
  "display": "görüntülemek",
  "displays": "görüntüler",
  "disruptions": "kesintiler",
  "dissections": "diseksiyonlar",
  "documentation": "dokümantasyon",
  "documents": "belgeler",
  "doing": "yapma, yapmak",
  "don't": "yapma",
  "doomed": "mahkum (kötü sona)",
  "doors": "kapılar",
  "dose": "doz",
  "doubt": "şüphe",
  "down": "aşağı",
  "download": "indirmek",
  "downloading": "indiriliyor",
  "draft": "taslak",
  "drafts": "taslaklar",
  "drastically": "şiddetli bir şekilde",
  "drawn": "çizilmiş",
  "drew": "çizdi",
  "dried": "kurutulmuş",
  "dries": "kurur",
  "drive": "sürmek",
  "drone": "dron",
  "dropped": "düştü",
  "due": "vadesi gelen, -den dolayı",
  "during": "esnasında, boyunca",
  "dying": "ölme",
  "dynamic": "dinamik",
  "dynamically": "dinamik olarak",
  "dynamics": "dinamikler",
  "each": "her biri",
  "early": "erken, başlarında",
  "easy": "kolay",
  "economic": "ekonomik",
  "education": "eğitim",
  "educational": "eğitimsel, eğitim",
  "effect": "etki",
  "effective": "etkili",
  "efficiency": "verimlilik",
  "either": "ya, ikisinden biri",
  "electric": "elektrik",
  "electromagnetic": "elektromanyetik",
  "electronic": "elektronik",
  "embryo": "embriyo",
  "emergency": "acil durum",
  "empirical": "ampirik, deneysel",
  "employ": "istihdam etmek",
  "employees": "çalışanlar",
  "encrypted": "şifrelenmiş",
  "encryption": "şifreleme",
  "endangered": "nesli tükenmekte olan",
  "endorse": "onaylamak",
  "engagement": "nişanlanmak",
  "engine": "motor",
  "engineers": "mühendisler",
  "ensure": "emin olmak",
  "entity": "varlık",
  "environment": "ortam, çevre",
  "environmental": "çevresel",
  "equation": "denklem",
  "equations": "denklemler",
  "erratically": "düzensiz olarak",
  "erroneously": "yanlışlıkla",
  "errors": "hatalar",
  "establishment": "kuruluş",
  "ethical": "etik",
  "ethnicity": "etnik köken",
  "evaluate": "değerlendirmek",
  "evaluating": "değerlendirme, değerlendirmek",
  "evaluation": "değerlendirme",
  "even": "bile, hatta, çift",
  "evening": "akşam",
  "eventually": "eninde sonunda",
  "every": "her",
  "everyone": "herkes",
  "evolution": "evrim",
  "excavation": "kazı",
  "excavations": "kazılar",
  "exclusive": "özel",
  "execute": "çalıştırmak, yürütmek",
  "exhaustive": "kapsamlı, derinlemesine",
  "existence": "varoluş, varlık",
  "exothermic": "ekzotermik",
  "expansion": "genişleme",
  "expenses": "giderler, masraflar",
  "expert": "uzman",
  "experts": "uzmanlar",
  "expired": "günü geçmiş",
  "explain": "açıklamak",
  "explicit": "açık, net",
  "exploit": "faydalanmak",
  "extend": "uzatmak, genişletmek",
  "extension": "eklenti",
  "extensive": "kapsamlı, geniş",
  "external": "harici",
  "extra": "fazladan, ek",
  "extraction": "ekstraksiyon",
  "extreme": "aşırı",
  "face": "karşılaşmak, yüzleşmek",
  "facility": "tesis, imkan",
  "fail": "başarısız olmak",
  "failure": "arıza",
  "failures": "başarısızlıklar",
  "faint": "bayılmak",
  "fallen": "düşmüş",
  "falls": "düşme",
  "fan": "fan",
  "far": "uzak",
  "faulty": "hatalı",
  "favour": "iyilik, lütuf, desteklemek",
  "favourable": "uygun, olumlu, elverişli",
  "feature": "özellik",
  "feeds": "beslemeler",
  "few": "az, birkaç",
  "field": "alan",
  "fields": "alanlar",
  "file": "dosya",
  "files": "dosyalar",
  "filling": "doldurma",
  "final": "nihai, son",
  "financial": "finansal",
  "find": "bulmak",
  "findings": "bulgular",
  "firewall": "güvenlik duvarı",
  "firewalls": "güvenlik duvarları",
  "firmware": "ürün yazılımı",
  "first": "birinci, ilk",
  "fiscal": "mali",
  "fishing": "balık tutma, balıkçılık",
  "fix": "düzeltmek, sabitlemek",
  "flag": "işaretlemek, bayrak",
  "flexibility": "esneklik",
  "flickered": "titredi",
  "flight": "uçuş",
  "flying": "uçan",
  "folders": "klasörler",
  "football": "futbol",
  "form": "form, şekil, biçim, oluşturmak",
  "formal": "resmi",
  "fortified": "takviye edilmiş",
  "fossil": "fosil",
  "frame": "çerçeve",
  "framework": "çerçeve, altyapı",
  "frameworks": "çerçeveler",
  "freeze": "donmak, buz tutmak",
  "french": "Fransızca, Fransız",
  "friday": "Cuma",
  "frontend": "başlangıç ​​aşaması",
  "frozen": "dondurulmuş",
  "fruit": "meyve",
  "fuel": "yakıt",
  "fuels": "yakıtlar",
  "full": "tam, dolu",
  "fund": "fon",
  "fundamental": "esas",
  "funded": "finanse edilmiş, fonlanmış",
  "funding": "fonlama, finansman",
  "funds": "fonlar",
  "funny": "komik, eğlenceli",
  "future": "gelecek",
  "galileo's": "galileo'nun",
  "game": "oyun",
  "gamified": "oyunlaştırılmış",
  "gateway": "geçit",
  "gather": "toplanmak, bir araya gelmek",
  "gender": "cinsiyet",
  "generate": "oluşturmak",
  "generating": "üretme, üretmek",
  "generations": "nesiller",
  "generator": "jeneratör",
  "geographic": "coğrafi",
  "geology": "jeoloji",
  "german": "almanca",
  "get": "almak, edinmek, alışmak",
  "given": "verildi",
  "global": "küresel",
  "go": "gitmek",
  "gold": "altın",
  "got": "aldı, alıştı",
  "government": "hükümet, devlet",
  "grammar": "dilbilgisi",
  "grammatical": "gramer",
  "grant": "hibe etmek",
  "grants": "hibeler",
  "gravitational": "yerçekimi",
  "groups": "gruplar",
  "growth": "büyüme",
  "guest": "misafir",
  "guidance": "rehberlik, yönlendirme",
  "hackers": "bilgisayar korsanları",
  "handle": "idare etmek, ele almak",
  "handling": "yönetme, ele alma, idare etme",
  "happen": "olmak, meydana gelmek",
  "happens": "olur",
  "hardly": "neredeyse hiç, güç bela",
  "hardware": "donanım",
  "hate": "nefret etmek, sevmemek",
  "hazardous": "tehlikeli",
  "heat": "ısı, sıcaklık",
  "heavily": "ağır bir şekilde, yoğun olarak",
  "heavy": "ağır",
  "held": "tutulmuş",
  "here": "burada, burası",
  "high": "yüksek",
  "high-pressure": "yüksek basınçlı",
  "high-resolution": "yüksek çözünürlüklü",
  "highcapacity": "yüksek kapasite",
  "highly": "yüksek derecede, son derece",
  "highpressure": "yüksek basınç",
  "highresolution": "yüksek çözünürlük",
  "hightemperature": "yüksek sıcaklık",
  "him": "o",
  "hired": "işe alındı",
  "historical": "tarihsel, geçmişe ait",
  "honor": "onur",
  "hope": "umut, umut etmek",
  "hospital": "hastane",
  "hours": "saat",
  "how": "nasıl",
  "however": "yine de",
  "human": "insan",
  "hydraulic": "hidrolik",
  "hypothesized": "varsayılmış",
  "i": "ben",
  "ice": "buz",
  "identical": "birebir aynı",
  "identify": "tanımlamak, tespit etmek",
  "identity": "kimlik",
  "ignite": "tutuşturmak",
  "ignore": "göz ardı etmek",
  "ignored": "görmezden gelindi",
  "ill": "hasta",
  "immediately": "derhal, hemen",
  "immense": "engin",
  "immune": "bağışıklık",
  "implementing": "uygulama, uygulamak",
  "implication": "ima",
  "impossible": "imkansız",
  "improve": "geliştirmek, iyileştirmek",
  "improvement": "gelişme, iyileşme",
  "impure": "saf olmayan, kirli",
  "in": "içinde",
  "in front of": "önünde",
  "inasmuch": "o kadar ki",
  "inbound": "gelen",
  "inches": "inç",
  "incomplete": "tamamlanmamış",
  "increase": "artırmak, artış",
  "independent": "bağımsız",
  "indexes": "endeksler",
  "indicators": "göstergeler",
  "indoors": "kapalı alanlarda",
  "induce": "ikna etmek, sebep olmak",
  "industrial": "endüstriyel",
  "industrialized": "sanayileşmiş",
  "infant's": "bebeğin",
  "information": "bilgi",
  "infrastructure": "altyapı",
  "infrastructures": "altyapılar",
  "initial": "ilk, başlangıçtaki",
  "initiated": "başlatılan",
  "injection": "enjeksiyon, iğne yapma",
  "inputs": "girdiler",
  "inside": "inşinde, içeride",
  "installation": "kurulum",
  "institutes": "enstitüler",
  "institutional": "kurumsal",
  "institutions": "kurumlar",
  "instructional": "öğretici",
  "instructions": "talimatlar",
  "integrate": "entegre etmek",
  "integration": "entegrasyon",
  "intend": "niyet etmek",
  "intensive": "yoğun",
  "interaction": "etkileşim",
  "interface": "arayüz",
  "internal": "iç, dahili",
  "international": "uluslararası",
  "intervals": "aralıklar",
  "intervention": "araya girmek",
  "into": "içine",
  "invasive": "istilacı",
  "invest": "yatırım yapmak",
  "investigative": "araştırmacı, soruşturma amaçlı",
  "investigator": "araştırmacı, soruşturmacı",
  "investors": "yatırımcılar",
  "iron": "ütü",
  "irreversibly": "geri dönülemez biçimde",
  "is": "olmak (3. tekil şahıs çekimi)",
  "isolating": "izole etme, izole etmek",
  "issue": "sorun, mesele",
  "issues": "sorunlar, meseleler",
  "junior": "küçük, alt düzey, yardımcı",
  "just": "sadece, henüz, adil",
  "keep": "kale",
  "kept": "tutulmuş",
  "know": "bilmek",
  "lab": "laboratuvar",
  "laboratories": "laboratuvarlar",
  "laboratory": "laboratuvar",
  "lack": "eksiklik, yoksunluk",
  "lacked": "-den yoksun olmak, eksik olmak",
  "lacks": "-den yoksun olmak, eksik olmak",
  "languages": "diller",
  "large": "büyük",
  "last": "son, sürmek",
  "late": "geç",
  "latency": "gecikme",
  "later": "daha sonra",
  "launch": "başlatmak, yayına sokmak",
  "layout": "düzen",
  "lead": "baş, lider",
  "leak": "sızıntı",
  "learn": "öğrenmek",
  "learners": "öğrenciler",
  "learnt": "öğrenildi",
  "ledgers": "defterler",
  "left": "sol",
  "legacy": "miras",
  "legislative": "yasal, yasama",
  "legitimate": "meşru",
  "lens": "mercek",
  "lenses": "lensler",
  "less": "daha az",
  "lesson": "ders",
  "lest": "diye",
  "libraries": "kütüphaneler",
  "license": "lisans",
  "life": "hayat, yaşam",
  "likely": "muhtemel",
  "lime": "kireç, misket limonu",
  "linguistic": "dilsel",
  "literature": "edebiyat",
  "little": "küçük, az",
  "live": "yaşamak",
  "load": "yük",
  "loads": "yükler",
  "local": "yerel",
  "location": "konum",
  "locked": "kilitli",
  "log": "kayıt",
  "logging": "günlük tutma, kayıt tutma",
  "logical": "mantıksal",
  "logs": "günlükler, kayıtlar",
  "london": "Londra",
  "long": "uzun",
  "longer": "daha uzun",
  "longitudinal": "boyuna",
  "longstanding": "uzun süredir devam eden",
  "longterm": "uzun vadeli",
  "loose": "gevşek, serbest",
  "lose": "kaybetmek",
  "love": "aşk",
  "lung": "akciğer",
  "machinery": "makineleşme, makineler",
  "main": "ana",
  "maintenance": "bakım",
  "major": "büyük, ana",
  "make": "yapmak, etmek",
  "malfunction": "arıza",
  "malware": "kötü amaçlı yazılım",
  "management": "yönetim",
  "manager": "müdür, yönetici",
  "managers": "yöneticiler",
  "managing": "yönetme, yönetmek",
  "manipulation": "manipülasyon",
  "manner": "biçim",
  "manually": "el ile, manuel olarak",
  "manufacturer's": "üreticinin",
  "manuscript": "el yazması",
  "many": "birçok, çok",
  "map": "harita",
  "marginally": "marjinal olarak",
  "market": "piyasa, pazar",
  "massive": "devasa, büyük",
  "mathematical": "matematiksel",
  "measurable": "ölçülebilir",
  "mechanical": "mekanik",
  "mechanism": "mekanizma",
  "media": "medya",
  "mediate": "arabuluculuk yapmak",
  "medical": "tıbbi",
  "medieval": "ortaçağ",
  "meeting": "toplantı",
  "member": "üye",
  "memory": "bellek, hafıza",
  "mentioned": "bahsedilen, adı geçen",
  "merger": "birleşme",
  "message": "mesaj",
  "meticulously": "titizlikle",
  "metrics": "ölçümler, metrikler",
  "metropolitan": "büyükşehir",
  "microbes": "mikroplar",
  "microchip": "mikroçip",
  "microorganisms": "mikroorganizmalar",
  "microscope": "mikroskop",
  "microscopes": "mikroskoplar",
  "midnight": "gece yarısı",
  "migrate": "taşımak, göç etmek",
  "migrating": "taşıma, göç etme",
  "migration": "taşıma, göç",
  "mill": "değirmen",
  "mind": "akıl",
  "ministry": "bakanlık",
  "minor": "küçük",
  "minority": "azınlık",
  "minutes": "dakika",
  "mistake": "hata",
  "model": "model",
  "moderate": "orta, ılımlı",
  "modern": "modern",
  "modified": "değiştirilmiş",
  "modify": "değiştirmek, modifiye etmek",
  "modifying": "değiştirme, modifiye etmek",
  "module": "modül",
  "modules": "modüller",
  "moisture": "nem",
  "mold": "kalıba dökmek",
  "molecular": "moleküler",
  "moment": "an",
  "monday": "Pazartesi",
  "monetary": "parasal",
  "monitoring": "izleme, gözlemleme",
  "month": "ay",
  "months": "aylar",
  "more": "daha fazla, daha",
  "morning": "sabah",
  "most": "çoğu, en çok",
  "motherboard": "anakart",
  "much": "çok",
  "multi-factor": "çok faktörlü",
  "multidisciplinary": "multidisipliner",
  "multifactor": "çok faktörlü",
  "multiple": "çoklu",
  "municipality": "belediye",
  "names": "isimler, adlar",
  "nationalisation": "millileştirme",
  "near": "yakın",
  "necessary": "gerekli",
  "neither": "ne de, ikisi de değil",
  "network": "ağ",
  "neural": "sinirsel",
  "never": "asla, hiçbir zaman",
  "new": "yeni",
  "newly": "yeni, yakın zamanda",
  "newlydiscovered": "yeni keşfedilen",
  "next": "sonraki, gelecek",
  "next to": "yanında",
  "night": "gece",
  "no": "hayır, yok, hiçbir",
  "nobody": "hiç kimse",
  "noncompliant": "uyumsuz",
  "none": "hiçbiri, yok",
  "nonmetallic": "metalik olmayan",
  "nonprofit": "kar amacı gütmeyen",
  "northern": "kuzey",
  "not": "değil, olumsuzluk eki",
  "notice": "fark etmek, bildirim",
  "noticeable": "dikkat çekici",
  "notification": "bildiri",
  "numerous": "çeşitli",
  "nutrients": "besinler, gıdalar",
  "object": "nesne, itiraz etmek",
  "observers": "gözlemciler",
  "occur": "meydana gelmek, olmak",
  "occurred": "olmuş",
  "off": "kapalı, dışarıda, -den uzak",
  "office": "ofis",
  "offline": "çevrimdışı",
  "offpeak": "yoğun olmayan",
  "often": "sık sık",
  "old": "eski",
  "older": "daha eski",
  "once": "bir kere",
  "one": "bir",
  "ongoing": "devam ediyor",
  "online": "çevrimiçi",
  "only": "sadece, yalnızca",
  "onto": "üstüne",
  "opening": "açılış",
  "operate": "çalışmak, faaliyet göstermek, yürütülmek",
  "operates": "çalışır, faaliyet gösterir, yürütülür",
  "operating": "çalıştırma, işletmek",
  "operational": "operasyonel",
  "operators": "operatörler",
  "opinion": "fikir",
  "optimally": "optimal olarak",
  "optimistic": "iyimser",
  "optimization": "optimizasyon",
  "optimize": "optimize etmek",
  "or": "veya, yahut",
  "order": "emir",
  "organize": "organize etmek, düzenlemek",
  "other": "diğer, başka",
  "out": "dışarı, dışarıda",
  "outdated": "güncelliğini yitirmiş",
  "outside": "dışarı, dışarısı",
  "over": "üzerinde, aşırı, bitti",
  "overall": "etraflı",
  "overcame": "üstesinden geldi",
  "overflow": "taşma",
  "overflows": "taşmalar",
  "overheat": "aşırı ısınmak",
  "overheats": "aşırı ısınır",
  "overnight": "gecede",
  "oversight": "gözetim",
  "overtime": "fazla mesai",
  "package": "paket",
  "packages": "paketler",
  "packets": "paketler",
  "paint": "boyamak",
  "paints": "boyalar",
  "paradigm": "paradigma",
  "paragraph": "paragraf",
  "parameters": "parametreler",
  "parliament": "parlamento",
  "partition": "bölme",
  "partitions": "bölümler",
  "partnership": "ortaklık",
  "pass": "geçmek",
  "passengers": "yolcular",
  "password": "şifre",
  "past": "geçmiş",
  "path": "yol, patika",
  "paused": "duraklatıldı",
  "payment": "ödeme",
  "peerreview": "hakem değerlendirmesi",
  "peerreviewed": "hakemli",
  "percent": "yüzde",
  "performance": "performans",
  "permission": "izin",
  "permissions": "izinler",
  "phenomenon": "fenomen",
  "philosophical": "felsefi",
  "photosynthesis": "fotosentez",
  "pipeline": "boru hattı",
  "pipelines": "boru hatları",
  "piston": "piston",
  "place": "yer",
  "planning": "planlama",
  "plastic": "plastik",
  "platform": "platformu",
  "play": "oynamak",
  "player": "oyuncu",
  "please": "lütfen",
  "policy": "politika",
  "polluting": "kirletici",
  "poor": "kötü, zayıf",
  "portfolios": "portföyler",
  "possibility": "olasılık, ihtimal",
  "postponed": "ertelendi",
  "practical": "pratik",
  "practice": "pratik yapmak, uygulamak",
  "precautions": "önlemler",
  "precious": "değerli, kıymetli",
  "precisely": "tam olarak, kesinlikle",
  "preferences": "tercihler",
  "president": "başkan",
  "pressure": "basınç",
  "presumed": "varsayılan",
  "primary": "birincil, öncelikli",
  "principal": "baş, asıl, müdür",
  "print": "baskı",
  "printed": "baskılı",
  "privacy": "gizlilik",
  "private": "özel, gizli",
  "process": "işlemek, süreç",
  "processing": "işleme, işlem yapmak",
  "processor": "işlemci",
  "production": "üretim",
  "profiles": "profiller",
  "profitable": "karlı",
  "programmer": "programcı",
  "programmers": "programcılar",
  "programming": "programlama",
  "progress": "ilerlemek",
  "project": "proje",
  "projects": "projeler",
  "prominent": "öne çıkan",
  "proof": "kanıt, ispat",
  "proper": "düzgün, uygun",
  "properties": "özellikler",
  "protect": "korumak",
  "protective": "koruyucu",
  "protocol": "protokol",
  "protocols": "protokoller",
  "proximity": "yakınlık",
  "public": "kamu, halk",
  "publication": "yayın",
  "publish": "yayınlamak",
  "pump": "pompa",
  "pure": "saf, temiz",
  "quality": "kalite",
  "quarter": "çeyrek",
  "queries": "sorgular",
  "query": "sorgu",
  "questions": "sorular",
  "quite": "epeyce",
  "radar": "radar",
  "rain": "yağmur",
  "rainfall": "yağış",
  "ran": "koştu",
  "rapid": "hızlı",
  "rare": "nadir",
  "rarely": "nadiren, seyrek",
  "rate": "oran",
  "ratios": "oranlar",
  "read": "okumak",
  "real": "gerçek",
  "real-time": "gerçek zamanlı",
  "reallocate": "yeniden tahsis etmek",
  "reallocating": "yeniden tahsis etme",
  "reauthenticate": "yeniden kimlik doğrulaması yapmak",
  "reboot": "yeniden başlatmak",
  "recall": "hatırlamak",
  "receipt": "fiş",
  "recent": "son",
  "recession": "durgunluk",
  "reckless": "dikkatsiz, umursamaz",
  "recommend": "tavsiye etmek, önermek",
  "records": "kayıtlar, rekorlar",
  "recover": "düzelmek, iyileşmek",
  "recovery": "iyileşmek",
  "reduce": "azaltmak",
  "refactor": "kod yapılandırmak, yeniden düzenlemek",
  "refactored": "yeniden düzenlendi",
  "refactoring": "yeniden düzenleme, refaktör etmek",
  "reform": "reform",
  "refrained": "kaçındı",
  "refusal": "reddetme, ret",
  "refuse": "reddetmek",
  "regarding": "ilişkin, dair, hakkında",
  "region": "bölge",
  "regional": "bölgesel",
  "registration": "kayıt",
  "regularly": "düzenli olarak",
  "reinforce": "güçlendirmek, takviye etmek",
  "relevance": "alaka",
  "relied": "güvenildi",
  "religious": "din",
  "reluctant": "gönülsüz, isteksiz",
  "remain": "geriye kalmak",
  "remained": "kaldı",
  "remarkably": "dikkat çekici bir şekilde",
  "remember": "hatırlamak",
  "rendering": "oluşturma",
  "renewed": "yenilenmiş",
  "repeat": "tekrarlamak",
  "repetition": "tekrarlama",
  "report": "bildirmek, rapor",
  "rescue": "kurtarmak",
  "research": "araştırma",
  "researcher": "araştırmacı",
  "resemblance": "benzerlik",
  "reservoir": "rezervuar",
  "reset": "sıfırlamak, sıfırlama",
  "resistance": "rezistans",
  "resolve": "çözmek, kararlaştırmak",
  "responsibilities": "sorumluluklar",
  "restart": "tekrar başlat",
  "results": "sonuçlar",
  "resumed": "devam ettirildi",
  "retention": "elde tutma, koruma",
  "review": "incelemek, gözden geçirmek",
  "reviewing": "inceleme, gözden geçirmek",
  "revise": "revize etmek, gözden geçirmek",
  "rigid": "sert, katı, esnemez",
  "rigorous": "titiz",
  "risen": "dirildi",
  "rises": "yükselir, artar",
  "robert": "Robert (isim)",
  "robotic": "robotik",
  "rocks": "kayalar",
  "root": "kök, temel",
  "routine": "rutin",
  "rubber": "lastik",
  "rules": "kurallar",
  "run": "çalıştırmak, koşmak",
  "running": "koşma",
  "rural": "kırsal",
  "rust": "pas",
  "safe": "güvenli",
  "salvage": "kurtarma",
  "same": "aynı",
  "satisfactory": "tatmin edici",
  "saturdays": "cumartesiler, cumartesi günleri",
  "saved": "kaydedildi",
  "scan": "taramak",
  "scanner": "tarayıcı",
  "scanning": "tarama",
  "scarce": "kıt",
  "scarcely": "neredeyse hiç",
  "schedule": "takvim",
  "scope": "kapsam",
  "screen": "ekran",
  "script": "betik, senaryo",
  "scripts": "betikler, senaryolar",
  "seamlessly": "sorunsuzca",
  "second": "ikinci, saniye",
  "secondary": "ikincil",
  "sector": "sektör",
  "secure": "güvence altına almak, güvenli",
  "securely": "güvenli bir şekilde",
  "security": "güvenlik",
  "seek": "aramak",
  "seldom": "nadiren",
  "semester": "dönem, sömestr",
  "senior": "kıdemli, üst düzey",
  "sensitive": "hassas",
  "sensors": "sensörler",
  "separate": "ayrı",
  "september": "eylül",
  "serious": "cidden",
  "serve": "sert",
  "server": "sunucu",
  "servers": "sunucular",
  "session": "oturum",
  "sessions": "oturumlar",
  "sets": "setler, kümeler",
  "settings": "ayarlar",
  "severe": "ciddi, şiddetli",
  "share": "paylaşmak, pay",
  "shift": "vardiya, değişim, kaydırmak",
  "ship": "gemi",
  "shop": "dükkan, mağaza, alışveriş yapmak",
  "show": "göstermek",
  "shown": "gösterilen",
  "shows": "gösterir, şovlar",
  "shut": "kapatmak",
  "side": "yan, taraf",
  "sign": "imzalamak, işaret",
  "significant": "önemli, anlamlı",
  "silver": "gümüş",
  "similarity": "benzerlik",
  "simulation": "simülasyon",
  "since": "beri, -den beri, çünkü",
  "site": "alan",
  "six": "altı",
  "skin": "cilt, deri",
  "sleeping": "uyuma, uyumak",
  "slight": "hafif",
  "slow": "yavaş",
  "slowly": "yavaşça",
  "smaller": "daha küçük",
  "snow": "kar",
  "so": "böylece, bu yüzden, çok",
  "societies": "toplumlar",
  "socioeconomic": "sosyoekonomik",
  "sodium": "sodyum",
  "soft": "yumuşak",
  "software": "yazılım",
  "soldering": "lehimleme",
  "solid": "sağlam",
  "soluble": "çözünür",
  "solution": "çözelti, çözüm",
  "some": "bazı, biraz",
  "sometimes": "bazen",
  "sooner": "daha erken, yakında",
  "sorted": "sıralanmış",
  "source": "kaynak",
  "spatial": "mekansal",
  "speaking": "konuşma, konuşuyor",
  "specialists": "uzmanlar",
  "specialized": "uzmanlaşmış, özel",
  "spikes": "artışlar, sivri uçlar",
  "stabilize": "stabilize etmek, dengelemek",
  "stable": "istikrarlı, kararlı",
  "staff": "kadro",
  "stagnation": "durgunluk",
  "stalled": "durdu",
  "standardized": "standartlaştırılmış",
  "start": "başlamak, başlangıç",
  "startup": "girişim, yeni girişim",
  "statistical": "istatistiksel",
  "steady": "sabit durmak",
  "still": "hala, hareketsiz",
  "stir": "karıştırmak",
  "stock": "stoklamak",
  "stop": "durmak, durdurmak",
  "storage": "depolamak",
  "stories": "hikayeler",
  "storm": "fırtına",
  "streams": "akışlar",
  "strict": "katı, sıkı",
  "strike": "çarpmak",
  "structural": "yapısal",
  "structure": "yapı",
  "struggle": "çabalamak",
  "student": "öğrenci",
  "studies": "çalışmalar",
  "submit": "göndermek, sunmak",
  "substantial": "önemli, büyük",
  "substrates": "substratlar",
  "substructures": "altyapılar",
  "subzero": "sıfırın altında",
  "succeed": "başarmak, başarılı olmak",
  "success": "başarı",
  "sudden": "ani",
  "sugar": "şeker",
  "suggestion": "öneri, teklif",
  "summers": "yazlar, yaz mevsimleri",
  "summit": "zirve",
  "summits": "zirveler",
  "sunday": "pazar",
  "sundays": "Pazar günleri",
  "sunlight": "güneş ışığı",
  "superconducting": "süper iletken",
  "supervisor": "gözetmen, denetçi",
  "supplies": "tedarik",
  "support": "desteklemek, destek",
  "supposed": "gereken, beklenen",
  "suppressed": "bastırılmış",
  "surveys": "anketler, incelemeler",
  "suspicious": "şüpheli",
  "syntax": "sözdizimi",
  "synthetic": "sentetik",
  "system": "sistem",
  "systematic": "sistematik",
  "systematically": "sistematik olarak",
  "systems": "sistemler",
  "tasks": "görevler",
  "tax": "vergi",
  "team": "ekip, takım",
  "technical": "teknik",
  "technician": "teknisyen",
  "technicians": "teknisyenler",
  "technology": "teknoloji",
  "telecommunications": "telekomünikasyon",
  "tell": "anlatmak, söylemek",
  "ten": "on",
  "tendency": "eğilim, meyil",
  "terms": "şartlar, terimler",
  "test": "test etmek",
  "testimonies": "tanıklıklar",
  "testing": "test etme, test etmek",
  "tests": "testler",
  "testtube": "deney tüpü",
  "testtubes": "deney tüpleri",
  "than": "göre, -den (karşılaştırma)",
  "that": "şu, o, ki",
  "the": "belirteç (the)",
  "their": "onların",
  "them": "onlara",
  "then": "o zaman, sonra",
  "there": "orada, orası",
  "therefore": "öyleyse",
  "thermal": "termal",
  "these": "bunlar",
  "thick": "kalın",
  "things": "şeyler",
  "thinner": "daha ince",
  "third": "üçüncü",
  "thirdparty": "üçüncü şahıs",
  "this": "bu",
  "thorough": "kapsamlı",
  "though": "yine de",
  "thought": "düşünce",
  "thousand": "bin",
  "threaten": "tehdit etmek",
  "through": "vasıtasıyla, içinden",
  "throughout": "boyunca, genelinde",
  "till": "kadar, -e kadar",
  "timber": "kereste",
  "to": "-e, -a (yönelme)",
  "today's": "bugünün",
  "tokens": "jetonlar, simgeler",
  "toll": "geçiş ücreti",
  "tomorrow": "yarın",
  "tonight": "bu akşam",
  "too": "de/da, aşırı",
  "took": "aldı",
  "tool": "araç",
  "tools": "araçlar",
  "total": "toplam",
  "toward": "doğru, yönünde",
  "towards": "doğru, yönünde",
  "trackers": "izleyiciler",
  "tracking": "takip etme, izleme",
  "traffic": "trafik",
  "train": "tren, eğitmek",
  "transaction": "işlem",
  "transactions": "işlemler",
  "transferred": "transfer edildi",
  "translation": "çeviri, tercüme",
  "transparent": "şeffaf",
  "transport": "ulaşım",
  "transported": "taşınan",
  "travel": "seyahat etmek",
  "treaty": "anlaşma",
  "trend": "eğilim, gidişat, akım",
  "truth": "gerçek, hakikat",
  "tubes": "tüpler",
  "tuesday": "salı",
  "turbulent": "çalkantılı",
  "turkish": "Türkçe, Türk",
  "twenty": "yirmi",
  "twice": "iki kere",
  "type": "tip, tür, yazmak",
  "ultimate": "nihai",
  "unable": "yetersiz, yapamayan",
  "under": "altında",
  "undergo": "katlanmak",
  "undergone": "geçirilmiş",
  "unencrypted": "şifrelenmemiş",
  "unexpected": "beklenmedik",
  "uniformly": "eşit olarak",
  "unique": "benzersiz",
  "unit": "birim",
  "universities": "üniversiteler",
  "unlikely": "muhtemel olmayan",
  "unoptimized": "optimize edilmemiş",
  "unprecedented": "benzeri görülmemiş",
  "unpredicted": "öngörülemeyen",
  "until": "kadar, -e kadar",
  "unverified": "doğrulanmamış",
  "unwilling": "isteksiz",
  "up": "yukarı",
  "update": "güncellemek, güncelleme",
  "updates": "güncellemeler",
  "updating": "güncelleme, güncellemek",
  "upon": "üzerine, üzerinde",
  "urban": "kentsel, şehir",
  "urgent": "acil",
  "us": "bize, bizi",
  "use": "kullanmak, kullanım",
  "used": "kullanılmış, alışkın",
  "user": "kullanıcı",
  "users": "kullanıcılar",
  "usually": "genellikle",
  "vacuum": "vakum",
  "variations": "varyasyonlar",
  "varies": "değişir",
  "vercel": "Vercel (dağıtım platformu)",
  "very": "çok",
  "via": "aracılığıyla",
  "vibration": "titreşim",
  "visible": "görünür",
  "visit": "ziyaret etmek",
  "visual": "görsel",
  "vital": "hayati",
  "volatile": "uçucu",
  "vote": "oy",
  "walk": "yürümek",
  "walking": "yürüme, yürümek",
  "warehouse": "depo",
  "warnings": "uyarılar",
  "was": "idi, oldu",
  "wax": "balmumu",
  "wear": "giymek, takmak",
  "weather": "hava durumu",
  "week": "hafta",
  "weekend": "hafta sonu",
  "weights": "ağırlıklar",
  "went": "gitmiş",
  "were": "idiler, oldular",
  "wet": "ıslak, nemli",
  "what": "ne",
  "wheat": "buğday",
  "when": "ne zaman, -dığı zaman",
  "where": "nerede, nereye",
  "which": "hangi, ki o",
  "while": "iken, esnasında, süre",
  "who": "kim",
  "whom": "kime, kimi",
  "whose": "kimin",
  "why": "neden, niçin",
  "willing": "istekli, gönüllü",
  "winter": "kış",
  "wiped": "silindi",
  "with": "ile, birlikte",
  "within": "içinde, dahilinde",
  "without": "olmadan, -siz/-sız",
  "woman": "kadın",
  "wooden": "ahşap",
  "work": "çalışmak, iş",
  "working": "çalışma, çalışmak",
  "workload": "iş yükü",
  "write": "yazmak",
  "wrong": "yanlış, hatalı",
  "xrays": "röntgen ışınları",
  "years": "yıllar",
  "yesterday": "dün",
  "yet": "henüz, hala, ama",
  "yield": "ürün vermek, sağlamak",
  "young": "genç",
  "younger": "daha genç"
};

// Get the meaning of a word with various fallback logic
function getWordMeaning(word) {
  const clean = word.toLowerCase().trim();
  
  // Check main dictionary
  if (wordDictionary[clean]) return wordDictionary[clean];
  
  // Check fallback dictionary
  if (fallbackDictionary[clean]) return fallbackDictionary[clean];
  
  // 1. Common Irregular Verbs
  const irregulars = {
    "taken": "take", "took": "take", "chosen": "choose", "chose": "choose",
    "spent": "spend", "got": "get", "done": "do", "did": "do",
    "made": "make", "written": "write", "wrote": "write", "read": "read",
    "built": "build", "shown": "show", "held": "hold", "drawn": "draw",
    "drew": "draw", "begun": "begin", "began": "begin", "felt": "feel",
    "met": "meet", "lost": "lose", "slept": "sleep", "run": "run", "ran": "run",
    "is": "be", "was": "be", "were": "be", "been": "be", "are": "be", "am": "be"
  };
  if (irregulars[clean]) {
    const base = irregulars[clean];
    if (wordDictionary[base]) return wordDictionary[base];
    if (fallbackDictionary[base]) return fallbackDictionary[base];
  }
  
  // 2. Plurals / Third Person -s
  if (clean.endsWith('s')) {
    if (clean.endsWith('ies')) {
      const base = clean.slice(0, -3) + 'y';
      if (wordDictionary[base]) return wordDictionary[base];
      if (fallbackDictionary[base]) return fallbackDictionary[base];
    }
    if (clean.endsWith('es')) {
      const base = clean.slice(0, -2);
      if (wordDictionary[base]) return wordDictionary[base];
      if (fallbackDictionary[base]) return fallbackDictionary[base];
      
      const baseE = base + 'e';
      if (wordDictionary[baseE]) return wordDictionary[baseE];
      if (fallbackDictionary[baseE]) return fallbackDictionary[baseE];
    }
    const base = clean.slice(0, -1);
    if (wordDictionary[base]) return wordDictionary[base];
    if (fallbackDictionary[base]) return fallbackDictionary[base];
  }
  
  // 3. Past Tense -ed
  if (clean.endsWith('ed')) {
    if (clean.endsWith('ied')) {
      const base = clean.slice(0, -3) + 'y';
      if (wordDictionary[base]) return wordDictionary[base];
      if (fallbackDictionary[base]) return fallbackDictionary[base];
    }
    const baseEd = clean.slice(0, -2);
    if (wordDictionary[baseEd]) return wordDictionary[baseEd];
    if (fallbackDictionary[baseEd]) return fallbackDictionary[baseEd];
    
    const baseD = clean.slice(0, -1);
    if (wordDictionary[baseD]) return wordDictionary[baseD];
    if (fallbackDictionary[baseD]) return fallbackDictionary[baseD];
    
    if (clean.match(/[bcdfghjklmnpqrstvwxyz]\1ed$/)) {
      const baseDouble = clean.slice(0, -3);
      if (wordDictionary[baseDouble]) return wordDictionary[baseDouble];
      if (fallbackDictionary[baseDouble]) return fallbackDictionary[baseDouble];
    }
  }
  
  // 4. Gerund / Progressive -ing
  if (clean.endsWith('ing')) {
    if (clean.endsWith('ying')) {
      const base = clean.slice(0, -4) + 'y';
      if (wordDictionary[base]) return wordDictionary[base];
      if (fallbackDictionary[base]) return fallbackDictionary[base];
    }
    const baseIng = clean.slice(0, -3);
    if (wordDictionary[baseIng]) return wordDictionary[baseIng];
    if (fallbackDictionary[baseIng]) return fallbackDictionary[baseIng];
    
    const baseE = baseIng + 'e';
    if (wordDictionary[baseE]) return wordDictionary[baseE];
    if (fallbackDictionary[baseE]) return fallbackDictionary[baseE];
    
    if (clean.match(/[bcdfghjklmnpqrstvwxyz]\1ing$/)) {
      const baseDouble = clean.slice(0, -4);
      if (wordDictionary[baseDouble]) return wordDictionary[baseDouble];
      if (fallbackDictionary[baseDouble]) return fallbackDictionary[baseDouble];
    }
  }
  
  // 5. Adverbs -ly
  if (clean.endsWith('ly')) {
    if (clean.endsWith('ily')) {
      const base = clean.slice(0, -3) + 'y';
      if (wordDictionary[base]) return wordDictionary[base];
      if (fallbackDictionary[base]) return fallbackDictionary[base];
    }
    if (clean.endsWith('ally')) {
      const base = clean.slice(0, -4);
      if (wordDictionary[base]) return wordDictionary[base];
      if (fallbackDictionary[base]) return fallbackDictionary[base];
      
      const baseIc = base + 'ic';
      if (wordDictionary[baseIc]) return wordDictionary[baseIc];
      if (fallbackDictionary[baseIc]) return fallbackDictionary[baseIc];
    }
    const baseLy = clean.slice(0, -2);
    if (wordDictionary[baseLy]) return wordDictionary[baseLy];
    if (fallbackDictionary[baseLy]) return fallbackDictionary[baseLy];
  }
  
  // 6. Comparative / Superlative -er/-est
  if (clean.endsWith('er')) {
    const base = clean.slice(0, -2);
    if (wordDictionary[base]) return wordDictionary[base];
    if (fallbackDictionary[base]) return fallbackDictionary[base];
    if (clean.match(/[bcdfghjklmnpqrstvwxyz]\1er$/)) {
      const baseDouble = clean.slice(0, -3);
      if (wordDictionary[baseDouble]) return wordDictionary[baseDouble];
      if (fallbackDictionary[baseDouble]) return fallbackDictionary[baseDouble];
    }
  }
  if (clean.endsWith('est')) {
    const base = clean.slice(0, -3);
    if (wordDictionary[base]) return wordDictionary[base];
    if (fallbackDictionary[base]) return fallbackDictionary[base];
    if (clean.match(/[bcdfghjklmnpqrstvwxyz]\1est$/)) {
      const baseDouble = clean.slice(0, -4);
      if (wordDictionary[baseDouble]) return wordDictionary[baseDouble];
      if (fallbackDictionary[baseDouble]) return fallbackDictionary[baseDouble];
    }
  }
  
  // 7. Suffixes (-ment, -tion, -sion)
  if (clean.endsWith('ment')) {
    const base = clean.slice(0, -4);
    if (wordDictionary[base]) return wordDictionary[base];
    if (fallbackDictionary[base]) return fallbackDictionary[base];
  }
  if (clean.endsWith('ation')) {
    const base1 = clean.slice(0, -5) + 'ate';
    if (wordDictionary[base1]) return wordDictionary[base1];
    if (fallbackDictionary[base1]) return fallbackDictionary[base1];
    
    const base2 = clean.slice(0, -5);
    if (wordDictionary[base2]) return wordDictionary[base2];
    if (fallbackDictionary[base2]) return fallbackDictionary[base2];
    
    const base3 = clean.slice(0, -5) + 'e';
    if (wordDictionary[base3]) return wordDictionary[base3];
    if (fallbackDictionary[base3]) return fallbackDictionary[base3];
  }
  if (clean.endsWith('tion')) {
    const base1 = clean.slice(0, -4) + 'e';
    if (wordDictionary[base1]) return wordDictionary[base1];
    if (fallbackDictionary[base1]) return fallbackDictionary[base1];
    const base2 = clean.slice(0, -4) + 't';
    if (wordDictionary[base2]) return wordDictionary[base2];
    if (fallbackDictionary[base2]) return fallbackDictionary[base2];
  }
  if (clean.endsWith('sion')) {
    const base1 = clean.slice(0, -4) + 'de';
    if (wordDictionary[base1]) return wordDictionary[base1];
    if (fallbackDictionary[base1]) return fallbackDictionary[base1];
  }
  
  return null;
}

// Convert English text into hoverable HTML elements
function makeTextHoverable(text) {
  if (!text) return '';
  const wordRegex = /(<[^>]+>)|([a-zA-Z0-9'-]+)|([^a-zA-Z0-9'<-]+)/g;
  let match;
  let html = '';
  
  wordRegex.lastIndex = 0;
  while ((match = wordRegex.exec(text)) !== null) {
    const tag = match[1];
    const word = match[2];
    const nonWord = match[3];
    
    if (tag) {
      html += tag;
    } else if (word) {
      let meaning = getWordMeaning(word);
      if (!meaning) {
        // Try hyphen/compound splitting
        if (word.includes('-')) {
          const parts = word.split('-');
          const meanings = parts.map(p => getWordMeaning(p)).filter(Boolean);
          if (meanings.length > 0) meaning = meanings.join(' - ');
        }
      }
      if (meaning) {
        // Escape double quotes inside attribute
        const escapedMeaning = meaning.replace(/"/g, '&quot;');
        html += `<span class="hoverable-word" data-meaning="${escapedMeaning}">${word}</span>`;
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

function isLocalEnvironment() {
  return window.location.hostname === 'localhost' ||
         window.location.hostname === '127.0.0.1' ||
         window.location.hostname.includes('vercel.app') ||
         window.location.protocol === 'file:';
}

function saveState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

function setUnitTheme(unitId) {
  if (unitId === null || unitId === undefined) {
    document.documentElement.removeAttribute('data-unit-theme');
  } else {
    // Map unitId to theme numbers 1-10
    const themeNum = unitId === 0 ? 10 : (((unitId - 1) % 10) + 1);
    document.documentElement.setAttribute('data-unit-theme', themeNum);
  }
}

function updateActiveUnitTheme() {
  // Find the first lesson that is not completed
  const nextLesson = lessons.find(l => !state.completedLessons.includes(l.id));
  if (nextLesson) {
    setUnitTheme(nextLesson.unitId);
  } else {
    setUnitTheme(null);
  }
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
  const hasModal = document.querySelector('.qp-modal-overlay') !== null;

  if (homeScreenActive && hasModal) {
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
    updateActiveUnitTheme();
    requestAnimationFrame(() => {
      window.scrollTo(0, homeScreenScrollY);
    });
    setTimeout(checkAndShowReviewPrompt, 600);
  } else {
    window.scrollTo(0, 0);
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
            <span class="qp-detail-val">"${q.sentence || q.prompt || ''}"</span>
          </div>
          <div class="qp-detail-row">
            <span class="qp-detail-label">Seçenekler:</span>
            <div class="qp-options-list">${dropOpts}</div>
          </div>
        `;
        break;

      case 'fill-blank':
        typeLabel = "Butonlu Boşluk Doldurma";
        typeClass = "qp-type-fb";
        const fbOpts = q.options.map((opt, oIdx) => {
          const isCorrect = oIdx === q.correctIndex;
          return `<span class="qp-option-item ${isCorrect ? 'correct' : ''}">${opt} ${isCorrect ? '✓' : ''}</span>`;
        }).join('');
        detailsHtml = `
          <div class="qp-detail-row">
            <span class="qp-detail-label">Cümle Şablonu:</span>
            <span class="qp-detail-val">"${q.sentence || q.prompt || ''}"</span>
          </div>
          <div class="qp-detail-row">
            <span class="qp-detail-label">Seçenekler:</span>
            <div class="qp-options-list">${fbOpts}</div>
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

  // Şifre Göster/Gizle
  const toggleButtons = document.querySelectorAll('.password-toggle-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const inputId = btn.dataset.toggleFor;
      const input = document.getElementById(inputId);
      if (!input) return;

      const eyeOpen = btn.querySelector('.eye-open');
      const eyeClosed = btn.querySelector('.eye-closed');

      if (input.type === 'password') {
        input.type = 'text';
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
        btn.setAttribute('aria-label', 'Şifreyi Gizle');
      } else {
        input.type = 'password';
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
        btn.setAttribute('aria-label', 'Şifreyi Göster');
      }
    });
  });

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
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Giriş yapılıyor...';
    submitBtn.disabled = true;

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    try {
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
      showToast(`Hoş geldin, ${username}! 🎉`, 'success');
      enterApp();
    } catch (err) {
      console.error('Login error:', err);
      showToast('Giriş yapılırken bir hata oluştu!', 'error');
    } finally {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  });

  // Kayıt
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = registerForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Kayıt yapılıyor...';
    submitBtn.disabled = true;

    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;

    if (username.length < 3) {
      showToast('Kullanıcı adı en az 3 karakter olmalı!', 'error');
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      return;
    }

    try {
      const users = getUsers();
      if (users[username]) {
        showToast('Bu kullanıcı adı zaten alınmış!', 'error');
        return;
      }

      await saveUser(username, password);
      
      const initialAvatarColors = ['#E88A9A', '#B4A7D6', '#8BC6A0', '#E8CB6E', '#8B7EC8', '#7EC8C8'];
      const randomColor = initialAvatarColors[Math.floor(Math.random() * initialAvatarColors.length)];

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
        warriorTriggered: false,
        avatarColor: randomColor,
        following: []
      };
      saveState();
      showToast('Hesap oluşturuldu! Hoş geldin 🎉', 'success');
      enterApp();
    } catch (err) {
      console.error('Registration error:', err);
      showToast('Kayıt yapılırken bir hata oluştu!', 'error');
    } finally {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
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
  updateActiveUnitTheme();
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
  document.documentElement.removeAttribute('data-unit-theme');
  
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

  if (unitId === 0) {
    category = 'chatbot';
  } else if (unitId === 1 || unitId === 6) {
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
    category = 'blocks';
  } else if (unitId === 14) {
    category = 'multilingual';
  } else if (unitId === 15) {
    category = 'globe';
  } else if (unitId === 16) {
    category = 'greetings';
  } else if (unitId === 17) {
    category = 'blocks';
  } else if (unitId === 18) {
    category = 'time';
  } else if (unitId === 19) {
    category = 'teacher';
  } else if (unitId === 20) {
    category = 'train';
  } else if (unitId === 21) {
    category = 'chatbot';
  } else if (unitId === 22) {
    category = 'multilingual';
  } else if (unitId === 23) {
    category = 'time';
  } else if (unitId === 24) {
    category = 'time';
  } else if (unitId === 25) {
    category = 'grammar';
  } else if (unitId === 26) {
    category = 'blocks';
  } else if (unitId === 27) {
    category = 'teacher';
  } else if (unitId === 28) {
    category = 'globe';
  } else if (unitId === 29) {
    category = 'train';
  } else if (unitId === 30) {
    category = 'chatbot';
  } else if (unitId === 34) {
    category = 'grammar';
  }

  // Inject variety
  if (lessonIndex === 1 && (unitId === 2 || unitId === 7 || unitId === 8)) {
    category = 'calendar';
  }
  if (lessonIndex === 2 && (unitId === 1 || unitId === 6 || unitId === 9 || unitId === 20)) {
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

  // Render units in their database/TOC sequence
  const renderedUnits = [...units];

  let normalUnitIndex = 0;
  const unitDisplayNames = {};
  renderedUnits.forEach(u => {
    if (u.title.startsWith("Ara Bölüm") || u.title.startsWith("Bölüm")) {
      unitDisplayNames[u.id] = u.title;
    } else {
      normalUnitIndex++;
      unitDisplayNames[u.id] = `Bölüm ${normalUnitIndex}: ${u.title}`;
    }
  });

  renderedUnits.forEach((unit, uIdx) => {
    // 1. Calculate progress in this unit
    const completedInUnit = unit.lessons.filter(lId => state.completedLessons.includes(lId)).length;
    const totalInUnit = unit.lessons.length;
    const progressPercent = Math.round((completedInUnit / totalInUnit) * 100);

    const isNotUploadedUnit = unit.lessons.every(lId => {
      const l = lessons.find(lesson => lesson.id === lId);
      return !l || ((!l.exercises || l.exercises.length === 0) && (!l.questions || l.questions.length === 0));
    });
    let notUploadedBadgeHTML = '';
    if (isNotUploadedUnit) {
      notUploadedBadgeHTML = `
        <span class="unit-banner-not-uploaded-tag">
          <span class="tag-pulse-dot"></span>
          <span>Alıştırma Hazırlanacak</span>
        </span>
      `;
    }

    let originalBadgeHTML = '';
    const newVisualPos = uIdx + 1;
    /* DEV NOTE: Disabled from visuals per user request, preserved in archive/database
    if (unit.originalIndex && unit.originalIndex !== newVisualPos) {
      originalBadgeHTML = `
        <span class="original-pos-badge" title="Müfredat sıralaması öncesindeki bölüm numarası">
          Eski Sırası: Bölüm ${unit.originalIndex}
        </span>
      `;
    }
    */

    let extraBadgeHTML = '';
    const isStrictlyLocal = window.location.hostname === 'localhost' ||
                            window.location.hostname === '127.0.0.1' ||
                            window.location.protocol === 'file:';
    const extraUnitIds = [13, 17, 21, 22, 40, 101, 102, 103];
    if (isStrictlyLocal && extraUnitIds.includes(unit.id)) {
      extraBadgeHTML = `
        <span class="unit-banner-extra-tag">
          Ekstra
        </span>
      `;
    }

    // 2. Create Unit Section wrapper
    const unitSection = document.createElement('div');
    unitSection.className = 'unit-section';

    // Create Unit Banner
    const banner = document.createElement('div');
    const colorIndex = unit.id === 0 ? 10 : (((unit.id - 1) % 10) + 1);
    banner.className = `unit-banner unit-color-${colorIndex} ${isNotUploadedUnit ? 'not-uploaded-breath' : ''}`;
    banner.innerHTML = `
      <div class="unit-banner-info">
        <h2 class="unit-banner-title-row">
          <span>${unitDisplayNames[unit.id]}</span>
          ${notUploadedBadgeHTML}
          ${originalBadgeHTML}
          ${extraBadgeHTML}
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
    unitSection.appendChild(banner);

    banner.addEventListener('mouseenter', () => {
      setUnitTheme(unit.id);
    });
    banner.addEventListener('mouseleave', () => {
      updateActiveUnitTheme();
    });

    // 3. Create Winding Path Container (Height expanded to 190px per lesson to support larger nodes without overlapping)
    const pathContainer = document.createElement('div');
    pathContainer.className = `unit-path-container unit-path-color-${colorIndex}`;
    pathContainer.style.height = `${totalInUnit * 190}px`;

    // Compute coordinates for the lessons (Using a mathematical formula to guarantee all 20 units have unique shapes)
    const points = [];
    for (let idx = 0; idx < totalInUnit; idx++) {
      const u = unit.id;
      
      // Calculate parameters unique to each unit's ID
      const phase = (u * 1.7) % (2 * Math.PI);      // Unique phase shift
      const freq = 1.1 + (u * 0.1) % 0.6;           // Unique frequency
      const amp = 26 + (u * 2) % 6;                 // Increased amplitude for a more dramatic curved swing
      const tilt = ((u % 3) - 1) * (0.8 + (u % 2));  // Reduced diagonal tilt slope to avoid edge clipping
      
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
        ${progressD ? `<path class="path-progress" d="${progressD}" />` : ''}
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
        statusClass = `completed unit-pin-color-${colorIndex}`;
      } else if (isActive) {
        statusClass = `active unit-pin-color-${colorIndex}`;
      }

      // Generate the premium SVG illustration instead of emoji
      const illustrationContent = getLessonIllustration(lId, unit.id);

      // Progress Badge content
      let progressBadgeContent = '';
      const isNotUploadedLesson = (!lesson.exercises || lesson.exercises.length === 0) && (!lesson.questions || lesson.questions.length === 0);
      if (isNotUploadedLesson) {
        progressBadgeContent = `<div class="node-progress-badge">0</div>`;
      } else if (lesson.exercises && lesson.exercises.length > 0) {
        const completedCount = lesson.exercises.filter(ex => state.completedLessons.includes(`${lesson.id}_${ex.id}`)).length;
        const totalCount = lesson.exercises.length;
        const isAllExCompleted = completedCount === totalCount;
        progressBadgeContent = `<div class="node-progress-badge ${isAllExCompleted ? 'completed' : ''}">
          ${completedCount}/${totalCount}
        </div>`;
      } else {
        const totalCount = 1;
        const completedCount = isCompleted ? 1 : 0;
        progressBadgeContent = `<div class="node-progress-badge ${isCompleted ? 'completed' : ''}">
          ${completedCount}/${totalCount}
        </div>`;
      }

      // New Banner for active lesson
      const activeBannerContent = isActive ? '<div class="lesson-node-banner">Yeni</div>' : '';

      let lessonOriginalTagHTML = '';
      /* DEV NOTE: Disabled from visuals per user request, preserved in archive/database
      if (lesson.originalLessonId && lesson.originalLessonId <= 122 && lesson.originalLessonId !== lesson.displayId) {
        lessonOriginalTagHTML = `<div class="lesson-original-pos-tag">Eski: ${lesson.originalLessonId}. Ders</div>`;
      }
      */

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
          ${lessonOriginalTagHTML}
          ${isNotUploadedLesson ? '<div class="lesson-not-uploaded-badge">⏳ Alıştırma henüz yüklenmemiş</div>' : ''}
        </div>
      `;

      const btn = nodeWrapper.querySelector('.lesson-node');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();

        // Check guest restriction
        if (state.isGuest) {
          const firstUnit = units.find(u => u.id === 1);
          const firstUnitLessons = firstUnit ? firstUnit.lessons : [];
          const isUnit1Completed = firstUnitLessons.every(lId => state.completedLessons.includes(lId));
          if (unit.id !== 1 || isUnit1Completed) {
            showGuestBlockModal();
            return;
          }
        }

        togglePopover(btn, lId, unit.id, pt.x, pt.y);
      });

      pathContainer.appendChild(nodeWrapper);
    });

    unitSection.appendChild(pathContainer);
    container.appendChild(unitSection);
  });
}



function cleanExerciseTitle(title, idx) {
  if (!title) return `${idx}. Alıştırma`;
  let cleaned = title.replace(/^Alıştırma\s*\d+\s*:\s*/i, '');
  cleaned = cleaned.replace(/^Alıştırma\s*\d+\s*/i, '');
  cleaned = cleaned.trim();
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    return `${idx}. ${cleaned}`;
  }
  return `${idx}. Alıştırma`;
}

function cleanExerciseDescription(desc) {
  if (!desc) return '';
  
  // Detect range like (1-15), (Cümleler 1-15), (13-24)
  const rangeMatch = desc.match(/\((?:Cümleler\s+)?(\d+-\d+)\)/i) || desc.match(/\b(\d+-\d+)\b/);
  const rangeStr = rangeMatch ? `Cümleler ${rangeMatch[1]}` : '';
  
  // Remove range from original description
  let baseText = desc.replace(/\((?:Cümleler\s+)?\d+-\d+\)/gi, '').replace(/\b\d+-\d+\b/gi, '');
  
  // Keywords to remove (question types)
  const keywords = [
    'eşleştirme', 'çoktan seçmeli', 'seçmeli', 'sıralama', 'çeviri', 'kelime bankası', 
    'kelime havuzu', 'yazarak çeviri', 'yazma', 'boşluk doldurma', 
    'kelime eşleştirme', 'blok sıralama', 'cümle çevirileri', 'bağlamsal çeviri',
    'öbek eşleştirme', 'katmanlı çeviri', 'paketleri', 'soruları'
  ];
  
  keywords.forEach(kw => {
    const regex = new RegExp(kw, 'gi');
    baseText = baseText.replace(regex, '');
  });
  
  // Clean leftovers like commas, conjunctions, symbols
  baseText = baseText
    .replace(/[\s,;&+•\-\/]+/g, ' ')
    .replace(/\bve\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
    
  if (baseText.length > 10) {
    baseText = baseText.charAt(0).toUpperCase() + baseText.slice(1);
    return rangeStr ? `${baseText} (${rangeStr})` : baseText;
  }
  
  return rangeStr || 'Genel Pratik';
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
  const topic = rawTopics.find(t => (t.id !== undefined ? t.id : (rawTopics.indexOf(t) + 1)) === unit.id);
  const lessonIndex = unit.lessons.indexOf(lessonId);

  if (topic) {
    if (lesson.formula && lesson.example) {
      previewHTML = `
        <div class="grammar-preview-box">
          <div class="grammar-formula"><span class="formula-badge">Formül</span> ${lesson.formula}</div>
          ${lesson.description ? `<div class="grammar-description" style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 10px; line-height: 1.4; padding-top: 10px; border-top: 1px dashed rgba(255,255,255,0.15);">${lesson.description}</div>` : ''}
        </div>
      `;
    } else if (lesson.description) {
      previewHTML = `
        <div class="grammar-preview-box">
          <div class="grammar-description" style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">${lesson.description}</div>
        </div>
      `;
    } else if (lessonIndex === 0 && topic.vocab) {
      const wordsList = topic.vocab.map(w => `<span class="preview-word-badge">${w.en}: ${w.tr}</span>`).join('');
      previewHTML = `
        <div class="lesson-preview-title">Öğrenilecek kelimeler:</div>
        <div class="lesson-preview-words">${wordsList}</div>
      `;
    } else if (lessonIndex === 1 && topic.sentences) {
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
    } else {
      previewHTML = `
        <div class="lesson-preview-title">Ders Odak Noktası:</div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">Boşluk doldurma, kelime havuzu ve çoktan seçmeli sorularla pratik yapın.</p>
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
  /* DEV NOTE: Disabled from visuals per user request, preserved in archive/database
  if (lesson.originalLessonId && lesson.originalLessonId <= 122 && lesson.originalLessonId !== lesson.displayId) {
    popoverSubtitleHTML += `<br><span style="font-size: 0.72rem; color: var(--text-muted); display: block; margin-top: 4px; font-weight: normal;">Eski Sırası: ${lesson.originalLessonId}. Ders</span>`;
  }
  */

  let popoverFooterHTML = '';
  const isNotUploadedLesson = (!lesson.exercises || lesson.exercises.length === 0) && (!lesson.questions || lesson.questions.length === 0);
  if (isNotUploadedLesson) {
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
      let isExUnlocked = true;
      if (!isLocalEnvironment()) {
        if (index === 0) {
          isExUnlocked = isUnlocked;
        } else {
          isExUnlocked = state.completedLessons.includes(`${lesson.id}_${lesson.exercises[index - 1].id}`);
        }
      }
      
      const statusText = isExCompleted ? '✓ Tamamlandı' : (isExUnlocked ? 'Başlat' : 'Kilitli 🔒');
      const rowClass = isExUnlocked ? '' : 'locked';
      const badgeClass = isExCompleted ? 'completed' : '';
      
      return `
        <div class="popover-exercise-row ${rowClass}" data-exercise-id="${ex.id}">
          <div class="exercise-info">
            <span class="exercise-icon">${isExCompleted ? '✅' : '📝'}</span>
            <div class="exercise-meta">
              <div class="exercise-title-wrap">
                <span class="exercise-title">${cleanExerciseTitle(ex.title, index + 1)}</span>
                <span class="exercise-q-badge ${badgeClass}">${ex.questions ? ex.questions.length : 0} Soru</span>
              </div>
              <span class="exercise-subtitle">${cleanExerciseDescription(ex.description)}</span>
            </div>
          </div>
          <div class="qp-btn-group">
            <button class="exercise-preview-btn" ${isExUnlocked ? '' : 'disabled style="opacity: 0.5; pointer-events: none;"'} data-exercise-id="${ex.id}" title="Soruları Önizle">👁️ Önizle</button>
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
    
    // Dynamically adjust popover position to fit within the visible viewport bounds
    requestAnimationFrame(() => {
      const popoverRect = popover.getBoundingClientRect();
      const containerRect = pathContainer.getBoundingClientRect();
      const sidebar = document.querySelector('.sidebar-nav');
      
      const isSidebarLeft = sidebar && window.innerWidth >= 820;
      const leftBound = isSidebarLeft ? sidebar.getBoundingClientRect().right : 0;
      const rightBound = window.innerWidth;
      
      const W_p = popoverRect.width || 450;
      const W_container = containerRect.width || 440;
      
      const X_btn = (pctX / 100) * W_container;
      let X_p = X_btn; // center of popover relative to container
      
      // Calculate current screen bounds of the popover
      let popLeftScreen = containerRect.left + X_p - W_p / 2;
      let popRightScreen = containerRect.left + X_p + W_p / 2;
      
      // Adjust for left boundary overflow
      if (popLeftScreen < leftBound) {
        const overflowL = leftBound - popLeftScreen;
        X_p += overflowL;
      }
      // Adjust for right boundary overflow
      else if (popRightScreen > rightBound) {
        const overflowR = popRightScreen - rightBound;
        X_p -= overflowR;
      }
      
      // Double check new bounds to make sure we didn't push it off the other side on very small screens
      popLeftScreen = containerRect.left + X_p - W_p / 2;
      if (popLeftScreen < leftBound) {
        X_p = leftBound - containerRect.left + W_p / 2;
      }
      
      // Apply the adjusted position
      popover.style.left = `${X_p}px`;
      
      // Calculate where the arrow should point (aligned with X_btn) relative to the popover's left edge
      const X_btn_rel_pop = X_btn - (X_p - W_p / 2);
      const arrowPct = Math.max(5, Math.min(95, (X_btn_rel_pop / W_p) * 100)); // Clamp between 5% and 95% to keep arrow within popover bounds
      popover.style.setProperty('--arrow-left', `${arrowPct}%`);

      // Auto-scroll to show the popover
      const rect = popover.getBoundingClientRect();
      if (rect.height > window.innerHeight) {
        popover.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        popover.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
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
  if (isLocalEnvironment()) {
    return true;
  }

  // Find the lesson and its unit
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return false;

  const currentUnitId = lesson.unitId;

  // Get units in their database/TOC sequence
  const sortedUnits = [...units];
  const sortedLessons = [];
  sortedUnits.forEach(u => {
    u.lessons.forEach(lId => {
      sortedLessons.push(lId);
    });
  });

  const idx = sortedLessons.indexOf(lessonId);
  if (idx === 0) return true; // Very first lesson is always unlocked

  // Check if all lessons in all previous units are completed
  const currentUnitIndex = sortedUnits.findIndex(u => u.id === currentUnitId);
  if (currentUnitIndex > 0) {
    for (let i = 0; i < currentUnitIndex; i++) {
      const prevUnit = sortedUnits[i];
      const allCompleted = prevUnit.lessons.every(lId => state.completedLessons.includes(lId));
      if (!allCompleted) return false;
    }
  }

  // Current lesson is unlocked if the previous lesson in visual progression is completed
  return state.completedLessons.includes(sortedLessons[idx - 1]);
}

// ============================================================
// BAŞARIMLAR RENDER
// ============================================================
function renderAchievements() {
  const grid = document.getElementById('achievements-grid');
  if (!grid) return;
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
  quizSessionId++;
  isCurrentExercisePassed = false;
  currentLesson = lessons.find(l => l.id === lessonId);
  if (!currentLesson) return;
  setUnitTheme(currentLesson.unitId);

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

function getUnitDisplayTitle(unitId) {
  let normalUnitIndex = 0;
  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    if (u.title.startsWith("Ara Bölüm")) {
      if (u.id === unitId) return u.title;
    } else {
      normalUnitIndex++;
      if (u.id === unitId) return `Bölüm ${normalUnitIndex}`;
    }
  }
  return '';
}

function updateQuizMetadata() {
  const metadataEl = document.getElementById('quiz-metadata');
  if (!metadataEl) return;

  if (isReviewMode) {
    const total = reviewQuestions.length;
    metadataEl.textContent = `Hızlı Tekrar • Soru ${currentQuestionIndex + 1}/${total}`;
    return;
  }

  if (typeof isPlacementMode !== 'undefined' && isPlacementMode) {
    const total = typeof placementQuestions !== 'undefined' && placementQuestions ? placementQuestions.length : 0;
    metadataEl.textContent = `Seviye Sınavı • Soru ${currentQuestionIndex + 1}/${total}`;
    return;
  }

  if (!currentLesson) {
    metadataEl.textContent = '';
    return;
  }

  const unitTitle = getUnitDisplayTitle(currentLesson.unitId);
  const lessonLabel = `${currentLesson.title} (${currentLesson.subtitle})`;
  
  let exLabel = '';
  if (currentLesson.activeExerciseTitle) {
    const exMatch = /(Alıştırma \d+)/i.exec(currentLesson.activeExerciseTitle);
    exLabel = exMatch ? exMatch[1] : currentLesson.activeExerciseTitle;
  }

  const total = currentQuizQuestions.length;
  const qNum = `${currentQuestionIndex + 1}/${total}`;

  metadataEl.textContent = `${unitTitle} • ${lessonLabel}${exLabel ? ` • ${exLabel}` : ''} • Soru ${qNum}`;
}

function updateQuizUI() {
  // İlerleme çubuğu
  const total = isReviewMode ? reviewQuestions.length : currentQuizQuestions.length;
  const progress = (currentQuestionIndex / total) * 100;
  document.getElementById('quiz-progress').style.width = `${progress}%`;

  // Can
  document.getElementById('quiz-hearts-count').textContent = state.hearts;

  // Metadata güncelleme
  updateQuizMetadata();
}

function applyClozeHighlighting(question) {
  if (!question || !question.sentence) return;
  
  let sentence = question.sentence;
  // Enforce uniform red highlights by stripping existing spans first
  sentence = sentence.replace(/<span[^>]*>(.*?)<\/span>/gi, "$1");
  
  const options = question.options;
  const correctIndex = question.correctIndex;
  if (!options || correctIndex === undefined || correctIndex < 0 || correctIndex >= options.length) return;
  
  const correctWord = options[correctIndex];
  if (!correctWord) return;
  
  const adverbKeywords = [
    "yesterday", "ago", "last", "so far", "recently", "lately", "since", "yet", "already", "just",
    "now", "currently", "presently", "tomorrow", "always", "often", "sometimes", "usually",
    "never", "rarely", "seldom", "frequently", "sundays", "mondays", "tuesdays", "wednesdays",
    "thursdays", "fridays", "saturdays", "weekends", "mornings", "evenings", "afternoons",
    "at the moment", "at present", "right now", "these days", "nowadays", "every morning",
    "every evening", "every afternoon", "every weekend", "every winter", "every summer", "next week",
    "next month", "next year", "up to now"
  ];
  
  const isAdverb = adverbKeywords.some(keyword => correctWord.toLowerCase().includes(keyword)) || /\b(in|at|on|by)\s+\d{4}\b/i.test(correctWord);
  
  if (isAdverb) {
    // Highlight continuous tense: is/are/am/was/were + V-ing
    const continuousRegex = /\b(am|is|are|was|were)\s+[\w'-]+ing\b/i;
    if (continuousRegex.test(sentence)) {
      question.sentence = sentence.replace(continuousRegex, '<span style="color: #ff6b6b; font-weight: bold;">$&</span>');
      return;
    }

    // Highlight perfect tense: has/have/had (not/never) + V3
    const perfectRegex = /\b(has|have|had)(?:\s+not|\s+never)?\s+[\w'-]+(?:ed|n|t|d)\b/i;
    if (perfectRegex.test(sentence)) {
      question.sentence = sentence.replace(perfectRegex, '<span style="color: #ff6b6b; font-weight: bold;">$&</span>');
      return;
    }
    
    const perfectBeenRegex = /\b(has|have|had)\s+been\b/i;
    if (perfectBeenRegex.test(sentence)) {
      question.sentence = sentence.replace(perfectBeenRegex, '<span style="color: #ff6b6b; font-weight: bold;">$&</span>');
      return;
    }

    // Highlight simple past / present verbs ending in "ed"
    const edRegex = /\b\w+ed\b/i;
    if (edRegex.test(sentence)) {
      const match = sentence.match(edRegex)[0];
      if (!["need", "feed", "seed", "bleed", "speed", "indeed"].includes(match.toLowerCase())) {
        question.sentence = sentence.replace(edRegex, '<span style="color: #ff6b6b; font-weight: bold;">$&</span>');
        return;
      }
    }

    // Common irregular verbs
    const irregularVerbs = [
      "went", "saw", "came", "did", "began", "built", "bought", "brought", "took", "gave",
      "made", "wrote", "read", "kept", "lost", "found", "met", "run", "ran", "spent", "broke",
      "choose", "chose", "speak", "spoke", "stole", "told", "held", "grew"
    ];
    for (const verb of irregularVerbs) {
      const regex = new RegExp(`\\b(${verb})\\b`, 'i');
      if (regex.test(sentence)) {
        question.sentence = sentence.replace(regex, '<span style="color: #ff6b6b; font-weight: bold;">$1</span>');
        return;
      }
    }
  } else {
    // Try to find phrasal modals patterns
    const phrasalModalRegex = /\b(am|is|are|was|were|get|got|gets)\s+(used|accustomed|willing|unwilling|reluctant|likely|unlikely|bound|certain|doomed|supposed|unable|about)\s+to\b/i;
    if (phrasalModalRegex.test(sentence)) {
      question.sentence = sentence.replace(phrasalModalRegex, '<span style="color: #ff6b6b; font-weight: bold;">$&</span>');
      return;
    }

    const beToRegex = /\b(am|is|are|was|were)\s+to\b/i;
    if (beToRegex.test(sentence)) {
      question.sentence = sentence.replace(beToRegex, '<span style="color: #ff6b6b; font-weight: bold;">$&</span>');
      return;
    }

    // Try to find year patterns like "in 2020", "in 2012"
    const yearRegex = /\b(in\s+\d{4})\b/i;
    if (yearRegex.test(sentence)) {
      question.sentence = sentence.replace(yearRegex, '<span style="color: #ff6b6b; font-weight: bold;">$1</span>');
      return;
    }
    
    // Try to find ago patterns like "two years ago"
    const agoRegex = /\b([\w'-]+\s+(?:hour|day|week|month|year|decade)s?\s+ago)\b/i;
    if (agoRegex.test(sentence)) {
      question.sentence = sentence.replace(agoRegex, '<span style="color: #ff6b6b; font-weight: bold;">$1</span>');
      return;
    }

    // Other multi-word adverbs
    const multiWordAdverbs = [
      "at the moment", "at present", "right now", "these days", "nowadays",
      "last week", "last month", "last year", "last night",
      "next week", "next month", "next year",
      "every morning", "every evening", "every afternoon", "every weekend", "every winter", "every summer",
      "so far", "up to now", "up to today"
    ];
    
    for (const adv of multiWordAdverbs) {
      const regex = new RegExp(`\\b(${adv})\\b`, 'i');
      if (regex.test(sentence)) {
        question.sentence = sentence.replace(regex, '<span style="color: #ff6b6b; font-weight: bold;">$1</span>');
        return;
      }
    }

    // Single word adverbs
    const singleWordAdverbs = [
      "yesterday", "recently", "lately", "since", "yet", "already", "just",
      "currently", "presently", "tomorrow", "summers", "winters", "saturdays", "sundays"
    ];

    for (const adv of singleWordAdverbs) {
      const regex = new RegExp(`\\b(${adv})\\b`, 'i');
      if (regex.test(sentence)) {
        question.sentence = sentence.replace(regex, '<span style="color: #ff6b6b; font-weight: bold;">$1</span>');
        return;
      }
    }
  }
  question.sentence = sentence;
}

function renderQuestion() {
  const question = isReviewMode ? reviewQuestions[currentQuestionIndex] : currentQuizQuestions[currentQuestionIndex];
  if (!question) return;

  if (reflexTimer) {
    clearTimeout(reflexTimer);
    reflexTimer = null;
  }
  if (reflexInterval) {
    clearInterval(reflexInterval);
    reflexInterval = null;
  }
  if (blitzKeyHandler) {
    window.removeEventListener('keydown', blitzKeyHandler);
    blitzKeyHandler = null;
  }

  if (question.type === 'fill-blank' || question.type === 'fill-blank-dropdown') {
    applyClozeHighlighting(question);
  }

  // Dynamically assign render type for blank questions
  if (question.type === 'fill-blank-dropdown' || question.type === 'fill-blank') {
    if (question._dynamicSessionId !== quizSessionId) {
      question._dynamicSessionId = quizSessionId;
      question._dynamicType = Math.random() < 0.5 ? 'fill-blank-dropdown' : 'fill-blank';
    }
  }

  selectedAnswer = null;
  isAnswerChecked = false;
  matchState = null;
  isTranslationGateActive = false;
  onTranslationGateVerify = null;
  wasTranslationCorrect = true;
  isTranslationGateTriggered = false;

  const body = document.getElementById('quiz-body');
  const btnCheck = document.getElementById('btn-check');
  const feedbackPanel = document.getElementById('feedback-panel');

  const btnSkip = document.getElementById('btn-skip');
  if (btnSkip) {
    btnSkip.style.display = 'inline-flex';
  }

  feedbackPanel.classList.remove('show', 'correct', 'wrong');
  btnCheck.disabled = true;
  btnCheck.textContent = 'KONTROL ET';

  updateQuizUI();

  const activeType = (question.type === 'fill-blank-dropdown' || question.type === 'fill-blank')
    ? question._dynamicType
    : question.type;

  // Adjust prompt text to fit the visual type
  const originalPrompt = question.prompt;
  if (activeType === 'fill-blank-dropdown' && question.prompt === 'Boşluğu doldur') {
    question.prompt = 'Boşluğa gelecek en uygun kelimeyi seçin:';
  } else if (activeType === 'fill-blank' && question.prompt.startsWith('Boşluğa gelecek en uygun kelimeyi seçin')) {
    question.prompt = 'Boşluğu doldur';
  }

  switch (activeType) {
    case 'multiple-choice':
      renderMultipleChoice(body, question);
      break;
    case 'punctuation-check':
      renderPunctuationCheck(body, question);
      break;
    case 'structure-match':
      renderStructureMatch(body, question);
      break;
    case 'idiom-builder':
      renderIdiomBuilder(body, question);
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
    case 'fill-blank':
      renderFillBlank(body, question);
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
    case 'true-false':
      renderTrueFalse(body, question);
      break;
    case 'spotlight':
      renderSpotlight(body, question);
      break;
    case 'swipe':
      renderSwipeQuestion(body, question);
      break;
    case 'preposition-magnet':
      renderPrepositionMagnet(body, question);
      break;
    case 'collocation-matching':
      renderCollocationMatching(body, question);
      break;
    case 'reflex-blitz':
      renderReflexBlitz(body, question);
      break;
  }

  // Restore prompt text so data remains unmodified
  question.prompt = originalPrompt;
}

// ── Çoktan Seçmeli ──────────────────────────────────────────
function renderMultipleChoice(container, question) {
  let promptHtml = question.prompt;
  const isEngToTr = (question.prompt.includes("Türkçe") || question.isEngToTr) && !question.prompt.includes("_______");
  
  let sentenceHtml = question.sentence || "";
  if (isEngToTr) {
    let enSent = question.enSentence;
    if (!enSent && promptHtml.includes("<strong>")) {
      const match = promptHtml.match(/<strong>["'\u201c\u201d]?([^<]+?)["'\u201c\u201d]?<\/strong>/);
      if (match) {
        enSent = match[1];
      }
    }
    if (enSent) {
      sentenceHtml = enSent;
      promptHtml = "Cümlenin en uygun Türkçe karşılığını seçin:";
    }
  }

  if (isEngToTr && sentenceHtml) {
    sentenceHtml = `"${makeTextHoverable(sentenceHtml)}"`;
  }

  const renderedOptions = question.options.map((opt, i) => {
    let optHtml = opt;
    if (!isEngToTr && optHtml) {
      optHtml = makeTextHoverable(optHtml);
    }
    return `<button class="mc-option" data-index="${i}">${optHtml}</button>`;
  }).join('');

  container.innerHTML = `
    <p class="quiz-prompt">${promptHtml}</p>
    <div class="quiz-sentence-container" style="text-align: center; margin-bottom: 25px; font-size: 1.25rem; font-weight: 500; color: var(--text-primary); line-height: 1.6; ${sentenceHtml ? '' : 'display: none;'}">
      ${sentenceHtml}
    </div>
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

// ── Noktalama İşaretli Seçim (punctuation-check) ──────────
function renderPunctuationCheck(container, question) {
  const formattedQuestion = question.sentence.replace(
    /__________/g, 
    `<span class="punctuation-gap">[ ? ]</span>`
  ).replace(
    /___/g,
    `<span class="punctuation-gap">[ ? ]</span>`
  );

  const optionsHtml = question.options.map((opt, i) => {
    return `<button class="mc-option" data-index="${i}">${opt}</button>`;
  }).join('');

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt || "Noktalama İşaretlerine Dikkat Ederek Doğru Bağlacı Seçin"}</p>
    <div class="punctuation-context" style="text-align: center; margin: 24px 0;">
      ${formattedQuestion}
    </div>
    <div class="mc-options">
      ${optionsHtml}
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

// ── Gramer Yapısı Eşleştirme (structure-match) ──────────
function renderStructureMatch(container, question) {
  const optionsHtml = question.options.map((opt, i) => {
    return `<button class="mc-option" data-index="${i}">${opt}</button>`;
  }).join('');

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt || "Cümlenin Gramer Yapısına Uygun Bağlacı Seçin"}</p>
    <div class="structure-context" style="text-align: center; margin: 24px 0;">
      ${question.sentence}
    </div>
    <div class="mc-options">
      ${optionsHtml}
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

// ── Deyim İnşa Etme (idiom-builder) ──────────
function renderIdiomBuilder(container, question) {
  let currentSelection = [];
  const shuffledTokens = [...question.tokens].sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt || "Akademik Deyimi Doğru Kelimelerle Sırasıyla İnşa Edin"}</p>
    <div style="text-align: center; margin-bottom: 20px;">
      <span class="idiom-meaning-badge">Anlamı: ${question.meaningTr}</span>
    </div>
    
    <div class="idiom-build-zone" id="build-zone">
      <span class="build-placeholder">Deyimi tamamlamak için aşağıdaki kelimelere sırasıyla tıklayın...</span>
    </div>
    
    <div class="context-sentence" style="text-align: center; margin: 20px 0;">
      ${question.sentence || question.question}
    </div>
    
    <div class="tokens-flex" id="idiom-tokens" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 20px;"></div>
  `;

  const tokensParent = document.getElementById("idiom-tokens");
  const buildZone = document.getElementById("build-zone");

  shuffledTokens.forEach(token => {
    const button = document.createElement("button");
    button.className = "amok-token-btn";
    button.innerText = token;
    
    button.addEventListener('click', () => {
      if (isAnswerChecked) return;
      if (button.classList.contains("token-used")) return;
      
      if (currentSelection.length === 0) buildZone.innerHTML = "";
      
      currentSelection.push(token);
      button.classList.add("token-used");
      
      const wordSpan = document.createElement("span");
      wordSpan.className = "selected-idiom-word animate-pop";
      wordSpan.innerText = token;
      buildZone.appendChild(wordSpan);
      
      if (currentSelection.length === question.correctSequence.length) {
        selectedAnswer = currentSelection;
        document.getElementById('btn-check').disabled = false;
        
        setTimeout(() => {
          checkAnswer();
        }, 300);
      }
    });
    
    tokensParent.appendChild(button);
  });
}

// ── Kelime Bankası ──────────────────────────────────────────
function segmentSentence(fullSentence, isEngToTr) {
  let segments = [fullSentence];

  if (isEngToTr) {
    // ─── TURKISH GRAMMATICAL SPLITTER ───
    const splitBeforeAndAfterTr = [
      "sonuç olarak", "bu nedenle", "bu yüzden", "böylece", "buna göre",
      "ve sonuç olarak", "bunun bir sonucu olarak", "bu sebepten",
      "ani bir sonuç olarak", "gerekçesiyle"
    ];

    const splitAfterTr = [
      "meydana geldi", "ortaya çıktı", "yol açar", "sonuçlanır", "neden olur",
      "sorumludur", "kaynaklanır", "katkıda bulunur", "tetikler", "geciktirir",
      "çöktü", "düştü", "güvende kalır", "ertelendi", "gecikti", "tetiklendi",
      "yol açmıştır", "sonuçlanmıştır", "neden olmuştur", "kaynaklanmaktadır",
      "geciktirmiştir", "çökmüştür", "düşmüştür", "ertelenmiştir", "gelişti",
      "açındı", "aşındı", "kilitlendi", "arttı", "durgunlaştı", "engellendi",
      "azalttı", "çeşitlilik gösterir", "çeşitlilik göstermesine neden oldu",
      "değişmesine neden oldu", "daralmasına neden oldu", "kaymasına neden oldu",
      "en aza indirmesine neden oldu", "hatalara yol açmasına neden oldu",
      "etkileşime girmesine neden oldu", "değişmesine neden oldu", "düşmesine neden oldu",
      "genişlemesine neden oldu", "aşınmasına neden oldu", "doğrulamasına neden oldu",
      "evrilmesine neden oldu", "çakışmasına neden oldu",
      "izlemelidir", "gelişir", "artar", "değişiklik gerektirir", "genişleme gerektirir",
      "talep etti", "yansıtılmıştır",
      "sırasında", "esnasında", "boyunca", "nedeniyle", "yüzünden", "dolayı",
      "sayesinde", "için", "ölçüde", "kadar", "başka", "itibaren", "rağmen",
      "katmanlarında", "merkezinde", "bölümünde", "düğümlerinde", "odasında",
      "altında", "aşamasında", "durumunda", "çerçevesinde", "yönünde", "genelinde",
      "üzerinde", "altından", "dışında", "yakınında", "öncesinde", "sonrasında"
    ];

    function applySplitBeforeAndAfterTr(segs, substring) {
      const result = [];
      const regex = new RegExp(`\\b(${substring})\\b`, 'i');
      for (let s of segs) {
        const match = s.match(regex);
        if (match) {
          const parts = s.split(match[0]);
          if (parts[0].trim()) result.push(parts[0].trim());
          result.push(match[0].trim());
          if (parts[1].trim()) result.push(parts[1].trim());
        } else {
          result.push(s);
        }
      }
      return result;
    }

    function applySplitAfterTr(segs, substring) {
      const result = [];
      const regex = new RegExp(`\\b(${substring})`, 'i');
      for (let s of segs) {
        const match = s.match(regex);
        if (match) {
          let idx = s.indexOf(match[0]) + match[0].length;
          while (idx < s.length && [';', ',', '.', '?', '!'].includes(s[idx])) {
            idx++;
          }
          const part1 = s.substring(0, idx).trim();
          const part2 = s.substring(idx).trim();
          if (part1) result.push(part1);
          if (part2) result.push(part2);
        } else {
          result.push(s);
        }
      }
      return result;
    }

    // 1. Semicolon split
    let temp = [];
    for (let s of segments) {
      if (s.includes(';')) {
        const parts = s.split(';');
        temp.push(parts[0].trim() + ';');
        if (parts[1].trim()) temp.push(parts[1].trim());
      } else {
        temp.push(s);
      }
    }
    segments = temp;

    // 2. Split before/after
    const sortedBeforeAndAfter = [...splitBeforeAndAfterTr].sort((a, b) => b.length - a.length);
    for (let marker of sortedBeforeAndAfter) {
      segments = applySplitBeforeAndAfterTr(segments, marker);
    }

    // 3. Split after
    const sortedAfter = [...splitAfterTr].sort((a, b) => b.length - a.length);
    for (let marker of sortedAfter) {
      segments = applySplitAfterTr(segments, marker);
    }

  } else {
    // ─── ENGLISH GRAMMATICAL SPLITTER ───
    const splitBeforeAndAfter = [
      "give rise to", "gives rise to",
      "result in", "results in", "has resulted in", "have resulted in",
      "is responsible for", "are responsible for",
      "lead to", "leads to",
      "bring about", "brings about",
      "contribute to", "contributes to",
      "stem from", "stems from",
      "trigger", "triggers",
      "causes", "produce", "produces",
      "therefore", "consequently", "as a result", "hence", "thus", "accordingly", "so",
      "caused", "causes"
    ];

    const splitBefore = [
      "due to", "because of", "owing to", "on account of", "thanks to",
      "because", "since", "inasmuch as", "although", "even though", "whereas",
      "forcing", "reducing", "degrading", "altering",
      "to inspect", "to meet", "to request", "to isolate", "to maintain", "to validate",
      "to change", "to vary", "to collapse", "to contract", "to shift", "to minimize",
      "to induce", "to interact", "to mutate", "to decline", "to expand", "to decay",
      "to evolve", "to conflict", "unless", "if", "the moment", "under", "in order that",
      "on grounds that", "with the result that", "as a consequence", "for this reason",
      "as an immediate result", "on that account", "inside", "during", "before", "after", "until"
    ];

    function applySplitBeforeAndAfter(segs, substring) {
      const result = [];
      const regex = new RegExp(`\\b(${substring})\\b`, 'i');
      for (let s of segs) {
        const match = s.match(regex);
        if (match) {
          const parts = s.split(match[0]);
          if (parts[0].trim()) result.push(parts[0].trim());
          result.push(match[0].trim());
          if (parts[1].trim()) result.push(parts[1].trim());
        } else {
          result.push(s);
        }
      }
      return result;
    }

    function applySplitBefore(segs, substring) {
      const result = [];
      const regex = new RegExp(`\\b(${substring})\\b`, 'i');
      for (let s of segs) {
        const match = s.match(regex);
        if (match) {
          const idx = s.indexOf(match[0]);
          const part1 = s.substring(0, idx).trim();
          const part2 = s.substring(idx).trim();
          if (part1) result.push(part1);
          if (part2) result.push(part2);
        } else {
          result.push(s);
        }
      }
      return result;
    }

    // 1. Semicolon split
    let temp = [];
    for (let s of segments) {
      if (s.includes(';')) {
        const parts = s.split(';');
        temp.push(parts[0].trim() + ';');
        if (parts[1].trim()) temp.push(parts[1].trim());
      } else {
        temp.push(s);
      }
    }
    segments = temp;

    // 2. Split before/after
    const sortedBeforeAndAfter = [...splitBeforeAndAfter].sort((a, b) => b.length - a.length);
    for (let marker of sortedBeforeAndAfter) {
      segments = applySplitBeforeAndAfter(segments, marker);
    }

    // 3. Split before
    const sortedBefore = [...splitBefore].sort((a, b) => b.length - a.length);
    for (let marker of sortedBefore) {
      segments = applySplitBefore(segments, marker);
    }
  }

  // ─── FALLBACKS FOR BOTH LANGUAGES ───
  if (segments.length < 3) {
    if (isEngToTr) {
      const prepMarkersTr = ["ile", "veya", "ve", "olarak", "altında", "önce", "sonra", "karşın", "rağmen"];
      for (let prep of prepMarkersTr) {
        if (segments.length >= 3) break;
        const result = [];
        const regex = new RegExp(`\\b(${prep})\\b`, 'i');
        for (let s of segments) {
          const match = s.match(regex);
          if (match) {
            const idx = s.indexOf(match[0]);
            const part1 = s.substring(0, idx).trim();
            const part2 = s.substring(idx).trim();
            if (part1) result.push(part1);
            if (part2) result.push(part2);
          } else {
            result.push(s);
          }
        }
        segments = result;
      }
    } else {
      const prepMarkers = ["in", "on", "at", "for", "with", "by", "from", "to", "about", "that", "which", "who", "when", "while"];
      for (let prep of prepMarkers) {
        if (segments.length >= 3) break;
        const result = [];
        const regex = new RegExp(`\\b(${prep})\\b`, 'i');
        for (let s of segments) {
          const match = s.match(regex);
          if (match) {
            const idx = s.indexOf(match[0]);
            const part1 = s.substring(0, idx).trim();
            const part2 = s.substring(idx).trim();
            if (part1) result.push(part1);
            if (part2) result.push(part2);
          } else {
            result.push(s);
          }
        }
        segments = result;
      }
    }
  }

  // Final fallback
  if (segments.length < 3) {
    const words = fullSentence.split(' ');
    const chunkSize = Math.max(2, Math.ceil(words.length / 3));
    segments = [];
    for (let i = 0; i < words.length; i += chunkSize) {
      segments.push(words.slice(i, i + chunkSize).join(' '));
    }
  }

  return segments.map(s => s.trim()).filter(s => s.length > 0);
}

// ── Kelime Bankası ──────────────────────────────────────────
function renderWordBank(container, question) {
  // Clean up any inline HTML style tags and residues from correctOrder and words arrays
  if (Array.isArray(question.correctOrder)) {
    const rawTargetSentence = question.correctOrder.join(' ');
    const cleanTargetSentence = rawTargetSentence.replace(/<[^>]+>/g, '');
    const cleanTargetWords = cleanTargetSentence.split(/\s+/)
      .map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim())
      .filter(Boolean);
    
    const rawDistractors = Array.isArray(question.words)
      ? question.words.filter(w => !question.correctOrder.includes(w))
      : [];
    const cleanDistractors = rawDistractors
      .map(w => w.replace(/<[^>]+>/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim())
      .filter(Boolean)
      .filter(w => !cleanTargetWords.includes(w));
    
    question.correctOrder = cleanTargetWords;
    question.words = [...cleanTargetWords, ...cleanDistractors];
  }

  // If the word ordering sentence is long (8 or more elements) and not already grouped as blocks
  if (Array.isArray(question.correctOrder) && question.correctOrder.length >= 8 && !question.correctOrder.some(w => w.includes(' '))) {
    const fullSentence = question.correctOrder.join(' ');
    const isEngToTr = question.isEngToTr || (question.prompt && (question.prompt.includes("Türkçe") || question.prompt.includes("Turkish")));
    const segments = segmentSentence(fullSentence, isEngToTr);
    const distractors = question.words.filter(w => !question.correctOrder.includes(w));
    
    question.correctOrder = segments;
    question.words = [...segments, ...distractors];
  }

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
      <span class="match-col-header">${question.leftHeader || "Türkçe"}</span>
      <span class="match-col-header">${question.rightHeader || "İngilizce"}</span>
      ${question.pairs.map((pair, i) => `
        <button class="match-item match-left" data-left="${pair.left}" data-pair-index="${i}">${pair.left}</button>
        <button class="match-item match-right" data-right="${shuffledRight[i].right}">${makeTextHoverable(shuffledRight[i].right)}</button>
      `).join('')}
    </div>
  `;

  matchState = {
    pairs: question.pairs,
    selectedLeftBtn: null,
    selectedRightBtn: null,
    matchedCount: 0,
    totalPairs: question.pairs.length,
    wrongAttempts: 0
  };

  container.querySelectorAll('.match-left').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isAnswerChecked || btn.classList.contains('matched')) return;
      container.querySelectorAll('.match-left').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      matchState.selectedLeftBtn = btn;
      tryMatch(container, question);
    });
  });

  container.querySelectorAll('.match-right').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isAnswerChecked || btn.classList.contains('matched')) return;
      container.querySelectorAll('.match-right').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      matchState.selectedRightBtn = btn;
      tryMatch(container, question);
    });
  });
}

function tryMatch(container, question) {
  if (!matchState.selectedLeftBtn || !matchState.selectedRightBtn) return;

  const leftText = matchState.selectedLeftBtn.dataset.left;
  const rightText = matchState.selectedRightBtn.dataset.right;

  // Check if this pair exists in correct pairs
  const isCorrectMatch = question.pairs.some(p => p.left === leftText && p.right === rightText);

  if (isCorrectMatch) {
    // Doğru eşleşme
    const leftBtn = matchState.selectedLeftBtn;
    const rightBtn = matchState.selectedRightBtn;

    leftBtn.classList.remove('selected');
    rightBtn.classList.remove('selected');
    leftBtn.classList.add('matched');
    rightBtn.classList.add('matched');

    matchState.matchedCount++;
  } else {
    // Yanlış eşleşme
    matchState.wrongAttempts++;

    const leftBtn = matchState.selectedLeftBtn;
    const rightBtn = matchState.selectedRightBtn;

    if (leftBtn) leftBtn.classList.add('wrong-flash');
    if (rightBtn) rightBtn.classList.add('wrong-flash');

    setTimeout(() => {
      if (leftBtn) { leftBtn.classList.remove('selected', 'wrong-flash'); }
      if (rightBtn) { rightBtn.classList.remove('selected', 'wrong-flash'); }
    }, 500);
  }

  matchState.selectedLeftBtn = null;
  matchState.selectedRightBtn = null;

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
  // Normalize arguments in case it is called as renderFillBlankDropdown(question)
  if (!question && container && !container.nodeType) {
    question = container;
    container = document.getElementById("exercise-container") || document.querySelector(".quiz-card-body");
  }

  const parts = question.sentence.split(/_{3,}/);
  const selectOptions = `<option value="" disabled selected>Seçin...</option>` +
    question.options.map((opt, i) => `<option value="${i}">${opt}</option>`).join('');

  const part0Html = makeTextHoverable(parts[0]);
  const part1Html = parts[1] ? makeTextHoverable(parts[1]) : '';

  const displayPrompt = question.prompt === 'Boşluğu doldur' ? 'Boşluğu doldur!' : question.prompt;

  container.innerHTML = `
    <div class="question-prompt-title quiz-prompt">${displayPrompt}</div>
    <div class="question-sentence-body dropdown-sentence-layout" style="font-size: 1.25rem; font-weight: 500; text-align: center; margin: 24px 0; color: var(--text-primary); line-height: 1.8; display: block; width: 100%;">
      ${part0Html}<select class="amok-inline-select inline-dropdown" id="fb-dropdown-select">${selectOptions}</select>${part1Html}
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
  const parts = question.sentence.split(/_{3,}/);

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

// ── Boşluk Doldurma - Butonlu Seçenekler (fill-blank) ──────────
function renderFillBlank(container, question) {
  // Normalize arguments in case it is called as renderFillBlank(question)
  if (!question && container && !container.nodeType) {
    question = container;
    container = document.getElementById("exercise-container") || document.querySelector(".quiz-card-body");
  }

  // Cümle içindeki boşluğu (3 veya daha fazla alt çizgiyi) belirgin bir görsel çizgiye dönüştürüyoruz
  const parts = question.sentence.split(/_{3,}/);
  const part0Html = makeTextHoverable(parts[0]);
  const part1Html = parts[1] ? makeTextHoverable(parts[1]) : '';

  const optionsHtml = question.options.map((opt, i) => {
    return `<button class="fb-option" data-index="${i}">
      <span class="fb-number">${i + 1}</span>
      <span class="fb-text">${opt}</span>
    </button>`;
  }).join('');

  const displayPrompt = question.prompt === 'Boşluğu doldur' ? 'Boşluğu doldur!' : question.prompt;

  container.innerHTML = `
    <p class="quiz-prompt">${displayPrompt}</p>
    <div class="fb-sentence" style="font-size: 1.25rem; font-weight: 500; text-align: center; margin: 24px 0; color: var(--text-primary); line-height: 1.6;">
      ${part0Html}<span class="fb-blank" id="fb-blank-word">______</span>${part1Html}
    </div>
    <div class="fb-options">
      ${optionsHtml}
    </div>
  `;

  const blankEl = document.getElementById('fb-blank-word');
  
  container.querySelectorAll('.fb-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isAnswerChecked) return;
      container.querySelectorAll('.fb-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      
      const idx = parseInt(btn.dataset.index);
      selectedAnswer = idx;
      
      blankEl.innerHTML = question.options[idx];
      
      document.getElementById('btn-check').disabled = false;

      const isTargetUnit = question.translation ? true : false;
      const isCorrect = idx === question.correctIndex;

      if (isTargetUnit && isCorrect && question.translation) {
        setTimeout(() => {
          startTranslationGate(container, question);
        }, 300);
      } else {
        setTimeout(() => {
          checkAnswer();
        }, 250);
      }
    });
  });
}

// ── Scrambled Words Translation Gate ────────────────────────
function startTranslationGate(container, question) {
  isTranslationGateActive = true;
  isTranslationGateTriggered = true;
  
  // Set primary check button state
  const btnCheck = document.getElementById('btn-check');
  btnCheck.disabled = true;
  btnCheck.textContent = 'ÇEVİRİYİ KONTROL ET';

  // Hide skip button to focus on translation
  const btnSkip = document.getElementById('btn-skip');
  if (btnSkip) {
    btnSkip.style.display = 'none';
  }

  // Make the sentence complete
  let completedSentence = question.sentence || "";
  const correctWord = question.options[question.correctIndex];
  const highlightedChoice = `<span class="fb-blank" style="color: var(--color-correct); border-bottom-color: var(--color-correct); font-weight: bold; background: var(--color-correct-bg); padding: 2px 8px; border-radius: 4px;">${correctWord}</span>`;
  completedSentence = completedSentence.replace(/_{3,}/, highlightedChoice);
  completedSentence = makeTextHoverable(completedSentence);

  // Clean translation and split into words or grammatical blocks if > 12 words
  let correctWords;
  const rawWordCount = question.translation.split(/\s+/).filter(Boolean).length;
  if (rawWordCount > 12) {
    correctWords = segmentSentence(question.translation, true);
  } else {
    const rawWords = question.translation.split(/\s+/);
    const cleanWord = (w) => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    correctWords = rawWords.map(cleanWord).filter(Boolean);
  }
  
  // Distractors
  const distractorsList = ["farklı", "başlayana", "her zaman", "sonra", "önce", "tüm", "ancak", "çünkü", "kadar", "yeni", "hızlı", "güvenli", "sistem", "sunucu", "ekip", "uygulama", "veri", "kod", "zaman", "büyük", "olarak"];
  const correctCleaned = correctWords.map(w => w.toLowerCase());
  const filteredDistractors = distractorsList.filter(d => !correctCleaned.includes(d.toLowerCase()));
  const selectedDistractors = [...filteredDistractors].sort(() => 0.5 - Math.random()).slice(0, 3);
  
  // Combine chips
  let chips = [...correctWords, ...selectedDistractors];
  chips = chips.sort(() => 0.5 - Math.random());
  
  container.innerHTML = `
    <p class="quiz-prompt">Cümleyi Türkçe'ye Çevirin!</p>
    <div class="fb-sentence" style="font-size: 1.25rem; font-weight: 500; text-align: center; margin: 24px 0; color: var(--text-primary); line-height: 1.6;">
      ${completedSentence}
    </div>
    
    <div class="gate-title">Çeviri Geçidi</div>
    <div class="assembled-translation-area" id="assembled-area"></div>
    <div class="scrambled-words-container" id="scrambled-container"></div>
  `;

  const assembledArea = document.getElementById('assembled-area');
  const scrambledContainer = document.getElementById('scrambled-container');

  let assembledWords = [];

  const renderChips = () => {
    assembledArea.innerHTML = '';
    assembledWords.forEach((word, idx) => {
      const chip = document.createElement('button');
      chip.className = 'word-chip';
      chip.textContent = word;
      chip.addEventListener('click', () => {
        assembledWords.splice(idx, 1);
        renderChips();
      });
      assembledArea.appendChild(chip);
    });

    if (assembledWords.length > 0) {
      assembledArea.classList.add('active');
      btnCheck.disabled = false;
    } else {
      assembledArea.classList.remove('active');
      btnCheck.disabled = true;
    }

    scrambledContainer.innerHTML = '';
    chips.forEach((word) => {
      const chip = document.createElement('button');
      chip.className = 'word-chip';
      chip.textContent = word;
      
      const countInAssembled = assembledWords.filter(w => w === word).length;
      const totalInChips = chips.filter(w => w === word).length;
      
      if (countInAssembled >= totalInChips) {
        chip.classList.add('disabled');
      } else {
        chip.addEventListener('click', () => {
          assembledWords.push(word);
          renderChips();
        });
      }
      scrambledContainer.appendChild(chip);
    });
  };

  renderChips();

  onTranslationGateVerify = () => {
    const cleanWordForComparison = (w) => w.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    const userCleaned = assembledWords.map(cleanWordForComparison);
    const correctCleaned = correctWords.map(cleanWordForComparison);
    
    const isCorrect = userCleaned.length === correctCleaned.length && userCleaned.every((w, i) => w === correctCleaned[i]);
    
    if (isCorrect) {
      isTranslationGateActive = false;
      onTranslationGateVerify = null;
      wasTranslationCorrect = true;
      
      assembledArea.querySelectorAll('.word-chip').forEach(chip => {
        chip.classList.add('correct-assemble');
        chip.disabled = true;
      });
      scrambledContainer.querySelectorAll('.word-chip').forEach(chip => {
        chip.classList.add('disabled');
        chip.disabled = true;
      });
      
      checkAnswer();
      btnCheck.textContent = 'DEVAM ET';
    } else {
      isTranslationGateActive = false;
      onTranslationGateVerify = null;
      wasTranslationCorrect = false;

      assembledArea.classList.add('shake');
      assembledArea.querySelectorAll('.word-chip').forEach(chip => {
        chip.style.borderColor = 'var(--color-wrong)';
        chip.style.backgroundColor = 'var(--color-wrong-bg)';
        chip.style.color = 'var(--color-wrong)';
        chip.disabled = true;
      });
      scrambledContainer.querySelectorAll('.word-chip').forEach(chip => {
        chip.classList.add('disabled');
        chip.disabled = true;
      });

      checkAnswer();
      btnCheck.textContent = 'DEVAM ET';
    }
  };
}

// ── Tam Metin Çeviri Testi (Klavyeli Girdi) ──────────────────
function renderTranslationText(container, question) {
  const placeholderText = question.isEngToTr ? "Türkçe çeviriyi buraya yazın..." : "İngilizce çeviriyi buraya yazın...";
  
  let headerText = question.isEngToTr ? "Aşağıdaki ifadeyi Türkçe'ye çevirin;" : "Aşağıdaki ifadeyi İngilizce'ye çevirin;";
  
  let sentenceToTranslate = question.isEngToTr ? (question.enSentence || "") : (question.translation || "");
  if (!sentenceToTranslate) {
    sentenceToTranslate = question.enSentence || "";
  }
  if (!sentenceToTranslate) {
    const match = question.prompt.match(/"([^"]+)"/);
    sentenceToTranslate = match ? match[1] : question.prompt;
  }
  
  let sentenceHtml = `"${sentenceToTranslate}"`;
  if (question.isEngToTr) {
    sentenceHtml = `"${makeTextHoverable(sentenceToTranslate)}"`;
  }

  container.innerHTML = `
    <p class="quiz-prompt" style="text-align: center; margin-bottom: 8px;">${headerText}</p>
    <p class="quiz-translation-source" style="font-size: 1.25rem; font-weight: 500; text-align: center; margin: 16px 0 24px 0; color: var(--text-primary); line-height: 1.6;">${sentenceHtml}</p>
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
  const parts = question.sentence.split(/_{3,}/);
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

// ── Hız Tüneli (Time-Attack Reflex Blitz - true-false) ──────────
function renderTrueFalse(container, question) {
  if (reflexTimer) {
    clearTimeout(reflexTimer);
    reflexTimer = null;
  }
  if (reflexInterval) {
    clearInterval(reflexInterval);
    reflexInterval = null;
  }

  const hasPhrases = question.englishPhrase || question.turkishTranslation;
  const cardHtml = hasPhrases ? `
    <div class="blitz-card" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px; box-shadow: var(--shadow-sm);">
      ${question.englishPhrase ? `
      <div class="blitz-english" style="font-size: 1.5rem; font-weight: 700; color: var(--accent-color, #a855f7); margin-bottom: 15px; line-height: 1.4;">
        ${question.englishPhrase}
      </div>` : ''}
      ${question.turkishTranslation ? `
      <div class="blitz-turkish" style="font-size: 1.3rem; font-weight: 500; color: var(--text-primary); line-height: 1.4;">
        ${question.turkishTranslation}
      </div>` : ''}
    </div>
  ` : '';

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt || 'Hız Tüneli: Hızlıca karar ver!'}</p>
    <div class="blitz-timer-container" style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; margin-bottom: 20px;">
      <div id="blitz-timer-bar" style="width: 100%; height: 100%; background: var(--accent-color, #a855f7); transition: width 50ms linear;"></div>
    </div>
    
    ${cardHtml}

    <div class="blitz-buttons" style="display: flex; gap: 20px; justify-content: center; width: 100%;">
      <button class="blitz-btn wrong-btn" id="blitz-btn-wrong" style="flex: 1; padding: 18px; border-radius: 12px; border: none; font-size: 1.2rem; font-weight: 700; cursor: pointer; background: rgba(239, 68, 68, 0.15); border: 2px solid rgb(239, 68, 68); color: rgb(239, 68, 68); transition: all 0.2s ease;">
        ✗ YANLIŞ (←)
      </button>
      <button class="blitz-btn correct-btn" id="blitz-btn-correct" style="flex: 1; padding: 18px; border-radius: 12px; border: none; font-size: 1.2rem; font-weight: 700; cursor: pointer; background: rgba(34, 197, 94, 0.15); border: 2px solid rgb(34, 197, 94); color: rgb(34, 197, 94); transition: all 0.2s ease;">
        ✓ DOĞRU (→)
      </button>
    </div>
  `;

  const textContent = (question.prompt || "") + (question.englishPhrase || "") + (question.turkishTranslation || "");
  const duration = Math.min(20000, Math.max(5000, textContent.length * 100));
  const startTime = Date.now();
  const timerBar = document.getElementById('blitz-timer-bar');

  const updateTimer = () => {
    const elapsed = Date.now() - startTime;
    const remainingPercent = Math.max(0, 100 - (elapsed / duration) * 100);
    if (timerBar) {
      timerBar.style.width = remainingPercent + '%';
    }
    
    if (elapsed >= duration) {
      clearInterval(reflexInterval);
      reflexInterval = null;
      handleBlitzAnswer(null);
    }
  };

  reflexInterval = setInterval(updateTimer, 50);

  const handleBlitzAnswer = (answer) => {
    if (isAnswerChecked) return;
    
    if (reflexTimer) {
      clearTimeout(reflexTimer);
      reflexTimer = null;
    }
    if (reflexInterval) {
      clearInterval(reflexInterval);
      reflexInterval = null;
    }

    selectedAnswer = answer;
    
    document.getElementById('btn-check').disabled = false;
    checkAnswer();
  };

  const btnWrong = document.getElementById('blitz-btn-wrong');
  const btnCorrect = document.getElementById('blitz-btn-correct');
  
  if (btnWrong) {
    btnWrong.addEventListener('click', () => handleBlitzAnswer(false));
    btnWrong.addEventListener('mouseenter', () => {
      if (isAnswerChecked) return;
      btnWrong.style.background = 'rgb(239, 68, 68)';
      btnWrong.style.color = '#fff';
    });
    btnWrong.addEventListener('mouseleave', () => {
      if (isAnswerChecked) return;
      btnWrong.style.background = 'rgba(239, 68, 68, 0.15)';
      btnWrong.style.color = 'rgb(239, 68, 68)';
    });
  }
  if (btnCorrect) {
    btnCorrect.addEventListener('click', () => handleBlitzAnswer(true));
    btnCorrect.addEventListener('mouseenter', () => {
      if (isAnswerChecked) return;
      btnCorrect.style.background = 'rgb(34, 197, 94)';
      btnCorrect.style.color = '#fff';
    });
    btnCorrect.addEventListener('mouseleave', () => {
      if (isAnswerChecked) return;
      btnCorrect.style.background = 'rgba(34, 197, 94, 0.15)';
      btnCorrect.style.color = 'rgb(34, 197, 94)';
    });
  }

  if (blitzKeyHandler) {
    window.removeEventListener('keydown', blitzKeyHandler);
  }

  blitzKeyHandler = (e) => {
    if (isAnswerChecked) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      window.removeEventListener('keydown', blitzKeyHandler);
      blitzKeyHandler = null;
      handleBlitzAnswer(false);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      window.removeEventListener('keydown', blitzKeyHandler);
      blitzKeyHandler = null;
      handleBlitzAnswer(true);
    }
  };

  window.addEventListener('keydown', blitzKeyHandler);
}

function showTFFeedback(question) {
  const btnWrong = document.getElementById('blitz-btn-wrong');
  const btnCorrect = document.getElementById('blitz-btn-correct');
  
  if (question.correctAnswer === true) {
    if (btnCorrect) {
      btnCorrect.style.background = 'var(--color-correct-bg)';
      btnCorrect.style.color = 'var(--color-correct)';
      btnCorrect.style.borderColor = 'var(--color-correct)';
    }
    if (selectedAnswer === false && btnWrong) {
      btnWrong.style.background = 'var(--color-wrong-bg)';
      btnWrong.style.color = 'var(--color-wrong)';
      btnWrong.style.borderColor = 'var(--color-wrong)';
    }
  } else {
    if (btnWrong) {
      btnWrong.style.background = 'var(--color-correct-bg)';
      btnWrong.style.color = 'var(--color-correct)';
      btnWrong.style.borderColor = 'var(--color-correct)';
    }
    if (selectedAnswer === true && btnCorrect) {
      btnCorrect.style.background = 'var(--color-wrong-bg)';
      btnCorrect.style.color = 'var(--color-wrong)';
      btnCorrect.style.borderColor = 'var(--color-wrong)';
    }
  }
}

// ── Projektör Modu (The Spotlight Match - spotlight) ──────────
function renderSpotlight(container, question) {
  const paragraph = question.paragraph;
  const target = question.highlightChunk;
  
  let displayHtml = "";
  const escapedTarget = target.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`(${escapedTarget})`, 'i');
  const parts = paragraph.split(regex);
  if (parts.length >= 3) {
    const prefix = parts[0];
    const matched = parts[1];
    const suffix = parts.slice(2).join('');
    displayHtml = `<span class="spotlight-dim-text">${prefix}</span>` + 
                  `<span class="spotlight-bright">${matched}</span>` + 
                  `<span class="spotlight-dim-text">${suffix}</span>`;
  } else {
    displayHtml = paragraph;
  }

  const optionsHtml = question.options.map((opt, i) => {
    return `<button class="spotlight-option-card" data-index="${i}" style="padding: 16px; border-radius: 12px; color: var(--text-primary); font-size: 1.1rem; font-weight: 600; cursor: pointer; text-align: center; width: 100%;">
      ${opt}
    </button>`;
  }).join('');

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt || 'Projektör Modu: Parlayan öbeğin Türkçe anlamını seçin!'}</p>
    
    <div class="spotlight-paragraph-container" style="text-align: left; position: relative; margin-bottom: 25px;">
      ${displayHtml}
    </div>
    
    <div class="spotlight-options-grid" style="display: grid; grid-template-columns: 1fr; gap: 12px; width: 100%;">
      ${optionsHtml}
    </div>
  `;

  container.querySelectorAll('.spotlight-option-card').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isAnswerChecked) return;
      
      const idx = parseInt(btn.dataset.index);
      selectedAnswer = idx;
      
      document.getElementById('btn-check').disabled = false;
      checkAnswer();
    });
  });
}

function showSpotlightFeedback(question) {
  const options = document.querySelectorAll('.spotlight-option-card');
  options.forEach(btn => {
    const idx = parseInt(btn.dataset.index);
    if (idx === question.correctIndex) {
      btn.style.borderColor = 'var(--color-correct)';
      btn.style.background = 'var(--color-correct-bg)';
      btn.style.color = 'var(--color-correct)';
    } else if (idx === selectedAnswer && idx !== question.correctIndex) {
      btn.style.borderColor = 'var(--color-wrong)';
      btn.style.background = 'var(--color-wrong-bg)';
      btn.style.color = 'var(--color-wrong)';
    }
  });
}

// ── Hata Avcısı / Bug Debugger (Swipe Mode) ──
function renderSwipeQuestion(container, question) {
  const mainText = question.phrase || question.prompt || "";
  const subText = question.translation || "";

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    
    <div class="swipe-area" id="swipe-area">
      <div class="swipe-timer-container">
        <div class="swipe-timer-bar" id="swipe-timer-bar"></div>
      </div>
      
      <div class="swipe-card" id="swipe-card">
        <div class="swipe-overlay swipe-overlay-bug">BUG</div>
        <div class="swipe-overlay swipe-overlay-valid">VALID</div>
        <div class="swipe-card-content">
          <div class="swipe-phrase">${mainText}</div>
          <div class="swipe-translation-hint">${subText}</div>
        </div>
      </div>
      
      <div class="swipe-buttons">
        <button class="swipe-btn bug-btn" id="swipe-bug-btn" title="Hatalı (Bug) - Sol">
          <span class="swipe-btn-icon">🪲</span>
          <span class="swipe-btn-label">BUG</span>
        </button>
        <button class="swipe-btn valid-btn" id="swipe-valid-btn" title="Doğru (Valid) - Sağ">
          <span class="swipe-btn-icon">✓</span>
          <span class="swipe-btn-label">VALID</span>
        </button>
      </div>
    </div>
  `;

  const card = document.getElementById('swipe-card');
  const overlayBug = card.querySelector('.swipe-overlay-bug');
  const overlayValid = card.querySelector('.swipe-overlay-valid');
  const timerBar = document.getElementById('swipe-timer-bar');

  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let isDragging = false;

  const dragStart = (e) => {
    if (isAnswerChecked) return;
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startX = clientX;
    startY = clientY;
    card.style.transition = 'none';

    window.addEventListener('mousemove', dragMove);
    window.addEventListener('mouseup', dragEnd);
    window.addEventListener('touchmove', dragMove, { passive: true });
    window.addEventListener('touchend', dragEnd);
  };

  const dragMove = (e) => {
    if (!isDragging || isAnswerChecked) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    currentX = clientX - startX;
    currentY = clientY - startY;

    const rotate = currentX * 0.1;
    card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`;

    const limit = 100;
    if (currentX > 0) {
      const opacity = Math.min(1, currentX / limit);
      overlayValid.style.opacity = opacity;
      overlayBug.style.opacity = 0;
    } else {
      const opacity = Math.min(1, -currentX / limit);
      overlayBug.style.opacity = opacity;
      overlayValid.style.opacity = 0;
    }
  };

  const removeWindowListeners = () => {
    window.removeEventListener('mousemove', dragMove);
    window.removeEventListener('mouseup', dragEnd);
    window.removeEventListener('touchmove', dragMove);
    window.removeEventListener('touchend', dragEnd);
  };

  const dragEnd = () => {
    if (!isDragging || isAnswerChecked) return;
    isDragging = false;
    removeWindowListeners();
    
    const threshold = 120;
    if (currentX > threshold) {
      swipeRight();
    } else if (currentX < -threshold) {
      swipeLeft();
    } else {
      card.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease';
      card.style.transform = 'translate(0px, 0px) rotate(0deg)';
      overlayBug.style.opacity = 0;
      overlayValid.style.opacity = 0;
    }
  };

  card.addEventListener('mousedown', dragStart);
  card.addEventListener('touchstart', dragStart, { passive: true });

  const swipeLeft = () => {
    if (isAnswerChecked) return;
    removeWindowListeners();
    clearInterval(reflexInterval);
    clearTimeout(reflexTimer);
    
    card.style.transition = 'transform 0.4s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.4s';
    card.style.transform = 'translate(-400px, 50px) rotate(-30deg)';
    card.style.opacity = 0;
    overlayBug.style.opacity = 1;
    overlayValid.style.opacity = 0;

    selectedAnswer = false; 
    document.getElementById('btn-check').disabled = false;
    setTimeout(() => {
      checkAnswer();
    }, 200);
  };

  const swipeRight = () => {
    if (isAnswerChecked) return;
    removeWindowListeners();
    clearInterval(reflexInterval);
    clearTimeout(reflexTimer);

    card.style.transition = 'transform 0.4s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.4s';
    card.style.transform = 'translate(400px, 50px) rotate(30deg)';
    card.style.opacity = 0;
    overlayValid.style.opacity = 1;
    overlayBug.style.opacity = 0;

    selectedAnswer = true; 
    document.getElementById('btn-check').disabled = false;
    setTimeout(() => {
      checkAnswer();
    }, 200);
  };

  document.getElementById('swipe-bug-btn').addEventListener('click', swipeLeft);
  document.getElementById('swipe-valid-btn').addEventListener('click', swipeRight);

  const textContent = (question.phrase || "") + (question.prompt || "") + (question.translation || "");
  const duration = Math.min(20000, Math.max(5000, textContent.length * 100));
  let remainingTime = duration;
  const timerTick = 50;
  timerBar.style.width = '100%';

  reflexInterval = setInterval(() => {
    if (isAnswerChecked) {
      clearInterval(reflexInterval);
      return;
    }
    remainingTime -= timerTick;
    const percentage = Math.max(0, (remainingTime / duration) * 100);
    timerBar.style.width = `${percentage}%`;

    if (remainingTime <= 0) {
      clearInterval(reflexInterval);
      removeWindowListeners();
      selectedAnswer = null; 
      document.getElementById('btn-check').disabled = false;
      checkAnswer();
    }
  }, timerTick);
}

// ── Edat Mıknatısı (The Preposition Magnet) ──
function renderPrepositionMagnet(container, question) {
  const parts = question.sentence.split("______");
  let sentenceHtml = "";
  if (parts.length >= 2) {
    sentenceHtml = `${parts[0]} <span class="magnet-blank-slot" id="magnet-drop-target">_____</span> ${parts[1]}`;
  } else {
    sentenceHtml = question.sentence;
  }

  const optionsHtml = question.options.map((opt, i) => {
    return `<div class="magnet-draggable" data-index="${i}" id="magnet-opt-${i}">${opt}</div>`;
  }).join('');

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <p class="quiz-translation" style="margin-bottom: 20px;">${question.translation || ''}</p>
    
    <div class="magnet-sentence-container">
      ${sentenceHtml}
    </div>
    
    <div class="magnet-bank-container" id="magnet-bank">
      ${optionsHtml}
    </div>
  `;

  const draggables = container.querySelectorAll('.magnet-draggable');
  const target = document.getElementById('magnet-drop-target');

  draggables.forEach(el => {
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;
    let isDragging = false;

    const onStart = (e) => {
      if (isAnswerChecked) return;
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX = clientX;
      startY = clientY;
      el.style.transition = 'none';
      el.style.zIndex = '1000';
      el.classList.add('dragging');

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onEnd);
    };

    const onMove = (e) => {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();
      
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      currentX = clientX - startX;
      currentY = clientY - startY;

      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(1.05)`;

      const rectEl = el.getBoundingClientRect();
      const rectTarget = target.getBoundingClientRect();

      const overlap = !(rectEl.right < rectTarget.left || 
                        rectEl.left > rectTarget.right || 
                        rectEl.bottom < rectTarget.top || 
                        rectEl.top > rectTarget.bottom);

      if (overlap) {
        target.classList.add('magnet-slot-hover');
      } else {
        target.classList.remove('magnet-slot-hover');
      }
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      el.classList.remove('dragging');

      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);

      const rectEl = el.getBoundingClientRect();
      const rectTarget = target.getBoundingClientRect();

      const overlap = !(rectEl.right < rectTarget.left || 
                        rectEl.left > rectTarget.right || 
                        rectEl.bottom < rectTarget.top || 
                        rectEl.top > rectTarget.bottom);

      target.classList.remove('magnet-slot-hover');

      if (overlap) {
        const index = parseInt(el.dataset.index);
        if (index === question.correctIndex) {
          el.style.display = 'none';
          target.textContent = el.textContent;
          target.classList.add('correct-snapped');
          selectedAnswer = index;
          document.getElementById('btn-check').disabled = false;
          checkAnswer();
        } else {
          target.classList.add('magnet-shake');
          el.classList.add('magnet-shake');
          
          el.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          el.style.transform = 'translate3d(0, 0, 0)';
          
          setTimeout(() => {
            target.classList.remove('magnet-shake');
            el.classList.remove('magnet-shake');
            el.style.zIndex = '';
          }, 500);
        }
      } else {
        el.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        el.style.transform = 'translate3d(0, 0, 0)';
        setTimeout(() => {
          el.style.zIndex = '';
        }, 300);
      }
    };

    el.addEventListener('mousedown', onStart);
    el.addEventListener('touchstart', onStart, { passive: true });
  });
}

const COLLOCATION_DICT = {
  // u36_l14_q1
  "to a certain extent": "Belirli bir dereceye kadar",
  "by no means certain": "Hiçbir şekilde kesin değil",
  "a matter of opinion": "Bir görüş meselesi",
  "under the assumption": "Varsayımı altında",
  // u36_l14_q2
  "tend to": "-e eğilimi olmak",
  "appear to": "Görünmek / Belirmek",
  "seem to": "Gibi görünmek",
  "shed light on": "Işık tutmak / Aydınlatmak",
  // u36_l14_q3
  "there is a likelihood that": "... olması ihtimali vardır",
  "there is a possibility that": "... olması olasılığı vardır",
  "there is a probability that": "... olması muhtemeldir",
  "there is no guarantee that": "... olacağının garantisi yoktur",
  // u36_l14_q4
  "with the anticipation of": "Beklentisiyle",
  "to some extent": "Bir ölçüye kadar / Kısmen",
  "reasonable to assume": "Varsaymak mantıklıdır",
  "shed some light on": "Biraz ışık tutmak",
  // u36_l14_q5
  "may have v3": "Yapmış olabilir (Belirsiz)",
  "might have v3": "Yapmış olabilir (Zayıf ihtimal)",
  "could have v3": "Yapabilirdi / Olabilirdi",
  "could have been v3": "Yapılmış/olmuş olabilirdi",
  // u36_l14_q6
  "have a tendency to": "-e eğilimi olmak",
  "have a propensity to": "-e meyli/yatkınlığı olmak",
  "safe from": "-den korunmuş / Güvenli",
  "consistent with": "-ile uyumlu / Tutarlı",
  // u36_l14_q7
  "partially systematic": "Kısmen sistematik",
  "virtually identical": "Neredeyse tamamen aynı",
  "predominantly caused": "Ağırlıklı olarak kaynaklanan / Çoğunlukla sebep olunan",
  "relatively sound": "Nispeten sağlam / Mantıklı",
  // u36_l14_q8
  "operate under the assumption": "Varsayımlar altında çalışmak",
  "a matter of opinion": "Görüş meselesi",
  // u36_l14_q9
  "suggest that": "İleri sürmek / Önermek",
  "indicate that": "İşaret etmek / Göstermek",
  "speculate that": "Tahminde bulunmak / Kuramsallaştırmak",
  "hypothesize that": "Hipotez ileri sürmek"
};

function showCollocationPopup(english, turkish) {
  const existing = document.getElementById('collocation-popup');
  if (existing) {
    existing.remove();
  }

  const popup = document.createElement('div');
  popup.id = 'collocation-popup';
  popup.className = 'collocation-success-popup';
  popup.innerHTML = `
    <div class="collocation-popup-icon">🔑</div>
    <div class="collocation-popup-content">
      <div class="collocation-popup-en">${english}</div>
      <div class="collocation-popup-tr">${turkish}</div>
    </div>
  `;

  document.body.appendChild(popup);

  // Trigger animation after append
  setTimeout(() => {
    popup.classList.add('show');
  }, 10);

  // Auto remove after 3 seconds
  setTimeout(() => {
    popup.classList.remove('show');
    setTimeout(() => {
      popup.remove();
    }, 300);
  }, 3000);
}

// ── Bağlantı Kilidi (Collocation Matcher) ──
function renderCollocationMatching(container, question) {
  const words = question.pairs.map(p => ({ type: 'word', text: p.word, prep: p.prep }));
  const preps = question.pairs.map(p => ({ type: 'prep', text: p.prep }));
  const allCards = [...words, ...preps].sort(() => Math.random() - 0.5);

  const cardsHtml = allCards.map((card, i) => {
    return `<div class="match-card" data-index="${i}" data-type="${card.type}" data-text="${card.text}" data-prep="${card.prep || ''}">
      ${card.text}
    </div>`;
  }).join('');

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <div class="collocation-matching-grid">
      ${cardsHtml}
    </div>
  `;

  const matchCards = container.querySelectorAll('.match-card');
  let selectedWordEl = null;
  let selectedPrepEl = null;
  let matchesCount = 0;

  matchCards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('matched') || card.classList.contains('error') || isAnswerChecked) return;

      const type = card.dataset.type;

      if (type === 'word') {
        if (selectedWordEl) {
          selectedWordEl.classList.remove('selected');
        }
        selectedWordEl = card;
        card.classList.add('selected');
      } else {
        if (selectedPrepEl) {
          selectedPrepEl.classList.remove('selected');
        }
        selectedPrepEl = card;
        card.classList.add('selected');
      }

      if (selectedWordEl && selectedPrepEl) {
        const reqPrep = selectedWordEl.dataset.prep;
        const actPrep = selectedPrepEl.dataset.text;

        const wEl = selectedWordEl;
        const pEl = selectedPrepEl;
        selectedWordEl = null;
        selectedPrepEl = null;

        if (reqPrep === actPrep) {
          wEl.classList.remove('selected');
          pEl.classList.remove('selected');
          wEl.classList.add('matched');
          pEl.classList.add('matched');
          matchesCount++;

          // Show Collocation Success Popup
          const englishPhrase = wEl.dataset.text + " " + pEl.dataset.text;
          const normalized = englishPhrase.toLowerCase().replace(/\s+/g, " ").trim();
          const turkishTranslation = COLLOCATION_DICT[normalized] || "";
          if (turkishTranslation) {
            showCollocationPopup(englishPhrase, turkishTranslation);
          }

          if (matchesCount === question.pairs.length) {
            selectedAnswer = 'perfect';
            document.getElementById('btn-check').disabled = false;
            setTimeout(() => {
              checkAnswer();
            }, 600);
          }
        } else {
          wEl.classList.add('error');
          pEl.classList.add('error');

          setTimeout(() => {
            wEl.classList.remove('selected', 'error');
            pEl.classList.remove('selected', 'error');
          }, 600);
        }
      }
    });
  });
}

// ── Refleks Blitz (Hız Tüneli) ──
function renderReflexBlitz(container, question) {
  const optionsHtml = question.options.map((opt, i) => {
    return `<button class="blitz-option-btn" data-index="${i}">
      <span class="blitz-shortcut-hint">${i + 1}</span>
      <span class="blitz-opt-text">${opt}</span>
    </button>`;
  }).join('');

  container.innerHTML = `
    <div class="blitz-header-row">
      <div class="blitz-timer-container">
        <div class="blitz-timer-bar" id="blitz-timer-bar"></div>
      </div>
      <div class="blitz-streak-badge ${blitzStreak >= 3 ? 'streak-ignited' : ''}" id="blitz-streak-badge">
        🔥 COMBO: ${blitzStreak}
      </div>
    </div>
    
    <p class="quiz-prompt">${question.prompt}</p>
    <div class="blitz-sentence-box">
      ${question.sentence}
    </div>
    
    <div class="blitz-options-grid">
      ${optionsHtml}
    </div>
  `;

  // Apply ignited glow to container
  const quizBox = document.querySelector('.quiz-screen .quiz-box') || document.querySelector('.quiz-container');
  if (quizBox) {
    if (blitzStreak >= 3) {
      quizBox.classList.add('quiz-container-streak-ignited');
    } else {
      quizBox.classList.remove('quiz-container-streak-ignited');
    }
  }

  const selectOption = (idx) => {
    if (isAnswerChecked) return;
    clearInterval(reflexInterval);
    if (blitzKeyHandler) {
      window.removeEventListener('keydown', blitzKeyHandler);
      blitzKeyHandler = null;
    }
    
    selectedAnswer = idx;
    
    const buttons = container.querySelectorAll('.blitz-option-btn');
    buttons.forEach((btn, i) => {
      if (i === idx) btn.classList.add('selected');
    });

    if (idx === question.correctIndex) {
      blitzStreak++;
    } else {
      blitzStreak = 0;
    }

    document.getElementById('btn-check').disabled = false;
    checkAnswer();
  };

  const onKey = (e) => {
    if (isAnswerChecked) return;
    if (e.key === '1') {
      selectOption(0);
    } else if (e.key === '2' && question.options.length > 1) {
      selectOption(1);
    }
  };
  window.addEventListener('keydown', onKey);
  blitzKeyHandler = onKey;

  container.querySelectorAll('.blitz-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      selectOption(idx);
    });
  });

  const timerBar = document.getElementById('blitz-timer-bar');
  let remainingTime = 3000;
  const tick = 50;

  reflexInterval = setInterval(() => {
    if (isAnswerChecked) {
      clearInterval(reflexInterval);
      return;
    }
    remainingTime -= tick;
    const percentage = Math.max(0, (remainingTime / 3000) * 100);
    timerBar.style.width = `${percentage}%`;

    if (remainingTime <= 0) {
      clearInterval(reflexInterval);
      if (blitzKeyHandler) {
        window.removeEventListener('keydown', blitzKeyHandler);
        blitzKeyHandler = null;
      }
      
      selectedAnswer = null;
      blitzStreak = 0;
      document.getElementById('btn-check').disabled = false;
      checkAnswer();
    }
  }, tick);
}

function showBlitzFeedback(question) {
  const buttons = document.querySelectorAll('.blitz-option-btn');
  buttons.forEach(btn => {
    const idx = parseInt(btn.dataset.index);
    if (idx === question.correctIndex) {
      btn.classList.add('correct');
    } else if (idx === selectedAnswer && idx !== question.correctIndex) {
      btn.classList.add('wrong');
    }
  });

  // Remove streak animation from box if incorrect
  if (selectedAnswer !== question.correctIndex) {
    const quizBox = document.querySelector('.quiz-screen .quiz-box') || document.querySelector('.quiz-container');
    if (quizBox) {
      quizBox.classList.remove('quiz-container-streak-ignited');
    }
  }
}

function checkAnswer() {
  if (isAnswerChecked) return;

  const question = isReviewMode ? reviewQuestions[currentQuestionIndex] : currentQuizQuestions[currentQuestionIndex];
  let isCorrect = false;

  const activeType = (question.type === 'fill-blank-dropdown' || question.type === 'fill-blank')
    ? question._dynamicType
    : question.type;

  switch (activeType) {
    case 'multiple-choice':
    case 'punctuation-check':
    case 'structure-match':
      isCorrect = selectedAnswer === question.correctIndex;
      break;
    case 'idiom-builder':
      isCorrect = Array.isArray(selectedAnswer) &&
        selectedAnswer.length === question.correctSequence.length &&
        selectedAnswer.every((w, i) => w === question.correctSequence[i]);
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
      break;
    case 'fill-blank':
      isCorrect = selectedAnswer === question.correctIndex;
      break;
    case 'fill-blank-text':
      {
        const userVal = (selectedAnswer || "").toLowerCase().trim();
        const correctVal = question.correct.toLowerCase().trim();
        isCorrect = userVal === correctVal;
      }
      break;
    case 'translation-text':
      {
        const cleanUser = (selectedAnswer || "").toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();
        const cleanCorrect = question.correctSentence.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();
        isCorrect = cleanUser === cleanCorrect;
      }
      break;
    case 'multiple-fill-blank':
      {
        const userVals = (selectedAnswer || []).map(val => val.toLowerCase().trim());
        const correctVals = question.corrects.map(val => val.toLowerCase().trim());
        isCorrect = userVals.length === correctVals.length && userVals.every((val, i) => val === correctVals[i]);
      }
      break;
    case 'true-false':
      isCorrect = selectedAnswer === question.correctAnswer;
      break;
    case 'spotlight':
      isCorrect = selectedAnswer === question.correctIndex;
      break;
    case 'swipe':
      isCorrect = selectedAnswer === question.isCorrect;
      break;
    case 'preposition-magnet':
      isCorrect = selectedAnswer === question.correctIndex;
      break;
    case 'collocation-matching':
      isCorrect = selectedAnswer === 'perfect';
      break;
    case 'reflex-blitz':
      isCorrect = selectedAnswer === question.correctIndex;
      break;
  }

  // Intercept if translation exists, primary is correct, and translation gate hasn't been triggered yet
  if (question && question.translation && isCorrect && !isTranslationGateTriggered && !isTranslationGateActive) {
    isTranslationGateTriggered = true;
    startTranslationGate(document.getElementById('quiz-body'), question);
    return;
  }

  isAnswerChecked = true;

  // Apply visual styles and call feedback rendering functions
  switch (activeType) {
    case 'multiple-choice':
    case 'punctuation-check':
    case 'structure-match':
      showMCFeedback(question);
      break;
    case 'fill-blank-dropdown':
      const selectEl = document.getElementById('fb-dropdown-select');
      if (selectEl) {
        selectEl.style.borderColor = isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
        selectEl.style.backgroundColor = isCorrect ? 'var(--color-correct-bg)' : 'var(--color-wrong-bg)';
        selectEl.style.color = isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
      }
      break;
    case 'fill-blank':
      showFBFeedback(question);
      break;
    case 'fill-blank-text':
      {
        const inputEl = document.getElementById('fb-text-input');
        if (inputEl) {
          inputEl.style.borderBottomColor = isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
          inputEl.style.color = isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
        }
      }
      break;
    case 'translation-text':
      {
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
    case 'true-false':
      showTFFeedback(question);
      break;
    case 'spotlight':
      showSpotlightFeedback(question);
      break;
    case 'reflex-blitz':
      showBlitzFeedback(question);
      break;
  }

  const isTargetUnit = question && question.translation ? true : false;
  if (isTargetUnit && question.translation && !wasTranslationCorrect) {
    isCorrect = false;
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
    if (question.type === 'multiple-choice' || question.type === 'fill-blank-dropdown' || question.type === 'fill-blank' || question.type === 'spotlight' || question.type === 'preposition-magnet' || question.type === 'reflex-blitz' || question.type === 'punctuation-check' || question.type === 'structure-match') {
      correctAnswerText = question.options[question.correctIndex];
    } else if (question.type === 'swipe') {
      correctAnswerText = question.isCorrect ? 'VALID (DOĞRU)' : 'BUG (HATALI)';
    } else if (question.type === 'collocation-matching') {
      correctAnswerText = question.explanation;
    } else if (question.type === 'fill-blank-text') {
      correctAnswerText = question.correct;
    } else if (question.type === 'translation-text') {
      correctAnswerText = question.correctSentence;
    } else if (question.type === 'word-bank') {
      correctAnswerText = question.correctOrder.join(' ');
    } else if (question.type === 'idiom-builder') {
      correctAnswerText = question.correctSequence.join(' ');
    } else if (question.type === 'multiple-fill-blank') {
      correctAnswerText = question.corrects.join(', ');
    } else if (question.type === 'true-false') {
      correctAnswerText = question.correctAnswer ? 'DOĞRU' : 'YANLIŞ';
    }

    if (question.type === 'true-false') {
      if (selectedAnswer === null) {
        feedbackText.textContent = `Süre Doldu! Doğru cevap: ${correctAnswerText}`;
      } else {
        feedbackText.textContent = `Yanlış! Doğru cevap: ${correctAnswerText}`;
      }
    } else if (isTargetUnit && question.translation && !wasTranslationCorrect) {
      feedbackText.innerHTML = `<strong>Yanlış çeviri!</strong> Doğrusu:<br><span style="color: var(--color-correct); font-weight: 600;">${question.translation}</span>`;
    } else {
      feedbackText.textContent = `Doğru cevap: ${correctAnswerText}`;
    }
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

    // Hatalı cevaplarda gramatik açıklama pop-up'ını tetikle (Hız Tüneli hariç)
    if (question.type !== 'true-false' && question.type !== 'reflex-blitz') {
      showGrammarExplanationModal(question, selectedAnswer);
    }
  }

  saveState();

  const btnCheck = document.getElementById('btn-check');
  btnCheck.textContent = 'DEVAM ET';
  btnCheck.disabled = false;

  const btnSkip = document.getElementById('btn-skip');
  if (btnSkip) {
    btnSkip.style.display = 'none';
  }

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
      btn.classList.add('correct');
      btn.style.borderColor = 'var(--color-correct)';
      btn.style.background = 'var(--color-correct-bg)';
      btn.style.color = 'var(--color-correct)';
    } else if (idx === selectedAnswer && idx !== question.correctIndex) {
      btn.classList.add('wrong');
      btn.style.borderColor = 'var(--color-wrong)';
      btn.style.background = 'var(--color-wrong-bg)';
      btn.style.color = 'var(--color-wrong)';
    }
  });
}

function skipQuestion() {
  if (autoAdvanceTimeout) {
    clearTimeout(autoAdvanceTimeout);
    autoAdvanceTimeout = null;
  }
  currentQuestionIndex++;

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
  const total = currentQuizQuestions.length;
  const accuracy = Math.round((correctCount / total) * 100);
  const isSuccess = isLocalEnvironment() || accuracy >= 80;
  
  isCurrentExercisePassed = isSuccess;

  let newAchievements = [];

  if (isSuccess) {
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
    newAchievements = checkAchievements();
  }

  const earnedXP = isSuccess ? correctCount * XP_PER_CORRECT : 0;

  const exTitle = currentLesson.activeExerciseTitle ? ` - ${currentLesson.activeExerciseTitle}` : '';
  const trophyEl = document.querySelector('.summary-trophy');
  const titleEl = document.querySelector('.summary-title');
  const subtitleEl = document.getElementById('summary-lesson-name');
  const xpEl = document.getElementById('summary-xp');
  const accuracyEl = document.getElementById('summary-accuracy');
  const continueBtn = document.getElementById('btn-summary-continue');

  if (isSuccess) {
    if (trophyEl) trophyEl.textContent = '🏆';
    if (titleEl) titleEl.textContent = 'Tebrikler!';
    if (subtitleEl) subtitleEl.textContent = `"${currentLesson.title}${exTitle}" alıştırmasını tamamladın!`;
    if (xpEl) xpEl.textContent = `+${earnedXP}`;
    if (continueBtn) continueBtn.textContent = 'DEVAM ET';
  } else {
    if (trophyEl) trophyEl.textContent = '❌';
    if (titleEl) titleEl.textContent = 'Başarısız!';
    if (subtitleEl) subtitleEl.textContent = `Bu alıştırmayı geçmek için en az %80 doğruluk oranı elde etmelisin. Tekrar deneyerek barajı geçebilirsin.`;
    if (xpEl) xpEl.textContent = `+0`;
    if (continueBtn) continueBtn.textContent = 'TEKRAR DENE';
  }

  if (accuracyEl) accuracyEl.textContent = `${accuracy}%`;

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
  if (!tabId) return;
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
// BOŞ ALİŞTIRMALI DERS BULUCU (DEVELOPER TOOL)
// ============================================================
let lastVisitedEmptyLessonIndex = -1;

function navigateToNextEmptyLesson() {
  if (typeof lessons === 'undefined' || !lessons) return;

  const emptyLessons = lessons.filter(l => {
    return (!l.exercises || l.exercises.length === 0) && (!l.questions || l.questions.length === 0);
  });

  if (emptyLessons.length === 0) {
    showToast("Eksik alıştırması olan ders kalmamış! 🎉", "success");
    return;
  }

  lastVisitedEmptyLessonIndex = (lastVisitedEmptyLessonIndex + 1) % emptyLessons.length;
  const targetLesson = emptyLessons[lastVisitedEmptyLessonIndex];

  switchTab('lessons');

  setTimeout(() => {
    const btn = document.querySelector(`.lesson-node[data-lesson-id="${targetLesson.id}"]`);
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        btn.click();
        showToast(`Boş Ders: ${targetLesson.title} - ${targetLesson.subtitle} (${lastVisitedEmptyLessonIndex + 1}/${emptyLessons.length})`, "info");
      }, 400);
    } else {
      showToast(`Ders düğmesi bulunamadı: ${targetLesson.title}`, "error");
    }
  }, 100);
}

// ============================================================
// PROFİL SEKME RENDER
// ============================================================
let activeSocialSubTab = 'following'; // Global tab state for social section

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

    <div class="daily-tasks-section" id="daily-tasks-section" style="margin-top: 16px;">
      <div class="daily-tasks-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 8px; margin-bottom: 16px;">
        <h3 class="profile-section-title" style="margin: 0; display: flex; align-items: center; gap: 8px;">📅 Günlük Görevler</h3>
        <span class="tasks-reset-timer" id="tasks-reset-timer" title="Yenilenmesine kalan süre">Sıfırlanma: --:--:--</span>
      </div>
      <div class="daily-tasks-list" id="daily-tasks-list">
        <!-- Dinamik olarak app.js tarafından doldurulacak -->
      </div>
    </div>

    <h3 class="profile-section-title">🏆 Başarımlar</h3>
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

  renderDailyTasks();
  if (typeof updateResetTimer === 'function') {
    updateResetTimer();
  }

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
  const SchoolResultsEl = document.getElementById('social-search-results'); // wait, resultsEl
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
    { name: (state.username || 'Misafir') + " (Sen)", xp: state.xp, isUser: true }
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

function showGuestBlockModal() {
  const modal = document.getElementById('guest-block-modal');
  if (modal) {
    modal.classList.add('show');
  }
}

// ============================================================
// EVENT LİSTENERLER
// ============================================================
function initEventListeners() {
  // Misafir Engel Modali
  const guestBlockCloseBtn = document.getElementById('guest-block-close-btn');
  const guestBlockLoginBtn = document.getElementById('guest-block-login-btn');
  const guestBlockRegisterBtn = document.getElementById('guest-block-register-btn');

  const hideGuestBlockModal = () => {
    const modal = document.getElementById('guest-block-modal');
    if (modal) modal.classList.remove('show');
  };

  if (guestBlockCloseBtn) {
    guestBlockCloseBtn.addEventListener('click', hideGuestBlockModal);
  }

  if (guestBlockLoginBtn) {
    guestBlockLoginBtn.addEventListener('click', () => {
      hideGuestBlockModal();
      logout();
      const tabLogin = document.getElementById('tab-login');
      if (tabLogin) tabLogin.click();
    });
  }

  if (guestBlockRegisterBtn) {
    guestBlockRegisterBtn.addEventListener('click', () => {
      hideGuestBlockModal();
      logout();
      const tabRegister = document.getElementById('tab-register');
      if (tabRegister) tabRegister.click();
    });
  }

  // Tema
  document.getElementById('btn-theme').addEventListener('click', toggleTheme);

  // Kullanıcı menüsü
  document.getElementById('btn-user-menu').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('user-dropdown').classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    document.getElementById('user-dropdown').classList.remove('open');
    
    // Toggle active state for hoverable words on tap/click
    const hoverable = e.target.closest('.hoverable-word');
    if (hoverable && !hoverable.classList.contains('no-meaning')) {
      const wasActive = hoverable.classList.contains('active');
      document.querySelectorAll('.hoverable-word.active').forEach(w => w.classList.remove('active'));
      if (!wasActive) {
        hoverable.classList.add('active');
      }
      e.stopPropagation();
    } else {
      document.querySelectorAll('.hoverable-word.active').forEach(w => w.classList.remove('active'));
    }
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
    if (isTranslationGateActive && onTranslationGateVerify) {
      onTranslationGateVerify();
    } else if (!isAnswerChecked) {
      const question = isReviewMode ? reviewQuestions[currentQuestionIndex] : currentQuizQuestions[currentQuestionIndex];
      const isTargetUnit = question && question.translation ? true : false;
      const activeType = question ? ((question.type === 'fill-blank-dropdown' || question.type === 'fill-blank') ? question._dynamicType : question.type) : '';
      const isCorrectDropdown = activeType === 'fill-blank-dropdown' && selectedAnswer === question.correctIndex;

      if (isTargetUnit && isCorrectDropdown && question.translation) {
        startTranslationGate(document.getElementById('quiz-body'), question);
      } else {
        checkAnswer();
      }
    } else {
      nextQuestion();
    }
  });

  // Soruyu Atla butonu
  const btnSkip = document.getElementById('btn-skip');
  if (btnSkip) {
    btnSkip.addEventListener('click', () => {
      skipQuestion();
    });
  }

  // Özet ekranı devam
  document.getElementById('btn-summary-continue').addEventListener('click', () => {
    if (!isCurrentExercisePassed) {
      startLesson(currentLesson.id, currentLesson.activeExerciseId);
      return;
    }

    updateTopBar();
    renderLessonTree();
    renderAchievements();
    showScreen('home-screen');

    // Check guest restriction
    if (state.isGuest) {
      const firstUnit = units.find(u => u.id === 1);
      const firstUnitLessons = firstUnit ? firstUnit.lessons : [];
      const isUnit1Completed = firstUnitLessons.every(lId => state.completedLessons.includes(lId));
      if (isUnit1Completed) {
        showGuestBlockModal();
        return;
      }
    }

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
        const sortedLessons = [];
        units.forEach(u => {
          u.lessons.forEach(lId => {
            sortedLessons.push(lId);
          });
        });
        const currentIdx = sortedLessons.indexOf(currentLesson.id);
        if (currentIdx !== -1 && currentIdx + 1 < sortedLessons.length) {
          const nextLessonId = sortedLessons[currentIdx + 1];
          if (isLessonUnlocked(nextLessonId)) {
            targetLessonId = nextLessonId;
          }
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
      startLesson(currentLesson.id, currentLesson.activeExerciseId);
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
      if (btn.dataset.tab) {
        switchTab(btn.dataset.tab);
      }
    });
  });

  // Dev Tool: Boş Ders Bul
  const devTabBtn = document.getElementById('btn-next-empty-lesson');
  if (devTabBtn) {
    devTabBtn.addEventListener('click', () => {
      navigateToNextEmptyLesson();
    });
  }

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
      if (state.isGuest) {
        showGuestBlockModal();
        return;
      }
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

  const btnPlacementSkip = document.getElementById('btn-placement-skip');
  if (btnPlacementSkip) {
    btnPlacementSkip.addEventListener('click', () => {
      skipPlacementQuestion();
    });
  }

  // Hızlı Tekrar
  const startReviewBtn = document.getElementById('btn-start-review');
  if (startReviewBtn) {
    startReviewBtn.addEventListener('click', () => {
      if (state.isGuest) {
        const firstUnit = units.find(u => u.id === 1);
        const firstUnitLessons = firstUnit ? firstUnit.lessons : [];
        const isUnit1Completed = firstUnitLessons.every(lId => state.completedLessons.includes(lId));
        if (isUnit1Completed) {
          showGuestBlockModal();
          return;
        }
      }
      startReviewMode();
    });
  }

  // Akıllı Tekrar Davet Modali Event Listeners
  const reviewPromptCloseBtn = document.getElementById('review-prompt-close-btn');
  const reviewPromptCancelBtn = document.getElementById('review-prompt-cancel-btn');
  const reviewPromptConfirmBtn = document.getElementById('review-prompt-confirm-btn');

  const hideReviewPromptModal = () => {
    const modal = document.getElementById('review-prompt-modal');
    if (modal) modal.classList.remove('show');
  };

  if (reviewPromptCloseBtn) {
    reviewPromptCloseBtn.addEventListener('click', () => {
      state.lastPromptedWrongCount = state.wrongQuestions ? state.wrongQuestions.length : 0;
      saveState();
      hideReviewPromptModal();
    });
  }

  if (reviewPromptCancelBtn) {
    reviewPromptCancelBtn.addEventListener('click', () => {
      state.lastPromptedWrongCount = state.wrongQuestions ? state.wrongQuestions.length : 0;
      saveState();
      hideReviewPromptModal();
    });
  }

  if (reviewPromptConfirmBtn) {
    reviewPromptConfirmBtn.addEventListener('click', () => {
      hideReviewPromptModal();
      if (state.isGuest) {
        const firstUnit = units.find(u => u.id === 1);
        const firstUnitLessons = firstUnit ? firstUnit.lessons : [];
        const isUnit1Completed = firstUnitLessons.every(lId => state.completedLessons.includes(lId));
        if (isUnit1Completed) {
          showGuestBlockModal();
          return;
        }
      }
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

  // Son Düzenlemeler Kutusu (Recent Changes Box) Tıklama Dinleyicisi
  const recentChangesBox = document.getElementById('recent-changes-box');
  if (recentChangesBox) {
    recentChangesBox.addEventListener('click', (e) => {
      const item = e.target.closest('.recent-change-item');
      if (!item) return;

      const action = item.dataset.action;
      const target = item.dataset.target;

      if (action === 'lesson') {
        const lessonId = parseInt(target, 10);
        switchTab('lessons');
        
        setTimeout(() => {
          const btn = document.querySelector(`.lesson-node[data-lesson-id="${lessonId}"]`);
          if (btn) {
            btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            btn.classList.add('navigation-highlight');
            setTimeout(() => {
              btn.click();
            }, 600);
            setTimeout(() => {
              btn.classList.remove('navigation-highlight');
            }, 2500);
            showToast(`Derse gidildi: ${lessonId}. Ders`, "success");
          } else {
            showToast(`Ders bulunamadı: ${lessonId}. Ders`, "error");
          }
        }, 150);
      } else if (action === 'element') {
        if (target === '#btn-admin') {
          switchTab('admin');
          const adminBtn = document.getElementById('btn-admin');
          if (adminBtn) {
            adminBtn.classList.add('navigation-highlight');
            setTimeout(() => {
              adminBtn.classList.remove('navigation-highlight');
            }, 2000);
          }
          showToast(`Admin Sekmesi Açıldı`, "success");
        } else if (target === '#placement-banner') {
          switchTab('lessons');
          setTimeout(() => {
            const banner = document.querySelector('#placement-banner');
            if (banner) {
              banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
              banner.classList.add('navigation-highlight');
              setTimeout(() => {
                banner.classList.remove('navigation-highlight');
              }, 2500);
              showToast(`Seviye Sınavı Kutusuna Gidildi`, "success");
            } else {
              showToast(`Sınav Kutusu Bulunamadı! (Seviyeniz zaten belirlenmiş olabilir)`, "info");
            }
          }, 150);
        }
      }
    });
  }
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
  quizSessionId++;
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

  // Dynamically assign render type for blank questions
  if (question.type === 'fill-blank-dropdown' || question.type === 'fill-blank') {
    if (question._dynamicSessionId !== quizSessionId) {
      question._dynamicSessionId = quizSessionId;
      question._dynamicType = Math.random() < 0.5 ? 'fill-blank-dropdown' : 'fill-blank';
    }
  }

  placementSelectedAnswer = null;
  isPlacementAnswerChecked = false;

  const body = document.getElementById('placement-body');
  const btnCheck = document.getElementById('btn-placement-check');
  const feedbackPanel = document.getElementById('placement-feedback-panel');

  const btnPlacementSkip = document.getElementById('btn-placement-skip');
  if (btnPlacementSkip) {
    btnPlacementSkip.style.display = 'inline-flex';
  }

  feedbackPanel.classList.remove('show', 'correct', 'wrong');
  btnCheck.disabled = true;
  btnCheck.textContent = 'KONTROL ET';

  // İlerleme çubuğu
  const total = placementQuestionsList.length;
  const progress = (placementCurrentIndex / total) * 100;
  document.getElementById('placement-progress').style.width = `${progress}%`;

  const activeType = (question.type === 'fill-blank-dropdown' || question.type === 'fill-blank')
    ? question._dynamicType
    : question.type;

  // Adjust prompt text to fit the visual type
  const originalPrompt = question.prompt;
  if (activeType === 'fill-blank-dropdown' && question.prompt === 'Boşluğu doldur') {
    question.prompt = 'Boşluğa gelecek en uygun kelimeyi seçin:';
  } else if (activeType === 'fill-blank' && question.prompt.startsWith('Boşluğa gelecek en uygun kelimeyi seçin')) {
    question.prompt = 'Boşluğu doldur';
  }

  switch (activeType) {
    case 'multiple-choice':
      renderPlacementMultipleChoice(body, question);
      break;
    case 'fill-blank-dropdown':
      renderPlacementFillBlankDropdown(body, question);
      break;
    case 'fill-blank':
      renderPlacementFillBlank(body, question);
      break;
    case 'fill-blank-text':
      renderPlacementFillBlankText(body, question);
      break;
  }

  // Restore prompt text so data remains unmodified
  question.prompt = originalPrompt;
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
  const sentence = question.sentence || question.prompt || '';
  const parts = sentence.split(/_{3,}/);
  const selectOptions = `<option value="" disabled selected>Seçin...</option>` +
    question.options.map((opt, i) => `<option value="${i}">${opt}</option>`).join('');

  let displayPrompt = question.sentence ? question.prompt : 'Boşluğa gelecek en uygun kelimeyi seçin:';
  if (displayPrompt === 'Boşluğu doldur') {
    displayPrompt = 'Boşluğu doldur!';
  }

  container.innerHTML = `
    <p class="quiz-prompt">${displayPrompt}</p>
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
  const parts = question.sentence.split(/_{3,}/);

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

function renderPlacementFillBlank(container, question) {
  const sentence = question.sentence || question.prompt || '';
  const parts = sentence.split(/_{3,}/);
  const part0Html = parts[0];
  const part1Html = parts[1] || '';

  const optionsHtml = question.options.map((opt, i) => {
    return `<button class="fb-option" data-index="${i}">
      <span class="fb-number">${i + 1}</span>
      <span class="fb-text">${opt}</span>
    </button>`;
  }).join('');

  let displayPrompt = question.sentence ? question.prompt : 'Boşluğu doldur';
  if (displayPrompt === 'Boşluğu doldur') {
    displayPrompt = 'Boşluğu doldur!';
  }

  container.innerHTML = `
    <p class="quiz-prompt">${displayPrompt}</p>
    <div class="fb-sentence" style="font-size: 1.25rem; font-weight: 500; text-align: center; margin: 24px 0; color: var(--text-primary); line-height: 1.6;">
      ${part0Html}<span class="fb-blank" id="fb-placement-blank-word">______</span>${part1Html}
    </div>
    <div class="fb-options">
      ${optionsHtml}
    </div>
  `;

  const blankEl = document.getElementById('fb-placement-blank-word');
  
  container.querySelectorAll('.fb-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isPlacementAnswerChecked) return;
      container.querySelectorAll('.fb-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      
      const idx = parseInt(btn.dataset.index);
      placementSelectedAnswer = idx;
      
      blankEl.innerHTML = question.options[idx];
      
      document.getElementById('btn-placement-check').disabled = false;
    });
  });
}

function checkPlacementAnswer() {
  const question = placementQuestionsList[placementCurrentIndex];
  isPlacementAnswerChecked = true;

  const body = document.getElementById('placement-body');
  const activeType = (question.type === 'fill-blank-dropdown' || question.type === 'fill-blank')
    ? question._dynamicType
    : question.type;

  let isCorrect = false;
  if (activeType === 'multiple-choice' || activeType === 'fill-blank-dropdown' || activeType === 'fill-blank') {
    isCorrect = placementSelectedAnswer === question.correctIndex;
    if (activeType === 'fill-blank') {
      const options = body.querySelectorAll('.fb-option');
      options.forEach(btn => {
        const idx = parseInt(btn.dataset.index);
        if (idx === question.correctIndex) {
          btn.classList.add('correct');
          btn.style.borderColor = 'var(--color-correct)';
          btn.style.background = 'var(--color-correct-bg)';
          btn.style.color = 'var(--color-correct)';
        } else if (idx === placementSelectedAnswer && idx !== question.correctIndex) {
          btn.classList.add('wrong');
          btn.style.borderColor = 'var(--color-wrong)';
          btn.style.background = 'var(--color-wrong-bg)';
          btn.style.color = 'var(--color-wrong)';
        }
      });
    }
  } else if (activeType === 'fill-blank-text') {
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
    if (question.type === 'multiple-choice' || question.type === 'fill-blank-dropdown' || question.type === 'fill-blank') {
      correctText = question.options[question.correctIndex];
    } else if (question.type === 'fill-blank-text') {
      correctText = question.correct;
    }
    text.textContent = `Yanlış. Doğru cevap: "${correctText}"`;
  }

  const btnCheck = document.getElementById('btn-placement-check');
  btnCheck.textContent = 'DEVAM ET';

  const btnPlacementSkip = document.getElementById('btn-placement-skip');
  if (btnPlacementSkip) {
    btnPlacementSkip.style.display = 'none';
  }

  if (isCorrect) {
    autoAdvanceTimeout = setTimeout(() => {
      nextPlacementQuestion();
    }, 1200);
  }
}

function skipPlacementQuestion() {
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
  sendReportEmail(newReport, question);
  
  showToast('Hata bildiriminiz gönderildi. Teşekkür ederiz! 🙏', 'success');
}

function sendReportEmail(report, question) {
  if (typeof OBFUSCATED_EMAIL === 'undefined' || !OBFUSCATED_EMAIL) return;

  try {
    // Decode the Base64 email address to keep it hidden in source code
    const emailAddress = atob(OBFUSCATED_EMAIL);
    
    // FormSubmit AJAX API endpoint
    const url = `https://formsubmit.co/ajax/${emailAddress}`;
    
    // Generate AI Prompt
    const qClean = question ? { ...question } : {};
    delete qClean._dynamicType;
    
    const aiPrompt = `[HATA BİLDİRİMİ - YAPAY ZEKA GELİŞTİRİCİ PROMPTU]
Lütfen aşağıdaki sorudaki hatayı düzelt:

- Ders Bilgisi: ${report.lessonTitle}
- Soru ID: ${report.questionId}
- Soru Türü: ${report.questionType}
- Bildirilen Hata Türü: ${translateErrorType(report.errorType)}
- Kullanıcı Açıklaması: "${report.userComment}"

Mevcut Soru Verisi (JSON):
${JSON.stringify(qClean, null, 2)}

Yapılması Gerekenler:
1. data.js dosyasında "${report.questionId}" ID'li soruyu bulun.
2. Kullanıcının belirttiği "${report.userComment}" açıklamasını inceleyip hatayı (çeviri, imla, yanlış cevap anahtarı veya seçenekler) düzeltin.
3. Sorudaki gerekli alanları (en, tr, options, word, trWord, correctIndex vb.) güncelleyip dosyayı kaydedin.`;

    const body = {
      _subject: `AMOK Soru Hata Bildirimi - ${report.lessonTitle}`,
      "Ders Bilgisi": report.lessonTitle,
      "Soru ID": report.questionId,
      "Soru Türü": report.questionType,
      "Soru Metni": report.questionPrompt,
      "Hata Türü": translateErrorType(report.errorType),
      "Kullanıcı Açıklaması": report.userComment,
      "Yapay Zeka Hazır Promptu (AI Ready Prompt)": aiPrompt,
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
          `).join('')}
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

function checkAndShowReviewPrompt() {
  const currentCount = state.wrongQuestions ? state.wrongQuestions.length : 0;
  let lastCount = state.lastPromptedWrongCount || 0;

  if (currentCount < lastCount) {
    state.lastPromptedWrongCount = currentCount;
    lastCount = currentCount;
    saveState();
  }

  // Her 20 hata yapılmış soruda bir pop-up göster
  if (currentCount >= 20 && Math.floor(currentCount / 20) > Math.floor(lastCount / 20)) {
    const modal = document.getElementById('review-prompt-modal');
    const countEl = document.getElementById('review-prompt-count');
    if (modal && countEl) {
      countEl.textContent = currentCount;
      modal.classList.add('show');
    }
  }
}

function startReviewMode() {
  if (!state.wrongQuestions || state.wrongQuestions.length === 0) return;

  quizSessionId++;
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

  // Karma/Karışık test olması için soruları karıştır
  reviewQuestions.sort(() => Math.random() - 0.5);

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
  // Show dev tools tab only if running locally (localhost / 127.0.0.1 / Class A, B, C private IPs / file protocol)
  const checkIsLocal = () => {
    const hn = window.location.hostname;
    const proto = window.location.protocol;
    
    if (proto === 'file:' || !hn) return true;
    if (hn === 'localhost' || hn === '127.0.0.1' || hn === '0.0.0.0' || hn === '[::1]') return true;
    
    if (hn.startsWith('192.168.')) return true;
    if (hn.startsWith('10.')) return true;
    if (hn.startsWith('172.')) {
      const parts = hn.split('.');
      if (parts.length >= 2) {
        const sec = parseInt(parts[1], 10);
        if (sec >= 16 && sec <= 31) return true;
      }
    }
    
    if (hn.endsWith('.local') || hn.endsWith('.lan')) return true;
    return false;
  };

  const isLocal = checkIsLocal();
  if (isLocal) {
    const devTab = document.getElementById('btn-next-empty-lesson');
    if (devTab) devTab.style.setProperty('display', 'flex', 'important');
    const adminTab = document.getElementById('btn-admin');
    if (adminTab) adminTab.style.setProperty('display', 'flex', 'important');
    const recentBox = document.getElementById('recent-changes-box');
    if (recentBox) recentBox.style.setProperty('display', 'block', 'important');
  } else {
    const devTab = document.getElementById('btn-next-empty-lesson');
    if (devTab) devTab.remove();
    const adminTab = document.getElementById('btn-admin');
    if (adminTab) adminTab.remove();
    const adminContent = document.getElementById('tab-content-admin');
    if (adminContent) adminContent.remove();
    const recentBox = document.getElementById('recent-changes-box');
    if (recentBox) recentBox.remove();
  }

  initTheme();
  loadState();
  initAuth();
  initEventListeners();

  if (!state.username) {
    state.username = 'Misafir';
    state.isGuest = true;
    saveState();
  }
  initSocialSystem();
  enterApp();
  initNotifications();
}

function showGrammarExplanationModal(question, selectedAnswer) {
  const modalOverlay = document.getElementById('grammar-modal');
  const modalContent = document.getElementById('grammar-modal-body-content');
  if (!modalOverlay || !modalContent) return;

  // Generate explanation HTML
  const explanationHtml = getGrammarExplanationHtml(question, selectedAnswer);
  modalContent.innerHTML = explanationHtml;

  modalOverlay.classList.add('show');

  const hideModal = () => {
    modalOverlay.classList.remove('show');
  };

  // Bind close buttons
  const closeBtn = document.getElementById('grammar-modal-close-btn');
  const okBtn = document.getElementById('grammar-modal-ok-btn');
  if (closeBtn) closeBtn.onclick = hideModal;
  if (okBtn) okBtn.onclick = hideModal;

  // Close when clicking outside on the overlay backdrop
  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) {
      hideModal();
    }
  };
}

function getGrammarExplanationHtml(question, selectedAnswer) {
  let title = 'Dilbilgisi Analizi';
  let text = '';
  let ruleTitle = 'Dilbilgisi Kuralları';
  let ruleText = '';
  let wrongExample = '';
  let correctExample = '';

  // Check if we already have an explanation field in the question object
  const preDefinedExplanation = question.explanation || '';

  const isMC = question.type === 'multiple-choice';

  if (isMC) {
    title = 'Çeviri Analizi';
    const chosenTranslation = question.options[selectedAnswer] || '';
    const correctTranslation = question.options[question.correctIndex] || '';

    text = `Seçtiğiniz çeviri: <strong style="color: var(--color-wrong);">${chosenTranslation}</strong>`;
    ruleTitle = '💡 Akademik Çeviri Kuralı';
    
    if (preDefinedExplanation) {
      ruleText = preDefinedExplanation;
    } else {
      ruleText = `İngilizceden Türkçeye (veya tersi) çevirilerde zaman zarflarının (when: -diğinde, since: -den beri, before: -meden önce, after: -dikten sonra) ve yardımcı fiillerin anlamına dikkat edilmelidir.`;
    }

    // Check specific conjunction errors
    if (chosenTranslation.includes('önce') && !correctTranslation.includes('önce')) {
      ruleText += `<br><br>⚠️ Seçeneğinizdeki <strong>"önce"</strong> ifadesi <strong>"before"</strong> bağlacına aittir.`;
    } else if (chosenTranslation.includes('sonra') && !correctTranslation.includes('sonra')) {
      ruleText += `<br><br>⚠️ Seçeneğinizdeki <strong>"sonra"</strong> ifadesi <strong>"after"</strong> bağlacına aittir.`;
    } else if (chosenTranslation.includes('beri') && !correctTranslation.includes('beri')) {
      ruleText += `<br><br>⚠️ Seçeneğinizdeki <strong>"-den beri"</strong> ifadesi <strong>"since"</strong> bağlacına aittir.`;
    }

    wrongExample = `${question.enSentence || 'Cümle'} ➔ ${chosenTranslation} ❌`;
    correctExample = `${question.enSentence || 'Cümle'} ➔ ${correctTranslation} ✔️`;

  } else if (question.type === 'word-bank') {
    title = 'Cümle Yapısı ve Kelime Dizilimi (Word Order)';
    const chosenText = Array.isArray(selectedAnswer) ? selectedAnswer.join(' ') : 'Kelime dizilimi';
    const correctText = Array.isArray(question.correctOrder) ? question.correctOrder.join(' ') : (question.enSentence || '');

    text = `Oluşturduğunuz cümle: <span style="color: var(--color-wrong); font-weight: 500;">"${chosenText}"</span>`;
    if (question.isEngToTr) {
      ruleTitle = '💡 Türkçe Cümle Yapısı (Sözdizimi)';
      ruleText = preDefinedExplanation || `Türkçe cümle yapısında özneler, tümleçler ve yüklem uyumu kurallara uygun sıralanmalıdır. Türkçe cümlelerde genellikle yüklem sonda yer alır ve kelime grubu ilişkilerine özen gösterilmelidir.`;
    } else {
      ruleTitle = '💡 İngilizce Cümle Yapısı (Syntax)';
      ruleText = preDefinedExplanation || `İngilizce akademik cümlelerde eklentiler, zaman zarfları ve ana cümle dizilimi kurallara uygun sıralanmalıdır. Yan cümle bağlacından (when, since, although vb.) hemen sonra bir özne ve çekimli fiil gelmelidir.`;
    }
    
    wrongExample = `Dizilim Hatası ❌`;
    correctExample = `Doğru Sıralama: "${correctText}" ✔️`;

  } else if (question.type === 'matching' || question.type === 'matching-halves') {
    title = 'Anlamsal ve Zamansal Eşleştirme';
    text = `Eşleştirme sırasında dilbilgisel veya anlamsal uyuşmazlık oluştu.`;
    ruleTitle = '💡 Yan Cümle ile Ana Cümle Arasındaki Bağlantı';
    ruleText = preDefinedExplanation || `Eşleştirme yaparken yan cümledeki zaman zarfı (When, Since, Before vb.) ile ana cümledeki eylemin zaman uyumu (Tense Agreement) ve anlamsal bütünlüğü kontrol edilmelidir.`;

  } else if (question.type === 'translation-text') {
    title = 'Yazılı Çeviri Analizi';
    const chosenText = selectedAnswer || '';
    const correctText = question.correctSentence || '';

    text = `Yazdığınız çeviri: <span style="color: var(--color-wrong); font-weight: 500;">"${chosenText}"</span>`;
    if (question.isEngToTr) {
      ruleTitle = '💡 Türkçe Dilbilgisi ve Suffix Uyumu';
      ruleText = preDefinedExplanation || `Akademik cümlelerin Türkçe çevirilerinde, yüklem zamanları ve ek uyumuna (suffix harmony) özen gösterilmelidir.`;
    } else {
      ruleTitle = '💡 İngilizce Zaman ve Özne-Yüklem Uyumu';
      ruleText = preDefinedExplanation || `İngilizce akademik yazılı çevirilerde, özne-yüklem uyumuna (Subject-Verb Agreement) ve doğru zaman (Tense) seçimine özen gösterilmelidir.`;
    }
    
    wrongExample = `Yazılan Çeviri ❌`;
    correctExample = `Kılavuz Çeviri: "${correctText}" ✔️`;


  } else {
    // Cloze questions (fill-blank, fill-blank-dropdown, fill-blank-text, multiple-fill-blank)
    let chosenWord = '';
    let correctWord = '';
    
    if (question.type === 'multiple-fill-blank') {
      chosenWord = Array.isArray(selectedAnswer) ? selectedAnswer.join(', ') : '';
      correctWord = Array.isArray(question.corrects) ? question.corrects.join(', ') : '';
    } else {
      chosenWord = (question.options ? question.options[selectedAnswer] : selectedAnswer || "").toLowerCase().trim();
      correctWord = (question.correct || (question.options && question.options[question.correctIndex]) || "").toLowerCase().trim();
    }

    text = `Seçtiğiniz kelime: <strong style="color: var(--color-wrong);">${chosenWord || '(boş)'}</strong> (Doğru cevap: <strong style="color: var(--color-correct);">${correctWord}</strong>)`;
    ruleTitle = '💡 Boşluk Doldurma Kuralları';

    if (preDefinedExplanation) {
      title = 'Dilbilgisi Analizi';
      ruleTitle = '💡 Dilbilgisi Kuralı';
      ruleText = preDefinedExplanation;
      wrongExample = '';
      correctExample = '';
    } else {
      const match = question.id ? question.id.match(/l(\d+)_/) : null;
      const lessonNum = match ? parseInt(match[1]) : 0;
      
      if (lessonNum === 75) {
        title = 'Since Zaman Uyumu Kuralı';
        ruleTitle = '💡 Since Bağlacı ve Süreç Çekimi';
        ruleText = `<strong>Since</strong> ile başlayan yan cümle eylemin başlangıç noktasını bildirdiği için her zaman <strong>Geçmiş Zaman (Past Simple / V2)</strong> olurken, ana cümle günümüze uzanan süreci anlatmak adına <strong>Yakın Geçmiş Zaman (Present Perfect / Have-Has V3)</strong> yapısında kurulur.`;
        wrongExample = `Seçtiğiniz "${chosenWord || 'kelime'}" bu uyuma uymaz ❌`;
        correctExample = `Doğru Çekim: "${correctWord}" ✔️`;
      } else if (lessonNum === 76) {
        title = 'While / As Eş Zamanlılık Kuralı';
        ruleTitle = '💡 Eş Zamanlı veya Karşılaştırmalı Eylemler';
        ruleText = `<strong>While / As</strong> bağlaçları, iki eylemin geçmişte aynı anda devam ettiğini (was/were V-ing) ya da iki farklı durumu/özneyi karşılaştırdığını ifade etmek için kullanılır.`;
        wrongExample = `Seçtiğiniz "${chosenWord || 'kelime'}" eylemin sürekliliğine/anlamına uymaz ❌`;
        correctExample = `Doğru Çekim: "${correctWord}" ✔️`;
      } else if (lessonNum === 77) {
        title = 'Until Süreç Sınırı Kuralı';
        ruleTitle = '💡 Belirli Bir Noktaya Kadar Süren Eylemler';
        ruleText = `<strong>Until</strong> bağlacı, bir durum veya eylemin başka bir sınır eylemine veya zaman anına kadar kesintisiz devam ettiğini anlatır. Until cümlelerinin içinde will/would kullanılmaz, geniş veya geçmiş zaman çekimi yapılır.`;
        wrongExample = `Seçtiğiniz "${chosenWord || 'kelime'}" bağlamsal süre sınırına uymaz ❌`;
        correctExample = `Doğru Çekim: "${correctWord}" ✔️`;
      } else if (lessonNum === 92) {
        title = 'Impersonal It & That Modeli (Model 1)';
        ruleTitle = '💡 It + to be/modal + Sıfat/Past Participle + That';
        ruleText = `Bu yapı (Impersonal Construction), nesnel bir gerçeği, kanaati veya genel bir durumu vurgulamak için kullanılır. <strong>that</strong> bağlacından sonra tam bir cümle ($S + V + O$) gelmelidir.`;
        wrongExample = `Seçtiğiniz "${chosenWord || 'kelime'}" bu kişisiz modele uymaz ❌`;
        correctExample = `Doğru Çekim: "${correctWord}" ✔️`;
      } else if (lessonNum === 93) {
        title = 'Impersonal It & to V1 & That Modeli (Model 2)';
        ruleTitle = '💡 It + to be/modal + Sıfat/Past Participle + to V1 + That';
        ruleText = `Bu yapı, bir durumun veya eylemin zorluk, kolaylık veya önem derecesini bir mastar (<strong>to V1</strong>) eylemi aracılığıyla <strong>that</strong> cümleciğine bağlar.`;
        wrongExample = `Seçtiğiniz "${chosenWord || 'kelime'}" bu mastarlı modele uymaz ❌`;
        correctExample = `Doğru Çekim: "${correctWord}" ✔️`;
      } else if (lessonNum === 95) {
        title = 'Present Continuous ve Zaman Zarfları';
        ruleTitle = '💡 Şimdiki Zaman & Süreç Kuralları';
        ruleText = `Şu anda devam etmekte olan süreçleri anlatan bu cümlede zaman zarfı (<strong>at the moment, right now, currently, presently, at present, these days</strong>) kullanılmıştır. Bu zarflar eylemin şimdiki zamanda (<strong>am/is/are + V-ing</strong>) çekimlenmesini zorunlu kılar.`;
        wrongExample = `Seçtiğiniz "${chosenWord || 'kelime'}" süreç anlamı taşımaz ❌`;
        correctExample = `Doğru Çekim: "${correctWord}" ✔️`;
      } else if (lessonNum === 96) {
        title = 'Past Simple ve Net Geçmiş Zaman';
        ruleTitle = '💡 Geçmiş Zaman Çekim Kuralları';
        ruleText = `Geçmişte belirli bir noktada tamamlanmış eylemleri bildiren bu cümlede net bir geçmiş zaman zarfı (<strong>yesterday, ago, last week, in 2020</strong>) bulunmaktadır. Bu durum, fiilin 2. halinin (<strong>V2 / -ed</strong>) kullanılmasını gerektirir.`;
        wrongExample = `Seçtiğiniz "${chosenWord || 'kelime'}" geçmiş zamanı nitelemez ❌`;
        correctExample = `Geçmiş Zaman (V2): "${correctWord}" ✔️`;
      } else if (lessonNum === 97) {
        title = 'Present Perfect ve Süreç Zarfları';
        ruleTitle = '💡 Present Perfect Çekim Kuralları';
        ruleText = `Geçmişte başlayıp etkisi günümüze uzanan veya henüz tamamlanmış durumları ifade eden bu cümlede <strong>so far, recently, since, yet, already, up to now</strong> gibi zarflar yer almaktadır. Bu zarflar <strong>have/has + V3</strong> yapısıyla çekimlenir.`;
        wrongExample = `Seçtiğiniz "${chosenWord || 'kelime'}" süreç çekimine uygun değil ❌`;
        correctExample = `Doğru Çekim: "${correctWord}" (have/has + V3) ✔️`;
      } else if (lessonNum === 98) {
        title = 'Since Zaman Uyumu Kuralları';
        ruleTitle = '💡 Since Bağlacı ve Zaman Uyumu';
        ruleText = `<strong>Since</strong> bağlacının bağlı olduğu yan cümle eylemin başlangıç noktasını bildirdiği için <strong>Past Simple (V2)</strong> ile çekimlenirken, ana cümle bu başlangıçtan günümüze kadar geçen süreci anlattığı için <strong>Present Perfect (have/has + V3)</strong> ile kurulur. (Formül: <strong>Present Perfect + since + Past Simple</strong>)`;
        wrongExample = `Seçtiğiniz "${chosenWord || 'kelime'}" zaman uyumu kuralını ihlal etmektedir ❌`;
        correctExample = `Doğru Çekim: "${correctWord}" ✔️`;
      } else if (lessonNum === 99) {
        title = 'By the time Zaman Uyumu';
        ruleTitle = '💡 By the time ve Eylem Sınır Kuralları';
        ruleText = `<strong>By the time</strong> konnektörü eylemlerin zaman sınırını belirler ve şu kurallara uyar:<br>1. Geçmiş bağlamda: <strong>By the time + Past (V2), Past Perfect (had + V3)</strong> (Sınır noktasına kadar eylemin çoktan tamamlandığını belirtir).<br>2. Gelecek bağlamda: <strong>By the time + Present (V1/V5), Future Perfect (will have + V3)</strong>.<br>Cümledeki diğer fiilin zamanı doğrultusunda uygun eşleşmeyi seçmelisiniz.`;
        wrongExample = `Seçtiğiniz "${chosenWord || 'kelime'}" uyum kuralını bozmaktadır ❌`;
        correctExample = `Doğru Çekim: "${correctWord}" ✔️`;
      } else if (lessonNum === 100) {
        title = 'It is (high) time Yapısı';
        ruleTitle = '💡 It is high time Çekim Kuralları';
        ruleText = `<strong>It is time / It is high time / It is about time</strong> kalıbı kendisinden sonra bir özne (subject) aldığında fiil mutlaka <strong>Past Simple (V2)</strong> olarak çekimlenir. Anlam olarak şimdiki veya gelecek zamana yönelik bir gecikmişliği veya zorunluluğu ifade etse de, dil bilgisel yapı olarak geçmiş zaman çekimi (V2) zorunludur.`;
        wrongExample = `Seçtiğiniz "${chosenWord || 'kelime'}" bu kalıpla kullanılamaz ❌`;
        correctExample = `Geçmiş Zaman (V2): "${correctWord}" ✔️`;
      } else if (lessonNum === 101) {
        title = 'Süperlatif & Kısıtlayıcı Sıfatlar ve Deneyim';
        ruleTitle = '💡 Sıfat Dereceleri ve Present Perfect';
        ruleText = `Bir durumun en uç derecesini (<strong>the best, the worst, the first, the only vb.</strong>) niteleyen ifadelerden sonra gelen relative clause cümleleri, hayat boyu edinilen birikim ve tecrübeleri sorguladığı için <strong>Present Perfect (have/has + V3)</strong> yapısıyla çekimlenir.`;
        wrongExample = `Seçtiğiniz "${chosenWord || 'kelime'}" tecrübe bağlamına uymuyor ❌`;
        correctExample = `Doğru Çekim: "${correctWord}" (have/has + V3) ✔️`;
      } else if (lessonNum === 102) {
        title = 'used to + V1 (Geçmiş Alışkanlıklar)';
        ruleTitle = '💡 Geçmiş Alışkanlıklar ve Eski Durumlar';
        ruleText = `<strong>used to + V1</strong> yapısı, geçmişte düzenli olarak yapılmış ancak günümüzde artık yapılmayan eylemleri veya eski durumları (states) ifade eder. Bu kalıptan sonra gelen fiil her zaman **yalın haldedir (V1)**.`;
        wrongExample = `Seçtiğiniz "${chosenWord || 'kelime'}" used to kuralına uygun değildir ❌`;
        correctExample = `Doğru Çekim: "${correctWord}" (V1 yalın çekimi) ✔️`;
      } else if (lessonNum === 103) {
        title = 'would + V1 (Geçmiş Rutin Eylemler)';
        ruleTitle = '💡 Geçmiş Rutin Eylemler ve Aktivite Döngüleri';
        ruleText = `<strong>would + V1</strong> yapısı, geçmişte düzenli olarak tekrarlanan rutin eylemleri ifade eder. Bu kalıp durum bildiren fiillerle (örn: be, have, like) kullanılmaz, sadece eylem (hareket) fiilleriyle kullanılır.`;
        wrongExample = `Seçtiğiniz "${chosenWord || 'kelime'}" would kuralına uygun değildir ❌`;
        correctExample = `Doğru Çekim: "${correctWord}" (V1 yalın eylem çekimi) ✔️`;
      } else if (lessonNum === 104) {
        title = 'be/get used to + V-ing (Alışkanlık Durumu)';
        ruleTitle = '💡 Alışkanlık Bildiren Yapı Kuralları';
        ruleText = `<strong>be used to</strong> veya <strong>get used to</strong> kalıpları bir şeye <strong>"alışkın olmak"</strong> veya <strong>"alışmak"</strong> anlamı taşır. Bu kalıplar arkasından gelen fiili yalın değil, mutlaka isim-fiil (Gerund / <strong>V-ing</strong>) veya doğrudan isim olarak alır. (Formül: <strong>be/get used to + Noun / V-ing</strong>)`;
        wrongExample = `Seçtiğiniz "${chosenWord || 'kelime'}" gerund (V-ing) veya be used to kuralına uygun değildir ❌`;
        correctExample = `Doğru Çekim: "${correctWord}" (V-ing çekimi) ✔️`;
      }

      if (!ruleText) {
        // will/would error check
        if (chosenWord.includes('will') || chosenWord.includes('would')) {
          title = 'Zaman Uyumsuzluğu (will/would Kullanımı)';
          ruleTitle = '💡 Zaman Zarfı Cümleciklerinde Gelecek Zaman';
          ruleText = `İngilizcede zaman zarfı cümlelerinin (Time Clauses) kendi içerisinde gelecek zaman yardımcı fiili (<strong>will / would</strong>) kullanılmaz. Gelecek kastedilse bile <strong>Present Simple (Geniş Zaman)</strong> tercih edilir.`;
          wrongExample = `when/before/since it will ... ❌`;
          correctExample = `when/before/since it ${correctWord} ✔️`;
        } 
        // gerund/participle error check
        else if (chosenWord.endsWith('ing') && !correctWord.endsWith('ing')) {
          title = 'Çekimsiz Fiil (Gerund/Participle) Kullanımı';
          ruleTitle = '💡 Çekimli Fiil (Finite Verb) Gereksinimi';
          ruleText = `Zaman bağlaçlarından sonra doğrudan bir özne geliyorsa, arkasından gelen fiilin çekimli (finite) yüklem olması şarttır. Tek başına kullanılan <strong>"-ing"</strong> takılı fiiller yüklem oluşturamaz.`;
          wrongExample = `when it ${chosenWord} ❌`;
          correctExample = `when it ${correctWord} ✔️`;
        } 
        // subject-verb agreement check
        else if (chosenWord && correctWord && (chosenWord.endsWith('s') !== correctWord.endsWith('s')) && !correctWord.endsWith('ss') && !chosenWord.endsWith('ss')) {
          title = 'Özne-Yüklem Uyuşmazlığı (Subject-Verb Agreement)';
          ruleTitle = '💡 Özne-Fiil Tekillik/Çoğulluk Uyum Kuralları';
          ruleText = `Geniş zamanda (Present Simple), <strong>"he, she, it"</strong> tekil öznelerinden sonra gelen fiillere <strong>"-s"</strong> takısı eklenirken, <strong>"I, you, we, they"</strong> çoğul öznelerinde fiil yalın kalır.`;
          wrongExample = `Özne ile yüklem uyumsuz çekimlendi ❌`;
          correctExample = `Doğru Çekim: "${correctWord}" ✔️`;
        }
        // past simple mismatch
        else if (correctWord.endsWith('ed') && !chosenWord.endsWith('ed')) {
          title = 'Geçmiş Zaman (Past Simple) Uyumsuzluğu';
          ruleTitle = '💡 Zaman Uyumu (Past Tense)';
          ruleText = `Bu cümlede geçmişte gerçekleşen bir eylem veya durum anlatılmaktadır. Bu yüzden fiilin 2. hali (<strong>V2 / -ed takısı</strong>) kullanılmalıdır.`;
          wrongExample = `Şimdiki/Geniş Zaman çekimi ❌`;
          correctExample = `Geçmiş Zaman: "${correctWord}" ✔️`;
        }
      }

      // Smart suffix-based fallback if still no specific explanation matched
      if (!ruleText) {
        const getWordTypeTr = (w) => {
          w = w.toLowerCase().trim();
          if (w.endsWith('ly')) return 'Zarf (Adverb)';
          if (w.endsWith('tion') || w.endsWith('tions') || w.endsWith('ness') || w.endsWith('ity') || w.endsWith('ment') || w.endsWith('ance') || w.endsWith('ence') || w.endsWith('cy')) return 'İsim (Noun)';
          if (w.endsWith('ive') || w.endsWith('al') || w.endsWith('ous') || w.endsWith('ent') || w.endsWith('ant') || w.endsWith('ful') || w.endsWith('less') || w.endsWith('able') || w.endsWith('ible')) return 'Sıfat (Adjective)';
          if (w.endsWith('ing')) return 'Fiilimsi (Gerund/Participle)';
          if (w.endsWith('ed') || w.endsWith('es') || w.endsWith('s') || ['run', 'vary', 'change', 'evolve', 'expand', 'fail', 'decay', 'override', 'clone', 'divide', 'assume', 'interpret', 'achieve', 'demonstrate', 'ensure', 'confirm', 'perceive', 'redefine', 'specify', 'enforce', 'clarify', 'imply', 'observe', 'report'].includes(w)) return 'Fiil (Verb)';
          return 'Kelime / İfade';
        };

        const correctType = getWordTypeTr(correctWord);
        const chosenType = getWordTypeTr(chosenWord);

        if (correctType !== chosenType && chosenType !== 'Kelime / İfade' && correctType !== 'Kelime / İfade') {
          title = 'Kelime Türü Uyuşmazlığı (Parts of Speech)';
          ruleTitle = '💡 Doğru Kelime Türünün Seçilmesi';
          ruleText = `Cümledeki boşluğun yapısal konumu (örneğin sıfat niteleyicisi, özne konumu veya yüklem konumu olması) bir <strong>${correctType}</strong> gerektirmektedir. Seçtiğiniz <strong>${chosenWord}</strong> ise bir <strong>${chosenType}</strong> olduğu için dil bilgisi kurallarına uymamaktadır.`;
          wrongExample = `Seçilen: "${chosenWord}" (${chosenType}) ❌`;
          correctExample = `Doğru Tür: "${correctWord}" (${correctType}) ✔️`;
        } else {
          // Check if they share the same word root (word formation/morphology question)
          const shareRoot = correctWord.length > 3 && chosenWord.length > 3 && correctWord.substring(0, 3) === chosenWord.substring(0, 3);
          if (shareRoot) {
            title = 'Kelime Türetimi (Word Formation)';
            ruleTitle = '💡 Doğru Suffix / Takı Kullanımı';
            ruleText = `Bu cümle, aynı kökten türeyen kelimelerin (Word Formation) ayırt edilmesini gerektirmektedir. Cümledeki yapısal rolü gereği doğru sözcük formu <strong>${correctWord}</strong> (${correctType}) olmalıdır.`;
            wrongExample = `Seçilen Form: "${chosenWord}" ❌`;
            correctExample = `Doğru Form: "${correctWord}" ✔️`;
          } else {
            title = 'Bağlamsal veya Dilbilgisel Hata';
            ruleTitle = '💡 Cümle Yapısı ve Kelime Anlamı';
            ruleText = `Seçtiğiniz kelime cümle yapısına veya cümlenin akademik anlamına uymamaktadır. Boşluğa gelecek en uygun sözcük <strong>${correctWord}</strong> olmalıdır.`;
            wrongExample = `Seçilen: "${chosenWord || '(boş)'}" ❌`;
            correctExample = `Doğru Kelime: "${correctWord}" ✔️`;
          }
        }
      }
    }
  }

  return `
    <div class="grammar-explain-title">${title}</div>
    <p class="grammar-explain-text">${text}</p>
    <div class="grammar-rule-box">
      <span class="grammar-rule-title">${ruleTitle}</span>
      <span>${ruleText}</span>
      ${wrongExample && correctExample ? `
      <div class="grammar-example-comparison">
        <span class="grammar-example-wrong">${wrongExample}</span>
        <span class="grammar-example-correct">${correctExample}</span>
      </div>
      ` : ''}
    </div>
    ${question.translation ? `
    <div style="margin-top: 12px; padding: 12px 16px; background: rgba(16, 185, 129, 0.06); border: 1px solid rgba(16, 185, 129, 0.16); border-radius: var(--radius-md); font-size: 0.9rem;">
      <span style="font-weight: 700; color: var(--color-correct); display: block; margin-bottom: 4px;">💬 Cümle Çevirisi:</span>
      <span style="color: var(--text-primary); font-style: italic;">"${question.translation}"</span>
    </div>
    ` : ''}
  `;
}

// DOM yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', init);