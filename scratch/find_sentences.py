with open("/Users/faruknafizfazlioglu/Desktop/amok/scratch/matching_content.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Search for lines containing Turkish characters like 'ş', 'ğ', 'ı', 'İ', 'ö', 'ü'
turkish_chars = re = ["ş", "ğ", "ı", "ö", "ü", "ç", "Ş", "Ğ", "İ", "Ö", "Ü", "Ç"]
for i, line in enumerate(lines):
    if i < 200: # skip first 200 lines since we saw they have headers and prompts
        continue
    # Check if line contains any Turkish character and is at least 15 chars long
    has_tr = any(c in line for c in turkish_chars)
    if has_tr and len(line.strip()) > 15:
        print(f"Line {i+1}: {line.strip()}")
        if i > 1500: # print some at the end
            break
