# -*- coding: utf-8 -*-
import sys
from docx import Document

doc = Document("/Users/faruknafizfazlioglu/Desktop/amok düzenleme.docx")

# Mappings for clause translations to ensure natural Turkish and correct suffix alignment
tr_136 = {
    "when it dries": ("O kuruduğunda", "dry", "kurumak", "dries", ["dries", "dry", "dried", "drying"]),
    "when it disappears": ("O kaybolduğunda", "disappear", "kaybolmak", "disappears", ["disappears", "disappear", "disappeared", "disappearing"]),
    "when it expands": ("O genleştiğinde", "expand", "genleşmek", "expands", ["expands", "expand", "expanded", "expanding"]),
    "when it contracts": ("O büzüldüğünde", "contract", "büzülmek", "contracts", ["contracts", "contract", "contracted", "contracting"]),
    "when it dissolves": ("O çözündüğünde", "dissolve", "çözünmek", "dissolves", ["dissolves", "dissolve", "dissolved", "dissolving"]),
    "when it changes": ("O değiştiğinde", "change", "değişmek", "changes", ["changes", "change", "changed", "changing"]),
    "when it develops": ("O geliştiğinde", "develop", "gelişmek", "develops", ["develops", "develop", "developed", "developing"]),
    "when it increases": ("O arttığında", "increase", "artmak", "increases", ["increases", "increase", "increased", "increasing"]),
    "when it moves": ("O hareket ettiğinde", "move", "hareket etmek", "moves", ["moves", "move", "moved", "moving"]),
    "when it ceases": ("O durduğunda", "cease", "durmak", "ceases", ["ceases", "cease", "ceased", "ceasing"]),
    "when it forms": ("O oluştuğunda", "form", "oluşmak", "forms", ["forms", "form", "formed", "forming"]),
    "when it contains": ("O içerdiğinde", "contain", "içermek", "contains", ["contains", "contain", "contained", "containing"]),
    "when it varies": ("O çeşitlilik gösterdiğinde", "vary", "çeşitlilik göstermek", "varies", ["varies", "vary", "varied", "varying"]),
    "when it appears": ("O belirdiğinde", "appear", "belirmek", "appears", ["appears", "appear", "appeared", "appearing"]),
    "when it penetrates": ("O nüfuz ettiğinde", "penetrate", "nüfuz etmek", "penetrates", ["penetrates", "penetrate", "penetrated", "penetrating"]),
    "when it is hot": ("O sıcak olduğunda", "hot", "sıcak", "hot", ["hot", "heat", "hotter", "heating"]),
    "when it is cold": ("O soğuk olduğunda", "cold", "soğuk", "cold", ["cold", "cool", "colder", "cooling"]),
    "when it is ready": ("O hazır olduğunda", "ready", "hazır", "ready", ["ready", "readily", "readier", "readiness"]),
    "when it is full": ("O dolu olduğunda", "full", "dolu", "full", ["full", "fully", "fill", "filler"]),
    "when it is empty": ("O boş olduğunda", "empty", "boş", "empty", ["empty", "emptiness", "emptied", "emptying"]),
    "when it is dry": ("O kuru olduğunda", "dry", "kuru", "dry", ["dry", "wet", "drier", "drying"]),
    "when it is wet": ("O ıslak olduğunda", "wet", "ıslak", "wet", ["wet", "dry", "wetter", "wetting"]),
    "when it is hard": ("O sert olduğunda", "hard", "sert", "hard", ["hard", "soft", "harder", "hardened"]),
    "when it breathes": ("O nefes aldığında", "breathe", "nefes almak", "breathes", ["breathes", "breathe", "breathed", "breathing"])
}

