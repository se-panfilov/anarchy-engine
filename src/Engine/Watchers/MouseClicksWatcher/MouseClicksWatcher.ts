import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher/AbstractWatcher';
import type { IMouseClicksWatcher } from '@Engine/Watchers';
import { Subject } from 'rxjs';
import type { IGlobalContainerDecorator } from '@Engine/Global';

export function MouseClicksWatcher(container: IGlobalContainerDecorator): IMouseClicksWatcher {
  const value$: Subject<void> = new Subject<void>();
  const onMouseUpListener = (): void => value$.next();

  function start(): IMouseClicksWatcher {
    container.startWatch('mousemove', onMouseUpListener);
    return result;
  }

  function stop(): IMouseClicksWatcher {
    container.stopWatch('mousemove', onMouseUpListener);
    return result;
  }

  const result: IMouseClicksWatcher = {
    ...AbstractWatcher('mouse_clicks'),
    start,
    stop,
    value$
  };

  return result;
}
