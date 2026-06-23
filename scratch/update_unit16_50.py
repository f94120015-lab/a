import os

# Define the 50 sentences for Unit 16
unit16_data = [
    {"en": "Analyzing the raw data requires a strict methodology.", "tr": "Ham verileri analiz etmek katı bir metodoloji gerektirir.", "word": "Analyzing", "trWord": "analiz etmek", "blank": "___ the raw data requires a strict methodology."},
    {"en": "Modifying the legislative framework causes temporary instability.", "tr": "Yasal çerçeveyi değiştirmek geçici istikrarsızlığa neden olur.", "word": "Modifying", "trWord": "değiştirmek", "blank": "___ the legislative framework causes temporary instability."},
    {"en": "Evaluating the academic curriculum takes a long time.", "tr": "Akademik müfredatı değerlendirmek uzun zaman alır.", "word": "Evaluating", "trWord": "değerlendirmek", "blank": "___ the academic curriculum takes a long time."},
    {"en": "Structuring the financial resources is a complex process.", "tr": "Finansal kaynakları yapılandırmak karmaşık bir süreçtir.", "word": "Structuring", "trWord": "yapılandırmak", "blank": "___ the financial resources is a complex process."},
    {"en": "Integrating the individual applications generates technical errors.", "tr": "Bireysel uygulamaları entegre etmek teknik hatalar üretir.", "word": "Integrating", "trWord": "entegre etmek", "blank": "___ the individual applications generates technical errors."},
    {"en": "Restricting the resource distribution alters the economic outcome.", "tr": "Kaynak dağıtımını kısıtlamak ekonomik sonucu değiştirir.", "word": "Restricting", "trWord": "kısıtlamak", "blank": "___ the resource distribution alters the economic outcome."},
    {"en": "Establishing a stable administration provides significant benefits.", "tr": "İstikrarlı bir yönetim kurmak önemli faydalar sağlar.", "word": "Establishing", "trWord": "kurmak", "blank": "___ a stable administration provides significant benefits."},
    {"en": "Extracting the primary components from the compound is difficult.", "tr": "Bileşikten birincil bileşenleri çıkarmak zordur.", "word": "Extracting", "trWord": "çıkarmak", "blank": "___ the primary components from the compound is difficult."},
    {"en": "Troubleshooting the Flutter interface demands specific expert analysts.", "tr": "Flutter arayüzündeki sorunları gidermek özel uzman analistler gerektirir.", "word": "Troubleshooting", "trWord": "sorunları gidermek", "blank": "___ the Flutter interface demands specific expert analysts."},
    {"en": "Validating the legal contract through the regulatory process is essential.", "tr": "Düzenleyici süreç yoluyla yasal sözleşmeyi doğrulamak esastır.", "word": "Validating", "trWord": "doğrulamak", "blank": "___ the legal contract through the regulatory process is essential."},
    {"en": "Defining the specific criteria helps the committee exclude irrelevant data.", "tr": "Belirli kriterleri tanımlamak, komitenin ilgisiz verileri hariç tutmasına yardımcı olur.", "word": "Defining", "trWord": "tanımlamak", "blank": "___ the specific criteria helps the committee exclude irrelevant data."},
    {"en": "Publishing the official summary in a peer-reviewed journal increases institutional prestige.", "tr": "Resmi özeti hakemli bir dergide yayınlamak kurumsal prestiji artırır.", "word": "Publishing", "trWord": "yayınlamak", "blank": "___ the official summary in a peer-reviewed journal increases institutional prestige."},
    {"en": "Assessing the constitutional amendment involves intense parliamentary debates.", "tr": "Anayasa değişikliğini değerlendirmek yoğun parlamento tartışmalarını içerir.", "word": "Assessing", "trWord": "değerlendirmek", "blank": "___ the constitutional amendment involves intense parliamentary debates."},
    {"en": "Monitoring the local conditions allows the team to predict regional stability.", "tr": "Yerel koşulları izlemek, ekibin bölgesel istikrarı tahmin etmesini sağlar.", "word": "Monitoring", "trWord": "izlemek", "blank": "___ the local conditions allows the team to predict regional stability."},
    {"en": "Generating the JSON structure automatically minimizes coding errors.", "tr": "JSON yapısını otomatik olarak oluşturmak kodlama hatalarını en aza indirir.", "word": "Generating", "trWord": "oluşturmak", "blank": "___ the JSON structure automatically minimizes coding errors."},
    {"en": "Altering the statistical analysis without explicit justification invalidates the research.", "tr": "Açık bir gerekçe olmadan istatistiksel analizi değiştirmek araştırmayı geçersiz kılar.", "word": "Altering", "trWord": "değiştirmek", "blank": "___ the statistical analysis without explicit justification invalidates the research."},
    {"en": "Processing the scanned text requires specialized OCR software.", "tr": "Taranmış metni işlemek özel OCR yazılımı gerektirir.", "word": "Processing", "trWord": "işlemek", "blank": "___ the scanned text requires specialized OCR software."},
    {"en": "Tracking the match schedules is integrated into the dynamic mobile app.", "tr": "Maç programlarını takip etmek dinamik mobil uygulamaya entegre edilmiştir.", "word": "Tracking", "trWord": "takip etmek", "blank": "___ the match schedules is integrated into the dynamic mobile app."},
    {"en": "Regulating the battery temperature is critical for solar inverter efficiency.", "tr": "Batarya sıcaklığını düzenlemek güneş enerjisi invertör verimliliği için kritik öneme sahiptir.", "word": "Regulating", "trWord": "düzenlemek", "blank": "___ the battery temperature is critical for solar inverter efficiency."},
    {"en": "Redesigning the professional CV into a corporate format improves career prospects.", "tr": "Profesyonel özgeçmişi kurumsal bir formatta yeniden tasarlamak kariyer beklentilerini artırır.", "word": "Redesigning", "trWord": "yeniden tasarlamak", "blank": "___ the professional CV into a corporate format improves career prospects."},
    {"en": "Converting the separate pages into a single PDF document simplifies the archive process.", "tr": "Ayrı sayfaları tek bir PDF belgesine dönüştürmek arşiv sürecini basitleştirir.", "word": "Converting", "trWord": "dönüştürmek", "blank": "___ the separate pages into a single PDF document simplifies the archive process."},
    {"en": "Adjusting the dynamic parameters stabilizes the laboratory experiment.", "tr": "Dinamik parametreleri ayarlamak laboratuvar deneyini istikrarlı hale getirir.", "word": "Adjusting", "trWord": "ayarlamak", "blank": "___ the dynamic parameters stabilizes the laboratory experiment."},
    {"en": "Enforcing the strict legislation reduces non-compliant administrative procedures.", "tr": "Sıkı mevzuatı uygulamak, uyumlu olmayan idari prosedürleri azaltır.", "word": "Enforcing", "trWord": "uygulamak", "blank": "___ the strict legislation reduces non-compliant administrative procedures."},
    {"en": "Maintaining the structural framework requires substantial annual funding.", "tr": "Yapısal çerçeveyi sürdürmek önemli miktarda yıllık finansman gerektirir.", "word": "Maintaining", "trWord": "sürdürmek", "blank": "___ the structural framework requires substantial annual funding."},
    {"en": "Challenging the traditional methodology offers a unique alternative perspective.", "tr": "Geleneksel metodolojiye meydan okumak benzersiz alternatif bir bakış açısı sunar.", "word": "Challenging", "trWord": "meydan okumak", "blank": "___ the traditional methodology offers a unique alternative perspective."},
    {"en": "Identifying the target goals provides clarity for the entire project team.", "tr": "Hedef amaçları belirlemek tüm proje ekibi için netlik sağlar.", "word": "Identifying", "trWord": "belirlemek", "blank": "___ the target goals provides clarity for the entire project team."},
    {"en": "Sustaining the cultural identity depends heavily on historical integration.", "tr": "Kültürel kimliği sürdürmek büyük ölçüde tarihsel entegrasyona bağlıdır.", "word": "Sustaining", "trWord": "sürdürmek", "blank": "___ the cultural identity depends heavily on historical integration."},
    {"en": "Distributing the monthly revenue is managed by the central financial department.", "tr": "Aylık gelirin dağıtılması merkezi finans departmanı tarafından yönetilir.", "word": "Distributing", "trWord": "dağıtılması", "blank": "___ the monthly revenue is managed by the central financial department."},
    {"en": "Excluding the temporary variables produces more consistent statistical outcomes.", "tr": "Geçici değişkenleri hariç tutmak daha tutarlı istatistiksel sonuçlar üretir.", "word": "Excluding", "trWord": "hariç tutmak", "blank": "___ the temporary variables produces more consistent statistical outcomes."},
    {"en": "Deriving the core concepts from empirical evidence supports the initial assumption.", "tr": "Ampirik kanıtlardan temel kavramları türetmek başlangıçtaki varsayımı destekler.", "word": "Deriving", "trWord": "türetmek", "blank": "___ the core concepts from empirical evidence supports the initial assumption."},
    {"en": "Adopting the progressive model transforms the university assessment system.", "tr": "Aşamalı modeli benimsemek üniversite değerlendirme sistemini dönüştürür.", "word": "Adopting", "trWord": "benimsemek", "blank": "___ the progressive model transforms the university assessment system."},
    {"en": "Conducting the primary experiment demands a completely sterile laboratory environment.", "tr": "Temel deneyi yürütmek tamamen steril bir laboratuvar ortamı gerektirir.", "word": "Conducting", "trWord": "yürütmek", "blank": "___ the primary experiment demands a completely sterile laboratory environment."},
    {"en": "Interpreting the ancient text requires an advanced knowledge of cultural contexts.", "tr": "Antik metni yorumlamak ileri düzeyde kültürel bağlam bilgisi gerektirir.", "word": "Interpreting", "trWord": "yorumlamak", "blank": "___ the ancient text requires an advanced knowledge of cultural contexts."},
    {"en": "Exporting the domestic production to global markets boosts the regional economy.", "tr": "Yerli üretimi küresel pazarlara ihraç etmek bölgesel ekonomiyi canlandırır.", "word": "Exporting", "trWord": "ihraç etmek", "blank": "___ the domestic production to global markets boosts the regional economy."},
    {"en": "Allocating the annual credit across separate departments eliminates resource conflicts.", "tr": "Yıllık krediyi ayrı departmanlara tahsis etmek kaynak çatışmalarını ortadan kaldırır.", "word": "Allocating", "trWord": "tahsis etmek", "blank": "___ the annual credit across separate departments eliminates resource conflicts."},
    {"en": "Abolishing the old framework clarifies the modern administrative policy.", "tr": "Eski çerçeveyi yürürlükten kaldırmak modern idari politikayı netleştirir.", "word": "Abolishing", "trWord": "kaldırmak", "blank": "___ the old framework clarifies the modern administrative policy."},
    {"en": "Absorbing the toxic liquid alters the internal cell components.", "tr": "Toksik sıvıyı emmek hücre içi bileşenleri değiştirir.", "word": "Absorbing", "trWord": "emmek", "blank": "___ the toxic liquid alters the internal cell components."},
    {"en": "Summarizing the disciplinary defense into a short brief saves time for the board.", "tr": "Disiplin savunmasını kısa bir özet halinde sunmak kurul için zaman kazandırır.", "word": "Summarizing", "trWord": "kısa bir özet halinde sunmak", "blank": "___ the disciplinary defense into a short brief saves time for the board."},
    {"en": "Utilizing the mobile interface improves user interaction significantly.", "tr": "Mobil arayüzü kullanmak kullanıcı etkileşimini önemli ölçüde artırır.", "word": "Utilizing", "trWord": "kullanmak", "blank": "___ the mobile interface improves user interaction significantly."},
    {"en": "Reshaping the corporate structure creates a more adaptable business model.", "tr": "Kurumsal yapıyı yeniden şekillendirmek daha uyumlu bir iş modeli yaratır.", "word": "Reshaping", "trWord": "yeniden şekillendirmek", "blank": "___ the corporate structure creates a more adaptable business model."},
    {"en": "Encountering technical errors during token usage stops the software processing.", "tr": "Belirteç kullanımı sırasında teknik hatalarla karşılaşmak yazılım işlemini durdurur.", "word": "Encountering", "trWord": "karşılaşmak", "blank": "___ technical errors during token usage stops the software processing."},
    {"en": "Expanding the original text adds relevant demographic data to the study.", "tr": "Orijinal metni genişletmek çalışmaya ilgili demografik verileri ekler.", "word": "Expanding", "trWord": "genişletmek", "blank": "___ the original text adds relevant demographic data to the study."},
    {"en": "Dominating the economic sector allows large institutions to control pricing.", "tr": "Ekonomik sektöre hakim olmak büyük kurumlara fiyatlandırmayı kontrol etme olanağı verir.", "word": "Dominating", "trWord": "hakim olmak", "blank": "___ the economic sector allows large institutions to control pricing."},
    {"en": "Reviewing the legal document prevents potential administrative complications.", "tr": "Yasal belgeyi incelemek olası idari karmaşıklıkları önler.", "word": "Reviewing", "trWord": "incelemek", "blank": "___ the legal document prevents potential administrative complications."},
    {"en": "Predicting the long-term percentages remains difficult due to fluctuating variables.", "tr": "Dalgalanan değişkenler nedeniyle uzun vadeli yüzdeleri tahmin etmek zor olmaya devam ediyor.", "word": "Predicting", "trWord": "tahmin etmek", "blank": "___ the long-term percentages remains difficult due to fluctuating variables."},
    {"en": "Isolating the unique parameters ensures accurate results across all trials.", "tr": "Benzersiz parametreleri izole etmek tüm denemelerde doğru sonuçlar alınmasını sağlar.", "word": "Isolating", "trWord": "izole etmek", "blank": "___ the unique parameters ensures accurate results across all trials."},
    {"en": "Updating the database code resolves the dynamic synchronization issues.", "tr": "Veritabanı kodunu güncellemek dinamik senkronizasyon sorunlarını çözer.", "word": "Updating", "trWord": "güncellemek", "blank": "___ the database code resolves the dynamic synchronization issues."},
    {"en": "Forming the consistent layers at the base prevents chemical degradation.", "tr": "Tabanda tutarlı tabakalar oluşturmak kimyasal bozulmayı önler.", "word": "Forming", "trWord": "oluşturmak", "blank": "___ the consistent layers at the base prevents chemical degradation."},
    {"en": "Accumulating the empirical evidence takes years of comprehensive research.", "tr": "Ampirik kanıt toplamak yıllarca kapsamlı araştırma gerektirir.", "word": "Accumulating", "trWord": "toplamak", "blank": "___ the empirical evidence takes years of comprehensive research."},
    {"en": "Shifting the visual elements improves user experience during the transition phase.", "tr": "Görsel öğeleri kaydırmak geçiş aşamasında kullanıcı deneyimini iyileştirir.", "word": "Shifting", "trWord": "kaydırmak", "blank": "___ the visual elements improves user experience during the transition phase."}
]

