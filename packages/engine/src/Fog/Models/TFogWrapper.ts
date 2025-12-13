import type { TWrapper } from '@/Abstract';
import type { TDestroyable } from '@/Mixins';

import type { TFog } from './TFog';

export type TFogWrapper = TWrapper<TFog> & TDestroyable;
