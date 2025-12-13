import type { TModels3dServiceDependencies } from '@/Engine';
import type { TParamsFromConfigWithDependencies, TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TModel3dConfig } from './TModel3dConfig';
import type { TModel3dConfigToParamsDependencies } from './TModel3dConfigToParamsDependencies';
import type { TModel3dFacade } from './TModel3dFacade';
import type { TModel3dParams } from './TModel3dParams';

export type TModels3dFactory = TReactiveFactoryWithDependencies<TModel3dFacade, TModel3dParams, TModels3dServiceDependencies> &
  TParamsFromConfigWithDependencies<TModel3dConfig, TModel3dParams, TModel3dConfigToParamsDependencies> &
  TDestroyable;
