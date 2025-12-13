import type { TReactiveFactory } from '@/Abstract';
import { FactoryType, ReactiveFactory } from '@/Abstract';
import { configToParams } from '@/Particles/Adapters';
import type { TParticlesFactory, TParticlesParams, TParticlesServiceDependencies, TParticlesWrapper } from '@/Particles/Models';
import { ParticlesWrapper } from '@/Particles/Wrappers';

export function ParticlesFactory(): TParticlesFactory {
  const factory: TReactiveFactory<TParticlesWrapper, TParticlesParams, TParticlesServiceDependencies> = ReactiveFactory(FactoryType.Particles, ParticlesWrapper);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
