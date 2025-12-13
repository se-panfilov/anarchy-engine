import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher/AbstractWatcher';
import type { IMouseClicksWatcher } from '@Engine/Watchers';
import { Subject } from 'rxjs';
import type { IGlobalContainerDecorator } from '@Engine/Global';

export function MouseClicksWatcher(container: IGlobalContainerDecorator): IMouseClicksWatcher {
  const value$: Subject<void> = new Subject<void>();
  const onMouseUpListener = (): void => value$.next();

  return {
    ...AbstractWatcher('mouse_clicks'),
    start: (): void => container.startWatch('mousemove', onMouseUpListener),
    stop: (): void => container.stopWatch('mousemove', onMouseUpListener),
    value$
  };
}
