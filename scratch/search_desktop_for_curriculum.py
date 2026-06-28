import glob
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
    except Exception as e:
        return ""

desktop_path = "/Users/faruknafizfazlioglu/Desktop"
docx_files = glob.glob(os.path.join(desktop_path, "*.docx"))
docx_files += glob.glob(os.path.join(desktop_path, "*/*.docx"))

print(f"Found {len(docx_files)} docx files.")

for f in docx_files:
    text = get_docx_text(f)
    if "currently requires" in text or "Time-Link" in text:
        print(f"Match found in: {f}")
        # Print around the match
        idx = text.find("currently requires")
        if idx == -1:
            idx = text.find("Time-Link")
        start = max(0, idx - 100)
        end = min(len(text), idx + 2000)
        print(text[start:end])
        print("="*40)
