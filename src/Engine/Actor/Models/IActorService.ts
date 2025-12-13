import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateAsyncService, TWithCreateFromConfigService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { TActorAsyncRegistry } from './TActorAsyncRegistry';
import type { IActorConfig } from './IActorConfig';
import type { IActorFactory } from './IActorFactory';
import type { IActorParams } from './IActorParams';
import type { TActorWrapperAsync } from './TActorWrapperAsync';

export type IActorService = TWithCreateAsyncService<TActorWrapperAsync, IActorParams> &
  TWithCreateFromConfigService<IActorConfig> &
  TWithFactoryService<IActorFactory> &
  TWithRegistryService<TActorAsyncRegistry> &
  TWithSceneGetterService &
  TDestroyable;
