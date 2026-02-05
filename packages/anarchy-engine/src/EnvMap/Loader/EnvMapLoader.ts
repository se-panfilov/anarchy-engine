import { AbstractLoader, LoaderType } from '@hellpig/anarchy-engine/Abstract';
import { EnvMapMappingTypesMap, EnvMapMappingTypesName } from '@hellpig/anarchy-engine/EnvMap/Constants';
import type { TEnvMapLoader, TEnvMapMetaInfoRegistry, TEnvMapResourceConfig, TEnvMapTexture, TEnvMapTextureAsyncRegistry } from '@hellpig/anarchy-engine/EnvMap/Models';
import type { TLoadingManagerWrapper } from '@hellpig/anarchy-engine/LoadingManager';
import type { TWriteable } from '@hellpig/anarchy-shared/Utils';
import { isDefined } from '@hellpig/anarchy-shared/Utils';
import { EquirectangularReflectionMapping } from 'three';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader';

export function EnvMapLoader(registry: TEnvMapTextureAsyncRegistry, metaInfoRegistry: TEnvMapMetaInfoRegistry, loadingManagerWrapper: TLoadingManagerWrapper): TEnvMapLoader {
  const envMapLoader: HDRLoader = new HDRLoader(loadingManagerWrapper.entity);
  const loader: TEnvMapLoader = AbstractLoader(envMapLoader, registry, metaInfoRegistry, LoaderType.EnvMap);

  function applyParamsOnLoaded(loaded: TWriteable<TEnvMapTexture>, options?: TEnvMapResourceConfig['options']): TEnvMapTexture {
    // eslint-disable-next-line functional/immutable-data
    loaded.mapping = isDefined(options?.mapping) ? EnvMapMappingTypesMap[EnvMapMappingTypesName[options.mapping]] : EquirectangularReflectionMapping;

    return loaded;
  }

  loader.setOnLoadedFn(applyParamsOnLoaded);

  return loader;
}
