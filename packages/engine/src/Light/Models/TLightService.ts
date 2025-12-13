import type { TSerializableEntitiesService } from '@Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@Engine/Mixins';

import type { TAbstractLightWrapper } from './TAbstractLightWrapper';
import type { TAnyLight } from './TAnyLight';
import type { TAnyLightWrapper } from './TAnyLightWrapper';
import type { TAnyLightConfig } from './TLightConfig';
import type { TLightFactory } from './TLightFactory';
import type { TLightParams } from './TLightParams';
import type { TLightRegistry } from './TLightRegistry';
import type { TLightServiceDependencies } from './TLightServiceDependencies';

export type TLightServiceWithCreate = TWithCreateService<TAnyLightWrapper, TLightParams>;
export type TLightServiceWithCreateFromConfig = TWithCreateFromConfigService<TAnyLightConfig, TAbstractLightWrapper<TAnyLight>>;
export type TLightServiceWithFactory = TWithFactoryService<TAnyLightWrapper, TLightParams, TLightServiceDependencies, TLightFactory>;
export type TLightServiceWithRegistry = TWithRegistryService<TLightRegistry>;

export type TLightService = TSerializableEntitiesService<TAnyLightWrapper, TAnyLightConfig> &
  TLightServiceWithCreate &
  TLightServiceWithCreateFromConfig &
  TLightServiceWithFactory &
  TLightServiceWithRegistry &
  TWithSceneGetterService;
