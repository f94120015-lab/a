import re

new_translations = {
  "reallocate": "yeniden tahsis etmek",
  "legislative": "yasal, kanuni, yasama",
  "tax": "vergi",
  "reform": "reform",
  "manufacturing": "üretim, imalat",
  "biometric": "biyometrik",
  "authentication": "kimlik doğrulama, doğrulama",
  "confidential": "gizli, mahrem",
  "wonder": "merak etmek, acaba",
  "double-check": "tekrar kontrol etmek, yeniden incelemek",
  "monitor": "izlemek, gözlemlemek, ekran",
  "restructure": "yeniden yapılandırmak",
  "introduce": "tanıtmak, sunmak, getirmek",
  "fine-tune": "ince ayar yapmak",
  "fine-tuned": "ince ayarlı, ince ayar yapılmış",
  "verify": "doğrulamak, teyit etmek",
  "experimental": "deneysel",
  "metrics": "ölçümler, metrikler"
}

unitAra2Lesson1SentencesRaw_code = """const unitAra2Lesson1SentencesRaw = [
  { en: "Would you modify the parameters of the architectural framework?", tr: "Mimari çerçevenin parametrelerini değiştirir misiniz?", word: "modify", trWord: "değiştirir misiniz", blank: "Would you ___ the parameters of the architectural framework?", blocks: ["Would you modify", "the parameters", "of the architectural framework?"] },
  { en: "Could you process the newly collected empirical data?", tr: "Yeni toplanan ampirik verileri işleyebilir misiniz?", word: "process", trWord: "işleyebilir misiniz", blank: "Could you ___ the newly collected empirical data?", blocks: ["Could you process", "the newly collected", "empirical data?"] },
  { en: "Will you back up the centralized cloud database tonight?", tr: "Merkezi bulut veritabanını bu gece yedekleyecek misiniz?", word: "back up", trWord: "yedekleyecek misiniz", blank: "Will you ___ the centralized cloud database tonight?", blocks: ["Will you back up", "the centralized cloud database", "tonight?"] },
  { en: "Could you inspect the entire underlying structural framework?", tr: "Altta yatan tüm yapısal çerçeveyi denetleyebilir misiniz?", word: "inspect", trWord: "denetleyebilir misiniz", blank: "Could you ___ the entire underlying structural framework?", blocks: ["Could you inspect", "the entire underlying", "structural framework?"] },
  { en: "Would you evaluate these comprehensive regional educational surveys?", tr: "Bu kapsamlı bölgesel eğitim anketlerini değerlendirir misiniz?", word: "evaluate", trWord: "değerlendirir misiniz", blank: "Would you ___ these comprehensive regional educational surveys?", blocks: ["Would you evaluate", "these comprehensive", "regional educational surveys?"] },
  { en: "Can you define the crucial technical system parameters?", tr: "Kritik teknik sistem parametrelerini tanımlayabilir misiniz?", word: "define", trWord: "tanımlayabilir misiniz", blank: "Can you ___ the crucial technical system parameters?", blocks: ["Can you define", "the crucial technical", "system parameters?"] },
  { en: "Could you present the qualitative insights to the internal board?", tr: "Nitel öngörüleri iç yönetim kuruluna sunabilir misiniz?", word: "present", trWord: "sunabilir misiniz", blank: "Could you ___ the qualitative insights to the internal board?", blocks: ["Could you present", "the qualitative insights", "to the internal board?"] },
  { en: "Would you optimize the automated background script for the summit?", tr: "Zirve için otomatik arka plan kodunu optimize eder misiniz?", word: "optimize", trWord: "optimize eder misiniz", blank: "Would you ___ the automated background script for the summit?", blocks: ["Would you optimize", "the automated background script", "for the summit?"] },
  { en: "Will you restrict unauthorized user network access under strict policy?", tr: "Sıkı politika kapsamında yetkisiz kullanıcı ağ erişimini sınırlandıracak mısınız?", word: "restrict", trWord: "sınırlandıracak mısınız", blank: "Will you ___ unauthorized user network access under strict policy?", blocks: ["Will you restrict", "unauthorized user network access", "under strict policy?"] },
  { en: "Could you reallocate the annual research budget before the deadline?", tr: "Yıllık araştırma bütçesini son tarihten önce yeniden tahsis edebilir misiniz?", word: "reallocate", trWord: "yeniden tahsis edebilir misiniz", blank: "Could you ___ the annual research budget before the deadline?", blocks: ["Could you reallocate", "the annual research budget", "before the deadline?"] },
  { en: "Would you verify the security parameters of the database tomorrow?", tr: "Veritabanının güvenlik parametrelerini yarın doğrular mısınız?", word: "verify", trWord: "doğrular mısınız", blank: "Would you ___ the security parameters of the database tomorrow?", blocks: ["Would you verify", "the security parameters", "of the database tomorrow?"] },
  { en: "Can you resolve the technical network anomaly immediately?", tr: "Teknik ağ anomalisini derhal çözebilir misiniz?", word: "resolve", trWord: "özebilir misiniz", blank: "Can you ___ the technical network anomaly immediately?", blocks: ["Can you resolve", "the technical network anomaly", "immediately?"] },
  { en: "Could you update the system documentation regarding encryption?", tr: "Şifrelemeyle ilgili sistem dokümantasyonunu güncelleyebilir misiniz?", word: "update", trWord: "güncelleyebilir misiniz", blank: "Could you ___ the system documentation regarding encryption?", blocks: ["Could you update", "the system documentation", "regarding encryption?"] },
  { en: "Will you publish the dynamic sector breakdown next week?", tr: "Dinamik sektör kırılımını gelecek hafta yayınlayacak mısınız?", word: "publish", trWord: "yayınlayacak mısınız", blank: "Will you ___ the dynamic sector breakdown next week?", blocks: ["Will you publish", "the dynamic sector breakdown", "next week?"] },
  { en: "Would you organize the qualitative database feedback files?", tr: "Nitel veritabanı geri bildirim dosyalarını düzenler misiniz?", word: "organize", trWord: "düzenler misiniz", blank: "Would you ___ the qualitative database feedback files?", blocks: ["Would you organize", "the qualitative database feedback", "files?"] }
];"""

