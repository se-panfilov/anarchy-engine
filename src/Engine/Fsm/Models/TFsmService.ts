import type { TFsmConfig, TFsmParams } from '@/Engine/Fsm/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { TFsmFactory } from './TFsmFactory';
import type { TFsmRegistry } from './TFsmRegistry';
import type { TFsmWrapper } from './TFsmWrapper';

export type TFsmService = TWithCreateService<TFsmWrapper, TFsmParams> &
  TWithCreateFromConfigService<TFsmConfig, TFsmWrapper> &
  TWithFactoryService<TFsmFactory> &
  TWithRegistryService<TFsmRegistry> &
  TDestroyable;
