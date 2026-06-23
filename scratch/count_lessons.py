import re

with open("data.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

topic_idx = 0
global_counter = 1
for line in lines:
    m = re.search(r'numLessons:\s*(\d+)', line)
    if m:
        num = int(m.group(1))
        topic_idx += 1
        print(f"Unit {topic_idx}: lessons {global_counter} to {global_counter + num - 1} (Count: {num})")
        global_counter += num
