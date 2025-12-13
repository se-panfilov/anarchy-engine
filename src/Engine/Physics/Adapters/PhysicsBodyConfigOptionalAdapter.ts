import { Vector4 } from 'three';

import type { TPhysicsBodyConfig, TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics/Models';

import { withCoordsToVector } from './PhysicsAdapterUtils';

export function configToOptionalParamsBody(config: TPhysicsBodyConfig): TWithPresetNamePhysicsBodyParams {
  const { position, rotation, ...rest } = config;

  return {
    // type: RigidBodyTypesMap[RigidBodyTypesNames[type]],
    ...rest,
    ...withCoordsToVector(position, new Vector4(rotation?.x, rotation?.y, rotation?.z, rotation?.w))
  };
}
