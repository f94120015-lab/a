import os
import unicodedata
from docx import Document

files = [
    "/Users/faruknafizfazlioglu/Desktop/Bölüm dersleri promptu.docx",
    "/Users/faruknafizfazlioglu/Desktop/Academic reading sıralama.docx",
    "/Users/faruknafizfazlioglu/Desktop/dersler düzenleme.docx",
    "/Users/faruknafizfazlioglu/Desktop/İKİNCİ BÖLÜM.docx",
    "/Users/faruknafizfazlioglu/Desktop/eng dosya son halİ.docx",
    "/Users/faruknafizfazlioglu/Desktop/Amok Soru Yapılanlar.docx",
    "/Users/faruknafizfazlioglu/Desktop/amok düzenleme.docx",
    "/Users/faruknafizfazlioglu/Desktop/amok WORD.docx"
]

target_phrases = ["kuruduğunda", "kuruyacağı zaman", "when it dries", "when the trees died", "ağaçlar öldüğünde"]

for f in files:
    normalized_f = unicodedata.normalize('NFD', f)
    if os.path.exists(normalized_f):
        f = normalized_f
    if not os.path.exists(f):
        continue
    try:
        doc = Document(f)
        for i, p in enumerate(doc.paragraphs):
            txt = p.text.lower()
            for tp in target_phrases:
                if tp in txt:
                    print(f"FOUND tp '{tp}' in {os.path.basename(f)} at P {i}: {p.text.strip()}")
    except Exception as e:
        print(f"Error: {e}")
