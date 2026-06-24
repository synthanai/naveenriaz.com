export interface MatrixVector {
  past: number;
  present: number;
  future: number;
  whyPast?: string;
  whyPresent?: string;
  whyFuture?: string;
  why?: string; // Fallback for legacy data
}

export interface ExternalCodes {
  mbti?: string;
  high5?: string;
  hdType?: string;
  hdAuthority?: string;
  hdProfile?: string;
}

export interface MondayData {
  matrix?: Record<string, MatrixVector>;
  audit?: Record<string, number>;
  narratives?: Record<string, string>;
  external?: ExternalCodes;
  codes?: {
    mbti?: string;
    high5?: string;
    hdType?: string;
    hdAuthority?: string;
    hdProfile?: string;
    hd?: {
      type?: string;
      authority?: string;
      profile?: string;
    };
  };
}

export interface ResonanceData {
  collisionAccepted?: boolean;
  somaticLocation?: string;
}

export interface SightsScore {
  label: string;
  score: number;
  trajectory: 'UP' | 'DOWN' | 'STABLE';
  shock: number;
}

export interface SightsVector {
  dimension: string;
  label: string;
  current: number;
  sovereign: number;
  trajectory: 'UP' | 'DOWN' | 'STABLE';
  shock: number;
}

export interface FridayBrief {
  archetype: string;
  shadow: string;
  dissonancePoint: string;
  legacyPath: string;
}

export interface FridaySynthesis {
  scores: Record<string, SightsScore>;
  vectors: SightsVector[];
  auraShift: number;
  brief: FridayBrief;
}

interface NormalizedMondayData {
  matrix: Record<string, MatrixVector>;
  external?: ExternalCodes;
}

function toFiniteScore(value: unknown, fallback = 5): number {
  const candidate = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(candidate)) return fallback;
  return Math.max(1, Math.min(10, candidate));
}

function toOptionalString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeMatrix(raw: MondayData): Record<string, MatrixVector> {
  if (raw.matrix && typeof raw.matrix === 'object') {
    const matrix: Record<string, MatrixVector> = {};
    Object.entries(raw.matrix).forEach(([key, value]) => {
      matrix[key] = {
        past: toFiniteScore(value?.past),
        present: toFiniteScore(value?.present),
        future: toFiniteScore(value?.future),
        whyPast: toOptionalString(value?.whyPast),
        whyPresent: toOptionalString(value?.whyPresent),
        whyFuture: toOptionalString(value?.whyFuture),
        why: toOptionalString(value?.why)
      };
    });
    return matrix;
  }

  if (raw.audit && typeof raw.audit === 'object') {
    const matrix: Record<string, MatrixVector> = {};
    Object.entries(raw.audit).forEach(([key, value]) => {
      const score = toFiniteScore(value);
      matrix[key] = { past: score, present: score, future: score, why: '' };
    });
    return matrix;
  }

  return {};
}

function normalizeExternal(raw: MondayData): ExternalCodes | undefined {
  const codes = raw.codes ?? {};
  const hd = codes.hd ?? {};

  const external: ExternalCodes = {
    mbti: raw.external?.mbti ?? codes.mbti,
    high5: raw.external?.high5 ?? codes.high5,
    hdType: raw.external?.hdType ?? codes.hdType ?? hd.type,
    hdAuthority: raw.external?.hdAuthority ?? codes.hdAuthority ?? hd.authority,
    hdProfile: raw.external?.hdProfile ?? codes.hdProfile ?? hd.profile
  };

  const hasValue = Object.values(external).some((value) => toOptionalString(value));
  return hasValue ? external : undefined;
}

export function normalizeMondayData(raw: MondayData): NormalizedMondayData {
  return {
    matrix: normalizeMatrix(raw),
    external: normalizeExternal(raw)
  };
}

export class SynthesisEngine {
  private static MAPPING: Record<string, string[]> = {
    // BODY
    BR: ['body_resource'],
    BC: ['body_capacity'],
    BS: ['body_stability'],
    // MIND
    MR: ['mind_resource'],
    MC: ['mind_capacity'],
    MS: ['mind_stability'],
    // SOUL
    SR: ['soul_resource'],
    SC: ['soul_capacity'],
    SS: ['soul_stability']
  };

