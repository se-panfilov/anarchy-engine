import type { TPhysicsBodyConfig, TPhysicsBodyParams } from '@/Engine/Physics/Models';

export function configToParamsBodyFacade(config: TPhysicsBodyConfig): TPhysicsBodyParams {
  const { type, ...rest } = config;

  return {
    type,
    // type: RigidBodyTypesMap[RigidBodyTypesNames[type]],
    ...rest
  };
}
