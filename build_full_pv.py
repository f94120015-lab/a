import json
import re

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

chunk_size = 15
chunks = [pv_items[i:i + chunk_size] for i in range(0, len(pv_items), chunk_size)]

# Sentences dictionary for high quality academic context sentences for each PV
# We will construct contextual sentences and distractors for all 148 Phrasal Verbs!

academic_sentences = {
    "keep on": ("The research team will _______ analyzing the telemetry data despite the initial system error.", "devam etmek", "continue / proceed"),
    "account for": ("High-tech equipment exports _______ nearly 40% of the company's total annual revenue.", "oluşturmak / açıklamak", "explain / constitute"),
    "get rid of": ("Industrial nations must _______ toxic chemical waste without polluting local ecosystems.", "kurtulmak / başından atmak", "eliminate / dispose of"),
    "cut down (on)": ("Health organizations advise individuals to _______ their daily consumption of processed sugars.", "kısmak / azaltmak", "reduce / decrease"),
    "keep up with": ("Legacy corporations struggle to _______ the rapid pace of digital innovation.", "hızına yetişmek", "pace with / maintain speed"),
    "look up to": ("Young scholars deeply _______ the senior professor for her pioneering work in genetics.", "saygı / hayranlık duymak", "admire / respect"),
    "look down (on)": ("It is unethical for academic supervisors to _______ junior researchers or dismiss their ideas.", "küçümsemek / tepeden bakmak", "despise / scorn"),
    "set up": ("The government decided to _______ a new regulatory body to monitor environmental compliance.", "kurmak / düzenlemek", "establish / institute"),
    "make up": ("Women _______ more than half of the total workforce in modern healthcare institutions.", "oluşturmak / uydurmak", "constitute / compose"),
    "make up for": ("The company offered cash bonuses to _______ the delays caused by logistics errors.", "telafi etmek", "compensate for"),
    "take up": ("Advanced data processing tasks _______ a significant portion of the supercomputer's memory.", "yer/zaman kaplamak", "occupy / absorb"),
    "hold up": ("Unexpected customs inspections managed to _______ the shipment of critical medical supplies.", "geciktirmek / yavaşlatmak", "delay / obstruct"),
    "bring up": ("The delegate decided to _______ the issue of carbon emissions during the climate summit.", "gündeme getirmek", "mention / introduce"),
    "turn into": ("Over time, minor regional trade friction can _______ a major international crisis.", "dönüşmek", "transform into"),
    "break off": ("The ambassador was instructed to _______ diplomatic negotiations after the border incident.", "kesmek / sonlandırmak", "terminate / sever"),
    
    "put off": ("Due to severe weather warnings, the launching ceremony was _______ until next month.", "ertelemek", "postpone / delay"),
    "call off": ("The university decided to _______ the outdoor graduation ceremony because of heavy rain.", "iptal etmek", "cancel"),
    "give up": ("Scientists should never _______ their pursuit of truth despite unexpected experimental failures.", "vazgeçmek", "abandon / surrender"),
    "look into": ("A special task force was created to _______ allegations of financial fraud in the firm.", "incelemek / araştırmak", "investigate / examine"),
    "settle down": ("After decades of field work in South America, the anthropologist decided to _______ in London.", "yerleşmek / durulmak", "establish residence"),
    "get through": ("It was difficult for the emergency crew to _______ the blocked mountain pass.", "başarıyla geçmek / ulaşmak", "overcome / reach"),
    "pull through": ("Thanks to intensive medical care, the patient managed to _______ after the surgery.", "iyileşmek / atlatmak", "recover / survive"),
    "take after / call for": ("The current crisis in public health _______ immediate structural intervention.", "çağrıda bulunmak / gerektirmek", "require / demand"),
    "back up (with)": ("Researchers must _______ their theoretical claims with empirical laboratory data.", "desteklemek", "support / corroborate"),
    "run up": ("Uncontrolled government spending can quickly _______ massive national debt.", "artmak / fırlamak", "accumulate / escalate"),
    "cope with": ("Local municipalities struggle to _______ the influx of refugees fleeing the warzone.", "başa çıkmak", "manage / tackle"),
    "deal with": ("Sociology is a comprehensive discipline that attempts to _______ human social dynamics.", "ele almak / ilgilenmek", "address / handle"),
    "take off": ("The new tech startup saw its quarterly revenue _______ dramatically after the product launch.", "fırlamak / havalanmak", "soar / prosper"),
    "put on": ("The theater group decided to _______ a new adaptation of Shakespeare's classic play.", "sahnelemek / giymek", "stage / perform"),
    "come into": ("Upon turning twenty-five, the heir will _______ a substantial family inheritance.", "mirasa konmak", "inherit"),

    "clear out": ("Volunteers worked tirelessly to _______ the debris from the flooded residential area.", "boşaltmak / temizlemek", "empty / evacuate"),
    "step down": ("Following the audit scandal, the chief executive was pressured to _______ from his post.", "istifa etmek", "resign / retire"),
    "break out": ("Fears grew that violent conflict might _______ across the disputed frontier.", "patlak vermek", "start abruptly"),
    "fall off": ("Global market demand for fossil fuels is expected to _______ as renewables expand.", "düşmek / azalmak", "decline / decrease"),
    "come along": ("The construction of the new research facility is starting to _______ nicely.", "gelişmek / ilerlemek", "progress / advance"),
    "turn on": ("Automated sensors will instantly _______ the ventilation system if gas levels rise.", "açmak", "activate / switch on"),
    "set off": ("The accidental detonation of the explosive device managed to _______ a chain reaction.", "tetiklemek / yola çıkmak", "trigger / initiate"),
    "take on": ("The laboratory is willing to _______ additional research projects if funding is secured.", "üstlenmek", "undertake / assume"),
    "come across": ("Archaeologists happened to _______ ancient stone inscriptions during their survey.", "rastlamak", "encounter / discover"),
    "rule out": ("The medical panel stated that they cannot _______ the possibility of viral mutation.", "elemek / göz ardı etmek", "exclude / dismiss"),
    "wipe out": ("The catastrophic meteor impact managed to _______ entire prehistoric ecosystems.", "yok etmek", "eradicate / destroy"),
    "take over": ("The multinational corporation moved swiftly to _______ its smaller domestic rival.", "devralmak", "acquire / assume control"),
    "keep out": ("Warning signs were erected around the facility to _______ unauthorized personnel.", "dışarıda tutmak", "exclude / bar"),
    "put up with": ("Factory workers could no longer _______ the hazardous working conditions.", "katlanmak / tahammül etmek", "tolerate / endure"),
    "give rise to": ("Rapid urbanization without infrastructure planning can _______ severe social problems.", "sebep olmak / yol açmak", "cause / produce"),

    "figure out": ("Computer engineers spent days attempting to _______ the glitch in the operating system.", "anlamak / çözmek", "solve / comprehend"),
    "find out": ("Historical investigations helped researchers _______ the true cause of the castle's collapse.", "keşfetmek / öğrenmek", "discover / learn"),
    "take place": ("The international bilateral talks will _______ in Geneva next October.", "meydana gelmek / olmak", "occur / happen"),
    "make over": ("The legal document transferred ownership, effectively deciding to _______ the property to the trust.", "devretmek", "transfer / assign"),
    "put out": ("Firefighters worked through the night to _______ the blazing wildfire in the national park.", "söndürmek", "extinguish"),
    "bring into": ("The new legislative reform seeks to _______ tighter regulations for carbon trading.", "getirmek / dahil etmek", "introduce / import"),
    "give in": ("Despite intense economic sanctions, the rogue regime refused to _______ to international demands.", "teslim olmak / pes etmek", "surrender / yield"),
    "keep up": ("The athlete trained vigorously to _______ her peak physical condition throughout the season.", "sürdürmek / devam etmek", "maintain / sustain"),
    "build up": ("Continuous marketing campaigns helped the brand _______ a loyal customer base.", "güçlendirmek / biriktirmek", "accumulate / strengthen"),
    "keep off": ("Visitors are strictly ordered to _______ the preserved archaeological ruins.", "uzak durmak", "avoid / stay away"),
    "make out": ("Through the dense sea fog, the lookout could barely _______ the silhouette of the lighthouse.", "seçmek / anlamak", "discern / perceive"),
    "set out": ("The expedition team planned to _______ early in the morning toward the arctic pole.", "yola çıkmak", "depart / embark"),
    "look up": ("Students are encouraged to _______ unfamiliar vocabulary in an online academic dictionary.", "aramak / bakmak", "search / consult"),
    "run over": ("The speeding vehicle managed to _______ the safety barriers near the pedestrian zone.", "ezmek / taşmak", "hit / overflow"),
    "turn out": ("The preliminary scientific hypothesis _______ to be surprisingly accurate after verification.", "sonuçlanmak / olduğu ortaya çıkmak", "prove to be"),

    "get up": ("Medical guidelines suggest patients should _______ and walk periodically during long flights.", "kalkmak", "arise / stand"),
    "turn up": ("Several unexpected guests began to _______ at the academic reception late in the evening.", "çıkagelmek / gelmek", "arrive / appear"),
    "break through": ("The clinical trial managed to _______ existing therapeutic limits in oncology.", "engeli aşmak / atılım yapmak", "penetrate / overcome"),
    "get along with": ("It is essential for cross-functional team members to _______ one another harmoniously.", "iyi geçinmek", "harmonize with"),
    "end up": ("If financial mismanagement continues, the municipality will _______ bankrupt.", "sonuçlanmak / son bulmak", "wind up / culminate"),
    "get over": ("It took the patient several months to _______ the psychological shock of the accident.", "atlatmak / iyileşmek", "recover from"),
    "use up": ("Heavy industrial processing will quickly _______ local water supplies during a drought.", "tüketmek", "consume / exhaust"),
    "give off": ("Decaying organic matter in landfills can _______ harmful methane gas into the air.", "salmak / yaymak", "emit / release"),
    "try on": ("Customers are invited to _______ the new smart VR headset at the technology fair.", "denemek", "test / sample"),
    "count on": ("Project managers know they can _______ senior engineers for reliable structural calculations.", "güvenmek", "rely on / trust"),
    "fall through": ("The proposed business merger began to _______ due to antitrust regulatory hurdles.", "suya düşmek", "fail / collapse"),
    "look after": ("Nurses in the pediatric unit work diligently to _______ newborn infants.", "bakmak / ilgilenmek", "care for / attend to"),
    "go through": ("All scientific manuscripts must _______ rigorous peer review prior to publication.", "geçmek / yaşamak", "undergo / experience"),
    "turn down": ("The university committee had no choice but to _______ the funding application due to budget limits.", "reddetmek", "reject / decline"),
    "do away with": ("The government enacted laws to _______ outdated administrative bureaucracy.", "yürürlükten kaldırmak", "abolish / eliminate"),

    "get away with": ("Fraudulent operators should not be allowed to _______ evading corporate income taxes.", "yanına kâr kalmak", "escape punishment"),
    "come up with": ("The R&D division managed to _______ a novel solar energy storage mechanism.", "bulmak / üretmek", "devise / invent"),
    "rely on": ("Space exploration missions heavily _______ satellite telemetry for navigation.", "güvenmek / bel bağlamak", "depend on"),
    "put down": ("The regime used military force to _______ the popular uprising in the capital.", "bastırmak / yere koymak", "suppress / quell"),
    "put forward": ("The research fellow was eager to _______ a new hypothesis regarding dark matter.", "ileri sürmek", "propose / advance"),
    "look through": ("The legal team spent hours trying to _______ centuries of land ownership deeds.", "incelemek / göz atmak", "examine / scan"),
    "make for": ("High investments in human capital will _______ long-term economic prosperity.", "sağlamak / yol açmak", "conduce to / promote"),
    "care for": ("Specialized sanctuaries exist to _______ endangered wildlife species.", "bakımını üstlenmek", "look after / tend"),
    "bring about": ("The invention of the printing press helped _______ a cultural revolution across Europe.", "sebep olmak", "cause / generate"),
    "cut out": ("Engineers decided to _______ redundant electronic components to reduce weight.", "çıkarıp kesmek / bırakmak", "remove / eliminate"),
    "turn off": ("Operators must remember to _______ the high-voltage generator before maintenance.", "kapatmak", "deactivate / switch off"),
    "run through": ("Let us quickly _______ the safety instructions before launching the experiment.", "göz atmak / tekrarlamak", "review / rehearse"),
    "send for": ("The medical clinic decided to _______ a specialist from the university hospital.", "çağırmak / getirtmek", "summon / fetch"),
    "do without": ("Developing nations cannot _______ financial aid during severe humanitarian emergencies.", "olmadan idare etmek", "dispense with"),
    "show off": ("The manufacturer erected a giant display to _______ its latest luxury electric vehicle.", "gösteriş yapmak / sergilemek", "exhibit / display"),

    "think over": ("The committee requested additional time to _______ the strategic acquisition proposal.", "düşünmek", "consider / ponder"),
    "change over": ("The plant decided to _______ from coal to natural gas power generation.", "dönüşmek / değiştirmek", "switch / convert"),
    "take care of": ("Social security systems are designed to _______ vulnerable elderly populations.", "ilgilenmek / korumak", "look after / protect"),
    "run out (of)": ("Submarines cannot afford to _______ oxygen supplies while submerged.", "tükenmek / bitmek", "exhaust / deplete"),
    "close down": ("Economic recession forced several small retail businesses to _______ permanently.", "kapatmak / kepenk indirmek", "shut down / cease"),
    "sort out": ("Auditors were appointed to _______ the confusing tax records of the company.", "çözmek / tasnif etmek", "resolve / organize"),
    "force out": ("Political scandals managed to _______ the corrupt minister from public office.", "zorlamak / çıkarmak", "oust / expel"),
    "do with": ("Philosophers argue that ethics has everything to _______ human societal progress.", "alakalı olmak", "relate to / pertain to"),
    "turn over": ("The court ordered the defendant to _______ all confidential financial documents.", "devretmek / teslim etmek", "surrender / yield"),
    "leave out": ("When writing an abstract, researchers must not _______ essential methodology details.", "dışarıda bırakmak", "omit / exclude"),
    "cut off": ("Heavy blizzards managed to _______ remote alpine villages from the main power grid.", "kesmek / durdurmak", "disconnect / sever"),
    "point out": ("Statistical analysts were quick to _______ significant anomalies in the survey data.", "işaret etmek / vurgulamak", "indicate / highlight"),
    "get in": ("Passengers queued at the platform, waiting to _______ the express train to Paris.", "binmek / ulaşmak", "board / enter"),
    "put over": ("The maritime vessel decided to _______ near the harbor due to storm warnings.", "demir atmak / konaklamak", "anchor / berth"),
    "work out": ("Mathematicians spent months trying to _______ a formula for predicting market volatility.", "çözüm üretmek / hesaplamak", "calculate / solve"),

    "try out": ("The pharmaceutical lab is preparing to _______ the experimental therapy on human subjects.", "denemek", "test / experiment"),
    "get on": ("Commuters rushed to _______ the morning subway before the doors closed.", "binmek / iyi geçinmek", "board / progress"),
    "take back": ("The politician was forced to _______ his controversial statements after public outcry.", "geri almak", "retract / withdraw"),
    "pull through": ("Despite critical complications, the surgeon assured that the patient would _______.", "iyileşmek", "survive / recover"),
    "wait for": ("Astronomers had to _______ hours to capture the rare solar eclipse image.", "beklemek", "await / anticipate"),
    "put through": ("The operator agreed to _______ the urgent call to the embassy official.", "telefonla bağlamak / geçirmek", "connect / transfer"),
    "take to": ("The young student began to _______ advanced calculus with surprising ease.", "ısınmak / alışmak", "adapt to / like"),
    "bring down": ("Central banks raised interest rates to help _______ soaring domestic inflation.", "indirmek / düşürmek", "reduce / lower"),
    "look over": ("The editor promised to _______ the final chapter before sending it to press.", "göz gezdirmek", "inspect / review"),
    "look out (for)": ("Field researchers must _______ venomous snakes when exploring rainforests.", "dikkat etmek", "beware of / watch for"),
    "make do (with)": ("During the supply shortage, hospitals had to _______ limited surgical gloves.", "idare etmek", "manage with / cope"),
    "get off": ("Passengers were asked to _______ the bus at the terminus station.", "inmek", "disembark / exit"),
    "take down": ("Students hurried to _______ every detail of the professor's lecture.", "not almak / indirmek", "record / write down"),
    "give back": ("The museum agreed to _______ ancient artifacts to their country of origin.", "geri vermek", "return / restore"),
    "play down": ("Spokespersons attempted to _______ the environmental damage caused by the oil spill.", "önemsememek / hafife almak", "minimize / understate"),

    "pull up": ("The police cruiser decided to _______ alongside the suspicious vehicle.", "durmak / yanaşmak", "halt / stop"),
    "depend on/upon": ("The accuracy of weather forecasts will always _______ satellite data precision.", "bağlı olmak", "rely on"),
    "follow up": ("Health officials promised to _______ every reported case of food contamination.", "takip etmek / ardını bırakmamak", "investigate further"),
    "put up": ("Developers received approval to _______ a new solar energy facility near the town.", "inşa etmek / yükseltmek", "construct / erect"),
    "hold out": ("Besieged defenders managed to _______ against enemy forces for over six months.", "direnmek / kalmak", "resist / endure"),
    "show up": ("Despite bad weather, over five hundred delegates managed to _______ for the conference.", "ortaya çıkmak / gelmek", "appear / arrive"),
    "come up": ("Several unexpected questions are bound to _______ during the Q&A session.", "ele alınmak / çıkmak", "arise / emerge"),
    "fight off": ("The body's immune system works tirelessly to _______ viral infections.", "defetmek / mücadele etmek", "repel / combat"),
    "keep away": ("Parents should _______ toxic household chemicals from young children.", "uzak tutmak", "distance / withhold"),
    "get out": ("Passengers were ordered to _______ of the damaged train immediately.", "çıkmak / inmek", "evacuate / exit"),
    "hold on": ("The caller was requested to _______ while the secretary retrieved the files.", "beklemek", "wait / hang on"),
    "bring in": ("The new fiscal legislation will _______ millions of dollars in extra revenue.", "kazandırmak / getirmek", "generate / introduce"),
    "get away": ("The suspects managed to _______ in a stolen vehicle before police arrived.", "kaçmak", "escape / flee"),
    "put away": ("Laboratory technicians must _______ all hazardous reagents after experiments.", "yerine koymak / kaldırmak", "store / tidy up"),
    "draw up": ("Legal counsel was instructed to _______ a comprehensive employment contract.", "hazırlamak", "draft / formulate"),

    "come back": ("After decades of exile, the poet was finally allowed to _______ to his homeland.", "geri dönmek", "return"),
    "run down": ("Unscrupulous critics tried to _______ the novel despite its bestseller status.", "eleştirmek / fırlamak", "criticize / disparage"),
    "open up": ("The international trade treaty will _______ vast new export opportunities.", "başlatmak / açmak", "unlock / create"),
    "catch up": ("After missing two weeks of class, she worked hard to _______ with her peers.", "yetişmek", "rejoin / overtake"),
    "slow down": ("Drivers should _______ when approaching hazardous road construction zones.", "yavaşlamak", "decelerate"),
    "die out": ("Without protection, ancient indigenous dialects will gradually _______.", "yok olmak", "become extinct"),
    "fill out": ("Job applicants are required to _______ the online questionnaire completely.", "form doldurmak", "complete / execute"),
    "turn back": ("Fierce blizzards forced the mountaineers to _______ before reaching the summit.", "geri dönmek", "retreat / reverse"),
    "get around": ("News of the breakthrough scientific discovery quickly began to _______.", "yayılmak / gezmek", "circulate / spread"),
    "look for": ("Astronomers continue to _______ habitable exoplanets in distant galaxies.", "aramak", "seek / search for"),
    "carry out": ("Researchers plan to _______ controlled clinical trials to test the drug's safety.", "gerçekleştirmek", "conduct / execute"),
    "be fed up with": ("Citizens have grown _______ false political promises and rising taxes.", "bıkmak / usanmak", "be weary of / sick of"),
    "carry on": ("The team is determined to _______ their conservation work despite financial limits.", "devam etmek", "continue / persevere")
}

print(f"Mapped {len(academic_sentences)} academic sentences out of {len(pv_items)} items!")

