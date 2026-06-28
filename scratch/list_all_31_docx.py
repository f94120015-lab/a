import os
import glob

desktop_path = "/Users/faruknafizfazlioglu/Desktop"
docx_files = glob.glob(os.path.join(desktop_path, "*.docx"))
docx_files += glob.glob(os.path.join(desktop_path, "*/*.docx"))

print(f"Total docx files: {len(docx_files)}")
for f in sorted(docx_files):
    print(f)
