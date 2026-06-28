const wordRegex = /(<[^>]+>)|([a-zA-Z0-9'-]+)|([^a-zA-Z0-9'-<]+)/g;
const text = 'Yesterday, the server <span style="color: red">validated</span> credentials.';

let match;
let html = '';
wordRegex.lastIndex = 0;

while ((match = wordRegex.exec(text)) !== null) {
  const tag = match[1];
  const word = match[2];
  const nonWord = match[3];
  
  if (tag) {
    html += `[TAG:${tag}]`;
  } else if (word) {
    html += `[WORD:${word}]`;
  } else if (nonWord) {
    html += `[NONWORD:${nonWord}]`;
  }
}

console.log(html);
