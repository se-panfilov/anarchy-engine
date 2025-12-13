import type { Subscription } from 'rxjs';

import type { TAbstractWatcherWithState } from '@/Engine/Abstract';
import { AbstractWatcherWithState, WatcherType } from '@/Engine/Abstract';
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

  const startSub$: Subscription = abstractWatcher.start$.subscribe((): void => {
    onResize();
    container.startWatch('resize', onResize);
  });

  const stopSub$: Subscription = abstractWatcher.stop$.subscribe((): void => container.stopWatch('resize', onResize));

  const destroySub$: Subscription = abstractWatcher.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    startSub$.unsubscribe();
    stopSub$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractWatcher, {
    getValue: (): TScreenSizeValues => ({ ...abstractWatcher.value$.value }),
    key: containerIdTag
  });
}
