import os
import zipfile
import xml.etree.ElementTree as ET

def get_docx_text(path):
    try:
        doc = zipfile.ZipFile(path)
        xml_content = doc.read('word/document.xml')
        root = ET.fromstring(xml_content)
        text = []
        for paragraph in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
            p_text = []
            for run in paragraph.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}r'):
                for t in run.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
                    p_text.append(t.text)
            if p_text:
                text.append("".join(p_text))
        return "\n".join(text)
    except:
        return None

files = [
    "/Users/faruknafizfazlioglu/Desktop/Bölüm dersleri promptu.docx",
    "/Users/faruknafizfazlioglu/Desktop/Academic reading sıralama.docx",
    "/Users/faruknafizfazlioglu/Desktop/dersler düzenleme.docx",
    "/Users/faruknafizfazlioglu/Desktop/İKİNCİ BÖLÜM.docx",
    "/Users/faruknafizfazlioglu/Desktop/eng dosya son halİ.docx",
    "/Users/faruknafizfazlioglu/Desktop/Amok Soru Yapılanlar.docx",
    "/Users/faruknafizfazlioglu/Desktop/amok düzenleme.docx",
    "/Users/faruknafizfazlioglu/Desktop/amok WORD.docx"
]

for f in files:
    if os.path.exists(f):
        txt = get_docx_text(f)
        if txt:
            print(f"File: {f} (Length: {len(txt)})")
            # check for some words
            for keyword in ["currently requires", "Time-Link", "Present Continuous", "Zaman Zarfları"]:
                if keyword.lower() in txt.lower():
                    print(f"  -> Found keyword: '{keyword}'")
    else:
        print(f"File does not exist: {f}")
