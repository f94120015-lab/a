with open("data.js", "r", encoding="utf-8") as f:
    content = f.read()

# Let's run a simple javascript engine or search for topic titles in python
import re
titles = re.findall(r'title:\s*["\']([^"\']+)["\']', content)
for idx, title in enumerate(titles):
    print(f"Topic {idx+1}: {title}")
