import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, combineLatest, distinctUntilChanged, EMPTY, identity, map, sample, switchMap, tap, withLatestFrom } from 'rxjs';
import type { Vector2Like } from 'three';
import { Vector2 } from 'three';
import { Vector3 } from 'three/src/math/Vector3';

import type { TActor } from '@/Engine/Actor';
import type { TAnyCameraWrapper } from '@/Engine/Camera';
import type { TAbstractIntersectionsWatcher, TIntersectionEvent, TIntersectionsDirectionWatcher, TIntersectionsDirectionWatcherParams } from '@/Engine/Intersections/Models';
import { AbstractIntersectionsWatcher } from '@/Engine/Intersections/Watchers/AbstractIntersectionsWatcher';
import type { TRawModel3d } from '@/Engine/Models3d';
import type { TSceneObject } from '@/Engine/Scene';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isEqualOrSimilarByXyCoords, isEqualOrSimilarByXyzCoords, isNotDefined } from '@/Engine/Utils';

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
  intersectionsLoop: { tick$: BehaviorSubject<void> },
  threshold: number
): Subscription {
  const filteredOrigin$: Observable<TReadonlyVector3> = origin$.pipe(
    distinctUntilChanged((a: TReadonlyVector3, b: TReadonlyVector3): boolean => isEqualOrSimilarByXyzCoords(a.x, a.y, a.z, b.x, b.y, b.z, threshold))
  );
  const filteredDirection$: Observable<TReadonlyVector3> = direction$.pipe(
    distinctUntilChanged((a: TReadonlyVector3, b: TReadonlyVector3): boolean => isEqualOrSimilarByXyzCoords(a.x, a.y, a.z, b.x, b.y, b.z, threshold))
  );

  const combined$: Observable<[TReadonlyVector3, TReadonlyVector3]> = combineLatest([filteredOrigin$, filteredDirection$]);

  return start$
    .pipe(
      distinctUntilChanged(),
      switchMap((enabled: boolean): Observable<[TReadonlyVector3, TReadonlyVector3]> => (enabled ? combined$.pipe(sample(intersectionsLoop.tick$)) : EMPTY))
    )
    .subscribe(([origin, direction]): void => {
      const intersection: TIntersectionEvent | undefined = getIntersection(origin, direction);
      console.log('XXX Intersection:', intersection);
    });
}
