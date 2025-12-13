import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory } from '@Engine/Domains/Abstract';

import type { IMouseClicksWatcher, IMouseClicksWatcherFactory, IMouseClicksWatcherRegistry, IMouseClickWatcherParams } from '../Models';
import { MouseClicksWatcherRegistry } from '../Registry';
import { MouseClicksWatcher } from '../Watcher';

export function MouseClicksWatcherFactory(): IMouseClicksWatcherFactory {
  const registry: IMouseClicksWatcherRegistry = MouseClicksWatcherRegistry();

  function create({ container, tags }: IMouseClickWatcherParams): IMouseClicksWatcher {
    const watcher: IMouseClicksWatcher = MouseClicksWatcher(container, tags);
    registry.add(watcher);
    return watcher;
  }

  const factory: IFactory<IMouseClicksWatcher, IMouseClickWatcherParams> = { ...AbstractFactory('mouse_clicks_watcher'), create };

  return {
    ...registry,
    ...factory
  };
}
