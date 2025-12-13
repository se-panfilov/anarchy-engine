import type { TAbstractAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TParticlesWrapperAsync } from './TParticlesWrapperAsync';

export type TParticlesAsyncRegistry = TProtectedRegistry<TAbstractAsyncRegistry<TParticlesWrapperAsync>>;
