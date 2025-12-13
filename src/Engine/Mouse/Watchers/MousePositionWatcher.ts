import type { TAbstractWatcher } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import type { TMouseEvent, TMousePosition, TMousePositionWatcher, TMousePositionWatcherParams } from '@/Engine/Mouse/Models';
import { getNormalizedMousePosition } from '@/Engine/Mouse/Utils';

export function MousePositionWatcher({ container, tags = [] }: TMousePositionWatcherParams): TMousePositionWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcher<TMousePosition> = AbstractWatcher(WatcherType.MousePositionWatcher, 'global_mouse_position_watcher', tags);
  const onMouseMoveListener = ({ clientX: x, clientY: y }: TMouseEvent): void => abstractWatcher.value$.next({ coords: { x, y }, normalizedCoords: getNormalizedMousePosition({ x, y }) });

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
