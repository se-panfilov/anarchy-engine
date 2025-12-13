import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, EMPTY, filter, map, switchMap } from 'rxjs';
import { Vector3 } from 'three/src/math/Vector3';

import type { TActor } from '@/Engine/Actor';
import type { TAbstractIntersectionsWatcher, TIntersectionEvent, TIntersectionsDirectionWatcher, TIntersectionsDirectionWatcherParams } from '@/Engine/Intersections/Models';
import { getOriginAndDirection } from '@/Engine/Intersections/Utils';
import { AbstractIntersectionsWatcher } from '@/Engine/Intersections/Watchers/AbstractIntersectionsWatcher';
import type { TMilliseconds } from '@/Engine/Math';
import type { TRawModel3d } from '@/Engine/Models3d';
import type { TSceneObject } from '@/Engine/Scene';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function IntersectionsDirectionWatcher(params: TIntersectionsDirectionWatcherParams): TIntersectionsDirectionWatcher {
  const { performance, intersectionsLoop } = params;
  const abstractIntersectionsWatcher: TAbstractIntersectionsWatcher = AbstractIntersectionsWatcher(params);

  const origin$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(new Vector3().copy(params.origin));
  const direction$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(new Vector3().copy(params.direction));

  const threshold: number = performance?.noiseThreshold ?? 0.001;
  // shouldUseDistinct might improve performance, however, won't fire an event if the mouse (position$) is not moving (and actor or scene is moving)
  const shouldUseDistinct: boolean = performance?.shouldUseDistinct ?? false;

  const tmpOrigin = new Float32Array(3);
  const prevOrigin = new Float32Array(3);
  const tmpDirection = new Float32Array(3);
  const prevDirection = new Float32Array(3);

  const enabledSub$: Subscription = abstractIntersectionsWatcher.enabled$
    .pipe(
      distinctUntilChanged(),
      switchMap((isEnabled: boolean): Observable<TMilliseconds | never> => (isEnabled ? intersectionsLoop.tick$ : EMPTY)),
      map((): Readonly<{ origin: TReadonlyVector3; direction: TReadonlyVector3 }> | undefined =>
        // TODO 15-0-0: implement a support of shouldUseDistinct and test it
        // getOriginAndDirection(tmpOrigin, tmpDirection, prevOrigin, prevDirection, origin$.value, direction$.value, threshold)
        shouldUseDistinct
          ? getOriginAndDirection(tmpOrigin, tmpDirection, prevOrigin, prevDirection, origin$.value, direction$.value, threshold)
          : { origin: origin$.value, direction: direction$.value }
      ),
      filter(isDefined)
    )
    .subscribe(({ origin, direction }: Readonly<{ origin: TReadonlyVector3; direction: TReadonlyVector3 }>): void => {
      const intersection: TIntersectionEvent | undefined = getIntersection(
        origin as Vector3,
        direction as Vector3,
        abstractIntersectionsWatcher.getActors().map((a: TActor): TRawModel3d => a.model3d.getRawModel3d())
      );
      if (isDefined(intersection)) abstractIntersectionsWatcher.value$.next(intersection);
    });

  function getIntersection(origin: Vector3, direction: Vector3, list: Array<TSceneObject>): TIntersectionEvent | undefined | never {
    if (isNotDefined(abstractIntersectionsWatcher.raycaster)) throw new Error('[IntersectionsDirectionWatcher]: Cannot get intersection: raycaster is not defined');
    abstractIntersectionsWatcher.raycaster.set(origin, direction);
    return abstractIntersectionsWatcher.raycaster.intersectObjects(list)[0];
  }

  const destroySub$: Subscription = abstractIntersectionsWatcher.destroy$.subscribe((): void => {
    enabledSub$.unsubscribe();
    destroySub$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  const result: TWriteable<TIntersectionsDirectionWatcher> = Object.assign(abstractIntersectionsWatcher, {
    origin$,
    direction$
  });

  return result;
}
