import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TModels3dConfig } from './TModels3dConfig';
import type { TModels3dParams } from './TModels3dParams';
import type { TModels3dWrapper } from './TModels3dWrapper';

export type TModels3dFactory = TReactiveFactory<TModels3dWrapper, TModels3dParams> & TParamsFromConfig<TModels3dConfig, TModels3dParams> & TDestroyable;
