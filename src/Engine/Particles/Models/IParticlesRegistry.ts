import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract/Models';
import type { IParticlesWrapper } from '@/Engine/Particles/Models';

export type IParticlesRegistry = IProtectedRegistry<IAbstractEntityRegistry<IParticlesWrapper>>;
