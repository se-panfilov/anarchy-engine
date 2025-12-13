import type { IDestroyable } from '@/Engine/Mixins';
import type { IWithCreateFromConfigService, IWithCreateService, IWithFactoryService, IWithRegistryService, IWithSceneGetterService } from '@/Engine/Space';

import type { IAbstractLightWrapper } from './IAbstractLightWrapper';
import type { ILight } from './ILight';
import type { IAnyLightConfig } from './ILightConfig';
import type { ILightFactory } from './ILightFactory';
import type { ILightParams } from './ILightParams';
import type { ILightRegistry } from './ILightRegistry';

export type ILightService = IWithCreateService<IAbstractLightWrapper<ILight>, ILightParams> &
  IWithCreateFromConfigService<IAnyLightConfig> &
  IWithFactoryService<ILightFactory> &
  IWithRegistryService<ILightRegistry> &
  IWithSceneGetterService &
  IDestroyable;
