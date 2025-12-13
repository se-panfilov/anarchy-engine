import { distinctUntilChanged, map, sampleTime, tap } from 'rxjs';
import type { Vector2Like } from 'three';

import type { TAbstractWatcher } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import type { TLoopService } from '@/Engine/Loop';
import type { TMouseEvent, TMousePositionWatcher, TMousePositionWatcherParams } from '@/Engine/Mouse/Models';
import { getNormalizedMousePosition } from '@/Engine/Mouse/Utils';
import { isEqualOrSimilarVector2Like } from '@/Engine/Utils';

export function MousePositionWatcher({ container, tags, performance }: TMousePositionWatcherParams, loopService: TLoopService): TMousePositionWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcher<Vector2Like> = AbstractWatcher(WatcherType.MousePositionWatcher, 'global_mouse_position_watcher', tags);
  let prevPosition: Vector2Like = { x: 0, y: 0 };
  let position: Vector2Like = { x: 0, y: 0 };
  const onMouseMoveListener = ({ clientX: x, clientY: y }: TMouseEvent): void => void (position = { x, y });

  // TODO ENV: limited fps, perhaps should be configurable
  const updateDelay: number = performance?.updateDelay ?? 2; // 480 FPS (when 16 is 60 FPS)
  const threshold: number = performance?.updateDelay ?? 0.001;

  // TODO LOOP: Instead of loopService.tick$, mouse should have own loop (with configurable tick speed)
  loopService.tick$
    .pipe(
      distinctUntilChanged((): boolean => isEqualOrSimilarVector2Like(prevPosition, position, threshold)),
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
    valueNormalized$: abstractWatcher.value$.pipe(map((v: Vector2Like): Vector2Like => getNormalizedMousePosition(v))),
    key: containerIdTag,
    start,
    stop
  };

  return result;
}
