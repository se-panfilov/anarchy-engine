import type { TAbstractEntityRegistry } from '@/Engine/Abstract/Models';
import type { TAbstractLightWrapper, TAnyLight } from '@/Engine/Light/Models';

export type TLightRegistry = TAbstractEntityRegistry<TAbstractLightWrapper<TAnyLight>>;
