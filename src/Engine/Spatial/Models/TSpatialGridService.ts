import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TSpatialGridConfig } from './TSpatialGridConfig';
import type { TSpatialGridFactory } from './TSpatialGridFactory';
import type { TSpatialGridParams } from './TSpatialGridParams';
import type { TSpatialGridRegistry } from './TSpatialGridRegistry';
import type { TSpatialGridWrapper } from './TSpatialGridWrapper';

export type TSpatialGridService = TAbstractService &
  TWithCreateService<TSpatialGridWrapper, TSpatialGridParams> &
  TWithCreateFromConfigService<TSpatialGridConfig, TSpatialGridWrapper> &
  TWithFactoryService<TSpatialGridWrapper, TSpatialGridParams, undefined, TSpatialGridFactory, undefined> &
  TWithRegistryService<TSpatialGridRegistry>;
