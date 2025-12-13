import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { configToParams } from '@Anarchy/Engine/Particles/Adapters';
import type { TParticlesFactory, TParticlesParams, TParticlesServiceDependencies, TParticlesWrapper } from '@Anarchy/Engine/Particles/Models';
import { ParticlesWrapper } from '@Anarchy/Engine/Particles/Wrappers';

export function ParticlesFactory(): TParticlesFactory {
  const factory: TReactiveFactory<TParticlesWrapper, TParticlesParams, TParticlesServiceDependencies> = ReactiveFactory(FactoryType.Particles, ParticlesWrapper);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
