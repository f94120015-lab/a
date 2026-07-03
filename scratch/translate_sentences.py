import json
import os

translations = {
  "Although the book was very long, I finished it in two days.": "Kitap çok uzun olmasına rağmen onu iki günde bitirdim.",
  "We enjoyed our camping trip although it rained almost every night.": "Neredeyse her gece yağmur yağmasına rağmen kamp gezimizden keyif aldık.",
  "However excellent the design may be, it won't sell without proper marketing.": "Tasarım ne kadar mükemmel olursa olsun, uygun pazarlama olmadan satılmayacaktır.",
  "She went to work even though she was feeling very sick.": "Çok hasta hissetmesine rağmen işe gitti.",
  "They bought the house even though they knew it needed a lot of repairs.": "Çok fazla onarıma ihtiyacı olduğunu bilmelerine rağmen evi satın aldılar.",
  "Even though he had no formal training, his performance was flawless.": "Hiç resmi eğitimi olmamasına rağmen performansı kusursuzdu.",
  "I don't like his attitude. He is a good teacher, though.": "Onun tavrını sevmiyorum. Yine de iyi bir öğretmen.",
  "The food was delicious, though the service was quite slow.": "Servis oldukça yavaş olmasına rağmen yemekler lezzetliydi.",
  "Tired though he was after the long journey, he attended the meeting.": "Uzun yolculuktan sonra yorgun olmasına rağmen toplantıya katıldı.",
  "The strategy, though risky in the short term, proved to be highly lucrative.": "Strateji, kısa vadede riskli olsa da, son derece kazançlı olduğunu kanıtladı.",
  "Much as I want to help you, I simply do not have the time right now.": "Sana yardım etmeyi çok istememe rağmen, şu anda hiç vaktim yok.",
  "Much as they admired his intellect, they could not support his radical methods.": "Onun zekasına çok hayran olmalarına rağmen, radikal yöntemlerini destekleyemediler.",
  "Much as his great desire to win, he refused to train.": "Kazanmayı çok istemesine rağmen antrenman yapmayı reddetti.",
  "Despite his great effort, he lost the match.": "Büyük çabasına rağmen maçı kaybetti.",
  "They arrived on time in spite of the heavy traffic on the highway.": "Otoyoldaki yoğun trafiğe rağmen zamanında vardılar.",
  "In spite of the fact that she was injured, she completed the marathon.": "Sakatlanmış olmasına rağmen maratonu tamamladı.",
  "The tablet is affordable, but it lacks a high-resolution screen.": "Tablet uygun fiyatlı ama yüksek çözünürlüklü bir ekrandan yoksun.",
  "Kelly was a convicted criminal, yet many people admired him.": "Kelly hüküm giymiş bir suçluydu, yine de birçok insan ona hayran kaldı.",
  "The air conditioner is working; however , it is still hot inside.": "Klima çalışıyor; ancak içerisi hala sıcak.",
  "The initial results were promising. However , further testing revealed several bugs.": "İlk sonuçlar umut vericiydi. Ancak, daha ileri testler birkaç hata ortaya çıkardı.",
  "The director, however , decided to reject the proposal despite the board's approval.": "Yönetmen ise, yönetim kurulunun onayına rağmen teklifi reddetmeye karar verdi.",
  "The economic data was discouraging; nevertheless , the stock market reached an all-time high.": "Ekonomik veriler cesaret kırıcıydı; yine de borsada tüm zamanların en yüksek seviyesine ulaşıldı.",
  "There were serious security concerns. Nonetheless , the festival organizers decided to proceed.": "Ciddi güvenlik endişeleri vardı. Yine de, festival organizatörleri devam etmeye karar verdi.",
  "Working from home offers great flexibility. On the other hand , it can lead to isolation.": "Evden çalışmak büyük esneklik sunar. Diğer yandan, izolasyona yol açabilir.",
  "Nuclear energy is highly efficient. On the other hand , the disposal of radioactive waste remains unsolved.": "Nükleer enerji son derece verimlidir. Diğer yandan, radyoaktif atıkların bertaraf edilmesi çözülmemiş bir sorun olarak kalmaktadır.",
  "In Turkey, the summer is usually hot, whereas in England it is often rainy.": "Türkiye'de yaz genellikle sıcak geçer, oysa İngiltere'de genellikle yağmurludur.",
  "Some people prefer saving their money, while others enjoy spending it immediately.": "Bazı insanlar paralarını biriktirmeyi tercih ederken, diğerleri onu hemen harcamaktan keyif alırlar.",
  "While master's programs focus on coursework, doctoral programs require original research.": "Yüksek lisans programları ders yüküne odaklanırken, doktora programları özgün araştırma gerektirir.",
  "Unlike his brother, who loves sports, Tom prefers reading books.": "Sporu seven erkek kardeşinin aksine, Tom kitap okumayı tercih eder.",
  "Unlike traditional cars, electric vehicles produce zero direct emissions.": "Geleneksel arabaların aksine, elektrikli araçlar sıfır doğrudan emisyon üretir.",
  "Despite the fact that she is usually introverted, she spoke confidently at the conference.": "Genellikle içe dönük olmasına rağmen, konferansta kendinden emin bir şekilde konuştu.",
  "Unlike gold, which is highly unreactive, iron rusts quickly when exposed to moisture.": "Oldukça tepkisiz olan altının aksine, demir neme maruz kaldığında hızla paslanır.",
  "Contrary to popular belief, bats are not actually blind.": "Popüler inanışın aksine, yarasalar aslında kör değildir.",
  "The company selected a centralized framework, as opposed to a decentralized one.": "Şirket, merkezi olmayan bir yapı yerine merkezi bir yapıyı seçti.",
  "High tariff walls protect domestic industries; conversely , they reduce international trade volumes.": "Yüksek tarife duvarları yerli sanayiyi korur; aksine, uluslararası ticaret hacmini azaltırlar.",
  "An increase in price reduces demand. Conversely , a sharp decrease in price usually stimulates it.": "Fiyattaki bir artış talebi azaltır. Aksine, fiyattaki keskin bir düşüş genellikle onu canlandırır.",
  "The ozone hole is potentially dangerous because the ozone in the atmosphere prevents ultraviolet light.": "Ozon deliği potansiyel olarak tehlikelidir çünkü atmosferdeki ozon ultraviyole ışığı engeller.",
  "We decided to stay at home since it was snowing heavily outside.": "Dışarıda yoğun kar yağdığı için evde kalmaya karar verdik.",
  "The new algorithm is revolutionary in that it process data in parallel layers.": "Yeni algoritma, verileri paralel katmanlar halinde işlemesi bakımından devrim niteliğindedir.",
  "Now that you have completed the advanced training, you can now operate the system alone.": "İleri düzey eğitimi tamamladığınıza göre, artık sistemi tek başınıza çalıştırabilirsiniz.",
  "Seeing that the global economy is unstable, investors are moving towards gold.": "Küresel ekonominin istikrarsız olduğunu gören yatırımcılar altına yöneliyor.",
  "The flight was severely delayed because of the thick fog covering the runway.": "Pist kaplayan yoğun sis nedeniyle uçuş ciddi şekilde gecikti.",
  "Due to his excellent communication skills, he was chosen as the group leader.": "Mükemmel iletişim becerileri sayesinde grup lideri olarak seçildi.",
  "Due to the fact that the company lost its major investor, the project was cancelled.": "Şirketin büyük yatırımcısını kaybetmesi nedeniyle proje iptal edildi.",
  "The festival was cancelled on account of public safety concerns raised by the police.": "Festival, polisin dile getirdiği kamu güvenliği endişeleri nedeniyle iptal edildi.",
  "In view of the latest medical reports, the treatment was stopped immediately.": "Son tıbbi raporların ışığında, tedavi derhal durduruldu.",
  "By reason of the intense heat and lack of water, the expedition team turned back.": "Aşırı sıcaklık ve su eksikliği nedeniyle keşif ekibi geri döndü.",
  "The roads were icy and dangerous, so we drove extremely slowly.": "Yollar buzlu ve tehlikeliydi, bu yüzden son derece yavaş sürdük.",
  "In a natural disaster, seconds of warning are really vital; therefore , scientists use the latest advances to predict them.": "Doğal bir afette, saniyeler süren uyarı gerçekten hayati önem taşır; bu nedenle, bilim insanları bunları tahmin etmek için son gelişmeleri kullanırlar.",
  "The country lacks natural resources; hence , it depends heavily on imports.": "Ülke doğal kaynaklardan yoksundur; dolayısıyla, büyük ölçüde ithalata bağımlıdır.",
  "The experiment was conducted under strict vacuum; thus , no contamination occurred.": "Deney sıkı vakum altında gerçekleştirildi; böylece hiçbir kirlenme meydana gelmedi.",
  "The resort has untouched forests as well as several valuable minerals.": "Tesis, el değmemiş ormanların yanı sıra birkaç değerli minerale de sahiptir.",
  "In addition to renting the venue, we also had to pay for the catering services.": "Mekanı kiralamanın yanı sıra, yemek hizmetleri için de ödeme yapmak zorunda kaldık.",
  "Besides the heavy fines, the company faced a complete suspension of its license.": "Ağır para cezalarının yanı sıra, şirket lisansının tamamen askıya alınmasıyla karşı karşıya kaldı.",
  "The new laptop is lightweight; furthermore , its battery lasts up to 15 hours.": "Yeni dizüstü bilgisayar hafiftir; dahası, pili 15 saate kadar dayanır.",
  "The marketing strategy boosted local sales. Moreover , it attracted international buyers.": "Pazarlama stratejisi yerel satışları artırdı. Dahası, uluslararası alıcıları cezbetti.",
  "The first generation antihistamines may produce side effects, such as drowsiness and dry mouth.": "İlk nesil antihistaminikler, uyuşukluk ve ağız kuruluğu gibi yan etkilere neden olabilir.",
  "The Earth has a unique set of characteristics; for instance , it has an atmosphere that supports life.": "Dünya benzersiz özelliklere sahiptir; örneğin, yaşamı destekleyen bir atmosfere sahiptir.",
  "Many clean energy sources exist, such as solar and wind power.": "Güneş ve rüzgar enerjisi gibi many temiz enerji kaynağı mevcuttur.",
  "The patient is completely asymptomatic; in other words , she shows no signs of illness.": "Hasta tamamen semptomsuzdur; başka bir deyişle, hiçbir hastalık belirtisi göstermemektedir.",
  "We need to focus on our primary goal, namely , increasing user engagement.": "Birincil hedefimize odaklanmamız gerekiyor, yani kullanıcı etkileşimini artırmaya.",
  "The system operates on a binary logic; that is , it recognizes only true or false inputs.": "Sistem ikili bir mantıkla çalışır; yani, yalnızca doğru veya yanlış girdileri tanır.",
  "The Earth is neither too hot, like Mercury, nor too cold, like distant Mars.": "Dünya ne Merkür gibi çok sıcak, ne de uzak Mars gibi çok soğuktur.",
  "You can choose either the online course or the weekend seminar.": "Çevrimiçi kursu veya hafta sonu seminerini seçebilirsiniz.",
  "Neither the director nor the actors were present at the rehearsal yesterday.": "Dün provada ne yönetmen ne de oyuncular hazırdı.",
  "The experience was so fascinating that I will never forget it.": "Deneyim o kadar büyüleyiciydi ki onu asla unutmayacağım.",
  "It was such a complex algorithm that the junior developers couldn't solve it.": "O kadar karmaşık bir algoritmaydı ki genç geliştiriciler onu çözemedi.",
  "He woke up early in order to catch the first train to Ankara.": "Ankara'ya giden ilk treni yakalamak amacıyla erken uyandı.",
  "We packed our bags quickly so as to not be late for the flight.": "Uçuşa geç kalmamak amacıyla çantalarimizi hızlıca topladık.",
  "He left the door open so that the dog could go out easily.": "Köpeğin kolayca dışarı çıkabilmesi amacıyla kapıyı açık bıraktı.",
  "The encrypted file was hidden in order that unauthorized users might not access it.": "Şifrelenmiş dosya, yetkisiz kullanıcıların erişememesi amacıyla gizlendi.",
  "They locked the laboratory gates in order that no one could enter without permission.": "Laboratuvar kapılarını hiç kimsenin izinsiz girememesi amacıyla kilitlediler.",
  "The laboratory is open every day except for Sundays.": "Laboratuvar, Pazar günleri hariç her gün açıktır.",
  "Aside from a few minor errors, the software architecture is absolutely flawless.": "Birkaç küçük hata dışında, yazılım mimarisi kesinlikle kusursuzdur.",
  "According to recent studies, your biological clock can be confused by computer light.": "Son araştırmalara göre, biyolojik saatiniz bilgisayar ışığı nedeniyle şaşabilir.",
  "The project was a huge success in terms of revenue, but not in terms of user satisfaction.": "Proje, gelir açısından büyük bir başarıydı, ancak kullanıcı memnuniyeti açısından değil.",
  "The committee voted in favor of the new design, abandoning the old prototype completely.": "Komite, eski prototipi tamamen terk ederek yeni tasarım lehine oy kullandı.",
  "We should use clean energy sources instead of burning fossil fuels.": "Fosil yakıtları yakmak yerine temiz enerji kaynaklarını kullanmalıyız.",
  "Investors prefer to see tangible results rather than theoretical promises.": "Yatırımcılar, teorik vaatler yerine somut sonuçlar görmeyi tercih ederler.",
  "They used a digital tool instead of the manual calculation.": "Manuel hesaplama yerine dijital bir araç kullandılar.",
  "He talked about the complex quantum theory as if he were an expert in that field.": "Karmaşık kuantum teorisi hakkında sanki o alanda bir uzmanmış gibi konuştu.",
  "When it comes to data security, the firm leaves nothing to chance.": "Veri güvenliği söz konusu olduğunda, firma hiçbir şeyi şansa bırakmaz."
}

