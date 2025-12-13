import type { TWrapper } from '@/Engine/Abstract';
import type { TDestroyable, TWithTagsMixin } from '@/Engine/Mixins';

import type { TModels3d } from './TModels3d';

export type TModels3dWrapper = TWrapper<TModels3d> & TWithTagsMixin & TDestroyable;
