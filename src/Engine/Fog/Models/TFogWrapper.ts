import type { TWrapper } from '@/Engine/Abstract';
import type { TDestroyable, TWithTagsMixin } from '@/Engine/Mixins';

import type { TFog } from './TFog';

export type TFogWrapper = TWrapper<TFog> & TWithTagsMixin & TDestroyable;
