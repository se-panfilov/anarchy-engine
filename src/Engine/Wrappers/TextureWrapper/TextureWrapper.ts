import { Texture } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';

import type { ITexture, ITextureParams, ITextureWrapper } from './Models';

export function TextureWrapper({ image, format, colorSpace, mapping, magFilter, minFilter, type, wrapT, wrapS, anisotropy }: ITextureParams): ITextureWrapper {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const entity: ITexture = new Texture(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace);
  return { ...AbstractWrapper(entity, WrapperType.Texture), entity };
}
