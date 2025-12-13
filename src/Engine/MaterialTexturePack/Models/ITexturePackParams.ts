import type { ITextureParams } from '@/Engine/Texture';

export type ITexturePackParams = Readonly<{
  url: string;
  params?: ITextureParams;
}>;
