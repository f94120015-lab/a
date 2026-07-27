import json
import subprocess

unit9_json = {
  "1": {
    "exercises": [
      {
        "id": "u9l23ex1",
        "title": "Alıştırma 1: Yapısal Kalıplar ve Öbekler",
        "description": "Durum, modal ve yardımcı fiil sorularında öbek seviyesinde yapılar (10 Soru)",
        "createdAt": "2026-07-27T00:00:00Z",
        "questions": [
          {
            "id": "u9l23_m1",
            "type": "matching",
            "prompt": "Durum ve modal soru kalıplarını Türkçe karşılıklarıyla eşleştirin.",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "pairs": [
              {"left": "Is the sociological report clear?", "right": "Sosyolojik rapor açık mıdır?"},
              {"left": "Can scholars examine ancient texts?", "right": "Bilginler antik metinleri inceleyebilir mi?"},
              {"left": "Should historians analyze archival sources?", "right": "Tarihçiler arşivsel kaynakları analiz etmeli mi?"},
              {"left": "Was the philosophical concept valid?", "right": "Felsefi kavram geçerli miydi?"}
            ]
          },
          {
            "id": "u9l23_m2",
            "type": "matching",
            "prompt": "Hukuk ve iktisat alanındaki modal ve yardımcı fiil sorularını eşleştirin.",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Kip Ekleri ve Zamanlar"],
            "pairs": [
              {"left": "Must legal authorities protect human rights?", "right": "Yasal yetkililer insan haklarını korumalı mıdır?"},
              {"left": "Could economic policies alter social structures?", "right": "Ekonomik politikalar toplumsal yapıları değiştirebilir miydi?"},
              {"left": "May researchers access legal archives at the conference?", "right": "Araştırmacılar konferansta yasal arşivlere erişebilir mi?"},
              {"left": "Would economists predict market fluctuations?", "right": "Ekonomistler piyasa dalgalanmalarını öngörür müydü?"}
            ]
          },
          {
            "id": "u9l23_q1",
            "type": "multiple-choice",
            "prompt": "\"Can the psychologist evaluate the emotional reactions of patients during therapy?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": [
              "Psikolog, terapi sırasında hastaların duygusal tepkilerini değerlendirebilir mi?",
              "Psikolog, terapi sırasında hastaların duygusal tepkilerini değerlendirmeli midir?",
              "Psikolog, terapi sırasında hastaların duygusal tepkilerini değerlendirecek mi?",
              "Psikolog, terapi sırasında hastaların duygusal tepkilerini değerlendiremez mi?"
            ],
            "correctIndex": 0,
            "enSentence": "Can the psychologist evaluate the emotional reactions of patients during therapy?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q2",
            "type": "fill-blank",
            "prompt": "Boşluğu uygun yardımcı fiille tamamlayın: \"___ the film critic analyze the narrative structure of classical cinema?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": ["Should", "Is", "Are", "Been"],
            "correctIndex": 0,
            "enSentence": "Should the film critic analyze the narrative structure of classical cinema?"
          },
          {
            "id": "u9l23_q3",
            "type": "multiple-choice",
            "prompt": "\"Tarihçiler kadim el yazmalarındaki felsefi mantığı ve fikirleri sorgulamalı mıdır?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": [
              "Should historians question the philosophical logic and ideas in ancient manuscripts?",
              "Can historians question the philosophical logic and ideas in ancient manuscripts?",
              "Were historians questioning the philosophical logic and ideas in ancient manuscripts?",
              "Would historians question the philosophical logic and ideas in ancient manuscripts?"
            ],
            "correctIndex": 0,
            "enSentence": "Should historians question the philosophical logic and ideas in ancient manuscripts?",
            "isEngToTr": False
          },
          {
            "id": "u9l23_q4",
            "type": "fill-blank",
            "prompt": "Cümle başı modal boşluğunu tamamlayın: \"___ sociologists observe the impact of urbanization on social behavior?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "Fiil ve Edat Yapıları", "Saf Modallar"],
            "options": ["Could", "Was", "Has", "Does"],
            "correctIndex": 0,
            "enSentence": "Could sociologists observe the impact of urbanization on social behavior?"
          },
          {
            "id": "u9l23_q5",
            "type": "multiple-choice",
            "prompt": "\"Is the empirical methodology of this psychological study reliable?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Temel Cümle Yapıları"],
            "options": [
              "Bu psikolojik çalışmanın ampirik metodolojisi güvenilir midir?",
              "Bu psikolojik çalışmanın ampirik metodolojisi güvenilir miydi?",
              "Bu psikolojik çalışmanın ampirik metodolojisi güvenilir olmalı mıdır?",
              "Bu psikolojik çalışmanın ampirik metodolojisi güvenilir olabilir mi?"
            ],
            "correctIndex": 0,
            "enSentence": "Is the empirical methodology of this psychological study reliable?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q6",
            "type": "fill-blank",
            "prompt": "Durum sorusu yardımcı fiilini seçin: \"___ the historical evidence sufficient for a definitive legal judgment?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Temel Cümle Yapıları"],
            "options": ["Was", "Do", "Have", "Can"],
            "correctIndex": 0,
            "enSentence": "Was the historical evidence sufficient for a definitive legal judgment?"
          },
          {
            "id": "u9l23_q7",
            "type": "translation-text",
            "prompt": "\"May the author attend the academic conference to evaluate the primary sources of the research project?\" cümlesini Türkçe'ye çevirin:",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "correctSentence": "Yazar araştırma projesinin birincil kaynaklarını değerlendirmek için akademik konferansa katılabilir mi?",
            "enSentence": "May the author attend the academic conference to evaluate the primary sources of the research project?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q8",
            "type": "translation-text",
            "prompt": "\"Ekonomistler merkez bankasının yeni parasal politikasını alanda (field) tartışabilir mi?\" cümlesini İngilizce'ye çevirin:",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "correctSentence": "Can economists discuss the new monetary policy of the central bank in the field?",
            "enSentence": "Can economists discuss the new monetary policy of the central bank in the field?",
            "isEngToTr": False
          }
        ]
      },
      {
        "id": "u9l23ex2",
        "title": "Alıştırma 2: Yalın Cümleler",
        "description": "Durum, modal ve yardımcı fiil sorularında yalın cümle düzeyinde yapılar (10 Soru)",
        "createdAt": "2026-07-27T00:00:00Z",
        "questions": [
          {
            "id": "u9l23_ex2_m1",
            "type": "matching",
            "prompt": "Yalın cümle modal sorularını Türkçe karşılıklarıyla eşleştirin.",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "pairs": [
              {"left": "Has the scholar deciphered the inscription in the hall?", "right": "Bilgin salondaki yazıtı çözdü mü?"},
              {"left": "Must legal scholars respect historical precedent and law?", "right": "Hukuk bilginleri tarihsel emsale ve yasaya saygı duymalı mıdır?"},
              {"left": "Were sociologists analyzing economic data during the meeting?", "right": "Sosyologlar toplantı sırasında ekonomik verileri analiz ediyor muydu?"},
              {"left": "Can cinematic techniques convey psychological states of fear?", "right": "Sinematik teknikler korkunun psikolojik durumlarını aktarabilir mi?"}
            ]
          },
          {
            "id": "u9l23_q9",
            "type": "multiple-choice",
            "prompt": "\"Would the philosopher accept the basic premise of modern ethics and argument in his book?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": [
              "Filozof kitabında modern etiğin temel önermesini ve argümanını kabul eder miydi?",
              "Filozof kitabında modern etiğin temel önermesini ve argümanını kabul etmeli midir?",
              "Filozof kitabında modern etiğin temel önermesini ve argümanını kabul edebildi mi?",
              "Filozof kitabında modern etiğin temel önermesini ve argümanını kabul ediyor mu?"
            ],
            "correctIndex": 0,
            "enSentence": "Would the philosopher accept the basic premise of modern ethics and argument in his book?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q10",
            "type": "fill-blank",
            "prompt": "Boşluğu tamamlayın: \"___ the court review the archival documents in the hall before the final decision?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": ["Should", "Is", "Were", "Are"],
            "correctIndex": 0,
            "enSentence": "Should the court review the archival documents in the hall before the final decision?"
          },
          {
            "id": "u9l23_q11",
            "type": "multiple-choice",
            "prompt": "\"Araştırmacılar kütüphanedeki nadir el yazmalarını ve kitapları koruyabilir mi?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": [
              "Can researchers protect the rare manuscripts and books in the library?",
              "Should researchers protect the rare manuscripts and books in the library?",
              "Were researchers protecting the rare manuscripts and books in the library?",
              "Must researchers protect the rare manuscripts and books in the library?"
            ],
            "correctIndex": 0,
            "enSentence": "Can researchers protect the rare manuscripts and books in the library?",
            "isEngToTr": False
          },
          {
            "id": "u9l23_q12",
            "type": "fill-blank",
            "prompt": "Soru kalıbını doldurun: \"___ the director depict social conflicts and prejudice in his new film?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": ["Might", "Was", "Has", "Been"],
            "correctIndex": 0,
            "enSentence": "Might the director depict social conflicts and prejudice in his new film?"
          },
          {
            "id": "u9l23_q13",
            "type": "multiple-choice",
            "prompt": "\"Have economists gathered sufficient empirical data for the research project?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Kip Ekleri ve Zamanlar"],
            "options": [
              "Ekonomistler araştırma projesi için yeterli ampirik veri topladı mı?",
              "Ekonomistler araştırma projesi için yeterli ampirik veri toplayacak mı?",
              "Ekonomistler araştırma projesi için yeterli ampirik veri toplamalı mıdır?",
              "Ekonomistler araştırma projesi için yeterli ampirik veri topluyor muydu?"
            ],
            "correctIndex": 0,
            "enSentence": "Have economists gathered sufficient empirical data for the research project?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q14",
            "type": "fill-blank",
            "prompt": "Doğru modalı seçin: \"___ historians disregard the cultural context of ancient ruins, artifacts, and discovery?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": ["Should", "Are", "Were", "Is"],
            "correctIndex": 0,
            "enSentence": "Should historians disregard the cultural context of ancient ruins, artifacts, and discovery?"
          },
          {
            "id": "u9l23_q15",
            "type": "multiple-choice",
            "prompt": "\"Sosyo-ekonomik faktörler topluluktaki bireysel davranışları ve fikirleri etkileyebilir mi?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": [
              "Can socio-economic factors influence individual behavior and ideas in the community?",
              "Must socio-economic factors influence individual behavior and ideas in the community?",
              "Were socio-economic factors influencing individual behavior and ideas in the community?",
              "Should socio-economic factors influence individual behavior and ideas in the community?"
            ],
            "correctIndex": 0,
            "enSentence": "Can socio-economic factors influence individual behavior and ideas in the community?",
            "isEngToTr": False
          },
          {
            "id": "u9l23_q16",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Could the doctor identify the primary causes of anxiety in patients?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "translation": "Could the doctor identify the primary causes of anxiety in patients?",
            "words": ["Doktor", "hastalarda", "kaygının", "temel", "nedenlerini", "tespit", "edebildi", "mi", "politikalarını", "hukuk"],
            "correctOrder": ["Doktor", "hastalarda", "kaygının", "temel", "nedenlerini", "tespit", "edebildi", "mi"],
            "enSentence": "Could the doctor identify the primary causes of anxiety in patients?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q17",
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını doğru sırayla oluşturun: \"Filozoflar ahlaki değerlerin ve gerçeğin önemini tartışabilir mi?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "translation": "Filozoflar ahlaki değerlerin ve gerçeğin önemini tartışabilir mi?",
            "words": ["Can", "philosophers", "discuss", "the", "importance", "of", "moral", "values", "and", "truth", "archival"],
            "correctOrder": ["Can", "philosophers", "discuss", "the", "importance", "of", "moral", "values", "and", "truth"],
            "enSentence": "Can philosophers discuss the importance of moral values and truth?",
            "isEngToTr": False
          }
        ]
      },
      {
        "id": "u9l23ex3",
        "title": "Alıştırma 3: İleri Düzey Cümleler",
        "description": "Akademik bağlamda durum ve modal soruları (10 Soru)",
        "createdAt": "2026-07-27T00:00:00Z",
        "questions": [
          {
            "id": "u9l23_ex3_m1",
            "type": "matching",
            "prompt": "İleri düzey akademik soruları Türkçe karşılıklarıyla eşleştirin.",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "pairs": [
              {"left": "Must legal scholars defend constitutional principles during the conference?", "right": "Hukuk bilginleri konferans sırasında anayasal ilkeleri savunmalı mıdır?"},
              {"left": "Could economic fluctuations trigger shifts in political ideology and opinions?", "right": "Ekonomik dalgalanmalar siyasi ideoloji ve fikirlerde kaymalara yol açabilir miydi?"},
              {"left": "Has the sociologist published a detailed study on urban poverty and climate?", "right": "Sosyolog kentsel yoksulluk ve iklim üzerine detaylı bir çalışma yayımladı mı?"},
              {"left": "Can cinematic realism reflect psychological difficulties of human life?", "right": "Sinematik realizm insan yaşamının psikolojik zorluklarını yansıtabilir mi?"}
            ]
          },
          {
            "id": "u9l23_q18",
            "type": "multiple-choice",
            "prompt": "\"Should historians scrutinize the methodological validity of primary sources in archival research?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": [
              "Tarihçiler arşiv araştırmalarında birincil kaynakların metodolojik geçerliliğini titizlikle incelemeli midir?",
              "Tarihçiler arşiv araştırmalarında birincil kaynakların metodolojik geçerliliğini titizlikle inceleyebilir mi?",
              "Tarihçiler arşiv araştırmalarında birincil kaynakların metodolojik geçerliliğini titizlikle inceledi mi?",
              "Tarihçiler arşiv araştırmalarında birincil kaynakların metodolojik geçerliliğini titizlikle inceleyecek mi?"
            ],
            "correctIndex": 0,
            "enSentence": "Should historians scrutinize the methodological validity of primary sources in archival research?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q19",
            "type": "fill-blank",
            "prompt": "Boşluğa gelecek uygun modalı seçin: \"___ the ethics committee evaluate the long-term societal consequences of scientific experiments in the institute?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": ["Must", "Is", "Were", "Are"],
            "correctIndex": 0,
            "enSentence": "Must the ethics committee evaluate the long-term societal consequences of scientific experiments in the institute?"
          },
          {
            "id": "u9l23_q20",
            "type": "multiple-choice",
            "prompt": "\"Psikologlar deneysel çalışmalar sırasında gözlemlenen davranışsal anomalileri ve korkuları açıklayabilir mi?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": [
              "Can psychologists explain the behavioral anomalies and fears observed during experimental studies?",
              "Should psychologists explain the behavioral anomalies and fears observed during experimental studies?",
              "Must psychologists explain the behavioral anomalies and fears observed during experimental studies?",
              "Were psychologists explaining the behavioral anomalies and fears observed during experimental studies?"
            ],
            "correctIndex": 0,
            "enSentence": "Can psychologists explain the behavioral anomalies and fears observed during experimental studies?",
            "isEngToTr": False
          },
          {
            "id": "u9l23_q21",
            "type": "fill-blank",
            "prompt": "Yardımcı fiili tamamlayın: \"___ the constitutional court nullify legal acts that violate fundamental human rights and opinions?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": ["Can", "Was", "Has", "Been"],
            "correctIndex": 0,
            "enSentence": "Can the constitutional court nullify legal acts that violate fundamental human rights and opinions?"
          },
          {
            "id": "u9l23_q22",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Could the film director integrate historical facts with cinematic storytelling in his work?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "translation": "Could the film director integrate historical facts with cinematic storytelling in his work?",
            "words": ["Film", "yönetmeni", "eserinde", "tarihsel", "gerçekleri", "sinematik", "anlatı", "ile", "bütünleştirebildi", "mi", "hukuk"],
            "correctOrder": ["Film", "yönetmeni", "eserinde", "tarihsel", "gerçekleri", "sinematik", "anlatı", "ile", "bütünleştirebildi", "mi"],
            "enSentence": "Could the film director integrate historical facts with cinematic storytelling in his work?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q23",
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını doğru sırayla oluşturun: \"Ekonomistler küresel pazarın yapısındaki kırılganlıkları ve riskleri tahmin edebilir miydi?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "translation": "Ekonomistler küresel pazarın yapısındaki kırılganlıkları ve riskleri tahmin edebilir miydi?",
            "words": ["Could", "economists", "predict", "the", "vulnerabilities", "and", "risks", "in", "the", "structure", "of", "the", "global", "market"],
            "correctOrder": ["Could", "economists", "predict", "the", "vulnerabilities", "and", "risks", "in", "the", "structure", "of", "the", "global", "market"],
            "enSentence": "Could economists predict the vulnerabilities and risks in the structure of the global market?",
            "isEngToTr": False
          },
          {
            "id": "u9l23_q24",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Have sociologists gathered empirical evidence regarding social mobility in urban research?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Kip Ekleri ve Zamanlar"],
            "translation": "Have sociologists gathered empirical evidence regarding social mobility in urban research?",
            "words": ["Sosyologlar", "kentsel", "araştırmada", "toplumsal", "hareketliliğe", "ilişkin", "ampirik", "kanıt", "topladı", "mı", "metodoloji"],
            "correctOrder": ["Sosyologlar", "kentsel", "araştırmada", "toplumsal", "hareketliliğe", "ilişkin", "ampirik", "kanıt", "topladı", "mı"],
            "enSentence": "Have sociologists gathered empirical evidence regarding social mobility in urban research?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q25",
            "type": "translation-text",
            "prompt": "\"Would the philosopher challenge traditional metaphysical concepts through modern logic and ideas?\" cümlesini Türkçe'ye çevirin:",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "correctSentence": "Filozof geleneksel metafizik kavramlara modern mantık ve fikirler aracılığıyla meydan okur muydu?",
            "enSentence": "Would the philosopher challenge traditional metaphysical concepts through modern logic and ideas?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q26",
            "type": "translation-text",
            "prompt": "\"Tarihçiler imparatorluğun çöküşü sırasındaki arşivsel belgeleri ve mektupları incelemeli midir?\" cümlesini İngilizce'ye çevirin:",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "correctSentence": "Should historians examine the archival documents and letters during the collapse of the empire?",
            "enSentence": "Should historians examine the archival documents and letters during the collapse of the empire?",
            "isEngToTr": False
          }
        ]
      }
    ]
  },
  "2": {
    "exercises": [
      {
        "id": "u9l24ex1",
        "title": "Alıştırma 1: Yapısal Kalıplar ve Öbekler",
        "description": "Eylem ve yardımcı fiil (Do/Does/Did) sorularında öbek seviyesinde yapılar (10 Soru)",
        "createdAt": "2026-07-27T00:00:00Z",
        "questions": [
          {
            "id": "u9l24_m1",
            "type": "matching",
            "prompt": "Eylem sorularını Türkçe karşılıklarıyla eşleştirin.",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "SVO Yapısı"],
            "pairs": [
              {"left": "Does the legal system protect civil rights in society?", "right": "Hukuk sistemi toplumda sivil hakları korur mu?"},
              {"left": "Did the historian find the manuscript in the library?", "right": "Tarihçi kütüphanede el yazmasını buldu mu?"},
              {"left": "Do sociologists study group behavior in urban areas?", "right": "Sosyologlar kentsel alanlarda grup davranışını inceler mi?"},
              {"left": "Did the director film the scene with great care?", "right": "Yönetmen sahneyi büyük bir özenle çekti mi?"}
            ]
          },
          {
            "id": "u9l24_m2",
            "type": "matching",
            "prompt": "Ekonomi ve psikoloji alanındaki eylem sorularını eşleştirin.",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "Fiil ve Edat Yapıları", "SVO Yapısı"],
            "pairs": [
              {"left": "Does inflation affect consumer confidence and decisions?", "right": "Enflasyon tüketici güvenini ve kararlarını etkiler mi?"},
              {"left": "Did the psychologist observe the patient during therapy?", "right": "Psikolog terapi sırasında hastayı gözlemledi mi?"},
              {"left": "Do economists analyze market trends and raw data?", "right": "Ekonomistler piyasa eğilimlerini ve ham verileri analiz eder mi?"},
              {"left": "Did the committee publish the research findings in the report?", "right": "Komite raporda araştırma bulgularını yayımladı mı?"}
            ]
          },
          {
            "id": "u9l24_q1",
            "type": "multiple-choice",
            "prompt": "\"Did the archaeologist discover ancient artifacts in the ruins of the temple?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Arkeolog tapınağın harabelerinde antik eserler keşfetti mi?",
              "Arkeolog tapınağın harabelerinde antik eserler keşfedebilir mi?",
              "Arkeolog tapınağın harabelerinde antik eserler keşfetmeli midir?",
              "Arkeolog tapınağın harabelerinde antik eserler keşfedecek mi?"
            ],
            "correctIndex": 0,
            "enSentence": "Did the archaeologist discover ancient artifacts in the ruins of the temple?",
            "isEngToTr": True
          },
          {
            "id": "u9l24_q2",
            "type": "fill-blank",
            "prompt": "Boşluğu uygun yardımcı fiille tamamlayın: \"___ sociologists conduct surveys on social inequality in big cities?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geniş Zaman"],
            "options": ["Do", "Is", "Has", "Was"],
            "correctIndex": 0,
            "enSentence": "Do sociologists conduct surveys on social inequality in big cities?"
          },
          {
            "id": "u9l24_q3",
            "type": "multiple-choice",
            "prompt": "\"Felsefe profesörü ders sırasında felsefi mantık kurallarını açıkladı mı?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Did the philosophy professor explain the rules of philosophical logic during the lecture?",
              "Does the philosophy professor explain the rules of philosophical logic during the lecture?",
              "Is the philosophy professor explaining the rules of philosophical logic during the lecture?",
              "Has the philosophy professor explained the rules of philosophical logic during the lecture?"
            ],
            "correctIndex": 0,
            "enSentence": "Did the philosophy professor explain the rules of philosophical logic during the lecture?",
            "isEngToTr": False
          },
          {
            "id": "u9l24_q4",
            "type": "fill-blank",
            "prompt": "Cümle başı yardımcı fiil boşluğunu doldurun: \"___ the court inspect the new corporate policy in the hearing?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geniş Zaman"],
            "options": ["Does", "Is", "Were", "Are"],
            "correctIndex": 0,
            "enSentence": "Does the court inspect the new corporate policy in the hearing?"
          },
          {
            "id": "u9l24_q5",
            "type": "multiple-choice",
            "prompt": "\"Did the film director deny the psychological conflict and prejudice of the author?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "Fiil ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Film yönetmeni yazarın psikolojik çatışmasını ve önyargısını inkar etti mi?",
              "Film yönetmeni yazarın psikolojik çatışmasını ve önyargısını inkar etmeli midir?",
              "Film yönetmeni yazarın psikolojik çatışmasını ve önyargısını inkar edecek mi?",
              "Film yönetmeni yazarın psikolojik çatışmasını ve önyargısını inkar edebilir mi?"
            ],
            "correctIndex": 0,
            "enSentence": "Did the film director deny the psychological conflict and prejudice of the author?",
            "isEngToTr": True
          },
          {
            "id": "u9l24_q6",
            "type": "fill-blank",
            "prompt": "Geçmiş zaman yardımcı fiilini seçin: \"___ the economic crisis lead to major difficulties across the nation?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "Fiil ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["Did", "Does", "Has", "Was"],
            "correctIndex": 0,
            "enSentence": "Did the economic crisis lead to major difficulties across the nation?"
          },
          {
            "id": "u9l24_q7",
            "type": "translation-text",
            "prompt": "\"Does the researcher rely on primary documents in the archive?\" cümlesini Türkçe'ye çevirin:",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "Fiil ve Edat Yapıları", "Geniş Zaman"],
            "correctSentence": "Araştırmacı arşivdeki birincil belgelere dayanıyor mu?",
            "enSentence": "Does the researcher rely on primary documents in the archive?",
            "isEngToTr": True
          },
          {
            "id": "u9l24_q8",
            "type": "translation-text",
            "prompt": "\"Tarihçiler antik medeniyetlerin kültürel mirasını ve eserlerini belgeledi mi?\" cümlesini İngilizce'ye çevirin:",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "correctSentence": "Did historians document the cultural heritage and artifacts of ancient civilizations?",
            "enSentence": "Did historians document the cultural heritage and artifacts of ancient civilizations?",
            "isEngToTr": False
          }
        ]
      },
      {
        "id": "u9l24ex2",
        "title": "Alıştırma 2: Yalın Cümleler",
        "description": "Eylem ve var/yok sorularında yalın cümle düzeyinde yapılar (10 Soru)",
        "createdAt": "2026-07-27T00:00:00Z",
        "questions": [
          {
            "id": "u9l24_ex2_m1",
            "type": "matching",
            "prompt": "Var/Yok (There is/are) ve eylem soru kalıplarını eşleştirin.",
            "grammarTags": ["Soru Yapıları", "Var / Yok İfadeleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
            "pairs": [
              {"left": "Is there a conflict between legal rights and morality?", "right": "Yasal haklar ile ahlak arasında bir çatışma var mıdır?"},
              {"left": "Are there historical documents in the university library?", "right": "Üniversite kütüphanesinde tarihsel belgeler var mıdır?"},
              {"left": "Was there an economic decline in the ancient empire?", "right": "Antik imparatorlukta ekonomik bir gerileme var mıydı?"},
              {"left": "Were there sociologists present at the international conference?", "right": "Uluslararası konferansta hazır bulunan sosyologlar var mıydı?"}
            ]
          },
          {
            "id": "u9l24_q9",
            "type": "multiple-choice",
            "prompt": "\"Do ethicists object to dangerous scientific experiments on human subjects?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "Fiil ve Edat Yapıları", "Geniş Zaman"],
            "options": [
              "Etikçiler insan denekler üzerindeki tehlikeli bilimsel deneylere karşı çıkar mı?",
              "Etikçiler insan denekler üzerindeki tehlikeli bilimsel deneylere karşı çıkmalı mıdır?",
              "Etikçiler insan denekler üzerindeki tehlikeli bilimsel deneylere karşı çıktı mı?",
              "Etikçiler insan denekler üzerindeki tehlikeli bilimsel deneylere karşı çıkacak mı?"
            ],
            "correctIndex": 0,
            "enSentence": "Do ethicists object to dangerous scientific experiments on human subjects?",
            "isEngToTr": True
          },
          {
            "id": "u9l24_q10",
            "type": "fill-blank",
            "prompt": "Var/Yok yapısı soru kelimesini seçin: \"___ there any significant difference between the two sociological models?\"",
            "grammarTags": ["Soru Yapıları", "Var / Yok İfadeleri", "İsim Tamlamaları", "Temel Cümle Yapıları"],
            "options": ["Is", "Do", "Does", "Did"],
            "correctIndex": 0,
            "enSentence": "Is there any significant difference between the two sociological models?"
          },
          {
            "id": "u9l24_q11",
            "type": "multiple-choice",
            "prompt": "\"Arkeologlar kazı alanında antik bir yazıt ve kalıntı buldu mu?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Did archaeologists find an ancient inscription and ruins at the excavation site?",
              "Do archaeologists find an ancient inscription and ruins at the excavation site?",
              "Are archaeologists finding an ancient inscription and ruins at the excavation site?",
              "Have archaeologists found an ancient inscription and ruins at the excavation site?"
            ],
            "correctIndex": 0,
            "enSentence": "Did archaeologists find an ancient inscription and ruins at the excavation site?",
            "isEngToTr": False
          },
          {
            "id": "u9l24_q12",
            "type": "fill-blank",
            "prompt": "Boşluğu tamamlayın: \"___ the board of directors approve the new budget for the cinema project?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["Did", "Is", "Were", "Are"],
            "correctIndex": 0,
            "enSentence": "Did the board of directors approve the new budget for the cinema project?"
          },
          {
            "id": "u9l24_q13",
            "type": "multiple-choice",
            "prompt": "\"Was there any consensus among historians regarding the origin of the treaty?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "Var / Yok İfadeleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
            "options": [
              "Tarihçiler arasında antlaşmanın kökenine ilişkin herhangi bir uzlaşı var mıydı?",
              "Tarihçiler arasında antlaşmanın kökenine ilişkin herhangi bir uzlaşı var mıdır?",
              "Tarihçiler arasında antlaşmanın kökenine ilişkin herhangi bir uzlaşı olacak mı?",
              "Tarihçiler arasında antlaşmanın kökenine ilişkin herhangi bir uzlaşı olabilir mi?"
            ],
            "correctIndex": 0,
            "enSentence": "Was there any consensus among historians regarding the origin of the treaty?",
            "isEngToTr": True
          },
          {
            "id": "u9l24_q14",
            "type": "fill-blank",
            "prompt": "Yardımcı fiili tamamlayın: \"___ economic instability trigger political unrest in developing nations?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "SVO Yapısı", "Geniş Zaman"],
            "options": ["Does", "Is", "Has", "Was"],
            "correctIndex": 0,
            "enSentence": "Does economic instability trigger political unrest in developing nations?"
          },
          {
            "id": "u9l24_q15",
            "type": "multiple-choice",
            "prompt": "\"Psikolog hastanın çocukluk anılarını ve davranışlarını analiz etti mi?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Did the psychologist analyze the childhood memories and behavior of the patient?",
              "Does the psychologist analyze the childhood memories and behavior of the patient?",
              "Is the psychologist analyzing the childhood memories and behavior of the patient?",
              "Has the psychologist analyzed the childhood memories and behavior of the patient?"
            ],
            "correctIndex": 0,
            "enSentence": "Did the psychologist analyze the childhood memories and behavior of the patient?",
            "isEngToTr": False
          },
          {
            "id": "u9l24_q16",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Did the research team gather statistical data from local communities?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "Did the research team gather statistical data from local communities?",
            "words": ["Araştırma", "ekibi", "yerel", "topluluklardan", "istatistiksel", "veri", "topladı", "mı", "hukuk", "yasa"],
            "correctOrder": ["Araştırma", "ekibi", "yerel", "topluluklardan", "istatistiksel", "veri", "topladı", "mı"],
            "enSentence": "Did the research team gather statistical data from local communities?",
            "isEngToTr": True
          },
          {
            "id": "u9l24_q17",
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını doğru sırayla oluşturun: \"Mahkeme tarihi belgedeki imzayı inceledi mi?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "Mahkeme tarihi belgedeki imzayı inceledi mi?",
            "words": ["Did", "the", "court", "examine", "the", "signature", "on", "the", "historical", "document", "sociology"],
            "correctOrder": ["Did", "the", "court", "examine", "the", "signature", "on", "the", "historical", "document"],
            "enSentence": "Did the court examine the signature on the historical document?",
            "isEngToTr": False
          }
        ]
      },
      {
        "id": "u9l24ex3",
        "title": "Alıştırma 3: İleri Düzey Cümleler",
        "description": "Akademik bağlamda eylem ve var/yok soruları (10 Soru)",
        "createdAt": "2026-07-27T00:00:00Z",
        "questions": [
          {
            "id": "u9l24_ex3_m1",
            "type": "matching",
            "prompt": "İleri düzey akademik eylem ve var/yok sorularını eşleştirin.",
            "grammarTags": ["Soru Yapıları", "Var / Yok İfadeleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
            "pairs": [
              {"left": "Is there strong empirical evidence supporting the new economic model?", "right": "Yeni ekonomik modeli destekleyen güçlü ampirik kanıt var mıdır?"},
              {"left": "Did constitutional scholars debate the limits of executive power during the meeting?", "right": "Anayasa bilginleri toplantı sırasında yürütme gücünün sınırlarını tartıştılar mı?"},
              {"left": "Do sociologists link urbanization to changes in family structure?", "right": "Sosyologlar kentleşmeyi aile yapısındaki değişimlere bağlar mı?"},
              {"left": "Were there substantial difficulties in deciphering the ancient manuscript?", "right": "Antik el yazmasını çözmede önemli zorluklar var mıydı?"}
            ]
          },
          {
            "id": "u9l24_q18",
            "type": "multiple-choice",
            "prompt": "\"Did the supreme court invalidate the controversial tax legislation after prolonged public debate?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Anayasa Mahkemesi uzun süren kamuoyu tartışmasının ardından tartışmalı vergi mevzuatını geçersiz kıldı mı?",
              "Anayasa Mahkemesi uzun süren kamuoyu tartışmasının ardından tartışmalı vergi mevzuatını geçersiz kılabilir mi?",
              "Anayasa Mahkemesi uzun süren kamuoyu tartışmasının ardından tartışmalı vergi mevzuatını geçersiz kılmalı mıdır?",
              "Anayasa Mahkemesi uzun süren kamuoyu tartışmasının ardından tartışmalı vergi mevzuatını geçersiz kılacak mı?"
            ],
            "correctIndex": 0,
            "enSentence": "Did the supreme court invalidate the controversial tax legislation after prolonged public debate?",
            "isEngToTr": True
          },
          {
            "id": "u9l24_q19",
            "type": "fill-blank",
            "prompt": "Boşluğu doldurun: \"___ there any inherent biases in the methodology of the sociological survey?\"",
            "grammarTags": ["Soru Yapıları", "Var / Yok İfadeleri", "İsim Tamlamaları", "Temel Cümle Yapıları"],
            "options": ["Are", "Do", "Does", "Did"],
            "correctIndex": 0,
            "enSentence": "Are there any inherent biases in the methodology of the sociological survey?"
          },
          {
            "id": "u9l24_q20",
            "type": "multiple-choice",
            "prompt": "\"Tarihçiler arşivdeki belgelerin ve raporların doğruluğunu teyit etti mi?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Did historians confirm the authenticity of the documents and reports in the archive?",
              "Do historians confirm the authenticity of the documents and reports in the archive?",
              "Are historians confirming the authenticity of the documents and reports in the archive?",
              "Have historians confirmed the authenticity of the documents and reports in the archive?"
            ],
            "correctIndex": 0,
            "enSentence": "Did historians confirm the authenticity of the documents and reports in the archive?",
            "isEngToTr": False
          },
          {
            "id": "u9l24_q21",
            "type": "fill-blank",
            "prompt": "Geçmiş zaman yardımcı fiili seçin: \"___ the psychological experiment demonstrate a clear link between stress and cognitive performance in patients?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "Fiil ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["Did", "Does", "Has", "Was"],
            "correctIndex": 0,
            "enSentence": "Did the psychological experiment demonstrate a clear link between stress and cognitive performance in patients?"
          },
          {
            "id": "u9l24_q22",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Does the new film reflect the ideological movement of twentieth-century cinema?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geniş Zaman"],
            "translation": "Does the new film reflect the ideological movement of twentieth-century cinema?",
            "words": ["Yeni", "film", "yirminci", "yüzyıl", "sinemasının", "ideolojik", "akımını", "yansıtır", "mı", "psikoloji", "kanun"],
            "correctOrder": ["Yeni", "film", "yirminci", "yüzyıl", "sinemasının", "ideolojik", "akımını", "yansıtır", "mı"],
            "enSentence": "Does the new film reflect the ideological movement of twentieth-century cinema?",
            "isEngToTr": True
          },
          {
            "id": "u9l24_q23",
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını doğru sırayla oluşturun: \"Sosyologlar kentleşme ile suç oranları arasındaki ilişkiyi araştırdı mı?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "Fiil ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "Sosyologlar kentleşme ile suç oranları arasındaki ilişkiyi araştırdı mı?",
            "words": ["Did", "sociologists", "investigate", "the", "relationship", "between", "urbanization", "and", "crime", "rates", "ethics"],
            "correctOrder": ["Did", "sociologists", "investigate", "the", "relationship", "between", "urbanization", "and", "crime", "rates"],
            "enSentence": "Did sociologists investigate the relationship between urbanization and crime rates?",
            "isEngToTr": False
          },
          {
            "id": "u9l24_q24",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Was there any direct connection between economic policy and social reform in history?\"",
            "grammarTags": ["Soru Yapıları", "Var / Yok İfadeleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
            "translation": "Was there any direct connection between economic policy and social reform in history?",
            "words": ["Tarihte", "ekonomik", "politika", "ile", "sosyal", "reform", "arasında", "doğrudan", "bir", "bağlantı", "var", "mıydı"],
            "correctOrder": ["Tarihte", "ekonomik", "politika", "ile", "sosyal", "reform", "arasında", "doğrudan", "bir", "bağlantı", "var", "mıydı"],
            "enSentence": "Was there any direct connection between economic policy and social reform in history?",
            "isEngToTr": True
          },
          {
            "id": "u9l24_q25",
            "type": "translation-text",
            "prompt": "\"Did the committee publish the final research report on climate change and economics?\" cümlesini Türkçe'ye çevirin:",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "correctSentence": "Komite iklim değişikliği ve ekonomi üzerine nihai araştırma raporunu yayımladı mı?",
            "enSentence": "Did the committee publish the final research report on climate change and economics?",
            "isEngToTr": True
          },
          {
            "id": "u9l24_q26",
            "type": "translation-text",
            "prompt": "\"Filozoflar ahlak ile hukuk arasındaki ayrımı ve gerçeği açıkça tanımladı mı?\" cümlesini İngilizce'ye çevirin:",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "correctSentence": "Did philosophers clearly define the distinction between morality and law and the truth?",
            "enSentence": "Did philosophers clearly define the distinction between morality and law and the truth?",
            "isEngToTr": False
          }
        ]
      }
    ]
  },
  "3": {
    "exercises": [
      {
        "id": "u9l25ex1",
        "title": "Alıştırma 1: Yapısal Kalıplar ve Öbekler",
        "description": "Soru kelimeli (Wh-) sorularda öbek seviyesinde yapılar (10 Soru)",
        "createdAt": "2026-07-27T00:00:00Z",
        "questions": [
          {
            "id": "u9l25_m1",
            "type": "matching",
            "prompt": "Soru kelimeli soru kalıplarını Türkçe karşılıklarıyla eşleştirin.",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "SVO Yapısı"],
            "pairs": [
              {"left": "Why did the philosopher write the text in his book?", "right": "Filozof kitabındaki metni neden yazdı?"},
              {"left": "Where is the historical archive located in the hall?", "right": "Tarihi arşiv salonda nerede yer almaktadır?"},
              {"left": "What caused the severe economic crisis and panic?", "right": "Şiddetli ekonomik krize ve paniğe ne sebep oldu?"},
              {"left": "Who analyzed the psychological data of patients?", "right": "Hastaların psikolojik verilerini kim analiz etti?"}
            ]
          },
          {
            "id": "u9l25_m2",
            "type": "matching",
            "prompt": "Sosyoloji ve hukuk alanındaki Wh- soru kalıplarını eşleştirin.",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "SVO Yapısı"],
            "pairs": [
              {"left": "When did parliament pass the new corporate law?", "right": "Parlamento yeni şirketler yasasını ne zaman çıkardı?"},
              {"left": "How do sociologists measure urban poverty and difficulties?", "right": "Sosyologlar kentsel yoksulluğu ve zorlukları nasıl ölçer?"},
              {"left": "Which method is suitable for scientific research?", "right": "Bilimsel araştırma için hangi yöntem uygundur?"},
              {"left": "Whose theory explains social change and behavior?", "right": "Toplumsal değişimi ve davranışı kimin teorisi açıklar?"}
            ]
          },
          {
            "id": "u9l25_q1",
            "type": "multiple-choice",
            "prompt": "\"Why did the director choose a realistic style in the film project?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Yönetmen film projesinde neden gerçekçi bir tarz seçti?",
              "Yönetmen film projesinde neden gerçekçi bir tarz seçebilir?",
              "Yönetmen film projesinde neden gerçekçi bir tarz seçmelidir?",
              "Yönetmen film projesinde neden gerçekçi bir tarz seçecek?"
            ],
            "correctIndex": 0,
            "enSentence": "Why did the director choose a realistic style in the film project?",
            "isEngToTr": True
          },
          {
            "id": "u9l25_q2",
            "type": "fill-blank",
            "prompt": "Soru kelimesini seçin: \"___ did the historians find the ancient manuscripts and documents?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["Where", "Why", "Who", "What"],
            "correctIndex": 0,
            "enSentence": "Where did the historians find the ancient manuscripts and documents?"
          },
          {
            "id": "u9l25_q3",
            "type": "multiple-choice",
            "prompt": "\"Sosyologlar toplumsal yapıyı ve kültürel değerleri nasıl tanımlar?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "SVO Yapısı", "Geniş Zaman"],
            "options": [
              "How do sociologists define social structure and cultural values?",
              "Why do sociologists define social structure and cultural values?",
              "When do sociologists define social structure and cultural values?",
              "Where do sociologists define social structure and cultural values?"
            ],
            "correctIndex": 0,
            "enSentence": "How do sociologists define social structure and cultural values?",
            "isEngToTr": False
          },
          {
            "id": "u9l25_q4",
            "type": "fill-blank",
            "prompt": "Boşluğu doldurun: \"___ economic model predicts market growth accurately?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "SVO Yapısı", "Geniş Zaman"],
            "options": ["Which", "Where", "Why", "When"],
            "correctIndex": 0,
            "enSentence": "Which economic model predicts market growth accurately?"
          },
          {
            "id": "u9l25_q5",
            "type": "multiple-choice",
            "prompt": "\"What did the research team discover during the psychological experiment in the institute?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Araştırma ekibi enstitüdeki psikolojik deney sırasında ne keşfetti?",
              "Araştırma ekibi enstitüdeki psikolojik deney sırasında ne keşfedebilir?",
              "Araştırma ekibi enstitüdeki psikolojik deney sırasında ne keşfetmeli?",
              "Araştırma ekibi enstitüdeki psikolojik deney sırasında ne keşfedecek?"
            ],
            "correctIndex": 0,
            "enSentence": "What did the research team discover during the psychological experiment in the institute?",
            "isEngToTr": True
          },
          {
            "id": "u9l25_q6",
            "type": "fill-blank",
            "prompt": "Soru kelimesini seçin: \"___ authority issued the new legal decree during the session?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["Whose", "Why", "Where", "How"],
            "correctIndex": 0,
            "enSentence": "Whose authority issued the new legal decree during the session?"
          },
          {
            "id": "u9l25_q7",
            "type": "translation-text",
            "prompt": "\"When did the ethics committee review the proposed research project at the conference?\" cümlesini Türkçe'ye çevirin:",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "correctSentence": "Etik komitesi konferansta önerilen araştırma projesini ne zaman gözden geçirdi?",
            "enSentence": "When did the ethics committee review the proposed research project at the conference?",
            "isEngToTr": True
          },
          {
            "id": "u9l25_q8",
            "type": "translation-text",
            "prompt": "\"Filozoflar ahlak yasasını neden insan doğasıyla ilişkilendirir?\" cümlesini İngilizce'ye çevirin:",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "Fiil ve Edat Yapıları", "Geniş Zaman"],
            "correctSentence": "Why do philosophers link moral law with human nature?",
            "enSentence": "Why do philosophers link moral law with human nature?",
            "isEngToTr": False
          }
        ]
      },
      {
        "id": "u9l25ex2",
        "title": "Alıştırma 2: Yalın Cümleler",
        "description": "Soru kelimeli (Wh-) sorularda yalın cümle düzeyinde yapılar (10 Soru)",
        "createdAt": "2026-07-27T00:00:00Z",
        "questions": [
          {
            "id": "u9l25_ex2_m1",
            "type": "matching",
            "prompt": "Yalın Wh- soru cümlelerini eşleştirin.",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "SVO Yapısı"],
            "pairs": [
              {"left": "Why did scholars challenge the classical theory in their articles?", "right": "Bilginler makalelerinde klasik teoriye neden meydan okudu?"},
              {"left": "How does the legal system protect civil liberties in the court?", "right": "Hukuk sistemi mahkemede sivil özgürlükleri nasıl korur?"},
              {"left": "What caused the sudden shift in economic policy and market trends?", "right": "Ekonomi politikasındaki ve piyasa eğilimlerindeki ani değişime ne sebep oldu?"},
              {"left": "Where did archaeologists excavate the ancient ruins of the temple?", "right": "Arkeologlar tapınağın antik harabelerini nerede kazdı?"}
            ]
          },
          {
            "id": "u9l25_q9",
            "type": "multiple-choice",
            "prompt": "\"How do psychologists explain the emotional development of individuals during therapy?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geniş Zaman"],
            "options": [
              "Psikologlar terapi sırasında bireylerin duygusal gelişimini nasıl açıklar?",
              "Psikologlar terapi sırasında bireylerin duygusal gelişimini nasıl açıklayabilir?",
              "Psikologlar terapi sırasında bireylerin duygusal gelişimini nasıl açıklamalıdır?",
              "Psikologlar terapi sırasında bireylerin duygusal gelişimini nasıl açıkladı?"
            ],
            "correctIndex": 0,
            "enSentence": "How do psychologists explain the emotional development of individuals during therapy?",
            "isEngToTr": True
          },
          {
            "id": "u9l25_q10",
            "type": "fill-blank",
            "prompt": "Soru kelimesini seçin: \"___ factor influenced the voting behavior of citizens in the election?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["Which", "Where", "Why", "When"],
            "correctIndex": 0,
            "enSentence": "Which factor influenced the voting behavior of citizens in the election?"
          },
          {
            "id": "u9l25_q11",
            "type": "multiple-choice",
            "prompt": "\"Sinema eleştirmenleri filmin sembolik anlamını ve fikirlerini nasıl değerlendirdi?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "How did film critics evaluate the symbolic meaning and ideas of the movie?",
              "Why did film critics evaluate the symbolic meaning and ideas of the movie?",
              "Where did film critics evaluate the symbolic meaning and ideas of the movie?",
              "When did film critics evaluate the symbolic meaning and ideas of the movie?"
            ],
            "correctIndex": 0,
            "enSentence": "How did film critics evaluate the symbolic meaning and ideas of the movie?",
            "isEngToTr": False
          },
          {
            "id": "u9l25_q12",
            "type": "fill-blank",
            "prompt": "Boşluğu tamamlayın: \"___ did the legal scholar publish the detailed article and ideas on constitutional law?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["When", "Who", "What", "Whose"],
            "correctIndex": 0,
            "enSentence": "When did the legal scholar publish the detailed article and ideas on constitutional law?"
          },
          {
            "id": "u9l25_q13",
            "type": "multiple-choice",
            "prompt": "\"Whose philosophy influenced the founding principles of modern democracy in history?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Tarihte modern demokrasinin kurucu ilkelerini kimin felsefesi etkiledi?",
              "Tarihte modern demokrasinin kurucu ilkelerini kimin felsefesi etkileyebilir?",
              "Tarihte modern demokrasinin kurucu ilkelerini kimin felsefesi etkilemelidir?",
              "Tarihte modern demokrasinin kurucu ilkelerini kimin felsefesi etkiliyor?"
            ],
            "correctIndex": 0,
            "enSentence": "Whose philosophy influenced the founding principles of modern democracy in history?",
            "isEngToTr": True
          },
          {
            "id": "u9l25_q14",
            "type": "fill-blank",
            "prompt": "Neden bildiren soru kelimesini seçin: \"___ did the government modify the corporate tax legislation after the meeting?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["Why", "Where", "Who", "Whose"],
            "correctIndex": 0,
            "enSentence": "Why did the government modify the corporate tax legislation after the meeting?"
          },
          {
            "id": "u9l25_q15",
            "type": "multiple-choice",
            "prompt": "\"Tarihçiler belgedeki antik yazıtları ve belgeleri nerede inceledi?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Where did historians examine the ancient inscriptions and documents on the paper?",
              "Why did historians examine the ancient inscriptions and documents on the paper?",
              "How did historians examine the ancient inscriptions and documents on the paper?",
              "When did historians examine the ancient inscriptions and documents on the paper?"
            ],
            "correctIndex": 0,
            "enSentence": "Where did historians examine the ancient inscriptions and documents on the paper?",
            "isEngToTr": False
          },
          {
            "id": "u9l25_q16",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Why did the research team isolate the experimental variables in the study?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "Why did the research team isolate the experimental variables in the study?",
            "words": ["Araştırma", "ekibi", "çalışmada", "deneysel", "değişkenleri", "neden", "izole", "etti", "hukuk"],
            "correctOrder": ["Araştırma", "ekibi", "çalışmada", "deneysel", "değişkenleri", "neden", "izole", "etti"],
            "enSentence": "Why did the research team isolate the experimental variables in the study?",
            "isEngToTr": True
          },
          {
            "id": "u9l25_q17",
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını doğru sırayla oluşturun: \"Sosyologlar toplumsal sınıf krizini ve sorunlarını nasıl analiz eder?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "SVO Yapısı", "Geniş Zaman"],
            "translation": "Sosyologlar toplumsal sınıf krizini ve sorunlarını nasıl analiz eder?",
            "words": ["How", "do", "sociologists", "analyze", "the", "social", "class", "crisis", "and", "difficulties"],
            "correctOrder": ["How", "do", "sociologists", "analyze", "the", "social", "class", "crisis", "and", "difficulties"],
            "enSentence": "How do sociologists analyze the social class crisis and difficulties?",
            "isEngToTr": False
          }
        ]
      },
      {
        "id": "u9l25ex3",
        "title": "Alıştırma 3: İleri Düzey Cümleler",
        "description": "Akademik bağlamda soru kelimeli (Wh-) cümleler (10 Soru)",
        "createdAt": "2026-07-27T00:00:00Z",
        "questions": [
          {
            "id": "u9l25_ex3_m1",
            "type": "matching",
            "prompt": "İleri düzey akademik Wh- sorularını Türkçe karşılıklarıyla eşleştirin.",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "SVO Yapısı"],
            "pairs": [
              {"left": "Why did the supreme court challenge the validity of legal acts and opinions?", "right": "Anayasa Mahkemesi yasal eylemlerin ve fikirlerin geçerliliğini neden sorguladı?"},
              {"left": "How do economists calculate the long-term impact of inflation on social life?", "right": "Ekonomistler enflasyonun sosyal yaşam üzerindeki uzun vadeli etkisini nasıl hesaplar?"},
              {"left": "What methodological framework did the psychologist adopt for the academic study?", "right": "Psikolog akademik çalışma için hangi metodolojik çerçeveyi benimsedi?"},
              {"left": "Where did the archaeologist discover the imperial inscriptions and artifacts at the ruins?", "right": "Arkeolog imparatorluk yazıtlarını ve eserlerini harabelerde nerede keşfetti?"}
            ]
          },
          {
            "id": "u9l25_q18",
            "type": "multiple-choice",
            "prompt": "\"Why did constitutional scholars question the executive order during the political crisis?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Anayasa bilginleri siyasi kriz sırasında yürütme kararnamesini neden sorguladı?",
              "Anayasa bilginleri siyasi kriz sırasında yürütme kararnamesini neden sorgulayabilir?",
              "Anayasa bilginleri siyasi kriz sırasında yürütme kararnamesini neden sorgulamalıdır?",
              "Anayasa bilginleri siyasi kriz sırasında yürütme kararnamesini neden sorguluyor?"
            ],
            "correctIndex": 0,
            "enSentence": "Why did constitutional scholars question the executive order during the political crisis?",
            "isEngToTr": True
          },
          {
            "id": "u9l25_q19",
            "type": "fill-blank",
            "prompt": "Boşluğu doldurun: \"___ methodological approach did the research team utilize for the data collection?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["Which", "Where", "Why", "When"],
            "correctIndex": 0,
            "enSentence": "Which methodological approach did the research team utilize for the data collection?"
          },
          {
            "id": "u9l25_q20",
            "type": "multiple-choice",
            "prompt": "\"Tarihçiler antik kentin yıkımına ilişkin arşivsel kanıtları ve bilgileri nerede buldu?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Where did historians find archival evidence and information regarding the destruction of the ancient city?",
              "Why did historians find archival evidence and information regarding the destruction of the ancient city?",
              "How did historians find archival evidence and information regarding the destruction of the ancient city?",
              "When did historians find archival evidence and information regarding the destruction of the ancient city?"
            ],
            "correctIndex": 0,
            "enSentence": "Where did historians find archival evidence and information regarding the destruction of the ancient city?",
            "isEngToTr": False
          },
          {
            "id": "u9l25_q21",
            "type": "fill-blank",
            "prompt": "Soru kelimesini seçin: \"___ did sociologists interpret the sudden shift in public opinion?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["How", "Where", "Who", "Whose"],
            "correctIndex": 0,
            "enSentence": "How did sociologists interpret the sudden shift in public opinion?"
          },
          {
            "id": "u9l25_q22",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Why did the philosopher criticize the ethical framework of modern materialism in his manifesto?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "Why did the philosopher criticize the ethical framework of modern materialism in his manifesto?",
            "words": ["Filozof", "manifestosunda", "modern", "materyalizmin", "etik", "çerçevesini", "neden", "eleştirdi", "hukuk"],
            "correctOrder": ["Filozof", "manifestosunda", "modern", "materyalizmin", "etik", "çerçevesini", "neden", "eleştirdi"],
            "enSentence": "Why did the philosopher criticize the ethical framework of modern materialism in his manifesto?",
            "isEngToTr": True
          },
          {
            "id": "u9l25_q23",
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını doğru sırayla oluşturun: \"Ekonomistler uluslararası ticaret anlaşmasının şartlarını nasıl değerlendirdi?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "Ekonomistler uluslararası ticaret anlaşmasının şartlarını nasıl değerlendirdi?",
            "words": ["How", "did", "economists", "evaluate", "the", "terms", "of", "the", "international", "trade", "agreement", "ethics"],
            "correctOrder": ["How", "did", "economists", "evaluate", "the", "terms", "of", "the", "international", "trade", "agreement"],
            "enSentence": "How did economists evaluate the terms of the international trade agreement?",
            "isEngToTr": False
          },
          {
            "id": "u9l25_q24",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Whose administrative decision altered the scope of the archaeological excavation at the ruins?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "Whose administrative decision altered the scope of the archaeological excavation at the ruins?",
            "words": ["Kimin", "idari", "kararı", "harabelerdeki", "arkeolojik", "kazının", "kapsamını", "değiştirdi", "sosyoloji"],
            "correctOrder": ["Kimin", "idari", "kararı", "harabelerdeki", "arkeolojik", "kazının", "kapsamını", "değiştirdi"],
            "enSentence": "Whose administrative decision altered the scope of the archaeological excavation at the ruins?",
            "isEngToTr": True
          },
          {
            "id": "u9l25_q25",
            "type": "translation-text",
            "prompt": "\"What primary sources did the historian analyze in the national library during his study?\" cümlesini Türkçe'ye çevirin:",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "correctSentence": "Tarihçi çalışması sırasında milli kütüphanede hangi birincil kaynakları analiz etti?",
            "enSentence": "What primary sources did the historian analyze in the national library during his study?",
            "isEngToTr": True
          },
          {
            "id": "u9l25_q26",
            "type": "translation-text",
            "prompt": "\"Psikologlar insan hafızasının yapısındaki sinirsel bağlantıları nasıl inceler?\" cümlesini İngilizce'ye çevirin:",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geniş Zaman"],
            "correctSentence": "How do psychologists investigate neural connections in the structure of human memory?",
            "enSentence": "How do psychologists investigate neural connections in the structure of human memory?",
            "isEngToTr": False
          }
        ]
      }
    ]
  },
  "4": {
    "exercises": [
      {
        "id": "u9l26ex1",
        "title": "Alıştırma 1: Yapısal Kalıplar ve Öbekler",
        "description": "Edatlı soru kalıpları, olumsuz sorular ve teyit sorularında öbek yapılar (10 Soru)",
        "createdAt": "2026-07-27T00:00:00Z",
        "questions": [
          {
            "id": "u9l26_m1",
            "type": "matching",
            "prompt": "Edatlı ve olumsuz soru kalıplarını Türkçe karşılıklarıyla eşleştirin.",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Olumsuz Soru"],
            "pairs": [
              {"left": "In which century did the empire collapse in history?", "right": "Tarihte imparatorluk hangi yüzyılda çöktü?"},
              {"left": "Under whose authority did the court act during the trial?", "right": "Duruşma sırasında mahkeme kimin yetkisi altında hareket etti?"},
              {"left": "Didn't the doctor examine the patient in the room?", "right": "Doktor odada hastayı incelemedi mi?"},
              {"left": "Isn't the legal framework clear to the board and committee?", "right": "Yasal çerçeve kurula ve komiteye açık değil midir?"}
            ]
          },
          {
            "id": "u9l26_m2",
            "type": "matching",
            "prompt": "Teyit soruları (Tag questions) ve edatlı soruları eşleştirin.",
            "grammarTags": ["Soru Yapıları (Tag Question)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Teyit Sorusu"],
            "pairs": [
              {"left": "The scholar wrote the article and paper, didn't he?", "right": "Bilgin makaleyi ve bildiriyi yazdı, değil mi?"},
              {"left": "The theory is valid, isn't it?", "right": "Teori geçerlidir, değil mi?"},
              {"left": "For what purpose did they gather empirical data and facts?", "right": "Hangi amaçla ampirik veri ve gerçekleri topladılar?"},
              {"left": "To what extent did corporate policy change in the institute?", "right": "Şirket politikası enstitüde ne ölçüde değişti?"}
            ]
          },
          {
            "id": "u9l26_q1",
            "type": "multiple-choice",
            "prompt": "\"To what extent did the Industrial Revolution alter the structure of social stratification?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Sanayi Devrimi toplumsal katmanlaşmanın yapısını ne ölçüde değiştirdi?",
              "Sanayi Devrimi toplumsal katmanlaşmanın yapısını ne ölçüde değiştirebilir?",
              "Sanayi Devrimi toplumsal katmanlaşmanın yapısını ne ölçüde değiştirmelidir?",
              "Sanayi Devrimi toplumsal katmanlaşmanın yapısını ne ölçüde değiştiriyor?"
            ],
            "correctIndex": 0,
            "enSentence": "To what extent did the Industrial Revolution alter the structure of social stratification?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q2",
            "type": "fill-blank",
            "prompt": "Cümle başı edatlı soru yapısını doldurun: \"___ which historical epoch did constitutional monarchy emerge?\"",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["In", "On", "At", "By"],
            "correctIndex": 0,
            "enSentence": "In which historical epoch did constitutional monarchy emerge?"
          },
          {
            "id": "u9l26_q3",
            "type": "multiple-choice",
            "prompt": "\"Didn't the ethics committee review the experimental results in the laboratory?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Olumsuz Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Etik komitesi laboratuvardaki deneysel sonuçları gözden geçirmedi mi?",
              "Etik komitesi laboratuvardaki deneysel sonuçları gözden geçiremez mi?",
              "Etik komitesi laboratuvardaki deneysel sonuçları gözden geçirmemeli midir?",
              "Etik komitesi laboratuvardaki deneysel sonuçları gözden geçirmiyor mu?"
            ],
            "correctIndex": 0,
            "enSentence": "Didn't the ethics committee review the experimental results in the laboratory?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q4",
            "type": "fill-blank",
            "prompt": "Teyit sorusu (tag question) eklentisini seçin: \"The sociologist published the study on social mobility, ___?\"",
            "grammarTags": ["Soru Yapıları (Tag Question)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Teyit Sorusu"],
            "options": ["didn't he", "isn't he", "wasn't he", "doesn't he"],
            "correctIndex": 0,
            "enSentence": "The sociologist published the study on social mobility, didn't he?"
          },
          {
            "id": "u9l26_q5",
            "type": "multiple-choice",
            "prompt": "\"Under whose political leadership did the cultural renaissance reach its artistic peak?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Kültürel rönesans hangi siyasi liderlik altında sanatsal zirvesine ulaştı?",
              "Kültürel rönesans hangi siyasi liderlik altında sanatsal zirvesine ulaşabilir?",
              "Kültürel rönesans hangi siyasi liderlik altında sanatsal zirvesine ulaşmalıdır?",
              "Kültürel rönesans hangi siyasi liderlik altında sanatsal zirvesine ulaşıyor?"
            ],
            "correctIndex": 0,
            "enSentence": "Under whose political leadership did the cultural renaissance reach its artistic peak?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q6",
            "type": "fill-blank",
            "prompt": "Olumsuz durum sorusu boşluğunu doldurun: \"___ human rights essential for sustaining a democratic society?\"",
            "grammarTags": ["Soru Yapıları (Olumsuz Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Olumsuz Soru"],
            "options": ["Aren't", "Isn't", "Didn't", "Don't"],
            "correctIndex": 0,
            "enSentence": "Aren't human rights essential for sustaining a democratic society?"
          },
          {
            "id": "u9l26_q7",
            "type": "translation-text",
            "prompt": "\"In which century did parliamentary sovereignty become the dominant political norm in history?\" cümlesini Türkçe'ye çevirin:",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "correctSentence": "Parlamento egemenliği tarihte hangi yüzyılda hakim siyasi norm haline geldi?",
            "enSentence": "In which century did parliamentary sovereignty become the dominant political norm in history?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q8",
            "type": "translation-text",
            "prompt": "\"Tarihçi arşivdeki orijinal el yazmasını doğruladı, değil mi?\" cümlesini İngilizce'ye çevirin:",
            "grammarTags": ["Soru Yapıları (Tag Question)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Teyit Sorusu"],
            "correctSentence": "The historian verified the original manuscript in the archive, didn't he?",
            "enSentence": "The historian verified the original manuscript in the archive, didn't he?",
            "isEngToTr": False
          }
        ]
      },
      {
        "id": "u9l26ex2",
        "title": "Alıştırma 2: Yalın Cümleler",
        "description": "Edatlı, olumsuz ve teyit sorularında yalın cümle yapılanması (10 Soru)",
        "createdAt": "2026-07-27T00:00:00Z",
        "questions": [
          {
            "id": "u9l26_ex2_m1",
            "type": "matching",
            "prompt": "Yalın edatlı ve teyit soru cümlelerini eşleştirin.",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Teyit Sorusu"],
            "pairs": [
              {"left": "Philosophers rarely accept dogma without empirical verification, do they?", "right": "Filozoflar ampirik doğrulama olmaksızın dogmayı nadiren kabul eder, değil mi?"},
              {"left": "For what reason did economists modify the market forecast in their study?", "right": "Ekonomistler çalışmalarında piyasa tahminini ne sebepten değiştirdi?"},
              {"left": "Didn't ancient trade networks facilitate cultural exchange between nations?", "right": "Antik ticaret ağları uluslar arasında kültürel değişimi kolaylaştırmadı mı?"},
              {"left": "In which historical period did maritime trade flourish across the sea?", "right": "Deniz ticareti deniz genelinde hangi tarihsel dönemde gelişti?"}
            ]
          },
          {
            "id": "u9l26_q9",
            "type": "multiple-choice",
            "prompt": "\"Philosophers rarely accept dogma without empirical verification, do they?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Tag Question)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Teyit Sorusu"],
            "options": [
              "Filozoflar ampirik doğrulama olmadan dogmayı nadiren kabul eder, değil mi?",
              "Filozoflar ampirik doğrulama olmadan dogmayı asla kabul etmez, değil mi?",
              "Filozoflar ampirik doğrulama olmadan dogmayı her zaman kabul eder, değil mi?",
              "Filozoflar ampirik doğrulama olmadan dogmayı kabul etmeli midir?"
            ],
            "correctIndex": 0,
            "enSentence": "Philosophers rarely accept dogma without empirical verification, do they?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q10",
            "type": "fill-blank",
            "prompt": "Edatlı soru kalıbını doldurun: \"For what strategic purpose ___ the supreme court order a judicial review?\"",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["did", "is", "were", "are"],
            "correctIndex": 0,
            "enSentence": "For what strategic purpose did the supreme court order a judicial review?"
          },
          {
            "id": "u9l26_q11",
            "type": "multiple-choice",
            "prompt": "\"Didn't ancient trade networks facilitate cultural exchange between East and West?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Olumsuz Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Antik ticaret ağları Doğu ile Batı arasında kültürel değişimi kolaylaştırmadı mı?",
              "Antik ticaret ağları Doğu ile Batı arasında kültürel değişimi kolaylaştırabilir mi?",
              "Antik ticaret ağları Doğu ile Batı arasında kültürel değişimi kolaylaştırmalı mıdır?",
              "Antik ticaret ağları Doğu ile Batı arasında kültürel değişimi kolaylaştıracak mı?"
            ],
            "correctIndex": 0,
            "enSentence": "Didn't ancient trade networks facilitate cultural exchange between East and West?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q12",
            "type": "fill-blank",
            "prompt": "Boşluğu tamamlayın: \"Under ___ political leadership did the economic reform package take effect?\"",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["whose", "which", "what", "where"],
            "correctIndex": 0,
            "enSentence": "Under whose political leadership did the economic reform package take effect?"
          },
          {
            "id": "u9l26_q13",
            "type": "multiple-choice",
            "prompt": "\"In which historical epoch did constitutional monarchy emerge as a stable governance model in society?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Anayasal monarşi toplumda hangi tarihsel çağda istikrarlı bir yönetim modeli olarak ortaya çıktı?",
              "Anayasal monarşi toplumda hangi tarihsel çağda istikrarlı bir yönetim modeli olarak ortaya çıkabilir?",
              "Anayasal monarşi toplumda hangi tarihsel çağda istikrarlı bir yönetim modeli olarak ortaya çıkmalıdır?",
              "Anayasal monarşi toplumda hangi tarihsel çağda istikrarlı bir yönetim modeli olarak ortaya çıkıyor?"
            ],
            "correctIndex": 0,
            "enSentence": "In which historical epoch did constitutional monarchy emerge as a stable governance model in society?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q14",
            "type": "fill-blank",
            "prompt": "Teyit sorusu eklentisini doldurun: \"The economic analyst evaluated the financial budget in the report, ___?\"",
            "grammarTags": ["Soru Yapıları (Tag Question)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Teyit Sorusu"],
            "options": ["didn't he", "isn't he", "wasn't he", "doesn't he"],
            "correctIndex": 0,
            "enSentence": "The economic analyst evaluated the financial budget in the report, didn't he?"
          },
          {
            "id": "u9l26_q15",
            "type": "multiple-choice",
            "prompt": "\"Aren't human rights inherent to all individuals regardless of citizenship status in society?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Olumsuz Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Olumsuz Soru"],
            "options": [
              "Toplumda vatandaşlık durumuna bakılmaksızın insan hakları tüm bireylerin doğasında yok mudur?",
              "Toplumda vatandaşlık durumuna bakılmaksızın insan hakları tüm bireylerin doğasında olamaz mı?",
              "Toplumda vatandaşlık durumuna bakılmaksızın insan hakları tüm bireylerin doğasında olmalı mıdır?",
              "Toplumda vatandaşlık durumuna bakılmaksızın insan hakları tüm bireylerin doğasında var mıdır?"
            ],
            "correctIndex": 0,
            "enSentence": "Aren't human rights inherent to all individuals regardless of citizenship status in society?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q16",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"To what extent did enlightenment philosophy influence the draft of the constitution?\"",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "To what extent did enlightenment philosophy influence the draft of the constitution?",
            "words": ["Aydınlanma", "felsefesi", "anayasa", "taslağını", "ne", "ölçüde", "etkiledi", "psikoloji"],
            "correctOrder": ["Aydınlanma", "felsefesi", "anayasa", "taslağını", "ne", "ölçüde", "etkiledi"],
            "enSentence": "To what extent did enlightenment philosophy influence the draft of the constitution?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q17",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Didn't ancient trade networks facilitate cultural exchange between East and West?\"",
            "grammarTags": ["Soru Yapıları (Olumsuz Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "Didn't ancient trade networks facilitate cultural exchange between East and West?",
            "words": ["Antik", "ticaret", "ağları", "Doğu", "ile", "Batı", "arasında", "kültürel", "değişimi", "kolaylaştırmadı", "mı"],
            "correctOrder": ["Antik", "ticaret", "ağları", "Doğu", "ile", "Batı", "arasında", "kültürel", "değişimi", "kolaylaştırmadı", "mı"],
            "enSentence": "Didn't ancient trade networks facilitate cultural exchange between East and West?",
            "isEngToTr": True
          }
        ]
      },
      {
        "id": "u9l26ex3",
        "title": "Alıştırma 3: İleri Düzey Cümleler",
        "description": "Akademik bağlamda edatlı, olumsuz ve teyit soruları (10 Soru)",
        "createdAt": "2026-07-27T00:00:00Z",
        "questions": [
          {
            "id": "u9l26_ex3_m1",
            "type": "matching",
            "prompt": "İleri edatlı ve olumsuz akademik soruları eşleştirin.",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "pairs": [
              {"left": "On what philosophical grounds did Locke defend religious toleration in his book?", "right": "Locke kitabında hangi felsefi temellerde dini hoşgörüyü savundu?"},
              {"left": "Isn't freedom of speech crucial for sustaining democratic debate in society?", "right": "İfade özgürlüğü toplumda demokratik tartışmayı sürdürmek için hayati değil midir?"},
              {"left": "From which ancient civilization did the legal system inherit its principles and law?", "right": "Hukuk sistemi ilkelerini ve yasayı hangi antik uygarlıktan devraldı?"},
              {"left": "Didn't the economic crisis precipitate the fall of the ruling government and board?", "right": "Ekonomik kriz iktidar hükümetinin ve kurulun düşüşünü hızlandırmadı mı?"}
            ]
          },
          {
            "id": "u9l26_q18",
            "type": "multiple-choice",
            "prompt": "\"On what philosophical grounds did John Locke defend religious toleration in his essays?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "John Locke denemelerinde dini hoşgörüyü hangi felsefi temellerde savundu?",
              "John Locke denemelerinde dini hoşgörüyü hangi felsefi temellerde savunabilir?",
              "John Locke denemelerinde dini hoşgörüyü hangi felsefi temellerde savunmalıdır?",
              "John Locke denemelerinde dini hoşgörüyü hangi felsefi temellerde savunuyor?"
            ],
            "correctIndex": 0,
            "enSentence": "On what philosophical grounds did John Locke defend religious toleration in his essays?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q19",
            "type": "fill-blank",
            "prompt": "Edatlı soru boşluğunu doldurun: \"Under ___ regulatory framework did the financial authority suspend market trading?\"",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["which", "whose", "what", "where"],
            "correctIndex": 0,
            "enSentence": "Under which regulatory framework did the financial authority suspend market trading?"
          },
          {
            "id": "u9l26_q20",
            "type": "multiple-choice",
            "prompt": "\"Isn't freedom of expression essential for promoting open academic discourse in universities?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Olumsuz Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Olumsuz Soru"],
            "options": [
              "İfade özgürlüğü üniversitelerde açık akademik söylemi teşvik etmek için gerekli değil midir?",
              "İfade özgürlüğü üniversitelerde açık akademik söylemi teşvik etmek için gerekli olamaz mı?",
              "İfade özgürlüğü üniversitelerde açık akademik söylemi teşvik etmek için gerekli olmalı mıdır?",
              "İfade özgürlüğü üniversitelerde açık akademik söylemi teşvik etmek için gerekli midir?"
            ],
            "correctIndex": 0,
            "enSentence": "Isn't freedom of expression essential for promoting open academic discourse in universities?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q21",
            "type": "fill-blank",
            "prompt": "Tag question olumsuz eklentisini doldurun: \"The ethics committee approved the new experimental procedure in the meeting, ___?\"",
            "grammarTags": ["Soru Yapıları (Tag Question)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Teyit Sorusu"],
            "options": ["didn't it", "isn't it", "wasn't it", "doesn't it"],
            "correctIndex": 0,
            "enSentence": "The ethics committee approved the new experimental procedure in the meeting, didn't it?"
          },
          {
            "id": "u9l26_q22",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"From which ancient civilization did the legal system inherit its core principles?\"",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "From which ancient civilization did the legal system inherit its core principles?",
            "words": ["Hukuk", "sistemi", "temel", "ilkelerini", "hangi", "antik", "uygarlıktan", "devraldı", "psikoloji"],
            "correctOrder": ["Hukuk", "sistemi", "temel", "ilkelerini", "hangi", "antik", "uygarlıktan", "devraldı"],
            "enSentence": "From which ancient civilization did the legal system inherit its core principles?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q23",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Didn't the severe economic crisis precipitate the collapse of the parliamentary government?\"",
            "grammarTags": ["Soru Yapıları (Olumsuz Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "Didn't the severe economic crisis precipitate the collapse of the parliamentary government?",
            "words": ["Şiddetli", "ekonomik", "kriz", "parlamenter", "hükümetin", "çöküşünü", "hızlandırmadı", "mı", "felsefe"],
            "correctOrder": ["Şiddetli", "ekonomik", "kriz", "parlamenter", "hükümetin", "çöküşünü", "hızlandırmadı", "mı"],
            "enSentence": "Didn't the severe economic crisis precipitate the collapse of the parliamentary government?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q24",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"To what extent did maritime trade shape the culture of ancient coastal city-states in history?\"",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "To what extent did maritime trade shape the culture of ancient coastal city-states in history?",
            "words": ["Tarihte", "deniz", "ticareti", "antik", "kıyı", "şehir", "devletlerinin", "kültürünü", "ne", "ölçüde", "şekillendirdi"],
            "correctOrder": ["Tarihte", "deniz", "ticareti", "antik", "kıyı", "şehir", "devletlerinin", "kültürünü", "ne", "ölçüde", "şekillendirdi"],
            "enSentence": "To what extent did maritime trade shape the culture of ancient coastal city-states in history?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q25",
            "type": "translation-text",
            "prompt": "\"For what strategic purpose did the military alliance build fortified outposts along the frontier in history?\" cümlesini Türkçe'ye çevirin:",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "correctSentence": "Askeri ittifak tarihte sınır boyunca hangi stratejik amaçla müstahkem karakollar inşa etti?",
            "enSentence": "For what strategic purpose did the military alliance build fortified outposts along the frontier in history?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q26",
            "type": "translation-text",
            "prompt": "\"Anayasal reform önerisi ulusal meclis tarafından onaylandı, değil mi?\" cümlesini İngilizce'ye çevirin:",
            "grammarTags": ["Soru Yapıları (Tag Question)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Teyit Sorusu"],
            "correctSentence": "The national assembly approved the constitutional reform proposal, didn't it?",
            "enSentence": "The national assembly approved the constitutional reform proposal, didn't it?",
            "isEngToTr": False
          }
        ]
      }
    ]
  }
}

with open("data.js", "r", encoding="utf-8") as f:
    content = f.read()

pos = content.find("9: {")
if pos == -1: pos = content.find('"9": {')
end_pos = content.find('"10": {', pos)
if end_pos == -1: end_pos = content.find('10: {', pos)

new_json_str = "9: " + json.dumps(unit9_json, ensure_ascii=False, indent=2) + ",\n  "
updated_content = content[:pos] + new_json_str + content[end_pos:]

with open("data.js", "w", encoding="utf-8") as f:
    f.write(updated_content)

print("data.js updated!")

res = subprocess.run(["python3", "scripts/verify_recycling.py"], capture_output=True, text=True)
print(res.stdout)
