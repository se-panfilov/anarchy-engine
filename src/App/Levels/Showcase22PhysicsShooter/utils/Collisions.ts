import type { TActor, TIntersectionsWatcher, TSceneWrapper, TSpaceServices } from '@/Engine';
import type { TSpatialGridWrapper } from '@/Engine/Spatial';
import { isNotDefined } from '@/Engine/Utils';

export function enableCollisions(mouseLineIntersectionsWatcher: TIntersectionsWatcher, { actorService, spatialGridService, collisionsService }: TSpaceServices): void {
  const sceneW: TSceneWrapper = actorService.getScene();
  const grid: TSpatialGridWrapper | undefined = spatialGridService.getRegistry().findByName('main_grid');
  if (isNotDefined(grid)) throw new Error(`Cannot find "main_grid" spatial grid`);
  const registry = actorService.getRegistry();
  const { findByName, findAllByTag } = registry;

  const sphereActor: TActor | undefined = findByName('sphere');
  const boxActor1: TActor | undefined = findByName('box_static_1');
  const boxActor2: TActor | undefined = findByName('box_static_2');
  const boxActor3: TActor | undefined = findByName('box_static_3');
  const boxActor4: TActor | undefined = findByName('box_static_4');
  const boxActor5: TActor | undefined = findByName('box_static_5');
  const boxActor6: TActor | undefined = findByName('box_static_6');
  const boxActor7: TActor | undefined = findByName('box_static_7');
  const targetActor1: TActor | undefined = findByName('target_1');
  const targetActor2: TActor | undefined = findByName('target_2');
  const targetActor3: TActor | undefined = findByName('target_3');

  if (
    isNotDefined(sphereActor) ||
    isNotDefined(boxActor1) ||
    isNotDefined(boxActor2) ||
    isNotDefined(boxActor3) ||
    isNotDefined(boxActor4) ||
    isNotDefined(boxActor5) ||
    isNotDefined(boxActor6) ||
    isNotDefined(boxActor7) ||
    isNotDefined(targetActor1) ||
    isNotDefined(targetActor2) ||
    isNotDefined(targetActor3)
  )
    throw new Error(`Cannot find actors`);
  grid.addActor(sphereActor);
  grid.addActor(boxActor1);
  grid.addActor(boxActor2);
  grid.addActor(boxActor3);
  grid.addActor(boxActor4);
  grid.addActor(boxActor5);
  grid.addActor(boxActor6);
  grid.addActor(boxActor7);
  grid.addActor(targetActor1);
  grid.addActor(targetActor2);
  grid.addActor(targetActor3);

  collisionsService.bvh.createBvhForActor(sphereActor);
  // collisionsService.bvh.createBvhForActor(targetActor1);
  // collisionsService.bvh.createBvhForActor(targetActor2);
  // collisionsService.bvh.createBvhForActor(targetActor3);

  const physicsBlocksList: ReadonlyArray<TActor> = findAllByTag('physics_block');
  physicsBlocksList.forEach((blockW: TActor): void => grid.addActor(blockW));

  mouseLineIntersectionsWatcher.addActor(boxActor1);
  mouseLineIntersectionsWatcher.addActor(boxActor2);
  mouseLineIntersectionsWatcher.addActor(boxActor3);
  mouseLineIntersectionsWatcher.addActor(boxActor4);
  mouseLineIntersectionsWatcher.addActor(boxActor5);
  mouseLineIntersectionsWatcher.addActor(boxActor6);
  mouseLineIntersectionsWatcher.addActor(boxActor7);
  mouseLineIntersectionsWatcher.addActor(targetActor1);
  mouseLineIntersectionsWatcher.addActor(targetActor2);
  mouseLineIntersectionsWatcher.addActor(targetActor3);

  // mouseLineIntersectionsWatcher.value$.subscribe((value: TIntersectionEvent): void => {
  //   grid._debugHighlightObjects(sceneW, value.point.x, value.point.z);
  // });

  grid._debugVisualizeCells(sceneW);
  collisionsService.bvh._debugVisualizeBvhForScene(sceneW);
}
