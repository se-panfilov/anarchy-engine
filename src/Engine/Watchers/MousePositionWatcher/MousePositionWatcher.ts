import type { IMouseEvent, IMousePosition } from '@Engine/Models';
import type { IMousePositionWatcher } from '@Engine/Watchers';
import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher/AbstractWatcher';
import { Subject } from 'rxjs';

export function MousePositionWatcher(): IMousePositionWatcher {
  const value$: Subject<IMousePosition> = new Subject<IMousePosition>();

  const onMouseMoveListener = ({ clientX: x, clientY: y }: IMouseEvent): void => value$.next({ x, y });

  return {
    ...AbstractWatcher('mouse_position'),
    // TODO (S.Panfilov) global?
    start: (): void => document.addEventListener('mousemove', onMouseMoveListener),
    // TODO (S.Panfilov) global?
    stop: (): void => document.removeEventListener('mousemove', onMouseMoveListener),
    value$
  };
}
