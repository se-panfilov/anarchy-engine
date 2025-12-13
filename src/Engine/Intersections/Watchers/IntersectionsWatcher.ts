import type { Subscription } from 'rxjs';
import { Raycaster } from 'three';

import type { TAbstractWatcher } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IIntersectionEvent, TIntersectionsWatcher, IIntersectionsWatcherParams } from '@/Engine/Intersections/Models';
import type { IMousePosition } from '@/Engine/Mouse';
import { getNormalizedMousePosition } from '@/Engine/Mouse';
import type { ISceneObject } from '@/Engine/Scene';
import type { IMesh } from '@/Engine/ThreeLib';
import type { IWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined, unWrapEntities } from '@/Engine/Utils';

export function IntersectionsWatcher({ position$, isAutoStart, tags, name, ...rest }: IIntersectionsWatcherParams): TIntersectionsWatcher {
  const abstractWatcher: TAbstractWatcher<IIntersectionEvent> = AbstractWatcher(WatcherType.IntersectionWatcher, name, tags);
  let raycaster: Readonly<Raycaster> | undefined = new Raycaster();
  let actors: ReadonlyArray<TActorWrapperAsync> = [];
  let camera: Readonly<ICameraWrapper> | undefined;

  const addActors = (actorWrappers: ReadonlyArray<TActorWrapperAsync>): void => void (actors = [...actors, ...actorWrappers]);
  const addActor = (actorWrapper: TActorWrapperAsync): void => void (actors = [...actors, actorWrapper]);
  const getActors = (): ReadonlyArray<TActorWrapperAsync> => actors;
  const removeActors = (actorWrapperIds: ReadonlyArray<string>): void => void (actors = actors.filter((actor: TActorWrapperAsync): boolean => !actorWrapperIds.includes(actor.id)));
  const removeActor = (actorWrapperId: string): void => void (actors = actors.filter((actor: TActorWrapperAsync): boolean => actorWrapperId !== actor.id));

  const setCamera = (cam: ICameraWrapper): void => void (camera = cam);
  const getCamera = (): ICameraWrapper | undefined => camera;

  let mousePos$: Subscription | undefined;

  function start(): TIntersectionsWatcher {
    mousePos$ = position$.subscribe((position: IMousePosition): void => {
      if (isNotDefined(camera)) throw new Error('Intersections service: cannot start: a camera is not defined');
      const intersection: IIntersectionEvent | undefined = getIntersection(position, camera, unWrapEntities(actors) as Array<IMesh>);
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

  const result: IWriteable<TIntersectionsWatcher> = {
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
