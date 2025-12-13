import type { TAbstractWatcherWithState } from '@/Engine/Abstract';
import { AbstractWatcherWithState, WatcherType } from '@/Engine/Abstract';
import type { IScreenSizeValues, IScreenSizeWatcher, IScreenSizeWatcherParams } from '@/Engine/Screen/Models';

export function ScreenSizeWatcher({ container, tags = [] }: IScreenSizeWatcherParams): IScreenSizeWatcher {
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
    value$: abstractWatcher.value$.asObservable(),
    key: containerIdTag,
    start,
    stop
  };

  return result;
}
