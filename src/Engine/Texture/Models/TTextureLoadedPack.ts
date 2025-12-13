import type { TTexture } from './TTexture';

export type TTextureLoadedPack = Readonly<{
  url: string;
  texture: TTexture;
}>;
