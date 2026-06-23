import os

# Lesson 40 (Tip 1) sentences and phrases (40 items: 20 phrases + 20 sentences)
lesson40_data = [
    {"en": "By analyzing the raw data", "tr": "Ham verileri analiz ederek", "word": "analyzing", "trWord": "analiz ederek", "blank": "By ___ the raw data"},
    {"en": "By utilizing the mobile interface", "tr": "Mobil arayüzü kullanarak", "word": "utilizing", "trWord": "kullanarak", "blank": "By ___ the mobile interface"},
    {"en": "By modifying the legislative framework", "tr": "Yasal çerçeveyi değiştirerek", "word": "modifying", "trWord": "değiştirerek", "blank": "By ___ the legislative framework"},
    {"en": "By structuring the financial resources", "tr": "Finansal kaynakları yapılandırarak", "word": "structuring", "trWord": "yapılandırarak", "blank": "By ___ the financial resources"},
    {"en": "By integrating the individual applications", "tr": "Bireysel uygulamaları entegre ederek", "word": "integrating", "trWord": "entegre ederek", "blank": "By ___ the individual applications"},
    {"en": "Without defining the specific criteria", "tr": "Belirli kriterleri tanımlamadan", "word": "defining", "trWord": "tanımlamadan", "blank": "Without ___ the specific criteria"},
    {"en": "Without publishing the official summary", "tr": "Resmi özeti yayınlamadan", "word": "publishing", "trWord": "yayınlamadan", "blank": "Without ___ the official summary"},
    {"en": "Without monitoring the local conditions", "tr": "Yerel koşulları izlemeden", "word": "monitoring", "trWord": "izlemeden", "blank": "Without ___ the local conditions"},
    {"en": "Without generating the JSON structure", "tr": "JSON yapısını oluşturmadan", "word": "generating", "trWord": "oluşturmadan", "blank": "Without ___ the JSON structure"},
    {"en": "Without altering the statistical analysis", "tr": "İstatistiksel analizi değiştirmeden", "word": "altering", "trWord": "değiştirmeden", "blank": "Without ___ the statistical analysis"},
    {"en": "On encountering technical errors", "tr": "Teknik hatalarla karşılaşınca", "word": "encountering", "trWord": "karşılaşınca", "blank": "On ___ technical errors"},
    {"en": "On tracking the match schedules", "tr": "Maç programlarını takip edince", "word": "tracking", "trWord": "takip edince", "blank": "On ___ the match schedules"},
    {"en": "On regulating the battery temperature", "tr": "Batarya sıcaklığını düzenleyince", "word": "regulating", "trWord": "düzenleyince", "blank": "On ___ the battery temperature"},
    {"en": "On converting the separate pages", "tr": "Ayrı sayfaları dönüştürünce", "word": "converting", "trWord": "dönüştürünce", "blank": "On ___ the separate pages"},
    {"en": "On identifying the target goals", "tr": "Hedef amaçları belirleyince", "word": "identifying", "trWord": "belirleyince", "blank": "On ___ the target goals"},
    {"en": "In evaluating the academic curriculum", "tr": "Akademik müfredatı değerlendirirken", "word": "evaluating", "trWord": "değerlendirirken", "blank": "In ___ the academic curriculum"},
    {"en": "In processing the scanned text", "tr": "Taranmış metni işlerken", "word": "processing", "trWord": "işlerken", "blank": "In ___ the scanned text"},
    {"en": "In adjusting the dynamic parameters", "tr": "Dinamik parametreleri ayarlarken", "word": "adjusting", "trWord": "ayarlarken", "blank": "In ___ the dynamic parameters"},
    {"en": "In maintaining the structural framework", "tr": "Yapısal çerçeveyi sürdürürken", "word": "maintaining", "trWord": "sürdürürken", "blank": "In ___ the structural framework"},
    {"en": "In distributing the monthly revenue", "tr": "Aylık geliri dağıtırken", "word": "distributing", "trWord": "dağıtırken", "blank": "In ___ the monthly revenue"},
    {"en": "By analyzing the raw data, the analyst identified the primary error.", "tr": "Ham verileri analiz ederek analist temel hatayı belirledi.", "word": "analyzing", "trWord": "analiz ederek", "blank": "By ___ the raw data, the analyst identified the primary error."},
    {"en": "By utilizing the mobile interface, the application improves user interaction.", "tr": "Mobil arayüzü kullanarak uygulama kullanıcı etkileşimini iyileştirir.", "word": "utilizing", "trWord": "kullanarak", "blank": "By ___ the mobile interface, the application improves user interaction."},
    {"en": "By modifying the legislative framework, the progressive government established stability.", "tr": "Yasal çerçeveyi değiştirerek ilerici hükümet istikrar sağladı.", "word": "modifying", "trWord": "değiştirerek", "blank": "By ___ the legislative framework, the progressive government established stability."},
    {"en": "By structuring the financial resources, the department funded the project.", "tr": "Finansal kaynakları yapılandırarak departman projeyi finanse etti.", "word": "structuring", "trWord": "yapılandırarak", "blank": "By ___ the financial resources, the department funded the project."},
    {"en": "By integrating the individual applications, the team minimized software errors.", "tr": "Bireysel uygulamaları entegre ederek ekip yazılım hatalarını en aza indirdi.", "word": "integrating", "trWord": "entegre ederek", "blank": "By ___ the individual applications, the team minimized software errors."},
    {"en": "Without defining the specific criteria, the committee cannot exclude irrelevant data.", "tr": "Belirli kriterleri tanımlamadan komite ilgisiz verileri hariç tutamaz.", "word": "defining", "trWord": "tanımlamadan", "blank": "Without ___ the specific criteria, the committee cannot exclude irrelevant data."},
    {"en": "Without publishing the official summary, the university lacks institutional visibility.", "tr": "Resmi özeti yayınlamadan üniversite kurumsal görünürlükten yoksundur.", "word": "publishing", "trWord": "yayınlamadan", "blank": "Without ___ the official summary, the university lacks institutional visibility."},
    {"en": "Without monitoring the local conditions, predicting regional stability remains difficult.", "tr": "Yerel koşulları izlemeden bölgesel istikrarı tahmin etmek zor olmaya devam ediyor.", "word": "monitoring", "trWord": "izlemeden", "blank": "Without ___ the local conditions, predicting regional stability remains difficult."},
    {"en": "Without generating the JSON structure, the database cannot track schedules.", "tr": "JSON yapısını oluşturmadan veritabanı programları takip edemez.", "word": "generating", "trWord": "oluşturmadan", "blank": "Without ___ the JSON structure, the database cannot track schedules."},
    {"en": "Without altering the statistical analysis, the expert proved the original thesis.", "tr": "İstatistiksel analizi değiştirmeden uzman orijinal tezi kanıtladı.", "word": "altering", "trWord": "değiştirmeden", "blank": "Without ___ the statistical analysis, the expert proved the original thesis."},
    {"en": "On encountering technical errors, the program automatically stops the processing.", "tr": "Teknik hatalarla karşılaşınca program işlemi otomatik olarak durdurur.", "word": "encountering", "trWord": "karşılaşınca", "blank": "On ___ technical errors, the program automatically stops the processing."},
    {"en": "On tracking the match schedules, users notice the dynamic calendar integration.", "tr": "Maç programlarını takip edince kullanıcılar dinamik takvim entegrasyonunu fark eder.", "word": "tracking", "trWord": "takip edince", "blank": "On ___ the match schedules, users notice the dynamic calendar integration."},
    {"en": "On regulating the battery temperature, the system protects the solar inverters.", "tr": "Batarya sıcaklığını düzenleyince sistem güneş enerjisi invertörlerini korur.", "word": "regulating", "trWord": "düzenleyince", "blank": "On ___ the battery temperature, the system protects the solar inverters."},
    {"en": "On converting the separate pages, the secretary created a comprehensive PDF.", "tr": "Ayrı sayfaları dönüştürünce sekreter kapsamlı bir PDF oluşturdu.", "word": "converting", "trWord": "dönüştürünce", "blank": "On ___ the separate pages, the secretary created a comprehensive PDF."},
    {"en": "On identifying the target goals, the professional prepared the strategic defense.", "tr": "Hedef amaçları belirleyince profesyonel stratejik savunmayı hazırladı.", "word": "identifying", "trWord": "belirleyince", "blank": "On ___ the target goals, the professional prepared the strategic defense."},
    {"en": "In evaluating the academic curriculum, the board reviewed the entire program.", "tr": "Akademik müfredatı değerlendirirken kurul tüm programı gözden geçirdi.", "word": "evaluating", "trWord": "değerlendirirken", "blank": "In ___ the academic curriculum, the board reviewed the entire program."},
    {"en": "In processing the scanned text, the updated software runs an OCR tool.", "tr": "Taranmış metni işlerken güncellenmiş yazılım bir OCR aracı çalıştırır.", "word": "processing", "trWord": "işlerken", "blank": "In ___ the scanned text, the updated software runs an OCR tool."},
    {"en": "In adjusting the dynamic parameters, the engineer balanced the structural framework.", "tr": "Dinamik parametreleri ayarlarken mühendis yapısal çerçeveyi dengeledi.", "word": "adjusting", "trWord": "ayarlarken", "blank": "In ___ the dynamic parameters, the engineer balanced the structural framework."},
    {"en": "In maintaining the structural framework, the administration spent substantial annual resources.", "tr": "Yapısal çerçeveyi sürdürürken yönetim önemli miktarda yıllık kaynak harcadı.", "word": "maintaining", "trWord": "sürdürürken", "blank": "In ___ the structural framework, the administration spent substantial annual resources."},
    {"en": "In distributing the monthly revenue, the central bank tracked fluctuating economic percentages.", "tr": "Aylık geliri dağıtırken merkez bankası dalgalanan ekonomik yüzdeleri takip etti.", "word": "distributing", "trWord": "dağıtırken", "blank": "In ___ the monthly revenue, the central bank tracked fluctuating economic percentages."}
]

