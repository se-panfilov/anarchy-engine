import type { TActorService, TActorWrapperAsync, TCollisionsService, TIntersectionsWatcher, TSceneWrapper } from '@/Engine';
import { isNotDefined } from '@/Engine/Utils';

export async function enableCollisions(scene: TSceneWrapper, actorService: TActorService, mouseLineIntersectionsWatcher: TIntersectionsWatcher, collisionsService: TCollisionsService): Promise<void> {
  // TODO (S.Panfilov) CWP 2. Visualize raycasting
  // TODO (S.Panfilov) CWP 3. Fix collision detection
  // TODO (S.Panfilov) CWP 4. make sure raycasting is working inside the grid only
  // TODO (S.Panfilov) CWP 5. make bullets and actors can travel among grids

  const grid = collisionsService.grid.createGrid(200, 200, 10, 0, 0);

  // collisionsService.grid.addToGridBulk(grid, actorService.getRegistry().getAll());
  const sphereActorW: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('sphere');
  if (isNotDefined(sphereActorW)) throw new Error(`Cannot find "sphere" actor`);
  // collisionsService.grid.addActorToGrid(grid, sphereActorW);

  const boxActor1W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('box_static1');
  const boxActor2W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('box_static2');
  const boxActor3W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('box_static3');
  if (isNotDefined(boxActor1W) || isNotDefined(boxActor2W) || isNotDefined(boxActor3W)) throw new Error(`Cannot find "box_static" actors`);
  collisionsService.grid.addActorToGrid(grid, boxActor1W);
  collisionsService.grid.addActorToGrid(grid, boxActor2W);
  collisionsService.grid.addActorToGrid(grid, boxActor3W);

  mouseLineIntersectionsWatcher.value$.subscribe((value) => {
    // console.log(value.point);
    const objects = collisionsService.grid.getAllInCell(grid, value.point.x, value.point.z);
    console.log(objects.map((o) => o.name));
    //collisionsService._debugHighlightCellObjects(new Vector2(value.point.x, value.point.z), cameraW, scene, grid);
  });

  collisionsService.grid._debugVisualizeCells(grid, scene);
  // setTimeout(() => {
  // collisionsService.grid._debugHighlightObjects(new Vector2(5, 16), cameraW, scene, grid);
  // }, 1500);

  // scene.entity.traverse((object: Object3D): void => {
  //   if ((object as Mesh).isMesh) {
  //     // collisionsService.initializeRaycastBvh(object as Mesh);
  //     collisionsService.addObjectToGrid(object);
  //     // collisionsService.visualizeRaycastBvh(object as Mesh, actorService.getScene().entity);
  //   }
  // });

  // collisionsService.visualizeRBush(collisionsService.getSpatialGrid(), scene.entity);
}
