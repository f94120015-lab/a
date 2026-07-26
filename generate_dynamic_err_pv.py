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

from generate_humanities_pv import humanities_sentences
from generate_perfect_humanities_pv import prep_errors_map

chunk_size = 15
chunks = [pv_items[i:i + chunk_size] for i in range(0, len(pv_items), chunk_size)]

lesson_titles = [
    "1. Beşeri Bilimler Serisi: 1-15 (Devam Etme, Neden Olma & Dönüşüm)",
    "2. Beşeri Bilimler Serisi: 16-30 (Erteleme, İnceleme & Başa Çıkma)",
    "3. Beşeri Bilimler Serisi: 31-45 (Tarihsel Temizlik, İstifa & Devralma)",
    "4. Beşeri Bilimler Serisi: 46-60 (Metin Çözümleme, Söndürme & Yola Çıkma)",
    "5. Beşeri Bilimler Serisi: 61-75 (Aşma, Tüketme, Koruma & Reddetme)",
    "6. Beşeri Bilimler Serisi: 76-90 (İleri Sürme, İnceleme & Sergileme)",
    "7. Beşeri Bilimler Serisi: 91-105 (İyice Düşünme, Kapatma & Çözümleme)",
    "8. Beşeri Bilimler Serisi: 106-120 (Deneme, Not Alma & Geri Verme)",
    "9. Beşeri Bilimler Serisi: 121-135 (Takip Etme, Direnme & Kaleme Alma)",
    "10. Beşeri Bilimler Serisi: 136-148 (Geri Dönme, Yavaşlama & Yürütme)"
]

code_buffer = []
code_buffer.append("  // ============================================================")
code_buffer.append("  // BÖLÜM 60 / UNIT 57: 148 PHRASAL VERBS DYNAMIC ERRORS MASTERCLASS")
code_buffer.append("  // ============================================================")

all_lesson_ids = []

