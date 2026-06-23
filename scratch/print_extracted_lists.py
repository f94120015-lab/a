import re

with open("scratch/tips_extracted.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

tip1 = []
tip2 = []
tip3 = []

current_section = None
for line in lines:
    line = line.strip()
    if not line:
        continue
    
    # Check sections
    if "A. İsim + Present Participle + Edat Takımı" in line:
        current_section = 1
        continue
    elif "B. İsim + Present Participle + Nesne (İsim)" in line:
        current_section = 2
        continue
    elif "C. İsim + Past Participle + Edat Takımı" in line:
        current_section = 3
        continue
    
    # Parse sentences (usually they look like: P 123: the forests remaining in these areas)
    m = re.match(r'P \d+:\s*(.*)', line)
    if m:
        val = m.group(1).strip()
        if not val or "Alıştırma" in val or "Sözlük" in val or "Anlama Soruları" in val or "Comprehension" in val or "İngilizce Sıralama" in val or "Türkçe Sıralama" in val or "Örnek:" in val or "Yukarıda" in val or val.startswith("Which") or val.startswith("What") or val.startswith("How") or val.startswith("Where") or val.startswith("to ") or val.startswith("for ") or val.startswith("about "):
            continue
        # Check if it starts with lower/upper letter or is a sentence/phrase
        if val[0].islower() or (val[0].isupper() and (val.endswith(".") or val.endswith("?"))):
            # Clean up trailing numbers or characters
            val = re.sub(r'\s*\d+\.\s*', '', val)
            val = val.replace(" .", ".")
            if current_section == 1:
                tip1.append(val)
            elif current_section == 2:
                tip2.append(val)
            elif current_section == 3:
                tip3.append(val)

print(f"Tip 1 Candidates: {len(tip1)}")
for idx, s in enumerate(tip1[:30]):
    print(f"  {idx+1}: {s}")

print(f"\nTip 2 Candidates: {len(tip2)}")
for idx, s in enumerate(tip2[:35]):
    print(f"  {idx+1}: {s}")

print(f"\nTip 3 Candidates: {len(tip3)}")
for idx, s in enumerate(tip3[:35]):
    print(f"  {idx+1}: {s}")
