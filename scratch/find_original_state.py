import subprocess

# Let's get the git diff of data.js for the lines containing unit6Lesson2SentencesRaw and unit7LessonSentences[1]
# We can do this by running 'git diff HEAD' or checking the commit history.
# Wait, since the user workspace is a git repository, let's see what was changed in our recent edits.
# Let's run `git diff HEAD` and parse the lines for unit6Lesson2SentencesRaw and unit7LessonSentences[1]

result = subprocess.run(["git", "diff", "data.js"], capture_output=True, text=True)
diff = result.stdout

lines = diff.split("\n")
show = False
count = 0
for line in lines:
    if "unit6Lesson2SentencesRaw" in line or "unit7LessonSentences" in line:
        show = True
        count = 0
    if show:
        print(line)
        count += 1
        if count > 40:
            show = False
            print("...")
