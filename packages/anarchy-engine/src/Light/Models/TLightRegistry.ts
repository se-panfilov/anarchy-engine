import type { TAbstractEntityRegistry } from '@hellpig/anarchy-engine/Abstract/Models';
import type { TAbstractLightWrapper, TAnyLight } from '@hellpig/anarchy-engine/Light/Models';

export type TLightRegistry = TAbstractEntityRegistry<TAbstractLightWrapper<TAnyLight>>;
