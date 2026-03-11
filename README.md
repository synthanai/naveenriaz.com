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
  <a href="#collisions">Collisions</a> · 
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

**Think** is where frameworks live: [SPAR](https://naveenriaz.com/think/spar/) (structured multi-persona deliberation), [STEAL](https://naveenriaz.com/think/steal/) (intelligence capture), [CODEX](https://naveenriaz.com/think/codex/) (cognitive architecture).

**Work** is proof: books, papers, tools, shipped things. Three layers: what I aspire to build (Soul), what my mind is cooking (Mind), what has shipped (Body).

**Play** is the fire underneath: Tamil roots, philosophical detours, origin stories, [CORE identity](https://naveenriaz.com/play/core/) (Calling, Origin, Reason, Endurance).

**Vibe** is the invitation: speaking, consulting, coaching. "Every engagement starts the same way: a conversation."

The ஃ (Ayudha Ezhuthu) at the centre is the Tamil vowel that connects all three dots.

## Collisions

A **Collision** is an intellectual event, not a blog post. Two ideas from different domains crash into each other and produce a new pattern. If there is no crash, it is not a collision.

Every collision follows a NOOL (reasoning thread):

```yaml
collision_nool:
  nokkam: "WHY is this collision being written?"   # Intent
  vadivam: "WHAT TYPE of collision?"                # Abstraction
  sangilai: "HOW will we know it succeeded?"        # Chain
```

| Collision | Ideas That Crashed |
|-----------|-------------------|
| [Intent of Thought](src/content/collisions/intent-of-thought.md) | BDI agent theory (1990) × XoT reasoning topologies (2025) |
| [The $1 Notebook](src/content/collisions/the-one-dollar-notebook.md) | Handwriting as cognitive tool × SPAR deliberation × Purpose Amnesia |
| [Architecture Is the Moat](src/content/collisions/architecture-is-the-moat.md) | Three independent practitioners converging on the same insight |
| [The Three Fatigues](src/content/collisions/fatigue-paradox.md) | AI Fatigue × Decision Fatigue × Judgement Fatigue (MBS spiral) |

## Architecture

```
src/
├── components/         11 Astro components
│   ├── CollisionGate   Weekly provocative question
│   ├── TamilRoot       Tamil script with transliteration + Kural wisdom
│   ├── ConstellationGraph  Interactive concept network
│   ├── PulseMetrics    Live ecosystem dashboard
│   ├── PatternCard     Reusable content cards
│   └── ...
├── content/
│   └── collisions/     Markdown content collection (Collision articles)
├── data/               JSON data (pulse, concepts, arena SPARs)
├── layouts/            Base + Page layouts
├── pages/              28 pages across Think / Work / Play / Vibe
└── styles/
    ├── brand-tokens.css  Design system tokens (MBS color palette)
    └── global.css        Global styles
```

**Stack**: [Astro](https://astro.build) (static-first, zero JS by default) · Custom CSS (no Tailwind) · TypeScript content schemas

**Design**: SYNTHAI Parchment (dark-mode-first, ancient warmth meets digital precision)

**Data**: Live ecosystem pulse generated from 24 repos, 1000+ commits, 19 knowledge items

## Tamil Roots

Every dimension has a Tamil root word, a Thirukkural verse, and a transliteration. This is not decoration. The Tamil language has 2000+ years of philosophical vocabulary that modern English lacks.

| Dimension | Tamil | Meaning |
|-----------|-------|---------|
| Think | சிந்தனை (Sinthanai) | Disciplined examination through friction |
| Work | செயல் (Seyal) | Action: the bridge between insight and impact |
| Play | ஆன்மா (Aanma) | Soul: the uncodifiable remainder |
| Vibe | ஒலுக்கம் (Olukkam) | Resonance: when two systems vibrate at the same frequency |

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
  <em>Every organisation is alive. Nurture its Mind, Body & Soul. Watch it thrive.</em>
</p>
