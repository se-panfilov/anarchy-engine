import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractWatcherRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TKeyboardWatcher, TKeyboardWatcherRegistry } from '@Anarchy/Engine/Keyboard/Models';

export function KeyboardWatcherRegistry(): TKeyboardWatcherRegistry {
  return AbstractWatcherRegistry<TKeyboardWatcher>(RegistryType.KeyboardWatcher);
}
