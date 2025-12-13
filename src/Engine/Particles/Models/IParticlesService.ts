import type { IDestroyable } from '@/Engine/Mixins';
import type { IWithCreateAsyncService, IWithCreateFromConfigService, IWithFactoryService, IWithRegistryService, IWithSceneGetterService } from '@/Engine/Space';

import type { IParticlesAsyncRegistry } from './IParticlesAsyncRegistry';
import type { IParticlesConfig } from './IParticlesConfig';
import type { IParticlesFactory } from './IParticlesFactory';
import type { IParticlesParams } from './IParticlesParams';
import type { IParticlesWrapperAsync } from './IParticlesWrapperAsync';

export type IParticlesService = IWithCreateAsyncService<IParticlesWrapperAsync, IParticlesParams> &
  IWithCreateFromConfigService<IParticlesConfig> &
  IWithFactoryService<IParticlesFactory> &
  IWithRegistryService<IParticlesAsyncRegistry> &
  IWithSceneGetterService &
  IDestroyable;
