import { ReplaySubject } from 'rxjs';
import { TextureLoader } from 'three';

import { TextureRegistry } from '@/Engine/Domains/Texture';
import type { ITexture, ITextureParams, ITextureRegistry, ITextureService } from '@/Engine/Domains/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams, loadTexture } from '@/Engine/Domains/Texture/Service/TextureServiceHelper';
import type { IWriteable } from '@/Engine/Utils';

export function TextureService(): ITextureService {
  const textureLoader: TextureLoader = new TextureLoader();
  const messages$: ReplaySubject<string> = new ReplaySubject<string>();
  const textureRegistry: ITextureRegistry = TextureRegistry();

  const sendMessage = (message: string): void => messages$.next(message);

  function load(params: ITextureParams): ITexture {
    const texture: IWriteable<ITexture> = loadTexture(params.url, textureLoader, messages$);
    applyTextureParams(texture, params);
    applyColorSpace(texture, params.colorSpace);
    applyFilters(texture, params.magFilter, params.minFilter);

    // TODO (S.Panfilov) CWP Texture service vs Factory?
    // Where we should add texture to registry?
    textureRegistry.add(texture);

    return texture;
  }

  return { load, sendMessage, messages$ };
}

export const textureService: ITextureService = TextureService();
