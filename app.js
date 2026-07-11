// ============================================================
// STATE YÖNETİMİ
// ============================================================
const STATE_KEY = 'amok_state_v1';
const USERS_KEY = 'amok_users_v1';
const HEARTS_REFILL_COST = 50;
const XP_PER_CORRECT = 10;
const MAX_HEARTS = 5;

// ============================================================
// SUPABASE YAPILANDIRMASI
// ============================================================
// Vercel deployment'ında ortak veritabanını kullanmak için aşağıdaki alanları doldurabilir
// veya Admin Panelinden kaydedebilirsiniz. Admin panelinden kaydedilenler yerelde saklanır.
const SUPABASE_URL = ""; 
const SUPABASE_ANON_KEY = ""; 

const getSupabaseConfig = () => {
  const url = SUPABASE_URL || localStorage.getItem('amok_supabase_url') || '';
  const key = SUPABASE_ANON_KEY || localStorage.getItem('amok_supabase_anon_key') || '';
  return { url, key };
};

let supabaseClient = null;
const supabaseConfig = getSupabaseConfig();
if (typeof supabase !== 'undefined' && supabaseConfig.url && supabaseConfig.key) {
  try {
    supabaseClient = supabase.createClient(supabaseConfig.url, supabaseConfig.key);
  } catch (e) {
    console.error('Supabase initialization failed:', e);
  }
}

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
  lastPromptedWrongCount: 0,
  totalQuestionsAnswered: 0,
  lastPromptedQuestionCount: 0,
  activeDomain: 'history',
  negationOn: false,
  modalSelectLevel12: 'could',
  activePassiveMode: 'passive',
  selectedSubjectIndex: 0,
  selectedVerbIndex: 0,
  selectedShieldId: 'likely',
  conditionalType: 'none'
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
let reviewSessionCorrectIds = [];
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

function highlightGrammarPatterns(text) {
  if (!text) return '';
  let res = text;
  
  // 1. Zarf + past participle + isim
  res = res.replace(/\b(strictly|highly|well|quite|extremely)\s+([a-zA-Z]+ed)\s+([a-zA-Z]+s?)\b/gi, 
    '<span class="gpattern-adv-ed-noun">$1 $2 $3</span>');
    
  // 2. Zamir + of the + isim
  res = res.replace(/\b(both|each|all|some|any|many|few|several|none|one|most|those|these|which)\s+of\s+the\s+([a-zA-Z]+s?)\b/gi,
    '<span class="gpattern-pron-of-the-noun">$1 of the $2</span>');

  // 3. İsim + of the + isim
  res = res.replace(/\b(?!(?:both|each|all|some|any|many|few|several|none|one|most|those|these|which)\b)([a-zA-Z]+s?)\s+of\s+the\s+([a-zA-Z]+s?)\b/gi,
    '<span class="gpattern-noun-of-the-noun">$1 of the $2</span>');

  // 4. İsim + of + isim
  res = res.replace(/\b(?!(?:both|each|all|some|any|many|few|several|none|one|most|those|these|which)\b)([a-zA-Z]+s?)\s+of\s+(?!(?:the)\b)([a-zA-Z]+s?)\b/gi,
    '<span class="gpattern-noun-of-noun">$1 of $2</span>');

  // 5. İsim + from + isim
  res = res.replace(/\b([a-zA-Z]+s?)\s+from\s+([a-zA-Z]+s?)\b/gi,
    '<span class="gpattern-noun-from-noun">$1 from $2</span>');

  // 6. .........ed + isim
  res = res.replace(/\b([a-zA-Z]+ed)\s+([a-zA-Z]+s?)\b/gi, (match, p1, p2) => {
    if (p1.toLowerCase() === 'enforced' && p2.toLowerCase() === 'as') return match;
    return `<span class="gpattern-ed-noun">${p1} ${p2}</span>`;
  });

  // 7. .........ing + isim
  res = res.replace(/\b([a-zA-Z]+ing)\s+(?!(?:is|are|was|were|been|am|be|to|of|in|on|at|for|with|by|from|about)\b)([a-zA-Z]+s?)\b/gi,
    '<span class="gpattern-ing-noun">$1 $2</span>');

  // 8. Edattan sonra gelen fiil (+ nesnesi)
  res = res.replace(/\b(before|after|by|in|on|at|for|with|about|without)\s+([a-zA-Z]+ing)\b/gi,
    '<span class="gpattern-prep-ing">$1 $2</span>');

  // 9. İsim + isim (Common compounds)
  res = res.replace(/\b(budget allocation|server failure|project proposal|marketing director|team members|software architecture|database logs|staging server|network latency|app installation|river delta|delta infrastructure|flooding anomalies|monetary variables|inflation crisis|cinema history|film directors|sound tech|validation criteria|wealth fund|investment parameters|literary movement|philosophical variables|historical infrastructure)\b/gi,
    '<span class="gpattern-noun-noun">$1</span>');

  return res;
}

// Convert English text into hoverable HTML elements
function makeTextHoverable(text, isOption = false) {
  if (!text) return '';
  
  // Highlight abstract grammar patterns in question prompts/sentences (not options)
  if (!isOption) {
    text = highlightGrammarPatterns(text);
  }

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
      
      // Highlight "to be" verbs in red for Unit 1, but NOT for options/answers
      let isToBe = false;
      if (!isOption && currentLesson && currentLesson.unitId === 1) {
        const lowerWord = word.toLowerCase();
        if (['am', 'is', 'are', 'was', 'were', 'be', 'been', 'being'].includes(lowerWord)) {
          isToBe = true;
        }
      }
      const className = isToBe ? 'hoverable-word to-be-highlight' : 'hoverable-word';

      if (meaning) {
        // Escape double quotes inside attribute
        const escapedMeaning = meaning.replace(/"/g, '&quot;');
        html += `<span class="${className}" data-meaning="${escapedMeaning}">${word}</span>`;
      } else {
        html += `<span class="${className} no-meaning">${word}</span>`;
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
         window.location.protocol === 'file:';
}

function saveState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
  if (supabaseClient && state.username && !state.isGuest) {
    supabaseClient
      .from('user_states')
      .upsert({
        username: state.username,
        xp: state.xp || 0,
        streak: state.streak || 0,
        hearts: state.hearts || 0,
        completed_lessons: state.completedLessons || [],
        avatar_color: state.avatarColor || '#E88A9A'
      })
      .then(({ error }) => {
        if (error) console.error('Supabase state sync error:', error);
      });
  }
}

function sendTelegramNotification(message) {
  const token = localStorage.getItem('amok_telegram_token') || '';
  const chatId = localStorage.getItem('amok_telegram_chat_id') || '';
  if (!token || !chatId) return;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown'
    })
  }).catch(err => console.error('Telegram notification failed:', err));
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
  if (!state.activeDomain) {
    state.activeDomain = 'history';
  }
  if (state.negationOn === undefined || state.negationOn === null) state.negationOn = false;
  if (state.modalSelectLevel12 === undefined || state.modalSelectLevel12 === null) state.modalSelectLevel12 = 'could';
  if (state.activePassiveMode === undefined || state.activePassiveMode === null) state.activePassiveMode = 'passive';
  if (state.selectedSubjectIndex === undefined || state.selectedSubjectIndex === null || isNaN(parseInt(state.selectedSubjectIndex, 10))) {
    state.selectedSubjectIndex = 0;
  } else {
    state.selectedSubjectIndex = parseInt(state.selectedSubjectIndex, 10);
  }
  if (state.selectedVerbIndex === undefined || state.selectedVerbIndex === null || isNaN(parseInt(state.selectedVerbIndex, 10))) {
    state.selectedVerbIndex = 0;
  } else {
    state.selectedVerbIndex = parseInt(state.selectedVerbIndex, 10);
  }
  if (!state.selectedShieldId) {
    state.selectedShieldId = 'likely';
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

function isQuestionNew(q, parentObj = null) {
  if (!q) return false;
  const thirtySixHoursMs = 36 * 60 * 60 * 1000;
  const now = Date.now();

  const isRecent = (dateStr) => {
    if (!dateStr) return false;
    const parsed = Date.parse(dateStr);
    if (isNaN(parsed)) return false;
    const diff = now - parsed;
    return diff <= thirtySixHoursMs && diff >= -600000;
  };

  if (q.createdAt && isRecent(q.createdAt)) return true;
  if (parentObj && parentObj.createdAt && isRecent(parentObj.createdAt)) return true;
  return false;
}

function openQuestionPreview(title, questions, parentObj = null) {
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
    const isNew = isQuestionNew(q, parentObj);
    let typeLabel = "Soru";
    let typeClass = "";
    let detailsHtml = "";

    switch (q.type) {
      case 'multiple-choice':
      case 'error-spotting':
      case 'context-clue':
      case 'chain-expansion-differential':
      case 'structural-deconstruction':
      case 'vector-velocity-shift':
      case 'titan-boundary-defense':
      case 'vagon-to-suffix-match':
      case 'reverse-engineering-translation':
      case 'suffix-decapitation':
        typeLabel = q.isEngToTr ? "Çoktan Seçmeli (Eng -> Tr)" : "Çoktan Seçmeli (Tr -> Eng)";
        typeClass = "qp-type-mc";
        const opts = q.options.map((opt, oIdx) => {
          const isCorrect = oIdx === q.correctIndex;
          return `<span class="qp-option-item ${isCorrect ? 'correct' : ''}">${opt} ${isCorrect ? '✓' : ''}</span>`;
        }).join('');
        if (q.type === 'suffix-decapitation') {
          if (q.sentence_before) {
            detailsHtml = `
              <div class="qp-detail-row">
                <span class="qp-detail-label">Önceki Cümle:</span>
                <span class="qp-detail-val">"${q.sentence_before || ''}"</span>
              </div>
              <div class="qp-detail-row">
                <span class="qp-detail-label">Sonraki Cümle:</span>
                <span class="qp-detail-val">"${q.sentence_after || ''}"</span>
              </div>
              <div class="qp-detail-row">
                <span class="qp-detail-label">Seçenekler:</span>
                <div class="qp-options-list">${opts}</div>
              </div>
            `;
          } else {
            detailsHtml = `
              <div class="qp-detail-row">
                <span class="qp-detail-label">Cümle:</span>
                <span class="qp-detail-val">"${q.sentence || ''}"</span>
              </div>
              <div class="qp-detail-row">
                <span class="qp-detail-label">Seçenekler:</span>
                <div class="qp-options-list">${opts}</div>
              </div>
            `;
          }
        } else {
          detailsHtml = `
            <div class="qp-detail-row">
              <span class="qp-detail-label">Seçenekler:</span>
              <div class="qp-options-list">${opts}</div>
            </div>
          `;
        }
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

      case 'vector-assembly':
        typeLabel = "Öğe Sıralama (vector-assembly)";
        typeClass = "qp-type-wb";
        const vectorScrambled = q.scrambled_elements.map(w => `<span class="qp-option-item">${w}</span>`).join('');
        const vectorCorrect = q.correct_sequence.join(' ');
        detailsHtml = `
          <div class="qp-detail-row">
            <span class="qp-detail-label">Cümle:</span>
            <span class="qp-detail-val">"${q.sentence}"</span>
          </div>
          <div class="qp-detail-row">
            <span class="qp-detail-label">Öğeler:</span>
            <div class="qp-options-list">${vectorScrambled}</div>
          </div>
          <div class="qp-detail-row">
            <span class="qp-detail-label">Doğru Sıralama:</span>
            <span class="qp-detail-val qp-correct">"${vectorCorrect}"</span>
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
            <span class="qp-detail-val qp-correct">${q.correct || q.correctAnswer}</span>
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
          ${isNew ? '<span class="qp-new-badge" style="background: #ff3b30; color: #fff; font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-left: 6px; display: inline-block; vertical-align: middle; line-height: 1.2;">YENİ</span>' : ''}
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
      let loggedIn = false;
      let dbStateData = null;

      if (supabaseClient) {
        // Supabase'den kullanıcıyı sorgula
        const { data: dbUser, error: dbUserError } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('username', username)
          .maybeSingle();

        if (dbUserError) {
          console.error('Supabase query error:', dbUserError);
        }

        if (dbUser) {
          const hashedInput = await hashPassword(password);
          if (dbUser.password_hash !== hashedInput) {
            showToast('Şifre yanlış!', 'error');
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            return;
          }
          // Çevrimiçi aktiflik zamanını güncelle
          await supabaseClient
            .from('profiles')
            .update({ last_seen_at: new Date().toISOString() })
            .eq('username', username);

          // Durumu Supabase'den çek
          const { data: dbState, error: dbStateError } = await supabaseClient
            .from('user_states')
            .select('*')
            .eq('username', username)
            .maybeSingle();

          if (dbState) {
            dbStateData = {
              xp: dbState.xp,
              streak: dbState.streak,
              hearts: dbState.hearts,
              completedLessons: dbState.completed_lessons || [],
              avatarColor: dbState.avatar_color
            };
          }
          loggedIn = true;
        }
      }

      // Supabase'de bulunamadı veya Supabase kapalıysa, localStorage'a bak
      if (!loggedIn) {
        const users = getUsers();
        if (!users[username]) {
          showToast('Kullanıcı bulunamadı!', 'error');
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          return;
        }
        const hashedInput = await hashPassword(password);
        if (users[username].password !== hashedInput) {
          showToast('Şifre yanlış!', 'error');
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          return;
        }
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

      // Supabase'den çekilen bir durum varsa onu ezerek güncelle
      if (dbStateData) {
        state = { ...state, ...dbStateData };
      }

      state.username = username;
      state.isGuest = false;
      saveState();
      try {
        sendTelegramNotification(`🔑 *Giriş Yapıldı!*\n👤 *Kullanıcı:* ${username}\n🔥 *Seri:* ${state.streak || 0} Gün\n🏆 *XP:* ${state.xp || 0}`);
      } catch (e) {}
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
      if (supabaseClient) {
        // Supabase'de var mı diye kontrol et
        const { data: dbUser, error: checkError } = await supabaseClient
          .from('profiles')
          .select('username')
          .eq('username', username)
          .maybeSingle();

        if (checkError) {
          console.error('Supabase checking error:', checkError);
        }

        if (dbUser) {
          showToast('Bu kullanıcı adı zaten alınmış!', 'error');
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          return;
        }

        const hashed = await hashPassword(password);
        const { error: insertError } = await supabaseClient
          .from('profiles')
          .insert({
            username: username,
            email: email || null,
            password_hash: hashed
          });

        if (insertError) {
          console.error('Supabase registration error:', insertError);
          showToast('Kayıt oluşturulurken bir hata oluştu!', 'error');
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          return;
        }
      } else {
        const users = getUsers();
        if (users[username]) {
          showToast('Bu kullanıcı adı zaten alınmış!', 'error');
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          return;
        }
        await saveUser(username, password);
      }
      
      const initialAvatarColors = ['#E88A9A', '#B4A7D6', '#8BC6A0', '#E8CB6E', '#8B7EC8', '#7EC8C8'];
      const randomColor = initialAvatarColors[Math.floor(Math.random() * initialAvatarColors.length)];

      state = {
        ...state,
        username,
        email,
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
      try {
        sendTelegramNotification(`🚀 *Yeni Üyelik!*\n👤 *Kullanıcı Adı:* ${username}\n📧 *E-posta:* ${email || 'Belirtilmedi'}`);
      } catch (e) {}
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
  const handleSocialLogin = (platform) => {
    const platformKey = `amok_social_${platform.toLowerCase()}`;
    const savedAccountStr = localStorage.getItem(platformKey);

    const showRegistrationForm = () => {
      const modal = document.createElement('div');
      modal.className = 'custom-modal-overlay';
      modal.id = 'social-login-modal';
      
      modal.innerHTML = `
        <div class="custom-modal" style="animation: popoverFadeIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
          <div class="custom-modal-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; margin-bottom: 20px;">
            <h3 style="font-family: var(--font-heading); font-size: 1.2rem; margin: 0; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.3rem;">🔐</span> ${platform} ile Kayıt Ol
            </h3>
            <button class="modal-close-btn" id="btn-close-social-modal" style="background: transparent; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer; padding: 0; line-height: 1;">&times;</button>
          </div>
          <div class="custom-modal-body" style="display: flex; flex-direction: column; gap: 16px;">
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">
              Giriş işlemini tamamlamak için lütfen aşağıdaki bilgileri doldurun:
            </p>
            <div class="form-group" style="display: flex; flex-direction: column; gap: 6px;">
              <label for="social-fullname" style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);">Adınız ve Soyadınız</label>
              <input type="text" id="social-fullname" class="report-select" placeholder="Örn: Ahmet Yılmaz" style="width: 100%; padding: 10px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-primary); font-family: var(--font-body); font-size: 0.9rem; box-sizing: border-box; outline: none; transition: border-color var(--transition-fast);" required>
            </div>
            <div class="form-group" style="display: flex; flex-direction: column; gap: 6px;">
              <label for="social-email" style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);">E-posta Adresiniz</label>
              <input type="email" id="social-email" class="report-select" placeholder="Örn: ahmet@example.com" style="width: 100%; padding: 10px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-primary); font-family: var(--font-body); font-size: 0.9rem; box-sizing: border-box; outline: none; transition: border-color var(--transition-fast);" required>
            </div>
          </div>
          <div class="custom-modal-footer" style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 16px;">
            <button class="btn btn-secondary" id="btn-cancel-social" style="padding: 10px 16px; border-radius: var(--radius-md); font-weight: 700; cursor: pointer; transition: all var(--transition-fast);">İptal</button>
            <button class="btn btn-primary" id="btn-submit-social" style="padding: 10px 20px; border-radius: var(--radius-md); font-weight: 700; cursor: pointer; transition: all var(--transition-fast); background: var(--accent-primary);">Devam Et</button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      document.getElementById('btn-close-social-modal').addEventListener('click', () => modal.remove());
      document.getElementById('btn-cancel-social').addEventListener('click', () => modal.remove());
      
      document.getElementById('btn-submit-social').addEventListener('click', () => {
        const fullName = document.getElementById('social-fullname').value.trim();
        const email = document.getElementById('social-email').value.trim();
        
        if (!fullName || fullName.indexOf(' ') === -1) {
          showToast('Lütfen adınızı ve soyadınızı aralarında boşluk bırakarak yazın!', 'error');
          return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          showToast('Lütfen geçerli bir e-posta adresi girin!', 'error');
          return;
        }

        modal.remove();
        proceedWithLogin(fullName, email);
      });
    };

    const proceedWithLogin = (fullName, email) => {
      showToast(`${platform} ile giriş yapılıyor...`, 'success');
      
      setTimeout(() => {
        // Kullanıcının state'ini yükle
        const userState = localStorage.getItem(`amok_state_${fullName}`);
        if (userState) {
          try {
            state = { ...state, ...JSON.parse(userState) };
          } catch (e) {
            console.error('Kullanıcı state yükleme hatası:', e);
          }
        }

        // Bilgileri güncelle
        const initialAvatarColors = ['#E88A9A', '#B4A7D6', '#8BC6A0', '#E8CB6E', '#8B7EC8', '#7EC8C8'];
        const randomColor = initialAvatarColors[Math.floor(Math.random() * initialAvatarColors.length)];

        state.username = fullName;
        state.email = email;
        state.isGuest = false;
        if (!state.avatarColor) {
          state.avatarColor = randomColor;
        }
        
        // Bu platform için hesabı kaydet
        localStorage.setItem(platformKey, JSON.stringify({ fullName, email }));
        
        saveState();
        try {
          sendTelegramNotification(`🌐 *Sosyal Giriş (${platform})!*\n👤 *Kullanıcı:* ${fullName}\n📧 *E-posta:* ${email || 'Belirtilmedi'}\n🔥 *Seri:* ${state.streak || 0} Gün\n🏆 *XP:* ${state.xp || 0}`);
        } catch (e) {}
        showToast(`Hoş geldin, ${fullName}! 🎉`, 'success');
        enterApp();
      }, 600);
    };

    if (savedAccountStr) {
      try {
        const savedAccount = JSON.parse(savedAccountStr);
        const modal = document.createElement('div');
        modal.className = 'custom-modal-overlay';
        modal.id = 'social-login-modal';
        
        modal.innerHTML = `
          <div class="custom-modal" style="animation: popoverFadeIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
            <div class="custom-modal-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; margin-bottom: 20px;">
              <h3 style="font-family: var(--font-heading); font-size: 1.2rem; margin: 0; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.3rem;">🔐</span> ${platform} ile Giriş Yap
              </h3>
              <button class="modal-close-btn" id="btn-close-social-modal" style="background: transparent; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer; padding: 0; line-height: 1;">&times;</button>
            </div>
            <div class="custom-modal-body" style="display: flex; flex-direction: column; gap: 16px;">
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">
                Daha önce bu cihazda giriş yaptığınız hesap bulundu:
              </p>
              <div style="padding: 14px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 4px; box-shadow: var(--shadow-sm);">
                <span style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">${escapeHtml(savedAccount.fullName)}</span>
                <span style="font-size: 0.85rem; color: var(--text-secondary);">✉️ ${escapeHtml(savedAccount.email)}</span>
              </div>
            </div>
            <div class="custom-modal-footer" style="display: flex; justify-content: space-between; gap: 12px; margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 16px;">
              <button class="btn btn-secondary" id="btn-another-account" style="padding: 10px 16px; border-radius: var(--radius-md); font-weight: 700; cursor: pointer; transition: all var(--transition-fast);">Farklı Hesap</button>
              <button class="btn btn-primary" id="btn-continue-social" style="padding: 10px 20px; border-radius: var(--radius-md); font-weight: 700; cursor: pointer; transition: all var(--transition-fast); background: var(--accent-primary);">Bu Hesapla Devam Et</button>
            </div>
          </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('btn-close-social-modal').addEventListener('click', () => modal.remove());
        document.getElementById('btn-another-account').addEventListener('click', () => {
          modal.remove();
          showRegistrationForm();
        });
        document.getElementById('btn-continue-social').addEventListener('click', () => {
          modal.remove();
          proceedWithLogin(savedAccount.fullName, savedAccount.email);
        });

      } catch (e) {
        console.error('Kayıtlı hesap okuma hatası:', e);
        showRegistrationForm();
      }
    } else {
      showRegistrationForm();
    }
  };

  document.getElementById('btn-google-login').addEventListener('click', () => {
    handleSocialLogin('Google');
  });

  document.getElementById('btn-facebook-login').addEventListener('click', () => {
    handleSocialLogin('Facebook');
  });

  document.getElementById('btn-apple-login').addEventListener('click', () => {
    handleSocialLogin('Apple');
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
  if (['gold', 'canva', 'mint', 'sakura', 'sunset', 'kutup', 'siber', 'orman'].includes(state.activeTheme)) {
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

  const userMenuBtn = document.getElementById('btn-user-menu');
  if (userMenuBtn) {
    if (state.profilePhoto && state.profilePhoto.startsWith('avatar:')) {
      const emoji = state.profilePhoto.split(':')[1];
      userMenuBtn.innerHTML = `<span style="font-size: 1.2rem; display: flex; align-items: center; justify-content: center;">${emoji}</span>`;
      userMenuBtn.style.backgroundColor = state.avatarColor || 'var(--accent-primary)';
      userMenuBtn.style.display = 'flex';
      userMenuBtn.style.alignItems = 'center';
      userMenuBtn.style.justifyContent = 'center';
      userMenuBtn.style.borderRadius = '50%';
      userMenuBtn.style.width = '34px';
      userMenuBtn.style.height = '34px';
      userMenuBtn.style.padding = '0';
      userMenuBtn.style.border = 'none';
    } else if (state.profilePhoto) {
      userMenuBtn.innerHTML = `<img src="${state.profilePhoto}" style="width: 34px; height: 34px; border-radius: 50%; object-fit: cover; display: block;">`;
      userMenuBtn.style.backgroundColor = 'transparent';
      userMenuBtn.style.display = 'flex';
      userMenuBtn.style.alignItems = 'center';
      userMenuBtn.style.justifyContent = 'center';
      userMenuBtn.style.borderRadius = '50%';
      userMenuBtn.style.width = '34px';
      userMenuBtn.style.height = '34px';
      userMenuBtn.style.padding = '0';
      userMenuBtn.style.border = 'none';
    } else {
      const firstLetter = (state.username || 'K').charAt(0).toUpperCase();
      userMenuBtn.innerHTML = `<span style="font-size: 0.95rem; font-weight: bold; color: white; display: flex; align-items: center; justify-content: center;">${firstLetter}</span>`;
      userMenuBtn.style.backgroundColor = state.avatarColor || 'var(--accent-primary)';
      userMenuBtn.style.display = 'flex';
      userMenuBtn.style.alignItems = 'center';
      userMenuBtn.style.justifyContent = 'center';
      userMenuBtn.style.borderRadius = '50%';
      userMenuBtn.style.width = '34px';
      userMenuBtn.style.height = '34px';
      userMenuBtn.style.padding = '0';
      userMenuBtn.style.border = 'none';
    }
  }

  const profileTabIcon = document.getElementById('profile-tab-icon');
  if (profileTabIcon) {
    if (state.profilePhoto && state.profilePhoto.startsWith('avatar:')) {
      const emoji = state.profilePhoto.split(':')[1];
      profileTabIcon.innerHTML = `<span style="font-size: 1.1rem; display: flex; align-items: center; justify-content: center;">${emoji}</span>`;
      profileTabIcon.style.backgroundColor = state.avatarColor || 'var(--accent-primary)';
      profileTabIcon.style.display = 'inline-flex';
      profileTabIcon.style.alignItems = 'center';
      profileTabIcon.style.justifyContent = 'center';
      profileTabIcon.style.borderRadius = '50%';
      profileTabIcon.style.width = '30px';
      profileTabIcon.style.height = '30px';
      profileTabIcon.style.minWidth = '30px';
      profileTabIcon.style.minHeight = '30px';
    } else if (state.profilePhoto) {
      profileTabIcon.innerHTML = `<img src="${state.profilePhoto}" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover; display: block;">`;
      profileTabIcon.style.backgroundColor = 'transparent';
      profileTabIcon.style.display = 'inline-flex';
      profileTabIcon.style.alignItems = 'center';
      profileTabIcon.style.justifyContent = 'center';
      profileTabIcon.style.borderRadius = '50%';
      profileTabIcon.style.width = '30px';
      profileTabIcon.style.height = '30px';
      profileTabIcon.style.minWidth = '30px';
      profileTabIcon.style.minHeight = '30px';
    } else {
      const firstLetter = (state.username || 'K').charAt(0).toUpperCase();
      profileTabIcon.innerHTML = `<span style="font-size: 0.85rem; font-weight: bold; color: white; display: flex; align-items: center; justify-content: center;">${firstLetter}</span>`;
      profileTabIcon.style.backgroundColor = state.avatarColor || 'var(--accent-primary)';
      profileTabIcon.style.display = 'inline-flex';
      profileTabIcon.style.alignItems = 'center';
      profileTabIcon.style.justifyContent = 'center';
      profileTabIcon.style.borderRadius = '50%';
      profileTabIcon.style.width = '30px';
      profileTabIcon.style.height = '30px';
      profileTabIcon.style.minWidth = '30px';
      profileTabIcon.style.minHeight = '30px';
    }
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
  } else if (unitId === 34 || unitId === 38) {
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

function isLessonNew(lesson) {
  if (!lesson) return false;
  const thirtySixHoursMs = 36 * 60 * 60 * 1000;
  const now = Date.now();

  const isRecent = (dateStr) => {
    if (!dateStr) return false;
    const parsed = Date.parse(dateStr);
    if (isNaN(parsed)) return false;
    const diff = now - parsed;
    return diff <= thirtySixHoursMs && diff >= -600000;
  };

  if (lesson.createdAt && isRecent(lesson.createdAt)) {
    return true;
  }

  if (lesson.exercises && Array.isArray(lesson.exercises)) {
    for (const ex of lesson.exercises) {
      if (ex.createdAt && isRecent(ex.createdAt)) {
        return true;
      }
      if (ex.questions && Array.isArray(ex.questions)) {
        for (const q of ex.questions) {
          if (q.createdAt && isRecent(q.createdAt)) {
            return true;
          }
        }
      }
    }
  }

  if (lesson.questions && Array.isArray(lesson.questions)) {
    for (const q of lesson.questions) {
      if (q.createdAt && isRecent(q.createdAt)) {
        return true;
      }
    }
  }

  return false;
}

function renderUnitPathAndNodes(pContainer, unitId) {
  if (pContainer.dataset.rendered === "true") return;
  pContainer.dataset.rendered = "true";

  const unit = units.find(u => u.id === parseInt(unitId, 10));
  if (!unit) return;

  const colorIndex = unit.id === 0 ? 10 : (((unit.id - 1) % 10) + 1);
  const totalInUnit = unit.lessons.length;
  const completedInUnit = unit.lessons.filter(lId => state.completedLessons.includes(lId)).length;

  const points = [];
  for (let idx = 0; idx < totalInUnit; idx++) {
    const u = unit.id;
    const phase = (u * 1.7) % (2 * Math.PI);
    const freq = 1.1 + (u * 0.1) % 0.6;
    const amp = 26 + (u * 2) % 6;
    const tilt = ((u % 3) - 1) * (0.8 + (u % 2));
    const centerIndex = (totalInUnit - 1) / 2;
    const offsetPercent = Math.sin(idx * freq + phase) * amp + (idx - centerIndex) * tilt;

    points.push({
      x: 50 + offsetPercent,
      y: idx * 190 + 95
    });
  }

  if (totalInUnit > 0) {
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cy = (p0.y + p1.y) / 2;
      pathD += ` C ${p0.x} ${cy}, ${p1.x} ${cy}, ${p1.x} ${p1.y}`;
    }

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

    const svgHTML = `
      <svg class="unit-path-svg" viewBox="0 0 100 ${totalInUnit * 190}" preserveAspectRatio="none">
        <path class="path-bg" d="${pathD}" />
        ${progressD ? `<path class="path-progress" d="${progressD}" />` : ''}
      </svg>
    `;
    pContainer.innerHTML = svgHTML;
  }

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
    nodeWrapper.style.zIndex = `${100 + idx}`;

    let statusClass = 'locked';
    if (isCompleted) {
      statusClass = `completed unit-pin-color-${colorIndex}`;
    } else if (isActive) {
      statusClass = `active unit-pin-color-${colorIndex}`;
    }

    const illustrationContent = getLessonIllustration(lId, unit.id);

    let progressBadgeContent = '';
    const isNotUploadedLesson = (!lesson.exercises || lesson.exercises.length === 0 || lesson.exercises.every(ex => !ex.questions || ex.questions.length === 0)) && (!lesson.questions || lesson.questions.length === 0);
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

    const isNew = isLessonNew(lesson);
    const activeBannerContent = ''; // Simgeler üzerinden Yeni butonu kaldırıldı.

    let lessonOriginalTagHTML = '';

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
        ${isNotUploadedLesson ? '<div class="lesson-not-uploaded-badge">⏳ Ders eklenmemiştir</div>' : ''}
      </div>
    `;

    const btn = nodeWrapper.querySelector('.lesson-node');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

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

    pContainer.appendChild(nodeWrapper);
  });
}

function ensureLessonRendered(lessonId) {
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return;
  const unitId = lesson.unitId;
  const pContainer = document.querySelector(`.unit-section[data-unit-id="${unitId}"] .unit-path-container`);
  if (pContainer && pContainer.dataset.rendered === "false") {
    renderUnitPathAndNodes(pContainer, unitId);
  }
}

function renderLessonTree() {
  const container = document.getElementById('tree-container');
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

  const renderedUnits = [...units];

  const unitDisplayNames = {};
  renderedUnits.forEach((u, index) => {
    const cleanTitle = u.title
      .replace(/^Ara Bölüm\s*\d+\s*:\s*/i, "")
      .replace(/^Bölüm\s*\d+\s*:\s*/i, "")
      .replace(/^Ara Bölüm\s*\d+\s*/i, "")
      .replace(/^Bölüm\s*\d+\s*/i, "");
    unitDisplayNames[u.id] = `Bölüm ${index + 1}: ${cleanTitle}`;
  });

  const observerOptions = {
    root: null,
    rootMargin: '500px 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const pContainer = section.querySelector('.unit-path-container');
        const unitId = section.dataset.unitId;
        if (pContainer && pContainer.dataset.rendered === "false") {
          renderUnitPathAndNodes(pContainer, unitId);
        }
        self.unobserve(section);
      }
    });
  }, observerOptions);

  renderedUnits.forEach((unit, uIdx) => {
    const completedInUnit = unit.lessons.filter(lId => state.completedLessons.includes(lId)).length;
    const totalInUnit = unit.lessons.length;
    const progressPercent = Math.round((completedInUnit / totalInUnit) * 100);

    const isNotUploadedUnit = unit.lessons.every(lId => {
      const l = lessons.find(lesson => lesson.id === lId);
      return !l || ((!l.exercises || l.exercises.length === 0 || l.exercises.every(ex => !ex.questions || ex.questions.length === 0)) && (!l.questions || l.questions.length === 0));
    });
    let notUploadedBadgeHTML = '';
    if (isNotUploadedUnit) {
      notUploadedBadgeHTML = `
        <span class="unit-banner-not-uploaded-tag">
          <span class="tag-pulse-dot"></span>
          <span>Ders eklenmemiştir</span>
        </span>
      `;
    }

    let originalBadgeHTML = '';

    let extraBadgeHTML = '';
    const isStrictlyLocal = window.location.hostname === 'localhost' ||
                            window.location.hostname === '127.0.0.1' ||
                            window.location.protocol === 'file:';
    const extraUnitIds = [];
    if (isStrictlyLocal && extraUnitIds.includes(unit.id)) {
      extraBadgeHTML = `
        <span class="unit-banner-extra-tag">
          Ekstra
        </span>
      `;
    }

    const unitSection = document.createElement('div');
    unitSection.className = 'unit-section';
    unitSection.dataset.unitId = unit.id;

    const banner = document.createElement('div');
    const colorIndex = unit.id === 0 ? 10 : (((unit.id - 1) % 10) + 1);
    banner.className = `unit-banner unit-color-${colorIndex} ${isNotUploadedUnit ? 'not-uploaded-breath' : ''}`;
    
    const noDescUnitIds = [13, 17, 21, 22, 40, 101, 102, 103];
    const descHTML = noDescUnitIds.includes(unit.id) ? '' : `<p>${unit.description}</p>`;
    
    banner.innerHTML = `
      <div class="unit-banner-info">
        <h2 class="unit-banner-title-row">
          <span>${unitDisplayNames[unit.id]}</span>
          ${notUploadedBadgeHTML}
          ${originalBadgeHTML}
          ${extraBadgeHTML}
        </h2>
        ${descHTML}
      </div>
      <div class="unit-progress-container">
        <span class="unit-progress-text">${completedInUnit}/${totalInUnit}</span>
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

    const pathContainer = document.createElement('div');
    pathContainer.className = `unit-path-container unit-path-color-${colorIndex}`;
    pathContainer.style.height = `${totalInUnit * 190}px`;
    pathContainer.dataset.rendered = "false";

    unitSection.appendChild(pathContainer);
    container.appendChild(unitSection);

    observer.observe(unitSection);
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
  const isNotUploadedLesson = (!lesson.exercises || lesson.exercises.length === 0 || lesson.exercises.every(ex => !ex.questions || ex.questions.length === 0)) && (!lesson.questions || lesson.questions.length === 0);
  if (isNotUploadedLesson) {
    popoverFooterHTML = `
      <div class="popover-exercises-container">
        <div class="popover-not-uploaded-message">
          <span class="not-uploaded-icon">⏳</span>
          <span class="not-uploaded-text">Ders eklenmemiştir</span>
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
          openQuestionPreview(exercise.title, exercise.questions, exercise);
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
        openQuestionPreview(lesson.title, lesson.questions, lesson);
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

  // Rule: First 3 lessons of Unit 1 are open by default
  const firstUnit = sortedUnits[0];
  if (firstUnit && currentUnitId === firstUnit.id) {
    const lessonIdxInUnit = firstUnit.lessons.indexOf(lessonId);
    if (lessonIdxInUnit >= 0 && lessonIdxInUnit < 3) {
      return true; // First 3 lessons of Unit 1 are always unlocked
    }
  }

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

  // Dynamic Bridge translation injection logic
  if (currentQuizQuestions && currentQuizQuestions.length > 0) {
    let expandedQuestions = [];
    currentQuizQuestions.forEach(q => {
      expandedQuestions.push(q);
      if (q.bridgeTranslation) {
        // Create a dynamic word-bank bridge question
        const bridgeQ = {
          id: `${q.id}_bridge`,
          type: 'word-bank',
          prompt: `Cümleyi Türkçe'ye çevirerek Dil Bilgisi Köprüsünü (Grammar Bridge) tamamlayın:`,
          translation: q.bridgeTranslation.sentence,
          sentence: q.bridgeTranslation.sentence,
          correctOrder: q.bridgeTranslation.translation,
          words: q.bridgeTranslation.words,
          explanationKey: q.explanationKey || 'academic_tips_master'
        };
        expandedQuestions.push(bridgeQ);
      }
    });
    currentQuizQuestions = expandedQuestions;
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

  if (currentLesson.konuAnlatimi) {
    showKonuAnlatimi(currentLesson.konuAnlatimi, () => {
      renderQuestion();
    });
  } else {
    renderQuestion();
  }
}

function showKonuAnlatimi(konu, callback) {
  const oldModal = document.getElementById('konu-anlatimi-modal');
  if (oldModal) oldModal.remove();

  const modal = document.createElement('div');
  modal.id = 'konu-anlatimi-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(10, 10, 18, 0.7);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
  `;

  modal.innerHTML = `
    <div style="background: #1e1e2f; color: #fff; width: 100%; max-width: 550px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); padding: 30px; box-sizing: border-box; display: flex; flex-direction: column; gap: 20px; border: 1px solid rgba(255,255,255,0.1); transform: scale(0.9); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
      
      <!-- Header -->
      <div style="display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">
        <span style="font-size: 28px;">📖</span>
        <h2 style="margin: 0; font-size: 1.4rem; font-weight: 700; color: #ff6b6b; font-family: 'Outfit', sans-serif;">${konu.baslik}</h2>
      </div>
      
      <!-- Body -->
      <div style="display: flex; flex-direction: column; gap: 15px; font-family: 'Inter', sans-serif; font-size: 0.95rem; line-height: 1.6;">
        <div>
          <strong style="color: #ffb86c; font-size: 1rem; display: block; margin-bottom: 5px;">💡 Teorik Mantık:</strong>
          <p style="margin: 0; color: #e0e0e0;">${konu.teorikMantik}</p>
        </div>
        
        <div style="background: rgba(255,255,255,0.05); padding: 12px 15px; border-radius: 8px; border-left: 4px solid #50fa7b;">
          <strong style="color: #50fa7b; font-size: 0.9rem; display: block; margin-bottom: 5px;">🧪 Matematiksel Formül:</strong>
          <code style="font-family: 'Courier New', Courier, monospace; font-size: 1rem; color: #fff; font-weight: bold; word-break: break-all;">${konu.formul}</code>
        </div>
        
        <div style="background: rgba(255,107,107,0.1); padding: 12px 15px; border-radius: 8px; border-left: 4px solid #ff5555;">
          <strong style="color: #ff5555; font-size: 0.9rem; display: block; margin-bottom: 5px;">⚠️ Altın Kural (Sınav Tuzağı):</strong>
          <p style="margin: 0; color: #ffb8b8; font-size: 0.9rem;">${konu.altinKural}</p>
        </div>
      </div>
      
      <!-- Footer Button -->
      <button id="btn-konu-anlatimi-tamam" style="background: linear-gradient(135deg, #ff6b6b, #ff8e53); border: none; border-radius: 8px; color: #fff; padding: 12px 20px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; font-family: 'Outfit', sans-serif; margin-top: 10px; display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;">
        <span>ANLADIM, BAŞLA</span>
        <span>🚀</span>
      </button>
    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => {
    const dialog = modal.querySelector('div');
    if (dialog) dialog.style.transform = 'scale(1)';
  }, 10);

  const btn = modal.querySelector('#btn-konu-anlatimi-tamam');
  
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.02)';
    btn.style.boxShadow = '0 5px 15px rgba(255, 107, 107, 0.4)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = 'none';
  });

  btn.addEventListener('click', () => {
    const dialog = modal.querySelector('div');
    if (dialog) dialog.style.transform = 'scale(0.9)';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.2s ease';
    setTimeout(() => {
      modal.remove();
      if (callback) callback();
    }, 200);
  });
}

