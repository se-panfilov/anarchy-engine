import type { TActorService, TActorWrapperAsync, TCollisionsService, TIntersectionsWatcher, TSceneWrapper } from '@/Engine';
import { isNotDefined } from '@/Engine/Utils';

export async function enableCollisions(sceneW: TSceneWrapper, actorService: TActorService, mouseLineIntersectionsWatcher: TIntersectionsWatcher, collisionsService: TCollisionsService): Promise<void> {
  // TODO (S.Panfilov) CWP 2. Visualize raycasting
  // TODO (S.Panfilov) CWP 3. Fix collision detection
  // TODO (S.Panfilov) CWP 4. make sure raycasting is working inside the tree only
  // TODO (S.Panfilov) CWP 5. make bullets and actors can travel among grids

  const tree = collisionsService.grid.createGrid(200, 200, 10, 0, 0);

  // collisionsService.tree.addToGridBulk(tree, actorService.getRegistry().getAll());
  const sphereActorW: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('sphere');
  if (isNotDefined(sphereActorW)) throw new Error(`Cannot find "sphere" actor`);
  collisionsService.grid.addActorToGrid(tree, sphereActorW);

  const boxActor1W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('box_static1');
  const boxActor2W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('box_static2');
  const boxActor3W: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('box_static3');
  if (isNotDefined(boxActor1W) || isNotDefined(boxActor2W) || isNotDefined(boxActor3W)) throw new Error(`Cannot find "box_static" actors`);
  collisionsService.grid.addActorToGrid(tree, boxActor1W);
  collisionsService.grid.addActorToGrid(tree, boxActor2W);
  collisionsService.grid.addActorToGrid(tree, boxActor3W);

  mouseLineIntersectionsWatcher.value$.subscribe((value) => {
    const objects = collisionsService.grid.getAllInCell(tree, value.point.x, value.point.z);
    // TODO (S.Panfilov) CWP Actor's position should be observable. When actors move, check if need to update grid
    console.log(objects.map((actorW: TActorWrapperAsync) => actorW.name));
    collisionsService.grid._debugHighlightObjects(tree, sceneW, value.point.x, value.point.z);
  });

  collisionsService.grid._debugVisualizeCells(tree, sceneW);
  // setTimeout(() => {
  // collisionsService.tree._debugHighlightObjects(new Vector2(5, 16), cameraW, sceneW, tree);
  // }, 1500);

  // sceneW.entity.traverse((object: Object3D): void => {
  //   if ((object as Mesh).isMesh) {
  //     // collisionsService.initializeRaycastBvh(object as Mesh);
  //     collisionsService.addObjectToGrid(object);
  //     // collisionsService.visualizeRaycastBvh(object as Mesh, actorService.getScene().entity);
  //   }
  // });

  // collisionsService.visualizeRBush(collisionsService.getSpatialGrid(), sceneW.entity);
}
