import { getCollection, type CollectionKey } from 'astro:content';

export type SlugMap = Record<string, string[]>;

export const PRIMITIVE_COLLECTIONS: CollectionKey[] = [
  'fusions', 'knots', 'sparks', 'beads', 'claws', 'wows', 'awes', 'syncs', 'digs', 'spars'
];

let _cachedGraph: SlugMap | null = null;

/**
 * Builds a reverse index of the knowledge graph.
 * If A spawned B and C, `reverseGraph[A]` will equal `[B, C]`.
 */
export async function buildReverseGraph(): Promise<SlugMap> {
  // In dev mode, we might want to recompute, but Astro dev server reloads the module.
  // We'll cache it per-module loading.
  if (_cachedGraph) return _cachedGraph;

  const reverseGraph: SlugMap = {};
  
  for (const collectionName of PRIMITIVE_COLLECTIONS) {
    try {
      const items = await getCollection(collectionName as any);
      if (!items) continue;
      
      for (const item of items) {
        // Assume origin_nodes is an array of strings in format `collection:slug`
        const parentIds: string[] = item.data.origin_nodes || [];
        const currentId = `${collectionName}:${item.slug}`;
        
        for (const parentId of parentIds) {
          if (!reverseGraph[parentId]) {
            reverseGraph[parentId] = [];
          }
          if (!reverseGraph[parentId].includes(currentId)) {
            reverseGraph[parentId].push(currentId);
          }
        }
      }
    } catch (e) {
      // Collection might not exist yet or have no items, safely ignore.
      console.warn(`[CognitiveGraph] Failed to load collection ${collectionName}:`, e);
    }
  }

  _cachedGraph = reverseGraph;
  return reverseGraph;
}

/**
 * Given a node identifier (e.g. `knots:my-knot`), returns all nodes that were birthed from it.
 */
export async function getForwardPaths(collection: string, slug: string): Promise<string[]> {
  const graph = await buildReverseGraph();
  const id = `${collection}:${slug}`;
  return graph[id] || [];
}