function getUnitDisplayTitle(unitId) {
  const index = units.findIndex(u => u.id === unitId);
  if (index !== -1) {
    return `Bölüm ${index + 1}`;
  }
  return '';
}

function updateQuizMetadata() {
  const metadataEl = document.getElementById('quiz-metadata');
  if (!metadataEl) return;

  const question = isReviewMode ? reviewQuestions[currentQuestionIndex] : (currentQuizQuestions ? currentQuizQuestions[currentQuestionIndex] : null);
  let isNew = false;
  if (question) {
    let parentObj = null;
    if (!isReviewMode && currentLesson) {
      if (currentLesson.activeExerciseId && currentLesson.exercises) {
        parentObj = currentLesson.exercises.find(ex => ex.id === currentLesson.activeExerciseId);
      } else {
        parentObj = currentLesson;
      }
    }
    isNew = isQuestionNew(question, parentObj);
  }
  const newBadge = isNew ? ' <span class="quiz-new-badge" style="background: #ff3b30; color: #fff; font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-left: 6px; display: inline-block; vertical-align: middle; line-height: 1.2;">YENİ</span>' : '';

  if (isReviewMode) {
    const total = reviewQuestions.length;
    metadataEl.innerHTML = `Hızlı Tekrar • Soru ${currentQuestionIndex + 1}/${total}${newBadge}`;
    return;
  }

  if (typeof isPlacementMode !== 'undefined' && isPlacementMode) {
    const total = typeof placementQuestions !== 'undefined' && placementQuestions ? placementQuestions.length : 0;
    metadataEl.innerHTML = `Seviye Sınavı • Soru ${currentQuestionIndex + 1}/${total}${newBadge}`;
    return;
  }

  if (!currentLesson) {
    metadataEl.innerHTML = '';
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

  metadataEl.innerHTML = `${unitTitle} • ${lessonLabel}${exLabel ? ` • ${exLabel}` : ''} • Soru ${qNum}${newBadge}`;
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

  const quizScreen = document.getElementById('quiz-screen');
  if (quizScreen) {
    if (currentLesson && currentLesson.unitId === 10) {
      quizScreen.setAttribute('data-unit-id', '10');
    } else {
      quizScreen.removeAttribute('data-unit-id');
    }
  }

  if (!question.prompt && question.question) {
    question.prompt = question.question;
  }

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

  // Highlight quotes in prompts dynamically for better scanability, ignoring HTML attributes
  if (question.prompt) {
    question.prompt = question.prompt.replace(/([^=]|^)(["'\u201c\u201d])([^"'\u201c\u201d]+)(["'\u201c\u201d])/g, (match, prefix, openQ, text, closeQ) => {
      if (text.includes('<') || text.includes('>') || text.includes('=')) return match;
      return `${prefix}${openQ}<span class="prompt-quote-highlight">${text}</span>${closeQ}`;
    });
  }

  try {
    switch (activeType) {
      case 'multiple-choice':
      case 'error-spotting':
      case 'context-clue':
      case 'chain-expansion-differential':
      case 'structural-deconstruction':
      case 'vector-velocity-shift':
      case 'titan-boundary-defense':
      case 'vagon-to-suffix-match':
      case 'reverse-engineering-translation':
      case 'suffix-decapitation':
        renderMultipleChoice(body, question);
        break;
      case 'inversion-transformer':
        renderInversionTransformer(body, question);
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
      case 'vector-assembly':
        renderVectorAssembly(body, question);
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
  } catch (error) {
    console.error("Soru render edilirken hata oluştu:", error);
    body.innerHTML = `
      <div style="padding: 40px 20px; text-align: center; color: var(--text-primary);">
        <div style="font-size: 3rem; margin-bottom: 15px;">⚠️</div>
        <h3 style="margin: 0 0 10px 0; font-family: 'Outfit', sans-serif; color: #ff6b6b;">Soru Yüklenemedi</h3>
        <p style="margin: 0 0 20px 0; font-size: 0.95rem; color: var(--text-muted); line-height: 1.5;">Bu sorunun veri şemasında eksik alanlar bulunmaktadır.</p>
        <button id="btn-fallback-skip" style="background: rgba(255,255,255,0.08); border: 1px solid var(--border-color); color: var(--text-primary); padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: background 0.2s;">Soruyu Atla ➔</button>
      </div>
    `;
    const fallbackSkipBtn = document.getElementById('btn-fallback-skip');
    if (fallbackSkipBtn) {
      fallbackSkipBtn.addEventListener('click', () => {
        // Mark as skipped/handled
        isAnswerChecked = true;
        selectedAnswer = -1; 
        document.getElementById('btn-check').disabled = false;
        checkAnswer();
      });
    }
  }

  // Restore prompt text so data remains unmodified
  question.prompt = originalPrompt;
}

// ── Çoktan Seçmeli ──────────────────────────────────────────
function renderMultipleChoice(container, question) {
  let promptHtml = question.prompt;
  const isEngToTr = (question.prompt.includes("Türkçe") || question.isEngToTr) && 
                    !question.prompt.includes("_______") &&
                    !question.prompt.includes("İngilizce:");
  
  let sentenceHtml = question.sentence || "";
  if (question.type === 'chain-expansion-differential') {
    sentenceHtml = `
      <div style="text-align: left; background: rgba(255, 255, 255, 0.04); padding: 12px 16px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 12px; margin-top: 8px;">
        <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 4px; letter-spacing: 0.5px;">Cümle 1:</span>
        <span style="font-size: 1.05rem; color: var(--text-primary); line-height: 1.4;">${question.sentence_1}</span>
      </div>
      <div style="text-align: left; background: rgba(255, 255, 255, 0.04); padding: 12px 16px; border-radius: 8px; border-left: 4px solid #ec4899; margin-bottom: 8px;">
        <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 4px; letter-spacing: 0.5px;">Cümle 2:</span>
        <span style="font-size: 1.05rem; color: var(--text-primary); line-height: 1.4;">${question.sentence_2}</span>
      </div>
    `;
  } else if (question.type === 'vector-velocity-shift') {
    sentenceHtml = `
      <div style="text-align: left; background: rgba(255, 255, 255, 0.04); padding: 12px 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 8px; margin-top: 8px;">
        <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 4px; letter-spacing: 0.5px;">Mevcut Yapı:</span>
        <span style="font-size: 1.05rem; color: var(--text-primary); line-height: 1.4;">${question.current_structure}</span>
      </div>
    `;
  } else if (question.type === 'suffix-decapitation') {
    sentenceHtml = `
      <div style="text-align: left; background: rgba(255, 255, 255, 0.04); padding: 12px 16px; border-radius: 8px; border-left: 4px solid #ef4444; margin-bottom: 12px; margin-top: 8px;">
        <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 4px; letter-spacing: 0.5px;">Önceki Cümle:</span>
        <span style="font-size: 1.05rem; color: var(--text-primary); line-height: 1.4;">${question.sentence_before}</span>
      </div>
      <div style="text-align: left; background: rgba(255, 255, 255, 0.04); padding: 12px 16px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 8px;">
        <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 4px; letter-spacing: 0.5px;">Sonraki Cümle:</span>
        <span style="font-size: 1.05rem; color: var(--text-primary); line-height: 1.4;">${question.sentence_after}</span>
      </div>
    `;
  }

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

  if (sentenceHtml) {
    // Apply hoverable meanings and grammar pattern highlights to raw English sentences
    if (!sentenceHtml.includes('<span') && !sentenceHtml.includes('<div')) {
      sentenceHtml = `"${makeTextHoverable(sentenceHtml)}"`;
    }
  }

  const renderedOptions = question.options.map((opt, i) => {
    let optHtml = opt;
    if (!isEngToTr && optHtml) {
      optHtml = makeTextHoverable(optHtml, true);
    }
    return `<button class="mc-option" data-index="${i}">${optHtml}</button>`;
  }).join('');

  let tipsHtml = '';
  if (question.id && (question.id.startsWith('c51_') || question.id.startsWith('c52_') || question.id.startsWith('c53_') || question.id.startsWith('c54_') || question.id.startsWith('u55_') || question.id.startsWith('c56_'))) {
    let tipText = '';
    if (question.id.startsWith('c51_l01') || question.id.startsWith('c51_l1')) {
      tipText = '<strong>As Türevleri:</strong> <em>As for / As to</em> (-e gelince, ile ilgili), <em>As of</em> (-den itibaren), <em>As if / As though</em> (-mış gibi), <em>As in</em> (-de olduğu gibi).';
    } else if (question.id.startsWith('c51_l02') || question.id.startsWith('c51_l2')) {
      tipText = '<strong>Ettirgen (Causative):</strong> Aktiflerde <em>Have/Let/Make + Kişi + V0</em> ve <em>Get + Kişi + to V1</em>; Pasiflerde <em>Have/Get + Nesne + V3</em> kullanılır.';
    } else if (question.id.startsWith('c51_l03') || question.id.startsWith('c51_l3')) {
      tipText = '<strong>Devrik (Inversion):</strong> Cümle başında kullanılan <em>Seldom, Nowhere, Not only, Hardly, Only then</em> gibi olumsuzluk/kısıtlama öbekleri cümleyi devrik yapar.';
    } else if (question.id.startsWith('c52_l01') || question.id.startsWith('c52_l1')) {
      tipText = '<strong>Kısaltma (Reduction):</strong> Aktif önceliklerde <em>Having + V3</em>; pasif önceliklerde <em>Having been + V3</em>; gelecek/amaç bildiren yapılarda <em>To be + V3</em> veya <em>To have been + V3</em> kullanılır.';
    } else if (question.id.startsWith('c52_l02') || question.id.startsWith('c52_l2')) {
      tipText = '<strong>Eşikte Olma (-e Üzere Olmak):</strong> <em>Be about to + V0</em>, <em>Be due to + V0</em> ve <em>Be on the verge/brink/point/edge of + V-ing</em> eşikte olma ve yakın gelecek bildirir.';
    } else if (question.id.startsWith('c52_l03') || question.id.startsWith('c52_l3')) {
      tipText = '<strong>Subjunctive & Gizli Şart:</strong> Aciliyet ve önem bildiren sıfatlardan sonra <em>that + Subject + V0 (yalın)</em> subjunctive yapısı; aksi takdirde anlamında <em>otherwise</em> veya -olmasaydı anlamında <em>but for</em> kullanılır.';
    } else if (question.id.startsWith('c52_l04') || question.id.startsWith('c52_l4')) {
      tipText = '<strong>Pasif Aktarım:</strong> <em>It is said that + SVO</em> veya <em>Subject + is said to + V0</em> kullanılır; eylemler arasında zaman farkı varsa (geçmişe dönük) <em>Subject + is said to + have V3</em> tercih edilir.';
    } else if (question.id.startsWith('c53_')) {
      tipText = '<strong>Existential "There" Hiyerarşisi:</strong> 1. <em>There exists/is</em> (Basit), 2. <em>There must be</em> (Orta), 3. <em>There could have been</em> (İleri), 4. <em>There might have been V-ing</em> (Üst Düzey), 5. <em>There should have been being V3</em> (En Karmaşık).';
    } else if (question.id.startsWith('c54_l01') || question.id.startsWith('c54_l1') || question.id.startsWith('c54_l02') || question.id.startsWith('c54_l2') || question.id.startsWith('c54_l03') || question.id.startsWith('c54_l3')) {
      tipText = '<strong>Bağlaç Formülleri ve Örnekleri (Grup Kuralları):</strong><br>' +
                '• <strong>G1: Cümle Alanlar (+ Tam Cümle SVO):</strong> <em>Although</em> (rağmen), <em>Because</em> (çünkü), <em>Unless</em> (madıkça).<br>' +
                '  <em>Örnek:</em> Although it was raining, we went out.<br>' +
                '• <strong>G2: İsim Alanlar (+ İsim / V-ing):</strong> <em>Despite</em> (rağmen), <em>Because of</em> (yüzünden), <em>In addition to</em> (ek olarak).<br>' +
                '  <em>Örnek:</em> Despite the heavy rain, we went out.<br>' +
                '• <strong>G4: Noktalamacılar / Transitions (; ... ,):</strong> <em>However</em> (ancak), <em>Therefore</em> (bu yüzden), <em>Moreover</em> (dahası).<br>' +
                '  <em>Örnek:</em> It was raining; however, we decided to go out.';
    } else if (question.id.startsWith('u55_') || question.id.startsWith('c56_')) {
      if (question.id.includes('_l7_')) {
        tipText = '<strong>Keşke Yapıları (I wish / If only):</strong><br>' +
                  '• <strong>Şikayet / Gelecek:</strong> wish + would V1. <em>(Örn: I wish you would listen)</em><br>' +
                  '• <strong>Şimdiki Zaman:</strong> wish + V2 / could V1. <em>(Örn: I wish I knew / could swim)</em><br>' +
                  '• <strong>Geçmiş Zaman (Pişmanlık):</strong> wish + had V3 / could have V3. <em>(Örn: I wish had called)</em><br>' +
                  '• <strong>Özne Uyumu Kısıtı:</strong> Aynı özneyle would kullanılamaz <em>(I wish I would ❌ ➔ I wish I could/V2 ✔️)</em>.';
      } else if (question.id.includes('_l6_')) {
        tipText = '<strong>Diğer Koşul Bağlaçları:</strong><br>' +
                  '• <strong>unless</strong> (-medikçe), <strong>as long as</strong> (-diği sürece), <strong>provided that / providing</strong> (-şartıyla).<br>' +
                  '• <strong>supposing / assuming</strong> (varsayalım ki), <strong>in case</strong> (durumunda/diye), <strong>on condition that</strong> (koşuluyla).<br>' +
                  '• <strong>only if</strong> (cümle başında devriklik yapar: <em>Only if we leave, can we catch...</em>).<br>' +
                  '• <strong>in case of / in the event of + noun</strong> (-durumunda / -halinde).';
      } else if (question.id.includes('_l5_')) {
        tipText = '<strong>Alternatif Koşul Yapıları:</strong><br>' +
                  '• <strong>If ..., then ...:</strong> Koşul sonucunu vurgular. <em>(If you tell, then I can...)</em><br>' +
                  '• <strong>Otherwise / Or / Or else:</strong> Aksi takdirde / yoksa. <em>(Study; otherwise, you will fail)</em><br>' +
                  '• <strong>Without + Noun:</strong> ... olmasaydı/olmadan. <em>(Without air, we couldn\'t live / Without help, we would have failed)</em>';
      } else if (question.id.includes('_l4_')) {
        tipText = '<strong>Devrik Koşul Yapıları (If Inversion):</strong> "If" kaldırıldığında yardımcı fiil başa gelir:<br>' +
                  '• <strong>Type 1:</strong> <em>Should + S + V1</em>. (If a problem should arise ➔ Should a problem arise)<br>' +
                  '• <strong>Type 2:</strong> <em>Were + S + ... / Were + S + to V1</em>. (If I were you ➔ Were I you)<br>' +
                  '• <strong>Type 3:</strong> <em>Had + S + V3</em>. (If you had called ➔ Had you called)';
      } else {
        tipText = '<strong>If Clause Tipleri Özet Tablosu:</strong><br>' +
                  '• <strong>Type 0 (Genel Doğrular):</strong> If + Present Simple, Present Simple. <em>(boils)</em><br>' +
                  '• <strong>Type 1 (Gelecek İhtimal):</strong> If + Present, Will / Can / May + V1. <em>(will pass)</em><br>' +
                  '• <strong>Type 2 (Şu Anki Hayal):</strong> If + Past Simple (were), Would / Could + V1. <em>(would buy)</em><br>' +
                  '• <strong>Type 3 (Geçmiş Pişmanlık):</strong> If + Past Perfect (had V3), Would have + V3. <em>(had driven / would have survived)</em><br>' +
                  '• <strong>Mix 1 (Geçmiş ➔ Bugün):</strong> If + had V3, Would + V1 (now). <em>(had driven / wouldn\'t be in hospital now)</em><br>' +
                  '• <strong>Mix 2 (Genel ➔ Geçmiş):</strong> If + V2 (were), Would have + V3. <em>(were taller / would have been chosen yesterday)</em>';
      }
    }

    if (tipText) {
      tipsHtml = `
        <div class="tips-reminder-card" style="padding: 10px 14px; margin-bottom: 15px;">
          <div class="tips-reminder-text" style="font-size: 0.9rem; line-height: 1.5;"><strong>Tips:</strong> ${tipText}</div>
        </div>
      `;
    }
  }

  container.innerHTML = `
    ${tipsHtml}
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

// ── Inversion Transformer ──────────────────────────────────
function renderInversionTransformer(container, question) {
  const mainSentence = question.mainSentence || "";
  const promptHtml = question.prompt || "Verilen düz akademik cümleyi devrik forma dönüştürün:";

  const optionsHtml = question.options.map((opt, i) => {
    const letter = String.fromCharCode(65 + i);
    const optHtml = makeTextHoverable(opt, true);
    return `
      <button class="mc-option it-option" data-index="${i}" style="display: flex; align-items: flex-start; gap: 14px; width: 100%;">
        <span class="it-option-letter" style="display: inline-flex; align-items: center; justify-content: center; min-width: 24px; height: 24px; background: var(--bg-secondary, #f1f5f9); border-radius: 6px; font-weight: 700; font-size: 0.8rem; color: var(--text-muted, #64748b); flex-shrink: 0;">${letter}</span>
        <span class="it-option-text" style="flex: 1; text-align: left;">${optHtml}</span>
      </button>
    `;
  }).join('');

  container.innerHTML = `
    <p class="quiz-prompt">${promptHtml}</p>
    
    <div class="it-main-sentence-card" style="margin: 16px 8px; padding: 20px; background-color: var(--bg-secondary, #f1f5f9); border-radius: 16px; border: 1.5px solid var(--border-color, #cbd5e1); width: 100%; box-sizing: border-box; text-align: left;">
      <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted, #64748b); letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 8px;">DÜZ CÜMLE (DÖNÜŞTÜRÜN):</div>
      <div style="font-size: 1.15rem; font-weight: 600; color: var(--text-primary); line-height: 1.4;">${makeTextHoverable(mainSentence)}</div>
    </div>

    <div class="mc-options" style="width: 100%;">
      ${optionsHtml}
    </div>
  `;

  container.querySelectorAll('.it-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isAnswerChecked) return;
      container.querySelectorAll('.it-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAnswer = parseInt(btn.dataset.index);
      document.getElementById('btn-check').disabled = false;

      // Automatically check answer after 250ms selection
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

// ── Vector Assembly (vector-assembly) ──────────
function renderVectorAssembly(container, question) {
  let currentSelection = [];
  const tokens = [...question.scrambled_elements];
  
  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt || "Öğeleri doğru sırayla birleştirerek eylemi inşa edin:"}</p>
    
    <div class="vector-build-zone" id="vector-build-zone" style="min-height: 50px; display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: center; border: 2px dashed var(--border-color); border-radius: var(--radius-md); padding: 15px; background: var(--bg-secondary); margin-bottom: 20px;">
      <span class="build-placeholder" style="color: var(--text-muted); font-size: 0.95rem;">Öğeleri sırasıyla seçerek eylemi oluşturun...</span>
    </div>
    
    <div class="context-sentence" style="text-align: center; margin: 20px 0; font-size: 1.15rem; font-weight: 500; color: var(--text-primary);">
      ${question.sentence || question.question}
    </div>
    
    <div class="tokens-flex" id="vector-tokens" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 20px;"></div>
  `;

  const tokensParent = document.getElementById("vector-tokens");
  const buildZone = document.getElementById("vector-build-zone");

  tokens.forEach(token => {
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
      
      if (currentSelection.length === question.correct_sequence.length) {
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
      "ani bir sonuç olarak", "gerekçesiyle", "veya", "ya da", "ve", "ile",
      "gelince", "aksine", "birlikte", "ilişkin", "konusunda", "açısından"
    ];

    const splitAfterTr = [
      "olarak", "ederek", "yaparak", "edildiğinde", "yapıldığında", "olduğunda", "olduğu gibi",
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

    // 1b. Comma split for natural phrase clauses
    let tempComma = [];
    for (let s of segments) {
      if (s.includes(',')) {
        const parts = s.split(',');
        for (let i = 0; i < parts.length; i++) {
          let p = parts[i].trim();
          if (!p) continue;
          if (i < parts.length - 1) {
            tempComma.push(p + ',');
          } else {
            tempComma.push(p);
          }
        }
      } else {
        tempComma.push(s);
      }
    }
    segments = tempComma;

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
    const isPreSegmented = question.correctOrder.some(w => w.includes(' '));
    if (isPreSegmented) {
      const cleanTargetWords = question.correctOrder.map(w => w.replace(/<[^>]+>/g, '').trim()).filter(Boolean);
      const rawDistractors = Array.isArray(question.words)
        ? question.words.filter(w => !question.correctOrder.includes(w))
        : [];
      const cleanDistractors = rawDistractors
        .map(w => w.replace(/<[^>]+>/g, '').trim())
        .filter(Boolean)
        .filter(w => !cleanTargetWords.includes(w));
      
      question.correctOrder = cleanTargetWords;
      question.words = [...cleanTargetWords, ...cleanDistractors];
    } else {
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
    document.getElementById('btn-check').disabled = false; // Keep enabled to allow click validation & shake feedback
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
        <button class="match-item match-right" data-right="${shuffledRight[i].right}">${makeTextHoverable(shuffledRight[i].right, true)}</button>
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

  // Shuffle spotlight options dynamically to randomize UI layout
  const indexedOptions = question.options.map((opt, i) => ({ opt, originalIndex: i }));
  const shuffledOptions = [...indexedOptions].sort(() => Math.random() - 0.5);

  const optionsHtml = shuffledOptions.map((item) => {
    return `<button class="spotlight-option-card" data-index="${item.originalIndex}" style="padding: 16px; border-radius: 12px; color: var(--text-primary); font-size: 1.1rem; font-weight: 600; cursor: pointer; text-align: center; width: 100%;">
      ${item.opt}
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

  // Automatically scroll the highlighted text into view within the container
  setTimeout(() => {
    const brightEl = container.querySelector('.spotlight-bright');
    const scrollParent = container.querySelector('.spotlight-paragraph-container');
    if (brightEl && scrollParent) {
      const parentRect = scrollParent.getBoundingClientRect();
      const elRect = brightEl.getBoundingClientRect();
      const relativeTop = elRect.top - parentRect.top + scrollParent.scrollTop;
      scrollParent.scrollTo({
        top: relativeTop - (parentRect.height / 2) + (elRect.height / 2),
        behavior: 'smooth'
      });
    }
  }, 120);
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
  const parts = question.sentence.split(/_{3,}/);
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
    case 'error-spotting':
    case 'context-clue':
    case 'chain-expansion-differential':
    case 'structural-deconstruction':
    case 'vector-velocity-shift':
    case 'titan-boundary-defense':
    case 'vagon-to-suffix-match':
    case 'reverse-engineering-translation':
    case 'suffix-decapitation':
    case 'inversion-transformer':
    case 'punctuation-check':
    case 'structure-match':
      isCorrect = selectedAnswer === question.correctIndex;
      break;
    case 'idiom-builder':
      isCorrect = Array.isArray(selectedAnswer) &&
        selectedAnswer.length === question.correctSequence.length &&
        selectedAnswer.every((w, i) => w === question.correctSequence[i]);
      break;
    case 'vector-assembly':
      isCorrect = Array.isArray(selectedAnswer) &&
        selectedAnswer.length === question.correct_sequence.length &&
        selectedAnswer.every((w, i) => w === question.correct_sequence[i]);
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
        const correctVal = (question.correct || question.correctAnswer || "").toLowerCase().trim();
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
  state.totalQuestionsAnswered = (state.totalQuestionsAnswered || 0) + 1;

  // Apply visual styles and call feedback rendering functions
  switch (activeType) {
    case 'multiple-choice':
    case 'error-spotting':
    case 'context-clue':
    case 'chain-expansion-differential':
    case 'structural-deconstruction':
    case 'vector-velocity-shift':
    case 'titan-boundary-defense':
    case 'vagon-to-suffix-match':
    case 'reverse-engineering-translation':
    case 'suffix-decapitation':
    case 'inversion-transformer':
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
    
    // Remove from wrongQuestions if answered correctly (or defer to session completion if in review mode)
    if (isReviewMode) {
      if (!reviewSessionCorrectIds.includes(question.id)) {
        reviewSessionCorrectIds.push(question.id);
      }
    } else {
      const qIndex = state.wrongQuestions.indexOf(question.id);
      if (qIndex > -1) {
        state.wrongQuestions.splice(qIndex, 1);
      }
    }
  } else {
    feedbackPanel.classList.add('wrong');
    feedbackPanel.classList.remove('correct');
    feedbackIcon.textContent = '✗';

    let correctAnswerText = '';
    if (question.type === 'multiple-choice' || question.type === 'error-spotting' || question.type === 'context-clue' || question.type === 'inversion-transformer' || question.type === 'fill-blank-dropdown' || question.type === 'fill-blank' || question.type === 'spotlight' || question.type === 'preposition-magnet' || question.type === 'reflex-blitz' || question.type === 'punctuation-check' || question.type === 'structure-match') {
      correctAnswerText = question.options[question.correctIndex];
    } else if (question.type === 'swipe') {
      correctAnswerText = question.isCorrect ? 'VALID (DOĞRU)' : 'BUG (HATALI)';
    } else if (question.type === 'collocation-matching') {
      correctAnswerText = question.explanation;
    } else if (question.type === 'fill-blank-text') {
      correctAnswerText = question.correct || question.correctAnswer;
    } else if (question.type === 'translation-text') {
      correctAnswerText = question.correctSentence;
    } else if (question.type === 'word-bank') {
      correctAnswerText = question.correctOrder.join(' ');
    } else if (question.type === 'idiom-builder') {
      correctAnswerText = question.correctSequence.join(' ');
    } else if (question.type === 'vector-assembly') {
      correctAnswerText = question.correct_sequence.join(' ');
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

  // Oturum bittiğinde doğru cevaplanan soruları hatalı listesinden düşür
  if (reviewSessionCorrectIds && reviewSessionCorrectIds.length > 0) {
    reviewSessionCorrectIds.forEach(id => {
      const idx = state.wrongQuestions.indexOf(id);
      if (idx > -1) {
        state.wrongQuestions.splice(idx, 1);
      }
    });
  }

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

    // Telegram notification
    try {
      const message = `🔔 *Ders Tamamlandı!*\n👤 *Kullanıcı:* ${state.username}\n📚 *Ders:* ${currentLesson.title}${exTitle}\n🎯 *Doğruluk:* %${accuracy}\n🏆 *Kazanılan XP:* +${earnedXP}\n🔥 *Seri:* ${state.streak} Gün`;
      sendTelegramNotification(message);
    } catch(e) {}

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
  if (['gold', 'canva', 'mint', 'sakura', 'sunset', 'kutup', 'siber', 'orman'].includes(state.activeTheme)) {
    document.documentElement.setAttribute('data-theme', state.activeTheme);
  } else if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('btn-theme').textContent = '☀️';
  }
}

function toggleTheme() {
  if (['gold', 'canva', 'mint', 'sakura', 'sunset', 'kutup', 'siber', 'orman'].includes(state.activeTheme)) {
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
  } else if (tabId === 'simulator') {
    renderSimulator();
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
    ensureLessonRendered(targetLesson.id);
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

function showAvatarSelectorModal() {
  const modal = document.createElement('div');
  modal.className = 'custom-modal-overlay';
  modal.id = 'avatar-selector-modal';
  
  const avatars = ['🦉', '🦊', '🦁', '🐨', '🦄', '🐼', '🦖', '🐝', '🚀', '🎓', '🧠', '👾', '🎨', '⚽', '🎸', '🎮'];
  const colors = [
    { value: '#E88A9A', name: 'Gül Kurusu' },
    { value: '#B4A7D6', name: 'Lavanta' },
    { value: '#8BC6A0', name: 'Nane' },
    { value: '#E8CB6E', name: 'Altın' },
    { value: '#8B7EC8', name: 'İndigo' },
    { value: '#7EC8C8', name: 'Teal' },
    { value: '#ED8936', name: 'Turuncu' },
    { value: '#4A5568', name: 'Kömür' }
  ];

  let selectedAvatar = state.profilePhoto && state.profilePhoto.startsWith('avatar:') 
    ? state.profilePhoto.split(':')[1] 
    : '🦉';
  let selectedColor = state.avatarColor || '#E88A9A';

  const getPreviewHTML = () => {
    return `<div style="background: ${selectedColor}; width: 90px; height: 90px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; box-shadow: var(--shadow-md); border: 3px solid var(--border-color); transition: all var(--transition-normal);">${selectedAvatar}</div>`;
  };

  modal.innerHTML = `
    <div class="custom-modal" style="animation: popoverFadeIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); max-width: 400px; width: 90%;">
      <div class="custom-modal-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; margin-bottom: 20px;">
        <h3 style="font-family: var(--font-heading); font-size: 1.2rem; margin: 0; color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
          <span>🎭</span> Avatarını Seç
        </h3>
        <button class="modal-close-btn" id="btn-close-avatar-modal" style="background: transparent; border: none; color: var(--text-muted); font-size: 1.4rem; cursor: pointer; padding: 0; line-height: 1;">&times;</button>
      </div>
      <div class="custom-modal-body" style="display: flex; flex-direction: column; gap: 20px; align-items: center;">
        
        <div id="avatar-preview-container">
          ${getPreviewHTML()}
        </div>

        <div style="width: 100%;">
          <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); display: block; margin-bottom: 8px;">Karakter Seçin</span>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-height: 160px; overflow-y: auto; padding: 4px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-body);">
            ${avatars.map(av => `
              <button class="avatar-option-btn" data-avatar="${av}" style="font-size: 1.8rem; background: var(--bg-card); border: 2px solid ${av === selectedAvatar ? 'var(--accent-primary)' : 'var(--border-color)'}; border-radius: var(--radius-md); aspect-ratio: 1; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all var(--transition-fast); outline: none;">
                ${av}
              </button>
            `).join('')}
          </div>
        </div>

        <div style="width: 100%;">
          <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); display: block; margin-bottom: 8px;">Arka Plan Rengi</span>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
            ${colors.map(col => `
              <button class="color-option-btn" data-color="${col.value}" style="width: 32px; height: 32px; border-radius: 50%; background: ${col.value}; border: 2px solid ${col.value === selectedColor ? 'var(--text-primary)' : 'transparent'}; box-shadow: var(--shadow-sm); cursor: pointer; position: relative; transition: all var(--transition-fast); outline: none;" title="${col.name}">
                ${col.value === selectedColor ? '<span style="color: #fff; font-size: 0.8rem; font-weight: bold; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">✓</span>' : ''}
              </button>
            `).join('')}
          </div>
        </div>

        <div style="width: 100%; border-top: 1px dashed var(--border-color); padding-top: 14px; text-align: center;">
          <button class="btn btn-ghost" id="btn-trigger-upload" style="font-size: 0.85rem; padding: 6px 12px; display: inline-flex; align-items: center; gap: 6px;">
            📸 Cihazdan Fotoğraf Yükle
          </button>
        </div>

      </div>
      <div class="custom-modal-footer" style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 16px;">
        <button class="btn btn-secondary" id="btn-cancel-avatar" style="padding: 10px 16px; border-radius: var(--radius-md); font-weight: 700; cursor: pointer;">İptal</button>
        <button class="btn btn-primary" id="btn-save-avatar" style="padding: 10px 20px; border-radius: var(--radius-md); font-weight: 700; cursor: pointer; background: var(--accent-primary);">Kaydet</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const closeModal = () => modal.remove();
  document.getElementById('btn-close-avatar-modal').addEventListener('click', closeModal);
  document.getElementById('btn-cancel-avatar').addEventListener('click', closeModal);

  const previewContainer = document.getElementById('avatar-preview-container');
  const avatarButtons = modal.querySelectorAll('.avatar-option-btn');
  const colorButtons = modal.querySelectorAll('.color-option-btn');

  avatarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      avatarButtons.forEach(b => {
        b.style.borderColor = 'var(--border-color)';
      });
      btn.style.borderColor = 'var(--accent-primary)';
      selectedAvatar = btn.getAttribute('data-avatar');
      previewContainer.innerHTML = getPreviewHTML();
    });
  });

  colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      colorButtons.forEach(b => {
        b.style.borderColor = 'transparent';
        const check = b.querySelector('span');
        if (check) check.remove();
      });
      btn.style.borderColor = 'var(--text-primary)';
      btn.innerHTML = '<span style="color: #fff; font-size: 0.8rem; font-weight: bold; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">✓</span>';
      selectedColor = btn.getAttribute('data-color');
      previewContainer.innerHTML = getPreviewHTML();
    });
  });

  document.getElementById('btn-trigger-upload').addEventListener('click', () => {
    closeModal();
    const fileInput = document.getElementById('profile-photo-input');
    if (fileInput) {
      fileInput.click();
    }
  });

  document.getElementById('btn-save-avatar').addEventListener('click', () => {
    state.profilePhoto = `avatar:${selectedAvatar}`;
    state.avatarColor = selectedColor;
    saveState();
    
    updateTopBar();
    renderProfile();
    renderSocialList();
    showToast('Profil avatarınız güncellendi! 🎭', 'success');
    closeModal();
  });
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

  let avatarContent;
  if (state.profilePhoto && state.profilePhoto.startsWith('avatar:')) {
    const avatarEmoji = state.profilePhoto.split(':')[1];
    avatarContent = `<div class="avatar-emoji-display" style="background: ${state.avatarColor || 'var(--accent-primary)'}; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2.8rem; border-radius: 50%; color: white;">${avatarEmoji}</div>`;
  } else if (state.profilePhoto) {
    avatarContent = `<img src="${state.profilePhoto}" alt="Profil Fotoğrafı" class="profile-avatar-img">`;
  } else {
    avatarContent = `<div class="avatar-emoji-display" style="background: ${state.avatarColor || 'var(--accent-primary)'}; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2rem; border-radius: 50%; color: white; font-weight: bold;">${escapeHtml(firstLetter)}</div>`;
  }

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
        ${state.email ? `<span class="profile-email" style="font-size: 0.85rem; color: var(--text-secondary); display: block; margin-top: 4px; margin-bottom: 6px; font-weight: 500;">✉️ ${escapeHtml(state.email)}</span>` : ''}
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
      showAvatarSelectorModal();
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

    let avatarContent = escapeHtml(letter);
    let avatarStyle = `background-color: ${escapeHtml(user.avatarColor || '#7EC8C8')}; display: flex; align-items: center; justify-content: center;`;
    
    if (user.isSelf) {
      if (state.profilePhoto && state.profilePhoto.startsWith('avatar:')) {
        avatarContent = state.profilePhoto.split(':')[1];
        avatarStyle = `background-color: ${escapeHtml(state.avatarColor || '#5856D6')}; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;`;
      } else if (state.profilePhoto) {
        avatarContent = `<img src="${state.profilePhoto}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block;">`;
        avatarStyle = `background-color: transparent; display: flex; align-items: center; justify-content: center;`;
      } else {
        avatarStyle = `background-color: ${escapeHtml(state.avatarColor || '#5856D6')}; display: flex; align-items: center; justify-content: center; font-weight: bold;`;
      }
    }

    return `
      <div class="friend-card">
        <div class="friend-avatar" style="${avatarStyle}">
          ${avatarContent}
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
async function renderLeaderboard() {
  const list = document.getElementById('leaderboard-list');
  if (!list) return;

  const baseCompetitors = [
    { name: "Ahmet Yılmaz", xp: 450, avatarColor: '#E88A9A' },
    { name: "Elif Demir", xp: 320, avatarColor: '#B4A7D6' },
    { name: "Can Kaya", xp: 210, avatarColor: '#8BC6A0' },
    { name: "Sarah Connor", xp: 180, avatarColor: '#E8CB6E' },
    { name: "Melis Şen", xp: 90, avatarColor: '#8B7EC8' }
  ];

  let competitors = [];

  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('user_states')
        .select('username, xp, avatar_color')
        .order('xp', { ascending: false })
        .limit(100);

      if (!error && data && data.length > 0) {
        let userFound = false;
        competitors = data.map(item => {
          const isUser = item.username === state.username;
          if (isUser) userFound = true;
          return {
            name: isUser ? `${item.username} (Sen)` : item.username,
            xp: item.xp,
            isUser: isUser,
            avatarColor: item.avatar_color || '#B4A7D6'
          };
        });

        if (!userFound && state.username && state.username !== 'Misafir') {
          competitors.push({
            name: `${state.username} (Sen)`,
            xp: state.xp,
            isUser: true,
            avatarColor: state.avatarColor || '#B4A7D6'
          });
        }
      }
    } catch (e) {
      console.error('Leaderboard fetch error:', e);
    }
  }

  if (competitors.length === 0) {
    competitors = [
      ...baseCompetitors,
      { name: (state.username || 'Misafir') + " (Sen)", xp: state.xp, isUser: true, avatarColor: state.avatarColor || '#B4A7D6' }
    ];
  }

  competitors.sort((a, b) => b.xp - a.xp);

  list.innerHTML = competitors.map((c, index) => {
    const rank = index + 1;
    let rankClass = `rank-${rank}`;
    if (rank > 3) rankClass = 'rank-other';

    return `
      <tr class="leaderboard-row ${c.isUser ? 'user-row' : ''} ${rankClass}">
        <td><span class="rank-badge">${rank}</span></td>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: ${c.avatarColor || '#B4A7D6'}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 10px;">
              ${(c.name || 'U').charAt(0).toUpperCase()}
            </div>
            <span>${escapeHtml(c.name)}</span>
          </div>
        </td>
        <td>${c.xp} Puan</td>
      </tr>
    `;
  }).join('');
}

// ============================================================
// SANAL MAĞAZA İŞLEMLERİ
// ============================================================
function buyStoreItem(item, price) {
  if (isLocalEnvironment()) {
    price = 0;
  }
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
  } else if (item === 'kutup-theme') {
    if (state.activeTheme === 'kutup') {
      state.activeTheme = 'light';
      document.documentElement.removeAttribute('data-theme');
      showToast('Nordic Frost teması kapatıldı.', 'info');
    } else {
      state.activeTheme = 'kutup';
      state.xp -= price;
      document.documentElement.setAttribute('data-theme', 'kutup');
      showToast('Nordic Frost teması aktif edildi! ❄️', 'success');
    }
  } else if (item === 'siber-theme') {
    if (state.activeTheme === 'siber') {
      state.activeTheme = 'light';
      document.documentElement.removeAttribute('data-theme');
      showToast('Cyberpunk Neon teması kapatıldı.', 'info');
    } else {
      state.activeTheme = 'siber';
      state.xp -= price;
      document.documentElement.setAttribute('data-theme', 'siber');
      showToast('Cyberpunk Neon teması aktif edildi! 🌌', 'success');
    }
  } else if (item === 'orman-theme') {
    if (state.activeTheme === 'orman') {
      state.activeTheme = 'light';
      document.documentElement.removeAttribute('data-theme');
      showToast('Forest Zen teması kapatıldı.', 'info');
    } else {
      state.activeTheme = 'orman';
      state.xp -= price;
      document.documentElement.setAttribute('data-theme', 'orman');
      showToast('Forest Zen teması aktif edildi! 🍂', 'success');
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

  const kutupThemeBtn = document.getElementById('buy-kutup-theme-btn');
  if (kutupThemeBtn) {
    if (state.activeTheme === 'kutup') {
      kutupThemeBtn.textContent = 'Aktif (Kapat)';
      kutupThemeBtn.classList.remove('btn-primary');
      kutupThemeBtn.classList.add('btn-secondary');
    } else {
      kutupThemeBtn.textContent = '140 Puan';
      kutupThemeBtn.classList.add('btn-primary');
      kutupThemeBtn.classList.remove('btn-secondary');
    }
  }

  const siberThemeBtn = document.getElementById('buy-siber-theme-btn');
  if (siberThemeBtn) {
    if (state.activeTheme === 'siber') {
      siberThemeBtn.textContent = 'Aktif (Kapat)';
      siberThemeBtn.classList.remove('btn-primary');
      siberThemeBtn.classList.add('btn-secondary');
    } else {
      siberThemeBtn.textContent = '180 Puan';
      siberThemeBtn.classList.add('btn-primary');
      siberThemeBtn.classList.remove('btn-secondary');
    }
  }

  const ormanThemeBtn = document.getElementById('buy-orman-theme-btn');
  if (ormanThemeBtn) {
    if (state.activeTheme === 'orman') {
      ormanThemeBtn.textContent = 'Aktif (Kapat)';
      ormanThemeBtn.classList.remove('btn-primary');
      ormanThemeBtn.classList.add('btn-secondary');
    } else {
      ormanThemeBtn.textContent = '120 Puan';
      ormanThemeBtn.classList.add('btn-primary');
      ormanThemeBtn.classList.remove('btn-secondary');
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
      const activeType = question ? ((question.type === 'fill-blank-dropdown' || question.type === 'fill-blank') ? question._dynamicType : question.type) : '';

      // Empty selection validation for word-bank questions
      if (activeType === 'word-bank' && (!selectedAnswer || selectedAnswer.length === 0)) {
        const sentenceContainer = document.getElementById('wb-sentence');
        const checkBtn = document.getElementById('btn-check');

        if (sentenceContainer) {
          sentenceContainer.classList.add('shake-anim');
          setTimeout(() => sentenceContainer.classList.remove('shake-anim'), 500);
        }
        if (checkBtn) {
          checkBtn.classList.add('shake-anim');
          setTimeout(() => checkBtn.classList.remove('shake-anim'), 500);
        }

        showToast('Lütfen kelimeleri sürükleyerek veya seçerek bir cevap oluşturun!', 'info');
        return;
      }

      const isTargetUnit = question && question.translation ? true : false;
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
        ensureLessonRendered(targetLessonId);
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
  document.getElementById('buy-kutup-theme-btn').addEventListener('click', () => buyStoreItem('kutup-theme', 140));
  document.getElementById('buy-siber-theme-btn').addEventListener('click', () => buyStoreItem('siber-theme', 180));
  document.getElementById('buy-orman-theme-btn').addEventListener('click', () => buyStoreItem('orman-theme', 120));

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
        const lessonId = isNaN(target) ? target : parseInt(target, 10);
        switchTab('lessons');
        
        setTimeout(() => {
          ensureLessonRendered(lessonId);
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

  // Scroll tab theme listener with requestAnimationFrame throttling and theme change optimization
  let updateThemeTimeout = null;
  let lastActiveUnitThemeId = null;

  const updateThemeOnScroll = () => {
    if (updateThemeTimeout) return;

    updateThemeTimeout = requestAnimationFrame(() => {
      updateThemeTimeout = null;

      const homeScreen = document.getElementById('home-screen');
      const tabLessons = document.getElementById('tab-content-lessons');
      if (!homeScreen || !homeScreen.classList.contains('active') || !tabLessons || !tabLessons.classList.contains('active')) {
        return;
      }

      const sections = document.querySelectorAll('.unit-section');
      let activeUnitId = null;
      const threshold = 82;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        if (rect.top <= threshold && rect.bottom > threshold) {
          activeUnitId = parseInt(section.dataset.unitId, 10);
          break;
        }
      }

      let targetUnitId = null;
      if (activeUnitId !== null && !isNaN(activeUnitId)) {
        targetUnitId = activeUnitId;
      } else if (sections.length > 0) {
        const firstRect = sections[0].getBoundingClientRect();
        if (firstRect.top > threshold) {
          targetUnitId = parseInt(sections[0].dataset.unitId, 10);
        }
      }

      if (targetUnitId !== null && targetUnitId !== lastActiveUnitThemeId) {
        lastActiveUnitThemeId = targetUnitId;
        setUnitTheme(targetUnitId);
      }
    });
  };

  window.addEventListener('scroll', updateThemeOnScroll);
  
  // Trigger on initial loads and tab transitions
  document.querySelectorAll('.sidebar-menu .nav-tab, .nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      setTimeout(updateThemeOnScroll, 50);
    });
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
    case 'error-spotting':
    case 'context-clue':
    case 'chain-expansion-differential':
    case 'structural-deconstruction':
    case 'vector-velocity-shift':
    case 'titan-boundary-defense':
    case 'vagon-to-suffix-match':
    case 'reverse-engineering-translation':
    case 'suffix-decapitation':
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
  if (activeType === 'multiple-choice' || activeType === 'error-spotting' || activeType === 'context-clue' || activeType === 'fill-blank-dropdown' || activeType === 'fill-blank') {
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
    const correctVal = (question.correct || question.correctAnswer || "").toLowerCase().trim();
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
    if (question.type === 'multiple-choice' || question.type === 'error-spotting' || question.type === 'context-clue' || question.type === 'fill-blank-dropdown' || question.type === 'fill-blank') {
      correctText = question.options[question.correctIndex];
    } else if (question.type === 'fill-blank-text') {
      correctText = question.correct || question.correctAnswer;
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

function getLessonQuestions(l) {
  let list = [];
  if (l.questions && Array.isArray(l.questions)) {
    list = list.concat(l.questions);
  }
  if (l.exercises && Array.isArray(l.exercises)) {
    l.exercises.forEach(ex => {
      if (ex.questions && Array.isArray(ex.questions)) {
        list = list.concat(ex.questions);
      }
    });
  }
  return list;
}

function submitReport(question, errorType, comment) {
  let reports;
  try {
    reports = JSON.parse(localStorage.getItem('amok_question_reports') || '[]');
  } catch (e) {
    console.error('Rapor veritabanı bozuk, sıfırlanıyor:', e);
    reports = [];
  }
  const questionLesson = (typeof lessons !== 'undefined') ? lessons.find(l => getLessonQuestions(l).some(q => q.id === question.id)) : null;
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
    banner.style.display = 'flex';
    const count = (state.wrongQuestions && state.wrongQuestions.length) || 0;
    btn.textContent = `Hızlı Tekrar (${count} Soru)`;
  }
}

function checkAndShowReviewPrompt() {
  // Otomatik davet modali kullanıcı isteği üzerine tamamen devre dışı bırakıldı.
  // Kullanıcı Hızlı Tekrar sınavına sadece ana sayfadaki banner üzerinden kendi isteğiyle başlayabilir.
  return;
}

function startReviewMode() {
  if (!state.wrongQuestions || state.wrongQuestions.length === 0) {
    showToast('Harika! Tekrar edilecek hatalı sorunuz bulunmamaktadır.', 'success');
    return;
  }

  quizSessionId++;
  isReviewMode = true;
  currentQuestionIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  selectedAnswer = null;
  isAnswerChecked = false;
  matchState = null;
  reviewSessionCorrectIds = []; // Reset correctly answered list for this session

  // Hata yapılan soruları veritabanından çek
  reviewQuestions = [];
  state.wrongQuestions.forEach(qId => {
    lessons.forEach(l => {
      const allQs = getLessonQuestions(l);
      const q = allQs.find(quest => quest.id === qId);
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

  // Sadece ilk 10 soruyu al (10'ar soruluk testler yapmak için)
  reviewQuestions = reviewQuestions.slice(0, 10);

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
  // Empty lessons and units filter logic
  if (typeof lessons !== 'undefined' && Array.isArray(lessons)) {
    const validLessons = lessons.filter(lesson => {
      const isNotUploaded = (!lesson.exercises || lesson.exercises.length === 0 || lesson.exercises.every(ex => !ex.questions || ex.questions.length === 0)) && (!lesson.questions || lesson.questions.length === 0);
      return !isNotUploaded;
    });
    lessons.length = 0;
    lessons.push(...validLessons);
  }
  
  if (typeof units !== 'undefined' && Array.isArray(units)) {
    const validUnits = units.filter(unit => {
      return unit.lessons.some(lId => lessons.some(l => l.id === lId));
    });
    validUnits.forEach(unit => {
      unit.lessons = unit.lessons.filter(lId => lessons.some(l => l.id === lId));
    });
    units.length = 0;
    units.push(...validUnits);
  }

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

    const addWrongBtn = document.getElementById('btn-admin-add-wrong-questions');
    if (addWrongBtn) {
      addWrongBtn.addEventListener('click', () => {
        state.wrongQuestions = state.wrongQuestions || [];
        const sampleIds = [
          "c40_l22_e1_q11",
          "c40_l24_e1_q9",
          "c40_l21_e1_q11",
          "c40_l23_e1_q11",
          "c40_l24_e1_q11"
        ];
        sampleIds.forEach(id => {
          if (!state.wrongQuestions.includes(id)) {
            state.wrongQuestions.push(id);
          }
        });
        saveState();
        checkReviewBanner();
        showToast("Hatalı sorular eklendi. Ana sayfadaki 'Hızlı Tekrar' banner'ını kullanabilirsiniz!", "success");
      });
    }

    const clearWrongBtn = document.getElementById('btn-admin-clear-wrong-questions');
    if (clearWrongBtn) {
      clearWrongBtn.addEventListener('click', () => {
        state.wrongQuestions = [];
        saveState();
        checkReviewBanner();
        showToast("Hızlı tekrar soruları sıfırlandı!", "success");
      });
    }

    // Load existing Supabase credentials
    const supabaseUrlInput = document.getElementById('admin-supabase-url');
    const supabaseAnonKeyInput = document.getElementById('admin-supabase-anon-key');
    if (supabaseUrlInput) {
      supabaseUrlInput.value = localStorage.getItem('amok_supabase_url') || '';
    }
    if (supabaseAnonKeyInput) {
      supabaseAnonKeyInput.value = localStorage.getItem('amok_supabase_anon_key') || '';
    }

    const saveSupabaseBtn = document.getElementById('btn-admin-save-supabase');
    if (saveSupabaseBtn) {
      saveSupabaseBtn.addEventListener('click', () => {
        const url = (supabaseUrlInput ? supabaseUrlInput.value : '').trim();
        const key = (supabaseAnonKeyInput ? supabaseAnonKeyInput.value : '').trim();
        localStorage.setItem('amok_supabase_url', url);
        localStorage.setItem('amok_supabase_anon_key', key);
        showToast('Supabase ayarları başarıyla kaydedildi! Sayfayı yenileyerek yeni yapılandırmayı aktif edebilirsiniz. 💾', 'success');
      });
    }

    const testSupabaseBtn = document.getElementById('btn-admin-test-supabase');
    if (testSupabaseBtn) {
      testSupabaseBtn.addEventListener('click', async () => {
        const url = (supabaseUrlInput ? supabaseUrlInput.value : '').trim();
        const key = (supabaseAnonKeyInput ? supabaseAnonKeyInput.value : '').trim();
        if (!url || !key) {
          showToast('Lütfen URL ve Anon Key giriniz!', 'error');
          return;
        }
        testSupabaseBtn.disabled = true;
        const originalText = testSupabaseBtn.innerHTML;
        testSupabaseBtn.innerHTML = '<span>⚡</span> Bağlanıyor...';
        try {
          if (typeof supabase === 'undefined') {
            throw new Error('Supabase kütüphanesi henüz yüklenmedi!');
          }
          const tempClient = supabase.createClient(url, key);
          const { data, error } = await tempClient.from('profiles').select('username').limit(1);
          if (error) throw error;
          showToast('Bağlantı Başarılı! 🎉 Veritabanı ve tablolar hazır.', 'success');
        } catch (err) {
          console.error(err);
          showToast('Bağlantı Hatası: ' + err.message, 'error');
        } finally {
          testSupabaseBtn.disabled = false;
          testSupabaseBtn.innerHTML = originalText;
        }
        });
    }

    // ============================================================
    // ADMIN: KULLANICI YÖNETİMİ
    // ============================================================
    let adminUsersCache = [];
    let adminUsersActiveTab = 'all';

    async function loadAdminUsers() {
      const listEl = document.getElementById('admin-users-list');
      const badgeEl = document.getElementById('admin-users-badge');
      if (!listEl) return;

      if (!supabaseClient) {
        listEl.innerHTML = `
          <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
            <span style="font-size: 2rem; display: block; margin-bottom: 8px;">⚠️</span>
            <p style="margin: 0; font-weight: 600;">Supabase Bağlantısı Yok</p>
            <p style="margin: 4px 0 0 0; font-size: 0.8rem;">Kullanıcıları görmek için Supabase bağlantısını yapılandırın.</p>
          </div>`;
        return;
      }

      listEl.innerHTML = `
        <div style="text-align: center; padding: 30px 20px; color: var(--text-secondary);">
          <span style="font-size: 1.5rem; display: block; margin-bottom: 8px; animation: pulse 1.5s infinite;">⏳</span>
          <p style="margin: 0; font-weight: 600;">Kullanıcılar yükleniyor...</p>
        </div>`;

      try {
        // Fetch profiles
        const { data: profiles, error: profilesError } = await supabaseClient
          .from('profiles')
          .select('username, email, created_at, last_seen_at')
          .order('created_at', { ascending: false });

        if (profilesError) throw profilesError;

        // Fetch user_states for XP/streak/hearts/progress
        const { data: states, error: statesError } = await supabaseClient
          .from('user_states')
          .select('username, xp, streak, hearts, completed_lessons, avatar_color');

        const statesMap = {};
        if (!statesError && states) {
          states.forEach(s => {
            statesMap[s.username] = s;
          });
        }

        // Merge data
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

        adminUsersCache = (profiles || []).map(p => {
          const st = statesMap[p.username] || {};
          const createdAt = p.created_at ? new Date(p.created_at) : null;
          const lastSeen = p.last_seen_at ? new Date(p.last_seen_at) : null;
          const completedCount = (st.completed_lessons || []).length;
          return {
            username: p.username,
            email: p.email || '—',
            createdAt: createdAt,
            lastSeen: lastSeen,
            xp: st.xp || 0,
            streak: st.streak || 0,
            hearts: st.hearts || 0,
            completedLessons: completedCount,
            avatarColor: st.avatar_color || '#B4A7D6',
            isNew: createdAt && createdAt >= sevenDaysAgo,
            isOnline: lastSeen && lastSeen >= fiveMinutesAgo,
            isActive24h: lastSeen && lastSeen >= twentyFourHoursAgo
          };
        });

        // Update stats
        const totalCount = adminUsersCache.length;
        const newCount = adminUsersCache.filter(u => u.isNew).length;
        const onlineCount = adminUsersCache.filter(u => u.isOnline).length;
        const activeCount = adminUsersCache.filter(u => u.isActive24h).length;

        const totalEl = document.getElementById('admin-stat-total-count');
        const newEl = document.getElementById('admin-stat-new-count');
        const onlineEl = document.getElementById('admin-stat-online-count');
        const activeEl = document.getElementById('admin-stat-active-count');
        if (totalEl) totalEl.textContent = totalCount;
        if (newEl) newEl.textContent = newCount;
        if (onlineEl) onlineEl.textContent = onlineCount;
        if (activeEl) activeEl.textContent = activeCount;
        if (badgeEl) badgeEl.textContent = `${totalCount} Kullanıcı`;

        renderAdminUsers();

      } catch (err) {
        console.error('Admin users fetch error:', err);
        listEl.innerHTML = `
          <div style="text-align: center; padding: 40px 20px; color: #ff3b30;">
            <span style="font-size: 2rem; display: block; margin-bottom: 8px;">❌</span>
            <p style="margin: 0; font-weight: 600;">Veri Yükleme Hatası</p>
            <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: var(--text-secondary);">${err.message || 'Bilinmeyen hata'}</p>
          </div>`;
      }
    }

    function renderAdminUsers() {
      const listEl = document.getElementById('admin-users-list');
      if (!listEl) return;

      let filtered = adminUsersCache;
      if (adminUsersActiveTab === 'new') {
        filtered = adminUsersCache.filter(u => u.isNew);
      } else if (adminUsersActiveTab === 'online') {
        filtered = adminUsersCache.filter(u => u.isOnline);
      }

      if (filtered.length === 0) {
        const emptyMsgs = {
          all: { icon: '👥', title: 'Henüz kullanıcı yok', desc: 'Kayıtlı kullanıcı bulunmuyor.' },
          new: { icon: '🆕', title: 'Yeni üye yok', desc: 'Son 7 günde yeni kayıt olmamış.' },
          online: { icon: '🟢', title: 'Çevrimiçi kullanıcı yok', desc: 'Şu anda aktif kullanıcı bulunmuyor.' }
        };
        const msg = emptyMsgs[adminUsersActiveTab] || emptyMsgs.all;
        listEl.innerHTML = `
          <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
            <span style="font-size: 2rem; display: block; margin-bottom: 8px;">${msg.icon}</span>
            <p style="margin: 0; font-weight: 600;">${msg.title}</p>
            <p style="margin: 4px 0 0 0; font-size: 0.8rem;">${msg.desc}</p>
          </div>`;
        return;
      }

      listEl.innerHTML = filtered.map((user, idx) => {
        const initial = (user.username || '?')[0].toUpperCase();
        const onlineDot = user.isOnline
          ? '<span style="position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; background: #22c55e; border-radius: 50%; border: 2px solid var(--bg-card); box-shadow: 0 0 4px rgba(34,197,94,0.5);"></span>'
          : '';
        const newBadge = user.isNew
          ? '<span style="background: #10b981; color: #fff; font-size: 0.6rem; padding: 1px 6px; border-radius: 4px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3px; margin-left: 6px;">YENİ</span>'
          : '';

        const lastSeenText = user.lastSeen
          ? formatTimeAgo(user.lastSeen)
          : 'Hiç giriş yapmadı';

        const createdText = user.createdAt
          ? user.createdAt.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })
          : '—';

        return `
          <div style="display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: var(--bg-body); border: 1px solid var(--border-color); border-radius: var(--radius-md); transition: all 0.15s; cursor: default;"
               onmouseover="this.style.borderColor='var(--accent-primary)'; this.style.boxShadow='0 2px 8px rgba(139,126,200,0.1)'"
               onmouseout="this.style.borderColor='var(--border-color)'; this.style.boxShadow='none'">
            <!-- Avatar -->
            <div style="position: relative; flex-shrink: 0;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background: ${user.avatarColor}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">
                ${initial}
              </div>
              ${onlineDot}
            </div>
            <!-- Info -->
            <div style="flex: 1; min-width: 0;">
              <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 4px;">
                <span style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 160px;">${user.username}</span>
                ${newBadge}
              </div>
              <div style="display: flex; align-items: center; gap: 8px; margin-top: 3px; flex-wrap: wrap;">
                <span style="font-size: 0.72rem; color: var(--text-secondary);" title="Son görülme">🕐 ${lastSeenText}</span>
                <span style="font-size: 0.72rem; color: var(--text-secondary);" title="Kayıt tarihi">📅 ${createdText}</span>
              </div>
            </div>
            <!-- Stats -->
            <div style="display: flex; gap: 10px; flex-shrink: 0; align-items: center;">
              <div style="text-align: center; min-width: 36px;" title="XP">
                <div style="font-weight: 800; font-size: 0.9rem; color: var(--accent-primary); line-height: 1;">${user.xp}</div>
                <div style="font-size: 0.6rem; color: var(--text-secondary); font-weight: 600;">XP</div>
              </div>
              <div style="text-align: center; min-width: 30px;" title="Seri">
                <div style="font-weight: 800; font-size: 0.9rem; color: #f59e0b; line-height: 1;">🔥${user.streak}</div>
              </div>
              <div style="text-align: center; min-width: 30px;" title="Tamamlanan ders">
                <div style="font-weight: 800; font-size: 0.9rem; color: #10b981; line-height: 1;">📚${user.completedLessons}</div>
              </div>
            </div>
          </div>`;
      }).join('');
    }

    function formatTimeAgo(date) {
      const now = new Date();
      const diff = now - date;
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) return 'Az önce';
      if (minutes < 60) return `${minutes} dk önce`;
      if (hours < 24) return `${hours} saat önce`;
      if (days < 7) return `${days} gün önce`;
      return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
    }

    // Tab switching
    document.querySelectorAll('.admin-users-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.admin-users-tab').forEach(t => {
          t.style.border = '1px solid var(--border-color)';
          t.style.background = 'var(--bg-body)';
          t.style.color = 'var(--text-secondary)';
          t.classList.remove('active');
        });
        tab.style.border = '1px solid var(--accent-primary)';
        tab.style.background = 'rgba(139, 126, 200, 0.12)';
        tab.style.color = 'var(--accent-primary)';
        tab.classList.add('active');
        adminUsersActiveTab = tab.dataset.adminTab;
        renderAdminUsers();
      });
    });

    // Refresh button
    const refreshUsersBtn = document.getElementById('btn-admin-refresh-users');
    if (refreshUsersBtn) {
      refreshUsersBtn.addEventListener('click', async () => {
        refreshUsersBtn.disabled = true;
        const origHTML = refreshUsersBtn.innerHTML;
        refreshUsersBtn.innerHTML = '<span>⏳</span> Yükleniyor...';
        await loadAdminUsers();
        refreshUsersBtn.disabled = false;
        refreshUsersBtn.innerHTML = origHTML;
        showToast('Kullanıcı listesi güncellendi! 🔄', 'success');
      });
    }

    // Sidebar navigation logic for admin section panels
    document.querySelectorAll('.admin-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        // Remove active class from all nav items
        document.querySelectorAll('.admin-nav-item').forEach(nav => {
          nav.style.border = '1px solid var(--border-color)';
          nav.style.background = 'var(--bg-card)';
          nav.style.color = 'var(--text-secondary)';
          nav.classList.remove('active');
        });

        // Set active to clicked item
        item.style.border = '1px solid var(--accent-primary)';
        item.style.background = 'rgba(139, 126, 200, 0.1)';
        item.style.color = 'var(--accent-primary)';
        item.classList.add('active');

        // Hide all admin panels
        document.querySelectorAll('.admin-panel').forEach(panel => {
          panel.style.display = 'none';
          panel.classList.remove('active');
        });

        // Show targets panel
        const targetSection = item.dataset.adminSection;
        const targetPanel = document.getElementById(`admin-panel-${targetSection}`);
        if (targetPanel) {
          targetPanel.style.display = 'flex';
          targetPanel.classList.add('active');
        }

        // If switching to users section, load users
        if (targetSection === 'users') {
          loadAdminUsers();
        }
      });
    });

    // Auto-load users when admin tab is opened
    const adminTabObserver = new MutationObserver(() => {
      const adminContent = document.getElementById('tab-content-admin');
      if (adminContent && adminContent.classList.contains('active')) {
        loadAdminUsers();
      }
    });
    const adminContentEl = document.getElementById('tab-content-admin');
    if (adminContentEl) {
      adminTabObserver.observe(adminContentEl, { attributes: true, attributeFilter: ['class'] });
    }

    // Initial load if admin tab is already active
    if (adminContentEl && adminContentEl.classList.contains('active')) {
      loadAdminUsers();
    }

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

  // Initialize VisualViewport API updates for keyboard / layout safety on mobile
  if (window.visualViewport) {
    const updateVV = () => {
      const vv = window.visualViewport;
      document.documentElement.style.setProperty('--vv-height', `${vv.height}px`);
      document.documentElement.style.setProperty('--vv-offsetTop', `${vv.offsetTop}px`);
    };
    window.visualViewport.addEventListener('resize', updateVV);
    window.visualViewport.addEventListener('scroll', updateVV);
    updateVV();
  }

  // Calculate top-bar height dynamically for sticky positioning alignment
  const updateTopBarHeight = () => {
    const topBar = document.querySelector('.top-bar');
    if (topBar) {
      const rect = topBar.getBoundingClientRect();
      document.documentElement.style.setProperty('--topbar-height', `${rect.height}px`);
    }
  };
  window.addEventListener('resize', updateTopBarHeight);
  window.addEventListener('load', updateTopBarHeight);
  setTimeout(updateTopBarHeight, 100);
  updateTopBarHeight();

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
  initSimulator();
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

  const explanationDictionary = {
    "gerund_infinitive_cheat": "Gerund & Infinitive Taktik Kuralı: Suggest, Insist on, It is no use, There is no point in, Have difficulty, Be used to, Get used to kalıpları kendilerinden sonra her zaman V-ing (Gerund) alırlar. Fiiller (manage, fail vb.) ise 'to V1' alarak kurulurlar.",
    "phrase_connector_desc": "Phrase Connector: Kendisinden sonra çekimli fiil barındıran tam bir cümle değil, sadece bir isim veya isim öbeği (Noun Phrase) alır.",
    "clause_connector_desc": "Clause Connector: İki tam cümleyi (öznesi ve çekimli fiili olan) birbirine bağlar.",
    "sentence_connector_desc": "Sentence Connector: Noktalama işaretlerine (genellikle nokta veya noktalı virgül ve ardından virgül) bağlı olarak iki bağımsız cümleyi birbirine bağlar.",
    "timeline_master_cheat": "Zaman ve Kronoloji Taktik Kuralı: Zaman bağlaçlarının içinde 'will/would' kullanılmaz; 'By the time + V2' yapısı ana cümlede 'Had V3' gerektirir; durum bildiren stative verb'ler (contain, belong vb.) continuous (-ing) takısı almaz.",
    "dialogue_matrix_cheat": "Diyalog ve Mülakat Taktik Kuralı: 'such as' ile örnekleme yaparken araya virgül konulmaz; olumsuz onaylamalar 'Neither + yardımcı fiil + özne' şeklinde kurulur; 'What' ile başlayan mülakat sorularına 'Well...' duraksama ünlemiyle başlamak yaygın bir akıcılık refleksidir.",
    "noun_phrase_tactic": "İsim ve Edat Takımı Taktik Kuralı: İngilizce'de edatsız isim zincirleri soldan sağa çözülürken, edatlı (of, from, in vb.) tamlamalar Türkçe'ye sağdan sola doğru zincirleme olarak çevrilir. Niteleyen edat grubu ismin sağında yer alır.",
    "perfect_modal_reflector": "Perfect & Continuous Modals Refleks Kuralı: 'should have done' pişmanlık/sitem (yapmalıydı ama yapmadı), 'must have done' güçlü geçmiş tahmin (yapmış olmalı), 'can't have done' geçmiş imkansızlık (yapmış olamaz), 'should be doing' şimdiki sitem (şu an yapıyor olması gerekirdi ama yapmıyor), 'must have been doing' geçmiş süreç tahmini (bir süredir yapıyor olmalıydı/yapıyordu herhalde) ifade eder.",
    "perfect_shift_matrix": "Perfect Shift Matrix Refleks Kuralı: 'likely to have done' (yapmış olması muhtemel), 'was/were to have done' (yapmış olması planlanmıştı - ama olmadı), 'supposed to have done' (yapmış olması gerekiyordu - ama yapmadı), 'must have been doing' (yapıyor olmalıydı - süreç çıkarımı), 'couldn't/can't have done' (yapmış olamaz), 'had to do' (yapmak zorunda kaldı), 'had been supposed to do' (yapması beklenmekteydi/beklenmişti)."
  };

  const preDefinedExplanation = question.explanation || 
                                (question.explanationKey ? explanationDictionary[question.explanationKey] : '') || 
                                '';

  const isMC = question.type === 'multiple-choice' || question.type === 'error-spotting' || question.type === 'context-clue';

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
      correctWord = (question.correct || question.correctAnswer || (question.options && question.options[question.correctIndex]) || "").toLowerCase().trim();
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

// ============================================================
// VAGON SİMÜLATÖRÜ (THE TRAIN MECHANIC) DATA & CONTROLLER
// ============================================================
let selectedLevel = 1;
let activeMissionId = "mission_1";
let completedMissions = [];
let deactivatedWagons = [];
let selectedMissionOption = null;
let showMissionQuestion = false;

const simulatorData = {
  "levels": [
    {
      "level": 1,
      "title": "Durum Kilitlenmesi (Sıfır Eylem)",
      "english_sentence": "This is the tablet.",
      "wagon_chain": [
        { "word": "This", "role": "subject", "color": "#1f2937" },
        { "word": "is", "role": "status_linker", "color": "#3b82f6", "suffix_tr": "-dir/-dır" },
        { "word": "the tablet.", "role": "object", "color": "#1f2937" }
      ],
      "turkish_reflex": "Bu tablettir.",
      "turkish_reflex_colored": "Bu tablet<span style=\"color:#3b82f6; font-weight:800;\">tir</span>.",
      "mechanic_note": "Yardımcı eylem (copula) kullanımıyla kurulan durum bildiren (stative) ve eylemsiz cümle yapısıdır. Özne ile nesne arasındaki statik ilişkiyi tanımlar."
    },
    {
      "level": 2,
      "title": "Simple Past Passive (2 Vagon)",
      "english_sentence": "Ancient tablets were read.",
      "wagon_chain": [
        { "word": "Ancient tablets", "role": "subject", "color": "#1f2937" },
        { "word": "were", "role": "past_tense", "color": "#3b82f6", "suffix_tr": "-di/-dı" },
        { "word": "read.", "role": "main_verb_v3", "color": "#f59e0b", "suffix_tr": "oku-n-" }
      ],
      "turkish_reflex": "Antik tabletler okundu.",
      "turkish_reflex_colored": "Antik tabletler <span style=\"color:#f59e0b; font-weight:800;\">okun</span><span style=\"color:#3b82f6; font-weight:800;\">du</span>.",
      "mechanic_note": "Geçmiş zaman edilgen (Past Simple Passive) yapısıdır. Geçmişte tamamlenmiş ve etkisini yitirmiş edilgen bir eylemi ifade etmek için kullanılır."
    },
    {
      "level": 3,
      "title": "Simple Future Passive (2 Vagon)",
      "english_sentence": "Ancient tablets will be read.",
      "wagon_chain": [
        { "word": "Ancient tablets", "role": "subject", "color": "#1f2937" },
        { "word": "will be", "role": "future_passive", "color": "#3b82f6", "suffix_tr": "-acak/-ecek" },
        { "word": "read.", "role": "main_verb_v3", "color": "#f59e0b", "suffix_tr": "oku-n-" }
      ],
      "turkish_reflex": "Antik tabletler okunacak.",
      "turkish_reflex_colored": "Antik tabletler <span style=\"color:#f59e0b; font-weight:800;\">okun</span><span style=\"color:#3b82f6; font-weight:800;\">acak</span>.",
      "mechanic_note": "Gelecek zaman edilgen (Future Simple Passive) yapısıdır. Gelecekte gerçekleşecek olan edilgen bir eylemi ve özne üzerindeki etkisini bildirir."
    },
    {
      "level": 4,
      "title": "Present Continuous Passive (3 Vagon)",
      "english_sentence": "Ancient tablets are being read.",
      "wagon_chain": [
        { "word": "Ancient tablets", "role": "subject", "color": "#1f2937" },
        { "word": "are", "role": "present_tense", "color": "#3b82f6", "suffix_tr": "-dir" },
        { "word": "being", "role": "continuous_motor", "color": "#10b981", "suffix_tr": "-makta/-mekte" },
        { "word": "read.", "role": "main_verb_v3", "color": "#f59e0b", "suffix_tr": "oku-n-" }
      ],
      "turkish_reflex": "Antik tabletler okunmaktadır.",
      "turkish_reflex_colored": "Antik tabletler <span style=\"color:#f59e0b; font-weight:800;\">okun</span><span style=\"color:#10b981; font-weight:800;\">makta</span><span style=\"color:#3b82f6; font-weight:800;\">dır</span>.",
      "mechanic_note": "Şimdiki zaman süreç edilgeni (Present Continuous Passive) yapısıdır. Yardımcı fiil (are), süreç belirteci (being) ve fiilin 3. hali (V3) kullanılarak, eylemin konuşma anında devam ettiğini gösterir."
    },
    {
      "level": 5,
      "title": "Past Continuous Passive (3 Vagon)",
      "english_sentence": "Ancient tablets were being read.",
      "wagon_chain": [
        { "word": "Ancient tablets", "role": "subject", "color": "#1f2937" },
        { "word": "were", "role": "past_tense", "color": "#3b82f6", "suffix_tr": "-di/-aydı" },
        { "word": "being", "role": "continuous_motor", "color": "#10b981", "suffix_tr": "-makta" },
        { "word": "read.", "role": "main_verb_v3", "color": "#f59e0b", "suffix_tr": "oku-n-" }
      ],
      "turkish_reflex": "Antik tabletler okunmaktaydı.",
      "turkish_reflex_colored": "Antik tabletler <span style=\"color:#f59e0b; font-weight:800;\">okun</span><span style=\"color:#10b981; font-weight:800;\">makta</span><span style=\"color:#3b82f6; font-weight:800;\">ydı</span>.",
      "mechanic_note": "Geçmiş zaman süreç edilgeni (Past Continuous Passive) yapısıdır. Geçmişte belirli bir zaman aralığında kesintisiz devam etmiş olan edilgen bir süreci ifade eder."
    },
    {
      "level": 6,
      "title": "Present Perfect Passive (3 Vagon)",
      "english_sentence": "Ancient tablets have been read.",
      "wagon_chain": [
        { "word": "Ancient tablets", "role": "subject", "color": "#1f2937" },
        { "word": "have", "role": "perfect_bridge", "color": "#3b82f6", "suffix_tr": "çoktan" },
        { "word": "been", "role": "perfect_passive", "color": "#ec4899", "suffix_tr": "-di" },
        { "word": "read.", "role": "main_verb_v3", "color": "#f59e0b", "suffix_tr": "oku-n-" }
      ],
      "turkish_reflex": "Antik tabletler çoktan okundu.",
      "turkish_reflex_colored": "Antik tabletler <span style=\"color:#3b82f6; font-weight:800;\">çoktan</span> <span style=\"color:#f59e0b; font-weight:800;\">okun</span><span style=\"color:#ec4899; font-weight:800;\">du</span>.",
      "mechanic_note": "Yakın geçmiş zaman edilgen (Present Perfect Passive) yapısıdır. Eylemin geçmişte tamamlandığını ancak etkisinin referans anında (şimdiki zamanda) sürdüğünü ifade eder."
    },
    {
      "level": 7,
      "title": "Past Perfect Passive (3 Vagon)",
      "english_sentence": "Ancient tablets had been read.",
      "wagon_chain": [
        { "word": "Ancient tablets", "role": "subject", "color": "#1f2937" },
        { "word": "had", "role": "perfect_bridge", "color": "#3b82f6", "suffix_tr": "zaten" },
        { "word": "been", "role": "perfect_passive", "color": "#ec4899", "suffix_tr": "-mişti" },
        { "word": "read.", "role": "main_verb_v3", "color": "#f59e0b", "suffix_tr": "oku-n-" }
      ],
      "turkish_reflex": "Antik tabletler zaten okunmuştu.",
      "turkish_reflex_colored": "Antik tabletler <span style=\"color:#3b82f6; font-weight:800;\">zaten</span> <span style=\"color:#f59e0b; font-weight:800;\">okun</span><span style=\"color:#ec4899; font-weight:800;\">muştu</span>.",
      "mechanic_note": "Öncelik-sonralık ilişkisi kuran geçmiş zaman edilgen (Past Perfect Passive) yapısıdır. Geçmişteki başka bir eylem veya referans noktasından daha önce tamamlenmiş olan edilgen eylemleri tanımlar."
    },
    {
      "level": 8,
      "title": "Future Perfect Passive (4 Vagon)",
      "english_sentence": "Ancient tablets will have been read.",
      "wagon_chain": [
        { "word": "Ancient tablets", "role": "subject", "color": "#1f2937" },
        { "word": "will", "role": "future_locomotive", "color": "#3b82f6", "suffix_tr": "olacak" },
        { "word": "have been", "role": "perfect_passive", "color": "#ec4899", "suffix_tr": "-miş" },
        { "word": "read.", "role": "main_verb_v3", "color": "#f59e0b", "suffix_tr": "oku-n-" }
      ],
      "turkish_reflex": "Antik tabletler okunmuş olacak.",
      "turkish_reflex_colored": "Antik tabletler <span style=\"color:#f59e0b; font-weight:800;\">okun</span><span style=\"color:#ec4899; font-weight:800;\">muş</span> <span style=\"color:#3b82f6; font-weight:800;\">olacak</span>.",
      "mechanic_note": "Gelecekte tamamlanmışlık edilgen (Future Perfect Passive) yapısıdır. Gelecekte belirlenen bir zaman sınırından önce tamamlenmiş olacak edilgen durumları projeksiyon olarak sunar."
    },
    {
      "level": 9,
      "title": "Future Perfect Continuous Passive (5 Vagon - Saf Zaman Tavanı)",
      "english_sentence": "Ancient tablets will have been being read.",
      "wagon_chain": [
        { "word": "Ancient tablets", "role": "subject", "color": "#1f2937" },
        { "word": "will", "role": "future", "color": "#3b82f6", "suffix_tr": "-acak" },
        { "word": "have", "role": "perfect", "color": "#3b82f6", "suffix_tr": "olmuş" },
        { "word": "been", "role": "stabilizer", "color": "#ec4899", "suffix_tr": "ol-" },
        { "word": "being", "role": "continuous", "color": "#10b981", "suffix_tr": "-makta" },
        { "word": "read.", "role": "main_verb_v3", "color": "#f59e0b", "suffix_tr": "oku-n-" }
      ],
      "turkish_reflex": "Antik tabletler okunmakta olmuş olacak.",
      "turkish_reflex_colored": "Antik tabletler <span style=\"color:#f59e0b; font-weight:800;\">okun</span><span style=\"color:#10b981; font-weight:800;\">makta</span> <span style=\"color:#ec4899; font-weight:800;\">ol</span><span style=\"color:#3b82f6; font-weight:800;\">muş olacak</span>.",
      "mechanic_note": "Gelecekte süregelen bitmişlik edilgen (Future Perfect Continuous Passive) yapısıdır. Gelecekte belirli bir ana kadar sürecek olan edilgen eylem akışını ifade eden en karmaşık morfolojik dizilimlerden biridir."
    },
    {
      "level": 10,
      "title": "Olasılık Kalkanı (6 Vagon)",
      "english_sentence": "Ancient tablets are likely to have been read.",
      "wagon_chain": [
        { "word": "Ancient tablets", "role": "subject", "color": "#1f2937" },
        { "word": "are likely", "role": "probability_shield", "color": "#ec4899", "suffix_tr": "muhtemeldir" },
        { "word": "to have been", "role": "past_shift", "color": "#10b981", "suffix_tr": "-miş olması" },
        { "word": "read.", "role": "main_verb_v3", "color": "#f59e0b", "suffix_tr": "oku-n-" }
      ],
      "turkish_reflex": "Antik tabletlerin okunmuş olması muhtemeldir.",
      "turkish_reflex_colored": "Antik tabletlerin <span style=\"color:#f59e0b; font-weight:800;\">okun</span><span style=\"color:#10b981; font-weight:800;\">muş olması</span> <span style=\"color:#ec4899; font-weight:800;\">muhtemeldir</span>.",
      "mechanic_note": "Sıfat ve infinitive (adjective + perfect passive infinitive) birleşimidir. 'be likely to + have been V3' kalıbı, geçmişteki edilgen eyleme yönelik güçlü bir olasılık bildirir."
    },
    {
      "level": 11,
      "title": "Söylenti Kalkanı (7 Vagon)",
      "english_sentence": "Ancient tablets are rumored to have been being read.",
      "wagon_chain": [
        { "word": "Ancient tablets", "role": "subject", "color": "#1f2937" },
        { "word": "are rumored", "role": "rumor_shield", "color": "#ec4899", "suffix_tr": "söyleniyor" },
        { "word": "to have been being", "role": "past_continuous_motor", "color": "#10b981", "suffix_tr": "-makta olduğu" },
        { "word": "read.", "role": "main_verb_v3", "color": "#f59e0b", "suffix_tr": "oku-n-" }
      ],
      "turkish_reflex": "Antik tabletlerin okunmakta olduğu söyleniyor.",
      "turkish_reflex_colored": "Antik tabletlerin <span style=\"color:#f59e0b; font-weight:800;\">okun</span><span style=\"color:#10b981; font-weight:800;\">makta olduğu</span> <span style=\"color:#ec4899; font-weight:800;\">söyleniyor</span>.",
      "mechanic_note": "Kişisiz edilgen (Impersonal Passive) ve perfect continuous passive infinitive kalıbıdır. 'be rumored to have been being V3' yapısı, eylemin hem başkaları tarafından iddia edildiğini hem de geçmişte bir süreç olarak sürdüğünü ifade eder."
    },
    {
      "level": 12,
      "title": "Çift Zaman Kayması (8 Vagon - Titan Sınırı)",
      "english_sentence": "Ancient tablets could have been expected to have been read.",
      "wagon_chain": [
        { "word": "Ancient tablets", "role": "subject", "color": "#1f2937" },
        { "word": "could have been", "role": "past_possibility", "color": "#3b82f6", "suffix_tr": "mümkündü" },
        { "word": "expected", "role": "expectation_shield", "color": "#ec4899", "suffix_tr": "beklenmiş olabilmesi" },
        { "word": "to have been", "role": "deep_past", "color": "#10b981", "suffix_tr": "-miş olmasının" },
        { "word": "read.", "role": "main_verb_v3", "color": "#f59e0b", "suffix_tr": "oku-n-" }
      ],
      "turkish_reflex": "Antik tabletlerin okunmuş olmasının beklenmiş olabilmesi mümkündü.",
      "turkish_reflex_colored": "Antik tabletlerin <span style=\"color:#f59e0b; font-weight:800;\">okun</span><span style=\"color:#10b981; font-weight:800;\">muş olmasının</span> <span style=\"color:#ec4899; font-weight:800;\">beklenmiş olabilmesi</span> <span style=\"color:#3b82f6; font-weight:800;\">mümkündü</span>.",
      "mechanic_note": "Kazanılmış/varsayımsal geçmiş zaman modal edilgen yapısıdır (double perfect shift). Geçmişte gerçekleşmeyen bir beklentinin edilgenliğini, 'could have been expected' ve 'to have been V3' yapılarının ardışık dizilimiyle kurar."
    }
  ]
};

const labMissions = [
  {
    "id": "mission_1",
    "level_target": 7,
    "task_title": "Görev 1: Süreç Motorunu Sabote Et!",
    "instructions": "Level 7 trenini aktif edin. Ardından ekrandaki yeşil kodlu [being] vagonunu sanal makasla kesin (devre dışı bırakın).",
    "validation_trigger": "being_inactive",
    "target_word": "being",
    "question": "Yeşil [being] vagonu trenden söküldüğünde, Türkçe ek fabrikasındaki hangi hayati ek imha oldu ve yeni cümle neye dönüştü?",
    "options": [
      "'-makta' (süreç) eki imha oldu; cümle 'Metinler okunmuş olacak' anlık edilgenliğine düştü.",
      "'-acak' (gelecek zaman) eki imha oldu; cümle geçmiş zamana kaydı.",
      "Edilgenlik tamamen çöktü; cümle aktif bir emir kipine evrildi."
    ],
    "correctIndex": 0
  },
  {
    "id": "mission_2",
    "level_target": 9,
    "task_title": "Görev 2: Kurumsal Koruma Kalkanını Kaldır!",
    "instructions": "Level 9 trenini aktif edin. Yazarın sorumluluktan kaçmasını sağlayan pembe [rumored] vagonunu devre dışı bırakın.",
    "validation_trigger": "rumored_inactive",
    "target_word": "are rumored",
    "question": "Pembe [rumored] kalkanı söküldüğünde, Türkçe çevirinin sonundaki hangi 'sabit tuğla' düşer?",
    "options": [
      "'-söyleniyor' (söylenti) tuğlası düşer ve eylem 'yağmalanmaktaydı' geçmiş süreç zeminine basar.",
      "'-mış olması' (geçmişe kaydırma) tuğlası düşer.",
      "Cümledeki 'veya' bağlacı tamamen kopar."
    ],
    "correctIndex": 0
  },
  {
    "id": "mission_3",
    "level_target": 10,
    "task_title": "Görev 3: Limitleri Zorla!",
    "instructions": "Level 10 treni etkinken en sondaki '+' butonuna tıklayarak 9. vagonu (by the time...) eklemeye çalışın.",
    "validation_trigger": "glitch_active",
    "target_word": null,
    "question": "Trenin 9. vagonu kabul etmemesinin ve işlemci aşırı yüklenme hatası vermesinin dildeki gerçek sebebi nedir?",
    "options": [
      "İngilizce sentaksta modalsız kurulabilecek maksimum vagon (yardımcı fiil) sayısının 8 olması ve 9 vagonlu bir zincirin mantıksız olması.",
      "Vagonun renk kodunun kırmızı olması.",
      "Tarayıcı bellek sınırının aşılmış olması."
    ],
    "correctIndex": 0
  }
];

function negateTurkishReflex(text) {
  let res = text;
  
  // Stative Copula
  res = res.replace(/tablettir\./g, 'tablet değildir.');
  res = res.replace(/tablet<span style="color:#3b82f6; font-weight:800;">tir<\/span>\./g, 'tablet <span style="color:#3b82f6; font-weight:800;">değildir<\/span>.');
  res = res.replace(/senaryodur\./g, 'senaryo değildir.');
  res = res.replace(/senaryo<span style="color:#3b82f6; font-weight:800;">dur<\/span>\./g, 'senaryo <span style="color:#3b82f6; font-weight:800;">değildir<\/span>.');
  res = res.replace(/endekstir\./g, 'endeks değildir.');
  res = res.replace(/endeks<span style="color:#3b82f6; font-weight:800;">tir<\/span>\./g, 'endeks <span style="color:#3b82f6; font-weight:800;">değildir<\/span>.');
  res = res.replace(/sınıftır\./g, 'sınıf değildir.');
  res = res.replace(/sınıf<span style="color:#3b82f6; font-weight:800;">tır<\/span>\./g, 'sınıf <span style="color:#3b82f6; font-weight:800;">değildir<\/span>.');

  // Simple Past Passives (di -> madı / medi)
  res = res.replace(/okundu\./g, 'okunmadı.');
  res = res.replace(/okun<\/span><span style="color:#3b82f6; font-weight:800;">du<\/span>\./g, 'okun<\/span><span style="color:#3b82f6; font-weight:800;">madı<\/span>.');
  res = res.replace(/gösterildi\./g, 'gösterilmedi.');
  res = res.replace(/gösteril<\/span><span style="color:#3b82f6; font-weight:800;">di<\/span>\./g, 'gösteril<\/span><span style="color:#3b82f6; font-weight:800;">medi<\/span>.');
  res = res.replace(/ayarlandı\./g, 'ayarlanmadı.');
  res = res.replace(/ayarlan<\/span><span style="color:#3b82f6; font-weight:800;">dı<\/span>\./g, 'ayarlan<\/span><span style="color:#3b82f6; font-weight:800;">madı<\/span>.');
  res = res.replace(/zorlandı\./g, 'zorlanmadı.');
  res = res.replace(/zorlan<\/span><span style="color:#3b82f6; font-weight:800;">dı<\/span>\./g, 'zorlan<\/span><span style="color:#3b82f6; font-weight:800;">madı<\/span>.');

  // Future Passives (acak/ecek -> mayacak/meyecek)
  res = res.replace(/korunacak\./g, 'korunmayacak.');
  res = res.replace(/korun<\/span><span style="color:#3b82f6; font-weight:800;">acak<\/span>\./g, 'korun<\/span><span style="color:#3b82f6; font-weight:800;">mayacak<\/span>.');
  res = res.replace(/sansürlenecek\./g, 'sansürlenmeyecek.');
  res = res.replace(/sansürlen<\/span><span style="color:#3b82f6; font-weight:800;">ecek<\/span>\./g, 'sansürlen<\/span><span style="color:#3b82f6; font-weight:800;">meyecek<\/span>.');
  res = res.replace(/izlenecek\./g, 'izlenmeyecek.');
  res = res.replace(/izlen<\/span><span style="color:#3b82f6; font-weight:800;">ecek<\/span>\./g, 'izlen<\/span><span style="color:#3b82f6; font-weight:800;">meyecek<\/span>.');
  res = res.replace(/marjinalleştirilecek\./g, 'marjinalleştirilmeyecek.');
  res = res.replace(/marjinalleştiril<\/span><span style="color:#3b82f6; font-weight:800;">ecek<\/span>\./g, 'marjinalleştiril<\/span><span style="color:#3b82f6; font-weight:800;">meyecek<\/span>.');

  // Continuous Passives (makta/mekte -> mamakta/memekte)
  res = res.replace(/makta/g, 'mamakta');
  res = res.replace(/mekte/g, 'memekte');
  
  // Perfect Passives (çoktan -> henüz, zaten -> henüz, di -> madı,mişti -> memişti)
  res = res.replace(/çoktan/g, 'henüz');
  res = res.replace(/zaten/g, 'henüz');
  
  res = res.replace(/düşürüldü\./g, 'düşürülmedi.');
  res = res.replace(/asimile edildi\./g, 'asimile edilmedi.');
  
  res = res.replace(/okunmuştu\./g, 'okunmamıştı.');
  res = res.replace(/okun<\/span><span style="color:#ec4899; font-weight:800;">muştu<\/span>\./g, 'okun<\/span><span style="color:#ec4899; font-weight:800;">mamıştı<\/span>.');
  res = res.replace(/kesilmişti\./g, 'kesilmemişti.');
  res = res.replace(/kesil<\/span><span style="color:#ec4899; font-weight:800;">mişti<\/span>\./g, 'kesil<\/span><span style="color:#ec4899; font-weight:800;">memişti<\/span>.');
  res = res.replace(/düşürülmüştü\./g, 'düşürülmemişti.');
  res = res.replace(/düşürül<\/span><span style="color:#ec4899; font-weight:800;">müştü<\/span>\./g, 'düşürül<\/span><span style="color:#ec4899; font-weight:800;">memişti<\/span>.');
  res = res.replace(/düşürülmüştür\./g, 'düşürülmemişti.');
  res = res.replace(/asimile edilmişti\./g, 'asimile edilmemişti.');
  res = res.replace(/asimile edil<\/span><span style="color:#ec4899; font-weight:800;">mişti<\/span>\./g, 'asimile edil<\/span><span style="color:#ec4899; font-weight:800;">memişti<\/span>.');

  // Level 8 Future Perfect Passive: miş olacak -> memiş olacak
  res = res.replace(/miş olacak\./g, 'memiş olacak.');
  res = res.replace(/miş<\/span> <span style="color:#3b82f6; font-weight:800;">olacak<\/span>\./g, 'memiş<\/span> <span style="color:#3b82f6; font-weight:800;">olacak<\/span>.');

  // Level 10 probability shift
  res = res.replace(/yorumlanmış olması/g, 'yorumlanmamış olması');
  res = res.replace(/yorumlan<\/span><span style="color:#10b981; font-weight:800;">mış olması<\/span>/g, 'yorumlan<\/span><span style="color:#10b981; font-weight:800;">mamış olması<\/span>');
  res = res.replace(/restore edilmiş olması/g, 'restore edilmemiş olması');
  res = res.replace(/restore edil<\/span><span style="color:#10b981; font-weight:800;">miş olması<\/span>/g, 'restore edil<\/span><span style="color:#10b981; font-weight:800;">memiş olması<\/span>');
  res = res.replace(/ayarlanmış olması/g, 'ayarlanmamış olması');
  res = res.replace(/ayarlan<\/span><span style="color:#10b981; font-weight:800;">mış olması<\/span>/g, 'ayarlan<\/span><span style="color:#10b981; font-weight:800;">mamış olması<\/span>');
  res = res.replace(/yapılandırılmış olması/g, 'yapılandırılmamış olması');
  res = res.replace(/yapılandırıl<\/span><span style="color:#10b981; font-weight:800;">mış olması<\/span>/g, 'yapılandırıl<\/span><span style="color:#10b981; font-weight:800;">memiş olması<\/span>');

  // Level 12 double perfect shift
  res = res.replace(/mümkündü\./g, 'mümkün değildi.');
  res = res.replace(/mümkündü<\/span>\./g, 'mümkün değildi<\/span>.');

  return res;
}

function activeTurkishReflex(text) {
  let res = text;
  
  // Okundu -> Okudu
  res = res.replace(/okundu/g, 'okudu');
  res = res.replace(/okun<\/span><span style="color:#3b82f6; font-weight:800;">du<\/span>/g, 'oku<\/span><span style="color:#3b82f6; font-weight:800;">du<\/span>');
  res = res.replace(/okun<\/span><span style="color:#ec4899; font-weight:800;">du<\/span>/g, 'oku<\/span><span style="color:#ec4899; font-weight:800;">du<\/span>');
  res = res.replace(/okun<\/span><span style="color:#f59e0b; font-weight:800;">du<\/span>/g, 'oku<\/span><span style="color:#f59e0b; font-weight:800;">du<\/span>');
  
  // Gösterildi -> Gösterdi
  res = res.replace(/gösterildi/g, 'gösterdi');
  res = res.replace(/gösteril<\/span><span style="color:#3b82f6; font-weight:800;">di<\/span>/g, 'göster<\/span><span style="color:#3b82f6; font-weight:800;">di<\/span>');
  res = res.replace(/gösteril<\/span><span style="color:#ec4899; font-weight:800;">di<\/span>/g, 'göster<\/span><span style="color:#ec4899; font-weight:800;">di<\/span>');
  
  // Ayarlandı -> Ayarladı
  res = res.replace(/ayarlandı/g, 'ayarladı');
  res = res.replace(/ayarlan<\/span><span style="color:#3b82f6; font-weight:800;">dı<\/span>/g, 'ayarla<\/span><span style="color:#3b82f6; font-weight:800;">dı<\/span>');
  res = res.replace(/ayarlan<\/span><span style="color:#ec4899; font-weight:800;">dı<\/span>/g, 'ayarla<\/span><span style="color:#ec4899; font-weight:800;">dı<\/span>');

  // Zorlandı -> Zorladı
  res = res.replace(/zorlandı/g, 'zorladı');
  res = res.replace(/zorlan<\/span><span style="color:#3b82f6; font-weight:800;">dı<\/span>/g, 'zorla<\/span><span style="color:#3b82f6; font-weight:800;">dı<\/span>');
  
  // Korunacak -> Koruyacak
  res = res.replace(/korunacak/g, 'koruyacak');
  res = res.replace(/korun<\/span><span style="color:#3b82f6; font-weight:800;">acak<\/span>/g, 'koruy<\/span><span style="color:#3b82f6; font-weight:800;">acak<\/span>');
  
  // Sansürlenecek -> Sansürleyecek
  res = res.replace(/sansürlenecek/g, 'sansürleyecek');
  res = res.replace(/sansürlen<\/span><span style="color:#3b82f6; font-weight:800;">ecek<\/span>/g, 'sansürley<\/span><span style="color:#3b82f6; font-weight:800;">ecek<\/span>');
  
  // İzlenecek -> İzleyecek
  res = res.replace(/izlenecek/g, 'izleyecek');
  res = res.replace(/izlen<\/span><span style="color:#3b82f6; font-weight:800;">ecek<\/span>/g, 'izley<\/span><span style="color:#3b82f6; font-weight:800;">ecek<\/span>');
  
  // Marjinalleştirilecek -> Marjinalleştirecek
  res = res.replace(/marjinalleştirilecek/g, 'marjinalleştirecek');
  res = res.replace(/marjinalleştiril<\/span><span style="color:#3b82f6; font-weight:800;">ecek<\/span>/g, 'marjinalleştire<\/span><span style="color:#3b82f6; font-weight:800;">cek<\/span>');

  // Korunmaktadır -> Korumaktadır, Korunmaktaydı -> Korumaktaydı
  res = res.replace(/korunmak/g, 'korumak');
  res = res.replace(/korun<\/span><span style="color:#10b981; font-weight:800;">makta<\/span>/g, 'koru<\/span><span style="color:#10b981; font-weight:800;">makta<\/span>');
  
  // Sansürlenmektedir -> Sansürlemektedir, Sansürlenmekteydi -> Sansürlemekteydi
  res = res.replace(/sansürlenmek/g, 'sansürlemek');
  res = res.replace(/sansürlen<\/span><span style="color:#10b981; font-weight:800;">mekte<\/span>/g, 'sansürle<\/span><span style="color:#10b981; font-weight:800;">mekte<\/span>');
  
  // İzlenmektedir -> İzlemektedir, İzlenmekteydi -> İzlemekteydi
  res = res.replace(/izlenmak/g, 'izlemek');
  res = res.replace(/izlenmek/g, 'izlemek');
  res = res.replace(/izlen<\/span><span style="color:#10b981; font-weight:800;">makta<\/span>/g, 'izle<\/span><span style="color:#10b981; font-weight:800;">mekte<\/span>');
  
  // Marjinalleştirilmektedir -> Marjinalleştirmektedir, Marjinalleştirilmekteydi -> Marjinalleştirmekteydi
  res = res.replace(/marjinalleştirilmak/g, 'marjinalleştirmek');
  res = res.replace(/marjinalleştirilmek/g, 'marjinalleştirmek');
  res = res.replace(/marjinalleştiril<\/span><span style="color:#10b981; font-weight:800;">makta<\/span>/g, 'marjinalleştire<\/span><span style="color:#10b981; font-weight:800;">mekte<\/span>');

  // Düşürüldü -> Düşürdü
  res = res.replace(/düşürüldü/g, 'düşürdü');
  res = res.replace(/düşürül<\/span><span style="color:#ec4899; font-weight:800;">dü<\/span>/g, 'düşür<\/span><span style="color:#ec4899; font-weight:800;">dü<\/span>');

  // Asimile edildi -> Asimile etti
  res = res.replace(/asimile edildi/g, 'asimile etti');
  res = res.replace(/asimile edil<\/span><span style="color:#ec4899; font-weight:800;">di<\/span>/g, 'asimile et<\/span><span style="color:#ec4899; font-weight:800;">ti<\/span>');

  // Kesildi -> Kesti
  res = res.replace(/kesildi/g, 'kesti');
  res = res.replace(/kesil<\/span><span style="color:#ec4899; font-weight:800;">di<\/span>/g, 'kes<\/span><span style="color:#ec4899; font-weight:800;">ti<\/span>');

  // Zaten ...mişti -> Zaten ...mişti (but active)
  res = res.replace(/okunmuştu/g, 'okumuştu');
  res = res.replace(/okun<\/span><span style="color:#ec4899; font-weight:800;">muştu<\/span>/g, 'oku<\/span><span style="color:#ec4899; font-weight:800;">muştu<\/span>');
  res = res.replace(/kesilmişti/g, 'kesmişti');
  res = res.replace(/kesil<\/span><span style="color:#ec4899; font-weight:800;">mişti<\/span>/g, 'kes<\/span><span style="color:#ec4899; font-weight:800;">mişti<\/span>');
  res = res.replace(/düşürülmüştü/g, 'düşürmüştü');
  res = res.replace(/düşürül<\/span><span style="color:#ec4899; font-weight:800;">müştü<\/span>/g, 'düşür<\/span><span style="color:#ec4899; font-weight:800;">müştü<\/span>');
  res = res.replace(/asimile edilmişti/g, 'asimile etmişti');
  res = res.replace(/asimile edil<\/span><span style="color:#ec4899; font-weight:800;">mişti<\/span>/g, 'asimile et<\/span><span style="color:#ec4899; font-weight:800;">mişti<\/span>');

  // Restore edilmiş -> Restore etmiş
  res = res.replace(/restore edilmiş/g, 'restore etmiş');
  res = res.replace(/restore edil<\/span><span style="color:#ec4899; font-weight:800;">miş<\/span>/g, 'restore et<\/span><span style="color:#ec4899; font-weight:800;">miş<\/span>');
  res = res.replace(/restore edil<\/span><span style="color:#10b981; font-weight:800;">miş/g, 'restore et<\/span><span style="color:#10b981; font-weight:800;">miş');

  // Dijitalleştirilmiş -> Dijitalleştirmiş
  res = res.replace(/dijitalleştirilmiş/g, 'dijitalleştirmiş');
  res = res.replace(/dijitalleştiril<\/span><span style="color:#ec4899; font-weight:800;">miş<\/span>/g, 'dijitalleştir<\/span><span style="color:#ec4899; font-weight:800;">miş<\/span>');
  res = res.replace(/dijitalleştiril<\/span><span style="color:#10b981; font-weight:800;">miş/g, 'dijitalleştir<\/span><span style="color:#10b981; font-weight:800;">miş');

  // Manipüle edilmiş -> Manipüle etmiş
  res = res.replace(/manipüle edilmiş/g, 'manipüle etmiş');
  res = res.replace(/manipüle edil<\/span><span style="color:#ec4899; font-weight:800;">miş<\/span>/g, 'manipüle et<\/span><span style="color:#ec4899; font-weight:800;">miş<\/span>');
  res = res.replace(/manipüle edil<\/span><span style="color:#10b981; font-weight:800;">miş/g, 'manipüle et<\/span><span style="color:#10b981; font-weight:800;">miş');

  // Asimile edilmiş -> Asimile etmiş
  res = res.replace(/asimile edilmiş/g, 'asimile etmiş');
  res = res.replace(/asimile edil<\/span><span style="color:#ec4899; font-weight:800;">miş<\/span>/g, 'asimile et<\/span><span style="color:#ec4899; font-weight:800;">miş<\/span>');
  res = res.replace(/asimile edil<\/span><span style="color:#10b981; font-weight:800;">miş/g, 'asimile et<\/span><span style="color:#10b981; font-weight:800;">miş');

  // Yorumlanmış -> Yorumlamış
  res = res.replace(/yorumlanmış/g, 'yorumlamış');
  res = res.replace(/yorumlan<\/span><span style="color:#10b981; font-weight:800;">miş/g, 'yorumla<\/span><span style="color:#10b981; font-weight:800;">miş');

  // Yapılandırılmış -> Yapılandırmış
  res = res.replace(/yapılandırılmış/g, 'yapılandırmış');
  res = res.replace(/yapılandırıl<\/span><span style="color:#10b981; font-weight:800;">miş/g, 'yapılandır<\/span><span style="color:#10b981; font-weight:800;">miş');

  // Yağmalanmakta -> Yağmalamakta
  res = res.replace(/yağmalanmakta/g, 'yağmalamakta');
  res = res.replace(/yağmalan<\/span><span style="color:#10b981; font-weight:800;">makta/g, 'yağmala<\/span><span style="color:#10b981; font-weight:800;">makta');

  // Yeniden kurgulanmakta -> Yeniden kurgulamakta
  res = res.replace(/yeniden kurgulanmakta/g, 'yeniden kurgulamakta');
  res = res.replace(/yeniden kurgulan<\/span><span style="color:#10b981; font-weight:800;">makta/g, 'yeniden kurgula<\/span><span style="color:#10b981; font-weight:800;">makta');

  // Normalleştirilmekte -> Normalleştirmekte
  res = res.replace(/normalleştirilmekte/g, 'normalleştirmekte');
  res = res.replace(/normalleştiril<\/span><span style="color:#10b981; font-weight:800;">mekte/g, 'normalleştir<\/span><span style="color:#10b981; font-weight:800;">mekte');

  // Kataloglanmış -> Kataloglamış
  res = res.replace(/kataloglanmış/g, 'kataloglamış');
  res = res.replace(/kataloglan<\/span><span style="color:#10b981; font-weight:800;">miş/g, 'katalogla<\/span><span style="color:#10b981; font-weight:800;">miş');

  // Yasaklanmış -> Yasaklamış
  res = res.replace(/yasaklanmış/g, 'yasaklamış');
  res = res.replace(/yasaklan<\/span><span style="color:#10b981; font-weight:800;">miş/g, 'yasakla<\/span><span style="color:#10b981; font-weight:800;">miş');

  // Dengelenmiş -> Dengelemiş
  res = res.replace(/dengelenmiş/g, 'dengelemiş');
  res = res.replace(/dengelen<\/span><span style="color:#10b981; font-weight:800;">miş/g, 'dengele<\/span><span style="color:#10b981; font-weight:800;">miş');

  // Dönüştürülmüş -> Dönüştürmüş
  res = res.replace(/dönüştürülmüş/g, 'dönüştürmüş');
  res = res.replace(/dönüştürül<\/span><span style="color:#10b981; font-weight:800;">müş/g, 'dönüştür<\/span><span style="color:#10b981; font-weight:800;">müş');

  return res;
}

const subjects = [
  { eng: "Ancient clay tablets", tr: "Antik kil tabletler", plural: true, noun_eng: "historical artifacts", noun_tr: "tarihi eser" },
  { eng: "Medieval parchment papers", tr: "Orta çağ parşömen kağıtları", plural: true, noun_eng: "medieval documents", noun_tr: "orta çağ belgesi" },
  { eng: "Historic archive collections", tr: "Tarihi arşiv koleksiyonları", plural: true, noun_eng: "valuable records", noun_tr: "değerli kayıt" },
  { eng: "Royal treasury gold assets", tr: "İmparatorluk hazinesi altın varlıkları", plural: true, noun_eng: "state reserves", noun_tr: "devlet rezervi" },
  { eng: "Avant-garde masterpieces", tr: "Avangart şaheserler", plural: true, noun_eng: "artistic expressions", noun_tr: "sanatsal ifade" },
  { eng: "Censored movie scenes", tr: "Sansürlenen sinema sahneleri", plural: true, noun_eng: "controversial media", noun_tr: "tartışmalı medya" },
  { eng: "Documentary film reels", tr: "Belgesel film makaraları", plural: true, noun_eng: "visual archives", noun_tr: "görsel arşiv" },
  { eng: "Foreign currency reserves", tr: "Döviz rezervleri", plural: true, noun_eng: "monetary assets", noun_tr: "parasal varlık" },
  { eng: "Market liquidity indexes", tr: "Piyasa likidite endeksleri", plural: true, noun_eng: "economic indicators", noun_tr: "ekonomik gösterge" },
  { eng: "Macroeconomic growth data", tr: "Makroekonomik büyüme verileri", plural: true, noun_eng: "statistical evidence", noun_tr: "istatistiksel kanıt" },
  { eng: "Deviant social behaviors", tr: "Sapkın sosyal davranışlar", plural: true, noun_eng: "cultural anomalies", noun_tr: "kültürel anomali" },
  { eng: "Nomadic community cultures", tr: "Göçebe topluluk kültürleri", plural: true, noun_eng: "historical lifestyles", noun_tr: "tarihi yaşam tarzı" },
  { eng: "Archaeological excavation sites", tr: "Arkeolojik kazı alanları", plural: true, noun_eng: "historical grounds", noun_tr: "tarihi alan" },
  { eng: "Genetic sequencing records", tr: "Genetik dizileme kayıtları", plural: true, noun_eng: "biological blueprints", noun_tr: "biyolojik harita" },
  { eng: "Deep space transmission signals", tr: "Derin uzay veri sinyalleri", plural: true, noun_eng: "cosmic data", noun_tr: "kozmik veri" },
  { eng: "Artificial intelligence models", tr: "Yapay zeka modelleri", plural: true, noun_eng: "neural networks", noun_tr: "yapay sinir ağı" },
  { eng: "Renewable energy grids", tr: "Yenilenebilir enerji şebekeleri", plural: true, noun_eng: "modern systems", noun_tr: "modern sistem" },
  { eng: "Ancient stone structures", tr: "Antik taş yapılar", plural: true, noun_eng: "megalithic monuments", noun_tr: "megalitik anıt" },
  { eng: "Volatile economic indicators", tr: "Değişken ekonomik göstergeler", plural: true, noun_eng: "financial metrics", noun_tr: "finansal metrik" },
  { eng: "Traditional art forms", tr: "Geleneksel sanat formları", plural: true, noun_eng: "heritage elements", noun_tr: "miras unsuru" },
  { eng: "Subconscious psychological drives", tr: "Bilinçaltı psikolojik dürtüler", plural: true, noun_eng: "mental processes", noun_tr: "zihinsel süreç" },
  { eng: "Rare botanical specimens", tr: "Nadir botanik örnekler", plural: true, noun_eng: "organic samples", noun_tr: "organik örnek" }
];

const verbs = [
  { engV1: "read", engV3: "read", pastActive: "read", engIng: "reading", trStem: "oku" },
  { engV1: "write", engV3: "written", pastActive: "wrote", engIng: "writing", trStem: "yaz" },
  { engV1: "preserve", engV3: "preserved", pastActive: "preserved", engIng: "preserving", trStem: "koru" },
  { engV1: "excavate", engV3: "excavated", pastActive: "excavated", engIng: "excavating", trStem: "kaz" },
  { engV1: "restore", engV3: "restored", pastActive: "restored", engIng: "restoring", trStem: "restore et" },
  { engV1: "interpret", engV3: "interpreted", pastActive: "interpreted", engIng: "interpreting", trStem: "yorumla" },
  { engV1: "loot", engV3: "looted", pastActive: "looted", engIng: "looting", trStem: "yağmala" },
  { engV1: "catalog", engV3: "cataloged", pastActive: "cataloged", engIng: "cataloging", trStem: "katalogla" },
  { engV1: "screen", engV3: "screened", pastActive: "screened", engIng: "screening", trStem: "göster" },
  { engV1: "censor", engV3: "censored", pastActive: "censored", engIng: "censoring", trStem: "sansürle" },
  { engV1: "ban", engV3: "banned", pastActive: "banned", engIng: "banning", trStem: "yasakla" },
  { engV1: "direct", engV3: "directed", pastActive: "directed", engIng: "directing", trStem: "yönet" },
  { engV1: "balance", engV3: "balanced", pastActive: "balanced", engIng: "balancing", trStem: "dengelemeye çalış" },
  { engV1: "devalue", engV3: "devalued", pastActive: "devalued", engIng: "devaluing", trStem: "devalüe et" },
  { engV1: "isolate", engV3: "isolated", pastActive: "isolated", engIng: "isolating", trStem: "izole et" },
  { engV1: "analyze", engV3: "analyzed", pastActive: "analyzed", engIng: "analyzing", trStem: "analiz et" },
  { engV1: "manipulate", engV3: "manipulated", pastActive: "manipulated", engIng: "manipulating", trStem: "manipüle et" },
  { engV1: "observe", engV3: "observed", pastActive: "observed", engIng: "observing", trStem: "gözlemle" },
  { engV1: "examine", engV3: "examined", pastActive: "examined", engIng: "incele" },
  { engV1: "investigate", engV3: "investigated", pastActive: "investigated", engIng: "araştır" },
  { engV1: "evaluate", engV3: "evaluated", pastActive: "evaluated", engIng: "değerlendir" },
  { engV1: "publish", engV3: "published", pastActive: "published", engIng: "publishing", trStem: "yayınla" }
];

const shields = [
  { id: "likely", engPassive: "likely to be", engActive: "likely to", trLabel: "muhtemel", trPassiveSuffix: "olması muhtemeldir", trActiveSuffix: "olması muhtemeldir" },
  { id: "rumored", engPassive: "rumored to be", engActive: "rumored to", trLabel: "söylenti", trPassiveSuffix: "olduğu söyleniyor", trActiveSuffix: "olduğu söyleniyor" },
  { id: "reported", engPassive: "reported to be", engActive: "reported to", trLabel: "bildirilen", trPassiveSuffix: "olduğu bildiriliyor", trActiveSuffix: "olduğu bildiriliyor" },
  { id: "expected", engPassive: "expected to be", engActive: "expected to", trLabel: "beklenen", trPassiveSuffix: "olması bekleniyor", trActiveSuffix: "olması bekleniyor" },
  { id: "required", engPassive: "required to be", engActive: "required to", trLabel: "zorunlu", trPassiveSuffix: "olması gerekiyor", trActiveSuffix: "olması gerekiyor" },
  { id: "bound", engPassive: "bound to be", engActive: "bound to", trLabel: "kaçınılmaz", trPassiveSuffix: "olması kaçınılmazdır", trActiveSuffix: "olması kaçınılmazdır" },
  { id: "authorized", engPassive: "authorized to be", engActive: "authorized to", trLabel: "yetkili", trPassiveSuffix: "olmasına izin verilmiştir", trActiveSuffix: "olmasına izin verilmiştir" },
  { id: "capable", engPassive: "capable of being", engActive: "capable of", trLabel: "yetkin/muktedir", trPassiveSuffix: "bilme yetisine sahiptir", trActiveSuffix: "bilme yetisine sahiptir" }
];

// ============================================================
// TÜRKÇE SES VE UYUM FABRİKASI
// ============================================================
function getLastVowel(word) {
  const cleanWord = (word || '').replace(/<[^>]*>/g, '').trim();
  const vowels = "aeıioöuüAEIİOÖUÜ";
  for (let i = cleanWord.length - 1; i >= 0; i--) {
    if (vowels.includes(cleanWord[i])) {
      return cleanWord[i].toLowerCase();
    }
  }
  return 'e';
}

function get4WayHarmony(vowel) {
  const v = (vowel || 'e').toLowerCase();
  if (v === 'a' || v === 'ı') return 'ı';
  if (v === 'e' || v === 'i') return 'i';
  if (v === 'o' || v === 'u') return 'u';
  if (v === 'ö' || v === 'ü') return 'ü';
  return 'i';
}

function get2WayHarmony(vowel) {
  const v = (vowel || 'e').toLowerCase();
  if (v === 'a' || v === 'ı' || v === 'o' || v === 'u') return 'a';
  return 'e';
}

function isHardConsonant(char) {
  if (!char) return false;
  return "fstkçşhpFSTKÇŞHP".includes(char);
}

function applyAccusative(word) {
  if (!word) return "";
  const lastChar = word.slice(-1);
  const vowels = "aeıioöuüAEIİOÖUÜ";
  const endsInVowel = vowels.includes(lastChar);
  const lastV = getLastVowel(word);
  const harmony = get4WayHarmony(lastV);
  
  let result = "";
  if (endsInVowel) {
    const isPossessivePlural = word.endsWith("ları") || word.endsWith("leri") || word.endsWith("LARI") || word.endsWith("LERİ");
    const buffer = isPossessivePlural ? 'n' : 'y';
    result = word + buffer + harmony;
  } else {
    result = word + harmony;
  }
  return result.charAt(0).toLowerCase() + result.slice(1);
}

function applyPossessive(word) {
  if (!word) return "";
  const lastChar = word.slice(-1);
  const vowels = "aeıioöuüAEIİOÖUÜ";
  const endsInVowel = vowels.includes(lastChar);
  const lastV = getLastVowel(word);
  const harmony = get4WayHarmony(lastV);
  return word + (endsInVowel ? 'n' : '') + harmony + 'n';
}

function makePassiveStem(activeStem) {
  if (!activeStem) return "";
  if (activeStem.endsWith(" et")) {
    return activeStem.slice(0, -3) + " edil";
  }
  if (activeStem === "yönet") {
    return "yönetil";
  }
  
  const lastChar = activeStem.slice(-1);
  const vowels = "aeıioöuüAEIİOÖUÜ";
  const endsInVowel = vowels.includes(lastChar);
  
  if (endsInVowel) {
    return activeStem + "n";
  } else if (lastChar.toLowerCase() === 'l') {
    const lastV = getLastVowel(activeStem);
    const harmony = get4WayHarmony(lastV);
    return activeStem + harmony + "n";
  } else {
    const lastV = getLastVowel(activeStem);
    const harmony = get4WayHarmony(lastV);
    return activeStem + harmony + "l";
  }
}

function applyPast(stem, neg) {
  const base = neg ? (stem + (get2WayHarmony(getLastVowel(stem)) === 'a' ? 'ma' : 'me')) : stem;
  const lastChar = base.slice(-1);
  const lastV = getLastVowel(base);
  const harmony = get4WayHarmony(lastV);
  const isHard = isHardConsonant(lastChar);
  return base + (isHard ? 't' : 'd') + harmony;
}

function applyFuture(stem, neg) {
  if (neg) {
    const harmony = get2WayHarmony(getLastVowel(stem));
    return stem + (harmony === 'a' ? 'mayacak' : 'meyecek');
  }
  const lastChar = stem.slice(-1);
  const vowels = "aeıioöuüAEIİOÖUÜ";
  const endsInVowel = vowels.includes(lastChar);
  const harmony = get2WayHarmony(getLastVowel(stem));
  return stem + (endsInVowel ? 'y' : '') + (harmony === 'a' ? 'acak' : 'ecek');
}

function applyContinuous(stem, neg, copula = true) {
  const actualNeg = neg ? (stem + (get2WayHarmony(getLastVowel(stem)) === 'a' ? 'mama' : 'meme')) : stem;
  const harmony = get2WayHarmony(getLastVowel(actualNeg));
  const suffix = harmony === 'a' ? 'makta' : 'mekte';
  const copulaSuffix = harmony === 'a' ? 'dır' : 'dir';
  return actualNeg + suffix + (copula ? copulaSuffix : '');
}

function applyPresentContinuousActive(stem, neg) {
  if (!stem) return "";
  
  let processedStem = stem;
  let isEtStem = false;
  if (stem.endsWith(" et")) {
    isEtStem = true;
    processedStem = stem.slice(0, -3);
  }
  
  const vowels = "aeıioöuüAEIİOÖUÜ";
  
  if (neg) {
    const lastV = getLastVowel(processedStem + (isEtStem ? "e" : ""));
    const harmony = get4WayHarmony(lastV);
    const suffix = "m" + harmony + "yorlar";
    return processedStem + (isEtStem ? " et" : "") + suffix;
  } else {
    if (isEtStem) {
      return processedStem + " ediyorlar";
    }
    
    const lastChar = processedStem.slice(-1);
    const endsInVowel = vowels.includes(lastChar);
    
    if (endsInVowel) {
      const base = processedStem.slice(0, -1);
      const lastV = getLastVowel(base);
      const harmony = get4WayHarmony(lastV);
      return base + harmony + "yorlar";
    } else {
      const lastV = getLastVowel(processedStem);
      const harmony = get4WayHarmony(lastV);
      return processedStem + harmony + "yorlar";
    }
  }
}

function applyPastContinuousActive(stem, neg) {
  const pres = applyPresentContinuousActive(stem, neg);
  if (pres.endsWith("yorlar")) {
    return pres.slice(0, -6) + "yorlardı";
  }
  return pres;
}

function applyPastContinuous(stem, neg) {
  const base = neg ? (stem + (get2WayHarmony(getLastVowel(stem)) === 'a' ? 'mama' : 'meme')) : stem;
  const harmony = get2WayHarmony(getLastVowel(base));
  const suffix = harmony === 'a' ? 'maktaydı' : 'mekteydi';
  return base + suffix;
}

function applyPluperfect(stem, neg) {
  const part = applyPerfectiveParticiple(stem, neg);
  const lastV = getLastVowel(part);
  const harmony = get4WayHarmony(lastV);
  const suffixPast = harmony === 'ı' ? 'tı' : (harmony === 'i' ? 'ti' : (harmony === 'u' ? 'tu' : 'tü'));
  return part + suffixPast;
}

function applyPerfectiveParticipleSuffix(stem) {
  const lastV = getLastVowel(stem);
  const harmony = get4WayHarmony(lastV);
  return harmony + 'ş';
}

function applyPerfectiveParticiple(stem, neg) {
  if (neg) {
    const harmony = get2WayHarmony(getLastVowel(stem));
    return stem + (harmony === 'a' ? 'mamış' : 'memiş');
  }
  return stem + applyPerfectiveParticipleSuffix(stem);
}

function applyDigi(stem) {
  const lastChar = stem.slice(-1);
  const lastV = getLastVowel(stem);
  const harmony = get4WayHarmony(lastV);
  const isHard = isHardConsonant(lastChar);
  return (isHard ? 't' : 'd') + harmony + 'ğ' + harmony;
}

// ============================================================
// DİNAMİK PARÇALAYICI VE SEVİYE OLUŞTURUCU MOTOR
// ============================================================
// ============================================================
// DİNAMİK PARÇALAYICI VE SEVİYE OLUŞTURUCU MOTOR
// ============================================================
function getConditionalSimulatorData(condType) {
  const subjectIndex = state.selectedSubjectIndex !== undefined ? state.selectedSubjectIndex : 0;
  const verbIndex = state.selectedVerbIndex !== undefined ? state.selectedVerbIndex : 0;
  const activeSubjectObj = subjects[subjectIndex] || subjects[0];
  const activeVerbObj = verbs[verbIndex] || verbs[0];
  
  const isPassive = state.activePassiveMode !== 'active';
  const isNeg = state.negationOn || false;
  
  let activeSpeaker = "Historians";
  let activeSpeakerTr = "Tarihçiler";
  const domain = state.activeDomain || 'history';
  if (domain === 'history') { activeSpeaker = "Historians"; activeSpeakerTr = "Tarihçiler"; }
  else if (domain === 'cinema') { activeSpeaker = "Critics"; activeSpeakerTr = "Eleştirmenler"; }
  else if (domain === 'economy') { activeSpeaker = "Economists"; activeSpeakerTr = "Ekonomistler"; }
  else if (domain === 'sociology') { activeSpeaker = "Sociologists"; activeSpeakerTr = "Sosyologlar"; }

  const colorSubject = "#1f2937";
  const colorObject = "#1f2937";
  const colorNegation = "#ef4444";
  const colorAux = "#3b82f6";
  const colorVerb = "#f59e0b";
  const colorIf = "#8b5cf6";
  const colorComma = "#6b7280";
  const colorPerfect = "#10b981";

  let wagonChain = [];
  let trReflexColored = "";
  let mechanicNote = "";

  const accusativeObj = applyAccusative(activeSubjectObj.tr);
  const passiveStem = makePassiveStem(activeVerbObj.trStem);
  const activeStem = activeVerbObj.trStem;

  if (condType === 'type0') {
    mechanicNote = "Type 0: Bilimsel gerçekler ve genel doğrular. Her iki tarafta da Geniş Zaman (Simple Present) kullanılır.";
    if (isPassive) {
      wagonChain.push({ word: "If", role: "condition", color: colorIf });
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: "are", role: "auxiliary", color: colorAux });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb });
      wagonChain.push({ word: ",", role: "comma", color: colorComma });
      wagonChain.push({ word: "they", role: "subject", color: colorSubject });
      wagonChain.push({ word: "become", role: "main_verb", color: colorVerb });
      wagonChain.push({ word: "useless", role: "object", color: colorObject });

      const negSuffix = isNeg ? "mazsa" : "sa";
      trReflexColored = `Eğer ${activeSubjectObj.tr} <span style="color:${colorVerb};">${passiveStem}</span><span style="color:${colorAux};">${negSuffix}</span>, onlar kullanışsız hale gelir.`;
    } else {
      wagonChain.push({ word: "If", role: "condition", color: colorIf });
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      if (isNeg) wagonChain.push({ word: "do not", role: "negation", color: colorNegation });
      wagonChain.push({ word: activeVerbObj.engV1, role: "main_verb", color: colorVerb });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      wagonChain.push({ word: ",", role: "comma", color: colorComma });
      wagonChain.push({ word: "they", role: "subject", color: colorSubject });
      wagonChain.push({ word: "lose", role: "main_verb", color: colorVerb });
      wagonChain.push({ word: "information", role: "object", color: colorObject });

      const negSuffix = isNeg ? "mazsa" : "sa";
      trReflexColored = `Eğer ${activeSpeakerTr} ${accusativeObj} <span style="color:${colorVerb};">${activeStem}</span><span style="color:${colorAux};">${negSuffix}</span>, bilgi kaybederler.`;
    }
  } else if (condType === 'type1') {
    mechanicNote = "Type 1: Gelecekte gerçekleşmesi olası durumlar. Koşul cümlesinde Present, ana cümlede Future/Modal (will/can/may) kullanılır.";
    if (isPassive) {
      wagonChain.push({ word: "If", role: "condition", color: colorIf });
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: "are", role: "auxiliary", color: colorAux });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb });
      wagonChain.push({ word: ",", role: "comma", color: colorComma });
      wagonChain.push({ word: "they", role: "subject", color: colorSubject });
      wagonChain.push({ word: "will", role: "future", color: colorAux });
      wagonChain.push({ word: "become", role: "main_verb", color: colorVerb });
      wagonChain.push({ word: "useless", role: "object", color: colorObject });

      const negSuffix = isNeg ? "mazsa" : "sa";
      trReflexColored = `Eğer ${activeSubjectObj.tr} <span style="color:${colorVerb};">${passiveStem}</span><span style="color:${colorAux};">${negSuffix}</span>, onlar kullanışsız hale gelecektir.`;
    } else {
      wagonChain.push({ word: "If", role: "condition", color: colorIf });
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      if (isNeg) wagonChain.push({ word: "do not", role: "negation", color: colorNegation });
      wagonChain.push({ word: activeVerbObj.engV1, role: "main_verb", color: colorVerb });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      wagonChain.push({ word: ",", role: "comma", color: colorComma });
      wagonChain.push({ word: "they", role: "subject", color: colorSubject });
      wagonChain.push({ word: "will", role: "future", color: colorAux });
      wagonChain.push({ word: "lose", role: "main_verb", color: colorVerb });
      wagonChain.push({ word: "information", role: "object", color: colorObject });

      const negSuffix = isNeg ? "mazsa" : "sa";
      trReflexColored = `Eğer ${activeSpeakerTr} ${accusativeObj} <span style="color:${colorVerb};">${activeStem}</span><span style="color:${colorAux};">${negSuffix}</span>, bilgi kaybedeceklerdir.`;
    }
  } else if (condType === 'type2') {
    mechanicNote = "Type 2: Şu an için hayali, gerçek dışı durumlar. Koşul cümlesinde Past Simple (V2), ana cümlede would/could/might + V1 kullanılır.";
    if (isPassive) {
      wagonChain.push({ word: "If", role: "condition", color: colorIf });
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: "were", role: "past_tense", color: colorAux });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb });
      wagonChain.push({ word: ",", role: "comma", color: colorComma });
      wagonChain.push({ word: "they", role: "subject", color: colorSubject });
      wagonChain.push({ word: "would", role: "conditional", color: colorAux });
      wagonChain.push({ word: "become", role: "main_verb", color: colorVerb });
      wagonChain.push({ word: "useless", role: "object", color: colorObject });

      const negSuffix = isNeg ? "masaydı" : "saydı";
      trReflexColored = `Eğer ${activeSubjectObj.tr} <span style="color:${colorVerb};">${passiveStem}</span><span style="color:${colorAux};">${negSuffix}</span>, onlar kullanışsız hale gelirdi.`;
    } else {
      wagonChain.push({ word: "If", role: "condition", color: colorIf });
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      if (isNeg) {
        wagonChain.push({ word: "did not", role: "negation", color: colorNegation });
        wagonChain.push({ word: activeVerbObj.engV1, role: "main_verb", color: colorVerb });
      } else {
        wagonChain.push({ word: activeVerbObj.pastActive, role: "main_verb", color: colorVerb });
      }
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      wagonChain.push({ word: ",", role: "comma", color: colorComma });
      wagonChain.push({ word: "they", role: "subject", color: colorSubject });
      wagonChain.push({ word: "would", role: "conditional", color: colorAux });
      wagonChain.push({ word: "lose", role: "main_verb", color: colorVerb });
      wagonChain.push({ word: "information", role: "object", color: colorObject });

      const negSuffix = isNeg ? "masaydı" : "saydı";
      trReflexColored = `Eğer ${activeSpeakerTr} ${accusativeObj} <span style="color:${colorVerb};">${activeStem}</span><span style="color:${colorAux};">${negSuffix}</span>, bilgi kaybederlerdi.`;
    }
  } else if (condType === 'type3') {
    mechanicNote = "Type 3: Geçmişteki gerçek dışı durumlar, pişmanlıklar. Koşul cümlesinde Past Perfect (had V3), ana cümlede would/could/might have + V3 kullanılır.";
    if (isPassive) {
      wagonChain.push({ word: "If", role: "condition", color: colorIf });
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: "had", role: "past_perfect", color: colorPerfect });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: "been", role: "passive_perfect", color: colorAux });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb });
      wagonChain.push({ word: ",", role: "comma", color: colorComma });
      wagonChain.push({ word: "they", role: "subject", color: colorSubject });
      wagonChain.push({ word: "would", role: "conditional", color: colorAux });
      wagonChain.push({ word: "have", role: "aux_perfect", color: colorPerfect });
      wagonChain.push({ word: "become", role: "main_verb", color: colorVerb }); // note: become V3 is become
      wagonChain.push({ word: "useless", role: "object", color: colorObject });

      const negSuffix = isNeg ? "masaydı" : "saydı";
      trReflexColored = `Eğer ${activeSubjectObj.tr} <span style="color:${colorVerb};">${passiveStem}</span><span style="color:${colorPerfect};">miş ol</span><span style="color:${colorAux};">${negSuffix}</span>, onlar kullanışsız hale gelmiş olurdu.`;
    } else {
      wagonChain.push({ word: "If", role: "condition", color: colorIf });
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "had", role: "past_perfect", color: colorPerfect });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb });
      wagonChain.push({ word: ",", role: "comma", color: colorComma });
      wagonChain.push({ word: "they", role: "subject", color: colorSubject });
      wagonChain.push({ word: "would", role: "conditional", color: colorAux });
      wagonChain.push({ word: "have", role: "aux_perfect", color: colorPerfect });
      wagonChain.push({ word: "lost", role: "main_verb_v3", color: colorVerb });
      wagonChain.push({ word: "information", role: "object", color: colorObject });

      const negSuffix = isNeg ? "masaydı" : "saydı";
      trReflexColored = `Eğer ${activeSpeakerTr} ${accusativeObj} <span style="color:${colorVerb};">${activeStem}</span><span style="color:${colorPerfect};">miş ol</span><span style="color:${colorAux};">${negSuffix}</span>, bilgi kaybetmiş olurlardı.`;
    }
  } else if (condType === 'mix1') {
    mechanicNote = "Mix 1: Geçmişteki nedenin (had V3) şu andaki sonucu (would V1). Geçmiş ➔ Şimdiki zaman bağlantısı sağlar.";
    if (isPassive) {
      wagonChain.push({ word: "If", role: "condition", color: colorIf });
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: "had", role: "past_perfect", color: colorPerfect });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: "been", role: "passive_perfect", color: colorAux });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb });
      wagonChain.push({ word: ",", role: "comma", color: colorComma });
      wagonChain.push({ word: "they", role: "subject", color: colorSubject });
      wagonChain.push({ word: "would", role: "conditional", color: colorAux });
      wagonChain.push({ word: "be", role: "status_linker", color: colorAux });
      wagonChain.push({ word: "useless", role: "object", color: colorObject });
      wagonChain.push({ word: "now", role: "time_adverb", color: colorPerfect });

      const negSuffix = isNeg ? "masaydı" : "saydı";
      trReflexColored = `Eğer ${activeSubjectObj.tr} <span style="color:${colorVerb};">${passiveStem}</span><span style="color:${colorPerfect};">miş ol</span><span style="color:${colorAux};">${negSuffix}</span>, onlar <span style="color:${colorPerfect};">şimdi</span> kullanışsız olurdu.`;
    } else {
      wagonChain.push({ word: "If", role: "condition", color: colorIf });
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "had", role: "past_perfect", color: colorPerfect });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb });
      wagonChain.push({ word: ",", role: "comma", color: colorComma });
      wagonChain.push({ word: "they", role: "subject", color: colorSubject });
      wagonChain.push({ word: "would", role: "conditional", color: colorAux });
      wagonChain.push({ word: "lose", role: "main_verb", color: colorVerb });
      wagonChain.push({ word: "information", role: "object", color: colorObject });
      wagonChain.push({ word: "now", role: "time_adverb", color: colorPerfect });

      const negSuffix = isNeg ? "masaydı" : "saydı";
      trReflexColored = `Eğer ${activeSpeakerTr} ${accusativeObj} <span style="color:${colorVerb};">${activeStem}</span><span style="color:${colorPerfect};">miş ol</span><span style="color:${colorAux};">${negSuffix}</span>, <span style="color:${colorPerfect};">şimdi</span> bilgi kaybederlerdi.`;
    }
  } else if (condType === 'mix2') {
    mechanicNote = "Mix 2: Genel / sürekli durumun (V2) geçmişteki sonucu (would have V3). Genel durumun geçmişe etkisini gösterir.";
    if (isPassive) {
      wagonChain.push({ word: "If", role: "condition", color: colorIf });
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: "were", role: "past_tense", color: colorAux });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb });
      wagonChain.push({ word: ",", role: "comma", color: colorComma });
      wagonChain.push({ word: "they", role: "subject", color: colorSubject });
      wagonChain.push({ word: "would", role: "conditional", color: colorAux });
      wagonChain.push({ word: "have", role: "aux_perfect", color: colorPerfect });
      wagonChain.push({ word: "been", role: "passive_perfect", color: colorAux });
      wagonChain.push({ word: "destroyed", role: "main_verb_v3", color: colorVerb });
      wagonChain.push({ word: "yesterday", role: "time_adverb", color: colorPerfect });

      const negSuffix = isNeg ? "masaydı" : "saydı";
      trReflexColored = `Eğer ${activeSubjectObj.tr} (genel olarak) <span style="color:${colorVerb};">${passiveStem}</span><span style="color:${colorAux};">${negSuffix}</span>, <span style="color:${colorPerfect};">dün</span> mahvolmuş olurlardı.`;
    } else {
      wagonChain.push({ word: "If", role: "condition", color: colorIf });
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      if (isNeg) {
        wagonChain.push({ word: "did not", role: "negation", color: colorNegation });
        wagonChain.push({ word: activeVerbObj.engV1, role: "main_verb", color: colorVerb });
      } else {
        wagonChain.push({ word: activeVerbObj.pastActive, role: "main_verb", color: colorVerb });
      }
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      wagonChain.push({ word: ",", role: "comma", color: colorComma });
      wagonChain.push({ word: "they", role: "subject", color: colorSubject });
      wagonChain.push({ word: "would", role: "conditional", color: colorAux });
      wagonChain.push({ word: "have", role: "aux_perfect", color: colorPerfect });
      wagonChain.push({ word: "lost", role: "main_verb_v3", color: colorVerb });
      wagonChain.push({ word: "information", role: "object", color: colorObject });
      wagonChain.push({ word: "yesterday", role: "time_adverb", color: colorPerfect });

      const negSuffix = isNeg ? "masaydı" : "saydı";
      trReflexColored = `Eğer ${activeSpeakerTr} ${accusativeObj} (genel olarak) <span style="color:${colorVerb};">${activeStem}</span><span style="color:${colorAux};">${negSuffix}</span>, <span style="color:${colorPerfect};">dün</span> bilgi kaybetmiş olurlardı.`;
    }
  }

  return {
    level: 99,
    title: "If Clause (" + condType.toUpperCase() + ")",
    mechanic_note: mechanicNote,
    wagon_chain: wagonChain,
    turkish_reflex_colored: trReflexColored
  };
}

function getActiveLevelData(lvlNum) {
  // Intercept for Conditional Mode
  if (state.conditionalType && state.conditionalType !== 'none') {
    const condData = getConditionalSimulatorData(state.conditionalType);
    if (condData) return condData;
  }

  // Intercept for Pure Tense Mode
  if (state.pureTense) {
    const ptData = getPureTenseData(state.pureTense.tense, state.pureTense.aspect);
    if (ptData) return ptData;
  }
  
    // Intercept for Modal Selector
  if (state.selectedSimulatorModal && state.selectedSimulatorModal !== 'none') {
    // Map lvlNum to aspect
    let aspect = 'simple';
    if (lvlNum === 4 || lvlNum === 5) aspect = 'progressive';
    if (lvlNum === 6 || lvlNum === 7 || lvlNum === 8 || lvlNum === 10 || lvlNum === 12) aspect = 'perfect';
    if (lvlNum === 9 || lvlNum === 11) aspect = 'perfect-progressive';
    
    let tense = 'present';
    if (lvlNum === 2 || lvlNum === 5 || lvlNum === 7 || lvlNum === 12) tense = 'past';
    if (lvlNum === 3 || lvlNum === 8 || lvlNum === 9) tense = 'future';
    
    return getModalTenseData(state.selectedSimulatorModal, tense, aspect);
  }
const baseLvl = simulatorData.levels.find(x => x.level === lvlNum);
  if (!baseLvl) return null;
  
  const subjectIndex = state.selectedSubjectIndex !== undefined ? state.selectedSubjectIndex : 0;
  const verbIndex = state.selectedVerbIndex !== undefined ? state.selectedVerbIndex : 0;
  const shieldId = state.selectedShieldId || 'likely';
  
  const activeSubjectObj = subjects[subjectIndex] || subjects[0];
  const activeVerbObj = verbs[verbIndex] || verbs[0];
  const activeShieldObj = shields.find(s => s.id === shieldId) || shields[0];
  
  const isPassive = state.activePassiveMode !== 'active';
  const isNeg = state.negationOn || false;
  
  let activeSpeaker = "Researchers";
  let activeSpeakerTr = "Araştırmacılar";
  const domain = state.activeDomain || 'history';
  if (domain === 'history') {
    activeSpeaker = "Historians";
    activeSpeakerTr = "Tarihçiler";
  } else if (domain === 'cinema') {
    activeSpeaker = "Critics";
    activeSpeakerTr = "Eleştirmenler";
  } else if (domain === 'economy') {
    activeSpeaker = "Economists";
    activeSpeakerTr = "Ekonomistler";
  } else if (domain === 'sociology') {
    activeSpeaker = "Sociologists";
    activeSpeakerTr = "Sosyologlar";
  }
  
  const currentLvl = JSON.parse(JSON.stringify(baseLvl));
  
  const passiveStem = makePassiveStem(activeVerbObj.trStem);
  const activeStem = activeVerbObj.trStem;
  
  let trReflexColored = "";
  let wagonChain = [];
  
  const colorSubject = "#1f2937";
  const colorObject = "#1f2937";
  const colorNegation = "#ef4444";
  const colorAux = "#3b82f6";
  const colorContinuous = "#10b981";
  const colorPerfect = "#ec4899";
  const colorVerb = "#f59e0b";
  const colorInfinitive = "#10b981";
  
  if (lvlNum === 1) {
    const copulaWord = activeSubjectObj.plural ? "are" : "is";
    const objectWord = activeSubjectObj.plural ? activeSubjectObj.noun_eng + "s" : "a " + activeSubjectObj.noun_eng;
    
    wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
    wagonChain.push({ word: copulaWord, role: "status_linker", color: colorAux, suffix_tr: "-dir/-dır" });
    if (isNeg) {
      wagonChain.push({ word: "not", role: "negation", color: colorNegation });
    }
    wagonChain.push({ word: objectWord, role: "object", color: colorObject });
    
    const trNounBase = activeSubjectObj.noun_tr + (activeSubjectObj.plural ? (get2WayHarmony(getLastVowel(activeSubjectObj.noun_tr)) === 'a' ? 'lar' : 'ler') : '');
    let trVerbPart = "";
    if (isNeg) {
      trVerbPart = trNounBase + ` değil<span style="color:${colorAux}; font-weight:800;">dir</span>`;
    } else {
      const lastChar = trNounBase.slice(-1);
      const isHard = isHardConsonant(lastChar);
      const lastV = getLastVowel(trNounBase);
      const harmony = get4WayHarmony(lastV);
      trVerbPart = trNounBase + `<span style="color:${colorAux}; font-weight:800;">${isHard ? 't' : 'd'}${harmony}r</span>`;
    }
    trReflexColored = activeSubjectObj.tr + " " + trVerbPart + ".";
    
  } else if (lvlNum === 2) {
    if (isPassive) {
      const auxWord = activeSubjectObj.plural ? "were" : "was";
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: auxWord, role: "past_tense", color: colorAux, suffix_tr: "-di/-dı" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const verbSuffix = applyPast(passiveStem, isNeg);
      const suffixPart = verbSuffix.slice(passiveStem.length);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorAux}; font-weight:800;">${suffixPart}</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      if (isNeg) {
        wagonChain.push({ word: "did", role: "past_tense", color: colorAux, suffix_tr: "-di" });
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
        wagonChain.push({ word: activeVerbObj.engV1, role: "main_verb", color: colorVerb, suffix_tr: activeStem + "-" });
      } else {
        wagonChain.push({ word: activeVerbObj.pastActive, role: "main_verb", color: colorVerb, suffix_tr: activeStem + "-" });
      }
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const accusativeObj = applyAccusative(activeSubjectObj.tr);
      const verbSuffix = applyPast(activeStem, isNeg);
      const suffixPart = verbSuffix.slice(activeStem.length);
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorAux}; font-weight:800;">${suffixPart}</span>.`;
    }
    
  } else if (lvlNum === 3) {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      if (isNeg) {
        wagonChain.push({ word: "will", role: "future", color: colorAux, suffix_tr: "-acak" });
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
        wagonChain.push({ word: "be", role: "passive_inf", color: colorAux });
      } else {
        wagonChain.push({ word: "will be", role: "future_passive", color: colorAux, suffix_tr: "-acak/-ecek" });
      }
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const verbSuffix = applyFuture(passiveStem, isNeg);
      const suffixPart = verbSuffix.slice(passiveStem.length);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorAux}; font-weight:800;">${suffixPart}</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "will", role: "future", color: colorAux, suffix_tr: "-acak" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: activeVerbObj.engV1, role: "main_verb", color: colorVerb, suffix_tr: activeStem + "-" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const accusativeObj = applyAccusative(activeSubjectObj.tr);
      const verbSuffix = applyFuture(activeStem, isNeg);
      const suffixPart = verbSuffix.slice(activeStem.length);
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorAux}; font-weight:800;">${suffixPart}</span>.`;
    }
    
  } else if (lvlNum === 4) {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: activeSubjectObj.plural ? "are" : "is", role: "present_tense", color: colorAux, suffix_tr: "-dir" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: "being", role: "continuous_motor", color: colorContinuous, suffix_tr: "-makta/-mekte" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const verbSuffix = applyContinuous(passiveStem, isNeg, true);
      const continuousPart = verbSuffix.slice(passiveStem.length, verbSuffix.length - 3);
      const copulaPart = verbSuffix.slice(verbSuffix.length - 3);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorContinuous}; font-weight:800;">${continuousPart}</span><span style="color:${colorAux}; font-weight:800;">${copulaPart}</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "are", role: "present_tense", color: colorAux, suffix_tr: "-iyor/-iyorlar" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: activeVerbObj.engIng, role: "main_verb_ing", color: colorVerb, suffix_tr: activeStem + "-ıyor / -iyor" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const accusativeObj = applyAccusative(activeSubjectObj.tr);
      
      const conjugatedVerb = applyPresentContinuousActive(activeStem, isNeg);
      let displayStem = activeStem;
      if (!isNeg && "aeıioöuüAEIİOÖUÜ".includes(activeStem.slice(-1)) && !activeStem.endsWith(" et")) {
        displayStem = activeStem.slice(0, -1);
      }
      if (activeStem.endsWith(" et")) {
        displayStem = activeStem.slice(0, -2) + "ed";
      }
      const suffixPart = conjugatedVerb.slice(displayStem.length);
      const lenCont = suffixPart.length - 3; // "lar" or "ler" is 3 chars
      const continuousPart = suffixPart.slice(0, lenCont);
      const copulaPart = suffixPart.slice(lenCont);
      
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorVerb}; font-weight:800;">${displayStem}</span><span style="color:${colorContinuous}; font-weight:800;">${continuousPart}</span><span style="color:${colorAux}; font-weight:800;">${copulaPart}</span>.`;
    }
    
  } else if (lvlNum === 5) {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: activeSubjectObj.plural ? "were" : "was", role: "past_tense", color: colorAux, suffix_tr: "-di/-ydı" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: "being", role: "continuous_motor", color: colorContinuous, suffix_tr: "-makta" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const verbSuffix = applyPastContinuous(passiveStem, isNeg);
      const continuousPart = verbSuffix.slice(passiveStem.length, verbSuffix.length - 4);
      const pastPart = verbSuffix.slice(verbSuffix.length - 4);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorContinuous}; font-weight:800;">${continuousPart}</span><span style="color:${colorAux}; font-weight:800;">${pastPart}</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "were", role: "past_tense", color: colorAux, suffix_tr: "-iyordu/-iyorlardı" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: activeVerbObj.engIng, role: "main_verb_ing", color: colorVerb, suffix_tr: activeStem + "-ıyor / -iyor" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const accusativeObj = applyAccusative(activeSubjectObj.tr);
      
      const conjugatedVerb = applyPastContinuousActive(activeStem, isNeg);
      let displayStem = activeStem;
      if (!isNeg && "aeıioöuüAEIİOÖUÜ".includes(activeStem.slice(-1)) && !activeStem.endsWith(" et")) {
        displayStem = activeStem.slice(0, -1);
      }
      if (activeStem.endsWith(" et")) {
        displayStem = activeStem.slice(0, -2) + "ed";
      }
      const suffixPart = conjugatedVerb.slice(displayStem.length);
      const lenCont = suffixPart.length - 5; // "lardı" or "lerdi" is 5 chars
      const continuousPart = suffixPart.slice(0, lenCont);
      const pastPart = suffixPart.slice(lenCont);
      
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorVerb}; font-weight:800;">${displayStem}</span><span style="color:${colorContinuous}; font-weight:800;">${continuousPart}</span><span style="color:${colorAux}; font-weight:800;">${pastPart}</span>.`;
    }
    
  } else if (lvlNum === 6) {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: activeSubjectObj.plural ? "have" : "has", role: "perfect_bridge", color: colorAux, suffix_tr: "çoktan" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect, suffix_tr: "-di" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const timeMarker = isNeg ? "henüz" : "çoktan";
      const verbSuffix = applyPast(passiveStem, isNeg);
      const suffixPart = verbSuffix.slice(passiveStem.length);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorAux}; font-weight:800;">${timeMarker}</span> <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorPerfect}; font-weight:800;">${suffixPart}</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "have", role: "perfect_bridge", color: colorAux, suffix_tr: "çoktan" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: activeStem + "-" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const timeMarker = isNeg ? "henüz" : "çoktan";
      const accusativeObj = applyAccusative(activeSubjectObj.tr);
      const verbSuffix = applyPast(activeStem, isNeg);
      const suffixPart = verbSuffix.slice(activeStem.length);
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorAux}; font-weight:800;">${timeMarker}</span> <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorPerfect}; font-weight:800;">${suffixPart}</span>.`;
    }
    
  } else if (lvlNum === 7) {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: "had", role: "perfect_bridge", color: colorAux, suffix_tr: "zaten" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect, suffix_tr: "-mişti" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const timeMarker = isNeg ? "henüz" : "zaten";
      const verbSuffix = applyPluperfect(passiveStem, isNeg);
      const suffixPart = verbSuffix.slice(passiveStem.length);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorAux}; font-weight:800;">${timeMarker}</span> <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorPerfect}; font-weight:800;">${suffixPart}</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "had", role: "perfect_bridge", color: colorAux, suffix_tr: "zaten" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: activeStem + "-" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const timeMarker = isNeg ? "henüz" : "zaten";
      const accusativeObj = applyAccusative(activeSubjectObj.tr);
      const verbSuffix = applyPluperfect(activeStem, isNeg);
      const suffixPart = verbSuffix.slice(activeStem.length);
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorAux}; font-weight:800;">${timeMarker}</span> <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorPerfect}; font-weight:800;">${suffixPart}</span>.`;
    }
    
  } else if (lvlNum === 8) {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: "will", role: "future", color: colorAux, suffix_tr: "olacak" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: "have", role: "perfect_bridge", color: colorAux });
      wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect, suffix_tr: "-miş" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const partSuffix = applyPerfectiveParticiple(passiveStem, isNeg);
      const partSuffixPart = partSuffix.slice(passiveStem.length);
      const futAux = isNeg ? "olmayacak" : "olacak";
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorPerfect}; font-weight:800;">${partSuffixPart}</span> <span style="color:${colorAux}; font-weight:800;">${futAux}</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "will", role: "future", color: colorAux, suffix_tr: "olacak" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: "have", role: "perfect_bridge", color: colorAux });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: activeStem + "-miş" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const accusativeObj = applyAccusative(activeSubjectObj.tr);
      const partSuffix = applyPerfectiveParticiple(activeStem, isNeg);
      const partSuffixPart = partSuffix.slice(activeStem.length);
      const futAux = isNeg ? "olmayacak" : "olacak";
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorPerfect}; font-weight:800;">${partSuffixPart}</span> <span style="color:${colorAux}; font-weight:800;">${futAux}</span>.`;
    }
    
  } else if (lvlNum === 9) {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: "will", role: "future", color: colorAux, suffix_tr: "-acak" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: "have", role: "perfect_bridge", color: colorAux, suffix_tr: "olmuş" });
      wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect, suffix_tr: "ol-" });
      wagonChain.push({ word: "being", role: "continuous_motor", color: colorContinuous, suffix_tr: "-makta" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const contPhrase = applyContinuous(passiveStem, isNeg, false);
      const contSuffix = contPhrase.slice(passiveStem.length);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorContinuous}; font-weight:800;">${contSuffix}</span> <span style="color:${colorPerfect}; font-weight:800;">ol</span><span style="color:${colorAux}; font-weight:800;">muş olacak</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "will", role: "future", color: colorAux, suffix_tr: "-acak" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: "have", role: "perfect_bridge", color: colorAux, suffix_tr: "olmuş" });
      wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect, suffix_tr: "ol-" });
      wagonChain.push({ word: activeVerbObj.engIng, role: "main_verb_ing", color: colorVerb, suffix_tr: activeStem + "-makta" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const accusativeObj = applyAccusative(activeSubjectObj.tr);
      const contPhrase = applyContinuous(activeStem, isNeg, false);
      const contSuffix = contPhrase.slice(activeStem.length);
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorContinuous}; font-weight:800;">${contSuffix}</span> <span style="color:${colorPerfect}; font-weight:800;">ol</span><span style="color:${colorAux}; font-weight:800;">muş olacak</span>.`;
    }
    
  } else if (lvlNum === 10) {
    const shieldEng = isPassive ? activeShieldObj.engPassive : activeShieldObj.engActive;
    const verbBeOrTo = isPassive ? (activeShieldObj.id === 'capable' ? "of being" : "to be") : (activeShieldObj.id === 'capable' ? "of" : "to");
    const mainVerbWord = isPassive ? activeVerbObj.engV3 : (activeShieldObj.id === 'capable' ? activeVerbObj.engIng : activeVerbObj.engV1);
    
    const splitShield = shieldEng.split(" ");
    const shieldCoreWord = splitShield[0];
    
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: activeSubjectObj.plural ? "are" : "is", role: "present_tense", color: colorAux, suffix_tr: "-dır" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: shieldCoreWord, role: "modal_shield", color: colorPerfect, suffix_tr: activeShieldObj.trLabel });
      wagonChain.push({ word: verbBeOrTo, role: "passive_inf", color: colorInfinitive });
      wagonChain.push({ word: mainVerbWord, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const possessiveSubj = applyPossessive(activeSubjectObj.tr);
      let trShieldSuffix = "";
      if (activeShieldObj.id === 'likely') {
        trShieldSuffix = ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorInfinitive}; font-weight:800;">${isNeg ? 'memiş olması' : 'miş olması'}</span> <span style="color:${colorPerfect}; font-weight:800;">muhtemeldir</span>.`;
      } else if (activeShieldObj.id === 'expected') {
        trShieldSuffix = ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorInfinitive}; font-weight:800;">${isNeg ? 'memesi' : 'mesi'}</span> <span style="color:${colorPerfect}; font-weight:800;">bekleniyor</span>.`;
      } else if (activeShieldObj.id === 'required') {
        trShieldSuffix = ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorInfinitive}; font-weight:800;">${isNeg ? 'memesi' : 'mesi'}</span> <span style="color:${colorPerfect}; font-weight:800;">gerekiyor</span>.`;
      } else if (activeShieldObj.id === 'bound') {
        trShieldSuffix = ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorInfinitive}; font-weight:800;">${isNeg ? 'memesi' : 'mesi'}</span> <span style="color:${colorPerfect}; font-weight:800;">kaçınılmazdır</span>.`;
      } else if (activeShieldObj.id === 'authorized') {
        trShieldSuffix = ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorInfinitive}; font-weight:800;">${isNeg ? 'memesine' : 'mesine'}</span> <span style="color:${colorPerfect}; font-weight:800;">izin verilmiştir</span>.`;
      } else if (activeShieldObj.id === 'capable') {
        trShieldSuffix = ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorInfinitive}; font-weight:800;">${isNeg ? 'mama' : 'ebilme'}</span> <span style="color:${colorPerfect}; font-weight:800;">yetisine sahiptir</span>.`;
      } else {
        const trVerbBase = isNeg ? (passiveStem + (get2WayHarmony(getLastVowel(passiveStem)) === 'a' ? 'madığı' : 'mediği')) : (passiveStem + applyDigi(passiveStem));
        const trVerbStemPart = trVerbBase.slice(0, passiveStem.length);
        const trVerbSuffixPart = trVerbBase.slice(passiveStem.length);
        const shieldWord = activeShieldObj.id === 'rumored' ? 'söyleniyor' : 'bildiriliyor';
        trShieldSuffix = ` <span style="color:${colorVerb}; font-weight:800;">${trVerbStemPart}</span><span style="color:${colorInfinitive}; font-weight:800;">${trVerbSuffixPart}</span> <span style="color:${colorPerfect}; font-weight:800;">${shieldWord}</span>.`;
      }
      trReflexColored = possessiveSubj + trShieldSuffix;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "are", role: "present_tense", color: colorAux, suffix_tr: "-dır" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: shieldCoreWord, role: "modal_shield", color: colorPerfect, suffix_tr: activeShieldObj.trLabel });
      wagonChain.push({ word: verbBeOrTo, role: "active_inf", color: colorInfinitive });
      wagonChain.push({ word: mainVerbWord, role: "main_verb", color: colorVerb, suffix_tr: activeStem + "-" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const possessiveSpeaker = applyPossessive(activeSpeakerTr);
      const accusativeObj = applyAccusative(activeSubjectObj.tr);
      let trShieldSuffix = "";
      if (activeShieldObj.id === 'likely') {
        trShieldSuffix = ` ${accusativeObj} <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorInfinitive}; font-weight:800;">${isNeg ? 'memiş olması' : 'miş olması'}</span> <span style="color:${colorPerfect}; font-weight:800;">muhtemeldir</span>.`;
      } else if (activeShieldObj.id === 'expected') {
        trShieldSuffix = ` ${accusativeObj} <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorInfinitive}; font-weight:800;">${isNeg ? 'memesi' : 'mesi'}</span> <span style="color:${colorPerfect}; font-weight:800;">bekleniyor</span>.`;
      } else if (activeShieldObj.id === 'required') {
        trShieldSuffix = ` ${accusativeObj} <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorInfinitive}; font-weight:800;">${isNeg ? 'memesi' : 'mesi'}</span> <span style="color:${colorPerfect}; font-weight:800;">gerekiyor</span>.`;
      } else if (activeShieldObj.id === 'bound') {
        trShieldSuffix = ` ${accusativeObj} <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorInfinitive}; font-weight:800;">${isNeg ? 'memesi' : 'mesi'}</span> <span style="color:${colorPerfect}; font-weight:800;">kaçınılmazdır</span>.`;
      } else if (activeShieldObj.id === 'authorized') {
        trShieldSuffix = ` ${accusativeObj} <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorInfinitive}; font-weight:800;">${isNeg ? 'memesine' : 'mesine'}</span> <span style="color:${colorPerfect}; font-weight:800;">izin verilmiştir</span>.`;
      } else if (activeShieldObj.id === 'capable') {
        trShieldSuffix = ` ${accusativeObj} <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorInfinitive}; font-weight:800;">${isNeg ? 'mama' : 'ebilme'}</span> <span style="color:${colorPerfect}; font-weight:800;">yetisine sahiptir</span>.`;
      } else {
        const trVerbBase = isNeg ? (activeStem + (get2WayHarmony(getLastVowel(activeStem)) === 'a' ? 'madığı' : 'mediği')) : (activeStem + applyDigi(activeStem));
        const trVerbStemPart = trVerbBase.slice(0, activeStem.length);
        const trVerbSuffixPart = trVerbBase.slice(activeStem.length);
        const shieldWord = activeShieldObj.id === 'rumored' ? 'söyleniyor' : 'bildiriliyor';
        trShieldSuffix = ` ${accusativeObj} <span style="color:${colorVerb}; font-weight:800;">${trVerbStemPart}</span><span style="color:${colorInfinitive}; font-weight:800;">${trVerbSuffixPart}</span> <span style="color:${colorPerfect}; font-weight:800;">${shieldWord}</span>.`;
      }
      trReflexColored = possessiveSpeaker + trShieldSuffix;
    }
    
  } else if (lvlNum === 11) {
    const shieldEng = isPassive ? activeShieldObj.engPassive : activeShieldObj.engActive;
    const splitShield = shieldEng.split(" ");
    const shieldCoreWord = splitShield[0];
    
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: activeSubjectObj.plural ? "are" : "is", role: "present_tense", color: colorAux, suffix_tr: "-dır" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: shieldCoreWord, role: "modal_shield", color: colorPerfect, suffix_tr: activeShieldObj.trLabel });
      wagonChain.push({ word: "to be", role: "passive_inf", color: colorInfinitive });
      wagonChain.push({ word: "being", role: "continuous_motor", color: colorContinuous, suffix_tr: "-makta olduğu" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const possessiveSubj = applyPossessive(activeSubjectObj.tr);
      const contPhrase = applyContinuous(passiveStem, isNeg, false);
      const contSuffix = contPhrase.slice(passiveStem.length);
      const shieldWord = activeShieldObj.id === 'rumored' ? 'söyleniyor' : (activeShieldObj.id === 'reported' ? 'bildiriliyor' : (activeShieldObj.id === 'expected' ? 'bekleniyor' : 'muhtemeldir'));
      trReflexColored = possessiveSubj + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorContinuous}; font-weight:800;">${contSuffix} olduğu</span> <span style="color:${colorPerfect}; font-weight:800;">${shieldWord}</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "are", role: "present_tense", color: colorAux, suffix_tr: "-dır" });
      if (isNeg) {
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      }
      wagonChain.push({ word: shieldCoreWord, role: "modal_shield", color: colorPerfect, suffix_tr: activeShieldObj.trLabel });
      wagonChain.push({ word: "to be", role: "active_inf", color: colorInfinitive });
      wagonChain.push({ word: activeVerbObj.engIng, role: "main_verb_ing", color: colorVerb, suffix_tr: activeStem + "-makta olduğu" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const possessiveSpeaker = applyPossessive(activeSpeakerTr);
      const accusativeObj = applyAccusative(activeSubjectObj.tr);
      const contPhrase = applyContinuous(activeStem, isNeg, false);
      const contSuffix = contPhrase.slice(activeStem.length);
      const shieldWord = activeShieldObj.id === 'rumored' ? 'söyleniyor' : (activeShieldObj.id === 'reported' ? 'bildiriliyor' : (activeShieldObj.id === 'expected' ? 'bekleniyor' : 'muhtemeldir'));
      trReflexColored = possessiveSpeaker + ` ${accusativeObj} <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorContinuous}; font-weight:800;">${contSuffix} olduğu</span> <span style="color:${colorPerfect}; font-weight:800;">${shieldWord}</span>.`;
    }
    
  } else if (lvlNum === 12) {
    const modalVal = state.modalSelectLevel12 || 'could';
    let modalWord = "";
    if (modalVal === 'should') {
      modalWord = isPassive ? (isNeg ? "should not have been" : "should have been") : (isNeg ? "should not have" : "should have");
    } else if (modalVal === 'must') {
      modalWord = isPassive ? (isNeg ? "must not have been" : "must have been") : (isNeg ? "must not have" : "must have");
    } else if (modalVal === 'might') {
      modalWord = isPassive ? (isNeg ? "might not have been" : "might have been") : (isNeg ? "might not have" : "might have");
    } else {
      modalWord = isPassive ? (isNeg ? "could not have been" : "could have been") : (isNeg ? "could not have" : "could have");
    }
    
    const modalSuffix = (modalVal === 'should' || modalVal === 'must' || modalVal === 'might') ? 'gerekirdi' : 'mümkündü';
    
    const stemExp = isPassive ? 'beklen' : 'bekle';
    let expectationSuffix = "";
    if (modalVal === 'should') {
      expectationSuffix = isNeg ? `${stemExp}memesi` : `${stemExp}mesi`;
    } else if (modalVal === 'must' || modalVal === 'might') {
      expectationSuffix = isNeg ? `${stemExp}memiş olması` : `${stemExp}miş olması`;
    } else {
      expectationSuffix = isNeg ? `${stemExp}memiş olabilmesi` : `${stemExp}miş olabilmesi`;
    }
    
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: modalWord, role: "modal_shield", color: colorAux, suffix_tr: modalSuffix });
      wagonChain.push({ word: "expected", role: "expectation_shield", color: colorPerfect, suffix_tr: expectationSuffix });
      wagonChain.push({ word: "to have been", role: "passive_inf", color: colorInfinitive, suffix_tr: "-miş olmasının" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const possessiveSubj = applyPossessive(activeSubjectObj.tr);
      let secondPart = "";
      if (modalVal === 'should') {
        secondPart = `<span style="color:${colorPerfect}; font-weight:800;">${stemExp}${isNeg ? 'memesi' : 'mesi'}</span> <span style="color:${colorAux}; font-weight:800;">gerekirdi</span>.`;
      } else if (modalVal === 'must' || modalVal === 'might') {
        secondPart = `<span style="color:${colorPerfect}; font-weight:800;">${stemExp}${isNeg ? 'memiş olması' : 'miş olması'}</span> <span style="color:${colorAux}; font-weight:800;">gerekirdi</span>.`;
      } else {
        secondPart = `<span style="color:${colorPerfect}; font-weight:800;">${stemExp}${isNeg ? 'memiş olabilmesi' : 'miş olabilmesi'}</span> <span style="color:${colorAux}; font-weight:800;">${isNeg ? 'mümkün değildi' : 'mümkündü'}</span>.`;
      }
      trReflexColored = possessiveSubj + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorInfinitive}; font-weight:800;">miş olmasının</span> ` + secondPart;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: modalWord, role: "modal_shield", color: colorAux, suffix_tr: modalSuffix });
      wagonChain.push({ word: "expected", role: "expectation_shield", color: colorPerfect, suffix_tr: expectationSuffix });
      wagonChain.push({ word: "to have", role: "perfect_inf", color: colorInfinitive, suffix_tr: "-miş olmasını" });
      wagonChain.push({ word: activeVerbObj.engV1, role: "main_verb", color: colorVerb, suffix_tr: activeStem + "-" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const possessiveSpeaker = applyPossessive(activeSpeakerTr);
      const accusativeObj = applyAccusative(activeSubjectObj.tr);
      let secondPart = "";
      if (modalVal === 'should') {
        secondPart = `<span style="color:${colorPerfect}; font-weight:800;">${stemExp}${isNeg ? 'memesi' : 'mesi'}</span> <span style="color:${colorAux}; font-weight:800;">gerekirdi</span>.`;
      } else if (modalVal === 'must' || modalVal === 'might') {
        secondPart = `<span style="color:${colorPerfect}; font-weight:800;">${stemExp}${isNeg ? 'memiş olması' : 'miş olması'}</span> <span style="color:${colorAux}; font-weight:800;">gerekirdi</span>.`;
      } else {
        secondPart = `<span style="color:${colorPerfect}; font-weight:800;">${stemExp}${isNeg ? 'memiş olabilmesi' : 'miş olabilmesi'}</span> <span style="color:${colorAux}; font-weight:800;">${isNeg ? 'mümkün değildi' : 'mümkündü'}</span>.`;
      }
      trReflexColored = possessiveSpeaker + ` ${accusativeObj} <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorInfinitive}; font-weight:800;">miş olmasını</span> ` + secondPart;
    }
  }

  
  if (state.questionOn) {
    let auxIndex = -1;
    const auxList = ["is", "are", "was", "were", "will", "do", "does", "did", "have", "has", "had", "could", "should", "must", "might", "would", "can"];
    
    // Check if there is an auxiliary verb in the chain
    for (let i = 0; i < wagonChain.length; i++) {
      const firstWord = wagonChain[i].word.split(" ")[0].toLowerCase();
      if (auxList.includes(firstWord)) {
        auxIndex = i;
        break;
      }
    }
    
    // For used_to, have_to, had_to: question is formed with Do/Does/Did!
    if (modal === 'used_to' || modal === 'have_to' || modal === 'had_to') {
      let auxWord = "Did";
      if (modal === 'have_to') auxWord = activeSubjectObj.plural ? "Do" : "Does";
      
      // Remove mWord ("used", "have", "has", "had") and replace with base form
      const mIndex = wagonChain.findIndex(w => w.word === mWord || w.word === mNotWord);
      if (mIndex !== -1) {
        wagonChain[mIndex].word = (modal === 'have_to') ? 'have' : 'use';
      }
      
      wagonChain.unshift({ word: auxWord, role: "status_linker", color: colorAux });
      
      const subjectWagon = wagonChain[1];
      if (subjectWagon && subjectWagon.role === "subject") {
        subjectWagon.word = subjectWagon.word.charAt(0).toLowerCase() + subjectWagon.word.slice(1);
      }
    } else if (auxIndex > 0) {
      // Remove aux wagon and insert at index 0
      const auxWagon = wagonChain.splice(auxIndex, 1)[0];
      
      // Capitalize first letter of aux
      auxWagon.word = auxWagon.word.charAt(0).toUpperCase() + auxWagon.word.slice(1);
      
      // Lowercase first letter of the subject if it was at index 0
      const subjectWagon = wagonChain[0];
      if (subjectWagon && subjectWagon.role === "subject") {
        subjectWagon.word = subjectWagon.word.charAt(0).toLowerCase() + subjectWagon.word.slice(1);
      }
      
      wagonChain.unshift(auxWagon);
    } else {
      // No aux verb found (Present Simple Active Affirmative or Past Simple Active Affirmative)
      const isPast = (wagonChain.some(w => w.word === activeVerbObj.pastActive));
      const subjectWagon = wagonChain[0];
      
      if (isPast) {
        // Insert Did
        wagonChain.unshift({ word: "Did", role: "status_linker", color: colorAux });
        // Reset verb to V1
        const verbWagon = wagonChain.find(w => w.role === "main_verb");
        if (verbWagon) {
          verbWagon.word = activeVerbObj.engV1;
        }
      } else {
        // Insert Do or Does
        const doWord = activeSubjectObj.plural ? "Do" : "Does";
        wagonChain.unshift({ word: doWord, role: "status_linker", color: colorAux });
        
        // Reset verb to V1 if singular (e.g. writes -> write)
        const verbWagon = wagonChain.find(w => w.role === "main_verb");
        if (verbWagon) {
          verbWagon.word = activeVerbObj.engV1;
        }
      }
      
      if (subjectWagon && subjectWagon.role === "subject") {
        subjectWagon.word = subjectWagon.word.charAt(0).toLowerCase() + subjectWagon.word.slice(1);
      }
    }
    
    // Add question mark to final english sentence
    wagonChain[wagonChain.length - 1].word = wagonChain[wagonChain.length - 1].word.replace(/\.$/, "") + "?";
    
    // Transform Turkish reflection to question
    trReflexColored = convertTrToQuestion(trReflexColored);
  }
currentLvl.wagon_chain = wagonChain;
  currentLvl.english_sentence = wagonChain.map(w => w.word).join(' ').replace(/\s+\./g, '.').replace(/\.+/g, '.');
  currentLvl.turkish_reflex_colored = trReflexColored;
  currentLvl.turkish_reflex = trReflexColored.replace(/<[^>]*>/g, '');
  
  return currentLvl;
}

