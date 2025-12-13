import { Subject } from 'rxjs';
import type { MousePosition } from '@Engine/Models';
import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher';

export function MousePositionWatcher(): ReturnType<typeof AbstractWatcher<MousePosition>> {
  const value$ = new Subject<MousePosition>();

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
