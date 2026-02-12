import type { TEnvMapConfig, TEnvMapConfigToParamsDependencies, TEnvMapWrapper } from '@Anarchy/Engine/EnvMap/Models';
import { extractSerializableRegistrableFields } from '@Anarchy/Engine/Mixins';
import { filterOutEmptyFields } from '@hellpig/anarchy-shared/Utils';

export function envMapEntityToConfig(entity: TEnvMapWrapper, { resourcesRegistry }: TEnvMapConfigToParamsDependencies): TEnvMapConfig {
  const texture: string = resourcesRegistry.getKeyByValue(entity.entity);

  return filterOutEmptyFields({
    isActive: entity.isActive(),
    texture,
    ...extractSerializableRegistrableFields(entity)
  });
}
