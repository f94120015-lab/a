import re
import json
import os

components = [
    # 1
    {
        "en_simple": "The project is abandoned.", "tr_simple": "Proje terk edilir.",
        "en_negative": "The project is not abandoned.", "tr_negative": "Proje terk edilmez.",
        "en_agent": "The project is abandoned by the team.", "tr_agent": "Proje ekip tarafından terk edilir.",
        "en_full": "The initial investigative project is abandoned by the software development team.", "tr_full": "İlk araştırma projesi yazılım geliştirme ekibi tarafından terk edilir.",
        "word": "abandoned", "trWord": "terk edilir"
    },
    # 2
    {
        "en_simple": "Growth is anticipated.", "tr_simple": "Büyüme öngörülür.",
        "en_negative": "Growth is not anticipated.", "tr_negative": "Büyüme öngörülmez.",
        "en_agent": "Growth is anticipated by analysts.", "tr_agent": "Büyüme analistler tarafından öngörülür.",
        "en_full": "Significant annual financial growth is anticipated by senior financial analysts.", "tr_full": "Önemli yıllık finansal büyüme kıdemli finansal analistler tarafından öngörülür.",
        "word": "anticipated", "trWord": "öngörülür"
    },
    # 3
    {
        "en_simple": "The dynamic is triggered.", "tr_simple": "Dinamik tetiklenir.",
        "en_negative": "The dynamic is not triggered.", "tr_negative": "Dinamik tetiklenmez.",
        "en_agent": "The dynamic is triggered by reactions.", "tr_agent": "Dinamik tepkiler tarafından tetiklenir.",
        "en_full": "This unpredictable economic dynamic is triggered by a chain of negative physical reactions.", "tr_full": "Bu öngörülemeyen ekonomik dinamik bir dizi olumsuz fiziksel tepki tarafından tetiklenir.",
        "word": "triggered", "trWord": "tetiklenir"
    },
    # 4
    {
        "en_simple": "Context is specified.", "tr_simple": "Bağlam belirlenir.",
        "en_negative": "Context is not specified.", "tr_negative": "Bağlam belirlenmez.",
        "en_agent": "Context is specified by criteria.", "tr_agent": "Bağlam kriterler tarafından belirlenir.",
        "en_full": "The broader socio-economic context is specified by the strict qualitative selection criteria.", "tr_full": "Daha geniş sosyo-ekonomik bağlam katı nitel seçim kriterleri tarafından belirlenir.",
        "word": "specified", "trWord": "belirlenir"
    },
    # 5
    {
        "en_simple": "Reform is advocated.", "tr_simple": "Reform savunulur.",
        "en_negative": "Reform is not advocated.", "tr_negative": "Reform savunulmaz.",
        "en_agent": "Reform is advocated by authorities.", "tr_agent": "Reform yetkililer tarafından savunulur.",
        "en_full": "Comprehensive legislative tax reform is advocated by leading institutional authorities.", "tr_full": "Kapsamlı yasal vergi reformu önde gelen kurumsal yetkililer tarafından savunulur.",
        "word": "advocated", "trWord": "savunulur"
    },
    # 6
    {
        "en_simple": "The sector is expanded.", "tr_simple": "Sektör genişletilir.",
        "en_negative": "The sector is not expanded.", "tr_negative": "Sektör genişletilmez.",
        "en_agent": "The sector is expanded by infrastructure.", "tr_agent": "Sektör altyapı tarafından genişletilir.",
        "en_full": "The highly competitive dynamic sector is expanded by rapid regional infrastructure expansion.", "tr_full": "Son derece rekabetçi dinamik sektör hızlı bölgesel altyapı genişlemesi tarafından genişletilir.",
        "word": "expanded", "trWord": "genişletilir"
    },
    # 7
    {
        "en_simple": "Parameters are defined.", "tr_simple": "Parametreler tanımlanır.",
        "en_negative": "Parameters are not defined.", "tr_negative": "Parametreler tanımlanmaz.",
        "en_agent": "Parameters are defined by the protocol.", "tr_agent": "Parametreler protokol tarafından tanımlanır.",
        "en_full": "Crucial technical system parameters are defined by the revised security protocol.", "tr_full": "Kritik teknik sistem parametreleri gözden geçirilmiş güvenlik protokolü tarafından tanımlanır.",
        "word": "defined", "trWord": "tanımlanır"
    },
    # 8
    {
        "en_simple": "Ratios are calculated.", "tr_simple": "Oranlar hesaplanır.",
        "en_negative": "Ratios are not calculated.", "tr_negative": "Oranlar hesaplanmaz.",
        "en_agent": "Ratios are calculated by the script.", "tr_agent": "Oranlar betik tarafından hesaplanır.",
        "en_full": "Complex mathematical data ratios are calculated by the automated background script.", "tr_full": "Karmaşık matematiksel veri oranları otomatik arka plan betiği tarafından hesaplanır.",
        "word": "calculated", "trWord": "hesaplanır"
    },
    # 9
    {
        "en_simple": "The framework is inspected.", "tr_simple": "Çerçeve incelenir.",
        "en_negative": "The framework is not inspected.", "tr_negative": "Çerçeve incelenmez.",
        "en_agent": "The framework is inspected by experts.", "tr_agent": "Çerçeve uzmanlar tarafından incelenir.",
        "en_full": "The entire underlying structural framework is inspected by independent technical experts.", "tr_full": "Tüm temel yapısal çerçeve bağımsız teknik uzmanlar tarafından incelenir.",
        "word": "inspected", "trWord": "incelenir"
    },
    # 10
    {
        "en_simple": "Insights are derived.", "tr_simple": "Çıkarımlar elde edilir.",
        "en_negative": "Insights are not derived.", "tr_negative": "Çıkarımlar elde edilmez.",
        "en_agent": "Insights are derived by researchers.", "tr_agent": "Çıkarımlar araştırmacılar tarafından elde edilir.",
        "en_full": "Valuable qualitative insights are derived from comprehensive regional educational surveys.", "tr_full": "Değerli nitel çıkarımlar kapsamlı bölgesel eğitim anketlerinden elde edilir.",
        "word": "derived", "trWord": "elde edilir"
    },
    # 11
    {
        "en_simple": "Hypotheses were validated.", "tr_simple": "Hipotezler doğrulandı.",
        "en_negative": "Hypotheses were not validated.", "tr_negative": "Hipotezler doğrulanmadı.",
        "en_agent": "Hypotheses were validated by the finding.", "tr_agent": "Hipotezler bulgu tarafından doğrulandı.",
        "en_full": "Alternative scientific hypotheses were validated by the final scientific finding.", "tr_full": "Alternatif bilimsel hipotezler nihai bilimsel bulgu tarafından doğrulandı.",
        "word": "validated", "trWord": "doğrulandı"
    },
    # 12
    {
        "en_simple": "The anomaly was detected.", "tr_simple": "Anomali tespit edildi.",
        "en_negative": "The anomaly was not detected.", "tr_negative": "Anomali tespit edilmedi.",
        "en_agent": "The anomaly was detected by the researcher.", "tr_agent": "Anomali araştırmacı tarafından tespit edildi.",
        "en_full": "The undetected structural anomaly was detected by the principal laboratory researcher.", "tr_full": "Tespit edilemeyen yapısal anomali baş laboratuvar araştırmacısı tarafından tespit edildi.",
        "word": "detected", "trWord": "tespit edildi"
    },
    # 13
    {
        "en_simple": "Rules were suspended.", "tr_simple": "Kurallar askıya alındı.",
        "en_negative": "Rules were not suspended.", "tr_negative": "Kurallar askıya alınmadı.",
        "en_agent": "Rules were suspended by the council.", "tr_agent": "Kurallar konsey tarafından askıya alındı.",
        "en_full": "Outdated environmental safety regulations were suspended by the regional administrative council.", "tr_full": "Güncelliğini yitirmiş çevresel güvenlik düzenlemeleri bölgesel idari konsey tarafından askıya alındı.",
        "word": "suspended", "trWord": "askıya alındı"
    },
    # 14
    {
        "en_simple": "Agreements were not terminated.", "tr_simple": "Anlaşmalar feshedilmedi.",
        "en_negative": "Agreements were not terminated.", "tr_negative": "Anlaşmalar feshedilmedi.",
        "en_agent": "Agreements were terminated by the board.", "tr_agent": "Anlaşmalar yönetim kurulu tarafından feshedildi.",
        "en_full": "Formal bilateral commercial agreements were terminated by the executive internal board.", "tr_full": "Resmi ikili ticari anlaşmalar yürütme iç kurulu tarafından feshedildi.",
        "word": "terminated", "trWord": "feshedildi"
    },
    # 15
    {
        "en_simple": "Surveys were conducted.", "tr_simple": "Anketler yürütüldü.",
        "en_negative": "Surveys were not conducted.", "tr_negative": "Anketler yürütülmedi.",
        "en_agent": "Surveys were conducted by the ministry.", "tr_agent": "Anketler bakanlık tarafından yürütüldü.",
        "en_full": "Comprehensive regional educational surveys were conducted by the national education ministry.", "tr_full": "Kapsamlı bölgesel eğitim anketleri milli eğitim bakanlığı tarafından yürütüldü.",
        "word": "conducted", "trWord": "yürütüldü"
    },
    # 16
    {
        "en_simple": "Media was manipulated.", "tr_simple": "Medya manipüle edildi.",
        "en_negative": "Media was not manipulated.", "tr_negative": "Medya manipüle edilmedi.",
        "en_agent": "Media was manipulated by agencies.", "tr_agent": "Medya ajanslar tarafından manipüle edildi.",
        "en_full": "Public political and cultural perspective was manipulated by mainstream digital media.", "tr_full": "Kamuoyunun siyasi ve kültürel bakış açısı ana akım dijital medya tarafından manipüle edildi.",
        "word": "manipulated", "trWord": "manipüle edildi"
    },
    # 17
    {
        "en_simple": "The scope was clarified.", "tr_simple": "Kapsam açıklandı.",
        "en_negative": "The scope was not clarified.", "tr_negative": "Kapsam açıklanmadı.",
        "en_agent": "The scope was clarified by experts.", "tr_agent": "Kapsam uzmanlar tarafından açıklandı.",
        "en_full": "The initial investigative project scope was clarified by independent technical experts.", "tr_full": "Başlangıçtaki araştırma projesi kapsamı bağımsız teknik uzmanlar tarafından açıklandı.",
        "word": "clarified", "trWord": "açıklandı"
    },
    # 18
    {
        "en_simple": "Inputs were modified.", "tr_simple": "Girdiler değiştirildi.",
        "en_negative": "Inputs were not modified.", "tr_negative": "Girdiler değiştirilmedi.",
        "en_agent": "Inputs were modified by developers.", "tr_agent": "Girdiler geliştiriciler tarafından değiştirildi.",
        "en_full": "Individual functional software modules were modified by the software development team.", "tr_full": "Bireysel fonksiyonel yazılım modülleri yazılım geliştirme ekibi tarafından değiştirildi.",
        "word": "modified", "trWord": "değiştirildi"
    },
    # 19
    {
        "en_simple": "Modules were integrated.", "tr_simple": "Modüller entegre edildi.",
        "en_negative": "Modules were not integrated.", "tr_negative": "Modüller entegre edilmedi.",
        "en_agent": "Modules were integrated by the team.", "tr_agent": "Modüller ekip tarafından entegre edildi.",
        "en_full": "Separate unstable chemical variables were integrated into the continuous chemical process.", "tr_full": "Ayrı kararsız kimyasal değişkenler sürekli kimyasal sürece entegre edildi.",
        "word": "integrated", "trWord": "entegre edildi"
    },
    # 20
    {
        "en_simple": "Data was processed.", "tr_simple": "Veri işlendi.",
        "en_negative": "Data was not processed.", "tr_negative": "Veri işlenmedi.",
        "en_agent": "Data was processed by the database.", "tr_agent": "Veri veritabanı tarafından işlendi.",
        "en_full": "The newly collected empirical data was processed by the centralized cloud database.", "tr_full": "Yeni toplanan deneysel veriler merkezi bulut veritabanı tarafından işlendi.",
        "word": "processed", "trWord": "işlendi"
    },
    # 21
    {
        "en_simple": "Access will be restricted.", "tr_simple": "Erişim kısıtlanacak.",
        "en_negative": "Access will not be restricted.", "tr_negative": "Erişim kısıtlanmayacak.",
        "en_agent": "Access will be restricted by the policy.", "tr_agent": "Erişim politika tarafından kısıtlanacak.",
        "en_full": "Unauthorized user network access will be restricted by the strict institutional policy.", "tr_full": "Yetkisiz kullanıcı ağ erişimi katı kurumsal politika tarafından kısıtlanacak.",
        "word": "restricted", "trWord": "kısıtlanacak"
    },
    # 22
    {
        "en_simple": "The core will be stabilized.", "tr_simple": "Çekirdek stabilize edilecek.",
        "en_negative": "The core will not be stabilized.", "tr_negative": "Çekirdek stabilize edilmeyecek.",
        "en_agent": "The core will be stabilized by components.", "tr_agent": "Çekirdek bileşenler tarafından stabilize edilecek.",
        "en_full": "Crucial internal device components will be stabilized by the reinforced central core.", "tr_full": "Kritik dahili cihaz bileşenleri güçlendirilmiş merkezi çekirdek tarafından stabilize edilecek.",
        "word": "stabilized", "trWord": "stabilize edilecek"
    },
    # 23
    {
        "en_simple": "Formats will be altered.", "tr_simple": "Formatlar değiştirilecek.",
        "en_negative": "Formats will not be altered.", "tr_negative": "Formatlar değiştirilmeyecek.",
        "en_agent": "Formats will be altered by the shift.", "tr_agent": "Formatlar değişim tarafından değiştirilecek.",
        "en_full": "Exact distribution and demographic formats will be altered by the sudden paradigm shift.", "tr_full": "Kesin dağılım ve demografik formatlar ani paradigma değişimi tarafından değiştirilecek.",
        "word": "altered", "trWord": "değiştirilecek"
    },
    # 24
    {
        "en_simple": "Flaws will be exposed.", "tr_simple": "Kusurlar ortaya çıkarılacak.",
        "en_negative": "Flaws will not be exposed.", "tr_negative": "Kusurlar ortaya çıkarılmayacak.",
        "en_agent": "Flaws will be exposed by the audit.", "tr_agent": "Kusurlar denetim tarafından ortaya çıkarılacak.",
        "en_full": "Hidden organizational system flaws will be exposed by the independent annual audit.", "tr_full": "Gizli örgütsel sistem kusurları bağımsız yıllık denetim tarafından ortaya çıkarılacak.",
        "word": "exposed", "trWord": "ortaya çıkarılacak"
    },
    # 25
    {
        "en_simple": "Stress will be induced.", "tr_simple": "Strese yol açılacak.",
        "en_negative": "Stress will not be induced.", "tr_negative": "Strese yol açılmayacak.",
        "en_agent": "Stress will be induced by the process.", "tr_agent": "Strese süreç tarafından yol açılacak.",
        "en_full": "Severe psychological and occupational stress will be induced by the continuous chemical process.", "tr_full": "Ciddi psikolojik ve mesleki strese sürekli kimyasal süreç tarafından yol açılacak.",
        "word": "induced", "trWord": "yol açılacak"
    },
    # 26
    {
        "en_simple": "Logs have been accumulated.", "tr_simple": "Günlükler biriktirilmiştir.",
        "en_negative": "Logs have not been accumulated.", "tr_negative": "Günlükler biriktirilmemiştir.",
        "en_agent": "Logs have been accumulated by the database.", "tr_agent": "Günlükler veritabanı tarafından biriktirilmiştir.",
        "en_full": "Detailed historical system logs have been accumulated by the centralized cloud database.", "tr_full": "Detaylı geçmiş sistem günlükleri merkezi bulut veritabanı tarafından biriktirilmiştir.",
        "word": "accumulated", "trWord": "biriktirilmiştir"
    },
    # 27
    {
        "en_simple": "Privacy has been violated.", "tr_simple": "Gizlilik ihlal edilmiştir.",
        "en_negative": "Privacy has not been violated.", "tr_negative": "Gizlilik ihlal edilmemiştir.",
        "en_agent": "Privacy has been violated by software.", "tr_agent": "Gizlilik yazılım tarafından ihlal edilmiştir.",
        "en_full": "Sensitive user information privacy has been violated by the unauthorized network access.", "tr_full": "Hassas kullanıcı bilgileri gizliliği yetkisiz ağ erişimi tarafından ihlal edilmiştir.",
        "word": "violated", "trWord": "ihlal edilmiştir"
    },
    # 28
    {
        "en_simple": "Resources have been allocated.", "tr_simple": "Kaynaklar tahsis edilmiştir.",
        "en_negative": "Resources have not been allocated.", "tr_negative": "Kaynaklar tahsis edilmemiştir.",
        "en_agent": "Resources have been allocated by strategies.", "tr_agent": "Kaynaklar stratejiler tarafından tahsis edilmiştir.",
        "en_full": "Maximum annual manufacturing resources have been allocated by innovative corporate strategies.", "tr_full": "Maksimum yıllık üretim kaynakları yenilikçi kurumsal stratejiler tarafından tahsis edilmiştir.",
        "word": "allocated", "trWord": "tahsis edilmiştir"
    },
    # 29
    {
        "en_simple": "Funds have been shifted.", "tr_simple": "Fonlar kaydırılmıştır.",
        "en_negative": "Funds have not been shifted.", "tr_negative": "Fonlar kaydırılmamıştır.",
        "en_agent": "Funds have been shifted by the committee.", "tr_agent": "Fonlar komite tarafından kaydırılmıştır.",
        "en_full": "Separate international research funds have been shifted by the ethics evaluation committee.", "tr_full": "Ayrı uluslararası araştırma fonları etik değerlendirme komitesi tarafından kaydırılmıştır.",
        "word": "shifted", "trWord": "kaydırılmıştır"
    },
    # 30
    {
        "en_simple": "Output has been maximized.", "tr_simple": "Çıktı maksimize edilmiştir.",
        "en_negative": "Output has not been maximized.", "tr_negative": "Çıktı maksimize edilmemiştir.",
        "en_agent": "Output has been maximized by strategies.", "tr_agent": "Çıktı stratejiler tarafından maksimize edilmiştir.",
        "en_full": "Maximum annual manufacturing output has been maximized by innovative corporate strategies.", "tr_full": "Maksimum yıllık üretim çıktısı yenilikçi kurumsal stratejiler tarafından maksimize edilmiştir.",
        "word": "maximized", "trWord": "maksimize edilmiştir"
    }
]

