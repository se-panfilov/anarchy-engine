import type { TReactiveFactory } from '@/Engine/Abstract';

import type { TParamsFromConfigSpatial } from './TParamsFromConfigSpatial';
import type { TSpatialGridParams } from './TSpatialGridParams';
import type { TSpatialGridWrapper } from './TSpatialGridWrapper';

export type TSpatialGridFactory = TReactiveFactory<TSpatialGridWrapper, TSpatialGridParams> & TParamsFromConfigSpatial;
