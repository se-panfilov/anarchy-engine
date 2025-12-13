import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithActiveAccessorsService, TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { TSceneConfig } from './TSceneConfig';
import type { TSceneFactory } from './TSceneFactory';
import type { TSceneParams } from './TSceneParams';
import type { TSceneRegistry } from './TSceneRegistry';
import type { TSceneWrapper } from './TSceneWrapper';

export type TScenesService = TWithCreateService<TSceneWrapper, TSceneParams> &
  TWithCreateFromConfigService<TSceneConfig, TSceneWrapper> &
  TWithActiveAccessorsService<TSceneWrapper> &
  TWithFactoryService<TSceneFactory> &
  TWithRegistryService<TSceneRegistry> &
  TDestroyable;
