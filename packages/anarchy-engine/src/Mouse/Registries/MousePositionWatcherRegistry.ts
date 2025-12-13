import { RegistryType } from '@Engine/Abstract/Constants';
import { AbstractWatcherRegistry } from '@Engine/Abstract/Registries';
import type { TMousePositionWatcher, TMousePositionWatcherRegistry } from '@Engine/Mouse/Models';

export function MousePositionWatcherRegistry(): TMousePositionWatcherRegistry {
  return AbstractWatcherRegistry<TMousePositionWatcher>(RegistryType.MousePositionWatcher);
}
