---
title: "AI Engineering Disciplines: Prompt → Context → Harness → Intent"
display_title: "AI Engineering Disciplines"
display_subtitle: "Four layers of directing AI systems. Most teams are stuck on the first. The competitive edge lives on the fourth."
date: 2026-04-15
categories: ["ai-emergence"]
tags: [prompt_engineering, context_engineering, harness_engineering, intent_engineering, agentic_systems, ai_architecture, living_organisations]
description: "The evolution from prompt engineering to intent engineering, mapped as four ascending disciplines that determine how effectively humans direct AI systems."
source_research: "concepts/prompt-driven-architecture/research.md"
fusion_type: "public"
fusion_nool:
  nokkam: "Reveal that the AI engineering discipline is evolving through four distinct layers, each absorbing its predecessor, and that most teams are stuck on layer one while the competitive edge lives on layer four"
  vadivam: "Pattern: evolutionary maturity model (Prompt → Context → Harness → Intent) mapped to capability layers (Body → Mind → Soul)"
  sangilai: "Reader identifies which layer they currently operate on, recognises the gap, and gains vocabulary to articulate what their org needs next"
fusion_point:
  ideas:
    - "Prompt Engineering as instruction craft (the solved layer)"
    - "Context Engineering as information architecture for attention budgets"
    - "Harness Engineering as the scaffolding, feedback, and constraint system surrounding agents"
    - "Intent Engineering as purpose-driven governance that lets systems self-direct toward outcomes"
quote_top: Four layers. One question at each. Your ceiling is the question you haven't learned to ask.
quote_bottom: The discipline that matters most is the one you can't see yet.
origin_nodes: []
valence: "provocative"
friction: ""
status: pending
custom_comment: "Most teams think prompt engineering is the ceiling. It's the ground floor of a four-story building. [LINK]"
---

# AI Engineering Disciplines

You know how to write a good prompt. You've probably moved beyond "act as an expert" and into structured system prompts with role definitions, output constraints, and chain-of-thought instructions. You might even version-control your prompts.

That puts you ahead of 80% of the field. It also puts you on the first floor of a four-story building.

## Familiar Ground

The AI engineering conversation in 2024 was dominated by a single discipline: prompt engineering. Write better prompts, get better outputs. The advice was tactical: be specific, provide examples, use delimiters, assign a role. Entire courses and certifications emerged around the skill of phrasing instructions to language models.

It worked. For simple, single-turn tasks, it still works beautifully.

But production systems are not single-turn tasks. Autonomous agents run multi-step workflows over hours or days. They orchestrate tool calls, manage state, recover from errors, and coordinate with other agents. In that world, the quality of your prompt matters about as much as the quality of your steering wheel matters to a city's traffic system. It is necessary. It is nowhere near sufficient.

## Counter-Signal

Here is what changed: the industry discovered that most production AI failures are not prompt failures. They are context failures, infrastructure failures, and alignment failures.

A perfectly phrased prompt directed at a model that has the wrong information in its context window produces confident, well-structured hallucinations. An agent with brilliant prompts and perfect context but no feedback loop drifts off course at step nine of a fifteen-step workflow and delivers polished garbage. A system that solves the right problem with perfect execution but optimises for the wrong outcome is the most dangerous of all, because it looks correct until the damage compounds.

Three different failure modes. Three different disciplines required to address them. The field is waking up to a progression that was always implicit but never named as a unified sequence.

## ⚛️ The Fusion

Four ideas crash here:

**Prompt Engineering** (how you phrase instructions), **Context Engineering** (how you curate what the model sees), **Harness Engineering** (how you build the system around the model), and **Intent Engineering** (how you define what the system should achieve and why).

