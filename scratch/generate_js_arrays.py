import re
import os

# Define the components of the 30 sentences in Section 7
# Format: (S1, S2, V, O1, O2, V_tr, O1_tr, O2_tr, S1_tr, S2_tr)
# We will use these to construct:
# 1. Yalın SVO (S1 + V + O1)
# 2. Genişletilmiş Özneler (S2 + V + O1)
# 3. Genişletilmiş Nesneler (S1 + V + O2)
# 4. Tam Genişletilmiş SVO (S2 + V + O2)

# Let's write down the exact English sentences first from the docx file:
# S1 + V + O1:
# The data contradicts the theory.
# The context specifies the criteria.
# The sector anticipates growth.
# Authorities advocate reform.
# The dynamic triggers reaction.
# Experts clarify the scope.
# The process induces stress.
# The anomaly distorts results.
# Media manipulates perspective.
# The system accommodates expansion.
# The protocol defines parameters.
# The contract binds institutions.
# Analysts inspect the framework.
# The variable affects outcomes.
# The core stabilizes components.
# The graph illustrates percentages.
# The policy restricts access.
# The finding validates hypotheses.
# The team modifies modules.
# The committee evaluates feedback.
# The researcher isolates variables.
# Strategies maximize efficiency.
# The script calculates ratios.
# The audit exposes flaws.
# The shift alters trends.
# The framework secures data.
# The council suspended regulations.
# The board terminated agreements.
# The ministry conducted surveys.
# The database accumulates logs.

