import os
import glob
import re

files = glob.glob('src/content/**/*.md', recursive=True) + glob.glob('src/content/**/*.mdx', recursive=True)

# Regex to find markdown links pointing to file:///
# Format: [Link Text](file:///Users/...)
link_pattern = re.compile(r'\[([^\]]+)\]\(file:\/\/[^\)]+\)')

total_fixed = 0

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the link with just the link text
    # e.g., "[STEAL on Linas Beliunas](file:///...)" -> "STEAL on Linas Beliunas"
    new_content, count = link_pattern.subn(r'\1', content)
    
    if count > 0:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {count} links in {fpath}")
        total_fixed += count
        
print(f"Total fixed: {total_fixed}")

