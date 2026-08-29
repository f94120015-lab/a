const fs = require('fs');
const path = require('path');

// The build runs this twice: once with --inject-only (before minification) to bake
// the Supabase config into www/app.js, then once with --stamp-only (after minification)
// so the ?v= cache-busting hashes describe the files actually shipped.
const stampOnly = process.argv.includes('--stamp-only');
const injectOnly = process.argv.includes('--inject-only');

const appPath = path.join(__dirname, 'app.js');
const targetPath = path.join(__dirname, 'www', 'app.js');

if (!stampOnly) {
if (!fs.existsSync(appPath)) {
  console.error('Source app.js not found!');
  process.exit(1);
}

// Load .env.local if exists to populate process.env
const envLocalPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = (match[2] || '').trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  });
}

let appContent = fs.readFileSync(appPath, 'utf8');

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

console.log('Injecting Supabase Config...');
console.log(`URL length: ${supabaseUrl.length}`);
console.log(`Key length: ${supabaseKey.length}`);

// Replace the SUPABASE_URL variable definition
appContent = appContent.replace(
  /const\s+SUPABASE_URL\s*=\s*['"].*?['"]\s*;/,
  `const SUPABASE_URL = "${supabaseUrl.replace(/"/g, '\\"').replace(/\n/g, '')}";`
);

// Replace the SUPABASE_ANON_KEY variable definition
appContent = appContent.replace(
  /const\s+SUPABASE_ANON_KEY\s*=\s*['"].*?['"]\s*;/,
  `const SUPABASE_ANON_KEY = "${supabaseKey.replace(/"/g, '\\"').replace(/\n/g, '')}";`
);

fs.writeFileSync(targetPath, appContent, 'utf8');
console.log('Successfully wrote injected app.js to www/app.js');
}

// ── Cache-busting ────────────────────────────────────────────────────────────
// index.html pins every asset to a hand-written "?v=3.4.0" that nobody remembers
// to bump, so browsers keep serving stale data.js / app.js after a deploy.
// Rewrite each ?v= in www/index.html to a hash of that asset's own contents:
// changed files get a fresh URL, unchanged ones stay cached.
const crypto = require('crypto');
const wwwIndexPath = path.join(__dirname, 'www', 'index.html');

if (injectOnly) {
  // Hashes are stamped in the later --stamp-only pass.
} else if (fs.existsSync(wwwIndexPath)) {
  let html = fs.readFileSync(wwwIndexPath, 'utf8');
  let stamped = 0;

  html = html.replace(/(src|href)="([^"?]+)\?v=[^"]*"/g, (match, attr, file) => {
    const assetPath = path.join(__dirname, 'www', file);
    if (!fs.existsSync(assetPath)) return match;
    const hash = crypto
      .createHash('md5')
      .update(fs.readFileSync(assetPath))
      .digest('hex')
      .slice(0, 8);
    stamped++;
    return `${attr}="${file}?v=${hash}"`;
  });

  fs.writeFileSync(wwwIndexPath, html, 'utf8');
  console.log(`Cache-busted ${stamped} asset reference(s) in www/index.html`);
} else {
  console.warn('www/index.html not found — skipped cache-busting.');
}
