import re

new_translations = {
    "rather": "tercihen, daha ziyade",
    "would rather": "tercih etmek, yeğlemek",
    "bodrum": "Bodrum (ilçe)",
    "ankara": "Ankara (il)",
    "optimize": "optimize etmek, eniyilemek",
    "request": "talep etmek, rica etmek",
    "reinforce": "güçlendirmek, takviye etmek",
    "outdated": "eski, modası geçmiş",
    "diesel": "dizel",
    "evaluate": "değerlendirmek",
    "settle": "çözmek, halletmek, yerleşmek",
    "dispute": "anlaşmazlık, tartışma",
    "lawsuit": "dava (hukuk)",
    "regarding": "ilişkin, dair, hakkında",
    "encryption": "şifreleme",
    "locally": "yerel olarak",
    "utilize": "kullanmak, yararlanmak",
    "organize": "düzenlemek, organize etmek",
    "travelled": "seyahat etti, seyahat etmiş",
    "chosen": "seçilmiş",
    "invested": "yatırılmış, yatırım yapılan",
    "stayed": "kaldı, kalmış",
    "studied": "çalıştı, eğitim gördü",
    "designing": "tasarlama, tasarlarken",
    "checked": "kontrol etti, kontrol edilmiş",
    "shorter": "daha kısa",
    "path": "yol, patika",
    "congestion": "sıkışıklık, tıkanıklık",
    "declined": "reddedildi, reddetti",
    "politely": "kibarca, nazikçe",
    "spent": "harcadı, harcanmış",
    "deployed": "dağıtılmış, konuşlandırılmış",
    "testing": "test etme, deneme",
    "installed": "yüklendi, kuruldu",
    "patch": "yama, düzeltme",
    "peak": "zirve, yoğun",
    "maintenance": "bakım, onarım",
    "inspected": "denetlendi, incelendi",
    "sooner": "daha erken, daha önce",
    "collected": "toplandı, biriktirildi",
    "initially": "başlangıçta, ilk olarak",
    "anticipated": "öngörüldü, tahmin edildi",
    "breakdown": "kırılım, analiz, arıza",
    "plane": "uçak",
    "junior": "kıdemce küçük, genç",
    "technician": "teknisyen",
    "didnt": "yapmadı, etmedi (-di geçmiş zaman olumsuzu)",
    "come": "gelmek",
    "console": "konsol, kumanda masası",
    "now": "şimdi, şu anda",
    "updated": "güncellendi, güncellenmiş",
    "signed": "imzalandı, imzalanmış",
    "tomorrow": "yarın",
    "worked": "çalıştı, çalışmış",
    "inside": "içinde, içeride",
    "resolved": "çözüldü, kararlaştırıldı",
    "published": "yayınlandı, basıldı",
    "processed": "işlendi, işlemden geçirildi",
    "sterilized": "sterilize edildi",
    "test-tubes": "deney tüpleri",
    "assistant": "asistan, yardımcı",
    "week": "hafta",
    "yesterday": "dün",
    "presentation": "sunum",
    "immediately": "derhal, hemen",
    "next": "sonraki, gelecek",
    "month": "ay (takvim)",
    "night": "gece",
    "vehicle": "araç, taşıt",
    "scripts": "kodlar, senaryolar",
    "meetings": "toplantılar"
}

