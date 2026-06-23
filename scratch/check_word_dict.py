import re

words_to_check = [
    "factors", "emerging", "study", "authors", "publishing", "academic", "journals",
    "companies", "competing", "sector", "dynamic", "variables", "changing", "process",
    "separate", "groups", "participating", "initial", "project", "structural",
    "components", "remaining", "site", "fundamental", "principles", "underlying",
    "economic", "theory", "independent", "researchers", "working", "administration",
    "consistent", "layers", "forming", "bottom", "container", "legal", "authorities",
    "acting", "constitutional", "clauses"
]

with open("app.js", "r", encoding="utf-8") as f:
    app_content = f.read()

# Find the wordDictionary segment
dict_match = re.search(r'const wordDictionary = \{(.*?)\};', app_content, re.DOTALL)
if dict_match:
    dict_content = dict_match.group(1)
    # Extract keys
    keys = set(re.findall(r'["\']([^"\']+)["\']\s*:', dict_content))
    
    missing = []
    for w in words_to_check:
        if w not in keys:
            missing.append(w)
            
    print("Missing words in wordDictionary:")
    for m in missing:
        print(f"  - {m}")
else:
    print("wordDictionary not found in app.js")
