import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { TActor } from './TActor';
import type { TActorConfig } from './TActorConfig';
import type { TActorFactory } from './TActorFactory';
import type { TActorParams } from './TActorParams';
import type { TActorRegistry } from './TActorRegistry';
import type { TActorWrapperWithPhysics } from './TActorWrapperWithPhysics';

export type TActorService = TWithCreateService<TActor | TActorWrapperWithPhysics, TActorParams> &
  TWithCreateFromConfigService<TActorConfig, TActor | TActorWrapperWithPhysics> &
  TWithFactoryService<TActorFactory> &
  TWithRegistryService<TActorRegistry> &
  TWithSceneGetterService &
  TDestroyable;
