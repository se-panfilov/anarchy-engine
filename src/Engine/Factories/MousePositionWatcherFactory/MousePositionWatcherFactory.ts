import { MousePositionWatcherRegistry } from '@Engine/Registries';
import type { IMousePositionWatcher, IMousePositionWatcherRegistry, MousePositionWatcher, IMousePositionWatcherParams } from '@Engine/Domains/Mouse';

import type { IMousePositionWatcherFactory } from './Models';

export function MousePositionWatcherFactory(): IMousePositionWatcherFactory {
  const registry: IMousePositionWatcherRegistry = MousePositionWatcherRegistry();

  return {
    ...registry,
    create({ container, tags }: IMousePositionWatcherParams): IMousePositionWatcher {
      const watcher: IMousePositionWatcher = MousePositionWatcher(container, tags);
      registry.add(watcher);
      return watcher;
    },
    type: 'mouse_positions_watcher'
  };
}
