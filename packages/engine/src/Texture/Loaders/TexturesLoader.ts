import { TextureLoader } from 'three';

import { AbstractLoader, LoaderType } from '@/Abstract';
import type { TTexture, TTextureAsyncRegistry, TTextureMetaInfoRegistry, TTextureResourceConfig, TTexturesLoader } from '@/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams } from '@/Texture/Utils';
import type { TWriteable } from '@/Utils';
import { isDefined, isNotDefined } from '@/Utils';

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
