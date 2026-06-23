import re

with open("data.js", "r", encoding="utf-8") as f:
    content = f.read()

# Let's locate 'const rawTopics = [' and follow the closing brace
start_match = re.search(r'const rawTopics = \[', content)
if not start_match:
    print("Could not find rawTopics")
    exit()

start_pos = start_match.start()

# We want to find the matching closing bracket ']' for rawTopics
# Let's count open/close brackets
bracket_count = 0
end_pos = None
for pos in range(start_pos + len("const rawTopics = "), len(content)):
    char = content[pos]
    if char == '[':
        bracket_count += 1
    elif char == ']':
        bracket_count -= 1
        if bracket_count == -1: # Closed the main rawTopics array
            end_pos = pos + 1
            break

raw_topics_js = content[start_pos:end_pos]
print("Raw Topics length:", len(raw_topics_js))

# Let's parse each element inside the rawTopics array using a simple regex for title: "..."
titles = re.findall(r'title:\s*["\']([^"\']+)["\']', raw_topics_js)
for i, t in enumerate(titles):
    print(f"Topic {i+1}: {t}")
