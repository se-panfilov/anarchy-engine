import type { TPhysicsPresetConfig, TPhysicsPresetParams } from '@/Engine/Physics';
import { RigidBodyTypesMap, RigidBodyTypesNames } from '@/Engine/Physics';

export function configToParams(config: TPhysicsPresetConfig): TPhysicsPresetParams {
  const { type, ...rest } = config;

  return {
    type: RigidBodyTypesMap[RigidBodyTypesNames[type]],
    ...rest
  };
}
