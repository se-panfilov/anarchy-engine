import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithActiveAccessorsService, TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';

import type { ISceneConfig } from './ISceneConfig';
import type { ISceneFactory } from './ISceneFactory';
import type { ISceneParams } from './ISceneParams';
import type { ISceneRegistry } from './ISceneRegistry';
import type { TSceneWrapper } from './TSceneWrapper';

export type TScenesService = TWithCreateService<TSceneWrapper, ISceneParams> &
  TWithCreateFromConfigService<ISceneConfig> &
  TWithActiveAccessorsService<TSceneWrapper> &
  TWithFactoryService<ISceneFactory> &
  TWithRegistryService<ISceneRegistry> &
  TDestroyable;
