import os
import glob
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
        return ""

desktop_path = "/Users/faruknafizfazlioglu/Desktop"
docx_files = glob.glob(os.path.join(desktop_path, "*.docx"))
docx_files += glob.glob(os.path.join(desktop_path, "*/*.docx"))

for f in docx_files:
    text = get_docx_text(f)
    if "simulation" in text.lower():
        print(f"Match found in: {f}")
        # Print matching paragraphs
        for line in text.split("\n"):
            if "simulation" in line.lower():
                print(f"  Line: {line}")
print("Search done.")
