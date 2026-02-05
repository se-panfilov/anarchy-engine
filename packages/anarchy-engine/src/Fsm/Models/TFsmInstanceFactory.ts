import type { TParamsFromConfig, TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import type { TFsmConfig, TFsmParams } from '@hellpig/anarchy-engine/Fsm/Models';

import type { TFsmWrapper } from './TFsmWrapper';

export type TFsmInstanceFactory = TReactiveFactory<TFsmWrapper, TFsmParams> & TParamsFromConfig<TFsmConfig, TFsmParams>;
