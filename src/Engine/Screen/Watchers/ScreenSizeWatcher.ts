import type { TAbstractWatcherWithState } from '@/Engine/Abstract';
import { AbstractWatcherWithState, WatcherType } from '@/Engine/Abstract';
import type { IScreenSizeValues, IScreenSizeWatcherParams, TScreenSizeWatcher } from '@/Engine/Screen/Models';

export function ScreenSizeWatcher({ container, tags = [] }: IScreenSizeWatcherParams): TScreenSizeWatcher {
  const initialValue: IScreenSizeValues = { width: 0, height: 0, ratio: 0 };
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcherWithState<IScreenSizeValues> = AbstractWatcherWithState(WatcherType.ScreenSizeWatcher, initialValue, tags);

  const onResize = (): void => {
    abstractWatcher.value$.next({
      width: container.getWidth(),
      height: container.getHeight(),
      ratio: container.getRatio()
    });
  };

  function start(): TScreenSizeWatcher {
    onResize();
    container.startWatch('resize', onResize);
    return result;
  }

  function stop(): TScreenSizeWatcher {
    container.stopWatch('resize', onResize);
    return result;
  }

  const result: TScreenSizeWatcher = {
    ...abstractWatcher,
    value$: abstractWatcher.value$.asObservable(),
    key: containerIdTag,
    start,
    stop
  };

  return result;
}
