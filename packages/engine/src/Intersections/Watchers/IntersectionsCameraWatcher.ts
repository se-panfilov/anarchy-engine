import type { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, EMPTY, filter, map, switchMap } from 'rxjs';
import type { Vector2Like } from 'three';
import { Vector2 } from 'three';

import type { TAnyCameraWrapper } from '@/Camera';
import type {
  TAbstractIntersectionsWatcher,
  TIntersectionEvent,
  TIntersectionsCameraWatcher,
  TIntersectionsCameraWatcherParams,
  TIntersectionsWatcherPerformanceOptions
} from '@/Intersections/Models';
import { getChangedPosition } from '@/Intersections/Utils';
import { AbstractIntersectionsWatcher } from '@/Intersections/Watchers/AbstractIntersectionsWatcher';
import type { TMilliseconds } from '@/Math';
import type { TSceneObject } from '@/Scene';
import type { TReadonlyVector2 } from '@/ThreeLib';
import type { TWriteable } from '@/Utils';
import { isDefined, isNotDefined } from '@/Utils';

export function IntersectionsCameraWatcher(params: TIntersectionsCameraWatcherParams): TIntersectionsCameraWatcher {
  const { position$, performance, intersectionsLoop } = params;
  const abstractIntersectionsWatcher: TAbstractIntersectionsWatcher = AbstractIntersectionsWatcher(params);
  let camera: Readonly<TAnyCameraWrapper> | undefined;

  const setCamera = (c: TAnyCameraWrapper): void => void (camera = c);
  const findCamera = (): TAnyCameraWrapper | undefined => camera;
  const getCamera = (): TAnyCameraWrapper | never => {
    if (isNotDefined(camera)) throw new Error('[IntersectionsWatcher]: Cannot get camera: not defined');
    return camera;
  };

  let position: TReadonlyVector2 = new Vector2();
  const positionSub$: Subscription = position$.subscribe((value: Vector2Like): Vector2 => (position = new Vector2().copy(value)));

  const threshold: number = performance?.noiseThreshold ?? 0.001;
  // shouldReactOnlyOnChange might improve performance, however, won't fire an event if the mouse (position$) is not moving (and actor or scene is moving)
  const shouldReactOnlyOnChange: boolean = performance?.shouldReactOnlyOnChange ?? false;

  const tmpPosition = new Float32Array(2);
  const prevPosition = new Float32Array(2);

  const enabledSub$: Subscription = abstractIntersectionsWatcher.enabled$
    .pipe(
      distinctUntilChanged(),
      switchMap((isEnabled: boolean): Observable<TMilliseconds | never> => (isEnabled ? intersectionsLoop.tick$ : EMPTY)),
      map(
        ():
          | Readonly<{
              position: TReadonlyVector2;
            }>
          | undefined => (shouldReactOnlyOnChange ? getChangedPosition(tmpPosition, prevPosition, position, threshold) : { position })
      ),
      filter(isDefined)
    )
    .subscribe(({ position }: Readonly<{ position: TReadonlyVector2 }>): void => {
      if (isNotDefined(camera)) {
        enabledSub$.unsubscribe();
        throw new Error('[IntersectionsWatcher]: Cannot start: camera is not defined');
      }

      const intersection: TIntersectionEvent | undefined = getIntersection(position as Vector2, camera, abstractIntersectionsWatcher.getModelsFromActors());
      if (isDefined(intersection)) abstractIntersectionsWatcher.value$.next(intersection);
    });

  function getIntersection(coords: Vector2, cameraWrapper: Readonly<TAnyCameraWrapper>, list: Array<TSceneObject>): TIntersectionEvent | undefined | never {
    if (isNotDefined(abstractIntersectionsWatcher.raycaster)) throw new Error('[IntersectionsWatcher]: Cannot get intersection: raycaster is not defined');
    abstractIntersectionsWatcher.raycaster.setFromCamera(coords, cameraWrapper.entity);
    return abstractIntersectionsWatcher.raycaster.intersectObjects(list)[0];
  }

  const destroySub$: Subscription = abstractIntersectionsWatcher.destroy$.subscribe((): void => {
    positionSub$?.unsubscribe();
    enabledSub$.unsubscribe();
    destroySub$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  const result: TWriteable<TIntersectionsCameraWatcher> = Object.assign(abstractIntersectionsWatcher, {
    findCamera,
    getCamera,
    setCamera,
    getPerformanceSettings: (): TIntersectionsWatcherPerformanceOptions => ({
      noiseThreshold: threshold,
      shouldReactOnlyOnChange
    })
  });

  setCamera(params.camera);

  return result;
}
