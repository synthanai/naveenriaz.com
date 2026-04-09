import os
import glob
import re

files = glob.glob('src/content/fusions/*.md')
for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the headers
    # Matches "## 💥 The Collision Point", "## 💥 The Collision", "## The Collision Point"
    # and variations (like case, or different spacing)
    new_content = re.sub(
        r'##\s*(?:💥\s*)?The Collision(?: Point)?',
        r'## ⚛️ The Fusion',
        content,
        flags=re.IGNORECASE
    )
    
    # Also replace any stray "Collision Point" if it is meant to be Fusion? The user only specifically mentioned "The Collision in the content! we need to replace with proper icon and The Fusion". Which refers to the header heading.
    
    if new_content != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {fpath}")

