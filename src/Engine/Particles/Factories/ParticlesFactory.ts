import type { TAsyncReactiveFactory, TCreateAsyncEntityFactoryFn } from '@/Engine/Abstract';
import { AsyncReactiveFactory, FactoryType } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Particles/Adapters';
import type { TParticlesFactory, TParticlesParams, TParticlesWrapperAsync } from '@/Engine/Particles/Models';
import { ParticlesWrapperAsync } from '@/Engine/Particles/Wrappers';

// TODO 9.0.0. RESOURCES: particles are not a resource by itself, but an entity.
// TODO 9.0.0. RESOURCES: So, the creation should be sync, not async (related resource should be loaded beforehand)
const factory: TAsyncReactiveFactory<TParticlesWrapperAsync, TParticlesParams> = {
  ...AsyncReactiveFactory(FactoryType.Particles, ParticlesWrapperAsync as TCreateAsyncEntityFactoryFn<TParticlesWrapperAsync, TParticlesParams>)
};
export const ParticlesFactory = (): TParticlesFactory => ({ ...factory, configToParams });
