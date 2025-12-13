import type { TTextureOptions } from '@/Engine/Texture';

export type TTexturePackParams = Readonly<{
  url: string;
  params?: TTextureOptions;
}>;
