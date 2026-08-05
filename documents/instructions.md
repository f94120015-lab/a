# AMOK Proje Kuralları, Teknik Mimari & Müfredat Üretim Protokolü (instructions.md)

Bu dosya, **amok** projesinde geliştirme yapacak, müfredat düzenleyecek veya yeni ders/soru içerikleri üretecek tüm yapay zeka asistanları (Antigravity vb.) ve yazılım mimarları için **birincil anayasa ve referans kılavuzudur**. Her yeni oturum açıldığında bu dosyadaki kurallar, yazılımsal sınırlar ve müfredat üretim protokolleri otomatik olarak okunmalıdır.

---

## 1. Uygulama Genel Bakış (Overview)
*   **Adı:** amok (Akademik Metinleri Okuma Kılavuzu)
*   **Amacı:** Türkçe konuşan kullanıcılar için oyunlaştırılmış ve basitten karmaşığa doğru sıralanmış akademik İngilizce öğrenim platformu.
*   **Teknoloji Yığını (Tech Stack):**
    *   **Core:** Vanilla HTML5 ve Vanilla Javascript (`app.js`).
    *   **Veri Yapısı:** Tamamen istemci tarafında (local) çalışan statik veri kümesi (`data.js`).
    *   **Tasarım & Stil:** Saf CSS (`style.css`). *Kesinlikle Tailwind veya harici CSS kütüphaneleri kullanılmaz.*
    *   **Dağıtım/Derleme:** Mobil uyumluluk için **Capacitor** entegrasyonu vardır (`capacitor.config.json`).

---

## 2. Veri Yönetimi & State Yapısı

### Yerel Veri Kaynağı (`data.js`)
*   Uygulamanın tüm kelime sözlüğü (`wordDictionary`), üniteler ve ders içerikleri (`unitSentencesMap` / `unit6Lesson1SentencesRaw` vb.) bu dosyada statik olarak tutulmaktadır.
*   **Dosya Boyutu Uyarısı:** `data.js` dosyası oldukça büyüktür (~9.7 MB). Bu dosyayı düzenlerken tüm dosya içeriğini baştan yazmak yerine sadece ilgili satırları veya hedeflenen ders nesnelerini değiştiren seçici araçları kullanın.

### Durum Yönetimi (State - `app.js`)
*   Uygulama genel durumu `state` adında bir global nesnede tutulur ve `localStorage` üzerinde `amok_state_v1` anahtarı altında senkronize edilir.
*   Kullanıcı giriş bilgileri `amok_users_v1` anahtarında saklanır.
*   **Kritik Değişkenler:**
    *   `state.hearts`: Kullanıcı canı (Max: 5).
    *   `state.xp`: Kazanılan toplam puan.
    *   `state.streak`: Günlük aktiflik serisi.
    *   `state.wrongQuestions`: Akıllı Tekrar (Review) için kullanıcının yanlış yaptığı soruların id listesi.

---

## 3. Geliştirme & Teknik Mimari Kuralları

### Kural 1: Harici API ve Veritabanı Kullanımı
*   Uygulama tamamen yerel (cihaz içi) ve çevrimdışı çalışabilecek şekilde tasarlanmıştır. 
*   Kullanıcı verileri, ilerlemeler ve puanlar yerel `localStorage` üzerinde yönetilir. Canlı sunucu sorguları (API/DB) yerine her zaman yerel state ve `data.js` verileri kullanılmalıdır.

### Kural 2: Tasarım ve Stil İlkeleri
*   Tasarım dili; gradyan arka planlar, hareketli ışık küreleri (`bg-glow-ball`) ve modern kart tasarımları üzerine kuruludur.
*   Renk temaları (Canva, Mint, Sakura, Sunset, Gold) CSS değişkenleri (CSS Variables) ile `style.css` üzerinden yönetilir. Yeni bir bileşen eklendiğinde doğrudan renk atamak yerine CSS değişkenleri kullanılmalıdır.

### Kural 3: Müfredat ve Ders Kontrolü
*   Ders bütünlüğünü kontrol etmek için `check-lessons.js` betiği kullanılmalıdır.
*   Yeni bir ünite veya ders eklendiğinde terminalde `npm run status` komutu çalıştırılarak ders ağacında boşluk veya hata olup olmadığı denetlenmelidir.

---

## 4. MASTER MÜFREDAT VE BÖLÜM YENİDEN YAPILANDIRMA PROTOKOLÜ

Herhangi bir bölümü yeniden düzenlerken veya yeni ünite üretirken aşağıdaki 4 aşamalı protokol eksiksiz uygulanacaktır:

