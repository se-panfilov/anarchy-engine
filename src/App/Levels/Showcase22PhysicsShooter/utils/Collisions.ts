import type { Mesh, Object3D } from 'three';

import type { TCollisionsService, TSceneWrapper } from '@/Engine';

export function enableCollisions(scene: TSceneWrapper, collisionsService: TCollisionsService): void {
  // TODO (S.Panfilov) CWP 1. Visualize grids
  // TODO (S.Panfilov) CWP 2. Visualize raycasting
  // TODO (S.Panfilov) CWP 3. Fix collision detection
  // TODO (S.Panfilov) CWP 4. make sure raycasting is working inside the grid only
  // TODO (S.Panfilov) CWP 5. make bullets and actors can travel among grids
  scene.entity.traverse((object: Object3D): void => {
    if ((object as Mesh).isMesh) {
      // collisionsService.initializeRaycastBvh(object as Mesh);
      collisionsService.addObjectToGrid(object);
      // collisionsService.visualizeRaycastBvh(object as Mesh, actorService.getScene().entity);
    }
  });

  collisionsService.visualizeRBush(collisionsService.getSpatialGrid(), scene.entity);
}
