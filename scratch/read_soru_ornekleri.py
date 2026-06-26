import os
from docx import Document
import unicodedata

fpath = "/Users/faruknafizfazlioglu/Desktop/soru örnekleri bölümler.docx"
f_norm = unicodedata.normalize('NFC', fpath)
if os.path.exists(f_norm):
    doc = Document(f_norm)
    with open("scratch/extracted_text.txt", "w", encoding="utf-8") as f:
        for i, p in enumerate(doc.paragraphs):
            txt = p.text.strip()
            f.write(f"P {i}: {txt}\n")
    print("Extracted all text successfully to scratch/extracted_text.txt.")
else:
    print(f"File not found: {f_norm}")
