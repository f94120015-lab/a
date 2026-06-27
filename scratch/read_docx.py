import zipfile
import xml.etree.ElementTree as ET
import os

def get_docx_text(path):
    try:
        doc = zipfile.ZipFile(path)
        xml_content = doc.read('word/document.xml')
        root = ET.fromstring(xml_content)
        
        # Word XML namespaces
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
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
        return f"Error reading {path}: {e}"

path = "/Users/faruknafizfazlioglu/Desktop/amok/Alıstırma_Yazılı_Ceviri_Sınırlandırma_Raporu.docx"
if os.path.exists(path):
    print("--- Alıstırma_Yazılı_Ceviri_Sınırlandırma_Raporu.docx TEXT ---")
    print(get_docx_text(path)[:2000])  # print first 2000 chars
else:
    print("Docx file does not exist")
