import type { DissonanceFlag } from './DissonanceEngine';
import type { FridaySynthesis, MondayData, ResonanceData } from './SynthesisEngine';

export interface ClientAudit {
  id: string;
  name: string;
  status: 'Initiated' | 'Sealed' | 'Resonated';
  lastActivity: string;
  monday: MondayData;
  wednesday: ResonanceData;
  synthesis?: FridaySynthesis;
  flags: DissonanceFlag[];
}

function createFlatMatrix(value: number): MondayData['matrix'] {
  return {
    body_resource: { past: value, present: value, future: value, why: '' },
    body_capacity: { past: value, present: value, future: value, why: '' },
    body_stability: { past: value, present: value, future: value, why: '' },
    mind_resource: { past: value, present: value, future: value, why: '' },
    mind_capacity: { past: value, present: value, future: value, why: '' },
    mind_stability: { past: value, present: value, future: value, why: '' },
    soul_resource: { past: value, present: value, future: value, why: '' },
    soul_capacity: { past: value, present: value, future: value, why: '' },
    soul_stability: { past: value, present: value, future: value, why: '' }
  };
}

export const MOCK_CLIENTS: ClientAudit[] = [
  {
    id: 'c1',
    name: 'The Sovereign Outcast',
    status: 'Sealed',
    lastActivity: '2026-03-31',
    monday: {
      matrix: {
        ...createFlatMatrix(6),
        soul_capacity: { past: 4, present: 4, future: 8, why: 'I hide my power to avoid rejection.' },
        body_resource: { past: 5, present: 6, future: 10, why: 'I have momentum but still under-claim authority.' },
        mind_resource: { past: 6, present: 3, future: 9, why: 'Too many obligations fracture focus.' },
        soul_stability: { past: 7, present: 6, future: 10, why: 'The intent is clear, execution is fragmented.' }
      },
      external: {
        mbti: 'INTJ-A',
        high5: 'Strategic, Learner, Achiever, Deliberative, Focus',
        hdType: 'Projector',
        hdAuthority: 'Splenic',
        hdProfile: '5/1'
      }
    },
    wednesday: { collisionAccepted: true, somaticLocation: 'throat' },
    flags: [
      {
        id: 'flag_c1_1',
        dimension: 'mind_resource',
        category: 'resource',
        type: 'DECAY',
        severity: 'high',
        severityScore: 7,
        description: 'Calendar load (Mind Resource) is compressing execution quality and recovery capacity.',
        message: 'Calendar load is compressing execution quality and recovery capacity.'
      },
      {
        id: 'flag_c1_2',
        dimension: 'soul_capacity',
        category: 'capacity',
        type: 'FRICTION',
        severity: 'medium',
        severityScore: 5,
        description: 'Identity alignment (Soul Capacity) lacks the declared future role.',
        message: 'Identity alignment lacks the declared future role.'
      }
    ]
  }
];
