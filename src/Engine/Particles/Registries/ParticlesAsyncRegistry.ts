import { AbstractAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IParticlesAsyncRegistry, TParticlesWrapperAsync } from '@/Engine/Particles/Models';

export const ParticlesAsyncRegistry = (): IParticlesAsyncRegistry => RegistryFacade(AbstractAsyncRegistry<TParticlesWrapperAsync>(RegistryType.Particles));
