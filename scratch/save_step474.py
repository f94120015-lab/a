import json

transcript_path = "/Users/faruknafizfazlioglu/.gemini/antigravity-ide/brain/403e770d-a23e-4804-94e6-631fef4d19a6/.system_generated/logs/transcript.jsonl"
output_path = "/Users/faruknafizfazlioglu/Desktop/amok/scratch/step474_full.txt"

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            if step.get("step_index") == 474:
                with open(output_path, 'w', encoding='utf-8') as out:
                    out.write(step.get("content"))
                print(f"Full step 474 saved to {output_path}")
                break
        except Exception as e:
            pass
