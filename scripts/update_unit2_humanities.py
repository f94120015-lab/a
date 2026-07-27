import json
import re

unit2_data = {
  "1": {
    "exercises": [
      {
        "id": "u2l1ex1",
        "title": "Alıştırma 1: Fiil + Edat Yapıları (Aşama 1: Öbek Düzeyi)",
        "description": "Beşeri bilimler, iktisat, hukuk, sinema, tarih, sosyoloji ve psikoloji alanlarından temel fiil+edat öbekleri (12 Soru)",
        "createdAt": "2026-07-20T16:30:00+03:00",
        "questions": [
          {
            "id": "u2l1_ex1_q1",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Hukuk", "Aşama 1: Öbek Düzeyi"],
            "type": "matching",
            "prompt": "İfadeleri Türkçe karşılıklarıyla eşleştirin.",
            "pairs": [
              {"left": "focus on the constitution", "right": "anayasaya odaklanmak"},
              {"left": "depend on the market", "right": "piyasaya bağlı olmak"},
              {"left": "result in trauma", "right": "travmayla sonuçlanmak"},
              {"left": "contribute to culture", "right": "kültüre katkıda bulunmak"}
            ]
          },
          {
            "id": "u2l1_ex1_q2",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Hukuk", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"focus on the constitution\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "anayasaya odaklanmak",
              "piyasaya bağlı olmak",
              "travmayla sonuçlanmak",
              "kültüre katkıda bulunmak"
            ],
            "correctIndex": 0,
            "enSentence": "focus on the constitution",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex1_q3",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "İktisat", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"depend on the market\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "anayasaya odaklanmak",
              "travmayla sonuçlanmak",
              "kültüre katkıda bulunmak",
              "piyasaya bağlı olmak"
            ],
            "correctIndex": 3,
            "enSentence": "depend on the market",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex1_q4",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Psikoloji", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"result in trauma\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "kültüre katkıda bulunmak",
              "travmayla sonuçlanmak",
              "anayasaya odaklanmak",
              "piyasaya bağlı olmak"
            ],
            "correctIndex": 1,
            "enSentence": "result in trauma",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex1_q5",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Sosyoloji", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"contribute to culture\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "kültüre katkıda bulunmak",
              "travmayla sonuçlanmak",
              "piyasaya bağlı olmak",
              "anayasaya odaklanmak"
            ],
            "correctIndex": 0,
            "enSentence": "contribute to culture",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex1_q6",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Hukuk", "Aşama 1: Öbek Düzeyi"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "focus ___ the constitution (Tr: anayasaya odaklanmak)",
            "options": ["on", "in", "at", "from"],
            "correctIndex": 0,
            "translation": "anayasaya odaklanmak"
          },
          {
            "id": "u2l1_ex1_q7",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "İktisat", "Aşama 1: Öbek Düzeyi"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "depend ___ the market (Tr: piyasaya bağlı olmak)",
            "options": ["on", "of", "to", "with"],
            "correctIndex": 0,
            "translation": "piyasaya bağlı olmak"
          },
          {
            "id": "u2l1_ex1_q8",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Sosyoloji", "Aşama 1: Öbek Düzeyi"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "contribute ___ culture (Tr: kültüre katkıda bulunmak)",
            "options": ["to", "for", "in", "by"],
            "correctIndex": 0,
            "translation": "kültüre katkıda bulunmak"
          },
          {
            "id": "u2l1_ex1_q9",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Hukuk", "Aşama 1: Öbek Düzeyi"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "anayasaya odaklanmak",
            "enSentence": "focus on the constitution",
            "words": ["anayasaya", "odaklanmak", "bağlı", "olmak"],
            "correctOrder": ["anayasaya", "odaklanmak"],
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex1_q10",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "İktisat", "Aşama 1: Öbek Düzeyi"],
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını oluşturun:",
            "translation": "piyasaya bağlı olmak",
            "trSentence": "piyasaya bağlı olmak",
            "words": ["depend", "on", "the", "market", "focus"],
            "correctOrder": ["depend", "on", "the", "market"],
            "isEngToTr": False
          },
          {
            "id": "u2l1_ex1_q11",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Psikoloji", "Aşama 1: Öbek Düzeyi"],
            "type": "translation-text",
            "prompt": "\"result in trauma\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "travmayla sonuçlanmak",
            "enSentence": "result in trauma",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex1_q12",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Sosyoloji", "Aşama 1: Öbek Düzeyi"],
            "type": "translation-text",
            "prompt": "\"contribute to culture\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "kültüre katkıda bulunmak",
            "enSentence": "contribute to culture",
            "isEngToTr": True
          }
        ]
      },
      {
        "id": "u2l1ex2",
        "title": "Alıştırma 2: Fiil + Edat Yapıları (Aşama 2: Cümle Düzeyi)",
        "description": "Cümle düzeyinde fiil ve edat takımlarının kullanımı (12 Soru)",
        "createdAt": "2026-07-20T16:30:00+03:00",
        "questions": [
          {
            "id": "u2l1_ex2_q1",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Hukuk", "Aşama 2: Cümle Düzeyi"],
            "type": "matching",
            "prompt": "Cümleleri Türkçe anlamlarıyla eşleştirin.",
            "pairs": [
              {"left": "The analysis focuses on the constitution.", "right": "Analiz anayasaya odaklanır."},
              {"left": "The asset depends on the market.", "right": "Varlık piyasaya bağlıdır."},
              {"left": "The conflict results in trauma.", "right": "Çatışma travmayla sonuçlanır."},
              {"left": "Cinema contributes to culture.", "right": "Sinema kültüre katkıda bulunur."}
            ]
          },
          {
            "id": "u2l1_ex2_q2",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Hukuk", "Aşama 2: Cümle Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"The analysis focuses on the constitution.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Sinema kültüre katkıda bulunur.",
              "Çatışma travmayla sonuçlanır.",
              "Varlık piyasaya bağlıdır.",
              "Analiz anayasaya odaklanır."
            ],
            "correctIndex": 3,
            "enSentence": "The analysis focuses on the constitution.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex2_q3",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "İktisat", "Aşama 2: Cümle Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"The asset depends on the market.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Analiz anayasaya odaklanır.",
              "Çatışma travmayla sonuçlanır.",
              "Varlık piyasaya bağlıdır.",
              "Sinema kültüre katkıda bulunur."
            ],
            "correctIndex": 2,
            "enSentence": "The asset depends on the market.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex2_q4",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Psikoloji", "Aşama 2: Cümle Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"The conflict results in trauma.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Çatışma travmayla sonuçlanır.",
              "Analiz anayasaya odaklanır.",
              "Varlık piyasaya bağlıdır.",
              "Sinema kültüre katkıda bulunur."
            ],
            "correctIndex": 0,
            "enSentence": "The conflict results in trauma.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex2_q5",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Sinema", "Aşama 2: Cümle Düzeyi"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "Cinema contributes to culture.",
            "words": ["Sinema", "kültüre", "katkıda", "bulunur", "odaklanır"],
            "correctOrder": ["Sinema", "kültüre", "katkıda", "bulunur"],
            "enSentence": "Cinema contributes to culture.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex2_q6",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Hukuk", "Aşama 2: Cümle Düzeyi"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The analysis focuses on the constitution.",
            "words": ["Analiz", "anayasaya", "odaklanır", "bağlıdır", "sonuçlanır"],
            "correctOrder": ["Analiz", "anayasaya", "odaklanır"],
            "enSentence": "The analysis focuses on the constitution.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex2_q7",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "İktisat", "Aşama 2: Cümle Düzeyi"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The asset depends on the market.",
            "words": ["Varlık", "piyasaya", "bağlıdır", "odaklanır", "bulunur"],
            "correctOrder": ["Varlık", "piyasaya", "bağlıdır"],
            "enSentence": "The asset depends on the market.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex2_q8",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Psikoloji", "Aşama 2: Cümle Düzeyi"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "The conflict results ___ trauma.",
            "options": ["in", "on", "to", "at"],
            "correctIndex": 0,
            "translation": "Çatışma travmayla sonuçlanır."
          },
          {
            "id": "u2l1_ex2_q9",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Hukuk", "Aşama 2: Cümle Düzeyi"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun fiil formunu seçin:",
            "sentence": "The analysis ___ on the constitution.",
            "options": ["focuses", "focused", "focusing", "focus"],
            "correctIndex": 0,
            "translation": "Analiz anayasaya odaklanır."
          },
          {
            "id": "u2l1_ex2_q10",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Sinema", "Aşama 2: Cümle Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"Sinema kültüre katkıda bulunur.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "Contributes cinema to culture.",
              "Cinema contributes to culture.",
              "Cinema culture to contributes.",
              "Cinema is contribute to culture."
            ],
            "correctIndex": 1,
            "enSentence": "Cinema contributes to culture.",
            "isEngToTr": False
          },
          {
            "id": "u2l1_ex2_q11",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "İktisat", "Aşama 2: Cümle Düzeyi"],
            "type": "translation-text",
            "prompt": "\"The asset depends on the market.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Varlık piyasaya bağlıdır.",
            "enSentence": "The asset depends on the market.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex2_q12",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Psikoloji", "Aşama 2: Cümle Düzeyi"],
            "type": "translation-text",
            "prompt": "\"The conflict results in trauma.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Çatışma travmayla sonuçlanır.",
            "enSentence": "The conflict results in trauma.",
            "isEngToTr": True
          }
        ]
      },
      {
        "id": "u2l1ex3",
        "title": "Alıştırma 3: Fiil + Edat Yapıları (Aşama 3: Akademik / Spiralleşme)",
        "description": "Önceki konularla (İsim+Edat & To Be) harmanlanmış geniş zamanlı akademik cümleler (12 Soru)",
        "createdAt": "2026-07-20T16:30:00+03:00",
        "questions": [
          {
            "id": "u2l1_ex3_q1",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Hukuk", "Aşama 3: Akademik"],
            "type": "matching",
            "prompt": "Cümleleri Türkçe anlamlarıyla eşleştirin.",
            "pairs": [
              {"left": "The verdict of the court relies on the precedent.", "right": "Mahkemenin hükmü emsale dayanır."},
              {"left": "The decree from the dynasty leads to change.", "right": "Hanedanın fermanı değişime yol açar."},
              {"left": "The growth of capital contributes to the economy.", "right": "Sermayenin büyümesi ekonomiye katkı sağlar."},
              {"left": "The narrative of the film relates to ethics.", "right": "Filmin anlatısı etik ile ilişkilidir."}
            ]
          },
          {
            "id": "u2l1_ex3_q2",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Hukuk", "Aşama 3: Akademik"],
            "type": "multiple-choice",
            "prompt": "\"The verdict of the court relies on the precedent.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Filmin anlatısı etik ile ilişkilidir.",
              "Sermayenin büyümesi ekonomiye katkı sağlar.",
              "Hanedanın fermanı değişime yol açar.",
              "Mahkemenin hükmü emsale dayanır."
            ],
            "correctIndex": 3,
            "enSentence": "The verdict of the court relies on the precedent.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex3_q3",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Tarih", "Aşama 3: Akademik"],
            "type": "multiple-choice",
            "prompt": "\"The decree from the dynasty leads to change.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Hanedanın fermanı değişime yol açar.",
              "Mahkemenin hükmü emsale dayanır.",
              "Sermayenin büyümesi ekonomiye katkı sağlar.",
              "Filmin anlatısı etik ile ilişkilidir."
            ],
            "correctIndex": 0,
            "enSentence": "The decree from the dynasty leads to change.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex3_q4",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "İktisat", "Aşama 3: Akademik"],
            "type": "multiple-choice",
            "prompt": "\"The growth of capital contributes to the economy.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Filmin anlatısı etik ile ilişkilidir.",
              "Mahkemenin hükmü emsale dayanır.",
              "Sermayenin büyümesi ekonomiye katkı sağlar.",
              "Hanedanın fermanı değişime yol açar."
            ],
            "correctIndex": 2,
            "enSentence": "The growth of capital contributes to the economy.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex3_q5",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Sinema", "Aşama 3: Akademik"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The narrative of the film relates to ethics.",
            "words": ["Filmin", "anlatısı", "etik", "ile", "ilişkilidir", "dayanır"],
            "correctOrder": ["Filmin", "anlatısı", "etik", "ile", "ilişkilidir"],
            "enSentence": "The narrative of the film relates to ethics.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex3_q6",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Hukuk", "Aşama 3: Akademik"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The verdict of the court relies on the precedent.",
            "words": ["Mahkemenin", "hükmü", "emsale", "dayanır", "ilişkilidir"],
            "correctOrder": ["Mahkemenin", "hükmü", "emsale", "dayanır"],
            "enSentence": "The verdict of the court relies on the precedent.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex3_q7",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Tarih", "Aşama 3: Akademik"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The decree from the dynasty leads to change.",
            "words": ["Hanedanın", "fermanı", "değişime", "yol", "açar", "dayanır"],
            "correctOrder": ["Hanedanın", "fermanı", "değişime", "yol", "açar"],
            "enSentence": "The decree from the dynasty leads to change.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex3_q8",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "İktisat", "Aşama 3: Akademik"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "The growth of capital contributes ___ the economy.",
            "options": ["to", "on", "in", "from"],
            "correctIndex": 0,
            "translation": "Sermayenin büyümesi ekonomiye katkı sağlar."
          },
          {
            "id": "u2l1_ex3_q9",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Hukuk", "Aşama 3: Akademik"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun fiili seçin:",
            "sentence": "The verdict of the court ___ on the precedent.",
            "options": ["relies", "relied", "relying", "rely"],
            "correctIndex": 0,
            "translation": "Mahkemenin hükmü emsale dayanır."
          },
          {
            "id": "u2l1_ex3_q10",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Tarih", "Aşama 3: Akademik"],
            "type": "multiple-choice",
            "prompt": "\"Hanedanın fermanı değişime yol açar.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "The decree from the dynasty leads to change.",
              "Dynasty leads from the decree to change.",
              "The decree of dynasty relies on change.",
              "Leads to change the decree."
            ],
            "correctIndex": 0,
            "enSentence": "The decree from the dynasty leads to change.",
            "isEngToTr": False
          },
          {
            "id": "u2l1_ex3_q11",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Sinema", "Aşama 3: Akademik"],
            "type": "translation-text",
            "prompt": "\"The narrative of the film relates to ethics.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Filmin anlatısı etik ile ilişkilidir.",
            "enSentence": "The narrative of the film relates to ethics.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex3_q12",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "İktisat", "Aşama 3: Akademik"],
            "type": "translation-text",
            "prompt": "\"The growth of capital contributes to the economy.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Sermayenin büyümesi ekonomiye katkı sağlar.",
            "enSentence": "The growth of capital contributes to the economy.",
            "isEngToTr": True
          }
        ]
      }
    ]
  },
  "2": {
    "exercises": [
      {
        "id": "u2l2ex1",
        "title": "Alıştırma 1: Edat Takımı + Edat Takımı (Aşama 1: Öbek Düzeyi)",
        "description": "Beşeri bilimler, iktisat, hukuk, sinema, tarih, sosyoloji ve psikoloji alanlarından edat kombinasyonları (12 Soru)",
        "createdAt": "2026-07-20T16:30:00+03:00",
        "questions": [
          {
            "id": "u2l2_ex1_q1",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Hukuk", "Aşama 1: Öbek Düzeyi"],
            "type": "matching",
            "prompt": "İfadeleri Türkçe karşılıklarıyla eşleştirin.",
            "pairs": [
              {"left": "in the context of legal ethics", "right": "yasal etik bağlamında"},
              {"left": "under the influence of culture", "right": "kültürün etkisi altında"},
              {"left": "according to the history of cinema", "right": "sinemanın tarihine göre"},
              {"left": "for the balance of the market", "right": "piyasanın dengesi için"}
            ]
          },
          {
            "id": "u2l2_ex1_q2",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Hukuk", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"in the context of legal ethics\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "yasal etik bağlamında",
              "kültürün etkisi altında",
              "sinemanın tarihine göre",
              "piyasanın dengesi için"
            ],
            "correctIndex": 0,
            "enSentence": "in the context of legal ethics",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex1_q3",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Sosyoloji", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"under the influence of culture\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "yasal etik bağlamında",
              "sinemanın tarihine göre",
              "piyasanın dengesi için",
              "kültürün etkisi altında"
            ],
            "correctIndex": 3,
            "enSentence": "under the influence of culture",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex1_q4",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Sinema", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"according to the history of cinema\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "piyasanın dengesi için",
              "sinemanın tarihine göre",
              "yasal etik bağlamında",
              "kültürün etkisi altında"
            ],
            "correctIndex": 1,
            "enSentence": "according to the history of cinema",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex1_q5",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "İktisat", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"for the balance of the market\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "piyasanın dengesi için",
              "yasal etik bağlamında",
              "kültürün etkisi altında",
              "sinemanın tarihine göre"
            ],
            "correctIndex": 0,
            "enSentence": "for the balance of the market",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex1_q6",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Hukuk", "Aşama 1: Öbek Düzeyi"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "in the context ___ legal ethics (Tr: yasal etik bağlamında)",
            "options": ["of", "from", "on", "under"],
            "correctIndex": 0,
            "translation": "yasal etik bağlamında"
          },
          {
            "id": "u2l2_ex1_q7",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Sosyoloji", "Aşama 1: Öbek Düzeyi"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "under the influence ___ culture (Tr: kültürün etkisi altında)",
            "options": ["of", "in", "by", "to"],
            "correctIndex": 0,
            "translation": "kültürün etkisi altında"
          },
          {
            "id": "u2l2_ex1_q8",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Sinema", "Aşama 1: Öbek Düzeyi"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edat öbeğini seçin:",
            "sentence": "___ to the history of cinema (Tr: sinemanın tarihine göre)",
            "options": ["according", "in context", "for", "under"],
            "correctIndex": 0,
            "translation": "sinemanın tarihine göre"
          },
          {
            "id": "u2l2_ex1_q9",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Hukuk", "Aşama 1: Öbek Düzeyi"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "yasal etik bağlamında",
            "enSentence": "in the context of legal ethics",
            "words": ["yasal", "etik", "bağlamında", "etkisi", "için"],
            "correctOrder": ["yasal", "etik", "bağlamında"],
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex1_q10",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Sosyoloji", "Aşama 1: Öbek Düzeyi"],
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını oluşturun:",
            "translation": "kültürün etkisi altında",
            "trSentence": "kültürün etkisi altında",
            "words": ["under", "the", "influence", "of", "culture", "context"],
            "correctOrder": ["under", "the", "influence", "of", "culture"],
            "isEngToTr": False
          },
          {
            "id": "u2l2_ex1_q11",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Sinema", "Aşama 1: Öbek Düzeyi"],
            "type": "translation-text",
            "prompt": "\"according to the history of cinema\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "sinemanın tarihine göre",
            "enSentence": "according to the history of cinema",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex1_q12",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "İktisat", "Aşama 1: Öbek Düzeyi"],
            "type": "translation-text",
            "prompt": "\"for the balance of the market\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "piyasanın dengesi için",
            "enSentence": "for the balance of the market",
            "isEngToTr": True
          }
        ]
      },
      {
        "id": "u2l2ex2",
        "title": "Alıştırma 2: Edat Takımı + Edat Takımı (Aşama 2: Cümle Düzeyi)",
        "description": "Cümle düzeyinde edat kombinasyonları (12 Soru)",
        "createdAt": "2026-07-20T16:30:00+03:00",
        "questions": [
          {
            "id": "u2l2_ex2_q1",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Hukuk", "Aşama 2: Cümle Düzeyi"],
            "type": "matching",
            "prompt": "Cümleleri Türkçe anlamlarıyla eşleştirin.",
            "pairs": [
              {"left": "The study is in the context of legal ethics.", "right": "Çalışma yasal etik bağlamındadır."},
              {"left": "The narrative is under the influence of culture.", "right": "Anlatı kültürün etkisi altındadır."},
              {"left": "The film is according to the history of cinema.", "right": "Film sinemanın tarihine uygundur."},
              {"left": "The strategy is for the balance of the market.", "right": "Strateji piyasanın dengesi içindir."}
            ]
          },
          {
            "id": "u2l2_ex2_q2",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Hukuk", "Aşama 2: Cümle Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"The study is in the context of legal ethics.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Strateji piyasanın dengesi içindir.",
              "Film sinemanın tarihine uygundur.",
              "Anlatı kültürün etkisi altındadır.",
              "Çalışma yasal etik bağlamındadır."
            ],
            "correctIndex": 3,
            "enSentence": "The study is in the context of legal ethics.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex2_q3",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Sosyoloji", "Aşama 2: Cümle Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"The narrative is under the influence of culture.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Çalışma yasal etik bağlamındadır.",
              "Film sinemanın tarihine uygundur.",
              "Anlatı kültürün etkisi altındadır.",
              "Strateji piyasanın dengesi içindir."
            ],
            "correctIndex": 2,
            "enSentence": "The narrative is under the influence of culture.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex2_q4",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Sinema", "Aşama 2: Cümle Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"The film is according to the history of cinema.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Film sinemanın tarihine uygundur.",
              "Çalışma yasal etik bağlamındadır.",
              "Anlatı kültürün etkisi altındadır.",
              "Strateji piyasanın dengesi içindir."
            ],
            "correctIndex": 0,
            "enSentence": "The film is according to the history of cinema.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex2_q5",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "İktisat", "Aşama 2: Cümle Düzeyi"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The strategy is for the balance of the market.",
            "words": ["Strateji", "piyasanın", "dengesi", "içindir", "bağlamındadır"],
            "correctOrder": ["Strateji", "piyasanın", "dengesi", "içindir"],
            "enSentence": "The strategy is for the balance of the market.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex2_q6",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Hukuk", "Aşama 2: Cümle Düzeyi"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The study is in the context of legal ethics.",
            "words": ["Çalışma", "yasal", "etik", "bağlamındadır", "altındadır"],
            "correctOrder": ["Çalışma", "yasal", "etik", "bağlamındadır"],
            "enSentence": "The study is in the context of legal ethics.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex2_q7",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Sosyoloji", "Aşama 2: Cümle Düzeyi"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The narrative is under the influence of culture.",
            "words": ["Anlatı", "kültürün", "etkisi", "altındadır", "içindir"],
            "correctOrder": ["Anlatı", "kültürün", "etkisi", "altındadır"],
            "enSentence": "The narrative is under the influence of culture.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex2_q8",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "İktisat", "Aşama 2: Cümle Düzeyi"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "The strategy is ___ the balance of the market.",
            "options": ["for", "from", "on", "in"],
            "correctIndex": 0,
            "translation": "Strateji piyasanın dengesi içindir."
          },
          {
            "id": "u2l2_ex2_q9",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Hukuk", "Aşama 2: Cümle Düzeyi"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edat takımı bağlacını seçin:",
            "sentence": "The study is ___ the context of legal ethics.",
            "options": ["in", "on", "at", "under"],
            "correctIndex": 0,
            "translation": "Çalışma yasal etik bağlamındadır."
          },
          {
            "id": "u2l2_ex2_q10",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Sinema", "Aşama 2: Cümle Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"Film sinemanın tarihine uygundur.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "History of cinema the film according is to.",
              "The film is according to the history of cinema.",
              "The film according is history to cinema of.",
              "The cinema is according to film history."
            ],
            "correctIndex": 1,
            "enSentence": "The film is according to the history of cinema.",
            "isEngToTr": False
          },
          {
            "id": "u2l2_ex2_q11",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Sosyoloji", "Aşama 2: Cümle Düzeyi"],
            "type": "translation-text",
            "prompt": "\"The narrative is under the influence of culture.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Anlatı kültürün etkisi altındadır.",
            "enSentence": "The narrative is under the influence of culture.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex2_q12",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "İktisat", "Aşama 2: Cümle Düzeyi"],
            "type": "translation-text",
            "prompt": "\"The strategy is for the balance of the market.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Strateji piyasanın dengesi içindir.",
            "enSentence": "The strategy is for the balance of the market.",
            "isEngToTr": True
          }
        ]
      },
      {
        "id": "u2l2ex3",
        "title": "Alıştırma 3: Edat Takımı + Edat Takımı (Aşama 3: Akademik / Spiralleşme)",
        "description": "Bölüm 1 ve Bölüm 2 dil bilgisi çatılarıyla uyumlu geniş zamanlı akademik karma cümleler (12 Soru)",
        "createdAt": "2026-07-20T16:30:00+03:00",
        "questions": [
          {
            "id": "u2l2_ex3_q1",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Hukuk", "Aşama 3: Akademik"],
            "type": "matching",
            "prompt": "Cümleleri Türkçe anlamlarıyla eşleştirin.",
            "pairs": [
              {"left": "According to the law, the contract is valid in court.", "right": "Kanuna göre sözleşme mahkemede geçerlidir."},
              {"left": "In the analysis of the manuscript, the archive is essential.", "right": "El yazmasının analizinde arşiv gereklidir."},
              {"left": "Under the pressure of inflation, the market is under risk.", "right": "Enflasyonun baskısı altında piyasa risk altındadır."},
              {"left": "In the structure of the norm, society relies on tradition.", "right": "Normun yapısında toplum geleneğe dayanır."}
            ]
          },
          {
            "id": "u2l2_ex3_q2",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Hukuk", "Aşama 3: Akademik"],
            "type": "multiple-choice",
            "prompt": "\"According to the law, the contract is valid in court.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Enflasyonun baskısı altında piyasa risk altındadır.",
              "El yazmasının analizinde arşiv gereklidir.",
              "Normun yapısında toplum geleneğe dayanır.",
              "Kanuna göre sözleşme mahkemede geçerlidir."
            ],
            "correctIndex": 3,
            "enSentence": "According to the law, the contract is valid in court.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex3_q3",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Tarih", "Aşama 3: Akademik"],
            "type": "multiple-choice",
            "prompt": "\"In the analysis of the manuscript, the archive is essential.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "El yazmasının analizinde arşiv gereklidir.",
              "Kanuna göre sözleşme mahkemede geçerlidir.",
              "Enflasyonun baskısı altında piyasa risk altındadır.",
              "Normun yapısında toplum geleneğe dayanır."
            ],
            "correctIndex": 0,
            "enSentence": "In the analysis of the manuscript, the archive is essential.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex3_q4",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "İktisat", "Aşama 3: Akademik"],
            "type": "multiple-choice",
            "prompt": "\"Under the pressure of inflation, the market is under risk.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Normun yapısında toplum geleneğe dayanır.",
              "Kanuna göre sözleşme mahkemede geçerlidir.",
              "Enflasyonun baskısı altında piyasa risk altındadır.",
              "El yazmasının analizinde arşiv gereklidir."
            ],
            "correctIndex": 2,
            "enSentence": "Under the pressure of inflation, the market is under risk.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex3_q5",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Sosyoloji", "Aşama 3: Akademik"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "In the structure of the norm, society relies on tradition.",
            "words": ["Normun", "yapısında", "toplum", "geleneğe", "dayanır", "gereklidir"],
            "correctOrder": ["Normun", "yapısında", "toplum", "geleneğe", "dayanır"],
            "enSentence": "In the structure of the norm, society relies on tradition.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex3_q6",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Hukuk", "Aşama 3: Akademik"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "According to the law, the contract is valid in court.",
            "words": ["Kanuna", "göre", "sözleşme", "mahkemede", "geçerlidir", "gereklidir"],
            "correctOrder": ["Kanuna", "göre", "sözleşme", "mahkemede", "geçerlidir"],
            "enSentence": "According to the law, the contract is valid in court.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex3_q7",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Tarih", "Aşama 3: Akademik"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "In the analysis of the manuscript, the archive is essential.",
            "words": ["El yazmasının", "analizinde", "arşiv", "gereklidir", "geçerlidir"],
            "correctOrder": ["El yazmasının", "analizinde", "arşiv", "gereklidir"],
            "enSentence": "In the analysis of the manuscript, the archive is essential.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex3_q8",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "İktisat", "Aşama 3: Akademik"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "Under the pressure ___ inflation, the market is under risk.",
            "options": ["of", "from", "in", "to"],
            "correctIndex": 0,
            "translation": "Enflasyonun baskısı altında piyasa risk altındadır."
          },
          {
            "id": "u2l2_ex3_q9",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Sosyoloji", "Aşama 3: Akademik"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun fiili seçin:",
            "sentence": "In the structure of the norm, society ___ on tradition.",
            "options": ["relies", "relied", "relying", "rely"],
            "correctIndex": 0,
            "translation": "Normun yapısında toplum geleneğe dayanır."
          },
          {
            "id": "u2l2_ex3_q10",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Hukuk", "Aşama 3: Akademik"],
            "type": "multiple-choice",
            "prompt": "\"Kanuna göre sözleşme mahkemede geçerlidir.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "According to the law, the contract is valid in court.",
              "The contract in court according to law is valid.",
              "The law according to valid contract in court is.",
              "Valid contract in court according to the law."
            ],
            "correctIndex": 0,
            "enSentence": "According to the law, the contract is valid in court.",
            "isEngToTr": False
          },
          {
            "id": "u2l2_ex3_q11",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Tarih", "Aşama 3: Akademik"],
            "type": "translation-text",
            "prompt": "\"In the analysis of the manuscript, the archive is essential.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "El yazmasının analizinde arşiv gereklidir.",
            "enSentence": "In the analysis of the manuscript, the archive is essential.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex3_q12",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "İktisat", "Aşama 3: Akademik"],
            "type": "translation-text",
            "prompt": "\"Under the pressure of inflation, the market is under risk.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Enflasyonun baskısı altında piyasa risk altındadır.",
            "enSentence": "Under the pressure of inflation, the market is under risk.",
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

pattern = r'("2"\s*:\s*\{).*?(\n\s*\},?\n\s*"3"\s*:\s*\{)'
match = re.search(pattern, content, re.DOTALL)
if match:
    new_unit2_json = json.dumps(unit2_data, ensure_ascii=False, indent=2)
    replacement = '"2": ' + new_unit2_json + ',\n  "3": {'
    start_pos = match.start()
    end_pos = match.end()
    
    updated_content = content[:start_pos] + replacement + content[end_pos:]
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(updated_content)
    print("Successfully updated unit 2 in data.js with strict prerequisite rules!")
else:
    print("Pattern not matched!")
