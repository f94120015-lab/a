import json
import re

unit1_data = {
  "1": {
    "exercises": [
      {
        "id": "u1l1ex1",
        "title": "Alıştırma 1: 1. Giriş ve Of/Of The Yapıları",
        "description": "Beşeri bilimler, iktisat, hukuk, sinema, tarih, sosyoloji ve psikoloji alanlarından of/of the tamlamaları (12 Soru)",
        "questions": [
          {
            "id": "u1l1_ex1_q1",
            "type": "matching",
            "prompt": "İfadeleri Türkçe karşılıklarıyla eşleştirin.",
            "pairs": [
              {"left": "the structure of the constitution", "right": "anayasanın yapısı"},
              {"left": "the impact of inflation", "right": "enflasyonun etkisi"},
              {"left": "the history of cinema", "right": "sinemanın tarihi"},
              {"left": "the role of rhetoric", "right": "retoriğin rolü"}
            ]
          },
          {
            "id": "u1l1_ex1_q2",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"the structure of the constitution\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "anayasanın yapısı",
              "enflasyonun etkisi",
              "sinemanın tarihi",
              "retoriğin rolü"
            ],
            "correctIndex": 0,
            "enSentence": "the structure of the constitution",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex1_q3",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"the impact of inflation\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "anayasanın yapısı",
              "sinemanın tarihi",
              "retoriğin rolü",
              "enflasyonun etkisi"
            ],
            "correctIndex": 3,
            "enSentence": "the impact of inflation",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex1_q4",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"the history of cinema\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "retoriğin rolü",
              "enflasyonun etkisi",
              "anayasanın yapısı",
              "sinemanın tarihi"
            ],
            "correctIndex": 3,
            "enSentence": "the history of cinema",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex1_q5",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"the role of rhetoric\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "retoriğin rolü",
              "enflasyonun etkisi",
              "sinemanın tarihi",
              "anayasanın yapısı"
            ],
            "correctIndex": 0,
            "enSentence": "the role of rhetoric",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex1_q6",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "the structure ___ the constitution (Tr: anayasanın yapısı)",
            "options": ["of", "from", "on", "in"],
            "correctIndex": 0,
            "translation": "anayasanın yapısı"
          },
          {
            "id": "u1l1_ex1_q7",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "the impact ___ inflation (Tr: enflasyonun etkisi)",
            "options": ["of", "from", "at", "in"],
            "correctIndex": 0,
            "translation": "enflasyonun etkisi"
          },
          {
            "id": "u1l1_ex1_q8",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "the history ___ cinema (Tr: sinemanın tarihi)",
            "options": ["of", "on", "from", "with"],
            "correctIndex": 0,
            "translation": "sinemanın tarihi"
          },
          {
            "id": "u1l1_ex1_q9",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "anayasanın yapısı",
            "enSentence": "the structure of the constitution",
            "words": ["anayasanın", "yapısı", "etkisi", "tarihi"],
            "correctOrder": ["anayasanın", "yapısı"],
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex1_q10",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını oluşturun:",
            "translation": "enflasyonun etkisi",
            "trSentence": "enflasyonun etkisi",
            "words": ["impact", "the", "of", "inflation", "role"],
            "correctOrder": ["the", "impact", "of", "inflation"],
            "isEngToTr": False
          },
          {
            "id": "u1l1_ex1_q11",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "translation-text",
            "prompt": "\"the history of cinema\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "sinemanın tarihi",
            "enSentence": "the history of cinema",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex1_q12",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "translation-text",
            "prompt": "\"the role of rhetoric\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "retoriğin rolü",
            "enSentence": "the role of rhetoric",
            "isEngToTr": True
          }
        ]
      },
      {
        "id": "u1l1ex2",
        "title": "Alıştırma 2: 1. Giriş ve Of/Of The Yapıları",
        "description": "Cümle düzeyinde of/of the yapılarının kullanımı (12 Soru)",
        "questions": [
          {
            "id": "u1l1_ex2_q1",
            "type": "matching",
            "prompt": "Cümleleri Türkçe anlamlarıyla eşleştirin.",
            "pairs": [
              {"left": "The authority of the constitution is clear.", "right": "Anayasanın otoritesi açıktır."},
              {"left": "The evolution of culture is rapid.", "right": "Kültürün evrimi hızlıdır."},
              {"left": "The origin of the artifact is unknown.", "right": "Eserin kökeni bilinmemektedir."},
              {"left": "The balance of the market is fragile.", "right": "Piyasanın dengesi hassastır."}
            ]
          },
          {
            "id": "u1l1_ex2_q2",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"The authority of the constitution is clear.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Piyasanın dengesi hassastır.",
              "Eserin kökeni bilinmemektedir.",
              "Kültürün evrimi hızlıdır.",
              "Anayasanın otoritesi açıktır."
            ],
            "correctIndex": 3,
            "enSentence": "The authority of the constitution is clear.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex2_q3",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"The evolution of culture is rapid.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Anayasanın otoritesi açıktır.",
              "Eserin kökeni bilinmemektedir.",
              "Kültürün evrimi hızlıdır.",
              "Piyasanın dengesi hassastır."
            ],
            "correctIndex": 2,
            "enSentence": "The evolution of culture is rapid.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex2_q4",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"The origin of the artifact is unknown.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Eserin kökeni bilinmemektedir.",
              "Anayasanın otoritesi açıktır.",
              "Kültürün evrimi hızlıdır.",
              "Piyasanın dengesi hassastır."
            ],
            "correctIndex": 0,
            "enSentence": "The origin of the artifact is unknown.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex2_q5",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The balance of the market is fragile.",
            "words": ["Piyasanın", "dengesi", "hassastır", "otoritesi", "hızlıdır"],
            "correctOrder": ["Piyasanın", "dengesi", "hassastır"],
            "enSentence": "The balance of the market is fragile.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex2_q6",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The authority of the constitution is clear.",
            "words": ["Anayasanın", "otoritesi", "açıktır", "kökeni", "hassastır"],
            "correctOrder": ["Anayasanın", "otoritesi", "açıktır"],
            "enSentence": "The authority of the constitution is clear.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex2_q7",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The evolution of culture is rapid.",
            "words": ["Kültürün", "evrimi", "hızlıdır", "dengesi", "bilinmemektedir"],
            "correctOrder": ["Kültürün", "evrimi", "hızlıdır"],
            "enSentence": "The evolution of culture is rapid.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex2_q8",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin:",
            "sentence": "The origin of the artifact is ___.",
            "options": ["unknown", "unknownly", "unknowing", "know"],
            "correctIndex": 0,
            "translation": "Eserin kökeni bilinmemektedir."
          },
          {
            "id": "u1l1_ex2_q9",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "The balance ___ the market is fragile.",
            "options": ["of", "from", "in", "on"],
            "correctIndex": 0,
            "translation": "Piyasanın dengesi hassastır."
          },
          {
            "id": "u1l1_ex2_q10",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"Kültürün evrimi hızlıdır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "Evolution the culture of is rapid.",
              "The evolution of culture is rapid.",
              "The culture of evolution is rapid.",
              "The evolution of culture is unknown."
            ],
            "correctIndex": 1,
            "enSentence": "The evolution of culture is rapid.",
            "isEngToTr": False
          },
          {
            "id": "u1l1_ex2_q11",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "translation-text",
            "prompt": "\"The origin of the artifact is unknown.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Eserin kökeni bilinmemektedir.",
            "enSentence": "The origin of the artifact is unknown.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex2_q12",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "translation-text",
            "prompt": "\"The balance of the market is fragile.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Piyasanın dengesi hassastır.",
            "enSentence": "The balance of the market is fragile.",
            "isEngToTr": True
          }
        ]
      },
      {
        "id": "u1l1ex3",
        "title": "Alıştırma 3: 1. Giriş ve Of/Of The Yapıları",
        "description": "Beşeri ve sosyal bilimlerden akademik of/of the tamlamaları (12 Soru)",
        "questions": [
          {
            "id": "u1l1_ex3_q1",
            "type": "matching",
            "prompt": "Cümleleri Türkçe anlamlarıyla eşleştirin.",
            "pairs": [
              {"left": "The precedent of the court is binding.", "right": "Mahkemenin emsali bağlayıcıdır."},
              {"left": "The aesthetic of the film is unique.", "right": "Filmin estetiği özgündür."},
              {"left": "The trauma of the memory is deep.", "right": "Hafızanın travması derindir."},
              {"left": "The narrative of the manuscript is historical.", "right": "El yazmasının anlatısı tarihseldir."}
            ]
          },
          {
            "id": "u1l1_ex3_q2",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"The precedent of the court is binding.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Filmin estetiği özgündür.",
              "Hafızanın travması derindir.",
              "El yazmasının anlatısı tarihseldir.",
              "Mahkemenin emsali bağlayıcıdır."
            ],
            "correctIndex": 3,
            "enSentence": "The precedent of the court is binding.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex3_q3",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"The aesthetic of the film is unique.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Filmin estetiği özgündür.",
              "Mahkemenin emsali bağlayıcıdır.",
              "Hafızanın travması derindir.",
              "El yazmasının anlatısı tarihseldir."
            ],
            "correctIndex": 0,
            "enSentence": "The aesthetic of the film is unique.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex3_q4",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"The trauma of the memory is deep.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "El yazmasının anlatısı tarihseldir.",
              "Mahkemenin emsali bağlayıcıdır.",
              "Hafızanın travması derindir.",
              "Filmin estetiği özgündür."
            ],
            "correctIndex": 2,
            "enSentence": "The trauma of the memory is deep.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex3_q5",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The narrative of the manuscript is historical.",
            "words": ["El yazmasının", "anlatısı", "tarihseldir", "özgündür", "derindir"],
            "correctOrder": ["El yazmasının", "anlatısı", "tarihseldir"],
            "enSentence": "The narrative of the manuscript is historical.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex3_q6",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The precedent of the court is binding.",
            "words": ["Mahkemenin", "emsali", "bağlayıcıdır", "anlatısı", "özgündür"],
            "correctOrder": ["Mahkemenin", "emsali", "bağlayıcıdır"],
            "enSentence": "The precedent of the court is binding.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex3_q7",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The aesthetic of the film is unique.",
            "words": ["Filmin", "estetiği", "özgündür", "emsali", "derindir"],
            "correctOrder": ["Filmin", "estetiği", "özgündür"],
            "enSentence": "The aesthetic of the film is unique.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex3_q8",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin:",
            "sentence": "The trauma of the memory is ___.",
            "options": ["deep", "deeply", "deepen", "depth"],
            "correctIndex": 0,
            "translation": "Hafızanın travması derindir."
          },
          {
            "id": "u1l1_ex3_q9",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "The narrative ___ the manuscript is historical.",
            "options": ["of", "from", "at", "in"],
            "correctIndex": 0,
            "translation": "El yazmasının anlatısı tarihseldir."
          },
          {
            "id": "u1l1_ex3_q10",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"Mahkemenin emsali bağlayıcıdır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "Court precedent the of is binding.",
              "The precedent of the court is binding.",
              "The court of precedent is binding.",
              "The precedent of court is unique."
            ],
            "correctIndex": 1,
            "enSentence": "The precedent of the court is binding.",
            "isEngToTr": False
          },
          {
            "id": "u1l1_ex3_q11",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "translation-text",
            "prompt": "\"The aesthetic of the film is unique.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Filmin estetiği özgündür.",
            "enSentence": "The aesthetic of the film is unique.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex3_q12",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "translation-text",
            "prompt": "\"The trauma of the memory is deep.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Hafızanın travması derindir.",
            "enSentence": "The trauma of the memory is deep.",
            "isEngToTr": True
          }
        ]
      }
    ]
  },
  "2": {
    "exercises": [
      {
        "id": "u1l2ex1",
        "title": "Alıştırma 1: 2. İsim + From / İsim + Edat Yapıları",
        "description": "Beşeri bilimler, iktisat, hukuk, sinema, tarih, sosyoloji ve psikoloji alanlarından edatlı öbekler (12 Soru)",
        "questions": [
          {
            "id": "u1l2_ex1_q1",
            "type": "matching",
            "prompt": "İfadeleri Türkçe karşılıklarıyla eşleştirin.",
            "pairs": [
              {"left": "a manuscript from the archive", "right": "arşivden bir el yazması"},
              {"left": "a norm in the society", "right": "toplumda bir norm"},
              {"left": "the capital in the bank", "right": "bankadaki sermaye"},
              {"left": "the sanction under the law", "right": "kanun kapsamındaki yaptırım"}
            ]
          },
          {
            "id": "u1l2_ex1_q2",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"a manuscript from the archive\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "arşivden bir el yazması",
              "toplumda bir norm",
              "bankadaki sermaye",
              "kanun kapsamındaki yaptırım"
            ],
            "correctIndex": 0,
            "enSentence": "a manuscript from the archive",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex1_q3",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"a norm in the society\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "kanun kapsamındaki yaptırım",
              "arşivden bir el yazması",
              "toplumda bir norm",
              "bankadaki sermaye"
            ],
            "correctIndex": 2,
            "enSentence": "a norm in the society",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex1_q4",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"the capital in the bank\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "toplumda bir norm",
              "bankadaki sermaye",
              "arşivden bir el yazması",
              "kanun kapsamındaki yaptırım"
            ],
            "correctIndex": 1,
            "enSentence": "the capital in the bank",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex1_q5",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"the sanction under the law\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "kanun kapsamındaki yaptırım",
              "bankadaki sermaye",
              "toplumda bir norm",
              "arşivden bir el yazması"
            ],
            "correctIndex": 0,
            "enSentence": "the sanction under the law",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex1_q6",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "a manuscript ___ the archive (Tr: arşivden bir el yazması)",
            "options": ["from", "of", "on", "at"],
            "correctIndex": 0,
            "translation": "arşivden bir el yazması"
          },
          {
            "id": "u1l2_ex1_q7",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "a norm ___ the society (Tr: toplumda bir norm)",
            "options": ["in", "from", "on", "under"],
            "correctIndex": 0,
            "translation": "toplumda bir norm"
          },
          {
            "id": "u1l2_ex1_q8",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "the sanction ___ the law (Tr: kanun kapsamındaki yaptırım)",
            "options": ["under", "of", "from", "in"],
            "correctIndex": 0,
            "translation": "kanun kapsamındaki yaptırım"
          },
          {
            "id": "u1l2_ex1_q9",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "arşivden bir el yazması",
            "enSentence": "a manuscript from the archive",
            "words": ["arşivden", "bir", "el yazması", "norm", "sermaye"],
            "correctOrder": ["arşivden", "bir", "el yazması"],
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex1_q10",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını oluşturun:",
            "translation": "bankadaki sermaye",
            "trSentence": "bankadaki sermaye",
            "words": ["capital", "the", "in", "bank", "the", "archive"],
            "correctOrder": ["the", "capital", "in", "the", "bank"],
            "isEngToTr": False
          },
          {
            "id": "u1l2_ex1_q11",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "translation-text",
            "prompt": "\"a norm in the society\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "toplumda bir norm",
            "enSentence": "a norm in the society",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex1_q12",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "translation-text",
            "prompt": "\"the sanction under the law\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "kanun kapsamındaki yaptırım",
            "enSentence": "the sanction under the law",
            "isEngToTr": True
          }
        ]
      },
      {
        "id": "u1l2ex2",
        "title": "Alıştırma 2: 2. İsim + From / İsim + Edat Yapıları",
        "description": "Cümle düzeyinde edatlı isim öbeklerinin kullanımı (12 Soru)",
        "questions": [
          {
            "id": "u1l2_ex2_q1",
            "type": "matching",
            "prompt": "Cümleleri Türkçe anlamlarıyla eşleştirin.",
            "pairs": [
              {"left": "The artifact from the museum is authentic.", "right": "Müzedeki eser özgündür."},
              {"left": "The stimulus in the brain is acute.", "right": "Beyindeki uyarıcı keskindir."},
              {"left": "The asset in the portfolio is secure.", "right": "Portföydeki varlık güvendedir."},
              {"left": "The debate on ethics is open.", "right": "Etik üzerine tartışma açıktır."}
            ]
          },
          {
            "id": "u1l2_ex2_q2",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"The artifact from the museum is authentic.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Etik üzerine tartışma açıktır.",
              "Portföydeki varlık güvendedir.",
              "Beyindeki uyarıcı keskindir.",
              "Müzedeki eser özgündür."
            ],
            "correctIndex": 3,
            "enSentence": "The artifact from the museum is authentic.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex2_q3",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"The stimulus in the brain is acute.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Müzedeki eser özgündür.",
              "Portföydeki varlık güvendedir.",
              "Beyindeki uyarıcı keskindir.",
              "Etik üzerine tartışma açıktır."
            ],
            "correctIndex": 2,
            "enSentence": "The stimulus in the brain is acute.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex2_q4",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"The asset in the portfolio is secure.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Portföydeki varlık güvendedir.",
              "Müzedeki eser özgündür.",
              "Beyindeki uyarıcı keskindir.",
              "Etik üzerine tartışma açıktır."
            ],
            "correctIndex": 0,
            "enSentence": "The asset in the portfolio is secure.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex2_q5",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The debate on ethics is open.",
            "words": ["Etik", "üzerine", "tartışma", "açıktır", "keskindir"],
            "correctOrder": ["Etik", "üzerine", "tartışma", "açıktır"],
            "enSentence": "The debate on ethics is open.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex2_q6",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The artifact from the museum is authentic.",
            "words": ["Müzedeki", "eser", "özgündür", "güvendedir", "açıktır"],
            "correctOrder": ["Müzedeki", "eser", "özgündür"],
            "enSentence": "The artifact from the museum is authentic.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex2_q7",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The stimulus in the brain is acute.",
            "words": ["Beyindeki", "uyarıcı", "keskindir", "özgündür", "tartışma"],
            "correctOrder": ["Beyindeki", "uyarıcı", "keskindir"],
            "enSentence": "The stimulus in the brain is acute.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex2_q8",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin:",
            "sentence": "The asset in the portfolio is ___.",
            "options": ["secure", "securely", "security", "securing"],
            "correctIndex": 0,
            "translation": "Portföydeki varlık güvendedir."
          },
          {
            "id": "u1l2_ex2_q9",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "The debate ___ ethics is open.",
            "options": ["on", "from", "of", "in"],
            "correctIndex": 0,
            "translation": "Etik üzerine tartışma açıktır."
          },
          {
            "id": "u1l2_ex2_q10",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"Müzedeki eser özgündür.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "Artifact museum the from is authentic.",
              "The artifact from the museum is authentic.",
              "The museum from artifact is authentic.",
              "The artifact from museum is acute."
            ],
            "correctIndex": 1,
            "enSentence": "The artifact from the museum is authentic.",
            "isEngToTr": False
          },
          {
            "id": "u1l2_ex2_q11",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "translation-text",
            "prompt": "\"The stimulus in the brain is acute.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Beyindeki uyarıcı keskindir.",
            "enSentence": "The stimulus in the brain is acute.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex2_q12",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "translation-text",
            "prompt": "\"The debate on ethics is open.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Etik üzerine tartışma açıktır.",
            "enSentence": "The debate on ethics is open.",
            "isEngToTr": True
          }
        ]
      },
      {
        "id": "u1l2ex3",
        "title": "Alıştırma 3: 2. İsim + From / İsim + Edat Yapıları",
        "description": "Beşeri bilimler, iktisat ve sosyolojiden gelişmiş edatlı isim öbekleri (12 Soru)",
        "questions": [
          {
            "id": "u1l2_ex3_q1",
            "type": "matching",
            "prompt": "Cümleleri Türkçe anlamlarıyla eşleştirin.",
            "pairs": [
              {"left": "The decree from the dynasty is historic.", "right": "Hanedandan çıkan ferman tarihseldir."},
              {"left": "The montage in the cinema is modern.", "right": "Sinemadaki montaj moderndir."},
              {"left": "The deficit in the budget is critical.", "right": "Bütçedeki açık kritiktir."},
              {"left": "The conflict between doctrines is philosophical.", "right": "Doktrinler arasındaki çatışma felsefidir."}
            ]
          },
          {
            "id": "u1l2_ex3_q2",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"The decree from the dynasty is historic.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Sinemadaki montaj moderndir.",
              "Bütçedeki açık kritiktir.",
              "Doktrinler arasındaki çatışma felsefidir.",
              "Hanedandan çıkan ferman tarihseldir."
            ],
            "correctIndex": 3,
            "enSentence": "The decree from the dynasty is historic.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex3_q3",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"The montage in the cinema is modern.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Sinemadaki montaj moderndir.",
              "Hanedandan çıkan ferman tarihseldir.",
              "Bütçedeki açık kritiktir.",
              "Doktrinler arasındaki çatışma felsefidir."
            ],
            "correctIndex": 0,
            "enSentence": "The montage in the cinema is modern.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex3_q4",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"The deficit in the budget is critical.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Doktrinler arasındaki çatışma felsefidir.",
              "Hanedandan çıkan ferman tarihseldir.",
              "Bütçedeki açık kritiktir.",
              "Sinemadaki montaj moderndir."
            ],
            "correctIndex": 2,
            "enSentence": "The deficit in the budget is critical.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex3_q5",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The conflict between doctrines is philosophical.",
            "words": ["Doktrinler", "arasındaki", "çatışma", "felsefidir", "kritiktir"],
            "correctOrder": ["Doktrinler", "arasındaki", "çatışma", "felsefidir"],
            "enSentence": "The conflict between doctrines is philosophical.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex3_q6",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The decree from the dynasty is historic.",
            "words": ["Hanedandan", "çıkan", "ferman", "tarihseldir", "moderndir"],
            "correctOrder": ["Hanedandan", "çıkan", "ferman", "tarihseldir"],
            "enSentence": "The decree from the dynasty is historic.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex3_q7",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The montage in the cinema is modern.",
            "words": ["Sinemadaki", "montaj", "moderndir", "tarihseldir", "felsefidir"],
            "correctOrder": ["Sinemadaki", "montaj", "moderndir"],
            "enSentence": "The montage in the cinema is modern.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex3_q8",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin:",
            "sentence": "The deficit in the budget is ___.",
            "options": ["critical", "critically", "criticism", "criticize"],
            "correctIndex": 0,
            "translation": "Bütçedeki açık kritiktir."
          },
          {
            "id": "u1l2_ex3_q9",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "The conflict ___ doctrines is philosophical.",
            "options": ["between", "from", "on", "in"],
            "correctIndex": 0,
            "translation": "Doktrinler arasındaki çatışma felsefidir."
          },
          {
            "id": "u1l2_ex3_q10",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "multiple-choice",
            "prompt": "\"Bütçedeki açık kritiktir.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "Deficit budget in the is critical.",
              "The deficit in the budget is critical.",
              "The budget in deficit is critical.",
              "The deficit of budget is historic."
            ],
            "correctIndex": 1,
            "enSentence": "The deficit in the budget is critical.",
            "isEngToTr": False
          },
          {
            "id": "u1l2_ex3_q11",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "translation-text",
            "prompt": "\"The decree from the dynasty is historic.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Hanedandan çıkan ferman tarihseldir.",
            "enSentence": "The decree from the dynasty is historic.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex3_q12",
            "grammarTags": ["İsim ve Edat Takımları", "İsim + Edat Yapısı"],
            "type": "translation-text",
            "prompt": "\"The montage in the cinema is modern.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Sinemadaki montaj moderndir.",
            "enSentence": "The montage in the cinema is modern.",
            "isEngToTr": True
          }
        ]
      }
    ]
  },
  "3": {
    "exercises": [
      {
        "id": "u1l3ex1",
        "title": "Alıştırma 1: 3. Zincirleme Edat Yapıları ve Karma Test",
        "description": "Beşeri ve sosyal bilimlerden zincirleme edat öbekleri (12 Soru)",
        "questions": [
          {
            "id": "u1l3_ex1_q1",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "matching",
            "prompt": "İfadeleri Türkçe karşılıklarıyla eşleştirin.",
            "pairs": [
              {"left": "the source of capital in the market", "right": "piyasadaki sermayenin kaynağı"},
              {"left": "the influence of culture on society", "right": "kültürün toplum üzerindeki etkisi"},
              {"left": "the preservation of artifacts in the archive", "right": "arşivdeki eserlerin korunması"},
              {"left": "the role of cognition in perception", "right": "bilişin algıdaki rolü"}
            ]
          },
          {
            "id": "u1l3_ex1_q2",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "multiple-choice",
            "prompt": "\"the source of capital in the market\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "kültürün toplum üzerindeki etkisi",
              "piyasadaki sermayenin kaynağı",
              "arşivdeki eserlerin korunması",
              "bilişin algıdaki rolü"
            ],
            "correctIndex": 1,
            "enSentence": "the source of capital in the market",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex1_q3",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "multiple-choice",
            "prompt": "\"the influence of culture on society\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "kültürün toplum üzerindeki etkisi",
              "piyasadaki sermayenin kaynağı",
              "arşivdeki eserlerin korunması",
              "bilişin algıdaki rolü"
            ],
            "correctIndex": 0,
            "enSentence": "the influence of culture on society",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex1_q4",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "multiple-choice",
            "prompt": "\"the preservation of artifacts in the archive\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "bilişin algıdaki rolü",
              "kültürün toplum üzerindeki etkisi",
              "arşivdeki eserlerin korunması",
              "piyasadaki sermayenin kaynağı"
            ],
            "correctIndex": 2,
            "enSentence": "the preservation of artifacts in the archive",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex1_q5",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "multiple-choice",
            "prompt": "\"the role of cognition in perception\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": [
              "bilişin algıdaki rolü",
              "arşivdeki eserlerin korunması",
              "piyasadaki sermayenin kaynağı",
              "kültürün toplum üzerindeki etkisi"
            ],
            "correctIndex": 0,
            "enSentence": "the role of cognition in perception",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex1_q6",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "the source of capital ___ the market (Tr: piyasadaki sermayenin kaynağı)",
            "options": ["in", "from", "on", "under"],
            "correctIndex": 0,
            "translation": "piyasadaki sermayenin kaynağı"
          },
          {
            "id": "u1l3_ex1_q7",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "the influence of culture ___ society (Tr: kültürün toplum üzerindeki etkisi)",
            "options": ["on", "of", "from", "in"],
            "correctIndex": 0,
            "translation": "kültürün toplum üzerindeki etkisi"
          },
          {
            "id": "u1l3_ex1_q8",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "the role of cognition ___ perception (Tr: bilişin algıdaki rolü)",
            "options": ["in", "on", "from", "under"],
            "correctIndex": 0,
            "translation": "bilişin algıdaki rolü"
          },
          {
            "id": "u1l3_ex1_q9",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "piyasadaki sermayenin kaynağı",
            "enSentence": "the source of capital in the market",
            "words": ["piyasadaki", "sermayenin", "kaynağı", "etkisi", "rolü"],
            "correctOrder": ["piyasadaki", "sermayenin", "kaynağı"],
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex1_q10",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını oluşturun:",
            "translation": "bilişin algıdaki rolü",
            "trSentence": "bilişin algıdaki rolü",
            "words": ["role", "the", "of", "cognition", "in", "perception", "culture"],
            "correctOrder": ["the", "role", "of", "cognition", "in", "perception"],
            "isEngToTr": False
          },
          {
            "id": "u1l3_ex1_q11",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "translation-text",
            "prompt": "\"the influence of culture on society\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "kültürün toplum üzerindeki etkisi",
            "enSentence": "the influence of culture on society",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex1_q12",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "translation-text",
            "prompt": "\"the preservation of artifacts in the archive\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "arşivdeki eserlerin korunması",
            "enSentence": "the preservation of artifacts in the archive",
            "isEngToTr": True
          }
        ]
      },
      {
        "id": "u1l3ex2",
        "title": "Alıştırma 2: 3. Zincirleme Edat Yapıları ve Karma Test",
        "description": "Cümle düzeyinde zincirleme edat yapılarının kullanımı (12 Soru)",
        "questions": [
          {
            "id": "u1l3_ex2_q1",
            "type": "matching",
            "prompt": "Cümleleri Türkçe anlamlarıyla eşleştirin.",
            "pairs": [
              {"left": "The quality of data in the research is high.", "right": "Araştırmadaki verilerin kalitesi yüksektir."},
              {"left": "The origin of manuscripts in the library is ancient.", "right": "Kütüphanedeki el yazmalarının kökeni kadimdir."},
              {"left": "The effect of inflation on the market is strong.", "right": "Enflasyonun piyasa üzerindeki etkisi güçlüdür."},
              {"left": "The status of the precedent in court is legal.", "right": "Mahkemedeki emsalin statüsü yasaldır."}
            ]
          },
          {
            "id": "u1l3_ex2_q2",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "multiple-choice",
            "prompt": "\"The quality of data in the research is high.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Enflasyonun piyasa üzerindeki etkisi güçlüdür.",
              "Araştırmadaki verilerin kalitesi yüksektir.",
              "Kütüphanedeki el yazmalarının kökeni kadimdir.",
              "Mahkemedeki emsalin statüsü yasaldır."
            ],
            "correctIndex": 1,
            "enSentence": "The quality of data in the research is high.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex2_q3",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "multiple-choice",
            "prompt": "\"The origin of manuscripts in the library is ancient.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Araştırmadaki verilerin kalitesi yüksektir.",
              "Kütüphanedeki el yazmalarının kökeni kadimdir.",
              "Enflasyonun piyasa üzerindeki etkisi güçlüdür.",
              "Mahkemedeki emsalin statüsü yasaldır."
            ],
            "correctIndex": 1,
            "enSentence": "The origin of manuscripts in the library is ancient.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex2_q4",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "multiple-choice",
            "prompt": "\"The effect of inflation on the market is strong.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Mahkemedeki emsalin statüsü yasaldır.",
              "Araştırmadaki verilerin kalitesi yüksektir.",
              "Enflasyonun piyasa üzerindeki etkisi güçlüdür.",
              "Kütüphanedeki el yazmalarının kökeni kadimdir."
            ],
            "correctIndex": 2,
            "enSentence": "The effect of inflation on the market is strong.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex2_q5",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The status of the precedent in court is legal.",
            "words": ["Mahkemedeki", "emsalin", "statüsü", "yasaldır", "güçlüdür"],
            "correctOrder": ["Mahkemedeki", "emsalin", "statüsü", "yasaldır"],
            "enSentence": "The status of the precedent in court is legal.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex2_q6",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The quality of data in the research is high.",
            "words": ["Araştırmadaki", "verilerin", "kalitesi", "yüksektir", "kadimdir"],
            "correctOrder": ["Araştırmadaki", "verilerin", "kalitesi", "yüksektir"],
            "enSentence": "The quality of data in the research is high.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex2_q7",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The origin of manuscripts in the library is ancient.",
            "words": ["Kütüphanedeki", "el yazmalarının", "kökeni", "kadimdir", "yasaldır"],
            "correctOrder": ["Kütüphanedeki", "el yazmalarının", "kökeni", "kadimdir"],
            "enSentence": "The origin of manuscripts in the library is ancient.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex2_q8",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "The effect of inflation ___ the market is strong.",
            "options": ["on", "in", "from", "at"],
            "correctIndex": 0,
            "translation": "Enflasyonun piyasa üzerindeki etkisi güçlüdür."
          },
          {
            "id": "u1l3_ex2_q9",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin:",
            "sentence": "The status of the precedent in court is ___.",
            "options": ["legal", "legally", "legality", "legalize"],
            "correctIndex": 0,
            "translation": "Mahkemedeki emsalin statüsü yasaldır."
          },
          {
            "id": "u1l3_ex2_q10",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "multiple-choice",
            "prompt": "\"Araştırmadaki verilerin kalitesi yüksektir.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "Quality of data the in research is high.",
              "The quality of data in the research is high.",
              "The data in quality of research is high.",
              "The quality of data is high in research."
            ],
            "correctIndex": 1,
            "enSentence": "The quality of data in the research is high.",
            "isEngToTr": False
          },
          {
            "id": "u1l3_ex2_q11",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "translation-text",
            "prompt": "\"The origin of manuscripts in the library is ancient.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Kütüphanedeki el yazmalarının kökeni kadimdir.",
            "enSentence": "The origin of manuscripts in the library is ancient.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex2_q12",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "translation-text",
            "prompt": "\"The effect of inflation on the market is strong.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Enflasyonun piyasa üzerindeki etkisi güçlüdür.",
            "enSentence": "The effect of inflation on the market is strong.",
            "isEngToTr": True
          }
        ]
      },
      {
        "id": "u1l3ex3",
        "title": "Alıştırma 3: 3. Zincirleme Edat Yapıları ve Karma Test",
        "description": "Bölüm 2 genel tekrar ve pekiştirme testi (12 Soru)",
        "questions": [
          {
            "id": "u1l3_ex3_q1",
            "type": "matching",
            "prompt": "Cümleleri Türkçe anlamlarıyla eşleştirin.",
            "pairs": [
              {"left": "The history of ethics in philosophy is rich.", "right": "Felsefedeki etik tarihi zengindir."},
              {"left": "The value of assets in the economy is dynamic.", "right": "Ekonomideki varlıkların değeri dinamiktir."},
              {"left": "The impact of cinema on culture is broad.", "right": "Sinemanın kültür üzerindeki etkisi geniştir."},
              {"left": "The analysis of trauma in psychology is essential.", "right": "Psikolojideki travma analizi gereklidir."}
            ]
          },
          {
            "id": "u1l3_ex3_q2",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "multiple-choice",
            "prompt": "\"The history of ethics in philosophy is rich.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Sinemanın kültür üzerindeki etkisi geniştir.",
              "Psikolojideki travma analizi gereklidir.",
              "Felsefedeki etik tarihi zengindir.",
              "Ekonomideki varlıkların değeri dinamiktir."
            ],
            "correctIndex": 2,
            "enSentence": "The history of ethics in philosophy is rich.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex3_q3",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "multiple-choice",
            "prompt": "\"The value of assets in the economy is dynamic.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Felsefedeki etik tarihi zengindir.",
              "Ekonomideki varlıkların değeri dinamiktir.",
              "Sinemanın kültür üzerindeki etkisi geniştir.",
              "Psikolojideki travma analizi gereklidir."
            ],
            "correctIndex": 1,
            "enSentence": "The value of assets in the economy is dynamic.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex3_q4",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "multiple-choice",
            "prompt": "\"The impact of cinema on culture is broad.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Felsefedeki etik tarihi zengindir.",
              "Psikolojideki travma analizi gereklidir.",
              "Sinemanın kültür üzerindeki etkisi geniştir.",
              "Ekonomideki varlıkların değeri dinamiktir."
            ],
            "correctIndex": 2,
            "enSentence": "The impact of cinema on culture is broad.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex3_q5",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The analysis of trauma in psychology is essential.",
            "words": ["Psikolojideki", "travma", "analizi", "gereklidir", "zengindir"],
            "correctOrder": ["Psikolojideki", "travma", "analizi", "gereklidir"],
            "enSentence": "The analysis of trauma in psychology is essential.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex3_q6",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The history of ethics in philosophy is rich.",
            "words": ["Felsefedeki", "etik", "tarihi", "zengindir", "geniştir"],
            "correctOrder": ["Felsefedeki", "etik", "tarihi", "zengindir"],
            "enSentence": "The history of ethics in philosophy is rich.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex3_q7",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The value of assets in the economy is dynamic.",
            "words": ["Ekonomideki", "varlıkların", "değeri", "dinamiktir", "gereklidir"],
            "correctOrder": ["Ekonomideki", "varlıkların", "değeri", "dinamiktir"],
            "enSentence": "The value of assets in the economy is dynamic.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex3_q8",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "The impact of cinema ___ culture is broad.",
            "options": ["on", "of", "from", "at"],
            "correctIndex": 0,
            "translation": "Sinemanın kültür üzerindeki etkisi geniştir."
          },
          {
            "id": "u1l3_ex3_q9",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin:",
            "sentence": "The analysis of trauma in psychology is ___.",
            "options": ["essential", "essentially", "essence", "essentialism"],
            "correctIndex": 0,
            "translation": "Psikolojideki travma analizi gereklidir."
          },
          {
            "id": "u1l3_ex3_q10",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "multiple-choice",
            "prompt": "\"Felsefedeki etik tarihi zengindir.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "History of ethics philosophy in is rich.",
              "The history of ethics in philosophy is rich.",
              "The ethics of history in philosophy is rich.",
              "The history in philosophy of ethics is rich."
            ],
            "correctIndex": 1,
            "enSentence": "The history of ethics in philosophy is rich.",
            "isEngToTr": False
          },
          {
            "id": "u1l3_ex3_q11",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "translation-text",
            "prompt": "\"The value of assets in the economy is dynamic.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Ekonomideki varlıkların değeri dinamiktir.",
            "enSentence": "The value of assets in the economy is dynamic.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex3_q12",
            "grammarTags": ["İsim Tamlaması", "Niteleme ve Tamlama", "İsim + Edat Takımı"],
            "type": "translation-text",
            "prompt": "\"The impact of cinema on culture is broad.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Sinemanın kültür üzerindeki etkisi geniştir.",
            "enSentence": "The impact of cinema on culture is broad.",
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

pattern = r'("1"\s*:\s*\{).*?(\n\s*\},?\n\s*"2"\s*:\s*\{)'
match = re.search(pattern, content, re.DOTALL)
if match:
    new_unit1_json = json.dumps(unit1_data, ensure_ascii=False, indent=2)
    replacement = '"1": ' + new_unit1_json + ',\n  "2": {'
    start_pos = match.start()
    end_pos = match.end()
    
    updated_content = content[:start_pos] + replacement + content[end_pos:]
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(updated_content)
    print("Successfully updated unit 1 in data.js!")
else:
    print("Pattern not matched!")
