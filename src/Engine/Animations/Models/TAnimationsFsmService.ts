import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { TAnimationsFsmConfig } from './TAnimationsFsmConfig';
import type { TAnimationsFsmFactory } from './TAnimationsFsmFactory';
import type { TAnimationsFsmParams } from './TAnimationsFsmParams';
import type { TAnimationsFsmRegistry } from './TAnimationsFsmRegistry';
import type { TAnimationsFsmWrapper } from './TAnimationsFsmWrapper';

export type TAnimationsFsmService = TWithCreateService<TAnimationsFsmWrapper, TAnimationsFsmParams> &
  TWithCreateFromConfigService<TAnimationsFsmConfig, TAnimationsFsmWrapper> &
  TWithFactoryService<TAnimationsFsmFactory> &
  TWithRegistryService<TAnimationsFsmRegistry> &
  TDestroyable;
