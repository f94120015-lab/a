import os, glob
import unicodedata
from docx import Document

desktop_dir = '/Users/faruknafizfazlioglu/Desktop'
docx_files = [f for f in glob.glob(os.path.join(desktop_dir, '*.docx')) if not os.path.basename(f).startswith('~$')]

search_terms = ["present participle", "past participle", "1. tip", "2. tip", "3. tip", "tercüme kılavuzu"]

print("Scanning docx files...")
for f in docx_files:
    f_norm = unicodedata.normalize('NFC', f)
    try:
        doc = Document(f_norm)
        for i, p in enumerate(doc.paragraphs):
            txt = p.text.strip().lower()
            for term in search_terms:
                if term in txt:
                    print(f"Match '{term}' in {os.path.basename(f_norm)} P {i}: {p.text}")
    except Exception as e:
        pass
print("Done.")
