import os
import re

# 90 vocabulary words to add with their Turkish translations
vocab_updates = {
    "accommodates": "uyum sağlar",
    "accumulates": "biriktirir",
    "advocate": "savunur",
    "affects": "etkiler",
    "anomaly": "anomali",
    "anonymous": "anonim / adsız",
    "anticipates": "öngörür",
    "attached": "ekli",
    "automated": "otomatik",
    "background": "arka plan",
    "bilateral": "ikili",
    "binds": "bağlar",
    "broader": "daha geniş",
    "calculates": "hesaplar",
    "centralized": "merkezi",
    "chain": "zincir",
    "clarify": "açıklar",
    "cloud": "bulut",
    "commercial": "ticari",
    "conducted": "yürüttü",
    "consumer": "tüketici",
    "continuous": "sürekli",
    "contradicts": "çelişir",
    "cryptographic": "kriptografik",
    "defines": "tanımlar",
    "distorts": "bozar",
    "evaluates": "değerlendirir",
    "exact": "kesin / tam",
    "excellent": "mükemmel",
    "executive": "yürütücü / yönetim",
    "exposes": "ortaya çıkarır",
    "finding": "bulgu",
    "flaws": "kusurlar / hatalar",
    "functional": "fonksiyonel",
    "graph": "grafik",
    "illustrates": "gösterir",
    "independent": "bağımsız",
    "induces": "yol açar",
    "infrastructure": "altyapı",
    "innovative": "yenilikçi",
    "inspect": "inceler",
    "investigative": "araştırmacı / soruşturmacı",
    "isolates": "izole eder",
    "logs": "günlükler",
    "long-standing": "uzun süredir var olan",
    "mainstream": "ana akım",
    "manipulates": "manipüle eder",
    "manufacturing": "üretim",
    "mathematical": "matematiksel",
    "maximize": "maksimize eder",
    "maximum": "maksimum",
    "modifies": "değiştirir",
    "modules": "modüller",
    "national": "ulusal / milli",
    "occupational": "mesleki",
    "operational": "operasyonel",
    "organizational": "örgütsel / kurumsal",
    "outdated": "güncelliğini yitirmiş / eski",
    "paradigm": "paradigma",
    "political": "siyasi / politik",
    "principal": "baş / temel",
    "protocol": "protokol",
    "psychological": "psikolojik",
    "public": "kamu / toplumsal",
    "qualitative": "nitel",
    "ratios": "oranlar",
    "reactions": "tepkiler / reaksiyonlar",
    "reform": "reform",
    "reinforced": "güçlendirilmiş",
    "restricts": "kısıtlar",
    "revised": "gözden geçirilmiş",
    "safety": "güvenlik",
    "scientific": "bilimsel",
    "scope": "kapsam",
    "script": "betik / kod",
    "secures": "güvenceye alır",
    "senior": "kıdemli",
    "sensitive": "hassas",
    "socio-economic": "sosyo-ekonomik",
    "specifies": "belirler",
    "strategies": "stratejiler",
    "stress": "stres",
    "sudden": "ani",
    "suspended": "askıya aldı",
    "terminated": "feshetti",
    "triggers": "tetikler",
    "unauthorized": "yetkisiz",
    "undetected": "tespit edilemeyen",
    "unpredictable": "öngörülemeyen",
    "validates": "doğrular"
}

# --- Step 1: Update app.js Word Dictionary ---
print("Updating wordDictionary in app.js...")
with open("app.js", "r", encoding="utf-8") as f:
    app_js = f.read()

# Find the wordDictionary definition: const wordDictionary = { ... };
dict_pattern = re.compile(r'(const wordDictionary\s*=\s*\{)(.*?)(\};)', re.DOTALL)
match = dict_pattern.search(app_js)
if not match:
    print("Error: wordDictionary not found in app.js")
    exit(1)

dict_start, dict_body, dict_end = match.groups()

