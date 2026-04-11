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
      const yaml = [
        '---',
        `title: "${stub.hook}"`,
        `date: ${todayDate}`,
        `tags: ["phase5", "shadow", "against-type"]`,
        `description: ""`,
        `valence: "${stub.truth.valence}"`,
        `status: "awaiting-human"`,
        `origin_nodes: []`,
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

// ─── Frontmatter Parsing Helpers ─────────────────────────────────────
function parseFM(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fmStr = match[1];
  const obj = {};
  fmStr.split('\n').forEach(line => {
    const colon = line.indexOf(':');
    if (colon === -1) return;
    const k = line.slice(0, colon).trim();
    let v = line.slice(colon + 1).trim();
    if (v.startsWith('[') && v.endsWith(']')) {
      const inner = v.slice(1, -1).trim();
      obj[k] = inner ? inner.split(',').map(s => s.trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '')) : [];
    } else {
      obj[k] = v.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
    }
  });
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
    const files = getFilesTree(path.join(CONTENT_DIR, prim));
    for (const f of files) {
      const content = fs.readFileSync(f, 'utf8');
      const slugMatch = f.match(/([^\/]+)\.md$/);
      if (!slugMatch) continue;
      
      const slug = slugMatch[1];
      const id = `${prim}:${slug}`;
      allNodes[id] = { file: f, content, fm: parseFM(content), newOrigins: new Set() };
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
      const pSlug = node.fm.prev_knot.split('/').pop();
      const foundKnot = Object.keys(allNodes).find(k => k.startsWith('knots:') && k.includes(pSlug));
      if (foundKnot) node.newOrigins.add(foundKnot);
    }

    if (node.fm.next_knot) {
      const nSlug = node.fm.next_knot.split('/').pop();
      const nextKnotId = Object.keys(allNodes).find(k => k.startsWith('knots:') && k.includes(nSlug));
      if (nextKnotId && allNodes[nextKnotId]) {
        allNodes[nextKnotId].newOrigins.add(id);
      }
    }
    
    if (node.fm.born_from_knot) {
      const bfn = String(node.fm.born_from_knot);
      const foundKnot = Object.keys(allNodes).find(k => k.startsWith('knots:') && String(allNodes[k].fm.knot_number) === bfn);
      if (foundKnot) node.newOrigins.add(foundKnot);
    }
    
    // Spark -> Fusion logic. 
    // If Spark A has fusion_link /fusions/B, then B's origin_nodes should include Spark A
    if (node.fm.fusion_link) {
      const fSlug = node.fm.fusion_link.split('/').pop();
      const fusionId = Object.keys(allNodes).find(k => k.startsWith('fusions:') && k.includes(fSlug));
      if (fusionId && allNodes[fusionId]) {
        allNodes[fusionId].newOrigins.add(id);
      }
    }
  }
  
  // 4. Compute Implicit semantic boundaries intersection
  const ids = Object.keys(allNodes);
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const idA = ids[i];
      const idB = ids[j];
      const nodeA = allNodes[idA];
      const nodeB = allNodes[idB];
      
      const tagsA = nodeA.fm.tags || [];
      const tagsB = nodeB.fm.tags || [];
      const intersection = tagsA.filter(t => tagsB.includes(t));
      
      // Minimum 2 identical semantic tags for natural connection
      if (intersection.length >= 2) {
        const partsA = idA.split(':');
        const partsB = idB.split(':');
        
        // Directionality: Spark flows outward into Heavier primitives (Fusion / Knot)
        if (partsA[0] === 'sparks' && ['fusions', 'knots'].includes(partsB[0])) {
          nodeB.newOrigins.add(idA);
        } else if (partsB[0] === 'sparks' && ['fusions', 'knots'].includes(partsA[0])) {
          nodeA.newOrigins.add(idB);
        }
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