  static calculateSights(rawData: MondayData, resonance: ResonanceData = {}): FridaySynthesis {
    const data = normalizeMondayData(rawData);
    const scores: Record<string, SightsScore> = {};
    const vectors: SightsVector[] = [];

    Object.entries(this.MAPPING).forEach(([key, dims]) => {
      let totalPast = 0;
      let totalPresent = 0;
      let totalFuture = 0;
      let count = 0;

      dims.forEach((dim) => {
        const vec = data.matrix[dim];
        if (!vec) return;
        totalPast += vec.past;
        totalPresent += vec.present;
        totalFuture += vec.future;
        count += 1;
      });

      const avgPast = count > 0 ? totalPast / count : 5;
      const avgPresent = count > 0 ? totalPresent / count : 5;
      const avgFuture = count > 0 ? totalFuture / count : 5;
      const trajectory: 'UP' | 'DOWN' | 'STABLE' =
        avgFuture > avgPresent ? 'UP' : avgFuture < avgPresent ? 'DOWN' : 'STABLE';
      const shock = Math.abs(avgPresent - avgPast) + Math.abs(avgFuture - avgPresent);
      const score = (avgPast * 0.2) + (avgPresent * 0.5) + (avgFuture * 0.3);
      const label = this.getLabel(key);

      scores[key] = {
        label,
        score: Math.round(score * 10) / 10,
        trajectory,
        shock: Math.round(shock * 10) / 10
      };

      vectors.push({
        dimension: key,
        label,
        current: Math.round(avgPresent * 10) / 10,
        sovereign: Math.round(avgFuture * 10) / 10,
        trajectory,
        shock: Math.round(shock * 10) / 10
      });
    });

    const readinessDelta = vectors.reduce((sum, vector) => {
      return sum + Math.max(0, vector.sovereign - vector.current);
    }, 0);
    const maxDelta = Math.max(1, vectors.length * 9);
    const auraShift = Math.round((readinessDelta / maxDelta) * 100);

    return {
      scores,
      vectors,
      auraShift,
      brief: this.buildBrief(vectors, data.external, resonance, auraShift)
    };
  }

  private static getLabel(key: string): string {
    const labels: Record<string, string> = {
      BR: 'Body Resource',
      BC: 'Body Capacity',
      BS: 'Body Stability',
      MR: 'Mind Resource',
      MC: 'Mind Capacity',
      MS: 'Mind Stability',
      SR: 'Soul Resource',
      SC: 'Soul Capacity',
      SS: 'Soul Stability'
    };
    return labels[key] ?? key;
  }

  private static buildBrief(
    vectors: SightsVector[],
    external: ExternalCodes | undefined,
    resonance: ResonanceData,
    auraShift: number
  ): FridayBrief {
    const dominant = [...vectors].sort((a, b) => {
      const aWeight = a.shock + Math.max(0, a.sovereign - a.current);
      const bWeight = b.shock + Math.max(0, b.sovereign - b.current);
      return bWeight - aWeight;
    })[0];

    const typeArchetype: Record<string, string> = {
      Manifestor: 'Initiator',
      Generator: 'Builder',
      'Manifesting Generator': 'Catalyst',
      Projector: 'Guide',
      Reflector: 'Witness'
    };
    const archetype = typeArchetype[external?.hdType ?? ''] ?? (resonance.collisionAccepted ? 'Sovereign' : 'Seeker');

    const somaticShadow: Record<string, string> = {
      throat: 'Voice Suppression',
      chest: 'Integrity Friction',
      solar: 'Will Fragmentation',
      gut: 'Truth Avoidance'
    };
    const shadow = somaticShadow[resonance.somaticLocation ?? ''] ?? 'Hidden Drift';

    const dissonancePoint = dominant?.label ?? 'Integrity';
    const readinessBand = auraShift >= 70 ? 'high' : auraShift >= 40 ? 'emerging' : 'fragile';
    const legacyPath = `Aura shift is ${auraShift}% (${readinessBand}). Your strongest growth edge is ${dissonancePoint}; stabilize current reality there before forcing scale.`;

    return {
      archetype,
      shadow,
      dissonancePoint,
      legacyPath
    };
  }
}

export const synthesizeSights = (data: MondayData, resonance?: ResonanceData): FridaySynthesis => {
  return SynthesisEngine.calculateSights(data, resonance);
};
