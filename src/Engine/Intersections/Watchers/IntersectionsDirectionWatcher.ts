import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, EMPTY, filter, identity, map, sample, switchMap, tap } from 'rxjs';
import type { Vector2Like } from 'three';
import { Vector2 } from 'three';
import { Vector3 } from 'three/src/math/Vector3';

import type { TActor } from '@/Engine/Actor';
import type { TAnyCameraWrapper } from '@/Engine/Camera';
import type { TAbstractIntersectionsWatcher, TIntersectionEvent, TIntersectionsDirectionWatcher, TIntersectionsDirectionWatcherParams, TIntersectionsLoop } from '@/Engine/Intersections/Models';
import { AbstractIntersectionsWatcher } from '@/Engine/Intersections/Watchers/AbstractIntersectionsWatcher';
import type { TMilliseconds } from '@/Engine/Math';
import type { TRawModel3d } from '@/Engine/Models3d';
import type { TSceneObject } from '@/Engine/Scene';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isEqualOrSimilarByXyCoords, isNotDefined } from '@/Engine/Utils';

export function IntersectionsDirectionWatcher(params: TIntersectionsDirectionWatcherParams): TIntersectionsDirectionWatcher {
  const { performance, intersectionsLoop } = params;
  const abstractIntersectionsWatcher: TAbstractIntersectionsWatcher = AbstractIntersectionsWatcher(params);

  const origin$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(new Vector3().copy(params.origin));
  const direction$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(new Vector3().copy(params.direction));

  let positionSub$: Subscription | undefined;

  const threshold: number = performance?.noiseThreshold ?? 0.001;
  // shouldUseDistinct might improve performance, however, won't fire an event if the mouse (position$) is not moving (and actor or scene is moving)
  const shouldUseDistinct: boolean = performance?.shouldUseDistinct ?? false;

  const startSub$: Subscription = abstractIntersectionsWatcher.start$.subscribe((): void => {
    const prevValue: Float32Array = new Float32Array([0, 0]);
    positionSub$ = origin$
      .pipe(
        shouldUseDistinct ? distinctUntilChanged((_prev: Vector2Like, curr: Vector2Like): boolean => isEqualOrSimilarByXyCoords(prevValue[0], prevValue[1], curr.x, curr.y, threshold)) : identity,
        tap((value: Vector2Like): void => {
          // eslint-disable-next-line functional/immutable-data
          prevValue[0] = value.x;
          // eslint-disable-next-line functional/immutable-data
          prevValue[1] = value.y;
        }),
        sample(intersectionsLoop.tick$)
      )
      .subscribe((position: Vector2Like): void => {
        if (isNotDefined(camera)) throw new Error('[IntersectionsWatcher]: Cannot start: camera is not defined');
        const intersection: TIntersectionEvent | undefined = getIntersection(
          position,
          camera,
          actors.map((a: TActor): TRawModel3d => a.model3d.getRawModel3d())
        );

        if (isDefined(intersection)) abstractIntersectionsWatcher.value$.next(intersection);
      });
    // eslint-disable-next-line functional/immutable-data
    result.isStarted = true;
  });

  const stopSub$: Subscription = abstractIntersectionsWatcher.stop$.subscribe((): void => {
    positionSub$?.unsubscribe();
  });

  function getIntersection(coords: Vector2Like, cameraWrapper: Readonly<TAnyCameraWrapper>, list: Array<TSceneObject>): TIntersectionEvent | undefined | never {
    if (isNotDefined(abstractIntersectionsWatcher.raycaster)) throw new Error('[IntersectionsWatcher]: Cannot get intersection: raycaster is not defined');
    abstractIntersectionsWatcher.raycaster.set(new Vector2(coords.x, coords.y), cameraWrapper.entity);
    return abstractIntersectionsWatcher.raycaster.intersectObjects(list)[0];
  }

  const destroySub$: Subscription = abstractIntersectionsWatcher.destroy$.subscribe((): void => {
    startSub$.unsubscribe();
    stopSub$.unsubscribe();
    destroySub$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  const result: TWriteable<TIntersectionsDirectionWatcher> = Object.assign(abstractIntersectionsWatcher, {
    origin$,
    direction$
  });

  return result;
}

export function initIntersectionsWatcher(
  origin$: BehaviorSubject<TReadonlyVector3>,
  direction$: BehaviorSubject<TReadonlyVector3>,
  start$: BehaviorSubject<boolean>,
  intersectionsLoop: TIntersectionsLoop,
  threshold: number
): Subscription {
  const tmpOrigin = new Float32Array(3);
  const prevOrigin = new Float32Array(3);
  const tmpDirection = new Float32Array(3);
  const prevDirection = new Float32Array(3);

  return start$
    .pipe(
      distinctUntilChanged(),
      switchMap((isEnabled: boolean): Observable<TMilliseconds | never> => (isEnabled ? intersectionsLoop.tick$ : EMPTY)),
      map((): Readonly<{ origin: TReadonlyVector3; direction: TReadonlyVector3 }> | undefined =>
        getOriginAndDirection(tmpOrigin, tmpDirection, prevOrigin, prevDirection, origin$.value, direction$.value, threshold)
      ),
      filter(isDefined)
    )
    .subscribe(({ origin, direction }: Readonly<{ origin: TReadonlyVector3; direction: TReadonlyVector3 }>): void => {
      const intersection: TIntersectionEvent | undefined = getIntersection(origin, direction);
      console.log('XXX Intersection:', intersection);
    });
}

function getOriginAndDirection(
  tmpOrigin: Float32Array,
  tmpDirection: Float32Array,
  prevOrigin: Float32Array,
  prevDirection: Float32Array,
  origin: TReadonlyVector3,
  direction: TReadonlyVector3,
  threshold: number
): Readonly<{ origin: TReadonlyVector3; direction: TReadonlyVector3 }> | undefined {
  // eslint-disable-next-line functional/immutable-data
  tmpOrigin[0] = origin.x;
  // eslint-disable-next-line functional/immutable-data
  tmpOrigin[1] = origin.y;
  // eslint-disable-next-line functional/immutable-data
  tmpOrigin[2] = origin.z;

  // eslint-disable-next-line functional/immutable-data
  tmpDirection[0] = direction.x;
  // eslint-disable-next-line functional/immutable-data
  tmpDirection[1] = direction.y;
  // eslint-disable-next-line functional/immutable-data
  tmpDirection[2] = direction.z;

  const originChanged: boolean = Math.abs(tmpOrigin[0] - prevOrigin[0]) > threshold || Math.abs(tmpOrigin[1] - prevOrigin[1]) > threshold || Math.abs(tmpOrigin[2] - prevOrigin[2]) > threshold;

  const directionChanged: boolean =
    Math.abs(tmpDirection[0] - prevDirection[0]) > threshold || Math.abs(tmpDirection[1] - prevDirection[1]) > threshold || Math.abs(tmpDirection[2] - prevDirection[2]) > threshold;

  if (!originChanged && !directionChanged) return undefined;

  prevOrigin.set(tmpOrigin);
  prevDirection.set(tmpDirection);

  // TODO 15-0-0: do we really need Vector3 here?
  return {
    origin: new Vector3(tmpOrigin[0], tmpOrigin[1], tmpOrigin[2]) as TReadonlyVector3,
    direction: new Vector3(tmpDirection[0], tmpDirection[1], tmpDirection[2]) as TReadonlyVector3
  };
}
