import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { TActorConfig } from './TActorConfig';
import type { TActorFactory } from './TActorFactory';
import type { TActorParams } from './TActorParams';
import type { TActorRegistry } from './TActorRegistry';
import type { TActorWrapper } from './TActorWrapper';
import type { TActorWrapperWithPhysics } from './TActorWrapperWithPhysics';

export type TActorService = TWithCreateService<TActorWrapper | TActorWrapperWithPhysics, TActorParams> &
  TWithCreateFromConfigService<TActorConfig> &
  TWithFactoryService<TActorFactory> &
  TWithRegistryService<TActorRegistry> &
  TWithSceneGetterService &
  TDestroyable;
