import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { TParticlesRegistry, TParticlesWrapper } from '@/Engine/Particles/Models';

export const ParticlesRegistry = (): TParticlesRegistry => AbstractEntityRegistry<TParticlesWrapper>(RegistryType.Particles);
