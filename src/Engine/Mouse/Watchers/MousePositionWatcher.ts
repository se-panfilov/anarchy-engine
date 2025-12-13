import { distinctUntilChanged, sampleTime, tap } from 'rxjs';

import type { TAbstractWatcher } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import type { TLoopService } from '@/Engine/Loop';
import type { TMouseEvent, TMousePosition, TMousePositionWatcher, TMousePositionWatcherParams } from '@/Engine/Mouse/Models';
import { getNormalizedMousePosition } from '@/Engine/Mouse/Utils';
import { isEqualOrSimilarVector2Like } from '@/Engine/Utils';

export function MousePositionWatcher({ container, tags, delay, noiseThreshold }: TMousePositionWatcherParams, loopService: TLoopService): TMousePositionWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcher<TMousePosition> = AbstractWatcher(WatcherType.MousePositionWatcher, 'global_mouse_position_watcher', tags);
  let prevPosition: TMousePosition = { coords: { x: 0, y: 0 }, normalizedCoords: { x: 0, y: 0 } };
  // TODO COORDS: Do we really need normalizedCoords?
  let position: TMousePosition = { coords: { x: 0, y: 0 }, normalizedCoords: { x: 0, y: 0 } };
  const onMouseMoveListener = ({ clientX: x, clientY: y }: TMouseEvent): void => void (position = { coords: { x, y }, normalizedCoords: getNormalizedMousePosition({ x, y }) });

  // TODO ENV: limited fps, perhaps should be configurable
  const updateDelay: number = delay ?? 2; // 480 FPS (when 16 is 60 FPS)
  const threshold: number = noiseThreshold ?? 0.001;

  // TODO Instead of loopService.tick$, mouse should have own loop (with configurable tick speed)
  loopService.tick$
    .pipe(
      distinctUntilChanged((): boolean => isEqualOrSimilarVector2Like(prevPosition.coords, position.coords, threshold)),
      tap((): void => void (prevPosition = position)),
      sampleTime(updateDelay)
    )
    .subscribe((): void => {
      // TODO 8.0.0. MODELS: check if this works while mouse not moving, but the scene is moving
      // console.log('XXX 111', position);
      abstractWatcher.value$.next(position);
    });

  function start(): TMousePositionWatcher {
    container.startWatch('mousemove', onMouseMoveListener);
    return result;
  }

  function stop(): TMousePositionWatcher {
    container.stopWatch('mousemove', onMouseMoveListener);
    return result;
  }

  const result: TMousePositionWatcher = {
    ...abstractWatcher,
    value$: abstractWatcher.value$.asObservable(),
    key: containerIdTag,
    start,
    stop
  };

  return result;
}
