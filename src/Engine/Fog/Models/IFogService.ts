import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { IFogConfig } from './IFogConfig';
import type { IFogFactory } from './IFogFactory';
import type { IFogParams } from './IFogParams';
import type { IFogRegistry } from './IFogRegistry';
import type { IFogWrapper } from './IFogWrapper';

export type IFogService = TWithCreateService<IFogWrapper, IFogParams> &
  TWithCreateFromConfigService<IFogConfig> &
  TWithFactoryService<IFogFactory> &
  TWithRegistryService<IFogRegistry> &
  TWithSceneGetterService &
  TDestroyable;
