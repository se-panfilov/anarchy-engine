import type { Mesh, Object3D } from 'three';

import type { TCollisionsService, TSceneWrapper } from '@/Engine';

export function enableCollisions(scene: TSceneWrapper, collisionsService: TCollisionsService): void {
  //enable collisions
  scene.entity.traverse((object: Object3D): void => {
    if ((object as Mesh).isMesh) {
      // collisionsService.initializeRaycastBvh(object as Mesh);
      collisionsService.addObjectToGrid(object);
      // collisionsService.visualizeRaycastBvh(object as Mesh, actorService.getScene().entity);
    }
  });

  collisionsService.visualizeRBush(collisionsService.getSpatialGrid(), scene.entity);
}
