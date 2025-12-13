import type { IAbstractWatcher } from '@Engine/Domains/Abstract';
import { AbstractWatcher } from '@Engine/Domains/Abstract/Watcher';
import type { IGlobalContainerDecorator } from '@Engine/Global';
import type { IMouseEvent, IMousePosition } from '@Engine/Models';
import type { IMousePositionWatcher } from '@Engine/Watchers';

export function MousePositionWatcher(container: IGlobalContainerDecorator, tags: ReadonlyArray<string> = []): IMousePositionWatcher {
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
