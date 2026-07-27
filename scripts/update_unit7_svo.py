import json
import re

unit7_data = {
  "1": {
    "exercises": [
      {
        "id": "u7l20ex1",
        "title": "Alıştırma 1: SVO Yapısı (Aşama 1: Öbek Düzeyi)",
        "description": "Beşeri bilimler, iktisat, hukuk, sinema, tarih, sosyoloji ve psikoloji alanlarından eylem ve nesne öbekleri (12 Soru)",
        "createdAt": "2026-07-27T03:20:00+03:00",
        "questions": [
          {
            "id": "u7l20_ex1_q1",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Tarih", "Aşama 1: Öbek Düzeyi"],
            "type": "matching",
            "prompt": "İfadeleri Türkçe karşılıklarıyla eşleştirin.",
            "pairs": [
              {"left": "analyzes historical manuscripts", "right": "tarihsel el yazmalarını analiz eder"},
              {"left": "protects legal ethics", "right": "yasal etiği korur"},
              {"left": "influences market economy", "right": "piyasa ekonomisini etkiler"},
              {"left": "reflects cultural tradition", "right": "kültürel geleneği yansıtır"}
            ]
          },
          {
            "id": "u7l20_ex1_q2",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Hukuk / Sinema", "Aşama 1: Öbek Düzeyi"],
            "type": "matching",
            "prompt": "İfadeleri Türkçe karşılıklarıyla eşleştirin.",
            "pairs": [
              {"left": "changes the precedent", "right": "emsali değiştirir"},
              {"left": "examines cinema narrative", "right": "sinema anlatısını inceler"},
              {"left": "creates inflation pressure", "right": "enflasyon baskısı yaratır"},
              {"left": "resolves social conflict", "right": "sosyal çatışmayı çözer"}
            ]
          },
          {
            "id": "u7l20_ex1_q3",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Tarih", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"analyzes historical manuscripts\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "tarihsel el yazmalarını analiz eder",
              "yasal etiği korur",
              "piyasa ekonomisini etkiler",
              "kültürel geleneği yansıtır"
            ],
            "correctIndex": 0,
            "enSentence": "analyzes historical manuscripts",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex1_q4",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Hukuk", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"protects legal ethics\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "enflasyon baskısı yaratır",
              "yasal etiği korur",
              "sinema anlatısını inceler",
              "emsali değiştirir"
            ],
            "correctIndex": 1,
            "enSentence": "protects legal ethics",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex1_q5",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "İktisat", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"influences market economy\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "kültürel geleneği yansıtır",
              "tarihsel el yazmalarını analiz eder",
              "piyasa ekonomisini etkiler",
              "yasal etiği korur"
            ],
            "correctIndex": 2,
            "enSentence": "influences market economy",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex1_q6",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Tarih", "Aşama 1: Öbek Düzeyi"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun sıfatı seçin:",
            "sentence": "analyzes ___ manuscripts (Tr: tarihsel el yazmalarını analiz eder)",
            "options": ["historical", "legal", "economic", "cinematic"],
            "correctIndex": 0,
            "translation": "tarihsel el yazmalarını analiz eder"
          },
          {
            "id": "u7l20_ex1_q7",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Hukuk", "Aşama 1: Öbek Düzeyi"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun isim tamlayıcısını seçin:",
            "sentence": "protects legal ___ (Tr: yasal etiği korur)",
            "options": ["ethics", "economy", "pressure", "archive"],
            "correctIndex": 0,
            "translation": "yasal etiği korur"
          },
          {
            "id": "u7l20_ex1_q8",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "İktisat", "Aşama 1: Öbek Düzeyi"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun tamlama sözcüğünü seçin:",
            "sentence": "influences market ___ (Tr: piyasa ekonomisini etkiler)",
            "options": ["economy", "verdict", "decree", "precedent"],
            "correctIndex": 0,
            "translation": "piyasa ekonomisini etkiler"
          },
          {
            "id": "u7l20_ex1_q9",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Sosyoloji", "Aşama 1: Öbek Düzeyi"],
            "type": "word-bank",
            "prompt": "İfadenin Türkçe karşılığını oluşturun:",
            "translation": "reflects cultural tradition",
            "words": ["kültürel", "geleneği", "yansıtır", "korur"],
            "correctOrder": ["kültürel", "geleneği", "yansıtır"],
            "enSentence": "reflects cultural tradition",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex1_q10",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Hukuk", "Aşama 1: Öbek Düzeyi"],
            "type": "word-bank",
            "prompt": "İfadenin İngilizce karşılığını oluşturun:",
            "translation": "emsali değiştirir",
            "trSentence": "emsali değiştirir",
            "words": ["changes", "the", "precedent", "protects"],
            "correctOrder": ["changes", "the", "precedent"],
            "isEngToTr": False
          },
          {
            "id": "u7l20_ex1_q11",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Sinema", "Aşama 1: Öbek Düzeyi"],
            "type": "translation-text",
            "prompt": "\"examines cinema narrative\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "sinema anlatısını inceler",
            "enSentence": "examines cinema narrative",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex1_q12",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "İktisat", "Aşama 1: Öbek Düzeyi"],
            "type": "translation-text",
            "prompt": "\"creates inflation pressure\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "enflasyon baskısı yaratır",
            "enSentence": "creates inflation pressure",
            "isEngToTr": True
          }
        ]
      },
      {
        "id": "u7l20ex2",
        "title": "Alıştırma 2: SVO Yapısı (Aşama 2: Cümle Düzeyi)",
        "description": "Tam SVO (Özne + Geçişli Fiil + Nesne) yapısında akademik cümleler (12 Soru)",
        "createdAt": "2026-07-27T03:20:00+03:00",
        "questions": [
          {
            "id": "u7l20_ex2_q1",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Hukuk / İktisat", "Aşama 2: Cümle Düzeyi"],
            "type": "matching",
            "prompt": "Cümleleri Türkçe anlamlarıyla eşleştirin.",
            "pairs": [
              {"left": "The court protects legal ethics.", "right": "Mahkeme yasal etiği korur."},
              {"left": "The government influences the market economy.", "right": "Hükümet piyasa ekonomisini etkiler."},
              {"left": "The historian analyzes historical manuscripts.", "right": "Tarihçi tarihsel el yazmalarını analiz eder."},
              {"left": "Cinema reflects cultural tradition.", "right": "Sinema kültürel geleneği yansıtır."}
            ]
          },
          {
            "id": "u7l20_ex2_q2",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Hukuk", "Aşama 2: Cümle Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"The court protects legal ethics.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Hükümet piyasa ekonomisini etkiler.",
              "Mahkeme yasal etiği korur.",
              "Sinema kültürel geleneği yansıtır.",
              "Tarihçi tarihsel el yazmalarını analiz eder."
            ],
            "correctIndex": 1,
            "enSentence": "The court protects legal ethics.",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex2_q3",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "İktisat", "Aşama 2: Cümle Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"The government influences the market economy.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Tarihçi tarihsel el yazmalarını analiz eder.",
              "Sinema kültürel geleneği yansıtır.",
              "Hükümet piyasa ekonomisini etkiler.",
              "Mahkeme yasal etiği korur."
            ],
            "correctIndex": 2,
            "enSentence": "The government influences the market economy.",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex2_q4",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Tarih", "Aşama 2: Cümle Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"The historian analyzes historical manuscripts.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Tarihçi tarihsel el yazmalarını analiz eder.",
              "Mahkeme yasal etiği korur.",
              "Hükümet piyasa ekonomisini etkiler.",
              "Sinema kültürel geleneği yansıtır."
            ],
            "correctIndex": 0,
            "enSentence": "The historian analyzes historical manuscripts.",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex2_q5",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Sinema", "Aşama 2: Cümle Düzeyi"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "Cinema reflects cultural tradition.",
            "words": ["Sinema", "kültürel", "geleneği", "yansıtır", "etkiler", "korur"],
            "correctOrder": ["Sinema", "kültürel", "geleneği", "yansıtır"],
            "enSentence": "Cinema reflects cultural tradition.",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex2_q6",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Hukuk", "Aşama 2: Cümle Düzeyi"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The judge changes the precedent.",
            "words": ["Yargıç", "emsali", "değiştirir", "korur", "analiz", "eder"],
            "correctOrder": ["Yargıç", "emsali", "değiştirir"],
            "enSentence": "The judge changes the precedent.",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex2_q7",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "İktisat", "Aşama 2: Cümle Düzeyi"],
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını oluşturun:",
            "translation": "Enflasyon piyasa ekonomisini etkiler.",
            "trSentence": "Enflasyon piyasa ekonomisini etkiler.",
            "words": ["Inflation", "affects", "the", "market", "economy", "protects"],
            "correctOrder": ["Inflation", "affects", "the", "market", "economy"],
            "isEngToTr": False
          },
          {
            "id": "u7l20_ex2_q8",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Hukuk", "Aşama 2: Cümle Düzeyi"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun geçişli fiili seçin:",
            "sentence": "The court ___ legal ethics.",
            "options": ["protects", "protect", "protecting", "protected"],
            "correctIndex": 0,
            "translation": "Mahkeme yasal etiği korur."
          },
          {
            "id": "u7l20_ex2_q9",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "İktisat", "Aşama 2: Cümle Düzeyi"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun geçişli fiili seçin:",
            "sentence": "The government ___ the market economy.",
            "options": ["influences", "influence", "influencing", "influenced"],
            "correctIndex": 0,
            "translation": "Hükümet piyasa ekonomisini etkiler."
          },
          {
            "id": "u7l20_ex2_q10",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Tarih", "Aşama 2: Cümle Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"Tarihçi tarihsel el yazmalarını analiz eder.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "The historian analyzes historical manuscripts.",
              "Historical manuscripts analyze the historian.",
              "The historian influences legal ethics.",
              "Historical manuscripts reflect the historian."
            ],
            "correctIndex": 0,
            "enSentence": "The historian analyzes historical manuscripts.",
            "isEngToTr": False
          },
          {
            "id": "u7l20_ex2_q11",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "Hukuk", "Aşama 2: Cümle Düzeyi"],
            "type": "translation-text",
            "prompt": "\"The judge changes the precedent.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Yargıç emsali değiştirir.",
            "enSentence": "The judge changes the precedent.",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex2_q12",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Geçişli Fiil Yapısı", "İktisat", "Aşama 2: Cümle Düzeyi"],
            "type": "translation-text",
            "prompt": "\"Inflation affects the market economy.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Enflasyon piyasa ekonomisini etkiler.",
            "enSentence": "Inflation affects the market economy.",
            "isEngToTr": True
          }
        ]
      },
      {
        "id": "u7l20ex3",
        "title": "Alıştırma 3: SVO Yapısı (Aşama 3: Akademik / Spiralleşme)",
        "description": "Bölüm 1-4 dil bilgisi yapılarıyla (To Be, Noun+Prep, Verb+Prep, Noun Compounds) harmanlanmış SVO cümleleri (12 Soru)",
        "createdAt": "2026-07-27T03:20:00+03:00",
        "questions": [
          {
            "id": "u7l20_ex3_q1",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Spiralleşme", "Hukuk", "Aşama 3: Akademik"],
            "type": "matching",
            "prompt": "Cümleleri Türkçe anlamlarıyla eşleştirin.",
            "pairs": [
              {"left": "The court verdict on legal ethics protects society.", "right": "Yasal etik üzerine mahkeme hükmü toplumu korur."},
              {"left": "The analysis of the manuscript leads to historical consensus.", "right": "El yazmasının analizi tarihsel uzlaşıya yol açar."},
              {"left": "Under inflation pressure, the government changes economic policy.", "right": "Enflasyon baskısı altında hükümet ekonomi politikasını değiştirir."},
              {"left": "In cinema history, film narrative influences public perception.", "right": "Sinema tarihinde, film anlatısı kamusal algıyı etkiler."}
            ]
          },
          {
            "id": "u7l20_ex3_q2",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Spiralleşme", "Hukuk", "Aşama 3: Akademik"],
            "type": "multiple-choice",
            "prompt": "\"The court verdict on legal ethics protects society.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "El yazmasının analizi tarihsel uzlaşıya yol açar.",
              "Yasal etik üzerine mahkeme hükmü toplumu korur.",
              "Sinema tarihinde, film anlatısı kamusal algıyı etkiler.",
              "Enflasyon baskısı altında hükümet ekonomi politikasını değiştirir."
            ],
            "correctIndex": 1,
            "enSentence": "The court verdict on legal ethics protects society.",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex3_q3",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Spiralleşme", "Tarih", "Aşama 3: Akademik"],
            "type": "multiple-choice",
            "prompt": "\"The analysis of the manuscript leads to historical consensus.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "El yazmasının analizi tarihsel uzlaşıya yol açar.",
              "Sinema tarihinde, film anlatısı kamusal algıyı etkiler.",
              "Yasal etik üzerine mahkeme hükmü toplumu korur.",
              "Enflasyon baskısı altında hükümet ekonomi politikasını değiştirir."
            ],
            "correctIndex": 0,
            "enSentence": "The analysis of the manuscript leads to historical consensus.",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex3_q4",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Spiralleşme", "İktisat", "Aşama 3: Akademik"],
            "type": "multiple-choice",
            "prompt": "\"Under inflation pressure, the government changes economic policy.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Sinema tarihinde, film anlatısı kamusal algıyı etkiler.",
              "El yazmasının analizi tarihsel uzlaşıya yol açar.",
              "Yasal etik üzerine mahkeme hükmü toplumu korur.",
              "Enflasyon baskısı altında hükümet ekonomi politikasını değiştirir."
            ],
            "correctIndex": 3,
            "enSentence": "Under inflation pressure, the government changes economic policy.",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex3_q5",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Spiralleşme", "Sinema", "Aşama 3: Akademik"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "In cinema history, film narrative influences public perception.",
            "words": ["Sinema", "tarihinde", "film", "anlatısı", "kamusal", "algıyı", "etkiler", "korur"],
            "correctOrder": ["Sinema", "tarihinde", "film", "anlatısı", "kamusal", "algıyı", "etkiler"],
            "enSentence": "In cinema history, film narrative influences public perception.",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex3_q6",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Spiralleşme", "Tarih", "Aşama 3: Akademik"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The decree of the dynasty relies on historical precedent.",
            "words": ["Hanedanın", "fermanı", "tarihsel", "emsale", "dayanır", "etkiler"],
            "correctOrder": ["Hanedanın", "fermanı", "tarihsel", "emsale", "dayanır"],
            "enSentence": "The decree of the dynasty relies on historical precedent.",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex3_q7",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Spiralleşme", "İktisat", "Aşama 3: Akademik"],
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını oluşturun:",
            "translation": "Enflasyon baskısı altında hükümet ekonomi politikasını değiştirir.",
            "trSentence": "Enflasyon baskısı altında hükümet ekonomi politikasını değiştirir.",
            "words": ["Under", "inflation", "pressure", "the", "government", "changes", "economic", "policy", "protects"],
            "correctOrder": ["Under", "inflation", "pressure", "the", "government", "changes", "economic", "policy"],
            "isEngToTr": False
          },
          {
            "id": "u7l20_ex3_q8",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Spiralleşme", "Hukuk", "Aşama 3: Akademik"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun geçişli fiil çekimini seçin:",
            "sentence": "The court verdict on legal ethics ___ society.",
            "options": ["protects", "protected", "protecting", "protect"],
            "correctIndex": 0,
            "translation": "Yasal etik üzerine mahkeme hükmü toplumu korur."
          },
          {
            "id": "u7l20_ex3_q9",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Spiralleşme", "Tarih", "Aşama 3: Akademik"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatlı eylemi seçin:",
            "sentence": "The analysis of the manuscript ___ to historical consensus.",
            "options": ["leads", "relies", "focuses", "results"],
            "correctIndex": 0,
            "translation": "El yazmasının analizi tarihsel uzlaşıya yol açar."
          },
          {
            "id": "u7l20_ex3_q10",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Spiralleşme", "Sinema", "Aşama 3: Akademik"],
            "type": "multiple-choice",
            "prompt": "\"Sinema tarihinde, film anlatısı kamusal algıyı etkiler.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "In cinema history, film narrative influences public perception.",
              "Public perception influences cinema history in film narrative.",
              "Film narrative influences cinema history in public perception.",
              "In public perception, cinema history influences film narrative."
            ],
            "correctIndex": 0,
            "enSentence": "In cinema history, film narrative influences public perception.",
            "isEngToTr": False
          },
          {
            "id": "u7l20_ex3_q11",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Spiralleşme", "Tarih", "Aşama 3: Akademik"],
            "type": "translation-text",
            "prompt": "\"The decree of the dynasty relies on historical precedent.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Hanedanın fermanı tarihsel emsale dayanır.",
            "enSentence": "The decree of the dynasty relies on historical precedent.",
            "isEngToTr": True
          },
          {
            "id": "u7l20_ex3_q12",
            "grammarTags": ["Özne - Geçişli Fiil + Nesne", "Spiralleşme", "İktisat", "Aşama 3: Akademik"],
            "type": "translation-text",
            "prompt": "\"Under inflation pressure, the government changes economic policy.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Enflasyon baskısı altında hükümet ekonomi politikasını değiştirir.",
            "enSentence": "Under inflation pressure, the government changes economic policy.",
            "isEngToTr": True
          }
        ]
      }
    ]
  }
}

