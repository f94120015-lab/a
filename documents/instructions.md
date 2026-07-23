# AMOK Proje Kuralları & Talimatları (instructions.md)

Bu dosya, **amok** projesinde geliştirme yapacak yapay zeka asistanları (Antigravity vb.) ve yazılım mimarları için bir referans kılavuzudur. Her yeni oturum açıldığında bu dosyadaki kurallar ve mimari yapı okunmalıdır.

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

## 3. Geliştirme & Mimari Kurallar

### Kural 1: Harici API ve Veritabanı Kullanımı
*   Uygulama tamamen yerel (cihaz içi) ve çevrimdışı çalışabilecek şekilde tasarlanmıştır. 
*   Kullanıcı verileri, ilerlemeler ve puanlar yerel `localStorage` üzerinde yönetilir. Canlı sunucu sorguları (API/DB) yerine her zaman yerel state ve `data.js` verileri kullanılmalıdır.

### Kural 2: Tasarım ve Stil İlkeleri
*   Tasarım dili; gradyan arka planlar, hareketli ışık küreleri (`bg-glow-ball`) ve modern kart tasarımları üzerine kuruludur.
*   Renk temaları (Canva, Mint, Sakura, Sunset, Gold) CSS değişkenleri (CSS Variables) ile `style.css` üzerinden yönetilir. Yeni bir bileşen eklendiğinde doğrudan renk atamak yerine CSS değişkenleri kullanılmalıdır.

### Kural 3: Müfredat ve Ders Kontrolü
*   Ders bütünlüğünü kontrol etmek için `check-lessons.js` betiği kullanılmalıdır.
*   Yeni bir ünite veya ders eklendiğinde terminalde `npm run status` komutu çalıştırılarak ders ağacında boşluk veya hata olup olmadığı denetlenmelidir.

### Kural 4: İçerik Oluşturma, Beşeri Bilimler Teması & Gramer Etiketleme Standartları
*   **Tematik Bağlam (Beşeri Bilimler):** Tüm soru, alıştırma, kelime ve cümle içeriklerinde metinlerin, örneklerin ve kelime öbeklerinin **beşeri bilimler (tarih, felsefe, sosyoloji, edebiyat, psikoloji, sanat tarihi vb.)** alanından seçilmesi temel kuraldır.
*   **Spiralleşme / Tekrar Prensibi:** Her yeni bölüm veya alıştırma setinde, öğrenmeyi pekiştirmek adına önceki bölümlerde öğrenilen kelime ve kalıpların bir kısmı mutlaka tekrar dahil edilmelidir.
*   **Yeni Kelime Ekleme:** Geçmiş kelimeler pekiştirilirken, her yeni bölümde müfredata uygun yeni beşeri bilimler kelimeleri ve akademik yapılar da eklenmelidir.
*   **Gramer Etiket Standartları (`grammarTags` Kesin Kuralı):**
    *   `grammarTags` dizisine **KESİNLİKLE** soru türü veya arayüz mekaniği (*"Özgür Çeviri"*, *"Kelime Bankası"*, *"Eşleştirme"*, *"Akademik Cümle"*, *"Çeviri Dizilimi"*, *"Hızlı Çeviri"*) YAZILAMAZ.
    *   Etiketler **SADECE VE SADECE** dil bilgisi konularını ve pekiştirilen gramer yapılarını içermelidir.
    *   **Etiket Formatı:** `["[Mevcut Gramer Konusu]", "[Spiralleşen/Önceki Gramer Konusu]"]`
    *   *Örnek Doğru Kullanım:* `["Fiil + Edat (Describe...in)", "Önceki Konu: To Be Yapısı"]`
    *   *Örnek Yanlış Kullanım:* `["Kelime Bankası", "Özgür Çeviri"]` (YASAK)

---

## 5. Yerel Doğrulama ve Çalıştırma
*   **Geliştirici Sunucusu:** Uygulamayı yerel tarayıcıda çalıştırmak için terminalde `npm start` komutu verilir. (Varsayılan port: `3000`).
*   **Build İşlemi:** Capacitor platformlarına çıktı vermeden önce `npm run build` komutu ile dosyalar `www` klasörüne kopyalanır.

