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

# Let's import academic_sentences from build_full_pv logic
from build_full_pv import academic_sentences

# We split 148 PV items into 10 Lessons!
# Lesson 1: items 0..14 (15 items)
# Lesson 2: items 15..29 (15 items)
# Lesson 3: items 30..44 (15 items)
# Lesson 4: items 45..59 (15 items)
# Lesson 5: items 60..74 (15 items)
# Lesson 6: items 75..89 (15 items)
# Lesson 7: items 90..104 (15 items)
# Lesson 8: items 105..119 (15 items)
# Lesson 9: items 120..134 (15 items)
# Lesson 10: items 135..147 (13 items)

chunk_size = 15
chunks = [pv_items[i:i + chunk_size] for i in range(0, len(pv_items), chunk_size)]

lesson_titles = [
    "1. Phrasal Verbs Serisi: 1-15 (Devam Etme, Neden Olma & Başlangıç)",
    "2. Phrasal Verbs Serisi: 16-30 (Erteleme, İnceleme & Başa Çıkma)",
    "3. Phrasal Verbs Serisi: 31-45 (Temizleme, İstifa & Devralma)",
    "4. Phrasal Verbs Serisi: 46-60 (Çözüm Üretme, Söndürme & Yola Çıkma)",
    "5. Phrasal Verbs Serisi: 61-75 (Kalkma, Aşma, Tüketme & Reddetme)",
    "6. Phrasal Verbs Serisi: 76-90 (Yanına Kâr Kalma, İleri Sürme & Tüketme)",
    "7. Phrasal Verbs Serisi: 91-105 (İyice Düşünme, Kapatma & Çözme)",
    "8. Phrasal Verbs Serisi: 106-120 (Deneme, Not Alma & Geri Verme)",
    "9. Phrasal Verbs Serisi: 121-135 (Takip Etme, Direnme & Hazırlama)",
    "10. Phrasal Verbs Serisi: 136-148 (Geri Dönme, Yavaşlama & Gerçekleştirme)"
]

code_buffer = []
code_buffer.append("  // ============================================================")
code_buffer.append("  // BÖLÜM 60 / UNIT 57: 148 PHRASAL VERBS EKSİKSİZ MASTERCLASS")
code_buffer.append("  // ============================================================")

all_lesson_ids = []

for l_idx, chunk in enumerate(chunks):
    lesson_num = l_idx + 1
    l_id = f"c60_l{lesson_num}"
    all_lesson_ids.append(l_id)
    
    # 1. Matching pairs (5 items)
    match_pairs = []
    for item in chunk[:5]:
        v = item['verb']
        m = item['meaning']
        match_pairs.append({"left": v, "right": m})
        
    # 2. Synonym pairs (5 items)
    syn_pairs = []
    for item in chunk[5:10]:
        v = item['verb']
        info = academic_sentences.get(v, ("_______", item['meaning'], "synonym"))
        syn_pairs.append({"left": v, "right": info[2]})
        
    # 3. Questions array for MC & Errors (all 15 items in chunk get an explicit question!)
    q_arr_name = f"questions60_{lesson_num}"
    code_buffer.append(f"\n  const {q_arr_name} = [")
    
    # Add matching question
    code_buffer.append("    {")
    code_buffer.append(f'      "id": "u60_l{lesson_num}_q1_match",')
    code_buffer.append('      "type": "matching",')
    code_buffer.append(f'      "prompt": "Ders {lesson_num} deyimsel fiillerini Türkçe karşılıklarıyla eşleştirin:",')
    code_buffer.append(f'      "pairs": {json.dumps(match_pairs, ensure_ascii=False)},')
    code_buffer.append('      "explanation": "Phrasal verbs ve Türkçe karşılıkları eşleştirilmiştir."')
    code_buffer.append("    },")
    
    # Add synonym matching question if syn_pairs exist
    if syn_pairs:
        code_buffer.append("    {")
        code_buffer.append(f'      "id": "u60_l{lesson_num}_q2_syn",')
        code_buffer.append('      "type": "matching",')
        code_buffer.append(f'      "prompt": "Phrasal verb\'leri akademik eş anlamlılarıyla (Synonyms) eşleştirin:",')
        code_buffer.append(f'      "pairs": {json.dumps(syn_pairs, ensure_ascii=False)},')
        code_buffer.append('      "explanation": "Phrasal verb ve İngilizce akademik eş anlamlısı eşleştirilmiştir."')
        code_buffer.append("    },")

    # Add 15 multiple choice / fill questions (one for EACH item in chunk!)
    for item_idx, item in enumerate(chunk):
        v = item['verb']
        m = item['meaning']
        sent, tr_m, syn = academic_sentences.get(v, (f"The researchers decided to _______ the results.", m, "synonym"))
        
        # Options distractors from other chunk items
        distractors = [x['verb'] for x in pv_items if x['verb'] != v][:3]
        opts = [f"<span style='color: #ff6b6b; font-weight: bold;'>{v}</span> ({m})"] + [f"<span style='color: #ff6b6b; font-weight: bold;'>{d}</span>" for d in distractors]
        
        q_obj = {
            "id": f"u60_l{lesson_num}_q{item_idx+3}_mc",
            "type": "multiple-choice",
            "prompt": f"Boşluğa gelebilecek en uygun deyimsel fiili seçiniz (Soru {item['no']}/148):<br><br><strong>'{sent}'</strong>",
            "options": opts,
            "correctIndex": 0,
            "explanation": f"Cümlede '{m}' anlamını veren doğru Phrasal Verb <span style='color: #ff6b6b; font-weight: bold;'>{v}</span> yapısıdır."
        }
        code_buffer.append("    " + json.dumps(q_obj, ensure_ascii=False) + ",")

    # Erase trailing comma from last question
    if code_buffer[-1].endswith(","):
        code_buffer[-1] = code_buffer[-1][:-1]

    code_buffer.append("  ];\n")

