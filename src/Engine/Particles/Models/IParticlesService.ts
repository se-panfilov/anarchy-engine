import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateAsyncService, TWithCreateFromConfigService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Space';

import type { IParticlesAsyncRegistry } from './IParticlesAsyncRegistry';
import type { IParticlesConfig } from './IParticlesConfig';
import type { IParticlesFactory } from './IParticlesFactory';
import type { IParticlesParams } from './IParticlesParams';
import type { IParticlesWrapperAsync } from './IParticlesWrapperAsync';

export type IParticlesService = TWithCreateAsyncService<IParticlesWrapperAsync, IParticlesParams> &
  TWithCreateFromConfigService<IParticlesConfig> &
  TWithFactoryService<IParticlesFactory> &
  TWithRegistryService<IParticlesAsyncRegistry> &
  TWithSceneGetterService &
  TDestroyable;
