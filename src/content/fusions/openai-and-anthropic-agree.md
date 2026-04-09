---
title: "OpenAI and Anthropic Agree: Agents Think in Shell Commands"
display_title: "OpenAI and Anthropic Agree"
display_subtitle: "Two competing AI labs independently converged on the same agent architecture. When competitors agree, you are looking at a truth."
date: 2026-03-19
categories: ["ai-emergence"]
tags: ["openai", "anthropic", "shell-commands", "agent-architecture", "convergence", "unix"]
description: "OpenAI and Anthropic independently built the same agent loop: model + shell commands + feedback. When competitors converge, the pattern is fundamental."
source_research: "concepts/openai-responses-api-agent-loop/research.md"
fusion_type: "public"
fusion_nool:
  nokkam: "Expose multi-vendor architectural convergence: OpenAI and Anthropic independently arrived at shell commands as the agent execution primitive, validating Unix principles"
  vadivam: "Evidence: multi-vendor convergence as proof of fundamental truth"
  sangilai: "Reader re-evaluates their own agent architecture and asks whether they are building on the converging pattern or fighting it"
fusion_point:
  ideas:
    - "Both AI lab leaders independently chose the same three-node agent loop pattern"
    - "Shell commands replaced typed function calls as the execution primitive"
    - "When competitors converge, the pattern is not a preference, it is a discovery"
---

# OpenAI and Anthropic Agree

OpenAI and Anthropic compete on everything. Safety philosophy. Business model. Capability benchmarks. Public messaging. They disagree on how to build AI, how to govern it, and how to sell it.

They built the same agent architecture.

## Familiar Ground

If you have used an AI coding agent, you have seen the pattern. You give the agent a goal. The agent reasons about what to do. It executes a shell command. It reads the output. It reasons again. It executes another command. The loop continues until the task is complete.

This is not one company's approach. It is both companies' approach. OpenAI's Responses API orchestrates agent loops through shell commands in a runtime container. Anthropic's Claude Code runs the same pattern: model reasoning, shell execution, stdout/stderr observation, next action.

Three nodes. Orchestrator, Reasoner, Executor. The same diagram. Independently designed.

## Counter-Signal

The industry spent years building typed function calls. Elaborate tool schemas. Structured input/output contracts. OpenAI invented function calling. It was the standard approach: define your tools in JSON, the model calls them by name, the system executes the typed function.

Then OpenAI moved away from its own invention. The Responses API diagram shows shell commands, not typed functions. The agent does not call a function named "read_file." It runs `cat file.txt`. It does not call "search_codebase." It runs `grep -r pattern .`. The tools are implicit in the commands, not explicit in a schema.

This is a retreat from abstraction back to primitives. And both companies did it independently.

## ⚛️ The Fusion

Two ideas crash here, and the collision reveals a principle.

**Multi-vendor convergence as discovery**: when two competitors, each with different technical philosophies and engineering cultures, independently arrive at the same architecture, you are not observing a preference. You are observing a discovery. The pattern is not chosen. It is found, the way gravity is found: you can build different theories about why it works, but you cannot build systems that ignore it.

The three-node pattern (Orchestrator + Reasoner + Executor) appears in both architectures:

| Component | OpenAI (Responses API) | Anthropic (Claude Code) |
|:---|:---|:---|
| Orchestrator | API orchestrates agent loop | CODEX workflow governs execution |
| Reasoner | Model produces reasoning + shell instructions | Model produces reasoning + shell commands |
| Executor | Runtime Container executes commands | Terminal executes commands |
| Feedback | STDOUT/STDERR returns to model | STDOUT/STDERR returns to model |
| Termination | "Until complete" heuristic | Checkpoint-resume protocol |

**Shell commands as the natural execution interface**: the Unix shell is fifty years old. It was designed for humans to interact with operating systems through text commands. AI agents, executing through the same interface, do not need adaptation layers. The shell is already a natural language execution environment, just with a different grammar.

This is why typed function calls are retreating. They add an abstraction layer between the model and the operating system. The shell removes it. The model already speaks text. The shell already accepts text. The translation layer is unnecessary.

## The New Pattern

The practical implication is clean: build your agent systems on shell primitives, not custom tool schemas.

Custom tools create lock-in. If you define a "search_files" tool with a custom JSON schema, your agent only works with your tool. If your agent runs `grep -r pattern .`, it works on any Unix system. The portability is inherent in the primitive.

Shell commands are composable. `find . -name "*.py" | xargs grep "def main"` chains three operations in one line. Custom tool schemas require three separate function calls. The shell's composability predates AI by five decades. It was designed for exactly this pattern: chain simple operations into complex workflows.

The convergence tells you where to invest. Do not build elaborate tool schemas. Build systems that produce, execute, and interpret shell commands. The two most well-funded AI companies in the world already validated this architecture by building it independently.

## The Open Question

OpenAI and Anthropic built the same agent loop independently. Shell commands. Feedback. Reasoning. Repeat.

If both competitors agree on the primitive, the argument is settled. The question that remains: what else have they independently converged on that nobody has noticed yet?

---

*This fusion emerged from a STEAL on the OpenAI Responses API agent loop architecture, captured from an official OpenAI diagram showing shell command execution as the agent primitive.*

<!--
STATEMENT: OpenAI and Anthropic compete on everything. They built the same agent architecture: model + shell commands + feedback loop. OpenAI invented function calling, then moved away from it. Both chose shell commands as the execution primitive. When competitors converge, you are not observing a preference. You are observing a discovery.

QUESTION: OpenAI's official agent loop diagram shows shell commands, not typed function calls. They moved away from their own invention. Anthropic's Claude Code uses the same pattern. Why are you still building custom tool schemas?

CONTRAST: The AI industry spent years building typed function calls: JSON schemas, structured inputs, explicit tool definitions. Then both OpenAI and Anthropic moved to shell commands. Fifty-year-old Unix primitives. The retreat from abstraction back to primitives. When two competitors independently do the same thing, the argument is settled.
-->
