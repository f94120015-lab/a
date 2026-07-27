import json
import re

unit3_data = {
  "exercises": [
    {
      "id": "u3l1ex1",
      "title": "Alıştırma 1: İsim Tamlamaları (Aşama 1: Öbek Düzeyi)",
      "description": "Beşeri bilimler, iktisat, hukuk, sinema, tarih, sosyoloji ve psikoloji alanlarından temel isim tamlaması öbekleri (12 Soru)",
      "createdAt": "2026-07-27T03:15:00+03:00",
      "questions": [
        {
          "id": "u3l1_ex1_q1",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "İktisat / Hukuk", "Aşama 1: Öbek Düzeyi"],
          "type": "matching",
          "prompt": "İfadeleri Türkçe karşılıklarıyla eşleştirin.",
          "pairs": [
            {"left": "market economy", "right": "piyasa ekonomisi"},
            {"left": "court verdict", "right": "mahkeme hükmü"},
            {"left": "trauma analysis", "right": "travma analizi"},
            {"left": "cinema history", "right": "sinema tarihi"}
          ]
        },
        {
          "id": "u3l1_ex1_q2",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "İktisat / Hukuk", "Aşama 1: Öbek Düzeyi"],
          "type": "matching",
          "prompt": "İfadeleri Türkçe karşılıklarıyla eşleştirin.",
          "pairs": [
            {"left": "capital asset", "right": "sermaye varlığı"},
            {"left": "legal ethics", "right": "yasal etik"},
            {"left": "inflation pressure", "right": "enflasyon baskısı"},
            {"left": "dynasty decree", "right": "hanedan fermanı"}
          ]
        },
        {
          "id": "u3l1_ex1_q3",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "İktisat", "Aşama 1: Öbek Düzeyi"],
          "type": "multiple-choice",
          "prompt": "\"market economy\" ifadesinin Türkçe karşılığı hangisidir?",
          "options": [
            "piyasa ekonomisi",
            "mahkeme hükmü",
            "travma analizi",
            "sinema tarihi"
          ],
          "correctIndex": 0,
          "enSentence": "market economy",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex1_q4",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "Hukuk", "Aşama 1: Öbek Düzeyi"],
          "type": "multiple-choice",
          "prompt": "\"court verdict\" ifadesinin Türkçe karşılığı hangisidir?",
          "options": [
            "enflasyon baskısı",
            "mahkeme hükmü",
            "sermaye varlığı",
            "hanedan fermanı"
          ],
          "correctIndex": 1,
          "enSentence": "court verdict",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex1_q5",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "Psikoloji", "Aşama 1: Öbek Düzeyi"],
          "type": "multiple-choice",
          "prompt": "\"trauma analysis\" ifadesinin Türkçe karşılığı hangisidir?",
          "options": [
            "yasal etik",
            "sinema tarihi",
            "travma analizi",
            "piyasa ekonomisi"
          ],
          "correctIndex": 2,
          "enSentence": "trauma analysis",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex1_q6",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "İktisat", "Aşama 1: Öbek Düzeyi"],
          "type": "fill-blank-dropdown",
          "prompt": "Boşluğa gelecek en uygun tamlama sözcüğünü seçin:",
          "sentence": "market ___ (Tr: piyasa ekonomisi)",
          "options": ["economy", "verdict", "decree", "analysis"],
          "correctIndex": 0,
          "translation": "piyasa ekonomisi"
        },
        {
          "id": "u3l1_ex1_q7",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "Hukuk", "Aşama 1: Öbek Düzeyi"],
          "type": "fill-blank-dropdown",
          "prompt": "Boşluğa gelecek en uygun tamlama sözcüğünü seçin:",
          "sentence": "court ___ (Tr: mahkeme hükmü)",
          "options": ["verdict", "economy", "pressure", "ethics"],
          "correctIndex": 0,
          "translation": "mahkeme hükmü"
        },
        {
          "id": "u3l1_ex1_q8",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "Psikoloji", "Aşama 1: Öbek Düzeyi"],
          "type": "fill-blank-dropdown",
          "prompt": "Boşluğa gelecek en uygun tamlama sözcüğünü seçin:",
          "sentence": "trauma ___ (Tr: travma analizi)",
          "options": ["analysis", "asset", "decree", "history"],
          "correctIndex": 0,
          "translation": "travma analizi"
        },
        {
          "id": "u3l1_ex1_q9",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "Sinema", "Aşama 1: Öbek Düzeyi"],
          "type": "word-bank",
          "prompt": "İfadenin Türkçe karşılığını oluşturun:",
          "translation": "cinema history",
          "words": ["sinema", "tarihi", "hükmü", "baskısı"],
          "correctOrder": ["sinema", "tarihi"],
          "enSentence": "cinema history",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex1_q10",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "İktisat", "Aşama 1: Öbek Düzeyi"],
          "type": "word-bank",
          "prompt": "İfadenin İngilizce karşılığını oluşturun:",
          "translation": "sermaye varlığı",
          "trSentence": "sermaye varlığı",
          "words": ["capital", "asset", "market", "verdict"],
          "correctOrder": ["capital", "asset"],
          "isEngToTr": False
        },
        {
          "id": "u3l1_ex1_q11",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "Hukuk", "Aşama 1: Öbek Düzeyi"],
          "type": "translation-text",
          "prompt": "\"legal ethics\" ifadesini Türkçe'ye çevirin:",
          "correctSentence": "yasal etik",
          "enSentence": "legal ethics",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex1_q12",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "İktisat", "Aşama 1: Öbek Düzeyi"],
          "type": "translation-text",
          "prompt": "\"inflation pressure\" ifadesini Türkçe'ye çevirin:",
          "correctSentence": "enflasyon baskısı",
          "enSentence": "inflation pressure",
          "isEngToTr": True
        }
      ]
    },
    {
      "id": "u3l1ex2",
      "title": "Alıştırma 2: İsim Tamlamaları (Aşama 2: Cümle Düzeyi)",
      "description": "Cümle düzeyinde isim tamlaması ve bileşik isim kullanımı (12 Soru)",
      "createdAt": "2026-07-27T03:15:00+03:00",
      "questions": [
        {
          "id": "u3l1_ex2_q1",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "İktisat / Hukuk", "Aşama 2: Cümle Düzeyi"],
          "type": "matching",
          "prompt": "Cümleleri Türkçe anlamlarıyla eşleştirin.",
          "pairs": [
            {"left": "The market economy requires stability.", "right": "Piyasa ekonomisi istikrar gerektirir."},
            {"left": "The court verdict changes the precedent.", "right": "Mahkeme hükmü emsali değiştirir."},
            {"left": "Trauma analysis helps the patient.", "right": "Travma analizi hastaya yardımcı olur."},
            {"left": "The film narrative reflects culture.", "right": "Film anlatısı kültürü yansıtır."}
          ]
        },
        {
          "id": "u3l1_ex2_q2",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "İktisat", "Aşama 2: Cümle Düzeyi"],
          "type": "multiple-choice",
          "prompt": "\"The market economy requires stability.\" cümlesinin Türkçe karşılığı hangisidir?",
          "options": [
            "Mahkeme hükmü emsali değiştirir.",
            "Piyasa ekonomisi istikrar gerektirir.",
            "Film anlatısı kültürü yansıtır.",
            "Travma analizi hastaya yardımcı olur."
          ],
          "correctIndex": 1,
          "enSentence": "The market economy requires stability.",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex2_q3",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "Hukuk", "Aşama 2: Cümle Düzeyi"],
          "type": "multiple-choice",
          "prompt": "\"The court verdict changes the precedent.\" cümlesinin Türkçe karşılığı hangisidir?",
          "options": [
            "Piyasa ekonomisi istikrar gerektirir.",
            "Travma analizi hastaya yardımcı olur.",
            "Mahkeme hükmü emsali değiştirir.",
            "Film anlatısı kültürü yansıtır."
          ],
          "correctIndex": 2,
          "enSentence": "The court verdict changes the precedent.",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex2_q4",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "Psikoloji", "Aşama 2: Cümle Düzeyi"],
          "type": "multiple-choice",
          "prompt": "\"Trauma analysis helps the patient.\" cümlesinin Türkçe karşılığı hangisidir?",
          "options": [
            "Travma analizi hastaya yardımcı olur.",
            "Film anlatısı kültürü yansıtır.",
            "Piyasa ekonomisi istikrar gerektirir.",
            "Mahkeme hükmü emsali değiştirir."
          ],
          "correctIndex": 0,
          "enSentence": "Trauma analysis helps the patient.",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex2_q5",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "Sinema", "Aşama 2: Cümle Düzeyi"],
          "type": "word-bank",
          "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
          "translation": "The film narrative reflects culture.",
          "words": ["Film", "anlatısı", "kültürü", "yansıtır", "değiştirir", "yardımcı"],
          "correctOrder": ["Film", "anlatısı", "kültürü", "yansıtır"],
          "enSentence": "The film narrative reflects culture.",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex2_q6",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "Tarih", "Aşama 2: Cümle Düzeyi"],
          "type": "word-bank",
          "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
          "translation": "The manuscript archive contains history.",
          "words": ["El", "yazması", "arşivi", "tarih", "içerir", "yansıtır", "korur"],
          "correctOrder": ["El", "yazması", "arşivi", "tarih", "içerir"],
          "enSentence": "The manuscript archive contains history.",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex2_q7",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "Hukuk", "Aşama 2: Cümle Düzeyi"],
          "type": "word-bank",
          "prompt": "Cümlenin İngilizce karşılığını oluşturun:",
          "translation": "Anayasa hukuku toplumu korur.",
          "trSentence": "Anayasa hukuku toplumu korur.",
          "words": ["Constitution", "law", "protects", "society", "verdict", "court"],
          "correctOrder": ["Constitution", "law", "protects", "society"],
          "isEngToTr": False
        },
        {
          "id": "u3l1_ex2_q8",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "İktisat", "Aşama 2: Cümle Düzeyi"],
          "type": "fill-blank-dropdown",
          "prompt": "Boşluğa gelecek en uygun tamlama kelimesini seçin:",
          "sentence": "The market ___ requires stability.",
          "options": ["economy", "verdict", "narrative", "archive"],
          "correctIndex": 0,
          "translation": "Piyasa ekonomisi istikrar gerektirir."
        },
        {
          "id": "u3l1_ex2_q9",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "Hukuk", "Aşama 2: Cümle Düzeyi"],
          "type": "fill-blank-dropdown",
          "prompt": "Boşluğa gelecek en uygun tamlama kelimesini seçin:",
          "sentence": "The court ___ changes the precedent.",
          "options": ["verdict", "economy", "trauma", "archive"],
          "correctIndex": 0,
          "translation": "Mahkeme hükmü emsali değiştirir."
        },
        {
          "id": "u3l1_ex2_q10",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "Sinema", "Aşama 2: Cümle Düzeyi"],
          "type": "multiple-choice",
          "prompt": "\"Film anlatısı kültürü yansıtır.\" cümlesinin İngilizce karşılığı hangisidir?",
          "options": [
            "The film narrative reflects culture.",
            "The cinema history contains culture.",
            "Culture reflects film narrative.",
            "The film culture reflects narrative."
          ],
          "correctIndex": 0,
          "enSentence": "The film narrative reflects culture.",
          "isEngToTr": False
        },
        {
          "id": "u3l1_ex2_q11",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "Tarih", "Aşama 2: Cümle Düzeyi"],
          "type": "translation-text",
          "prompt": "\"The manuscript archive contains history.\" cümlesini Türkçe'ye çevirin:",
          "correctSentence": "El yazması arşivi tarih içerir.",
          "enSentence": "The manuscript archive contains history.",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex2_q12",
          "grammarTags": ["İsim Tamlaması", "İsim + İsim Yapısı", "Hukuk", "Aşama 2: Cümle Düzeyi"],
          "type": "translation-text",
          "prompt": "\"Constitution law protects society.\" cümlesini Türkçe'ye çevirin:",
          "correctSentence": "Anayasa hukuku toplumu korur.",
          "enSentence": "Constitution law protects society.",
          "isEngToTr": True
        }
      ]
    },
    {
      "id": "u3l1ex3",
      "title": "Alıştırma 3: İsim Tamlamaları (Aşama 3: Akademik / Spiralleşme)",
      "description": "Bölüm 1 ve Bölüm 2 dil bilgisi çatılarıyla uyumlu, harmanlanmış geniş zamanlı akademik cümleler (12 Soru)",
      "createdAt": "2026-07-27T03:15:00+03:00",
      "questions": [
        {
          "id": "u3l1_ex3_q1",
          "grammarTags": ["İsim Tamlaması", "Spiralleşme", "İktisat", "Aşama 3: Akademik"],
          "type": "matching",
          "prompt": "Cümleleri Türkçe anlamlarıyla eşleştirin.",
          "pairs": [
            {"left": "The growth of the market economy depends on capital assets.", "right": "Piyasa ekonomisinin büyümesi sermaye varlıklarına bağlıdır."},
            {"left": "In the history of cinema, film narrative contributes to culture.", "right": "Sinema tarihinde, film anlatısı kültüre katkıda bulunur."},
            {"left": "The court verdict on legal ethics relies on the constitution law.", "right": "Yasal etik üzerine mahkeme hükmü anayasa hukukuna dayanır."},
            {"left": "The manuscript archive of the dynasty leads to historical analysis.", "right": "Hanedanın el yazması arşivi tarihsel analize yol açar."}
          ]
        },
        {
          "id": "u3l1_ex3_q2",
          "grammarTags": ["İsim Tamlaması", "Spiralleşme", "İktisat", "Aşama 3: Akademik"],
          "type": "multiple-choice",
          "prompt": "\"The growth of the market economy depends on capital assets.\" cümlesinin Türkçe karşılığı hangisidir?",
          "options": [
            "Sinema tarihinde, film anlatısı kültüre katkıda bulunur.",
            "Piyasa ekonomisinin büyümesi sermaye varlıklarına bağlıdır.",
            "Hanedanın el yazması arşivi tarihsel analize yol açar.",
            "Yasal etik üzerine mahkeme hükmü anayasa hukukuna dayanır."
          ],
          "correctIndex": 1,
          "enSentence": "The growth of the market economy depends on capital assets.",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex3_q3",
          "grammarTags": ["İsim Tamlaması", "Spiralleşme", "Sinema", "Aşama 3: Akademik"],
          "type": "multiple-choice",
          "prompt": "\"In the history of cinema, film narrative contributes to culture.\" cümlesinin Türkçe karşılığı hangisidir?",
          "options": [
            "Sinema tarihinde, film anlatısı kültüre katkıda bulunur.",
            "Hanedanın el yazması arşivi tarihsel analize yol açar.",
            "Piyasa ekonomisinin büyümesi sermaye varlıklarına bağlıdır.",
            "Yasal etik üzerine mahkeme hükmü anayasa hukukuna dayanır."
          ],
          "correctIndex": 0,
          "enSentence": "In the history of cinema, film narrative contributes to culture.",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex3_q4",
          "grammarTags": ["İsim Tamlaması", "Spiralleşme", "Hukuk", "Aşama 3: Akademik"],
          "type": "multiple-choice",
          "prompt": "\"The court verdict on legal ethics relies on the constitution law.\" cümlesinin Türkçe karşılığı hangisidir?",
          "options": [
            "Hanedanın el yazması arşivi tarihsel analize yol açar.",
            "Sinema tarihinde, film anlatısı kültüre katkıda bulunur.",
            "Yasal etik üzerine mahkeme hükmü anayasa hukukuna dayanır.",
            "Piyasa ekonomisinin büyümesi sermaye varlıklarına bağlıdır."
          ],
          "correctIndex": 2,
          "enSentence": "The court verdict on legal ethics relies on the constitution law.",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex3_q5",
          "grammarTags": ["İsim Tamlaması", "Spiralleşme", "Tarih", "Aşama 3: Akademik"],
          "type": "word-bank",
          "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
          "translation": "The manuscript archive of the dynasty leads to historical analysis.",
          "words": ["Hanedanın", "el", "yazması", "arşivi", "tarihsel", "analize", "yol", "açar", "bağlıdır"],
          "correctOrder": ["Hanedanın", "el", "yazması", "arşivi", "tarihsel", "analize", "yol", "açar"],
          "enSentence": "The manuscript archive of the dynasty leads to historical analysis.",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex3_q6",
          "grammarTags": ["İsim Tamlaması", "Spiralleşme", "Sosyoloji / İktisat", "Aşama 3: Akademik"],
          "type": "word-bank",
          "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
          "translation": "Under inflation pressure, the market economy results in social conflict.",
          "words": ["Enflasyon", "baskısı", "altında", "piyasa", "ekonomisi", "sosyal", "çatışmayla", "sonuçlanır", "dayanır"],
          "correctOrder": ["Enflasyon", "baskısı", "altında", "piyasa", "ekonomisi", "sosyal", "çatışmayla", "sonuçlanır"],
          "enSentence": "Under inflation pressure, the market economy results in social conflict.",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex3_q7",
          "grammarTags": ["İsim Tamlaması", "Spiralleşme", "Hukuk", "Aşama 3: Akademik"],
          "type": "word-bank",
          "prompt": "Cümlenin İngilizce karşılığını oluşturun:",
          "translation": "Yasal etik üzerine mahkeme hükmü anayasa hukukuna dayanır.",
          "trSentence": "Yasal etik üzerine mahkeme hükmü anayasa hukukuna dayanır.",
          "words": ["The", "court", "verdict", "on", "legal", "ethics", "relies", "on", "constitution", "law", "depends"],
          "correctOrder": ["The", "court", "verdict", "on", "legal", "ethics", "relies", "on", "constitution", "law"],
          "isEngToTr": False
        },
        {
          "id": "u3l1_ex3_q8",
          "grammarTags": ["İsim Tamlaması", "Spiralleşme", "İktisat", "Aşama 3: Akademik"],
          "type": "fill-blank-dropdown",
          "prompt": "Boşluğa gelecek en uygun edatı seçin:",
          "sentence": "The growth of the market economy depends ___ capital assets.",
          "options": ["on", "to", "in", "from"],
          "correctIndex": 0,
          "translation": "Piyasa ekonomisinin büyümesi sermaye varlıklarına bağlıdır."
        },
        {
          "id": "u3l1_ex3_q9",
          "grammarTags": ["İsim Tamlaması", "Spiralleşme", "Sinema", "Aşama 3: Akademik"],
          "type": "fill-blank-dropdown",
          "prompt": "Boşluğa gelecek en uygun edatı seçin:",
          "sentence": "In the history of cinema, film narrative contributes ___ culture.",
          "options": ["to", "on", "at", "with"],
          "correctIndex": 0,
          "translation": "Sinema tarihinde, film anlatısı kültüre katkıda bulunur."
        },
        {
          "id": "u3l1_ex3_q10",
          "grammarTags": ["İsim Tamlaması", "Spiralleşme", "Sosyoloji / İktisat", "Aşama 3: Akademik"],
          "type": "multiple-choice",
          "prompt": "\"Enflasyon baskısı altında piyasa ekonomisi sosyal çatışmayla sonuçlanır.\" cümlesinin İngilizce karşılığı hangisidir?",
          "options": [
            "Under inflation pressure, the market economy results in social conflict.",
            "Social conflict results in market economy under inflation pressure.",
            "The market economy relies on inflation pressure and social conflict.",
            "Under social conflict, market economy results in inflation pressure."
          ],
          "correctIndex": 0,
          "enSentence": "Under inflation pressure, the market economy results in social conflict.",
          "isEngToTr": False
        },
        {
          "id": "u3l1_ex3_q11",
          "grammarTags": ["İsim Tamlaması", "Spiralleşme", "Hukuk", "Aşama 3: Akademik"],
          "type": "translation-text",
          "prompt": "\"The court verdict on legal ethics relies on the constitution law.\" cümlesini Türkçe'ye çevirin:",
          "correctSentence": "Yasal etik üzerine mahkeme hükmü anayasa hukukuna dayanır.",
          "enSentence": "The court verdict on legal ethics relies on the constitution law.",
          "isEngToTr": True
        },
        {
          "id": "u3l1_ex3_q12",
          "grammarTags": ["İsim Tamlaması", "Spiralleşme", "Tarih", "Aşama 3: Akademik"],
          "type": "translation-text",
          "prompt": "\"The manuscript archive of the dynasty leads to historical analysis.\" cümlesini Türkçe'ye çevirin:",
          "correctSentence": "Hanedanın el yazması arşivi tarihsel analize yol açar.",
          "enSentence": "The manuscript archive of the dynasty leads to historical analysis.",
          "isEngToTr": True
        }
      ]
    }
  ]
}

file_path = "/Users/faruknafizfazlioglu/Desktop/amok/data.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

pattern = r'const unit3LessonExercises = \{.*?\n\};\nconst unit4LessonExercises ='
match = re.search(pattern, content, re.DOTALL)
if match:
    new_json = json.dumps(unit3_data, ensure_ascii=False, indent=2)
    replacement = f'const unit3LessonExercises = {new_json};\nconst unit4LessonExercises ='
    updated_content = content[:match.start()] + replacement + content[match.end():]
    
    # Also update edits in unit 3 metadata if needed
    edit_entry = {
        "date": "2026-07-27T03:15:00+03:00",
        "desc": "Bölüm Yeniden Tasarımı: İsim Tamlamaları ünitesi Beşeri Bilimler, İktisat, Hukuk, Sinema, Tarih, Sosyoloji ve Psikoloji tematiğine uygun kelimelerle yeniden kurgulandı. Bölüm 2 kelimelerinin %50'si bu bölümde yeniden kullanılarak spiralleşme sağlandı, tüm sorulara standart grammarTags eklendi.",
        "type": "custom"
    }
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(updated_content)
    print("Successfully updated unit3LessonExercises in data.js!")
else:
    print("Pattern match failed!")
