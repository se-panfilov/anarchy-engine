import { Vector4 } from 'three';

import type { TPhysicsPresetConfig, TPhysicsPresetParams } from '@/Engine/Physics/Models';

import { withCoordsToVector } from './PhysicsAdapterUtils';

export function configToParamsPreset(config: TPhysicsPresetConfig): TPhysicsPresetParams {
  const { position, rotation, ...rest } = config;

  return {
    ...rest,
    // type: RigidBodyTypesMap[RigidBodyTypesNames[type]],
    ...withCoordsToVector(position, new Vector4(rotation?.x, rotation?.y, rotation?.z, rotation?.w))
  };
}
