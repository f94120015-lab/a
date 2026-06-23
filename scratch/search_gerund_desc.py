import os
import glob
from docx import Document
import unicodedata

desktop_dir = "/Users/faruknafizfazlioglu/Desktop"
docx_files = glob.glob(os.path.join(desktop_dir, "*.docx"))

target = "eylem-isim (gerund)"

for fpath in docx_files:
    if "~$" in fpath:
        continue
    try:
        doc = Document(fpath)
        for i, p in enumerate(doc.paragraphs):
            if target in p.text.lower():
                print(f"Found in {os.path.basename(fpath)} at P {i}:")
                print(f"  {p.text.strip()}")
    except Exception as e:
        pass
