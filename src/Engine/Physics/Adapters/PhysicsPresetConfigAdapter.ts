import type { TPhysicsBodyConfig, TPhysicsPresetParams } from '@/Engine/Physics/Models';

export function configToParamsPreset(config: TPhysicsBodyConfig): TPhysicsPresetParams {
  const { type, ...rest } = config;

  return {
    type,
    // type: RigidBodyTypesMap[RigidBodyTypesNames[type]],
    ...rest
  };
}
