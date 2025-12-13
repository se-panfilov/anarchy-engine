import type { IAbstractWatcher } from '@Engine/Domains/Abstract';
import { AbstractWatcher } from '@Engine/Domains/Abstract';
import type { IMouseEvent, IMousePosition, IMousePositionWatcher, IMousePositionWatcherParams } from '@Engine/Domains/Mouse/Models';

export function MousePositionWatcher({ container, tags = [] }: IMousePositionWatcherParams): IMousePositionWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: IAbstractWatcher<IMousePosition> = AbstractWatcher('mouse_position', tags);
  const onMouseMoveListener = ({ clientX: x, clientY: y }: IMouseEvent): void => abstractWatcher.value$.next({ x, y });

  function start(): IMousePositionWatcher {
    container.startWatch('mousemove', onMouseMoveListener);
    return result;
  }

  function stop(): IMousePositionWatcher {
    container.stopWatch('mousemove', onMouseMoveListener);
    return result;
  }

  const result: IMousePositionWatcher = {
    ...abstractWatcher,
    key: containerIdTag,
    start,
    stop
  };

  return result;
}
