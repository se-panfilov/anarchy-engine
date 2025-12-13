import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';
import type { TFogWrapper } from '@/Engine/Fog/Models';

export type TFogRegistry = TProtectedRegistry<TAbstractEntityRegistry<TFogWrapper>>;
