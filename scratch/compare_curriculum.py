import docx
import json
import re

# Load rendered units and lessons
with open("scratch/rendered_units.json", "r", encoding="utf-8") as f:
    app_units = json.load(f)
with open("scratch/rendered_lessons.json", "r", encoding="utf-8") as f:
    app_lessons = json.load(f)

# Group app lessons by unit
app_lessons_by_unit = {}
for l in app_lessons:
    u_id = l.get("unitId")
    if u_id not in app_lessons_by_unit:
        app_lessons_by_unit[u_id] = []
    app_lessons_by_unit[u_id].append(l)

# Let's read paragraphs of AMOK İçindekiler.docx
doc = docx.Document("AMOK İçindekiler.docx")
toc_items = []
current_part = "I. BÖLÜM"

# Regex for items with page numbers at the end like: Topic . . . . . 12
page_regex = re.compile(r"^(.*?)\s*\.*\s*(\d+)$")

for p in doc.paragraphs:
    text = p.text.strip()
    if not text:
        continue
    if "II. BÖLÜM" in text:
        current_part = "II. BÖLÜM"
        continue
    if "I. BÖLÜM" in text:
        current_part = "I. BÖLÜM"
        continue
    
    match = page_regex.match(text)
    if match:
        title = match.group(1).strip()
        page = int(match.group(2))
    else:
        title = text
        page = None
    
    toc_items.append({
        "part": current_part,
        "raw_text": text,
        "title": title,
        "page": page
    })

# Write parsed TOC items to file for inspect
with open("scratch/parsed_toc.json", "w", encoding="utf-8") as f:
    json.dump(toc_items, f, indent=2, ensure_ascii=False)

print(f"Loaded {len(app_units)} units and {len(app_lessons)} lessons from App.")
print(f"Loaded {len(toc_items)} TOC items from docx.")
