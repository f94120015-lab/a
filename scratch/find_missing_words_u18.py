import re
import os
import unicodedata

# 120 sentences
img_data = [
    {"en": "How to alter.", "tr": "Nasıl değiştirileceği", "word": "alter", "trWord": "değiştirileceği", "blank": "How to ___."},
    {"en": "How to avoid.", "tr": "Nasıl sakınılacağı", "word": "avoid", "trWord": "sakınılacağı", "blank": "How to ___."},
    {"en": "How to modify.", "tr": "Nasıl değiştirileceği", "word": "modify", "trWord": "değiştirileceği", "blank": "How to ___."},
    {"en": "How to do.", "tr": "Nasıl yapılacağı", "word": "do", "trWord": "yapılacağı", "blank": "How to ___."},
    {"en": "What to inspect.", "tr": "Neyin inceleneceği", "word": "inspect", "trWord": "inceleneceği", "blank": "What to ___."},
    {"en": "What to specify.", "tr": "Neyin belirleneceği", "word": "specify", "trWord": "belirleneceği", "blank": "What to ___."},
    {"en": "Where to go.", "tr": "Nereye gidileceği", "word": "go", "trWord": "gidileceği", "blank": "Where to ___."},
    {"en": "Whom to punish.", "tr": "Kimin cezalandırılacağı", "word": "punish", "trWord": "cezalandırılacağı", "blank": "Whom to ___."},
    {"en": "How to calculate.", "tr": "Nasıl hesaplanacağı", "word": "calculate", "trWord": "hesaplanacağı", "blank": "How to ___."},
    {"en": "How to integrate.", "tr": "Nasıl entegre edileceği", "word": "integrate", "trWord": "entegre edileceği", "blank": "How to ___."},
    {"en": "How to maximize.", "tr": "Nasıl maksimize edileceği", "word": "maximize", "trWord": "maksimize edileceği", "blank": "How to ___."},
    {"en": "How to manipulate.", "tr": "Nasıl manipüle edileceği", "word": "manipulate", "trWord": "manipüle edileceği", "blank": "How to ___."},
    {"en": "How to protect.", "tr": "Nasıl korunacağı", "word": "protect", "trWord": "korunacağı", "blank": "How to ___."},
    {"en": "How to stabilize.", "tr": "Nasıl stabilize edileceği", "word": "stabilize", "trWord": "stabilize edileceği", "blank": "How to ___."},
    {"en": "How to validate.", "tr": "Nasıl doğrulanacağı", "word": "validate", "trWord": "doğrulanacağı", "blank": "How to ___."},
    {"en": "What to clarify.", "tr": "Neyin açıklığa kavuşturulacağı", "word": "clarify", "trWord": "açıklığa kavuşturulacağı", "blank": "What to ___."},
    {"en": "When to conduct.", "tr": "Ne zaman yürütüleceği", "word": "conduct", "trWord": "yürütüleceği", "blank": "When to ___."},
    {"en": "When to induce.", "tr": "Ne zaman tetikleneceği", "word": "induce", "trWord": "tetikleneceği", "blank": "When to ___."},
    {"en": "When to suspend.", "tr": "Ne zaman askıya alınacağı", "word": "suspend", "trWord": "askıya alınacağı", "blank": "When to ___."},
    {"en": "Whether to terminate.", "tr": "Sonlandırılıp sonlandırılmayacağı", "word": "terminate", "trWord": "sonlandırılıp sonlandırılmayacağı", "blank": "Whether to ___."},
    {"en": "Which to utilize.", "tr": "Hangisinin kullanılacağı", "word": "utilize", "trWord": "kullanılacağı", "blank": "Which to ___."},
    {"en": "Who to permit.", "tr": "Kime izin verileceği", "word": "permit", "trWord": "izin verileceği", "blank": "Who to ___."},
    {"en": "Whom to apply to.", "tr": "Kime başvurulacağı", "word": "apply", "trWord": "başvurulacağı", "blank": "Whom to ___ to."},
    {"en": "How to advocate.", "tr": "Nasıl savunulacağı", "word": "advocate", "trWord": "savunulacağı", "blank": "How to ___."},
    {"en": "How to allocate.", "tr": "Nasıl tahsis edileceği", "word": "allocate", "trWord": "tahsis edileceği", "blank": "How to ___."},
    {"en": "How to expose.", "tr": "Nasıl ifşa edileceği", "word": "expose", "trWord": "ifşa edileceği", "blank": "How to ___."},
    {"en": "How to process.", "tr": "Nasıl işleneceği", "word": "process", "trWord": "işleneceği", "blank": "How to ___."},
    {"en": "Where to allocate.", "tr": "Nereye tahsis edileceği", "word": "allocate", "trWord": "tahsis edileceği", "blank": "Where to ___."},
    {"en": "Where to anticipate.", "tr": "Nerede öngörüleceği", "word": "anticipate", "trWord": "öngörüleceği", "blank": "Where to ___."},
    {"en": "Where to accumulate.", "tr": "Nerede biriktirileceği", "word": "accumulate", "trWord": "biriktirileceği", "blank": "Where to ___."},
    {"en": "Whether to restrict.", "tr": "Kısıtlanıp kısıtlanmayacağı", "word": "restrict", "trWord": "kısıtlanıp kısıtlanmayacağı", "blank": "Whether to ___."},
    {"en": "Whether to suspend.", "tr": "Askıya alınıp alınmayacağı", "word": "suspend", "trWord": "askıya alınıp alınmayacağı", "blank": "Whether to ___."},
    
    # 33 to 43
    {"en": "He is learning how to swim.", "tr": "Nasıl yüzeceğini öğreniyor.", "word": "swim", "trWord": "yüzeceğini", "blank": "He is learning how to ___."},
    {"en": "We need to decide what to say.", "tr": "Ne söyleyeceğimize karar vermeliyiz.", "word": "say", "trWord": "söyleyeceğimize", "blank": "We need to decide what to ___."},
    {"en": "They don't know where to meet.", "tr": "Nerede buluşacaklarını bilmiyorlar.", "word": "meet", "trWord": "buluşacaklarını", "blank": "They don't know where to ___."},
    {"en": "She asked the driver where to stop.", "tr": "Sürücüye nerede duracağını sordu.", "word": "stop", "trWord": "duracağını", "blank": "She asked the driver where to ___."},
    {"en": "He explained to us what to buy.", "tr": "Bize ne alacağımızı açıkladı.", "word": "buy", "trWord": "alacağımızı", "blank": "He explained to us what to ___."},
    {"en": "He asked his teacher what to read.", "tr": "Öğretmenine ne okuyacağını sordu.", "word": "read", "trWord": "okuyacağını", "blank": "He asked his teacher what to ___."},
    {"en": "The doctor told him when to sleep.", "tr": "Doktor ona ne zaman uyuyacağını söyledi.", "word": "sleep", "trWord": "uyuyacağını", "blank": "The doctor told him when to ___."},
    {"en": "She forgot where to park the car.", "tr": "Arabayı nereye park edeceğini unuttu.", "word": "park", "trWord": "park edeceğini", "blank": "She forgot where to ___ the car."},
    {"en": "The manager told us whom to call.", "tr": "Müdür bize kimi arayacağımızı söyledi.", "word": "call", "trWord": "arayacağımızı", "blank": "The manager told us whom to ___."},
    {"en": "He asked his father how to fix it.", "tr": "Babasına onu nasıl tamir edeceğini sordu.", "word": "fix", "trWord": "tamir edeceğini", "blank": "He asked his father how to ___ it."},
    {"en": "He showed the new students what to do.", "tr": "Yeni öğrencilere ne yapacaklarını gösterdi.", "word": "do", "trWord": "yapacaklarını", "blank": "He showed the new students what to ___."}
]