These are not four unrelated skills. They are four evolutionary layers, each one absorbing and transcending its predecessor. Each answers a deeper question about how humans direct AI systems:

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" role="img" aria-label="The Four Layers of AI Engineering: an ascending staircase from Prompt Engineering at the base to Intent Engineering at the peak">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0f1a;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#1a1f2e;stop-opacity:1"/>
    </linearGradient>
    <linearGradient id="step1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#3498DB;stop-opacity:0.9"/>
      <stop offset="100%" style="stop-color:#2874A6;stop-opacity:0.9"/>
    </linearGradient>
    <linearGradient id="step2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#27AE60;stop-opacity:0.9"/>
      <stop offset="100%" style="stop-color:#1E8449;stop-opacity:0.9"/>
    </linearGradient>
    <linearGradient id="step3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#E67E22;stop-opacity:0.9"/>
      <stop offset="100%" style="stop-color:#CA6F1E;stop-opacity:0.9"/>
    </linearGradient>
    <linearGradient id="step4" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#D4A843;stop-opacity:0.9"/>
      <stop offset="100%" style="stop-color:#B8860B;stop-opacity:0.9"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="800" height="500" fill="url(#bg-grad)" rx="12"/>
  <text x="400" y="40" text-anchor="middle" fill="#ffffff" font-family="Inter,system-ui,sans-serif" font-size="18" font-weight="700" letter-spacing="0.5">THE FOUR LAYERS OF AI ENGINEERING</text>
  <!-- Step 1: Prompt -->
  <rect x="60" y="370" width="170" height="90" rx="8" fill="url(#step1)" filter="url(#glow)"/>
  <text x="145" y="400" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif" font-size="13" font-weight="700">PROMPT</text>
  <text x="145" y="418" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif" font-size="11" opacity="0.9">ENGINEERING</text>
  <text x="145" y="445" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif" font-size="10" opacity="0.7">"How do I phrase this?"</text>
  <!-- Step 2: Context -->
  <rect x="240" y="280" width="170" height="90" rx="8" fill="url(#step2)" filter="url(#glow)"/>
  <text x="325" y="310" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif" font-size="13" font-weight="700">CONTEXT</text>
  <text x="325" y="328" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif" font-size="11" opacity="0.9">ENGINEERING</text>
  <text x="325" y="355" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif" font-size="10" opacity="0.7">"What does it need to know?"</text>
  <!-- Step 3: Harness -->
  <rect x="420" y="190" width="170" height="90" rx="8" fill="url(#step3)" filter="url(#glow)"/>
  <text x="505" y="220" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif" font-size="13" font-weight="700">HARNESS</text>
  <text x="505" y="238" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif" font-size="11" opacity="0.9">ENGINEERING</text>
  <text x="505" y="265" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif" font-size="10" opacity="0.7">"What system surrounds it?"</text>
  <!-- Step 4: Intent -->
  <rect x="600" y="100" width="170" height="90" rx="8" fill="url(#step4)" filter="url(#glow)"/>
  <text x="685" y="130" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif" font-size="13" font-weight="700">INTENT</text>
  <text x="685" y="148" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif" font-size="11" opacity="0.9">ENGINEERING</text>
  <text x="685" y="175" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif" font-size="10" opacity="0.7">"What should it achieve, and why?"</text>
  <!-- Connecting arrows -->
  <line x1="230" y1="395" x2="240" y2="350" stroke="#ffffff" stroke-width="2" opacity="0.4" stroke-dasharray="6,4"/>
  <line x1="410" y1="305" x2="420" y2="260" stroke="#ffffff" stroke-width="2" opacity="0.4" stroke-dasharray="6,4"/>
  <line x1="590" y1="215" x2="600" y2="170" stroke="#ffffff" stroke-width="2" opacity="0.4" stroke-dasharray="6,4"/>
  <!-- Era labels -->
  <text x="145" y="478" text-anchor="middle" fill="#3498DB" font-family="Inter,sans-serif" font-size="10" opacity="0.8">2022-2024</text>
  <text x="325" y="388" text-anchor="middle" fill="#27AE60" font-family="Inter,sans-serif" font-size="10" opacity="0.8">2025</text>
  <text x="505" y="298" text-anchor="middle" fill="#E67E22" font-family="Inter,sans-serif" font-size="10" opacity="0.8">2026</text>
  <text x="685" y="208" text-anchor="middle" fill="#D4A843" font-family="Inter,sans-serif" font-size="10" opacity="0.8">2027+</text>
</svg>

Each layer does not replace the one below it. It absorbs it. You still need excellent prompts at layer four. But prompts become a solved problem within a much larger system of context curation, infrastructure design, and purpose specification.

---

## Layer 1: Prompt Engineering (2022-2024)

**The question**: "How do I phrase this?"

