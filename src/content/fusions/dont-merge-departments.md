---
title: "Don't Merge Departments, Prune Them: What AI Taught Us About Organisational Design"
display_title: "Don't Merge Departments, Prune Them"
display_subtitle: "AI researchers proved that merging specialists always destroys precision. The same maths applies to your org chart."
date: 2026-03-21
categories: ["living-orgs", "ai-emergence"]
tags: ["mixture-of-experts", "org-design", "restructuring", "mergers", "reap", "routing", "mind-body-soul"]
description: "Merging two experts creates an irreducible routing error. The same principle explains why most department mergers fail."
source_research: "concepts/organization-as-moe/research.md"
fusion_type: "public"
fusion_nool:
  nokkam: "Expose why department mergers fail using a formal proof from AI model compression"
  vadivam: "Pattern: Neural network architecture × Organisational design theory"
  sangilai: "Reader rethinks the next merger, restructure, or 'team consolidation' on their calendar"
fusion_point:
  ideas:
    - "Mixture-of-Experts neural network architecture"
    - "Organisational restructuring and department mergers"
    - "Routing intelligence as tacit organisational knowledge"
---

# Don't Merge Departments, Prune Them

Your organisation already is a neural network. You just haven't noticed.

## Familiar Ground

Every company has specialists. Engineering builds. Marketing tells the story. Legal says no. Finance keeps score. These teams exist because specialisation works. Nobody debates that.

The debate starts when the budget shrinks. The CEO looks at the org chart and sees redundancy. Two teams doing "similar" things. The consulting deck arrives: "Consolidate for efficiency." The merger is announced. Marketing and Communications become "MarComms." DevOps and Platform Engineering become "Infrastructure." The headcount drops. The quarterly report looks better.

You have seen this. You may have survived it.

## Counter-Signal

In October 2025, researchers at Cerebras published a paper called REAP (Router-weighted Expert Activation Pruning). They were trying to make large AI models smaller. These models, called Mixture-of-Experts, work exactly like your organisation: multiple specialist sub-networks, each trained to handle one type of problem, with a learned "router" that sends each input to the right specialist.

The researchers tested two compression strategies. **Merging** (combine two specialists into one) and **pruning** (remove the least-used specialists entirely).

The result was unambiguous: pruning always won. On generative tasks, from 20-billion to 1-trillion parameters, across every benchmark.

And the reason is what matters.

## 💥 The Collision Point

Here is where the maths of neural networks collides with the politics of organisational restructuring.

When you **merge two AI experts** into one, you destroy the router's ability to distinguish between them. The router was trained to send Token Type A to Expert 1 and Token Type B to Expert 2 for different reasons. Merge them into Expert 12, and the router can no longer recover the distinction. The researchers named this the **irreducible merging error**. Irreducible, because no amount of optimisation can fix it. The information loss is in the routing, not the experts.

When you **merge two departments**, the same thing happens. The people who used to know "ask Team A for brand strategy, ask Team B for demand generation" now face a merged "MarComms" and cannot recover the distinction. Some never learn the new routing. Others stop asking entirely. The institutional knowledge of who does what, knowledge that lived in the minds of the people who directed work to them, not in the teams themselves, is gone.

This is not a metaphor. It is the same mathematical structure. Specialised units with a learned routing function. Merge the units, break the routing. The error is irreducible because the routing intelligence was distributed across the organisation, and it was destroyed the moment the merger was announced.

**Pruning** works because it removes experts the model rarely activates. The remaining experts keep their routing precision intact. In organisational terms: eliminate the team nobody routes to. The teams that remain still know exactly who they are and what they do.

There is a deeper surprise. When the REAP researchers measured which experts had the highest "activation mass" (the most routing traffic), they expected the newest, most recently added layers to dominate. They were wrong. **Early layers, the foundational capabilities, carried the most activation mass.** In organisations, this translates directly: your HR, training, and culture functions (the "foundational layers" that restructurings cut first) may be the highest-activation components you have.

## The New Pattern

| Merging Mindset | Pruning Mindset |
|:---|:---|
| Combine similar teams for efficiency | Remove unused teams; keep routing intact |
| Cut foundational functions first ("overhead") | Foundational layers carry the highest activation, cut last |
| Restructure based on industry benchmarks | Observe YOUR routing patterns before restructuring |
| Faster is better | Observe before optimising |
| Reduce headcount | Reduce routing confusion |

The REAP researchers also discovered something elegant. Instead of permanently removing experts (layoffs), you can **cache** them: keep all specialists available, but pre-load the frequently-used ones into fast memory. The organisational equivalent is moving low-activation teams to advisory, on-call, or part-time roles. Full knowledge preserved. Zero routing breakage. Lower cost.

This is not "keep everyone on payroll." It is a precise intervention. You measure activation (who gets routed to, how often, for what). You keep the high-activation teams in fast access. You move the low-activation teams to slower access. Nobody's knowledge is destroyed.

## The Open Question

Your next restructuring is probably already on someone's calendar. Before you merge two teams, consider: do you know the routing intelligence that will be destroyed?

And if you cannot map it, should you be merging at all?

---

*This collision emerged from a STEAL on 0xSero's REAP MoE compression research (arXiv:2510.13999). The concept that grounded it lives in [Organization as Mixture-of-Experts](file:///Users/naveen/Documents/Documents%20-%20M1/My%20Books/SYNTHAI/synthai-master-repo/2-research/concepts/organization-as-moe/research.md).*

<!--
STATEMENT: AI researchers just proved that merging specialists always destroys precision. The error is irreducible. The same maths applies to every department merger on your calendar.

QUESTION: When you merge two departments, who loses the knowledge of "who to ask for what"? Not the teams. The people who used to route work to them. That routing intelligence is destroyed the moment the merger is announced. Can you map it?

CONTRAST: Most restructurings merge teams to save money. REAP, a neural network compression method, proved that pruning (removing unused specialists) always outperforms merging, because merging destroys routing precision. Your org chart is a neural network. Act accordingly.
-->
