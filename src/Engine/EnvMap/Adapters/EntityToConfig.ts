import type { TEnvMapConfig, TEnvMapWrapper } from '@/Engine/EnvMap/Models';
import { extractRegistrableFields } from '@/Engine/Mixins';

export function envMapToConfig(entity: TEnvMapWrapper): TEnvMapConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);

  // TODO 15-0-0: fix any
  return {
    ...extractRegistrableFields(entity)
  } as any;
}
