#!/usr/bin/env node
/**
 * Pulse Engine Scanner
 * Scans the SYNTHAI master repo and produces pulse.json + concepts.json
 * Run: node scripts/pulse-scanner.mjs
 */

import { readdir, readFile, stat, writeFile } from 'fs/promises';
import { join, resolve, basename } from 'path';
import { execSync } from 'child_process';
import { existsSync } from 'fs';

// Paths (relative to naveenriaz.com repo)
const SITE_ROOT = resolve(import.meta.dirname, '..');
const REPO_ROOT = resolve(SITE_ROOT, '../..');
const DATA_DIR = join(SITE_ROOT, 'src', 'data');
const KI_DIR = join(process.env.HOME, '.gemini', 'antigravity', 'knowledge');

// ─── Utilities ───────────────────────────────────────────────

async function countFiles(dir, extensions = []) {
    let count = 0;
    try {
        const entries = await readdir(dir, { withFileTypes: true, recursive: true });
        for (const entry of entries) {
            if (!entry.isFile()) continue;
            if (extensions.length === 0) { count++; continue; }
            if (extensions.some(ext => entry.name.endsWith(ext))) count++;
        }
    } catch { /* dir doesn't exist */ }
    return count;
}

async function countDirs(dir) {
    let count = 0;
    try {
        const entries = await readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isDirectory() && !entry.name.startsWith('.')) count++;
        }
    } catch { /* dir doesn't exist */ }
    return count;
}

function gitCommitCount() {
    try {
        return parseInt(execSync('git log --oneline | wc -l', { cwd: REPO_ROOT, encoding: 'utf-8' }).trim());
    } catch { return 0; }
}

function gitLastCommitDate() {
    try {
        return execSync('git log -1 --format=%aI', { cwd: REPO_ROOT, encoding: 'utf-8' }).trim();
    } catch { return new Date().toISOString(); }
}

// ─── Scanner Modules ─────────────────────────────────────────

