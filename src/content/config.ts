import { defineCollection, z } from 'astro:content';

// Shared truth fields — every primitive can hold the full emotional spectrum
const truthFields = {
  valence: z.enum(['luminous', 'dark', 'mixed']).default('mixed'),
  emotional_range: z.array(z.string()).optional(),
  friction: z.string().optional(),    // What resisted here?
  misread: z.string().optional(),     // What did I get wrong first?
  cost: z.string().optional(),        // What did this take from me, others, or the work?
  residue: z.string().optional(),     // What still has not been resolved?
};

// Context fields — travel, coaching, teaching etc. as input channels, not primitives
const contextFields = {
  context: z.enum(['travel', 'coaching', 'teaching', 'building', 'reading']).optional(),
  context_location: z.string().optional(),
};

const fusions = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    display_title: z.string().optional(),
    display_subtitle: z.string().optional(),
    date: z.coerce.date(),
    categories: z.array(z.string()),
    tags: z.array(z.string()),
    description: z.string(),
    source_research: z.string().optional(),
    fusion_type: z.enum(['public', 'internal']).default('public'),
    fusion_nool: z.object({
      nokkam: z.string(),
      vadivam: z.string(),
      sangilai: z.string(),
    }).optional(),
    fusion_point: z.object({
      idea_a: z.string().optional(),
      idea_b: z.string().optional(),
      ideas: z.array(z.string()).optional(),
    }).optional(),
    origin_nodes: z.array(z.string()).optional(),
    ...truthFields,
    ...contextFields,
  }),
});

const knots = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    knot_number: z.number(),
    domain: z.string(),
    series: z.string(),
    series_number: z.number(),
    slug_name: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    punch_line_1: z.string(),
    punch_line_2: z.string(),
    felt_hook: z.string().optional(),
    emotion_target: z.string().optional(),
    never_say: z.array(z.string()).optional(),
    kural_tamil: z.string().optional(),
    kural_translation: z.string().optional(),
    kural_number: z.number().optional(),
    kural_bridge: z.string().optional(),
    prev_knot: z.string().optional(),
    prev_knot_title: z.string().optional(),
    next_knot: z.string().optional(),
    next_knot_title: z.string().optional(),
    origin_nodes: z.array(z.string()).optional(),
    ...truthFields,
    ...contextFields,
  }),
});

const sparks = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    source: z.string().optional(),
    signal: z.string(),
    temperature: z.enum(['🔥', '🔥🔥', '🔥🔥🔥']),
    tags: z.array(z.string()),
    description: z.string(),
    fusion_link: z.string().optional(),
    origin_nodes: z.array(z.string()).optional(),
    ...truthFields,
    ...contextFields,
  }),
});

const beads = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    essence: z.string(),
    resonance: z.string(),
    kural_number: z.number().optional(),
    born_from_knot: z.string().optional(),
    date: z.coerce.date(),
    origin_nodes: z.array(z.string()).optional(),
    ...truthFields,
    ...contextFields,
  }),
});

const claws = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    grip: z.string(),
    release: z.string(),
    resonance: z.string(),
    born_from_literature: z.string().optional(),
    date: z.coerce.date(),
    origin_nodes: z.array(z.string()).optional(),
    ...truthFields,
    ...contextFields,
  }),
});

const wows = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    essence: z.string(),
    origin_nodes: z.array(z.string()).optional(),
    ...truthFields,
    ...contextFields,
  }),
});

const awes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    essence: z.string(),
    origin_nodes: z.array(z.string()).optional(),
    ...truthFields,
    ...contextFields,
  }),
});

const syncs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    essence: z.string(),
    signal_type: z.enum(['resonance', 'friction', 'insight']).default('resonance'),
    tags: z.array(z.string()).optional(),
    origin_nodes: z.array(z.string()).optional(),
    ...truthFields,
    ...contextFields,
  }),
});

const digs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    essence: z.string(),
    origin_nodes: z.array(z.string()).optional(),
    ...truthFields,
    ...contextFields,
  }),
});

const spars = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    confidence: z.string().optional(),
    source: z.string().optional(),
    tags: z.array(z.string()).optional(),
    origin_nodes: z.array(z.string()).optional(),
    ...truthFields,
    ...contextFields,
  }),
});

// The 11th atom: things that ended, failed, or had to be let burn (apoptosis)
const ashes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    what_ended: z.string(),
    what_remains: z.string().optional(),
    origin_nodes: z.array(z.string()).optional(),
  }),
});

// The 12th atom: Anti-Resonance. The immunological boundary.
const voids = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    void_type: z.enum(['static', 'drift', 'snap', 'veto']),
    essence: z.string(),
    origin_nodes: z.array(z.string()).optional(),
    ...truthFields,
    ...contextFields,
  }),
});

export const collections = { fusions, knots, sparks, beads, claws, wows, awes, syncs, digs, spars, ashes, voids };

