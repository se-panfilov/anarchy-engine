import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TAnimationsFsmConfig } from './TAnimationsFsmConfig';
import type { TAnimationsFsmParams } from './TAnimationsFsmParams';
import type { TAnimationsFsm } from './TAnimationsFsmWrapper';

export type TAnimationsFsmFactory = TReactiveFactory<TAnimationsFsm, TAnimationsFsmParams> & TParamsFromConfig<TAnimationsFsmConfig, TAnimationsFsmParams> & TDestroyable;
