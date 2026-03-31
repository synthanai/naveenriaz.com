/**
 * ChronicleExport: Serializes the Prime onboarding data from localStorage
 * into a structured coaching context dossier for SYNTHAIR or human coaches.
 * 
 * Usage:
 *   import { exportChronicle, getChronicleMarkdown } from './ChronicleExport';
 *   const chronicle = exportChronicle();          // Structured JS object
 *   const markdown = getChronicleMarkdown();      // Markdown dossier string
 */

import type { MatrixVector, ExternalCodes, MondayData, ResonanceData, FridaySynthesis } from './SynthesisEngine';
import { synthesizeSights } from './SynthesisEngine';
import { analyzeDissonance, type DissonanceFlag } from './DissonanceEngine';

const LABEL_MAP: Record<string, string> = {
  body_resource: 'Financial Capital (Body)',
  body_capacity: 'Vitality Capacity (Body)',
  body_stability: 'Environmental Stability (Body)',
  mind_resource: 'Temporal Autonomy (Mind)',
  mind_capacity: 'Deep Focus (Mind)',
  mind_stability: 'Skill Arbitrage (Mind)',
  soul_resource: 'Relational Depth (Soul)',
  soul_capacity: 'Identity Alignment (Soul)',
  soul_stability: 'Legacy Ripples (Soul)'
};

export interface ChronicleExportData {
  profile: {
    name: string;
    role: string;
    primaryGoal: string;
    tone: string;
    oneThingGoal: string;
  } | null;
  matrix: Record<string, MatrixVector> | null;
  narratives: Record<string, string> | null;
  external: ExternalCodes | null;
  resonance: ResonanceData | null;
  declaration: string | null;
  synthesis: FridaySynthesis | null;
  flags: DissonanceFlag[];
  shockRankedDimensions: string[];
  topLeak: string | null;
  timestamp: string | null;
}

function getShockRank(matrix: Record<string, MatrixVector>): string[] {
  return Object.keys(matrix).sort((a, b) => {
    const va = matrix[a];
    const vb = matrix[b];
    const shockA = Math.abs(va.present - va.past) + Math.abs(va.future - va.present);
    const shockB = Math.abs(vb.present - vb.past) + Math.abs(vb.future - vb.present);
    return shockB - shockA;
  });
}

export function exportChronicle(): ChronicleExportData {
  const mondayRaw = localStorage.getItem('synthai_onboarding_monday') || localStorage.getItem('synthai_prime_chronicle');
  const wedRaw = localStorage.getItem('synthai_onboarding_wednesday');
  const declRaw = localStorage.getItem('synthai_onboarding_final_declaration');

  if (!mondayRaw) {
    return {
      profile: null, matrix: null, narratives: null, external: null,
      resonance: null, declaration: null, synthesis: null, flags: [],
      shockRankedDimensions: [], topLeak: null, timestamp: null
    };
  }

  const monday: MondayData & { profile?: any; timestamp?: string } = JSON.parse(mondayRaw);
  const resonance: ResonanceData | null = wedRaw ? JSON.parse(wedRaw) : null;

  const profile = monday.profile || null;
  const matrix = monday.matrix || null;
  const narratives = monday.narratives || null;
  const external = monday.external || monday.codes || null;

  let synthesis: FridaySynthesis | null = null;
  let flags: DissonanceFlag[] = [];
  let shockRanked: string[] = [];
  let topLeak: string | null = null;

  if (matrix) {
    synthesis = synthesizeSights(monday, resonance || {});
    flags = analyzeDissonance(monday);
    shockRanked = getShockRank(matrix);
    topLeak = shockRanked.length > 0 ? (LABEL_MAP[shockRanked[0]] || shockRanked[0]) : null;
  }

  return {
    profile,
    matrix,
    narratives,
    external: external as ExternalCodes | null,
    resonance,
    declaration: declRaw || null,
    synthesis,
    flags,
    shockRankedDimensions: shockRanked,
    topLeak,
    timestamp: monday.timestamp || null
  };
}

