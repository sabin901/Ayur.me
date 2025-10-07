import os
import re
import json

DATA_DIR = os.path.join('backend', 'data')
JS_FILES = [
    'ayurvedicDiseases.js',
    'comprehensiveDiseases.js',
    'comprehensiveAyurvedicDiseases.js',
    'diseases_part1.js',
]
OUTPUT_FILE = os.path.join(DATA_DIR, 'disease_database.json')

def extract_array_from_js(js_content):
    # Remove module.exports and variable assignment
    js_content = re.sub(r'^(const|let|var)\s+\w+\s*=\s*', '', js_content, flags=re.MULTILINE)
    js_content = re.sub(r'module\.exports\s*=\s*\w+;?\s*$', '', js_content, flags=re.MULTILINE)
    # Remove trailing semicolon if present
    js_content = js_content.strip().rstrip(';')
    # Try to parse as JSON
    try:
        return json.loads(js_content)
    except Exception:
        # Try to fix single quotes and trailing commas
        js_content = js_content.replace("'", '"')
        js_content = re.sub(r',\s*([}\]])', r'\1', js_content)
        return json.loads(js_content)

def main():
    merged = []
    total = 0
    for fname in JS_FILES:
        path = os.path.join(DATA_DIR, fname)
        if not os.path.exists(path):
            print(f"[WARN] {fname} not found, skipping.")
            continue
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        try:
            arr = extract_array_from_js(content)
            merged.extend(arr)
            print(f"[INFO] {fname}: {len(arr)} diseases merged.")
            total += len(arr)
        except Exception as e:
            print(f"[ERROR] Failed to parse {fname}: {e}")
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(merged, f, indent=2, ensure_ascii=False)
    print(f"[DONE] Merged {total} diseases into {OUTPUT_FILE}")

if __name__ == '__main__':
    main() 