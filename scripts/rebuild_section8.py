import re
import json

# Define the new Unit 12 single lesson exercises object
new_unit_12 = {
    "1": {
        "exercises": [
            {
                "id": "u12l1ex1",
                "title": "Alıştırma 1: Öbek Düzeyi (Participle Nitelemeleri ve Sıfat Öbekleri)",
                "description": "Etken (-ing) ve edilgen (-ed/V3) participle sıfatları ile isim niteleme öbeklerinin analizi.",
                "questions": [
                    {
                        "id": "u12l1_ex1_q1",
                        "type": "matching",
                        "prompt": "İfadeleri Türkçe karşılıklarıyla eşleştirin.",
                        "grammarTags": ["Participle Yapıları", "Present Participle Sıfatı", "İsim Tamlamaları"],
                        "pairs": [
                            {"left": "scholars challenging the classical theory", "right": "klasik teoriye meydan okuyan bilginler"},
                            {"left": "laws protecting civil liberties", "right": "sivil özgürlükleri koruyan yasalar"},
                            {"left": "factors influencing voting behavior", "right": "oy verme davranışını etkileyen faktörler"},
                            {"left": "archaeologists excavating ancient ruins", "right": "antik harabeleri kazan arkeologlar"}
                        ]
                    },
                    {
                        "id": "u12l1_ex1_q2",
                        "type": "multiple-choice",
                        "prompt": "\"scholars challenging the classical theory\" ifadesinin Türkçe karşılığı hangisidir?",
                        "grammarTags": ["Participle Yapıları", "Present Participle Sıfatı", "İsim Tamlamaları"],
                        "options": [
                            "Klasik teoriye meydan okuyan bilginler",
                            "Klasik teoriyi savunan bilginler",
                            "Klasik teoriyi eleştiren öğrenciler",
                            "Klasik teori üzerine yazan araştırmacılar"
                        ],
                        "correctIndex": 0,
                        "enSentence": "scholars challenging the classical theory",
                        "isEngToTr": True
                    },
                    {
                        "id": "u12l1_ex1_q3",
                        "type": "multiple-choice",
                        "prompt": "\"laws protecting civil liberties\" ifadesinin Türkçe karşılığı hangisidir?",
                        "grammarTags": ["Participle Yapıları", "Present Participle Sıfatı", "İsim ve Edat Yapıları"],
                        "options": [
                            "Sivil özgürlükleri koruyan yasalar",
                            "Sivil özgürlükleri kısıtlayan yasalar",
                            "Sivil hakları değiştiren mahkemeler",
                            "Sivil anayasayı hazırlayan parlamentolar"
                        ],
                        "correctIndex": 0,
                        "enSentence": "laws protecting civil liberties",
                        "isEngToTr": True
                    },
                    {
                        "id": "u12l1_ex1_q4",
                        "type": "fill-blank-dropdown",
                        "prompt": "Boşluğa gelebilecek en uygun participle sıfatını seçin:",
                        "grammarTags": ["Participle Yapıları", "Present Participle Sıfatı", "İsim ve Edat Yapıları"],
                        "sentence": "factors [influencing] the voting behavior of citizens",
                        "options": ["influencing", "influenced", "influence", "to influence"],
                        "correctIndex": 0,
                        "translation": "vatandaşların oy verme davranışını etkileyen faktörler"
                    },
                    {
                        "id": "u12l1_ex1_q5",
                        "type": "fill-blank-dropdown",
                        "prompt": "Boşluğa gelebilecek en uygun participle sıfatını seçin:",
                        "grammarTags": ["Participle Yapıları", "Past Participle Sıfatı", "İsim ve Edat Yapıları"],
                        "sentence": "historical documents [preserved] in national archives",
                        "options": ["preserved", "preserving", "preserve", "to preserve"],
                        "correctIndex": 0,
                        "translation": "ulusal arşivlerde korunan tarihsel belgeler"
                    },
                    {
                        "id": "u12l1_ex1_q6",
                        "type": "matching",
                        "prompt": "İfadeleri Türkçe karşılıklarıyla eşleştirin.",
                        "grammarTags": ["Participle Yapıları", "Past Participle Sıfatı", "İsim ve Edat Yapıları"],
                        "pairs": [
                            {"left": "film critics evaluating symbolic meaning", "right": "sembolik anlamı değerlendiren sinema eleştirmenleri"},
                            {"left": "economic policies driving market trends", "right": "piyasa eğilimlerini yönlendiren ekonomi politikaları"},
                            {"left": "historical documents preserved in archives", "right": "arşivlerde korunan tarihsel belgeler"},
                            {"left": "reforms passed by parliament", "right": "parlamento tarafından kabul edilen reformlar"}
                        ]
                    },
                    {
                        "id": "u12l1_ex1_q7",
                        "type": "multiple-choice",
                        "prompt": "\"film critics evaluating symbolic meaning\" ifadesinin Türkçe karşılığı hangisidir?",
                        "grammarTags": ["Participle Yapıları", "Present Participle Sıfatı", "İsim Tamlamaları"],
                        "options": [
                            "Sembolik anlamı değerlendiren sinema eleştirmenleri",
                            "Sembolik anlamı eleştiren senaristler",
                            "Sinema tarihini inceleyen eleştirmenler",
                            "Filmin konusunu açıklayan yönetmenler"
                        ],
                        "correctIndex": 0,
                        "enSentence": "film critics evaluating symbolic meaning",
                        "isEngToTr": True
                    },
                    {
                        "id": "u12l1_ex1_q8",
                        "type": "multiple-choice",
                        "prompt": "\"economic policies driving market trends\" ifadesinin Türkçe karşılığı hangisidir?",
                        "grammarTags": ["Participle Yapıları", "Present Participle Sıfatı", "İsim Tamlamaları"],
                        "options": [
                            "Piyasa eğilimlerini yönlendiren ekonomi politikaları",
                            "Piyasa koşullarını değiştiren iktisatçılar",
                            "Ekonomik krizi önleyen politikalar",
                            "Piyasayı denetleyen iktisat kurumları"
                        ],
                        "correctIndex": 0,
                        "enSentence": "economic policies driving market trends",
                        "isEngToTr": True
                    },
                    {
                        "id": "u12l1_ex1_q9",
                        "type": "fill-blank-dropdown",
                        "prompt": "Boşluğa gelebilecek en uygun participle sıfatını seçin:",
                        "grammarTags": ["Participle Yapıları", "Present Participle Sıfatı", "İsim ve Edat Yapıları"],
                        "sentence": "psychologists [analyzing] emotional development during therapy",
                        "options": ["analyzing", "analyzed", "analyze", "to analyze"],
                        "correctIndex": 0,
                        "translation": "terapi sırasında duygusal gelişimi analiz eden psikologlar"
                    },
                    {
                        "id": "u12l1_ex1_q10",
                        "type": "fill-blank-dropdown",
                        "prompt": "Boşluğa gelebilecek en uygun participle sıfatını seçin:",
                        "grammarTags": ["Participle Yapıları", "Past Participle Sıfatı", "İsim ve Edat Yapıları"],
                        "sentence": "artifacts [recovered] from ancient ruins",
                        "options": ["recovered", "recovering", "recover", "to recover"],
                        "correctIndex": 0,
                        "translation": "antik harabelerden çıkarılan eserler"
                    },
                    {
                        "id": "u12l1_ex1_q11",
                        "type": "multiple-choice",
                        "prompt": "\"reforms passed by parliament\" ifadesinin Türkçe karşılığı hangisidir?",
                        "grammarTags": ["Participle Yapıları", "Past Participle Sıfatı", "Edilgen Çatı"],
                        "options": [
                            "Parlamento tarafından kabul edilen reformlar",
                            "Parlamento tarafından reddedilen yasalar",
                            "Parlamentoya sunulan anayasal taslaklar",
                            "Parlamentoda tartışılan düzenlemeler"
                        ],
                        "correctIndex": 0,
                        "enSentence": "reforms passed by parliament",
                        "isEngToTr": True
                    },
                    {
                        "id": "u12l1_ex1_q12",
                        "type": "fill-blank-dropdown",
                        "prompt": "Boşluğa gelebilecek en uygun participle sıfatını seçin:",
                        "grammarTags": ["Participle Yapıları", "Present Participle Sıfatı", "İsim Tamlamaları"],
                        "sentence": "researchers [investigating] cognitive processes",
                        "options": ["investigating", "investigated", "investigate", "to investigate"],
                        "correctIndex": 0,
                        "translation": "bilişsel süreçleri araştıran araştırmacılar"
                    }
                ]
            },
            {
                "id": "u12l1ex2",
                "title": "Alıştırma 2: Cümle Düzeyi (Cümle İçinde Participle ve Kısaltma Yapıları)",
                "description": "Etken ve edilgen eylemsilerin cümle içi nitelemeleri ve sıfat cümlesi kısaltmaları.",
                "questions": [
                    {
                        "id": "u12l1_ex2_q1",
                        "type": "multiple-choice",
                        "prompt": "\"Researchers investigating cognitive processes published a sociological study.\" cümlesinin Türkçe karşılığı hangisidir?",
                        "grammarTags": ["Participle Yapıları", "Cümlecik Kısaltması", "SVO Yapısı", "Geçmiş Zaman"],
                        "options": [
                            "Bilişsel süreçleri araştıran araştırmacılar sosyolojik bir çalışma yayımladı.",
                            "Bilişsel süreçleri inceleyen psikologlar yeni bir makale yayımladı.",
                            "Araştırmacılar sosyolojik çalışmayı tamamladıktan sonra bilişsel süreçleri araştırdı.",
                            "Sosyolojik çalışma yayımlayan araştırmacılar bilişsel süreçleri gözlemledi."
                        ],
                        "correctIndex": 0,
                        "enSentence": "Researchers investigating cognitive processes published a sociological study.",
                        "isEngToTr": True
                    },
                    {
                        "id": "u12l1_ex2_q2",
                        "type": "multiple-choice",
                        "prompt": "\"Historical documents preserved in archives belong to the cultural heritage of the nation.\" cümlesinin Türkçe karşılığı hangisidir?",
                        "grammarTags": ["Participle Yapıları", "Cümlecik Kısaltması", "İsim ve Edat Yapıları", "Geniş Zaman"],
                        "options": [
                            "Arşivlerde korunan tarihsel belgeler ulusun kültürel mirasına aittir.",
                            "Ulusal arşivlerdeki tarihsel belgeler kültürel mirası korumaktadır.",
                            "Kültürel mirasa ait belgeler tarihçiler tarafından arşivde saklanmıştır.",
                            "Tarihsel belgeleri inceleyen araştırmacılar ulusal arşive katılmıştır."
                        ],
                        "correctIndex": 0,
                        "enSentence": "Historical documents preserved in archives belong to the cultural heritage of the nation.",
                        "isEngToTr": True
                    },
                    {
                        "id": "u12l1_ex2_q3",
                        "type": "fill-blank-dropdown",
                        "prompt": "Boşluğa gelebilecek en uygun participle yapısını seçin:",
                        "grammarTags": ["Participle Yapıları", "Present Participle Sıfatı", "SVO Yapısı"],
                        "sentence": "The legal system [protecting] civil liberties ensures justice in court.",
                        "options": ["protecting", "protected", "protect", "to protect"],
                        "correctIndex": 0,
                        "translation": "Sivil özgürlükleri koruyan hukuk sistemi mahkemede adaleti sağlar."
                    },
                    {
                        "id": "u12l1_ex2_q4",
                        "type": "fill-blank-dropdown",
                        "prompt": "Boşluğa gelebilecek en uygun participle yapısını seçin:",
                        "grammarTags": ["Participle Yapıları", "Past Participle Sıfatı", "Edilgen Çatı"],
                        "sentence": "Constitutional reforms [passed] by parliament altered the voting behavior of citizens.",
                        "options": ["passed", "passing", "pass", "to pass"],
                        "correctIndex": 0,
                        "translation": "Parlamento tarafından kabul edilen anayasal reformlar vatandaşların oy verme davranışını değiştirdi."
                    },
                    {
                        "id": "u12l1_ex2_q5",
                        "type": "fill-blank",
                        "prompt": "Boşluğa uygun olan eylemsi (-ing) ekini klavyeden yazarak tamamlayın: \"Archaeologists excavat___ ancient ruins discovered a forgotten temple.\"",
                        "grammarTags": ["Participle Yapıları", "Present Participle Sıfatı", "Geçmiş Zaman"],
                        "sentence": "Archaeologists excavat[ing] ancient ruins discovered a forgotten temple.",
                        "correctAnswer": "ing",
                        "translation": "Antik harabeleri kazan arkeologlar unutulmuş bir tapınak keşfetti."
                    },
                    {
                        "id": "u12l1_ex2_q6",
                        "type": "word-bank",
                        "prompt": "Kelimeleri doğru sıraya dizerek Türkçe çeviriyi oluşturun: \"Film critics evaluating symbolic meaning wrote detailed articles.\"",
                        "grammarTags": ["Participle Yapıları", "Cümlecik Kısaltması", "SVO Yapısı"],
                        "words": ["Sembolik anlamı", "değerlendiren", "sinema eleştirmenleri", "detaylı makaleler", "yazdı."],
                        "correctOrder": ["Sembolik anlamı", "değerlendiren", "sinema eleştirmenleri", "detaylı makaleler", "yazdı."],
                        "translation": "Sembolik anlamı değerlendiren sinema eleştirmenleri detaylı makaleler yazdı."
                    },
                    {
                        "id": "u12l1_ex2_q7",
                        "type": "multiple-choice",
                        "prompt": "\"Economic policies driving market trends caused a sudden shift in urban growth.\" cümlesinin Türkçe karşılığı hangisidir?",
                        "grammarTags": ["Participle Yapıları", "Present Participle Sıfatı", "İsim Tamlamaları"],
                        "options": [
                            "Piyasa eğilimlerini yönlendiren ekonomi politikaları kentsel büyümede ani bir kaymaya neden oldu.",
                            "Kentsel büyümeyi etkileyen ekonomi politikaları piyasa eğilimlerini değiştirdi.",
                            "Ekonomik kriz nedeniyle kentsel büyümede ani bir değişim yaşandı.",
                            "Piyasa eğilimlerini inceleyen iktisatçılar kentsel büyümeyi analiz etti."
                        ],
                        "correctIndex": 0,
                        "enSentence": "Economic policies driving market trends caused a sudden shift in urban growth.",
                        "isEngToTr": True
                    },
                    {
                        "id": "u12l1_ex2_q8",
                        "type": "fill-blank-dropdown",
                        "prompt": "Boşluğa gelebilecek en uygun participle yapısını seçin:",
                        "grammarTags": ["Participle Yapıları", "Present Participle Sıfatı", "İsim ve Edat Yapıları"],
                        "sentence": "Psychologists [analyzing] emotional development of individuals recommended regular therapy.",
                        "options": ["analyzing", "analyzed", "analyze", "to analyze"],
                        "correctIndex": 0,
                        "translation": "Bireylerin duygusal gelişimini analiz eden psikologlar düzenli terapi önerdi."
                    },
                    {
                        "id": "u12l1_ex2_q9",
                        "type": "fill-blank",
                        "prompt": "Boşluğa uygun olan eylemsi (-ed) ekini klavyeden yazarak tamamlayın: \"Evidence present___ in court convinced the judge.\"",
                        "grammarTags": ["Participle Yapıları", "Past Participle Sıfatı", "Geçmiş Zaman"],
                        "sentence": "Evidence present[ed] in court convinced the judge.",
                        "correctAnswer": "ed",
                        "translation": "Mahkemede sunulan deliller hakimi ikna etti."
                    },
                    {
                        "id": "u12l1_ex2_q10",
                        "type": "word-bank",
                        "prompt": "Kelimeleri doğru sıraya dizerek Türkçe çeviriyi oluşturun: \"Artifacts recovered from the temple are displayed in the museum.\"",
                        "grammarTags": ["Participle Yapıları", "Past Participle Sıfatı", "Edilgen Çatı"],
                        "words": ["Tapınaktan", "çıkarılan", "eserler", "müzede", "sergilenmektedir."],
                        "correctOrder": ["Tapınaktan", "çıkarılan", "eserler", "müzede", "sergilenmektedir."],
                        "translation": "Tapınaktan çıkarılan eserler müzede sergilenmektedir."
                    },
                    {
                        "id": "u12l1_ex2_q11",
                        "type": "multiple-choice",
                        "prompt": "\"Citizens participating in elections determine the future of the nation.\" cümlesinin Türkçe karşılığı hangisidir?",
                        "grammarTags": ["Participle Yapıları", "Present Participle Sıfatı", "Geniş Zaman"],
                        "options": [
                            "Seçimlere katılan vatandaşlar ulusun geleceğini belirler.",
                            "Vatandaşlar seçimlere katılarak yeni parlamentoyu seçer.",
                            "Ulusun geleceğini düşünen vatandaşlar sandığa gider.",
                            "Seçimleri kazanan adaylar ulusun geleceğini şekillendirir."
                        ],
                        "correctIndex": 0,
                        "enSentence": "Citizens participating in elections determine the future of the nation.",
                        "isEngToTr": True
                    },
                    {
                        "id": "u12l1_ex2_q12",
                        "type": "fill-blank-dropdown",
                        "prompt": "Boşluğa gelebilecek en uygun participle yapısını seçin:",
                        "grammarTags": ["Participle Yapıları", "Past Participle Sıfatı", "Edilgen Çatı"],
                        "sentence": "The classical theory [challenged] by scholars was revised in recent studies.",
                        "options": ["challenged", "challenging", "challenge", "to challenge"],
                        "correctIndex": 0,
                        "translation": "Bilginler tarafından meydan okunan klasik teori son çalışmalarda revize edildi."
                    }
                ]
            },
            {
                "id": "u12l1ex3",
                "title": "Alıştırma 3: İleri Seviye Akademik & Spiralleşme (Akademik Cümle Sentezi)",
                "description": "Participle kısaltmalarının önceki dilbilgisi yapılarıyla (SVO, Soru Cümleleri, Var/Yok, İsim+Edat, Edilgen Çatı, Modallar) harmanlandığı ileri seviye cümle analizi.",
                "questions": [
                    {
                        "id": "u12l1_ex3_q1",
                        "type": "multiple-choice",
                        "prompt": "\"Why did scholars study historical documents preserved in national archives?\" cümlesinin Türkçe karşılığı hangisidir?",
                        "grammarTags": ["Participle Yapıları", "Soru Yapıları (Wh-)", "Past Participle Sıfatı", "Geçmiş Zaman"],
                        "options": [
                            "Bilginler ulusal arşivlerde korunan tarihsel belgeleri neden inceledi?",
                            "Bilginler ulusal arşivlerdeki tarihsel belgeleri nasıl düzenledi?",
                            "Tarihsel belgeleri inceleyen bilginler ulusal arşive ne zaman gitti?",
                            "Bilginler ulusal arşivlerde korunan tarihsel belgeleri nereden buldu?"
                        ],
                        "correctIndex": 0,
                        "enSentence": "Why did scholars study historical documents preserved in national archives?",
                        "isEngToTr": True
                    },
                    {
                        "id": "u12l1_ex3_q2",
                        "type": "multiple-choice",
                        "prompt": "\"There are economic policies driving market trends in developing nations.\" cümlesinin Türkçe karşılığı hangisidir?",
                        "grammarTags": ["Participle Yapıları", "Var / Yok İfadeleri", "Present Participle Sıfatı", "İsim ve Edat Yapıları"],
                        "options": [
                            "Gelişmekte olan uluslarda piyasa eğilimlerini yönlendiren ekonomi politikaları vardır.",
                            "Gelişmekte olan uluslar piyasa eğilimlerini etkileyen ekonomi politikalarını uygular.",
                            "Piyasa eğilimleri gelişmekte olan ulusların ekonomi politikalarını değiştirir.",
                            "Gelişmekte olan uluslarda ekonomi politikalarını belirleyen uzmanlar bulunur."
                        ],
                        "correctIndex": 0,
                        "enSentence": "There are economic policies driving market trends in developing nations.",
                        "isEngToTr": True
                    },
                    {
                        "id": "u12l1_ex3_q3",
                        "type": "multiple-choice",
                        "prompt": "\"How do legal systems protecting civil liberties maintain order in court?\" cümlesinin Türkçe karşılığı hangisidir?",
                        "grammarTags": ["Participle Yapıları", "Soru Yapıları (Wh-)", "Present Participle Sıfatı", "İsim ve Edat Yapıları"],
                        "options": [
                            "Sivil özgürlükleri koruyan hukuk sistemleri mahkemede düzeni nasıl sağlar?",
                            "Hukuk sistemleri mahkemede sivil özgürlükleri ve düzeni nasıl korur?",
                            "Sivil özgürlükleri kısıtlayan hukuk sistemleri mahkemede düzen kurabilir mi?",
                            "Mahkemede düzen sağlayan hukuk sistemleri sivil özgürlükleri ne zaman korur?"
                        ],
                        "correctIndex": 0,
                        "enSentence": "How do legal systems protecting civil liberties maintain order in court?",
                        "isEngToTr": True
                    },
                    {
                        "id": "u12l1_ex3_q4",
                        "type": "translation-text",
                        "prompt": "“Archaeologists excavating ancient ruins found artifacts displayed in the museum.” cümlesini Türkçe'ye çevirin:",
                        "grammarTags": ["Participle Yapıları", "Present & Past Participle", "Geçmiş Zaman", "İsim ve Edat Yapıları"],
                        "correctSentence": "Antik harabeleri kazan arkeologlar müzede sergilenen eserler buldu.",
                        "enSentence": "Archaeologists excavating ancient ruins found artifacts displayed in the museum.",
                        "isEngToTr": True
                    },
                    {
                        "id": "u12l1_ex3_q5",
                        "type": "word-bank",
                        "prompt": "Kelimeleri doğru sıraya dizerek Türkçe çeviriyi oluşturun: \"Constitutional reforms passed by parliament must protect the rights of citizens.\"",
                        "grammarTags": ["Participle Yapıları", "Past Participle Sıfatı", "Saf Modallar", "Edilgen Çatı"],
                        "words": ["Parlamento tarafından", "kabul edilen", "anayasal reformlar", "vatandaşların haklarını", "korumalıdır."],
                        "correctOrder": ["Parlamento tarafından", "kabul edilen", "anayasal reformlar", "vatandaşların haklarını", "korumalıdır."],
                        "translation": "Parlamento tarafından kabul edilen anayasal reformlar vatandaşların haklarını korumalıdır."
                    },
                    {
                        "id": "u12l1_ex3_q6",
                        "type": "fill-blank-dropdown",
                        "prompt": "Boşluklara gelebilecek en uygun eylemsi sıfat formlarını sırasıyla seçin:",
                        "grammarTags": ["Participle Yapıları", "Present & Past Participle", "Saf Modallar", "İsim ve Edat Yapıları"],
                        "sentence": "Psychologists [analyzing] emotional development must understand ideas [discussed] during therapy.",
                        "options": ["analyzing / discussed", "analyzed / discussing", "analyze / discuss", "to analyze / to discuss"],
                        "correctIndex": 0,
                        "translation": "Duygusal gelişimi analiz eden psikologlar terapi sırasında tartışılan fikirleri anlamalıdır."
                    },
                    {
                        "id": "u12l1_ex3_q7",
                        "type": "multiple-choice",
                        "prompt": "\"Film critics evaluating symbolic meaning in movies can influence public opinion.\" cümlesinin Türkçe karşılığı hangisidir?",
                        "grammarTags": ["Participle Yapıları", "Present Participle Sıfatı", "Saf Modallar", "İsim Tamlamaları"],
                        "options": [
                            "Filmlerdeki sembolik anlamı değerlendiren sinema eleştirmenleri kamuoyunu etkileyebilir.",
                            "Sinema eleştirmenleri filmlerdeki sembolik anlamı değerlendirerek kamuoyunu yönlendirir.",
                            "Kamuoyunu etkileyen sinema eleştirmenleri filmlerin sembolik anlamını inceler.",
                            "Filmlerdeki sembolik anlam kamuoyunu etkileyen sinema eleştirmenleri tarafından tartışılır."
                        ],
                        "correctIndex": 0,
                        "enSentence": "Film critics evaluating symbolic meaning in movies can influence public opinion.",
                        "isEngToTr": True
                    },
                    {
                        "id": "u12l1_ex3_q8",
                        "type": "word-bank",
                        "prompt": "Kelimeleri doğru sıraya dizerek Türkçe çeviriyi oluşturun: \"Sociological studies investigating urban growth were published by researchers.\"",
                        "grammarTags": ["Participle Yapıları", "Present Participle Sıfatı", "Edilgen Çatı", "İsim ve Edat Yapıları"],
                        "words": ["Kentsel büyümeyi", "araştıran", "sosyolojik çalışmalar", "araştırmacılar tarafından", "yayımlandı."],
                        "correctOrder": ["Kentsel büyümeyi", "araştıran", "sosyolojik çalışmalar", "araştırmacılar tarafından", "yayımlandı."],
                        "translation": "Kentsel büyümeyi araştıran sosyolojik çalışmalar araştırmacılar tarafından yayımlandı."
                    },
                    {
                        "id": "u12l1_ex3_q9",
                        "type": "translation-text",
                        "prompt": "“Which factor influencing voting behavior was identified during the election?” cümlesini Türkçe'ye çevirin:",
                        "grammarTags": ["Participle Yapıları", "Soru Yapıları (Wh-)", "Present Participle Sıfatı", "Edilgen Çatı"],
                        "correctSentence": "Seçim sırasında oy verme davranışını etkileyen hangi faktör tespit edildi?",
                        "enSentence": "Which factor influencing voting behavior was identified during the election?",
                        "isEngToTr": True
                    },
                    {
                        "id": "u12l1_ex3_q10",
                        "type": "multiple-choice",
                        "prompt": "\"Evidence presented in court was examined by legal experts before the trial.\" cümlesinin Türkçe karşılığı hangisidir?",
                        "grammarTags": ["Participle Yapıları", "Past Participle Sıfatı", "Edilgen Çatı", "İsim ve Edat Yapıları"],
                        "options": [
                            "Mahkemede sunulan deliller duruşmadan önce hukuk uzmanları tarafından incelendi.",
                            "Hukuk uzmanları mahkemeye sunulan delilleri duruşma sırasında inceledi.",
                            "Duruşmadan önce mahkemede sunulan deliller hukuk uzmanlarını ikna etti.",
                            "Hukuk uzmanları tarafından incelenen deliller mahkemeye sunuldu."
                        ],
                        "correctIndex": 0,
                        "enSentence": "Evidence presented in court was examined by legal experts before the trial.",
                        "isEngToTr": True
                    },
                    {
                        "id": "u12l1_ex3_q11",
                        "type": "word-bank",
                        "prompt": "Kelimeleri doğru sıraya dizerek Türkçe çeviriyi oluşturun: \"Ancient ruins excavated by archaeologists contain cultural heritage of the city.\"",
                        "grammarTags": ["Participle Yapıları", "Past Participle Sıfatı", "İsim ve Edat Yapıları", "İsim Tamlamaları"],
                        "words": ["Arkeologlar tarafından", "kazılan", "antik harabeler", "şehrin kültürel mirasını", "içermektedir."],
                        "correctOrder": ["Arkeologlar tarafından", "kazılan", "antik harabeler", "şehrin kültürel mirasını", "içermektedir."],
                        "translation": "Arkeologlar tarafından kazılan antik harabeler şehrin kültürel mirasını içermektedir."
                    },
                    {
                        "id": "u12l1_ex3_q12",
                        "type": "fill-blank-dropdown",
                        "prompt": "Boşluğa gelebilecek en uygun eylemsi sıfat yapısını seçin:",
                        "grammarTags": ["Participle Yapıları", "Past Participle Sıfatı", "Geniş Zaman", "İsim ve Edat Yapıları"],
                        "sentence": "The classical theory [challenged] by scholars remains an important topic in philosophy.",
                        "options": ["challenged", "challenging", "challenge", "to challenge"],
                        "correctIndex": 0,
                        "translation": "Bilginler tarafından meydan okunan klasik teori felsefede önemli bir konu olmaya devam ediyor."
                    }
                ]
            }
        ]
    }
}