# Generate the 120 sentences:
# 1. Simple (30)
# 2. Negative (30)
# 3. Agent (30)
# 4. Full (30)
all_sentences = []

# Set 1: Simple Passive
for comp in components:
    blank_val = comp['en_simple'].replace(comp['word'], "___")
    all_sentences.append({
        "en": comp['en_simple'],
        "tr": comp['tr_simple'],
        "word": comp['word'],
        "trWord": comp['trWord'],
        "blank": blank_val
    })

# Set 2: Negative Passive
for comp in components:
    blank_val = comp['en_negative'].replace(comp['word'], "___")
    all_sentences.append({
        "en": comp['en_negative'],
        "tr": comp['tr_negative'],
        "word": comp['word'],
        "trWord": "değildir" if "is not" in comp['en_negative'] else comp['trWord'].replace("di", "di").replace("ti", "ti"), # trWord for matching
        "blank": blank_val
    })
    # Wait, let's look at negative verb matching:
    # "is not abandoned" -> trWord: "terk edilmez" (let's use the actual verb's negative translation as trWord)
    all_sentences[-1]["trWord"] = comp['tr_negative'].split()[-1].rstrip('.')

# Set 3: Passive with Agent
for comp in components:
    blank_val = comp['en_agent'].replace(comp['word'], "___")
    all_sentences.append({
        "en": comp['en_agent'],
        "tr": comp['tr_agent'],
        "word": comp['word'],
        "trWord": comp['trWord'],
        "blank": blank_val
    })

