import { RegistryType } from '@/Abstract/Constants';
import { AbstractWatcherRegistry } from '@/Abstract/Registries';
import type { TMousePositionWatcher, TMousePositionWatcherRegistry } from '@/Mouse/Models';

export function MousePositionWatcherRegistry(): TMousePositionWatcherRegistry {
  return AbstractWatcherRegistry<TMousePositionWatcher>(RegistryType.MousePositionWatcher);
}
