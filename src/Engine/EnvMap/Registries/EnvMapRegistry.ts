import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { TEnvMapRegistry, TEnvMapResourceConfig, TEnvMapSerializeResourcesDependencies, TEnvMapWrapper } from '@/Engine/EnvMap/Models';
import { isNotDefined } from '@/Engine/Utils';

export function EnvMapRegistry(): TEnvMapRegistry {
  const registry = Object.assign(AbstractEntityRegistry<TEnvMapWrapper>(RegistryType.EnvMap), {
    // TODO 15-0-0: could we extract this function as a generic one?
    serialize: ({ metaInfoRegistry }: TEnvMapSerializeResourcesDependencies): ReadonlyArray<TEnvMapResourceConfig> => {
      return registry.map((_value: TEnvMapWrapper, key: string | undefined): TEnvMapResourceConfig => {
        if (isNotDefined(key)) throw new Error(`[EnvMapAsyncRegistry]: Cannot serialize resource: key "${key}" is not found`);
        const result: TEnvMapResourceConfig | undefined = metaInfoRegistry.findByKey(key);
        if (isNotDefined(result)) throw new Error(`[EnvMapAsyncRegistry]: Cannot serialize resource: meta info is not found for the resource with name "${key}"`);
        return result;
      });
    }
  });

  return registry;
}