tr_137 = {
    "when the trees died": ("ağaçlar öldüğünde", "die", "ölmek", "died", ["died", "die", "dies", "dying"]),
    "when the armies arrived": ("ordular vardığında", "arrive", "varmak", "arrived", ["arrived", "arrive", "arrives", "arriving"]),
    "when the accident took place": ("kaza meydana geldiğinde", "take place", "meydana gelmek", "took", ["took", "takes", "taken", "taking"]),
    "when the substance expanded": ("madde genleştiğinde", "expand", "genleşmek", "expanded", ["expanded", "expand", "expands", "expanding"]),
    "when the roots penetrated the rock": ("kökler kayaya nüfuz ettiğinde", "penetrate", "nüfuz etmek", "penetrated", ["penetrated", "penetrate", "penetrates", "penetrating"]),
    "when the bones developed": ("kemikler geliştiğinde", "develop", "gelişmek", "developed", ["developed", "develop", "develops", "developing"]),
    "when the profits increased": ("kârlar arttığında", "increase", "artmak", "increased", ["increased", "increase", "increases", "increasing"]),
    "when the process ceased": ("süreç durduğunda", "cease", "durmak", "ceased", ["ceased", "cease", "ceases", "ceasing"]),
    "when conditions improved": ("koşullar iyileştiğinde", "improve", "iyileşmek", "improved", ["improved", "improve", "improves", "improving"]),
    "when conditions changed": ("koşullar değiştiğinde", "change", "değişmek", "changed", ["changed", "change", "changes", "changing"]),
    "when the roots developed": ("kökler geliştiğinde", "develop", "gelişmek", "developed", ["developed", "develop", "develops", "developing"]),
    "when the disease spread": ("hastalık yayıldığında", "spread", "yayılmak", "spread", ["spread", "spreads", "spreading", "sprang"]),
    "when the moisture penetrated the rocks": ("nem kayalara nüfuz ettiğinde", "penetrate", "nüfuz etmek", "penetrated", ["penetrated", "penetrate", "penetrates", "penetrating"]),
    "when the patient died": ("hasta öldüğünde", "die", "ölmek", "died", ["died", "die", "dies", "dying"]),
    "when the substance dissolved": ("madde çözündüğünde", "dissolve", "çözünmek", "dissolved", ["dissolved", "dissolve", "dissolves", "dissolving"]),
    "when the metal cooled": ("metal soğuduğunda", "cool", "soğumak", "cooled", ["cooled", "cool", "cools", "cooling"]),
    "when the molecules moved faster": ("moleküller daha hızlı hareket ettiğinde", "move", "hareket etmek", "moved", ["moved", "move", "moves", "moving"]),
    "when the moisture evaporated": ("nem buharlaştığında", "evaporate", "buharlaşmak", "evaporated", ["evaporated", "evaporate", "evaporates", "evaporating"]),
    "when communities increased in size": ("topluluklar boyut olarak arttığında", "increase", "artmak", "increased", ["increased", "increase", "increases", "increasing"]),
    "when the leaves began to appear": ("yapraklar belirmeye başladığında", "begin", "başlamak", "began", ["began", "begin", "begins", "beginning"])
}

