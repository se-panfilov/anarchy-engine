import type { Subscription } from 'rxjs';
import { distinctUntilChanged, sampleTime, tap } from 'rxjs';
import type { Vector2Like } from 'three';
import { Raycaster, Vector2 } from 'three';

import type { TAbstractWatcher } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import type { TActor } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TIntersectionEvent, TIntersectionsWatcher, TIntersectionsWatcherParams } from '@/Engine/Intersections/Models';
import type { TRawModel3d } from '@/Engine/Models3d';
import { getNormalizedMousePosition } from '@/Engine/Mouse';
import type { TSceneObject } from '@/Engine/Scene';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isEqualOrSimilarByXyCoords, isNotDefined } from '@/Engine/Utils';

export function IntersectionsWatcher({ position$, isAutoStart, tags, name, performance, ...rest }: TIntersectionsWatcherParams): TIntersectionsWatcher {
  const abstractWatcher: TAbstractWatcher<TIntersectionEvent> = AbstractWatcher(WatcherType.IntersectionWatcher, name, tags);
  let raycaster: Readonly<Raycaster> | undefined = new Raycaster();
  let actors: ReadonlyArray<TActor> = [];
  let camera: Readonly<TCameraWrapper> | undefined;

  const addActors = (actorsList: ReadonlyArray<TActor>): void => void (actors = [...actors, ...actorsList]);
  const addActor = (actor: TActor): void => void (actors = [...actors, actor]);
  const getActors = (): ReadonlyArray<TActor> => actors;
  const removeActors = (actorIds: ReadonlyArray<string>): void => void (actors = actors.filter((actor: TActor): boolean => !actorIds.includes(actor.id)));
  const removeActor = (actorId: string): void => void (actors = actors.filter((actor: TActor): boolean => actorId !== actor.id));

  const setCamera = (cam: TCameraWrapper): void => void (camera = cam);
  const getCamera = (): TCameraWrapper | undefined => camera;

  let mousePos$: Subscription | undefined;
  // TODO ENV: limited fps, perhaps should be configurable
  const delay: number = performance?.updateDelay ?? 2; // 480 FPS (when 16 is 60 FPS)
  const threshold: number = performance?.noiseThreshold ?? 0.001;

  function start(): TIntersectionsWatcher {
    const prevValue: Float32Array = new Float32Array([0, 0]);
    mousePos$ = position$
      .pipe(
        distinctUntilChanged((_prev: Vector2Like, curr: Vector2Like): boolean => isEqualOrSimilarByXyCoords(prevValue[0], prevValue[1], curr.x, curr.y, threshold)),
        sampleTime(delay),
        tap((value: Vector2Like): void => {
          // eslint-disable-next-line functional/immutable-data
          prevValue[0] = value.x;
          // eslint-disable-next-line functional/immutable-data
          prevValue[1] = value.y;
        })
      )
      .subscribe((position: Vector2Like): void => {
        if (isNotDefined(camera)) throw new Error('Intersections service: cannot start: a camera is not defined');
        const intersection: TIntersectionEvent | undefined = getIntersection(
          position,
          camera,
          actors.map((a: TActor): TRawModel3d => a.model3d.getRawModel3d())
        );
        // TODO 8.0.0. MODELS: check if this works while mouse not moving, but the scene is moving
        // console.log('XXX 111', position);
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

  function getIntersection(coords: Vector2Like, cameraWrapper: Readonly<TCameraWrapper>, list: Array<TSceneObject>): TIntersectionEvent | undefined | never {
    if (isNotDefined(raycaster)) throw new Error('Intersections service: cannot get intersection: a raycaster is not defined');
    const normalizedPosition: Vector2Like = getNormalizedMousePosition(coords);
    raycaster.setFromCamera(new Vector2(normalizedPosition.x, normalizedPosition.y), cameraWrapper.entity);
    return raycaster.intersectObjects(list)[0];
  }

  const abstractWatcherSubscription: Subscription = abstractWatcher.destroy$.subscribe((): void => {
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