# Read data.js
with open("data.js", "r", encoding="utf-8") as f:
    content = f.read()

# Replace unit 12 in unitSentencesMap
# Find `"12": { ... }` in data.js
pattern = r'(\s*"12"\s*:\s*\{)[\s\S]*?(\n\s*\},?\n\s*"14")'
match = re.search(pattern, content)

if match:
    start_str = match.group(1)
    end_str = match.group(2)
    formatted_json = json.dumps(new_unit_12, ensure_ascii=False, indent=4)
    # Remove leading object wrapper bracket `{` and trailing `}`
    inner_json = formatted_json[formatted_json.find('{')+1:formatted_json.rfind('}')].strip()
    replacement = start_str + "\n" + inner_json + end_str
    content = content[:match.start()] + replacement + content[match.end():]
    print("Successfully replaced Unit 12 in unitSentencesMap of data.js!")
else:
    print("Error: Could not find unit 12 pattern in data.js")

# Now update rawTopics entry for id: 12 in data.js
# Update numLessons: 1 and subtitles: ["Sıfat-Fiiller ve Kısaltmalar (Participles) (Sayfa 81-97)"]
raw_topics_pattern = r'(\{\s*"id"\s*:\s*12,[\s\S]*?"numLessons"\s*:\s*)\d+([\s\S]*?"subtitles"\s*:\s*\[)[\s\S]*?(\])'
raw_match = re.search(raw_topics_pattern, content)
if raw_match:
    new_raw_entry = raw_match.group(1) + "1" + raw_match.group(2) + '\n      "Sıfat-Fiiller ve Kısaltmalar (Participles) (Sayfa 81-97)"\n    ' + raw_match.group(3)
    content = content[:raw_match.start()] + new_raw_entry + content[raw_match.end():]
    print("Successfully updated rawTopics for Unit 12 in data.js!")
else:
    print("Warning: Could not match rawTopics pattern for Unit 12")

with open("data.js", "w", encoding="utf-8") as f:
    f.write(content)

print("data.js update completed.")
