import json

log_path = "/Users/faruknafizfazlioglu/.gemini/antigravity-ide/brain/f832a7c8-9e91-4b02-9471-d65eef3c281d/.system_generated/logs/transcript.jsonl"

with open(log_path, "r", encoding="utf-8") as f:
    for line in f:
        try:
            step = json.loads(line)
            if step.get("type") == "USER_INPUT":
                content = step.get("content", "")
                if "görsel" in content.lower() or "resim" in content.lower() or "dosya" in content.lower() or "image" in content.lower():
                    print(f"STEP {step.get('step_index')}: {content}")
        except Exception as e:
            pass
