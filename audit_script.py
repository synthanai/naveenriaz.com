import os
import re

scan_dir = "/Users/naveen/workspace/synthai-master-repo/repos/naveenriaz.com"
ignore_paths = {'.git', 'node_modules', 'dist', '.astro'}

terms = {
    'em-dash': re.compile(r'—'),
    'ashes': re.compile(r'\bashes\b', re.IGNORECASE),
    'codex': re.compile(r'\bcodex\b', re.IGNORECASE),
    'primitive': re.compile(r'\bprimitives?\b', re.IGNORECASE),
    'torus': re.compile(r'\btorus\b', re.IGNORECASE),
    'moment': re.compile(r'\bmoments?\b', re.IGNORECASE),
    'atom': re.compile(r'\batoms?\b', re.IGNORECASE)
}

results = {k: [] for k in terms.keys()}

for root, dirs, files in os.walk(scan_dir):
    dirs[:] = [d for d in dirs if d not in ignore_paths]
    for name in files:
        if name.endswith(('.md', '.ts', '.astro', '.json', '.yaml', '.yml', '.mdx')):
            filepath = os.path.join(root, name)
            try:
                with open(filepath, 'r') as f:
                    lines = f.readlines()
                for i, line in enumerate(lines):
                    for key, regex in terms.items():
                        if regex.search(line):
                            results[key].append(f"{os.path.relpath(filepath, scan_dir)}:{i+1}")
            except Exception:
                pass

with open("audit_results.txt", "w") as f:
    for key, hits in results.items():
        f.write(f"=== {key.upper()} ({len(hits)} hits) ===\n")
        f.write("\n".join(hits[:50])) # Limit output
        f.write("\n\n")

print("Audit completed. Wrote to audit_results.txt.")