unitAra2Lesson2SentencesRaw_code = """const unitAra2Lesson2SentencesRaw = [
  { en: "I wonder if you could integrate these individual functional software modules.", tr: "Bu bağımsız fonksiyonel yazılım modüllerini entegre edebilir misiniz acaba?", word: "integrate", trWord: "entegre edebilir misiniz acaba", blank: "I wonder if you could ___ these individual functional software modules.", blocks: ["I wonder if you could", "integrate these individual", "functional software modules."] },
  { en: "I wonder if you could utilize advanced encryption algorithms to protect privacy.", tr: "Gizliliği korumak için gelişmiş şifreleme algoritmaları kullanabilir misiniz acaba?", word: "utilize", trWord: "kullanabilir misiniz acaba", blank: "I wonder if you could ___ advanced encryption algorithms to protect privacy.", blocks: ["I wonder if you could", "utilize advanced encryption algorithms", "to protect privacy."] },
  { en: "I wonder if you could reinforce the central concrete core of the facility.", tr: "Tesisin merkezi beton çekirdeğini güçlendirebilir misiniz acaba?", word: "reinforce", trWord: "güçlendirebilir misiniz acaba", blank: "I wonder if you could ___ the central concrete core of the facility.", blocks: ["I wonder if you could", "reinforce the central concrete core", "of the facility."] },
  { en: "I wonder if you could implement the comprehensive legislative tax reform.", tr: "Kapsamlı yasal vergi reformunu uygulayabilir misiniz acaba?", word: "implement", trWord: "uygulayabilir misiniz acaba", blank: "I wonder if you could ___ the comprehensive legislative tax reform.", blocks: ["I wonder if you could", "implement the comprehensive", "legislative tax reform."] },
  { en: "I wonder if you could derive valuable qualitative insights from the database.", tr: "Veritabanından değerli nitel öngörüler çıkarabilir misiniz acaba?", word: "derive", trWord: "çıkarabilir misiniz acaba", blank: "I wonder if you could ___ valuable qualitative insights from the database.", blocks: ["I wonder if you could", "derive valuable qualitative insights", "from the database."] },
  { en: "I wonder if you could fine-tune the automated background script dynamically.", tr: "Otomatik arka plan kodunu dinamik olarak ince ayarlayabilir misiniz acaba?", word: "fine-tune", trWord: "ince ayarlayabilir misiniz acaba", blank: "I wonder if you could ___ the automated background script dynamically.", blocks: ["I wonder if you could", "fine-tune the automated background script", "dynamically."] },
  { en: "I wonder if you could analyze the historical system logs of the server.", tr: "Sunucunun geçmiş sistem günlüklerini analiz edebilir misiniz acaba?", word: "analyze", trWord: "analiz edebilir misiniz acaba", blank: "I wonder if you could ___ the historical system logs of the server.", blocks: ["I wonder if you could", "analyze the historical system logs", "of the server."] },
  { en: "I wonder if you could clarify the investigative project scope to the team.", tr: "Araştırma projesinin kapsamını ekibe açıklayabilir misiniz acaba?", word: "clarify", trWord: "açıklayabilir misiniz acaba", blank: "I wonder if you could ___ the investigative project scope to the team.", blocks: ["I wonder if you could", "clarify the investigative project scope", "to the team."] },
  { en: "I wonder if you could organize a specialized local committee for the survey.", tr: "Anket için uzmanlaşmış yerel bir komite düzenleyebilir misiniz acaba?", word: "organize", trWord: "düzenleyebilir misiniz acaba", blank: "I wonder if you could ___ a specialized local committee for the survey.", blocks: ["I wonder if you could", "organize a specialized local committee", "for the survey."] },
  { en: "I wonder if you could calculate the complex mathematical data ratios today.", tr: "Karmaşık matematiksel veri oranlarını bugün hesaplayabilir misiniz acaba?", word: "calculate", trWord: "hesaplayabilir misiniz acaba", blank: "I wonder if you could ___ the complex mathematical data ratios today.", blocks: ["I wonder if you could", "calculate the complex mathematical", "data ratios today."] },
  { en: "I wonder if you could evaluate the experimental laboratory samples tomorrow morning.", tr: "Deneysel laboratuvar örneklerini yarın sabah değerlendirebilir misiniz acaba?", word: "evaluate", trWord: "değerlendirebilir misiniz acaba", blank: "I wonder if you could ___ the experimental laboratory samples tomorrow morning.", blocks: ["I wonder if you could", "evaluate the experimental laboratory samples", "tomorrow morning."] },
  { en: "I wonder if you could process these qualitative survey metrics immediately.", tr: "Bu nitel anket ölçümlerini derhal işleyebilir misiniz acaba?", word: "process", trWord: "işleyebilir misiniz acaba", blank: "I wonder if you could ___ these qualitative survey metrics immediately.", blocks: ["I wonder if you could", "process these qualitative", "survey metrics immediately."] },
  { en: "I wonder if you could design a new architectural framework for our project.", tr: "Projemiz için yeni bir mimari çerçeve tasarlayabilir misiniz acaba?", word: "design", trWord: "tasarlayabilir misiniz acaba", blank: "I wonder if you could ___ a new architectural framework for our project.", blocks: ["I wonder if you could", "design a new architectural framework", "for our project."] },
  { en: "I wonder if you could check the server communication protocols tonight.", tr: "Sunucu iletişim protokollerini bu gece kontrol edebilir misiniz acaba?", word: "check", trWord: "kontrol edebilir misiniz acaba", blank: "I wonder if you could ___ the server communication protocols tonight.", blocks: ["I wonder if you could", "check the server communication protocols", "tonight."] },
  { en: "I wonder if you could back up the system parameters before the test.", tr: "Testten önce sistem parametrelerini yedekleyebilir misiniz acaba?", word: "back up", trWord: "yedekleyebilir misiniz acaba", blank: "I wonder if you could ___ the system parameters before the test.", blocks: ["I wonder if you could", "back up the system parameters", "before the test."] }
];"""

