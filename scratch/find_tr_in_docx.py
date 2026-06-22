from docx import Document
import re

doc = Document("/Users/faruknafizfazlioglu/Desktop/matching.docx")
turkish_chars = set("şğışöüçŞĞİÖÜÇ")

found_count = 0
for idx, p in enumerate(doc.paragraphs):
    txt = p.text.strip()
    if not txt:
        continue
    # If the text has Turkish chars and doesn't look like instructions or guidelines
    has_tr = any(c in txt for c in turkish_chars)
    if has_tr and len(txt) > 10 and not any(k in txt for k in ["Tercüme", "Tip", "Alıştırma", "soru", "kelime", "seçmeli", "Soru", "İngilizce"]):
        print(f"P {idx}: {txt}")
        found_count += 1
        if found_count > 40:
            break
