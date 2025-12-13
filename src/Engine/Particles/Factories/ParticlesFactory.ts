import type { TAsyncReactiveFactory, TCreateAsyncEntityFactoryFn } from '@/Engine/Abstract';
import { AsyncReactiveFactory, FactoryType } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Particles/Adapters';
import type { IParticlesFactory, IParticlesParams, IParticlesWrapperAsync } from '@/Engine/Particles/Models';
import { ParticlesWrapperAsync } from '@/Engine/Particles/Wrappers';

const factory: TAsyncReactiveFactory<IParticlesWrapperAsync, IParticlesParams> = {
  ...AsyncReactiveFactory(FactoryType.Particles, ParticlesWrapperAsync as TCreateAsyncEntityFactoryFn<IParticlesWrapperAsync, IParticlesParams>)
};
export const ParticlesFactory = (): IParticlesFactory => ({ ...factory, configToParams });
