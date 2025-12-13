import { Vector4 } from 'three';

import type { TPhysicsBodyConfig, TPhysicsBodyParams } from '@/Engine/Physics/Models';

import { withCoordsToVector } from './Utils';

export function configToParamsBody(config: TPhysicsBodyConfig): TPhysicsBodyParams {
  const { position, rotation, ...rest } = config;

  return {
    ...rest,
    ...withCoordsToVector(position, new Vector4(rotation?.x, rotation?.y, rotation?.z, rotation?.w))
  };
}
