import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { TMaterialConfig } from './TMaterialConfig';
import type { TMaterialFactory } from './TMaterialFactory';
import type { TMaterialParams } from './TMaterialParams';
import type { TMaterialRegistry } from './TMaterialRegistry';
import type { TMaterialWrapper } from './TMaterialWrapper';

export type TMaterialService = TWithCreateService<TMaterialWrapper, TMaterialParams> &
  TWithCreateFromConfigService<TMaterialConfig> &
  TWithFactoryService<TMaterialFactory> &
  TWithRegistryService<TMaterialRegistry> &
  TDestroyable;
