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
    self: { past: value, present: value, future: value, why: '' },
    partner: { past: value, present: value, future: value, why: '' },
    children: { past: value, present: value, future: value, why: '' },
    friends: { past: value, present: value, future: value, why: '' },
    health: { past: value, present: value, future: value, why: '' },
    energy: { past: value, present: value, future: value, why: '' },
    career: { past: value, present: value, future: value, why: '' },
    accomplishments: { past: value, present: value, future: value, why: '' },
    experiences: { past: value, present: value, future: value, why: '' },
    time: { past: value, present: value, future: value, why: '' },
    presence: { past: value, present: value, future: value, why: '' },
    purpose: { past: value, present: value, future: value, why: '' },
    spiritual: { past: value, present: value, future: value, why: '' },
    origin: { past: value, present: value, future: value, why: '' },
    growth: { past: value, present: value, future: value, why: '' },
    routine: { past: value, present: value, future: value, why: '' },
    social_circle: { past: value, present: value, future: value, why: '' },
    community: { past: value, present: value, future: value, why: '' },
    hobby: { past: value, present: value, future: value, why: '' },
    intellectual: { past: value, present: value, future: value, why: '' }
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
        self: { past: 4, present: 4, future: 8, why: 'I hide my power to avoid rejection.' },
        career: { past: 5, present: 6, future: 10, why: 'I have momentum but still under-claim authority.' },
        time: { past: 6, present: 3, future: 9, why: 'Too many obligations fracture focus.' },
        purpose: { past: 7, present: 6, future: 10, why: 'The intent is clear, execution is fragmented.' }
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
        dimension: 'time',
        category: 'time',
        type: 'DECAY',
        severity: 'high',
        severityScore: 7,
        description: 'Calendar load is compressing execution quality and recovery capacity.',
        message: 'Calendar load is compressing execution quality and recovery capacity.'
      },
      {
        id: 'flag_c1_2',
        dimension: 'self',
        category: 'identity',
        type: 'FRICTION',
        severity: 'medium',
        severityScore: 5,
        description: 'Identity confidence lags the declared future role.',
        message: 'Identity confidence lags the declared future role.'
      }
    ]
  },
  {
    id: 'c2',
    name: 'The Stagnant Catalyst',
    status: 'Sealed',
    lastActivity: '2026-03-30',
    monday: {
      matrix: {
        ...createFlatMatrix(7),
        purpose: { past: 7, present: 5, future: 9, why: 'I optimize output but underinvest in meaning.' },
        accomplishments: { past: 8, present: 4, future: 9, why: 'I ship frequently but it feels hollow.' },
        career: { past: 7, present: 8, future: 9, why: 'Delivery is strong, direction is blurred.' }
      },
      external: {
        mbti: 'ENFP',
        high5: 'Empathy, Ideation, Individualization, Relator, WOO',
        hdType: 'Generator',
        hdAuthority: 'Sacral',
        hdProfile: '3/5'
      }
    },
    wednesday: { collisionAccepted: true, somaticLocation: 'solar' },
    flags: [
      {
        id: 'flag_c2_1',
        dimension: 'accomplishments',
        category: 'growth',
        type: 'DECAY',
        severity: 'high',
        severityScore: 6,
        description: 'Sustained accomplishment confidence has dropped below historical baseline.',
        message: 'Sustained accomplishment confidence has dropped below historical baseline.'
      }
    ]
  },
  {
    id: 'c3',
    name: 'The Unanchored Weaver',
    status: 'Initiated',
    lastActivity: '2026-03-31',
    monday: {
      matrix: {
        ...createFlatMatrix(5),
        partner: { past: 4, present: 3, future: 7, why: 'I prioritize everyone else first.' },
        children: { past: 3, present: 3, future: 7, why: 'Attention is fragmented.' },
        community: { past: 5, present: 6, future: 9, why: 'I contribute more than I declare.' },
        experiences: { past: 6, present: 8, future: 9, why: 'I seek novelty to avoid commitment.' }
      },
      external: {
        mbti: 'INFJ',
        high5: 'Connectedness, Belief, Developer, Positivity, Input',
        hdType: 'Reflector',
        hdAuthority: 'Lunar',
        hdProfile: '2/4'
      }
    },
    wednesday: { collisionAccepted: false, somaticLocation: 'chest' },
    flags: [
      {
        id: 'flag_c3_1',
        dimension: 'partner',
        category: 'synergy',
        type: 'FRICTION',
        severity: 'medium',
        severityScore: 4,
        description: 'Relationship intent is materially ahead of current consistency.',
        message: 'Relationship intent is materially ahead of current consistency.'
      }
    ]
  }
];