tr_138 = {
    "when it has evaporated": ("O buharlaştığında", "evaporate", "buharlaşmak", "has", ["has", "have", "had", "having"]),
    "when it had given": ("O verdiğinde", "give", "vermek", "had", ["had", "has", "have", "having"]),
    "when it has ceased": ("O durduğunda", "cease", "durmak", "has", ["has", "have", "had", "having"]),
    "when it has collected": ("O toplandığında", "collect", "toplanmak", "has", ["has", "have", "had", "having"]),
    "when it has dried": ("O kuruduğunda", "dry", "kurumak", "has", ["has", "have", "had", "having"]),
    "when it has died": ("O öldüğünde", "die", "ölmek", "has", ["has", "have", "had", "having"]),
    "when it has expanded": ("O genleştiğinde", "expand", "genleşmek", "has", ["has", "have", "had", "having"]),
    "when it has developed": ("O geliştiğinde", "develop", "gelişmek", "has", ["has", "have", "had", "having"]),
    "when it had formed": ("O oluştuğunda", "form", "oluşmak", "had", ["had", "has", "have", "having"]),
    "when it had disappeared": ("O kaybolduğunda", "disappear", "kaybolmak", "had", ["had", "has", "have", "having"]),
    "when it had spread": ("O yayıldığında", "spread", "yayılmak", "had", ["had", "has", "have", "having"]),
    "when it had destroyed": ("O yok ettiğinde", "destroy", "yok etmek", "had", ["had", "has", "have", "having"]),
    "when it had dissolved": ("O çözündüğünde", "dissolve", "çözünmek", "had", ["had", "has", "have", "having"]),
    "when it had penetrated": ("O nüfuz ettiğinde", "penetrate", "nüfuz etmek", "had", ["had", "has", "have", "having"]),
    "when it had improved": ("O iyileştiğinde", "improve", "iyileşmek", "had", ["had", "has", "have", "having"]),
    "when it has occurred": ("O meydana geldiğinde", "occur", "meydana gelmek", "has", ["has", "have", "had", "having"]),
    "when it has produced": ("O ürettiğinde", "produce", "üretmek", "has", ["has", "have", "had", "having"]),
    "when it has grown": ("O büyüdüğünde", "grow", "büyümek", "has", ["has", "have", "had", "having"]),
    "when it had taken place": ("O meydana geldiğinde", "take place", "meydana gelmek", "had", ["had", "has", "have", "having"]),
    "when it has melted": ("O eridiğinde", "melt", "erimek", "has", ["has", "have", "had", "having"])
}

tr_139 = {
    "when it is heated": ("O ısıtıldığında", "heat", "ısıtmak", "heated", ["heated", "heat", "heats", "heating"]),
    "when it was cooled": ("O soğutulduğunda", "cool", "soğutmak", "cooled", ["cooled", "cool", "cools", "cooling"]),
    "when it was dried": ("O kurutulduğunda", "dry", "kurutmak", "dried", ["dried", "dry", "dries", "drying"]),
    "when it is attacked": ("O saldırıya uğradığında", "attack", "saldırmak", "attacked", ["attacked", "attack", "attacks", "attacking"]),
    "when it was dissolved": ("O çözündüğünde", "dissolve", "çözünmek", "dissolved", ["dissolved", "dissolve", "dissolves", "dissolving"]),
    "when it was divided": ("O bölündüğünde", "divide", "bölmek", "divided", ["divided", "divide", "divides", "dividing"]),
    "when it is grown": ("O yetiştirildiğinde", "grow", "yetiştirmek", "grown", ["grown", "grow", "grows", "growing"]),
    "when it is completed": ("O tamamlandığında", "complete", "tamamlamak", "completed", ["completed", "complete", "completes", "completing"]),
    "when it is examined": ("O incelendiğinde", "examine", "incelemek", "examined", ["examined", "examine", "examines", "examining"]),
    "when it was weighed": ("O tartıldığında", "weigh", "tartmak", "weighed", ["weighed", "weigh", "weighs", "weighing"]),
    "when it is measured": ("O ölçüldüğünde", "measure", "ölçmek", "measured", ["measured", "measure", "measures", "measuring"]),
    "when it is observed": ("O gözlemlendiğinde", "observe", "gözlemlemek", "observed", ["observed", "observe", "observes", "observing"]),
    "when it is increased": ("O artırıldığında", "increase", "artırmak", "increased", ["increased", "increase", "increases", "increasing"]),
    "when it is refined": ("O arıtıldığında", "refine", "arıtmak", "refined", ["refined", "refine", "refines", "refining"]),
    "when it is prepared": ("O hazırlandığında", "prepare", "hazırlamak", "prepared", ["prepared", "prepare", "prepares", "preparing"]),
    "when it is obtained": ("O elde edildiğinde", "obtain", "elde etmek", "obtained", ["obtained", "obtain", "obtains", "obtaining"]),
    "when it was removed": ("O uzaklaştırıldığında", "remove", "uzaklaştırmak", "removed", ["removed", "remove", "removes", "removing"]),
    "when it is decided": ("O kararlaştırıldığında", "decide", "kararlaştırmak", "decided", ["decided", "decide", "decides", "deciding"])
}

