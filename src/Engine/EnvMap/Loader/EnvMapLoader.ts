import { EquirectangularReflectionMapping } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import type { TAbstractLoader } from '@/Engine/Abstract';
import { AbstractLoader, LoaderType } from '@/Engine/Abstract';
import { EnvMapMappingTypesMap, EnvMapMappingTypesName } from '@/Engine/EnvMap/Constants';
import type { TEnvMapLoader, TEnvMapResourceConfig, TEnvMapTexture, TEnvMapTextureAsyncRegistry, TEnvMapTextureOptions } from '@/Engine/EnvMap/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

// TODO 9.0.0. RESOURCES: add loaders folder for textures, materials, models3d
export function EnvMapLoader(registry: TEnvMapTextureAsyncRegistry): TEnvMapLoader {
  const envMapLoader: RGBELoader = new RGBELoader();
  const loader: TAbstractLoader<TEnvMapTexture, TEnvMapResourceConfig> = AbstractLoader(envMapLoader, registry, LoaderType.EnvMap);

  function applyParamsOnLoaded(loaded: TWriteable<TEnvMapTexture>, options?: TEnvMapTextureOptions): TEnvMapTexture {
    if (isNotDefined(options)) return loaded;
    const { mapping } = options;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,functional/immutable-data
    loaded.mapping = isDefined(mapping) ? EnvMapMappingTypesMap[EnvMapMappingTypesName[mapping]] : EquirectangularReflectionMapping;
    return loaded;
  }

  return {
    ...loader,
    loadAsync: (config: TEnvMapResourceConfig): Promise<TEnvMapTexture> => loader.loadAsync(config, applyParamsOnLoaded)
  };
}
