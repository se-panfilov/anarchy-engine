import type { TReactiveFactoryWithDependenciesAndHooks } from '@/Engine/Abstract';

import type { TParamsFromConfigSpatial } from './TParamsFromConfigSpatial';
import type { TSpatialGridParams } from './TSpatialGridParams';
import type { TSpatialGridWrapper } from './TSpatialGridWrapper';

export type TSpatialGridFactory = TReactiveFactoryWithDependenciesAndHooks<TSpatialGridWrapper, TSpatialGridParams, undefined, undefined> & TParamsFromConfigSpatial;
