import os
import json

lesson30_data = [
    {"en": "the forests remaining in these areas", "tr": "bu bölgelerde kalan ormanlar", "word": "remaining", "trWord": "kalan", "blank": "the forests ___ in these areas"},
    {"en": "a point moving along a straight line", "tr": "doğru bir çizgi boyunca hareket eden bir nokta", "word": "moving", "trWord": "hareket eden", "blank": "a point ___ along a straight line"},
    {"en": "an organism living in the soil", "tr": "toprakta yaşayan bir organizma", "word": "living", "trWord": "yaşayan", "blank": "an organism ___ in the soil"},
    {"en": "a tree growing in sandy soil", "tr": "kumlu toprakta yetişen bir ağaç", "word": "growing", "trWord": "yetişen", "blank": "a tree ___ in sandy soil"},
    {"en": "a line beginning at this point", "tr": "bu noktada başlayan bir çizgi", "word": "beginning", "trWord": "başlayan", "blank": "a line ___ at this point"},
    {"en": "micro-organisms living in the cell", "tr": "hücrede yaşayan mikroorganizmalar", "word": "living", "trWord": "yaşayan", "blank": "micro-organisms ___ in the cell"},
    {"en": "costs increasing because of scarcity of raw materials", "tr": "hammadde kıtlığı nedeniyle artan maliyetler", "word": "increasing", "trWord": "artan", "blank": "costs ___ because of scarcity of raw materials"},
    {"en": "movement continuing in waves", "tr": "dalgalar halinde devam eden hareket", "word": "continuing", "trWord": "devam eden", "blank": "movement ___ in waves"},
    {"en": "results differing from previous experiments", "tr": "önceki deneylerden farklılık gösteren sonuçlar", "word": "differing", "trWord": "farklılık gösteren", "blank": "results ___ from previous experiments"},
    {"en": "gas escaping from the pipes", "tr": "borulardan sızan gaz", "word": "escaping", "trWord": "sızan", "blank": "gas ___ from the pipes"},
    {"en": "problems existing in the cotton industry", "tr": "pamuk endüstrisinde var olan problemler", "word": "existing", "trWord": "var olan", "blank": "problems ___ in the cotton industry"},
    {"en": "a sphere revolving at the base of the column", "tr": "sütunun tabanında dönen bir küre", "word": "revolving", "trWord": "dönen", "blank": "a sphere ___ at the base of the column"},
    {"en": "personnel working in modern factories", "tr": "modern fabrikalarda çalışan personel", "word": "working", "trWord": "çalışan", "blank": "personnel ___ in modern factories"},
    {"en": "a mixture resulting from three elements", "tr": "üç elementten oluşan bir karışım", "word": "resulting", "trWord": "oluşan", "blank": "a mixture ___ from three elements"},
    {"en": "plants living in a smoky atmosphere", "tr": "dumanlı bir atmosferde yaşayan bitkiler", "word": "living", "trWord": "yaşayan", "blank": "plants ___ in a smoky atmosphere"},
    {"en": "a disease beginning with high fever", "tr": "yüksek ateşle başlayan bir hastalık", "word": "beginning", "trWord": "başlayan", "blank": "a disease ___ with high fever"},
    {"en": "opinions disagreeing with the majority", "tr": "çoğunluğa katılmayan fikirler", "word": "disagreeing", "trWord": "katılmayan", "blank": "opinions ___ with the majority"},
    {"en": "a disease developing from vitamin deficiency", "tr": "vitamin eksikliğinden gelişen bir hastalık", "word": "developing", "trWord": "gelişen", "blank": "a disease ___ from vitamin deficiency"},
    {"en": "a diet lacking in protein", "tr": "protein bakımından eksik bir diyet", "word": "lacking", "trWord": "eksik", "blank": "a diet ___ in protein"},
    {"en": "waves moving in the same direction", "tr": "aynı yönde hareket eden dalgalar", "word": "moving", "trWord": "hareket eden", "blank": "waves ___ in the same direction"},
    {"en": "legislation existing for the individual", "tr": "birey için var olan mevzuat", "word": "existing", "trWord": "var olan", "blank": "legislation ___ for the individual"},
    {"en": "a characteristic distinguishing from other species of insect", "tr": "diğer böcek türlerinden ayıran bir özellik", "word": "distinguishing", "trWord": "ayıran", "blank": "a characteristic ___ from other species of insect"},
    {"en": "factors contributing to the general situation", "tr": "genel duruma katkıda bulunan faktörler", "word": "contributing", "trWord": "katkıda bulunan", "blank": "factors ___ to the general situation"},
    {"en": "a mixture consisting of sand, cement and water", "tr": "kum, çimento ve sudan oluşan bir karışım", "word": "consisting", "trWord": "oluşan", "blank": "a mixture ___ of sand, cement and water"},
    {"en": "a compound consisting of salt and acids", "tr": "tuz ve asitlerden oluşan bir bileşik", "word": "consisting", "trWord": "oluşan", "blank": "a compound ___ of salt and acids"},
    {"en": "The factors emerging from the study", "tr": "Çalışmadan ortaya çıkan faktörler", "word": "emerging", "trWord": "ortaya çıkan", "blank": "The factors ___ from the study"},
    {"en": "The authors publishing in academic journals", "tr": "Akademik dergilerde yayın yapan yazarlar", "word": "publishing", "trWord": "yayın yapan", "blank": "The authors ___ in academic journals"},
    {"en": "The companies competing in this sector", "tr": "Bu sektörde rekabet eden şirketler", "word": "competing", "trWord": "rekabet eden", "blank": "The companies ___ in this sector"},
    {"en": "The dynamic variables changing during the process", "tr": "Süreç boyunca değişen dinamik değişkenler", "word": "changing", "trWord": "değişen", "blank": "The dynamic variables ___ during the process"},
    {"en": "The separate groups participating in the initial project", "tr": "Başlangıç projesine katılan ayrı gruplar", "word": "participating", "trWord": "katılan", "blank": "The separate groups ___ in the initial project"},
    {"en": "The structural components remaining on the site", "tr": "Sahada kalan yapısal bileşenler", "word": "remaining", "trWord": "kalan", "blank": "The structural components ___ on the site"},
    {"en": "The fundamental principles underlying this economic theory", "tr": "Bu ekonomik teorinin temelini oluşturan temel ilkeler", "word": "underlying", "trWord": "temelini oluşturan", "blank": "The fundamental principles ___ this economic theory"},
    {"en": "The independent researchers working within the administration", "tr": "Yönetim içinde çalışan bağımsız araştırmacılar", "word": "working", "trWord": "çalışan", "blank": "The independent researchers ___ within the administration"},
    {"en": "The consistent layers forming at the bottom of the container", "tr": "Kabın dibinde oluşan tutarlı tabakalar", "word": "forming", "trWord": "oluşan", "blank": "The consistent layers ___ at the bottom of the container"},
    {"en": "The legal authorities acting under constitutional clauses", "tr": "Anayasal maddeler uyarınca hareket eden yasal otoriteler", "word": "acting", "trWord": "hareket eden", "blank": "The legal authorities ___ under constitutional clauses"}
]

