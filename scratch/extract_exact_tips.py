with open("scratch/matching_content.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

tips_ranges = {
    1: (37, 66),
    2: (69, 98),
    3: (101, 130),
    4: (133, 162),
    5: (165, 194)
}

for tip_id, (start, end) in tips_ranges.items():
    print(f"\n==================== TIP {tip_id} ====================")
    # lines is 0-indexed, so line X is at lines[X-1]
    for idx, line_num in enumerate(range(start, end + 1)):
        line_content = lines[line_num - 1].strip()
        print(f"{idx+1} (Line {line_num}): {line_content}")