# Lesson 41 (Tip 2) sentences and phrases (40 items: 20 phrases + 20 sentences)
lesson41_data = [
    {"en": "When analyzing the raw data", "tr": "Ham verileri analiz ederken", "word": "analyzing", "trWord": "analiz ederken", "blank": "When ___ the raw data"},
    {"en": "When modifying the legislative framework", "tr": "Yasal çerçeveyi değiştirirken", "word": "modifying", "trWord": "değiştirirken", "blank": "When ___ the legislative framework"},
    {"en": "When evaluating the academic curriculum", "tr": "Akademik müfredatı değerlendirirken", "word": "evaluating", "trWord": "değerlendirirken", "blank": "When ___ the academic curriculum"},
    {"en": "When structuring the financial resources", "tr": "Finansal kaynakları yapılandırırken", "word": "structuring", "trWord": "yapılandırırken", "blank": "When ___ the financial resources"},
    {"en": "While integrating the individual applications", "tr": "Bireysel uygulamaları entegre ederken", "word": "integrating", "trWord": "entegre ederken", "blank": "While ___ the individual applications"},
    {"en": "While restricting the resource distribution", "tr": "Kaynak dağıtımını kısıtlarken", "word": "restricting", "trWord": "kısıtlarken", "blank": "While ___ the resource distribution"},
    {"en": "While establishing a stable administration", "tr": "İstikrarlı bir yönetim kurarken", "word": "establishing", "trWord": "kurarken", "blank": "While ___ the stable administration"},
    {"en": "While extracting the primary components", "tr": "Birincil bileşenleri çıkarırken", "word": "extracting", "trWord": "çıkarırken", "blank": "While ___ the primary components"},
    {"en": "Before troubleshooting the Flutter interface", "tr": "Flutter arayüzündeki sorunları gidermeden önce", "word": "troubleshooting", "trWord": "sorunları gidermeden önce", "blank": "Before ___ the Flutter interface"},
    {"en": "Before validating the legal contract", "tr": "Yasal sözleşmeyi doğrulamadan önce", "word": "validating", "trWord": "doğrulamadan önce", "blank": "Before ___ the legal contract"},
    {"en": "Before defining the specific criteria", "tr": "Belirli kriterleri tanımlamadan önce", "word": "defining", "trWord": "tanımlamadan önce", "blank": "Before ___ the specific criteria"},
    {"en": "Before publishing the official summary", "tr": "Resmi özeti yayınlamadan önce", "word": "publishing", "trWord": "yayınlamadan önce", "blank": "Before ___ the official summary"},
    {"en": "After assessing the constitutional amendment", "tr": "Anayasa değişikliğini değerlendirdikten sonra", "word": "assessing", "trWord": "değerlendirdikten sonra", "blank": "After ___ the constitutional amendment"},
    {"en": "After monitoring the local conditions", "tr": "Yerel koşulları izledikten sonra", "word": "monitoring", "trWord": "izledikten sonra", "blank": "After ___ the local conditions"},
    {"en": "After generating the JSON structure", "tr": "JSON yapısını oluşturduktan sonra", "word": "generating", "trWord": "oluşturduktan sonra", "blank": "After ___ the JSON structure"},
    {"en": "After altering the statistical analysis", "tr": "İstatistiksel analizi değiştirdikten sonra", "word": "altering", "trWord": "değiştirdikten sonra", "blank": "After ___ the statistical analysis"},
    {"en": "Since processing the scanned text", "tr": "Taranmış metni işlediğinden beri", "word": "processing", "trWord": "işlediğinden beri", "blank": "Since ___ the scanned text"},
    {"en": "Since tracking the match schedules", "tr": "Maç programlarını takip ettiğinden beri", "word": "tracking", "trWord": "takip ettiğinden beri", "blank": "Since ___ the match schedules"},
    {"en": "Since regulating the battery temperature", "tr": "Batarya sıcaklığını düzenlediğinden beri", "word": "regulating", "trWord": "düzenlediğinden beri", "blank": "Since ___ the battery temperature"},
    {"en": "Since redesigning the professional CV", "tr": "Profesyonel özgeçmişi yeniden tasarladığından beri", "word": "redesigning", "trWord": "yeniden tasarladığından beri", "blank": "Since ___ the professional CV"},
    {"en": "When analyzing the raw data, the expert identified an error.", "tr": "Ham verileri analiz ederken uzman bir hata belirledi.", "word": "analyzing", "trWord": "analiz ederken", "blank": "When ___ the raw data, the expert identified an error."},
    {"en": "When modifying the legislative framework, the government altered the code.", "tr": "Yasal çerçeveyi değiştirirken hükümet kanunu değiştirdi.", "word": "modifying", "trWord": "değiştirirken", "blank": "When ___ the legislative framework, the government altered the code."},
    {"en": "When evaluating the academic curriculum, the university requires empirical evidence.", "tr": "Akademik müfredatı değerlendirirken üniversite ampirik kanıt gerektirir.", "word": "evaluating", "trWord": "değerlendirirken", "blank": "When ___ the academic curriculum, the university requires empirical evidence."},
    {"en": "When structuring the financial resources, the committee defined strict parameters.", "tr": "Finansal kaynakları yapılandırarken komite katı parametreler belirledi.", "word": "structuring", "trWord": "yapılandırırken", "blank": "When ___ the financial resources, the committee defined strict parameters."},
    {"en": "While integrating the individual applications, the engineer encountered technical errors.", "tr": "Bireysel uygulamaları entegre ederken mühendis teknik hatalarla karşılaştı.", "word": "integrating", "trWord": "entegre ederken", "blank": "While ___ the individual applications, the engineer encountered technical errors."},
    {"en": "While restricting the resource distribution, the administration caused temporary instability.", "tr": "Kaynak dağıtımını kısıtlarken yönetim geçici istikrarsızlığa neden oldu.", "word": "restricting", "trWord": "kısıtlarken", "blank": "While ___ the resource distribution, the administration caused temporary instability."},
    {"en": "While establishing a stable administration, the director faced intense opposition.", "tr": "İstikrarlı bir yönetim kurarken direktör yoğun muhalefetle karşılaştı.", "word": "establishing", "trWord": "kurarken", "blank": "While ___ the stable administration, the director faced intense opposition."},
    {"en": "While extracting the primary components, the technician utilized special tools.", "tr": "Birincil bileşenleri çıkarırken teknisyen özel aletler kullandı.", "word": "extracting", "trWord": "çıkarırken", "blank": "While ___ the primary components, the technician utilized special tools."},
    {"en": "Before troubleshooting the Flutter interface, you must update the database.", "tr": "Flutter arayüzündeki sorunları gidermeden önce veritabanını güncellemelisiniz.", "word": "troubleshooting", "trWord": "sorunları gidermeden önce", "blank": "Before ___ the Flutter interface, you must update the database."},
    {"en": "Before validating the legal contract, the parties reviewed every clause.", "tr": "Yasal sözleşmeyi doğrulamadan önce taraflar her maddeyi gözden geçirdi.", "word": "validating", "trWord": "doğrulamadan önce", "blank": "Before ___ the legal contract, the parties reviewed every clause."},
    {"en": "Before defining the specific criteria, the board excluded fluctuating data.", "tr": "Belirli kriterleri tanımlamadan önce kurul dalgalanan verileri hariç tuttu.", "word": "defining", "trWord": "tanımlamadan önce", "blank": "Before ___ the specific criteria, the board excluded fluctuating data."},
    {"en": "Before publishing the official summary, the committee summarized the defense.", "tr": "Resmi özeti yayınlamadan önce komite savunmayı özetledi.", "word": "publishing", "trWord": "yayınlamadan önce", "blank": "Before ___ the official summary, the committee summarized the defense."},
    {"en": "After assessing the constitutional amendment, the legal authorities modified the legislation.", "tr": "Anayasa değişikliğini değerlendirdikten sonra yasal otoriteler mevzuatı değiştirdi.", "word": "assessing", "trWord": "değerlendirdikten sonra", "blank": "After ___ the constitutional amendment, the legal authorities modified the legislation."},
    {"en": "After monitoring the local conditions, the team predicted the long-term percentages.", "tr": "Yerel koşulları izledikten sonra ekip uzun vadeli yüzdeleri tahmin etti.", "word": "monitoring", "trWord": "izledikten sonra", "blank": "After ___ the local conditions, the team predicted the long-term percentages."},
    {"en": "After generating the JSON structure, the mobile application displayed accurate schedules.", "tr": "JSON yapısını oluşturduktan sonra mobil uygulama doğru programları gösterdi.", "word": "generating", "trWord": "oluşturduktan sonra", "blank": "After ___ the JSON structure, the mobile application displayed accurate schedules."},
    {"en": "After altering the statistical analysis, the researcher submitted the final text.", "tr": "İstatistiksel analizi değiştirdikten sonra araştırmacı nihai metni sundu.", "word": "altering", "trWord": "değiştirdikten sonra", "blank": "After ___ the statistical analysis, the researcher submitted the final text."},
    {"en": "Since processing the scanned text, the team has fixed several parameters.", "tr": "Taranmış metni işlediğinden beri ekip birkaç parametreyi düzeltti.", "word": "processing", "trWord": "işlediğinden beri", "blank": "Since ___ the scanned text, the team has fixed several parameters."},
    {"en": "Since tracking the match schedules, the analyst has updated his calendar.", "tr": "Maç programlarını takip ettiğinden beri analist takvimini güncelledi.", "word": "tracking", "trWord": "takip ettiğinden beri", "blank": "Since ___ the match schedules, the analyst has updated his calendar."},
    {"en": "Since regulating the battery temperature, the facility has sustained perfect stability.", "tr": "Batarya sıcaklığını düzenlediğinden beri tesis mükemmel istikrarı sürdürdü.", "word": "regulating", "trWord": "düzenlediğinden beri", "blank": "Since ___ the battery temperature, the facility has sustained perfect stability."},
    {"en": "Since redesigning the professional CV, the candidate has secured a corporate position.", "tr": "Profesyonel özgeçmişi yeniden tasarladığından beri aday kurumsal bir pozisyon elde etti.", "word": "redesigning", "trWord": "yeniden tasarladığından beri", "blank": "Since ___ the professional CV, the candidate has secured a corporate position."}
]