Prompt engineering is the craft of writing effective instructions for language models. It is the discipline that launched the AI engineering profession and remains the most widely taught and practised layer.

### What it looks like in practice

You structure a system prompt with role definitions, output constraints, and reasoning instructions. You use techniques like few-shot examples, chain-of-thought scaffolding, and output format specifications. You iterate on phrasing to reduce hallucinations and improve relevance.

### What it gets right

Prompt engineering teaches you that language models are instruction-following systems, not conversational partners. The shift from "chat with AI" to "specify for AI" is the foundational insight. Everything that follows depends on it.

Subramanian Narayanan at Amazon calls this **Prompt-Driven Architecture**: treating prompts as production specifications rather than casual requests. His production prompts run 1,000+ lines and include anti-hallucination markers, checkpoint-resume logic, and explicit constraint boundaries ("MANDATORY: build must succeed before proceeding"). This is prompt engineering at its ceiling.

### Where it breaks

Prompt engineering assumes the model has the right information. When it does not, no amount of instruction craft can compensate. A flawlessly structured prompt cannot fix "garbage in."

Prompt engineering also operates at the instruction level, not the system level. It tells the model what to do on this turn. It says nothing about what happens between turns, across sessions, or when the model encounters a situation its instructions do not cover.

| Prompt Engineering Does Well | Prompt Engineering Cannot Do |
|:---|:---|
| Single-turn instruction quality | Multi-step workflow coordination |
| Output format specification | Cross-session memory management |
| Role and persona framing | Error recovery in autonomous operation |
| Few-shot example calibration | Conflict resolution between competing agents |

The ceiling of prompt engineering is the floor of context engineering.

---

## Layer 2: Context Engineering (2025)

**The question**: "What does it need to know?"

Context engineering is the discipline of managing a language model's attention budget. Unlike prompt engineering, which focuses on crafting instructions, context engineering addresses the holistic curation of all information that enters the model's limited context window: system prompts, tool definitions, retrieved documents, message history, and tool outputs.

### Why it matters more than prompts

Muratcan Koylan established the critical distinction: the context window is a scarce, degraded physical resource, not an infinite canvas. As context length increases, models exhibit predictable degradation patterns: the "lost-in-the-middle" phenomenon, U-shaped attention curves, and attention scarcity. Effective context engineering means finding the smallest possible set of high-signal tokens that maximise the likelihood of desired outcomes.

The analogy is precise: treat context like RAM, not a junk drawer.

### What it looks like in practice

You design information architectures that load the right knowledge at the right time. You implement progressive disclosure: at startup, agents load only skill names and one-line descriptions; full content loads only when a skill is activated. You build retrieval systems that surface relevant facts and suppress noise. You version-control not just your prompts, but the knowledge graphs, memory stores, and tool manifests that surround them.

Zephyr's research on 2027 workforce skills identifies context engineering as one of seven non-negotiable capabilities: "Setting up AI so it already knows the business, product, and voice context, avoiding generic re-explanations." This is the difference between an entry-level AI user and a practitioner who compounds productivity gains over time.

### Where it breaks

Context engineering manages what goes into the model. It does not manage what happens outside the model. When your autonomous agent runs a fifteen-step workflow and fails at step nine, no amount of context curation helps if there is no feedback loop to detect the failure, diagnose it, and trigger recovery.

