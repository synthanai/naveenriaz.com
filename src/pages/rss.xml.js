import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const [fusions, sparks, knots, beads] = await Promise.all([
    getCollection('fusions'),
    getCollection('sparks'),
    getCollection('knots'),
    getCollection('beads'),
  ]);

  // Combine all content with collection routing
  const items = [
    ...fusions.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: `/fusions/${p.id}/`,
    })),
    ...sparks.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: `/sparks/${p.id}/`,
    })),
    ...knots.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: `/knots/${p.id}/`,
    })),
    ...beads.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.essence,
      link: `/beads/`,
    })),
  ];

  // Sort by date descending
  items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  return rss({
    title: 'Naveen Riaz | நவீன் ரியாஸ்',
    description: 'Where ancient patterns collide with emergent intelligence. Frameworks, friction, and the philosophy underneath the build.',
    site: context.site,
    items: items.slice(0, 50),
    customData: '<language>en</language>',
  });
}
