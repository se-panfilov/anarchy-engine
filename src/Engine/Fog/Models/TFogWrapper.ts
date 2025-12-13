import type { TWrapper } from '@/Engine/Abstract';
import type { IWithTagsMixin, TDestroyable } from '@/Engine/Mixins';

import type { TFog } from './TFog';

export type TFogWrapper = TWrapper<TFog> & IWithTagsMixin & TDestroyable;
