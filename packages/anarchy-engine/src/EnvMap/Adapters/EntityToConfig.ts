import type { TEnvMapConfig, TEnvMapConfigToParamsDependencies, TEnvMapWrapper } from '@hellpig/anarchy-engine/EnvMap/Models';
import { extractSerializableRegistrableFields } from '@hellpig/anarchy-engine/Mixins';
import { filterOutEmptyFields } from '@hellpig/anarchy-shared/Utils';

export function envMapEntityToConfig(entity: TEnvMapWrapper, { resourcesRegistry }: TEnvMapConfigToParamsDependencies): TEnvMapConfig {
  const texture: string = resourcesRegistry.getKeyByValue(entity.entity);

  return filterOutEmptyFields({
    isActive: entity.isActive(),
    texture,
    ...extractSerializableRegistrableFields(entity)
  });
}
