# Global Quiz Cümle Font Ayarı Standartları

Bu döküman, quiz ekranında yer alan cümle fontlarının tüm soru tiplerinde standartlaştırılmış görsel kurallarını açıklar.

## Hedef
Soru türünden bağımsız olarak (Çoktan Seçmeli, Kelime Vagonu, Boşluk Doldurma, Çeviri Yazma vb.) soru metinlerinin font boyutlarının küçülmesini engellemek ve arayüzde görsel bütünlük sağlamak.

## Standart Arayüz Kuralları
- **Font Boyutu (Font Size):** `1.25rem` (Tüm soru tiplerinde cümleler aynı büyüklükte gösterilir).
- **Yazı Tipi Modu (Font Style):** `normal` (İtalik/eğik yazı biçimi standartlaştırılma amacıyla kaldırılmıştır).
- **Yazı Kalınlığı (Font Weight):** `500` (Metinlerin rahat okunması amacıyla orta kalınlıktadır).
- **Yazı Rengi (Font Color):** `var(--text-primary)` (Karanlık/Aydınlık temaya uyumlu birincil metin rengi).
- **Satır Yüksekliği (Line Height):** `1.6` (Uzun cümlelerde satır aralarının ferah olması için).

## Uygulama Metodu
Aşağıdaki CSS kuralları `style.css` içerisinde tanımlanarak tüm quiz ekranı genelinde standartlaştırılmıştır:

```css
/* Global Quiz Sentence Font Normalization Override */
#quiz-screen .quiz-translation {
  font-size: 1.25rem !important;
  font-style: normal !important;
  font-weight: 500 !important;
  color: var(--text-primary) !important;
  line-height: 1.6 !important;
}

#quiz-screen .spotlight-paragraph-container {
  font-size: 1.25rem !important;
}
```
