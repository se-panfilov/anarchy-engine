import { AbstractAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IParticlesAsyncRegistry, IParticlesWrapperAsync } from '@/Engine/Particles/Models';

export const ParticlesAsyncRegistry = (): IParticlesAsyncRegistry => RegistryFacade(AbstractAsyncRegistry<IParticlesWrapperAsync>(RegistryType.Particles));
