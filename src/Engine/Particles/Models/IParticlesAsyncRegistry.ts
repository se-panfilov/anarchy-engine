import type { IAbstractAsyncRegistry, IProtectedRegistry } from '@/Engine/Abstract';

import type { IParticlesWrapperAsync } from './IParticlesWrapperAsync';

export type IParticlesAsyncRegistry = IProtectedRegistry<IAbstractAsyncRegistry<IParticlesWrapperAsync>>;
