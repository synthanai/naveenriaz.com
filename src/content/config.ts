import { defineCollection, z } from 'astro:content';

const collisions = defineCollection({
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
    collision_type: z.enum(['public', 'internal']).default('public'),
    collision_nool: z.object({
      nokkam: z.string(),
      vadivam: z.string(),
      sangilai: z.string(),
    }).optional(),
    collision_point: z.object({
      idea_a: z.string().optional(),
      idea_b: z.string().optional(),
      ideas: z.array(z.string()).optional(),
    }).optional(),
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
  }),
});

const sparks = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    source: z.string(),
    signal: z.string(),
    temperature: z.enum(['🔥', '🔥🔥', '🔥🔥🔥']),
    tags: z.array(z.string()),
    description: z.string(),
    collision_link: z.string().optional(),
  }),
});

export const collections = { collisions, knots, sparks };
