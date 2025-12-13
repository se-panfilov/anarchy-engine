import type { TSerializableEntitiesService } from '@/Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService, TWithSerializeEntity } from '@/Engine/Mixins';

import type { TActor } from './TActor';
import type { TActorConfig } from './TActorConfig';
import type { TActorServiceDependencies } from './TActorDependencies';
import type { TActorEntityToConfigDependencies } from './TActorEntityToConfigDependencies';
import type { TActorFactory } from './TActorFactory';
import type { TActorParams } from './TActorParams';
import type { TActorRegistry } from './TActorRegistry';

export type TActorServiceWithCreate = TWithCreateService<TActor, TActorParams>;
export type TActorServiceWithCreateFromConfig = TWithCreateFromConfigService<TActorConfig, TActor>;
export type TActorServiceWithFactory = TWithFactoryService<TActor, TActorParams, TActorServiceDependencies, TActorFactory>;
export type TActorServiceWithRegistry = TWithRegistryService<TActorRegistry>;

export type TActorService = TActorServiceWithCreate &
  TActorServiceWithCreateFromConfig &
  TActorServiceWithFactory &
  TActorServiceWithRegistry &
  TSerializableEntitiesService<TActorConfig> &
  TWithSceneGetterService &
  TWithSerializeEntity<TActor, TActorEntityToConfigDependencies>;
