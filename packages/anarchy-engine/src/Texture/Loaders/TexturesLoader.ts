import { AbstractLoader, LoaderType } from '@Anarchy/Engine/Abstract';
import type { TTexture, TTextureAsyncRegistry, TTextureMetaInfoRegistry, TTextureResourceConfig, TTexturesLoader } from '@Anarchy/Engine/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams } from '@Anarchy/Engine/Texture/Utils';
import type { TWriteable } from '@Anarchy/Shared/Utils';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import type { LoadingManager } from 'three';
import { TextureLoader } from 'three';

export function TexturesLoader(registry: TTextureAsyncRegistry, metaInfoRegistry: TTextureMetaInfoRegistry, loadingManager: LoadingManager): TTexturesLoader {
  const textureLoader: TextureLoader = new TextureLoader(loadingManager);
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
