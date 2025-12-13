import type { TActorService, TActorWrapperAsync, TIntersectionsWatcher, TSceneWrapper } from '@/Engine';
import type { TSpatialGridService } from '@/Engine/Spatial';
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

  const grid = spatialGridService.create(200, 200, 10, 0, 0);

  // spatialGridService.grid.addToGridBulk(grid, actorService.getRegistry().getAll());
  const sphereActorW: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('sphere');
  if (isNotDefined(sphereActorW)) throw new Error(`Cannot find "sphere" actor`);
  spatialGridService.addActorToGrid(grid, sphereActorW);

  const boxActor1W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('box_static1');
  const boxActor2W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('box_static2');
  const boxActor3W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('box_static3');
  if (isNotDefined(boxActor1W) || isNotDefined(boxActor2W) || isNotDefined(boxActor3W)) throw new Error(`Cannot find "box_static" actors`);
  spatialGridService.addActorToGrid(grid, boxActor1W);
  spatialGridService.addActorToGrid(grid, boxActor2W);
  spatialGridService.addActorToGrid(grid, boxActor3W);

  mouseLineIntersectionsWatcher.value$.subscribe((value) => {
    const objects = spatialGridService.getAllInCell(grid, value.point.x, value.point.z);
    // TODO (S.Panfilov) CWP Actor's position should be observable. When actors move, check if need to update grid
    console.log(objects.map((actorW: TActorWrapperAsync) => actorW.name));
    spatialGridService._debugHighlightObjects(grid, sceneW, value.point.x, value.point.z);
  });

  spatialGridService._debugVisualizeCells(grid, sceneW);
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
