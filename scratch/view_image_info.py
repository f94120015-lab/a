import os
from PIL import Image

def image_info():
    path = "/Users/faruknafizfazlioglu/.gemini/antigravity-ide/brain/f832a7c8-9e91-4b02-9471-d65eef3c281d"
    for f in os.listdir(path):
        if f.endswith('.png'):
            full = os.path.join(path, f)
            try:
                img = Image.open(full)
                print(f"Image: {f} | Size: {img.size} | Format: {img.format}")
            except Exception as e:
                print(f"Error {f}: {e}")

if __name__ == "__main__":
    image_info()