# Parse the key-value pairs in dict_body
# Pairs are typically like:   "key": "value",
entry_pattern = re.compile(r'^\s*["\']([^"\']+)["\']\s*:\s*["\']([^"\']+)["\']\s*,?\s*$', re.MULTILINE)
existing_dict = {}
for k, v in entry_pattern.findall(dict_body):
    existing_dict[k] = v

print(f"Loaded {len(existing_dict)} existing dictionary entries.")

# Merge new words (case-insensitive keys check, let's keep all keys lowercase for dictionary lookup)
# In app.js, dictionary keys are typically lowercase. Let's force lowercase for key entries.
for new_k, new_v in vocab_updates.items():
    existing_dict[new_k.lower()] = new_v

# Sort all keys alphabetically
sorted_keys = sorted(existing_dict.keys())

# Build the new dict_body string
new_body_lines = ["\n"]
for k in sorted_keys:
    # Escape double quotes just in case
    escaped_val = existing_dict[k].replace('"', '\\"')
    new_body_lines.append(f'  "{k}": "{escaped_val}",')
# Remove trailing comma from last line (optional but clean)
if new_body_lines:
    new_body_lines[-1] = new_body_lines[-1].rstrip(',')
new_body_lines.append("\n")

new_dict_body = "\n".join(new_body_lines)

# Reconstruct app.js with sorted dictionary
updated_app_js = app_js[:match.start()] + dict_start + new_dict_body + dict_end + app_js[match.end():]

with open("app.js", "w", encoding="utf-8") as f:
    f.write(updated_app_js)
print("app.js updated successfully.")


# --- Step 2: Update data.js with unit7LessonSentences, unitSentencesMap, and rawTopics ---
print("\nUpdating data.js...")
with open("data.js", "r", encoding="utf-8") as f:
    data_js = f.read()

# Load generated js_arrays.txt (unit7LessonSentences)
with open("scratch/js_arrays.txt", "r", encoding="utf-8") as f_arr:
    unit7_sentences_def = f_arr.read()

# Find the insertion point before unit8LessonSentences
insert_marker = "const unit8LessonSentences ="
if insert_marker not in data_js:
    print("Error: Could not find const unit8LessonSentences in data.js")
    exit(1)

# Check if unit7LessonSentences is already in data.js (to avoid duplicate definitions if re-run)
if "const unit7LessonSentences =" in data_js:
    print("Warning: unit7LessonSentences already exists in data.js, replacing it...")
    # Find start of existing unit7LessonSentences
    u7_start = data_js.find("const unit7LessonSentences =")
    # Find end of existing unit7LessonSentences (which is before unit8LessonSentences)
    u8_start = data_js.find(insert_marker)
    data_js = data_js[:u7_start] + unit7_sentences_def + "\n\n" + data_js[u8_start:]
else:
    # Insert right before unit8LessonSentences
    u8_start = data_js.find(insert_marker)
    data_js = data_js[:u8_start] + unit7_sentences_def + "\n\n" + data_js[u8_start:]
print("unit7LessonSentences inserted.")

# Now replace unitSentencesMap[7]
# Existing:
#   7: {
#     1: [...unit4LessonSentences[3], ...unit4LessonSentences[4]]
#   },
old_map_pattern = re.compile(r'^\s*7\s*:\s*\{\s*1\s*:\s*\[\s*\.\.\.unit4LessonSentences\[3\]\s*,\s*\.\.\.unit4LessonSentences\[4\]\s*\]\s*\}\s*,?', re.MULTILINE)
if not old_map_pattern.search(data_js):
    # let's look for a generic 7: { ... } under unitSentencesMap
    # But let's check with a broader regex or just do string replacement
    print("Warning: Exact regex for unit 7 placeholder map not matched, trying string replace...")

old_map_str = """  7: {
    1: [...unit4LessonSentences[3], ...unit4LessonSentences[4]]
  },"""

new_map_str = """  7: {
    1: {
      exercises: [
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 1, 0),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 2, 10),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 3, 20),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 4, 30),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 5, 40),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 6, 50),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 7, 60),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 8, 70),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 9, 80),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 10, 90),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 11, 100),
        buildCustom10QuestionExercises(unit7LessonSentences[1], 7, 20, 12, 110)
      ]
    }
  },"""

