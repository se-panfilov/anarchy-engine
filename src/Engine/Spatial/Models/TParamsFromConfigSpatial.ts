import type { TParamsFromConfig } from '@/Engine/Abstract';

import type { TSpatialConfigToParamsDependencies } from './TSpatialConfigToParamsDependencies';
import type { TSpatialGridConfig } from './TSpatialGridConfig';
import type { TSpatialGridParams } from './TSpatialGridParams';

export type TParamsFromConfigSpatial = Omit<TParamsFromConfig<TSpatialGridConfig, TSpatialGridParams>, 'configToParams'> &
  Readonly<{
    configToParams: (config: TSpatialGridConfig, dependencies: TSpatialConfigToParamsDependencies) => TSpatialGridParams;
  }>;
