import os
import re

scan_dir = "/Users/naveen/workspace/synthai-master-repo/repos/naveenriaz.com"
ignore_paths = {'.git', 'node_modules', 'dist', '.astro'}

def replace_in_file(filepath):
    if "pulse.json" in filepath:
        return
        
    try:
        with open(filepath, 'r') as f:
            content = f.read()
    except Exception:
        return

    original_content = content

    # Em-Dashes (Specific to NOOL.md and LOON.md or everywhere)
    # The rule is site-wide: "No em-dashes. Use commas, colons, or parentheses instead"
    # We will safely replace em-dash with " - "
    content = content.replace(" — ", " - ")
    content = content.replace("—", " - ")

    # CODEX -> TORUS (case sensitive)
    content = re.sub(r'\bCODEX\b', 'TORUS', content)
    content = re.sub(r'\bCodex\b', 'Torus', content)
    content = re.sub(r'\bcodex\b', 'torus', content)

    # Primitive -> Moment
    content = re.sub(r'\bPrimitives\b', 'Moments', content)
    content = re.sub(r'\bprimitives\b', 'moments', content)
    content = re.sub(r'\bPrimitive\b', 'Moment', content)
    content = re.sub(r'\bprimitive\b', 'moment', content)

    # Atom -> Moment
    # Be careful not to replace something like Atomic if not asked, only Atom(s)
    content = re.sub(r'\bAtoms\b', 'Moments', content)
    content = re.sub(r'\batoms\b', 'moments', content)
    content = re.sub(r'\bAtom\b', 'Moment', content)
    content = re.sub(r'\batom\b', 'moment', content)

    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {os.path.relpath(filepath, scan_dir)}")

for root, dirs, files in os.walk(scan_dir):
    dirs[:] = [d for d in dirs if d not in ignore_paths]
    for name in files:
        if name.endswith(('.md', '.ts', '.astro', '.json', '.yaml', '.yml', '.mdx')):
            replace_in_file(os.path.join(root, name))

print("Replacement complete.")
