import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TFogConfig } from './TFogConfig';
import type { TFogParams } from './TFogParams';
import type { TFogWrapper } from './TFogWrapper';

export type TFogFactory = TReactiveFactory<TFogWrapper, TFogParams> & TParamsFromConfig<TFogConfig, TFogParams> & TDestroyable;
