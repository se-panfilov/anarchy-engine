import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { IAbstractLightWrapper } from './IAbstractLightWrapper';
import type { ILight } from './ILight';
import type { IAnyLightConfig } from './ILightConfig';
import type { ILightFactory } from './ILightFactory';
import type { ILightParams } from './ILightParams';
import type { ILightRegistry } from './ILightRegistry';

export type ILightService = TWithCreateService<IAbstractLightWrapper<ILight>, ILightParams> &
  TWithCreateFromConfigService<IAnyLightConfig> &
  TWithFactoryService<ILightFactory> &
  TWithRegistryService<ILightRegistry> &
  TWithSceneGetterService &
  TDestroyable;
