import json
import re

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

from build_full_pv import academic_sentences

# Chunk into 10 lessons of ~15 PVs each
chunk_size = 15
chunks = [pv_items[i:i + chunk_size] for i in range(0, len(pv_items), chunk_size)]

lesson_titles = [
    "1. Phrasal Verbs Masterclass: 1-15 (Eylemsel Uyum & Boşluk Doldurma)",
    "2. Phrasal Verbs Masterclass: 16-30 (Bağlamsal Test & Hata Avcısı)",
    "3. Phrasal Verbs Masterclass: 31-45 (Söz Dizimi & Edat Seçici)",
    "4. Phrasal Verbs Masterclass: 46-60 (Akademik Boşluk Doldurma)",
    "5. Phrasal Verbs Masterclass: 61-75 (Eş Anlamlı & Cümle Testi)",
    "6. Phrasal Verbs Masterclass: 76-90 (Sentaks Hata Avcısı & Seçmeli Test)",
    "7. Phrasal Verbs Masterclass: 91-105 (İleri Boşluk Doldurma & Seçici)",
    "8. Phrasal Verbs Masterclass: 106-120 (Bağlam Analizi & Cümle Kurma)",
    "9. Phrasal Verbs Masterclass: 121-135 (Edat Kilitleri & Seçmeli Test)",
    "10. Phrasal Verbs Masterclass: 136-148 (Final Boşluk Doldurma & Hata Avcısı)"
]

code_buffer = []
code_buffer.append("  // ============================================================")
code_buffer.append("  // BÖLÜM 60 / UNIT 57: 148 PHRASAL VERBS PERFECT MASTERCLASS")
code_buffer.append("  // ============================================================")

all_lesson_ids = []

for l_idx, chunk in enumerate(chunks):
    lesson_num = l_idx + 1
    l_id = f"c60_l{lesson_num}"
    all_lesson_ids.append(l_id)
    
    q_arr_name = f"questions60_{lesson_num}"
    code_buffer.append(f"\n  const {q_arr_name} = [")
    
    # Generate 15 distinct, high-quality questions for the 15 PVs in this chunk!
    # Types used across the 15 items:
    # - fill-blank-dropdown (Açılır menüden doğru Phrasal Verb seçimi)
    # - multiple-choice (Bağlamsal çoktan seçmeli)
    # - error-spotting (Edat/Phrasal Verb hatası bulma)
    
    for item_idx, item in enumerate(chunk):
        v = item['verb']
        m = item['meaning']
        sent, tr_m, syn = academic_sentences.get(v, (f"The researchers decided to _______ the results.", m, "continue"))
        
        # Distractors
        other_v = [x['verb'] for x in pv_items if x['verb'] != v]
        d1, d2, d3 = other_v[item_idx % len(other_v)], other_v[(item_idx+5) % len(other_v)], other_v[(item_idx+10) % len(other_v)]
        
        q_type_selector = item_idx % 3
        
        if q_type_selector == 0:
            # fill-blank-dropdown (Açılır Menülü Boşluk Doldurma)
            q_obj = {
                "id": f"u60_l{lesson_num}_q{item_idx+1}_fb",
                "type": "fill-blank-dropdown",
                "prompt": f"[Phrasal Verb {item['no']}/148 - Boşluk Doldurma] Cümledeki boşluğa en uygun deyimsel fiili seçin:",
                "sentence": sent,
                "options": [v, d1, d2, d3],
                "correctIndex": 0,
                "translation": f"Anlam: {m}",
                "explanation": f"Cümlede '{m}' anlamını sağlayan doğru Phrasal Verb <span style='color: #ff6b6b; font-weight: bold;'>{v}</span> yapısıdır.",
                "hint": {
                    "formula": f"{v} ➔ {syn}",
                    "academicNote": f"Türkçe karşılığı: {m}"
                }
            }
        elif q_type_selector == 1:
            # multiple-choice (Çoktan Seçmeli Bağlam Testi)
            opts = [f"<span style='color: #ff6b6b; font-weight: bold;'>{v}</span> ({m})",
                    f"<span style='color: #ff6b6b; font-weight: bold;'>{d1}</span>",
                    f"<span style='color: #ff6b6b; font-weight: bold;'>{d2}</span>",
                    f"<span style='color: #ff6b6b; font-weight: bold;'>{d3}</span>"]
            q_obj = {
                "id": f"u60_l{lesson_num}_q{item_idx+1}_mc",
                "type": "multiple-choice",
                "prompt": f"[Phrasal Verb {item['no']}/148 - Çoktan Seçmeli] Cümleyi en uygun Phrasal Verb ile tamamlayın:<br><br><strong>'{sent}'</strong>",
                "options": opts,
                "correctIndex": 0,
                "explanation": f"Cümle bağlamına göre '{m}' (eş anlamı: {syn}) anlamı veren <span style='color: #ff6b6b; font-weight: bold;'>{v}</span> seçilmelidir."
            }
        else:
            # error-spotting (Phrasal Verb & Preposition Hata Avcısı)
            err_sentence = sent.replace("_______", f"{d1} with")
            q_obj = {
                "id": f"u60_l{lesson_num}_q{item_idx+1}_err",
                "type": "error-spotting",
                "prompt": f"[Phrasal Verb {item['no']}/148 - Hata Avcısı] Cümledeki yanlış phrasal verb / edat kullanımını tespit edin:",
                "sentence": err_sentence,
                "options": [
                    f"{d1} with (doğrusu: {v})",
                    "research team / sentence context",
                    "analytical parameters"
                ],
                "correctIndex": 0,
                "explanation": f"Bu bağlamda '{m}' anlamını vermek için yanlış olan '{d1} with' yerine <span style='color: #ff6b6b; font-weight: bold;'>{v}</span> kullanılmalıdır."
            }
            
        code_buffer.append("    " + json.dumps(q_obj, ensure_ascii=False) + ",")

    # Erase trailing comma
    if code_buffer[-1].endswith(","):
        code_buffer[-1] = code_buffer[-1][:-1]

    code_buffer.append("  ];\n")