# Set 4: Full Passive
for comp in components:
    blank_val = comp['en_full'].replace(comp['word'], "___")
    all_sentences.append({
        "en": comp['en_full'],
        "tr": comp['tr_full'],
        "word": comp['word'],
        "trWord": comp['trWord'],
        "blank": blank_val
    })

print(f"Generated {len(all_sentences)} sentences.")

# Load app.js and update wordDictionary
print("\n--- Step 1: Update app.js Word Dictionary ---")
vocab_updates = {
    "violated": "ihlal edilen / ihlal edildi / ihlal edilmiştir",
    "shifted": "değiştirilen / kaydırılan / aktarılan / kaydırılmıştır",
    "maximized": "maksimize edilen / maksimize edildi / maksimize edilmiştir",
    "stabilized": "stabilize edilen / stabilize edildi / stabilize edilecek",
    "clarified": "açıklanan / netleştirilen / açıklandı / netleştirildi",
    "manipulated": "manipüle edilen / manipüle edildi",
    "detected": "tespit edilen / tespit edildi",
    "suspended": "askıya aldı / askıya alındı",
    "validated": "doğrulanan / doğrulandı",
    "derived": "türetilen / elde edilen / çıkarılan"
}

with open("app.js", "r", encoding="utf-8") as f:
    app_js = f.read()

