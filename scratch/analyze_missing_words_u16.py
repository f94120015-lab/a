import re
import os

unit16_sentences = [
    "Criticising the work of others is easy.",
    "Destroying harmful insects is a long process.",
    "Developing backward countries takes a long time.",
    "Growing trees in poor soil is uneconomic.",
    "Distinguishing the different species is a job for the expert.",
    "Introducing modern methods has increased production and distribution.",
    "Protecting the tissues from further damage is very important.",
    "Maintaining high standards of accuracy requires effort.",
    "Estimating cost of production is a job for the expert.",
    "Isolating the virus is the first step towards producing a serum.",
    "Using a concentrated solution will give better results.",
    "Repeating vocabulary exercises is a good way to learn words.",
    "Learning a language is not easy.",
    "Translating a text is difficult."
]

# Extract all words from sentences
unique_words = set()
for sent in unit16_sentences:
    cleaned = re.sub(r'[^\w\s-]', ' ', sent)
    for word in cleaned.split():
        word = word.strip().lower()
        if word and not word.isdigit():
            unique_words.add(word)

# Load app.js wordDictionary
with open("app.js", "r", encoding="utf-8") as f:
    app_content = f.read()

dict_match = re.search(r'const wordDictionary = \{(.*?)\};', app_content, re.DOTALL)
dict_keys = set()
if dict_match:
    dict_content = dict_match.group(1)
    dict_keys = set(re.findall(r'["\']([^"\']+)["\']\s*:', dict_content))

# Find missing words
missing = sorted(list(unique_words - dict_keys))
print(f"Total unique words in Unit 16 sentences: {len(unique_words)}")
print(f"Missing words ({len(missing)}):")

common_tr = {
    "criticising": "eleştirmek",
    "destroying": "yok etmek / mahvetmek",
    "harmful": "zararlı",
    "insects": "böcekler",
    "backward": "geri kalmış / geri",
    "countries": "ülkeler",
    "takes": "alır / sürer",
    "uneconomic": "ekonomik olmayan / verimsiz",
    "expert": "uzman",
    "increased": "artmış / artırdı",
    "production": "üretim",
    "distribution": "dağıtım",
    "tissues": "dokular",
    "further": "daha fazla / ileri",
    "damage": "hasar / zarar",
    "accuracy": "doğruluk / kesinlik",
    "effort": "çaba / gayret",
    "serum": "serum",
    "towards": "-e doğru / -e yönelik",
    "concentrated": "derişik / konsantre",
    "solution": "çözelti / çözüm",
    "repeating": "tekrarlamak / tekrar eden",
    "exercises": "egzersizler / alıştırmalar",
    "translating": "çevirmek / tercüme etmek"
}

for m in missing:
    tr = common_tr.get(m, m)
    print(f'  "{m}": "{tr}",')
