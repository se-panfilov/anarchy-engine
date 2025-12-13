import type { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, EMPTY, filter, map, switchMap } from 'rxjs';
import type { Vector2Like } from 'three';
import { Vector2 } from 'three';

import type { TActor } from '@/Engine/Actor';
import type { TAnyCameraWrapper } from '@/Engine/Camera';
import type { TAbstractIntersectionsWatcher, TIntersectionEvent, TIntersectionsCameraWatcher, TIntersectionsCameraWatcherParams } from '@/Engine/Intersections/Models';
import { getChangedPosition } from '@/Engine/Intersections/Utils';
import { AbstractIntersectionsWatcher } from '@/Engine/Intersections/Watchers/AbstractIntersectionsWatcher';
import type { TMilliseconds } from '@/Engine/Math';
import type { TRawModel3d } from '@/Engine/Models3d';
import type { TSceneObject } from '@/Engine/Scene';
import type { TReadonlyVector2 } from '@/Engine/ThreeLib';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

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
  // shouldUseDistinct might improve performance, however, won't fire an event if the mouse (position$) is not moving (and actor or scene is moving)
  const shouldUseDistinct: boolean = performance?.shouldUseDistinct ?? false;

  const tmpPosition = new Float32Array(2);
  const prevPosition = new Float32Array(2);

  const enabledSub$: Subscription = abstractIntersectionsWatcher.enabled$
    .pipe(
      distinctUntilChanged(),
      switchMap((isEnabled: boolean): Observable<TMilliseconds | never> => (isEnabled ? intersectionsLoop.tick$ : EMPTY)),
      // TODO 15-0-0: implement a support of shouldUseDistinct and test it
      map((): Readonly<{ position: TReadonlyVector2 }> | undefined =>
        // TODO 15-0-0: implement a support of shouldUseDistinct and test it
        shouldUseDistinct ? getChangedPosition(tmpPosition, prevPosition, position, threshold) : { position }
      ),
      filter(isDefined)
    )
    .subscribe(({ position }: Readonly<{ position: TReadonlyVector2 }>): void => {
      if (isNotDefined(camera)) {
        enabledSub$.unsubscribe();
        throw new Error('[IntersectionsWatcher]: Cannot start: camera is not defined');
      }

      const intersection: TIntersectionEvent | undefined = getIntersection(
        position as Vector2,
        camera,
        abstractIntersectionsWatcher.getActors().map((a: TActor): TRawModel3d => a.model3d.getRawModel3d())
      );
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
    setCamera
  });

  setCamera(params.camera);

  return result;
}
