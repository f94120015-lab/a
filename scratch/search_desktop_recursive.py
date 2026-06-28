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
search_str = "requires additional financial"

# Search all text/code files and word files
for root, dirs, files in os.walk(desktop_path):
    # skip hidden dirs
    dirs[:] = [d for d in dirs if not d.startswith('.')]
    for file in files:
        if file.startswith('.'):
            continue
        filepath = os.path.join(root, file)
        ext = os.path.splitext(file)[1].lower()
        
        if ext == '.docx':
            text = get_docx_text(filepath)
            if search_str in text:
                print(f"Match (docx) in: {filepath}")
        elif ext in ['.txt', '.js', '.py', '.json', '.html', '.css', '.md']:
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    if search_str in content:
                        print(f"Match (text) in: {filepath}")
            except:
                pass
print("Search complete.")
