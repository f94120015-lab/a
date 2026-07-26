import json

with open('documents/Önemli Phrasal Verbs Listesi.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

pv_items = []
for line in lines:
    if '|' in line and not line.startswith('| No') and not line.startswith('| :'):
        parts = [p.strip() for p in line.split('|')]
        if len(parts) >= 4 and parts[1].isdigit():
            no = int(parts[1])
            verb = parts[2]
            meaning = parts[3]
            pv_items.append({'no': no, 'verb': verb, 'meaning': meaning})

from generate_humanities_pv import humanities_sentences
from generate_perfect_mix_pv import get_prep_info

# Full Turkish translations for humanities sentences to build rich Grammar Bridge translation questions!
tr_translations = {
    "keep on": "Toplumsal tarihçiler, kırsal toplulukların kentsel modernleşmeye rağmen geleneksel ritüelleri uygulamaya devam ettiğini belirtmektedir.",
    "account for": "Paylaşılan inanç sistemleri gibi kültürel faktörler, tarihsel oy verme davranışlarındaki temel kaymaları sıklıkla açıklar.",
    "get rid of": "Aydınlanma filozofları, akılcı sorgulama yoluyla dogmatik hurafelerden kurtulmaya çalışmışlardır.",
    "cut down (on)": "Edebi eleştirmenler, genç yazarlara anlatı ivmesini güçlendirmek için aşırı sıfat kullanımını kısmalarını tavsiye eder.",
    "keep up with": "Çağdaş sosyologlar, dijital alt kültürlerin hızlı gelişimine yetişmekte zorlanırlar.",
    "look up to": "Rönesans sanatçıları, estetik ilham almak için klasik Greko-Romen heykeltıraşlara hayranlık duyarlardı.",
    "look down (on)": "19. yüzyıldaki aristokrat elitler, yeni gelişen işçi sınıfı edebiyatını küçük görme eğilimindeydi.",
    "set up": "Tarih kurumu, sözlü halk bilimine adanmış bir arşiv veritabanı kurmaya karar verdi.",
    "make up": "Mitolojik anlatılar, erken Mezopotamya dini yaşamının temel bir sütununu oluşturur.",
    "make up for": "Savaş sonrası hükümetler, miras restorasyonunu fonlayarak geçmişteki kültürel yıkımı telafi etmeye çalıştılar.",
    "take up": "Özgür iradeye ilişkin felsefi tartışmalar, erken modern risalelerin önemli bir kısmını kaplar.",
    "hold up": "Otokratik rejim sırasındaki sansür yasaları, avangart şiirlerin yayınlanmasını geciktirmeyi başardı.",
    "bring up": "Tarihçi, ufuk açıcı konferansında devrimde kadınların ihmal edilen rolünü gündeme getirmeye karar verdi.",
    "turn into": "Yüzyıllar boyunca sözlü halk hikayeleri standartlaştırılmış ulusal destanlara dönüşebilir.",
    "break off": "İki rakip entelektüel ekol, temel ideolojik anlaşmazlıklardan sonra diyaloğu sonlandırmaya karar verdi.",

    "put off": "Ortaçağ arkeolojisi üzerine akademik konferans, bölgedeki jeopolitik çatışmalar nedeniyle ertelendi.",
    "call off": "Müze yönetim kurulu, hassas eserlerin nakliye hasarı görmesi üzerine yıllık sergiyi iptal etmek zorunda kaldı.",
    "give up": "Filozoflar, mantıksal paradokslarla karşılaştıklarında bile temel kabullerinden nadiren vazgeçerler.",
    "look into": "Sosyolinguistler, tehlike altındaki yerli lehçelerin korunmasını incelemeyi planlıyorlar.",
    "settle down": "Etnograf, Güney Amerika'da onlarca yıl süren saha araştırmasının ardından yerleşmeye ve anılarını yazmaya karar verdi.",
    "get through": "Paleograflar için hasarlı 14. yüzyıl parşömen el yazmalarını okuyup çözmek oldukça zordu.",
    "pull through": "Yoğun ideolojik baskılara rağmen, muhalif filozof sağ kalmayı ve el yazmasını tamamlamayı başardı.",
    "take after / call for": "Tarihi anıtların korunması, acil UNESCO müdahalesini gerektirmektedir.",
    "back up (with)": "Tarihçiler, yorumlayıcı iddialarını doğrulanmış arşiv belgeleriyle desteklemelidir.",
    "run up": "KONTROLSÜZ devlet propagandası, azınlık gruplarına karşı kamusal düşmanlığı hızla tırmandırabilir.",
    "cope with": "Yerinden edilmiş nüfuslar, ev sahibi toplumlarda kültür şoku ve dil engelleriyle başa çıkmakta sıklıkla zorlanırlar.",
    "deal with": "Etik, felsefenin ahlaki sorumluluk sorularını ele almaya çalışan temel bir dalıdır.",
    "take off": "Gotik kurgu edebi türü, 19. yüzyıl Avrupası'nda hızla popülerleşmeye başladı.",
    "put on": "Tiyatro topluluğu, antik amfitiyatroda otantik bir Yunan trajedisi sahnelemeye karar verdi.",
    "come into": "Müze, özel bir vasiyet yoluyla nadir bir İzlenimci tablo koleksiyonuna konmayı başardı.",

    "clear out": "Arşivciler, su basan kütüphane bodrumundan hasarlı belgeleri temizlemek için dikkatle çalıştılar.",
    "step down": "Kamuoyundaki tartışmaların ardından beşeri bilimler fakültesi dekanı istifa etmek zorunda kaldı.",
    "break out": "Tarihçiler, 1848'de sivil huzursuzluğun patlak vermesine neden olan yapısal nedenleri analiz ederler.",
    "fall off": "Klasik filolojiye olan kamusal ilgi, modern dijital medyanın yükselişiyle düşmeye başladı.",
    "come along": "Kapsamlı Osmanlı etimolojik sözlüğünün derlenmesi son derece iyi ilerlemeye başlıyor.",
    "turn on": "Felsefi tartışmalar sıklıkla insan bilincinin hassas tanımına odaklanır.",
    "set off": "Martin Luther'in tezlerinin yayınlanması, Avrupa genelinde Protestan Reformunu tetiklemeyi başardı.",
    "take on": "Tarih bölümü, İpek Yolu ticareti üzerine çok yıllı bir araştırma projesini üstlenmeye isteklidir.",
    "come across": "Araştırmacı, kraliyet arşivlerini ararken tesadüfen Kraliçe'nin yayınlanmamış mektuplarına rastladı.",
    "rule out": "Arkeologlar, antik kalenin bir depremle yıkılmış olma ihtimalini göz ardı edemezler.",
    "wipe out": "Emperyal fetih ve zorunlu asimilasyon, tüm yerli sözlü geleneklerini yok etmeyi başardı.",
    "take over": "Yeni kurulan rejim, devlet medyasını ve eğitim müfredatını devralmak için hızla harekete geçti.",
    "keep out": "Katı manastır kuralları, dünyevi etkileri kutsal akademik mekanlardan dışarıda tutmak için tasarlanmıştı.",
    "put up with": "Erken feminist yazarlar, Viktorya toplumunun katı ataerkil kısıtlamalarına artık tahammül edemezlerdi.",
    "give rise to": "Sosyoekonomik eşitsizlik, devrimci hareketlere ve ideolojik kaymalara kolayca yol açabilir.",

    "figure out": "Dilbilimciler, gizemli Lineer B yazısının söz dizimini anlamak için onlarca yıl harcadılar.",
    "find out": "Arşiv kayıtları, tarihçilerin Rönesans katedralinin orijinal mimari planını öğrenmelerini sağladı.",
    "take place": "Tarihi antlaşma müzakereleri, Cenevre'nin tarafsız bölgesinde gerçekleşecek.",
    "make over": "Soylu aile, tarihi malikanelerini ulusal miras vakfına devretmeye karar verdi.",
    "put out": "Rahipler, antik manastır kütüphanesini tehdit eden yangını söndürmek için yorulmadan çalıştılar.",
    "bring into": "Akademik hareket, Doğu edebi estetiğini Batı romantizmine dahil etmeye çalıştı.",
    "give in": "Baskılara rağmen muhalif filozof, devlet sansürüne teslim olmayı reddetti.",
    "keep up": "Kültürel korumacılar, genç nesiller arasında sözlü hikaye anlatımı geleneklerini sürdürmeye çalışırlar.",
    "build up": "Yüzyıllar boyunca medeniyetler arası değişim, zengin bir sanat ve bilim sentezi biriktirmeye yardımcı oldu.",
    "keep off": "Tarihi tapınağın ziyaretçilerine, hassas mozaik kaldırımlardan uzak durmaları talimatı verilir.",
    "make out": "Tarihçiler, antik mermer mezar taşındaki aşınmış Latince yazıtı güçlükle okuyabildiler.",
    "set out": "18. yüzyıl gezisi, antik kalıntıları belgelemek için Akdeniz boyunca yola çıkmayı planladı.",
    "look up": "Etimologlar, tarihi sözlüklerde arkaik kök kelimelere sıklıkla bakarlar.",
    "run over": "Kentsel konutların agresif büyümesi, antik arkeolojik alanları istila etmekle tehdit ediyor.",
    "turn out": "Yeni keşfedilen tarihi günlük, Fransız Devrimi'nin harika bir anlatımı olduğu ortaya çıktı.",

    "get up": "Geleneksel manastır rutinlerinde akademisyenler, sabah duaları ve çalışma için şafakta kalkmak zorundaydı.",
    "turn up": "Filozofun yayınlanmamış el yazmaları, özel Avrupa arşivlerinde ortaya çıkmaya başladı.",
    "break through": "Postmodern teori, edebi eleştirideki katı geleneksel paradigmaları aşmayı başardı.",
    "get along with": "Antropologlar, otantik kültürel bilgiler edinmek için yerli büyüklerle iyi geçinmeyi öğrenmelidir.",
    "end up": "Kültürel eserler kataloglanmazsa, sıklıkla yasa dışı özel koleksiyonlarda son bulurlar.",
    "get over": "Ulusun iç savaşın kolektif travmasını atlatması onlarca yıl aldı.",
    "use up": "Dikkatsiz kazı teknikleri, bir alanın hassas arkeolojik bağlamını hızla tüketebilir.",
    "give off": "Antik parşömen ruloları, organik çürümeyi gösteren belirgin bir koku yayabilir.",
    "try on": "Tiyatro tarihçileri, aktörlerin antik Yunan dramasında süslü maskeleri nasıl denediklerini analiz ettiler.",
    "count on": "Araştırmacılar, doğrulanabilir veriler için hakemli tarihsel arşivlere güvenebileceklerini bilirler.",
    "fall through": "Önerilen arkeolojik gezi, diplomatik çatışmalar nedeniyle suya düşmeye başladı.",
    "look after": "Küratörler, iklim kontrollü mahzenlerde ortaçağ tekstillerini korumak için özenle çalışırlar.",
    "go through": "Tüm tarihsel anlatılar, kabul edilmeden önce kritik tarih yazımı incelemesinden geçmelidir.",
    "turn down": "Yayın kurulu, kaynak yetersizliği nedeniyle tartışmalı el yazmasını reddetmeye karar verdi.",
    "do away with": "Devrimci meclis, feodal ayrıcalıkları ve irsi unvanları kaldırmak için oy kullandı.",

    "get away with": "Emperyal güçlerin kültürel mirası uluslararası kınama olmaksızın yağmalaması yanına kâr kalamazdı.",
    "come up with": "Filozof, insanın dilsel kapasitesine ilişkin özgün bir teori üretmeyi başardı.",
    "rely on": "Tarih yazımı; günlükler ve resmi fermanlar gibi birincil kaynak belgelere strongly dayanır.",
    "put down": "Otokratik hükümdar, köylü ayaklanmasını bastırmak için kraliyet muhafızlarını kullandı.",
    "put forward": "Yapısalcı düşünür, derin dilsel kalıplar kavramını ileri süren ilk kişiydi.",
    "look through": "Araştırmacılar, Osmanlı dönemine ait binlerce mahkeme kaydını incelemek için aylar harcadılar.",
    "make for": "Karşılıklı kültürel anlayış, kalıcı uluslararası barışa her zaman katkıda bulunacaktır.",
    "care for": "Sanat restoratörleri, hasarlı Rönesans fresklerine özen göstermek için titizlikle çalışırlar.",
    "bring about": "Hareketli harflerin icadı, hümanist fikirlerin hızla yayılmasına sebep oldu.",
    "cut out": "Mütercimler, açıklığı korumak için kültürel olarak demode deyimleri sıklıkla çıkarıp atarlar.",
    "turn off": "Risalenin kuru akademik tonu, genel okuyucuları soğutmakla tehdit etti.",
    "run through": "Bağımsızlık bildirgesine yol açan temel kilit tarihsel olayları kısaca özetleyelim.",
    "send for": "Kral, çocuklarına ders vermesi için ünlü filozofu çağırmaya karar verdi.",
    "do without": "Tarihsel analiz, titiz bağlamsal doğrulama olmadan idare edemez.",
    "show off": "Rönesans hamileri, siyasi prestijlerini sergilemek için büyük portreler sipariş ettiler.",

    "think over": "Etik kurulu, genetik düzenlemenin ahlaki boyutlarını düşünmek için daha fazla zaman talep etti.",
    "change over": "Akademik disiplin, yapısalcılıktan post-yapısalcı analize dönüşmeye başladı.",
    "take care of": "Kültürel miras kuruluşları, tehlike altındaki tarihi anıtları korumayı amaçlamaktadır.",
    "run out (of)": "Kuşatılmış kale, üç ay sonra tahıl ve temiz suyu tüketmeye başladı.",
    "close down": "Totaliter rejimler sıklıkla bağımsız matbaaları ve tiyatroları kapatmak için harekete geçerler.",
    "sort out": "Filologlar, antik parçaların karışık kronolojisini çözmek için yıllarca çabaladılar.",
    "force out": "İdeolojik tasfiyeler, önde gelen muhalif aydınları üniversiteden zorla çıkarmayı başardı.",
    "do with": "Kültürel antropoloji, insanın sembolik sistemlerini anlamakla tamamen alakalıdır.",
    "turn over": "Yenilen komutan, şehir arşivlerini işgalci güçlere devretmeyi kabul etti.",
    "leave out": "Dengeli bir biyografi, kişinin erken dönem ahlaki hatalarını asla dışarıda bırakmamalıdır.",
    "cut off": "Kuşatma, başkenti hayati tarımsal art bölgelerden kesmeyi başardı.",
    "point out": "Sanat tarihçileri, İtalyan gotik sanatındaki ince Bizans etkilerini vurgulamakta gecikmediler.",
    "get in": "Akademisyenler, nadir arşiv odası açılmadan önce girmek için kütüphane kapılarında erken saatlerde kuyruğa girdiler.",
    "put over": "Diplomatik heyet, görüşmeler için tarafsız sınır kasabası yakınında konaklamaya karar verdi.",
    "work out": "Hermeneotik bilginleri, kutsal metinlerin tutarlı yorumlarını çözümlemek için ömürler harcadılar.",

    "try out": "Deneysel oyun yazarları, yeni etkileşimli sahneleme tekniklerini denemeye karar verdiler.",
    "get on": "Erken dönem sosyologlar, farklı göçmen gruplarının kentsel ortamlarda nasıl geçindiklerini analiz ettiler.",
    "take back": "Tarihçi, yeni arşiv kanıtları ortaya çıktıktan sonra hatalı iddiasını geri almak zorunda kaldı.",
    "pull through": "Hassas barış antlaşması, her iki tarafın ağır kışkırtmalarına rağmen atlatmayı başardı.",
    "wait for": "Arkeologlar, nehir yatağındaki alanı kazmadan önce kurak mevsim koşullarını beklemek zorunda kaldılar.",
    "put through": "Diplomat, son oylamada hayati barış değişikliğini geçirmeyi başardı.",
    "take to": "Okuyucu kitle, gerçekçi romanları eş benzeri görülmemiş bir coşkuyla benimsemeye başladı.",
    "bring down": "Yaygın halk protestosu, baskıcı otokratik rejimi devirmeyi başardı.",
    "look over": "Kıdemli editör, son baskıdan önce çevrilen destanı göz gezdirmeye söz verdi.",
    "look out (for)": "Tarih yazarları, saray kroniklerini okurken ideolojik önyargılara dikkat etmelidir.",
    "make do (with)": "Savaş sırasında akademisyenler, derme çatma kütüphaneler ve kıt kağıtla idare etmek zorunda kaldılar.",
    "get off": "Grand Tour üzerindeki gezginler, tarihi kilometre taşlarında arabalarından inerlerdi.",
    "take down": "Duruşma sırasında her sözlü ifadeyi kaydetmek için yazıcılar görevlendirildi.",
    "give back": "İmparatorluk müzesi, yağmalanan törensel kalıntıları yerli kabilelere geri vermeye teşvik edildi.",
    "play down": "Saray tarihçileri, resmi kayıtlarda askeri yenilginin şiddetini önemsememeye çalıştılar.",

    "pull up": "Kraliyet arabası, katedral kapılarının önünde durmayı başardı.",
    "depend on/upon": "Antik metinlerin yorumları, büyük ölçüde bağlamsal dilbilimsel bilgiye bağlıdır.",
    "follow up": "Sosyologlar, ilk çalışmalarını yirmi yıllık uzunlamasına bir anketle takip etmeyi planlıyorlar.",
    "put up": "Vatandaşlar, devrim kurbanlarını anan bir mermer anıt inşa etmek için oy kullandılar.",
    "hold out": "Kuşatılmış şehir garnizonu, ezici emperyal güçlere karşı direnmeyi başardı.",
    "show up": "Büyüleyici yeni tarihsel ipuçları, incelenmemiş kilise kayıtlarında ortaya çıkmaya devam ediyor.",
    "come up": "Yapay zeka felsefede ne zaman tartışılsa etik ikilemlerin gündeme gelmesi kaçınılmazdır.",
    "fight off": "Kültürel topluluklar, küreselleşmenin neden olduğu dilsel homojenleşmeyle mücadele etmek için çalışırlar.",
    "keep away": "Totaliter sansürcüler, yıkıcı edebiyatı üniversite öğrencilerinden uzak tutmaya çalıştılar.",
    "get out": "Gizli arşivler, tarihçilerin tarihsel gerçeği kamusal alana çıkarmasını sağladı.",
    "hold on": "Muhafazakar gelenekçiler, modernleşmeye rağmen feodal değerlere tutunmaya çalıştılar.",
    "bring in": "Kültürel değişim programı, akademiye taze sanatsal bakış açıları kazandırmaya yardımcı oldu.",
    "get away": "Sürgündeki muhalif, karanlığın örtüsü altında sınırdan kaçmayı başardı.",
    "put away": "Arşivciler, incelemeden sonra hassas 15. yüzyıl haritalarını dikkatle kaldırmalıdır.",
    "draw up": "Delegeler, yeni cumhuriyet için anayasal bir çerçeve kaleme almak üzere toplandılar.",

    "come back": "Onlarca yıllık baskının ardından, klasik felsefi realizm yeniden popülerleşmeye başladı.",
    "run down": "Önyargılı kronikçiler, emperyal fethi haklı çıkarmak için yabancı kültürleri kötülemeye çalışırlardı.",
    "open up": "Çivi yazısının çözülmesi, binlerce yıllık Yakın Doğu tarihinin önünü açmayı başardı.",
    "catch up": "Savaş sonrası Avrupa sineması, Hollywood'un teknolojik gelişmelerine yetişmek için çok çalıştı.",
    "slow down": "Ekonomik gerileme, kültürel kurum fonlamasının hızını yavaşlatmakla tehdit etti.",
    "die out": "Aktif konuşmacılar olmadan, antik sözlü hikaye anlatımı gelenekleri sonunda yok olacaktır.",
    "fill out": "Arşiv araştırmacılarının resmi el yazması talep formlarını doldurmaları gerekmektedir.",
    "turn back": "Büyük İskender'in ordusu, İndus Nehrine ulaştıktan sonra geri dönmek zorunda kaldı.",
    "get around": "Felsefi risale haberi, Avrupa üniversiteleri arasında hızla yayılmaya başladı.",
    "look for": "Arkeologlar, antik firavunun kayıp mezarını aramaya devam ediyorlar.",
    "carry out": "Tarihçiler, Vatikan kütüphanesinde kapsamlı arşiv araştırması yürütmeyi planlıyorlar.",
    "be fed up with": "18. yüzyıl düşünürleri, dogmatik skolastisizmden ve keyfi sansürden bıkmışlardı.",
    "carry on": "Siyasi sürgüne rağmen filozof, entelektüel yazılarını sürdürmeye kararlıydı."
}

chunk_size = 15
chunks = [pv_items[i:i + chunk_size] for i in range(0, len(pv_items), chunk_size)]

lesson_titles = [
    "1. Beşeri Bilimler Serisi: 1-15 (Devam Etme, Neden Olma & Dönüşüm)",
    "2. Beşeri Bilimler Serisi: 16-30 (Erteleme, İnceleme & Başa Çıkma)",
    "3. Beşeri Bilimler Serisi: 31-45 (Tarihsel Temizlik, İstifa & Devralma)",
    "4. Beşeri Bilimler Serisi: 46-60 (Metin Çözümleme, Söndürme & Yola Çıkma)",
    "5. Beşeri Bilimler Serisi: 61-75 (Aşma, Tüketme, Koruma & Reddetme)",
    "6. Beşeri Bilimler Serisi: 76-90 (İleri Sürme, İnceleme & Sergileme)",
    "7. Beşeri Bilimler Serisi: 91-105 (İyice Düşünme, Kapatma & Çözümleme)",
    "8. Beşeri Bilimler Serisi: 106-120 (Deneme, Not Alma & Geri Verme)",
    "9. Beşeri Bilimler Serisi: 121-135 (Takip Etme, Direnme & Kaleme Alma)",
    "10. Beşeri Bilimler Serisi: 136-148 (Geri Dönme, Yavaşlama & Yürütme)"
]

code_buffer = []
code_buffer.append("  // ============================================================")
code_buffer.append("  // BÖLÜM 60 / UNIT 57: 148 PHRASAL VERBS WITH GRAMMAR BRIDGE MASTERCLASS")
code_buffer.append("  // ============================================================")

all_lesson_ids = []

for l_idx, chunk in enumerate(chunks):
    lesson_num = l_idx + 1
    l_id = f"c60_l{lesson_num}"
    all_lesson_ids.append(l_id)
    
    q_arr_name = f"questions60_{lesson_num}"
    code_buffer.append(f"\n  const {q_arr_name} = [")
    
    for item_idx, item in enumerate(chunk):
        v = item['verb']
        m = item['meaning']
        sent, tr_m, syn = humanities_sentences.get(v, (f"Social historians note that researchers decided to _______ the records.", m, "continue"))
        tr_full = tr_translations.get(v, f"Tarihçiler bu konuda çalışmalarını sürdürdüler.")
        
        # Select 3 distractors
        other_v = [x for x in pv_items if x['verb'] != v]
        d1 = other_v[item_idx % len(other_v)]
        d2 = other_v[(item_idx+5) % len(other_v)]
        d3 = other_v[(item_idx+10) % len(other_v)]
        
        opt_correct = f"{v} ({m})"
        opt_d1 = f"{d1['verb']} ({d1['meaning']})"
        opt_d2 = f"{d2['verb']} ({d2['meaning']})"
        opt_d3 = f"{d3['verb']} ({d3['meaning']})"
        
        q_type_selector = item_idx % 3
        
        if q_type_selector == 0:
            # 1. fill-blank-dropdown WITH EXPLICIT TRANSLATION TO TRIGGER GRAMMAR BRIDGE!
            q_obj = {
                "id": f"u60_l{lesson_num}_q{item_idx+1}_fb",
                "type": "fill-blank-dropdown",
                "prompt": f"[Beşeri Bilimler - Soru {item['no']}/148 - Boşluk Doldurma] Metindeki boşluğa en uygun deyimsel fiili seçin:",
                "sentence": sent,
                "options": [opt_correct, opt_d1, opt_d2, opt_d3],
                "correctIndex": 0,
                "translation": tr_full,
                "explanation": f"Beşeri bilimler metnindeki bu bağlamda '{m}' (akademik eş anlamı: {syn}) anlamını sağlayan Phrasal Verb <span style='color: #ff6b6b; font-weight: bold;'>{v} ({m})</span> yapısıdır.",
                "hint": {
                    "formula": f"{v} ➔ {syn}",
                    "academicNote": f"Beşeri Bilimler Anlamı: {m}"
                }
            }
        elif q_type_selector == 1:
            # 2. multiple-choice WITH EXPLICIT TRANSLATION TO TRIGGER GRAMMAR BRIDGE!
            opts_mc = [f"<span style='color: #ff6b6b; font-weight: bold;'>{v}</span> ({m})",
                       f"<span style='color: #ff6b6b; font-weight: bold;'>{d1['verb']}</span> ({d1['meaning']})",
                       f"<span style='color: #ff6b6b; font-weight: bold;'>{d2['verb']}</span> ({d2['meaning']})",
                       f"<span style='color: #ff6b6b; font-weight: bold;'>{d3['verb']}</span> ({d3['meaning']})"]
            q_obj = {
                "id": f"u60_l{lesson_num}_q{item_idx+1}_mc",
                "type": "multiple-choice",
                "prompt": f"[Beşeri Bilimler - Soru {item['no']}/148 - Çoktan Seçmeli] Metni en uygun Phrasal Verb ile tamamlayın:<br><br><strong>'{sent}'</strong>",
                "options": opts_mc,
                "correctIndex": 0,
                "translation": tr_full,
                "explanation": f"Cümlenin beşeri bilimler bağlamına göre '{m}' (eş anlamı: {syn}) anlamı veren <span style='color: #ff6b6b; font-weight: bold;'>{v}</span> doğru seçenektir."
            }
        else:
            # 3. preposition-magnet / Uniform Options WITH EXPLICIT TRANSLATION TO TRIGGER GRAMMAR BRIDGE!
            base_v, correct_prep = get_prep_info(v)
            prep_sent = sent.replace("_______", f"{base_v} _______")
            
            preps_pool = ["on", "for", "into", "up", "with", "off", "out", "down", "about", "to", "through", "over"]
            dist_preps = [p for p in preps_pool if p != correct_prep]
            
            opts_prep = [
                f"<span style='color: #ff6b6b; font-weight: bold;'>{correct_prep}</span> ➔ {base_v} {correct_prep}",
                f"<span style='color: #ff6b6b; font-weight: bold;'>{dist_preps[0]}</span> ➔ {base_v} {dist_preps[0]}",
                f"<span style='color: #ff6b6b; font-weight: bold;'>{dist_preps[1]}</span> ➔ {base_v} {dist_preps[1]}",
                f"<span style='color: #ff6b6b; font-weight: bold;'>{dist_preps[2]}</span> ➔ {base_v} {dist_preps[2]}"
            ]
            
            q_obj = {
                "id": f"u60_l{lesson_num}_q{item_idx+1}_prep",
                "type": "multiple-choice",
                "prompt": f"[Beşeri Bilimler - Soru {item['no']}/148 - Edat Kilidi] '{base_v}' fiilini takip eden en uygun edatı (Preposition) seçin:<br><br><strong>'{prep_sent}'</strong>",
                "options": opts_prep,
                "correctIndex": 0,
                "translation": tr_full,
                "explanation": f"'{base_v}' fiili bu cümlede <span style='color: #ff6b6b; font-weight: bold;'>{correct_prep}</span> edatı ile birleşerek <span style='color: #ff6b6b; font-weight: bold;'>{v}</span> (<strong>Anlamı: {m}</strong> / <strong>Akademik Eş Anlamı: {syn}</strong>) deyimsel fiilini oluşturur."
            }
            
        code_buffer.append("    " + json.dumps(q_obj, ensure_ascii=False) + ",")

    # Erase trailing comma
    if code_buffer[-1].endswith(","):
        code_buffer[-1] = code_buffer[-1][:-1]

    code_buffer.append("  ];\n")

# Unit push code
t60_obj = {
    "id": 57,
    "originalIndex": 57,
    "title": "Akademik Deyimsel Fiiller (Beşeri Bilimler & 148 Phrasal Verbs)",
    "desc": "Tarih, Sosyoloji, Felsefe, Edebiyat, Dilbilim, Arkeoloji ve Sanat Tarihi metinleriyle 148 Phrasal Verb'ün Türkçe anlamlı, edat kilitli ve çeviri köprülü eksiksiz serisi.",
    "icon": "📚",
    "numLessons": 10,
    "subtitles": lesson_titles
}

code_buffer.append(f"  const t60 = {json.dumps(t60_obj, ensure_ascii=False, indent=4)};\n")
code_buffer.append("  units.push({")
code_buffer.append("    id: t60.id,")
code_buffer.append("    originalIndex: t60.originalIndex,")
code_buffer.append("    title: t60.title,")
code_buffer.append("    description: t60.desc,")
code_buffer.append(f"    lessons: {json.dumps(all_lesson_ids)},")
code_buffer.append('    pages: "Deyimler"')
code_buffer.append("  });\n")

# Lessons push code
for l_idx, chunk in enumerate(chunks):
    lesson_num = l_idx + 1
    l_id = f"c60_l{lesson_num}"
    q_arr_name = f"questions60_{lesson_num}"
    
    code_buffer.append("  lessons.push({")
    code_buffer.append(f'    id: "{l_id}",')
    code_buffer.append("    unitId: 57,")
    code_buffer.append(f"    title: t60.subtitles[{l_idx}],")
    code_buffer.append('    subtitle: "",')
    code_buffer.append("    exercises: [")
    code_buffer.append("      {")
    code_buffer.append(f'        id: "c60_l{lesson_num}_ex1",')
    code_buffer.append('        createdAt: "2026-07-27T00:00:00Z",')
    code_buffer.append(f'        title: "Ders {lesson_num}: Beşeri Bilimler Phrasal Verbs Testi ({chunk[0]["no"]}-{chunk[-1]["no"]})",')
    code_buffer.append(f'        description: "Tarih, Felsefe, Sosyoloji ve Edebiyat metinleri üzerinde {chunk[0]["no"]}-{chunk[-1]["no"]}. Phrasal Verb\'leri edat, eş anlam ve Dil Bilgisi Çeviri Köprüsü ile çözün.",')
    code_buffer.append(f"        questions: {q_arr_name}")
    code_buffer.append("      }")
    code_buffer.append("    ]")
    code_buffer.append("  });\n")

generated_js = "\n".join(code_buffer)
with open('generated_pv_code.js', 'w', encoding='utf-8') as f:
    f.write(generated_js)

print("Bridge-enabled PV Code generated successfully!")

