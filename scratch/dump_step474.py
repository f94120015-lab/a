import json

transcript_path = "/Users/faruknafizfazlioglu/.gemini/antigravity-ide/brain/403e770d-a23e-4804-94e6-631fef4d19a6/.system_generated/logs/transcript.jsonl"

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            if step.get("step_index") == 474:
                print("=== Step 474 ===")
                print(step.get("content"))
                print("=" * 80)
        except Exception as e:
            pass
