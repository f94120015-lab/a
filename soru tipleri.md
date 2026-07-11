# AMOK Soru Tipleri ve Tarzları Dökümü

Bu belgede, uygulamada kullanılan tüm interaktif soru tiplerinin açıklamaları, pedagojik hedefleri ve kaynak kod içerisindeki render fonksiyonlarına yönlendiren köprüler listelenmiştir.

---

### 1. [Çoktan Seçmeli (multiple-choice)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L4101)
* **Açıklama:** Klasik 4 şıklı seçenek havuzu oluşturur.
* **Kullanımı:** Verilen İngilizce cümlenin en uygun Türkçe karşılığını seçmek için kullanılır. İngilizce kelimelerin üzerine gelindiğinde Türkçe anlamlarını gösteren ipucu (hover) özelliği etkindir.

### 2. [Bağlantı Kilidi (collocation-matching)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L5827)
* **Açıklama:** Eşleştirme tabanlı kelime ve edat grupları eşleştirme kart oyunudur.
* **Kullanımı:** Karışık yerleştirilmiş 8 kart arasından sıfat/fiil ile doğru edat+gerund grubunu (örneğin: `responsible` + `for distributing`) eşleştirmek için kullanılır. Doğru eşleşen kartlar yeşile döner, yanlış eşleşmelerde kırmızı renkte sallantı animasyonu tetiklenir.

### 3. [Kelime/Kalıp Eşleştirme (matching)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L4794)
* **Açıklama:** İki sütunlu klasik terim/anlam eşleştirme oyunudur.
* **Kullanımı:** Sol taraftaki İngilizce kelimeleri veya kalıpları, sağ taraftaki Türkçe karşılıklarıyla çizgi çekerek veya seçerek eşleştirmek amacıyla kullanılır.

### 4. [Açılır Menülü Boşluk Doldurma (fill-blank-dropdown)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L4863)
* **Açıklama:** Cümle içinde boş kalan yere konumlanan seçim kutusudur.
* **Kullanımı:** Cümle akışında boş bırakılan kısımlara tıklandığında açılan şık bir seçim menüsünden en uygun edatı veya dil bilgisi takısını seçerek cümleyi tamamlamayı sağlar.

### 5. [Butonlu Boşluk Doldurma (fill-blank)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L4919)
* **Açıklama:** Cümledeki boşluğun altındaki şık butonlarından biriyle doldurulmasıdır.
* **Kullanımı:** Cümle içindeki boşluk vurgulu bir çizgiyle gösterilir, alttaki seçenek butonlarından doğru olana tıklandığında kelime animasyonla boşluğun yerine yerleşir.

### 6. [Yazarak Boşluk Doldurma (fill-blank-text)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L4895)
* **Açıklama:** Serbest klavye girdisi isteyen boşluk doldurma tipidir.
* **Kullanımı:** Cümledeki boşluğa uygun olan kelime veya takıyı kullanıcının doğrudan klavyeyle yazmasını bekler.

### 7. [Kelime Vagonu (word-bank)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L4664)
* **Açıklama:** Kelime/öbek vagonlarını sırayla dizerek cümle oluşturma oyunudur.
* **Kullanımı:** Verilen İngilizce cümlenin Türkçe karşılığını oluşturmak üzere aşağıdaki kelime vagonlarına sırasıyla tıklayarak anlamlı bir bütün inşa etmeyi hedefler.

### 8. [Çeviri Yazma (translation-text)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L4980)
* **Açıklama:** Serbest yazılı çeviri alanıdır.
* **Kullanımı:** Verilen İngilizce cümleye karşılık Türkçe çevirinin klavye ile doğrudan yazılmasını ister. Alternatif kabul edilen çevirilerle esnek bir karşılaştırma yapar.

### 9. [Devrik Cümle Dönüştürücü (inversion-transformer)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L4190)
* **Açıklama:** Yapısal dönüştürme ve cümle biçimlendirme kartlarıdır.
* **Kullanımı:** Düz akademik cümleleri, sunulan şıklar arasından doğru olanı seçerek devrik (inverted) akademik kalıplara dönüştürmek için kullanılır.

### 10. [Noktalama ve Yapı Kontrolü (punctuation-check)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L4235)
* **Açıklama:** Noktalama işaretlerine duyarlı çoktan seçmeli sorulardır.
* **Kullanımı:** Cümle içindeki noktalı virgül, virgül gibi noktalama işaretlerini analiz ederek boşluğa gelmesi gereken en uygun bağlacı bulmaya yöneliktir.

### 11. [Gramer Yapısı Eşleştirme (structure-match)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L4275)
* **Açıklama:** Yapısal uyum ve sentaks testidir.
* **Kullanımı:** Cümlenin özne-fiil uyumu ve edat gereksinimlerine göre en doğru bağlacı veya kelime yapısını bulmayı amaçlar.

### 12. [Deyim İnşa Etme (idiom-builder)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L4307)
* **Açıklama:** Karışık kelimelerden deyim oluşturma modelidir.
* **Kullanımı:** Türkçe anlamı verilen akademik deyimi aşağıdaki kelimelere doğru sırayla tıklayarak oluşturmak için kullanılır.

### 13. [Çoklu Boşluk Doldurma (multiple-fill-blank)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L5082)
* **Açıklama:** Tek bir cümlede birden fazla boşluk içeren yapılardır.
* **Kullanımı:** Cümlenin farklı noktalarında bırakılan 2 veya 3 boşluğu, sunulan kelime havuzundaki doğru kelimelerle doldurmayı hedefler.

### 14. [Doğru / Yanlış (true-false)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L5182)
* **Açıklama:** Bilgi ve kural doğrulama kartıdır.
* **Kullanımı:** Sunulan dil bilgisi kuralı veya çeviri eşleşmesinin doğruluğunu hızlıca test eder.

### 15. [Projektör Modu (spotlight)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L5294)
* **Açıklama:** Cümle üzerinde kelime seçme oyunudur.
* **Kullanımı:** Öğrenciden cümlenin içindeki belirli dil bilgisi rollerine sahip (örn. edat, zarf, bağlaç) kelimeleri doğrudan cümle üzerine tıklayarak bulmasını ister.

### 16. [Kaydırma Kartları (swipe)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L5444)
* **Açıklama:** Tinder benzeri kart kaydırma refleks mekanizmasıdır.
* **Kullanımı:** Hızlı refleks ölçümü için ekrana gelen bilgilerin doğruluğuna göre kartı sağa (doğru) ya da sola (yanlış) kaydırmayı sağlar.

### 17. [Hız Tüneli (reflex-blitz)](file:///Users/faruknafizfazlioglu/Desktop/amok/app.js#L5597)
* **Açıklama:** Zaman kısıtlı hızlı tepki verme oyunudur.
* **Kullanımı:** Süreli refleks ölçümleri yaparak öğrencinin gramer yapılarını hızlıca tanımasını ve kelime-işlev reflekslerini pekiştirmesini sağlar.
