---
title: "AGENTS.md Is Stage 1. Here's What Stage 4 Looks Like"
display_title: "AGENTS.md Is Stage 1"
display_subtitle: "The industry just standardised a README for AI agents. It's necessary. It's also the first step of four."
date: 2026-03-19
categories: ["ai-emergence"]
tags: [agentic_systems, context_engineering, governance, maturity-model, operating-system]
description: "AGENTS.md standardises instructions for AI agents. It solves Stage 1. The real gap is governance, reasoning, and culture."
source_research: "concepts/agents-md-configuration-standard/research.md"
fusion_type: "public"
fusion_nool:
  nokkam: "Reveal the maturity gap between industry-standard agent configuration (instructions) and what an agent operating system actually requires (governance, reasoning, culture)"
  vadivam: "Pattern: 4-stage maturity model (README → Guidelines → Governance → Culture)"
  sangilai: "Reader evaluates their own agent configuration maturity and recognises the gap between telling agents what to do and governing how they think"
fusion_point:
  ideas:
    - "The 4-stage maturity model for agent configuration (README → Guidelines → Governance → Culture)"
    - "The operating system analogy: config file vs. OS"
    - "The 6th convergence: industry standardising what was already built as a complete architecture"
quote_top: "AGENTS.md defines project rules for AI, like READMEs for humans."
quote_bottom: "Context not constraint."
origin_nodes: []
valence: "mixed"
friction: ""
status: pending
---

# AGENTS.md Is Stage 1

Five major tools adopted AGENTS.md within months of its release. Kilo Code, Cursor, Windsurf, OpenAI Torus, GitHub Copilot. The spec is clean: a markdown file that tells AI agents how your project works. Build commands, test commands, coding standards, project architecture. A README, but for machines instead of humans.

It is exactly right. It is also the first step of four.

## Familiar Ground

You know the problem. You open a new AI coding session and spend the first ten minutes re-explaining your stack. "We use TypeScript. Tests go in this directory. Import paths follow this convention. Do not auto-format files." Every session starts cold. Every context window wastes tokens on the same instructions.

AGENTS.md fixes this. One file in the project root. The agent reads it before doing anything. No more re-explaining. The configuration persists between sessions, between tools, between team members using different AI assistants.

Three competing standards emerged for this: CLAUDE.md (Anthropic, Claude-only), Cursor Rules (Cursor-only), and AGENTS.md (open, tool-agnostic). AGENTS.md is winning because it is vendor-neutral and supports hierarchical nesting: subdirectory files override the root, so different parts of your codebase get different instructions.

The problem is solved. The real question is what comes next.

## Counter-Signal

A README tells a new developer what the project is. It does not tell them how to think about it, why certain decisions were made, or what to do when the instructions conflict with each other.

AGENTS.md does the same thing for AI agents: it tells them what to do. Instructions. Configuration. Rules. But instructions without governance is context without constraints. What prevents an agent from ignoring its AGENTS.md? What happens when two instructions conflict? Who decides if the instructions are correct? How do the instructions evolve as the project changes?

These are not edge cases. They are the operating questions of any system that delegates work to agents at scale. A README is necessary but not sufficient for human contributors. An AGENTS.md is necessary but not sufficient for AI agents.

## ⚛️ The Fusion

Three ideas crash here, and the collision produces a maturity model.

**The four stages of agent configuration** map the gap between what the industry has standardised and what agent orchestration actually requires:

| Stage | Human Equivalent | AI Equivalent | What It Contains |
|:-----:|:----------------|:--------------|:-----------------|
| 1 | README.md | AGENTS.md | Instructions: build, test, style |
| 2 | Contributing guidelines | Workflow protocols | Multi-step processes: how to ship, how to review, how to debug |
| 3 | Code of conduct | Governance rules | Constraints: what agents cannot do, how conflicts resolve, audit trails |
| 4 | Organisational culture | Emergent behaviour | Identity: why the project exists, what quality means, how agents reason about tradeoffs |