# Unit push code
t60_obj = {
    "id": 57,
    "originalIndex": 57,
    "title": "Akademik Deyimsel Fiiller (148 Phrasal Verbs Tam Liste)",
    "desc": "148 Phrasal Verb'in tamamını kapsayan Boşluk Doldurma, Çoktan Seçmeli ve Hata Avcısı egzersiz serisi.",
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
    code_buffer.append(f'        title: "Ders {lesson_num}: Phrasal Verbs Alıştırmaları ({chunk[0]["no"]}-{chunk[-1]["no"]})",')
    code_buffer.append(f'        description: "Boşluk Doldurma, Çoktan Seçmeli ve Hata Avcısı sorularıyla {chunk[0]["no"]}-{chunk[-1]["no"]}. Phrasal Verb\'leri çözün.",')
    code_buffer.append(f"        questions: {q_arr_name}")
    code_buffer.append("      }")
    code_buffer.append("    ],")
    code_buffer.append("    konuAnlatimi: {")
    code_buffer.append(f'      baslik: "Phrasal Verbs Kılavuzu: Ders {lesson_num} ({chunk[0]["no"]}-{chunk[-1]["no"]})",')
    code_buffer.append(f'      teorikMantik: "{chunk[0]["verb"]} ile {chunk[-1]["verb"]} arasındaki 15 Phrasal Verb\'in cümle içi boşluk doldurma ve hata avcısı refleksleri.",')
    code_buffer.append('      formul: "Verb + Preposition ➔ Akademik Cümle Bağlamı",')
    code_buffer.append('      altinKural: "Fiil edatlarının cümledeki anlam kaymalarını dikkate alarak doğru seçeneği işaretleyin!"')
    code_buffer.append("    }")
    code_buffer.append("  });\n")

generated_js = "\n".join(code_buffer)
with open('generated_pv_code.js', 'w', encoding='utf-8') as f:
    f.write(generated_js)

print("Generated code successfully written!")
