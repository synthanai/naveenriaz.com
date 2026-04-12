#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const MASTER_ROOT = path.join(REPO_ROOT, '../..'); // workspace root
const CONTENT_DIR = path.join(REPO_ROOT, 'src/content');
const PUBLIC_DIR = path.join(REPO_ROOT, 'public');

// --- Helpers ---
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

// Map of collection names to their source subdirectories relative to src/content
const COLLECTIONS = ['fusions', 'knots', 'sparks', 'beads', 'claws', 'wows', 'awes', 'syncs', 'digs', 'spars', 'scars', 'voids'];

function resolveInternalLink(url) {
  // 1. Image Assets
  if (url.startsWith('/images/')) {
    return fs.existsSync(path.join(PUBLIC_DIR, url));
  }

  // 2. Research Assets (legacy paths pointing to master repo 2-research)
  if (url.startsWith('/research/')) {
    const relPath = url.replace('/research/', '');
    return fs.existsSync(path.join(MASTER_ROOT, '2-research', relPath));
  }

  // 3. Content Collection Routing
  // Links like /fusions/the-leverage-lie or /knots/053-initiative-overload
  for (const coll of COLLECTIONS) {
    if (url.startsWith(`/${coll}/`)) {
      const slug = url.replace(`/${coll}/`, '');
      // Try direct md file
      const directMd = path.join(CONTENT_DIR, coll, `${slug}.md`);
      if (fs.existsSync(directMd)) return true;
      
      // Try nested index.md (some Astro patterns)
      const indexMd = path.join(CONTENT_DIR, coll, slug, 'index.md');
      if (fs.existsSync(indexMd)) return true;
      
      // Try deep search (e.g. knots/organizations/...)
      const allCollFiles = getFilesTree(path.join(CONTENT_DIR, coll));
      const found = allCollFiles.find(f => f.endsWith(`${slug}.md`));
      if (found) return true;
    }
  }

  // 4. Ebooks / Static routes
  if (url.startsWith('/ebooks/')) {
    // Ebooks often route to a specifically named file or directory
    return true; // Placeholder for now or add explicit check
  }

  return false;
}

// --- Main execution ---
console.log(`\n🚀 SYNTHAI LINK AUDITOR (URUKU MODULE)`);
console.log(`Scanning Content Ecosystem...\n`);

const contentFiles = COLLECTIONS.flatMap(coll => getFilesTree(path.join(CONTENT_DIR, coll)));
const brokenLinks = [];

contentFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relFile = path.relative(REPO_ROOT, file);
  
  // Regex 1: Standard Markdown Links and Images
  // [text](url) or ![alt](src)
  const linkRegex = /!?\[.*?\]\(([\/\.a-zA-Z0-9\-\:_#\.]+)\)/g;
  let m;
  while ((m = linkRegex.exec(content)) !== null) {
    const url = m[1];
    
    // Skip external links for this internal sweep (unless checking HTTP)
    if (url.startsWith('http') || url.startsWith('mailto:')) continue;
    
    // Skip anchor tags for now
    if (url.startsWith('#')) continue;

    // Resolve and verify
    if (!resolveInternalLink(url)) {
      brokenLinks.push({ file: relFile, text: m[0], url });
    }
  }
});

if (brokenLinks.length === 0) {
  console.log(`✅ SUCCESS: No broken internal links found across ${contentFiles.length} files.\n`);
} else {
  console.log(`❌ FAILED: Found ${brokenLinks.length} broken links.\n`);
  
  // Group by file for readability
  const grouped = brokenLinks.reduce((acc, link) => {
    if (!acc[link.file]) acc[link.file] = [];
    acc[link.file].push(link);
    return acc;
  }, {});

  for (const [file, links] of Object.entries(grouped)) {
    console.log(`File: ${file}`);
    links.forEach(l => console.log(`  - BROKEN: ${l.text} -> ${l.url}`));
  }
  process.exit(1); // Return error code for automated workflows
}
