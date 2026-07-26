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

# Humanities-focused academic context sentences for ALL 148 Phrasal Verbs
# Fields covered: Sosyoloji, Tarih, Felsefe, Edebiyat, Dilbilim, Sanat Tarihi, Siyaset Bilimi, Arkeoloji, Psikoloji
humanities_sentences = {
    "keep on": ("Social historians note that rural communities managed to _______ practicing traditional rituals despite urban modernization.", "devam etmek", "continue"),
    "account for": ("Cultural factors such as shared belief systems often _______ major shifts in historical voting behavior.", "açıklamak / oluşturmak", "explain / constitute"),
    "get rid of": ("Enlightenment philosophers sought to _______ dogmatic superstitions through rational inquiry.", "kurtulmak / başından atmak", "eliminate"),
    "cut down (on)": ("Literary critics advise young authors to _______ excessive adjectives to strengthen narrative momentum.", "kısmak / azaltmak", "reduce"),
    "keep up with": ("Contemporary sociologists struggle to _______ the rapid evolution of digital subcultures.", "hızına yetişmek", "pace with"),
    "look up to": ("Renaissance artists used to _______ classical Greco-Roman sculptors for aesthetic inspiration.", "saygı / hayranlık duymak", "admire"),
    "look down (on)": ("Aristocratic elites in the 19th century tended to _______ the emerging working-class literature.", "hor görmek / küçümsemek", "despise"),
    "set up": ("The historical society agreed to _______ an archival database dedicated to oral folklore.", "kurmak / düzenlemek", "establish"),
    "make up": ("Mythological narratives _______ a central pillar of early Mesopotamian religious life.", "oluşturmak", "constitute"),
    "make up for": ("Post-war governments attempted to _______ past cultural destruction by funding heritage restoration.", "telafi etmek", "compensate for"),
    "take up": ("Philosophical debates regarding free will _______ a significant portion of early modern treatises.", "yer/zaman kaplamak", "occupy"),
    "hold up": ("Censorship laws during the autocratic regime managed to _______ the publication of avant-garde poetry.", "geciktirmek / engel olmak", "delay / impede"),
    "bring up": ("In his seminal lecture, the historian decided to _______ the neglected role of women in the revolution.", "gündeme getirmek", "introduce / mention"),
    "turn into": ("Over centuries, oral folk tales can _______ standardized national epics.", "dönüşmek", "transform into"),
    "break off": ("The two rival intellectual schools decided to _______ dialogue after fundamental ideological disagreements.", "kesmek / sonlandırmak", "terminate"),

    "put off": ("The academic conference on medieval archaeology was _______ due to geopolitical conflicts in the region.", "ertelemek", "postpone"),
    "call off": ("The museum board had to _______ the annual exhibition after the fragile artifacts suffered transport damage.", "iptal etmek", "cancel"),
    "give up": ("Philosophers rarely _______ their foundational axioms even when confronted with logical paradoxes.", "vazgeçmek", "abandon"),
    "look into": ("Sociolinguists are planning to _______ the preservation of endangered indigenous dialects.", "incelemek / araştırmak", "investigate"),
    "settle down": ("After years of nomadic field research, the ethnographer decided to _______ and write her memoirs.", "yerleşmek / durulmak", "establish residence"),
    "get through": ("It was challenging for paleographers to _______ the damaged 14th-century parchment manuscripts.", "okuyup çözmek / geçmek", "decipher / navigate"),
    "pull through": ("Despite intense ideological persecution, the dissident philosopher managed to _______ and complete his manuscript.", "atlatmak / sağ çıkmak", "survive"),
    "take after / call for": ("The preservation of ancient historical monuments _______ immediate UNESCO intervention.", "gerektirmek / çağrıda bulunmak", "require / demand"),
    "back up (with)": ("Historians must _______ their interpretive claims with verified archival documentation.", "desteklemek", "corroborate"),
    "run up": ("Unbridled state propaganda can quickly _______ public hostility against minority groups.", "tırmandırmak / artırmak", "escalate"),
    "cope with": ("Displaced populations often struggle to _______ cultural shock and language barriers in host societies.", "başa çıkmak", "manage / endure"),
    "deal with": ("Ethics is a core branch of philosophy that attempts to _______ questions of moral responsibility.", "ele almak / ilgilenmek", "address / handle"),
    "take off": ("The literary genre of gothic fiction began to _______ rapidly across 19th-century Europe.", "popülerleşmek / yükselmek", "flourish"),
    "put on": ("The dramatic society decided to _______ an authentic Greek tragedy in the ancient amphitheater.", "sahnelemek", "stage / perform"),
    "come into": ("The museum managed to _______ a rare collection of Impressionist paintings through a private bequest.", "edinmek / mirasa konmak", "inherit / acquire"),

    "clear out": ("Archivists worked carefully to _______ damaged documents from the flooded library basement.", "temizlemek / boşaltmak", "evacuate / clear"),
    "step down": ("Following public controversy, the dean of the humanities faculty was forced to _______.", "istifa etmek", "resign"),
    "break out": ("Historians analyze the structural causes that caused civil unrest to _______ in 1848.", "patlak vermek", "erupt"),
    "fall off": ("Public interest in classical philology began to _______ with the rise of modern digital media.", "azalmak / düşmek", "decline"),
    "come along": ("The compilation of the comprehensive Ottoman etymological dictionary is starting to _______ remarkably well.", "gelişmek / ilerlemek", "progress"),
    "turn on": ("Philosophical debates often _______ the precise definition of human consciousness.", "odaklanmak / dönmek", "hinge upon / focus on"),
    "set off": ("The publication of Martin Luther's theses managed to _______ the Protestant Reformation across Europe.", "tetiklemek / başlatmak", "trigger / spark"),
    "take on": ("The department of history is eager to _______ a multi-year research project on Silk Road trade.", "üstlenmek", "undertake"),
    "come across": ("While searching through royal archives, the researcher happened to _______ unpublished letters of the Queen.", "rastlamak", "encounter"),
    "rule out": ("Archaeologists cannot _______ the possibility that the ancient fortress was destroyed by an earthquake.", "elemek / göz ardı etmek", "exclude / dismiss"),
    "wipe out": ("Imperial conquest and forced assimilation managed to _______ entire indigenous oral traditions.", "yok etmek / silmek", "eradicate"),
    "take over": ("The newly established regime moved quickly to _______ state media and educational curricula.", "devralmak / el koymak", "seize / control"),
    "keep out": ("Strict monastic rules were designed to _______ secular influences from sacred scholarly spaces.", "dışarıda tutmak", "exclude"),
    "put up with": ("Early feminist writers could no longer _______ the rigid patriarchal constraints of Victorian society.", "katlanmak / tahammül etmek", "tolerate"),
    "give rise to": ("Socioeconomic inequality can easily _______ revolutionary movements and ideological shifts.", "sebep olmak / yol açmak", "cause / generate"),

    "figure out": ("Linguists spent decades attempting to _______ the syntax of the mysterious Linear B script.", "anlamak / çözmek", "decipher / comprehend"),
    "find out": ("Archival records enabled historians to _______ the original architectural plan of the Renaissance cathedral.", "keşfetmek / öğrenmek", "discover"),
    "take place": ("The historic treaty negotiations will _______ in the neutral territory of Geneva.", "meydana gelmek / gerçekleşmek", "occur"),
    "make over": ("The aristocratic family decided to _______ their historic manor to the national heritage foundation.", "devretmek", "transfer"),
    "put out": ("Monks worked tirelessly to _______ the fire that threatened the ancient monastery library.", "söndürmek", "extinguish"),
    "bring into": ("The scholarly movement sought to _______ oriental literary aesthetics into Western romanticism.", "dahil etmek / getirmek", "introduce"),
    "give in": ("Despite persecution, the dissident philosopher refused to _______ to state censorship.", "pes etmek / teslim olmak", "yield / surrender"),
    "keep up": ("Cultural preservationists strive to _______ oral storytelling traditions among younger generations.", "sürdürmek / korumak", "maintain / preserve"),
    "build up": ("Over centuries, civilizational exchange helped _______ a rich synthesis of art and science.", "biriktirmek / inşa etmek", "accumulate"),
    "keep off": ("Visitors to the historic sanctuary are instructed to _______ the fragile mosaic pavements.", "uzak durmak", "avoid"),
    "make out": ("Historians could barely _______ the eroded Latin inscription on the ancient marble tombstone.", "seçmek / okuyabilmek", "discern / read"),
    "set out": ("The 18th-century expedition planned to _______ across the Mediterranean to document ancient ruins.", "yola çıkmak", "embark"),
    "look up": ("Etymologists frequently _______ archaic root words in historical dictionaries.", "bakmak / aramak", "consult / search"),
    "run over": ("The aggressive expansion of urban housing threatens to _______ ancient archaeological sites.", "istila etmek / ezmek", "overrun"),
    "turn out": ("The newly discovered historical diary _______ to be a brilliant account of the French Revolution.", "ortaya çıkmak / sonuçlanmak", "prove to be"),

    "get up": ("In traditional monastic routines, scholars had to _______ at dawn for morning prayers and study.", "kalkmak", "arise"),
    "turn up": ("Unpublished manuscripts of the philosopher began to _______ in private European archives.", "ortaya çıkmak / bulunmak", "appear"),
    "break through": ("Postmodern theory managed to _______ rigid traditional paradigms in literary criticism.", "engeli aşmak / yeni çığır açmak", "shatter / penetrate"),
    "get along with": ("Anthropologists must learn to _______ indigenous elders to gain authentic cultural insights.", "iyi geçinmek", "harmonize with"),
    "end up": ("If cultural artifacts are uncatalogued, they often _______ in illegal private collections.", "son bulmak / sonuçlanmak", "wind up"),
    "get over": ("It took decades for the nation to _______ the collective trauma of the civil war.", "atlatmak / iyileşmek", "recover from"),
    "use up": ("Careless excavation techniques can quickly _______ the delicate archaeological context of a site.", "tüketmek / harcamak", "exhaust"),
    "give off": ("Ancient parchment scrolls can _______ a distinct scent indicative of organic decay.", "salmak / yaymak", "emit"),
    "try on": ("Theater historians analyzed how actors used to _______ elaborate masks in ancient Greek drama.", "üzerinde denemek", "don / test"),
    "count on": ("Researchers know they can _______ peer-reviewed historical archives for verifiable data.", "güvenmek", "rely on"),
    "fall through": ("The proposed archaeological expedition began to _______ due to diplomatic conflicts.", "suya düşmek", "fail"),
    "look after": ("Curators work diligently to _______ fragile medieval textiles in climate-controlled vaults.", "bakmak / korumak", "care for / preserve"),
    "go through": ("All historical narratives must _______ critical historiographical scrutiny before acceptance.", "geçmek / maruz kalmak", "undergo"),
    "turn down": ("The editorial board decided to _______ the controversial manuscript due to lack of sources.", "reddetmek", "reject"),
    "do away with": ("The revolutionary assembly voted to _______ feudal privileges and hereditary titles.", "kaldırmak / fesh etmek", "abolish"),

    "get away with": ("Imperial powers could no longer _______ looting cultural heritage without international condemnation.", "cezasız kalmak / yanına kâr kalmak", "escape penalty"),
    "come up with": ("The philosopher managed to _______ an original theory regarding human linguistic capacity.", "üretmek / ortaya atmak", "devise / propose"),
    "rely on": ("Historiography heavily _______ primary source documents such as diaries and official decrees.", "dayanmak / güvenmek", "depend on"),
    "put down": ("The autocratic monarch used imperial guards to _______ the peasant uprising.", "bastırmak", "suppress"),
    "put forward": ("The structuralist thinker was first to _______ the concept of deep linguistic patterns.", "ileri sürmek", "propose / advance"),
    "look through": ("Researchers spent months trying to _______ thousands of court records from the Ottoman era.", "incelemek / göz atmak", "examine / scan"),
    "make for": ("Mutual cultural understanding will always _______ enduring international peace.", "sağlamak / katkıda bulunmak", "conduce to"),
    "care for": ("Art restorers work painstakingly to _______ damaged Renaissance frescoes.", "özen göstermek / bakmak", "tend / preserve"),
    "bring about": ("The invention of movable type helped _______ a rapid spread of humanist ideas.", "yol açmak / neden olmak", "cause / generate"),
    "cut out": ("Translators often have to _______ culturally obsolete idioms to preserve clarity.", "çıkarıp atmak / kesmek", "excise / omit"),
    "turn off": ("The dry academic tone of the treatise threatened to _______ general readers.", "soğutmak / kapatmak", "disenchant / switch off"),
    "run through": ("Let us briefly _______ the key historical events leading to the declaration of independence.", "göz atmak / özetlemek", "recapitulate"),
    "send for": ("The king decided to _______ the renowned philosopher to tutor his children.", "çağırmak / getirtmek", "summon"),
    "do without": ("Historical analysis cannot _______ rigorous contextual verification.", "olmadan idare etmek", "dispense with"),
    "show off": ("Renaissance patrons commissioned grand portraits to _______ their political prestige.", "gösteriş yapmak / sergilemek", "display / exhibit"),

    "think over": ("The ethical council requested more time to _______ the moral implications of genetic editing.", "düşünmek / taşınmak", "ponder"),
    "change over": ("The academic discipline began to _______ from structuralism to post-structuralist analysis.", "geçmek / dönüşmek", "transition / switch"),
    "take care of": ("Cultural heritage organizations aim to _______ endangered historical monuments.", "korumak / bakmak", "protect / preserve"),
    "run out (of)": ("The besieged fortress began to _______ grain and clean water after three months.", "tükenmek / bitmek", "deplete"),
    "close down": ("Totalitarian regimes often move to _______ independent printing presses and theaters.", "kapatmak / kepenk indirmek", "suppress / shut"),
    "sort out": ("Philologists spent years attempting to _______ the confused chronology of ancient fragments.", "tasnif etmek / çözmek", "organize / resolve"),
    "force out": ("Ideological purges managed to _______ prominent dissident intellectuals from the university.", "zorla çıkarmak / sürmek", "expel / oust"),
    "do with": ("Cultural anthropology has everything to _______ understanding human symbolic systems.", "alakalı olmak", "pertain to"),
    "turn over": ("The defeated commander agreed to _______ the city archives to the invading forces.", "devretmek / teslim etmek", "surrender"),
    "leave out": ("A balanced biography should never _______ the subject's early moral failures.", "dışarıda bırakmak / atlamak", "omit"),
    "cut off": ("The siege managed to _______ the capital city from vital agricultural hinterlands.", "kesmek / tecrit etmek", "isolate / sever"),
    "point out": ("Art historians were quick to _______ the subtle Byzantine influences in Italian gothic art.", "vurgulamak / işaret etmek", "highlight / indicate"),
    "get in": ("Scholars queued early at the library gates to _______ before the rare archive room opened.", "girmek / ulaşmak", "enter"),
    "put over": ("The diplomatic delegation decided to _______ near the neutral border town for talks.", "konaklamak / demir atmak", "berth / stay"),
    "work out": ("Hermeneutic scholars spent lifetimes trying to _______ coherent interpretations of sacred texts.", "çözümlemek / hesaplamak", "interpret / solve"),

    "try out": ("Experimental dramatists decided to _______ new interactive staging techniques.", "denemek", "test"),
    "get on": ("Early sociologists analyzed how different immigrant groups _______ in urban environments.", "geçinmek / uyum sağlamak", "fare / progress"),
    "take back": ("The historian was forced to _______ his erroneous claim after new archive proof emerged.", "sözünü geri almak", "retract"),
    "pull through": ("The fragile peace treaty managed to _______ despite severe provocations from both sides.", "sağ çıkmak / atlatmak", "survive"),
    "wait for": ("Archeologists had to _______ dry season conditions before excavating the riverbed site.", "beklemek", "await"),
    "put through": ("The diplomat managed to _______ the crucial peace amendment during the final vote.", "geçirmek / kabul ettirmek", "enact / pass"),
    "take to": ("The reading public began to _______ realistic novels with unprecedented enthusiasm.", "ısınmak / benimsemek", "adopt / favor"),
    "bring down": ("Widespread popular protest managed to _______ the oppressive autocratic regime.", "devirmek / düşürmek", "topple / overthrow"),
    "look over": ("The senior editor promised to _______ the translated epic before final printing.", "göz gezdirmek / incelemek", "review / inspect"),
    "look out (for)": ("Historiographers must _______ ideological biases when reading court chronicles.", "dikkat etmek / gözetmek", "watch out for"),
    "make do (with)": ("During the war, scholars had to _______ makeshift libraries and scarce paper.", "idare etmek", "cope with"),
    "get off": ("Travelers on the Grand Tour used to _______ their carriages at historical milestones.", "inmek", "disembark"),
    "take down": ("Scribes were commissioned to _______ every oral testimony during the trial.", "not almak / kaydetmek", "transcribe / record"),
    "give back": ("The imperial museum was urged to _______ looted ceremonial relics to indigenous tribes.", "geri vermek / iade etmek", "repatriate / return"),
    "play down": ("Court historians attempted to _______ the severity of the military defeat in official records.", "önemsememek / hafifletmek", "minimize / downplay"),

    "pull up": ("The royal carriage managed to _______ in front of the cathedral gates.", "durmak / yanaşmak", "halt"),
    "depend on/upon": ("Interpretations of ancient texts heavily _______ contextual linguistic knowledge.", "bağlı olmak", "rely on"),
    "follow up": ("Sociologists plan to _______ their initial study with a twenty-year longitudinal survey.", "ardını bırakmamak / takip etmek", "pursue further"),
    "put up": ("Citizens voted to _______ a marble monument commemorating the victims of the revolution.", "dikmek / inşa etmek", "erect / construct"),
    "hold out": ("The besieged city garrison managed to _______ against overwhelming imperial forces.", "direnmek", "resist"),
    "show up": ("Fascinating new historical clues continue to _______ in unexamined church registries.", "ortaya çıkmak / görünmek", "emerge / appear"),
    "come up": ("Ethical dilemmas are bound to _______ whenever artificial intelligence is debated in philosophy.", "gündeme gelmek / çıkmak", "arise"),
    "fight off": ("Cultural communities work to _______ linguistic homogenization caused by globalization.", "mücadele etmek / defetmek", "resist / repel"),
    "keep away": ("Totalitarian censors sought to _______ subversive literature from university students.", "uzak tutmak", "withhold"),
    "get out": ("Secret archives allowed historians to _______ historical truth to the public domain.", "dışarı çıkarmak / yaymak", "release / extract"),
    "hold on": ("Conservative traditionalists tried to _______ to feudal values despite modernization.", "tutunmak / direnmek", "cling to"),
    "bring in": ("The cultural exchange program helped _______ fresh artistic perspectives into the academy.", "kazandırmak / getirmek", "introduce"),
    "get away": ("The exiled dissident managed to _______ across the border under cover of darkness.", "kaçmak / kurtulmak", "escape"),
    "put away": ("Archivists must carefully _______ fragile 15th-century maps after examination.", "kaldırmak / saklamak", "store"),
    "draw up": ("Delegates assembled to _______ a constitutional framework for the new republic.", "hazırlamak / kaleme almak", "draft / formulate"),

    "come back": ("After decades of suppression, classical philosophical realism began to _______ into favor.", "geri dönmek / popülerleşmek", "resurge"),
    "run down": ("Biased chroniclers used to _______ foreign cultures to justify imperial conquest.", "kötülemek / eleştirmek", "disparage"),
    "open up": ("The decipherment of Cuneiform script managed to _______ thousands of years of Near Eastern history.", "önünü açmak / aydınlatmak", "unravel / unlock"),
    "catch up": ("Post-war European cinema worked hard to _______ with Hollywood's technological advances.", "yetişmek", "overtake"),
    "slow down": ("The economic decline threatened to _______ the pace of cultural institution funding.", "yavaşlatmak", "decelerate"),
    "die out": ("Without active speakers, ancient oral storytelling traditions will eventually _______.", "yok olmak / nesli tükenmek", "become extinct"),
    "fill out": ("Archival researchers are required to _______ official manuscript request forms.", "form doldurmak", "complete"),
    "turn back": ("The army of Alexander the Great was forced to _______ after reaching the Indus River.", "geri dönmek", "retreat"),
    "get around": ("News of the philosophical treatise began to _______ rapidly across European universities.", "yayılmak", "circulate"),
    "look for": ("Archaeologists continue to _______ the lost tomb of the ancient pharaoh.", "aramak", "search for"),
    "carry out": ("Historians plan to _______ exhaustive archival research in the Vatican library.", "yürütmek / gerçekleştirmek", "conduct"),
    "be fed up with": ("18th-century thinkers had grown _______ dogmatic scholasticism and arbitrary censorship.", "bıkmak / usanmak", "be weary of"),
    "carry on": ("Despite political exile, the philosopher was determined to _______ his intellectual writing.", "devam ettirmek / sürdürmek", "persevere / continue")
}

