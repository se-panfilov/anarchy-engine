import type { TPhysicsBodyConfig, TPhysicsBodyParams } from '@/Engine/Physics/Models';

export function configToParamsBody(config: TPhysicsBodyConfig): TPhysicsBodyParams {
  const { type, ...rest } = config;

  return {
    type,
    // type: RigidBodyTypesMap[RigidBodyTypesNames[type]],
    ...rest
  };
}
