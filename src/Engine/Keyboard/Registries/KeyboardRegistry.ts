import { AbstractSimpleRegistry, RegistryType } from '@/Engine/Abstract';
import type { TKeyboardRegistry, TKeyboardRegistryValues } from '@/Engine/Keyboard/Models';

export const KeyboardRegistry = (): TKeyboardRegistry => AbstractSimpleRegistry<TKeyboardRegistryValues>(RegistryType.KeyboardRecord);
