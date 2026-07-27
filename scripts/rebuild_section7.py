import json
import re

# Load Section 6 (Unit 70) vocabulary from data.js
with open("data.js", "r", encoding="utf-8") as f:
    data_text = f.read()

# Extract words from unit 70
u70_pos = data_text.find('"70": {')
u70_block = data_text[u70_pos:u70_pos + 100000] # approximate block

u70_en_words = set()
for match in re.findall(r'"([A-Za-z\s\'-]+)"', u70_block):
    # tokenise
    tokens = re.findall(r'\b[a-zA-Z]{3,}\b', match)
    for t in tokens:
        u70_en_words.add(t.lower())

print(f"Extracted {len(u70_en_words)} unique English words from Section 6.")
print("Sample Section 6 words:", sorted(list(u70_en_words))[:30])

# Define domain vocabulary & recycled words for Section 7 (Unit 9)
# Domains: Beşeri Bilimler, İktisat, Hukuk, Sinema, Tarih, Sosyoloji, Psikoloji
# Recycled from Sec 6: philosopher, historical, documents, archive, sociological, report, ancient, texts, researchers, manuscript, ignore, deny, truth, observe, changes, society, library, works, heritage, discuss, argument, author, conference, scholar, ethics, climate, patients, doctor, inscriptions, ruins, artifacts, decipher, prejudice, manifesto, primary, sources, findings, published, article, committee, decision, evaluate, evidence, theory, facts, method, methodology, variables, scope, data, experiment, concept, analysis, analyze, system, process, structure, law, policy, economic, social, etc.

