import os, glob
desktop_dir = '/Users/faruknafizfazlioglu/Desktop'
docx_files = glob.glob(os.path.join(desktop_dir, '*.docx'))
print("Docx files directly on Desktop:")
for f in docx_files:
    print(f)
