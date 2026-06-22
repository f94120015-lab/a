# Let's define the lists of sentences for each tip and write a script to produce the javascript representation.

t1_sentences = [
    ("Is the data valid?", "Veri geçerli midir?", "valid", "geçerli", "Is the data ___?"),
    ("Are the documents ready?", "Belgeler hazır mıdır?", "ready", "hazır", "Are the documents ___?"),
    ("Was the concept clear?", "Kavram açık mıydı?", "clear", "açık", "Was the concept ___?"),
    ("Were the methods standards?", "Yöntemler standart mıydı?", "standards", "standart", "Were the methods ___?"),
    ("Is the author present?", "Yazar mevcut mudur?", "present", "mevcut", "Is the author ___?"),
    ("Are the factors internal?", "Faktörler içsel midir?", "internal", "içsel", "Are the factors ___?"),
    ("Was the response negative?", "Yanıt olumsuz muydu?", "negative", "olumsuz", "Was the response ___?"),
    ("Were the criteria strict?", "Kriterler katı mıydı?", "strict", "katı", "Were the criteria ___?"),
    ("Is the sector growing?", "Sektör büyüyor mu?", "growing", "büyüyor", "Is the sector ___?"),
    ("Are you the analyst?", "Siz analist misiniz?", "analyst", "analist", "Are you the ___?"),
    ("Is the legal framework sufficient for this case?", "Yasal çerçeve bu dava için yeterli midir?", "framework", "çerçeve", "Is the legal ___ sufficient for this case?"),
    ("Are the economic indicators stable this month?", "Ekonomik göstergeler bu ay istikrarlı mıdır?", "stable", "istikrarlı", "Are the economic indicators ___ this month?"),
    ("Was the initial assessment fully accurate?", "İlk değerlendirme tamamen doğru muydu?", "assessment", "değerlendirme", "Was the initial ___ fully accurate?"),
    ("Were the specific sources verified by experts?", "Belirli kaynaklar uzmanlar tarafından doğrulandı mı?", "verified", "doğrulandı", "Were the specific sources ___ by experts?"),
    ("Is the financial structure completely transparent?", "Finansal yapı tamamen şeffaf mıdır?", "structure", "yapı", "Is the financial ___ completely transparent?"),
    ("Are the individual variables controlled well?", "Bireysel değişkenler iyi kontrol ediliyor mu?", "variables", "değişkenler", "Are the individual ___ controlled well?"),
    ("Was the primary benefit clearly identified?", "Temel fayda açıkça belirlendi mi?", "benefit", "fayda", "Was the primary ___ clearly identified?"),
    ("Were the environmental factors considered?", "Çevresel faktörler dikkate alındı mı?", "factors", "faktörler", "Were the environmental ___ considered?"),
    ("Is the final outcome satisfactory for everyone?", "Nihai sonuç herkes için tatmin edici midir?", "outcome", "sonuç", "Is the final ___ satisfactory for everyone?"),
    ("Are these academic journals peer-reviewed?", "Bu akademik dergiler hakemli midir?", "academic", "akademik", "Are these ___ journals peer-reviewed?"),
    ("Is the methodological approach relevant to the current study?", "Metodolojik yaklaşım mevcut çalışma ile ilgili midir?", "approach", "yaklaşım", "Is the methodological ___ relevant to the current study?"),
    ("Are the statistical computations available for public review?", "İstatistiksel hesaplamalar kamuya açık inceleme için mevcut mudur?", "available", "mevcut", "Are the statistical computations ___ for public review?"),
    ("Was the constitutional amendment approved by the parliament?", "Anayasa değişikliği parlamento tarafından onaylandı mı?", "amendment", "değişiklik", "Was the constitutional ___ approved by the parliament?"),
    ("Were the administrative procedures followed during the crisis?", "Kriz sırasında idari prosedürler takip edildi mi?", "procedures", "prosedürler", "Were the administrative ___ followed during the crisis?"),
    ("Is the theoretical assumption supported by empirical evidence?", "Teorik varsayım ampirik kanıtlarla destekleniyor mu?", "assumption", "varsayım", "Is the theoretical ___ supported by empirical evidence?"),
    ("Are the global distribution networks functional right now?", "Küresel dağıtım ağları şu anda işlevsel midir?", "distribution", "dağıtım", "Are the global ___ networks functional right now?"),
    ("Was the historical document genuine according to analysts?", "Tarihsel belge analistlere göre orijinal miydi?", "analysts", "analistlere", "Was the historical document genuine according to ___?"),
    ("Were the experimental results consistent across all trials?", "Deneysel sonuçlar tüm denemelerde tutarlı mıydı?", "consistent", "tutarlı", "Were the experimental results ___ across all trials?"),
    ("Is the institutional framework adaptable to new legislation?", "Kurumsal çerçeve yeni mevzuata uyarlanabilir mi?", "legislation", "mevzuata", "Is the institutional framework adaptable to new ___?"),
    ("Are the demographic categories exclusive in this research?", "Bu araştırmada demografik kategoriler birbirini dışlayıcı mıdır?", "categories", "kategoriler", "Are the demographic ___ exclusive in this research?")
]

