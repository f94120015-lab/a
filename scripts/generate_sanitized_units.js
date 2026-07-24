const fs = require('fs');
const vm = require('vm');

const dataCode = fs.readFileSync('data.js', 'utf8');
const extraCode = fs.readFileSync('data-extra.js', 'utf8');

const sandbox = {
  console: console,
  window: { location: { hostname: 'localhost', protocol: 'http:' } },
  document: {},
  lessons: [],
  units: [],
  rawTopics: []
};

vm.createContext(sandbox);
const executableCode = dataCode.replace(/\bexport\s+/g, '');
const wrapperCode = executableCode + '\n; ({ units, lessons, rawTopics });';
const dataResult = vm.runInContext(wrapperCode, sandbox);

sandbox.lessons = dataResult.lessons;
sandbox.units = dataResult.units;
sandbox.rawTopics = dataResult.rawTopics;

const executableExtra = extraCode.replace(/\bexport\s+/g, '');
vm.runInContext(executableExtra, sandbox);

// Import cleanAcademicUnitTitle from app.js
const appCode = fs.readFileSync('app.js', 'utf8');
const cleanTitleMatch = appCode.match(/function cleanAcademicUnitTitle\([\s\S]*?\}\s*?\n\s*?if\s*?\(typeof\s*?window\b[\s\S]*?\}/);
let cleanAcademicUnitTitle;
if (cleanTitleMatch) {
  const cleanTitleSandbox = { window: {} };
  vm.createContext(cleanTitleSandbox);
  vm.runInContext(cleanTitleMatch[0], cleanTitleSandbox);
  cleanAcademicUnitTitle = cleanTitleSandbox.window.cleanAcademicUnitTitle;
} else {
  // Fallback if regex match fails
  cleanAcademicUnitTitle = (t) => t;
}

const units = sandbox.units;

// Deduplicate units by title
const uniqueUnits = [];
const seenTitles = new Set();
units.forEach(u => {
  const normalizedTitle = (u.title || '').trim();
  if (!seenTitles.has(normalizedTitle)) {
    seenTitles.add(normalizedTitle);
    uniqueUnits.push(u);
  }
});

const lines = [];
lines.push(`Final units length after app.js sanitization: ${uniqueUnits.length}`);

uniqueUnits.forEach((u, idx) => {
  const originalId = u.id;
  const newId = idx + 1;
  const cleanedTitle = cleanAcademicUnitTitle(u.title);
  lines.push(`${newId}. [ID: ${newId}] ${cleanedTitle} (Original ID in data: ${originalId}, Pages: ${u.pages || 'null'})`);
});

fs.writeFileSync('final_sanitized_units.json', lines.join('\n') + '\n', 'utf8');
console.log('Successfully generated final_sanitized_units.json');
