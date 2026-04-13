import os, re

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
    
    # Fix double-double quotes at end of line
    new_fm = re.sub(r'""$', '"', fm, flags=re.MULTILINE)
    
    # Fix never_say stringified arrays
    def fix_never_say(m):
        inner = m.group(1)
        # We need to change 'something' to "something" and handle escaped inner '
        # The string might look like: 'we\'re both', 'it depends'
        # Safest way without a full AST is to replace surrounding ' with ", but keep internal
        # Actually it's easier to just use standard yaml array syntax with single quotes if we want, but Astro zod string validation might be picky?
        # Astro expects string[]. So let's just make it a clean array.
        # Actually, replacing `'([^']*)'` can break words like `founder's`. Let's just restore the inner array without the outer quotes!
        # never_say: "['foo', 'bar']" -> never_say: ['foo', 'bar']
        return f"never_say: [{inner}]"
        
    new_fm = re.sub(r'^never_say:\s*"\[(.*?)\]".*$', fix_never_say, new_fm, flags=re.MULTILINE)
    
    if new_fm != fm:
        with open(path, "w") as f:
            f.write(parts[1] + new_fm + body)
        print(f"Fixed {file}")
        fixed += 1

print(f"Healed {fixed} knots files.")

# Also fix the-founders-ghost.md in sparks
spark_file = "src/content/sparks/the-founders-ghost.md"
if os.path.exists(spark_file):
    with open(spark_file, "r") as f:
        c = f.read()
    
    # Replace anything that isn't one of the FIRE emojis with "🔥"
    new_c = re.sub(r'^temperature:\s*(?!["\']?(?:🔥|🔥🔥|🔥🔥🔥)["\']?).*$', 'temperature: "🔥"', c, flags=re.MULTILINE)
    if c != new_c:
        with open(spark_file, "w") as f:
            f.write(new_c)
        print("Fixed sparks/the-founders-ghost.md schema error")