components = [
    # 1
    {
        "s1": "The data", "s2": "The newly collected empirical data", "v": "contradicts", "o1": "the theory.", "o2": "the long-standing theoretical model.",
        "s1_tr": "Veriler", "s2_tr": "Yeni toplanan deneysel veriler", "v_tr": "çelişir", "o1_tr": "teoriyle", "o2_tr": "uzun süredir var olan teorik modelle"
    },
    # 2
    {
        "s1": "The context", "s2": "The broader socio-economic context", "v": "specifies", "o1": "the criteria.", "o2": "the strict qualitative selection criteria.",
        "s1_tr": "Bağlam", "s2_tr": "Daha geniş sosyo-ekonomik bağlam", "v_tr": "belirler", "o1_tr": "kriterleri", "o2_tr": "katı nitel seçim kriterlerini"
    },
    # 3
    {
        "s1": "The sector", "s2": "The highly competitive dynamic sector", "v": "anticipates", "o1": "growth.", "o2": "significant annual financial growth.",
        "s1_tr": "Sektör", "s2_tr": "Son derece rekabetçi dinamik sektör", "v_tr": "öngörür", "o1_tr": "büyüme", "o2_tr": "yıllık önemli finansal büyüme"
    },
    # 4
    {
        "s1": "Authorities", "s2": "Leading institutional authorities", "v": "advocate", "o1": "reform.", "o2": "comprehensive legislative tax reform.",
        "s1_tr": "Yetkililer", "s2_tr": "Önde gelen kurumsal yetkililer", "v_tr": "savunur", "o1_tr": "reformu", "o2_tr": "kapsamlı yasal vergi reformunu"
    },
    # 5
    {
        "s1": "The dynamic", "s2": "This unpredictable economic dynamic", "v": "triggers", "o1": "reaction.", "o2": "a chain of negative physical reactions.",
        "s1_tr": "Dinamik", "s2_tr": "Bu öngörülemeyen ekonomik dinamik", "v_tr": "tetikler", "o1_tr": "tepkiyi", "o2_tr": "bir dizi olumsuz fiziksel tepkiyi"
    },
    # 6
    {
        "s1": "Experts", "s2": "Independent technical experts", "v": "clarify", "o1": "the scope.", "o2": "the initial investigative project scope.",
        "s1_tr": "Uzmanlar", "s2_tr": "Bağımsız teknik uzmanlar", "v_tr": "açıklar", "o1_tr": "kapsamı", "o2_tr": "başlangıçtaki araştırma projesi kapsamını"
    },
    # 7
    {
        "s1": "The process", "s2": "The continuous chemical process", "v": "induces", "o1": "stress.", "o2": "severe psychological and occupational stress.",
        "s1_tr": "Süreç", "s2_tr": "Sürekli kimyasal süreç", "v_tr": "yol açar", "o1_tr": "strese", "o2_tr": "ciddi psikolojik ve mesleki strese"
    },
    # 8
    {
        "s1": "The anomaly", "s2": "The undetected structural anomaly", "v": "distorts", "o1": "results.", "o2": "the final statistical research results.",
        "s1_tr": "Anomali", "s2_tr": "Tespit edilemeyen yapısal anomali", "v_tr": "bozar", "o1_tr": "sonuçları", "o2_tr": "nihai istatistiksel araştırma sonuçlarını"
    },
    # 9
    {
        "s1": "Media", "s2": "Mainstream digital media", "v": "manipulates", "o1": "perspective.", "o2": "public political and cultural perspective.",
        "s1_tr": "Medya", "s2_tr": "Ana akım dijital medya", "v_tr": "manipüle eder", "o1_tr": "bakış açısını", "o2_tr": "kamuoyunun siyasi ve kültürel bakış açısını"
    },
    # 10
    {
        "s1": "The system", "s2": "The updated operational system", "v": "accommodates", "o1": "expansion.", "o2": "rapid regional infrastructure expansion.",
        "s1_tr": "Sistem", "s2_tr": "Güncellenmiş operasyonel sistem", "v_tr": "uyum sağlar", "o1_tr": "genişlemeye", "o2_tr": "hızlı bölgesel altyapı genişlemesine"
    },
    # 11
    {
        "s1": "The protocol", "s2": "The revised security protocol", "v": "defines", "o1": "parameters.", "o2": "crucial technical system parameters.",
        "s1_tr": "Protokol", "s2_tr": "Gözden geçirilmiş güvenlik protokolü", "v_tr": "tanımlar", "o1_tr": "parametreleri", "o2_tr": "kritik teknik sistem parametrelerini"
    },
    # 12
    {
        "s1": "The contract", "s2": "The legally binding contract", "v": "binds", "o1": "institutions.", "o2": "separate international research institutions.",
        "s1_tr": "Sözleşme", "s2_tr": "Yasal olarak bağlayıcı sözleşme", "v_tr": "bağlar", "o1_tr": "kurumları", "o2_tr": "ayrı uluslararası araştırma kurumlarını"
    },
    # 13
    {
        "s1": "Analysts", "s2": "Senior financial analysts", "v": "inspect", "o1": "the framework.", "o2": "the entire underlying structural framework.",
        "s1_tr": "Analistler", "s2_tr": "Kıdemli finansal analistler", "v_tr": "inceler", "o1_tr": "çerçeveyi", "o2_tr": "tüm temel yapısal çerçeveyi"
    },
    # 14
    {
        "s1": "The variable", "s2": "The primary independent variable", "v": "affects", "o1": "outcomes.", "o2": "excellent academic student outcomes.",
        "s1_tr": "Değişken", "s2_tr": "Birincil bağımsız değişken", "v_tr": "etkiler", "o1_tr": "sonuçları", "o2_tr": "mükemmel akademik öğrenci sonuçlarını"
    },
    # 15
    {
        "s1": "The core", "s2": "The reinforced central core", "v": "stabilizes", "o1": "components.", "o2": "crucial internal device components.",
        "s1_tr": "Çekirdek", "s2_tr": "Güçlendirilmiş merkezi çekirdek", "v_tr": "stabilize eder", "o1_tr": "bileşenleri", "o2_tr": "kritik dahili cihaz bileşenlerini"
    },
    # 16
    {
        "s1": "The graph", "s2": "The attached statistical graph", "v": "illustrates", "o1": "percentages.", "o2": "exact distribution and demographic percentages.",
        "s1_tr": "Grafik", "s2_tr": "Ekli istatistiksel grafik", "v_tr": "gösterir", "o1_tr": "yüzdeleri", "o2_tr": "kesin dağılım ve demografik yüzdeleri"
    },
    # 17
    {
        "s1": "The policy", "s2": "The strict institutional policy", "v": "restricts", "o1": "access.", "o2": "unauthorized user network access.",
        "s1_tr": "Politika", "s2_tr": "Katı kurumsal politika", "v_tr": "kısıtlar", "o1_tr": "erişimi", "o2_tr": "yetkisiz kullanıcı ağ erişimini"
    },
    # 18
    {
        "s1": "The finding", "s2": "The final scientific finding", "v": "validates", "o1": "hypotheses.", "o2": "alternative alternative scientific hypotheses.",
        "s1_tr": "Bulgu", "s2_tr": "Nihai bilimsel bulgu", "v_tr": "doğrular", "o1_tr": "hipotezleri", "o2_tr": "alternatif bilimsel hipotezleri"
    },
    # 19
    {
        "s1": "The team", "s2": "The software development team", "v": "modifies", "o1": "modules.", "o2": "individual functional software modules.",
        "s1_tr": "Ekip", "s2_tr": "Yazılım geliştirme ekibi", "v_tr": "değiştirir", "o1_tr": "modülleri", "o2_tr": "bireysel fonksiyonel yazılım modüllerini"
    },
    # 20
    {
        "s1": "The committee", "s2": "The ethics evaluation committee", "v": "evaluates", "o1": "feedback.", "o2": "detailed anonymous student feedback.",
        "s1_tr": "Komite", "s2_tr": "Etik değerlendirme komitesi", "v_tr": "değerlendirir", "o1_tr": "geri bildirimi", "o2_tr": "detaylı anonim öğrenci geri bildirimini"
    },
    # 21
    {
        "s1": "The researcher", "s2": "The principal laboratory researcher", "v": "isolates", "o1": "variables.", "o2": "separate unstable chemical variables.",
        "s1_tr": "Araştırmacı", "s2_tr": "Baş laboratuvar araştırmacısı", "v_tr": "izole eder", "o1_tr": "değişkenleri", "o2_tr": "ayrı kararsız kimyasal değişkenleri"
    },
    # 22
    {
        "s1": "Strategies", "s2": "Innovative corporate strategies", "v": "maximize", "o1": "efficiency.", "o2": "maximum annual manufacturing efficiency.",
        "s1_tr": "Stratejiler", "s2_tr": "Yenilikçi kurumsal stratejiler", "v_tr": "maksimize eder", "o1_tr": "verimliliği", "o2_tr": "maksimum yıllık üretim verimliliğini"
    },
    # 23
    {
        "s1": "The script", "s2": "The automated background script", "v": "calculates", "o1": "ratios.", "o2": "complex mathematical data ratios.",
        "s1_tr": "Betik", "s2_tr": "Otomatik arka plan betiği", "v_tr": "hesaplar", "o1_tr": "oranları", "o2_tr": "karmaşık matematiksel veri oranlarını"
    },
    # 24
    {
        "s1": "The audit", "s2": "The independent annual audit", "v": "exposes", "o1": "flaws.", "o2": "hidden organizational system flaws.",
        "s1_tr": "Denetim", "s2_tr": "Bağımsız yıllık denetim", "v_tr": "ortaya çıkarır", "o1_tr": "kusurları", "o2_tr": "gizli örgütsel sistem kusurlarını"
    },
    # 25
    {
        "s1": "The shift", "s2": "The sudden paradigm shift", "v": "alters", "o1": "trends.", "o2": "global consumer behavior trends.",
        "s1_tr": "Değişim", "s2_tr": "Ani paradigma değişimi", "v_tr": "değiştirir", "o1_tr": "eğilimleri", "o2_tr": "küresel tüketici davranışı eğilimlerini"
    },
    # 26
    {
        "s1": "The framework", "s2": "The advanced cryptographic framework", "v": "secures", "o1": "data.", "o2": "sensitive user information data.",
        "s1_tr": "Çerçeve", "s2_tr": "Gelişmiş kriptografik çerçeve", "v_tr": "güvenceye alır", "o1_tr": "verileri", "o2_tr": "hassas kullanıcı bilgileri verilerini"
    },
    # 27
    {
        "s1": "The council", "s2": "The regional administrative council", "v": "suspended", "o1": "regulations.", "o2": "outdated environmental safety regulations.",
        "s1_tr": "Konsey", "s2_tr": "Bölgesel idari konsey", "v_tr": "askıya aldı", "o1_tr": "düzenlemeleri", "o2_tr": "güncelliğini yitirmiş çevresel güvenlik düzenlemelerini"
    },
    # 28
    {
        "s1": "The board", "s2": "The executive internal board", "v": "terminated", "o1": "agreements.", "o2": "formal bilateral commercial agreements.",
        "s1_tr": "Yönetim kurulu", "s2_tr": "Yürütme iç kurulu", "v_tr": "feshetti", "o1_tr": "anlaşmaları", "o2_tr": "resmi ikili ticari anlaşmaları"
    },
    # 29
    {
        "s1": "The ministry", "s2": "The national education ministry", "v": "conducted", "o1": "surveys.", "o2": "comprehensive regional educational surveys.",
        "s1_tr": "Bakanlık", "s2_tr": "Milli eğitim bakanlığı", "v_tr": "yürüttü", "o1_tr": "anketler", "o2_tr": "kapsamlı bölgesel eğitim anketleri"
    },
    # 30
    {
        "s1": "The database", "s2": "The centralized cloud database", "v": "accumulates", "o1": "logs.", "o2": "detailed historical system logs.",
        "s1_tr": "Veritabanı", "s2_tr": "Merkezi bulut veritabanı", "v_tr": "biriktirir", "o1_tr": "günlükleri", "o2_tr": "detaylı geçmiş sistem günlüklerini"
    }
]

