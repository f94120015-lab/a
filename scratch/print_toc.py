import os
from docx import Document
import unicodedata

def print_toc():
    f = "/Users/faruknafizfazlioglu/Desktop/amok düzenleme.docx"
    normalized = unicodedata.normalize('NFC', f)
    doc = Document(normalized)
    
    start_printing = False
    count = 0
    for i, p in enumerate(doc.paragraphs):
        text = p.text.strip()
        if "İÇİNDEKİLER" in text.upper():
            start_printing = True
        
        if start_printing:
            print(f"P {i}: {text}")
            count += 1
            if "BÖLÜM" in text.upper() and any(x in text for x in ["XVIII", "18", "19", "XIX"]):
                # Let's read a bit more to ensure we capture all of section 18
                pass
            if count > 120:  # let's print 120 paragraphs to be sure
                break

if __name__ == "__main__":
    print_toc()
