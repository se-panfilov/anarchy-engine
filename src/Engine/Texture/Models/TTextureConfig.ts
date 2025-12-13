import type { TTextureProps } from './TTextureProps';

export type TTextureConfig = TTextureProps &
  Readonly<{
    texture: string;
  }>;
