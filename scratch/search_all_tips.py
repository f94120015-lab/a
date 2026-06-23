import os
from docx import Document

fpath = "/Users/faruknafizfazlioglu/Desktop/Amok Soru Yapılanlar.docx"
if os.path.exists(fpath):
    doc = Document(fpath)
    for i, p in enumerate(doc.paragraphs):
        txt = p.text.strip()
        if "tip:" in txt.lower():
            print(f"P {i}: {txt}")
else:
    print("File not found")
