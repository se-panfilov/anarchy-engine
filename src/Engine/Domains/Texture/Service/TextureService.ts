import { TextureLoader } from 'three';

import type { ITexture, ITexturePack, ITextureService, ITextureUploadPromises } from '@/Engine/Domains/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams } from '@/Engine/Domains/Texture/Service/TextureServiceHelper';
import type { IWriteable } from '@/Engine/Utils';

export function TextureService(): ITextureService {
  const textureLoader: TextureLoader = new TextureLoader();

  function load(pack: ITexturePack): ITextureUploadPromises {
    let promises: ITextureUploadPromises = {} as ITextureUploadPromises;

    Object.entries(pack).forEach(([key, { url, params }]): void => {
      const p: Promise<ITexture> = textureLoader.loadAsync(url).then((texture: IWriteable<ITexture>): ITexture => {
        applyTextureParams(texture, params);
        applyColorSpace(texture, params);
        applyFilters(texture, params);
        return texture;
      });
      promises = { ...promises, [key]: p };
    });

    return promises;
  }

  return { load };
}

export const textureService: ITextureService = TextureService();
