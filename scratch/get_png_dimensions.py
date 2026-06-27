import os
import struct

images = [
    "media__1782563834101.png",
    "media__1782563880412.png",
    "media__1782564027078.png"
]

base_dir = "/Users/faruknafizfazlioglu/.gemini/antigravity-ide/brain/f832a7c8-9e91-4b02-9471-d65eef3c281d"

for img_name in images:
    path = os.path.join(base_dir, img_name)
    if os.path.exists(path):
        with open(path, "rb") as f:
            data = f.read(24)
            if data[:8] == b'\x89PNG\r\n\x1a\n':
                # IHDR chunk starts at offset 12, length 4 bytes 'IHDR' then 4 bytes width, 4 bytes height
                width, height = struct.unpack(">II", data[16:24])
                print(f"{img_name}: width={width}, height={height}")
            else:
                print(f"{img_name}: not a valid PNG")
    else:
        print(f"{img_name} does not exist")
