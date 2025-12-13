import type { ColorSpace, MagnificationTextureFilter, Mapping, MinificationTextureFilter, PixelFormat, TextureDataType, Wrapping } from 'three';

// TODO 9.0.0. RESOURCES: in Config this should be text values, in params - these enums
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
