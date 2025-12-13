import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { TAnimationsFsmConfig } from './TAnimationsFsmConfig';
import type { TAnimationsFsmFactory } from './TAnimationsFsmFactory';
import type { TAnimationsFsmParams } from './TAnimationsFsmParams';
import type { TAnimationsFsmRegistry } from './TAnimationsFsmRegistry';
import type { TAnimationsFsm } from './TAnimationsFsmWrapper';

export type TAnimationsFsmService = TWithCreateService<TAnimationsFsm, TAnimationsFsmParams> &
  TWithCreateFromConfigService<TAnimationsFsmConfig, TAnimationsFsm> &
  TWithFactoryService<TAnimationsFsmFactory> &
  TWithRegistryService<TAnimationsFsmRegistry> &
  TDestroyable;
