import type { IAsyncReactiveFactory } from '@/Engine/Abstract';
import { AsyncReactiveFactory, FactoryType } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Particles/Adapter';
import type { IParticlesFactory, IParticlesParams, IParticlesWrapperAsync } from '@/Engine/Particles/Models';
import { ParticlesWrapperAsync } from '@/Engine/Particles/Wrapper';

const factory: IAsyncReactiveFactory<IParticlesWrapperAsync, IParticlesParams> = { ...AsyncReactiveFactory(FactoryType.Particles, ParticlesWrapperAsync) };
export const ParticlesFactory = (): IParticlesFactory => ({ ...factory, configToParams });