# Unit push code
t60_obj = {
    "id": 57,
    "originalIndex": 57,
    "title": "Akademik Deyimsel Fiiller (148 Phrasal Verbs Tam Liste)",
    "desc": "Dokümanda yer alan 148 adet Phrasal Verb'in tamamını kapsayan 10 aşamalı eksiksiz egzersiz serisi.",
    "icon": "📚",
    "numLessons": 10,
    "subtitles": lesson_titles
}

code_buffer.append(f"  const t60 = {json.dumps(t60_obj, ensure_ascii=False, indent=4)};\n")
code_buffer.append("  units.push({")
code_buffer.append("    id: t60.id,")
code_buffer.append("    originalIndex: t60.originalIndex,")
code_buffer.append("    title: t60.title,")
code_buffer.append("    description: t60.desc,")
code_buffer.append(f"    lessons: {json.dumps(all_lesson_ids)},")
code_buffer.append('    pages: "Deyimler"')
code_buffer.append("  });\n")

# Lessons push code
for l_idx, chunk in enumerate(chunks):
    lesson_num = l_idx + 1
    l_id = f"c60_l{lesson_num}"
    q_arr_name = f"questions60_{lesson_num}"
    
    code_buffer.append("  lessons.push({")
    code_buffer.append(f'    id: "{l_id}",')
    code_buffer.append("    unitId: 57,")
    code_buffer.append(f"    title: t60.subtitles[{l_idx}],")
    code_buffer.append('    subtitle: "",')
    code_buffer.append("    exercises: [")
    code_buffer.append("      {")
    code_buffer.append(f'        id: "c60_l{lesson_num}_ex1",')
    code_buffer.append('        createdAt: "2026-07-27T00:00:00Z",')
    code_buffer.append(f'        title: "Ders {lesson_num}: 148 Phrasal Verbs Egzersiz Kartları",')
    code_buffer.append(f'        description: "Listede yer alan {chunk[0]["no"]}-{chunk[-1]["no"]}. Phrasal Verb\'lerin tamamını pekiştirin.",')
    code_buffer.append(f"        questions: {q_arr_name}")
    code_buffer.append("      }")
    code_buffer.append("    ],")
    code_buffer.append("    konuAnlatimi: {")
    code_buffer.append(f'      baslik: "Phrasal Verbs Kılavuzu: Ders {lesson_num} (Ögeler {chunk[0]["no"]}-{chunk[-1]["no"]})",')
    code_buffer.append(f'      teorikMantik: "Bu derste {chunk[0]["verb"]} ile başlayan ve {chunk[-1]["verb"]} fiiline kadar uzanan 15 adet akademik phrasal verb detaylıca işlenmektedir.",')
    code_buffer.append('      formul: "Verb + Preposition ➔ Akademik Deyimsel Fiil",')
    code_buffer.append('      altinKural: "Her phrasal verb\'ü doğrudan cümle içindeki anlamı ve nesne uyumuyla ezberleyin!"')
    code_buffer.append("    }")
    code_buffer.append("  });\n")

generated_js = "\n".join(code_buffer)
with open('generated_pv_code.js', 'w', encoding='utf-8') as f:
    f.write(generated_js)

print("Generated code successfully written to generated_pv_code.js!")
print(f"Total size: {len(generated_js)} bytes.")

