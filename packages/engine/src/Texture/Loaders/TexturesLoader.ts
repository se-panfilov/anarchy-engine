import { AbstractLoader, LoaderType } from '@Engine/Abstract';
import type { TTexture, TTextureAsyncRegistry, TTextureMetaInfoRegistry, TTextureResourceConfig, TTexturesLoader } from '@Engine/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams } from '@Engine/Texture/Utils';
import type { TWriteable } from '@Engine/Utils';
import { isDefined, isNotDefined } from '@Shared/Utils';
import { TextureLoader } from 'three';

export function TexturesLoader(registry: TTextureAsyncRegistry, metaInfoRegistry: TTextureMetaInfoRegistry): TTexturesLoader {
  const textureLoader: TextureLoader = new TextureLoader();
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
