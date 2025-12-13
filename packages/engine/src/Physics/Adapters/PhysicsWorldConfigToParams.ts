import type { TPhysicsWorldConfig, TPhysicsWorldParams } from '@/Physics/Models';

export function configToParamsWorld(config: TPhysicsWorldConfig): TPhysicsWorldParams | never {
  return config;
}
