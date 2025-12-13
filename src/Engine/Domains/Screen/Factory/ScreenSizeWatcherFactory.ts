import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory } from '@Engine/Domains/Abstract';

import type { IScreenSizeWatcher, IScreenSizeWatcherFactory, IScreenSizeWatcherParams, IScreenSizeWatcherRegistry } from '../Models';
import { ScreenSizeWatcherRegistry } from '../Registry';
import { ScreenSizeWatcher } from '../Watcher';

export function ScreenSizeWatcherFactory(): IScreenSizeWatcherFactory {
  const registry: IScreenSizeWatcherRegistry = ScreenSizeWatcherRegistry();

  function create({ container, tags }: IScreenSizeWatcherParams): IScreenSizeWatcher {
    const watcher: IScreenSizeWatcher = ScreenSizeWatcher(container, tags);
    registry.add(watcher);
    return watcher;
  }

  const factory: IFactory<IScreenSizeWatcher, IScreenSizeWatcherParams> = { ...AbstractFactory('screen_size_watcher'), create };

  return {
    ...factory,
    ...registry
  };
}
