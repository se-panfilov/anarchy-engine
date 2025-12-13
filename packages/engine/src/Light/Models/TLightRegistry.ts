import type { TAbstractEntityRegistry } from '@/Abstract/Models';
import type { TAbstractLightWrapper, TAnyLight } from '@/Light/Models';

export type TLightRegistry = TAbstractEntityRegistry<TAbstractLightWrapper<TAnyLight>>;