# Generate the 120 sentences list (4 sets of 30)
all_sentences = []

# Set 1: Yalın SVO (30 sentences)
for comp in components:
    # clean trailing dot from O1 for the sentence content, but let's keep the target word matching
    en_sent = f"{comp['s1']} {comp['v']} {comp['o1']}"
    tr_sent = f"{comp['s1_tr']} {comp['o1_tr']} {comp['v_tr']}."
    # Let's adjust Turkish SVO order: S_tr + O_tr + V_tr
    # e.g., "Veriler teoriyle çelişir." -> "Veriler" + "teoriyle" + "çelişir."
    # Let's make sure it has correct capitalizations and punctuation
    # Clean double dots or double spaces
    tr_sent = re.sub(r'\s+', ' ', tr_sent).strip()
    tr_sent = re.sub(r'\.+', '.', tr_sent)
    
    # Hedef kelime and blank
    target_word = comp['v']
    blank_sent = en_sent.replace(target_word, "___")
    
    # We also need translation of the target word.
    # In Turkish, the verb translates to comp['v_tr'].
    all_sentences.append({
        "en": en_sent,
        "tr": tr_sent,
        "word": target_word,
        "trWord": comp['v_tr'],
        "blank": blank_sent
    })

# Set 2: Genişletilmiş Özneler (30 sentences)
for comp in components:
    en_sent = f"{comp['s2']} {comp['v']} {comp['o1']}"
    tr_sent = f"{comp['s2_tr']} {comp['o1_tr']} {comp['v_tr']}."
    tr_sent = re.sub(r'\s+', ' ', tr_sent).strip()
    tr_sent = re.sub(r'\.+', '.', tr_sent)
    
    target_word = comp['v']
    blank_sent = en_sent.replace(target_word, "___")
    
    all_sentences.append({
        "en": en_sent,
        "tr": tr_sent,
        "word": target_word,
        "trWord": comp['v_tr'],
        "blank": blank_sent
    })

