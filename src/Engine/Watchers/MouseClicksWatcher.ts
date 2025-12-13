import { Subject } from 'rxjs';
import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher';

export function MouseClicksWatcher(): ReturnType<typeof AbstractWatcher<void>> {
  const value$ = new Subject<void>();
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
