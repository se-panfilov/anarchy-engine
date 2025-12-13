import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { TMaterialFactory } from './TMaterialFactory';
import type { TMaterialPackConfig } from './TMaterialPackConfig';
import type { TMaterialParams } from './TMaterialParams';
import type { TMaterialRegistry } from './TMaterialRegistry';
import type { TMaterialTexturePack } from './TMaterialTexturePack';
import type { TMaterialWrapper } from './TMaterialWrapper';

export type TMaterialService = TWithCreateService<TMaterialWrapper, TMaterialParams> &
  TWithCreateFromConfigService<TMaterialPackConfig<TMaterialTexturePack>, TMaterialWrapper> &
  TWithFactoryService<TMaterialFactory> &
  TWithRegistryService<TMaterialRegistry> &
  TDestroyable;
