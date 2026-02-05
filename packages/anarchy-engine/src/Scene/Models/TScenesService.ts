import type { TSerializableEntitiesService } from '@hellpig/anarchy-engine/Abstract';
import type { TWithActiveAccessorsService, TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@hellpig/anarchy-engine/Mixins';

import type { TSceneConfig } from './TSceneConfig';
import type { TSceneFactory } from './TSceneFactory';
import type { TSceneParams } from './TSceneParams';
import type { TSceneRegistry } from './TSceneRegistry';
import type { TSceneWrapper } from './TSceneWrapper';

export type TScenesServiceWithCreate = TWithCreateService<TSceneWrapper, TSceneParams>;
export type TScenesServiceWithCreateFromConfig = TWithCreateFromConfigService<TSceneConfig, TSceneWrapper>;
export type TScenesServiceWithFactory = TWithFactoryService<TSceneWrapper, TSceneParams, undefined, TSceneFactory>;
export type TScenesServiceWithRegistry = TWithRegistryService<TSceneRegistry>;

export type TScenesService = TSerializableEntitiesService<TSceneWrapper, TSceneConfig> &
  TScenesServiceWithCreate &
  TScenesServiceWithCreateFromConfig &
  TScenesServiceWithFactory &
  TScenesServiceWithRegistry &
  TWithActiveAccessorsService<TSceneWrapper>;
