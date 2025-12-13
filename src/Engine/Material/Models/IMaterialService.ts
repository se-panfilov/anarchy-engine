import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { IMaterialConfig } from './IMaterialConfig';
import type { IMaterialFactory } from './IMaterialFactory';
import type { IMaterialParams } from './IMaterialParams';
import type { IMaterialRegistry } from './IMaterialRegistry';
import type { IMaterialWrapper } from './IMaterialWrapper';

export type IMaterialService = TWithCreateService<IMaterialWrapper, IMaterialParams> &
  TWithCreateFromConfigService<IMaterialConfig> &
  TWithFactoryService<IMaterialFactory> &
  TWithRegistryService<IMaterialRegistry> &
  TDestroyable;
