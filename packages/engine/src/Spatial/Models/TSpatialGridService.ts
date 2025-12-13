import type { TSerializableEntitiesService } from '@Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@Engine/Mixins';

import type { TSpatialGridConfig } from './TSpatialGridConfig';
import type { TSpatialGridFactory } from './TSpatialGridFactory';
import type { TSpatialGridParams } from './TSpatialGridParams';
import type { TSpatialGridRegistry } from './TSpatialGridRegistry';
import type { TSpatialGridWrapper } from './TSpatialGridWrapper';

export type TSpatialGridServiceWithCreate = TWithCreateService<TSpatialGridWrapper, TSpatialGridParams>;
export type TSpatialGridServiceWithCreateFromConfig = TWithCreateFromConfigService<TSpatialGridConfig, TSpatialGridWrapper>;
export type TSpatialGridServiceWithFactory = TWithFactoryService<TSpatialGridWrapper, TSpatialGridParams, undefined, TSpatialGridFactory>;
export type TSpatialGridServiceWithRegistry = TWithRegistryService<TSpatialGridRegistry>;

export type TSpatialGridService = TSerializableEntitiesService<TSpatialGridWrapper, TSpatialGridConfig> &
  TSpatialGridServiceWithCreate &
  TSpatialGridServiceWithCreateFromConfig &
  TSpatialGridServiceWithFactory &
  TSpatialGridServiceWithRegistry;
