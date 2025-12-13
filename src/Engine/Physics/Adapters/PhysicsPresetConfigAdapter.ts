import type { TPhysicsPresetConfig, TPhysicsPresetParams } from '@/Engine/Physics';

export function configToParams(config: TPhysicsPresetConfig): TPhysicsPresetParams {
  const { type, ...rest } = config;

  return {
    type,
    // type: RigidBodyTypesMap[RigidBodyTypesNames[type]],
    ...rest
  };
}
