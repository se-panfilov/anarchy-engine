import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TFogWrapper } from './TFogWrapper';

export type TFogRegistry = TProtectedRegistry<TAbstractEntityRegistry<TFogWrapper>>;
