import type { BufferGeometry, Intersection, Raycaster } from 'three';
import type { MeshBVH } from 'three-mesh-bvh';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree, MeshBVHHelper } from 'three-mesh-bvh';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TBvhOptions, TBvhService } from '@/Engine/Collisions/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

export function BvhService(): TBvhService {
  const computeBVHBoundsTree = (geometry: BufferGeometry, options?: TBvhOptions): MeshBVH => computeBoundsTree.call(geometry, options);
  const disposeBVHBoundsTree = (geometry: BufferGeometry): void => disposeBoundsTree.call(geometry);
  const raycastWithBvh = (actorW: TActorWrapperAsync, raycaster: Raycaster, intersects: Array<Intersection>): void => acceleratedRaycast.call(actorW.entity, raycaster, intersects);

  function createBvhForActor(actorW: TActorWrapperAsync, options?: TBvhOptions): void | never {
    if (!actorW.entity.isMesh) throw new Error(`Cannot create BVH for a non-mesh`);
    computeBVHBoundsTree(actorW.entity.geometry, options);
  }

  // this highlight is for debugging purposes only
  function _debugVisualizeBvhForActor(actorW: TActorWrapperAsync, sceneW: TSceneWrapper, depth: number = 10): void {
    const bvhHelper: MeshBVHHelper = new MeshBVHHelper(actorW.entity, depth);
    sceneW.entity.add(bvhHelper);
  }

  // this highlight is for debugging purposes only
  function _debugVisualizeBvhForScene(sceneW: TSceneWrapper, depth: number = 10): void {
    sceneW.entity.traverse((object) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if ((object as any).isMesh) {
        const bvhHelper: MeshBVHHelper = new MeshBVHHelper(object, depth);
        sceneW.entity.add(bvhHelper);
      }
    });
  }

  return {
    computeBVHBoundsTree,
    disposeBVHBoundsTree,
    raycastWithBvh,
    createBvhForActor,
    _debugVisualizeBvhForActor,
    _debugVisualizeBvhForScene
  };
}
