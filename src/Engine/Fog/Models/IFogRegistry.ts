import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';
import type { IFogWrapper } from '@/Engine/Fog/Models';

export type IFogRegistry = TProtectedRegistry<TAbstractEntityRegistry<IFogWrapper>>;
