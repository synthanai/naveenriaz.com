import os
import re

d = "src/content/knots/organizations"
files = [f for f in os.listdir(d) if f.endswith(".md")]

fixed = 0

for file in files:
    path = os.path.join(d, file)
    with open(path, "r") as f:
        content = f.read()
    
    parts = re.split(r"^(---[ \t]*\n)", content)
    if len(parts) < 3: continue
    
    start = len(parts[1])
    end = content.find("\n---", start)
    if end == -1: continue
    
    fm = content[start:end]
    body = content[end:]
    
    original_fm = fm
    
    # Fix duplicate untie_implement keys
    # keep the first untie_implement, delete subsequent ones
    lines = fm.split('\n')
    new_lines = []
    seen_keys = set()
    for line in lines:
        m = re.match(r'^([a-z_]+):(.*)$', line)
        if m:
            key = m.group(1)
            # only deduplicate untie_implement or any key that is duplicated that isn't supposed to be
            if key in seen_keys:
                line = f"# DUPLICATE_KEY_REMOVED: {line}"
            seen_keys.add(key)
        new_lines.append(line)
    
    fm = '\n'.join(new_lines)
    
    # Fix never_say syntax error (unescaped single quotes in single quoted strings)
    # The arrays currently look like: never_say: ['we've always been', 'our journey']
    # If the file fails to parse, we can try to fix it.
    def fix_never_say(m):
        inner = m.group(1)
        # Convert internal array from single quotes to double quotes
        # We find chunks like `'something'` and make it `"something"`
        # First we extract everything by splitting on comma, then clean each item.
        items = inner.split(',')
        clean_items = []
        for item in items:
            item = item.strip()
            # If it starts and ends with ', strip them
            if item.startswith("'") and item.endswith("'"):
                val = item[1:-1]
                # escape double quotes inside
                val = val.replace('"', '\\"')
                clean_items.append(f'"{val}"')
            else:
                clean_items.append(item)
        return f"never_say: [{', '.join(clean_items)}]"
        
    fm = re.sub(r'^never_say:\s*\[(.*?)\]$', fix_never_say, fm, flags=re.MULTILINE)
    
    if fm != original_fm:
        with open(path, "w") as f:
            f.write(parts[1] + fm + body)
        print(f"Fixed {file}")
        fixed += 1

print(f"Healed {fixed} files.")