dict_pattern = re.compile(r'(const wordDictionary\s*=\s*\{)(.*?)(\};)', re.DOTALL)
match = dict_pattern.search(app_js)
if not match:
    print("Error: wordDictionary not found in app.js")
    exit(1)

dict_start, dict_body, dict_end = match.groups()

entry_pattern = re.compile(r'^\s*["\']([^"\']+)["\']\s*:\s*["\']([^"\']+)["\']\s*,?\s*$', re.MULTILINE)
existing_dict = {}
for k, v in entry_pattern.findall(dict_body):
    existing_dict[k] = v

print(f"Loaded {len(existing_dict)} existing dictionary entries.")

for new_k, new_v in vocab_updates.items():
    existing_dict[new_k.lower()] = new_v

sorted_keys = sorted(existing_dict.keys())

new_body_lines = ["\n"]
for k in sorted_keys:
    escaped_val = existing_dict[k].replace('"', '\\"')
    new_body_lines.append(f'  "{k}": "{escaped_val}",')
if new_body_lines:
    new_body_lines[-1] = new_body_lines[-1].rstrip(',')
new_body_lines.append("\n")

new_dict_body = "\n".join(new_body_lines)
updated_app_js = app_js[:match.start()] + dict_start + new_dict_body + dict_end + app_js[match.end():]

