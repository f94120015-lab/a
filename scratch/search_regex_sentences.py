import os
import re
from docx import Document
import unicodedata

f1 = "/Users/faruknafizfazlioglu/Desktop/Kübra Çalışma Dosyası. Diğerleri Sil - Kopya ilk hali.docx"
f2 = "/Users/faruknafizfazlioglu/Desktop/amok düzenleme.docx"

pattern = re.compile(r'\b(how|what|where|when|whether|whom|which|who)\s+to\s+\w+', re.IGNORECASE)

def search_file(file_path):
    normalized = unicodedata.normalize('NFD', file_path)
    if not os.path.exists(normalized):
        normalized = unicodedata.normalize('NFC', file_path)
    if not os.path.exists(normalized):
        print(f"File not found: {file_path}")
        return []
    
    doc = Document(normalized)
    matches = []
    for i, p in enumerate(doc.paragraphs):
        text = p.text.strip()
        if not text:
            continue
        if pattern.search(text):
            matches.append((i, text))
    return matches

m1 = search_file(f1)
print(f"Found {len(m1)} matches in Kübra Çalışma Dosyası...")
for idx, text in m1[:10]:
    print(f"  P {idx}: {text}")

m2 = search_file(f2)
print(f"\nFound {len(m2)} matches in amok düzenleme.docx")
for idx, text in m2[:10]:
    print(f"  P {idx}: {text}")
