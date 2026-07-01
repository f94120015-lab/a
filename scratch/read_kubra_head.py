import docx
import os

filepath = "/Users/faruknafizfazlioglu/Desktop/Kübra Çalışma Dosyası. Diğerleri Sil - Kopya ilk hali.docx"
doc = docx.Document(filepath)

for i in range(0, 150):
    text = doc.paragraphs[i].text.strip()
    if text:
        print(f"P {i}: {text}")
