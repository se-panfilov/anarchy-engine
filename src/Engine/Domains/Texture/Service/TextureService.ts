import { LinearFilter, NearestFilter, SRGBColorSpace, TextureLoader } from 'three';

import type { ITextureService } from '@/Engine/Domains/Texture/Models';
import type { IWriteable } from '@/Engine/Utils';
import type { ITexture } from '@/Engine/Wrappers';
import { ReplaySubject } from 'rxjs';

export function TextureService(): ITextureService {
  const textureLoader: TextureLoader = new TextureLoader();
  const messages$: ReplaySubject<string> = new ReplaySubject<string>();

  // TODO (S.Panfilov) we do not track loaded textures, but probably makes sense to dispose them (and add to registries)
  function load(urlsObj: Record<string, string>): Record<string, ITexture> {
    const result: Record<string, ITexture> = {};

    Object.entries(urlsObj).forEach(([name, url]: ReadonlyArray<string>): void => {
      const texture: IWriteable<ITexture> = textureLoader.load(
        url,
        (): void => messages$.next(`Texture "${url}" is loaded`),
        undefined,
        (error) => {
          messages$.next(`Texture "${url}" is failed to load`);
          console.log(`Texture "${url}" is failed to load`, error);
          throw error;
        }
      );

      // eslint-disable-next-line functional/immutable-data
      texture.colorSpace = SRGBColorSpace;

      // texture.minFilter = NearestFilter;
      // texture.minFilter = NearestMipMapLinearFilter;
      // texture.minFilter = NearestMipMapNearestFilter;
      // texture.minFilter = LinearMipMapNearestFilter;
      // texture.minFilter = LinearMipMapLinearFilter;
      // texture.minFilter = LinearFilter;

      // eslint-disable-next-line functional/immutable-data
      if (texture.minFilter === NearestFilter) texture.generateMipmaps = false;

      // eslint-disable-next-line functional/immutable-data
      texture.magFilter = LinearFilter; //default
      // texture.magFilter = NearestFilter; //cheaper

      if (result[name]) throw new Error(`Texture "${name}" is already loaded`);
      // eslint-disable-next-line functional/immutable-data
      result[name] = texture;
    });

    return result;
  }

  return { load };
}

export const textureService: ITextureService = TextureService();
