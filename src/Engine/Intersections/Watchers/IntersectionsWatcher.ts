import type { Subscription } from 'rxjs';
import { Raycaster } from 'three';

import type { IAbstractWatcher } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import type { IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IIntersectionEvent, IIntersectionsWatcher, IIntersectionsWatcherParams } from '@/Engine/Intersections/Models';
import type { IMousePosition } from '@/Engine/Mouse';
import type { ISceneObject } from '@/Engine/Scene';
import { getNormalizedMousePosition, isDefined, isNotDefined, unWrapEntities } from '@/Engine/Utils';

export function IntersectionsWatcher({ mousePosWatcher, tags = [] }: IIntersectionsWatcherParams): IIntersectionsWatcher {
  const abstractWatcher: IAbstractWatcher<IIntersectionEvent> = AbstractWatcher(WatcherType.IntersectionWatcher, tags);
  let raycaster: Readonly<Raycaster> | undefined = new Raycaster();
  let actors: ReadonlyArray<ISceneObject> = [];

  function addActors(actorsWrappers: ReadonlyArray<IActorWrapperAsync>): void {
    actors = unWrapEntities(actorsWrappers);
  }

  function start(actorsWrappers: ReadonlyArray<IActorWrapperAsync>, camera: Readonly<ICameraWrapper>): IIntersectionsWatcher {
    actors = unWrapEntities(actorsWrappers);
    console.log('actors', actors);
    mousePosWatcher.value$.subscribe((position: IMousePosition): void => {
      const intersection: IIntersectionEvent | undefined = getIntersection(position, camera, [...actors]);
      if (isDefined(intersection)) abstractWatcher.value$.next(intersection);
    });
    return result;
  }

  function stop(): IIntersectionsWatcher {
    mousePosWatcher.value$.unsubscribe();
    return result;
  }

  function getIntersection(position: IMousePosition, cameraWrapper: Readonly<ICameraWrapper>, list: Array<ISceneObject>): IIntersectionEvent | undefined | never {
    if (isNotDefined(raycaster)) throw new Error('Intersections service: cannot get intersection: a raycaster is not defined.');
    raycaster.setFromCamera(getNormalizedMousePosition(position), cameraWrapper.entity);
    return raycaster.intersectObjects(list)[0];
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
