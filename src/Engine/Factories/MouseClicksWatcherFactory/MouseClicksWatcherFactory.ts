import type { IGlobalContainerDecorator } from '@Engine/Global';
import type { IMouseClicksWatcherFactory } from './Models';

import type { IMouseClicksWatcherRegistry } from '@/Engine/Registries';
import { MouseClicksWatcherRegistry } from '@/Engine/Registries';
import { MouseClicksWatcher } from '@/Engine/Watchers';
import type { IMouseClicksWatcher } from '@/Engine/Watchers';

export function MouseClicksWatcherFactory(): IMouseClicksWatcherFactory {
  const registry: IMouseClicksWatcherRegistry = MouseClicksWatcherRegistry();

  return {
    create(container: IGlobalContainerDecorator, tags?: ReadonlyArray<string>): IMouseClicksWatcher {
      const watcher: IMouseClicksWatcher = MouseClicksWatcher(container, tags);
      registry.add(watcher);
      return watcher;
    }
  };
}
