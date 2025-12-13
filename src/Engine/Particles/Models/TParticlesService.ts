import type { TEntitiesService } from '@/Engine/Abstract';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService, TWithSceneGetterService } from '@/Engine/Mixins';

import type { TParticlesConfig } from './TParticlesConfig';
import type { TParticlesFactory } from './TParticlesFactory';
import type { TParticlesParams } from './TParticlesParams';
import type { TParticlesRegistry } from './TParticlesRegistry';
import type { TParticlesServiceDependencies } from './TParticlesServiceDependencies';
import type { TParticlesWrapper } from './TParticlesWrapper';

export type TParticlesServiceWithCreate = TWithCreateService<TParticlesWrapper, TParticlesParams>;
export type TParticlesServiceWithCreateFromConfig = TWithCreateFromConfigService<TParticlesConfig, TParticlesWrapper>;
export type TParticlesServiceWithFactory = TWithFactoryService<TParticlesWrapper, TParticlesParams, TParticlesServiceDependencies, TParticlesFactory>;
export type TParticlesServiceWithRegistry = TWithRegistryService<TParticlesRegistry>;

export type TParticlesService = TEntitiesService &
  TParticlesServiceWithCreate &
  TParticlesServiceWithCreateFromConfig &
  TParticlesServiceWithFactory &
  TParticlesServiceWithRegistry &
  TWithSceneGetterService;
