import type { TActor, TIntersectionsCameraWatcher, TSceneWrapper, TSpaceServices } from '@Anarchy/Engine';
import type { TSpatialGridWrapper } from '@Anarchy/Engine/Spatial';

export function enableCollisions(mouseLineIntersectionsWatcher: TIntersectionsCameraWatcher, { actorService, spatialGridService, collisionsService }: TSpaceServices): void {
  const sceneW: TSceneWrapper = actorService.getScene();
  const grid: TSpatialGridWrapper = spatialGridService.getRegistry().getByName('main_grid');
  const registry = actorService.getRegistry();
  const { getByName, findAllByTag } = registry;

  const sphereActor: TActor = getByName('sphere');
  const boxActor1: TActor = getByName('box_static_1');
  const boxActor2: TActor = getByName('box_static_2');
  const boxActor3: TActor = getByName('box_static_3');
  const boxActor4: TActor = getByName('box_static_4');
  const boxActor5: TActor = getByName('box_static_5');
  const boxActor6: TActor = getByName('box_static_6');
  const boxActor7: TActor = getByName('box_static_7');
  const targetActor1: TActor = getByName('target_1');
  const targetActor2: TActor = getByName('target_2');
  const targetActor3: TActor = getByName('target_3');

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