lesson31_data = [
    {"en": "a diagram showing the classification", "tr": "sınıflandırmayı gösteren bir şema", "word": "showing", "trWord": "gösteren", "blank": "a diagram ___ the classification"},
    {"en": "a statement containing the facts", "tr": "gerçekleri içeren bir ifade", "word": "containing", "trWord": "içeren", "blank": "a statement ___ the facts"},
    {"en": "an article describing the situation", "tr": "durumu açıklayan bir makale", "word": "describing", "trWord": "açıklayan", "blank": "an article ___ the situation"},
    {"en": "a wire connecting the electrodes", "tr": "elektrotları bağlayan bir tel", "word": "connecting", "trWord": "bağlayan", "blank": "a wire ___ the electrodes"},
    {"en": "a cover protecting the contents", "tr": "içeriği koruyan bir kapak", "word": "protecting", "trWord": "koruyan", "blank": "a cover ___ the contents"},
    {"en": "principles determining the right", "tr": "hakkı belirleyen ilkeler", "word": "determining", "trWord": "belirleyen", "blank": "principles ___ the right"},
    {"en": "a statement defining the principles", "tr": "ilkeleri tanımlayan bir ifade", "word": "defining", "trWord": "tanımlayan", "blank": "a statement ___ the principles"},
    {"en": "a law protecting the individual", "tr": "bireyi koruyan bir yasa", "word": "protecting", "trWord": "koruyan", "blank": "a law ___ the individual"},
    {"en": "laws protecting the rights", "tr": "hakları koruyan yasalar", "word": "protecting", "trWord": "koruyan", "blank": "laws ___ the rights"},
    {"en": "evidence proving the guilt", "tr": "suçluluğu kanıtlayan delil", "word": "proving", "trWord": "kanıtlayan", "blank": "evidence ___ the guilt"},
    {"en": "experiments proving the theory", "tr": "teoriyi kanıtlayan deneyler", "word": "proving", "trWord": "kanıtlayan", "blank": "experiments ___ the theory"},
    {"en": "a community cultivating the land", "tr": "toprağı işleyen bir topluluk", "word": "cultivating", "trWord": "işleyen", "blank": "a community ___ the land"},
    {"en": "a principle establishing the rights", "tr": "hakları tesis eden bir ilke", "word": "establishing", "trWord": "tesis eden", "blank": "a principle ___ the rights"},
    {"en": "a gas giving off a smell", "tr": "koku yayan bir gaz", "word": "giving", "trWord": "yayan", "blank": "a gas ___ off a smell"},
    {"en": "a flask containing a liquid", "tr": "sıvı içeren bir balon", "word": "containing", "trWord": "içeren", "blank": "a flask ___ a liquid"},
    {"en": "a tenant occupying premises", "tr": "mülkü işgal eden bir kiracı", "word": "occupying", "trWord": "işgal eden", "blank": "a tenant ___ premises"},
    {"en": "a contract binding both parties", "tr": "her iki tarafı da bağlayan bir sözleşme", "word": "binding", "trWord": "bağlayan", "blank": "a contract ___ both parties"},
    {"en": "a guarantee promising protection", "tr": "koruma vaat eden bir garanti", "word": "promising", "trWord": "vaat eden", "blank": "a guarantee ___ protection"},
    {"en": "a policy creating many problems", "tr": "birçok sorun yaratan bir politika", "word": "creating", "trWord": "yaratan", "blank": "a policy ___ many problems"},
    {"en": "characteristics distinguishing this species", "tr": "bu türü ayıran özellikler", "word": "distinguishing", "trWord": "ayıran", "blank": "characteristics ___ this species"},
    {"en": "water containing pollen dust", "tr": "polen tozu içeren su", "word": "containing", "trWord": "içeren", "blank": "water ___ pollen dust"},
    {"en": "a statement containing a description of the accident", "tr": "kazanın açıklamasını içeren bir ifade", "word": "containing", "trWord": "içeren", "blank": "a statement ___ a description of the accident"},
    {"en": "a diagram showing the classification of the species", "tr": "türlerin sınıflandırılmasını gösteren bir şema", "word": "showing", "trWord": "gösteren", "blank": "a diagram ___ the classification of the species"},
    {"en": "a statement addressing the whole community", "tr": "tüm topluluğa hitap eden bir ifade", "word": "addressing", "trWord": "hitap eden", "blank": "a statement ___ the whole community"},
    {"en": "a report approving the decisions of the council", "tr": "konseyin kararlarını onaylayan bir rapor", "word": "approving", "trWord": "onaylayan", "blank": "a report ___ the decisions of the council"},
    {"en": "a wire connecting the electrodes to the battery", "tr": "elektrotları bataryaya bağlayan bir tel", "word": "connecting", "trWord": "bağlayan", "blank": "a wire ___ the electrodes to the battery"},
    {"en": "action creating confusion in the court of law", "tr": "mahkemede kafa karışıklığı yaratan eylem", "word": "creating", "trWord": "yaratan", "blank": "action ___ confusion in the court of law"},
    {"en": "an experiment demonstrating the principles of relativity", "tr": "görelilik ilkelerini gösteren bir deney", "word": "demonstrating", "trWord": "gösteren", "blank": "an experiment ___ the principles of relativity"},
    {"en": "an article describing the newly-discovered objects", "tr": "yeni keşfedilen nesneleri tanımlayan bir makale", "word": "describing", "trWord": "tanımlayan", "blank": "an article ___ the newly-discovered objects"},
    {"en": "a principle determining the rights of the people", "tr": "halkın haklarını belirleyen bir ilke", "word": "determining", "trWord": "belirleyen", "blank": "a principle ___ the rights of the people"},
    {"en": "a constitution establishing the rights of the people", "tr": "halkın haklarını tesis eden bir anayasa", "word": "establishing", "trWord": "tesis eden", "blank": "a constitution ___ the rights of the people"},
    {"en": "a law limiting the sale of drugs", "tr": "ilaçların satışını sınırlayan bir yasa", "word": "limiting", "trWord": "sınırlayan", "blank": "a law ___ the sale of drugs"},
    {"en": "a statement defining the principles of democracy", "tr": "demokrasinin ilkelerini tanımlayan bir ifade", "word": "defining", "trWord": "tanımlayan", "blank": "a statement ___ the principles of democracy"},
    {"en": "a statement containing the facts of the case", "tr": "davanın gerçeklerini içeren bir ifade", "word": "containing", "trWord": "içeren", "blank": "a statement ___ the facts of the case"},
    {"en": "an exhibition containing some of the best work", "tr": "en iyi çalışmalardan bazılarını içeren bir sergi", "word": "containing", "trWord": "içeren", "blank": "an exhibition ___ some of the best work"},
    {"en": "evidence proving the guilt of the defendant", "tr": "davalının suçluluğunu kanıtlayan delil", "word": "proving", "trWord": "kanıtlayan", "blank": "evidence ___ the guilt of the defendant"},
    {"en": "laws protecting the freedom of the individual", "tr": "bireyin özgürlüğünü koruyan yasalar", "word": "protecting", "trWord": "koruyan", "blank": "laws ___ the freedom of the individual"},
    {"en": "a promise guaranteeing the rights of the individual", "tr": "bireyin haklarını garanti eden bir vaat", "word": "guaranteeing", "trWord": "garanti eden", "blank": "a promise ___ the rights of the individual"},
    {"en": "an innovation introducing many new methods", "tr": "birçok yeni yöntem getiren bir yenilik", "word": "introducing", "trWord": "getiren", "blank": "an innovation ___ many new methods"},
    {"en": "an experiment necessitating careful observation", "tr": "dikkatli gözlem gerektiren bir deney", "word": "necessitating", "trWord": "gerektiren", "blank": "an experiment ___ careful observation"},
    {"en": "new laws affecting every individual of community", "tr": "toplumun her bireyini etkileyen yeni yasalar", "word": "affecting", "trWord": "etkileyen", "blank": "new laws ___ every individual of community"},
    {"en": "a policy granting new benefits to the old and unemployed", "tr": "yaşlılara ve işsizlere yeni faydalar sağlayan bir politika", "word": "granting", "trWord": "sağlayan", "blank": "a policy ___ new benefits to the old and unemployed"},
    {"en": "a characteristic distinguishing this species of insect", "tr": "bu böcek türünü ayıran bir özellik", "word": "distinguishing", "trWord": "ayıran", "blank": "a characteristic ___ this species of insect"},
    {"en": "activity endangering the lives of members of the community", "tr": "toplum üyelerinin hayatlarını tehlikeye atan faaliyet", "word": "endangering", "trWord": "tehlikeye atan", "blank": "activity ___ the lives of members of the community"},
    {"en": "factors governing the rate of growth", "tr": "büyüme hızını belirleyen faktörler", "word": "governing", "trWord": "belirleyen", "blank": "factors ___ the rate of growth"},
    {"en": "a document authorizing the owner of the premises", "tr": "mülk sahibine yetki veren bir belge", "word": "authorizing", "trWord": "yetki veren", "blank": "a document ___ the owner of the premises"},
    {"en": "The movement of molecules could be seen in water containing pollen dust.", "tr": "Moleküllerin hareketi, polen tozu içeren suda görülebilirdi.", "word": "containing", "trWord": "içeren", "blank": "The movement of molecules could be seen in water ___ pollen dust."},
    {"en": "He gave the police a statement containing a description of the accident.", "tr": "Polise, kazanın açıklamasını içeren bir ifade verdi.", "word": "containing", "trWord": "içeren", "blank": "He gave the police a statement ___ a description of the accident."},
    {"en": "On this page there is a diagram showing the classification of the species.", "tr": "Bu sayfada, türlerin sınıflandırılmasını gösteren bir şema var.", "word": "showing", "trWord": "gösteren", "blank": "On this page there is a diagram ___ the classification of the species."},
    {"en": "The report contains a statement addressing the whole community.", "tr": "Rapor, tüm topluluğa hitap eden bir ifade içermektedir.", "word": "addressing", "trWord": "hitap eden", "blank": "The report contains a statement ___ the whole community."},
    {"en": "A report approving the decisions of the council was read to the court.", "tr": "Konseyin kararlarını onaylayan bir rapor mahkemede okundu.", "word": "approving", "trWord": "onaylayan", "blank": "A report ___ the decisions of the council was read to the court."},
    {"en": "The current passes along a wire connecting the electrode to the battery.", "tr": "Akım, elektrodu bataryaya bağlayan bir tel boyunca geçer.", "word": "connecting", "trWord": "bağlayan", "blank": "The current passes along a wire ___ the electrode to the battery."},
    {"en": "He was accused of action creating confusion in the court of law.", "tr": "Mahkemede kafa karışıklığı yaratan eylemlerle suçlandı.", "word": "creating", "trWord": "yaratan", "blank": "He was accused of action ___ confusion in the court of law."},
    {"en": "This is an experiment demonstrating the principles of relativity.", "tr": "Bu, görelilik ilkelerini gösteren bir deneydir.", "word": "demonstrating", "trWord": "gösteren", "blank": "This is an experiment ___ the principles of relativity."},
    {"en": "He has published an article describing the newly-discovered objects.", "tr": "Yeni keşfedilen nesneleri tanımlayan bir makale yayımladı.", "word": "describing", "trWord": "tanımlayan", "blank": "He has published an article ___ the newly-discovered objects."},
    {"en": "The principle determining the rights of the people was explained in the lecture.", "tr": "Halkın haklarını belirleyen ilke derste açıklandı.", "word": "determining", "trWord": "belirleyen", "blank": "The principle ___ the rights of the people was explained in the lecture."},
    {"en": "There was no constitution establishing the rights of the people.", "tr": "Halkın haklarını tesis eden bir anayasa yoktu.", "word": "establishing", "trWord": "tesis eden", "blank": "There was no constitution ___ the rights of the people."},
    {"en": "A law limiting the sale of drugs was passed in 1936.", "tr": "İlaçların satışını sınırlayan bir yasa 1936'da kabul edildi.", "word": "limiting", "trWord": "sınırlayan", "blank": "A law ___ the sale of drugs was passed in 1936."},
    {"en": "He published a statement defining the principles of democracy.", "tr": "Demokrasinin ilkelerini tanımlayan bir bildiri yayımladı.", "word": "defining", "trWord": "tanımlayan", "blank": "He published a statement ___ the principles of democracy."},
    {"en": "He published a statement containing the facts of the case.", "tr": "Davanın gerçeklerini içeren bir bildiri yayımladı.", "word": "containing", "trWord": "içeren", "blank": "He published a statement ___ the facts of the case."},
    {"en": "Last year there was an exhibition containing some of the best work of the Renaissance in Italy.", "tr": "Geçen yıl, İtalya'da Rönesans'ın en iyi çalışmalarından bazılarını içeren bir sergi vardı.", "word": "containing", "trWord": "içeren", "blank": "Last year there was an exhibition ___ some of the best work of the Renaissance in Italy."},
    {"en": "The witness could provide no evidence proving the guilt of the defendant.", "tr": "Tanık, davalının suçluluğunu kanıtlayan hiçbir delil sunamadı.", "word": "proving", "trWord": "kanıtlayan", "blank": "The witness could provide no evidence ___ the guilt of the defendant."},
    {"en": "There are many many laws protecting the freedom of the individual.", "tr": "Bireyin özgürlüğünü koruyan pek çok yasa vardır.", "word": "protecting", "trWord": "koruyan", "blank": "There are many many laws ___ the freedom of the individual."},
    {"en": "This was contained in a promise guaranteeing the rights of the individual.", "tr": "Bu, bireyin haklarını garanti eden bir vaatte yer alıyordu.", "word": "guaranteeing", "trWord": "garanti eden", "blank": "This was contained in a promise ___ the rights of the individual."},
    {"en": "Electrical power was an innovation introducing many new methods in industry.", "tr": "Elektrik gücü, endüstride pek çok yeni yöntem getiren bir yenilikti.", "word": "introducing", "trWord": "getiren", "blank": "Electrical power was an innovation ___ many new methods in industry."},
    {"en": "This could be proved in an experiment necessitating careful observation.", "tr": "Bu, dikkatli gözlem gerektiren bir deneyle kanıtlanabilirdi.", "word": "necessitating", "trWord": "gerektiren", "blank": "This could be proved in an experiment ___ careful observation."},
    {"en": "The government has passed many new laws affecting every individual of the community.", "tr": "Hükümet, toplumun her bireyini etkileyen pek çok yeni yasa çıkardı.", "word": "affecting", "trWord": "etkleyen", "blank": "The government has passed many new laws ___ every individual of the community."},
    {"en": "The government has proposed a policy granting new benefits to the old and unemployed.", "tr": "Hükümet, yaşlılara ve işsizlere yeni faydalar sağlayan bir politika önerdi.", "word": "granting", "trWord": "sağlayan", "blank": "The government has proposed a policy ___ new benefits to the old and unemployed."},
    {"en": "The shape of the head and thorax is a characteristic distinguishing this species of insect.", "tr": "Baş ve göğüs kafesinin şekli, bu böcek türünü ayıran bir özelliktir.", "word": "distinguishing", "trWord": "ayıran", "blank": "The shape of the head and thorax is a characteristic ___ this species of insect."},
    {"en": "They were engaged in activity endangering the lives of members of the community.", "tr": "Toplum üyelerinin hayatlarını tehlikeye atan faaliyetlerle meşguldüler.", "word": "endangering", "trWord": "tehlikeye atan", "blank": "They were engaged in activity ___ the lives of members of the community."},
    {"en": "There are many factors governing the rate of growth of a plant or tree.", "tr": "Bir bitki veya ağacın büyüme hızını belirleyen pek çok faktör vardır.", "word": "governing", "trWord": "belirleyen", "blank": "There are many factors ___ the rate of growth of a plant or tree."},
    {"en": "There was no signature on the document authorizing the owner of the premises to empty the rooms.", "tr": "Mülk sahibine odaları boşaltma yetkisi veren belgede imza yoktu.", "word": "authorizing", "trWord": "yetki veren", "blank": "There was no signature on the document ___ the owner of the premises to empty the rooms."}
]

