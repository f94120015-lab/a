with open("data.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Let's locate the ranges
start_idx_raw = None
end_idx_raw = None
start_idx_map = None
end_idx_map = None

for idx, line in enumerate(lines):
    # Find start and end of raw arrays: lines 2440 to 2456
    if "const unit9Lesson1SentencesRaw = [" in line and start_idx_raw is None:
        start_idx_raw = idx
    if "const unit9Lesson5SentencesRaw = [...unit5LessonSentences[6]];" in line and end_idx_raw is None:
        end_idx_raw = idx

    # Find start and end of unitSentencesMap[9]: lines 5795 to 5817
    # 5795 is 9: {
    # 5817 is }, (ending map 9)
    if "  9: {" in line and start_idx_map is None:
        # Verify it's inside unitSentencesMap
        if idx > 5700 and idx < 5820:
            start_idx_map = idx
    if "  }," in line and start_idx_map is not None and end_idx_map is None:
        if idx > start_idx_map and idx < start_idx_map + 30:
            end_idx_map = idx

print(f"Raw array indices: start={start_idx_raw+1}, end={end_idx_raw+1}")
print(f"Map indices: start={start_idx_map+1}, end={end_idx_map+1}")

if any(x is None for x in [start_idx_raw, end_idx_raw, start_idx_map, end_idx_map]):
    print("Error: Could not locate all target ranges in data.js")
    exit(1)

# Read the replacement raw arrays
with open("scratch/js_arrays.txt", "r", encoding="utf-8") as f:
    js_arrays_content = f.read()

# Build the new content
new_lines = []

# Part 1: lines before raw arrays
new_lines.extend(lines[:start_idx_raw])

# Part 2: new raw arrays
new_lines.append(js_arrays_content + "\n")

# Part 3: lines between raw arrays and map 9
new_lines.extend(lines[end_idx_raw + 1:start_idx_map])

# Part 4: new map 9
new_map_9 = """  9: {
    1: { exercises: [
      buildCustom10QuestionExercises(unit9Lesson1SentencesRaw, 9, 23, 1, 0),
      buildCustom10QuestionExercises(unit9Lesson1SentencesRaw, 9, 23, 2, 10),
      buildCustom10QuestionExercises(unit9Lesson1SentencesRaw, 9, 23, 3, 20)
    ] },
    2: { exercises: [
      buildCustom10QuestionExercises(unit9Lesson2SentencesRaw, 9, 24, 1, 0),
      buildCustom10QuestionExercises(unit9Lesson2SentencesRaw, 9, 24, 2, 10),
      buildCustom10QuestionExercises(unit9Lesson2SentencesRaw, 9, 24, 3, 20)
    ] },
    3: { exercises: [
      buildCustom10QuestionExercises(unit9Lesson3SentencesRaw, 9, 25, 1, 0),
      buildCustom10QuestionExercises(unit9Lesson3SentencesRaw, 9, 25, 2, 10),
      buildCustom10QuestionExercises(unit9Lesson3SentencesRaw, 9, 25, 3, 20)
    ] },
    4: { exercises: [
      buildCustom10QuestionExercises(unit9Lesson4SentencesRaw, 9, 26, 1, 0),
      buildCustom10QuestionExercises(unit9Lesson4SentencesRaw, 9, 26, 2, 10),
      buildCustom10QuestionExercises(unit9Lesson4SentencesRaw, 9, 26, 3, 20)
    ] },
    5: { exercises: [
      buildCustom10QuestionExercises(unit9Lesson5SentencesRaw, 9, 27, 1, 0),
      buildCustom10QuestionExercises(unit9Lesson5SentencesRaw, 9, 27, 2, 10),
      buildCustom10QuestionExercises(unit9Lesson5SentencesRaw, 9, 27, 3, 20)
    ] }
  },
"""
new_lines.append(new_map_9)

# Part 5: lines after map 9
new_lines.extend(lines[end_idx_map + 1:])

# Write back to data.js
with open("data.js", "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("data.js successfully updated!")
