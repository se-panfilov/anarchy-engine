import type { TPhysicsBodyFacadeConfig, TPhysicsBodyFacadeParams } from '@/Engine/Physics/Models';

export function configToParamsBodyFacade(config: TPhysicsBodyFacadeConfig): TPhysicsBodyFacadeParams {
  const { type, ...rest } = config;

  return {
    type,
    // type: RigidBodyTypesMap[RigidBodyTypesNames[type]],
    ...rest
  };
}
