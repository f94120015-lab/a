with open("data.js", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("\r\n", "\n")
pos = content.find('title: "XVI. Fiil İsmi (Gerund)')
if pos != -1:
    start = max(0, pos - 200)
    end = pos + 100
    snippet = content[start:end]
    print("--- SNIPPET ---")
    print(repr(snippet))
else:
    print("Not found!")
