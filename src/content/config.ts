import { defineCollection, z } from 'astro:content';

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
  }),
});

const wows = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    essence: z.string(),
    origin_nodes: z.array(z.string()).optional(),
  }),
});

const awes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    essence: z.string(),
    origin_nodes: z.array(z.string()).optional(),
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
  }),
});

const digs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    essence: z.string(),
    origin_nodes: z.array(z.string()).optional(),
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
  }),
});

export const collections = { fusions, knots, sparks, beads, claws, wows, awes, syncs, digs, spars };
