import os
import glob
from docx import Document
import unicodedata

desktop_dir = "/Users/faruknafizfazlioglu/Desktop"

targets = ["bölüm 30", "bolum 30", "wh- clause", "how to swim", "how to alter"]

print("Starting recursive search...")

for root, dirs, files in os.walk(desktop_dir):
    # Exclude system and large build directories
    if any(p in root for p in [".git", "node_modules", ".vercel", ".idea", "BYD"]):
        continue
    for file in files:
        if file.startswith("~$") or not file.endswith(".docx"):
            continue
        file_path = os.path.join(root, file)
        try:
            doc = Document(file_path)
            for i, p in enumerate(doc.paragraphs):
                text = p.text.strip().lower()
                for t in targets:
                    if t in text:
                        print(f"Match '{t}' in {file_path} at paragraph {i}: '{p.text[:100]}'")
                        break
        except Exception as e:
            pass
print("Finished search.")
