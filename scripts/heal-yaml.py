#!/usr/bin/env python3
"""
Comprehensive YAML frontmatter healer for all Knot markdown files.
Uses only stdlib - no external dependencies.
"""
import os
import re
import sys
import json

CONTENT_DIR = "src/content/knots/organizations"

def extract_frontmatter(content):
    """Split a markdown file into frontmatter string and body."""
    m = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if not m:
        return None, content
    return m.group(1), m.group(2)

def is_valid_yaml_line(line):
    """Basic heuristic: does this line look like a valid YAML key: value?"""
    stripped = line.strip()
    if not stripped or stripped.startswith('#'):
        return True
    # Continuation lines (indented)
    if line.startswith('  '):
        return True
    # Must be key: value
    if re.match(r'^[a-z_][a-z0-9_]*:', stripped):
        return True
    return False

def heal_line(line):
    """Fix a single frontmatter line. Returns (fixed_line, description) or (None, None) if unfixable."""
    stripped = line.strip()
    
    # Pattern 1: floating array items (- "some text")
    if re.match(r'^-\s+"', stripped):
        inner = re.sub(r'^-\s+"(.*?)"\'?$', r'\1', stripped)
        inner = inner.replace('\\"', "'").replace("''", "'")
        # Remove trailing truncation markers
        inner = re.sub(r'\.\.\.$', '', inner).strip()
        return f'untie_implement: "{inner}"', "floating array -> untie_implement"
    
    # Pattern 2: bare backslash-escaped quotes (untie_implement: \"text\")
    m = re.match(r'^([a-z_]+):\s+\\"(.*)\\?"\'?\\?"?$', stripped)
    if m:
        key = m.group(1)
        val = m.group(2)
        val = val.replace('\\"', "'").replace("''", "'").replace('\\', '').strip('"').strip("'")
        return f'{key}: "{val}"', f"bare escaped quotes on {key}"
    
    # Pattern 3: values with unbalanced quotes
    m = re.match(r'^([a-z_]+):\s+(.+)$', stripped)
    if m:
        key = m.group(1)
        val = m.group(2)
        # Count quotes
        dq = val.count('"') - val.count('\\"')
        sq = val.count("'") - val.count("\\'")
        if dq % 2 != 0 or sq % 2 != 0:
            # Clean it up: strip all quotes, re-wrap cleanly
            clean = val.strip('"').strip("'").replace('\\"', '"').replace("\\'", "'")
            clean = clean.replace('"', "'")
            return f'{key}: "{clean}"', f"unbalanced quotes on {key}"
    
    return None, None

def heal_file(fpath):
    """Heal a single file. Returns (was_broken, was_fixed, changes)."""
    content = open(fpath, 'r').read()
    fm_str, body = extract_frontmatter(content)
    
    if fm_str is None:
        return False, False, ["No frontmatter"]
    
    lines = fm_str.split('\n')
    new_lines = []
    changes = []
    had_issues = False
    
    for i, line in enumerate(lines):
        if not is_valid_yaml_line(line):
            had_issues = True
            fixed, desc = heal_line(line)
            if fixed:
                new_lines.append(fixed)
                changes.append(f"  L{i+1}: {desc}")
            else:
                # Can't fix, comment it out
                new_lines.append(f"# HEALER_SKIPPED: {line}")
                changes.append(f"  L{i+1}: commented out unfixable line")
        else:
            # Check for subtle issues even in valid-looking lines
            fixed, desc = heal_line(line)
            if fixed and fixed != line:
                new_lines.append(fixed)
                changes.append(f"  L{i+1}: {desc}")
                had_issues = True
            else:
                new_lines.append(line)
    
    if had_issues:
        new_fm = '\n'.join(new_lines)
        new_content = f"---\n{new_fm}\n---\n{body}"
        open(fpath, 'w').write(new_content)
        return True, True, changes
    
    return False, False, []

def main():
    if not os.path.isdir(CONTENT_DIR):
        print(f"ERROR: Directory not found: {CONTENT_DIR}")
        sys.exit(1)
    
    files = sorted([f for f in os.listdir(CONTENT_DIR) if f.endswith('.md') and not f.startswith('_')])
    print(f"\n🔍 Scanning {len(files)} markdown files in {CONTENT_DIR}...\n")
    
    broken = 0
    fixed_count = 0
    
    for fname in files:
        fpath = os.path.join(CONTENT_DIR, fname)
        was_broken, was_fixed, changes = heal_file(fpath)
        if was_broken:
            broken += 1
            if was_fixed:
                fixed_count += 1
                print(f"  ✅ {fname}")
                for c in changes:
                    print(c)
            else:
                print(f"  ❌ {fname}: unfixable")
    
    print(f"\n{'='*60}")
    print(f"📊 Scanned: {len(files)} | Broken: {broken} | Healed: {fixed_count}")

if __name__ == '__main__':
    main()