t2_sentences = [
    ("Did you analyze it?", "Onu analiz ettin mi?", "analyze", "analiz ettin", "Did you ___ it?"),
    ("Does it function well?", "İyi çalışıyor mu?", "function", "çalışıyor", "Does it ___ well?"),
    ("Do they export goods?", "Mal ihraç ediyorlar mı?", "export", "ihraç ediyorlar", "Do they ___ goods?"),
    ("Did he publish the book?", "Kitabı yayımladı mı?", "publish", "yayımladı", "Did he ___ the book?"),
    ("Does she assume the risk?", "Riski üstleniyor mu?", "assume", "üstleniyor", "Does she ___ the risk?"),
    ("Do we require a permit?", "İzin belgesi gerekiyor mu?", "require", "gerekiyor", "Do we ___ a permit?"),
    ("Did it indicate a change?", "Bir değişiklik gösterdi mi?", "indicate", "gösterdi", "Did it ___ a change?"),
    ("Does this derive from code?", "Bu, kuraldan mı türiyor?", "derive", "türiyor", "Does this ___ from code?"),
    ("Do they source materials locally?", "Malzemeleri yerel olarak mı tedarik ediyorlar?", "source", "tedarik ediyorlar", "Do they ___ materials locally?"),
    ("Did you estimate the cost?", "Maliyeti tahmin ettin mi?", "estimate", "tahmin ettin", "Did you ___ the cost?"),
    ("Did the analyst evaluate the raw data?", "Analist ham veriyi değerlendirdi mi?", "evaluate", "değerlendirdi", "Did the analyst ___ the raw data?"),
    ("Does the government modify the tax policy?", "Hükümet vergi politikasını değiştiriyor mu?", "modify", "değiştiriyor", "Does the government ___ the tax policy?"),
    ("Do researchers establish a clear framework?", "Araştırmacılar net bir çerçeve kuruyor mu?", "establish", "kuruyor", "Do researchers ___ a clear framework?"),
    ("Did the committee exclude the final report?", "Komite nihai raporu hariç tuttu mu?", "exclude", "hariç tuttu", "Did the committee ___ the final report?"),
    ("Does this factor influence the public opinion?", "Bu faktör kamuoyunu etkiliyor mu?", "influence", "etkiliyor", "Does this factor ___ the public opinion?"),
    ("Do institutions structure their academic curriculum?", "Kurumlar akademik müfredatlarını yapılandırıyor mu?", "structure", "yapılandırıyor", "Do institutions ___ their academic curriculum?"),
    ("Did the team integrate the new software?", "Ekip yeni yazılımı entegre etti mi?", "integrate", "entegre etti", "Did the team ___ the new software?"),
    ("Does the theory define the phenomenon correctly?", "Teori olguyu doğru tanımlıyor mu?", "define", "tanımlıyor", "Does the theory ___ the phenomenon correctly?"),
    ("Do companies achieve their annual production goals?", "Şirketler yıllık üretim hedeflerine ulaşıyor mu?", "achieve", "ulaşıyor", "Do companies ___ their annual production goals?"),
    ("Did the manager adjust the financial budget?", "Müdür finansal bütçeyi ayarladı mı?", "adjust", "ayarladı", "Did the manager ___ the financial budget?"),
    ("Did the administration abolish the controversial labor legislation?", "Yönetim tartışmalı iş mevzuatını kaldırdı mı?", "abolish", "kaldırdı", "Did the administration ___ the controversial labor legislation?"),
    ("Does the regional economy affect the minority distribution?", "Bölgesel ekonomi azınlık dağılımını etkiliyor mu?", "affect", "etkiliyor", "Does the regional economy ___ the minority distribution?"),
    ("Do separate departments allocate their resources independently?", "Ayrı departmanlar kaynaklarını bağımsız olarak mı tahsis ediyor?", "allocate", "tahsis ediyor", "Do separate departments ___ their resources independently?"),
    ("Did the university adopt the progressive assessment model?", "Üniversite ilerici değerlendirme modelini benimsedi mi?", "adopt", "benimsedi", "Did the university ___ the progressive assessment model?"),
    ("Does this specific variable alter the final analysis?", "Bu özel değişken nihai analizi değiştiriyor mu?", "alter", "değiştiriyor", "Does this specific variable ___ the final analysis?"),
    ("Do modern societies sustain their unique cultural identity?", "Modern toplumlar benzersiz kültürel kimliklerini sürdürüyor mu?", "sustain", "sürdürüyor", "Do modern societies ___ their unique cultural identity?"),
    ("Did the supreme court challenge the legal definition today?", "Anayasa Mahkemesi bugün yasal tanımı sorguladı mı?", "challenge", "sorguladı", "Did the supreme court ___ the legal definition today?"),
    ("Does the ancient text imply rigid social structures?", "Antik metin katı sosyal yapılar mı ima ediyor?", "imply", "ima ediyor", "Does the ancient text ___ rigid social structures?"),
    ("Do laboratory technicians conduct the primary safety experiment?", "Laboratuvar teknisyenleri temel güvenlik deneyini yürütüyor mu?", "conduct", "yürütüyor", "Do laboratory technicians ___ the primary safety experiment?"),
    ("Did the participants interpret the survey instructions accurately?", "Katılımcılar anket yönergelerini doğru yorumladı mı?", "interpret", "yorumladı", "Did the participants ___ the survey instructions accurately?")
]

