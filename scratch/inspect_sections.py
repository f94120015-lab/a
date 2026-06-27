import os
from docx import Document
import unicodedata

def inspect_sections():
    f = "/Users/faruknafizfazlioglu/Desktop/amok düzenleme.docx"
    normalized = unicodedata.normalize('NFC', f)
    doc = Document(normalized)
    
    found_xvi = False
    count = 0
    for i, p in enumerate(doc.paragraphs):
        text = p.text.strip()
        if "XVI." in text:
            found_xvi = True
            print(f"--- START INSPECTION AT P {i} ---")
        if found_xvi:
            print(f"P {i}: {text}")
            count += 1
            if count > 100:
                break

if __name__ == "__main__":
    inspect_sections()
