import type { TPhysicsWorldConfig, TPhysicsWorldParams } from '@/Engine/Physics/Models';

export function configToParamsWorld(config: TPhysicsWorldConfig): TPhysicsWorldParams | never {
  return config;
}
