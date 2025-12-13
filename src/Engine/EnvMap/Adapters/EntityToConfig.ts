import type { TEnvMapConfig, TEnvMapConfigToParamsDependencies, TEnvMapWrapper } from '@/Engine/EnvMap/Models';
import { extractRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields, isNotDefined } from '@/Engine/Utils';

export function envMapToConfig(entity: TEnvMapWrapper, { resourcesRegistry }: TEnvMapConfigToParamsDependencies): TEnvMapConfig {
  const texture: string | undefined = resourcesRegistry.findKeyByValue(entity.entity);
  if (isNotDefined(texture)) throw new Error(`[Serialization] EnvMap: Texture not found in resourcesRegistry for envMap id: "${entity.id}", name: "${entity.getName()}"`);

  return filterOutEmptyFields({
    isActive: entity.isActive(),
    texture,
    ...extractRegistrableFields(entity)
  });
}