with open("app.js", "w", encoding="utf-8") as f:
    f.write(updated_app_js)
print("app.js dictionary updated successfully.")


print("\n--- Step 2: Update data.js with unit10LessonSentences ---")
with open("data.js", "r", encoding="utf-8") as f:
    data_js = f.read()

# Generate the JSON array string formatting
js_sentences_str = json.dumps(all_sentences, indent=2, ensure_ascii=False)
unit10_def = f"const unit10LessonSentences = {{\n  1: {js_sentences_str}\n}};"

insert_marker = "const unit12LessonSentences ="
if insert_marker not in data_js:
    print("Error: Could not find const unit12LessonSentences in data.js")
    exit(1)

# Clean up any existing unit10LessonSentences
if "const unit10LessonSentences =" in data_js:
    print("Warning: unit10LessonSentences already exists in data.js, replacing it...")
    u10_start = data_js.find("const unit10LessonSentences =")
    u12_start = data_js.find(insert_marker)
    data_js = data_js[:u10_start] + unit10_def + "\n\n" + data_js[u12_start:]
else:
    u12_start = data_js.find(insert_marker)
    data_js = data_js[:u12_start] + unit10_def + "\n\n" + data_js[u12_start:]
print("unit10LessonSentences inserted.")


print("\n--- Step 3: Update unitSentencesMap[10] in data.js ---")
# Generate 12 exercises for Unit 10 Lesson 28
exercise_lines = []
for idx in range(12):
    offset_val = idx * 10
    exercise_lines.append(f"      buildCustom10QuestionExercises(unit10LessonSentences[1], 10, 28, {idx+1}, {offset_val})")

