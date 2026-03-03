# Collision Editorial Standard v1.0

> **Authority**: SPAR Deep Ultra verdict (2026-03-06, 88% confidence, RAMP L3)
> **Scope**: All articles published under the "Collision" brand on naveenriaz.com

---

## What Is a Collision?

A Collision is an **intellectual event**, not a blog post. Two ideas from different domains crash into each other and produce a new pattern. If there is no crash, it is not a collision.

> "Collision is generative. Transfer is additive."

---

## Step 0: NOOL Scoping (Mandatory)

Every collision begins with a 3-line NOOL. This is the scope anchor. If the writing drifts from this NOOL, it is scope creep, not creativity.

```yaml
collision_nool:
  nokkam: "WHY is this collision being written? What gap does it fill?"
  vadivam: "WHAT TYPE of collision? (Pattern, Contrast, Synthesis, Challenge)"
  sangilai: "HOW will we know this collision succeeded? What should the reader feel/do?"
```

The NOOL lives in the front matter. If you cannot write all three lines, the collision is not ready.

---

## The 6 Non-Negotiables

| # | Constraint | Audit |
|---|-----------|-------|
| **C1** | **NOOL Scope**: 3-line intent statement in front matter | Present / absent |
| **C2** | **Collision Point**: 2-9 ideas from different domains intersect in one or more named paragraphs. The count is determined by the NOOL scope. If you cannot name every colliding idea and the collision paragraph(s), do not publish. | Manual naming test |
| **C3** | **B+ Voice**: Second person, present tense, revelatory, zero em-dashes, <10% passive | Automated scan |
| **C4** | **One Visual**: At least one SVG diagram, metaphor visual, or architecture sketch | Binary: visual present / absent |
| **C5** | **Unresolvable Closing**: Final paragraph poses a question with no single correct answer | Does the question have a "right" answer? If yes, rewrite |
| **C6** | **One Bridge**: Exactly one link to a deeper SYNTHAI artifact (ebook, book, SPAR, research) | Binary: link present / absent |

**Kill Criterion**: If C2 fails (cannot name every colliding idea and the collision paragraph), reclassify as a note or draft. Do not publish under the Collision brand.

---

## Voice Profile

| Dimension | Specification |
|-----------|---------------|
| **Persona** | The Transmuter (Pattern Connector). Not teacher, not expert, not guru. |
| **Register** | Practitioner-provocateur. Between academic and casual. Opinionated, grounded. |
| **Person** | Second person ("you"), present tense |
| **Sentences** | 12-22 words avg. One idea per sentence. Rhythmic variation. |
| **Paragraphs** | 2-4 sentences. Never more than 5. |
| **Opening** | First sentence creates a gap. No throat-clearing, no context-setting. |
| **Closing** | Unresolvable question the reader carries beyond the article. |

### Signature Moves (use ≥3 per collision)

1. Cross-domain pattern connection (the collision itself)
2. Anti-pattern table (Old Way / New Way)
3. "What if you could see..." revelatory reframe
4. One-line distillation after complexity
5. Tamil cultural anchor (optional, when organic)

---

## Vocabulary Tiers

| Tier | Definition | Usage |
|------|-----------|-------|
| **T1** (Accessible) | No SYNTHAI jargon. General practitioner language. | ≥80% of article |
| **T2** (Bridge) | 1-2 SYNTHAI concepts with inline parenthetical definition | Max 2 per collision |
| **T3** (Ecosystem) | Full SYNTHAI vocabulary (ORBIT, NEBULA, etc.) | Internal collisions only |

**Tamil Terms**: One per collision when organic. Format: *English concept* (Tamil, தமிழ்). Omit when forced.

---

## Collision Arc (Semi-Flexible)

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  1. FAMILIAR GROUND     "Yes, I know this..."           │
│         │                                               │
│         ▼                                               │
│  2. COUNTER-SIGNAL      "Wait, that data says..."       │
│         │                                               │
│         ▼                                               │
│  3. 💥 COLLISION POINT   2-9 ideas crash. Name them.    │  ← MANDATORY
│         │                                               │
│         ▼                                               │
│  4. NEW PATTERN          What emerges. Implications.    │
│         │                                               │
│         ▼                                               │
│  5. OPEN QUESTION        Unresolvable. Carried forward. │  ← MANDATORY
│                                                         │
└─────────────────────────────────────────────────────────┘
```

Sections 1, 2, 4 are recommended but flexible. Sections 3 and 5 are mandatory.

---

## Visual Standard

Every collision includes **at least one visual element**:

| Visual Type | When to Use | Format |
|-------------|-------------|--------|
| **Architecture SVG** | Showing system relationships, layers, flows | Inline SVG or linked SVG file |
| **Metaphor Diagram** | Making an abstract concept tangible | SVG with metaphor-driven imagery |
| **Contrast Table** | Old Way vs New Way anti-patterns | Markdown table with colour-coded classes |
| **Collision Diagram** | Showing the two ideas intersecting | SVG with two domains converging |

SVGs should use the SYNTHAI design tokens (Mind blue `#2874A6`, Body green `#27AE60`, Soul gold `#D4A843`).

---

## Readability Targets

| Metric | Target |
|--------|--------|
| Flesch-Kincaid Grade | 9-10 |
| Word count | 600-1,200 |
| Sections | 4-6 |
| Reading time | 3-5 minutes |
| Production time | ~2 hours (signal → published) |

---

## Quality Gates (6-Point Audit)

| # | Gate | Pass Criteria |
|---|------|---------------|
| G1 | **NOOL** | 3-line scope statement present in front matter |
| G2 | **Voice** | Zero em-dashes, <10% passive, second person present tense |
| G3 | **Length** | 600-1,200 words |
| G4 | **Collision** | Can name 2 colliding ideas and the collision paragraph |
| G5 | **Visual** | At least 1 SVG/diagram/metaphor visual present |
| G6 | **Three Tests** | Aloud: not flat. Delete: nothing removable. Stranger: feels something. |

---

## Collision Types

| Type | Audience | Vocab | Frequency |
|------|----------|-------|-----------|
| **Public** | External practitioners, strategists | Tier 2 | Weekly target |
| **Internal** | SYNTHAI ecosystem followers | Tier 3 | Ad-hoc |

---

## Funnel Integration

| Output | Extraction |
|--------|-----------|
| **3 Social Hooks** | Statement, Question, Contrast variants. Generated during writing, not after. |
| **Newsletter Entry** | Title + one-sentence collision statement + link |
| **Ebook Bridge** | The Bridge link (C6) connects to deeper content |

---

## Front Matter Template

```yaml
---
title: "[Title]"
date: YYYY-MM-DD
categories: ["series-name"]
tags: ["tag1", "tag2"]
description: "[150 chars max]"
source_research: "[path to research.md]"
collision_type: "public"                    # or "internal"
collision_nool:
  nokkam: "[WHY this collision]"
  vadivam: "[WHAT TYPE: Pattern | Contrast | Synthesis | Challenge]"
  sangilai: "[SUCCESS SIGNAL: what reader feels/does]"
collision_point:               # 2-9 ideas, scaled to NOOL scope
  ideas:
    - "[First domain/idea]"
    - "[Second domain/idea]"
    # add up to 9 total
---
```

---

*SPAR Deep Ultra Verdict | 2026-03-06 | Confidence: 88% | RAMP: L3*
