import json
import re

unit6_data = {
  "1": {
    "exercises": [
      {
        "id": "u6l16_ex1",
        "title": "Alıştırma 1: Özne + to be + isim",
        "description": "Beşeri bilimler, iktisat, hukuk, sinema, tarih, sosyoloji ve psikoloji alanlarından kısa isim cümleleri (15 Soru)",
        "createdAt": "2026-07-20T16:30:00+03:00",
        "questions": [
          {
            "id": "u6l16_q1",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat", "Geniş Zaman"],
            "type": "multiple-choice",
            "prompt": "\"The constitution is a law.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Eser bir kayıttır.",
              "Norm bir kuraldır.",
              "Enflasyon bir sorundur.",
              "Anayasa bir kanundur."
            ],
            "correctIndex": 3,
            "enSentence": "The constitution is a law.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q2",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat", "Geniş Zaman"],
            "type": "multiple-choice",
            "prompt": "\"The artifact is a relic.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Anayasa bir kanundur.",
              "Eser bir kalıntıdır.",
              "Norm bir kuraldır.",
              "Doktrin bir çerçevedir."
            ],
            "correctIndex": 1,
            "enSentence": "The artifact is a relic.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q3",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat", "Geniş Zaman"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The norm is a rule.",
            "words": ["bir", "Anayasa", "kuraldır", "Norm", "temeldir"],
            "correctOrder": ["Norm", "bir", "kuraldır"],
            "enSentence": "The norm is a rule.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q4",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat", "Geniş Zaman"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "Trauma is a condition.",
            "words": ["durumdur", "bir", "Travma", "sorundur", "Norm"],
            "correctOrder": ["Travma", "bir", "durumdur"],
            "enSentence": "Trauma is a condition.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q5",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat", "Geniş Zaman"],
            "type": "translation-text",
            "prompt": "\"Inflation is a problem.\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "Enflasyon bir sorundur.",
            "enSentence": "Inflation is a problem.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q6",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat", "Geniş Zaman"],
            "type": "translation-text",
            "prompt": "\"The film is a masterpiece.\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "Film bir başyapıttır.",
            "enSentence": "The film is a masterpiece.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q7",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat", "Geniş Zaman"],
            "type": "multiple-choice",
            "prompt": "\"The doctrine is a framework.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Film bir başyapıttır.",
              "Enflasyon bir sorundur.",
              "El yazması bir belgedir.",
              "Doktrin bir çerçevedir."
            ],
            "correctIndex": 3,
            "enSentence": "The doctrine is a framework.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q8",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat", "Geniş Zaman"],
            "type": "multiple-choice",
            "prompt": "\"The manuscript is a document.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "El yazması bir belgedir.",
              "Hüküm bir karardır.",
              "Enflasyon bir sorundur.",
              "Anayasa bir kanundur."
            ],
            "correctIndex": 0,
            "enSentence": "The manuscript is a document.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q9",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat", "Geniş Zaman"],
            "type": "multiple-choice",
            "prompt": "\"Hüküm bir karardır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "decision the verdict is a.",
              "The verdict is a decision.",
              "The verdict is a problem.",
              "The verdict a is decision."
            ],
            "correctIndex": 1,
            "enSentence": "The verdict is a decision.",
            "isEngToTr": False
          },
          {
            "id": "u6l16_q10",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat", "Geniş Zaman"],
            "type": "multiple-choice",
            "prompt": "\"Sermaye bir varlıktır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "Capital is a rule.",
              "Capital a is asset.",
              "asset capital is an.",
              "Capital is an asset."
            ],
            "correctIndex": 3,
            "enSentence": "Capital is an asset.",
            "isEngToTr": False
          },
          {
            "id": "u6l16_q11",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat", "Geniş Zaman"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The institution is a structure.",
            "words": ["Kurum", "bir", "kuraldır", "yapıdır", "temeldir"],
            "correctOrder": ["Kurum", "bir", "yapıdır"],
            "enSentence": "The institution is a structure.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q12",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat", "Geniş Zaman"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "Perception is a process.",
            "words": ["Travma", "bir", "metindir", "süreçtir", "Algı"],
            "correctOrder": ["Algı", "bir", "süreçtir"],
            "enSentence": "Perception is a process.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q13",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat", "Geniş Zaman"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "Montage is a technique.",
            "words": ["Montaj", "bir", "tekniktir", "çerçevedir", "Özet"],
            "correctOrder": ["Montaj", "bir", "tekniktir"],
            "enSentence": "Montage is a technique.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q14",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat", "Geniş Zaman"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The archive is a resource.",
            "words": ["sorundur", "kaynaktır", "bir", "Doktrin", "Arşiv"],
            "correctOrder": ["Arşiv", "bir", "kaynaktır"],
            "enSentence": "The archive is a resource.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q15",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat", "Geniş Zaman"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "Rhetoric is an art.",
            "words": ["sanattır", "tekniktir", "bir", "Retorik"],
            "correctOrder": ["Retorik", "bir", "sanattır"],
            "enSentence": "Rhetoric is an art.",
            "isEngToTr": True
          }
        ]
      }
    ]
  },
  "2": {
    "exercises": [
      {
        "id": "u6l17_ex1",
        "title": "Alıştırma 1: Özne + to be + sıfat",
        "description": "Beşeri bilimler, iktisat, hukuk, sinema, tarih, sosyoloji ve psikoloji alanlarından kısa durum cümleleri (15 Soru)",
        "createdAt": "2026-07-20T16:30:00+03:00",
        "questions": [
          {
            "id": "u6l17_q1",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"The market is volatile.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Sözleşme bağlayıcıdır.",
              "Kültür dinamiktir.",
              "Argüman geçerlidir.",
              "Piyasa değişkendir."
            ],
            "correctIndex": 3,
            "enSentence": "The market is volatile.",
            "isEngToTr": True
          },
          {
            "id": "u6l17_q2",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"The contract is binding.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Piyasa pahalı.",
              "Hafıza hassastır.",
              "Yaptırım yasadışıdır.",
              "Sözleşme bağlayıcıdır."
            ],
            "correctIndex": 3,
            "enSentence": "The contract is binding.",
            "isEngToTr": True
          },
          {
            "id": "u6l17_q3",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"Kültür dinamiktir.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "The culture is dynamic.",
              " dynamic the culture is.",
              "The is culture dynamic.",
              "The culture is fragile."
            ],
            "correctIndex": 0,
            "enSentence": "The culture is dynamic.",
            "isEngToTr": False
          },
          {
            "id": "u6l17_q4",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"Hafıza hassastır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              " fragile the memory is.",
              "The memory is fragile.",
              "The memory is binding.",
              "The is memory fragile."
            ],
            "correctIndex": 1,
            "enSentence": "The memory is fragile.",
            "isEngToTr": False
          },
          {
            "id": "u6l17_q5",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The dynasty was powerful.",
            "words": ["Hanedan", "güçlüydü", "geçerlidir", "Piyasa"],
            "correctOrder": ["Hanedan", "güçlüydü"],
            "enSentence": "The dynasty was powerful.",
            "isEngToTr": True
          },
          {
            "id": "u6l17_q6",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The narrative is complex.",
            "words": ["karmaşıktır", "Anlatı", "Hanedan", "dinamiktir"],
            "correctOrder": ["Anlatı", "karmaşıktır"],
            "enSentence": "The narrative is complex.",
            "isEngToTr": True
          },
          {
            "id": "u6l17_q7",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The argument is valid.",
            "words": ["geçerlidir", "Hanedan", "Argüman", "karmaşıktır"],
            "correctOrder": ["Argüman", "geçerlidir"],
            "enSentence": "The argument is valid.",
            "isEngToTr": True
          },
          {
            "id": "u6l17_q8",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"The sanction is illegal.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Açık yüksektir.",
              "Kültür dinamiktir.",
              "Yaptırım yasadışıdır.",
              "Hafıza hassastır."
            ],
            "correctIndex": 2,
            "enSentence": "The sanction is illegal.",
            "isEngToTr": True
          },
          {
            "id": "u6l17_q9",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"The deficit is high.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Açık yüksektir.",
              "Piyasa değişkendir.",
              "Hanedan güçlüydü.",
              "Uyarıcı keskindir."
            ],
            "correctIndex": 0,
            "enSentence": "The deficit is high.",
            "isEngToTr": True
          },
          {
            "id": "u6l17_q10",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"Uyarıcı keskindir.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "The stimulus is acute.",
              "The stimulus is dynamic.",
              " acute the stimulus is.",
              "The is stimulus acute."
            ],
            "correctIndex": 0,
            "enSentence": "The stimulus is acute.",
            "isEngToTr": False
          },
          {
            "id": "u6l17_q11",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"Toplumsal hareketlilik düşüktür.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "The mobility is low social.",
              "Is low social mobility.",
              "Social mobility is low.",
              "Social mobility is valid."
            ],
            "correctIndex": 2,
            "enSentence": "Social mobility is low.",
            "isEngToTr": False
          },
          {
            "id": "u6l17_q12",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The archive is secret.",
            "words": ["Arşiv", "gizlidir", "geçerlidir", "keskindir"],
            "correctOrder": ["Arşiv", "gizlidir"],
            "enSentence": "The archive is secret.",
            "isEngToTr": True
          },
          {
            "id": "u6l17_q13",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The aesthetic is modern.",
            "words": ["Arşiv", "Estetik", "moderndir", "bağlayıcıdır"],
            "correctOrder": ["Estetik", "moderndir"],
            "enSentence": "The aesthetic is modern.",
            "isEngToTr": True
          },
          {
            "id": "u6l17_q14",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "Ethics is essential.",
            "words": ["gizlidir", "gereklidir", "Etik", "Açık"],
            "correctOrder": ["Etik", "gereklidir"],
            "enSentence": "Ethics is essential.",
            "isEngToTr": True
          },
          {
            "id": "u6l17_q15",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The manuscript is authentic.",
            "words": ["El yazması", "özgündür", "karmaşıktır", "Kültür"],
            "correctOrder": ["El yazması", "özgündür"],
            "enSentence": "The manuscript is authentic.",
            "isEngToTr": True
          }
        ]
      }
    ]
  },
  "3": {
    "exercises": [
      {
        "id": "u6l18_ex1",
        "title": "Alıştırma 1: Özne + to be + sıfat + isim",
        "description": "Beşeri bilimler ve sosyal bilimler alanlarında yalın sıfat tamlaması cümleleri (15 Soru)",
        "createdAt": "2026-07-20T16:30:00+03:00",
        "questions": [
          {
            "id": "u6l18_q1",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "matching",
            "prompt": "Aşağıdaki öbekleri Türkçe karşılıklarıyla eşleştirin:",
            "pairs": [
              {"left": "judicial precedent", "right": "adli emsal"},
              {"left": "financial asset", "right": "finansal varlık"},
              {"left": "social norm", "right": "toplumsal norm"},
              {"left": "cognitive process", "right": "bilişsel süreç"},
              {"left": "historical artifact", "right": "tarihi eser"}
            ]
          },
          {
            "id": "u6l18_q2",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "matching",
            "prompt": "Aşağıdaki öbekleri Türkçe karşılıklarıyla eşleştirin:",
            "pairs": [
              {"left": "cinematic narrative", "right": "sinematik anlatı"},
              {"left": "philosophical doctrine", "right": "felsefi doktrin"},
              {"left": "binding contract", "right": "bağlayıcı sözleşme"},
              {"left": "fiscal deficit", "right": "mali açık"},
              {"left": "cultural structure", "right": "kültürel yapı"}
            ]
          },
          {
            "id": "u6l18_q3",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The precedent is a legal decision.",
            "words": ["karardır", "Emsal", "yasal", "bir", "doktrindir"],
            "correctOrder": ["Emsal", "yasal", "bir", "karardır"],
            "enSentence": "The precedent is a legal decision.",
            "isEngToTr": True
          },
          {
            "id": "u6l18_q4",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The asset is a financial resource.",
            "words": ["kaynaktır", "Varlık", "finansal", "bir", "karardır"],
            "correctOrder": ["Varlık", "finansal", "bir", "kaynaktır"],
            "enSentence": "The asset is a financial resource.",
            "isEngToTr": True
          },
          {
            "id": "u6l18_q5",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The artifact is an ancient relic.",
            "words": ["kalıntıdır", "kadim", "Eser", "bir", "yapıdır"],
            "correctOrder": ["Eser", "kadim", "bir", "kalıntıdır"],
            "enSentence": "The artifact is an ancient relic.",
            "isEngToTr": True
          },
          {
            "id": "u6l18_q6",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The contract is a binding agreement.",
            "words": ["anlaşmadır", "bağlayıcı", "Sözleşme", "bir", "kaynaktır"],
            "correctOrder": ["Sözleşme", "bağlayıcı", "bir", "anlaşmadır"],
            "enSentence": "The contract is a binding agreement.",
            "isEngToTr": True
          },
          {
            "id": "u6l18_q7",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The trend is a social indicator.",
            "words": ["göstergedir", "Eğilim", "toplumsal", "bir", "karardır"],
            "correctOrder": ["Eğilim", "toplumsal", "bir", "göstergedir"],
            "enSentence": "The trend is a social indicator.",
            "isEngToTr": True
          },
          {
            "id": "u6l18_q8",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "fill-blank",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin (sıfat formuna dikkat edin):",
            "sentence": "The demographic trend is an ___ outcome.",
            "options": ["expected", "expectantly", "expectation", "expecting"],
            "correctIndex": 0,
            "translation": "Demografik eğilim beklenen bir çıktıdır."
          },
          {
            "id": "u6l18_q9",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "fill-blank",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin (sıfat formuna dikkat edin):",
            "sentence": "The ancient manuscript is a ___ artifact.",
            "options": ["historical", "historically", "history", "historian"],
            "correctIndex": 0,
            "translation": "Kadim el yazması tarihi bir eserdir."
          },
          {
            "id": "u6l18_q10",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "fill-blank",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin (sıfat formuna dikkat edin):",
            "sentence": "Perception is a ___ process.",
            "options": ["complex", "complexly", "complexity", "complexion"],
            "correctIndex": 0,
            "translation": "Algı karmaşık bir süreçtir."
          },
          {
            "id": "u6l18_q11",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "fill-blank",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin (sıfat formuna dikkat edin):",
            "sentence": "Film montage is a ___ technique.",
            "options": ["cinematic", "cinematical", "cinema", "cinematographer"],
            "correctIndex": 0,
            "translation": "Film montajı sinematik bir tekniktir."
          },
          {
            "id": "u6l18_q12",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "fill-blank",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin (sıfat formuna dikkat edin):",
            "sentence": "The ethical principle is a ___ framework.",
            "options": ["philosophical", "philosophically", "philosophy", "philosopher"],
            "correctIndex": 0,
            "translation": "Etik ilke felsefi bir çerçevedir."
          },
          {
            "id": "u6l18_q13",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin (sıfat formuna dikkat edin):",
            "sentence": "The constitutional amendment is a ___ law.",
            "options": ["fundamental", "fundamentally", "fundament", "fundamentalism"],
            "correctIndex": 0,
            "translation": "Anayasa değişikliği temel bir kanundur."
          },
          {
            "id": "u6l18_q14",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin (sıfat formuna dikkat edin):",
            "sentence": "Market equilibrium is a ___ indicator.",
            "options": ["reliable", "reliably", "reliability", "rely"],
            "correctIndex": 0,
            "translation": "Piyasa dengesi güvenilir bir göstergedir."
          },
          {
            "id": "u6l18_q15",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin (sıfat formuna dikkat edin):",
            "sentence": "The archival record is an ___ document.",
            "options": ["authentic", "authentically", "authenticity", "authenticate"],
            "correctIndex": 0,
            "translation": "Arşiv kaydı özgün bir belgedir."
          }
        ]
      }
    ]
  },
  "4": {
    "exercises": [
      {
        "id": "u6l19_ex1",
        "title": "Alıştırma 1: Özne + to be + edat yapısı",
        "description": "Beşeri bilimler, iktisat, hukuk, sinema, tarih, sosyoloji ve psikoloji alanlarından kısa edat cümleleri (15 Soru)",
        "createdAt": "2026-07-20T16:30:00+03:00",
        "questions": [
          {
            "id": "u6l19_q1",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"The artifacts are in the museum.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Hüküm kayıttadır.",
              "Sermaye bankadadır.",
              "Araştırma rapordadır.",
              "Eserler müzededir."
            ],
            "correctIndex": 3,
            "enSentence": "The artifacts are in the museum.",
            "isEngToTr": True
          },
          {
            "id": "u6l19_q2",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"The verdict is in the record.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Sermaye bankadadır.",
              "Araştırma rapordadır.",
              "Hüküm kayıttadır.",
              "Test laboratuvardadır."
            ],
            "correctIndex": 2,
            "enSentence": "The verdict is in the record.",
            "isEngToTr": True
          },
          {
            "id": "u6l19_q3",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"Sermaye bankadadır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "Bank the capital is in.",
              "The capital in is bank.",
              "The capital is in the bank.",
              "The capital is in the museum."
            ],
            "correctIndex": 2,
            "enSentence": "The capital is in the bank.",
            "isEngToTr": False
          },
          {
            "id": "u6l19_q4",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"Araştırma rapordadır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "The survey is report in.",
              "Report the in survey.",
              "The survey is in the report.",
              "The survey is in the museum."
            ],
            "correctIndex": 2,
            "enSentence": "The survey is in the report.",
            "isEngToTr": False
          },
          {
            "id": "u6l19_q5",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The test is in the laboratory.",
            "words": ["Test", "laboratuvardadır", "rapordadır", "Sermaye"],
            "correctOrder": ["Test", "laboratuvardadır"],
            "enSentence": "The test is in the laboratory.",
            "isEngToTr": True
          },
          {
            "id": "u6l19_q6",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The film is in the archive.",
            "words": ["Film", "arşivdedir", "müzededir", "Hüküm"],
            "correctOrder": ["Film", "arşivdedir"],
            "enSentence": "The film is in the archive.",
            "isEngToTr": True
          },
          {
            "id": "u6l19_q7",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The doctrine is in the manuscript.",
            "words": ["Doktrin", "el yazmasındadır", "müzededir", "Test"],
            "correctOrder": ["Doktrin", "el yazmasındadır"],
            "enSentence": "The doctrine is in the manuscript.",
            "isEngToTr": True
          },
          {
            "id": "u6l19_q8",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"The law is under discussion.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Film arşivdedir.",
              "Kanun tartışılmaktadır.",
              "Eserler müzededir.",
              "Test laboratuvardadır."
            ],
            "correctIndex": 1,
            "enSentence": "The law is under discussion.",
            "isEngToTr": True
          },
          {
            "id": "u6l19_q9",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"The decree is in the museum.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Doktrin el yazmasındadır.",
              "Ferman müzededir.",
              "Sermaye bankadadır.",
              "Hüküm kayıttadır."
            ],
            "correctIndex": 1,
            "enSentence": "The decree is in the museum.",
            "isEngToTr": True
          },
          {
            "id": "u6l19_q10",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"Varlıklar risk altındadır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "The assets are under risk.",
              "Under risk assets are.",
              "The assets are in the museum.",
              "The financial is risk assets."
            ],
            "correctIndex": 0,
            "enSentence": "The assets are under risk.",
            "isEngToTr": False
          },
          {
            "id": "u6l19_q11",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"Kültür geçiş aşamasındadır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "In transition culture is.",
              "Culture in transition is.",
              "The culture is in transition.",
              "The culture is under risk."
            ],
            "correctIndex": 2,
            "enSentence": "The culture is in transition.",
            "isEngToTr": False
          },
          {
            "id": "u6l19_q12",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "Stress is under control.",
            "words": ["Stres", "kontrol", "altındadır", "müzededir"],
            "correctOrder": ["Stres", "kontrol", "altındadır"],
            "enSentence": "Stress is under control.",
            "isEngToTr": True
          },
          {
            "id": "u6l19_q13",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The film is in production.",
            "words": ["Film", "yapım", "aşamasındadır", "kontrol"],
            "correctOrder": ["Film", "yapım", "aşamasındadır"],
            "enSentence": "The film is in production.",
            "isEngToTr": True
          },
          {
            "id": "u6l19_q14",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "Debates are at the conference.",
            "words": ["Tartışmalar", "konferanstadır", "laboratuvardadır", "Stres"],
            "correctOrder": ["Tartışmalar", "konferanstadır"],
            "enSentence": "Debates are at the conference.",
            "isEngToTr": True
          },
          {
            "id": "u6l19_q15",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "Manuscripts are in the library.",
            "words": ["El yazmaları", "kütüphanededir", "müzededir", "Film"],
            "correctOrder": ["El yazmaları", "kütüphanededir"],
            "enSentence": "Manuscripts are in the library.",
            "isEngToTr": True
          }
        ]
      }
    ]
  },
  "5": {
    "exercises": [
      {
        "id": "u6l20_ex1",
        "title": "Alıştırma 1: Genel Tekrar",
        "description": "Beşeri bilimler, iktisat, hukuk, sinema, tarih, sosyoloji ve psikoloji alanlarında temel cümle yapılarının genel tekrarı (15 Soru)",
        "createdAt": "2026-07-20T16:30:00+03:00",
        "questions": [
          {
            "id": "u6l20_q1",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"The market is volatile.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Anayasa bir kanundur.",
              "El yazmaları arşivdedir.",
              "Biliş bir süreçtir.",
              "Piyasa değişkendir."
            ],
            "correctIndex": 3,
            "enSentence": "The market is volatile.",
            "isEngToTr": True
          },
          {
            "id": "u6l20_q2",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"The constitution is a law.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Piyasa değişkendir.",
              "Film bir başyapıttır.",
              "Enflasyon bir sorundur.",
              "Anayasa bir kanundur."
            ],
            "correctIndex": 3,
            "enSentence": "The constitution is a law.",
            "isEngToTr": True
          },
          {
            "id": "u6l20_q3",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"The verdict is in the record.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": [
              "Kalıntı müzededir.",
              "Hüküm kayıttadır.",
              "Doktrin tartışılmaktadır.",
              "Mevzuat bir garantidir."
            ],
            "correctIndex": 1,
            "enSentence": "The verdict is in the record.",
            "isEngToTr": True
          },
          {
            "id": "u6l20_q4",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"Film bir başyapıttır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "The constitution is a law.",
              "The market is volatile.",
              "The film is a masterpiece.",
              "The verdict is in the record."
            ],
            "correctIndex": 2,
            "enSentence": "The film is a masterpiece.",
            "isEngToTr": False
          },
          {
            "id": "u6l20_q5",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"Biliş zihinsel bir süreçtir.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "Cognition is a mental process.",
              "The constitution is a law.",
              "Debates are at the conference.",
              "The market is volatile."
            ],
            "correctIndex": 0,
            "enSentence": "Cognition is a mental process.",
            "isEngToTr": False
          },
          {
            "id": "u6l20_q6",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "multiple-choice",
            "prompt": "\"Enflasyon ekonomik bir meseledir.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [
              "The film is a masterpiece.",
              "The verdict is in court.",
              "Inflation is an economic issue.",
              "The constitution is a law."
            ],
            "correctIndex": 2,
            "enSentence": "Inflation is an economic issue.",
            "isEngToTr": False
          },
          {
            "id": "u6l20_q7",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The principle is fundamental.",
            "words": ["temeldir", "İlke", "değişkendir", "Anayasa"],
            "correctOrder": ["İlke", "temeldir"],
            "enSentence": "The principle is fundamental.",
            "isEngToTr": True
          },
          {
            "id": "u6l20_q8",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "Manuscripts are in the archive.",
            "words": ["El yazmaları", "arşivdedir", "temeldir", "İlke"],
            "correctOrder": ["El yazmaları", "arşivdedir"],
            "enSentence": "Manuscripts are in the archive.",
            "isEngToTr": True
          },
          {
            "id": "u6l20_q9",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The relic is in the museum.",
            "words": ["Kalıntı", "müzededir", "İlke", "temeldir"],
            "correctOrder": ["Kalıntı", "müzededir"],
            "enSentence": "The relic is in the museum.",
            "isEngToTr": True
          },
          {
            "id": "u6l20_q10",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "Mobility is a social indicator.",
            "words": ["Hareketlilik", "toplumsal", "bir", "göstergedir", "müzededir"],
            "correctOrder": ["Hareketlilik", "toplumsal", "bir", "göstergedir"],
            "enSentence": "Mobility is a social indicator.",
            "isEngToTr": True
          },
          {
            "id": "u6l20_q11",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "Cinematography is a visual art.",
            "words": ["görsel", "bir", "sanattır", "göstergedir", "Sinematografi"],
            "correctOrder": ["Sinematografi", "görsel", "bir", "sanattır"],
            "enSentence": "Cinematography is a visual art.",
            "isEngToTr": True
          },
          {
            "id": "u6l20_q12",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "The doctrine is under debate.",
            "words": ["tartışılmaktadır", "Doktrin", "sanattır"],
            "correctOrder": ["Doktrin", "tartışılmaktadır"],
            "enSentence": "The doctrine is under debate.",
            "isEngToTr": True
          },
          {
            "id": "u6l20_q13",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını oluşturun:",
            "translation": "Legislation is a guarantee.",
            "words": ["Mevzuat", "bir", "garantidir", "Doktrin"],
            "correctOrder": ["Mevzuat", "bir", "garantidir"],
            "enSentence": "Legislation is a guarantee.",
            "isEngToTr": True
          },
          {
            "id": "u6l20_q14",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını oluşturun:",
            "translation": "Norm bağlayıcıdır.",
            "words": ["binding", "guarantee", "norm", "is", "The"],
            "correctOrder": ["The", "norm", "is", "binding"],
            "enSentence": "The norm is binding.",
            "isEngToTr": False
          },
          {
            "id": "u6l20_q15",
            "grammarTags": ["Temel Yapılar", "To Be + İsim / Sıfat"],
            "type": "translation-text",
            "prompt": "\"The outcome is a success.\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "Sonuç bir başarıdır.",
            "enSentence": "The outcome is a success.",
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

pattern = r'("6"\s*:\s*\{).*?(\n\s*\},?\n\s*"7"\s*:\s*\{)'
match = re.search(pattern, content, re.DOTALL)
if match:
    new_unit6_json = json.dumps(unit6_data, ensure_ascii=False, indent=2)
    replacement = '"6": ' + new_unit6_json + ',\n  "7": {'
    start_pos = match.start()
    end_pos = match.end()
    
    updated_content = content[:start_pos] + replacement + content[end_pos:]
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(updated_content)
    print("Successfully updated unit 6 with concise sentences!")
else:
    print("Pattern not matched!")
