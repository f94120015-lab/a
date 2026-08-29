// Build pipeline for www/: copy sources, inject env, minify every JS file, then
// stamp content-hash cache busters into index.html.
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const www = path.join(root, 'www');

// Copied verbatim — already minified upstream or not JS.
const COPY_ONLY = [
  'index.html',
  'style.css',
  'canvas-confetti.min.js',
  'html2canvas.min.js',
];

// Run through terser. Top-level names stay unmangled on purpose: these files
// share globals (rawTopics, lessons, units, …) across <script> boundaries.
const MINIFY = [
  'app.js',
  'data-stable.js',
  'data.js',
  'data-extra.js',
  'drill-expansion.js',
  'exam-expansion.js',
  'lesson-cause-effect.js',
  'rules-db.js',
  'translation-guide.js',
  'structure-robot.js',
  'ezber-robotu.js',
];

const run = (cmd, args) => execFileSync(cmd, args, { cwd: root, stdio: 'inherit' });

fs.mkdirSync(www, { recursive: true });

for (const f of [...COPY_ONLY, ...MINIFY]) {
  fs.copyFileSync(path.join(root, f), path.join(www, f));
}
fs.cpSync(path.join(root, 'assets'), path.join(www, 'assets'), { recursive: true });

// Bakes Supabase config into www/app.js; must land before minification.
run('node', ['inject-env.js', '--inject-only']);

let before = 0;
let after = 0;
for (const f of MINIFY) {
  const target = path.join(www, f);
  before += fs.statSync(target).size;
  run('npx', ['terser', target, '-c', '-m', '-o', target]);
  const size = fs.statSync(target).size;
  after += size;
  console.log(`  minified ${f} -> ${(size / 1024).toFixed(0)}K`);
}
console.log(`JS: ${(before / 1048576).toFixed(2)}MB -> ${(after / 1048576).toFixed(2)}MB`);

// Hashes now describe the minified files that actually ship.
run('node', ['inject-env.js', '--stamp-only']);