# Let's create unit 9 JSON data
unit9_data = {
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
              {"left": "May researchers access legal archives?", "right": "Araştırmacılar yasal arşivlere erişebilir mi?"},
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
            "prompt": "\"Tarihçiler kadim el yazmalarındaki felsefi mantığı sorgulamalı mıdır?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": [
              "Should historians question the philosophical logic in ancient manuscripts?",
              "Can historians question the philosophical logic in ancient manuscripts?",
              "Were historians questioning the philosophical logic in ancient manuscripts?",
              "Would historians question the philosophical logic in ancient manuscripts?"
            ],
            "correctIndex": 0,
            "enSentence": "Should historians question the philosophical logic in ancient manuscripts?",
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
            "prompt": "\"May the ethics committee evaluate the primary sources of the research project?\" cümlesini Türkçe'ye çevirin:",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "correctSentence": "Etik komitesi araştırma projesinin birincil kaynaklarını değerlendirebilir mi?",
            "enSentence": "May the ethics committee evaluate the primary sources of the research project?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q8",
            "type": "translation-text",
            "prompt": "\"Ekonomistler merkez bankasının yeni parasal politikasını tartışabilir mi?\" cümlesini İngilizce'ye çevirin:",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "correctSentence": "Can economists discuss the new monetary policy of the central bank?",
            "enSentence": "Can economists discuss the new monetary policy of the central bank?",
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
              {"left": "Has the scholar deciphered the inscription?", "right": "Bilgin yazıtı çözdü mü?"},
              {"left": "Must legal scholars respect historical precedent?", "right": "Hukuk bilginleri tarihsel emsale saygı duymalı mıdır?"},
              {"left": "Were sociologists analyzing economic data?", "right": "Sosyologlar ekonomik verileri analiz ediyor muydu?"},
              {"left": "Can cinematic techniques convey psychological states?", "right": "Sinematik teknikler psikolojik durumları aktarabilir mi?"}
            ]
          },
          {
            "id": "u9l23_q9",
            "type": "multiple-choice",
            "prompt": "\"Would the philosopher accept the basic premise of modern ethics?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": [
              "Filozof modern etiğin temel önermesini kabul eder miydi?",
              "Filozof modern etiğin temel önermesini kabul etmeli midir?",
              "Filozof modern etiğin temel önermesini kabul edebildi mi?",
              "Filozof modern etiğin temel önermesini kabul ediyor mu?"
            ],
            "correctIndex": 0,
            "enSentence": "Would the philosopher accept the basic premise of modern ethics?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q10",
            "type": "fill-blank",
            "prompt": "Boşluğu tamamlayın: \"___ the court review the archival documents before the final decision?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": ["Should", "Is", "Were", "Are"],
            "correctIndex": 0,
            "enSentence": "Should the court review the archival documents before the final decision?"
          },
          {
            "id": "u9l23_q11",
            "type": "multiple-choice",
            "prompt": "\"Araştırmacılar kütüphanedeki nadir el yazmalarını koruyabilir mi?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": [
              "Can researchers protect the rare manuscripts in the library?",
              "Should researchers protect the rare manuscripts in the library?",
              "Were researchers protecting the rare manuscripts in the library?",
              "Must researchers protect the rare manuscripts in the library?"
            ],
            "correctIndex": 0,
            "enSentence": "Can researchers protect the rare manuscripts in the library?",
            "isEngToTr": False
          },
          {
            "id": "u9l23_q12",
            "type": "fill-blank",
            "prompt": "Soru kalıbını doldurun: \"___ the director depict social conflicts in his new film?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": ["Might", "Was", "Has", "Been"],
            "correctIndex": 0,
            "enSentence": "Might the director depict social conflicts in his new film?"
          },
          {
            "id": "u9l23_q13",
            "type": "multiple-choice",
            "prompt": "\"Have economists gathered sufficient empirical data for the research?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Kip Ekleri ve Zamanlar"],
            "options": [
              "Ekonomistler araştırma için yeterli ampirik veri topladı mı?",
              "Ekonomistler araştırma için yeterli ampirik veri toplayacak mı?",
              "Ekonomistler araştırma için yeterli ampirik veri toplamalı mıdır?",
              "Ekonomistler araştırma için yeterli ampirik veri topluyor muydu?"
            ],
            "correctIndex": 0,
            "enSentence": "Have economists gathered sufficient empirical data for the research?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q14",
            "type": "fill-blank",
            "prompt": "Doğru modalı seçin: \"___ historians disregard the cultural context of ancient ruins?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": ["Should", "Are", "Were", "Is"],
            "correctIndex": 0,
            "enSentence": "Should historians disregard the cultural context of ancient ruins?"
          },
          {
            "id": "u9l23_q15",
            "type": "multiple-choice",
            "prompt": "\"Sosyo-ekonomik faktörler topluluktaki bireysel davranışları etkileyebilir mi?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": [
              "Can socio-economic factors influence individual behavior in the community?",
              "Must socio-economic factors influence individual behavior in the community?",
              "Were socio-economic factors influencing individual behavior in the community?",
              "Should socio-economic factors influence individual behavior in the community?"
            ],
            "correctIndex": 0,
            "enSentence": "Can socio-economic factors influence individual behavior in the community?",
            "isEngToTr": False
          },
          {
            "id": "u9l23_q16",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Could the psychologist identify the primary causes of social anxiety?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "translation": "Could the psychologist identify the primary causes of social anxiety?",
            "words": ["Psikolog", "sosyal", "kaygının", "temel", "nedenlerini", "tespit", "edebildi", "mi", "politikalarını", "hukuk"],
            "correctOrder": ["Psikolog", "sosyal", "kaygının", "temel", "nedenlerini", "tespit", "edebildi", "mi"],
            "enSentence": "Could the psychologist identify the primary causes of social anxiety?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q17",
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını doğru sırayla oluşturun: \"Filozoflar ahlaki değerlerin önemini tartışabilir mi?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "translation": "Filozoflar ahlaki değerlerin önemini tartışabilir mi?",
            "words": ["Can", "philosophers", "discuss", "the", "importance", "of", "moral", "values", "archival", "law"],
            "correctOrder": ["Can", "philosophers", "discuss", "the", "importance", "of", "moral", "values"],
            "enSentence": "Can philosophers discuss the importance of moral values?",
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
              {"left": "Must legal scholars defend constitutional principles in times of crisis?", "right": "Hukuk bilginleri kriz zamanlarında anayasal ilkeleri savunmalı mıdır?"},
              {"left": "Could economic fluctuations trigger shifts in political ideology?", "right": "Ekonomik dalgalanmalar siyasi ideolojide kaymalara yol açabilir miydi?"},
              {"left": "Has the sociologist published a comprehensive study on urban poverty?", "right": "Sosyolog kentsel yoksulluk üzerine kapsamlı bir çalışma yayımladı mı?"},
              {"left": "Can cinematic realism reflect the psychological trauma of war?", "right": "Sinematik realizm savaşın psikolojik travmasını yansıtabilir mi?"}
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
            "prompt": "Boşluğa gelecek uygun modalı seçin: \"___ the ethics committee evaluate the long-term societal consequences of scientific experiments?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": ["Must", "Is", "Were", "Are"],
            "correctIndex": 0,
            "enSentence": "Must the ethics committee evaluate the long-term societal consequences of scientific experiments?"
          },
          {
            "id": "u9l23_q20",
            "type": "multiple-choice",
            "prompt": "\"Psikologlar deneysel çalışmalar sırasında gözlemlenen davranışsal anomalileri açıklayabilir mi?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": [
              "Can psychologists explain the behavioral anomalies observed during experimental studies?",
              "Should psychologists explain the behavioral anomalies observed during experimental studies?",
              "Must psychologists explain the behavioral anomalies observed during experimental studies?",
              "Were psychologists explaining the behavioral anomalies observed during experimental studies?"
            ],
            "correctIndex": 0,
            "enSentence": "Can psychologists explain the behavioral anomalies observed during experimental studies?",
            "isEngToTr": False
          },
          {
            "id": "u9l23_q21",
            "type": "fill-blank",
            "prompt": "Yardımcı fiili tamamlayın: \"___ the constitutional court nullify legislation that violates fundamental human rights?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "options": ["Can", "Was", "Has", "Been"],
            "correctIndex": 0,
            "enSentence": "Can the constitutional court nullify legislation that violates fundamental human rights?"
          },
          {
            "id": "u9l23_q22",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Could the film director integrate historical facts with cinematic storytelling?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "translation": "Could the film director integrate historical facts with cinematic storytelling?",
            "words": ["Film", "yönetmeni", "tarihsel", "gerçekleri", "sinematik", "anlatı", "ile", "bütünleştirebildi", "mi", "psikoloji", "kanun"],
            "correctOrder": ["Film", "yönetmeni", "tarihsel", "gerçekleri", "sinematik", "anlatı", "ile", "bütünleştirebildi", "mi"],
            "enSentence": "Could the film director integrate historical facts with cinematic storytelling?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q23",
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını doğru sırayla oluşturun: \"Ekonomistler küresel pazarın yapısındaki kırılganlıkları tahmin edebilir miydi?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "translation": "Ekonomistler küresel pazarın yapısındaki kırılganlıkları tahmin edebilir miydi?",
            "words": ["Could", "economists", "predict", "the", "vulnerabilities", "in", "the", "structure", "of", "the", "global", "market", "ethics"],
            "correctOrder": ["Could", "economists", "predict", "the", "vulnerabilities", "in", "the", "structure", "of", "the", "global", "market"],
            "enSentence": "Could economists predict the vulnerabilities in the structure of the global market?",
            "isEngToTr": False
          },
          {
            "id": "u9l23_q24",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Have sociologists gathered empirical evidence regarding social mobility in modern urban centers?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Kip Ekleri ve Zamanlar"],
            "translation": "Have sociologists gathered empirical evidence regarding social mobility in modern urban centers?",
            "words": ["Sosyologlar", "modern", "kent", "merkezlerindeki", "toplumsal", "hareketliliğe", "ilişkin", "ampirik", "kanıt", "topladı", "mı", "metodoloji"],
            "correctOrder": ["Sosyologlar", "modern", "kent", "merkezlerindeki", "toplumsal", "hareketliliğe", "ilişkin", "ampirik", "kanıt", "topladı", "mı"],
            "enSentence": "Have sociologists gathered empirical evidence regarding social mobility in modern urban centers?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q25",
            "type": "translation-text",
            "prompt": "\"Would the philosopher challenge traditional metaphysical concepts through modern logic?\" cümlesini Türkçe'ye çevirin:",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "correctSentence": "Filozof geleneksel metafizik kavramlara modern mantık aracılığıyla meydan okur muydu?",
            "enSentence": "Would the philosopher challenge traditional metaphysical concepts through modern logic?",
            "isEngToTr": True
          },
          {
            "id": "u9l23_q26",
            "type": "translation-text",
            "prompt": "\"Tarihçiler imparatorluğun çöküşü sırasındaki arşivsel belgeleri incelemeli midir?\" cümlesini İngilizce'ye çevirin:",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Saf Modallar"],
            "correctSentence": "Should historians examine the archival documents during the collapse of the empire?",
            "enSentence": "Should historians examine the archival documents during the collapse of the empire?",
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
              {"left": "Does the legal system protect civil rights?", "right": "Hukuk sistemi sivil hakları korur mu?"},
              {"left": "Did the historian find the manuscript?", "right": "Tarihçi el yazmasını buldu mu?"},
              {"left": "Do sociologists study group behavior?", "right": "Sosyologlar grup davranışını inceler mi?"},
              {"left": "Did the director film the scene?", "right": "Yönetmen sahneyi çekti mi?"}
            ]
          },
          {
            "id": "u9l24_m2",
            "type": "matching",
            "prompt": "Ekonomi ve psikoloji alanındaki eylem sorularını eşleştirin.",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "Fiil ve Edat Yapıları", "SVO Yapısı"],
            "pairs": [
              {"left": "Does inflation affect consumer confidence?", "right": "Enflasyon tüketici güvenini etkiler mi?"},
              {"left": "Did the psychologist observe the patient?", "right": "Psikolog hastayı gözlemledi mi?"},
              {"left": "Do economists analyze market trends?", "right": "Ekonomistler piyasa eğilimlerini analiz eder mi?"},
              {"left": "Did the committee publish the findings?", "right": "Komite bulguları yayımladı mı?"}
            ]
          },
          {
            "id": "u9l24_q1",
            "type": "multiple-choice",
            "prompt": "\"Did the archaeologist discover ancient artifacts in the ruins?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Arkeolog harabelerde antik eserler keşfetti mi?",
              "Arkeolog harabelerde antik eserler keşfedebilir mi?",
              "Arkeolog harabelerde antik eserler keşfetmeli midir?",
              "Arkeolog harabelerde antik eserler keşfedecek mi?"
            ],
            "correctIndex": 0,
            "enSentence": "Did the archaeologist discover ancient artifacts in the ruins?",
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
            "prompt": "\"Felsefe profesörü ders sırasında mantık kurallarını açıkladı mı?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Did the philosophy professor explain the rules of logic during the lecture?",
              "Does the philosophy professor explain the rules of logic during the lecture?",
              "Is the philosophy professor explaining the rules of logic during the lecture?",
              "Has the philosophy professor explained the rules of logic during the lecture?"
            ],
            "correctIndex": 0,
            "enSentence": "Did the philosophy professor explain the rules of logic during the lecture?",
            "isEngToTr": False
          },
          {
            "id": "u9l24_q4",
            "type": "fill-blank",
            "prompt": "Cümle başı yardımcı fiil boşluğunu doldurun: \"___ the court enforce the new environmental regulations?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geniş Zaman"],
            "options": ["Does", "Is", "Were", "Are"],
            "correctIndex": 0,
            "enSentence": "Does the court enforce the new environmental regulations?"
          },
          {
            "id": "u9l24_q5",
            "type": "multiple-choice",
            "prompt": "\"Did the film director focus on the psychological conflict of the main character?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "Fiil ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Film yönetmeni ana karakterin psikolojik çatışmasına odaklandı mı?",
              "Film yönetmeni ana karakterin psikolojik çatışmasına odaklanmalı mıdır?",
              "Film yönetmeni ana karakterin psikolojik çatışmasına odaklanacak mı?",
              "Film yönetmeni ana karakterin psikolojik çatışmasına odaklanabilir mi?"
            ],
            "correctIndex": 0,
            "enSentence": "Did the film director focus on the psychological conflict of the main character?",
            "isEngToTr": True
          },
          {
            "id": "u9l24_q6",
            "type": "fill-blank",
            "prompt": "Geçmiş zaman yardımcı fiilini seçin: \"___ the economic crisis lead to widespread unemployment across the nation?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "Fiil ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["Did", "Does", "Has", "Was"],
            "correctIndex": 0,
            "enSentence": "Did the economic crisis lead to widespread unemployment across the nation?"
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
            "prompt": "\"Tarihçiler antik medeniyetlerin kültürel mirasını belgeledi mi?\" cümlesini İngilizce'ye çevirin:",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "correctSentence": "Did historians document the cultural heritage of ancient civilizations?",
            "enSentence": "Did historians document the cultural heritage of ancient civilizations?",
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
              {"left": "Is there a conflict between law and morality?", "right": "Hukuk ile ahlak arasında bir çatışma var mıdır?"},
              {"left": "Are there historical documents in the library?", "right": "Kütüphanede tarihsel belgeler var mıdır?"},
              {"left": "Was there an economic decline in the empire?", "right": "İmparatorlukta ekonomik bir gerileme var mıydı?"},
              {"left": "Were there sociologists at the conference?", "right": "Konferansta sosyologlar var mıydı?"}
            ]
          },
          {
            "id": "u9l24_q9",
            "type": "multiple-choice",
            "prompt": "\"Do ethicists object to dangerous scientific experiments on animals?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "Fiil ve Edat Yapıları", "Geniş Zaman"],
            "options": [
              "Etikçiler hayvanlar üzerindeki tehlikeli bilimsel deneylere karşı çıkar mı?",
              "Etikçiler hayvanlar üzerindeki tehlikeli bilimsel deneylere karşı çıkmalı mıdır?",
              "Etikçiler hayvanlar üzerindeki tehlikeli bilimsel deneylere karşı çıktı mı?",
              "Etikçiler hayvanlar üzerindeki tehlikeli bilimsel deneylere karşı çıkacak mı?"
            ],
            "correctIndex": 0,
            "enSentence": "Do ethicists object to dangerous scientific experiments on animals?",
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
            "prompt": "\"Arkeologlar kazı alanında antik bir yazıt buldu mu?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Did archaeologists find an ancient inscription at the excavation site?",
              "Do archaeologists find an ancient inscription at the excavation site?",
              "Are archaeologists finding an ancient inscription at the excavation site?",
              "Have archaeologists found an ancient inscription at the excavation site?"
            ],
            "correctIndex": 0,
            "enSentence": "Did archaeologists find an ancient inscription at the excavation site?",
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
            "prompt": "\"Psikolog hastanın çocukluk anılarını analiz etti mi?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Did the psychologist analyze the childhood memories of the patient?",
              "Does the psychologist analyze the childhood memories of the patient?",
              "Is the psychologist analyzing the childhood memories of the patient?",
              "Has the psychologist analyzed the childhood memories of the patient?"
            ],
            "correctIndex": 0,
            "enSentence": "Did the psychologist analyze the childhood memories of the patient?",
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
              {"left": "Did constitutional scholars debate the limits of executive power?", "right": "Anayasa bilginleri yürütme gücünün sınırlarını tartıştılar mı?"},
              {"left": "Do sociologists link urbanization to changes in family structure?", "right": "Sosyologlar kentleşmeyi aile yapısındaki değişimlere bağlar mı?"},
              {"left": "Were there substantial difficulties in deciphering the ancient script?", "right": "Antik el yazısını çözmede önemli zorluklar var mıydı?"}
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
            "prompt": "\"Tarihçiler arşivdeki belgelerin doğruluğunu teyit etti mi?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Did historians confirm the authenticity of the documents in the archive?",
              "Do historians confirm the authenticity of the documents in the archive?",
              "Are historians confirming the authenticity of the documents in the archive?",
              "Have historians confirmed the authenticity of the documents in the archive?"
            ],
            "correctIndex": 0,
            "enSentence": "Did historians confirm the authenticity of the documents in the archive?",
            "isEngToTr": False
          },
          {
            "id": "u9l24_q21",
            "type": "fill-blank",
            "prompt": "Geçmiş zaman yardımcı fiili seçin: \"___ the psychological experiment demonstrate a clear link between stress and cognitive performance?\"",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "Fiil ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["Did", "Does", "Has", "Was"],
            "correctIndex": 0,
            "enSentence": "Did the psychological experiment demonstrate a clear link between stress and cognitive performance?"
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
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Was there any direct connection between economic policy and social reform?\"",
            "grammarTags": ["Soru Yapıları", "Var / Yok İfadeleri", "İsim Tamlamaları", "İsim ve Edat Yapıları"],
            "translation": "Was there any direct connection between economic policy and social reform?",
            "words": ["Ekonomik", "politika", "ile", "sosyal", "reform", "arasında", "doğrudan", "bir", "bağlantı", "var", "mıydı", "arkeoloji"],
            "correctOrder": ["Ekonomik", "politika", "ile", "sosyal", "reform", "arasında", "doğrudan", "bir", "bağlantı", "var", "mıydı"],
            "enSentence": "Was there any direct connection between economic policy and social reform?",
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
            "prompt": "\"Filozoflar ahlak ile hukuk arasındaki ayrımı açıkça tanımladı mı?\" cümlesini İngilizce'ye çevirin:",
            "grammarTags": ["Soru Yapıları", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "correctSentence": "Did philosophers clearly define the distinction between morality and law?",
            "enSentence": "Did philosophers clearly define the distinction between morality and law?",
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
              {"left": "Why did the philosopher write the text?", "right": "Filozof metni neden yazdı?"},
              {"left": "Where is the historical archive located?", "right": "Tarihi arşiv nerede yer almaktadır?"},
              {"left": "What caused the economic crisis?", "right": "Ekonomik krize ne sebep oldu?"},
              {"left": "Who analyzed the psychological data?", "right": "Psikolojik verileri kim analiz etti?"}
            ]
          },
          {
            "id": "u9l25_m2",
            "type": "matching",
            "prompt": "Sosyoloji ve hukuk alanındaki Wh- soru kalıplarını eşleştirin.",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "SVO Yapısı"],
            "pairs": [
              {"left": "When did parliament pass the law?", "right": "Parlamento yasayı ne zaman çıkardı?"},
              {"left": "How do sociologists measure poverty?", "right": "Sosyologlar yoksulluğu nasıl ölçer?"},
              {"left": "Which method is suitable for research?", "right": "Araştırma için hangi yöntem uygundur?"},
              {"left": "Whose theory explains social change?", "right": "Toplumsal değişimi kimin teorisi açıklar?"}
            ]
          },
          {
            "id": "u9l25_q1",
            "type": "multiple-choice",
            "prompt": "\"Why did the director choose a realistic style in the film?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Yönetmen filmde neden gerçekçi bir tarz seçti?",
              "Yönetmen filmde neden gerçekçi bir tarz seçebilir?",
              "Yönetmen filmde neden gerçekçi bir tarz seçmelidir?",
              "Yönetmen filmde neden gerçekçi bir tarz seçecek?"
            ],
            "correctIndex": 0,
            "enSentence": "Why did the director choose a realistic style in the film?",
            "isEngToTr": True
          },
          {
            "id": "u9l25_q2",
            "type": "fill-blank",
            "prompt": "Soru kelimesini seçin: \"___ did the historians find the ancient manuscripts?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["Where", "Why", "Who", "What"],
            "correctIndex": 0,
            "enSentence": "Where did the historians find the ancient manuscripts?"
          },
          {
            "id": "u9l25_q3",
            "type": "multiple-choice",
            "prompt": "\"Sosyologlar toplumsal yapıyı nasıl tanımlar?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "SVO Yapısı", "Geniş Zaman"],
            "options": [
              "How do sociologists define social structure?",
              "Why do sociologists define social structure?",
              "When do sociologists define social structure?",
              "Where do sociologists define social structure?"
            ],
            "correctIndex": 0,
            "enSentence": "How do sociologists define social structure?",
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
            "prompt": "\"What did the research team discover during the psychological experiment?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Araştırma ekibi psikolojik deney sırasında ne keşfetti?",
              "Araştırma ekibi psikolojik deney sırasında ne keşfedebilir?",
              "Araştırma ekibi psikolojik deney sırasında ne keşfetmeli?",
              "Araştırma ekibi psikolojik deney sırasında ne keşfedecek?"
            ],
            "correctIndex": 0,
            "enSentence": "What did the research team discover during the psychological experiment?",
            "isEngToTr": True
          },
          {
            "id": "u9l25_q6",
            "type": "fill-blank",
            "prompt": "Soru kelimesini seçin: \"___ authority issued the new legal decree?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["Whose", "Why", "Where", "How"],
            "correctIndex": 0,
            "enSentence": "Whose authority issued the new legal decree?"
          },
          {
            "id": "u9l25_q7",
            "type": "translation-text",
            "prompt": "\"When did the ethics committee review the proposed research project?\" cümlesini Türkçe'ye çevirin:",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "correctSentence": "Etik komitesi önerilen araştırma projesini ne zaman gözden geçirdi?",
            "enSentence": "When did the ethics committee review the proposed research project?",
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
              {"left": "Why did scholars challenge the classical theory?", "right": "Bilginler klasik teoriye neden meydan okudu?"},
              {"left": "How does the legal system protect civil liberties?", "right": "Hukuk sistemi sivil özgürlükleri nasıl korur?"},
              {"left": "What caused the shift in economic policy?", "right": "Ekonomi politikasındaki değişime ne sebep oldu?"},
              {"left": "Where did archaeologists excavate the ancient ruins?", "right": "Arkeologlar antik harabeleri nerede kazdı?"}
            ]
          },
          {
            "id": "u9l25_q9",
            "type": "multiple-choice",
            "prompt": "\"How do psychologists explain the emotional development of individuals?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geniş Zaman"],
            "options": [
              "Psikologlar bireylerin duygusal gelişimini nasıl açıklar?",
              "Psikologlar bireylerin duygusal gelişimini nasıl açıklayabilir?",
              "Psikologlar bireylerin duygusal gelişimini nasıl açıklamalıdır?",
              "Psikologlar bireylerin duygusal gelişimini nasıl açıkladı?"
            ],
            "correctIndex": 0,
            "enSentence": "How do psychologists explain the emotional development of individuals?",
            "isEngToTr": True
          },
          {
            "id": "u9l25_q10",
            "type": "fill-blank",
            "prompt": "Soru kelimesini seçin: \"___ factor influenced the voting behavior of the citizens?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["Which", "Where", "Why", "When"],
            "correctIndex": 0,
            "enSentence": "Which factor influenced the voting behavior of the citizens?"
          },
          {
            "id": "u9l25_q11",
            "type": "multiple-choice",
            "prompt": "\"Sinema eleştirmenleri filmin sembolik anlamını nasıl değerlendirdi?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "How did film critics evaluate the symbolic meaning of the movie?",
              "Why did film critics evaluate the symbolic meaning of the movie?",
              "Where did film critics evaluate the symbolic meaning of the movie?",
              "When did film critics evaluate the symbolic meaning of the movie?"
            ],
            "correctIndex": 0,
            "enSentence": "How did film critics evaluate the symbolic meaning of the movie?",
            "isEngToTr": False
          },
          {
            "id": "u9l25_q12",
            "type": "fill-blank",
            "prompt": "Boşluğu tamamlayın: \"___ did the legal scholar publish the article on constitutional law?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["When", "Who", "What", "Whose"],
            "correctIndex": 0,
            "enSentence": "When did the legal scholar publish the article on constitutional law?"
          },
          {
            "id": "u9l25_q13",
            "type": "multiple-choice",
            "prompt": "\"Whose philosophy influenced the founding principles of modern democracy?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Modern demokrasinin kurucu ilkelerini kimin felsefesi etkiledi?",
              "Modern demokrasinin kurucu ilkelerini kimin felsefesi etkileyebilir?",
              "Modern demokrasinin kurucu ilkelerini kimin felsefesi etkilemelidir?",
              "Modern demokrasinin kurucu ilkelerini kimin felsefesi etkiliyor?"
            ],
            "correctIndex": 0,
            "enSentence": "Whose philosophy influenced the founding principles of modern democracy?",
            "isEngToTr": True
          },
          {
            "id": "u9l25_q14",
            "type": "fill-blank",
            "prompt": "Neden bildiren soru kelimesini seçin: \"___ did the government modify the corporate tax legislation?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": ["Why", "Where", "Who", "Whose"],
            "correctIndex": 0,
            "enSentence": "Why did the government modify the corporate tax legislation?"
          },
          {
            "id": "u9l25_q15",
            "type": "multiple-choice",
            "prompt": "\"Tarihçiler belgedeki antik yazıtları nerede inceledi?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Where did historians examine the ancient inscriptions on the document?",
              "Why did historians examine the ancient inscriptions on the document?",
              "How did historians examine the ancient inscriptions on the document?",
              "When did historians examine the ancient inscriptions on the document?"
            ],
            "correctIndex": 0,
            "enSentence": "Where did historians examine the ancient inscriptions on the document?",
            "isEngToTr": False
          },
          {
            "id": "u9l25_q16",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Why did the research team isolate the experimental variables?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "Why did the research team isolate the experimental variables?",
            "words": ["Araştırma", "ekibi", "deneysel", "değişkenleri", "neden", "izole", "etti", "hukuk", "yasa"],
            "correctOrder": ["Araştırma", "ekibi", "deneysel", "değişkenleri", "neden", "izole", "etti"],
            "enSentence": "Why did the research team isolate the experimental variables?",
            "isEngToTr": True
          },
          {
            "id": "u9l25_q17",
            "type": "word-bank",
            "prompt": "Cümlenin İngilizce karşılığını doğru sırayla oluşturun: \"Sosyologlar toplumsal sınıf krizini nasıl analiz eder?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "SVO Yapısı", "Geniş Zaman"],
            "translation": "Sosyologlar toplumsal sınıf krizini nasıl analiz eder?",
            "words": ["How", "do", "sociologists", "analyze", "the", "social", "class", "crisis", "ethics", "history"],
            "correctOrder": ["How", "do", "sociologists", "analyze", "the", "social", "class", "crisis"],
            "enSentence": "How do sociologists analyze the social class crisis?",
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
              {"left": "Why did the supreme court challenge the validity of the legislation?", "right": "Anayasa Mahkemesi mevzuatın geçerliliğini neden sorguladı?"},
              {"left": "How do economists calculate the long-term impact of inflation?", "right": "Ekonomistler enflasyonun uzun vadeli etkisini nasıl hesaplar?"},
              {"left": "What methodological framework did the psychologist adopt for the study?", "right": "Psikolog çalışma için hangi metodolojik çerçeveyi benimsedi?"},
              {"left": "Where did the archaeologist discover the imperial inscriptions?", "right": "Arkeolog imparatorluk yazıtlarını nerede keşfetti?"}
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
            "prompt": "\"Tarihçiler antik kentin yıkımına ilişkin arşivsel kanıtları nerede buldu?\" cümlesinin İngilizce karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Where did historians find archival evidence regarding the destruction of the ancient city?",
              "Why did historians find archival evidence regarding the destruction of the ancient city?",
              "How did historians find archival evidence regarding the destruction of the ancient city?",
              "When did historians find archival evidence regarding the destruction of the ancient city?"
            ],
            "correctIndex": 0,
            "enSentence": "Where did historians find archival evidence regarding the destruction of the ancient city?",
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
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Why did the philosopher criticize the ethical framework of modern materialism?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "Why did the philosopher criticize the ethical framework of modern materialism?",
            "words": ["Filozof", "modern", "materyalizmin", "etik", "çerçevesini", "neden", "eleştirdi", "hukuk", "yasa"],
            "correctOrder": ["Filozof", "modern", "materyalizmin", "etik", "çerçevesini", "neden", "eleştirdi"],
            "enSentence": "Why did the philosopher criticize the ethical framework of modern materialism?",
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
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"Whose administrative decision altered the scope of the archaeological excavation?\"",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "Whose administrative decision altered the scope of the archaeological excavation?",
            "words": ["Kimin", "idari", "kararı", "arkeolojik", "kazının", "kapsamını", "değiştirdi", "sosyoloji", "teori"],
            "correctOrder": ["Kimin", "idari", "kararı", "arkeolojik", "kazının", "kapsamını", "değiştirdi"],
            "enSentence": "Whose administrative decision altered the scope of the archaeological excavation?",
            "isEngToTr": True
          },
          {
            "id": "u9l25_q25",
            "type": "translation-text",
            "prompt": "\"What primary sources did the historian analyze in the national library?\" cümlesini Türkçe'ye çevirin:",
            "grammarTags": ["Soru Yapıları (Wh-)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "correctSentence": "Tarihçi milli kütüphanede hangi birincil kaynakları analiz etti?",
            "enSentence": "What primary sources did the historian analyze in the national library?",
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
              {"left": "In which century did the empire collapse?", "right": "İmparatorluk hangi yüzyılda çöktü?"},
              {"left": "Under whose authority did the court act?", "right": "Mahkeme kimin yetkisi altında hareket etti?"},
              {"left": "Didn't the psychologist examine the patient?", "right": "Psikolog hastayı incelemedi mi?"},
              {"left": "Isn't the legal framework clear?", "right": "Yasal çerçeve açık değil midir?"}
            ]
          },
          {
            "id": "u9l26_m2",
            "type": "matching",
            "prompt": "Teyit soruları (Tag questions) ve edatlı soruları eşleştirin.",
            "grammarTags": ["Soru Yapıları (Tag Question)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Teyit Sorusu"],
            "pairs": [
              {"left": "The scholar wrote the article, didn't he?", "right": "Bilgin makaleyi yazdı, değil mi?"},
              {"left": "The theory is valid, isn't it?", "right": "Teori geçerlidir, değil mi?"},
              {"left": "For what purpose did they gather data?", "right": "Hangi amaçla veri topladılar?"},
              {"left": "To what extent did policy change?", "right": "Politika ne ölçüde değişti?"}
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
            "prompt": "\"In which century did parliamentary sovereignty become the dominant political norm?\" cümlesini Türkçe'ye çevirin:",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "correctSentence": "Parlamento egemenliği hangi yüzyılda hakim siyasi norm haline geldi?",
            "enSentence": "In which century did parliamentary sovereignty become the dominant political norm?",
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
              {"left": "Philosophers rarely accept dogma without verification, do they?", "right": "Filozoflar dogmayı doğrulama olmaksızın nadiren kabul eder, değil mi?"},
              {"left": "For what reason did economists modify the forecast?", "right": "Ekonomistler tahmini ne sebepten değiştirdi?"},
              {"left": "Didn't ancient trade networks facilitate cultural exchange?", "right": "Antik ticaret ağları kültürel değişimi kolaylaştırmadı mı?"},
              {"left": "In which historical period did trade flourish?", "right": "Ticaret hangi tarihsel dönemde gelişti?"}
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
            "prompt": "\"In which historical epoch did constitutional monarchy emerge as a stable governance model?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "options": [
              "Anayasal monarşi hangi tarihsel çağda istikrarlı bir yönetim modeli olarak ortaya çıktı?",
              "Anayasal monarşi hangi tarihsel çağda istikrarlı bir yönetim modeli olarak ortaya çıkabilir?",
              "Anayasal monarşi hangi tarihsel çağda istikrarlı bir yönetim modeli olarak ortaya çıkmalıdır?",
              "Anayasal monarşi hangi tarihsel çağda istikrarlı bir yönetim modeli olarak ortaya çıkıyor?"
            ],
            "correctIndex": 0,
            "enSentence": "In which historical epoch did constitutional monarchy emerge as a stable governance model?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q14",
            "type": "fill-blank",
            "prompt": "Teyit sorusu eklentisini doldurun: \"The economic analyst evaluated the financial budget, ___?\"",
            "grammarTags": ["Soru Yapıları (Tag Question)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Teyit Sorusu"],
            "options": ["didn't he", "isn't he", "wasn't he", "doesn't he"],
            "correctIndex": 0,
            "enSentence": "The economic analyst evaluated the financial budget, didn't he?"
          },
          {
            "id": "u9l26_q15",
            "type": "multiple-choice",
            "prompt": "\"Aren't human rights inherent to all individuals regardless of citizenship status?\" cümlesinin Türkçe karşılığı hangisidir?",
            "grammarTags": ["Soru Yapıları (Olumsuz Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Olumsuz Soru"],
            "options": [
              "Vatandaşlık durumuna bakılmaksızın insan hakları tüm bireylerin doğasında yok mudur?",
              "Vatandaşlık durumuna bakılmaksızın insan hakları tüm bireylerin doğasında olamaz mı?",
              "Vatandaşlık durumuna bakılmaksızın insan hakları tüm bireylerin doğasında olmalı mıdır?",
              "Vatandaşlık durumuna bakılmaksızın insan hakları tüm bireylerin doğasında var mıdır?"
            ],
            "correctIndex": 0,
            "enSentence": "Aren't human rights inherent to all individuals regardless of citizenship status?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q16",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"To what extent did enlightenment philosophy influence the draft of the constitution?\"",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "To what extent did enlightenment philosophy influence the draft of the constitution?",
            "words": ["Aydınlanma", "felsefesi", "anayasa", "taslağını", "ne", "ölçüde", "etkiledi", "psikoloji", "sinema"],
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
            "words": ["Antik", "ticaret", "ağları", "Doğu", "ile", "Batı", "arasında", "kültürel", "değişimi", "kolaylaştırmadı", "mı", "sosyoloji"],
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
              {"left": "On what philosophical grounds did Locke defend religious toleration?", "right": "Locke hangi felsefi temellerde dini hoşgörüyü savundu?"},
              {"left": "Isn't freedom of speech crucial for sustaining democratic debate?", "right": "İfade özgürlüğü demokratik tartışmayı sürdürmek için hayati değil midir?"},
              {"left": "From which ancient civilization did the legal system inherit its principles?", "right": "Hukuk sistemi ilkelerini hangi antik uygarlıktan devraldı?"},
              {"left": "Didn't the economic crisis precipitate the fall of the ruling government?", "right": "Ekonomik kriz iktidar hükümetinin düşüşünü hızlandırmadı mı?"}
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
            "prompt": "Tag question olumsuz eklentisini doldurun: \"The ethics committee approved the new experimental procedure, ___?\"",
            "grammarTags": ["Soru Yapıları (Tag Question)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Teyit Sorusu"],
            "options": ["didn't it", "isn't it", "wasn't it", "doesn't it"],
            "correctIndex": 0,
            "enSentence": "The ethics committee approved the new experimental procedure, didn't it?"
          },
          {
            "id": "u9l26_q22",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"From which ancient civilization did the legal system inherit its core principles?\"",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "From which ancient civilization did the legal system inherit its core principles?",
            "words": ["Hukuk", "sistemi", "temel", "ilkelerini", "hangi", "antik", "uygarlıktan", "devraldı", "psikoloji", "sinema"],
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
            "words": ["Şiddetli", "ekonomik", "kriz", "parlamenter", "hükümetin", "çöküşünü", "hızlandırmadı", "mı", "felsefe", "tarih"],
            "correctOrder": ["Şiddetli", "ekonomik", "kriz", "parlamenter", "hükümetin", "çöküşünü", "hızlandırmadı", "mı"],
            "enSentence": "Didn't the severe economic crisis precipitate the collapse of the parliamentary government?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q24",
            "type": "word-bank",
            "prompt": "Cümlenin Türkçe karşılığını doğru sırayla oluşturun: \"To what extent did maritime trade shape the culture of ancient coastal city-states?\"",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "translation": "To what extent did maritime trade shape the culture of ancient coastal city-states?",
            "words": ["Deniz", "ticareti", "antik", "kıyı", "şehir", "devletlerinin", "kültürünü", "ne", "ölçüde", "şekillendirdi", "sosyoloji"],
            "correctOrder": ["Deniz", "ticareti", "antik", "kıyı", "şehir", "devletlerinin", "kültürünü", "ne", "ölçüde", "şekillendirdi"],
            "enSentence": "To what extent did maritime trade shape the culture of ancient coastal city-states?",
            "isEngToTr": True
          },
          {
            "id": "u9l26_q25",
            "type": "translation-text",
            "prompt": "\"For what strategic purpose did the military alliance build fortified outposts along the frontier?\" cümlesini Türkçe'ye çevirin:",
            "grammarTags": ["Soru Yapıları (Edatlı Soru)", "İsim Tamlamaları", "İsim ve Edat Yapıları", "Geçmiş Zaman"],
            "correctSentence": "Askeri ittifak sınır boyunca hangi stratejik amaçla müstahkem karakollar inşa etti?",
            "enSentence": "For what strategic purpose did the military alliance build fortified outposts along the frontier?",
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

# Calculate word recycling percentage
u9_words = set()
for l_id, l_data in unit9_data.items():
    for ex in l_data["exercises"]:
        for q in ex["questions"]:
            text = ""
            if "enSentence" in q: text += " " + q["enSentence"]
            if "pairs" in q:
                for p in q["pairs"]: text += " " + p["left"] + " " + p["right"]
            if "options" in q: text += " " + " ".join(q["options"])
            tokens = re.findall(r'\b[a-zA-Z]{3,}\b', text)
            for t in tokens:
                u9_words.add(t.lower())

recycled_count = len(u9_words.intersection(u70_en_words))
recycled_pct = (recycled_count / len(u70_en_words)) * 100
print(f"Total unique words in new Section 7: {len(u9_words)}")
print(f"Recycled words from Section 6: {recycled_count} ({recycled_pct:.1f}%)")

# Write python logic to patch data.js with unit9_data cleanly
