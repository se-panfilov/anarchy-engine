import type { BufferGeometry, Intersection, Mesh, Raycaster, Scene } from 'three';
import type { MeshBVH } from 'three-mesh-bvh';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree, MeshBVHHelper } from 'three-mesh-bvh';

import type { TBvhOptions, TBvhService } from '@/Engine/Collisions/Models';

function BvhService(): TBvhService {
  const computeBVHBoundsTree = (geometry: BufferGeometry, options?: TBvhOptions): MeshBVH => computeBoundsTree.call(geometry, options);

  const disposeBVHBoundsTree = (geometry: BufferGeometry): void => disposeBoundsTree.call(geometry);

  const raycastWithBVH = (mesh: Mesh, raycaster: Raycaster, intersects: Array<Intersection>): void => acceleratedRaycast.call(mesh, raycaster, intersects);

  function initializeBVH(object: Mesh): void {
    if (object.isMesh) computeBVHBoundsTree(object.geometry);
  }

  function visualizeBVH(mesh: Mesh, scene: Scene): void {
    const bvhHelper: MeshBVHHelper = new MeshBVHHelper(mesh, 10);
    scene.add(bvhHelper);
  }

  return {
    computeBVHBoundsTree,
    disposeBVHBoundsTree,
    raycastWithBVH,
    initializeBVH,
    visualizeBVH
  };
}

export const bvhService: TBvhService = BvhService();
