with open("data.js", "r", encoding="utf-8") as f:
    content = f.read()

# Find rawTopics block
start = content.find("const rawTopics = [")
end = content.find("];", start)
raw_topics_body = content[start:end+2]

# Let's count occurrences of 'title: ' inside rawTopics
titles = []
for line in raw_topics_body.splitlines():
    if "title:" in line:
        titles.append(line.strip())

print(f"Total topics found: {len(titles)}")
for idx, t in enumerate(titles):
    print(f"{idx+1}: {t}")