unitAra2Lesson3SentencesRaw_code = """const unitAra2Lesson3SentencesRaw = [
  { en: "Do you mind if I double-check the statistical calculations of the project?", tr: "Projenin istatistiksel hesaplamalarını tekrar kontrol etmemin bir sakıncası var mı?", word: "double-check", trWord: "kontrol etmemin", blank: "Do you mind if I ___ the statistical calculations of the project?", blocks: ["Do you mind if I", "double-check the statistical calculations", "of the project?"] },
  { en: "Do you mind if I update the corporate regulations on user data privacy?", tr: "Kullanıcı veri gizliliğine ilişkin kurumsal düzenlemeleri güncellememin bir sakıncası var mı?", word: "update", trWord: "güncellememin", blank: "Do you mind if I ___ the corporate regulations on user data privacy?", blocks: ["Do you mind if I", "update the corporate regulations", "on user data privacy?"] },
  { en: "Do you mind if I follow the strict institutional policy during the audit?", tr: "Denetim sırasında sıkı kurumsal politikayı takip etmemin bir sakıncası var mı?", word: "follow", trWord: "takip etmemin", blank: "Do you mind if I ___ the strict institutional policy during the audit?", blocks: ["Do you mind if I", "follow the strict institutional policy", "during the audit?"] },
  { en: "Do you mind if I present an alternative research methodology to the board?", tr: "Yönetim kuruluna alternatif bir araştırma metodolojisi sunmamın bir sakıncası var mı?", word: "present", trWord: "sunmamın", blank: "Do you mind if I ___ an alternative research methodology to the board?", blocks: ["Do you mind if I", "present an alternative research methodology", "to the board?"] },
  { en: "Do you mind if I monitor the continuous chemical process this afternoon?", tr: "Bu öğleden sonra sürekli kimyasal süreci izlememin bir sakıncası var mı?", word: "monitor", trWord: "izlememin", blank: "Do you mind if I ___ the continuous chemical process this afternoon?", blocks: ["Do you mind if I", "monitor the continuous chemical process", "this afternoon?"] },
  { en: "Do you mind if I share these detailed empirical inputs with the consultants?", tr: "Bu detaylı ampirik girdileri danışmanlarla paylaşmamın bir sakıncası var mı?", word: "share", trWord: "paylaşmamın", blank: "Do you mind if I ___ these detailed empirical inputs with the consultants?", blocks: ["Do you mind if I", "share these detailed empirical inputs", "with the consultants?"] },
  { en: "Do you mind if I allocate maximum annual manufacturing resources to our sector?", tr: "Sektörümüze maksimum yıllık üretim kaynağı tahsis etmemin bir sakıncası var mı?", word: "allocate", trWord: "tahsis etmemin", blank: "Do you mind if I ___ allocate maximum annual manufacturing resources to our sector?", blocks: ["Do you mind if I", "allocate maximum annual manufacturing resources", "to our sector?"] },
  { en: "Do you mind if I inspect the modern industrial facility before the summit?", tr: "Zirveden önce modern endüstriyel tesisi denetlememin bir sakıncası var mı?", word: "inspect", trWord: "denetlememin", blank: "Do you mind if I ___ the modern industrial facility before the summit?", blocks: ["Do you mind if I", "inspect the modern industrial facility", "before the summit?"] },
  { en: "Do you mind if I restructure the centralized cloud database parameters?", tr: "Merkezi bulut veritabanı parametrelerini yeniden yapılandırmamın bir sakıncası var mı?", word: "restructure", trWord: "yapılandırmamın", blank: "Do you mind if I ___ restructure the centralized cloud database parameters?", blocks: ["Do you mind if I", "restructure the centralized cloud database", "parameters?"] },
  { en: "Do you mind if I introduce multi-factor biometric authentication to the platform?", tr: "Platforma çok faktörlü biyometrik doğrulama getirmemin bir sakıncası var mı?", word: "introduce", trWord: "getirmemin", blank: "Do you mind if I ___ introduce multi-factor biometric authentication to the platform?", blocks: ["Do you mind if I", "introduce multi-factor biometric authentication", "to the platform?"] },
  { en: "Do you mind if I modify the underlying parameters of the framework?", tr: "Çerçevenin altta yatan parametrelerini değiştirmemin bir sakıncası var mı?", word: "modify", trWord: "değiştirmemin", blank: "Do you mind if I ___ modify the underlying parameters of the framework?", blocks: ["Do you mind if I", "modify the underlying parameters", "of the framework?"] },
  { en: "Do you mind if I analyze the automated system error logs now?", tr: "Otomatik sistem hata günlüklerini şimdi analiz etmemin bir sakıncası var mı?", word: "analyze", trWord: "etmemin", blank: "Do you mind if I ___ analyze the automated system error logs now?", blocks: ["Do you mind if I", "analyze the automated system error logs", "now?"] },
  { en: "Do you mind if I publish these qualitative research results next month?", tr: "Bu nitel araştırma sonuçlarını gelecek ay yayınlamamın bir sakıncası var mı?", word: "publish", trWord: "yayınlamamın", blank: "Do you mind if I ___ publish these qualitative research results next month?", blocks: ["Do you mind if I", "publish these qualitative research results", "next month?"] },
  { en: "Do you mind if I read the confidential policy documents today?", tr: "Gizli politika belgelerini bugün okumamın bir sakıncası var mı?", word: "read", trWord: "okumamın", blank: "Do you mind if I ___ read the confidential policy documents today?", blocks: ["Do you mind if I", "read the confidential policy documents", "today?"] },
  { en: "Do you mind if I utilize the laboratory testing console tonight?", tr: "Bu gece laboratuvar test konsolunu kullanmamın bir sakıncası var mı?", word: "utilize", trWord: "kullanmamın", blank: "Do you mind if I ___ utilize the laboratory testing console tonight?", blocks: ["Do you mind if I", "utilize the laboratory testing console", "tonight?"] }
];"""

