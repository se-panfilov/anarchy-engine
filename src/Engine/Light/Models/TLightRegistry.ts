import type { TAbstractEntityRegistry } from '@/Engine/Abstract/Models';
import type { TAbstractLightWrapper, TLight } from '@/Engine/Light/Models';

export type TLightRegistry = TAbstractEntityRegistry<TAbstractLightWrapper<TLight>>;
