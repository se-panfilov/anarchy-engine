import type { TAbstractWatcherWithState } from '@/Engine/Abstract';
import { AbstractWatcherWithState, WatcherType } from '@/Engine/Abstract';
import { ProtectedWatcher } from '@/Engine/Abstract/Watchers/ProtectedWatcher';
import type { TScreenSizeValues, TScreenSizeWatcher, TScreenSizeWatcherParams } from '@/Engine/Screen/Models';

export function ScreenSizeWatcher({ container, tags = [] }: TScreenSizeWatcherParams): TScreenSizeWatcher {
  const initialValue: TScreenSizeValues = { width: container.getWidth(), height: container.getHeight(), ratio: container.getRatio() };
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: TAbstractWatcherWithState<TScreenSizeValues> = AbstractWatcherWithState(WatcherType.ScreenSizeWatcher, 'global_screen_size_watcher', initialValue, tags);

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
    ...ProtectedWatcher(abstractWatcher),
    getValue: (): TScreenSizeValues => ({ ...abstractWatcher.value$.value }),
    key: containerIdTag,
    start,
    stop
  };

  return result;
}
