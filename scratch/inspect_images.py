from PIL import Image
import os

images = [
    "media__1782563834101.png",
    "media__1782563880412.png",
    "media__1782564027078.png"
]

base_dir = "/Users/faruknafizfazlioglu/.gemini/antigravity-ide/brain/f832a7c8-9e91-4b02-9471-d65eef3c281d"

for img_name in images:
    path = os.path.join(base_dir, img_name)
    if os.path.exists(path):
        with Image.open(path) as img:
            print(f"{img_name}: format={img.format}, size={img.size}, mode={img.mode}")
    else:
        print(f"{img_name} does not exist")
