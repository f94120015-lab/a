import json
import re
import os

# 1. Load parsed sentences
with open("scratch/unit11_parsed.json", "r", encoding="utf-8") as f:
    unit11_data = json.load(f)

# Convert parsed data to JS format
def format_lesson_sentences(lesson_data):
    lines = []
    for item in lesson_data:
        en = item["en"].replace('"', '\\"')
        tr = item["tr"].replace('"', '\\"')
        word = item["word"].replace('"', '\\"')
        trWord = item["trWord"].replace('"', '\\"')
        blank = item["blank"].replace('"', '\\"')
        lines.append(f'    {{ en: "{en}", tr: "{tr}", word: "{word}", trWord: "{trWord}", blank: "{blank}" }}')
    return ",\n".join(lines)

unit11_js_def = f"""const unit11LessonSentences = {{
  1: [
{format_lesson_sentences(unit11_data["1"])}
  ],
  2: [
{format_lesson_sentences(unit11_data["2"])}
  ],
  3: [
{format_lesson_sentences(unit11_data["3"])}
  ],
  4: [
{format_lesson_sentences(unit11_data["4"])}
  ]
}};"""

# 2. Read data.js
with open("data.js", "r", encoding="utf-8") as f:
    data_content = f.read()

# Insert unit11LessonSentences before unit12LessonSentences
insert_marker = "const unit12LessonSentences ="
if insert_marker not in data_content:
    print("Error: Could not find insert marker in data.js")
    exit(1)

# Remove any existing unit11LessonSentences definition first to prevent duplicates
if "const unit11LessonSentences =" in data_content:
    print("Replacing existing unit11LessonSentences definition...")
    start_pos = data_content.find("const unit11LessonSentences =")
    end_pos = data_content.find(insert_marker)
    data_content = data_content[:start_pos] + unit11_js_def + "\n\n" + data_content[end_pos:]
else:
    print("Inserting unit11LessonSentences definition...")
    pos = data_content.find(insert_marker)
    data_content = data_content[:pos] + unit11_js_def + "\n\n" + data_content[pos:]

# 3. Update unitSentencesMap for unit 11
old_map_pattern = r'11:\s*\{\s*1:\s*\{\s*exercises:\s*\[\s*\]\s*\}\s*\},'
new_map = """  11: {
    1: { exercises: [
      buildCustom10QuestionExercises(unit11LessonSentences[1], 11, 32, 1, 0),
      buildCustom10QuestionExercises(unit11LessonSentences[1], 11, 32, 2, 10),
      buildCustom10QuestionExercises(unit11LessonSentences[1], 11, 32, 3, 20)
    ] },
    2: { exercises: [
      buildCustom10QuestionExercises(unit11LessonSentences[2], 11, 33, 1, 0),
      buildCustom10QuestionExercises(unit11LessonSentences[2], 11, 33, 2, 10),
      buildCustom10QuestionExercises(unit11LessonSentences[2], 11, 33, 3, 20)
    ] },
    3: { exercises: [
      buildCustom10QuestionExercises(unit11LessonSentences[3], 11, 34, 1, 0),
      buildCustom10QuestionExercises(unit11LessonSentences[3], 11, 34, 2, 10),
      buildCustom10QuestionExercises(unit11LessonSentences[3], 11, 34, 3, 20)
    ] },
    4: { exercises: [
      buildCustom10QuestionExercises(unit11LessonSentences[4], 11, 35, 1, 0),
      buildCustom10QuestionExercises(unit11LessonSentences[4], 11, 35, 2, 10),
      buildCustom10QuestionExercises(unit11LessonSentences[4], 11, 35, 3, 20),
      buildCustom10QuestionExercises(unit11LessonSentences[4], 11, 35, 4, 30),
      buildCustom10QuestionExercises(unit11LessonSentences[4], 11, 35, 5, 40),
      buildCustom10QuestionExercises(unit11LessonSentences[4], 11, 35, 6, 50)
    ] }
  },"""

if re.search(old_map_pattern, data_content):
    print("Updating unitSentencesMap[11]...")
    data_content = re.sub(old_map_pattern, new_map, data_content)
else:
    # If already modified, search for general 11: block and replace it
    map_start = data_content.find("const unitSentencesMap = {")
    match_map = re.search(r'11:\s*\{.*?\}\s*,', data_content[map_start:], re.DOTALL)
    if match_map:
        print("Updating existing unitSentencesMap[11] block...")
        match_start = map_start + match_map.start()
        match_end = map_start + match_map.end()
        data_content = data_content[:match_start] + new_map + data_content[match_end:]
    else:
        print("Error: Could not find unitSentencesMap[11] block in data.js")
        exit(1)

# 4. Update rawTopics entry for Unit 11
old_topic_part = """  {
    title: "XI. Edilgen (Passive) Mastarı (Sayfa 63)",
    desc: "Edilgen mastar (to be + V3) yapıları",
    icon: "🔒",
    numLessons: 1,
    formulas: [
      { 
        formula: "to be + V3 / Modal + be + V3", 
        example: "The problem needs to be solved: Sorunun çözülmesi gerekiyor",
        description: "<strong>1. Aşama: Bilinenle Köprü Kurma (Aktif vs. Pasif Dönüşümü)</strong><br>Tercüme Kılavuzu: Aktif cümleler pasife dönüştürülürken eylemden etkilenen nesne başa gelir, araya modalın türüne göre bir be köprüsü eklenir ve asıl fiil 3. haline ($V_3$) çekimlenir. Olumsuzlarda modalın hemen yanına not gelir; sorularda ise modal cümlenin en başına, yani nesnenin önüne taşınır.<br><br><strong>2. Aşama: \\"Kuyruksuz\\" Kısa Cümlelerle Başlama (En Yalın Model)</strong><br>Tercüme Kılavuzu: Cümle sonundaki ek tümleçler (yer, zaman, eyleyen) kesilerek öğrencinin sadece çekirdek Nesne + Modal (+ not) + be + V3 yapısına odaklanması sağlanır. Sorularda ise cümlenin ilk yardımcı unsuru başa gelir."
      }
    ],
    subtitles: [
      "Edilgen (Passive) Mastarı (Sayfa 63)"
    ]
  },"""