function initSimulator() {
  const levelBtnsContainer = document.getElementById('simulator-level-buttons');
  if (!levelBtnsContainer) return;

  const domainBtnsContainer = document.getElementById('simulator-domain-buttons');
  if (domainBtnsContainer) {
    const activeDomain = state.activeDomain || 'history';
    domainBtnsContainer.querySelectorAll('.domain-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.domain === activeDomain);
      
      btn.onclick = () => {
        const selectedDom = btn.dataset.domain;
        state.activeDomain = selectedDom;
        saveState();
        
        deactivatedWagons = [];
        showMissionQuestion = false;
        selectedMissionOption = null;
        const glitchOverlay = document.getElementById('glitch-overlay');
        if (glitchOverlay) {
          glitchOverlay.classList.remove('show');
        }
        
        domainBtnsContainer.querySelectorAll('.domain-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.domain === selectedDom);
        });
        
        renderSimulatorContent();
        renderActiveMission();
      };
    });
  }

  // TAB SWITCHING LOGIC FOR MATRIX
  const btnTabPure = document.getElementById('btn-tab-pure');
  const btnTabCore = document.getElementById('btn-tab-core');
  const btnTabSemi = document.getElementById('btn-tab-semi');
  const btnTabPref = document.getElementById('btn-tab-pref');
  const btnTabPerfect = document.getElementById('btn-tab-perfect');
  
  const tabPureContent = document.getElementById('matrix-tab-pure-content');
  const tabCoreContent = document.getElementById('matrix-tab-core-content');
  const tabSemiContent = document.getElementById('matrix-tab-semi-content');
  const tabPrefContent = document.getElementById('matrix-tab-pref-content');
  const tabPerfectContent = document.getElementById('matrix-tab-perfect-content');

  const tabs = [
    { btn: btnTabPure, content: tabPureContent },
    { btn: btnTabCore, content: tabCoreContent },
    { btn: btnTabSemi, content: tabSemiContent },
    { btn: btnTabPref, content: tabPrefContent },
    { btn: btnTabPerfect, content: tabPerfectContent }
  ];

  tabs.forEach(tab => {
    if (tab.btn && tab.content) {
      tab.btn.onclick = () => {
        tabs.forEach(t => {
          if (t.btn && t.content) {
            if (t === tab) {
              t.btn.classList.add('active');
              t.btn.style.border = '1px solid var(--accent-primary)';
              t.btn.style.background = 'rgba(59, 130, 246, 0.1)';
              t.btn.style.color = 'var(--accent-primary)';
              t.content.style.display = 'block';
            } else {
              t.btn.classList.remove('active');
              t.btn.style.border = '1px solid var(--border-color)';
              t.btn.style.background = 'var(--bg-body)';
              t.btn.style.color = 'var(--text-secondary)';
              t.content.style.display = 'none';
            }
          }
        });
      };
    }
  });

  // MODAL MATRIX BUTTONS CLICK HANDLERS
  document.querySelectorAll('.modal-matrix-btn').forEach(btn => {
    btn.onclick = () => {
      const modalVal = btn.dataset.modal;
      const aspectVal = btn.dataset.aspect || 'simple';
      const tenseVal = btn.dataset.tense || 'present';
      const isNeg = btn.dataset.neg === 'true';

      state.selectedSimulatorModal = modalVal;
      state.negationOn = isNeg;

      // Determine selectedLevel based on tense and aspect
      if (tenseVal === 'future') {
        if (aspectVal === 'simple') selectedLevel = 3;
        else if (aspectVal === 'progressive') selectedLevel = 4;
        else if (aspectVal === 'perfect') selectedLevel = 8;
        else selectedLevel = 9;
      } else if (tenseVal === 'past') {
        if (aspectVal === 'simple') selectedLevel = 2;
        else if (aspectVal === 'progressive') selectedLevel = 5;
        else if (aspectVal === 'perfect') selectedLevel = 7;
        else selectedLevel = 12;
      } else {
        if (aspectVal === 'simple') selectedLevel = 2;
        else if (aspectVal === 'progressive') selectedLevel = 4;
        else if (aspectVal === 'perfect') selectedLevel = 6;
        else selectedLevel = 9;
      }

      state.pureTense = null;
      saveState();

      // Clear pure tense matrix highlights
      document.querySelectorAll('.matrix-cell-btn').forEach(b => {
        b.style.background = 'var(--bg-body)';
        b.style.color = 'var(--text-primary)';
        b.style.borderColor = 'var(--border-color)';
      });

      deactivatedWagons = [];
      showMissionQuestion = false;
      selectedMissionOption = null;

      const glitchOverlay = document.getElementById('glitch-overlay');
      if (glitchOverlay) {
        glitchOverlay.classList.remove('show');
      }

      renderSimulatorContent();
      renderActiveMission();
    };
  });

  const predicateLevelsList = [
    { count: 0, title: "Durum (0 Eylem)" },
    { count: 1, title: "1 Öğeli Yüklem" },
    { count: 2, title: "2 Öğeli Yüklem" },
    { count: 3, title: "3 Öğeli Yüklem" },
    { count: 4, title: "4 Öğeli Yüklem" },
    { count: 5, title: "5 Öğeli Yüklem" },
    { count: 6, title: "6 Öğeli Yüklem" },
    { count: 7, title: "7 Öğeli Yüklem" },
    { count: 8, title: "8 Öğeli Yüklem" }
  ];

  levelBtnsContainer.innerHTML = predicateLevelsList.map(item => {
    return `
      <button class="simulator-level-btn" data-pred-count="${item.count}">
        <span class="lvl-num">${item.count} Öğe</span>
        <span class="lvl-title">${item.title}</span>
      </button>
    `;
  }).join('');

  levelBtnsContainer.querySelectorAll('.simulator-level-btn').forEach(btn => {
    btn.onclick = () => {
      const targetCount = parseInt(btn.dataset.predCount, 10);
      
      // Clear highlight of matrix buttons
      document.querySelectorAll('.matrix-cell-btn').forEach(b => {
        b.style.background = 'var(--bg-body)';
        b.style.color = 'var(--text-primary)';
        b.style.borderColor = 'var(--border-color)';
      });
      
      deactivatedWagons = [];
      showMissionQuestion = false;
      selectedMissionOption = null;
      
      const glitchOverlay = document.getElementById('glitch-overlay');
      if (glitchOverlay) {
        glitchOverlay.classList.remove('show');
      }

      configureCockpitForPredicateCount(targetCount);
      renderSimulatorContent();
      renderActiveMission();
    };
  });

  const dismissGlitchBtn = document.getElementById('btn-glitch-dismiss');
  if (dismissGlitchBtn) {
    dismissGlitchBtn.onclick = () => {
      const glitchOverlay = document.getElementById('glitch-overlay');
      if (glitchOverlay) {
        glitchOverlay.classList.remove('show');
      }
    };
  }

  initSimulatorMatrixEventListeners();
  initCockpitEventListeners();
  renderSimulatorContent();
  renderActiveMission();
}

