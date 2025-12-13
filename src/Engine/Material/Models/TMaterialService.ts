import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { TMaterialConfig } from './TMaterialConfig';
import type { TMaterialFactory } from './TMaterialFactory';
import type { TMaterialParams } from './TMaterialParams';
import type { TMaterialRegistry } from './TMaterialRegistry';
import type { TMaterialWrapper } from './TMaterialWrapper';

export type TMaterialService = TAbstractService &
  TWithCreateService<TMaterialWrapper, TMaterialParams> &
  TWithCreateFromConfigService<TMaterialConfig, TMaterialWrapper> &
  TWithFactoryService<TMaterialFactory> &
  TWithRegistryService<TMaterialRegistry>;
