import json

with open('documents/Önemli Phrasal Verbs Listesi.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

pv_items = []
for line in lines:
    if '|' in line and not line.startswith('| No') and not line.startswith('| :'):
        parts = [p.strip() for p in line.split('|')]
        if len(parts) >= 4 and parts[1].isdigit():
            no = int(parts[1])
            verb = parts[2]
            meaning = parts[3]
            pv_items.append({'no': no, 'verb': verb, 'meaning': meaning})

print(f"Loaded {len(pv_items)} Phrasal Verbs from list.")

# Divide into 10 thematic / sequential lessons of ~15 PVs each
# Lesson 1: 1-15
# Lesson 2: 16-30
# Lesson 3: 31-45
# Lesson 4: 46-60
# Lesson 5: 61-75
# Lesson 6: 76-90
# Lesson 7: 91-105
# Lesson 8: 106-120
# Lesson 9: 121-135
# Lesson 10: 136-148

chunk_size = 15
chunks = [pv_items[i:i + chunk_size] for i in range(0, len(pv_items), chunk_size)]

print(f"Created {len(chunks)} chunks.")
for i, c in enumerate(chunks):
    print(f"Lesson {i+1}: {len(c)} items ({c[0]['verb']} ... {c[-1]['verb']})")

