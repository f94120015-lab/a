import re

# Read data.js to find all existing English sentences
with open("data.js", "r", encoding="utf-8") as f:
    data_content = f.read()

# Find all occurrences of en: "..." or en: '...'
existing_en_sentences = set()
for match in re.findall(r'en:\s*["\']([^"\']+)["\']', data_content):
    # Normalize (strip punctuation, lower case)
    norm = re.sub(r'[?.!,]', '', match).strip().lower()
    existing_en_sentences.add(norm)

# Now read matching_content.txt and extract sentences for each Tip
with open("scratch/matching_content.txt", "r", encoding="utf-8") as f:
    matching_lines = f.readlines()

tips = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
}

current_tip = None
for line in matching_lines:
    line = line.strip()
    if not line:
        continue
    m_tip = re.match(r'Tip:\s*(.*)', line)
    if m_tip:
        tip_text = m_tip.group(1).lower()
        if "fiil + özne" in tip_text and "soru kelimesi" not in tip_text and "edat" not in tip_text:
            current_tip = 1
        elif "do, does, did fiili" in tip_text:
            current_tip = 2
        elif "soru kelimesi + fiil + özne" in tip_text:
            current_tip = 3
        elif "soru kelimesi + do, does, did" in tip_text:
            current_tip = 4
        elif "edat + soru kelimesi" in tip_text:
            current_tip = 5
        print(f"Detected Tip {current_tip}: {line}")
        continue
        
    if current_tip is not None:
        # If line starts with capital letter and ends with ? or is a sentence
        if (line[0].isupper() or line.startswith("At") or line.startswith("In") or line.startswith("To") or line.startswith("For") or line.startswith("By") or line.startswith("Under") or line.startswith("From") or line.startswith("With") or line.startswith("On") or line.startswith("Through")) and (line.endswith("?") or line.endswith(".")):
            tips[current_tip].append(line)
        elif "Soru tipleri" in line or "Tercüme Kılavuzu" in line or "Aşağıdaki" in line:
            current_tip = None

for tip_id, sents in tips.items():
    print(f"\nTip {tip_id}: Total sentences = {len(sents)}")
    found_in_db = 0
    not_found = []
    for s in sents:
        norm = re.sub(r'[?.!,]', '', s).strip().lower()
        if norm in existing_en_sentences:
            found_in_db += 1
        else:
            not_found.append(s)
    print(f"  Found in data.js: {found_in_db}")
    print(f"  Not found in data.js: {len(not_found)}")
    if not_found:
        print("  Sample not found:")
        for nf in not_found[:5]:
            print(f"    - {nf}")
