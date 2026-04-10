---
title: "You're Picking the Wrong Thinking Structure (and You Don't Even Know It)"
display_title: "Intent of Thought"
display_subtitle: "You're picking the wrong thinking structure. You don't even know it."
date: 2026-03-06
categories: ["ai-emergence"]
tags: ["intent-of-thought", "llm-reasoning", "topology-governance", "chain-of-thought", "spar"]
description: "LLMs can reason in chains, trees, and graphs. But nobody asks WHY before picking one. That is the gap."
source_research: "concepts/intention-of-thought/research.md"
fusion_type: "public"
fusion_nool:
  nokkam: "Show practitioners that topology selection in LLM reasoning is an unaddressed governance gap, not a minor configuration choice."
  vadivam: "Pattern collision: BDI agent theory (40 years) × XoT reasoning topologies (4 years), intersecting at the missing governance layer."
  sangilai: "Reader questions their own default topology choices and tries a 3-line IoT spec on their next reasoning task."
fusion_point:
  idea_a: "BDI agent theory (intent as committed goal, Cohen & Levesque 1990)"
  idea_b: "XoT reasoning topologies (14+ structures, Besta et al. 2025)"
quote_top: "LLM reasoning picks structures by coin toss, not purpose."
quote_bottom: "Why reason? The gap."
---

# Intent of Thought

You have at least 14 different ways to make an LLM reason. Chain-of-Thought. Tree-of-Thought. Graph-of-Thought. Skeleton, Buffer, Diagram, Recursion, and a dozen more. The question nobody is asking: how do you pick which one?

## The Problem: Structure Without Purpose

Right now, topology selection in LLM reasoning is a coin toss dressed up as engineering.

A researcher picks Chain-of-Thought because the original paper used it. A developer picks Tree-of-Thought because it sounds more sophisticated. A team defaults to whatever their framework supports. None of them ask the question that should come first: *what is the purpose of this reasoning?*

This is not a minor oversight. It is the equivalent of a surgeon selecting a scalpel before diagnosing the patient. The XoT landscape (the collective term for all X-of-Thought methods) has been obsessed with *how* to reason for four years, while ignoring *why* the reasoning is happening in the first place.

## The Gap Nobody Sees

The closest attempts, papers like SWI (Speaking with Intent), ICoT (Intention Chain-of-Thought), and ARR (Analyzing, Retrieving, Reasoning), add intent at the step level. They tell the model *what to think about at each step*. But they all operate inside a fixed topology. None of them challenge the topology itself. It is like giving a driver turn-by-turn directions while never questioning whether they should be driving, flying, or taking the train.

After synthesising 6 external research reports, 2 SPAR (Structured Persona-Argumentation for Reasoning) deep-analysis verdicts, and 40 years of BDI (Beliefs-Desires-Intentions) agent theory, a clear gap emerged:

**Step-level intent exists. Topology-level intent governance does not.**

## The Topology-Governance Gap

No paper, no framework, no benchmark proposes that the *purpose* of a reasoning task should determine which *structure* of reasoning to deploy. The research calls this the "Topology-Governance Gap."

Six distinct levels exist at which intent operates in reasoning. The first five are addressed by prior work. The sixth, topology governance, is the gap:

<svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg" style="max-width:800px;margin:2em auto;display:block">
  <defs>
    <linearGradient id="gap-glow" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#D4A843"/><stop offset="100%" stop-color="#B8922F"/></linearGradient>
    <filter id="gap-shadow"><feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000" flood-opacity="0.4"/></filter>
  </defs>
  <rect width="800" height="520" rx="16" fill="#0a0a0f"/>

  <!-- Title -->
  <text x="400" y="34" text-anchor="middle" fill="#e8dcc8" font-family="system-ui" font-size="16" font-weight="bold">The Topology-Governance Gap</text>
  <text x="400" y="54" text-anchor="middle" fill="#8a7e6a" font-family="system-ui" font-size="12">Six levels of intent in reasoning, and where the gap lives</text>

  <!-- Column headers -->
  <text x="50" y="82" fill="#8a7e6a" font-family="system-ui" font-size="11" font-weight="bold">Level</text>
  <text x="200" y="82" fill="#8a7e6a" font-family="system-ui" font-size="11" font-weight="bold">Prior Work</text>
  <text x="400" y="82" fill="#8a7e6a" font-family="system-ui" font-size="11" font-weight="bold">What It Governs</text>
  <text x="650" y="82" fill="#8a7e6a" font-family="system-ui" font-size="11" font-weight="bold">Status</text>
  <line x1="30" y1="90" x2="770" y2="90" stroke="#2a2520" stroke-width="1"/>

  <!-- Row 1: Step -->
  <rect x="30" y="100" width="740" height="48" rx="8" fill="#141210"/>
  <rect x="36" y="108" width="4" height="32" rx="2" fill="#27AE60"/>
  <text x="50" y="130" fill="#c4b89e" font-family="system-ui" font-size="13" font-weight="bold">1. Step</text>
  <text x="200" y="130" fill="#8a7e6a" font-family="system-ui" font-size="12">SWI</text>
  <text x="400" y="130" fill="#8a7e6a" font-family="system-ui" font-size="12">Individual step quality</text>
  <rect x="630" y="114" width="90" height="24" rx="12" fill="rgba(39,174,96,0.15)" stroke="#27AE60" stroke-width="1"/>
  <text x="675" y="131" text-anchor="middle" fill="#27AE60" font-family="system-ui" font-size="10" font-weight="bold">COVERED</text>

  <!-- Row 2: Domain -->
  <rect x="30" y="156" width="740" height="48" rx="8" fill="#1a1814"/>
  <rect x="36" y="164" width="4" height="32" rx="2" fill="#2874A6"/>
  <text x="50" y="186" fill="#c4b89e" font-family="system-ui" font-size="13" font-weight="bold">2. Domain</text>
  <text x="200" y="186" fill="#8a7e6a" font-family="system-ui" font-size="12">ICoT</text>
  <text x="400" y="186" fill="#8a7e6a" font-family="system-ui" font-size="12">Code generation strategy</text>
  <rect x="630" y="170" width="90" height="24" rx="12" fill="rgba(40,116,166,0.15)" stroke="#2874A6" stroke-width="1"/>
  <text x="675" y="187" text-anchor="middle" fill="#2874A6" font-family="system-ui" font-size="10" font-weight="bold">COVERED</text>

  <!-- Row 3: Retrieval -->
  <rect x="30" y="212" width="740" height="48" rx="8" fill="#141210"/>
  <rect x="36" y="220" width="4" height="32" rx="2" fill="#8E44AD"/>
  <text x="50" y="242" fill="#c4b89e" font-family="system-ui" font-size="13" font-weight="bold">3. Retrieval</text>
  <text x="200" y="242" fill="#8a7e6a" font-family="system-ui" font-size="12">ARR</text>
  <text x="400" y="242" fill="#8a7e6a" font-family="system-ui" font-size="12">Pre-retrieval question analysis</text>
  <rect x="630" y="226" width="90" height="24" rx="12" fill="rgba(142,68,173,0.15)" stroke="#8E44AD" stroke-width="1"/>
  <text x="675" y="243" text-anchor="middle" fill="#8E44AD" font-family="system-ui" font-size="10" font-weight="bold">COVERED</text>

  <!-- Row 4: Agent -->
  <rect x="30" y="268" width="740" height="48" rx="8" fill="#1a1814"/>
  <rect x="36" y="276" width="4" height="32" rx="2" fill="#E67E22"/>
  <text x="50" y="298" fill="#c4b89e" font-family="system-ui" font-size="13" font-weight="bold">4. Agent</text>
  <text x="200" y="298" fill="#8a7e6a" font-family="system-ui" font-size="12">BDI</text>
  <text x="400" y="298" fill="#8a7e6a" font-family="system-ui" font-size="12">External actions, commitments</text>
  <rect x="630" y="282" width="90" height="24" rx="12" fill="rgba(230,126,34,0.15)" stroke="#E67E22" stroke-width="1"/>
  <text x="675" y="299" text-anchor="middle" fill="#E67E22" font-family="system-ui" font-size="10" font-weight="bold">COVERED</text>

  <!-- Row 5: Training -->
  <rect x="30" y="324" width="740" height="48" rx="8" fill="#141210"/>
  <rect x="36" y="332" width="4" height="32" rx="2" fill="#5a5145"/>
  <text x="50" y="354" fill="#c4b89e" font-family="system-ui" font-size="13" font-weight="bold">5. Training</text>
  <text x="200" y="354" fill="#8a7e6a" font-family="system-ui" font-size="12">RLHF / DPO</text>
  <text x="400" y="354" fill="#8a7e6a" font-family="system-ui" font-size="12">Model behavioural alignment</text>
  <rect x="630" y="338" width="90" height="24" rx="12" fill="rgba(90,81,69,0.15)" stroke="#5a5145" stroke-width="1"/>
  <text x="675" y="355" text-anchor="middle" fill="#5a5145" font-family="system-ui" font-size="10" font-weight="bold">COVERED</text>

  <!-- Row 6: TOPOLOGY (THE GAP) - highlighted -->
  <rect x="24" y="386" width="752" height="60" rx="10" fill="rgba(212,168,67,0.08)" stroke="#D4A843" stroke-width="2.5" stroke-dasharray="8,4" filter="url(#gap-shadow)"/>
  <rect x="36" y="396" width="4" height="40" rx="2" fill="#D4A843"/>
  <text x="50" y="422" fill="#D4A843" font-family="system-ui" font-size="14" font-weight="bold">6. Topology</text>
  <text x="200" y="422" fill="#D4A843" font-family="system-ui" font-size="13" font-weight="bold">IoT (this paper)</text>
  <text x="400" y="422" fill="#D4A843" font-family="system-ui" font-size="13" font-weight="bold">Which reasoning structure to deploy</text>
  <rect x="625" y="400" width="105" height="28" rx="14" fill="rgba(231,76,60,0.2)" stroke="#E74C3C" stroke-width="1.5"/>
  <text x="677" y="419" text-anchor="middle" fill="#E74C3C" font-family="system-ui" font-size="10" font-weight="bold">THE GAP</text>

  <!-- Footer note -->
  <text x="400" y="472" text-anchor="middle" fill="#5a5145" font-family="system-ui" font-size="11" font-style="italic">← No prior work governs topology selection based on purpose →</text>
  <text x="400" y="500" text-anchor="middle" fill="#D4A843" font-family="system-ui" font-size="11">IoT fills this gap with three primitives: Purpose, Anti-Purpose, Success Signal</text>
