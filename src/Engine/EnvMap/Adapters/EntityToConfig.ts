import type { TEnvMapConfig, TEnvMapConfigToParamsDependencies, TEnvMapWrapper } from '@/Engine/EnvMap/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields, isNotDefined } from '@/Engine/Utils';

// TODO 15-0-0: validate result
export function envMapToConfig(entity: TEnvMapWrapper, { resourcesRegistry }: TEnvMapConfigToParamsDependencies): TEnvMapConfig {
  const texture: string | undefined = resourcesRegistry.findKeyByValue(entity.entity);
  if (isNotDefined(texture)) throw new Error(`[Serialization] EnvMap: Texture not found in resourcesRegistry for envMap id: "${entity.id}", name: "${entity.getName()}"`);

  return filterOutEmptyFields({
    isActive: entity.isActive(),
    texture,
    ...extractSerializableRegistrableFields(entity)
  });
}