add_data = [
    {"en": "He does not know how to alter the data.", "tr": "Verileri nasıl değiştireceğini bilmiyor.", "word": "alter", "trWord": "değiştireceğini", "blank": "He does not know how to ___ the data."},
    {"en": "We must learn how to avoid errors.", "tr": "Hatalardan nasıl kaçınacağımızı öğrenmeliyiz.", "word": "avoid", "trWord": "kaçınacağımızı", "blank": "We must learn how to ___ errors."},
    {"en": "They explained how to modify the system.", "tr": "Sistemi nasıl değiştireceklerini açıkladılar.", "word": "modify", "trWord": "değiştireceklerini", "blank": "They explained how to ___ the system."},
    {"en": "She will show us what to inspect.", "tr": "Bize neyi inceleyeceğimizi gösterecek.", "word": "inspect", "trWord": "inceleyeceğimizi", "blank": "She will show us what to ___."},
    {"en": "The team decided what to specify in the contract.", "tr": "Ekip sözleşmede neyi belirleyeceğine karar verdi.", "word": "specify", "trWord": "belirleyeceğine", "blank": "The team decided what to ___ in the contract."},
    {"en": "The manual explains how to calculate the ratios.", "tr": "Kılavuz oranların nasıl hesaplanacağını açıklar.", "word": "calculate", "trWord": "hesaplanacağını", "blank": "The manual explains how to ___ the ratios."},
    {"en": "We need to figure out how to integrate the modules.", "tr": "Modülleri nasıl entegre edeceğimizi bulmamız gerekiyor.", "word": "integrate", "trWord": "entegre edeceğimizi", "blank": "We need to figure out how to ___ the modules."},
    {"en": "The manager wants to know how to maximize output.", "tr": "Müdür çıktıyı nasıl maksimize edeceğini bilmek istiyor.", "word": "maximize", "trWord": "maksimize edeceğini", "blank": "The manager wants to know how to ___ output."},
    {"en": "The report shows how to protect the environment.", "tr": "Rapor çevrenin nasıl korunacağını gösterir.", "word": "protect", "trWord": "korunacağını", "blank": "The report shows how to ___ the environment."},
    {"en": "They demonstrated how to stabilize the framework.", "tr": "Çerçevenin nasıl stabilize edileceğini gösterdiler.", "word": "stabilize", "trWord": "stabilize edileceğini", "blank": "They demonstrated how to ___ the framework."},
    {"en": "The scientists learned how to validate the results.", "tr": "Bilim insanları sonuçları nasıl doğrulayacaklarını öğrendiler.", "word": "validate", "trWord": "doğrulayacaklarını", "blank": "The scientists learned how to ___ the results."},
    {"en": "He explained what to clarify in the project.", "tr": "Projede neyin açıklığa kavuşturulacağını açıkladı.", "word": "clarify", "trWord": "açıklığa kavuşturulacağını", "blank": "He explained what to ___ in the project."},
    {"en": "We must decide when to conduct the survey.", "tr": "Anketi ne zaman yürüteceğimize karar vermeliyiz.", "word": "conduct", "trWord": "yürüteceğimize", "blank": "We must decide when to ___ the survey."},
    {"en": "The database specifies when to process the logs.", "tr": "Veritabanı günlüklerin ne zaman işleneceğini belirtir.", "word": "process", "trWord": "işleneceğini", "blank": "The database specifies when to ___ the logs."},
    {"en": "The board is debating whether to terminate the contract.", "tr": "Yönetim kurulu sözleşmeyi sonlandırıp sonlandırmayacağını tartışıyor.", "word": "terminate", "trWord": "sonlandırıp", "blank": "The board is debating whether to ___ the contract."},
    {"en": "The engineer showed which tools to utilize.", "tr": "Mühendis hangi araçların kullanılacağını gösterdi.", "word": "utilize", "trWord": "kullanılacağını", "blank": "The engineer showed which tools to ___."},
    {"en": "The security policy defines who to permit to the network.", "tr": "Güvenlik politikası ağa kime izin verileceğini tanımlar.", "word": "permit", "trWord": "izin verileceğini", "blank": "The security policy defines who to ___ to the network."},
    {"en": "They did not know whom to apply to for funding.", "tr": "Finansman için kime başvuracaklarını bilmiyorlardı.", "word": "apply", "trWord": "başvuracaklarını", "blank": "They did not know whom to ___ to for funding."},
    {"en": "The group showed how to advocate for reform.", "tr": "Grup reformun nasıl savunulacağını gösterdi.", "word": "advocate", "trWord": "savunulacağını", "blank": "The group showed how to ___ for reform."},
    {"en": "The manual explains where to allocate the resources.", "tr": "Kılavuz kaynakların nereye tahsis edileceğini açıklar.", "word": "allocate", "trWord": "tahsis edileceğini", "blank": "The manual explains where to ___ the resources."},
    {"en": "We must discover where to anticipate the annual growth.", "tr": "Yıllık büyümenin nerede öngörüleceğini keşfetmeliyiz.", "word": "anticipate", "trWord": "öngörüleceğini", "blank": "We must discover where to ___ the annual growth."},
    {"en": "The code defines where to accumulate the data logs.", "tr": "Kod veri günlüklerinin nerede biriktirileceğini tanımlar.", "word": "accumulate", "trWord": "biriktirileceğini", "blank": "The code defines where to ___ the data logs."},
    {"en": "They are discussing whether to restrict access.", "tr": "Erişimin kısıtlanıp kısıtlanmayacağını tartışıyorlar.", "word": "restrict", "trWord": "kısıtlanıp", "blank": "They are discussing whether to ___ access."},
    {"en": "The council decided whether to suspend the regulations.", "tr": "Konsey düzenlemeleri askıya alıp almayacağına karar verdi.", "word": "suspend", "trWord": "askıya alıp", "blank": "The council decided whether to ___ the regulations."},
    {"en": "The software development team must decide how to alter the parameters.", "tr": "Yazılım geliştirme ekibi parametreleri nasıl değiştireceğine karar vermelidir.", "word": "alter", "trWord": "değiştireceğine", "blank": "The software development team must decide how to ___ the parameters."},
    {"en": "Great care must be taken to learn how to avoid common mistakes.", "tr": "Yaygın hatalardan nasıl kaçınılacağını öğrenmek için büyük özen gösterilmelidir.", "word": "avoid", "trWord": "kaçınılacağını", "blank": "Great care must be taken to learn how to ___ common mistakes."},
    {"en": "The committee explained how to modify the qualitative selection criteria.", "tr": "Komite nitel seçim kriterlerinin nasıl değiştirileceğini açıkladı.", "word": "modify", "trWord": "değiştirileceğini", "blank": "The committee explained how to ___ the qualitative selection criteria."},
    {"en": "The principal laboratory researcher showed what to inspect in the facility.", "tr": "Baş laboratuvar araştırmacısı tesiste neyin inceleneceğini gösterdi.", "word": "inspect", "trWord": "inceleneceğini", "blank": "The principal laboratory researcher showed what to ___ in the facility."},
    {"en": "The revised security protocol defines what to specify in the database.", "tr": "Gözden geçirilmiş güvenlik protokolü veritabanında neyin belirleneceğini tanımlar.", "word": "specify", "trWord": "belirleneceğini", "blank": "The revised security protocol defines what to ___ in the database."},
    {"en": "The automated background script calculates how to maximize efficiency.", "tr": "Otomatik arka plan betiği verimliliğin nasıl maksimize edileceğini hesaplar.", "word": "maximize", "trWord": "maksimize edileceğini", "blank": "The automated background script calculates how to ___ efficiency."},
    {"en": "Mainstream digital media manipulates how to protect public perspective.", "tr": "Ana akım dijital medya kamuoyu bakış açısının nasıl korunacağını manipüle eder.", "word": "protect", "trWord": "korunacağını", "blank": "Mainstream digital media manipulates how to ___ public perspective."},
    {"en": "The technical experts demonstrated how to stabilize internal device components.", "tr": "Teknik uzmanlar dahili cihaz bileşenlerinin nasıl stabilize edileceğini gösterdiler.", "word": "stabilize", "trWord": "stabilize edileceğini", "blank": "The technical experts demonstrated how to ___ internal device components."},
    {"en": "The final scientific finding showed how to validate alternative hypotheses.", "tr": "Nihai bilimsel bulgu alternatif hipotezlerin nasıl doğrulanacağını gösterdi.", "word": "validate", "trWord": "doğrulanacağını", "blank": "The final scientific finding showed how to ___ alternative hypotheses."},
    {"en": "The board of directors discussed whether to terminate bilateral agreements.", "tr": "Yönetim kurulu ikili anlaşmaların sonlandırılıp sonlandırılmayacağını tartıştı.", "word": "terminate", "trWord": "sonlandırılıp", "blank": "The board of directors discussed whether to ___ bilateral agreements."},
    {"en": "The regional administrative council decided when to conduct educational surveys.", "tr": "Bölgesel idari konsey eğitim anketlerinin ne zaman yürütüleceğine karar verdi.", "word": "conduct", "trWord": "yürütüleceğine", "blank": "The regional administrative council decided when to ___ educational surveys."},
    {"en": "The centralized cloud database manages where to accumulate detailed historical logs.", "tr": "Merkezi bulut veritabanı detaylı geçmiş günlüklerin nerede biriktirileceğini yönetir.", "word": "accumulate", "trWord": "biriktirileceğini", "blank": "The centralized cloud database manages where to ___ detailed historical logs."},
    {"en": "The strict institutional policy defines whether to restrict network access.", "tr": "Katı kurumsal politika ağ erişiminin kısıtlanıp kısıtlanmayacağını tanımlar.", "word": "restrict", "trWord": "kısıtlanıp", "blank": "The strict institutional policy defines whether to ___ network access."},
    {"en": "The independent annual audit showed how to expose hidden system flaws.", "tr": "Bağımsız yıllık denetim gizli sistem kusurlarının nasıl ortaya çıkarılacağını gösterdi.", "word": "expose", "trWord": "ortaya çıkarılacağını", "blank": "The independent annual audit showed how to ___ hidden system flaws."},
    {"en": "The software team integrated the modules to demonstrate how to process data.", "tr": "Yazılım ekibi verilerin nasıl işleneceğini göstermek için modülleri entegre etti.", "word": "process", "trWord": "işleneceğini", "blank": "The software team integrated the modules to demonstrate how to ___ data."},
    {"en": "Do you know how to swim in deep water?", "tr": "Derin suda nasıl yüzeceğini biliyor musun?", "word": "swim", "trWord": "yüzeceğini", "blank": "Do you know how to ___ in deep water?"},
    {"en": "We must decide what to say during the meeting.", "tr": "Toplantı sırasında ne söyleyeceğimize karar vermeliyiz.", "word": "say", "trWord": "söyleyeceğimize", "blank": "We must decide what to ___ during the meeting."},
    {"en": "They are planning where to meet tomorrow morning.", "tr": "Yarın sabah nerede buluşacaklarını planlıyorlar.", "word": "meet", "trWord": "buluşacaklarını", "blank": "They are planning where to ___ tomorrow morning."},
    {"en": "She asked the doctor when to take the medicine.", "tr": "Doktora ilacı ne zaman alacağını sordu.", "word": "take", "trWord": "alacağını", "blank": "She asked the doctor when to ___ the medicine."},
    {"en": "The driver explained where to park the truck.", "tr": "Sürücü kamyonu nereye park edeceğini açıkladı.", "word": "park", "trWord": "park edeceğini", "blank": "The driver explained where to ___ the truck."},
    {"en": "He asked his mother how to cook the soup.", "tr": "Annesine çorbayı nasıl pişireceğini sordu.", "word": "cook", "trWord": "pişireceğini", "blank": "He asked his mother how to ___ the soup."},
    {"en": "The worker explained how to use the machine safely.", "tr": "İşçi makinenin güvenli bir şekilde nasıl kullanılacağını açıkladı.", "word": "use", "trWord": "kullanılacağını", "blank": "The worker explained how to ___ the machine safely."},
    {"en": "They did not know where to store the chemicals.", "tr": "Kimyasalları nerede depolayacaklarını bilmiyorlardı.", "word": "store", "trWord": "depolayacaklarını", "blank": "They did not know where to ___ the chemicals."},
    {"en": "We must choose which method to apply in this case.", "tr": "Bu durumda hangi yöntemi uygulayacağımızı seçmeliyiz.", "word": "apply", "trWord": "uygulayacağımızı", "blank": "We must choose which method to ___ in this case."},
    {"en": "She told the assistant when to heat the liquid.", "tr": "Asistana sıvıyı ne zaman ısıtacağını söyledi.", "word": "heat", "trWord": "ısıtacağını", "blank": "She told the assistant when to ___ the liquid."},
    {"en": "He showed the technician which button to press.", "tr": "Teknisyene hangi düğmeye basacağını gösterdi.", "word": "press", "trWord": "basacağını", "blank": "He showed the technician which button to ___."},
    {"en": "They did not know whether to accept the new proposal.", "tr": "Yeni öneriyi kabul edip etmeyeceklerini bilmiyorlardı.", "word": "accept", "trWord": "kabul edip", "blank": "They did not know whether to ___ the new proposal."},
    {"en": "The guide explained where to find the archaeological remains.", "tr": "Rehber arkeolojik kalıntıların nerede bulunacağını açıkladı.", "word": "find", "trWord": "bulunacağını", "blank": "The guide explained where to ___ the archaeological remains."},
    {"en": "Chemists know how to preserve food in winter.", "tr": "Kimyagerler kışın gıdaların nasıl korunacağını bilirler.", "word": "preserve", "trWord": "korunacağını", "blank": "Chemists know how to ___ food in winter."},
    {"en": "Doctors are trying to discover how to cure the disease.", "tr": "Doktorlar hastalığın nasıl tedavi edileceğini keşfetmeye çalışıyorlar.", "word": "cure", "trWord": "tedavi edileceğini", "blank": "Doctors are trying to discover how to ___ the disease."},
    {"en": "The team learned how to isolate the virus.", "tr": "Ekip virüsü nasıl izole edeceğini öğrendi.", "word": "isolate", "trWord": "izole edeceğini", "blank": "The team learned how to ___ the virus."},
    {"en": "They do not know where to send the official letters.", "tr": "Resmi mektupları nereye göndereceklerini bilmiyorlar.", "word": "send", "trWord": "göndereceklerini", "blank": "They do not know where to ___ the official letters."},
    {"en": "The expert showed how to split the atom in the laboratory.", "tr": "Uzman laboratuvarda atomun nasıl parçalanacağını gösterdi.", "word": "split", "trWord": "parçalanacağını", "blank": "The expert showed how to ___ the atom in the laboratory."},
    {"en": "She wants to learn how to alter exact distribution formats.", "tr": "Kesin dağıtım formatlarını nasıl değiştireceğini öğrenmek istiyor.", "word": "alter", "trWord": "değiştireceğini", "blank": "She wants to learn how to ___ exact distribution formats."},
    {"en": "The software development team must decide how to avoid the bugs.", "tr": "Yazılım geliştirme ekibi hatalardan nasıl kaçınacağına karar vermelidir.", "word": "avoid", "trWord": "kaçınacağına", "blank": "The software development team must decide how to ___ the bugs."},
    {"en": "The scientists must know how to modify the parameters of the test.", "tr": "Bilim insanları testin parametrelerini nasıl değiştireceklerini bilmelidir.", "word": "modify", "trWord": "değiştireceklerini", "blank": "The scientists must know how to ___ the parameters of the test."},
    {"en": "Independent experts show what to inspect during the facility visit.", "tr": "Bağımsız uzmanlar tesis ziyareti sırasında neyin denetleneceğini gösteriyor.", "word": "inspect", "trWord": "denetleneceğini", "blank": "Independent experts show what to ___ during the facility visit."},
    {"en": "The council needs to decide what to specify in the tax reform.", "tr": "Konsey vergi reformunda neyin belirleneceğine karar vermelidir.", "word": "specify", "trWord": "belirleneceğine", "blank": "The council needs to decide what to ___ in the tax reform."},
    {"en": "The manager must determine where to allocate the reallocated budget.", "tr": "Müdür yeniden tahsis edilen bütçenin nereye tahsis edileceğini belirlemelidir.", "word": "allocate", "trWord": "tahsis edileceğini", "blank": "The manager must determine where to ___ the reallocated budget."},
    {"en": "The database specifies when to process the newly collected empirical data.", "tr": "Veritabanı yeni toplanan deneysel verilerin ne zaman işleneceğini belirtir.", "word": "process", "trWord": "işleneceğini", "blank": "The database specifies when to ___ the newly collected empirical data."},
    {"en": "The board must choose whether to terminate formal bilateral agreements.", "tr": "Yönetim kurulu resmi ikili anlaşmaları sonlandırıp sonlandırmayacağını seçmelidir.", "word": "terminate", "trWord": "sonlandırıp", "blank": "The board must choose whether to ___ formal bilateral agreements."},
    {"en": "The algorithm determines where to anticipate significant annual financial growth.", "tr": "Algoritma önemli yıllık finansal büyümenin nerede öngörüleceğini belirler.", "word": "anticipate", "trWord": "öngörüleceğini", "blank": "The algorithm determines where to ___ significant annual financial growth."},
    {"en": "The system manages where to accumulate detailed historical system logs.", "tr": "Sistem detaylı geçmiş sistem günlüklerinin nerede biriktirileceğini yönetir.", "word": "accumulate", "trWord": "biriktirileceğini", "blank": "The system manages where to ___ detailed historical system logs."},
    {"en": "The security group decided whether to restrict unauthorized user access.", "tr": "Güvenlik grubu yetkisiz kullanıcı erişiminin kısıtlanıp kısıtlanmayacağına karar verdi.", "word": "restrict", "trWord": "kısıtlanıp", "blank": "The security group decided whether to ___ unauthorized user access."},
    {"en": "The regional administrative council debated whether to suspend the regulations.", "tr": "Bölgesel idari konsey düzenlemeleri askıya alıp almayacağını tartıştı.", "word": "suspend", "trWord": "askıya alıp", "blank": "The regional administrative council debated whether to ___ the regulations."},
    {"en": "The analyst explains how to calculate complex mathematical data ratios.", "tr": "Analist karmaşık matematiksel veri oranlarının nasıl hesaplanacağını açıklar.", "word": "calculate", "trWord": "hesaplanacağını", "blank": "The analyst explains how to ___ complex mathematical data ratios."},
    {"en": "The software team discussed how to integrate individual software modules.", "tr": "Yazılım ekibi bireysel yazılım modüllerini nasıl entegre edeceklerini tartıştı.", "word": "integrate", "trWord": "entegre edeceklerini", "blank": "The software team discussed how to ___ individual software modules."},
    {"en": "The corporate strategy defines how to maximize manufacturing efficiency.", "tr": "Kurumsal strateji üretim verimliliğinin nasıl maksimize edileceğini tanımlar.", "word": "maximize", "trWord": "maksimize edileceğini", "blank": "The corporate strategy defines how to ___ manufacturing efficiency."},
    {"en": "The guidelines specify how to protect sensitive user information data.", "tr": "Kılavuz ilkeler hassas kullanıcı bilgilerinin nasıl korunacağını belirtir.", "word": "protect", "trWord": "korunacağını", "blank": "The guidelines specify how to ___ sensitive user information data."},
    {"en": "The engineer demonstrated how to stabilize crucial internal device components.", "tr": "Mühendis kritik dahili cihaz bileşenlerinin nasıl stabilize edileceğini gösterdi.", "word": "stabilize", "trWord": "stabilize edileceğini", "blank": "The engineer demonstrated how to ___ crucial internal device components."},
    {"en": "The audit validates how to expose hidden organizational system flaws.", "tr": "Denetim gizli örgütsel sistem kusurlarının nasıl ortaya çıkarılacağını doğrular.", "word": "expose", "trWord": "ortaya çıkarılacağını", "blank": "The audit validates how to ___ hidden organizational system flaws."},
    {"en": "The group wants to show how to advocate for legislative reform.", "tr": "Grup yasal reformun nasıl savunulacağını göstermek istiyor.", "word": "advocate", "trWord": "savunulacağını", "blank": "The group wants to show how to ___ for legislative reform."},
    {"en": "The principal researcher showed how to validate alternative scientific hypotheses.", "tr": "Baş araştırmacı alternatif bilimsel hipotezlerin nasıl doğrulanacağını gösterdi.", "word": "validate", "trWord": "doğrulanacağını", "blank": "The principal researcher showed how to ___ alternative scientific hypotheses."}
]

total = img_data + add_data

# Collect all unique words
words = set()
for item in total:
    clean_en = item["en"].lower().replace(".", "").replace("?", "").replace(",", "").replace(":", "")
    for w in clean_en.split():
        words.add(w)

with open("app.js", "r", encoding="utf-8") as f:
    app_js = f.read()

dict_match = re.search(r'const wordDictionary = \{(.*?)\};', app_js, re.DOTALL)
if not dict_match:
    print("Error: Could not find wordDictionary in app.js")
    exit(1)

dict_body = dict_match.group(1)
existing_keys = set(re.findall(r'^\s*["\']([^"\']+)["\']\s*:', dict_body, re.MULTILINE))

missing = sorted(list(words - existing_keys))
print(f"Total unique words: {len(words)}")
print(f"Total missing words: {len(missing)}")
print("Missing words list:")
for w in missing:
    print(f"  {w}")
