import { TextureLoader } from 'three';

import type { TAbstractLoader } from '@/Engine/Abstract';
import { AbstractLoader, LoaderType } from '@/Engine/Abstract';
import type { TTexture, TTextureAsyncRegistry, TTextureParams, TTextureResourceConfig, TTexturesLoader } from '@/Engine/Texture/Models';
import { applyFilters, applyTextureParams } from '@/Engine/Texture/Utils';
import type { TWriteable } from '@/Engine/Utils';

export function TexturesLoader(registry: TTextureAsyncRegistry): TTexturesLoader {
  const textureLoader: TextureLoader = new TextureLoader();
  const loader: TAbstractLoader<TTexture, TTextureResourceConfig> = AbstractLoader(textureLoader, registry, LoaderType.Texture);

  function applyParamsOnLoaded(loaded: TWriteable<TTexture>, params?: TTextureParams): TTexture {
    applyTextureParams(loaded, params);
    // TODO 9.0.0. RESOURCES: Applying of colorSpace is turned off for now (find out how to work with it properly. Can we add it toTTextureParams?)
    // if (isDefined(colorSpace)) applyColorSpace(colorSpace as TMaterialPackKeys, loaded, params);
    applyFilters(loaded, params);
    return loaded;
  }

  return {
    ...loader,
    loadAsync: (config: TTextureResourceConfig): Promise<TTexture> => loader.loadAsync(config, applyParamsOnLoaded)
  };
}
