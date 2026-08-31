/* ── Yapısal Kurallar: alıştırma genişletmesi ────────────────────────────────
 * "Bağlaç Kuralları" ve "Zaman Uyumu Kuralları" sekmelerindeki alıştırmalar
 * 10'ar soruluk testlere bölünüyor (CONNECTOR_DRILL_TEST_SIZE). Alıştırmaların
 * bir kısmı 2-5 testlik olduğu için sekmeler dengesizdi; burada her alıştırma
 * kendi kural ailesinden üretilen sorularla 8 teste (80 soru) tamamlanıyor.
 *
 * Sorular rastgele değil, sırayla üretilir: aynı sürüm her zaman aynı soruları
 * verir, id'ler sabittir, doğru cevabın yeri dönüşümlü olarak kaydırılır.
 * Kural kartlarının açılabilmesi için terms alanı app.js'teki matris
 * terimleriyle birebir aynı yazılır (TIME_MATRIX_DATA / TRANSITIONS_MATRIX_DATA
 * / CAUSE_EFFECT_DATA).
 * ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  if (typeof lessons === 'undefined') return;

  const TARGET_QUESTIONS = 80; // 8 test × 10 soru

  const cap = s => String(s).charAt(0).toUpperCase() + String(s).slice(1);
  const rotate = (arr, k) => {
    const n = ((k % arr.length) + arr.length) % arr.length;
    return arr.slice(n).concat(arr.slice(0, n));
  };
  // Doğru cevap her soruda başka bir sırada dursun: seçenekler dizisi kaydırılır.
  const spin = (correct, distractors, idx) => {
    const opts = [correct].concat(distractors);
    return rotate(opts, opts.length - (idx % opts.length));
  };

  const CTAGS = ['Bağlaç Yapısal Kuralları'];
  const TTAGS = ['Zaman Uyumu Kuralları'];

  function dropdown(id, prompt, sentence, correct, distractors, translation, explanation, terms, idx, tags) {
    const options = spin(correct, distractors, idx);
    return {
      id, type: 'fill-blank-dropdown', prompt, sentence, options,
      correctIndex: options.indexOf(correct),
      translation, explanation, grammarTags: tags, terms: terms || []
    };
  }

  function spotting(id, prompt, sentence, wrong, others, translation, explanation, terms, idx, tags) {
    const options = spin(wrong, others, idx);
    return {
      id, type: 'error-spotting', prompt, sentence, options,
      correctIndex: options.indexOf(wrong),
      translation, explanation, grammarTags: tags, terms: terms || []
    };
  }

  /* ── Ortak içerik havuzları ─────────────────────────────────────────────── */

  // Bağımsız cümle çiftleri. aDep, A tarafının Türkçe yan cümle biçimidir
  // ("... olsa da" / "... olduğu için"); devrik ve yan cümleli kalıplarda gerekir.
  const CONTRAST_PAIRS = [
    { a: 'the strategy is risky', at: 'strateji riskli',
      aDep: 'strateji riskli olsa da', b: 'it offers substantial rewards', bt: 'büyük getiriler sunuyor' },
    { a: 'the excavation was well funded', at: 'kazı iyi finanse edilmişti',
      aDep: 'kazı iyi finanse edilmiş olsa da', b: 'the results were disappointing', bt: 'sonuçlar hayal kırıklığı yarattı' },
    { a: 'the archive is open to the public', at: 'arşiv halka açık',
      aDep: 'arşiv halka açık olsa da', b: 'few researchers consult it', bt: 'çok az araştırmacı ondan yararlanıyor' },
    { a: 'the software passed every test', at: 'yazılım her testi geçti',
      aDep: 'yazılım her testi geçmiş olsa da', b: 'users reported frequent crashes', bt: 'kullanıcılar sık çökme bildirdi' },
    { a: 'the museum expanded its collection', at: 'müze koleksiyonunu genişletti',
      aDep: 'müze koleksiyonunu genişletmiş olsa da', b: 'visitor numbers fell', bt: 'ziyaretçi sayısı düştü' },
    { a: 'the reform was widely supported', at: 'reform geniş destek gördü',
      aDep: 'reform geniş destek görmüş olsa da', b: 'parliament delayed the vote', bt: 'meclis oylamayı geciktirdi' },
    { a: 'the sensors were recently calibrated', at: 'sensörler yakın zamanda kalibre edildi',
      aDep: 'sensörler yakın zamanda kalibre edilmiş olsa da', b: 'the readings remained unstable', bt: 'ölçümler kararsız kaldı' },
    { a: 'the manuscript is incomplete', at: 'el yazması eksik',
      aDep: 'el yazması eksik olsa da', b: 'it remains the earliest surviving copy', bt: 'günümüze ulaşan en eski kopya olmayı sürdürüyor' }
  ];

  const CAUSE_PAIRS = [
    { a: 'the budget was cut', at: 'bütçe kısıldı',
      aDep: 'bütçe kısıldığı için', b: 'the survey was postponed', bt: 'araştırma ertelendi' },
    { a: 'the server failed', at: 'sunucu çöktü',
      aDep: 'sunucu çöktüğü için', b: 'the overnight data was lost', bt: 'gece boyunca toplanan veriler kayboldu' },
    { a: 'the funding arrived late', at: 'fon geç geldi',
      aDep: 'fon geç geldiği için', b: 'the excavation started in autumn', bt: 'kazı sonbaharda başladı' },
    { a: 'rainfall increased sharply', at: 'yağış hızla arttı',
      aDep: 'yağış hızla arttığı için', b: 'the reservoir reached capacity', bt: 'baraj kapasiteye ulaştı' },
    { a: 'the archive was digitised', at: 'arşiv dijitalleştirildi',
      aDep: 'arşiv dijitalleştirildiği için', b: 'access became far easier', bt: 'erişim çok daha kolaylaştı' },
    { a: 'the sample was contaminated', at: 'örnek kirlendi',
      aDep: 'örnek kirlendiği için', b: 'the experiment was repeated', bt: 'deney tekrarlandı' },
    { a: 'the guidelines changed', at: 'yönergeler değişti',
      aDep: 'yönergeler değiştiği için', b: 'the report had to be rewritten', bt: 'raporun yeniden yazılması gerekti' },
    { a: 'the exhibition attracted media coverage', at: 'sergi medyada geniş yer buldu',
      aDep: 'sergi medyada geniş yer bulduğu için', b: 'ticket sales doubled', bt: 'bilet satışları ikiye katlandı' }
  ];

  const ADD_PAIRS = [
    { a: 'the catalogue lists every item', at: 'katalog her nesneyi listeliyor',
      b: 'it reproduces the marginalia', bt: 'kenar notlarını da çoğaltıyor' },
    { a: 'the method reduces costs', at: 'yöntem maliyeti düşürüyor',
      b: 'it shortens the analysis time', bt: 'analiz süresini de kısaltıyor' },
    { a: 'the grant covers the fieldwork', at: 'hibe saha çalışmasını karşılıyor',
      b: 'it funds two assistants', bt: 'iki asistanı da finanse ediyor' },
    { a: 'the platform stores the records', at: 'platform kayıtları saklıyor',
      b: 'it indexes them automatically', bt: 'onları otomatik olarak da dizinliyor' }
  ];

  // İsim öbekleri: despite / due to gibi isim alan yapılar için.
  const NOUN_PHRASES = [
    { en: 'the heavy traffic', tr: 'yoğun trafiğe', trCause: 'yoğun trafik nedeniyle',
      clause: 'the traffic was heavy', clauseTr: 'trafik yoğundu',
      b: 'the delegation arrived on time', bt: 'heyet zamanında ulaştı' },
    { en: 'the tight budget', tr: 'kısıtlı bütçeye', trCause: 'kısıtlı bütçe nedeniyle',
      clause: 'the budget was tight', clauseTr: 'bütçe kısıtlıydı',
      b: 'the laboratory completed the trial', bt: 'laboratuvar denemeyi tamamladı' },
    { en: 'the missing pages', tr: 'eksik sayfalara', trCause: 'eksik sayfalar nedeniyle',
      clause: 'several pages were missing', clauseTr: 'birkaç sayfa eksikti',
      b: 'the manuscript was catalogued', bt: 'el yazması kataloglandı' },
    { en: 'the poor weather', tr: 'kötü havaya', trCause: 'kötü hava nedeniyle',
      clause: 'the weather was poor', clauseTr: 'hava kötüydü',
      b: 'the survey went ahead', bt: 'ölçüm çalışması yapıldı' },
    { en: 'the legal dispute', tr: 'yasal anlaşmazlığa', trCause: 'yasal anlaşmazlık nedeniyle',
      clause: 'a legal dispute continued', clauseTr: 'yasal bir anlaşmazlık sürüyordu',
      b: 'the archive stayed open', bt: 'arşiv açık kaldı' },
    { en: 'the equipment failure', tr: 'ekipman arızasına', trCause: 'ekipman arızası nedeniyle',
      clause: 'the equipment failed', clauseTr: 'ekipman arızalandı',
      b: 'the readings were repeated', bt: 'ölçümler yinelendi' }
  ];

  // Neden → sonuç çiftleri (cdrill_ex5).
  const CE_PAIRS = [
    { c: 'Prolonged drought', ct: 'Uzun süren kuraklık', e: 'widespread crop failure', et: 'yaygın ürün kaybına',
      cS: 'uzun süren kuraklıktan', eS: 'Yaygın ürün kaybı' },
    { c: 'The new tariff', ct: 'Yeni tarife', e: 'a sharp fall in imports', et: 'ithalatta keskin bir düşüşe',
      cS: 'yeni tarifeden', eS: 'İthalattaki keskin düşüş' },
    { c: 'The software update', ct: 'Yazılım güncellemesi', e: 'a series of network outages', et: 'bir dizi ağ kesintisine',
      cS: 'yazılım güncellemesinden', eS: 'Bir dizi ağ kesintisi' },
    { c: 'Rapid urban growth', ct: 'Hızlı kentleşme', e: 'severe pressure on water supplies', et: 'su kaynakları üzerinde ağır bir baskıya',
      cS: 'hızlı kentleşmeden', eS: 'Su kaynakları üzerindeki ağır baskı' },
    { c: 'The funding cut', ct: 'Fon kesintisi', e: 'the closure of two field stations', et: 'iki saha istasyonunun kapanmasına',
      cS: 'fon kesintisinden', eS: 'İki saha istasyonunun kapanması' },
    { c: 'The revised curriculum', ct: 'Yenilenen müfredat', e: 'a measurable rise in literacy', et: 'okuryazarlıkta ölçülebilir bir artışa',
      cS: 'yenilenen müfredattan', eS: 'Okuryazarlıktaki ölçülebilir artış' },
    { c: 'Poor storage conditions', ct: 'Kötü depolama koşulları', e: 'irreversible damage to the frescoes', et: 'fresklerde geri döndürülemez bir hasara',
      cS: 'kötü depolama koşullarından', eS: 'Fresklerdeki geri döndürülemez hasar' },
    { c: 'The peace agreement', ct: 'Barış anlaşması', e: 'a rapid recovery in trade', et: 'ticarette hızlı bir toparlanmaya',
      cS: 'barış anlaşmasından', eS: 'Ticaretteki hızlı toparlanma' },
    { c: 'The contaminated sample', ct: 'Kirlenen örnek', e: 'a two-month delay in the trial', et: 'denemede iki aylık bir gecikmeye',
      cS: 'kirlenen örnekten', eS: 'Denemedeki iki aylık gecikme' },
    { c: 'The digitisation project', ct: 'Dijitalleştirme projesi', e: 'a threefold rise in archive use', et: 'arşiv kullanımında üç kat artışa',
      cS: 'dijitalleştirme projesinden', eS: 'Arşiv kullanımındaki üç kat artış' }
  ];

  /* ── Zaman alıştırmaları için özne + nesne + fiil havuzu ─────────────────── */
  // Türkçe çekimler elle yazılır; makine çekimi hatalı biçimler üretiyor.
  const ACTORS = [
    { s: 'the committee', st: 'komisyon', plural: false, o: 'the budget', ot: 'bütçeyi',
      v: { v1: 'approve', v1s: 'approves', v2: 'approved', v3: 'approved', ing: 'approving' },
      t: { gen: 'onaylar', sim: 'onaylıyor', past: 'onayladı', pastCont: 'onaylıyordu',
           plu: 'onaylamıştı', fut: 'onaylayacak', futPerf: 'onaylamış olacak',
           cond: 'onaylarsa', condPast: 'onaylasaydı', wish: 'onaylasa', subj: 'onaylaması', mis: 'onaylamış' } },
    { s: 'the researchers', st: 'araştırmacılar', plural: true, o: 'the data', ot: 'verileri',
      v: { v1: 'verify', v1s: 'verifies', v2: 'verified', v3: 'verified', ing: 'verifying' },
      t: { gen: 'doğrular', sim: 'doğruluyor', past: 'doğruladı', pastCont: 'doğruluyordu',
           plu: 'doğrulamıştı', fut: 'doğrulayacak', futPerf: 'doğrulamış olacak',
           cond: 'doğrularsa', condPast: 'doğrulasaydı', wish: 'doğrulasa', subj: 'doğrulaması', mis: 'doğrulamış' } },
    { s: 'the museum', st: 'müze', plural: false, o: 'the manuscripts', ot: 'el yazmalarını',
      v: { v1: 'catalogue', v1s: 'catalogues', v2: 'catalogued', v3: 'catalogued', ing: 'cataloguing' },
      t: { gen: 'kataloglar', sim: 'katalogluyor', past: 'katalogladı', pastCont: 'katalogluyordu',
           plu: 'kataloglamıştı', fut: 'kataloglayacak', futPerf: 'kataloglamış olacak',
           cond: 'kataloglarsa', condPast: 'kataloglasaydı', wish: 'kataloglasa', subj: 'kataloglaması', mis: 'kataloglamış' } },
    { s: 'the government', st: 'hükümet', plural: false, o: 'the reform', ot: 'reformu',
      v: { v1: 'implement', v1s: 'implements', v2: 'implemented', v3: 'implemented', ing: 'implementing' },
      t: { gen: 'uygular', sim: 'uyguluyor', past: 'uyguladı', pastCont: 'uyguluyordu',
           plu: 'uygulamıştı', fut: 'uygulayacak', futPerf: 'uygulamış olacak',
           cond: 'uygularsa', condPast: 'uygulasaydı', wish: 'uygulasa', subj: 'uygulaması', mis: 'uygulamış' } },
    { s: 'the engineers', st: 'mühendisler', plural: true, o: 'the sensors', ot: 'sensörleri',
      v: { v1: 'calibrate', v1s: 'calibrates', v2: 'calibrated', v3: 'calibrated', ing: 'calibrating' },
      t: { gen: 'kalibre eder', sim: 'kalibre ediyor', past: 'kalibre etti', pastCont: 'kalibre ediyordu',
           plu: 'kalibre etmişti', fut: 'kalibre edecek', futPerf: 'kalibre etmiş olacak',
           cond: 'kalibre ederse', condPast: 'kalibre etseydi', wish: 'kalibre etse', subj: 'kalibre etmesi', mis: 'kalibre etmiş' } },
    { s: 'the historians', st: 'tarihçiler', plural: true, o: 'the archive', ot: 'arşivi',
      v: { v1: 'examine', v1s: 'examines', v2: 'examined', v3: 'examined', ing: 'examining' },
      t: { gen: 'inceler', sim: 'inceliyor', past: 'inceledi', pastCont: 'inceliyordu',
           plu: 'incelemişti', fut: 'inceleyecek', futPerf: 'incelemiş olacak',
           cond: 'incelerse', condPast: 'inceleseydi', wish: 'incelese', subj: 'incelemesi', mis: 'incelemiş' } },
    { s: 'the council', st: 'konsey', plural: false, o: 'the proposal', ot: 'öneriyi',
      v: { v1: 'reject', v1s: 'rejects', v2: 'rejected', v3: 'rejected', ing: 'rejecting' },
      t: { gen: 'reddeder', sim: 'reddediyor', past: 'reddetti', pastCont: 'reddediyordu',
           plu: 'reddetmişti', fut: 'reddedecek', futPerf: 'reddetmiş olacak',
           cond: 'reddederse', condPast: 'reddetseydi', wish: 'reddetse', subj: 'reddetmesi', mis: 'reddetmiş' } },
    { s: 'the editors', st: 'editörler', plural: true, o: 'the article', ot: 'makaleyi',
      v: { v1: 'publish', v1s: 'publishes', v2: 'published', v3: 'published', ing: 'publishing' },
      t: { gen: 'yayımlar', sim: 'yayımlıyor', past: 'yayımladı', pastCont: 'yayımlıyordu',
           plu: 'yayımlamıştı', fut: 'yayımlayacak', futPerf: 'yayımlamış olacak',
           cond: 'yayımlarsa', condPast: 'yayımlasaydı', wish: 'yayımlasa', subj: 'yayımlaması', mis: 'yayımlamış' } },
    { s: 'the auditors', st: 'denetçiler', plural: true, o: 'the accounts', ot: 'hesapları',
      v: { v1: 'review', v1s: 'reviews', v2: 'reviewed', v3: 'reviewed', ing: 'reviewing' },
      t: { gen: 'gözden geçirir', sim: 'gözden geçiriyor', past: 'gözden geçirdi', pastCont: 'gözden geçiriyordu',
           plu: 'gözden geçirmişti', fut: 'gözden geçirecek', futPerf: 'gözden geçirmiş olacak',
           cond: 'gözden geçirirse', condPast: 'gözden geçirseydi', wish: 'gözden geçirse', subj: 'gözden geçirmesi', mis: 'gözden geçirmiş' } },
    { s: 'the laboratory', st: 'laboratuvar', plural: false, o: 'the samples', ot: 'örnekleri',
      v: { v1: 'analyse', v1s: 'analyses', v2: 'analysed', v3: 'analysed', ing: 'analysing' },
      t: { gen: 'analiz eder', sim: 'analiz ediyor', past: 'analiz etti', pastCont: 'analiz ediyordu',
           plu: 'analiz etmişti', fut: 'analiz edecek', futPerf: 'analiz etmiş olacak',
           cond: 'analiz ederse', condPast: 'analiz etseydi', wish: 'analiz etse', subj: 'analiz etmesi', mis: 'analiz etmiş' } }
  ];

  // İkinci olay: devrik kilitlerde ve iki cümlecikli kurallarda "sonra olan".
  const AFTERMATH = [
    { en: 'the press announced the decision', tr: 'basın kararı duyurdu' },
    { en: 'the opposition demanded a recount', tr: 'muhalefet yeniden sayım istedi' },
    { en: 'the markets reacted sharply', tr: 'piyasalar sert tepki verdi' },
    { en: 'the power supply failed', tr: 'elektrik kesildi' },
    { en: 'the site was closed to visitors', tr: 'alan ziyarete kapatıldı' },
    { en: 'the sponsors withdrew their support', tr: 'sponsorlar desteğini çekti' },
    { en: 'the alarm sounded across the building', tr: 'alarm bina boyunca çaldı' },
    { en: 'the results appeared in the bulletin', tr: 'sonuçlar bültende yer aldı' },
    { en: 'the storm reached the coast', tr: 'fırtına kıyıya ulaştı' },
    { en: 'the committee called an emergency session', tr: 'komisyon olağanüstü toplantı çağrısı yaptı' }
  ];

  const trSentence = (actor, verbForm, prefix) =>
    cap(((prefix ? prefix + ' ' : '') + actor.st + ' ' + actor.ot + ' ' + verbForm).trim()) + '.';

  window.__DRILL_EXPANSION_BANKS__ = {
    CONTRAST_PAIRS, CAUSE_PAIRS, ADD_PAIRS, NOUN_PHRASES, CE_PAIRS, ACTORS, AFTERMATH
  };

  /* ── Bağlaç Kuralları · Alıştırma 1: Bağlaç Türleri ve Noktalama (And/But / However / Because) ────────────── */
  // Kural noktalamadadır: noktalı virgül ve nokta yalnızca geçiş zarfı taşır,
  // virgül bağlaç ister, başa gelen yan cümle bağlacı virgülle ayrılır.
  const REL = {
    contrast: { trans: 'however', trans2: 'nevertheless', coord: 'but', sub: 'although',
                trJoin: '; ancak ', trCoord: ' ama ', term: 'however', subTerm: 'although' },
    cause:    { trans: 'therefore', trans2: 'consequently', coord: 'so', sub: 'because',
                trJoin: '; bu nedenle ', trCoord: ', bu yüzden ', term: 'therefore', subTerm: 'because / since / as' },
    add:      { trans: 'moreover', trans2: 'furthermore', coord: 'and', sub: null,
                trJoin: '; ayrıca ', trCoord: ' ve ', term: 'moreover', subTerm: null }
  };

  function buildPunctuation(need, startIndex) {
    const out = [];
    const pool = [];
    CONTRAST_PAIRS.forEach(p => pool.push({ p, rel: 'contrast' }));
    CAUSE_PAIRS.forEach(p => pool.push({ p, rel: 'cause' }));
    ADD_PAIRS.forEach(p => pool.push({ p, rel: 'add' }));
    const subPool = pool.filter(x => x.rel !== 'add');
    const prompt = 'Noktalamaya ve anlama uygun bağlacı seçin:';
    const templates = [
      // 1) Noktalı virgül + virgüllü boşluk: yalnızca geçiş zarfı.
      (x, i) => {
        const r = REL[x.rel], q = x.p;
        return dropdown(`cdx1_g${i}`, prompt,
          `${cap(q.a)}; ____, ${q.b}.`, r.trans, [r.coord, 'although', 'because', 'and'].filter(o => o !== r.coord).slice(0, 3).concat([r.coord]),
          `${cap(q.at)}${r.trJoin}${q.bt}.`,
          `Noktalı virgülden sonra virgülle ayrılmış bir boşluk var; bu konumu yalnızca geçiş zarfı doldurur. '${r.coord}', 'and' gibi bağlaçlar noktalı virgülden sonra virgül almaz, 'although' ve 'because' ise yan cümle kurar.`,
          [r.term, r.subTerm].filter(Boolean), i, CTAGS);
      },
      // 2) Nokta + cümle başı: yine geçiş zarfı, bu kez büyük harfle.
      (x, i) => {
        const r = REL[x.rel], q = x.p;
        return dropdown(`cdx1_h${i}`, prompt,
          `${cap(q.a)}. ____, ${q.b}.`, cap(r.trans2), [cap(r.coord), 'Although', 'Because', 'Despite'],
          `${cap(q.at)}${r.trJoin}${q.bt}.`,
          `Boşluk yeni bir cümlenin başında ve virgülle ayrılıyor. Bağımsız bir cümleyi bu biçimde yalnızca geçiş zarfı başlatabilir; '${cap(r.coord)}' bir bağlaçtır, 'Although' ve 'Because' yan cümle ister, 'Despite' ise isim öbeği alır.`,
          [r.trans2 === 'nevertheless' ? 'nevertheless' : r.trans2 === 'consequently' ? 'consequently / as a consequence' : 'furthermore', 'despite'], i, CTAGS);
      },
      // 3) Tek virgül: iki bağımsız cümleyi yalnızca bağlaç birleştirir.
      (x, i) => {
        const r = REL[x.rel], q = x.p;
        return dropdown(`cdx1_i${i}`, prompt,
          `${cap(q.a)}, ____ ${q.b}.`, r.coord, [r.trans, r.trans2, 'although', 'despite'],
          `${cap(q.at)}${r.trCoord}${q.bt}.`,
          `İki bağımsız cümle tek bir virgülle bağlanıyor; bu konumda yalnızca bağlaç durabilir. '${r.trans}' ve '${r.trans2}' geçiş zarfıdır ve noktalı virgül ister; 'although' yan cümle kurar, 'despite' isim öbeği alır.`,
          [r.term, 'although', 'despite'], i, CTAGS);
      },
      // 4) Başta yan cümle: bağlaç + özne + fiil, ardından virgül.
      (x, i) => {
        const r = REL[x.rel], q = x.p;
        return dropdown(`cdx1_j${i}`, prompt,
          `____ ${q.a}, ${q.b}.`, cap(r.sub), [cap(r.trans), cap(r.trans2), 'Despite', 'In spite of'],
          `${cap(q.aDep)} ${q.bt}.`,
          `Boşluktan sonra özne + fiil geliyor ve virgülle ana cümleye bağlanıyor: bu bir yan cümledir. Geçiş zarfları ('${cap(r.trans)}', '${cap(r.trans2)}') yan cümle başlatamaz; 'Despite' ve 'In spite of' ise isim öbeği ister.`,
          [r.subTerm, r.term, 'despite', 'in spite of'].filter(Boolean), i, CTAGS);
      },
      // 5) Yan cümle sonda: virgül yok, bağlaç cümlenin ortasında.
      (x, i) => {
        const r = REL[x.rel], q = x.p;
        return dropdown(`cdx1_k${i}`, prompt,
          `${cap(q.b)} ____ ${q.a}.`, r.sub, [r.trans, r.trans2, 'despite', 'therefore'].filter(o => o !== r.sub).slice(0, 4),
          `${cap(q.aDep)} ${q.bt}.`,
          `Yan cümle sonda olduğu için virgül kullanılmaz ve boşluk cümlenin ortasındadır. Bu konum yan cümle bağlacı ister; geçiş zarfı iki bağımsız cümle arasında durur, 'despite' ise isim öbeği alır.`,
          [r.subTerm, r.term, 'despite'].filter(Boolean), i, CTAGS);
      }
    ];
    let i = startIndex;
    while (out.length < need) {
      const t = templates[out.length % templates.length];
      const src = (out.length % templates.length) >= 3 ? subPool : pool;
      const item = src[Math.floor(out.length / templates.length) % src.length];
      out.push(t(item, i++));
    }
    return out;
  }

  /* ── Bağlaç Kuralları · Alıştırma 3: Anlamdaş Bağlaç Ayrımı (Although / Despite / Because) ───────────────────────── */
  // Aynı aileden ifadeler arasında bağlamın hangisini istediğini ayırt etme.
  // Bu alıştırma bağlam gerektirdiği için satırlar elle yazılır.
  const MEANING_ROWS = [
    { s: 'The delay was not caused by the weather. ____, the equipment had never been serviced.',
      c: 'On the contrary', d: ['On the other hand', 'Meanwhile', 'Similarly', 'In brief'],
      tr: 'Gecikmenin nedeni hava değildi. Aksine, ekipmanın bakımı hiç yapılmamıştı.',
      e: "Önceki cümle bir yargıyı reddediyor, ikinci cümle doğrusunu koyuyor. Bu düzeltme ilişkisini yalnızca 'on the contrary' kurar; 'on the other hand' iki geçerli seçeneği karşılaştırır.",
      t: ['on the contrary', 'on the other hand'] },
    { s: 'Digital access is cheap and immediate. ____, it strips the document of its physical context.',
      c: 'On the other hand', d: ['On the contrary', 'In conclusion', 'Namely', 'For instance'],
      tr: 'Dijital erişim ucuz ve anında. Öte yandan belgeyi fiziksel bağlamından koparıyor.',
      e: "İki taraf da doğru; biri avantaj, öteki dezavantaj. Bu denge 'on the other hand' ister. 'On the contrary' önceki yargıyı yanlışlardı.",
      t: ['on the other hand', 'on the contrary'] },
    { s: 'Urban dialects levelled quickly. ____, rural varieties preserved the older vowel system.',
      c: 'By contrast', d: ['Therefore', 'In fact', 'Above all', 'That is'],
      tr: 'Kent ağızları hızla düzleşti. Buna karşılık kırsal ağızlar eski ünlü dizgesini korudu.',
      e: "İki grup aynı ölçüte göre karşılaştırılıyor; karşıtlığı 'by contrast' kurar. 'Therefore' sonuç, 'in fact' düzeltme bildirir.",
      t: ['in contrast / by contrast', 'therefore'] },
    { s: 'The first survey found no trace of the wall. ____, the second located it within an hour.',
      c: 'Conversely', d: ['Likewise', 'Moreover', 'In short', 'For example'],
      tr: 'İlk araştırma duvarın izine rastlamadı. Tersine, ikincisi onu bir saat içinde buldu.',
      e: "İki sonuç birbirinin tam tersi. 'Conversely' bu ters simetriyi kurar; 'likewise' benzerlik, 'moreover' ekleme bildirir.",
      t: ['conversely', 'likewise'] },
    { s: 'The catalogue is not merely useful. ____, it is the only complete record of the collection.',
      c: 'Indeed', d: ['Otherwise', 'Meanwhile', 'In contrast', 'Namely'],
      tr: 'Katalog yalnızca yararlı değil. Gerçekten de koleksiyonun tek eksiksiz kaydı.',
      e: "İkinci cümle ilkini yükselterek pekiştiriyor; bu vurgu 'indeed' ile verilir. 'Otherwise' olumsuz bir sonucu, 'in contrast' karşıtlığı bildirir.",
      t: ['indeed', 'otherwise'] },
    { s: 'The report was described as balanced. ____, two of its three authors worked for the contractor.',
      c: 'In fact', d: ['Likewise', 'For instance', 'In conclusion', 'Similarly'],
      tr: 'Rapor dengeli diye tanıtıldı. Aslında üç yazarından ikisi yükleniciye çalışıyordu.',
      e: "İkinci cümle ilkindeki izlenimi düzeltiyor; bu 'in fact'in işidir. 'For instance' örnek verirdi, 'likewise' benzerlik kurardı.",
      t: ['in fact / as a matter of fact', 'for instance'] },
    { s: 'Only one variable was altered between the two runs: ____, the sampling interval.',
      c: 'namely', d: ['for example', 'however', 'otherwise', 'in short'],
      tr: 'İki çalıştırma arasında yalnızca tek bir değişken değiştirildi: yani örnekleme aralığı.',
      e: "Sayı tektir ve o tek şey adıyla söyleniyor; bu 'namely' ister. 'For example' birçok olasılıktan birini örneklerdi.",
      t: ['namely', 'for example'] },
    { s: 'Several tools showed the same fault. ____, the spectrometer drifted by two per cent.',
      c: 'For instance', d: ['Namely', 'In conclusion', 'On the contrary', 'Nonetheless'],
      tr: 'Birkaç cihaz aynı arızayı gösterdi. Örneğin spektrometre yüzde iki kaydı.',
      e: "Çok sayıda örnekten biri veriliyor; bu 'for instance'ın işidir. 'Namely' listeyi tüketirdi, yani tek olasılık kalırdı.",
      t: ['for instance', 'namely'] },
    { s: 'The find was dated by three independent methods; ____, by dendrochronology, thermoluminescence and radiocarbon.',
      c: 'specifically', d: ['for instance', 'nevertheless', 'in the same way', 'or else'],
      tr: 'Buluntu üç bağımsız yöntemle tarihlendirildi; özellikle dendrokronoloji, termolüminesans ve radyokarbonla.',
      e: "Sayılan üç yöntem, önceki ifadeyi tam olarak açıyor; bu kesinleştirme 'specifically' ile yapılır.",
      t: ['specifically', 'for instance'] },
    { s: 'The results must be filed by Friday. ____, the grant will be suspended.',
      c: 'Otherwise', d: ['Moreover', 'Similarly', 'In brief', 'Indeed'],
      tr: 'Sonuçların cumaya kadar teslim edilmesi gerekiyor. Aksi takdirde hibe askıya alınacak.',
      e: "İkinci cümle, ilkinin gerçekleşmemesi durumundaki sonucu veriyor; bu gizli şartı 'otherwise' taşır.",
      t: ['otherwise', 'moreover'] },
    { s: 'Submit the form before noon; ____, you will lose your slot in the queue.',
      c: 'or else', d: ['likewise', 'in addition', 'that is', 'above all'],
      tr: 'Formu öğleden önce gönderin; yoksa sıradaki yerinizi kaybedersiniz.',
      e: "'or else' de 'otherwise' gibi olumsuz bir sonucu haber verir; ekleme ya da benzerlik bildiren ifadeler bu boşluğa gelemez.",
      t: ['or else', 'otherwise'] },
    { s: 'The northern site yielded no metal. ____, the southern trench produced only pottery.',
      c: 'Likewise', d: ['Conversely', 'In fact', 'Namely', 'Otherwise'],
      tr: 'Kuzey alanından metal çıkmadı. Aynı şekilde güney açması yalnızca çanak çömlek verdi.',
      e: "İki bulgu birbirini destekliyor; benzerliği 'likewise' kurar. 'Conversely' tam tersini söylerdi.",
      t: ['likewise', 'conversely'] },
    { s: 'Ice cores record annual layers. ____, tree rings preserve a year-by-year sequence.',
      c: 'Similarly', d: ['Nevertheless', 'Above all', 'In conclusion', 'On the contrary'],
      tr: 'Buz karotları yıllık katmanları kaydeder. Benzer biçimde ağaç halkaları yıl yıl bir dizi saklar.',
      e: "İki farklı kaynak aynı özelliği paylaşıyor; bu koşutluğu 'similarly' kurar.",
      t: ['similarly', 'nevertheless'] },
    { s: 'The scheme cost less, ran faster and needed fewer staff. ____, it did everything the tender asked for.',
      c: 'In short', d: ['For example', 'On the contrary', 'Meanwhile', 'Namely'],
      tr: 'Program daha ucuza mal oldu, daha hızlı işledi ve daha az personel gerektirdi. Kısacası ihalenin istediği her şeyi yaptı.',
      e: "Sayılanlar tek bir yargıda toplanıyor; bu özetleme 'in short' ile yapılır.",
      t: ['in brief / in short', 'for example'] },
    { s: 'A few sessions ran late and one speaker withdrew. ____, the conference met its aims.',
      c: 'Overall', d: ['Namely', 'Otherwise', 'By contrast', 'Indeed'],
      tr: 'Birkaç oturum uzadı ve bir konuşmacı çekildi. Genel olarak konferans amacına ulaştı.',
      e: "Ayrıntılardaki aksaklıklara karşın bütüne dair bir yargı veriliyor; 'overall' bütünü değerlendirir.",
      t: ['overall / all in all', 'namely'] },
    { s: 'The instrument reads within 0.2 degrees of the reference; ____, it is accurate enough for field use.',
      c: 'in other words', d: ['for instance', 'nonetheless', 'above all', 'meanwhile'],
      tr: 'Cihaz referansın 0,2 derece yakınında ölçüyor; başka bir deyişle saha kullanımı için yeterince hassas.',
      e: "Aynı bilgi daha yalın biçimde yeniden söyleniyor; bu 'in other words'ün işidir.",
      t: ['in other words', 'for instance'] },
    { s: 'The two texts share the same scribal hand; ____, they were copied in one workshop.',
      c: 'that is', d: ['for example', 'however', 'similarly', 'in conclusion'],
      tr: 'İki metin aynı müstensih elini taşıyor; yani tek bir atölyede kopyalanmışlar.',
      e: "Önceki ifadenin ne anlama geldiği açıklanıyor; 'that is' açıklama yapar, örnek vermez.",
      t: ['that is (i.e.)', 'for example'] },
    { s: 'The grant covers the fieldwork. ____, it pays for two seasons of conservation.',
      c: 'Moreover', d: ['Otherwise', 'In contrast', 'That is', 'On the contrary'],
      tr: 'Hibe saha çalışmasını karşılıyor. Üstelik iki sezonluk koruma çalışmasını da ödüyor.',
      e: "İkinci cümle aynı yönde yeni bir bilgi ekliyor; bu ekleme 'moreover' ile yapılır.",
      t: ['moreover', 'in addition'] },
    { s: 'The method is quicker than the standard assay. ____, it uses a tenth of the reagent.',
      c: 'What is more', d: ['Even so', 'Namely', 'In short', 'Conversely'],
      tr: 'Yöntem standart deneyden daha hızlı. Dahası reaktifin onda birini kullanıyor.',
      e: "Eklenen bilgi öncekinden daha çarpıcı; 'what is more' bu artan vurguyu taşır.",
      t: ['what is more', 'moreover'] },
    { s: 'The rota already covers weekends. ____, two volunteers have offered to cover holidays.',
      c: 'Besides', d: ['Instead', 'By contrast', 'In fact', 'Otherwise'],
      tr: 'Çizelge hafta sonlarını zaten kapsıyor. Ayrıca iki gönüllü tatilleri üstlenmeyi önerdi.',
      e: "'Besides' ekleme bildirir ve bir gerekçeyi güçlendirir; 'instead' yerine koyma, 'in fact' düzeltme yapar.",
      t: ['besides', 'moreover'] },
    { s: 'The excavation continued through August. ____, the finds were being catalogued in the depot.',
      c: 'Meanwhile', d: ['Consequently', 'Namely', 'In short', 'On the contrary'],
      tr: 'Kazı ağustos boyunca sürdü. Bu sırada buluntular depoda katalogleniyordu.',
      e: "İki iş aynı zaman diliminde yürüyor; eşzamanlılığı 'meanwhile' kurar, 'consequently' sonuç bildirirdi.",
      t: ['however', 'consequently / as a consequence'] },
    { s: 'The samples were sealed on site. ____, they were transferred to the cold store.',
      c: 'Afterwards', d: ['Meanwhile', 'Nevertheless', 'That is', 'Above all'],
      tr: 'Örnekler alanda mühürlendi. Ardından soğuk depoya aktarıldı.',
      e: "İkinci iş birincinin ardından geliyor; sıra bildiren ifade 'afterwards'tır. 'Meanwhile' eşzamanlılık kurardı.",
      t: ['however', 'moreover'] },
    { s: 'The report is thorough, current and readable. ____, it is the only one to cite the field notes.',
      c: 'Above all', d: ['In conclusion', 'On the whole', 'Meanwhile', 'Namely'],
      tr: 'Rapor kapsamlı, güncel ve okunaklı. En önemlisi, saha notlarına atıf yapan tek rapor.',
      e: "Sayılanlar arasından biri öne çıkarılıyor; bu sıralama 'above all' ile yapılır. 'In conclusion' metni kapatırdı.",
      t: ['indeed', 'in brief / in short'] },
    { s: 'The reform widened access, cut waiting times and lowered costs. ____, it achieved what it promised.',
      c: 'In conclusion', d: ['Above all', 'For instance', 'Otherwise', 'Conversely'],
      tr: 'Reform erişimi genişletti, bekleme sürelerini kısalttı ve maliyeti düşürdü. Sonuç olarak vaat ettiğini gerçekleştirdi.',
      e: "Sayılan kazanımlar bir kapanış yargısına bağlanıyor; kapanışı 'in conclusion' yapar.",
      t: ['in brief / in short', 'overall / all in all'] },
    { s: '____ the funding, the department has no plans to reopen the laboratory.',
      c: 'As for', d: ['Whereas', 'Although', 'However', 'Because'],
      tr: 'Fona gelince, bölümün laboratuvarı yeniden açma planı yok.',
      e: "Boşluktan sonra isim öbeği ('the funding') geliyor ve konu başlığı kuruluyor. 'Whereas', 'although' ve 'because' tam cümle ister; 'however' konu açamaz.",
      t: ['as for / as regards', 'although'] },
    { s: '____ the missing folios, the librarian could offer no explanation.',
      c: 'With respect to', d: ['Even though', 'Nevertheless', 'Unless', 'So that'],
      tr: 'Eksik yaprakların durumuna gelince, kütüphaneci hiçbir açıklama yapamadı.',
      e: "Boşluk isim öbeğinin önünde ve konu belirtiyor: 'with respect to' isim alır. Kalan seçenekler ya cümle ister ya da bu konumda duramaz.",
      t: ['with respect to / regarding', 'even though'] },
    { s: 'The trial met every safety criterion; ____, the ethics board withheld approval.',
      c: 'nonetheless', d: ['therefore', 'namely', 'likewise', 'in short'],
      tr: 'Deneme her güvenlik ölçütünü karşıladı; yine de etik kurul onay vermedi.',
      e: "Beklenen sonucun tersi çıkıyor; bu ters düşüşü 'nonetheless' taşır. 'Therefore' beklenen sonucu bildirirdi.",
      t: ['nonetheless', 'therefore'] },
    { s: 'The instrument was recalibrated twice; ____, the drift persisted.',
      c: 'even so', d: ['as a result', 'in other words', 'for instance', 'above all'],
      tr: 'Cihaz iki kez yeniden kalibre edildi; buna rağmen kayma sürdü.',
      e: "Yapılan işe rağmen sonuç değişmiyor; 'even so' bu direnci bildirir, 'as a result' ise beklenen sonuca bağlardı.",
      t: ['nevertheless', 'as a result / with the result that'] },
    { s: 'Three teams reported the same anomaly; ____, the finding is unlikely to be an artefact.',
      c: 'accordingly', d: ['on the contrary', 'namely', 'meanwhile', 'even so'],
      tr: 'Üç ekip aynı anomaliyi bildirdi; buna göre bulgunun bir yapaylık olması olası değil.',
      e: "İkinci cümle ilkinden çıkan mantıklı sonucu veriyor; 'accordingly' bu çıkarımı kurar.",
      t: ['accordingly', 'therefore'] },
    { s: 'The kiln was rebuilt in the same decade; ____, the pottery cannot predate 1640.',
      c: 'thus', d: ['otherwise', 'similarly', 'as for', 'in fact'],
      tr: 'Fırın aynı on yıl içinde yeniden inşa edildi; dolayısıyla çanak çömlek 1640 öncesine tarihlenemez.',
      e: "Kanıttan çıkarıma geçiliyor; 'thus' bu mantıksal sonucu bildirir.",
      t: ['thus', 'hence'] }
  ];

  function buildMeaning(need, startIndex) {
    const prompt = 'Boşluğa anlamca en uygun ifadeyi seçin:';
    const out = [];
    let i = startIndex;
    while (out.length < need) {
      const row = MEANING_ROWS[out.length % MEANING_ROWS.length];
      out.push(dropdown(`cdx3_m${i}`, prompt, row.s, row.c, row.d, row.tr, row.e, row.t, i, CTAGS));
      i++;
    }
    return out;
  }

  /* ── Bağlaç Kuralları · Alıştırma 4: Hata Bulma (Error Identification) ──────────────── */
  // Her satır bilinen bir kural ihlalini kurar; şıklar cümlenin parçalarıdır.
  const head2 = s => s.split(' ').slice(0, 2).join(' ');
  const tail2 = s => s.split(' ').slice(-2).join(' ');

  const ERROR_PATTERNS = [
    { src: 'np', build: n => ({
        s: `Despite of ${n.en}, ${n.b}.`, w: 'Despite of', o: [n.en, head2(n.b), tail2(n.b)],
        tr: `${cap(n.tr)} rağmen ${n.bt}.`,
        e: "'Despite' yanına asla 'of' almaz. 'In spite of' vardır, 'despite of' yoktur.",
        t: ['despite', 'in spite of'] }) },
    { src: 'np', build: n => ({
        s: `Although ${n.en}, ${n.b}.`, w: 'Although', o: [n.en, head2(n.b), tail2(n.b)],
        tr: `${cap(n.tr)} rağmen ${n.bt}.`,
        e: "'Although' arkasından isim öbeği almaz, tam cümle ister. İsim öbeği için 'Despite' ya da 'In spite of' gerekir.",
        t: ['although', 'despite'] }) },
    { src: 'np', build: n => ({
        s: `Even though ${n.en}, ${n.b}.`, w: 'Even though', o: [n.en, head2(n.b), tail2(n.b)],
        tr: `${cap(n.tr)} rağmen ${n.bt}.`,
        e: "'Even though' da 'although' gibi özne + fiil ister; isim öbeğinin önünde duramaz.",
        t: ['even though', 'in spite of'] }) },
    { src: 'np', build: n => ({
        s: `In spite ${n.en}, ${n.b}.`, w: 'In spite', o: [n.en, head2(n.b), tail2(n.b)],
        tr: `${cap(n.tr)} rağmen ${n.bt}.`,
        e: "'In spite' tek başına kullanılmaz; kalıbın 'of'u zorunludur: 'in spite of'.",
        t: ['in spite of', 'despite'] }) },
    { src: 'np', build: n => ({
        s: `Regardless ${n.en}, ${n.b}.`, w: 'Regardless', o: [n.en, head2(n.b), tail2(n.b)],
        tr: `${cap(n.tr)} bakılmaksızın ${n.bt}.`,
        e: "'Regardless' isim öbeğine 'of' ile bağlanır: 'regardless of the heavy traffic'.",
        t: ['regardless of / irrespective of', 'despite'] }) },
    { src: 'np', build: n => ({
        s: `In addition of ${n.en}, ${n.b}.`, w: 'In addition of', o: [n.en, head2(n.b), tail2(n.b)],
        tr: `${cap(n.tr)} ek olarak ${n.bt}.`,
        e: "Ekleme edatı 'in addition to'dur; 'in addition of' diye bir kalıp yoktur.",
        t: ['in addition', 'besides'] }) },
    { src: 'np', build: n => ({
        s: `Whereas ${n.en}, ${n.b}.`, w: 'Whereas', o: [n.en, head2(n.b), tail2(n.b)],
        tr: `${cap(n.tr)} karşın ${n.bt}.`,
        e: "'Whereas' iki tam cümleyi karşılaştırır; yanına doğrudan isim öbeği gelmez.",
        t: ['although', 'despite'] }) },
    { src: 'cause', build: p => ({
        s: `Because of ${p.a}, ${p.b}.`, w: 'Because of', o: [head2(p.a), tail2(p.a), tail2(p.b)],
        tr: `${cap(p.aDep)} ${p.bt}.`,
        e: "'Because of' isim öbeği alır; arkasından özne + fiil geldiği için burada 'Because' kullanılmalıydı.",
        t: ['because of / due to / owing to', 'because / since / as'] }) },
    { src: 'cause', build: p => ({
        s: `Due to ${p.a}, ${p.b}.`, w: 'Due to', o: [head2(p.a), tail2(p.a), tail2(p.b)],
        tr: `${cap(p.aDep)} ${p.bt}.`,
        e: "'Due to' da isim öbeği ister. Tam cümle bağlanacaksa 'Because' ya da 'Since' gerekir.",
        t: ['because of / due to / owing to', 'because / since / as'] }) },
    { src: 'cause', build: p => ({
        s: `Owing to ${p.a}, ${p.b}.`, w: 'Owing to', o: [head2(p.a), tail2(p.a), tail2(p.b)],
        tr: `${cap(p.aDep)} ${p.bt}.`,
        e: "'Owing to' isim öbeği alan bir edattır; cümle bağlamak için 'owing to the fact that' ya da 'because' kullanılır.",
        t: ['owing to the fact that', 'because / since / as'] }) },
    { src: 'cause', build: p => ({
        s: `Because ${p.a}, so ${p.b}.`, w: 'so', o: ['Because', head2(p.a), tail2(p.b)],
        tr: `${cap(p.aDep)} ${p.bt}.`,
        e: "İngilizcede tek ilişki için tek bağlaç kullanılır: 'because' varsa 'so' gelmez.",
        t: ['because / since / as', 'therefore'] }) },
    { src: 'cause', build: p => ({
        s: `${cap(p.a)}, therefore ${p.b}.`, w: 'therefore', o: [head2(p.a), tail2(p.a), tail2(p.b)],
        tr: `${cap(p.at)}; bu nedenle ${p.bt}.`,
        e: "'therefore' bir geçiş zarfıdır; iki bağımsız cümleyi virgül birleştiremez. Öncesinde noktalı virgül ya da nokta gerekir.",
        t: ['therefore', 'thus'] }) },
    { src: 'cause', build: p => ({
        s: `${cap(p.a)}; therefore ${p.b}.`, w: 'therefore', o: [head2(p.a), tail2(p.a), tail2(p.b)],
        tr: `${cap(p.at)}; bu nedenle ${p.bt}.`,
        e: "Noktalı virgülden sonra gelen geçiş zarfı virgülle ayrılır: '; therefore, ...'.",
        t: ['therefore', 'consequently / as a consequence'] }) },
    { src: 'contrast', build: p => ({
        s: `${cap(p.a)}, however ${p.b}.`, w: 'however', o: [head2(p.a), tail2(p.a), tail2(p.b)],
        tr: `${cap(p.at)}; ancak ${p.bt}.`,
        e: "'however' bağlaç değil zarftır; iki bağımsız cümleyi virgülle bağlayamaz. Doğrusu '; however,' ya da '. However,' olmalıdır.",
        t: ['however', 'nevertheless'] }) },
    { src: 'contrast', build: p => ({
        s: `${cap(p.a)}, moreover ${p.b}.`, w: 'moreover', o: [head2(p.a), tail2(p.a), tail2(p.b)],
        tr: `${cap(p.at)}; ayrıca ${p.bt}.`,
        e: "'moreover' de geçiş zarfıdır; virgülle birleştirilmiş iki bağımsız cümle hatalıdır.",
        t: ['moreover', 'furthermore'] }) },
    { src: 'contrast', build: p => ({
        s: `Although ${p.a}, but ${p.b}.`, w: 'but', o: ['Although', head2(p.a), tail2(p.b)],
        tr: `${cap(p.aDep)} ${p.bt}.`,
        e: "'Although' zaten zıtlığı kuruyor; aynı cümlede ikinci bir zıtlık bağlacı ('but') kullanılmaz.",
        t: ['although', 'however'] }) },
    { src: 'contrast', build: p => ({
        s: `Although ${p.a}, however ${p.b}.`, w: 'however', o: ['Although', head2(p.a), tail2(p.b)],
        tr: `${cap(p.aDep)} ${p.bt}.`,
        e: "Yan cümle bağlacı ile geçiş zarfı aynı ilişkiyi iki kez kurar; ikisinden yalnızca biri kullanılır.",
        t: ['although', 'however'] }) },
    { src: 'contrast', build: p => ({
        s: `Despite ${p.a}, ${p.b}.`, w: 'Despite', o: [head2(p.a), tail2(p.a), tail2(p.b)],
        tr: `${cap(p.aDep)} ${p.bt}.`,
        e: "'Despite' isim öbeği ister; arkasından özne + fiil geldiği için 'Although' kullanılmalıydı.",
        t: ['despite', 'although'] }) },
    { src: 'contrast', build: p => ({
        s: `In spite of ${p.a}, ${p.b}.`, w: 'In spite of', o: [head2(p.a), tail2(p.a), tail2(p.b)],
        tr: `${cap(p.aDep)} ${p.bt}.`,
        e: "'In spite of' de isim öbeği alır. Tam cümle bağlanacaksa 'in spite of the fact that' ya da 'although' gerekir.",
        t: ['in spite of', 'although'] }) },
    { src: 'contrast', build: p => ({
        s: `Despite the fact of ${p.a}, ${p.b}.`, w: 'the fact of', o: ['Despite', head2(p.a), tail2(p.b)],
        tr: `${cap(p.aDep)} ${p.bt}.`,
        e: "Kalıp 'despite the fact that'tir; 'the fact of' arkasından cümle alamaz.",
        t: ['despite', 'although'] }) }
  ];

  function buildErrors(need, startIndex) {
    const prompt = 'Cümledeki bağlaç hatasını bulunuz:';
    const out = [];
    let i = startIndex;
    while (out.length < need) {
      const pat = ERROR_PATTERNS[out.length % ERROR_PATTERNS.length];
      const round = Math.floor(out.length / ERROR_PATTERNS.length);
      const bank = pat.src === 'np' ? NOUN_PHRASES : pat.src === 'cause' ? CAUSE_PAIRS : CONTRAST_PAIRS;
      const row = pat.build(bank[round % bank.length]);
      out.push(spotting(`cdx4_e${i}`, prompt, row.s, row.w, row.o, row.tr, row.e, row.t, i, CTAGS));
      i++;
    }
    return out;
  }

  /* ── Bağlaç Kuralları · Alıştırma 5: Bağlaç Eşleştirme (Matching) ────────────────────── */
  // Dört sınıf birbirine karışmasın diye her sette her sınıftan bir terim var.
  const SLOT_NOUN = 'Arkasından isim öbeği gelir';
  const SLOT_CLAUSE = 'Arkasından tam cümle (özne + fiil) gelir';
  const SLOT_COORD = 'İki bağımsız cümleyi virgülle birleştirir';
  const SLOT_TRANS = 'Noktalı virgülden sonra gelir, ardına virgül alır';

  const NOUN_TERMS = [
    ['despite', 'despite'], ['in spite of', 'in spite of'], ['regardless of', 'regardless of / irrespective of'],
    ['notwithstanding', 'notwithstanding'], ['as for', 'as for / as regards'], ['with respect to', 'with respect to / regarding'],
    ['apart from', 'apart from / aside from'], ['barring', 'barring / except for'], ['due to', 'because of / due to / owing to'],
    ['because of', 'because of / due to / owing to'], ['in addition to', 'in addition'], ['including', 'including']
  ];
  const CLAUSE_TERMS = [
    ['although', 'although'], ['even though', 'even though'], ['though', 'though'],
    ['provided that', 'provided that / providing that'], ['unless', 'unless'], ['in case', 'in case / in the event of'],
    ['as if', 'as if / as though'], ['so that', 'so that / in order that'], ['lest', 'lest / for fear that'],
    ['because', 'because / since / as'], ['while', 'while / as'], ['before', 'before']
  ];
  const COORD_TERMS = [['and', null], ['but', null], ['so', null], ['or', null], ['yet', null], ['nor', null], ['for', null]];
  const TRANS_TERMS = [
    ['however', 'however'], ['nevertheless', 'nevertheless'], ['nonetheless', 'nonetheless'],
    ['moreover', 'moreover'], ['furthermore', 'furthermore'], ['besides', 'besides'],
    ['likewise', 'likewise'], ['similarly', 'similarly'], ['conversely', 'conversely'],
    ['otherwise', 'otherwise'], ['indeed', 'indeed'], ['namely', 'namely'],
    ['specifically', 'specifically'], ['thus', 'thus'], ['hence', 'hence'],
    ['accordingly', 'accordingly'], ['consequently', 'consequently / as a consequence'],
    ['in short', 'in brief / in short'], ['overall', 'overall / all in all'], ['in other words', 'in other words']
  ];

  function buildMatching(need, startIndex) {
    const out = [];
    for (let k = 0; k < need; k++) {
      const i = startIndex + k;
      const n = NOUN_TERMS[k % NOUN_TERMS.length];
      const c = CLAUSE_TERMS[(k * 3) % CLAUSE_TERMS.length];
      const j = COORD_TERMS[(k * 5) % COORD_TERMS.length];
      const t = TRANS_TERMS[(k * 7) % TRANS_TERMS.length];
      // Sıra da dönüşümlü olsun; hep aynı sınıf başta durmasın.
      const pairs = rotate([
        { left: n[0], right: SLOT_NOUN },
        { left: c[0], right: SLOT_CLAUSE },
        { left: j[0], right: SLOT_COORD },
        { left: t[0], right: SLOT_TRANS }
      ], k % 4);
      out.push({
        id: `cdx5_m${i}`, type: 'matching',
        prompt: 'Her bağlacı, kendisinden sonra gelen yapıyla eşleştirin.',
        pairs,
        grammarTags: CTAGS,
        terms: [n[1], c[1], t[1]].filter(Boolean)
      });
    }
    return out;
  }

  /* ── Bağlaç Kuralları · Alıştırma 6: Neden-Sonuç Yönü (Result in / Result from) ───────────────────── */
  // Fiil, özneyi neden mi sonuç mu yapıyor: yön yanlışsa cümle tersine döner.
  // Şık listelerinde Türkçe karşılık: sınanan şey yön ve edat olduğu için
  // sözcüğün anlamını tahmin etmek soruya dahil değil.
  const CE_GLOSS = {
    'led to': '-e yol açtı', 'gave rise to': '-i doğurdu', 'contributed to': '-e katkıda bulundu',
    'paved the way for': '-e zemin hazırladı', 'brought about': 'ortaya çıkardı',
    'resulted from': '-den kaynaklandı', 'stemmed from': '-den köken aldı',
    'arose from': '-den doğdu', 'originated in': '-de başladı',
    'was attributed to': '-e bağlandı'
  };
  const ceGloss = phrase => (CE_GLOSS[phrase] ? `${phrase} (${CE_GLOSS[phrase]})` : phrase);

  const FORWARD_VERBS = [
    { en: 'led to', tr: 'yol açtı' }, { en: 'gave rise to', tr: 'yol açtı' },
    { en: 'contributed to', tr: 'katkıda bulundu' }, { en: 'paved the way for', tr: 'zemin hazırladı' }
  ];
  const BACKWARD_VERBS = [
    { en: 'resulted from', tr: 'kaynaklandı' }, { en: 'stemmed from', tr: 'kaynaklandı' },
    { en: 'arose from', tr: 'doğdu' }, { en: 'originated in', tr: 'kaynaklandı' }
  ];

  // Aynı kalıptan birden çok soru çıkarken cümleler birebir tekrar etmesin diye
  // anlamı bozmayan bir belirteç ekleniyor.
  const SCOPES = [
    { en: '', tr: '' },
    { en: ' across the region', tr: 'bölge genelinde ' },
    { en: ' within six months', tr: 'altı ay içinde ' },
    { en: ' in the following decade', tr: 'sonraki on yılda ' },
    { en: ' in every sector', tr: 'her sektörde ' },
    { en: ' throughout the period', tr: 'dönem boyunca ' },
    { en: ' at national level', tr: 'ulusal ölçekte ' },
    { en: ' in the north of the country', tr: 'ülkenin kuzeyinde ' }
  ];

  function buildCauseEffect(need, startIndex) {
    const prompt = 'Cümledeki neden-sonuç yönüne uygun ifadeyi seçin:';
    const out = [];
    let i = startIndex;
    while (out.length < need) {
      const step = out.length;
      const p = CE_PAIRS[Math.floor(step / 2) % CE_PAIRS.length];
      const forward = step % 2 === 0;
      const vIdx = Math.floor(step / (2 * CE_PAIRS.length)) % FORWARD_VERBS.length;
      const scope = SCOPES[Math.floor(step / (2 * CE_PAIRS.length)) % SCOPES.length];
      if (forward) {
        const v = FORWARD_VERBS[vIdx];
        out.push(dropdown(`cdx6_c${i}`, prompt,
          `${p.c} ____ ${p.e}${scope.en}.`, ceGloss(v.en),
          BACKWARD_VERBS.map(x => x.en).filter(x => x !== v.en).slice(0, 3).concat(['was attributed to']).map(ceGloss),
          `${p.ct} ${scope.tr}${p.et} ${v.tr}.`,
          `Özne (${p.ct.toLowerCase()}) NEDEN, nesne (${p.eS.toLowerCase()}) SONUÇtur. '${v.en}' nedenden sonuca gider; 'resulted from', 'stemmed from', 'arose from' ve 'was attributed to' ise özneyi sonuç konumuna koyarak yönü tersine çevirir.`,
          ['result from / results from', 'stem from / stems from', 'arise from / out of'], i, CTAGS));
      } else {
        const v = BACKWARD_VERBS[vIdx];
        out.push(dropdown(`cdx6_c${i}`, prompt,
          `${cap(p.e)}${scope.en} ____ ${p.c.toLowerCase()}.`, ceGloss(v.en),
          FORWARD_VERBS.map(x => x.en).filter(x => x !== v.en).slice(0, 3).concat(['brought about']).map(ceGloss),
          `${scope.tr ? cap(scope.tr) : ''}${scope.tr ? p.eS.toLowerCase() : p.eS} ${p.cS} ${v.tr}.`,
          `Bu kez özne (${p.eS.toLowerCase()}) SONUÇ, nesne (${p.ct.toLowerCase()}) NEDENdir. '${v.en}' sonuçtan nedene bakar; 'led to', 'gave rise to' ve 'brought about' yönü ters çevirirdi.`,
          ['result from / results from', 'lead to / leads to', 'bring about / brings about'], i, CTAGS));
      }
      i++;
    }
    return out;
  }

  /* ── Zaman alıştırmaları için Türkçe yan cümle biçimleri ────────────────── */
  // ACTORS ile aynı sırada; her satır o öznenin yan cümle çekimlerini taşır.
  const CLAUSE_TR = [
    { gen: 'komisyonun', after: 'komisyon bütçeyi onayladıktan sonra', before: 'komisyon bütçeyi onaylamadan önce',
      when: 'komisyon bütçeyi onayladığında', until: 'komisyon bütçeyi onaylayana kadar',
      since: 'komisyon bütçeyi onayladığından beri', asap: 'komisyon bütçeyi onaylar onaylamaz',
      cond: 'komisyon bütçeyi onaylarsa', if2: 'komisyon bütçeyi onaylasa', if3: 'komisyon bütçeyi onaylasaydı',
      subjAcc: 'komisyonun bütçeyi onaylamasını', subjNom: 'komisyonun bütçeyi onaylaması', subjGen: 'komisyonun bütçeyi onaylamasının' },
    { gen: 'araştırmacıların', after: 'araştırmacılar verileri doğruladıktan sonra', before: 'araştırmacılar verileri doğrulamadan önce',
      when: 'araştırmacılar verileri doğruladığında', until: 'araştırmacılar verileri doğrulayana kadar',
      since: 'araştırmacılar verileri doğruladığından beri', asap: 'araştırmacılar verileri doğrular doğrulamaz',
      cond: 'araştırmacılar verileri doğrularsa', if2: 'araştırmacılar verileri doğrulasa', if3: 'araştırmacılar verileri doğrulasaydı',
      subjAcc: 'araştırmacıların verileri doğrulamasını', subjNom: 'araştırmacıların verileri doğrulaması', subjGen: 'araştırmacıların verileri doğrulamasının' },
    { gen: 'müzenin', after: 'müze el yazmalarını katalogladıktan sonra', before: 'müze el yazmalarını kataloglamadan önce',
      when: 'müze el yazmalarını katalogladığında', until: 'müze el yazmalarını kataloglayana kadar',
      since: 'müze el yazmalarını katalogladığından beri', asap: 'müze el yazmalarını kataloglar kataloglamaz',
      cond: 'müze el yazmalarını kataloglarsa', if2: 'müze el yazmalarını kataloglasa', if3: 'müze el yazmalarını kataloglasaydı',
      subjAcc: 'müzenin el yazmalarını kataloglamasını', subjNom: 'müzenin el yazmalarını kataloglaması', subjGen: 'müzenin el yazmalarını kataloglamasının' },
    { gen: 'hükümetin', after: 'hükümet reformu uyguladıktan sonra', before: 'hükümet reformu uygulamadan önce',
      when: 'hükümet reformu uyguladığında', until: 'hükümet reformu uygulayana kadar',
      since: 'hükümet reformu uyguladığından beri', asap: 'hükümet reformu uygular uygulamaz',
      cond: 'hükümet reformu uygularsa', if2: 'hükümet reformu uygulasa', if3: 'hükümet reformu uygulasaydı',
      subjAcc: 'hükümetin reformu uygulamasını', subjNom: 'hükümetin reformu uygulaması', subjGen: 'hükümetin reformu uygulamasının' },
    { gen: 'mühendislerin', after: 'mühendisler sensörleri kalibre ettikten sonra', before: 'mühendisler sensörleri kalibre etmeden önce',
      when: 'mühendisler sensörleri kalibre ettiğinde', until: 'mühendisler sensörleri kalibre edene kadar',
      since: 'mühendisler sensörleri kalibre ettiğinden beri', asap: 'mühendisler sensörleri kalibre eder etmez',
      cond: 'mühendisler sensörleri kalibre ederse', if2: 'mühendisler sensörleri kalibre etse', if3: 'mühendisler sensörleri kalibre etseydi',
      subjAcc: 'mühendislerin sensörleri kalibre etmesini', subjNom: 'mühendislerin sensörleri kalibre etmesi', subjGen: 'mühendislerin sensörleri kalibre etmesinin' },
    { gen: 'tarihçilerin', after: 'tarihçiler arşivi inceledikten sonra', before: 'tarihçiler arşivi incelemeden önce',
      when: 'tarihçiler arşivi incelediğinde', until: 'tarihçiler arşivi inceleyene kadar',
      since: 'tarihçiler arşivi incelediğinden beri', asap: 'tarihçiler arşivi inceler incelemez',
      cond: 'tarihçiler arşivi incelerse', if2: 'tarihçiler arşivi incelese', if3: 'tarihçiler arşivi inceleseydi',
      subjAcc: 'tarihçilerin arşivi incelemesini', subjNom: 'tarihçilerin arşivi incelemesi', subjGen: 'tarihçilerin arşivi incelemesinin' },
    { gen: 'konseyin', after: 'konsey öneriyi reddettikten sonra', before: 'konsey öneriyi reddetmeden önce',
      when: 'konsey öneriyi reddettiğinde', until: 'konsey öneriyi reddedene kadar',
      since: 'konsey öneriyi reddettiğinden beri', asap: 'konsey öneriyi reddeder etmez',
      cond: 'konsey öneriyi reddederse', if2: 'konsey öneriyi reddetse', if3: 'konsey öneriyi reddetseydi',
      subjAcc: 'konseyin öneriyi reddetmesini', subjNom: 'konseyin öneriyi reddetmesi', subjGen: 'konseyin öneriyi reddetmesinin' },
    { gen: 'editörlerin', after: 'editörler makaleyi yayımladıktan sonra', before: 'editörler makaleyi yayımlamadan önce',
      when: 'editörler makaleyi yayımladığında', until: 'editörler makaleyi yayımlayana kadar',
      since: 'editörler makaleyi yayımladığından beri', asap: 'editörler makaleyi yayımlar yayımlamaz',
      cond: 'editörler makaleyi yayımlarsa', if2: 'editörler makaleyi yayımlasa', if3: 'editörler makaleyi yayımlasaydı',
      subjAcc: 'editörlerin makaleyi yayımlamasını', subjNom: 'editörlerin makaleyi yayımlaması', subjGen: 'editörlerin makaleyi yayımlamasının' },
    { gen: 'denetçilerin', after: 'denetçiler hesapları gözden geçirdikten sonra', before: 'denetçiler hesapları gözden geçirmeden önce',
      when: 'denetçiler hesapları gözden geçirdiğinde', until: 'denetçiler hesapları gözden geçirene kadar',
      since: 'denetçiler hesapları gözden geçirdiğinden beri', asap: 'denetçiler hesapları gözden geçirir geçirmez',
      cond: 'denetçiler hesapları gözden geçirirse', if2: 'denetçiler hesapları gözden geçirse', if3: 'denetçiler hesapları gözden geçirseydi',
      subjAcc: 'denetçilerin hesapları gözden geçirmesini', subjNom: 'denetçilerin hesapları gözden geçirmesi', subjGen: 'denetçilerin hesapları gözden geçirmesinin' },
    { gen: 'laboratuvarın', after: 'laboratuvar örnekleri analiz ettikten sonra', before: 'laboratuvar örnekleri analiz etmeden önce',
      when: 'laboratuvar örnekleri analiz ettiğinde', until: 'laboratuvar örnekleri analiz edene kadar',
      since: 'laboratuvar örnekleri analiz ettiğinden beri', asap: 'laboratuvar örnekleri analiz eder etmez',
      cond: 'laboratuvar örnekleri analiz ederse', if2: 'laboratuvar örnekleri analiz etse', if3: 'laboratuvar örnekleri analiz etseydi',
      subjAcc: 'laboratuvarın örnekleri analiz etmesini', subjNom: 'laboratuvarın örnekleri analiz etmesi', subjGen: 'laboratuvarın örnekleri analiz etmesinin' }
  ];

  const A = i => ACTORS[i % ACTORS.length];
  const C = i => CLAUSE_TR[i % CLAUSE_TR.length];
  const has = a => (a.plural ? 'have' : 'has');
  const be = a => (a.plural ? 'are' : 'is');
  const beP = a => (a.plural ? 'were' : 'was');
  const doA = a => (a.plural ? 'do' : 'does');
  const v1n = a => (a.plural ? a.v.v1 : a.v.v1s);

  /* ── Zaman Uyumu · Alıştırma 1: Zaman Belirteçleri (Ago / Already / Yet / For / Since) ────────────────────────────── */
  // Tek taraflı belirleyicilar: belirleyiciyi gören çekimi bilir, ikinci cümleye gerek yoktur.
  const ANCHOR_RULES = [
    { key: 'since', build: (a, c) => ({
        s: `${cap(a.s)} ____ ${a.o} since 2018.`,
        w: `${has(a)} been ${a.v.ing}`,
        d: [a.v.v2, `${be(a)} ${a.v.ing}`, `had been ${a.v.ing}`, `will be ${a.v.ing}`],
        tr: `${cap(a.st)} 2018'den beri ${a.ot} ${a.t.sim}.`,
        e: "'since + başlangıç noktası' bugüne uzanan bir süreç kurar; Present Perfect Continuous ister. Simple Past bu süreci geçmişte kapatırdı.",
        t: ['since', 'so far / up to now / hitherto / in recent years'] }) },
    { key: 'for', build: (a, c) => ({
        s: `${cap(a.s)} ____ ${a.o} for six years.`,
        w: `${has(a)} ${a.v.v3}`,
        d: [a.v.v2, `${be(a)} ${a.v.ing}`, `had ${a.v.v3}`, `will ${a.v.v1}`],
        tr: `${cap(a.st)} altı yıldır ${a.ot} ${a.t.sim}.`,
        e: "'for + süre' şu ana uzanan bir süreyi bildirir ve Present Perfect ister; Simple Past süreci bugünden koparır.",
        t: ['for + süre', 'since'] }) },
    { key: 'ago', build: (a, c) => ({
        s: `${cap(a.s)} ____ ${a.o} two years ago.`,
        w: a.v.v2,
        d: [`${has(a)} ${a.v.v3}`, `had ${a.v.v3}`, `${be(a)} ${a.v.ing}`, `will ${a.v.v1}`],
        tr: `${cap(a.st)} iki yıl önce ${a.ot} ${a.t.past}.`,
        e: "'ago' geçmişte KAPALI bir anı işaret eder ve yalnızca Simple Past alır; Present Perfect 'ago' ile kullanılamaz.",
        t: ['ago', 'since'] }) },
    { key: 'already', build: (a, c) => ({
        s: `${cap(a.s)} ${has(a)} already ____ ${a.o}.`,
        w: a.v.v3,
        d: [a.v.v1, a.v.ing, `to ${a.v.v1}`, `been ${a.v.v3}`],
        tr: `${cap(a.st)} ${a.ot} çoktan ${a.t.past}.`,
        e: "'already' Present Perfect'in belirleyicisidir: has/have + V3. Yardımcı fiilden sonra yalın fiil ya da V-ing gelemez.",
        t: ['already'] }) },
    { key: 'so far', build: (a, c) => ({
        s: `So far ${a.s} ${has(a)} ____ ${a.o} twice.`,
        w: a.v.v3,
        d: [a.v.v1, a.v.ing, `to ${a.v.v1}`, `being ${a.v.v3}`],
        tr: `${cap(a.st)} şimdiye kadar ${a.ot} iki kez ${a.t.past}.`,
        e: "'so far' bugüne kadarki bilançoyu verir; Present Perfect ister ve yardımcı fiilin ardına V3 gelir.",
        t: ['so far / up to now / hitherto / in recent years'] }) },
    { key: 'by 2030', build: (a, c) => ({
        s: `By 2030 ${a.s} ____ ${a.o}.`,
        w: `will have ${a.v.v3}`,
        d: [`will ${a.v.v1}`, `${has(a)} ${a.v.v3}`, `had ${a.v.v3}`, `${be(a)} ${a.v.ing}`],
        tr: `${cap(a.st)} 2030'a kadar ${a.ot} ${a.t.futPerf}.`,
        e: "Gelecekteki bir sınır ('by 2030') o ana kadar tamamlanmayı ister: Future Perfect. 'will + V1' sınırı değil, tek bir anı anlatır.",
        t: ['by + Gelecek / Geçmiş Zaman Belirleyicisi'] }) },
    { key: 'last year', build: (a, c) => ({
        s: `${cap(a.s)} ____ ${a.o} last year.`,
        w: a.v.v2,
        d: [`${has(a)} ${a.v.v3}`, `will ${a.v.v1}`, `${be(a)} ${a.v.ing}`, `had ${a.v.v3}`],
        tr: `${cap(a.st)} geçen yıl ${a.ot} ${a.t.past}.`,
        e: "'last year' kapanmış bir dönemdir; noktasal geçmiş belirleyicilerinde Present Perfect kullanılamaz.",
        t: ['ago'] }) },
    { key: 'currently', build: (a, c) => ({
        s: `${cap(a.s)} ${be(a)} currently ____ ${a.o}.`,
        w: a.v.ing,
        d: [a.v.v1, a.v.v3, `to ${a.v.v1}`, `been ${a.v.ing}`],
        tr: `${cap(a.st)} şu anda ${a.ot} ${a.t.sim}.`,
        e: "'currently' konuşma anını gösterir: am/is/are + V-ing. Yardımcı fiilden sonra yalın fiil gelemez.",
        // 'so far / up to now' Present Perfect ister; bu soru Present Continuous
        // soruyor. Veritabanında 'currently' için ayrı bir kart yok, bu yüzden
        // yanlış kategoriden kart göstermek yerine hatırlatıcı gösterilmiyor.
        t: [] }) },
    { key: 'by the end of last year', build: (a, c) => ({
        s: `By the end of last year ${a.s} ____ ${a.o}.`,
        w: `had ${a.v.v3}`,
        d: [`${has(a)} ${a.v.v3}`, `will have ${a.v.v3}`, a.v.v2, `${be(a)} ${a.v.ing}`],
        tr: `${cap(a.st)} geçen yılın sonuna kadar ${a.ot} ${a.t.plu}.`,
        e: "Geçmişteki bir sınır o ana kadar tamamlanmayı ister: Past Perfect. Aynı kalıp gelecekte 'will have V3' olurdu.",
        t: ['by + Gelecek / Geçmiş Zaman Belirleyicisi'] }) },
    { key: 'every spring', build: (a, c) => ({
        s: `${cap(a.s)} ____ ${a.o} every spring.`,
        w: v1n(a),
        d: [`${be(a)} ${a.v.ing}`, `${has(a)} ${a.v.v3}`, `will ${a.v.v1}`, `had ${a.v.v3}`],
        tr: `${cap(a.st)} her ilkbahar ${a.ot} ${a.t.gen}.`,
        e: "Tekrarlanan rutin geniş zaman ister; süreklilik çekimi tek seferlik bir anı anlatırdı.",
        // Aynı sebep: bu soru Present Simple/rutin soruyor, 'so far/up to now'
        // ise Present Perfect gerektirir; yanlış kategori kartı göstermemek
        // için hatırlatıcı boş bırakıldı.
        t: [] }) }
  ];

  function buildAnchors(need, startIndex) {
    const prompt = 'Zamanı belirleyen ifadeye uygun fiil biçimini seçin:';
    const out = [];
    let i = startIndex;
    while (out.length < need) {
      const rule = ANCHOR_RULES[out.length % ANCHOR_RULES.length];
      const k = Math.floor(out.length / ANCHOR_RULES.length);
      const idx = (out.length + k * 3) % ACTORS.length;
      const row = rule.build(A(idx), C(idx));
      out.push(dropdown(`tdx1_a${i}`, prompt, row.s, row.w, row.d, row.tr, row.e, row.t, i, TTAGS));
      i++;
    }
    return out;
  }

  /* ── Zaman Uyumu · Alıştırma 2: Zaman Uyumu (Sequence of Tenses: Once / After / While) ──────────────────────── */
  const HARMONY_RULES = [
    { build: (a, c) => ({
        s: `By the time the inspectors arrive, ${a.s} ____ ${a.o}.`,
        w: `will have ${a.v.v3}`,
        d: [`will ${a.v.v1}`, `${has(a)} ${a.v.v3}`, `had ${a.v.v3}`, a.v.v2],
        tr: `Müfettişler geldiğinde ${a.st} ${a.ot} ${a.t.futPerf}.`,
        e: "'By the time + geniş zaman' gelecek bir sınır kurar; ana cümle o sınıra kadar tamamlanmayı gösterir: will have + V3.",
        t: ['by the time'] }) },
    { build: (a, c) => ({
        s: `By the time the grant was approved, ${a.s} ____ ${a.o}.`,
        w: `had ${a.v.v3}`,
        d: [`will have ${a.v.v3}`, `${has(a)} ${a.v.v3}`, a.v.v2, `${be(a)} ${a.v.ing}`],
        tr: `Hibe onaylandığında ${a.st} ${a.ot} ${a.t.plu}.`,
        e: "'By the time' yan cümlesi Geçmiş Zamandaysa ana cümle Past Perfect olur: iki geçmiş eylemden önce olanı 'had V3' taşır.",
        t: ['by the time'] }) },
    { build: (a, c) => ({
        s: `${cap(a.s)} ____ ${a.o} since the archive reopened.`,
        w: `${has(a)} ${a.v.v3}`,
        d: [a.v.v2, `had ${a.v.v3}`, `will ${a.v.v1}`, `${be(a)} ${a.v.ing}`],
        tr: `Arşiv yeniden açıldığından beri ${a.st} ${a.ot} ${a.t.past}.`,
        e: "'since + V2' başlangıç anını verir; ana cümle bugüne uzandığı için Present Perfect olur.",
        t: ['since'] }) },
    { build: (a, c) => ({
        s: `After ${a.s} ____ ${a.o}, the findings were released.`,
        w: `had ${a.v.v3}`,
        d: [`${has(a)} ${a.v.v3}`, v1n(a), `will ${a.v.v1}`, `${be(a)} ${a.v.ing}`],
        tr: `${cap(c.after)} bulgular açıklandı.`,
        e: "Geçmişte iki eylem varsa önce olan 'had V3' ile kurulur; 'after' o önceliği zaten söylediği için ana cümle Simple Past kalır.",
        t: ['after'] }) },
    { build: (a, c) => ({
        s: `Before the funding was withdrawn, ${a.s} ____ ${a.o}.`,
        w: `had ${a.v.v3}`,
        d: [a.v.v2, `${has(a)} ${a.v.v3}`, `will have ${a.v.v3}`, `${be(a)} ${a.v.ing}`],
        tr: `Fon geri çekilmeden önce ${a.st} ${a.ot} ${a.t.plu}.`,
        e: "'before' cümlesinde öncelik ana cümledeyse ana cümle Past Perfect alır.",
        t: ['before'] }) },
    { build: (a, c) => ({
        s: `While the power was failing, ${a.s} ____ ${a.o}.`,
        w: `${beP(a)} ${a.v.ing}`,
        d: [`${has(a)} ${a.v.v3}`, `had ${a.v.v3}`, `will be ${a.v.ing}`, v1n(a)],
        tr: `Elektrik kesilirken ${a.st} ${a.ot} ${a.t.pastCont}.`,
        e: "'while' eşzamanlılık kurar: her iki taraf da sürerlik çekimi ister (was/were + V-ing).",
        t: ['while / as'] }) },
    { build: (a, c) => ({
        s: `As soon as ${a.s} ${v1n(a)} ${a.o}, the results ____ published.`,
        w: 'will be',
        d: ['were', 'had been', 'have been', 'are being'],
        tr: `${cap(c.asap)} sonuçlar yayımlanacak.`,
        e: "'as soon as' yan cümlesi geniş zamandır ama anlamı gelecektir; ana cümle 'will' alır.",
        t: ['as soon as / once / the moment'] }) },
    { build: (a, c) => ({
        s: `Once ${a.s} had ${a.v.v3} ${a.o}, the department ____ the summary.`,
        w: 'issued',
        d: ['will issue', 'has issued', 'had issued', 'is issuing'],
        tr: `${cap(c.after)} bölüm özeti yayımladı.`,
        e: "Yan cümle Past Perfect ise ana cümle Simple Past olur; iki tarafta birden 'had V3' kullanılmaz.",
        t: ['as soon as / once / the moment'] }) }
  ];

  function buildHarmony(need, startIndex) {
    const prompt = 'Yan cümlenin zamanına göre doğru biçimi seçin:';
    const out = [];
    let i = startIndex;
    while (out.length < need) {
      const rule = HARMONY_RULES[out.length % HARMONY_RULES.length];
      const k = Math.floor(out.length / HARMONY_RULES.length);
      const idx = (out.length + k * 3) % ACTORS.length;
      const row = rule.build(A(idx), C(idx));
      out.push(dropdown(`tdx2_b${i}`, prompt, row.s, row.w, row.d, row.tr, row.e, row.t, i, TTAGS));
      i++;
    }
    return out;
  }

  /* ── Zaman Uyumu · Alıştırma 3: Devrik Yapılar (No Sooner / Hardly / Not Until) ── */
  const INVERSION_RULES = [
    { build: (a, c, aft) => ({
        s: `No sooner ____ ${a.s} ${a.v.v3} ${a.o} than ${aft.en}.`,
        w: 'had', d: ['did', 'has', 'was', 'would'],
        tr: `${cap(c.asap)} ${aft.tr}.`,
        e: "'No sooner' cümle başındayken yardımcı fiil özneden önce gelir ve daima 'had' olur: No sooner had + özne + V3.",
        t: ['no sooner ... than'] }) },
    { build: (a, c, aft) => ({
        s: `No sooner had ${a.s} ${a.v.v3} ${a.o} ____ ${aft.en}.`,
        w: 'than', d: ['when', 'that', 'then', 'as'],
        tr: `${cap(c.asap)} ${aft.tr}.`,
        e: "'No sooner' daima 'than' ile eşleşir; 'when' yalnızca hardly / barely / scarcely ile kullanılır.",
        t: ['no sooner ... than'] }) },
    { build: (a, c, aft) => ({
        s: `Hardly had ${a.s} ${a.v.v3} ${a.o} ____ ${aft.en}.`,
        w: 'when', d: ['than', 'that', 'then', 'as'],
        tr: `${cap(c.asap)} ${aft.tr}.`,
        e: "'Hardly / barely / scarcely' eşi 'when'dir; 'than' yalnızca 'no sooner' ile gelir.",
        t: ['hardly / barely / scarcely ... when'] }) },
    { build: (a, c, aft) => ({
        s: `Scarcely ____ ${a.s} ${a.v.v3} ${a.o} when ${aft.en}.`,
        w: 'had', d: ['did', 'has', 'have', 'was'],
        tr: `${cap(c.asap)} ${aft.tr}.`,
        e: "Devrik kilitte ilk eylem daima 'had V3'tür; ikinci eylem V2 kalır. İki Past Perfect üst üste gelmez.",
        t: ['hardly / barely / scarcely ... when'] }) },
    { build: (a, c, aft) => ({
        s: `Not until the audit ended ____ ${a.s} ${a.v.v1} ${a.o}.`,
        w: 'did', d: ['had', 'has', 'was', 'would'],
        tr: `${cap(a.st)} ancak denetim bittiğinde ${a.ot} ${a.t.past}.`,
        e: "Olumsuz zarf öbeği başa gelince ana cümle devrilir; Simple Past'ta devriklik 'did + yalın fiil' ile kurulur.",
        t: ['until / till'] }) },
    { build: (a, c, aft) => ({
        s: `It was not until the audit ended ____ ${a.s} ${a.v.v2} ${a.o}.`,
        w: 'that', d: ['when', 'than', 'which', 'then'],
        tr: `${cap(a.st)} ancak denetim bittiğinde ${a.ot} ${a.t.past}.`,
        e: "'It was not until ... that' kalıbı sabittir; vurgulanan öğe 'that' ile ana cümleye bağlanır.",
        t: ['until / till'] }) }
  ];

  function buildInversion(need, startIndex) {
    const prompt = 'Devrik zaman yapısına uygun biçimi seçin:';
    const out = [];
    let i = startIndex;
    while (out.length < need) {
      const rule = INVERSION_RULES[out.length % INVERSION_RULES.length];
      const k = Math.floor(out.length / INVERSION_RULES.length);
      const idx = (out.length + k * 3) % ACTORS.length;
      const row = rule.build(A(idx), C(idx), AFTERMATH[(out.length + k) % AFTERMATH.length]);
      out.push(dropdown(`tdx3_c${i}`, prompt, row.s, row.w, row.d, row.tr, row.e, row.t, i, TTAGS));
      i++;
    }
    return out;
  }

  /* ── Zaman Uyumu · Alıştırma 4: Zaman/Şart Cümleciklerinde Will Yasağı (If / When / As Soon As) ─────────────────── */
  const MAIN_FUTURE = [
    { en: 'the results will be released', tr: 'sonuçlar açıklanacak' },
    { en: 'the site will reopen', tr: 'alan yeniden açılacak' },
    { en: 'the alarm will sound', tr: 'alarm çalacak' },
    { en: 'the funding will be released', tr: 'fon serbest bırakılacak' },
    { en: 'the report will go to print', tr: 'rapor baskıya girecek' },
    { en: 'the exhibition will open', tr: 'sergi açılacak' }
  ];

  const WILL_BAN_RULES = [
    { conj: 'when', trKey: 'when', note: "'when' zaman yan cümlesidir; gelecek anlamı geniş zamanla verilir." },
    { conj: 'as soon as', trKey: 'asap', note: "'as soon as' yan cümlesine 'will' gelmez; anlam gelecek olsa da çekim geniş zamandır." },
    { conj: 'until', trKey: 'until', main: { en: 'the site will stay closed', tr: 'alan kapalı kalacak' },
      note: "'until' zaman yan cümlesidir ve 'will' almaz; ayrıca kendi içinde olumsuzluk taşımaz." },
    { conj: 'before', trKey: 'before', note: "'before' yan cümlesinde gelecek zaman eki kullanılmaz." },
    { conj: 'after', trKey: 'after', note: "'after' yan cümlesi geniş zaman ya da Present Perfect alır; 'will' alamaz." },
    { conj: 'if', trKey: 'cond', note: "'if' koşul yan cümlesidir; Tip 1'de yan cümle geniş zaman, ana cümle 'will' alır." }
  ];

  function buildWillBan(need, startIndex) {
    const prompt = 'Yan cümleye gelebilecek doğru fiil biçimini seçin:';
    const out = [];
    let i = startIndex;
    while (out.length < need) {
      const rule = WILL_BAN_RULES[out.length % WILL_BAN_RULES.length];
      const k = Math.floor(out.length / WILL_BAN_RULES.length);
      const idx = (out.length + k * 3) % ACTORS.length;
      const a = A(idx), c = C(idx);
      const main = rule.main || MAIN_FUTURE[(out.length + k) % MAIN_FUTURE.length];
      out.push(dropdown(`tdx4_e${i}`, prompt,
        `${cap(main.en)} ${rule.conj} ${a.s} ____ ${a.o}.`,
        v1n(a),
        [`will ${a.v.v1}`, `would ${a.v.v1}`, a.v.v2, `${be(a)} ${a.v.ing}`],
        `${cap(c[rule.trKey])} ${main.tr}.`,
        `${rule.note} Boşluğa geniş zaman gelir; 'will' ya da 'would' yan cümlede yer alamaz.`,
        [rule.conj === 'as soon as' ? 'as soon as / once / the moment'
          : rule.conj === 'until' ? 'until / till'
          : rule.conj],
        i, TTAGS));
      i++;
    }
    return out;
  }

  /* ── Zaman Uyumu · Alıştırma 5: Hata Bulma (Error Identification — Zaman Uyumu) ───────────────────── */
  const TIME_ERRORS = [
    { build: (a, c) => ({
        s: `${cap(a.s)} ${has(a)} ${a.v.v3} ${a.o} since eight years.`,
        w: 'since', o: ['eight years', `${has(a)} ${a.v.v3}`, a.o],
        tr: `${cap(a.st)} sekiz yıldır ${a.ot} ${a.t.sim}.`,
        e: "'eight years' bir SÜREdir; süre 'for' ister. 'since' yalnızca başlangıç noktasıyla kullanılır.",
        t: ['since'] }) },
    { build: (a, c) => ({
        s: `${cap(a.s)} ${has(a)} ${a.v.v3} ${a.o} two years ago.`,
        w: `${has(a)} ${a.v.v3}`, o: ['two years', 'ago', a.o],
        tr: `${cap(a.st)} iki yıl önce ${a.ot} ${a.t.past}.`,
        e: "'ago' Present Perfect almaz; kapanmış geçmiş an yalnızca Simple Past ile kurulur.",
        t: ['ago'] }) },
    { build: (a, c) => ({
        s: `When ${a.s} will ${a.v.v1} ${a.o}, the results will follow.`,
        w: `will ${a.v.v1}`, o: ['When', a.o, 'will follow'],
        tr: `${cap(c.when)} sonuçlar gelecek.`,
        e: "Zaman yan cümlesine 'will' gelmez; gelecek anlamı geniş zamanla verilir.",
        t: ['when'] }) },
    { build: (a, c) => ({
        s: `No sooner had ${a.s} ${a.v.v3} ${a.o} when the press reacted.`,
        w: 'when', o: ['No sooner', a.o, 'the press reacted'],
        tr: `${cap(c.asap)} basın tepki verdi.`,
        e: "'No sooner' eşi 'than'dir; 'when' yalnızca hardly / barely / scarcely ile kullanılır.",
        t: ['no sooner ... than'] }) },
    { build: (a, c) => ({
        s: `Hardly had ${a.s} ${a.v.v3} ${a.o} than the alarm sounded.`,
        w: 'than', o: ['Hardly', a.o, 'the alarm sounded'],
        tr: `${cap(c.asap)} alarm çaldı.`,
        e: "'Hardly / scarcely / barely' eşi 'when'dir; 'than' yalnızca 'no sooner' ile gelir.",
        t: ['hardly / barely / scarcely ... when'] }) },
    { build: (a, c) => ({
        s: `${cap(a.s)} ${be(a)} ${a.v.ing} ${a.o} for six years.`,
        w: `${be(a)} ${a.v.ing}`, o: ['for six years', a.o, 'six years'],
        tr: `${cap(a.st)} altı yıldır ${a.ot} ${a.t.sim}.`,
        e: "'for + süre' şu ana uzanan süreci gösterir; Present Continuous değil Present Perfect (Continuous) ister.",
        t: ['since'] }) },
    { build: (a, c) => ({
        s: `${cap(a.s)} ${has(a)} ${a.v.v3} ${a.o} last year.`,
        w: `${has(a)} ${a.v.v3}`, o: ['last year', a.o, cap(a.s)],
        tr: `${cap(a.st)} geçen yıl ${a.ot} ${a.t.past}.`,
        e: "Noktasal geçmiş belirleyicisi ('last year') Present Perfect'i kesinlikle dışlar.",
        t: ['ago'] }) },
    { build: (a, c) => ({
        s: `${cap(a.s)} ${a.v.v2} ${a.o} so far.`,
        w: a.v.v2, o: ['so far', a.o, cap(a.s)],
        tr: `${cap(a.st)} şimdiye kadar ${a.ot} ${a.t.past}.`,
        e: "'so far' bugüne uzanan bir bilanço kurar ve Present Perfect ister; Simple Past bu köprüyü koparır.",
        t: ['so far / up to now / hitherto / in recent years'] }) },
    { build: (a, c) => ({
        s: `If ${a.s} will ${a.v.v1} ${a.o}, the work will begin in April.`,
        w: `will ${a.v.v1}`, o: ['If', 'will begin', 'in April'],
        tr: `${cap(c.cond)} çalışma nisanda başlayacak.`,
        e: "Koşul yan cümlesine 'will' gelmez; Tip 1'de yan cümle geniş zaman, ana cümle 'will' alır.",
        t: ['if'] }) },
    { build: (a, c) => ({
        s: `It is high time ${a.s} ${v1n(a)} ${a.o}.`,
        w: v1n(a), o: ['It is high time', a.o, cap(a.s)],
        tr: `${cap(c.subjGen)} tam zamanı.`,
        e: "'It is high time' gerçek dışı bir kaymadır: ardından V2 gelir, geniş zaman gelmez.",
        t: ['it is (high) time'] }) },
    { build: (a, c) => ({
        s: `I wish ${a.s} ${v1n(a)} ${a.o} more often.`,
        w: v1n(a), o: ['I wish', 'more often', a.o],
        tr: `Keşke ${a.st} ${a.ot} daha sık ${a.t.wish}.`,
        e: "'wish' şimdiye ait bir dilek kurarken bir zaman geriye kayar: V2 kullanılır.",
        t: ['I wish'] }) },
    { build: (a, c) => ({
        s: `The report recommends that ${a.s} ${be(a)} ${a.v.v3} annually.`,
        w: `${be(a)} ${a.v.v3}`, o: ['The report', 'recommends that', 'annually'],
        tr: `Rapor, ${c.subjAcc} her yıl öneriyor.`,
        e: "'recommend that' subjunctive tetikler: yardımcı fiil çekimlenmez, fiil yalın kalır (be + V3 değil, 'be V3' yalın biçimi).",
        t: ['suggest / recommend / insist / demand + that'] }) },
    { build: (a, c) => ({
        s: `By 2030 ${a.s} will ${a.v.v1} ${a.o} completely.`,
        w: `will ${a.v.v1}`, o: ['By 2030', 'completely', a.o],
        tr: `${cap(a.st)} 2030'a kadar ${a.ot} tamamen ${a.t.futPerf}.`,
        e: "'by + gelecek tarih' o ana kadar tamamlanmayı ister: will have + V3.",
        t: ['by + Gelecek / Geçmiş Zaman Belirleyicisi'] }) },
    { build: (a, c) => ({
        s: `${cap(a.s)} ${has(a)} ${a.v.v3} ${a.o} in 1998.`,
        w: `${has(a)} ${a.v.v3}`, o: ['in 1998', a.o, cap(a.s)],
        tr: `${cap(a.st)} 1998'de ${a.ot} ${a.t.past}.`,
        e: "Yıl bildiren belirleyici kapanmış bir andır; Present Perfect ile birlikte kullanılamaz.",
        t: ['ago'] }) },
    { build: (a, c) => ({
        s: `After ${a.s} ${has(a)} ${a.v.v3} ${a.o}, the summary was printed.`,
        w: `${has(a)} ${a.v.v3}`, o: ['After', 'the summary', 'was printed'],
        tr: `${cap(c.after)} özet basıldı.`,
        e: "Ana cümle geçmişteyse 'after' yan cümlesi Present Perfect değil Past Perfect alır.",
        t: ['after'] }) },
    { build: (a, c) => ({
        s: `Not until the audit ended ${a.s} ${a.v.v2} ${a.o}.`,
        w: `${a.s} ${a.v.v2}`, o: ['Not until', 'the audit ended', a.o],
        tr: `${cap(a.st)} ancak denetim bittiğinde ${a.ot} ${a.t.past}.`,
        e: "'Not until' başa gelince ana cümle devrilir: 'did + özne + yalın fiil' gerekir.",
        t: ['until / till'] }) },
    { build: (a, c) => ({
        s: `By the time the funding arrives, ${a.s} ${has(a)} ${a.v.v3} ${a.o}.`,
        w: `${has(a)} ${a.v.v3}`, o: ['By the time', 'the funding arrives', a.o],
        tr: `Fon geldiğinde ${a.st} ${a.ot} ${a.t.futPerf}.`,
        e: "'By the time + geniş zaman' geleceğe bakar; ana cümle 'will have V3' olmalıdır.",
        t: ['by the time'] }) },
    { build: (a, c) => ({
        s: `While the power was failing, ${a.s} ${has(a)} ${a.v.v3} ${a.o}.`,
        w: `${has(a)} ${a.v.v3}`, o: ['While', 'the power', 'was failing'],
        tr: `Elektrik kesilirken ${a.st} ${a.ot} ${a.t.pastCont}.`,
        e: "'while' geçmişte eşzamanlılık kurar; ana cümle Present Perfect değil, sürerlikli geçmiş olmalıdır.",
        t: ['while / as'] }) },
    { build: (a, c) => ({
        s: `${cap(a.s)} suggested that the report was rewritten immediately.`,
        w: 'was rewritten', o: ['suggested that', 'the report', 'immediately'],
        tr: `${cap(a.st)} raporun derhal yeniden yazılmasını önerdi.`,
        e: "'suggest that' subjunctive ister; yardımcı fiil çekimlenmez, 'be rewritten' yalın kalır.",
        t: ['suggest / recommend / insist / demand + that'] }) },
    { build: (a, c) => ({
        s: `${cap(a.s)} had ${a.v.v3} ${a.o} two days ago.`,
        w: `had ${a.v.v3}`, o: ['two days', 'ago', a.o],
        tr: `${cap(a.st)} iki gün önce ${a.ot} ${a.t.past}.`,
        e: "Past Perfect ikinci bir geçmiş referans ister; tek başına 'ago' belirleyicisiyle Simple Past kullanılır.",
        t: ['ago'] }) },
    { build: (a, c) => ({
        s: `Until ${a.s} will ${a.v.v1} ${a.o}, the site stays closed.`,
        w: `will ${a.v.v1}`, o: ['Until', 'the site', 'stays closed'],
        tr: `${cap(c.until)} alan kapalı kalır.`,
        e: "'until' zaman yan cümlesidir; içine 'will' girmez.",
        t: ['until / till'] }) },
    { build: (a, c) => ({
        s: `${cap(a.s)} ${has(a)} been ${a.v.ing} ${a.o} since six months.`,
        w: 'since', o: ['six months', `${has(a)} been`, a.o],
        tr: `${cap(a.st)} altı aydır ${a.ot} ${a.t.sim}.`,
        e: "Süre bildiren öbek 'for' ister: 'for six months'. 'since' başlangıç noktası alır.",
        t: ['since'] }) },
    { build: (a, c) => ({
        s: `If ${a.s} would ${a.v.v1} ${a.o}, the work would begin.`,
        w: `would ${a.v.v1}`, o: ['If', 'the work', 'would begin'],
        tr: `${cap(c.if2)} çalışma başlardı.`,
        e: "Koşul yan cümlesinde 'would' bulunmaz; Tip 2'de yan cümle V2, ana cümle 'would V1' alır.",
        t: ['if'] }) },
    { build: (a, c) => ({
        s: `Scarcely ${a.s} had ${a.v.v3} ${a.o} when the alarm sounded.`,
        w: `${a.s} had`, o: ['Scarcely', a.o, 'the alarm sounded'],
        tr: `${cap(c.asap)} alarm çaldı.`,
        e: "Devrik kilitte yardımcı fiil özneden ÖNCE gelir: 'Scarcely had + özne + V3'.",
        t: ['hardly / barely / scarcely ... when'] }) },
    { build: (a, c) => ({
        s: `${cap(a.s)} ${a.v.v2} ${a.o} since the archive reopened.`,
        w: a.v.v2, o: ['since', 'the archive', 'reopened'],
        tr: `Arşiv yeniden açıldığından beri ${a.st} ${a.ot} ${a.t.past}.`,
        e: "'since' bugüne uzanan bir süreç kurar; ana cümle Simple Past değil Present Perfect olmalıdır.",
        t: ['since'] }) }
  ];

  function buildTimeErrors(need, startIndex) {
    const prompt = 'Cümledeki zaman uyumu hatasını bulunuz:';
    const out = [];
    let i = startIndex;
    while (out.length < need) {
      const pat = TIME_ERRORS[out.length % TIME_ERRORS.length];
      const k = Math.floor(out.length / TIME_ERRORS.length);
      const idx = (out.length + k * 3) % ACTORS.length;
      const row = pat.build(A(idx), C(idx));
      out.push(spotting(`tdx5_f${i}`, prompt, row.s, row.w, row.o, row.tr, row.e, row.t, i, TTAGS));
      i++;
    }
    return out;
  }

  /* ── Zaman Uyumu · Alıştırma 6: Koşul Cümlecikleri (Conditionals — Type 0/1/2/3) ───────────────────────── */
  const CONDITIONAL_RULES = [
    { build: (a, c) => ({
        s: `If ${a.s} ${v1n(a)} ${a.o}, the registry ____ the change automatically.`,
        w: 'records', d: ['will record', 'would record', 'recorded', 'would have recorded'],
        tr: `${cap(c.cond)} kayıt sistemi değişikliği otomatik olarak kaydeder.`,
        e: "Tip 0: değişmez bir düzen anlatılıyor. İki taraf da geniş zaman alır.",
        t: ['if'] }) },
    { build: (a, c) => ({
        s: `If ${a.s} ${v1n(a)} ${a.o}, work ____ in April.`,
        w: 'will begin', d: ['begins', 'would begin', 'began', 'would have begun'],
        tr: `${cap(c.cond)} çalışma nisanda başlayacak.`,
        e: "Tip 1: gerçekleşebilir koşul. Yan cümle geniş zaman, ana cümle 'will + V1' alır.",
        t: ['if'] }) },
    { build: (a, c) => ({
        s: `If ${a.s} ${a.v.v2} ${a.o}, work ____ in April.`,
        w: 'would begin', d: ['will begin', 'begins', 'had begun', 'would have begun'],
        tr: `${cap(c.if2)} çalışma nisanda başlardı.`,
        e: "Tip 2: yan cümledeki V2 geçmişi değil, bugünün gerçek dışılığını gösterir; ana cümle 'would + V1' olur.",
        t: ['if'] }) },
    { build: (a, c) => ({
        s: `If ${a.s} had ${a.v.v3} ${a.o}, work ____ in April.`,
        w: 'would have begun', d: ['would begin', 'will begin', 'had begun', 'begins'],
        tr: `${cap(c.if3)} çalışma nisanda başlayacaktı.`,
        e: "Tip 3: geçmişte gerçekleşmemiş koşul; ana cümle 'would have + V3' alır.",
        t: ['if'] }) },
    { build: (a, c) => ({
        s: `If ${a.s} had ${a.v.v3} ${a.o}, the site ____ open today.`,
        w: 'would be', d: ['would have been', 'will be', 'is', 'had been'],
        tr: `${cap(c.if3)} alan bugün açık olurdu.`,
        e: "Karma tip: koşul geçmişte, sonuç bugündedir. Yan cümle 'had V3', ana cümle 'would + V1' olur.",
        t: ['if'] }) },
    { build: (a, c) => ({
        s: `____ ${a.s} ${a.v.v3} ${a.o}, work would have begun in April.`,
        w: 'Had', d: ['If', 'Should', 'Were', 'Did'],
        tr: `${cap(c.if3)} çalışma nisanda başlayacaktı.`,
        e: "Devrik koşulda 'if' düşer ve yardımcı fiil öne gelir: Had + özne + V3.",
        t: ['if'] }) }
  ];

  function buildConditionals(need, startIndex) {
    const prompt = 'Koşul tipine uygun fiil biçimini seçin:';
    const out = [];
    let i = startIndex;
    while (out.length < need) {
      const rule = CONDITIONAL_RULES[out.length % CONDITIONAL_RULES.length];
      const k = Math.floor(out.length / CONDITIONAL_RULES.length);
      const idx = (out.length + k * 3) % ACTORS.length;
      const row = rule.build(A(idx), C(idx));
      out.push(dropdown(`tdx6_g${i}`, prompt, row.s, row.w, row.d, row.tr, row.e, row.t, i, TTAGS));
      i++;
    }
    return out;
  }

  /* ── Zaman Uyumu · Alıştırma 7: Gerçek Dışı Geçmiş (Wish / If Only / It's Time / As If) ──────────────────────── */
  const UNREAL_RULES = [
    { build: (a, c) => ({
        s: `I wish ${a.s} ____ ${a.o} more often.`,
        w: a.v.v2, d: [v1n(a), `will ${a.v.v1}`, `would have ${a.v.v3}`, `${has(a)} ${a.v.v3}`],
        tr: `Keşke ${a.st} ${a.ot} daha sık ${a.t.wish}.`,
        e: "Şimdiye ait dilek bir zaman geriye kayar: 'wish + V2'. Gelecek ya da geniş zaman kullanılmaz.",
        t: ['I wish'] }) },
    { build: (a, c) => ({
        s: `I wish ${a.s} ____ ${a.o} before the deadline.`,
        w: `had ${a.v.v3}`, d: [a.v.v2, `${has(a)} ${a.v.v3}`, `would ${a.v.v1}`, `will ${a.v.v1}`],
        tr: `Keşke ${a.st} son tarihten önce ${a.ot} ${a.t.condPast}.`,
        e: "Geçmişe dönük pişmanlık 'wish + had V3' ile kurulur; bir kat daha geriye kayılır.",
        t: ['I wish'] }) },
    { build: (a, c) => ({
        s: `I wish ${a.s} ____ ${a.o} without further delay.`,
        w: `would ${a.v.v1}`, d: [`will ${a.v.v1}`, v1n(a), `had ${a.v.v3}`, `${has(a)} ${a.v.v3}`],
        tr: `Keşke ${a.st} daha fazla gecikmeden ${a.ot} ${a.t.wish}.`,
        e: "Başkasının davranışından duyulan rahatsızlık 'wish + would V1' ile anlatılır.",
        t: ['I wish'] }) },
    { build: (a, c) => ({
        s: `If only ${a.s} ____ ${a.o} in time.`,
        w: `had ${a.v.v3}`, d: [a.v.v2, `${has(a)} ${a.v.v3}`, `will ${a.v.v1}`, v1n(a)],
        tr: `Keşke ${a.st} zamanında ${a.ot} ${a.t.condPast}.`,
        e: "'If only' 'I wish'in vurgulu biçimidir; geçmişe dönük pişmanlıkta 'had V3' alır.",
        t: ['if only'] }) },
    { build: (a, c) => ({
        s: `It is high time ${a.s} ____ ${a.o}.`,
        w: a.v.v2, d: [v1n(a), `will ${a.v.v1}`, `${has(a)} ${a.v.v3}`, `to ${a.v.v1}`],
        tr: `${cap(c.subjGen)} tam zamanı.`,
        e: "'It is high time + özne' kalıbında fiil V2 olur; buradaki geçmiş biçim gerçek dışılığı gösterir.",
        t: ['it is (high) time'] }) },
    { build: (a, c) => ({
        s: `${cap(a.s)} ${be(a)} behaving as if ${a.plural ? 'they' : 'it'} ____ ${a.o} already.`,
        w: `had ${a.v.v3}`, d: [`${has(a)} ${a.v.v3}`, a.v.v2, `will ${a.v.v1}`, v1n(a)],
        tr: `${cap(a.st)} sanki ${a.ot} çoktan ${a.t.mis} gibi davranıyor.`,
        e: "'as if' gerçek dışı bir karşılaştırma kurar; geçmişe göndermede 'had V3' kullanılır.",
        t: ['as if / as though'] }) }
  ];

  function buildUnreal(need, startIndex) {
    const prompt = 'Gerçek dışı yapıya uygun fiil biçimini seçin:';
    const out = [];
    let i = startIndex;
    while (out.length < need) {
      const rule = UNREAL_RULES[out.length % UNREAL_RULES.length];
      const k = Math.floor(out.length / UNREAL_RULES.length);
      const idx = (out.length + k * 3) % ACTORS.length;
      const row = rule.build(A(idx), C(idx));
      out.push(dropdown(`tdx7_h${i}`, prompt, row.s, row.w, row.d, row.tr, row.e, row.t, i, TTAGS));
      i++;
    }
    return out;
  }

  /* ── Zaman Uyumu · Alıştırma 8: Subjunctive (Dilek Kipi) ve Devrik Yapılar (Rarely / Not Only) ── */
  const SUBJ_VERBS = [
    { en: 'recommends', tr: 'öneriyor' }, { en: 'suggests', tr: 'öneriyor' },
    { en: 'insists', tr: 'ısrar ediyor' }, { en: 'demands', tr: 'talep ediyor' },
    { en: 'proposes', tr: 'öneriyor' }, { en: 'requests', tr: 'rica ediyor' },
    { en: 'requires', tr: 'şart koşuyor' }
  ];
  const SUBJ_ADJ = [
    { en: 'essential', tr: 'şarttır' }, { en: 'vital', tr: 'hayati önemdedir' },
    { en: 'imperative', tr: 'zorunludur' }, { en: 'crucial', tr: 'kritik önemdedir' },
    { en: 'necessary', tr: 'gereklidir' }
  ];

  const SUBJUNCTIVE_RULES = [
    { build: (a, c, k) => {
        const verb = SUBJ_VERBS[k % SUBJ_VERBS.length];
        return {
          s: `The report ${verb.en} that ${a.s} ____ ${a.o} annually.`,
          w: a.v.v1,
          d: [a.plural ? `${has(a)} ${a.v.v3}` : a.v.v1s, a.v.v2, `to ${a.v.v1}`, `${be(a)} ${a.v.ing}`],
          tr: `Rapor, her yıl ${c.subjAcc} ${verb.tr}.`,
          e: `'${verb.en} that' subjunctive tetikler: üçüncü tekil şahısta bile fiil yalın kalır, '-s' almaz.`,
          t: ['suggest / recommend / insist / demand + that'] };
      } },
    { build: (a, c, k) => {
        const adj = SUBJ_ADJ[k % SUBJ_ADJ.length];
        return {
          s: `It is ${adj.en} that ${a.s} ____ ${a.o} without delay.`,
          w: a.v.v1,
          d: [a.plural ? `${be(a)} ${a.v.ing}` : a.v.v1s, a.v.v2, `${has(a)} ${a.v.v3}`, `to ${a.v.v1}`],
          tr: `${cap(c.gen)} ${a.ot} gecikmeden ${a.t.subj} ${adj.tr}.`,
          e: `'It is ${adj.en} that' kalıbı da subjunctive ister; fiil çekimlenmez.`,
          t: ['it is essential / vital / imperative that'] };
      } },
    { build: (a, c) => ({
        s: `Rarely ____ ${a.s} ${a.v.v1} ${a.o} without consultation.`,
        w: doA(a), d: [has(a), be(a), 'had', 'would have'],
        tr: `${cap(a.st)} nadiren danışmadan ${a.ot} ${a.t.gen}.`,
        e: "Olumsuz zarf başa gelince ana cümle devrilir; geniş zamanda devriklik 'do/does + yalın fiil' ile kurulur.",
        t: ['seldom / rarely'] }) },
    { build: (a, c, k, aft) => ({
        s: `Not only ____ ${a.s} ${a.v.v1} ${a.o}, but it also published the minutes.`,
        w: 'did', d: [doA(a), has(a), beP(a), 'had'],
        tr: `${cap(a.st)} yalnızca ${a.ot} ${a.t.past}, üstelik tutanakları da yayımladı.`,
        e: "'Not only' başa gelince devriklik zorunludur; ikinci cümlenin geçmiş zamanı 'did + yalın fiil' ister.",
        t: ['not only ... but also'] }) },
    { build: (a, c) => ({
        s: `${cap(a.s)} sealed the store lest the samples ____ damaged during the move.`,
        w: 'be', d: ['are', 'were', 'will be', 'have been'],
        tr: `${cap(a.st)}, taşıma sırasında örnekler zarar görmesin diye depoyu mühürledi.`,
        e: "'lest' subjunctive ister: ardından yalın fiil gelir, çekimli biçim kullanılmaz.",
        t: ['lest / for fear that'] }) }
  ];

  function buildSubjunctive(need, startIndex) {
    const prompt = 'Subjunctive ve devriklik kuralına uygun biçimi seçin:';
    const out = [];
    let i = startIndex;
    while (out.length < need) {
      const rule = SUBJUNCTIVE_RULES[out.length % SUBJUNCTIVE_RULES.length];
      const k = Math.floor(out.length / SUBJUNCTIVE_RULES.length);
      const idx = (out.length + k * 3) % ACTORS.length;
      const row = rule.build(A(idx), C(idx), k, AFTERMATH[k % AFTERMATH.length]);
      const scope = SCOPES[k % SCOPES.length];
      const sent = scope.en ? row.s.replace(/\.$/, scope.en + '.') : row.s;
      const trs = scope.tr ? cap(scope.tr) + row.tr.charAt(0).toLowerCase() + row.tr.slice(1) : row.tr;
      out.push(dropdown(`tdx8_i${i}`, prompt, sent, row.w, row.d, trs, row.e, row.t, i, TTAGS));
      i++;
    }
    return out;
  }

  /* ── Alıştırmaları 8 teste tamamla ──────────────────────────────────────── */
  const PLAN = {
    cdrill_l1: {
      cdrill_ex1: buildPunctuation,
      cdrill_ex6: buildMeaning,
      cdrill_ex3: buildErrors,
      cdrill_ex4: buildMatching,
      cdrill_ex5: buildCauseEffect
    },
    tdrill_l1: {
      tdrill_ex1: buildAnchors,
      tdrill_ex2: buildHarmony,
      tdrill_ex3: buildInversion,
      tdrill_ex4: buildWillBan,
      tdrill_ex5: buildTimeErrors,
      tdrill_ex6: buildConditionals,
      tdrill_ex7: buildUnreal,
      tdrill_ex8: buildSubjunctive
    }
  };

  Object.keys(PLAN).forEach(lessonId => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson || !Array.isArray(lesson.exercises)) return;
    Object.keys(PLAN[lessonId]).forEach(exId => {
      const ex = lesson.exercises.find(e => e.id === exId);
      if (!ex || !Array.isArray(ex.questions)) return;
      const need = TARGET_QUESTIONS - ex.questions.length;
      if (need <= 0) return;
      // Var olan cümleler yeniden üretilirse ayıklanır; havuz her zaman
      // gereğinden fazla üretip aradan eleme yapar.
      const seen = new Set(ex.questions.map(q => String(q.sentence || '').toLowerCase().trim()).filter(Boolean));
      const built = PLAN[lessonId][exId](need * 2 + 24, 1);
      const fresh = [];
      for (const q of built) {
        if (fresh.length >= need) break;
        const key = String(q.sentence || '').toLowerCase().trim();
        if (key) {
          if (seen.has(key)) continue;
          seen.add(key);
        }
        fresh.push(q);
      }
      ex.questions = ex.questions.concat(fresh);
    });
  });
})();
