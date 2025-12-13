import type { IAbstractWatcher } from '@Engine/Domains/Abstract';
import { AbstractWatcher } from '@Engine/Domains/Abstract';
import type { IActorWrapper } from '@Engine/Domains/Actor';
import type { ICameraWrapper } from '@Engine/Domains/Camera';
import type { IMousePosition } from '@Engine/Domains/Mouse';
import type { ISceneObject } from '@Engine/Domains/Scene';
import { getNormalizedMousePosition, isNotDefined, unWrapEntities } from '@Engine/Utils';
import type { IVector3 } from '@Engine/Wrappers';
import { Raycaster } from 'three';

import type { IIntersectionsWatcher, IIntersectionsWatcherParams } from '@/Engine/Domains/Intersections/Models';

export function IntersectionsWatcher({ actors, camera, positionWatcher, tags = [] }: IIntersectionsWatcherParams): IIntersectionsWatcher {
  const abstractWatcher: IAbstractWatcher<IVector3> = AbstractWatcher('intersection_watcher', tags);
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
