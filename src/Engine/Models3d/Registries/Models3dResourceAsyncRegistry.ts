import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { AbstractResourceAsyncRegistry, RegistryType } from '@/Engine/Abstract';
import type { TModel3dResourceConfig, TModel3dSerializeResourcesDependencies, TModels3dResourceAsyncRegistry } from '@/Engine/Models3d/Models';
import { isNotDefined } from '@/Engine/Utils';

export function Models3dResourceAsyncRegistry(): TModels3dResourceAsyncRegistry {
  const registry = Object.assign(AbstractResourceAsyncRegistry<GLTF>(RegistryType.Model3dRaw), {
    // TODO 15-0-0: could we extract this function as a generic one?
    serialize: ({ metaInfoRegistry }: TModel3dSerializeResourcesDependencies): ReadonlyArray<TModel3dResourceConfig> => {
      return registry.map((_value: GLTF, key: string | undefined): TModel3dResourceConfig => {
        if (isNotDefined(key)) throw new Error(`[Models3dResourceAsyncRegistry]: Cannot serialize resource: key "${key}" is not found`);
        const result: TModel3dResourceConfig | undefined = metaInfoRegistry.findByKey(key);
        if (isNotDefined(result)) throw new Error(`[Models3dResourceAsyncRegistry]: Cannot serialize resource: meta info is not found for the resource with name "${key}"`);
        return result;
      });
    }
  });

  return registry;
}
