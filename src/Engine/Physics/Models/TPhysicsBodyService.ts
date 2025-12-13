import type { TAbstractService } from '@/Engine/Abstract';
import type { TKinematicState } from '@/Engine/Kinematic';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Mixins';
import type { TOptional } from '@/Engine/Utils';

import type { TPhysicsBody } from './TPhysicsBody';
import type { TPhysicsBodyFactory } from './TPhysicsBodyFactory';
import type { TPhysicsBodyParams } from './TPhysicsBodyParams';
import type { TPhysicsBodyRegistry } from './TPhysicsBodyRegistry';
import type { TPhysicsPresetParams } from './TPhysicsPresetParams';
import type { TWithPresetNamePhysicsBodyConfig } from './TWithPresetNamePhysicsBodyConfig';

export type TPhysicsBodyService = TAbstractService &
  TWithCreateService<TPhysicsBody, TPhysicsBodyParams> &
  TWithCreateFromConfigService<TWithPresetNamePhysicsBodyConfig, TPhysicsBody> &
  TWithFactoryService<TPhysicsBodyFactory> &
  TWithRegistryService<TPhysicsBodyRegistry> &
  Readonly<{
    createWithPreset: (params: TOptional<TPhysicsBodyParams>, preset: TPhysicsPresetParams) => TPhysicsBody | never;
    createWithPresetName: (params: TOptional<TPhysicsBodyParams>, presetName: string) => TPhysicsBody | never;
    getKinematicDataFromPhysics: (body: TPhysicsBody) => TKinematicState;
  }>;
