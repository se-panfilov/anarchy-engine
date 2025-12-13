import type { IDestroyable } from '@/Engine/Mixins';
import type { IWithCreateFromConfigService, IWithCreateService, IWithFactoryService, IWithRegistryService, IWithSceneGetterService } from '@/Engine/Space';

import type { IFogConfig } from './IFogConfig';
import type { IFogFactory } from './IFogFactory';
import type { IFogParams } from './IFogParams';
import type { IFogRegistry } from './IFogRegistry';
import type { IFogWrapper } from './IFogWrapper';

export type IFogService = IWithCreateService<IFogWrapper, IFogParams> &
  IWithCreateFromConfigService<IFogConfig> &
  IWithFactoryService<IFogFactory> &
  IWithRegistryService<IFogRegistry> &
  IWithSceneGetterService &
  IDestroyable;
