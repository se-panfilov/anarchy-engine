import type { TSerializableEntitiesService } from '@/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Mixins';

import type { TFogConfig } from './TFogConfig';
import type { TFogFactory } from './TFogFactory';
import type { TFogParams } from './TFogParams';
import type { TFogRegistry } from './TFogRegistry';
import type { TFogWrapper } from './TFogWrapper';

export type TFogServiceWithCreate = TWithCreateService<TFogWrapper, TFogParams>;
export type TFogServiceWithCreateFromConfig = TWithCreateFromConfigService<TFogConfig, TFogWrapper>;
export type TFogServiceWithFactory = TWithFactoryService<TFogWrapper, TFogParams, undefined, TFogFactory>;
export type TFogServiceWithRegistry = TWithRegistryService<TFogRegistry>;

export type TFogService = TSerializableEntitiesService<TFogWrapper, TFogConfig> &
  TFogServiceWithCreate &
  TFogServiceWithCreateFromConfig &
  TFogServiceWithFactory &
  TFogServiceWithRegistry &
  TWithSceneGetterService;
