import { IMousePositionWatcherParams } from '@/Engine/Models';
import type { IMousePositionWatcherRegistry } from '@/Engine/Registries';
import { MousePositionWatcherRegistry } from '@/Engine/Registries';
import type { IMousePositionWatcher } from '@/Engine/Watchers';
import { MousePositionWatcher } from '@/Engine/Watchers';

import type { IMousePositionWatcherFactory } from './Models';

export function MousePositionWatcherFactory(): IMousePositionWatcherFactory {
  const registry: IMousePositionWatcherRegistry = MousePositionWatcherRegistry();

  return {
    create({ container, tags }: IMousePositionWatcherParams): IMousePositionWatcher {
      const watcher: IMousePositionWatcher = MousePositionWatcher(container, tags);
      registry.add(watcher);
      return watcher;
    }
  };
}
