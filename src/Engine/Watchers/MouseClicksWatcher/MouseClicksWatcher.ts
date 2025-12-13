import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher/AbstractWatcher';
import type { IMouseClicksWatcher } from '@Engine/Watchers';
import { Subject } from 'rxjs';

export function MouseClicksWatcher(): IMouseClicksWatcher {
  const value$: Subject<void> = new Subject<void>();
  const onMouseUpListener = (): void => value$.next();

  return {
    ...AbstractWatcher('mouse_clicks'),
    // TODO (S.Panfilov) global?
    start: (): void => document.addEventListener('mousemove', onMouseUpListener),
    // TODO (S.Panfilov) global?
    stop: (): void => document.removeEventListener('mousemove', onMouseUpListener),
    value$
  };
}
