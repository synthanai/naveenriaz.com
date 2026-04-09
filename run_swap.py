import re

with open('src/pages/index.astro', 'r') as f:
    text = f.read()

# I will extract the blocks using regex.

# 1. Extract the Beads block
beads_match = re.search(r'(<a href="/beads/" class="dim-card dim-card--body".*?</a>)', text, re.DOTALL)
if not beads_match:
    print("Could not find Beads")
beads_block = beads_match.group(1)

# 2. Extract the Claws block
claws_match = re.search(r'(<div class="dim-card dim-card--soul"[^>]*>.*?Claws.*?</div>\n)', text, re.DOTALL)
if not claws_match:
    print("Could not find Claws")
claws_block = claws_match.group(1)

# Alter them to fit their new domains
new_beads = beads_block.replace('dim-card--body', 'dim-card--soul')
new_claws = claws_block.replace('dim-card--soul', 'dim-card--body')

# Remove the old blocks from the text
text = text.replace(beads_block + '\n', '')
text = text.replace(beads_block, '') # fallback
text = text.replace(claws_block, '')

# We now need to insert new_claws into Work, right before Digs
# Work has: Knots, Digs. We will insert new_claws after Knots.
# Find Knots end
knots_end = text.find('</a>', text.find('<a href="/knots/"')) + 4
text = text[:knots_end] + '\n            ' + new_claws + text[knots_end:]

# Insert new_beads into Play, right after Awes
awes_end = text.find('</div>', text.find('Awes ')) + 6
text = text[:awes_end] + '\n            ' + new_beads + text[awes_end:]

with open('src/pages/index.astro', 'w') as f:
    f.write(text)

print("Done swapping in index.astro")