### AŞAMA 1: ÖN BÖLÜM ANALİZİ VE ELEŞTİREL İNCELEME
İçerik üretimine başlamadan önce ilgili bölümü şu 5 kriter açısından analiz et ve sonuçları raporla:
1. **Tekrar Analizi:** Bölüm içeriği veya hedeflenen yapılar müfredatın diğer bölümlerinde gereksiz yere tekrarlanıyor mu?
2. **İdeal Konumlandırma:** Bölümün uygulamadaki sırası basitten karmaşığa bilişsel yük eğrisine uygun mu?
3. **Yetkinlik & Soru Tipi Yeterliliği:** Bölüm yapıyı kazandırmakta yetkin mi, soru tipleri yeterli çeşitlilikte mi, soruların akademik seviyeye çekilmesi gerekiyor mu?
4. **Doğrudan Başlıklandırma:** Genel ve jenerik başlıklar yerine içerikte doğrudan sınanan dilbilgisi yapısının açık adını yaz (Örn: *"Sebep-Sonuç ve Zıtlık Bağlaçları"*).
5. **Arayüz Temizliği (Gereksiz Kutu Yasağı):** Eğer dersin özgün bir formülü, kelime listesi veya özel açıklaması yoksa arayüzdeki jenerik *"Ders Odak Noktası: Boşluk doldurma..."* kutusunu kesinlikle gösterme.

---

### AŞAMA 2: PEDAGOJİK VE MÜFREDAT YAPILANDIRMA İLKELERİ

1. **Dinamik Ders ve Alıştırma Mimarisi:**
   - **Dinamik Soru Sayısı:** Dersin pedagojik derinliğine ve bölümün yapısına göre soru sayısı dersten derse ve bölümden bölüme esneklik gösterebilir (genellikle ders başına 10 ila 30 soru arasında, konunun gereksinimine göre belirlenir).
   - **Alıştırma Setleri:** Soru sayısı ne olursa olsun alıştırma 2 veya daha fazla dengeli sete ayrılır (Set 1: Yapısal Giriş, Set 2/3: Akademik Analiz & Çeviri Sentezi).
   - Sorular kısa metinden uzana (kelime/karakter uzunluğuna göre) artan zorlukta sıralanmalıdır.

2. **Kapsam Sınırı ve Kümülatif Spiralleşme:**
   - **Strictly Bounded Scope:** Daha önce öğretilmemiş veya hedeflenen konunun kapsamına girmeyen hiçbir dilbilgisi kuralını cümleye dahil etme; varsa içerikten çıkar.
   - **%20–%30 Spiralleşen Kelime Tekrarı:** Önceki bölümlerde işlenen akademik kelimelerin yaklaşık %20–%30'u bu bölümde pekiştirilmelidir (yeni kelimeler ve yapılara yeterli alan açmak için). Kelimeler birebir aynı kalıplarla değil; yeni akademik isim tamlamaları (Compound Nouns) ve edat takımları (Prepositional Phrases) oluşturularak kullan.
   - **Tematik Bağlam (Akademik & Beşeri Bilimler):** Kelime kadrosu ve cümle örnekleri; tarih, felsefe, sosyoloji, psikoloji, hukuk, iktisat, siyaset bilimi, antropoloji, iletişim, sanat tarihi, arkeoloji, dilbilim (linguistics), tıp/nörobilim tarihi ve çevre bilimleri gibi geniş akademik ve beşeri bilimler disiplinlerinden seçilmelidir.
   - **Dereceli Dilbilgisel Bileşen Kullanımı (N Setli Yapı):** 
     * *Giriş Setlerinde (Öbek Düzeyi):* Hedef kalıbı/yapıyı yalın ve net kavratmak için cümleler sade tutulur.
     * *Orta/Gelişme Setlerinde (Cümle Düzeyi):* Hedef yapının yanına kademeli olarak İsim Tamlamaları (Compound Nouns) ve Edat Yapıları (Prepositional Phrases) eklenmeye başlar.
     * *İleri/Sentez Setlerinde (Akademik & Spiralleşme Düzeyi):* Tüm bu bileşenler karmaşık akademik cümleler ve geçmiş konuların spiralleşmesiyle tam sentez halinde sunulur.

3. **Soru Tipi Çeşitliliği, Interleaving ve Arayüz Mekanikleri:**
   - **Interleaving (Ardışık Soru Tipi Yasağı):** Alıştırma seti içerisinde üst üste aynı soru tipi kesinlikle kullanılamaz (Greedy Interleaving).
   - **Uygulanabilir Tüm AMOK Soru Tipleri (Uygulama Veri Altyapısındaki 18+ İnteraktif Tip):**
     * *Seçenekli & Çeviri:* `multiple-choice` (İng-Tr çoktan seçmeli), `fill-blank-dropdown` (açılır menü), `fill-blank` (butonlu boşluk doldurma), `fill-blank-text` (yazarak boşluk doldurma), `multiple-fill-blank` (çoklu boşluk doldurma), `true-false` (doğru/yanlış).
     * *Sıralama & İnşa:* `word-bank` (dilbilgisel öbek vagonu), `idiom-builder` (deyim inşa etme), `inversion-transformer` (devrik cümle dönüştürücü), `translation-text` (yazılı serbest çeviri - alıştırma sonu en fazla 2 adet).
     * *Eşleştirme & Uyum:* `matching` (klasik terim eşleştirme), `collocation-matching` (bağlantı kilidi), `structure-match` (yapısal uyum), `punctuation-check` (noktalama ve bağlaç denetimi).
     * *İnteraktif & İleri Mekanikler:* `swipe` (Tinder kart kaydırma/Debugger), `error-finder` (hata avcısı - hatalı öbeğe tıklama), `spotlight` (projektör - cümlede edat/zarf bulma), `preposition-magnet` (edat mıknatısı - Drag&Drop), `reflex-blitz` (hız tüneli - 3sn zaman barı/combo), *Two-Phase Translation Gate* (boşluk doldurma sonrası çeviri geçidi).