Context engineering treats the model as a decision-maker that needs the right information. Harness engineering treats the model as a component inside a larger system that needs infrastructure to operate safely.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" role="img" aria-label="Concentric rings showing how each engineering discipline encompasses the previous ones, with Intent at the centre">
  <defs>
    <linearGradient id="bg-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0f1a;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#1a1f2e;stop-opacity:1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bg-grad2)" rx="12"/>
  <text x="400" y="38" text-anchor="middle" fill="#ffffff" font-family="Inter,system-ui,sans-serif" font-size="18" font-weight="700" letter-spacing="0.5">EACH LAYER ABSORBS ITS PREDECESSOR</text>
  <!-- Ring 1: Prompt (outermost) -->
  <circle cx="400" cy="270" r="200" fill="none" stroke="#3498DB" stroke-width="2.5" opacity="0.5"/>
  <circle cx="400" cy="270" r="200" fill="#3498DB" opacity="0.06"/>
  <text x="400" y="88" text-anchor="middle" fill="#3498DB" font-family="Inter,sans-serif" font-size="12" font-weight="600">PROMPT ENGINEERING</text>
  <text x="400" y="103" text-anchor="middle" fill="#3498DB" font-family="Inter,sans-serif" font-size="10" opacity="0.7">Instruction craft</text>
  <!-- Ring 2: Context -->
  <circle cx="400" cy="270" r="150" fill="none" stroke="#27AE60" stroke-width="2.5" opacity="0.6"/>
  <circle cx="400" cy="270" r="150" fill="#27AE60" opacity="0.08"/>
  <text x="400" y="138" text-anchor="middle" fill="#27AE60" font-family="Inter,sans-serif" font-size="12" font-weight="600">CONTEXT ENGINEERING</text>
  <text x="400" y="153" text-anchor="middle" fill="#27AE60" font-family="Inter,sans-serif" font-size="10" opacity="0.7">Information architecture</text>
  <!-- Ring 3: Harness -->
  <circle cx="400" cy="270" r="100" fill="none" stroke="#E67E22" stroke-width="2.5" opacity="0.7"/>
  <circle cx="400" cy="270" r="100" fill="#E67E22" opacity="0.1"/>
  <text x="400" y="188" text-anchor="middle" fill="#E67E22" font-family="Inter,sans-serif" font-size="12" font-weight="600">HARNESS ENGINEERING</text>
  <text x="400" y="203" text-anchor="middle" fill="#E67E22" font-family="Inter,sans-serif" font-size="10" opacity="0.7">System scaffolding</text>
  <!-- Ring 4: Intent (centre) -->
  <circle cx="400" cy="270" r="50" fill="none" stroke="#D4A843" stroke-width="3" opacity="0.9"/>
  <circle cx="400" cy="270" r="50" fill="#D4A843" opacity="0.15"/>
  <text x="400" y="264" text-anchor="middle" fill="#D4A843" font-family="Inter,sans-serif" font-size="13" font-weight="700">INTENT</text>
  <text x="400" y="282" text-anchor="middle" fill="#D4A843" font-family="Inter,sans-serif" font-size="10" opacity="0.9">Purpose</text>
  <!-- Side annotations -->
  <text x="635" y="145" fill="#ffffff" font-family="Inter,sans-serif" font-size="10" opacity="0.5">Instructions without context = hallucinations</text>
  <text x="600" y="215" fill="#ffffff" font-family="Inter,sans-serif" font-size="10" opacity="0.5">Context without scaffolding = drift</text>
  <text x="555" y="310" fill="#ffffff" font-family="Inter,sans-serif" font-size="10" opacity="0.5">Scaffolding without purpose = busywork</text>
  <!-- Connecting lines to annotations -->
  <line x1="555" y1="120" x2="530" y2="120" stroke="#3498DB" stroke-width="1" opacity="0.3"/>
  <line x1="530" y1="190" x2="500" y2="200" stroke="#27AE60" stroke-width="1" opacity="0.3"/>
  <line x1="500" y1="290" x2="470" y2="280" stroke="#E67E22" stroke-width="1" opacity="0.3"/>
</svg>

---

## Layer 3: Harness Engineering (2026)

**The question**: "What system should I build around it?"

Harness engineering is the design of the operational environment surrounding an AI agent. It treats the model as a CPU and the harness as the operating system: memory, tools, feedback loops, constraints, and lifecycle management.

### Why the industry arrived here

The 2025-2026 "production reality check" forced it. Teams that built impressive demos with great prompts and smart context engineering discovered that their systems broke in production. Not because the model was wrong, but because there was no mechanism to detect, diagnose, or recover from failures over long-running autonomous operations.

Peter Steinberger at PSPDFKit demonstrated one pattern for this: he ships code he does not read. 6,600 commits in a single month. His secret is not a better model. It is the "closing the loop" pattern: specification → agent generation → automated testing → result feedback → agent iteration → loop until success. The harness, not the prompt, is the hero.

### The four pillars of a production harness

**1. Architectural Constraints**

Deterministic boundaries that prevent agents from drifting. Guard rails ("MANDATORY: build must succeed before proceeding"), forbidden actions ("FORBIDDEN: proceeding to deployment with pending tasks"), and structural limitations that keep the agent within its operational envelope.

