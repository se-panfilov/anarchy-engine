import type { TTextureConfig } from '@/Engine/Texture';

export type TTexturePackConfig = Readonly<{
  url: string;
  params?: TTextureConfig;
}>;
