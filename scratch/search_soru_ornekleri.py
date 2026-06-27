import os
from docx import Document
import unicodedata

f = "/Users/faruknafizfazlioglu/Desktop/soru örnekleri bölümler.docx"
normalized = unicodedata.normalize('NFD', f)
if not os.path.exists(normalized):
    normalized = unicodedata.normalize('NFC', f)

try:
    doc = Document(normalized)
    print(f"Searching in: {os.path.basename(normalized)}")
    count = 0
    for i, p in enumerate(doc.paragraphs):
        text = p.text.strip()
        text_lower = text.lower()
        if "how to" in text_lower or "what to" in text_lower or "where to" in text_lower:
            print(f"P {i}: {text}")
            count += 1
            if count >= 30:
                print("Truncating list...")
                break
except Exception as e:
    print(f"Error: {e}")