unitAra2Lesson4SentencesRaw_code = """const unitAra2Lesson4SentencesRaw = [
  { en: "Would you mind if I shared the historical system logs with the evaluation committee?", tr: "Geçmiş sistem günlüklerini değerlendirme komitesiyle paylaşmamın bir sakıncası olur muydu?", word: "shared", trWord: "paylaşmamın", blank: "Would you mind if I ___ the historical system logs with the evaluation committee?", blocks: ["Would you mind if I", "shared the historical system logs", "with the evaluation committee?"] },
  { en: "Would you mind if I accessed the secure network area for database optimization?", tr: "Veritabanı optimizasyonu için güvenli ağ alanına erişmemin bir sakıncası olur muydu?", word: "accessed", trWord: "erişmemin", blank: "Would you mind if I ___ the secure network area for database optimization?", blocks: ["Would you mind if I", "accessed the secure network area", "for database optimization?"] },
  { en: "Would you mind if I designed a new architectural framework for our cloud?", tr: "Bulutumuz için yeni bir mimari çerçeve tasarlamamın bir sakıncası olur muydu?", word: "designed", trWord: "tasarlamamın", blank: "Would you mind if I ___ a new architectural framework for our cloud?", blocks: ["Would you mind if I", "designed a new architectural framework", "for our cloud?"] },
  { en: "Would you mind if I evaluated the regional educational surveys ahead of schedule?", tr: "Bölgesel eğitim anketlerini planlanandan önce değerlendirmemin bir sakıncası olur muydu?", word: "evaluated", trWord: "değerlendirmemin", blank: "Would you mind if I ___ the regional educational surveys ahead of schedule?", blocks: ["Would you mind if I", "evaluated the regional educational surveys", "ahead of schedule?"] },
  { en: "Would you mind if I introduced strict policy changes during the summit?", tr: "Zirve sırasında sıkı politika değişiklikleri getirmemin bir sakıncası olur muydu?", word: "introduced", trWord: "getirmemin", blank: "Would you mind if I ___ the strict policy changes during the summit?", blocks: ["Would you mind if I", "introduced strict policy changes", "during the summit?"] },
  { en: "Would you mind if I utilized advanced encryption algorithms in this module?", tr: "Bu modülde gelişmiş şifreleme algoritmaları kullanmamın bir sakıncası olur muydu?", word: "utilized", trWord: "kullanmamın", blank: "Would you mind if I ___ the advanced encryption algorithms in this module?", blocks: ["Would you mind if I", "utilized advanced encryption algorithms", "in this module?"] },
  { en: "Would you mind if I fine-tuned the automated background script tomorrow?", tr: "Otomatik arka plan kodunu yarın ince ayarlamamın bir sakıncası olur muydu?", word: "fine-tuned", trWord: "ayarlamamın", blank: "Would you mind if I ___ the automated background script tomorrow?", blocks: ["Would you mind if I", "fine-tuned the automated background script", "tomorrow?"] },
  { en: "Would you mind if I expanded the investigative project scope slightly?", tr: "Araştırma projesi kapsamını biraz genişletmemin bir sakıncası olur muydu?", word: "expanded", trWord: "genişletmemin", blank: "Would you mind if I ___ the investigative project scope slightly?", blocks: ["Would you mind if I", "expanded the investigative project scope", "slightly?"] },
  { en: "Would you mind if I conducted exhaustive digital database surveys this weekend?", tr: "Bu hafta sonu kapsamlı dijital veritabanı anketleri yürütmemin bir sakıncası olur muydu?", word: "conducted", trWord: "yürütmemin", blank: "Would you mind if I ___ the exhaustive digital database surveys this weekend?", blocks: ["Would you mind if I", "conducted exhaustive digital database surveys", "this weekend?"] },
  { en: "Would you mind if I inspected the modern laboratory equipment tomorrow?", tr: "Yarın modern laboratuvar ekipmanlarını denetlememin bir sakıncası olur muydu?", word: "inspected", trWord: "denetlememin", blank: "Would you mind if I ___ the modern laboratory equipment tomorrow?", blocks: ["Would you mind if I", "inspected the modern laboratory equipment", "tomorrow?"] },
  { en: "Would you mind if I resolved the server network anomaly immediately?", tr: "Sunucu ağ anomalisini derhal çözmemin bir sakıncası olur muydu?", word: "resolved", trWord: "çözmemin", blank: "Would you mind if I ___ the server network anomaly immediately?", blocks: ["Would you mind if I", "resolved the server network anomaly", "immediately?"] },
  { en: "Would you mind if I processed the empirical data ratios next week?", tr: "Gelecek hafta ampirik veri oranlarını işlememin bir sakıncası olur muydu?", word: "processed", trWord: "işlememin", blank: "Would you mind if I ___ the empirical data ratios next week?", blocks: ["Would you mind if I", "processed the empirical data ratios", "next week?"] },
  { en: "Would you mind if I updated the security parameters of the application?", tr: "Ugulamanın güvenlik parametrelerini güncellememin bir sakıncası olur muydu?", word: "updated", trWord: "güncellememin", blank: "Would you mind if I ___ the security parameters of the application?", blocks: ["Would you mind if I", "updated the security parameters", "of the application?"] },
  { en: "Would you mind if I published the annual evaluation insights today?", tr: "Yıllık değerlendirme öngörülerini bugün yayınlamamın bir sakıncası olur muydu?", word: "published", trWord: "yayınlamamın", blank: "Would you mind if I ___ the annual evaluation insights today?", blocks: ["Would you mind if I", "published the annual evaluation insights", "today?"] },
  { en: "Would you mind if I checked the centralized database parameters tonight?", tr: "Bu gece merkezi veritabanı parametrelerini kontrol etmemin bir sakıncası olur muydu?", word: "checked", trWord: "kontrol etmemin", blank: "Would you mind if I ___ the centralized database parameters tonight?", blocks: ["Would you mind if I", "checked the centralized database parameters", "tonight?"] }
];"""

