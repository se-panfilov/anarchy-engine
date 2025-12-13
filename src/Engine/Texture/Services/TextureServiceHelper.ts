import type { ColorSpace, MagnificationTextureFilter, MinificationTextureFilter } from 'three';
import { LinearFilter, NearestFilter, SRGBColorSpace } from 'three';

import { MaterialType } from '@/Engine/Material';
import type { IMaterialPackKeys, IMaterialPackParams, IMaterialTexturePack, ITexturePackParams } from '@/Engine/MaterialTexturePack';
import type { ITexture, ITextureParams } from '@/Engine/Texture/Models';
import type { IWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export const getMagFilter = (magFilter?: MagnificationTextureFilter): MagnificationTextureFilter => (isDefined(magFilter) ? magFilter : LinearFilter);
export const getMinFilter = (minFilter?: MinificationTextureFilter): MinificationTextureFilter => (isDefined(minFilter) ? minFilter : NearestFilter);

export const applyColorSpace = (name: IMaterialPackKeys, texture: IWriteable<ITexture>, params?: ITextureParams): void => {
  let defaultColorSpace: ColorSpace;

  if (name === 'map' || name === 'matcap') {
    defaultColorSpace = SRGBColorSpace;
  } else {
    defaultColorSpace = texture.colorSpace;
  }

  // eslint-disable-next-line functional/immutable-data
  texture.colorSpace = isDefined(params?.colorSpace) ? params.colorSpace : defaultColorSpace;
};

export function applyFilters(texture: IWriteable<ITexture>, params?: ITextureParams): void {
  if (isNotDefined(params)) return;

  // eslint-disable-next-line functional/immutable-data
  texture.magFilter = getMagFilter(params.magFilter);
  // eslint-disable-next-line functional/immutable-data
  texture.minFilter = getMinFilter(params.minFilter);

  // eslint-disable-next-line functional/immutable-data
  if (texture.minFilter === NearestFilter) texture.generateMipmaps = false;
}

export function applyTextureParams(texture: IWriteable<ITexture>, params?: ITextureParams): void {
  if (isNotDefined(params)) return;

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

export const isMaterialType = (value: ITexturePackParams | MaterialType): value is MaterialType => Object.values(MaterialType).includes(value as MaterialType);
export const isMaterialProps = (value: ITexturePackParams | IMaterialPackParams<IMaterialTexturePack>): value is IMaterialPackParams<IMaterialTexturePack> =>
  (value as IMaterialPackParams<IMaterialTexturePack>).type !== undefined && isMaterialType((value as IMaterialPackParams<IMaterialTexturePack>).type);
