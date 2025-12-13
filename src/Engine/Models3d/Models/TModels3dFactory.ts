import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TModel3dConfig } from './TModel3dConfig';
import type { TModel3dFacade } from './TModel3dFacade';
import type { TModel3dParams } from './TModel3dParams';

export type TModels3dFactory = TReactiveFactory<TModel3dFacade, TModel3dParams> & TParamsFromConfig<TModel3dConfig, TModel3dParams> & TDestroyable;
