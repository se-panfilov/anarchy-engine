import type { TWrapper } from '@hellpig/anarchy-engine/Abstract';
import type { TDestroyable } from '@hellpig/anarchy-engine/Mixins';

import type { TFog } from './TFog';

export type TFogWrapper = TWrapper<TFog> & TDestroyable;
