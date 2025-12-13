import type { Subscription } from 'rxjs';
import { Raycaster } from 'three';

import type { IAbstractWatcher } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import type { IActorWrapper } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IIntersectionsWatcher, IIntersectionsWatcherParams } from '@/Engine/Intersections/Models';
import type { IMousePosition } from '@/Engine/Mouse';
import type { ISceneObject } from '@/Engine/Scene';
import { getNormalizedMousePosition, isNotDefined, unWrapEntities } from '@/Engine/Utils';
import type { IVector3 } from '@/Engine/Vector';

export function IntersectionsWatcher({ mousePosWatcher, tags = [] }: IIntersectionsWatcherParams): IIntersectionsWatcher {
  const abstractWatcher: IAbstractWatcher<IVector3> = AbstractWatcher(WatcherType.IntersectionWatcher, tags);
  let raycaster: Readonly<Raycaster> | undefined = new Raycaster();

  function start(actors: ReadonlyArray<IActorWrapper>, camera: Readonly<ICameraWrapper>): IIntersectionsWatcher {
    mousePosWatcher.value$.subscribe((position: IMousePosition): void => {
      const obj: IVector3 | undefined = getIntersection(position, camera, actors);
      if (obj) abstractWatcher.value$.next(obj);
    });
    return result;
  }

  function stop(): IIntersectionsWatcher {
    mousePosWatcher.value$.unsubscribe();
    return result;
  }

  function getIntersection(position: IMousePosition, cameraWrapper: Readonly<ICameraWrapper>, actors: ReadonlyArray<IActorWrapper>): IVector3 | undefined | never {
    if (isNotDefined(raycaster)) throw new Error('Intersections service: cannot get intersection: a raycaster is not defined.');
    raycaster.setFromCamera(getNormalizedMousePosition(position), cameraWrapper.entity);
    const entitiesList: ReadonlyArray<ISceneObject> = unWrapEntities(actors);
    const intersectObj = raycaster.intersectObjects([...entitiesList])[0];
    return intersectObj ? intersectObj.point : undefined;
  }

  const abstractWatcherSubscription: Subscription = abstractWatcher.destroyed$.subscribe(() => {
    raycaster = undefined;
    mousePosWatcher.value$.unsubscribe();
    abstractWatcherSubscription.unsubscribe();
  });

  const result: IIntersectionsWatcher = {
    ...abstractWatcher,
    start,
    stop
  };

  return result;
}