vocab_updates = {
    "abolishing": "yürürlükten kaldırma / kaldırma",
    "absorbing": "emme / emici",
    "academic": "akademik",
    "accumulating": "biriken / birikme",
    "across": "karşıdan karşıya / genelinde",
    "adaptable": "uyarlanabilir / uyumlu",
    "adds": "ekler",
    "adjusting": "ayarlama / ayarlayan",
    "administrative": "idari",
    "adopting": "benimseme / benimseyen",
    "allocating": "tahsis etme / tahsis eden",
    "allows": "sağlar / izin verir",
    "altering": "değiştirme / değiştiren",
    "alters": "değiştirir",
    "amendment": "değişiklik / yasa değişikliği",
    "analyzing": "analiz etme / analiz eden",
    "ancient": "antik / eski",
    "annual": "yıllık",
    "app": "uygulama",
    "applications": "uygulamalar",
    "archive": "arşiv",
    "assessing": "değerlendirme / değerlendiren",
    "assumption": "varsayım",
    "boosts": "canlandırır / artırır",
    "brief": "özet",
    "central": "merkezi",
    "clarifies": "netleştirir / açıklar",
    "clarity": "netlik / açıklık",
    "coding": "kodlama",
    "completely": "tamamen",
    "complications": "karmaşıklıklar / komplikasyonlar",
    "conducting": "yürüten / yürütme",
    "conflicts": "çatışmalar",
    "contexts": "bağlamlar",
    "converting": "dönüştürme / dönüştüren",
    "corporate": "kurumsal",
    "creates": "yaratır / oluşturur",
    "credit": "kredi",
    "critical": "kritik / son derece önemli",
    "curriculum": "müfredat",
    "cv": "özgeçmiş / CV",
    "debates": "tartışmalar",
    "defense": "savunma",
    "degradation": "bozulma / bozunma",
    "demographic": "demografik",
    "departments": "departmanlar / bölümler",
    "depends": "bağlıdır",
    "deriving": "türetme / türeten",
    "disciplinary": "disiplin / disiplinsel",
    "distributing": "dağıtma / dağıtan",
    "domestic": "yerli / evcil",
    "due": "-den dolayı / bağlı",
    "efficiency": "verimlilik",
    "eliminates": "ortadan kaldırır / eler",
    "encountering": "karşılaşma / karşılaşan",
    "enforcing": "uygulama / uygulayan",
    "ensures": "sağlar / garanti eder",
    "entire": "tüm / bütün",
    "errors": "hatalar",
    "essential": "esas / gerekli / temel",
    "evaluating": "değerlendirme / değerlendiren",
    "exclude": "hariç tutmak",
    "excluding": "hariç tutma / hariç tutan",
    "explicit": "açık / net",
    "exporting": "ihraç etme / ihraç eden",
    "extracting": "çıkarma / çıkaran",
    "flutter": "Flutter (mobil uygulama iskeleti)",
    "format": "format / biçim",
    "forming": "oluşturma / oluşturan",
    "generates": "üretir / oluşturur",
    "generating": "oluşturma / oluşturan",
    "goals": "hedefler / amaçlar",
    "helps": "yardımcı olur",
    "historical": "tarihsel / tarihi",
    "identifying": "belirleme / belirleyen",
    "improves": "iyileştirir / geliştirir",
    "increases": "artırır",
    "initial": "başlangıç / ilk",
    "instability": "istikrarsızlık",
    "institutional": "kurumsal",
    "institutions": "kurumlar",
    "integrating": "entegre etme / birleştiren",
    "intense": "yoğun",
    "interface": "arayüz",
    "interpreting": "yorumlama / yorumlayan",
    "invalidates": "geçersiz kılar",
    "inverter": "invertör / çevirici",
    "involves": "içerir / gerektirir",
    "irrelevant": "ilgisiz / alakasız",
    "issues": "sorunlar / meseleler",
    "json": "JSON (veri formatı)",
    "justification": "gerekçe / haklı çıkarma",
    "knowledge": "bilgi / birikim",
    "layers": "tabakalar / katmanlar",
    "legal": "yasal",
    "legislative": "yasal / yasama",
    "local": "yerel",
    "long-term": "uzun vadeli",
    "markets": "pazarlar / piyasalar",
    "match": "maç / eşleşme",
    "methodology": "metodoloji / yöntem bilim",
    "minimizes": "en aza indirir / minimize eder",
    "mobile": "mobil",
    "model": "model",
    "modifying": "değiştirme / değiştiren",
    "monitoring": "izleme / izleyen",
    "monthly": "aylık",
    "non-compliant": "uyumsuz / kurallara uymayan",
    "ocr": "OCR (optik karakter tanıma)",
    "offers": "sunar",
    "original": "orijinal / özgün",
    "outcomes": "sonuçlar",
    "pages": "sayfalar",
    "parliamentary": "parlamento / parlamenter",
    "pdf": "PDF (belge formatı)",
    "peer-reviewed": "hakemli",
    "percentages": "yüzdeler",
    "perspective": "bakış açısı / perspektif",
    "potential": "potansiyel",
    "predict": "tahmin etmek",
    "predicting": "tahmin etme / tahmin eden",
    "prestige": "prestij",
    "prevents": "önler",
    "pricing": "fiyatlandırma",
    "procedures": "prosedürler",
    "processing": "işleme / işleyen",
    "progressive": "aşamalı / ilerici",
    "prospects": "beklentiler / olasılıklar",
    "publishing": "yayınlama / yayınlayan",
    "redesigning": "yeniden tasarlama / yeniden tasarlayan",
    "reduces": "azaltır",
    "regional": "bölgesel",
    "regulating": "düzenleme / düzenleyen",
    "regulatory": "düzenleyici",
    "relevant": "ilgili / ilişkili",
    "remains": "kalır / olmaya devam eder",
    "reshaping": "yeniden şekillendirme / yeniden şekillendiren",
    "resolves": "çözer / giderir",
    "restricting": "kısıtlama / kısıtlayan",
    "reviewing": "inceleme / inceleyen",
    "saves": "kazandırır / kurtarır",
    "scanned": "taranmış",
    "schedules": "programlar / takvimler",
    "separate": "ayrı / bağımsız",
    "shifting": "kaydırma / değiştiren",
    "short": "kısa",
    "significantly": "önemli ölçüde",
    "simplifies": "basitleştirir",
    "single": "tek / tek bir",
    "solar": "güneş / solar",
    "specialized": "özelleşmiş / uzmanlaşmış",
    "stabilizes": "istikrarlı hale getirir / dengeler",
    "sterile": "steril / arındırılmış",
    "stops": "durdurur",
    "structuring": "yapılandırma / yapılandıran",
    "substantial": "önemli / büyük miktarda",
    "summarizing": "özetleme / özetleyen",
    "supports": "destekler",
    "sustaining": "sürdürme / sürdüren",
    "synchronization": "senkronizasyon",
    "target": "hedef",
    "token": "belirteç / jeton",
    "toxic": "toksik / zehirli",
    "tracking": "takip etme / izleme",
    "traditional": "geleneksel",
    "transforms": "dönüştürür",
    "trials": "denemeler / testler",
    "troubleshooting": "sorun giderme / arıza giderme",
    "unique": "benzersiz / kendine özgü",
    "university": "üniversite",
    "updating": "güncelleme / güncelleyen",
    "usage": "kullanım",
    "utilizing": "kullanma / kullanan",
    "validating": "doğrulama / doğrulayan",
    "without": "-sız / -sızın / olmadan"
}

