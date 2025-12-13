import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TParticlesWrapper } from './TParticlesWrapper';

export type TParticlesRegistry = TProtectedRegistry<TAbstractEntityRegistry<TParticlesWrapper>>;
