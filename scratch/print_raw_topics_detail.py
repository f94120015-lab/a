import re

def print_raw_topics_detail():
    with open("/Users/faruknafizfazlioglu/Desktop/amok/data.js", "r", encoding="utf-8") as f:
        content = f.read()
    
    # Locate rawTopics array
    match = re.search(r"const rawTopics = \[(.*?)\];", content, re.DOTALL)
    if not match:
        print("rawTopics not found")
        return
    
    raw_topics_str = match.group(1)
    
    # Find all objects inside rawTopics
    # Simple regex block finder: look for { ... }
    blocks = re.findall(r"\{\s*id:\s*(\d+),\s*title:\s*\"([^\"]+)\",(.*?)\s*\},", raw_topics_str, re.DOTALL)
    
    for i, (tid, title, rest) in enumerate(blocks[:18]):
        # extract numLessons
        num_lessons_match = re.search(r"numLessons:\s*(\d+)", rest)
        num_lessons = num_lessons_match.group(1) if num_lessons_match else "N/A"
        
        # extract subtitles
        subtitles_match = re.search(r"subtitles:\s*\[(.*?)\]", rest, re.DOTALL)
        subs = []
        if subtitles_match:
            subs = re.findall(r"\"([^\"]+)\"", subtitles_match.group(1))
            
        print(f"Index {i}: ID={tid} | Title: {title} | Lessons count: {num_lessons}")
        for s_idx, s in enumerate(subs):
            print(f"  - Sub {s_idx + 1}: {s}")
        print("-" * 50)

if __name__ == "__main__":
    print_raw_topics_detail()
