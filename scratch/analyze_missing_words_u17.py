import re

unit17_sentences = [
    # Tip 1 Phrases
    "By analyzing the raw data", "By utilizing the mobile interface", "By modifying the legislative framework",
    "By structuring the financial resources", "By integrating the individual applications", "Without defining the specific criteria",
    "Without publishing the official summary", "Without monitoring the local conditions", "Without generating the JSON structure",
    "Without altering the statistical analysis", "On encountering technical errors", "On tracking the match schedules",
    "On regulating the battery temperature", "On converting the separate pages", "On identifying the target goals",
    "In evaluating the academic curriculum", "In processing the scanned text", "In adjusting the dynamic parameters",
    "In maintaining the structural framework", "In distributing the monthly revenue",
    # Tip 1 Sentences
    "By analyzing the raw data, the analyst identified the primary error.",
    "By utilizing the mobile interface, the application improves user interaction.",
    "By modifying the legislative framework, the progressive government established stability.",
    "By structuring the financial resources, the department funded the project.",
    "By integrating the individual applications, the team minimized software errors.",
    "Without defining the specific criteria, the committee cannot exclude irrelevant data.",
    "Without publishing the official summary, the university lacks institutional visibility.",
    "Without monitoring the local conditions, predicting regional stability remains difficult.",
    "Without generating the JSON structure, the database cannot track schedules.",
    "Without altering the statistical analysis, the expert proved the original thesis.",
    "On encountering technical errors, the program automatically stops the processing.",
    "On tracking the match schedules, users notice the dynamic calendar integration.",
    "On regulating the battery temperature, the system protects the solar inverters.",
    "On converting the separate pages, the secretary created a comprehensive PDF.",
    "On identifying the target goals, the professional prepared the strategic defense.",
    "In evaluating the academic curriculum, the board reviewed the entire program.",
    "In processing the scanned text, the updated software runs an OCR tool.",
    "In adjusting the dynamic parameters, the engineer balanced the structural framework.",
    "In maintaining the structural framework, the administration spent substantial annual resources.",
    "In distributing the monthly revenue, the central bank tracked fluctuating economic percentages.",
    # Tip 2 Phrases
    "When analyzing the raw data", "When modifying the legislative framework", "When evaluating the academic curriculum",
    "When structuring the financial resources", "While integrating the individual applications", "While restricting the resource distribution",
    "While establishing a stable administration", "While extracting the primary components", "Before troubleshooting the Flutter interface",
    "Before validating the legal contract", "Before defining the specific criteria", "Before publishing the official summary",
    "After assessing the constitutional amendment", "After monitoring the local conditions", "After generating the JSON structure",
    "After altering the statistical analysis", "Since processing the scanned text", "Since tracking the match schedules",
    "Since regulating the battery temperature", "Since redesigning the professional CV",
    # Tip 2 Sentences
    "When analyzing the raw data, the expert identified an error.",
    "When modifying the legislative framework, the government altered the code.",
    "When evaluating the academic curriculum, the university requires empirical evidence.",
    "When structuring the financial resources, the committee defined strict parameters.",
    "While integrating the individual applications, the engineer encountered technical errors.",
    "While restricting the resource distribution, the administration caused temporary instability.",
    "While establishing a stable administration, the director faced intense opposition.",
    "While extracting the primary components, the technician utilized special tools.",
    "Before troubleshooting the Flutter interface, you must update the database.",
    "Before validating the legal contract, the parties reviewed every clause.",
    "Before defining the specific criteria, the board excluded fluctuating data.",
    "Before publishing the official summary, the committee summarized the defense.",
    "After assessing the constitutional amendment, the legal authorities modified the legislation.",
    "After monitoring the local conditions, the team predicted the long-term percentages.",
    "After generating the JSON structure, the mobile application displayed accurate schedules.",
    "After altering the statistical analysis, the researcher submitted the final text.",
    "Since processing the scanned text, the team has fixed several parameters.",
    "Since tracking the match schedules, the analyst has updated his calendar.",
    "Since regulating the battery temperature, the facility has sustained perfect stability.",
    "Since redesigning the professional CV, the candidate has secured a corporate position.",
    # Tip 3 Phrases
    "When obtained from the comprehensive study", "When processed by the updated software", "If modified by the central administration",
    "If excluded from the final statistical analysis", "Unless evaluated by the academic curriculum", "Unless validated through the regulatory process",
    "Although established by the special committee", "Although defined in the legal document", "Until structured within the JSON format",
    "Until integrated into the Flutter application", "As identified in the chemical compound", "As confirmed by the expert analyst",
    "As prepared by the professional team", "Where preserved by the local administration", "Where exported to global markets",
    "When adjusted by the technical team", "If extracted from the digital sources", "Unless maintained through substantial annual funding",
    "Although derived from empirical evidence", "Until redesigned into a corporate format",
    # Tip 3 Sentences
    "When obtained from the comprehensive study, the data proved valid.",
    "When processed by the updated software, the text appears clearly.",
    "If modified by the central administration, the framework changes immediately.",
    "If excluded from the final statistical analysis, the variables alter results.",
    "Unless evaluated by the academic committee, the curriculum cannot change.",
    "Unless validated through the regulatory process, the legal contract is inactive.",
    "Although established by the special committee, the criteria faced intense opposition.",
    "Although defined in the legal document, the dynamic clause remains controversial.",
    "Until structured within the JSON format, the data generates severe errors.",
    "Until integrated into the Flutter application, the mobile interface functions slowly.",
    "As identified in the chemical compound, the primary components are toxic.",
    "As confirmed by the expert analyst, the financial revenue decreased significantly.",
    "As prepared by the professional team, the administrative defense was successful.",
    "Where preserved by the local administration, historic buildings attract global attention.",
    "Where exported to global markets, domestic production boosts the local economy.",
    "When adjusted by the technical team, the parameters stabilize the system.",
    "If extracted from the digital sources, the statistics require comprehensive verification.",
    "Unless maintained through substantial annual funding, the structural framework will collapse.",
    "Although derived from empirical evidence, the theory challenges traditional methodology assumptions.",
    "Until redesigned into a corporate format, the professional CV lacks target efficiency."
]

unique_words = set()
for sent in unit17_sentences:
    cleaned = re.sub(r'[^\w\s-]', ' ', sent)
    for word in cleaned.split():
        word = word.strip().lower()
        if word and not word.isdigit():
            unique_words.add(word)

# Load app.js wordDictionary
with open("app.js", "r", encoding="utf-8") as f:
    app_content = f.read()

dict_match = re.search(r'const wordDictionary = \{(.*?)\};', app_content, re.DOTALL)
dict_keys = set()
if dict_match:
    dict_content = dict_match.group(1)
    dict_keys.update(re.findall(r'\"([^\"]+)\"\s*:', dict_content))
    dict_keys.update(re.findall(r'\'([^\']+)\'\s*:', dict_content))

missing = sorted(list(unique_words - dict_keys))
print(f"Total unique words in Unit 17: {len(unique_words)}")
print(f"Missing words ({len(missing)}):")
for m in missing:
    print(m)