unitAra1Lesson1SentencesRaw_code = """const unitAra1Lesson1SentencesRaw = [
  { en: "I would rather live in Bodrum than in Ankara.", tr: "Ankara'da yaşamaktansa Bodrum'da yaşamayı tercih ederim.", word: "live", trWord: "yaşamayı", blank: "I would rather ___ in Bodrum than in Ankara.", blocks: ["I", "would rather live", "in Bodrum than in Ankara."] },
  { en: "The software team would rather optimize the cloud database tonight.", tr: "Yazılım ekibi bulut veritabanını bu gece optimize etmeyi tercih eder.", word: "optimize", trWord: "optimize etmeyi", blank: "The software team would rather ___ the cloud database tonight.", blocks: ["The software team", "would rather optimize", "the cloud database tonight."] },
  { en: "The laboratory researcher would rather request statistical data than conduct surveys.", tr: "Laboratuvar araştırmacısı anket yapmaktansa istatistiksel veri talep etmeyi tercih eder.", word: "request", trWord: "talep etmeyi", blank: "The laboratory researcher would rather ___ statistical data than conduct surveys.", blocks: ["The laboratory researcher", "would rather request", "statistical data than conduct surveys."] },
  { en: "They would rather develop the app framework in Flutter than use outdated tools.", tr: "Eski araçları kullanmaktansa uygulama çerçevesini Flutter'da geliştirmeyi tercih ederler.", word: "develop", trWord: "geliştirmeyi", blank: "They would rather ___ the app framework in Flutter than use outdated tools.", blocks: ["They", "would rather develop", "the app framework in Flutter than use outdated tools."] },
  { en: "We would rather reinforce the central concrete core than risk a structural anomaly.", tr: "Yapısal bir anomaliyi göze almaktansa merkezi beton çekirdeği güçlendirmeyi tercih ederiz.", word: "reinforce", trWord: "güçlendirmeyi", blank: "We would rather ___ the central concrete core than risk a structural anomaly.", blocks: ["We", "would rather reinforce", "the central concrete core than risk a structural anomaly."] },
  { en: "He would rather buy an electric vehicle for the facility than a diesel car.", tr: "Tesis için dizel bir araba yerine elektrikli bir araç satın almayı tercih eder.", word: "buy", trWord: "satın almayı", blank: "He would rather ___ an electric vehicle for the facility than a diesel car.", blocks: ["He", "would rather buy", "an electric vehicle for the facility than a diesel car."] },
  { en: "I would rather work on a new architectural framework than maintain old scripts.", tr: "Eski kodları sürdürmektense yeni bir mimari çerçeve üzerinde çalışmayı tercih ederim.", word: "work", trWord: "çalışmayı", blank: "I would rather ___ on a new architectural framework than maintain old scripts.", blocks: ["I", "would rather work", "on a new architectural framework than maintain old scripts."] },
  { en: "Senior analysts would rather evaluate data charts than read long regional surveys.", tr: "Kıdemli analistler uzun bölgesel anketleri okumaktansa veri grafiklerini değerlendirmeyi tercih ederler.", word: "evaluate", trWord: "değerlendirmeyi", blank: "Senior analysts would rather ___ data charts than read long regional surveys.", blocks: ["Senior analysts", "would rather evaluate", "data charts than read long regional surveys."] },
  { en: "Institutional authorities would rather settle the commercial dispute without a lawsuit.", tr: "Kurumsal makamlar ticari anlaşmazlığı dava açmadan çözmeyi tercih ederler.", word: "settle", trWord: "çözmeyi", blank: "Institutional authorities would rather ___ the commercial dispute without a lawsuit.", blocks: ["Institutional authorities", "would rather settle", "the commercial dispute without a lawsuit."] },
  { en: "She would rather read an academic paper regarding encryption than a regular journal.", tr: "Sıradan bir dergiyi okumaktansa şifrelemeyle ilgili akademik bir makale okumayı tercih eder.", word: "read", trWord: "okumayı", blank: "She would rather ___ an academic paper regarding encryption than a regular journal.", blocks: ["She", "would rather read", "an academic paper regarding encryption than a regular journal."] },
  { en: "Technical experts would rather design a new system than modify the old framework.", tr: "Teknik uzmanlar eski çerçeveyi değiştirmektense yeni bir sistem tasarlamayı tercih ederler.", word: "design", trWord: "tasarlamayı", blank: "Technical experts would rather ___ a new system than modify the old framework.", blocks: ["Technical experts", "would rather design", "a new system than modify the old framework."] },
  { en: "The evaluation committee would rather publish the qualitative insights next month.", tr: "Değerlendirme komitesi nitel öngörüleri gelecek ay yayınlamayı tercih eder.", word: "publish", trWord: "yayınlamayı", blank: "The evaluation committee would rather ___ the qualitative insights next month.", blocks: ["The evaluation committee", "would rather publish", "the qualitative insights next month."] },
  { en: "Government agencies would rather process data locally to protect user privacy.", tr: "Devlet kurumları kullanıcı gizliliğini korumak için verileri yerel olarak işlemeyi tercih eder.", word: "process", trWord: "işlemeyi", blank: "Government agencies would rather ___ data locally to protect user privacy.", blocks: ["Government agencies", "would rather process", "data locally to protect user privacy."] },
  { en: "Annual auditors would rather utilize advanced encryption algorithms for deep scanning.", tr: "Yıllık denetçiler derin tarama için gelişmiş şifreleme algoritmaları kullanmayı tercih ederler.", word: "utilize", trWord: "kullanmayı", blank: "Annual auditors would rather ___ advanced encryption algorithms for deep scanning.", blocks: ["Annual auditors", "would rather utilize", "advanced encryption algorithms for deep scanning."] },
  { en: "The education ministry would rather organize a digital summit than local meetings.", tr: "Eğitim bakanlığı yerel toplantılar yerine dijital bir zirve düzenlemeyi tercih eder.", word: "organize", trWord: "düzenlemeyi", blank: "The education ministry would rather ___ a digital summit than local meetings.", blocks: ["The education ministry", "would rather organize", "a digital summit than local meetings."] }
];"""