**2. Feedback Loops and Verification**

Multi-agent "generator-evaluator" patterns where one agent proposes and another validates. Linting, automated testing, and output verification as first-class system components, not afterthoughts. The difference between an agent you demo and an agent you trust.

**3. Checkpoint and Recovery**

Long-running operations will hit failures: context limits, API timeouts, transient errors. Production harnesses encode checkpoint-resume logic: "After completing each task, save progress. If execution restarts, read the checkpoint and resume from the first pending task." This is not traditional error handling code. It is natural language instructions that the model interprets and follows.

**4. Entropy Management**

Systems degrade. Documentation drifts. Context stores accumulate noise. Production harnesses include maintenance agents that repair environmental decay, clean obsolete entries, and ensure the operational environment remains healthy over time.

### What it looks like in practice

You build a directory structure, not a file. You design multi-step workflows with explicit phase gates. You implement observability: logging what agents do, why they chose each action, and where they failed. You create audit trails that let you reconstruct any decision chain after the fact.

### Where it breaks

A perfectly engineered harness can execute flawlessly towards the wrong objective. If no one defines what "success" means at the system level, who resolves conflicts between competing agents, or what values the system should optimise for, the harness is a vehicle without a destination.

That is the gap intent engineering fills.

---

## Layer 4: Intent Engineering (2027+)

**The question**: "What should this system achieve, and why?"

Intent engineering is the discipline of translating high-level business goals, desired outcomes, and constraints into structured specifications that autonomous AI agents can execute without ambiguity. It bridges the "alignment bottleneck" between what a business needs and what an autonomous agent actually optimises for.

### Why it sits at the top

Every discipline below this one can execute correctly and still produce the wrong outcome. A perfectly prompted agent with curated context inside a robust harness can optimise for a metric that destroys long-term value because nobody specified what "value" means. Intent engineering prevents that failure mode by making purpose, constraints, and success criteria explicit.

### The five components of an intent specification

**1. Objective and Purpose**

Not "process refunds" but "reduce customer effort during returns while maintaining fraud protection thresholds." The system knows both what it is doing and why, enabling it to navigate edge cases that specific instructions never anticipated.

**2. Success Criteria**

Measurable states that indicate the goal has been reached. Not "handle returns" but "95% of eligible returns processed within 4 hours, with customer satisfaction maintaining above baseline." The agent can evaluate its own progress against these criteria.

**3. Health Metrics**

KPIs that must not be negatively impacted while pursuing the objective. "Maintain fraud detection rate above 97% while reducing processing time." These are the constraints that prevent naive optimisation.

**4. Constraint Policy**

Hard boundaries and forbidden actions. Not suggestions, but enforcement boundaries. "Never approve a return exceeding $500 without human review." "Never modify pricing data directly." These persist regardless of what any individual prompt or context says.

**5. Escalation and Halt Rules**

Explicit conditions that require human intervention or stop execution entirely. "If three consecutive returns from the same customer are flagged, pause and escalate." The system knows its own authority limits.

### The pattern you should recognise

If you have ever written a requirements document, a product brief, or a strategy memo, you already practice intent engineering for human teams. The discipline is the same. The audience has changed. You are now writing specifications not for developers who interpret loosely, but for autonomous agents that interpret literally.

