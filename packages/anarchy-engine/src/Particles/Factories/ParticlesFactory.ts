import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { particlesConfigToParams } from '@hellpig/anarchy-engine/Particles/Adapters';
import type { TParticlesFactory, TParticlesParams, TParticlesServiceDependencies, TParticlesWrapper } from '@hellpig/anarchy-engine/Particles/Models';
import { ParticlesWrapper } from '@hellpig/anarchy-engine/Particles/Wrappers';

export function ParticlesFactory(): TParticlesFactory {
  const factory: TReactiveFactory<TParticlesWrapper, TParticlesParams, TParticlesServiceDependencies> = ReactiveFactory(FactoryType.Particles, ParticlesWrapper);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: particlesConfigToParams });
}
