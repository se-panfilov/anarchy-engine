import type { TParamsFromConfig, TReactiveFactory } from '@/Abstract';
import type { TFsmConfig, TFsmParams } from '@/Fsm/Models';

import type { TFsmWrapper } from './TFsmWrapper';

export type TFsmInstanceFactory = TReactiveFactory<TFsmWrapper, TFsmParams> & TParamsFromConfig<TFsmConfig, TFsmParams>;
