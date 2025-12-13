import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher/AbstractWatcher';
import type { IMousePositionWatcher } from '@Engine/Watchers';
import type { IMousePosition } from '@Engine/Models';
import { Subject } from 'rxjs';

export function MousePositionWatcher(): IMousePositionWatcher {
  const value$: Subject<IMousePosition> = new Subject<IMousePosition>();

  const onMouseMoveListener = ({ clientX: x, clientY: y }: MouseEvent): void => value$.next({ x, y });

  // TODO (S.Panfilov) global?
  const start = (): void => document.addEventListener('mousemove', onMouseMoveListener);

  // TODO (S.Panfilov) global?
  const stop = (): void => document.removeEventListener('mousemove', onMouseMoveListener);

  return {
    ...AbstractWatcher('mouse_position', start, stop),
    value$
  };
}
