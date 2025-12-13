import type { TSerializableEntitiesService } from '@/Engine/Abstract';
import type { TKinematicState } from '@/Engine/Kinematic';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';
import type { TOptional } from '@/Engine/Utils';

import type { TPhysicsBody } from './TPhysicsBody';
import type { TPhysicsBodyConfig } from './TPhysicsBodyConfig';
import type { TPhysicsBodyFactory } from './TPhysicsBodyFactory';
import type { TPhysicsBodyParams } from './TPhysicsBodyParams';
import type { TPhysicsBodyRegistry } from './TPhysicsBodyRegistry';
import type { TPhysicsDependencies } from './TPhysicsDependencies';
import type { TPhysicsPresetParams } from './TPhysicsPresetParams';
import type { TWithPresetNamePhysicsBodyConfig } from './TWithPresetNamePhysicsBodyConfig';

export type TPhysicsBodyServiceWithCreate = TWithCreateService<TPhysicsBody, TPhysicsBodyParams>;
export type TPhysicsBodyServiceWithCreateFromConfig = TWithCreateFromConfigService<TWithPresetNamePhysicsBodyConfig, TPhysicsBody>;
export type TPhysicsBodyServiceWithFactory = TWithFactoryService<TPhysicsBody, TPhysicsBodyParams, TPhysicsDependencies, TPhysicsBodyFactory>;
export type TPhysicsBodyServiceWithRegistry = TWithRegistryService<TPhysicsBodyRegistry>;

export type TPhysicsBodyService = TSerializableEntitiesService<TPhysicsBodyConfig> &
  TPhysicsBodyServiceWithCreate &
  TPhysicsBodyServiceWithCreateFromConfig &
  TPhysicsBodyServiceWithFactory &
  TPhysicsBodyServiceWithRegistry &
  Readonly<{
    createWithPreset: (params: TOptional<TPhysicsBodyParams>, preset: TPhysicsPresetParams) => TPhysicsBody | never;
    createWithPresetName: (params: TOptional<TPhysicsBodyParams>, presetName: string) => TPhysicsBody | never;
    getKinematicDataFromPhysics: (body: TPhysicsBody) => TKinematicState;
  }>;
