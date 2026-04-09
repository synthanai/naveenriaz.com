import re

with open('src/pages/index.astro', 'r') as f:
    text = f.read()

# We can rebuild the Work and Play columns using literal strings to avoid any regex issues this time.

# Find the start of Work and start of Vibe
start_work = text.find('<div class="arch-col">\n            <h3 style="color: var(--body-color)')
start_vibe = text.find('<div class="arch-col">\n            <h3 style="color: var(--vibe-color)')

replacement = """<div class="arch-col">
            <h3 style="color: var(--body-color); font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: var(--space-md);">Work</h3>
            <a href="/knots/" class="dim-card dim-card--body" style="display: block; margin-bottom: var(--space-md);">
              <span class="knots-badge" style="color: var(--text-muted); font-size: 0.55rem;">SHORT FORM</span>
              <strong style="color: var(--text-primary); display: block; font-size: 1.1rem; margin-top: 4px;">Knots</strong>
              <span style="color: var(--text-secondary); font-size: 0.85rem; display: block; margin-top: 4px;">The tangled friction observed inside living systems. Diagnostic patterns named, felt, and systematically untangled across the architecture.</span>
            </a>
            <div class="dim-card dim-card--body" style="display: block; margin-bottom: var(--space-md); opacity: 0.7;">
              <span class="knots-badge" style="color: var(--text-muted); font-size: 0.55rem;">LONG FORM</span>
              <strong style="color: var(--text-primary); display: flex; align-items: center; gap: 8px; font-size: 1.1rem; margin-top: 4px;">
                Claws <span class="knots-badge" style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">COMING SOON</span>
              </strong>
              <span style="color: var(--text-secondary); font-size: 0.85rem; display: block; margin-top: 4px;">LAWs that ossify into CLAWs. Examining the rigid constraints, anti-patterns, and legacy forces that actively pull organisations down.</span>
            </div>
            <div class="dim-card dim-card--body" style="display: block; margin-bottom: var(--space-md); opacity: 0.7;">
              <span class="knots-badge" style="color: var(--text-muted); font-size: 0.55rem;">LONG FORM</span>
              <strong style="color: var(--text-primary); display: flex; align-items: center; gap: 8px; font-size: 1.1rem; margin-top: 4px;">
                Digs <span class="knots-badge" style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">COMING SOON</span>
              </strong>
              <span style="color: var(--text-secondary); font-size: 0.85rem; display: block; margin-top: 4px;">Heavy literature and organisational excavation. Extracting architectural frameworks and cataloguing deep historical strata from the baseline.</span>
            </div>
          </div>

          <div class="arch-col">
            <h3 style="color: var(--soul-color); font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: var(--space-md);">Play</h3>
            <div class="dim-card dim-card--soul" style="display: block; margin-bottom: var(--space-md); opacity: 0.7;">
              <span class="knots-badge" style="color: var(--text-muted); font-size: 0.55rem;">SHORT FORM</span>
              <strong style="color: var(--text-primary); display: flex; align-items: center; gap: 8px; font-size: 1.1rem; margin-top: 4px;">
                Wows <span class="knots-badge" style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">COMING SOON</span>
              </strong>
              <span style="color: var(--text-secondary); font-size: 0.85rem; display: block; margin-top: 4px;">Catalytic moments and sudden reframes. Documenting the exact 'before' state, the shifting catalyst, and the final 'after' perspective.</span>
            </div>
            <div class="dim-card dim-card--soul" style="display: block; margin-bottom: var(--space-md); opacity: 0.7;">
              <span class="knots-badge" style="color: var(--text-muted); font-size: 0.55rem;">LONG FORM</span>
              <strong style="color: var(--text-primary); display: flex; align-items: center; gap: 8px; font-size: 1.1rem; margin-top: 4px;">
                Awes <span class="knots-badge" style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">COMING SOON</span>
              </strong>
              <span style="color: var(--text-secondary); font-size: 0.85rem; display: block; margin-top: 4px;">Raw, somatic experiences and narrative-heavy emotional arcs. The lingering echo of witnessing profound elegance and structural beauty.</span>
            </div>
            <a href="/beads/" class="dim-card dim-card--soul" style="display: block; margin-bottom: var(--space-md);">
              <span class="knots-badge" style="color: var(--text-muted); font-size: 0.55rem;">LONG FORM</span>
              <strong style="color: var(--text-primary); display: block; font-size: 1.1rem; margin-top: 4px;">Beads</strong>
              <span style="color: var(--text-secondary); font-size: 0.85rem; display: block; margin-top: 4px;">Tactical interventions and hardened wisdom derived directly from execution. Granular, scalable solutions applied to resolve systemic friction.</span>
            </a>
          </div>\n\n          """

text = text[:start_work] + replacement + text[start_vibe:]

with open('src/pages/index.astro', 'w') as f:
    f.write(text)

print("Done resetting dom text")
