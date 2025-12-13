import { MouseClicksWatcherRegistry } from '@Engine/Domains/Mouse/Registry';
import { MouseClicksWatcher } from '@Engine/Domains/Mouse/Watcher';

import type { IMouseClicksWatcher, IMouseClicksWatcherFactory, IMouseClicksWatcherRegistry, IMouseClickWatcherParams } from '../Models';

export function MouseClicksWatcherFactory(): IMouseClicksWatcherFactory {
  const registry: IMouseClicksWatcherRegistry = MouseClicksWatcherRegistry();

  return {
    ...registry,
    create({ container, tags }: IMouseClickWatcherParams): IMouseClicksWatcher {
      const watcher: IMouseClicksWatcher = MouseClicksWatcher(container, tags);
      registry.add(watcher);
      return watcher;
    },
    type: 'mouse_clicks_watcher'
  };
}
