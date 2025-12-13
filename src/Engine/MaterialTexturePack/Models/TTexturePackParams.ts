import type { TTextureParams } from '@/Engine/Texture';

export type TTexturePackParams = Readonly<{
  url: string;
  params?: TTextureParams;
}>;
