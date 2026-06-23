import os
from docx import Document
import unicodedata

fpath = "/Users/faruknafizfazlioglu/Desktop/amok WORD.docx"
f_norm = unicodedata.normalize('NFC', fpath)
if os.path.exists(f_norm):
    doc = Document(f_norm)
    print("Searching in amok WORD.docx...")
    
    queries = ["39. ders", "fiil ismi", "gerund", "112", "fiil-ismi", "özne olarak"]
    for q in queries:
        print(f"\nSearching for query '{q}':")
        count = 0
        for i, p in enumerate(doc.paragraphs):
            if q in p.text.lower():
                print(f"  P {i}: {p.text.strip()}")
                count += 1
                if count >= 10:
                    print("  ... (showing first 10 matches)")
                    break
else:
    print("File not found")
