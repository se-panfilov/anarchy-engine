import type { ColorSpace, MagnificationTextureFilter, Mapping, MinificationTextureFilter, PixelFormat, TextureDataType, Wrapping } from 'three';

// TODO This is a bit unsafe, cause we use this values in json
//  If three.js will change them to object-like structures, we could have a building problem
//  However, I prefer not to invest time into this now
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
