import type { TWrapper } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TAnimationsFsm } from './TAnimationsFsm';

export type TAnimationsFsmWrapper = TWrapper<TAnimationsFsm> & TDestroyable;