# Lesson 42 (Tip 3) sentences and phrases (40 items: 20 phrases + 20 sentences)
lesson42_data = [
    {"en": "When obtained from the comprehensive study", "tr": "Kapsamlı çalışmadan elde edildiğinde", "word": "obtained", "trWord": "elde edildiğinde", "blank": "When ___ from the comprehensive study"},
    {"en": "When processed by the updated software", "tr": "Güncellenmiş yazılım tarafından işlendiğinde", "word": "processed", "trWord": "işlendiğinde", "blank": "When ___ by the updated software"},
    {"en": "If modified by the central administration", "tr": "Merkezi yönetim tarafından değiştirilirse", "word": "modified", "trWord": "değiştirilirse", "blank": "If ___ by the central administration"},
    {"en": "If excluded from the final statistical analysis", "tr": "Nihai istatistiksel analizden hariç tutulursa", "word": "excluded", "trWord": "hariç tutulursa", "blank": "If ___ from the final statistical analysis"},
    {"en": "Unless evaluated by the academic committee", "tr": "Akademik komite tarafından değerlendirilmedikçe", "word": "evaluated", "trWord": "değerlendirilmedikçe", "blank": "Unless ___ by the academic committee"},
    {"en": "Unless validated through the regulatory process", "tr": "Düzenleyici süreç yoluyla doğrulanmadıkça", "word": "validated", "trWord": "doğrulanmadıkça", "blank": "Unless ___ through the regulatory process"},
    {"en": "Although established by the special committee", "tr": "Özel komite tarafından kurulmasına rağmen", "word": "established", "trWord": "kurulmasına rağmen", "blank": "Although ___ by the special committee"},
    {"en": "Although defined in the legal document", "tr": "Yasal belgede tanımlanmasına rağmen", "word": "defined", "trWord": "tanımlanmasına rağmen", "blank": "Although ___ in the legal document"},
    {"en": "Until structured within the JSON format", "tr": "JSON formatında yapılandırılana kadar", "word": "structured", "trWord": "yapılandırılana kadar", "blank": "Until ___ within the JSON format"},
    {"en": "Until integrated into the Flutter application", "tr": "Flutter uygulamasına entegre edilene kadar", "word": "integrated", "trWord": "entegre edilene kadar", "blank": "Until ___ into the Flutter application"},
    {"en": "As identified in the chemical compound", "tr": "Kimyasal bileşikte tanımlandığı gibi", "word": "identified", "trWord": "tanımlandığı gibi", "blank": "As ___ in the chemical compound"},
    {"en": "As confirmed by the expert analyst", "tr": "Uzman analist tarafından onaylandığı gibi", "word": "confirmed", "trWord": "onaylandığı gibi", "blank": "As ___ by the expert analyst"},
    {"en": "As prepared by the professional team", "tr": "Profesyonel ekip tarafından hazırlandığı gibi", "word": "prepared", "trWord": "hazırlandığı gibi", "blank": "As ___ by the professional team"},
    {"en": "Where preserved by the local administration", "tr": "Yerel yönetim tarafından korunduğu yerde", "word": "preserved", "trWord": "korunduğu yerde", "blank": "Where ___ by the local administration"},
    {"en": "Where exported to global markets", "tr": "Küresel pazarlara ihraç edildiği yerde", "word": "exported", "trWord": "ihraç edildiği yerde", "blank": "Where ___ to global markets"},
    {"en": "When adjusted by the technical team", "tr": "Teknik ekip tarafından ayarlandığında", "word": "adjusted", "trWord": "ayarlandığında", "blank": "When ___ by the technical team"},
    {"en": "If extracted from the digital sources", "tr": "Dijital kaynaklardan çıkarılırsa", "word": "extracted", "trWord": "çıkarılırsa", "blank": "If ___ from the digital sources"},
    {"en": "Unless maintained through substantial annual funding", "tr": "Önemli miktarda yıllık finansmanla sürdürülmedikçe", "word": "maintained", "trWord": "sürdürülmedikçe", "blank": "Unless ___ through substantial annual funding"},
    {"en": "Although derived from empirical evidence", "tr": "Ampirik kanıtlardan türetilmesine rağmen", "word": "derived", "trWord": "türetilmesine rağmen", "blank": "Although ___ from empirical evidence"},
    {"en": "Until redesigned into a corporate format", "tr": "Kurumsal bir formata yeniden tasarlanana kadar", "word": "redesigned", "trWord": "tasarlanana kadar", "blank": "Until ___ into a corporate format"},
    {"en": "When obtained from the comprehensive study, the data proved valid.", "tr": "Kapsamlı çalışmadan elde edildiğinde veriler geçerli olduğunu kanıtladı.", "word": "obtained", "trWord": "elde edildiğinde", "blank": "When ___ from the comprehensive study, the data proved valid."},
    {"en": "When processed by the updated software, the text appears clearly.", "tr": "Güncellenmiş yazılım tarafından işlendiğinde metin net bir şekilde görünür.", "word": "processed", "trWord": "işlendiğinde", "blank": "When ___ by the updated software, the text appears clearly."},
    {"en": "If modified by the central administration, the framework changes immediately.", "tr": "Merkezi yönetim tarafından değiştirilirse çerçeve hemen değişir.", "word": "modified", "trWord": "değiştirilirse", "blank": "If ___ by the central administration, the framework changes immediately."},
    {"en": "If excluded from the final statistical analysis, the variables alter results.", "tr": "Nihai istatistiksel analizden hariç tutulursa değişkenler sonuçları değiştirir.", "word": "excluded", "trWord": "hariç tutulursa", "blank": "If ___ from the final statistical analysis, the variables alter results."},
    {"en": "Unless evaluated by the academic committee, the curriculum cannot change.", "tr": "Akademik komite tarafından değerlendirilmedikçe müfredat değişemez.", "word": "evaluated", "trWord": "değerlendirilmedikçe", "blank": "Unless ___ by the academic committee, the curriculum cannot change."},
    {"en": "Unless validated through the regulatory process, the legal contract is inactive.", "tr": "Düzenleyici süreç yoluyla doğrulanmadıkça yasal sözleşme geçersizdir.", "word": "validated", "trWord": "doğrulanmadıkça", "blank": "Unless ___ through the regulatory process, the legal contract is inactive."},
    {"en": "Although established by the special committee, the criteria faced intense opposition.", "tr": "Özel komite tarafından kurulmasına rağmen kriterler yoğun muhalefetle karşılaştı.", "word": "established", "trWord": "kurulmasına rağmen", "blank": "Although ___ by the special committee, the criteria faced intense opposition."},
    {"en": "Although defined in the legal document, the dynamic clause remains controversial.", "tr": "Yasal belgede tanımlanmasına rağmen dinamik madde tartışmalı kalmaya devam ediyor.", "word": "defined", "trWord": "tanımlanmasına rağmen", "blank": "Although ___ in the legal document, the dynamic clause remains controversial."},
    {"en": "Until structured within the JSON format, the data generates severe errors.", "tr": "JSON formatında yapılandırılana kadar veriler ciddi hatalar üretir.", "word": "structured", "trWord": "yapılandırılana kadar", "blank": "Until ___ within the JSON format, the data generates severe errors."},
    {"en": "Until integrated into the Flutter application, the mobile interface functions slowly.", "tr": "Flutter uygulamasına entegre edilene kadar mobil arayüz yavaş çalışır.", "word": "integrated", "trWord": "entegre edilene kadar", "blank": "Until ___ into the Flutter application, the mobile interface functions slowly."},
    {"en": "As identified in the chemical compound, the primary components are toxic.", "tr": "Kimyasal bileşikte tanımlandığı gibi birincil bileşenler zehirlidir.", "word": "identified", "trWord": "tanımlandığı gibi", "blank": "As ___ in the chemical compound, the primary components are toxic."},
    {"en": "As confirmed by the expert analyst, the financial revenue decreased significantly.", "tr": "Uzman analist tarafından onaylandığı gibi finansal gelir önemli ölçüde azaldı.", "word": "confirmed", "trWord": "onaylandığı gibi", "blank": "As ___ by the expert analyst, the financial revenue decreased significantly."},
    {"en": "As prepared by the professional team, the administrative defense was successful.", "tr": "Profesyonel ekip tarafından hazırlandığı gibi idari savunma başarılı oldu.", "word": "prepared", "trWord": "hazırlandığı gibi", "blank": "As ___ by the professional team, the administrative defense was successful."},
    {"en": "Where preserved by the local administration, historic buildings attract global attention.", "tr": "Yerel yönetim tarafından korunduğu yerde tarihi binalar küresel ilgi görür.", "word": "preserved", "trWord": "korunduğu yerde", "blank": "Where ___ by the local administration, historic buildings attract global attention."},
    {"en": "Where exported to global markets, domestic production boosts the local economy.", "tr": "Küresel pazarlara ihraç edildiği yerde yerli üretim yerel ekonomiyi canlandırır.", "word": "exported", "trWord": "ihraç edildiği yerde", "blank": "Where ___ to global markets, domestic production boosts the local economy."},
    {"en": "When adjusted by the technical team, the parameters stabilize the system.", "tr": "Teknik ekip tarafından ayarlandığında parametreler sistemi dengeler.", "word": "adjusted", "trWord": "ayarlandığında", "blank": "When ___ by the technical team, the parameters stabilize the system."},
    {"en": "If extracted from the digital sources, the statistics require comprehensive verification.", "tr": "Dijital kaynaklardan çıkarılırsa istatistikler kapsamlı doğrulama gerektirir.", "word": "extracted", "trWord": "çıkarılırsa", "blank": "If ___ from the digital sources, the statistics require comprehensive verification."},
    {"en": "Unless maintained through substantial annual funding, the structural framework will collapse.", "tr": "Önemli miktarda yıllık finansmanla sürdürülmedikçe yapısal çerçeve çökecektir.", "word": "maintained", "trWord": "sürdürülmedikçe", "blank": "Unless ___ through substantial annual funding, the structural framework will collapse."},
    {"en": "Although derived from empirical evidence, the theory challenges traditional methodology assumptions.", "tr": "Ampirik kanıtlardan türetilmesine rağmen teori geleneksel metodoloji varsayımlarına meydan okuyor.", "word": "derived", "trWord": "türetilmesine rağmen", "blank": "Although ___ from empirical evidence, the theory challenges traditional methodology assumptions."},
    {"en": "Until redesigned into a corporate format, the professional CV lacks target efficiency.", "tr": "Kurumsal bir formata yeniden tasarlanana kadar profesyonel özgeçmiş hedef etkililiğinden yoksundur.", "word": "redesigned", "trWord": "tasarlanana kadar", "blank": "Until ___ into a corporate format, the professional CV lacks target efficiency."}
]

