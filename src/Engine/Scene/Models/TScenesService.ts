import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithActiveAccessorsService, TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TSceneConfig } from './TSceneConfig';
import type { TSceneFactory } from './TSceneFactory';
import type { TSceneParams } from './TSceneParams';
import type { TSceneRegistry } from './TSceneRegistry';
import type { TSceneWrapper } from './TSceneWrapper';

export type TSceneServiceWithCreate = TWithCreateService<TSceneWrapper, TSceneParams>;
export type TSceneServiceWithCreateFromConfig = TWithCreateFromConfigService<TSceneConfig, TSceneWrapper>;
export type TSceneServiceWithFactory = TWithFactoryService<TSceneWrapper, TSceneParams, undefined, TSceneFactory, undefined>;
export type TSceneServiceWithRegistry = TWithRegistryService<TSceneRegistry>;

export type TScenesService = TAbstractService &
  TSceneServiceWithCreate &
  TSceneServiceWithCreateFromConfig &
  TSceneServiceWithFactory &
  TSceneServiceWithRegistry &
  TWithActiveAccessorsService<TSceneWrapper>;
