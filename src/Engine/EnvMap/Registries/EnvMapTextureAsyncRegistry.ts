import { AbstractSimpleAsyncRegistry, RegistryType } from '@/Engine/Abstract';
import type { TEnvMapResourceConfig, TEnvMapSerializeResourcesDependencies, TEnvMapTexture, TEnvMapTextureAsyncRegistry } from '@/Engine/EnvMap/Models';
import { isNotDefined } from '@/Engine/Utils';

export function EnvMapTextureAsyncRegistry(): TEnvMapTextureAsyncRegistry {
  const registry = Object.assign(AbstractSimpleAsyncRegistry<TEnvMapTexture>(RegistryType.EnvMapTexture), {
    // TODO 15-0-0: could we extract this function as a generic one?
    serialize: ({ metaInfoRegistry }: TEnvMapSerializeResourcesDependencies): ReadonlyArray<TEnvMapResourceConfig> => {
      return registry.map((_value: TEnvMapTexture, key: string | undefined): TEnvMapResourceConfig => {
        if (isNotDefined(key)) throw new Error(`[EnvMapAsyncRegistry]: Cannot serialize resource: key "${key}" is not found`);
        const result: TEnvMapResourceConfig | undefined = metaInfoRegistry.findByKey(key);
        if (isNotDefined(result)) throw new Error(`[EnvMapAsyncRegistry]: Cannot serialize resource: meta info is not found for the resource with name "${key}"`);
        return result;
      });
    }
  });

  return registry;
}