unitAra1Lesson2SentencesRaw_code = """const unitAra1Lesson2SentencesRaw = [
  { en: "I would rather have travelled to the international summit by train last month.", tr: "Geçen ay uluslararası zirveye trenle seyahat etmiş olmayı tercih ederdim.", word: "travelled", trWord: "seyahat etmiş olmayı", blank: "I would rather have ___ to the international summit by train last month.", blocks: ["I", "would rather have travelled", "to the international summit by train last month."] },
  { en: "The technical expert would rather have chosen an alternative research methodology.", tr: "Teknik uzman alternatif bir araştırma metodolojisi seçmiş olmayı tercih ederdi.", word: "chosen", trWord: "seçmiş olmayı", blank: "The technical expert would rather have ___ an alternative research methodology.", blocks: ["The technical expert", "would rather have chosen", "an alternative research methodology."] },
  { en: "The corporation would rather have invested its annual research budget in technology.", tr: "Şirket yıllık araştırma bütçesini teknolojiye yatırmış olmayı tercih ederdi.", word: "invested", trWord: "yatırmış olmayı", blank: "The corporation would rather have ___ its annual research budget in technology.", blocks: ["The corporation", "would rather have invested", "its annual research budget in technology."] },
  { en: "We would rather have integrated individual software modules before the critical deadline.", tr: "Kritik son tarihten önce bireysel yazılım modüllerini entegre etmiş olmayı tercih ederdik.", word: "integrated", trWord: "entegre etmiş olmayı", blank: "We would rather have ___ individual software modules before the critical deadline.", blocks: ["We", "would rather have integrated", "individual software modules before the critical deadline."] },
  { en: "Technicians would rather have stayed at the modern industrial facility during the test.", tr: "Teknisyenler test sırasında modern endüstriyel tesiste kalmış olmayı tercih ederlerdi.", word: "stayed", trWord: "kalmış olmayı", blank: "Technicians would rather have ___ at the modern industrial facility during the test.", blocks: ["Technicians", "would rather have stayed", "at the modern industrial facility during the test."] },
  { en: "He would rather have studied computer engineering before designing this framework.", tr: "Bu çerçeveyi tasarlamadan önce bilgisayar mühendisliği okumuş olmayı tercih ederdi.", word: "studied", trWord: "okumuş olmayı", blank: "He would rather have ___ computer engineering before designing this framework.", blocks: ["He", "would rather have studied", "computer engineering before designing this framework."] },
  { en: "I would rather have checked the automated script error logs yesterday morning.", tr: "Dün sabah otomatik kod hata günlüklerini kontrol etmiş olmayı tercih ederdim.", word: "checked", trWord: "kontrol etmiş olmayı", blank: "I would rather have ___ the automated script error logs yesterday morning.", blocks: ["I", "would rather have checked", "the automated script error logs yesterday morning."] },
  { en: "You would rather have taken the shorter path to avoid the network congestion.", tr: "Ağ sıkışıklığından kaçınmak için daha kısa yolu seçmiş olmayı tercih ederdiniz.", word: "taken", trWord: "seçmiş olmayı", blank: "You would rather have ___ the shorter path to avoid the network congestion.", blocks: ["You", "would rather have taken", "the shorter path to avoid the network congestion."] },
  { en: "The council would rather have declined the formal bilateral agreements politely.", tr: "Konsey resmi ikili anlaşmaları kibarca reddetmiş olmayı tercih ederdi.", word: "declined", trWord: "reddetmiş olmayı", blank: "The council would rather have ___ the formal bilateral agreements politely.", blocks: ["The council", "would rather have declined", "the formal bilateral agreements politely."] },
  { en: "We would rather have spent our research funds on a specialized local committee.", tr: "Araştırma fonlarımızı uzmanlaşmış yerel bir komiteye harcamış olmayı tercih ederdik.", word: "spent", trWord: "harcamış olmayı", blank: "We would rather have ___ our research funds on a specialized local committee.", blocks: ["We", "would rather have spent", "our research funds on a specialized local committee."] },
  { en: "The software team would rather have deployed the script after comprehensive testing.", tr: "Yazılım ekibi kapsamlı testlerden sonra kodu dağıtmış olmayı tercih ederdi.", word: "deployed", trWord: "dağıtmış olmayı", blank: "The software team would rather have ___ the script after comprehensive testing.", blocks: ["The software team", "would rather have deployed", "the script after comprehensive testing."] },
  { en: "Government agencies would rather have installed the security patch during peak maintenance.", tr: "Devlet kurumları güvenlik yamasını yoğun bakım sırasında yüklemiş olmayı tercih ederdi.", word: "installed", trWord: "yüklemiş olmayı", blank: "Government agencies would rather have ___ the security patch during peak maintenance.", blocks: ["Government agencies", "would rather have installed", "the security patch during peak maintenance."] },
  { en: "Independent experts would rather have inspected the underlying structural framework sooner.", tr: "Bağımsız uzmanlar altta yatan yapısal çerçeveyi daha önce incelemiş olmayı tercih ederlerdi.", word: "inspected", trWord: "incelemiş olmayı", blank: "Independent experts would rather have ___ the underlying structural framework sooner.", blocks: ["Independent experts", "would rather have inspected", "the underlying structural framework sooner."] },
  { en: "The laboratory researcher would rather have collected more empirical inputs initially.", tr: "Laboratuvar araştırmacısı başlangıçta daha fazla ampirik girdi toplamış olmayı tercih ederdi.", word: "collected", trWord: "toplamış olmayı", blank: "The laboratory researcher would rather have ___ more empirical inputs initially.", blocks: ["The laboratory researcher", "would rather have collected", "more empirical inputs initially."] },
  { en: "Senior financial analysts would rather have anticipated the dynamic sector breakdown.", tr: "Kıdemli finansal analistler dinamik sektör kırılımını öngörmüş olmayı tercih ederlerdi.", word: "anticipated", trWord: "öngörmüş olmayı", blank: "Senior financial analysts would rather have ___ the dynamic sector breakdown.", blocks: ["Senior financial analysts", "would rather have anticipated", "the dynamic sector breakdown."] }
];"""