lesson32_data = [
    {"en": "nations united in their desire for peace", "tr": "barış arzularında birleşmiş uluslar", "word": "united", "trWord": "birleşmiş", "blank": "nations ___ in their desire for peace"},
    {"en": "facts well-known to scientists", "tr": "bilim insanlarınca iyi bilinen gerçekler", "word": "well-known", "trWord": "iyi bilinen", "blank": "facts ___ to scientists"},
    {"en": "a compound composed of two elements", "tr": "iki elementten oluşan bir bileşik", "word": "composed", "trWord": "oluşan", "blank": "a compound ___ of two elements"},
    {"en": "a picture simplified for children", "tr": "çocuklar için basitleştirilmiş bir resim", "word": "simplified", "trWord": "basitleştirilmiş", "blank": "a picture ___ for children"},
    {"en": "all the materials needed for their industries", "tr": "sanayileri için ihtiyaç duyulan tüm malzemeler", "word": "needed", "trWord": "ihtiyaç duyulan", "blank": "all the materials ___ for their industries"},
    {"en": "lead exposed to the air", "tr": "havaya maruz kalmış kurşun", "word": "exposed", "trWord": "maruz kalmış", "blank": "lead ___ to the air"},
    {"en": "organisms classified in the vegetable kingdom", "tr": "bitkiler aleminde sınıflandırılan organizmalar", "word": "classified", "trWord": "sınıflandırılan", "blank": "organisms ___ in the vegetable kingdom"},
    {"en": "the energy produced by an atomic pile", "tr": "bir atomik reaktör tarafından üretilen enerji", "word": "produced", "trWord": "üretilen", "blank": "the energy ___ by an atomic pile"},
    {"en": "energy produced by an atom", "tr": "bir atom tarafından üretilen enerji", "word": "produced", "trWord": "üretilen", "blank": "energy ___ by an atom"},
    {"en": "gamma rays emitted by a small piece of cobalt", "tr": "küçük bir kobalt parçası tarafından yayılan gama ışınları", "word": "emitted", "trWord": "yayılan", "blank": "gamma rays ___ by a small piece of cobalt"},
    {"en": "woods inhabited by wild animals", "tr": "vahşi hayvanların yaşadığı ormanlar", "word": "inhabited", "trWord": "yaşadığı", "blank": "woods ___ by wild animals"},
    {"en": "food produced by their enzyme action", "tr": "enzim aktiviteleri tarafından üretilen besin", "word": "produced", "trWord": "üretilen", "blank": "food ___ by their enzyme action"},
    {"en": "land exposed to the danger of floods", "tr": "sel tehlikesine maruz kalan arazi", "word": "exposed", "trWord": "maruz kalan", "blank": "land ___ to the danger of floods"},
    {"en": "information needed to develop the programme", "tr": "programı geliştirmek için ihtiyaç duyulan bilgi", "word": "needed", "trWord": "ihtiyaç duyulan", "blank": "information ___ to develop the programme"},
    {"en": "subject matter used as a basis for teaching", "tr": "öğretim için temel olarak kullanılan konu", "word": "used", "trWord": "kullanılan", "blank": "subject matter ___ as a basis for teaching"},
    {"en": "waves emitted by the stars", "tr": "yıldızlar tarafından yayılan dalgalar", "word": "emitted", "trWord": "yayılan", "blank": "waves ___ by the stars"},
    {"en": "signals sent by artificial satellites and rockets", "tr": "yapay uydular ve roketler tarafından gönderilen sinyaller", "word": "sent", "trWord": "gönderilen", "blank": "signals ___ by artificial satellites and rockets"},
    {"en": "towns surrounded by strong walls", "tr": "güçlü surlarla çevrili kasabalar", "word": "surrounded", "trWord": "çevrili", "blank": "towns ___ by strong walls"},
    {"en": "vibrations generated by the light source", "tr": "ışık kaynağı tarafından üretilen titreşimler", "word": "generated", "trWord": "üretilen", "blank": "vibrations ___ by the light source"},
    {"en": "effects expected from the programmes", "tr": "programlardan beklenen etkiler", "word": "expected", "trWord": "beklenen", "blank": "effects ___ from the programmes"},
    {"en": "programmes outlined in the reports", "tr": "raporlarda taslağı çizilen programlar", "word": "outlined", "trWord": "belirtilen", "blank": "programmes ___ in the reports"},
    {"en": "surveys made before the 1936 Flood Control Act", "tr": "1936 Sel Kontrol Yasasından önce yapılan araştırmalar", "word": "made", "trWord": "yapılan", "blank": "surveys ___ before the 1936 Flood Control Act"},
    {"en": "There were representatives from many nations united in their desire for peace.", "tr": "Barış arzularında birleşmiş pek coğundan temsilciler vardı.", "word": "united", "trWord": "birleşmiş", "blank": "There were representatives from many nations ___ in their desire for peace."},
    {"en": "These are facts well-known to scientists.", "tr": "Bunlar, bilim insanlarınca iyi bilinen gerçeklerdir.", "word": "well-known", "trWord": "iyi bilinen", "blank": "These are facts ___ to scientists."},
    {"en": "This produces a compound composed of two elements.", "tr": "Bu, iki elementten oluşan bir bileşik üretir.", "word": "composed", "trWord": "oluşan", "blank": "This produces a compound ___ of two elements."},
    {"en": "This book contains pictures simplified for children to understand.", "tr": "Bu kitap, çocukların anlaması için basitleştirilmiş resimler içerir.", "word": "simplified", "trWord": "basitleştirilmiş", "blank": "This book contains pictures ___ for children to understand."},
    {"en": "European countries do not produce all the materials needed for their industries.", "tr": "Avrupa ülkeleri, sanayileri için ihtiyaç duyulan tüm malzemeleri üretmezler.", "word": "needed", "trWord": "ihtiyaç duyulan", "blank": "European countries do not produce all the materials ___ for their industries."},
    {"en": "A piece of lead exposed to the air becomes covered with a black film.", "tr": "Havaya maruz kalan bir kurşun parçası siyah bir tabaka ile kaplanır.", "word": "exposed", "trWord": "maruz kalan", "blank": "A piece of lead ___ to the air becomes covered with a black film."},
    {"en": "Bacteria are microscopic organisms classified in the vegetable kingdom.", "tr": "Bakteriler, bitkiler aleminde sınıflandırılan mikroskobik organizmalardır.", "word": "classified", "trWord": "sınıflandırılan", "blank": "Bacteria are microscopic organisms ___ in the vegetable kingdom."},
    {"en": "The energy produced by an atomic pile is not cheap.", "tr": "Atomik reaktör tarafından üretilen enerji ucuz değildir.", "word": "produced", "trWord": "üretilen", "blank": "The energy ___ by an atomic pile is not cheap."},
    {"en": "Energy produced by an atom costs more than energy produced by coal or petroleum.", "tr": "Bir atom tarafından üretilen enerji, kömür veya petrolden üretilen enerjiden daha pahalıya mal olur.", "word": "produced", "trWord": "üretilen", "blank": "Energy ___ by an atom costs more than energy produced by coal or petroleum."},
    {"en": "The gamma rays emitted by a small piece of cobalt contained in a protecting cover penetrate to the cells.", "tr": "Koruyucu bir kapak içinde bulunan küçük bir kobalt parçası tarafından yayılan gama ışınları hücrelere nüfuz eder.", "word": "emitted", "trWord": "yayılan", "blank": "The gamma rays ___ by a small piece of cobalt contained in a protecting cover penetrate to the cells."},
    {"en": "These were woods inhabited by wild animals.", "tr": "Bunlar, vahşi hayvanların yaşadığı ormanlardı.", "word": "inhabited", "trWord": "yaşadığı", "blank": "These were woods ___ by wild animals."},
    {"en": "The fungi absorbs the liquid food produced by their enzyme action.", "tr": "Mantarlar, enzim aktiviteleri tarafından üretilen sıvı besini emer.", "word": "produced", "trWord": "üretilen", "blank": "The fungi absorbs the liquid food ___ by their enzyme action."},
    {"en": "We could see large areas of land exposed to the danger of floods.", "tr": "Sel tehlikesine maruz kalan geniş arazi alanları görebiliyorduk.", "word": "exposed", "trWord": "maruz kalan", "blank": "We could see large areas of land ___ to the danger of floods."},
    {"en": "The department provides the information needed to develop the programme.", "tr": "Departman, programı geliştirmek için ihtiyaç duyulan bilgileri sağlar.", "word": "needed", "trWord": "ihtiyaç duyulan", "blank": "The department provides the information ___ to develop the programme."},
    {"en": "The subject matter used as a basis for teaching is provided by the educational department.", "tr": "Öğretim için temel olarak kullanılan konu eğitim departmanı tarafından sağlanır.", "word": "used", "trWord": "kullanılan", "blank": "The subject matter ___ as a basis for teaching is provided by the educational department."},
    {"en": "Electro-magnetic waves emitted by stars are recorded by radio telescope.", "tr": "Yıldızlar tarafından yayılan elektromanyetik dalgalar radyo teleskopu ile kaydedilir.", "word": "emitted", "trWord": "yayılan", "blank": "Electro-magnetic waves ___ by stars are recorded by radio telescope."},
    {"en": "Radio telescopes also receive radio signals sent by artificial satellites.", "tr": "Radyo teleskopları ayrıca yapay uydular tarafından gönderilen radyo sinyallerini de alır.", "word": "sent", "trWord": "gönderilen", "blank": "Radio telescopes also receive radio signals ___ by artificial satellites."},
    {"en": "Primitive villages gradually developed into towns surrounded by strong walls.", "tr": "İlkel köyler kademeli olarak güçlü surlarla çevrili kasabalara dönüştü.", "word": "surrounded", "trWord": "çevrili", "blank": "Primitive villages gradually developed into towns ___ by strong walls."},
    {"en": "Light consists of vibrations generated by the light source.", "tr": "Işık, ışık kaynağı tarafından üretilen titreşimlerden oluşur.", "word": "generated", "trWord": "üretilen", "blank": "Light consists of vibrations ___ by the light source."},
    {"en": "The beneficial effects expected from the programmes outlined in the reports were described in the surveys made before the 1936 Flood Control Act.", "tr": "Araştırmalarda, 1936 Sel Kontrol Yasasından önce yapılan raporlarda belirtilen programlardan beklenen olumlu etkiler açıklanmıştır.", "word": "expected", "trWord": "beklenen", "blank": "The beneficial effects ___ from the programmes outlined in the reports were described in the surveys made before the 1936 Flood Control Act."}
]

