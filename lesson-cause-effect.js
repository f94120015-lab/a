/* ── Ders: Neden-Etki Fiilleri (Yön ve Sabit Edat) ───────────────────────────
 * Bu fiiller Yapı Robotu'nun montaj hattında birer "parça" olarak duruyordu:
 * lead to, result in, stem from, is responsible for… Oysa bunlar bağlaç değil
 * yüklem; kendilerinden sonrasını dayatmıyorlar, cümlenin zamanını
 * belirlemiyorlar. "Human error was responsible for the collision" sıradan bir
 * cümledir; anlamı bilmek çeviri için yeter.
 *
 * Bu ailede öğrenilecek yalnızca iki şey var:
 *   1. YÖN   — özne neden mi (lead to) yoksa sonuç mu (result from)
 *   2. EDAT  — result IN ↔ result FROM, attributed TO, caused BY
 * Bu yüzden montaj hattından çıkarılıp burada ders olarak toplandılar.
 * Ders, unitId 22'ye (ekranda Bölüm 17: Cümle Bağlaçları ve Geçiş
 * İfadeleri) altıncı ders olarak eklenir.
 * ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  if (typeof lessons === 'undefined' || typeof units === 'undefined') return;
  if (lessons.some(l => l.id === 'ce_verbs')) return;

  const TAGS = ['Neden-Sonuç Yönü', 'Neden-Etki Fiilleri', 'İsim ve Edat Yapıları'];

  // Doğru şıkkın yeri soru soru kaydırılır; hep aynı sırada durmasın.
  const rotate = (arr, k) => {
    const n = ((k % arr.length) + arr.length) % arr.length;
    return arr.slice(n).concat(arr.slice(0, n));
  };
  const mc = (id, prompt, sentence, correct, distractors, translation, explanation, idx) => {
    const opts = [correct].concat(distractors);
    const options = rotate(opts, opts.length - (idx % opts.length));
    return {
      id, type: 'fill-blank-dropdown', prompt, sentence, options,
      correctIndex: options.indexOf(correct),
      translation, explanation, grammarTags: TAGS
    };
  };

  /* ── Alıştırma 1: Yön (özne neden mi, sonuç mu) ─────────────────────────── */
  const DIRECTION = [
    { s: 'Prolonged drought ____ widespread crop failure across the region.', c: 'led to',
      d: ['resulted from', 'stemmed from', 'arose from', 'was attributed to'],
      tr: 'Uzun süren kuraklık bölge genelinde yaygın ürün kaybına yol açtı.',
      e: 'Özne (kuraklık) NEDEN, nesne (ürün kaybı) SONUÇtur. "lead to" nedenden sonuca gider; "-den" ile kurulan dört fiil özneyi sonuç konumuna koyar.' },
    { s: 'Widespread crop failure ____ the drought of the previous summer.', c: 'resulted from',
      d: ['led to', 'gave rise to', 'brought about', 'contributed to'],
      tr: 'Yaygın ürün kaybı bir önceki yazın kuraklığından kaynaklandı.',
      e: 'Bu kez özne SONUÇ, nesne NEDENdir. "result from" sonuçtan nedene bakar; diğerleri yönü tersine çevirirdi.' },
    { s: 'The new tariff ____ a sharp fall in imports within six months.', c: 'brought about',
      d: ['stemmed from', 'originated in', 'was due to', 'was caused by'],
      tr: 'Yeni tarife altı ay içinde ithalatta keskin bir düşüşe yol açtı.',
      e: 'Tarife neden, düşüş sonuçtur; "bring about" nedenden sonuca gider.' },
    { s: 'The series of network outages ____ a faulty software update.', c: 'stemmed from',
      d: ['gave rise to', 'triggered', 'produced', 'paved the way for'],
      tr: 'Bir dizi ağ kesintisi hatalı bir yazılım güncellemesinden kaynaklandı.',
      e: 'Özne (kesintiler) sonuçtur; nedene "stem from" ile bağlanır.' },
    { s: 'The software update ____ a series of network outages overnight.', c: 'gave rise to',
      d: ['resulted from', 'arose from', 'was ascribed to', 'originated in'],
      tr: 'Yazılım güncellemesi bir gecede bir dizi ağ kesintisine yol açtı.',
      e: 'Güncelleme neden, kesintiler sonuçtur; "give rise to" nedenden sonuca gider.' },
    { s: 'Rapid urban growth ____ severe pressure on the water supply.', c: 'contributed to',
      d: ['was attributed to', 'resulted from', 'stemmed from', 'was due to'],
      tr: 'Hızlı kentleşme su kaynakları üzerindeki ağır baskıya katkıda bulundu.',
      e: '"contribute to" tek başına neden olmayı değil, sonuca katkı yapmayı anlatır; yönü yine nedenden sonucadır.' },
    { s: 'The closure of two field stations ____ last year’s funding cut.', c: 'was due to',
      d: ['led to', 'triggered', 'brought about', 'gave rise to'],
      tr: 'İki saha istasyonunun kapanması geçen yılki fon kesintisinden ileri geldi.',
      e: 'Özne (kapanma) sonuçtur; "be due to" sonucu nedene bağlar.' },
    { s: 'Poor storage conditions ____ irreversible damage to the frescoes.', c: 'resulted in',
      d: ['resulted from', 'were attributed to', 'were caused by', 'arose from'],
      tr: 'Kötü depolama koşulları fresklerde geri döndürülemez bir hasarla sonuçlandı.',
      e: '"result in" ile "result from" aynı kökten iki ters yöndür: burada özne neden olduğu için "in" gerekir.' },
    { s: 'The rapid recovery in trade ____ the peace agreement of 2019.', c: 'is attributed to',
      d: ['brought about', 'induced', 'produced', 'culminated in'],
      tr: 'Ticaretteki hızlı toparlanma 2019 barış anlaşmasına bağlanıyor.',
      e: 'Özne sonuçtur ve nedene atfedilmektedir; "be attributed to" sonuçtan nedene bakar.' },
    { s: 'Human error ____ the train collision that occurred last night.', c: 'was responsible for',
      d: ['resulted from', 'stemmed from', 'was ascribed to', 'originated in'],
      tr: 'Dün gece meydana gelen tren çarpışmasından insan hatası sorumluydu.',
      e: '"be responsible for" özneyi NEDEN yapar. Cümlede ezberlenecek bir yapı yoktur; yalnızca yönü ve "for" edatını bilmek yeter.' }
  ];

  /* ── Alıştırma 2: Sabit edat ────────────────────────────────────────────── */
  const PREP = [
    { s: 'The collision resulted ____ two serious injuries.', c: 'in', d: ['from', 'to', 'by', 'of'],
      tr: 'Çarpışma iki ağır yaralanmayla sonuçlandı.',
      e: 'Özne neden olduğunda "result in" kullanılır; "result from" özneyi sonuç yapardı.' },
    { s: 'The delay resulted ____ a shortage of spare parts.', c: 'from', d: ['in', 'to', 'for', 'by'],
      tr: 'Gecikme yedek parça kıtlığından kaynaklandı.',
      e: 'Özne sonuç olduğunda "result from" gelir. Aynı fiil, edat değişince yön değiştirir.' },
    { s: 'The fading of the textiles is attributed ____ ultraviolet light.', c: 'to', d: ['by', 'from', 'in', 'for'],
      tr: 'Tekstillerdeki solma morötesi ışığa bağlanıyor.',
      e: '"be attributed to" kalıbı sabittir: atfedilen neden "to" ile gelir.' },
    { s: 'The outage was caused ____ a faulty router in the main hall.', c: 'by', d: ['from', 'to', 'of', 'in'],
      tr: 'Kesintiye ana salondaki arızalı bir yönlendirici neden oldu.',
      e: 'Edilgen "be caused by" yapısında etken (neden) "by" ile verilir.' },
    { s: 'The dispute stems ____ a boundary claim made in 1954.', c: 'from', d: ['in', 'to', 'out', 'by'],
      tr: 'Anlaşmazlık 1954’te ileri sürülen bir sınır iddiasından kaynaklanıyor.',
      e: '"stem from" sabittir; kök anlamı gereği kaynağa "from" ile bağlanır.' },
    { s: 'The reform gave rise ____ a fierce public debate.', c: 'to', d: ['in', 'from', 'for', 'of'],
      tr: 'Reform şiddetli bir kamuoyu tartışmasına yol açtı.',
      e: '"give rise to" kalıbının edatı değişmez; ortaya çıkan sonuç "to" ile gelir.' },
    { s: 'A poor diet contributes ____ several chronic conditions.', c: 'to', d: ['in', 'for', 'from', 'with'],
      tr: 'Kötü beslenme birkaç kronik rahatsızlığa katkıda bulunur.',
      e: '"contribute to" sabittir; katkı yapılan sonuç "to" ile gelir.' },
    { s: 'Two years of talks culminated ____ a formal treaty.', c: 'in', d: ['to', 'from', 'with', 'at'],
      tr: 'İki yıllık görüşmeler resmi bir antlaşmayla doruğa ulaştı.',
      e: '"culminate in" kalıbı sabittir: varılan son nokta "in" ile gelir.' },
    { s: 'Human error was responsible ____ the train collision.', c: 'for', d: ['of', 'to', 'from', 'by'],
      tr: 'Tren çarpışmasından insan hatası sorumluydu.',
      e: '"be responsible for" kalıbının edatı "for"dur; sorumluluk duyulan sonuç onunla gelir.' },
    { s: 'The shortage was due ____ a failed harvest in the south.', c: 'to', d: ['from', 'by', 'of', 'for'],
      tr: 'Kıtlık güneydeki başarısız hasattan ileri geliyordu.',
      e: '"be due to" kalıbı sabittir; neden "to" ile gelir ve özne sonuç konumundadır.' }
  ];

  /* ── Alıştırma 3: Yön eşleştirme ────────────────────────────────────────── */
  const FWD = [
    ['lead to', 'NEDEN ➔ ETKİ · -e yol açmak'],
    ['result in', 'NEDEN ➔ ETKİ · ile sonuçlanmak'],
    ['bring about', 'NEDEN ➔ ETKİ · ortaya çıkarmak'],
    ['give rise to', 'NEDEN ➔ ETKİ · doğurmak'],
    ['trigger', 'NEDEN ➔ ETKİ · tetiklemek'],
    ['contribute to', 'NEDEN ➔ ETKİ · katkıda bulunmak'],
    ['pave the way for', 'NEDEN ➔ ETKİ · zemin hazırlamak'],
    ['culminate in', 'NEDEN ➔ ETKİ · ile doruğa ulaşmak'],
    ['be responsible for', 'NEDEN ➔ ETKİ · -den sorumlu olmak'],
    ['induce', 'NEDEN ➔ ETKİ · yol açmak / özendirmek']
  ];
  const BWD = [
    ['result from', 'ETKİ ➔ NEDEN · -den kaynaklanmak'],
    ['stem from', 'ETKİ ➔ NEDEN · -den köken almak'],
    ['arise from', 'ETKİ ➔ NEDEN · -den doğmak'],
    ['originate in', 'ETKİ ➔ NEDEN · -de başlamak'],
    ['be due to', 'ETKİ ➔ NEDEN · -den ileri gelmek'],
    ['be attributed to', 'ETKİ ➔ NEDEN · -e bağlanmak'],
    ['be caused by', 'ETKİ ➔ NEDEN · -in yol açtığı'],
    ['be rooted in', 'ETKİ ➔ NEDEN · -e dayanmak'],
    ['be ascribed to', 'ETKİ ➔ NEDEN · -e atfedilmek'],
    ['derive from', 'ETKİ ➔ NEDEN · -den türemek']
  ];

  const matching = [];
  for (let k = 0; k < 10; k++) {
    const pairs = [
      { left: FWD[k % FWD.length][0], right: FWD[k % FWD.length][1] },
      { left: BWD[k % BWD.length][0], right: BWD[k % BWD.length][1] },
      { left: FWD[(k + 5) % FWD.length][0], right: FWD[(k + 5) % FWD.length][1] },
      { left: BWD[(k + 3) % BWD.length][0], right: BWD[(k + 3) % BWD.length][1] }
    ];
    matching.push({
      id: `ce_m${k + 1}`, type: 'matching',
      prompt: 'Her fiili yönü ve anlamıyla eşleştirin.',
      pairs, grammarTags: TAGS
    });
  }

  /* ── Alıştırma 4: Aynı olayı ters yönden anlatma ────────────────────────── */
  const FLIP = [
    { s: 'The heatwave led to a record rise in electricity demand.', c: 'The record rise in electricity demand resulted from the heatwave.',
      d: ['The heatwave resulted from a record rise in electricity demand.',
          'The record rise in electricity demand brought about the heatwave.',
          'The heatwave was attributed to a record rise in electricity demand.',
          'The record rise in electricity demand gave rise to the heatwave.'],
      tr: 'Sıcak hava dalgası elektrik talebinde rekor bir artışa yol açtı.',
      e: 'Aynı olayı ters yönden anlatan seçenek, sonucu (talep artışı) özne yapıp nedeni "result from" ile bağlayandır. Diğerleri nedeni ve sonucu yer değiştirir.' },
    { s: 'The shortage of nurses stemmed from years of underfunding.', c: 'Years of underfunding led to a shortage of nurses.',
      d: ['A shortage of nurses brought about years of underfunding.',
          'Years of underfunding resulted from a shortage of nurses.',
          'A shortage of nurses was responsible for years of underfunding.',
          'Years of underfunding were attributed to a shortage of nurses.'],
      tr: 'Hemşire kıtlığı yıllarca süren yetersiz finansmandan kaynaklanıyordu.',
      e: 'Özgün cümlede özne sonuçtur. Ters yönden kurulan doğru seçenek nedeni (yetersiz finansman) özne yapar.' },
    { s: 'The new subsidy brought about a sharp rise in solar installations.', c: 'The sharp rise in solar installations was due to the new subsidy.',
      d: ['The new subsidy was due to a sharp rise in solar installations.',
          'The sharp rise in solar installations paved the way for the new subsidy.',
          'The new subsidy resulted from a sharp rise in solar installations.',
          'The sharp rise in solar installations triggered the new subsidy.'],
      tr: 'Yeni teşvik güneş enerjisi kurulumlarında keskin bir artışa yol açtı.',
      e: '"be due to" sonucu nedene bağlar; doğru seçenekte artış özne, teşvik ise neden konumundadır.' },
    { s: 'Poor drainage was responsible for the flooding of the lower fields.', c: 'The flooding of the lower fields was caused by poor drainage.',
      d: ['Poor drainage was caused by the flooding of the lower fields.',
          'The flooding of the lower fields led to poor drainage.',
          'Poor drainage resulted from the flooding of the lower fields.',
          'The flooding of the lower fields contributed to poor drainage.'],
      tr: 'Alt tarlaların su basmasından kötü drenaj sorumluydu.',
      e: 'Özgün cümlede drenaj nedendir. Edilgen "be caused by" ile sonuç öne alınır, neden "by" ile verilir.' },
    { s: 'The dispute over grazing rights gave rise to two decades of litigation.', c: 'Two decades of litigation arose from the dispute over grazing rights.',
      d: ['The dispute over grazing rights arose from two decades of litigation.',
          'Two decades of litigation gave rise to the dispute over grazing rights.',
          'The dispute over grazing rights was attributed to two decades of litigation.',
          'Two decades of litigation were responsible for the dispute over grazing rights.'],
      tr: 'Otlatma hakları anlaşmazlığı yirmi yıllık bir hukuk mücadelesine yol açtı.',
      e: '"arise from" sonucu özne yapar; doğru seçenekte dava süreci sonuç, anlaşmazlık nedendir.' },
    { s: 'The collapse of the bridge was attributed to corroded cables.', c: 'Corroded cables brought about the collapse of the bridge.',
      d: ['The collapse of the bridge brought about corroded cables.',
          'Corroded cables stemmed from the collapse of the bridge.',
          'The collapse of the bridge was responsible for corroded cables.',
          'Corroded cables were due to the collapse of the bridge.'],
      tr: 'Köprünün çökmesi aşınmış kablolara bağlandı.',
      e: 'Atfedilen taraf nedendir; ters yönden kurulan cümlede kablolar özne (neden), çökme ise sonuç olur.' },
    { s: 'Automation contributed to the decline of manual sorting.', c: 'The decline of manual sorting was partly due to automation.',
      d: ['Automation was partly due to the decline of manual sorting.',
          'The decline of manual sorting contributed to automation.',
          'Automation resulted from the decline of manual sorting.',
          'The decline of manual sorting produced automation.'],
      tr: 'Otomasyon elle ayıklamanın gerilemesine katkıda bulundu.',
      e: '"contribute to" tam neden değil katkı bildirir; ters yönde "partly due to" bu payı korur.' },
    { s: 'The treaty of 1921 paved the way for a lasting settlement.', c: 'A lasting settlement was made possible by the treaty of 1921.',
      d: ['The treaty of 1921 was made possible by a lasting settlement.',
          'A lasting settlement paved the way for the treaty of 1921.',
          'The treaty of 1921 stemmed from a lasting settlement.',
          'A lasting settlement brought about the treaty of 1921.'],
      tr: '1921 antlaşması kalıcı bir uzlaşmaya zemin hazırladı.',
      e: '"pave the way for" nedeni özne yapar; ters yönde sonuç öne alınır ve neden "by" ile verilir.' },
    { s: 'Two years of negotiation culminated in a joint research programme.', c: 'The joint research programme was the outcome of two years of negotiation.',
      d: ['Two years of negotiation were the outcome of the joint research programme.',
          'The joint research programme culminated in two years of negotiation.',
          'Two years of negotiation resulted from the joint research programme.',
          'The joint research programme led to two years of negotiation.'],
      tr: 'İki yıllık görüşme ortak bir araştırma programıyla doruğa ulaştı.',
      e: '"culminate in" varılan sonucu verir; ters yönde program sonuç, görüşmeler süreç/neden olur.' },
    { s: 'Overfishing triggered the collapse of the local cod stock.', c: 'The collapse of the local cod stock was caused by overfishing.',
      d: ['Overfishing was caused by the collapse of the local cod stock.',
          'The collapse of the local cod stock triggered overfishing.',
          'Overfishing arose from the collapse of the local cod stock.',
          'The collapse of the local cod stock was responsible for overfishing.'],
      tr: 'Aşırı avlanma yerel morina stokunun çökmesini tetikledi.',
      e: 'Tetikleyen taraf nedendir; ters yönden kurulan doğru seçenek çöküşü özne yapıp nedeni "by" ile verir.' }
  ];

  const lesson = {
    id: 'ce_verbs',
    displayId: 6,
    unitId: 22,
    icon: '🎯',
    title: '6. Neden-Etki Fiilleri: Yön ve Sabit Edat',
    subtitle: 'lead to ↔ result from · attributed to · caused by',
    formula: 'NEDEN + lead to / result in / give rise to + ETKİ · ETKİ + result from / stem from / be due to + NEDEN',
    example: 'Prolonged drought led to widespread crop failure: Uzun süren kuraklık yaygın ürün kaybına yol açtı. | Widespread crop failure resulted from prolonged drought: Yaygın ürün kaybı uzun süren kuraklıktan kaynaklandı.',
    exampleTr: 'Uzun süren kuraklık yaygın ürün kaybına yol açtı.<br>Yaygın ürün kaybı uzun süren kuraklıktan kaynaklandı.',
    description: 'Bu fiiller bağlaç değildir: cümlenin zamanını ya da söz dizimini belirlemezler, bu yüzden yapı olarak ezberlenmeleri gerekmez. Öğrenilecek iki şey vardır — <strong>yön</strong> (özne neden mi, sonuç mu) ve <strong>sabit edat</strong> (result <strong>in</strong> ↔ result <strong>from</strong>, attributed <strong>to</strong>, caused <strong>by</strong>).',
    konuAnlatimi: {
      baslik: 'Neden-Etki Fiilleri: Yön ve Sabit Edat',
      teorikMantik: 'Aynı olayı iki yönden anlatabilirsiniz. Özneyi NEDEN yaparsanız "lead to / result in / bring about / give rise to" ailesini, SONUÇ yaparsanız "result from / stem from / arise from / be due to / be attributed to" ailesini kullanırsınız. Cümlenin zamanı serbesttir; kural yalnızca yön ve edattadır.',
      formul: 'NEDEN + lead to / result in / bring about + ETKİ | ETKİ + result from / stem from / be due to + NEDEN',
      altinKural: 'Aynı kökten iki fiil ters yöne bakar: <strong>result in</strong> (özne neden) ↔ <strong>result from</strong> (özne sonuç). Edat değişince cümlenin anlamı tersine döner.'
    },
    exercises: [
      {
        id: 'ce_ex1',
        title: 'Alıştırma 1: Yön (özne neden mi, sonuç mu)',
        description: 'Cümledeki öznenin neden mi sonuç mu olduğuna göre doğru fiili seçme.',
        questions: DIRECTION.map((row, i) =>
          mc(`ce_d${i + 1}`, 'Cümledeki neden-sonuç yönüne uygun ifadeyi seçin:', row.s, row.c, row.d, row.tr, row.e, i))
      },
      {
        id: 'ce_ex2',
        title: 'Alıştırma 2: Sabit Edat',
        description: 'result in / result from, attributed to, caused by gibi değişmez edatlar.',
        questions: PREP.map((row, i) =>
          mc(`ce_p${i + 1}`, 'Boşluğa gelecek edatı seçin:', row.s, row.c, row.d, row.tr, row.e, i))
      },
      {
        id: 'ce_ex3',
        title: 'Alıştırma 3: Yön Eşleştirme',
        description: 'Her fiilin hangi yönde çalıştığını ve Türkçe karşılığını eşleştirme.',
        questions: matching
      },
      {
        id: 'ce_ex4',
        title: 'Alıştırma 4: Aynı Olayı Ters Yönden Anlatma',
        description: 'Verilen cümlenin nedeni ve sonucu yer değiştirmeden kurulmuş eşdeğerini bulma.',
        questions: FLIP.map((row, i) => ({
          id: `ce_f${i + 1}`, type: 'multiple-choice',
          prompt: `Aşağıdaki cümleyle aynı olayı ters yönden anlatan seçeneği bulunuz:<br><br><strong>"${row.s}"</strong>`,
          options: (() => {
            const opts = [row.c].concat(row.d);
            return rotate(opts, opts.length - (i % opts.length));
          })(),
          correctIndex: -1,
          translation: row.tr,
          explanation: row.e,
          grammarTags: TAGS
        })).map(q => {
          // correctIndex'i döndürülmüş dizide bul
          const correct = FLIP[Number(q.id.replace('ce_f', '')) - 1].c;
          q.correctIndex = q.options.indexOf(correct);
          return q;
        })
      }
    ]
  };

  lessons.push(lesson);
  const unit = units.find(u => u.id === 22);
  if (unit && Array.isArray(unit.lessons) && !unit.lessons.includes('ce_verbs')) {
    unit.lessons.push('ce_verbs');
  }
})();
