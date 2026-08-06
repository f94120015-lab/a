const fs = require('fs');

const raw = fs.readFileSync('scripts/audit-output.json', 'utf8');
const auditData = JSON.parse(raw);

let md = `# 🔍 AMOK 35 BÖLÜM (UNIT) KAPSAMLI VE RİGÖRÖZ ANALİZ RAPORU\n\n`;
md += `**Analiz Tarihi:** 6 Ağustos 2026  \n`;
md += `**Durum:** HİÇBİR KOD/VERİ DOSYASI DEĞİŞTİRİLMEDEN, SADECE SAL-OKUNUR GÜVENLİ İNCELEME  \n`;
md += `**Kapsam:** 35 Bölüm, 180 Ders, 2,689 Soru, 39 Gramer Kuralı  \n\n`;
md += `---\n\n`;

md += `## 📋 I. 35 BÖLÜMÜN DETAYLI TEK TEK İNCELENMESİ\n\n`;

auditData.forEach(u => {
  md += `### Bölüm ${u.orderIndex}: [ID: ${u.unitId}] ${u.title}\n`;
  md += `- **Açıklama:** ${u.desc || 'Açıklama yok'}\n`;
  md += `- **Konu Haritası (rawTopics) Karşılığı:** ${u.matchingRawTopic ? '`' + u.matchingRawTopic + '`' : '⚠️ **TAM EŞLEŞEN BAŞLIK YOK!**'}\n`;

  md += `- **Ders Sayısı:** ${u.lessonCount} ders | **Toplam Soru Sayısı:** ${u.totalQuestions} soru\n`;
  md += `- **İçerdiği Dersler:**\n`;

  u.lessons.forEach((l, lIdx) => {
    md += `  ${lIdx + 1}. **${l.title}** (${l.subtitle || 'Alt başlık yok'})\n`;
    md += `     - Soru Sayısı: ${l.questionsCount} | Alıştırma Sayısı: ${l.exercisesCount}\n`;
    if (l.grammarTags && l.grammarTags.length > 0) {
      md += `     - Gramer Etiketleri: \`${l.grammarTags.join('`, `')}\` \n`;
    }
    if (l.questionTypes && l.questionTypes.length > 0) {
      md += `     - Soru Tipleri: \`${l.questionTypes.join('`, `')}\` \n`;
    }
  });
  md += `\n---\n\n`;
});

md += `## 💡 II. PEDAGOJİK VE MİMARİ MÜKERRERLİK / BİRLEŞTİRME ANALİZİ\n\n`;
md += `Aşağıdaki tabloda 35 bölümün konu içerikleri incelenerek **hangi bölümlerin bağımsız kalması gerektiği**, **hangi bölümlerin mükerrer veya parçalı olup birleştirilmesi gerektiği** detaylandırılmıştır:\n\n`;

md += `| Grup / Tema | Kapsanan Bölüm ID'leri | Mevcut Başlıklar | Değerlendirme & Konsolidasyon Önerisi |\n`;
md += `|---|---|---|---|\n`;
md += `| **1. Temel Cümle & İsim Yapıları** | ID: 6, 1, 3, 2, 7 | Temel Yapılar, İsim & Edat Yapıları, İsim Tamlaması, Fiil & Edat Yapıları, Özne-Fiil-Nesne | **Birleştirilebilir:** Temel cümle dizilimi ve isim/fiil-edat tamlamaları 2 ana modülde konsolide edilebilir. |\n`;
md += `| **2. Modallar & Kipler** | ID: 70, 104, 103 | Saf Modallar, Yarı-Modallar, Öbeksel Kipler | **Birleştirilebilir:** Saf ve yarı-modallar pedagojik olarak kipleşme çatısı altında toplanabilir. |\n`;
md += `| **3. Zamanlar & Zaman Uyumları** | ID: 102, 101 | Zaman Zarfları ve Tense Uyumu, By the time / Since / It is time | **Konsolide Edilmeli:** Zaman zarf ipuçları ve zaman bağlaç matrisleri tek bir 'Zaman Zarfları, Bağlaçları & Tense Uyumu' ünitesinde birleşmeli. |\n`;
md += `| **4. Tercihler & Rica/İzin** | ID: 13, 17 | Ara Bölüm 2: Tercih Yapıları, Ara Bölüm 3: Rica & İzin | **Birleştirilebilir:** İletişimsel modal yapıları tek bir 'Sosyal İşlevli Yapılar (Tercih, Rica, İzin)' ünitesi yapılabilir. |\n`;
md += `| **5. Edilgen Yapılar (Passives)** | ID: 10 | Edilgen Yapılar ve Edilgen Mastarı | **Bağımsız Kalmalı:** Edilgen çatı ve edilgen mastar 3 derse indirgenmiş, bağımsızlığı idealdir. |\n`;
md += `| **6. Bağlaçlar & Cümle Geçişleri** | ID: 22, 40, 32 | Cümle Bağlaçları, Bağlaçlar, Zarf Cümlecikleri | **Konsolide Edilmeli:** İsim alan edatlar, cümle alan bağlaçlar ve noktalama refleksli geçiş zarfları 3 gramer izolasyon dersi olarak birleştirilmelidir. |\n`;
md += `| **7. Gerund & Infinitive & Reductions** | ID: 14, 35, 66 | Gerund & Infinitive, YÖKDİL Kısaltma Master Class, Sınav Kestirmeleri | **Düzenlenmeli:** Gerund/Infinitive temel anlatımı ile ileri düzey kısaltma (reduction) ve sınav kestirmeleri kademeli 2 ana seviyeye ayrılmalıdır. |\n`;
md += `| **8. İleri Düzey Sentaks & Devriklik** | ID: 36, 37, 38, 39, 43, 49 | Hedging, Advanced Relative Clauses, Master Inversion, Multi-Element Chains, Uzun Yüklem Öbekleri | **Yüksek Akademik Kalite:** Bu bölümler YÖKDİL/YDS için özel tasarlanmış, içerikleri oldukça zengin, yapısal olarak korunmalıdır. |\n`;
md += `| **9. Kelime & Sınav Simülasyonu** | ID: 57, 52, 50 | Deyimsel Fiiller, İhtimal Modalları/Subjunctive, Paragraf Okuma | **Bağımsız Kalmalı:** Deyimsel fiiller (148 soru) ve sınav simülasyonları son etap olarak bağımsız kalmalıdır. |\n\n`;

fs.writeFileSync('/Users/faruknafizfazlioglu/.gemini/antigravity-ide/brain/4f02363a-1bbf-4fe2-8ce4-6cfbe5da729b/full_35_units_audit.md', md);
console.log('Full report generated.');
