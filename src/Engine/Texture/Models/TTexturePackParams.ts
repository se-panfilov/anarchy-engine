import type { TTextureParams } from '@/Engine/Texture';

// TODO 9.0.0. RESOURCES: do we need this type for real?
export type TTexturePackParams = Readonly<{
  url: string;
  params?: TTextureParams;
}>;
