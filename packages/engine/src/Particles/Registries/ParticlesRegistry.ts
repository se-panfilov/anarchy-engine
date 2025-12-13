import { AbstractEntityRegistry, RegistryType } from '@/Abstract';
import type { TParticlesRegistry, TParticlesWrapper } from '@/Particles/Models';

export function ParticlesRegistry(): TParticlesRegistry {
  return AbstractEntityRegistry<TParticlesWrapper>(RegistryType.Particles);
}
