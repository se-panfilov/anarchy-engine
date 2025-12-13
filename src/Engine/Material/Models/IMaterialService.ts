import type { IDestroyable } from '@/Engine/Mixins';
import type { IWithCreateAsyncService, IWithCreateFromConfigService, IWithFactoryService, IWithRegistryService } from '@/Engine/Space';

import type { IMaterialAsyncRegistry } from './IMaterialAsyncRegistry';
import type { IMaterialConfig } from './IMaterialConfig';
import type { IMaterialFactory } from './IMaterialFactory';
import type { IMaterialParams } from './IMaterialParams';
import type { IMaterialWrapperAsync } from './IMaterialWrapperAsync';

export type IMaterialService = IWithCreateAsyncService<IMaterialWrapperAsync, IMaterialParams> &
  IWithCreateFromConfigService<IMaterialConfig> &
  IWithFactoryService<IMaterialFactory> &
  IWithRegistryService<IMaterialAsyncRegistry> &
  IDestroyable;
