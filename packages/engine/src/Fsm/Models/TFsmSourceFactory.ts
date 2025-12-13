import type { TParamsFromConfig, TReactiveFactory } from '@/Abstract';
import type { TFsmConfig, TFsmParams } from '@/Fsm/Models';

import type { TFsmSource } from './TFsmSource';

export type TFsmSourceFactory = TReactiveFactory<TFsmSource, TFsmParams> & TParamsFromConfig<TFsmConfig, TFsmParams>;
