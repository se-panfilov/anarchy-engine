import type { TKinematicState } from '@/Engine/Kinematic';
import type { TDestroyable, TNoSpread } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';
import type { TOptional } from '@/Engine/Utils';

import type { TPhysicsBody } from './TPhysicsBody';
import type { TPhysicsBodyFactory } from './TPhysicsBodyFactory';
import type { TPhysicsBodyParams } from './TPhysicsBodyParams';
import type { TPhysicsBodyRegistry } from './TPhysicsBodyRegistry';
import type { TPhysicsPresetParams } from './TPhysicsPresetParams';
import type { TWithPresetNamePhysicsBodyConfig } from './TWithPresetNamePhysicsBodyConfig';

export type TPhysicsBodyService = TWithCreateService<TPhysicsBody, TPhysicsBodyParams> &
  TWithCreateFromConfigService<TWithPresetNamePhysicsBodyConfig, TPhysicsBody> &
  TWithFactoryService<TPhysicsBodyFactory> &
  TWithRegistryService<TPhysicsBodyRegistry> &
  TNoSpread &
  TDestroyable &
  Readonly<{
    createWithPreset: (params: TOptional<TPhysicsBodyParams>, preset: TPhysicsPresetParams) => TPhysicsBody | never;
    createWithPresetName: (params: TOptional<TPhysicsBodyParams>, presetName: string) => TPhysicsBody | never;
    getKinematicDataFromPhysics: (body: TPhysicsBody) => TKinematicState;
  }>;
