import { CubeTexture } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';

import type { ICubeTexture, ICubeTextureParams, ICubeTextureWrapper } from './Models';

export function CubeTextureWrapper({ images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace }: ICubeTextureParams): ICubeTextureWrapper {
  const entity: ICubeTexture = new CubeTexture(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace);
  return { ...AbstractWrapper(entity, WrapperType.CubeTexture), entity };
}
