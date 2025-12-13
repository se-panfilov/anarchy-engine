import type { TAsyncReactiveFactory, TCreateAsyncEntityFactoryFn } from '@/Engine/Abstract';
import { AsyncReactiveFactory, FactoryType } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Particles/Adapters';
import type { TParticlesFactory, TParticlesParams, TParticlesWrapperAsync } from '@/Engine/Particles/Models';
import { ParticlesWrapperAsync } from '@/Engine/Particles/Wrappers';

const factory: TAsyncReactiveFactory<TParticlesWrapperAsync, TParticlesParams> = {
  ...AsyncReactiveFactory(FactoryType.Particles, ParticlesWrapperAsync as TCreateAsyncEntityFactoryFn<TParticlesWrapperAsync, TParticlesParams>)
};
export const ParticlesFactory = (): TParticlesFactory => ({ ...factory, configToParams });