vocab_updates = {
    "adjusted": "ayarlanmış / ayarlandı",
    "alter": "değiştirmek / değişiklik yapmak",
    "altered": "değiştirilmiş / değiştirdi",
    "although": "-e rağmen / karşın",
    "analyst": "analist",
    "appears": "görünür / ortaya çıkar",
    "application": "uygulama",
    "assumptions": "varsayımlar",
    "attract": "çekmek / cezbetmek",
    "authorities": "otoriteler / yetkililer",
    "balanced": "dengelenmiş / dengeledi",
    "bank": "banka",
    "calendar": "takvim",
    "cannot": "yapamaz / edemez",
    "challenges": "meydan okur / zorluklar",
    "collapse": "çökmek / yıkılmak",
    "controversial": "tartışmalı",
    "digital": "dijital",
    "director": "direktör / müdür",
    "displayed": "görüntülendi / gösterildi",
    "encountered": "karşılaştı / karşılaşılan",
    "engineer": "mühendis",
    "established": "kurulmuş / kurdu",
    "excluded": "hariç tutmuş / hariç tuttu",
    "exported": "ihraç edilmiş / ihraç etti",
    "extracted": "çıkarılmış / çıkardı",
    "faced": "karşılaştı / karşı karşıya kaldı",
    "facility": "tesis / kolaylık",
    "functions": "işlevler / çalışır",
    "funded": "finanse edilmiş / finanse etti",
    "historic": "tarihi",
    "immediately": "hemen / derhal",
    "inactive": "aktif olmayan / geçersiz",
    "inverters": "invertörler / çeviriciler",
    "lacks": "yoksundur / eksiktir",
    "maintained": "sürdürülmüş / korudu",
    "minimized": "en aza indirilmiş / minimize etti",
    "notice": "fark etmek / bildirim",
    "opposition": "muhalefet / karşıtlık",
    "perfect": "mükemmel",
    "predicted": "tahmin edilmiş / tahmin etti",
    "prepared": "hazırlanmış / hazırladı",
    "preserved": "korunmuş / korudu",
    "processed": "işlenmiş / işledi",
    "protects": "korur",
    "redesigned": "yeniden tasarlanmış / tasarladı",
    "require": "gerekmek / istemek",
    "runs": "çalıştırır / koşar",
    "secretary": "sekreter",
    "secured": "elde edilmiş / güvenceye aldı",
    "since": "-den beri / çünkü",
    "slowly": "yavaşça / yavaş",
    "sources": "kaynaklar",
    "special": "özel",
    "spent": "harcanmış / harcadı",
    "stabilize": "dengede tutmak / istikrarlı kılmak",
    "strategic": "stratejik",
    "structured": "yapılandırılmış / yapılandırdı",
    "submitted": "sunulmuş / sundu",
    "successful": "başarılı",
    "summarized": "özetlenmiş / özetledi",
    "thesis": "tez",
    "tools": "aletler / araçlar",
    "track": "izlemek / takip etmek",
    "tracked": "izlenmiş / takip etti",
    "unless": "-medikçe / -madıkça",
    "until": "-e kadar",
    "updated": "güncellenmiş / güncelledi",
    "users": "kullanıcılar",
    "utilized": "kullanılmış / yararlanıldı",
    "visibility": "görünürlük",
    "while": "-irken / esnasında"
}

