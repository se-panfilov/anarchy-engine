import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory } from '@Engine/Domains/Abstract';

import type { IMousePositionWatcher, IMousePositionWatcherFactory, IMousePositionWatcherParams, IMousePositionWatcherRegistry } from '../Models';
import { MousePositionWatcherRegistry } from '../Registry';
import { MousePositionWatcher } from '../Watcher';

export function MousePositionWatcherFactory(): IMousePositionWatcherFactory {
  const registry: IMousePositionWatcherRegistry = MousePositionWatcherRegistry();

  function create({ container, tags }: IMousePositionWatcherParams): IMousePositionWatcher {
    const watcher: IMousePositionWatcher = MousePositionWatcher(container, tags);
    registry.add(watcher);
    return watcher;
  }

  const factory: IFactory<IMousePositionWatcher, IMousePositionWatcherParams> = { ...AbstractFactory('mouse_positions_watcher'), create };

  return {
    ...registry,
    ...factory
  };
}