for l_idx, chunk in enumerate(chunks):
    lesson_num = l_idx + 1
    l_id = f"c60_l{lesson_num}"
    all_lesson_ids.append(l_id)
    
    q_arr_name = f"questions60_{lesson_num}"
    code_buffer.append(f"\n  const {q_arr_name} = [")
    
    for item_idx, item in enumerate(chunk):
        v = item['verb']
        m = item['meaning']
        sent, tr_m, syn = humanities_sentences.get(v, (f"Social historians note that researchers decided to _______ the records.", m, "continue"))
        
        # Select 3 distractors from all PV items
        other_v = [x for x in pv_items if x['verb'] != v]
        d1 = other_v[item_idx % len(other_v)]
        d2 = other_v[(item_idx+5) % len(other_v)]
        d3 = other_v[(item_idx+10) % len(other_v)]
        
        opt_correct = f"{v} ({m})"
        opt_d1 = f"{d1['verb']} ({d1['meaning']})"
        opt_d2 = f"{d2['verb']} ({d2['meaning']})"
        opt_d3 = f"{d3['verb']} ({d3['meaning']})"
        
        q_type_selector = item_idx % 3
        
        if q_type_selector == 0:
            # fill-blank-dropdown
            q_obj = {
                "id": f"u60_l{lesson_num}_q{item_idx+1}_fb",
                "type": "fill-blank-dropdown",
                "prompt": f"[Beşeri Bilimler - Soru {item['no']}/148] Metindeki boşluğa en uygun deyimsel fiili seçin:",
                "sentence": sent,
                "options": [opt_correct, opt_d1, opt_d2, opt_d3],
                "correctIndex": 0,
                "translation": f"Çeviri/Anlam: {m}",
                "explanation": f"Beşeri bilimler metnindeki bu bağlamda '{m}' (eş anlamı: {syn}) anlamını sağlayan Phrasal Verb <span style='color: #ff6b6b; font-weight: bold;'>{v} ({m})</span> yapısıdır.",
                "hint": {
                    "formula": f"{v} ➔ {syn}",
                    "academicNote": f"Beşeri Bilimler Anlamı: {m}"
                }
            }
        elif q_type_selector == 1:
            # multiple-choice
            opts_mc = [f"<span style='color: #ff6b6b; font-weight: bold;'>{v}</span> ({m})",
                       f"<span style='color: #ff6b6b; font-weight: bold;'>{d1['verb']}</span> ({d1['meaning']})",
                       f"<span style='color: #ff6b6b; font-weight: bold;'>{d2['verb']}</span> ({d2['meaning']})",
                       f"<span style='color: #ff6b6b; font-weight: bold;'>{d3['verb']}</span> ({d3['meaning']})"]
            q_obj = {
                "id": f"u60_l{lesson_num}_q{item_idx+1}_mc",
                "type": "multiple-choice",
                "prompt": f"[Beşeri Bilimler - Soru {item['no']}/148] Akademik metni en uygun deyimsel fiil ile tamamlayın:<br><br><strong>'{sent}'</strong>",
                "options": opts_mc,
                "correctIndex": 0,
                "explanation": f"Cümlenin tarihsel/sosyolojik bağlamına göre '{m}' anlamı veren <span style='color: #ff6b6b; font-weight: bold;'>{v}</span> doğru seçenektir."
            }
        else:
            # error-spotting with DYNAMIC EXTRACTED OPTIONS FROM THE EXACT SENTENCE!
            wrong_verb_form = prep_errors_map.get(v, f"{v} with")
            err_sentence = sent.replace("_______", wrong_verb_form)
            
            # Split sentence by words and extract 2 distinct real fragments from err_sentence
            words = err_sentence.split()
            
            # Find index of wrong_verb_form first word
            wrong_first_word = wrong_verb_form.split()[0]
            wrong_idx = -1
            for idx_w, w in enumerate(words):
                if wrong_first_word in w:
                    wrong_idx = idx_w
                    break
            
            # Extract fragment BEFORE wrong verb (e.g. subject or early verb)
            if wrong_idx > 2:
                frag1 = " ".join(words[:min(wrong_idx, 3)]) + " (doğru özne/öge)"
            else:
                frag1 = " ".join(words[:2]) + " (doğru başlangıç)"
                
            # Extract fragment AFTER wrong verb (e.g. object or prepositional phrase)
            if wrong_idx != -1 and wrong_idx + 2 < len(words):
                frag2 = " ".join(words[wrong_idx+2:min(wrong_idx+5, len(words))]) + " (doğru tümleç)"
            else:
                frag2 = " ".join(words[-3:]) + " (doğru tamamlama)"
            
            q_obj = {
                "id": f"u60_l{lesson_num}_q{item_idx+1}_err",
                "type": "error-spotting",
                "prompt": f"[Beşeri Bilimler - Soru {item['no']}/148 - Hata Avcısı] Cümledeki hatalı edat / Phrasal Verb kullanımını bulun:",
                "sentence": err_sentence,
                "options": [
                    f"{wrong_verb_form} (doğrusu: {v} - {m})",
                    frag1,
                    frag2
                ],
                "correctIndex": 0,
                "explanation": f"Cümlede '{m}' anlamını vermek için hatalı edat kullanımı içeren '{wrong_verb_form}' yerine <span style='color: #ff6b6b; font-weight: bold;'>{v} ({m})</span> kullanılmalıdır."
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
    "title": "Akademik Deyimsel Fiiller (Beşeri Bilimler & 148 Phrasal Verbs)",
    "desc": "Tarih, Sosyoloji, Felsefe, Edebiyat, Dilbilim, Arkeoloji ve Sanat Tarihi metinleriyle 148 Phrasal Verb'ün Türkçe anlamlı eksiksiz serisi.",
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
    code_buffer.append(f'        title: "Ders {lesson_num}: Beşeri Bilimler Phrasal Verbs Testi ({chunk[0]["no"]}-{chunk[-1]["no"]})",')
    code_buffer.append(f'        description: "Tarih, Felsefe, Sosyoloji ve Edebiyat metinleri üzerinde {chunk[0]["no"]}-{chunk[-1]["no"]}. Phrasal Verb\'leri Türkçe anlamlı seçeneklerle çözün.",')
    code_buffer.append(f"        questions: {q_arr_name}")
    code_buffer.append("      }")
    code_buffer.append("    ]")
    code_buffer.append("  });\n")

generated_js = "\n".join(code_buffer)
with open('generated_pv_code.js', 'w', encoding='utf-8') as f:
    f.write(generated_js)

print("Dynamic Error Options PV Code generated successfully!")

