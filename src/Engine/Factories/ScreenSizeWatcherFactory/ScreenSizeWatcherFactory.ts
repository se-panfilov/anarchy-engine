import type { IGlobalContainerDecorator } from '@Engine/Global';

import type { IScreenSizeWatcherRegistry } from '@/Engine/Registries';
import { ScreenSizeWatcherRegistry } from '@/Engine/Registries';
import type { IScreenSizeWatcher } from '@/Engine/Watchers';
import { ScreenSizeWatcher } from '@/Engine/Watchers';

import type { IScreenSizeWatcherFactory } from './Models';

export function ScreenSizeWatcherFactory(): IScreenSizeWatcherFactory {
  const registry: IScreenSizeWatcherRegistry = ScreenSizeWatcherRegistry();

  return {
    create(container: IGlobalContainerDecorator, tags?: ReadonlyArray<string>): IScreenSizeWatcher {
      const watcher: IScreenSizeWatcher = ScreenSizeWatcher(container, tags);
      registry.add(watcher);
      return watcher;
    }
  };
}
