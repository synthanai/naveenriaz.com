import re

with open('src/pages/index.astro', 'r') as f:
    text = f.read()

# Remove outer dim-card classes
text = text.replace('class="arch-col dim-card dim-card--mind"', 'class="arch-col"')
text = text.replace('class="arch-col dim-card dim-card--body"', 'class="arch-col"')
text = text.replace('class="arch-col dim-card dim-card--soul"', 'class="arch-col"')
text = text.replace('class="arch-col dim-card dim-card--vibe"', 'class="arch-col"')

# Let's write a function to swap the inner tags with dim-card assignments based on their category
def replace_inner(category, dim_class):
    global text
    # Finding elements under the h3 of the matching category
    # The block structure in index.astro has <a ...> or <div style="display: block; margin-bottom... opacity...">
    # We can just manually target the specific starting tags because we know exactly what they are.
    pass

# Sparks
text = text.replace('<a href="/sparks/" style="text-decoration: none; display: block; margin-bottom: var(--space-lg);">',
                    '<a href="/sparks/" class="dim-card dim-card--mind" style="display: block; margin-bottom: var(--space-md);">')
# Fusions
text = text.replace('<a href="/fusions/" style="text-decoration: none; display: block; margin-bottom: var(--space-lg);">',
                    '<a href="/fusions/" class="dim-card dim-card--mind" style="display: block; margin-bottom: var(--space-md);">')

# Knots
text = text.replace('<a href="/knots/" style="text-decoration: none; display: block; margin-bottom: var(--space-lg);">',
                    '<a href="/knots/" class="dim-card dim-card--body" style="display: block; margin-bottom: var(--space-md);">')
# Beads
text = text.replace('<a href="/beads/" style="text-decoration: none; display: block; margin-bottom: var(--space-lg);">',
                    '<a href="/beads/" class="dim-card dim-card--body" style="display: block; margin-bottom: var(--space-md);">')

# Digs, Wows, Awes, Claws, Syncs, SPARs use a div with opacity
# We have a literal template: <div style="display: block; margin-bottom: var(--space-lg); opacity: 0.7;">
# But they are inside their respective arch-cols. We can just regex replace them based on what follows!

# For Digs
text = re.sub(r'<div style="display: block; margin-bottom: var\(--space-lg\); opacity: 0\.7;">\s*<span class="knots-badge"(.*?)>\s*LONG FORM\s*</span>\s*<strong(.*?)>\s*Digs ',
              r'<div class="dim-card dim-card--body" style="display: block; margin-bottom: var(--space-md); opacity: 0.7;">\n              <span class="knots-badge"\1>LONG FORM</span>\n              <strong\2>\n                Digs ', text)

# For Wows
text = re.sub(r'<div style="display: block; margin-bottom: var\(--space-lg\); opacity: 0\.7;">\s*<span class="knots-badge"(.*?)>\s*SHORT FORM\s*</span>\s*<strong(.*?)>\s*Wows ',
              r'<div class="dim-card dim-card--soul" style="display: block; margin-bottom: var(--space-md); opacity: 0.7;">\n              <span class="knots-badge"\1>SHORT FORM</span>\n              <strong\2>\n                Wows ', text)

# For Awes
text = re.sub(r'<div style="display: block; margin-bottom: var\(--space-lg\); opacity: 0\.7;">\s*<span class="knots-badge"(.*?)>\s*LONG FORM\s*</span>\s*<strong(.*?)>\s*Awes ',
              r'<div class="dim-card dim-card--soul" style="display: block; margin-bottom: var(--space-md); opacity: 0.7;">\n              <span class="knots-badge"\1>LONG FORM</span>\n              <strong\2>\n                Awes ', text)

# For Claws
text = re.sub(r'<div style="display: block; margin-bottom: var\(--space-lg\); opacity: 0\.7;">\s*<span class="knots-badge"(.*?)>\s*LONG FORM\s*</span>\s*<strong(.*?)>\s*Claws ',
              r'<div class="dim-card dim-card--soul" style="display: block; margin-bottom: var(--space-md); opacity: 0.7;">\n              <span class="knots-badge"\1>LONG FORM</span>\n              <strong\2>\n                Claws ', text)

# For Syncs
text = re.sub(r'<div style="display: block; margin-bottom: var\(--space-lg\); opacity: 0\.7;">\s*<span class="knots-badge"(.*?)>\s*SHORT FORM\s*</span>\s*<strong(.*?)>\s*Syncs ',
              r'<div class="dim-card dim-card--vibe" style="display: block; margin-bottom: var(--space-md); opacity: 0.7;">\n              <span class="knots-badge"\1>SHORT FORM</span>\n              <strong\2>\n                Syncs ', text)

# For SPARs
text = re.sub(r'<div style="display: block; margin-bottom: var\(--space-lg\); opacity: 0\.7;">\s*<span class="knots-badge"(.*?)>\s*LONG FORM\s*</span>\s*<strong(.*?)>\s*SPARs ',
              r'<div class="dim-card dim-card--vibe" style="display: block; margin-bottom: var(--space-md); opacity: 0.7;">\n              <span class="knots-badge"\1>LONG FORM</span>\n              <strong\2>\n                SPARs ', text)

with open('src/pages/index.astro', 'w') as f:
    f.write(text)

