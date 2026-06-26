import re
import json

# Define the base components mapping
components_map = {
    "project": {"tr_sub": "Proje", "tr_full_sub": "İlk araştırma projesi", "tr_verb": "terk edil"},
    "growth": {"tr_sub": "Büyüme", "tr_full_sub": "Önemli yıllık finansal büyüme", "tr_verb": "öngörül"},
    "dynamic": {"tr_sub": "Dinamik", "tr_full_sub": "Bu öngörülemeyen ekonomik dinamik", "tr_verb": "tetiklen"},
    "context": {"tr_sub": "Bağlam", "tr_full_sub": "Daha geniş sosyo-ekonomik bağlam", "tr_verb": "belirlen"},
    "reform": {"tr_sub": "Reform", "tr_full_sub": "Kapsamlı yasal vergi reformu", "tr_verb": "savunul"},
    "sector": {"tr_sub": "Sektör", "tr_full_sub": "Son derece rekabetçi dinamik sektör", "tr_verb": "genişletil"},
    "parameters": {"tr_sub": "Parametreler", "tr_full_sub": "Kritik teknik sistem parametreleri", "tr_verb": "tanımlan"},
    "ratios": {"tr_sub": "Oranlar", "tr_full_sub": "Karmaşık matematiksel veri oranları", "tr_verb": "hesaplan"},
    "framework": {"tr_sub": "Çerçeve", "tr_full_sub": "Tüm temel yapısal çerçeve", "tr_verb": "incelen"},
    "insights": {"tr_sub": "Çıkarımlar", "tr_full_sub": "Değerli nitel çıkarımlar", "tr_verb": "elde edil"},
    "hypotheses": {"tr_sub": "Hipotezler", "tr_full_sub": "Alternatif bilimsel hipotezler", "tr_verb": "doğrulan"},
    "anomaly": {"tr_sub": "Anomali", "tr_full_sub": "Tespit edilemeyen yapısal anomali", "tr_verb": "tespit edil"},
    "rules": {"tr_sub": "Kurallar", "tr_full_sub": "Güncelliğini yitirmiş çevresel güvenlik düzenlemeleri", "tr_verb": "askıya alın"},
    "agreements": {"tr_sub": "Anlaşmalar", "tr_full_sub": "Resmi ikili ticari anlaşmalar", "tr_verb": "feshedil"},
    "surveys": {"tr_sub": "Anketler", "tr_full_sub": "Kapsamlı bölgesel eğitim anketleri", "tr_verb": "yürütül"},
    "media": {"tr_sub": "Medya", "tr_full_sub": "Kamuoyunun siyasi ve kültürel bakış açısı", "tr_verb": "manipüle edil"},
    "scope": {"tr_sub": "Kapsam", "tr_full_sub": "Başlangıçtaki araştırma projesi kapsamı", "tr_verb": "açıklan"},
    "inputs": {"tr_sub": "Girdiler", "tr_full_sub": "Bireysel fonksiyonel yazılım modülleri", "tr_verb": "değiştiril"},
    "modules": {"tr_sub": "Modüller", "tr_full_sub": "Ayrı kararsız kimyasal değişkenler", "tr_verb": "entegre edil"},
    "data": {"tr_sub": "Veri", "tr_full_sub": "Yeni toplanan deneysel veriler", "tr_verb": "işlen"},
    "access": {"tr_sub": "Erişim", "tr_full_sub": "Yetkisiz kullanıcı ağ erişimi", "tr_verb": "kısıtlan"},
    "core": {"tr_sub": "Çekirdek", "tr_full_sub": "Kritik dahili cihaz bileşenleri", "tr_verb": "stabilize edil"},
    "formats": {"tr_sub": "Formatlar", "tr_full_sub": "Kesin dağılım ve demografik formatlar", "tr_verb": "değiştiril"},
    "flaws": {"tr_sub": "Kusurlar", "tr_full_sub": "Gizli örgütsel sistem kusurları", "tr_verb": "ortaya çıkarıl"},
    "stress": {"tr_sub": "Strese", "tr_full_sub": "Ciddi psikolojik ve mesleki strese", "tr_verb": "yol açıl"},
    "logs": {"tr_sub": "Günlükler", "tr_full_sub": "Detaylı geçmiş sistem günlükleri", "tr_verb": "biriktiril"},
    "privacy": {"tr_sub": "Gizlilik", "tr_full_sub": "Hassas kullanıcı bilgileri gizliliği", "tr_verb": "korun"},
    "resources": {"tr_sub": "Kaynaklar", "tr_full_sub": "Maksimum yıllık üretim kaynakları", "tr_verb": "tahsis edil"},
    "funds": {"tr_sub": "Fonlar", "tr_full_sub": "Ayrı uluslararası araştırma fonları", "tr_verb": "kaydırıl"},
    "output": {"tr_sub": "Çıktı", "tr_full_sub": "Maksimum yıllık üretim çıktısı", "tr_verb": "maksimize edil"}
}

