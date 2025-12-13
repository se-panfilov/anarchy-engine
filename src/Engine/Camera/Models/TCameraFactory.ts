import type { TParamsFromConfigWithDependencies, TReactiveFactoryWithDependencies } from '@/Engine/Abstract';

import type { TCameraConfig } from './TCameraConfig';
import type { TCameraParams } from './TCameraParams';
import type { TCameraServiceDependencies } from './TCameraServiceDependencies';
import type { TCameraWrapper } from './TCameraWrapper';

export type TCameraFactory = TReactiveFactoryWithDependencies<TCameraWrapper, TCameraParams, TCameraServiceDependencies> &
  TParamsFromConfigWithDependencies<TCameraConfig, TCameraParams, TCameraServiceDependencies>;