function initSimulatorMatrixEventListeners() {
  const matrixBtns = document.querySelectorAll('.matrix-cell-btn');
  matrixBtns.forEach(btn => {
    const t = btn.dataset.tense;
    const a = btn.dataset.aspect;

    btn.onclick = () => {
      state.pureTense = { tense: t, aspect: a };
      state.selectedSimulatorModal = 'none';
      const modalSelector = document.getElementById('select-simulator-modal');
      if (modalSelector) {
        modalSelector.value = 'none';
      }
      saveState();
      
      // Clear highlight of regular level buttons
      const levelBtnsContainer = document.getElementById('simulator-level-buttons');
      if (levelBtnsContainer) {
        levelBtnsContainer.querySelectorAll('.simulator-level-btn').forEach(b => {
          b.classList.remove('active');
        });
      }

      deactivatedWagons = [];
      showMissionQuestion = false;
      selectedMissionOption = null;
      
      const glitchOverlay = document.getElementById('glitch-overlay');
      if (glitchOverlay) {
        glitchOverlay.classList.remove('show');
      }

      renderSimulatorContent();
      renderActiveMission();
    };
  });
}
function renderSimulator() {
  initSimulator();
}

function renderSimulatorContent() {
  const currentLvlData = getActiveLevelData(selectedLevel);
  if (!currentLvlData) return;

  const chainContainer = document.getElementById('train-wagon-chain');
  if (chainContainer) {
    let wagonsHtml = currentLvlData.wagon_chain.map((w, index) => {
      const isLast = index === currentLvlData.wagon_chain.length - 1;
      
      let sabotageClass = "";
      let isTarget = false;
      const activeMission = labMissions.find(m => m.id === activeMissionId);
      if (activeMission && activeMission.level_target === selectedLevel && activeMission.target_word === w.word && !completedMissions.includes(activeMissionId)) {
        isTarget = true;
        sabotageClass = deactivatedWagons.includes(w.word) ? "deactivated" : "sabotage-target";
      }

      const isDeactivated = deactivatedWagons.includes(w.word);
      const activeClass = isDeactivated ? "deactivated" : sabotageClass;
      
      const textStyle = isDeactivated ? "text-decoration: line-through; opacity: 0.5;" : "";
      const suffixHtml = w.suffix_tr ? `<span class="wagon-suffix" style="${textStyle}">${w.suffix_tr}</span>` : '';
      
      // Compute grammatical formula for this wagon
      let formula = "";
      const roleLower = (w.role || '').toLowerCase();
      const wordLower = (w.word || '').toLowerCase();
      
      if (roleLower === 'subject') {
        formula = 'Subject';
      } else if (roleLower === 'object') {
        formula = 'Object';
      } else if (roleLower === 'negation' || wordLower === 'not') {
        formula = 'not';
      } else if (roleLower === 'status_linker') {
        formula = 'am/is/are';
      } else if (roleLower === 'past_tense') {
        formula = 'was/were';
      } else if (roleLower === 'future_passive') {
        formula = 'will be';
      } else if (roleLower === 'future' || roleLower === 'future_will') {
        formula = 'will';
      } else if (roleLower === 'present_tense') {
        formula = 'am/is/are';
      } else if (roleLower === 'continuous_motor') {
        formula = 'being';
      } else if (roleLower === 'main_verb_ing') {
        formula = 'V+ing';
      } else if (roleLower === 'main_verb_v3') {
        formula = 'V3';
      } else if (roleLower === 'main_verb') {
        formula = 'V1';
      } else if (roleLower === 'perfect_bridge') {
        formula = (wordLower === 'had') ? 'had' : 'have/has';
      } else if (roleLower === 'perfect_passive') {
        formula = 'been';
      } else if (roleLower === 'perfect_inf') {
        formula = 'to have';
      } else if (roleLower === 'passive_inf') {
        formula = 'to be';
      } else if (roleLower === 'rumor_linker') {
        formula = 'am/is/are';
      } else if (roleLower === 'rumor_verb') {
        formula = 'V3';
      } else if (roleLower === 'modal_shield' || roleLower === 'modal_passive' || roleLower === 'modal_active') {
        if (wordLower.includes('should')) formula = 'should';
        else if (wordLower.includes('must')) formula = 'must';
        else if (wordLower.includes('could')) formula = 'could';
        else if (wordLower.includes('might')) formula = 'might';
        else formula = 'modal';
      } else {
        formula = w.role || '';
      }
      
      return `
        <div class="wagon-wrapper" data-word="${w.word}">
          <div class="wagon-box ${activeClass}" style="background-color: ${w.color};" data-target="${isTarget}">
            <span class="wagon-formula" style="${textStyle}">${formula}</span>
            <span class="wagon-word" style="${textStyle}">${w.word}</span>
            <span class="wagon-role" style="${textStyle}">${w.role.replace(/_/g, ' ')}</span>
            ${suffixHtml}
            <div class="wagon-wheels">
              <span class="wheel"></span>
              <span class="wheel"></span>
            </div>
          </div>
          ${!isLast ? '<div class="wagon-coupler"></div>' : ''}
        </div>
      `;
    }).join('');

    if (selectedLevel === 10) {
      wagonsHtml += `
        <div class="wagon-wrapper">
          <button class="wagon-add-btn" id="btn-add-wagon" title="Vagon Ekle">+</button>
        </div>
      `;
    }

    chainContainer.innerHTML = wagonsHtml;

    chainContainer.querySelectorAll('.wagon-box.sabotage-target').forEach(box => {
      box.onclick = () => {
        const word = box.closest('.wagon-wrapper').dataset.word;
        if (!deactivatedWagons.includes(word)) {
          deactivatedWagons.push(word);
          showMissionQuestion = true;
          selectedMissionOption = null;
          renderSimulatorContent();
          renderActiveMission();
        }
      };
    });

    const addWagonBtn = document.getElementById('btn-add-wagon');
    if (addWagonBtn) {
      addWagonBtn.onclick = () => {
        const glitchOverlay = document.getElementById('glitch-overlay');
        if (glitchOverlay) {
          glitchOverlay.classList.add('show');
        }
        
        const activeMission = labMissions.find(m => m.id === activeMissionId);
        if (activeMission && activeMission.id === "mission_3" && !completedMissions.includes("mission_3")) {
          showMissionQuestion = true;
          selectedMissionOption = null;
          renderActiveMission();
        }
      };
    }

    const wheels = chainContainer.querySelectorAll('.wheel');
    wheels.forEach(wh => {
      wh.style.animationPlayState = 'running';
    });

    setTimeout(() => {
      chainContainer.scrollTo({
        left: chainContainer.scrollWidth,
        behavior: 'smooth'
      });
    }, 150);

    setTimeout(() => {
      wheels.forEach(wh => {
        wh.style.animationPlayState = 'paused';
      });
    }, 1200);
  }

  let finalTrReflex = currentLvlData.turkish_reflex_colored;
  if (selectedLevel === 7 && deactivatedWagons.includes("being")) {
    const domain = state.activeDomain || 'history';
    if (domain === 'history') {
      finalTrReflex = 'Orta çağ parşömen kağıtları <span style="color:#f59e0b; font-weight:800;">restore edil</span><span style="color:#ec4899; font-weight:800;">miş</span> <span style="color:#3b82f6; font-weight:800;">olacak</span>.';
    } else if (domain === 'cinema') {
      finalTrReflex = 'Yeraltı sinema arşivleri <span style="color:#f59e0b; font-weight:800;">dijitalleştiril</span><span style="color:#ec4899; font-weight:800;">miş</span> <span style="color:#3b82f6; font-weight:800;">olacak</span>.';
    } else if (domain === 'economy') {
      finalTrReflex = 'Piyasa likidite endeksleri <span style="color:#f59e0b; font-weight:800;">manipüle edil</span><span style="color:#ec4899; font-weight:800;">miş</span> <span style="color:#3b82f6; font-weight:800;">olacak</span>.';
    } else if (domain === 'sociology') {
      finalTrReflex = 'Göçebe topluluk kültürleri <span style="color:#f59e0b; font-weight:800;">asimile edil</span><span style="color:#ec4899; font-weight:800;">miş</span> <span style="color:#3b82f6; font-weight:800;">olacak</span>.';
    }
    if (state.activePassiveMode === 'active') {
      finalTrReflex = activeTurkishReflex(finalTrReflex);
    }
    if (state.negationOn) {
      finalTrReflex = negateTurkishReflex(finalTrReflex);
    }
  } else if (selectedLevel === 9 && deactivatedWagons.includes("are rumored")) {
    const domain = state.activeDomain || 'history';
    if (domain === 'history') {
      finalTrReflex = 'İmparatorluk hazinesi altın varlıkları <span style="color:#f59e0b; font-weight:800;">yağmalan</span><span style="color:#10b981; font-weight:800;">maktaydı</span>.';
    } else if (domain === 'cinema') {
      finalTrReflex = 'Sansürlü film sahneleri <span style="color:#f59e0b; font-weight:800;">yeniden kurgulan</span><span style="color:#10b981; font-weight:800;">maktaydı</span>.';
    } else if (domain === 'economy') {
      finalTrReflex = 'Piyasa likidite endeksleri <span style="color:#f59e0b; font-weight:800;">manipüle edil</span><span style="color:#10b981; font-weight:800;">maktaydı</span>.';
    } else if (domain === 'sociology') {
      finalTrReflex = 'Sapan sosyal davranışlar <span style="color:#f59e0b; font-weight:800;">normalleştiril</span><span style="color:#10b981; font-weight:800;">mekteydi</span>.';
    }
    if (state.activePassiveMode === 'active') {
      finalTrReflex = activeTurkishReflex(finalTrReflex);
    }
    if (state.negationOn) {
      finalTrReflex = negateTurkishReflex(finalTrReflex);
    }
  }

  const englishText = document.getElementById('simulator-english-sentence');
  const turkishText = document.getElementById('simulator-turkish-reflex');
  const noteText = document.getElementById('simulator-mechanic-note');

  if (englishText) {
    let coloredEnglishHtml = currentLvlData.wagon_chain.map(w => {
      let color = w.color || 'var(--text-primary)';
      if (color === '#1f2937' || color === '#1F2937') {
        color = 'var(--text-primary)';
      }
      const isDeactivated = deactivatedWagons.includes(w.word);
      const textStyle = isDeactivated ? "text-decoration: line-through; opacity: 0.5;" : "";
      return `<span style="color: ${color}; font-weight: 800; ${textStyle}">${w.word}</span>`;
    }).join(' ');
    englishText.innerHTML = coloredEnglishHtml;
  }
  if (turkishText) turkishText.innerHTML = finalTrReflex;
  if (noteText) noteText.textContent = currentLvlData.mechanic_note;

  syncCockpitUI();
  syncPredicateLevelsHighlight();
  syncPureTenseMatrixHighlight();
  syncModalMatrixHighlight();
}