def format_array_to_js(name, data_list):
    js_lines = [f"const {name} = ["]
    for item in data_list:
        en = item["en"].replace('"', '\\"')
        tr = item["tr"].replace('"', '\\"')
        word = item["word"].replace('"', '\\"')
        trWord = item["trWord"].replace('"', '\\"')
        blank = item["blank"].replace('"', '\\"')
        js_lines.append(f'  {{ en: "{en}", tr: "{tr}", word: "{word}", trWord: "{trWord}", blank: "{blank}" }},')
    js_lines[-1] = js_lines[-1].rstrip(',') # strip comma from last line
    js_lines.append("];\n")
    return "\n".join(js_lines)

# Generate raw js arrays
lesson40_js = format_array_to_js("unit17Lesson1SentencesRaw", lesson40_data)
lesson41_js = format_array_to_js("unit17Lesson2SentencesRaw", lesson41_data)
lesson42_js = format_array_to_js("unit17Lesson3SentencesRaw", lesson42_data)

raw_sentences_js = f"""{lesson40_js}
{lesson41_js}
{lesson42_js}
const unit17LessonSentences = {{
  1: unit17Lesson1SentencesRaw,
  2: unit17Lesson2SentencesRaw,
  3: unit17Lesson3SentencesRaw
}};"""

