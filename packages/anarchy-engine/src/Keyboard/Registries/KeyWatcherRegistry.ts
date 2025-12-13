import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractWatcherRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TKeyWatcher, TKeyWatcherRegistry } from '@Anarchy/Engine/Keyboard/Models';

export function KeyWatcherRegistry(): TKeyWatcherRegistry {
  return AbstractWatcherRegistry<TKeyWatcher>(RegistryType.KeyWatcher);
}
