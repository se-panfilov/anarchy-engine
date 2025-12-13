import type { IMouseEvent, IMousePosition } from '@Engine/Models';
import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher/AbstractWatcher';
import type { IMousePositionWatcher } from '@Engine/Watchers';
import { Subject } from 'rxjs';
import type { IGlobalContainerDecorator } from '@Engine/Global';

export function MousePositionWatcher(container: IGlobalContainerDecorator): IMousePositionWatcher {
  const value$: Subject<IMousePosition> = new Subject<IMousePosition>();

  const onMouseMoveListener = ({ clientX: x, clientY: y }: IMouseEvent): void => value$.next({ x, y });

  function start(): IMousePositionWatcher {
    container.startWatch('mousemove', onMouseMoveListener);
    return result;
  }

  function stop(): IMousePositionWatcher {
    container.stopWatch('mousemove', onMouseMoveListener);
    return result;
  }

  const result: IMousePositionWatcher = {
    ...AbstractWatcher('mouse_position'),
    start,
    stop,
    value$
  };

  return result;
}
