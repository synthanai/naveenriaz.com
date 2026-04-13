import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared truth fields: every moment can hold the full emotional spectrum
const truthFields = {
  valence: z.enum(['luminous', 'dark', 'mixed']).default('mixed'),
  emotional_range: z.array(z.string()).optional().nullable(),
  friction: z.string().optional().nullable(),    // What resisted here?
  misread: z.string().optional().nullable(),     // What did I get wrong first?
  cost: z.string().optional().nullable(),        // What did this take from me, others, or the work?
  residue: z.string().optional().nullable(),     // What still has not been resolved?
};

// Context fields: travel, coaching, teaching etc. as input channels, not moments
const contextFields = {
  context: z.enum(['travel', 'coaching', 'teaching', 'building', 'reading']).optional(),
  context_location: z.string().optional(),
};

const fusions = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/fusions' }),
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
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/knots' }),
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
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/sparks' }),
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
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/beads' }),
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
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/claws' }),
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
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/wows' }),
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
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/awes' }),
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
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/syncs' }),
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
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/digs' }),
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
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/spars' }),
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

// The 11th moment: things that ended, failed, or had to be let burn (apoptosis)
const scars = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/scars' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    what_ended: z.string(),
    what_remains: z.string().optional(),
    origin_nodes: z.array(z.string()).optional(),
  }),
});

// The 12th moment: Anti-Resonance. The immunological boundary.
const voids = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/voids' }),
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

export const collections = { fusions, knots, sparks, beads, claws, wows, awes, syncs, digs, spars, scars, voids };
