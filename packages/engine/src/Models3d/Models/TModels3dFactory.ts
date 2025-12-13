import type { TParamsFromConfigWithDependencies, TReactiveFactory } from '@/Abstract';

import type { TModel3d } from './TModel3d';
import type { TModel3dConfig } from './TModel3dConfig';
import type { TModel3dConfigToParamsDependencies } from './TModel3dConfigToParamsDependencies';
import type { TModel3dParams } from './TModel3dParams';
import type { TModels3dServiceDependencies } from './TModels3dServiceDependencies';

export type TModels3dFactory = TReactiveFactory<TModel3d, TModel3dParams, Pick<TModels3dServiceDependencies, 'animationsService' | 'model3dRawToModel3dConnectionRegistry'>> &
  TParamsFromConfigWithDependencies<TModel3dConfig, TModel3dParams, TModel3dConfigToParamsDependencies>;
