import { TextureLoader } from 'three';

import type { ITexture, ITexturePack, ITextureService, ITextureUploaded, ITextureUploadPromises } from '@/Engine/Domains/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams } from '@/Engine/Domains/Texture/Service/TextureServiceHelper';
import type { IWriteable } from '@/Engine/Utils';

export function TextureService(): ITextureService {
  const textureLoader: TextureLoader = new TextureLoader();

  function load(pack: ITexturePack): ITextureUploadPromises {
    let promises: Omit<ITextureUploadPromises, 'all'> = {};

    Object.entries(pack).forEach(([key, { url, params }]): void => {
      const p: Promise<ITexture> = textureLoader.loadAsync(url).then((texture: IWriteable<ITexture>): ITexture => {
        applyTextureParams(texture, params);
        applyColorSpace(texture, params);
        applyFilters(texture, params);
        return texture;
      });
      promises = { ...promises, [key]: p };
    });

    const all: () => Promise<ITextureUploaded> = () =>
      Promise.all(Object.values(promises)).then((textures: ReadonlyArray<ITexture>): ITextureUploaded => {
        let uploaded: ITextureUploaded = {};
        Object.keys(pack).forEach((key: string, index: number): void => void (uploaded = { ...uploaded, [key]: textures[index] }));
        return uploaded;
      });

    return { ...promises, all };
  }

  return { load };
}

export const textureService: ITextureService = TextureService();