The precision bar goes up dramatically. A human developer asks clarifying questions. An autonomous agent does exactly what you specified, including all the edge cases you forgot to specify.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" role="img" aria-label="Mapping the four AI engineering disciplines to Mind-Body-Soul layers">
  <defs>
    <linearGradient id="bg-grad3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0f1a;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#1a1f2e;stop-opacity:1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="420" fill="url(#bg-grad3)" rx="12"/>
  <text x="400" y="38" text-anchor="middle" fill="#ffffff" font-family="Inter,system-ui,sans-serif" font-size="18" font-weight="700" letter-spacing="0.5">THE BODY-MIND-SOUL MAPPING</text>
  <!-- SOUL section -->
  <rect x="60" y="60" width="680" height="90" rx="10" fill="#D4A843" opacity="0.12" stroke="#D4A843" stroke-width="1.5" stroke-opacity="0.4"/>
  <text x="90" y="90" fill="#D4A843" font-family="Inter,sans-serif" font-size="14" font-weight="700">SOUL</text>
  <text x="90" y="108" fill="#D4A843" font-family="Inter,sans-serif" font-size="11" opacity="0.8">Purpose, Identity, Governance</text>
  <text x="380" y="90" fill="#ffffff" font-family="Inter,sans-serif" font-size="12" font-weight="600">Intent Engineering</text>
  <text x="380" y="108" fill="#ffffff" font-family="Inter,sans-serif" font-size="10" opacity="0.7">Objective • Success criteria • Constraints • Escalation rules</text>
  <text x="380" y="138" fill="#D4A843" font-family="Inter,sans-serif" font-size="10" opacity="0.6">↳ What should the system achieve, and why?</text>
  <!-- MIND section -->
  <rect x="60" y="165" width="680" height="90" rx="10" fill="#2874A6" opacity="0.12" stroke="#2874A6" stroke-width="1.5" stroke-opacity="0.4"/>
  <text x="90" y="195" fill="#2874A6" font-family="Inter,sans-serif" font-size="14" font-weight="700">MIND</text>
  <text x="90" y="213" fill="#2874A6" font-family="Inter,sans-serif" font-size="11" opacity="0.8">Cognition, Judgment, Architecture</text>
  <text x="380" y="195" fill="#ffffff" font-family="Inter,sans-serif" font-size="12" font-weight="600">Harness Engineering + Context Engineering</text>
  <text x="380" y="213" fill="#ffffff" font-family="Inter,sans-serif" font-size="10" opacity="0.7">Scaffolding • Feedback loops • Information architecture • Attention budgets</text>
  <text x="380" y="243" fill="#2874A6" font-family="Inter,sans-serif" font-size="10" opacity="0.6">↳ What system and knowledge does the agent need?</text>
  <!-- BODY section -->
  <rect x="60" y="270" width="680" height="90" rx="10" fill="#27AE60" opacity="0.12" stroke="#27AE60" stroke-width="1.5" stroke-opacity="0.4"/>
  <text x="90" y="300" fill="#27AE60" font-family="Inter,sans-serif" font-size="14" font-weight="700">BODY</text>
  <text x="90" y="318" fill="#27AE60" font-family="Inter,sans-serif" font-size="11" opacity="0.8">Execution, Generation, Action</text>
  <text x="380" y="300" fill="#ffffff" font-family="Inter,sans-serif" font-size="12" font-weight="600">Prompt Engineering</text>
  <text x="380" y="318" fill="#ffffff" font-family="Inter,sans-serif" font-size="10" opacity="0.7">Instructions • Role definitions • Output formats • Chain-of-thought</text>
  <text x="380" y="348" fill="#27AE60" font-family="Inter,sans-serif" font-size="10" opacity="0.6">↳ How do I phrase the instruction?</text>
  <!-- Insight bar -->
  <rect x="60" y="380" width="680" height="30" rx="6" fill="#ffffff" opacity="0.05"/>
  <text x="400" y="400" text-anchor="middle" fill="#ffffff" font-family="Inter,sans-serif" font-size="11" opacity="0.7">AI absorbs Body. Humans must retain Mind and Soul. The danger is when organisations let AI take over all three.</text>
</svg>

---

## The Evolutionary Sequence in Practice

What does it look like when a team operates at each layer? Here is a concrete scenario: building an autonomous code review agent.

**Layer 1 team (Prompt)**: Writes a system prompt: "You are a senior code reviewer. Review this pull request for bugs, style issues, and security vulnerabilities. Be thorough but concise."

**Layer 2 team (Context)**: Adds the project's coding standards document, recent architectural decision records, and the last three reviews for calibration context. Uses progressive disclosure to load language-specific rules only when the relevant file type appears.

**Layer 3 team (Harness)**: Builds a multi-agent pipeline: one agent identifies potential issues, another validates each finding by checking whether the flagged pattern actually violates the project's conventions. Implements checkpoint-resume so the review can survive context window limits on large PRs. Adds an observability layer that logs every decision with its reasoning chain.

**Layer 4 team (Intent)**: Defines the system objective: "Reduce the time senior engineers spend on routine review by 60% while maintaining the codebase's architectural integrity score above 85. Never approve changes to security-critical modules without human confirmation. If the estimated review complexity exceeds the agent's validated capability threshold, escalate the entire PR to a human reviewer rather than producing a partial review."

Notice what happens at each layer. The agent becomes more autonomous, more reliable, and more aligned with the team's actual goals. But each layer requires the ones below it. You cannot write a meaningful intent specification without understanding what harness the intent will be enacted through.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" role="img" aria-label="Practice grid showing what practitioners do at each layer">
  <defs>
    <linearGradient id="bg-grad4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0f1a;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#1a1f2e;stop-opacity:1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="380" fill="url(#bg-grad4)" rx="12"/>
  <text x="400" y="35" text-anchor="middle" fill="#ffffff" font-family="Inter,system-ui,sans-serif" font-size="16" font-weight="700" letter-spacing="0.5">WHAT PRACTITIONERS DO AT EACH LAYER</text>
  <!-- Headers -->
  <text x="90" y="70" fill="#ffffff" font-family="Inter,sans-serif" font-size="11" font-weight="700" opacity="0.6">LAYER</text>
  <text x="230" y="70" fill="#ffffff" font-family="Inter,sans-serif" font-size="11" font-weight="700" opacity="0.6">YOU BUILD</text>
  <text x="430" y="70" fill="#ffffff" font-family="Inter,sans-serif" font-size="11" font-weight="700" opacity="0.6">YOU VERSION-CONTROL</text>
  <text x="650" y="70" fill="#ffffff" font-family="Inter,sans-serif" font-size="11" font-weight="700" opacity="0.6">FAILURE MODE</text>
  <line x1="60" y1="80" x2="740" y2="80" stroke="#ffffff" stroke-width="0.5" opacity="0.2"/>
  <!-- Row 1 -->
  <circle cx="75" cy="110" r="6" fill="#3498DB"/>
  <text x="90" y="114" fill="#3498DB" font-family="Inter,sans-serif" font-size="12" font-weight="600">Prompt</text>
  <text x="230" y="114" fill="#ffffff" font-family="Inter,sans-serif" font-size="11" opacity="0.8">System prompts, few-shot examples</text>
  <text x="430" y="114" fill="#ffffff" font-family="Inter,sans-serif" font-size="11" opacity="0.8">Prompt files (.md)</text>
  <text x="650" y="114" fill="#ff6b6b" font-family="Inter,sans-serif" font-size="11" opacity="0.8">Hallucination</text>
  <line x1="60" y1="135" x2="740" y2="135" stroke="#ffffff" stroke-width="0.3" opacity="0.1"/>
  <!-- Row 2 -->
  <circle cx="75" cy="165" r="6" fill="#27AE60"/>
  <text x="90" y="169" fill="#27AE60" font-family="Inter,sans-serif" font-size="12" font-weight="600">Context</text>
  <text x="230" y="169" fill="#ffffff" font-family="Inter,sans-serif" font-size="11" opacity="0.8">Knowledge bases, retrieval pipelines</text>
  <text x="430" y="169" fill="#ffffff" font-family="Inter,sans-serif" font-size="11" opacity="0.8">Context manifests, KI stores</text>
  <text x="650" y="169" fill="#ff6b6b" font-family="Inter,sans-serif" font-size="11" opacity="0.8">Drift (no feedback)</text>
  <line x1="60" y1="190" x2="740" y2="190" stroke="#ffffff" stroke-width="0.3" opacity="0.1"/>
  <!-- Row 3 -->
  <circle cx="75" cy="220" r="6" fill="#E67E22"/>
  <text x="90" y="224" fill="#E67E22" font-family="Inter,sans-serif" font-size="12" font-weight="600">Harness</text>
  <text x="230" y="224" fill="#ffffff" font-family="Inter,sans-serif" font-size="11" opacity="0.8">Workflow pipelines, test harnesses</text>
  <text x="430" y="224" fill="#ffffff" font-family="Inter,sans-serif" font-size="11" opacity="0.8">Workflow dirs, guard rail configs</text>
  <text x="650" y="224" fill="#ff6b6b" font-family="Inter,sans-serif" font-size="11" opacity="0.8">Misalignment</text>
  <line x1="60" y1="245" x2="740" y2="245" stroke="#ffffff" stroke-width="0.3" opacity="0.1"/>
  <!-- Row 4 -->
  <circle cx="75" cy="275" r="6" fill="#D4A843"/>
  <text x="90" y="279" fill="#D4A843" font-family="Inter,sans-serif" font-size="12" font-weight="600">Intent</text>
  <text x="230" y="279" fill="#ffffff" font-family="Inter,sans-serif" font-size="11" opacity="0.8">Objective specs, constraint policies</text>
  <text x="430" y="279" fill="#ffffff" font-family="Inter,sans-serif" font-size="11" opacity="0.8">Intent manifests, success criteria</text>
  <text x="650" y="279" fill="#ff6b6b" font-family="Inter,sans-serif" font-size="11" opacity="0.8">Wrong objective</text>
  <line x1="60" y1="300" x2="740" y2="300" stroke="#ffffff" stroke-width="0.3" opacity="0.1"/>
  <!-- Insight -->
  <text x="400" y="340" text-anchor="middle" fill="#ffffff" font-family="Inter,sans-serif" font-size="12" opacity="0.5">Each layer's failure mode is solved by the layer above it.</text>
  <text x="400" y="360" text-anchor="middle" fill="#D4A843" font-family="Inter,sans-serif" font-size="11" opacity="0.7">Intent Engineering's failure mode, optimising for the wrong objective, is solved by humans.</text>
</svg>

---

## The New Pattern

The four-layer model is diagnostic. It tells you where you are and what you are missing.

**If your AI agents hallucinate regularly**, you have a context engineering problem. You are operating at layer one and attempting layer-three complexity. Stop crafting better prompts. Start curating what the model sees.

**If your AI agents drift off course on multi-step tasks**, you have a harness engineering problem. Your agent has the right instructions and the right information, but no mechanism to verify its progress, detect errors, or recover from failures. Build the feedback loop.

**If your AI agents execute tasks perfectly but produce wrong outcomes**, you have an intent engineering problem. No one specified what "success" means at the system level. The agent optimised for the wrong metric. Define the objective, the constraints, and the escalation triggers before you build the harness.

**If your AI agents feel brittle and require constant human intervention**, you are probably operating at one layer while the complexity of your task demands two or three layers above.

### The 80/20 has shifted, again

In the prompt engineering era, 80% of effort went to phrasing instructions, and 20% to everything else. In the context engineering era, the ratio inverted: 80% information architecture, 20% instruction craft.

Now, the ratio shifts once more: 80% of the value in a production AI system comes from the harness and intent layers. The prompts and context are necessary infrastructure, but they are no longer the differentiator. The teams that win are the ones who engineer the system around the model, not the model itself.

## The Open Question

Most teams operate at layer one. Some have reached layer two. Very few have built a genuine layer-three harness. Layer four remains the frontier.

Your current ceiling is determined by the deepest question you know how to ask. "How do I phrase this?" is layer one. "What does it need to know?" is layer two. "What system surrounds it?" is layer three. "What should it achieve, and why?" is layer four.

Here is the question that sits above all four layers, the one that no framework or discipline can answer for you:

Who in your organisation is responsible for defining the intent, and what happens when nobody does?

---

*This fusion emerged from a STEAL on Subramanian Narayanan's Prompt-Driven Architecture article, cross-referenced with context engineering research (Muratcan Koylan), harness engineering industry consensus (2026), intent engineering definitions (pathmode.io, mindstudio.ai), and the OpenClaw paradigm (Peter Steinberger). The four-layer model maps to the Mind-Body-Soul framework that governs how living organisations distribute capability.*

<!--
STATEMENT: AI engineering has evolved through four disciplines: Prompt Engineering (how to phrase instructions), Context Engineering (what information to provide), Harness Engineering (what system to build around agents), and Intent Engineering (what purpose the system serves). Each layer absorbs its predecessor. Most teams are stuck on layer one.

QUESTION: Your AI agents have prompts. Do they have purpose? What happens when the agent executes its task perfectly but optimises for the wrong outcome, and nobody defined what the right outcome was?

CONTRAST: Layer 1 teams give agents instructions. Layer 4 teams give agents identity. The gap between telling an AI what to do and governing what it should achieve is the difference between a tool and a system. Most of the industry is building tools. The competitive edge belongs to those building systems.
-->