function syncCockpitUI() {
  const negationCheckbox = document.getElementById('toggle-negation');
  const negationStatus = document.getElementById('negation-status-label');
  if (negationCheckbox) {
    negationCheckbox.checked = state.negationOn || false;
    if (negationStatus) {
      negationStatus.textContent = negationCheckbox.checked ? "AÇIK" : "KAPALI";
    }
  }
  
  
  const questionCheckbox = document.getElementById('toggle-question');
  const questionStatus = document.getElementById('question-status-label');
  if (questionCheckbox) {
    questionCheckbox.checked = state.questionOn || false;
    if (questionStatus) {
      questionStatus.textContent = questionCheckbox.checked ? "SORU" : "DÜZ CÜMLE";
    }
  }

  const modalSelector = document.getElementById('select-simulator-modal');
  if (modalSelector) {
    modalSelector.value = state.selectedSimulatorModal || 'none';
  }
const voiceCheckbox = document.getElementById('toggle-voice');
  const voiceStatus = document.getElementById('voice-status-label');
  if (voiceCheckbox) {
    voiceCheckbox.checked = (state.activePassiveMode === 'active');
    if (voiceStatus) {
      voiceStatus.textContent = voiceCheckbox.checked ? "AKTİF" : "EDİLGEN";
    }
  }
  
  const modalSelect = document.getElementById('select-modal');
  if (modalSelect) {
    modalSelect.value = state.modalSelectLevel12 || 'could';
  }
  
  const modalCtrlGroup = document.getElementById('control-group-modal');
  if (modalCtrlGroup) {
    if (selectedLevel === 12) {
      modalCtrlGroup.style.display = 'block';
    } else {
      modalCtrlGroup.style.display = 'none';
    }
  }

  const condSelector = document.getElementById('select-conditional');
  if (condSelector) {
    condSelector.value = state.conditionalType || 'none';
  }

  // Populate and set dynamic Subject Select
  const subjectSelect = document.getElementById('select-subject');
  if (subjectSelect) {
    subjectSelect.innerHTML = '';
    subjects.forEach((subj, index) => {
      const opt = document.createElement('option');
      opt.value = index;
      opt.textContent = `${subj.eng} (${subj.tr})`;
      subjectSelect.appendChild(opt);
    });
    let val = parseInt(state.selectedSubjectIndex, 10);
    if (isNaN(val) || val < 0 || val >= subjects.length) {
      val = 0;
    }
    state.selectedSubjectIndex = val;
    subjectSelect.value = val;
  }

  // Populate and set dynamic Verb Select
  const verbSelect = document.getElementById('select-verb');
  if (verbSelect) {
    verbSelect.innerHTML = '';
    verbs.forEach((verb, index) => {
      const opt = document.createElement('option');
      opt.value = index;
      opt.textContent = `${verb.engV1} (${verb.trStem})`;
      verbSelect.appendChild(opt);
    });
    let val = parseInt(state.selectedVerbIndex, 10);
    if (isNaN(val) || val < 0 || val >= verbs.length) {
      val = 0;
    }
    state.selectedVerbIndex = val;
    verbSelect.value = val;
  }

  // Populate, set and toggle visibility of Shield Select (Level 10-11)
  const shieldSelect = document.getElementById('select-shield');
  const shieldCtrlGroup = document.getElementById('control-group-shield');
  if (shieldSelect) {
    shieldSelect.innerHTML = '';
    shields.forEach((shield) => {
      const opt = document.createElement('option');
      opt.value = shield.id;
      opt.textContent = `${shield.id} (${shield.trLabel})`;
      shieldSelect.appendChild(opt);
    });
    shieldSelect.value = state.selectedShieldId || 'likely';
  }
  if (shieldCtrlGroup) {
    if (selectedLevel === 10 || selectedLevel === 11) {
      shieldCtrlGroup.style.display = 'block';
    } else {
      shieldCtrlGroup.style.display = 'none';
    }
  }
}

