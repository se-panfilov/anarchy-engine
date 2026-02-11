import type { TParamsFromConfigWithDependencies, TReactiveFactory } from '@Anarchy/Engine/Abstract';

import type { TEnvMapConfig } from './TEnvMapConfig';
import type { TEnvMapConfigToParamsDependencies } from './TEnvMapConfigToParamsDependencies';
import type { TEnvMapParams } from './TEnvMapParams';
import type { TEnvMapWrapper } from './TEnvMapWrapper';

export type TEnvMapFactory = TReactiveFactory<TEnvMapWrapper, TEnvMapParams> & TParamsFromConfigWithDependencies<TEnvMapConfig, TEnvMapParams, TEnvMapConfigToParamsDependencies>;
