import type { BufferGeometry, Intersection, Mesh, Raycaster, Scene } from 'three';
import type { MeshBVH } from 'three-mesh-bvh';

import type { TBvhOptions } from './TBvhOptions';

export type TBvhService = Readonly<{
  computeBVHBoundsTree: (geometry: BufferGeometry, options?: TBvhOptions) => MeshBVH;
  disposeBVHBoundsTree: (geometry: BufferGeometry) => void;
  raycastWithBVH: (mesh: Mesh, raycaster: Raycaster, intersects: Array<Intersection>) => void;
  initializeBVH: (object: Mesh) => void;
  visualizeBVH: (mesh: Mesh, scene: Scene) => void;
}>;