async function scanSubmodules() {
    const gitmodulesPath = join(REPO_ROOT, '.gitmodules');
    try {
        const content = await readFile(gitmodulesPath, 'utf-8');
        const matches = content.match(/\[submodule/g);
        return matches ? matches.length : 0;
    } catch { return 0; }
}

async function scanResearch() {
    const researchDir = join(REPO_ROOT, '2-research');
    return await countFiles(researchDir, ['.md', '.json', '.yaml', '.yml']);
}

async function scanBooks() {
    const booksDir = join(REPO_ROOT, '5-text', 'books');
    let chapters = 0;
    let books = 0;
    try {
        const bookDirs = await readdir(booksDir, { withFileTypes: true });
        for (const book of bookDirs) {
            if (!book.isDirectory()) continue;
            books++;
            const bookPath = join(booksDir, book.name);
            const entries = await readdir(bookPath, { withFileTypes: true, recursive: true });
            // Count ch* directories (production chapters)
            for (const entry of entries) {
                if (entry.isDirectory() && /^ch\d+/.test(entry.name)) chapters++;
            }
        }
    } catch { /* no books dir */ }
    // Also count ebooks
    const ebooksDir = join(REPO_ROOT, '5-text', 'ebooks');
    try {
        const ebookDirs = await readdir(ebooksDir, { withFileTypes: true });
        for (const eb of ebookDirs) {
            if (eb.isDirectory()) books++;
        }
    } catch { /* no ebooks dir */ }
    return { chapters, books };
}

async function scanPapers() {
    const papersDir = join(REPO_ROOT, '5-text', 'whitepapers');
    return await countDirs(papersDir);
}

async function scanWorkflows() {
    const workflowDir = join(REPO_ROOT, '.agent', 'workflows');
    return await countFiles(workflowDir, ['.md']);
}

async function scanSkills() {
    const skillsDir = join(REPO_ROOT, '.agent', 'skills');
    return await countDirs(skillsDir);
}

async function scanKnowledgeItems() {
    let count = 0;
    let items = [];
    try {
        const dirs = await readdir(KI_DIR, { withFileTypes: true });
        for (const d of dirs) {
            if (!d.isDirectory() || d.name.startsWith('.')) continue;
            const metaPath = join(KI_DIR, d.name, 'metadata.json');
            try {
                const meta = JSON.parse(await readFile(metaPath, 'utf-8'));
                items.push({
                    id: d.name,
                    title: meta.title || d.name,
                    summary: (meta.summary || '').substring(0, 200),
                    lastAccessed: meta.lastAccessed || null
                });
                count++;
            } catch { count++; /* metadata missing but dir exists */ }
        }
    } catch { /* KI dir doesn't exist */ }
    return { count, items };
}

async function scanPublications() {
    const pubDir = join(REPO_ROOT, '8-publication');
    return await countDirs(pubDir);
}

// ─── Concept Graph Builder ───────────────────────────────────

async function buildConceptGraph() {
    const revealPath = join(DATA_DIR, 'reveal-config.yaml');
    const conceptsPath = join(DATA_DIR, 'concepts.json');

    // If concepts.json already exists, use it (manually curated edges preserved)
    if (existsSync(conceptsPath)) {
        try {
            const existing = JSON.parse(await readFile(conceptsPath, 'utf-8'));
            // Update auto-generated fields but preserve manual edges
            const updated = await enrichConceptNodes(existing);
            return updated;
        } catch { /* fall through to fresh generation */ }
    }

    // Fresh generation: build from repo structure
    return await generateFreshConceptGraph();
}

async function generateFreshConceptGraph() {
    const reposDir = join(REPO_ROOT, 'repos');
    const nodes = [];
    const edges = [];

    const repoMeta = [
        { id: 'spar', repo: 'spar-kit', label: 'SPAR', dimension: 'think', desc: 'Structured Persona-Argumentation for Reasoning' },
        { id: 'dmg', repo: 'decision-moment-graph', label: 'Decision Moment Graph', dimension: 'think', desc: 'Auditable decision architecture' },
        { id: 'ramp', repo: 'ramp-kit', label: 'RAMP', dimension: 'work', desc: 'Risk calibration for decision velocity' },
        { id: 'steal', repo: 'steal-kit', label: 'STEAL', dimension: 'think', desc: 'Intelligence capture protocol' },
        { id: 'vault', repo: 'vault-kit', label: 'VAULT-KIT', dimension: 'work', desc: 'Privacy-first audit architecture' },
        { id: 'kural', repo: 'kural', label: 'Ancient Wisdom', dimension: 'play', desc: '2000-year-old Tamil couplets grounding modern reasoning' },
        { id: 'agentic', repo: 'agentic-kit', label: 'Agentic Kit', dimension: 'work', desc: 'Brain infrastructure for AI agent orchestration' },
        { id: 'resonance', repo: 'resonance-kit', label: 'Resonance Kit', dimension: 'work', desc: 'Code resonance and pattern consistency audit' },
        { id: 'vow', repo: 'vow-engine', label: 'Voice of Wisdom', dimension: 'play', desc: 'Literature dialogue engine' },
        { id: 'iot-paper', repo: 'intent-of-thought', label: 'Intent of Thought', dimension: 'think', desc: 'GPS for AI Reasoning (arXiv published)' },
        { id: 'spar-arena', repo: 'spar-arena', label: 'SPAR Arena', dimension: 'work', desc: 'Interactive debate visualization platform' },
        { id: 'books', repo: null, label: 'The Book Series', dimension: 'play', desc: '13-book SHIFT series on organizational consciousness' },
        { id: 'student', repo: 'student-kit', label: 'Student Kit', dimension: 'play', desc: 'Learning and pedagogy toolkit' },
    ];

    for (const meta of repoMeta) {
        let fileCount = 0;
        let firstSeen = null;

        if (meta.repo) {
            const repoPath = join(reposDir, meta.repo);
            fileCount = await countFiles(repoPath, ['.md', '.js', '.ts', '.py', '.yaml', '.json']);
            try {
                firstSeen = execSync(`git log --reverse --format=%aI -- repos/${meta.repo} | head -1`, {
                    cwd: REPO_ROOT, encoding: 'utf-8'
                }).trim() || null;
            } catch { /* no git history */ }
        }

        nodes.push({
            id: meta.id,
            label: meta.label,
            dimension: meta.dimension,
            description: meta.desc,
            repo: meta.repo,
            fileCount,
            firstSeen,
            lastModified: gitLastCommitDate()
        });
    }

    // Auto-generated edges based on known relationships
    const knownEdges = [
        { source: 'spar', target: 'dmg', type: 'REQUIRES', label: 'decisions feed graphs' },
        { source: 'spar', target: 'kural', type: 'AMPLIFIES', label: 'wisdom grounds deliberation' },
        { source: 'spar', target: 'ramp', type: 'ENABLES', label: 'risk calibrates depth' },
        { source: 'dmg', target: 'vault', type: 'REQUIRES', label: 'decisions need privacy' },
        { source: 'dmg', target: 'ramp', type: 'ENABLES', label: 'graphs enable risk tracking' },
        { source: 'steal', target: 'spar', type: 'ENABLES', label: 'intelligence feeds deliberation' },
        { source: 'kural', target: 'vow', type: 'AMPLIFIES', label: 'wisdom flows through voice' },
        { source: 'iot-paper', target: 'spar', type: 'SUPPORTS', label: 'theory validates practice' },
        { source: 'iot-paper', target: 'dmg', type: 'SUPPORTS', label: 'intent grounds decisions' },
        { source: 'agentic', target: 'spar', type: 'ENABLES', label: 'infrastructure powers agents' },
        { source: 'spar-arena', target: 'spar', type: 'REQUIRES', label: 'arena hosts debates' },
        { source: 'books', target: 'spar', type: 'AMPLIFIES', label: 'books teach methodology' },
        { source: 'books', target: 'kural', type: 'AMPLIFIES', label: 'books carry wisdom' },
        { source: 'student', target: 'books', type: 'REQUIRES', label: 'learning needs content' },
        { source: 'resonance', target: 'agentic', type: 'SUPPORTS', label: 'audits verify health' },
    ];

    return { nodes, edges: knownEdges };
}

async function enrichConceptNodes(existing) {
    const reposDir = join(REPO_ROOT, 'repos');

    for (const node of existing.nodes) {
        if (node.repo) {
            const repoPath = join(reposDir, node.repo);
            node.fileCount = await countFiles(repoPath, ['.md', '.js', '.ts', '.py', '.yaml', '.json']);
        }
        node.lastModified = gitLastCommitDate();
    }

    return existing;
}

// ─── Main ────────────────────────────────────────────────────

async function main() {
    console.log('🔵 Pulse Engine Scanner starting...\n');

    const [repos, research, bookData, papers, workflows, skills, ki, publications] = await Promise.all([
        scanSubmodules(),
        scanResearch(),
        scanBooks(),
        scanPapers(),
        scanWorkflows(),
        scanSkills(),
        scanKnowledgeItems(),
        scanPublications()
    ]);

    const totalCommits = gitCommitCount();
    const lastActivity = gitLastCommitDate();

    const pulse = {
        generatedAt: new Date().toISOString(),
        pulse: {
            repos,
            researchFiles: research,
            bookChapters: bookData.chapters,
            booksCount: bookData.books,
            papers,
            workflows,
            skills,
            knowledgeItems: ki.count,
            publications,
            totalCommits,
            lastActivity
        },
        ki: ki.items
    };

    // Write pulse.json
    await writeFile(join(DATA_DIR, 'pulse.json'), JSON.stringify(pulse, null, 2));
    console.log('  ✅ pulse.json written');

    // Build/update concepts.json
    const concepts = await buildConceptGraph();
    await writeFile(join(DATA_DIR, 'concepts.json'), JSON.stringify(concepts, null, 2));
    console.log('  ✅ concepts.json written');

    // Print summary
    console.log('\n📊 Pulse Summary:');
    console.log(`  Repos:          ${repos}`);
    console.log(`  Research Files:  ${research}`);
    console.log(`  Chapters Built:  ${bookData.chapters}`);
    console.log(`  Books & eBooks:  ${bookData.books}`);
    console.log(`  Papers:          ${papers}`);
    console.log(`  Workflows:       ${workflows}`);
    console.log(`  Skills:          ${skills}`);
    console.log(`  Knowledge Items: ${ki.count}`);
    console.log(`  Publications:    ${publications}`);
    console.log(`  Total Commits:   ${totalCommits}`);
    console.log(`  Last Activity:   ${lastActivity}`);
    console.log(`  Concepts:        ${concepts.nodes.length} nodes, ${concepts.edges.length} edges`);
    console.log('\n🟢 Pulse complete.\n');
}

main().catch(err => {
    console.error('❌ Scanner error:', err);
    process.exit(1);
});
