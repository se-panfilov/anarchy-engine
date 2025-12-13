import type { ColorSpace, CubeTextureMapping, MagnificationTextureFilter, MinificationTextureFilter, PixelFormat, TextureDataType, Wrapping } from 'three';

export type ICubeTextureParams = Readonly<{
  images?: any[];
  mapping?: CubeTextureMapping;
  wrapS?: Wrapping;
  wrapT?: Wrapping;
  magFilter?: MagnificationTextureFilter;
  minFilter?: MinificationTextureFilter;
  format?: PixelFormat;
  type?: TextureDataType;
  anisotropy?: number;
  colorSpace?: ColorSpace;
}>;
