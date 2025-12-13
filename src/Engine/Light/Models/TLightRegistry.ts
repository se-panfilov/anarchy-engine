import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';
import type { TAbstractLightWrapper, TLight } from '@/Engine/Light/Models';

export type TLightRegistry = TProtectedRegistry<TAbstractEntityRegistry<TAbstractLightWrapper<TLight>>>;
