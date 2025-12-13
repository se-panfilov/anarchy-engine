import { Vector4 } from 'three';

import type { TPhysicsBodyConfig, TPhysicsBodyParams } from '@/Engine/Physics/Models';

import { withCoordsToVector } from './Utils';

export function configToOptionalParamsBody(config: TPhysicsBodyConfig): TPhysicsBodyParams {
  const { position, rotation, ...rest } = config;

  return {
    // type: RigidBodyTypesMap[RigidBodyTypesNames[type]],
    ...rest,
    ...withCoordsToVector(position, new Vector4(rotation?.x, rotation?.y, rotation?.z, rotation?.w))
  };
}
