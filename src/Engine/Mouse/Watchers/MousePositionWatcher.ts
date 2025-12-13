import type { TAbstractWatcher } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import type { TLoopService } from '@/Engine/Loop';
import type { TMouseEvent, TMousePosition, TMousePositionWatcher, TMousePositionWatcherParams } from '@/Engine/Mouse/Models';
import { getNormalizedMousePosition } from '@/Engine/Mouse/Utils';

export function MousePositionWatcher({ container, tags }: TMousePositionWatcherParams, loopService: TLoopService): TMousePositionWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcher<TMousePosition> = AbstractWatcher(WatcherType.MousePositionWatcher, 'global_mouse_position_watcher', tags);
  let position: TMousePosition = { coords: { x: 0, y: 0 }, normalizedCoords: { x: 0, y: 0 } };
  const onMouseMoveListener = ({ clientX: x, clientY: y }: TMouseEvent): void => void (position = { coords: { x, y }, normalizedCoords: getNormalizedMousePosition({ x, y }) });

  loopService.tick$.subscribe((): void => abstractWatcher.value$.next(position));

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
