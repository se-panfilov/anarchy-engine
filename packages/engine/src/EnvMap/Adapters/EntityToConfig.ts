import type { TEnvMapConfig, TEnvMapConfigToParamsDependencies, TEnvMapWrapper } from '@/EnvMap/Models';
import { extractSerializableRegistrableFields } from '@/Mixins';
import { filterOutEmptyFields } from '@/Utils';

export function envMapToConfig(entity: TEnvMapWrapper, { resourcesRegistry }: TEnvMapConfigToParamsDependencies): TEnvMapConfig {
  const texture: string = resourcesRegistry.getKeyByValue(entity.entity);

  return filterOutEmptyFields({
    isActive: entity.isActive(),
    texture,
    ...extractSerializableRegistrableFields(entity)
  });
}
