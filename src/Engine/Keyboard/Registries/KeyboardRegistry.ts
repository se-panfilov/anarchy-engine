import { AbstractSimpleRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IKeyboardRegistry, IKeyboardRegistryValues } from '@/Engine/Keyboard/Models';

export const KeyboardRegistry = (): IKeyboardRegistry => RegistryFacade(AbstractSimpleRegistry<IKeyboardRegistryValues>(RegistryType.KeyboardRecord));
