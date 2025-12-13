import type { Subscription } from 'rxjs';
import { distinctUntilChanged, identity, sample, tap } from 'rxjs';
import type { Vector2Like } from 'three';
import { Vector2 } from 'three';

import type { TActor } from '@/Engine/Actor';
import type { TAnyCameraWrapper } from '@/Engine/Camera';
import type { TAbstractIntersectionsWatcher, TIntersectionEvent, TIntersectionsDirectionWatcher, TIntersectionsDirectionWatcherParams } from '@/Engine/Intersections/Models';
import { AbstractIntersectionsWatcher } from '@/Engine/Intersections/Watchers/AbstractIntersectionsWatcher';
import type { TRawModel3d } from '@/Engine/Models3d';
import type { TSceneObject } from '@/Engine/Scene';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isEqualOrSimilarByXyCoords, isNotDefined } from '@/Engine/Utils';

export function IntersectionsDirectionWatcher(params: TIntersectionsDirectionWatcherParams): TIntersectionsDirectionWatcher {
  const { position$, isAutoStart, tags, name, performance, intersectionsLoop, ...rest } = params;
  const abstractIntersectionsWatcher: TAbstractIntersectionsWatcher = AbstractIntersectionsWatcher(params);

  const startSub$: Subscription = abstractIntersectionsWatcher.start$.subscribe((): void => {
    const prevValue: Float32Array = new Float32Array([0, 0]);
    positionSub$ = position$
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

  function getIntersection(coords: Vector2Like, cameraWrapper: Readonly<TAnyCameraWrapper>, list: Array<TSceneObject>): TIntersectionEvent | undefined | never {
    if (isNotDefined(raycaster)) throw new Error('[IntersectionsWatcher]: Cannot get intersection: raycaster is not defined');
    raycaster.setFromCamera(new Vector2(coords.x, coords.y), cameraWrapper.entity);
    return raycaster.intersectObjects(list)[0];
  }

  const destroySub$: Subscription = abstractIntersectionsWatcher.destroy$.subscribe((): void => {
    abstractIntersectionsWatcher.destroy$.next();
    destroySub$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  const result: TWriteable<TIntersectionsDirectionWatcher> = Object.assign(abstractIntersectionsWatcher, {});

  return result;
}
