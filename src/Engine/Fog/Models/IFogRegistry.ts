import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract/Models';
import type { IFogWrapper } from '@/Engine/Fog/Models';

export type IFogRegistry = IProtectedRegistry<IAbstractEntityRegistry<IFogWrapper>>;
