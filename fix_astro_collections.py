import os
import textwrap

base = '/Users/naveen/workspace/synthai-master-repo/repos/naveenriaz.com/src/content'

collections = {
    'claws': """---
title: "Agentic Execution Claw"
grip: "The problem getting gripped."
release: "The resulting release."
resonance: "Medium"
date: 2026-04-09
---

The first Claw will be deployed here shortly.
""",
    'spars': """---
title: "First SPAR"
description: "Placeholder for upcoming SPARs"
date: 2026-04-09
---

The first SPAR will be unsealed here shortly.
""",
    'syncs': """---
title: "First Sync"
essence: "Harmonic convergence"
date: 2026-04-09
---

Coming Soon.
""",
    'digs': """---
title: "First Dig"
essence: "Deep excavation"
date: 2026-04-09
---

Coming Soon.
""",
    'wows': """---
title: "First Wow"
essence: "Wonder and awe"
date: 2026-04-09
---

Coming Soon.
""",
    'awes': """---
title: "First Awe"
essence: "Awe-inspiring moments"
date: 2026-04-09
---

Coming Soon.
""",
    'queues': """---
title: "First Queue"
date: 2026-04-09
---

Coming Soon.
""",
}

for col, content in collections.items():
    dir_path = os.path.join(base, col)
    os.makedirs(dir_path, exist_ok=True)
    file_path = os.path.join(dir_path, 'placeholder.md')
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

