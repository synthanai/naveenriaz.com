const content = `---
title: "The No-Escape Theorem: Why Your AI Will Always Forget"
date: 2026-04-12
quote_bottom: "Stop 'fixing' semantic memory."
---

Your RAG system is dying.

It started perfectly. You gave your AI agent a few
hundred documents, a vector database, and some sleek
embedding models. Retrieval was crisp. Accuracy was 90%
+. You felt like you had cracked the code for
"long-term memory."

Then you added the next thousand documents. Then ten
thousand.`;

const match = content.match(/^---\n([\s\S]*?)\n---/);
let fmStr = match[1];
fmStr += '\norigin_nodes: []';

const newContent = content.replace(match[1], fmStr);
console.log(newContent);
