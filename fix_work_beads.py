import re

with open('src/pages/work.astro', 'r') as f:
    text = f.read()

# 1. Remove the getCollection logic
text = re.sub(
    r'const beads = await getCollection\("beads"\);\nconst sortedBeads = beads\.sort\(\n  \(a, b\) => b\.data\.date\.valueOf\(\) - a\.data\.date\.valueOf\(\),\n\);\n',
    '',
    text
)

# 2. Remove the beads-grid css block
text = re.sub(
    r'\s*\.beads-grid \{[\s\S]*?\}\s*\.bead-card \{[\s\S]*?\}\s*\.bead-card:hover \{[\s\S]*?\}\s*\.bead-pattern \{[\s\S]*?\}\s*\.bead-card h3 \{[\s\S]*?\}\s*\.bead-essence \{[\s\S]*?\}\s*\.bead-resonance \{[\s\S]*?\}\s*\.bead-resonance \.label \{[\s\S]*?\}\s*\.bead-origin \{[\s\S]*?\}\s*\.bead-origin a \{[\s\S]*?\}',
    '',
    text
)

# 3. Replace the beads-grid rendering with Browse All Beads button
beads_grid_html = r'''        <div class="beads-grid">[\s\S]*?        </div>'''
replacement = r'''        <div class="proof-links">
          <a href="/beads/" class="btn">Browse All Beads →</a>
        </div>'''
text = re.sub(beads_grid_html, replacement, text)

with open('src/pages/work.astro', 'w') as f:
    f.write(text)