vocab_updates = {
  "absorbs": "emer / soğurur",
  "accident": "kaza",
  "accused": "suçlanan / suçlandı",
  "acids": "asitler",
  "act": "yasa / kanun / eylem",
  "addressing": "hitap eden / değinen",
  "affecting": "etkileyen",
  "air": "hava",
  "along": "boyunca",
  "also": "ayrıca / de",
  "animals": "hayvanlar",
  "approving": "onaylayan",
  "areas": "alanlar / bölgeler",
  "artificial": "yapay",
  "atmosphere": "atmosfer",
  "atom": "atom",
  "atomic": "atomik",
  "authorizing": "yetki veren",
  "base": "taban / üs",
  "basis": "temel / esas",
  "battery": "batarya / pil",
  "because": "çünkü / -den dolayı",
  "becomes": "olur / haline gelir",
  "beginning": "başlayan",
  "beneficial": "faydalı / yararlı",
  "best": "en iyi",
  "black": "siyah / kara",
  "careful": "dikkatli",
  "cell": "hücre",
  "cement": "çimento",
  "characteristic": "özellik / karakteristik",
  "cheap": "ucuz",
  "classification": "sınıflandırma",
  "cobalt": "kobalt",
  "column": "sütun / kolon",
  "composed": "oluşan / birleşen",
  "confusion": "kafa karışıklığı",
  "connecting": "bağlayan",
  "consisting": "oluşan",
  "consists": "oluşur",
  "constitution": "anayasa",
  "contained": "bulunan / içeren",
  "containing": "içeren",
  "contents": "içerik / içindekiler",
  "contributing": "katkıda bulunan",
  "cotton": "pamuk",
  "council": "konsey / meclis",
  "court": "mahkeme",
  "cover": "kapak / örtü",
  "covered": "kaplı / kaplanmış",
  "creating": "yaratan / oluşturan",
  "cultivating": "işleyen / ekip biçen",
  "current": "akım / cereyan",
  "defendant": "davalı / sanık",
  "deficiency": "eksiklik",
  "democracy": "demokrasi",
  "demonstrating": "gösteren / kanıtlayan",
  "described": "tanımlanan / açıklandı",
  "describing": "tanımlayan / açıklayan",
  "desire": "arzu / istek",
  "determining": "belirleyen",
  "developed": "gelişen / gelişti",
  "developing": "gelişen",
  "direction": "yön",
  "disagreeing": "katılmayan / uyuşmayan",
  "distinguishing": "ayıran / ayırt edici",
  "drugs": "ilaçlar / uyuşturucular",
  "dust": "toz",
  "educational": "eğitimsel / eğitim",
  "effects": "etkiler",
  "electrical": "elektrik / elektriksel",
  "electro-magnetic": "elektromanyetik",
  "electrode": "elektrot",
  "electrodes": "elektrotlar",
  "empty": "boş / boşaltmak",
  "endangering": "tehlikeye atan",
  "engaged": "meşgul / uğraşan",
  "enzyme": "enzim",
  "escaping": "sızan / kaçan",
  "establishing": "kuran / tesis eden",
  "european": "avrupalı / avrupa",
  "every": "her / her bir",
  "exhibition": "sergi",
  "explained": "açıklanan / açıklandı",
  "facts": "gerçekler",
  "fever": "ateş",
  "flask": "şişe / balon",
  "flood": "sel",
  "floods": "seller",
  "freedom": "özgürlük",
  "fungi": "mantarlar",
  "gamma": "gama",
  "general": "genel",
  "generated": "üretilen / oluşturulan",
  "giving": "veren / yayan",
  "governing": "yöneten / yönetici",
  "gradually": "kademeli olarak / yavaş yavaş",
  "granting": "sağlayan / veren",
  "guaranteeing": "garanti eden",
  "industries": "sanayiler / endüstriler",
  "insect": "böcek",
  "introducing": "tanıtan / getiren",
  "italy": "italya",
  "kingdom": "alem / krallık",
  "lacking": "eksik / yoksun",
  "lead": "kurşun / yönlendirmek",
  "lecture": "konferans / ders",
  "limiting": "sınırlayan",
  "line": "çizgi / hat",
  "lives": "hayatlar / yaşamlar",
  "made": "yapılan / yapıldı",
  "majority": "çoğunluk",
  "matter": "madde / husus",
  "members": "üyeler",
  "micro-organisms": "mikroorganizmalar",
  "microscopic": "mikroskobik",
  "mixture": "karışım",
  "moving": "hareket eden",
  "necessitating": "gerektiren",
  "needed": "gerekli / ihtiyaç duyulan",
  "newly-discovered": "yeni keşfedilen",
  "objects": "nesneler / objeler",
  "occupying": "işgal eden / oturan",
  "off": "off (yayınlama / kapalı)",
  "organisms": "organizmalar",
  "outlined": "taslağı çizilen / belirtilen",
  "owner": "sahip / malik",
  "passed": "geçti / kabul edildi",
  "passes": "geçer",
  "petroleum": "petrol",
  "piece": "parça",
  "pile": "reaktör / yığın",
  "pipes": "borular",
  "plants": "bitkiler",
  "pollen": "polen",
  "power": "güç / energy",
  "premises": "mülk / bina",
  "previous": "önceki",
  "primitive": "ilkel",
  "produced": "üretilen / üretildi",
  "produces": "üretir",
  "programmes": "programlar",
  "promise": "vaat / söz",
  "protecting": "koruyan",
  "protein": "protein",
  "proved": "kanıtlandı / ispatlandı",
  "provide": "sağlamak / sunmak",
  "proving": "kanıtlayan / ispatlayan",
  "radio": "radyo",
  "raw": "ham / işlenmemiş",
  "receive": "alır / almak",
  "relativity": "görelilik / rölativite",
  "renaissance": "rönesans",
  "representatives": "temsilciler",
  "resulting": "oluşan / ortaya çıkan",
  "revolving": "dönen / devreden",
  "right": "hak / doğru",
  "rights": "haklar",
  "rockets": "roketler",
  "rooms": "odalar",
  "sale": "satış",
  "same": "aynı",
  "sandy": "kumlu",
  "satellites": "uydular",
  "scarcity": "kıtlık",
  "see": "görmek",
  "sent": "gönderilen / gönderildi",
  "shape": "şekil",
  "showing": "gösteren",
  "signals": "sinyaller",
  "small": "küçük",
  "smell": "koku",
  "smoky": "dumanlı",
  "soil": "toprak",
  "sphere": "küre",
  "straight": "düz / doğru",
  "strong": "güçlü",
  "surrounded": "çevrili / çevrelenmiş",
  "surveys": "araştırmalar / anketler",
  "teaching": "öğretim",
  "telescope": "teleskop",
  "telescopes": "teleskoplar",
  "tenant": "kiracı",
  "thorax": "göğüs / göğüs kafesi",
  "three": "üç",
  "towns": "kasabalar / kentler",
  "understand": "anlamak",
  "used": "kullanılan / kullanılmış",
  "vegetable": "bitkisel / sebze",
  "vibrations": "titreşimler",
  "villages": "köyler",
  "vitamin": "vitamin",
  "walls": "surlar / duvarlar",
  "waves": "dalgalar",
  "whole": "bütün / tüm",
  "wild": "vahşi",
  "within": "içinde",
  "woods": "ormanlar"
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

# Generate JS representation of raw arrays
lesson1_js = format_array_to_js("unit12Lesson1SentencesRaw", lesson30_data)
lesson2_js = format_array_to_js("unit12Lesson2SentencesRaw", lesson31_data)
lesson3_js = format_array_to_js("unit12Lesson3SentencesRaw", lesson32_data)

raw_sentences_js = f"""{lesson1_js}
{lesson2_js}
{lesson3_js}
const unit12LessonSentences = {{
  1: unit12Lesson1SentencesRaw,
  2: unit12Lesson2SentencesRaw,
  3: unit12Lesson3SentencesRaw
}};"""

# Update data.js
with open("data.js", "r", encoding="utf-8") as f:
    data_content = f.read()

# Locate unit12LessonSentences start and end (in clean file)
start_marker = "const unit12LessonSentences = {"
end_marker = "};"
start_idx = data_content.find(start_marker)
end_idx = data_content.find(end_marker, start_idx)

if start_idx != -1 and end_idx != -1:
    end_idx += len(end_marker)
    # Replace the old clean unit12LessonSentences block with our new arrays
    new_data_content = data_content[:start_idx] + raw_sentences_js + data_content[end_idx:]
    print("Successfully replaced clean raw arrays in data.js memory.")
else:
    print("Error: Could not find clean raw arrays markers in data.js")
    exit(1)

# Now replace the exercises map inside unitSentencesMap for unit 12
old_map_section = """  12: {
    1: unit12LessonSentences[1],
    2: unit12LessonSentences[2],
    3: unit12LessonSentences[3]
  },"""

new_map_section = """  12: {
    1: { exercises: [
      buildCustom10QuestionExercises(unit12Lesson1SentencesRaw, 12, 30, 1, 0),
      buildCustom10QuestionExercises(unit12Lesson1SentencesRaw, 12, 30, 2, 10),
      buildCustom10QuestionExercises(unit12Lesson1SentencesRaw, 12, 30, 3, 20),
      buildCustom10QuestionExercises(unit12Lesson1SentencesRaw, 12, 30, 4, 25)
    ] },
    2: { exercises: [
      buildCustom10QuestionExercises(unit12Lesson2SentencesRaw, 12, 31, 1, 0),
      buildCustom10QuestionExercises(unit12Lesson2SentencesRaw, 12, 31, 2, 10),
      buildCustom10QuestionExercises(unit12Lesson2SentencesRaw, 12, 31, 3, 20),
      buildCustom10QuestionExercises(unit12Lesson2SentencesRaw, 12, 31, 4, 30),
      buildCustom10QuestionExercises(unit12Lesson2SentencesRaw, 12, 31, 5, 40),
      buildCustom10QuestionExercises(unit12Lesson2SentencesRaw, 12, 31, 6, 50),
      buildCustom10QuestionExercises(unit12Lesson2SentencesRaw, 12, 31, 7, 60),
      buildCustom10QuestionExercises(unit12Lesson2SentencesRaw, 12, 31, 8, 62)
    ] },
    3: { exercises: [
      buildCustom10QuestionExercises(unit12Lesson3SentencesRaw, 12, 32, 1, 0),
      buildCustom10QuestionExercises(unit12Lesson3SentencesRaw, 12, 32, 2, 10),
      buildCustom10QuestionExercises(unit12Lesson3SentencesRaw, 12, 32, 3, 20),
      buildCustom10QuestionExercises(unit12Lesson3SentencesRaw, 12, 32, 4, 30),
      buildCustom10QuestionExercises(unit12Lesson3SentencesRaw, 12, 32, 5, 32)
    ] }
  },"""

if old_map_section in new_data_content:
    new_data_content = new_data_content.replace(old_map_section, new_map_section)
    print("Successfully replaced exercise map in data.js memory.")
else:
    print("Warning: Exact match for old_map_section not found, using raw index...")
    alt_start = new_data_content.find("  12: {")
    if alt_start != -1:
        alt_end = new_data_content.find("  },", alt_start)
        if alt_end != -1:
            alt_end += len("  },")
            new_data_content = new_data_content[:alt_start] + new_map_section + new_data_content[alt_end:]
            print("Successfully replaced exercise map using indices.")
        else:
            print("Error: Could not find closing map bracket for unit 12 in data.js")
            exit(1)
    else:
        print("Error: Could not find '12: {' in data.js")
        exit(1)

# Save the updated data.js
with open("data.js", "w", encoding="utf-8") as f:
    f.write(new_data_content)
print("Saved data.js successfully.")

# Update app.js wordDictionary
with open("app.js", "r", encoding="utf-8") as f:
    app_content = f.read()

# Locate wordDictionary start
dict_start_marker = "const wordDictionary = {"
dict_idx = app_content.find(dict_start_marker)
if dict_idx != -1:
    insert_pos = dict_idx + len(dict_start_marker)
    # Prepare vocab JS lines
    vocab_lines = ["\n  // Unit 12 Participle vocabulary added dynamically"]
    for en_word, tr_word in sorted(vocab_updates.items()):
        # Escape quotes
        en_esc = en_word.replace('"', '\\"')
        tr_esc = tr_word.replace('"', '\\"')
        vocab_lines.append(f'  "{en_esc}": "{tr_esc}",')
    vocab_js = "\n".join(vocab_lines)
    
    new_app_content = app_content[:insert_pos] + vocab_js + app_content[insert_pos:]
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(new_app_content)
    print("Successfully added 198 vocabulary words and saved app.js.")
else:
    print("Error: Could not find wordDictionary in app.js")
    exit(1)

print("All database updates successfully applied!")
