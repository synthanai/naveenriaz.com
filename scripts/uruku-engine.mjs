#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '../src/content');
const CAMPAIGNS_DIR = path.join(__dirname, '../.campaigns');

// ─── Phase 5: Campaign (STUB Spawn) ───────────────────────────────────────
function buildCampaign(campaignName) {
  console.log(`\n🔥 URUKU ENGINE: Spawning STUBs for campaign [${campaignName}]`);
  
  let campaignData;
  const campaignFile = path.join(CAMPAIGNS_DIR, `${campaignName}.json`);
  if (fs.existsSync(campaignFile)) {
    campaignData = JSON.parse(fs.readFileSync(campaignFile, 'utf8'));
  } else if (campaignName === 'phase5-shadows') {
    campaignData = {
      name: 'Phase 5: Against Type',
      stubs: [
        { type: 'sparks', truth: { valence: 'dark' }, hook: "The Signal I Chased for Six Months That Was Noise" },
        { type: 'fusions', truth: { valence: 'mixed' }, hook: "Two Ideas That Should Have Connected But Didn't" },
        { type: 'knots', truth: { valence: 'dark' }, hook: "The Knot I Tied" },
        { type: 'beads', truth: { valence: 'dark' }, hook: "The Lesson That Came Too Late" },
        { type: 'spars', truth: { valence: 'dark' }, hook: "The SPAR I Lost" }
      ]
    };
  } else {
    console.error(`ERROR: Campaign ${campaignName} not found.`);
    process.exit(1);
  }

  const todayDate = new Date().toISOString().split('T')[0];

  campaignData.stubs.forEach(stub => {
    const safeTitle = stub.hook.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const outDir = path.join(CONTENT_DIR, stub.type);
    if (!fs.existsSync(outDir)) { fs.mkdirSync(outDir, { recursive: true }); }
    const outFile = path.join(outDir, `${todayDate}-${safeTitle}.md`);
    
    // We only spawn if it doesn't already exist to prevent overwrites
    if (!fs.existsSync(outFile)) {
      // Schema-aware frontmatter per atom type
      const schemaFields = {
        sparks: [
          `signal: "STUB: Awaiting human capture."`,
          `source: "SYNTHAI"`,
          `temperature: "🔥🔥"`,
          `tags: ["phase5", "shadow", "against-type"]`,
          `description: ""`,
        ],
        fusions: [
          `categories: ["shadow"]`,
          `tags: ["phase5", "shadow", "against-type"]`,
          `description: ""`,
        ],
        knots: [
          `knot_number: 0`,
          `domain: "personal"`,
          `series: "shadow"`,
          `series_number: 0`,
          `slug_name: "${safeTitle}"`,
          `description: ""`,
          `punch_line_1: ""`,
          `punch_line_2: ""`,
        ],
        beads: [
          `essence: "STUB: Awaiting human capture."`,
          `resonance: ""`,
        ],
        spars: [
          `description: ""`,
          `tags: ["phase5", "shadow", "against-type"]`,
        ],
        claws: [
          `grip: ""`,
          `release: ""`,
          `resonance: ""`,
        ],
        wows: [ `essence: ""` ],
        awes: [ `essence: ""` ],
        syncs: [ `essence: ""` ],
        digs: [ `essence: ""` ],
      };

      const extra = (schemaFields[stub.type] || []).join('\n');

      const yaml = [
        '---',
        `title: "${stub.hook}"`,
        `date: ${todayDate}`,
        extra,
        `valence: "${stub.truth.valence}"`,
        `origin_nodes: []`,
        `status: "awaiting-human"`,
        '---',
        '',
        `## Capture Request (Campaign: ${campaignData.name})`,
        '',
        `**Hook:** ${stub.hook}`,
        `**Instructions:** Write this ${stub.type.replace(/s$/, '')} in your own voice. Break the expected valence of the primitive.`,
        `Embrace the shadow side.`
      ].join('\n');

      fs.writeFileSync(outFile, yaml);
      console.log(`  ✅ Staged STUB: ${outFile}`);
    } else {
      console.log(`  ⚠️  Skipped (Already exists): ${outFile}`);
    }
  });
  console.log(`\nURUKU CAMPAIGN QUEUED.\n`);
}

