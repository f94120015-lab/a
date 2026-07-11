import json
import os
import re

# List of exact passive patterns to match (case-insensitive)
PASSIVE_PATTERNS = [
    r"\bare\s+calculated\b", r"\bare\s+not\s+calculated\b",
    r"\bare\s+defined\b", r"\bare\s+not\s+defined\b",
    r"\bare\s+derived\b", r"\bare\s+not\s+derived\b",
    r"\bbe\s+altered\b",
    r"\bbe\s+exposed\b",
    r"\bbe\s+induced\b",
    r"\bbe\s+restricted\b",
    r"\bbe\s+stabilized\b",
    r"\bbeen\s+accumulated\b",
    r"\bbeen\s+allocated\b",
    r"\bbeen\s+shifted\b",
    r"\bbeen\s+violated\b",
    r"\bis\s+abandoned\b",
    r"\bis\s+advocated\b", r"\bis\s+not\s+advocated\b",
    r"\bis\s+anticipated\b", r"\bis\s+not\s+anticipated\b",
    r"\bis\s+expanded\b", r"\bis\s+not\s+expanded\b",
    r"\bis\s+inspected\b", r"\bis\s+not\s+inspected\b",
    r"\bis\s+specified\b", r"\bis\s+not\s+specified\b",
    r"\bis\s+triggered\b",
    r"\bwas\s+clarified\b", r"\bwas\s+not\s+clarified\b",
    r"\bwas\s+detected\b",
    r"\bwas\s+manipulated\b", r"\bwas\s+not\s+manipulated\b",
    r"\bwas\s+processed\b", r"\bwas\s+not\s+processed\b",
    r"\bwere\s+conducted\b", r"\bwere\s+not\s+conducted\b",
    r"\bwere\s+integrated\b", r"\bwere\s+not\s+integrated\b",
    r"\bwere\s+modified\b", r"\bwere\s+not\s+modified\b",
    r"\bwere\s+suspended\b", r"\bwere\s+not\s+suspended\b",
    r"\bwere\s+terminated\b", r"\bwere\s+not\s+terminated\b",
    r"\bwere\s+validated\b"
]

def highlight_passives(text):
    if not isinstance(text, str):
        return text
    for pat in PASSIVE_PATTERNS:
        def rep(m):
            matched_text = m.group(0)
            return f"<span style='color: #ff6b6b; font-weight: bold;'>{matched_text}</span>"
        text = re.sub(pat, rep, text, flags=re.IGNORECASE)
    return text

def process_node(node, highlight_keys):
    if isinstance(node, dict):
        new_dict = {}
        for k, v in node.items():
            if k in highlight_keys and isinstance(v, str):
                new_dict[k] = highlight_passives(v)
            elif k in ["options", "pairs", "words", "correctOrder", "correctSentence", "correctSequence", "scrambled_elements", "correct_sequence"]:
                new_dict[k] = v
            else:
                new_dict[k] = process_node(v, highlight_keys)
        return new_dict
    elif isinstance(node, list):
        return [process_node(item, highlight_keys) for item in node]
    else:
        return node

def main():
    print("Modifying data.js to highlight passive 'be + V3' patterns in Unit 10 (V2)...")
    
    # 1. Restore data.js first to get clean slate
    os.system("git restore data.js")
    
    # 2. Re-apply baseline changes
    os.system("python3 -c 'import apply_all_changes_v3; apply_all_changes_v3.main()'")
    
    with open("data.js", "r", encoding="utf-8") as f:
        content = f.read()

    start_anchor = '  "10": {'
    start_idx = content.find(start_anchor)
    if start_idx == -1:
        print("ERROR: Start of Unit 10 not found.")
        return

    open_brace_idx = content.find('{', start_idx)
    next_unit_anchor = '  "11": {'
    end_anchor_idx = content.find(next_unit_anchor, open_brace_idx)
    if end_anchor_idx == -1:
        print("ERROR: Next unit not found.")
        return
        
    close_brace_idx = content.rfind('}', start_idx, end_anchor_idx)
    if close_brace_idx == -1:
        print("ERROR: Closing brace of Unit 10 not found.")
        return

    lessons_block = content[open_brace_idx + 1 : close_brace_idx].strip()
    
    try:
        lessons_json = json.loads("{" + lessons_block + "}")
    except Exception as e:
        print(f"ERROR: Failed to parse Unit 10 lessons as JSON: {e}")
        return

    highlight_keys = ["prompt", "sentence", "enSentence", "translation", "phrase"]
    updated_lessons_json = process_node(lessons_json, highlight_keys)

    updated_lessons_str = json.dumps(updated_lessons_json, indent=4, ensure_ascii=False)
    
    inner_block = updated_lessons_str.strip()
    if inner_block.startswith('{'):
        inner_block = inner_block[1:]
    if inner_block.endswith('}'):
        inner_block = inner_block[:-1]
    inner_block = inner_block.strip()

    lines = inner_block.split('\n')
    indented_lines = []
    for line in lines:
        indented_lines.append("    " + line)
    final_lessons_str = '\n'.join(indented_lines).strip()
    
    content = content[:open_brace_idx + 1] + "\n    " + final_lessons_str + "\n  " + content[close_brace_idx:]

    with open("data.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("Selective highlighting for Unit 10 complete.")

if __name__ == "__main__":
    main()
