#!/usr/bin/env node
/**
 * generate-story-card.mjs — Generate story cards using OpenRouter
 * 
 * Usage:
 *   node generate-story-card.mjs --knot 14              (single knot)
 *   node generate-story-card.mjs --series 1             (batch: knots 1-12)
 *   node generate-story-card.mjs --series 2             (batch: knots 13-24)
 *   node generate-story-card.mjs --all                  (all 108, series by series)
 *   node generate-story-card.mjs --status               (show status)
 *   node generate-story-card.mjs --strip                (remove ALL story cards)
 *
 * Flags:
 *   --force    Overwrite existing story cards
 *   --dry      Preview prompt, no API call (single knot only)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../../../');
const POSTS_BASE = path.join(REPO_ROOT, '5-text/posts/108-knots-organisations-2026');
const ALL_CARDS = path.join(POSTS_BASE, 'cards/all-cards.html');

const API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'z-ai/glm-5';

const SERIES_MAP = {
  1: 'identity', 2: 'culture', 3: 'trust',
  4: 'decisions', 5: 'change', 6: 'intelligence',
  7: 'structure', 8: 'capability', 9: 'energy',
};

// ─── Helpers ─────────────────────────────────────────────────

function getSeriesForKnot(num) {
  const seriesNum = Math.ceil(num / 12);
  return { num: seriesNum, name: SERIES_MAP[seriesNum] };
}

function getLinkedInPost(knotNum) {
  const paddedNum = String(knotNum).padStart(3, '0');
  const series = getSeriesForKnot(knotNum);
  const seriesDir = path.join(POSTS_BASE, `series-${series.num}-${series.name}`);
  if (!fs.existsSync(seriesDir)) return null;
  const files = fs.readdirSync(seriesDir).filter(f => f.startsWith(paddedNum));
  if (files.length === 0) return null;
  const content = fs.readFileSync(path.join(seriesDir, files[0]), 'utf-8');
  const knotName = files[0].replace(/^\d+-/, '').replace('.md', '');
  const parts = content.split('---');
  const lines = parts[0].trim().split('\n').filter(l => l.trim());
  const punchMatch = content.match(/💡\s*(.+)/);
  const punch = punchMatch ? punchMatch[1].trim() : '';
  return { lines, punch, name: knotName, series };
}

function hasStoryCard(html, knotNum) {
  const paddedNum = String(knotNum).padStart(3, '0');
  const rowRegex = new RegExp(
    `<div class="knot-row" id="knot-${paddedNum}-row">([\\s\\S]*?)(?=<div class="knot-row" id="knot-|</body>|$)`
  );
  const m = rowRegex.exec(html);
  return m ? m[1].includes('story-card') : false;
}

function stripStoryCards(html) {
  // Remove all story-card blocks (from <!-- Story card --> to closing </div>)
  return html.replace(
    /\s*<!-- Story card \(right\) -->\s*<div class="story-card">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g,
    ''
  );
}

function removeStoryCardForKnot(html, knotNum) {
  const paddedNum = String(knotNum).padStart(3, '0');
  const regex = new RegExp(
    `(<!-- Story card \\(right\\) -->\\s*<div class="story-card">\\s*<div class="story-header">\\s*<span class="story-series">.*?</span>\\s*<span class="story-knot">KNOT #${paddedNum}:.*?</span>\\s*</div>[\\s\\S]*?</div>\\s*</div>\\s*</div>)`,
    's'
  );
  return html.replace(regex, '');
}

// ─── Prompting ───────────────────────────────────────────────

function buildPrompt(knotNum, post) {
  const paddedNum = String(knotNum).padStart(3, '0');
  const title = post.name.replace(/-/g, ' ');
  const seriesName = post.series.name;
  return {
    system: `You are Naveen Riaz, a technology leader who spent 16 years in the same organization. You write with lived experience, not theory. Your voice is:
- First person, confessional, direct
- Short sentences. No corporate speak.
- Tamil cultural references woven naturally (not forced)
- Move between personal anecdote and universal insight
- End with a question or a naming moment ("That silence has a name")
- 4-5 paragraphs, each 2-5 sentences using <br> between lines within a paragraph
- Use <p> tags for each paragraph
- Do NOT use <strong> or bold formatting
- Do NOT include hashtags, emojis, or the punch line
- Do NOT mention "knot" in the text
- Write ONLY the story paragraphs, no headers or footers
- Keep it under 200 words total`,
    user: `Write a personal story for "108 KNOTS: Untangling ${seriesName.charAt(0).toUpperCase() + seriesName.slice(1)}", KNOT #${paddedNum}: ${title}

Here is the LinkedIn 7-line post that captures the core message:
${post.lines.join('\n')}

The punch insight is: "${post.punch}"

Write a personal, confessional micro-story that expands on this theme. Draw from your 16 years of organizational experience. Make it feel like you're telling a friend over coffee, not writing an article.`
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
          let content = msg.content || '';
          
          // Fallback: some models put output in reasoning
          if (!content.trim() && msg.reasoning) {
            content = msg.reasoning;
          }
          if (!content.trim() && msg.reasoning_details) {
            content = msg.reasoning_details
              .map(d => d.text || '')
              .filter(t => t.trim())
              .join('\n');
          }
          
          if (!content.trim()) {
            reject(new Error(`Empty response from ${MODEL}`));
          } else {
            resolve(content.trim());
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

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── HTML Builder ────────────────────────────────────────────

function buildStoryCardHtml(knotNum, post, storyHtml) {
  const paddedNum = String(knotNum).padStart(3, '0');
  const title = post.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const seriesName = post.series.name.charAt(0).toUpperCase() + post.series.name.slice(1);
  return `
    <!-- Story card (right) -->
    <div class="story-card">
      <div class="story-header">
        <span class="story-series"><span style="color:#2874A6; font-weight:700">Untangling</span> <span style="color:#D4A843; font-weight:700">${seriesName}</span></span>
        <span class="story-knot">KNOT #${paddedNum}: ${title}</span>
      </div>
      <div class="story-body">
        ${storyHtml}
      </div>
      <div class="story-footer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 108" overflow="visible">
  <text x="10" y="88" font-family="Inter, Outfit, Helvetica, Arial, sans-serif" font-size="108" letter-spacing="1.5">
    <tspan fill="#2874A6" font-weight="400">www.</tspan><tspan fill="#D4A843" font-weight="700">naveen</tspan><tspan fill="#D4A843" font-weight="400">riaz</tspan><tspan fill="#27AE60" font-weight="400">.com</tspan>
  </text>
</svg>
      </div>
    </div>`;
}

function injectStoryCard(html, knotNum, storyCardHtml) {
  const paddedNum = String(knotNum).padStart(3, '0');
  const regex = new RegExp(
    `(<div class="knot-num">KNOT #${paddedNum}</div>\\s*</div>)\\s*(</div>)`,
    's'
  );
  return html.replace(regex, `$1\n    ${storyCardHtml}\n    $2`);
}

// ─── Generate one knot ───────────────────────────────────────

async function generateOne(knotNum, force) {
  const paddedNum = String(knotNum).padStart(3, '0');
  
  const post = getLinkedInPost(knotNum);
  if (!post) {
    console.log(`  ⚠️  #${paddedNum}: no LinkedIn post found, skipping`);
    return false;
  }

  let html = fs.readFileSync(ALL_CARDS, 'utf-8');

  if (hasStoryCard(html, knotNum)) {
    if (!force) {
      console.log(`  ⏭️  #${paddedNum}: already has story, skipping`);
      return true;
    }
    // Remove existing story card for this knot
    html = removeStoryCardForKnot(html, knotNum);
    fs.writeFileSync(ALL_CARDS, html);
  }

  const { system, user } = buildPrompt(knotNum, post);
  const title = post.name.replace(/-/g, ' ');

  process.stdout.write(`  🤖 #${paddedNum} ${title}... `);
  
  try {
    const storyContent = await callOpenRouter(system, user);
    
    let cleanedStory = storyContent;
    if (!cleanedStory.includes('<p>')) {
      cleanedStory = cleanedStory
        .split('\n\n')
        .filter(p => p.trim())
        .map(p => `<p>${p.trim().replace(/\n/g, '<br>')}</p>`)
        .join('\n        ');
    }

    const storyCardHtml = buildStoryCardHtml(knotNum, post, cleanedStory);
    
    // Re-read in case file changed
    html = fs.readFileSync(ALL_CARDS, 'utf-8');
    const updatedHtml = injectStoryCard(html, knotNum, storyCardHtml);
    
    if (updatedHtml === html) {
      console.log(`❌ injection failed`);
      return false;
    }

    fs.writeFileSync(ALL_CARDS, updatedHtml);
    console.log(`✅ (${storyContent.length} chars)`);
    return true;

  } catch (err) {
    console.log(`❌ ${err.message.slice(0, 80)}`);
    return false;
  }
}

// ─── Main ────────────────────────────────────────────────────

const args = process.argv.slice(2);
const force = args.includes('--force');

// --status
if (args.includes('--status')) {
  const html = fs.readFileSync(ALL_CARDS, 'utf-8');
  let total = 0, done = 0;
  console.log('\n  108 KNOTS Story Card Status\n');
  for (let i = 1; i <= 108; i++) {
    const has = hasStoryCard(html, i);
    const post = getLinkedInPost(i);
    const name = post ? post.name.replace(/-/g, ' ') : '???';
    const icon = has ? '✅' : '⬜';
    if (has) done++;
    total++;
    if (i % 12 === 1) {
      const s = getSeriesForKnot(i);
      console.log(`\n  Series ${s.num}: ${s.name.toUpperCase()}`);
    }
    console.log(`  ${icon} #${String(i).padStart(3, '0')} ${name}`);
  }
  console.log(`\n  Total: ${done}/${total}\n`);
  process.exit(0);
}

// --strip
if (args.includes('--strip')) {
  console.log('\n  🗑️  Stripping ALL story cards from all-cards.html...');
  let html = fs.readFileSync(ALL_CARDS, 'utf-8');
  const before = (html.match(/story-card/g) || []).length;
  html = stripStoryCards(html);
  fs.writeFileSync(ALL_CARDS, html);
  const after = (html.match(/story-card/g) || []).length;
  console.log(`  Removed ${before - after} story-card occurrences (${after} remain in CSS)`);
  console.log(`  Done.\n`);
  process.exit(0);
}

// --series N
const seriesIdx = args.indexOf('--series');
if (seriesIdx >= 0) {
  const seriesNum = parseInt(args[seriesIdx + 1], 10);
  if (seriesNum < 1 || seriesNum > 9) {
    console.error('Series must be 1-9');
    process.exit(1);
  }
  const start = (seriesNum - 1) * 12 + 1;
  const end = seriesNum * 12;
  const seriesName = SERIES_MAP[seriesNum].toUpperCase();
  
  console.log(`\n  ═══════════════════════════════════════════`);
  console.log(`  Series ${seriesNum}: ${seriesName} (Knots #${String(start).padStart(3,'0')}-#${String(end).padStart(3,'0')})`);
  console.log(`  Model: ${MODEL}`);
  console.log(`  Force: ${force}`);
  console.log(`  ═══════════════════════════════════════════\n`);
  
  let ok = 0, fail = 0;
  for (let i = start; i <= end; i++) {
    const success = await generateOne(i, force);
    if (success) ok++; else fail++;
    if (i < end) await sleep(1000); // Rate limit
  }
  
  console.log(`\n  ───────────────────────────────────────────`);
  console.log(`  Series ${seriesNum} complete: ${ok} ✅  ${fail} ❌`);
  console.log(`  ───────────────────────────────────────────\n`);
  process.exit(fail > 0 ? 1 : 0);
}

// --all
if (args.includes('--all')) {
  console.log(`\n  ═══════════════════════════════════════════`);
  console.log(`  Generating ALL 108 story cards`);
  console.log(`  Model: ${MODEL}`);
  console.log(`  Force: ${force}`);
  console.log(`  ═══════════════════════════════════════════\n`);
  
  let totalOk = 0, totalFail = 0;
  for (let s = 1; s <= 9; s++) {
    const start = (s - 1) * 12 + 1;
    const end = s * 12;
    const seriesName = SERIES_MAP[s].toUpperCase();
    console.log(`\n  ── Series ${s}: ${seriesName} ──\n`);
    
    let ok = 0, fail = 0;
    for (let i = start; i <= end; i++) {
      const success = await generateOne(i, force);
      if (success) ok++; else fail++;
      if (i < end) await sleep(1000);
    }
    totalOk += ok;
    totalFail += fail;
    console.log(`  → ${ok} ✅  ${fail} ❌`);
    if (s < 9) await sleep(2000); // Pause between series
  }
  
  console.log(`\n  ═══════════════════════════════════════════`);
  console.log(`  ALL DONE: ${totalOk} ✅  ${totalFail} ❌`);
  console.log(`  ═══════════════════════════════════════════\n`);
  process.exit(totalFail > 0 ? 1 : 0);
}

// --knot N (single)
const knotIdx = args.indexOf('--knot');
if (knotIdx >= 0) {
  const knotNum = parseInt(args[knotIdx + 1], 10);
  const isDry = args.includes('--dry');
  const paddedNum = String(knotNum).padStart(3, '0');
  
  if (isDry) {
    const post = getLinkedInPost(knotNum);
    const { system, user } = buildPrompt(knotNum, post);
    console.log('\n  === SYSTEM PROMPT ===');
    console.log(system);
    console.log('\n  === USER PROMPT ===');
    console.log(user);
    console.log('\n  (dry run)\n');
    process.exit(0);
  }
  
  console.log(`\n  🧶 Generating KNOT #${paddedNum}\n`);
  const ok = await generateOne(knotNum, force);
  process.exit(ok ? 0 : 1);
}

console.log(`Usage:
  node generate-story-card.mjs --knot <N>       Single knot
  node generate-story-card.mjs --series <1-9>   Batch of 12
  node generate-story-card.mjs --all            All 108
  node generate-story-card.mjs --status         Show status
  node generate-story-card.mjs --strip          Remove all stories

  Flags: --force  --dry`);
