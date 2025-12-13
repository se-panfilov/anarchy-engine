import type { TWrapper } from '@/Engine/Abstract';
import type { IWithTagsMixin, TDestroyable } from '@/Engine/Mixins';

import type { IFog } from './IFog';

export type IFogWrapper = TWrapper<IFog> & IWithTagsMixin & TDestroyable;
