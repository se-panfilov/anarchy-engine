import type { ColorSpace, MagnificationTextureFilter, Mapping, MinificationTextureFilter, PixelFormat, TextureDataType, Wrapping } from 'three';

export type TTextureOptions = Readonly<{
  mapping?: Mapping;
  wrapS?: Wrapping;
  wrapT?: Wrapping;
  magFilter?: MagnificationTextureFilter;
  minFilter?: MinificationTextureFilter;
  format?: PixelFormat;
  type?: TextureDataType;
  anisotropy?: number;
  colorSpace?: ColorSpace;
}>;
