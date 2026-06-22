import os

desktop = "/Users/faruknafizfazlioglu/Desktop"
target = "is the data valid"

for root, dirs, files in os.walk(desktop):
    for f in files:
        if f.startswith("~$") or f.endswith(".png") or f.endswith(".jpg") or f.endswith(".jpeg") or f.endswith(".zip") or f.endswith(".pdf") or f.endswith(".apk") or f.endswith(".ai"):
            continue
        fpath = os.path.join(root, f)
        try:
            with open(fpath, "r", encoding="utf-8", errors="ignore") as file:
                content = file.read()
                if target in content.lower():
                    print(f"Found in text/source file: {fpath}")
        except Exception:
            pass
print("Search done.")
