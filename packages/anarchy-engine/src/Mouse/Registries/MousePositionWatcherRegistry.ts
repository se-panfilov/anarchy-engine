import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractWatcherRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TMousePositionWatcher, TMousePositionWatcherRegistry } from '@hellpig/anarchy-engine/Mouse/Models';

export function MousePositionWatcherRegistry(): TMousePositionWatcherRegistry {
  return AbstractWatcherRegistry<TMousePositionWatcher>(RegistryType.MousePositionWatcher);
}
