import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TKeyboardRegistryValues } from './TKeyboardRegistryValues';

export type TKeyboardRegistry = TProtectedRegistry<TAbstractSimpleRegistry<TKeyboardRegistryValues>>;
