import type { IAsyncReactiveFactory, ICreateAsyncEntityFactoryFn } from '@/Engine/Abstract';
import { AsyncReactiveFactory, FactoryType } from '@/Engine/Abstract';
import { configToParams } from 'src/Engine/Particles/Adapters';
import type { IParticlesFactory, IParticlesParams, IParticlesWrapperAsync } from '@/Engine/Particles/Models';
import { ParticlesWrapperAsync } from 'src/Engine/Particles/Wrappers';

const factory: IAsyncReactiveFactory<IParticlesWrapperAsync, IParticlesParams> = {
  ...AsyncReactiveFactory(FactoryType.Particles, ParticlesWrapperAsync as ICreateAsyncEntityFactoryFn<IParticlesWrapperAsync, IParticlesParams>)
};
export const ParticlesFactory = (): IParticlesFactory => ({ ...factory, configToParams });