# Set 3: Genişletilmiş Nesneler (30 sentences)
for comp in components:
    # Note: In English text, for validation finding, the docx had:
    # "The finding validates alternative alternative scientific hypotheses."
    # Let's replicate that exact sentence if it's in the component
    o2_to_use = comp['o2']
    if comp['v'] == "validates":
        o2_to_use = "alternative alternative scientific hypotheses."
    if comp['v'] == "maximize":
        o2_to_use = "maximum annual manufacturing efficiency."
        
    en_sent = f"{comp['s1']} {comp['v']} {o2_to_use}"
    tr_sent = f"{comp['s1_tr']} {comp['o2_tr']} {comp['v_tr']}."
    tr_sent = re.sub(r'\s+', ' ', tr_sent).strip()
    tr_sent = re.sub(r'\.+', '.', tr_sent)
    
    target_word = comp['v']
    blank_sent = en_sent.replace(target_word, "___")
    
    all_sentences.append({
        "en": en_sent,
        "tr": tr_sent,
        "word": target_word,
        "trWord": comp['v_tr'],
        "blank": blank_sent
    })

# Set 4: Tam Genişletilmiş SVO (30 sentences)
for comp in components:
    o2_to_use = comp['o2']
    if comp['v'] == "validates":
        o2_to_use = "alternative alternative scientific hypotheses."
    if comp['v'] == "maximize":
        o2_to_use = "maximum annual manufacturing efficiency."
        
    en_sent = f"{comp['s2']} {comp['v']} {o2_to_use}"
    tr_sent = f"{comp['s2_tr']} {comp['o2_tr']} {comp['v_tr']}."
    tr_sent = re.sub(r'\s+', ' ', tr_sent).strip()
    tr_sent = re.sub(r'\.+', '.', tr_sent)
    
    target_word = comp['v']
    blank_sent = en_sent.replace(target_word, "___")
    
    all_sentences.append({
        "en": en_sent,
        "tr": tr_sent,
        "word": target_word,
        "trWord": comp['v_tr'],
        "blank": blank_sent
    })

