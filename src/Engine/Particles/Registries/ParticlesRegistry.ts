import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { TParticlesRegistry, TParticlesWrapper } from '@/Engine/Particles/Models';

export function ParticlesRegistry(): TParticlesRegistry {
  return AbstractEntityRegistry<TParticlesWrapper>(RegistryType.Particles);
}
