import type { TPhysicsBodyConfig, TWithPresetPhysicsBodyParams } from '@/Engine/Physics/Models';

import { withCoordsToVector } from './PhysicsAdapterUtils';

export function configToOptionalParamsBody(config: TPhysicsBodyConfig): TWithPresetPhysicsBodyParams {
  const { position, rotation, ...rest } = config;

  return {
    // type: RigidBodyTypesMap[RigidBodyTypesNames[type]],
    ...rest,
    ...withCoordsToVector(position, rotation)
  };
}
