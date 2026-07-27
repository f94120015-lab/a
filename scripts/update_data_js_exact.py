import json

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
            "grammarTags": ["Temel Yapılar", "To Be + İsim", "Hukuk"],
            "type": "multiple-choice",
            "prompt": "\"The constitution is a law.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Eser bir kayıttır.", "Norm bir kuraldır.", "Enflasyon bir sorundur.", "Anayasa bir kanundur."],
            "correctIndex": 3,
            "enSentence": "The constitution is a law.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q2",
            "grammarTags": ["Temel Yapılar", "To Be + İsim", "Tarih"],
            "type": "multiple-choice",
            "prompt": "\"The artifact is a relic.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Anayasa bir kanundur.", "Eser bir kalıntıdır.", "Norm bir kuraldır.", "Doktrin bir çerçevedir."],
            "correctIndex": 1,
            "enSentence": "The artifact is a relic.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q3",
            "grammarTags": ["Temel Yapılar", "To Be + İsim", "Sosyoloji"],
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
            "grammarTags": ["Temel Yapılar", "To Be + İsim", "Psikoloji"],
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
            "grammarTags": ["Temel Yapılar", "To Be + İsim", "İktisat"],
            "type": "translation-text",
            "prompt": "\"Inflation is a problem.\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "Enflasyon bir sorundur.",
            "enSentence": "Inflation is a problem.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q6",
            "grammarTags": ["Temel Yapılar", "To Be + İsim", "Sinema"],
            "type": "translation-text",
            "prompt": "\"The film is a masterpiece.\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "Film bir başyapıttır.",
            "enSentence": "The film is a masterpiece.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q7",
            "grammarTags": ["Temel Yapılar", "To Be + İsim", "Felsefe"],
            "type": "multiple-choice",
            "prompt": "\"The doctrine is a framework.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Film bir başyapıttır.", "Enflasyon bir sorundur.", "El yazması bir belgedir.", "Doktrin bir çerçevedir."],
            "correctIndex": 3,
            "enSentence": "The doctrine is a framework.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q8",
            "grammarTags": ["Temel Yapılar", "To Be + İsim", "Tarih"],
            "type": "multiple-choice",
            "prompt": "\"The manuscript is a document.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["El yazması bir belgedir.", "Hüküm bir karardır.", "Enflasyon bir sorundur.", "Anayasa bir kanundur."],
            "correctIndex": 0,
            "enSentence": "The manuscript is a document.",
            "isEngToTr": True
          },
          {
            "id": "u6l16_q9",
            "grammarTags": ["Temel Yapılar", "To Be + İsim", "Hukuk"],
            "type": "multiple-choice",
            "prompt": "\"Hüküm bir karardır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["decision the verdict is a.", "The verdict is a decision.", "The verdict is a problem.", "The verdict a is decision."],
            "correctIndex": 1,
            "enSentence": "The verdict is a decision.",
            "isEngToTr": False
          },
          {
            "id": "u6l16_q10",
            "grammarTags": ["Temel Yapılar", "To Be + İsim", "İktisat"],
            "type": "multiple-choice",
            "prompt": "\"Sermaye bir varlıktır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["Capital is a rule.", "Capital a is asset.", "asset capital is an.", "Capital is an asset."],
            "correctIndex": 3,
            "enSentence": "Capital is an asset.",
            "isEngToTr": False
          },
          {
            "id": "u6l16_q11",
            "grammarTags": ["Temel Yapılar", "To Be + İsim", "Sosyoloji"],
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
            "grammarTags": ["Temel Yapılar", "To Be + İsim", "Psikoloji"],
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
            "grammarTags": ["Temel Yapılar", "To Be + İsim", "Sinema"],
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
            "grammarTags": ["Temel Yapılar", "To Be + İsim", "Tarih"],
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
            "grammarTags": ["Temel Yapılar", "To Be + İsim", "Felsefe"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat", "İktisat"],
            "type": "multiple-choice",
            "prompt": "\"The market is volatile.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Sözleşme bağlayıcıdır.", "Kültür dinamiktir.", "Argüman geçerlidir.", "Piyasa değişkendir."],
            "correctIndex": 3,
            "enSentence": "The market is volatile.",
            "isEngToTr": True
          },
          {
            "id": "u6l17_q2",
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat", "Hukuk"],
            "type": "multiple-choice",
            "prompt": "\"The contract is binding.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Piyasa pahalı.", "Hafıza hassastır.", "Yaptırım yasadışıdır.", "Sözleşme bağlayıcıdır."],
            "correctIndex": 3,
            "enSentence": "The contract is binding.",
            "isEngToTr": True
          },
          {
            "id": "u6l17_q3",
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat", "Sosyoloji"],
            "type": "multiple-choice",
            "prompt": "\"Kültür dinamiktir.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["The culture is dynamic.", " dynamic the culture is.", "The is culture dynamic.", "The culture is fragile."],
            "correctIndex": 0,
            "enSentence": "The culture is dynamic.",
            "isEngToTr": False
          },
          {
            "id": "u6l17_q4",
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat", "Psikoloji"],
            "type": "multiple-choice",
            "prompt": "\"Hafıza hassastır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": [" fragile the memory is.", "The memory is fragile.", "The memory is binding.", "The is memory fragile."],
            "correctIndex": 1,
            "enSentence": "The memory is fragile.",
            "isEngToTr": False
          },
          {
            "id": "u6l17_q5",
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat", "Tarih"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat", "Sinema"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat", "Felsefe"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat", "Hukuk"],
            "type": "multiple-choice",
            "prompt": "\"The sanction is illegal.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Açık yüksektir.", "Kültür dinamiktir.", "Yaptırım yasadışıdır.", "Hafıza hassastır."],
            "correctIndex": 2,
            "enSentence": "The sanction is illegal.",
            "isEngToTr": True
          },
          {
            "id": "u6l17_q9",
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat", "İktisat"],
            "type": "multiple-choice",
            "prompt": "\"The deficit is high.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Açık yüksektir.", "Piyasa değişkendir.", "Hanedan güçlüydü.", "Uyarıcı keskindir."],
            "correctIndex": 0,
            "enSentence": "The deficit is high.",
            "isEngToTr": True
          },
          {
            "id": "u6l17_q10",
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat", "Psikoloji"],
            "type": "multiple-choice",
            "prompt": "\"Uyarıcı keskindir.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["The stimulus is acute.", "The stimulus is dynamic.", " acute the stimulus is.", "The is stimulus acute."],
            "correctIndex": 0,
            "enSentence": "The stimulus is acute.",
            "isEngToTr": False
          },
          {
            "id": "u6l17_q11",
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat", "Sosyoloji"],
            "type": "multiple-choice",
            "prompt": "\"Toplumsal hareketlilik düşüktür.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["The mobility is low social.", "Is low social mobility.", "Social mobility is low.", "Social mobility is valid."],
            "correctIndex": 2,
            "enSentence": "Social mobility is low.",
            "isEngToTr": False
          },
          {
            "id": "u6l17_q12",
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat", "Tarih"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat", "Sinema"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat", "Felsefe"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat", "Tarih"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat + İsim", "Hukuk"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat + İsim", "Sinema"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat + İsim", "Hukuk"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat + İsim", "İktisat"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat + İsim", "Tarih"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat + İsim", "Hukuk"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat + İsim", "Sosyoloji"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat + İsim", "Sosyoloji"],
            "type": "fill-blank",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin (sıfat formuna dikkat edin):",
            "sentence": "The demographic trend is an ___ outcome.",
            "options": ["expected", "expectantly", "expectation", "expecting"],
            "correctIndex": 0,
            "translation": "Demografik eğilim beklenen bir çıktıdır."
          },
          {
            "id": "u6l18_q9",
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat + İsim", "Tarih"],
            "type": "fill-blank",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin (sıfat formuna dikkat edin):",
            "sentence": "The ancient manuscript is a ___ artifact.",
            "options": ["historical", "historically", "history", "historian"],
            "correctIndex": 0,
            "translation": "Kadim el yazması tarihi bir eserdir."
          },
          {
            "id": "u6l18_q10",
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat + İsim", "Psikoloji"],
            "type": "fill-blank",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin (sıfat formuna dikkat edin):",
            "sentence": "Perception is a ___ process.",
            "options": ["complex", "complexly", "complexity", "complexion"],
            "correctIndex": 0,
            "translation": "Algı karmaşık bir süreçtir."
          },
          {
            "id": "u6l18_q11",
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat + İsim", "Sinema"],
            "type": "fill-blank",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin (sıfat formuna dikkat edin):",
            "sentence": "Film montage is a ___ technique.",
            "options": ["cinematic", "cinematical", "cinema", "cinematographer"],
            "correctIndex": 0,
            "translation": "Film montajı sinematik bir tekniktir."
          },
          {
            "id": "u6l18_q12",
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat + İsim", "Felsefe"],
            "type": "fill-blank",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin (sıfat formuna dikkat edin):",
            "sentence": "The ethical principle is a ___ framework.",
            "options": ["philosophical", "philosophically", "philosophy", "philosopher"],
            "correctIndex": 0,
            "translation": "Etik ilke felsefi bir çerçevedir."
          },
          {
            "id": "u6l18_q13",
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat + İsim", "Hukuk"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin (sıfat formuna dikkat edin):",
            "sentence": "The constitutional amendment is a ___ law.",
            "options": ["fundamental", "fundamentally", "fundament", "fundamentalism"],
            "correctIndex": 0,
            "translation": "Anayasa değişikliği temel bir kanundur."
          },
          {
            "id": "u6l18_q14",
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat + İsim", "İktisat"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin (sıfat formuna dikkat edin):",
            "sentence": "Market equilibrium is a ___ indicator.",
            "options": ["reliable", "reliably", "reliability", "rely"],
            "correctIndex": 0,
            "translation": "Piyasa dengesi güvenilir bir göstergedir."
          },
          {
            "id": "u6l18_q15",
            "grammarTags": ["Temel Yapılar", "To Be + Sıfat + İsim", "Tarih"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Edat Yapısı", "Tarih"],
            "type": "multiple-choice",
            "prompt": "\"The artifacts are in the museum.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Hüküm kayıttadır.", "Sermaye bankadadır.", "Araştırma rapordadır.", "Eserler müzededir."],
            "correctIndex": 3,
            "enSentence": "The artifacts are in the museum.",
            "isEngToTr": True
          },
          {
            "id": "u6l19_q2",
            "grammarTags": ["Temel Yapılar", "To Be + Edat Yapısı", "Hukuk"],
            "type": "multiple-choice",
            "prompt": "\"The verdict is in the record.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Sermaye bankadadır.", "Araştırma rapordadır.", "Hüküm kayıttadır.", "Test laboratuvardadır."],
            "correctIndex": 2,
            "enSentence": "The verdict is in the record.",
            "isEngToTr": True
          },
          {
            "id": "u6l19_q3",
            "grammarTags": ["Temel Yapılar", "To Be + Edat Yapısı", "İktisat"],
            "type": "multiple-choice",
            "prompt": "\"Sermaye bankadadır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["Bank the capital is in.", "The capital in is bank.", "The capital is in the bank.", "The capital is in the museum."],
            "correctIndex": 2,
            "enSentence": "The capital is in the bank.",
            "isEngToTr": False
          },
          {
            "id": "u6l19_q4",
            "grammarTags": ["Temel Yapılar", "To Be + Edat Yapısı", "Sosyoloji"],
            "type": "multiple-choice",
            "prompt": "\"Araştırma rapordadır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["The survey is report in.", "Report the in survey.", "The survey is in the report.", "The survey is in the museum."],
            "correctIndex": 2,
            "enSentence": "The survey is in the report.",
            "isEngToTr": False
          },
          {
            "id": "u6l19_q5",
            "grammarTags": ["Temel Yapılar", "To Be + Edat Yapısı", "Psikoloji"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Edat Yapısı", "Sinema"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Edat Yapısı", "Felsefe"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Edat Yapısı", "Hukuk"],
            "type": "multiple-choice",
            "prompt": "\"The law is under discussion.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Film arşivdedir.", "Kanun tartışılmaktadır.", "Eserler müzededir.", "Test laboratuvardadır."],
            "correctIndex": 1,
            "enSentence": "The law is under discussion.",
            "isEngToTr": True
          },
          {
            "id": "u6l19_q9",
            "grammarTags": ["Temel Yapılar", "To Be + Edat Yapısı", "Tarih"],
            "type": "multiple-choice",
            "prompt": "\"The decree is in the museum.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Doktrin el yazmasındadır.", "Ferman müzededir.", "Sermaye bankadadır.", "Hüküm kayıttadır."],
            "correctIndex": 1,
            "enSentence": "The decree is in the museum.",
            "isEngToTr": True
          },
          {
            "id": "u6l19_q10",
            "grammarTags": ["Temel Yapılar", "To Be + Edat Yapısı", "İktisat"],
            "type": "multiple-choice",
            "prompt": "\"Varlıklar risk altındadır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["The assets are under risk.", "Under risk assets are.", "The assets are in the museum.", "The financial is risk assets."],
            "correctIndex": 0,
            "enSentence": "The assets are under risk.",
            "isEngToTr": False
          },
          {
            "id": "u6l19_q11",
            "grammarTags": ["Temel Yapılar", "To Be + Edat Yapısı", "Sosyoloji"],
            "type": "multiple-choice",
            "prompt": "\"Kültür geçiş aşamasındadır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["In transition culture is.", "Culture in transition is.", "The culture is in transition.", "The culture is under risk."],
            "correctIndex": 2,
            "enSentence": "The culture is in transition.",
            "isEngToTr": False
          },
          {
            "id": "u6l19_q12",
            "grammarTags": ["Temel Yapılar", "To Be + Edat Yapısı", "Psikoloji"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Edat Yapısı", "Sinema"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Edat Yapısı", "Felsefe"],
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
            "grammarTags": ["Temel Yapılar", "To Be + Edat Yapısı", "Tarih"],
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
            "grammarTags": ["Temel Yapılar", "Genel Tekrar", "İktisat"],
            "type": "multiple-choice",
            "prompt": "\"The market is volatile.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Anayasa bir kanundur.", "El yazmaları arşivdedir.", "Biliş bir süreçtir.", "Piyasa değişkendir."],
            "correctIndex": 3,
            "enSentence": "The market is volatile.",
            "isEngToTr": True
          },
          {
            "id": "u6l20_q2",
            "grammarTags": ["Temel Yapılar", "Genel Tekrar", "Hukuk"],
            "type": "multiple-choice",
            "prompt": "\"The constitution is a law.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Piyasa değişkendir.", "Film bir başyapıttır.", "Enflasyon bir sorundur.", "Anayasa bir kanundur."],
            "correctIndex": 3,
            "enSentence": "The constitution is a law.",
            "isEngToTr": True
          },
          {
            "id": "u6l20_q3",
            "grammarTags": ["Temel Yapılar", "Genel Tekrar", "Hukuk"],
            "type": "multiple-choice",
            "prompt": "\"The verdict is in the record.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Kalıntı müzededir.", "Hüküm kayıttadır.", "Doktrin tartışılmaktadır.", "Mevzuat bir garantidir."],
            "correctIndex": 1,
            "enSentence": "The verdict is in the record.",
            "isEngToTr": True
          },
          {
            "id": "u6l20_q4",
            "grammarTags": ["Temel Yapılar", "Genel Tekrar", "Sinema"],
            "type": "multiple-choice",
            "prompt": "\"Film bir başyapıttır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["The constitution is a law.", "The market is volatile.", "The film is a masterpiece.", "The verdict is in the record."],
            "correctIndex": 2,
            "enSentence": "The film is a masterpiece.",
            "isEngToTr": False
          },
          {
            "id": "u6l20_q5",
            "grammarTags": ["Temel Yapılar", "Genel Tekrar", "Psikoloji"],
            "type": "multiple-choice",
            "prompt": "\"Biliş zihinsel bir süreçtir.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["Cognition is a mental process.", "The constitution is a law.", "Debates are at the conference.", "The market is volatile."],
            "correctIndex": 0,
            "enSentence": "Cognition is a mental process.",
            "isEngToTr": False
          },
          {
            "id": "u6l20_q6",
            "grammarTags": ["Temel Yapılar", "Genel Tekrar", "İktisat"],
            "type": "multiple-choice",
            "prompt": "\"Enflasyon ekonomik bir meseledir.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["The film is a masterpiece.", "The verdict is in court.", "Inflation is an economic issue.", "The constitution is a law."],
            "correctIndex": 2,
            "enSentence": "Inflation is an economic issue.",
            "isEngToTr": False
          },
          {
            "id": "u6l20_q7",
            "grammarTags": ["Temel Yapılar", "Genel Tekrar", "Felsefe"],
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
            "grammarTags": ["Temel Yapılar", "Genel Tekrar", "Tarih"],
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
            "grammarTags": ["Temel Yapılar", "Genel Tekrar", "Tarih"],
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
            "grammarTags": ["Temel Yapılar", "Genel Tekrar", "Sosyoloji"],
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
            "grammarTags": ["Temel Yapılar", "Genel Tekrar", "Sinema"],
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
            "grammarTags": ["Temel Yapılar", "Genel Tekrar", "Felsefe"],
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
            "grammarTags": ["Temel Yapılar", "Genel Tekrar", "Hukuk"],
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
            "grammarTags": ["Temel Yapılar", "Genel Tekrar", "Sosyoloji"],
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
            "grammarTags": ["Temel Yapılar", "Genel Tekrar", "Beşeri Bilimler"],
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

unit1_data = {
  "1": {
    "exercises": [
      {
        "id": "u1l1ex1",
        "title": "Alıştırma 1: 1. Giriş ve Of/Of The Yapıları",
        "description": "Beşeri bilimler, iktisat, hukuk, sinema, tarih, sosyoloji ve psikoloji alanlarından of/of the tamlamaları (12 Soru)",
        "createdAt": "2026-07-20T16:30:00+03:00",
        "questions": [
          {
            "id": "u1l1_ex1_q1",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Hukuk"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Hukuk"],
            "type": "multiple-choice",
            "prompt": "\"the structure of the constitution\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["anayasanın yapısı", "enflasyonun etkisi", "sinemanın tarihi", "retoriğin rolü"],
            "correctIndex": 0,
            "enSentence": "the structure of the constitution",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex1_q3",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "İktisat"],
            "type": "multiple-choice",
            "prompt": "\"the impact of inflation\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["anayasanın yapısı", "sinemanın tarihi", "retoriğin rolü", "enflasyonun etkisi"],
            "correctIndex": 3,
            "enSentence": "the impact of inflation",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex1_q4",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Sinema"],
            "type": "multiple-choice",
            "prompt": "\"the history of cinema\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["retoriğin rolü", "enflasyonun etkisi", "anayasanın yapısı", "sinemanın tarihi"],
            "correctIndex": 3,
            "enSentence": "the history of cinema",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex1_q5",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Felsefe"],
            "type": "multiple-choice",
            "prompt": "\"the role of rhetoric\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["retoriğin rolü", "enflasyonun etkisi", "sinemanın tarihi", "anayasanın yapısı"],
            "correctIndex": 0,
            "enSentence": "the role of rhetoric",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex1_q6",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Hukuk"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "the structure ___ the constitution (Tr: anayasanın yapısı)",
            "options": ["of", "from", "on", "in"],
            "correctIndex": 0,
            "translation": "anayasanın yapısı"
          },
          {
            "id": "u1l1_ex1_q7",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "İktisat"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "the impact ___ inflation (Tr: enflasyonun etkisi)",
            "options": ["of", "from", "at", "in"],
            "correctIndex": 0,
            "translation": "enflasyonun etkisi"
          },
          {
            "id": "u1l1_ex1_q8",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Sinema"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "the history ___ cinema (Tr: sinemanın tarihi)",
            "options": ["of", "on", "from", "with"],
            "correctIndex": 0,
            "translation": "sinemanın tarihi"
          },
          {
            "id": "u1l1_ex1_q9",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Hukuk"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "İktisat"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Sinema"],
            "type": "translation-text",
            "prompt": "\"the history of cinema\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "sinemanın tarihi",
            "enSentence": "the history of cinema",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex1_q12",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Felsefe"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Hukuk"],
            "type": "multiple-choice",
            "prompt": "\"The authority of the constitution is clear.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Piyasanın dengesi hassastır.", "Eserin kökeni bilinmemektedir.", "Kültürün evrimi hızlıdır.", "Anayasanın otoritesi açıktır."],
            "correctIndex": 3,
            "enSentence": "The authority of the constitution is clear.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex2_q3",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Sosyoloji"],
            "type": "multiple-choice",
            "prompt": "\"The evolution of culture is rapid.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Anayasanın otoritesi açıktır.", "Eserin kökeni bilinmemektedir.", "Kültürün evrimi hızlıdır.", "Piyasanın dengesi hassastır."],
            "correctIndex": 2,
            "enSentence": "The evolution of culture is rapid.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex2_q4",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
            "type": "multiple-choice",
            "prompt": "\"The origin of the artifact is unknown.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Eserin kökeni bilinmemektedir.", "Anayasanın otoritesi açıktır.", "Kültürün evrimi hızlıdır.", "Piyasanın dengesi hassastır."],
            "correctIndex": 0,
            "enSentence": "The origin of the artifact is unknown.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex2_q5",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "İktisat"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Hukuk"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Sosyoloji"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin:",
            "sentence": "The origin of the artifact is ___.",
            "options": ["unknown", "unknownly", "unknowing", "know"],
            "correctIndex": 0,
            "translation": "Eserin kökeni bilinmemektedir."
          },
          {
            "id": "u1l1_ex2_q9",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "İktisat"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "The balance ___ the market is fragile.",
            "options": ["of", "from", "in", "on"],
            "correctIndex": 0,
            "translation": "Piyasanın dengesi hassastır."
          },
          {
            "id": "u1l1_ex2_q10",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Sosyoloji"],
            "type": "multiple-choice",
            "prompt": "\"Kültürün evrimi hızlıdır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["Evolution the culture of is rapid.", "The evolution of culture is rapid.", "The culture of evolution is rapid.", "The evolution of culture is unknown."],
            "correctIndex": 1,
            "enSentence": "The evolution of culture is rapid.",
            "isEngToTr": False
          },
          {
            "id": "u1l1_ex2_q11",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
            "type": "translation-text",
            "prompt": "\"The origin of the artifact is unknown.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Eserin kökeni bilinmemektedir.",
            "enSentence": "The origin of the artifact is unknown.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex2_q12",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "İktisat"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Hukuk"],
            "type": "multiple-choice",
            "prompt": "\"The precedent of the court is binding.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Filmin estetiği özgündür.", "Hafızanın travması derindir.", "El yazmasının anlatısı tarihseldir.", "Mahkemenin emsali bağlayıcıdır."],
            "correctIndex": 3,
            "enSentence": "The precedent of the court is binding.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex3_q3",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Sinema"],
            "type": "multiple-choice",
            "prompt": "\"The aesthetic of the film is unique.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Filmin estetiği özgündür.", "Mahkemenin emsali bağlayıcıdır.", "Hafızanın travması derindir.", "El yazmasının anlatısı tarihseldir."],
            "correctIndex": 0,
            "enSentence": "The aesthetic of the film is unique.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex3_q4",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Psikoloji"],
            "type": "multiple-choice",
            "prompt": "\"The trauma of the memory is deep.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["El yazmasının anlatısı tarihseldir.", "Mahkemenin emsali bağlayıcıdır.", "Hafızanın travması derindir.", "Filmin estetiği özgündür."],
            "correctIndex": 2,
            "enSentence": "The trauma of the memory is deep.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex3_q5",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Hukuk"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Sinema"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Psikoloji"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin:",
            "sentence": "The trauma of the memory is ___.",
            "options": ["deep", "deeply", "deepen", "depth"],
            "correctIndex": 0,
            "translation": "Hafızanın travması derindir."
          },
          {
            "id": "u1l1_ex3_q9",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "The narrative ___ the manuscript is historical.",
            "options": ["of", "from", "at", "in"],
            "correctIndex": 0,
            "translation": "El yazmasının anlatısı tarihseldir."
          },
          {
            "id": "u1l1_ex3_q10",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Hukuk"],
            "type": "multiple-choice",
            "prompt": "\"Mahkemenin emsali bağlayıcıdır.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["Court precedent the of is binding.", "The precedent of the court is binding.", "The court of precedent is binding.", "The precedent of court is unique."],
            "correctIndex": 1,
            "enSentence": "The precedent of the court is binding.",
            "isEngToTr": False
          },
          {
            "id": "u1l1_ex3_q11",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Sinema"],
            "type": "translation-text",
            "prompt": "\"The aesthetic of the film is unique.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Filmin estetiği özgündür.",
            "enSentence": "The aesthetic of the film is unique.",
            "isEngToTr": True
          },
          {
            "id": "u1l1_ex3_q12",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Psikoloji"],
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
        "createdAt": "2026-07-20T16:30:00+03:00",
        "questions": [
          {
            "id": "u1l2_ex1_q1",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
            "type": "multiple-choice",
            "prompt": "\"a manuscript from the archive\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["arşivden bir el yazması", "toplumda bir norm", "bankadaki sermaye", "kanun kapsamındaki yaptırım"],
            "correctIndex": 0,
            "enSentence": "a manuscript from the archive",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex1_q3",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Sosyoloji"],
            "type": "multiple-choice",
            "prompt": "\"a norm in the society\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["kanun kapsamındaki yaptırım", "arşivden bir el yazması", "toplumda bir norm", "bankadaki sermaye"],
            "correctIndex": 2,
            "enSentence": "a norm in the society",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex1_q4",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "İktisat"],
            "type": "multiple-choice",
            "prompt": "\"the capital in the bank\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["toplumda bir norm", "bankadaki sermaye", "arşivden bir el yazması", "kanun kapsamındaki yaptırım"],
            "correctIndex": 1,
            "enSentence": "the capital in the bank",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex1_q5",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Hukuk"],
            "type": "multiple-choice",
            "prompt": "\"the sanction under the law\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["kanun kapsamındaki yaptırım", "bankadaki sermaye", "toplumda bir norm", "arşivden bir el yazması"],
            "correctIndex": 0,
            "enSentence": "the sanction under the law",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex1_q6",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "a manuscript ___ the archive (Tr: arşivden bir el yazması)",
            "options": ["from", "of", "on", "at"],
            "correctIndex": 0,
            "translation": "arşivden bir el yazması"
          },
          {
            "id": "u1l2_ex1_q7",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Sosyoloji"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "a norm ___ the society (Tr: toplumda bir norm)",
            "options": ["in", "from", "on", "under"],
            "correctIndex": 0,
            "translation": "toplumda bir norm"
          },
          {
            "id": "u1l2_ex1_q8",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Hukuk"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "the sanction ___ the law (Tr: kanun kapsamındaki yaptırım)",
            "options": ["under", "of", "from", "in"],
            "correctIndex": 0,
            "translation": "kanun kapsamındaki yaptırım"
          },
          {
            "id": "u1l2_ex1_q9",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "İktisat"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Sosyoloji"],
            "type": "translation-text",
            "prompt": "\"a norm in the society\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "toplumda bir norm",
            "enSentence": "a norm in the society",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex1_q12",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Hukuk"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
            "type": "multiple-choice",
            "prompt": "\"The artifact from the museum is authentic.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Etik üzerine tartışma açıktır.", "Portföydeki varlık güvendedir.", "Beyindeki uyarıcı keskindir.", "Müzedeki eser özgündür."],
            "correctIndex": 3,
            "enSentence": "The artifact from the museum is authentic.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex2_q3",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Psikoloji"],
            "type": "multiple-choice",
            "prompt": "\"The stimulus in the brain is acute.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Müzedeki eser özgündür.", "Portföydeki varlık güvendedir.", "Beyindeki uyarıcı keskindir.", "Etik üzerine tartışma açıktır."],
            "correctIndex": 2,
            "enSentence": "The stimulus in the brain is acute.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex2_q4",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "İktisat"],
            "type": "multiple-choice",
            "prompt": "\"The asset in the portfolio is secure.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Portföydeki varlık güvendedir.", "Müzedeki eser özgündür.", "Beyindeki uyarıcı keskindir.", "Etik üzerine tartışma açıktır."],
            "correctIndex": 0,
            "enSentence": "The asset in the portfolio is secure.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex2_q5",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Felsefe"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Psikoloji"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "İktisat"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin:",
            "sentence": "The asset in the portfolio is ___.",
            "options": ["secure", "securely", "security", "securing"],
            "correctIndex": 0,
            "translation": "Portföydeki varlık güvendedir."
          },
          {
            "id": "u1l2_ex2_q9",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Felsefe"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "The debate ___ ethics is open.",
            "options": ["on", "from", "of", "in"],
            "correctIndex": 0,
            "translation": "Etik üzerine tartışma açıktır."
          },
          {
            "id": "u1l2_ex2_q10",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
            "type": "multiple-choice",
            "prompt": "\"Müzedeki eser özgündür.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["Artifact museum the from is authentic.", "The artifact from the museum is authentic.", "The museum from artifact is authentic.", "The artifact from museum is acute."],
            "correctIndex": 1,
            "enSentence": "The artifact from the museum is authentic.",
            "isEngToTr": False
          },
          {
            "id": "u1l2_ex2_q11",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Psikoloji"],
            "type": "translation-text",
            "prompt": "\"The stimulus in the brain is acute.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Beyindeki uyarıcı keskindir.",
            "enSentence": "The stimulus in the brain is acute.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex2_q12",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Felsefe"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
            "type": "multiple-choice",
            "prompt": "\"The decree from the dynasty is historic.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Sinemadaki montaj moderndir.", "Bütçedeki açık kritiktir.", "Doktrinler arasındaki çatışma felsefidir.", "Hanedandan çıkan ferman tarihseldir."],
            "correctIndex": 3,
            "enSentence": "The decree from the dynasty is historic.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex3_q3",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Sinema"],
            "type": "multiple-choice",
            "prompt": "\"The montage in the cinema is modern.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Sinemadaki montaj moderndir.", "Hanedandan çıkan ferman tarihseldir.", "Bütçedeki açık kritiktir.", "Doktrinler arasındaki çatışma felsefidir."],
            "correctIndex": 0,
            "enSentence": "The montage in the cinema is modern.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex3_q4",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "İktisat"],
            "type": "multiple-choice",
            "prompt": "\"The deficit in the budget is critical.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Doktrinler arasındaki çatışma felsefidir.", "Hanedandan çıkan ferman tarihseldir.", "Bütçedeki açık kritiktir.", "Sinemadaki montaj moderndir."],
            "correctIndex": 2,
            "enSentence": "The deficit in the budget is critical.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex3_q5",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Felsefe"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Sinema"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "İktisat"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin:",
            "sentence": "The deficit in the budget is ___.",
            "options": ["critical", "critically", "criticism", "criticize"],
            "correctIndex": 0,
            "translation": "Bütçedeki açık kritiktir."
          },
          {
            "id": "u1l2_ex3_q9",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Felsefe"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "The conflict ___ doctrines is philosophical.",
            "options": ["between", "from", "on", "in"],
            "correctIndex": 0,
            "translation": "Doktrinler arasındaki çatışma felsefidir."
          },
          {
            "id": "u1l2_ex3_q10",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "İktisat"],
            "type": "multiple-choice",
            "prompt": "\"Bütçedeki açık kritiktir.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["Deficit budget in the is critical.", "The deficit in the budget is critical.", "The budget in deficit is critical.", "The deficit of budget is historic."],
            "correctIndex": 1,
            "enSentence": "The deficit in the budget is critical.",
            "isEngToTr": False
          },
          {
            "id": "u1l2_ex3_q11",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Tarih"],
            "type": "translation-text",
            "prompt": "\"The decree from the dynasty is historic.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Hanedandan çıkan ferman tarihseldir.",
            "enSentence": "The decree from the dynasty is historic.",
            "isEngToTr": True
          },
          {
            "id": "u1l2_ex3_q12",
            "grammarTags": ["İsim ve Edat Yapıları", "İsim + Edat Yapısı", "Sinema"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "İktisat"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "İktisat"],
            "type": "multiple-choice",
            "prompt": "\"the source of capital in the market\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["kültürün toplum üzerindeki etkisi", "piyasadaki sermayenin kaynağı", "arşivdeki eserlerin korunması", "bilişin algıdaki rolü"],
            "correctIndex": 1,
            "enSentence": "the source of capital in the market",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex1_q3",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Sosyoloji"],
            "type": "multiple-choice",
            "prompt": "\"the influence of culture on society\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["kültürün toplum üzerindeki etkisi", "piyasadaki sermayenin kaynağı", "arşivdeki eserlerin korunması", "bilişin algıdaki rolü"],
            "correctIndex": 0,
            "enSentence": "the influence of culture on society",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex1_q4",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Tarih"],
            "type": "multiple-choice",
            "prompt": "\"the preservation of artifacts in the archive\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["bilişin algıdaki rolü", "kültürün toplum üzerindeki etkisi", "arşivdeki eserlerin korunması", "piyasadaki sermayenin kaynağı"],
            "correctIndex": 2,
            "enSentence": "the preservation of artifacts in the archive",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex1_q5",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Psikoloji"],
            "type": "multiple-choice",
            "prompt": "\"the role of cognition in perception\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["bilişin algıdaki rolü", "arşivdeki eserlerin korunması", "piyasadaki sermayenin kaynağı", "kültürün toplum üzerindeki etkisi"],
            "correctIndex": 0,
            "enSentence": "the role of cognition in perception",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex1_q6",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "İktisat"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "the source of capital ___ the market (Tr: piyasadaki sermayenin kaynağı)",
            "options": ["in", "from", "on", "under"],
            "correctIndex": 0,
            "translation": "piyasadaki sermayenin kaynağı"
          },
          {
            "id": "u1l3_ex1_q7",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Sosyoloji"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "the influence of culture ___ society (Tr: kültürün toplum üzerindeki etkisi)",
            "options": ["on", "of", "from", "in"],
            "correctIndex": 0,
            "translation": "kültürün toplum üzerindeki etkisi"
          },
          {
            "id": "u1l3_ex1_q8",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Psikoloji"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "the role of cognition ___ perception (Tr: bilişin algıdaki rolü)",
            "options": ["in", "on", "from", "under"],
            "correctIndex": 0,
            "translation": "bilişin algıdaki rolü"
          },
          {
            "id": "u1l3_ex1_q9",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "İktisat"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Psikoloji"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Sosyoloji"],
            "type": "translation-text",
            "prompt": "\"the influence of culture on society\" ifadesini Türkçe'ye çevirin:",
            "correctSentence": "kültürün toplum üzerindeki etkisi",
            "enSentence": "the influence of culture on society",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex1_q12",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Tarih"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Beşeri Bilimler"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Beşeri Bilimler"],
            "type": "multiple-choice",
            "prompt": "\"The quality of data in the research is high.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Enflasyonun piyasa üzerindeki etkisi güçlüdür.", "Araştırmadaki verilerin kalitesi yüksektir.", "Kütüphanedeki el yazmalarının kökeni kadimdir.", "Mahkemedeki emsalin statüsü yasaldır."],
            "correctIndex": 1,
            "enSentence": "The quality of data in the research is high.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex2_q3",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Tarih"],
            "type": "multiple-choice",
            "prompt": "\"The origin of manuscripts in the library is ancient.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Araştırmadaki verilerin kalitesi yüksektir.", "Kütüphanedeki el yazmalarının kökeni kadimdir.", "Enflasyonun piyasa üzerindeki etkisi güçlüdür.", "Mahkemedeki emsalin statüsü yasaldır."],
            "correctIndex": 1,
            "enSentence": "The origin of manuscripts in the library is ancient.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex2_q4",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "İktisat"],
            "type": "multiple-choice",
            "prompt": "\"The effect of inflation on the market is strong.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Mahkemedeki emsalin statüsü yasaldır.", "Araştırmadaki verilerin kalitesi yüksektir.", "Enflasyonun piyasa üzerindeki etkisi güçlüdür.", "Kütüphanedeki el yazmalarının kökeni kadimdir."],
            "correctIndex": 2,
            "enSentence": "The effect of inflation on the market is strong.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex2_q5",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Hukuk"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Beşeri Bilimler"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Tarih"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "İktisat"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "The effect of inflation ___ the market is strong.",
            "options": ["on", "in", "from", "at"],
            "correctIndex": 0,
            "translation": "Enflasyonun piyasa üzerindeki etkisi güçlüdür."
          },
          {
            "id": "u1l3_ex2_q9",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Hukuk"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin:",
            "sentence": "The status of the precedent in court is ___.",
            "options": ["legal", "legally", "legality", "legalize"],
            "correctIndex": 0,
            "translation": "Mahkemedeki emsalin statüsü yasaldır."
          },
          {
            "id": "u1l3_ex2_q10",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Beşeri Bilimler"],
            "type": "multiple-choice",
            "prompt": "\"Araştırmadaki verilerin kalitesi yüksektir.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["Quality of data the in research is high.", "The quality of data in the research is high.", "The data in quality of research is high.", "The quality of data is high in research."],
            "correctIndex": 1,
            "enSentence": "The quality of data in the research is high.",
            "isEngToTr": False
          },
          {
            "id": "u1l3_ex2_q11",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Tarih"],
            "type": "translation-text",
            "prompt": "\"The origin of manuscripts in the library is ancient.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Kütüphanedeki el yazmalarının kökeni kadimdir.",
            "enSentence": "The origin of manuscripts in the library is ancient.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex2_q12",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "İktisat"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Felsefe"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Felsefe"],
            "type": "multiple-choice",
            "prompt": "\"The history of ethics in philosophy is rich.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Sinemanın kültür üzerindeki etkisi geniştir.", "Psikolojideki travma analizi gereklidir.", "Felsefedeki etik tarihi zengindir.", "Ekonomideki varlıkların değeri dinamiktir."],
            "correctIndex": 2,
            "enSentence": "The history of ethics in philosophy is rich.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex3_q3",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "İktisat"],
            "type": "multiple-choice",
            "prompt": "\"The value of assets in the economy is dynamic.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Felsefedeki etik tarihi zengindir.", "Ekonomideki varlıkların değeri dinamiktir.", "Sinemanın kültür üzerindeki etkisi geniştir.", "Psikolojideki travma analizi gereklidir."],
            "correctIndex": 1,
            "enSentence": "The value of assets in the economy is dynamic.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex3_q4",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Sinema"],
            "type": "multiple-choice",
            "prompt": "\"The impact of cinema on culture is broad.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Felsefedeki etik tarihi zengindir.", "Psikolojideki travma analizi gereklidir.", "Sinemanın kültür üzerindeki etkisi geniştir.", "Ekonomideki varlıkların değeri dinamiktir."],
            "correctIndex": 2,
            "enSentence": "The impact of cinema on culture is broad.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex3_q5",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Psikoloji"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Felsefe"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "İktisat"],
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
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Sinema"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun edatı seçin:",
            "sentence": "The impact of cinema ___ culture is broad.",
            "options": ["on", "of", "from", "at"],
            "correctIndex": 0,
            "translation": "Sinemanın kültür üzerindeki etkisi geniştir."
          },
          {
            "id": "u1l3_ex3_q9",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Psikoloji"],
            "type": "fill-blank-dropdown",
            "prompt": "Boşluğa gelecek en uygun kelimeyi seçin:",
            "sentence": "The analysis of trauma in psychology is ___.",
            "options": ["essential", "essentially", "essence", "essentialism"],
            "correctIndex": 0,
            "translation": "Psikolojideki travma analizi gereklidir."
          },
          {
            "id": "u1l3_ex3_q10",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Felsefe"],
            "type": "multiple-choice",
            "prompt": "\"Felsefedeki etik tarihi zengindir.\" cümlesinin İngilizce karşılığı hangisidir?",
            "options": ["History of ethics philosophy in is rich.", "The history of ethics in philosophy is rich.", "The ethics of history in philosophy is rich.", "The history in philosophy of ethics is rich."],
            "correctIndex": 1,
            "enSentence": "The history of ethics in philosophy is rich.",
            "isEngToTr": False
          },
          {
            "id": "u1l3_ex3_q11",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "İktisat"],
            "type": "translation-text",
            "prompt": "\"The value of assets in the economy is dynamic.\" cümlesini Türkçe'ye çevirin:",
            "correctSentence": "Ekonomideki varlıkların değeri dinamiktir.",
            "enSentence": "The value of assets in the economy is dynamic.",
            "isEngToTr": True
          },
          {
            "id": "u1l3_ex3_q12",
            "grammarTags": ["İsim ve Edat Yapıları", "Zincirleme Edat Yapıları", "Sinema"],
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
            "options": ["anayasaya odaklanmak", "piyasaya bağlı olmak", "travmayla sonuçlanmak", "kültüre katkıda bulunmak"],
            "correctIndex": 0,
            "enSentence": "focus on the constitution",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex1_q3",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "İktisat", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"depend on the market\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["anayasaya odaklanmak", "travmayla sonuçlanmak", "kültüre katkıda bulunmak", "piyasaya bağlı olmak"],
            "correctIndex": 3,
            "enSentence": "depend on the market",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex1_q4",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Psikoloji", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"result in trauma\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["kültüre katkıda bulunmak", "travmayla sonuçlanmak", "anayasaya odaklanmak", "piyasaya bağlı olmak"],
            "correctIndex": 1,
            "enSentence": "result in trauma",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex1_q5",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Sosyoloji", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"contribute to culture\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["kültüre katkıda bulunmak", "travmayla sonuçlanmak", "piyasaya bağlı olmak", "anayasaya odaklanmak"],
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
            "options": ["Sinema kültüre katkıda bulunur.", "Çatışma travmayla sonuçlanır.", "Varlık piyasaya bağlıdır.", "Analiz anayasaya odaklanır."],
            "correctIndex": 3,
            "enSentence": "The analysis focuses on the constitution.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex2_q3",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "İktisat", "Aşama 2: Cümle Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"The asset depends on the market.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Analiz anayasaya odaklanır.", "Çatışma travmayla sonuçlanır.", "Varlık piyasaya bağlıdır.", "Sinema kültüre katkıda bulunur."],
            "correctIndex": 2,
            "enSentence": "The asset depends on the market.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex2_q4",
            "grammarTags": ["Fiil ve Edat Takımları", "Fiil + Edat Yapısı", "Psikoloji", "Aşama 2: Cümle Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"The conflict results in trauma.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Çatışma travmayla sonuçlanır.", "Analiz anayasaya odaklanır.", "Varlık piyasaya bağlıdır.", "Sinema kültüre katkıda bulunur."],
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
            "options": ["Contributes cinema to culture.", "Cinema contributes to culture.", "Cinema culture to contributes.", "Cinema is contribute to culture."],
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
        "description": "Önceki konularla harmanlanmış geniş zamanlı akademik cümleler (12 Soru)",
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
            "options": ["Filmin anlatısı etik ile ilişkilidir.", "Sermayenin büyümesi ekonomiye katkı sağlar.", "Hanedanın fermanı değişime yol açar.", "Mahkemenin hükmü emsale dayanır."],
            "correctIndex": 3,
            "enSentence": "The verdict of the court relies on the precedent.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex3_q3",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Tarih", "Aşama 3: Akademik"],
            "type": "multiple-choice",
            "prompt": "\"The decree from the dynasty leads to change.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Hanedanın fermanı değişime yol açar.", "Mahkemenin hükmü emsale dayanır.", "Sermayenin büyümesi ekonomiye katkı sağlar.", "Filmin anlatısı etik ile ilişkilidir."],
            "correctIndex": 0,
            "enSentence": "The decree from the dynasty leads to change.",
            "isEngToTr": True
          },
          {
            "id": "u2l1_ex3_q4",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "İktisat", "Aşama 3: Akademik"],
            "type": "multiple-choice",
            "prompt": "\"The growth of capital contributes to the economy.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Filmin anlatısı etik ile ilişkilidir.", "Mahkemenin hükmü emsale dayanır.", "Sermayenin büyümesi ekonomiye katkı sağlar.", "Hanedanın fermanı değişime yol açar."],
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
            "options": ["The decree from the dynasty leads to change.", "Dynasty leads from the decree to change.", "The decree of dynasty relies on change.", "Leads to change the decree."],
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
            "options": ["yasal etik bağlamında", "kültürün etkisi altında", "sinemanın tarihine göre", "piyasanın dengesi için"],
            "correctIndex": 0,
            "enSentence": "in the context of legal ethics",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex1_q3",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Sosyoloji", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"under the influence of culture\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["yasal etik bağlamında", "sinemanın tarihine göre", "piyasanın dengesi için", "kültürün etkisi altında"],
            "correctIndex": 3,
            "enSentence": "under the influence of culture",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex1_q4",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Sinema", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"according to the history of cinema\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["piyasanın dengesi için", "sinemanın tarihine göre", "yasal etik bağlamında", "kültürün etkisi altında"],
            "correctIndex": 1,
            "enSentence": "according to the history of cinema",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex1_q5",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "İktisat", "Aşama 1: Öbek Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"for the balance of the market\" ifadesinin Türkçe karşılığı hangisidir?",
            "options": ["piyasanın dengesi için", "yasal etik bağlamında", "kültürün etkisi altında", "sinemanın tarihine göre"],
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
            "options": ["Strateji piyasanın dengesi içindir.", "Film sinemanın tarihine uygundur.", "Anlatı kültürün etkisi altındadır.", "Çalışma yasal etik bağlamındadır."],
            "correctIndex": 3,
            "enSentence": "The study is in the context of legal ethics.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex2_q3",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Sosyoloji", "Aşama 2: Cümle Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"The narrative is under the influence of culture.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Çalışma yasal etik bağlamındadır.", "Film sinemanın tarihine uygundur.", "Anlatı kültürün etkisi altındadır.", "Strateji piyasanın dengesi içindir."],
            "correctIndex": 2,
            "enSentence": "The narrative is under the influence of culture.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex2_q4",
            "grammarTags": ["Fiil ve Edat Takımları", "Edat Takımı + Edat Takımı", "Sinema", "Aşama 2: Cümle Düzeyi"],
            "type": "multiple-choice",
            "prompt": "\"The film is according to the history of cinema.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Film sinemanın tarihine uygundur.", "Çalışma yasal etik bağlamındadır.", "Anlatı kültürün etkisi altındadır.", "Strateji piyasanın dengesi içindir."],
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
            "options": ["History of cinema the film according is to.", "The film is according to the history of cinema.", "The film according is history to cinema of.", "The cinema is according to film history."],
            "correctIndex": 1,
            "enSentence": "The film is according to the history of cinema.",
            "isEngToTr": False
          },
          {
            "id": "u1l2_ex2_q11",
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
            "options": ["Enflasyonun baskısı altında piyasa risk altındadır.", "El yazmasının analizinde arşiv gereklidir.", "Normun yapısında toplum geleneğe dayanır.", "Kanuna göre sözleşme mahkemede geçerlidir."],
            "correctIndex": 3,
            "enSentence": "According to the law, the contract is valid in court.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex3_q3",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "Tarih", "Aşama 3: Akademik"],
            "type": "multiple-choice",
            "prompt": "\"In the analysis of the manuscript, the archive is essential.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["El yazmasının analizinde arşiv gereklidir.", "Kanuna göre sözleşme mahkemede geçerlidir.", "Enflasyonun baskısı altında piyasa risk altındadır.", "Normun yapısında toplum geleneğe dayanır."],
            "correctIndex": 0,
            "enSentence": "In the analysis of the manuscript, the archive is essential.",
            "isEngToTr": True
          },
          {
            "id": "u2l2_ex3_q4",
            "grammarTags": ["Fiil ve Edat Takımları", "Spiralleşme", "İktisat", "Aşama 3: Akademik"],
            "type": "multiple-choice",
            "prompt": "\"Under the pressure of inflation, the market is under risk.\" cümlesinin Türkçe karşılığı hangisidir?",
            "options": ["Normun yapısında toplum geleneğe dayanır.", "Kanuna göre sözleşme mahkemede geçerlidir.", "Enflasyonun baskısı altında piyasa risk altındadır.", "El yazmasının analizinde arşiv gereklidir."],
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
            "options": ["According to the law, the contract is valid in court.", "The contract in court according to law is valid.", "The law according to valid contract in court is.", "Valid contract in court according to the law."],
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
    lines = f.readlines()

u1_line_idx = -1
u2_line_idx = -1
u6_line_idx = -1

for idx, line in enumerate(lines):
    if line.startswith('  "1": {'):
        u1_line_idx = idx
    elif line.startswith('  "2": {') and idx > 31000 and idx < 34000:
        u2_line_idx = idx
    elif line.startswith('  "6": {'):
        u6_line_idx = idx

print(f"Found indices: u1={u1_line_idx}, u2={u2_line_idx}, u6={u6_line_idx}")

u1_str = '  "1": ' + json.dumps(unit1_data, ensure_ascii=False, indent=2) + ',\n'
u2_str = '  "2": ' + json.dumps(unit2_data, ensure_ascii=False, indent=2) + ',\n'
u6_str = '  "6": ' + json.dumps(unit6_data, ensure_ascii=False, indent=2) + ',\n'

if u1_line_idx != -1 and u2_line_idx != -1 and u6_line_idx != -1:
    u3_line_idx = -1
    for idx in range(u2_line_idx, u6_line_idx):
        if lines[idx].startswith('  "3": {'):
            u3_line_idx = idx
            break
            
    u7_line_idx = -1
    for idx in range(u6_line_idx, len(lines)):
        if lines[idx].startswith('  "7": {'):
            u7_line_idx = idx
            break
            
    print(f"u3={u3_line_idx}, u7={u7_line_idx}")

    new_lines = (
        lines[:u1_line_idx] +
        [u1_str] +
        [u2_str] +
        lines[u3_line_idx:u6_line_idx] +
        [u6_str] +
        lines[u7_line_idx:]
    )
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.writelines(new_lines)
    print("Exact line replacement successful!")
else:
    print("Could not find line indices!")
