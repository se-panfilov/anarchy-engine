import type { TAbstractEntityRegistry } from '@Anarchy/Engine/Abstract/Models';
import type { TAbstractLightWrapper, TAnyLight } from '@Anarchy/Engine/Light/Models';

export type TLightRegistry = TAbstractEntityRegistry<TAbstractLightWrapper<TAnyLight>>;
