import type { IAbstractSimpleRegistry, IProtectedRegistry } from '@/Engine/Abstract';

import type { IKeyboardRegistryValues } from './IKeyboardRegistryValues';

export type IKeyboardRegistry = IProtectedRegistry<IAbstractSimpleRegistry<IKeyboardRegistryValues>>;
