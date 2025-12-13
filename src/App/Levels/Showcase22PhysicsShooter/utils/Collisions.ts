import type { TActorWrapperAsync, TIntersectionEvent, TIntersectionsWatcher, TSceneWrapper, TSpaceServices } from '@/Engine';
import type { TSpatialGridWrapper } from '@/Engine/Spatial';
import { isNotDefined } from '@/Engine/Utils';

export async function enableCollisions(mouseLineIntersectionsWatcher: TIntersectionsWatcher, { actorService, spatialGridService, collisionsService }: TSpaceServices): Promise<void> {
  const sceneW: TSceneWrapper = actorService.getScene();
  const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');
  if (isNotDefined(grid)) throw new Error(`Cannot find "main_grid" spatial grid`);

  const sphereActorW: TActorWrapperAsync | undefined = await actorService.getRegistry().findByNameAsync('sphere');
  if (isNotDefined(sphereActorW)) throw new Error(`Cannot find "sphere" actor`);
  grid.addActor(sphereActorW);

  collisionsService.bvh.createBvhForActor(sphereActorW);

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

  const physicsBlocksList: ReadonlyArray<TActorWrapperAsync> = actorService.getRegistry().findAllByTag('physics_block');
  physicsBlocksList.forEach((blockW: TActorWrapperAsync) => grid.addActor(blockW));

  mouseLineIntersectionsWatcher.addActor(boxActor1W);
  mouseLineIntersectionsWatcher.addActor(boxActor2W);
  mouseLineIntersectionsWatcher.addActor(boxActor3W);
  mouseLineIntersectionsWatcher.addActor(boxActor4W);
  mouseLineIntersectionsWatcher.addActor(boxActor5W);
  mouseLineIntersectionsWatcher.addActor(boxActor6W);
  mouseLineIntersectionsWatcher.addActor(boxActor7W);

  mouseLineIntersectionsWatcher.value$.subscribe((value: TIntersectionEvent): void => {
    grid._debugHighlightObjects(sceneW, value.point.x, value.point.z);
  });

  grid._debugVisualizeCells(sceneW);
  collisionsService.bvh._debugVisualizeBvhForActor(sphereActorW, sceneW);
}
