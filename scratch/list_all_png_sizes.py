import os
import struct

base_dir = "/Users/faruknafizfazlioglu/.gemini/antigravity-ide/brain/f832a7c8-9e91-4b02-9471-d65eef3c281d"

for filename in sorted(os.listdir(base_dir)):
    if filename.endswith(".png"):
        path = os.path.join(base_dir, filename)
        with open(path, "rb") as f:
            data = f.read(24)
            if data[:8] == b'\x89PNG\r\n\x1a\n':
                width, height = struct.unpack(">II", data[16:24])
                print(f"{filename}: width={width}, height={height}, size={os.path.getsize(path)}")