# Distractor formatting rule: EVERY option in fill-blank-dropdown and multiple-choice MUST HAVE its Turkish meaning in parentheses!
# e.g., "put out (söndürmek)", "keep up with (hızına yetişmek)", "make up for (telafi etmek)", "break off (kesmek)"

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
code_buffer.append("  // BÖLÜM 60 / UNIT 57: 148 PHRASAL VERBS BEŞERİ BİLİMLER MASTERCLASS")
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
        
        # Select 3 distractors from all PV items
        other_v = [x for x in pv_items if x['verb'] != v]
        d1 = other_v[item_idx % len(other_v)]
        d2 = other_v[(item_idx+5) % len(other_v)]
        d3 = other_v[(item_idx+10) % len(other_v)]
        
        # Options with FULL TURKISH MEANING FOR ALL OPTIONS!
        opt_correct = f"{v} ({m})"
        opt_d1 = f"{d1['verb']} ({d1['meaning']})"
        opt_d2 = f"{d2['verb']} ({d2['meaning']})"
        opt_d3 = f"{d3['verb']} ({d3['meaning']})"
        
        opts = [opt_correct, opt_d1, opt_d2, opt_d3]
        
        q_type_selector = item_idx % 3
        
        if q_type_selector == 0:
            # fill-blank-dropdown (Açılır Menülü Boşluk Doldurma - Her seçenekte Türkçe Anlamlı!)
            q_obj = {
                "id": f"u60_l{lesson_num}_q{item_idx+1}_fb",
                "type": "fill-blank-dropdown",
                "prompt": f"[Beşeri Bilimler - Soru {item['no']}/148] Metindeki boşluğa en uygun deyimsel fiili seçin:",
                "sentence": sent,
                "options": [opt_correct, opt_d1, opt_d2, opt_d3],
                "correctIndex": 0,
                "translation": f"Çeviri/Anlam: {m}",
                "explanation": f"Beşeri bilimler metnindeki bu bağlamda '{m}' (eş anlamı: {syn}) anlamını sağlayan Phrasal Verb <span style='color: #ff6b6b; font-weight: bold;'>{v} ({m})</span> yapısıdır.",
                "hint": {
                    "formula": f"{v} ➔ {syn}",
                    "academicNote": f"Beşeri Bilimler Anlamı: {m}"
                }
            }
        elif q_type_selector == 1:
            # multiple-choice (Çoktan Seçmeli Bağlam Testi - Her seçenekte Türkçe Anlamlı!)
            opts_mc = [f"<span style='color: #ff6b6b; font-weight: bold;'>{v}</span> ({m})",
                       f"<span style='color: #ff6b6b; font-weight: bold;'>{d1['verb']}</span> ({d1['meaning']})",
                       f"<span style='color: #ff6b6b; font-weight: bold;'>{d2['verb']}</span> ({d2['meaning']})",
                       f"<span style='color: #ff6b6b; font-weight: bold;'>{d3['verb']}</span> ({d3['meaning']})"]
            q_obj = {
                "id": f"u60_l{lesson_num}_q{item_idx+1}_mc",
                "type": "multiple-choice",
                "prompt": f"[Beşeri Bilimler - Soru {item['no']}/148] Akademik metni en uygun deyimsel fiil ile tamamlayın:<br><br><strong>'{sent}'</strong>",
                "options": opts_mc,
                "correctIndex": 0,
                "explanation": f"Cümlenin tarihsel/sosyolojik bağlamına göre '{m}' anlamı veren <span style='color: #ff6b6b; font-weight: bold;'>{v}</span> doğru seçenektir."
            }
        else:
            # error-spotting (Phrasal Verb & Preposition Hata Avcısı)
            err_sentence = sent.replace("_______", f"{d1['verb']} with")
            q_obj = {
                "id": f"u60_l{lesson_num}_q{item_idx+1}_err",
                "type": "error-spotting",
                "prompt": f"[Beşeri Bilimler - Soru {item['no']}/148 - Hata Avcısı] Cümledeki hatalı edat / Phrasal Verb kullanımını bulun:",
                "sentence": err_sentence,
                "options": [
                    f"{d1['verb']} with (doğrusu: {v} - {m})",
                    "scholarly analysis / context",
                    "historical evidence"
                ],
                "correctIndex": 0,
                "explanation": f"Bu beşeri bilimler cümlesinde '{m}' anlamını vermek için hatalı 'd1['verb'] with' kalıbı yerine <span style='color: #ff6b6b; font-weight: bold;'>{v} ({m})</span> kullanılmalıdır."
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
    "desc": "Tarih, Sosyoloji, Felsefe, Edebiyat, Dilbilim, Arkeoloji ve Sanat Tarihi metinleriyle 148 Phrasal Verb'ün Türkçe anlamlı eksiksiz serisi.",
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
    code_buffer.append(f'        description: "Tarih, Felsefe, Sosyoloji ve Edebiyat metinleri üzerinde {chunk[0]["no"]}-{chunk[-1]["no"]}. Phrasal Verb\'leri Türkçe anlamlı seçeneklerle çözün.",')
    code_buffer.append(f"        questions: {q_arr_name}")
    code_buffer.append("      }")
    code_buffer.append("    ],")
    code_buffer.append("    konuAnlatimi: {")
    code_buffer.append(f'      baslik: "Beşeri Bilimler Phrasal Verbs Kılavuzu: Ders {lesson_num} ({chunk[0]["no"]}-{chunk[-1]["no"]})",')
    code_buffer.append(f'      teorikMantik: "{chunk[0]["verb"]} ile {chunk[-1]["verb"]} fiilleri arasındaki 15 deyimsel fiilin sosyal ve beşeri bilimler metinlerindeki kullanım refleksleri.",')
    code_buffer.append('      formul: "Beşeri Metin Bağlamı + Türkçe Anlamlı Phrasal Verb ➔ Doğru Çözüm",')
    code_buffer.append('      altinKural: "Seçeneklerdeki tüm Phrasal Verb\'lerin Türkçe anlamlarına dikkat ederek cümle bağlamıyla eşleştirin!"')
    code_buffer.append("    }")
    code_buffer.append("  });\n")

generated_js = "\n".join(code_buffer)
with open('generated_pv_code.js', 'w', encoding='utf-8') as f:
    f.write(generated_js)

print("Humanities PV Code generated successfully!")