// ─── Frontmatter Parsing Helpers (Hardened) ──────────────────────────
function parseFM(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fmStr = match[1];
  const obj = {};
  
  // Hardened regex for top-level keys: looks for Start-of-Line [key]: [value]
  // Handles multi-line values by capturing until the next top-level key
  const keyRegex = /^([a-zA-Z0-9_-]+):\s*([\s\S]*?)(?=\n[a-zA-Z0-9_-]+:|$)/gm;
  let m;
  while ((m = keyRegex.exec(fmStr)) !== null) {
    const k = m[1].trim();
    let v = m[2].trim();
    
    // Simple array parsing
    if (v.startsWith('[') && v.endsWith(']')) {
      const inner = v.slice(1, -1).trim();
      obj[k] = inner ? inner.split(',').map(s => s.trim().replace(/^["']|["']$/g, '')) : [];
    } else if (v.startsWith('- ')) {
      // Simple multi-line list (YAML style)
      obj[k] = v.split('\n').map(li => li.replace(/^- /, '').trim().replace(/^["']|["']$/g, ''));
    } else {
      obj[k] = v.replace(/^["']|["']$/g, '');
    }
  }
  return obj;
}

function stringifyFMArray(arr) {
  if (!arr || arr.length === 0) return '[]';
  return '[' + arr.map(a => `"${a}"`).join(', ') + ']';
}

function getFilesTree(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(getFilesTree(full));
    } else if (full.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

// ─── Phase 7: Backfill ────────────────────────────────────────────────
function runBackfill(dryRun) {
  console.log(`\n🔥 URUKU ENGINE: Semantic Tag Backfill`);
  if (dryRun) console.log(`[DRY-RUN MODE EXECUTED. No files changed.]\n`);
  
  const primDirs = fs.readdirSync(CONTENT_DIR).filter(d => fs.statSync(path.join(CONTENT_DIR, d)).isDirectory());
  const allNodes = {}; 
  
  // 1. Load everything into memory
  for (const prim of primDirs) {
    const dirPath = path.join(CONTENT_DIR, prim);
    const files = getFilesTree(dirPath);
    for (const f of files) {
      const content = fs.readFileSync(f, 'utf8');
      
      // Use relative path from content dir as ID (e.g. "knots/organizations/053...")
      const relPath = path.relative(CONTENT_DIR, f).replace(/\.md$/, '');
      const id = relPath;
      
      allNodes[id] = { 
        file: f, 
        content, 
        fm: parseFM(content), 
        newOrigins: new Set(),
        type: prim
      };
    }
  }

  // 2. Preserve existing origin_nodes array elements
  Object.values(allNodes).forEach(node => {
     if (node.fm.origin_nodes && Array.isArray(node.fm.origin_nodes)) {
        node.fm.origin_nodes.forEach(o => node.newOrigins.add(o));
     }
  });
  
  // 3. Compute Explicit connections (legacy vars)
  for (const id in allNodes) {
    const node = allNodes[id];
    
    if (node.fm.prev_knot) {
      const pTarget = node.fm.prev_knot.replace(/^["']|["']$/g, '');
      const foundKnot = Object.keys(allNodes).find(k => k.endsWith(pTarget) && k.startsWith('knots'));
      if (foundKnot) {
        node.newOrigins.add(foundKnot);
        // Force bidirectional for explicit trails
        if (allNodes[foundKnot]) allNodes[foundKnot].newOrigins.add(id);
      }
    }

    if (node.fm.next_knot) {
      const nTarget = node.fm.next_knot.replace(/^["']|["']$/g, '');
      const foundKnot = Object.keys(allNodes).find(k => k.endsWith(nTarget) && k.startsWith('knots'));
      if (foundKnot) {
        node.newOrigins.add(foundKnot);
        if (allNodes[foundKnot]) allNodes[foundKnot].newOrigins.add(id);
      }
    }
    
    if (node.fm.born_from_knot) {
      const bfn = String(node.fm.born_from_knot);
      const foundKnot = Object.keys(allNodes).find(k => k.startsWith('knots') && String(allNodes[k].fm.knot_number) === bfn);
      if (foundKnot) node.newOrigins.add(foundKnot);
    }
    
    // Spark -> Fusion logic
    if (node.fm.fusion_link) {
      const fSlug = node.fm.fusion_link.split('/').pop().replace(/^["']|["']$/g, '');
      const fusionId = Object.keys(allNodes).find(k => k.startsWith('fusions') && k.endsWith(fSlug));
      if (fusionId && allNodes[fusionId]) {
        allNodes[fusionId].newOrigins.add(id);
      }
    }
  }
  
  // 4. Compute Implicit connections (three strategies)
  const ids = Object.keys(allNodes);
  
  // Helper: extract the bare slug
  function bareSlug(id) {
    const parts = id.split('/');
    const last = parts[parts.length - 1];
    return last.replace(/^\d+-/, '');
  }
  
  // Helper: collect all semantic tokens 
  function getTokens(node) {
    const tokens = new Set();
    (node.fm.tags || []).forEach(t => tokens.add(t));
    (node.fm.categories || []).forEach(c => tokens.add(c));
    if (node.fm.series) tokens.add(node.fm.series);
    if (node.fm.domain) tokens.add(node.fm.domain);
    return tokens;
  }
  
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const idA = ids[i];
      const idB = ids[j];
      const nodeA = allNodes[idA];
      const nodeB = allNodes[idB];
      const typeA = nodeA.type;
      const typeB = nodeB.type;
      
      let connected = false;
      let reason = "";
      
      // Strategy 1: Slug-name proximity
      const slugA = bareSlug(idA);
      const slugB = bareSlug(idB);
      if (slugA && slugB && slugA === slugB) {
        connected = true;
        reason = "slug_overlap";
      }
      
      // Strategy 2: Semantic token intersection
      if (!connected) {
        const tokensA = getTokens(nodeA);
        const tokensB = getTokens(nodeB);
        const intersection = [...tokensA].filter(t => tokensB.has(t));
        if (intersection.length >= 2) {
          connected = true;
          reason = `tags [${intersection.join(',')}]`;
        }
      }
      
      // Strategy 3: slug_name field match
      if (!connected) {
        const snA = (nodeA.fm.slug_name || '').replace(/^["']|["']$/g, '');
        const snB = (nodeB.fm.slug_name || '').replace(/^["']|["']$/g, '');
        if (snA && slugB && (snA === slugB)) { connected = true; reason = "slug_name_A"; }
        if (snB && slugA && (snB === slugA)) { connected = true; reason = "slug_name_B"; }
      }
      
      if (connected) {
        // Weight order: sparks < fusions < beads/claws < knots < spars
        const weight = { sparks: 1, fusions: 2, beads: 3, claws: 3, wows: 3, awes: 3, syncs: 3, digs: 3, knots: 4, spars: 5, scars: 6, voids: 6 };
        const wA = weight[typeA] || 3;
        const wB = weight[typeB] || 3;
        
        if (wA < wB) {
          nodeB.newOrigins.add(idA);
        } else if (wB < wA) {
          nodeA.newOrigins.add(idB);
        } else if (typeA !== typeB) {
          // Cross-type same weight
          nodeA.newOrigins.add(idB);
          nodeB.newOrigins.add(idA);
        }
        // NOTE: We intentionally avoid same-type-same-weight implicit links to avoid noise 
        // unless they share very high tag volume (handled in strategy 2)
      }
    }
  }
  
  // 5. In-Place write back
  let modifiedCount = 0;
  for (const id in allNodes) {
    const node = allNodes[id];
    let content = node.content;
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) continue;
    
    let fmStr = match[1];
    let changed = false;
    
    const originsArr = Array.from(node.newOrigins);
    
    // Only bother injecting if it isn't an empty array and wasn't entirely existing logically
    const originStr = stringifyFMArray(originsArr);
    
    if (fmStr.includes('origin_nodes:')) {
      const oldMatch = fmStr.match(/origin_nodes:\s*\[([^\]]*)\]/);
      if (oldMatch) {
         const oldStrArray = oldMatch[1].split(',').map(s => s.trim().replace(/"/g, '')).filter(Boolean);
         // If lengths differ or contents differ, it changed
         if (oldStrArray.length !== originsArr.length || !originsArr.every(x => oldStrArray.includes(x))) {
           fmStr = fmStr.replace(/origin_nodes:\s*\[[^\]]*\]/, `origin_nodes: ${originStr}`);
           changed = true;
         }
      } else {
         // handle origin_nodes: [] edge cases without brackets or multiline
         fmStr = fmStr.replace(/origin_nodes:.*$/, `origin_nodes: ${originStr}`);
         changed = true;
      }
    } else {
      fmStr += `\norigin_nodes: ${originStr}`;
      changed = true;
    }
    
    // Inject missing truthFields if entirely missing
    if (!fmStr.includes('valence:')) {
      fmStr += `\nvalence: "mixed"\nfriction: ""`;
      changed = true;
    }
    
    if (changed) {
      if (!dryRun) {
        const newContent = content.replace(match[1], fmStr);
        fs.writeFileSync(node.file, newContent, 'utf8');
      }
      console.log(`  🔧 Backfilled: ${id} -> [${originsArr.length} cross-connections]`);
      modifiedCount++;
    }
  }
  console.log(`\nURUKU BACKFILL COMPLETE. Processed and updated ${modifiedCount} file mappings.\n`);
}

const args = process.argv.slice(2);
if (args.includes('--campaign')) {
  const cName = args[args.indexOf('--campaign') + 1];
  buildCampaign(cName);
} else if (args.includes('--backfill')) {
  runBackfill(args.includes('--dry-run'));
} else {
  console.log("Usage: node uruku-engine.mjs [--campaign <name>] [--backfill [--dry-run]]");
}
