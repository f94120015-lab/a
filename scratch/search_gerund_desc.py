import os
import glob
import unicodedata
from docx import Document

desktop_path = "/Users/faruknafizfazlioglu/Desktop"
docx_files = glob.glob(os.path.join(desktop_path, "*.docx"))

target = "contradicts"

for f in docx_files:
    f_norm = unicodedata.normalize('NFC', f)
    f_nfd = unicodedata.normalize('NFD', f)
    path_to_use = f
    if os.path.exists(f_norm):
        path_to_use = f_norm
    elif os.path.exists(f_nfd):
        path_to_use = f_nfd
        
    try:
        doc = Document(path_to_use)
        for i, p in enumerate(doc.paragraphs):
            p_text = p.text.strip()
            if target.lower() in p_text.lower():
                print(f"FOUND 'contradicts' in {os.path.basename(f)} at paragraph {i}: {p_text[:100]}")
    except Exception as e:
        pass
