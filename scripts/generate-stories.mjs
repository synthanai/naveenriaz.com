#!/usr/bin/env node
/**
 * generate-stories.mjs — Generate story content for 108 KNOTS using OpenRouter
 * 
 * Generates stories as individual JSON files. HTML assembly is a separate step.
 *
 * Usage:
 *   node generate-stories.mjs --series 1           (knots 1-12)
 *   node generate-stories.mjs --series 2           (knots 13-24)
 *   node generate-stories.mjs --all                (all 108)
 *   node generate-stories.mjs --knot 14            (single knot)
 *   node generate-stories.mjs --status             (show progress)
 *
 * Flags:
 *   --force    Overwrite existing story files
 *
 * Output: 5-text/posts/108-knots-organisations-2026/stories/001.json, 002.json, ...
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../../../');
const POSTS_BASE = path.join(REPO_ROOT, '5-text/posts/108-knots-organisations-2026');
const STORIES_DIR = path.join(POSTS_BASE, 'stories');

const API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'z-ai/glm-5';

const SERIES_MAP = {
  1: 'identity', 2: 'culture', 3: 'trust',
  4: 'decisions', 5: 'change', 6: 'intelligence',
  7: 'structure', 8: 'capability', 9: 'energy',
};

// ─── Helpers ─────────────────────────────────────────────────

function pad(n) { return String(n).padStart(3, '0'); }

function getSeriesForKnot(num) {
  const seriesNum = Math.ceil(num / 12);
  return { num: seriesNum, name: SERIES_MAP[seriesNum] };
}

function getLinkedInPost(knotNum) {
  const series = getSeriesForKnot(knotNum);
  const seriesDir = path.join(POSTS_BASE, `series-${series.num}-${series.name}`);
  if (!fs.existsSync(seriesDir)) return null;
  const files = fs.readdirSync(seriesDir).filter(f => f.startsWith(pad(knotNum)));
  if (files.length === 0) return null;
  const content = fs.readFileSync(path.join(seriesDir, files[0]), 'utf-8');
  const knotName = files[0].replace(/^\d+-/, '').replace('.md', '');
  const parts = content.split('---');
  const lines = parts[0].trim().split('\n').filter(l => l.trim());
  const punchMatch = content.match(/💡\s*(.+)/);
  const punch = punchMatch ? punchMatch[1].trim() : '';
  return { lines, punch, name: knotName, series };
}

function storyPath(knotNum) {
  return path.join(STORIES_DIR, `${pad(knotNum)}.json`);
}

function hasStory(knotNum) {
  return fs.existsSync(storyPath(knotNum));
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── Prompt ──────────────────────────────────────────────────

function buildPrompt(knotNum, post) {
  const title = post.name.replace(/-/g, ' ');
  const seriesName = post.series.name;
  const titleCap = title.replace(/\b\w/g, c => c.toUpperCase());
  const hashTitle = '#' + titleCap.replace(/\s+/g, ' #');

  return {
    system: `You are writing micro-stories for "108 KNOTS: Untangling Organizations." Each story follows an EXACT 5-beat structure. Study these examples:

EXAMPLE 1 (Purpose Amnesia):
"You know what happens to the mission statement.
First it's on a poster. Then it's in an onboarding deck.
Then it's nowhere.

I spent sixteen years at the same company.
Somewhere around year eleven, I stopped being able to answer: why are we here?
Not the investor pitch. The actual reason.
I had helped build it, and I still forgot it.

It didn't vanish in a crisis. It just thinned out.
One "let's be practical" at a time.
In Tamil, we call this "marappu."
The forgetting that happens from busyness, not negligence.
It's what happens when the noise of execution drowns the signal of intent.

Try this in your next 1-on-1 with a new hire.
Don't ask them what their goals are.
Ask them: "why does this team exist?"
Watch them struggle to find the words.

That silence isn't their fault. It has a name. #Purpose #Amnesia.
And once you see it, you can't unsee it."

EXAMPLE 2 (Identity Fragility):
"You've seen it take exactly one bad quarter.
The values that were "non-negotiable" suddenly have a price tag.
The commitment to quality becomes "strategic flexibility."
The promise of transparency becomes "controlled messaging."

I've been in the room when the compromises happen.
We didn't set out to be hypocrites. We just hadn't tested our beliefs.
Everything we believed had been free to believe.
And free beliefs are the first to break when the storm hits.

This isn't about weak commitment. It's about untested commitment.
In materials science, resilience is measured by yield strength:
The exact point of stress where a metal permanently deforms.
Your identity is only as real as the revenue you're willing to lose to keep it.

Run a stress test on your core value today.
"If keeping this value cost us 20% of our revenue, would we still keep it?"
If the honest answer is no, stop calling it an identity. Call it a preference.

That brittleness has a name. #Identity #Fragility.
And once you see it, you can't unsee it."

EXAMPLE 3 (Vision Inflation):
"'We're going to change the world.'
You've heard the CEO say it at the all-hands. The investor pitch. The offsite.
You've heard it so many times it's become background noise.
Meanwhile, the printer is still broken and nobody knows the Q3 budget.

I've written those soaring vision statements.
Because grand vision generates dopamine. It attracts talent, excites investors, fills rooms.
Speaking about the future is intoxicating. Building it is mundane.
I let the vision become a substitute for the work, instead of a guide for it.

This isn't delusion. It's addiction.
The CEO lives at 40,000 feet. The team lives at sea level.
In physiology, altitude sickness causes confusion and impaired judgment.
The oxygen difference between the vision and the reality is causing hallucinations on both sides.

Look at your team's work this week.
Can you draw a straight, undeniable line from Tuesday's task to the grand vision?
If you can't, the vision isn't too big. It's just too far away to matter.

That vertigo has a name. #Vision #Inflation.
And once you see it, you can't unsee it."

RULES:
1. EXACTLY 5 paragraphs following this structure:
   Beat 1: OBSERVATION — "You've seen/heard/been in..." Second person, present tense. Concrete workplace scene.
   Beat 2: CONFESSION — "I've done this too..." First person past tense. Personal from 16 years in tech.
   Beat 3: CROSS-DOMAIN ANALOGY — "This is like... In [science/data/engineering/physiology]..." Connect to a concept from another field. This is ESSENTIAL.
   Beat 4: ACTIONABLE PROBE — Direct instruction. "Do this tomorrow..." or "Ask this question..."
   Beat 5: NAMING — "That [noun] has a name. ${hashTitle}.\nAnd once you see it, you can't unsee it."

2. VOICE: Direct. Short sentences. No corporate speak. No motivational poster tone. Slightly world-weary, deeply knowing.

3. CROSS-DOMAIN ANALOGY is mandatory. Use references from: materials science, data science, physiology, physics, biology, network theory, music theory, architecture. NOT management theory.

4. DO NOT use Tamil words or Indian cultural references. The examples above use them very rarely (1 per 12 stories). Do not force them.

5. NO HTML tags. Plain text only. Separate paragraphs with blank lines.

6. Keep under 200 words total.

7. The last paragraph MUST end with exactly:
"That [one-word noun] has a name. ${hashTitle}.
And once you see it, you can't unsee it."`,

    user: `Write the story for KNOT #${pad(knotNum)}: ${titleCap}
Series: Untangling ${seriesName.charAt(0).toUpperCase() + seriesName.slice(1)}

LinkedIn post (core message):
${post.lines.join('\n')}

Punch insight: "${post.punch}"

Follow the 5-beat structure exactly. Remember: observation, confession, cross-domain analogy, actionable probe, naming.`
  };
}

// ─── API ─────────────────────────────────────────────────────

function callOpenRouter(systemPrompt, userPrompt) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.75,
      max_tokens: 2000,
    });
    const url = new URL(API_URL);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://synthai.biz/',
        'X-Title': '108 KNOTS Story Generator',
        'Content-Length': Buffer.byteLength(payload),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const msg = json.choices?.[0]?.message || {};
          const content = (msg.content || '').trim();
          
          if (!content) {
            reject(new Error(`Empty content from ${MODEL}`));
          } else {
            resolve(content);
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}\n${data.slice(0, 300)}`));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(180000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.write(payload);
    req.end();
  });
}

// ─── Generate one ────────────────────────────────────────────

async function generateOne(knotNum, force) {
  const post = getLinkedInPost(knotNum);
  if (!post) {
    console.log(`  ⚠️  #${pad(knotNum)}: no source post, skipping`);
    return false;
  }

  if (hasStory(knotNum) && !force) {
    console.log(`  ⏭️  #${pad(knotNum)}: already generated, skipping`);
    return true;
  }

  const title = post.name.replace(/-/g, ' ');
  process.stdout.write(`  🤖 #${pad(knotNum)} ${title}... `);

  const { system, user } = buildPrompt(knotNum, post);

  const MAX_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const story = await callOpenRouter(system, user);

      const cleanStory = story
        .replace(/<\/?p>/g, '')
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<\/?strong>/g, '')
        .replace(/<\/?em>/g, '')
        .trim();

      const paragraphs = cleanStory.split(/\n\s*\n/).filter(p => p.trim());

      const record = {
        knot: knotNum,
        title: title,
        series: post.series.name,
        series_num: post.series.num,
        model: MODEL,
        generated_at: new Date().toISOString(),
        paragraphs: paragraphs.map(p => p.trim()),
        word_count: cleanStory.split(/\s+/).length,
      };

      fs.writeFileSync(storyPath(knotNum), JSON.stringify(record, null, 2));
      console.log(`✅ ${record.word_count}w, ${paragraphs.length}¶`);
      return true;

    } catch (err) {
      if (attempt < MAX_RETRIES) {
        process.stdout.write(`⟳ `);
        await sleep(3000);
      } else {
        console.log(`❌ ${err.message.slice(0, 60)}`);
        return false;
      }
    }
  }
}

// ─── Main ────────────────────────────────────────────────────

const args = process.argv.slice(2);
const force = args.includes('--force');

// Ensure output dir
fs.mkdirSync(STORIES_DIR, { recursive: true });

// --status
if (args.includes('--status')) {
  let total = 0, done = 0;
  console.log('\n  108 KNOTS Story Generation Status\n');
  for (let i = 1; i <= 108; i++) {
    const has = hasStory(i);
    const post = getLinkedInPost(i);
    const name = post ? post.name.replace(/-/g, ' ') : '???';
    if (has) done++;
    total++;
    if (i % 12 === 1) {
      const s = getSeriesForKnot(i);
      console.log(`\n  Series ${s.num}: ${s.name.toUpperCase()}`);
    }
    console.log(`  ${has ? '✅' : '⬜'} #${pad(i)} ${name}`);
  }
  console.log(`\n  Total: ${done}/${total}\n`);
  process.exit(0);
}

// --series N
const seriesIdx = args.indexOf('--series');
if (seriesIdx >= 0) {
  const seriesNum = parseInt(args[seriesIdx + 1], 10);
  const start = (seriesNum - 1) * 12 + 1;
  const end = seriesNum * 12;
  const name = SERIES_MAP[seriesNum]?.toUpperCase();

  console.log(`\n  ═══ Series ${seriesNum}: ${name} (#${pad(start)}-#${pad(end)}) ═══`);
  console.log(`  Model: ${MODEL} | Force: ${force}\n`);

  let ok = 0, fail = 0;
  for (let i = start; i <= end; i++) {
    const success = await generateOne(i, force);
    if (success) ok++; else fail++;
    if (i < end) await sleep(1500);
  }

  console.log(`\n  Done: ${ok} ✅  ${fail} ❌\n`);
  process.exit(fail > 0 ? 1 : 0);
}

// --all
if (args.includes('--all')) {
  console.log(`\n  ═══ Generating ALL 108 stories ═══`);
  console.log(`  Model: ${MODEL} | Force: ${force}\n`);

  let totalOk = 0, totalFail = 0;
  for (let s = 1; s <= 9; s++) {
    const start = (s - 1) * 12 + 1;
    const end = s * 12;
    console.log(`\n  ── Series ${s}: ${SERIES_MAP[s].toUpperCase()} ──\n`);
    let ok = 0, fail = 0;
    for (let i = start; i <= end; i++) {
      const success = await generateOne(i, force);
      if (success) ok++; else fail++;
      if (i < end) await sleep(1500);
    }
    totalOk += ok; totalFail += fail;
    console.log(`  → ${ok} ✅  ${fail} ❌`);
    if (s < 9) await sleep(3000);
  }

  console.log(`\n  ═══ ALL DONE: ${totalOk} ✅  ${totalFail} ❌ ═══\n`);
  process.exit(totalFail > 0 ? 1 : 0);
}

// --knot N
const knotIdx = args.indexOf('--knot');
if (knotIdx >= 0) {
  const knotNum = parseInt(args[knotIdx + 1], 10);
  console.log(`\n  🧶 Generating KNOT #${pad(knotNum)}\n`);
  const ok = await generateOne(knotNum, force);
  process.exit(ok ? 0 : 1);
}

console.log(`Usage:
  --knot <N>       Single knot
  --series <1-9>   Batch of 12
  --all            All 108
  --status         Show progress
  --force          Overwrite existing`);
