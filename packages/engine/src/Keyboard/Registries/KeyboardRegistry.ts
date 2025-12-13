import { AbstractSimpleRegistry, RegistryType } from '@/Engine/Abstract';
import type { TKeyboardRegistry, TKeyboardRegistryValues } from '@/Engine/Keyboard/Models';

export function KeyboardRegistry(): TKeyboardRegistry {
  return AbstractSimpleRegistry<TKeyboardRegistryValues>(RegistryType.KeyboardRecord);
}