t3_sentences = [
    ("Why is the data wrong?", "Veri neden yanlıştır?", "wrong", "yanlıştır", "Why is the data ___?"),
    ("Where are the documents?", "Belgeler nerededir?", "Where", "nerededir", "___ are the documents?"),
    ("What was the concept?", "Kavram neydi?", "What", "neydi", "___ was the concept?"),
    ("How is the method?", "Yöntem nasıldır?", "How", "nasıldır", "___ is the method?"),
    ("Who was the author?", "Yazar kimdi?", "Who", "kimdi", "___ was the author?"),
    ("Why were the factors dynamic?", "Faktörler neden dinamikti?", "dynamic", "dinamikti", "Why were the factors ___?"),
    ("Where is the sector?", "Sektör nerededir?", "Where", "nerededir", "___ is the sector?"),
    ("What is the percentage?", "Yüzde kaçtır?", "percentage", "yüzde", "What is the ___?"),
    ("How was the response?", "Yanıt nasıldı?", "response", "yanıt", "How was the ___?"),
    ("Who is the analyst?", "Analist kimdir?", "analyst", "analist", "Who is the ___?"),
    ("Why are the legal criteria so rigid?", "Yasal kriterler neden bu kadar katıdır?", "rigid", "katıdır", "Why are the legal criteria so ___?"),
    ("What will be the primary benefit?", "Temel fayda ne olacaktır?", "benefit", "fayda", "What will be the primary ___?"),
    ("How is the financial structure today?", "Bugün finansal yapı nasıldır?", "structure", "yapı", "How is the financial ___ today?"),
    ("Where were the specific sources found?", "Belirli kaynaklar nerede bulundu?", "found", "bulundu", "Where were the specific sources ___?"),
    ("Why is the initial assessment incomplete?", "İlk değerlendirme neden eksiktir?", "assessment", "değerlendirme", "Why is the initial ___ incomplete?"),
    ("What can be the potential outcome?", "Potansiyel sonuç ne olabilir?", "outcome", "sonuç", "What can be the potential ___?"),
    ("Who is the principal investigator here?", "Buradaki asıl araştırmacı kimdir?", "investigator", "araştırmacı", "Who is the principal ___ here?"),
    ("How were the variables so unpredictable?", "Değişkenler nasıl bu kadar tahmin edilemezdi?", "variables", "değişkenler", "How were the ___ so unpredictable?"),
    ("What is the major function of this?", "Bunun ana işlevi nedir?", "function", "işlevi", "What is the major ___ of this?"),
    ("Where are the individual responses?", "Bireysel yanıtlar nerededir?", "responses", "yanıtlar", "Where are the individual ___?"),
    ("Why is the theoretical framework of this study unstable?", "Bu çalışmanın teorik çerçevesi neden istikrarsızdır?", "framework", "çerçevesi", "Why is the theoretical ___ of this study unstable?"),
    ("What was the ultimate constitutional authority of the state?", "Devletin nihai anayasal yetkisi neydi?", "authority", "yetkisi", "What was the ultimate constitutional ___ of the state?"),
    ("How are the economic indicators relevant to this region?", "Ekonomik göstergeler bu bölgeyle nasıl ilgilidir?", "indicators", "göstergeler", "How are the economic ___ relevant to this region?"),
    ("Where is the administrative policy document located now?", "İdari politika belgesi şimdi nerede bulunuyor?", "located", "bulunuyor", "Where is the administrative policy document ___ now?"),
    ("Why were the environmental factors excluded from the report?", "Çevresel faktörler neden rapordan hariç tutuldu?", "excluded", "hariç tutuldu", "Why were the environmental factors ___ from the report?"),
    ("What will be the long-term significance of this discovery?", "Bu keşfin uzun vadeli önemi ne olacaktır?", "significance", "önemi", "What will be the long-term ___ of this discovery?"),
    ("How is the statistical analysis useful for predictions?", "İstatistiksel analiz tahminler için nasıl yararlıdır?", "analysis", "analiz", "How is the statistical ___ useful for predictions?"),
    ("Who was the original creator of this specific methodology?", "Bu özel metodolojinin özgün yaratıcısı kimdi?", "methodology", "metodolojinin", "Who was the original creator of this specific ___?"),
    ("Why is the global distribution of resources so unequal?", "Küresel kaynak dağıtımı neden bu kadar adaletsizdir?", "distribution", "dağıtımı", "Why is the global ___ of resources so unequal?"),
    ("What are the primary components of this chemical compound?", "Bu kimyasal bileşiğin birincil bileşenleri nelerdir?", "components", "bileşenleri", "What are the primary ___ of this chemical compound?")
]

