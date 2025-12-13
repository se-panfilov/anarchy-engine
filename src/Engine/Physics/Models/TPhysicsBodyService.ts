import type { TSerializableEntitiesService } from '@/Engine/Abstract';
import type { TKinematicState } from '@/Engine/Kinematic';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';

import type { TPhysicsBody } from './TPhysicsBody';
import type { TPhysicsBodyConfig } from './TPhysicsBodyConfig';
import type { TPhysicsBodyFactory } from './TPhysicsBodyFactory';
import type { TPhysicsBodyParams } from './TPhysicsBodyParams';
import type { TPhysicsBodyRegistry } from './TPhysicsBodyRegistry';
import type { TPhysicsDependencies } from './TPhysicsDependencies';

export type TPhysicsBodyServiceWithCreate = TWithCreateService<TPhysicsBody, TPhysicsBodyParams>;
export type TPhysicsBodyServiceWithCreateFromConfig = TWithCreateFromConfigService<TPhysicsBodyConfig, TPhysicsBody>;
export type TPhysicsBodyServiceWithFactory = TWithFactoryService<TPhysicsBody, TPhysicsBodyParams, TPhysicsDependencies, TPhysicsBodyFactory>;
export type TPhysicsBodyServiceWithRegistry = TWithRegistryService<TPhysicsBodyRegistry>;

export type TPhysicsBodyService = TSerializableEntitiesService<TPhysicsBody, TPhysicsBodyConfig> &
  TPhysicsBodyServiceWithCreate &
  TPhysicsBodyServiceWithCreateFromConfig &
  TPhysicsBodyServiceWithFactory &
  TPhysicsBodyServiceWithRegistry &
  Readonly<{
    getKinematicDataFromPhysics: (body: TPhysicsBody) => TKinematicState;
  }>;
