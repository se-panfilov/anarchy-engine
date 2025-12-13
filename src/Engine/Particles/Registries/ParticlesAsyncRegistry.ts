import { AbstractAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TParticlesAsyncRegistry, TParticlesWrapperAsync } from '@/Engine/Particles/Models';

export const ParticlesAsyncRegistry = (): TParticlesAsyncRegistry => RegistryFacade(AbstractAsyncRegistry<TParticlesWrapperAsync>(RegistryType.Particles));
