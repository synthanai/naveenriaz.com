import os
import glob
import re

files = glob.glob('src/**/*.md', recursive=True) + glob.glob('src/**/*.astro', recursive=True)

broken_patterns = [
    r'\[.*?\]\((.*?)\)',  # Markdown links
    r'<a\s+(?:[^>]*?\s+)?href=["\'](.*?)["\']',  # HTML links
]

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if 'SOURCE' in line.upper() or 'SYNTHAI' in line.upper():
            if '(' in line or 'href=' in line or '[' in line:
                print(f"{fpath}:{i+1}: {line.strip()}")

