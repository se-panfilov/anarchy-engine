import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TFsmConfig, TFsmParams } from '@/Engine/Fsm/Models';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TFsmWrapper } from './TFsmWrapper';

export type TFsmInstanceFactory = TReactiveFactory<TFsmWrapper, TFsmParams> & TParamsFromConfig<TFsmConfig, TFsmParams> & TDestroyable;
