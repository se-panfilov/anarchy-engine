import type { IDestroyable } from '@/Engine/Mixins';
import type { IWithActiveAccessorsService, IWithCreateFromConfigService, IWithCreateService, IWithFactoryService, IWithRegistryService, IWithSceneGetterService } from '@/Engine/Space';

import type { ISceneConfig } from './ISceneConfig';
import type { ISceneFactory } from './ISceneFactory';
import type { ISceneParams } from './ISceneParams';
import type { ISceneRegistry } from './ISceneRegistry';
import type { ISceneWrapper } from './ISceneWrapper';

export type IScenesService = IWithCreateService<ISceneWrapper, ISceneParams> &
  IWithCreateFromConfigService<ISceneConfig> &
  IWithActiveAccessorsService<ISceneWrapper> &
  IWithFactoryService<ISceneFactory> &
  IWithRegistryService<ISceneRegistry> &
  IWithSceneGetterService &
  IDestroyable;
