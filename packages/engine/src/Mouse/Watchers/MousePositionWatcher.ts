import type { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, identity, map, takeUntil, tap, withLatestFrom } from 'rxjs';
import type { Vector2Like } from 'three';

import type { TAbstractWatcherWithState } from '@/Engine/Abstract';
import { AbstractWatcherWithState, WatcherType } from '@/Engine/Abstract';
import type { TMouseEvent, TMouseLoop, TMousePositionWatcher, TMousePositionWatcherParams } from '@/Engine/Mouse/Models';
import { getNormalizedMousePosition } from '@/Engine/Mouse/Utils';
import { isDefined, isEqualOrSimilarByXyCoords } from '@/Engine/Utils';

export function MousePositionWatcher({ container, tags, performance }: TMousePositionWatcherParams, mouseLoop: TMouseLoop): TMousePositionWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcherWithState<Vector2Like> = AbstractWatcherWithState(WatcherType.MousePositionWatcher, 'mouse_position_watcher', { x: 0, y: 0 }, tags);
  let prevPosition: Float32Array = new Float32Array(2); // [x, y] = [0, 0]
  let position: Float32Array = new Float32Array(2); // [x, y] = [0, 0]

  const onMouseMoveListener = (event: TMouseEvent): void => {
    const rect: DOMRect = container.viewportRect$.value ?? ({ left: 0, top: 0 } as DOMRect);
    // eslint-disable-next-line functional/immutable-data
    position[0] = event.clientX - rect.left;
    // eslint-disable-next-line functional/immutable-data
    position[1] = event.clientY - rect.top;
  };

  const threshold: number = performance?.noiseThreshold ?? 0.001;
  // shouldReactOnlyOnChange might improve performance, however won't fire an event if the mouse is not moving (and actor or scene is moving)
  const shouldReactOnlyOnChange: boolean = performance?.shouldReactOnlyOnChange ?? false;

  mouseLoop.tick$
    .pipe(
      shouldReactOnlyOnChange ? distinctUntilChanged((): boolean => isEqualOrSimilarByXyCoords(prevPosition[0], prevPosition[1], position[0], position[1], threshold)) : identity,
      tap((): void => {
        // eslint-disable-next-line functional/immutable-data
        prevPosition[0] = position[0]; //x
        // eslint-disable-next-line functional/immutable-data
        prevPosition[1] = position[1]; //y
      }),
      takeUntil(abstractWatcher.destroy$)
    )
    .subscribe((): void => abstractWatcher.value$.next({ x: position[0], y: position[1] }));

  abstractWatcher.enabled$.pipe(distinctUntilChanged(), takeUntil(abstractWatcher.destroy$)).subscribe((value: boolean): void => {
    if (value) container.startWatch('mousemove', onMouseMoveListener);
    else container.stopWatch('mousemove', onMouseMoveListener);
  });

  const destroySub$: Subscription = abstractWatcher.destroy$.subscribe((): void => {
    prevPosition = null as any;
    position = null as any;

    destroySub$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractWatcher, {
    getValue: (): Vector2Like => ({ ...abstractWatcher.value$.value }),
    valueNormalized$: abstractWatcher.value$.pipe(
      withLatestFrom(container.viewportRect$),
      filter(([, rect]: [Vector2Like, DOMRect]): boolean => isDefined(rect)),
      map(([coords, rect]: [Vector2Like, DOMRect]): Vector2Like => getNormalizedMousePosition(coords, rect as DOMRect))
    ),
    key: containerIdTag
  });
}
