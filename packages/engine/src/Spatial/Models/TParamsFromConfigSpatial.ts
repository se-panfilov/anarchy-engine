import type { TParamsFromConfig } from '@/Engine/Abstract';

import type { TSpatialGridConfig } from './TSpatialGridConfig';
import type { TSpatialGridParams } from './TSpatialGridParams';

export type TParamsFromConfigSpatial = TParamsFromConfig<TSpatialGridConfig, TSpatialGridParams>;
