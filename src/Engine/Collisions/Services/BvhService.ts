import type { BufferGeometry, Intersection, Mesh, Raycaster, Scene } from 'three';
import type { MeshBVH } from 'three-mesh-bvh';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree, MeshBVHHelper } from 'three-mesh-bvh';

import type { TBvhOptions } from '@/Engine/Collisions/Models';

export const computeBVHBoundsTree = (geometry: BufferGeometry, options?: TBvhOptions): MeshBVH => computeBoundsTree.call(geometry, options);

export const disposeBVHBoundsTree = (geometry: BufferGeometry): void => disposeBoundsTree.call(geometry);

export const raycastWithBVH = (mesh: Mesh, raycaster: Raycaster, intersects: Array<Intersection>): void => acceleratedRaycast.call(mesh, raycaster, intersects);

export function initializeBVH(object: Mesh): void {
  if (object.isMesh) computeBVHBoundsTree(object.geometry);
}

export function visualizeBVH(mesh: Mesh, scene: Scene): void {
  const bvhHelper = new MeshBVHHelper(mesh, 10);
  scene.add(bvhHelper);
}
