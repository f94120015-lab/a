import os
import glob
from docx import Document
import unicodedata

desktop_dir = "/Users/faruknafizfazlioglu/Desktop"
docx_files = glob.glob(os.path.join(desktop_dir, "*.docx"))

for f in docx_files:
    if "~$" in f:
        continue
    f_norm = unicodedata.normalize('NFD', f)
    if not os.path.exists(f_norm):
        f_norm = unicodedata.normalize('NFC', f)
    if not os.path.exists(f_norm):
        continue
        
    try:
        doc = Document(f_norm)
        headings = []
        for i, p in enumerate(doc.paragraphs):
            text = p.text.strip()
            if text.isupper() and ("BÖLÜM" in text or "BOLUM" in text or "CHAPTER" in text):
                headings.append((i, text))
            elif "bölüm" in text.lower() and len(text) < 100:
                headings.append((i, text))
        if headings:
            print(f"\nHeadings in {os.path.basename(f_norm)}:")
            for idx, h in headings:
                print(f"  P {idx}: {h}")
    except Exception as e:
        print(f"Error reading {os.path.basename(f_norm)}: {e}")
