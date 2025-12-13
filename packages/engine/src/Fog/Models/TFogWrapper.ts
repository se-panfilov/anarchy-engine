import type { TWrapper } from '@Engine/Abstract';
import type { TDestroyable } from '@Engine/Mixins';

import type { TFog } from './TFog';

export type TFogWrapper = TWrapper<TFog> & TDestroyable;