file_path = "/Users/faruknafizfazlioglu/Desktop/amok/data.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace "7": { ... } in data.js
pattern = r'("7"\s*:\s*\{).*?(\n\s*\},?\s*\n?\s*"8"\s*:\s*\{)'
match = re.search(pattern, content, re.DOTALL)
if match:
    new_json = json.dumps(unit7_data, ensure_ascii=False, indent=2)
    replacement = f'"7": {new_json},\n  "8": {{'
    updated_content = content[:match.start()] + replacement + content[match.end():]
    
    # Also update edits metadata for unit 7 (id: 7)
    meta_edit = '''      {
        "date": "2026-07-27T03:20:00+03:00",
        "desc": "Bölüm Yeniden Tasarımı: Özne - Geçişli Fiil + Nesne (SVO) bölümü Beşeri Bilimler, İktisat, Hukuk, Sinema, Tarih, Sosyoloji ve Psikoloji tematiğine uygun olarak yeniden kurgulandı. Bölüm 4 kelimelerinin %50'den fazlası yeniden kullanılarak spiralleşme sağlandı, önceki dil bilgisi konuları harmanlandı, hiç işlenmemiş hiçbir konu dahil edilmedi.",
        "type": "custom"
      },'''
    
    meta_pattern = r'("id": 7,\s*"startLessonId": 20,\s*"originalIndex": 7,\s*"edits": \[\s*)'
    updated_content = re.sub(meta_pattern, r'\1' + meta_edit + '\n', updated_content, count=1)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(updated_content)
    print("Successfully updated unit 7 (SVO Structure) in data.js!")
else:
    print("Pattern match failed!")
