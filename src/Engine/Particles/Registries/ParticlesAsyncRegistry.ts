import { AbstractEntityAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TParticlesAsyncRegistry, TParticlesWrapperAsync } from '@/Engine/Particles/Models';

export const ParticlesAsyncRegistry = (): TParticlesAsyncRegistry => RegistryFacade(AbstractEntityAsyncRegistry<TParticlesWrapperAsync>(RegistryType.Particles));