if old_map_str in data_js:
    data_js = data_js.replace(old_map_str, new_map_str)
    print("unitSentencesMap[7] updated successfully via string replacement.")
else:
    # let's find the unitSentencesMap block and manually replace unit 7 key
    # lines around 7: { ... }
    match_map = re.search(r'7:\s*\{.*?\}\s*,', data_js, re.DOTALL)
    if match_map:
        data_js = data_js[:match_map.start()] + new_map_str + data_js[match_map.end():]
        print("unitSentencesMap[7] updated successfully via regex matching.")
    else:
        print("Error: Could not find unitSentencesMap[7] block in data.js")
        exit(1)

# Now update the rawTopics description for Unit 7
# Let's search for:
#     title: "VII. Özne - Geçişli Fiil + Nesne (Sayfa 32)",
#     desc: "Geçişli fiil ile nesne arasındaki temel ilişkiler",
#     icon: "🗺️",
#     numLessons: 1,
#     formulas: [
#       { formula: "Subject + Transitive Verb + Object", example: "The professor explained the problem: Profesör problemi açıkladı" }
#     ],

old_topic_part = """    title: "VII. Özne - Geçişli Fiil + Nesne (Sayfa 32)",
    desc: "Geçişli fiil ile nesne arasındaki temel ilişkiler",
    icon: "🗺️",
    numLessons: 1,
    formulas: [
      { formula: "Subject + Transitive Verb + Object", example: "The professor explained the problem: Profesör problemi açıkladı" }
    ],"""

new_topic_part = """    title: "VII. Özne - Geçişli Fiil + Nesne (Sayfa 32)",
    desc: "Geçişli fiil ile nesne arasındaki temel ilişkiler",
    icon: "🗺️",
    numLessons: 1,
    formulas: [
      { 
        formula: "Subject + Transitive Verb + Object", 
        example: "The professor explained the problem: Profesör problemi açıkladı",
        description: "Akademik makalelerde özneler ve nesneler; sıfat tamlamaları ve sıfat cümleleri (relative clauses) gibi yan yapılarla çok fazla uzatılarak bazen 3-4 satırı bulabilir. Öğrenci eğer cümledeki \\"Ana Özne ne?\\", \\"Geçişli Fiil ne?\\" ve \\"Bu fiilin etkilediği Nesne nerede?\\" üçlüsünü (SVO) doğru tespit edebilirse, cümlenin etrafındaki tüm süsleri ve tümleçleri kolayca ayıklayarak ana fikri saniyeler içinde anlar."
      }
    ],"""

if old_topic_part in data_js:
    data_js = data_js.replace(old_topic_part, new_topic_part)
    print("rawTopics[6] formula description updated successfully.")
else:
    # let's try matching with more flexible spacing
    flexible_pattern = re.compile(
        r'title:\s*"VII\.\s*Özne\s*-\s*Geçişli\s*Fiil\s*\+\s*Nesne\s*\(Sayfa\s*32\)",\s*'
        r'desc:\s*"Geçişli\s*fiil\s*ile\s*nesne\s*arasındaki\s*temel\s*ilişkiler",\s*'
        r'icon:\s*"🗺️",\s*'
        r'numLessons:\s*1,\s*'
        r'formulas:\s*\[\s*\{\s*formula:\s*"Subject\s*\+\s*Transitive\s*Verb\s*\+\s*Object",\s*example:\s*"The\s*professor\s*explained\s*the\s*problem:\s*Profesör\s*problemi\s*açıkladı"\s*\}\s*\],',
        re.DOTALL
    )
    if flexible_pattern.search(data_js):
        data_js = flexible_pattern.sub(new_topic_part, data_js)
        print("rawTopics[6] formula description updated successfully via regex.")
    else:
        print("Error: Could not find rawTopics[6] block in data.js to update description.")
        exit(1)

with open("data.js", "w", encoding="utf-8") as f:
    f.write(data_js)
print("data.js saved successfully.")
print("\nAll tasks completed successfully!")
