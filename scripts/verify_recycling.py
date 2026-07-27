import subprocess

node_code = """
const fs = require("fs");
const vm = require("vm");

let code = fs.readFileSync("data.js", "utf8");
code = code.replace("const unitSentencesMap =", "window.unitSentencesMap =");

const sandbox = { window: {}, document: { font: "", addEventListener: () => {} }, location: { hostname: "localhost" }, navigator: { userAgent: "" } };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const u70 = sandbox.window.unitSentencesMap["70"];
const u9 = sandbox.window.unitSentencesMap["9"];

const stopwords = new Set(["the","and","for","with","that","this","from","are","was","were","can","could","should","might","would","may","must","they","their","you","your","his","her","not","which","what","where","when","why","whose","how","did","does","has","have","had","is","been","being","do","will","shall","one","two","three","four","five"]);

function getEnglishWords(text, setObj) {
  if (!text || typeof text !== "string") return;
  const matches = text.match(/\\b[a-zA-Z]{3,}\\b/g);
  if (!matches) return;
  matches.forEach(w => {
    const word = w.toLowerCase();
    // filter english words only
    if (!stopwords.has(word) && !["bir","veya","ile","icin","kadar","gore","olan","olarak","sonra","once","gibi","daha","cogu","bazi","her","hic","butun","tum"].includes(word)) {
      setObj.add(word);
    }
  });
}

function processUnit(unitObj, wordSet) {
  for (let lId in unitObj) {
    unitObj[lId].exercises.forEach(ex => {
      ex.questions.forEach(q => {
        if (q.enSentence) getEnglishWords(q.enSentence, wordSet);
        if (q.pairs) {
          q.pairs.forEach(p => {
            if (p.right && /^[a-zA-Z\\s\\'-]+$/.test(p.right)) getEnglishWords(p.right, wordSet);
            if (p.left && /^[a-zA-Z\\s\\'-]+$/.test(p.left)) getEnglishWords(p.left, wordSet);
          });
        }
        if (q.options) {
          q.options.forEach(opt => {
            if (/^[a-zA-Z\\s\\'-]+$/.test(opt)) getEnglishWords(opt, wordSet);
          });
        }
      });
    });
  }
}

const w70 = new Set();
const w9 = new Set();

processUnit(u70, w70);
processUnit(u9, w9);

const common = [];
w70.forEach(w => { if (w9.has(w)) common.push(w); });

const pct = (common.length / w70.size) * 100;
console.log("Section 6 (Unit 70) English content words count:", w70.size);
console.log("Section 7 (Unit 9) English content words count:", w9.size);
console.log(`Recycled English words count: ${common.length} / ${w70.size} (${pct.toFixed(1)}%)`);
console.log("Common words list:", common.sort().join(", "));
"""

with open("scripts/temp_check.js", "w", encoding="utf-8") as f:
    f.write(node_code)

res = subprocess.run(["node", "scripts/temp_check.js"], capture_output=True, text=True)
print(res.stdout)
if res.stderr:
    print("Errors:", res.stderr)