tr_140 = {
    "when it has been proved": ("O kanıtlandığında", "prove", "kanıtlamak", "proved", ["proved", "prove", "proves", "proving"]),
    "when it has been improved": ("O iyileştirildiğinde", "improve", "iyileştirmek", "improved", ["improved", "improve", "improves", "improving"]),
    "when it has been prevented": ("O önlendiğinde", "prevent", "önlemek", "prevented", ["prevented", "prevent", "prevents", "preventing"]),
    "when it had been obtained": ("O elde edildiğinde", "obtain", "elde etmek", "obtained", ["obtained", "obtain", "obtains", "obtaining"]),
    "when it has been examined": ("O incelendiğinde", "examine", "incelemek", "examined", ["examined", "examine", "examines", "examining"]),
    "when it had been removed": ("O uzaklaştırıldığında", "remove", "uzaklaştırmak", "removed", ["removed", "remove", "removes", "removing"]),
    "when it has been observed": ("O gözlemlendiğinde", "observe", "gözlemlemek", "observed", ["observed", "observe", "observes", "observing"]),
    "when it had been heated": ("O ısıtıldığında", "heat", "ısıtmak", "heated", ["heated", "heat", "heats", "heating"]),
    "when it had been cleaned": ("O temizlendiğinde", "clean", "temizlemek", "cleaned", ["cleaned", "clean", "cleans", "cleaning"]),
    "when it had been purified": ("O saflaştırıldığında", "purify", "saflaştırmak", "purified", ["purified", "purify", "purifies", "purifying"]),
    "when the news had been published": ("haberler yayınlandığında", "publish", "yayınlamak", "published", ["published", "publish", "publishes", "publishing"]),
    "when the goods had been manufactured": ("mallar üretildiğinde", "manufacture", "üretmek", "manufactured", ["manufactured", "manufacture", "manufactures", "manufacturing"]),
    "when the new methods have been introduced": ("yeni yöntemler sunulduğunda", "introduce", "tanıtmak", "introduced", ["introduced", "introduce", "introduces", "introducing"]),
    "when the air had been purified": ("hava saflaştırıldığında", "purify", "saflaştırmak", "purified", ["purified", "purify", "purifies", "purifying"]),
    "when the experiments have been repeated": ("deneyler tekrarlandığında", "repeat", "tekrarlamak", "repeated", ["repeated", "repeat", "repeats", "repeating"]),
    "when the money had been provided": ("para sağlandığında", "provide", "sağlamak", "provided", ["provided", "provide", "provides", "providing"]),
    "when the lakes have been drained": ("göller kurutulduğunda", "drain", "kurutmak", "drained", ["drained", "drain", "drains", "draining"]),
    "when the mountains had been formed": ("dağlar oluştuğunda", "form", "oluşmak", "formed", ["formed", "form", "forms", "forming"]),
    "when the prices have been raised": ("fiyatlar artırıldığında", "raise", "artırmak", "raised", ["raised", "raise", "raises", "raising"]),
    "when the coal had been removed": ("kömür çıkarıldığında", "remove", "çıkarmak", "removed", ["removed", "remove", "removes", "removing"])
}

