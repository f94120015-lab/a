import json

with open('documents/Önemli Phrasal Verbs Listesi.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

pv_items = []
for line in lines:
    if '|' in line and not line.startswith('| No') and not line.startswith('| :'):
        parts = [p.strip() for p in line.split('|')]
        if len(parts) >= 4 and parts[1].isdigit():
            no = int(parts[1])
            verb = parts[2]
            meaning = parts[3]
            pv_items.append({'no': no, 'verb': verb, 'meaning': meaning})

from generate_humanities_pv import humanities_sentences
from generate_perfect_mix_pv import get_prep_info
from generate_bridge_pv import tr_translations

# Helper function to construct a question for a PV item
def make_question(item, q_index, q_type_mode):
    v = item['verb']
    m = item['meaning']
    sent, tr_m, syn = humanities_sentences.get(v, (f"Social historians note that researchers decided to _______ the records.", m, "continue"))
    tr_full = tr_translations.get(v, f"Tarihçiler bu konuda çalışmalarını sürdürdüler.")
    
    other_v = [x for x in pv_items if x['verb'] != v]
    d1 = other_v[q_index % len(other_v)]
    d2 = other_v[(q_index+5) % len(other_v)]
    d3 = other_v[(q_index+10) % len(other_v)]
    
    opt_correct = f"{v} ({m})"
    opt_d1 = f"{d1['verb']} ({d1['meaning']})"
    opt_d2 = f"{d2['verb']} ({d2['meaning']})"
    opt_d3 = f"{d3['verb']} ({d3['meaning']})"
    
    if q_type_mode == 'fb':
        return {
            "id": f"u60_pv_q{item['no']}_fb",
            "type": "fill-blank-dropdown",
            "prompt": f"[Beşeri Bilimler - Soru {item['no']}/148 - Boşluk Doldurma] Metindeki boşluğa en uygun deyimsel fiili seçin:",
            "sentence": sent,
            "options": [opt_correct, opt_d1, opt_d2, opt_d3],
            "correctIndex": 0,
            "translation": tr_full,
            "explanation": f"Beşeri bilimler metnindeki bu bağlamda '{m}' (akademik eş anlamı: {syn}) anlamını sağlayan Phrasal Verb <span style='color: #ff6b6b; font-weight: bold;'>{v} ({m})</span> yapısıdır.",
            "hint": {
                "formula": f"{v} ➔ {syn}",
                "academicNote": f"Beşeri Bilimler Anlamı: {m}"
            }
        }
    elif q_type_mode == 'mc':
        opts_mc = [f"<span style='color: #ff6b6b; font-weight: bold;'>{v}</span> ({m})",
                   f"<span style='color: #ff6b6b; font-weight: bold;'>{d1['verb']}</span> ({d1['meaning']})",
                   f"<span style='color: #ff6b6b; font-weight: bold;'>{d2['verb']}</span> ({d2['meaning']})",
                   f"<span style='color: #ff6b6b; font-weight: bold;'>{d3['verb']}</span> ({d3['meaning']})"]
        return {
            "id": f"u60_pv_q{item['no']}_mc",
            "type": "multiple-choice",
            "prompt": f"[Beşeri Bilimler - Soru {item['no']}/148 - Çoktan Seçmeli] Metni en uygun Phrasal Verb ile tamamlayın:<br><br><strong>'{sent}'</strong>",
            "options": opts_mc,
            "correctIndex": 0,
            "translation": tr_full,
            "explanation": f"Cümlenin beşeri bilimler bağlamına göre '{m}' (eş anlamı: {syn}) anlamı veren <span style='color: #ff6b6b; font-weight: bold;'>{v}</span> doğru seçenektir."
        }
    else: # prep
        base_v, correct_prep = get_prep_info(v)
        prep_sent = sent.replace("_______", f"{base_v} _______")
        
        preps_pool = ["on", "for", "into", "up", "with", "off", "out", "down", "about", "to", "through", "over"]
        dist_preps = [p for p in preps_pool if p != correct_prep]
        
        opts_prep = [
            f"<span style='color: #ff6b6b; font-weight: bold;'>{correct_prep}</span> ➔ {base_v} {correct_prep}",
            f"<span style='color: #ff6b6b; font-weight: bold;'>{dist_preps[0]}</span> ➔ {base_v} {dist_preps[0]}",
            f"<span style='color: #ff6b6b; font-weight: bold;'>{dist_preps[1]}</span> ➔ {base_v} {dist_preps[1]}",
            f"<span style='color: #ff6b6b; font-weight: bold;'>{dist_preps[2]}</span> ➔ {base_v} {dist_preps[2]}"
        ]
        return {
            "id": f"u60_pv_q{item['no']}_prep",
            "type": "multiple-choice",
            "prompt": f"[Beşeri Bilimler - Soru {item['no']}/148 - Edat Kilidi] '{base_v}' fiilini takip eden en uygun edatı (Preposition) seçin:<br><br><strong>'{prep_sent}'</strong>",
            "options": opts_prep,
            "correctIndex": 0,
            "translation": tr_full,
            "explanation": f"'{base_v}' fiili bu cümlede <span style='color: #ff6b6b; font-weight: bold;'>{correct_prep}</span> edatı ile birleşerek <span style='color: #ff6b6b; font-weight: bold;'>{v}</span> (<strong>Anlamı: {m}</strong> / <strong>Akademik Eş Anlamı: {syn}</strong>) deyimsel fiilini oluşturur."
        }

# We divide the 148 Phrasal Verbs into 10 Exercises of ~15 PVs each:
# Ex 1: 1-15 (15 PVs)
# Ex 2: 16-30 (15 PVs)
# Ex 3: 31-45 (15 PVs)
# Ex 4: 46-60 (15 PVs)
# Ex 5: 61-75 (15 PVs)
# Ex 6: 76-90 (15 PVs)
# Ex 7: 91-105 (15 PVs)
# Ex 8: 106-120 (15 PVs)
# Ex 9: 121-135 (15 PVs)
# Ex 10: 136-148 (13 PVs)

pv_chunks = [pv_items[i:i + 15] for i in range(0, len(pv_items), 15)]

exercise_objs = []
for ex_idx, chunk in enumerate(pv_chunks):
    ex_num = ex_idx + 1
    ex_q_list = []
    for item_i, item in enumerate(chunk):
        mode = ['fb', 'mc', 'prep'][item_i % 3]
        ex_q_list.append(make_question(item, item_i, mode))
    
    ex_obj = {
        "id": f"c60_ex{ex_num}",
        "createdAt": "2026-07-27T00:00:00Z",
        "title": f"Alıştırma {ex_num}: Deyimsel Fiiller ({chunk[0]['no']}-{chunk[-1]['no']})",
        "description": f"{chunk[0]['no']}-{chunk[-1]['no']}. Phrasal Verb'lerin beşeri bilimler metinlerinde boşluk doldurma, bağlam testi ve edat kilitleri.",
        "questions": ex_q_list
    }
    exercise_objs.append(ex_obj)

# Now distribute the 10 exercises into EXACTLY 3 LESSONS (4-3-3 distribution):
# Lesson 1: 4 Exercises (Ex 1, Ex 2, Ex 3, Ex 4) -> PVs 1 to 60
# Lesson 2: 3 Exercises (Ex 5, Ex 6, Ex 7) -> PVs 61 to 105
# Lesson 3: 3 Exercises (Ex 8, Ex 9, Ex 10) -> PVs 106 to 148

l1_exercises = exercise_objs[0:4]
l2_exercises = exercise_objs[4:7]
l3_exercises = exercise_objs[7:10]

lesson_subtitles = [
    "1. Başlangıç, Karşılaşma ve Değişim Fiilleri (1-60)",
    "2. Başa Çıkma, İnceleme ve Tüketme Fiilleri (61-105)",
    "3. Sürdürme, Uyum ve Çözüm Fiilleri (106-148)"
]

code_buffer = []
code_buffer.append("  // ============================================================")
code_buffer.append("  // BÖLÜM 60 / UNIT 57: 3 DERS & 4-3-3 ALIŞTIRMA (148 PHRASAL VERBS)")
code_buffer.append("  // ============================================================")

# Questions global variables
for ex_i, ex in enumerate(exercise_objs):
    var_name = f"questions60_ex{ex_i+1}"
    code_buffer.append(f"  const {var_name} = {json.dumps(ex['questions'], ensure_ascii=False, indent=2)};")

# Unit Object
t60_obj = {
    "id": 57,
    "originalIndex": 57,
    "title": "Akademik Deyimsel Fiiller (Phrasal Verbs Masterclass)",
    "desc": "Dokümanda yer alan 148 Phrasal Verb'ün 3 ana ders ve 4-3-3 alıştırma yapısıyla eksiksiz serisi.",
    "icon": "📚",
    "numLessons": 3,
    "subtitles": lesson_subtitles
}

code_buffer.append(f"\n  const t60 = {json.dumps(t60_obj, ensure_ascii=False, indent=4)};\n")
code_buffer.append("  units.push({")
code_buffer.append("    id: t60.id,")
code_buffer.append("    originalIndex: t60.originalIndex,")
code_buffer.append("    title: t60.title,")
code_buffer.append("    description: t60.desc,")
code_buffer.append('    lessons: ["c60_l1", "c60_l2", "c60_l3"],')
code_buffer.append('    pages: "Deyimler"')
code_buffer.append("  });\n")

# Lesson 1 (4 Exercises)
l1_ex_json = []
for ex in l1_exercises:
    ex_idx_num = int(ex['id'].replace('c60_ex', ''))
    l1_ex_json.append({
        "id": ex["id"],
        "createdAt": ex["createdAt"],
        "title": ex["title"],
        "description": ex["description"],
        "questions": f"__VAR_questions60_ex{ex_idx_num}__"
    })

# Lesson 2 (3 Exercises)
l2_ex_json = []
for ex in l2_exercises:
    ex_idx_num = int(ex['id'].replace('c60_ex', ''))
    l2_ex_json.append({
        "id": ex["id"],
        "createdAt": ex["createdAt"],
        "title": ex["title"],
        "description": ex["description"],
        "questions": f"__VAR_questions60_ex{ex_idx_num}__"
    })

# Lesson 3 (3 Exercises)
l3_ex_json = []
for ex in l3_exercises:
    ex_idx_num = int(ex['id'].replace('c60_ex', ''))
    l3_ex_json.append({
        "id": ex["id"],
        "createdAt": ex["createdAt"],
        "title": ex["title"],
        "description": ex["description"],
        "questions": f"__VAR_questions60_ex{ex_idx_num}__"
    })

def format_ex_list(ex_list):
    raw = json.dumps(ex_list, ensure_ascii=False, indent=6)
    # Replace variable placeholders
    for i in range(1, 11):
        raw = raw.replace(f'"__VAR_questions60_ex{i}__"', f'questions60_ex{i}')
    return raw

# Lesson 1 push
code_buffer.append("  lessons.push({")
code_buffer.append('    id: "c60_l1",')
code_buffer.append("    unitId: 57,")
code_buffer.append("    title: t60.subtitles[0],")
code_buffer.append('    subtitle: "",')
code_buffer.append(f"    exercises: {format_ex_list(l1_ex_json)}")
code_buffer.append("  });\n")

# Lesson 2 push
code_buffer.append("  lessons.push({")
code_buffer.append('    id: "c60_l2",')
code_buffer.append("    unitId: 57,")
code_buffer.append("    title: t60.subtitles[1],")
code_buffer.append('    subtitle: "",')
code_buffer.append(f"    exercises: {format_ex_list(l2_ex_json)}")
code_buffer.append("  });\n")

# Lesson 3 push
code_buffer.append("  lessons.push({")
code_buffer.append('    id: "c60_l3",')
code_buffer.append("    unitId: 57,")
code_buffer.append("    title: t60.subtitles[2],")
code_buffer.append('    subtitle: "",')
code_buffer.append(f"    exercises: {format_ex_list(l3_ex_json)}")
code_buffer.append("  });\n")

generated_js = "\n".join(code_buffer)
with open('generated_pv_code.js', 'w', encoding='utf-8') as f:
    f.write(generated_js)

print("3-Lesson 4-3-3 Exercise Structure generated successfully!")