def run_update():
    # 1. Update app.js
    with open("app.js", "r", encoding="utf-8") as f:
        app_js = f.read()

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
    
    for line in lines:
        # Shift illustrations dynamically for unitId >= 17
        illustration_match = re.match(r'^(\s*)\} else if \(unitId === (\d+)\) \{', line)
        if illustration_match:
            spacing = illustration_match.group(1)
            uid = int(illustration_match.group(2))
            if uid >= 17:
                line = f"{spacing}}} else if (unitId === {uid+1}) {{"
        
        # Shift variety check
        if "lessonIndex === 2 && (unitId === 1 || unitId === 6 || unitId === 9 || unitId === 19)" in line:
            line = line.replace("unitId === 19", "unitId === 20")
            
        # Shift notUploadedUnits Sets
        if "new Set([20, 21, 22, 23, 24, 25, 26])" in line:
            line = line.replace("new Set([20, 21, 22, 23, 24, 25, 26])", "new Set([21, 22, 23, 24, 25, 26, 27])")

        new_lines.append(line)

    # Re-insert the specific unit 17 mapping into the illustration map
    # We find where '} else if (unitId === 18) {' is and insert unit 17 before it.
    final_app_lines = []
    inserted_mapping = False
    for line in new_lines:
        if not inserted_mapping and "} else if (unitId === 18) {" in line:
            indent = len(line) - len(line.lstrip())
            spacing = " " * indent
            final_app_lines.append(f"{spacing}}} else if (unitId === 17) {{")
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

    # Place raw list code right before const unitAra1Lesson1SentencesRaw
    raw_lists_all = f"\n\n{unitAra2Lesson1SentencesRaw_code}\n\n{unitAra2Lesson2SentencesRaw_code}\n\n{unitAra2Lesson3SentencesRaw_code}\n\n{unitAra2Lesson4SentencesRaw_code}\n\n"
    
    if "const unitAra1Lesson1SentencesRaw" in data_js:
        data_js = data_js.replace("const unitAra1Lesson1SentencesRaw", raw_lists_all + "const unitAra1Lesson1SentencesRaw")
        print("Injected raw sentence arrays in data.js.")

    # Insert Ara Bölüm 2 in rawTopics
    topic16_end = """      "C. Maksat Yapıları (Tam Genişletilmiş Akademik Örnekler)"
    ]
  },
  {
    title: "XVI. Fiil İsmi (Gerund) + Nesnesi (Özne Olarak) (Sayfa 112)","""

    topic16_end_new = """      "C. Maksat Yapıları (Tam Genişletilmiş Akademik Örnekler)"
    ]
  },
  {
    title: "Ara Bölüm 2: Rica ve İzin İsteme Yapıları",
    desc: "Rica (request) ve izin isteme (asking permission) kibar dil kalıpları",
    icon: "🤝",
    numLessons: 4,
    formulas: [
      { formula: "Would / Could / Will / Can + you + V1 (Request)", example: "Would you modify the parameters?: Parametreleri değiştirir misiniz?", description: "Kibarca bir eylem talep ederken veya ricada bulunurken modal fiiller (would, could, will, can) kullanılır." },
      { formula: "I wonder if you could + V1 (Request)", example: "I wonder if you could integrate this: Bunu entegre edebilir misiniz acaba?", description: "Daha dolaylı, resmi ve kibar bir şekilde ricada bulunurken 'I wonder if you could' kalıbı kullanılır." },
      { formula: "Do you mind if I + V1 (Permission)", example: "Do you mind if I update the regulations?: Düzenlemeleri güncellememin sakıncası var mı?", description: "Şimdiki veya geniş zamanda kibar bir şekilde izin isterken 'Do you mind if I' yapısından sonra fiilin yalın hali (V1) kullanılır." },
      { formula: "Would you mind if I + V2 (Permission)", example: "Would you mind if I shared the logs?: Günlükleri paylaşmamın bir sakıncası olur muydu?", description: "İzin isterken durumu daha varsayımsal ve kibar hale getirmek için 'Would you mind if I' kalıbından sonra fiilin V2 (Simple Past) hali kullanılır." }
    ],
    subtitles: [
      "A. Rica Yapıları — Modallar (Would you / Could you / Will you / Can you) (Sayfa 99)",
      "B. Rica Yapıları — I wonder (I wonder if you could) (Sayfa 99)",
      "C. İzin İsteme Yapıları — Present (Do you mind if I) (Sayfa 100)",
      "D. İzin İsteme Yapıları — Past (Would you mind if I) (Sayfa 100)"
    ]
  },
  {
    title: "XVI. Fiil İsmi (Gerund) + Nesnesi (Özne Olarak) (Sayfa 112)","""

    if topic16_end in data_js:
        data_js = data_js.replace(topic16_end, topic16_end_new)
        print("Inserted Ara Bölüm 2 in rawTopics.")

    # Parse and shift unitSentencesMap
    map_start = data_js.find("const unitSentencesMap = {")
    map_end = data_js.find("};", map_start)
    map_body = data_js[map_start:map_end+2]
    
    # Process lines of the map body
    lines_map = map_body.splitlines()
    new_lines_map = []
    for line in lines_map:
        # Match keys (shift keys >= 17):
        k_match = re.match(r'^(\s*)(\d+):(\s*)\{', line)
        if k_match:
            key_num = int(k_match.group(2))
            if key_num >= 17:
                line = f"{k_match.group(1)}{key_num+1}:{k_match.group(3)}{{"
                
        # Match function calls inside map body and shift unitId (index 17+) and lessonId:
        call_match = re.search(r'(\w+)\(([^,]+),\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)', line)
        if call_match:
            name = call_match.group(1)
            sents = call_match.group(2)
            uid = int(call_match.group(3))
            lid = int(call_match.group(4))
            exid = call_match.group(5)
            offset = call_match.group(6)
            if uid >= 17:
                old_call = f"{name}({sents}, {uid}, {lid}, {exid}, {offset})"
                new_call = f"{name}({sents}, {uid+1}, {lid+4}, {exid}, {offset})"
                line = line.replace(old_call, new_call)
                
        new_lines_map.append(line)
        
    # Inject Ara Bölüm 2 at key 17
    final_map_lines = []
    inserted_map_block = False
    
    insertion_block_lines = [
        "  17: {",
        "    1: { exercises: [",
        "      buildAcademicExercises(unitAra2Lesson1SentencesRaw, 17, 57, 1, 0),",
        "      buildAcademicExercises(unitAra2Lesson1SentencesRaw, 17, 57, 2, 10),",
        "      buildAcademicExercises(unitAra2Lesson1SentencesRaw, 17, 57, 3, 5),",
        "      buildAcademicExercises(unitAra2Lesson1SentencesRaw, 17, 57, 4, 12)",
        "    ] },",
        "    2: { exercises: [",
        "      buildAcademicExercises(unitAra2Lesson2SentencesRaw, 17, 58, 1, 0),",
        "      buildAcademicExercises(unitAra2Lesson2SentencesRaw, 17, 58, 2, 10),",
        "      buildAcademicExercises(unitAra2Lesson2SentencesRaw, 17, 58, 3, 5),",
        "      buildAcademicExercises(unitAra2Lesson2SentencesRaw, 17, 58, 4, 12)",
        "    ] },",
        "    3: { exercises: [",
        "      buildAcademicExercises(unitAra2Lesson3SentencesRaw, 17, 59, 1, 0),",
        "      buildAcademicExercises(unitAra2Lesson3SentencesRaw, 17, 59, 2, 10),",
        "      buildAcademicExercises(unitAra2Lesson3SentencesRaw, 17, 59, 3, 5),",
        "      buildAcademicExercises(unitAra2Lesson3SentencesRaw, 17, 59, 4, 12)",
        "    ] },",
        "    4: { exercises: [",
        "      buildAcademicExercises(unitAra2Lesson4SentencesRaw, 17, 60, 1, 0),",
        "      buildAcademicExercises(unitAra2Lesson4SentencesRaw, 17, 60, 2, 10),",
        "      buildAcademicExercises(unitAra2Lesson4SentencesRaw, 17, 60, 3, 5),",
        "      buildAcademicExercises(unitAra2Lesson4SentencesRaw, 17, 60, 4, 12)",
        "    ] }",
        "  },"
    ]
    
    for l in new_lines_map:
        if not inserted_map_block and re.match(r'^\s*18:\s*\{', l):
            final_map_lines.extend(insertion_block_lines)
            inserted_map_block = True
        final_map_lines.append(l)
        
    new_map_body = "\n".join(final_map_lines)
    if inserted_map_block:
        print("Injected Ara Bölüm 2 (unit 17) into unitSentencesMap.")
    else:
        print("WARNING: Could not find key 18 to insert key 17.")
        
    data_js = data_js.replace(map_body, new_map_body)

    # 3. Inject unitAra2BaseTranslations and unitAra2BaseEnglish dictionaries in data.js
    base_dict_code = """const unitAra2BaseTranslations = {
  "modify": "değiştirmek",
  "process": "işlemek",
  "back up": "yedeklemek",
  "inspect": "denetlemek",
  "evaluate": "değerlendirmek",
  "define": "tanımlamak",
  "present": "sunmak",
  "optimize": "optimize etmek",
  "restrict": "sınırlandırmak",
  "reallocate": "yeniden tahsis etmek",
  "verify": "doğrulamak",
  "resolve": "çözmek",
  "update": "güncellemek",
  "publish": "yayınlamak",
  "organize": "düzenlemek",
  "integrate": "entegre etmek",
  "utilize": "kullanmak",
  "reinforce": "güçlendirmek",
  "implement": "uygulamak",
  "derive": "türetmek",
  "fine-tune": "ince ayar yapmak",
  "analyze": "analiz etmek",
  "clarify": "açıklamak",
  "calculate": "hesaplamak",
  "check": "kontrol etmek",
  "double-check": "tekrar kontrol etmek",
  "follow": "takip etmek",
  "monitor": "izlemek",
  "share": "paylaşmak",
  "allocate": "tahsis etmek",
  "restructure": "yeniden yapılandırmak",
  "introduce": "getirmek",
  "read": "okumak",
  "shared": "paylaşmak",
  "accessed": "erişmek",
  "designed": "tasarlamak",
  "evaluated": "değerlendirmek",
  "introduced": "getirmek",
  "utilized": "kullanmak",
  "fine-tuned": "ince ayar yapmak",
  "expanded": "genişletmek",
  "conducted": "yürütmek",
  "inspected": "denetlemek",
  "resolved": "çözmek",
  "processed": "işlemek",
  "updated": "güncellemek",
  "published": "yayınlamak",
  "checked": "kontrol etmek"
};

const unitAra2BaseEnglish = {
  "shared": "share",
  "accessed": "access",
  "designed": "design",
  "evaluated": "evaluate",
  "introduced": "introduce",
  "utilized": "utilize",
  "fine-tuned": "fine-tune",
  "expanded": "expand",
  "conducted": "conduct",
  "inspected": "inspect",
  "resolved": "resolve",
  "processed": "process",
  "updated": "update",
  "published": "publish",
  "checked": "check"
};

"""
    if "const unitAra1BaseEnglish" in data_js:
        data_js = data_js.replace("const unitAra1BaseEnglish", base_dict_code + "const unitAra1BaseEnglish")
        print("Injected Ara 2 Base dictionaries into data.js.")

    data_js = data_js.replace(
        "if (unitId === 13) return unitAra1BaseTranslations[w] || null;",
        "if (unitId === 13) return unitAra1BaseTranslations[w] || null;\n    if (unitId === 17) return unitAra2BaseTranslations[w] || null;"
    )
    data_js = data_js.replace(
        "if (unitId === 13) return unitAra1BaseEnglish[w] || w;",
        "if (unitId === 13) return unitAra1BaseEnglish[w] || w;\n    if (unitId === 17) return unitAra2BaseEnglish[w] || w;"
    )
    print("getUniqueMatchingPairs lookup logic updated.")

    with open("data.js", "w", encoding="utf-8") as f:
        f.write(data_js)
    print("data.js updated successfully.")

if __name__ == "__main__":
    run_update()
