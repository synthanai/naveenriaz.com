---
title: "The Missing Adversary"
date: 2026-03-20
signal: "A knowledge management system generates boundary cases to break its own claims before publishing them. Your AI writes great notes. Who checks if they are true?"
temperature: "🔥🔥"


tags: ["semantic-review", "adversarial-testing", "knowledge-quality"]
description: "Structure checks compliance. Semantic review checks truth."
quote_top: "AI validates structure, but reality demands truth and adversarial testing."
quote_bottom: "Structure is not truth."
origin_nodes: []
valence: "mixed"
friction: ""
---

Most AI-powered knowledge systems validate structure. Does the note have a title? Is the format correct? Are the links valid?

Nobody validates the claims.

A developer named Zbigniew Braniecki built something called Semantic Review: a 4-step protocol that reads each claim in a note, generates boundary cases designed to break it, checks whether cited sources actually support the assertion, and reports inconsistencies.

Structure tells you whether the document is formatted. Semantic review tells you whether it is true.

The protocol uses WARN/INFO/PASS severity (never FAIL), because in knowledge work, certainty is probabilistic.

Your knowledge base has a spell checker. It does not have an adversary.
