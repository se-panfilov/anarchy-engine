import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TFsmSource } from './TFsmSource';

export type TFsmSourceRegistry = TProtectedRegistry<TAbstractSimpleRegistry<TFsmSource>>;
