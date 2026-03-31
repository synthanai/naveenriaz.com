import type { MondayData } from './SynthesisEngine';
import { normalizeMondayData } from './SynthesisEngine';

export type DissonanceType =
  | 'DECAY'
  | 'STAGNANT'
  | 'FRICTION'
  | 'GAP_STRIKE'
  | 'BLUEPRINT_MISMATCH';

export type DissonanceSeverity = 'low' | 'medium' | 'high' | 'CRITICAL';

export interface DissonanceFlag {
  id: string;
  dimension: string;
  category: string;
  type: DissonanceType;
  severity: DissonanceSeverity;
  severityScore: number;
  description: string;
  message: string;
}

function toSeverity(score: number): DissonanceSeverity {
  if (score >= 8) return 'CRITICAL';
  if (score >= 6) return 'high';
  if (score >= 3) return 'medium';
  return 'low';
}

function toCategory(dimension: string): string {
  const labelMap: Record<string, string> = {
    body_resource: 'resource',
    body_capacity: 'capacity',
    body_stability: 'stability',
    mind_resource: 'resource',
    mind_capacity: 'capacity',
    mind_stability: 'stability',
    soul_resource: 'resource',
    soul_capacity: 'capacity',
    soul_stability: 'stability'
  };
  return labelMap[dimension] ?? dimension;
}

let flagSequence = 0;
function createFlag(
  dimension: string,
  type: DissonanceType,
  severityScore: number,
  description: string
): DissonanceFlag {
  flagSequence += 1;
  return {
    id: `flag_${flagSequence}`,
    dimension,
    category: toCategory(dimension),
    type,
    severity: toSeverity(severityScore),
    severityScore,
    description,
    message: description
  };
}

export class DissonanceEngine {
  static analyze(rawData: MondayData): DissonanceFlag[] {
    flagSequence = 0;
    const data = normalizeMondayData(rawData);
    const flags: DissonanceFlag[] = [];

    Object.entries(data.matrix).forEach(([dimension, vector]) => {
      const decay = vector.past - vector.present;
      const friction = vector.future - vector.present;
      const compression = Math.abs(vector.future - vector.past);

      if (decay >= 3) {
        flags.push(
          createFlag(
            dimension,
            'DECAY',
            Math.min(10, Math.round(decay + 2)),
            `Momentum decay detected in ${dimension}. Present state dropped versus the historical baseline.`
          )
        );
      }

      if (friction >= 4) {
        flags.push(
          createFlag(
            dimension,
            'FRICTION',
            Math.min(10, Math.round(friction + 1)),
            `The desired future in ${dimension} is materially ahead of current reality.`
          )
        );
      }

      if (vector.past === vector.present && vector.present === vector.future && vector.present < 5) {
        flags.push(
          createFlag(
            dimension,
            'STAGNANT',
            5,
            `${dimension} is flatlined at a low baseline across past, present, and target.`
          )
        );
      }

      if (vector.present <= 3 && vector.future >= 8 && compression >= 5) {
        flags.push(
          createFlag(
            dimension,
            'GAP_STRIKE',
            Math.min(10, Math.round(compression + 1)),
            `${dimension} shows a severe execution gap: low present with a high intended target.`
          )
        );
      }
    });

    const hdType = data.external?.hdType;
    const bodyResource = data.matrix.body_resource;
    const soulCapacity = data.matrix.soul_capacity;

    if ((hdType === 'Projector' || hdType === 'Reflector') && bodyResource && bodyResource.present > 8) {
      flags.push(
        createFlag(
          'body_resource',
          'BLUEPRINT_MISMATCH',
          8,
          'Resource consumption exceeds the sustainable recognition-based cadence for this type.'
        )
      );
    }

    if (hdType === 'Manifestor' && soulCapacity && soulCapacity.present < 5) {
      flags.push(
        createFlag(
          'soul_capacity',
          'BLUEPRINT_MISMATCH',
          7,
          'Initiation potential is throttled; identity alignment is below the Manifestor threshold.'
        )
      );
    }

    return flags.sort((a, b) => b.severityScore - a.severityScore);
  }

  static getNarrativeTriage(flags: DissonanceFlag[]): string[] {
    return flags.slice(0, 7).map((flag) => flag.dimension);
  }
}

export const analyzeDissonance = (data: MondayData): DissonanceFlag[] => {
  return DissonanceEngine.analyze(data);
};
