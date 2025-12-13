import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';

import type { TFsmWrapper } from './TFsmWrapper';

export type TFsmRegistry = TProtectedRegistry<TAbstractEntityRegistry<TFsmWrapper>>;
