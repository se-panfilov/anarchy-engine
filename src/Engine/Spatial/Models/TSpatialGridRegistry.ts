import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TSpatialGrid } from './TSpatialGrid';

export type TSpatialGridRegistry = TProtectedRegistry<TAbstractSimpleRegistry<TSpatialGrid>>;
