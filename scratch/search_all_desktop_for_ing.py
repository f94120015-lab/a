import os, glob
from docx import Document

desktop_dir = '/Users/faruknafizfazlioglu/Desktop'
docx_files = [f for f in glob.glob(os.path.join(desktop_dir, '*.docx')) if not os.path.basename(f).startswith('~$')]

search_terms = ["emerging", "publishing", "competing", "remaining", "underlying"]

print("Scanning docx files...")
for f in docx_files:
    try:
        doc = Document(f)
        for i, p in enumerate(doc.paragraphs):
            txt = p.text.strip().lower()
            for term in search_terms:
                if term in txt:
                    print(f"Match '{term}' in {os.path.basename(f)} P {i}: {p.text}")
    except Exception as e:
        pass
print("Done.")
