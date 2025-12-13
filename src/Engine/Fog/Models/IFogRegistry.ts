import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract';
import type { IFogWrapper } from '@/Engine/Fog/Models';

export type IFogRegistry = IProtectedRegistry<IAbstractEntityRegistry<IFogWrapper>>;
