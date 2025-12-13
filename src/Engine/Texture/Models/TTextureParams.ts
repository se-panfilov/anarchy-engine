import type { TTexture } from './TTexture';
import type { TTextureProps } from './TTextureProps';

export type TTextureParams = TTextureProps &
  Readonly<{
    texture: TTexture;
  }>;
