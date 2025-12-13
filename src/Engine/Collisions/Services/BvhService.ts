import type { BufferGeometry, Group, Intersection, Mesh, Raycaster } from 'three';
import type { MeshBVH } from 'three-mesh-bvh';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree, MeshBVHHelper } from 'three-mesh-bvh';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TBvhOptions, TBvhService } from '@/Engine/Collisions/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

export function BvhService(): TBvhService {
  const computeBVHBoundsTree = (geometry: BufferGeometry, options?: TBvhOptions): MeshBVH => computeBoundsTree.call(geometry, options);
  const disposeBVHBoundsTree = (geometry: BufferGeometry): void => disposeBoundsTree.call(geometry);
  function raycastWithBvh(actorW: TActorWrapperAsync, raycaster: Raycaster, intersects: Array<Intersection>): void {
    processEntity(actorW.entity, (mesh) => {
      acceleratedRaycast.call(mesh, raycaster, intersects);
    });
  }

  function createBvhForActor(actorW: TActorWrapperAsync, options?: TBvhOptions): void {
    processEntity(actorW.entity, (mesh: Mesh) => computeBVHBoundsTree(mesh.geometry, options));
  }

  // this highlight is for debugging purposes only
  function _debugVisualizeBvhForActor(actorW: TActorWrapperAsync, sceneW: TSceneWrapper, depth: number = 10): void {
    processEntity(actorW.entity, (mesh: Mesh) => {
      const bvhHelper: MeshBVHHelper = new MeshBVHHelper(mesh, depth);
      sceneW.entity.add(bvhHelper);
    });
  }

  // this highlight is for debugging purposes only
  function _debugVisualizeBvhForScene(sceneW: TSceneWrapper, depth: number = 10): void {
    sceneW.entity.traverse((object) => {
      if ((object as Mesh).isMesh) {
        const bvhHelper: MeshBVHHelper = new MeshBVHHelper(object as Mesh, depth);
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

function processEntity(entity: Mesh | Group, callback: (mesh: Mesh) => void): void {
  if ((entity as Mesh).isMesh) return callback(entity as Mesh);
  if ((entity as Group).isGroup) {
    return entity.traverse((object: unknown) => {
      if ((object as Mesh).isMesh) {
        callback(object as Mesh);
      }
    });
  }
  return undefined;
}
