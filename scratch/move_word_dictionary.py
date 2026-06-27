import re

def move_dict():
    # 1. Read app.js
    with open("app.js", "r", encoding="utf-8") as f:
        app_js = f.read()

    # Find the wordDictionary block
    start_match = "const wordDictionary = {"
    end_match = "};;"
    
    start_idx = app_js.find(start_match)
    if start_idx == -1:
        print("Could not find wordDictionary in app.js!")
        return

    # Find closing bracket ";;" after start_idx
    end_idx = app_js.find(end_match, start_idx) + 3 # include the ";/"
    
    dict_block = app_js[start_idx:end_idx]
    
    # Remove from app.js
    app_js_new = app_js[:start_idx] + "// wordDictionary was moved to data.js to support matching base translations\n" + app_js[end_idx:]
    
    # Write back to app.js
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(app_js_new)
    print("Extracted and removed wordDictionary from app.js.")

    # 2. Prepend to data.js
    with open("data.js", "r", encoding="utf-8") as f:
        data_js = f.read()

    data_js_new = dict_block + "\n\n" + data_js

    # 3. Update getUniqueMatchingPairs in data.js
    old_base_tr = """  const getBaseTr = (w) => {
    if (unitId === 13) return unitAra1BaseTranslations[w] || null;
    if (unitId === 17) return unitAra2BaseTranslations[w] || null;
    if (unitId === 14) return unit13BaseTranslations[w] || null;
    return null;
  };"""

    new_base_tr = """  const getBaseTr = (w) => {
    if (unitId === 13) return unitAra1BaseTranslations[w] || null;
    if (unitId === 17) return unitAra2BaseTranslations[w] || null;
    if (unitId === 14) return unit13BaseTranslations[w] || null;
    
    // Global wordDictionary fallback to use base dictionary translation for all other units
    const key = w.toLowerCase().trim();
    if (typeof wordDictionary !== 'undefined' && wordDictionary[key]) {
      const raw = wordDictionary[key];
      const clean = raw.split(',')[0].split('/')[0].split(';')[0].split('(')[0].trim();
      if (clean) return clean;
    }
    return null;
  };"""

    if old_base_tr in data_js_new:
        data_js_new = data_js_new.replace(old_base_tr, new_base_tr)
        print("Updated getUniqueMatchingPairs to utilize wordDictionary globally.")
    else:
        print("WARNING: Exact match of old getBaseTr not found. Attempting regex replacement...")
        # Use regex to find getBaseTr and replace it, tolerating indentation
        pattern = r"const getBaseTr = \(w\) => \{.*?return null;\s*\};"
        data_js_new, count = re.subn(pattern, new_base_tr, data_js_new, flags=re.DOTALL)
        if count > 0:
            print(f"Updated getUniqueMatchingPairs via regex in {count} place(s).")
        else:
            print("ERROR: Could not find getBaseTr to update!")

    # Write back to data.js
    with open("data.js", "w", encoding="utf-8") as f:
        f.write(data_js_new)
    print("data.js updated successfully.")

if __name__ == "__main__":
    move_dict()
