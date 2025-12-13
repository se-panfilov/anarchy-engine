import type { BufferGeometry, Intersection, Mesh, Raycaster, Scene } from 'three';
import type { MeshBVH } from 'three-mesh-bvh';

import type { TRaycastBvhOptions } from './TRaycastBvhOptions';

export type TRaycastBvhService = Readonly<{
  computeBVHBoundsTree: (geometry: BufferGeometry, options?: TRaycastBvhOptions) => MeshBVH;
  disposeBVHBoundsTree: (geometry: BufferGeometry) => void;
  raycastWithBvh: (mesh: Mesh, raycaster: Raycaster, intersects: Array<Intersection>) => void;
  initializeRaycastBvh: (object: Mesh) => void;
  visualizeRaycastBvh: (mesh: Mesh, scene: Scene) => void;
}>;
