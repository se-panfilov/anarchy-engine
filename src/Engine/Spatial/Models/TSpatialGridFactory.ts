import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TSpatialGridConfig } from './TSpatialGridConfig';
import type { TSpatialGridParams } from './TSpatialGridParams';
import type { TSpatialGridWrapper } from './TSpatialGridWrapper';

export type TSpatialGridFactory = TReactiveFactory<TSpatialGridWrapper, TSpatialGridParams> & TParamsFromConfig<TSpatialGridConfig, TSpatialGridParams> & TDestroyable;
