import os
from docx import Document
import unicodedata

def find_text():
    f = "/Users/faruknafizfazlioglu/Desktop/amok düzenleme.docx"
    normalized = unicodedata.normalize('NFC', f)
    doc = Document(normalized)
    
    found_any = False
    for i, p in enumerate(doc.paragraphs):
        text = p.text.strip()
        if "edattan sonra" in text.lower() or "edatından sonra" in text.lower():
            print(f"P {i}: {text[:120]}")
            found_any = True
            
    if not found_any:
        print("No matches for 'edattan sonra'")

if __name__ == "__main__":
    find_text()
