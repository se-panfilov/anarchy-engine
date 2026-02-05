import { AbstractLoader, LoaderType } from '@hellpig/anarchy-engine/Abstract';
import type { TLoadingManagerWrapper } from '@hellpig/anarchy-engine/LoadingManager';
import type { TTexture, TTextureAsyncRegistry, TTextureMetaInfoRegistry, TTextureResourceConfig, TTexturesLoader } from '@hellpig/anarchy-engine/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams } from '@hellpig/anarchy-engine/Texture/Utils';
import type { TWriteable } from '@hellpig/anarchy-shared/Utils';
import { isDefined, isNotDefined } from '@hellpig/anarchy-shared/Utils';
import { TextureLoader } from 'three';

export function TexturesLoader(registry: TTextureAsyncRegistry, metaInfoRegistry: TTextureMetaInfoRegistry, loadingManagerWrapper: TLoadingManagerWrapper): TTexturesLoader {
  const textureLoader: TextureLoader = new TextureLoader(loadingManagerWrapper.entity);
  const loader: TTexturesLoader = AbstractLoader(textureLoader, registry, metaInfoRegistry, LoaderType.Texture);

  function applyParamsOnLoaded(loaded: TWriteable<TTexture>, options?: TTextureResourceConfig['options']): TTexture {
    if (isNotDefined(options)) return loaded;
    applyTextureParams(loaded, options);
    if (isDefined(options.colorSpace)) applyColorSpace(loaded, options);
    applyFilters(loaded, options);
    return loaded;
  }

  loader.setOnLoadedFn(applyParamsOnLoaded);

  return loader;
}
