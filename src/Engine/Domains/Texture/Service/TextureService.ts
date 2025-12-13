import { ReplaySubject } from 'rxjs';
import { TextureLoader } from 'three';

import type { ITexture, ITextureParams, ITextureService } from '@/Engine/Domains/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams, loadTexture } from '@/Engine/Domains/Texture/Service/TextureServiceHelper';
import type { IWriteable } from '@/Engine/Utils';

export function TextureService(): ITextureService {
  const textureLoader: TextureLoader = new TextureLoader();
  const messages$: ReplaySubject<string> = new ReplaySubject<string>();
  const sendMessage = (message: string): void => messages$.next(message);

  function load(params: ITextureParams): ITexture {
    const texture: IWriteable<ITexture> = loadTexture(params.url, textureLoader, messages$);
    applyTextureParams(texture, params);
    applyColorSpace(texture, params.colorSpace);
    applyFilters(texture, params.magFilter, params.minFilter);

    return texture;
  }

  return { load, sendMessage, messages$ };
}

export const textureService: ITextureService = TextureService();
