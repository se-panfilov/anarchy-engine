import type { IDestroyable } from '@/Engine/Mixins';
import type { IWithCreateFromConfigService, IWithCreateService, IWithFactoryService, IWithRegistryService } from '@/Engine/Space';

import type { IMaterialConfig } from './IMaterialConfig';
import type { IMaterialFactory } from './IMaterialFactory';
import type { IMaterialParams } from './IMaterialParams';
import type { IMaterialRegistry } from './IMaterialRegistry';
import type { IMaterialWrapper } from './IMaterialWrapper';

export type IMaterialService = IWithCreateService<IMaterialWrapper, IMaterialParams> &
  IWithCreateFromConfigService<IMaterialConfig> &
  IWithFactoryService<IMaterialFactory> &
  IWithRegistryService<IMaterialRegistry> &
  IDestroyable;
