import os

unit16_data = [
    {"en": "Learning a language is not easy.", "tr": "Bir dil öğrenmek kolay değildir.", "word": "Learning", "trWord": "öğrenmek", "blank": "___ a language is not easy."},
    {"en": "Translating a text is difficult.", "tr": "Bir metin tercüme etmek zordur.", "word": "Translating", "trWord": "tercüme etmek", "blank": "___ a text is difficult."},
    {"en": "Criticising the work of others is easy.", "tr": "Başkalarının işini eleştirmek kolaydır.", "word": "Criticising", "trWord": "eleştirmek", "blank": "___ the work of others is easy."},
    {"en": "Destroying harmful insects is a long process.", "tr": "Zararlı böcekleri yok etmek uzun bir süreçtir.", "word": "Destroying", "trWord": "yok etmek", "blank": "___ harmful insects is a long process."},
    {"en": "Developing backward countries takes a long time.", "tr": "Geri kalmış ülkeleri geliştirmek uzun zaman alır.", "word": "Developing", "trWord": "geliştirmek", "blank": "___ backward countries takes a long time."},
    {"en": "Growing trees in poor soil is uneconomic.", "tr": "Verimsiz toprakta ağaç yetiştirmek ekonomik değildir.", "word": "Growing", "trWord": "yetiştirmek", "blank": "___ trees in poor soil is uneconomic."},
    {"en": "Distinguishing the different species is a job for the expert.", "tr": "Farklı türleri ayırt etmek uzman işidir.", "word": "Distinguishing", "trWord": "ayırt etmek", "blank": "___ the different species is a job for the expert."},
    {"en": "Estimating cost of production is a job for the expert.", "tr": "Üretim maliyetini tahmin etmek uzman işidir.", "word": "Estimating", "trWord": "tahmin etmek", "blank": "___ cost of production is a job for the expert."},
    {"en": "Using a concentrated solution will give better results.", "tr": "Derişik bir çözelti kullanmak daha iyi sonuçlar verecektir.", "word": "Using", "trWord": "kullanmak", "blank": "___ a concentrated solution will give better results."},
    {"en": "Protecting the tissues from further damage is very important.", "tr": "Dokuları daha fazla hasardan korumak çok önemlidir.", "word": "Protecting", "trWord": "korumak", "blank": "___ the tissues from further damage is very important."},
    {"en": "Maintaining high standards of accuracy requires effort.", "tr": "Yüksek doğruluk standartlarını sürdürmek çaba gerektirir.", "word": "Maintaining", "trWord": "sürdürmek", "blank": "___ high standards of accuracy requires effort."},
    {"en": "Introducing modern methods has increased production and distribution.", "tr": "Modern yöntemleri getirmek üretimi ve dağıtımı artırdı.", "word": "Introducing", "trWord": "getirmek", "blank": "___ modern methods has increased production and distribution."},
    {"en": "Isolating the virus is the first step towards producing a serum.", "tr": "Virüsü izole etmek, serum üretmeye yönelik ilk adımdır.", "word": "Isolating", "trWord": "izole etmek", "blank": "___ the virus is the first step towards producing a serum."},
    {"en": "Repeating vocabulary exercises is a good way to learn words.", "tr": "Kelime egzersizlerini tekrarlamak kelime öğrenmek için iyi bir yoldur.", "word": "Repeating", "trWord": "tekrarlamak", "blank": "___ vocabulary exercises is a good way to learn words."}
]

vocab_updates = {
    "accuracy": "doğruluk / kesinlik",
    "backward": "geri kalmış / geri",
    "concentrated": "derişik / konsantre",
    "criticising": "eleştirmek",
    "destroying": "yok etmek / mahvetmek",
    "different": "farklı",
    "easy": "kolay",
    "estimating": "tahmin etmek / oranlamak",
    "exercises": "egzersizler / alıştırmalar",
    "expert": "uzman",
    "first": "ilk / birinci",
    "further": "daha fazla / ileri",
    "give": "vermek",
    "harmful": "zararlı",
    "important": "önemli",
    "insects": "böcekler",
    "isolating": "izole etmek / yalıtmak",
    "job": "iş / görev",
    "language": "dil / lisan",
    "learn": "öğrenmek",
    "learning": "öğrenmek / öğrenme",
    "long": "uzun",
    "maintaining": "sürdürmek / korumak",
    "others": "diğerleri / başkaları",
    "poor": "verimsiz / fakir / kötü",
    "producing": "üretmek / üretme",
    "repeating": "tekrarlamak / tekrar eden",
    "serum": "serum",
    "takes": "alır / sürer",
    "towards": "-e doğru / -e yönelik",
    "translating": "çevirmek / tercüme etmek",
    "uneconomic": "ekonomik olmayan / verimsiz",
    "using": "kullanmak / kullanma",
    "vocabulary": "kelime bilgisi / kelime",
    "words": "kelimeler"
}

def format_array_to_js(name, data_list):
    js_lines = [f"const {name} = {{", "  1: ["]
    for item in data_list:
        en = item["en"].replace('"', '\\"')
        tr = item["tr"].replace('"', '\\"')
        word = item["word"].replace('"', '\\"')
        trWord = item["trWord"].replace('"', '\\"')
        blank = item["blank"].replace('"', '\\"')
        js_lines.append(f'    {{ en: "{en}", tr: "{tr}", word: "{word}", trWord: "{trWord}", blank: "{blank}" }},')
    js_lines[-1] = js_lines[-1].rstrip(',') # strip comma from last line
    js_lines.append("  ]\n};")
    return "\n".join(js_lines)

new_array_js = format_array_to_js("unit16LessonSentences", unit16_data)

