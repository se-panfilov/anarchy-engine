import type { TWrapper } from '@/Engine/Abstract';
import type { TWithTagsMixin, TDestroyable } from '@/Engine/Mixins';

import type { TFog } from './TFog';

export type TFogWrapper = TWrapper<TFog> & TWithTagsMixin & TDestroyable;
