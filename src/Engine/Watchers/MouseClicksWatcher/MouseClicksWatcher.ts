import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher/AbstractWatcher';
import type { IMouseClicksWatcher } from '@Engine/Watchers';
import type { IAbstractWatcher } from '@Engine/Watchers';
import type { IGlobalContainerDecorator } from '@Engine/Global';

export function MouseClicksWatcher(container: IGlobalContainerDecorator): IMouseClicksWatcher {
  const abstractWatcher: IAbstractWatcher<void> = AbstractWatcher('mouse_clicks');
  const onMouseUpListener = (): void => abstractWatcher.value$.next();

  function start(): IMouseClicksWatcher {
    container.startWatch('mouseup', onMouseUpListener);
    return result;
  }

  function stop(): IMouseClicksWatcher {
    container.stopWatch('mouseup', onMouseUpListener);
    return result;
  }

  const result: IMouseClicksWatcher = {
    ...abstractWatcher,
    start,
    stop
  };

  return result;
}
