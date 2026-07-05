const fs = require('fs');
const fileContent = fs.readFileSync('data.js', 'utf8');

const curriculumDataFinal = [
  {
    "chapterId": "chapter38",
    "chapterName": "Advanced Inversion (Gelişmiş Devrik Cümle Yapıları)",
    "lessons": [
      {
        "lessonId": "c38_l1",
        "lessonTitle": "Ders 1: Sıklık Zarfları ve Korelasyonlu Zaman Kırılmaları",
        "konuAnlatimi": {
          "baslik": "Ders 1: Sıklık Zarfları ve Korelasyonlu Zaman Kırılmaları",
          "teorikMantik": "Olumsuz veya kısıtlayıcı sıklık zarfları (Seldom, Rarely, Little, In no way) ile zaman kırılması belirten bağlaçlar (Hardly, Scarcely, No sooner) vurgu amacıyla cümle başına geldiklerinde, cümle düz yapısını kaybedip soru formatına (devrik) dönüşür.",
          "formul": "[Olumsuz Zarf] + [Yardımcı Fiil / Modal] + [Özne] + [Fiil (V1/V3)]",
          "altinKural": "'No sooner' yapısı 'than' ile bağlanırken; 'Hardly' ve 'Scarcely' yapıları 'when' ile bağlanır. Bu ikilileri birbiriyle karıştırmayın."
        },
        "questions": [
          {
            "id": "c38_l1_q1",
            "type": "matching",
            "prompt": "Sıklık zarfları ve kısıtlayıcı ifadelerle başlayan devrik cümle yapılarını karşılıklarıyla eşleştirin.",
            "pairs": [
              { "left": "Seldom does the state", "right": "intervene so drastically in market operations." },
              { "left": "Rarely did the council", "right": "approve the emergency budget without revisions." },
              { "left": "Little had the team realized", "right": "the critical security vulnerability in the source code." },
              { "left": "In no way can we accept", "right": "these terms under the current geopolitical climate." }
            ],
            "hint": {
              "formula": "Zaman uyumu odaklı eşleşme",
              "mirror": "Seldom/Rarely ile başlayan yapıların devamını bulun.",
              "academicNote": "Giriş zarflarının zaman yapıları ile ana eylemleri eşleştirin."
            }
          },
          {
            "id": "c38_l1_q2",
            "type": "fill-blank-dropdown",
            "prompt": "Cümlenin başındaki 'Rarely' vurgusuna uygun devrik yardımcı fiili seçin:",
            "sentence": "Rarely ___ the committee encounter such a unified opposition from the local stakeholders.",
            "options": ["does", "is", "has", "did"],
            "correctIndex": 0,
            "translation": "Kurul, yerel paydaşlardan nadiren bu kadar birleşik bir muhalefetle karşılaşır.",
            "explanation": "Cümle başındaki 'Rarely' olumsuz zarfı devriklik gerektirir. Geniş zamanlı 'encounter' fiili için yardımcı fiil 'does' olmalıdır.",
            "hint": {
              "formula": "Rarely + [Yardımcı Fiil + Özne + V1]",
              "mirror": "Normalde: 'The committee rarely encounters...'",
              "academicNote": "Cümlede 'encounter' yalın (V1) olarak kullanıldığı ve özne tekil olduğu için geniş zaman yardımcı fiili 'does' seçilmelidir."
            }
          },
          {
            "id": "c38_l1_q3",
            "type": "fill-blank-dropdown",
            "prompt": "Cümle başında 'Little' azlık zarfına göre doğru devrik yapıyı seçin:",
            "sentence": "Little ___ that the geopolitical data had been completely manipulated by the intelligence agency.",
            "options": [
              "did the researchers suspect",
              "the researchers suspected",
              "have the researchers suspected",
              "were the researchers suspecting"
            ],
            "correctIndex": 0,
            "translation": "Araştırmacıların, jeopolitik verilerin istihbarat teşkilatı tarafından tamamen manipüle edildiğinden neredeyse hiç haberleri yoktu.",
            "explanation": "Cümle başında 'Little' kullanımı 'neredeyse hiç' anlamında devriklik gerektirir. Geçmiş zamanı nitelemek için 'did + özne + V1' yapısı (did the researchers suspect) tercih edilmelidir.",
            "hint": {
              "formula": "Little + [Yardımcı Fiil + Özne + V1]",
              "mirror": "Normalde: 'The researchers suspected little that...'",
              "academicNote": "Geçmiş zamanda 'Little' devrik yapısı kurulurken 'did + özne + fiilin yalın hali' (did the researchers suspect) yapısı kullanılır."
            }
          },
          {
            "id": "c38_l1_q4",
            "type": "multiple-choice",
            "prompt": "Aşağıdaki cümledeki yapısal hatayı düzelten doğru seçeneği belirleyin:\n'Seldom the parliament approves such controversial tax amendments without debate.'",
            "options": [
              "Seldom does the parliament approve such controversial tax amendments without debate.",
              "Seldom the parliament approves such controversial tax amendments without debate.",
              "Seldom does the parliament approves such controversial tax amendments without debate."
            ],
            "correctIndex": 0,
            "translation": "Parlamento, bu tür tartışmalı vergi değişikliklerini tartışmasız nadiren onaylar.",
            "explanation": "'Seldom' olumsuz zarfı cümle başına geldiğinde devriklik yapılarak yardımcı fiil özneden önce gelmelidir: 'does the parliament approve'.",
            "hint": {
              "formula": "Seldom + [Yardımcı Fiil + Özne + V1]",
              "mirror": "Hatalı yapı: 'Seldom the parliament approves...'",
              "academicNote": "'Seldom' cümle başında olumsuz zarf olarak kullanıldığında düz dizilim kabul edilmez; devriklik zorunludur: 'does the parliament approve'."
            }
          },
          {
            "id": "c38_l1_q5",
            "type": "inversion-transformer",
            "prompt": "Verilen düz akademik cümleyi 'In no way' kullanarak profesyonel devrik forma dönüştürün:",
            "mainSentence": "The ministry in no way can endorse this flawed environmental report.",
            "options": [
              "In no way can the ministry endorse this flawed environmental report.",
              "In no way the ministry can endorse this flawed environmental report.",
              "In no way did the ministry endorsed this flawed environmental report."
            ],
            "correctIndex": 0,
            "translation": "Bakanlık bu kusurlu çevre raporunu hiçbir şekilde onaylayamaz.",
            "explanation": "'In no way' başa geldiğinde yardımcı modal fiil 'can' özneden önce yer almalıdır.",
            "hint": {
              "formula": "In no way + [Modal + Özne + V1]",
              "mirror": "Düz hali: 'The ministry can in no way endorse...'",
              "academicNote": "'In no way' ifadesi cümle başına alındığında modal yardımcı fiil olan 'can' özneden önce gelmelidir."
            }
          },
          {
            "id": "c38_l1_q6",
            "type": "word-bank",
            "prompt": "Blokları doğru dizerek olumsuz sıklık zarfı devrik yapısını tamamlayın:",
            "translation": "Uzay aracı yörüngeye henüz girmişti ki telemetri bağlantısını kaybetti.",
            "words": [
              "Barely",
              "had the spacecraft",
              "entered orbit",
              "when",
              "it lost telemetry."
            ],
            "correctOrder": [
              "Barely",
              "had the spacecraft",
              "entered orbit",
              "when",
              "it lost telemetry."
            ],
            "enSentence": "Barely had the spacecraft entered orbit when it lost telemetry.",
            "isEngToTr": false,
            "hint": {
              "formula": "Barely + [had + Özne + V3] + when + [Özne + V2]",
              "mirror": "Normalde: 'The spacecraft had barely entered orbit...'",
              "academicNote": "Eş zamanlı veya hemen ardışık eylemlerde 'Barely' ile başlayan devrik kısım Past Perfect (had + V3), ikinci cümle ise 'when' ile bağlanır."
            }
          },
          {
            "id": "c38_l1_q7",
            "type": "fill-blank-dropdown",
            "prompt": "No sooner ... than korelasyonlu yapısına uygun bağlacı bulun:",
            "sentence": "No sooner had the prime minister announced the fiscal package ___ the union leaders declared a nation-wide strike.",
            "options": [
              "than",
              "when",
              "then",
              "before"
            ],
            "correctIndex": 0,
            "translation": "Başbakan mali paketi açıklar açıklamaz sendika liderleri ülke çapında grev ilan etti.",
            "explanation": "'No sooner' devrik yapısı ile kurulan zaman kırılması cümlelerinde, ikinci cümleyi bağlayan unsur her zaman 'than' bağlacıdır.",
            "hint": {
              "formula": "No sooner + [had + Özne + V3] + than + [Özne + V2]",
              "mirror": "No sooner kalıbının ayrılmaz eşini bulun.",
              "academicNote": "Zaman kırılması belirten 'No sooner' devrik yapısı ikinci cümleye her zaman kıyas bildiren 'than' ile bağlanır."
            }
          },
          {
            "id": "c38_l1_q8",
            "type": "fill-blank-dropdown",
            "prompt": "Hardly ... when zaman kırılmasına uygun devrik başlangıcı seçin:",
            "sentence": "Hardly ___ the laboratory room when the critical power grid failed completely.",
            "options": [
              "had the scientists entered",
              "the scientists had entered",
              "did the scientists enter",
              "were the scientists entering"
            ],
            "correctIndex": 0,
            "translation": "Bilim insanları laboratuvar odasına girer girmez kritik elektrik şebekesi tamamen çöktü.",
            "explanation": "'Hardly' cümle başında past perfect devrik yapı gerektirir: 'had + subject + V3' (had the scientists entered).",
            "hint": {
              "formula": "Hardly + [had + Özne + V3] + when + [Özne + V2]",
              "mirror": "Normalde: 'The scientists had hardly entered...'",
              "academicNote": "Hardly ile kurulan zaman kırılması yapısında, ilk cümlede Past Perfect devrik dizilimi ('had' + özne + V3) tercih edilir."
            }
          },
          {
            "id": "c38_l1_q9",
            "type": "multiple-choice",
            "prompt": "Aşağıdaki cümledeki korelasyon hatasını düzelten doğru seçeneği belirleyin:\n'Scarcely had the diplomat finished his speech than the military conflict erupted along the border.'",
            "options": [
              "Scarcely had the diplomat finished his speech when the military conflict erupted along the border.",
              "Scarcely had the diplomat finished his speech than the military conflict erupted along the border.",
              "Scarcely did the diplomat finished his speech when the military conflict erupted along the border."
            ],
            "correctIndex": 0,
            "translation": "Diplomat konuşmasını bitirir bitirmez sınır boyunca askeri çatışma patlak verdi.",
            "explanation": "'Scarcely' ile kurulan devrik yapılarda ikinci cümleyi bağlayan kelime 'than' değil, 'when' (veya 'before') olmalıdır.",
            "hint": {
              "formula": "Scarcely + [had + Özne + V3] + when + [Özne + V2]",
              "mirror": "Hatalı korelasyon: 'Scarcely had... than...'",
              "academicNote": "'Scarcely' ve 'Hardly' yapıları ikinci cümleye 'when' ile bağlanır, 'than' sadece 'No sooner' ile kullanılır."
            }
          },
          {
            "id": "c38_l1_q10",
            "type": "inversion-transformer",
            "prompt": "Zaman uyumlu düz cümleyi 'No sooner' kullanarak devrik forma getirin:",
            "mainSentence": "The regime deployed the troops as soon as the rebellion broke out.",
            "options": [
              "No sooner had the regime deployed the troops than the rebellion broke out.",
              "No sooner the regime had deployed the troops when the rebellion broke out.",
              "No sooner did the regime deployed the troops than the rebellion broke out."
            ],
            "correctIndex": 0,
            "translation": "İsyan çıkar çıkmaz rejim birlikleri konuşlandırdı.",
            "explanation": "'as soon as' eşdeğeri olarak 'No sooner had + subject + V3 ... than + subject + V2' devrik yapısı kurulmalıdır.",
            "hint": {
              "formula": "No sooner + [had + Özne + V3] + than + [Özne + V2]",
              "mirror": "Düzü: 'The regime deployed... as soon as...'",
              "academicNote": "'As soon as' yapısını 'No sooner... than' ile devrik hale getirirken, ilk eylem Past Perfect devrik (had the regime deployed) yapılır."
            }
          },
          {
            "id": "c38_l1_q11",
            "type": "word-bank",
            "prompt": "Blokları dizerek 'Hardly ... when' yapısını tamamlayın:",
            "translation": "Banka faiz oranlarını artırır artırmaz enflasyon tamamen dengelendi.",
            "words": [
              "Hardly",
              "had the bank",
              "raised interest rates",
              "when",
              "inflation stabilized",
              "completely."
            ],
            "correctOrder": [
              "Hardly",
              "had the bank",
              "raised interest rates",
              "when",
              "inflation stabilized",
              "completely."
            ],
            "enSentence": "Hardly had the bank raised interest rates when inflation stabilized completely.",
            "isEngToTr": false,
            "hint": {
              "formula": "Hardly + [had + Özne + V3] + when + [Özne + V2]",
              "mirror": "Normalde: 'The bank had hardly raised...'",
              "academicNote": "Hardly ile başlayan devrik yapının ardından past perfect dizilimi gelmeli ve ikinci cümle 'when' ile bağlanmalıdır."
            }
          },
          {
            "id": "c38_l1_q12",
            "type": "fill-blank-dropdown",
            "prompt": "Geniş zamanlı 'Not only' devrik yapısına uygun yardımcı fiili seçin:",
            "sentence": "Not only ___ the dynamic software encrypt the sensitive database, but it also monitors unauthorized server access.",
            "options": [
              "does",
              "is",
              "did",
              "has"
            ],
            "correctIndex": 0,
            "translation": "Dinamik yazılım sadece hassas veritabanını şifrelemekle kalmaz, aynı zamanda yetkisiz sunucu erişimlerini de izler.",
            "explanation": "İkinci cümledeki 'monitors' geniş zamanlı olduğundan, 'Not only' ile başlayan ilk devrik cümlenin yardımcı fiili de geniş zamanlı 'does' olmalıdır.",
            "hint": {
              "formula": "Not only + [does/did + Özne + V1] + but [Özne] also...",
              "mirror": "İkinci cümledeki 'monitors' (Geniş Zaman) yapısına dikkat edin.",
              "academicNote": "İkinci cümlecik geniş zamanlı (monitors) olduğu için, 'Not only' ile başlayan devrik ilk cümleciğin yardımcı fiili de geniş zamanlı 'does' olmalıdır."
            }
          },
          {
            "id": "c38_l1_q13",
            "type": "fill-blank-dropdown",
            "prompt": "Geçmiş zamanlı 'At no time' yapısına uygun devrik alternatifi bulun:",
            "sentence": "At no time ___ the department head authorize the release of the classified database.",
            "options": [
              "did the department head",
              "the department head did",
              "has the department head",
              "was the department head"
            ],
            "correctIndex": 0,
            "translation": "Bölüm başkanı, gizli veritabanının yayınlanmasına hiçbir zaman izin vermedi.",
            "explanation": "At no time olumsuz zaman vurgusu cümle başında kullanıldığında past simple devriklik 'did + özne + V1' şeklinde kurulur.",
            "hint": {
              "formula": "At no time + [did + Özne + V1]",
              "mirror": "Normalde: 'The department head at no time authorized...'",
              "academicNote": "Geçmiş zamanlı bir eylemi 'At no time' ile devrik yaparken 'did + özne + fiilin yalın hali' (did the department head) kullanılır."
            }
          },
          {
            "id": "c38_l1_q14",
            "type": "multiple-choice",
            "prompt": "Aşağıdaki cümledeki devriklik hatasını düzelten doğru seçeneği belirleyin:\n'Not only the tech company expanded its global market, but it also doubled its revenue.'",
            "options": [
              "Not only did the tech company expand its global market, but it also doubled its revenue.",
              "Not only the tech company expanded its global market, but it also doubled its revenue.",
              "Not only did the tech company expanded its global market, but it also doubled its revenue."
            ],
            "correctIndex": 0,
            "translation": "Teknoloji şirketi sadece küresel pazarını genişletmekle kalmadı, aynı zamanda gelirini de ikiye katladı.",
            "explanation": "'Not only' cümle başında olduğunda ilk cümlenin devrik yapılması gerekir; düz biçim (the tech company expanded) hatalıdır.",
            "hint": {
              "formula": "Not only + [did + Özne + V1] ...",
              "mirror": "Hatalı düz cümle: 'Not only the tech company expanded...'",
              "academicNote": "'Not only' ifadesi cümle başına geldiğinde ilk cümlede devriklik zorunludur. Geçmiş zamanı nitelemek için 'did the tech company expand' kullanılır."
            }
          },
          {
            "id": "c38_l1_q15",
            "type": "word-bank",
            "prompt": "Blokları doğru dizerek 'Under no circumstances' devrik uyarısını oluşturun:",
            "translation": "Ağ mühendisleri hiçbir koşulda birincil yedekleme sunucularının fişini çekmemelidir.",
            "words": [
              "Under no circumstances",
              "should the network",
              "engineers",
              "unplug the primary",
              "backup servers."
            ],
            "correctOrder": [
              "Under no circumstances",
              "should the network",
              "engineers",
              "unplug the primary",
              "backup servers."
            ],
            "enSentence": "Under no circumstances should the network engineers unplug the primary backup servers.",
            "isEngToTr": false,
            "hint": {
              "formula": "Under no circumstances + [Modal + Özne + V1]",
              "mirror": "Normalde: 'The network engineers should under no circumstances unplug...'",
              "academicNote": "Under no circumstances ifadesi başa geldiğinde zorunluluk bildiren 'should' yardımcı fiili özneden önce gelmelidir."
            }
          },
          {
            "id": "c38_l1_q16",
            "type": "fill-blank-dropdown",
            "prompt": "On no account devrik yasağına uygun yardımcı modalı bulun:",
            "sentence": "On no account ___ the security personnel disclose the dynamic encryption keys to external auditors.",
            "options": [
              "must",
              "does",
              "have",
              "are"
            ],
            "correctIndex": 0,
            "translation": "Güvenlik personeli, dinamik şifreleme anahtarlarını hiçbir şekilde dış denetçilere ifşa etmemelidir.",
            "explanation": "'disclose' fiili yalın (V1) haldedir ve yasaklama/zorunluluk anlamı taşıyan 'must' modalı ile devriklik kurulur.",
            "hint": {
              "formula": "On no account + [Modal + Özne + V1]",
              "mirror": "Normalde: 'The security personnel must on no account disclose...'",
              "academicNote": "Cümledeki 'disclose' fiili yalın (V1) olduğu ve yasaklama/zorunluluk bildirdiği için devrik yapıda 'must' modalı kullanılmalıdır."
            }
          },
          {
            "id": "c38_l1_q17",
            "type": "fill-blank-dropdown",
            "prompt": "Azlık bildiren 'Scarcely' zarfına uygun geçmiş zaman devriklik yapısını seçin:",
            "sentence": "Scarcely ___ the new algorithm initialized when the memory buffer overflowed.",
            "options": [
              "had the new algorithm",
              "the new algorithm had",
              "did the new algorithm",
              "was the new algorithm"
            ],
            "correctIndex": 0,
            "translation": "Yeni algoritma henüz başlatılmıştı ki bellek arabelleği taştı.",
            "explanation": "'Scarcely... when' yapısı past perfect devrik yapıyla ('had + özne + V3') kurulmalıdır.",
            "hint": {
              "formula": "Scarcely + [had + Özne + V3] + when...",
              "mirror": "Normalde: 'The new algorithm had scarcely initialized...'",
              "academicNote": "Scarcely... when yapısında, ilk cümlede Past Perfect devrik yardımcı fiili olan 'had' kullanılır."
            }
          },
          {
            "id": "c38_l1_q18",
            "type": "multiple-choice",
            "prompt": "Aşağıdaki cümledeki devriklik hatasını düzelten doğru seçeneği belirleyin:\n'At no time the localized algorithm predicted that the LFP battery performance would degrade so fast.'",
            "options": [
              "At no time did the localized algorithm predict that the LFP battery performance would degrade so fast.",
              "At no time the localized algorithm predicted that the LFP battery performance would degrade so fast.",
              "At no time does the localized algorithm predicted that the LFP battery performance would degrade so fast."
            ],
            "correctIndex": 0,
            "translation": "Lokalize edilmiş algoritma, LFP pil performansının bu kadar hızlı düşeceğini hiçbir zaman tahmin etmemişti.",
            "explanation": "'At no time' olumsuz zaman ifadesi başa geldiğinde cümle devrik olmalıdır: 'did the localized algorithm predict'.",
            "hint": {
              "formula": "At no time + [did + Özne + V1]",
              "mirror": "Hatalı düz cümle: 'At no time the localized algorithm predicted...'",
              "academicNote": "'At no time' olumsuz zaman ifadesi cümle başına geldiğinde devriklik şarttır; 'did the localized algorithm predict' şeklinde düzeltilmelidir."
            }
          },
          {
            "id": "c38_l1_q19",
            "type": "inversion-transformer",
            "prompt": "Verilen düz cümleyi 'At no point' kullanarak devrik forma getirin:",
            "mainSentence": "The supervisor did not realize at any point that the system was vulnerable.",
            "options": [
              "At no point did the supervisor realize that the system was vulnerable.",
              "At no point the supervisor realized that the system was vulnerable.",
              "At no point does the supervisor realize that the system was vulnerable."
            ],
            "correctIndex": 0,
            "translation": "Gözetmen, sistemin savunmasız olduğunu hiçbir noktada fark etmedi.",
            "explanation": "'At no point' olumsuz ifadesi başa alındığında geçmiş zaman devriklik 'did + özne + realize' olarak kurulmalıdır.",
            "hint": {
              "formula": "At no point + [did + Özne + V1]",
              "mirror": "Düzü: 'The supervisor did not realize at any point that...'",
              "academicNote": "'At no point' olumsuz zarf öbeği başa alındığında, geçmiş zaman devrik formu 'did the supervisor realize' olmalıdır."
            }
          },
          {
            "id": "c38_l1_q20",
            "type": "word-bank",
            "prompt": "Blokları dizerek 'Little did ... know' akademik devriklik yapısını tamamlayın:",
            "translation": "Operasyon ekibi, tüm dinamik konfigürasyon parametrelerinin betik tarafından üzerine yazıldığını neredeyse hiç bilmiyordu.",
            "words": [
              "Little",
              "did the operations",
              "team know",
              "that all dynamic",
              "configuration",
              "parameters",
              "had been overwritten",
              "by the script."
            ],
            "correctOrder": [
              "Little",
              "did the operations",
              "team know",
              "that all dynamic",
              "configuration",
              "parameters",
              "had been overwritten",
              "by the script."
            ],
            "enSentence": "Little did the operations team know that all dynamic configuration parameters had been overwritten by the script.",
            "isEngToTr": false,
            "hint": {
              "formula": "Little + [did + Özne + V1] + that...",
              "mirror": "Normalde: 'The operations team knew little that...'",
              "academicNote": "Little zarfı cümle başında devrik yap kurarken geçmiş zamanda 'did + özne + V1' (did the operations team know) dizilimini alır."
            }
          }
        ]
      },
      {
        "lessonId": "c38_l2",
        "lessonTitle": "Ders 2: Kısıtlayıcı Yapılar ve Ana Cümle Tuzakları",
        "konuAnlatimi": {
          "baslik": "Ders 2: Kısıtlayıcı Yapılar ve Ana Cümle Tuzakları",
          "teorikMantik": "Only after, Only when, Not until, Not since ve Only by ile başlayan yapılarda devriklik yan cümlede değil, yan cümle bittikten sonra gelen ANA cümlede yapılır. Bu yapılar başa geldiğinde yan cümle düz kurulur.",
          "formul": "[Only / Not until + Yan Cümle (Düz Yapı)] + [Yardımcı Fiil] + [Özne] + [Fiil]",
          "altinKural": "En büyük tuzak hem yan cümleyi hem de ana cümleyi devirmektir (çifte devriklik). Devriklik sadece ve sadece ana cümlede kurulmalıdır."
        },
        "questions": [
          {
            "id": "c38_l2_q1",
            "type": "matching",
            "prompt": "Kısıtlayıcı zaman ve yöntem devrik cümleciklerini uygun ana cümleleriyle eşleştirin.",
            "pairs": [
              { "left": "Only after the data was lost", "right": "did they install hybrid backups." },
              { "left": "Not until the scanner was repaired", "right": "did the archivists continue the OCR process." },
              { "left": "Not since the fiscal crisis", "right": "have global markets suffered this much." },
              { "left": "Only by shifting to LFP batteries", "right": "could the EV manufacturer lower production costs." }
            ],
            "hint": {
              "formula": "Kısıtlayıcı zarf ana cümle eşleştirmesi",
              "mirror": "Only/Not yapılarının zaman ve anlam uyumuna dikkat edin.",
              "academicNote": "Kısıtlayıcı yapıyla başlayan yan cümlelerin ardına gelen devrik ana cümleleri eşleştirin."
            }
          },
          {
            "id": "c38_l2_q2",
            "type": "fill-blank-dropdown",
            "prompt": "Cümlenin başındaki 'Only after' vurgusuna uygun devrik yardımcı fiili seçin:",
            "sentence": "Only after the board members read the complete audit report ___ they finally realize the company's financial risk.",
            "options": ["did", "do", "have", "were"],
            "correctIndex": 0,
            "translation": "Yönetim kurulu üyeleri ancak denetim raporunun tamamını okuduktan sonra şirketin finansal riskini nihayet fark ettiler.",
            "explanation": "Only after zarf cümleciği başa geldiğinde devriklik ana cümlede kurulur. Geçmiş zamanı nitelemek için yardımcı fiil 'did' olmalıdır.",
            "hint": {
              "formula": "Only after + S + V + did + S + V1",
              "mirror": "Normalde: 'They finally realized...'",
              "academicNote": "Only after ile başlayan yapıda devriklik ana cümlede geçmiş zaman için 'did' ile kurulur."
            }
          },
          {
            "id": "c38_l2_q3",
            "type": "multiple-choice",
            "prompt": "Aşağıdaki cümleyi tamamlayacak en uygun devrik ana cümle yapısını seçin:",
            "sentence": "Not until the end of the devastating civil war ___ an independent economic recovery strategy.",
            "options": [
              "did the new administration draft",
              "the new administration drafted",
              "has the new administration drafted",
              "were the new administration drafting"
            ],
            "correctIndex": 0,
            "translation": "Yeni yönetim, bağımsız bir ekonomik kalkınma stratejisini ancak yıkıcı iç savaşın sonuna gelindiğinde hazırlayabildi.",
            "explanation": "Not until zaman cümleciği başa geldiğinde ana cümle devrik (auxiliary + subject + verb) olmalıdır. Geçmiş zamanı niteleyen doğru devrik yapı 'did the new administration draft' şeklindedir.",
            "hint": {
              "formula": "Not until + S + V + [Auxiliary + S + V1]",
              "mirror": "Geçmiş zaman devrik yapısını arayın.",
              "academicNote": "Not until yapısından sonra devriklik ana cümlede 'did + subject + V1' (did the new administration draft) şeklinde kurulur."
            }
          },
          {
            "id": "c38_l2_q4",
            "type": "multiple-choice",
            "prompt": "Aşağıdaki cümlelerden hangisi 'Only after' sonrasında ana cümle devriklik tuzağına düşmeden doğru kurulmuştur?",
            "options": [
              "Only after the parliament amended the law did the protests stop.",
              "Only after did the parliament amend the law the protests stopped.",
              "Only after the parliament amended the law the protests did stop."
            ],
            "correctIndex": 0,
            "translation": "Parlamento yasayı ancak değiştirdikten sonra protestolar durdu.",
            "explanation": "'Only after' yan cümleciği devrilmez. Devriklik yan cümlecik bittikten sonra, yani ana cümlede 'did the protests stop' şeklinde kurulmalıdır.",
            "hint": {
              "formula": "Only after + [Düz Cümle] + [Devrik Cümle]",
              "mirror": "Yan cümleciğin düz kurulduğundan emin olun.",
              "academicNote": "Only after yan cümleciği devrilmez (Only after the parliament amended). Devriklik ana cümlededir."
            }
          },
          {
            "id": "c38_l2_q5",
            "type": "inversion-transformer",
            "prompt": "Aşağıdaki düz cümleyi 'Not since' kullanarak devrik akademik forma getirin:",
            "mainSentence": "The museum has witnessed such a massive influx of visitors not since the Renaissance exhibition.",
            "options": [
              "Not since the Renaissance exhibition has the museum witnessed such a massive influx of visitors.",
              "Not since the Renaissance exhibition the museum has witnessed such a massive influx of visitors.",
              "Not since did the Renaissance exhibition happen has the museum witnessed such a massive influx of visitors."
            ],
            "correctIndex": 0,
            "translation": "Müze, Rönesans sergisinden beri ziyaretçilerin bu kadar yoğun bir akınına tanık olmamıştı.",
            "explanation": "'Not since' ifadesi başa alındığında present perfect yardımcı fiili 'has' özneden önce gelmelidir.",
            "hint": {
              "formula": "Not since + Zaman/Olay + [has/have + S + V3]",
              "mirror": "Normalde: 'The museum has not witnessed...'",
              "academicNote": "Not since ifadesi başa geldiğinde present perfect devrik dizilim 'has the museum witnessed' olmalıdır."
            }
          },
          {
            "id": "c38_l2_q6",
            "type": "word-bank",
            "prompt": "Kelime bloklarını doğru dizerek kısıtlayıcı devrik yapıyı kurun:",
            "translation": "Uygulama, küresel pazarda ancak İngilizce pedagojisine odaklanarak başarılı olabilir.",
            "words": [
              "Only by focusing on English pedagogy",
              "can the application succeed",
              "in the global market."
            ],
            "correctOrder": [
              "Only by focusing on English pedagogy",
              "can the application succeed",
              "in the global market."
            ],
            "enSentence": "Only by focusing on English pedagogy can the application succeed in the global market.",
            "isEngToTr": false,
            "hint": {
              "formula": "Only by + Ving + [can + S + V1]",
              "mirror": "Normalde: 'The application can succeed...'",
              "academicNote": "Only by ile başlayan yapıda devriklik ana cümlede 'can + subject + V1' şeklinde kurulur."
            }
          },
          {
            "id": "c38_l2_q7",
            "type": "fill-blank-dropdown",
            "prompt": "Cümledeki boşluğa gelecek en uygun yardımcı fiili seçin:",
            "sentence": "Only when the security framework was fully deployed ___ the operations team allow external API access.",
            "options": ["did", "does", "had", "were"],
            "correctIndex": 0,
            "translation": "Operasyon ekibi, harici API erişimine ancak güvenlik altyapısı tamamen kurulduktan sonra izin verdi.",
            "explanation": "'Only when' yapısı başa geldiğinde ana cümle geçmiş zaman devrik formu 'did + subject + V1' (did the operations team allow) olmalıdır.",
            "hint": {
              "formula": "Only when + S + V + [did + S + V1]",
              "mirror": "Normalde: 'The operations team allowed...'",
              "academicNote": "Only when ile başlayan yapıda devriklik ana cümlede geçmiş zaman için 'did' ile kurulur."
            }
          },
          {
            "id": "c38_l2_q8",
            "type": "multiple-choice",
            "prompt": "Cümleyi dil bilgisi kurallarına uygun şekilde tamamlayan devrik seçeneği seçin:",
            "sentence": "Not until the hybrid solar inverter was calibrated dynamically ___ the facility achieve optimum energy efficiency.",
            "options": [
              "did the residential power system",
              "the residential power system did",
              "has the residential power system",
              "was the residential power system"
            ],
            "correctIndex": 0,
            "translation": "Mesken enerji sistemi, tesiste optimum enerji verimliliğini ancak hibrit güneş enerjisi invertörü dinamik olarak kalibre edildikten sonra sağlayabildi.",
            "explanation": "'Not until' yan cümlesi bittikten sonra ana cümlede geçmiş zaman devrik yapısı ('did + özne + V1') kurulmalıdır.",
            "hint": {
              "formula": "Not until + S + V + [did + S + V1]",
              "mirror": "Geçmiş zaman devrik ana cümlesini seçin.",
              "academicNote": "Not until yan cümlesi düz kurulur. Ana cümle ise geçmiş zaman devrik yapısıyla (did the residential power system) bağlanır."
            }
          },
          {
            "id": "c38_l2_q9",
            "type": "multiple-choice",
            "prompt": "'Not since' yapısı için dil bilgisi kurallarına tamamen uygun olan seçeneği belirleyin:",
            "options": [
              "Not since the team migrated to Vercel have they experienced such rapid deployment times.",
              "Not since the team migrated to Vercel they have experienced such rapid deployment times.",
              "Not since did the team migrate to Vercel have they experienced such rapid deployment times."
            ],
            "correctIndex": 0,
            "translation": "Ekip Vercel'e geçtiğinden beri hiçbir zaman bu kadar hızlı dağıtım süreleri deneyimlememişti.",
            "explanation": "'Not since' ile başlayan kısıtlayıcı yapılarda, yan cümle ('the team migrated to Vercel') düz kurulur; devriklik ana cümlede present perfect yapısıyla ('have they experienced') kurulur.",
            "hint": {
              "formula": "Not since + S + V2 + [have/has + S + V3]",
              "mirror": "Yan cümlecik düz, ana cümlecik devrik olmalıdır.",
              "academicNote": "Not since yan cümlesi Simple Past (migrated) iken ana cümle Present Perfect devrik (have they experienced) olur."
            }
          },
          {
            "id": "c38_l2_q10",
            "type": "inversion-transformer",
            "prompt": "Aşağıdaki düz cümleyi 'Only after' kullanarak devrik forma dönüştürün:",
            "mainSentence": "The regional manager understood the market dynamics in Erbil only after conducting on-site research.",
            "options": [
              "Only after conducting on-site research did the regional manager understand the market dynamics in Erbil.",
              "Only after conducting on-site research the regional manager understood the market dynamics in Erbil.",
              "Only after did the regional manager conduct on-site research he understood the market dynamics in Erbil."
            ],
            "correctIndex": 0,
            "translation": "Bölge müdürü, Erbil'deki pazar dinamiklerini ancak yerinde araştırma yaptıktan sonra anladı.",
            "explanation": "'Only after' yan cümlesindeki eylem ('conducting on-site research') bittikten sonra, ana cümle geçmiş zaman devrik yapısıyla ('did ... understand') bağlanır.",
            "hint": {
              "formula": "Only after + Ving + [did + S + V1]",
              "mirror": "Düz hali: 'The regional manager understood... only after conducting...'",
              "academicNote": "Only after yan cümlesindeki 'conducting' eyleminden sonra ana cümle geçmiş zaman devrik yapısı ('did ... understand') alır."
            }
          },
          {
            "id": "c38_l2_q11",
            "type": "word-bank",
            "prompt": "Kelimeleri dizerek 'Not until' devrik söz dizimini mühürleyin:",
            "translation": "Geliştiriciler hatalı token dizisini ancak JSON veri yükünü inceledikten sonra izole edebildiler.",
            "words": [
              "Not until the developers inspected",
              "the JSON payload",
              "did they isolate",
              "the faulty token sequence."
            ],
            "correctOrder": [
              "Not until the developers inspected",
              "the JSON payload",
              "did they isolate",
              "the faulty token sequence."
            ],
            "enSentence": "Not until the developers inspected the JSON payload did they isolate the faulty token sequence.",
            "isEngToTr": false,
            "hint": {
              "formula": "Not until + S + V + [did + S + V1]",
              "mirror": "Normalde: 'They isolated...'",
              "academicNote": "Not until yan cümlesi düz (the developers inspected), ana cümlesi geçmiş zaman devriğidir (did they isolate)."
            }
          },
          {
            "id": "c38_l2_q12",
            "type": "fill-blank-dropdown",
            "prompt": "Cümledeki boşluğa gelecek en uygun yardımcı modal fiili seçin:",
            "sentence": "Only by integrating the dynamic calendar API ___ the user organize the 2026 FIFA World Cup schedule efficiently.",
            "options": ["could", "can", "did", "was"],
            "correctIndex": 0,
            "translation": "Kullanıcı, 2026 FIFA Dünya Kupası programını ancak dinamik takvim API'sini entegre ederek verimli bir şekilde düzenleyebildi.",
            "explanation": "'Only by' yapısı ile yetenek bildiren geçmiş zaman devrik yapısı 'could + subject + V1' şeklinde kurulur.",
            "hint": {
              "formula": "Only by + Ving + [could + S + V1]",
              "mirror": "Yetenek bildiren geçmiş zaman modalını arayın.",
              "academicNote": "Only by ile başlayan yapıda yetenek bildiren geçmiş zaman devrik yapısı için 'could' kullanılır."
            }
          },
          {
            "id": "c38_l2_q13",
            "type": "multiple-choice",
            "prompt": "Cümleyi en uygun devrik yapyıyla tamamlayan seçeneği belirleyin:",
            "sentence": "Only when the local distributor adjusted the diesel fuel prices ___ consumers resume buying heavy equipment.",
            "options": [
              "did the regional",
              "the regional did",
              "has the regional",
              "were the regional"
            ],
            "correctIndex": 0,
            "translation": "Bölgesel tüketiciler, ağır ekipman alımına ancak yerel distribütör dizel yakıt fiyatlarını ayarladıktan sonra yeniden başladı.",
            "explanation": "'Only when' yan cümlesi bittikten sonra ana cümlede devrik geçmiş zaman yapısı ('did + subject + V1') kurulmalıdır.",
            "hint": {
              "formula": "Only when + S + V + [did + S + V1]",
              "mirror": "Normalde: 'Consumers resumed...'",
              "academicNote": "Only when yan cümlesi bittikten sonra ana cümlede geçmiş zaman devrik yapısı 'did + subject + V1' (did the regional) kurulmalıdır."
            }
          },
          {
            "id": "c38_l2_q14",
            "type": "multiple-choice",
            "prompt": "Hangi seçenekte 'Only when' sonrasındaki ana cümle devrik yapısı doğru kurulmuştur?",
            "options": [
              "Only when the structural testing is complete can the new Flutter application be deployed safely.",
              "Only when is the structural testing complete the new Flutter application can be deployed safely.",
              "Only when the structural testing is complete the new Flutter application can be deployed safely."
            ],
            "correctIndex": 0,
            "translation": "Yeni Flutter uygulaması ancak yapısal testler tamamlandıktan sonra güvenli bir şekilde yayına alınabilir.",
            "explanation": "'Only when' yan cümleciği devrik olamaz ('Only when the structural testing is complete'). Devriklik ana cümlede 'can the new Flutter application be...' olarak kurulur.",
            "hint": {
              "formula": "Only when + [Düz Cümle] + [Devrik Cümle]",
              "mirror": "Yan cümleciğin düz kurulduğundan emin olun.",
              "academicNote": "Only when yan cümleciği devrilemez. Devriklik ana cümlede 'can the new Flutter...' şeklinde kurulur."
            }
          },
          {
            "id": "c38_l2_q15",
            "type": "word-bank",
            "prompt": "Blokları dizerek 'Not since' present perfect devrik yapısını oluşturun:",
            "translation": "Platform, büyük algoritma güncellemesinden bu yana hiçbir zaman bu kadar yüksek kullanıcı etkileşim seviyeleri gözlemlememişti.",
            "words": [
              "Not since the major algorithm update",
              "has the platform observed",
              "such high user engagement levels."
            ],
            "correctOrder": [
              "Not since the major algorithm update",
              "has the platform observed",
              "such high user engagement levels."
            ],
            "enSentence": "Not since the major algorithm update has the platform observed such high user engagement levels.",
            "isEngToTr": false,
            "hint": {
              "formula": "Not since + Zaman/Olay + [has/have + S + V3]",
              "mirror": "Normalde: 'The platform has observed...'",
              "academicNote": "Not since başa geldiğinde present perfect devrik 'has the platform observed' şeklinde dizilir."
            }
          },
          {
            "id": "c38_l2_q16",
            "type": "fill-blank-dropdown",
            "prompt": "Cümledeki boşluğa gelecek en uygun yardımcı fiili seçin:",
            "sentence": "Only after the engineers stabilized the LFP battery thermal parameters ___ the EV company clear the model for production.",
            "options": ["did", "does", "have", "was"],
            "correctIndex": 0,
            "translation": "Elektrikli araç şirketi, modeli seri üretim için ancak mühendisler LFP pil termal parametrelerini sabitledikten sonra onayladı.",
            "explanation": "'Only after' yan cümleciği bittikten sonra geçmiş zaman devrik yardımcı fiili 'did' kullanılmalıdır.",
            "hint": {
              "formula": "Only after + S + V + [did + S + V1]",
              "mirror": "Normalde: 'The EV company cleared...'",
              "academicNote": "Only after yan cümlesi bittikten sonra geçmiş zaman devrik yardımcı fiili 'did' olmalıdır."
            }
          },
          {
            "id": "c38_l2_q17",
            "type": "multiple-choice",
            "prompt": "Cümleyi tamamlayacak doğru devrik yapıyı seçin:",
            "sentence": "Not until the e-archive invoice from Gürgençler Bilişim was verified ___ the accountant close the quarterly log.",
            "options": [
              "did the financial officer",
              "the financial officer did",
              "has the financial officer",
              "was the financial officer"
            ],
            "correctIndex": 0,
            "translation": "Muhasebeci üç aylık kaydı ancak Gürgençler Bilişim'den gelen e-arşiv faturası doğrulandıktan sonra kapatabildi.",
            "explanation": "'Not until' kısıtlayıcı zaman yapısında devriklik ana cümlede 'did + subject + close' olarak kurulmalıdır.",
            "hint": {
              "formula": "Not until + S + V + [did + S + V1]",
              "mirror": "Geçmiş zaman devrik ana cümleyi bulun.",
              "academicNote": "Not until ile kurulan kısıtlayıcı yapıda devriklik ana cümlede 'did the financial officer' şeklinde kurulur."
            }
          },
          {
            "id": "c38_l2_q18",
            "type": "multiple-choice",
            "prompt": "Aşağıdaki cümledeki 'çifte devriklik' hatasını düzelten en uygun yapıyı bulun:",
            "options": [
              "Only after the council finalized the zoning plans did the construction start in Bodrum.",
              "Only after did the council finalize the zoning plans did the construction start in Bodrum.",
              "Only after the council finalized the zoning plans the construction did start in Bodrum."
            ],
            "correctIndex": 0,
            "translation": "Bodrum'da inşaat ancak belediye imar planlarını kesinleştirdikten sonra başladı.",
            "explanation": "'Only after' yan cümleciğinde devriklik yapılmaz. Devriklik sadece ana cümlede ('did the construction start') kurulmalıdır.",
            "hint": {
              "formula": "Only after + [Düz Cümle] + [Devrik Cümle]",
              "mirror": "Çifte devriklik hatasına dikkat edin.",
              "academicNote": "Only after yan cümleciği düz kurulur (Only after the council finalized). Devriklik sadece ana cümlede yer alır."
            }
          },
          {
            "id": "c38_l2_q19",
            "type": "inversion-transformer",
            "prompt": "Aşağıdaki düz cümleyi 'Only after' kullanarak profesyonel bir devrik akademik forma getirin:",
            "mainSentence": "The technical team identified the Noun Clause bug in Section 26 only after debugging the source code for hours.",
            "options": [
              "Only after debugging the source code for hours did the technical team identify the Noun Clause bug in Section 26.",
              "Only after debugging the source code for hours the technical team identified the Noun Clause bug in Section 26.",
              "Only after did the technical team debug the source code for hours they identified the Noun Clause bug in Section 26."
            ],
            "correctIndex": 0,
            "translation": "Teknik ekip, Bölüm 26'daki Noun Clause hatasını ancak kaynak kodu saatlerce ayıkladıktan sonra tanımlayabildi.",
            "explanation": "'Only after' ile başlayan cümlede yan cümlecik düz bağlanırken, ana cümle geçmiş zaman devrik yapısıyla ('did the technical team identify') kurulur.",
            "hint": {
              "formula": "Only after + Ving + [did + S + V1]",
              "mirror": "Düz hali: 'The technical team identified... only after debugging...'",
              "academicNote": "Only after yapısında yan cümle düz iken ana cümle 'did + subject + V1' (did the technical team identify) şeklinde devrik olur."
            }
          },
          {
            "id": "c38_l2_q20",
            "type": "word-bank",
            "prompt": "Kelime bloklarını doğru dizerek 'Only when' devrik yapısını tamamlayın:",
            "translation": "Hakim, belgeyi ancak mahkeme dijital imzayı doğruladıktan sonra yasal delil olarak kabul etti.",
            "words": [
              "Only when the court verified",
              "the digital signature",
              "did the judge admit",
              "the document as legal evidence."
            ],
            "correctOrder": [
              "Only when the court verified",
              "the digital signature",
              "did the judge admit",
              "the document as legal evidence."
            ],
            "enSentence": "Only when the court verified the digital signature did the judge admit the document as legal evidence.",
            "isEngToTr": false,
            "hint": {
              "formula": "Only when + S + V + [did + S + V1]",
              "mirror": "Normalde: 'The judge admitted...'",
              "academicNote": "Only when yan cümleciği düz (the court verified), ana cümle ise devrik geçmiş zamandır (did the judge admit)."
            }
          }
        ]
      },
      {
        "lessonId": "c38_l3",
        "lessonTitle": "Ders 3: Şartlı ve Edebi Modals Devriklikleri",
        "konuAnlatimi": {
          "baslik": "Ders 3: Şartlı ve Edebi Modals Devriklikleri",
          "teorikMantik": "Koşul cümlelerinde (If Clauses) 'if' bağlacı atıldığında cümle devrik yapıya bürünür. Tip 1 için 'Should', Tip 2 için 'Were... to V1', Tip 3 için ise 'Had... V3' cümle başına gelir.",
          "formul": "Tip 1: Should + S + V1 | Tip 2: Were + S + to V1 | Tip 3: Had + S + V3",
          "altinKural": "Tip 3 devrik yapısı olumsuz yapılırken 'Hadn't' şeklinde kısaltma başa gelemez; 'Had the government not intervened' şeklinde 'not' özneden sonra yazılmalıdır."
        },
        "questions": [
          {
            "id": "c38_l3_q1",
            "type": "matching",
            "prompt": "Devrik koşul cümleleri ile bu cümleleri tamamlayan sonuç yargılarını eşleştirin.",
            "pairs": [
              { "left": "Should the system fail", "right": "the automated backup will deploy instantly." },
              { "left": "Were the state to raise taxes", "right": "the currency would lose value rapidly." },
              { "left": "Had the engineers checked the logs", "right": "the security breach would have been avoided." },
              { "left": "Had it not been for the hybrid solar panels", "right": "the facility would have faced severe power outages." }
            ],
            "hint": {
              "formula": "Devrik koşul ve sonuç eşleştirmesi",
              "mirror": "If Clauses devriklerinin zaman uyumlarına dikkat edin.",
              "academicNote": "Koşul cümlelerindeki Should/Were/Had devrikliklerini doğru sonuç yargılarıyla eşleştirin."
            }
          },
          {
            "id": "c38_l3_q2",
            "type": "fill-blank-dropdown",
            "prompt": "Cümledeki boşluğa gelecek en uygun devrik fiili seçin:",
            "sentence": "___ the laboratory technicians detect any sudden variance in the reactor core, they will abort the simulation immediately.",
            "options": ["Should", "Were", "Had", "Would"],
            "correctIndex": 0,
            "translation": "Laboratuvar teknisyenleri reaktör çekirdeğinde ani bir sapma tespit edecek olursa, simülasyonu derhal iptal edecekler.",
            "explanation": "'If should' veya doğrudan devrik 'Should' yapısı, beklenmedik olasılıkları ifade etmek için kullanılır ve fiil yalın halde (detect) gelir.",
            "hint": {
              "formula": "Should + S + V1 (Type 1)",
              "mirror": "Detect fiilinin yalın (V1) haline dikkat edin.",
              "academicNote": "Geleceğe yönelik düşük olasılıklı koşul devrikliklerinde 'Should + özne + V1' yapısı kullanılır."
            }
          },
          {
            "id": "c38_l3_q3",
            "type": "multiple-choice",
            "prompt": "Tip 2 hayali bir senaryo için doğru devrik koşul yapısını seçin:",
            "sentence": "___ its global digital curriculum, the language app would quickly dominate the educational market.",
            "options": [
              "Were the company to expand",
              "Should the company expand",
              "Had the company expanded",
              "The company were to expand"
            ],
            "correctIndex": 0,
            "translation": "Şirket küresel dijital müfredatını genişletecek olsaydı, dil uygulaması eğitim pazarına hızla hakim olurdu.",
            "explanation": "'If the company expanded' (Tip 2) yapısının devrik alternatifi 'Were + subject + to V1' (Were the company to expand) şeklindedir.",
            "hint": {
              "formula": "Were + S + to V1 (Type 2)",
              "mirror": "Düzü: 'If the company expanded...'",
              "academicNote": "Tip 2 hayali koşul cümlelerinde eylem fiilleri devrik yapılırken 'Were + özne + to V1' (Were the company to expand) kalıbı kullanılır."
            }
          },
          {
            "id": "c38_l3_q4",
            "type": "multiple-choice",
            "prompt": "Aşağıdaki cümlelerden hangisi, devrik koşul cümlelerinin başındaki 'Hadn't' kısaltma hatasını doğru şekilde ele almıştır?",
            "options": [
              "Had the government not intervened quickly, the entire banking sector would have collapsed.",
              "Had not the government intervened quickly, the entire banking sector would have collapsed.",
              "Hadn't the government intervened quickly, the entire banking sector would have collapsed."
            ],
            "correctIndex": 0,
            "translation": "Hükümet hızlı bir şekilde müdahale etmeseydi, tüm bankacılık sektörü çökmüş olurdu.",
            "explanation": "Devrik koşul yapılarında olumsuzluk eki 'not', özneden sonra gelmelidir. 'Had' ile 'not' başa gelerek 'Hadn't' şeklinde kısaltılamaz veya 'Had not the...' olarak yazılamaz.",
            "hint": {
              "formula": "Had + S + not + V3 (Type 3 Olumsuz)",
              "mirror": "Hadn't kısaltma hatasına dikkat edin.",
              "academicNote": "Tip 3 olumsuz devrik koşul yapısında olumsuzluk eki 'not' özneden sonra gelmelidir; başa gelip kısaltılamaz."
            }
          },
          {
            "id": "c38_l3_q5",
            "type": "inversion-transformer",
            "prompt": "Aşağıdaki düz cümleyi 'Were' kullanarak devrik koşul formuna dönüştürün:",
            "mainSentence": "If it were not for the hybrid solar panels, the Bodrum house would have no hot water.",
            "options": [
              "Were it not for the hybrid solar panels, the Bodrum house would have no hot water.",
              "Were not it for the hybrid solar panels, the Bodrum house would have no hot water.",
              "Had it not been for the hybrid solar panels, the Bodrum house would have no hot water."
            ],
            "correctIndex": 0,
            "translation": "Hibrit güneş panelleri olmasaydı, Bodrum'daki evde sıcak su olmazdı.",
            "explanation": "Tip 2 kalıbındaki 'If it were not for...' yapısının devrik hali 'Were it not for...' şeklindedir.",
            "hint": {
              "formula": "Were it not for + Noun (Type 2)",
              "mirror": "Düzü: 'If it were not for...'",
              "academicNote": "Tip 2 olumsuz nominal koşul cümlelerinde 'If' düşürülerek 'Were it not for...' şeklinde devriklik kurulur."
            }
          },
          {
            "id": "c38_l3_q6",
            "type": "word-bank",
            "prompt": "Kelime bloklarını doğru dizerek Tip 2 devrik koşul yapısını kurun:",
            "translation": "Geliştirici kod mimarisini değiştirecek olsaydı, uygulama saniyede binlerce isteği sorunsuz bir şekilde işleyebilirdi.",
            "words": [
              "Were the developer to alter",
              "the code architecture,",
              "the application could handle",
              "thousands of requests smoothly."
            ],
            "correctOrder": [
              "Were the developer to alter",
              "the code architecture,",
              "the application could handle",
              "thousands of requests smoothly."
            ],
            "enSentence": "Were the developer to alter the code architecture, the application could handle thousands of requests smoothly.",
            "isEngToTr": false,
            "hint": {
              "formula": "Were + S + to V1 + [S + would/could + V1]",
              "mirror": "Düzü: 'If the developer altered...'",
              "academicNote": "Eylem fiilli Tip 2 devrik koşul cümlelerinde 'Were + özne + to + fiilin yalın hali' dizilimi izlenir."
            }
          },
          {
            "id": "c38_l3_q7",
            "type": "fill-blank-dropdown",
            "prompt": "Cümledeki boşluğa gelecek en uygun yardımcı fiili seçin:",
            "sentence": "___ you require any technical assistance with the Vercel deployment, the cloud operations team will guide you tomorrow.",
            "options": ["Should", "Were", "Had", "Would"],
            "correctIndex": 0,
            "translation": "Vercel dağıtımıyla ilgili herhangi bir teknik yardıma ihtiyaç duyacak olursanız, bulut operasyon ekibi yarın size rehberlik edecektir.",
            "explanation": "Gelecekteki düşük ihtimalli olayları ifade eden Tip 1 devrik koşul cümlelerinde yardımcı fiil olarak 'Should' tercih edilir.",
            "hint": {
              "formula": "Should + S + V1 (Type 1)",
              "mirror": "Require fiilinin yalın (V1) hali ipucudur.",
              "academicNote": "Gelecekte gerçekleşme olasılığı zayıf olan durumlarda Tip 1 devrik olarak 'Should' kullanılır."
            }
          },
          {
            "id": "c38_l3_q8",
            "type": "multiple-choice",
            "prompt": "Cümleyi Tip 3 (geçmiş hayali durum) devrik yapısına uygun tamamlayan seçeneği belirleyin:",
            "sentence": "___ the technical manager isolated the faulty JSON token sequence yesterday, the frontend crash would have been avoided.",
            "options": [
              "Had",
              "Should",
              "Were",
              "Would"
            ],
            "correctIndex": 0,
            "translation": "Teknik müdür dün hatalı JSON token dizisini izole etmiş olsaydı, ön yüzün çökmesi engellenmiş olurdu.",
            "explanation": "Geçmiş zaman hayali durumu (Tip 3) bildirmek için 'Had + subject + V3' yapısıyla devriklik kurulur.",
            "hint": {
              "formula": "Had + S + V3 (Type 3)",
              "mirror": "Dün gerçekleşen olay için Tip 3 devrik kullanın.",
              "academicNote": "Geçmiş zaman hayali koşullarda (Tip 3) devriklik 'Had + özne + V3' (Had the technical manager isolated) şeklinde kurulur."
            }
          },
          {
            "id": "c38_l3_q9",
            "type": "multiple-choice",
            "prompt": "Bir eylem fiili için Tip 2 'Were + subject + to V1' kuralına tamamen uygun olan seçeneği belirleyin:",
            "options": [
              "Were the team to integrate the dynamic calendar API, the integration process would be easier.",
              "Were the team integrate the dynamic calendar API, the integration process would be easier.",
              "Were the team integrated the dynamic calendar API, the integration process would be easier."
            ],
            "correctIndex": 0,
            "translation": "Ekip dinamik takvim API'sini entegre edecek olsaydı, entegrasyon süreci daha kolay olurdu.",
            "explanation": "Tip 2 eylem fiili devrikliklerinde 'Were + özne + to + fiilin yalın hali' (to integrate) formülü kullanılır.",
            "hint": {
              "formula": "Were + S + to V1 (Type 2)",
              "mirror": "Mastarlı (to V1) yapıyı arayın.",
              "academicNote": "Tip 2 eylem fiili devrikliklerinde 'Were + özne + to + V1' (Were the team to integrate) formülü esastır."
            }
          },
          {
            "id": "c38_l3_q10",
            "type": "inversion-transformer",
            "prompt": "Aşağıdaki düz cümleyi 'Had' kullanarak devrik koşul formuna dönüştürün:",
            "mainSentence": "If Toprak Razgatlıoğlu had not managed the rear tire wear perfectly, he couldn't have won the race.",
            "options": [
              "Had Toprak Razgatlıoğlu not managed the rear tire wear perfectly, he couldn't have won the race.",
              "Had not Toprak Razgatlıoğlu managed the rear tire wear perfectly, he couldn't have won the race.",
              "Hadn't Toprak Razgatlıoğlu managed the rear tire wear perfectly, he couldn't have won the race."
            ],
            "correctIndex": 0,
            "translation": "Toprak Razgatlıoğlu arka lastik aşınmasını mükemmel şekilde yönetmeseydi, yarışı kazanamazdı.",
            "explanation": "Tip 3 olumsuz devrik koşul cümlelerinde yardımcı fiil 'Had' başa gelir, olumsuzluk eki 'not' ise özneden sonra yer alır.",
            "hint": {
              "formula": "Had + S + not + V3 (Type 3 Olumsuz)",
              "mirror": "Düzü: 'If Toprak Razgatlıoğlu had not managed...'",
              "academicNote": "Tip 3 olumsuz devrik koşul cümlelerinde 'Had' başa gelir, 'not' ise özneden sonra yazılır."
            }
          },
          {
            "id": "c38_l3_q11",
            "type": "word-bank",
            "prompt": "Kelimeleri dizerek Tip 3 devrik koşul yapısını kurun:",
            "translation": "Finans ekibi motorin fiyatlarını takip etmiş olsaydı, bölgesel lojistik maliyetleri istikrarlı kalırdı.",
            "words": [
              "Had the financial team tracked",
              "the diesel fuel prices,",
              "the regional logistics costs",
              "would have remained stable."
            ],
            "correctOrder": [
              "Had the financial team tracked",
              "the diesel fuel prices,",
              "the regional logistics costs",
              "would have remained stable."
            ],
            "enSentence": "Had the financial team tracked the diesel fuel prices, the regional logistics costs would have remained stable.",
            "isEngToTr": false,
            "hint": {
              "formula": "Had + S + V3 + [S + would have + V3]",
              "mirror": "Düzü: 'If the financial team had tracked...'",
              "academicNote": "Tip 3 devrik yapısında 'Had + özne + V3' ile koşul yan cümlesi kurulur."
            }
          },
          {
            "id": "c38_l3_q12",
            "type": "fill-blank-dropdown",
            "prompt": "Cümledeki boşluğa gelecek en uygun fiil formunu seçin:",
            "sentence": "Had it not ___ for the strict validation rules in Section 26, the Noun Clause bug would have corrupted the database.",
            "options": ["been", "be", "being", "was"],
            "correctIndex": 0,
            "translation": "Bölüm 26'daki katı doğrulama kuralları olmasaydı, Noun Clause hatası veritabanını bozmuş olurdu.",
            "explanation": "Tip 3 koşul yapısındaki 'If it had not been for...' kalıbının devrik şekli 'Had it not been for...' şeklindedir.",
            "hint": {
              "formula": "Had it not been for + Noun (Type 3)",
              "mirror": "İsim soylu Tip 3 devrik koşul kalıbını tamamlayın.",
              "academicNote": "'If it had not been for...' yapısının devriğinde 'Had it not been for...' formülü kullanılır."
            }
          },
          {
            "id": "c38_l3_q13",
            "type": "multiple-choice",
            "prompt": "Cümleyi tamamlayacak en uygun devrik yardımcı fiili seçin:",
            "sentence": "___ the EV company to adjust the LFP battery configurations now, the vehicle range would increase significantly.",
            "options": ["Were", "Should", "Had", "Would"],
            "correctIndex": 0,
            "translation": "Elektrikli araç şirketi LFP pil konfigürasyonlarını şimdi ayarlayacak olsaydı, araç menzili önemli ölçüde artardı.",
            "explanation": "'to adjust' mastar yapısı ile kurulmuş bir hayali koşul cümlesini devrik yapmak için 'Were' yardımcı fiili başa getirilir.",
            "hint": {
              "formula": "Were + S + to V1 (Type 2)",
              "mirror": "Boşluğun devamındaki 'to adjust' yapısına dikkat edin.",
              "academicNote": "Fiilin mastar (to V1) hali ile kurulan Tip 2 devrikliklerinde yardımcı fiil olarak 'Were' başa gelir."
            }
          },
          {
            "id": "c38_l3_q14",
            "type": "multiple-choice",
            "prompt": "Aşağıdakilerden hangisi edilgen çatı (passive voice) ile kurulmuş, dil bilgisi yönünden kusursuz bir Tip 3 devrik koşul cümlesidir?",
            "options": [
              "Had the e-archive invoice not been verified by the system, the transaction would have failed.",
              "Had the e-archive invoice been not verified by the system, the transaction would have failed.",
              "Had not the e-archive invoice been verified by the system, the transaction would have failed."
            ],
            "correctIndex": 0,
            "translation": "E-arşiv faturası sistem tarafından doğrulanmasaydı, işlem başarısız olurdu.",
            "explanation": "Edilgen olumsuz devrik koşul yapısında 'Had + subject + not + been + V3' sıralaması izlenmelidir.",
            "hint": {
              "formula": "Had + S + not + been + V3 (Type 3 Edilgen)",
              "mirror": "Edilgen ve olumsuz dizilimi kontrol edin.",
              "academicNote": "Tip 3 edilgen ve olumsuz devrik yapıda 'Had + özne + not + been + V3' (Had the e-archive invoice not been verified) sıralaması izlenmelidir."
            }
          },
          {
            "id": "c38_l3_q15",
            "type": "word-bank",
            "prompt": "Kelimeleri dizerek beklenmedik durum devrik yapısını oluşturun:",
            "translation": "Otomatik betikler yetkisiz bir sunucu değişikliği tespit edecek olursa, ana sistem derhal kilitlenecektir.",
            "words": [
              "Should the automated scripts detect",
              "any unauthorized server modification,",
              "the main system",
              "will lock immediately."
            ],
            "correctOrder": [
              "Should the automated scripts detect",
              "any unauthorized server modification,",
              "the main system",
              "will lock immediately."
            ],
            "enSentence": "Should the automated scripts detect any unauthorized server modification, the main system will lock immediately.",
            "isEngToTr": false,
            "hint": {
              "formula": "Should + S + V1 + [S + will + V1]",
              "mirror": "Düzü: 'If the automated scripts detect...'",
              "academicNote": "Gelecek ihtimal Tip 1 devrik koşul cümleciğinde 'Should + özne + V1' yapısı kullanılır."
            }
          },
          {
            "id": "c38_l3_q16",
            "type": "fill-blank-dropdown",
            "prompt": "Cümledeki boşluğa gelecek en uygun yardımcı fiili seçin:",
            "sentence": "___ the regional court veto the environmental appeal next Monday, the building company will halt operations in Bodrum.",
            "options": ["Should", "Were", "Had", "Would"],
            "correctIndex": 0,
            "translation": "Bölge mahkemesi önümüzdeki Pazartesi günü çevre itirazını veto edecek olursa, inşaat şirketi Bodrum'daki faaliyetlerini durduracak.",
            "explanation": "'veto' eylemi yalın (V1) halde olduğundan, gelecek olasılığını nitelemek için devrik 'Should' kullanılmalıdır.",
            "hint": {
              "formula": "Should + S + V1 (Type 1)",
              "mirror": "Veto fiilinin yalın (V1) hali ipucudur.",
              "academicNote": "Geleceğe yönelik olasılık bildiren Tip 1 devrik yapıda 'Should' kullanılır."
            }
          },
          {
            "id": "c38_l3_q17",
            "type": "multiple-choice",
            "prompt": "Cümledeki boşluğa gelebilecek en uygun devrik fiili seçin:",
            "sentence": "___ it not for the dynamic AI document processing tools, the team could not clean the scanned historical PDFs now.",
            "options": ["Were", "Had", "Should", "Would"],
            "correctIndex": 0,
            "translation": "Dinamik yapay zeka belge işleme araçları olmasaydı, ekip taranmış tarihi PDF'leri şu an temizleyemezdi.",
            "explanation": "Şu anki duruma yönelik koşul (Tip 2) kurgulandığı için 'Were it not for...' kalıbı kullanılmalıdır.",
            "hint": {
              "formula": "Were it not for + Noun (Type 2)",
              "mirror": "Şu anki duruma atıfta bulunulduğuna dikkat edin.",
              "academicNote": "Şu ana yönelik olumsuz durum bildiren (Tip 2) nominal devrik yapıda 'Were' kullanılır."
            }
          },
          {
            "id": "c38_l3_q18",
            "type": "multiple-choice",
            "prompt": "Geleceğe yönelik düşük olasılıklı (Tip 1 ihtimal) bir durum için kurulmuş doğru devrik yapıyı seçin:",
            "options": [
              "Should any user encounter an error code during registration, the app will trigger a fallback loop.",
              "Were any user encounter an error code during registration, the app will trigger a fallback loop.",
              "Had any user encountered an error code during registration, the app will trigger a fallback loop."
            ],
            "correctIndex": 0,
            "translation": "Herhangi bir kullanıcı kayıt sırasında bir hata koduyla karşılaşacak olursa, uygulama bir kurtarma döngüsünü tetikleyecektir.",
            "explanation": "Tip 1 koşul devriklerinde 'Should + subject + V1' kalıbı kullanılır.",
            "hint": {
              "formula": "Should + S + V1 (Type 1)",
              "mirror": "Geleceğe yönelik düşük olasılıklı Tip 1 devrik arayın.",
              "academicNote": "Gelecek olasılık Tip 1 devrik koşul yapısında 'Should + özne + V1' (Should any user encounter) yapısı esastır."
            }
          },
          {
            "id": "c38_l3_q19",
            "type": "inversion-transformer",
            "prompt": "Aşağıdaki düz cümleyi 'Had' kullanarak devrik karma koşul (mixed conditional) formuna getirin:",
            "mainSentence": "If the intelligence agency had not decoded the files on time, a major geopolitical crisis would face the federation today.",
            "options": [
              "Had the intelligence agency not decoded the files on time, a major geopolitical crisis would face the federation today.",
              "Had not the intelligence agency decoded the files on time, a major geopolitical crisis would face the federation today.",
              "Were the intelligence agency not decoded the files on time, a major geopolitical crisis would face the federation today."
            ],
            "correctIndex": 0,
            "translation": "İstihbarat teşkilatı dosyaları zamanında deşifre etmemiş olsaydı, bugün federasyon büyük bir jeopolitik krizle karşı karşıya kalırlardı.",
            "explanation": "Mixed conditional yapısında geçmiş hayali koşul kısmı 'Had + subject + not + V3' şeklinde devrik yapılır.",
            "hint": {
              "formula": "Had + S + not + V3 + [S + would + V1] (Mixed)",
              "mirror": "Düzü: 'If the agency had not decoded...'",
              "academicNote": "Karma koşul (Mixed Conditional) cümlelerinde geçmiş zamana atıfta bulunan koşul kısmı 'Had + özne + not + V3' şeklinde devrik yapılır."
            }
          },
          {
            "id": "c38_l3_q20",
            "type": "word-bank",
            "prompt": "Kelimeleri doğru dizerek Tip 2 devrik koşul cümlesini kurun:",
            "translation": "Bölgesel yetkililer katı ithalat tarifeleri uygulayacak olsaydı, yerel üreticiler faaliyetlerini hızla genişletirdi.",
            "words": [
              "Were the regional authorities to impose",
              "strict import tariffs,",
              "local manufacturers",
              "would expand operations quickly."
            ],
            "correctOrder": [
              "Were the regional authorities to impose",
              "strict import tariffs,",
              "local manufacturers",
              "would expand operations quickly."
            ],
            "enSentence": "Were the regional authorities to impose strict import tariffs, local manufacturers would expand operations quickly.",
            "isEngToTr": false,
            "hint": {
              "formula": "Were + S + to V1 + [S + would + V1]",
              "mirror": "Düzü: 'If the regional authorities imposed...'",
              "academicNote": "Tip 2 devrik koşul yapısında 'Were + özne + to + V1' (Were the regional authorities to impose) dizilimi kurulur."
            }
          }
        ]
      },
      {
        "lessonId": "c38_l4",
        "lessonTitle": "Ders 4: Akademik Kıyas, Katılım ve Sıfat Devriklikleri",
        "konuAnlatimi": {
          "baslik": "Ders 4: Akademik Kıyas, Katılım ve Sıfat Devriklikleri",
          "teorikMantik": "Olumlu katılım (So did I), olumsuz katılım (Neither/Nor do I) ve karşılaştırmalı kıyaslarda (as did contemporary states) devriklik yaygındır. Ayrıca 'Sıfat + As/Though' zıtlıklarında ve yer-yön belirten (Locative/Directional) ifadelerde esas fiil öne gelir.",
          "formul": "Sıfat + As/Though + Özne + Yüklem | [Yer Zarfı] + [Esas Fiil] + [Özne]",
          "altinKural": "'Sıfat + as/though' zıtlık yapılarında yan cümlecikte devriklik yapılmaz. 'Complex though the code was' doğrudur; 'Complex though was the code' kullanımı hatalıdır."
        },
        "questions": [
          {
            "id": "c38_l4_q1",
            "type": "matching",
            "prompt": "Karşılaştırma, katılım ve sıfat devriklikleri içeren cümlelerin başlangıçlarını uygun bitişleriyle eşleştirin.",
            "pairs": [
              { "left": "The empire valued trade routing", "right": "as did contemporary European states." },
              { "left": "The virus does not survive in air", "right": "neither do these dynamic bacterial strains." },
              { "left": "Crucial though the data matrix was", "right": "the researchers delayed its online launch." },
              { "left": "Hidden deep inside the isolated room", "right": "were the primary backup servers." }
            ],
            "hint": {
              "formula": "Karşılaştırma ve zıtlık devrikleri eşleşmesi",
              "mirror": "As did/neither do/though/were yapılarının zaman ve anlam uyumunu inceleyin.",
              "academicNote": "Akademik kıyaslama, katılım ve sıfat devriklerini doğru tamamlayıcı yargılarıyla eşleştirin."
            }
          },
          {
            "id": "c38_l4_q2",
            "type": "fill-blank-dropdown",
            "prompt": "Cümledeki boşluğa gelecek en uygun yardımcı fiili seçin:",
            "sentence": "The mutated cell reacted aggressively to the enzyme injection, and so ___ the surrounding biological tissue in the petri dish.",
            "options": ["did", "does", "is", "was"],
            "correctIndex": 0,
            "translation": "Mutasyona uğramış hücre enzim enjeksiyonuna agresif tepki verdi, petri kabındaki çevreleyen biyolojik doku da öyle.",
            "explanation": "'So' ile kurulan olumlu katılım yapılarında eylem geçmiş zamanlı olduğundan, devriklik 'did + özne' şeklinde kurulmalıdır.",
            "hint": {
              "formula": "...and so + did + S",
              "mirror": "Reacted fiilinin geçmiş zamanlı (V2) oluşuna dikkat edin.",
              "academicNote": "Geçmiş zamanlı olumlu eyleme katılım bildirmek için 'so did + subject' devrik yapısı kurulur."
            }
          },
          {
            "id": "c38_l4_q3",
            "type": "multiple-choice",
            "prompt": "Tarihsel cümleyi tamamlayacak en uygun akademik kıyas ifadesini seçin:",
            "sentence": "The Ottoman administration monitored maritime trade routes closely, ___ contemporary European empires.",
            "options": [
              "as did",
              "as they did",
              "so did",
              "as do"
            ],
            "correctIndex": 0,
            "translation": "Osmanlı yönetimi, çağdaş Avrupa imparatorlukları gibi deniz ticaret yollarını yakından izledi.",
            "explanation": "'As did contemporary European empires' yapısı, iki durumu karşılaştırırken 'tıpkı onlar gibi' anlamında devrik kıyaslama yapısı kurar.",
            "hint": {
              "formula": "...as + did + S",
              "mirror": "Monitored geçmiş zaman fiili ile zaman uyumu arayın.",
              "academicNote": "Geçmiş zamanlı kıyaslamalarda 'as + did + subject' (as did contemporary European empires) yapısı kullanılır."
            }
          },
          {
            "id": "c38_l4_q4",
            "type": "multiple-choice",
            "prompt": "'Sıfat + As/Though + Özne + Yüklem' kuralını, özne ve yüklemi devirmeden doğru bir şekilde izleyen seçeneği seçin:",
            "options": [
              "Complex though the database architecture was, the team synchronized all nodes.",
              "Complex though was the database architecture, the team synchronized all nodes.",
              "Complex although the database architecture was, the team synchronized all nodes."
            ],
            "correctIndex": 0,
            "translation": "Veritabanı mimarisi karmaşık olmasına rağmen ekip tüm düğümleri senkronize etti.",
            "explanation": "'Adjective + as/though + subject + verb' zıtlık yapısında yan cümle devrik yapılamaz; 'Complex though was...' kullanımı hatalıdır. 'Although' ise sıfatı bu şekilde niteleyemez.",
            "hint": {
              "formula": "Sıfat + as/though + S + V",
              "mirror": "Yan cümleciğin düz dizilimde olduğunu kontrol edin.",
              "academicNote": "'Sıfat + as/though' zıtlık yapılarında yan cümlecikte devriklik yapılmaz. 'Complex though the database architecture was' doğrudur."
            }
          },
          {
            "id": "c38_l4_q5",
            "type": "inversion-transformer",
            "prompt": "Aşağıdaki düz cümleyi 'Mekansal Devriklik' (Locative Inversion) kuralına uygun olarak devrik forma dönüştürün:",
            "mainSentence": "A beautiful stone fountain was located in the center of the courtyard.",
            "options": [
              "Located in the center of the courtyard was a beautiful stone fountain.",
              "Located in the center of the courtyard a beautiful stone fountain was.",
              "In the center of the courtyard located was a beautiful stone fountain."
            ],
            "correctIndex": 0,
            "translation": "Avlunun ortasında güzel bir taş fıskiye bulunuyordu.",
            "explanation": "Yer bildiren sıfat-fiil öbeği ('Located in the center of the courtyard') başa geldiğinde, fiil ('was') özneden ('a beautiful stone fountain') önce gelerek mekansal devriklik kurulur.",
            "hint": {
              "formula": "[Yer Zarfı / Participle] + was/were + S",
              "mirror": "Düzü: 'A beautiful fountain was located...'",
              "academicNote": "Mekansal devrikliklerde yer bildiren öbek başa geldiğinde yardımcı fiil olmadan 'was/were + özne' (was a beautiful stone fountain) dizilimi izlenir."
            }
          },
          {
            "id": "c38_l4_q6",
            "type": "word-bank",
            "prompt": "Blokları dizerek sıfatlı zıtlık devrik cümlesini oluşturun:",
            "translation": "Veri matrisi çok önemli olmasına rağmen ekip canlı yayına almayı erteledi.",
            "words": [
              "Crucial to the final validation",
              "of the codebase was",
              "the clean formatting of Section 26."
            ],
            "correctOrder": [
              "Crucial to the final validation",
              "of the codebase was",
              "the clean formatting of Section 26."
            ],
            "enSentence": "Crucial to the final validation of the codebase was the clean formatting of Section 26.",
            "isEngToTr": false,
            "hint": {
              "formula": "Sıfat + though + S + V",
              "mirror": "Düzü: 'Although the data matrix was crucial...'",
              "academicNote": "Sıfatlı zıtlık yapısında 'Crucial though the data matrix was' şeklinde yan cümle düz fiille sonlanır."
            }
          },
          {
            "id": "c38_l4_q7",
            "type": "fill-blank-dropdown",
            "prompt": "Cümledeki boşluğa gelecek en uygun yardımcı fiili seçin:",
            "sentence": "The initial test node did not accept the incoming JSON data stream, and neither ___ the secondary cloud storage clusters.",
            "options": ["did", "do", "have", "were"],
            "correctIndex": 0,
            "translation": "İlk test düğümü gelen JSON veri akışını kabul etmedi, ikincil bulut depolama kümeleri de kabul etmedi.",
            "explanation": "'Neither' ile kurulan geçmiş zamanlı olumsuz katılım cümlelerinde devriklik yardımcı fiil olarak 'did' ile kurulur.",
            "hint": {
              "formula": "...and neither + did + S",
              "mirror": "Did not accept geçmiş zaman olumsuzluğuna katılım sağlayın.",
              "academicNote": "Geçmiş zamanlı olumsuz eyleme katılım bildirmek için 'neither + did + subject' yapısı kullanılır."
            }
          },
          {
            "id": "c38_l4_q8",
            "type": "multiple-choice",
            "prompt": "Cümleyi mekansal devriklik (Locative Inversion) kurallarına uygun tamamlayan seçeneği belirleyin:",
            "sentence": "High above the old valley ___ the massive towers of the medieval fortress, standing as a historical shield.",
            "options": [
              "stood",
              "did stand",
              "standing",
              "were stood"
            ],
            "correctIndex": 0,
            "translation": "Eski vadinin yükseklerinde, tarihi bir kalkan gibi duran ortaçağ kalesinin devasa kuleleri yükseliyordu.",
            "explanation": "Yer-yön bildiren zarf öbeği başa geldiğinde ana fiil ('stood') doğrudan özneden ('the massive towers...') önce yer alır; 'did' yardımcı fiili kullanılmaz.",
            "hint": {
              "formula": "[Yer Zarfı] + [Esas Fiil] + S",
              "mirror": "Mekansal devrikliklerde 'did' kullanılmadığına dikkat edin.",
              "academicNote": "Yer/yön bildiren öbek cümle başında olduğunda doğrudan esas fiil özneden önce gelir: 'stood the massive towers'."
            }
          },
          {
            "id": "c38_l4_q9",
            "type": "multiple-choice",
            "prompt": "Nor ile kurulan olumsuz ekleme cümlesindeki devrik yapıyı doğru veren seçeneği belirleyin:",
            "options": [
              "The local company does not manufacture hybrid inverters, nor do they plan to import components.",
              "The local company does not manufacture hybrid inverters, nor they plan to import components.",
              "The local company does not manufacture hybrid inverters, nor do they planning to import components."
            ],
            "correctIndex": 0,
            "translation": "Yerel şirket hibrit invertörler üretmiyor, bileşen ithal etmeyi de planlamıyor.",
            "explanation": "'Nor' olumsuz bağlacı cümle bağladığında ikinci cümle devrik olmalıdır: 'nor + yardımcı fiil + özne + fiil' (nor do they plan).",
            "hint": {
              "formula": "...nor + do + S + V1",
              "mirror": "Nor sonrasındaki devrik dizilimi kontrol edin.",
              "academicNote": "'Nor' olumsuz ekleme bağlacından sonra 'yardımcı fiil + özne + fiilin yalın hali' (nor do they plan) devrik yapısı kurulmalıdır."
            }
          },
          {
            "id": "c38_l4_q10",
            "type": "inversion-transformer",
            "prompt": "Aşağıdaki düz cümleyi 'Yönelimsel Devriklik' (Directional Inversion) kuralına uygun olarak devrik forma getirin:",
            "mainSentence": "The senior engineer ran down the hallway to save the primary servers.",
            "options": [
              "Down the hallway ran the senior engineer to save the primary servers.",
              "Down the hallway the senior engineer ran to save the primary servers.",
              "Down the hallway did the senior engineer run to save the primary servers."
            ],
            "correctIndex": 0,
            "translation": "Kıdemli mühendis, birincil sunucuları kurtarmak için koridordan aşağı koştu.",
            "explanation": "Yön bildiren zarf öbeği ('Down the hallway') başa geldiğinde, ana fiil ('ran') doğrudan özneden ('the senior engineer') önce yer alır.",
            "hint": {
              "formula": "[Yön Zarfı] + [Esas Fiil] + S",
              "mirror": "Düzü: 'The senior engineer ran down...'",
              "academicNote": "Yönelimsel devrikliklerde yön zarfı başa geldiğinde ana fiil özneden önce gelir: 'Down the hallway ran the senior engineer'."
            }
          },
          {
            "id": "c38_l4_q11",
            "type": "word-bank",
            "prompt": "Kelimeleri dizerek mekansal devrik yapıyı mühürleyin:",
            "translation": "Tarihi kale planının altında kraliyet muhafızlarının gizli odaları yatıyordu.",
            "words": [
              "Beneath the historic castle layout",
              "lay the hidden chambers",
              "of the royal guard."
            ],
            "correctOrder": [
              "Beneath the historic castle layout",
              "lay the hidden chambers",
              "of the royal guard."
            ],
            "enSentence": "Beneath the historic castle layout lay the hidden chambers of the royal guard.",
            "isEngToTr": false,
            "hint": {
              "formula": "[Yer Zarfı] + [Esas Fiil] + S",
              "mirror": "Düzü: 'The hidden chambers lay beneath...'",
              "academicNote": "Yer bildiren öbek başa geldiğinde 'lay the hidden chambers' şeklinde mekansal devriklik kurulur."
            }
          },
          {
            "id": "c38_l4_q12",
            "type": "fill-blank-dropdown",
            "prompt": "Cümledeki boşluğa gelecek en uygun yardımcı fiili seçin:",
            "sentence": "Innovative though the application workflow ___, it failed to dominate the global language market due to poor pedagogy.",
            "options": ["was", "did", "has", "were"],
            "correctIndex": 0,
            "translation": "Uygulama iş akışı yenilikçi olmasına rağmen, zayıf pedagoji nedeniyle küresel dil pazarına hakim olmayı başaramadı.",
            "explanation": "'Adjective + though + subject + verb' yapısında tekil özneye uygun yardımcı fiil geçmiş zaman için 'was' olmalıdır.",
            "hint": {
              "formula": "Sıfat + though + S + was",
              "mirror": "Tekil özneye uygun geçmiş zaman fiilini seçin.",
              "academicNote": "'Innovative though the application workflow was' yapısında tekil durum öznesine atıfta bulunulduğu için 'was' kullanılır."
            }
          },
          {
            "id": "c38_l4_q13",
            "type": "multiple-choice",
            "prompt": "Cümleyi doğru katılım (agreement) yapısıyla tamamlayan seçeneği belirleyin:",
            "sentence": "The regional manager in Istanbul supported the expansion plan, and ___ his colleagues working in the Erbil branch.",
            "options": [
              "so did",
              "as did",
              "neither did",
              "so have"
            ],
            "correctIndex": 0,
            "translation": "İstanbul'daki bölge müdürü genişleme planını destekledi, Erbil şubesinde çalışan meslektaşları da öyle.",
            "explanation": "Geçmiş zamanlı olumlu bir eyleme katılım bildirmek için 'so did + subject' yapısı kullanılır.",
            "hint": {
              "formula": "...and so + did + S",
              "mirror": "Supported geçmiş zaman eylemine uygun katılım yapısını seçin.",
              "academicNote": "Geçmiş zamanlı eylemlerde olumlu katılım 'so did + subject' (so did his colleagues) şeklinde devrik kurulur."
            }
          },
          {
            "id": "c38_l4_q14",
            "type": "multiple-choice",
            "prompt": "Hangi seçenekte edilgen sıfat-fiil devrik yapısı (passive participle inversion) doğru kurulmuştur?",
            "options": [
              "Attached to the official email invoice was a digital receipt from Gürgençler Bilişim.",
              "Attached to the official email invoice a digital receipt was from Gürgençler Bilişim.",
              "Attached to the official email invoice did a digital receipt be from Gürgençler Bilişim."
            ],
            "correctIndex": 0,
            "translation": "Resmi e-posta faturasına Gürgençler Bilişim'den alınan dijital makbuz eklenmişti.",
            "explanation": "Edilgen sıfat-fiil öbeği ('Attached to...') başa geldiğinde, 'was' fiili özneden ('a digital receipt') önce yer almalıdır.",
            "hint": {
              "formula": "[Edilgen Sıfat-Fiil Öbeği] + was/were + S",
              "mirror": "Edilgen öbeğin ardından fiil + özne dizilimini kontrol edin.",
              "academicNote": "Edilgen sıfat-fiil öbeği başa geldiğinde devriklik 'was/were + subject' (was a digital receipt) şeklinde kurulur."
            }
          },
          {
            "id": "c38_l4_q15",
            "type": "word-bank",
            "prompt": "Kelimeleri doğru dizerek edilgen devrik yapıyı kurun:",
            "translation": "Nadir biyolojik örnekler gözlem için sınırın diğer tarafına uçuruldu.",
            "words": [
              "Flown across the border",
              "for observation were",
              "the rare biological samples."
            ],
            "correctOrder": [
              "Flown across the border",
              "for observation were",
              "the rare biological samples."
            ],
            "enSentence": "Flown across the border for observation were the rare biological samples.",
            "isEngToTr": false,
            "hint": {
              "formula": "[Edilgen Sıfat-Fiil Öbeği] + were + S",
              "mirror": "Düzü: 'The rare biological samples were flown...'",
              "academicNote": "Edilgen devrik yapıda sıfat-fiil başa alınarak 'Flown across the border... were the rare...' dizilimi oluşturulur."
            }
          },
          {
            "id": "c38_l4_q16",
            "type": "fill-blank-dropdown",
            "prompt": "Cümledeki boşluğa gelecek en uygun yardımcı fiili seçin:",
            "sentence": "Trabzonspor dominated the first half of the tactical game, as ___ their rivals in the subsequent tournament matches.",
            "options": ["did", "does", "have", "were"],
            "correctIndex": 0,
            "translation": "Trabzonspor taktiksel oyunun ilk yarısını domine etti, sonraki turnuva maçlarında rakipleri de öyle yaptı.",
            "explanation": "'as' ile kurulan devrik karşılaştırmalarda geçmiş zamanlı eyleme atıfta bulunmak için 'did' yardımcı fiili kullanılır.",
            "hint": {
              "formula": "...as + did + S",
              "mirror": "Dominated geçmiş zaman fiiline uygun kıyaslama yapısını seçin.",
              "academicNote": "Geçmiş zaman karşılaştırmalarında 'as + did + subject' devrik yapısı kurulur."
            }
          },
          {
            "id": "c38_l4_q17",
            "type": "multiple-choice",
            "prompt": "Cümledeki boşluğa gelebilecek en uygun zıtlık sıfatını seçin:",
            "sentence": "___ though the LFP battery cells were, the engineering team refused to implement them in the new EV model.",
            "options": [
              "Efficient",
              "Efficiency",
              "An efficient",
              "More efficient"
            ],
            "correctIndex": 0,
            "translation": "LFP pil hücreleri verimli olmasına rağmen mühendislik ekibi bunları yeni elektrikli araç modelinde uygulamayı reddetti.",
            "explanation": "'Sıfat + though + subject + verb' zıtlık yapısında boşluğa doğrudan yalın haldeki sıfat ('Efficient') gelmelidir.",
            "hint": {
              "formula": "Sıfat + though + S + V",
              "mirror": "Boşluğa gelebilecek yalın sıfat formunu seçin.",
              "academicNote": "Zıtlık belirten 'Sıfat + though' kalıbının en başında yalın haldeki sıfat ('Efficient') yer almalıdır."
            }
          },
          {
            "id": "c38_l4_q18",
            "type": "multiple-choice",
            "prompt": "Olumsuz katılım cümlesindeki devriklik hatasını düzelten en uygun seçeneği belirleyin:",
            "options": [
              "The application doesn't support nested JSON fields, nor does it parse Noun Clauses in Section 26.",
              "The application doesn't support nested JSON fields, nor it parses Noun Clauses in Section 26.",
              "The application doesn't support nested JSON fields, neither it does parse Noun Clauses in Section 26."
            ],
            "correctIndex": 0,
            "translation": "Uygulama iç içe geçmiş JSON alanlarını desteklemiyor, Bölüm 26'daki Noun Clause yapılarını da çözümlemiyor.",
            "explanation": "'nor' bağlacından sonra 'does + subject + V1' şeklinde devrik bir yapı kurulmalıdır.",
            "hint": {
              "formula": "...nor + does + S + V1",
              "mirror": "Nor sonrasındaki geniş zaman devrik yapısını arayın.",
              "academicNote": "Geniş zamanlı olumsuz cümleden devamında 'nor + does + subject + V1' (nor does it parse) devrik yapısı kurulur."
            }
          },
          {
            "id": "c38_l4_q19",
            "type": "inversion-transformer",
            "prompt": "Aşağıdaki düz cümleyi 'Mekansal Devriklik' (Locative Inversion) kuralına uygun olarak devrik forma dönüştürün:",
            "mainSentence": "The legal documents concerning the Bodrum solar project property were lying on the table.",
            "options": [
              "Lying on the table were the legal documents concerning the Bodrum solar project property.",
              "Lying on the table the legal documents concerning the Bodrum solar project property were.",
              "Lying on the table did the legal documents concerning the Bodrum solar project property lie."
            ],
            "correctIndex": 0,
            "translation": "Bodrum güneş enerjisi projesi mülkiyetine ilişkin yasal belgeler masanın üzerinde duruyordu.",
            "explanation": "'Lying on the table' durum-yer belirteci başa geldiğinde yardımcı fiil olmadan doğrudan ana fiil ('were') özneden önce gelmelidir.",
            "hint": {
              "formula": "[Durum Sıfat-Fiili] + were/was + S",
              "mirror": "Düzü: 'The legal documents... were lying...'",
              "academicNote": "Mekansal devrikliklerde sıfat-fiil başa gelince ana fiil doğrudan özneden önce konumlanır: 'Lying on the table were the legal documents'."
            }
          },
          {
            "id": "c38_l4_q20",
            "type": "word-bank",
            "prompt": "Kelime bloklarını dizerek yönelimsel devrik cümleyi oluşturun:",
            "words": [
              "Into the conference room walked",
              "the regional manager",
              "along with the legal advisory board."
            ],
            "correctOrder": [
              "Into the conference room walked",
              "the regional manager",
              "along with the legal advisory board."
            ],
            "enSentence": "Into the conference room walked the regional manager along with the legal advisory board.",
            "isEngToTr": false,
            "hint": {
              "formula": "[Yön Zarfı] + [Esas Fiil] + S",
              "mirror": "Düzü: 'The regional manager walked into...'",
              "academicNote": "Yön zarfı başa geldiğinde eylem fiili özneden önce yer alır: 'Into the conference room walked the regional manager'."
            }
          }
        ]
      },
      {
        "lessonId": "c38_l5",
        "lessonTitle": "Ders 5: İleri Düzey Karma Devrik Cümle Final Zirvesi",
        "konuAnlatimi": {
          "baslik": "Ders 5: İleri Düzey Karma Devrik Cümle Final Zirvesi",
          "teorikMantik": "Tüm devrik yapı tiplerinin (sıklık, kısıtlama, koşul, kıyas, mekansal) bir arada harmanlandığı karma deneme aşamasıdır. Cümlenin başına gelen ilk kelimenin türüne göre devriklik kurallarını ayırt etmeniz gerekir.",
          "formul": "Cümle başı olumsuz/kısıtlayıcı ifadeye göre ilgili zaman ve devriklik formülünü uygulayın.",
          "altinKural": "Zaman uyumunu (Tense Agreement) kontrol edin. İkinci cümle geçmiş zamanlı ise ilk devrik cümle Past; geniş zamanlı ise Present yardımcı fiili alır."
        },
        "questions": [
          {
            "id": "c38_l5_q1",
            "type": "matching",
            "prompt": "Tüm devrik cümle çeşitlerini (zaman kırılması, sıklık, katılım, kısıtlama) uygun biçimleriyle eşleştirin.",
            "pairs": [
              { "left": "No sooner had the spacecraft entered orbit", "right": "than it lost contact with the control center." },
              { "left": "Hardly had the simulation started", "right": "when the hardware parameters fluctuated dynamically." },
              { "left": "Not only did the software block the strike", "right": "but it also encrypted the target logs." },
              { "left": "Rarely does an academic journal", "right": "publish an unverified matrix without review." }
            ],
            "hint": {
              "formula": "Karma devrik cümleler genel eşleşmesi",
              "mirror": "No sooner/Hardly/Not only/Rarely yapılarının bağlaç ve zaman uyumlarını inceleyin.",
              "academicNote": "Farklı devriklik tiplerini doğru tamamlayıcı yargıları ve korelasyonlarıyla eşleştirin."
            }
          },
          {
            "id": "c38_l5_q2",
            "type": "fill-blank-dropdown",
            "prompt": "Cümledeki boşluğa gelecek en uygun yardımcı fiili seçin:",
            "sentence": "Little ___ the research team suspect that the complex digital curriculum they designed would be adopted nationwide.",
            "options": ["did", "do", "have", "were"],
            "correctIndex": 0,
            "translation": "Araştırma ekibi, tasarladıkları karmaşık dijital müfredatın ülke çapında kabul edileceğini neredeyse hiç tahmin etmemişti.",
            "explanation": "'Little' olumsuzluk zarfı başa geldiğinde devriklik geçmiş zaman için 'did + subject + V1' şeklinde kurulur.",
            "hint": {
              "formula": "Little + did + S + V1",
              "mirror": "Suspect fiilinin yalın (V1) hali ipucudur.",
              "academicNote": "Geçmiş zamanlı bir durumu nitelemek için 'Little' devrik zarfından sonra 'did' yardımcı fiili gelir."
            }
          },
          {
            "id": "c38_l5_q3",
            "type": "multiple-choice",
            "prompt": "Aşağıdaki tarihsel zıtlık/kısıtlama ifadesi için doğru present perfect devrik kalıbını seçin:",
            "sentence": "Not since the great agricultural drought of 1970 ___ this much severe crop failure across the country.",
            "options": [
              "have local farmers suffered",
              "local farmers have suffered",
              "did local farmers suffer",
              "was local farmers suffering"
            ],
            "correctIndex": 0,
            "translation": "1970 yılındaki büyük tarımsal kuraklıktan bu yana, ülkedeki yerel çiftçiler hiçbir zaman bu kadar şiddetli bir ürün kaybı yaşamamışlardı.",
            "explanation": "'Not since...' kısıtlayıcı yapısı cümle başına geldiğinde present perfect devrik formülü 'have/has + subject + V3' (have local farmers suffered) kullanılır.",
            "hint": {
              "formula": "Not since + Zaman/Olay + [have/has + S + V3]",
              "mirror": "Present perfect devrik yapıyı seçin.",
              "academicNote": "'Not since' kısıtlayıcı yapısı başa geldiğinde present perfect devrik dizilim 'have local farmers suffered' olmalıdır."
            }
          },
          {
            "id": "c38_l5_q4",
            "type": "multiple-choice",
            "prompt": "Cümlenin başındaki 'Had' devrik koşul yapısında 'Hadn't + subject' kısaltma hatasını tamamen engelleyen doğru yapıyı seçin:",
            "options": [
              "Had the supreme court not vetoed the bill, the entire national budget would have collapsed.",
              "Had not the supreme court vetoed the bill, the entire national budget would have collapsed.",
              "Hadn't the supreme court vetoed the bill, the entire national budget would have collapsed."
            ],
            "correctIndex": 0,
            "translation": "Yüksek mahkeme tasarıyı veto etmemiş olsaydı, tüm ulusal bütçe çökmüş olurdu.",
            "explanation": "Devrik koşul cümlelerinde olumsuzluk bildiren 'not' kelimesi özneden sonra gelmelidir; baş tarafta kısaltma veya 'Had not the...' biçimi kullanılamaz.",
            "hint": {
              "formula": "Had + S + not + V3 (Type 3 Olumsuz)",
              "mirror": "Hadn't kısaltmasının başa gelemeyeceğine dikkat edin.",
              "academicNote": "Tip 3 olumsuz devrik koşul cümlelerinde 'not' kelimesi özneden sonra (Had the supreme court not vetoed) yer almalıdır."
            }
          },
          {
            "id": "c38_l5_q5",
            "type": "inversion-transformer",
            "prompt": "Aşağıdaki düz cümleyi 'Not only' kullanarak devrik forma dönüştürün:",
            "mainSentence": "The application predicts database errors and it also tracks user engagement levels.",
            "options": [
              "Not only does the application predict database errors, but it also tracks user engagement levels.",
              "Not only the application predicts database errors, but it also tracks user engagement levels.",
              "Not only did the application predict database errors, but it also tracks user engagement levels."
            ],
            "correctIndex": 0,
            "translation": "Uygulama sadece veritabanı hatalarını tahmin etmekle kalmaz, aynı zamanda kullanıcı etkileşim seviyelerini de izler.",
            "explanation": "'Not only' cümle başına geldiğinde ilk cümlede devriklik 'does + subject + V1' olarak kurulmalıdır.",
            "hint": {
              "formula": "Not only + [does/did + S + V1] + but S also...",
              "mirror": "Düzü: 'The application predicts... and also tracks...'",
              "academicNote": "Geniş zamanlı bir cümleyi 'Not only' ile devrik yaparken 'does + subject + V1' (does the application predict) yapısı kullanılır."
            }
          },
          {
            "id": "c38_l5_q6",
            "type": "word-bank",
            "prompt": "Kelime bloklarını doğru dizerek zaman kırılması devrik yapısını oluşturun:",
            "translation": "Uzay aracı yörüngeye girer girmez kontrol merkeziyle iletişimi kaybetti.",
            "words": [
              "No sooner had the spacecraft",
              "entered orbit",
              "than it lost contact",
              "with the control center."
            ],
            "correctOrder": [
              "No sooner had the spacecraft",
              "entered orbit",
              "than it lost contact",
              "with the control center."
            ],
            "enSentence": "No sooner had the spacecraft entered orbit than it lost contact with the control center.",
            "isEngToTr": false,
            "hint": {
              "formula": "No sooner + had + S + V3 + than + S + V2",
              "mirror": "Düzü: 'The spacecraft had no sooner entered orbit than...'",
              "academicNote": "Zaman kırılması yapısı 'No sooner had the spacecraft entered orbit than...' şeklinde kurulmalıdır."
            }
          },
          {
            "id": "c38_l5_q7",
            "type": "fill-blank-dropdown",
            "prompt": "Cümledeki boşluğa gelecek en uygun yardımcı fiili seçin:",
            "sentence": "Only after conducting extensive on-site market research in Erbil ___ the professional manager implement the new branching strategy.",
            "options": ["did", "does", "had", "was"],
            "correctIndex": 0,
            "translation": "Profesyonel müdür, yeni şubeleşme stratejisini ancak Erbil'de kapsamlı yerinde pazar araştırması yaptıktan sonra uyguladı.",
            "explanation": "'Only after' yan tümcesinden sonra ana cümlede geçmiş zaman devrik yapısı ('did + subject + V1') kurulmalıdır.",
            "hint": {
              "formula": "Only after + Ving + [did + S + V1]",
              "mirror": "Implement fiilinin yalın (V1) hali ipucudur.",
              "academicNote": "'Only after' yan cümleciğinden sonra gelen ana cümle geçmiş zaman devrik yardımcı fiili 'did' alır."
            }
          },
          {
            "id": "c38_l5_q8",
            "type": "multiple-choice",
            "prompt": "Cümleyi kurallara uygun şekilde tamamlayan devrik modal yapısını seçin:",
            "sentence": "___ the production team to discover a structural flaw in the LFP battery cells now, the EV launch would be delayed.",
            "options": ["Were", "Should", "Had", "Would"],
            "correctIndex": 0,
            "translation": "Üretim ekibi şu anda LFP pil hücrelerinde yapısal bir hata keşfedecek olsaydı, elektrikli araç lansmanı gecikirdi.",
            "explanation": "'to discover' mastarı ile kurulan hayali durum (Tip 2) koşul devrikliklerinde 'Were' yardımcı fiili kullanılır.",
            "hint": {
              "formula": "Were + S + to V1 (Type 2)",
              "mirror": "to discover mastar fiil yapısını kontrol edin.",
              "academicNote": "Geleceğe/şu ana yönelik hayali koşullarda mastarlı fiillerle devriklik 'Were + özne + to V1' (Were the production team) şeklinde kurulur."
            }
          },
          {
            "id": "c38_l5_q9",
            "type": "multiple-choice",
            "prompt": "'Scarcely had...' ile başlayan cümleyi doğru korelasyon ile bağlayan seçeneği belirleyin:",
            "options": [
              "Scarcely had the cloud server initiated the recovery script when the database stabilized.",
              "Scarcely had the cloud server initiated the recovery script than the database stabilized.",
              "Scarcely had the cloud server initiated the recovery script then the database stabilized."
            ],
            "correctIndex": 0,
            "translation": "Bulut sunucusu kurtarma betiğini başlatır başlatmaz veritabanı kararlı hale geldi.",
            "explanation": "'Scarcely' veya 'Hardly' devrik zaman yapıları ikinci cümleye 'when' (veya 'before') bağlacı ile bağlanır.",
            "hint": {
              "formula": "Scarcely + had + S + V3 + when + S + V2",
              "mirror": "Scarcely yapısının 'when' ile bağlandığını kontrol edin.",
              "academicNote": "Scarcely ile kurulan devrik yapılarda ikinci cümleyi bağlayan kelime 'when' olmalıdır; 'than' kullanımı hatalıdır."
            }
          },
          {
            "id": "c38_l5_q10",
            "type": "inversion-transformer",
            "prompt": "Aşağıdaki düz cümleyi 'Had' kullanarak devrik karma koşul (mixed conditional) yapısına dönüştürün:",
            "mainSentence": "If the network engineers had not installed hybrid solar inverters at the Bodrum facility last year, they would face massive blackouts now.",
            "options": [
              "Had the network engineers not installed hybrid solar inverters at the Bodrum facility last year, they would face massive blackouts now.",
              "Had not the network engineers installed hybrid solar inverters at the Bodrum facility last year, they would face massive blackouts now.",
              "Were the network engineers not installed hybrid solar inverters at the Bodrum facility last year, they would face massive blackouts now."
            ],
            "correctIndex": 0,
            "translation": "Ağ mühendisleri geçen yıl Bodrum tesisine hibrit güneş invertörleri kurmamış olsaydı, şimdi büyük elektrik kesintileriyle karşı karşıya kalırlardı.",
            "explanation": "Geçmiş zaman koşul kısmındaki (Tip 3) olumsuz yapıyı devrik yapmak için 'Had + subject + not + V3' sıralaması tercih edilir.",
            "hint": {
              "formula": "Had + S + not + V3 + [S + would + V1] (Mixed)",
              "mirror": "Düzü: 'If the network engineers had not installed...'",
              "academicNote": "Karma koşul (Mixed Conditional) yapısında geçmişe yönelik koşul kısmı 'Had + özne + not + V3' şeklinde devrik yapılır."
            }
          },
          {
            "id": "c38_l5_q11",
            "type": "word-bank",
            "prompt": "Kelime bloklarını dizerek edilgen/sıfat devrik yapısını oluşturun:",
            "translation": "Bölüm 26'nın temiz bir şekilde biçimlendirilmesi, kod tabanının nihai doğrulaması için çok önemliydi.",
            "words": [
              "Crucial to the final validation",
              "of the codebase was",
              "the clean formatting of Section 26."
            ],
            "correctOrder": [
              "Crucial to the final validation",
              "of the codebase was",
              "the clean formatting of Section 26."
            ],
            "enSentence": "Crucial to the final validation of the codebase was the clean formatting of Section 26.",
            "isEngToTr": false,
            "hint": {
              "formula": "Crucial to + Noun + was/were + S",
              "mirror": "Düzü: 'The clean formatting... was crucial...'",
              "academicNote": "Mekansal/sıfat devrik yapıda 'Crucial to the final validation... was the clean...' dizilimi esastır."
            }
          },
          {
            "id": "c38_l5_q12",
            "type": "fill-blank-dropdown",
            "prompt": "Cümledeki boşluğa gelecek en uygun yardımcı fiili seçin:",
            "sentence": "Under no circumstances ___ the technicians override the automated safety protocols during a simulated reactor test.",
            "options": ["should", "does", "did", "have"],
            "correctIndex": 0,
            "translation": "Teknisyenler, simüle edilmiş bir reaktör testi sırasında otomatik güvenlik protokollerini hiçbir koşulda devre dışı bırakmamalıdır.",
            "explanation": "'Under no circumstances' olumsuz ifadesi başa geldiğinde tavsiye/zorunluluk bildiren modal 'should' devrik olarak kullanılır.",
            "hint": {
              "formula": "Under no circumstances + should + S + V1",
              "mirror": "Zorunluluk/tavsiye bildiren modal yapıyı arayın.",
              "academicNote": "'Under no circumstances' kısıtlayıcı uyarısı başa geldiğinde devriklik 'should + subject + V1' şeklinde kurulur."
            }
          },
          {
            "id": "c38_l5_q13",
            "type": "multiple-choice",
            "prompt": "Cümledeki boşluğu dolduracak en uygun olumsuz katılım (agreement) yapısını seçin:",
            "sentence": "The administrative team from Istanbul did not approve the structural budget changes, and ___ the managers in the Erbil division.",
            "options": [
              "neither did",
              "nor they did",
              "so did",
              "as did"
            ],
            "correctIndex": 0,
            "translation": "İstanbul'daki idari ekip yapısal bütçe değişikliklerini onaylamadı, Erbil bölümündeki yöneticiler de onaylamadı.",
            "explanation": "Geçmiş zamanlı olumsuz bir eyleme katılım bildirmek için 'neither/nor + did + subject' (neither did the managers) yapısı kullanılır.",
            "hint": {
              "formula": "...and neither + did + S",
              "mirror": "Geçmiş zamanlı olumsuz eyleme katılım sağlayan devrik yapıyı seçin.",
              "academicNote": "Geçmiş zamanlı olumsuz cümlenin devamında katılım devrik yapısı 'neither did + subject' (neither did the managers) olur."
            }
          },
          {
            "id": "c38_l5_q14",
            "type": "multiple-choice",
            "prompt": "'Sıfat + As + Özne + Yüklem' yapısını dil bilgisi kurallarına tamamen uygun biçimde uygulayan seçeneği seçin:",
            "options": [
              "Flawed though the environmental report was, the ministry endorsed it immediately.",
              "Flawed though was the environmental report, the ministry endorsed it immediately.",
              "Flawed although the environmental report was, the ministry endorsed it immediately."
            ],
            "correctIndex": 0,
            "translation": "Çevre raporu kusurlu olmasına rağmen, bakanlık bunu derhal onayladı.",
            "explanation": "'though' zıtlık yapısında sıfat başa gelir fakat yan cümle devrilmez; yani 'flawed though the report was' şeklinde düz bağlanmalıdır.",
            "hint": {
              "formula": "Sıfat + though + S + V",
              "mirror": "Yan cümleciğin düz kurulduğunu kontrol edin.",
              "academicNote": "'though' zıtlık yapılarında sıfat öne alınır fakat yan cümle düz kurulur: 'Flawed though the environmental report was'."
            }
          },
          {
            "id": "c38_l5_q15",
            "type": "word-bank",
            "prompt": "Kelimeleri dizerek olumsuz sıklık zarfı devrik yapısını oluşturun:",
            "translation": "Yüksek mahkeme, kapsamlı iç tartışmalar olmadan nadiren bu kadar tartışmalı bir yargı kararı vermiştir.",
            "words": [
              "Rarely has the supreme court",
              "issued such a controversial decree",
              "without extensive inner debate."
            ],
            "correctOrder": [
              "Rarely has the supreme court",
              "issued such a controversial decree",
              "without extensive inner debate."
            ],
            "enSentence": "Rarely has the supreme court issued such a controversial decree without extensive inner debate.",
            "isEngToTr": false,
            "hint": {
              "formula": "Rarely + has/have + S + V3",
              "mirror": "Düzü: 'The supreme court has rarely issued...'",
              "academicNote": "Sıklık zarfı başa geldiğinde present perfect devrik dizilim 'Rarely has the supreme court issued' şeklinde olur."
            }
          },
          {
            "id": "c38_l5_q16",
            "type": "fill-blank-dropdown",
            "prompt": "Cümledeki boşluğa gelecek en uygun yardımcı fiili seçin:",
            "sentence": "Only by migrating the nested JSON data arrays to Vercel ___ the developers fix the layout rendering latency.",
            "options": ["could", "can", "did", "was"],
            "correctIndex": 0,
            "translation": "Geliştiriciler, düzen yükleme gecikmesini ancak iç içe geçmiş JSON veri dizilerini Vercel'e taşıyarak çözebildiler.",
            "explanation": "'Only by + Ving' yöntemsel kısıtlayıcı yapısından sonra geçmiş yetenek ifadesi için 'could + subject + V1' kullanılır.",
            "hint": {
              "formula": "Only by + Ving + [could + S + V1]",
              "mirror": "Geçmiş yetenek bildiren devrik yapıyı tamamlayın.",
              "academicNote": "'Only by' kısıtlayıcı yöntem zarfından sonra gelen geçmiş yetenek devrikliklerinde 'could' kullanılır."
            }
          },
          {
            "id": "c38_l5_q17",
            "type": "multiple-choice",
            "prompt": "Beklenmedik bir gelecek olasılığı (Tip 1 koşul) için kurulan devrik yapıyı tamamlayın:",
            "sentence": "___ any external client encounter a validation error while parsing the Noun Clause blocks, the application will drop the connection.",
            "options": ["Should", "Were", "Had", "Would"],
            "correctIndex": 0,
            "translation": "Herhangi bir harici istemci, Noun Clause bloklarını çözümlerken bir doğrulama hatasıyla karşılaşacak olursa, uygulama bağlantıyı kesecektir.",
            "explanation": "'encounter' eylemi yalın (V1) halde olduğundan beklenmedik gelecek olasılığını nitelemek için devrik 'Should' kullanılır.",
            "hint": {
              "formula": "Should + S + V1 (Type 1)",
              "mirror": "Encounter fiilinin yalın (V1) hali ipucudur.",
              "academicNote": "Gelecekteki beklenmedik olasılıkları devrik koşul yapmak için 'Should + özne + V1' (Should any external client) kullanılır."
            }
          },
          {
            "id": "c38_l5_q18",
            "type": "multiple-choice",
            "prompt": "'On no account' yapısında çifte yardımcı fiil hatasını gideren doğru seçeneği belirleyin:",
            "options": [
              "On no account must the accountant process an invoice without a verified digital receipt.",
              "On no account the accountant must process an invoice without a verified digital receipt.",
              "On no account does the accountant must process an invoice without a verified digital receipt."
            ],
            "correctIndex": 0,
            "translation": "Muhasebeci, doğrulanmış bir dijital makbuz olmadan hiçbir şekilde bir fatura işlememelidir.",
            "explanation": "'On no account' başa geldiğinde zorunluluk bildiren modal 'must' doğrudan devrik fiil olarak özneden önce gelir. 'does' ve 'must' bir arada kullanılamaz.",
            "hint": {
              "formula": "On no account + [must + S + V1]",
              "mirror": "Çifte yardımcı fiil (does ... must) hatasına dikkat edin.",
              "academicNote": "'On no account' yapısında modal 'must' doğrudan başa gelerek devriklik kurulur, başka yardımcı fiile ihtiyaç yoktur."
            }
          },
          {
            "id": "c38_l5_q19",
            "type": "inversion-transformer",
            "prompt": "Aşağıdaki düz cümleyi 'Yönelimsel Devriklik' (Directional Inversion) kuralına uygun olarak devrik forma getirin:",
            "mainSentence": "The modified racing motorcycle driven by Toprak Razgatlıoğlu sped along the racetrack.",
            "options": [
              "Along the racetrack sped the modified racing motorcycle driven by Toprak Razgatlıoğlu.",
              "Along the racetrack the modified racing motorcycle driven by Toprak Razgatlıoğlu sped.",
              "Along the racetrack did the modified racing motorcycle driven by Toprak Razgatlıoğlu speed."
            ],
            "correctIndex": 0,
            "translation": "Toprak Razgatlıoğlu'nun kullandığı modifiye yarış motosikleti yarış pisti boyunca hızla ilerledi.",
            "explanation": "Yön bildiren zarf öbeği başa geldiğinde ana fiil ('sped') doğrudan özneden önce konumlanır.",
            "hint": {
              "formula": "[Yön Zarfı] + [Esas Fiil] + S",
              "mirror": "Düzü: 'The modified racing motorcycle... sped along...'",
              "academicNote": "Yönelimsel devrikliklerde yön zarfı başa geldiğinde eylem fiili özneden önce yer alır: 'Along the racetrack sped the modified...'"
            }
          },
          {
            "id": "c38_l5_q20",
            "type": "word-bank",
            "prompt": "Kelimeleri dizerek 'Not until' devrik zaman yapısını tamamlayın:",
            "words": [
              "Not until the financial team checked",
              "the e-archive invoice from MediaMarkt",
              "did they authorize the payment."
            ],
            "correctOrder": [
              "Not until the financial team checked",
              "the e-archive invoice from MediaMarkt",
              "did they authorize the payment."
            ],
            "enSentence": "Not until the financial team checked the e-archive invoice from MediaMarkt did they authorize the payment.",
            "isEngToTr": false,
            "hint": {
              "formula": "Not until + S + V + [did + S + V1]",
              "mirror": "Düzü: 'They did not authorize... until the team checked...'",
              "academicNote": "Not until yan cümlesi düz kurulurken, ana cümle geçmiş zaman devrik yapısıyla (did they authorize) bağlanır."
            }
          }
        ]
      }
    ]
  }
];