exercises_str = ",\n".join(exercise_lines)

new_map_str = f"""  10: {{
    1: {{ exercises: [
{exercises_str}
    ] }}
  }},"""

# Search inside unitSentencesMap
map_start = data_js.find("const unitSentencesMap = {")
if map_start == -1:
    print("Error: Could not find const unitSentencesMap in data.js")
    exit(1)

# Find 10: block
match_map = re.search(r'10:\s*\{.*?\}\s*,', data_js[map_start:], re.DOTALL)
if match_map:
    match_start = map_start + match_map.start()
    match_end = map_start + match_map.end()
    data_js = data_js[:match_start] + new_map_str + data_js[match_end:]
    print("unitSentencesMap[10] updated successfully.")
else:
    print("Error: Could not find unitSentencesMap[10] block in data.js")
    exit(1)

# Also let's update the description and formula of Unit 10 in rawTopics to match the passive academic guide!
old_topic_part = """    title: "X. Edilgen (Passive) Yapısı (Sayfa 55)",
    desc: "Edilgen çatıdaki cümle yapıları ve zamanlarla çekimleri",
    icon: "📗",
    numLessons: 1,
    formulas: [
      { formula: "Subject + Be + Past Participle (V3)", example: "Coal is obtained from the mines: Kömür madenlerden elde edilir" }
    ],"""

