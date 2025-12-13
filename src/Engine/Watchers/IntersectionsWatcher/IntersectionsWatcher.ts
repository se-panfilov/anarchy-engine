import type { IMousePosition, ISceneObject } from '@Engine/Models';
import type { IAbstractWatcher, IMousePositionWatcher } from '@Engine/Watchers';
import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher/AbstractWatcher';
import { Raycaster } from 'three';

import { getNormalizedMousePosition, type IActorWrapper, type ICameraWrapper, isNotDefined, type IVector3, unWrapEntities } from '@/Engine';

import type { IIntersectionsWatcher } from './Models';

export function IntersectionsWatcher(
  actors: ReadonlyArray<IActorWrapper>,
  camera: Readonly<ICameraWrapper>,
  positionWatcher: Readonly<IMousePositionWatcher>,
  tags: ReadonlyArray<string> = []
): IIntersectionsWatcher {
  const abstractWatcher: IAbstractWatcher<IMousePosition> = AbstractWatcher('intersection_watcher', tags);
  let raycaster: Readonly<Raycaster> | undefined = new Raycaster();

  function start(): IIntersectionsWatcher {
    positionWatcher.value$.subscribe((position: IMousePosition): void => {
      const obj: IVector3 | undefined = getIntersection(position, camera, actors);
      if (obj) abstractWatcher.value$.next(obj);
    });
    return result;
  }

  function stop(): IIntersectionsWatcher {
    positionWatcher.value$.unsubscribe();
    return result;
  }

  function getIntersection(position: IMousePosition, cameraWrapper: Readonly<ICameraWrapper>, actors: ReadonlyArray<IActorWrapper>): IVector3 | undefined | never {
    if (isNotDefined(raycaster)) throw new Error('Intersections service: cannot get intersection: a raycaster is not defined.');
    raycaster.setFromCamera(getNormalizedMousePosition(position), cameraWrapper.entity);
    const entitiesList: ReadonlyArray<ISceneObject> = unWrapEntities(actors);
    const intersectObj = raycaster.intersectObjects([...entitiesList])[0];
    return intersectObj ? intersectObj.point : undefined;
  }

  abstractWatcher.destroy$.subscribe(() => {
    raycaster = undefined;
    positionWatcher.value$.unsubscribe();
    abstractWatcher.destroy$.unsubscribe();
  });

  const result: IIntersectionsWatcher = {
    ...abstractWatcher,
    start,
    stop
  };

  return result;
}
