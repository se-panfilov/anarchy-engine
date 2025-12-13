import type { IMousePositionWatcher, IMousePositionWatcherFactory, IMousePositionWatcherParams, IMousePositionWatcherRegistry } from '../Models';
import { MousePositionWatcherRegistry } from '../Registry';
import { MousePositionWatcher } from '../Watcher';

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
