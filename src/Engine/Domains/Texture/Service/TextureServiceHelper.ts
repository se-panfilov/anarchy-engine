import type { ReplaySubject } from 'rxjs';
import type { MagnificationTextureFilter, MinificationTextureFilter, TextureLoader } from 'three';
import { LinearFilter, NearestFilter, SRGBColorSpace } from 'three';
import type { ColorSpace } from 'three/src/constants';

import type { ITexture, ITextureParams } from '@/Engine/Domains/Texture/Models';
import type { IWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export const getMagFilter = (magFilter?: MagnificationTextureFilter): MagnificationTextureFilter => (isDefined(magFilter) ? magFilter : LinearFilter);
export const getMinFilter = (minFilter?: MinificationTextureFilter): MinificationTextureFilter => (isDefined(minFilter) ? minFilter : NearestFilter);
// eslint-disable-next-line functional/immutable-data
export const applyColorSpace = (texture: IWriteable<ITexture>, colorSpace?: ColorSpace): void => void (texture.colorSpace = isDefined(colorSpace) ? colorSpace : SRGBColorSpace);

export function applyFilters(texture: IWriteable<ITexture>, magFilter?: MagnificationTextureFilter, minFilter?: MinificationTextureFilter): void {
  // eslint-disable-next-line functional/immutable-data
  texture.magFilter = getMagFilter(magFilter);
  // eslint-disable-next-line functional/immutable-data
  texture.minFilter = getMinFilter(minFilter);

  // eslint-disable-next-line functional/immutable-data
  if (texture.minFilter === NearestFilter) texture.generateMipmaps = false;
}

export function applyTextureParams(texture: IWriteable<ITexture>, params: ITextureParams): void {
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.mapping)) texture.mapping = params.mapping;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.wrapS)) texture.wrapS = params.wrapS;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.wrapT)) texture.wrapT = params.wrapT;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.anisotropy)) texture.anisotropy = params.anisotropy;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.format)) texture.format = params.format;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.type)) texture.type = params.type;
}

export function loadTexture(url: string, textureLoader: TextureLoader, messages$: ReplaySubject<string>): ITexture {
  return textureLoader.load(
    url,
    (): void => messages$.next(`Texture "${url}" is loaded`),
    undefined,
    (error) => {
      messages$.next(`Texture "${url}" is failed to load`);
      console.log(`Texture "${url}" is failed to load`, error);
      throw error;
    }
  );
}
