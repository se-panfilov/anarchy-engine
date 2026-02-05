import { AbstractEntityRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TParticlesRegistry, TParticlesWrapper } from '@hellpig/anarchy-engine/Particles/Models';

export function ParticlesRegistry(): TParticlesRegistry {
  return AbstractEntityRegistry<TParticlesWrapper>(RegistryType.Particles);
}
