import os
import glob
from pypdf import PdfReader

desktop_dir = "/Users/faruknafizfazlioglu/Desktop"
pdf_files = glob.glob(os.path.join(desktop_dir, "*.pdf"))

target = "how to alter"

for f in pdf_files:
    print(f"Searching in: {os.path.basename(f)}")
    try:
        reader = PdfReader(f)
        for i, page in enumerate(reader.pages):
            text = page.extract_text()
            if text and target in text.lower():
                print(f"  FOUND in {os.path.basename(f)} at page {i}:")
                print(text[:200])
                break
    except Exception as e:
        print(f"  Error reading {os.path.basename(f)}: {e}")
