import type { TActorService, TActorWrapperAsync, TIntersectionsWatcher, TSceneWrapper } from '@/Engine';
import type { TSpatialGridService, TSpatialGridWrapper } from '@/Engine/Spatial';
import { isNotDefined } from '@/Engine/Utils';

export async function enableCollisions(
  sceneW: TSceneWrapper,
  actorService: TActorService,
  mouseLineIntersectionsWatcher: TIntersectionsWatcher,
  spatialGridService: TSpatialGridService
): Promise<void> {
  // TODO (S.Panfilov) CWP 2. Visualize raycasting
  // TODO (S.Panfilov) CWP 3. Fix collision detection
  // TODO (S.Panfilov) CWP 4. make sure raycasting is working inside the grid only
  // TODO (S.Panfilov) CWP 5. make bullets and actors can travel among grids
  // TODO (S.Panfilov) CWP 6. add checks for spatial config (name, etc)
  // TODO (S.Panfilov) CWP 7. make sure actors are added properly via config (grid property should work, "cell" might be need to be removed )
  // TODO (S.Panfilov) CWP 9. check how it works when an actor is bigger than a cell

  const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');
  if (isNotDefined(grid)) throw new Error(`Cannot find "main_grid" spatial grid`);

  // spatialGridService.grid.addToGridBulk(actorService.getRegistry().getAll());
  const sphereActorW: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('sphere');
  if (isNotDefined(sphereActorW)) throw new Error(`Cannot find "sphere" actor`);
  grid.addActor(sphereActorW);

  const boxActor1W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('box_static1');
  const boxActor2W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('box_static2');
  const boxActor3W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('box_static3');
  const boxActor4W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('box_static4');
  const boxActor5W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('box_static5');
  const boxActor6W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('box_static6');
  const boxActor7W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('box_static7');
  if (isNotDefined(boxActor1W) || isNotDefined(boxActor2W) || isNotDefined(boxActor3W) || isNotDefined(boxActor4W) || isNotDefined(boxActor5W) || isNotDefined(boxActor6W) || isNotDefined(boxActor7W))
    throw new Error(`Cannot find "box_static" actors`);
  grid.addActor(boxActor1W);
  grid.addActor(boxActor2W);
  grid.addActor(boxActor3W);
  grid.addActor(boxActor4W);
  grid.addActor(boxActor5W);
  grid.addActor(boxActor6W);
  grid.addActor(boxActor7W);

  mouseLineIntersectionsWatcher.addActor(boxActor1W);
  mouseLineIntersectionsWatcher.addActor(boxActor2W);
  mouseLineIntersectionsWatcher.addActor(boxActor3W);
  mouseLineIntersectionsWatcher.addActor(boxActor4W);
  mouseLineIntersectionsWatcher.addActor(boxActor5W);
  mouseLineIntersectionsWatcher.addActor(boxActor6W);

  mouseLineIntersectionsWatcher.value$.subscribe((value) => {
    const objects = grid.getAllInCell(value.point.x, value.point.z);
    // TODO (S.Panfilov) CWP Actor's position should be observable. When actors move, check if need to update grid
    // console.log(objects.map((actorW: TActorWrapperAsync) => actorW.name));
    grid._debugHighlightObjects(sceneW, value.point.x, value.point.z);
  });

  grid._debugVisualizeCells(sceneW);
  // setTimeout(() => {
  // spatialGridService.grid._debugHighlightObjects(new Vector2(5, 16), cameraW, sceneW, grid);
  // }, 1500);

  // sceneW.entity.traverse((object: Object3D): void => {
  //   if ((object as Mesh).isMesh) {
  //     // collisionsService.initializeRaycastBvh(object as Mesh);
  //     spatialGridService.addObjectToGrid(object);
  //     // collisionsService.visualizeRaycastBvh(object as Mesh, actorService.getScene().entity);
  //   }
  // });

  // spatialGridService.visualizeRBush(spatialGridService.getSpatialGrid(), sceneW.entity);
}
