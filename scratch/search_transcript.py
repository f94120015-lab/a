import json

transcript_path = "/Users/faruknafizfazlioglu/.gemini/antigravity-ide/brain/403e770d-a23e-4804-94e6-631fef4d19a6/.system_generated/logs/transcript.jsonl"

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            if step.get("source") == "USER_EXPLICIT" or step.get("type") == "USER_INPUT":
                content = step.get("content", "")
                if "activity" in content.lower() or "adverb" in content.lower() or "adjective" in content.lower() or "noun" in content.lower():
                    print(f"Step {step.get('step_index')}:")
                    print(content[:500])
                    print("-" * 50)
        except Exception as e:
            pass
