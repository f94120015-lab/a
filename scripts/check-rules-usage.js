const fs = require('fs');
const vm = require('vm');

const stableCode = fs.readFileSync('data-stable.js', 'utf8');
const dataCode = fs.readFileSync('data.js', 'utf8');
const extraCode = fs.readFileSync('data-extra.js', 'utf8');
const rulesCode = fs.readFileSync('rules-db.js', 'utf8');

const sandbox = {
  console: console,
  window: { location: { hostname: 'localhost', protocol: 'http:' } },
  document: {},
  lessons: [],
  units: []
};

vm.createContext(sandbox);
const executableRules = rulesCode.replace(/\bexport\s+/g, '');
vm.runInContext(executableRules, sandbox);

const rules = sandbox.window.ACADEMIC_RULES;
console.log('Total ACADEMIC_RULES defined in rules-db.js:', rules ? Object.keys(rules).length : 0);

// Check references in data files
const allDataText = stableCode + dataCode + extraCode;

const missingRuleRefs = [];
const referencedRules = [];

if (rules) {
  Object.keys(rules).forEach(ruleKey => {
    const ruleObj = rules[ruleKey];
    // check if rule_1 or ruleId 1 or rule_key is mentioned in data files
    const idRef = `ruleId: ${ruleObj.id}`;
    const idRef2 = `ruleId:${ruleObj.id}`;
    const keyRef = `rule_${ruleObj.id}`;
    if (allDataText.includes(idRef) || allDataText.includes(idRef2) || allDataText.includes(keyRef)) {
      referencedRules.push(ruleObj.id);
    } else {
      missingRuleRefs.push({ id: ruleObj.id, title: ruleObj.title });
    }
  });
}

console.log('Referenced rules count:', referencedRules.length);
console.log('Unreferenced / unused rules count:', missingRuleRefs.length);
console.log('Unreferenced rules:', JSON.stringify(missingRuleRefs, null, 2));
