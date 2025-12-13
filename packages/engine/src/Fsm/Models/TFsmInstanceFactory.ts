import type { TParamsFromConfig, TReactiveFactory } from '@Engine/Abstract';
import type { TFsmConfig, TFsmParams } from '@Engine/Fsm/Models';

import type { TFsmWrapper } from './TFsmWrapper';

export type TFsmInstanceFactory = TReactiveFactory<TFsmWrapper, TFsmParams> & TParamsFromConfig<TFsmConfig, TFsmParams>;