function initCockpitEventListeners() {
  const negationCheckbox = document.getElementById('toggle-negation');
  if (negationCheckbox) {
    negationCheckbox.onchange = (e) => {
      state.negationOn = e.target.checked;
      saveState();
      renderSimulatorContent();
    };
  }
  
  
  const questionCheckbox = document.getElementById('toggle-question');
  if (questionCheckbox) {
    questionCheckbox.onchange = (e) => {
      state.questionOn = e.target.checked;
      saveState();
      renderSimulatorContent();
    };
  }

  const modalSelector = document.getElementById('select-simulator-modal');
  if (modalSelector) {
    modalSelector.onchange = (e) => {
      state.selectedSimulatorModal = e.target.value;
      saveState();
      renderSimulatorContent();
    };
  }
const voiceCheckbox = document.getElementById('toggle-voice');
  if (voiceCheckbox) {
    voiceCheckbox.onchange = (e) => {
      state.activePassiveMode = e.target.checked ? 'active' : 'passive';
      saveState();
      renderSimulatorContent();
    };
  }
  
  const modalSelect = document.getElementById('select-modal');
  if (modalSelect) {
    modalSelect.onchange = (e) => {
      state.modalSelectLevel12 = e.target.value;
      saveState();
      renderSimulatorContent();
    };
  }

  const condSelector = document.getElementById('select-conditional');
  if (condSelector) {
    condSelector.onchange = (e) => {
      state.conditionalType = e.target.value;
      saveState();
      renderSimulatorContent();
    };
  }

  const subjectSelect = document.getElementById('select-subject');
  if (subjectSelect) {
    subjectSelect.onchange = (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val) || val < 0 || val >= subjects.length) val = 0;
      state.selectedSubjectIndex = val;
      saveState();
      renderSimulatorContent();
    };
  }

  const verbSelect = document.getElementById('select-verb');
  if (verbSelect) {
    verbSelect.onchange = (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val) || val < 0 || val >= verbs.length) val = 0;
      state.selectedVerbIndex = val;
      saveState();
      renderSimulatorContent();
    };
  }

  const shieldSelect = document.getElementById('select-shield');
  if (shieldSelect) {
    shieldSelect.onchange = (e) => {
      state.selectedShieldId = e.target.value;
      saveState();
      renderSimulatorContent();
    };
  }
}

function renderMissionsList() {
  const listContainer = document.getElementById('missions-list');
  const countEl = document.getElementById('missions-count');
  if (!listContainer || !countEl) return;

  countEl.textContent = `${completedMissions.length}/3 Tamamlandı`;

  listContainer.innerHTML = labMissions.map(m => {
    let statusLabel = "🔒 Kilitli";
    let statusClass = "locked";

    if (completedMissions.includes(m.id)) {
      statusLabel = "✓ Tamamlandı";
      statusClass = "completed";
    } else if (m.id === activeMissionId) {
      statusLabel = "➜ Aktif";
      statusClass = "active";
    }

    return `
      <div class="mission-item ${statusClass}" data-id="${m.id}">
        <span class="mission-item-title">${m.task_title}</span>
        <span class="mission-item-status">${statusLabel}</span>
      </div>
    `;
  }).join('');

  listContainer.querySelectorAll('.mission-item').forEach(item => {
    item.addEventListener('click', () => {
      const missionId = item.dataset.id;
      if (completedMissions.includes(missionId)) return;

      activeMissionId = missionId;
      showMissionQuestion = false;
      selectedMissionOption = null;
      deactivatedWagons = [];
      document.getElementById('glitch-overlay').classList.remove('show');

      const targetLvl = labMissions.find(x => x.id === missionId).level_target;
      selectedLevel = targetLvl;

      const btnsContainer = document.getElementById('simulator-level-buttons');
      if (btnsContainer) {
        btnsContainer.querySelectorAll('.simulator-level-btn').forEach(b => {
          b.classList.toggle('active', parseInt(b.dataset.level, 10) === selectedLevel);
        });
      }

      renderSimulatorContent();
      renderMissionsList();
      renderActiveMission();
    });
  });
}

function renderActiveMission() {
  const detailsContainer = document.getElementById('active-mission-details');
  if (!detailsContainer) return;

  const mission = labMissions.find(m => m.id === activeMissionId);
  if (!mission) {
    detailsContainer.innerHTML = `<p style="color: var(--text-secondary); font-size: 0.85rem;">Aktif görev bulunmuyor.</p>`;
    return;
  }

  let questionHtml = "";
  if (showMissionQuestion) {
    questionHtml = `
      <div class="mission-question-box">
        <p class="mission-question">${mission.question}</p>
        <div class="mission-options">
          ${mission.options.map((opt, i) => {
            let optClass = "";
            if (selectedMissionOption !== null) {
              if (i === mission.correctIndex) optClass = "correct";
              else if (i === selectedMissionOption) optClass = "wrong";
              else optClass = "disabled";
            } else {
              optClass = "";
            }
            return `
              <button class="mission-option-btn ${optClass}" data-index="${i}">${opt}</button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  detailsContainer.innerHTML = `
    <h4>${mission.task_title}</h4>
    <div class="mission-instruction">${mission.instructions}</div>
    ${questionHtml}
  `;

  if (showMissionQuestion && selectedMissionOption === null) {
    detailsContainer.querySelectorAll('.mission-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index, 10);
        selectedMissionOption = index;
        
        renderActiveMission();

        if (index === mission.correctIndex) {
          if (typeof confetti === 'function') {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.7 }
            });
          }
          
          showToast("Görev başarıyla tamamlandı! 🎉", "success");
          completedMissions.push(activeMissionId);

          const nextMission = labMissions.find(m => !completedMissions.includes(m.id));
          if (nextMission) {
            setTimeout(() => {
              activeMissionId = nextMission.id;
              selectedLevel = nextMission.level_target;
              deactivatedWagons = [];
              showMissionQuestion = false;
              selectedMissionOption = null;
              
              const btnsContainer = document.getElementById('simulator-level-buttons');
              if (btnsContainer) {
                btnsContainer.querySelectorAll('.simulator-level-btn').forEach(b => {
                  b.classList.toggle('active', parseInt(b.dataset.level, 10) === selectedLevel);
                });
              }

              document.getElementById('glitch-overlay').classList.remove('show');
              renderSimulatorContent();
              renderMissionsList();
              renderActiveMission();
            }, 2500);
          } else {
            showToast("Tüm laboratuvar görevlerini tamamladınız! Harika iş, Mühendis! 🏆", "success");
            renderMissionsList();
          }
        } else {
          showToast("Yanlış seçenek! Lütfen tekrar deneyin.", "error");
          setTimeout(() => {
            selectedMissionOption = null;
            renderActiveMission();
          }, 2000);
        }
      });
    });
  }
}

