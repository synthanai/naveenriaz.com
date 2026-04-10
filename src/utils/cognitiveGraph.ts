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
  if (_cachedGraph) return _cachedGraph;

  const reverseGraph: SlugMap = {};
  const allNodes: any[] = [];
  
  // 1. Gather all nodes
  for (const collectionName of PRIMITIVE_COLLECTIONS) {
    try {
      const items = await getCollection(collectionName as any);
      if (!items) continue;
      items.forEach(item => {
        allNodes.push({ collection: collectionName, item });
      });
    } catch (e) {
      console.warn(`[CognitiveGraph] Failed to load collection ${collectionName}`);
    }
  }

  // Helper to register an edge
  const addEdge = (parentId: string, childId: string) => {
    if (!reverseGraph[parentId]) reverseGraph[parentId] = [];
    if (!reverseGraph[parentId].includes(childId) && parentId !== childId) {
      reverseGraph[parentId].push(childId);
    }
  };

  // 2. Build the explicit and legacy graph
  for (const node of allNodes) {
    const { collection, item } = node;
    const currentId = `${collection}:${item.slug}`;
    const data = item.data;

    // A. The new universal explicit array
    const parentIds: string[] = data.origin_nodes || [];
    for (const pid of parentIds) {
      addEdge(pid, currentId);
    }

    // B. Legacy "prev_knot" (Linear Sequence)
    if (data.prev_knot) {
      addEdge(`knots:${data.prev_knot}`, currentId);
    }
    
    // C. Legacy "born_from_knot" 
    if (data.born_from_knot) {
      // born_from_knot is usually a 3 digit string like "003"
      // we have to find the knot slug that matches that knot_number
      const parentKnot = allNodes.find(n => n.collection === 'knots' && n.item.data.knot_number === Number(data.born_from_knot));
      if (parentKnot) {
        addEdge(`knots:${parentKnot.item.slug}`, currentId);
      }
    }

    // D. Legacy "fusion_link" 
    if (data.fusion_link) {
      // format: "/fusions/agreement-is-a-bug", extract the slug
      const fusionSlug = data.fusion_link.split('/').pop();
      // Notice: If a spark has a fusion_link, the Spark is the PARENT of the Fusion!
      // The Fusion is "born from" the Spark.
      if (fusionSlug) {
        addEdge(currentId, `fusions:${fusionSlug}`);
      }
    }
  }

  // 3. Deep Think (Semantic Tag Convergence)
  // If no explicit connections exist, we analyze arrays of tags to weave semantic links.
  for (const nodeA of allNodes) {
    const idA = `${nodeA.collection}:${nodeA.item.slug}`;
    const tagsA: string[] = nodeA.item.data.tags || [];
    
    // We only forge semantic links if node A is highly isolated or strongly typed
    // Let's create an implicit flow from Sparks -> Fusions -> Knots if they heavily intersect natively.
    if (tagsA.length > 0) {
      for (const nodeB of allNodes) {
        const idB = `${nodeB.collection}:${nodeB.item.slug}`;
        if (idA === idB) continue;

        const tagsB: string[] = nodeB.item.data.tags || [];
        const intersection = tagsA.filter(t => tagsB.includes(t));

        // If they share 2 or more semantic tags natively, establish an organic resonance connection.
        // We assume directionality based on primitive depth: Spark (Mind) -> Knot (Body)
        if (intersection.length >= 2) {
           // We route Spark -> Fusion OR Spark -> Knot
           if (nodeA.collection === 'sparks' && (nodeB.collection === 'fusions' || nodeB.collection === 'knots')) {
             addEdge(idA, idB);
           }
        }
      }
    }
  }

  _cachedGraph = reverseGraph;
  return reverseGraph;
}

export async function getForwardPaths(collection: string, slug: string): Promise<string[]> {
  const graph = await buildReverseGraph();
  const id = `${collection}:${slug}`;
  return graph[id] || [];
}