t4_sentences = [
    ("Why did they analyze it?", "Onu neden analiz ettiler?", "analyze", "analiz ettiler", "Why did they ___ it?"),
    ("How does it function?", "Nasıl çalışıyor?", "function", "çalışıyor", "How does it ___?"),
    ("What did you estimate?", "Neyi tahmin ettiniz?", "estimate", "tahmin ettiniz", "What did you ___?"),
    ("Where do they source it?", "Onu nereden tedarik ediyorlar?", "source", "tedarik ediyorlar", "Where do they ___ it?"),
    ("When did he publish it?", "Onu ne zaman yayımladı?", "publish", "yayımladı", "When did he ___ it?"),
    ("Why does she assume that?", "Bunu neden varsayıyor?", "assume", "varsayıyor", "Why does she ___ that?"),
    ("How did you derive this?", "Bunu nasıl türettiniz?", "derive", "türettiniz", "How did you ___ this?"),
    ("What does this indicate?", "Bu neyi gösteriyor?", "indicate", "gösteriyor", "What does this ___?"),
    ("Where did they establish it?", "Onu nerede kurdular?", "establish", "kurdular", "Where did they ___ it?"),
    ("Why do we require this?", "Buna neden ihtiyaç duyuyoruz?", "require", "ihtiyaç duyuyoruz", "Why do we ___ this?"),
    ("How did the analyst evaluate the data?", "Analist veriyi nasıl değerlendirdi?", "evaluate", "değerlendirdi", "How did the analyst ___ the data?"),
    ("Does the government modify the policy?", "Hükümet politikayı değiştiriyor mu?", "modify", "değiştiriyor", "Does the government ___ the policy?"),
    ("What did the researchers achieve last year?", "Araştırmacılar geçen yıl neyi başardı?", "achieve", "başardı", "What did the researchers ___ last year?"),
    ("Where do institutions structure the framework?", "Kurumlar çerçeveyi nerede yapılandırıyor?", "structure", "yapılandırıyor", "Where do institutions ___ the framework?"),
    ("When did the committee publish the summary?", "Komite özeti ne zaman yayımladı?", "publish", "yayımladı", "When did the committee ___ the summary?"),
    ("How does this factor influence the outcome?", "Bu faktör sonucu nasıl etkiliyor?", "influence", "etkiliyor", "How does this factor ___ the outcome?"),
    ("Why did the team exclude the respondents?", "Ekip katılımcıları neden hariç tuttu?", "exclude", "hariç tuttu", "Why did the team ___ the respondents?"),
    ("What does the theory define exactly?", "Teori tam olarak neyi tanımlıyor?", "define", "tanımlıyor", "What does the theory ___ exactly?"),
    ("Where did they integrate the technology?", "Teknolojiyi nereye entegre ettiler?", "integrate", "entegre ettiler", "Where did they ___ the technology?"),
    ("Why do companies export their production?", "Şirketler üretimlerini neden ihraç ediyor?", "export", "ihraç ediyor", "Why do companies ___ their production?"),
    ("Why did the administration abolish the old regulatory framework?", "Yönetim eski düzenleyici çerçeveyi neden kaldırdı?", "abolish", "kaldırdı", "Why did the administration ___ the old regulatory framework?"),
    ("How does the global economy affect domestic resource distribution?", "Küresel ekonomi iç kaynak dağılımını nasıl etkiliyor?", "affect", "etkiliyor", "How does the global economy ___ domestic resource distribution?"),
    ("What did the scientific community conclude regarding the data?", "Bilimsel topluluk verilerle ilgili ne sonuç çıkardı?", "conclude", "sonuç çıkardı", "What did the scientific community ___ regarding the data?"),
    ("Where do separate departments allocate their annual financial credit?", "Ayrı departmanlar yıllık finansal kredilerini nereye tahsis ediyor?", "allocate", "tahsis ediyor", "Where do separate departments ___ their annual financial credit?"),
    ("When did the university adopt the new academic assessment method?", "Üniversite yeni akademik değerlendirme yöntemini ne zaman benimsedi?", "adopt", "benimsedi", "When did the university ___ the new academic assessment method?"),
    ("How does this specific variable alter the statistical analysis?", "Bu özel değişken istatistiksel analizi nasıl değiştiriyor?", "alter", "değiştiriyor", "How does this specific variable ___ the statistical analysis?"),
    ("Why did the main opposition challenge the legal definition?", "Ana muhalefet yasal tanıma neden karşı çıktı?", "challenge", "karşı çıktı", "Why did the main opposition ___ the legal definition?"),
    ("What does the historical text imply about social structures?", "Tarihsel metin toplumsal yapılar hakkında ne ima ediyor?", "imply", "ima ediyor", "What does the historical text ___ about social structures?"),
    ("Where did the engineers conduct the primary energy experiment?", "Mühendisler temel enerji deneyini nerede yürüttüler?", "conduct", "yürüttüler", "Where did the engineers ___ the primary energy experiment?"),
    ("How do modern societies sustain their cultural identity?", "Modern toplumlar kültürel kimliklerini nasıl sürdürüyor?", "sustain", "sürdürüyor", "How do modern societies ___ their cultural identity?")
]

