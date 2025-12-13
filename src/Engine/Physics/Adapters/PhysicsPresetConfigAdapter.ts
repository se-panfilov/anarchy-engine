import type { TPhysicsPresetConfig, TPhysicsPresetParams } from '@/Engine/Physics/Models';

export function configToParamsPreset(config: TPhysicsPresetConfig): TPhysicsPresetParams {
  const { type, ...rest } = config;

  return {
    type,
    // type: RigidBodyTypesMap[RigidBodyTypesNames[type]],
    ...rest
  };
}
