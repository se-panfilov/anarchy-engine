import type { Subscription } from 'rxjs';
import { Raycaster } from 'three';

import type { TAbstractWatcher } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TIntersectionEvent, TIntersectionsWatcher, TIntersectionsWatcherParams } from '@/Engine/Intersections/Models';
import type { TMousePosition } from '@/Engine/Mouse';
import { getNormalizedMousePosition } from '@/Engine/Mouse';
import type { TSceneObject } from '@/Engine/Scene';
import type { TMesh } from '@/Engine/ThreeLib';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined, unWrapEntities } from '@/Engine/Utils';

export function IntersectionsWatcher({ position$, isAutoStart, tags, name, ...rest }: TIntersectionsWatcherParams): TIntersectionsWatcher {
  const abstractWatcher: TAbstractWatcher<TIntersectionEvent> = AbstractWatcher(WatcherType.IntersectionWatcher, name, tags);
  let raycaster: Readonly<Raycaster> | undefined = new Raycaster();
  let actors: ReadonlyArray<TActorWrapperAsync> = [];
  let camera: Readonly<TCameraWrapper> | undefined;

  const addActors = (actorWrappers: ReadonlyArray<TActorWrapperAsync>): void => void (actors = [...actors, ...actorWrappers]);
  const addActor = (actorWrapper: TActorWrapperAsync): void => void (actors = [...actors, actorWrapper]);
  const getActors = (): ReadonlyArray<TActorWrapperAsync> => actors;
  const removeActors = (actorWrapperIds: ReadonlyArray<string>): void => void (actors = actors.filter((actor: TActorWrapperAsync): boolean => !actorWrapperIds.includes(actor.id)));
  const removeActor = (actorWrapperId: string): void => void (actors = actors.filter((actor: TActorWrapperAsync): boolean => actorWrapperId !== actor.id));

  const setCamera = (cam: TCameraWrapper): void => void (camera = cam);
  const getCamera = (): TCameraWrapper | undefined => camera;

  let mousePos$: Subscription | undefined;

  function start(): TIntersectionsWatcher {
    mousePos$ = position$.subscribe((position: TMousePosition): void => {
      if (isNotDefined(camera)) throw new Error('Intersections service: cannot start: a camera is not defined');
      const intersection: TIntersectionEvent | undefined = getIntersection(position, camera, unWrapEntities(actors) as Array<TMesh>);
      if (isDefined(intersection)) abstractWatcher.value$.next(intersection);
    });
    // eslint-disable-next-line functional/immutable-data
    result.isStarted = true;
    return result;
  }

  function stop(): TIntersectionsWatcher {
    mousePos$?.unsubscribe();
    // eslint-disable-next-line functional/immutable-data
    result.isStarted = false;
    return result;
  }

  function getIntersection(position: TMousePosition, cameraWrapper: Readonly<TCameraWrapper>, list: Array<TSceneObject>): TIntersectionEvent | undefined | never {
    if (isNotDefined(raycaster)) throw new Error('Intersections service: cannot get intersection: a raycaster is not defined');
    raycaster.setFromCamera(getNormalizedMousePosition(position), cameraWrapper.entity);
    return raycaster.intersectObjects(list)[0];
  }

  const abstractWatcherSubscription: Subscription = abstractWatcher.destroyed$.subscribe(() => {
    raycaster = undefined;
    mousePos$?.unsubscribe();
    abstractWatcherSubscription.unsubscribe();
  });

  const result: TWriteable<TIntersectionsWatcher> = {
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
    stop,
    isStarted: false,
    isAutoStart
  };

  setCamera(rest.camera);
  if (rest.actors.length > 0) addActors(rest.actors);
  if (isAutoStart) start();

  return result;
}
