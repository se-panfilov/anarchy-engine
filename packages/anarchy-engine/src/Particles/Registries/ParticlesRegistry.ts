import { AbstractEntityRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TParticlesRegistry, TParticlesWrapper } from '@Anarchy/Engine/Particles/Models';

export function ParticlesRegistry(): TParticlesRegistry {
  return AbstractEntityRegistry<TParticlesWrapper>(RegistryType.Particles);
}
