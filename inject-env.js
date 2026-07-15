const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'app.js');
const targetPath = path.join(__dirname, 'www', 'app.js');

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
