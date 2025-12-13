import type { IWrapper } from '@/Engine/Abstract';
import type { IDestroyable, IWithTagsMixin } from '@/Engine/Mixins';

import type { IFog } from './IFog';

export type IFogWrapper = IWrapper<IFog> & IWithTagsMixin<string> & IDestroyable;