unitAra1Lesson3SentencesRaw_code = """const unitAra1Lesson3SentencesRaw = [
  { en: "I would rather the technical expert took a plane to the international summit.", tr: "Teknik uzmanın uluslararası zirveye uçakla gitmesini tercih ederim.", word: "took", trWord: "gitmesini", blank: "I would rather the technical expert ___ a plane to the international summit.", blocks: ["I", "would rather the technical expert took", "a plane to the international summit."] },
  { en: "The manager would rather the junior technician didn't come to the laboratory today.", tr: "Müdür yardım teknisyenin bugün laboratuvara gelmemesini tercih eder.", word: "come", trWord: "gelmemesini", blank: "The manager would rather the junior technician didn't ___ to the laboratory today.", blocks: ["Open Question", "would rather the junior technician didn't come", "to the laboratory today."] },
  { en: "I would rather you didn't use the centralized cloud database console right now.", tr: "Şu anda merkezi bulut veritabanı konsolunu kullanmamanızı tercih ederim.", word: "use", trWord: "kullanmamanızı", blank: "I would rather you didn't ___ the centralized cloud database console right now.", blocks: ["I", "would rather you didn't use", "the centralized cloud database console right now."] },
  { en: "The director would rather the software team updated the system parameters tonight.", tr: "Direktör yazılım ekibinin sistem parametrelerini bu gece güncellemesini tercih eder.", word: "updated", trWord: "güncellemesini", blank: "The director would rather the software team ___ the system parameters tonight.", blocks: ["The director", "would rather the software team updated", "the system parameters tonight."] },
  { en: "We would rather she signed the formal bilateral commercial agreements tomorrow.", tr: "Onun resmi ikili ticari anlaşmaları yarın imzalamasını tercih ederiz.", word: "signed", trWord: "imzalamasını", blank: "We would rather she ___ the formal bilateral commercial agreements tomorrow.", blocks: ["We", "would rather she signed", "the formal bilateral commercial agreements tomorrow."] },
  { en: "The ministry would rather the specialized committee worked in a public institution.", tr: "Bakanlık uzman komitenin kamu kurumunda çalışmasını tercih eder.", word: "worked", trWord: "çalışmasını", blank: "The ministry would rather the specialized committee ___ in a public institution.", blocks: ["The ministry", "would rather the specialized committee worked", "in a public institution."] },
  { en: "They would rather you didn't modify substantial empirical inputs inside the office.", tr: "Ofis içinde önemli ampirik girdileri değiştirmemenizi tercih ederler.", word: "modify", trWord: "değiştirmemenizi", blank: "They would rather you didn't ___ substantial empirical inputs inside the office.", blocks: ["They", "would rather you didn't modify", "substantial empirical inputs inside the office."] },
  { en: "Annual auditors would rather the software team resolved the data anomaly.", tr: "Yıllık denetçiler yazılım ekibinin veri anomalisini çözmesini tercih ederler.", word: "resolved", trWord: "çözmesini", blank: "Annual auditors would rather the software team ___ the data anomaly.", blocks: ["Annual auditors", "would rather the software team resolved", "the data anomaly."] },
  { en: "The evaluation committee would rather the researcher published the insights.", tr: "Değerlendirme komitesi araştırmacının öngörüleri yayınlamasını tercih eder.", word: "published", trWord: "yayınlamasını", blank: "The evaluation committee would rather the researcher ___ the insights.", blocks: ["The evaluation committee", "would rather the researcher published", "the insights."] },
  { en: "Government agencies would rather the council processed the data locally.", tr: "Devlet kurumları konseyin verileri yerel olarak işlemesini tercih eder.", word: "processed", trWord: "işlemesini", blank: "Government agencies would rather the council ___ the data locally.", blocks: ["Government agencies", "would rather the council processed", "the data locally."] },
  { en: "The principal researcher would rather the assistant sterilized the test-tubes.", tr: "Baş araştırmacı asistanın deney tüplerini sterilize etmesini tercih eder.", word: "sterilized", trWord: "sterilize etmesini", blank: "The principal researcher would rather the assistant ___ the test-tubes.", blocks: ["The principal researcher", "would rather the assistant sterilized", "the test-tubes."] },
  { en: "Senior analysts would rather the team evaluated the data charts.", tr: "Kıdemli analistler ekibin veri grafiklerini değerlendirmesini tercih ederler.", word: "evaluated", trWord: "değerlendirmesini", blank: "Senior analysts would rather the team ___ the data charts.", blocks: ["Senior analysts", "would rather the team evaluated", "the data charts."] },
  { en: "I would rather the technician stayed at the modern industrial facility.", tr: "Teknisyenin modern endüstriyel tesiste kalmasını tercih ederim.", word: "stayed", trWord: "kalmasını", blank: "I would rather the technician ___ at the modern industrial facility.", blocks: ["I", "would rather the technician stayed", "at the modern industrial facility."] },
  { en: "They would rather the corporation invested its annual research budget in technology.", tr: "Şirketin yıllık araştırma bütçesini teknolojiye yatırmasını tercih ederler.", word: "invested", trWord: "yatırmasını", blank: "They would rather the corporation ___ its annual research budget in technology.", blocks: ["They", "would rather the corporation invested", "its annual research budget in technology."] },
  { en: "We would rather you checked the automated script error logs.", tr: "Otomatik kod hata günlüklerini kontrol etmenizi tercih ederiz.", word: "checked", trWord: "kontrol etmenizi", blank: "We would rather you ___ the automated script error logs.", blocks: ["We", "would rather you checked", "the automated script error logs."] }
];
// Correcting the subject block in lesson 3 sentence 2
unitAra1Lesson3SentencesRaw[1].blocks = ["The manager", "would rather the junior technician didn't come", "to the laboratory today."];"""

