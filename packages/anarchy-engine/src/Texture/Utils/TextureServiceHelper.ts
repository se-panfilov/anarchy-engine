import type { TTexture, TTextureOptions } from '@Anarchy/Engine/Texture/Models';
import type { TWriteable } from '@Shared/Utils';
import { isDefined, isNotDefined } from '@Shared/Utils';
import type { MagnificationTextureFilter, MinificationTextureFilter } from 'three';
import { LinearFilter, NearestFilter } from 'three';

export const getMagFilter = (magFilter?: MagnificationTextureFilter): MagnificationTextureFilter => (isDefined(magFilter) ? magFilter : LinearFilter);
export const getMinFilter = (minFilter?: MinificationTextureFilter): MinificationTextureFilter => (isDefined(minFilter) ? minFilter : NearestFilter);

export const applyColorSpace = (texture: TWriteable<TTexture>, options?: TTextureOptions): void => {
  if (isNotDefined(options)) return;

  // eslint-disable-next-line functional/immutable-data
  if (isDefined(options.colorSpace)) texture.colorSpace = options.colorSpace;
};

export function applyFilters(texture: TWriteable<TTexture>, options?: TTextureOptions): void {
  if (isNotDefined(options)) return;

  // eslint-disable-next-line functional/immutable-data
  texture.magFilter = getMagFilter(options.magFilter);
  // eslint-disable-next-line functional/immutable-data
  texture.minFilter = getMinFilter(options.minFilter);

  // eslint-disable-next-line functional/immutable-data
  if (texture.minFilter === NearestFilter) texture.generateMipmaps = false;
}

export function applyTextureParams(texture: TWriteable<TTexture>, options?: TTextureOptions): void {
  if (isNotDefined(options)) return;

  // eslint-disable-next-line functional/immutable-data
  if (isDefined(options.mapping)) texture.mapping = options.mapping;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(options.wrapS)) texture.wrapS = options.wrapS;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(options.wrapT)) texture.wrapT = options.wrapT;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(options.anisotropy)) texture.anisotropy = options.anisotropy;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(options.format)) texture.format = options.format;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(options.type)) texture.type = options.type;
}