# Read data.js
with open("data.js", "r", encoding="utf-8") as f:
    data_content = f.read()

# Replace raw array
start_marker = "const unit17LessonSentences = {"
end_marker = "const unit18LessonSentences = {"
start_idx = data_content.find(start_marker)
end_idx = data_content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_data = data_content[:start_idx] + raw_sentences_js + "\n\n" + data_content[end_idx:]
    print("Replaced unit17LessonSentences raw array in memory.")
else:
    print("Error: Could not find raw array markers in data.js")
    exit(1)

# Replace mapping in unitSentencesMap
new_map = """  17: {
    1: { exercises: [
      buildCustom10QuestionExercises(unit17Lesson1SentencesRaw, 17, 40, 1, 0),
      buildCustom10QuestionExercises(unit17Lesson1SentencesRaw, 17, 40, 2, 10),
      buildCustom10QuestionExercises(unit17Lesson1SentencesRaw, 17, 40, 3, 20),
      buildCustom10QuestionExercises(unit17Lesson1SentencesRaw, 17, 40, 4, 30)
    ] },
    2: { exercises: [
      buildCustom10QuestionExercises(unit17Lesson2SentencesRaw, 17, 41, 1, 0),
      buildCustom10QuestionExercises(unit17Lesson2SentencesRaw, 17, 41, 2, 10),
      buildCustom10QuestionExercises(unit17Lesson2SentencesRaw, 17, 41, 3, 20),
      buildCustom10QuestionExercises(unit17Lesson2SentencesRaw, 17, 41, 4, 30)
    ] },
    3: { exercises: [
      buildCustom10QuestionExercises(unit17Lesson3SentencesRaw, 17, 42, 1, 0),
      buildCustom10QuestionExercises(unit17Lesson3SentencesRaw, 17, 42, 2, 10),
      buildCustom10QuestionExercises(unit17Lesson3SentencesRaw, 17, 42, 3, 20),
      buildCustom10QuestionExercises(unit17Lesson3SentencesRaw, 17, 42, 4, 30)
    ] }
  },"""

