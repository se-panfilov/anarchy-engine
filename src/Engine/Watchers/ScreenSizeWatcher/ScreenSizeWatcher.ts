import type { IGlobalContainerDecorator } from '@Engine/Global';
import type { IScreenSizeWatcher } from '@Engine/Watchers/ScreenSizeWatcher/Models/IScreenSizeWatcher';
import type { IScreenParams } from '@Engine/Models';
import { AbstractWatcherWithState, IAbstractWatcherWithState } from '@Engine/Watchers';

export function ScreenSizeWatcher(container: IGlobalContainerDecorator): IScreenSizeWatcher {
  const initialValue: IScreenParams = { width: 0, height: 0, ratio: 0 };
  const abstractWatcher: IAbstractWatcherWithState<IScreenParams> = AbstractWatcherWithState(
    'screen-size',
    initialValue
  );

  const onResize = (): void =>
    abstractWatcher.value$.next({
      width: container.width,
      height: container.height,
      ratio: container.ratio
    });

  function start(): IScreenSizeWatcher {
    onResize();
    container.startWatch('resize', onResize);
    return result;
  }

  function stop(): IScreenSizeWatcher {
    container.stopWatch('resize', onResize);
    return result;
  }

  const result: IScreenSizeWatcher = {
    ...abstractWatcher,
    start,
    stop
  };

  return result;
}
