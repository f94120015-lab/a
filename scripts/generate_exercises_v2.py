import json

ex1_questions = [
    {
        "id": "u18l918_ex1_coll1",
        "type": "collocation-matching",
        "prompt": "Sıfat/Fiil ve takip eden Edat+Gerund bağlantısını doğru şekilde eşleştirin:",
        "pairs": [
            {"word": "responsible", "prep": "for distributing"},
            {"word": "used", "prep": "for analyzing"},
            {"word": "succeeded", "prep": "in identifying"},
            {"word": "rules", "prep": "about managing"}
        ]
    },
    {
        "id": "u18l918_ex1_coll2",
        "type": "collocation-matching",
        "prompt": "Sıfat/Fiil ve takip eden Edat+Gerund bağlantısını doğru şekilde eşleştirin:",
        "pairs": [
            {"word": "plan", "prep": "for creating"},
            {"word": "focused", "prep": "on assessing"},
            {"word": "penalized", "prep": "for violating"},
            {"word": "discussion", "prep": "about interpreting"}
        ]
    },
    {
        "id": "u18l918_ex1_match1",
        "type": "matching",
        "prompt": "Kelime öbeklerini Türkçe karşılıklarıyla eşleştirin.",
        "pairs": [
            {"left": "analiz etmek için", "right": "for analyzing"},
            {"left": "değerlendirmek üzerine", "right": "on assessing"},
            {"left": "oluşturmak için", "right": "for creating"},
            {"left": "dağıtmaktan", "right": "for distributing"}
        ]
    },
    {
        "id": "u18l918_ex1_match2",
        "type": "matching",
        "prompt": "Kelime öbeklerini Türkçe karşılıklarıyla eşleştirin.",
        "pairs": [
            {"left": "belirlemek için", "right": "for establishing"},
            {"left": "tanımlamakta", "right": "in identifying"},
            {"left": "yönetmek hakkında", "right": "about managing"},
            {"left": "ihlal etmekten", "right": "for violating"}
        ]
    }
]

ex2_questions = [
    {
        "id": "u18l918_ex2_mc1",
        "type": "multiple-choice",
        "prompt": "Cümlenin en uygun Türkçe karşılığını seçin:",
        "options": [
            "Sistem, verileri analiz etmek için kullanılır.",
            "Sistem verileri analiz ettikten sonra kapatılır.",
            "Veri analizi sistemi kurmak için önemlidir.",
            "Sistemin veri analizi yapısı oldukça karmaşıktır."
        ],
        "correctIndex": 0,
        "enSentence": "The system is used for analyzing the data.",
        "isEngToTr": True
    },
    {
        "id": "u18l918_ex2_mc2",
        "type": "multiple-choice",
        "prompt": "Cümlenin en uygun Türkçe karşılığını seçin:",
        "options": [
            "Güvenli bir yapı oluşturmak için bir plan yaptık.",
            "Güvenli bir yapıyı analiz etmek için plan yapıyoruz.",
            "Planımız güvenli bir yapı oluşturulmasıdır.",
            "Güvenli bir yapı tasarlamayı kabul ettik."
        ],
        "correctIndex": 0,
        "enSentence": "We made a plan for creating a safe structure.",
        "isEngToTr": True
    },
    {
        "id": "u18l918_ex2_cloze1",
        "type": "fill-blank-dropdown",
        "prompt": "Boşluğa gelecek en uygun kelimeyi seçin:",
        "enSentence": "The manager is responsible for distributing the new tasks.",
        "isEngToTr": True,
        "sentence": "The manager is responsible ___ the new tasks.",
        "options": ["for distributing", "distribute", "distributes", "distributed"],
        "correctIndex": 0,
        "translation": "Müdür, yeni görevleri dağıtmaktan sorumludur."
    },
    {
        "id": "u18l918_ex2_cloze2",
        "type": "fill-blank",
        "prompt": "Boşluğu doldur",
        "enSentence": "The scientist succeeded in identifying the active factors.",
        "isEngToTr": True,
        "sentence": "The scientist succeeded ___ the active factors.",
        "options": ["in identifying", "identify", "identified", "identifies"],
        "correctIndex": 0,
        "translation": "Bilim insanı, aktif faktörleri belirlemeyi başardı."
    },
    {
        "id": "u18l918_ex2_wb1",
        "type": "word-bank",
        "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
        "translation": "There are strict guidelines for establishing the school policies.",
        "enSentence": "There are strict guidelines for establishing the school policies.",
        "isEngToTr": True,
        "words": ["Okul politikalarını", "belirlemek için", "katı yönergeler", "vardır.", "sistemi", "politikası", "yasa"],
        "correctOrder": ["Okul politikalarını", "belirlemek için", "katı yönergeler", "vardır."]
    },
    {
        "id": "u18l918_ex2_wb2",
        "type": "word-bank",
        "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
        "translation": "They were penalized for violating the legal authority of the state.",
        "enSentence": "They were penalized for violating the legal authority of the state.",
        "isEngToTr": True,
        "words": ["Devletin yasal", "otoritesini ihlal", "ettikleri için", "cezalandırıldılar.", "hastane", "kararı", "polis"],
        "correctOrder": ["Devletin yasal", "otoritesini ihlal", "ettikleri için", "cezalandırıldılar."]
    },
    {
        "id": "u18l918_ex2_tx1",
        "type": "translation-text",
        "prompt": "\"The organization has strict rules about managing the financial income.\" ifadesini Türkçe'ye çevirin:",
        "correctSentence": "Kuruluşun, finansal geliri yönetmek hakkında katı kuralları vardır.",
        "enSentence": "The organization has strict rules about managing the financial income.",
        "isEngToTr": True
    },
    {
        "id": "u18l918_ex2_tx2",
        "type": "translation-text",
        "prompt": "\"The program was designed for supporting the individual needs of the community.\" ifadesini Türkçe'ye çevirin:",
        "correctSentence": "Program, topluluğun bireysel ihtiyaçlarını desteklemek amacıyla tasarlandı.",
        "enSentence": "The program was designed for supporting the individual needs of the community.",
        "isEngToTr": True
    }
]

exercises = [
    {
        "id": "u18l918ex1",
        "title": "Alıştırma 1: Yapısal Bağlantı Kilidi",
        "description": "Edat ve Gerund yapılarını Collocation Matcher ve Eşleştirme ile kavrama.",
        "questions": ex1_questions
    },
    {
        "id": "u18l918ex2",
        "title": "Alıştırma 2: Cümle Çeviri ve Analiz Çalışmaları",
        "description": "Çoktan Seçmeli, Boşluk Doldurma ve Sıralama (1-8)",
        "questions": ex2_questions
    }
]

with open("lesson2_exercises.json", "w", encoding="utf-8") as f:
    json.dump(exercises, f, indent=2, ensure_ascii=False)

print("Regenerated lesson2_exercises.json with 2 exercises.")