export function getChronicleMarkdown(): string {
  const c = exportChronicle();
  if (!c.matrix) return '# No Prime Chronicle data found.\n\nThe client has not completed onboarding.';

  const lines: string[] = [];

  lines.push('# SYNTHAIR Coaching Context: Prime Chronicle Dossier');
  lines.push('');
  lines.push(`> Auto-exported from Prime Onboarding | ${c.timestamp || 'Unknown date'}`);
  lines.push('');

  // Profile
  if (c.profile) {
    lines.push('## 1. Client Profile');
    lines.push('');
    lines.push(`| Field | Value |`);
    lines.push(`|-------|-------|`);
    lines.push(`| **Name** | ${c.profile.name || 'Unknown'} |`);
    lines.push(`| **Role** | ${c.profile.role || 'Unknown'} |`);
    lines.push(`| **Primary Goal** | ${c.profile.primaryGoal?.replace('_', ' ') || 'Unknown'} |`);
    lines.push(`| **Tone Preference** | ${c.profile.tone || 'layman'} |`);
    if (c.profile.oneThingGoal) {
      lines.push(`| **THE ONE THING (90-day)** | ${c.profile.oneThingGoal} |`);
    }
    lines.push('');
  }

  // External Codes
  if (c.external) {
    lines.push('## 2. External Codes (Identity Blueprint)');
    lines.push('');
    if (c.external.mbti) lines.push(`- **MBTI**: ${c.external.mbti}`);
    if (c.external.high5) lines.push(`- **CliftonStrengths/High5**: ${c.external.high5}`);
    if (c.external.hdType) lines.push(`- **Human Design Type**: ${c.external.hdType}`);
    if (c.external.hdAuthority) lines.push(`- **HD Authority**: ${c.external.hdAuthority}`);
    if (c.external.hdProfile) lines.push(`- **HD Profile**: ${c.external.hdProfile}`);
    lines.push('');
  }

  // Critical Leak
  if (c.topLeak) {
    lines.push('## 3. Critical Leak');
    lines.push('');
    lines.push(`**Top Shock Dimension:** ${c.topLeak}`);
    lines.push('');
  }

  // Trajectory Matrix (Shock-Ranked)
  if (c.matrix && c.shockRankedDimensions.length > 0) {
    lines.push('## 4. 9-Dimension Trajectory Matrix (Shock-Ranked)');
    lines.push('');
    lines.push('| Rank | Dimension | Past | Present | Future | Shock |');
    lines.push('|------|-----------|------|---------|--------|-------|');
    c.shockRankedDimensions.forEach((key, i) => {
      const v = c.matrix![key];
      const shock = Math.abs(v.present - v.past) + Math.abs(v.future - v.present);
      const label = LABEL_MAP[key] || key;
      lines.push(`| #${i + 1} | ${label} | ${v.past} | ${v.present} | ${v.future} | ${shock} |`);
    });
    lines.push('');
  }

  // Narrative Excavations
  if (c.narratives && Object.keys(c.narratives).length > 0) {
    lines.push('## 5. Narrative Excavations (Client\'s Own Words)');
    lines.push('');
    lines.push('> These are the client\'s verbatim "cost of trajectory" responses. Use these in coaching by reading them back when the client loses motivation.');
    lines.push('');
    c.shockRankedDimensions.forEach((key) => {
      const narText = c.narratives![key];
      if (narText) {
        const label = LABEL_MAP[key] || key;
        lines.push(`### ${label}`);
        lines.push(`> "${narText}"`);
        lines.push('');
      }
    });
    // Also include any dimensions not in shockRanked
    Object.entries(c.narratives).forEach(([key, text]) => {
      if (!c.shockRankedDimensions.includes(key) && text) {
        const label = LABEL_MAP[key] || key;
        lines.push(`### ${label}`);
        lines.push(`> "${text}"`);
        lines.push('');
      }
    });
  }

  // Micro-Whys
  if (c.matrix) {
    const hasWhys = c.shockRankedDimensions.some(key => {
      const v = c.matrix![key];
      return v.whyPast || v.whyPresent || v.whyFuture;
    });
    if (hasWhys) {
      lines.push('## 6. Micro-Whys (Per-Dimension Reasoning)');
      lines.push('');
      c.shockRankedDimensions.forEach((key) => {
        const v = c.matrix![key];
        if (v.whyPast || v.whyPresent || v.whyFuture) {
          const label = LABEL_MAP[key] || key;
          lines.push(`### ${label}`);
          if (v.whyPast) lines.push(`- **Past**: "${v.whyPast}"`);
          if (v.whyPresent) lines.push(`- **Present**: "${v.whyPresent}"`);
          if (v.whyFuture) lines.push(`- **Future**: "${v.whyFuture}"`);
          lines.push('');
        }
      });
    }
  }

  // Resonance
  if (c.resonance) {
    lines.push('## 7. Resonance Signal (Wednesday)');
    lines.push('');
    lines.push(`- **Collision Response**: ${c.resonance.collisionAccepted ? 'ADMITTED TRUTH (coachable signal)' : 'RESISTED (deeper work needed)'}`);
    lines.push(`- **Somatic Location**: ${c.resonance.somaticLocation?.toUpperCase() || 'Not captured'}`);
    const somaticMap: Record<string, string> = {
      throat: 'Voice Suppression: difficulty expressing authentic authority',
      chest: 'Integrity Friction: misalignment between actions and values',
      solar: 'Will Fragmentation: scattered energy, lack of commitment focus',
      gut: 'Truth Avoidance: knowing what needs to change but refusing to act'
    };
    if (c.resonance.somaticLocation && somaticMap[c.resonance.somaticLocation]) {
      lines.push(`- **Somatic Interpretation**: ${somaticMap[c.resonance.somaticLocation]}`);
    }
    lines.push('');
  }

  // Dissonance Flags
  if (c.flags.length > 0) {
    lines.push('## 8. Dissonance Flags');
    lines.push('');
    c.flags.forEach((f) => {
      lines.push(`- **${f.type}** (${f.severity}, score: ${f.severityScore}) in ${LABEL_MAP[f.dimension] || f.dimension}: ${f.message}`);
    });
    lines.push('');
  }

  // Synthesis Brief
  if (c.synthesis) {
    lines.push('## 9. Synthesis Brief');
    lines.push('');
    lines.push(`- **Aura Shift Readiness**: ${c.synthesis.auraShift}%`);
    lines.push(`- **Archetype**: ${c.synthesis.brief.archetype}`);
    lines.push(`- **Shadow**: ${c.synthesis.brief.shadow}`);
    lines.push(`- **Primary Tension**: ${c.synthesis.brief.dissonancePoint}`);
    lines.push(`- **Legacy Path**: ${c.synthesis.brief.legacyPath}`);
    lines.push('');
  }

  // Declaration
  if (c.declaration) {
    lines.push('## 10. The Declaration');
    lines.push('');
    lines.push(`> "${c.declaration}"`);
    lines.push('');
    lines.push('Use this declaration as the weekly accountability anchor: "You declared X. What happened this week?"');
    lines.push('');
  }

  // Coaching Protocol Hints
  lines.push('---');
  lines.push('');
  lines.push('## Coaching Protocol Hints');
  lines.push('');
  lines.push('1. **Session 1**: Attack the top 2 Shock dimensions using the client\'s narrative text');
  lines.push('2. **Session 2**: Connect shock to External Codes (HD Type informs decision-making strategy)');
  lines.push('3. **Session 3**: Build 90-day Aura Shift execution plan targeting the gap');
  lines.push('4. **Ongoing**: Weekly accountability against the Declaration');
  lines.push('5. **Anti-quit weapon**: Read their own "cost of trajectory" text back verbatim');
  lines.push('');

  return lines.join('\n');
}