const startMarker = 'const unit38_advanced_inversion = {';
const startIdx = fileContent.indexOf(startMarker);
if (startIdx === -1) {
  console.error('Could not find unit38_advanced_inversion start marker in data.js!');
  process.exit(1);
}

const beforePart = fileContent.substring(0, startIdx);

const appendedCode = `const curriculumData = ${JSON.stringify(curriculumDataFinal, null, 2)};

const unit38_advanced_inversion = curriculumData[0];

// Register Unit 38 (Advanced Inversion)
(function () {
  if (typeof units !== 'undefined' && typeof lessons !== 'undefined' && typeof unit38_advanced_inversion !== 'undefined') {
    const unitLessonIds = unit38_advanced_inversion.lessons.map(l => l.lessonId || l.id);

    // Push Unit 38
    units.push({
      id: 38,
      title: unit38_advanced_inversion.chapterName,
      description: "Akademik, edebi ve sınav düzeyinde (YDS/YÖKDİL) sıklık, kısıtlama, karşılaştırma ve koşul devriklikleri.",
      lessons: unitLessonIds,
      pages: "286-310"
    });

    // Push Unit 38 Lessons
    unit38_advanced_inversion.lessons.forEach(l => {
      let structuredExercises = [];
      if (l.exercises && l.exercises.length > 0) {
        structuredExercises = l.exercises.map(ex => ({
          id: ex.id,
          title: ex.title,
          description: ex.description || "",
          questions: ex.questions || []
        }));
      } else {
        structuredExercises = [
          {
            id: (l.lessonId || l.id) + "_ex1",
            title: "Alıştırma 1: Yapı ve Söz Dizimi Pratiği",
            description: l.description || "",
            questions: l.questions || []
          }
        ];
      }

      lessons.push({
        id: l.lessonId || l.id,
        unitId: 38,
        title: l.lessonTitle,
        subtitle: "Advanced Inversion (Gelişmiş Devrik Cümle Yapıları)",
        exercises: structuredExercises,
        konuAnlatimi: l.konuAnlatimi || null
      });
    });
  }
})();

// export const curriculumData = curriculumData;
if (typeof exports !== 'undefined') {
  exports.curriculumData = curriculumData;
}
`;

fs.writeFileSync('data.js', beforePart + appendedCode, 'utf8');
console.log('Successfully completed full integration of curriculumData in data.js!');
