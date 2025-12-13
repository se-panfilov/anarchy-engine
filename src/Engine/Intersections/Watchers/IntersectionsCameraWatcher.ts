import type { Subscription } from 'rxjs';
import { distinctUntilChanged, identity, sample, tap } from 'rxjs';
import type { Vector2Like } from 'three';
import { Vector2 } from 'three';

import type { TActor } from '@/Engine/Actor';
import type { TAnyCameraWrapper } from '@/Engine/Camera';
import type { TAbstractIntersectionsWatcher, TIntersectionEvent, TIntersectionsCameraWatcher, TIntersectionsCameraWatcherParams } from '@/Engine/Intersections/Models';
import { AbstractIntersectionsWatcher } from '@/Engine/Intersections/Watchers/AbstractIntersectionsWatcher';
import type { TRawModel3d } from '@/Engine/Models3d';
import type { TSceneObject } from '@/Engine/Scene';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isEqualOrSimilarByXyCoords, isNotDefined } from '@/Engine/Utils';

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

  let positionSub$: Subscription | undefined;

  const threshold: number = performance?.noiseThreshold ?? 0.001;
  // shouldUseDistinct might improve performance, however, won't fire an event if the mouse (position$) is not moving (and actor or scene is moving)
  const shouldUseDistinct: boolean = performance?.shouldUseDistinct ?? false;

  // abstractIntersectionsWatcher.enabled$.subscribe((): void => {
  //   const prevValue: Float32Array = new Float32Array([0, 0]);
  //   positionSub$ = position$
  //     .pipe(
  //       shouldUseDistinct ? distinctUntilChanged((_prev: Vector2Like, curr: Vector2Like): boolean => isEqualOrSimilarByXyCoords(prevValue[0], prevValue[1], curr.x, curr.y, threshold)) : identity,
  //       tap((value: Vector2Like): void => {
  //         // eslint-disable-next-line functional/immutable-data
  //         prevValue[0] = value.x;
  //         // eslint-disable-next-line functional/immutable-data
  //         prevValue[1] = value.y;
  //       }),
  //       sample(intersectionsLoop.tick$)
  //     )
  //     .subscribe((position: Vector2Like): void => {
  //       if (isNotDefined(camera)) throw new Error('[IntersectionsWatcher]: Cannot start: camera is not defined');
  //       const intersection: TIntersectionEvent | undefined = getIntersection(
  //         position,
  //         camera,
  //         abstractIntersectionsWatcher.getActors().map((a: TActor): TRawModel3d => a.model3d.getRawModel3d())
  //       );
  //
  //       if (isDefined(intersection)) abstractIntersectionsWatcher.value$.next(intersection);
  //     });
  // });

  function getIntersection(coords: Vector2Like, cameraWrapper: Readonly<TAnyCameraWrapper>, list: Array<TSceneObject>): TIntersectionEvent | undefined | never {
    if (isNotDefined(abstractIntersectionsWatcher.raycaster)) throw new Error('[IntersectionsWatcher]: Cannot get intersection: raycaster is not defined');
    abstractIntersectionsWatcher.raycaster.setFromCamera(new Vector2(coords.x, coords.y), cameraWrapper.entity);
    return abstractIntersectionsWatcher.raycaster.intersectObjects(list)[0];
  }

  const destroySub$: Subscription = abstractIntersectionsWatcher.destroy$.subscribe((): void => {
    positionSub$?.unsubscribe();
    destroySub$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  const result: TWriteable<TIntersectionsCameraWatcher> = Object.assign(abstractIntersectionsWatcher, {
    findCamera,
    getCamera,
    setCamera
  });

  setCamera(getCamera());

  return result;
}
