import type { Subscription } from 'rxjs';
import { Raycaster } from 'three';

import type { IAbstractWatcher, IWithWrapperIdEntity } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import type { IActorWrapperAsync, IMesh } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IIntersectionEvent, IIntersectionsWatcher, IIntersectionsWatcherParams } from '@/Engine/Intersections/Models';
import type { IMousePosition } from '@/Engine/Mouse';
import type { ISceneObject } from '@/Engine/Scene';
import { getNormalizedMousePosition, isDefined, isNotDefined, unWrapEntities } from '@/Engine/Utils';

export function IntersectionsWatcher({ mousePosWatcher, tags = [] }: IIntersectionsWatcherParams): IIntersectionsWatcher {
  const abstractWatcher: IAbstractWatcher<IIntersectionEvent> = AbstractWatcher(WatcherType.IntersectionWatcher, tags);
  let raycaster: Readonly<Raycaster> | undefined = new Raycaster();
  let actors: ReadonlyArray<IWithWrapperIdEntity<IMesh>> = [];
  let camera: Readonly<ICameraWrapper> | undefined;

  const addActors = (actorsWrappers: ReadonlyArray<IActorWrapperAsync>): void => void (actors = unWrapEntities(actorsWrappers) as ReadonlyArray<IWithWrapperIdEntity<IMesh>>);
  const getActors = (): ReadonlyArray<IWithWrapperIdEntity<IMesh>> => actors;
  const removeActors = (actorsWrapperIds: ReadonlyArray<string>): void =>
    void (actors = actors.filter((actor: IWithWrapperIdEntity<IMesh>): boolean => !actorsWrapperIds.includes(actor.userData.wrapperId)));

  const setCamera = (cam: Readonly<ICameraWrapper>): void => void (camera = cam);
  const getCamera = (): Readonly<ICameraWrapper> | undefined => camera;

  function start(): IIntersectionsWatcher {
    mousePosWatcher.value$.subscribe((position: IMousePosition): void => {
      if (isNotDefined(camera)) throw new Error('Intersections service: cannot start: a camera is not defined');
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
    if (isNotDefined(raycaster)) throw new Error('Intersections service: cannot get intersection: a raycaster is not defined');
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
    addActors,
    getActors,
    setCamera,
    getCamera,
    removeActors,
    start,
    stop
  };

  return result;
}
