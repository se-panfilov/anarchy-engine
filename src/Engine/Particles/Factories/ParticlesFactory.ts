import type { TAsyncReactiveFactory, TCreateAsyncEntityFactoryFn } from '@/Engine/Abstract';
import { AsyncReactiveFactory, FactoryType } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Particles/Adapters';
import type { IParticlesFactory, IParticlesParams, TParticlesWrapperAsync } from '@/Engine/Particles/Models';
import { ParticlesWrapperAsync } from '@/Engine/Particles/Wrappers';

const factory: TAsyncReactiveFactory<TParticlesWrapperAsync, IParticlesParams> = {
  ...AsyncReactiveFactory(FactoryType.Particles, ParticlesWrapperAsync as TCreateAsyncEntityFactoryFn<TParticlesWrapperAsync, IParticlesParams>)
};
export const ParticlesFactory = (): IParticlesFactory => ({ ...factory, configToParams });