unitAra1Lesson4SentencesRaw_code = """const unitAra1Lesson4SentencesRaw = [
  { en: "I would rather the technical expert had taken a plane to the international summit last week.", tr: "Teknik uzmanın geçen hafta uluslararası zirveye uçakla gitmiş olmasını tercih ederdim.", word: "taken", trWord: "gitmiş olmasını", blank: "I would rather the technical expert had ___ a plane to the international summit last week.", blocks: ["I", "would rather the technical expert had taken", "a plane to the international summit last week."] },
  { en: "The manager would rather the junior technician had not come to the laboratory yesterday.", tr: "Müdür yardım teknisyenin dün laboratuvara gelmemiş olmasını tercih ederdi.", word: "come", trWord: "gelmemiş olmasını", blank: "The manager would rather the junior technician had not ___ to the laboratory yesterday.", blocks: ["The manager", "would rather the junior technician had not come", "to the laboratory yesterday."] },
  { en: "I would rather you had not used the centralized cloud database console during the presentation.", tr: "Sunum sırasında merkezi bulut veritabanı konsolunu kullanmamış olmanızı tercih ederdim.", word: "used", trWord: "kullanmamış olmanızı", blank: "I would rather you had not ___ the centralized cloud database console during the presentation.", blocks: ["I", "would rather you had not used", "the centralized cloud database console during the presentation."] },
  { en: "The director would rather the software team had updated the system parameters before the test.", tr: "Direktör yazılım ekibinin testten önce sistem parametrelerini güncellemiş olmasını tercih ederdi.", word: "updated", trWord: "güncellemiş olmasını", blank: "The director would rather the software team had ___ the system parameters before the test.", blocks: ["Open Question", "would rather the software team had updated", "the system parameters before the test."] },
  { en: "We would rather she had signed the formal bilateral commercial agreements during the summit.", tr: "Onun zirve sırasında resmi ikili ticari anlaşmaları imzalamış olmasını tercih ederdik.", word: "signed", trWord: "imzalamış olmasını", blank: "We would rather she had ___ the formal bilateral commercial agreements during the summit.", blocks: ["We", "would rather she had signed", "the formal bilateral commercial agreements during the summit."] },
  { en: "The ministry would rather the specialized committee had worked in a public institution last year.", tr: "Bakanlık uzman komitenin geçen yıl kamu kurumunda çalışmış olmasını tercih ederdi.", word: "worked", trWord: "çalışmış olmasını", blank: "The ministry would rather the specialized committee had ___ in a public institution last year.", blocks: ["Open Question", "would rather the specialized committee had worked", "in a public institution last year."] },
  { en: "They would rather you had not modified substantial empirical inputs inside the office yesterday.", tr: "Dün ofis içinde önemli ampirik girdileri değiştirmemiş olmanızı tercih ederlerdi.", word: "modified", trWord: "değiştirmemiş olmanızı", blank: "They would rather you had not ___ substantial empirical inputs inside the office yesterday.", blocks: ["They", "would rather you had not modified", "substantial empirical inputs inside the office yesterday."] },
  { en: "Annual auditors would rather the software team had resolved the data anomaly sooner.", tr: "Yıllık denetçiler yazılım ekibinin veri anomalisini daha önce çözmüş olmasını tercih ederlerdi.", word: "resolved", trWord: "çözmüş olmasını", blank: "Annual auditors would rather the software team had ___ the data anomaly sooner.", blocks: ["Annual auditors", "would rather the software team had resolved", "the data anomaly sooner."] },
  { en: "The evaluation committee would rather the researcher had published the insights last month.", tr: "Değerlendirme komitesi araştırmacının öngörüleri geçen ay yayınlamış olmasını tercih ederdi.", word: "published", trWord: "yayınlamış olmasını", blank: "The evaluation committee would rather the researcher had ___ the insights last month.", blocks: ["The evaluation committee", "would rather the researcher had published", "the insights last month."] },
  { en: "Government agencies would rather the council had processed the data locally to protect privacy.", tr: "Devlet kurumları konseyin gizliliği korumak için verileri yerel olarak işlemiş olmasını tercih ederdi.", word: "processed", trWord: "işlemiş olmasını", blank: "Government agencies would rather the council had ___ the data locally to protect privacy.", blocks: ["Government agencies", "would rather the council had processed", "data locally to protect privacy."] },
  { en: "The principal researcher would rather the assistant had sterilized the test-tubes before use.", tr: "Baş araştırmacı asistanın kullanmadan önce deney tüplerini sterilize etmiş olmasını tercih ederdi.", word: "sterilized", trWord: "sterilize etmiş olmasını", blank: "The principal researcher would rather the assistant had ___ the test-tubes before use.", blocks: ["The principal researcher", "would rather the assistant had sterilized", "the test-tubes before use."] },
  { en: "Senior analysts would rather the team had evaluated the data charts before the presentation.", tr: "Kıdemli analistler ekibin sunumdan önce veri grafiklerini değerlendirmiş olmasını tercih ederlerdi.", word: "evaluated", trWord: "değerlendirmiş olmasını", blank: "Senior analysts would rather the team had ___ the data charts before the presentation.", blocks: ["Senior analysts", "would rather the team had evaluated", "the data charts before the presentation."] },
  { en: "I would rather the technician had stayed at the modern industrial facility last night.", tr: "Teknisyenin dün gece modern endüstriyel tesiste kalmış olmasını tercih ederdim.", word: "stayed", trWord: "kalmış olmasını", blank: "I would rather the technician had ___ at the modern industrial facility last night.", blocks: ["I", "would rather the technician had stayed", "at the modern industrial facility last night."] },
  { en: "They would rather the corporation had invested its annual research budget in technology.", tr: "Şirketin yıllık araştırma bütçesini teknolojiye yatırmış olmasını tercih ederlerdi.", word: "invested", trWord: "yatırmış olmasını", blank: "They would rather the corporation had ___ its annual research budget in technology.", blocks: ["They", "would rather the corporation had invested", "its annual research budget in technology."] },
  { en: "We would rather you had checked the automated script error logs immediately.", tr: "Otomatik kod hata günlüklerini derhal kontrol etmiş olmanızı tercih ederdik.", word: "checked", trWord: "kontrol etmiş olmanızı", blank: "We would rather you had ___ the automated script error logs immediately.", blocks: ["We", "would rather you had checked", "the automated script error logs immediately."] }
];
// Correcting the subject blocks in lesson 4
unitAra1Lesson4SentencesRaw[3].blocks = ["The director", "would rather the software team had updated", "the system parameters before the test."];
unitAra1Lesson4SentencesRaw[5].blocks = ["The ministry", "would rather the specialized committee had worked", "in a public institution last year."];"""

