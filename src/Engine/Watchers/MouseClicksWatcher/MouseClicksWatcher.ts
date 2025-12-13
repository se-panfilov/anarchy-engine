import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher/AbstractWatcher';
import type { IMouseClicksWatcher } from '@Engine/Watchers';
import { Subject } from 'rxjs';

export function MouseClicksWatcher(): IMouseClicksWatcher {
  const value$: Subject<void> = new Subject<void>();
  const onMouseUpListener = (): void => value$.next();

  // TODO (S.Panfilov) global?
  document.addEventListener('mouseup', onMouseUpListener);

  // TODO (S.Panfilov) global?
  const start = (): void => document.addEventListener('mousemove', onMouseUpListener);

  // TODO (S.Panfilov) global?
  const stop = (): void => document.removeEventListener('mousemove', onMouseUpListener);

  return {
    ...AbstractWatcher('mouse_clicks', start, stop),
    value$
  };
}
