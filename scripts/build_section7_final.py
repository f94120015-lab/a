import json
import re

# Node script to run verification and injection
node_script = """
const fs = require("fs");
const vm = require("vm");

let code = fs.readFileSync("data.js", "utf8");
code = code.replace("const unitSentencesMap =", "window.unitSentencesMap =");

const sandbox = {
  console: console,
  window: {},
  document: { font: "", addEventListener: () => {} },
  location: { hostname: "localhost" },
  navigator: { userAgent: "" },
  setTimeout: () => {},
  setInterval: () => {}
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const u70 = sandbox.window.unitSentencesMap["70"];
const u70Words = new Set();
function extractSec6(str) {
  if (!str || typeof str !== "string") return;
  const tokens = str.replace(/[^a-zA-Z]/g, " ").toLowerCase().split(/\\s+/);
  tokens.forEach(t => {
    if (t.length >= 3 && !["the","and","for","with","that","this","from","are","was","were","can","could","should","might","would","may","must","they","their","you","your","his","her","not"].includes(t)) {
      u70Words.add(t);
    }
  });
}
for (let lId in u70) {
  u70[lId].exercises.forEach(ex => {
    ex.questions.forEach(q => {
      extractSec6(q.enSentence);
      if (q.pairs) q.pairs.forEach(p => extractSec6(p.right));
      if (q.options) q.options.forEach(opt => extractSec6(opt));
    });
  });
}

console.log("Section 6 unique content words:", u70Words.size);
"""

print("Preparing complete Section 7 (Unit 9) builder script...")
