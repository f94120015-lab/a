import os
import glob
from docx import Document
import unicodedata

def search():
    files = glob.glob("/Users/faruknafizfazlioglu/Desktop/*.docx")
    for f in files:
        if "~$" in f:
            continue
        try:
            doc = Document(f)
            for i, p in enumerate(doc.paragraphs):
                text = p.text.strip()
                if "would rather" in text.lower() or "yapı 4:" in text.lower():
                    print(f"FOUND IN {os.path.basename(f)} at paragraph {i}: {text[:120]}")
        except Exception as e:
            pass

if __name__ == "__main__":
    search()
