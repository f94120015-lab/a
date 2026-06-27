import re
import json

def load_dictionary():
    with open("/Users/faruknafizfazlioglu/Desktop/amok/app.js", "r", encoding="utf-8") as f:
        content = f.read()
    
    # Extract the dictionary content
    match = re.search(r"const wordDictionary = \{(.*?)\};", content, re.DOTALL)
    if not match:
        print("Dictionary not found in app.js")
        return {}
    
    dict_content = match.group(1)
    # Parse lines like "word": "translation",
    words = {}
    for line in dict_content.splitlines():
        line = line.strip()
        if not line or line.startswith("//"):
            continue
        line_match = re.match(r'"([^"]+)"\s*:\s*"([^"]+)"', line)
        if line_match:
            words[line_match.group(1)] = line_match.group(2)
    return words

def find_missing_words():
    dict_words = load_dictionary()
    print(f"Total dictionary words: {len(dict_words)}")
    
    # List of new sentences
    sentences = [
        # Yapı 1
        "I would rather live in Bodrum than in Ankara.",
        "The software team would rather optimize the cloud database tonight.",
        "The laboratory researcher would rather request statistical data than conduct surveys.",
        "They would rather develop the app framework in Flutter than use outdated tools.",
        "We would rather reinforce the central concrete core than risk a structural anomaly.",
        "He would rather buy an electric vehicle for the facility than a diesel car.",
        "I would rather work on a new architectural framework than maintain old scripts.",
        "Senior analysts would rather evaluate data charts than read long regional surveys.",
        "Institutional authorities would rather settle the commercial dispute without a lawsuit.",
        "She would rather read an academic paper regarding encryption than a regular journal.",
        "Technical experts would rather design a new system than modify the old framework.",
        "The evaluation committee would rather publish the qualitative insights next month.",
        "Government agencies would rather process data locally to protect user privacy.",
        "Annual auditors would rather utilize advanced encryption algorithms for deep scanning.",
        "The education ministry would rather organize a digital summit than local meetings.",
        # Yapı 2
        "I would rather have travelled to the international summit by train last month.",
        "The technical expert would rather have chosen an alternative research methodology.",
        "The corporation would rather have invested its annual research budget in technology.",
        "We would rather have integrated individual software modules before the critical deadline.",
        "Technicians would rather have stayed at the modern industrial facility during the test.",
        "He would rather have studied computer engineering before designing this framework.",
        "I would rather have checked the automated script error logs yesterday morning.",
        "You would rather have taken the shorter path to avoid the network congestion.",
        "The council would rather have declined the formal bilateral agreements politely.",
        "We would rather have spent our research funds on a specialized local committee.",
        "The software team would rather have deployed the script after comprehensive testing.",
        "Government agencies would rather have installed the security patch during peak maintenance.",
        "Independent experts would rather have inspected the underlying structural framework sooner.",
        "The laboratory researcher would rather have collected more empirical inputs initially.",
        "Senior financial analysts would rather have anticipated the dynamic sector breakdown.",
        # Yapı 3
        "I would rather the technical expert took a plane to the international summit.",
        "The manager would rather the junior technician didn't come to the laboratory today.",
        "I would rather you didn't use the centralized cloud database console right now.",
        "The director would rather the software team updated the system parameters tonight.",
        "We would rather she signed the formal bilateral commercial agreements tomorrow.",
        "The ministry would rather the specialized committee worked in a public institution.",
        "They would rather you didn't modify substantial empirical inputs inside the office.",
        "Annual auditors would rather the software team resolved the data anomaly.",
        "The evaluation committee would rather the researcher published the insights.",
        "Government agencies would rather the council processed the data locally.",
        "The principal researcher would rather the assistant sterilized the test-tubes.",
        "Senior analysts would rather the team evaluated the data charts.",
        "I would rather the technician stayed at the modern industrial facility.",
        "They would rather the corporation invested its annual research budget in technology.",
        "We would rather you checked the automated script error logs.",
        # Yapı 4
        "I would rather the technical expert had taken a plane to the international summit last week.",
        "The manager would rather the junior technician had not come to the laboratory yesterday.",
        "I would rather you had not used the centralized cloud database console during the presentation.",
        "The director would rather the software team had updated the system parameters before the test.",
        "We would rather she had signed the formal bilateral commercial agreements during the summit.",
        "The ministry would rather the specialized committee had worked in a public institution last year.",
        "They would rather you had not modified substantial empirical inputs inside the office yesterday.",
        "Annual auditors would rather the software team had resolved the data anomaly sooner.",
        "The evaluation committee would rather the researcher had published the insights last month.",
        "Government agencies would rather the council had processed the data locally to protect privacy.",
        "The principal researcher would rather the assistant had sterilized the test-tubes before use.",
        "Senior analysts would rather the team had evaluated the data charts before the presentation.",
        "I would rather the technician had stayed at the modern industrial facility last night.",
        "They would rather the corporation had invested its annual research budget in technology.",
        "We would rather you had checked the automated script error logs immediately."
    ]

    missing = set()
    for sentence in sentences:
        # Clean sentence punctuation
        cleaned = re.sub(r"[^\w\s-]", "", sentence)
        for word in cleaned.split():
            word_lower = word.lower()
            if word_lower not in dict_words:
                missing.add(word_lower)
                
    print(f"Total potentially missing words: {len(missing)}")
    print(sorted(list(missing)))

if __name__ == "__main__":
    find_missing_words()