// DOM yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', init);
function getPureTenseData(tense, aspect) {
    // Intercept for Modal Selector
  if (state.selectedSimulatorModal && state.selectedSimulatorModal !== 'none') {
    return getModalTenseData(state.selectedSimulatorModal, tense, aspect);
  }
const subjectIndex = state.selectedSubjectIndex !== undefined ? state.selectedSubjectIndex : 0;
  const verbIndex = state.selectedVerbIndex !== undefined ? state.selectedVerbIndex : 0;
  
  const activeSubjectObj = subjects[subjectIndex] || subjects[0];
  const activeVerbObj = verbs[verbIndex] || verbs[0];
  
  const isPassive = state.activePassiveMode !== 'active';
  const isNeg = state.negationOn || false;
  
  let activeSpeaker = "Researchers";
  let activeSpeakerTr = "Araştırmacılar";
  const domain = state.activeDomain || 'history';
  if (domain === 'history') {
    activeSpeaker = "Historians";
    activeSpeakerTr = "Tarihçiler";
  } else if (domain === 'cinema') {
    activeSpeaker = "Critics";
    activeSpeakerTr = "Eleştirmenler";
  } else if (domain === 'economy') {
    activeSpeaker = "Economists";
    activeSpeakerTr = "Ekonomistler";
  } else if (domain === 'sociology') {
    activeSpeaker = "Sociologists";
    activeSpeakerTr = "Sosyologlar";
  }
  
  const currentLvl = {
    level: 99,
    title: (tense.charAt(0).toUpperCase() + tense.slice(1)) + ' ' + (aspect.charAt(0).toUpperCase() + aspect.slice(1)),
    mechanic_note: "Saf Zamanlar modunda dinamik olarak üretilen " + tense + " " + aspect + " yapısıdır."
  };
  
  const passiveStem = makePassiveStem(activeVerbObj.trStem);
  const activeStem = activeVerbObj.trStem;
  
  let trReflexColored = "";
  let wagonChain = [];
  
  const colorSubject = "#1f2937";
  const colorObject = "#1f2937";
  const colorNegation = "#ef4444";
  const colorAux = "#3b82f6";
  const colorContinuous = "#10b981";
  const colorPerfect = "#ec4899";
  const colorVerb = "#f59e0b";
  const colorInfinitive = "#10b981";
  
  const accusativeObj = applyAccusative(activeSubjectObj.tr);

  function getV1Verb(plural) {
    if (plural) return activeVerbObj.engV1;
    const v = activeVerbObj.engV1;
    if (v.endsWith('y') && !'aeiou'.includes(v.charAt(v.length - 2))) {
      return v.slice(0, -1) + 'ies';
    } else if (v.endsWith('ch') || v.endsWith('sh') || v.endsWith('x') || v.endsWith('s') || v.endsWith('o')) {
      return v + 'es';
    }
    return v + 's';
  }

  // 12 Pure Tense logic mapping
  if (tense === 'present' && aspect === 'simple') {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: activeSubjectObj.plural ? "are" : "is", role: "status_linker", color: colorAux, suffix_tr: "-ir/-ur" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const lastV = getLastVowel(passiveStem);
      const harmony = get4WayHarmony(lastV);
      const isHard = isHardConsonant(passiveStem.slice(-1));
      let suffixPart = (isHard ? 't' : 'd') + harmony + 'r';
      if (isNeg) suffixPart = 'z';
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorAux}; font-weight:800;">${isNeg ? 'me' : ''}${suffixPart}</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      if (isNeg) {
        wagonChain.push({ word: "do not", role: "negation", color: colorNegation });
        wagonChain.push({ word: activeVerbObj.engV1, role: "main_verb", color: colorVerb, suffix_tr: activeStem + "-" });
      } else {
        wagonChain.push({ word: getV1Verb(true), role: "main_verb", color: colorVerb, suffix_tr: activeStem + "-" });
      }
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const suffixPart = isNeg ? 'mez' : 'r';
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorAux}; font-weight:800;">${isNeg ? 'me' : ''}${suffixPart}</span>.`;
    }

  } else if (tense === 'past' && aspect === 'simple') {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: activeSubjectObj.plural ? "were" : "was", role: "past_tense", color: colorAux, suffix_tr: "-di/-dı" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const verbSuffix = applyPast(passiveStem, isNeg);
      const suffixPart = verbSuffix.slice(passiveStem.length);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorAux}; font-weight:800;">${suffixPart}</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      if (isNeg) {
        wagonChain.push({ word: "did", role: "past_tense", color: colorAux });
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
        wagonChain.push({ word: activeVerbObj.engV1, role: "main_verb", color: colorVerb, suffix_tr: activeStem + "-" });
      } else {
        wagonChain.push({ word: activeVerbObj.pastActive, role: "main_verb", color: colorVerb, suffix_tr: activeStem + "-" });
      }
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const verbSuffix = applyPast(activeStem, isNeg);
      const suffixPart = verbSuffix.slice(activeStem.length);
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorAux}; font-weight:800;">${suffixPart}</span>.`;
    }

  } else if (tense === 'future' && aspect === 'simple') {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      if (isNeg) {
        wagonChain.push({ word: "will", role: "future", color: colorAux });
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
        wagonChain.push({ word: "be", role: "passive_inf", color: colorAux });
      } else {
        wagonChain.push({ word: "will be", role: "future_passive", color: colorAux, suffix_tr: "-acak/-ecek" });
      }
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const verbSuffix = applyFuture(passiveStem, isNeg);
      const suffixPart = verbSuffix.slice(passiveStem.length);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorAux}; font-weight:800;">${suffixPart}</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "will", role: "future", color: colorAux, suffix_tr: "-acak" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: activeVerbObj.engV1, role: "main_verb", color: colorVerb, suffix_tr: activeStem + "-" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const verbSuffix = applyFuture(activeStem, isNeg);
      const suffixPart = verbSuffix.slice(activeStem.length);
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorAux}; font-weight:800;">${suffixPart}</span>.`;
    }

  } else if (tense === 'present' && aspect === 'progressive') {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: activeSubjectObj.plural ? "are" : "is", role: "present_tense", color: colorAux, suffix_tr: "-dir" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: "being", role: "continuous_motor", color: colorContinuous, suffix_tr: "-makta" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const verbSuffix = applyContinuous(passiveStem, isNeg, true);
      const continuousPart = verbSuffix.slice(passiveStem.length, verbSuffix.length - 3);
      const copulaPart = verbSuffix.slice(verbSuffix.length - 3);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorContinuous}; font-weight:800;">${continuousPart}</span><span style="color:${colorAux}; font-weight:800;">${copulaPart}</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "are", role: "present_tense", color: colorAux, suffix_tr: "-iyor" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: activeVerbObj.engIng, role: "main_verb_ing", color: colorVerb, suffix_tr: activeStem + "-ıyor" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const conjugatedVerb = applyPresentContinuousActive(activeStem, isNeg);
      let displayStem = activeStem;
      if (!isNeg && "aeıioöuüAEIİOÖUÜ".includes(activeStem.slice(-1)) && !activeStem.endsWith(" et")) {
        displayStem = activeStem.slice(0, -1);
      }
      const suffixPart = conjugatedVerb.slice(displayStem.length);
      const lenCont = suffixPart.length - 3;
      const continuousPart = suffixPart.slice(0, lenCont);
      const copulaPart = suffixPart.slice(lenCont);
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorVerb}; font-weight:800;">${displayStem}</span><span style="color:${colorContinuous}; font-weight:800;">${continuousPart}</span><span style="color:${colorAux}; font-weight:800;">${copulaPart}</span>.`;
    }

  } else if (tense === 'past' && aspect === 'progressive') {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: activeSubjectObj.plural ? "were" : "was", role: "past_tense", color: colorAux, suffix_tr: "-di" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: "being", role: "continuous_motor", color: colorContinuous, suffix_tr: "-makta" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const verbSuffix = applyPastContinuous(passiveStem, isNeg);
      const continuousPart = verbSuffix.slice(passiveStem.length, verbSuffix.length - 4);
      const pastPart = verbSuffix.slice(verbSuffix.length - 4);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorContinuous}; font-weight:800;">${continuousPart}</span><span style="color:${colorAux}; font-weight:800;">${pastPart}</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "were", role: "past_tense", color: colorAux, suffix_tr: "-iyordu" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: activeVerbObj.engIng, role: "main_verb_ing", color: colorVerb, suffix_tr: activeStem + "-ıyor" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const conjugatedVerb = applyPastContinuousActive(activeStem, isNeg);
      let displayStem = activeStem;
      if (!isNeg && "aeıioöuüAEIİOÖUÜ".includes(activeStem.slice(-1)) && !activeStem.endsWith(" et")) {
        displayStem = activeStem.slice(0, -1);
      }
      const suffixPart = conjugatedVerb.slice(displayStem.length);
      const lenCont = suffixPart.length - 5;
      const continuousPart = suffixPart.slice(0, lenCont);
      const pastPart = suffixPart.slice(lenCont);
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorVerb}; font-weight:800;">${displayStem}</span><span style="color:${colorContinuous}; font-weight:800;">${continuousPart}</span><span style="color:${colorAux}; font-weight:800;">${pastPart}</span>.`;
    }

  } else if (tense === 'future' && aspect === 'progressive') {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      if (isNeg) {
        wagonChain.push({ word: "will", role: "future", color: colorAux });
        wagonChain.push({ word: "not", role: "negation", color: colorNegation });
        wagonChain.push({ word: "be", role: "passive_inf", color: colorAux });
      } else {
        wagonChain.push({ word: "will be", role: "future_passive", color: colorAux, suffix_tr: "-acak" });
      }
      wagonChain.push({ word: "being", role: "continuous_motor", color: colorContinuous, suffix_tr: "-makta" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const contPhrase = applyContinuous(passiveStem, isNeg, false);
      const contSuffix = contPhrase.slice(passiveStem.length);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorContinuous}; font-weight:800;">${contSuffix}</span> <span style="color:${colorAux}; font-weight:800;">olacak</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "will be", role: "future_continuous", color: colorAux, suffix_tr: "-acak" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: activeVerbObj.engIng, role: "main_verb_ing", color: colorVerb, suffix_tr: activeStem + "-ıyor" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const contPhrase = applyContinuous(activeStem, isNeg, false);
      const contSuffix = contPhrase.slice(activeStem.length);
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorContinuous}; font-weight:800;">${contSuffix}</span> <span style="color:${colorAux}; font-weight:800;">olacak</span>.`;
    }

  } else if (tense === 'present' && aspect === 'perfect') {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: activeSubjectObj.plural ? "have" : "has", role: "perfect_bridge", color: colorAux, suffix_tr: "çoktan" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect, suffix_tr: "-di" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const timeMarker = isNeg ? "henüz" : "çoktan";
      const verbSuffix = applyPast(passiveStem, isNeg);
      const suffixPart = verbSuffix.slice(passiveStem.length);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorAux}; font-weight:800;">${timeMarker}</span> <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorPerfect}; font-weight:800;">${suffixPart}</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "have", role: "perfect_bridge", color: colorAux, suffix_tr: "çoktan" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: activeStem + "-" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const timeMarker = isNeg ? "henüz" : "çoktan";
      const verbSuffix = applyPast(activeStem, isNeg);
      const suffixPart = verbSuffix.slice(activeStem.length);
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorAux}; font-weight:800;">${timeMarker}</span> <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorPerfect}; font-weight:800;">${suffixPart}</span>.`;
    }

  } else if (tense === 'past' && aspect === 'perfect') {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: "had", role: "perfect_bridge", color: colorAux, suffix_tr: "zaten" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect, suffix_tr: "-mişti" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const timeMarker = isNeg ? "henüz" : "zaten";
      const verbSuffix = applyPluperfect(passiveStem, isNeg);
      const suffixPart = verbSuffix.slice(passiveStem.length);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorAux}; font-weight:800;">${timeMarker}</span> <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorPerfect}; font-weight:800;">${suffixPart}</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "had", role: "perfect_bridge", color: colorAux, suffix_tr: "zaten" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: activeStem + "-" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const timeMarker = isNeg ? "henüz" : "zaten";
      const verbSuffix = applyPluperfect(activeStem, isNeg);
      const suffixPart = verbSuffix.slice(activeStem.length);
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorAux}; font-weight:800;">${timeMarker}</span> <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorPerfect}; font-weight:800;">${suffixPart}</span>.`;
    }

  } else if (tense === 'future' && aspect === 'perfect') {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: "will", role: "future", color: colorAux, suffix_tr: "olacak" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: "have", role: "perfect_bridge", color: colorAux });
      wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect, suffix_tr: "-miş" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const partSuffix = applyPerfectiveParticiple(passiveStem, isNeg);
      const partSuffixPart = partSuffix.slice(passiveStem.length);
      const futAux = isNeg ? "olmayacak" : "olacak";
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorPerfect}; font-weight:800;">${partSuffixPart}</span> <span style="color:${colorAux}; font-weight:800;">${futAux}</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "will", role: "future", color: colorAux, suffix_tr: "olacak" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: "have", role: "perfect_bridge", color: colorAux });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: activeStem + "-miş" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const partSuffix = applyPerfectiveParticiple(activeStem, isNeg);
      const partSuffixPart = partSuffix.slice(activeStem.length);
      const futAux = isNeg ? "olmayacak" : "olacak";
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorPerfect}; font-weight:800;">${partSuffixPart}</span> <span style="color:${colorAux}; font-weight:800;">${futAux}</span>.`;
    }

  } else if (tense === 'present' && aspect === 'perfect-progressive') {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: activeSubjectObj.plural ? "have" : "has", role: "perfect_bridge", color: colorAux, suffix_tr: "çoktan" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect, suffix_tr: "ol-" });
      wagonChain.push({ word: "being", role: "continuous_motor", color: colorContinuous, suffix_tr: "-makta" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const contPhrase = applyContinuous(passiveStem, isNeg, false);
      const contSuffix = contPhrase.slice(passiveStem.length);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorContinuous}; font-weight:800;">${contSuffix}</span> <span style="color:${colorPerfect}; font-weight:800;">bulunmaktadır</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "have", role: "perfect_bridge", color: colorAux, suffix_tr: "olmuş" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect, suffix_tr: "ol-" });
      wagonChain.push({ word: activeVerbObj.engIng, role: "main_verb_ing", color: colorVerb, suffix_tr: activeStem + "-makta" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const contPhrase = applyContinuous(activeStem, isNeg, false);
      const contSuffix = contPhrase.slice(activeStem.length);
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorContinuous}; font-weight:800;">${contSuffix}</span> <span style="color:${colorPerfect}; font-weight:800;">bulunmaktadır</span>.`;
    }

  } else if (tense === 'past' && aspect === 'perfect-progressive') {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: "had", role: "perfect_bridge", color: colorAux, suffix_tr: "zaten" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect, suffix_tr: "ol-" });
      wagonChain.push({ word: "being", role: "continuous_motor", color: colorContinuous, suffix_tr: "-makta" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const contPhrase = applyContinuous(passiveStem, isNeg, false);
      const contSuffix = contPhrase.slice(passiveStem.length);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorContinuous}; font-weight:800;">${contSuffix}</span> <span style="color:${colorPerfect}; font-weight:800;">bulunmaktaydı</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "had", role: "perfect_bridge", color: colorAux, suffix_tr: "zaten" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect, suffix_tr: "ol-" });
      wagonChain.push({ word: activeVerbObj.engIng, role: "main_verb_ing", color: colorVerb, suffix_tr: activeStem + "-makta" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const contPhrase = applyContinuous(activeStem, isNeg, false);
      const contSuffix = contPhrase.slice(activeStem.length);
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorContinuous}; font-weight:800;">${contSuffix}</span> <span style="color:${colorPerfect}; font-weight:800;">bulunmaktaydı</span>.`;
    }

  } else if (tense === 'future' && aspect === 'perfect-progressive') {
    if (isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng, role: "subject", color: colorSubject });
      wagonChain.push({ word: "will", role: "future", color: colorAux, suffix_tr: "-acak" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: "have", role: "perfect_bridge", color: colorAux, suffix_tr: "olmuş" });
      wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect, suffix_tr: "ol-" });
      wagonChain.push({ word: "being", role: "continuous_motor", color: colorContinuous, suffix_tr: "-makta" });
      wagonChain.push({ word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" });
      
      const contPhrase = applyContinuous(passiveStem, isNeg, false);
      const contSuffix = contPhrase.slice(passiveStem.length);
      trReflexColored = activeSubjectObj.tr + ` <span style="color:${colorVerb}; font-weight:800;">${passiveStem}</span><span style="color:${colorContinuous}; font-weight:800;">${contSuffix}</span> <span style="color:${colorPerfect}; font-weight:800;">ol</span><span style="color:${colorAux}; font-weight:800;">muş olacak</span>.`;
    } else {
      wagonChain.push({ word: activeSpeaker, role: "subject", color: colorSubject });
      wagonChain.push({ word: "will", role: "future", color: colorAux, suffix_tr: "-acak" });
      if (isNeg) wagonChain.push({ word: "not", role: "negation", color: colorNegation });
      wagonChain.push({ word: "have", role: "perfect_bridge", color: colorAux, suffix_tr: "olmuş" });
      wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect, suffix_tr: "ol-" });
      wagonChain.push({ word: activeVerbObj.engIng, role: "main_verb_ing", color: colorVerb, suffix_tr: activeStem + "-makta" });
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
      
      const contPhrase = applyContinuous(activeStem, isNeg, false);
      const contSuffix = contPhrase.slice(activeStem.length);
      trReflexColored = activeSpeakerTr + " " + accusativeObj + ` <span style="color:${colorVerb}; font-weight:800;">${activeStem}</span><span style="color:${colorContinuous}; font-weight:800;">${contSuffix}</span> <span style="color:${colorPerfect}; font-weight:800;">ol</span><span style="color:${colorAux}; font-weight:800;">muş olacak</span>.`;
    }
  }

  
  if (state.questionOn) {
    let auxIndex = -1;
    const auxList = ["is", "are", "was", "were", "will", "do", "does", "did", "have", "has", "had", "could", "should", "must", "might", "would", "can"];
    
    // Check if there is an auxiliary verb in the chain
    for (let i = 0; i < wagonChain.length; i++) {
      const firstWord = wagonChain[i].word.split(" ")[0].toLowerCase();
      if (auxList.includes(firstWord)) {
        auxIndex = i;
        break;
      }
    }
    
    if (auxIndex > 0) {
      // Remove aux wagon and insert at index 0
      const auxWagon = wagonChain.splice(auxIndex, 1)[0];
      
      // Capitalize first letter of aux
      auxWagon.word = auxWagon.word.charAt(0).toUpperCase() + auxWagon.word.slice(1);
      
      // Lowercase first letter of the subject if it was at index 0
      const subjectWagon = wagonChain[0];
      if (subjectWagon && subjectWagon.role === "subject") {
        subjectWagon.word = subjectWagon.word.charAt(0).toLowerCase() + subjectWagon.word.slice(1);
      }
      
      wagonChain.unshift(auxWagon);
    } else {
      // No aux verb found (Present Simple Active Affirmative or Past Simple Active Affirmative)
      const isPast = (wagonChain.some(w => w.word === activeVerbObj.pastActive));
      const subjectWagon = wagonChain[0];
      
      if (isPast) {
        // Insert Did
        wagonChain.unshift({ word: "Did", role: "status_linker", color: colorAux });
        // Reset verb to V1
        const verbWagon = wagonChain.find(w => w.role === "main_verb");
        if (verbWagon) {
          verbWagon.word = activeVerbObj.engV1;
        }
      } else {
        // Insert Do or Does
        const doWord = activeSubjectObj.plural ? "Do" : "Does";
        wagonChain.unshift({ word: doWord, role: "status_linker", color: colorAux });
        
        // Reset verb to V1 if singular (e.g. writes -> write)
        const verbWagon = wagonChain.find(w => w.role === "main_verb");
        if (verbWagon) {
          verbWagon.word = activeVerbObj.engV1;
        }
      }
      
      if (subjectWagon && subjectWagon.role === "subject") {
        subjectWagon.word = subjectWagon.word.charAt(0).toLowerCase() + subjectWagon.word.slice(1);
      }
    }
    
    // Add question mark to final english sentence
    wagonChain[wagonChain.length - 1].word = wagonChain[wagonChain.length - 1].word.replace(/\.$/, "") + "?";
    
    // Transform Turkish reflection to question
    trReflexColored = convertTrToQuestion(trReflexColored);
  }
currentLvl.wagon_chain = wagonChain;
  currentLvl.english_sentence = wagonChain.map(w => w.word).join(' ').replace(/\s+\./g, '.').replace(/\.+/g, '.');
  currentLvl.turkish_reflex_colored = trReflexColored;
  currentLvl.turkish_reflex = trReflexColored.replace(/<[^>]*>/g, '');
  
  return currentLvl;
}

function convertTrToQuestion(trText) {
  let text = trText.trim();
  if (text.endsWith('.')) {
    text = text.slice(0, -1);
  }
  
  const cleanEnd = text.replace(/<[^>]*>/g, '').trim();
  
  if (cleanEnd.endsWith('dir') || cleanEnd.endsWith('dır') || cleanEnd.endsWith('tir') || cleanEnd.endsWith('tır') || cleanEnd.endsWith('dur') || cleanEnd.endsWith('dür') || cleanEnd.endsWith('tur') || cleanEnd.endsWith('tür')) {
    text = replaceLastOccurrence(text, 'dir', ' miydi'); // fallback or direct handling
    if (cleanEnd.endsWith('dir')) text = replaceLastOccurrence(trText.slice(0, -1), 'dir', ' midir');
    else if (cleanEnd.endsWith('dır')) text = replaceLastOccurrence(trText.slice(0, -1), 'dır', ' mıdır');
    else if (cleanEnd.endsWith('tir')) text = replaceLastOccurrence(trText.slice(0, -1), 'tir', ' midir');
    else if (cleanEnd.endsWith('tır')) text = replaceLastOccurrence(trText.slice(0, -1), 'tır', ' mıdır');
    else if (cleanEnd.endsWith('dur')) text = replaceLastOccurrence(trText.slice(0, -1), 'dur', ' mudur');
    else if (cleanEnd.endsWith('dür')) text = replaceLastOccurrence(trText.slice(0, -1), 'dür', ' müdür');
    else if (cleanEnd.endsWith('tur')) text = replaceLastOccurrence(trText.slice(0, -1), 'tur', ' mudur');
    else if (cleanEnd.endsWith('tür')) text = replaceLastOccurrence(trText.slice(0, -1), 'tür', ' müdür');
  } else if (cleanEnd.endsWith('yordu') || cleanEnd.endsWith('lardı') || cleanEnd.endsWith('lerdi')) {
    text = replaceLastOccurrence(text, 'yordu', 'yor muydu');
    text = replaceLastOccurrence(text, 'lardı', 'lar mıydı');
    text = replaceLastOccurrence(text, 'lerdi', 'ler miydi');
  } else if (cleanEnd.endsWith('maktaydı') || cleanEnd.endsWith('mekteydi')) {
    text = replaceLastOccurrence(text, 'maktaydı', 'makta mıydı');
    text = replaceLastOccurrence(text, 'mekteydi', 'mekte miydi');
  } else if (cleanEnd.endsWith('dı') || cleanEnd.endsWith('di') || cleanEnd.endsWith('du') || cleanEnd.endsWith('dü') || cleanEnd.endsWith('tı') || cleanEnd.endsWith('ti') || cleanEnd.endsWith('tu') || cleanEnd.endsWith('tü')) {
    if (cleanEnd.endsWith('dı')) text = replaceLastOccurrence(text, 'dı', 'dı mı');
    else if (cleanEnd.endsWith('di')) text = replaceLastOccurrence(text, 'di', 'di mi');
    else if (cleanEnd.endsWith('du')) text = replaceLastOccurrence(text, 'du', 'du mu');
    else if (cleanEnd.endsWith('dü')) text = replaceLastOccurrence(text, 'dü', 'dü mü');
    else if (cleanEnd.endsWith('tı')) text = replaceLastOccurrence(text, 'tı', 'tı mı');
    else if (cleanEnd.endsWith('ti')) text = replaceLastOccurrence(text, 'ti', 'ti mi');
    else if (cleanEnd.endsWith('tu')) text = replaceLastOccurrence(text, 'tu', 'tu mu');
    else if (cleanEnd.endsWith('tü')) text = replaceLastOccurrence(text, 'tü', 'tü mü');
  } else if (cleanEnd.endsWith('mümkündü')) {
    text = replaceLastOccurrence(text, 'mümkündü', 'mümkün müydü');
  } else if (cleanEnd.endsWith('gerekirdi')) {
    text = replaceLastOccurrence(text, 'gerekirdi', 'gerekir miydi');
  } else if (cleanEnd.endsWith('olacak') || cleanEnd.endsWith('ecek')) {
    text = replaceLastOccurrence(text, 'olacak', 'olacak mı');
    text = replaceLastOccurrence(text, 'ecek', 'ecek mi');
  } else if (cleanEnd.endsWith('yor') || cleanEnd.endsWith('yorlar')) {
    text = replaceLastOccurrence(text, 'yor', 'yor mu');
  } else if (cleanEnd.endsWith('yazar') || cleanEnd.endsWith('yazarlar') || cleanEnd.endsWith('yazmaz') || cleanEnd.endsWith('yazmazlar')) {
    text = replaceLastOccurrence(text, 'yazar', 'yazar mı');
    text = replaceLastOccurrence(text, 'yazmaz', 'yazmaz mı');
  } else if (cleanEnd.endsWith('korur') || cleanEnd.endsWith('korumaz')) {
    text = replaceLastOccurrence(text, 'korur', 'korur mu');
    text = replaceLastOccurrence(text, 'korumaz', 'korumaz mı');
  } else if (cleanEnd.endsWith('kazar') || cleanEnd.endsWith('kazmaz')) {
    text = replaceLastOccurrence(text, 'kazar', 'kazar mı');
    text = replaceLastOccurrence(text, 'kazmaz', 'kazmaz mı');
  } else if (cleanEnd.endsWith('eder') || cleanEnd.endsWith('etmez')) {
    text = replaceLastOccurrence(text, 'eder', 'eder mi');
    text = replaceLastOccurrence(text, 'etmez', 'etmez mi');
  } else if (cleanEnd.endsWith('yorumlar') || cleanEnd.endsWith('yorumlamaz')) {
    text = replaceLastOccurrence(text, 'yorumlar', 'yorumlar mı');
    text = replaceLastOccurrence(text, 'yorumlamaz', 'yorumlamaz mı');
  } else if (cleanEnd.endsWith('yağmalar') || cleanEnd.endsWith('yağmalamaz')) {
    text = replaceLastOccurrence(text, 'yağmalar', 'yağmalar mı');
    text = replaceLastOccurrence(text, 'yağmalamaz', 'yağmalamaz mı');
  } else if (cleanEnd.endsWith('kataloglar') || cleanEnd.endsWith('kataloglamaz')) {
    text = replaceLastOccurrence(text, 'kataloglar', 'kataloglar mı');
    text = replaceLastOccurrence(text, 'kataloglamaz', 'kataloglamaz mı');
  } else if (cleanEnd.endsWith('gösterir') || cleanEnd.endsWith('göstermez')) {
    text = replaceLastOccurrence(text, 'gösterir', 'gösterir mi');
    text = replaceLastOccurrence(text, 'göstermez', 'göstermez mi');
  } else if (cleanEnd.endsWith('sansürler') || cleanEnd.endsWith('sansürlemez')) {
    text = replaceLastOccurrence(text, 'sansürler', 'sansürler mi');
    text = replaceLastOccurrence(text, 'sansürlemez', 'sansürlemez mi');
  } else if (cleanEnd.endsWith('yasaklar') || cleanEnd.endsWith('yasaklamaz')) {
    text = replaceLastOccurrence(text, 'yasaklar', 'yasaklar mı');
    text = replaceLastOccurrence(text, 'yasaklamaz', 'yasaklamaz mı');
  } else if (cleanEnd.endsWith('yönetir') || cleanEnd.endsWith('yönetmez')) {
    text = replaceLastOccurrence(text, 'yönetir', 'yönetir mi');
    text = replaceLastOccurrence(text, 'yönetmez', 'yönetmez mi');
  } else if (cleanEnd.endsWith('çalışır') || cleanEnd.endsWith('çalışmaz')) {
    text = replaceLastOccurrence(text, 'çalışır', 'çalışır mı');
    text = replaceLastOccurrence(text, 'çalışmaz', 'çalışmaz mı');
  } else if (cleanEnd.endsWith('gözlemler') || cleanEnd.endsWith('gözlemlemez')) {
    text = replaceLastOccurrence(text, 'gözlemler', 'gözlemler mi');
    text = replaceLastOccurrence(text, 'gözlemlemez', 'gözlemlemez mi');
  } else if (cleanEnd.endsWith('inceler') || cleanEnd.endsWith('incelemez')) {
    text = replaceLastOccurrence(text, 'inceler', 'inceler mi');
    text = replaceLastOccurrence(text, 'incelemez', 'incelemez mi');
  } else if (cleanEnd.endsWith('araştırır') || cleanEnd.endsWith('araştırmaz')) {
    text = replaceLastOccurrence(text, 'araştırır', 'araştırır mı');
    text = replaceLastOccurrence(text, 'araştırmaz', 'araştırmaz mı');
  } else if (cleanEnd.endsWith('değerlendirir') || cleanEnd.endsWith('değerlendirmez')) {
    text = replaceLastOccurrence(text, 'değerlendirir', 'değerlendirir mi');
    text = replaceLastOccurrence(text, 'değerlendirmez', 'değerlendirmez mi');
  } else if (cleanEnd.endsWith('yayınlar') || cleanEnd.endsWith('yayınlamaz')) {
    text = replaceLastOccurrence(text, 'yayınlar', 'yayınlar mı');
    text = replaceLastOccurrence(text, 'yayınlamaz', 'yayınlamaz mı');
  } else {
    const lastVowel = getLastVowel(cleanEnd);
    const harmony = get4WayHarmony(lastVowel);
    text += ' m' + harmony;
  }
  
  return text + '?';
}

function replaceLastOccurrence(str, search, replace) {
  const index = str.lastIndexOf(search);
  if (index === -1) return str;
  return str.substring(0, index) + replace + str.substring(index + search.length);
}

function appendAoristArdi(stem) {
  if (!stem) return "";
  const vowels = "aeıioöuüAEIİOÖUÜ";
  
  function countSyllables(word) {
    let cnt = 0;
    for (let char of word) {
      if (vowels.includes(char)) cnt++;
    }
    return cnt;
  }
  
  const lastChar = stem.slice(-1);
  const endsInVowel = vowels.includes(lastChar);
  
  let lastV = 'a';
  for (let i = stem.length - 1; i >= 0; i--) {
    if (vowels.includes(stem[i])) {
      lastV = stem[i].toLowerCase();
      break;
    }
  }
  
  if (endsInVowel) {
    if ("aıou".includes(lastV)) return stem + "rdı";
    return stem + "rdi";
  }
  
  if (stem.endsWith("et")) {
    return stem.slice(0, -2) + "ederdi";
  }
  
  const words = stem.trim().split(/\s+/);
  const lastWord = words[words.length - 1];
  const syllables = countSyllables(lastWord);
  
  if (syllables === 1) {
    if ("aıou".includes(lastV)) return stem + "ardı";
    return stem + "erdi";
  } else {
    if (lastV === 'a' || lastV === 'ı') return stem + "ırdı";
    if (lastV === 'e' || lastV === 'i') return stem + "irdi";
    if (lastV === 'o' || lastV === 'u') return stem + "urdu";
    if (lastV === 'ö' || lastV === 'ü') return stem + "ürdü";
  }
  return stem + "ardı";
}

function appendTrSuffix(stem, suffix) {
  if (!stem) return suffix;
  if (!suffix) return stem;
  const vowels = "aeıioöuüAEIİOÖUÜ";
  const lastChar = stem.slice(-1);
  const firstCharOfSuffix = suffix.trim().charAt(0);
  
  if (vowels.includes(lastChar) && vowels.includes(firstCharOfSuffix)) {
    return stem + 'y' + suffix;
  }
  return stem + suffix;
}