def format_array_to_js(name, data_list):
    js_lines = [f"const {name} = {{", "  1: ["]
    for item in data_list:
        en = item["en"].replace('"', '\\"')
        tr = item["tr"].replace('"', '\\"')
        word = item["word"].replace('"', '\\"')
        trWord = item["trWord"].replace('"', '\\"')
        blank = item["blank"].replace('"', '\\"')
        js_lines.append(f'    {{ en: "{en}", tr: "{tr}", word: "{word}", trWord: "{trWord}", blank: "{blank}" }},')
    js_lines[-1] = js_lines[-1].rstrip(',') # strip comma from last line
    js_lines.append("  ]\n};")
    return "\n".join(js_lines)

new_array_js = format_array_to_js("unit16LessonSentences", unit16_data)

# Read data.js
with open("data.js", "r", encoding="utf-8") as f:
    data_content = f.read()

# Replace raw array
start_marker = "const unit16LessonSentences = {"
end_marker = "const unit17LessonSentences = {"
start_idx = data_content.find(start_marker)
end_idx = data_content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_data = data_content[:start_idx] + new_array_js + "\n\n" + data_content[end_idx:]
    print("Replaced unit16LessonSentences raw array in memory.")
else:
    print("Error: Could not find raw array markers in data.js")
    exit(1)

