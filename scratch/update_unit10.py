import re
import os

print("--- Step 1: Update app.js Word Dictionary ---")
vocab_updates = {
    "abandoned": "terk edilmiş / terk edildi",
    "anticipated": "öngörülen / öngörüldü / öngörülmektedir",
    "triggered": "tetiklenen / tetiklendi / tetiklenmektedir",
    "specified": "belirtilen / belirtildi / belirtilmektedir",
    "advocated": "savunulan / savunuldu / savunulmaktadır",
    "expanded": "genişletilmiş / genişletildi / genişletilmektedir",
    "inspected": "incelenen / incelendi / incelenmektedir"
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

unit10_def = """const unit10LessonSentences = {
  1: [
    { en: "The project is abandoned.", tr: "Proje terk edilmiştir.", word: "abandoned", trWord: "terk edilmiştir", blank: "The project is ___." },
    { en: "Growth is anticipated.", tr: "Büyüme öngörülmektedir.", word: "anticipated", trWord: "öngörülmektedir", blank: "Growth is ___." },
    { en: "The dynamic is triggered.", tr: "Dinamik tetiklenmektedir.", word: "triggered", trWord: "tetiklenmektedir", blank: "The dynamic is ___." },
    { en: "Context is specified.", tr: "Bağlam belirtilmektedir.", word: "specified", trWord: "belirtilmektedir", blank: "Context is ___." },
    { en: "Reform is advocated.", tr: "Reform savunulmaktadır.", word: "advocated", trWord: "savunulmaktadır", blank: "Reform is ___." },
    { en: "The sector is expanded.", tr: "Sektör genişletilmektedir.", word: "expanded", trWord: "genişletilmektedir", blank: "The sector is ___." },
    { en: "Parameters are defined.", tr: "Parametreler tanımlanmaktadır.", word: "defined", trWord: "tanımlanmaktadır", blank: "Parameters are ___." },
    { en: "Ratios are calculated.", tr: "Oranlar hesaplanmaktadır.", word: "calculated", trWord: "hesaplanmaktadır", blank: "Ratios are ___." },
    { en: "The framework is inspected.", tr: "Çerçeve incelenmektedir.", word: "inspected", trWord: "incelenmektedir", blank: "The framework is ___." }
  ]
};"""

insert_marker = "const unit12LessonSentences ="
if insert_marker not in data_js:
    print("Error: Could not find const unit12LessonSentences in data.js")
    exit(1)

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
old_map_str = """  10: {
    1: [...unit6LessonSentences[1], ...unit6LessonSentences[2], ...unit6LessonSentences[3], ...unit6LessonSentences[4]]
  },"""

new_map_str = """  10: {
    1: { exercises: [
      buildCustom10QuestionExercises(unit10LessonSentences[1], 10, 28, 1, 0)
    ] }
  },"""

if old_map_str in data_js:
    data_js = data_js.replace(old_map_str, new_map_str)
    print("unitSentencesMap[10] updated successfully via string replacement.")
else:
    match_map = re.search(r'10:\s*\{\s*1:\s*\[\s*\.\.\.unit6LessonSentences\[1\].*?\]\s*\},?', data_js, re.DOTALL)
    if match_map:
        data_js = data_js[:match_map.start()] + new_map_str + data_js[match_map.end():]
        print("unitSentencesMap[10] updated successfully via regex matching.")
    else:
        print("Error: Could not find unitSentencesMap[10] block in data.js")
        exit(1)

with open("data.js", "w", encoding="utf-8") as f:
    f.write(data_js)
print("data.js saved successfully.")
print("\nUpdate completed successfully!")
