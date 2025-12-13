import type { ColorSpace, MagnificationTextureFilter, Mapping, MinificationTextureFilter, PixelFormat, TextureDataType, Wrapping, OffscreenCanvas } from 'three';

export type ITextureParams = Readonly<{
  image?: TexImageSource | OffscreenCanvas;
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
