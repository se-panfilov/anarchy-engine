import { EquirectangularReflectionMapping } from 'three';

import { EnvMapMappingTypesMap, EnvMapMappingTypesName } from '@/Engine/EnvMap/Constants';
import type { TEnvMapConfig, TEnvMapConfigToParamsDependencies, TEnvMapParams, TEnvMapTexture } from '@/Engine/EnvMap/Models';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TEnvMapConfig, { resourcesRegistry }: TEnvMapConfigToParamsDependencies): TEnvMapParams | never {
  const { mapping, ...rest } = config;

  const texture: TEnvMapTexture | undefined = resourcesRegistry.findByKey(config.name);
  if (isNotDefined(texture)) throw new Error(`EnvMap creation from config: Texture with name "${config.name}" not found`);

  return {
    ...rest,
    texture,
    mapping: isDefined(mapping) ? EnvMapMappingTypesMap[EnvMapMappingTypesName[mapping]] : EquirectangularReflectionMapping
  };
}
