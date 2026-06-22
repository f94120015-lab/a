from docx import Document

doc = Document("/Users/faruknafizfazlioglu/Desktop/matching.docx")

# Print paragraphs 40 to 120 to see if there is any Turkish translation inside or nearby
for i in range(40, 150):
    print(f"P {i}: {doc.paragraphs[i].text.strip()}")