# Note: We must escape backslashes in description double quotes for JS code if necessary
new_topic_part = """  {
    title: "XI. Edilgen (Passive) Mastarı (Sayfa 63)",
    desc: "Edilgen mastar (to be + V3) yapıları",
    icon: "🔒",
    numLessons: 4,
    formulas: [
      { 
        formula: "Modal + be + V3 (Positive Modals)", 
        example: "The project can be abandoned: Proje terk edilebilir",
        description: "Tercüme Kılavuzu: Edilgen (Passive) modal yapıları, bir eylemin yapılabilme olasılığını (can/may/might/could), zorunluluğunu (must/should/ought to) veya gelecekteki durumunu (will) bildirir. Cümle kurulurken eylemden etkilenen Nesne (Özne konumunda) + Modal + be + V3 yapısı kullanılır. Çeviri yaparken: Önce özne okunur, ardından fiilin edilgen haline modalın anlamı (edilebilir, edilmelidir, edilecek) eklenir."
      },
      { 
        formula: "Modal + not + be + V3 (Negative Modals)", 
        example: "The project cannot be abandoned: Proje terk edilemez",
        description: "Tercüme Kılavuzu: Olumsuz edilgen modal yapılarında, modal yardımcısının hemen yanına olumsuzluk eki (not) gelir: Nesne + Modal + not + be + V3. Çeviride modalın olumsuz anlamı fiilin edilgen köküne eklenir: can/could not için \\\"-emez / -amaz\\\", must/should/ought not için \\\"-memelidir / -mamalıdır\\\", will not için \\\"-meyecek / -mayacak\\\" anlamı verilir."
      },
      { 
        formula: "Modal + Subject + be + V3? (Interrogative Modals)", 
        example: "Can the project be abandoned?: Proje terk edilebilir mi?",
        description: "Tercüme Kılavuzu: Soru biçimlerinde modal cümlenin en başına (öznenin önüne) gelir: Modal + Nesne + be + V3?. Çeviride önce özne söylenir, ardından edilgen fiile modalın soru eki (edilebilir mi?, edilmeli midir?, edilecek mi?) eklenerek cümle tamamlanır."
      },
      { 
        formula: "Subject + Modal + be + V3 + by + Agent (Full Modal Passive)", 
        example: "The project can be abandoned by the team: Proje ekip tarafından terk edilebilir",
        description: "Tercüme Kılavuzu: Akademik makalelerde bu edilgen yapılarda özneler ve nesneler uzatılarak (expanded) ve cümlenin sonuna eyleyen (by + Agent) eklenerek kullanılır. Çeviri adımları: 1. Cümlenin başındaki uzun sıfat tamlamasını (özne) bulun. 2. Cümlenin sonundaki 'by/from' öbeğini (tarafından/kaynağından) araya ekleyin. 3. Yüklemi edilgen modal yapısına göre çevirerek cümleyi tamamlayın."
      }
    ],
    subtitles: [
      "A. Modal Tabanlı Yalın Edilgen Örnekler (Positive Modals)",
      "B. Modal Tabanlı Yalın Edilgenlerin Olumsuzları (Negative Modals)",
      "C. Modal Tabanlı Yalın Edilgenlerin Soru Biçimleri (Interrogative Modals)",
      "D. Modal Tabanlı Tam Genişletilmiş Edilgen Örnekler (Full Modal Passive)"
    ]
  },"""

if old_topic_part in data_content:
    print("Updating rawTopics[10]...")
    data_content = data_content.replace(old_topic_part, new_topic_part)
else:
    # Try finding with double quotes or slight variations
    pos = data_content.find('title: "XI. Edilgen (Passive) Mastarı (Sayfa 63)"')
    if pos != -1:
        print("Updating rawTopics[10] via positional index...")
        block_start = data_content.rfind("{", 0, pos)
        block_end = data_content.find("},", pos) + 2
        data_content = data_content[:block_start] + new_topic_part + data_content[block_end:]
    else:
        print("Error: Could not find rawTopics entry for Unit 11 in data.js")
        exit(1)

# Write updated data.js
with open("data.js", "w", encoding="utf-8") as f:
    f.write(data_content)
print("Saved data.js successfully.")

# 5. Update app.js Word Dictionary
print("Updating app.js Word Dictionary...")
vocab_updates = {
    "accumulated": "biriktirilmiş / biriktirildi",
    "algorithms": "algoritmalar / yöntemler",
    "architectural": "mimari",
    "clarified": "açıklanmış / netleştirilmiş / açıklandı",
    "encryption": "şifreleme",
    "formats": "formatlar / biçimler",
    "funds": "fonlar / kaynaklar",
    "induced": "yol açılmış / yol açıldı",
    "inputs": "girdiler",
    "manipulated": "manipüle edilmiş / manipüle edildi",
    "maximized": "maksimize edilmiş / maksimize edildi",
    "ought": "-meli / -malı (ought to)",
    "privacy": "gizlilik",
    "protected": "korunmuş / korundu",
    "rules": "kurallar / yönetmelikler",
    "shifted": "kaydırılmış / kaydırıldı",
    "stabilized": "stabilize edilmiş / dengelenmiş",
    "valuable": "değerli",
    "violated": "ihlal edilmiş / ihlal edildi"
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
print("\nUnit 11 integration completed successfully!")
