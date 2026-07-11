import json
import os
import re

# List of V3 verbs in Unit 11
V3_VERBS = [
    "abandoned", "accumulated", "advocated", "allocated", "altered", "anticipated",
    "calculated", "clarified", "conducted", "defined", "derived", "detected",
    "expanded", "exposed", "induced", "inspected", "integrated", "manipulated",
    "maximized", "minimized", "modified", "processed", "protected", "restricted",
    "shifted", "specified", "stabilized", "suspended", "terminated", "triggered",
    "validated", "violated"
]

def highlight_modal_and_passives(text):
    if not isinstance(text, str):
        return text

    # 1. First, highlight the passives (red)
    for verb in V3_VERBS:
        pattern = rf"\b(not\s+)?be\s+(rapidly\s+|explicitly\s+)?{verb}\b"
        def rep_passive(m):
            matched_text = m.group(0)
            return f"<span style='color: #ff6b6b; font-weight: bold;'>{matched_text}</span>"
        text = re.sub(pattern, rep_passive, text, flags=re.IGNORECASE)

    # 2. Next, highlight the modals (blue)
    # Modals list: can, cannot, can't, could, couldn't, may, might, mightn't, must, mustn't, should, shouldn't, will, won't, ought (not )?to
    # We must match them case-insensitively but avoid matching inside HTML tags (like style attributes containing 'color' etc.)
    # We can match words outside of <...> brackets.
    # To do this safely, we split by html tags, replace modals in plain text, then join them back.
    parts = re.split(r'(<[^>]+>)', text)
    modal_pattern = r"\b(can|cannot|can't|could|couldn't|may|might|mightn't|must|mustn't|should|shouldn't|will|won't|ought\s+(?:not\s+)?to)\b"
    
    for i in range(len(parts)):
        # If it is not an HTML tag, apply replacement
        if not parts[i].startswith('<'):
            def rep_modal(m):
                matched_text = m.group(0)
                return f"<span style='color: #3498db; font-weight: bold;'>{matched_text}</span>"
            parts[i] = re.sub(modal_pattern, rep_modal, parts[i], flags=re.IGNORECASE)
            
    return "".join(parts)

def process_node(node, highlight_keys):
    if isinstance(node, dict):
        new_dict = {}
        for k, v in node.items():
            if k in highlight_keys and isinstance(v, str):
                new_dict[k] = highlight_modal_and_passives(v)
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
    print("Modifying data.js to highlight modals (blue) and passives (red) in Unit 11 (Bölüm 9)...")
    
    # 1. Restore data.js first to get clean slate
    os.system("git restore data.js")
    
    # 2. Re-apply all changes up to Unit 10 highlights
    os.system("python3 -c 'import apply_u10_passive_highlights_v2; apply_u10_passive_highlights_v2.main()'")
    
    with open("data.js", "r", encoding="utf-8") as f:
        content = f.read()

    # Find boundaries of Unit 11 lessons
    start_anchor = '  "11": {'
    start_idx = content.find(start_anchor)
    if start_idx == -1:
        print("ERROR: Start of Unit 11 not found.")
        return

    open_brace_idx = content.find('{', start_idx)
    next_unit_anchor = '  "12": {'
    end_anchor_idx = content.find(next_unit_anchor, open_brace_idx)
    if end_anchor_idx == -1:
        print("ERROR: Next unit not found.")
        return
        
    close_brace_idx = content.rfind('}', start_idx, end_anchor_idx)
    if close_brace_idx == -1:
        print("ERROR: Closing brace of Unit 11 not found.")
        return

    # Extract the lessons content
    lessons_block = content[open_brace_idx + 1 : close_brace_idx].strip()
    
    # Parse as JSON dictionary of lessons
    try:
        lessons_json = json.loads("{" + lessons_block + "}")
    except Exception as e:
        print(f"ERROR: Failed to parse Unit 11 lessons as JSON: {e}")
        return

    # Process and highlight selectively
    highlight_keys = ["prompt", "sentence", "enSentence", "translation", "phrase"]
    updated_lessons_json = process_node(lessons_json, highlight_keys)

    # Format the updated JSON string back
    updated_lessons_str = json.dumps(updated_lessons_json, indent=4, ensure_ascii=False)
    
    inner_block = updated_lessons_str.strip()
    if inner_block.startswith('{'):
        inner_block = inner_block[1:]
    if inner_block.endswith('}'):
        inner_block = inner_block[:-1]
    inner_block = inner_block.strip()

    # Re-align indentation
    lines = inner_block.split('\n')
    indented_lines = []
    for line in lines:
        indented_lines.append("    " + line)
    final_lessons_str = '\n'.join(indented_lines).strip()
    
    # Replace content
    content = content[:open_brace_idx + 1] + "\n    " + final_lessons_str + "\n  " + content[close_brace_idx:]

    with open("data.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("Selective highlighting for Unit 11 complete.")

if __name__ == "__main__":
    main()
