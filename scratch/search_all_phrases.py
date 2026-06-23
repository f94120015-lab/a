import os, glob
from docx import Document

desktop_dir = '/Users/faruknafizfazlioglu/Desktop'
docx_files = [f for f in glob.glob(os.path.join(desktop_dir, '*.docx')) if not os.path.basename(f).startswith('~$')]

search_phrases = [
    "emerging from the study",
    "authors publishing in academic journals",
    "companies competing in this sector",
    "dynamic variables changing during the process",
    "separate groups participating in the initial project",
    "structural components remaining on the site",
    "fundamental principles underlying this economic theory",
    "independent researchers working within the administration",
    "consistent layers forming at the bottom of the container",
    "legal authorities acting under constitutional clauses"
]

print("Checking docx files for any of the 10 sentences...")
for f in docx_files:
    try:
        doc = Document(f)
        for i, p in enumerate(doc.paragraphs):
            txt = p.text.strip().lower()
            for phrase in search_phrases:
                if phrase.lower() in txt:
                    print(f"FOUND MATCH in {os.path.basename(f)} at paragraph {i}: '{p.text}'")
    except Exception as e:
        pass
print("Done.")
