#!/usr/bin/env python3
"""
Patch Astro's glob loader to warn-and-skip instead of crash on YAML errors.
Run this as a postinstall hook: "postinstall": "python3 scripts/patch-astro-loader.py"
"""
import re
import os

GLOB_LOADER = os.path.join("node_modules", "astro", "dist", "content", "loaders", "glob.js")

if not os.path.exists(GLOB_LOADER):
    print("⚠️  Astro glob loader not found, skipping patch")
    exit(0)

content = open(GLOB_LOADER, 'r').read()

# Check if already patched
if 'logger.warn(`Skipped ${entry}:' in content:
    print("✅ Astro glob loader already patched")
    exit(0)

# Find the syncData call during initial load (not the watcher one)
OLD = """return limit(async () => {
            const entryType = configForFile(entry);
            await syncData(entry, baseDir, entryType);
          });"""

NEW = """return limit(async () => {
            const entryType = configForFile(entry);
            try {
              await syncData(entry, baseDir, entryType);
            } catch (e) {
              logger.warn(`Skipped ${entry}: ${e.message}`);
            }
          });"""

if OLD in content:
    content = content.replace(OLD, NEW)
    open(GLOB_LOADER, 'w').write(content)
    print("✅ Astro glob loader patched: YAML errors now warn instead of crash")
else:
    print("⚠️  Could not find patch target in glob loader (already patched or API changed)")
