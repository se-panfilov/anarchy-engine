import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { IKeyboardRegistryValues } from './IKeyboardRegistryValues';

export type IKeyboardRegistry = TProtectedRegistry<TAbstractSimpleRegistry<IKeyboardRegistryValues>>;
