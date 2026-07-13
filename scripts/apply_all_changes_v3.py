import json
import os
import re

# List of main verbs that mark the end of the subject phrase (for Unit 18 Lesson 1)
VERBS = [
    r"\bis\b", r"\bare\b", r"\brequires\b", r"\bdemands\b", r"\bcauses\b", r"\btakes\b",
    r"\bhelps\b", r"\bincreases\b", r"\binvolves\b", r"\binvalidates\b", r"\ballows\b",
    r"\bminimizes\b", r"\bproduces\b", r"\bsupports\b", r"\bsimplifies\b", r"\bstabilizes\b",
    r"\breduces\b", r"\bprovides\b", r"\boffers\b", r"\bcreates\b", r"\btransforms\b",
    r"\bclarifies\b", r"\bboosts\b", r"\beliminates\b", r"\bstops\b", r"\badds\b",
    r"\bensures\b", r"\bprevents\b", r"\bremains\b", r"\bgenerates\b", r"\bimproves\b"
]

def get_subject_phrase(sentence):
    clean_sent = sentence.strip().lstrip('"\'')
    match = re.match(r'^([A-Z][a-z]+ing\b)', clean_sent)
    if not match:
        return None
    
    first_verb_idx = len(clean_sent)
    for verb_pat in VERBS:
        v_match = re.search(verb_pat, clean_sent)
        if v_match:
            idx = v_match.start()
            if idx < first_verb_idx:
                first_verb_idx = idx
                
    if first_verb_idx < len(clean_sent):
        subject = clean_sent[:first_verb_idx].strip()
        return subject
    return None

def process_node(node, highlight_keys, extracted_subjects):
    if isinstance(node, dict):
        new_dict = {}
        for k, v in node.items():
            if k in highlight_keys and isinstance(v, str):
                highlighted_v = v
                for subj in extracted_subjects:
                    if subj in highlighted_v and "<span style=" not in highlighted_v:
                        replacement = f"<span style='color: #ff6b6b; font-weight: bold;'>{subj}</span>"
                        highlighted_v = highlighted_v.replace(subj, replacement)
                new_dict[k] = highlighted_v
            elif k in ["options", "pairs", "words", "correctOrder", "correctSentence", "correctSequence", "scrambled_elements", "correct_sequence"]:
                new_dict[k] = v
            else:
                new_dict[k] = process_node(v, highlight_keys, extracted_subjects)
        return new_dict
    elif isinstance(node, list):
        return [process_node(item, highlight_keys, extracted_subjects) for item in node]
    else:
        return node

