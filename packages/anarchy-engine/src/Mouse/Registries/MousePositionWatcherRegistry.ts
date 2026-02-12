import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractWatcherRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TMousePositionWatcher, TMousePositionWatcherRegistry } from '@Anarchy/Engine/Mouse/Models';

export function MousePositionWatcherRegistry(): TMousePositionWatcherRegistry {
  return AbstractWatcherRegistry<TMousePositionWatcher>(RegistryType.MousePositionWatcher);
}
