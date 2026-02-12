import type { TParamsFromConfig, TReactiveFactory } from '@Anarchy/Engine/Abstract';
import type { TFsmConfig, TFsmParams } from '@Anarchy/Engine/Fsm/Models';

import type { TFsmWrapper } from './TFsmWrapper';

export type TFsmInstanceFactory = TReactiveFactory<TFsmWrapper, TFsmParams> & TParamsFromConfig<TFsmConfig, TFsmParams>;
