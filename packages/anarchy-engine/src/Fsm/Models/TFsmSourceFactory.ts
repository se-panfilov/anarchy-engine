import type { TParamsFromConfig, TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import type { TFsmConfig, TFsmParams } from '@hellpig/anarchy-engine/Fsm/Models';

import type { TFsmSource } from './TFsmSource';

export type TFsmSourceFactory = TReactiveFactory<TFsmSource, TFsmParams> & TParamsFromConfig<TFsmConfig, TFsmParams>;
