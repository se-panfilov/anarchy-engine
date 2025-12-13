import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registry';
import type { IParticlesRegistry, IParticlesWrapper } from '@/Engine/Particles/Models';

export const ParticlesRegistry = (): IParticlesRegistry => RegistryFacade(AbstractEntityRegistry<IParticlesWrapper>(RegistryType.Particles));