function getModalTenseData(modal, tense, aspect) {
  const subjectIndex = state.selectedSubjectIndex !== undefined ? state.selectedSubjectIndex : 0;
  const verbIndex = state.selectedVerbIndex !== undefined ? state.selectedVerbIndex : 0;
  
  const activeSubjectObj = subjects[subjectIndex] || subjects[0];
  const activeVerbObj = verbs[verbIndex] || verbs[0];
  
  const isPassive = state.activePassiveMode !== 'active';
  const isNeg = state.negationOn || false;
  const isQuestion = state.questionOn || false;
  
  let activeSpeaker = "Researchers";
  let activeSpeakerTr = "Araştırmacılar";
  const domain = state.activeDomain || 'history';
  if (domain === 'history') {
    activeSpeaker = "Historians";
    activeSpeakerTr = "Tarihçiler";
  } else if (domain === 'cinema') {
    activeSpeaker = "Critics";
    activeSpeakerTr = "Eleştirmenler";
  } else if (domain === 'economy') {
    activeSpeaker = "Economists";
    activeSpeakerTr = "Ekonomistler";
  } else if (domain === 'sociology') {
    activeSpeaker = "Sociologists";
    activeSpeakerTr = "Sosyologlar";
  }
  
  const currentLvl = {
    level: 99,
    title: modal + ' ' + aspect,
    mechanic_note: "Modal seçici ile üretilen " + modal + " + " + aspect + " yapısıdır."
  };
  
  const passiveStem = makePassiveStem(activeVerbObj.trStem);
  const activeStem = activeVerbObj.trStem;
  
  let trReflexColored = "";
  let wagonChain = [];
  
  const colorSubject = "#1f2937";
  const colorObject = "#1f2937";
  const colorNegation = "#ef4444";
  const colorAux = "#3b82f6";
  const colorContinuous = "#10b981";
  const colorPerfect = "#ec4899";
  const colorVerb = "#f59e0b";
  const colorInfinitive = "#10b981";
  
  const accusativeObj = applyAccusative(activeSubjectObj.tr);
  
  // English Modal Word and negation form
  let mWord = modal;
  if (modal === 'ought_to') mWord = 'ought';
  if (modal === 'used_to') mWord = 'used';
  if (modal === 'have_to') mWord = activeSubjectObj.plural ? 'have' : 'has';
  if (modal === 'had_to') mWord = 'had';
  
  // New Core Modals:
  if (modal === 'cant') mWord = "can't";
  if (modal === 'couldnt') mWord = "couldn't";
  if (modal === 'may_not') mWord = "may not";
  if (modal === 'mustnt') mWord = "mustn't";
  if (modal === 'shall') mWord = "shall";
  if (modal === 'shouldnt') mWord = "shouldn't";
  
  // New Semi / Phrasal Modals:
  if (modal === 'be_able_to') mWord = activeSubjectObj.plural ? 'are able' : 'is able';
  if (modal === 'was_were_able_to') mWord = activeSubjectObj.plural ? 'were able' : 'was able';
  if (modal === 'wasnt_werent_able_to') mWord = activeSubjectObj.plural ? "weren't able" : "wasn't able";
  if (modal === 'will_have_to') mWord = 'will have';
  if (modal === 'have_got_to') mWord = activeSubjectObj.plural ? 'have got' : 'has got';
  if (modal === 'dont_doesnt_have_to') mWord = activeSubjectObj.plural ? "don't have" : "doesn't have";
  if (modal === 'dont_doesnt_need_to') mWord = activeSubjectObj.plural ? "don't need" : "doesn't need";
  if (modal === 'didnt_have_to') mWord = "didn't have";
  if (modal === 'didnt_need_to') mWord = "didn't need";
  if (modal === 'neednt') mWord = "needn't";
  if (modal === 'ought_not_to') mWord = 'ought not';
  if (modal === 'had_better') mWord = 'had better';
  if (modal === 'had_better_not') mWord = 'had better not';
  if (modal === 'didnt_use_to') mWord = "didn't use";
  if (modal === 'be_used_to_ing') mWord = activeSubjectObj.plural ? 'are used' : 'is used';
  if (modal === 'was_were_used_to_ing') mWord = activeSubjectObj.plural ? 'were used' : 'was used';
  if (modal === 'get_used_to_ing') mWord = activeSubjectObj.plural ? 'get used' : 'gets used';
  
  // Preferences:
  if (modal === 'would_prefer') mWord = 'would prefer';
  if (modal === 'would_rather') mWord = 'would rather';
  if (modal === 'would_rather_not') mWord = 'would rather';
  
  // Negation form:
  let mNotWord = mWord + " not";
  if (modal === 'can') mNotWord = "cannot";
  if (modal === 'cant') mNotWord = "can't";
  if (modal === 'couldnt') mNotWord = "couldn't";
  if (modal === 'may_not') mNotWord = "may not";
  if (modal === 'mustnt') mNotWord = "mustn't";
  if (modal === 'shouldnt') mNotWord = "shouldn't";
  if (modal === 'ought_to') mNotWord = "ought not";
  if (modal === 'used_to') mNotWord = "did not use";
  if (modal === 'have_to') mNotWord = activeSubjectObj.plural ? "do not have" : "does not have";
  if (modal === 'had_to') mNotWord = "did not have";
  if (modal === 'be_able_to') mNotWord = activeSubjectObj.plural ? 'are not able' : 'is not able';
  if (modal === 'was_were_able_to') mNotWord = activeSubjectObj.plural ? 'were not able' : 'was not able';
  if (modal === 'wasnt_werent_able_to') mNotWord = activeSubjectObj.plural ? "weren't able" : "wasn't able";
  if (modal === 'will_have_to') mNotWord = 'will not have';
  if (modal === 'have_got_to') mNotWord = activeSubjectObj.plural ? 'have not got' : 'has not got';
  if (modal === 'dont_doesnt_have_to') mNotWord = activeSubjectObj.plural ? "don't have" : "doesn't have";
  if (modal === 'dont_doesnt_need_to') mNotWord = activeSubjectObj.plural ? "don't need" : "doesn't need";
  if (modal === 'didnt_have_to') mNotWord = "didn't have";
  if (modal === 'didnt_need_to') mNotWord = "didn't need";
  if (modal === 'neednt') mNotWord = "needn't";
  if (modal === 'ought_not_to') mNotWord = "ought not";
  if (modal === 'had_better') mNotWord = "had better not";
  if (modal === 'had_better_not') mNotWord = "had better not";
  if (modal === 'didnt_use_to') mNotWord = "didn't use";
  if (modal === 'be_used_to_ing') mNotWord = activeSubjectObj.plural ? 'are not used' : 'is not used';
  if (modal === 'was_were_used_to_ing') mNotWord = activeSubjectObj.plural ? 'were not used' : 'was not used';
  if (modal === 'get_used_to_ing') mNotWord = activeSubjectObj.plural ? 'do not get used' : 'does not get used';
  if (modal === 'would_prefer') mNotWord = 'would not prefer';
  if (modal === 'would_rather') mNotWord = 'would rather not';
  if (modal === 'would_rather_not') mNotWord = 'would rather not';

  // Build the wagonChain according to the aspect, voice, negation, and question
  const subjectWagon = isPassive ? 
    { word: activeSubjectObj.eng, role: "subject", color: colorSubject } :
    { word: activeSpeaker, role: "subject", color: colorSubject };
    
  const isIngModal = modal.endsWith('_ing');
  const needsTo = modal.includes('to') || modal === 'would_prefer';
  
  const verbWagon = isPassive ?
    { word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" } :
    (isIngModal ?
      { word: activeVerbObj.engIng, role: "main_verb_ing", color: colorVerb, suffix_tr: activeStem + "-" } :
      { word: activeVerbObj.engV1, role: "main_verb", color: colorVerb, suffix_tr: activeStem + "-" }
    );
    
  // Splitting for Question mode:
  let qFirst = mWord;
  let qRem = "";
  if (isQuestion) {
    if (modal === 'be_able_to') {
      qFirst = activeSubjectObj.plural ? "are" : "is";
      qRem = isNeg ? "not able" : "able";
    } else if (modal === 'was_were_able_to') {
      qFirst = activeSubjectObj.plural ? "were" : "was";
      qRem = isNeg ? "not able" : "able";
    } else if (modal === 'wasnt_werent_able_to') {
      qFirst = activeSubjectObj.plural ? "weren't" : "wasn't";
      qRem = "able";
    } else if (modal === 'will_have_to') {
      qFirst = isNeg ? "won't" : "will";
      qRem = "have";
    } else if (modal === 'have_to') {
      qFirst = activeSubjectObj.plural ? (isNeg ? "don't" : "do") : (isNeg ? "doesn't" : "does");
      qRem = "have";
    } else if (modal === 'had_to') {
      qFirst = isNeg ? "didn't" : "did";
      qRem = "have";
    } else if (modal === 'have_got_to') {
      qFirst = activeSubjectObj.plural ? "have" : "has";
      qRem = isNeg ? "not got" : "got";
    } else if (modal === 'dont_doesnt_have_to') {
      qFirst = activeSubjectObj.plural ? "do" : "does";
      qRem = "have";
    } else if (modal === 'dont_doesnt_need_to') {
      qFirst = activeSubjectObj.plural ? "do" : "does";
      qRem = "need";
    } else if (modal === 'didnt_have_to') {
      qFirst = "did";
      qRem = "have";
    } else if (modal === 'didnt_need_to') {
      qFirst = "did";
      qRem = "need";
    } else if (modal === 'didnt_use_to') {
      qFirst = "did";
      qRem = "use";
    } else if (modal === 'used_to') {
      qFirst = isNeg ? "didn't" : "did";
      qRem = "use";
    } else if (modal === 'be_used_to_ing') {
      qFirst = activeSubjectObj.plural ? "are" : "is";
      qRem = isNeg ? "not used" : "used";
    } else if (modal === 'was_were_used_to_ing') {
      qFirst = activeSubjectObj.plural ? "were" : "was";
      qRem = isNeg ? "not used" : "used";
    } else if (modal === 'get_used_to_ing') {
      qFirst = activeSubjectObj.plural ? (isNeg ? "don't" : "do") : (isNeg ? "doesn't" : "does");
      qRem = "get used";
    } else if (modal === 'would_prefer') {
      qFirst = "would";
      qRem = isNeg ? "not prefer" : "prefer";
    } else if (modal === 'would_rather') {
      qFirst = "would";
      qRem = isNeg ? "rather not" : "rather";
    } else if (modal === 'would_rather_not') {
      qFirst = "would";
      qRem = "rather not";
    } else {
      qFirst = isNeg ? mNotWord : mWord;
      qRem = "";
    }
  }

  if (aspect === 'simple') {
    if (isQuestion) {
      wagonChain.push({ word: qFirst, role: "status_linker", color: colorAux });
      wagonChain.push(subjectWagon);
      if (qRem) wagonChain.push({ word: qRem, role: "status_linker", color: colorAux });
      if (needsTo) wagonChain.push({ word: "to", role: "status_linker", color: colorInfinitive });
      if (isPassive) {
        wagonChain.push({ word: isIngModal ? "being" : "be", role: "passive_inf", color: colorAux });
      }
      wagonChain.push(verbWagon);
    } else {
      wagonChain.push(subjectWagon);
      wagonChain.push({ word: isNeg ? mNotWord : mWord, role: "status_linker", color: colorAux });
      if (needsTo) wagonChain.push({ word: "to", role: "status_linker", color: colorInfinitive });
      if (isPassive) {
        wagonChain.push({ word: isIngModal ? "being" : "be", role: "passive_inf", color: colorAux });
      }
      wagonChain.push(verbWagon);
    }
    if (!isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
    }
  } else if (aspect === 'progressive') {
    const verbWagonIng = isPassive ?
      { word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" } :
      { word: activeVerbObj.engIng, role: "main_verb_ing", color: colorVerb, suffix_tr: activeStem + "-" };
      
    if (isQuestion) {
      wagonChain.push({ word: qFirst, role: "status_linker", color: colorAux });
      wagonChain.push(subjectWagon);
      if (qRem) wagonChain.push({ word: qRem, role: "status_linker", color: colorAux });
      if (needsTo) wagonChain.push({ word: "to", role: "status_linker", color: colorInfinitive });
      wagonChain.push({ word: "be", role: "continuous_motor", color: colorContinuous });
      if (isPassive) {
        wagonChain.push({ word: "being", role: "continuous_motor", color: colorContinuous });
      }
      wagonChain.push(verbWagonIng);
    } else {
      wagonChain.push(subjectWagon);
      wagonChain.push({ word: isNeg ? mNotWord : mWord, role: "status_linker", color: colorAux });
      if (needsTo) wagonChain.push({ word: "to", role: "status_linker", color: colorInfinitive });
      wagonChain.push({ word: "be", role: "continuous_motor", color: colorContinuous });
      if (isPassive) {
        wagonChain.push({ word: "being", role: "continuous_motor", color: colorContinuous });
      }
      wagonChain.push(verbWagonIng);
    }
    if (!isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
    }
  } else if (aspect === 'perfect') {
    if (isQuestion) {
      wagonChain.push({ word: qFirst, role: "status_linker", color: colorAux });
      wagonChain.push(subjectWagon);
      if (qRem) wagonChain.push({ word: qRem, role: "status_linker", color: colorAux });
      if (needsTo) wagonChain.push({ word: "to", role: "status_linker", color: colorInfinitive });
      wagonChain.push({ word: "have", role: "perfect_bridge", color: colorPerfect });
      if (isPassive) {
        wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect });
      }
      wagonChain.push(verbWagon);
    } else {
      wagonChain.push(subjectWagon);
      wagonChain.push({ word: isNeg ? mNotWord : mWord, role: "status_linker", color: colorAux });
      if (needsTo) wagonChain.push({ word: "to", role: "status_linker", color: colorInfinitive });
      wagonChain.push({ word: "have", role: "perfect_bridge", color: colorPerfect });
      if (isPassive) {
        wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect });
      }
      wagonChain.push(verbWagon);
    }
    if (!isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
    }
  } else if (aspect === 'perfect-progressive') {
    const verbWagonIng = isPassive ?
      { word: activeVerbObj.engV3, role: "main_verb_v3", color: colorVerb, suffix_tr: passiveStem + "-" } :
      { word: activeVerbObj.engIng, role: "main_verb_ing", color: colorVerb, suffix_tr: activeStem + "-" };

    if (isQuestion) {
      wagonChain.push({ word: qFirst, role: "status_linker", color: colorAux });
      wagonChain.push(subjectWagon);
      if (qRem) wagonChain.push({ word: qRem, role: "status_linker", color: colorAux });
      if (needsTo) wagonChain.push({ word: "to", role: "status_linker", color: colorInfinitive });
      wagonChain.push({ word: "have", role: "perfect_bridge", color: colorPerfect });
      wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect });
      if (isPassive) {
        wagonChain.push({ word: "being", role: "continuous_motor", color: colorContinuous });
      }
      wagonChain.push(verbWagonIng);
    } else {
      wagonChain.push(subjectWagon);
      wagonChain.push({ word: isNeg ? mNotWord : mWord, role: "status_linker", color: colorAux });
      if (needsTo) wagonChain.push({ word: "to", role: "status_linker", color: colorInfinitive });
      wagonChain.push({ word: "have", role: "perfect_bridge", color: colorPerfect });
      wagonChain.push({ word: "been", role: "perfect_passive", color: colorPerfect });
      if (isPassive) {
        wagonChain.push({ word: "being", role: "continuous_motor", color: colorContinuous });
      }
      wagonChain.push(verbWagonIng);
    }
    if (!isPassive) {
      wagonChain.push({ word: activeSubjectObj.eng.toLowerCase(), role: "object", color: colorObject });
    }
  }

  // Handle capitalization of first word and question mark
  if (isQuestion) {
    wagonChain[0].word = wagonChain[0].word.charAt(0).toUpperCase() + wagonChain[0].word.slice(1);
    if (wagonChain[1] && wagonChain[1].role == "subject") {
      wagonChain[1].word = wagonChain[1].word.charAt(0).toLowerCase() + wagonChain[1].word.slice(1);
    }
    wagonChain[wagonChain.length - 1].word += "?";
  } else {
    wagonChain[0].word = wagonChain[0].word.charAt(0).toUpperCase() + wagonChain[0].word.slice(1);
    wagonChain[wagonChain.length - 1].word += ".";
  }

  // Generate Turkish reflection translation
  const stem = isPassive ? passiveStem : activeStem;
  const startPart = isPassive ? activeSubjectObj.tr : (activeSpeakerTr + " " + accusativeObj);
  
  let verbForm = "";
  if (modal === 'can' || modal === 'may') {
    const isCan = modal === 'can';
    if (aspect === 'simple') {
      verbForm = isNeg ? (isCan ? (appendTrSuffix(stem, "amaz")) : (appendTrSuffix(stem, "mayabilir"))) : (appendTrSuffix(stem, "abilir"));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mıyor olabilir")) : (appendTrSuffix(stem, "yor olabilir"));
    } else if (aspect === 'perfect') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamış olabilir")) : (appendTrSuffix(stem, "mış olabilir"));
    } else if (aspect === 'perfect-progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamakta olabilir")) : (appendTrSuffix(stem, "makta olabilir"));
    }
  } else if (modal === 'cant') {
    if (aspect === 'simple') {
      verbForm = appendTrSuffix(stem, "amaz");
    } else if (aspect === 'progressive') {
      verbForm = appendTrSuffix(stem, "ıyor olamaz");
    } else if (aspect === 'perfect') {
      verbForm = appendTrSuffix(stem, "mış olamaz");
    } else if (aspect === 'perfect-progressive') {
      verbForm = appendTrSuffix(stem, "makta olamaz");
    }
  } else if (modal === 'could' || modal === 'might') {
    const isCould = modal === 'could';
    if (aspect === 'simple') {
      verbForm = isNeg ? (isCould ? (appendTrSuffix(stem, "amazdı")) : (appendTrSuffix(stem, "mayabilirdi"))) : (appendTrSuffix(stem, "abilirdi"));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mıyor olabilirdi")) : (appendTrSuffix(stem, "yor olabilirdi"));
    } else if (aspect === 'perfect') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamış olabilirdi")) : (appendTrSuffix(stem, "mış olabilirdi"));
    } else if (aspect === 'perfect-progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamakta olabilirdi")) : (appendTrSuffix(stem, "makta olabilirdi"));
    }
  } else if (modal === 'couldnt') {
    if (aspect === 'simple') {
      verbForm = appendTrSuffix(stem, "amazdı");
    } else if (aspect === 'progressive') {
      verbForm = appendTrSuffix(stem, "ıyor olamazdı");
    } else if (aspect === 'perfect') {
      verbForm = appendTrSuffix(stem, "mış olamazdı");
    } else if (aspect === 'perfect-progressive') {
      verbForm = appendTrSuffix(stem, "makta olamazdı");
    }
  } else if (modal === 'may_not') {
    if (aspect === 'simple') {
      verbForm = appendTrSuffix(stem, "mayabilir");
    } else if (aspect === 'progressive') {
      verbForm = appendTrSuffix(stem, "mıyor olabilir");
    } else if (aspect === 'perfect') {
      verbForm = appendTrSuffix(stem, "mamış olabilir");
    } else if (aspect === 'perfect-progressive') {
      verbForm = appendTrSuffix(stem, "mamakta olabilir");
    }
  } else if (modal === 'must') {
    if (aspect === 'simple') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamalıdır")) : (appendTrSuffix(stem, "malıdır"));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mıyor olmalıdır")) : (appendTrSuffix(stem, "yor olmalıdır"));
    } else if (aspect === 'perfect') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamış olmalıdır")) : (appendTrSuffix(stem, "mış olmalıdır"));
    } else if (aspect === 'perfect-progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamakta olmalıdır")) : (appendTrSuffix(stem, "makta olmalıdır"));
    }
  } else if (modal === 'mustnt') {
    if (aspect === 'simple') {
      verbForm = appendTrSuffix(stem, "mamalıdır");
    } else if (aspect === 'progressive') {
      verbForm = appendTrSuffix(stem, "mıyor olmalıdır");
    } else if (aspect === 'perfect') {
      verbForm = appendTrSuffix(stem, "mamış olmalıdır");
    } else if (aspect === 'perfect-progressive') {
      verbForm = appendTrSuffix(stem, "mamakta olmalıdır");
    }
  } else if (modal === 'shall') {
    if (aspect === 'simple') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mayacak")) : (appendTrSuffix(stem, "acak"));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mıyor olacak")) : (appendTrSuffix(stem, "yor olacak"));
    } else if (aspect === 'perfect') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamış olacak")) : (appendTrSuffix(stem, "mış olacak"));
    } else if (aspect === 'perfect-progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamakta olacak")) : (appendTrSuffix(stem, "makta olacak"));
    }
  } else if (modal === 'should' || modal === 'ought_to') {
    if (aspect === 'simple') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamalıdır")) : (appendTrSuffix(stem, "malıdır"));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mıyor olmalıdır")) : (appendTrSuffix(stem, "yor olmalıdır"));
    } else if (aspect === 'perfect') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamış olmalıydı")) : (appendTrSuffix(stem, "mış olmalıydı"));
    } else if (aspect === 'perfect-progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamakta olmalıydı")) : (appendTrSuffix(stem, "makta olmalıydı"));
    }
  } else if (modal === 'shouldnt') {
    if (aspect === 'simple') {
      verbForm = appendTrSuffix(stem, "mamalıdır");
    } else if (aspect === 'progressive') {
      verbForm = appendTrSuffix(stem, "mıyor olmalıdır");
    } else if (aspect === 'perfect') {
      verbForm = appendTrSuffix(stem, "mamış olmalıydı");
    } else if (aspect === 'perfect-progressive') {
      verbForm = appendTrSuffix(stem, "mamakta olmalıydı");
    }
  } else if (modal === 'would') {
    if (aspect === 'simple') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mazdı")) : (appendAoristArdi(stem));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mıyor olurdu")) : (appendTrSuffix(stem, "yor olurdu"));
    } else if (aspect === 'perfect') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamış olurdu")) : (appendTrSuffix(stem, "mış olurdu"));
    } else if (aspect === 'perfect-progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamakta olurdu")) : (appendTrSuffix(stem, "makta olurdu"));
    }
  } else if (modal === 'used_to') {
    if (aspect === 'simple') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mazdı")) : (appendAoristArdi(stem));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mıyor olurdu")) : (appendTrSuffix(stem, "yor olurdu"));
    } else if (aspect === 'perfect') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamış olurdu")) : (appendTrSuffix(stem, "mış olurdu"));
    } else if (aspect === 'perfect-progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamakta olurdu")) : (appendTrSuffix(stem, "makta olurdu"));
    }
  } else if (modal === 'have_to') {
    if (aspect === 'simple') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mak zorunda değil")) : (appendTrSuffix(stem, "mak zorunda"));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mak zorunda değil")) : (appendTrSuffix(stem, "mak zorunda"));
    } else if (aspect === 'perfect') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mak zorunda kalmadı")) : (appendTrSuffix(stem, "mak zorunda kaldı"));
    } else if (aspect === 'perfect-progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mak zorunda kalmadı")) : (appendTrSuffix(stem, "mak zorunda kaldı"));
    }
  } else if (modal === 'had_to') {
    if (aspect === 'simple') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mak zorunda değildi")) : (appendTrSuffix(stem, "mak zorundaydı"));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mak zorunda değildi")) : (appendTrSuffix(stem, "mak zorundaydı"));
    } else if (aspect === 'perfect') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mak zorunda kalmamıştı")) : (appendTrSuffix(stem, "mak zorunda kalmıştı"));
    } else if (aspect === 'perfect-progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mak zorunda kalmamıştı")) : (appendTrSuffix(stem, "mak zorunda kalmıştı"));
    }
  } else if (modal === 'be_able_to') {
    if (aspect === 'simple') {
      verbForm = isNeg ? (appendTrSuffix(stem, "amaz")) : (appendTrSuffix(stem, "abilir"));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "abiliyor değil")) : (appendTrSuffix(stem, "abiliyor"));
    } else if (aspect === 'perfect') {
      verbForm = isNeg ? (appendTrSuffix(stem, "abilmiş değil")) : (appendTrSuffix(stem, "abilmiştir"));
    } else if (aspect === 'perfect-progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "abilmekte değil")) : (appendTrSuffix(stem, "abilmektedir"));
    }
  } else if (modal === 'was_were_able_to') {
    if (aspect === 'simple') {
      verbForm = isNeg ? (appendTrSuffix(stem, "amadı")) : (appendTrSuffix(stem, "abildi"));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "abiliyordu değil")) : (appendTrSuffix(stem, "abiliyordu"));
    } else if (aspect === 'perfect') {
      verbForm = isNeg ? (appendTrSuffix(stem, "abilmişti değil")) : (appendTrSuffix(stem, "abilmişti"));
    } else if (aspect === 'perfect-progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "abilmekteydi değil")) : (appendTrSuffix(stem, "abilmekteydi"));
    }
  } else if (modal === 'wasnt_werent_able_to') {
    if (aspect === 'simple') {
      verbForm = appendTrSuffix(stem, "amadı");
    } else if (aspect === 'progressive') {
      verbForm = appendTrSuffix(stem, "abiliyordu değil");
    } else if (aspect === 'perfect') {
      verbForm = appendTrSuffix(stem, "abilmişti değil");
    } else if (aspect === 'perfect-progressive') {
      verbForm = appendTrSuffix(stem, "abilmekteydi değil");
    }
  } else if (modal === 'will_have_to') {
    if (aspect === 'simple') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mak zorunda kalmayacak")) : (appendTrSuffix(stem, "mak zorunda kalacak"));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mak zorunda kalmıyor olacak")) : (appendTrSuffix(stem, "mak zorunda kalıyor olacak"));
    } else if (aspect === 'perfect') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mak zorunda kalmamış olacak")) : (appendTrSuffix(stem, "mak zorunda kalmış olacak"));
    } else if (aspect === 'perfect-progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mak zorunda kalmamakta olacak")) : (appendTrSuffix(stem, "mak zorunda kalmakta olacak"));
    }
  } else if (modal === 'have_got_to') {
    if (aspect === 'simple') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mak zorunda değil")) : (appendTrSuffix(stem, "mak zorunda"));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mak zorunda değil")) : (appendTrSuffix(stem, "mak zorunda"));
    } else if (aspect === 'perfect') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mak zorunda kalmadı")) : (appendTrSuffix(stem, "mak zorunda kaldı"));
    } else if (aspect === 'perfect-progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mak zorunda kalmadı")) : (appendTrSuffix(stem, "mak zorunda kaldı"));
    }
  } else if (modal === 'dont_doesnt_have_to') {
    if (aspect === 'simple' || aspect === 'progressive') {
      verbForm = appendTrSuffix(stem, "mak zorunda değil");
    } else {
      verbForm = appendTrSuffix(stem, "mak zorunda kalmadı");
    }
  } else if (modal === 'dont_doesnt_need_to') {
    if (aspect === 'simple' || aspect === 'progressive') {
      verbForm = appendTrSuffix(stem, "masına gerek yok");
    } else {
      verbForm = appendTrSuffix(stem, "masına gerek kalmadı");
    }
  } else if (modal === 'didnt_have_to') {
    if (aspect === 'simple') {
      verbForm = appendTrSuffix(stem, "mak zorunda kalmadı");
    } else if (aspect === 'progressive') {
      verbForm = appendTrSuffix(stem, "masına gerek kalmıyordu");
    } else {
      verbForm = appendTrSuffix(stem, "masına gerek kalmamıştı");
    }
  } else if (modal === 'didnt_need_to') {
    if (aspect === 'simple') {
      verbForm = appendTrSuffix(stem, "masına gerek kalmadı");
    } else if (aspect === 'progressive') {
      verbForm = appendTrSuffix(stem, "masına gerek kalmıyordu");
    } else {
      verbForm = appendTrSuffix(stem, "masına gerek kalmamıştı");
    }
  } else if (modal === 'neednt') {
    if (aspect === 'simple') {
      verbForm = appendTrSuffix(stem, "ması gerekmez");
    } else if (aspect === 'progressive') {
      verbForm = appendTrSuffix(stem, "ması gerekmiyor");
    } else if (aspect === 'perfect') {
      verbForm = appendTrSuffix(stem, "ması gerekmezdi");
    } else {
      verbForm = appendTrSuffix(stem, "ması gerekmemekte");
    }
  } else if (modal === 'ought_not_to') {
    if (aspect === 'simple') {
      verbForm = appendTrSuffix(stem, "masa iyi olur");
    } else if (aspect === 'progressive') {
      verbForm = appendTrSuffix(stem, "mıyor olsa iyi olur");
    } else {
      verbForm = appendTrSuffix(stem, "mamış olsa iyi olurdu");
    }
  } else if (modal === 'had_better') {
    if (aspect === 'simple') {
      verbForm = isNeg ? (appendTrSuffix(stem, "masa iyi olur")) : (appendTrSuffix(stem, "sa iyi olur"));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mıyor olsa iyi olur")) : (appendTrSuffix(stem, "yor olsa iyi olur"));
    } else {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamış olsa iyi olurdu")) : (appendTrSuffix(stem, "mış olsa iyi olurdu"));
    }
  } else if (modal === 'had_better_not') {
    if (aspect === 'simple') {
      verbForm = appendTrSuffix(stem, "masa iyi olur");
    } else if (aspect === 'progressive') {
      verbForm = appendTrSuffix(stem, "mıyor olsa iyi olur");
    } else {
      verbForm = appendTrSuffix(stem, "mamış olsa iyi olurdu");
    }
  } else if (modal === 'didnt_use_to') {
    if (aspect === 'simple') {
      verbForm = appendTrSuffix(stem, "mazdı");
    } else if (aspect === 'progressive') {
      verbForm = appendTrSuffix(stem, "mıyor olurdu");
    } else {
      verbForm = appendTrSuffix(stem, "mamış olurdu");
    }
  } else if (modal === 'be_used_to_ing') {
    if (aspect === 'simple') {
      verbForm = isNeg ? (appendTrSuffix(stem, "maya alışık değil")) : (appendTrSuffix(stem, "maya alışıktır"));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "maya alışıyor değil")) : (appendTrSuffix(stem, "maya alışmaktadır"));
    } else if (aspect === 'perfect') {
      verbForm = isNeg ? (appendTrSuffix(stem, "maya alışmış değil")) : (appendTrSuffix(stem, "maya alışmıştır"));
    } else {
      verbForm = isNeg ? (appendTrSuffix(stem, "maya alışmakta değil")) : (appendTrSuffix(stem, "maya alışmaktadır"));
    }
  } else if (modal === 'was_were_used_to_ing') {
    if (aspect === 'simple') {
      verbForm = isNeg ? (appendTrSuffix(stem, "maya alışık değildi")) : (appendTrSuffix(stem, "maya alışıktı"));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "maya alışıyor değildi")) : (appendTrSuffix(stem, "maya alışmaktaydı"));
    } else if (aspect === 'perfect') {
      verbForm = isNeg ? (appendTrSuffix(stem, "maya alışmış değildi")) : (appendTrSuffix(stem, "maya alışmıştı"));
    } else {
      verbForm = isNeg ? (appendTrSuffix(stem, "maya alışmakta değildi")) : (appendTrSuffix(stem, "maya alışmaktaydı"));
    }
  } else if (modal === 'get_used_to_ing') {
    if (aspect === 'simple') {
      verbForm = isNeg ? (appendTrSuffix(stem, "maya alışmaz")) : (appendTrSuffix(stem, "maya alışır"));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "maya alışmıyor")) : (appendTrSuffix(stem, "maya alışıyor"));
    } else if (aspect === 'perfect') {
      verbForm = isNeg ? (appendTrSuffix(stem, "maya alışmadı")) : (appendTrSuffix(stem, "maya alıştı"));
    } else {
      verbForm = isNeg ? (appendTrSuffix(stem, "maya alışmamakta")) : (appendTrSuffix(stem, "maya alışmakta"));
    }
  } else if (modal === 'would_prefer' || modal === 'would_rather') {
    if (aspect === 'simple') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamayı tercih eder")) : (appendTrSuffix(stem, "mayı tercih eder"));
    } else if (aspect === 'progressive') {
      verbForm = isNeg ? (appendTrSuffix(stem, "mıyor olmayı tercih eder")) : (appendTrSuffix(stem, "yor olmayı tercih eder"));
    } else {
      verbForm = isNeg ? (appendTrSuffix(stem, "mamış olmayı tercih ederdi")) : (appendTrSuffix(stem, "mış olmayı tercih ederdi"));
    }
  } else if (modal === 'would_rather_not') {
    if (aspect === 'simple') {
      verbForm = appendTrSuffix(stem, "mamayı tercih eder");
    } else if (aspect === 'progressive') {
      verbForm = appendTrSuffix(stem, "mıyor olmayı tercih eder");
    } else {
      verbForm = appendTrSuffix(stem, "mamış olmayı tercih ederdi");
    }
  }

  // Handle Turkish question particle
  if (isQuestion) {
    function convertTrToQuestion(f) {
      let trimmed = f.trim();
      if (trimmed.endsWith('.')) trimmed = trimmed.slice(0, -1);
      
      if (trimmed.endsWith("olabilir")) return trimmed.replace("olabilir", "olabilir mi?");
      if (trimmed.endsWith("olabilirdi")) return trimmed.replace("olabilirdi", "olabilir miydi?");
      if (trimmed.endsWith("olurdu")) return trimmed.replace("olurdu", "olur muydu?");
      if (trimmed.endsWith("zorunda")) return trimmed + " mı?";
      if (trimmed.endsWith("zorunda değil")) return trimmed.replace("zorunda değil", "zorunda değil mi?");
      if (trimmed.endsWith("zorundaydı")) return trimmed.replace("zorundaydı", "zorunda mıydı?");
      if (trimmed.endsWith("zorunda değildi")) return trimmed.replace("zorunda değildi", "zorunda değil miydi?");
      if (trimmed.endsWith("kaldı")) return trimmed.replace("kaldı", "kaldı mı?");
      if (trimmed.endsWith("kalmadı")) return trimmed.replace("kalmadı", "kalmadı mı?");
      if (trimmed.endsWith("kalmıştı")) return trimmed.replace("kalmıştı", "kalmış mıydı?");
      if (trimmed.endsWith("kalmamıştı")) return trimmed.replace("kalmamıştı", "kalmamış mıydı?");
      if (trimmed.endsWith("alışıktır")) return trimmed.replace("alışıktır", "alışık mıdır?");
      if (trimmed.endsWith("alışıktı")) return trimmed.replace("alışıktı", "alışık mıydı?");
      if (trimmed.endsWith("alışır")) return trimmed.replace("alışır", "alışır mı?");
      if (trimmed.endsWith("alışıyor")) return trimmed.replace("alışıyor", "alışıyor mu?");
      if (trimmed.endsWith("alıştı")) return trimmed.replace("alıştı", "alıştı mı?");
      if (trimmed.endsWith("alışmadı")) return trimmed.replace("alışmadı", "alışmadı mı?");
      if (trimmed.endsWith("gerekmez")) return trimmed.replace("gerekmez", "gerekmez mi?");
      if (trimmed.endsWith("gerekmezdi")) return trimmed.replace("gerekmezdi", "gerekmez miydi?");
      if (trimmed.endsWith("gerekmiyor")) return trimmed.replace("gerekmiyor", "gerekmiyor mu?");
      if (trimmed.endsWith("gerek yok")) return trimmed.replace("gerek yok", "gerek yok mu?");
      if (trimmed.endsWith("gerek kalmadı")) return trimmed.replace("gerek kalmadı", "gerek kalmadı mı?");
      if (trimmed.endsWith("gerek kalmıyordu")) return trimmed.replace("gerek kalmıyordu", "gerek kalmıyor muydu?");
      if (trimmed.endsWith("gerek kalmamıştı")) return trimmed.replace("gerek kalmamıştı", "gerek kalmamış mıydı?");
      if (trimmed.endsWith("iyi olur")) return trimmed.replace("iyi olur", "iyi olur mu?");
      if (trimmed.endsWith("iyi olurdu")) return trimmed.replace("iyi olurdu", "iyi olur muydu?");
      if (trimmed.endsWith("bilir")) return trimmed + " mi?";
      if (trimmed.endsWith("bilirdi")) return trimmed.replace("bilirdi", "bilir miydi?");
      if (trimmed.endsWith("amaz")) return trimmed + " mı?";
      if (trimmed.endsWith("amazdı")) return trimmed.replace("amazdı", "amaz mıydı?");
      if (trimmed.endsWith("mayabilir")) return trimmed + " mi?";
      if (trimmed.endsWith("mayabilirdi")) return trimmed.replace("mayabilirdi", "mayabilir miydi?");
      if (trimmed.endsWith("malıdır")) return trimmed.replace("malıdır", "malı mıdır?");
      if (trimmed.endsWith("mamalıdır")) return trimmed.replace("mamalıdır", "mamalı mıdır?");
      if (trimmed.endsWith("acak")) return trimmed + " mı?";
      if (trimmed.endsWith("ecek")) return trimmed + " mi?";
      if (trimmed.endsWith("acaklar")) return trimmed.replace("acaklar", "acaklar mı?");
      if (trimmed.endsWith("ecekler")) return trimmed.replace("ecekler", "ecekler mi?");
      if (trimmed.endsWith("tercih eder")) return trimmed.replace("tercih eder", "tercih eder mi?");
      if (trimmed.endsWith("tercih ederdi")) return trimmed.replace("tercih ederdi", "tercih eder miydi?");
      if (trimmed.endsWith("ardı")) {
        const lastV = getLastVowel(trimmed.slice(0, -4));
        const harmony = get4WayHarmony(lastV);
        return trimmed.replace("ardı", "ar m" + harmony + "dı?");
      }
      if (trimmed.endsWith("erdi")) return trimmed.replace("erdi", "er miydi?");
      if (trimmed.endsWith("mazdı")) return trimmed.replace("mazdı", "maz mıydı?");
      if (trimmed.endsWith("mezdi")) return trimmed.replace("mezdi", "mez miydi?");
      
      return trimmed + " mu?";
    }
    verbForm = convertTrToQuestion(verbForm);
  } else {
    verbForm += ".";
  }

  trReflexColored = startPart + " " + `<span style="color:${colorVerb}; font-weight:800;">${verbForm}</span>`;

  currentLvl.wagon_chain = wagonChain;
  currentLvl.english_sentence = wagonChain.map(w => w.word).join(' ').replace(/\s+\./g, '.').replace(/\.+/g, '.').replace(/\s+\?/g, '?');
  currentLvl.turkish_reflex_colored = trReflexColored;
  currentLvl.turkish_reflex = trReflexColored.replace(/<[^>]*>/g, '');
  
  return currentLvl;
}


// ============================================================
// YÜKLEM ÖBEĞİ ÖĞE SAYISI VE OTOMATİK FİLTRELEME SİSTEMİ
// ============================================================
function getPredicateElementCount(wagonChain) {
  if (!wagonChain) return 0;
  if (selectedLevel === 1 && (!state.selectedSimulatorModal || state.selectedSimulatorModal === 'none')) {
    return 0;
  }
  
  let count = 0;
  for (const wagon of wagonChain) {
    const word = (wagon.word || '').toLowerCase().replace(/[^a-z']/g, '').trim();
    if (wagon.role === 'subject' || wagon.role === 'object' || wagon.role === 'negation' || word === 'to') {
      continue;
    }
    count++;
  }
  return count;
}

function configureCockpitForPredicateCount(targetCount) {
  const origLevel = selectedLevel;
  const origModal = state.selectedSimulatorModal;
  const origVoice = state.activePassiveMode;
  const origPureTense = state.pureTense;
  
  function testConfig(lvl, modalVal, voiceVal) {
    selectedLevel = lvl;
    state.selectedSimulatorModal = modalVal;
    state.activePassiveMode = voiceVal;
    state.pureTense = null;
    
    let data = null;
    if (modalVal && modalVal !== 'none') {
      let aspect = 'simple';
      if (lvl === 4 || lvl === 5) aspect = 'progressive';
      if (lvl === 6 || lvl === 7 || lvl === 8 || lvl === 10 || lvl === 12) aspect = 'perfect';
      if (lvl === 9 || lvl === 11) aspect = 'perfect-progressive';
      
      let tense = 'present';
      if (lvl === 2 || lvl === 5 || lvl === 7 || lvl === 12) tense = 'past';
      if (lvl === 3 || lvl === 8 || lvl === 9) tense = 'future';
      
      data = getModalTenseData(modalVal, tense, aspect);
    } else {
      data = getActiveLevelData(lvl);
    }
    
    if (data) {
      const count = getPredicateElementCount(data.wagon_chain);
      if (count === targetCount) {
        return true;
      }
    }
    return false;
  }

  // 1. Try base levels with current voice
  for (let lvl = 1; lvl <= 12; lvl++) {
    if (testConfig(lvl, 'none', origVoice)) {
      saveState();
      syncCockpitUI();
      return;
    }
  }
  
  // 2. Try base levels with other voice
  const otherVoice = origVoice === 'active' ? 'passive' : 'active';
  for (let lvl = 1; lvl <= 12; lvl++) {
    if (testConfig(lvl, 'none', otherVoice)) {
      saveState();
      syncCockpitUI();
      return;
    }
  }

  // 3. Try modal combinations
  const modalOptions = [
    'can', 'cant', 'could', 'couldnt', 'may', 'may_not', 'might', 'must', 'mustnt',
    'shall', 'should', 'shouldnt', 'would', 'used_to', 'have_to', 'had_to',
    'be_able_to', 'was_were_able_to', 'wasnt_werent_able_to', 'will_have_to',
    'have_got_to', 'dont_doesnt_have_to', 'dont_doesnt_need_to', 'didnt_have_to',
    'didnt_need_to', 'neednt', 'ought_to', 'ought_not_to', 'had_better', 'had_better_not',
    'didnt_use_to', 'be_used_to_ing', 'was_were_used_to_ing', 'get_used_to_ing'
  ];
  
  const lvlOptions = [1, 2, 4, 6, 9];
  const voiceOptions = ['active', 'passive'];

  for (const m of modalOptions) {
    for (const lvl of lvlOptions) {
      for (const voice of voiceOptions) {
        if (testConfig(lvl, m, voice)) {
          saveState();
          syncCockpitUI();
          return;
        }
      }
    }
  }
  
  // If not found, restore original state
  selectedLevel = origLevel;
  state.selectedSimulatorModal = origModal;
  state.activePassiveMode = origVoice;
  state.pureTense = origPureTense;
}

function syncPredicateLevelsHighlight() {
  const levelBtnsContainer = document.getElementById('simulator-level-buttons');
  if (levelBtnsContainer) {
    const currentLvlData = getActiveLevelData(selectedLevel);
    const currentCount = getPredicateElementCount(currentLvlData ? currentLvlData.wagon_chain : null);
    levelBtnsContainer.querySelectorAll('.simulator-level-btn').forEach(btn => {
      const btnCount = parseInt(btn.dataset.predCount, 10);
      btn.classList.toggle('active', btnCount === currentCount);
    });
  }
}


function syncPureTenseMatrixHighlight() {
  const currentLvlData = getActiveLevelData(selectedLevel);
  const currentCount = getPredicateElementCount(currentLvlData ? currentLvlData.wagon_chain : null);

  document.querySelectorAll('.matrix-cell-btn').forEach(btn => {
    const t = btn.dataset.tense;
    const a = btn.dataset.aspect;
    
    const isActivelySelected = (state.pureTense && state.pureTense.tense === t && state.pureTense.aspect === a && (!state.selectedSimulatorModal || state.selectedSimulatorModal === 'none'));
    btn.classList.toggle('active', isActivelySelected);
    
    const data = getPureTenseData(t, a);
    const btnCount = getPredicateElementCount(data ? data.wagon_chain : null);
    
    const isMatch = (btnCount === currentCount);
    btn.classList.toggle('match', isMatch);
  });
}

function syncModalMatrixHighlight() {
  const currentLvlData = getActiveLevelData(selectedLevel);
  const currentCount = getPredicateElementCount(currentLvlData ? currentLvlData.wagon_chain : null);

  document.querySelectorAll('.modal-matrix-btn').forEach(btn => {
    const btnModal = btn.dataset.modal;
    const btnAspect = btn.dataset.aspect || 'simple';
    const btnNeg = btn.dataset.neg === 'true';
    const btnTense = btn.dataset.tense || 'present';
    
    let currentAspect = 'simple';
    if (selectedLevel === 4 || selectedLevel === 5) currentAspect = 'progressive';
    if (selectedLevel === 6 || selectedLevel === 7 || selectedLevel === 8 || selectedLevel === 10 || selectedLevel === 12) currentAspect = 'perfect';
    if (selectedLevel === 9 || selectedLevel === 11) currentAspect = 'perfect-progressive';

    let currentTense = 'present';
    if (selectedLevel === 2 || selectedLevel === 5 || selectedLevel === 7 || selectedLevel === 12) currentTense = 'past';
    if (selectedLevel === 3 || selectedLevel === 8 || selectedLevel === 9) currentTense = 'future';

    const isMatch = (
      state.selectedSimulatorModal === btnModal && 
      currentAspect === btnAspect && 
      (state.negationOn || false) === btnNeg &&
      currentTense === btnTense
    );
    btn.classList.toggle('active', isMatch);

    // Calculate count match
    const originalNeg = state.negationOn;
    state.negationOn = btnNeg;
    const data = getModalTenseData(btnModal, btnTense, btnAspect);
    state.negationOn = originalNeg;
    const btnCount = getPredicateElementCount(data ? data.wagon_chain : null);

    const isCountMatch = (btnCount === currentCount);
    btn.classList.toggle('match', isCountMatch);
  });
}
