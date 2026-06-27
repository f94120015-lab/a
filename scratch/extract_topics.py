import re
import json

def extract_topics():
    with open("/Users/faruknafizfazlioglu/Desktop/amok/data.js", "r", encoding="utf-8") as f:
        content = f.read()
    
    # Let's find the rawTopics definition
    match = re.search(r"const rawTopics = \[(.*?)\];", content, re.DOTALL)
    if not match:
        print("rawTopics not found in data.js")
        return
    
    # We can write a quick JS-like parser or regex-based extractor to get the titles of each topic.
    # Each topic looks like: { id: ..., title: "...", desc: "...", ... }
    topics = re.findall(r"title:\s*\"([^\"]+)\"", match.group(1))
    subtitles_matches = re.findall(r"subtitles:\s*\[(.*?)\]", match.group(1), re.DOTALL)
    
    print(f"Total topics: {len(topics)}")
    for idx, (title, subs_raw) in enumerate(zip(topics, subtitles_matches)):
        subs = re.findall(r"\"([^\"]+)\"", subs_raw)
        print(f"Topic {idx+1}: {title}")
        for s in subs:
            print(f"  Sub: {s}")

if __name__ == "__main__":
    extract_topics()