print(f"Generated {len(all_sentences)} sentences.")

# Let's extract all unique words from these 120 sentences to compare with wordDictionary in app.js
unique_words = set()
for s in all_sentences:
    # clean punctuation, digits, split
    cleaned = re.sub(r'[^\w\s-]', ' ', s['en'])
    for w in cleaned.split():
        w = w.strip().lower()
        if w and not w.isdigit():
            unique_words.add(w)

print(f"Total unique words in Unit 7: {len(unique_words)}")

# Read app.js wordDictionary
with open("app.js", "r", encoding="utf-8") as f:
    app_content = f.read()

dict_match = re.search(r'const wordDictionary = \{(.*?)\};', app_content, re.DOTALL)
dict_keys = set()
if dict_match:
    dict_content = dict_match.group(1)
    dict_keys = set(re.findall(r'["\']([^"\']+)["\']\s*:', dict_content))

# Find missing words
missing = sorted(list(unique_words - dict_keys))
print(f"Missing words in app.js ({len(missing)}):")

# Simple dictionary for Turkish translations of the words
# Let's populate translations for words that could be in Section 7
word_tr_map = {
    "contradicts": "çelişir",
    "specifies": "belirler",
    "anticipates": "öngörür",
    "advocate": "savunur",
    "triggers": "tetikler",
    "clarify": "açıklar",
    "induces": "yol açar",
    "distorts": "bozar",
    "manipulates": "manipüle eder",
    "accommodates": "uyum sağlar",
    "defines": "tanımlar",
    "binds": "bağlar",
    "inspect": "inceler",
    "affects": "etkiler",
    "stabilizes": "stabilize eder",
    "illustrates": "gösterir",
    "restricts": "kısıtlar",
    "validates": "doğrular",
    "modifies": "değiştirir",
    "evaluates": "değerlendirir",
    "isolates": "izole eder",
    "maximize": "maksimize eder",
    "calculates": "hesaplar",
    "exposes": "ortaya çıkarır",
    "alters": "değiştirir",
    "secures": "güvenceye alır",
    "suspended": "askıya aldı",
    "terminated": "feshetti",
    "conducted": "yürüttü",
    "accumulates": "biriktirir",
    "anomaly": "anomali",
    "chain": "zincir",
    "exact": "kesin / tam",
    "excellent": "mükemmel",
    "finding": "bulgu",
    "flaws": "kusurlar / hatalar",
    "graph": "grafik",
    "independent": "bağımsız",
    "logs": "günlükler",
    "maximum": "maksimum",
    "modules": "modüller",
    "protocol": "protokol",
    "ratios": "oranlar",
    "reform": "reform",
    "safety": "güvenlik",
    "scientific": "bilimsel",
    "scope": "kapsam",
    "script": "betik / kod",
    "strategies": "stratejiler",
    "stress": "stres",
    "variables": "değişkenler",
    "theory": "teori",
    
    "newly": "yeni",
    "collected": "toplanan",
    "empirical": "deneysel",
    "broader": "daha geniş",
    "socio-economic": "sosyo-ekonomik",
    "highly": "son derece",
    "competitive": "rekabetçi",
    "unpredictable": "öngörülemeyen",
    "unpredictable": "öngörülemeyen",
    "continuous": "sürekli",
    "undetected": "tespit edilemeyen",
    "mainstream": "ana akım",
    "updated": "güncellenmiş",
    "operational": "operasyonel",
    "revised": "gözden geçirilmiş",
    "legally": "yasal olarak",
    "binding": "bağlayıcı",
    "reinforced": "güçlendirilmiş",
    "central": "merkezi",
    "attached": "ekli",
    "statistical": "istatistiksel",
    "strict": "katı",
    "institutional": "kurumsal",
    "final": "nihai",
    "principal": "baş / temel",
    "laboratory": "laboratuvar",
    "innovative": "yenilikçi",
    "corporate": "kurumsal",
    "automated": "otomatik",
    "background": "arka plan",
    "annual": "yıllık",
    "sudden": "ani",
    "paradigm": "paradigma",
    "advanced": "gelişmiş",
    "cryptographic": "kriptografik",
    "regional": "bölgesel",
    "administrative": "idari",
    "executive": "yürütücü / yönetim",
    "internal": "iç / dahili",
    "national": "ulusal / milli",
    "education": "eğitim",
    "centralized": "merkezi",
    "cloud": "bulut",
    
    "long-standing": "uzun süredir var olan",
    "theoretical": "teorik",
    "qualitative": "nitel",
    "selection": "seçim",
    "significant": "önemli",
    "comprehensive": "kapsamlı",
    "legislative": "yasal / mevzuatla ilgili",
    "negative": "olumsuz / negatif",
    "physical": "fiziksel",
    "reactions": "tepkiler / reaksiyonlar",
    "investigative": "araştırmacı / soruşturmacı",
    "severe": "ciddi / şiddetli",
    "psychological": "psikolojik",
    "occupational": "mesleki",
    "public": "kamu / toplumsal",
    "political": "siyasi / politik",
    "cultural": "kültürel",
    "infrastructure": "altyapı",
    "unauthorized": "yetkisiz",
    "network": "ağ",
    "alternative": "alternatif",
    "functional": "fonksiyonel",
    "anonymous": "anonim / adsız",
    "unstable": "kararsız / istikrarsız",
    "manufacturing": "üretim",
    "mathematical": "matematiksel",
    "organizational": "örgütsel / kurumsal",
    "consumer": "tüketici",
    "behavior": "davranış",
    "sensitive": "hassas",
    "outdated": "güncelliğini yitirmiş / eski",
    "environmental": "çevresel",
    "bilateral": "ikili",
    "commercial": "ticari",
    "educational": "eğitimsel / eğitim",
    "historical": "tarihsel / geçmiş",
    "senior": "kıdemli"
}

# Print dictionary additions
print("\nwordDictionary additions:")
for m in missing:
    tr = word_tr_map.get(m, m)
    print(f'  "{m}": "{tr}",')

# Save JavaScript arrays to a temporary file scratch/js_arrays.txt
import json
js_data = "const unit7LessonSentences = {\n  1: " + json.dumps(all_sentences, indent=2, ensure_ascii=False) + "\n};\n"
with open("scratch/js_arrays.txt", "w", encoding="utf-8") as f_out:
    f_out.write(js_data)

print("\nSaved unit7LessonSentences to scratch/js_arrays.txt")
