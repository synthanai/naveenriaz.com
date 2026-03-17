#!/usr/bin/env node
/**
 * Generate Astro content files for 108 KNOTS from the untangling-knots repo
 *
 * Reads: repos/synthai-untangling-knots/organizations/{series}/knots/{knot}/
 * Writes: repos/naveenriaz.com/src/content/knots/{slug}.md
 *
 * Usage:
 *   node scripts/generate-knots.mjs              # Generate all
 *   node scripts/generate-knots.mjs --knot 001   # Generate one
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = process.env.REPO_ROOT || path.resolve(__dirname, '../../../');
const KNOTS_REPO_BASE = path.join(REPO_ROOT, 'repos/synthai-untangling-knots');
const OUTPUT_DIR = path.join(__dirname, '../src/content/knots');

// Each domain is a separate 108-KNOT series
const DOMAINS = [
  {
    name: 'organizations',
    path: 'organizations',
    series: [
      { num: '01', name: 'identity', knotStart: 1,  knotEnd: 12 },
      { num: '02', name: 'culture',  knotStart: 13, knotEnd: 24 },
      { num: '03', name: 'trust',    knotStart: 25, knotEnd: 36 },
      { num: '04', name: 'decisions',knotStart: 37, knotEnd: 48 },
      { num: '05', name: 'change',   knotStart: 49, knotEnd: 60 },
      { num: '06', name: 'intelligence', knotStart: 61, knotEnd: 72 },
      { num: '07', name: 'structure',knotStart: 73, knotEnd: 84 },
      { num: '08', name: 'capability',knotStart: 85, knotEnd: 96 },
      { num: '09', name: 'energy',   knotStart: 97, knotEnd: 108 },
    ],
  },
  {
    name: 'education',
    path: 'education',
    series: [
      // Education series will be defined as content is written
    ],
  },
];

function readFile(p) {
  try { return fs.readFileSync(p, 'utf-8').trim(); } catch { return null; }
}

function parseKnotMd(content) {
  const meta = {};
  // Extract K (Know) question
  const kMatch = content.match(/## K — Know\s*\n\n(.+)/);
  if (kMatch) meta.feltHook = kMatch[1].trim();

  // Extract N (Name) contrarian
  const nMatch = content.match(/## N — Name\s*\n\n(.+)/);
  if (nMatch) meta.contrarian = nMatch[1].trim();

  // Extract metadata table
  const neverSayMatch = content.match(/\*\*Never Say\*\*\s*\|\s*(.+)/);
  if (neverSayMatch) meta.neverSay = neverSayMatch[1].replace(/\s*\|\s*$/, '').split(',').map(s => s.trim().replace(/"/g, '').replace(/\s*\|\s*$/, ''));

  const emotionMatch = content.match(/\*\*Emotion Target\*\*\s*\|\s*(.+)/);
  if (emotionMatch) meta.emotionTarget = emotionMatch[1].replace(/\s*\|\s*$/, '').trim();

  return meta;
}

function parsePunchMd(content) {
  const lines = content.split('\n').filter(l => l.trim());
  return {
    line1: lines[0] || '',
    line2: lines[1] || ''
  };
}

function generateKnotPage(knotDir, knotId, domain, series, prevKnotSlug, prevKnotTitle, nextKnotSlug, nextKnotTitle) {
  const paddedId = knotId.padStart(3, '0');
  const slugName = path.basename(knotDir).replace(/^\d+-/, '');

  // Read source files
  const knotMd = readFile(path.join(knotDir, 'knot.md'));
  const punchMd = readFile(path.join(knotDir, 'punch.md'));
  const storyMd = readFile(path.join(knotDir, 'story.md'));
  const untieMd = readFile(path.join(knotDir, 'untie.md'));

  if (!knotMd || !punchMd || !storyMd) {
    console.log(`  ⚠️  Skipping ${paddedId}: missing source files`);
    return null;
  }

  const meta = parseKnotMd(knotMd);
  const punch = parsePunchMd(punchMd);
  const title = slugName.replace(/-/g, ' ');

  // Build the page content: story + horizontal rule + UNTIE
  let body = '';

  // Story section
  body += storyMd + '\n\n';

  // UNTIE section (if exists)
  if (untieMd) {
    body += '---\n\n';
    body += '## The Untie\n\n';
    // Remove the UNTIE header and reformat sections
    const untieBody = untieMd
      .replace(/^#.*\n\n?/, '')       // Remove main heading
      .replace(/## U — Uproot/g, '**Uproot**')
      .replace(/## N — Navigate/g, '**Navigate**')
      .replace(/## T — Tool/g, '**Tool**')
      .replace(/## I — Implement/g, '**Implement**')
      .replace(/## E — Emerge/g, '**Emerge**');
    body += untieBody + '\n';
  }

  // Helper: safely quote a YAML string value
  function yamlStr(val) {
    if (!val) return '""';
    // If it contains double quotes, use single quotes (escaping any internal single quotes)
    if (val.includes('"')) {
      return "'" + val.replace(/'/g, "''") + "'";
    }
    // If it contains colons, hashes, or special YAML chars, wrap in double quotes
    if (/[:#\[\]{}&*!|>%@`]/.test(val) || val.startsWith(' ') || val.endsWith(' ')) {
      return '"' + val.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    }
    return '"' + val + '"';
  }

  // Build frontmatter lines
  const fmLines = [
    '---',
    `title: ${yamlStr(slugName)}`,
    `knot_number: ${parseInt(paddedId, 10)}`,
    `domain: ${yamlStr(domain.name)}`,
    `series: ${yamlStr(series.name)}`,
    `series_number: ${parseInt(series.num, 10)}`,
    `slug_name: ${yamlStr(slugName)}`,
    `date: 2026-03-17`,
    `description: ${yamlStr(meta.feltHook || title)}`,
    `punch_line_1: ${yamlStr(punch.line1)}`,
    `punch_line_2: ${yamlStr(punch.line2)}`,
  ];

  if (meta.feltHook) fmLines.push(`felt_hook: ${yamlStr(meta.feltHook)}`);
  if (meta.emotionTarget) fmLines.push(`emotion_target: ${yamlStr(meta.emotionTarget)}`);
  if (meta.neverSay) fmLines.push(`never_say: [${meta.neverSay.map(s => yamlStr(s.trim())).join(', ')}]`);
  if (prevKnotSlug) fmLines.push(`prev_knot: ${yamlStr(prevKnotSlug)}`);
  if (prevKnotTitle) fmLines.push(`prev_knot_title: ${yamlStr(prevKnotTitle)}`);
  if (nextKnotSlug) fmLines.push(`next_knot: ${yamlStr(nextKnotSlug)}`);
  if (nextKnotTitle) fmLines.push(`next_knot_title: ${yamlStr(nextKnotTitle)}`);

  fmLines.push('---');
  const cleanFrontmatter = fmLines.join('\n');

  return { domain: domain.name, slug: `${paddedId}-${slugName}`, content: cleanFrontmatter + '\n\n' + body };
}

// ─── Main ────────────────────────────────────────────────────

// Parse args
const args = process.argv.slice(2);
const knotIdx = args.indexOf('--knot');
const targetKnot = knotIdx >= 0 ? args[knotIdx + 1] : null;
const domainIdx = args.indexOf('--domain');
const targetDomain = domainIdx >= 0 ? args[domainIdx + 1] : null;

// Ensure output dir
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

let generated = 0;
let skipped = 0;

for (const domain of DOMAINS) {
  if (targetDomain && domain.name !== targetDomain) continue;
  if (domain.series.length === 0) continue;

  console.log(`\n📦 Domain: ${domain.name}`);

  // Ensure domain subdirectory
  const domainOut = path.join(OUTPUT_DIR, domain.name);
  if (!fs.existsSync(domainOut)) {
    fs.mkdirSync(domainOut, { recursive: true });
  }

  // Collect all knot dirs for this domain
  const allKnots = [];
  const knotsRepoDir = path.join(KNOTS_REPO_BASE, domain.path);

  for (const series of domain.series) {
    const seriesDir = path.join(knotsRepoDir, `${series.num}-${series.name}/knots`);
    if (!fs.existsSync(seriesDir)) continue;

    const dirs = fs.readdirSync(seriesDir)
      .filter(d => fs.statSync(path.join(seriesDir, d)).isDirectory())
      .sort();

    for (const dir of dirs) {
      const numMatch = dir.match(/^(\d+)/);
      if (!numMatch) continue;
      allKnots.push({
        id: numMatch[1],
        dir: path.join(seriesDir, dir),
        slug: `${numMatch[1]}-${dir.replace(/^\d+-/, '')}`,
        title: dir.replace(/^\d+-/, '').replace(/-/g, ' '),
        series,
        domain
      });
    }
  }

  // Generate pages for this domain
  for (let i = 0; i < allKnots.length; i++) {
    const knot = allKnots[i];
    if (targetKnot && knot.id !== targetKnot.padStart(3, '0')) continue;

    // Prev/next slugs include domain prefix for URL routing
    const prevKnot = allKnots[i - 1];
    const nextKnot = allKnots[i + 1];
    const prevSlug = prevKnot ? `${domain.name}/${prevKnot.slug}` : null;
    const prevTitle = prevKnot ? prevKnot.title : null;
    const nextSlug = nextKnot ? `${domain.name}/${nextKnot.slug}` : null;
    const nextTitle = nextKnot ? nextKnot.title : null;

    const result = generateKnotPage(knot.dir, knot.id, domain, knot.series, prevSlug, prevTitle, nextSlug, nextTitle);
    if (result) {
      const outPath = path.join(domainOut, `${result.slug}.md`);
      fs.writeFileSync(outPath, result.content);
      console.log(`  ✅ ${domain.name}/${result.slug}.md`);
      generated++;
    } else {
      skipped++;
    }
  }
}

console.log(`\n  Generated: ${generated}  Skipped: ${skipped}`);
console.log(`  Output: ${OUTPUT_DIR}\n`);
