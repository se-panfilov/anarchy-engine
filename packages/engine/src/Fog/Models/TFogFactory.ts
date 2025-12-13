import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';

import type { TFogConfig } from './TFogConfig';
import type { TFogParams } from './TFogParams';
import type { TFogWrapper } from './TFogWrapper';

export type TFogFactory = TReactiveFactory<TFogWrapper, TFogParams> & TParamsFromConfig<TFogConfig, TFogParams>;
