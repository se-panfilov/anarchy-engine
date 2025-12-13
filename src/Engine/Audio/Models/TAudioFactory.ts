import type { TParamsFromConfigWithDependencies, TReactiveFactoryWithDependencies } from '@/Engine/Abstract';

import type { TAudioConfig } from './TAudioConfig';
import type { TAudioConfigToParamsDependencies } from './TAudioConfigToParamsDependencies';
import type { TAudioParams } from './TAudioParams';
import type { TAudioWrapper } from './TAudioWrapper';
import type { TAudioWrapperDependencies } from './TAudioWrapperDependencies';

export type TAudioFactory = TReactiveFactoryWithDependencies<TAudioWrapper, TAudioParams, Pick<TAudioWrapperDependencies, 'audioLoop'>> &
  TParamsFromConfigWithDependencies<TAudioConfig, TAudioParams, TAudioConfigToParamsDependencies>;
