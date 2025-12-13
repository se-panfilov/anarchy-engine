import { distinctUntilChanged, identity, map, tap } from 'rxjs';
import type { Vector2Like } from 'three';

import type { TAbstractWatcher, TAbstractWatcherWithState } from '@/Engine/Abstract';
import { AbstractWatcherWithState, WatcherType } from '@/Engine/Abstract';
import { ProtectedWatcher } from '@/Engine/Abstract/Watchers/ProtectedWatcher';
import type { TMouseEvent, TMouseLoop, TMousePositionWatcher, TMousePositionWatcherParams } from '@/Engine/Mouse/Models';
import { getNormalizedMousePosition } from '@/Engine/Mouse/Utils';
import { isEqualOrSimilarByXyCoords } from '@/Engine/Utils';

export function MousePositionWatcher({ container, tags, performance }: TMousePositionWatcherParams, mouseLoop: TMouseLoop): TMousePositionWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcherWithState<Vector2Like> = AbstractWatcherWithState(WatcherType.MousePositionWatcher, 'global_mouse_position_watcher', { x: 0, y: 0 }, tags);
  const prevPosition: Float32Array = new Float32Array(2); // [x, y] = [0, 0]
  const position: Float32Array = new Float32Array(2); // [x, y] = [0, 0]

  const onMouseMoveListener = ({ clientX: x, clientY: y }: TMouseEvent): void => {
    // eslint-disable-next-line functional/immutable-data
    position[0] = x;
    // eslint-disable-next-line functional/immutable-data
    position[1] = y;
  };

  const threshold: number = performance?.noiseThreshold ?? 0.001;
  // shouldUseDistinct might improve performance, however won't fire an event if the mouse is not moving (and actor or scene is moving)
  const shouldUseDistinct: boolean = performance?.shouldUseDistinct ?? false;

  mouseLoop.tick$
    .pipe(
      shouldUseDistinct ? distinctUntilChanged((): boolean => isEqualOrSimilarByXyCoords(prevPosition[0], prevPosition[1], position[0], position[1], threshold)) : identity,
      tap((): void => {
        // eslint-disable-next-line functional/immutable-data
        prevPosition[0] = position[0]; //x
        // eslint-disable-next-line functional/immutable-data
        prevPosition[1] = position[1]; //y
      })
    )
    .subscribe((): void => {
      abstractWatcher.value$.next({ x: position[0], y: position[1] });
    });

  function start(): TMousePositionWatcher {
    container.startWatch('mousemove', onMouseMoveListener);
    return result;
  }

  function stop(): TMousePositionWatcher {
    container.stopWatch('mousemove', onMouseMoveListener);
    return result;
  }

  const result: TMousePositionWatcher = Object.assign(ProtectedWatcher<TAbstractWatcher<Vector2Like>, Vector2Like>(abstractWatcher), {
    getValue: (): Vector2Like => ({ ...abstractWatcher.value$.value }),
    valueNormalized$: abstractWatcher.value$.pipe(map(getNormalizedMousePosition)),
    key: containerIdTag,
    start,
    stop
  });

  return result;
}