alt_start = new_data.find("  17: {")
if alt_start != -1:
    alt_end = new_data.find("  },", alt_start)
    if alt_end != -1:
        alt_end += len("  },")
        new_data = new_data[:alt_start] + new_map + new_data[alt_end:]
        print("Replaced map for unit 17 using index.")
    else:
        print("Error: Could not find closing bracket for unit 17 map.")
        exit(1)
else:
    print("Error: Could not find map section for unit 17.")
    exit(1)

# Update rawTopics description for Unit 17
new_topics = """  {
    title: "XVII. Edattan Sonra Gelen Fiil (+ Nesnesi) (Sayfa 113)",
    desc: "Edatlardan sonra gerund ve past participle kullanımı",
    icon: "🎨",
    numLessons: 3,
    formulas: [
      { 
        formula: "Preposition (on/by/in/without) + V-ing + Object", 
        example: "By measuring the temperature, we controlled the reaction: Sıcaklığı ölçerek tepkimeyi kontrol ettik",
        description: "Tercüme Kılavuzu: Bu yapı bir Edat + Eylem-İsim (Gerund) öbeğidir. Fiile eklenen -ing takısı geçişli bir eylemi isimleştirir ve sağ tarafına doğrudan kendi nesnesini çeker. Çeviri yaparken önce sağdaki nesne okunur, ardından edatın anlamına göre öbek toparlanır: by ile \\"-erek, -arak\\" (yoluyla); without ile \\"-meden, -madan\\" (maksızın); on ile \\"-ince, -ınca\\" (yapar yapmaz); in ile \\"-irken\\" (esnasında) anlamı verilir. Bu blok cümlenin zarf tümleci olarak anlamı tamamlar."
      },
      { 
        formula: "Conjunction (when/while/before/after/since) + V-ing + Object", 
        example: "Before starting the experiment, read the instructions: Deneye başlamadan önce talimatları okuyun",
        description: "Tercüme Kılavuzu: Bu yapı, ortak özneye sahip Zaman Bağlacı + Kısalmış Zarf Cümleciği kalıbıdır. Yan cümledeki özne düşürülerek eylem -ing takısıyla nesne alan aktif bir öbeğe dönüştürülmüştür. Türkçeye çevrilirken önce sağdaki nesne okunur, ardından zaman bağlacının anlamına göre sırasıyla: when/while ile \\"-irken / -dığında\\"; before ile \\"-meden önce\\"; after ile \\"-dikten sonra\\"; since ile \\"-diğinden beri\\"; ekleri getirilerek ana cümleye bağlanır."
      },
      { 
        formula: "Conjunction (when/if/unless/although/until/as/where) + Past Participle", 
        example: "Unless modified, the design is useless: Değiştirilmedikçe tasarım işe yaramaz",
        description: "Tercüme Kılavuzu: Bu yapı, bağlaçlardan sonra gelen Edilgen (Pasif) Kısaltma kalıbıdır. Yan cümledeki ortak özne ve yardımcı fiil (be) düşürülmüş, geriye sadece fiilin 3. hali (V3) kalmıştır. Eylemin özneye yapıldığını/edildiğini bildirir. Çeviriye varsa sağdaki edat öbeğinden başlanır, bağlacın anlamına göre sırasıyla: when ile \\"-ındığında\\"; if ile \\"-ılırsa\\"; unless ile \\"-ılmadıkça\\"; although ile \\"-ılmasına rağmen\\"; until ile \\"-ılana kadar\\"; as ile \\"-ıldığı gibi\\" edilgen yapıları kurularak ana cümlenin başına yerleşir."
      }
    ],
    subtitles: [
      "A. on / by / in / without + ...ing + nesne (Sayfa 113)",
      "B. when / while / before / after / since + ...ing (+ nesnesi) (Sayfa 116 / 118)",
      "C. when / if / unless / although / until / as / where + past participle (Sayfa 120)"
    ]
  },"""

