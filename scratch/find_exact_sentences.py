import os
import glob
from docx import Document
import unicodedata

desktop_dir = "/Users/faruknafizfazlioglu/Desktop"
docx_files = glob.glob(os.path.join(desktop_dir, "*.docx"))

sentences = [
    "He is learning how to swim",
    "We need to decide what to say",
    "They don't know where to meet",
    "She asked the driver where to stop",
    "how to alter",
    "how to avoid"
]

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
        for i, p in enumerate(doc.paragraphs):
            text = p.text.strip()
            text_lower = text.lower().replace(".", "").replace(",", "").strip()
            for s in sentences:
                s_clean = s.lower().replace(".", "").replace(",", "").strip()
                if s_clean in text_lower:
                    print(f"MATCH '{s}' in {os.path.basename(f_norm)} at paragraph {i}: '{text}'")
    except Exception as e:
        pass
