import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TParticlesRegistry, TParticlesWrapper } from '@/Engine/Particles/Models';

export const ParticlesRegistry = (): TParticlesRegistry => RegistryFacade(AbstractEntityRegistry<TParticlesWrapper>(RegistryType.Particles));
