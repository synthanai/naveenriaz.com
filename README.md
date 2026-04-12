<p align="center">
  <img src="public/logo.svg" width="80" alt="naveenriaz.com logo" />
</p>

<h1 align="center">naveenriaz.com</h1>

<p align="center">
  <strong>Where ancient patterns collide with emergent intelligence.</strong>
</p>

<p align="center">
  <a href="https://naveenriaz.com">Live Site</a> · 
  <a href="#architecture">Architecture</a> · 
  <a href="#content-architecture-primitives">Primitives</a> · 
  <a href="#license">License</a>
</p>

---

## The Idea

Most personal sites organise by format: blog, portfolio, about.

This one organises by **dimension of thought**:

```
         Play
        ╱    ╲         ← Why I Live (Soul)
       ╱  ஃ   ╲
      ╱________╲
   Think      Work     ← How I Think (Mind) · What I Build (Body)
```

**Think** is where frameworks live: [SPAR](https://naveenriaz.com/spars) (structured multi-persona deliberation), [STEAL](https://naveenriaz.com/sparks) (intelligence capture), [CODEX](https://naveenriaz.com/think) (cognitive architecture).

**Work** is proof: books, papers, tools, shipped things. Three layers: what I aspire to build (Soul), what my mind is cooking (Mind), what has shipped (Body).

**Play** is the fire underneath: Tamil roots, philosophical detours, origin stories, [CORE identity](https://naveenriaz.com/play) (Calling, Origin, Reason, Endurance).

**Vibe** is the invitation: speaking, consulting, coaching. "Every engagement starts the same way: a conversation."

The ஃ (Ayudha Ezhuthu) at the centre is the Tamil vowel that connects all three dots.

## Content Architecture (Primitives)

Think of a **Primitive** as a specialized container for an idea. Instead of dumping every thought into a generic "blog post", intelligence goes into specialized atomic shapes based on depth (Short/Long) and dimension (Think, Work, Play, Vibe).

| Primitive | Dimension | Length | Layman Definition |
| :--- | :--- | :--- | :--- |
| **Spark** | Think (Mind) | Short | Compressed field captures. Signals that excite, disturb, or destabilise. |
| **Fusion** | Think (Mind) | Long | Cross-domain collision. Where multiple signals fuse into structural essays. |
| **Claw** | Think (Mind) | Long | Rules that ossified into traps. Legacy constraints and anti-patterns. |
| **Knot** | Work (Body) | Short | Systemic friction named and felt. Diagnostic patterns inside living systems. |
| **Bead** | Work (Body) | Long | Earned tactical wisdom. Solutions that work now because something failed first. |
| **Dig** | Work (Body) | Long | Deep excavation into history and literature to extract useful frameworks. |
| **Wow** | Play (Soul) | Short | Sudden reframes. The moment understanding shifted toward delight or disillusionment. |
| **Awe** | Play (Soul) | Long | Deep witness. Beauty, grief, or seeing something profoundly well-made. |
| **Ashes** | Play (Soul) | Short | Acknowledgment without conclusion. Something that ended or had to let burn. |
| **Sync** | Vibe (Resonance) | Short | Immediate resonance. The moment two systems vibrated together, or the static before. |
| **SPAR** | Vibe (Resonance) | Long | Structured friction. Multi-player deliberation that stress-tests reasoning. |
| **Void** | Vibe (Resonance) | Short/Long | The explicit absence of resonance. Immunological boundaries and severed connections. |

### Experiences

The primitives form a dynamic neural network mapping how intelligence flows across canonical human experiences:

1. **The System Failure:** `Knot → Claw → Bead` (From diagnostic friction to legacy constraint to earned wisdom)
2. **The Obsession:** `Spark → Dig → Fusion` (Tracking external signals to historical roots and forming structural essays)
3. **The Intellectual Collision:** `Sync → SPAR → Wow → Fusion` (Mindset shifts via high-friction dialectic interactions)
4. **The Intervention:** `Bead → SPAR → Knot` (Applying established value to unravel specific tangles)
5. **The Metabolic Life:** (Ouroboros) Traversing every node in a biological lifecycle representing continuous adaptation.

## Architecture

```text
src/
├── components/         Astro components (Header, Footer, layour specific chunks)
├── content/            The 12 Primitive collections
│   ├── ashes/
│   ├── awes/
│   ├── beads/
│   ├── claws/
│   ├── digs/
│   ├── fusions/
│   ├── knots/
│   ├── sparks/
│   ├── spars/
│   ├── syncs/
│   ├── voids/
│   └── wows/
├── data/               JSON data (pulse, concepts, arena SPARs)
├── layouts/            Base + Page layouts
├── pages/              Pages across Think / Work / Play / Vibe and individual primitives
└── styles/
    ├── brand-tokens.css  Design system tokens (MBS color palette)
    └── global.css        Global styles
```

**Stack**: [Astro](https://astro.build) (static-first, zero JS by default) · Custom CSS (no Tailwind) · TypeScript content schemas

**Design**: SYNTHAI Parchment (dark-mode-first, ancient warmth meets digital precision)

**Data**: Live ecosystem pulse directly generated from source (*Note: README metrics are approximate. Live site shows ~35 repos, 1500+ commits, and 20 KIs.*)

## Tamil Roots

Every dimension has a Tamil root word, a Thirukkural verse, and a transliteration. This is not decoration. The Tamil language has 2000+ years of philosophical vocabulary that modern English lacks.

| Dimension | Tamil | Meaning |
|-----------|-------|---------|
| Think | சிந்தனை (Sinthanai) | Disciplined examination through friction |
| Work | செயல் (Seyal) | Action: the bridge between insight and impact |
| Play | ஆன்மா (Aanma) | Soul: the uncodifiable remainder |
| Vibe | ஒத்திசை (Othisai) | Resonance: when two systems vibrate at the same frequency |

## Development

```bash
npm install
npm run dev      # Dev server at localhost:4321
npm run build    # Static build to dist/
```

## Not Accepting Contributions

This is a personal knowledge platform. You're welcome to clone, fork, learn from the code, and be inspired by the architecture. Pull requests are not accepted. If you spot a bug, open an issue.

## License

[MIT](LICENSE)

---

<p align="center">
  <em>Every organisation is alive. Nurture its Mind, Body & Soul. Watch the Aura thrive!</em>
</p>
