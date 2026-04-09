import re

with open('src/pages/index.astro', 'r') as f:
    text = f.read()

# Think
text = text.replace('Raw signal capture (100 words).', 'Raw intelligence capture. Single resonant signals observed from the field, constrained to exactly 108 words.')
text = text.replace('Cross-domain synthesis.', 'Deep, cross-domain synthesis. Where individual sparks and observations collide into structural essays linking philosophy with algorithmic execution.')

# Work
text = text.replace('Friction untangled.', 'The tangled friction observed inside living systems. Diagnostic patterns named, felt, and systematically untangled across the architecture.')
text = text.replace('Hardened tactical wisdom.', 'Tactical interventions and hardened wisdom derived directly from execution. Granular, scalable solutions applied to resolve systemic friction.')
text = text.replace('Heavy literature and org excavation.', 'Heavy literature and organisational excavation. Extracting architectural frameworks and cataloguing deep historical strata from the baseline.')

# Play
text = text.replace('Quick mindset shifts.', 'Catalytic moments and sudden reframes. Documenting the exact \'before\' state, the shifting catalyst, and the final \'after\' perspective.')
text = text.replace('Narrative-heavy emotional arcs.', 'Raw, somatic experiences and narrative-heavy emotional arcs. The lingering echo of witnessing profound elegance and structural beauty.')
text = text.replace('LAWs that become constraints.', 'LAWs that ossify into CLAWs. Examining the rigid constraints, anti-patterns, and legacy forces that actively pull organisations down.')

# Vibe
text = text.replace('Harmonic connections and shared frequencies.', 'Immediate collaborative sparks. Ideas and people that vibrate on the exact same frequency, establishing immediate shared trajectories.')
text = text.replace('Multi-player dialectic debates.', 'Structured friction and dialectic. Multi-player argumentation sessions combining Human and AI personas to rigorously stress-test reasoning.')

with open('src/pages/index.astro', 'w') as f:
    f.write(text)

