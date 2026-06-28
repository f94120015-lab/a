const fs = require('fs');

const content = fs.readFileSync('../data.js', 'utf8');

const regex = /"options":\s*\[([\s\S]*?)\]/g;
let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
  const optionsStr = match[1];
  if (optionsStr.includes('<span')) {
    console.log("Found HTML inside options:\n", match[0]);
    count++;
  }
}
console.log(`Check complete. Found ${count} styled options.`);
