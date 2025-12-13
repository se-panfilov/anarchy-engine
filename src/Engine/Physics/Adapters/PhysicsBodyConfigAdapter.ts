import type { TPhysicsBodyConfig, TPhysicsBodyParams } from '@/Engine/Physics/Models';

import { withCoordsToVector } from './PhysicsAdapterUtils';

export function configToParamsBody(config: TPhysicsBodyConfig): TPhysicsBodyParams {
  const { position, rotation, ...rest } = config;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    // type: RigidBodyTypesMap[RigidBodyTypesNames[type]],
    ...rest,
    ...withCoordsToVector(position, rotation)
  };
}
