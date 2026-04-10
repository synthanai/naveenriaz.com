---
title: "The Provenance Chain"
date: 2026-03-20
source: "Link"
source_url: "https://github.com/0xNyk/lacp"
signal: "A control plane for AI coding agents uses SHA-256 hash-chained session receipts to create tamper-evident provenance, independently reinventing the audit trail pattern."
temperature: "🔥🔥"


tags: ["provenance", "vault-kit", "audit-trail", "convergent-evolution"]
description: "When two systems independently invent the same trust architecture, the pattern is structural."
quote_top: "Blockchain architecture makes agent interactions tamper-evident with cryptographic receipts."
quote_bottom: "When trust is needed, chain it."
---

Nyk built a Local Agent Control Plane (LACP) for managing Claude and Codex agents. Its fifth memory layer is provenance: SHA-256 hash-chained session receipts that create a tamper-evident record of every agent interaction.

Each receipt contains the session ID, a hash of the previous receipt, a timestamp, and the action taken. If any entry in the chain is modified, every subsequent hash breaks.

This is the same architecture that blockchain uses for transaction integrity. And it is the same architecture that SYNTHAI uses for agent governance.

Two independent systems. Same trust problem. Same cryptographic solution.

When trust is the question, the chain is always the answer.
