import os
import glob
import unicodedata

def search():
    files = glob.glob("/Users/faruknafizfazlioglu/Desktop/*")
    for f in os.listdir("/Users/faruknafizfazlioglu/Desktop"):
        full_path = os.path.join("/Users/faruknafizfazlioglu/Desktop", f)
        if os.path.isdir(full_path):
            continue
        if f.startswith("~$") or f.startswith("."):
            continue
        try:
            # check extension
            ext = os.path.splitext(f)[1].lower()
            if ext in ['.txt', '.json', '.html', '.js', '.py', '.xml', '.csv']:
                with open(full_path, "r", encoding="utf-8", errors="ignore") as file:
                    content = file.read()
                    if "bodrum" in content.lower():
                        print(f"FOUND IN TXT: {f}")
            elif ext == '.docx':
                from docx import Document
                doc = Document(full_path)
                for i, p in enumerate(doc.paragraphs):
                    if "bodrum" in p.text.lower():
                        print(f"FOUND IN DOCX: {f} at paragraph {i}")
        except Exception as e:
            print(f"Error reading {f}: {e}")

if __name__ == "__main__":
    search()
