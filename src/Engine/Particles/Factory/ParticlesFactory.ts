import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Particles/Adapter';
import type { IParticlesFactory, IParticlesParams, IParticlesWrapper } from '@/Engine/Particles/Models';
import { ParticlesWrapper } from '@/Engine/Particles/Wrapper';

const factory: IReactiveFactory<IParticlesWrapper, IParticlesParams> = { ...ReactiveFactory(FactoryType.Particles, ParticlesWrapper) };
export const ParticlesFactory = (): IParticlesFactory => ({ ...factory, configToParams });
