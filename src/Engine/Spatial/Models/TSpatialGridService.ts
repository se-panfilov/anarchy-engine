import type { TDestroyable, TNoSpread } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { TSpatialGridConfig } from './TSpatialGridConfig';
import type { TSpatialGridFactory } from './TSpatialGridFactory';
import type { TSpatialGridParams } from './TSpatialGridParams';
import type { TSpatialGridRegistry } from './TSpatialGridRegistry';
import type { TSpatialGridWrapper } from './TSpatialGridWrapper';

export type TSpatialGridService = TWithCreateService<TSpatialGridWrapper, TSpatialGridParams> &
  TWithCreateFromConfigService<TSpatialGridConfig, TSpatialGridWrapper> &
  TWithFactoryService<TSpatialGridFactory> &
  TWithRegistryService<TSpatialGridRegistry> &
  TNoSpread &
  TDestroyable;
