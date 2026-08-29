// Büyük veri literal'lerini JSON.parse(...) çağrısına çevirir.
//
// Neden: V8, obje/dizi literal'ini genel JS grameriyle ayrıştırır; JSON.parse ise
// çok daha dar bir dilbilgisiyle çalışan ayrı ve hızlı bir yola girer. Aynı veri
// için ölçülebilir şekilde daha ucuz. Müfredat dosyaları saf veri olduğu için
// kazanç doğrudan açılış süresine yansıyor.
//
// Terser'dan SONRA çalışır: yalnızca literal'in kaynaktaki halini değiştirir,
// etrafındaki kod (rawTopics.push, units[].lessons mutasyonları, IIFE'ler) aynen kalır.
const fs = require('fs');
const acorn = require('acorn');

// Bu eşiğin altındaki literal'lerde JSON.parse'ın çağrı maliyeti kazancı yiyor.
const MIN_BYTES = 4096;

// AST'den JSON'a çevrilebilir mi? Çevrilebiliyorsa değeri de kurar.
// Dönüş: { ok: true, value } | { ok: false }
function toValue(node) {
  switch (node.type) {
    case 'Literal': {
      const v = node.value;
      if (node.regex || node.bigint) return { ok: false };
      if (v === null || typeof v === 'string' || typeof v === 'boolean') return { ok: true, value: v };
      if (typeof v === 'number') {
        // -0 JSON'da 0'a düşer, NaN/Infinity temsil edilemez.
        if (!Number.isFinite(v) || Object.is(v, -0)) return { ok: false };
        return { ok: true, value: v };
      }
      return { ok: false };
    }
    case 'UnaryExpression': {
      if (node.operator !== '-' || node.argument.type !== 'Literal') return { ok: false };
      const inner = toValue(node.argument);
      if (!inner.ok || typeof inner.value !== 'number') return { ok: false };
      const v = -inner.value;
      if (Object.is(v, -0)) return { ok: false };
      return { ok: true, value: v };
    }
    case 'ArrayExpression': {
      const out = [];
      for (const el of node.elements) {
        if (el === null) return { ok: false }; // seyrek dizi
        if (el.type === 'SpreadElement') return { ok: false };
        const r = toValue(el);
        if (!r.ok) return { ok: false };
        out.push(r.value);
      }
      return { ok: true, value: out };
    }
    case 'ObjectExpression': {
      const out = {};
      for (const p of node.properties) {
        if (p.type !== 'Property' || p.kind !== 'init' || p.computed || p.method) return { ok: false };
        let key;
        if (p.key.type === 'Identifier') key = p.key.name;
        else if (p.key.type === 'Literal' && (typeof p.key.value === 'string' || typeof p.key.value === 'number')) key = String(p.key.value);
        else return { ok: false };
        // Literal'de prototip atar, JSON.parse'ta sıradan bir alan olur — anlam değişir.
        if (key === '__proto__') return { ok: false };
        const r = toValue(p.value);
        if (!r.ok) return { ok: false };
        out[key] = r.value;
      }
      return { ok: true, value: out };
    }
    default:
      return { ok: false };
  }
}

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b || a === null || b === null) return false;
  if (typeof a !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a), kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  for (const k of ka) {
    if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
    if (!deepEqual(a[k], b[k])) return false;
  }
  return true;
}

function transform(src, file) {
  const ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script' });
  const hits = [];

  // Dıştaki literal dönüştürülünce içindekileri ayrıca ele almanın anlamı yok;
  // eşleşen düğüme girmeden dallanmayı kesiyoruz.
  (function walk(node) {
    if (!node || typeof node.type !== 'string') return;
    if (node.type === 'ObjectExpression' || node.type === 'ArrayExpression') {
      if (node.end - node.start >= MIN_BYTES) {
        const r = toValue(node);
        if (r.ok) { hits.push({ start: node.start, end: node.end, value: r.value }); return; }
      }
    }
    for (const key of Object.keys(node)) {
      if (key === 'start' || key === 'end' || key === 'loc' || key === 'range') continue;
      const child = node[key];
      if (Array.isArray(child)) child.forEach(walk);
      else if (child && typeof child.type === 'string') walk(child);
    }
  })(ast);

  let out = '';
  let cursor = 0;
  let converted = 0;
  for (const h of hits) {
    const original = src.slice(h.start, h.end);
    // Asıl doğrulama: literal'in gerçek JS değeri ile JSON yolunun sonucu birebir aynı mı?
    let actual;
    try {
      actual = new Function('return (' + original + ')')();
    } catch (e) {
      continue; // ayrıştıramadıysak dokunma
    }
    const json = JSON.stringify(h.value);
    if (json === undefined) continue;
    if (!deepEqual(actual, JSON.parse(json))) {
      throw new Error(`${file}: JSON dönüşümü değeri değiştirdi (offset ${h.start}) — dönüşüm iptal`);
    }
    const replacement = 'JSON.parse(' + JSON.stringify(json) + ')';
    out += src.slice(cursor, h.start) + replacement;
    cursor = h.end;
    converted++;
  }
  out += src.slice(cursor);
  return { code: out, converted };
}

module.exports = { transform };

if (require.main === module) {
  const files = process.argv.slice(2);
  let before = 0, after = 0, total = 0;
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    const { code, converted } = transform(src, f);
    if (!converted) continue;
    fs.writeFileSync(f, code);
    before += src.length; after += code.length; total += converted;
    console.log(`  jsonify ${f.split('/').pop()} -> ${converted} literal, ${(code.length / 1024).toFixed(0)}K`);
  }
  if (total) console.log(`JSON.parse: ${total} literal, ${(before / 1048576).toFixed(2)}MB -> ${(after / 1048576).toFixed(2)}MB`);
}
