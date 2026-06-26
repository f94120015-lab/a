import os, glob
import unicodedata
from docx import Document

desktop_dir = '/Users/faruknafizfazlioglu/Desktop'
docx_files = glob.glob(os.path.join(desktop_dir, '*.docx'))

for f in docx_files:
    if '~$' in f:
        continue
    f_norm = unicodedata.normalize('NFC', f)
    try:
        doc = Document(f_norm)
        for i, p in enumerate(doc.paragraphs):
            text = p.text.strip()
            if "abandoned" in text.lower():
                print(f"FOUND 'abandoned' in {os.path.basename(f_norm)} at P {i}: {text}")
    except Exception as e:
        pass
