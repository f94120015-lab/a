import re

file_path = "/Users/faruknafizfazlioglu/Desktop/amok/data.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

target = '"id": 3,'
new_edit = '''      {
        "date": "2026-07-27T03:15:00+03:00",
        "desc": "Bölüm Yeniden Tasarımı: İsim Tamlamaları ünitesi Beşeri Bilimler, İktisat, Hukuk, Sinema, Tarih, Sosyoloji ve Psikoloji tematiğine uygun kelimelerle yeniden kurgulandı. Bölüm 2 kelimelerinin %50'den fazlası bu bölümde yeniden kullanılarak spiralleşme sağlandı, tüm sorulara standart grammarTags eklendi.",
        "type": "custom"
      },'''

pattern = r'("id": 3,\s*"startLessonId": 10,\s*"originalIndex": 3,\s*"edits": \[\s*)'
replacement = r'\1' + new_edit + '\n'

updated = re.sub(pattern, replacement, content, count=1)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(updated)

print("Updated edits metadata in data.js successfully!")
