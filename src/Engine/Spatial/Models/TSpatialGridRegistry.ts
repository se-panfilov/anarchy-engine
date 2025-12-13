import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TSpatialGridWrapper } from './TSpatialGridWrapper';

export type TSpatialGridRegistry = TProtectedRegistry<TAbstractEntityRegistry<TSpatialGridWrapper>>;
