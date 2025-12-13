import { AbstractLoader, LoaderType } from '@Engine/Abstract';
import { EnvMapMappingTypesMap, EnvMapMappingTypesName } from '@Engine/EnvMap/Constants';
import type { TEnvMapLoader, TEnvMapMetaInfoRegistry, TEnvMapResourceConfig, TEnvMapTexture, TEnvMapTextureAsyncRegistry } from '@Engine/EnvMap/Models';
import { isDefined } from '@Engine/Utils';
import type { TWriteable } from '@Shared/Utils';
import { EquirectangularReflectionMapping } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

export function EnvMapLoader(registry: TEnvMapTextureAsyncRegistry, metaInfoRegistry: TEnvMapMetaInfoRegistry): TEnvMapLoader {
  const envMapLoader: RGBELoader = new RGBELoader();
  const loader: TEnvMapLoader = AbstractLoader(envMapLoader, registry, metaInfoRegistry, LoaderType.EnvMap);

  function applyParamsOnLoaded(loaded: TWriteable<TEnvMapTexture>, options?: TEnvMapResourceConfig['options']): TEnvMapTexture {
    // eslint-disable-next-line functional/immutable-data
    loaded.mapping = isDefined(options?.mapping) ? EnvMapMappingTypesMap[EnvMapMappingTypesName[options.mapping]] : EquirectangularReflectionMapping;

    return loaded;
  }

  loader.setOnLoadedFn(applyParamsOnLoaded);

  return loader;
}
