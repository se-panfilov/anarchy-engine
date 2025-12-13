import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { TFogConfig } from './TFogConfig';
import type { TFogFactory } from './TFogFactory';
import type { TFogParams } from './TFogParams';
import type { TFogRegistry } from './TFogRegistry';
import type { TFogWrapper } from './TFogWrapper';

export type TFogService = TAbstractService &
  TWithCreateService<TFogWrapper, TFogParams> &
  TWithCreateFromConfigService<TFogConfig, TFogWrapper> &
  TWithFactoryService<TFogFactory> &
  TWithRegistryService<TFogRegistry> &
  TWithSceneGetterService;