def main():
    print("Starting apply_all_changes_v3.py...")
    # 1. Restore data.js first to get clean slate
    os.system("git restore data.js")
    
    with open("data.js", "r", encoding="utf-8") as f:
        content = f.read()

    # 2. Modify wordDictionary at the top
    target_vocab = 'const wordDictionary = {'
    replacement_vocab = 'const wordDictionary = {\n  // Unit 18 Lesson 2 vocabulary updates\n  "violating": "ihlal etme",\n  "interpreting": "yorumlama",\n  "assessing": "değerlendirme",\n  "identifying": "belirleme",'
    if target_vocab in content:
        content = content.replace(target_vocab, replacement_vocab, 1)
        print("Vocabulary updated.")

    # 3. Modify rawTopics for Unit 18
    target_topic = """  {
    "id": 18,
    "startLessonId": 55,
    "originalIndex": 18,
    "title": "XVI. Fiil İsmi (Gerund) + Nesnesi (Özne Olarak) (Sayfa 112)",
    "desc": "Fiil isminin (gerund) cümle öznesi olarak kullanımı",
    "icon": "🧠",
    "numLessons": 1,
    "formulas": [
      {
        "formula": "V-ing + Object (Gerund as Subject)",
        "example": "Understanding the problem is crucial: Problemi anlamak çok önemlidir",
        "description": "Tercüme Kılavuzu: Bu yapı bir eylem-isim (Gerund) öbeğinin nesne alarak cümlenin öznesi olması durumudur. Cümle, fiile eklenen -ing takısı ile başlar fakat bu durum bir şimdiki zaman eylemi ('yapıyor', 'içiyor') değil, bir isim-fiildir. Çeviri yaparken önce sağdaki nesne okunur, ardından -ing takısı almış kelimeye '-ma, -me' veya '-mak, -mek' eki getirilerek özne grubu tek bir blok halinde toparlanır (Örn: Verileri analiz etmek...). Bu öbek cümlenin öznesi olduğu için, Türkçede de cümlenin en başına yerleşir."
      }
    ],
    "subtitles": [
      "A. ...ing + isim (Sayfa 112)"
    ],
    "originalNumLessons": 1
  }"""

    replacement_topic = """  {
    "id": 18,
    "startLessonId": 55,
    "originalIndex": 18,
    "title": "XVI. Fiil İsmi (Gerund) + Nesnesi (Özne Olarak) (Sayfa 112)",
    "desc": "Fiil isminin (gerund) cümle öznesi olarak kullanımı ve edat sonrası kullanımı",
    "icon": "🧠",
    "numLessons": 2,
    "formulas": [
      {
        "formula": "V-ing + Object (Gerund as Subject)",
        "example": "Understanding the problem is crucial: Problemi anlamak çok önemlidir",
        "description": "Tercüme Kılavuzu: Bu yapı bir eylem-isim (Gerund) öbeğinin nesne alarak cümlenin öznesi olması durumudur. Cümle, fiile eklenen -ing takısı ile başlar fakat bu durum bir şimdiki zaman eylemi ('yapıyor', 'içiyor') değil, bir isim-fiildir. Çeviri yaparken önce sağdaki nesne okunur, ardından -ing takısı almış kelimeye '-ma, -me' veya '-mak, -mek' eki getirilerek özne grubu tek bir blok halinde toparlanır (Örn: Verileri analiz etmek...). Bu öbek cümlenin öznesi olduğu için, Türkçede de cümlenin en başına yerleşir."
      },
      {
        "formula": "Preposition + V-ing + Object (Gerund after Preposition)",
        "example": "This is a reliable method of curing the infection: Bu, enfeksiyonu iyileştirmenin çok güvenilir bir yöntemidir.",
        "description": "Tercüme Kılavuzu: Edattan sonra gelen -ing takılı fiil ve onun nesnesi, edata tabidir. Çevirirken iki türlüsü vardır: aktif (iyileştirmek için / iyileştirmenin) veya pasif (iyileştirilmesi için / iyileştirilmesinin). Önce sağdaki nesne okunur, ardından edata bağlı fiil-isim grubu tercüme edilir."
      }
    ],
    "subtitles": [
      "A. ...ing + isim (Sayfa 112)",
      "B. Edattan sonra gelen fiil (+ nesnesi) (Sayfa 112)"
    ],
    "originalNumLessons": 2
  }"""

    if target_topic in content:
        content = content.replace(target_topic, replacement_topic, 1)
        print("rawTopics updated.")

    # Modify the loader loops
    target_loop1 = """    if (unitId === 1 && l === 7) lId = 901;
    if (unitId === 6 && l === 4) lId = 906;
    if (unitId === 2 && l === 1) lId = 902;
    if (unitId === 15 && l === 1) lId = 915;
    unitLessonIds.push(lId);"""
    
    replacement_loop1 = """    if (unitId === 1 && l === 7) lId = 901;
    if (unitId === 6 && l === 4) lId = 906;
    if (unitId === 2 && l === 1) lId = 902;
    if (unitId === 15 && l === 1) lId = 915;
    if (unitId === 18 && l === 1) lId = 918;
    unitLessonIds.push(lId);"""

    if target_loop1 in content:
        content = content.replace(target_loop1, replacement_loop1, 1)
        print("Loader loop 1 updated.")

    target_loop2 = """    if (unitId === 1 && lIdx === 7) lessonId = 901;
    if (unitId === 6 && lIdx === 4) lessonId = 906;
    if (unitId === 2 && lIdx === 1) lessonId = 902;
    if (unitId === 15 && lIdx === 1) lessonId = 915;"""

    replacement_loop2 = """    if (unitId === 1 && lIdx === 7) lessonId = 901;
    if (unitId === 6 && lIdx === 4) lessonId = 906;
    if (unitId === 2 && lIdx === 1) lessonId = 902;
    if (unitId === 15 && lIdx === 1) lessonId = 915;
    if (unitId === 18 && lIdx === 1) lessonId = 918;"""

    if target_loop2 in content:
        content = content.replace(target_loop2, replacement_loop2, 1)
        print("Loader loop 2 updated.")

    # Insert exercises to unitSentencesMap for Unit 18 Lesson 2
    with open("lesson2_exercises.json", "r", encoding="utf-8") as lf:
        exercises_json = json.load(lf)

    exercises_str = json.dumps(exercises_json, indent=6, ensure_ascii=False)
    lines = exercises_str.split('\n')
    indented_lines = []
    for line in lines:
        indented_lines.append("      " + line)
    exercises_indented_str = '\n'.join(indented_lines).strip()

    target_sentences_map_end = """            }
          ]
        }
      ]
    }
  },
  "19": {"""

    replacement_sentences_map_end = '            }\n          ]\n        }\n      ]\n    },\n    "2": {\n      "exercises": ' + exercises_indented_str + '\n    }\n  },\n  "19": {'

    if target_sentences_map_end in content:
        content = content.replace(target_sentences_map_end, replacement_sentences_map_end, 1)
        print("unitSentencesMap updated with Lesson 2.")

    # 6. Apply Highlight to Unit 18 Lesson 1
    start_idx = content.find('"18": {')
    if start_idx != -1:
        end_idx = content.find('"2": {', start_idx)
        if end_idx != -1:
            array_end_idx = content.rfind(']', start_idx, end_idx)
            if array_end_idx != -1:
                exercises_array_start = content.find('[', start_idx, array_end_idx + 1)
                exercises_str = content[exercises_array_start : array_end_idx + 1]
                
                exercises_json_u18 = json.loads(exercises_str)
                extracted_subjects = set()
                
                def collect_subjects(node):
                    if isinstance(node, dict):
                        for k, v in node.items():
                            if k in ["enSentence", "sentence", "translation", "phrase"] and isinstance(v, str):
                                subj = get_subject_phrase(v)
                                if subj:
                                    extracted_subjects.add(subj)
                            collect_subjects(v)
                    elif isinstance(node, list):
                        for item in node:
                            collect_subjects(item)
                
                collect_subjects(exercises_json_u18)
                highlight_keys = ["prompt", "sentence", "enSentence", "translation", "phrase"]
                updated_exercises_json = process_node(exercises_json_u18, highlight_keys, list(extracted_subjects))
                
                updated_exercises_str = json.dumps(updated_exercises_json, indent=6, ensure_ascii=False)
                lines = updated_exercises_str.split('\n')
                indented_lines = []
                for line in lines:
                    indented_lines.append("      " + line)
                final_exercises_str = '\n'.join(indented_lines).strip()
                
                content = content[:exercises_array_start] + final_exercises_str + content[array_end_idx + 1:]
                print("Unit 18 Lesson 1 selectively highlighted.")

    # 7. Apply Unit 1 Lesson 6 Exercise 6 Addition
    with open("u1l6ex6_questions.json", "r", encoding="utf-8") as qf:
        u1l6_q_json = json.load(qf)

    u1l6_q_str = json.dumps(u1l6_q_json, indent=6, ensure_ascii=False)
    lines = u1l6_q_str.split('\n')
    indented_lines = []
    for line in lines:
        indented_lines.append("      " + line)
    u1l6_q_indented_str = '\n'.join(indented_lines).strip()

    new_exercise = """            }
          ]
        },
        {
          "id": "u1l6ex6",
          "title": "Alıştırma 6: Hibrit Karma Mücadele",
          "description": "Farklı interaktif soru tipleriyle isim ve edat takımı yapılarını pekiştirme (1-12)",
          "questions": """ + u1l6_q_indented_str + """
        }
      ]
    },
    "7": {"""

    target_block = """            }
          ]
        }
      ]
    },
    "7": {"""

    idx_6 = content.find('    "6": {')
    if idx_6 != -1:
        target_idx = content.find(target_block, idx_6)
        if target_idx != -1:
            content = content[:target_idx] + new_exercise + content[target_idx + len(target_block):]
            print("Successfully injected Unit 1 Lesson 6 Exercise 6.")
        else:
            print("ERROR: target_block not found after index of \"6\": {")
    else:
        print("ERROR: \"6\": { not found.")

    with open("data.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("apply_all_changes_v3 complete.")

if __name__ == "__main__":
    main()
