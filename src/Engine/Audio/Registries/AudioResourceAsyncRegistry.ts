import { AbstractResourceAsyncRegistry, RegistryType } from '@/Engine/Abstract';
import type { TAudioResourceAsyncRegistry, TAudioResourceConfig, TAudioSerializeResourcesDependencies } from '@/Engine/Audio/Models';
import { isNotDefined } from '@/Engine/Utils';

export function AudioResourceAsyncRegistry(): TAudioResourceAsyncRegistry {
  const registry = Object.assign(AbstractResourceAsyncRegistry<AudioBuffer>(RegistryType.AudioRaw), {
    // TODO 15-0-0: could we extract this function as a generic one?
    serialize: ({ metaInfoRegistry }: TAudioSerializeResourcesDependencies): ReadonlyArray<TAudioResourceConfig> => {
      return registry.map((_value: AudioBuffer, key: string | undefined): TAudioResourceConfig => {
        if (isNotDefined(key)) throw new Error(`[AudioResourceAsyncRegistry]: Cannot serialize resource: key "${key}" is not found`);
        const result: TAudioResourceConfig | undefined = metaInfoRegistry.findByKey(key);
        if (isNotDefined(result)) throw new Error(`[AudioResourceAsyncRegistry]: Cannot serialize resource: meta info is not found for the resource with name "${key}"`);
        return result;
      });
    }
  });

  return registry;
}