4. **Şık Dağılımı ve Usta İşli Çeldirici Tasarımı:**
   - Çoktan seçmeli/seçenekli sorularda doğru cevaplar A, B, C ve D şıkları arasında %25 eşit (homojen) dağıtılmalıdır.
   - Kolay elenen/ilgisiz şıklar YASAKTIR. Çeldiriciler; hedef yapının edat/çatı/zaman bükümlerini içeren, aynı kelime kökü üzerinden etken/edilgen ya da özne/nesne kayması yaşatan usta işi çeldiriciler olmalıdır.

5. **Tipografi ve HTML Ekran Formatı:**
   - Yönerge metni ile soru cümleleri tipografik olarak ayrılmalıdır.
   - Soru ve örnek cümleler kullanıcı ekranında okunaklı ve alt satırda ferah duracak şekilde şu HTML formatıyla sunulmalıdır:
     `<br><br><span style="color: #4a90e2; font-weight: bold;">"..."</span>`

6. **Çok Katmanlı Etiketleme (Multi-Tag & `grammarTags` Standartları):**
   - Her soru için etiket yapısı:
     `"multiTag": ["[Ünite/Konu Adı]", "[Grammar Topic In English]", "İsim Tamlamaları", "İsim ve Edat Yapıları"]`
   - **`grammarTags` Katı Kuralları:**
     - `grammarTags` dizisine **SADECE VE SADECE resmî akademik dil bilgisi terimleri** (*"Cümle Bağlaçları"*, *"Geçiş Kelimeleri"*, *"Edilgen Yapı (Passive)"*, *"Koşul Cümlecikleri (If Clauses)"*) yazılabilir.
     - Arayüz mekanikleri (*"Kelime Bankası"*, *"Özgür Çeviri"*), temalar (*"Beşeri Bilimler"*) veya jenerik alt başlıklar YASAKTIR.

---

## 5. TEKNİK ENTEGRASYON VE ÇIKTI STANDARTLARI (`data.js` & `app.js`)

1. **Cümle Nesnesi Yapısı:**
   - `en`: İngilizce cümlenin tamamı.
   - `tr`: Türkçe cümlenin tamamı.
   - `word`: Hedef kritik kelime/yapı.
   - `trWord`: Hedef kelimenin Türkçe karşılığı.
   - `blank`: Hedef kelime yerine `___` konulmuş hali.
   - `blocks`: Dilbilgisel öbeklere ayrılmış dizi.
   - `translation`: Tam Türkçe çevirisi.
   - `enSentence` ve `isEngToTr: true`: Çoktan seçmeli çevirilerde hover-tooltip sözlük desteği için zorunlu.
2. **Sözlük Entegrasyonu:**
   - Geçen tüm yeni kelimeler `app.js` içerisindeki `wordDictionary` nesnesine alfabetik sıraya uygun eklenmelidir.
3. **Doğrulama ve Derleme:**
   - `npm run status` (hata/boşluk kontrolü) ve `npm run build` (derleme) işlemleri temiz şekilde yürütülmelidir.

---

## 6. SÜREÇ SONU RAPORLAMA FORMATI
Tüm içerik üretimi ve entegrasyon işlemleri tamamlandıktan sonra çıktının en sonunda yapılan düzenlemeleri Türkçe olarak şu başlıklarla maddeler halinde raporla:
1. *Analiz Özeti (Tekrar & Konum Değerlendirmesi)*
2. *Güncellenen Başlıklar ve Arayüz Kutusu Kararları*
3. *Beşeri Bilimler Kelime Kadrosu & %20-%30 Tekrar Oranı*
4. *Soru Tipi Dağılımı (Interleaving ve Bloklama)*
5. *Şık Homojenliği (%25 Dağılım) & Çeldirici Doğrulaması*
6. *Etiket (Multi-Tag & `grammarTags`) Denetimi*

---

## 7. YEREL DOĞRULAMA VE ÇALIŞTIRMA KOMUTLARI
* **Geliştirici Sunucusu:** Uygulamayı yerel tarayıcıda çalıştırmak için terminalde `npm start` komutu verilir (Varsayılan port: `3000`).
* **Ders Ağacı Kontrolü:** Terminalde `npm run status` komutu ile eksik soru veya ders tespiti yapılır.
* **Build İşlemi:** Capacitor çıktıları öncesinde `npm run build` komutu ile dosyalar `www/` klasörüne kopyalanıp minified edilir.
