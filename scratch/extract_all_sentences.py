import re

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
    
    # Detect tips
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
        continue
        
    if current_tip is not None:
        # Check if it's a sentence
        if (line[0].isupper() or line.startswith("At") or line.startswith("In") or line.startswith("To") or line.startswith("For") or line.startswith("By") or line.startswith("Under") or line.startswith("From") or line.startswith("With") or line.startswith("On") or line.startswith("Through")) and (line.endswith("?") or line.endswith(".")):
            tips[current_tip].append(line)
        elif "Soru tipleri" in line or "Tercüme Kılavuzu" in line or "Aşağıdaki" in line or "Tip:" in line:
            current_tip = None

for tip_id, sents in tips.items():
    print(f"\n==================== TIP {tip_id} ====================")
    for idx, s in enumerate(sents):
        print(f"{idx+1}. {s}")
