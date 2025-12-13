import { Vector2 } from 'three';

import type { TCameraWrapper, TCollisionsService, TIntersectionsWatcher, TSceneWrapper } from '@/Engine';

export function enableCollisions(scene: TSceneWrapper, cameraW: TCameraWrapper, mouseLineIntersectionsWatcher: TIntersectionsWatcher, collisionsService: TCollisionsService): void {
  // TODO (S.Panfilov) CWP 2. Visualize raycasting
  // TODO (S.Panfilov) CWP 3. Fix collision detection
  // TODO (S.Panfilov) CWP 4. make sure raycasting is working inside the grid only
  // TODO (S.Panfilov) CWP 5. make bullets and actors can travel among grids

  const spatialGrid = collisionsService.grid.createGrid(200, 200, 10, 0, 0);

  // mouseLineIntersectionsWatcher.value$.subscribe((value) => {
  //   console.log(value.point);
  //   //collisionsService._debugHighlightCellObjects(new Vector2(value.point.x, value.point.z), cameraW, scene, spatialGrid);
  // });

  collisionsService.grid._debugVisualizeCells(spatialGrid, scene);
  setTimeout(() => {
    collisionsService.grid._debugHighlightObjects(new Vector2(5, 16), cameraW, scene, spatialGrid);
  }, 1500);

  // scene.entity.traverse((object: Object3D): void => {
  //   if ((object as Mesh).isMesh) {
  //     // collisionsService.initializeRaycastBvh(object as Mesh);
  //     collisionsService.addObjectToGrid(object);
  //     // collisionsService.visualizeRaycastBvh(object as Mesh, actorService.getScene().entity);
  //   }
  // });

  // collisionsService.visualizeRBush(collisionsService.getSpatialGrid(), scene.entity);
}