</svg>

## The IoT Solution

Intent of Thought (IoT) is a pre-reasoning checkpoint with three primitives:

| Primitive | Question It Answers | Example |
|-----------|---------------------|---------|
| **Purpose** | *What are we trying to achieve?* | "Map causal relationships between hospital readmission factors" |
| **Anti-Purpose** | *What would make this reasoning worthless?* | "Treating factors as independent when they interact" |
| **Success Signal** | *How will we know when reasoning has achieved its purpose?* | "A relationship map with bidirectional dependencies and feedback loops" |

Given that specification, the topology becomes a *consequence* of the purpose: interconnected causal factors with feedback loops demand a Graph-of-Thought, not a Chain. A sequential proof demands a Chain, not a Tree. The purpose tells you.

The third primitive, the Anti-Purpose, deserves attention. It is not the negation of the Purpose. It is the specific way reasoning can fail while *appearing* to succeed. "Treating correlated factors as independent" looks like valid reasoning, produces clean output, and is completely wrong. The Anti-Purpose catches exactly this kind of failure.

## What This Means

Three practical shifts follow from this:

**1. Ask "why" before "how."** Before selecting a reasoning topology (or accepting the default), write a three-line IoT specification: Purpose, Anti-Purpose, Success Signal. This takes 30 seconds and prevents hours of misaligned reasoning.

**2. Watch for reasoning drift.** The IoT checkpoint is not a one-time preamble. It is a drift-detection mechanism. During long reasoning chains, compare the current trajectory against the stated purpose. SWI's experiments show that explicit intent improves reasoning outcomes. IoT extends that principle from individual steps to the entire reasoning architecture.

**3. Purpose is the missing variable.** The XoT literature has mapped 14+ reasoning topologies. It has benchmarked them, combined them, and optimised them. What it has not done is ask why any particular topology should be selected for any particular task. Purpose (nokkam, நோக்கம்) is the variable that the entire landscape has skipped.

## The Question

You already pick reasoning structures for your AI systems, whether you are building agents, writing prompts, or designing pipelines. You just do it implicitly, by habit or by default.

What would change if you made that selection explicit, with a stated purpose, a named failure mode, and a clear success signal?

The [Intent of Thought repository](https://github.com/synthanai/intent-of-thought) and the full paper are open for inspection. The gap is real, the three primitives are simple, and the question is whether you are willing to ask "why" before you ask "how."
