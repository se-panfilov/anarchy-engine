import type { TParamsFromConfig } from '@/Engine/Abstract';

import type { TCameraConfig } from './TCameraConfig';
import type { TCameraParams } from './TCameraParams';
import type { TCameraServiceDependencies } from './TCameraServiceDependencies';

export type TParamsFromConfigCamera = Omit<TParamsFromConfig<TCameraConfig, TCameraParams>, 'configToParams'> &
  Readonly<{
    configToParams: (config: TCameraConfig, dependencies: TCameraServiceDependencies) => TCameraParams;
  }>;