# Read and modify data.js
with open("data.js", "r", encoding="utf-8") as f:
    data_content = f.read()

# Replace raw array
start_marker = "const unit16LessonSentences = {"
end_marker = "const unit17LessonSentences = {"
start_idx = data_content.find(start_marker)
end_idx = data_content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_data = data_content[:start_idx] + new_array_js + "\n\n" + data_content[end_idx:]
    print("Replaced unit16LessonSentences raw array in memory.")
else:
    print("Error: Could not find raw array markers in data.js")
    exit(1)

# Replace mapping in unitSentencesMap
old_map = """  16: {
    1: unit16LessonSentences[1]
  },"""

new_map = """  16: {
    1: { exercises: [
      buildCustom10QuestionExercises(unit16LessonSentences[1], 16, 39, 1, 0),
      buildCustom10QuestionExercises(unit16LessonSentences[1], 16, 39, 2, 4)
    ] }
  },"""

if old_map in new_data:
    new_data = new_data.replace(old_map, new_map)
    print("Replaced unitSentencesMap entries for unit 16.")
else:
    # Try finding "16: {"
    alt_start = new_data.find("  16: {")
    if alt_start != -1:
        alt_end = new_data.find("  },", alt_start)
        if alt_end != -1:
            alt_end += len("  },")
            new_data = new_data[:alt_start] + new_map + new_data[alt_end:]
            print("Replaced map for unit 16 using index.")
        else:
            print("Error: Could not find closing bracket for unit 16 map.")
            exit(1)
    else:
        print("Error: Could not find map section for unit 16.")
        exit(1)

# Update rawTopics description for Unit 16
old_topic = """  {
    title: "XVI. Fiil İsmi (Gerund) + Nesnesi (Özne Olarak) (Sayfa 112)",
    desc: "Fiil isminin (gerund) cümle öznesi olarak kullanımı",
    icon: "🧠",
    numLessons: 1,
    formulas: [
      { formula: "V-ing + Object (Gerund as Subject)", example: "Understanding the problem is crucial: Problemi anlamak çok önemlidir" }
    ],
    subtitles: [
      "A. ...ing + isim (Sayfa 112)"
    ]
  },"""

new_topic = """  {
    title: "XVI. Fiil İsmi (Gerund) + Nesnesi (Özne Olarak) (Sayfa 112)",
    desc: "Fiil isminin (gerund) cümle öznesi olarak kullanımı",
    icon: "🧠",
    numLessons: 1,
    formulas: [
      { 
        formula: "V-ing + Object (Gerund as Subject)", 
        example: "Understanding the problem is crucial: Problemi anlamak çok önemlidir",
        description: "Tercüme Kılavuzu: Bu yapı bir eylem-isim (Gerund) öbeğinin nesne alarak cümlenin öznesi olması durumudur. Cümle, fiile eklenen -ing takısı ile başlar fakat bu durum bir şimdiki zaman eylemi ('yapıyor', 'içiyor') değil, bir isim-fiildir. Çeviri yaparken önce sağdaki nesne okunur, ardından -ing takısı almış kelimeye '-ma, -me' veya '-mak, -mek' eki getirilerek özne grubu tek bir blok halinde toparlanır (Örn: Verileri analiz etmek...). Bu öbek cümlenin öznesi olduğu için, Türkçede de cümlenin en başına yerleşir."
      }
    ],
    subtitles: [
      "A. ...ing + isim (Sayfa 112)"
    ]
  },"""

if old_topic in new_data:
    new_data = new_data.replace(old_topic, new_topic)
    print("Replaced rawTopics for Unit 16.")
else:
    # Try finding title and replace formulas inside
    alt_idx = new_data.find('title: "XVI. Fiil İsmi (Gerund) + Nesnesi (Özne Olarak)')
    if alt_idx != -1:
        # Find closing block
        block_end = new_data.find("  },", alt_idx)
        if block_end != -1:
            block_end += len("  },")
            # Replace the whole block manually
            block_start = new_data.rfind("  {", 0, alt_idx)
            if block_start != -1:
                new_data = new_data[:block_start] + new_topic + new_data[block_end:]
                print("Replaced rawTopics for Unit 16 using block index.")
            else:
                print("Error: Could not find block start for Unit 16 topic.")
                exit(1)
        else:
            print("Error: Could not find block end for Unit 16 topic.")
            exit(1)
    else:
        print("Error: Could not find rawTopic entry for Unit 16.")
        exit(1)

# Write modified data.js
with open("data.js", "w", encoding="utf-8") as f:
    f.write(new_data)
print("Saved data.js successfully.")

# Read and modify app.js
with open("app.js", "r", encoding="utf-8") as f:
    app_content = f.read()

# Locate wordDictionary start
dict_start_marker = "const wordDictionary = {"
dict_idx = app_content.find(dict_start_marker)
if dict_idx != -1:
    insert_pos = dict_idx + len(dict_start_marker)
    vocab_lines = ["\n  // Unit 16 Gerund vocabulary added dynamically"]
    for en_word, tr_word in sorted(vocab_updates.items()):
        en_esc = en_word.replace('"', '\\"')
        tr_esc = tr_word.replace('"', '\\"')
        vocab_lines.append(f'  "{en_esc}": "{tr_esc}",')
    vocab_js = "\n".join(vocab_lines)
    
    new_app = app_content[:insert_pos] + vocab_js + app_content[insert_pos:]
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(new_app)
    print("Saved app.js successfully with 35 new words.")
else:
    print("Error: Could not find wordDictionary in app.js")
    exit(1)

print("Unit 16 successfully updated!")
