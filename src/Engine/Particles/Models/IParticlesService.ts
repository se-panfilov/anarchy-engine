import type { IDestroyable } from '@/Engine/Mixins';
import type { IWithCreateFromConfigService, IWithCreateService, IWithFactoryService, IWithRegistryService, IWithSceneGetterService } from '@/Engine/Space';

import type { IParticlesConfig } from './IParticlesConfig';
import type { IParticlesFactory } from './IParticlesFactory';
import type { IParticlesParams } from './IParticlesParams';
import type { IParticlesRegistry } from './IParticlesRegistry';
import type { IParticlesWrapper } from './IParticlesWrapper';

export type IParticlesService = IWithCreateService<IParticlesWrapper, IParticlesParams> &
  IWithCreateFromConfigService<IParticlesConfig> &
  IWithFactoryService<IParticlesFactory> &
  IWithRegistryService<IParticlesRegistry> &
  IWithSceneGetterService &
  IDestroyable;
