import os
import glob

def search_appdata():
    path = "/Users/faruknafizfazlioglu/.gemini/antigravity-ide"
    for root, dirs, files in os.walk(path):
        for f in files:
            if f.endswith('.md') or f.endswith('.txt') or f.endswith('.json') or f.endswith('.js'):
                full = os.path.join(root, f)
                try:
                    with open(full, "r", encoding="utf-8", errors="ignore") as file:
                        content = file.read()
                        if "would rather" in content.lower():
                            print(f"FOUND IN APPDATA: {full}")
                except:
                    pass

if __name__ == "__main__":
    search_appdata()
