import { EquirectangularReflectionMapping } from 'three';

import { EnvMapMappingTypesMap, EnvMapMappingTypesName } from '@/Engine/EnvMap/Constants';
import type { TEnvMapConfigPack, TEnvMapParamsPack } from '@/Engine/EnvMap/Models';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: TEnvMapConfigPack): TEnvMapParamsPack | never {
  const { mapping, ...rest } = config;
  return {
    ...rest,
    mapping: isDefined(mapping) ? EnvMapMappingTypesMap[EnvMapMappingTypesName[mapping]] : EquirectangularReflectionMapping
  };
}
