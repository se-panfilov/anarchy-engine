import type { Subscription } from 'rxjs';
import { Raycaster } from 'three';

import type { IAbstractWatcher, IWithWrapperIdEntity } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import type { IActorWrapperAsync, IMesh } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IIntersectionEvent, IIntersectionsWatcher, IIntersectionsWatcherParams } from '@/Engine/Intersections/Models';
import type { IMousePosition } from '@/Engine/Mouse';
import { getNormalizedMousePosition } from '@/Engine/Mouse';
import type { ISceneObject } from '@/Engine/Scene';
import { isDefined, isNotDefined, unWrapEntities } from '@/Engine/Utils';

export function IntersectionsWatcher({ position$, tags = [] }: IIntersectionsWatcherParams): IIntersectionsWatcher {
  const abstractWatcher: IAbstractWatcher<IIntersectionEvent> = AbstractWatcher(WatcherType.IntersectionWatcher, tags);
  let raycaster: Readonly<Raycaster> | undefined = new Raycaster();
  let actors: ReadonlyArray<IWithWrapperIdEntity<IMesh>> = [];
  let camera: Readonly<ICameraWrapper> | undefined;

  const addActors = (actorWrappers: ReadonlyArray<IActorWrapperAsync>): void => void (actors = [...actors, ...unWrapEntities(actorWrappers)] as ReadonlyArray<IWithWrapperIdEntity<IMesh>>);
  const addActor = (actorWrapper: IActorWrapperAsync): void => void (actors = [...actors, actorWrapper.entity as IWithWrapperIdEntity<IMesh>]);
  const getActors = (): ReadonlyArray<IWithWrapperIdEntity<IMesh>> => actors;
  const removeActors = (actorWrapperIds: ReadonlyArray<string>): void =>
    void (actors = actors.filter((actor: IWithWrapperIdEntity<IMesh>): boolean => !actorWrapperIds.includes(actor.userData.wrapperId)));
  const removeActor = (actorWrapperId: string): void => void (actors = actors.filter((actor: IWithWrapperIdEntity<IMesh>): boolean => actorWrapperId !== actor.userData.wrapperId));

  const setCamera = (cam: ICameraWrapper): void => void (camera = cam);
  const getCamera = (): ICameraWrapper | undefined => camera;

  let mousePos$: Subscription | undefined;

  function start(): IIntersectionsWatcher {
    mousePos$ = position$.subscribe((position: IMousePosition): void => {
      if (isNotDefined(camera)) throw new Error('Intersections service: cannot start: a camera is not defined');
      const intersection: IIntersectionEvent | undefined = getIntersection(position, camera, [...actors]);
      if (isDefined(intersection)) abstractWatcher.value$.next(intersection);
    });
    return result;
  }

  function stop(): IIntersectionsWatcher {
    mousePos$?.unsubscribe();
    return result;
  }

  function getIntersection(position: IMousePosition, cameraWrapper: Readonly<ICameraWrapper>, list: Array<ISceneObject>): IIntersectionEvent | undefined | never {
    if (isNotDefined(raycaster)) throw new Error('Intersections service: cannot get intersection: a raycaster is not defined');
    raycaster.setFromCamera(getNormalizedMousePosition(position), cameraWrapper.entity);
    return raycaster.intersectObjects(list)[0];
  }

  const abstractWatcherSubscription: Subscription = abstractWatcher.destroyed$.subscribe(() => {
    raycaster = undefined;
    mousePos$?.unsubscribe();
    abstractWatcherSubscription.unsubscribe();
  });

  const result: IIntersectionsWatcher = {
    ...abstractWatcher,
    value$: abstractWatcher.value$.asObservable(),
    addActors,
    addActor,
    getActors,
    setCamera,
    getCamera,
    removeActors,
    removeActor,
    start,
    stop
  };

  return result;
}