variant_map = {
    31: {"tr_sub": "Yeni önerilen mimari çerçeve", "tr_agent": "bağımsız teknik uzmanlar tarafından", "tr_verb": "incelen", "modal": "can be"},
    32: {"tr_sub": "Önemli uzun vadeli ekonomik büyüme", "tr_agent": "önde gelen kurumsal yetkililer tarafından", "tr_verb": "öngörül", "modal": "can be"},
    33: {"tr_sub": "Ciddi bir psikolojik ve mesleki strese", "tr_agent": "gözden geçirilmiş güvenlik protokolü tarafından", "tr_verb": "yol açıl", "modal": "can be"},
    34: {"tr_sub": "Kesin dağılım ve demografik formatlar", "tr_agent": "milli eğitim bakanlığı tarafından", "tr_verb": "belirlen", "modal": "must be"},
    35: {"tr_sub": "Kapsamlı yasal vergi reformu", "tr_agent": "kıdemli finansal analistler tarafından", "tr_verb": "savunul", "modal": "must be"},
    36: {"tr_sub": "Tüm temel yapısal çerçeve", "tr_agent": "hızlı bölgesel altyapı genişlemesi tarafından", "tr_verb": "genişletil", "modal": "must be"},
    37: {"tr_sub": "Kritik teknik sistem parametreleri", "tr_agent": "yazılım geliştirme ekibi tarafından", "tr_verb": "tanımlan", "modal": "should be"},
    38: {"tr_sub": "Karmaşık matematiksel veri oranları", "tr_agent": "merkezi bulut veritabanı tarafından", "tr_verb": "hesaplan", "modal": "should be"},
    39: {"tr_sub": "Bireysel fonksiyonel yazılım modülleri", "tr_agent": "bağımsız teknik uzmanlar tarafından", "tr_verb": "incelen", "modal": "should be"},
    40: {"tr_sub": "Değerli nitel çıkarımlar", "tr_agent": "detaylı geçmiş sistem günlüklerinden", "tr_verb": "elde edil", "modal": "may be"},
    41: {"tr_sub": "Alternatif bilimsel hipotezler", "tr_agent": "baş laboratuvar araştırmacısı tarafından", "tr_verb": "doğrulan", "modal": "may be"},
    42: {"tr_sub": "Tespit edilemeyen yapısal anomali", "tr_agent": "bağımsız yıllık denetim tarafından", "tr_verb": "tespit edil", "modal": "may be"},
    43: {"tr_sub": "Güncelliğini yitirmiş çevresel güvenlik düzenlemeleri", "tr_agent": "önde gelen kurumsal yetkililer tarafından", "tr_verb": "askıya alın", "modal": "might be"},
    44: {"tr_sub": "Resmi ikili ticari anlaşmalar", "tr_agent": "bölgesel idari konsey tarafından", "tr_verb": "feshedil", "modal": "might be"},
    45: {"tr_sub": "Kapsamlı bölgesel eğitim anketleri", "tr_agent": "bağımsız teknik uzmanlar tarafından", "tr_verb": "yürütül", "modal": "might be"},
    46: {"tr_sub": "Kamuoyunun siyasi ve kültürel bakış açısı", "tr_agent": "yürütme iç kurulu tarafından", "tr_verb": "manipüle edil", "modal": "could be"},
    47: {"tr_sub": "Başlangıçtaki araştırma projesi kapsamı", "tr_agent": "baş laboratuvar araştırmacısı tarafından", "tr_verb": "açıklan", "modal": "could be"},
    48: {"tr_sub": "Önemli deneysel girdiler", "tr_agent": "gözden geçirilmiş güvenlik protokolü tarafından", "tr_verb": "değiştiril", "modal": "could be"},
    49: {"tr_sub": "Kritik dahili cihaz bileşenleri", "tr_agent": "otomatik arka plan betiğine", "tr_verb": "entegre edil", "modal": "ought to be"},
    50: {"tr_sub": "Hassas kullanıcı bilgileri gizliliği", "tr_agent": "gelişmiş şifreleme algoritmaları tarafından", "tr_verb": "işlen", "modal": "ought to be"},
    51: {"tr_sub": "Yetkisiz kullanıcı ağ erişimi", "tr_agent": "otomatik arka plan betiği tarafından", "tr_verb": "kısıtlan", "modal": "will be"},
    52: {"tr_sub": "Yeni önerilen mimari çerçeve", "tr_agent": "yazılım geliştirme ekibi tarafından", "tr_verb": "stabilize edil", "modal": "will be"},
    53: {"tr_sub": "Kesin dağılım ve demografik formatlar", "tr_agent": "yürütme iç kurulu tarafından", "tr_verb": "değiştiril", "modal": "will be"},
    54: {"tr_sub": "Gizli örgütsel sistem kusurları", "tr_agent": "baş laboratuvar araştırmacısı tarafından", "tr_verb": "ortaya çıkarıl", "modal": "will be"},
    55: {"tr_sub": "Bu öngörülemeyen ekonomik dinamiğe", "tr_agent": "ani paradigma değişimi tarafından", "tr_verb": "yol açıl", "modal": "will be"},
    56: {"tr_sub": "Detaylı geçmiş sistem günlükleri", "tr_agent": "yazılım geliştirme ekibi tarafından", "tr_verb": "biriktiril", "modal": "can be"},
    57: {"tr_sub": "Hassas kullanıcı bilgileri gizliliği", "tr_agent": "katı kurumsal politika tarafından", "tr_verb": "korun", "modal": "must be"},
    58: {"tr_sub": "Maksimum yıllık üretim kaynakları", "tr_agent": "yürütme iç kurulu tarafından", "tr_verb": "tahsis edil", "modal": "should be"},
    59: {"tr_sub": "Ayrı uluslararası araştırma fonları", "tr_agent": "yazılım geliştirme ekibi tarafından", "tr_verb": "kaydırıl", "modal": "can be"},
    60: {"tr_sub": "Maksimum yıllık üretim çıktısı", "tr_agent": "otomatik arka plan betiği tarafından", "tr_verb": "maksimize edil", "modal": "must be"}
}

