const fs = require('fs');

const dataPath = '../data.js';
const fileContent = fs.readFileSync(dataPath, 'utf8');

const dictStart = fileContent.indexOf('const wordDictionary = {');
const dictEnd = fileContent.indexOf('};', dictStart);
const dictStr = fileContent.substring(dictStart, dictEnd + 2);
const wordDictionary = eval("(" + dictStr.replace("const wordDictionary = ", "").replace(/;\s*$/, "") + ")");

const wordsUsed = [
  "research", "facility", "currently", "requires", "additional", "financial", "resources", "optimize", "secondary", "structural", "frameworks",
  "compiler", "processing", "data", "blocks", "network", "firewall", "blocks", "external", "traffic",
  "public", "laboratories", "adjusting", "security", "protocols", "malicious", "malware", "attacks", "threaten", "sensitive", "files",
  "system", "presently", "generating", "unique", "cryptographic", "key", "administrator", "grants", "verification", "clearance",
  "software", "developers", "prefer", "gamified", "mobile", "design", "patterns", "students", "learn", "complex", "grammar", "easily",
  "central", "server", "validating", "credentials", "grounds", "previous", "login", "requests", "corrupted",
  "automatic", "monitoring", "pressure", "parameters", "lest", "industrial", "mechanical", "piston", "should", "fail", "unexpectedly",
  "institutions", "altering", "internal", "laws", "inasmuch", "regional", "environmental", "regulations", "become", "stricter",
  "academic", "team", "testing", "new", "device", "just", "original", "mathematical", "physics", "formulas", "predicted",
  "heavy", "rain", "affecting", "simulation", "site", "therefore", "field", "operations", "temporarily", "suspended",
  "successfully", "upgraded", "database", "yesterday", "ago", "last", "week", "traditional", "completed", "year",
  "recently", "already", "lately", "so", "far", "up", "to", "now", "started", "project", "began", "experiment",
  "latency", "installation"
];

console.log("Missing words:");
const missing = [];
wordsUsed.forEach(w => {
  const clean = w.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  if (!wordDictionary[clean]) {
    missing.push(clean);
  }
});
console.log(JSON.stringify(missing, null, 2));