import re

# Helper to normalize a sentence for matching
def normalize(s):
    # Remove annotations like (Doğru - ...), (YANLIŞ - ...), / , etc.
    s = re.sub(r'\(Doğru - [^\)]+\)', '', s)
    s = re.sub(r'\(Yanlış - [^\)]+\)', '', s)
    s = re.sub(r'\(YANLIŞ - [^\)]+\)', '', s)
    s = re.sub(r'\[cite: \d+\]', '', s)
    s = s.replace('/', '').replace(';', '').replace(',', '')
    return ''.join(c.lower() for c in s if c.isalnum())

# Normalize translations keys
norm_translations = {}
for k, v in translations.items():
    norm_translations[normalize(k)] = v

clean_path = os.path.join(os.path.dirname(__file__), 'clean_sentences.json')
with open(clean_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for lesson_key, items in data.items():
    for item in items:
        en_cleaned = item['en']
        # Remove annotations from raw sentence
        en_cleaned = re.sub(r'\(Doğru - [^\)]+\)', '', en_cleaned)
        en_cleaned = re.sub(r'\(Yanlış - [^\)]+\)', '', en_cleaned)
        en_cleaned = re.sub(r'\(YANLIŞ - [^\)]+\)', '', en_cleaned)
        en_cleaned = re.sub(r'\[cite: \d+\]', '', en_cleaned)
        en_cleaned = en_cleaned.replace(" ; ", "; ").replace(" , ", ", ").strip()
        item['en'] = en_cleaned
        
        # Populate translation if it exists in our dictionary
        if not item['tr']:
            norm_en = normalize(en_cleaned)
            if norm_en in norm_translations:
                item['tr'] = norm_translations[norm_en]
            else:
                # Fallback to checking substrings
                for k, v in translations.items():
                    if normalize(k) in norm_en or norm_en in normalize(k):
                        item['tr'] = v
                        break

# Check if any missing
missing_count = 0
for lesson_key, items in data.items():
    for item in items:
        if not item['tr']:
            print(f"MISSING: {item['en']}")
            missing_count += 1

print(f"Total missing translations after matching: {missing_count}")

out_path = os.path.join(os.path.dirname(__file__), 'completed_sentences.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Saved completed_sentences.json successfully!")
