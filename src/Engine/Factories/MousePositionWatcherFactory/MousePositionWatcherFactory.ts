import type { IGlobalContainerDecorator } from '@Engine/Global';

import type { IMousePositionWatcherRegistry } from '@/Engine/Registries';
import { MousePositionWatcherRegistry } from '@/Engine/Registries';
import type { IMousePositionWatcher } from '@/Engine/Watchers';
import { MousePositionWatcher } from '@/Engine/Watchers';

import type { IMousePositionWatcherFactory } from './Models';

export function MousePositionWatcherFactory(): IMousePositionWatcherFactory {
  const registry: IMousePositionWatcherRegistry = MousePositionWatcherRegistry();

  return {
    create(container: IGlobalContainerDecorator, tags?: ReadonlyArray<string>): IMousePositionWatcher {
      const watcher: IMousePositionWatcher = MousePositionWatcher(container, tags);
      registry.add(watcher);
      return watcher;
    }
  };
}
