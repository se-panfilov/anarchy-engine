import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher/AbstractWatcher';
import type { IMousePositionWatcher } from '@Engine/Watchers';
import type { IMousePosition } from '@Engine/Models';
import { Subject } from 'rxjs';

export function MousePositionWatcher(): IMousePositionWatcher {
  const value$: Subject<IMousePosition> = new Subject<IMousePosition>();

  const onMouseMoveListener = ({ clientX: x, clientY: y }: MouseEvent): void => value$.next({ x, y });

  return {
    ...AbstractWatcher('mouse_position'),
    // TODO (S.Panfilov) global?
    start: (): void => document.addEventListener('mousemove', onMouseMoveListener),
    // TODO (S.Panfilov) global?
    stop: (): void => document.removeEventListener('mousemove', onMouseMoveListener),
    value$
  };
}