# Replace mapping in unitSentencesMap
new_map = """  16: {
    1: { exercises: [
      buildCustom10QuestionExercises(unit16LessonSentences[1], 16, 39, 1, 0),
      buildCustom10QuestionExercises(unit16LessonSentences[1], 16, 39, 2, 10),
      buildCustom10QuestionExercises(unit16LessonSentences[1], 16, 39, 3, 20),
      buildCustom10QuestionExercises(unit16LessonSentences[1], 16, 39, 4, 30),
      buildCustom10QuestionExercises(unit16LessonSentences[1], 16, 39, 5, 40)
    ] }
  },"""

alt_start = new_data.find("  16: {")
if alt_start != -1:
    alt_end = new_data.find("  },", alt_start)
    if alt_end != -1:
        alt_end += len("  },")
        new_data = new_data[:alt_start] + new_map + new_data[alt_end:]
        print("Replaced map for unit 16 using index.")
    else:
        print("Error: Could not find closing bracket for unit 16 map.")
        exit(1)
else:
    print("Error: Could not find map section for unit 16.")
    exit(1)

# Update rawTopics description for Unit 16
new_topic = """  {
    title: "XVI. Fiil İsmi (Gerund) + Nesnesi (Özne Olarak) (Sayfa 112)",
    desc: "Fiil isminin (gerund) cümle öznesi olarak kullanımı",
    icon: "🧠",
    numLessons: 1,
    formulas: [
      { 
        formula: "V-ing + Object (Gerund as Subject)", 
        example: "Understanding the problem is crucial: Problemi anlamak çok önemlidir",
        description: "Tercüme Kılavuzu: Bu yapı bir eylem-isim (Gerund) öbeğinin nesne alarak cümlenin öznesi olması durumudur. Cümle, fiile eklenen -ing takısı ile başlar fakat bu durum bir şimdiki zaman eylemi ('yapıyor', 'içiyor') değil, bir isim-fiildir. Çeviri yaparken önce sağdaki nesne okunur, ardından -ing takısı almış kelimeye '-ma, -me' veya '-mak, -mek' eki getirilerek özne grubu tek bir blok halinde toparlanır (Örn: Verileri analiz etmek...). Bu öbek cümlenin öznesi olduğu için, Türkçede de cümlenin en başına yerleşir."
      }
    ],
    subtitles: [
      "A. ...ing + isim (Sayfa 112)"
    ]
  },"""

