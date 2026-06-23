import re

with open("app.js", "r", encoding="utf-8") as f:
    app_content = f.read()

dict_match = re.search(r'const wordDictionary = \{(.*?)\n\};', app_content, re.DOTALL)
if dict_match:
    dict_content = dict_match.group(1)
    # Find all pattern like "key": "value" or 'key': "value"
    entries = re.findall(r'["\']([^"\']+)["\']\s*:\s*["\']([^"\']+)["\']', dict_content)
    print(f"Total entries: {len(entries)}")
    
    keys = {}
    duplicates = {}
    for k, v in entries:
        if k in keys:
            if v != keys[k]:
                duplicates[k] = (keys[k], v)
        else:
            keys[k] = v
            
    print(f"Unique keys: {len(keys)}")
    print(f"Duplicates with different values: {len(duplicates)}")
    for k, (v1, v2) in duplicates.items():
        print(f"  - '{k}': original: '{v1}', duplicate: '{v2}'")
else:
    print("wordDictionary not found")
