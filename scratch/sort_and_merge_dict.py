import re

def clean_value(val):
    # Split by '/' or ' / ' or ' /' or '/ '
    parts = re.split(r'\s*/\s*', val)
    seen = []
    for p in parts:
        p = p.strip()
        if p and p not in seen:
            seen.append(p)
    return " / ".join(seen)

with open("app.js", "r", encoding="utf-8") as f:
    app_content = f.read()

# Match the entire wordDictionary
dict_match = re.search(r'(const wordDictionary = \{)(.*?)(\n\};)', app_content, re.DOTALL)
if not dict_match:
    print("wordDictionary not found")
    exit(1)

start_part = dict_match.group(1)
dict_content = dict_match.group(2)
end_part = dict_match.group(3)

# Find all entries: "key": "value", or 'key': "value", etc.
# We match "key": "value" while being careful with escaping
entries = re.findall(r'["\']([^"\']+)["\']\s*:\s*["\']((?:[^"\\]|\\.)*)["\']', dict_content)

print(f"Parsed entries count: {len(entries)}")

merged_dict = {}
for k, v in entries:
    k = k.strip()
    v = v.strip()
    # Unescape value quotes if needed, but usually we just keep it
    if k in merged_dict:
        # Merge translations
        v1 = merged_dict[k]
        merged_val = clean_value(v1 + " / " + v)
        merged_dict[k] = merged_val
    else:
        merged_dict[k] = clean_value(v)

print(f"Unique keys count: {len(merged_dict)}")

# Now construct the sorted JS dictionary lines
vocab_lines = []
for k in sorted(merged_dict.keys()):
    v = merged_dict[k]
    # Escape quotes
    k_esc = k.replace('"', '\\"')
    v_esc = v.replace('"', '\\"')
    vocab_lines.append(f'  "{k_esc}": "{v_esc}",')

# Format the dictionary content
new_dict_content = "\n" + "\n".join(vocab_lines)

# Replace the block
new_app_content = app_content[:dict_match.start(2)] + new_dict_content + app_content[dict_match.end(2):]

with open("app.js", "w", encoding="utf-8") as f:
    f.write(new_app_content)

print("Saved app.js with merged and alphabetically sorted wordDictionary.")