alt_idx = new_data.find('title: "XVI. Fiil İsmi (Gerund) + Nesnesi (Özne Olarak)')
if alt_idx != -1:
    block_end = new_data.find("  },", alt_idx)
    if block_end != -1:
        block_end += len("  },")
        block_start = new_data.rfind("  {", 0, alt_idx)
        if block_start != -1:
            new_data = new_data[:block_start] + new_topic + new_data[block_end:]
            print("Replaced rawTopics for Unit 16 using block index.")
        else:
            print("Error: Could not find block start for Unit 16 topic.")
            exit(1)
    else:
        print("Error: Could not find block end for Unit 16 topic.")
        exit(1)
else:
    print("Error: Could not find rawTopic entry for Unit 16.")
    exit(1)

# Write data.js
with open("data.js", "w", encoding="utf-8") as f:
    f.write(new_data)
print("Saved data.js successfully.")

# Read app.js
with open("app.js", "r", encoding="utf-8") as f:
    app_content = f.read()

# Locate wordDictionary start
dict_start_marker = "const wordDictionary = {"
dict_idx = app_content.find(dict_start_marker)
if dict_idx != -1:
    insert_pos = dict_idx + len(dict_start_marker)
    vocab_lines = ["\n  // Unit 16 50 Sentences vocabulary added dynamically"]
    for en_word, tr_word in sorted(vocab_updates.items()):
        en_esc = en_word.replace('"', '\\"')
        tr_esc = tr_word.replace('"', '\\"')
        vocab_lines.append(f'  "{en_esc}": "{tr_esc}",')
    vocab_js = "\n".join(vocab_lines)
    
    new_app = app_content[:insert_pos] + vocab_js + app_content[insert_pos:]
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(new_app)
    print("Saved app.js successfully with 175 new words.")
else:
    print("Error: Could not find wordDictionary in app.js")
    exit(1)

print("Unit 16 successfully updated with 50 sentences!")
