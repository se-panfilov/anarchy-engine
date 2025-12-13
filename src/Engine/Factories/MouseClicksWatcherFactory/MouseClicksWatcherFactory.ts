import type { IGlobalContainerDecorator } from '@Engine/Global';

import type { IMouseClicksWatcherRegistry } from '@/Engine/Registries';
import { MouseClicksWatcherRegistry } from '@/Engine/Registries';
import type { IMouseClicksWatcher } from '@/Engine/Watchers';
import { MouseClicksWatcher } from '@/Engine/Watchers';

import type { IMouseClicksWatcherFactory } from './Models';

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
