import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Particles/Adapters';
import type { TParticlesFactory, TParticlesParams, TParticlesWrapper } from '@/Engine/Particles/Models';
import { ParticlesWrapper } from '@/Engine/Particles/Wrappers';

const factory: TReactiveFactory<TParticlesWrapper, TParticlesParams> = ReactiveFactory(FactoryType.Particles, ParticlesWrapper);

// eslint-disable-next-line functional/immutable-data
export const ParticlesFactory = (): TParticlesFactory => Object.assign(factory, { configToParams });