tr_141 = {
    "when the wires are connected to the anodes": ("teller anotlara bağlandığında", "connect", "bağlamak", "connected", ["connected", "connect", "connects", "connecting"]),
    "when the president is chosen": ("başkan seçildiğinde", "choose", "seçmek", "chosen", ["chosen", "choose", "chooses", "choosing"]),
    "when the decision has been taken": ("karar alındığında", "take", "almak", "taken", ["taken", "take", "takes", "taking"]),
    "when the children are educated": ("çocuklar eğitildiğinde", "educate", "eğitmek", "educated", ["educated", "educate", "educates", "educating"]),
    "when prices decreased": ("fiyatlar düştüğünde", "decrease", "düşmek", "decreased", ["decreased", "decrease", "decreases", "decreasing"]),
    "when the microbes are seen under a microscope": ("mikroplar mikroskop altında görüldüğünde", "see", "görmek", "seen", ["seen", "see", "sees", "seeing"]),
    "when methods vary": ("yöntemler çeşitlilik gösterdiğinde", "vary", "çeşitlilik göstermek", "vary", ["vary", "varies", "varied", "varying"]),
    "when combustion takes place": ("yanma meydana geldiğinde", "take place", "meydana gelmek", "takes", ["takes", "take", "took", "taking"]),
    "when the tank is empty": ("tank boş olduğunda", "empty", "boş", "empty", ["empty", "full", "emptiness", "emptied"]),
    "when the metal was hot": ("metal sıcak olduğunda", "hot", "sıcak", "hot", ["hot", "cold", "heat", "heating"]),
    "when the roots develop": ("kökler geliştiğinde", "develop", "gelişmek", "develop", ["develop", "develops", "developed", "developing"]),
    "when the work was begun": ("işe başlandığında", "begin", "başlamak", "begun", ["begun", "begin", "begins", "beginning"]),
    "when the components were separated": ("bileşenler ayrıldığında", "separate", "ayırmak", "separated", ["separated", "separate", "separates", "separating"]),
    "when the new material was used": ("yeni malzeme kullanıldığında", "use", "kullanmak", "used", ["used", "use", "uses", "using"]),
    "when the chest cavity becomes larger": ("göğüs boşluğu genişlediğinde", "become", "olmak", "becomes", ["becomes", "become", "became", "becoming"]),
    "when prices rise": ("fiyatlar yükseldiğinde", "rise", "yükselmek", "rise", ["rise", "rises", "rose", "rising"])
}

tr_142 = {
    "When the heat of the sun melts the snow, the water penetrates into the cracks in the rocks.": "Güneşin ısısı karları erittiğinde, su kayaların içindeki çatlaklara nüfuz eder.",
    "When darkness falls, the process of photosynthesis ceases.": "Karanlık çöktüğünde, fotosentez süreci durur.",
    "When light falls upon certain chemical compounds of silver, they turn darker in colour.": "Gümüşün bazı kimyasal bileşikleri üzerine ışık düştüğünde, renkleri koyulaşır.",
    "When we breathe in, the chest cavity becomes bigger.": "Nefes aldığımızda, göğüs boşluğu genişler.",
    "When we breathe out, the chest cavity becomes smaller.": "Nefes verdiğimizde, göğüs boşluğu daralır.",
    "When the embryo of a seed begins to grow, it feeds on the nutrients in the seed.": "Bir tohumun embriyosu büyümeye başladığında, tohumdaki besinlerle beslenir.",
    "When water freezes, it increases its volume by about ten percent.": "Su donduğunda, hacmi yaklaşık yüzde on artar.",
    "When the temperature falls at night, the water in the cracks of the rocks freezes.": "Geceleri sıcaklık düştüğünde, kayaların çatlaklarındaki su donar."
}

tr_143 = {
    "When the committee has collected all the available information, it will submit a report.": "Komite mevcut tüm bilgileri topladığında, bir rapor sunacaktır.",
    "When the roots have developed, the plant can absorb more water and nutrients.": "Kökler geliştiğinde, bitki daha fazla su ve besin emebilir.",
    "When the market has grown, more goods can be imported.": "Piyasa büyüdüğünde, daha fazla mal ithal edilebilir.",
    "When the tissues have become diseased, they must be removed as soon as possible.": "Dokular hastalandığında, en kısa sürede uzaklaştırılmalıdır.",
    "When heavy rains have fallen, the rivers often break their banks.": "Şiddetli yağmurlar yağdığında, nehirler genellikle yataklarından taşar.",
    "When the snow in the mountains has melted, the water level in the rivers rises.": "Dağlardaki karlar eridiğinde, nehirlerdeki su seviyesi yükselir.",
    "When the committee have discussed the matter, a vote will be taken.": "Komite konuyu tartıştıktan sonra, oylama yapılacaktır.",
    "When the substance has been dried, it is weighed.": "Madde kurutulduğunda, tartılır."
}

