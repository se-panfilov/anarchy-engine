import { TextureLoader } from 'three';

import type { TAbstractLoader } from '@/Engine/Abstract';
import { AbstractLoader, LoaderType } from '@/Engine/Abstract';
import type { TTexture, TTextureAsyncRegistry, TTextureResourceConfig, TTexturesLoader } from '@/Engine/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams } from '@/Engine/Texture/Utils';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function TexturesLoader(registry: TTextureAsyncRegistry): TTexturesLoader {
  const textureLoader: TextureLoader = new TextureLoader();
  const loader: TAbstractLoader<TTexture, TTextureResourceConfig> = AbstractLoader(textureLoader, registry, LoaderType.Texture);

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
