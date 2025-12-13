import { AbstractSimpleRegistry, RegistryType } from '@/Abstract';
import type { TKeyboardRegistry, TKeyboardRegistryValues } from '@/Keyboard/Models';

export function KeyboardRegistry(): TKeyboardRegistry {
  return AbstractSimpleRegistry<TKeyboardRegistryValues>(RegistryType.KeyboardRecord);
}
