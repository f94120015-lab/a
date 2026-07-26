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
code_buffer.append("  // BÖLÜM 60 / UNIT 57: 148 PHRASAL VERBS 3-EXERCISE GROUPED MASTERCLASS")
code_buffer.append("  // ============================================================")

all_lesson_ids = []

for l_idx, chunk in enumerate(chunks):
    lesson_num = l_idx + 1
    l_id = f"c60_l{lesson_num}"
    all_lesson_ids.append(l_id)
    
    # We will build 3 separate exercise question arrays for each lesson!
    # ex1: 5 questions (Açılır Kutudan Boşluk Doldurma)
    # ex2: 5 questions (Akademik Bağlam & Çoktan Seçmeli Test)
    # ex3: 5 questions (Edat Kilidi & Preposition Magnet)
    # Total: 15 questions per lesson (grouped cleanly into 3 exercises!)
    
    ex1_questions = []
    ex2_questions = []
    ex3_questions = []
    
    for item_idx, item in enumerate(chunk):
        v = item['verb']
        m = item['meaning']
        sent, tr_m, syn = humanities_sentences.get(v, (f"Social historians note that researchers decided to _______ the records.", m, "continue"))
        tr_full = tr_translations.get(v, f"Tarihçiler bu konuda çalışmalarını sürdürdüler.")
        
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
            # ex1: fill-blank-dropdown
            q_obj = {
                "id": f"u60_l{lesson_num}_q{item_idx+1}_fb",
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
            ex1_questions.append(q_obj)
        elif q_type_selector == 1:
            # ex2: multiple-choice
            opts_mc = [f"<span style='color: #ff6b6b; font-weight: bold;'>{v}</span> ({m})",
                       f"<span style='color: #ff6b6b; font-weight: bold;'>{d1['verb']}</span> ({d1['meaning']})",
                       f"<span style='color: #ff6b6b; font-weight: bold;'>{d2['verb']}</span> ({d2['meaning']})",
                       f"<span style='color: #ff6b6b; font-weight: bold;'>{d3['verb']}</span> ({d3['meaning']})"]
            q_obj = {
                "id": f"u60_l{lesson_num}_q{item_idx+1}_mc",
                "type": "multiple-choice",
                "prompt": f"[Beşeri Bilimler - Soru {item['no']}/148 - Çoktan Seçmeli] Metni en uygun Phrasal Verb ile tamamlayın:<br><br><strong>'{sent}'</strong>",
                "options": opts_mc,
                "correctIndex": 0,
                "translation": tr_full,
                "explanation": f"Cümlenin beşeri bilimler bağlamına göre '{m}' (eş anlamı: {syn}) anlamı veren <span style='color: #ff6b6b; font-weight: bold;'>{v}</span> doğru seçenektir."
            }
            ex2_questions.append(q_obj)
        else:
            # ex3: preposition-magnet
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
            
            q_obj = {
                "id": f"u60_l{lesson_num}_q{item_idx+1}_prep",
                "type": "multiple-choice",
                "prompt": f"[Beşeri Bilimler - Soru {item['no']}/148 - Edat Kilidi] '{base_v}' fiilini takip eden en uygun edatı (Preposition) seçin:<br><br><strong>'{prep_sent}'</strong>",
                "options": opts_prep,
                "correctIndex": 0,
                "translation": tr_full,
                "explanation": f"'{base_v}' fiili bu cümlede <span style='color: #ff6b6b; font-weight: bold;'>{correct_prep}</span> edatı ile birleşerek <span style='color: #ff6b6b; font-weight: bold;'>{v}</span> (<strong>Anlamı: {m}</strong> / <strong>Akademik Eş Anlamı: {syn}</strong>) deyimsel fiilini oluşturur."
            }
            ex3_questions.append(q_obj)

    code_buffer.append(f"  const questions60_{lesson_num}_ex1 = {json.dumps(ex1_questions, ensure_ascii=False, indent=2)};")
    code_buffer.append(f"  const questions60_{lesson_num}_ex2 = {json.dumps(ex2_questions, ensure_ascii=False, indent=2)};")
    code_buffer.append(f"  const questions60_{lesson_num}_ex3 = {json.dumps(ex3_questions, ensure_ascii=False, indent=2)};\n")

# Unit push code
t60_obj = {
    "id": 57,
    "originalIndex": 57,
    "title": "Akademik Deyimsel Fiiller (Beşeri Bilimler & 148 Phrasal Verbs)",
    "desc": "Tarih, Sosyoloji, Felsefe, Edebiyat, Dilbilim, Arkeoloji ve Sanat Tarihi metinleriyle 148 Phrasal Verb'ün 3 kategorili alıştırma serisi.",
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

# Lessons push code (Grouping into 3 distinct exercises per lesson!)
for l_idx, chunk in enumerate(chunks):
    lesson_num = l_idx + 1
    l_id = f"c60_l{lesson_num}"
    
    code_buffer.append("  lessons.push({")
    code_buffer.append(f'    id: "{l_id}",')
    code_buffer.append("    unitId: 57,")
    code_buffer.append(f"    title: t60.subtitles[{l_idx}],")
    code_buffer.append('    subtitle: "",')
    code_buffer.append("    exercises: [")
    code_buffer.append("      {")
    code_buffer.append(f'        id: "c60_l{lesson_num}_ex1",')
    code_buffer.append('        createdAt: "2026-07-27T00:00:00Z",')
    code_buffer.append(f'        title: "Alıştırma 1: Açılır Kutudan Boşluk Doldurma",')
    code_buffer.append(f'        description: "Beşeri bilimler metinlerinde {chunk[0]["no"]}-{chunk[-1]["no"]}. Phrasal Verb\'leri açılır menüden seçerek boşlukları doldurun.",')
    code_buffer.append(f"        questions: questions60_{lesson_num}_ex1")
    code_buffer.append("      },")
    code_buffer.append("      {")
    code_buffer.append(f'        id: "c60_l{lesson_num}_ex2",')
    code_buffer.append('        createdAt: "2026-07-27T00:00:00Z",')
    code_buffer.append(f'        title: "Alıştırma 2: Akademik Bağlam & Çoktan Seçmeli Test",')
    code_buffer.append(f'        description: "Metnin tarihsel ve sosyolojik bağlamına en uygun deyimsel fiilleri seçin.",')
    code_buffer.append(f"        questions: questions60_{lesson_num}_ex2")
    code_buffer.append("      },")
    code_buffer.append("      {")
    code_buffer.append(f'        id: "c60_l{lesson_num}_ex3",')
    code_buffer.append('        createdAt: "2026-07-27T00:00:00Z",')
    code_buffer.append(f'        title: "Alıştırma 3: Edat Kilidi (Preposition Focus)",')
    code_buffer.append(f'        description: "Kök fiilleri takip eden en uygun edatları seçerek Phrasal Verb kilitlerini tamamlayın.",')
    code_buffer.append(f"        questions: questions60_{lesson_num}_ex3")
    code_buffer.append("      }")
    code_buffer.append("    ]")
    code_buffer.append("  });\n")

generated_js = "\n".join(code_buffer)
with open('generated_pv_code.js', 'w', encoding='utf-8') as f:
    f.write(generated_js)

print("3-Exercise Grouped PV Code generated successfully!")

