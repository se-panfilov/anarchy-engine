import type { TEnvMapConfig, TEnvMapWrapper } from '@/Engine/EnvMap/Models';
import { extractRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function envMapToConfig(entity: TEnvMapWrapper): TEnvMapConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);

  // TODO 15-0-0: fix any
  return filterOutEmptyFields({
    ...extractRegistrableFields(entity)
  }) as any;
}
