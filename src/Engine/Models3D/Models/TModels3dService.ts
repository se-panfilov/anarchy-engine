import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { TModels3dConfig } from './TModels3dConfig';
import type { TModels3dFactory } from './TModels3dFactory';
import type { TModels3dParams } from './TModels3dParams';
import type { TModels3dRegistry } from './TModels3dRegistry';
import type { TModels3dWrapper } from './TModels3dWrapper';

export type TModels3dService = TWithCreateService<TModels3dWrapper, TModels3dParams> &
  TWithCreateFromConfigService<TModels3dConfig> &
  TWithFactoryService<TModels3dFactory> &
  TWithRegistryService<TModels3dRegistry> &
  TWithSceneGetterService &
  TDestroyable;
