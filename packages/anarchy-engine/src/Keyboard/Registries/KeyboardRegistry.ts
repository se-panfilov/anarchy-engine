import { AbstractSimpleRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TKeyboardRegistry, TKeyboardRegistryValues } from '@Anarchy/Engine/Keyboard/Models';

export function KeyboardRegistry(): TKeyboardRegistry {
  return AbstractSimpleRegistry<TKeyboardRegistryValues>(RegistryType.KeyboardRecord);
}