alt_idx = new_data.find('title: "XVII. Edattan Sonra Gelen Fiil (+ Nesnesi) (Sayfa 113)')
if alt_idx != -1:
    block_end = new_data.find("  },", alt_idx)
    if block_end != -1:
        block_end += len("  },")
        block_start = new_data.rfind("  {", 0, alt_idx)
        if block_start != -1:
            new_data = new_data[:block_start] + new_topics + new_data[block_end:]
            print("Replaced rawTopics for Unit 17 using block index.")
        else:
            print("Error: Could not find block start for Unit 17 topic.")
            exit(1)
    else:
        print("Error: Could not find block end for Unit 17 topic.")
        exit(1)
else:
    print("Error: Could not find rawTopic entry for Unit 17.")
    exit(1)

# Write data.js
with open("data.js", "w", encoding="utf-8") as f:
    f.write(new_data)
print("Saved data.js successfully.")

# Read app.js
with open("app.js", "r", encoding="utf-8") as f:
    app_content = f.read()

# Locate wordDictionary start
dict_start_marker = "const wordDictionary = {"
dict_idx = app_content.find(dict_start_marker)
if dict_idx != -1:
    insert_pos = dict_idx + len(dict_start_marker)
    vocab_lines = ["\n  // Unit 17 vocabulary added dynamically"]
    for en_word, tr_word in sorted(vocab_updates.items()):
        en_esc = en_word.replace('"', '\\"')
        tr_esc = tr_word.replace('"', '\\"')
        vocab_lines.append(f'  "{en_esc}": "{tr_esc}",')
    vocab_js = "\n".join(vocab_lines)
    
    new_app = app_content[:insert_pos] + vocab_js + app_content[insert_pos:]
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(new_app)
    print("Saved app.js successfully with 72 new words.")
else:
    print("Error: Could not find wordDictionary in app.js")
    exit(1)

print("Unit 17 successfully updated with 3 Tips (120 items total)!")
