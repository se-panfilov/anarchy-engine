import type { TAbstractAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { IParticlesWrapperAsync } from './IParticlesWrapperAsync';

export type IParticlesAsyncRegistry = TProtectedRegistry<TAbstractAsyncRegistry<IParticlesWrapperAsync>>;