def get_key_token(en_sentence):
    en_clean = en_sentence.lower().replace(".", "").replace("?", "").strip()
    if "regulation" in en_clean or "rule" in en_clean:
        return "rules"
    if "perspective" in en_clean or "media" in en_clean:
        return "media"
    if "variable" in en_clean or "module" in en_clean:
        return "modules"
    if "component" in en_clean or "core" in en_clean:
        return "core"
    
    tokens = ["project", "growth", "dynamic", "context", "reform", "sector", "parameters", "ratios", "framework", "insights", "hypotheses", "anomaly", "agreements", "surveys", "scope", "inputs", "data", "access", "formats", "flaws", "stress", "logs", "privacy", "resources", "funds", "output"]
    for t in tokens:
        if t in en_clean:
            return t
    return None

def get_v3_participle(en_sentence):
    en_clean = en_sentence.replace(".", "").replace("?", "").strip()
    # Find the word after "be" or "been"
    match = re.search(r'\b(be|been)\s+(\w+)\b', en_clean, re.IGNORECASE)
    if match:
        return match.group(2)
    return None

def get_verb_suffix(modal, base_verb, is_neg=False, is_q=False):
    modal = modal.lower().strip()
    if is_neg:
        if modal in ["can", "cannot", "can be", "cannot be"]:
            if base_verb == "kaydırıl": return "kaydırılamaz"
            if base_verb == "terk edil": return "terk edilemez"
            if base_verb == "tetiklen": return "tetiklenemez"
            if base_verb == "biriktiril": return "biriktirilemez"
            return base_verb + "emez" if "e" in base_verb[-2:] else base_verb + "amaz"
        elif modal in ["must", "must not", "must be", "must not be"]:
            if base_verb == "ihlal edil": return "ihlal edilmemelidir"
            return base_verb + "memelidir" if "e" in base_verb[-2:] else base_verb + "mamalıdır"
        elif modal in ["should", "should not", "should be", "should not be"]:
            return base_verb + "memelidir" if "e" in base_verb[-2:] else base_verb + "mamalıdır"
        elif modal in ["may", "may not", "may be", "may not be", "might", "might not", "might be", "might not be"]:
            return base_verb + "meyebilir" if "e" in base_verb[-2:] else base_verb + "mayabilir"
        elif modal in ["could", "could not", "could be", "could not be"]:
            if base_verb == "değiştiril": return "değiştirilemez"
            return base_verb + "emez" if "e" in base_verb[-2:] else base_verb + "amaz"
        elif modal in ["ought to", "ought not to", "ought to be", "ought not to be"]:
            return base_verb + "memelidir" if "e" in base_verb[-2:] else base_verb + "mamalıdır"
        elif modal in ["will", "will not", "will be", "will not be"]:
            return base_verb + "meyecek" if "e" in base_verb[-2:] else base_verb + "mayacak"
    elif is_q:
        if modal in ["can", "can be"]:
            return base_verb + "ebilir mi" if "e" in base_verb[-2:] else base_verb + "abilir mi"
        elif modal in ["must", "must be"]:
            return base_verb + "meli midir" if "e" in base_verb[-2:] else base_verb + "malı mıdır"
        elif modal in ["should", "should be"]:
            return base_verb + "meli midir" if "e" in base_verb[-2:] else base_verb + "malı mıdır"
        elif modal in ["may", "may be", "might", "might be"]:
            return base_verb + "ebilir mi" if "e" in base_verb[-2:] else base_verb + "abilir mi"
        elif modal in ["could", "could be"]:
            return base_verb + "ebilir mi" if "e" in base_verb[-2:] else base_verb + "abilir mi"
        elif modal in ["will", "will be"]:
            if base_verb == "yol açıl": return "yol açılacak mı"
            return base_verb + "ecek mi" if "e" in base_verb[-2:] else base_verb + "acak mı"
    else:
        if modal in ["can", "can be"]:
            return base_verb + "ebilir" if "e" in base_verb[-2:] else base_verb + "abilir"
        elif modal in ["must", "must be"]:
            return base_verb + "melidir" if "e" in base_verb[-2:] else base_verb + "malıdır"
        elif modal in ["should", "should be"]:
            return base_verb + "melidir" if "e" in base_verb[-2:] else base_verb + "malıdır"
        elif modal in ["may", "may be", "might", "might be"]:
            return base_verb + "ebilir" if "e" in base_verb[-2:] else base_verb + "abilir"
        elif modal in ["could", "could be"]:
            return base_verb + "ebilir" if "e" in base_verb[-2:] else base_verb + "abilir"
        elif modal in ["ought to", "ought to be"]:
            return base_verb + "melidir" if "e" in base_verb[-2:] else base_verb + "malıdır"
        elif modal in ["will", "will be"]:
            if base_verb == "yol açıl": return "yol açılacak"
            return base_verb + "ecek" if "e" in base_verb[-2:] else base_verb + "acak"
    return base_verb

