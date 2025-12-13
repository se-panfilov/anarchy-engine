import type { IMouseClicksWatcher, IMouseClicksWatcherFactory, IMouseClicksWatcherRegistry, IMouseClickWatcherParams } from '../Models';
import { MouseClicksWatcherRegistry } from '../Registry';
import { MouseClicksWatcher } from '../Watcher';

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
