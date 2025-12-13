import type { IScreenSizeWatcher, IScreenSizeWatcherFactory, IScreenSizeWatcherParams, IScreenSizeWatcherRegistry } from '../Models';
import { ScreenSizeWatcherRegistry } from '../Registry';
import { ScreenSizeWatcher } from '../Watcher';

export function ScreenSizeWatcherFactory(): IScreenSizeWatcherFactory {
  const registry: IScreenSizeWatcherRegistry = ScreenSizeWatcherRegistry();

  return {
    ...registry,
    create({ container, tags }: IScreenSizeWatcherParams): IScreenSizeWatcher {
      const watcher: IScreenSizeWatcher = ScreenSizeWatcher(container, tags);
      registry.add(watcher);
      return watcher;
    },
    type: 'screen_size_watcher'
  };
}
