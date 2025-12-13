import { AbstractWrapper } from '@Engine/Domains/Abstract';
import { CubeTexture } from 'three';

import type { ICubeTexture, ICubeTextureParams, ICubeTextureWrapper } from './Models';

export function CubeTextureWrapper({ images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace }: ICubeTextureParams): ICubeTextureWrapper {
  const entity: ICubeTexture = new CubeTexture(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace);
  return { ...AbstractWrapper(entity), entity };
}
