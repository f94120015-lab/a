const fs = require('fs');

const dataCode = fs.readFileSync('data.js', 'utf8');
const startIndex = dataCode.indexOf('const rawTopics = [');
if (startIndex === -1) {
  console.error('Could not find const rawTopics');
  process.exit(1);
}

const afterStart = dataCode.substring(startIndex + 'const rawTopics = ['.length);
// Find the closing array bracket
// We count brackets since we can have nested arrays
let bracketCount = 1;
let inString = false;
let stringChar = null;
let escape = false;
let endIndex = -1;

for (let i = 0; i < afterStart.length; i++) {
  const char = afterStart[i];
  if (escape) {
    escape = false;
    continue;
  }
  if (char === '\\') {
    escape = true;
    continue;
  }
  if (inString) {
    if (char === stringChar) {
      inString = false;
    }
    continue;
  }
  if (char === '"' || char === "'" || char === '`') {
    inString = true;
    stringChar = char;
    continue;
  }
  if (char === '[') {
    bracketCount++;
  } else if (char === ']') {
    bracketCount--;
    if (bracketCount === 0) {
      endIndex = startIndex + 'const rawTopics = ['.length + i;
      break;
    }
  }
}

if (endIndex === -1) {
  console.error('Could not find closing bracket of rawTopics');
  process.exit(1);
}

const rawTopicsText = dataCode.substring(startIndex + 'const rawTopics = ['.length, endIndex);

function splitObjects(text) {
  const objects = [];
  let braceCount = 0;
  let currentStart = -1;
  let inString = false;
  let stringChar = null;
  let escape = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (char === '\\') {
      escape = true;
      continue;
    }
    if (inString) {
      if (char === stringChar) {
        inString = false;
      }
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      inString = true;
      stringChar = char;
      continue;
    }
    if (char === '{') {
      if (braceCount === 0) {
        currentStart = i;
      }
      braceCount++;
    } else if (char === '}') {
      braceCount--;
      if (braceCount === 0) {
        objects.push(text.substring(currentStart, i + 1));
      }
    }
  }
  return objects;
}

const topicStrings = splitObjects(rawTopicsText);
console.log('Found', topicStrings.length, 'topics.');

topicStrings.forEach((tStr, index) => {
  const titleMatch = tStr.match(/title:\s*["'`](.*?)["'`]/);
  const idMatch = tStr.match(/id:\s*(\d+)/);
  const title = titleMatch ? titleMatch[1] : 'Unknown Title';
  const id = idMatch ? idMatch[1] : 'No ID';
  console.log(`${index + 1}. ID: ${id} | Title: ${title}`);
});
