import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Mixins';

import type { TParticlesConfig } from './TParticlesConfig';
import type { TParticlesFactory } from './TParticlesFactory';
import type { TParticlesParams } from './TParticlesParams';
import type { TParticlesRegistry } from './TParticlesRegistry';
import type { TParticlesWrapper } from './TParticlesWrapper';

export type TParticlesService = TAbstractService &
  TWithCreateService<TParticlesWrapper, TParticlesParams> &
  TWithCreateFromConfigService<TParticlesConfig, TParticlesWrapper> &
  TWithFactoryService<TParticlesFactory> &
  TWithRegistryService<TParticlesRegistry> &
  TWithSceneGetterService;
