import json
import re

# Load parsed sentences
with open("scratch/unit11_parsed.json", "r", encoding="utf-8") as f:
    unit11_data = json.load(f)

# Collect all unique words
words = set()
for l in unit11_data:
    for item in unit11_data[l]:
        # Tokenize English sentence
        clean_en = item["en"].lower().replace(".", "").replace("?", "").replace(",", "")
        for w in clean_en.split():
            words.add(w)

# Load app.js dictionary keys
with open("app.js", "r", encoding="utf-8") as f:
    app_js = f.read()

# Match the keys of wordDictionary
dict_match = re.search(r'const wordDictionary = \{(.*?)\};', app_js, re.DOTALL)
if not dict_match:
    print("Error: Could not find wordDictionary in app.js")
    exit(1)

dict_body = dict_match.group(1)
existing_keys = set(re.findall(r'^\s*["\']([^"\']+)["\']\s*:', dict_body, re.MULTILINE))

missing = sorted(list(words - existing_keys))
print(f"Total unique words in unit 11: {len(words)}")
print(f"Total missing words: {len(missing)}")
print("Missing words list:")
for w in missing:
    print(f"  {w}")