def run_update():
    # 1. Update app.js
    with open("app.js", "r", encoding="utf-8") as f:
        app_js = f.read()

    # Normalize newlines
    app_js = app_js.replace("\r\n", "\n")

    # Add wordDictionary entries
    dict_match = re.search(r"const wordDictionary = \{(.*?)\};", app_js, re.DOTALL)
    if dict_match:
        old_dict_body = dict_match.group(1)
        new_dict_entries = []
        for w, tr in new_translations.items():
            if f'"{w}"' not in old_dict_body and f"'{w}'" not in old_dict_body:
                new_dict_entries.append(f'  "{w}": "{tr}",')
        
        if new_dict_entries:
            updated_dict_body = "\n" + "\n".join(new_dict_entries) + old_dict_body
            app_js = app_js.replace(old_dict_body, updated_dict_body)
            print("Injected new translations into wordDictionary.")

    # Let's perform line-by-line replacements in app.js
    lines = app_js.splitlines()
    new_lines = []
    
    # Flags or states
    for line in lines:
        # Shift illustrations dynamically
        illustration_match = re.match(r'^(\s*)\} else if \(unitId === (\d+)\) \{', line)
        if illustration_match:
            spacing = illustration_match.group(1)
            uid = int(illustration_match.group(2))
            if uid >= 13:
                line = f"{spacing}}} else if (unitId === {uid+1}) {{"
        
        # Shift variety check
        if "lessonIndex === 2 && (unitId === 1 || unitId === 6 || unitId === 9 || unitId === 18)" in line:
            line = line.replace("unitId === 18", "unitId === 19")
            
        # Shift notUploadedUnits Sets
        if "new Set([19, 20, 21, 22, 23, 24, 25])" in line:
            line = line.replace("new Set([19, 20, 21, 22, 23, 24, 25])", "new Set([20, 21, 22, 23, 24, 25, 26])")

        new_lines.append(line)

    # Re-insert the specific unit 13 mapping into the illustration map
    # We find where '} else if (unitId === 14) {' is and insert unit 13 before it.
    final_app_lines = []
    inserted_mapping = False
    for line in new_lines:
        if not inserted_mapping and "} else if (unitId === 14) {" in line:
            # Get leading spacing
            indent = len(line) - len(line.lstrip())
            spacing = " " * indent
            final_app_lines.append(f"{spacing}}} else if (unitId === 13) {{")
            final_app_lines.append(f"{spacing}  category = 'blocks';")
            inserted_mapping = True
        final_app_lines.append(line)

    app_js = "\n".join(final_app_lines)
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(app_js)
    print("app.js updated successfully.")

    # 2. Update data.js
    with open("data.js", "r", encoding="utf-8") as f:
        data_js = f.read()

    data_js = data_js.replace("\r\n", "\n")

    # Place raw list code right before const unit12LessonSentences
    raw_lists_all = f"\n\n{unitAra1Lesson1SentencesRaw_code}\n\n{unitAra1Lesson2SentencesRaw_code}\n\n{unitAra1Lesson3SentencesRaw_code}\n\n{unitAra1Lesson4SentencesRaw_code}\n\n"
    
    if "const unit12LessonSentences" in data_js:
        data_js = data_js.replace("const unit12LessonSentences", raw_lists_all + "const unit12LessonSentences")
        print("Injected raw sentence arrays in data.js.")

    # Insert Ara Bölüm 1 in rawTopics
    topic12_end = """      "C. İsim + past participle + edat takımı (Sayfa 90)"
    ]
  },
  {
    title: "XIII. Mastar (Infinitive) (Sayfa 95)","""

    topic12_end_new = """      "C. İsim + past participle + edat takımı (Sayfa 90)"
    ]
  },
  {
    title: "Ara Bölüm 1: Tercih Bildiren Yapılar (Would rather)",
    desc: "Tercih bildiren (would rather) farklı zaman ve özne yapıları",
    icon: "⚖️",
    numLessons: 4,
    formulas: [
      { formula: "Subject + would rather + V1 (Present)", example: "I would rather live in Bodrum: Bodrum'da yaşamayı tercih ederim.", description: "Kişinin kendisi için şimdiki veya geniş zamandaki tercihlerini belirtirken 'would rather' yapısından sonra fiilin yalın hali (V1) kullanılır." },
      { formula: "Subject + would rather + have + V3 (Past)", example: "I would rather have travelled by train: Trenle seyahat etmiş olmayı tercih ederdim.", description: "Geçmişte yapılmış olması arzu edilen ama gerçekleşmeyen durumlar için 'would rather have + V3' yapısı kullanılır." },
      { formula: "Subject1 + would rather + Subject2 + V2 (Present)", example: "I would rather you didn't use this: Bunu kullanmamanızı tercih ederim.", description: "Başka birinin bir eylemi yapmasının veya yapmamasının istenmesi durumunda şimdiki/geniş zaman için yan cümlede V2 (Past Simple) kullanılır." },
      { formula: "Subject1 + would rather + Subject2 + had + V3 (Past)", example: "I would rather you had checked the logs: Günlükleri kontrol etmiş olmanızı tercih ederdik.", description: "Başka birinin geçmişte yapmış olması arzu edilen eylemler için yan cümlede Past Perfect (had + V3) yapısı kullanılır." }
    ],
    subtitles: [
      "A. Tercih Bildiren Yapılar — Present (Would rather + V1) (Sayfa 93)",
      "B. Tercih Bildiren Yapılar — Past (Would rather + have + V3) (Sayfa 93)",
      "C. Diğer Kişilerin Tercihleri — Present (Would rather + subject + V2) (Sayfa 94)",
      "D. Diğer Kişilerin Tercihleri — Past (Would rather + subject + had + V3) (Sayfa 94)"
    ]
  },
  {
    title: "XIII. Mastar (Infinitive) (Sayfa 95)","""

    if topic12_end in data_js:
        data_js = data_js.replace(topic12_end, topic12_end_new)
        print("Inserted Ara Bölüm 1 in rawTopics.")

    # Parse and shift unitSentencesMap
    map_start = data_js.find("const unitSentencesMap = {")
    map_end = data_js.find("};", map_start)
    map_body = data_js[map_start:map_end+2]
    
    # Process lines of the map body
    lines_map = map_body.splitlines()
    new_lines_map = []
    for line in lines_map:
        # Match keys:
        k_match = re.match(r'^(\s*)(\d+):(\s*)\{', line)
        if k_match:
            key_num = int(k_match.group(2))
            if key_num >= 13:
                line = f"{k_match.group(1)}{key_num+1}:{k_match.group(3)}{{"
                
        # Match function calls inside map body and shift unitId (index 13+) and lessonId:
        # For example, `buildCustom10QuestionExercises(unit13LessonSentences[1], 13, 41, 1, 0)`
        # Regular expression to extract uid and lid:
        call_match = re.search(r'(\w+)\(([^,]+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)', line)
        if call_match:
            name = call_match.group(1)
            sents = call_match.group(2)
            uid = int(call_match.group(3))
            lid = int(call_match.group(4))
            exid = call_match.group(5)
            offset = call_match.group(6)
            if uid >= 13:
                old_call = f"{name}({sents}, {uid}, {lid}, {exid}, {offset})"
                new_call = f"{name}({sents}, {uid+1}, {lid+4}, {exid}, {offset})"
                line = line.replace(old_call, new_call)
                
        new_lines_map.append(line)
        
    # Inject Ara Bölüm 1 at key 13
    final_map_lines = []
    inserted_map_block = False
    
    insertion_block_lines = [
        "  13: {",
        "    1: { exercises: [",
        "      buildCustom10QuestionExercises(unitAra1Lesson1SentencesRaw, 13, 41, 1, 0),",
        "      buildCustom10QuestionExercises(unitAra1Lesson1SentencesRaw, 13, 41, 2, 10),",
        "      buildCustom10QuestionExercises(unitAra1Lesson1SentencesRaw, 13, 41, 3, 5)",
        "    ] },",
        "    2: { exercises: [",
        "      buildCustom10QuestionExercises(unitAra1Lesson2SentencesRaw, 13, 42, 1, 0),",
        "      buildCustom10QuestionExercises(unitAra1Lesson2SentencesRaw, 13, 42, 2, 10),",
        "      buildCustom10QuestionExercises(unitAra1Lesson2SentencesRaw, 13, 42, 3, 5)",
        "    ] },",
        "    3: { exercises: [",
        "      buildCustom10QuestionExercises(unitAra1Lesson3SentencesRaw, 13, 43, 1, 0),",
        "      buildCustom10QuestionExercises(unitAra1Lesson3SentencesRaw, 13, 43, 2, 10),",
        "      buildCustom10QuestionExercises(unitAra1Lesson3SentencesRaw, 13, 43, 3, 5)",
        "    ] },",
        "    4: { exercises: [",
        "      buildCustom10QuestionExercises(unitAra1Lesson4SentencesRaw, 13, 44, 1, 0),",
        "      buildCustom10QuestionExercises(unitAra1Lesson4SentencesRaw, 13, 44, 2, 10),",
        "      buildCustom10QuestionExercises(unitAra1Lesson4SentencesRaw, 13, 44, 3, 5)",
        "    ] }",
        "  },"
    ]
    
    for l in new_lines_map:
        if not inserted_map_block and re.match(r'^\s*14:\s*\{', l):
            final_map_lines.extend(insertion_block_lines)
            inserted_map_block = True
        final_map_lines.append(l)
        
    new_map_body = "\n".join(final_map_lines)
    if inserted_map_block:
        print("Injected Ara Bölüm 1 (unit 13) into unitSentencesMap.")
    else:
        print("WARNING: Could not find key 14 to insert key 13.")
        
    data_js = data_js.replace(map_body, new_map_body)
    
    with open("data.js", "w", encoding="utf-8") as f:
        f.write(data_js)
    print("data.js updated successfully.")

if __name__ == "__main__":
    run_update()
