import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TFsmConfig, TFsmParams } from '@/Engine/Fsm/Models';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TFsmSource } from './TFsmSource';

export type TFsmSourceFactory = TReactiveFactory<TFsmSource, TFsmParams> & TParamsFromConfig<TFsmConfig, TFsmParams> & TDestroyable;
