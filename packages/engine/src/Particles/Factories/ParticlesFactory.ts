import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Particles/Adapters';
import type { TParticlesFactory, TParticlesParams, TParticlesServiceDependencies, TParticlesWrapper } from '@/Engine/Particles/Models';
import { ParticlesWrapper } from '@/Engine/Particles/Wrappers';

export function ParticlesFactory(): TParticlesFactory {
  const factory: TReactiveFactory<TParticlesWrapper, TParticlesParams, TParticlesServiceDependencies> = ReactiveFactory(FactoryType.Particles, ParticlesWrapper);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