# Load extracted text
with open("scratch/extracted_text.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

sections = {1: [], 2: [], 3: [], 4: []}

for line in lines:
    line = line.strip()
    if not line: continue
    
    match = re.match(r'^P (\d+):\s*(.*)$', line)
    if match:
        p_num = int(match.group(1))
        content = match.group(2).strip()
        if not content: continue
        
        if 31 <= p_num <= 60:
            sections[1].append(content)
        elif 63 <= p_num <= 92:
            sections[2].append(content)
        elif 95 <= p_num <= 124:
            sections[3].append(content)
        elif 127 <= p_num <= 186:
            sections[4].append(content)

# Clean up
for sec in sections:
    sections[sec] = [s for s in sections[sec] if s and s[0].isupper() and (s.endswith(".") or s.endswith("?"))]

# Translate helpers
def translate_sec1(en):
    token = get_key_token(en)
    meta = components_map[token]
    sub = meta["tr_sub"]
    verb_root = meta["tr_verb"]
    
    en_clean = en.lower().replace(".", "").strip()
    modal = ""
    for m in ["can be", "must be", "should be", "may be", "might be", "could be", "ought to be", "will be"]:
        if m in en_clean:
            modal = m
            break
            
    tr_verb = get_verb_suffix(modal, verb_root, is_neg=False, is_q=False)
    
    if token == "stress":
        return f"Ciddi psikolojik ve mesleki strese {tr_verb}.", tr_verb
        
    return f"{sub} {tr_verb}.", tr_verb

def translate_sec2(en):
    token = get_key_token(en)
    meta = components_map[token]
    sub = meta["tr_sub"]
    verb_root = meta["tr_verb"]
    
    en_clean = en.lower().replace(".", "").strip()
    modal = ""
    for m in ["cannot be", "must not be", "should not be", "may not be", "might not be", "could not be", "ought not to be", "will not be"]:
        if m in en_clean:
            modal = m
            break
            
    if "violated" in en_clean:
        verb_root = "ihlal edil"
    elif "minimized" in en_clean:
        verb_root = "minimize edil"
        
    tr_verb = get_verb_suffix(modal, verb_root, is_neg=True, is_q=False)
    
    if token == "stress":
        return f"Strese {tr_verb}.", tr_verb
        
    return f"{sub} {tr_verb}.", tr_verb

def translate_sec3(en):
    token = get_key_token(en)
    meta = components_map[token]
    sub = meta["tr_sub"]
    verb_root = meta["tr_verb"]
    
    en_clean = en.lower().replace("?", "").strip()
    modal = ""
    for m in ["can", "must", "should", "may", "might", "could", "will"]:
        if en_clean.startswith(m):
            modal = m
            break
            
    tr_verb = get_verb_suffix(modal, verb_root, is_neg=False, is_q=True)
    
    if token == "stress":
        return f"Strese {tr_verb}?", tr_verb + "?"
        
    return f"{sub} {tr_verb}?", tr_verb + "?"

def translate_sec4(en, idx):
    if idx <= 30:
        token = get_key_token(en)
        meta = components_map[token]
        tr_sub = meta["tr_full_sub"]
        verb_root = meta["tr_verb"]
        
        en_clean = en.lower().replace(".", "").strip()
        modal = ""
        for m in ["can be", "must be", "should be", "may be", "might be", "could be", "ought to be", "will be"]:
            if m in en_clean:
                modal = m
                break
                
        tr_verb = get_verb_suffix(modal, verb_root, is_neg=False, is_q=False)
        
        tr_agent = ""
        if " by " in en:
            agent_en = en.split(" by ")[-1].replace(".", "").strip()
            agent_map = {
                "the software development team": "yazılım geliştirme ekibi tarafından",
                "senior financial analysts": "kıdemli finansal analistler tarafından",
                "a chain of negative physical reactions": "bir dizi olumsuz fiziksel tepki tarafından",
                "the strict qualitative selection criteria": "katı nitel seçim kriterleri tarafından",
                "leading institutional authorities": "önde gelen kurumsal yetkililer tarafından",
                "rapid regional infrastructure expansion": "hızlı bölgesel altyapı genişlemesi tarafından",
                "the revised security protocol": "gözden geçirilmiş güvenlik protokolü tarafından",
                "the automated background script": "otomatik arka plan betiği tarafından",
                "independent technical experts": "bağımsız teknik uzmanlar tarafından",
                "the final scientific finding": "nihai bilimsel bulgu tarafından",
                "the principal laboratory researcher": "baş laboratuvar araştırmacısı tarafından",
                "the regional administrative council": "bölgesel idari konsey tarafından",
                "the executive internal board": "yürütme iç kurulu tarafından",
                "the national education ministry": "milli eğitim bakanlığı tarafından",
                "mainstream digital media": "ana akım dijital medya tarafından",
                "the centralized cloud database": "merkezi bulut veritabanı tarafından",
                "the strict institutional policy": "katı kurumsal politika tarafından",
                "the reinforced central core": "güçlendirilmiş merkezi çekirdek tarafından",
                "the sudden paradigm shift": "ani paradigma değişimi tarafından",
                "the independent annual audit": "bağımsız yıllık denetim tarafından",
                "the continuous chemical process": "sürekli kimyasal süreç tarafından",
                "advanced encryption algorithms": "gelişmiş şifreleme algoritmaları tarafından",
                "innovative corporate strategies": "yenilikçi kurumsal stratejiler tarafından",
                "the ethics evaluation committee": "etik değerlendirme komitesi tarafından"
            }
            tr_agent = agent_map.get(agent_en, "")
        elif " from " in en:
            agent_en = en.split(" from ")[-1].replace(".", "").strip()
            if "regional educational surveys" in agent_en:
                tr_agent = "kapsamlı bölgesel eğitim anketlerinden"
            elif "system logs" in agent_en:
                tr_agent = "detaylı geçmiş sistem günlüklerinden"
        elif " into " in en:
            agent_en = en.split(" into ")[-1].replace(".", "").strip()
            if "continuous process" in agent_en:
                tr_agent = "sürekli sürece"
            elif "chemical process" in agent_en:
                tr_agent = "sürekli kimyasal sürece"
                
        return f"{tr_sub} {tr_agent} {tr_verb}.", tr_verb
    else:
        vmeta = variant_map[idx]
        tr_sub = vmeta["tr_sub"]
        tr_agent = vmeta["tr_agent"]
        verb_root = vmeta["tr_verb"]
        modal = vmeta["modal"]
        
        tr_verb = get_verb_suffix(modal, verb_root, is_neg=False, is_q=False)
        return f"{tr_sub} {tr_agent} {tr_verb}.", tr_verb

unit11_data = {1: [], 2: [], 3: [], 4: []}

# Section 1
for en in sections[1]:
    tr, tr_verb = translate_sec1(en)
    v3 = get_v3_participle(en)
    unit11_data[1].append({
        "en": en,
        "tr": tr,
        "word": v3,
        "trWord": tr_verb,
        "blank": en.replace(v3, "___")
    })

# Section 2
for en in sections[2]:
    tr, tr_verb = translate_sec2(en)
    v3 = get_v3_participle(en)
    unit11_data[2].append({
        "en": en,
        "tr": tr,
        "word": v3,
        "trWord": tr_verb,
        "blank": en.replace(v3, "___")
    })

# Section 3
for en in sections[3]:
    tr, tr_verb = translate_sec3(en)
    v3 = get_v3_participle(en)
    unit11_data[3].append({
        "en": en,
        "tr": tr,
        "word": v3,
        "trWord": tr_verb,
        "blank": en.replace(v3, "___")
    })

# Section 4
for idx, en in enumerate(sections[4]):
    tr, tr_verb = translate_sec4(en, idx + 1)
    v3 = get_v3_participle(en)
    unit11_data[4].append({
        "en": en,
        "tr": tr,
        "word": v3,
        "trWord": tr_verb,
        "blank": en.replace(v3, "___")
    })

# Sort lessons by sentence length (basitten karmaşığa sıralama)
for l in unit11_data:
    unit11_data[l].sort(key=lambda s: len(s["en"]))

# Verify counts and samples
for l in unit11_data:
    print(f"Lesson {l} total sentences: {len(unit11_data[l])}")
    print(f"  Sample 1: {unit11_data[l][0]}")
    print(f"  Sample 2: {unit11_data[l][1]}")

with open("scratch/unit11_parsed.json", "w", encoding="utf-8") as f:
    json.dump(unit11_data, f, ensure_ascii=False, indent=2)
print("Saved parsed and translated sentences to scratch/unit11_parsed.json")