new_topic_part = """    title: "X. Edilgen (Passive) Yapısı (Sayfa 55)",
    desc: "Edilgen çatıdaki cümle yapıları ve zamanlarla çekimleri",
    icon: "📗",
    numLessons: 1,
    formulas: [
      { 
        formula: "Subject + Be + Past Participle (V3)", 
        example: "Coal is obtained from the mines: Kömür madenlerden elde edilir",
        description: "Akademik metinlerin en çok zorlayan kısmı olan bu uzun cümlelerde, öznelerin ve nesnelerin önüne upuzun sıfat tamlamaları gelir. Bu cümleleri çözerken: Önce cümlenin en sonundaki yükleme bakıp zamanı ve edilgenliği yakalayın (is abandoned terk edilir, was processed işlendi). Ardından cümlenin en başındaki uzun sıfat tamlamasını tek bir blok olarak Türkçe özneye dönüştürün. En son 'by' ile başlayan kısmı ekleyerek cümleyi sondan başa doğru toparlayın."
      }
    ],"""

if old_topic_part in data_js:
    data_js = data_js.replace(old_topic_part, new_topic_part)
    print("rawTopics[9] updated successfully.")

with open("data.js", "w", encoding="utf-8") as f:
    f.write(data_js)
print("data.js saved successfully.")
print("\nUpdate completed successfully!")
