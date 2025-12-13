import type { TActorService, TActorWrapperAsync, TIntersectionEvent, TIntersectionsWatcher, TSceneWrapper } from '@/Engine';
import type { TSpatialGridService, TSpatialGridWrapper } from '@/Engine/Spatial';
import { isNotDefined } from '@/Engine/Utils';

export async function enableCollisions(
  sceneW: TSceneWrapper,
  actorService: TActorService,
  mouseLineIntersectionsWatcher: TIntersectionsWatcher,
  spatialGridService: TSpatialGridService
): Promise<void> {
  const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');
  if (isNotDefined(grid)) throw new Error(`Cannot find "main_grid" spatial grid`);

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
}
