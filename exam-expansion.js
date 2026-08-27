/* ── Okuma Parçası Denemesi: soru havuzu genişletmesi ────────────────────────
 * Deneme sekmelerinin her biri 10'ar soruluk 10 teste bölünüyor. Var olan
 * içerik sekme başına 30-70 soru taşıdığı için testler eksik kalıyordu; bu
 * dosya her beceri için havuzu 100 soruya tamamlar.
 *
 * Sorular sırayla üretilir (rastgelelik yok): aynı sürüm hep aynı testi verir,
 * id'ler sabittir, doğru şıkkın yeri dönüşümlü kaydırılır. Üretimin çekirdeği
 * aşağıdaki konu bankasıdır: her konu, mantıksal sırası belli beş cümle
 * (giriş → ayrıntı → kanıt → sonuç, artı bir karşıtlık cümlesi), paragrafın
 * dışında kalan bir "yabancı" cümle ve yan cümle biçimi taşır. Aynı banka
 * akışı bozan cümle, sıralama, paragraf tamamlama ve cloze sorularını besler.
 * ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  if (typeof lessons === 'undefined') return;

  const HOST_LESSON = 'c50_p_l4';
  const TARGET = 100; // 10 test × 10 soru

  const cap = s => String(s).charAt(0).toUpperCase() + String(s).slice(1);
  const lower = s => String(s).charAt(0).toLowerCase() + String(s).slice(1);
  const rotate = (arr, k) => {
    const n = ((k % arr.length) + arr.length) % arr.length;
    return arr.slice(n).concat(arr.slice(0, n));
  };
  const spin = (correct, distractors, idx) => {
    const opts = [correct].concat(distractors);
    return rotate(opts, opts.length - (idx % opts.length));
  };
  const mc = (id, prompt, correct, distractors, idx, extra) => {
    const options = spin(correct, distractors, idx);
    return Object.assign({
      id, type: 'multiple-choice', prompt, options,
      correctIndex: options.indexOf(correct)
    }, extra || {});
  };

  /* ── Konu bankası ───────────────────────────────────────────────────────── */
  // i: giriş · d: ayrıntı · e: kanıt · c: sonuç · x: karşıtlık
  // o: paragrafa ait olmayan cümle · k: yan cümle biçimi (bağlaçtan sonra gelir)
  const T = [
    { key: 'scribes', tt: 'ortaçağ müstensihlerinin bıraktığı hatalar',
      i: ['Medieval workshops copied manuscripts entirely by hand.', 'Ortaçağ atölyeleri el yazmalarını tamamen elle kopyalıyordu.'],
      d: ['Every copyist left small errors that belonged to his own hand alone.', 'Her müstensih yalnızca kendi eline özgü küçük hatalar bırakıyordu.'],
      e: ['By grouping these errors, researchers can tell which workshop produced a given copy.', 'Bu hataları gruplayan araştırmacılar bir kopyanın hangi atölyeden çıktığını belirleyebiliyor.'],
      c: ['What earlier scholars dismissed as damage therefore serves today as evidence.', 'Bu yüzden önceki araştırmacıların hasar sayıp attığı şey bugün kanıt işlevi görüyor.'],
      x: ['The same errors, however, make a single manuscript useless as a source of the original wording.', 'Ne var ki aynı hatalar, tek bir el yazmasını özgün metnin kaynağı olarak kullanılamaz kılıyor.'],
      o: ['Modern printing presses require regular mechanical maintenance.', 'Modern matbaa makineleri düzenli mekanik bakım gerektirir.'],
      k: ['each copyist worked without a standard spelling', 'her müstensih standart bir yazım olmadan çalışıyordu'] },

    { key: 'icecores', tt: 'buz karotlarının tuttuğu iklim kaydı',
      i: ['Ice cores drilled from polar glaciers preserve a layer for every year of snowfall.', 'Kutup buzullarından çıkarılan buz karotları her yılın karına ait bir katman saklar.'],
      d: ['Air trapped in those layers keeps a sample of the atmosphere of that year.', 'Bu katmanlarda hapsolan hava o yılın atmosferinden bir örnek tutar.'],
      e: ['Measurements of the trapped gas show how carbon dioxide rose after 1850.', 'Hapsolmuş gazın ölçümleri karbondioksitin 1850 sonrasında nasıl yükseldiğini gösteriyor.'],
      c: ['The cores thus provide a climate record that no written source can match.', 'Böylece karotlar hiçbir yazılı kaynağın erişemeyeceği bir iklim kaydı sunuyor.'],
      x: ['Cores from warmer regions, by contrast, melt and lose their annual layers.', 'Buna karşılık ılıman bölgelerden alınan karotlar erir ve yıllık katmanlarını yitirir.'],
      o: ['Polar expeditions are usually financed by private sponsors.', 'Kutup seferleri genellikle özel sponsorlarca finanse edilir.'],
      k: ['the layers remain frozen and undisturbed', 'katmanlar donmuş ve bozulmamış kalıyor'] },

    { key: 'tramline', tt: 'yeniden açılan tramvay hattının kullanımı',
      i: ['The city reopened its nineteenth-century tram line in 2016.', 'Kent, on dokuzuncu yüzyıldan kalma tramvay hattını 2016\'da yeniden açtı.'],
      d: ['Planners expected the line to serve mainly tourists in the old quarter.', 'Plancılar hattın esas olarak eski kentteki turistlere hizmet etmesini bekliyordu.'],
      e: ['Ticket data from the first three years showed that most passengers were commuters.', 'İlk üç yılın bilet verileri yolcuların çoğunun işe gidip gelenler olduğunu gösterdi.'],
      c: ['The council consequently extended the line towards the residential districts.', 'Bu nedenle belediye meclisi hattı konut bölgelerine doğru uzattı.'],
      x: ['Bus routes along the same corridor, however, lost a quarter of their passengers.', 'Ne var ki aynı koridordaki otobüs hatları yolcularının dörtte birini kaybetti.'],
      o: ['Nineteenth-century trams were originally drawn by horses.', 'On dokuzuncu yüzyıl tramvayları başlangıçta atlarla çekiliyordu.'],
      k: ['the line ran through the densest neighbourhoods', 'hat en yoğun mahallelerden geçiyordu'] },

    { key: 'antibiotic', tt: 'yeni antibiyotik kaynakları arayışı',
      i: ['Soil bacteria produce compounds that kill competing micro-organisms.', 'Toprak bakterileri rakip mikroorganizmaları öldüren bileşikler üretir.'],
      d: ['Most antibiotics in clinical use were isolated from such soil samples.', 'Klinikte kullanılan antibiyotiklerin çoğu bu tür toprak örneklerinden elde edilmiştir.'],
      e: ['Screening of the same soils stopped yielding new compounds after the 1960s.', 'Aynı toprakların taranması 1960\'lardan sonra yeni bileşik vermez oldu.'],
      c: ['Researchers therefore turned to marine sediments and deep caves for fresh candidates.', 'Bu yüzden araştırmacılar yeni adaylar için deniz tortullarına ve derin mağaralara yöneldi.'],
      x: ['Cultivating these organisms in a laboratory, however, remains extremely difficult.', 'Ne var ki bu organizmaları laboratuvarda üretmek son derece zor olmayı sürdürüyor.'],
      o: ['Hospital pharmacies keep their stock in temperature-controlled rooms.', 'Hastane eczaneleri stoklarını sıcaklığı denetlenen odalarda tutar.'],
      k: ['the familiar soils had already been screened many times', 'bilinen topraklar defalarca taranmıştı'] },

    { key: 'archive', tt: 'arşivin dijitalleştirilip dizinlenmesi',
      i: ['The national archive began digitising its Ottoman land registers in 2011.', 'Ulusal arşiv Osmanlı tapu defterlerini 2011\'de dijitalleştirmeye başladı.'],
      d: ['Each page was photographed and indexed by place name rather than by date.', 'Her sayfa fotoğraflandı ve tarihe göre değil yer adına göre dizinlendi.'],
      e: ['Use of the collection rose threefold in the two years after the index appeared.', 'Dizin yayımlandıktan sonraki iki yılda koleksiyonun kullanımı üç katına çıktı.'],
      c: ['The archive has since applied the same method to its court records.', 'Arşiv o tarihten beri aynı yöntemi mahkeme kayıtlarına da uyguluyor.'],
      x: ['Readers looking for a particular year, on the other hand, now search far more slowly.', 'Öte yandan belirli bir yılı arayan okurlar artık çok daha yavaş arama yapıyor.'],
      o: ['The archive building was designed by a French architect in 1904.', 'Arşiv binası 1904\'te bir Fransız mimar tarafından tasarlandı.'],
      k: ['the registers were catalogued by place name', 'defterler yer adına göre kataloglanmıştı'] },

    { key: 'coral', tt: 'mercan resiflerinde ağarma',
      i: ['Coral reefs lose their colour when the algae living in them are expelled.', 'Mercan resifleri içlerinde yaşayan algleri dışarı attıklarında rengini yitirir.'],
      d: ['The expulsion is triggered by a rise of only one or two degrees in sea temperature.', 'Bu atım, deniz sıcaklığındaki yalnızca bir iki derecelik yükselmeyle tetiklenir.'],
      e: ['Surveys after the 2016 heatwave recorded bleaching along two thirds of the reef.', '2016 sıcak hava dalgasından sonraki incelemeler resifin üçte ikisinde ağarma kaydetti.'],
      c: ['Recovery is possible, but only if the water cools within a few weeks.', 'İyileşme mümkün, ancak yalnızca su birkaç hafta içinde soğursa.'],
      x: ['Reefs in deeper water, in contrast, showed almost no damage.', 'Buna karşılık daha derin sulardaki resifler neredeyse hiç hasar göstermedi.'],
      o: ['Diving tourism is regulated by a separate ministry.', 'Dalış turizmi ayrı bir bakanlıkça düzenlenmektedir.'],
      k: ['the water stays warm for several weeks', 'su birkaç hafta boyunca sıcak kalıyor'] },

    { key: 'wages', tt: 'asgari ücret artışının istihdama etkisi',
      i: ['The region raised its minimum wage by twelve per cent in 2018.', 'Bölge 2018\'de asgari ücreti yüzde on iki artırdı.'],
      d: ['Economists disagreed about how employment would respond to the increase.', 'İktisatçılar istihdamın bu artışa nasıl tepki vereceği konusunda ayrıştı.'],
      e: ['Payroll records for the following year show no measurable fall in hiring.', 'Ertesi yılın bordro kayıtları işe alımlarda ölçülebilir bir düşüş göstermiyor.'],
      c: ['The finding has since been cited in three separate policy reviews.', 'Bulgu o zamandan beri üç ayrı politika değerlendirmesinde anıldı.'],
      x: ['Small firms in rural districts, however, reported a sharp rise in costs.', 'Ne var ki kırsal ilçelerdeki küçük firmalar maliyetlerde keskin bir artış bildirdi.'],
      o: ['The regional assembly meets twice a year in the capital.', 'Bölge meclisi başkentte yılda iki kez toplanır.'],
      k: ['the increase applied to every sector at once', 'artış bütün sektörlere aynı anda uygulandı'] },

    { key: 'pollen', tt: 'göl tortullarındaki polen kayıtları',
      i: ['Lake sediments trap pollen grains from the plants growing around them.', 'Göl tortulları çevrede yetişen bitkilerin polen tanelerini hapseder.'],
      d: ['Each species leaves a grain with a shape that can be identified under a microscope.', 'Her tür, mikroskop altında tanınabilen bir biçimde tane bırakır.'],
      e: ['Counts from an Anatolian lake show cereal pollen appearing around 8000 BC.', 'Bir Anadolu gölünden alınan sayımlar tahıl polenlerinin MÖ 8000 dolaylarında belirdiğini gösteriyor.'],
      c: ['Such records date the spread of farming without relying on any excavation.', 'Bu kayıtlar tarımın yayılışını hiçbir kazıya dayanmadan tarihlendiriyor.'],
      x: ['Wind can carry pollen for hundreds of kilometres, which complicates the picture.', 'Rüzgâr poleni yüzlerce kilometre taşıyabildiği için tablo karmaşıklaşıyor.'],
      o: ['Microscopes were first manufactured commercially in the Netherlands.', 'Mikroskoplar ticari olarak ilk kez Hollanda\'da üretildi.'],
      k: ['the sediment layers were never disturbed', 'tortul katmanları hiç bozulmadı'] },

    { key: 'opensource', tt: 'bakanlığın açık kaynaklı yazılıma geçişi',
      i: ['The ministry replaced its office software with an open-source suite in 2015.', 'Bakanlık 2015\'te ofis yazılımını açık kaynaklı bir paketle değiştirdi.'],
      d: ['Licence payments fell immediately, but staff needed retraining.', 'Lisans ödemeleri hemen düştü, ancak personelin yeniden eğitilmesi gerekti.'],
      e: ['An internal audit found that support requests doubled during the first six months.', 'Bir iç denetim, destek taleplerinin ilk altı ayda ikiye katlandığını buldu.'],
      c: ['After the second year, both costs and complaints settled below their earlier levels.', 'İkinci yılın ardından hem maliyetler hem şikâyetler eski düzeylerinin altına indi.'],
      x: ['Two departments, nevertheless, kept the old software for legal reasons.', 'Buna karşın iki birim hukuki nedenlerle eski yazılımı kullanmayı sürdürdü.'],
      o: ['The ministry moved into its current building in 1998.', 'Bakanlık bugünkü binasına 1998\'de taşındı.'],
      k: ['the staff had used the old software for years', 'personel eski yazılımı yıllardır kullanıyordu'] },

    { key: 'birdsong', tt: 'kent gürültüsünün kuş şarkılarına etkisi',
      i: ['Male songbirds learn their songs from adults during a short period after hatching.', 'Erkek ötücü kuşlar şarkılarını yumurtadan çıktıktan sonraki kısa bir dönemde yetişkinlerden öğrenir.'],
      d: ['Birds raised in isolation produce a simplified song with the same basic rhythm.', 'Yalıtılmış olarak büyütülen kuşlar aynı temel ritmi taşıyan basitleşmiş bir şarkı üretir.'],
      e: ['Recordings from city parks show songs pitched higher than those in nearby forests.', 'Kent parklarından alınan kayıtlar şarkıların yakın ormanlardakinden daha tiz olduğunu gösteriyor.'],
      c: ['The difference is best explained by the low-frequency noise of traffic.', 'Bu fark en iyi trafiğin alçak frekanslı gürültüsüyle açıklanıyor.'],
      x: ['Females, on the other hand, show no comparable change in their calls.', 'Öte yandan dişiler çağrılarında benzer bir değişim göstermiyor.'],
      o: ['Ornithology became a university discipline in the nineteenth century.', 'Ornitoloji on dokuzuncu yüzyılda üniversite disiplini hâline geldi.'],
      k: ['traffic noise masks the lower frequencies', 'trafik gürültüsü alçak frekansları örtüyor'] },

    { key: 'shipwreck', tt: 'batıktaki yükün gösterdiği ticaret ağı',
      i: ['A merchant ship that sank off the Aegean coast was surveyed in 2019.', 'Ege kıyısı açıklarında batan bir ticaret gemisi 2019\'da incelendi.'],
      d: ['Its cargo included amphorae from three separate production centres.', 'Yükü arasında üç ayrı üretim merkezinden gelen amforalar bulunuyordu.'],
      e: ['Clay analysis matched two of them to workshops six hundred kilometres apart.', 'Kil analizi bunlardan ikisini altı yüz kilometre uzaklıktaki atölyelerle eşleştirdi.'],
      c: ['The wreck therefore documents a single voyage across a wide trading network.', 'Böylece batık, geniş bir ticaret ağı boyunca yapılmış tek bir yolculuğu belgeliyor.'],
      x: ['The hull itself, unfortunately, was too decayed to be dated.', 'Ne yazık ki gövdenin kendisi tarihlendirilemeyecek kadar çürümüştü.'],
      o: ['Amphorae are displayed in the regional museum every summer.', 'Amforalar her yaz bölge müzesinde sergilenir.'],
      k: ['the cargo came from several regions at once', 'yük aynı anda birkaç bölgeden geliyordu'] },

    { key: 'literacy', tt: 'yetişkin okuma kurslarının sonuçları',
      i: ['The province opened evening reading courses for adults in 2009.', 'İl, yetişkinler için akşam okuma kurslarını 2009\'da açtı.'],
      d: ['Attendance was highest among women over forty.', 'Katılım en çok kırk yaş üstü kadınlar arasında yüksekti.'],
      e: ['Follow-up tests recorded a rise of thirty per cent in reading speed after one term.', 'İzleme testleri bir dönem sonunda okuma hızında yüzde otuzluk bir artış kaydetti.'],
      c: ['The programme was extended to eleven neighbouring provinces the following year.', 'Program ertesi yıl komşu on bir ile yaygınlaştırıldı.'],
      x: ['Enrolment among younger adults, by contrast, remained disappointingly low.', 'Buna karşılık genç yetişkinlerde kayıt oranı hayal kırıklığı yaratacak kadar düşük kaldı.'],
      o: ['The provincial library was renovated with a European grant.', 'İl kütüphanesi bir Avrupa hibesiyle yenilendi.'],
      k: ['the courses were held after working hours', 'kurslar mesai saatleri dışında yapılıyordu'] },

    { key: 'quake', tt: 'fay hattındaki küçük sarsıntıların izlenmesi',
      i: ['Seismic sensors were installed along the fault in 2012.', 'Fay hattı boyunca sismik sensörler 2012\'de kuruldu.'],
      d: ['They record tremors far too small to be felt on the surface.', 'Bu sensörler yüzeyde hissedilemeyecek kadar küçük sarsıntıları kaydediyor.'],
      e: ['The records reveal that small tremors cluster in the weeks before larger events.', 'Kayıtlar, küçük sarsıntıların büyük olaylardan önceki haftalarda kümelendiğini ortaya koyuyor.'],
      c: ['This pattern has not yet produced a reliable method of prediction.', 'Bu örüntü henüz güvenilir bir tahmin yöntemi doğurmadı.'],
      x: ['Similar clusters, however, appear in years when no large earthquake follows.', 'Ne var ki benzer kümelenmeler büyük bir depremin izlemediği yıllarda da görülüyor.'],
      o: ['The regional emergency service was founded after the 1999 earthquake.', 'Bölge acil servisi 1999 depreminden sonra kuruldu.'],
      k: ['the sensors run without interruption', 'sensörler kesintisiz çalışıyor'] },

    { key: 'museumlight', tt: 'müze aydınlatmasının eserlere etkisi',
      i: ['The gallery replaced its halogen lamps with low-energy diodes in 2017.', 'Galeri 2017\'de halojen lambalarını düşük enerjili diyotlarla değiştirdi.'],
      d: ['The new lamps emit almost no ultraviolet light.', 'Yeni lambalar neredeyse hiç morötesi ışık yaymıyor.'],
      e: ['Conservators measured a marked slowdown in the fading of the textiles.', 'Koruma uzmanları tekstillerdeki solmada belirgin bir yavaşlama ölçtü.'],
      c: ['Other museums in the country have since adopted the same lighting.', 'Ülkedeki diğer müzeler o tarihten beri aynı aydınlatmayı benimsedi.'],
      x: ['Visitors, on the other hand, complained that the colours looked flat.', 'Öte yandan ziyaretçiler renklerin sönük göründüğünden yakındı.'],
      o: ['The gallery charges no entrance fee on Wednesdays.', 'Galeri çarşamba günleri giriş ücreti almaz.'],
      k: ['the diodes emit no ultraviolet light', 'diyotlar morötesi ışık yaymıyor'] },

    { key: 'bicycle', tt: 'kampüsteki bisiklet ödünç verme programı',
      i: ['The university opened a bicycle lending scheme for its students in 2014.', 'Üniversite 2014\'te öğrencileri için bisiklet ödünç verme programı başlattı.'],
      d: ['Bicycles could be borrowed from any of four stations on the campus.', 'Bisikletler kampüsteki dört istasyonun herhangi birinden ödünç alınabiliyordu.'],
      e: ['Usage data showed that ninety per cent of trips took less than ten minutes.', 'Kullanım verileri yolculukların yüzde doksanının on dakikadan kısa sürdüğünü gösterdi.'],
      c: ['The scheme was therefore redesigned around short trips between faculties.', 'Bu yüzden program fakülteler arası kısa yolculuklara göre yeniden tasarlandı.'],
      x: ['Trips to the city centre, however, almost never used the scheme.', 'Ne var ki kent merkezine yapılan yolculuklarda program neredeyse hiç kullanılmadı.'],
      o: ['The campus was built on the site of a former airfield.', 'Kampüs eski bir havaalanının yerine kuruldu.'],
      k: ['most journeys were very short', 'yolculukların çoğu çok kısaydı'] },

    { key: 'terrace', tt: 'taş terasların toprak kaybını önlemesi',
      i: ['Farmers on the steep valley slopes have built stone terraces for centuries.', 'Dik vadi yamaçlarındaki çiftçiler yüzyıllardır taş teraslar inşa ediyor.'],
      d: ['The terraces hold rainwater long enough for it to sink into the soil.', 'Teraslar yağmur suyunu toprağa sızacak kadar uzun süre tutuyor.'],
      e: ['Fields behind intact terraces lost half as much topsoil in the 2020 floods.', '2020 sellerinde sağlam terasların gerisindeki tarlalar yarı yarıya az üst toprak yitirdi.'],
      c: ['Restoring the abandoned walls is now part of the regional flood plan.', 'Terk edilmiş duvarların onarımı artık bölgesel taşkın planının bir parçası.'],
      x: ['Maintaining the walls by hand, however, is slow and expensive work.', 'Ne var ki duvarları elle bakımda tutmak yavaş ve pahalı bir iş.'],
      o: ['Valley tourism has grown steadily since the new road opened.', 'Yeni yolun açılmasından bu yana vadi turizmi istikrarlı biçimde büyüdü.'],
      k: ['the terraces slow the water down', 'teraslar suyu yavaşlatıyor'] }
  ];

  const EN = 0, TR = 1;
  const POOL = {
    reading: [], dialogue: [], paracomp: [], restatement: [], irrelevant: [],
    ordering: [], reference: [], cloze: [], sentcomp: [], translation: []
  };

  const SKILL = {
    reading: 'Okuma Parçası', dialogue: 'Diyalog Tamamlama', paracomp: 'Paragraf Tamamlama',
    restatement: 'Yakın Anlamlı Cümle', irrelevant: 'Akışı Bozan Cümle', ordering: 'Paragraf Sıralama',
    reference: 'Zamir & Referans', cloze: 'Cloze Test', sentcomp: 'Cümle Tamamlama', translation: 'Çeviri'
  };
  const tag = key => ({ examSkill: SKILL[key], grammarTags: [SKILL[key]] });
  const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

  /* ── Akışı Bozan Cümle ──────────────────────────────────────────────────── */
  // Paragraf konunun dört cümlesinden kurulur; yabancı cümle her seferinde
  // başka bir konuma girer, böylece "hep üçüncü cümle" alışkanlığı oluşmaz.
  function buildIrrelevant(need) {
    const out = [];
    for (let k = 0; out.length < need; k++) {
      const t = T[k % T.length];
      const slot = 1 + (Math.floor(k / T.length) % 4); // yabancı cümle 2.–5. sırada
      const base = [t.i, t.d, t.e, t.c];
      const sents = base.slice(0, slot).concat([t.o]).concat(base.slice(slot));
      const en = sents.map((s, n) => `[${ROMAN[n]}] ${s[EN]}`).join(' ');
      const tr = sents.map((s, n) => `[${ROMAN[n]}] ${s[TR]}`).join(' ');
      const correct = `Sentence ${ROMAN[slot]}`;
      const distractors = ROMAN.filter((r, n) => n !== slot).map(r => `Sentence ${r}`);
      out.push(mc(`xp_irr_${k + 1}`, 'Paragrafın akışını bozan cümleyi seçiniz:',
        correct, distractors, k,
        Object.assign({
          sentence: en, translation: tr,
          explanation: `Paragraf baştan sona ${t.tt} konusunu işliyor; ${ROMAN[slot]}. cümle ise bu akışın dışına çıkıp başka bir konuya geçtiği için bütünlüğü bozuyor.`
        }, tag('irrelevant'))));
    }
    return out;
  }

  /* ── Paragraf Sıralama ──────────────────────────────────────────────────── */
  // Doğru sıra hep giriş → ayrıntı → kanıt → sonuç; etiketler karıştırılır.
  const PERMS = [[2, 0, 3, 1], [1, 3, 0, 2], [3, 1, 2, 0], [0, 2, 1, 3], [2, 3, 1, 0], [1, 0, 3, 2]];
  function buildOrdering(need) {
    const out = [];
    const LETTER = ['A', 'B', 'C', 'D'];
    for (let k = 0; out.length < need; k++) {
      const t = T[k % T.length];
      const perm = PERMS[Math.floor(k / T.length) % PERMS.length];
      const logical = [t.i, t.d, t.e, t.c];
      // perm[n] = ekranda n. sırada duran cümlenin mantıksal sıradaki indisi
      const shown = perm.map(idx => logical[idx]);
      const sentence = shown.map((s, n) => `[${LETTER[n]}] ${s[EN]}`).join(' ');
      const correct = logical.map(s => LETTER[shown.indexOf(s)]);
      out.push(Object.assign({
        id: `xp_ord_${k + 1}`, type: 'vector-assembly',
        prompt: 'Cümleleri anlamlı bir bütün oluşturacak şekilde (girişten sonuca) doğru sıraya dizin:',
        sentence,
        scrambled_elements: LETTER.slice(),
        correct_sequence: correct,
        translation: logical.map(s => s[TR]).join(' '),
        explanation: `Giriş cümlesi konuyu tanıtır (${correct[0]}), ardından ayrıntı (${correct[1]}) ve kanıt (${correct[2]}) gelir; sonuç cümlesi (${correct[3]}) paragrafı kapatır.`
      }, tag('ordering')));
    }
    return out;
  }

  /* ── Paragraf Tamamlama ─────────────────────────────────────────────────── */
  // Dört cümleden biri çıkarılır; çeldiriciler aynı konunun dışındaki
  // cümlelerden ve komşu konuların cümlelerinden gelir.
  function buildParaComp(need) {
    const out = [];
    for (let k = 0; out.length < need; k++) {
      const t = T[k % T.length];
      const slot = Math.floor(k / T.length) % 4;
      const base = [t.i, t.d, t.e, t.c];
      const shownEn = base.map((s, n) => (n === slot ? '----' : s[EN])).join(' ');
      const shownTr = base.map((s, n) => (n === slot ? '----' : s[TR])).join(' ');
      const other1 = T[(k + 1) % T.length], other2 = T[(k + 2) % T.length];
      const distractors = [t.o[EN], other1.c[EN], other2.d[EN], other1.x[EN]];
      const why = ['giriş cümlesi konuyu tanıtmalı', 'ikinci cümle giriş cümlesindeki durumu ayrıntılandırmalı',
                   'üçüncü cümle önceki iddiayı kanıtla desteklemeli', 'son cümle paragrafı bir sonuca bağlamalı'][slot];
      out.push(mc(`xp_pc_${k + 1}`, 'Parçada boş bırakılan yere gelmesi gereken cümleyi bulunuz:',
        base[slot][EN], distractors, k,
        Object.assign({
          passage: shownEn, passageLabel: '📄 Paragraf', translation: shownTr,
          explanation: `Boşluk paragrafın ${slot + 1}. cümlesidir; ${why}. Diğer seçenekler ya konunun dışına çıkıyor ya da paragrafın bu noktasındaki mantığa bağlanmıyor.`
        }, tag('paracomp'))));
    }
    return out;
  }

  /* ── Cloze Test (geçiş bağlacı) ─────────────────────────────────────────── */
  const CLOZE_RELS = [
    { pick: t => [t.i, t.x], conn: 'However', trConn: 'ancak',
      wrong: ['Therefore', 'Moreover', 'Similarly', 'For instance'],
      why: 'İkinci cümle birinci cümlenin kurduğu beklentiyi bozuyor; bu ters düşüşü yalnızca zıtlık bağlacı karşılar.' },
    { pick: t => [t.d, t.e], conn: 'Indeed', trConn: 'gerçekten de',
      wrong: ['Nevertheless', 'Otherwise', 'In contrast', 'By comparison'],
      why: 'İkinci cümle birincideki savı somut ölçümle pekiştiriyor; buraya vurgu/pekiştirme ifadesi gelir.' },
    { pick: t => [t.e, t.c], conn: 'Consequently', trConn: 'bu nedenle',
      wrong: ['However', 'Conversely', 'For example', 'Meanwhile'],
      why: 'Kanıttan çıkan sonuç aktarılıyor; iki cümle arasında sonuç ilişkisi var.' },
    { pick: t => [t.i, t.d], conn: 'Moreover', trConn: 'ayrıca',
      wrong: ['On the contrary', 'Therefore', 'Otherwise', 'In short'],
      why: 'İkinci cümle aynı yönde yeni bir bilgi ekliyor; ekleme bağlacı gerekir.' }
  ];
  function buildCloze(need) {
    const out = [];
    for (let k = 0; out.length < need; k++) {
      const t = T[k % T.length];
      const rel = CLOZE_RELS[Math.floor(k / T.length) % CLOZE_RELS.length];
      let [a, b] = rel.pick(t);
      if (b === t.x) b = [stripConnEn(t.x[EN]), stripConnTr(t.x[TR])];
      if (b === t.c) b = [stripResEn(t.c[EN]), stripResTr(t.c[TR])];
      out.push(Object.assign(mc(`xp_cl_${k + 1}`, 'Boşluğa gelecek en uygun geçiş ifadesini seçin:',
        rel.conn, rel.wrong.slice(), k,
        Object.assign({
          sentence: `${a[EN]} ____, ${lower(b[EN])}`,
          translation: `${a[TR]} ${cap(rel.trConn)} ${lower(b[TR])}`,
          explanation: `${rel.why} '${rel.conn}' bu ilişkiyi kurar; diğer dört ifade cümleler arasındaki bağı yanlış kurar.`
        }, tag('cloze'))), { type: 'fill-blank-dropdown' }));
    }
    return out;
  }

  /* ── Konu bankasının ek alanları ────────────────────────────────────────── */
  // n / nd: giriş ve ayrıntı cümlesinin isimleşmiş biçimi (referans sorularının
  // doğru cevabı). m: yan cümle bağlanabilen yalın ana cümle. k2: ödün/zıtlık
  // okumasına uygun yan cümle.
  const X = {
    scribes: {
      nx: ['the impossibility of recovering the original wording', 'özgün metnin sözcüklerine ulaşmanın olanaksızlığı'],
      n: ['copying manuscripts by hand in medieval workshops', 'el yazmalarının ortaçağ atölyelerinde elle kopyalanması'],
      nd: ['the small errors left by each individual copyist', 'her müstensihin tek tek bıraktığı küçük hatalar'],
      m: ['no two surviving copies are exactly alike', 'günümüze ulaşan hiçbir iki kopya birbirinin tıpkısı değil'],
      k2: ['these errors were long treated as damage', 'bu hatalar uzun süre hasar sayıldı'] },
    icecores: {
      nx: ['the melting of cores taken from warmer regions', 'ılıman bölgelerden alınan karotların erimesi'],
      n: ['the annual layering of snow in polar ice', 'kutup buzunda karın yıllık katmanlaşması'],
      nd: ['the air trapped inside each yearly layer', 'her yıllık katmanın içinde hapsolan hava'],
      m: ['the cores can be read year by year', 'karotlar yıl yıl okunabiliyor'],
      k2: ['drilling a deep core is slow and costly', 'derin bir karot çıkarmak yavaş ve maliyetli'] },
    tramline: {
      nx: ['the loss of passengers on the parallel bus routes', 'koşut otobüs hatlarındaki yolcu kaybı'],
      n: ['the reopening of the nineteenth-century tram line', 'on dokuzuncu yüzyıl tramvay hattının yeniden açılması'],
      nd: ['the expectation that tourists would be the main users', 'başlıca kullanıcıların turistler olacağı beklentisi'],
      m: ['the timetable was rewritten for the morning peak', 'tarife sabah zirvesine göre yeniden yazıldı'],
      k2: ['the line had been designed for tourists', 'hat turistler için tasarlanmıştı'] },
    antibiotic: {
      nx: ['the difficulty of growing these organisms in a laboratory', 'bu organizmaları laboratuvarda üretmenin zorluğu'],
      n: ['the production of antimicrobial compounds by soil bacteria', 'toprak bakterilerinin antimikrobiyal bileşik üretmesi'],
      nd: ['the isolation of most clinical antibiotics from soil', 'klinik antibiyotiklerin çoğunun topraktan elde edilmesi'],
      m: ['the search moved to unusual habitats', 'arayış alışılmadık yaşam alanlarına kaydı'],
      k2: ['the older method had been highly productive', 'eski yöntem çok verimli olmuştu'] },
    archive: {
      nx: ['the slower searching faced by readers looking for a particular year', 'belirli bir yılı arayan okurların yaşadığı yavaşlık'],
      n: ['the digitisation of the Ottoman land registers', 'Osmanlı tapu defterlerinin dijitalleştirilmesi'],
      nd: ['the decision to index the pages by place name', 'sayfaların yer adına göre dizinlenmesi kararı'],
      m: ['researchers now find a village in seconds', 'araştırmacılar artık bir köyü saniyeler içinde buluyor'],
      k2: ['the same index slows down date-based searches', 'aynı dizin tarih temelli aramaları yavaşlatıyor'] },
    coral: {
      nx: ['the absence of damage on the deeper reefs', 'daha derin resiflerde hasar bulunmaması'],
      n: ['the expulsion of the algae that live inside the coral', 'mercanın içinde yaşayan alglerin dışarı atılması'],
      nd: ['a rise of one or two degrees in sea temperature', 'deniz sıcaklığındaki bir iki derecelik yükselme'],
      m: ['the reef can recover within a single season', 'resif tek bir mevsimde toparlanabiliyor'],
      k2: ['the heatwave lasted only a few weeks', 'sıcak hava dalgası yalnızca birkaç hafta sürdü'] },
    wages: {
      nx: ['the sharp rise in costs reported by small rural firms', 'kırsal küçük firmaların bildirdiği keskin maliyet artışı'],
      n: ['the twelve per cent rise in the regional minimum wage', 'bölgesel asgari ücretteki yüzde on ikilik artış'],
      nd: ['the disagreement among economists about employment', 'iktisatçıların istihdam konusundaki görüş ayrılığı'],
      m: ['the debate has shifted to other measures', 'tartışma başka ölçütlere kaydı'],
      k2: ['many economists had predicted job losses', 'birçok iktisatçı iş kaybı öngörmüştü'] },
    pollen: {
      nx: ['the transport of pollen over long distances by wind', 'polenin rüzgârla uzun mesafelere taşınması'],
      n: ['the trapping of pollen grains in lake sediments', 'polen tanelerinin göl tortullarında hapsolması'],
      nd: ['the distinctive shape of each species of grain', 'her türün tanesindeki ayırt edici biçim'],
      m: ['the spread of farming can be dated precisely', 'tarımın yayılışı kesin biçimde tarihlendirilebiliyor'],
      k2: ['no settlement has been excavated nearby', 'yakında hiçbir yerleşim kazılmadı'] },
    opensource: {
      nx: ['the decision of two departments to keep the old software', 'iki birimin eski yazılımı koruma kararı'],
      n: ['the replacement of the office software with an open-source suite', 'ofis yazılımının açık kaynaklı bir paketle değiştirilmesi'],
      nd: ['the retraining that the change demanded from the staff', 'değişimin personelden istediği yeniden eğitim'],
      m: ['the ministry kept the new system', 'bakanlık yeni sistemi korudu'],
      k2: ['the first months brought twice as many complaints', 'ilk aylar iki katı şikâyet getirdi'] },
    birdsong: {
      nx: ['the unchanged calls of the female birds', 'dişi kuşların değişmeyen çağrıları'],
      n: ['the learning of songs from adult birds after hatching', 'yumurtadan çıktıktan sonra şarkıların yetişkin kuşlardan öğrenilmesi'],
      nd: ['the simplified song produced by isolated birds', 'yalıtılmış kuşların ürettiği basitleşmiş şarkı'],
      m: ['city birds sing at a higher pitch', 'kent kuşları daha tiz ötüyor'],
      k2: ['the forest population sings the older pattern', 'orman popülasyonu eski örüntüyü söylüyor'] },
    shipwreck: {
      nx: ['the decayed state of the hull', 'gövdenin çürümüş durumu'],
      n: ['the survey of the merchant ship that sank off the coast', 'kıyı açıklarında batan ticaret gemisinin incelenmesi'],
      nd: ['the presence of amphorae from three production centres', 'üç üretim merkezinden gelen amforaların bulunması'],
      m: ['the route can be reconstructed with confidence', 'rota güvenle yeniden kurulabiliyor'],
      k2: ['the hull could not be dated', 'gövde tarihlendirilemedi'] },
    literacy: {
      nx: ['the low enrolment among younger adults', 'genç yetişkinlerdeki düşük kayıt oranı'],
      n: ['the opening of evening reading courses for adults', 'yetişkinler için akşam okuma kurslarının açılması'],
      nd: ['the high attendance among women over forty', 'kırk yaş üstü kadınlardaki yüksek katılım'],
      m: ['the ministry increased the budget of the programme', 'bakanlık programın bütçesini artırdı'],
      k2: ['younger adults stayed away from the courses', 'genç yetişkinler kurslardan uzak durdu'] },
    quake: {
      nx: ['the appearance of similar clusters in quiet years', 'sakin yıllarda da benzer kümelenmelerin görülmesi'],
      n: ['the installation of seismic sensors along the fault', 'fay hattı boyunca sismik sensörlerin kurulması'],
      nd: ['the recording of tremors too small to be felt', 'hissedilemeyecek kadar küçük sarsıntıların kaydedilmesi'],
      m: ['the network is being extended to two more faults', 'ağ iki fay hattına daha yaygınlaştırılıyor'],
      k2: ['no reliable forecast has yet been produced', 'henüz güvenilir bir tahmin üretilmedi'] },
    museumlight: {
      nx: ['the complaint that the colours look flat', 'renklerin sönük göründüğü yönündeki şikâyet'],
      n: ['the replacement of the halogen lamps with low-energy diodes', 'halojen lambaların düşük enerjili diyotlarla değiştirilmesi'],
      nd: ['the absence of ultraviolet light in the new lamps', 'yeni lambalarda morötesi ışığın bulunmaması'],
      m: ['the textiles are expected to survive far longer', 'tekstillerin çok daha uzun süre dayanması bekleniyor'],
      k2: ['visitors find the new colours less vivid', 'ziyaretçiler yeni renkleri daha sönük buluyor'] },
    bicycle: {
      nx: ['the almost total absence of trips to the city centre', 'kent merkezine yolculukların neredeyse hiç yapılmaması'],
      n: ['the opening of a bicycle lending scheme for students', 'öğrenciler için bisiklet ödünç verme programının başlatılması'],
      nd: ['the four lending stations spread across the campus', 'kampüse yayılmış dört ödünç verme istasyonu'],
      m: ['two more stations were added between the faculties', 'fakülteler arasına iki istasyon daha eklendi'],
      k2: ['the scheme was never used for longer trips', 'program uzun yolculuklar için hiç kullanılmadı'] },
    terrace: {
      nx: ['the slow and costly maintenance of the walls by hand', 'duvarların elle yapılan yavaş ve maliyetli bakımı'],
      n: ['the building of stone terraces on the steep slopes', 'dik yamaçlarda taş terasların inşa edilmesi'],
      nd: ['the way the terraces hold rainwater on the land', 'terasların yağmur suyunu arazide tutma biçimi'],
      m: ['the walls are being repaired with public money', 'duvarlar kamu parasıyla onarılıyor'],
      k2: ['maintaining them by hand is slow work', 'onları elle bakımda tutmak yavaş bir iş'] }
  };
  const XT = t => X[t.key];

  // Karşıtlık cümleleri kendi bağlacını taşıyor ("..., however, ..."). Cloze
  // sorusunda boşluğa bağlaç geleceği için gömülü olanı temizliyoruz.
  const stripConnEn = s => String(s)
    .replace(/,\s*(however|by contrast|in contrast|on the other hand|nevertheless|nonetheless|unfortunately)\s*,\s*/i, ' ')
    .replace(/\s{2,}/g, ' ').trim();
  const stripConnTr = s => String(s)
    .replace(/^(Ne var ki|Buna karşılık|Öte yandan|Buna karşın|Ne yazık ki|Oysa)\s+/i, '')
    .replace(/\s{2,}/g, ' ').trim();
  // Sonuç cümleleri de kendi bağlacını taşıyabiliyor ("... therefore serves ...").
  const stripResEn = s => String(s)
    .replace(/\s(therefore|thus|consequently)\s/i, ' ')
    .replace(/\s{2,}/g, ' ').trim();
  const stripResTr = s => String(s)
    .replace(/^(Bu yüzden|Bu nedenle|Böylece|Dolayısıyla)\s+/i, '')
    .replace(/\s{2,}/g, ' ').trim();

  /* ── Zamir & Referans ───────────────────────────────────────────────────── */
  const REF_FRAMES = [
    { phrase: 'This practice', tr: 'bu uygulama', target: 'n',
      passage: (t, x) => `${t.i[EN]} <b>This practice</b> shaped the material that survives today.`,
      passageTr: (t, x) => `${t.i[TR]} Bugüne ulaşan malzemeyi bu uygulama biçimlendirmiştir.` },
    { phrase: 'These differences', tr: 'bu farklılıklar', target: 'nd',
      passage: (t, x) => `${t.i[EN]} ${t.d[EN]} <b>These differences</b> are what the researchers work with.`,
      passageTr: (t, x) => `${t.i[TR]} ${t.d[TR]} Araştırmacıların üzerinde çalıştığı şey bu farklılıklardır.` },
    { phrase: 'This approach', tr: 'bu yaklaşım', target: 'n',
      passage: (t, x) => `${t.i[EN]} ${t.x[EN]} <b>This approach</b>, whatever its limits, remains in use.`,
      passageTr: (t, x) => `${t.i[TR]} ${t.x[TR]} Sınırları ne olursa olsun bu yaklaşım kullanılmayı sürdürüyor.` },
    { phrase: 'Such evidence', tr: 'bu tür kanıtlar', target: 'nd',
      passage: (t, x) => `${t.d[EN]} ${t.e[EN]} <b>Such evidence</b> is now central to the field.`,
      passageTr: (t, x) => `${t.d[TR]} ${t.e[TR]} Bu tür kanıtlar artık alanın merkezinde duruyor.` }
  ];
  function buildReference(need) {
    const out = [];
    for (let k = 0; out.length < need; k++) {
      const t = T[k % T.length], x = XT(t);
      const f = REF_FRAMES[Math.floor(k / T.length) % REF_FRAMES.length];
      const other = XT(T[(k + 5) % T.length]);
      const correct = x[f.target][EN];
      const near = x[f.target === 'n' ? 'nd' : 'n'][EN];
      const distractors = [near, x.nx[EN], t.o[EN].replace(/\.$/, ''), other.n[EN]]
        .filter(o => o !== correct).slice(0, 4);
      out.push(mc(`xp_ref_${k + 1}`, `Metindeki '${f.phrase.toLowerCase()}' ifadesi hangisine atıfta bulunmaktadır?`,
        correct, distractors, k,
        Object.assign({
          sentence: f.passage(t, x),
          translation: f.passageTr(t, x),
          explanation: `'${f.phrase}' (${f.tr}) ifadesi kendinden önceki cümlede anlatılan durumu özetler: ${x[f.target][TR]}. Diğer seçenekler metinde geçse bile bu ifadenin gönderdiği şey değildir.`
        }, tag('reference'))));
    }
    return out;
  }

  /* ── Cümle Tamamlama ────────────────────────────────────────────────────── */
  const SC_FRAMES = [
    { stem: (t, x) => `----, ${x.m[EN]}.`,
      correct: t => `Because ${t.k[EN]}`,
      wrong: t => [`Although ${t.k[EN]}`, `Unless ${t.k[EN]}`, `So that ${t.k[EN]}`, `Even if ${t.k[EN]}`],
      tr: (t, x) => `${cap(t.k[TR])} için ${x.m[TR]}.`,
      why: 'Ana cümledeki durumun nedeni aranıyor; boşluğa sebep bildiren yan cümle gelir. Zıtlık, koşul ve amaç bağlaçları bu mantığı bozar.' },
    { stem: (t, x) => `${cap(x.m[EN])} ----.`,
      correct: t => `because ${t.k[EN]}`,
      wrong: t => [`although ${t.k[EN]}`, `unless ${t.k[EN]}`, `whereas ${t.k[EN]}`, `in case ${t.k[EN]}`],
      tr: (t, x) => `${cap(t.k[TR])} için ${x.m[TR]}.`,
      why: 'Boşluk cümlenin sonundadır ve ana cümledeki sonucun gerekçesini vermelidir.' },
    { stem: (t, x) => `Because ${t.k[EN]}, ----.`,
      correct: (t, x) => `${x.m[EN]}`,
      wrong: (t, x, o1, o2) => [o1.m[EN], o2.m[EN], `the opposite result was recorded`, `no such pattern has ever been observed`],
      tr: (t, x) => `${cap(t.k[TR])} için ${x.m[TR]}.`,
      why: 'Yan cümle nedeni veriyor; boşluğa bu nedenden çıkan sonucu anlatan ana cümle gelmelidir.' },
    { stem: (t, x) => `----, ${x.m[EN]}.`,
      correct: (t, x) => `Although ${x.k2[EN]}`,
      wrong: (t, x) => [`Because ${x.k2[EN]}`, `Unless ${x.k2[EN]}`, `So that ${x.k2[EN]}`, `As soon as ${x.k2[EN]}`],
      tr: (t, x) => `${cap(x.k2[TR])} olsa da ${x.m[TR]}.`,
      why: 'İki yargı birbirinin beklenen sonucu değil; aradaki ilişki ödün/zıtlık kurar.' },
    { stem: (t, x) => `Although ${x.k2[EN]}, ----.`,
      correct: (t, x) => `${x.m[EN]}`,
      wrong: (t, x, o1, o2) => [o1.m[EN], o2.m[EN], `the project was abandoned at once`, `the same conclusion had already been reached`],
      tr: (t, x) => `${cap(x.k2[TR])} olsa da ${x.m[TR]}.`,
      why: 'Baştaki ödün cümlesi bir beklenti kuruyor; ana cümle bu beklentiyi bozan yargıyı taşımalıdır.' }
  ];
  function buildSentComp(need) {
    const out = [];
    for (let k = 0; out.length < need; k++) {
      const t = T[k % T.length], x = XT(t);
      const f = SC_FRAMES[Math.floor(k / T.length) % SC_FRAMES.length];
      const o1 = XT(T[(k + 4) % T.length]), o2 = XT(T[(k + 9) % T.length]);
      const correct = f.correct(t, x);
      const wrong = f.wrong(t, x, o1, o2).filter(w => w !== correct).slice(0, 4);
      out.push(mc(`xp_sc_${k + 1}`,
        `Cümleyi en uygun biçimde tamamlayan seçeneği bulunuz:<br><br><strong>${f.stem(t, x).replace('----', '_______')}</strong>`,
        correct, wrong, k,
        Object.assign({ translation: f.tr(t, x), explanation: f.why }, tag('sentcomp'))));
    }
    return out;
  }

  /* ── Yakın Anlamlı Cümle ────────────────────────────────────────────────── */
  // Kalıp değişir, anlam sabit kalır: doğru seçenek aynı ilişkiyi başka bir
  // yapıyla kurar, çeldiriciler ilişkinin kendisini değiştirir.
  const RS_FRAMES = [
    { orig: (t, x) => `Because ${t.k[EN]}, ${x.m[EN]}.`,
      correct: (t, x) => `${cap(x.m[EN])}; this is because ${t.k[EN]}.`,
      wrong: (t, x) => [`${cap(x.m[EN])} although ${t.k[EN]}.`,
                        `Unless ${t.k[EN]}, ${x.m[EN]}.`,
                        `${cap(x.m[EN])} so that ${t.k[EN]}.`,
                        `${cap(t.k[EN])}, but ${x.m[EN]}.`],
      tr: (t, x) => `${cap(t.k[TR])} için ${x.m[TR]}.`,
      why: 'Özgün cümle sebep-sonuç kurar. Doğru seçenek aynı ilişkiyi noktalı virgül ve açıklama kalıbıyla verir; diğerleri ilişkiyi zıtlığa, koşula ya da amaca çevirir.' },
    { orig: (t, x) => `Although ${x.k2[EN]}, ${x.m[EN]}.`,
      correct: (t, x) => `Despite the fact that ${x.k2[EN]}, ${x.m[EN]}.`,
      wrong: (t, x) => [`Because ${x.k2[EN]}, ${x.m[EN]}.`,
                        `If ${x.k2[EN]}, ${x.m[EN]}.`,
                        `${cap(x.m[EN])} so that ${x.k2[EN]}.`,
                        `${cap(x.k2[EN])}; therefore, ${x.m[EN]}.`],
      tr: (t, x) => `${cap(x.k2[TR])} olsa da ${x.m[TR]}.`,
      why: '"Although" ile "despite the fact that" aynı ödün ilişkisini kurar. Sebep, koşul ve amaç bağlaçları anlamı değiştirir.' },
    { orig: (t, x) => `${cap(x.m[EN])} because ${t.k[EN]}.`,
      correct: (t, x) => `${cap(t.k[EN])}; therefore, ${x.m[EN]}.`,
      wrong: (t, x) => [`${cap(t.k[EN])}; however, ${x.m[EN]}.`,
                        `${cap(x.m[EN])} in case ${t.k[EN]}.`,
                        `Even though ${t.k[EN]}, ${x.m[EN]}.`,
                        `${cap(x.m[EN])} whereas ${t.k[EN]}.`],
      tr: (t, x) => `${cap(t.k[TR])} için ${x.m[TR]}.`,
      why: 'Sebep yan cümlesi, sonucu "therefore" ile bağlayan bağımsız cümleye dönüşür. Zıtlık ve koşul ifadeleri ilişkiyi tersine çevirir.' },
    { orig: (t, x) => `${cap(x.m[EN])} even though ${x.k2[EN]}.`,
      correct: (t, x) => `In spite of the fact that ${x.k2[EN]}, ${x.m[EN]}.`,
      wrong: (t, x) => [`In spite of ${x.k2[EN]}, ${x.m[EN]}.`,
                        `Since ${x.k2[EN]}, ${x.m[EN]}.`,
                        `${cap(x.m[EN])} as long as ${x.k2[EN]}.`,
                        `${cap(x.k2[EN])}, so ${x.m[EN]}.`],
      tr: (t, x) => `${cap(x.k2[TR])} olsa da ${x.m[TR]}.`,
      why: '"Even though" cümle alır; aynı anlamı veren tek seçenek "in spite of the fact that"tir. "In spite of" doğrudan cümle alamaz, "since" ise sebebe döner.' }
  ];
  function buildRestatement(need) {
    const out = [];
    for (let k = 0; out.length < need; k++) {
      const t = T[k % T.length], x = XT(t);
      const f = RS_FRAMES[Math.floor(k / T.length) % RS_FRAMES.length];
      const correct = f.correct(t, x);
      out.push(mc(`xp_rs_${k + 1}`,
        `Aşağıdaki cümleye anlamca en yakın seçeneği bulunuz:<br><br><strong>"${f.orig(t, x)}"</strong>`,
        correct, f.wrong(t, x).filter(w => w !== correct).slice(0, 4), k,
        Object.assign({ translation: f.tr(t, x), explanation: f.why }, tag('restatement'))));
    }
    return out;
  }

  /* ── Çeviri ─────────────────────────────────────────────────────────────── */
  // Çeldiriciler aynı konunun başka cümlelerinden gelir: sözcük alanı aynı,
  // aktarılan bilgi farklı. Böylece seçim, çevirinin doğruluğuna kalır.
  function buildTranslation(need) {
    const out = [];
    const SLOTS = ['i', 'd', 'e', 'c', 'x'];
    for (let k = 0; out.length < need; k++) {
      const t = T[k % T.length];
      const slot = SLOTS[Math.floor(k / T.length) % SLOTS.length];
      const correct = t[slot][TR];
      const wrong = SLOTS.filter(s => s !== slot).map(s => t[s][TR]).slice(0, 4);
      out.push(mc(`xp_tr_${k + 1}`,
        `Aşağıdaki cümlenin Türkçeye en uygun çevirisini bulunuz:<br><br><strong>"${t[slot][EN]}"</strong>`,
        correct, wrong, k,
        Object.assign({
          explanation: `Cümlenin öznesi ve yüklemi birebir korunmalıdır: "${t[slot][EN]}" ifadesinin karşılığı "${correct}" seçeneğidir. Diğer seçenekler aynı metnin başka cümlelerini aktardığı için anlamı kaydırır.`
        }, tag('translation'))));
    }
    return out;
  }

  /* ── Diyalog Tamamlama ──────────────────────────────────────────────────── */
  // Her çerçeve, ikinci konuşmacının yanıtını üçüncü replikle sınar: doğru
  // seçenek hem soruyu karşılar hem de sonraki repliği mümkün kılar.
  const DIALOGUES = [
    { a: 'Have you finished coding the interview transcripts?', b: 'Yes, I finished the last batch on Friday.',
      c: 'Good, then we can run the reliability check this week.',
      d: ['No, I have never used qualitative software before.', 'The interviews were recorded in three languages.',
          'I think the sample should have been larger.', 'Our department is moving to a new building.'],
      why: 'Üçüncü replik işin bittiğini varsayıp bir sonraki adımı öneriyor; ikinci konuşmacı bitirdiğini söylemelidir.' },
    { a: 'Did the ethics committee approve the revised protocol?', b: 'They did, but they asked us to shorten the consent form.',
      c: 'That is easy enough; I will redraft it this afternoon.',
      d: ['No, we have not submitted anything yet.', 'The committee meets only twice a year.',
          'I am not sure who chairs the committee.', 'We should recruit more participants first.'],
      why: 'Üçüncü replik "onu yeniden yazarım" diyor; ikinci replikte yazılacak bir belge (onam formu) geçmelidir.' },
    { a: 'Why did you exclude the 2019 measurements from the model?', b: 'The sensor was recalibrated halfway through that year.',
      c: 'That makes sense; the two halves are not comparable, then.',
      d: ['Because the model was written in another language.', 'I excluded nothing; the model uses every year.',
          'The measurements were published in a local journal.', 'We had no funding for fieldwork that year.'],
      why: 'Üçüncü replik "iki yarı karşılaştırılamaz" diyor; gerekçe yıl ortasında değişen bir ölçüm koşulu olmalıdır.' },
    { a: 'Shall we present the pilot results at the September meeting?', b: 'I would rather wait until the second round is complete.',
      c: 'Fair enough; the numbers will be far more convincing then.',
      d: ['Yes, but the meeting was cancelled last year.', 'The pilot was funded by the university.',
          'I have never attended that meeting.', 'We could publish the protocol instead of the results.'],
      why: '"O zaman sayılar daha ikna edici olur" yanıtı, beklemeyi öneren bir repliği gerektirir.' },
    { a: 'The reviewers want a larger control group.', b: 'We can add twenty participants without changing the design.',
      c: 'Then let us reply that the revision is feasible.',
      d: ['The reviewers rejected the manuscript outright.', 'I did not read the reviews carefully.',
          'A control group is unnecessary in this design.', 'We should submit to a different journal.'],
      why: 'Üçüncü replik "düzeltmenin yapılabilir olduğunu yazalım" diyor; ikinci replik bunun mümkün olduğunu söylemelidir.' },
    { a: 'Has the museum agreed to lend us the tablet?', b: 'Only for the photographic study, not for sampling.',
      c: 'Then we will have to postpone the chemical analysis.',
      d: ['Yes, we may take any sample we need.', 'The museum has never lent anything to us.',
          'The tablet was discovered in the 1960s.', 'We can borrow it for a whole year.'],
      why: 'Üçüncü replik kimyasal analizin ertelenmesinden söz ediyor; ikinci replik örnek almaya izin verilmediğini bildirmelidir.' },
    { a: 'Do we have permission to record the lecture?', b: 'The speaker agreed, provided that we do not publish the video.',
      c: 'Then the recording can be used only inside the department.',
      d: ['No, recording is forbidden in every room.', 'The lecture will last about two hours.',
          'The speaker will send us the slides instead.', 'We already published the video last week.'],
      why: 'Üçüncü replik "yalnızca bölüm içinde kullanılabilir" sonucunu çıkarıyor; ikinci replik koşullu bir izin vermelidir.' },
    { a: 'Why is the error bar so wide in the third column?', b: 'That column has only four measurements behind it.',
      c: 'I see; we should collect more before drawing conclusions.',
      d: ['Because the axis is drawn on a logarithmic scale.', 'There is no error bar in that column.',
          'The colour was chosen for the printed version.', 'The third column is the most reliable one.'],
      why: 'Üçüncü replik "daha fazla veri toplamalıyız" diyor; gerekçe ölçüm sayısının azlığı olmalıdır.' },
    { a: 'Did the field team reach the upper terraces?', b: 'They stopped at the second level because of the rain.',
      c: 'Then the survey of the upper section will wait until spring.',
      d: ['Yes, they mapped every terrace in one day.', 'The terraces were abandoned centuries ago.',
          'The team consists of six students.', 'They will publish the results next month.'],
      why: 'Üçüncü replik üst kesimin ilkbahara kalacağını söylüyor; ikinci replik ekibin yukarı çıkamadığını bildirmelidir.' },
    { a: 'Can we cite the unpublished thesis in the article?', b: 'Only if the author gives written permission.',
      c: 'I will write to her today, then.',
      d: ['No, unpublished work can never be mentioned.', 'The thesis was published two years ago.',
          'Citations are added at the proof stage.', 'We do not need that source at all.'],
      why: 'Üçüncü replik yazara yazmaktan söz ediyor; ikinci replik iznin yazardan alınacağını söylemelidir.' },
    { a: 'How long will the digitisation of the registers take?', b: 'About three years at the current staffing level.',
      c: 'Then an extra assistant would be a sensible investment.',
      d: ['It was completed last year.', 'The registers are kept in another city.',
          'Digitisation does not require any staff.', 'We have not decided whether to digitise them.'],
      why: 'Üçüncü replik ek personelin mantıklı olacağını söylüyor; ikinci replik sürenin personele bağlı olduğunu bildirmelidir.' },
    { a: 'Were the samples kept below four degrees during transport?', b: 'The logger shows a two-hour gap on the second day.',
      c: 'We had better flag that in the methods section.',
      d: ['Yes, the temperature never changed at all.', 'The samples were transported by air.',
          'The logger was bought for this project.', 'Transport took four days in total.'],
      why: 'Üçüncü replik yöntem bölümünde belirtme gereğinden söz ediyor; ikinci replik bir kayıt boşluğunu bildirmelidir.' },
    { a: 'Is the questionnaire ready for the pilot?', b: 'Nearly; two items still need rewording.',
      c: 'Send them to me and I will look at the wording tonight.',
      d: ['Yes, we already ran the pilot last month.', 'The questionnaire has forty items.',
          'We decided not to use a questionnaire.', 'The pilot will be conducted online.'],
      why: 'Üçüncü replik "onları bana gönder" diyor; ikinci replikte üzerinde çalışılacak maddeler bulunmalıdır.' },
    { a: 'Did you manage to reproduce the 2018 result?', b: 'Not with the published parameters, no.',
      c: 'Then we should ask the authors for their original settings.',
      d: ['Yes, the numbers matched exactly.', 'The 2018 study was never published.',
          'I have not looked at that study.', 'Reproduction is not part of our project.'],
      why: 'Üçüncü replik yazarlardan özgün ayarları istemeyi öneriyor; ikinci replik yayımlanan değerlerle sonucun tekrarlanamadığını söylemelidir.' },
    { a: 'Should the interviews be transcribed word for word?', b: 'Yes, otherwise we cannot code the hesitations.',
      c: 'Understood; I will keep the pauses in the transcript.',
      d: ['No, a summary is enough for this study.', 'The interviews were conducted by telephone.',
          'Transcription software does that automatically.', 'We have already deleted the recordings.'],
      why: 'Üçüncü replik duraklamaların korunacağını söylüyor; ikinci replik birebir yazımın gerekçesini vermelidir.' },
    { a: 'Why did the committee return our budget request?', b: 'The equipment line was not itemised.',
      c: 'I will break it down item by item and resubmit it.',
      d: ['They approved it without any changes.', 'The committee never reviews budgets.',
          'Because the project ended last year.', 'We did not request any equipment.'],
      why: 'Üçüncü replik kalem kalem ayırmaktan söz ediyor; gerekçe kalemlerin ayrıştırılmamış olmasıdır.' },
    { a: 'Have you decided which journal to submit to?', b: 'We are choosing between two, and both are open access.',
      c: 'In that case the publication fee should go into the budget.',
      d: ['No, we will not publish this work.', 'The article is still being written.',
          'Neither journal charges any fee.', 'We submitted it last week.'],
      why: 'Üçüncü replik yayın ücretinden söz ediyor; ikinci replik açık erişim dergilerinden söz etmelidir.' },
    { a: 'Did the new lamps change anything in the textile room?', b: 'The fading has slowed noticeably since the summer.',
      c: 'Then the investment has already paid for itself.',
      d: ['No, the lamps were never installed.', 'The room is closed to visitors.',
          'The textiles were moved to storage.', 'We measure fading once every ten years.'],
      why: 'Üçüncü replik yatırımın kendini amorti ettiğini söylüyor; ikinci replik olumlu bir sonuç bildirmelidir.' },
    { a: 'Can the sensors run through the winter without maintenance?', b: 'Only if we replace the batteries in October.',
      c: 'I will add the battery change to the autumn schedule.',
      d: ['No, they must be removed every winter.', 'The sensors were installed in 2012.',
          'Maintenance is carried out by the manufacturer.', 'They have no batteries at all.'],
      why: 'Üçüncü replik pil değişimini takvime eklemekten söz ediyor; ikinci replik bu koşulu getirmelidir.' },
    { a: 'Is the tram extension included in this year\'s plan?', b: 'It is, but only the section up to the hospital.',
      c: 'Then the residential districts will have to wait another year.',
      d: ['No, the extension was cancelled.', 'The tram line was reopened in 2016.',
          'The whole network will be completed this year.', 'Nobody uses the tram in that district.'],
      why: 'Üçüncü replik konut bölgelerinin bekleyeceğini söylüyor; ikinci replik uzatmanın yalnızca bir bölümü kapsadığını bildirmelidir.' },
    { a: 'Do the pollen counts agree with the excavation dates?', b: 'They are about two centuries earlier.',
      c: 'That gap is worth a separate paragraph in the discussion.',
      d: ['Yes, the two agree perfectly.', 'No pollen was found in the sediment.',
          'The excavation has not started yet.', 'Pollen cannot be dated at all.'],
      why: 'Üçüncü replik "bu fark ayrı bir paragrafı hak ediyor" diyor; ikinci replik bir fark bildirmelidir.' },
    { a: 'Were the terraces repaired before the flood?', b: 'Only the lower ones; the upper walls were still open.',
      c: 'That would explain why the damage was uneven.',
      d: ['Yes, all of them had been rebuilt.', 'The flood caused no damage at all.',
          'The terraces are not related to flooding.', 'Repairs began after the flood.'],
      why: 'Üçüncü replik hasarın neden eşit olmadığını açıklıyor; ikinci replik onarımın kısmi olduğunu söylemelidir.' },
    { a: 'How did the students react to the lending scheme?', b: 'They use it constantly, but only for very short trips.',
      c: 'Then we should put the stations closer to the faculties.',
      d: ['They have never heard of the scheme.', 'The scheme was closed after one term.',
          'They mostly ride to the city centre.', 'Only staff members may borrow a bicycle.'],
      why: 'Üçüncü replik istasyonları fakültelere yaklaştırmayı öneriyor; ikinci replik kısa yolculukları bildirmelidir.' },
    { a: 'Did the audit find anything in the support figures?', b: 'Requests doubled in the first six months, then fell.',
      c: 'So the problem was the transition, not the software itself.',
      d: ['The audit was never completed.', 'Support requests have never been recorded.',
          'The figures rose steadily for three years.', 'The software was replaced again last year.'],
      why: 'Üçüncü replik sorunun geçiş dönemi olduğunu çıkarıyor; ikinci replik önce artıp sonra düşen bir eğri bildirmelidir.' },
    { a: 'Can we date the wreck from the amphorae alone?', b: 'Not precisely, but they narrow it to about fifty years.',
      c: 'That is close enough for the trade-route argument.',
      d: ['Yes, they give the exact year.', 'The amphorae were not recovered.',
          'Dating is impossible without the hull.', 'The wreck has already been dated by coins.'],
      why: 'Üçüncü replik "ticaret rotası savı için yeterince yakın" diyor; ikinci replik yaklaşık bir aralık vermelidir.' }
  ];
  function buildDialogue(need) {
    const out = [];
    for (let k = 0; out.length < need; k++) {
      const dlg = DIALOGUES[k % DIALOGUES.length];
      const swap = Math.floor(k / DIALOGUES.length) % 2 === 1;
      // İkinci turda konuşmacı etiketleri ve çeldirici sırası değişir; aynı
      // çerçeve iki farklı biçimde sorulur.
      const names = swap ? ['Editor', 'Author'] : ['Researcher I', 'Researcher II'];
      const wrong = swap ? rotate(dlg.d.slice(), 2) : dlg.d.slice();
      out.push(mc(`xp_dl_${k + 1}`, 'Konuşmayı tamamlayan en uygun ifadeyi bulunuz:',
        dlg.b, wrong, k,
        Object.assign({
          passage: `${names[0]}: ${dlg.a}\n${names[1]}: ----\n${names[0]}: ${dlg.c}`,
          passageLabel: '💬 Diyalog',
          explanation: dlg.why
        }, tag('dialogue'))));
    }
    return out;
  }

  /* ── Okuma Parçası ──────────────────────────────────────────────────────── */
  // Parçalar konu bankasının beş cümlesinden kurulur (giriş → ayrıntı → kanıt →
  // sonuç → karşıtlık); sorular her parça için ayrı yazılmıştır.
  const READING = [
    { key: 'scribes', qs: [
      { p: 'Parçanın ana fikri aşağıdakilerden hangisidir?',
        c: 'Müstensih hataları, bir zamanlar kusur sayılırken bugün el yazmalarının kaynağını belirlemeye yarayan bir kanıt hâline gelmiştir.',
        d: ['Ortaçağ atölyeleri el yazmalarını kopyalarken hiçbir hata yapmamaya özen gösterirdi.',
            'El yazmalarındaki hatalar günümüzde de düzeltilerek özgün metne ulaşılmaktadır.',
            'Matbaanın yaygınlaşması el yazması üretimini tümüyle ortadan kaldırmıştır.',
            'Bir el yazmasının değeri, taşıdığı hata sayısıyla doğru orantılıdır.'],
        e: 'Parça, hataların önce hasar sayıldığını, bugünse kopyaların kaynağını belirleyen kanıt olarak kullanıldığını anlatıyor.' },
      { p: 'Parçaya göre araştırmacılar bir kopyanın hangi atölyeden çıktığını nasıl belirlemektedir?',
        c: 'Kopyalarda yinelenen hataları gruplayarak',
        d: ['Kâğıdın kimyasal bileşimini ölçerek', 'Ciltleme tekniğini karşılaştırarak',
            'Müstensihin imzasını arayarak', 'Metnin uzunluğunu hesaplayarak'],
        e: '"By grouping these errors, researchers can tell which workshop produced a given copy" cümlesi doğrudan bu yöntemi veriyor.' },
      { p: 'Parçadan, tek bir el yazması için aşağıdakilerden hangisi çıkarılabilir?',
        c: 'Özgün metnin sözcüklerini birebir yansıttığı varsayılamaz.',
        d: ['Diğer bütün kopyalardan daha eskidir.', 'Hiçbir araştırma değeri taşımaz.',
            'Yalnızca tek bir atölyede çoğaltılmıştır.', 'Hatasız olduğu için güvenilirdir.'],
        e: 'Son cümle, aynı hataların tek bir el yazmasını özgün metnin kaynağı olarak kullanılamaz kıldığını söylüyor.' },
      { p: 'Parçada "what earlier scholars dismissed as damage" ifadesiyle anlatılmak istenen nedir?',
        c: 'Müstensihlerin bıraktığı küçük hatalar',
        d: ['Nemden bozulmuş sayfalar', 'Eksik kalan ciltler',
            'Yanlış kataloglanmış defterler', 'Kaybolmuş atölye kayıtları'],
        e: 'Parça boyunca "damage" diye anılan şey, müstensihlerin metne bıraktığı hatalardır.' },
      { p: 'Parçanın yazarının müstensih hatalarına yaklaşımı nasıl nitelendirilebilir?',
        c: 'Hataların araştırma değeri taşıdığını kabul eden, ama sınırlarını da belirten bir yaklaşım',
        d: ['Hataları tümüyle değersiz bulan bir yaklaşım', 'Hataların düzeltilmesini savunan bir yaklaşım',
            'Konuya hiçbir yargı katmayan tarafsız bir aktarım', 'Hataları el yazmalarının tek değeri sayan bir yaklaşım'],
        e: 'Yazar hataların kanıt değerini vurguluyor, ancak son cümlede bu hataların yarattığı sınırı da belirtiyor.' } ] },

    { key: 'icecores', qs: [
      { p: 'Parçaya göre buz karotlarını iklim araştırmaları için değerli kılan nedir?',
        c: 'Her yıla ait katmanda o yılın havasından bir örnek taşımaları',
        d: ['Kutup bölgelerinde kolayca çıkarılabilmeleri', 'Yazılı kaynaklarla birlikte saklanmaları',
            'Erimeleri hâlinde bile ölçülebilmeleri', 'Yalnızca son yüzyılı kaydetmeleri'],
        e: 'Parça, katmanlarda hapsolan havanın o yılın atmosferinden örnek tuttuğunu ve bunun ölçülebildiğini söylüyor.' },
      { p: 'Parçaya göre karbondioksit artışıyla ilgili bilgi nereden elde edilmiştir?',
        c: 'Katmanlarda hapsolmuş gazın ölçümlerinden',
        d: ['Kutup seferlerinin günlüklerinden', 'Deniz suyu sıcaklığı kayıtlarından',
            'Ilıman bölge karotlarından', 'On dokuzuncu yüzyıl gözlemevlerinden'],
        e: '"Measurements of the trapped gas show how carbon dioxide rose after 1850" cümlesi kaynağı açıkça veriyor.' },
      { p: 'Parçadan ılıman bölge karotlarıyla ilgili ne çıkarılabilir?',
        c: 'Yıllık kayıt tutma özelliklerini yitirdikleri için iklim kaydı olarak güvenilmezler.',
        d: ['Kutup karotlarından daha ayrıntılı bilgi verirler.', 'Yalnızca yazılı kaynaklarla birlikte kullanılırlar.',
            'Karbondioksit ölçümü için tercih edilirler.', 'Daha derin katmanlar içerdikleri için değerlidirler.'],
        e: 'Parça, ılıman bölge karotlarının eriyip yıllık katmanlarını yitirdiğini söylüyor; bu da yıl yıl okumayı olanaksız kılar.' },
      { p: 'Parçada geçen "no written source can match" ifadesiyle vurgulanan nedir?',
        c: 'Karotların sunduğu iklim kaydının yazılı belgelerden daha kapsamlı olduğu',
        d: ['Yazılı kaynakların hiç kullanılmadığı', 'Karotların yazılı kaynaklarla çeliştiği',
            'Yazılı kaynakların yalnızca kutuplarda bulunduğu', 'Karotların okunmasının çok zor olduğu'],
        e: 'İfade, karot kaydının yazılı hiçbir kaynağın erişemeyeceği bir kapsamda olduğunu belirtir.' },
      { p: 'Parçanın konusu aşağıdakilerden hangisidir?',
        c: 'Buz karotlarının yıllık katmanları aracılığıyla iklim geçmişini kaydetmesi',
        d: ['Kutup seferlerinin finansman sorunları', 'Karbondioksitin sanayi devrimindeki rolü',
            'Buzul erimesinin deniz seviyesine etkisi', 'Atmosfer örneklerinin laboratuvarda saklanması'],
        e: 'Parça baştan sona karotların yıllık katmanlarını ve bunların iklim kaydı olarak değerini işliyor.' } ] },

    { key: 'tramline', qs: [
      { p: 'Parçaya göre tramvay hattıyla ilgili başlangıçtaki beklenti neydi?',
        c: 'Hattın çoğunlukla eski kentteki turistlere hizmet edeceği',
        d: ['Hattın konut bölgelerine uzatılacağı', 'Hattın kısa sürede kapanacağı',
            'Otobüs hatlarının yolcu kazanacağı', 'Yolcuların çoğunun öğrenci olacağı'],
        e: '"Planners expected the line to serve mainly tourists in the old quarter" cümlesi beklentiyi veriyor.' },
      { p: 'Belediye meclisinin hattı uzatma kararı neye dayanmaktadır?',
        c: 'Bilet verilerinin yolcuların çoğunun işe gidip gelenler olduğunu göstermesine',
        d: ['Turist sayısındaki artışa', 'Otobüs hatlarının kapanmasına',
            'Tarihî hattın onarım gereksinimine', 'Konut bölgelerindeki nüfus sayımına'],
        e: 'Parça, üç yıllık bilet verisinden çıkan bulgunun ardından hattın uzatıldığını söylüyor.' },
      { p: 'Parçadan aynı koridordaki otobüs hatlarıyla ilgili ne çıkarılabilir?',
        c: 'Yolcuların bir bölümü otobüsten tramvaya geçmiştir.',
        d: ['Otobüs hatları tümüyle kaldırılmıştır.', 'Otobüsler tramvaydan daha hızlı çalışmaktadır.',
            'Otobüs yolcuları turistlerden oluşmaktadır.', 'Otobüs hatları yeni güzergâhlar kazanmıştır.'],
        e: 'Tramvay yolcusu artarken aynı koridordaki otobüslerin yolcularının dörtte birini yitirmesi, bir geçişe işaret eder.' },
      { p: 'Parçaya göre plancıların öngörüsüyle gerçekleşen kullanım arasındaki ilişki nasıldır?',
        c: 'Gerçekleşen kullanım öngörüyle örtüşmemiş, planın yeniden düzenlenmesine yol açmıştır.',
        d: ['Öngörü bütünüyle doğrulanmıştır.', 'Öngörü yalnızca ilk yıl için geçerli olmuştur.',
            'Gerçekleşen kullanım ölçülememiştir.', 'Plancılar öngörülerini hiç açıklamamıştır.'],
        e: 'Turist beklentisi yerine işe gidip gelenlerin çıkması, hattın konut bölgelerine uzatılmasıyla sonuçlanmıştır.' },
      { p: 'Parçanın ana fikri aşağıdakilerden hangisidir?',
        c: 'Kullanım verileri, tramvay hattının başlangıçtaki amacını değiştirmiştir.',
        d: ['Tarihî tramvay hatları turizm için yeniden açılmalıdır.', 'Kent içi ulaşımda otobüsler tramvaydan üstündür.',
            'On dokuzuncu yüzyıl tramvayları teknik olarak yetersizdir.', 'Bilet fiyatları yolcu sayısını belirlemektedir.'],
        e: 'Parça, verinin beklentiyi çürütmesini ve hattın buna göre yeniden tasarlanmasını anlatıyor.' } ] },

    { key: 'archive', qs: [
      { p: 'Parçaya göre arşivin dizinleme yönteminde alışılmışın dışına çıkan yön nedir?',
        c: 'Sayfaların tarihe göre değil yer adına göre dizinlenmesi',
        d: ['Sayfaların yalnızca mikrofilme çekilmesi', 'Defterlerin özel bir odada saklanması',
            'Yalnızca mahkeme kayıtlarının taranması', 'Dizinin yayımlanmaması'],
        e: '"indexed by place name rather than by date" ifadesi yöntemin ayırt edici yönünü veriyor.' },
      { p: 'Koleksiyonun kullanımındaki artışın nedeni aşağıdakilerden hangisidir?',
        c: 'Yer adına göre hazırlanan dizinin yayımlanması',
        d: ['Arşiv binasının yenilenmesi', 'Giriş ücretinin kaldırılması',
            'Yeni defterlerin satın alınması', 'Mahkeme kayıtlarının taranması'],
        e: 'Kullanımın üç katına çıkması, dizin yayımlandıktan sonraki iki yıla bağlanmıştır.' },
      { p: 'Parçadan belirli bir yılı arayan okurlarla ilgili ne çıkarılabilir?',
        c: 'Dizin yer adına göre kurulduğu için aramaları zorlaşmıştır.',
        d: ['Arşive artık girememektedirler.', 'Aramalarını mahkeme kayıtlarından yapmaktadırlar.',
            'Dizinden hiç yararlanmamaktadırlar.', 'Aramaları eskisinden hızlanmıştır.'],
        e: 'Parça, yıl arayan okurların artık çok daha yavaş arama yaptığını söylüyor; neden dizinin yer adına dayanmasıdır.' },
      { p: 'Arşivin aynı yöntemi mahkeme kayıtlarına uygulaması neyi göstermektedir?',
        c: 'Yöntemin başarılı bulunup yaygınlaştırıldığını',
        d: ['Tapu defterlerinin kullanımdan kaldırıldığını', 'Dizinin hatalı olduğunun anlaşıldığını',
            'Mahkeme kayıtlarının daha eski olduğunu', 'Arşivin personel sayısını azalttığını'],
        e: 'Bir yöntemin başka bir koleksiyona taşınması, o yöntemin sonuç verdiğinin göstergesidir.' },
      { p: 'Parçanın ana fikri aşağıdakilerden hangisidir?',
        c: 'Dizinleme ölçütünün değişmesi, arşivin kullanımını belirgin biçimde artırmıştır.',
        d: ['Arşiv binası koleksiyon için yetersiz kalmıştır.', 'Osmanlı tapu defterleri yalnızca tarihçileri ilgilendirir.',
            'Dijitalleştirme, kâğıt belgelerin korunmasını gereksiz kılar.', 'Mahkeme kayıtları tapu defterlerinden daha değerlidir.'],
        e: 'Parça, yer adına göre dizinlemenin kullanımı üç katına çıkardığını ve yöntemin yaygınlaştığını anlatıyor.' } ] },

    { key: 'coral', qs: [
      { p: 'Parçaya göre mercanların rengini yitirmesine ne yol açar?',
        c: 'İçlerinde yaşayan alglerin dışarı atılması',
        d: ['Deniz suyunun tuzluluğunun düşmesi', 'Dalış turizminin yoğunlaşması',
            'Resifin daha derin sulara taşınması', 'Alglerin sayısının artması'],
        e: 'İlk cümle, rengin alglerin dışarı atılmasıyla yitirildiğini söylüyor.' },
      { p: 'Parçaya göre ağarmayı tetikleyen etken nedir?',
        c: 'Deniz sıcaklığındaki bir iki derecelik yükselme',
        d: ['Su derinliğindeki ani değişim', 'Yağış rejimindeki bozulma',
            'Alglerin genetik yapısı', 'Resif üzerindeki fiziksel hasar'],
        e: 'Parça, atımın yalnızca bir iki derecelik bir yükselmeyle tetiklendiğini belirtiyor.' },
      { p: 'Parçadan derin sulardaki resiflerle ilgili ne çıkarılabilir?',
        c: 'Sıcak hava dalgasının etkisinden büyük ölçüde korunmuşlardır.',
        d: ['Alg barındırmadıkları için renksizdirler.', 'Sığ resiflerden daha hızlı iyileşirler.',
            'Ağarmanın ilk görüldüğü yerlerdir.', 'İnceleme kapsamına alınmamışlardır.'],
        e: '"Reefs in deeper water, in contrast, showed almost no damage" cümlesi bu çıkarımı destekliyor.' },
      { p: 'Parçaya göre iyileşmenin koşulu nedir?',
        c: 'Suyun birkaç hafta içinde soğuması',
        d: ['Alglerin başka türlerle değiştirilmesi', 'Resifin ziyarete kapatılması',
            'Sıcaklığın bir iki derece daha yükselmesi', 'Ağarmanın resifin tamamına yayılması'],
        e: 'Parça iyileşmenin mümkün olduğunu, ancak suyun birkaç hafta içinde soğumasına bağlı olduğunu söylüyor.' },
      { p: 'Parçanın bütünü göz önüne alındığında yazarın tutumu nasıldır?',
        c: 'Hasarın ciddiyetini kabul eden, ancak koşullu bir iyileşme olanağı tanıyan bir tutum',
        d: ['Ağarmanın önemsiz olduğunu savunan bir tutum', 'İyileşmenin olanaksız olduğunu belirten bir tutum',
            'Konuyu yalnızca turizm açısından ele alan bir tutum', 'Bilimsel verilere kuşkuyla yaklaşan bir tutum'],
        e: 'Yazar üçte ikilik ağarmayı aktarırken iyileşmenin koşullu olarak mümkün olduğunu da belirtiyor.' } ] },

    { key: 'wages', qs: [
      { p: 'Parçaya göre iktisatçılar hangi konuda ayrışmıştır?',
        c: 'İstihdamın asgari ücret artışına nasıl tepki vereceği konusunda',
        d: ['Artışın oranının ne olması gerektiği konusunda', 'Bordro kayıtlarının güvenilirliği konusunda',
            'Bölge meclisinin yetkileri konusunda', 'Kırsal firmaların desteklenmesi konusunda'],
        e: '"Economists disagreed about how employment would respond to the increase" cümlesi ayrışmanın konusunu veriyor.' },
      { p: 'Bordro kayıtları neyi göstermiştir?',
        c: 'İşe alımlarda ölçülebilir bir düşüş olmadığını',
        d: ['İşe alımların yarı yarıya azaldığını', 'Ücretlerin yeniden düşürüldüğünü',
            'Kırsal firmaların kapandığını', 'Çalışma saatlerinin uzadığını'],
        e: 'Parça, ertesi yılın kayıtlarında ölçülebilir bir düşüş bulunmadığını söylüyor.' },
      { p: 'Bulgunun üç ayrı politika değerlendirmesinde anılması neyi göstermektedir?',
        c: 'Sonucun politika tartışmalarında dikkate alınacak ağırlıkta bulunduğunu',
        d: ['Bulgunun yanlış olduğunun anlaşıldığını', 'Değerlendirmelerin aynı ekipçe yapıldığını',
            'Asgari ücretin yeniden artırıldığını', 'Kayıtların gizli tutulduğunu'],
        e: 'Bir bulgunun birden çok değerlendirmede anılması, ona atfedilen ağırlığın göstergesidir.' },
      { p: 'Parçadan kırsal ilçelerdeki küçük firmalarla ilgili ne çıkarılabilir?',
        c: 'Genel tablodaki olumlu sonuç onların durumunu yansıtmamaktadır.',
        d: ['Artıştan hiç etkilenmemişlerdir.', 'İşe alımlarını artırmışlardır.',
            'Bordro kayıtlarını tutmamışlardır.', 'Bölge meclisine başvurmuşlardır.'],
        e: 'Genel olarak istihdam düşmezken bu firmaların maliyet artışı bildirmesi, ortalamanın herkesi temsil etmediğini gösterir.' },
      { p: 'Parçanın ana fikri aşağıdakilerden hangisidir?',
        c: 'Asgari ücret artışı, beklenenin aksine istihdamda ölçülebilir bir düşüşe yol açmamıştır.',
        d: ['Asgari ücret artışları her bölgede aynı sonucu verir.', 'İktisatçılar arasındaki görüş ayrılıkları giderilmiştir.',
            'Kırsal firmalar ücret artışlarından yararlanmaktadır.', 'Bordro kayıtları politika yapımında kullanılmamalıdır.'],
        e: 'Parça, tartışmalı bir beklentinin veriyle karşılaştırılmasını ve düşüş bulunmamasını merkeze alıyor.' } ] }
  ];

  function buildReading(need) {
    const out = [];
    let n = 0;
    for (let r = 0; out.length < need; r++) {
      const set = READING[r % READING.length];
      const t = T.find(x => x.key === set.key);
      const passage = [t.i[EN], t.d[EN], t.e[EN], t.c[EN], t.x[EN]].join(' ');
      const passageTr = [t.i[TR], t.d[TR], t.e[TR], t.c[TR], t.x[TR]].join(' ');
      set.qs.forEach(q => {
        if (out.length >= need) return;
        n++;
        out.push(mc(`xp_rd_${n}`, q.p, q.c, q.d.slice(), n,
          Object.assign({
            passage, passageLabel: '📖 Okuma Parçası', translation: passageTr, explanation: q.e
          }, tag('reading'))));
      });
    }
    return out;
  }

  /* ── Havuzları kur ve deneme dersine ekle ───────────────────────────────── */
  // Her beceri için üretilebilecek benzersiz soru sayısı sınırlıdır; havuz o
  // sınıra kadar doldurulur, app.js var olan sorularla birleştirip ilk 100'ü
  // alır. Böylece elle yazılmış içerik hep önce gelir.
  const BUILD = [
    ['reading', buildReading, 30], ['dialogue', buildDialogue, 50], ['paracomp', buildParaComp, 64],
    ['restatement', buildRestatement, 64], ['irrelevant', buildIrrelevant, 64], ['ordering', buildOrdering, 96],
    ['reference', buildReference, 64], ['cloze', buildCloze, 64], ['sentcomp', buildSentComp, 80],
    ['translation', buildTranslation, 80]
  ];

  const host = lessons.find(l => l.id === HOST_LESSON);
  if (!host || !Array.isArray(host.exercises)) return;

  BUILD.forEach(([key, fn, max]) => {
    const questions = fn(max);
    POOL[key] = questions;
    const id = 'xp_' + key;
    if (host.exercises.some(e => e.id === id)) return;
    host.exercises.push({
      id,
      title: `Deneme Havuzu — ${SKILL[key]}`,
      description: 'Sekmedeki testleri 10 tam teste tamamlayan ek sorular.',
      questions
    });
  });

  if (typeof window !== 'undefined') window.__EXAM_POOL__ = POOL;
})();
