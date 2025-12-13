import type { IDestroyable } from '@/Engine/Mixins';
import type { IWithCreateAsyncService, IWithCreateFromConfigService, IWithFactoryService, IWithRegistryService, IWithSceneGetterService } from '@/Engine/Space';

import type { IActorAsyncRegistry } from './IActorAsyncRegistry';
import type { IActorConfig } from './IActorConfig';
import type { IActorFactory } from './IActorFactory';
import type { IActorParams } from './IActorParams';
import type { IActorWrapperAsync } from './IActorWrapperAsync';

export type IActorService = IWithCreateAsyncService<IActorWrapperAsync, IActorParams> &
  IWithCreateFromConfigService<IActorConfig> &
  IWithFactoryService<IActorFactory> &
  IWithRegistryService<IActorAsyncRegistry> &
  IWithSceneGetterService &
  IDestroyable;
