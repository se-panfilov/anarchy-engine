import { AbstractSimpleRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TKeyboardRegistry, TKeyboardRegistryValues } from '@/Engine/Keyboard/Models';

export const KeyboardRegistry = (): TKeyboardRegistry => RegistryFacade(AbstractSimpleRegistry<TKeyboardRegistryValues>(RegistryType.KeyboardRecord));
