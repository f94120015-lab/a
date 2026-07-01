const fs = require('fs');

const dataPath = '/Users/faruknafizfazlioglu/Desktop/amok/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

const targetStr = `          {
            id: "u33l134_ex5_q15",
            type: "true-false",
            prompt: "Mekanik: Doğruysa sağa kaydır (veya SAĞ tuş), yanlışsa sola kaydır (veya SOL tuş)!",
            englishPhrase: "resolve these structural issues",
            turkishTranslation: "bu yapısal sorunları çözmek",
            correctAnswer: true,
            explanation: "resolve these structural issues 'bu yapısal sorunları çözmek' demektir."
          }
        ]
      }`;

const exercise6 = `          {
            id: "u33l134_ex5_q15",
            type: "true-false",
            prompt: "Mekanik: Doğruysa sağa kaydır (veya SAĞ tuş), yanlışsa sola kaydır (veya SOL tuş)!",
            englishPhrase: "resolve these structural issues",
            turkishTranslation: "bu yapısal sorunları çözmek",
            correctAnswer: true,
            explanation: "resolve these structural issues 'bu yapısal sorunları çözmek' demektir."
          }
        ]
      },
      {
        id: "u33l134ex6",
        title: "Alıştırma 6: Ek Köprüsü (Suffix Bridge)",
        description: "İngilizce cümlenin vurgulanmış kısmını Türkçe karşılığına bağlayan en uygun eki/edatı seçin.",
        questions: [
          {
            id: "u33l134_ex6_q1",
            type: "multiple-choice",
            prompt: '<strong>İngilizce:</strong> "...bottlenecks <strong>from</strong> loose query loops..."<br><br><strong>Türkçe:</strong> "Gevşek sorgu döngülerinden <strong>_______</strong> ciddi çalışma zamanı darboğazları..."',
            options: ["kaynaklanan", "dolayı", "rağmen"],
            correctIndex: 0,
            explanation: "from edatı, buradaki bağlamda 'gevşek sorgu döngülerinden kaynaklanan darboğazlar' köprüsünü kurmaktadır."
          },
          {
            id: "u33l134_ex6_q2",
            type: "multiple-choice",
            prompt: '<strong>İngilizce:</strong> "...migration <strong>is</strong> a complex endeavor..."<br><br><strong>Türkçe:</strong> "Modern platform geçişi karmaşık bir girişim<strong>_______</strong>..."',
            options: ["-dir", "-e doğru", "-den beri"],
            correctIndex: 0,
            explanation: "is yardımcı fiili, ek-fiil olan '-dir' bildirme ekini sağlar."
          },
          {
            id: "u33l134_ex6_q3",
            type: "multiple-choice",
            prompt: '<strong>İngilizce:</strong> "...database <strong>remains</strong> highly unstable...\"<br><br><strong>Türkçe:</strong> \"Bulut veritabanı oldukça kararsız kal<strong>_______</strong>..."',
            options: ["-maya devam etmektedir", "-acaktır", "-malıydı"],
            correctIndex: 0,
            explanation: "remains eylemi durumun sürmesini bildirir ve '-maya devam etmektedir / kalmaktadır' anlamı verir."
          },
          {
            id: "u33l134_ex6_q4",
            type: "multiple-choice",
            prompt: '<strong>İngilizce:</strong> "...discrepancies <strong>inside</strong> the repository..."<br><br><strong>Türkçe:</strong> "Deponun <strong>_______</strong> veri formatlama tutarsızlıkları..."',
            options: ["içindeki", "üstündeki", "sayesinde"],
            correctIndex: 0,
            explanation: "inside edatı, Türkçe isim tamlamasına '-in içindeki' sıfat yapan ek köprüsünü kurar."
          },
          {
            id: "u33l134_ex6_q5",
            type: "multiple-choice",
            prompt: '<strong>İngilizce:</strong> "...<strong>under</strong> severe simulation stress..."<br><br><strong>Türkçe:</strong> "Ciddi simülasyon stresi <strong>_______</strong>..."',
            options: ["altında", "yüzünden", "boyunca"],
            correctIndex: 0,
            explanation: "under edatı burada mecazi bir durum bildirerek '-in altında' köprüsünü oluşturur."
          },
          {
            id: "u33l134_ex6_q6",
            type: "multiple-choice",
            prompt: '<strong>İngilizce:</strong> "...<strong>trigger</strong> extensive compilation errors..."<br><br><strong>Türkçe:</strong> "Kapsamlı derleme hatalarını <strong>_______</strong>..."',
            options: ["tetikler", "tetikleyerek", "tetikledikten sonra"],
            correctIndex: 0,
            explanation: "trigger cümlenin ana fiili olduğu için Türkçe yüklem ekini (-ler) alır."
          },
          {
            id: "u33l134_ex6_q7",
            type: "multiple-choice",
            prompt: '<strong>İngilizce:</strong> "...collapse <strong>of</strong> the central infrastructure..."<br><br><strong>Türkçe:</strong> "Merkezi altyapı<strong>_______</strong> ani çöküşü..."',
            options: ["-nın", "-ya", "-dan"],
            correctIndex: 0,
            explanation: "of edatı, belirtili isim tamlamasındaki '-nın' ilgi (iyelik) ekini sağlar."
          },
          {
            id: "u33l134_ex6_q8",
            type: "multiple-choice",
            prompt: '<strong>İngilizce:</strong> "...<strong>leads to</strong> catastrophic database corruption..."<br><br><strong>Türkçe:</strong> "Yıkıcı veritabanı bozulmasına yol <strong>_______</strong>..."',
            options: ["açar", "açtıktan sonra", "açmak üzere"],
            correctIndex: 0,
            explanation: "leads to (yol açar) geniş zamanlı ana yüklemdir."
          },
          {
            id: "u33l134_ex6_q9",
            type: "multiple-choice",
            prompt: '<strong>İngilizce:</strong> "...<strong>contribute</strong> directly <strong>to</strong> transaction failures..."<br><br><strong>Türkçe:</strong> "İşlem başarısızlıklarına doğrudan katkıda <strong>_______</strong>..."',
            options: ["bulunur", "bulunarak", "bulunmak zorundadır"],
            correctIndex: 0,
            explanation: "contribute to (katkıda bulunur) geniş zamanlı ana yüklemdir."
          },
          {
            id: "u33l134_ex6_q10",
            type: "multiple-choice",
            prompt: '<strong>İngilizce:</strong> "...profiles <strong>in</strong> restricted partitions..."<br><br><strong>Türkçe:</strong> "Kısıtlanmış bölümler<strong>_______</strong> dijital profiller..."',
            options: ["-deki", "-den ötürü", "-e rağmen"],
            correctIndex: 0,
            explanation: "in edatı, ismi niteleyen bir sıfat öbeği kurduğu için Türkçe çeviride '-deki' sıfat köprüsüne dönüşür."
          },
          {
            id: "u33l134_ex6_q11",
            type: "multiple-choice",
            prompt: '<strong>İngilizce:</strong> "...<strong>under</strong> anonymous external entries..."<br><br><strong>Türkçe:</strong> "Anonim dış girişler <strong>_______</strong>..."',
            options: ["altında", "öncesinde", "sayesinde"],
            correctIndex: 0,
            explanation: "under edatı '-in altında' durumunu belirtir."
          },
          {
            id: "u33l134_ex6_q12",
            type: "multiple-choice",
            prompt: '<strong>İngilizce:</strong> "...phase <strong>before</strong> the network synchronization..."<br><br><strong>Türkçe:</strong> "Ağ senkronizasyonundan <strong>_______</strong>..."',
            options: ["önceki", "sonraki", "boyunca"],
            correctIndex: 0,
            explanation: "before edatı burada ismi niteleyen bir sıfat öbeği kurduğu için '-den önceki' anlamı verir."
          },
          {
            id: "u33l134_ex6_q13",
            type: "multiple-choice",
            prompt: '<strong>İngilizce:</strong> "...constraints <strong>complicating</strong> the restoration cycle..."<br><br><strong>Türkçe:</strong> "Geri yükleme döngüsünü karmaşıklaştır<strong>_______</strong> mimari kısıtlamalar..."',
            options: ["-an", "-an olan", "-dığı için"],
            correctIndex: 0,
            explanation: "-ing takısı ile yapılan relative clause kısaltması sıfat-fiil (-an / -en) ekini kurar."
          },
          {
            id: "u33l134_ex6_q14",
            type: "multiple-choice",
            prompt: '<strong>İngilizce:</strong> "...memory leakage <strong>occurring</strong> across decentralised nodes..."<br><br><strong>Türkçe:</strong> "Merkeziyetsiz düğümler genelinde meydana gel<strong>_______</strong> bellek sızıntısı..."',
            options: ["-en", "-mesi planlanan", "-dikten sonra"],
            correctIndex: 0,
            explanation: "occurring relative clause kısaltması olup sıfat-fiil (-en) eki sağlar."
          },
          {
            id: "u33l134_ex6_q15",
            type: "multiple-choice",
            prompt: '<strong>İngilizce:</strong> "...<strong>must</strong> finalize the baseline documentation..."<br><br><strong>Türkçe:</strong> "Referans dökümantasyonu tamamla<strong>_______</strong>..."',
            options: ["-malıdır", "-mak üzereydi", "-sa iyi olurdu"],
            correctIndex: 0,
            explanation: "must kipi Türkçe yüklemde zorunluluk ekini (-malıdır) kurar."
          }
        ]
      }`;

const idx = content.indexOf(targetStr);
if (idx === -1) {
  const targetStrCRLF = targetStr.replace(/\n/g, '\r\n');
  const idx2 = content.indexOf(targetStrCRLF);
  if (idx2 === -1) {
    console.error("Could not find the target end of Exercise 5 in data.js!");
    process.exit(1);
  } else {
    const exercise6CRLF = exercise6.replace(/\n/g, '\r\n');
    content = content.replace(targetStrCRLF, exercise6CRLF);
    console.log("Found CRLF block and replaced successfully!");
  }
} else {
  content = content.replace(targetStr, exercise6);
  console.log("Found LF block and replaced successfully!");
}

fs.writeFileSync(dataPath, content, 'utf8');
console.log("Exercise 6 successfully added to data.js!");
