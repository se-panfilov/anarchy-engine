import type { MagnificationTextureFilter, MinificationTextureFilter } from 'three';
import { LinearFilter, NearestFilter } from 'three';

import type { TTexture, TTextureOptions } from '@/Engine/Texture/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export const getMagFilter = (magFilter?: MagnificationTextureFilter): MagnificationTextureFilter => (isDefined(magFilter) ? magFilter : LinearFilter);
export const getMinFilter = (minFilter?: MinificationTextureFilter): MinificationTextureFilter => (isDefined(minFilter) ? minFilter : NearestFilter);

// TODO 9.0.0. RESOURCES: Applying of colorSpace is turned off for now (find out how to work with it properly. Can we add it toTTextureParams?)
// export const applyColorSpace = (name: TMaterialPackKeys, texture: TWriteable<TTexture>, options?: TTextureOptions): void => {
//   let defaultColorSpace: ColorSpace;
//
//   if (name === 'map' || name === 'matcap') {
//     defaultColorSpace = SRGBColorSpace;
//   } else {
//     defaultColorSpace = texture.colorSpace;
//   }
//
//   // eslint-disable-next-line functional/immutable-data
//   texture.colorSpace = isDefined(options?.colorSpace) ? options.colorSpace : defaultColorSpace;
// };

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