The industry is at Stage 1. That is not a criticism. Stage 1 is essential. You cannot build Stage 3 without Stage 1. But the gap between Stage 1 and Stage 4 is the same gap between a configuration file and an operating system.

**The OS analogy** makes the depth visible. AGENTS.md is a config file: it stores static instructions that an agent reads before acting. An agent operating system includes workflows (multi-step processes that trigger different agents for different phases), governance (constraints, audit logs, safety boundaries), personas (perspective diversity: an Advocate agent and an Architect agent read the same codebase differently), knowledge (cross-referenced intelligence that accumulates across sessions), and reasoning chains (documentation of why each instruction exists, not just what it says).

What if you could see your agent configuration not as a file, but as a directory? Not as instructions, but as a working environment that includes context, constraints, perspectives, and memory?

**The convergence evidence** is striking. This is the sixth time the industry has independently standardised a pattern that already existed as a complete architecture. The direction is identical. The depth is not.

![The 4-Stage Maturity Model: Stage 1 (README/AGENTS.md) is where the industry is. Stage 4 (Culture/.agent/) is where the gap becomes the opportunity. The staircase from configuration to governance to culture is the roadmap.](/images/collisions/agents-md-is-stage-1.png)

| Stage 1 (Configuration) | Stage 4 (Operating System) |
|:---|:---|
| Static instructions | Dynamic workflows |
| One file, flat | Multi-level directory, hierarchical |
| Tells agents what to do | Governs how agents think |
| No reasoning chain | Every instruction has a documented WHY |
| No evolution protocol | Instructions evolve through reflection |
| No conflict resolution | Governance protocol for instruction conflicts |
| No perspective diversity | Multiple agent personas read the same context differently |
| Session starts cold | Knowledge accumulates across sessions |

## The New Pattern

The maturity model is diagnostic, not prescriptive. You do not need to be at Stage 4 to ship good software with AI agents. But you should know which stage you are at, and what you are missing.

Stage 1 teams give agents instructions. This works for single-agent, single-task workflows.

Stage 2 teams give agents processes. This works when the agent needs to follow multi-step procedures: run tests, check formatting, update the changelog, open a pull request.

Stage 3 teams give agents constraints. This is where governance enters: what the agent cannot do, how its output is audited, what happens when two agents produce conflicting recommendations.

Stage 4 teams give agents identity. This is where the agent understands not just what to do, but why. Where quality is defined not by rules but by principles. Where the agent's behaviour emerges from the environment, not just the instructions.

Most teams should be aiming for Stage 2 right now. If you are still at Stage 1 (a single config file with static instructions), the next step is not a better config file. The next step is a directory with workflow definitions.

The gap between Stage 1 and Stage 4 is the next three years of agent infrastructure evolution. The teams that build the staircase first will have the compounding advantage.

## The Open Question

The industry just agreed that AI agents need persistent, project-specific context.

AGENTS.md solves the README layer. The governance layer, the reasoning layer, the culture layer, those are still open.

Who writes the constitution for the agents in your codebase, and what happens when no one does?

---

*This fusion emerged from a STEAL on the AGENTS.md specification, tracking the sixth independent convergence between industry standards and an existing complete architecture.*

<!--
STATEMENT: AGENTS.md is a README for AI agents. Five major tools adopted it in months. It solves Stage 1 of a four-stage maturity model. Stages 2, 3, and 4 (workflows, governance, culture) are still wide open. The gap between a config file and an operating system is the next three years of agent infrastructure.

QUESTION: Your AI agents have instructions. Do they have governance? What happens when two agents produce conflicting recommendations and there is no protocol for resolving the conflict? AGENTS.md does not answer this. Stage 3 does.

CONTRAST: Most teams configure their AI agents with a single markdown file. That is Stage 1 of four. Stage 2 adds workflows. Stage 3 adds governance. Stage 4 adds culture. The gap between telling an agent what to do and governing how it thinks is the difference between a config file and an operating system.
-->
