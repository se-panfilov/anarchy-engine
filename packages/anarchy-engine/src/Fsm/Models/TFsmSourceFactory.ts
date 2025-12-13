import type { TParamsFromConfig, TReactiveFactory } from '@Anarchy/Engine/Abstract';
import type { TFsmConfig, TFsmParams } from '@Anarchy/Engine/Fsm/Models';

import type { TFsmSource } from './TFsmSource';

export type TFsmSourceFactory = TReactiveFactory<TFsmSource, TFsmParams> & TParamsFromConfig<TFsmConfig, TFsmParams>;
