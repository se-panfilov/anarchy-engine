import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TModels3dWrapper } from './TModels3dWrapper';

export type TModels3dRegistry = TProtectedRegistry<TAbstractEntityRegistry<TModels3dWrapper>>;
