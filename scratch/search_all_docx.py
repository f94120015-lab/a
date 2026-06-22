import os
import glob
from docx import Document

desktop_dir = "/Users/faruknafizfazlioglu/Desktop"
docx_files = glob.glob(os.path.join(desktop_dir, "*.docx"))
docx_files += glob.glob(os.path.join(desktop_dir, "**/*.docx"), recursive=True)

target = "is the data valid"

for fpath in docx_files:
    if "~$" in fpath:
        continue
    try:
        doc = Document(fpath)
        for i, p in enumerate(doc.paragraphs):
            if target in p.text.lower():
                print(f"Found in {os.path.basename(fpath)} at paragraph {i}: {p.text}")
    except Exception as e:
        pass
