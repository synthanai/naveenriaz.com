import glob
import re

files = glob.glob('src/content/**/*.md', recursive=True)
link_pattern = re.compile(r'\[([^\]]+)\]\(([^\)]+)\)')

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    matches = link_pattern.findall(content)
    for text, url in matches:
        # Check suspicious internal links
        if not url.startswith('http') and not url.startswith('#') and not url.startswith('mailto:'):
            if url.endswith('.md') or not url.startswith('/'):
                print(f"Suspicious link in {fpath}: [{text}]({url})")

