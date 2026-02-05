import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractWatcherRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TKeyComboWatcher, TKeyWatcher, TKeyWatcherRegistry } from '@hellpig/anarchy-engine/Keyboard/Models';

export function KeyWatcherRegistry(): TKeyWatcherRegistry {
  return AbstractWatcherRegistry<TKeyWatcher | TKeyComboWatcher>(RegistryType.KeyWatcher);
}