t5_sentences = [
    ("At which level is it?", "Hangi düzeydedir?", "level", "düzeydedir", "At which ___ is it?"),
    ("In which sector are they?", "Hangi sektördedirler?", "sector", "sektördedirler", "In which ___ are they?"),
    ("To what extent was it?", "Ne ölçüdeydi?", "extent", "ölçüdeydi", "To what ___ was it?"),
    ("For which purpose is this?", "Bu hangi amaç içindir?", "purpose", "amaç", "For which ___ is this?"),
    ("By whose authority was it?", "Kimin yetkisiyleydi?", "authority", "yetkisiyleydi", "By whose ___ was it?"),
    ("Under which category are they?", "Hangi kategori altındadırlar?", "category", "kategori", "Under which ___ are they?"),
    ("From which source is it?", "Hangi kaynaktandır?", "source", "kaynaktandır", "From which ___ is it?"),
    ("In what period was it?", "Hangi dönemdeydi?", "period", "dönemdeydi", "In what ___ was it?"),
    ("With which method is it?", "Hangi yöntemledir?", "method", "yöntemledir", "With which ___ is it?"),
    ("On whose data was it?", "Kimin verileri üzerindeydi?", "data", "verileri", "On whose ___ was it?"),
    ("In which academic journal was it published?", "Hangi akademik dergide yayımlandı?", "journal", "dergide", "In which academic ___ was it published?"),
    ("Under what legal criteria were they selected?", "Hangi yasal kriterler altında seçildiler?", "criteria", "kriterler", "Under what legal ___ were they selected?"),
    ("For which specific purpose is this required?", "Bu hangi özel amaç için gereklidir?", "purpose", "amaç", "For which specific ___ is this required?"),
    ("At what financial percentage was it fixed?", "Hangi finansal yüzdeyle sabitlendi?", "percentage", "yüzdeyle", "At what financial ___ was it fixed?"),
    ("From which primary source is this derived?", "Bu hangi birincil kaynaktan türetilmiştir?", "source", "kaynaktan", "From which primary ___ is this derived?"),
    ("To what degree are the variables dynamic?", "Değişkenler ne derece dinamiktir?", "degree", "derece", "To what ___ are the variables dynamic?"),
    ("With which analytical framework is it compatible?", "Hangi analitik çerçeve ile uyumludur?", "framework", "çerçeve", "With which analytical ___ is it compatible?"),
    ("By what assessment method was it evaluated?", "Hangi değerlendirme yöntemiyle değerlendirildi?", "assessment", "değerlendirme", "By what ___ method was it evaluated?"),
    ("In which economic sector is the crisis visible?", "Kriz hangi ekonomik sektörde görünürdür?", "sector", "sektörde", "In which economic ___ is the crisis visible?"),
    ("On what theoretical assumption is this based?", "Bu hangi teorik varsayıma dayanmaktadır?", "assumption", "varsayıma", "On what theoretical ___ is this based?"),
    ("Under which constitutional clause was the law modified?", "Yasa hangi anayasal madde uyarınca değiştirildi?", "clause", "madde", "Under which constitutional ___ was the law modified?"),
    ("By what statistical methodology were the figures calculated?", "Rakamlar hangi istatistiksel metodolojiyle hesaplandı?", "methodology", "metodolojiyle", "By what statistical ___ were the figures calculated?"),
    ("To what geographic extent is the population distributed?", "Nüfus hangi coğrafi ölçüde dağılmıştır?", "extent", "ölçüde", "To what geographic ___ is the population distributed?"),
    ("For whose ultimate benefit was the policy established?", "Politika kimin nihai faydası için oluşturuldu?", "benefit", "faydası", "For whose ultimate ___ was the policy established?"),
    ("From which institutional perspective was the text interpreted?", "Metin hangi kurumsal perspektiften yorumlandı?", "perspective", "perspektiften", "From which institutional ___ was the text interpreted?"),
    ("In which experimental environment were the plants grown?", "Bitkiler hangi deneysel ortamda yetiştirildi?", "environment", "ortamda", "In which experimental ___ were the plants grown?"),
    ("With what administrative authority is the director acting?", "Müdür hangi idari yetkiyle hareket ediyor?", "authority", "yetkiyle", "With what administrative ___ is the director acting?"),
    ("At which developmental stage are the data components?", "Veri bileşenleri hangi gelişim aşamasındadır?", "stage", "aşamasındadır", "At which developmental ___ are the data components?"),
    ("On which philosophical concept is the framework structured?", "Çerçeve hangi felsefi kavram üzerine yapılandırılmıştır?", "concept", "kavram", "On which philosophical ___ is the framework structured?"),
    ("Through what regulatory process was the contract validated?", "Sözleşme hangi düzenleyici süreçle onaylandı?", "process", "süreçle", "Through what regulatory ___ was the contract validated?")
]

def format_js_array(name, sents):
    lines = [f"const {name} = ["]
    for en, tr, word, trWord, blank in sents:
        # escape double quotes
        en_esc = en.replace('"', '\\"')
        tr_esc = tr.replace('"', '\\"')
        word_esc = word.replace('"', '\\"')
        trWord_esc = trWord.replace('"', '\\"')
        blank_esc = blank.replace('"', '\\"')
        lines.append(f'  {{ en: "{en_esc}", tr: "{tr_esc}", word: "{word_esc}", trWord: "{trWord_esc}", blank: "{blank_esc}" }},')
    # remove trailing comma on last element and close
    lines[-1] = lines[-1].rstrip(',')
    lines.append("];")
    return "\n".join(lines)

print(format_js_array("unit9Lesson1SentencesRaw", t1_sentences))
print("\n")
print(format_js_array("unit9Lesson2SentencesRaw", t2_sentences))
print("\n")
print(format_js_array("unit9Lesson3SentencesRaw", t3_sentences))
print("\n")
print(format_js_array("unit9Lesson4SentencesRaw", t4_sentences))
print("\n")
print(format_js_array("unit9Lesson5SentencesRaw", t5_sentences))
