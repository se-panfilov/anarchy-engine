import type { TParamsFromConfigWithDependencies, TReactiveFactory } from '@/Engine/Abstract';

import type { TCameraConfig } from './TCameraConfig';
import type { TCameraParams } from './TCameraParams';
import type { TCameraServiceDependencies } from './TCameraServiceDependencies';
import type { TCameraWrapper } from './TCameraWrapper';

export type TCameraFactory = TReactiveFactory<TCameraWrapper, TCameraParams, TCameraServiceDependencies> & TParamsFromConfigWithDependencies<TCameraConfig, TCameraParams, TCameraServiceDependencies>;
