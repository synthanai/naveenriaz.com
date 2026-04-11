#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// The URUKU engine operates directly on the raw repository content.
const CONTENT_DIR = path.join(__dirname, '../src/content');
const CAMPAIGNS_DIR = path.join(__dirname, '../.campaigns');

// We simulate placing generated STUBs directly into the source content directory with a "stub" status
function buildCampaign(campaignName) {
  console.log(`\n🔥 URUKU ENGINE: Spawning STUBs for campaign [${campaignName}]`);
  
  // Hardcoded for "phase5-shadows" if file doesn't exist, to bootstrap Phase 5
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
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    const outFile = path.join(outDir, `${todayDate}-${safeTitle}.md`);
    
    // Create the generic stub layout
    const yaml = [
      '---',
      `title: "${stub.hook}"`,
      `date: ${todayDate}`,
      `tags: ["phase5", "shadow", "against-type"]`,
      `description: ""`,
      `valence: "${stub.truth.valence}"`,
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
  });
  
  console.log(`\nURKU CAMPAIGN QUEUED. 5 STUBS Awaiting Human.\n`);
}

function runBackfill(dryRun) {
  console.log(`\n🔥 URUKU ENGINE: Backfilling Legacy Schema`);
  if (dryRun) console.log(`[DRY-RUN MODE EXECUTED. No files changed.]\n`);
  
  const primitives = fs.readdirSync(CONTENT_DIR).filter(d => fs.statSync(path.join(CONTENT_DIR, d)).isDirectory());
  
  let modifiedCount = 0;
  
  primitives.forEach(prim => {
    const dir = path.join(CONTENT_DIR, prim);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    
    files.forEach(file => {
      const p = path.join(dir, file);
      const content = fs.readFileSync(p, 'utf8');
      
      let newContent = content;
      let changed = false;

      // Extract frontmatter block
      const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!fmMatch) return;
      let fm = fmMatch[1];
      
      // Inject origin_nodes if completely missing
      if (!fm.includes('origin_nodes:')) {
        fm += `\norigin_nodes: []`;
        changed = true;
      }
      
      // Inject safe truthFields defaults if entirely absent
      if (!fm.includes('valence:')) {
        fm += `\nvalence: "mixed"\nfriction: ""`;
        changed = true;
      }
      
      if (changed) {
        newContent = newContent.replace(fmMatch[1], fm);
        if (!dryRun) {
          fs.writeFileSync(p, newContent);
        }
        console.log(`  🔧 Backfilled: ${prim}/${file}`);
        modifiedCount++;
      }
    });
  });
  
  console.log(`\nURUKU BACKFILL COMPLETE. Processed ${modifiedCount} legacy files.\n`);
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