tr_144 = {
    "When it is cooled metal contracts.": "Soğutulduğunda metal büzülür.",
    "When the new government is established the reforms will be introduced.": "Yeni hükümet kurulduğunda reformlar tanıtılacaktır.",
    "When water is mixed with carbon dioxide it turns it into soluble bicarbonate.": "Su karbondioksit ile karıştırıldığında onu çözünür bikarbonata dönüştürür.",
    "When sugar is consumed to provide muscle with energy it is decomposed and combined with oxygen.": "Şeker kaslara enerji sağlamak için tüketildiğinde ayrışır ve oksijenle birleşir.",
    "When metal is heated it expands.": "Metal ısıtıldığında genleşir.",
    "When the substance is dissolved in water a solution is formed.": "Madde suda çözündüğünde bir çözelti oluşur.",
    "When the logs are cut the timber is transported to the mill.": "Tomruklar kesildiğinde kereste fabrikaya taşınır.",
    "When the bacteria are examined under the microscope they can be identified.": "Bakteriler mikroskop altında incelendiğinde teşhis edilebilir."
}

# Now write a generator that constructs the Raw arrays inside data.js
# We can print these arrays and write them directly.

def make_blank(en, correct):
    # E.g. "when it dries" -> "when it ___"
    import re
    # Case-insensitive replacement
    pattern = re.compile(re.escape(correct), re.IGNORECASE)
    return pattern.sub("___", en)

def generate_js_array(name, mapping):
    print(f"const {name} = [")
    for en, info in mapping.items():
        if len(info) == 5:
            # Clause
            tr, word, trWord, correct, options = info
            blank = make_blank(en, correct)
            # Find index of correct in options
            print(f"  {{ en: \"{en}\", tr: \"{tr}\", word: \"{word}\", trWord: \"{trWord}\", correct: \"{correct}\", blank: \"{blank}\", options: {options} }},")
        else:
            # Full sentence
            tr = info
            # Make blocks
            blocks = [w.strip() for w in en.split() if w.strip()]
            # Find a word to blank
            # For simplicity, blank the verb after when or similar
            # Let's just find a reasonable word
            word = "when"
            correct = "When"
            blank = en.replace("When", "___")
            if "freezes" in en:
                word = "freeze"
                correct = "freezes"
                blank = en.replace("freezes", "___")
            elif "melts" in en:
                word = "melt"
                correct = "melts"
                blank = en.replace("melts", "___")
            elif "ceases" in en:
                word = "cease"
                correct = "ceases"
                blank = en.replace("ceases", "___")
            elif "developed" in en:
                word = "develop"
                correct = "developed"
                blank = en.replace("developed", "___")
            elif "grown" in en:
                word = "grow"
                correct = "grown"
                blank = en.replace("grown", "___")
            elif "cooled" in en:
                word = "cool"
                correct = "cooled"
                blank = en.replace("cooled", "___")
            elif "heated" in en:
                word = "heat"
                correct = "heated"
                blank = en.replace("heated", "___")
            elif "dissolved" in en:
                word = "dissolve"
                correct = "dissolved"
                blank = en.replace("dissolved", "___")
            print(f"  {{ en: \"{en}\", tr: \"{tr}\", word: \"{word}\", trWord: \"{correct}\", correct: \"{correct}\", blank: \"{blank}\", options: [\"{correct}\", \"is\", \"was\", \"will\"], blocks: {blocks} }},")
    print("];\n")

print("// --- AUTOMATICALLY COMPILED ARRAYS ---")
generate_js_array("unit19Lesson3SentencesRaw", tr_136)
generate_js_array("unit19Lesson3SentencesL2Raw", tr_137)
generate_js_array("unit19Lesson3SentencesL3Raw", tr_138)
generate_js_array("unit19Lesson3SentencesL4Raw", tr_139)
generate_js_array("unit19Lesson3SentencesL5Raw", tr_140)
generate_js_array("unit19Lesson3SentencesL6Raw", tr_141)
generate_js_array("unit19Lesson3SentencesL7Raw", tr_142)
generate_js_array("unit19Lesson3SentencesL8Raw", tr_143)
generate_js_array("unit19Lesson3SentencesL9Raw", tr_144)
