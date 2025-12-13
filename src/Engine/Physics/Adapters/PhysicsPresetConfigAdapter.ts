import type { TPhysicsPresetConfig, TPhysicsPresetParams } from '@/Engine/Physics/Models';

import { withCoordsToVector } from './PhysicsAdapterUtils';

export function configToParamsPreset(config: TPhysicsPresetConfig): TPhysicsPresetParams {
  const { position, rotation, ...rest } = config;

  return {
    ...rest,
    // type: RigidBodyTypesMap[RigidBodyTypesNames[type]],
    ...withCoordsToVector(position, rotation)
  };
}
