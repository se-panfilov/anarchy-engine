import type { TKinematicData } from '@/Engine/Kinematic';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithCreateFromConfigService, TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space';
import type { TOptional } from '@/Engine/Utils';

import type { TPhysicsBodyFacade } from './TPhysicsBodyFacade';
import type { TPhysicsBodyFactory } from './TPhysicsBodyFactory';
import type { TPhysicsBodyParams } from './TPhysicsBodyParams';
import type { TPhysicsBodyRegistry } from './TPhysicsBodyRegistry';
import type { TPhysicsPresetParams } from './TPhysicsPresetParams';
import type { TWithPresetNamePhysicsBodyConfig } from './TWithPresetNamePhysicsBodyConfig';

export type TPhysicsBodyService = TWithCreateService<TPhysicsBodyFacade, TPhysicsBodyParams> &
  TWithCreateFromConfigService<TWithPresetNamePhysicsBodyConfig> &
  TWithFactoryService<TPhysicsBodyFactory> &
  TWithRegistryService<TPhysicsBodyRegistry> &
  TDestroyable &
  Readonly<{
    createWithPreset: (params: TOptional<TPhysicsBodyParams>, preset: TPhysicsPresetParams) => TPhysicsBodyFacade | never;
    createWithPresetName: (params: TOptional<TPhysicsBodyParams>, presetName: string) => TPhysicsBodyFacade | never;
    getKinematicDataFromPhysics: (facade: TPhysicsBodyFacade) => TKinematicData;
  }>;
