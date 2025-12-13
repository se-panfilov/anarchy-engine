import type { IScreenSizeWatcherParams } from '@/Engine/Models';
import type { IScreenSizeWatcherRegistry } from '@/Engine/Registries';
import { ScreenSizeWatcherRegistry } from '@/Engine/Registries';
import type { IScreenSizeWatcher } from '@/Engine/Watchers';
import { ScreenSizeWatcher } from '@/Engine/Watchers';

import type { IScreenSizeWatcherFactory } from './Models';

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
